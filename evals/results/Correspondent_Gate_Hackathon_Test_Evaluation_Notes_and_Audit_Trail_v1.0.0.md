# Correspondent Gate Hackathon Test Evaluation Notes and Audit Trail

**Document version:** 1.0.0  
**Prepared for:** Correspondent Gate hackathon submission  
**Scenario focus:** Synthetic Happy Path Low Band and High Band, plus negative controls  
**Primary High-Band identity:** `V7-HP-002` / `CG-CASE-HP-002` / `CG-RUN-HP-002`  
**Primary Low-Band identity:** `V7-HP-001` / `CG-CASE-HP-001` / `CG-RUN-HP-001`  
**Data classification:** SYNTHETIC  
**Prepared on:** 2026-10-26 (GMT+08:00)

---

## 1. Purpose

This document consolidates the tests, observed execution results, defects, corrections, limitations, and audit evidence produced while building and exercising Correspondent Gate.

The objective is to show how the solution was tested across the complete governed workflow:

```text
Stage 1  Intake registration
Stage 2  AI semantic analysis
Stage 3  Deterministic package validation
Stage 4  Gate 1 human review
Stage 5  Deterministic scoring
Stage 6  Gate 2 human review
Stage 7  Gate 3 memo creation
Stage 8  Gate 3 committee decision
Stage 9  Closure and audit
```

This record distinguishes between:

- **EXECUTED:** A command or test was run and an observed result was supplied.
- **VERIFIED ARTIFACT:** A supplied artifact was inspected and its contents were registered.
- **DESIGNED:** A test, prompt, or control was designed but no completed execution evidence was supplied.
- **BLOCKED:** Execution stopped because an expected control, artifact, mapping, or schema dependency was incomplete.
- **FUTURE IMPROVEMENT:** Deliberately deferred beyond the hackathon demonstration.

No test is marked executed unless console output, a generated artifact, or another explicit result was provided.

---

## 2. Solution Under Test

Correspondent Gate separates responsibilities across three control layers:

1. **AI-assisted interpretation and drafting**
   - Intake Analyzer
   - Gate 3 Memo Creator

2. **Deterministic Node.js processing**
   - Intake Validator
   - Scoring Engine
   - Closure Packager

3. **Human decision gates**
   - Gate 1 evidence and scoring-input approval
   - Gate 2 assessment review
   - Gate 3 committee decision

Core governance rule:

> AI interprets and drafts. Deterministic code validates and calculates. Authorized humans approve and decide.

---

## 3. Test Data and Version Baseline

### 3.1 High-Band scenario

```text
Test ID:                         V7-HP-002
Case ID:                         CG-CASE-HP-002
Run ID:                          CG-RUN-HP-002
Respondent:                      Meridian Frontier Commercial Bank plc
Risk-model version:              0.1
Semantic mapping catalog:        1.0.0
Scoring mapping rules:           1.1.0
Semantic output schema:          1.1.0
Draft Gate 1 packet schema:      1.1.0
Validator version observed:      1.0.2
Data classification:             SYNTHETIC
```

### 3.2 Low-Band scenario

```text
Test ID:                         V7-HP-001
Case ID:                         CG-CASE-HP-001
Run ID:                          CG-RUN-HP-001
Expected terminal stage:         Gate 2
Expected Gate 3 status:          NOT_REQUIRED
Expected Stage 9 status:         NOT_EXECUTED
Data classification:             SYNTHETIC
```

### 3.3 Important provenance distinction

Two mapping artifacts serve different purposes:

```text
approved_mapping_catalog_v1.0.0.json
Purpose: Intake Analyzer semantic candidate mapping

mapping.rules.v1.1.json
Purpose: Scoring Engine factor-anchor and control-tier derivation
```

These versions must be recorded separately in downstream evidence.

---

## 4. Evidence Inventory

### 4.1 High-Band intake inputs

- `CG_CBDDQ_Synthetic_HP-002_HighBand.xlsx`
- `CG_Relationship-Scoping_Synthetic_HP-002_HighBand.xlsx`

### 4.2 Controlled configuration

