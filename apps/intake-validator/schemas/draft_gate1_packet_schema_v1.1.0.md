# Correspondent Gate Draft Gate 1 Packet Schema

**Schema name:** `DRAFT_GATE1_PACKET_SCHEMA`  
**Schema version:** `1.1.0`  
**Status:** Approved for synthetic hackathon use  
**Owner role:** Gate 1 Process Owner  
**Production review required:** Yes

## 1. Purpose and Ownership Change

This schema defines the Draft Gate 1 Packet, semantic package manifest, Agent receipt, final self-check, traceability requirements, controlled failures, and prohibited outputs.

In schema version 1.1.0:

- Microsoft 365 Copilot creates semantic artifacts and the human-readable Draft Gate 1 Packet.
- Copilot creates `MATERIAL_SOURCE_REFERENCES_JSON`, not an exhaustive Source Register.
- The external Node.js parser and validator creates the exhaustive `SOURCE_REGISTER` from the original workbooks and performs the official automated validation.

The Agent does not approve Gate 1, calculate an official score, assign a risk band, authorize scoring, approve the relationship, or reject the relationship.

## 2. Required Runtime Inputs

- `case_id`
- `run_id`
- completed respondent CBDDQ workbook
- completed standalone Provider Institution Relationship Scoping workbook
- `risk_model_version`
- `mapping_version`
- `output_schema_version = 1.1.0`
- six Configuration 7 controlled reference files

If a case input is missing, return `INPUT_INCOMPLETE`. If a reference is missing or an obsolete v1.0 schema is supplied instead of v1.1, return `REFERENCE_PACK_INCOMPLETE` and stop.

## 3. Required Copilot Output Order

1. `RUN_HEADER`
2. `INPUT_VALIDATION_RESULT`
3. `EXECUTIVE_INTAKE_SUMMARY`
4. `DRAFT_GATE1_PACKET`
5. `MATERIAL_SOURCE_REFERENCES_JSON`
6. `FACT_SET_JSON`
7. `MATERIAL_FACT_SET_JSON`
8. `CONTROL_ASSESSMENT_JSON`
9. `CANDIDATE_INDICATOR_SET_JSON`
10. `HARD_EXCLUSION_CANDIDATES_JSON`
11. `EXCEPTION_SET_JSON`
12. `PACKAGE_MANIFEST_JSON`
13. `INTAKE_AGENT_RECEIPT_JSON`
14. `FINAL_SELF_CHECK`

The Copilot output must not contain exhaustive `SOURCE_REGISTER_JSON`.

If the semantic output cannot fit without truncation, return `OUTPUT_TOO_LARGE` and use the semantic two-part fallback. Never emit partial JSON.

## 4. RUN_HEADER

```json
{
  "case_id": "string",
  "run_id": "string",
  "packet_version": "1.1.0",
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "risk_model_version": "string",
  "mapping_version": "string",
  "output_schema_version": "1.1.0",
  "created_by_component": "CG_INTAKE_ANALYZER",
  "created_on": "ISO-8601 UTC timestamp",
  "data_classification": "SYNTHETIC | APPROVED_SANITIZED"
}
```

Allowed pre-Gate-1 statuses:

- `DRAFT_PENDING_DETERMINISTIC_VALIDATION`
- `CORRECTION_REQUIRED`
- `PACKAGE_NOT_ASSEMBLED`

The Agent must not set `APPROVED_FOR_SCORING`.

## 5. INPUT_VALIDATION_RESULT

```json
{
  "status": "READY_FOR_INTAKE_ANALYSIS | INPUT_INCOMPLETE | REFERENCE_PACK_INCOMPLETE | SOURCE_FILE_UNREADABLE | CASE_IDENTITY_CONFLICT",
  "case_id": "string",
  "run_id": "string",
  "files_received": ["string"],
  "required_files_missing": ["string"],
  "obsolete_files_detected": ["string"],
  "identity_checks": [
    {
      "field": "LEGAL_NAME | LEI | COUNTRY | PARENT | REGULATOR",
      "provider_value": "string | null",
      "respondent_value": "string | null",
      "result": "MATCH | CONFLICT | NOT_AVAILABLE"
    }
  ],
  "errors": ["string"]
}
```

## 6. Required Human-Readable Packet Sections

### 6.1 Run and Case Header

Case ID, Run ID, packet version, risk-model version, mapping version, schema version, packet status, and data classification.

### 6.2 Respondent Institution Profile

