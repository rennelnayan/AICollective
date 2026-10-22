/** Admission control tests. A refusal is a correct outcome, not a failure.
 *  Run with: node --test */

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { checkAdmission, Status } from "./admission.mjs";
import { readJson } from "./mapper.mjs";

const clone = (o) => structuredClone(o);

const VALIDATION_PASS = {
  overall_result: "PASS",
  gate_1_review_allowed: true,
  validator_version: "1.0.2",
  executed_on: "2026-09-28T20:59:13.241Z",
  findings: [{ check_id: "APPROVED_MAPPING_RULE", result: "PASS" }],
};

const CLEAN_PACKET = {
  packet_status: "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  run_and_case_header: { case_id: "C1", run_id: "R1" },
  gate_1_decision_section: { gate_1_status: "APPROVED" },
  exceptions_and_missing_information: [
    { exception_id: "E1", exception_type: "NOTE", severity: "LOW",
      required_action: "none", blocking: false },
  ],
  hard_exclusion_candidates: [
    { hard_exclusion_candidate_id: "H1", exclusion_rule_id: "SHELL_BANK",
      status: "NOT_TRIGGERED" },
  ],
  candidate_indicators: {
    candidate_count: 6,
    indicators: ["F1","F2","F3","F4","F5","F6"].map((f) => ({ factor_id: f })),
  },
  control_assessment: ["C1","C2","C3","C4"].map((c) =>
    ({ control_domain: c, evidence_status: "VERIFIED" })),
};

const codes = (r) => new Set(r.blockers.map((b) => b.code));

test("a clean packet with a passing validation is authorised", () => {
  const r = checkAdmission(CLEAN_PACKET, VALIDATION_PASS);
  assert.equal(r.contractValidation, Status.PASS);
  assert.equal(r.gate1ReviewAllowed, Status.ALLOWED);
  assert.equal(r.businessReadiness, Status.READY);
  assert.equal(r.scoringAuthorised, Status.AUTHORISED);
  assert.ok(r.admitted);
});

test("a packet cannot attest to its own validation", () => {
  const r = checkAdmission(CLEAN_PACKET, null);
  assert.ok(!r.admitted);
  assert.ok(codes(r).has("NO_VALIDATION_REPORT"));
});

test("a stale packet status does not block a validated packet", () => {
  // packet_status is written before the validator runs. It is history, not state.
  const r = checkAdmission(CLEAN_PACKET, VALIDATION_PASS);
  assert.ok(r.admitted);
  assert.equal(r.provenance.packet_status_at_generation,
               "DRAFT_PENDING_DETERMINISTIC_VALIDATION");
  assert.equal(r.provenance.validation_result, "PASS");
});

test("a failing validation stops everything before business checks", () => {
  const failing = { ...VALIDATION_PASS, overall_result: "FAIL",
                    findings: [{ check_id: "FACT_ID_UNIQUE", result: "FAIL" }] };
  const r = checkAdmission(CLEAN_PACKET, failing);
  assert.equal(r.contractValidation, Status.FAIL);
  assert.ok(!r.admitted);
  assert.ok(codes(r).has("CONTRACT_VALIDATION_FAILED"));
});

const CONDITIONS = [
  ["gate 1 undecided", (p) => { p.gate_1_decision_section.gate_1_status = null; },
   "GATE1_NOT_DECIDED"],
  ["blocking exception", (p) => { p.exceptions_and_missing_information[0].blocking = true; },
   "BLOCKING_EXCEPTION"],
  ["hard exclusion unknown", (p) => { p.hard_exclusion_candidates[0].status = "UNKNOWN"; },
   "HARD_EXCLUSION_UNRESOLVED"],
  ["hard exclusion triggered", (p) => { p.hard_exclusion_candidates[0].status = "TRIGGERED"; },
   "HARD_EXCLUSION_TRIGGERED"],
  ["no anchors", (p) => { p.candidate_indicators = { candidate_count: 0, indicators: [] }; },
   "NO_FACTOR_ANCHORS"],
];

for (const [name, mutate, code] of CONDITIONS) {
  test(`${name} refuses on its own`, () => {
    const packet = clone(CLEAN_PACKET);
    mutate(packet);
    const r = checkAdmission(packet, VALIDATION_PASS);
    assert.ok(!r.admitted);
    assert.equal(r.businessReadiness, Status.BLOCKED_BY_OPEN_ITEMS);
    assert.ok(codes(r).has(code));
  });
}

test("unknown hard exclusion is not treated as not triggered", () => {
  // The distinction the whole gate turns on.
  const packet = clone(CLEAN_PACKET);
  packet.hard_exclusion_candidates[0].status = "UNKNOWN";
  assert.ok(!checkAdmission(packet, VALIDATION_PASS).admitted);
});

test("a partial anchor set is still refused", () => {
  // Five of six is not five sixths of a score.
  const packet = clone(CLEAN_PACKET);
  packet.candidate_indicators.indicators =
    ["F1","F2","F3","F4","F5"].map((f) => ({ factor_id: f }));
  const r = checkAdmission(packet, VALIDATION_PASS);
  assert.ok(!r.admitted);
  assert.ok(r.blockers.some((b) => b.detail.includes("F6")));
});

test("unverified evidence is a note not a blocker", () => {
  // It caps the control tier; it does not stop the case.
  const packet = clone(CLEAN_PACKET);
  for (const c of packet.control_assessment) {
    c.evidence_status = "PROVIDED_NOT_INDEPENDENTLY_VERIFIED";
  }
  const r = checkAdmission(packet, VALIDATION_PASS);
  assert.ok(r.admitted);
  assert.equal(r.notes.length, 4);
});

test("a validator check passing over an empty set is flagged", () => {
  // APPROVED_MAPPING_RULE passes trivially when there are no candidates.
  // A green check over an empty set establishes nothing.
  const packet = clone(CLEAN_PACKET);
  packet.candidate_indicators = { candidate_count: 0, indicators: [] };
  const r = checkAdmission(packet, VALIDATION_PASS);
  assert.ok(r.notes.some((n) => n.includes("empty set")));
});

// --- the real case -----------------------------------------------------------

const CASE_FILES_PRESENT = existsSync("./draft-gate1-packet.json")
  && existsSync("./deterministic-validation-report.json");

test("HP-002 passes validation but is not authorised to score",
  { skip: !CASE_FILES_PRESENT && "HP-002 case files not in this folder" }, () => {
    const r = checkAdmission(readJson("./draft-gate1-packet.json"),
                             readJson("./deterministic-validation-report.json"));
    assert.equal(r.contractValidation, Status.PASS);
    assert.equal(r.gate1ReviewAllowed, Status.ALLOWED);
    assert.equal(r.businessReadiness, Status.BLOCKED_BY_OPEN_ITEMS);
    assert.equal(r.scoringAuthorised, Status.NOT_AUTHORISED);
    assert.equal(r.blockers.length, 5);
    assert.ok(r.notes.some((n) => n.includes("empty set")));
  });
