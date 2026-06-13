---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 10. Review Procedure, Safe Removal, and Debugging

This module defines review gates, safe removal rules, and debugging standards.

## Review Procedure

### Self-Review

Confirm:

- file name and README name;
- all context properties are guarded;
- no restricted features are used;
- append-only behavior;
- state persistence mechanism is documented;
- keywords, filters, priority, and token behavior;
- debug mode behavior;
- character-card instructions.

### Documentation Review

Confirm the README has:

- overview;
- quick start;
- how it works;
- configuration;
- data structures;
- character-card setup;
- troubleshooting;
- safe removal when components can be removed.

### Integration Review

Confirm:

- compatibility with Context Control when token-aware;
- compatibility with zero-width scripts when persistent state is used;
- no marker collision with existing scripts;
- no dependency on execution order unless explicitly documented;
- no reliance on unsupported cross-script variable sharing.

### Acceptance Review

Confirm the component satisfies:

- [`../../README.md`](../../README.md);
- [`../../template/janitorai_scripts.md`](../../template/janitorai_scripts.md);
- the matching template README;
- all other official documentation it integrates.

## Safe Removal Rules

When a template supports optional components, removal must be documented.

- Prefer feature toggles before deleting code.
- If code is deleted, document exactly what to remove.
- Never delete core context access, parsing, state extraction, helper functions, or injection logic unless the template explicitly says it is safe.
- Always keep unique persistence markers consistent.
- Always update the README after removing or disabling components.

## Debugging Standards

- Use `DEBUG_MODE` for optional diagnostic output.
- Use bracketed debug prefixes such as `[DEBUG: ...]`.
- Use the JanitorAI debug panel and `console.log()` for troubleshooting.
- Debug output must not be required in normal production use.
- Debug output must not leak hidden state unless the user intentionally enables debugging.
