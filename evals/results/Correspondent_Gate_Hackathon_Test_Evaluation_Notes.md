# Correspondent Gate Hackathon
## Test Evaluation Notes and Audit Trail

**Document status:** Hackathon QA evidence summary  
**Prepared:** 2026-10-26 03:38 GMT+08:00  
**Prepared for:** HP-HIGH-G3 synthetic correspondent-banking risk assessment workflow  
**Primary objective:** Demonstrate a deterministic, traceable positive High-band path from intake through Gate 3, while proving that incomplete or inconsistent packets fail closed.

---

## 1. Executive evaluation

The solution successfully demonstrated strong **fail-closed controls**. The validator and downstream Gate 3 review rejected packets when identifiers, mapping versions, evidence states, candidate indicators, Gate 1 decisions, scoring authorization, and Gate 2 escalation fields were inconsistent.

The intended positive scenario, **HP-HIGH-G3**, has not yet been proven end to end. The current evidence shows:

- the High-band intake data can support the intended factor profile;
- the deterministic model can produce a High-band result;
- the initial mapping catalogue did not generate candidate indicators for the HP-002 source identifiers;
- the runtime mapping rules did not include the required F5 condition for CBDDQ question 19 = YES;
- the current Gate 1 decision omitted approved and excluded indicator arrays;
- the current scoring result was provisional and unauthorized;
- the current Gate 2 record correctly returned the packet for correction rather than falsely escalating it.

**Overall evaluation:** **CONDITIONALLY READY FOR RETEST** after synchronized source, mapping, Gate 1, and validation artifacts are regenerated.

---

## 2. System under test

### 2.1 End-to-end flow

```text
CBDDQ + Relationship Scoping
  -> exhaustive source register
  -> candidate-indicator mapping
  -> deterministic validation
  -> draft Gate 1 packet
  -> synthetic human Gate 1 decision
  -> Gate 1 resolution
  -> admission check
  -> deterministic scoring
  -> Gate 2 approval/escalation
  -> Gate 3 admission and committee packet
```

### 2.2 Key executable components reviewed

- `fullRun.mjs`: end-to-end orchestration.
- `mapper.mjs`: maps source-register records to F1-F6 anchors and C1-C4 control tiers.
- `resolve.mjs`: applies the synthetic Gate 1 decision.
- `admission.mjs`: determines readiness and scoring authorization.
- `scoring.mjs`: calculates inherent score, control multiplier, residual score, band, and approval route.
- `weights.v0.1.json`: executable risk-model configuration.
- `mapping.rules.v1.1.json`: executable runtime mapping rules.
- `*.test.mjs`: Node built-in test suites.
- Correspondent Gate Validator `1.0.2`: validates the intake and agent-output packet against the approved catalogue and expected versions.

### 2.3 Business inputs reviewed

- `CG_CBDDQ_Synthetic_HP-002_HighBand.xlsx`
- `CG_Relationship-Scoping_Synthetic_HP-002_HighBand.xlsx`
- `risk-model.xlsx`
- `approved_mapping_catalog_v1.0.0.json`
- `mapping.rules.v1.1.json`
- `draft_gate1_package.md`
- `draft-gate1-packet.json`
- `gate1-decision.json`
- `scoring_output.json`
- Gate 2 review/approval workbooks

---

## 3. Test data and intended scenarios

### 3.1 Positive scenario: HP-HIGH-G3

Target behavior:

1. Complete synchronized inputs.
2. High-risk factor values.
3. Non-null candidate and Gate 1 indicator arrays.
4. No blocking exceptions or unresolved hard exclusions.
5. `business_readiness = READY`.
6. `scoring_authorised = true` and engine authorization status `AUTHORISED`.
7. Scoring status `OFFICIAL`.
8. Risk band `High`.
9. Approval requirement `Committee at Gate 3`.
10. Gate 2 disposition escalates the case to Gate 3.

### 3.2 Negative scenarios demonstrated

