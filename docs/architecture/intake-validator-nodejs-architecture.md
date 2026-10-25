# Intake Validator Node.js solution architecture

Node.js 20 or later.

The Intake Validator is the deterministic integrity component between the CG Intake Analyzer and human Gate 1 review.

It reads the authoritative workbooks, builds the exhaustive canonical Source Register, parses the saved Copilot package, resolves material references and returns reproducible validation evidence.

It does not calculate the official risk score and does not approve Gate 1.

## Why this is a separate component

The CG Intake Analyzer produces probabilistic semantic artifacts. Those artifacts cannot validate their own traceability or boundaries.

The Node.js Intake Validator independently tests whether:

- The package contains the required artifacts
- IDs and versions agree
- Declared counts match actual arrays
- Material source references resolve to original workbook records
- Candidate mappings use approved rules
- Prohibited scoring and decision outputs are absent

This separation turns an instruction to the language model into an enforceable system boundary.

## Runtime inputs

| Input | Purpose |
|---|---|
| Completed CBDDQ workbook | Authoritative respondent answers |
| Completed Relationship Scoping workbook | Authoritative services, permissions and oversight answers |
| `draft_gate1_package.md` | Complete, unedited Copilot package |
| Approved mapping catalogue | Authority for exact candidate mapping rules |
| `config/workbook-layout.json` | Versioned workbook sheet and column layout |
| CLI case, run and version arguments | Expected execution identity and contract versions |

## Workbook contract

Default Configuration 7 layout:

| Workbook | Sheet | ID | Description | Type | Answer |
|---|---|---:|---:|---:|---:|
| CBDDQ | `Intake form` | A | B | C | D |
| Relationship Scoping | `Scoping form` | A | B | C | D |

If workbook templates change, update `config/workbook-layout.json` rather than hard-coding a new layout into validation logic.

## Processing flow

```text
CLI arguments and runtime files
        |
Input-path and readability checks
        |
Workbook parsing
        |
Exhaustive canonical Source Register
        |
Copilot Markdown and JSON block parsing
        |
Identity, count, mapping and boundary checks
        |
Material-reference resolution
        |
Result aggregation
        |
JSON report + HTML summary + execution receipt
```

## Solution structure

```text
apps/intake-validator/
├── package.json
├── package-lock.json
├── README.md
├── config/
│   └── workbook-layout.json
├── schemas/
│   └── approved_mapping_catalog_v1.0.0.json
├── src/
│   ├── index.js
│   ├── workbook.js
│   ├── agent-output.js
│   ├── validator.js
│   ├── report.js
│   ├── render-gate1-packet.js
│   └── utils.js
├── input/
├── test/
└── validation-output/
```

Do not commit `node_modules`. Restore exact dependencies with `npm ci` from `package-lock.json`.

## Module responsibilities

### `index.js`

Orchestrates one validation execution:

1. Parse required arguments
2. Load files and configuration
3. Build the Source Register
4. Parse the Agent package
5. Run deterministic checks
6. Aggregate findings
7. Write outputs
8. Set the process exit code

Unexpected runtime failures become `ERROR`, not a misleading validation `FAIL`.

### `workbook.js`

Owns workbook ingestion and Source Register creation.

It must:

- Confirm required sheets
- Read configured rows and columns
- Preserve field ID, description, type, answer, sheet and source location
- Preserve meaningful value states such as blank, `Unknown`, `Not Applicable`, `Please select`, `Yes` and `No`
- Assign stable canonical `source_record_id` values
- Reject unreadable or incompatible workbooks

### `agent-output.js`

Owns package parsing.

It must:

- Read the complete, unedited Markdown response
- Locate required headings
- Extract complete fenced JSON blocks
- Reject malformed, truncated, missing or duplicate blocks
- Preserve artifact values exactly as supplied

### `validator.js`

Owns deterministic rules.

It must:

- Execute checks in a stable order
- Return structured findings
- Keep validation rules free from output-writing side effects
- Distinguish blocking failure, warning and execution error
- Never repair or mutate the Agent package

### `report.js`

Owns output artifacts.

It must:

