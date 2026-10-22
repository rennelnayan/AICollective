# Correspondent Gate — documentation

Correspondent banking respondent onboarding: a Microsoft 365 Copilot intake
agent, a deterministic Node.js validator, and a deterministic scoring engine,
with human decision authority preserved at every gate.

## Operating principle

> Copilot creates semantic and human-review artifacts.
> Node.js creates the exhaustive Source Register, validates the package, and
> scores the case.
> **A PASS proves package-contract integrity. It does not approve Gate 1 or
> authorise scoring.**

## Where to start

| You are | Read |
|---|---|
| New to the system | `docs/architecture/ai-solution-architecture.md` |
| Running a case | `docs/runbooks/workflow-execution-guide.md` |
| Changing the agent | `ai/intake-analyzer/README.md` |
| Changing weights or mapping rules | `docs/architecture/scoring-engine-architecture.md` |
| Reviewing a case | `docs/governance/human-decision-authority.md` |

## Layout

```
ai/                  agent configurations and their instructions
docs/requirements/   what each component must do, and the contracts between them
docs/architecture/   how each component is built, plus diagrams
docs/governance/     decision authority, data handling, decision log
docs/runbooks/       step-by-step execution procedures
```

## Status

| Component | Documentation |
|---|---|
| Intake Analyzer (Copilot) | Complete |
| Node.js Validator | Complete |
| Scoring Engine | Complete |
| Gate 3 Packet Agent | **Stub — not yet specified** |
| Gate 3 Memo Creator | **Stub — not yet specified** |

Files marked stub carry a header saying so. Do not treat them as specifications.

## Data classification

Synthetic or approved sanitised data only. No real respondent data appears in
this repository, and none should be added.
