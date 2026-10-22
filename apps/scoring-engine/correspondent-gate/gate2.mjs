/**
 * Gate 2 — assessment review.
 *
 * Gate 1 asks "do the facts match the documents?". Gate 2 asks "is the
 * assessment right?". The facts are settled by the time a case arrives here;
 * what is under review is the conclusion drawn from them.
 *
 * Two remedies, deliberately separate:
 *
 *   REMAND   a fact is wrong. Not an override - a Gate 1 failure that slipped
 *            through. The case goes back, the extraction or mapping rule is
 *            fixed, and the case is re-scored. An override here would paper
 *            over a defect that will recur on every future case.
 *
 *   OVERRIDE the facts are right but the conclusion is wrong. The model missed
 *            context the questions do not capture. Legitimate, and recorded.
 *
 * A system with only one button teaches analysts to override their way out of
 * mapping bugs.
 *
 * An override supersedes; it never overwrites. The machine output stays in the
 * record alongside the human one, because an examiner needs both.
 */

export class Gate2Error extends Error {}

export const Decision = Object.freeze({
  ACCEPT: "ACCEPT",
  OVERRIDE: "OVERRIDE",
  REMAND: "REMAND",
});

// Fixed list. Free text alone cannot be aggregated, and the override rate per
// category is the signal that tells you which factor needs re-weighting.
export const OVERRIDE_CATEGORIES = Object.freeze([
  "FACTOR_UNDERSTATES_RISK",
  "FACTOR_OVERSTATES_RISK",
  "CONTROL_TIER_UNDERSTATED",
  "CONTROL_TIER_OVERSTATED",
  "CONTEXT_NOT_CAPTURED_BY_MODEL",
  "CONCENTRATION_OR_PORTFOLIO_EFFECT",
  "SUPERVISORY_OR_POLICY_DIRECTION",
]);

export const REMAND_REASONS = Object.freeze([
  "EXTRACTED_VALUE_DOES_NOT_MATCH_SOURCE",
  "MAPPING_RULE_APPLIED_WRONG_ANCHOR",
  "SOURCE_DOCUMENT_SUPERSEDED",
  "MATERIAL_FIELD_MISSED_BY_MAPPING",
]);

const MIN_RATIONALE = 50;

function requireNamedHuman(value, field) {
  if (!value || String(value).trim().startsWith("[")) {
    throw new Gate2Error(
      `${field} is a placeholder. A Gate 2 decision needs a named human.`);
  }
}

/**
 * Apply a Gate 2 decision to a scoring result.
 *
 * Returns the assessment record: machine output and human decision side by
 * side, never merged.
 */
export function applyGate2Decision(scoringOutput, decision) {
  if (!scoringOutput?.scoring_authorised) {
    throw new Gate2Error(
      "Gate 2 cannot review an unauthorised score. The case has not cleared " +
      "admission, so there is no assessment to review.");
  }
  if (decision.case_id !== scoringOutput.case_id) {
    throw new Gate2Error(
      `decision is for case ${decision.case_id}, score is ${scoringOutput.case_id}`);
  }
  if (!Object.values(Decision).includes(decision.decision)) {
    throw new Gate2Error(
      `decision must be one of ${Object.values(Decision).join(", ")}, ` +
      `got ${JSON.stringify(decision.decision)}`);
  }
  requireNamedHuman(decision.reviewer_id, "reviewer_id");

  // A reviewer must confirm they are looking at the same numbers that were
  // produced. Config drift between scoring and review is silent otherwise.
  if (decision.reviewed_risk_model_version !== scoringOutput.risk_model_version ||
      decision.reviewed_mapping_version !== scoringOutput.mapping_version) {
    throw new Gate2Error(
      `version drift: scored under risk model ${scoringOutput.risk_model_version} / ` +
      `mapping ${scoringOutput.mapping_version}, reviewed against ` +
      `${decision.reviewed_risk_model_version} / ${decision.reviewed_mapping_version}. ` +
      "Re-score before reviewing.");
  }

  const record = {
    schema_name: "GATE2_ASSESSMENT_RECORD",
    schema_version: "1.0.0",
    case_id: scoringOutput.case_id,
    run_id: scoringOutput.run_id,
    gate_2_decision_id: decision.gate_2_decision_id,
    decision: decision.decision,
    reviewer_id: decision.reviewer_id,
    reviewer_role: decision.reviewer_role,
    decision_date: decision.decision_date,
    risk_model_version: scoringOutput.risk_model_version,
    mapping_version: scoringOutput.mapping_version,

    // The machine's answer. Preserved whatever the human decides.
    machine_assessment: {
      inherent: scoringOutput.inherent,
      combined_multiplier: scoringOutput.combinedMultiplier,
      floor_applied: scoringOutput.floorApplied,
      residual: scoringOutput.residual,
      band: scoringOutput.band,
      approval: scoringOutput.approval,
    },
  };

  if (decision.decision === Decision.ACCEPT) {
    record.effective_band = scoringOutput.band;
    record.effective_residual = scoringOutput.residual;
    record.next_step = scoringOutput.approval;
    record.reviewer_comments = decision.reviewer_comments ?? null;
    return record;
  }

  if (decision.decision === Decision.REMAND) {
    if (!REMAND_REASONS.includes(decision.remand_reason)) {
      throw new Gate2Error(
        `remand_reason must be one of ${REMAND_REASONS.join(", ")}, ` +
        `got ${JSON.stringify(decision.remand_reason)}`);
    }
    if (!decision.disputed_source_record_ids?.length) {
      throw new Gate2Error(
        "a remand must name the source records in dispute. A remand without " +
        "them cannot be acted on.");
    }
    record.remand = {
      reason: decision.remand_reason,
      disputed_source_record_ids: decision.disputed_source_record_ids,
      rationale: decision.rationale,
      returns_to: "GATE_1",
    };
    record.effective_band = null;   // nothing is effective until re-scored
    record.effective_residual = null;
    record.next_step = "Return to Gate 1. Correct the extraction or mapping rule, " +
                       "then re-score. Do not override a fact error.";
    return record;
  }

  // OVERRIDE
  if (!OVERRIDE_CATEGORIES.includes(decision.override_category)) {
    throw new Gate2Error(
      `override_category must be one of ${OVERRIDE_CATEGORIES.join(", ")}, ` +
      `got ${JSON.stringify(decision.override_category)}`);
  }
  const rationale = String(decision.rationale ?? "").trim();
  if (rationale.length < MIN_RATIONALE) {
    throw new Gate2Error(
      `rationale must be at least ${MIN_RATIONALE} characters, got ${rationale.length}. ` +
      "An override that cannot be explained cannot be defended to an examiner.");
  }
  if (!decision.override_band) {
    throw new Gate2Error("an override must state the band it moves the case to");
  }
  if (decision.override_band === scoringOutput.band) {
    throw new Gate2Error(
      `override_band ${decision.override_band} is the band already assessed. ` +
      "Use ACCEPT if you agree with the machine output.");
  }

  record.override = {
    category: decision.override_category,
    from_band: scoringOutput.band,
    to_band: decision.override_band,
    direction: decision.override_band_index > decision.machine_band_index
      ? "UPWARD" : "DOWNWARD",
    rationale,
    affected_factor_ids: decision.affected_factor_ids ?? [],
  };
  record.effective_band = decision.override_band;
  record.effective_residual = scoringOutput.residual;  // the number is not altered
  record.next_step = decision.next_step ?? "Apply the approval path for the effective band.";
  record.reviewer_comments = decision.reviewer_comments ?? null;
  return record;
}

