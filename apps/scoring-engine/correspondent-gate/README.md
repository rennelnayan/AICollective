# Correspondent Gate — scoring engine

Deterministic risk scoring for correspondent banking respondent onboarding.
Same input plus same configuration version always produces the same output.

**Node 18 or newer. Zero dependencies — no `npm install`, no `package.json`.**

## Quick start

```
node mapper.mjs      # source register -> factor anchors
node fullRun.mjs     # mapping -> admission -> scoring
node --test          # 65 tests
```

`fullRun.mjs` refuses to score until a signed Gate 1 decision exists. That
refusal is the correct outcome, not an error.

## Recording a Gate 1 decision

1. Run `node fullRun.mjs` and read the blockers it reports
2. Complete `forms/Gate1-Review-Form.xlsx` — case, reviewer, status, one row
   per open exception and hard exclusion, list versions used
3. Save it as `Gate1-Review-Form-COMPLETED.xlsx` **in this folder**
4. Run `node fullRun.mjs` again

The engine reads the signed workbook directly. There is no JSON intermediate
that anyone can edit after the fact.

Determine hard exclusions from your own maintained lists, never from what the
respondent said about itself.

## Files

| File | What it is |
|---|---|
| `scoring.mjs` | The engine. Weighted anchors, control multipliers, floor, bands |
| `admission.mjs` | Four-status gate. Decides whether a case may be scored at all |
| `mapper.mjs` | Turns the exhaustive source register into factor anchors |
| `gate1Form.mjs` | Reads and validates the signed Gate 1 review workbook |
| `resolve.mjs` | Applies a human Gate 1 decision to the packet |
| `gate2.mjs` | Assessment review: accept, override or remand |
| `xlsxRead.mjs` | Minimal .xlsx reader, ZIP plus `node:zlib` |
| `fullRun.mjs` | End-to-end runner. The main entry point |
| `gate2Run.mjs` | Applies a Gate 2 decision to a scoring result |
| `weights.v0.1.json` | Factor weights, multipliers, floor, bands |
| `mapping.rules.v1.1.json` | Field ID to anchor rules |

## Tests

```
node --test                      # all 65
node --test scoring.test.mjs     # one file
```

| File | Tests |
|---|---|
| `scoring.test.mjs` | 11 |
| `admission.test.mjs` | 14 |
| `mapper.test.mjs` | 6 |
| `resolve.test.mjs` | 6 |
| `gate1Form.test.mjs` | 15 |
| `gate2.test.mjs` | 13 |

Seven tests skip automatically when the case files are absent, so a checkout
without `cases/` shows 58 passing and 7 skipped.

## Configuration

`weights.v0.1.json` and `mapping.rules.v1.1.json` are owned by the risk
function, not by engineering.

Changing either means a **new version file**, never an edit to one that has
already scored a case. Every result records the versions that produced it, so a
case re-renders under the rules in force at the time.

Weights must total 100 or the configuration refuses to load — a bad config
fails on deployment, not silently on a live case.

## Two rules to protect

**No model calls in `scoring.mjs` or `mapper.mjs`.** They are pure functions
over data. That is the claim the whole design rests on. The moment someone adds
"just ask the model to decide this edge case", the determinism tests stop
meaning anything.

**Never edit a test to match the output.** If a case fails and you believe the
expected answer is wrong, the whole team looks at it and the change goes in the
decision log with a reason.

## Test data

Everything under `cases/` is **synthetic**. No real respondent data is in this
repository, and none should be added.

`Gate1-Review-Form-COMPLETED.xlsx` in `cases/` is a worked example for testing.
It is not a real approval. Keep `forms/Gate1-Review-Form.xlsx` blank as the
master template.

## Open items

1. **An instrument gap.** Neither source form asks whether the respondent has
   presence in a comprehensively sanctioned jurisdiction. Every case stalls at
   that determination until a field is added.
2. **Gate 1 decisions are not versioned.** A corrected decision overwrites the
   earlier one. Gate 2 overrides supersede rather than overwrite, and Gate 1
   should match.
3. **No four-eyes rule.** One named reviewer can resolve every item and approve.
4. **Mapping coverage.** Eleven rules cover six factors; the CBDDQ has 132
   questions.
