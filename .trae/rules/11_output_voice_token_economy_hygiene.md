---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 11. Output Formatting, Lorebook Voice, Token Economy, and Hygiene

This module defines output formatting, voice requirements, token economy, and repository hygiene.

## Output Formatting

Injected content must be short, atomic, and consistent.

Use bracketed prefixes for scenario context:

- `[World Event]`
- `[World Reaction]`
- `[Critical Alert]`
- `[CANON]`
- `[Faction Event]`
- `[Location Core]`
- `[Location Interior]`
- `[Organization Core]`
- `[Organization Hierarchy]`
- `[Family Core]`
- `[Family Dynamics]`
- `[NPC Core]`

Use imperative language for AI instructions.

Avoid:

- redundant additions across executions;
- duplicate injections when state does not change;
- spoilers before gate conditions are met;
- large unbounded scenario additions.

## Lorebook Voice Rules

Every lorebook voice must include:

- source attribution from `database/`;
- Canon Layer tag, e.g. `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`;
- stable title prefix:
  - `WRD:` for world core
  - `LOR:` for lore/events/artifacts
  - `LOC:` for locations
  - `ORG:` for organizations
  - `BST:` for bestiary
  - `FAM:` for families/dynasties
  - `NPC:` for NPCs

## Token Economy Rules

- MacroCosmo and MicroCosmo domains are strictly keyword-triggered.
- Only one minimal always-on world atmosphere voice is allowed.
- Core world rules must be high-signal and low-word-count.
- NPC and faction data must degrade by relevance, not remain fully active.
- Prefer multiple targeted entries over one large omnibus entry.

## Repository Hygiene

- Do not create files unless they are necessary for the requested goal.
- Prefer editing existing files over creating new files.
- Never create documentation files unless explicitly requested.
- Never commit changes unless explicitly asked.
- Never run destructive git commands unless explicitly asked.
- `database_old/` is a read-only historical archive, isolated via `.gitignore`, and must never be referenced by export scripts.
