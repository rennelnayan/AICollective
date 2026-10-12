/** Gate 1 decision tests. A human decision is an input, never a generated artifact. */

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { applyGate1Decision, ResolutionError } from "./resolve.mjs";
import { checkAdmission, Status } from "./admission.mjs";
import { readJson } from "./mapper.mjs";

const PRESENT = existsSync("./draft-gate1-packet.json")
  && existsSync("./gate1-decision.example.json");
const skip = !PRESENT && "case files not in this folder";

const loadPair = () => [readJson("./draft-gate1-packet.json"),
                        readJson("./gate1-decision.example.json")];

const named = (d) => {
  const c = structuredClone(d);
  c.reviewer_id = "Test Reviewer";
  for (const r of c.exception_resolutions) r.resolved_by = "Test Reviewer";
  for (const r of c.hard_exclusion_resolutions) r.resolved_by = "Test Sanctions";
  return c;
};

test("a placeholder name is refused", { skip }, () => {
  const [packet, decision] = loadPair();
  // The example ships with bracketed placeholders on purpose.
  assert.throws(() => applyGate1Decision(packet, decision),
    (e) => e instanceof ResolutionError && /placeholder/.test(e.message));
});

test("a decision for the wrong case is refused", { skip }, () => {
  const [packet, decision] = loadPair();
  const wrong = named(decision);
  wrong.case_id = "CG-CASE-SOMETHING-ELSE";
  assert.throws(() => applyGate1Decision(packet, wrong),
    (e) => e instanceof ResolutionError && /decision is for case/.test(e.message));
});

test("UNKNOWN is not a valid resolution for a hard exclusion", { skip }, () => {
  const [packet, decision] = loadPair();
  const bad = named(decision);
  bad.hard_exclusion_resolutions[0].status = "UNKNOWN";
  assert.throws(() => applyGate1Decision(packet, bad),
    (e) => e instanceof ResolutionError && /what we are resolving/.test(e.message));
});

test("a hard exclusion resolution must say where it came from", { skip }, () => {
  const [packet, decision] = loadPair();
  const bad = named(decision);
  delete bad.hard_exclusion_resolutions[0].determination_source;
  assert.throws(() => applyGate1Decision(packet, bad),
    (e) => e instanceof ResolutionError && /determination_source is required/.test(e.message));
});

test("a complete decision clears the open items and records who cleared them", { skip }, () => {
  const [packet, decision] = loadPair();
  const { resolved, applied } = applyGate1Decision(packet, named(decision));
  assert.equal(applied.length, 3);
  const hex3 = resolved.hard_exclusion_candidates
    .find((h) => h.hard_exclusion_candidate_id === "HEX-0003");
  assert.equal(hex3.status, "NOT_TRIGGERED");
  assert.equal(hex3.resolution.resolved_by, "Test Sanctions");
  const exc2 = resolved.exceptions_and_missing_information
    .find((e) => e.exception_id === "EXC-0002");
  assert.equal(exc2.blocking, false);
  assert.equal(resolved.gate_1_decision_section.gate_1_status, "APPROVED_FOR_SCORING");
});

test("a decision that leaves an item open still refuses at admission", { skip }, () => {
  // Resolving some things is not resolving everything.
  const [packet, decision] = loadPair();
  const partial = named(decision);
  partial.hard_exclusion_resolutions = [];   // HEX-0003 left UNKNOWN
  const { resolved } = applyGate1Decision(packet, partial);
  resolved.candidate_indicators = {
    candidate_count: 6,
    indicators: ["F1","F2","F3","F4","F5","F6"].map((f) => ({ factor_id: f })),
  };
  for (const e of resolved.exceptions_and_missing_information) {
    if (e.exception_id === "EXC-0001") e.blocking = false;
  }
  const r = checkAdmission(resolved, readJson("./deterministic-validation-report.json"));
  assert.equal(r.scoringAuthorised, Status.NOT_AUTHORISED);
  assert.ok(r.blockers.some((b) => b.code === "HARD_EXCLUSION_UNRESOLVED"));
});
