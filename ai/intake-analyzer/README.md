# CG Intake Analyzer

Microsoft 365 Copilot agent, Configuration 7.

Reads two completed case workbooks against two field dictionaries and produces
the semantic artifacts a human needs to review a correspondent banking
respondent at Gate 1.

## Inputs — eight files, three batches, one conversation

**Batch 1 — contracts**

1. `CG_CBDDQ_Field_Dictionary_v1.0.0.docx`
2. `CG_Relationship_Scoping_Field_Dictionary_v1.0.0.docx`
3. `CG_Semantic_Output_Schemas_v1.1.0.md`

**Batch 2 — authority**

4. `risk-model.xlsx`
5. `approved_mapping_catalog_v1.0.0.json`
6. `draft_gate1_packet_schema_v1.1.0.md`

**Batch 3 — the case**

7. `CG_CBDDQ_Synthetic_HP-XXX.xlsx`
8. `CG_Relationship-Scoping_Synthetic_HP-XXX.xlsx`

`XXX` is the dynamic test data ID and must match across both workbooks.

The Knowledge field stays empty. All eight files are registered in a single
fresh conversation, batch by batch, with no analysis until preflight returns
`READY_FOR_INTAKE_ANALYSIS`.

## Outputs

**Part 1 — semantic artifacts**

`INPUT_VALIDATION_RESULT`, `MATERIAL_SOURCE_REFERENCES_JSON`, `FACT_SET_JSON`,
`MATERIAL_FACT_SET_JSON`, `CONTROL_ASSESSMENT_JSON`,
`CANDIDATE_INDICATOR_SET_JSON`, `HARD_EXCLUSION_CANDIDATES_JSON`,
`EXCEPTION_SET_JSON`, `INTERIM_SELF_CHECK`

**Part 2 — the packet**

`RUN_HEADER`, `EXECUTIVE_INTAKE_SUMMARY`, `DRAFT_GATE1_PACKET`,
`PACKAGE_MANIFEST_JSON`, `INTAKE_AGENT_RECEIPT_JSON`, `FINAL_SELF_CHECK`

The two parts combine without semantic alteration into
`draft_gate1_package.md`, in a fixed fourteen-block order. See
`docs/requirements/ai-output-contracts.md`.

## Obsolete files

Never attach `CG_EXT_Output_Schemas_v1.0.0.md` or
`draft_gate1_packet_schema_v1.0.0.md` in a Configuration 7 run. Mixed schema
versions create conflicting ownership rules.

## Instructions

See `instructions.md`.
