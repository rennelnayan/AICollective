/** Form-to-JSON conversion tests. The form is the human surface; this is the
 *  only bridge to the engine, so it refuses rather than guessing. */

import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, copyFileSync, unlinkSync } from "node:fs";
import { readGate1Form, FormError } from "./gate1Form.mjs";
import { readSheet, readRows, cell } from "./xlsxRead.mjs";
import { readJson } from "./mapper.mjs";

const FORM = "./Gate1-Review-Form-COMPLETED.xlsx";
const BLANK = "./Gate1-Review-Form.xlsx";
const PACKET = "./draft-gate1-packet.json";
const skip = !(existsSync(FORM) && existsSync(PACKET)) && "form or packet not in this folder";
const blankSkip = !(existsSync(BLANK) && existsSync(PACKET)) && "blank form not in this folder";

test("the xlsx reader opens a workbook with no dependencies", { skip }, () => {
  const cells = readSheet(FORM, 1);
  assert.equal(cell(cells, "C5"), "CG-CASE-HP-002");
  assert.equal(cell(cells, "C15"), "APPROVED_FOR_SCORING");
});

test("bounded row reads do not pick up hint text below the entry block", { skip }, () => {
  // Row 28 carries guidance, not data. An unbounded scan would read it.
  const cells = readSheet(FORM, 1);
  const rows = readRows(cells, 20, 27, ["B","C","D","E","F","G","H","I"]);
  assert.ok(rows.every((r) => r.rowNumber <= 27));
  assert.ok(rows.every((r) => /^EXC-/.test(r.values[0])));
});

test("a completed form converts to a valid decision", { skip }, () => {
  const d = readGate1Form(FORM, readJson(PACKET));
  assert.equal(d.schema_name, "GATE1_DECISION");
  assert.equal(d.gate_1_status, "APPROVED_FOR_SCORING");
  assert.equal(d.exception_resolutions.length, 2);
  assert.equal(d.hard_exclusion_resolutions.length, 3);
  // Look up by ID, not position. Row order is the reviewer's choice.
  const evidenceExc = d.exception_resolutions.find((r) => r.exception_id === "EXC-0002");
  assert.deepEqual(evidenceExc.evidence_reviewed,
    ["EV-004", "EV-005", "EV-006", "EV-007", "EV-008", "EV-009"]);
});

test("the exclusion rule id is carried over from the packet", { skip }, () => {
  const packet = readJson(PACKET);
  const d = readGate1Form(FORM, packet);
  const hex3 = d.hard_exclusion_resolutions
    .find((r) => r.hard_exclusion_id === "HEX-0003");
  const expected = packet.hard_exclusion_candidates
    .find((h) => h.hard_exclusion_candidate_id === "HEX-0003").exclusion_rule_id;
  assert.equal(hex3.exclusion_rule_id, expected);
});

test("a blank form is refused", { skip: blankSkip }, () => {
  assert.throws(() => readGate1Form(BLANK, readJson(PACKET)),
    (e) => e instanceof FormError && /empty or a placeholder/.test(e.message));
});

test("a form that misses an open item names the item", { skip }, async () => {
  // Removing the HEX-0003 row should produce a message naming HEX-0003,
  // not a generic failure.
  const tmp = "./_tmp-form.xlsx";
  copyFileSync(FORM, tmp);
  const { execSync } = await import("node:child_process");
  execSync(`python3 -c "
from openpyxl import load_workbook
wb=load_workbook('${tmp}'); ws=wb['Review']
for c in 'BCDEFGHI': ws[c+'36']=None
wb.save('${tmp}')"`);
  try {
    assert.throws(() => readGate1Form(tmp, readJson(PACKET)),
      (e) => e instanceof FormError && /HEX-0003/.test(e.message));
  } finally {
    unlinkSync(tmp);
  }
});

test("a form resolving an exception not in the packet is refused", { skip }, async () => {
  const tmp = "./_tmp-form2.xlsx";
  copyFileSync(FORM, tmp);
  const { execSync } = await import("node:child_process");
  execSync(`python3 -c "
from openpyxl import load_workbook
wb=load_workbook('${tmp}'); ws=wb['Review']
ws['B22']='EXC-9999'; ws['C22']='REVIEWED'; ws['D22']='R. Nayan'; ws['E22']='MLRO'; ws['H22']='invented'
wb.save('${tmp}')"`);
  try {
    assert.throws(() => readGate1Form(tmp, readJson(PACKET)),
      (e) => e instanceof FormError && /not in the packet/.test(e.message));
  } finally {
    unlinkSync(tmp);
  }
});

