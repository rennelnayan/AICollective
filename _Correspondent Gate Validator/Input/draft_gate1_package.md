# RUN_HEADER

```json
{
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "test_id": "V7-HP-002",
  "test_data_id": "002",
  "packet_version": "1.1.0",
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "risk_model_version": "0.1",
  "mapping_version": "1.0.0",
  "output_schema_version": "1.1.0",
  "created_by_component": "CG_INTAKE_ANALYZER",
  "created_on": "2026-10-12T20:31:01Z",
  "data_classification": "SYNTHETIC"
}
```

# INPUT_VALIDATION_RESULT

```json
{
  "status": "READY_FOR_INTAKE_ANALYSIS",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "test_data_id": "002",
  "risk_model_version": "0.1",
  "mapping_version": "1.0.0",
  "output_schema_version": "1.1.0",
  "files_received": [
    "CG_CBDDQ_Field_Dictionary_v1.0.0.docx",
    "CG_Relationship_Scoping_Field_Dictionary_v1.0.0.docx",
    "CG_Semantic_Output_Schemas_v1.1.0.md",
    "risk-model.xlsx",
    "approved_mapping_catalog_v1.0.0.json",
    "draft_gate1_packet_schema_v1.1.0.md",
    "CG_CBDDQ_Synthetic_HP-002.xlsx",
    "CG_Relationship-Scoping_Synthetic_HP-002.xlsx"
  ],
  "required_files_missing": [],
  "obsolete_files_detected": [],
  "case_file_id_check": "MATCH",
  "identifier_checks": {
    "filename_test_data_id": "002",
    "cbdqq_workbook_case_id": "CG-CASE-HP-002",
    "cbdqq_workbook_run_id": "CG-RUN-HP-002",
    "scoping_workbook_case_id": "CG-CASE-HP-002",
    "scoping_workbook_run_id": "CG-RUN-HP-002",
    "result": "MATCH"
  },
  "required_sheets": {
    "cbdqq_intake_form": "FOUND",
    "standalone_scoping_form": "FOUND",
    "embedded_cbdqq_scoping_form_used": false
  },
  "identity_checks": [
    {
      "field": "LEGAL_NAME",
      "provider_value": "Harborview International Bank plc",
      "respondent_value": "Harborview International Bank plc",
      "result": "MATCH"
    },
    {
      "field": "LEI",
      "provider_value": "529900SYNTHHARBOR01",
      "respondent_value": "529900SYNTHHARBOR01",
      "result": "MATCH"
    },
    {
      "field": "COUNTRY",
      "provider_value": "United Kingdom",
      "respondent_value": "United Kingdom",
      "result": "MATCH"
    },
    {
      "field": "PARENT",
      "provider_value": "Harborview Financial Group plc",
      "respondent_value": "Harborview Financial Group plc",
      "result": "MATCH"
    },
    {
      "field": "REGULATOR",
      "provider_value": "Prudential Regulation Authority and Financial Conduct Authority, United Kingdom",
      "respondent_value": "Prudential Regulation Authority and Financial Conduct Authority, United Kingdom",
      "result": "MATCH"
    }
  ],
  "errors": []
}
```

# EXECUTIVE_INTAKE_SUMMARY

```json
{
  "schema_name": "EXECUTIVE_INTAKE_SUMMARY",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "summary": "The semantic intake package identifies Harborview International Bank plc as the prospective Respondent Institution and records a proposed relationship for USD clearing, cross-border payments, and trade-related settlement. Respondent and Provider Institution identity values match for legal name, country, LEI, parent, and regulator. The Provider Institution prohibits nesting, payable-through use, and downstream use for the proposed relationship. Listed evidence remains provided but not independently verified because human verification is pending.",
  "semantic_artifact_counts": {
    "material_source_references": 28,
    "facts": 28,
    "material_facts": 28,
    "control_assessments": 4,
    "candidate_indicators": 0,
    "hard_exclusion_candidates": 4,
    "exceptions": 4
  },
  "control_assessment_summary": {
    "C1": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
    "C2": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
    "C3": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
    "C4": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED"
  },
  "candidate_indicator_summary": {
    "candidate_count": 0,
    "reason": "No exact active approved mapping rule matched the source field identifiers and normalized values carried forward from Part 1."
  },
  "hard_exclusion_summary": {
    "NOT_TRIGGERED": 2,
    "UNKNOWN": 2,
    "POSSIBLE": 0,
    "official_hard_stop_issued": false
  },
  "exception_summary": {
    "total": 4,
    "blocking": 3,
    "nonblocking": 1,
    "types": [
      "MAPPING_GAP",
      "MATERIAL_REVIEW_POINT",
      "EVIDENCE_GAP",
      "MISSING_INFORMATION"
    ]
  },
  "open_human_review_required": true,
  "gate_1_decision_populated": false,
  "official_score_produced": false,
  "deterministic_validation_executed": false,
  "exhaustive_source_register_owner": "CG_NODE_VALIDATOR",
  "limitations": [
    "This summary uses the completed Part 1 artifacts without rereading or reinterpreting the original workbooks.",
    "Evidence described as provided remains pending human verification.",
    "No candidate indicators were generated because no exact approved mapping rule applied.",
    "The external Node.js validator will create the exhaustive Source Register and perform deterministic validation."
  ]
}
```

# DRAFT_GATE1_PACKET

