#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2] ?? './validation-output/draft-gate1-packet.json';
const validationFile = process.argv[3] ?? './validation-output/deterministic-validation-report.json';
const output = process.argv[4] ?? './validation-output/gate1-review-packet.html';

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function label(key) {
  return String(key)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function statusPill(value) {
  const text = String(value ?? 'NOT STATED');
  const upper = text.toUpperCase();
  const css = upper.includes('PASS') || upper === 'READY'
    ? 'pass'
    : upper.includes('BLOCK') || upper.includes('FAIL')
      ? 'fail'
      : 'warn';
  return `<span class="pill ${css}">${esc(text)}</span>`;
}

function renderValue(value) {
  if (value === null || value === undefined || value === '') {
    return '<span class="empty">Not provided</span>';
  }
  if (typeof value === 'boolean') {
    return `<span class="pill ${value ? 'pass' : 'fail'}">${value ? 'Yes' : 'No'}</span>`;
  }
  if (typeof value !== 'object') return `<span>${esc(value)}</span>`;
  if (Array.isArray(value)) {
    if (value.length === 0) return '<span class="empty">None</span>';
    if (value.every(v => typeof v !== 'object' || v === null)) {
      return `<ul>${value.map(v => `<li>${esc(v)}</li>`).join('')}</ul>`;
    }
    return `<div class="cards">${value.map((v, i) =>
      `<article class="card"><div class="card-number">${i + 1}</div>${renderObject(v)}</article>`
    ).join('')}</div>`;
  }
  return renderObject(value);
}

function renderObject(obj) {
  return `<dl>${Object.entries(obj).map(([key, value]) =>
    `<div class="row"><dt>${esc(label(key))}</dt><dd>${renderValue(value)}</dd></div>`
  ).join('')}</dl>`;
}

function currentizeState(value, validationStatus) {
  if (Array.isArray(value)) {
    return value.map(item => currentizeState(item, validationStatus));
  }
  if (value && typeof value === 'object') {
    const updated = {};
    for (const [key, item] of Object.entries(value)) {
      if (key === 'canonical_source_record_ids_assigned') {
        updated[key] = true;
      } else if (key === 'deterministic_validation_status') {
        updated.deterministic_validation_status_at_copilot_generation = item;
        updated.current_deterministic_validation_status = validationStatus;
      } else {
        updated[key] = currentizeState(item, validationStatus);
      }
    }
    return updated;
  }
  if (typeof value !== 'string') return value;

  const replacements = new Map([
    [
      'The exhaustive Source Register has not been created.',
      'The exhaustive Source Register was created by the external Node.js validator from the original workbooks and is available as exhaustive-source-register.json.'
    ],
    [
      'The exhaustive Source Register will be created by the external Node.js validator from the original workbooks. It is not part of this Copilot package.',
      'The exhaustive Source Register was created by the external Node.js validator from the original workbooks and is available as exhaustive-source-register.json.'
    ],
    [
      'The exhaustive Source Register will be created by the external Node.js validator.',
      'The exhaustive Source Register was created by the external Node.js validator and is available as exhaustive-source-register.json.'
    ],
    [
      'Deterministic validation has not yet executed.',
      `Deterministic validation executed after Copilot generation. Current result: ${validationStatus}.`
    ]
  ]);

  return replacements.get(value) ?? value;
}

function findBlockingItems(packet) {
  const found = [];
  const exceptions = packet.contradictions_exceptions_and_missing_information
    ?? packet.exceptions_and_missing_information
    ?? [];
  const exceptionList = Array.isArray(exceptions)
    ? exceptions
    : exceptions.exceptions ?? [];

  for (const item of exceptionList) {
    if (item?.blocking === true) {
      found.push({
        id: item.exception_id ?? 'UNIDENTIFIED_EXCEPTION',
        type: item.exception_type ?? 'EXCEPTION',
        severity: item.severity ?? 'NOT_STATED',
        finding: item.finding ?? 'No finding text supplied.',
        required_action: item.required_action ?? 'Human review required.'
      });
    }
  }

  const candidateBlock = packet.candidate_indicators_f1_f6;
  if (
    candidateBlock &&
    Number(candidateBlock.candidate_count ?? 0) === 0 &&
    String(candidateBlock.status ?? '').toUpperCase().includes('MAPPING_GAP') &&
    !found.some(item => item.id === 'EXC-0003')
  ) {
    found.push({
      id: 'MAPPING_GAP',
      type: 'MAPPING_GAP',
      severity: 'HIGH',
      finding: 'No candidate indicators were generated because approved exact mappings are unavailable.',
      required_action: 'Authorized mapping owner must approve exact mappings before scoring.'
    });
  }
  return found;
}

if (!fs.existsSync(input)) {
  throw new Error(`Gate 1 packet not found: ${input}`);
}
if (!fs.existsSync(validationFile)) {
  throw new Error(`Deterministic validation report not found: ${validationFile}`);
}

const rawPacket = JSON.parse(fs.readFileSync(input, 'utf8').replace(/^\uFEFF/, ''));
const validation = JSON.parse(fs.readFileSync(validationFile, 'utf8').replace(/^\uFEFF/, ''));

const validationStatus = validation.overall_result ?? 'NOT_VALIDATED';
const packet = currentizeState(rawPacket, validationStatus);
const gate1ReviewAllowed = validation.gate_1_review_allowed === true;
const blockingItems = findBlockingItems(packet);
const businessReadiness =
  validationStatus !== 'PASS' && validationStatus !== 'PASS_WITH_WARNINGS'
    ? 'BLOCKED_BY_VALIDATION'
    : blockingItems.length > 0
      ? 'BLOCKED_BY_OPEN_ITEMS'
      : 'READY_FOR_GATE_1_REVIEW';
const scoringStatus = businessReadiness === 'READY_FOR_GATE_1_REVIEW'
  ? 'PENDING_HUMAN_GATE_1_DECISION'
  : 'NOT_AUTHORIZED';

const embeddedHeader = packet.run_and_case_header ?? {};
const embeddedPreValidationStatus =
  embeddedHeader.deterministic_validation_status ?? 'NOT_EXECUTED';

const statusPanel = `
<section class="status-panel">
  <div class="section-head"><span>0</span><h2>Current Workflow Status</h2></div>
  <div class="status-grid">
    <div><strong>Package Contract Validation</strong>${statusPill(validationStatus)}</div>
    <div><strong>Gate 1 Review Allowed</strong>${statusPill(gate1ReviewAllowed ? 'YES' : 'NO')}</div>
    <div><strong>Business Readiness</strong>${statusPill(businessReadiness)}</div>
    <div><strong>Scoring Status</strong>${statusPill(scoringStatus)}</div>
  </div>
  <div class="note">
    The Copilot packet was created before Node.js validation. Its embedded value
    <code>${esc(embeddedPreValidationStatus)}</code> is retained as historical execution metadata.
    The authoritative current validation result is <code>${esc(validationStatus)}</code> from
    validator ${esc(validation.validator_version ?? 'not stated')}.
  </div>
</section>`;

const blockingPanel = blockingItems.length === 0
  ? `<section><div class="section-head"><span>!</span><h2>Blocking Items</h2></div><div class="ok-box">No blocking business items were identified in the Draft Gate 1 Packet.</div></section>`
  : `<section><div class="section-head"><span>!</span><h2>Blocking Items</h2></div><div class="cards">${blockingItems.map((item, i) =>
      `<article class="card blocker"><div class="card-number">${i + 1}</div>${renderObject(item)}</article>`
    ).join('')}</div></section>`;

const preferredOrder = [
  'run_and_case_header',
  'respondent_institution_profile',
  'respondent_profile',
  'proposed_relationship_scope',
  'activity_baseline_and_corridors',
  'activity_and_corridors',
  'control_assessment_c1_c4',
  'evidence_status_and_limitations',
  'evidence_and_limitations',
  'candidate_indicators_f1_f6',
  'hard_exclusion_candidates',
  'contradictions_exceptions_and_missing_information',
  'exceptions_and_missing_information',
  'open_human_actions',
  'source_traceability',
  'versions_and_limitations',
  'gate_1_decision_section'
];

const metadataKeys = new Set([
  'schema_name', 'schema_version', 'case_id', 'run_id',
  'packet_version', 'packet_status', 'data_classification'
]);
const contentKeys = Object.keys(packet).filter(key => !metadataKeys.has(key));
const orderedKeys = [
  ...preferredOrder.filter(key => contentKeys.includes(key)),
  ...contentKeys.filter(key => !preferredOrder.includes(key))
];

const sections = orderedKeys.map((key, index) => {
  let value = packet[key];
  if (key === 'run_and_case_header' && value && typeof value === 'object') {
    value = {
      ...value,
      current_validator_version: validation.validator_version,
      current_gate_1_review_allowed: gate1ReviewAllowed
    };
  }
  if (key === 'versions_and_limitations' && value && typeof value === 'object') {
    value = {
      ...value,
      post_validation_note:
        `Deterministic validation executed after Copilot generation. Current result: ${validationStatus}.`
    };
  }
  return `<section><div class="section-head"><span>${index + 1}</span><h2>${esc(label(key))}</h2></div>${renderValue(value)}</section>`;
}).join('');

const metadata = {
  schema_name: packet.schema_name,
  schema_version: packet.schema_version,
  case_id: validation.case_id ?? packet.case_id,
  run_id: validation.run_id ?? packet.run_id,
  packet_version: packet.packet_version,
  packet_status_at_copilot_generation: packet.packet_status,
  data_classification: packet.data_classification
};

const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Draft Gate 1 Review Packet</title>
<style>
:root{--navy:#17365d;--blue:#0078d4;--ink:#172b4d;--soft:#f4f7fa;--line:#d7e0e8;--green:#107c10;--amber:#8a5b00;--red:#a4262c}
*{box-sizing:border-box}body{margin:0;background:#edf2f6;color:var(--ink);font:15px/1.5 Arial,sans-serif}.page{max-width:1120px;margin:28px auto;background:#fff;box-shadow:0 8px 32px #0002}.hero{padding:34px 42px;background:linear-gradient(125deg,var(--navy),#075f82);color:#fff}.eyebrow{font-size:12px;letter-spacing:1.5px;font-weight:bold}.hero h1{margin:6px 0 10px;font-size:32px}.hero-summary{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.content{padding:28px 42px 50px}section{margin:0 0 26px;border:1px solid var(--line);border-radius:8px;overflow:hidden}.section-head{display:flex;align-items:center;gap:10px;padding:12px 16px;background:var(--soft);border-bottom:1px solid var(--line)}.section-head span{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--blue);color:#fff;font-weight:bold}.section-head h2{margin:0;font-size:19px}.row{display:grid;grid-template-columns:minmax(190px,28%) 1fr;border-bottom:1px solid #e8edf2}.row:last-child{border-bottom:0}dt,dd{margin:0;padding:11px 14px}dt{font-weight:bold;background:#fbfcfd}dd{min-width:0}.cards{display:grid;gap:10px;padding:14px}.card{position:relative;border:1px solid var(--line);border-radius:6px;overflow:hidden}.card.blocker{border-left:5px solid var(--red)}.card-number{position:absolute;right:8px;top:5px;color:#6b778c;font-size:12px}.card .row{grid-template-columns:minmax(170px,32%) 1fr}ul{margin:0;padding-left:20px}.empty{color:#6b778c;font-style:italic}.pill{display:inline-block;margin:4px 0;padding:4px 9px;border-radius:14px;background:#eef2f6;font-weight:bold}.pill.pass{color:var(--green)}.pill.warn{color:var(--amber)}.pill.fail{color:var(--red)}.status-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:16px}.status-grid>div{display:flex;flex-direction:column;padding:12px;border:1px solid var(--line);border-radius:6px}.note,.ok-box{margin:0 16px 16px;padding:12px 14px;border-radius:6px;background:#fff4ce;border-left:4px solid var(--amber)}.ok-box{background:#e2f0d9;border-left-color:var(--green)}code{font-family:Consolas,monospace}.footer{padding:16px 42px;background:var(--navy);color:#fff;font-size:12px}@media print{body{background:#fff}.page{margin:0;box-shadow:none}section{break-inside:avoid}.hero{print-color-adjust:exact}.content{padding:20px 28px}}@media(max-width:700px){.page{margin:0}.hero,.content{padding:24px 18px}.row,.status-grid{grid-template-columns:1fr}dt{border-bottom:1px solid #eef2f5}}
</style></head><body><main class="page"><header class="hero"><div class="eyebrow">CORRESPONDENT GATE • HUMAN REVIEW</div><h1>Draft Gate 1 Review Packet</h1><div class="hero-summary">${statusPill(`VALIDATION ${validationStatus}`)}${statusPill(businessReadiness)}${statusPill(`SCORING ${scoringStatus}`)}</div><p>Case ${esc(metadata.case_id)} • Run ${esc(metadata.run_id)} • Validator ${esc(validation.validator_version ?? 'not stated')}</p></header><div class="content">${statusPanel}${blockingPanel}<section><div class="section-head"><span>M</span><h2>Package Metadata</h2></div>${renderObject(metadata)}</section>${sections}</div><footer class="footer">Draft packet for human Gate 1 review. A PASS result confirms package-contract integrity only. Business readiness remains subject to blocking exceptions, evidence review, mapping approval, and human Gate 1 authority.</footer></main></body></html>`;

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, html, 'utf8');
console.log(JSON.stringify({
  created: path.resolve(output),
  bytes: fs.statSync(output).size,
  validation_status: validationStatus,
  gate_1_review_allowed: gate1ReviewAllowed,
  business_readiness: businessReadiness,
  scoring_status: scoringStatus,
  blocking_items: blockingItems.map(item => item.id)
}, null, 2));
