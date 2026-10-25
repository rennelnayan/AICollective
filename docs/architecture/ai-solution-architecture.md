# AI solution architecture

## The division of labour

Three components, three different kinds of correctness, with human reviewers retaining every decision.

| Component | Kind | Owns |
|---|---|---|
| CG Intake Analyzer | Probabilistic | Meaning: what the documents say |
| Node.js Intake Validator | Deterministic | Integrity: whether the package holds together |
| Scoring Engine | Deterministic | Arithmetic: what the approved facts add up to |
| Human reviewers | Judgement | Every business decision |

The design rule that follows from this:

> **The language layer interprets and drafts. The deterministic layer validates and calculates. Humans decide.**

A language model is used where meaning is genuinely ambiguous and a human would also have to read and interpret. Everywhere else, code applies explicit, versioned rules and produces the same result from the same inputs.

## End-to-end flow

See `diagrams/end-to-end-workflow.mmd`.

```text
Two completed workbooks
        |
CG Intake Analyzer
        |  semantic artifacts and candidate indicators
        |  no official score or decision
        |
draft_gate1_package.md
        |  14 blocks assembled without semantic alteration
        |
Node.js Intake Validator
        |  exhaustive Source Register
        |  deterministic contract checks
        |
Gate 1 Evidence Integrity Review
        |  approves, corrects or returns the factual record
        |
Deterministic Scoring Engine
        |  admission checks, score and band
        |
Gate 2 Assessment Review
        |  accepts, overrides with reason or remands
        |
Gate 3 Committee Review
           required only for routed cases
```

Only Gate 1-approved facts may enter the Scoring Engine. A validator `PASS` makes the package reviewable; it does not make the facts approved.

## Why the boundaries are enforced rather than trusted

The CG Intake Analyzer is forbidden from scoring, approving, rejecting, authorizing scoring or claiming deterministic validation. Dedicated validator checks confirm that those prohibitions held.

This matters more than the prohibition itself. An agent instructed not to conclude will usually comply. An agent whose output is independently checked by a deterministic component has an enforceable boundary.

The Node.js Intake Validator can stop, block or return a package when its contract fails. It cannot approve or reject the business case.

## Human decision points

| Gate | Question | Record |
|---|---|---|
| Gate 1 | Do the facts match the documents and evidence? | Signed review record |
| Gate 2 | Is the deterministic assessment appropriate? | Assessment record with accept, override or remand |
| Gate 3 | Should the relationship proceed? | Committee decision record, not yet specified |

No pipeline component can generate a Gate 1, Gate 2 or Gate 3 decision.

## Status separation

A case carries separate technical and business states.

| Status | Owner | Meaning |
|---|---|---|
| Package contract validation | Node.js Intake Validator | Whether the package is structurally and referentially valid |
| Gate 1 review allowed | Node.js Intake Validator | Whether the package may be presented for human review |
| Business readiness | Human workflow and open exceptions | Whether blocking business issues remain |
| Scoring authorization | Human reviewer | Whether approved facts may enter scoring |

A package may be technically valid while business readiness remains blocked and scoring remains unauthorized.

## Vacuous passes

A check phrased “every X must Y” passes trivially when there are no X.

With zero candidate indicators, `APPROVED_MAPPING_RULE` passes over an empty set. This is how a complete contract-validation `PASS` can coexist with a blocking mapping gap.

Nothing is technically broken, but a green check over an empty set establishes no coverage. The Scoring Engine treats zero admitted indicators explicitly instead of interpreting the validator result as evidence of sufficient mapping.

## Versioning

Four versions travel with every case:

1. Agent configuration
2. Risk model
3. Mapping catalogue
4. Validator

Each result records the exact version set that produced it, allowing the case to be reconstructed under the rules in force at execution time.

A semantic change to the Agent output requires a new Run ID. A validator-only correction retains the immutable Agent Run ID and records a new validator execution and version.

## Related

- `intake-analyzer-architecture.md`
- `deterministic-intake-validator-architecture.md`
- `scoring-engine-architecture.md`
- `gate3-memo-creator-architecture.md` — stub