```json
{
  "schema_name": "DRAFT_GATE1_PACKET",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "packet_version": "1.1.0",
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "data_classification": "SYNTHETIC",
  "sections": {
    "run_and_case_header": {
      "test_id": "V7-HP-002",
      "test_data_id": "002",
      "case_id": "CG-CASE-HP-002",
      "run_id": "CG-RUN-HP-002",
      "packet_version": "1.1.0",
      "risk_model_version": "0.1",
      "mapping_version": "1.0.0",
      "output_schema_version": "1.1.0",
      "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
      "data_classification": "SYNTHETIC"
    },
    "respondent_institution_profile": {
      "legal_name": {
        "value": "Harborview International Bank plc",
        "fact_ids": [
          "FACT-0001",
          "FACT-0002"
        ]
      },
      "country_of_incorporation": {
        "value": "United Kingdom",
        "fact_ids": [
          "FACT-0003",
          "FACT-0004"
        ]
      },
      "legal_entity_identifier": {
        "value": "529900SYNTHHARBOR01",
        "fact_ids": [
          "FACT-0005",
          "FACT-0006"
        ]
      },
      "primary_regulator": {
        "value": "Prudential Regulation Authority and Financial Conduct Authority, United Kingdom",
        "fact_ids": [
          "FACT-0007"
        ]
      },
      "ultimate_parent": {
        "value": "Harborview Financial Group plc",
        "fact_ids": [
          "FACT-0008"
        ]
      },
      "bearer_shares": {
        "raw_value": "NO",
        "normalized_value": false,
        "fact_ids": [
          "FACT-0009"
        ]
      },
      "physical_presence": {
        "raw_value": "YES",
        "normalized_value": true,
        "fact_ids": [
          "FACT-0010"
        ]
      },
      "shell_bank": {
        "raw_value": "NO",
        "normalized_value": false,
        "fact_ids": [
          "FACT-0011"
        ]
      },
      "identity_comparison_result": "MATCH"
    },
    "proposed_relationship_scope": {
      "services": {
        "value": "USD clearing; cross-border payments; trade-related settlement",
        "fact_ids": [
          "FACT-0014"
        ]
      },
      "respondent_nested_relationships_offered": {
        "raw_value": "NO",
        "normalized_value": false,
        "fact_ids": [
          "FACT-0012"
        ]
      },
      "respondent_payable_through_arrangements_offered": {
        "raw_value": "NO",
        "normalized_value": false,
        "fact_ids": [
          "FACT-0013"
        ]
      },
      "provider_nesting_permitted": {
        "raw_value": "NO",
        "normalized_value": false,
        "fact_ids": [
          "FACT-0015"
        ]
      },
      "provider_payable_through_permitted": {
        "raw_value": "NO",
        "normalized_value": false,
        "fact_ids": [
          "FACT-0016"
        ]
      },
      "downstream_correspondent_capability_recorded": {
        "raw_value": "YES",
        "normalized_value": true,
        "fact_ids": [
          "FACT-0018"
        ]
      },
      "provider_prohibition_on_downstream_use": {
        "raw_value": "YES",
        "normalized_value": true,
        "fact_ids": [
          "FACT-0019"
        ]
      },
      "relationship_restrictions": {
        "value": "NESTING_PAYABLE_THROUGH_AND_DOWNSTREAM_USE_PROHIBITED",
        "fact_ids": [
          "FACT-0026"
        ]
      },
      "provider_process_status": {
        "value": "PENDING_GATE_1",
        "fact_ids": [
          "FACT-0027"
        ]
      },
      "perspective_boundary": "Respondent capability and Provider Institution permission are separate. The recorded downstream capability combined with Provider Institution prohibition is retained as a material review point and is not treated automatically as a contradiction."
    },
    "activity_and_corridors": {
      "expected_monthly_transaction_count": 4500,
      "expected_monthly_transaction_value": 850000000,
      "expected_average_transaction_size": 188889,
      "expected_corridors": [
        "United Kingdom",
        "United States",
        "European Economic Area",
        "Singapore"
      ],
      "customer_description": "Regulated corporate and institutional customers",
      "estimate_basis": "Twelve-month forecast",
      "fact_ids": [
        "FACT-0017"
      ]
    },
    "control_assessment_C1_C4": [
      {
        "control_domain": "C1",
        "assessment_id": "CTL-0001",
        "related_fact_ids": [
          "FACT-0020",
          "FACT-0024",
          "FACT-0028"
        ],
        "assertion_summary": "The Respondent Institution provides affirmative AML governance, risk-assessment, audit, and related control assertions. Supporting files are listed as provided.",
        "evidence_status": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
        "limitations": [
          "Verification status remains PENDING_HUMAN_REVIEW.",
          "Affirmative questionnaire answers do not establish control design or operating effectiveness.",
          "No approved human-verification record is present."
        ],
        "open_human_actions": [
          "Verify the supplied AML policy, risk assessment, and assurance materials.",
          "Confirm the scope, currency, issuer, and authenticity of the independent-assurance material.",
          "Determine whether evidence supports the relevant C1 assertions."
        ]
      },
      {
        "control_domain": "C2",
        "assessment_id": "CTL-0002",
        "related_fact_ids": [
          "FACT-0021",
          "FACT-0024"
        ],
        "assertion_summary": "The Respondent Institution provides affirmative CDD, EDD, beneficial-ownership, and periodic-review assertions, with supporting procedures listed as provided.",
        "evidence_status": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
        "limitations": [
          "Verification status remains PENDING_HUMAN_REVIEW.",
          "The supplied procedure has not been confirmed as current, complete, or operating effectively.",
          "Affirmative answers remain Respondent Institution assertions."
        ],
        "open_human_actions": [
          "Verify the CDD and EDD procedure and its approval status.",
          "Confirm beneficial-ownership and periodic-review coverage.",
          "Determine whether the evidence supports the relevant C2 assertions."
        ]
      },
      {
        "control_domain": "C3",
        "assessment_id": "CTL-0003",
        "related_fact_ids": [
          "FACT-0022",
          "FACT-0024",
          "FACT-0025"
        ],
        "assertion_summary": "The Respondent Institution provides affirmative sanctions, PEP, and adverse-media screening assertions. Provider Institution screening records no material unresolved result, subject to human review.",
        "evidence_status": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
        "limitations": [
          "Respondent screening evidence and Provider Institution screening results have not received approved human verification.",
          "Provider screening addresses onboarding results and does not prove Respondent Institution control effectiveness.",
          "List coverage, update cadence, configuration, and alert disposition require review."
        ],
        "open_human_actions": [
          "Verify screening policies, system configuration, list coverage, and update cadence.",
          "Review the Provider Institution screening report and its limitations.",
          "Determine whether evidence supports the relevant C3 assertions."
        ]
      },
      {
        "control_domain": "C4",
        "assessment_id": "CTL-0004",
        "related_fact_ids": [
          "FACT-0012",
          "FACT-0013",
          "FACT-0015",
          "FACT-0016",
          "FACT-0018",
          "FACT-0019",
          "FACT-0023",
          "FACT-0024",
          "FACT-0026"
        ],
        "assertion_summary": "The Respondent Institution provides affirmative shell-bank and correspondent-control assertions. The Provider Institution prohibits nesting, payable-through use, and downstream use for the proposed relationship.",
        "evidence_status": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
        "limitations": [
          "Respondent capability and Provider Institution permission are separate perspectives.",
          "The Provider Institution restriction does not by itself demonstrate that technical and operational enforcement is effective.",
          "Supporting policy and restriction documentation remain pending human verification."
        ],
        "open_human_actions": [
          "Verify the Respondent Institution correspondent-banking policy and shell-bank controls.",
          "Confirm that contractual, operational, and monitoring controls enforce the Provider Institution restrictions.",
          "Resolve the recorded downstream-capability review point before Gate 1 completion."
        ]
      }
    ],
    "evidence_status_and_limitations": {
      "overall_evidence_status": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
      "related_fact_ids": [
        "FACT-0020",
        "FACT-0021",
        "FACT-0022",
        "FACT-0023",
        "FACT-0024",
        "FACT-0025",
        "FACT-0028"
      ],
      "limitations": [
        "Evidence is listed as provided, but verification remains PENDING_HUMAN_REVIEW.",
        "No control assertion is classified as supported by approved human verification.",
        "Affirmative answers do not establish control design or operating effectiveness.",
        "Provider Institution screening results remain subject to human review.",
        "The sanctioned-presence determination remains incomplete."
      ]
    },
    "candidate_indicators_F1_F6": {
      "candidate_count": 0,
      "candidates": [],
      "mapping_version": "1.0.0",
      "mapping_result": "No exact active approved mapping rule applied to the Part 1 source field identifiers and normalized values.",
      "mapping_gap_exception_id": "EXC-0001"
    },
    "hard_exclusion_candidates": [
      {
        "hard_exclusion_candidate_id": "HEX-0001",
        "exclusion_rule_id": "SHELL_BANK",
        "status": "NOT_TRIGGERED",
        "source_fact_ids": [
          "FACT-0007",
          "FACT-0008",
          "FACT-0010",
          "FACT-0011"
        ],
        "reason": "Available respondent assertions record physical presence, a named regulator, an identified parent, and a negative shell-bank response. These facts remain subject to human verification.",
        "required_human_action": "Verify physical presence, regulatory affiliation, and group affiliation before relying on this candidate status."
      },
      {
        "hard_exclusion_candidate_id": "HEX-0002",
        "exclusion_rule_id": "DOWNSTREAM_SHELL_BANK_EXPOSURE",
        "status": "NOT_TRIGGERED",
        "source_fact_ids": [
          "FACT-0012",
          "FACT-0015",
          "FACT-0018",
          "FACT-0019",
          "FACT-0023",
          "FACT-0026"
        ],
        "reason": "The proposed relationship prohibits nesting and downstream use. A recorded downstream capability creates a review point but does not establish that downstream relationships are permitted through the proposed account.",
        "required_human_action": "Confirm contractual and operational enforcement of the downstream-use prohibition and verify the respondent identification procedures."
      },
      {
        "hard_exclusion_candidate_id": "HEX-0003",
        "exclusion_rule_id": "COMPREHENSIVELY_SANCTIONED_PRESENCE",
        "status": "UNKNOWN",
        "source_fact_ids": [
          "FACT-0003",
          "FACT-0004",
          "FACT-0017",
          "FACT-0025"
        ],
        "reason": "The available material facts identify incorporation and expected corridors, but the case workbook field aligned to question 108 is an independent-assurance assertion rather than a dedicated comprehensively sanctioned-presence answer.",
        "required_human_action": "Confirm the respondent geographic-presence data and perform the required sanctioned-jurisdiction determination using the controlled Provider Institution process."
      },
      {
        "hard_exclusion_candidate_id": "HEX-0004",
        "exclusion_rule_id": "RESPONDENT_BANK_CATEGORY_PROHIBITED",
        "status": "UNKNOWN",
        "source_fact_ids": [
          "FACT-0023"
        ],
        "reason": "The respondent records a shell-bank prohibition, but the available material facts do not establish that it prohibits its own respondent-bank category while seeking the proposed relationship.",
        "required_human_action": "Review the prohibited-customer and prohibited-relationship taxonomy to determine whether an internal category inconsistency exists."
      }
    ],
    "contradictions_exceptions_and_missing_information": [
      {
        "exception_id": "EXC-0001",
        "exception_type": "MAPPING_GAP",
        "severity": "MEDIUM",
        "related_fact_ids": [
          "FACT-0003",
          "FACT-0007",
          "FACT-0008",
          "FACT-0009",
          "FACT-0010",
          "FACT-0011",
          "FACT-0012",
          "FACT-0013",
          "FACT-0014",
          "FACT-0017",
          "FACT-0020",
          "FACT-0021",
          "FACT-0022",
          "FACT-0023"
        ],
        "material_source_reference_ids": [
          "MSR-0003",
          "MSR-0007",
          "MSR-0008",
          "MSR-0009",
          "MSR-0010",
          "MSR-0011",
          "MSR-0012",
          "MSR-0013",
          "MSR-0014",
          "MSR-0017",
          "MSR-0020",
          "MSR-0021",
          "MSR-0022",
          "MSR-0023"
        ],
        "finding": "No exact active approved mapping rule applies to these material facts. The approved catalog rules target RP-11, RP-12, RP-13, EO-04, AM-10, and MR-05, and none of those exact source field identifiers is present in the designated case-workbook answers.",
        "required_action": "Risk Model Owner must add and approve exact mappings if these facts are intended to create candidate indicators. Do not approximate or invent mappings.",
        "blocking": true
      },
      {
        "exception_id": "EXC-0002",
        "exception_type": "MATERIAL_REVIEW_POINT",
        "severity": "MEDIUM",
        "related_fact_ids": [
          "FACT-0012",
          "FACT-0015",
          "FACT-0018",
          "FACT-0019",
          "FACT-0026"
        ],
        "material_source_reference_ids": [
          "MSR-0012",
          "MSR-0015",
          "MSR-0018",
          "MSR-0019",
          "MSR-0026"
        ],
        "finding": "The standalone scoping form records downstream correspondent capability while the Provider Institution prohibits downstream use, nesting, and payable-through use. These values represent capability and Provider Institution permission rather than an automatic contradiction.",
        "required_action": "Confirm that contractual, technical, operational, and monitoring controls enforce the restrictions for the proposed relationship.",
        "blocking": false
      },
      {
        "exception_id": "EXC-0003",
        "exception_type": "EVIDENCE_GAP",
        "severity": "MEDIUM",
        "related_fact_ids": [
          "FACT-0020",
          "FACT-0021",
          "FACT-0022",
          "FACT-0023",
          "FACT-0024",
          "FACT-0028"
        ],
        "material_source_reference_ids": [
          "MSR-0020",
          "MSR-0021",
          "MSR-0022",
          "MSR-0023",
          "MSR-0024",
          "MSR-0028"
        ],
        "finding": "Control evidence is listed as provided, but all verification remains PENDING_HUMAN_REVIEW. No control assertion qualifies as supported by approved human verification.",
        "required_action": "Complete authenticity, currency, scope, and substantive human review of the supplied evidence before changing evidence status.",
        "blocking": true
      },
      {
        "exception_id": "EXC-0004",
        "exception_type": "MISSING_INFORMATION",
        "severity": "HIGH",
        "related_fact_ids": [
          "FACT-0003",
          "FACT-0004",
          "FACT-0017",
          "FACT-0025"
        ],
        "material_source_reference_ids": [
          "MSR-0003",
          "MSR-0004",
          "MSR-0017",
          "MSR-0025"
        ],
        "finding": "A dedicated source answer establishing whether the respondent has physical presence in a comprehensively sanctioned jurisdiction was not identified in the designated material answers. Question 108 in the supplied CBDDQ case workbook represents an independent-assurance assertion.",
        "required_action": "Obtain or confirm the sanctioned-presence determination through the Provider Institution controlled screening process before Gate 1 completion.",
        "blocking": true
      }
    ],
    "open_human_actions": [
      {
        "action_id": "ACT-0001",
        "source": "CTL-0001",
        "action": "Verify the supplied AML policy, risk assessment, and assurance materials."
      },
      {
        "action_id": "ACT-0002",
        "source": "CTL-0001",
        "action": "Confirm the scope, currency, issuer, and authenticity of the independent-assurance material."
      },
      {
        "action_id": "ACT-0003",
        "source": "CTL-0001",
        "action": "Determine whether evidence supports the relevant C1 assertions."
      },
      {
        "action_id": "ACT-0004",
        "source": "CTL-0002",
        "action": "Verify the CDD and EDD procedure and its approval status."
      },
      {
        "action_id": "ACT-0005",
        "source": "CTL-0002",
        "action": "Confirm beneficial-ownership and periodic-review coverage."
      },
      {
        "action_id": "ACT-0006",
        "source": "CTL-0002",
        "action": "Determine whether evidence supports the relevant C2 assertions."
      },
      {
        "action_id": "ACT-0007",
        "source": "CTL-0003",
        "action": "Verify screening policies, system configuration, list coverage, and update cadence."
      },
      {
        "action_id": "ACT-0008",
        "source": "CTL-0003",
        "action": "Review the Provider Institution screening report and its limitations."
      },
      {
        "action_id": "ACT-0009",
        "source": "CTL-0003",
        "action": "Determine whether evidence supports the relevant C3 assertions."
      },
      {
        "action_id": "ACT-0010",
        "source": "CTL-0004",
        "action": "Verify the Respondent Institution correspondent-banking policy and shell-bank controls."
      },
      {
        "action_id": "ACT-0011",
        "source": "CTL-0004",
        "action": "Confirm that contractual, operational, and monitoring controls enforce the Provider Institution restrictions."
      },
      {
        "action_id": "ACT-0012",
        "source": "CTL-0004",
        "action": "Resolve the recorded downstream-capability review point before Gate 1 completion."
      },
      {
        "action_id": "ACT-0013",
        "source": "HEX-0001",
        "action": "Verify physical presence, regulatory affiliation, and group affiliation before relying on the shell-bank candidate status."
      },
      {
        "action_id": "ACT-0014",
        "source": "HEX-0002",
        "action": "Confirm contractual and operational enforcement of the downstream-use prohibition and verify respondent identification procedures."
      },
      {
        "action_id": "ACT-0015",
        "source": "HEX-0003",
        "action": "Confirm geographic-presence data and perform the controlled sanctioned-jurisdiction determination."
      },
      {
        "action_id": "ACT-0016",
        "source": "HEX-0004",
        "action": "Review the prohibited-customer and prohibited-relationship taxonomy for an internal category inconsistency."
      },
      {
        "action_id": "ACT-0017",
        "source": "EXC-0001",
        "action": "Add and approve exact mapping rules if the identified facts are intended to create candidate indicators."
      },
      {
        "action_id": "ACT-0018",
        "source": "EXC-0002",
        "action": "Confirm that contractual, technical, operational, and monitoring controls enforce the proposed relationship restrictions."
      },
      {
        "action_id": "ACT-0019",
        "source": "EXC-0003",
        "action": "Complete authenticity, currency, scope, and substantive human review of the supplied evidence."
      },
      {
        "action_id": "ACT-0020",
        "source": "EXC-0004",
        "action": "Obtain or confirm the sanctioned-presence determination through the Provider Institution controlled screening process."
      }
    ],
    "source_traceability": {
      "material_source_reference_count": 28,
      "fact_count": 28,
      "material_fact_count": 28,
      "traceability_rule": "Packet statements cite Part 1 fact IDs. Each cited fact has at least one material_source_reference_id in the completed Part 1 artifacts.",
      "canonical_source_record_ids_created": false,
      "exhaustive_source_register_created": false,
      "exhaustive_source_register_owner": "CG_NODE_VALIDATOR",
      "node_resolution_statement": "The external Node.js validator will parse the original workbooks, create the exhaustive Source Register, assign canonical source_record_id values, and resolve material source references."
    },
    "versions_and_limitations": {
      "risk_model_version": "0.1",
      "mapping_version": "1.0.0",
      "semantic_schema_version": "1.1.0",
      "packet_schema_version": "1.1.0",
      "part_1_artifact_counts": {
        "material_source_references": 28,
        "facts": 28,
        "material_facts": 28,
        "control_assessments": 4,
        "candidate_indicators": 0,
        "hard_exclusion_candidates": 4,
        "exceptions": 4
      },
      "limitations": [
        "Stage 6 used only the completed Part 1 artifacts.",
        "The original workbooks were not reread or reinterpreted.",
        "Evidence remains provided but not independently verified.",
        "No exact approved mapping produced a candidate indicator.",
        "Two hard-exclusion candidates remain UNKNOWN.",
        "Three open exceptions are blocking and one is nonblocking.",
        "The exhaustive Source Register has not been created by the Intake Analyzer.",
        "Deterministic validation has not yet executed.",
        "This packet is synthetic and pending external validation and human Gate 1 review."
      ]
    },
    "gate_1_decision_section": {
      "gate_1_decision_id": null,
      "gate_1_status": null,
      "reviewer_role": null,
      "decision_date": null,
      "approved_indicator_ids": [],
      "excluded_indicator_ids": [],
      "unresolved_nonblocking_findings": [],
      "reviewer_comments": null
    }
  },
  "prohibited_output_declarations": {
    "source_register_json_included": false,
    "canonical_source_record_ids_claimed": false,
    "official_score_included": false,
    "factor_weights_included": false,
    "control_multipliers_included": false,
    "risk_rating_or_band_included": false,
    "gate_1_decision_populated": false,
    "relationship_approval_or_rejection_included": false,
    "recommendation_included": false,
    "scoring_authorization_included": false,
    "deterministic_validation_claimed": false
  }
}
```