Legal name, jurisdiction, LEI, parent, regulator, ownership, physical presence, and licensing profile. Every material statement cites one or more `fact_id` values.

### 6.3 Proposed Relationship Scope

Account type, business purpose, offered services, nesting, payable-through arrangements, direct access, currencies, and introduction channel. The standalone Scoping Form is authoritative for Provider Institution decisions.

### 6.4 Activity Baseline and Corridors

Expected count, value, average size, corridors, customer types, seasonality, and estimate basis.

### 6.5 Control Assessment C1-C4

For each control domain: related fact IDs, assertion summary, evidence status, limitations, and open human actions. A Yes answer does not prove control effectiveness.

### 6.6 Evidence Status and Limitations

Evidence supplied, referenced but absent, not independently verified, missing evidence, and scope limitations.

### 6.7 Candidate Indicators F1-F6

For each candidate: indicator ID, target model area, candidate value, source fact IDs, mapping rule ID, mapping version, `gate_1_status = PENDING_GATE_1`, and human-review requirement. No points, weights, multipliers, scores, or bands.

### 6.8 Hard-Exclusion Candidates

For each candidate: rule ID, `POSSIBLE | NOT_TRIGGERED | UNKNOWN`, source fact IDs, reason, and required human action. The Agent does not issue an official hard stop.

### 6.9 Contradictions, Exceptions, and Missing Information

Allowed types: `CONTRADICTION`, `MISSING_INFORMATION`, `EVIDENCE_GAP`, `MAPPING_GAP`, `HARD_EXCLUSION_CANDIDATE`, and `MATERIAL_REVIEW_POINT`.

Each exception includes ID, type, severity, related facts, material source references, finding, required action, and blocking status.

### 6.10 Open Human Actions

Every action required before Gate 1 approval or scoring.

### 6.11 Source Traceability

Map packet statements and candidates to `fact_id` and `material_source_reference_id`. Node.js later resolves material references to canonical `source_record_id` values.

### 6.12 Versions and Limitations

Packet, risk-model, mapping, and semantic-schema versions; input and reference filenames; known limitations; unavailable references; and synthetic-only limitation.

### 6.13 Blank Gate 1 Decision Section

Labels only:

- Gate 1 Decision ID
- Gate 1 Status
- Reviewer Role
- Decision Date
- Approved Indicator IDs
- Excluded Indicator IDs
- Unresolved Nonblocking Findings
- Reviewer Comments

The Agent must not populate a decision.

## 7. PACKAGE_MANIFEST_JSON

```json
{
  "schema_name": "PACKAGE_MANIFEST",
  "schema_version": "1.1.0",
  "case_id": "string",
  "run_id": "string",
  "packet_version": "1.1.0",
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION | CORRECTION_REQUIRED | PACKAGE_NOT_ASSEMBLED",
  "risk_model_version": "string",
  "mapping_version": "string",
  "artifacts": [
    {
      "artifact_id": "string",
      "artifact_type": "RUN_HEADER | INPUT_VALIDATION_RESULT | DRAFT_GATE1_PACKET | MATERIAL_SOURCE_REFERENCES | FACT_SET | MATERIAL_FACT_SET | CONTROL_ASSESSMENT | CANDIDATE_INDICATOR_SET | HARD_EXCLUSION_CANDIDATES | EXCEPTION_SET | INTAKE_AGENT_RECEIPT | FINAL_SELF_CHECK",
      "schema_version": "string",
      "record_count": 0,
      "status": "CREATED | NOT_CREATED | ERROR",
      "required": true
    }
  ],
  "declared_counts": {
    "material_source_references": 0,
    "facts": 0,
    "material_facts": 0,
    "control_assessments": 0,
    "candidate_indicators": 0,
    "hard_exclusion_candidates": 0,
    "exceptions": 0
  },
  "exhaustive_source_register_owner": "CG_NODE_VALIDATOR",
  "prohibited_output_check": "PASS | FAIL",
  "limitations": ["string"]
}
```

Counts must equal the actual semantic artifact array lengths.

## 8. INTAKE_AGENT_RECEIPT_JSON

```json
{
  "schema_name": "INTAKE_AGENT_RECEIPT",
  "schema_version": "1.1.0",
  "receipt_id": "string",
  "case_id": "string",
  "run_id": "string",
  "component_code": "CGIA",
  "component_name": "CG Intake Analyzer",
  "component_version": "7.0.0",
  "platform": "Microsoft 365 Copilot Agent Builder",
  "status": "COMPLETE | COMPLETE_WITH_FINDINGS | BLOCKED | ERROR",
  "input_files": ["string"],
  "reference_files": ["string"],
  "output_artifact_ids": ["string"],
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION | CORRECTION_REQUIRED | PACKAGE_NOT_ASSEMBLED",
  "exhaustive_source_register_created": false,
  "deterministic_validation_executed": false,
  "prohibited_action_check": "PASS | FAIL",
  "created_on": "ISO-8601 UTC timestamp",
  "errors": ["string"]
}
```

