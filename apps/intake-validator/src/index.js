#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import { parseArgs, requireArgs } from './cli.js';
import { readJson, nowIso } from './utils.js';
import { buildSourceRegister } from './workbook.js';
import { extractAgentOutput } from './agent-output.js';
import { validate, summarize } from './validator.js';
import { writeOutputs } from './report.js';

const args=parseArgs(process.argv.slice(2));
try {
  requireArgs(args,['cbddq','scoping','agent-output','mapping','output','case-id','run-id','risk-model-version','mapping-version','schema-version']);
  const layout=readJson(args.layout ?? path.resolve('config/workbook-layout.json'));
  const mapping=readJson(args.mapping);
  const sourceRegister=buildSourceRegister({caseId:args['case-id'],runId:args['run-id'],cbddqFile:args.cbddq,scopingFile:args.scoping,layout});
  const agent=extractAgentOutput(args['agent-output']);
  const expected={caseId:args['case-id'],runId:args['run-id'],riskModelVersion:args['risk-model-version'],mappingVersion:args['mapping-version'],schemaVersion:args['schema-version']};
  const findings=validate({agent,sourceRegister,mappingCatalog:mapping,expected});
  const summary=summarize(findings);
  const overall=summary.blocking_failures>0?'FAIL':summary.failed>0?'PASS_WITH_WARNINGS':'PASS';
  const report={report_type:'DETERMINISTIC_VALIDATION_REPORT',report_version:'1.0.0',case_id:expected.caseId,run_id:expected.runId,validator_version:'1.0.2',executed_on:nowIso(),overall_result:overall,gate_1_review_allowed:overall!=='FAIL',summary,findings};
  const receipt={receipt_type:'COMPONENT_EXECUTION',component_code:'VAL',component_name:'CG Node Validator',component_version:'1.0.2',runtime:process.version,case_id:expected.caseId,run_id:expected.runId,status:overall==='FAIL'?'COMPLETE_WITH_FINDINGS':'COMPLETE',inputs:{cbddq:path.basename(args.cbddq),scoping:path.basename(args.scoping),agent_output:path.basename(args['agent-output']),mapping:path.basename(args.mapping)},outputs:['exhaustive-source-register.json','deterministic-validation-report.json','validation-summary.html','validator-receipt.json'],executed_on:nowIso(),errors:[]};
  writeOutputs({outDir:args.output,sourceRegister,report,receipt});
  console.log(JSON.stringify({overall_result:overall,output:path.resolve(args.output),summary},null,2));
  process.exit(overall==='FAIL'?2:0);
} catch (error) {
  console.error(JSON.stringify({overall_result:'ERROR',error:error.message,stack:process.env.DEBUG?error.stack:undefined},null,2));
  process.exit(1);
}
