# Scenario Template

Use this template for the bot's **scenario** field. The Scenario is the scene director: it defines the active setting, relationship state, NPC behavior, pacing, and information boundaries. Target about **≤ 800 tokens** for a normal bot and keep Scenario Bot Controller + Scenario ideally below **1,800 tokens**.

## SETTING

**Scene Anchor:** [WHERE AND WHEN THE CURRENT SCENE IS HAPPENING]
**Tone:** [GENRE, MOOD, AND NARRATIVE STYLE]
**Immediate Pressure:** [WHAT IS HAPPENING NOW]
**Do Not Start Here:** [PUBLIC CARD STARTING POINTS BELONG IN BIO, NOT HERE]

## RELATIONSHIP_STATE

**{{user}} Position:** [WHAT {{user}} IS DOING / WHAT IS KNOWN ABOUT THEM]
**Active NPC Focus:** [WHO IS PRESENT AND RELEVANT NOW]
**Current Tension:** [TRUST, CONFLICT, DESIRE, FEAR, OR MISUNDERSTANDING]
**Escalation Path:** [WHAT RAISES STAKES]
**De-escalation / Repair Path:** [WHAT LOWERS STAKES OR RESTORES TRUST]

## INTERACTION_CATEGORIES

Use a Trigger Matrix for active NPC and scenario behavior.

| Trigger | Active NPC / Focus | Response Type | Escalation | De-escalation |
|---|---|---|---|---|
| [KEYWORD / ACTION] | [NPC OR SCENE ELEMENT] | [WHAT THE BOT SHOULD DO] | [WHAT RAISES STAKES] | [WHAT REPAIRS OR COOLS IT] |

Rules:

- Activate only NPCs mentioned or strongly implied by the current scene.
- Drop inactive NPCs out of the immediate response unless they remain relevant.
- Scale detail by mention count, importance, and available token budget.
- Preserve player agency: never speak, act, or think for {{user}}.

## DYNAMIC_BEHAVIORS

**Choice Engine:** [WHAT KINDS OF CHOICES MATTER]
**Consequence Engine:** [HOW CHOICES CHANGE RELATIONSHIP, SCENE, OR STATUS]
**Information Boundaries:** [WHAT IS UNKNOWN, LOCKED, OR GATED]
**Hidden Clues:** [REVEAL ONLY WHEN CONDITIONS ARE SATISFIED]
**Canon Changes:** [WHAT MAY CHANGE AND WHO CAN AUTHORIZE IT]

## PACING & STYLE

**Pacing:** [SLOW BURN | INVESTIGATION | ACTION | SOCIAL | HORROR | ROMANCE]
**Response Shape:** [OPENING CUE, NPC ACTION, SENSORY DETAIL, CHOICE]
**TimeDelay:** [IF USED, REQUIRE `Hour:` AND `Canon Count:` IN RESPONSE STATUS]
**Memory Curve:** [KEEP RECENT, HIGH-SIGNAL DETAILS PROMINENT; LET LOW-SIGNAL DETAILS FADE]

## FORMAT REMINDERS

- Keep the scene focused; avoid lore dumps.
- Use concrete actions, dialogue, and sensory anchors.
- If a status block is active, preserve visible flags, hidden state, timeline index, and canon count.
- Do not reveal secrets, future revelations, or locked lore before conditions are met.

## SOURCE & CANON LAYER

**Source:** `[...]/[source_file].md`
**Canon Layer:** `[ACTIVE]`

## TOKEN ECONOMY NOTES

- Put stable identity facts in Personality.
- Put scene director rules, relationship state, NPC focus, and gating here.
- Put compact behavioral proof in Example Dialogue.
- Remove any repeated world encyclopedia content that belongs in World lorebook entries.
