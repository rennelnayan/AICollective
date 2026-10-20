/**
 * Read a completed Gate 1 Review Form workbook as a decision.
 *
 * The signed spreadsheet IS the decision record. The engine reads it directly;
 * there is no JSON intermediate to drift out of step with the form a reviewer
 * actually signed, and no file anyone can edit after the fact.
 *
 * This module refuses rather than guessing, and cross-checks the form against
 * the packet, so a reviewer who misses an open item is told which one, by ID,
 * rather than producing a decision that silently leaves a blocker in place.
 *
 * Used by fullRun.mjs. Also runnable directly to export JSON, for anyone who
 * needs the decision in that shape:
 *
 *   node gate1Form.mjs [form.xlsx] [packet.json] [out.json]
 */

import { existsSync, writeFileSync } from "node:fs";
import { readSheet, readRows, cell } from "./xlsxRead.mjs";
import { readJson } from "./mapper.mjs";

export class FormError extends Error {}

const FORM    = process.argv[2] ?? "./Gate1-Review-Form-COMPLETED.xlsx";
const PACKET  = process.argv[3] ?? "./draft-gate1-packet.json";
const OUT     = process.argv[4] ?? "./gate1-decision.json";

const REVIEW_SHEET = 1;   // Instructions is sheet 0

// Form version 1.2. The Field mapping sheet in the workbook documents these.
const FIELDS = {
  caseId:           "C5",
  runId:            "C6",
  decisionId:       "C7",
  reviewerId:       "C10",
  reviewerRole:     "C11",
  decisionDate:     "C12",
  gate1Status:      "C15",
  comments:         "C16",
  listVersion:      "C46",
  jurisdictionList: "C47",
};

// Bounded deliberately. A form carries hint text below each entry block, and
// scanning to the end of the sheet would read it as data.
const EXC_ROWS = { from: 20, to: 27, columns: ["B","C","D","E","F","G","H","I"] };
const HEX_ROWS = { from: 34, to: 39, columns: ["B","C","D","E","F","G","H","I"] };

const isPlaceholder = (v) => !v || v.startsWith("[") || v.toLowerCase() === "tbd";
const splitList = (v) => v.split(/[,;]/).map((s) => s.trim()).filter(Boolean);