- **Source conflict:** files from different case/run identifiers.
- **Mapping gap:** no exact approved rule matched the source IDs and normalized values.
- **Evidence blocked:** evidence referenced but not provided or still pending human review.
- **Unresolved hard exclusion:** a candidate remained `UNKNOWN`.
- **Incomplete Gate 1:** approved/excluded indicator arrays absent or null.
- **Provisional scoring:** score calculated, but not authorized for use.
- **Gate 2 fail-closed:** correction-required decision prevented Gate 3 packet generation.

---

## 4. Audit trail

> Timestamps below are included only where available from generated artifacts or the current session context. User-local command execution did not include a timestamp and is marked accordingly.

### 4.1 Artifact creation and review events

| Timestamp | Event | Evidence / result |
|---|---|---|
| 2026-10-25 20:49 GMT+08 | Synthetic Gate 2 correction-required workbook generated | `CG_Gate2_Approval_CG-CASE-HP-002_CG-RUN-HP-002_SYNTHETIC_CORRECTION_REQUIRED.xlsx` created. |
| 2026-10-25 20:49 GMT+08 | Excel package compatibility check performed | Result: valid; 0 errors and 0 warnings. |
| 2026-10-25 20:50 GMT+08 | Gate 2 workbook rendered for visual inspection | Main Gate 2 sheet rendered; key ranges inspected. |
| 2026-10-25 21:14 GMT+08 | Initial corrected approved mapping catalogue generated | `approved_mapping_catalog_v1.1.0_corrected.json`; 15 factor rules, F1-F6 coverage, and four control mappings. |
| 2026-10-25 21:28 GMT+08 | Folder-to-text conversion utility created | `folder-to-txt.js` and usage guide created to preserve source files while generating uploadable `.txt` copies. |
| 2026-10-25 21:38 onward GMT+08 | Scoring engine files registered in five batches | 14 expected files registered; 0 outstanding. |
| 2026-10-25 21:54 GMT+08 | Corrected engine-native rules generated | `mapping.rules.v1.1.1.corrected.json`; 16 rules, complete F1-F6 coverage, and four F5 rules. |
| Timestamp not supplied | Validator executed locally by the user | Correspondent Gate Validator `1.0.2`: 17 checks, 15 passed, 2 failed, 0 errors, 0 skipped, 2 blocking failures. |

### 4.2 Registration log for the 14-file engine bundle

**Batch 1**

- `fullRun.mjs.txt`
- `admission.mjs.txt`
- `admission.test.mjs.txt`

**Batch 2**

- `mapper.mjs.txt`
- `gate1-decision.example.json.txt`
- `gate1-decision.json.txt`

**Batch 3**

- `README.md.txt`
- `mapper.test.mjs.txt`
- `mapping.rules.v1.1.json.txt`

**Batch 4**

- `scoring.mjs.txt`
- `resolve.mjs.txt`
- `resolve.test.mjs.txt`

**Batch 5**

- `weights.v0.1.json.txt`
- `scoring.test.mjs.txt`

**Registration result:** 14 of 14 files reviewed; no remaining engine files requested.

---

## 5. Test execution and evaluation record

### TE-01: Gate 3 source-packet identity consistency

**Purpose:** Confirm all packet artifacts represent one case and run.

**Input:**

- scoring output for `CG-CASE-HP-002 / CG-RUN-HP-002`;
- CBDDQ for `CG-CASE-HP-002 / CG-RUN-HP-002`;
- an earlier Gate 2 workbook for `CG-CASE-HP-G3-001 / CG-RUN-HP-G3-001`.

**Observed result:** `GATE3_SOURCE_CONFLICT`.

**Evaluation:** **PASS.** The workflow did not merge records from different cases. No committee memo or interactive Gate 3 packet was generated.

**Control demonstrated:** fail-closed case/run integrity.

---

### TE-02: Exact score reconciliation across mismatched records

**Purpose:** Confirm score values are not copied across cases.

**Observed values:**

