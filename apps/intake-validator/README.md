# Correspondent Gate Node.js Validator

A deterministic parser and validator for the Correspondent Gate hackathon workflow.

## What it does

One execution:

1. reads the completed CBDDQ workbook;
2. reads the completed standalone Relationship Scoping workbook;
3. creates an exhaustive canonical `SOURCE_REGISTER`;
4. extracts JSON blocks from the saved Microsoft 365 Copilot Agent response;
5. resolves every `MATERIAL_SOURCE_REFERENCE` against the original workbooks;
6. checks IDs, references, mapping rules, counts, versions, packet boundaries, and prohibited outputs;
7. writes the exhaustive Source Register, deterministic validation report, HTML summary, and validator receipt.

It does **not** calculate the official risk score and does **not** approve Gate 1.

## Requirements

- Node.js 20 or later
- npm

## Install

```bash
npm install
```

## Run

```bash
npm run validate -- \
  --cbddq ./completed_cbddq.xlsx \
  --scoping ./completed_relationship_scoping.xlsx \
  --agent-output ./draft_gate1_package.md \
  --mapping ./approved_mapping_catalog_v1.0.0.json \
  --output ./validation-output \
  --case-id CG-CASE-HP-001 \
  --run-id CG-RUN-HP-001 \
  --risk-model-version 0.1 \
  --mapping-version 1.0.0 \
  --schema-version 1.1.0
```

## Important workbook assumptions

The default Configuration 7 dictionaries indicate:

- CBDDQ answer sheet: `Intake form`
- CBDDQ question ID: column A
- CBDDQ question text: column B
- CBDDQ data type: column C
- CBDDQ answer: column D
- Scoping answer sheet: `Scoping form`
- Scoping field ID: column A
- Scoping field description: column B
- Scoping field type: column C
- Scoping answer: column D

Override these in `config/workbook-layout.json` if the templates change.

## Copilot output format

Save the complete, unedited Agent response as Markdown. Each machine-readable artifact must have a heading matching one of these names followed by a fenced JSON block:

- `RUN_HEADER`
- `INPUT_VALIDATION_RESULT`
- `MATERIAL_SOURCE_REFERENCES_JSON`
- `FACT_SET_JSON`
- `MATERIAL_FACT_SET_JSON`
- `CONTROL_ASSESSMENT_JSON`
- `CANDIDATE_INDICATOR_SET_JSON`
- `HARD_EXCLUSION_CANDIDATES_JSON`
- `EXCEPTION_SET_JSON`
- `PACKAGE_MANIFEST_JSON`
- `INTAKE_AGENT_RECEIPT_JSON`
- `FINAL_SELF_CHECK`

The human-readable `DRAFT_GATE1_PACKET` may be Markdown text.

## Results

- `PASS`: no blocking validation failures or execution errors
- `PASS_WITH_WARNINGS`: no blocking failures, but one or more warnings
- `FAIL`: one or more blocking or critical assertions failed
- `ERROR`: the validator could not complete reliably

## Output files

```text
validation-output/
├── exhaustive-source-register.json
├── deterministic-validation-report.json
├── validation-summary.html
└── validator-receipt.json
```

## Tests

```bash
npm test
```

## Security

Use synthetic or approved sanitized data only. Do not commit real intake forms, generated case outputs, credentials, or private evidence into GitHub.
