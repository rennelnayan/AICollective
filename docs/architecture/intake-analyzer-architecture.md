# CG Intake Analyzer architecture

Microsoft 365 Copilot, Configuration 7.

The CG Intake Analyzer is the probabilistic language component of Intake Validation. It interprets the completed intake workbooks, creates source-grounded semantic artifacts, identifies unresolved issues and prepares a Draft Gate 1 Packet.

It does not create the canonical Source Register, calculate the official score, approve a gate or authorize scoring.

## Why three batches

Eight files in one upload produces unreliable registration. Batching, with a confirmation after each batch, makes an incomplete reference pack visible before any analysis runs rather than after.

Each batch returns only a status and file inventory. No semantic analysis occurs until full-package preflight passes.

| Batch | Contents | Confirms |
|---|---|---|
| 1 | Two field dictionaries and semantic output schema | Extraction and semantic-output contracts |
| 2 | Risk model, mapping catalogue and packet schema | Approved mapping, model vocabulary, packet contract and versions |
| 3 | Two completed case workbooks | Case inputs, required worksheets and matching case identifier |

Batch registration proves only that the expected files are available in the conversation. It does not prove that the complete package is coherent.

## Why preflight is separate

Preflight re-inventories everything registered in the current conversation and returns one of six statuses.

Preflight exists because confirmation of individual batches is not equivalent to validation of the complete input package. Checks requiring the entire package include:

- Matching dynamic identifiers across both case workbooks
- Required worksheet presence
- File readability
- Controlled-reference completeness
- Approved version alignment
- Absence of obsolete schemas
- Absence of duplicate matching workbooks

The allowed statuses are:

- `READY_FOR_INTAKE_ANALYSIS`
- `INPUT_INCOMPLETE`
- `REFERENCE_PACK_INCOMPLETE`
- `DUPLICATE_CASE_FILES`
- `CASE_FILE_ID_MISMATCH`
- `SOURCE_FILE_UNREADABLE`

`READY_FOR_INTAKE_ANALYSIS` is the only status that permits semantic analysis.

An unreadable required source is an execution failure, not a semantic exception. The Analyzer must stop rather than infer or reconstruct the missing content.

## Why the output is split into two parts

Part 1 performs semantic interpretation. Part 2 packages the completed interpretation for Gate 1.

Splitting the output creates an inspection boundary between interpretation and presentation. Part 2 is constrained to use only completed Part 1 artifacts. It must not:

- Re-read or reinterpret the original workbooks
- Change facts or material source references
- Change raw or normalized values
- Change control assessments
- Change mapping-rule identifiers
- Add or remove exceptions
- Change artifact counts
- Introduce new conclusions

A single-pass agent that interprets and packages simultaneously provides no stable point at which the semantic result can be inspected independently.

## Part 1 output contract

Part 1 produces:

1. `INPUT_VALIDATION_RESULT`
2. `MATERIAL_SOURCE_REFERENCES_JSON`
3. `FACT_SET_JSON`
4. `MATERIAL_FACT_SET_JSON`
5. `CONTROL_ASSESSMENT_JSON`
6. `CANDIDATE_INDICATOR_SET_JSON`
7. `HARD_EXCLUSION_CANDIDATES_JSON`
8. `EXCEPTION_SET_JSON`
9. `INTERIM_SELF_CHECK`

Part 1 identifies facts, material facts, evidence status, controls, candidate indicators, hard-exclusion candidates and unresolved exceptions.

Candidate indicators are proposals for Gate 1 review. They are not approved risk factors and cannot enter scoring until the required human review is complete.

## Part 2 output contract

Part 2 produces:

1. `RUN_HEADER`
2. `EXECUTIVE_INTAKE_SUMMARY`
3. `DRAFT_GATE1_PACKET`
4. `PACKAGE_MANIFEST_JSON`
5. `INTAKE_AGENT_RECEIPT_JSON`
6. `FINAL_SELF_CHECK`

The Draft Gate 1 Packet must have this status:

`DRAFT_PENDING_DETERMINISTIC_VALIDATION`

The Gate 1 Decision Section remains blank.

Part 2 does not claim that the deterministic validator has executed or passed.

## Why the agent does not own canonical IDs

The CG Intake Analyzer never creates `SOURCE_REGISTER_JSON` and never assigns canonical `source_record_id` values.

The Node.js Intake Validator parses both workbooks exhaustively and creates the canonical Source Register independently.

If the Analyzer assigned canonical source identifiers, the traceability claim would depend on the same probabilistic component whose output is being traced. Separating those responsibilities makes the Source Register independent evidence.

The Analyzer instead creates material source references containing enough source information for the Node.js Intake Validator to resolve them against the canonical Source Register.

## Exact mapping only

The Analyzer may propose a candidate indicator only when an active rule in the approved mapping catalogue matches:

1. The source field identifier
2. The normalized source value
3. The rule condition

The Analyzer must not invent, approximate or substitute a mapping.

If no exact approved rule applies, the Analyzer raises an `UNMAPPED_FACT` or `MAPPING_GAP` exception.

If more than one exact active rule applies, the Analyzer returns `AMBIGUOUS_MAPPING`.

## The exception mechanism

When the Analyzer cannot safely resolve a material issue, it records an exception rather than inferring a convenient value.

Examples include:

- Missing required evidence
- Contradictory source values
- Unsupported control assertion
- Unmapped material fact
- Ambiguous approved mapping
- Material information requiring human clarification

A blocking exception prevents the case from progressing to scoring or completion until an authorized reviewer or owner resolves it.

A blocking exception is not a rejection. It is a controlled statement that the current package is not ready for the next governed stage.

This is what allows the probabilistic component to be useful without treating its output as authoritative. “I cannot resolve this safely” is a valid and actionable result.

## Decision and scoring boundaries

The CG Intake Analyzer must not:

- Create the exhaustive Source Register
- Invent canonical source-record identifiers
- Produce official points, weights or multipliers
- Calculate a total score
- Assign an official risk rating or band
- Approve or reject Gate 1
- Recommend the final relationship decision
- Authorize scoring
- Claim deterministic validation has executed or passed

The Analyzer may extract meaning, identify candidate mappings, record uncertainty, raise exceptions and draft review material.

The Node.js Intake Validator verifies package integrity.

Gate 1 reviewers approve or correct the factual record.

The deterministic Scoring Engine calculates the official assessment only from admitted, Gate 1-approved facts.

Human reviewers make every business decision.

## Failure discipline

Failed runs are preserved as evidence.

Generated JSON is never hand-edited to manufacture a passing result. If the semantic output is wrong, the failed result is retained, the source input or Analyzer configuration is corrected, and the semantic analysis is rerun with a new Run ID.

A validator-only correction against the same immutable Analyzer response keeps the Analyzer Run ID. The new validator execution records its own version, timestamp and receipt.

This distinction preserves whether the meaning changed or only the deterministic validation implementation changed.

## Completion boundary

The CG Intake Analyzer is complete when:

- Preflight returned `READY_FOR_INTAKE_ANALYSIS`
- Part 1 contains all nine required blocks
- Part 2 contains all six required blocks
- Identifiers and versions are consistent
- Counts reconcile with actual artifacts
- Every material fact has source provenance
- Every candidate mapping uses an exact approved rule
- Unresolved issues are represented as exceptions
- No canonical Source Register was created
- No official scoring or decision output was produced
- The Draft Gate 1 Packet is ready for independent deterministic validation

## Related

- `ai-solution-architecture.md`
- `deterministic-intake-validator-architecture.md`
- `scoring-engine-architecture.md`
- `gate3-memo-creator-architecture.md` — stub