# MATERIAL_SOURCE_REFERENCES_JSON

```json
{
  "schema_name": "MATERIAL_SOURCE_REFERENCES",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "reference_count": 28,
  "references": [
    {
      "material_source_reference_id": "MSR-0001",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "1",
      "field_name": "Full legal name",
      "source_location": "Intake form, question 1, Respondent answer",
      "raw_value": "Harborview International Bank plc",
      "normalized_value": "Harborview International Bank plc",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0001"
      ],
      "used_by_artifacts": [
        "EXCEPTION_SET",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0002",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S07",
      "field_name": "Respondent full legal name",
      "source_location": "Scoping form, field S07, Respondent answer",
      "raw_value": "Harborview International Bank plc",
      "normalized_value": "Harborview International Bank plc",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0002"
      ],
      "used_by_artifacts": [
        "EXCEPTION_SET",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0003",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "2",
      "field_name": "Country of incorporation",
      "source_location": "Intake form, question 2, Respondent answer",
      "raw_value": "United Kingdom",
      "normalized_value": "United Kingdom",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0003"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0004",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S08",
      "field_name": "Country of incorporation",
      "source_location": "Scoping form, field S08, Respondent answer",
      "raw_value": "United Kingdom",
      "normalized_value": "United Kingdom",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0004"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0005",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "11",
      "field_name": "Legal Entity Identifier",
      "source_location": "Intake form, question 11, Respondent answer",
      "raw_value": "529900SYNTHHARBOR01",
      "normalized_value": "529900SYNTHHARBOR01",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0005"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0006",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S09",
      "field_name": "Legal Entity Identifier",
      "source_location": "Scoping form, field S09, Respondent answer",
      "raw_value": "529900SYNTHHARBOR01",
      "normalized_value": "529900SYNTHHARBOR01",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0006"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0007",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "12",
      "field_name": "Primary regulator",
      "source_location": "Intake form, question 12, Respondent answer",
      "raw_value": "Prudential Regulation Authority and Financial Conduct Authority, United Kingdom",
      "normalized_value": "Prudential Regulation Authority and Financial Conduct Authority, United Kingdom",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0007"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0008",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "14",
      "field_name": "Ultimate parent",
      "source_location": "Intake form, question 14, Respondent answer",
      "raw_value": "Harborview Financial Group plc",
      "normalized_value": "Harborview Financial Group plc",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0008"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0009",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "16",
      "field_name": "Bearer shares",
      "source_location": "Intake form, question 16, Respondent answer",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0009"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0010",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "17",
      "field_name": "Physical presence",
      "source_location": "Intake form, question 17, Respondent answer",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0010"
      ],
      "used_by_artifacts": [
        "HARD_EXCLUSION_CANDIDATES",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0011",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "18",
      "field_name": "Shell bank",
      "source_location": "Intake form, question 18, Respondent answer",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0011"
      ],
      "used_by_artifacts": [
        "HARD_EXCLUSION_CANDIDATES",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0012",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "19a",
      "field_name": "Nested relationships offered",
      "source_location": "Intake form, question 19a, Respondent answer",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0012"
      ],
      "used_by_artifacts": [
        "HARD_EXCLUSION_CANDIDATES",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0013",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "20",
      "field_name": "Payable-through arrangements offered",
      "source_location": "Intake form, question 20, Respondent answer",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0013"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0014",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S14",
      "field_name": "Services offered",
      "source_location": "Scoping form, field S14, Respondent answer",
      "raw_value": "USD clearing; cross-border payments; trade-related settlement",
      "normalized_value": "USD clearing; cross-border payments; trade-related settlement",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0014"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0015",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S15",
      "field_name": "Nesting permitted",
      "source_location": "Scoping form, field S15, Respondent answer",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0015"
      ],
      "used_by_artifacts": [
        "HARD_EXCLUSION_CANDIDATES",
        "EXCEPTION_SET",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0016",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S16",
      "field_name": "Payable-through permitted",
      "source_location": "Scoping form, field S16, Respondent answer",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0016"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0017",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S19,S20,S21,S22,S23,S24,S25",
      "field_name": "Expected activity baseline",
      "source_location": "Scoping form, fields S19 through S25, Respondent answer",
      "raw_value": "4500 transactions; 850000000 monthly value; 188889 average; United Kingdom, United States, European Economic Area, Singapore; regulated corporate and institutional customers; moderate quarter-end increase; twelve-month forecast",
      "normalized_value": "Monthly count 4500; monthly value 850000000; average 188889; corridors UK/US/EEA/Singapore; regulated corporate and institutional customers",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0017"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0018",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S26",
      "field_name": "Downstream correspondent capability",
      "source_location": "Scoping form, field S26, Respondent answer",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0018"
      ],
      "used_by_artifacts": [
        "EXCEPTION_SET",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0019",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S27",
      "field_name": "Provider prohibition on downstream use",
      "source_location": "Scoping form, field S27, Respondent answer",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0019"
      ],
      "used_by_artifacts": [
        "HARD_EXCLUSION_CANDIDATES",
        "EXCEPTION_SET",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0020",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "22-48",
      "field_name": "AML governance assertions",
      "source_location": "Intake form, questions 22 through 48, Respondent answer",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0020"
      ],
      "used_by_artifacts": [
        "CONTROL_ASSESSMENT",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0021",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "62-80",
      "field_name": "CDD and EDD assertions",
      "source_location": "Intake form, questions 62 through 80, Respondent answer",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0021"
      ],
      "used_by_artifacts": [
        "CONTROL_ASSESSMENT",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0022",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "92-107",
      "field_name": "Adverse-media and sanctions screening assertions",
      "source_location": "Intake form, questions 92 through 107, Respondent answer",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0022"
      ],
      "used_by_artifacts": [
        "CONTROL_ASSESSMENT",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0023",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "49d,49e,76t",
      "field_name": "Correspondent and shell-bank controls",
      "source_location": "Intake form, questions 49d, 49e and 76t, Respondent answer",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0023"
      ],
      "used_by_artifacts": [
        "CONTROL_ASSESSMENT",
        "HARD_EXCLUSION_CANDIDATES",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0024",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S32,S33,S34",
      "field_name": "Evidence package and verification status",
      "source_location": "Scoping form, fields S32 through S34, Respondent answer",
      "raw_value": "Evidence package received YES; COMPLETE_FOR_GATE_1_REVIEW; PENDING_HUMAN_REVIEW",
      "normalized_value": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
      "normalized_type": "ENUM",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0024"
      ],
      "used_by_artifacts": [
        "CONTROL_ASSESSMENT",
        "EXCEPTION_SET",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0025",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S35,S36,S37,S38,S39,S40,S41,S42,S43,S44",
      "field_name": "Internal screening",
      "source_location": "Scoping form, fields S35 through S44, Respondent answer",
      "raw_value": "Complete; no confirmed sanctions match; no material unresolved adverse-media, PEP, or regulatory issue; human review required",
      "normalized_value": "NO_BLOCKING_INTERNAL_SCREENING_ISSUE_IDENTIFIED_PENDING_HUMAN_REVIEW",
      "normalized_type": "ENUM",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0025"
      ],
      "used_by_artifacts": [
        "HARD_EXCLUSION_CANDIDATES",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0026",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S48,S49,S50",
      "field_name": "Relationship restrictions",
      "source_location": "Scoping form, fields S48 through S50, Respondent answer",
      "raw_value": "Nesting PROHIBITED; payable-through PROHIBITED; downstream use PROHIBITED",
      "normalized_value": "NESTING_PAYABLE_THROUGH_AND_DOWNSTREAM_USE_PROHIBITED",
      "normalized_type": "ENUM",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0026"
      ],
      "used_by_artifacts": [
        "HARD_EXCLUSION_CANDIDATES",
        "EXCEPTION_SET",
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0027",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S52",
      "field_name": "Provider approval status",
      "source_location": "Scoping form, field S52, Respondent answer",
      "raw_value": "PENDING_GATE_1",
      "normalized_value": "PENDING_GATE_1",
      "normalized_type": "ENUM",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0027"
      ],
      "used_by_artifacts": [
        "DRAFT_GATE1_PACKET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0028",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "108",
      "field_name": "Independent assurance and audit control assertion",
      "source_location": "Intake form, question 108, Respondent answer",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0028"
      ],
      "used_by_artifacts": [
        "CONTROL_ASSESSMENT",
        "EXCEPTION_SET"
      ]
    }
  ]
}
```

