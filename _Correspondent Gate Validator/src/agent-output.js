import fs from 'node:fs';

const NAMES = [
  'RUN_HEADER','INPUT_VALIDATION_RESULT','MATERIAL_SOURCE_REFERENCES_JSON','FACT_SET_JSON',
  'MATERIAL_FACT_SET_JSON','CONTROL_ASSESSMENT_JSON','CANDIDATE_INDICATOR_SET_JSON',
  'HARD_EXCLUSION_CANDIDATES_JSON','EXCEPTION_SET_JSON','PACKAGE_MANIFEST_JSON',
  'INTAKE_AGENT_RECEIPT_JSON','FINAL_SELF_CHECK'
];
const FENCE = '`'.repeat(3);
export function extractAgentOutput(file) {
  const text=fs.readFileSync(file,'utf8');
  const artifacts={}; const errors=[];
  for (const name of NAMES) {
    const escaped=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    const pattern='(?:^|\\n)#{0,6}\\s*'+escaped+'\\s*\\n+\\s*'+FENCE+'(?:json)?\\s*\\n([\\s\\S]*?)\\n'+FENCE;
    const m=text.match(new RegExp(pattern,'i'));
    if (!m) { artifacts[name]=null; continue; }
    try { artifacts[name]=JSON.parse(m[1]); }
    catch(e) { errors.push({artifact:name,error:e.message}); artifacts[name]=null; }
  }
  const packetMatch=text.match(/(?:^|\n)#{0,6}\s*DRAFT_GATE1_PACKET\s*\n([\s\S]*?)(?=\n#{1,6}\s*(?:MATERIAL_SOURCE_REFERENCES_JSON|FACT_SET_JSON)|$)/i);
  return { text, artifacts, draftPacket:packetMatch?.[1]?.trim() ?? '', parseErrors:errors };
}
