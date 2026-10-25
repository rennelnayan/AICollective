# Hackathon Test Evaluation Notes

## Correspondent Gate Risk Assessment Workbench

**Test case:** `CG-CASE-HP-002`  
**Test run:** `CG-RUN-HP-002`  
**Evaluation type:** End-to-end synthetic high-band happy path with negative-path, contract, integration, correction, and recovery testing  
**Final workflow state:** `DRAFT_PENDING_GATE3_HUMAN_DECISION`  
**Final Gate 3 admission state:** `ADMITTED FOR GATE 3 MEMO DRAFTING`  
**Document classification:** Synthetic QA evidence only. Not for operational risk decisions.

---

## 1. Executive Summary

This evaluation tested the hackathon solution as an integrated workflow rather than as a single scoring demonstration. The test exercised source-document preparation, evidence-state reconciliation, Gate 1 packet extraction, Gate 1 decision application, admission controls, deterministic scoring, Gate 2 review, Gate 3 admission, and Gate 3 memo generation.

The evaluation intentionally included failure and recovery paths. The system was observed blocking progression for valid reasons, including:

- Unreconciled or incomplete upstream evidence states.
- Mapping-version conflicts.
- Null or incomplete Gate 1 decision arrays.
- A PowerShell-to-Node.js collection-contract mismatch.
- Unresolved hard exclusions.
- A Gate 1 JSON structure that was syntactically valid but incompatible with the runtime resolver contract.

The defects were investigated using source inspection, PowerShell searches, runtime logs, JSON inspection, and repeated Node.js executions. Corrections were made at the appropriate producer or decision-contract boundary, followed by regression runs.

The final run demonstrated:

- Package contract validation: `PASS`.
- Gate 1 review: `ALLOWED`.
- Business readiness: `READY`.
- Scoring authorization: `AUTHORISED`.
- Scoring status: `OFFICIAL`.
- Open blockers: none.
- Inherent score: `64.00`.
- Combined control multiplier: `0.7807`.
- Residual score: `49.97`.
- Risk band: `High`.
- Required approval: `Committee at Gate 3`.
- Gate 2 disposition: `APPROVE_FOR_GATE_3`.
- Gate 3 admission: `ADMITTED FOR GATE 3 MEMO DRAFTING`.
- Gate 3 decision: deliberately left blank for human committee action.

The test therefore demonstrated both fail-closed controls and successful recovery into the intended happy path.

---

## 2. Test Objective

The primary objective was to prove that the hackathon solution could process a synthetic elevated-risk correspondent-banking case through this lifecycle:

```text
CBDDQ intake
  -> Relationship scoping
  -> Draft Gate 1 packet extraction
  -> Gate 1 decision application
  -> Admission controls
  -> Deterministic scoring
  -> Gate 2 review
  -> Gate 3 memo admission
  -> Blank human committee decision form
```

### Success criteria

1. Case and run identifiers remain consistent across artifacts.
2. Invalid or incomplete source states prevent approval.
3. Gate 1 hard exclusions cannot remain `UNKNOWN` when scoring is authorized.
4. Gate 1 resolutions must be traceable to a named reviewer and determination source.
5. Scoring must remain unauthorized while blockers exist.
6. Authorized scoring must produce a deterministic and reproducible result.
7. Gate 2 must independently check scoring and traceability rather than merely copy the score.
8. A High-band case must route to Gate 3 committee review.
9. Gate 3 memo generation must not prepopulate or claim a committee decision.
10. Synthetic QA evidence must not be represented as operational verification or a real approval.

---

## 3. System Under Test

### Core components

| Component | Purpose |
|---|---|
| `CG_CBDDQ_Synthetic_HP-002.xlsx` | Respondent intake, answers, evidence references, evidence register, manifest |
| `CG_Relationship-Scoping_Synthetic_HP-002.xlsx` | Relationship scope, activity, restrictions, screening, evidence state |
| `input/draft_gate1_package.md` | Markdown source containing the draft Gate 1 packet JSON |
| `extract-gate1-packet.ps1` | Extracts and validates the draft Gate 1 packet |
| `validation-output/draft-gate1-packet.json` | Machine-readable packet consumed by the scoring workflow |
| `gate1-decision.json` | Human Gate 1 decision and resolutions |
| `resolve.mjs` | Applies exception and hard-exclusion resolutions |
| `admission.mjs` | Evaluates contract, readiness, blockers, and authorization |
| `fullRun.mjs` | Orchestrates resolution, admission, scoring, and output |
| `scoring_output.json` | Official scoring result and Gate 1 trace |
| `CG_GAT~3.XLS` | Gate 2 review and disposition |
| `Gate3_Review_Packet_CG-CASE-HP-002 1.html` | Gate 3 memo and blank human decision form |