# FACT_SET_JSON

```json
{
  "schema_name": "FACT_SET",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "fact_count": 28,
  "facts": [
    {
      "fact_id": "FACT-0001",
      "fact_category": "RESPONDENT_IDENTITY",
      "fact_statement": "The Respondent Institution states its legal name is Harborview International Bank plc.",
      "raw_value": "Harborview International Bank plc",
      "normalized_value": "Harborview International Bank plc",
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0001"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0002",
      "fact_category": "PROVIDER_IDENTITY_BASELINE",
      "fact_statement": "The Provider Institution records the proposed respondent legal name as Harborview International Bank plc.",
      "raw_value": "Harborview International Bank plc",
      "normalized_value": "Harborview International Bank plc",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0002"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0003",
      "fact_category": "RESPONDENT_JURISDICTION",
      "fact_statement": "The Respondent Institution states that it is incorporated in the United Kingdom.",
      "raw_value": "United Kingdom",
      "normalized_value": "United Kingdom",
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0003"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0004",
      "fact_category": "PROVIDER_JURISDICTION_BASELINE",
      "fact_statement": "The Provider Institution records the respondent country of incorporation as the United Kingdom.",
      "raw_value": "United Kingdom",
      "normalized_value": "United Kingdom",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0004"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0005",
      "fact_category": "RESPONDENT_LEI",
      "fact_statement": "The Respondent Institution supplies LEI 529900SYNTHHARBOR01.",
      "raw_value": "529900SYNTHHARBOR01",
      "normalized_value": "529900SYNTHHARBOR01",
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0005"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0006",
      "fact_category": "PROVIDER_LEI_BASELINE",
      "fact_statement": "The Provider Institution records LEI 529900SYNTHHARBOR01.",
      "raw_value": "529900SYNTHHARBOR01",
      "normalized_value": "529900SYNTHHARBOR01",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0006"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0007",
      "fact_category": "REGULATORY_PROFILE",
      "fact_statement": "The Respondent Institution names the Prudential Regulation Authority and Financial Conduct Authority in the United Kingdom as its primary regulators.",
      "raw_value": "Prudential Regulation Authority and Financial Conduct Authority, United Kingdom",
      "normalized_value": "Prudential Regulation Authority and Financial Conduct Authority, United Kingdom",
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0007"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0008",
      "fact_category": "OWNERSHIP",
      "fact_statement": "The Respondent Institution identifies Harborview Financial Group plc as its ultimate parent.",
      "raw_value": "Harborview Financial Group plc",
      "normalized_value": "Harborview Financial Group plc",
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0008"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0009",
      "fact_category": "OWNERSHIP",
      "fact_statement": "The Respondent Institution states that it has no bearer shares.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0009"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0010",
      "fact_category": "PHYSICAL_PRESENCE",
      "fact_statement": "The Respondent Institution states that it has physical presence.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0010"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0011",
      "fact_category": "SHELL_BANK",
      "fact_statement": "The Respondent Institution states that it is not a shell bank.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0011"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0012",
      "fact_category": "RESPONDENT_SERVICE_CAPABILITY",
      "fact_statement": "The Respondent Institution states that nested relationships are not offered.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0012"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0013",
      "fact_category": "RESPONDENT_SERVICE_CAPABILITY",
      "fact_statement": "The Respondent Institution states that payable-through arrangements are not offered.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0013"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0014",
      "fact_category": "PROPOSED_SERVICE_SCOPE",
      "fact_statement": "The Provider Institution proposes USD clearing, cross-border payments, and trade-related settlement.",
      "raw_value": "USD clearing; cross-border payments; trade-related settlement",
      "normalized_value": "USD clearing; cross-border payments; trade-related settlement",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0014"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0015",
      "fact_category": "PROVIDER_PERMISSION",
      "fact_statement": "The Provider Institution does not permit nesting in the proposed relationship.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0015"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0016",
      "fact_category": "PROVIDER_PERMISSION",
      "fact_statement": "The Provider Institution does not permit payable-through use in the proposed relationship.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0016"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0017",
      "fact_category": "EXPECTED_ACTIVITY",
      "fact_statement": "The Provider Institution records a forecast activity baseline of 4,500 monthly transactions, monthly value 850,000,000, average transaction size 188,889, and corridors involving the United Kingdom, United States, European Economic Area, and Singapore.",
      "raw_value": "4500; 850000000; 188889; United Kingdom; United States; European Economic Area; Singapore",
      "normalized_value": "Monthly count 4500; monthly value 850000000; average 188889; corridors UK/US/EEA/Singapore",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0017"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0018",
      "fact_category": "RESPONDENT_CAPABILITY",
      "fact_statement": "The Provider Institution records that the respondent has downstream correspondent capability.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0018"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0019",
      "fact_category": "PROVIDER_RESTRICTION",
      "fact_statement": "The Provider Institution prohibits downstream use of the proposed relationship.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0019"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0020",
      "fact_category": "CONTROL_ASSERTION_C1",
      "fact_statement": "The Respondent Institution provides affirmative AML and financial-crime governance assertions.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0020"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0021",
      "fact_category": "CONTROL_ASSERTION_C2",
      "fact_statement": "The Respondent Institution provides affirmative CDD and EDD control assertions.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0021"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0022",
      "fact_category": "CONTROL_ASSERTION_C3",
      "fact_statement": "The Respondent Institution provides affirmative adverse-media and sanctions-screening control assertions.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0022"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0023",
      "fact_category": "CONTROL_ASSERTION_C4",
      "fact_statement": "The Respondent Institution provides affirmative correspondent-control and shell-bank prohibition assertions.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0023"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0024",
      "fact_category": "EVIDENCE_STATUS",
      "fact_statement": "The evidence package is listed as provided, but independent verification remains pending human review.",
      "raw_value": "PROVIDED; PENDING_HUMAN_REVIEW",
      "normalized_value": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0024"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0025",
      "fact_category": "INTERNAL_SCREENING",
      "fact_statement": "Provider Institution screening records no confirmed sanctions match and no material unresolved adverse-media, PEP, or regulatory issue, with human review still required.",
      "raw_value": "NO_CONFIRMED_MATCH; NO_MATERIAL_UNRESOLVED_HIT; NO_MATERIAL_UNRESOLVED_ISSUE",
      "normalized_value": "NO_BLOCKING_INTERNAL_SCREENING_ISSUE_IDENTIFIED_PENDING_HUMAN_REVIEW",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0025"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0026",
      "fact_category": "RELATIONSHIP_RESTRICTIONS",
      "fact_statement": "The Provider Institution records nesting, payable-through use, and downstream use as prohibited.",
      "raw_value": "PROHIBITED; PROHIBITED; PROHIBITED",
      "normalized_value": "NESTING_PAYABLE_THROUGH_AND_DOWNSTREAM_USE_PROHIBITED",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0026"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0027",
      "fact_category": "PROCESS_STATUS",
      "fact_statement": "The Provider Institution records the relationship approval status as pending Gate 1.",
      "raw_value": "PENDING_GATE_1",
      "normalized_value": "PENDING_GATE_1",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0027"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0028",
      "fact_category": "INDEPENDENT_ASSURANCE_ASSERTION",
      "fact_statement": "The Respondent Institution provides an affirmative independent-assurance assertion, with the listed evidence still pending human verification.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0028"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    }
  ]
}
```

