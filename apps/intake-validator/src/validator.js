import { unique } from './utils.js';

/*
 * Correspondent Gate deterministic validator
 * Version: 1.0.2
 *
 * Material-reference resolution rules:
 * 1. Atomic IDs resolve by workbook type + sheet + stable field ID.
 * 2. Cell location disambiguates duplicate atomic IDs.
 * 3. Normalized value is a secondary duplicate disambiguator.
 * 4. Composite references are expanded into atomic IDs.
 * 5. Every atomic member of a composite reference must resolve exactly once.
 */

function normalizeFieldId(value) {
  return String(value ?? '')
    .trim()
    .toUpperCase();
}

function expandReferenceIds(referenceText) {
  const text = normalizeFieldId(referenceText);

  if (!text) {
    return [];
  }

  /*
   * Comma-separated references:
   * 49d,49e,76t
   */
  if (text.includes(',')) {
    return [
      ...new Set(
        text
          .split(',')
          .flatMap(part => expandReferenceIds(part))
      )
    ];
  }

  /*
   * Atomic IDs:
   * 1
   * 6A
   * S07
   */
  if (!text.includes('-')) {
    return [text];
  }

  const rangeMatch = text.match(
    /^(\d+)([A-Z]?)-(\d+)([A-Z]?)$/
  );

  if (!rangeMatch) {
    return [text];
  }

  const startNumber = Number(rangeMatch[1]);
  const startSuffix = rangeMatch[2];
  const endNumber = Number(rangeMatch[3]);
  const endSuffix = rangeMatch[4];

  /*
   * Letter range with the same numeric prefix:
   * 22A-22O
   */
  if (
    startNumber === endNumber &&
    startSuffix &&
    endSuffix
  ) {
    const startCode = startSuffix.charCodeAt(0);
    const endCode = endSuffix.charCodeAt(0);

    if (startCode > endCode) {
      return [text];
    }

    const ids = [];

    for (
      let code = startCode;
      code <= endCode;
      code += 1
    ) {
      ids.push(
        `${startNumber}${String.fromCharCode(code)}`
      );
    }

    return ids;
  }

  /*
   * Numeric range:
   * 62-80
   */
  if (!startSuffix && !endSuffix) {
    if (startNumber > endNumber) {
      return [text];
    }

    const ids = [];

    for (
      let number = startNumber;
      number <= endNumber;
      number += 1
    ) {
      ids.push(String(number));
    }

    return ids;
  }

  /*
   * Numeric range ending with a suffix:
   * 92-95A
   *
   * Expands to:
   * 92, 93, 94, 95, 95A
   */
  if (!startSuffix && endSuffix) {
    if (startNumber > endNumber) {
      return [text];
    }

    const ids = [];

    for (
      let number = startNumber;
      number <= endNumber;
      number += 1
    ) {
      ids.push(String(number));
    }

    ids.push(`${endNumber}${endSuffix}`);

    return [...new Set(ids)];
  }

  /*
   * Unsupported mixed range remains atomic.
   * Validation then fails visibly instead of guessing.
   */
  return [text];
}

const PROHIBITED = [
  {
    id: 'OFFICIAL_SCORE_ABSENT',
    severity: 'CRITICAL',
    description:
      'Official, gross, net, or overall score content must be absent.',
    re: /\b(?:gross|net|official|overall)\s+(?:risk\s+)?score\s*[:=]\s*\d/i
  },
  {
    id: 'RISK_BAND_ABSENT',
    severity: 'CRITICAL',
    description:
      'Official risk rating or risk band content must be absent.',
    re: /\b(?:official\s+)?risk\s+(?:band|rating)\s*[:=]\s*(?:low|medium|high|severe|critical)/i
  },
  {
    id: 'APPROVAL_REJECTION_ABSENT',
    severity: 'CRITICAL',
    description:
      'Gate 1 or relationship approval and rejection content must be absent.',
    re: /\b(?:relationship|gate\s*1)\s+(?:is\s+)?(?:approved|rejected)\b/i
  },
  {
    id: 'VALIDATION_CLAIM_ABSENT',
    severity: 'HIGH',
    description:
      'The Copilot package must not claim deterministic validation passed.',
    re: /\bdeterministic validation\s+(?:has\s+)?passed\b/i
  }
];

