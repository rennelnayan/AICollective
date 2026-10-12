/**
 * Turn the exhaustive source register into factor anchors using approved rules.
 *
 * Deterministic. This is what closes EXC-0001: the rules key on the field IDs
 * the register already emits, so no workbook has to change.
 */

import { readFileSync, writeFileSync } from "node:fs";

const text = (v) => String(v ?? "").trim();

const OPS = {
  eq:           (v, vals) => vals.includes(text(v)),
  ne:           (v, vals) => !vals.includes(text(v)),
  in:           (v, vals) => vals.includes(text(v)),
  not_in:       (v, vals) => !vals.includes(text(v)),
  contains:     (v, vals) => vals.some((s) => text(v).toLowerCase().includes(s.toLowerCase())),
  not_contains: (v, vals) => !vals.some((s) => text(v).toLowerCase().includes(s.toLowerCase())),
};

export const readJson = (path) =>
  JSON.parse(readFileSync(path, "utf8").replace(/^\uFEFF/, ""));

export function indexRegister(register) {
  const idx = new Map();
  for (const r of register.records) {
    idx.set(`${r.workbook_type}::${String(r.question_or_field_id)}`, r);
  }
  return idx;
}

export function mapFactors(register, rules) {
  const idx = indexRegister(register);
  const factors = {};
  const unmapped = [];

  for (const [factorId, ruleList] of Object.entries(rules.factor_rules)) {
    let best = null;
    for (const rule of ruleList) {
      const rec = idx.get(`${rule.workbook}::${rule.field}`);
      if (!rec) continue;
      const value = rec.normalized_value ?? rec.raw_value;
      if (OPS[rule.op](value, rule.values)) {
        // Highest anchor wins: the most adverse matching condition governs.
        if (best === null || rule.anchor > best.anchor) {
          best = {
            anchor: rule.anchor,
            rule_id: rule.rule_id,
            basis: rule.basis,
            evidence_refs: [rec.source_record_id],
            source_location: rec.source_location,
            observed_value: value,
          };
        }
      }
    }
    if (best === null) unmapped.push(factorId);
    else factors[factorId] = best;
  }

  const controls = {};
  for (const [cid, spec] of Object.entries(rules.control_rules)) {
    const assertion = idx.get(`${spec.workbook}::${spec.assertion_field}`);
    const vf = spec.verification_field;
    const verification = idx.get(`${vf.workbook}::${vf.field}`);
    if (!assertion) {
      controls[cid] = { tier: "Absent or unanswered", evidence_refs: [] };
      continue;
    }
    const asserted = ["YES", "TRUE"].includes(text(assertion.normalized_value).toUpperCase());
    let tier;
    if (!asserted) {
      tier = rules.evidence_tier_logic._assertion_no;
    } else {
      const vstate = verification ? text(verification.normalized_value) : "";
      tier = rules.evidence_tier_logic[vstate] ?? "Self-asserted only";
    }
    const refs = [assertion.source_record_id];
    if (verification) refs.push(verification.source_record_id);
    controls[cid] = { tier, evidence_refs: refs };
  }

  return { extraction: { factors, controls }, unmapped };
}

// Run directly: node mapper.mjs
if (import.meta.url === `file://${process.argv[1]}`) {
  const register = readJson("./exhaustive-source-register.json");
  const rules = readJson("./mapping.rules.v1.1.json");
  const { extraction, unmapped } = mapFactors(register, rules);

  console.log(`Register records: ${register.record_count}`);
  console.log(`Mapping version:  ${rules.mapping_version}`);
  console.log(`Unmapped factors: ${unmapped.length ? unmapped.join(", ") : "none"}\n`);
  for (const [fid, f] of Object.entries(extraction.factors)) {
    console.log(`  ${fid}: anchor ${String(f.anchor).padStart(2)}  [${f.rule_id}]  ` +
                `${f.source_location} = ${JSON.stringify(String(f.observed_value).slice(0, 28))}`);
    console.log(`       ${f.basis}`);
  }
  console.log();
  for (const [cid, c] of Object.entries(extraction.controls)) {
    console.log(`  ${cid}: ${c.tier}  refs [${c.evidence_refs.join(", ")}]`);
  }
  writeFileSync("mapped_extraction.json", JSON.stringify(extraction, null, 2));
}