# MATERIAL_FACT_SET_JSON

```json
{
  "schema_name": "MATERIAL_FACT_SET",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "material_fact_count": 28,
  "facts": [
    {
      "fact_id": "FACT-0001",
      "model_relevance": [
        "F1",
        "F2",
        "F3",
        "F4",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Primary respondent identity."
    },
    {
      "fact_id": "FACT-0002",
      "model_relevance": [
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Provider identity baseline."
    },
    {
      "fact_id": "FACT-0003",
      "model_relevance": [
        "F1",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Respondent jurisdiction."
    },
    {
      "fact_id": "FACT-0004",
      "model_relevance": [
        "F1",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Provider jurisdiction baseline."
    },
    {
      "fact_id": "FACT-0005",
      "model_relevance": [
        "F2",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Respondent LEI."
    },
    {
      "fact_id": "FACT-0006",
      "model_relevance": [
        "F2",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Provider LEI baseline."
    },
    {
      "fact_id": "FACT-0007",
      "model_relevance": [
        "F2",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Regulatory profile."
    },
    {
      "fact_id": "FACT-0008",
      "model_relevance": [
        "F3",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Ultimate-parent identity."
    },
    {
      "fact_id": "FACT-0009",
      "model_relevance": [
        "F3",
        "HARD_EXCLUSION",
        "GATE_1"
      ],
      "materiality_reason": "Bearer-share exposure."
    },
    {
      "fact_id": "FACT-0010",
      "model_relevance": [
        "F4",
        "HARD_EXCLUSION",
        "GATE_1"
      ],
      "materiality_reason": "Physical-presence assertion."
    },
    {
      "fact_id": "FACT-0011",
      "model_relevance": [
        "F4",
        "HARD_EXCLUSION",
        "GATE_1"
      ],
      "materiality_reason": "Shell-bank assertion."
    },
    {
      "fact_id": "FACT-0012",
      "model_relevance": [
        "F5",
        "C4",
        "HARD_EXCLUSION",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Respondent nesting capability."
    },
    {
      "fact_id": "FACT-0013",
      "model_relevance": [
        "F5",
        "C4",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Respondent payable-through capability."
    },
    {
      "fact_id": "FACT-0014",
      "model_relevance": [
        "F5",
        "GATE_1"
      ],
      "materiality_reason": "Proposed services."
    },
    {
      "fact_id": "FACT-0015",
      "model_relevance": [
        "F5",
        "C4",
        "HARD_EXCLUSION",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Provider nesting permission."
    },
    {
      "fact_id": "FACT-0016",
      "model_relevance": [
        "F5",
        "C4",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Provider payable-through permission."
    },
    {
      "fact_id": "FACT-0017",
      "model_relevance": [
        "F1",
        "F5",
        "F6",
        "GATE_1"
      ],
      "materiality_reason": "Expected activity and corridors."
    },
    {
      "fact_id": "FACT-0018",
      "model_relevance": [
        "F5",
        "C4",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Recorded downstream capability."
    },
    {
      "fact_id": "FACT-0019",
      "model_relevance": [
        "F5",
        "C4",
        "HARD_EXCLUSION",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Provider downstream-use prohibition."
    },
    {
      "fact_id": "FACT-0020",
      "model_relevance": [
        "C1",
        "GATE_1"
      ],
      "materiality_reason": "AML governance assertions."
    },
    {
      "fact_id": "FACT-0021",
      "model_relevance": [
        "C2",
        "GATE_1"
      ],
      "materiality_reason": "CDD and EDD assertions."
    },
    {
      "fact_id": "FACT-0022",
      "model_relevance": [
        "C3",
        "GATE_1"
      ],
      "materiality_reason": "Screening-control assertions."
    },
    {
      "fact_id": "FACT-0023",
      "model_relevance": [
        "C4",
        "HARD_EXCLUSION",
        "GATE_1"
      ],
      "materiality_reason": "Correspondent and shell-bank controls."
    },
    {
      "fact_id": "FACT-0024",
      "model_relevance": [
        "C1",
        "C2",
        "C3",
        "C4",
        "GATE_1"
      ],
      "materiality_reason": "Evidence verification boundary."
    },
    {
      "fact_id": "FACT-0025",
      "model_relevance": [
        "F1",
        "F2",
        "HARD_EXCLUSION",
        "GATE_1"
      ],
      "materiality_reason": "Provider internal screening results."
    },
    {
      "fact_id": "FACT-0026",
      "model_relevance": [
        "F5",
        "C4",
        "HARD_EXCLUSION",
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Provider relationship restrictions."
    },
    {
      "fact_id": "FACT-0027",
      "model_relevance": [
        "GATE_1"
      ],
      "materiality_reason": "Pending Gate 1 process status."
    },
    {
      "fact_id": "FACT-0028",
      "model_relevance": [
        "C1",
        "GATE_1"
      ],
      "materiality_reason": "Independent-assurance assertion and verification limitation."
    }
  ]
}
```