- HP-002 scoring output: inherent `64`, multiplier `0.7807`, residual `49.97`, authorization `false`.
- Earlier Gate 2 workbook: inherent `71.5`, multiplier `0.830584`, residual `59.39`, authorization `TRUE`.

**Observed result:** score reconciliation failed and the packet was rejected.

**Evaluation:** **PASS.** The system did not treat a different case's High-band score as proof for HP-002.

---

### TE-03: High-band interpretation

**Purpose:** Verify that numeric residual score and risk-band label are treated as separate controlled outputs.

**Observed result:** HP-002 had residual `49.97` and explicit band `High`.

**Model boundary:** `weights.v0.1.json` defines High at residual scores greater than or equal to `40`.

**Evaluation:** **PASS.** `49.97` is correctly in the High band. The result was blocked because it was provisional and unauthorized, not because it was Low.

---

### TE-04: Provisional score authorization gate

**Purpose:** Confirm a calculated High score is not automatically authorized.

**Observed conditions:**

- `status = PROVISIONAL_NOT_OFFICIAL`;
- `scoring_authorised = false`;
- `business_readiness = BLOCKED_BY_OPEN_ITEMS`;
- null Gate 1 approved/excluded arrays;
- blocker `NO_FACTOR_ANCHORS`;
- F5 marked unanswered with no evidence references.

**Observed result:** Gate 3 admission failed closed.

**Evaluation:** **PASS.** Calculation and authorization were correctly separated.

---

### TE-05: Corrected Gate 2 identity, blocked admission

**Purpose:** Verify that correcting case/run identity alone is insufficient.

**Input:** corrected Gate 2 workbook matching `CG-CASE-HP-002 / CG-RUN-HP-002`.

**Observed Gate 2 values:**

- `RETURN_FOR_CORRECTION`;
- Gate 3 escalation `NO`;
- `NOT_ADMITTED_SOURCE_CORRECTION_REQUIRED`;
- Gate 2 attestation `NOT_CONFIRMED`;
- review status `CORRECTION_REQUIRED`.

**Observed result:** `GATE3_NOT_REQUIRED`; no committee memo or interactive packet.

**Evaluation:** **PASS.** Identity correction did not override source and authorization blockers.

---

### TE-06: Candidate-indicator generation under catalogue v1.0.0

**Purpose:** Determine whether the approved catalogue generated F1-F6 candidates for HP-002.

**Observed result:**

```json
{
  "indicator_count": 0,
  "indicators": []
}
```

**Reason recorded:** no active exact approved rule matched the selected source field IDs and normalized values.

**Evaluation:** **FAIL AS POSITIVE PATH / PASS AS NEGATIVE TEST.** The mapping gap was correctly exposed and blocked scoring.

---

### TE-07: Approved catalogue coverage analysis

**Purpose:** Compare the v1.0.0 catalogue with HP-002 source identifiers.

**Observed:** catalogue rules targeted semantic IDs such as `RP-11`, `RP-12`, `RP-13`, `EO-04`, `AM-10`, and `MR-05`, while HP-002 extracted numeric CBDDQ IDs and scoping IDs.

**Additional finding:** the v1.0.0 catalogue was a minimal subset and lacked complete F1-F6 coverage.

**Evaluation:** **FAIL.** The catalogue could not support the intended positive path.

---

### TE-08: Runtime mapper determinism and traceability review

**Purpose:** Review whether `mapper.mjs` behaves deterministically and emits source-traceable anchors.

**Static review findings:**

- indexes records by `workbook_type::question_or_field_id`;
- supports `eq`, `ne`, `in`, `not_in`, `contains`, and `not_contains`;
- selects the highest matching anchor per factor;
- records rule ID, source record ID, source location, and observed value;
- reports unmapped factors.

**Automated tests declared in source:**

- every factor maps from the register;
- every anchor has a source record and cell reference;
- repeated mapping produces identical results;
- shell bank drives F4 to maximum;
- bearer shares drive F3 to maximum;
- payable-through access drives F5 to maximum.

