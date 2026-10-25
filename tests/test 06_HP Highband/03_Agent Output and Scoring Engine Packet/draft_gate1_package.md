# Configuration 7 Validator Package

## RUN_HEADER

```json
{
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "packet_version": "1.1.0",
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "risk_model_version": "0.1",
  "mapping_version": "1.1.0",
  "output_schema_version": "1.1.0",
  "created_by_component": "CG_INTAKE_ANALYZER",
  "created_on": "2026-10-25T20:06:00Z",
  "data_classification": "SYNTHETIC"
}
```

## INPUT_VALIDATION_RESULT

```json
{
  "status": "READY_FOR_INTAKE_ANALYSIS",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "files_received": [
    "CG_CBDDQ_Field_Dictionary_v1.0.0.docx",
    "CG_Relationship_Scoping_Field_Dictionary_v1.0.0.docx",
    "CG_Semantic_Output_Schemas_v1.1.0.md",
    "risk-model.xlsx",
    "approved_mapping_catalog_v1.1.0.json",
    "draft_gate1_packet_schema_v1.1.0.md",
    "CG_CBDDQ_Synthetic_HP-002.xlsx",
    "CG_Relationship-Scoping_Synthetic_HP-002.xlsx"
  ],
  "required_files_missing": [],
  "obsolete_files_detected": [],
  "identity_checks": [
    {
      "field": "LEGAL_NAME",
      "provider_value": "Meridian Frontier Commercial Bank plc",
      "respondent_value": "Meridian Frontier Commercial Bank plc",
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
      "provider_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "respondent_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "result": "MATCH"
    },
    {
      "field": "PARENT",
      "provider_value": "Meridian Financial Holdings Ltd - privately held through four intermediate holding companies",
      "respondent_value": "Meridian Financial Holdings Ltd - four intermediate ownership layers; beneficial-owner identifiers not independently verifiable",
      "result": "MATCH"
    },
    {
      "field": "REGULATOR",
      "provider_value": "Meridian Banking Supervisory Authority (synthetic); 2025 AML supervisory action disclosed without closure detail",
      "respondent_value": "Meridian Banking Supervisory Authority (synthetic)",
      "result": "MATCH"
    }
  ],
  "errors": []
}
```

## EXECUTIVE_INTAKE_SUMMARY

```json
{
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "summary": "The registered synthetic case inputs passed intake validation. Part 1 records matched core identity fields, six PENDING_GATE_1 candidate indicators, four control assessments, four hard-exclusion candidates, and six open exceptions. The package remains subject to human Gate 1 review and external deterministic validation.",
  "respondent_profile": "Meridian Frontier Commercial Bank plc is recorded with matching legal name, country, LEI, parent, and regulator identity checks across the respondent and Provider Institution sources.",
  "relationship_scope": "The Provider Institution records correspondent clearing and related cross-border services, prohibits nesting, payable-through access, and downstream use, while the respondent/downstream capability remains a material review point.",
  "material_findings": [
    "A disclosed 2025 AML supervisory action lacks verified closure detail.",
    "The ownership chain and beneficial-owner identifiers require verification.",
    "Material adverse media requires human review.",
    "Activity estimates require validation.",
    "Unmapped material facts remain visible as a blocking mapping gap."
  ],
  "decision_boundary": "No Gate 1 decision, scoring authorization, score, risk band, recommendation, approval, or rejection is included. Node.js will create the exhaustive Source Register. Deterministic validation has not run."
}
```

## DRAFT_GATE1_PACKET

