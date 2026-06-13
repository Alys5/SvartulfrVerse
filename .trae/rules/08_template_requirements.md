# 08. Template-Specific Requirements

This module defines mandatory requirements for each template family.

## Adaptive Lorebook

Must include:

- full, summary, and bullet versions for each entry;
- importance values for priority tiebreaking;
- mention counting for relevance;
- token budget reduction from full to summary to bullet;
- priority preservation for the most important entries.

## Progressive Sentence Lorebook

Must include:

- ordered sentence arrays;
- priority tiers: `HIGH`, `MEDIUM`, `LOW`;
- history scope: `CURRENT_USER_ONLY`, `CURRENT_EXCHANGE`, `HISTORICAL`;
- tier budgets and optional dynamic redistribution;
- round-robin sentence allocation within tiers;
- sentences ordered from core identity to optional nuance.

## Complex Lorebook

Must support when applicable:

- cascading activation;
- timeline events;
- stat-based reactions;
- priority ordering;
- conditional filtering, including `requiresAny` and `requiresAll`;
- `minMessages` and `maxMessages` activation windows;
- debug mode.

## TimeDelay Script

Must include when used:

- message count thresholds;
- hour-based timeline progression;
- canon count tracking;
- `[CANON]:` formatting for canonical information;
- drop-in/drop-out witnesses and locations when applicable;
- hidden clue conditions;
- conditional events;
- character-card requirements for `**Canon Count:**` and `**Hour:**`.

## Persistent Flags

Must include:

- hex flag string format;
- position preservation;
- flag definitions with `hexValue`, `id`, `description`, `personality`, `scenario`, `keywords`, and `flagChangeInstruction`;
- anti-cheat mode: `OOC_WARNING`, `COMICAL`, or `SEVERE`;
- save system support when continuity is required;
- debug mode for current state, expected count, and valid values.

## Hidden Persistent Memory

Must include:

- zero-width encoding;
- modular components;
- unique header/footer markers;
- default state per component;
- feature toggles for each component;
- token management;
- debug mode;
- clear character-card reproduction instructions.

Supported components:

- weather;
- location with scene shift detection;
- emotion bitmask;
- inventory bitfield;
- schedule/day counter;
- character presence.

## Anti-Omniscience Investigation

Must include:

- flag-gated content;
- anti-omniscience behavioral instructions;
- no meta-labels or foreshadowing for locked information;
- locked clues that cannot be revealed before the required state;
- clear flag update instructions for the LLM.

## Multiple Character

Must include:

- character mention detection;
- drop-in/drop-out context;
- character-specific personality and scenario text;
- character names in injected personality statements;
- optional arrival/departure or scene presence logic.

## Context Aware Multiple Character

Must include:

- multi-character mention detection;
- adaptive detail levels;
- category-aware token budgets;
- progressive sentence categories when applicable;
- balanced coverage for multiple active characters;
- category configuration for `personality`, `appearance`, `relationships`, `combat`, `psyche`, and `sampleDialog`;
- NPC records with `id`, `displayName`, `names`, `importance`, and per-category `full`, `limited`, and `summary` payloads.

## Advanced Faction Management

Must include:

- zero-width state persistence;
- normal roleplay mode;
- `/faction` management mode;
- project system;
- diplomacy system;
- resource system;
- population tracking;
- stat keyword detection;
- day-based timeline events;
- lore activation engine;
- `/showstats` and `/hidestats`;
- safe component removal notes;
- critical sections that must never be deleted.

## Context Control

Must include:

- `/maxtokens` command;
- `/budget` command;
- five context tiers;
- `[Lorebook Count: N]` handling;
- per-script budget calculation;
- `[CONTEXT BUDGET: tier=... context=... total=... scripts=... per_script=...]` injection;
- zero-width state persistence with unique header/footer markers.

## Context Control Awareness

Must include:

- budget block parsing;
- zero-width fallback when available;
- conservative default budget fallback;
- detail level selection: full, summary, bullet;
- priority-based degradation;
- clear integration instructions for other scripts.

## PropertyExploration

Every debug utility must:

- log available `context` properties and types;
- document which properties are visible via stringify;
- document which properties are undefined;
- remember that only `example_dialogs`, `personality`, and `scenario` are sent back to the model.
