# SvartulfrVerse Workspace Rules — Central Index

This file is the central index for the SvartulfrVerse JanitorAI rule contract.

The detailed rules have been split into numbered modules under `.trae/rules/` to avoid a monolithic contract and to make review faster. Keep `rules.md` as the index and update the detailed module files when rules change.

## Mandatory Quick Rules

- Treat the current user instruction, the JanitorAI Scripts Guide, and the Chatbot Creation Guide as source-of-truth guidance for JanitorAI runtime and bot design decisions.
- Use the integrated World Lorebook JSON for all new SvartulfrVerse JanitorAI systems: it contains both MacroCosmo and MicroCosmo.
- Use the Level 0 / Level 1 / Level 3 architecture in `../../1_template/` as the default runtime architecture.
- `../../2_Export/SvartulfrVerse_Engine.js` is `level 0` and is 100% lore-agnostic: no world facts, magic, technology, character names, or scenario-specific lore.
- `../../1_template/SvartulfrVerse_World_Template.json` is `level 1`: integrated World lorebook for MacroCosmo + MicroCosmo.
- Runtime scripts must be ES6-safe inside the JanitorAI sandbox scope: `const`, `let`, arrow functions, template literals, lightweight array/object helpers, and modern syntax are allowed when they improve clarity and stay sandbox-safe.
- Runtime scripts must never use hard-blocked APIs: `async/await`, `Promise`, `fetch`, `import`, `require`, `window`, `document`, `setTimeout`, `setInterval`, or global side effects.
- Every script must use `context` as the sole JanitorAI interface and must guard `context.character`, `context.character.personality`, `context.character.scenario`, and `context.character.example_dialogs`.
- Scripts may only write to `context.character.personality`, `context.character.scenario`, and `context.character.example_dialogs`.
- Personality, scenario, and example dialogs are append-only by default.
- Every lorebook voice must include source and a Canon Layer tag: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, or `[CANDIDATE]`.
- Approved image metadata must use `../../0_assets/ASSET_REGISTRY.json` as the source for image descriptions, dimensions, registry keys, variants, and trigger keywords.
- Genealogy is owned by the Family Authority; NPC and Character records may reference family data but must not redefine it.
- Integrated World domains are strictly keyword-triggered.
- Only one minimal always-on world atmosphere voice is allowed.
- Do not reference `TODO-CANON/` from export scripts; it is a read-only historical archive.

## Rule Modules

| Module | File | Purpose |
|---|---|---|
| 01 | `01_authority_scope.md` | Authority, source precedence, guide alignment, authority separation, repository hygiene baseline |
| 02 | `02_project_baseline.md` | Project baseline, bot design contract, canon layers, integrated World domains, governance |
| 03 | `03_runtime_context_api.md` | JanitorAI runtime model, ES6-safe sandbox behavior, persistence mechanics, `context` API, append-only rule |
| 04 | `04_javascript_naming.md` | ES6-safe sandbox runtime constraint, hard-blocked APIs, file/function/data naming |
| 05 | `05_lorebook_entry_design.md` | Standard lore entry schema, prefix canon, priority scale, keyword design |
| 06 | `06_token_state_character_card.md` | Token budgeting, U-shaped memory placement, visible flags, zero-width state, stat parsing, character-card requirements |
| 07 | `07_templates_architecture.md` | Level 0 / Level 1 / Level 3 architecture, World integrated domains, bot authoring contracts |
| 08 | `08_template_requirements.md` | Requirements for Engine, World, Personality, Scenario, Initial Message, Example Dialogue, Bio, state, spoiler, NPC, and debug behavior |
| 09 | `09_development_workflow_acceptance.md` | Development workflow, testing matrix, mandatory acceptance criteria |
| 10 | `10_review_safe_removal_debugging.md` | Review procedure, safe removal, debugging standards |
| 11 | `11_output_voice_token_economy_hygiene.md` | Output prefixes, lorebook voice rules, token economy, repository hygiene |
| 12 | `12_compatibility_matrix.md` | Compatibility matrix for canonical templates and retained platform references |

## Canonical Master-Template Stack

Use the Level 0 / Level 1 / Level 3 architecture as the default architecture for SvartulfrVerse JanitorAI systems unless the user explicitly asks for a narrower or different scope.

| Layer | Master Template | Purpose |
|---|---|---|
| `level 0` | `../../2_Export/SvartulfrVerse_Engine.js` | Lore-agnostic runtime engine: visible flags, zero-width state, progressive context, debug, token budget, ES6-safe sandbox execution. Common to all bots. |
| `level 1` | `../../1_template/SvartulfrVerse_World_Template.json` | Integrated World lorebook for MacroCosmo + MicroCosmo: world facts, timeline, locations, organizations, bestiary, families, NPCs, secrets, canon unlocks, and relationships. |
| `level 3` | Personality + Scenario + Initial Message + Example Dialogue + Bot Card | Unique bot card: identity anchor, scene/controller direction, first beat, behavioral proof, and storefront. Choose concrete templates by bot type. |

The old modular templates formerly stored in `1_template/` are superseded by these master templates and must not be reintroduced as the default architecture.

## Bot Design Contract

All new SvartulfrVerse character, scenario, and bot-card systems must follow this authoring contract:

- `level 0` Engine is the common runtime layer: state, flags, progressive context, debug, token budget, and no lore meaning.
- `level 1` World integrated lorebook is the MacroCosmo + MicroCosmo data layer.
- `level 3` is the unique bot card: Personality, Scenario, Initial Message, Example Dialogue, and Bot Card.
- Personality is the identity anchor: stable voice, traits, social behavior, sensory cues, and output format.
- Scenario is the scene director or controller: current setting, relationship state, interaction categories, triggers, escalation, de-escalation, repair, pacing, and format reminders.
- Example Dialogue is behavioral proof: 3–6 compact exchanges that demonstrate tone, formatting, turn-taking, and trigger reactions.
- Initial Message is the first beat: voice + scene anchor + invitation, not a lore dump.
- Bot Card is the storefront: impact title, subtitle, main image, supporting images, structured blurb, impact line, and optional one-rule LLM advice.
- Multi-character bots require separate personality sections, a shared scenario as director, and a Trigger Matrix.
- Scenario bots require a Controller Block, a Scenario Block, functional cycles, choice/consequence logic, and testable pacing.

## Editing Contract

When changing rules:

1. Prefer editing the smallest relevant numbered module.
2. Update this index only if the module list, module purpose, central quick rules, or authoring contract change.
3. Keep links relative and valid from the file where they appear:
   - `rules.md` links to sibling modules with `01_authority_scope.md`, `07_templates_architecture.md`, etc.
   - module files link to repository files with `../../README.md`, `../../1_template/...`, and `../../0_assets/`.
4. Do not duplicate the full monolith back into `rules.md`.
5. Re-check `git diff --check` after documentation edits.

## Conflict Resolution

When rules appear to conflict, resolve in this order:

1. Explicit user instruction for the current task.
2. The JanitorAI Scripts Guide and Chatbot Creation Guide when they directly address the conflicted topic.
3. `../../README.md`.
4. The matching canonical master-template file in `../../1_template/`.
5. The numbered rule modules in `.trae/rules/`.
6. Project memory and prior architectural decisions.
