---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 08. Master-Template Requirements

This module defines mandatory requirements for the canonical SvartulfrVerse master templates.

## Engine Master Template

[`../../bot_template/SvartulfrVerse_Engine_Template.js`](../../bot_template/SvartulfrVerse_Engine_Template.js) must include:

- ES5-compatible JavaScript using `var` only;
- `context` as the sole JanitorAI interface;
- guards for `context.character`, `context.character.personality`, `context.character.scenario`, and `context.character.example_dialogs`;
- writes only to `personality`, `scenario`, and `example_dialogs`;
- visible hex flag persistence with position preservation, validation, anti-cheat behavior, and generic instructions;
- zero-width hidden state with unique markers, decimal encoding, default state, component toggles, debug mode, and reproduction instructions;
- progressive sentence context with ordered sentence arrays, mention counting, tier budgets, and round-robin allocation;
- token budget parsing from `[CONTEXT BUDGET: ...]`;
- debug support for context inspection and state visibility.

The Engine must remain 100% lore-agnostic. It must not contain world facts, magic, technology, character names, named locations, or scenario-specific canon. It activates state mathematically; World and Scenario define meaning.

## World Master Template

[`../../bot_template/SvartulfrVerse_World_Template.js`](../../bot_template/SvartulfrVerse_World_Template.js) must include:

- MacroCosmo lore activation by keywords;
- priority/importance ordering;
- `minMessages` and `maxMessages` activation windows;
- ANY/ALL conditional filters;
- cascade activation;
- timeline events;
- stat-based reactions;
- adaptive detail levels: `full`, `summary`, and `bullet`;
- token budget degradation;
- source attribution from `database/`;
- Canon Layer tag: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, or `[CANDIDATE]`;
- debug mode.

Every active World voice must include both source attribution and Canon Layer. The World template may define meaning, consequences, timeline, and lore structure, but it must not manage generic persistence mechanics owned by the Engine.

## Scenario Master Template

[`../../bot_template/SvartulfrVerse_Scenario_Template.js`](../../bot_template/SvartulfrVerse_Scenario_Template.js) must include:

- Context Aware Multiple Character behavior:
  - multi-character mention detection;
  - drop-in/drop-out scene control;
  - adaptive detail levels;
  - category-aware token budgets;
  - balanced coverage for multiple active characters;
  - categories: `identity`, `appearance`, `relationships`, `personality`, `psyche`, `advancedPsychology`, `backstory`, `dialogue`, `combat`, `capabilities`, `sampleDialog`, `residence`, `intimacy`, and `notes`;
  - NPC records with `id`, `displayName`, `names`, `importance`, `source`, `canonLayer`, and per-category `full`, `limited`, and `summary` payloads;
- simple Multiple Character fallback for compact drop-in/drop-out records;
- relationship database with source and Canon Layer;
- Anti-Omniscience Investigation:
  - flag-gated content;
  - anti-omniscience behavioral instructions;
  - no meta-labels or foreshadowing for locked information;
  - locked clues that cannot be revealed before required state;
  - clear flag update instructions when no Engine flag manager is present;
- TimeDelay investigation pacing:
  - message count thresholds;
  - hour-based timeline progression;
  - Canon count tracking;
  - `[CANON]` formatting for unlocked canon information;
  - drop-in/drop-out witnesses and locations when applicable;
  - hidden clue conditions;
  - conditional events;
  - character-card requirements for `**Canon Count:**` and `**Hour:**`;
- debug mode.

Scenario owns the "here and now": active actors, relationships, disclosure gates, and pacing. It must not redefine generic state mechanics owned by the Engine or world canon owned by World.

## Legacy Module Requirements

The old modular templates are superseded. Their requirements are inherited as follows:

- Persistent Flags → Engine visible hex flags.
- Hidden Persistent Memory → Engine zero-width state.
- Progressive Sentence → Engine progressive context.
- PropertyExploration → Engine debug utilities.
- Complex Lorebook → World cascade, filters, timeline, stats.
- Adaptive Lorebook → World adaptive detail.
- Context Aware Multiple Character → Scenario NPC core.
- Multiple Character → Scenario simple NPC fallback.
- Anti-Omniscience Investigation → Scenario spoiler gates.
- TimeDelay Script → Scenario TimeDelay pacing.