export function readGate1Form(formPath, packet) {
  const cells = readSheet(formPath, REVIEW_SHEET);
  const get = (k) => cell(cells, FIELDS[k]);

  // --- required scalars -----------------------------------------------------
  for (const key of ["caseId", "runId", "decisionId", "reviewerId",
                     "reviewerRole", "decisionDate", "gate1Status"]) {
    if (isPlaceholder(get(key))) {
      throw new FormError(
        `Review!${FIELDS[key]} (${key}) is empty or a placeholder. ` +
        "Every mandatory field must carry a real value.");
    }
  }

  const packetCase = packet.run_and_case_header?.case_id ?? packet.case_id;
  if (get("caseId") !== packetCase) {
    throw new FormError(
      `form case ID "${get("caseId")}" does not match the packet "${packetCase}". ` +
      "A decision for one case cannot be applied to another.");
  }

  // --- exception resolutions ------------------------------------------------
  const excRows = readRows(cells, EXC_ROWS.from, EXC_ROWS.to, EXC_ROWS.columns);
  const exception_resolutions = excRows.map(({ rowNumber, values }) => {
    const [id, resolution, reviewerId, reviewerRole, resolutionDate,
           evidence, rationale, controlStatus] = values;
    if (!id) {
      throw new FormError(`Review row ${rowNumber}: a resolution was entered with no exception ID.`);
    }
    if (!resolution) {
      throw new FormError(`Review row ${rowNumber} (${id}): resolution is empty.`);
    }
    if (isPlaceholder(reviewerId)) {
      throw new FormError(
        `Review row ${rowNumber} (${id}): "Reviewer ID" is empty or a placeholder. ` +
        "A resolution needs a named human.");
    }
    if (!reviewerRole) {
      throw new FormError(
        `Review row ${rowNumber} (${id}): "Reviewer role" is empty. The record must ` +
        "say in what capacity this person resolved the item.");
    }
    if (!rationale) {
      throw new FormError(
        `Review row ${rowNumber} (${id}): "Rationale" is empty. A resolution that is ` +
        "not explained cannot be defended to an examiner.");
    }
    return {
      exception_id: id,
      resolution,
      reviewer_role: reviewerRole,
      reviewer_id: reviewerId,
      // Each item carries its own date and role. An evidence review and a
      // sanctions determination are usually made on different days by
      // different people holding different roles.
      resolution_date: resolutionDate || get("decisionDate"),
      rationale,
      evidence_reviewed: splitList(evidence),
      control_evidence_status: controlStatus || null,
    };
  });

  // --- hard exclusion resolutions -------------------------------------------
  const hexRows = readRows(cells, HEX_ROWS.from, HEX_ROWS.to, HEX_ROWS.columns);
  const hard_exclusion_resolutions = hexRows.map(({ rowNumber, values }) => {
    // Column C is the exclusion rule id, filled from the packet rather than typed.
    const [id, , resolution, reviewerId, reviewerRole, resolutionDate,
           source, rationale] = values;
    if (!id) {
      throw new FormError(`Review row ${rowNumber}: a resolution was entered with no hard exclusion ID.`);
    }
    if (!["NOT_TRIGGERED", "TRIGGERED"].includes(resolution)) {
      throw new FormError(
        `Review row ${rowNumber} (${id}): resolution is "${resolution}". It must be ` +
        "NOT_TRIGGERED or TRIGGERED. UNKNOWN is the state being resolved, not a resolution.");
    }
    if (isPlaceholder(reviewerId)) {
      throw new FormError(
        `Review row ${rowNumber} (${id}): "Reviewer ID" is empty or a placeholder.`);
    }
    if (!reviewerRole) {
      throw new FormError(
        `Review row ${rowNumber} (${id}): "Reviewer role" is empty.`);
    }
    if (!source) {
      throw new FormError(
        `Review row ${rowNumber} (${id}): "Determination source" is empty. A hard ` +
        "exclusion determination must say where it came from, or it cannot be " +
        "distinguished from a guess.");
    }
    const rule = packet.hard_exclusion_candidates
      ?.find((h) => h.hard_exclusion_candidate_id === id)?.exclusion_rule_id;
    return {
      hard_exclusion_id: id,
      exclusion_rule_id: rule ?? null,
      resolution,
      reviewer_role: reviewerRole,
      reviewer_id: reviewerId,
      resolution_date: resolutionDate || get("decisionDate"),
      rationale: rationale || null,
      determination_source: source,
      list_version: get("listVersion") || null,
      jurisdiction_list_version: get("jurisdictionList") || null,
    };
  });

  // --- cross-check against the packet ---------------------------------------
  // The form is complete only if every open item in the packet has a row.
  const resolvedExc = new Set(exception_resolutions.map((r) => r.exception_id));
  const missingExc = (packet.exceptions_and_missing_information ?? [])
    .filter((e) => e.blocking && !resolvedExc.has(e.exception_id))
    .map((e) => e.exception_id);

  const resolvedHex = new Set(hard_exclusion_resolutions.map((r) => r.hard_exclusion_id));
  const missingHex = (packet.hard_exclusion_candidates ?? [])
    .filter((h) => h.status !== "NOT_TRIGGERED" && !resolvedHex.has(h.hard_exclusion_candidate_id))
    .map((h) => h.hard_exclusion_candidate_id);

  if (missingExc.length || missingHex.length) {
    throw new FormError(
      "the form does not account for every open item in the packet.\n" +
      (missingExc.length ? `  Blocking exceptions with no resolution row: ${missingExc.join(", ")}\n` : "") +
      (missingHex.length ? `  Hard exclusions still unresolved: ${missingHex.join(", ")}\n` : "") +
      "  Add a row for each, or leave the case undecided.");
  }

  const unknownExc = exception_resolutions
    .map((r) => r.exception_id)
    .filter((id) => !(packet.exceptions_and_missing_information ?? [])
      .some((e) => e.exception_id === id));
  if (unknownExc.length) {
    throw new FormError(
      `the form resolves exceptions that are not in the packet: ${unknownExc.join(", ")}. ` +
      "Check the IDs against what fullRun.mjs reported.");
  }

  return {
    schema_name: "GATE1_DECISION",
    schema_version: "1.0.0",
    case_id: get("caseId"),
    run_id: get("runId"),
    _source: `Read from ${formPath}. Written and signed by a human reviewer.`,
    gate_1_decision_id: get("decisionId"),
    gate_1_status: get("gate1Status"),
    reviewer_role: get("reviewerRole"),
    reviewer_id: get("reviewerId"),
    decision_date: get("decisionDate"),
    reviewer_comments: get("comments") || null,
    exception_resolutions,
    hard_exclusion_resolutions,
  };
}

// Run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  for (const [label, p] of [["form", FORM], ["packet", PACKET]]) {
    if (!existsSync(p)) {
      console.error(`No ${label} found at ${p}`);
      process.exit(1);
    }
  }
  try {
    const decision = readGate1Form(FORM, readJson(PACKET));
    writeFileSync(OUT, JSON.stringify(decision, null, 2));
    console.log(`Gate 1 decision exported: ${OUT}\n`);
    console.log(`  Case      : ${decision.case_id}`);
    console.log(`  Status    : ${decision.gate_1_status}`);
    console.log(`  Reviewer  : ${decision.reviewer_id} (${decision.reviewer_role})`);
    console.log(`  Date      : ${decision.decision_date}`);
    for (const r of decision.exception_resolutions) {
      console.log(`  ${r.exception_id} -> ${r.resolution} by ${r.reviewer_id}`);
    }
    for (const r of decision.hard_exclusion_resolutions) {
      console.log(`  ${r.hard_exclusion_id} -> ${r.resolution} by ${r.reviewer_id}`);
    }
    console.log("\nThe export is optional. fullRun.mjs reads the workbook directly.");
  } catch (err) {
    if (!(err instanceof FormError)) throw err;
    console.error(`\nThe form is not complete:\n\n  ${err.message}\n`);
    process.exit(1);
  }
}
