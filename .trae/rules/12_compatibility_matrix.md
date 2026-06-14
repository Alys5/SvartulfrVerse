---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI compatibility matrix. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, source/canonLayer attribution, and MacroCosmo/MicroCosmo governance.'
---
# 12. Compatibility Matrix

This module defines the compatibility matrix for the canonical SvartulfrVerse JanitorAI templates. The JanitorAI Scripts Guide and Chatbot Creation Guide are source of truth when directly relevant.

| Component | Primary Use | Required Integration Notes |
|---|---|---|
| Engine Master Template | Runtime state, token mechanics, debug, progressive context | Must be lore-agnostic; owns visible flags, zero-width state, progressive sentence allocation, and generic budget parsing. ES6-safe syntax is allowed inside the JanitorAI Scripts sandbox, but hard-blocked APIs remain forbidden. |
| World Master Template | MacroCosmo lore | Must include source attribution, Canon Layer, cascade activation, filters, timeline events, stat reactions, and adaptive detail. |
| Scenario Master Template | MicroCosmo actors and pacing | Must include NPC activation, relationships, anti-omniscience gates, TimeDelay pacing, and scene-aware drop-in/drop-out behavior. |
| Personality Template | Identity anchor | Must be compact, behavior-focused, and source-attributed. Avoid encyclopedia fields and full history. |
| Scenario Template | Scene director | Must define setting, relationship state, Trigger Matrix, escalation/de-escalation, repair, and information boundaries. |
| Sys Bio Template | Public bot card | Must use impact title, subtitle, portrait, supporting images, blurb, impact line, play style, and closing invitation/threat. Image metadata must come from `0_assets/ASSET_REGISTRY.json`. |
| `1_template/` | Master-template architecture | Canonical runtime architecture for Engine, World, and Scenario. |

## Runtime Compatibility

| Rule | Compatibility |
|---|---|
| ES6-safe syntax | Allowed inside JanitorAI Scripts sandbox. |
| `const`, `let`, arrow functions, template literals | Allowed only when the sandbox supports them and no hard-blocked API is used. |
| `async/await`, `Promise`, `fetch`, `import`, `require` | Forbidden. |
| `window`, `document`, `setTimeout`, `setInterval` | Forbidden. |
| Global side effects | Forbidden. |
| `context` as sole JanitorAI interface | Required. |
| Writable fields | `context.character.personality`, `context.character.scenario`, `context.character.example_dialogs` only. |

## Lorebook Compatibility

| Legacy Concept | Canonical Placement | Notes |
|---|---|---|
| Complex Lorebook | World Master Template | World owns cascade, filters, timeline, and stats. |
| Adaptive Lorebook | World Master Template | World owns full/summary/bullet degradation. |
| Context Aware Multiple Character | Scenario Master Template | Scenario owns category-aware NPC activation. |
| Multiple Character | Scenario simple NPC fallback | Scenario owns compact drop-in/drop-out behavior. |
| Persistent Flags | Engine visible flags | Engine owns generic hex flag mechanics only. |
| Hidden Persistent Memory | Engine zero-width state | Engine owns generic hidden state mechanics only. |
| Progressive Sentence | Engine progressive context | Engine owns generic progressive allocation. |
| Anti-Omniscience Investigation | Scenario spoiler gates | Scenario owns flag-gated narrative content. |
| TimeDelay Script | Scenario TimeDelay pacing | Scenario owns hour/message/canon thresholds. |

## Removed or Superseded Items

The following old modular templates are superseded and removed from `template/`:

| Legacy Module | Superseded By | Notes |
|---|---|---|
| Context Control / Context Control Awareness | Engine budget parsing | Engine does not inject a new global budget unless a separate user-approved budget system is added. |
| Advanced Faction Management | World + Scenario data tables | Family/faction behavior must be represented in canonical data, not a separate default template. |
| PropertyExploration | Engine debug utilities | Engine owns generic context inspection. |
