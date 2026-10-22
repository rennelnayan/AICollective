/** Gate 2 tests. An override must be explainable; a fact error is not an override. */

import test from "node:test";
import assert from "node:assert/strict";
import { applyGate2Decision, overrideReport, Gate2Error, Decision } from "./gate2.mjs";

const SCORE = {
  case_id: "C1", run_id: "R1",
  scoring_authorised: true,
  risk_model_version: "v0.1", mapping_version: "1.1.0",
  inherent: 16.5, combinedMultiplier: 0.7807, floorApplied: false,
  residual: 12.88, band: "Low", approval: "Analyst at Gate 2",
};

const BASE = {
  case_id: "C1", gate_2_decision_id: "G2-1",
  reviewer_id: "A. Reviewer", reviewer_role: "Financial Crime Analyst",
  decision_date: "2026-10-03",
  reviewed_risk_model_version: "v0.1", reviewed_mapping_version: "1.1.0",
};

const LONG = "Respondent holds a material legacy population the product questions " +
             "do not capture, so the factor understates the exposure.";

const throws = (d, re) => assert.throws(() => applyGate2Decision(SCORE, d),
  (e) => e instanceof Gate2Error && re.test(e.message));

test("accept carries the machine band through as effective", () => {
  const r = applyGate2Decision(SCORE, { ...BASE, decision: "ACCEPT" });
  assert.equal(r.effective_band, "Low");
  assert.equal(r.machine_assessment.band, "Low");
});

test("gate 2 cannot review an unauthorised score", () => {
  // Nothing has been assessed yet, so there is nothing to review.
  assert.throws(
    () => applyGate2Decision({ ...SCORE, scoring_authorised: false },
                             { ...BASE, decision: "ACCEPT" }),
    (e) => e instanceof Gate2Error && /unauthorised score/.test(e.message));
});

test("a placeholder reviewer is refused", () => {
  throws({ ...BASE, decision: "ACCEPT", reviewer_id: "[name]" }, /placeholder/);
});

test("version drift between scoring and review is refused", () => {
  // Reviewing against different weights than produced the number is silent otherwise.
  throws({ ...BASE, decision: "ACCEPT", reviewed_risk_model_version: "v0.2" },
         /version drift/);
});

test("a decision for the wrong case is refused", () => {
  throws({ ...BASE, decision: "ACCEPT", case_id: "SOMETHING-ELSE" }, /decision is for case/);
});

test("an override must carry a category from the fixed list", () => {
  throws({ ...BASE, decision: "OVERRIDE", override_band: "Moderate",
           override_category: "felt wrong", rationale: LONG },
         /override_category must be one of/);
});

test("an override rationale under 50 characters is refused", () => {
  throws({ ...BASE, decision: "OVERRIDE", override_band: "Moderate",
           override_category: "CONTEXT_NOT_CAPTURED_BY_MODEL", rationale: "looks high" },
         /at least 50 characters/);
});

test("an override to the band already assessed is refused", () => {
  // That is agreement, and agreement is ACCEPT.
  throws({ ...BASE, decision: "OVERRIDE", override_band: "Low",
           override_category: "CONTEXT_NOT_CAPTURED_BY_MODEL", rationale: LONG },
         /already assessed/);
});

test("an override supersedes but never overwrites the machine output", () => {
  const r = applyGate2Decision(SCORE, {
    ...BASE, decision: "OVERRIDE", override_band: "Moderate",
    override_category: "CONTEXT_NOT_CAPTURED_BY_MODEL",
    affected_factor_ids: ["F5"], rationale: LONG,
    machine_band_index: 0, override_band_index: 1,
  });
  assert.equal(r.effective_band, "Moderate");
  assert.equal(r.machine_assessment.band, "Low");       // preserved
  assert.equal(r.machine_assessment.residual, 12.88);   // preserved
  assert.equal(r.override.direction, "UPWARD");
});

test("a remand must name the disputed source records", () => {
  throws({ ...BASE, decision: "REMAND",
           remand_reason: "EXTRACTED_VALUE_DOES_NOT_MATCH_SOURCE" },
         /name the source records in dispute/);
});

test("a remand produces no effective band and returns to gate 1", () => {
  // A fact error is a Gate 1 failure, not an override. Nothing is effective
  // until the case is corrected and re-scored.
  const r = applyGate2Decision(SCORE, {
    ...BASE, decision: "REMAND",
    remand_reason: "MAPPING_RULE_APPLIED_WRONG_ANCHOR",
    disputed_source_record_ids: ["SRC-CBDDQ-19"], rationale: LONG,
  });
  assert.equal(r.effective_band, null);
  assert.equal(r.remand.returns_to, "GATE_1");
  assert.match(r.next_step, /Do not override a fact error/);
});

test("an unknown decision verb is refused", () => {
  throws({ ...BASE, decision: "APPROVE" }, /decision must be one of/);
});

test("the override report flags a factor overridden too often", () => {
  const accept = { decision: Decision.ACCEPT };
  const ovr = (f) => ({ decision: Decision.OVERRIDE,
                        override: { category: "FACTOR_UNDERSTATES_RISK",
                                    affected_factor_ids: [f] } });
  const report = overrideReport([accept, accept, ovr("F5"), ovr("F5"), ovr("F3")]);
  assert.equal(report.total, 5);
  assert.equal(report.overridden, 3);
  assert.equal(report.override_rate, 0.6);
  // F5 at 2/5 = 0.4 clears the 0.25 threshold. F3 at 1/5 = 0.2 does not, and
  // should not: one override is noise, not a pattern.
  assert.deepEqual(report.factors_for_review, [{ factor_id: "F5", rate: 0.4 }]);
});
