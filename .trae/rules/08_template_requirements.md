---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, and Level 0 / Level 1 / Level 3 template requirements.'
---
# 08. Template Requirements

This module defines requirements for the Level 0 / Level 1 / Level 3 architecture: Engine, integrated World lorebook, Personality, Scenario, Initial Message, Example Dialogue, Bot Card, state, spoiler, NPC, and debug behavior.

## Master Template Requirements

### Engine Template (`level 0`)

The Engine template must:

- be lore-agnostic;
- use ES6-safe syntax inside the sandbox;
- guard `context.character`, `context.character.personality`, `context.character.scenario`, and `context.character.example_dialogs`;
- write only to `personality`, `scenario`, and `example_dialogs`;
- support append-only state updates;
- support visible flags;
- support zero-width memory;
- support progressive context;
- parse `[CONTEXT BUDGET: ...]`;
- support debug mode without leaking debug output into chat;
- avoid `async/await`, `Promise`, `fetch`, `import`, `require`, `window`, `document`, timers, and global side effects.

### Integrated World Lorebook Template (`level 1`)

The integrated World lorebook template must:

- be the operational World layer for MacroCosmo + MicroCosmo;
- include world facts, timeline events, locations, organizations, bestiary, families, NPCs, secrets, canon unlocks, and relationships;
- support lore entries, timeline events, and stat reactions;
- support cascade activation;
- support ANY/ALL filters;
- support full/summary/bullet degradation;
- support source and Canon Layer metadata;
- support only canonical prefixes:
  - `WRD`
  - `LOR`
  - `LOC`
  - `ORG`
  - `BST`
  - `FAM`
  - `NPC`
  - `SEC`
  - `CAN`
  - `REL`
- exclude entries with missing source;
- exclude entries with non-canonical prefixes;
- keep runtime state mechanics in `level 0`;
- keep opening-message logic in the `level 3` card.

## Level 3 Bot Card Template Requirements

`Personality_Template.md` must include:

- `CHARACTER`;
- `APPEARANCE`;
- `PSYCHOLOGICAL_PROFILE`;
- `SOCIAL_BEHAVIOR`;
- `SENSORY`;
- `FORMAT`;
- `SOURCE & CANON LAYER`;
- `TOKEN ECONOMY NOTES`.

It must teach behavior, not biography. It must avoid lore dumps and local path leakage.

For multi-character bots, `Multi_Character_Personality_Template.md` must provide separate identity anchors, voice separation rules, relationship hooks, and a Trigger Matrix. For scenario bots, `Scenario_Bot_Personality_Template.md` must define controller voice, referee principles, output style, and minimal character voice slots.

## Scenario Template Requirements

`Scenario_Template.md` must include:

- `SETTING`;
- `RELATIONSHIP_STATE`;
- `INTERACTION_CATEGORIES`;
- `DYNAMIC_BEHAVIORS`;
- `PACING & STYLE`;
- `FORMAT REMINDERS`;
- `SOURCE & CANON LAYER`;
- `TOKEN ECONOMY NOTES`.

It must not contain opening-message logic or first-message scripting.

For multi-character bots, `Multi_Character_Scenario_Template.md` must provide shared setting, relationship state, active cast direction, Trigger Matrix, turn-taking, escalation/de-escalation, and anti-omniscience rules. For scenario bots, `Scenario_Bot_Scenario_Template.md` must provide Controller Block, Scenario Block, cycle, choice engine, consequence engine, Trigger Matrix, tone guide, and drift recovery.

## Initial Message Template Requirements

`Initial_Message_Template.md` must include:

- voice;
- scene anchor;
- relationship cue;
- invitation;
- optional status cue only when the bot uses visible status, flags, or scenario cycle.

It must not contain:

- long backstory;
- full lore exposition;
- hidden state or runtime implementation details;
- user actions, dialogue, or decisions.

## Example Dialogue Template Requirements

`Example_Dialogue_Template.md` must include:

- `{{char}}:` and `{{user}}:` labels as expected by the platform;
- calm or normal exchange;
- tension or conflict exchange;
- de-escalation or repair exchange;
- compact behavioral proof, not lore storage.

It must not make the user act, decide, or reveal private information in examples.

## Bot Card Template Requirements

`05_bot_card.html` must include:

