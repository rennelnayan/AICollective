# AI output contracts

Every boundary between components has one shape. Changing a shape means
changing both sides and the checks between them.

## 1. Draft Gate 1 Package — fourteen blocks, fixed order

`draft_gate1_package.md` is assembled from the agent's two responses without
semantic alteration.

| # | Block | From |
|---|---|---|
| 1 | `RUN_HEADER` | Part 2 |
| 2 | `INPUT_VALIDATION_RESULT` | Part 1 |
| 3 | `EXECUTIVE_INTAKE_SUMMARY` | Part 2 |
| 4 | `DRAFT_GATE1_PACKET` | Part 2 |
| 5 | `MATERIAL_SOURCE_REFERENCES_JSON` | Part 1 |
| 6 | `FACT_SET_JSON` | Part 1 |
| 7 | `MATERIAL_FACT_SET_JSON` | Part 1 |
| 8 | `CONTROL_ASSESSMENT_JSON` | Part 1 |
| 9 | `CANDIDATE_INDICATOR_SET_JSON` | Part 1 |
| 10 | `HARD_EXCLUSION_CANDIDATES_JSON` | Part 1 |
| 11 | `EXCEPTION_SET_JSON` | Part 1 |
| 12 | `PACKAGE_MANIFEST_JSON` | Part 2 |
| 13 | `INTAKE_AGENT_RECEIPT_JSON` | Part 2 |
| 14 | `FINAL_SELF_CHECK` | Part 2 |

`INTERIM_SELF_CHECK` is excluded. Every machine-readable object sits in a
complete fenced JSON block with no explanatory text inside it.

## 2. Exhaustive Source Register — validator owned

One record per parsed field across both workbooks. The agent never creates
this; canonical IDs are the validator's.

```json
{
  "source_record_id": "SRC-CBDDQ-16",
  "workbook_type": "CBDDQ",
  "question_or_field_id": "16",
  "source_location": "Intake form!D19",
  "raw_value": "No",
  "normalized_value": "NO"
}
```

Mapping rules key on `workbook_type` plus `question_or_field_id`. That is why a
mapping gap can be closed without changing any workbook.

## 3. Mapper output — anchors and control tiers

```json
{
  "factors": {
    "F3": { "anchor": 3, "rule_id": "F3-R3",
            "evidence_refs": ["SRC-CBDDQ-6"],
            "source_location": "Intake form!D8" }
  },
  "controls": {
    "C1": { "tier": "Self-asserted only",
            "evidence_refs": ["SRC-CBDDQ-22", "SRC-SCOPE-S34"] }
  }
}
```

`anchor` is one of exactly 0, 3, 6 or 10. `tier` is one of four configured
names. Anything else throws rather than defaults.

## 4. Gate 1 decision — from the signed workbook

Read directly from `Gate1-Review-Form-COMPLETED.xlsx`. There is no JSON
intermediate that anyone can edit after the reviewer signs.

```json
{
  "gate_1_status": "APPROVED_FOR_SCORING",
  "exception_resolutions": [
    { "exception_id": "EXC-0002", "resolution": "REVIEWED",
      "reviewer_role": "Financial Crime Analyst", "reviewer_id": "...",
      "resolution_date": "2026-10-04", "rationale": "..." }
  ],
  "hard_exclusion_resolutions": [
    { "hard_exclusion_id": "HEX-0003", "resolution": "NOT_TRIGGERED",
      "reviewer_role": "Sanctions Operations", "reviewer_id": "...",
      "resolution_date": "2026-10-02", "determination_source": "...",
      "rationale": "..." }
  ]
}
```

Reviewer identity and role are recorded **per resolution**. A sanctions
determination and an evidence review are usually made on different days by
different people in different roles.

`UNKNOWN` is not a valid resolution — it is the state being resolved.

## 5. Scoring output

`scoring_output.json` carries the result plus everything needed to defend it:
the four statuses, validation provenance, the Gate 1 decision and all
resolutions, the configuration and mapping versions, and one line per factor
and control showing its contribution and source records.

**Never consume `residual` without checking `scoring_authorised`.**

## 6. Status vocabulary

| Status | Owner | Values |
|---|---|---|
| Package Contract Validation | Validator | `PASS`, `PASS_WITH_WARNINGS`, `FAIL`, `ERROR` |
| Gate 1 Review Allowed | Validator | `ALLOWED`, `BLOCKED_BY_OPEN_ITEMS` |
| Business Readiness | Packet logic | `READY`, `BLOCKED_BY_OPEN_ITEMS` |
| Scoring Authorisation | Human only | `AUTHORISED`, `NOT_AUTHORISED` |

A package can be contract-valid and still unscoreable. That combination is the
normal case, not a contradiction.