- Write the exhaustive Source Register
- Write the authoritative deterministic validation report
- Write a readable HTML summary
- Write the validator receipt
- Escape untrusted content in HTML
- Report output-write failures as `ERROR`

### `render-gate1-packet.js`

Owns the human-readable Gate 1 review packet.

It combines:

- Extracted Draft Gate 1 Packet
- Current deterministic validation result
- Canonical source references

It must distinguish historical Agent status from current validator status and keep human decision fields blank.

## Copilot package contract

The saved package contains these machine-readable artifacts:

1. `RUN_HEADER`
2. `INPUT_VALIDATION_RESULT`
3. `MATERIAL_SOURCE_REFERENCES_JSON`
4. `FACT_SET_JSON`
5. `MATERIAL_FACT_SET_JSON`
6. `CONTROL_ASSESSMENT_JSON`
7. `CANDIDATE_INDICATOR_SET_JSON`
8. `HARD_EXCLUSION_CANDIDATES_JSON`
9. `EXCEPTION_SET_JSON`
10. `PACKAGE_MANIFEST_JSON`
11. `INTAKE_AGENT_RECEIPT_JSON`
12. `FINAL_SELF_CHECK`

The workflow package also contains the human-readable `DRAFT_GATE1_PACKET` and associated run summary content defined by the Agent contract.

Every machine-readable artifact uses a matching Markdown heading followed by a complete fenced JSON block.

## Source Register contract

The exhaustive Source Register is independent evidence derived from the original workbooks.

Each record should preserve at least:

```json
{
  "source_record_id": "SRC-CBDDQ-INTAKE-Q001",
  "source_file": "CG_CBDDQ_Synthetic_HP-001.xlsx",
  "workbook_type": "CBDDQ",
  "sheet": "Intake form",
  "field_id": "Q001",
  "field_description": "Example field",
  "field_type": "Boolean",
  "raw_value": "Yes",
  "normalized_value": true,
  "source_location": "D2"
}
```

Canonical IDs must be deterministic, unique, stable for the same source layout and independent from Agent-generated identifiers.

## Validation categories

### Input integrity

- Required arguments exist
- Input files exist and are readable
- Required worksheets exist
- Mapping catalogue and layout configuration parse successfully

### Package integrity

- Required artifacts are present exactly once
- JSON parses completely
- Package boundaries are valid
- Required properties exist

### Identity and version integrity

- Case ID matches across artifacts and CLI input
- Run ID matches across artifacts and CLI input
- Risk-model version matches
- Mapping-catalogue version matches
- Output-schema version matches
- Validator version is recorded

### Count and identifier integrity

- Manifest counts match actual arrays
- IDs are unique within each artifact
- Every material fact exists in the full fact set
- Referenced fact, exception, indicator and control IDs exist

### Source-grounding integrity

- Every material source reference resolves
- Each reference resolves to the expected workbook, sheet, field and value
- Composite references follow supported syntax
- Unresolved and ambiguous references are blocking findings

### Mapping integrity

- Every mapped candidate uses an active rule from the approved catalogue
- Source field ID, normalized value and rule condition match exactly
- Fabricated and approximate mappings are rejected
- Ambiguous exact mappings are rejected

### Boundary integrity

- The Agent did not create `SOURCE_REGISTER_JSON`
- The Agent did not emit official points, weights, multipliers, score, rating or band
- The Agent did not approve, reject, recommend or authorize scoring
- Gate 1 decision fields remain blank
- The Agent did not claim deterministic validation had already passed

## Vacuous pass handling

A universal check can pass over an empty set.

For example, `APPROVED_MAPPING_RULE` may pass when there are zero candidate indicators. That result proves only that no supplied candidate violated the rule. It does not prove mapping coverage.

The validator therefore reports counts alongside rule results. The Scoring Engine separately performs admission checks and must not treat an empty-set pass as evidence that scoring inputs exist.

## Result contract

| Result | Meaning |
|---|---|
| `PASS` | No blocking validation failures or execution errors |
| `PASS_WITH_WARNINGS` | No blocking failures; at least one warning requires review |
| `FAIL` | One or more blocking or critical assertions failed |
| `ERROR` | The validator could not complete reliably |