**Execution status in this evaluation:** **NOT EXECUTED HERE.** Source and tests were reviewed, but the Node test suite was not run in the analysis environment.

---

### TE-09: F5 High-band mapping gap

**Purpose:** Verify the High-band intake can produce F5.

**High-band source values:**

- question 19 = `YES`;
- question 19a = `NO`;
- question 20 = `NO`.

**Original runtime rules matched only:**

- 20 = `YES`;
- 19a = `YES`;
- 19 = `NO`.

**Observed result:** no valid F5 runtime rule for the High-band profile.

**Evaluation:** **FAIL.** This directly explains the unanswered F5 condition.

**Correction produced:** added an engine-native rule for question 19 = `YES`, anchor `10`.

---

### TE-10: F2 compound-value logic

**Purpose:** Verify a compound banking-license value is mapped intentionally.

**Source example:** `ACTIVE; 2025 AML supervisory action disclosed; closure and resolution detail not supplied`.

**Original logic:** exact `ACTIVE` resulted in anchor 0; any value not exactly `ACTIVE` resulted in anchor 10.

**Risk:** malformed or unrelated values could receive anchor 10 through a broad `ne ACTIVE` rule.

**Correction produced:** explicit `contains "AML supervisory action"` rule with anchor 10; retained exact `ACTIVE` with anchor 0.

**Evaluation:** **IMPROVED, RETEST REQUIRED.** The corrected logic is more explainable and less overbroad.

---

### TE-11: Risk-model arithmetic and boundaries

**Purpose:** Verify scoring configuration and worked examples.

**Configuration reviewed:**

- factor weights: F1 `20`, F2 `15`, F3 `20`, F4 `10`, F5 `25`, F6 `10`;
- multipliers: `0.65`, `0.82`, `0.94`, `1.00`;
- residual floor: `20%` of inherent;
- bands: Low from `0`, Moderate from `20`, High from `40`, Prohibited pending exception from `65`.

**Declared automated-test examples:**

- worked Low case residual `16.04`;
- worked High case residual `59.39`;
- all-maximum case residual `100`;
- perfect-control floor case residual `20`;
- exact boundary case residual `45`, band `High`;
- missing factors score at maximum;
- unknown anchors and evidence tiers are rejected;
- half-up rounding includes `2.675 -> 2.68`.

**Execution status in this evaluation:** **NOT EXECUTED HERE.** Test source was reviewed. The README states `node --test` should produce 31 passing tests, but no local test-run log was supplied.

---

### TE-12: Gate 1 decision application

**Purpose:** Verify exception and hard-exclusion resolution behavior.

**Static review findings:**

- wrong case ID is rejected;
- placeholder reviewer names are rejected;
- hard-exclusion status must be `NOT_TRIGGERED` or `TRIGGERED`;
- a hard-exclusion determination source is required;
- resolutions are copied into the resolved packet.

**Defect found:** `approved_indicator_ids` and `excluded_indicator_ids` are copied, but if absent become `null`. The resolver does not establish that every generated candidate is approved or excluded, that IDs exist, or that arrays are disjoint.

**Evaluation:** **PARTIAL PASS.** Exception controls are strong; indicator-disposition validation is incomplete.

---

### TE-13: Synthetic Gate 1 source consistency

**Purpose:** Check whether the synthetic Gate 1 decision matches the High-band respondent.

**Observed conflict:** Gate 1 hard-exclusion text referred to the United Kingdom, while the High-band intake used the synthetic Republic of Meridian.

**Evaluation:** **FAIL.** The synthetic decision cannot be reused unchanged.

---

### TE-14: Mapping-version consistency

**Purpose:** Verify one mapping release is used end to end.

**Observed versions:**

- initial CBDDQ/scoping metadata and Gate 1 package: `1.0.0`;
- runtime mapping file: `1.1.0`;
- earlier scoring output: `1.1.0`;
- corrected runtime mapping produced during evaluation: `1.1.1`.

**Evaluation:** **FAIL.** Mapping metadata and executable configuration drifted.

