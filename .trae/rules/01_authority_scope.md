---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, source-of-truth guide alignment, ES6-safe sandbox runtime constraints, context API, and Level 0 / Level 1 / Level 3 architecture.'
---
# 01. Authority and Scope

This module defines the authority model for SvartulfrVerse JanitorAI rules.

## Applies To

Use these rules for:

- canonical JanitorAI master templates in `../../1_template/`;
- Integrated World Lorebook systems;
- runtime utilities and debug helpers;
- generated scenario-specific scripts;
- character cards, bot cards, Personality blocks, Scenario blocks, Example Dialogue, Initial Messages, and Scenario Bots;
- supporting documentation and review workflows.

## Authoritative Sources

Every JanitorAI component must be designed and reviewed against the applicable source documentation:

- [JanitorAI Scripts Guide](https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/GuideBookSite/book/print.html) for runtime scripts, sandbox behavior, context API, matching, memory, lorebook mechanics, probability, gating, reaction engines, and debugging.
- [Chatbot Creation Guide](https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/ChatbotBookSite/book/print.html) for token economy, U-shaped memory placement, Personality blocks, Scenario blocks, Example Dialogue, Initial Messages, Bot Cards, multi-character design, Trigger Matrix design, Scenario Bots, testing, and debugging.
- `../../0_assets/ASSET_REGISTRY.json` for approved image metadata, descriptions, dimensions, registry keys, variants, and trigger keywords.
- `../../README.md`.
- `../../2_Export/SvartulfrVerse_Engine.js`.
- `../../1_template/SvartulfrVerse_World_Template.json`.
- The numbered rule modules in `.trae/rules/`.

The old modular template README files in `1_template/` are no longer authoritative after their migration into the Level 0 / Level 1 / Level 3 architecture.

## Rule Precedence

When rules appear to conflict, resolve in this order:

1. Explicit user instruction for the current task.
2. The JanitorAI Scripts Guide and Chatbot Creation Guide when they directly address the conflicted topic.
3. `../../README.md`.
4. The matching canonical master-template file in `../../1_template/`.
5. The numbered rule modules in `.trae/rules/`.
6. Project memory and prior architectural decisions.

No external shortcut, personal convention, undocumented pattern, or convenience abstraction may override these rules unless explicitly approved.

## Authority Separation

- World facts, NPC records, relationships, secrets, and canon unlocks are owned by the integrated World Lorebook domain and must be implemented in `level 1` World data.
- Genealogy is owned by the Family Authority.
- NPC and Character records may reference family data but must not redefine it.
- Runtime integration scripts may coordinate context injection but must not redefine world facts, family genealogy, or character identity by themselves.
- The Engine master template may persist and gate state, but it must not invent canon or scenario meaning.
- Spoiler and state modules may gate or persist information but must not invent canon.
- Personality defines the actor. Scenario directs the scene. Example Dialogue proves behavior. Initial Message opens the first beat. Bot Card sells the entry point.

## Repository Hygiene Baseline

- Do not create files unless they are necessary for the requested goal.
- Prefer editing existing files over creating new files.
- Never create documentation files unless explicitly requested.
- Never commit changes unless explicitly asked.
- Never run destructive git commands unless explicitly asked.
- `TODO-CANON/` is a read-only historical archive, isolated via `.gitignore`, and must never be referenced by export scripts.
