/**
 * Correspondent banking respondent risk scoring engine.
 *
 * Deterministic. No model calls, no network, no randomness, no clock.
 * Same input plus same config version always produces the same output.
 *
 * The language layer produces facts. This module produces the number.
 */

import { readFileSync } from "node:fs";

// Anchors are fixed by the model design, not by configuration.
// Changing these would change what a score means, not how much it counts.
export const VALID_ANCHORS = [0, 3, 6, 10];

// An unscoreable factor takes the maximum. Silence is not evidence of absence,
// and scoring a non-answer as zero would reward non-disclosure.
export const UNANSWERED_ANCHOR = 10;

export class ConfigError extends Error {}   // invalid config: fail at load, never at score time
export class ScoringError extends Error {}  // unscoreable input: never guess, never default

/**
 * Half-up rounding on the shortest round-trip decimal form of the number.
 *
 * JavaScript's toFixed is unreliable at ties because of binary representation,
 * and a band boundary that flips depending on where it ran is indefensible in
 * an audit trail. This works on the digits directly, matching Python's
 * Decimal(str(x)).quantize(..., ROUND_HALF_UP) exactly.
 */
export function roundHalfUp(value, places = 2) {
  if (!Number.isFinite(value)) throw new ScoringError(`cannot round ${value}`);
  let s = String(value);
  if (s.includes("e") || s.includes("E")) s = value.toFixed(20);

  const negative = s.startsWith("-");
  if (negative) s = s.slice(1);

  let [intPart, fracPart = ""] = s.split(".");
  if (fracPart.length <= places) {
    return Number((negative ? "-" : "") + intPart + "." + fracPart.padEnd(places, "0"));
  }

  const keep = fracPart.slice(0, places);
  const nextDigit = fracPart.charCodeAt(places) - 48;
  let digits = (intPart + keep).split("");

  if (nextDigit >= 5) {
    let i = digits.length - 1;
    for (;;) {
      if (i < 0) { digits.unshift("1"); break; }
      const d = digits[i].charCodeAt(0) - 48;
      if (d === 9) { digits[i] = "0"; i -= 1; } else { digits[i] = String(d + 1); break; }
    }
  }

  const all = digits.join("");
  const cut = all.length - places;
  const out = places === 0 ? all : all.slice(0, cut) + "." + all.slice(cut);
  return Number((negative ? "-" : "") + out);
}

export class ScoringConfig {
  constructor({ version, effective_from, factor_weights, control_domains,
                evidence_multipliers, residual_floor, bands }) {
    this.version = version;
    this.effectiveFrom = effective_from;
    this.factorWeights = { ...factor_weights };
    this.controlDomains = [...control_domains];
    this.evidenceMultipliers = { ...evidence_multipliers };
    this.residualFloor = Number(residual_floor);
    this.bands = bands.map((b) => ({ ...b }));
    this.#validate();
    Object.freeze(this);
  }

  #validate() {
    const total = Object.values(this.factorWeights).reduce((a, b) => a + b, 0);
    if (Math.abs(total - 100) > 1e-9) {
      throw new ConfigError(
        `factor weights must total 100, got ${total} in config ${this.version}`);
    }
    if (!(this.residualFloor >= 0 && this.residualFloor <= 1)) {
      throw new ConfigError(`residual_floor must be between 0 and 1, got ${this.residualFloor}`);
    }
    for (const [tier, mult] of Object.entries(this.evidenceMultipliers)) {
      if (!(mult > 0 && mult <= 1)) {
        throw new ConfigError(`multiplier for "${tier}" must be in (0, 1], got ${mult}`);
      }
    }
    if (!this.bands.length || this.bands[0].lower_bound !== 0) {
      throw new ConfigError("bands must start at a lower bound of 0");
    }
    const bounds = this.bands.map((b) => b.lower_bound);
    for (let i = 1; i < bounds.length; i += 1) {
      if (bounds[i] < bounds[i - 1]) {
        throw new ConfigError("bands must be listed in ascending order of lower bound");
      }
    }
  }

  static load(path) {
    return new ScoringConfig(JSON.parse(readFileSync(path, "utf8").replace(/^\uFEFF/, "")));
  }
}

/** Return [anchor, cameFromNonAnswer]. */
function resolveAnchor(factorId, factors) {
  const entry = factors[factorId];
  if (!entry || entry.anchor === null || entry.anchor === undefined || entry.unanswered) {
    return [UNANSWERED_ANCHOR, true];
  }
  if (!VALID_ANCHORS.includes(entry.anchor)) {
    throw new ScoringError(
      `factor ${factorId}: anchor ${JSON.stringify(entry.anchor)} is not one of ` +
      `${VALID_ANCHORS.join(", ")}. The criteria decide the anchor; ` +
      `the engine does not interpolate.`);
  }
  return [Number(entry.anchor), false];
}

