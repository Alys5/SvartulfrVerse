---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 07. Canonical Template Architecture

This module defines the canonical master-template stack, final architecture levels, and MacroCosmo / MicroCosmo mapping.

## Canonical Master Templates

Use these three templates as the default architecture for Lorebook_MacroCosmo / Lorebook_MicroCosmo systems unless the user explicitly asks for a narrower or different scope.

| Area | Master Template | Purpose |
|---|---|---|
| Runtime engine | [`../../bot_template/SvartulfrVerse_Engine_Template.js`](../../bot_template/SvartulfrVerse_Engine_Template.js) | Lore-agnostic state, visible flags, zero-width memory, progressive context, debug, token budget parsing. |
| MacroCosmo | [`../../bot_template/SvartulfrVerse_World_Template.js`](../../bot_template/SvartulfrVerse_World_Template.js) | World lore, timeline events, stat reactions, cascade activation, adaptive full/summary/bullet degradation. |
| MicroCosmo | [`../../bot_template/SvartulfrVerse_Scenario_Template.js`](../../bot_template/SvartulfrVerse_Scenario_Template.js) | Active NPCs, relationships, anti-omniscience gates, TimeDelay pacing, drop-in/drop-out scene control. |

## Final Architecture Levels

1. **Level 1 — Runtime Engine**
   - [`../../bot_template/SvartulfrVerse_Engine_Template.js`](../../bot_template/SvartulfrVerse_Engine_Template.js).
   - Objective: provide reusable state mechanics without introducing world-specific meaning.
   - Requirements: ES5, `context` only, append-only writes, zero lore, abstract variable names, visible flag validation, zero-width state, progressive sentence allocation, debug support.

2. **Level 2 — MacroCosmo World**
   - [`../../bot_template/SvartulfrVerse_World_Template.js`](../../bot_template/SvartulfrVerse_World_Template.js).
   - Objective: manage world-facing lore, timeline, cascade activation, filters, and adaptive detail.
   - Requirements: every active lore voice must include `source` and `canonLayer`; use priority/importance/mentions for token economy.

3. **Level 3 — MicroCosmo Scenario**
   - [`../../bot_template/SvartulfrVerse_Scenario_Template.js`](../../bot_template/SvartulfrVerse_Scenario_Template.js).
   - Objective: manage the current scene, active NPCs, relationships, anti-omniscience, and time-based investigation pacing.
   - Requirements: mention-triggered NPC activation, category-aware budgets, source/canonLayer attribution, no locked spoilers before gates open.

4. **Level 4 — State and Spoiler Control**
   - Engine owns generic visible and invisible persistence mechanics.
   - Scenario owns flag-gated narrative content and TimeDelay disclosure rules.
   - World owns canon meaning, timeline facts, and lore consequences.

## MacroCosmo Mapping

MacroCosmo covers world-facing lore and scenario activation.

| MacroCosmo Domain | Primary Master Template | Activation Pattern |
|---|---|---|
| `World` | `SvartulfrVerse_World_Template` | Direct world/cosmology keywords; source and Canon Layer required. |
| `Lore` | `SvartulfrVerse_World_Template` | Event/artifact keywords; use `minMessages`, filters, and cascade when needed. |
| `Locations` | `SvartulfrVerse_World_Template` | Core location keywords plus interior/detail entries gated by `requiresAny`. |
| `Organizations` | `SvartulfrVerse_World_Template` | Core faction keywords plus hierarchy/rule entries gated by `requiresAny`. |
| `Bestiary` | `SvartulfrVerse_World_Template` | Creature direct-name keywords plus environmental activation through `requiresAny`. |

Mapping rules:

- `chiavi_primarie` → `keywords`
- `logica_attivazione ANY` → simple keyword match
- `logica_attivazione AND ALL` → `filters.requiresAll`
- `ordine_inserimento` → `priority`
- `contenuto` → `personality` + `scenario`

## MicroCosmo Mapping

MicroCosmo covers actors, relationships, and living state.

### Families

Use World data tables for static lineage lore. Use Scenario data tables for active family actors and relationships. Engine may persist abstract state but must not define genealogy.

### NPCs

Use `SvartulfrVerse_Scenario_Template`.

This template is required for modular NPC records with adaptive categories mapped from the character model into token-aware payloads. It handles character mention detection, sorting by mentions plus importance, adaptive detail degradation, global budget consumption, and active NPC relationship context.

## Optional Modules

The old modular templates are superseded. Do not reintroduce them as the default architecture. If a specialized module is needed, implement it inside the appropriate master template:

- state mechanics → Engine;
- world lore, timeline, adaptive lore → World;
- NPC, spoiler, investigation pacing → Scenario.

## Reference Structures

### Engine Data Shape

```javascript
var flagDefinitions = [];
var HIDDEN_COMPONENTS = [];
var progressiveSubjects = [];
```

Engine data must use abstract identifiers such as `flag_0x0A`, `location_id`, `inventory_slot_1`, or `component_0x01`. It must not include magic, technology, named characters, or world-specific lore.

### World Entry Shape

```javascript
var loreEntries = [
    {
        id: 'example_location_core',
        category: 'location',
        prefix: 'LOC',
        keywords: ['specific location keyword', 'alternate phrase'],
        priority: 10,
        minMessages: 0,
        maxMessages: Infinity,
        filters: {
            type: 'ANY',
            conditions: [
                { keyword: 'specific activation phrase' }
            ]
        },
        cascade: {
            enabled: true,
            children: ['example_child_id']
        },
        importance: 10.0,
        source: 'database/world/example_location_core.md',
        canonLayer: 'ACTIVE',
        full: { personality: ', aware of concrete location facts', scenario: ' [ACTIVE] LOC Source: database/world/example_location_core.md. Facts here.' },
        summary: { personality: '', scenario: ' [ACTIVE] LOC Source: database/world/example_location_core.md. Compact facts here.' },
        bullet: { personality: '', scenario: ' [ACTIVE] LOC Source: database/world/example_location_core.md. Bullet facts here.' }
    }
];
```

### Scenario NPC Shape

```javascript
var npcDatabase = [
    {
        id: 'example_npc',
        displayName: 'Example NPC',
        names: ['example npc', 'example'],
        importance: 10.0,
        source: 'database/scenario/example_npc.md',
        canonLayer: 'ACTIVE',
        categories: {
            identity: { full: ', aware of Example NPC identity', limited: ', aware of Example NPC', summary: ' Example NPC is active.' },
            appearance: { full: ' Appearance facts here.', limited: ' Appearance summary here.', summary: ' Appearance summary here.' },
            relationships: { full: ' Relationship facts here.', limited: ' Relationship summary here.', summary: ' Relationship summary here.' },
            personality: { full: ', aware of Example NPC personality', limited: ', aware of Example NPC traits', summary: ' Example NPC personality summary.' },
            sampleDialog: { full: 'Example NPC: Full line.\n', limited: 'Example NPC: Compact line.\n', summary: 'Example NPC: One line.\n' }
        }
    }
];
```
