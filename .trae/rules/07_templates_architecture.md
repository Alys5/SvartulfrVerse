# 07. Template Selection and MacroCosmo / MicroCosmo Architecture

This module defines the recommended template stack, final architecture levels, and domain mapping.

## Template Selection

Choose the template based on the use case. For Lorebook_MacroCosmo / Lorebook_MicroCosmo systems, use the recommended stack below unless the user explicitly asks for a narrower or different scope.

- Context budget management: `Context_Control_Template` + `Context_Control_Awareness_Template`
- Worldbuilding-heavy dynamic lore: `Complex_Lorebook_Template`
- Token-constrained lore: `Adaptive_Lorebook_Template`
- NPC activation with adaptive categories: `Context_Aware_Multiple_Character_Template`
- Living families, dynasties, diplomacy, resources, and timeline state: `Advanced_Faction_Management_Template`
- Fine-grained sentence control: `Progressive_Sentence_Lorebook_Template`
- Discrete visible/copyable narrative state: `Persistent_Flags_Lorebook_Template`
- Modular invisible state: `Hidden_Persistent_Memory_Template`
- Secrets, mysteries, and spoiler prevention: `Anti_Omniscience_Investigation_Template`
- Investigation pacing or timeline disclosure: `TimeDelay_Script_Template`
- Basic group roleplay fallback: `Multiple_Character_Template`
- Debugging context API: `PropertyExploration`

Do not use `Multiple_Character_Template`, `PropertyExploration`, `TimeDelay_Script_Template`, or monolithic `Hidden_Persistent_Memory_Template` as the core architecture when the recommended stack is available.

## Recommended Template Stack

| Area | Template | Purpose |
|---|---|---|
| Global budget | [`../../template/Context_Control_Template.js`](../../template/Context_Control_Template.js) | Master budget: divides context across scripts and injects `[CONTEXT BUDGET: ...]`. |
| Budget consumer | [`../../template/Context_Control_Awareness_Template.js`](../../template/Context_Control_Awareness_Template.js) | Lets other scripts read the available budget and degrade `full → summary → bullet`. |
| MacroCosmo | [`../../template/Complex_Lorebook_Template.js`](../../template/Complex_Lorebook_Template.js) | Handles priority, ANY/ALL filters, cascading triggers, `minMessages`, categories, and dynamic reactions. |
| Token economy | [`../../template/Adaptive_Lorebook_Template.js`](../../template/Adaptive_Lorebook_Template.js) | Provides full / summary / bullet degradation based on mentions, importance, and budget. |
| MicroCosmo NPC | [`../../template/Context_Aware_Multiple_Character_Template.js`](../../template/Context_Aware_Multiple_Character_Template.js) | Adaptive NPC activation with category budgets for personality, appearance, dialog, relationships, combat, and psyche. |
| Families / dynamic factions | [`../../template/Advanced_Faction_Management_Template.js`](../../template/Advanced_Faction_Management_Template.js) | Persistent invisible state, diplomacy, resources, population, timeline events, and faction lore engine. |

## Final Architecture Levels

1. **Level 1 — Context Control**
   - [`../../template/Context_Control_Template.js`](../../template/Context_Control_Template.js)
   - [`../../template/Context_Control_Awareness_Template.js`](../../template/Context_Control_Awareness_Template.js)
   - Objective: prevent MacroCosmo, MicroCosmo, families, and NPCs from competing for the same context budget.

2. **Level 2 — MacroCosmo**
   - [`../../template/Complex_Lorebook_Template.js`](../../template/Complex_Lorebook_Template.js)
   - [`../../template/Adaptive_Lorebook_Template.js`](../../template/Adaptive_Lorebook_Template.js)
   - Use `Complex` for logic, priority, filters, and cascade behavior.
   - Use `Adaptive` for full / summary / bullet degradation based on mentions and budget.

3. **Level 3 — MicroCosmo**
   - [`../../template/Context_Aware_Multiple_Character_Template.js`](../../template/Context_Aware_Multiple_Character_Template.js) for NPCs.
   - [`../../template/Advanced_Faction_Management_Template.js`](../../template/Advanced_Faction_Management_Template.js) for living families, dynasties, diplomacy, resources, and timeline state.

4. **Level 4 — State and Spoiler Control**
   - [`../../template/Persistent_Flags_Lorebook_Template.js`](../../template/Persistent_Flags_Lorebook_Template.js) for discrete visible/copyable narrative states.
   - [`../../template/Hidden_Persistent_Memory_Template.js`](../../template/Hidden_Persistent_Memory_Template.js) only as modular invisible state, never as the monolithic main system.
   - [`../../template/Anti_Omniscience_Investigation_Template.js`](../../template/Anti_Omniscience_Investigation_Template.js) for secrets, mysteries, and revelation control.

