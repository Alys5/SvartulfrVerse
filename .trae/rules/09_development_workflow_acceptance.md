# 09. Development Workflow and Acceptance Criteria

This module defines the development workflow, testing matrix, and acceptance criteria for JanitorAI components.

## Development Workflow

### Step 1 — Template Selection

Select the template stack before editing code.

For MacroCosmo / MicroCosmo, use the default schema in [`07_templates_architecture.md`](07_templates_architecture.md).

### Step 2 — Data Design

Define:

- state schema;
- data tables;
- keywords;
- priority/importance values;
- filters;
- commands;
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
10. documentation.

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
- debug mode disabled.

### Step 5 — Review

Review against:

- [`../../README.md`](../../README.md);
- [`../../template/janitorai_scripts.md`](../../template/janitorai_scripts.md);
- the matching template README;
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
- The script has been checked against all relevant official README files.

### Template-Specific Criteria

Each template must also satisfy the specific requirements listed in [`08_template_requirements.md`](08_template_requirements.md).