- `CG_CBDDQ_Field_Dictionary_v1.0.0.docx`
- `CG_Relationship_Scoping_Field_Dictionary_v1.0.0.docx`
- `CG_Semantic_Output_Schemas_v1.1.0.md`
- `risk-model.xlsx`
- `approved_mapping_catalog_v1.0.0.json`
- `draft_gate1_packet_schema_v1.1.0.md`
- `mapping.rules.v1.1.json`

### 4.3 Intake Analyzer and Validator artifacts

- `V7-HP-002_Part1.md`
- `V7-HP-002_Part2.md`
- `draft_gate1_package.md`
- `draft-gate1-packet.json`
- `exhaustive-source-register.json`
- `deterministic-validation-report.json`
- `validator-receipt.json`, when retained
- `validation-summary.html`, when retained
- `gate1-review-packet.html`, when generated

### 4.4 Scoring artifacts

- `mapping-preview.json`
- `Gate1-Review-Form-...-SYNTHETIC_COMPLETED.xlsx`, pending synchronized High-Band completion
- `scoring_output.json`, pending official High-Band execution
- Calculation trace, pending official High-Band execution
- Gate 1/scoring-set reconciliation result, pending

### 4.5 Gate 2, Gate 3, and closure artifacts

- Synchronized Gate 2 Review Form, pending
- Gate 3 committee memo, pending
- Gate 3 memo-quality self-check, pending
- Gate 3 HTML review packet, pending
- Synthetic Gate 3 committee decision, pending
- `audit-manifest.json`, pending High-Band completion
- `closure-receipt.json`, pending High-Band completion
- `integrity-hashes.txt`, pending High-Band completion
- `closure-summary.html`, pending High-Band completion

---

## 5. Test Summary Dashboard

| Test area | Status | Evidence or result |
|---|---|---|
| Intake file registration | VERIFIED ARTIFACT | High-Band CBDDQ and Scoping workbooks registered with matching Case and Run IDs |
| Configuration registration | VERIFIED ARTIFACT | Six controlled references registered; scoring rules later supplied separately |
| AI package generation | VERIFIED ARTIFACT | `draft_gate1_package.md` inspected; required Stage 1-6 artifacts present |
| JSON package validation | EXECUTED | 17 of 17 checks passed; 0 failed; 0 errors |
| Source Register generation | EXECUTED | 201 canonical records produced |
| Gate 1 extraction | EXECUTED WITH FIX | Extractor required support for bare JSON after heading |
| Gate 1 HTML rendering | EXECUTED / DEPENDENCY TESTED | Renderer correctly refused when required files were absent |
| Gate 1 candidate approval | BLOCKED | Intake semantic indicators count was zero; deterministic mapping preview introduced |
| Mapping preview CLI | EXECUTED WITH FIX | Windows direct-execution defect corrected |
| Mapping coverage | BLOCKED | 5 of 6 factors, 4 of 4 controls; F5 unmapped |
| Gate 1 workbook parsing | EXECUTED / DEFECT FOUND | `hard_exclusion_candidates` object caused `.find()` TypeError |
| Full High-Band scoring | NOT COMPLETED | Must resolve F5 and Gate 1 packet parser contract first |
| Gate 2 synchronization | DESIGNED | Prompt and required inputs defined; official score not yet available |
| Gate 3 memo and HTML | DESIGNED | Admission, exact-copy, completeness, and HTML controls defined |
| Closure Packager component tests | EXECUTED DURING BUILD | Five unit tests previously reported as passing; synthetic smoke package reported PASS |
| Closure tamper detection | DESIGNED | Negative verification path defined; completed High-Band evidence not yet supplied |
| Low-Band stop at Gate 2 | DESIGNED | Final HTML contract and stop rule documented |

---

## 6. Detailed Audit Trail

### 6.1 Intake file registration and compatibility review

**Status:** VERIFIED ARTIFACT

The High-Band CBDDQ and Relationship Scoping workbooks were registered with matching identifiers:

```text
Case ID: CG-CASE-HP-002
Run ID:  CG-RUN-HP-002
```

Observed High-Band characteristics included:

