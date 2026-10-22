/** Mapping tests. The rules must be deterministic and traceable to source. */

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mapFactors, readJson } from "./mapper.mjs";

const PRESENT = existsSync("./exhaustive-source-register.json");
const skip = !PRESENT && "exhaustive-source-register.json not in this folder";

test("every factor anchors from the register", { skip }, () => {
  const { extraction, unmapped } = mapFactors(
    readJson("./exhaustive-source-register.json"),
    readJson("./mapping.rules.v1.1.json"));
  assert.deepEqual(unmapped, []);
  assert.equal(Object.keys(extraction.factors).length, 6);
});

test("every anchor carries a source record and a cell reference", { skip }, () => {
  const { extraction } = mapFactors(
    readJson("./exhaustive-source-register.json"),
    readJson("./mapping.rules.v1.1.json"));
  for (const [fid, f] of Object.entries(extraction.factors)) {
    assert.ok(f.evidence_refs.length > 0, `${fid} has no source record`);
    assert.ok(f.source_location, `${fid} has no cell reference`);
    assert.ok(f.rule_id, `${fid} has no rule id`);
  }
});

test("mapping the same register twice gives the same anchors", { skip }, () => {
  const register = readJson("./exhaustive-source-register.json");
  const rules = readJson("./mapping.rules.v1.1.json");
  const a = JSON.stringify(mapFactors(register, rules).extraction);
  const b = JSON.stringify(mapFactors(register, rules).extraction);
  assert.equal(a, b);
});

test("a shell bank answer drives F4 to the maximum anchor", { skip }, () => {
  // The most adverse matching rule governs, whatever else is true.
  const register = structuredClone(readJson("./exhaustive-source-register.json"));
  const rec = register.records.find(
    (r) => r.workbook_type === "CBDDQ" && String(r.question_or_field_id) === "18");
  rec.normalized_value = "YES";
  const { extraction } = mapFactors(register, readJson("./mapping.rules.v1.1.json"));
  assert.equal(extraction.factors.F4.anchor, 10);
  assert.equal(extraction.factors.F4.rule_id, "F4-R1");
});

test("bearer shares drive F3 to the maximum anchor", { skip }, () => {
  const register = structuredClone(readJson("./exhaustive-source-register.json"));
  const rec = register.records.find(
    (r) => r.workbook_type === "CBDDQ" && String(r.question_or_field_id) === "16");
  rec.normalized_value = "YES";
  const { extraction } = mapFactors(register, readJson("./mapping.rules.v1.1.json"));
  assert.equal(extraction.factors.F3.anchor, 10);
});

test("payable-through accounts drive F5 to the maximum anchor", { skip }, () => {
  const register = structuredClone(readJson("./exhaustive-source-register.json"));
  const rec = register.records.find(
    (r) => r.workbook_type === "CBDDQ" && String(r.question_or_field_id) === "20");
  rec.normalized_value = "YES";
  const { extraction } = mapFactors(register, readJson("./mapping.rules.v1.1.json"));
  assert.equal(extraction.factors.F5.anchor, 10);
});
