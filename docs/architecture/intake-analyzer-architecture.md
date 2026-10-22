# Intake Analyzer architecture

Microsoft 365 Copilot, Configuration 7.

## Why three batches

Eight files in one upload produces unreliable registration. Batching, with a
confirmation after each, makes an incomplete reference pack visible before any
analysis runs rather than after.

Each batch returns only a status and a file list. No analysis happens until
preflight passes.

| Batch | Contents | Confirms |
|---|---|---|
| 1 | Two field dictionaries, semantic output schema | Extraction contracts |
| 2 | Risk model, mapping catalogue, packet schema | Authority and versions |
| 3 | Two completed case workbooks | The case, and ID match |

## Why preflight is separate

Preflight re-inventories everything already registered and returns one of six
statuses. It exists because a batch confirming receipt is not the same as the
full pack being coherent — the ID match across workbooks, the absence of
obsolete schema files, and the sheet presence checks all need the whole set in
view.

`READY_FOR_INTAKE_ANALYSIS` is the only status that permits analysis.

## Why the output is split into two parts

Part 1 is semantic interpretation. Part 2 is packaging.

Splitting them means the interpretation can be inspected before it is packaged,
and the packaging step can be constrained to alter nothing. The assembly prompt
says explicitly: do not re-read the workbooks, do not change facts, IDs, values,
mappings, evidence statuses, exceptions, counts or conclusions.

A single-pass agent that interprets and packages together gives no point at
which the interpretation can be checked in isolation.

## Why the agent does not own canonical IDs

The agent never creates `SOURCE_REGISTER_JSON`. The validator parses both
workbooks exhaustively and assigns canonical `source_record_id` values.

If the agent assigned them, a traceability claim would rest on the component
whose output is being traced. Separating the two means the register is
independent evidence.

## The exception mechanism

Where the agent cannot resolve something — a mapping gap, missing evidence, an
unreadable field — it raises an exception rather than inferring a value.

A blocking exception stops the case regardless of how much else passed. This is
what lets the agent be useful without being trusted: it is permitted to say "I
cannot do this", and that answer is treated as a real result.

## Failure discipline

A failed run is preserved. Generated JSON is never hand-edited to create a
pass. For a semantic change, the Run ID changes; for a validator-only
correction against the same immutable response, it does not.
