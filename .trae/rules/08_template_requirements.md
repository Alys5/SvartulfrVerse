---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 08. Template Requirements

This module defines requirements for Engine, World, Scenario, Personality, Scenario, Bio, state, spoiler, NPC, and debug behavior.

## Master Template Requirements

### Engine Template

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

### World Template

The World template must:

- implement MacroCosmo lore activation;
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
  - `CAN`
- exclude entries with missing source;
- exclude entries with non-canonical prefixes;
- avoid active NPC direction.

### Scenario Template

The Scenario template must:

- implement MicroCosmo actor activation;
- support NPC databases;
- support relationship databases;
- support anti-omniscience gates;
- support TimeDelay canon;
- support entity databases;
- support conditional events;
- support Trigger Matrix behavior;
- support escalation, de-escalation, and repair;
- support source and Canon Layer metadata;
- support only canonical prefixes:
  - `FAM`
  - `NPC`
  - `SEC`
  - `CAN`
  - `REL`
- exclude entries with missing source;
- exclude entries with non-canonical prefixes.

## Personality Template Requirements

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

## Bio Template Requirements

`Sys_Bio_Template.html` must include:

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

## NPC Requirements

NPC records must:

- include source and Canon Layer;
- avoid redefining family genealogy;
- include active scene presence only when appropriate;
- include relationship hooks;
- include anti-omniscience limits;
- avoid duplicating World lore.

## Debug Requirements

Debug features must:

- be opt-in or explicitly bounded;
- use `console.log()` only for debug;
- not leak debug output into visible chat;
- not expose hidden source paths in bot-facing text;
- not override user-facing output.
