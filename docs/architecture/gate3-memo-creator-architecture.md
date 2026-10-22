# Gate 3 Memo Creator architecture

Microsoft 365 Copilot, Gate 3 Packet Agent v1.2.0.

The Gate 3 Memo Creator is the probabilistic language component that converts an admitted Gate 3 case into a factual, source-traceable committee memo and a self-contained demo review packet.

It drafts and checks. It never decides.

## Why Gate 3 has a separate agent

Gate 3 uses a different authority set and serves a different reader from intake analysis.

The Intake Analyzer interprets source workbooks before Gate 1. The Gate 3 Memo Creator works only after Gate 2 and explains an already validated and scored case to a committee.

Keeping the agents separate prevents the memo creator from:

- Reinterpreting the original case as if Gate 1 had not occurred
- Recalculating or changing the score
- Reopening Gate 2 silently
- Introducing new facts into the decision record
- Prepopulating or making the committee decision

## Purpose

The component helps the committee understand:

- The respondent and proposed relationship
- Material risk drivers and controls
- The deterministic score and assigned band
- Gate 1 and Gate 2 outcomes
- Open exceptions, hard-exclusion matters, conditions and restrictions
- The exact decision requested from the committee

Every material statement must be traceable to an admitted source, identifier or artifact.

## Admission before drafting

The agent validates admission before producing a memo.

Required checks include:

- Case and Run IDs match across artifacts
- Required versions match
- Deterministic validation is `PASS`
- Scoring was authorized
- Gate 1 approved and excluded indicator arrays are present
- Gate 2 has a complete disposition
- Exceptions and hard-exclusion resolutions are valid

Gate 3 is required when at least one approved routing rule applies:

- Final band is `HIGH`
- Policy status is `PROHIBITED` pending exception disposition
- Gate 2 disposition is `ESCALATE_TO_GATE_3`
- Gate 2 requests a committee override
- A policy or hard-exclusion matter requires committee disposition

If required inputs are missing, return `GATE3_INPUT_INCOMPLETE` and stop.

If no admission rule applies, return `GATE3_NOT_REQUIRED` and stop.

## Inputs and authority

| Priority | Source | Authority |
|---:|---|---|
| 1 | `scoring_output.json` | Score, band, factors, controls, multipliers, versions and approval level |
| 2 | Completed Gate 2 Approval Form | Disposition, rationale, conditions, open items, escalation and override request |
| 3 | Gate 1 decision | Approved and excluded indicators and resolutions |
| 4 | Validation report and scoring trace | Validation status and deterministic calculation trace |
| 5 | Exception and hard-exclusion resolutions | Approved treatment of open policy matters |
| 6 | CBDDQ or validated Gate 1 facts | Respondent identity, ownership, business, products and customers |
| 7 | Relationship Scoping Form or validated Gate 1 facts | Services, permissions, activity, corridors, restrictions and oversight |
| 8 | Risk-model thresholds, when supplied | Exact band interval and approval matrix context |

Agent inference is never authoritative.

If an unavailable profile fact is requested, use `PROFILE_INFORMATION_NOT_AVAILABLE`.

If authoritative sources conflict, cite both, return `GATE3_SOURCE_CONFLICT`, and stop. The agent must not choose a preferred value.

## Processing flow

```text
Required Gate 1, Gate 2, scoring and validation artifacts
        |
Admission and source-consistency checks
        |
Gate 3 required? ---------------------- no --> GATE3_NOT_REQUIRED
        |
       yes
        |
Source-bound memo drafting
        |
Score explanation without recalculation
        |
Memo quality self-check
        |
Self-contained demo HTML packet
        |
Blank Gate 3 human decision form
```

## Why score explanation is not score calculation

The memo explains the deterministic scoring result exactly as supplied.

The explanation must include:

- Inherent score
- C1-C4 multiplier basis
- Unfloored residual
- Floor and whether the floor applied
- Final residual
- Exact band
- Threshold interval, when supplied
- Required approval level

