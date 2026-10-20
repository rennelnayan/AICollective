/** Apply a Gate 2 decision to the scoring output. */

import { existsSync, writeFileSync } from "node:fs";
import { readJson } from "./mapper.mjs";
import { applyGate2Decision, renderGate2 } from "./gate2.mjs";

const SCORE = "./scoring_output.json";
const DECISION = "./gate2-decision.json";

if (!existsSync(SCORE)) {
  console.error(`No ${SCORE}. Run "node fullRun.mjs" first.`);
  process.exit(1);
}
if (!existsSync(DECISION)) {
  console.error(
    `No ${DECISION}.\n\n` +
    "  copy gate2-decision.example.json gate2-decision.json -Force\n\n" +
    "Then set decision to ACCEPT, OVERRIDE or REMAND, replace the placeholder\n" +
    "name, and run this again.");
  process.exit(1);
}

const record = applyGate2Decision(readJson(SCORE), readJson(DECISION));
console.log(renderGate2(record));
writeFileSync("gate2_assessment_record.json", JSON.stringify(record, null, 2));
console.log("\nWritten: gate2_assessment_record.json");