- jurisdiction outside FATF membership;
- disclosed 2025 AML supervisory action without closure detail;
- four intermediate ownership layers;
- respondent-bank use permitted;
- virtual-asset settlement and other elevated services;
- 18,000 expected monthly transactions;
- expected monthly value of 4,200,000,000;
- non-resident financial institutions, MSBs/MVTS, virtual-asset service providers, PEP-linked corporates, and private-banking customers;
- material adverse media requiring review;
- incomplete evidence and pending independent verification.

**Finding:** The workbook rows and Evidence Register/Submission Manifest used different evidence-state descriptions. This was recorded as a Gate 1 review issue rather than silently reconciled.

---

### 6.2 Controlled configuration review

**Status:** VERIFIED ARTIFACT

Registered versions:

```text
Semantic schema:              1.1.0
Draft Gate 1 packet schema:   1.1.0
Risk model:                   0.1
Semantic mapping catalog:     1.0.0
Scoring mapping rules:        1.1.0
```

**Finding:** The semantic mapping catalog and scoring anchor rules are separate configuration layers. Earlier sample artifacts incorrectly treated mapping version 1.1.0 as though it were the registered semantic catalog. The workflow was corrected to record both versions independently.

**Future improvement:** Formal Risk Model Owner approval metadata, signing, protected configuration promotion, and production rejection of unapproved local rule files were deferred for the hackathon.

---

### 6.3 Intake Analyzer output and package assembly

**Status:** VERIFIED ARTIFACT

`draft_gate1_package.md` was inspected. The package included:

- run header;
- input validation result;
- executive intake summary;
- Draft Gate 1 Packet;
- material source references;
- fact set;
- material fact set;
- control assessments;
- candidate indicator set;
- hard-exclusion candidates;
- exception set;
- package manifest;
- Agent receipt;
- final self-check.

**Observed package counts in the later package:**

```text
Material source references:   30
Facts:                        30
Material facts:               30
Control assessments:          4
Candidate indicators:         0
Hard-exclusion candidates:    4
Exceptions:                   6
```

**Quality boundary confirmed:** The package contained no official score, band, approval, rejection, or scoring authorization.

---

### 6.4 Deterministic Validator execution

**Status:** EXECUTED

**Observed execution timestamp:** `2026-10-25T11:59:17.566Z`

**Observed result:**

```text
Validator version:            1.0.2
Overall result:               PASS
Gate 1 review allowed:        true
Total checks:                 17
Passed:                       17
Failed:                       0
Errors:                       0
Skipped:                      0
Blocking validation failures: 0
```

Checks included:

- JSON parsing;
- required Agent artifacts;
- Case ID and Run ID matching;
- Source Register ID uniqueness;
- fact ID uniqueness;
- material-reference resolution;
- fact-reference integrity;
- material-fact subset integrity;
- approved mapping rules;
- manifest count reconciliation;
- version reconciliation;
- blank Gate 1 decision;
- absence of Agent-generated Source Register;
- absence of official score;
- absence of risk band;
- absence of approval/rejection;
- absence of false validation claims.

**Interpretation:** Validator PASS proved package-contract integrity. It did not resolve business exceptions or authorize scoring.

---

### 6.5 Exhaustive Source Register generation

**Status:** EXECUTED

The Validator produced `exhaustive-source-register.json` with:

```text
Schema:       SOURCE_REGISTER 1.0.0
Generator:    CG_NODE_VALIDATOR
Record count: 201
```

The register contained canonical records for both `CBDDQ` and `RELATIONSHIP_SCOPING` sources, including source-record IDs, sheet names, field IDs, source locations, raw values, normalized values, types, and extraction status.

**Traceability result:** The register established deterministic links between workbook fields and downstream mapping/scoring rules.

---

### 6.6 Gate 1 extraction script tests

**Status:** EXECUTED WITH DEFECT DISCOVERY AND CORRECTION

#### Test A: Incorrect script path

Command originally used:

```powershell
powershell -ExecutionPolicy Bypass -File ".\scripts\extract-gate1-packet.ps1"
```

Observed result:

```text
The argument '.\scripts\extract-gate1-packet.ps1' to the -File parameter does not exist.
```

**Root cause:** The script was located in the project root.

Corrected command:

```powershell
powershell -ExecutionPolicy Bypass -File ".\extract-gate1-packet.ps1"
```

