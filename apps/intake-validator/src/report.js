import fs from 'node:fs';
import path from 'node:path';
import { writeJson, nowIso } from './utils.js';
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function writeOutputs({outDir,sourceRegister,report,receipt}) {
  fs.mkdirSync(outDir,{recursive:true});
  writeJson(path.join(outDir,'exhaustive-source-register.json'),sourceRegister);
  writeJson(path.join(outDir,'deterministic-validation-report.json'),report);
  writeJson(path.join(outDir,'validator-receipt.json'),receipt);
  const rows=report.findings.map(x=>`<tr class="${x.result.toLowerCase()}"><td>${esc(x.check_id)}</td><td>${esc(x.result)}</td><td>${esc(x.severity)}</td><td>${esc(x.actual_value)}</td><td>${esc(x.required_action)}</td></tr>`).join('');
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>Correspondent Gate Validation</title><style>body{font-family:Arial;margin:32px;color:#172b4d}h1{color:#005a78}.status{font-size:22px;font-weight:bold}.pass{background:#e2f0d9}.fail{background:#fde7e9}table{border-collapse:collapse;width:100%}th,td{padding:8px;border-bottom:1px solid #ccd}th{background:#17365d;color:#fff;text-align:left}</style></head><body><h1>Deterministic Validation Report</h1><p>${esc(report.case_id)} / ${esc(report.run_id)}</p><p class="status">${esc(report.overall_result)}</p><p>Checks ${report.summary.total_checks}; passed ${report.summary.passed}; failed ${report.summary.failed}; blocking ${report.summary.blocking_failures}</p><table><thead><tr><th>Check</th><th>Result</th><th>Severity</th><th>Actual</th><th>Required action</th></tr></thead><tbody>${rows}</tbody></table><p>Generated ${esc(nowIso())}</p></body></html>`;
  fs.writeFileSync(path.join(outDir,'validation-summary.html'),html,'utf8');
}