## MacroCosmo Mapping

MacroCosmo covers world-facing lore and scenario activation. Use `Complex_Lorebook_Template` as the base and add `Adaptive_Lorebook_Template` when token-aware degradation is required.

| MacroCosmo Domain | Primary Template | Activation Pattern |
|---|---|---|
| `World` | `Complex_Lorebook_Template` | Direct world/cosmology keywords; optional `filters.requiresAll` for AND logic. |
| `Lore` | `Complex_Lorebook_Template` | Event/artifact keywords; use `minMessages` for ancient events or spoilers; use `triggers` for linked lore. |
| `Locations` | `Complex_Lorebook_Template` | Core location keywords plus interior/detail entries gated by `requiresAny`. |
| `Organizations` | `Complex_Lorebook_Template` | Core faction keywords plus hierarchy/rule entries gated by `requiresAny`. |
| `Bestiary` | `Complex_Lorebook_Template` | Creature direct-name keywords plus environmental activation through `requiresAny`. |

Mapping rules:

- `chiavi_primarie` → `keywords`
- `logica_attivazione ANY` → simple keyword match
- `logica_attivazione AND ALL` → `filters.requiresAll`
- `ordine_inserimento` → `priority`
- `contenuto` → `personality` + `scenario`

## MicroCosmo Mapping

MicroCosmo covers actors, relationships, and living state.

### Families

Use `Complex_Lorebook_Template` for static lineage lore.

Use `Advanced_Faction_Management_Template` when the family or faction is politically/economically/militarily active and needs persistent state, diplomacy, resources, population, heirs, projects, or timeline events.

### NPCs

Use `Context_Aware_Multiple_Character_Template`.

This template is required for modular NPC records with Core, Visual, Relationships, Combat, Psyche, and sample dialog categories. It handles character mention detection, sorting by mentions plus importance, adaptive detail degradation, global budget consumption, and active NPC relationship context.

## Optional State / Spoiler Modules

Use only when needed:

- [`../../template/Persistent_Flags_Lorebook_Template.js`](../../template/Persistent_Flags_Lorebook_Template.js) for discrete visible/copyable narrative states such as quest flags, unlocked secrets, frozen relationships, recognized inheritance, exile/reinstatement, and active/broken alliances.
- [`../../template/Hidden_Persistent_Memory_Template.js`](../../template/Hidden_Persistent_Memory_Template.js) only when modularized for invisible state such as weather, current location, character presence, inventory, day, or emotions.
- [`../../template/Anti_Omniscience_Investigation_Template.js`](../../template/Anti_Omniscience_Investigation_Template.js) for secrets, house mysteries, historical or family clues, Cultural Canon not yet revealed, and Candidate/Deferred canon not yet active.
- [`../../template/TimeDelay_Script_Template.js`](../../template/TimeDelay_Script_Template.js) only for investigations or timeline pacing; it is less preferred than Anti-Omniscience when avoiding meta-labels and foreshadowing is critical.

## Reference Structures

### World Core

Use `Complex_Lorebook_Template`.

```javascript
{
    keywords: ['nome mondo', 'mondo', 'universo', 'cosmologia'],
    priority: 10,
    minMessages: 0,
    category: 'world_core',
    personality: ', aware of the core physical and cosmological rules of [Nome Mondo]',
    scenario: ' [World Core] [Nome Mondo] is a [tipo] world. Physical rules: [regole]. Cosmology: [creazione]. Magic/energy system: [regola assoluta].'
}
```

### Lore Event

Use `Complex_Lorebook_Template`.

```javascript
{
    keywords: ['nome evento', 'nome artefatto', 'storia antica', 'guerra'],
    priority: 9,
    minMessages: 2,
    category: 'lore_event',
    personality: ', carrying knowledge of [Nome Evento/Artefatto]',
    scenario: ' [Lore] [Nome Evento] occurred [datazione]. Effect: [cosa è cambiato nel presente].',
    triggers: ['history', 'war', 'ancient']
}
```

### Location Core and Interior

Use `Complex_Lorebook_Template` for the core entry and a second entry for internal structures.

```javascript
{
    keywords: ['nome luogo', 'capitale del luogo'],
    priority: 9,
    category: 'location_core',
    personality: ', familiar with [Nome Luogo]',
    scenario: ' [Location Core] [Nome Luogo] is a [regione/città]. Biome/climate: [clima]. Government: [governo]. Atmosphere: [atmosfera].'
}
```

