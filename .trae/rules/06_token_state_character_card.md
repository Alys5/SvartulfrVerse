# 06. Token Management, State Persistence, and Character Card Integration

This module defines token economy rules, persistence standards, and character-card requirements.

## Token Management

- Individual script additions should normally stay below 600 characters unless the template explicitly supports larger blocks.
- Use adaptive detail levels when a template can activate in multiple context sizes.
- Use `estimateTokens(text) => Math.ceil(text.length / 4)` for approximate token budgeting.
- Sort or allocate by priority/importance so critical content remains available first.
- When Context Control is present, scripts should parse `[CONTEXT BUDGET: ...]` and adapt output to `per_script`.
- If Context Control is absent, fall back to a conservative default, normally `160` tokens per script for Tier 1 with 5 lorebooks.

## Visible Flags

Visible flag scripts must:

- use a consistent visible format such as `**FLAGS:** XX:XX:XX`;
- preserve flag positions;
- validate flag values;
- provide anti-cheat behavior;
- support save-system use cases when continuity across sessions or scenarios is required.

## Zero-Width State

Zero-width scripts must:

- use unique header/footer markers per script to avoid collisions;
- encode only documented state payloads;
- include clear reproduction instructions for the LLM;
- scan recent messages backward with a documented `SEARCH_DEPTH`;
- fall back to a safe default state when no state is found;
- provide `DEBUG_MODE` to inspect decoded state.

## Stat Parsing

Scripts that parse stats from AI output must:

- require a consistent character-card status block;
- use regex patterns that match the documented format, e.g. `**StatName:** 50%`;
- validate parsed values before applying thresholds.

## Character Card Integration Rules

Scripts that depend on AI output must document exact character-card requirements.

### Stat-Based Scripts

The character card must include:

- stat definitions;
- rules for when stats change;
- exact output format for the status block;
- threshold behavior.

### Persistent State Scripts

The character card must include:

- instructions to reproduce the hidden state or visible flag string;
- instructions not to describe or modify hidden state markers;
- instructions to preserve the same number of positions or fields;
- save/copy/paste continuity instructions when applicable.

### Management Mode Scripts

The character card must include:

- command entry point;
- command exit point;
- display rules;
- rules for treating displayed state as authoritative.
