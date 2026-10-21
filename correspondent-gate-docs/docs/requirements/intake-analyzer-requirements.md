# Intake Analyzer — requirements

**Component:** CG Intake Analyzer, Microsoft 365 Copilot Configuration 7
**Status:** active

## Purpose

Interpret two completed case workbooks and produce the semantic artifacts a
human reviewer needs at Gate 1, without concluding anything about the case.

## Functional requirements

| # | Requirement |
|---|---|
| IA-01 | Register eight controlled files across three batches in one fresh conversation, confirming each batch before the next |
| IA-02 | Derive the dynamic test data ID from both case workbook filenames and confirm they match |
| IA-03 | Return `READY_FOR_INTAKE_ANALYSIS` only when all eight files are present, readable, non-duplicate and non-obsolete |
| IA-04 | Produce nine Part 1 semantic artifacts in a fixed order |
| IA-05 | Produce six Part 2 packet artifacts in a fixed order |
| IA-06 | Reference every fact to a material source reference resolvable to a workbook cell |
| IA-07 | Use only mapping rules from the approved mapping catalogue |
| IA-08 | Raise an exception rather than resolving a gap by inference |
| IA-09 | Leave the Gate 1 Decision Section entirely blank |
| IA-10 | Report deterministic validation as `NOT_EXECUTED` at generation time |

## Prohibitions

| # | The agent must not |
|---|---|
| IA-P1 | Produce an official score, points, weights, multipliers, rating or risk band |
| IA-P2 | Approve, reject, recommend or authorise scoring |
| IA-P3 | Create `SOURCE_REGISTER_JSON` or invent canonical `source_record_id` values |
| IA-P4 | Claim that deterministic validation has passed |
| IA-P5 | Alter semantic content between Part 1 and package assembly |
| IA-P6 | Re-read or reinterpret the workbooks during assembly |

Each prohibition is checked by the validator. They are enforced, not trusted.

## Error states

`FILE_BATCH_n_INCOMPLETE`, `DUPLICATE_CASE_FILES`, `CASE_FILE_ID_MISMATCH`,
`SOURCE_FILE_UNREADABLE`, `INPUT_INCOMPLETE`, `REFERENCE_PACK_INCOMPLETE`,
`PACKAGE_NOT_ASSEMBLED`, `PACKAGE_OUTPUT_TOO_LARGE`

Every one halts the run. None is recoverable by editing output.

## Non-functional requirements

**Reproducibility.** A semantic change requires a new Run ID. A validator-only
correction against the same immutable response keeps the Run ID.

**Evidence.** Both parts are retained as separate files before assembly, and a
failed run is preserved rather than deleted.

**Integrity.** Semantic content is never edited by hand to force a validator
PASS. If the output is wrong, the agent or its inputs are corrected and the run
is repeated under a new Run ID.

## Acceptance

A run is acceptable when preflight returns `READY_FOR_INTAKE_ANALYSIS`, both
parts contain every required artifact, assembly reports 14 of 14 sections, and
the validator returns PASS on 17 of 17 checks with the Gate 1 Decision Section
still blank.