## 9. FINAL_SELF_CHECK

```json
{
  "schema_name": "FINAL_SELF_CHECK",
  "schema_version": "1.1.0",
  "case_id": "string",
  "run_id": "string",
  "status": "PASS | FAIL",
  "checks": {
    "required_sections_present": true,
    "case_run_ids_consistent": true,
    "versions_present": true,
    "material_references_complete": true,
    "material_facts_in_fact_set": true,
    "exceptions_visible_in_packet": true,
    "candidate_mappings_use_catalog": true,
    "semantic_counts_reconciled": true,
    "gate_1_decision_blank": true,
    "exhaustive_source_register_absent": true,
    "deterministic_validation_not_claimed": true,
    "official_score_absent": true,
    "risk_band_absent": true,
    "approval_rejection_absent": true,
    "scoring_authorization_absent": true
  },
  "errors": ["string"],
  "warnings": ["string"]
}
```

The self-check is not the official automated validation result.

## 10. Node.js Post-Copilot Outputs

The single Node.js parser-and-validator execution produces:

- `exhaustive-source-register.json`
- `deterministic-validation-report.json`
- `validation-summary.html`
- `validator-receipt.json`

The exhaustive Source Register is not part of the Copilot response.

## 11. Prohibited Copilot Outputs

- exhaustive `SOURCE_REGISTER_JSON`
- canonical `source_record_id` values presented as validated
- official points or factor weights
- control multipliers
- gross or net score
- official risk rating or band
- Gate 1 approval or scoring authorization
- relationship approval or rejection
- recommendation to approve or reject
- claim that deterministic validation passed
- claim that Node.js or the scoring engine executed

Permitted only as explicit absence or pending status:

- `No official score was produced.`
- blank Gate 1 decision fields
- `gate_1_status = PENDING_GATE_1`
- `packet_status = DRAFT_PENDING_DETERMINISTIC_VALIDATION`

## 12. Controlled Failures

- `INPUT_INCOMPLETE`
- `REFERENCE_PACK_INCOMPLETE`
- `SOURCE_FILE_UNREADABLE`
- `CASE_IDENTITY_CONFLICT`
- `UNMAPPED_FACT`
- `AMBIGUOUS_MAPPING`
- `PACKAGE_NOT_ASSEMBLED`
- `OUTPUT_TOO_LARGE`

Each failure identifies the affected input, reason, and corrective action.

## 13. Semantic Two-Part Fallback

If needed, use the same conversation.

### Part 1

- `INPUT_VALIDATION_RESULT`
- `MATERIAL_SOURCE_REFERENCES_JSON`
- `FACT_SET_JSON`
- `MATERIAL_FACT_SET_JSON`
- `CONTROL_ASSESSMENT_JSON`
- `CANDIDATE_INDICATOR_SET_JSON`
- `HARD_EXCLUSION_CANDIDATES_JSON`
- `EXCEPTION_SET_JSON`
- `INTERIM_SELF_CHECK`

### Part 2

- `RUN_HEADER`
- `EXECUTIVE_INTAKE_SUMMARY`
- `DRAFT_GATE1_PACKET`
- `PACKAGE_MANIFEST_JSON`
- `INTAKE_AGENT_RECEIPT_JSON`
- `FINAL_SELF_CHECK`

Part 2 uses Part 1 exactly and does not reinterpret upstream artifacts.

## 14. Minimum Acceptance Criteria

The Copilot package is ready for Node.js validation only when:

- all required Copilot output blocks exist;
- Case ID, Run ID, and versions are consistent;
- semantic IDs are unique;
- every material fact has a complete material source reference;
- every candidate uses an approved mapping rule;
- all exceptions are visible in the packet;
- semantic manifest counts reconcile;
- the Gate 1 Decision section is blank;
- exhaustive Source Register is absent from Copilot output;
- deterministic validation is not claimed;
- prohibited scoring and decision outputs are absent;
- `packet_status = DRAFT_PENDING_DETERMINISTIC_VALIDATION`.

The external Node.js report remains the authoritative automated PASS, FAIL, or ERROR control.