#### Test B: Heading and fenced-block mismatch

Observed error:

```text
DRAFT_GATE1_PACKET heading was found, but it was not followed by a complete fenced JSON block using `json.
```

**Root cause:** The Agent package used:

```markdown
### DRAFT_GATE1_PACKET
{
  ...
}
```

rather than a fenced JSON block.

**Correction implemented:** A replacement extractor was generated that supports:

- heading levels `#` through `######`;
- optional escaped underscores;
- fenced JSON blocks;
- bare balanced JSON objects;
- JSON parsing and schema checks;
- Case ID and Run ID checks;
- output-directory creation;
- clean reserialization to `draft-gate1-packet.json`.

**Expected extraction mode for the observed package:** `BARE_JSON`.

---

### 6.7 Gate 1 HTML renderer dependency tests

**Status:** EXECUTED / NEGATIVE DEPENDENCY TESTS

The renderer requires:

```text
validation-output/draft-gate1-packet.json
validation-output/deterministic-validation-report.json
```

Observed failures included:

```text
Gate 1 packet not found: ./validation-output/draft-gate1-packet.json
```

and:

```text
Deterministic validation report not found: ./validation-output/deterministic-validation-report.json
```

**Evaluation:** The renderer failed closed when required inputs were missing. This is correct behavior.

A guarded execution sequence was defined to stop rendering unless both dependencies exist.

---

### 6.8 Gate 1 review-readiness result

**Status:** EXECUTED

Observed rendered/console status during the run:

```text
Validation status:      PASS
Gate 1 review allowed:  true
Business readiness:     BLOCKED_BY_OPEN_ITEMS
Scoring status:         NOT_AUTHORIZED
Blocking items:         EXC-0001, EXC-0002
```

Later regenerated High-Band packet evidence showed six exceptions and multiple hard-exclusion candidates. This demonstrates that technical PASS and business readiness are intentionally separate controls.

---

### 6.9 Gate 1 form-generation negative test

**Status:** EXECUTED

Observed form-generation result:

```text
STATUS:                   GATE1_INDICATORS_INCOMPLETE
OUTPUT_FILE:              NONE
CASE_ID:                  CG-CASE-HP-002
RUN_ID:                   CG-RUN-HP-002
GATE_1_STATUS:            NOT_CREATED
EXCEPTION_COUNT:          6
HARD_EXCLUSION_COUNT:     3
APPROVED_INDICATOR_COUNT: 0
MISSING_INPUTS:           CANDIDATE_INDICATOR_IDS
COMPLETENESS_CHECK:       FAIL
```

**Evaluation:** This was a correct controlled refusal. The form generator did not invent candidate indicators merely to create an approved workbook.

**Defect exposed:** The execution sequence attempted Gate 1 approval before the deterministic scoring mapping preview existed.

**Sequence correction:**

```text
Source Register
→ deterministic mapping preview
→ Gate 1 Review Form
→ full scoring
```

---

### 6.10 Mapping-preview CLI test

**Status:** EXECUTED WITH CODE DEFECT DISCOVERY AND CORRECTION

Original command:

```powershell
node mapper.mjs
```

Observed result: no output and immediate return.

**Root cause:** The Windows direct-execution comparison was invalid:

```javascript
if (import.meta.url === `file://${process.argv[1]}`)
```

**Correction implemented:** A Windows-safe CLI entry point was produced with explicit `--register`, `--rules`, and `--output` arguments and stable preview IDs.

Corrected invocation:

```powershell
node .\mapper.mjs `
  --register .\exhaustive-source-register.json `
  --rules .\mapping.rules.v1.1.json `
  --output .\mapping-preview.json
```

Observed output:

```text
Register records:       201
Mapping rules version:  1.1.0
Mapped factors:         5/6
Mapped controls:        4/4
Unmapped factors:       F5
Preview complete:       false
mapping-preview.json:   created
```

**Evaluation:** The CLI correction worked. The incomplete preview was a genuine mapping-coverage failure, not a CLI failure.

---

### 6.11 Mapping-preview content evaluation

**Status:** VERIFIED ARTIFACT / BLOCKED

Registered preview records:

