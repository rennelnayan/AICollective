# Scoring engine architecture

Node 18 or newer. **Zero dependencies** — no `npm install`, no `package.json`.
The test runner is built into Node and `.xlsx` parsing uses `node:zlib`.

## What it does

Takes the exhaustive source register, the validation report and a signed Gate 1
decision, and produces a residual risk score, a band, and the approval level
required — or refuses, and says why.

Required by 31 CFR 1010.610(a), implementing Section 312 of the USA PATRIOT
Act.

## Modules

| Module | Responsibility | Pure |
|---|---|---|
| `mapper.mjs` | Source register plus rules to six factor anchors | yes |
| `gate1Form.mjs` | Reads and validates the signed review workbook | yes |
| `resolve.mjs` | Applies the human Gate 1 decision to the packet | yes |
| `admission.mjs` | Four statuses. May this case be scored at all | yes |
| `scoring.mjs` | Anchors to inherent to residual to band | yes |
| `gate2.mjs` | Assessment review: accept, override or remand | yes |
| `xlsxRead.mjs` | Minimal .xlsx reader, ZIP plus `node:zlib` | yes |
| `fullRun.mjs` | Orchestrates the above. The only entry point | no |

Every module except the runner is a pure function — no model call, no network,
no clock, no randomness. That is what makes the test suite meaningful: there is
no hidden state to arrange.

## The risk model

**Inherent risk.** Six factors, anchors of 0, 3, 6 or 10, weighted to total 100.

| ID | Factor | Weight |
|---|---|---|
| F1 | Jurisdiction and geographic footprint | 20 |
| F2 | Quality of supervision and regulatory standing | 15 |
| F3 | Ownership and control transparency | 20 |
| F4 | Physical presence and shell bank proximity | 10 |
| F5 | Products, services and delivery channels | 25 |
| F6 | Customer base and PEP exposure | 10 |

**Control effectiveness.** Four domains, each with an evidence tier. The four
multipliers multiply together.

| Tier | Multiplier |
|---|---|
| Independently evidenced | 0.65 |
| Partially evidenced | 0.82 |
| Self-asserted only | 0.94 |
| Absent or unanswered | 1.00 |

**The floor.** `residual = max(inherent x product, inherent x 0.20)`

Four domains at 0.65 gives 0.1785, below the floor. A respondent with a
flawless control submission still carries a fifth of its inherent risk. The
floor binds; it is not decorative.

**Bands.** Lower bounds inclusive: Low under 20, Moderate from 20, High from
40, Prohibited pending exception from 65.

## Behaviour that looks wrong and is not

**An unanswered question scores 10, not 0.** Silence is not evidence of
absence. A respondent who declines to answer must not score better than one who
answers badly.

**A missing anchor is not an unanswered question.** Unanswered means we asked
and got nothing, which scores the maximum. A missing anchor means the mapping
never evaluated the factor. Scoring that as 10 would turn a build defect into a
risk finding, so the engine refuses instead.

**An anchor of 7 throws rather than rounding to 6.** The written criteria decide
the anchor; the engine does not interpolate.

**Weights that do not total 100 fail at config load.** A bad configuration fails
on deployment, not silently on a live case.

**Rounding is half-up on the decimal digits.** JavaScript's `toFixed` returns
`2.67` for `2.675` because of binary float representation. A band boundary that
flips depending on which runtime executed it is indefensible in an audit trail.

## Hard exclusions sit outside scoring

A shell bank is refused under 31 CFR 1010.630, not scored as high risk.
Expressing that as a weight would imply good answers elsewhere could outscore
it.

Meanwhile the FFIEC BSA/AML manual warns that no single indicator should
determine a risk profile, so nothing inside the weighted model reaches the top
band alone.

Hard exclusions therefore run before scoring, as binary tests, determined from
provider-maintained lists rather than the respondent's own answers.

## Configuration

`weights.v0.1.json` and `mapping.rules.v1.1.json` are owned by the risk
function, not engineering. Changing either means a new version file, never an
edit to one that has already scored a case.

Each mapping rule carries a `basis` string naming its regulatory grounding. The
most adverse matching rule governs: publicly traded (anchor 0) with bearer
shares in issue (anchor 10) scores 10.

## Tests

65 across six files. Four worth citing:

| Test | Result |
|---|---|
| Determinism | One case, 500 runs, byte-identical |
| Rounding | `2.675` to `2.68` |
| The floor binds | 0.65⁴ = 0.1785, below the 0.20 floor |
| Partial decisions | Clearing some open items still refuses |

Mutation tests run against the real source register rather than a mock.

**Never edit a test to match the output.** A disputed expectation goes to the
team and into the decision log.
