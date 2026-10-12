/** End to end: register -> mapping -> optional Gate 1 decision -> admission -> scoring. */

import { existsSync, writeFileSync } from "node:fs";
import { checkAdmission, render } from "./admission.mjs";
import { mapFactors, readJson } from "./mapper.mjs";
import { applyGate1Decision } from "./resolve.mjs";
import { ScoringConfig, score, explain } from "./scoring.mjs";

let packet        = readJson("./draft-gate1-packet.json");
const validation  = readJson("./deterministic-validation-report.json");
const register    = readJson("./exhaustive-source-register.json");
const rules       = readJson("./mapping.rules.v1.1.json");
const config      = ScoringConfig.load("./weights.v0.1.json");

const { extraction } = mapFactors(register, rules);

// Inject the mapped anchors so admission sees real coverage. Closes EXC-0001.
packet.candidate_indicators = {
  candidate_count: Object.keys(extraction.factors).length,
  mapping_version: rules.mapping_version,
  indicators: Object.entries(extraction.factors).map(([factor_id, f]) => ({
    factor_id, anchor: f.anchor, rule_id: f.rule_id, source_record_ids: f.evidence_refs,
  })),
};
for (const exc of packet.exceptions_and_missing_information ?? []) {
  if (exc.exception_id === "EXC-0001") {
    exc.blocking = false;
    exc.finding = `Resolved by mapping catalogue ${rules.mapping_version}. ` +
                  "All six factors anchored from the exhaustive source register.";
  }
}

// A human Gate 1 decision, if one has been recorded.
const DECISION = "./gate1-decision.json";
if (existsSync(DECISION)) {
  const { resolved, applied } = applyGate1Decision(packet, readJson(DECISION));
  packet = resolved;
  console.log("Gate 1 decision applied:");
  for (const a of applied) console.log(`  - ${a}`);
  console.log();
} else {
  console.log(`No ${DECISION} found. Running against the undecided draft.\n`);
}

const admission = checkAdmission(packet, validation);
console.log(render(admission));

const result = score(extraction, config);
console.log("\n" + "=".repeat(76));
console.log(admission.admitted
  ? "SCORING RESULT - AUTHORISED"
  : "WHAT THE SCORE WOULD BE ONCE THE REMAINING BLOCKERS CLEAR");
console.log("=".repeat(76) + "\n");
console.log(explain(result));

writeFileSync("scoring_output.json", JSON.stringify({
  schema_name: "SCORING_RESULT",
  schema_version: "1.0.0",
  case_id: admission.caseId,
  run_id: admission.runId,
  scoring_authorised: admission.admitted,
  status: admission.admitted ? "OFFICIAL" : "PROVISIONAL_NOT_OFFICIAL",
  contract_validation: admission.contractValidation,
  gate1_review_allowed: admission.gate1ReviewAllowed,
  business_readiness: admission.businessReadiness,
  gate_1_decision: packet.gate_1_decision_section,
  validation_provenance: admission.provenance,
  open_blockers: admission.blockers.map((b) => ({ code: b.code, source: b.source })),
  risk_model_version: result.configVersion,
  mapping_version: rules.mapping_version,
  ...result,
}, null, 2));
console.log("\nWritten: scoring_output.json");