**Recommendation:** use one governed release, preferably `1.1.1` because behavior changed, across catalogue, runtime rules, workbooks, source register, Gate 1 packet, decision, manifest, and scoring output.

---

### TE-15: Validator run using old chain

**Command supplied by the user:**

```powershell
npm run validate -- `
  --cbddq ".\input\CG_CBDDQ_Synthetic_HP-002_HIGHBAND.xlsx" `
  --scoping ".\input\CG_Relationship-Scoping_Synthetic_HP-002_HIGHBAND.xlsx" `
  --agent-output ".\input\draft_gate1_package.md" `
  --mapping ".\schemas\approved_mapping_catalog_v1.0.0.json" `
  --output ".\validation-output" `
  --case-id "CG-CASE-HP-002" `
  --run-id "CG-RUN-HP-002" `
  --risk-model-version "0.1" `
  --mapping-version "1.0.0" `
  --schema-version "1.1.0"
```

**Observed log:**

```json
{
  "overall_result": "FAIL",
  "summary": {
    "total_checks": 17,
    "passed": 15,
    "failed": 2,
    "errors": 0,
    "skipped": 0,
    "blocking_failures": 2
  }
}
```

**Evaluation:** **VALID NEGATIVE RESULT.** The command explicitly used the old v1.0.0 catalogue, expected mapping version 1.0.0, and stale Gate 1 package. It did not evaluate the corrected mapping chain.

**Evidence limitation:** the exact two failed check IDs were not included in the supplied console log.

---

### TE-16: Gate 2 workbook artifact quality

**Purpose:** Produce a readable correction-required Gate 2 control artifact.

**Observed result:** workbook created with three sheets:

- `Gate 2 Review`;
- `Scoring Snapshot`;
- `Instructions`.

**Compatibility result:** valid with no reported errors or warnings.

**Visual review result:** title, sections, values, and warning highlighting rendered; correction-required and provisional statuses were visible.

**Evaluation:** **PASS AS NEGATIVE-PATH ARTIFACT.** It is not suitable as a positive Gate 3 approval record.

---

### TE-17: Upload-support utility

**Purpose:** Preserve source modules while creating uploadable `.txt` copies.

**Artifact:** `folder-to-txt.js`.

**Expected behavior:** recursively copies files to `TXT_COPIES`, appends `.txt`, preserves subfolders, skips generated output, and leaves originals unchanged.

**Execution status:** utility file was generated; no user execution log was supplied.

**Evaluation:** **CREATED, USER EXECUTION NOT EVIDENCED.** The successful five-batch upload demonstrates that a conversion workflow was completed, but this report does not claim which tool produced the uploaded copies.

---

## 6. Defect and finding register

| ID | Severity | Finding | Impact | Status |
|---|---:|---|---|---|
| DEF-001 | Critical | v1.0.0 approved catalogue did not match HP-002 source IDs and lacked complete factor coverage | Zero candidate indicators; no authorized score | Correction designed; retest required |
| DEF-002 | Critical | Runtime F5 rules lacked question 19 = YES | F5 unanswered; authorization blocked | Corrected in runtime v1.1.1 file |
| DEF-003 | High | Gate 1 decision omitted approved/excluded indicator arrays | Arrays became null downstream | Open; resolver validation improvement required |
| DEF-004 | High | Synthetic Gate 1 findings referenced United Kingdom instead of Republic of Meridian | Source contradiction and unreliable hard-exclusion resolution | Open; regenerate decision |
| DEF-005 | High | Mapping versions 1.0.0, 1.1.0, and 1.1.1 were mixed | Provenance and validator mismatch | Open; synchronize one release |
| DEF-006 | High | Evidence status and human-review state were inconsistent across artifacts | Readiness blocked | Open; synchronize inputs and review fixture |
| DEF-007 | High | Current scoring output was provisional and unauthorized | Gate 3 admission prohibited | Expected until corrected rerun |
| DEF-008 | Medium | Broad F2 `ne ACTIVE` rule could classify unrelated values as maximum risk | Weak explainability and potential false positives | Corrected in runtime v1.1.1 file |
| DEF-009 | Medium | Approved catalogue and runtime rules are separate manually maintained schemas | Governance/runtime drift | Open architectural improvement |
| DEF-010 | Medium | High-band and ordinary happy-path variants reused HP-002 identifiers | Cross-scenario contamination risk | Recommendation issued; not yet applied |
| DEF-011 | Medium | Transaction-value currency was unspecified in prior packet | Inputs not fully complete | Open in source correction set |
| DEF-012 | Medium | Exact two validator failure IDs were not captured in the supplied log | Audit detail incomplete | Capture deterministic report on retest |

