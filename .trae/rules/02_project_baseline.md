---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 02. Project Baseline and Domain Governance

This module defines the SvartulfrVerse baseline, canon layers, and MacroCosmo / MicroCosmo domain governance.

## Project Baseline

- Setting: contemporary 2024 baseline.
- Default ontology: human-only baseline.
- Supernatural elements are treated as `Cultural Canon` unless explicitly promoted by canon governance.
- Canon layers are governed by ADR-006:
  - `Active`
  - `Historical`
  - `Cultural`
  - `Deferred`
  - `Candidate`

## MacroCosmo / MicroCosmo Model

All new SvartulfrVerse JanitorAI systems must be organized by the MacroCosmo / MicroCosmo activation model, not by older layer labels.

### MacroCosmo: World-Facing Lore Domains

MacroCosmo covers world-facing lore and scenario activation.

| Domain | Prefix | Scope |
|---|---|---|
| World | `WRD:` | Core physical, cosmological, and rule-system facts |
| Lore | `LOR:` | Events, artifacts, ancient history, and present-day consequences |
| Locations | `LOC:` | Regions, cities, interiors, and points of interest |
| Organizations | `ORG:` | Factions, guilds, institutions, and hierarchy |
| Bestiary | `BST:` | Creatures, monsters, threats, habitats, and weaknesses |

### MicroCosmo: Actor-Facing Lore Domains

MicroCosmo covers actors, relationships, and living state.

| Domain | Prefix | Scope |
|---|---|---|
| Families | `FAM:` | Dynasties, bloodlines, genealogy hooks, politics, reputation, and house secrets |
| NPCs | `NPC:` | Individual identity, visual presentation, relationships, combat, psyche, and active scene presence |

## Governance Rules

- Genealogy is owned by the Family Authority.
- NPC and Character records may reference family data but must not redefine it.
- MacroCosmo and MicroCosmo domains are strictly keyword-triggered.
- Only one minimal always-on world atmosphere voice is allowed.
- Every lorebook voice must include source attribution from `database/` and a Canon Layer tag.
- Use [`../../bot_template/SvartulfrVerse_World_Template.js`](../../bot_template/SvartulfrVerse_World_Template.js) for MacroCosmo.
- Use [`../../bot_template/SvartulfrVerse_Scenario_Template.js`](../../bot_template/SvartulfrVerse_Scenario_Template.js) for MicroCosmo actors, relationships, spoilers, and pacing.
- Use [`../../bot_template/SvartulfrVerse_Engine_Template.js`](../../bot_template/SvartulfrVerse_Engine_Template.js) for state persistence, not for lore meaning.

## Runtime Integration Layer

The runtime integration layer coordinates active lore domains. It must not redefine world facts, family genealogy, or character identity by itself.

Default integration stack:

1. [`../../bot_template/SvartulfrVerse_Engine_Template.js`](../../bot_template/SvartulfrVerse_Engine_Template.js) for runtime state and budget-aware context mechanics.
2. [`../../bot_template/SvartulfrVerse_World_Template.js`](../../bot_template/SvartulfrVerse_World_Template.js) for MacroCosmo lore, timeline events, cascade activation, and adaptive detail.
3. [`../../bot_template/SvartulfrVerse_Scenario_Template.js`](../../bot_template/SvartulfrVerse_Scenario_Template.js) for MicroCosmo NPC activation, relationships, anti-omniscience gates, and TimeDelay pacing.
