# Gate 3 Packet Agent — requirements

> **STUB. Not yet specified.**

No requirements exist for this component. The four open questions are in
`ai/gate3-packet-agent/README.md`.

## What a specification will need to cover

By analogy with the intake analyser, at minimum:

- Inputs, and whether any are controlled reference files
- Outputs, in a fixed order, with a schema
- Prohibitions, each one checkable by a deterministic component
- Error states that halt the run
- Where the human decision sits, and what records it
- Acceptance criteria

The prohibitions matter most. The intake analyser is credible because what it
is forbidden to do is verified by something other than itself. A Gate 3 agent
that drafts a committee memo needs an equivalent check, or its output cannot be
relied on.