---

## 7. Corrected artifacts produced during evaluation

1. `CG_Gate2_Approval_CG-CASE-HP-002_CG-RUN-HP-002_SYNTHETIC_CORRECTION_REQUIRED.xlsx`
   - Negative-path, correction-required Gate 2 artifact.

2. `approved_mapping_catalog_v1.1.0_corrected.json`
   - Governance-oriented corrected catalogue draft.

3. `mapping.rules.v1.1.1.corrected.json`
   - Engine-native runtime mapping rules compatible with `mapper.mjs`.
   - Adds F5 question 19 = YES and explicit F2 supervisory-action logic.

4. `folder-to-txt.js`
   - Upload-support utility.

5. `folder-to-txt-README.md`
   - Usage guide.

**Important:** the approved catalogue and runtime rules must be synchronized to one release before the positive-path retest. The catalogue remains the governance source; the runtime rules are the executable projection consumed by the mapper.

---

## 8. Evidence quality and limitations

### Facts demonstrated

- Fail-closed source and Gate 3 behavior was observed.
- The Gate 2 workbook was created and inspected.
- The Excel artifact passed compatibility validation.
- The engine code, configuration, and test source were reviewed.
- A local validator run produced 15 passed and 2 failed checks.
- Mapping deficiencies and source conflicts were identified from supplied artifacts.

### Not demonstrated yet

- A successful rerun of candidate generation with corrected rules.
- A positive validator result under one synchronized corrected mapping release.
- Execution of all 31 Node tests in the user's environment.
- A regenerated Gate 1 packet with nonzero candidates.
- A complete synthetic human Gate 1 decision with valid indicator arrays.
- An engine-produced `OFFICIAL`, `READY`, authorized High-band scoring output.
- A Gate 2 approval that escalates to Gate 3.
- A successful Gate 3 committee memo and interactive review packet.

### Audit caution

Generated corrected mapping files are hackathon artifacts. They are not production-approved risk policy. Jurisdiction lists, rule semantics, evidence dispositions, and human decisions require governed ownership before production use.

---

## 9. Required positive-path retest sequence

1. Select one identity for HP-HIGH-G3 and use it across every artifact.
2. Select one mapping release. Recommended: `1.1.1` because mapping behavior changed.
3. Publish a synchronized approved catalogue and engine-native runtime rules.
4. Correct CBDDQ and scoping metadata.
5. Correct evidence receipt, adverse-media disposition, sanctions determination, transaction currency, and human-review fields.
6. Regenerate `exhaustive-source-register.json`.
7. Regenerate the candidate-indicator set and draft Gate 1 packet.
8. Verify F1-F6 coverage and F5 question 19 traceability.
9. Create the synthetic Gate 1 decision using generated indicator IDs.
10. Ensure every candidate is approved or excluded once, with no duplicates or unknown IDs.
11. Resolve all blocking exceptions and hard exclusions.
12. Run deterministic validation and save the full JSON report.
13. Run `node mapper.mjs` and save console output.
14. Run `node --test` and save the complete test log.
15. Run `node fullRun.mjs` and preserve `scoring_output.json` plus console output.
16. Verify official/ready/authorized states and High-band routing.
17. Generate a new Gate 2 escalation approval from the authorized output.
18. Submit the synchronized packet to Gate 3 and retain admission, memo, and HTML packet outputs.

