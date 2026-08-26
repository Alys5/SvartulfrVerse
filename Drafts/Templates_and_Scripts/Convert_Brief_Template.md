# 🔄 CONVERT BRIEF: [SOURCE WORLD NAME] → [NEW WORLD NAME]
*Input document for the World Forge **Converter** (Phase C0). Optional — the Converter can also run interactively, but a Brief is recommended for non-trivial conversions because it is version-controllable and reviewable.*

---

## HOW TO USE THIS TEMPLATE

This Brief tells the Converter what to **keep**, what to **modify**, and what to **regenerate** when reframing an existing shipped world into a new build. The Converter reads it, validates it against the source world's `Master_Design.md`, asks clarifying questions where the Brief is silent or ambiguous, and writes a new `World_Seed.md` that goes through the standard pipeline via `/worldforge skip phase0`.

Fill in every section below. Delete instructional text in brackets before submitting. Leave section headers intact — the Converter uses them as navigation anchors.

**Important:** This Brief is *not* a World Seed. It is a delta description. The new World Seed is produced by the Converter from this Brief plus the source world's content. Do not author Tier 1, Tier 2, or Tier 3 content here; declare what you want done with the *source's* content and provide the new protagonist's psychological frame.

**When NOT to use the Converter:** if you are changing **setting + protagonist + factions + tone** all at once, you are not converting — you are building a new world that takes inspiration from the source. Use `/worldforge start` against a fresh project folder instead. The Converter will refuse a four-axes-replaced Brief.

**Rebaseline mode:** if you are changing *nothing structural* — same protagonist, same World Mode, same tone — and want to consolidate accumulated revisions into a clean rebuild (optionally adding new mechanics), declare `Operating mode: rebaseline` in Section 1 and invoke with `--rebaseline`.

---

## 1. SOURCE & TARGET **[REQUIRED]**