```json
{
  "schema_name": "DRAFT_GATE1_PACKET",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "packet_version": "1.1.0",
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "run_and_case_header": {
    "case_id": "CG-CASE-HP-002",
    "run_id": "CG-RUN-HP-002",
    "packet_version": "1.1.0",
    "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
    "risk_model_version": "0.1",
    "mapping_version": "1.1.0",
    "output_schema_version": "1.1.0",
    "created_by_component": "CG_INTAKE_ANALYZER",
    "created_on": "2026-10-25T20:06:00Z",
    "data_classification": "SYNTHETIC"
  },
  "respondent_institution_profile": {
    "legal_name": {
      "value": "Meridian Frontier Commercial Bank plc",
      "fact_ids": [
        "FACT-0001",
        "FACT-0002"
      ]
    },
    "jurisdiction": {
      "value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "fact_ids": [
        "FACT-0003",
        "FACT-0004"
      ]
    },
    "lei": {
      "value": "529900SYNTHHARBOR01",
      "fact_ids": [
        "FACT-0005",
        "FACT-0006"
      ]
    },
    "parent": {
      "value": "Meridian Financial Holdings Ltd through four intermediate holding companies; beneficial-owner identifiers remain unverified",
      "fact_ids": [
        "FACT-0011",
        "FACT-0012"
      ]
    },
    "regulator_and_licensing": {
      "value": "Meridian Banking Supervisory Authority (synthetic); active licence with disclosed 2025 AML supervisory action lacking verified closure detail",
      "fact_ids": [
        "FACT-0007",
        "FACT-0008",
        "FACT-0009"
      ]
    },
    "ownership": {
      "value": "Not publicly traded; bearer shares stated absent",
      "fact_ids": [
        "FACT-0010",
        "FACT-0013"
      ]
    },
    "physical_presence": {
      "value": "Physical presence asserted; shell-bank status stated No",
      "fact_ids": [
        "FACT-0014",
        "FACT-0015"
      ]
    }
  },
  "proposed_relationship_scope": {
    "services": {
      "value": "Correspondent clearing; cross-border payments; virtual-asset settlement; remote deposit capture; hold-mail services",
      "fact_ids": [
        "FACT-0019"
      ]
    },
    "respondent_or_downstream_capability": {
      "value": "Present",
      "fact_ids": [
        "FACT-0016",
        "FACT-0034"
      ]
    },
    "nesting_permission": {
      "value": "Not permitted",
      "fact_ids": [
        "FACT-0017",
        "FACT-0020"
      ]
    },
    "payable_through_permission": {
      "value": "Not permitted",
      "fact_ids": [
        "FACT-0018",
        "FACT-0021"
      ]
    },
    "provider_downstream_restriction": {
      "value": "Prohibited",
      "fact_ids": [
        "FACT-0035"
      ]
    }
  },
  "activity_and_corridors": {
    "expected_monthly_transaction_count": {
      "value": 18000,
      "fact_ids": [
        "FACT-0024"
      ]
    },
    "expected_monthly_transaction_value": {
      "value": 4200000000,
      "fact_ids": [
        "FACT-0025"
      ]
    },
    "expected_corridors": {
      "value": "Republic of Meridian; offshore financial centres; Middle East; East Africa; Southeast Asia",
      "fact_ids": [
        "FACT-0023"
      ]
    },
    "expected_customer_types": {
      "value": "Predominantly non-resident financial institutions, MSBs/MVTS, virtual-asset service providers, PEP-linked corporates, and private-banking customers",
      "fact_ids": [
        "FACT-0022"
      ]
    },
    "estimate_basis": {
      "value": "Management estimate; limited historical data and no independent validation supplied",
      "fact_ids": [
        "FACT-0026"
      ]
    }
  },
  "control_assessment_c1_c4": [
    {
      "control_domain": "C1",
      "assessment_id": "CTL-0001",
      "related_fact_ids": [
        "FACT-0027",
        "FACT-0031"
      ],
      "assertion_summary": "Respondent asserts AML/CTF governance and risk-assessment controls are present.",
      "evidence_status": "SUPPORTED_BY_APPROVED_HUMAN_VERIFICATION",
      "limitations": [
        "Verification is explicitly limited to synthetic QA execution and is not operational approval or proof of operating effectiveness."
      ],
      "open_human_actions": [
        "Confirm evidence scope, currency, authenticity, and operating effectiveness during human Gate 1 review."
      ]
    },
    {
      "control_domain": "C2",
      "assessment_id": "CTL-0002",
      "related_fact_ids": [
        "FACT-0028",
        "FACT-0031"
      ],
      "assertion_summary": "Respondent asserts CDD and EDD controls are present.",
      "evidence_status": "SUPPORTED_BY_APPROVED_HUMAN_VERIFICATION",
      "limitations": [
        "Verification is explicitly limited to synthetic QA execution and is not operational approval or proof of operating effectiveness."
      ],
      "open_human_actions": [
        "Confirm evidence scope, currency, authenticity, and operating effectiveness during human Gate 1 review."
      ]
    },
    {
      "control_domain": "C3",
      "assessment_id": "CTL-0003",
      "related_fact_ids": [
        "FACT-0029",
        "FACT-0031"
      ],
      "assertion_summary": "Respondent asserts sanctions-screening controls are present.",
      "evidence_status": "SUPPORTED_BY_APPROVED_HUMAN_VERIFICATION",
      "limitations": [
        "Verification is explicitly limited to synthetic QA execution and is not operational approval or proof of operating effectiveness."
      ],
      "open_human_actions": [
        "Confirm evidence scope, currency, authenticity, and operating effectiveness during human Gate 1 review."
      ]
    },
    {
      "control_domain": "C4",
      "assessment_id": "CTL-0004",
      "related_fact_ids": [
        "FACT-0030",
        "FACT-0031"
      ],
      "assertion_summary": "Respondent asserts a shell-bank prohibition control.",
      "evidence_status": "SUPPORTED_BY_APPROVED_HUMAN_VERIFICATION",
      "limitations": [
        "Verification is explicitly limited to synthetic QA execution and is not operational approval or proof of operating effectiveness."
      ],
      "open_human_actions": [
        "Confirm evidence scope, currency, authenticity, and operating effectiveness during human Gate 1 review."
      ]
    }
  ],
  "evidence_status_and_limitations": {
    "synthetic_qa_verification_fact_ids": [
      "FACT-0031"
    ],
    "limitations_fact_ids": [
      "FACT-0036"
    ],
    "statement": "Synthetic QA verification is not operational approval or proof of control design or operating effectiveness. Ownership identifiers, regulatory remediation closure, source freshness, and activity estimates require human review."
  },
  "candidate_indicators_f1_f6": [
    {
      "candidate_indicator_id": "IND-F1-MAP-F1-CBDDQ-2-NOTIN-001",
      "indicator_id": "JURISDICTION_OUTSIDE_MAINTAINED_MEMBER_LIST",
      "target_model_area": "F1",
      "candidate_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "value_type": "TEXT",
      "source_fact_ids": [
        "FACT-0003"
      ],
      "mapping_rule_id": "MAP-F1-CBDDQ-2-NOTIN-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    },
    {
      "candidate_indicator_id": "IND-F2-MAP-F2-CBDDQ-13-CONTAINS-ACTION-001",
      "indicator_id": "OPEN_OR_UNVERIFIED_SUPERVISORY_ACTION",
      "target_model_area": "F2",
      "candidate_value": "ACTIVE; 2025 AML supervisory action disclosed; closure and resolution detail not supplied",
      "value_type": "TEXT",
      "source_fact_ids": [
        "FACT-0008"
      ],
      "mapping_rule_id": "MAP-F2-CBDDQ-13-CONTAINS-ACTION-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    },
    {
      "candidate_indicator_id": "IND-F3-MAP-F3-CBDDQ-6-NO-001",
      "indicator_id": "PRIVATELY_HELD",
      "target_model_area": "F3",
      "candidate_value": false,
      "value_type": "BOOLEAN",
      "source_fact_ids": [
        "FACT-0010"
      ],
      "mapping_rule_id": "MAP-F3-CBDDQ-6-NO-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    },
    {
      "candidate_indicator_id": "IND-F4-MAP-F4-CBDDQ-17-YES-001",
      "indicator_id": "PHYSICAL_PRESENCE_ASSERTED",
      "target_model_area": "F4",
      "candidate_value": true,
      "value_type": "BOOLEAN",
      "source_fact_ids": [
        "FACT-0014"
      ],
      "mapping_rule_id": "MAP-F4-CBDDQ-17-YES-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    },
    {
      "candidate_indicator_id": "IND-F5-MAP-F5-CBDDQ-19-YES-001",
      "indicator_id": "RESPONDENT_BANK_USE_PERMITTED",
      "target_model_area": "F5",
      "candidate_value": true,
      "value_type": "BOOLEAN",
      "source_fact_ids": [
        "FACT-0016"
      ],
      "mapping_rule_id": "MAP-F5-CBDDQ-19-YES-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    },
    {
      "candidate_indicator_id": "IND-F6-MAP-F6-SCOPE-S23-NOTCONTAINS-001",
      "indicator_id": "CUSTOMER_BASE_NOT_LIMITED_TO_REGULATED_COUNTERPARTIES",
      "target_model_area": "F6",
      "candidate_value": "Predominantly non-resident financial institutions, MSBs/MVTS, virtual-asset service providers, PEP-linked corporates, and private-banking customers",
      "value_type": "TEXT",
      "source_fact_ids": [
        "FACT-0022"
      ],
      "mapping_rule_id": "MAP-F6-SCOPE-S23-NOTCONTAINS-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    }
  ],
  "hard_exclusion_candidates": [
    {
      "hard_exclusion_candidate_id": "HEX-0001",
      "exclusion_rule_id": "SHELL_BANK",
      "status": "NOT_TRIGGERED",
      "source_fact_ids": [
        "FACT-0014",
        "FACT-0015"
      ],
      "reason": "Physical presence is asserted and the respondent states it is not a shell bank; human verification remains required.",
      "required_human_action": "Verify physical presence and regulated-group affiliation before Gate 1 disposition."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0002",
      "exclusion_rule_id": "DOWNSTREAM_SHELL_BANK_EXPOSURE",
      "status": "POSSIBLE",
      "source_fact_ids": [
        "FACT-0016",
        "FACT-0034",
        "FACT-0035"
      ],
      "reason": "Downstream capability is present, while the Provider Institution prohibits downstream use; enforceability and identification controls require review.",
      "required_human_action": "Confirm contractual prohibition, monitoring, and downstream identification procedures."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0003",
      "exclusion_rule_id": "COMPREHENSIVELY_SANCTIONED_PRESENCE",
      "status": "UNKNOWN",
      "source_fact_ids": [
        "FACT-0003",
        "FACT-0023",
        "FACT-0033"
      ],
      "reason": "No confirmed sanctions match is recorded, but the supplied semantic fields do not establish a governed comprehensive-sanctions determination for every presence and corridor.",
      "required_human_action": "Confirm jurisdiction and presence screening against governed lists at Gate 1."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0004",
      "exclusion_rule_id": "RESPONDENT_BANK_CATEGORY_PROHIBITED",
      "status": "NOT_TRIGGERED",
      "source_fact_ids": [
        "FACT-0015",
        "FACT-0030"
      ],
      "reason": "The respondent states it is not a shell bank and asserts a shell-bank prohibition control.",
      "required_human_action": "Confirm the prohibition applies to the proposed relationship and downstream usage."
    }
  ],
  "contradictions_exceptions_and_missing_information": [
    {
      "exception_id": "EXC-0001",
      "exception_type": "MATERIAL_REVIEW_POINT",
      "severity": "HIGH",
      "related_fact_ids": [
        "FACT-0016",
        "FACT-0034",
        "FACT-0035"
      ],
      "material_source_reference_ids": [
        "MSR-0016",
        "MSR-0034",
        "MSR-0035"
      ],
      "finding": "Respondent/downstream capability exists while the Provider Institution prohibits downstream use. This is a governance and enforceability review point, not automatically a contradiction.",
      "required_action": "Confirm contractual restriction, technical controls, monitoring, and breach escalation before Gate 1 disposition.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0002",
      "exception_type": "EVIDENCE_GAP",
      "severity": "HIGH",
      "related_fact_ids": [
        "FACT-0008",
        "FACT-0009",
        "FACT-0036"
      ],
      "material_source_reference_ids": [
        "MSR-0008",
        "MSR-0009",
        "MSR-0036"
      ],
      "finding": "A 2025 AML supervisory action is disclosed, but closure and resolution detail remains unverified in the Provider screening limitations.",
      "required_action": "Obtain and human-review authoritative remediation closure evidence.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0003",
      "exception_type": "EVIDENCE_GAP",
      "severity": "HIGH",
      "related_fact_ids": [
        "FACT-0011",
        "FACT-0012",
        "FACT-0036"
      ],
      "material_source_reference_ids": [
        "MSR-0011",
        "MSR-0012",
        "MSR-0036"
      ],
      "finding": "The ownership chain includes four intermediate layers and beneficial-owner identifiers remain unverified.",
      "required_action": "Verify the complete ownership chain and beneficial-owner identifiers.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0004",
      "exception_type": "MATERIAL_REVIEW_POINT",
      "severity": "HIGH",
      "related_fact_ids": [
        "FACT-0032"
      ],
      "material_source_reference_ids": [
        "MSR-0032"
      ],
      "finding": "Internal adverse-media screening identifies material adverse media requiring human review.",
      "required_action": "Review the underlying adverse-media records, relevance, recency, disposition, and remediation context.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0005",
      "exception_type": "EVIDENCE_GAP",
      "severity": "MEDIUM",
      "related_fact_ids": [
        "FACT-0024",
        "FACT-0025",
        "FACT-0026"
      ],
      "material_source_reference_ids": [
        "MSR-0024",
        "MSR-0025",
        "MSR-0026"
      ],
      "finding": "High-volume activity estimates are management estimates based on limited historical data and lack independent validation.",
      "required_action": "Validate expected volumes, values, currencies, corridor assumptions, and monitoring thresholds.",
      "blocking": false
    },
    {
      "exception_id": "EXC-0006",
      "exception_type": "MAPPING_GAP",
      "severity": "MEDIUM",
      "related_fact_ids": [
        "FACT-0011",
        "FACT-0013",
        "FACT-0017",
        "FACT-0018",
        "FACT-0019",
        "FACT-0020",
        "FACT-0021",
        "FACT-0023"
      ],
      "material_source_reference_ids": [
        "MSR-0011",
        "MSR-0013",
        "MSR-0017",
        "MSR-0018",
        "MSR-0019",
        "MSR-0020",
        "MSR-0021",
        "MSR-0023"
      ],
      "finding": "These material facts have no active exact mapping rule in approved_mapping_catalog_v1.1.0.json and were not converted into candidate indicators.",
      "required_action": "Human Gate 1 review must retain these facts and raise UNMAPPED_FACT if a governed candidate is required.",
      "blocking": true
    }
  ],
  "open_human_actions": [
    {
      "exception_id": "EXC-0001",
      "required_action": "Confirm contractual restriction, technical controls, monitoring, and breach escalation before Gate 1 disposition.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0002",
      "required_action": "Obtain and human-review authoritative remediation closure evidence.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0003",
      "required_action": "Verify the complete ownership chain and beneficial-owner identifiers.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0004",
      "required_action": "Review the underlying adverse-media records, relevance, recency, disposition, and remediation context.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0005",
      "required_action": "Validate expected volumes, values, currencies, corridor assumptions, and monitoring thresholds.",
      "blocking": false
    },
    {
      "exception_id": "EXC-0006",
      "required_action": "Human Gate 1 review must retain these facts and raise UNMAPPED_FACT if a governed candidate is required.",
      "blocking": true
    },
    {
      "hard_exclusion_candidate_id": "HEX-0001",
      "required_action": "Verify physical presence and regulated-group affiliation before Gate 1 disposition."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0002",
      "required_action": "Confirm contractual prohibition, monitoring, and downstream identification procedures."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0003",
      "required_action": "Confirm jurisdiction and presence screening against governed lists at Gate 1."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0004",
      "required_action": "Confirm the prohibition applies to the proposed relationship and downstream usage."
    }
  ],
  "source_traceability": {
    "material_source_reference_ids": [
      "MSR-0001",
      "MSR-0002",
      "MSR-0003",
      "MSR-0004",
      "MSR-0005",
      "MSR-0006",
      "MSR-0007",
      "MSR-0008",
      "MSR-0009",
      "MSR-0010",
      "MSR-0011",
      "MSR-0012",
      "MSR-0013",
      "MSR-0014",
      "MSR-0015",
      "MSR-0016",
      "MSR-0017",
      "MSR-0018",
      "MSR-0019",
      "MSR-0020",
      "MSR-0021",
      "MSR-0022",
      "MSR-0023",
      "MSR-0024",
      "MSR-0025",
      "MSR-0026",
      "MSR-0027",
      "MSR-0028",
      "MSR-0029",
      "MSR-0030",
      "MSR-0031",
      "MSR-0032",
      "MSR-0033",
      "MSR-0034",
      "MSR-0035",
      "MSR-0036"
    ],
    "fact_ids": [
      "FACT-0001",
      "FACT-0002",
      "FACT-0003",
      "FACT-0004",
      "FACT-0005",
      "FACT-0006",
      "FACT-0007",
      "FACT-0008",
      "FACT-0009",
      "FACT-0010",
      "FACT-0011",
      "FACT-0012",
      "FACT-0013",
      "FACT-0014",
      "FACT-0015",
      "FACT-0016",
      "FACT-0017",
      "FACT-0018",
      "FACT-0019",
      "FACT-0020",
      "FACT-0021",
      "FACT-0022",
      "FACT-0023",
      "FACT-0024",
      "FACT-0025",
      "FACT-0026",
      "FACT-0027",
      "FACT-0028",
      "FACT-0029",
      "FACT-0030",
      "FACT-0031",
      "FACT-0032",
      "FACT-0033",
      "FACT-0034",
      "FACT-0035",
      "FACT-0036"
    ],
    "statement": "Packet statements and candidates cite Part 1 fact IDs. Each Part 1 fact cites at least one material_source_reference_id. Node.js will resolve the material references to the exhaustive Source Register and canonical source identifiers."
  },
  "versions_and_limitations": {
    "packet_version": "1.1.0",
    "risk_model_version": "0.1",
    "mapping_version": "1.1.0",
    "semantic_schema_version": "1.1.0",
    "input_files": [
      "CG_CBDDQ_Field_Dictionary_v1.0.0.docx",
      "CG_Relationship_Scoping_Field_Dictionary_v1.0.0.docx",
      "CG_Semantic_Output_Schemas_v1.1.0.md",
      "risk-model.xlsx",
      "approved_mapping_catalog_v1.1.0.json",
      "draft_gate1_packet_schema_v1.1.0.md",
      "CG_CBDDQ_Synthetic_HP-002.xlsx",
      "CG_Relationship-Scoping_Synthetic_HP-002.xlsx"
    ],
    "limitations": [
      "Synthetic use only.",
      "The exhaustive Source Register is not included and will be created by Node.js.",
      "Deterministic validation has not run.",
      "Candidate indicators remain PENDING_GATE_1.",
      "All six Part 1 exceptions remain open."
    ]
  },
  "gate_1_decision": {
    "gate_1_decision_id": null,
    "gate_1_status": null,
    "reviewer_role": null,
    "decision_date": null,
    "approved_indicator_ids": [],
    "excluded_indicator_ids": [],
    "unresolved_nonblocking_findings": [],
    "reviewer_comments": null
  }
}
```