test("the engine reads the signed workbook, with no JSON intermediate", { skip }, () => {
  // What the engine acts on is exactly what the reviewer signed. There is no
  // file in between that anyone can edit after the fact.
  const d = readGate1Form(FORM, readJson(PACKET));
  assert.equal(d.gate_1_status, "APPROVED_FOR_SCORING");
  assert.equal(d.reviewer_id, "R. Nayan");
  assert.ok(!existsSync("./gate1-decision.json"),
    "fullRun must not require a JSON decision file");
});

test("per-row dates are read, not inherited from the decision date", { skip }, () => {
  // An evidence review and a sanctions determination are often made on
  // different days by different people, and the record should say so.
  const d = readGate1Form(FORM, readJson(PACKET));
  const exc = d.exception_resolutions.find((r) => r.exception_id === "EXC-0002");
  const hex = d.hard_exclusion_resolutions
    .find((r) => r.hard_exclusion_id === "HEX-0003");
  assert.equal(d.decision_date, "2026-10-05");
  assert.equal(exc.resolution_date, "2026-10-04");
  assert.equal(hex.resolution_date, "2026-10-02");
});

test("an empty per-row date falls back to the decision date", { skip }, () => {
  const d = readGate1Form(FORM, readJson(PACKET));
  const exc = d.exception_resolutions.find((r) => r.exception_id === "EXC-0001");
  assert.equal(exc.resolution_date, d.decision_date);
});

test("control evidence status is carried through from the form", { skip }, () => {
  // This is what caps the control tiers at self-asserted.
  const d = readGate1Form(FORM, readJson(PACKET));
  const exc = d.exception_resolutions.find((r) => r.exception_id === "EXC-0002");
  assert.equal(exc.control_evidence_status, "PROVIDED_NOT_INDEPENDENTLY_VERIFIED");
});

test("the exclusion rule id is filled from the packet, not typed", { skip }, () => {
  const packet = readJson(PACKET);
  const d = readGate1Form(FORM, packet);
  for (const r of d.hard_exclusion_resolutions) {
    const expected = packet.hard_exclusion_candidates
      .find((h) => h.hard_exclusion_candidate_id === r.hard_exclusion_id);
    assert.equal(r.exclusion_rule_id, expected.exclusion_rule_id);
  }
});

test("the decision records which workbook it was read from", { skip }, () => {
  const d = readGate1Form(FORM, readJson(PACKET));
  assert.match(d._source, /Gate1-Review-Form-COMPLETED\.xlsx/);
});

test("each resolution carries the role held when it was made", { skip }, () => {
  // A sanctions determination and an evidence review are different roles, and
  // the record should say which, per item, not once for the whole decision.
  const d = readGate1Form(FORM, readJson(PACKET));
  const exc = d.exception_resolutions.find((r) => r.exception_id === "EXC-0002");
  const hex = d.hard_exclusion_resolutions.find((r) => r.hard_exclusion_id === "HEX-0003");
  assert.equal(exc.reviewer_role, "Financial Crime Analyst");
  assert.equal(hex.reviewer_role, "Sanctions Operations");
  assert.notEqual(exc.reviewer_id, hex.reviewer_id);
});

test("a resolution with no reviewer role is refused", { skip }, async () => {
  const tmp = "./_tmp-role.xlsx";
  (await import("node:fs")).copyFileSync(FORM, tmp);
  const { execSync } = await import("node:child_process");
  execSync(`python3 -c "
from openpyxl import load_workbook
wb=load_workbook('${tmp}'); ws=wb['Review']
ws['E21']=None
wb.save('${tmp}')"`);
  try {
    assert.throws(() => readGate1Form(tmp, readJson(PACKET)),
      (e) => e instanceof FormError && /Reviewer role/.test(e.message));
  } finally {
    (await import("node:fs")).unlinkSync(tmp);
  }
});
