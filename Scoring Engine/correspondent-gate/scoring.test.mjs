/** Scoring engine tests. These prove the properties we claim to a panel.
 *  Run with: node --test   (no dependencies, Node 18+) */

import test from "node:test";
import assert from "node:assert/strict";
import { ScoringConfig, ScoringError, ConfigError, score, roundHalfUp } from "./scoring.mjs";

const CFG = ScoringConfig.load("./weights.v0.1.json");

const CASE_A = {  // Alpine Trust Bank - the profile from the Wolfsberg CBDDQ
  factors: {
    F1: { anchor: 3, evidence_refs: ["Q2", "Q108"] },
    F2: { anchor: 0, evidence_refs: ["Q10", "Q11"] },
    F3: { anchor: 0, evidence_refs: ["Q6d1", "Q7"] },
    F4: { anchor: 0, evidence_refs: ["Q3", "Q8"] },
    F5: { anchor: 6, evidence_refs: ["Q19a", "Q19e", "Q19h"] },
    F6: { anchor: 6, evidence_refs: ["Q15", "Q15a"] },
  },
  controls: {
    C1: { tier: "Partially evidenced", evidence_refs: ["Q22g"] },
    C2: { tier: "Self-asserted only", evidence_refs: ["Q22c", "Q22e"] },
    C3: { tier: "Partially evidenced", evidence_refs: ["Q106", "Q107"] },
    C4: { tier: "Self-asserted only", evidence_refs: ["Q19a"] },
  },
};
const CASE_B = {
  factors: { F1: { anchor: 10 }, F2: { anchor: 3 }, F3: { anchor: 10 },
             F4: { anchor: 6 }, F5: { anchor: 6 }, F6: { anchor: 6 } },
  controls: { C1: { tier: "Self-asserted only" }, C2: { tier: "Self-asserted only" },
              C3: { tier: "Self-asserted only" }, C4: { tier: "Absent or unanswered" } },
};
const CASE_C = {
  factors: Object.fromEntries(["F1","F2","F3","F4","F5","F6"].map((f) => [f, { anchor: 10 }])),
  controls: Object.fromEntries(["C1","C2","C3","C4"].map((c) => [c, { tier: "Absent or unanswered" }])),
};

test("matches the hand calculated worked cases", () => {
  assert.equal(score(CASE_A, CFG).residual, 16.04);
  assert.equal(score(CASE_A, CFG).band, "Low");
  assert.equal(score(CASE_B, CFG).residual, 59.39);
  assert.equal(score(CASE_B, CFG).band, "High");
  assert.equal(score(CASE_C, CFG).residual, 100);
  assert.equal(score(CASE_C, CFG).band, "Prohibited pending exception");
});

test("identical input gives identical output every time", () => {
  // The property a language model cannot offer. Run it 500 times.
  const first = JSON.stringify(score(CASE_A, CFG));
  for (let i = 0; i < 500; i += 1) {
    assert.equal(JSON.stringify(score(CASE_A, CFG)), first);
  }
});

test("rounding is half-up, not banker's, and survives float representation", () => {
  // A band boundary that flips depending on where it ran is indefensible.
  assert.equal(roundHalfUp(2.675), 2.68);
  assert.equal(roundHalfUp(0.125), 0.13);
  assert.equal(roundHalfUp(16.04158128), 16.04);
  assert.equal(roundHalfUp(0.59413264, 4), 0.5941);
});

test("unanswered factor scores maximum not zero", () => {
  // Silence is not evidence of absence.
  const r = score({ factors: { F1: { anchor: 0 } }, controls: {} }, CFG);
  assert.equal(r.inherent, 80);
  assert.equal(r.factorLines.filter((fl) => fl.unanswered).length, 5);
});

test("floor binds on a perfect control submission", () => {
  // 0.65^4 = 0.1785, below the 0.20 floor. Controls never eliminate risk.
  const perfect = {
    factors: Object.fromEntries(Object.keys(CFG.factorWeights).map((f) => [f, { anchor: 10 }])),
    controls: Object.fromEntries(CFG.controlDomains.map((c) => [c, { tier: "Independently evidenced" }])),
  };
  const r = score(perfect, CFG);
  assert.equal(r.inherent, 100);
  assert.equal(r.unflooredResidual, 17.85);
  assert.equal(r.residual, 20);
  assert.equal(r.floorApplied, true);
});

test("missing control tier earns no reduction", () => {
  const noControls = {
    factors: Object.fromEntries(Object.keys(CFG.factorWeights).map((f) => [f, { anchor: 6 }])),
    controls: {},
  };
  assert.equal(score(noControls, CFG).combinedMultiplier, 1);
});

test("engine refuses an anchor it was not given criteria for", () => {
  assert.throws(() => score({ factors: { F1: { anchor: 7 } }, controls: {} }, CFG),
    (e) => e instanceof ScoringError && /not one of/.test(e.message));
});

test("engine refuses an unknown evidence tier", () => {
  const bad = {
    factors: Object.fromEntries(Object.keys(CFG.factorWeights).map((f) => [f, { anchor: 0 }])),
    controls: { C1: { tier: "Looks fine to me" } },
  };
  assert.throws(() => score(bad, CFG),
    (e) => e instanceof ScoringError && /not a configured evidence tier/.test(e.message));
});

test("weights that do not total 100 are rejected at load", () => {
  assert.throws(() => new ScoringConfig({
    version: "bad", effective_from: "2026-01-01",
    factor_weights: { F1: 50, F2: 30 }, control_domains: ["C1"],
    evidence_multipliers: { "Absent or unanswered": 1 },
    residual_floor: 0.2, bands: CFG.bands,
  }), (e) => e instanceof ConfigError && /must total 100/.test(e.message));
});

test("band boundaries are inclusive at the lower bound", () => {
  // A case landing exactly on a bound takes the higher band. Decided once, here.
  const onBoundary = {
    factors: { F1: { anchor: 10 }, F2: { anchor: 10 }, F3: { anchor: 0 },
               F4: { anchor: 10 }, F5: { anchor: 0 }, F6: { anchor: 0 } },
    controls: Object.fromEntries(CFG.controlDomains.map((c) => [c, { tier: "Absent or unanswered" }])),
  };
  assert.equal(score(onBoundary, CFG).residual, 45);
  assert.equal(score(onBoundary, CFG).band, "High");
});

test("every factor produces an audit line with its evidence", () => {
  const r = score(CASE_A, CFG);
  assert.equal(r.factorLines.length, 6);
  assert.deepEqual(r.factorLines[0].evidenceRefs, ["Q2", "Q108"]);
  assert.equal(r.configVersion, "v0.1");
});