/** Override rate per factor and category. The feedback loop into the model. */
export function overrideReport(records) {
  const byCategory = {};
  const byFactor = {};
  let accepted = 0, overridden = 0, remanded = 0;

  for (const r of records) {
    if (r.decision === Decision.ACCEPT) accepted += 1;
    else if (r.decision === Decision.REMAND) remanded += 1;
    else {
      overridden += 1;
      const c = r.override.category;
      byCategory[c] = (byCategory[c] ?? 0) + 1;
      for (const f of r.override.affected_factor_ids) {
        byFactor[f] = (byFactor[f] ?? 0) + 1;
      }
    }
  }
  const total = records.length || 1;
  return {
    total: records.length,
    accepted, overridden, remanded,
    override_rate: Number((overridden / total).toFixed(3)),
    remand_rate: Number((remanded / total).toFixed(3)),
    by_category: byCategory,
    by_factor: byFactor,
    // A factor overridden this often is not being overridden because analysts
    // are wrong. It is a broken factor, or a weight that needs tuning.
    factors_for_review: Object.entries(byFactor)
      .filter(([, n]) => n / total >= 0.25)
      .map(([f, n]) => ({ factor_id: f, rate: Number((n / total).toFixed(3)) })),
  };
}

export function renderGate2(record) {
  const out = [
    "=".repeat(76),
    `GATE 2  case ${record.case_id}   run ${record.run_id}`,
    "=".repeat(76),
    `  Decision        : ${record.decision}`,
    `  Reviewer        : ${record.reviewer_id} (${record.reviewer_role})`,
    `  Date            : ${record.decision_date}`,
    "",
    "  Machine assessment (preserved):",
    `    inherent ${record.machine_assessment.inherent}  x ` +
    `${record.machine_assessment.combined_multiplier}  -> residual ` +
    `${record.machine_assessment.residual}  band ${record.machine_assessment.band}`,
  ];
  if (record.override) {
    out.push("", "  Override:",
      `    ${record.override.from_band} -> ${record.override.to_band} ` +
      `(${record.override.direction})`,
      `    category: ${record.override.category}`,
      `    factors:  ${record.override.affected_factor_ids.join(", ") || "none named"}`,
      `    rationale: ${record.override.rationale}`);
  }
  if (record.remand) {
    out.push("", "  Remand:",
      `    reason: ${record.remand.reason}`,
      `    disputed records: ${record.remand.disputed_source_record_ids.join(", ")}`,
      `    rationale: ${record.remand.rationale ?? "none given"}`);
  }
  out.push("",
    `  Effective band  : ${record.effective_band ?? "none - not effective"}`,
    `  Next step       : ${record.next_step}`);
  return out.join("\n");
}
