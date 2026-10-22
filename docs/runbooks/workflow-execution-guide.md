# Workflow execution guide

The authoritative step-by-step procedure is
`Correspondent_Gate_Workflow_Execution_Guide_v1.0.0.docx`. This page is the
index and the parts that are not in it.

## Covered by the Word guide

| Section | Purpose |
|---|---|
| 1–2 | Scope, success criteria, ownership |
| 3–4 | Prerequisites, folder layout, test identifiers |
| 5–7 | Three upload batches |
| 8 | Package preflight |
| 9–10 | Copilot Part 1 and Part 2 |
| 11 | Assemble `draft_gate1_package.md` |
| 12 | Run the Node.js validator |
| 13 | Extract and render the Gate 1 packet |
| 14 | Interpret the four statuses |
| 15–16 | Evidence, troubleshooting, completion checklist |

Convert that guide to Markdown and place it here when there is time. A binary
in a repository is harder to diff and review than the procedure deserves.

## Not covered: running the scoring engine

The Word guide ends at the rendered Gate 1 packet. Everything below continues
from there.

### Setup

Node 18 or newer. No `npm install`.

Put the engine files, configuration, forms and case files flat in one folder.

### Score a case

```
node mapper.mjs      # register to factor anchors
node fullRun.mjs     # admission, then scoring
node --test          # 65 tests
```

Before a Gate 1 decision exists, `fullRun.mjs` reports the open blockers and
refuses to score. **That refusal is the correct outcome.**

### Record a Gate 1 decision

1. Run `node fullRun.mjs` and read the blockers it reports
2. Complete `Gate1-Review-Form.xlsx` — case, reviewer, status, one row per open
   exception and hard exclusion, list versions used
3. Save as `Gate1-Review-Form-COMPLETED.xlsx` in the same folder
4. Run `node fullRun.mjs` again

Determine hard exclusions from your own maintained lists, never from the
respondent's answers.

### Record a Gate 2 decision

```
copy gate2-decision.example.json gate2-decision.json -Force
node gate2Run.mjs
```

Set `decision` to `ACCEPT`, `OVERRIDE` or `REMAND` and replace the placeholder
name first.

## Expected happy-path state

```
Package Contract Validation : PASS
Gate 1 Review Allowed       : ALLOWED
Business Readiness          : BLOCKED_BY_OPEN_ITEMS
Scoring Authorisation       : NOT_AUTHORISED
```

Not contradictory. The package contract passed; the business case remains
blocked until an authorised owner resolves the open items.

## Common failures

| Symptom | Cause | Recovery |
|---|---|---|
| `Cannot find module` | Running outside the folder, or a file saved with a trailing `.txt` | `cd` in; check `dir *.mjs` |
| `Reviewer role is empty` | An older completed form against a newer reader | Match the form version to the reader |
| Fewer tests than expected | Case files absent, so some skip | Add the three case JSON files |
| PASS but scoring still locked | A blocking exception remains | Resolve it through the authorised owner. Do not override |
| Historical `NOT_EXECUTED` shows as current | Old renderer | Use the renderer with current-state reconciliation |

## Failed-run discipline

Do not delete evidence because a run failed. Do not hand-edit generated JSON to
create a pass. For a semantic change use a new Run ID; for a validator-only
correction keep it and record the validator version change.

Rerun one test at a time and inspect each result before continuing.