### Key versions observed

| Item | Version |
|---|---|
| CBDDQ schema | `1.1.0` |
| Relationship-scoping schema | `1.1.0` |
| Mapping | `1.1.0` |
| Risk model | `v0.1` in scoring output; `0.1` displayed in intake files |
| Scoring config | `v0.1` |
| Validator | `1.0.2` |
| Gate 1 decision schema | `1.0.0` |
| Scoring-result schema | `1.0.0` |

---

## 4. Test Data and Scenario

### Identity

- Case ID: `CG-CASE-HP-002`
- Run ID: `CG-RUN-HP-002`
- Gate 1 decision ID: `GATE1-HP-002-001`
- Gate 2 review ID: `G2-HP-002-002`

### Synthetic respondent

- Legal name: Meridian Frontier Commercial Bank plc.
- Jurisdiction: Republic of Meridian, explicitly synthetic.
- Proposed relationship: multi-currency correspondent clearing.
- Expected monthly count: `18,000` transactions.
- Expected monthly value: `4,200,000,000`.
- Products included elevated-risk services such as cross-border payments and virtual-asset settlement.
- Restrictions recorded: nesting, payable-through access, direct system access, and downstream use prohibited.

### Synthetic evidence package

- EV-001 through EV-014: respondent-side evidence.
- EV-015: provider internal screening result.
- EV-016: provider relationship approval rationale.
- Evidence was marked reviewed for synthetic QA only.
- Operational reliance remained prohibited.

---

## 5. Test Approach

The evaluation followed this lifecycle:

```text
DISCOVER -> DEFINE -> BUILD -> TEST -> FAIL -> DIAGNOSE -> CORRECT -> RETEST -> VERIFY
```

### Test categories exercised

- Positive-path testing.
- Negative-path testing.
- Data-contract testing.
- Collection and serialization testing.
- Source-to-output traceability testing.
- Integration testing across PowerShell, JSON, Excel, Node.js, and HTML.
- Recovery and rerun testing.
- Human-decision boundary testing.
- Audit-trail inspection.
- Fail-closed control testing.

---

## 6. Chronological Audit Trail

> Times below are recorded only where they appeared in file output, validator output, or runtime provenance. Conversation actions without an explicit timestamp are listed in sequence rather than assigned an invented time.

### 6.1 Initial source and Gate 2 review

**Action:** Reviewed the initial scoring result and synthetic Gate 2 record.

**Observed conditions:**

- High-band scoring result existed.
- Gate 3 committee approval was required.
- Upstream evidence files were not yet reconciled.
- Gate 1 approved and excluded indicator arrays were not confirmed.
- Evidence-review state was incomplete or pending.

**Expected behavior:** Gate 2 must not create an approval solely because a High score exists.

**Result:** Gate 2 retained a correction-required or conditional state.

**Evaluation:** PASS. The design failed closed.

### 6.2 First upstream reconciliation

**Action:** Reconciled CBDDQ and relationship-scoping files against the scoring output.

**Issues found:**

- Case/run identity matched.
- Mapping-version mismatch existed.
- Evidence attachments were marked `NOT_PROVIDED`.
- Review status was `PENDING_HUMAN_REVIEW`.
- Relationship-scoping evidence package was incomplete.
- Gate 1 indicator arrays were null.

**Expected behavior:** Return for correction.

**Result:** Gate 2 disposition remained `RETURN_FOR_CORRECTION`.

**Evaluation:** PASS.

### 6.3 Corrected upstream forms

**Action:** Reconciled corrected versions of the CBDDQ and relationship-scoping workbooks.

**Correction verified:** Mapping version aligned to `1.1.0`.

**Remaining issues:**

- `NOT_PROVIDED` statuses.
- `PENDING_HUMAN_REVIEW` statuses.
- Incomplete evidence package.
- Null Gate 1 arrays.

**Result:** Version blocker removed; evidence and Gate 1 blockers retained.

**Evaluation:** PASS. The workflow distinguished resolved and unresolved controls.