**Source project path:** [Absolute or workspace-relative path to the source world's project folder.]

**Source world name:** [The name from the source's Master Design Section 1, for clarity.]

**Source World Mode:** [`arc` | `sandbox`]

**Target project path:** [Absolute or workspace-relative path to the new project folder.]

**Target World Mode:** [`arc` | `sandbox` | `unchanged`]

**Operating mode:** [`reframe` (default) | `rebaseline`]

**Rebaseline consolidation:** [`seed-anchored` (default) | `distill`]

---

## 2. CONVERSION INTENT **[REQUIRED]**

**In one or two sentences, what is this conversion?**

> [Your intent statement here.]

**New mechanics (rebaseline only):** [What new mechanics or structural content are you introducing in the rebuild — or write `none — pure consolidation`.]

---

## 3. OVERLAP FLOOR CHECK **[REQUIRED]**

| Axis | What is the source's value? | What is the new value? | Kept or Replaced? |
|---|---|---|---|
| **Setting** | [...] | [...] | [`kept` | `replaced`] |
| **Protagonist** | [...] | [...] | [`kept` | `replaced`] |
| **Factions** | [...] | [...] | [`kept` | `replaced`] |
| **Tone** | [...] | [...] | [`kept` | `replaced`] |

**Axes replaced (count):** [0 | 1 | 2]

---

## 4. PRESERVATION DECISIONS **[REQUIRED]**

### 4a. World rules / cosmology / mechanics (Section 2 — Tier 1)
[`keep` | `modify` | `regenerate`]

### 4b. Factions (Section 2c)
- **[Faction name 1]:** [`keep` | `modify: <description>` | `drop`]
- **[Faction name 2]:** [`keep` | `modify: <description>` | `drop`]

### 4c. Standing locations (Section 2d)
- **[Location name 1]:** [`keep` | `modify: <description>` | `drop`]

### 4d. Species, types, categories, concepts (Sections 2e, 2f)
- [`keep all` | per-entry disposition]

### 4e. Major characters (Section 4 — Tier 2)

[For each named character / NPC in the source, declare disposition. The most consequential row in the Brief — the role reassignments live here.]

- **[Character name 1]:** [`keep as-is (same role)` | `role change: was <old role>, now <new role>` | `drop` | `regenerate as someone new`]
- **[Character name 2]:** [...]
- [...]

**If the old protagonist becomes a Tier 2 character**, name the new role explicitly. Example: "Lucifer: role change — was `{{user}}` (protagonist), now principal NPC and primary antagonist." The Converter will surface this as a role reassignment and confirm with you.

**If a source NPC becomes the new protagonist**, mark them `drop from Tier 2` and write the new protagonist's full psychological frame in Section 5 below. The source character's Tier 2 entries will be starting material for the new Section 3 but get reauthored as protagonist-shaped content downstream.

**Reminders for what gets handled automatically inside Section 4 (you do not declare these here):**
- **`Standing Goal`** per principal NPC carries across **only if** the goal doesn't cite the old protagonist or depend on the old protagonist's role / power tier. Protagonist-coupled goals (e.g., "to corrupt {{user}}") get stripped with a reauthor marker; the new build will populate them once the new protagonist's Section 3 lands.
- **`Escalation Ladder`** per laddered principal rides the Standing Goal rule. When the goal carries, protagonist-coupled stages and the collision line (it names `{{user}}` by definition) still get stripped with reauthor markers; protagonist-agnostic stages carry. The *active stage* never carries — it is Tier 3 state and the new build re-places it.
- **`How it drifts (arc worlds)`** per relationship is arc-coupled and always stripped — arcs are being regenerated downstream, so the drift trajectory will be authored fresh.
- **`Operative belief`** per relationship carries across **only** when it's between two preserved characters AND doesn't reference `{{user}}`. Beliefs about `{{user}}` get stripped (`{{user}}` has changed); beliefs between preserved characters whose dynamic shifted because the protagonist changed get surfaced for your decision during the Converter's interview.
- **`Trauma trajectory (arc worlds)`** per intimate character is arc-coupled and always stripped. The base `Trauma map` (trigger + response, no trajectory) carries across normally. Sandbox sources never had a trajectory authored, so this rule is a no-op for sandbox preservation.
- **`Protagonist Intimate Embodiment`** (Section 3) is always regenerated with the protagonist — stature, anatomy, stamina, and valence belong to whoever `{{user}}` now is. The world's **stock-register hard rules** (Section 8a) carry across regardless: they bind the prose to whatever bodies the world authors, so they survive a protagonist swap even though the bodies do not.
- **`Embodied baseline`** per intimate character carries across unchanged — age and body history, build and scale, arousal and recovery mechanics. It describes that character's own body, which a protagonist swap does not alter, so it transfers verbatim including its observable register and its both-directions framing.
- **`Physical dyad`** is a *pairing* property, not a character property, so it splits. Dyads computed against `{{user}}` (height, build, stamina, age gap, experience) are **always stripped with a reauthor marker** — the other half of the pairing has been replaced, which voids every differential. Dyads between two preserved characters carry across unchanged, and are dropped only if a partner is dropped or role-shifted out of the pairing.

***Rebaseline:* the auto-strip rules above invert to carry** — the protagonist and arc spine are unchanged, so Standing Goals, Escalation Ladders (stages, endpoint, collision — with the rebuild starting from the post-revision high-water stage), drift trajectories, operative beliefs, trauma trajectories, and `{{user}}` physical dyads transfer verbatim at their post-revision state (carried from the source seed, with revision deltas applied in place — the Converter's Step D). Relationship-to-`{{user}}` content also carries (same `{{user}}`). The only strip: drift/trauma/ladder lines referencing an arc you are dropping or restructuring via new mechanics.
### 4f. Section 1 — Core Concept & Tone
- **Logline:** [`keep` | `new`]
- **Emotional payoff:** [`keep` | `modify` | `regenerate`]
- **Hard tonal rules:** [`keep` | `modify` | `regenerate`]

### 4g. Section 1.5a — Style Contract (world defaults)
- **Perspective:** [`keep` | `first` | `second` | `third_limited` | `third_omniscient`]
- **Tense:** [`keep` | `past` | `present`]
- **Narration marker:** [`keep` | `asterisks_for_narration` | `asterisks_for_thoughts_only` | `plain_prose`]
- **Dialogue marker:** [`keep` | `double_quotes` | `single_quotes` | `em_dash` | `unmarked`]
- **Emphasis marker:** [`keep` | `double_asterisks` | `italics_underscore` | `none`]
- **Paragraph register:** [`keep` | `terse` | `standard` | `dwelling`]

### 4h. Section 8 — Intimacy (world-level)
[`n/a` | `preserve` | `regenerate` | `add` | `drop`]

### 4i. Section 9 — Runtime Directives
[`n/a` | `keep` | `modify` | `drop` | `regenerate`]

---

## 5. THE NEW PROTAGONIST (`{{user}}`) **[REQUIRED — reframe mode]**

*Reframe mode: author the new protagonist frame using the standardized World-Forge bullet-point structure.*

*Rebaseline: skip this section — write `rebaseline — protagonist unchanged, carried at post-revision state` and leave the fields blank. The Converter carries Section 3 over 1:1 from the source seed with any revision deltas applied (distilling from the post-revision Master Design only on the `--distill` path or when the source has no seed file). **One exception worth filling in even on a rebaseline:** if the source world predates the posture contract and has no `Posture Toward {{user}}` block at all, fill the posture fields below — the divergence scan cannot surface a field that is absent from both the seed and every revision, and a consolidation is the cheapest moment to add it.*
**Identity and role:** [Who is the new `{{user}}` in this world?]

**Physical description & baseline:**
- Face & Hair: [Face shape, expression tells, hair style/color]
- Eyes & Build: [Eye contact habits, height, build, posture]
- Anatomy: [Breast/chest, intimate details if relevant]
- Sensory Signature / Scent: [Musk, wet fur, blood-iron, rosewater, etc.]

**Psychological Profile:**
- Motivation: [Primary emotional or strategic driver]
- Deepest Fear: [Core insecurity or fear of loss]
- Short-Term / Long-Term Goals: [Immediate desire & ultimate ambition]
- Internal Conflict & Vulnerability: [Contradiction & tell when exposed]

**Social Behavior & Speech:**
- Casual Tone & Quirks: [Speech style, cadence, catchphrases]
- Praise / Irritation Responses: [Tells when praised or annoyed]

**Behavior Notes & Invariants:**
- Dietary Preference: [MANDATORY PER AGENTS.MD RULE #9]
- Key Habits & Preferences: [Routine physical behaviors]

**Dynamic Behaviors & Triggers:**
- Reactions to Praise / Teasing / Apology / Conflict

**Posture toward the new `{{user}}`:** *(all four fields — this block regenerates in full, because every field in it is computed against a specific protagonist: who does not defer is a stance toward* this *person, what is losable names* their *attachments, and the boundary is your line for* this *character. A posture carried over from the source aims the world's opposition at someone who is no longer in the story. Leaving it blank does not give you a neutral world — the model's trained disposition fills the gap with deference.)*

- **Default posture:** [`adversarial` | `indifferent` | `mixed` | `deferential` | `predatory`] — [why. You may reuse the source's value if the world's general hardness still applies to the new protagonist; `mixed` is the most common honest answer, `deferential` is a legitimate deliberate choice, and `predatory` is the world that gives the new `{{user}}` what they want *as the mechanism of harm*. **If this conversion shifts the protagonist's power tier** (mortal → deity, outsider → insider, or the reverse), re-think this rather than reusing — a posture written for a powerless protagonist is backwards for a powerful one, and a tier shift upward is the most common way a `mixed` world becomes a `deferential` or `predatory` one.]
- **Who does not defer:** [A named person, faction, or institution that will not give the new `{{user}}` what they want — and what it wants instead. Required in all five postures, `deferential` included: universal deference has nothing to measure itself against. In a `predatory` world, answer instead with what does not defer *though the people do* — the consequence that lands anyway, the thing their power cannot reach.]
- **What the new `{{user}}` can lose:** [Two or three concrete, nameable things, each with its harm class: **material** / **relational** / **physical** / **moral** (complicity, self-image, a line they can't uncross) / **epistemic** (being deceived and acting on it). The test: could you write the scene where it is gone? "Their reputation" fails; "the crew's willingness to sail under them, which they have never had to ask for" passes. If the new protagonist is invulnerable, omnipotent, or universally obeyed, the first three classes may genuinely not apply — say so and give moral/epistemic stakes instead, rather than writing "nothing."]
- **What losing looks like — and where the line is:** [Both halves. The permitted shapes of a lost scene in this world (refusal, defeat, public humiliation, capture, a door that stays shut, an act they can't take back, finding out they were played), *and* the boundary — in whichever direction this world needs it. Off the table: what does not happen regardless. **On the table:** for souls-like, survival, or thriller builds, state explicitly that death, defeat, and game-over are legitimate outcomes, or the model reinstates its own floor.]
- **How the world works on them** *(required if `predatory`; otherwise wherever manipulation is a mechanic)*: [The vectors NPCs pull — appeals to love, duty, pity, grievance; manufactured urgency; small asks escalating; what the world pays in. Give two or three phrasings **in the NPCs' own voices**, since the wording is the mechanic. Then the **tell rule**: `opaque` (the appeal reads as genuine), `visible-but-tempting` (they see it and want to say yes anyway), or `mixed by character`.]

---

## 6. TEST SCENARIOS (Section 7b) **[REQUIRED — reframe mode]**

1. [Scene 1 — Tense meeting with preserved NPC]
2. [Scene 2 — Action beat / exploration]
3. [Scene 3 — Social / intimate dynamic]

---

## 7. NOTES FOR THE CONVERTER **[OPTIONAL]**

[Free text. Anything that doesn't fit the structured fields above.]

---

## 8. SIGN-OFF

- [ ] Source path verified to contain a shipped world
- [ ] Target path verified to be empty
- [ ] Overlap floor check filled in honestly
- [ ] Preservation decisions made for every Section 4a–4h row
- [ ] New protagonist (Section 5) authored with standardized World-Forge fields
- [ ] Test scenarios (Section 6) written

---