# CONTROL_ASSESSMENT_JSON

```json
{
  "schema_name": "CONTROL_ASSESSMENT",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "assessment_count": 4,
  "assessments": [
    {
      "control_domain": "C1",
      "assessment_id": "CTL-0001",
      "related_fact_ids": [
        "FACT-0020",
        "FACT-0024",
        "FACT-0028"
      ],
      "assertion_summary": "The Respondent Institution provides affirmative AML governance, risk-assessment, audit, and related control assertions. Supporting files are listed as provided.",
      "evidence_status": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
      "limitations": [
        "Verification status remains PENDING_HUMAN_REVIEW.",
        "Affirmative questionnaire answers do not establish control design or operating effectiveness.",
        "No approved human-verification record is present."
      ],
      "open_human_actions": [
        "Verify the supplied AML policy, risk assessment, and assurance materials.",
        "Confirm the scope, currency, issuer, and authenticity of the independent-assurance material.",
        "Determine whether evidence supports the relevant C1 assertions."
      ]
    },
    {
      "control_domain": "C2",
      "assessment_id": "CTL-0002",
      "related_fact_ids": [
        "FACT-0021",
        "FACT-0024"
      ],
      "assertion_summary": "The Respondent Institution provides affirmative CDD, EDD, beneficial-ownership, and periodic-review assertions, with supporting procedures listed as provided.",
      "evidence_status": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
      "limitations": [
        "Verification status remains PENDING_HUMAN_REVIEW.",
        "The supplied procedure has not been confirmed as current, complete, or operating effectively.",
        "Affirmative answers remain Respondent Institution assertions."
      ],
      "open_human_actions": [
        "Verify the CDD and EDD procedure and its approval status.",
        "Confirm beneficial-ownership and periodic-review coverage.",
        "Determine whether the evidence supports the relevant C2 assertions."
      ]
    },
    {
      "control_domain": "C3",
      "assessment_id": "CTL-0003",
      "related_fact_ids": [
        "FACT-0022",
        "FACT-0024",
        "FACT-0025"
      ],
      "assertion_summary": "The Respondent Institution provides affirmative sanctions, PEP, and adverse-media screening assertions. Provider Institution screening records no material unresolved result, subject to human review.",
      "evidence_status": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
      "limitations": [
        "Respondent screening evidence and Provider Institution screening results have not received approved human verification.",
        "Provider screening addresses onboarding results and does not prove Respondent Institution control effectiveness.",
        "List coverage, update cadence, configuration, and alert disposition require review."
      ],
      "open_human_actions": [
        "Verify screening policies, system configuration, list coverage, and update cadence.",
        "Review the Provider Institution screening report and its limitations.",
        "Determine whether evidence supports the relevant C3 assertions."
      ]
    },
    {
      "control_domain": "C4",
      "assessment_id": "CTL-0004",
      "related_fact_ids": [
        "FACT-0012",
        "FACT-0013",
        "FACT-0015",
        "FACT-0016",
        "FACT-0018",
        "FACT-0019",
        "FACT-0023",
        "FACT-0024",
        "FACT-0026"
      ],
      "assertion_summary": "The Respondent Institution provides affirmative shell-bank and correspondent-control assertions. The Provider Institution prohibits nesting, payable-through use, and downstream use for the proposed relationship.",
      "evidence_status": "PROVIDED_NOT_INDEPENDENTLY_VERIFIED",
      "limitations": [
        "Respondent capability and Provider Institution permission are separate perspectives.",
        "The Provider Institution restriction does not by itself demonstrate that technical and operational enforcement is effective.",
        "Supporting policy and restriction documentation remain pending human verification."
      ],
      "open_human_actions": [
        "Verify the Respondent Institution correspondent-banking policy and shell-bank controls.",
        "Confirm that contractual, operational, and monitoring controls enforce the Provider Institution restrictions.",
        "Resolve the recorded downstream-capability review point before Gate 1 completion."
      ]
    }
  ]
}
```