### 6.4 Synthetic happy-path evidence preparation

**Action:** Updated the upstream test fixtures to represent a synthetic evidence-provided-and-reviewed scenario.

**Key CBDDQ changes:**

- Row-level evidence state set to `PROVIDED`.
- Row-level review state set to `VERIFIED_FOR_SYNTHETIC_QA`.
- EV-001 through EV-014 recorded as provided and reviewed.
- Evidence Register and Submission Manifest aligned.

**Key relationship-scoping changes:**

- `S32 = YES`.
- `S33 = COMPLETE_EVIDENCE_PACKAGE`.
- `S34 = VERIFIED_FOR_SYNTHETIC_QA`.
- `S40 = YES`, correcting a prior yes/no type mismatch.
- `S52 = APPROVED_FOR_SCORING`.
- EV-001 through EV-016 recorded as provided and reviewed.

**Boundary retained:** Synthetic QA review did not equal operational independent verification.

**Evaluation:** PASS.

### 6.5 Gate 1 template and runtime artifact discovery

**Action:** Generated a Gate 1 Excel form and JSON based on the supplied template.

**Runtime discovery:** `fullRun.mjs` read `./gate1-decision.json`; it did not use the Excel workbook during the tested run.

**Evidence:** Source inspection showed:

```js
const DECISION = "./gate1-decision.json";
if (existsSync(DECISION)) {
  const { resolved, applied } = applyGate1Decision(packet, readJson(DECISION));
  packet = resolved;
}
```

**Evaluation:** This was an integration finding. Documentation/template assumptions were replaced by the actual runtime contract.

### 6.6 Defect 1: non-iterable hard-exclusion collection

**Command executed:**

```powershell
node fullRun.mjs
```

**Observed error:**

```text
TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
    at applyGate1Decision (.../resolve.mjs:38:29)
    at .../fullRun.mjs:36:33
Node.js v24.22.1
```

**Failing code:**

```js
for (const hx of resolved.hard_exclusion_candidates ?? []) {
```

**Diagnostic search:**

```powershell
Get-ChildItem -Recurse -File |
  Select-String -Pattern 'hard_exclusion_candidates'
```

**Finding:**

- `resolve.mjs` and `admission.mjs` treated `hard_exclusion_candidates` as an array.
- Tests also used an array.
- `draft-gate1-packet.json` contained a wrapper object beginning with schema `HARD_EXCLUSION_CANDIDATES`.

**Root cause:** Producer/consumer contract mismatch.

```text
Extractor output: wrapper object
Node consumers: iterable array
```

### 6.7 Extractor review and correction

**Script reviewed:** `extract-gate1-packet.ps1`.

**Original behavior:**

1. Read `./input/draft_gate1_package.md`.
2. Find the `DRAFT_GATE1_PACKET` heading.
3. Extract fenced or bare JSON.
4. Parse with `ConvertFrom-Json`.
5. Validate only top-level identity fields.
6. Reserialize without normalizing `hard_exclusion_candidates`.

**Original default output:**

```text
./validation-output/draft-gate1-packet.json
```

**Correction implemented:** New extractor normalized the explicit wrapped `candidates[]` collection into a flat array and added fail-closed validation.

**New checks included:**

- Missing hard-exclusion property.
- Null property.
- Unexpected wrapper schema.
- Missing `candidates` collection.
- Non-array candidate collection.
- Post-write JSON verification.
- Output candidate count and runtime type.

**Generated script timestamp:** `2026-10-25T19:00:35.020286Z` was recorded on the generated `extract-gate1-packet.ps1` artifact.

**Retest result:** The Node.js iterable error no longer occurred.

**Evaluation:** PASS.

### 6.8 Admission after extractor correction

**Observed admission output:**

```text
Package contract validation : PASS
Gate 1 review allowed       : ALLOWED
Business readiness          : BLOCKED_BY_OPEN_ITEMS
Scoring authorisation       : NOT_AUTHORISED
```

**Validation provenance:**

```text
validator_version: 1.0.2
validation_executed_on: 2026-10-25T19:03:53.602Z
validation_result: PASS
packet_status_at_generation: DRAFT_PENDING_DETERMINISTIC_VALIDATION
```

**Blockers:**