```text
MAP-PREVIEW-F1  Anchor 6   F1-R2
MAP-PREVIEW-F2  Anchor 10  F2-R2
MAP-PREVIEW-F3  Anchor 3   F3-R3
MAP-PREVIEW-F4  Anchor 0   F4-R2
MAP-PREVIEW-F6  Anchor 6   F6-R2
MAP-PREVIEW-C1  Self-asserted only
MAP-PREVIEW-C2  Self-asserted only
MAP-PREVIEW-C3  Self-asserted only
MAP-PREVIEW-C4  Self-asserted only
```

Completeness result:

```text
Factor count:          5
Expected factors:      6
Control count:         4
Expected controls:     4
Unmapped factors:      F5
Complete:              false
```

**Blocking reason:** No F5 preview record means Gate 1 cannot approve a complete F1-F6 mapping set.

**Smallest proposed F5 correction:** Add an exact F5 rule for CBDDQ question 19, where respondent banks are permitted to use the account. The proposed rule maps exact value `YES` to an F5 anchor of `6`. This change was proposed but no completed rerun result was supplied.

**Status:** PROPOSED, NOT YET VERIFIED.

---

### 6.12 Gate 1 workbook parser test

**Status:** EXECUTED / DEFECT FOUND

Command:

```powershell
node fullRun.mjs
```

Observed error:

```text
TypeError: packet.hard_exclusion_candidates?.find is not a function
```

Location:

```text
gate1Form.mjs:143
```

**Root cause:** The code expected `hard_exclusion_candidates` to be an array. The actual extracted packet used a summary object:

```json
{
  "candidate_ids": ["HEX-0001", "HEX-0002", "HEX-0003"],
  "candidate_count": 3,
  "statuses": {
    "HEX-0001": "NOT_TRIGGERED",
    "HEX-0002": "UNKNOWN",
    "HEX-0003": "UNKNOWN"
  }
}
```

A parser normalization fix was designed to support:

- direct array format;
- `candidate_ids + statuses` summary format;
- `{ candidates: [...] }` wrapper format.

**Status:** FIX DESIGNED; no successful full-run evidence supplied after the correction.

---

### 6.13 Sample Gate 1 decision synchronization review

**Status:** VERIFIED ARTIFACT

`gate1-decision.json` and `gate1-decision.example.json` were inspected and found to be content-identical. They represent a legacy synthetic Low-Band Harborview-style decision despite using `CG-CASE-HP-002` / `CG-RUN-HP-002` identifiers.

The example completed Gate 1 Excel form used a later, expanded decision with additional exceptions and hard exclusions. It did not exactly synchronize with the JSON and did not match the current Meridian High-Band facts.

**Disposition:** Treat legacy examples as structural templates only. Do not use their case-specific values in the current High-Band run.

---

### 6.14 Scoring Engine tests

**Status:** PARTIAL

Implemented or documented scoring controls include:

- deterministic factor scoring;
- C1-C4 control tiers;
- combined multipliers;
- residual-risk floor;
- hard exclusions;
- Gate 1 admission;
- override preservation;
- versioned model configuration;
- calculation trace;
- repeatability expectations.

Previously documented component evidence stated:

```text
Automated tests: 65
Determinism check: 500 repeated runs
```

However, no new console output from those 65 tests or the 500-run check was supplied in this conversation. These should be cited from committed project evidence and rerun before final submission if possible.

Observed current blockers before official High-Band scoring:

1. F5 mapping incomplete.
2. Gate 1 packet parser expects the wrong hard-exclusion shape.
3. Synchronized High-Band Gate 1 decision workbook and JSON are not yet complete.
4. Gate 1-approved set versus scored set reconciliation has not run.

---

### 6.15 Gate 2 tests

**Status:** STRUCTURE VERIFIED / CURRENT RUN PENDING

The sample synthetic Gate 2 form was evaluated as structurally suitable for a High-Band escalation:

```text
Inherent score:             71.50
Combined multiplier:        0.830584
Residual score:             59.39
Risk band:                  High
Required approval:          GATE_3_COMMITTEE
Disposition:                ESCALATE_TO_GATE_3
Override requested:         NO
```

