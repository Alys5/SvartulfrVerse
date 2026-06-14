---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 07. Template Architecture

This module defines the canonical master-template stack and final architecture levels for SvartulfrVerse JanitorAI systems.

## Canonical Stack

| Level | Domain | Master Template | Purpose |
|---|---|---|---|
| 1 + 4 | Engine | [`../../1_template/SvartulfrVerse_Engine_Template.js`](../../1_template/SvartulfrVerse_Engine_Template.js) | Lore-agnostic runtime state, flags, zero-width memory, progressive context, debug, token budget, ES6-safe sandbox execution |
| 2 | World / MacroCosmo | [`../../1_template/SvartulfrVerse_World_Template.js`](../../1_template/SvartulfrVerse_World_Template.js) | World lore, timeline events, stat reactions, cascade activation, adaptive detail |
| 3 | Scenario / MicroCosmo | [`../../1_template/SvartulfrVerse_Scenario_Template.js`](../../1_template/SvartulfrVerse_Scenario_Template.js) | Active NPCs, relationships, anti-omniscience gates, TimeDelay pacing |

## Final Architecture Levels

### Level 1: Engine

The Engine is the persistent runtime layer.

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

### Level 2: World / MacroCosmo

World is responsible for large-scale lore and canonical meaning.

It may handle:

- world core facts;
- timeline events;
- locations;
- organizations;
- bestiary entries;
- cascade activation;
- adaptive full/summary/bullet degradation;
- stat reactions;
- keyword-triggered MacroCosmo activation.

It must not handle:

- active NPC scene direction;
- relationship state that belongs to the current scenario;
- genealogy ownership;
- opening-message logic.

### Level 3: Scenario / MicroCosmo

Scenario is responsible for the current scene, pacing, actors, relationships, and information gates.

It may handle:

- active NPC databases;
- relationship databases;
- anti-omniscience investigation gates;
- TimeDelay canon;
- drop-in/drop-out NPC logic;
- hidden clue gates;
- conditional events;
- Trigger Matrix behavior;
- escalation, de-escalation, and repair.

It must not handle:

- world canon definition;
- family genealogy redefinition;
- lore that belongs in World;
- opening-message logic in the Scenario file.

### Level 4: Persistent State

Persistent state belongs to the Engine layer.

Allowed state mechanisms:

- visible flags;
- zero-width state;
- stat parsing;
- message count;
- time-of-day;
- compact scenario notes;
- locked/unlocked canon markers.

State must be compact, parseable, and reproducible by the LLM.

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

### Scenario

Scenario is the scene director.

Required structure:

- `SETTING`;
- `RELATIONSHIP_STATE`;
- `INTERACTION_CATEGORIES`;
- `DYNAMIC_BEHAVIORS`;
- `PACING & STYLE`;
- `FORMAT REMINDERS`.

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

The old modular templates formerly stored in `template/` are superseded by these master templates and must not be reintroduced as the default architecture.
