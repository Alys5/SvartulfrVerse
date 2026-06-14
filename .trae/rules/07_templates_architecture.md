---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, and Level 0 / Level 1 / Level 3 architecture.'
---
# 07. Template Architecture

This module defines the Level 0 / Level 1 / Level 3 architecture and final template stack for SvartulfrVerse JanitorAI systems.

## Canonical Stack

| Level | Domain | Master Template | Purpose |
|---|---|---|---|
| `level 0` | Engine runtime comune | [`../../1_template/00_engine/SvartulfrVerse_Engine_Template.js`](../../1_template/00_engine/SvartulfrVerse_Engine_Template.js) | Lore-agnostic runtime state, flags, zero-width memory, progressive context, debug, token budget, ES6-safe sandbox execution. Common to all bots. |
| `level 1` | World integrato MacroCosmo + MicroCosmo | [`../../1_template/01_world_lorebook/SvartulfrVerse_World_Template.lorebook.json`](../../1_template/01_world_lorebook/SvartulfrVerse_World_Template.lorebook.json) | Integrated World lorebook by genre/world: world facts, timeline, locations, organizations, bestiary, families, NPCs, secrets, canon unlocks, relationships, cascade activation, and adaptive detail. |
| `level 3` | Card unica del bot | Personality + Scenario + Initial Message + Example Dialogue + Bot Card | Unique bot card: identity anchor, scene/controller direction, first beat, behavioral proof, and storefront. |

## Final Architecture Levels

### level 0: Engine

The Engine is the persistent runtime layer common to all bots.

It may handle:

- visible flags;
- zero-width memory;
- progressive context;
- debug utilities;
- token budget parsing;
- state persistence;
- sandbox-safe triggers.

It must not handle:

- lore meaning;
- world facts;
- character identity;
- family genealogy;
- scenario-specific canon;
- magic, technology, or faction rules.

### level 1: Integrated World Lorebook

World is the integrated MacroCosmo + MicroCosmo data layer.

It may handle:

- world core facts;
- timeline events;
- locations;
- organizations;
- bestiary entries;
- families and genealogy hooks;
- NPCs;
- relationships;
- secrets and investigation gates;
- canon unlocks;
- cascade activation;
- adaptive full/summary/bullet degradation;
- stat reactions;
- keyword-triggered World activation.

It must not handle:

- runtime state mechanics;
- opening-message logic;
- bot-facing card prose unless explicitly exported as lorebook voice content.

The integrated World domains are:

| Domain | Prefix | Scope |
|---|---|---|
| World | `WRD:` | Core physical, cosmological, and rule-system facts |
| Lore | `LOR:` | Events, artifacts, ancient history, and present-day consequences |
| Locations | `LOC:` | Regions, cities, interiors, and points of interest |
| Organizations | `ORG:` | Factions, guilds, institutions, and hierarchy |
| Bestiary | `BST:` | Creatures, monsters, threats, habitats, and weaknesses |
| Families | `FAM:` | Dynasties, bloodlines, genealogy hooks, politics, reputation, and house secrets |
| NPCs | `NPC:` | Individual identity, visual presentation, relationships, combat, psyche, and active scene presence |
| Secrets | `SEC:` | Locked investigation content, hidden clues, and spoiler gates |
| Canon Unlocks | `CAN:` | Investigation canon unlocked by state, time, or message thresholds |
| Relationships | `REL:` | Active relationship dynamics, emotional states, and interaction contracts |

### level 3: Unique Bot Card

The bot card is the active runtime authoring layer.

It may handle:

- Personality;
- Scenario;
- Initial Message;
- Example Dialogue;
- Bot Card;
- multi-character voice separation;
- scenario bot controller logic;
- visible tone, pacing, and agency rules.

It must not handle:

- generic runtime state mechanics;
- lore that belongs in World;
- local filesystem paths in bot-facing text;
- duplicate encyclopedia content that should be represented as World lorebook voices.

## Bot Authoring Contracts

### Personality

Personality is the actor's identity anchor.

Required structure:

- `CHARACTER`;
- `APPEARANCE`;
- `PSYCHOLOGICAL_PROFILE`;
- `SOCIAL_BEHAVIOR`;
- `SENSORY`;
- `FORMAT`.

Use `Multi_Character_Personality_Template.md` for multi-character bots and `Scenario_Bot_Personality_Template.md` for scenario bots.

### Scenario

Scenario is the scene director.

Required structure:

- `SETTING`;
- `RELATIONSHIP_STATE`;
- `INTERACTION_CATEGORIES`;
- `DYNAMIC_BEHAVIORS`;
- `PACING & STYLE`;
- `FORMAT REMINDERS`.

Use `Multi_Character_Scenario_Template.md` for multi-character bots and `Scenario_Bot_Scenario_Template.md` for scenario bots.

### Example Dialogue

Example Dialogue must demonstrate behavior, not summarize it.

Required qualities:

- 3–6 compact exchanges;
- tone proof;
- pacing proof;
- turn-taking proof;
- trigger reaction proof;
- formatting proof.

### Initial Message

Initial Message must provide:

- voice;
- scene anchor;
- invitation.

It must not contain:

- biography;
- lore dump;
- opening-scene options;
- first-message logic in Scenario.

### Bot Card

Bot Card must provide:

- impact title;
- subtitle;
- main portrait;
- supporting images;
- structured blurb;
- impact line;
- closing invitation or threat;
- optional one-rule LLM advice.

### Multi-Character

Multi-character bots require:

- separate personality sections;
- clear contrast between characters;
- shared scenario as director;
- Trigger Matrix;
- turn-taking rules;
- Two-Voice or Trio-Voice testing.

### Scenario Bot

Scenario bots require:

- Controller Block;
- Scenario Block;
- choice engine;
- consequence engine;
- tone guide;
- cycle;
- recovery/de-escalation;
- testing over 20+ turns.

## Legacy Modular Templates

The old modular templates formerly stored in `1_template/` are superseded by the Level 0 / Level 1 / Level 3 architecture and must not be reintroduced as the default architecture.