The standard form is:

> The engine calculated an inherent score of [X]. Applying multiplier [M] produced unfloored residual [U]. The floor was [F] and [did/did not] apply. Final residual [R] is assigned to [BAND]. The approval matrix requires [LEVEL].

The agent must not recalculate or alter scores, bands, anchors, weights, multipliers, thresholds, factors, control tiers, versions or approval levels.

If thresholds are unavailable, state `BAND_THRESHOLD_DESCRIPTION_NOT_AVAILABLE`.

## Memo output contract

The committee memo contains these sections:

1. Case and Run Header
2. Decision Requested
3. Executive Summary
4. Respondent Profile
5. Proposed Relationship
6. Score and Band Explanation
7. F1-F6 Risk Factors
8. C1-C4 Controls
9. Gate 1 Outcome
10. Gate 2 Outcome
11. Exceptions and Hard Exclusions
12. Conditions, Restrictions and Monitoring
13. Evidence and Validation
14. Traceability
15. Versions and Limitations
16. Blank Gate 3 Decision Form

The Executive Summary is 250-450 words and uses supported facts only.

The memo distinguishes:

- Respondent assertion
- Evidence provided
- Independent verification
- Missing evidence

A `Yes` answer alone is not evidence of control effectiveness.

Avoid unsupported labels such as `strong`, `weak`, `robust`, `safe`, `acceptable`, `reputable` or `well-controlled`. Use language such as `the intake states`, `the engine assigned` or `Gate 2 recorded`.

## Interactive HTML architecture

The agent produces one self-contained HTML document with inline CSS and JavaScript.

The packet displays:

- Executive summary
- Respondent profile
- Proposed relationship
- Score cards and score explanation
- F1-F6 and C1-C4 tables
- Gate 1 and Gate 2 records
- Open matters
- Source references
- Versions and limitations

Prior-gate and scoring content is read-only. Only Gate 3 decision controls are editable.

The page uses no external libraries, network requests, form action, backend, cookies or browser storage.

## Gate 3 decision form contract

The form ID is `gate3DecisionForm` and the heading states:

`DEMO ONLY - NOT SAVED OR SUBMITTED`

All decision fields are blank on load except the conditional Override Approved default.

| Field | Contract |
|---|---|
| Decision ID | Required text; maximum 80 characters |
| Decision Date | Required date |
| Status | Required controlled selection |
| Chair Role | Required text; maximum 120 characters |
| Voting Members | Required textarea; one member per line |
| Conditions | Textarea |
| Override Approved | Controlled selection |
| Next Review Date | Optional date; cannot precede Decision Date |
| Comments | Required textarea; maximum 3000 characters |
| Attestation | Required checkbox confirming demo-only behavior |

Allowed Status values:

- blank
- `APPROVED`
- `APPROVED_WITH_CONDITIONS`
- `REMANDED`
- `REJECTED`
- `EXCEPTION_APPROVED`
- `EXCEPTION_DENIED`

Allowed Override Approved values:

- blank
- `NOT_APPLICABLE`
- `YES`
- `NO`

Conditional rules:

- `APPROVED_WITH_CONDITIONS` requires Conditions.
- `EXCEPTION_APPROVED` requires Override Approved = `YES` and Comments.
- `EXCEPTION_DENIED` requires Override Approved = `NO` and Comments.
- If Gate 2 requested no override, default Override Approved to `NOT_APPLICABLE`; keep the field editable.
- Next Review Date cannot precede Decision Date.

`Validate Demo Decision` validates locally. When valid, it displays:

`Demo validation passed. No data was saved or submitted.`

`Clear Form` resets only Gate 3 fields after confirmation.

`Print Packet` calls only `window.print()`.

The HTML must not contain Submit, Save, Export, Download, `localStorage`, `sessionStorage`, IndexedDB, `fetch`, `XMLHttpRequest`, WebSocket, beacon or external links.

## Security and integrity boundaries

The Gate 3 Memo Creator must:

