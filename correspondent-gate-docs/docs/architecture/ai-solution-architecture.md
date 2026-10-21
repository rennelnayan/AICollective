# AI solution architecture

## The division of labour

Three components, three different kinds of correctness.

| Component | Kind | Owns |
|---|---|---|
| CG Intake Analyzer | Probabilistic | Meaning. What the documents say |
| Node.js Validator | Deterministic | Integrity. Whether the package holds together |
| Scoring Engine | Deterministic | Arithmetic. What the facts add up to |
| Human reviewers | Judgement | Every decision |

The design rule that follows from this:

> **The language layer reads and writes. The deterministic layer decides.**

A language model is used where meaning is genuinely ambiguous and a human would
also have to read and interpret. Everywhere else the work is done by code that
produces the same answer every time.

## End-to-end flow

See `diagrams/end-to-end-workflow.mmd`.

```
Two completed workbooks
        |
   Intake Analyzer (Copilot)          semantic artifacts, no conclusions
        |
   draft_gate1_package.md             14 blocks, assembled unaltered
        |
   Node.js Validator                  Source Register + 17 contract checks
        |
   Scoring Engine                     admission -> score -> band
        |
   Gate 1 and Gate 2 human review     the only place a decision is made
```

## Why the boundaries are enforced rather than trusted

The intake analyser is forbidden from scoring, approving or claiming
validation. Four of the validator's seventeen checks exist only to confirm
those prohibitions held.

This matters more than the prohibition itself. An agent told not to conclude
will usually comply. An agent whose compliance is checked by a separate
deterministic component can be relied on.

## Human decision points

| Gate | Question | Record |
|---|---|---|
| Gate 1 | Do the facts match the documents? | Signed review workbook |
| Gate 2 | Is the assessment right? | Assessment record with accept, override or remand |
| Gate 3 | Should we open the account? | Committee — **not yet specified** |

No component in the pipeline can generate a Gate 1 or Gate 2 decision. The
system refuses on its own; it cannot approve on its own.

## Vacuous passes

A check phrased "every X must Y" passes trivially when there are no X. With
zero candidate indicators, `APPROVED_MAPPING_RULE` passes over an empty set —
which is how a 17 of 17 PASS can sit beside a blocking mapping gap.

Nothing is broken, but a green check over an empty set establishes nothing. The
scoring engine flags this case explicitly rather than reading it as coverage.

## Versioning

Four versions travel with every case: agent configuration, risk model, mapping
catalogue and validator. Each result records the set that produced it, so a
case re-renders under the rules in force at the time.

A semantic change to agent output requires a new Run ID. A validator-only
correction keeps it.

## Related

- `intake-analyzer-architecture.md`
- `scoring-engine-architecture.md`
- `gate3-memo-creator-architecture.md` — stub
