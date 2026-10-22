# CG Intake Analyzer — instructions

> **PLACEHOLDER.** The live Configuration 7 instruction text is not in this
> repository. Paste it here verbatim from the agent configuration, then delete
> this notice.

## Why this file matters

The agent's instruction text is the only specification of what it does. Without
it in version control:

- a behaviour change cannot be traced to an instruction change
- a failed run cannot be reproduced
- no one can review what the agent was told

## What to paste

The complete Configuration 7 instruction text, unedited. Do not summarise it,
and do not paraphrase the constraints — the exact wording is what produced the
artifacts in the evidence trail.

## Convention

One file per configuration version, named `instructions-vX.Y.Z.md`. Keep the
previous version rather than overwriting it. Record which version produced each
run in the artifact run header.