# CANDIDATE_INDICATOR_SET_JSON

```json
{
  "schema_name": "CANDIDATE_INDICATOR_SET",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "mapping_version": "1.0.0",
  "indicator_count": 0,
  "indicators": []
}
```

# HARD_EXCLUSION_CANDIDATES_JSON

```json
{
  "schema_name": "HARD_EXCLUSION_CANDIDATES",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "candidate_count": 4,
  "candidates": [
    {
      "hard_exclusion_candidate_id": "HEX-0001",
      "exclusion_rule_id": "SHELL_BANK",
      "status": "NOT_TRIGGERED",
      "source_fact_ids": [
        "FACT-0007",
        "FACT-0008",
        "FACT-0010",
        "FACT-0011"
      ],
      "reason": "Available respondent assertions record physical presence, a named regulator, an identified parent, and a negative shell-bank response. These facts remain subject to human verification.",
      "required_human_action": "Verify physical presence, regulatory affiliation, and group affiliation before relying on this candidate status."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0002",
      "exclusion_rule_id": "DOWNSTREAM_SHELL_BANK_EXPOSURE",
      "status": "NOT_TRIGGERED",
      "source_fact_ids": [
        "FACT-0012",
        "FACT-0015",
        "FACT-0018",
        "FACT-0019",
        "FACT-0023",
        "FACT-0026"
      ],
      "reason": "The proposed relationship prohibits nesting and downstream use. A recorded downstream capability creates a review point but does not establish that downstream relationships are permitted through the proposed account.",
      "required_human_action": "Confirm contractual and operational enforcement of the downstream-use prohibition and verify the respondent identification procedures."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0003",
      "exclusion_rule_id": "COMPREHENSIVELY_SANCTIONED_PRESENCE",
      "status": "UNKNOWN",
      "source_fact_ids": [
        "FACT-0003",
        "FACT-0004",
        "FACT-0017",
        "FACT-0025"
      ],
      "reason": "The available material facts identify incorporation and expected corridors, but the case workbook field aligned to question 108 is an independent-assurance assertion rather than a dedicated comprehensively sanctioned-presence answer.",
      "required_human_action": "Confirm the respondent geographic-presence data and perform the required sanctioned-jurisdiction determination using the controlled Provider Institution process."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0004",
      "exclusion_rule_id": "RESPONDENT_BANK_CATEGORY_PROHIBITED",
      "status": "UNKNOWN",
      "source_fact_ids": [
        "FACT-0023"
      ],
      "reason": "The respondent records a shell-bank prohibition, but the available material facts do not establish that it prohibits its own respondent-bank category while seeking the proposed relationship.",
      "required_human_action": "Review the prohibited-customer and prohibited-relationship taxonomy to determine whether an internal category inconsistency exists."
    }
  ]
}
```

# EXCEPTION_SET_JSON

```json
{
  "schema_name": "EXCEPTION_SET",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "exception_count": 4,
  "exceptions": [
    {
      "exception_id": "EXC-0001",
      "exception_type": "MAPPING_GAP",
      "severity": "MEDIUM",
      "related_fact_ids": [
        "FACT-0003",
        "FACT-0007",
        "FACT-0008",
        "FACT-0009",
        "FACT-0010",
        "FACT-0011",
        "FACT-0012",
        "FACT-0013",
        "FACT-0014",
        "FACT-0017",
        "FACT-0020",
        "FACT-0021",
        "FACT-0022",
        "FACT-0023"
      ],
      "material_source_reference_ids": [
        "MSR-0003",
        "MSR-0007",
        "MSR-0008",
        "MSR-0009",
        "MSR-0010",
        "MSR-0011",
        "MSR-0012",
        "MSR-0013",
        "MSR-0014",
        "MSR-0017",
        "MSR-0020",
        "MSR-0021",
        "MSR-0022",
        "MSR-0023"
      ],
      "finding": "No exact active approved mapping rule applies to these material facts. The approved catalog rules target RP-11, RP-12, RP-13, EO-04, AM-10, and MR-05, and none of those exact source field identifiers is present in the designated case-workbook answers.",
      "required_action": "Risk Model Owner must add and approve exact mappings if these facts are intended to create candidate indicators. Do not approximate or invent mappings.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0002",
      "exception_type": "MATERIAL_REVIEW_POINT",
      "severity": "MEDIUM",
      "related_fact_ids": [
        "FACT-0012",
        "FACT-0015",
        "FACT-0018",
        "FACT-0019",
        "FACT-0026"
      ],
      "material_source_reference_ids": [
        "MSR-0012",
        "MSR-0015",
        "MSR-0018",
        "MSR-0019",
        "MSR-0026"
      ],
      "finding": "The standalone scoping form records downstream correspondent capability while the Provider Institution prohibits downstream use, nesting, and payable-through use. These values represent capability and Provider Institution permission rather than an automatic contradiction.",
      "required_action": "Confirm that contractual, technical, operational, and monitoring controls enforce the restrictions for the proposed relationship.",
      "blocking": false
    },
    {
      "exception_id": "EXC-0003",
      "exception_type": "EVIDENCE_GAP",
      "severity": "MEDIUM",
      "related_fact_ids": [
        "FACT-0020",
        "FACT-0021",
        "FACT-0022",
        "FACT-0023",
        "FACT-0024",
        "FACT-0028"
      ],
      "material_source_reference_ids": [
        "MSR-0020",
        "MSR-0021",
        "MSR-0022",
        "MSR-0023",
        "MSR-0024",
        "MSR-0028"
      ],
      "finding": "Control evidence is listed as provided, but all verification remains PENDING_HUMAN_REVIEW. No control assertion qualifies as supported by approved human verification.",
      "required_action": "Complete authenticity, currency, scope, and substantive human review of the supplied evidence before changing evidence status.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0004",
      "exception_type": "MISSING_INFORMATION",
      "severity": "HIGH",
      "related_fact_ids": [
        "FACT-0003",
        "FACT-0004",
        "FACT-0017",
        "FACT-0025"
      ],
      "material_source_reference_ids": [
        "MSR-0003",
        "MSR-0004",
        "MSR-0017",
        "MSR-0025"
      ],
      "finding": "A dedicated source answer establishing whether the respondent has physical presence in a comprehensively sanctioned jurisdiction was not identified in the designated material answers. Question 108 in the supplied CBDDQ case workbook represents an independent-assurance assertion.",
      "required_action": "Obtain or confirm the sanctioned-presence determination through the Provider Institution controlled screening process before Gate 1 completion.",
      "blocking": true
    }
  ]
}
```

# PACKAGE_MANIFEST_JSON

