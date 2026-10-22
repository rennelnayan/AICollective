import test from 'node:test';
import assert from 'node:assert/strict';
import { validate, summarize } from '../src/validator.js';

function base(){
 const refs={schema_name:'MATERIAL_SOURCE_REFERENCES',schema_version:'1.1.0',case_id:'C1',run_id:'R1',references:[{material_source_reference_id:'MSR-1',workbook_type:'CBDDQ',sheet_name:'Intake form',question_or_field_id:'Q1',source_location:'Intake form!D2'}]};
 const facts={schema_version:'1.1.0',case_id:'C1',run_id:'R1',facts:[{fact_id:'FACT-1',material_source_reference_ids:['MSR-1']}]};
 return {text:'No official score was produced.',draftPacket:'Gate 1 Status:\nReviewer Role:\n',parseErrors:[],artifacts:{RUN_HEADER:{case_id:'C1',run_id:'R1',risk_model_version:'0.1',mapping_version:'1.0.0',output_schema_version:'1.1.0'},INPUT_VALIDATION_RESULT:{case_id:'C1',run_id:'R1'},MATERIAL_SOURCE_REFERENCES_JSON:refs,FACT_SET_JSON:facts,MATERIAL_FACT_SET_JSON:{schema_version:'1.1.0',case_id:'C1',run_id:'R1',facts:[{fact_id:'FACT-1'}]},CONTROL_ASSESSMENT_JSON:{assessments:[]},CANDIDATE_INDICATOR_SET_JSON:{indicators:[{mapping_rule_id:'MAP-1'}]},HARD_EXCLUSION_CANDIDATES_JSON:{candidates:[]},EXCEPTION_SET_JSON:{exceptions:[]},PACKAGE_MANIFEST_JSON:{declared_counts:{material_source_references:1,facts:1,material_facts:1,control_assessments:0,candidate_indicators:1,hard_exclusion_candidates:0,exceptions:0}},INTAKE_AGENT_RECEIPT_JSON:{},FINAL_SELF_CHECK:{}}};
}
const source={records:[{source_record_id:'SRC-1',workbook_type:'CBDDQ',sheet_name:'Intake form',question_or_field_id:'Q1',source_location:'Intake form!D2'}]};
const mapping={rules:[{mapping_rule_id:'MAP-1'}]};
const expected={caseId:'C1',runId:'R1',riskModelVersion:'0.1',mappingVersion:'1.0.0',schemaVersion:'1.1.0'};

test('happy contract passes blocking checks',()=>{const f=validate({agent:base(),sourceRegister:source,mappingCatalog:mapping,expected});assert.equal(summarize(f).blocking_failures,0);});
test('unapproved map fails',()=>{const a=base();a.artifacts.CANDIDATE_INDICATOR_SET_JSON.indicators[0].mapping_rule_id='BAD';const f=validate({agent:a,sourceRegister:source,mappingCatalog:mapping,expected});assert.equal(f.find(x=>x.check_id==='APPROVED_MAPPING_RULE').result,'FAIL');});
test('unresolved material source fails', () => {
  const a = base();

  a.artifacts
    .MATERIAL_SOURCE_REFERENCES_JSON
    .references[0]
    .question_or_field_id = 'DOES-NOT-EXIST';

  a.artifacts
    .MATERIAL_SOURCE_REFERENCES_JSON
    .references[0]
    .source_location = 'Intake form!D99';

  const findings = validate({
    agent: a,
    sourceRegister: source,
    mappingCatalog: mapping,
    expected
  });

  const result = findings.find(
    finding =>
      finding.check_id ===
      'MATERIAL_REFERENCE_RESOLVES'
  );

  assert.equal(result.result, 'FAIL');
  assert.equal(result.severity, 'CRITICAL');
  assert.match(
    result.actual_value,
    /DOES-NOT-EXIST/
  );
});
test(
  'unique stable field ID resolves despite stale cell location',
  () => {
    const a = base();

    a.artifacts
      .MATERIAL_SOURCE_REFERENCES_JSON
      .references[0]
      .source_location = 'Intake form!D99';

    const findings = validate({
      agent: a,
      sourceRegister: source,
      mappingCatalog: mapping,
      expected
    });

    const result = findings.find(
      finding =>
        finding.check_id ===
        'MATERIAL_REFERENCE_RESOLVES'
    );

    assert.equal(result.result, 'PASS');
  }
);
test(
  'duplicate field ID uses source location to disambiguate',
  () => {
    const a = base();

    const duplicateSourceRegister = {
      records: [
        {
          source_record_id: 'SRC-1',
          workbook_type: 'CBDDQ',
          sheet_name: 'Intake form',
          question_or_field_id: 'Q1',
          source_location: 'Intake form!D2',
          normalized_value: 'YES'
        },
        {
          source_record_id: 'SRC-2',
          workbook_type: 'CBDDQ',
          sheet_name: 'Intake form',
          question_or_field_id: 'Q1',
          source_location: 'Intake form!D20',
          normalized_value: 'NO'
        }
      ]
    };

    a.artifacts
      .MATERIAL_SOURCE_REFERENCES_JSON
      .references[0]
      .source_location = 'Intake form!D2';

    a.artifacts
      .MATERIAL_SOURCE_REFERENCES_JSON
      .references[0]
      .normalized_value = 'YES';

    const findings = validate({
      agent: a,
      sourceRegister: duplicateSourceRegister,
      mappingCatalog: mapping,
      expected
    });

    const result = findings.find(
      finding =>
        finding.check_id ===
        'MATERIAL_REFERENCE_RESOLVES'
    );

    assert.equal(result.result, 'PASS');
  }
);
test(
  'duplicate field ID without a valid disambiguator fails',
  () => {
    const a = base();

    const duplicateSourceRegister = {
      records: [
        {
          source_record_id: 'SRC-1',
          workbook_type: 'CBDDQ',
          sheet_name: 'Intake form',
          question_or_field_id: 'Q1',
          source_location: 'Intake form!D2',
          normalized_value: 'YES'
        },
        {
          source_record_id: 'SRC-2',
          workbook_type: 'CBDDQ',
          sheet_name: 'Intake form',
          question_or_field_id: 'Q1',
          source_location: 'Intake form!D20',
          normalized_value: 'YES'
        }
      ]
    };

    a.artifacts
      .MATERIAL_SOURCE_REFERENCES_JSON
      .references[0]
      .source_location = 'Intake form!D99';

    a.artifacts
      .MATERIAL_SOURCE_REFERENCES_JSON
      .references[0]
      .normalized_value = 'YES';

    const findings = validate({
      agent: a,
      sourceRegister: duplicateSourceRegister,
      mappingCatalog: mapping,
      expected
    });

    const result = findings.find(
      finding =>
        finding.check_id ===
        'MATERIAL_REFERENCE_RESOLVES'
    );

    assert.equal(result.result, 'FAIL');
    assert.match(result.actual_value, /"matches":2/);
  }
);