function finding(
  id,
  result,
  severity,
  description,
  actual = '',
  action = ''
) {
  return {
    check_id: id,
    result,
    severity,
    check_description: description,
    actual_value: String(actual),
    required_action: action
  };
}

function arrayOf(artifact, propertyName) {
  const value = artifact?.[propertyName];
  return Array.isArray(value) ? value : [];
}

function sameText(left, right) {
  return String(left ?? '')
    .trim()
    .toUpperCase() ===
    String(right ?? '')
      .trim()
      .toUpperCase();
}

function resolveMaterialReferences(
  references,
  sourceRegister
) {
  const unresolved = [];
  const resolved = [];

  for (const reference of references) {
    const expectedIds = expandReferenceIds(
      reference.question_or_field_id
    );

    const resolutionResults = [];

    for (const expectedId of expectedIds) {
      let candidates = sourceRegister.records.filter(
        source =>
          source.workbook_type ===
            reference.workbook_type &&
          source.sheet_name ===
            reference.sheet_name &&
          normalizeFieldId(
            source.question_or_field_id
          ) === expectedId
      );

      /*
       * Location is a duplicate disambiguator for an
       * atomic reference. Composite ranges such as
       * D76:D90 must not be compared to each atomic cell.
       */
      if (
        expectedIds.length === 1 &&
        candidates.length > 1 &&
        reference.source_location
      ) {
        const locationMatches = candidates.filter(
          source =>
            source.source_location ===
            reference.source_location
        );

        if (locationMatches.length > 0) {
          candidates = locationMatches;
        }
      }

      /*
       * Normalized value is a secondary duplicate
       * disambiguator for an atomic reference. Aggregate
       * composite values do not need to equal each source.
       */
      if (
        expectedIds.length === 1 &&
        candidates.length > 1 &&
        reference.normalized_value !== undefined
      ) {
        const valueMatches = candidates.filter(
          source =>
            sameText(
              source.normalized_value,
              reference.normalized_value
            )
        );

        if (valueMatches.length > 0) {
          candidates = valueMatches;
        }
      }

      resolutionResults.push({
        atomic_id: expectedId,
        matches: candidates.length,
        source_record_ids: candidates.map(
          candidate => candidate.source_record_id
        )
      });
    }

    const failedAtomicIds = resolutionResults.filter(
      result => result.matches !== 1
    );

    if (
      expectedIds.length === 0 ||
      failedAtomicIds.length > 0
    ) {
      unresolved.push({
        id: reference.material_source_reference_id,
        workbook_type: reference.workbook_type,
        sheet_name: reference.sheet_name,
        question_or_field_id:
          reference.question_or_field_id,
        source_location: reference.source_location,
        expanded_ids: expectedIds,
        failed_atomic_ids: failedAtomicIds
      });
    } else {
      resolved.push({
        material_source_reference_id:
          reference.material_source_reference_id,
        question_or_field_id:
          reference.question_or_field_id,
        expanded_ids: expectedIds,
        source_record_ids: resolutionResults.flatMap(
          result => result.source_record_ids
        )
      });
    }
  }

  return {
    unresolved,
    resolved
  };
}