```text
1. [HARD_EXCLUSION_UNRESOLVED] source: HEX-0002
   DOWNSTREAM_SHELL_BANK_EXPOSURE remained UNKNOWN.

2. [HARD_EXCLUSION_UNRESOLVED] source: HEX-0003
   COMPREHENSIVELY_SANCTIONED_PRESENCE remained UNKNOWN.
```

**Evaluation:** PASS. The technical issue was fixed, revealing legitimate business blockers.

### 6.9 Initial Gate 1 decision resolution attempt

**Initial JSON approach:** Nested hard-exclusion resolutions under:

```json
{
  "gate_1_resolutions": {
    "hard_exclusion_resolutions": []
  }
}
```

**Observed behavior:** The engine printed that the Gate 1 decision was applied, but both candidates remained `UNKNOWN`.

**Evaluation:** FAIL. The JSON did not match the runtime resolver contract.

### 6.10 Resolver contract inspection

**Command executed:**

```powershell
Select-String `
  -Path .\resolve.mjs `
  -Pattern 'hard_exclusion_resolutions|hard_exclusion_id|\.status|\.resolution' `
  -Context 5,10
```

**Runtime contract found:**

```js
const hexResolutions = new Map(
  (decision.hard_exclusion_resolutions ?? []).map((r) =>
    [r.hard_exclusion_candidate_id, r]
  )
);

const r = hexResolutions.get(hx.hard_exclusion_candidate_id);

if (!["NOT_TRIGGERED", "TRIGGERED"].includes(r.status)) {
  // fail
}

if (!r.determination_source) {
  // fail
}

hx.status = r.status;
hx.resolution = r;
```

**Confirmed required fields:**

- Top-level `hard_exclusion_resolutions`.
- `hard_exclusion_candidate_id`.
- `status`.
- `resolved_by`.
- `determination_source`.

**Evaluation:** PASS. Runtime contract was determined directly from source.

### 6.11 Corrected Gate 1 decision JSON

**Correction:** Generated a new `gate1-decision.json` with top-level resolution arrays.

**Applied resolutions:**

```text
HEX-0002 -> NOT_TRIGGERED by R. Nayan
HEX-0003 -> NOT_TRIGGERED by R. Nayan
```

**Generated artifact timestamp:** `2026-10-25T19:19:22.459481Z` was recorded for the corrected `gate1-decision.json` artifact.

**Secondary consistency assertions performed:**

- Schema name equals `GATE1_DECISION`.
- Gate 1 status equals `APPROVED_FOR_SCORING`.
- Hard-exclusion resolutions are an array.
- Exactly two resolutions exist.
- IDs exactly match `HEX-0002` and `HEX-0003`.
- Both statuses equal `NOT_TRIGGERED`.
- Reviewer and determination source are present.
- Obsolete nested `gate_1_resolutions` wrapper is absent.

**Evaluation:** PASS.

### 6.12 Final Node.js scoring run

**Command executed:**

```powershell
node fullrun.mjs
```

**Observed Gate 1 log:**

```text
Gate 1 decision applied:
  - HEX-0002 -> NOT_TRIGGERED by R. Nayan
  - HEX-0003 -> NOT_TRIGGERED by R. Nayan
  - Gate 1 APPROVED_FOR_SCORING by Financial Crime Analyst
