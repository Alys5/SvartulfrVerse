---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 01. Authority and Scope

This module defines the authority model for SvartulfrVerse JanitorAI rules.

## Applies To

Use these rules for:

- canonical JanitorAI master templates in [`../../bot_template/`](../../bot_template/);
- Lorebook_MacroCosmo and Lorebook_MicroCosmo systems;
- runtime utilities and debug helpers;
- generated scenario-specific scripts;
- supporting documentation and review workflows.

## Authoritative Sources

Every JanitorAI component must be designed and reviewed against the applicable source documentation:

- [`../../assets/ASSET_REGISTRY.json`](../../assets/ASSET_REGISTRY.json) for approved image metadata, descriptions, dimensions, and registry keys.
- [`../../README.md`](../../README.md).
- [`../../template/janitorai_scripts.md`](../../template/janitorai_scripts.md) as the retained platform reference.
- [`../../bot_template/SvartulfrVerse_Engine_Template.js`](../../bot_template/SvartulfrVerse_Engine_Template.js).
- [`../../bot_template/SvartulfrVerse_World_Template.js`](../../bot_template/SvartulfrVerse_World_Template.js).
- [`../../bot_template/SvartulfrVerse_Scenario_Template.js`](../../bot_template/SvartulfrVerse_Scenario_Template.js).
- The numbered rule modules in [`.trae/rules/`](./rules.md).

The old modular template README files in `template/` are no longer authoritative after their migration into the three canonical master templates.

## Rule Precedence

When rules appear to conflict, resolve in this order:

1. Explicit user instruction for the current task.
2. [`../../README.md`](../../README.md).
3. [`../../template/janitorai_scripts.md`](../../template/janitorai_scripts.md).
4. The matching canonical master-template file in `../../bot_template/`.
5. The numbered rule modules in `.trae/rules/`.
6. Project memory and prior architectural decisions.

No external shortcut, personal convention, undocumented pattern, or convenience abstraction may override these rules unless explicitly approved.

## Authority Separation

- World facts are owned by the World / MacroCosmo domain and must be implemented in the World master template or generated World data.
- Genealogy is owned by the Family Authority.
- NPC and Character records may reference family data but must not redefine it.
- Runtime integration scripts may coordinate context injection but must not redefine world facts, family genealogy, or character identity by themselves.
- The Engine master template may persist and gate state, but it must not invent canon or scenario meaning.
- Spoiler and state modules may gate or persist information but must not invent canon.

## Repository Hygiene Baseline

- Do not create files unless they are necessary for the requested goal.
- Prefer editing existing files over creating new files.
- Never create documentation files unless explicitly requested.
- Never commit changes unless explicitly asked.
- Never run destructive git commands unless explicitly asked.
- `database_old/` is a read-only historical archive, isolated via `.gitignore`, and must never be referenced by export scripts.