The arithmetic was checked:

```text
71.50 × 0.830584 = 59.386756
Rounded residual = 59.39
```

The current High-Band Gate 2 form must not reuse those values unless the official Scoring Engine reproduces them. The synchronized form will be generated only after official scoring and a `GATE1_SCORING_SET_MATCH=PASS` reconciliation.

---

### 6.16 Gate 3 Memo Creator evaluation design

**Status:** DESIGNED

Gate 3 admission and output checks include:

- matching Case ID and Run ID;
- validation PASS;
- scoring authorization;
- complete Gate 1 and Gate 2 records;
- High band or another explicit admission rule;
- exact-copy score and band;
- F1-F6 and C1-C4 completeness;
- 16 required memo sections;
- a 250-to-450-word executive summary;
- source-traceable material statements;
- blank committee decision fields;
- internal memo-quality self-check;
- self-contained HTML;
- no backend, save, submit, network, cookies, or browser storage;
- direct file creation or complete inline HTML only;
- refusal on source conflict or incomplete input.

Negative cases designed:

- `GATE3_INPUT_INCOMPLETE`
- `GATE3_SOURCE_CONFLICT`
- `GATE3_NOT_REQUIRED`
- memo score-copy mismatch;
- partial or oversized HTML;
- decision controls prepopulated without human action.

No completed current High-Band Gate 3 packet was supplied.

---

### 6.17 Low-Band workflow terminal test design

**Status:** DESIGNED

The Low-Band scenario must stop at Gate 2. The final HTML must display:

```text
LOW BAND - WORKFLOW COMPLETE AT GATE 2
GATE 3 NOT REQUIRED
```

Expected machine-readable terminal state:

```text
CASE_ID:         CG-CASE-HP-001
RUN_ID:          CG-RUN-HP-001
OFFICIAL_BAND:   Low
GATE_2_STATUS:   COMPLETE
GATE_3_STATUS:   NOT_REQUIRED
STAGE_9_STATUS:  NOT_EXECUTED
WORKFLOW_STATUS: COMPLETE_AT_GATE_2
```

The packet must be read-only and must not include Gate 3 decision controls or Stage 9 claims.

No completed synchronized Low-Band run evidence was supplied.

---

### 6.18 Closure Packager tests

**Status:** COMPONENT TESTS REPORTED AS EXECUTED; CURRENT HIGH-BAND INTEGRATION PENDING

The Closure Packager was built as a deterministic Node.js component with:

- terminal-decision admission;
- Case ID and Run ID checks;
- quorum and condition checks;
- artifact inventory;
- SHA-256 hashing;
- audit manifest;
- closure receipt;
- hash list;
- HTML summary;
- later integrity verification.

Previously reported build verification:

```text
Unit tests: 5
Passed:     5
Failed:     0
Synthetic smoke packaging: PASS
```

Test cases included:

- terminal approved decision passes;
- remanded decision cannot close;
- identity mismatch fails;
- conditional approval requires conditions;
- terminal status maps to closure status.

Additional defects and improvements identified during sequence review:

1. Terminal Gate 3 decision must be included in the hash manifest.
2. All required artifact groups must be enforced.
3. Semantic mapping version and scoring mapping version must be recorded separately.
4. Copied closure artifacts should be hashed after copying.
5. `APPROVED_WITH_CONDITIONS` must contain nonempty conditions.
6. Confirmed quorum should include synthetic voting members.

The full current High-Band closure and tamper test have not yet run because upstream scoring and Gate 3 are incomplete.

---

## 7. Negative, Boundary, and Integrity Scenario Matrix