```

**Observed admission result:**

```text
Package contract validation : PASS
Gate 1 review allowed       : ALLOWED
Business readiness          : READY
Scoring authorisation       : AUTHORISED
```

**Observed scoring header:**

```text
SCORING RESULT - AUTHORISED
```

**Output:**

```text
Written: scoring_output.json
```

**Evaluation:** PASS.

### 6.13 Gate 2 admission to Gate 3

**Gate 2 result:**

```text
Disposition                 : APPROVE_FOR_GATE_3
Gate 3 escalation required : YES
Admission reason            : HIGH_BAND_COMMITTEE_REVIEW_REQUIRED
Review status               : APPROVED_FOR_GATE_3_COMMITTEE
```

**Evaluation:** PASS.

### 6.14 Gate 3 review packet

**Observed admission state:**

```text
GATE3_ADMISSION_RESULT
ADMITTED FOR GATE 3 MEMO DRAFTING
```

**Memo quality self-check:** `PASS`.

**Final packet state:**

```text
DRAFT_PENDING_GATE3_HUMAN_DECISION
```

**Decision-control verification:**

- Gate 3 human decision fields blank on load.
- Override default only: `NOT_APPLICABLE`.
- No save action.
- No submit action.
- No local storage.
- No backend.
- No network call.
- Demo warning visible and printable.
- No committee decision claimed.

**Evaluation:** PASS.

---

## 7. Detailed Test Cases

### TC-01: Reject incomplete evidence state

**Type:** Negative / business rule  
**Input:** Upstream files containing `NOT_PROVIDED`, `PENDING_HUMAN_REVIEW`, and incomplete evidence state.  
**Expected:** Gate 2 does not approve Gate 3 admission.  
**Observed:** `RETURN_FOR_CORRECTION`.  
**Result:** PASS.

### TC-02: Detect mapping-version mismatch

**Type:** Negative / configuration integrity  
**Input:** Scoring and upstream artifacts with different mapping versions.  
**Expected:** Reconciliation blocker.  
**Observed:** Mapping conflict surfaced and retained until corrected.  
**Result:** PASS.

### TC-03: Preserve case/run identity

**Type:** Data integrity  
**Input:** All registered artifacts.  
**Expected:** `CG-CASE-HP-002` and `CG-RUN-HP-002` align.  
**Observed:** Identity matched across scoring, Gate 2, CBDDQ, and scoping.  
**Result:** PASS.

### TC-04: Validate extractor input source

**Type:** Integration / source trace  
**Input:** `input/draft_gate1_package.md`.  
**Expected:** Extract `DRAFT_GATE1_PACKET` fenced or bare JSON.  
**Observed:** Original extractor successfully located and reserialized the packet.  
**Result:** PASS with contract-gap defect identified.

### TC-05: Handle non-iterable hard-exclusion wrapper

**Type:** Negative / contract / runtime  
**Input:** Wrapper object supplied where an array was expected.  
**Expected:** Clear contract failure or normalization.  
**Initial observed:** Node `TypeError: object is not iterable`.  
**Corrected observed:** Extractor normalized and verified the array.  
**Result:** PASS after defect correction.

### TC-06: Reject unresolved hard exclusions

**Type:** Negative / compliance control  
**Input:** `HEX-0002` and `HEX-0003` with status `UNKNOWN`.  
**Expected:** Business readiness blocked and scoring unauthorized.  
**Observed:** Two `HARD_EXCLUSION_UNRESOLVED` blockers.  
**Result:** PASS.

### TC-07: Ignore structurally incompatible decision resolution path

**Type:** Negative / integration contract  
**Input:** Resolutions nested under `gate_1_resolutions`.  
**Expected from actual runtime:** No matching top-level resolutions.  
**Observed:** Decision loaded, but candidates remained `UNKNOWN`.  
**Result:** PASS as a defect-detection test; decision artifact failed functional expectation.

### TC-08: Apply top-level hard-exclusion resolutions

**Type:** Positive / recovery  
**Input:** Correct top-level `hard_exclusion_resolutions`.  
**Expected:** Both candidate statuses changed to `NOT_TRIGGERED`.  
**Observed:** Both resolutions listed in the execution log.  
**Result:** PASS.

### TC-09: Require named resolver

**Type:** Audit / decision accountability  
**Input:** `resolved_by = R. Nayan`.  
**Expected:** Non-placeholder reviewer accepted.  
**Observed:** Resolution log included the reviewer.  
**Result:** PASS.

### TC-10: Require determination source

**Type:** Audit / compliance  
**Input:** Determination sources for both exclusions.  
**Expected:** Resolver accepts only nonblank source.  
**Observed:** Both resolutions applied.  
**Result:** PASS.

### TC-11: Authorize scoring only when ready

**Type:** Admission control  
**Input:** Contract pass, Gate 1 allowed, both exclusions resolved, no blockers.  
**Expected:** `READY` and `AUTHORISED`.  
**Observed:** Exact expected states.  
**Result:** PASS.

### TC-12: Deterministic inherent-risk calculation

**Type:** Functional / arithmetic  
**Expected:** Factor contributions sum to `64.00`.  
**Observed:** `12 + 15 + 6 + 0 + 25 + 6 = 64`.  
**Result:** PASS.

### TC-13: Deterministic control-multiplier calculation

**Type:** Functional / arithmetic  
**Expected:** Four `0.94` multipliers combine to approximately `0.7807`.  
**Observed:** `0.7807`.  
**Result:** PASS.

### TC-14: Residual and floor calculation

**Type:** Functional / arithmetic  
**Expected:**

```text
64.00 × 0.7807 = 49.97
Floor = 12.80
Floor not applied
Residual = 49.97
```

**Observed:** Exact expected values.  
**Result:** PASS.

### TC-15: Route High band to Gate 3 committee

**Type:** Decision matrix  
**Input:** Residual `49.97`, band `High`.  
**Expected:** `Committee at Gate 3`.  
**Observed:** Exact expected approval level.  
**Result:** PASS.

### TC-16: Gate 2 approval after all blockers clear

**Type:** Workflow  
**Expected:** `APPROVE_FOR_GATE_3`.  
**Observed:** `APPROVED_FOR_GATE_3_COMMITTEE`.  
**Result:** PASS.

### TC-17: Gate 3 memo contains required content

**Type:** Output completeness  
**Expected:** 16 required memo sections.  
**Observed:** All 16 sections present.  
**Result:** PASS.

### TC-18: Gate 3 human decision remains blank

**Type:** Human-in-the-loop / guardrail  
**Expected:** No automated committee decision.  
**Observed:** Blank decision fields except `NOT_APPLICABLE` override default.  
**Result:** PASS.

### TC-19: Gate 3 conditional form validation

**Type:** UI validation  
**Expected:**

- Required fields enforced.
- Conditions required for conditional approval.
- Override state matches exception decision.
- Next review date cannot precede decision date.
- Demo attestation required.

**Observed:** JavaScript implemented these checks.  
**Result:** PASS by implementation inspection. No claim is made that every browser interaction branch was manually clicked during this session.

### TC-20: No persistence or submission from demo HTML

**Type:** Security / side-effect control  
**Expected:** Demo form must not save or submit.  
**Observed:** No backend, fetch, storage, network, or form submission behavior in the HTML.  
**Result:** PASS by implementation inspection.

---

## 8. Final Scoring Trace

### Inherent risk

| Factor | Anchor | Weight | Contribution | Evidence reference |
|---|---:|---:|---:|---|
| F1 | 6 | 20 | 12.00 | `SRC-CBDDQ-2` |
| F2 | 10 | 15 | 15.00 | `SRC-CBDDQ-13` |
| F3 | 3 | 20 | 6.00 | `SRC-CBDDQ-6` |
| F4 | 0 | 10 | 0.00 | `SRC-CBDDQ-17` |
| F5 | 10 | 25 | 25.00 | `SRC-CBDDQ-19` |
| F6 | 6 | 10 | 6.00 | `SRC-SCOPE-S23` |
| **Total** |  |  | **64.00** |  |

### Control effectiveness

| Control | Tier | Multiplier | Evidence references |
|---|---|---:|---|
| C1 | Self-asserted only | 0.94 | `SRC-CBDDQ-22`, `SRC-SCOPE-S34` |
| C2 | Self-asserted only | 0.94 | `SRC-CBDDQ-62`, `SRC-SCOPE-S34` |
| C3 | Self-asserted only | 0.94 | `SRC-CBDDQ-98`, `SRC-SCOPE-S34` |
| C4 | Self-asserted only | 0.94 | `SRC-CBDDQ-49D`, `SRC-SCOPE-S34` |

### Final result

```text
Inherent score          64.00
Combined multiplier     0.7807
Unfloored residual      49.97
Floor value             12.80
Floor applied           false
Final residual          49.97
Risk band               High
Required approval       Committee at Gate 3
```

---

## 9. Defect Register

| ID | Defect | Severity | Detection | Correction | Retest |
|---|---|---|---|---|---|
| DEF-01 | `hard_exclusion_candidates` wrapper object was not iterable | High | Node runtime exception | Normalize and validate array in PowerShell extractor | PASS |
| DEF-02 | Extractor validated identity but not downstream collection contract | High | Source review | Added fail-closed array validation and post-write verification | PASS |
| DEF-03 | Initial Gate 1 JSON used nested resolution path incompatible with runtime | High | Admission blockers remained | Moved arrays to runtime-required top level | PASS |
| DEF-04 | Gate 1 JSON used conceptual/template field names rather than resolver names | High | `resolve.mjs` source inspection | Used `hard_exclusion_candidate_id`, `status`, `resolved_by`, `determination_source` | PASS |
| DEF-05 | “Gate 1 decision applied” message did not initially prove resolutions matched | Medium | Output analysis | Verified per-resolution application lines in final run | PASS |
| DEF-06 | Evidence language mixes synthetic QA verification with no operational verification | Medium | Cross-artifact review | Gate 3 memo applies narrower boundary | PASS with recommendation |
| DEF-07 | Final official scoring retains historical draft packet-status provenance | Low/Medium | Output review | Documented as historical ambiguity | Open recommendation |
| DEF-08 | Gate 2 filename appears in old/8.3-style form `CG_GAT~3.XLS` | Low | Artifact review | Recommend stable descriptive `.xlsx` name | Open recommendation |

---

## 10. Audit Evidence and Logs

### Node.js environment

```text
Node.js v24.22.1
```

### Initial runtime exception

```text
TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
    at applyGate1Decision (.../resolve.mjs:38:29)
    at .../fullRun.mjs:36:33