function bandFor(residual, config) {
  let selected = config.bands[0];
  for (const candidate of config.bands) {
    if (residual >= candidate.lower_bound) selected = candidate;
    else break;
  }
  return selected;
}

/**
 * Score one respondent.
 *
 * extraction is the contract object the parsing layer produces:
 *   { factors:  { F1: { anchor: 3, evidence_refs: ["Q2"] }, ... },
 *     controls: { C1: { tier: "Partially evidenced", evidence_refs: ["Q22g"] }, ... } }
 *
 * Every factor in the config must be present or explicitly unanswered.
 * Every control domain must carry a tier. Nothing is defaulted silently.
 */
export function score(extraction, config) {
  const factorsIn = extraction.factors ?? {};
  const controlsIn = extraction.controls ?? {};

  const factorLines = [];
  let inherent = 0;
  for (const [factorId, weight] of Object.entries(config.factorWeights)) {
    const [anchor, unanswered] = resolveAnchor(factorId, factorsIn);
    const weighted = (anchor / 10) * weight;
    inherent += weighted;
    factorLines.push({
      factorId, anchor, weight,
      weighted: roundHalfUp(weighted),
      unanswered,
      evidenceRefs: factorsIn[factorId]?.evidence_refs ?? [],
    });
  }

  const controlLines = [];
  let combined = 1;
  for (const domainId of config.controlDomains) {
    const entry = controlsIn[domainId];
    // No tier stated means no evidence seen, which earns no reduction.
    const tier = entry?.tier ?? "Absent or unanswered";
    if (!(tier in config.evidenceMultipliers)) {
      throw new ScoringError(
        `control ${domainId}: tier "${tier}" is not a configured evidence tier ` +
        `(${Object.keys(config.evidenceMultipliers).sort().join(", ")})`);
    }
    const multiplier = config.evidenceMultipliers[tier];
    combined *= multiplier;
    controlLines.push({ domainId, tier, multiplier, evidenceRefs: entry?.evidence_refs ?? [] });
  }

  // Controls reduce risk; they never eliminate it.
  const unfloored = inherent * combined;
  const floorValue = inherent * config.residualFloor;
  const residual = Math.max(unfloored, floorValue);
  const band = bandFor(roundHalfUp(residual), config);

  return {
    configVersion: config.version,
    inherent: roundHalfUp(inherent),
    factorLines,
    controlLines,
    combinedMultiplier: roundHalfUp(combined, 4),
    unflooredResidual: roundHalfUp(unfloored),
    floorValue: roundHalfUp(floorValue),
    floorApplied: floorValue > unfloored,
    residual: roundHalfUp(residual),
    band: band.name,
    approval: band.approval,
  };
}

/** Plain-text derivation, for the memo and the audit record.
 *  The narrative step receives this as a fixed input it may not alter. */
export function explain(result) {
  const out = [`Scored under config ${result.configVersion}.`, "", "Inherent risk:"];
  for (const fl of result.factorLines) {
    const note = fl.unanswered ? "  [unanswered - scored at maximum]" : "";
    const refs = fl.evidenceRefs.length ? `  (${fl.evidenceRefs.join(", ")})` : "";
    out.push(`  ${fl.factorId}: anchor ${fl.anchor}/10 x weight ${fl.weight} ` +
             `= ${fl.weighted.toFixed(2)}${refs}${note}`);
  }
  out.push(`  Inherent = ${result.inherent.toFixed(2)}`, "", "Control effectiveness:");
  for (const cl of result.controlLines) {
    const refs = cl.evidenceRefs.length ? `  (${cl.evidenceRefs.join(", ")})` : "";
    out.push(`  ${cl.domainId}: ${cl.tier} = x${cl.multiplier.toFixed(2)}${refs}`);
  }
  out.push(
    `  Combined multiplier = ${result.combinedMultiplier.toFixed(4)}`, "",
    `Unfloored residual = ${result.inherent.toFixed(2)} x ` +
    `${result.combinedMultiplier.toFixed(4)} = ${result.unflooredResidual.toFixed(2)}`,
    `Floor = ${result.inherent.toFixed(2)} x floor rate = ${result.floorValue.toFixed(2)}`);
  if (result.floorApplied) {
    out.push("  Floor applied. Controls cannot reduce residual risk below the floor, " +
             "however strong the evidence.");
  }
  out.push("", `Residual risk = ${result.residual.toFixed(2)}`,
           `Band = ${result.band}`, `Approval required = ${result.approval}`);
  return out.join("\n");
}
