---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 11. Output Formatting, Lorebook Voice, Token Economy, and Hygiene

This module defines output formatting, voice requirements, token economy, and repository hygiene for the canonical master-template architecture.

## Output Formatting

Injected content must be short, atomic, and consistent.

Use bracketed prefixes for scenario context:

- `[ENGINE STATE]`
- `[ABSTRACT FLAG MANAGEMENT]`
- `[ABSTRACT PERSISTENT MEMORY]`
- `[WORLD]`
- `[WORLD EVENT]`
- `[WORLD REACTION]`
- `[SCENARIO]`
- `[SCENARIO NPC CORE]`
- `[NPC Core]`
- `[CANON]`
- `[HIDDEN CLUE]`
- `[TIME DELAY]`

Use imperative language for AI instructions.

Avoid:

- redundant additions across executions;
- duplicate injections when state does not change;
- spoilers before gate conditions are met;
- large unbounded scenario additions;
- Engine-specific text that contains world lore or named canon.

## Lorebook Voice Rules

Every lorebook voice must include:

- source attribution from `database/`;
- Canon Layer tag, e.g. `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`;
- stable title prefix:
  - `WRD:` for world core;
  - `LOR:` for lore/events/artifacts;
  - `LOC:` for locations;
  - `ORG:` for organizations;
  - `BST:` for bestiary;
  - `FAM:` for families/dynasties;
  - `NPC:` for NPCs;
  - `SEC:` for secrets and investigation content;
  - `CAN:` for unlocked investigation canon.

The Engine must not emit lorebook voices with world-specific meaning. It may emit abstract state instructions only.

## Token Economy Rules

- MacroCosmo and MicroCosmo domains are strictly keyword-triggered.
- Only one minimal always-on world atmosphere voice is allowed.
- Engine overhead must remain low and generic.
- World lore must degrade by relevance, mentions, priority, and budget.
- NPC and relationship data must degrade by relevance, not remain fully active.
- Prefer multiple targeted entries over one large omnibus entry.
- Scenario must activate only NPCs and investigation content relevant to the current scene.
- TimeDelay content must respect hour, message count, and canon thresholds.

## Repository Hygiene

- Do not create files unless they are necessary for the requested goal.
- Prefer editing existing files over creating new files.
- Never create documentation files unless explicitly requested.
- Never commit changes unless explicitly asked.
- Never run destructive git commands unless explicitly asked.
- `database_old/` is a read-only historical archive, isolated via `.gitignore`, and must never be referenced by export scripts.
- Removed modular templates must not be restored as default architecture.