```json
{
  "schema_name": "PACKAGE_MANIFEST",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "packet_version": "1.1.0",
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "risk_model_version": "0.1",
  "mapping_version": "1.0.0",
  "artifacts": [
    {
      "artifact_id": "ART-RUN-HEADER-001",
      "artifact_type": "RUN_HEADER",
      "schema_version": "1.1.0",
      "record_count": 1,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-INPUT-VALIDATION-001",
      "artifact_type": "INPUT_VALIDATION_RESULT",
      "schema_version": "1.1.0",
      "record_count": 1,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-DRAFT-PACKET-001",
      "artifact_type": "DRAFT_GATE1_PACKET",
      "schema_version": "1.1.0",
      "record_count": 1,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-MATERIAL-REFERENCES-001",
      "artifact_type": "MATERIAL_SOURCE_REFERENCES",
      "schema_version": "1.1.0",
      "record_count": 28,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-FACT-SET-001",
      "artifact_type": "FACT_SET",
      "schema_version": "1.1.0",
      "record_count": 28,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-MATERIAL-FACTS-001",
      "artifact_type": "MATERIAL_FACT_SET",
      "schema_version": "1.1.0",
      "record_count": 28,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-CONTROLS-001",
      "artifact_type": "CONTROL_ASSESSMENT",
      "schema_version": "1.1.0",
      "record_count": 4,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-CANDIDATES-001",
      "artifact_type": "CANDIDATE_INDICATOR_SET",
      "schema_version": "1.1.0",
      "record_count": 0,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-HARD-EXCLUSIONS-001",
      "artifact_type": "HARD_EXCLUSION_CANDIDATES",
      "schema_version": "1.1.0",
      "record_count": 4,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-EXCEPTIONS-001",
      "artifact_type": "EXCEPTION_SET",
      "schema_version": "1.1.0",
      "record_count": 4,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-RECEIPT-001",
      "artifact_type": "INTAKE_AGENT_RECEIPT",
      "schema_version": "1.1.0",
      "record_count": 1,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-FINAL-CHECK-001",
      "artifact_type": "FINAL_SELF_CHECK",
      "schema_version": "1.1.0",
      "record_count": 1,
      "status": "CREATED",
      "required": true
    }
  ],
  "declared_counts": {
    "material_source_references": 28,
    "facts": 28,
    "material_facts": 28,
    "control_assessments": 4,
    "candidate_indicators": 0,
    "hard_exclusion_candidates": 4,
    "exceptions": 4
  },
  "exhaustive_source_register_owner": "CG_NODE_VALIDATOR",
  "exhaustive_source_register_created": false,
  "deterministic_validation_executed": false,
  "prohibited_output_check": "PASS",
  "limitations": [
    "The manifest records semantic artifacts created across Parts 1 and 2.",
    "The external Node.js validator will create the exhaustive Source Register.",
    "Deterministic validation has not yet executed.",
    "The package contains open blocking and nonblocking exceptions.",
    "No candidate indicators were generated because no exact approved mapping rule applied."
  ]
}
```

# INTAKE_AGENT_RECEIPT_JSON

```json
{
  "schema_name": "INTAKE_AGENT_RECEIPT",
  "schema_version": "1.1.0",
  "receipt_id": "CGIA-RCPT-CG-RUN-HP-002",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "component_code": "CGIA",
  "component_name": "CG Intake Analyzer",
  "component_version": "7.0.0",
  "platform": "Microsoft 365 Copilot Agent Builder",
  "status": "COMPLETE_WITH_FINDINGS",
  "input_files": [
    "CG_CBDDQ_Synthetic_HP-002.xlsx",
    "CG_Relationship-Scoping_Synthetic_HP-002.xlsx"
  ],
  "reference_files": [
    "CG_CBDDQ_Field_Dictionary_v1.0.0.docx",
    "CG_Relationship_Scoping_Field_Dictionary_v1.0.0.docx",
    "CG_Semantic_Output_Schemas_v1.1.0.md",
    "risk-model.xlsx",
    "approved_mapping_catalog_v1.0.0.json",
    "draft_gate1_packet_schema_v1.1.0.md"
  ],
  "output_artifact_ids": [
    "ART-RUN-HEADER-001",
    "ART-INPUT-VALIDATION-001",
    "ART-DRAFT-PACKET-001",
    "ART-MATERIAL-REFERENCES-001",
    "ART-FACT-SET-001",
    "ART-MATERIAL-FACTS-001",
    "ART-CONTROLS-001",
    "ART-CANDIDATES-001",
    "ART-HARD-EXCLUSIONS-001",
    "ART-EXCEPTIONS-001",
    "ART-RECEIPT-001",
    "ART-FINAL-CHECK-001"
  ],
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "semantic_artifact_counts": {
    "material_source_references": 28,
    "facts": 28,
    "material_facts": 28,
    "control_assessments": 4,
    "candidate_indicators": 0,
    "hard_exclusion_candidates": 4,
    "exceptions": 4
  },
  "open_exception_ids": [
    "EXC-0001",
    "EXC-0002",
    "EXC-0003",
    "EXC-0004"
  ],
  "blocking_exception_ids": [
    "EXC-0001",
    "EXC-0003",
    "EXC-0004"
  ],
  "nonblocking_exception_ids": [
    "EXC-0002"
  ],
  "exhaustive_source_register_created": false,
  "exhaustive_source_register_owner": "CG_NODE_VALIDATOR",
  "deterministic_validation_executed": false,
  "prohibited_action_check": "PASS",
  "created_on": "2026-10-12T20:31:01Z",
  "errors": [],
  "warnings": [
    "No candidate indicators were generated because no exact active approved mapping rule applied.",
    "Two hard-exclusion candidates remain UNKNOWN.",
    "Evidence remains provided but not independently verified.",
    "Three exceptions are blocking.",
    "The package requires external Node.js deterministic validation and human Gate 1 review."
  ]
}
```

# FINAL_SELF_CHECK

```json
{
  "schema_name": "FINAL_SELF_CHECK",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "status": "PASS",
  "checks": {
    "required_sections_present": true,
    "case_run_ids_consistent": true,
    "versions_present": true,
    "part_1_artifacts_used_without_workbook_reread": true,
    "part_1_material_references_unchanged": true,
    "part_1_fact_ids_unchanged": true,
    "part_1_fact_statements_unchanged": true,
    "part_1_normalized_values_unchanged": true,
    "part_1_control_assessments_unchanged": true,
    "part_1_candidate_values_unchanged": true,
    "part_1_hard_exclusion_statuses_unchanged": true,
    "part_1_exception_ids_unchanged": true,
    "part_1_exception_blocking_statuses_unchanged": true,
    "material_references_complete": true,
    "material_facts_in_fact_set": true,
    "exceptions_visible_in_packet": true,
    "all_open_exceptions_included": true,
    "candidate_mappings_use_catalog": true,
    "semantic_counts_reconciled": true,
    "gate_1_decision_blank": true,
    "packet_status_correct": true,
    "exhaustive_source_register_absent": true,
    "exhaustive_source_register_assigned_to_node_validator": true,
    "deterministic_validation_not_executed": true,
    "deterministic_validation_not_claimed": true,
    "official_score_absent": true,
    "factor_weights_absent": true,
    "control_multipliers_absent": true,
    "risk_band_absent": true,
    "approval_rejection_absent": true,
    "recommendation_absent": true,
    "scoring_authorization_absent": true
  },
  "reconciled_counts": {
    "material_source_references": {
      "part_1_declared": 28,
      "package_manifest_declared": 28,
      "reconciled": true
    },
    "facts": {
      "part_1_declared": 28,
      "package_manifest_declared": 28,
      "reconciled": true
    },
    "material_facts": {
      "part_1_declared": 28,
      "package_manifest_declared": 28,
      "reconciled": true
    },
    "control_assessments": {
      "part_1_declared": 4,
      "package_manifest_declared": 4,
      "reconciled": true
    },
    "candidate_indicators": {
      "part_1_declared": 0,
      "package_manifest_declared": 0,
      "reconciled": true
    },
    "hard_exclusion_candidates": {
      "part_1_declared": 4,
      "package_manifest_declared": 4,
      "reconciled": true
    },
    "exceptions": {
      "part_1_declared": 4,
      "package_manifest_declared": 4,
      "reconciled": true
    }
  },
  "errors": [],
  "warnings": [
    "The package contains three blocking exceptions and one nonblocking exception.",
    "No candidate indicators were generated because no exact approved mapping rule applied.",
    "Two hard-exclusion candidates remain UNKNOWN.",
    "Evidence remains pending human verification.",
    "The external Node.js validator must create the exhaustive Source Register and execute deterministic validation."
  ]
}
```
