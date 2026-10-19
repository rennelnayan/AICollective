# Gate 1 Review Renderer v1.1.0

Renders the machine-readable Draft Gate 1 Packet and deterministic validation report into one human-readable HTML review packet.

## Status model

- **Package Contract Validation** uses the current Node.js validation report.
- **Gate 1 Review Allowed** uses `gate_1_review_allowed` from the validation report.
- **Business Readiness** is blocked when deterministic validation fails or the packet contains blocking business exceptions.
- **Scoring Status** remains `NOT_AUTHORIZED` while business readiness is blocked.
- The Copilot packet's original `NOT_EXECUTED` value is displayed only as historical pre-validation metadata.

## Run

```powershell
node ".\src\render-gate1-packet.js"
```

Default inputs:

```text
validation-output/draft-gate1-packet.json
validation-output/deterministic-validation-report.json
```

Default output:

```text
validation-output/gate1-review-packet.html
```