## MATERIAL_SOURCE_REFERENCES_JSON

```json
{
  "schema_name": "MATERIAL_SOURCE_REFERENCES",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "reference_count": 36,
  "references": [
    {
      "material_source_reference_id": "MSR-0001",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "1",
      "field_name": "Full legal name",
      "source_location": "Intake form!D2",
      "raw_value": "Meridian Frontier Commercial Bank plc",
      "normalized_value": "Meridian Frontier Commercial Bank plc",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0001"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0002",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S07",
      "field_name": "Respondent full legal name",
      "source_location": "Scoping form!D9",
      "raw_value": "Meridian Frontier Commercial Bank plc",
      "normalized_value": "Meridian Frontier Commercial Bank plc",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0002"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0003",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "2",
      "field_name": "Country of incorporation",
      "source_location": "Intake form!D3",
      "raw_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "normalized_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0003"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CANDIDATE_INDICATOR_SET",
        "HARD_EXCLUSION_CANDIDATES"
      ]
    },
    {
      "material_source_reference_id": "MSR-0004",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S08",
      "field_name": "Country of incorporation",
      "source_location": "Scoping form!D10",
      "raw_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "normalized_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0004"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0005",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "11",
      "field_name": "Legal Entity Identifier",
      "source_location": "Intake form!D9",
      "raw_value": "529900SYNTHHARBOR01",
      "normalized_value": "529900SYNTHHARBOR01",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0005"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0006",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S09",
      "field_name": "Legal Entity Identifier",
      "source_location": "Scoping form!D11",
      "raw_value": "529900SYNTHHARBOR01",
      "normalized_value": "529900SYNTHHARBOR01",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0006"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0007",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "12",
      "field_name": "Primary regulator",
      "source_location": "Intake form!D10",
      "raw_value": "Meridian Banking Supervisory Authority (synthetic)",
      "normalized_value": "Meridian Banking Supervisory Authority (synthetic)",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0007"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0008",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "13",
      "field_name": "Banking license status",
      "source_location": "Intake form!D11",
      "raw_value": "ACTIVE; 2025 AML supervisory action disclosed; closure and resolution detail not supplied",
      "normalized_value": "ACTIVE; 2025 AML supervisory action disclosed; closure and resolution detail not supplied",
      "normalized_type": "ENUM",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0008"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CANDIDATE_INDICATOR_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0009",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S11",
      "field_name": "Primary regulator",
      "source_location": "Scoping form!D13",
      "raw_value": "Meridian Banking Supervisory Authority (synthetic); 2025 AML supervisory action disclosed without closure detail",
      "normalized_value": "Meridian Banking Supervisory Authority (synthetic); 2025 AML supervisory action disclosed without closure detail",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0009"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0010",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "6",
      "field_name": "Publicly traded",
      "source_location": "Intake form!D7",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0010"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CANDIDATE_INDICATOR_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0011",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "14",
      "field_name": "Ultimate parent",
      "source_location": "Intake form!D12",
      "raw_value": "Meridian Financial Holdings Ltd - four intermediate ownership layers; beneficial-owner identifiers not independently verifiable",
      "normalized_value": "Meridian Financial Holdings Ltd - four intermediate ownership layers; beneficial-owner identifiers not independently verifiable",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0011"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0012",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S10",
      "field_name": "Ultimate parent",
      "source_location": "Scoping form!D12",
      "raw_value": "Meridian Financial Holdings Ltd - privately held through four intermediate holding companies",
      "normalized_value": "Meridian Financial Holdings Ltd - privately held through four intermediate holding companies",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0012"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0013",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "16",
      "field_name": "Bearer shares",
      "source_location": "Intake form!D14",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0013"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0014",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "17",
      "field_name": "Physical presence",
      "source_location": "Intake form!D15",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0014"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CANDIDATE_INDICATOR_SET",
        "HARD_EXCLUSION_CANDIDATES"
      ]
    },
    {
      "material_source_reference_id": "MSR-0015",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "18",
      "field_name": "Shell bank",
      "source_location": "Intake form!D16",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0015"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "HARD_EXCLUSION_CANDIDATES"
      ]
    },
    {
      "material_source_reference_id": "MSR-0016",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "19",
      "field_name": "Respondent banks permitted to use account",
      "source_location": "Intake form!D17",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0016"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CANDIDATE_INDICATOR_SET",
        "HARD_EXCLUSION_CANDIDATES",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0017",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "19a",
      "field_name": "Nested relationships offered",
      "source_location": "Intake form!D18",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0017"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0018",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "20",
      "field_name": "Payable-through arrangements offered",
      "source_location": "Intake form!D19",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0018"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0019",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S14",
      "field_name": "Services offered",
      "source_location": "Scoping form!D16",
      "raw_value": "Correspondent clearing; cross-border payments; virtual-asset settlement; remote deposit capture; hold-mail services",
      "normalized_value": "Correspondent clearing; cross-border payments; virtual-asset settlement; remote deposit capture; hold-mail services",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0019"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0020",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S15",
      "field_name": "Nesting permitted",
      "source_location": "Scoping form!D17",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0020"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0021",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S16",
      "field_name": "Payable-through permitted",
      "source_location": "Scoping form!D18",
      "raw_value": "NO",
      "normalized_value": false,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0021"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0022",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S23",
      "field_name": "Expected customer types",
      "source_location": "Scoping form!D25",
      "raw_value": "Predominantly non-resident financial institutions, MSBs/MVTS, virtual-asset service providers, PEP-linked corporates, and private-banking customers",
      "normalized_value": "Predominantly non-resident financial institutions, MSBs/MVTS, virtual-asset service providers, PEP-linked corporates, and private-banking customers",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0022"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CANDIDATE_INDICATOR_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0023",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S22",
      "field_name": "Expected corridors",
      "source_location": "Scoping form!D24",
      "raw_value": "Republic of Meridian; offshore financial centres; Middle East; East Africa; Southeast Asia",
      "normalized_value": "Republic of Meridian; offshore financial centres; Middle East; East Africa; Southeast Asia",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0023"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "HARD_EXCLUSION_CANDIDATES",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0024",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S19",
      "field_name": "Expected monthly transaction count",
      "source_location": "Scoping form!D21",
      "raw_value": 18000,
      "normalized_value": 18000,
      "normalized_type": "NUMBER",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0024"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0025",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S20",
      "field_name": "Expected monthly transaction value",
      "source_location": "Scoping form!D22",
      "raw_value": 4200000000,
      "normalized_value": 4200000000,
      "normalized_type": "NUMBER",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0025"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0026",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S25",
      "field_name": "Estimate basis",
      "source_location": "Scoping form!D27",
      "raw_value": "Management estimate; limited historical data and no independent validation supplied",
      "normalized_value": "Management estimate; limited historical data and no independent validation supplied",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0026"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0027",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "22",
      "field_name": "AML/CTF governance and risk assessment control assertion",
      "source_location": "Intake form!D22",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0027"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CONTROL_ASSESSMENT"
      ]
    },
    {
      "material_source_reference_id": "MSR-0028",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "62",
      "field_name": "Customer due diligence and enhanced due diligence control assertion",
      "source_location": "Intake form!D79",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0028"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CONTROL_ASSESSMENT"
      ]
    },
    {
      "material_source_reference_id": "MSR-0029",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "98",
      "field_name": "Sanctions screening control assertion",
      "source_location": "Intake form!D116",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0029"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CONTROL_ASSESSMENT"
      ]
    },
    {
      "material_source_reference_id": "MSR-0030",
      "source_party": "RESPONDENT_INSTITUTION",
      "workbook_type": "CBDDQ",
      "sheet_name": "Intake form",
      "question_or_field_id": "49d",
      "field_name": "Shell-bank prohibition sub-control 49d",
      "source_location": "Intake form!D64",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0030"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CONTROL_ASSESSMENT",
        "HARD_EXCLUSION_CANDIDATES"
      ]
    },
    {
      "material_source_reference_id": "MSR-0031",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S34",
      "field_name": "Independent evidence verification status",
      "source_location": "Scoping form!D36",
      "raw_value": "VERIFIED_FOR_SYNTHETIC_QA",
      "normalized_value": "VERIFIED_FOR_SYNTHETIC_QA",
      "normalized_type": "ENUM",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0031"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "CONTROL_ASSESSMENT"
      ]
    },
    {
      "material_source_reference_id": "MSR-0032",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S37",
      "field_name": "Internal adverse media screening result",
      "source_location": "Scoping form!D39",
      "raw_value": "MATERIAL_ADVERSE_MEDIA_REQUIRES_REVIEW",
      "normalized_value": "MATERIAL_ADVERSE_MEDIA_REQUIRES_REVIEW",
      "normalized_type": "ENUM",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0032"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0033",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S36",
      "field_name": "Internal sanctions screening result",
      "source_location": "Scoping form!D38",
      "raw_value": "NO_CONFIRMED_MATCH",
      "normalized_value": "NO_CONFIRMED_MATCH",
      "normalized_type": "ENUM",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0033"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "HARD_EXCLUSION_CANDIDATES"
      ]
    },
    {
      "material_source_reference_id": "MSR-0034",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S26",
      "field_name": "Downstream correspondent capability",
      "source_location": "Scoping form!D28",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0034"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "HARD_EXCLUSION_CANDIDATES",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0035",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S27",
      "field_name": "Provider prohibition on downstream use",
      "source_location": "Scoping form!D29",
      "raw_value": "YES",
      "normalized_value": true,
      "normalized_type": "BOOLEAN",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0035"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "HARD_EXCLUSION_CANDIDATES",
        "EXCEPTION_SET"
      ]
    },
    {
      "material_source_reference_id": "MSR-0036",
      "source_party": "PROVIDER_INSTITUTION",
      "workbook_type": "RELATIONSHIP_SCOPING",
      "sheet_name": "Scoping form",
      "question_or_field_id": "S43",
      "field_name": "Screening limitations",
      "source_location": "Scoping form!D45",
      "raw_value": "No independent evidence package; ownership identifiers, regulatory remediation closure, and source freshness remain unverified",
      "normalized_value": "No independent evidence package; ownership identifiers, regulatory remediation closure, and source freshness remain unverified",
      "normalized_type": "TEXT",
      "extraction_status": "EXTRACTED",
      "used_by_fact_ids": [
        "FACT-0036"
      ],
      "used_by_artifacts": [
        "FACT_SET",
        "MATERIAL_FACT_SET",
        "EXCEPTION_SET"
      ]
    }
  ]
}
```

