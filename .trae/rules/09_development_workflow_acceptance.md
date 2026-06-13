---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 09. Development Workflow and Acceptance Criteria

This module defines the development workflow, testing matrix, and acceptance criteria for JanitorAI components.

## Development Workflow

### Step 1 — Master-Template Selection

Select the canonical master-template stack before editing code.

For MacroCosmo / MicroCosmo, use:

1. [`../../bot_template/SvartulfrVerse_Engine_Template.js`](../../bot_template/SvartulfrVerse_Engine_Template.js) for runtime state and budget mechanics.
2. [`../../bot_template/SvartulfrVerse_World_Template.js`](../../bot_template/SvartulfrVerse_World_Template.js) for MacroCosmo lore.
3. [`../../bot_template/SvartulfrVerse_Scenario_Template.js`](../../bot_template/SvartulfrVerse_Scenario_Template.js) for MicroCosmo actors, relationships, spoilers, and pacing.

Do not reintroduce old modular templates as the default architecture. If specialized behavior is needed, implement it inside the appropriate master template.

### Step 2 — Data Design

Define:

- state schema;
- visible flag definitions when applicable;
- zero-width components when applicable;
- World lore entries;
- Scenario NPC records;
- relationship records;
- spoiler gates;
- TimeDelay thresholds;
- keywords;
- priority/importance values;
- filters;
- persistence format;
- character-card instructions.

### Step 3 — Implementation Order

Implement in this order:

1. guards;
2. configuration;
3. data tables;
4. parsing helpers;
5. state extraction;
6. activation logic;
7. output assembly;
8. context injection;
9. debug output;
10. documentation or rule updates.

### Step 4 — Testing

Test with:

- empty context;
- undefined properties;
- last message only;
- recent message window;
- multiple simultaneous triggers;
- conflicting filters;
- token budget limits;
- state missing;
- invalid state;
- debug mode enabled;
- debug mode disabled;
- Engine zero-lore check.

### Step 5 — Review

Review against:

- [`../../README.md`](../../README.md);
- [`../../template/janitorai_scripts.md`](../../template/janitorai_scripts.md);
- the matching canonical master-template file in `../../bot_template/`;
- the numbered rule modules in `.trae/rules/`;
- all other official documentation the component integrates.

## Acceptance Criteria

A JanitorAI Script component is not complete until all applicable criteria are met.

### Mandatory Criteria

- The script has context guards.
- The script only modifies `personality`, `scenario`, and `example_dialogs` for LLM-visible effects.
- The script does not use restricted platform features.
- The script documents any required character-card instructions.
- The script includes debug support or a clear reason why debug support is not applicable.
- The script handles missing state safely.
- The script uses specific keywords and avoids accidental activation.
- The script respects token budget when it can be measured.
- The script uses append-only additions unless a template explicitly requires replacement.
- The script uses unique persistence markers when using zero-width state.
- The script validates state before applying it.
- The script has been checked against the relevant master-template file and rule modules.

### Template-Specific Criteria

Each master template must satisfy the specific requirements listed in [`08_template_requirements.md`](08_template_requirements.md).
