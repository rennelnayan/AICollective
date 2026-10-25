# Correspondent Gate Semantic Output Schemas

**Schema family:** `CG_SEMANTIC_OUTPUT_SCHEMAS`  
**Schema version:** `1.1.0`  
**Component:** `CG Intake Analyzer`  
**Status:** Approved for synthetic hackathon use  
**Production review required:** Yes

## 1. Purpose

This document defines the semantic artifacts produced by the Microsoft 365 Copilot Intake Analyzer.

The Copilot Agent does **not** create the exhaustive `SOURCE_REGISTER`. The external Node.js parser and validator creates the exhaustive Source Register directly from the original CBDDQ and standalone Relationship Scoping workbooks.

The Copilot Agent creates only material source references and semantic artifacts needed for Gate 1 preparation.

## 2. Ownership Boundary

| Artifact | Owner |
|---|---|
| Exhaustive `SOURCE_REGISTER` | Node.js parser and validator |
| Canonical `source_record_id` values | Node.js parser and validator |
| `MATERIAL_SOURCE_REFERENCES` | Copilot Agent |
| `FACT_SET` | Copilot Agent |
| `MATERIAL_FACT_SET` | Copilot Agent |
| `CONTROL_ASSESSMENT` | Copilot Agent |
| `CANDIDATE_INDICATOR_SET` | Copilot Agent |
| `HARD_EXCLUSION_CANDIDATES` | Copilot Agent |
| `EXCEPTION_SET` | Copilot Agent |
| Deterministic validation result | Node.js parser and validator |

## 3. Common Rules

- `case_id` and `run_id` are required in every artifact.
- `schema_version` must be `1.1.0` unless a child schema explicitly uses another approved version.
- IDs must be unique within their artifact.
- Copilot references workbook locations using workbook type, sheet, question or field ID, and source location.
- Copilot must not invent canonical `source_record_id` values.
- Node.js resolves every material source reference to the exhaustive Source Register.
- Unknown, Not Applicable, blank, Please select, Yes, and No remain distinct.
- No artifact may contain an official score, risk band, approval, rejection, recommendation, or scoring authorization.

## 4. MATERIAL_SOURCE_REFERENCES

### 4.1 Purpose

Contains only sources used by a fact, control assessment, candidate indicator, hard-exclusion candidate, exception, or material Draft Gate 1 Packet statement.

It is not an exhaustive copy of every workbook answer.

### 4.2 Contract

```json
{
  "schema_name": "MATERIAL_SOURCE_REFERENCES",
  "schema_version": "1.1.0",
  "case_id": "string",
  "run_id": "string",
  "reference_count": 0,
  "references": [
    {
      "material_source_reference_id": "MSR-0001",
      "source_party": "RESPONDENT_INSTITUTION | PROVIDER_INSTITUTION",
      "workbook_type": "CBDDQ | RELATIONSHIP_SCOPING",
      "sheet_name": "string",
      "question_or_field_id": "string",
      "field_name": "string",
      "source_location": "string",
      "raw_value": "string | number | boolean | date | null",
      "normalized_value": "string | number | boolean | date | null",
      "normalized_type": "TEXT | NUMBER | BOOLEAN | DATE | ENUM | NULL",
      "extraction_status": "EXTRACTED | BLANK | PLACEHOLDER | INVALID | UNREADABLE",
      "used_by_fact_ids": ["FACT-0001"],
      "used_by_artifacts": [
        "CONTROL_ASSESSMENT | CANDIDATE_INDICATOR_SET | HARD_EXCLUSION_CANDIDATES | EXCEPTION_SET | DRAFT_GATE1_PACKET"
      ]
    }
  ]
}
```

### 4.3 Rules

- Every reference must point to one identifiable workbook field or answer location.
- `material_source_reference_id` is a Copilot temporary semantic reference, not the canonical Source Register ID.
- Node.js assigns the canonical `source_record_id` after resolving the reference against the workbook.
- `reference_count` must equal the array length.
- Every listed `fact_id` must exist in `FACT_SET`.

## 5. FACT_SET

### 5.1 Purpose

Contains meaningful semantic facts derived from the two intake forms. It does not duplicate every answered cell.

### 5.2 Contract

```json
{
  "schema_name": "FACT_SET",
  "schema_version": "1.1.0",
  "case_id": "string",
  "run_id": "string",
  "fact_count": 0,
  "facts": [
    {
      "fact_id": "FACT-0001",
      "fact_category": "string",
      "fact_statement": "string",
      "raw_value": "string | number | boolean | date | null",
      "normalized_value": "string | number | boolean | date | null",
      "source_party": "RESPONDENT_INSTITUTION | PROVIDER_INSTITUTION",
      "material_source_reference_ids": ["MSR-0001"],
      "extraction_confidence": 0.0,
      "materiality_candidate": "INFORMATIONAL | LOW | MEDIUM | HIGH",
      "status": "ACTIVE | CONFLICTED | UNKNOWN"
    }
  ]
}
```

### 5.3 Rules

- Every `fact_id` must be unique.
- Every fact must cite at least one material source reference.
- `extraction_confidence` describes extraction confidence only, not truth, evidence quality, or risk.
- Conflicting source values require separate facts or one `CONFLICTED` fact with all relevant references.

## 6. MATERIAL_FACT_SET

### 6.1 Purpose

Contains the subset of `FACT_SET` relevant to F1-F6, C1-C4, identity, service scope, expected activity, internal screening, hard exclusions, contradictions, or Gate 1 review.

### 6.2 Contract