export function validate({
  agent,
  sourceRegister,
  mappingCatalog,
  expected
}) {
  const findings = [];
  const artifacts = agent.artifacts;

  if (agent.parseErrors.length > 0) {
    findings.push(
      finding(
        'JSON_PARSE_VALID',
        'FAIL',
        'CRITICAL',
        'All located JSON blocks must parse.',
        JSON.stringify(agent.parseErrors),
        'Correct malformed JSON and regenerate the Copilot package.'
      )
    );
  } else {
    findings.push(
      finding(
        'JSON_PARSE_VALID',
        'PASS',
        'CRITICAL',
        'All located JSON blocks parse.'
      )
    );
  }

  const requiredArtifacts = [
    'RUN_HEADER',
    'INPUT_VALIDATION_RESULT',
    'MATERIAL_SOURCE_REFERENCES_JSON',
    'FACT_SET_JSON',
    'MATERIAL_FACT_SET_JSON',
    'CONTROL_ASSESSMENT_JSON',
    'CANDIDATE_INDICATOR_SET_JSON',
    'HARD_EXCLUSION_CANDIDATES_JSON',
    'EXCEPTION_SET_JSON',
    'PACKAGE_MANIFEST_JSON',
    'INTAKE_AGENT_RECEIPT_JSON',
    'FINAL_SELF_CHECK'
  ];

  const missingArtifacts = requiredArtifacts.filter(
    name => !artifacts[name]
  );

  findings.push(
    finding(
      'REQUIRED_AGENT_ARTIFACTS',
      missingArtifacts.length ? 'FAIL' : 'PASS',
      'CRITICAL',
      'All required Configuration 7 Copilot artifacts must exist.',
      missingArtifacts.join(', '),
      missingArtifacts.length
        ? 'Generate a complete Configuration 7 package.'
        : ''
    )
  );

  const caseIds = [
    artifacts.RUN_HEADER?.case_id,
    artifacts.INPUT_VALIDATION_RESULT?.case_id,
    artifacts.FACT_SET_JSON?.case_id,
    artifacts.MATERIAL_SOURCE_REFERENCES_JSON?.case_id
  ].filter(Boolean);

  const runIds = [
    artifacts.RUN_HEADER?.run_id,
    artifacts.INPUT_VALIDATION_RESULT?.run_id,
    artifacts.FACT_SET_JSON?.run_id,
    artifacts.MATERIAL_SOURCE_REFERENCES_JSON?.run_id
  ].filter(Boolean);

  const identifierMismatch =
    caseIds.some(id => id !== expected.caseId) ||
    runIds.some(id => id !== expected.runId);

  findings.push(
    finding(
      'CASE_RUN_ID_MATCH',
      identifierMismatch ? 'FAIL' : 'PASS',
      'CRITICAL',
      'Case ID and Run ID must match the validator invocation.',
      `${caseIds.join('|')} / ${runIds.join('|')}`,
      identifierMismatch
        ? 'Correct identifiers and regenerate the package.'
        : ''
    )
  );

  const sourceRecordIds = sourceRegister.records.map(
    record => record.source_record_id
  );

  findings.push(
    finding(
      'SOURCE_RECORD_ID_UNIQUE',
      unique(sourceRecordIds) ? 'PASS' : 'FAIL',
      'CRITICAL',
      'Canonical Source Register IDs must be unique.',
      sourceRecordIds.length,
      unique(sourceRecordIds)
        ? ''
        : 'Correct workbook parsing or canonical ID generation.'
    )
  );

  const facts = arrayOf(
    artifacts.FACT_SET_JSON,
    'facts'
  );

  const factIds = facts.map(fact => fact.fact_id);

  findings.push(
    finding(
      'FACT_ID_UNIQUE',
      unique(factIds) ? 'PASS' : 'FAIL',
      'CRITICAL',
      'Fact IDs must be unique.',
      factIds.length,
      unique(factIds)
        ? ''
        : 'Regenerate duplicate fact IDs.'
    )
  );

  const materialReferences = arrayOf(
    artifacts.MATERIAL_SOURCE_REFERENCES_JSON,
    'references'
  );

  const resolution = resolveMaterialReferences(
    materialReferences,
    sourceRegister
  );

  findings.push(
    finding(
      'MATERIAL_REFERENCE_RESOLVES',
      resolution.unresolved.length
        ? 'FAIL'
        : 'PASS',
      'CRITICAL',
      'Each atomic material reference must resolve to exactly one workbook source. Every atomic member of a composite reference must resolve exactly once.',
      JSON.stringify(resolution.unresolved),
      resolution.unresolved.length
        ? 'Correct the workbook type, sheet, atomic field IDs, or source configuration.'
        : ''
    )
  );

  const materialReferenceIds = new Set(
    materialReferences.map(
      reference =>
        reference.material_source_reference_id
    )
  );

  const brokenFactReferences = facts.flatMap(
    fact =>
      (fact.material_source_reference_ids ?? [])
        .filter(
          referenceId =>
            !materialReferenceIds.has(referenceId)
        )
        .map(referenceId => ({
          fact: fact.fact_id,
          reference: referenceId
        }))
  );

  findings.push(
    finding(
      'FACT_REFERENCE_INTEGRITY',
      brokenFactReferences.length
        ? 'FAIL'
        : 'PASS',
      'CRITICAL',
      'Every fact material-source reference must exist.',
      JSON.stringify(brokenFactReferences),
      brokenFactReferences.length
        ? 'Correct missing material reference IDs.'
        : ''
    )
  );

  const materialFacts = arrayOf(
    artifacts.MATERIAL_FACT_SET_JSON,
    'facts'
  );

  const missingMaterialFacts = materialFacts
    .filter(fact => !factIds.includes(fact.fact_id))
    .map(fact => fact.fact_id);

  findings.push(
    finding(
      'MATERIAL_FACT_SUBSET',
      missingMaterialFacts.length
        ? 'FAIL'
        : 'PASS',
      'HIGH',
      'Every material fact must exist in FACT_SET.',
      missingMaterialFacts.join(', '),
      missingMaterialFacts.length
        ? 'Correct MATERIAL_FACT_SET fact IDs.'
        : ''
    )
  );

  const approvedMappingRules = new Set(
    (mappingCatalog.rules ?? []).map(
      rule => rule.mapping_rule_id
    )
  );

  const candidateIndicators = arrayOf(
    artifacts.CANDIDATE_INDICATOR_SET_JSON,
    'indicators'
  );

  const unapprovedMappings = candidateIndicators
    .filter(
      indicator =>
        !approvedMappingRules.has(
          indicator.mapping_rule_id
        )
    )
    .map(indicator => indicator.mapping_rule_id);

  findings.push(
    finding(
      'APPROVED_MAPPING_RULE',
      unapprovedMappings.length
        ? 'FAIL'
        : 'PASS',
      'CRITICAL',
      'Every mapped candidate must use an approved mapping rule.',
      unapprovedMappings.join(', '),
      unapprovedMappings.length
        ? 'Use an approved mapping rule or return UNMAPPED_FACT.'
        : ''
    )
  );

  const controlAssessments = arrayOf(
    artifacts.CONTROL_ASSESSMENT_JSON,
    'assessments'
  );

  const hardExclusionCandidates = arrayOf(
    artifacts.HARD_EXCLUSION_CANDIDATES_JSON,
    'candidates'
  );

  const exceptions = arrayOf(
    artifacts.EXCEPTION_SET_JSON,
    'exceptions'
  );

  const actualCounts = [
    ['material_source_references', materialReferences.length],
    ['facts', facts.length],
    ['material_facts', materialFacts.length],
    ['control_assessments', controlAssessments.length],
    ['candidate_indicators', candidateIndicators.length],
    [
      'hard_exclusion_candidates',
      hardExclusionCandidates.length
    ],
    ['exceptions', exceptions.length]
  ];

  const declaredCounts =
    artifacts.PACKAGE_MANIFEST_JSON
      ?.declared_counts ?? {};

  const countMismatches = actualCounts
    .filter(
      ([field, actual]) =>
        declaredCounts[field] !== actual
    )
    .map(([field, actual]) => ({
      field,
      declared: declaredCounts[field],
      actual
    }));

  findings.push(
    finding(
      'DECLARED_COUNTS_MATCH',
      countMismatches.length
        ? 'FAIL'
        : 'PASS',
      'HIGH',
      'Package Manifest counts must equal semantic artifact array lengths.',
      JSON.stringify(countMismatches),
      countMismatches.length
        ? 'Correct Package Manifest declared counts.'
        : ''
    )
  );

  const schemaVersions = [
    artifacts.RUN_HEADER?.output_schema_version,
    artifacts.FACT_SET_JSON?.schema_version,
    artifacts.MATERIAL_SOURCE_REFERENCES_JSON
      ?.schema_version
  ].filter(Boolean);

  const versionMismatch =
    schemaVersions.some(
      version => version !== expected.schemaVersion
    ) ||
    artifacts.RUN_HEADER?.mapping_version !==
      expected.mappingVersion ||
    artifacts.RUN_HEADER?.risk_model_version !==
      expected.riskModelVersion;

  findings.push(
    finding(
      'VERSION_MATCH',
      versionMismatch ? 'FAIL' : 'PASS',
      'HIGH',
      'Declared schema, mapping, and risk-model versions must match the invocation.',
      JSON.stringify({
        schema_versions: schemaVersions,
        mapping_version:
          artifacts.RUN_HEADER?.mapping_version,
        risk_model_version:
          artifacts.RUN_HEADER?.risk_model_version
      }),
      versionMismatch
        ? 'Correct version declarations or command arguments.'
        : ''
    )
  );

  /*
   * Only text on the same line after a decision label
   * counts as a populated human decision field.
   */
  const decisionFilled =
    /Gate 1 (?:Status|Decision ID|Reviewer Role|Decision Date)[^\S\r\n]*:[^\S\r\n]*\S+/i
      .test(agent.draftPacket);

  findings.push(
    finding(
      'GATE1_DECISION_BLANK',
      decisionFilled ? 'FAIL' : 'PASS',
      'CRITICAL',
      'Gate 1 decision fields must remain blank.',
      decisionFilled,
      decisionFilled
        ? 'Remove populated Gate 1 decision values and regenerate.'
        : ''
    )
  );

  /*
   * Detect an actual SOURCE_REGISTER_JSON heading, not a
   * sentence that merely says it must not be produced.
   */
  const sourceRegisterInAgent =
    /(?:^|\n)#{0,6}\s*SOURCE_REGISTER_JSON\s*(?:\n|$)/i
      .test(agent.text);

  findings.push(
    finding(
      'EXHAUSTIVE_SOURCE_REGISTER_ABSENT_FROM_AGENT',
      sourceRegisterInAgent ? 'FAIL' : 'PASS',
      'HIGH',
      'Copilot must not output the exhaustive Source Register.',
      sourceRegisterInAgent,
      sourceRegisterInAgent
        ? 'Remove SOURCE_REGISTER_JSON from the Copilot package.'
        : ''
    )
  );

  for (const prohibited of PROHIBITED) {
    const present = prohibited.re.test(agent.text);

    findings.push(
      finding(
        prohibited.id,
        present ? 'FAIL' : 'PASS',
        prohibited.severity,
        prohibited.description,
        present,
        present
          ? 'Remove prohibited output and regenerate the Copilot package.'
          : ''
      )
    );
  }

  return findings;
}

export function summarize(findings) {
  const counts = {
    PASS: 0,
    FAIL: 0,
    ERROR: 0,
    SKIPPED: 0
  };

  for (const item of findings) {
    counts[item.result] =
      (counts[item.result] ?? 0) + 1;
  }

  const blockingFailures = findings.filter(
    item =>
      item.result === 'FAIL' &&
      ['CRITICAL', 'HIGH'].includes(item.severity)
  ).length;

  return {
    total_checks: findings.length,
    passed: counts.PASS,
    failed: counts.FAIL,
    errors: counts.ERROR,
    skipped: counts.SKIPPED,
    blocking_failures: blockingFailures
  };
}

/*
 * Exported for focused unit testing and future reuse.
 */
export {
  expandReferenceIds,
  normalizeFieldId,
  resolveMaterialReferences
};
