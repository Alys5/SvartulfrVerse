---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 12. Compatibility Matrix

This module defines the compatibility matrix for SvartulfrVerse JanitorAI templates.

| Template | Primary Use | Required Integration Notes |
|---|---|---|
| Lorebook MacroCosmo / MicroCosmo Schema | Complete MacroCosmo + MicroCosmo lore architecture | Use Context Control + Awareness, Complex Lorebook, Adaptive Lorebook, Context Aware Multiple Character, and Advanced Faction Management as the default stack |
| Context Control | Budget master | `/maxtokens`, `/budget`, `[Lorebook Count: N]`, per-script budget calculation, `[CONTEXT BUDGET]` injection |
| Context Control Awareness | Budget consumer | Parse `[CONTEXT BUDGET]`, zero-width fallback when available, full/summary/bullet degradation |
| Complex Lorebook | Dynamic lore, cascading triggers, stats, timeline | Use priority, ANY/ALL filters, `minMessages`, triggers, categories, debug |
| Adaptive Lorebook | Token-aware lore | Full/summary/bullet, importance, mention counting, budget degradation |
| Context Aware Multiple Character | NPC activation | Mention detection, category budgets, full/limited/summary payloads, active NPC relationships |
| Advanced Faction Management | Living families/dynasties | Zero-width state, diplomacy, resources, population, timeline, `/faction`, `/showstats`, `/hidestats` |
| Persistent Flags | Visible discrete state | Hex flags, anti-cheat, save support, macro-state flags only |
| Hidden Persistent Memory | Invisible modular state | Zero-width, components, token management, never monolithic as main system |
| Anti-Omniscience Investigation | Spoiler prevention | Flag-gated clues, no meta-labels, locked canon, controlled revelations |
| TimeDelay | Investigation pacing | Message/hour/canon thresholds, `[CANON]`, use only for timeline investigations |
| Multiple Character | Basic drop-in/drop-out characters | Superseded by Context Aware Multiple Character for core NPC systems |
| Progressive Sentence | Sentence-level control | Tiers, history scope, round-robin |
| PropertyExploration | Debug reference | Log context properties and types |
