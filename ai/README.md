# AI components

Two agents. One is in production use; the other is not yet specified.

| Agent | Platform | Status | Owns |
|---|---|---|---|
| CG Intake Analyzer | Microsoft 365 Copilot, Configuration 7 | Active | Semantic interpretation of two case workbooks, and the Draft Gate 1 Packet |
| Gate 3 Packet Agent | Not yet determined | **Stub** | Not yet specified |

## What the agents are not allowed to do

These boundaries are enforced by the validator, not by trust:

- No official score, points, weights, multipliers, rating or risk band
- No Gate 1 approval, rejection, recommendation or scoring authorisation
- No creation of `SOURCE_REGISTER_JSON` — canonical source IDs belong to the validator
- No claim that deterministic validation has executed
- No invention of canonical `source_record_id` values

Four of the validator's seventeen checks exist solely to confirm these
boundaries held: `OFFICIAL_SCORE_ABSENT`, `RISK_BAND_ABSENT`,
`APPROVAL_REJECTION_ABSENT`, `VALIDATION_CLAIM_ABSENT`.

## Versioning

An agent instruction change is a **configuration version**, not an edit. Record
the version in the run header of every artifact it produces, and keep the
previous instructions file.

A semantic change to agent output requires a **new Run ID**. A validator-only
correction against the same immutable agent response keeps the Run ID and
records the validator version change instead.
