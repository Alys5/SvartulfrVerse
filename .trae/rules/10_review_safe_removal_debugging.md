---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, source/canonLayer attribution, and Level 0 / Level 1 / Level 3 review workflow.'
---
# 10. Review Procedure, Safe Removal, and Debugging

This module defines review gates, safe removal rules, and debugging standards for the canonical master-template architecture. The JanitorAI Scripts Guide and Chatbot Creation Guide are source of truth when directly relevant.

## Review Procedure

### Self-Review

Confirm:

- the matching canonical master-template file is used;
- ES6-safe syntax is used only inside the JanitorAI Scripts sandbox;
- hard-blocked APIs are absent: `async/await`, `Promise`, `fetch`, `import`, `require`, `window`, `document`, `setTimeout`, `setInterval`, and global side effects;
- `context` is the sole JanitorAI interface;
- `context.character`, `context.character.personality`, and `context.character.scenario` are guarded;
- writes are limited to `context.character.personality`, `context.character.scenario`, and `context.character.example_dialogs`;
- append-only behavior is preserved;
- state persistence mechanism is documented or self-contained;
- keywords, filters, priority, and token behavior are correct;
- debug mode behavior is safe;
- character-card instructions are present when required;
- Engine additions remain lore-agnostic;
- World and Scenario entries include `source` and a Canon Layer when they generate lorebook-style output.

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
- no stale links to removed modular templates;
- no references to `TODO-CANON/` from export scripts;
- image metadata comes from `0_assets/ASSET_REGISTRY.json`.

### Acceptance Review

Confirm the component satisfies:

- explicit user instructions for the current task;
- the JanitorAI Scripts Guide and Chatbot Creation Guide when directly relevant;
- `../../README.md`;
- the matching canonical master-template file in `../../1_template/`;
- the numbered rule modules in `.trae/rules/`.

## Safe Removal Rules

The old modular templates in `1_template/` have been removed because their behavior is now unified into the Level 0 / Level 1 / Level 3 architecture.

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
- Use the JanitorAI debug panel and `console.log()` for troubleshooting only when debug is intentionally enabled.
- Debug output must not be required in normal production use.
- Debug output must not leak hidden state unless the user intentionally enables debugging.
- Remove debug-only text before final export unless the user explicitly wants it retained.
