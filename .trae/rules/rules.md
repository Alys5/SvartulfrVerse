# SvartulfrVerse Workspace Rules — Central Index

This file is the central index for the SvartulfrVerse JanitorAI rule contract.

The detailed rules have been split into numbered modules under `.trae/rules/` to avoid a monolithic contract and to make review faster. Keep `rules.md` as the index and update the detailed module files when rules change.

## Mandatory Quick Rules

- Use the MacroCosmo / MicroCosmo activation model for all new SvartulfrVerse JanitorAI systems.
- Use the three canonical master templates in [`../../1_template/`](../../1_template/) as the default runtime architecture.
- [`../../1_template/SvartulfrVerse_Engine_Template.js`](../../1_template/SvartulfrVerse_Engine_Template.js) is 100% lore-agnostic: no world facts, magic, technology, character names, or scenario-specific lore.
- Use ES5-compatible JavaScript and `var`; avoid `let`, `const`, arrow functions, template literals, classes, async/await, and restricted platform APIs.
- Every script must use `context` as the sole JanitorAI interface and must guard `context.character`, `context.character.personality`, and `context.character.scenario`.
- Scripts may only write to `context.character.personality`, `context.character.scenario`, and `context.character.example_dialogs`.
- Personality, scenario, and example dialogs are append-only by default.
- Every lorebook voice must include source attribution from `database/` and a Canon Layer tag: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, or `[CANDIDATE]`.
- Approved image metadata must use [`../../0_assets/ASSET_REGISTRY.json`](../../0_assets/ASSET_REGISTRY.json) as the source for image descriptions, dimensions, and registry keys.
- Genealogy is owned by the Family Authority; NPC and Character records may reference family data but must not redefine it.
- MacroCosmo and MicroCosmo domains are strictly keyword-triggered.
- Only one minimal always-on world atmosphere voice is allowed.
- Do not reference `database_old/` from export scripts; it is a read-only historical archive.

## Rule Modules

| Module | File | Purpose |
|---|---|---|
| 01 | [`01_authority_scope.md`](01_authority_scope.md) | Authority, scope, source precedence, authority separation, repository hygiene baseline |
| 02 | [`02_project_baseline.md`](02_project_baseline.md) | Project baseline, canon layers, MacroCosmo / MicroCosmo domains, governance |
| 03 | [`03_runtime_context_api.md`](03_runtime_context_api.md) | JanitorAI runtime model, persistence mechanics, `context` API, append-only rule |
| 04 | [`04_javascript_naming.md`](04_javascript_naming.md) | ES5 runtime constraint, restricted features, file/function/data naming |
| 05 | [`05_lorebook_entry_design.md`](05_lorebook_entry_design.md) | Standard lore entry schema, priority scale, keyword design |
| 06 | [`06_token_state_character_card.md`](06_token_state_character_card.md) | Token budgeting, visible flags, zero-width state, stat parsing, character-card requirements |
| 07 | [`07_templates_architecture.md`](07_templates_architecture.md) | Canonical master-template stack, final architecture levels, MacroCosmo / MicroCosmo mapping |
| 08 | [`08_template_requirements.md`](08_template_requirements.md) | Requirements for Engine, World, Scenario, state, spoiler, NPC, and debug behavior |
| 09 | [`09_development_workflow_acceptance.md`](09_development_workflow_acceptance.md) | Development workflow, testing matrix, mandatory acceptance criteria |
| 10 | [`10_review_safe_removal_debugging.md`](10_review_safe_removal_debugging.md) | Review procedure, safe removal, debugging standards |
| 11 | [`11_output_voice_token_economy_hygiene.md`](11_output_voice_token_economy_hygiene.md) | Output prefixes, lorebook voice rules, token economy, repository hygiene |
| 12 | [`12_compatibility_matrix.md`](12_compatibility_matrix.md) | Compatibility matrix for canonical templates and retained platform references |

## Canonical Master-Template Stack

Use these three templates as the default architecture for SvartulfrVerse JanitorAI systems unless the user explicitly asks for a narrower or different scope.

| Layer | Master Template | Purpose |
|---|---|---|
| Level 1 + Level 4 | [`../../1_template/SvartulfrVerse_Engine_Template.js`](../../1_template/SvartulfrVerse_Engine_Template.js) | Lore-agnostic runtime engine: visible flags, zero-width state, progressive context, debug, token budget. |
| Level 2 | [`../../1_template/SvartulfrVerse_World_Template.js`](../../1_template/SvartulfrVerse_World_Template.js) | MacroCosmo: world lore, timeline events, stat reactions, cascade activation, adaptive detail. |
| Level 3 | [`../../1_template/SvartulfrVerse_Scenario_Template.js`](../../1_template/SvartulfrVerse_Scenario_Template.js) | MicroCosmo: active NPCs, relationships, anti-omniscience gates, TimeDelay pacing. |

The old modular templates formerly stored in `template/` are superseded by these master templates and must not be reintroduced as the default architecture.

## Editing Contract

When changing rules:

1. Prefer editing the smallest relevant numbered module.
2. Update this index only if the module list, module purpose, or central quick rules change.
3. Keep links relative and valid from the file where they appear:
   - `rules.md` links to sibling modules with `01_authority_scope.md`, `07_templates_architecture.md`, etc.
   - module files link to repository files with `../../README.md`, `../../1_template/...`, and `../../0_assets/`.
4. Do not duplicate the full monolith back into `rules.md`.
5. Re-check `git diff --check` after documentation edits.

## Conflict Resolution

When rules appear to conflict, resolve in this order:

1. Explicit user instruction for the current task.
2. [`../../README.md`](../../README.md).
3. The matching canonical master-template file in `../../1_template/`.
4. The numbered rule modules in `.trae/rules/`.
5. Project memory and prior architectural decisions.