| ID | Scenario | Expected result | Current evidence |
|---|---|---|---|
| E2E-HB-001 | Complete High-Band happy path | Gate 3 approved with conditions, closure PASS | BLOCKED upstream |
| E2E-HB-002 | Mapping gap unresolved | Scoring blocked | EXECUTED behavior observed |
| E2E-HB-003 | Evidence-state conflict unresolved | Gate 1 cannot approve | Captured in packet design |
| E2E-HB-004 | Hard exclusion remains UNKNOWN | Gate 1/scoring blocked | UNKNOWN candidates observed |
| E2E-HB-005 | Mapping-version mismatch | Deterministic refusal | DESIGNED |
| E2E-HB-006 | Case or Run ID mismatch | Deterministic refusal | Validator identity check exists |
| E2E-HB-007 | Gate 2 score differs from official output | Gate 2 incomplete | DESIGNED |
| E2E-HB-008 | Gate 3 memo alters score/band | Memo-quality FAIL/source conflict | DESIGNED |
| E2E-HB-009 | Gate 3 not required | Return `GATE3_NOT_REQUIRED` | DESIGNED for Low Band |
| E2E-HB-010 | Prompt injection in intake workbook | Treat as data, not instruction | DESIGNED |
| E2E-HB-011 | Oversized Agent output | Controlled file/output-size response | Recovery prompts designed |
| E2E-HB-012 | Scoring repeatability | Exact official-field match | DESIGNED; prior 500-run evidence referenced |
| E2E-HB-013 | Nonterminal Gate 3 decision | Closure refusal | Component rule implemented |
| E2E-HB-014 | Modify retained closure artifact | Verification FAIL with path and hashes | DESIGNED |
| E2E-HB-015 | Gate 3 interactive packet | No persistence/network; validation works | DESIGNED |
| E2E-HB-016 | Complete mapping coverage | Gate 1 can approve F1-F6/C1-C4 | BLOCKED on F5 |

---

## 8. Key Defects and Corrections

| Defect | Root cause | Correction | Status |
|---|---|---|---|
| Extraction script path failed | Guide referenced `scripts/`, file was in root | Correct command to root path | CORRECTED |
| Extractor rejected package | Package used bare JSON instead of fenced JSON | New extractor supports both formats | CORRECTED |
| Renderer missing packet/report | Upstream dependencies absent | Guarded checks before render | CORRECTED IN GUIDE |
| Gate 1 form requested indicators too early | Mapping preview occurred after Gate 1 | Move mapping preview before Gate 1 | CORRECTED IN GUIDE |
| `node mapper.mjs` did nothing | Windows-invalid direct-run comparison | Windows-safe CLI and explicit arguments | CORRECTED |
| F5 missing | No matching deterministic rule | Exact Q19 F5 rule proposed | NOT YET VERIFIED |
| Gate 1 parser `.find()` crash | Actual packet used summary object, not array | Normalize hard-exclusion shapes | FIX DESIGNED |
| Legacy sample collision | Low-Band artifacts reused `002` identifiers | Classify as legacy template only | RESOLVED BY PROCESS |
| Gate 3 conditions/quorum contradiction | Empty conditions and members in sample decision | Require nonempty conditions and synthetic members | CORRECTED IN GUIDE |
| Closure manifest coverage gap | Decision and groups not fully enforced | Hash decision, enforce groups, separate versions | PLANNED / GUIDE UPDATED |

---

## 9. Current Blockers

### Blocker 1: F5 mapping

Current preview:

```text
Mapped factors:    5/6
Mapped controls:   4/4
Unmapped factor:   F5
Complete:          false
```

Required next checkpoint:

```text
Mapped factors:    6/6
Mapped controls:   4/4
Unmapped factors:  none
Complete:          true
```

### Blocker 2: Gate 1 packet parser contract

`gate1Form.mjs` must successfully process the actual hard-exclusion structure without TypeError.

### Blocker 3: Synchronized Gate 1 decision

The current High-Band Gate 1 Excel and JSON decisions must be generated from:

- actual Draft Gate 1 Packet;
- validation report;
- Source Register;
- complete mapping preview;
- actual supplied synthetic human resolutions.

### Blocker 4: Official High-Band scoring

No official High-Band score should be documented until `fullRun.mjs` succeeds after Gate 1 authorization.

---

## 10. Recommended Final Test Run Order