## FACT_SET_JSON

```json
{
  "schema_name": "FACT_SET",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "fact_count": 36,
  "facts": [
    {
      "fact_id": "FACT-0001",
      "fact_category": "IDENTITY",
      "fact_statement": "Respondent legal name is Meridian Frontier Commercial Bank plc.",
      "raw_value": "Meridian Frontier Commercial Bank plc",
      "normalized_value": "Meridian Frontier Commercial Bank plc",
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0001"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0002",
      "fact_category": "IDENTITY",
      "fact_statement": "Provider records the respondent legal name as Meridian Frontier Commercial Bank plc.",
      "raw_value": "Meridian Frontier Commercial Bank plc",
      "normalized_value": "Meridian Frontier Commercial Bank plc",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0002"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0003",
      "fact_category": "F1",
      "fact_statement": "Respondent reports incorporation in the synthetic Republic of Meridian, outside the maintained member list.",
      "raw_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "normalized_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
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
      "fact_category": "F1",
      "fact_statement": "Provider records the same synthetic country of incorporation.",
      "raw_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "normalized_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
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
      "fact_category": "IDENTITY",
      "fact_statement": "Respondent supplies LEI 529900SYNTHHARBOR01.",
      "raw_value": "529900SYNTHHARBOR01",
      "normalized_value": "529900SYNTHHARBOR01",
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0005"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0006",
      "fact_category": "IDENTITY",
      "fact_statement": "Provider records LEI 529900SYNTHHARBOR01.",
      "raw_value": "529900SYNTHHARBOR01",
      "normalized_value": "529900SYNTHHARBOR01",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0006"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0007",
      "fact_category": "F2",
      "fact_statement": "Respondent names the synthetic Meridian Banking Supervisory Authority as primary regulator.",
      "raw_value": "Meridian Banking Supervisory Authority (synthetic)",
      "normalized_value": "Meridian Banking Supervisory Authority (synthetic)",
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
      "fact_category": "F2",
      "fact_statement": "Respondent reports an active licence and a disclosed 2025 AML supervisory action without closure detail.",
      "raw_value": "ACTIVE; 2025 AML supervisory action disclosed; closure and resolution detail not supplied",
      "normalized_value": "ACTIVE; 2025 AML supervisory action disclosed; closure and resolution detail not supplied",
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
      "fact_category": "F2",
      "fact_statement": "Provider records the regulator and unresolved closure-detail limitation.",
      "raw_value": "Meridian Banking Supervisory Authority (synthetic); 2025 AML supervisory action disclosed without closure detail",
      "normalized_value": "Meridian Banking Supervisory Authority (synthetic); 2025 AML supervisory action disclosed without closure detail",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0009"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0010",
      "fact_category": "F3",
      "fact_statement": "Respondent states it is not publicly traded.",
      "raw_value": "NO",
      "normalized_value": false,
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
      "fact_category": "F3",
      "fact_statement": "Respondent reports a privately held parent structure with four intermediate layers and unverified beneficial-owner identifiers.",
      "raw_value": "Meridian Financial Holdings Ltd - four intermediate ownership layers; beneficial-owner identifiers not independently verifiable",
      "normalized_value": "Meridian Financial Holdings Ltd - four intermediate ownership layers; beneficial-owner identifiers not independently verifiable",
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
      "fact_category": "F3",
      "fact_statement": "Provider records the same parent and four intermediate holding companies.",
      "raw_value": "Meridian Financial Holdings Ltd - privately held through four intermediate holding companies",
      "normalized_value": "Meridian Financial Holdings Ltd - privately held through four intermediate holding companies",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0012"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0013",
      "fact_category": "F3",
      "fact_statement": "Respondent states that bearer shares are not present.",
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
      "fact_category": "F4",
      "fact_statement": "Respondent asserts physical presence.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0014"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0015",
      "fact_category": "HARD_EXCLUSION",
      "fact_statement": "Respondent states it is not a shell bank.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0015"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0016",
      "fact_category": "F5",
      "fact_statement": "Respondent states respondent banks may use the account, creating downstream correspondent capability.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0016"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0017",
      "fact_category": "F5",
      "fact_statement": "Respondent states nested relationships are not offered.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0017"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0018",
      "fact_category": "F5",
      "fact_statement": "Respondent states payable-through arrangements are not offered.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0018"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0019",
      "fact_category": "F5",
      "fact_statement": "Provider proposes correspondent clearing and additional cross-border, virtual-asset settlement, remote-deposit-capture, and hold-mail services.",
      "raw_value": "Correspondent clearing; cross-border payments; virtual-asset settlement; remote deposit capture; hold-mail services",
      "normalized_value": "Correspondent clearing; cross-border payments; virtual-asset settlement; remote deposit capture; hold-mail services",
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
      "fact_category": "F5",
      "fact_statement": "Provider does not permit nesting.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0020"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0021",
      "fact_category": "F5",
      "fact_statement": "Provider does not permit payable-through access.",
      "raw_value": "NO",
      "normalized_value": false,
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0021"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0022",
      "fact_category": "F6",
      "fact_statement": "Provider expects customer types beyond regulated corporate and institutional counterparties.",
      "raw_value": "Predominantly non-resident financial institutions, MSBs/MVTS, virtual-asset service providers, PEP-linked corporates, and private-banking customers",
      "normalized_value": "Predominantly non-resident financial institutions, MSBs/MVTS, virtual-asset service providers, PEP-linked corporates, and private-banking customers",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0022"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0023",
      "fact_category": "F1",
      "fact_statement": "Provider expects activity across the synthetic Republic of Meridian, offshore financial centres, the Middle East, East Africa, and Southeast Asia.",
      "raw_value": "Republic of Meridian; offshore financial centres; Middle East; East Africa; Southeast Asia",
      "normalized_value": "Republic of Meridian; offshore financial centres; Middle East; East Africa; Southeast Asia",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0023"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0024",
      "fact_category": "GATE_1",
      "fact_statement": "Provider estimates 18,000 transactions per month.",
      "raw_value": 18000,
      "normalized_value": 18000,
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0024"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0025",
      "fact_category": "GATE_1",
      "fact_statement": "Provider estimates monthly transaction value of 4,200,000,000, with currency context supplied separately in S18.",
      "raw_value": 4200000000,
      "normalized_value": 4200000000,
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0025"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0026",
      "fact_category": "GATE_1",
      "fact_statement": "Activity estimates are management estimates with limited history and no independent validation supplied.",
      "raw_value": "Management estimate; limited historical data and no independent validation supplied",
      "normalized_value": "Management estimate; limited historical data and no independent validation supplied",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0026"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0027",
      "fact_category": "C1",
      "fact_statement": "Respondent asserts AML/CTF governance and risk-assessment controls are present.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0027"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0028",
      "fact_category": "C2",
      "fact_statement": "Respondent asserts CDD and EDD controls are present.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0028"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0029",
      "fact_category": "C3",
      "fact_statement": "Respondent asserts sanctions-screening controls are present.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0029"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0030",
      "fact_category": "C4",
      "fact_statement": "Respondent asserts a shell-bank prohibition control.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "RESPONDENT_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0030"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0031",
      "fact_category": "C1",
      "fact_statement": "Provider records synthetic QA verification of the evidence package; this is not operational approval.",
      "raw_value": "VERIFIED_FOR_SYNTHETIC_QA",
      "normalized_value": "VERIFIED_FOR_SYNTHETIC_QA",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0031"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0032",
      "fact_category": "GATE_1",
      "fact_statement": "Provider internal adverse-media screening identifies material adverse media requiring human review.",
      "raw_value": "MATERIAL_ADVERSE_MEDIA_REQUIRES_REVIEW",
      "normalized_value": "MATERIAL_ADVERSE_MEDIA_REQUIRES_REVIEW",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0032"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0033",
      "fact_category": "HARD_EXCLUSION",
      "fact_statement": "Provider internal sanctions screening records no confirmed match.",
      "raw_value": "NO_CONFIRMED_MATCH",
      "normalized_value": "NO_CONFIRMED_MATCH",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0033"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0034",
      "fact_category": "F5",
      "fact_statement": "Provider records that the respondent has downstream correspondent capability.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0034"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "HIGH",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0035",
      "fact_category": "GATE_1",
      "fact_statement": "Provider prohibits downstream use for the proposed relationship.",
      "raw_value": "YES",
      "normalized_value": true,
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0035"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    },
    {
      "fact_id": "FACT-0036",
      "fact_category": "GATE_1",
      "fact_statement": "Provider records limitations concerning ownership identifiers, regulatory remediation closure, and source freshness.",
      "raw_value": "No independent evidence package; ownership identifiers, regulatory remediation closure, and source freshness remain unverified",
      "normalized_value": "No independent evidence package; ownership identifiers, regulatory remediation closure, and source freshness remain unverified",
      "source_party": "PROVIDER_INSTITUTION",
      "material_source_reference_ids": [
        "MSR-0036"
      ],
      "extraction_confidence": 1.0,
      "materiality_candidate": "MEDIUM",
      "status": "ACTIVE"
    }
  ]
}
```

