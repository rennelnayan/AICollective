# Data handling

## Classification

**Synthetic or approved sanitised data only.** No real respondent data appears
in this repository, and none should be added.

Every case file, every completed form, and every worked example is invented.
Institution names, LEIs, addresses and officer names are fictional.

## What a real deployment would need that this does not have

This is a prototype. The following are absent by design, not oversight:

- Access control on case artifacts
- Encryption at rest for the source register
- Retention and disposal schedule
- Audit logging of who read a case, as distinct from who decided it
- Segregation between the sanctions list store and the case store

## Evidence retention

For each run, retain:

- Batch registration responses for all three batches
- The preflight response showing `READY_FOR_INTAKE_ANALYSIS`
- Part 1 and Part 2 as separate files, before assembly
- `draft_gate1_package.md`
- Every file in the validation output
- Agent configuration and validator version numbers
- Any failed runs, with the correction rationale

**A failed run is not deleted.** Preserve it, correct the agent or its inputs,
and repeat under a new Run ID.

## Integrity rules

Never hand-edit generated JSON to produce a pass. If output is wrong, the
component or its inputs are wrong.

Never commit a completed Gate 1 review form to the repository root — it reads
as a real approval. The worked example lives in the case folder and is labelled
as test data.

Generated artifacts are not committed: `scoring_output.json`,
`mapped_extraction.json`, `gate2_assessment_record.json`.