---

## 10. Positive-path acceptance criteria

```gherkin
Scenario: Authorized High-band case is admitted to Gate 3
  Given the CBDDQ and scoping workbooks use the same case and run IDs
  And every artifact uses the same schema, mapping, and risk-model versions
  And the deterministic validation report is PASS
  And candidate indicators provide traceable F1 through F6 coverage
  And F5 is answered from CBDDQ question 19 with a source reference
  And every generated candidate is approved or excluded at Gate 1
  And all blocking exceptions are resolved
  And all hard exclusions are NOT_TRIGGERED
  And the Gate 1 status is APPROVED_FOR_SCORING
  When the deterministic scoring workflow runs
  Then business readiness is READY
  And scoring authorization is AUTHORISED
  And scoring_authorised is true
  And scoring status is OFFICIAL
  And the residual score is at least 40 and below 65
  And the risk band is High
  And approval required is Committee at Gate 3
  And Gate 2 disposition is ESCALATE_TO_GATE_3
  And Gate 3 escalation required is YES
  And the Gate 2 attestation is CONFIRMED
  And Gate 3 admission succeeds
```

---

## 11. Negative and boundary regression suite

Retain these automated or repeatable checks:

1. Mismatched case ID is rejected.
2. Mismatched run ID is rejected.
3. Mismatched mapping version is rejected.
4. Zero candidate indicators blocks authorization.
5. Any unmapped required factor blocks authorization.
6. F5 without evidence remains unauthorized.
7. Null Gate 1 arrays block authorization.
8. Unknown candidate IDs are rejected.
9. Duplicate IDs across approved/excluded arrays are rejected.
10. Unresolved blocking exception prevents readiness.
11. Hard exclusion `UNKNOWN` prevents authorization.
12. Hard exclusion `TRIGGERED` prevents positive admission.
13. Missing control tier gives no risk reduction.
14. Unanswered factor receives maximum anchor for provisional calculation.
15. Invalid anchor outside `0, 3, 6, 10` is rejected.
16. Unknown evidence tier is rejected.
17. Weights not totaling 100 are rejected.
18. Residual floor prevents controls from eliminating inherent risk.
19. Exact High threshold `40` maps to High.
20. Exact Prohibited threshold `65` maps to Prohibited pending exception.
21. Repeated runs with identical input produce byte-equivalent deterministic results where timestamps are not included.
22. Gate 2 `RETURN_FOR_CORRECTION` prevents Gate 3 packet creation.
23. Gate 2 `ESCALATE_TO_GATE_3` cannot override unauthorized scoring.
24. Validator output and engine output record catalogue/runtime versions and checksums.

---

## 12. Final assessment

### KEEP

- deterministic, zero-network scoring;
- explicit configurations and versioned rules;
- strong fail-closed admission controls;
- source references and cell-level traceability;
- half-up rounding and boundary tests;
- separation of calculation from authorization.

### CHANGE

- make the approved catalogue the single source of truth;
- compile engine-native rules from the approved catalogue;
- validate Gate 1 approved/excluded arrays against generated candidates;
- give each synthetic scenario unique case/run IDs;
- capture complete logs and report checksums on every run.

### REMOVE

- manual dual maintenance of catalogue and runtime rules;
- stale Gate 1 packages after mapping changes;
- broad catch-all rules such as `ne ACTIVE` when explicit conditions are available;
- copied synthetic findings that reference a different jurisdiction or respondent.

### ADD

- catalogue-to-runtime compiler;
- manifest with file hashes and versions;
- positive HP-HIGH-G3 fixture;
- automated preflight command;
- machine-readable test evidence bundle;
- CI job running validator, mapper, Node tests, full run, and Gate 3 admission assertions.

**Final verdict:** The hackathon solution has strong architecture for deterministic scoring and safe failure. The negative controls worked. The positive HP-HIGH-G3 flow is **not yet proven**, but the remaining work is now specific, bounded, and testable.