```javascript
{
    keywords: ['nome luogo'],
    filters: {
        requiresAny: ['entrare', 'dentro', 'edificio', 'locanda', 'castello', 'struttura']
    },
    priority: 8,
    category: 'location_interior',
    personality: ', aware of the internal structures of [Nome Luogo]',
    scenario: ' [Location Interior] Key points of interest in [Nome Luogo]: [edifici]. Dominant internal structure: [descrizione].'
}
```

### Organization Core and Hierarchy

Use `Complex_Lorebook_Template` for Core and Hierarchy.

```javascript
{
    keywords: ['nome fazione', 'soprannome fazione'],
    priority: 9,
    category: 'organization_core',
    personality: ', knowledgeable about [Nome Fazione]',
    scenario: ' [Organization Core] [Nome Fazione] is a [tipo]. Purpose: [scopo]. Base: [hook LOC]. Alignment: [ostili/neutrali/alleati].',
    triggers: ['faction', 'rules', 'hierarchy']
}
```

```javascript
{
    keywords: ['nome fazione'],
    filters: {
        requiresAny: ['capo', 'leader', 'regole', 'simbolo', 'divisa', 'rango', 'gerarchia']
    },
    priority: 8,
    category: 'organization_hierarchy',
    personality: ', aware of the hierarchy of [Nome Fazione]',
    scenario: ' [Organization Hierarchy] Leader: [hook NPC/FAM]. Ranks: [ranghi]. Symbol/uniform: [simbolo]. Golden rule: [regola].'
}
```

### Bestiary

Use `Complex_Lorebook_Template`.

```javascript
{
    keywords: ['nome creatura', 'soprannome mostro'],
    priority: 8,
    category: 'bestiary',
    personality: ', aware of the threat represented by [Nome Creatura]',
    scenario: ' [Bestiary] [Nome Creatura]: [tipo]. Habitat: [LOC]. Appearance: [tratti]. Danger: [pericolosità]. Weakness: [punti deboli].'
}
```

### Family Core and Dynamics

Use `Complex_Lorebook_Template` for static lineage lore. Use `Advanced_Faction_Management_Template` for active dynasties with persistent state, diplomacy, resources, population, heirs, projects, or timeline events.

```javascript
{
    keywords: ['nome dinastia', 'cognome 1', 'cognome 2'],
    priority: 10,
    category: 'family_core',
    personality: ', familiar with the Douglas-Bloodmoon lineage',
    scenario: ' [Family Core] [Nome Dinastia]. Status: [status]. Key members: [leader/erede]. Domain: [dominio]. Recurring traits: [tratti].'
}
```

```javascript
{
    keywords: ['nome dinastia'],
    filters: {
        requiresAny: ['nemici', 'alleati', 'storia', 'segreto', 'politica', 'guerra']
    },
    priority: 9,
    category: 'family_dynamics',
    personality: ', aware of the political dynamics of [Nome Dinastia]',
    scenario: ' [Family Dynamics] Enemies: [hook faction]. Allies: [hook]. House secret: [segreto]. Public reputation: [reputazione].'
}
```

### NPC Categories and Record

Use `Context_Aware_Multiple_Character_Template`.

```javascript
CATEGORIES: {
    personality: { budget: 800, priority: 10.0, includeInGlobal: true, limitByGlobal: true },
    appearance:   { budget: 500, priority: 9.0, includeInGlobal: true, limitByGlobal: true },
    relationships:{ budget: 600, priority: 8.5, includeInGlobal: true, limitByGlobal: true },
    combat:       { budget: 500, priority: 8.0, includeInGlobal: true, limitByGlobal: true },
    psyche:       { budget: 500, priority: 7.5, includeInGlobal: true, limitByGlobal: true },
    sampleDialog: { budget: 700, priority: 7.0, includeInGlobal: true, limitByGlobal: true }
}
```

```javascript
{
    id: 'jasper_douglas_bloodmoon',
    displayName: 'Jasper Douglas-Bloodmoon',
    names: ['jasper', 'jasper douglas-bloodmoon', 'lord douglas', 'bloodmoon heir'],
    importance: 10.0,

    personality: {
        full: '...',
        limited: '...',
        summary: '...'
    },
    appearance: {
        full: '...',
        limited: '...',
        summary: '...'
    },
    relationships: {
        full: '...',
        limited: '...',
        summary: '...'
    },
    combat: {
        full: '...',
        limited: '...',
        summary: '...'
    },
    psyche: {
        full: '...',
        limited: '...',
        summary: '...'
    }
}
```

