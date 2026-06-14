---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 02. Project Baseline and Domain Governance

This module defines the SvartulfrVerse baseline, bot design contract, canon layers, and MacroCosmo / MicroCosmo domain governance.

## Project Baseline

- Setting: contemporary 2024 baseline.
- Default ontology: human-only baseline.
- Supernatural elements are treated as `Cultural Canon` unless explicitly promoted by canon governance.
- Canon layers are governed by ADR-006:
  - `Active`
  - `Historical`
  - `Cultural`
  - `Deferred`
  - `Candidate`

## Bot Design Contract

SvartulfrVerse treats a bot as a coordinated runtime system, not as a static lore dump.

| Layer | Purpose | Design Rule |
|---|---|---|
| Personality | Identity anchor | Stable voice, traits, social behavior, sensory cues, and output format. Avoid trivia that does not change behavior. |
| Scenario | Scene director | Current setting, relationship baseline, interaction categories, triggers, escalation, de-escalation, repair, pacing, and format reminders. |
| Example Dialogue | Behavioral proof | 3–6 compact exchanges that demonstrate tone, formatting, turn-taking, and trigger reactions. |
| Initial Message | First beat | Voice + scene anchor + invitation. It must not be a biography or lore dump. |
| Bot Card | Storefront | Impact title, subtitle, main image, supporting images, structured blurb, impact line, and optional one-rule LLM advice. |
| Runtime Script | Dynamic layer | ES6-safe sandbox code using `context`, append-only writes, guarded state, keyword triggers, and no hard-blocked APIs. |

### Token Placement

The JanitorAI send order and U-shaped memory curve determine placement:

1. Personality belongs at the beginning to anchor identity.
2. Chat Memory and persistent state follow if present.
3. Scenario belongs near the end to control the immediate scene.
4. Advanced Prompt or short runtime overlays belong near the end.
5. Recent messages remain the freshest live context.

Avoid burying critical behavioral rules in the middle of a long prompt.

### Signal vs Noise

A token is useful when it changes behavior, clarifies voice, controls pacing, gates information, or prevents a known failure mode. Avoid tokens that only add trivia, biography, or decorative prose without runtime effect.

Good signal:

```text
If praised, deflects with dry humor before softening.
```

Weak noise:

```text
She is kind of shy and sometimes blushes.
```

## MacroCosmo / MicroCosmo Model

All new SvartulfrVerse JanitorAI systems must be organized by the MacroCosmo / MicroCosmo activation model, not by older layer labels.

### MacroCosmo: World-Facing Lore Domains

MacroCosmo covers world-facing lore and scenario activation.

| Domain | Prefix | Scope |
|---|---|---|
| World | `WRD:` | Core physical, cosmological, and rule-system facts |
| Lore | `LOR:` | Events, artifacts, ancient history, and present-day consequences |
| Locations | `LOC:` | Regions, cities, interiors, and points of interest |
| Organizations | `ORG:` | Factions, guilds, institutions, and hierarchy |
| Bestiary | `BST:` | Creatures, monsters, threats, habitats, and weaknesses |

### MicroCosmo: Actor-Facing Lore Domains

MicroCosmo covers actors, relationships, and living state.

| Domain | Prefix | Scope |
|---|---|---|
| Families | `FAM:` | Dynasties, bloodlines, genealogy hooks, politics, reputation, and house secrets |
| NPCs | `NPC:` | Individual identity, visual presentation, relationships, combat, psyche, and active scene presence |
| Secrets | `SEC:` | Locked investigation content, hidden clues, and spoiler gates |
| Canon Unlocks | `CAN:` | Investigation canon unlocked by state, time, or message thresholds |
| Relationships | `REL:` | Active relationship dynamics, emotional states, and interaction contracts |

## Governance Rules

- Genealogy is owned by the Family Authority.
- NPC and Character records may reference family data but must not redefine it.
- MacroCosmo and MicroCosmo domains are strictly keyword-triggered.
- Only one minimal always-on world atmosphere voice is allowed.
- Every lorebook voice must include source and a Canon Layer tag.
- Use [`../../1_template/SvartulfrVerse_World_Template.js`](../../1_template/SvartulfrVerse_World_Template.js) for MacroCosmo.
- Use [`../../1_template/SvartulfrVerse_Scenario_Template.js`](../../1_template/SvartulfrVerse_Scenario_Template.js) for MicroCosmo actors, relationships, spoilers, and pacing.
- Use [`../../1_template/SvartulfrVerse_Engine_Template.js`](../../1_template/SvartulfrVerse_Engine_Template.js) for state persistence, not for lore meaning.
- Do not use `TODO-CANON/` from export scripts; it is a read-only historical archive.
- Do not write local filesystem paths into bot-facing Personality or Scenario text unless the runtime template explicitly requires source.

## Runtime Integration Layer

The runtime integration layer coordinates active lore domains. It must not redefine world facts, family genealogy, or character identity by itself.

Default integration stack:

1. [`../../1_template/SvartulfrVerse_Engine_Template.js`](../../1_template/SvartulfrVerse_Engine_Template.js) for runtime state and budget-aware context mechanics.
2. [`../../1_template/SvartulfrVerse_World_Template.js`](../../1_template/SvartulfrVerse_World_Template.js) for MacroCosmo lore, timeline events, cascade activation, and adaptive detail.
3. [`../../1_template/SvartulfrVerse_Scenario_Template.js`](../../1_template/SvartulfrVerse_Scenario_Template.js) for MicroCosmo NPC activation, relationships, anti-omniscience gates, and TimeDelay pacing.
