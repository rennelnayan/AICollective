# Human decision authority

## The rule

> No component in this system can approve anything.
> The system refuses on its own. It cannot approve on its own.

This is structural, not a policy statement. There is no code path that produces
a Gate 1 or Gate 2 decision. Each one is read from an artifact a named human
created and signed.

**If a change introduces a component that can generate a decision record, this
claim is void.** Treat that as a blocking review comment.

## What each party may decide

| Decision | Copilot | Node.js | Human |
|---|---|---|---|
| What the documents mean | Owner | Validate | Review |
| Canonical source IDs | No | Owner | Inspect |
| Package integrity | No | Owner | Review |
| Resolve a blocking exception | Identify | Report | **Owner** |
| Hard exclusion determination | No | Apply | **Owner** |
| Approve Gate 1 | No | No | **Owner** |
| Authorise scoring | No | No | **Owner** |
| Accept or override an assessment | No | No | **Owner** |

## The four statuses

A PASS on package validation is not an approval. Keeping these separate is what
prevents a green technical result reading as a business one.

| Status | Owner |
|---|---|
| Package Contract Validation | Validator |
| Gate 1 Review Allowed | Validator |
| Business Readiness | Packet logic |
| Scoring Authorisation | **Human only** |

A package can be contract-valid and still unscoreable. That is the normal case.

## Gate 1 — extraction review

**Question: do the facts match the documents?**

Placed immediately after extraction, because extraction is the only step that
creates information. A wrong fact caught here costs a correction; caught at the
end it has already produced a confident, well-cited, wrong memo.

The decision is recorded in `Gate1-Review-Form-COMPLETED.xlsx`. Reviewer
identity and role are captured **per resolution** — a sanctions determination
and an evidence review are usually made by different people in different roles.

The engine reads the signed workbook directly. There is no intermediate file
anyone can edit between the signature and the score.

### What is refused

A placeholder name. A decision for the wrong case. `UNKNOWN` as a hard
exclusion resolution — that is the state being resolved. A resolution with no
rationale. A hard exclusion with no determination source. A form that does not
account for every open item in the packet, naming the ones it missed.

## Gate 2 — assessment review

**Question: is the assessment right?** The facts are settled by this point.

| Remedy | When | Effect |
|---|---|---|
| Accept | The assessment stands | Band becomes effective |
| Override | Facts right, conclusion wrong | New band, machine output preserved |
| Remand | A fact is wrong | **No band at all.** Returns to Gate 1 |

A remand is not an override. It is a Gate 1 failure that slipped through, and
the fix is to correct the extraction or mapping rule and re-score. A system with
only one button teaches reviewers to override their way out of mapping bugs,
and the recurring defect is never seen.

An override supersedes; it never overwrites. The machine output stays in the
record alongside the human one, because an examiner needs both.

An override requires a category from a fixed list and a rationale of at least
50 characters. An override that cannot be explained cannot be defended.

## Hard exclusions

Determined from **provider-maintained lists**, never from what the respondent
said about itself. You do not let the party being assessed tell you whether it
triggers an exclusion.

A triggered hard exclusion refuses the relationship and the case is not scored.
Under 31 CFR 1010.610(d) the next steps are refusing to open, suspending
activity, considering a SAR, or closing.

## Feedback loop

Override rate by factor is the strongest operational signal available. A factor
overridden in a quarter or more of cases is not being overridden because
reviewers are wrong — it is a broken factor, or a weight that needs tuning.

Report it alongside remand rate, which indicates an extraction or mapping defect
rather than a model problem.

## Open items

1. **No four-eyes rule.** One named reviewer can resolve every item and approve.
   Whether a second signature is required for triggered determinations or
   waived resolutions is a policy question.
2. **Gate 1 decisions are not versioned.** A correction overwrites the earlier
   decision. Gate 2 overrides supersede rather than overwrite; Gate 1 should
   match.
3. **No decision expiry.** A decision made months before scoring is treated the
   same as one made today.
4. **Gate 3 is unspecified.** Committee authority, record and signature are all
   undefined.
