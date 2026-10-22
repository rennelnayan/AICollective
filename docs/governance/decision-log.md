# Decision log

Non-obvious design decisions, with the reasoning. Add an entry when a choice
could reasonably have gone the other way.

Format: what was decided, what else was considered, why.

---

## D-001 — The language layer never scores

**Decided:** The intake analyser extracts facts and drafts narrative. A
deterministic engine produces every number.

**Considered:** Letting the agent return a score directly, which is simpler and
fewer moving parts.

**Why:** Scores must be reproducible and traceable to inputs. A model gives
different answers to identical inputs, which breaks traceability and makes the
weights untunable by the risk function.

---

## D-002 — Hard exclusions sit outside the weighted model

**Decided:** Shell bank and sanctioned-presence determinations are binary tests
run before scoring, not factors with weights.

**Considered:** A factor with a weight high enough to force the top band.

**Why:** 31 CFR 1010.630 is a prohibition, not a risk. Any weight implies good
answers elsewhere could outscore it. Meanwhile the FFIEC manual warns that no
single indicator should determine a risk profile — so nothing inside the
weighted model reaches the top band alone. Separating the mechanisms satisfies
both documents.

---

## D-003 — An unanswered question scores the maximum

**Decided:** A missing or null anchor scores 10.

**Considered:** Scoring it 0, or excluding the factor and reweighting.

**Why:** Silence is not evidence of absence. Scoring it low would reward
non-disclosure, and a respondent who declines to answer would score better than
one who answers badly.

---

## D-004 — A missing anchor is not an unanswered question

**Decided:** If the mapping produced no anchor for a factor, the engine refuses
to score rather than imputing the maximum.

**Considered:** Treating it the same as unanswered, which keeps cases moving.

**Why:** "We asked and got nothing" and "the mapping never evaluated this" are
different failures. Collapsing them turns a build defect into a risk finding,
and the defect is never fixed.

---

## D-005 — Residual risk is floored at 20 per cent of inherent

**Decided:** `residual = max(inherent x product, inherent x 0.20)`.

**Considered:** No floor, letting strong controls drive residual toward zero.

**Why:** Controls mitigate risk; they never eliminate it. Four domains at the
best tier gives 0.1785, below the floor — so the floor genuinely binds on a
perfect submission rather than being decorative.

---

## D-006 — Half-up rounding, implemented by hand

**Decided:** `roundHalfUp` works on the decimal digits rather than using
`toFixed`.

**Considered:** `toFixed(2)`, which is one line.

**Why:** `(2.675).toFixed(2)` returns `2.67` because of binary float
representation. A band boundary that flips depending on which runtime executed
it is indefensible in an audit trail.

---

## D-007 — The engine reads the signed workbook directly

**Decided:** No JSON intermediate between the Gate 1 review form and the
scoring engine.

**Considered:** Converting the form to `gate1-decision.json` as a separate step,
which is easier to diff and version.

**Why:** What the engine acts on is then exactly what the reviewer signed. With
an intermediate, someone could alter it between signature and scoring and
nothing would catch it.

---

## D-008 — Reviewer role is recorded per resolution

**Decided:** Each exception and hard exclusion resolution carries its own
`reviewer_id` and `reviewer_role`.

**Considered:** One reviewer and role for the whole decision.

**Why:** A sanctions determination and an evidence review are usually made on
different days by different people in different roles. A single field would
attribute a sanctions determination to whoever signed the form.

---

## D-009 — Remand and override are separate remedies

**Decided:** Gate 2 offers accept, override and remand. A remand produces no
effective band.

**Considered:** A single override mechanism with a reason code.

**Why:** A wrong fact is a Gate 1 failure, and the fix is to correct the
extraction or mapping rule. A system with only one button teaches reviewers to
override their way out of mapping bugs, and the recurring defect is never seen.

---

## D-010 — We started from the wrong framework

**Decided:** The FFIEC BSA/AML manual supplies method, not content; the
grounding for correspondent banking comes from 31 CFR 1010.610 and 1010.630 and
FATF Recommendation 7.

**Considered:** The AML canon generally, which is what "financial crime risk
assessment" first suggests.

**Why:** The initial reading list matched the domain label rather than the
decision being made. The correction was to name the decision first — should we
open this correspondent account — and then find the framework governing that
decision. Worth recording because the first instinct was wrong and the test
that caught it is reusable.
