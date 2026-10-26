/**
 * Apply a human Gate 1 decision to a draft packet.
 *
 * The decision file is written by the reviewer, never generated. This module
 * only applies what a human already recorded, and it refuses to apply a
 * decision that does not account for every open item.
 */

export class ResolutionError extends Error {}

export function applyGate1Decision(packet, decision) {
  if (decision.case_id !== (packet.run_and_case_header?.case_id ?? packet.case_id)) {
    throw new ResolutionError(
      `decision is for case ${decision.case_id}, packet is ${packet.case_id}`);
  }

  const resolved = structuredClone(packet);
  const applied = [];

  // Exceptions: a resolution clears the blocking flag and records who cleared it.
  const excResolutions = new Map(
    (decision.exception_resolutions ?? []).map((r) => [r.exception_id, r]));
  for (const exc of resolved.exceptions_and_missing_information ?? []) {
    const r = excResolutions.get(exc.exception_id);
    if (!r) continue;
    if (!r.resolved_by || r.resolved_by.startsWith("[")) {
      throw new ResolutionError(
        `${exc.exception_id}: resolved_by is a placeholder. A resolution needs a named human.`);
    }
    exc.blocking = false;
    exc.resolution = r;
    applied.push(`${exc.exception_id} -> ${r.resolution} by ${r.resolved_by}`);
  }

  // Hard exclusions: only a human may move one off UNKNOWN.
  const hexResolutions = new Map(
    (decision.hard_exclusion_resolutions ?? []).map((r) => [r.hard_exclusion_candidate_id, r]));
  for (const hx of resolved.hard_exclusion_candidates ?? []) {
    const r = hexResolutions.get(hx.hard_exclusion_candidate_id);
    if (!r) continue;
    if (!["NOT_TRIGGERED", "TRIGGERED"].includes(r.status)) {
      throw new ResolutionError(
        `${hx.hard_exclusion_candidate_id}: a resolution must be NOT_TRIGGERED or ` +
        `TRIGGERED, got ${r.status}. UNKNOWN is what we are resolving, not a resolution.`);
    }
    if (!r.determination_source) {
      throw new ResolutionError(
        `${hx.hard_exclusion_candidate_id}: determination_source is required. ` +
        "A hard exclusion determination must say where it came from.");
    }
    hx.status = r.status;
    hx.resolution = r;
    applied.push(`${hx.hard_exclusion_candidate_id} -> ${r.status} by ${r.resolved_by}`);
  }

  resolved.gate_1_decision_section = {
    gate_1_decision_id: decision.gate_1_decision_id,
    gate_1_status: decision.gate_1_status,
    reviewer_role: decision.reviewer_role,
    reviewer_id: decision.reviewer_id,
    decision_date: decision.decision_date,
    reviewer_comments: decision.reviewer_comments,
    approved_indicator_ids: decision.approved_indicator_ids ?? null,
    excluded_indicator_ids: decision.excluded_indicator_ids ?? null,
  };
  applied.push(`Gate 1 ${decision.gate_1_status} by ${decision.reviewer_role}`);

  return { resolved, applied };
}