```

### Blocked admission log

```text
Package contract validation : PASS
Gate 1 review allowed       : ALLOWED
Business readiness          : BLOCKED_BY_OPEN_ITEMS
Scoring authorisation       : NOT_AUTHORISED

2 blocker(s) preventing scoring:
1. HARD_EXCLUSION_UNRESOLVED - HEX-0002
2. HARD_EXCLUSION_UNRESOLVED - HEX-0003
```

### Final Gate 1 application log

```text
Gate 1 decision applied:
  - HEX-0002 -> NOT_TRIGGERED by R. Nayan
  - HEX-0003 -> NOT_TRIGGERED by R. Nayan
  - Gate 1 APPROVED_FOR_SCORING by Financial Crime Analyst
```

### Final admission log

```text
Package contract validation : PASS
Gate 1 review allowed       : ALLOWED
Business readiness          : READY
Scoring authorisation       : AUTHORISED
```

### Final scoring log

```text
SCORING RESULT - AUTHORISED
Residual risk = 49.97
Band = High
Approval required = Committee at Gate 3
Written: scoring_output.json
```

### Final Gate 3 state

```text
GATE3_ADMISSION_RESULT = ADMITTED FOR GATE 3 MEMO DRAFTING
MEMO_QUALITY_SELF_CHECK = PASS
FINAL_STATUS = DRAFT_PENDING_GATE3_HUMAN_DECISION
```

---

## 11. Artifact Validation Records

The following generated Excel artifacts were run through `artifact-validator` version `3.2.4` and returned `valid` with zero errors and zero warnings:

### Gate 1 Excel fixture

```text
File: Gate1-Review-Form-COMPLETED_SYNTHETIC_HP-002.xlsx
SHA-256: 49cf6eb9091a0d835ec2d0f428dd3c805a63588ac1e007be7c3f5af0a99aaadd
Size: 11114 bytes
Result: valid
Errors: 0
Warnings: 0
```

### Gate 2 Excel fixture

```text
File: CG_Gate2_Approval_CG-CASE-HP-002_CG-RUN-HP-002_GATE3_READY.xlsx
SHA-256: dbd21b570b6706e71ec0f3100dd2014a9c0198e56c0523d0546d9d25866dda65
Size: 10214 bytes
Result: valid
Errors: 0
Warnings: 0
```

The Gate 1 Excel fixture was ultimately not the active runtime decision input. The validation remains useful as evidence that the template-derived workbook was structurally valid, while the Node.js workflow used `gate1-decision.json`.

---

## 12. Traceability Matrix

| Requirement | Evidence | Result |
|---|---|---|
| Consistent case/run identity | Intake, scoping, scoring, Gate 2, Gate 3 | PASS |
| Fail closed on incomplete evidence | Initial Gate 2 correction state | PASS |
| Fail closed on unresolved hard exclusions | Admission blockers | PASS |
| Named human resolution | Final Gate 1 application log | PASS |
| Controlled determination source | Corrected `gate1-decision.json` | PASS |
| Authorized deterministic scoring | Final Node.js run | PASS |
| Factor traceability | F1-F6 evidence references | PASS |
| Control traceability | C1-C4 evidence references | PASS |
| Gate 2 independent disposition | Gate 2 review artifact | PASS |
| High band routes to committee | Scoring and Gate 2 outputs | PASS |
| Gate 3 memo contains all sections | HTML packet | PASS |
| No automated Gate 3 decision | Blank human form | PASS |
| Synthetic-use boundary retained | Intake, Gate 2, and Gate 3 warnings | PASS |

---

## 13. Risks and Limitations

### FACT

- The workflow reached authorized scoring and Gate 3 memo admission.
- The final score was deterministic and traceable.
- The Gate 3 decision remained human-controlled.

### LIMITATION

- The synthetic evidence artifacts were represented through workbook registers and QA metadata. This evaluation did not establish operational authenticity or legal sufficiency of the underlying evidence.
- The Gate 3 browser form implementation was inspected for validation and side effects. This record does not claim a complete automated browser test suite across all browsers.
- The validation provenance timestamp remained historical: `2026-10-25T19:03:53.602Z`.
- The scoring output retained `DRAFT_PENDING_DETERMINISTIC_VALIDATION` as packet status at generation even though the final scoring status was `OFFICIAL`.
- Threshold intervals for the High band were not present in the supplied output.

### RECOMMENDATION

1. Add JSON Schema validation for `draft-gate1-packet.json` and `gate1-decision.json` before applying decisions.
2. Use one shared contract package for PowerShell and Node.js.
3. Add tests for empty, one-item, and multi-item candidate arrays.
4. Add an assertion that every `UNKNOWN` hard exclusion has exactly one matching decision resolution.
5. Print applied, unmatched, and unresolved resolution counts.
6. Separate `synthetic_qa_reviewed` from `operationally_independently_verified`.
7. Clarify current status versus generation-time provenance.
8. Rename the Gate 2 artifact to a stable descriptive `.xlsx` filename.
9. Add Playwright tests for the Gate 3 HTML validation branches.
10. Add a single command that executes extraction, schema validation, Gate 1 resolution, admission, scoring, Gate 2 reconciliation, and audit-log capture.

---

## 14. Suggested Automated Regression Pack

### Packet extraction

- Wrapped empty collection becomes `[]`.
- Wrapped one-item collection remains an array.
- Flat array remains unchanged.
- Missing `candidates` fails clearly.
- Null collection fails clearly.
- Invalid wrapper schema fails clearly.

### Gate 1 resolution

- Unknown candidate with no resolution blocks.
- Unknown candidate with mismatched ID blocks.
- Placeholder `resolved_by` fails.
- Missing determination source fails.
- Invalid status fails.
- `NOT_TRIGGERED` resolution applies.
- `TRIGGERED` prevents relationship progression.
- Duplicate resolutions fail.

### Admission

- Contract failure blocks.
- Gate 1 not allowed blocks.
- Open items block authorization.
- All blockers cleared authorizes scoring.

### Scoring

- Factor contributions reproduce `64.00`.
- Multiplier reproduces `0.7807`.
- Residual reproduces `49.97`.
- Floor remains unapplied.
- High band routes to Gate 3 committee.

### Gate 2

- Unauthorized scoring prevents approval.
- Mapping mismatch prevents approval.
- Missing Gate 1 arrays prevents approval.
- High official result with no blockers admits to Gate 3.

### Gate 3 HTML

- Required fields reject blank submission.
- Conditional approval requires conditions.
- Exception approval requires override `YES`.
- Exception denial requires override `NO`.
- Review date cannot precede decision date.
- Clear returns override to `NOT_APPLICABLE`.
- No fetch, storage, navigation, or backend calls occur.
- Print retains synthetic warning.

---

## 15. Final Evaluation

**Overall test result: PASS**

The test proved that the hackathon solution can fail for valid reasons, expose the blocking condition, accept corrected artifacts, rerun deterministically, and progress only after required controls are satisfied.

The most important evidence is not simply that the final case reached Gate 3. The stronger evidence is that the workflow:

1. Rejected incomplete and inconsistent upstream states.
2. Exposed a real PowerShell-to-Node contract defect.
3. Blocked unresolved hard exclusions.
4. Revealed a Gate 1 runtime-contract mismatch.
5. Accepted corrected, traceable human resolutions.
6. Changed observable admission state from blocked to ready.
7. Produced an authorized, reproducible score.
8. Routed a High-band case to committee review.
9. Preserved a blank human Gate 3 decision.

This provides an auditable demonstration that the solution was tested across failure, correction, recovery, and success paths rather than being demonstrated only with prearranged successful output.

---

## 16. Sign-off Placeholder

| Role | Name | Date | Result / Comments |
|---|---|---|---|
| Test executor |  |  |  |
| QE reviewer |  |  |  |
| Solution owner |  |  |  |
| Hackathon evaluator |  |  |  |