A `PASS` means the package contract holds. It does not approve Gate 1, resolve business exceptions or authorize scoring.

A package can validly have:

```text
Package Contract Validation: PASS
Gate 1 Review Allowed: YES
Business Readiness: BLOCKED_BY_OPEN_ITEMS
Scoring Status: NOT_AUTHORIZED
```

## Output contract

One execution writes:

```text
validation-output/
├── exhaustive-source-register.json
├── deterministic-validation-report.json
├── validation-summary.html
└── validator-receipt.json
```

Optional packet extraction and rendering add:

```text
validation-output/
├── draft-gate1-packet.json
└── gate1-review-packet.html
```

### `exhaustive-source-register.json`

Contains every canonical workbook source record used for traceability.

### `deterministic-validation-report.json`

Contains:

- Overall result
- Check totals
- Ordered findings
- Severity and blocking status
- Expected and actual values
- Artifact and JSON path where applicable

### `validation-summary.html`

Presents the deterministic results for human review. All supplied values are HTML-escaped.

### `validator-receipt.json`

Records:

- Execution identity
- Case and Run IDs
- Validator and runtime versions
- Input filenames and hashes
- Mapping and schema versions
- Output filenames and hashes
- Start and completion timestamps
- Overall result and exit code

## CLI contract

```text
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

Pre-run:

```text
npm ci
npm run check
npm test
```

## Security boundaries

The Intake Validator must:

- Use synthetic or approved sanitized data only in the demonstrator
- Treat workbook, Markdown and JSON content as untrusted
- Escape all HTML output
- Reject path traversal where execution roots are constrained
- Limit input size and JSON depth
- Never execute workbook macros or embedded scripts
- Avoid logging sensitive full payloads unnecessarily
- Use lockfile-based dependency installation

Do not commit:

- Real intake forms
- Private evidence
- Generated case outputs
- Credentials or tokens
- `.env` files
- `node_modules`

## Failure discipline

Failed executions are retained as evidence.

The validator never changes the Agent package to obtain a pass.

A semantic correction requires a new Agent Run ID. A validator-only correction against the same immutable Agent response retains that Run ID and records a new validator version and execution receipt.

Output-write failure is `ERROR`. The validator must not claim successful completion when required artifacts were not written.

## Testing strategy

### Unit

- Workbook value-state normalization
- Canonical source-ID creation
- Markdown block extraction
- JSON parsing
- Count reconciliation
- Unique-ID validation
- Material-reference resolution
- Mapping-rule matching
- Result aggregation
- HTML escaping

### Contract

- Complete valid package accepted
- Missing and duplicate artifact rejected
- IDs and versions reconcile
- Manifest counts match arrays
- Gate 1 fields remain blank
- Prohibited Agent outputs are blocked

### Negative

- Missing file
- Unreadable or corrupted workbook
- Missing required worksheet
- Malformed or truncated JSON
- Duplicate IDs
- Unresolved or ambiguous source reference
- Unapproved mapping
- Unwritable output directory

### Security

- Script content is escaped in HTML
- Path traversal is rejected
- Oversized input is rejected safely
- Prototype-pollution keys are rejected where applicable
- No secrets appear in logs or reports

### Reproducibility

For identical workbooks, Agent package, mapping catalogue, workbook layout, CLI values and validator version, the Source Register, findings and overall result are semantically identical. Execution IDs and timestamps may differ.

## Completion boundary

The Node.js solution is complete when:

- Required inputs are validated
- Both workbooks are parsed using versioned layout configuration
- The exhaustive Source Register is generated deterministically
- All package artifacts parse completely
- IDs, versions, counts, mappings and references are checked
- Prohibited scoring and decision outputs are blocked
- All four required validation artifacts are written
- Gate 1 rendering preserves current and historical status correctly
- Unit, contract, negative, security and reproducibility tests pass
- Failed runs remain auditable

## Related

- `ai-solution-architecture.md`
- `intake-analyzer-architecture.md`
- `scoring-engine-architecture.md`
- `gate3-memo-creator-architecture.md`