```json
{
  "schema_name": "MATERIAL_FACT_SET",
  "schema_version": "1.1.0",
  "case_id": "string",
  "run_id": "string",
  "material_fact_count": 0,
  "facts": [
    {
      "fact_id": "FACT-0001",
      "model_relevance": [
        "F1 | F2 | F3 | F4 | F5 | F6 | C1 | C2 | C3 | C4 | HARD_EXCLUSION | CONTRADICTION | GATE_1"
      ],
      "materiality_reason": "string"
    }
  ]
}
```

Every `fact_id` must exist in `FACT_SET`.

## 7. CONTROL_ASSESSMENT

```json
{
  "schema_name": "CONTROL_ASSESSMENT",
  "schema_version": "1.1.0",
  "case_id": "string",
  "run_id": "string",
  "assessment_count": 0,
  "assessments": [
    {
      "control_domain": "C1 | C2 | C3 | C4",
      "assessment_id": "CTL-0001",
      "related_fact_ids": ["FACT-0001"],
      "assertion_summary": "string",
      "evidence_status": "RESPONDENT_ASSERTION_ONLY | REFERENCED_NOT_PROVIDED | PROVIDED_NOT_INDEPENDENTLY_VERIFIED | SUPPORTED_BY_APPROVED_HUMAN_VERIFICATION",
      "limitations": ["string"],
      "open_human_actions": ["string"]
    }
  ]
}
```

A Yes answer does not prove design or operating effectiveness. No multiplier is permitted.

## 8. CANDIDATE_INDICATOR_SET

```json
{
  "schema_name": "CANDIDATE_INDICATOR_SET",
  "schema_version": "1.1.0",
  "case_id": "string",
  "run_id": "string",
  "mapping_version": "1.0.0",
  "indicator_count": 0,
  "indicators": [
    {
      "candidate_indicator_id": "IND-0001",
      "indicator_id": "string",
      "target_model_area": "F1 | F2 | F3 | F4 | F5 | F6 | C1 | C2 | C3 | C4",
      "candidate_value": "string | number | boolean | null",
      "value_type": "TEXT | NUMBER | BOOLEAN | ENUM | NULL",
      "source_fact_ids": ["FACT-0001"],
      "mapping_rule_id": "string",
      "mapping_version": "1.0.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    }
  ]
}
```

Only mapping IDs in the approved mapping catalog are permitted. No points, weights, multipliers, totals, scores, or risk bands are permitted.

## 9. HARD_EXCLUSION_CANDIDATES

```json
{
  "schema_name": "HARD_EXCLUSION_CANDIDATES",
  "schema_version": "1.1.0",
  "case_id": "string",
  "run_id": "string",
  "candidate_count": 0,
  "candidates": [
    {
      "hard_exclusion_candidate_id": "HEX-0001",
      "exclusion_rule_id": "string",
      "status": "POSSIBLE | NOT_TRIGGERED | UNKNOWN",
      "source_fact_ids": ["FACT-0001"],
      "reason": "string",
      "required_human_action": "string"
    }
  ]
}
```

The Agent must not issue an official hard stop.

## 10. EXCEPTION_SET

```json
{
  "schema_name": "EXCEPTION_SET",
  "schema_version": "1.1.0",
  "case_id": "string",
  "run_id": "string",
  "exception_count": 0,
  "exceptions": [
    {
      "exception_id": "EXC-0001",
      "exception_type": "CONTRADICTION | MISSING_INFORMATION | EVIDENCE_GAP | MAPPING_GAP | HARD_EXCLUSION_CANDIDATE | MATERIAL_REVIEW_POINT",
      "severity": "INFORMATIONAL | LOW | MEDIUM | HIGH | CRITICAL",
      "related_fact_ids": ["FACT-0001"],
      "material_source_reference_ids": ["MSR-0001"],
      "finding": "string",
      "required_action": "string",
      "blocking": true
    }
  ]
}
```

## 11. EXTRACTION_SELF_CHECK

```json
{
  "schema_name": "EXTRACTION_SELF_CHECK",
  "schema_version": "1.1.0",
  "case_id": "string",
  "run_id": "string",
  "status": "PASS | FAIL",
  "checks": {
    "required_files_present": true,
    "case_identity_consistent": true,
    "material_references_complete": true,
    "fact_ids_unique": true,
    "material_facts_in_fact_set": true,
    "raw_and_normalized_values_separate": true,
    "embedded_scoping_ignored": true,
    "exhaustive_source_register_not_created": true,
    "prohibited_outputs_absent": true
  },
  "errors": ["string"],
  "warnings": ["string"]
}
```

## 12. Controlled Failures

- `INPUT_INCOMPLETE`
- `REFERENCE_PACK_INCOMPLETE`
- `SOURCE_FILE_UNREADABLE`
- `CASE_IDENTITY_CONFLICT`
- `UNMAPPED_FACT`
- `AMBIGUOUS_MAPPING`
- `PACKAGE_NOT_ASSEMBLED`
- `OUTPUT_TOO_LARGE`

## 13. Node.js Resolution Contract

During the single parser-and-validator run, Node.js must:

1. parse every designated answer from both workbooks;
2. create the exhaustive `SOURCE_REGISTER`;
3. assign canonical `source_record_id` values;
4. resolve each `MATERIAL_SOURCE_REFERENCE` to exactly one workbook source record;
5. fail unresolved, duplicate, or ambiguous references;
6. validate semantic artifact schemas, IDs, mappings, counts, and versions;
7. validate the Draft Gate 1 Packet against semantic artifacts;
8. scan for prohibited outputs;
9. produce the deterministic validation report and receipt.

The Node.js output, not the Copilot self-check, is the official automated validation result.