- card title;
- subtitle;
- approved image metadata source;
- structured blurb;
- impact line;
- closing invitation or threat;
- optional one-rule LLM advice;
- clear distinction between public bio, Personality runtime, and Scenario runtime.

## State and Spoiler Requirements

State and spoiler systems must:

- be compact;
- be parseable by the LLM;
- be append-only by default;
- use visible flags or zero-width state only when reproducible;
- avoid leaking hidden information;
- avoid omniscient narration;
- use gates based on time, message count, canon count, or explicit state.

## NPC Requirements (5-Part Character Schema)

When processing Characters or NPCs, **DO NOT** dump all their information into a single massive JSON entry. You MUST split each NPC into exactly 5 separate, targeted JSON entries. Each entry will cover one specific aspect of the character according to the schema below. 

Format the `content` field of each entry cleanly, starting with an identifier like `[NPC: Name - Block Name]`, followed by the bolded keys and their data. 

**Entry 1: CHARACTER (Core Identity)**
- **Content Schema:**
  **Name:** [FULL NAME]
  **Aliases / Role:** [TITLES, NICKNAMES, OR FUNCTION]
  **Age / Apparent Age:** [AGE AND LIFE STAGE]
  **Pronouns:** [PRONOUNS]
  **Canon Layer:** `[ACTIVE]` | `[HISTORICAL]` | `[CULTURAL]` | `[DEFERRED]` | `[CANDIDATE]`
  **Source:** `[...]/[source_file].md`
- **Trigger Strategy:** Base triggers (Name, Aliases). Use `selectiveLogic: 0` (AND ANY) if needed.

**Entry 2: APPEARANCE (Visuals)**
- **Content Schema:**
  **Immediate Impression:** [ONE OR TWO SENTENCES]
  **Body / Face / Style:** [ONLY DETAILS THAT CHANGE INTERACTION]
  **Nonhuman / Tech Details:** [OMIT IF NOT APPLICABLE]
- **Trigger Strategy:** Base Name triggers + `keysecondary` containing visual words (e.g., look, eyes, wear, clothes, tall, face). Set `selectiveLogic: 1` (AND ALL) or `0` (AND ANY) to ensure it only triggers when their appearance is relevant.

**Entry 3: PSYCHOLOGICAL_PROFILE (Mindset & Reactions)**
- **Content Schema:**
  **Core Traits:** [3-6 TRAITS]
  **Desire:** [WHAT THEY WANT NOW]
  **Fear / Blind Spot:** [WHAT DISTORTS JUDGMENT]
  **Strengths:** [USEFUL CAPABILITIES]
  **Flaws:** [BEHAVIORAL LIMITS]
  **Stress Response:** [TRIGGER -> EMOTION -> ACTION -> AFTERMATH]
  **Repair Pattern:** [HOW THEY DE-ESCALATE OR MAKE AMENDS]
- **Trigger Strategy:** Base Name triggers + `keysecondary` containing psychological or conflict words (e.g., feel, think, want, fear, anger, fight, sorry).

**Entry 4: SOCIAL_BEHAVIOR (Dynamics)**
- **Content Schema:**
  **Default Manner:** [HOW THEY ENTER A SCENE]
  **With {{user}}:** [CURRENT DYNAMIC ONLY]
  **Boundaries:** [WHAT THEY REFUSE OR RESIST]
  **Relationship State:** [CURRENT RELATIONSHIP STATUS]
  **Family References:** [REFER TO Family Authority records only]
- **Trigger Strategy:** Base Name triggers + `keysecondary` containing interaction words (e.g., approach, talk, ask, relationship, boundary, family names).

**Entry 5: SENSORY (Atmosphere & Tics)**
- **Content Schema:**
  **Voice:** [PITCH, CADENCE, WORD CHOICE]
  **Mannerisms:** [GESTURES, HABITS, MICRO-ACTIONS]
  **Sensory Anchors:** [SMELL, SOUND, TEXTURE, LIGHT, OR ATMOSPHERE]
- **Trigger Strategy:** Base Name triggers + `keysecondary` containing sensory words (e.g., voice, sound, smell, scent, touch, habit).

## Debug Requirements

Debug features must:

- be opt-in or explicitly bounded;
- use `console.log()` only for debug;
- not leak debug output into visible chat;
- not expose hidden source paths in bot-facing text;
- not override user-facing output.