```text
1. Back up and correct the F5 scoring rule.
2. Validate mapping.rules JSON.
3. Rerun mapper CLI.
4. Assert 6/6 factors and 4/4 controls.
5. Validate MAP-PREVIEW-F5 source, rule, anchor, and status.
6. Correct and syntax-check gate1Form.mjs packet normalization.
7. Generate synchronized High-Band Gate 1 Excel and JSON decisions.
8. Run full Scoring Engine.
9. Rerun full Scoring Engine with identical inputs for repeatability.
10. Reconcile Gate 1 approved IDs against scored IDs.
11. Require GATE1_SCORING_SET_MATCH=PASS.
12. Generate synchronized Gate 2 Review Form.
13. Execute Gate 3 Memo Creator.
14. Validate exact score copy and memo-quality self-check.
15. Record a logically complete synthetic Gate 3 decision.
16. Run Closure Packager.
17. Verify closure package immediately.
18. Modify one copied artifact.
19. Rerun verification and assert FAIL with changed path and hashes.
20. Capture screenshots, console logs, output hashes, and final execution log.
```

---

## 11. Execution Log Template

Use one entry per command or material review action.

```markdown
### Execution Entry

- Timestamp:
- Tester:
- Test ID:
- Case ID:
- Run ID:
- Stage:
- Component:
- Command or action:
- Input files:
- Input versions:
- Expected result:
- Actual result:
- Exit code:
- PASS / FAIL / BLOCKED:
- Output files:
- Output hashes:
- Finding or defect ID:
- Recovery or correction:
- Evidence path:
- Notes:
```

---

## 12. Evaluation Conclusions

### What the testing demonstrates well

- The deterministic Validator distinguishes package integrity from business readiness.
- The workflow fails closed when required files, candidate indicators, mappings, or decision fields are missing.
- The Source Register provides strong canonical traceability.
- The mapper and form-reader defects were discoverable through executable integration testing.
- AI-generated review forms are not allowed to invent missing indicator IDs.
- High-Band and Low-Band terminal paths are intentionally different.
- The closure design includes integrity verification rather than unsupported claims of immutable storage.

### What remains to prove

- Complete F1-F6 mapping for the current High-Band case.
- Successful synchronized Gate 1 approval accepted by the Scoring Engine.
- Official High-Band score and repeatability.
- Gate 1 approved-set versus scored-set reconciliation.
- Synchronized Gate 2 escalation.
- Gate 3 memo and HTML exact-copy compliance.
- Logical synthetic committee decision.
- Complete Stage 9 closure and tamper-detection execution.
- Fully synchronized Low-Band run terminating at Gate 2.

### Overall current assessment

```text
Architecture and governance:       STRONG
Deterministic validation:          EXECUTED AND PASSING
Source traceability:               EXECUTED AND PASSING
Integration maturity:              ACTIVE DEFECT RESOLUTION
High-Band end-to-end completion:   BLOCKED AT F5 / GATE 1 PARSING
Low-Band end-to-end completion:    DESIGNED, NOT YET EXECUTED
Closure component readiness:       COMPONENT-TESTED, INTEGRATION PENDING
```

The most valuable result of testing so far is not a polished score. It is evidence that Correspondent Gate exposes missing mappings, file-contract mismatches, and unresolved human decisions instead of silently manufacturing a successful outcome.

---

## 13. Final Evidence Checklist

- [ ] Final High-Band `mapping-preview.json` shows 6/6 factors and 4/4 controls.
- [ ] F5 rule and source record are documented.
- [ ] `gate1Form.mjs` parser fix passes syntax and integration tests.
- [ ] Synchronized High-Band Gate 1 Excel exists.
- [ ] Synchronized High-Band Gate 1 JSON exists.
- [ ] Official High-Band scoring output exists.
- [ ] Calculation trace exists.
- [ ] Repeatability comparison passes.
- [ ] Gate 1/scoring reconciliation passes.
- [ ] Synchronized Gate 2 form exists.
- [ ] Gate 3 admission is required.
- [ ] Gate 3 memo self-check passes.
- [ ] Gate 3 HTML is complete and demo-only.
- [ ] Gate 3 decision contains conditions, members, quorum, and comments.
- [ ] Closure manifest includes and hashes the terminal decision.
- [ ] All artifact groups are present.
- [ ] Initial closure verification passes.
- [ ] Tamper verification fails after deliberate modification.
- [ ] Low-Band run completes at Gate 2.
- [ ] Low-Band HTML states Gate 3 is not required.
- [ ] Repository evidence paths and screenshots are committed.