## MATERIAL_FACT_SET_JSON

```json
{
  "schema_name": "MATERIAL_FACT_SET",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "material_fact_count": 36,
  "facts": [
    {
      "fact_id": "FACT-0001",
      "model_relevance": [
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0002",
      "model_relevance": [
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0003",
      "model_relevance": [
        "F1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0004",
      "model_relevance": [
        "F1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0005",
      "model_relevance": [
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0006",
      "model_relevance": [
        "CONTRADICTION",
        "GATE_1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0007",
      "model_relevance": [
        "F2"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0008",
      "model_relevance": [
        "F2"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0009",
      "model_relevance": [
        "F2"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0010",
      "model_relevance": [
        "F3"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0011",
      "model_relevance": [
        "F3"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0012",
      "model_relevance": [
        "F3"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0013",
      "model_relevance": [
        "F3"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0014",
      "model_relevance": [
        "F4"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0015",
      "model_relevance": [
        "HARD_EXCLUSION"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0016",
      "model_relevance": [
        "F5"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0017",
      "model_relevance": [
        "F5"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0018",
      "model_relevance": [
        "F5"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0019",
      "model_relevance": [
        "F5"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0020",
      "model_relevance": [
        "F5"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0021",
      "model_relevance": [
        "F5"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0022",
      "model_relevance": [
        "F6"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0023",
      "model_relevance": [
        "F1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0024",
      "model_relevance": [
        "GATE_1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0025",
      "model_relevance": [
        "GATE_1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0026",
      "model_relevance": [
        "GATE_1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0027",
      "model_relevance": [
        "C1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0028",
      "model_relevance": [
        "C2"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0029",
      "model_relevance": [
        "C3"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0030",
      "model_relevance": [
        "C4"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0031",
      "model_relevance": [
        "C1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0032",
      "model_relevance": [
        "GATE_1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0033",
      "model_relevance": [
        "HARD_EXCLUSION"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0034",
      "model_relevance": [
        "F5"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0035",
      "model_relevance": [
        "GATE_1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    },
    {
      "fact_id": "FACT-0036",
      "model_relevance": [
        "GATE_1"
      ],
      "materiality_reason": "Material to identity, model-area, control, exclusion, exception, activity, or Gate 1 review."
    }
  ]
}
```

