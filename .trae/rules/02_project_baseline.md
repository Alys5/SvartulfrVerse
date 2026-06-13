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
- Do not use `Multiple_Character_Template.js` as the core NPC system when `Context_Aware_Multiple_Character_Template.js` is available.
- Do not use `PropertyExploration.js` as a lore system; it is only for debug/API inspection.
- Do not use `TimeDelay_Script_Template.js` as the general lore base; reserve it for investigation or timeline scenarios.

## Runtime Integration Layer

The runtime integration layer coordinates active lore domains. It must not redefine world facts, family genealogy, or character identity by itself.

Default integration stack:

1. [`../../template/Context_Control_Template.js`](../../template/Context_Control_Template.js) + [`../../template/Context_Control_Awareness_Template.js`](../../template/Context_Control_Awareness_Template.js)
2. [`../../template/Complex_Lorebook_Template.js`](../../template/Complex_Lorebook_Template.js) + [`../../template/Adaptive_Lorebook_Template.js`](../../template/Adaptive_Lorebook_Template.js)
3. [`../../template/Context_Aware_Multiple_Character_Template.js`](../../template/Context_Aware_Multiple_Character_Template.js)
4. [`../../template/Advanced_Faction_Management_Template.js`](../../template/Advanced_Faction_Management_Template.js)
5. Optional spoiler/state modules: [`../../template/Anti_Omniscience_Investigation_Template.js`](../../template/Anti_Omniscience_Investigation_Template.js), [`../../template/Persistent_Flags_Lorebook_Template.js`](../../template/Persistent_Flags_Lorebook_Template.js), or modular [`../../template/Hidden_Persistent_Memory_Template.js`](../../template/Hidden_Persistent_Memory_Template.js).