- Escape supplied text before inserting it into HTML
- Keep supplied prior-gate and scoring values read-only
- Preserve exact numeric values and versions
- Keep every Gate 3 decision field blank unless a documented conditional default applies
- Display the demo warning on screen and in print
- Use unique element IDs and bound labels
- Show inline errors and an accessible error summary using `role="alert"` and `aria-live="polite"`

The Gate 3 Memo Creator must not:

- Infer absent facts
- Treat missing data as favorable
- Claim control effectiveness without approved verification
- Hide open matters
- Recalculate the score
- Alter Gate 1 or Gate 2 records
- Prepopulate a committee decision
- Make, recommend or imply the final decision
- Claim that a demo action was saved or submitted
- Send, store or export entered decision data

## Response contract

Return exactly:

1. `GATE3_ADMISSION_RESULT`
2. `GATE3_COMMITTEE_MEMO`
3. `MEMO_QUALITY_SELF_CHECK`
4. `GATE3_REVIEW_PACKET_HTML`

If the HTML cannot fit, return `GATE3_HTML_OUTPUT_TOO_LARGE`. Never return partial HTML.

A critical self-check failure returns `MEMO_CORRECTION_REQUIRED`.

Otherwise, the final status is `DRAFT_PENDING_GATE3_HUMAN_DECISION`.

## Quality self-check

The self-check returns PASS or FAIL for:

- IDs and versions
- Intake-only profile and relationship facts
- Complete executive summary
- Exact score values
- Contextual score and threshold explanation
- Complete F1-F6 and C1-C4 coverage
- Accurate Gate 1 and Gate 2 records
- Visible open matters
- No invented facts or conclusions
- All 16 memo sections
- Blank-on-load Gate 3 decision fields
- Exact controlled options
- Working local validation
- No save, submit, storage, network or backend behavior
- Visible demo warning on screen and in print
- No claimed committee decision

## Failure discipline

A failed admission or self-check is preserved as a real result.

The memo or HTML must not be hand-edited to conceal a source conflict, score mismatch, missing artifact or open matter.

Corrections to admitted source artifacts must occur in the owning component and produce the appropriate new version or decision record before the Gate 3 packet is regenerated.

## Testing strategy

### Positive

- Complete High-band case is admitted.
- Exact source values appear in all memo sections.
- Gate 3 form validates valid local demo input.
- Print output retains entered values and the demo warning.

### Negative

- Missing scoring output returns `GATE3_INPUT_INCOMPLETE`.
- Conflicting score values return `GATE3_SOURCE_CONFLICT`.
- Non-routed case returns `GATE3_NOT_REQUIRED`.
- Attempted score alteration fails self-check.
- Prepopulated decision fields fail self-check.
- Network, storage or submit behavior fails self-check.

### Boundary

- `APPROVED_WITH_CONDITIONS` without Conditions is rejected locally.
- Exception decision and Override Approved values must agree.
- Next Review Date before Decision Date is rejected.
- Comments above 3000 characters are rejected.
- HTML at response-size limit returns the defined size status rather than partial markup.

### Security and accessibility

- Supplied script markup is rendered as text, not executed.
- Every control has a bound label.
- Error summary is announced through the accessibility region.
- Keyboard-only form completion is possible.
- No decision data survives page reload.

## Completion boundary

The Gate 3 Memo Creator is complete when:

- Admission is resolved deterministically
- Every material statement has a supplied source reference
- Score values exactly match authoritative scoring output
- Gate 1 and Gate 2 records are represented accurately
- Open matters remain visible
- All 16 memo sections are present
- Interactive HTML is self-contained and safe
- Gate 3 decision fields remain human-owned
- Quality self-check passes
- Final status is `DRAFT_PENDING_GATE3_HUMAN_DECISION`

## Related

- `ai-solution-architecture.md`
- `intake-analyzer-architecture.md`
- `intake-validator-nodejs-architecture.md`
- `scoring-engine-architecture.md`
