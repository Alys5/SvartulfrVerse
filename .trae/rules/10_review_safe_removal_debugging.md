---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 10. Review Procedure, Safe Removal, and Debugging

This module defines review gates, safe removal rules, and debugging standards for the canonical master-template architecture.

## Review Procedure

### Self-Review

Confirm:

- the canonical master-template file is used;
- all context properties are guarded;
- no restricted features are used;
- append-only behavior is preserved;
- state persistence mechanism is documented or self-contained;
- keywords, filters, priority, and token behavior are correct;
- debug mode behavior is safe;
- character-card instructions are present when required;
- Engine additions remain lore-agnostic.

### Documentation Review

Confirm the repository documentation has:

- overview;
- quick start;
- master-template architecture;
- configuration summary;
- data structures;
- character-card setup;
- troubleshooting;
- safe removal notes when components can be removed.

### Integration Review

Confirm:

- compatibility between Engine, World, and Scenario;
- no duplicate visible flag manager between Engine and Scenario;
- no duplicate zero-width marker between Engine modules;
- no marker collision with existing scripts;
- no dependency on execution order unless explicitly documented;
- no reliance on unsupported cross-script variable sharing;
- no stale links to removed modular templates.

### Acceptance Review

Confirm the component satisfies:

- [`../../README.md`](../../README.md);
- the matching canonical master-template file in `../../1_template/`;
- the numbered rule modules in `.trae/rules/`.

## Safe Removal Rules

The old modular templates in `template/` have been removed because their behavior is now unified into the three canonical master templates.

When removing optional components in the future:

- Prefer feature toggles before deleting code.
- If code is deleted, document exactly what to remove.
- Never delete core context access, parsing, state extraction, helper functions, or injection logic unless the template explicitly says it is safe.
- Always keep unique persistence markers consistent.
- Always update `README.md` and `.trae/rules/` after removing or disabling components.
- Do not reintroduce removed modular templates unless the user explicitly asks for a separate legacy branch.

## Debugging Standards

- Use `DEBUG_MODE` for optional diagnostic output.
- Use bracketed debug prefixes such as `[ENGINE DEBUG]`, `[WORLD DEBUG]`, and `[SCENARIO DEBUG]`.
- Use the JanitorAI debug panel and `console.log()` for troubleshooting.
- Debug output must not be required in normal production use.
- Debug output must not leak hidden state unless the user intentionally enables debugging.