## CONTROL_ASSESSMENT_JSON

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
        "FACT-0027",
        "FACT-0031"
      ],
      "assertion_summary": "Respondent asserts AML/CTF governance and risk-assessment controls are present.",
      "evidence_status": "SUPPORTED_BY_APPROVED_HUMAN_VERIFICATION",
      "limitations": [
        "Verification is explicitly limited to synthetic QA execution and is not operational approval or proof of operating effectiveness."
      ],
      "open_human_actions": [
        "Confirm evidence scope, currency, authenticity, and operating effectiveness during human Gate 1 review."
      ]
    },
    {
      "control_domain": "C2",
      "assessment_id": "CTL-0002",
      "related_fact_ids": [
        "FACT-0028",
        "FACT-0031"
      ],
      "assertion_summary": "Respondent asserts CDD and EDD controls are present.",
      "evidence_status": "SUPPORTED_BY_APPROVED_HUMAN_VERIFICATION",
      "limitations": [
        "Verification is explicitly limited to synthetic QA execution and is not operational approval or proof of operating effectiveness."
      ],
      "open_human_actions": [
        "Confirm evidence scope, currency, authenticity, and operating effectiveness during human Gate 1 review."
      ]
    },
    {
      "control_domain": "C3",
      "assessment_id": "CTL-0003",
      "related_fact_ids": [
        "FACT-0029",
        "FACT-0031"
      ],
      "assertion_summary": "Respondent asserts sanctions-screening controls are present.",
      "evidence_status": "SUPPORTED_BY_APPROVED_HUMAN_VERIFICATION",
      "limitations": [
        "Verification is explicitly limited to synthetic QA execution and is not operational approval or proof of operating effectiveness."
      ],
      "open_human_actions": [
        "Confirm evidence scope, currency, authenticity, and operating effectiveness during human Gate 1 review."
      ]
    },
    {
      "control_domain": "C4",
      "assessment_id": "CTL-0004",
      "related_fact_ids": [
        "FACT-0030",
        "FACT-0031"
      ],
      "assertion_summary": "Respondent asserts a shell-bank prohibition control.",
      "evidence_status": "SUPPORTED_BY_APPROVED_HUMAN_VERIFICATION",
      "limitations": [
        "Verification is explicitly limited to synthetic QA execution and is not operational approval or proof of operating effectiveness."
      ],
      "open_human_actions": [
        "Confirm evidence scope, currency, authenticity, and operating effectiveness during human Gate 1 review."
      ]
    }
  ]
}
```

## CANDIDATE_INDICATOR_SET_JSON

```json
{
  "schema_name": "CANDIDATE_INDICATOR_SET",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "mapping_version": "1.1.0",
  "indicator_count": 6,
  "indicators": [
    {
      "candidate_indicator_id": "IND-F1-MAP-F1-CBDDQ-2-NOTIN-001",
      "indicator_id": "JURISDICTION_OUTSIDE_MAINTAINED_MEMBER_LIST",
      "target_model_area": "F1",
      "candidate_value": "Republic of Meridian (synthetic; outside FATF membership; no equivalent regional assessment documented)",
      "value_type": "TEXT",
      "source_fact_ids": [
        "FACT-0003"
      ],
      "mapping_rule_id": "MAP-F1-CBDDQ-2-NOTIN-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    },
    {
      "candidate_indicator_id": "IND-F2-MAP-F2-CBDDQ-13-CONTAINS-ACTION-001",
      "indicator_id": "OPEN_OR_UNVERIFIED_SUPERVISORY_ACTION",
      "target_model_area": "F2",
      "candidate_value": "ACTIVE; 2025 AML supervisory action disclosed; closure and resolution detail not supplied",
      "value_type": "TEXT",
      "source_fact_ids": [
        "FACT-0008"
      ],
      "mapping_rule_id": "MAP-F2-CBDDQ-13-CONTAINS-ACTION-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    },
    {
      "candidate_indicator_id": "IND-F3-MAP-F3-CBDDQ-6-NO-001",
      "indicator_id": "PRIVATELY_HELD",
      "target_model_area": "F3",
      "candidate_value": false,
      "value_type": "BOOLEAN",
      "source_fact_ids": [
        "FACT-0010"
      ],
      "mapping_rule_id": "MAP-F3-CBDDQ-6-NO-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    },
    {
      "candidate_indicator_id": "IND-F4-MAP-F4-CBDDQ-17-YES-001",
      "indicator_id": "PHYSICAL_PRESENCE_ASSERTED",
      "target_model_area": "F4",
      "candidate_value": true,
      "value_type": "BOOLEAN",
      "source_fact_ids": [
        "FACT-0014"
      ],
      "mapping_rule_id": "MAP-F4-CBDDQ-17-YES-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    },
    {
      "candidate_indicator_id": "IND-F5-MAP-F5-CBDDQ-19-YES-001",
      "indicator_id": "RESPONDENT_BANK_USE_PERMITTED",
      "target_model_area": "F5",
      "candidate_value": true,
      "value_type": "BOOLEAN",
      "source_fact_ids": [
        "FACT-0016"
      ],
      "mapping_rule_id": "MAP-F5-CBDDQ-19-YES-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    },
    {
      "candidate_indicator_id": "IND-F6-MAP-F6-SCOPE-S23-NOTCONTAINS-001",
      "indicator_id": "CUSTOMER_BASE_NOT_LIMITED_TO_REGULATED_COUNTERPARTIES",
      "target_model_area": "F6",
      "candidate_value": "Predominantly non-resident financial institutions, MSBs/MVTS, virtual-asset service providers, PEP-linked corporates, and private-banking customers",
      "value_type": "TEXT",
      "source_fact_ids": [
        "FACT-0022"
      ],
      "mapping_rule_id": "MAP-F6-SCOPE-S23-NOTCONTAINS-001",
      "mapping_version": "1.1.0",
      "gate_1_status": "PENDING_GATE_1",
      "human_review_required": true
    }
  ]
}
```

## HARD_EXCLUSION_CANDIDATES_JSON

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
        "FACT-0014",
        "FACT-0015"
      ],
      "reason": "Physical presence is asserted and the respondent states it is not a shell bank; human verification remains required.",
      "required_human_action": "Verify physical presence and regulated-group affiliation before Gate 1 disposition."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0002",
      "exclusion_rule_id": "DOWNSTREAM_SHELL_BANK_EXPOSURE",
      "status": "POSSIBLE",
      "source_fact_ids": [
        "FACT-0016",
        "FACT-0034",
        "FACT-0035"
      ],
      "reason": "Downstream capability is present, while the Provider Institution prohibits downstream use; enforceability and identification controls require review.",
      "required_human_action": "Confirm contractual prohibition, monitoring, and downstream identification procedures."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0003",
      "exclusion_rule_id": "COMPREHENSIVELY_SANCTIONED_PRESENCE",
      "status": "UNKNOWN",
      "source_fact_ids": [
        "FACT-0003",
        "FACT-0023",
        "FACT-0033"
      ],
      "reason": "No confirmed sanctions match is recorded, but the supplied semantic fields do not establish a governed comprehensive-sanctions determination for every presence and corridor.",
      "required_human_action": "Confirm jurisdiction and presence screening against governed lists at Gate 1."
    },
    {
      "hard_exclusion_candidate_id": "HEX-0004",
      "exclusion_rule_id": "RESPONDENT_BANK_CATEGORY_PROHIBITED",
      "status": "NOT_TRIGGERED",
      "source_fact_ids": [
        "FACT-0015",
        "FACT-0030"
      ],
      "reason": "The respondent states it is not a shell bank and asserts a shell-bank prohibition control.",
      "required_human_action": "Confirm the prohibition applies to the proposed relationship and downstream usage."
    }
  ]
}
```

## EXCEPTION_SET_JSON

```json
{
  "schema_name": "EXCEPTION_SET",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "exception_count": 6,
  "exceptions": [
    {
      "exception_id": "EXC-0001",
      "exception_type": "MATERIAL_REVIEW_POINT",
      "severity": "HIGH",
      "related_fact_ids": [
        "FACT-0016",
        "FACT-0034",
        "FACT-0035"
      ],
      "material_source_reference_ids": [
        "MSR-0016",
        "MSR-0034",
        "MSR-0035"
      ],
      "finding": "Respondent/downstream capability exists while the Provider Institution prohibits downstream use. This is a governance and enforceability review point, not automatically a contradiction.",
      "required_action": "Confirm contractual restriction, technical controls, monitoring, and breach escalation before Gate 1 disposition.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0002",
      "exception_type": "EVIDENCE_GAP",
      "severity": "HIGH",
      "related_fact_ids": [
        "FACT-0008",
        "FACT-0009",
        "FACT-0036"
      ],
      "material_source_reference_ids": [
        "MSR-0008",
        "MSR-0009",
        "MSR-0036"
      ],
      "finding": "A 2025 AML supervisory action is disclosed, but closure and resolution detail remains unverified in the Provider screening limitations.",
      "required_action": "Obtain and human-review authoritative remediation closure evidence.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0003",
      "exception_type": "EVIDENCE_GAP",
      "severity": "HIGH",
      "related_fact_ids": [
        "FACT-0011",
        "FACT-0012",
        "FACT-0036"
      ],
      "material_source_reference_ids": [
        "MSR-0011",
        "MSR-0012",
        "MSR-0036"
      ],
      "finding": "The ownership chain includes four intermediate layers and beneficial-owner identifiers remain unverified.",
      "required_action": "Verify the complete ownership chain and beneficial-owner identifiers.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0004",
      "exception_type": "MATERIAL_REVIEW_POINT",
      "severity": "HIGH",
      "related_fact_ids": [
        "FACT-0032"
      ],
      "material_source_reference_ids": [
        "MSR-0032"
      ],
      "finding": "Internal adverse-media screening identifies material adverse media requiring human review.",
      "required_action": "Review the underlying adverse-media records, relevance, recency, disposition, and remediation context.",
      "blocking": true
    },
    {
      "exception_id": "EXC-0005",
      "exception_type": "EVIDENCE_GAP",
      "severity": "MEDIUM",
      "related_fact_ids": [
        "FACT-0024",
        "FACT-0025",
        "FACT-0026"
      ],
      "material_source_reference_ids": [
        "MSR-0024",
        "MSR-0025",
        "MSR-0026"
      ],
      "finding": "High-volume activity estimates are management estimates based on limited historical data and lack independent validation.",
      "required_action": "Validate expected volumes, values, currencies, corridor assumptions, and monitoring thresholds.",
      "blocking": false
    },
    {
      "exception_id": "EXC-0006",
      "exception_type": "MAPPING_GAP",
      "severity": "MEDIUM",
      "related_fact_ids": [
        "FACT-0011",
        "FACT-0013",
        "FACT-0017",
        "FACT-0018",
        "FACT-0019",
        "FACT-0020",
        "FACT-0021",
        "FACT-0023"
      ],
      "material_source_reference_ids": [
        "MSR-0011",
        "MSR-0013",
        "MSR-0017",
        "MSR-0018",
        "MSR-0019",
        "MSR-0020",
        "MSR-0021",
        "MSR-0023"
      ],
      "finding": "These material facts have no active exact mapping rule in approved_mapping_catalog_v1.1.0.json and were not converted into candidate indicators.",
      "required_action": "Human Gate 1 review must retain these facts and raise UNMAPPED_FACT if a governed candidate is required.",
      "blocking": true
    }
  ]
}
```

## PACKAGE_MANIFEST_JSON

```json
{
  "schema_name": "PACKAGE_MANIFEST",
  "schema_version": "1.1.0",
  "case_id": "CG-CASE-HP-002",
  "run_id": "CG-RUN-HP-002",
  "packet_version": "1.1.0",
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "risk_model_version": "0.1",
  "mapping_version": "1.1.0",
  "artifacts": [
    {
      "artifact_id": "ART-RUN-HEADER",
      "artifact_type": "RUN_HEADER",
      "schema_version": "1.1.0",
      "record_count": 1,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-INPUT-VALIDATION",
      "artifact_type": "INPUT_VALIDATION_RESULT",
      "schema_version": "1.1.0",
      "record_count": 1,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-DRAFT-PACKET",
      "artifact_type": "DRAFT_GATE1_PACKET",
      "schema_version": "1.1.0",
      "record_count": 1,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-MSR",
      "artifact_type": "MATERIAL_SOURCE_REFERENCES",
      "schema_version": "1.1.0",
      "record_count": 36,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-FACTS",
      "artifact_type": "FACT_SET",
      "schema_version": "1.1.0",
      "record_count": 36,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-MATERIAL-FACTS",
      "artifact_type": "MATERIAL_FACT_SET",
      "schema_version": "1.1.0",
      "record_count": 36,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-CONTROLS",
      "artifact_type": "CONTROL_ASSESSMENT",
      "schema_version": "1.1.0",
      "record_count": 4,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-INDICATORS",
      "artifact_type": "CANDIDATE_INDICATOR_SET",
      "schema_version": "1.1.0",
      "record_count": 6,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-HARD-EXCLUSIONS",
      "artifact_type": "HARD_EXCLUSION_CANDIDATES",
      "schema_version": "1.1.0",
      "record_count": 4,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-EXCEPTIONS",
      "artifact_type": "EXCEPTION_SET",
      "schema_version": "1.1.0",
      "record_count": 6,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-RECEIPT",
      "artifact_type": "INTAKE_AGENT_RECEIPT",
      "schema_version": "1.1.0",
      "record_count": 1,
      "status": "CREATED",
      "required": true
    },
    {
      "artifact_id": "ART-FINAL-CHECK",
      "artifact_type": "FINAL_SELF_CHECK",
      "schema_version": "1.1.0",
      "record_count": 1,
      "status": "CREATED",
      "required": true
    }
  ],
  "declared_counts": {
    "material_source_references": 36,
    "facts": 36,
    "material_facts": 36,
    "control_assessments": 4,
    "candidate_indicators": 6,
    "hard_exclusion_candidates": 4,
    "exceptions": 6
  },
  "exhaustive_source_register_owner": "CG_NODE_VALIDATOR",
  "prohibited_output_check": "PASS",
  "limitations": [
    "Node.js has not run.",
    "Deterministic validation has not run.",
    "The exhaustive Source Register is not part of this package."
  ]
}
```

## INTAKE_AGENT_RECEIPT_JSON

```json
{
  "schema_name": "INTAKE_AGENT_RECEIPT",
  "schema_version": "1.1.0",
  "receipt_id": "CGIA-CG-RUN-HP-002",
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
    "approved_mapping_catalog_v1.1.0.json",
    "draft_gate1_packet_schema_v1.1.0.md"
  ],
  "output_artifact_ids": [
    "ART-RUN-HEADER",
    "ART-INPUT-VALIDATION",
    "ART-DRAFT-PACKET",
    "ART-MSR",
    "ART-FACTS",
    "ART-MATERIAL-FACTS",
    "ART-CONTROLS",
    "ART-INDICATORS",
    "ART-HARD-EXCLUSIONS",
    "ART-EXCEPTIONS",
    "ART-RECEIPT",
    "ART-FINAL-CHECK"
  ],
  "packet_status": "DRAFT_PENDING_DETERMINISTIC_VALIDATION",
  "exhaustive_source_register_created": false,
  "deterministic_validation_executed": false,
  "prohibited_action_check": "PASS",
  "created_on": "2026-10-25T20:06:00Z",
  "errors": []
}
```

## FINAL_SELF_CHECK

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
    "material_references_complete": true,
    "material_facts_in_fact_set": true,
    "exceptions_visible_in_packet": true,
    "candidate_mappings_use_catalog": true,
    "semantic_counts_reconciled": true,
    "gate_1_decision_blank": true,
    "exhaustive_source_register_absent": true,
    "deterministic_validation_not_claimed": true,
    "official_score_absent": true,
    "risk_band_absent": true,
    "approval_rejection_absent": true,
    "scoring_authorization_absent": true
  },
  "errors": [],
  "warnings": [
    "Six Part 1 exceptions remain open, including five blocking findings.",
    "Node.js will create the exhaustive Source Register and perform deterministic validation."
  ]
}
```

