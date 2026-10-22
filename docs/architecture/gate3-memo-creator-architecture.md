# Gate 3 Memo Creator architecture

> **STUB. Not yet designed.**

No architecture exists. See `ai/gate3-packet-agent/README.md` for the open
questions.

## Constraints any design will inherit

**It cannot recommend an outcome without a check on that boundary.** The intake
analyser is credible because a separate deterministic component verifies it did
not conclude. A memo creator that drafts a recommendation needs an equivalent,
or its output cannot be relied on in an audit.

**It receives a score it may not alter.** Whatever it drafts, the residual, the
band and the approval level are fixed inputs. The same rule the narrative step
follows.

**The committee decision is a record, not an output.** Gate 1 and Gate 2 both
produce a signed artifact that nothing in the pipeline can generate. Gate 3
needs the same, with whatever a committee signature means in practice.

## Related

- `ai-solution-architecture.md` — the division of labour this must fit
- `scoring-engine-architecture.md` — what Gate 3 would consume
