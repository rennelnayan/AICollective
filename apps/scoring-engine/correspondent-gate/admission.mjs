/**
 * Admission control for the scoring engine.
 *
 * Takes the Gate 1 packet AND the deterministic validation report, because they
 * answer different questions and only one of them is authoritative about itself.
 *
 * Four statuses, matching the review packet the validator already produces:
 *   contractValidation   Is the package structurally sound?   (validator)
 *   gate1ReviewAllowed   May a human review it?               (validator)
 *   businessReadiness    Are the open items resolved?         (packet)
 *   scoringAuthorised    May the engine produce a number?     (both)
 *
 * A package can be structurally perfect and still unscoreable. That is the
 * normal case, not an error.
 */

export const Status = Object.freeze({
  PASS: "PASS",
  FAIL: "FAIL",
  ALLOWED: "ALLOWED",
  BLOCKED_BY_OPEN_ITEMS: "BLOCKED_BY_OPEN_ITEMS",
  READY: "READY",
  AUTHORISED: "AUTHORISED",
  NOT_AUTHORISED: "NOT_AUTHORISED",
});

export const REQUIRED_FACTORS = ["F1", "F2", "F3", "F4", "F5", "F6"];

// Validator checks phrased as "every X must Y" pass trivially when there are no X.
// A vacuous pass is not evidence of correctness, so we detect it explicitly rather
// than letting a green report imply something it does not establish.
const VACUOUS_RISK_CHECKS = {
  APPROVED_MAPPING_RULE: ["candidate_indicators", "candidate_count"],
};

export function checkAdmission(packet, validation = null) {
  const header = packet.run_and_case_header ?? {};
  const result = {
    caseId: header.case_id ?? packet.case_id ?? "UNKNOWN",
    runId: header.run_id ?? packet.run_id ?? "UNKNOWN",
    contractValidation: Status.FAIL,
    gate1ReviewAllowed: Status.BLOCKED_BY_OPEN_ITEMS,
    businessReadiness: Status.BLOCKED_BY_OPEN_ITEMS,
    scoringAuthorised: Status.NOT_AUTHORISED,
    blockers: [],
    notes: [],
    provenance: {},
    get admitted() { return this.scoringAuthorised === Status.AUTHORISED; },
  };
  const block = (code, detail, source) => result.blockers.push({ code, detail, source });

  // --- Layer 1: contract validation. The validator is authoritative here. ---
  // The packet's own packet_status is stale by construction: it was written
  // before the validator ran. Never read it as the current state.
  if (!validation) {
    block("NO_VALIDATION_REPORT",
      "No deterministic validation report supplied. The packet cannot attest to " +
      "its own validation.", "validation_report");
    return result;
  }

  result.provenance = {
    validator_version: validation.validator_version,
    validation_executed_on: validation.executed_on,
    validation_result: validation.overall_result,
    packet_status_at_generation: packet.packet_status,
  };

  if (validation.overall_result !== "PASS") {
    const failed = (validation.findings ?? [])
      .filter((f) => f.result !== "PASS").map((f) => f.check_id);
    block("CONTRACT_VALIDATION_FAILED",
      `Validator reports ${validation.overall_result}. Failed checks: ` +
      `${failed.join(", ") || "unspecified"}.`, "deterministic_validation_report");
    return result;
  }
  result.contractValidation = Status.PASS;

  // --- Layer 2: may a human review it? ---
  result.gate1ReviewAllowed = validation.gate_1_review_allowed
    ? Status.ALLOWED : Status.BLOCKED_BY_OPEN_ITEMS;

  // --- Layer 3: business readiness. The packet is authoritative here. ---
  for (const exc of packet.exceptions_and_missing_information ?? []) {
    if (exc.blocking) {
      block("BLOCKING_EXCEPTION",
        `${exc.exception_id} (${exc.exception_type}, ${exc.severity}): ${exc.required_action}`,
        exc.exception_id);
    }
  }

  for (const hx of packet.hard_exclusion_candidates ?? []) {
    if (hx.status === "TRIGGERED") {
      block("HARD_EXCLUSION_TRIGGERED",
        `${hx.hard_exclusion_candidate_id} (${hx.exclusion_rule_id}) fired. ` +
        "The relationship is refused and is not scored.", hx.hard_exclusion_candidate_id);
    } else if (hx.status !== "NOT_TRIGGERED") {
      block("HARD_EXCLUSION_UNRESOLVED",
        `${hx.hard_exclusion_candidate_id} (${hx.exclusion_rule_id}) is ${hx.status}. ` +
        `${hx.required_human_action ?? ""}`, hx.hard_exclusion_candidate_id);
    }
  }

  if (!packet.gate_1_decision_section?.gate_1_status) {
    block("GATE1_NOT_DECIDED",
      "gate_1_status is null. A human has not recorded a Gate 1 decision.",
      "gate_1_decision_section");
  }

  // --- Layer 4: are there anchors to score at all? ---
  const indicators = packet.candidate_indicators ?? {};
  const anchors = new Set((indicators.indicators ?? []).map((i) => i.factor_id));
  const missing = REQUIRED_FACTORS.filter((f) => !anchors.has(f));
  if (missing.length) {
    block("NO_FACTOR_ANCHORS",
      `No approved anchor for ${missing.join(", ")}. candidate_indicator_count is ` +
      `${indicators.candidate_count ?? 0}. The engine will not substitute a default ` +
      "for a factor the mapping never produced.", "candidate_indicators");
  }

  // --- Vacuous validator passes. A green check over an empty set proves nothing. ---
  for (const finding of validation.findings ?? []) {
    const spec = VACUOUS_RISK_CHECKS[finding.check_id];
    if (spec && finding.result === "PASS") {
      const [section, countKey] = spec;
      if (!packet[section]?.[countKey]) {
        result.notes.push(
          `${finding.check_id} passed over an empty set (${section}.${countKey} is 0). ` +
          "The check is satisfied but establishes nothing. Do not read it as mapping coverage.");
      }
    }
  }

  for (const ctl of packet.control_assessment ?? []) {
    if (ctl.evidence_status !== "VERIFIED") {
      result.notes.push(
        `${ctl.control_domain}: evidence_status is "${ctl.evidence_status}" - capped at ` +
        "the self-asserted tier until a human verification record exists.");
    }
  }

  if (!result.blockers.length) {
    result.businessReadiness = Status.READY;
    result.scoringAuthorised = Status.AUTHORISED;
  }
  return result;
}

export function render(r) {
  const out = [
    "=".repeat(76),
    `ADMISSION  case ${r.caseId}   run ${r.runId}`,
    "=".repeat(76),
    `  Package contract validation : ${r.contractValidation}`,
    `  Gate 1 review allowed       : ${r.gate1ReviewAllowed}`,
    `  Business readiness          : ${r.businessReadiness}`,
    `  Scoring authorisation       : ${r.scoringAuthorised}`,
  ];
  if (Object.keys(r.provenance).length) {
    out.push("", "  Validation provenance:");
    for (const [k, v] of Object.entries(r.provenance)) out.push(`    ${k}: ${v}`);
  }
  if (r.blockers.length) {
    out.push("", `${r.blockers.length} blocker(s) preventing scoring:`, "");
    r.blockers.forEach((b, i) => {
      out.push(`  ${i + 1}. [${b.code}]  source: ${b.source}`);
      out.push(`     ${b.detail}\n`);
    });
  }
  if (r.notes.length) out.push("Notes:", ...r.notes.map((n) => `  - ${n}`));
  return out.join("\n");
}
