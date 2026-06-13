---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 12. Compatibility Matrix

This module defines the compatibility matrix for the canonical SvartulfrVerse JanitorAI templates.

| Component | Primary Use | Required Integration Notes |
|---|---|---|
| Engine Master Template | Runtime state, token mechanics, debug, progressive context | Must be lore-agnostic; owns visible flags, zero-width state, progressive sentence allocation, and generic budget parsing. |
| World Master Template | MacroCosmo lore | Must include source attribution, Canon Layer, cascade activation, filters, timeline events, stat reactions, and adaptive detail. |
| Scenario Master Template | MicroCosmo actors and pacing | Must include NPC activation, relationships, anti-omniscience gates, TimeDelay pacing, and scene-aware drop-in/drop-out behavior. |
| `template/janitorai_scripts.md` | Platform reference | Retained as the source for JanitorAI Script behavior and runtime constraints. |

## Legacy Modular Templates

The following old modular templates are superseded and removed from `template/`:

| Legacy Module | Superseded By | Notes |
|---|---|---|
| Context Control / Context Control Awareness | Engine budget parsing | Engine does not inject a new global budget unless a separate user-approved budget system is added. |
| Complex Lorebook | World Master Template | World now owns cascade, filters, timeline, and stats. |
| Adaptive Lorebook | World Master Template | World now owns full/summary/bullet degradation. |
| Context Aware Multiple Character | Scenario Master Template | Scenario now owns category-aware NPC activation. |
| Advanced Faction Management | World + Scenario data tables | Family/faction behavior must be represented in canonical data, not a separate default template. |
| Persistent Flags | Engine visible flags | Engine owns generic hex flag mechanics only. |
| Hidden Persistent Memory | Engine zero-width state | Engine owns generic hidden state mechanics only. |
| Progressive Sentence | Engine progressive context | Engine owns generic progressive allocation. |
| PropertyExploration | Engine debug utilities | Engine owns generic context inspection. |
| Anti-Omniscience Investigation | Scenario spoiler gates | Scenario owns flag-gated narrative content. |
| TimeDelay Script | Scenario TimeDelay pacing | Scenario owns hour/message/canon thresholds. |
| Multiple Character | Scenario simple NPC fallback | Scenario owns compact drop-in/drop-out behavior. |
