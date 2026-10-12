# Correspondent Gate - scoring engine (Node)

Deterministic risk scoring for correspondent banking respondent onboarding.
No model calls, no network, no clock. Same input plus same config version
always produces the same output.

**Zero dependencies.** Node 18 or newer. No `npm install`, no `package.json`.

## Setup

Put every file in one folder, flat. Case files needed beside the code:

    draft-gate1-packet.json
    deterministic-validation-report.json
    exhaustive-source-register.json

The two synthetic .xlsx workbooks are not read by the engine - the exhaustive
source register already carries every field from both of them.

## Run

    node mapper.mjs     # register -> factor anchors
    node fullRun.mjs    # mapping -> admission -> would-be score
    node --test         # 31 tests

## Expected output

`mapper.mjs` - 201 register records, mapping version 1.1.0, no unmapped
factors, six anchors each with a cell reference.

`fullRun.mjs` - contract validation PASS, Gate 1 review ALLOWED, business
readiness BLOCKED_BY_OPEN_ITEMS, scoring NOT_AUTHORISED, three blockers, and
a would-be residual of 12.88 in band Low. Writes `scoring_output.json`.

`node --test` - 31 pass.

The refusal is the correct outcome. Case HP-002 is structurally valid but not
scoreable: EXC-0002 is open, HEX-0003 is UNKNOWN, and no human has recorded a
Gate 1 decision.

## Files

| File | What it is |
|---|---|
| scoring.mjs | The engine. Weighted anchors, control multipliers, floor, bands. |
| admission.mjs | Four-status gate. Decides whether a case may be scored at all. |
| mapper.mjs | Turns the exhaustive source register into factor anchors. |
| weights.v0.1.json | Factor weights, multipliers, floor, bands. Risk Owner edits this. |
| mapping.rules.v1.1.json | Field ID to anchor rules. Closes EXC-0001. |
| fullRun.mjs | End to end runner. |
| *.test.mjs | Tests, using the Node built-in runner. |

## Why rounding has its own function

`roundHalfUp` works on the decimal digits rather than using `toFixed`, which is
unreliable at ties because of binary float representation. A band boundary that
flips depending on where it ran is indefensible in an audit trail. The function
matches Python's `Decimal(str(x)).quantize(..., ROUND_HALF_UP)` exactly, and
there is a test for it.

## Two rules to protect

**No model calls in scoring.mjs or mapper.mjs.** They are pure functions over
data. That is the claim the whole design rests on. The moment someone adds
"just ask the model to decide this edge case", the determinism tests stop
meaning anything.

**Config is not code.** Weights and mapping rules live in JSON so the Risk
Owner can change them without an engineer. Every change gets a new version and
a justification, and every score records the version that produced it.

## Open decisions for the team

1. **HEX-0003.** Nothing in either workbook determines whether the respondent
   has physical presence in a comprehensively sanctioned jurisdiction. Add a
   field to the scoping form or record it as a screening output.

2. **Control evidence tier.** All four domains sit at self-asserted because
   S34 reads PENDING_HUMAN_REVIEW. If a human-reviewed respondent policy should
   earn "Partially evidenced", change one line in `mapping.rules.v1.1.json`.
   Residual moves from 12.88 to about 8.3.
