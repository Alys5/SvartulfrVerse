---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI compatibility matrix. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, source/canonLayer attribution, and Level 0 / Level 1 / Level 3 architecture.'
---
# 12. Compatibility Matrix

This module defines the compatibility matrix for the canonical SvartulfrVerse JanitorAI templates. The JanitorAI Scripts Guide and Chatbot Creation Guide are source of truth when directly relevant.

| Component | Primary Use | Required Integration Notes |
|---|---|---|
| Engine Master Template | `level 0` runtime state, token mechanics, debug, progressive context | Must be lore-agnostic; owns visible flags, zero-width state, progressive sentence allocation, and generic budget parsing. ES6-safe syntax is allowed inside the JanitorAI Scripts sandbox, but hard-blocked APIs remain forbidden. |
| Integrated World Lorebook | `level 1` MacroCosmo + MicroCosmo | Must include internal source attribution, Canon Layer, domain prefixes, cascade activation, filters, timeline events, stat reactions, NPC data, relationships, secrets, canon unlocks, and adaptive detail; exported `content` must never expose source paths or development metadata. |
| Personality Template | Identity anchor | Must be compact, behavior-focused, and source-attributed. Avoid encyclopedia fields and full history. |
| Scenario Template | Scene director or controller | Must define setting, relationship state, Trigger Matrix, escalation/de-escalation, repair, choice engine, information boundaries, and pacing. |
| Bot Card Template | Public bot card | Must use impact title, subtitle, portrait, supporting images, blurb, impact line, play style, and closing invitation/threat. Image metadata must come from `0_assets/ASSET_REGISTRY.json`. |
| `1_template/` | Master-template architecture | Canonical runtime architecture for `level 0`, `level 1`, and `level 3` templates. |

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
| Complex Lorebook | Integrated World Lorebook `level 1` | World owns cascade, filters, timeline, stats, NPC data, relationships, secrets, and canon unlocks. |
| Adaptive Lorebook | Integrated World Lorebook `level 1` | World owns full/summary/bullet degradation. |
| Context Aware Multiple Character | `level 3` Scenario / Personality | Scenario owns category-aware NPC activation; Personality owns distinct voices. |
| Multiple Character | `level 3` Scenario simple NPC fallback | Scenario owns compact drop-in/drop-out behavior. |
| Persistent Flags | Engine `level 0` visible flags | Engine owns generic hex flag mechanics only. |
| Hidden Persistent Memory | Engine `level 0` zero-width state | Engine owns generic hidden state mechanics only. |
| Progressive Sentence | Engine `level 0` progressive context | Engine owns generic progressive allocation. |
| Anti-Omniscience Investigation | Integrated World `level 1` + `level 3` gates | World owns locked investigation content; Scenario/card owns active scene gates and anti-omniscience behavior. |
| TimeDelay Script | Integrated World `level 1` + `level 3` pacing | World owns hour/message/canon thresholds; Scenario/card owns pacing behavior. |

## Removed or Superseded Items

The following old modular templates are superseded and removed from `1_template/`:

| Legacy Module | Superseded By | Notes |
|---|---|---|
| Context Control / Context Control Awareness | Engine budget parsing | Engine does not inject a new global budget unless a separate user-approved budget system is added. |
| Advanced Faction Management | Integrated World data tables | Family/faction behavior must be represented in canonical data, not a separate default template. |
| PropertyExploration | Engine debug utilities | Engine owns generic context inspection. |
