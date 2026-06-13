# SvartulfrVerse Workspace Rules

These rules are the project-specific working contract for this repository. They distill `README.md`, the official JanitorAI script documentation, and the SvartulfrVerse project constraints into instructions for future work in this workspace.

## 1. Authority and Scope

### 1.1 Authoritative Sources

Every JanitorAI component must be designed and reviewed against the applicable source documentation:

- `README.md`
- `template/janitorai_scripts.md`
- `template/Adaptive_Lorebook_Template_README.md`
- `template/Advanced_Faction_Management_Template_README.md`
- `template/Anti_Omniscience_Investigation_Template_README.md`
- `template/Complex_Lorebook_Template_README.md`
- `template/Context_Aware_Multiple_Character_Template_README.md`
- `template/Context_Control_Awareness_Template_README.md`
- `template/Context_Control_Template_README.md`
- `template/Hidden_Persistent_Memory_Template_README.md`
- `template/Multiple_Character_Template_README.md`
- `template/Persistent_Flags_Lorebook_Template_README.md`
- `template/Progressive_Sentence_Lorebook_Template_README.md`
- `template/TimeDelay_Script_Template_README.md`
- `template/PropertyExploration_README.md`

No external shortcut, personal convention, or undocumented pattern may override these rules unless explicitly approved.

### 1.2 Project Baseline

- Setting: contemporary 2024 baseline.
- Default ontology: human-only baseline.
- Supernatural elements are treated as `Cultural Canon` unless explicitly promoted by canon governance.
- Canon layers are governed by ADR-006:
  - `Active`
  - `Historical`
  - `Cultural`
  - `Deferred`
  - `Candidate`

### 1.3 MacroCosmo / MicroCosmo Architecture

All new SvartulfrVerse JanitorAI systems must be organized by the MacroCosmo / MicroCosmo activation model, not by older layer labels.

#### Recommended Template Stack

Use this stack as the default architecture for Lorebook_MacroCosmo / Lorebook_MicroCosmo systems unless the user explicitly asks for a narrower or different scope.

| Area | Template | Purpose |
|---|---|---|
| Global budget | [`Context_Control_Template.js`](template/Context_Control_Template.js) | Master budget: divides context across scripts and injects `[CONTEXT BUDGET: ...]`. |
| Budget consumer | [`Context_Control_Awareness_Template.js`](template/Context_Control_Awareness_Template.js) | Lets other scripts read the available budget and degrade `full → summary → bullet`. |
| MacroCosmo | [`Complex_Lorebook_Template.js`](template/Complex_Lorebook_Template.js) | Handles priority, ANY/ALL filters, cascading triggers, `minMessages`, categories, and dynamic reactions. |
| Token economy | [`Adaptive_Lorebook_Template.js`](template/Adaptive_Lorebook_Template.js) | Provides full / summary / bullet degradation based on mentions, importance, and budget. |
| MicroCosmo NPC | [`Context_Aware_Multiple_Character_Template.js`](template/Context_Aware_Multiple_Character_Template.js) | Adaptive NPC activation with category budgets for personality, appearance, dialog, relationships, combat, and psyche. |
| Families / dynamic factions | [`Advanced_Faction_Management_Template.js`](template/Advanced_Faction_Management_Template.js) | Persistent invisible state, diplomacy, resources, population, timeline events, and faction lore engine. |

#### Final Architecture Levels

1. **Level 1 — Context Control**
   - [`Context_Control_Template.js`](template/Context_Control_Template.js)
   - [`Context_Control_Awareness_Template.js`](template/Context_Control_Awareness_Template.js)
   - Objective: prevent MacroCosmo, MicroCosmo, families, and NPCs from competing for the same context budget.

2. **Level 2 — MacroCosmo**
   - [`Complex_Lorebook_Template.js`](template/Complex_Lorebook_Template.js)
   - [`Adaptive_Lorebook_Template.js`](template/Adaptive_Lorebook_Template.js)
   - Use `Complex` for logic, priority, filters, and cascade behavior.
   - Use `Adaptive` for full / summary / bullet degradation based on mentions and budget.

3. **Level 3 — MicroCosmo**
   - [`Context_Aware_Multiple_Character_Template.js`](template/Context_Aware_Multiple_Character_Template.js) for NPCs.
   - [`Advanced_Faction_Management_Template.js`](template/Advanced_Faction_Management_Template.js) for living families, dynasties, diplomacy, resources, and timeline state.

4. **Level 4 — State and Spoiler Control**
   - [`Persistent_Flags_Lorebook_Template.js`](template/Persistent_Flags_Lorebook_Template.js) for discrete visible/copyable narrative states.
   - [`Hidden_Persistent_Memory_Template.js`](template/Hidden_Persistent_Memory_Template.js) only as modular invisible state, never as the monolithic main system.
   - [`Anti_Omniscience_Investigation_Template.js`](template/Anti_Omniscience_Investigation_Template.js) for secrets, mysteries, and revelation control.

#### Domain Prefix Map

MacroCosmo domains:

| Domain | Prefix | Scope |
|---|---|---|
| World | `WRD:` | Core physical, cosmological, and rule-system facts |
| Lore | `LOR:` | Events, artifacts, ancient history, and present-day consequences |
| Locations | `LOC:` | Regions, cities, interiors, and points of interest |
| Organizations | `ORG:` | Factions, guilds, institutions, and hierarchy |
| Bestiary | `BST:` | Creatures, monsters, threats, habitats, and weaknesses |

MicroCosmo domains:

| Domain | Prefix | Scope |
|---|---|---|
| Families | `FAM:` | Dynasties, bloodlines, genealogy hooks, politics, reputation, and house secrets |
| NPCs | `NPC:` | Individual identity, visual presentation, relationships, combat, psyche, and active scene presence |

#### Governance Rules

- Genealogy is owned by the Family Authority.
- NPC and Character records may reference family data but must not redefine it.
- MacroCosmo and MicroCosmo domains are strictly keyword-triggered.
- Only one minimal always-on world atmosphere voice is allowed.
- Every lorebook voice must include source attribution from `database/` and a Canon Layer tag.
- Do not use `Multiple_Character_Template.js` as the core NPC system when `Context_Aware_Multiple_Character_Template.js` is available.
- Do not use `PropertyExploration.js` as a lore system; it is only for debug/API inspection.
- Do not use `TimeDelay_Script_Template.js` as the general lore base; reserve it for investigation or timeline scenarios.

## 2. JanitorAI Runtime Rules

### 2.1 Runtime Model

JanitorAI Scripts are middleware embedded in character cards as special lorebook entries.

They:

- execute once per AI response generation;
- are stateless between executions;
- cannot rely on module imports, filesystem access, network access, browser APIs, timers, promises, or async execution;
- must persist state by encoding it into AI output and parsing it back on the next execution.

Persistent state may be:

- visible, e.g. `**FLAGS:** XX:XX:XX`;
- invisible, e.g. zero-width Unicode state;
- stat-based, if the character card outputs a stable status block.

Persistence depends on LLM obedience. Every state mechanism must include clear reproduction instructions for the AI.

### 2.2 Context API

Every script must use `context` as the sole interface to JanitorAI.

Required context guards:

```javascript
context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario = context.character.scenario || "";
```

Read-only properties may be read, including:

- `context.chat.last_message`
- `context.chat.message_count`
- `context.chat.last_messages`
- `context.chat.user_name`
- `context.chat.conversation_id`
- `context.chat.message_created_at`
- `context.character.name`
- `context.character.description`
- `context.character.first_message`

Writable properties passed back to the model are only:

- `context.character.personality`
- `context.character.scenario`
- `context.character.example_dialogs`

All other modified properties are ignored by the model.

### 2.3 Append-Only Rule

By default, personality, scenario, and example dialogs are append-only.

- Use `+=` for normal additions.
- Do not assign directly unless a template explicitly requires controlled replacement.
- Personality additions must begin with `, `.
- Scenario additions must begin with a leading space.
- Example dialogs must use valid `<START>` formatting when adding dialog examples.

## 3. JavaScript Standards

### 3.1 SvartulfrVerse Runtime Constraint

For this workspace, JanitorAI runtime code must be ES5-compatible and conservative.

Use:

```javascript
var
```

Avoid unless an official template explicitly requires otherwise:

```javascript
let
const
=>
template literals
class
async
await
```

Do not use restricted features:

- `import`
- `export`
- `require`
- `async`
- `await`
- `Promise`
- `setTimeout`
- `setInterval`
- `requestAnimationFrame`
- `fetch`
- `XMLHttpRequest`
- `WebSocket`
- `document`
- `window`
- `navigator`
- `localStorage`
- `sessionStorage`
- `IndexedDB`
- `fs`
- `readFile`
- `eval`
- `new Function`

### 3.2 Naming

- Script files: PascalCase with descriptive name and `_Template.js` suffix when reusable.
- Scenario-specific scripts must use MacroCosmo or MicroCosmo domain prefixes:
  - MacroCosmo: `WRD_LosAngeles2024.js`, `LOR_LosAngeles2024.js`, `LOC_LosAngeles2024.js`, `ORG_LosAngeles2024.js`, `BST_LosAngeles2024.js`
  - MicroCosmo: `FAM_DouglasBloodmoon.js`, `NPC_JasperDouglasBloodmoon.js`
  - Runtime integration: `Context_Control_*.js`, `Context_Control_Awareness_*.js`, `Context_Aware_Multiple_Character_*.js`, `Advanced_Faction_Management_*.js`
- Configuration constants: `UPPER_SNAKE_CASE`
- Feature toggles: `UPPER_SNAKE_CASE`
- Category IDs: `UPPER_SNAKE_CASE` or fixed string IDs
- Helper functions: `camelCase`
- Data table names: `UPPER_SNAKE_CASE`
- Lore entry IDs: `snake_case`
- Category labels: `snake_case`
- Character names in injected personality text must include the character's name to avoid LLM confusion.

## 4. Lore Entry Structure

Standard lore entries should use this shape unless a template defines a stricter schema:

```javascript
{
    keywords: ['word1', 'phrase2'],
    priority: 10,
    minMessages: 0,
    maxMessages: Infinity,
    category: 'unique_id',
    personality: ', additional trait',
    scenario: ' Additional context.',
    triggers: ['related_word'],
    probability: 0.7,
    filters: {
        requiresAny: ['word1', 'word2'],
        requiresAll: ['word1', 'word2'],
        notWith: ['exclusion']
    }
}
```

Rules:

- `keywords` must include common variations and phrases, not only single generic words.
- `priority` must use the official scale.
- `minMessages` and `maxMessages` control activation windows.
- `filters` must be used when activation depends on required or excluded terms.
- `probability` must be between `0` and `1`.
- `triggers` must be used for cascading activation when documented by the template.

## 5. Priority Scale

Use the official priority scale:

- `11`: critical world elements, main character, central location, final reveal
- `9-10`: important factions, key NPCs, major systems
- `6-8`: standard lore entries, supporting characters, major locations
- `0-5`: flavor text, minor details, random encounters

## 6. Keyword Design

- Prefer specific phrases over common words.
- Include variations a user and the AI may both say.
- Avoid overly generic keywords that activate accidentally.
- Use boundary-safe matching for single words when needed.
- Use stem matching for related word forms when appropriate.
- Use filters to prevent unwanted combinations.
- Do not rely only on the last AI message when user intent is the trigger; use `context.chat.last_message` unless the template explicitly requires broader context.

## 7. Token Management

- Individual script additions should normally stay below 600 characters unless the template explicitly supports larger blocks.
- Use adaptive detail levels when a template can activate in multiple context sizes.
- Use `estimateTokens(text) => Math.ceil(text.length / 4)` for approximate token budgeting.
- Sort or allocate by priority/importance so critical content remains available first.
- When Context Control is present, scripts should parse `[CONTEXT BUDGET: ...]` and adapt output to `per_script`.
- If Context Control is absent, fall back to a conservative default, normally `160` tokens per script for Tier 1 with 5 lorebooks.

## 8. State Persistence Standards

### 8.1 Visible Flags

Visible flag scripts must:

- use a consistent visible format such as `**FLAGS:** XX:XX:XX`;
- preserve flag positions;
- validate flag values;
- provide anti-cheat behavior;
- support save-system use cases when continuity across sessions or scenarios is required.

### 8.2 Zero-Width State

Zero-width scripts must:

- use unique header/footer markers per script to avoid collisions;
- encode only documented state payloads;
- include clear reproduction instructions for the LLM;
- scan recent messages backward with a documented `SEARCH_DEPTH`;
- fall back to a safe default state when no state is found;
- provide `DEBUG_MODE` to inspect decoded state.

### 8.3 Stat Parsing

Scripts that parse stats from AI output must:

- require a consistent character-card status block;
- use regex patterns that match the documented format, e.g. `**StatName:** 50%`;
- validate parsed values before applying thresholds.

## 9. Character Card Integration Rules

Scripts that depend on AI output must document exact character-card requirements.

### 9.1 Stat-Based Scripts

The character card must include:

- stat definitions;
- rules for when stats change;
- exact output format for the status block;
- threshold behavior.

### 9.2 Persistent State Scripts

The character card must include:

- instructions to reproduce the hidden state or visible flag string;
- instructions not to describe or modify hidden state markers;
- instructions to preserve the same number of positions or fields;
- save/copy/paste continuity instructions when applicable.

### 9.3 Management Mode Scripts

The character card must include:

- command entry point;
- command exit point;
- display rules;
- rules for treating displayed state as authoritative.

## 10. Template Selection

Choose the template based on the use case. For Lorebook_MacroCosmo / Lorebook_MicroCosmo systems, use the recommended stack in sections [1.3](#13-macrocosmo--microcosmo-architecture) and [11](#11-standard-lorebook-macrocosmo--microcosmo-schema).

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

## 11. Standard Lorebook MacroCosmo / MicroCosmo Schema

When a request asks to build, migrate, audit, or update a `Lorebook_MacroCosmo` / `Lorebook_MicroCosmo` system, use the following mapping unless the user explicitly asks for a narrower or different scope.

### 11.1 Context Control

- [`Context_Control_Template.js`](template/Context_Control_Template.js)
- [`Context_Control_Awareness_Template.js`](template/Context_Control_Awareness_Template.js)

Purpose:

- divide context budget across active scripts;
- inject `[CONTEXT BUDGET: ...]`;
- let downstream scripts parse the budget and adapt output to `per_script`;
- degrade detail as `full → summary → bullet` when budget is constrained.

### 11.2 MacroCosmo Mapping

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

#### World

Use `Complex_Lorebook_Template`.

Example structure:

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

#### Lore

Use `Complex_Lorebook_Template`.

Use:

- `minMessages` for ancient events or spoilers;
- `filters.requiresAny` for contexts such as war, history, and politics;
- `triggers` to activate linked lore.

Example structure:

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

#### Locations

Use `Complex_Lorebook_Template` for the core entry and a second entry for internal structures.

Core entry:

```javascript
{
    keywords: ['nome luogo', 'capitale del luogo'],
    priority: 9,
    category: 'location_core',
    personality: ', familiar with [Nome Luogo]',
    scenario: ' [Location Core] [Nome Luogo] is a [regione/città]. Biome/climate: [clima]. Government: [governo]. Atmosphere: [atmosfera].'
}
```

Interior/detail entry:

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

#### Organizations

Use `Complex_Lorebook_Template` for Core and Hierarchy.

Core entry:

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

Hierarchy entry:

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

#### Bestiary

Use `Complex_Lorebook_Template`.

Activation:

- direct creature name or nickname via `keywords`;
- environmental activation via `filters.requiresAny`.

Example structure:

```javascript
{
    keywords: ['nome creatura', 'soprannome mostro'],
    priority: 8,
    category: 'bestiary',
    personality: ', aware of the threat represented by [Nome Creatura]',
    scenario: ' [Bestiary] [Nome Creatura]: [tipo]. Habitat: [LOC]. Appearance: [tratti]. Danger: [pericolosità]. Weakness: [punti deboli].'
}
```

### 11.3 MicroCosmo Mapping

MicroCosmo covers actors, relationships, and living state.

#### Families

Use `Complex_Lorebook_Template` for static lineage lore.

Use `Advanced_Faction_Management_Template` when the family or faction is politically/economically/militarily active and needs persistent state, diplomacy, resources, population, heirs, projects, or timeline events.

Static family core example:

```javascript
{
    keywords: ['nome dinastia', 'cognome 1', 'cognome 2'],
    priority: 10,
    category: 'family_core',
    personality: ', familiar with the Douglas-Bloodmoon lineage',
    scenario: ' [Family Core] [Nome Dinastia]. Status: [status]. Key members: [leader/erede]. Domain: [dominio]. Recurring traits: [tratti].'
}
```

Dynamic family entry:

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

#### NPCs

Use `Context_Aware_Multiple_Character_Template`.

This template is required for modular NPC records with Core, Visual, Relationships, Combat, Psyche, and sample dialog categories. It handles character mention detection, sorting by mentions plus importance, adaptive detail degradation, global budget consumption, and active NPC relationship context.

Recommended category configuration:

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

Recommended NPC structure:

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

### 11.4 Optional State / Spoiler Modules

Use only when needed:

- [`Persistent_Flags_Lorebook_Template.js`](template/Persistent_Flags_Lorebook_Template.js) for discrete visible/copyable narrative states such as quest flags, unlocked secrets, frozen relationships, recognized inheritance, exile/reinstatement, and active/broken alliances.
- [`Hidden_Persistent_Memory_Template.js`](template/Hidden_Persistent_Memory_Template.js) only when modularized for invisible state such as weather, current location, character presence, inventory, day, or emotions.
- [`Anti_Omniscience_Investigation_Template.js`](template/Anti_Omniscience_Investigation_Template.js) for secrets, house mysteries, historical or family clues, Cultural Canon not yet revealed, and Candidate/Deferred canon not yet active.
- [`TimeDelay_Script_Template.js`](template/TimeDelay_Script_Template.js) only for investigations or timeline pacing; it is less preferred than Anti-Omniscience when avoiding meta-labels and foreshadowing is critical.

This schema is optimized for complete coverage, token economy, adaptive detail, context budgeting, and separation between world lore, active characters, and persistent faction state.

## 12. Template-Specific Requirements

### 12.1 Adaptive Lorebook

Must include:

- full, summary, and bullet versions for each entry;
- importance values for priority tiebreaking;
- mention counting for relevance;
- token budget reduction from full to summary to bullet;
- priority preservation for the most important entries.

### 12.2 Progressive Sentence Lorebook

Must include:

- ordered sentence arrays;
- priority tiers: `HIGH`, `MEDIUM`, `LOW`;
- history scope: `CURRENT_USER_ONLY`, `CURRENT_EXCHANGE`, `HISTORICAL`;
- tier budgets and optional dynamic redistribution;
- round-robin sentence allocation within tiers;
- sentences ordered from core identity to optional nuance.

### 12.3 Complex Lorebook

Must support when applicable:

- cascading activation;
- timeline events;
- stat-based reactions;
- priority ordering;
- conditional filtering, including `requiresAny` and `requiresAll`;
- `minMessages` and `maxMessages` activation windows;
- debug mode.

### 12.4 TimeDelay Script

Must include when used:

- message count thresholds;
- hour-based timeline progression;
- canon count tracking;
- `[CANON]:` formatting for canonical information;
- drop-in/drop-out witnesses and locations when applicable;
- hidden clue conditions;
- conditional events;
- character-card requirements for `**Canon Count:**` and `**Hour:**`.

### 12.5 Persistent Flags

Must include:

- hex flag string format;
- position preservation;
- flag definitions with `hexValue`, `id`, `description`, `personality`, `scenario`, `keywords`, and `flagChangeInstruction`;
- anti-cheat mode: `OOC_WARNING`, `COMICAL`, or `SEVERE`;
- save system support when continuity is required;
- debug mode for current state, expected count, and valid values.

### 12.6 Hidden Persistent Memory

Must include:

- zero-width encoding;
- modular components;
- unique header/footer markers;
- default state per component;
- feature toggles for each component;
- token management;
- debug mode;
- clear character-card reproduction instructions.

Supported components:

- weather;
- location with scene shift detection;
- emotion bitmask;
- inventory bitfield;
- schedule/day counter;
- character presence.

### 12.7 Anti-Omniscience Investigation

Must include:

- flag-gated content;
- anti-omniscience behavioral instructions;
- no meta-labels or foreshadowing for locked information;
- locked clues that cannot be revealed before the required state;
- clear flag update instructions for the LLM.

### 12.8 Multiple Character

Must include:

- character mention detection;
- drop-in/drop-out context;
- character-specific personality and scenario text;
- character names in injected personality statements;
- optional arrival/departure or scene presence logic.

### 12.9 Context Aware Multiple Character

Must include:

- multi-character mention detection;
- adaptive detail levels;
- category-aware token budgets;
- progressive sentence categories when applicable;
- balanced coverage for multiple active characters;
- category configuration for `personality`, `appearance`, `relationships`, `combat`, `psyche`, and `sampleDialog`;
- NPC records with `id`, `displayName`, `names`, `importance`, and per-category `full`, `limited`, and `summary` payloads.

### 12.10 Advanced Faction Management

Must include:

- zero-width state persistence;
- normal roleplay mode;
- `/faction` management mode;
- project system;
- diplomacy system;
- resource system;
- population tracking;
- stat keyword detection;
- day-based timeline events;
- lore activation engine;
- `/showstats` and `/hidestats`;
- safe component removal notes;
- critical sections that must never be deleted.

### 12.11 Context Control

Must include:

- `/maxtokens` command;
- `/budget` command;
- five context tiers;
- `[Lorebook Count: N]` handling;
- per-script budget calculation;
- `[CONTEXT BUDGET: tier=... context=... total=... scripts=... per_script=...]` injection;
- zero-width state persistence with unique header/footer markers.

### 12.12 Context Control Awareness

Must include:

- budget block parsing;
- zero-width fallback when available;
- conservative default budget fallback;
- detail level selection: full, summary, bullet;
- priority-based degradation;
- clear integration instructions for other scripts.

### 12.13 PropertyExploration

Every debug utility must:

- log available `context` properties and types;
- document which properties are visible via stringify;
- document which properties are undefined;
- remember that only `example_dialogs`, `personality`, and `scenario` are sent back to the model.

## 13. Development Workflow

### 13.1 Step 1 — Template Selection

Select the template stack before editing code.

For MacroCosmo / MicroCosmo, use the default schema in section 11.

### 13.2 Step 2 — Data Design

Define:

- state schema;
- data tables;
- keywords;
- priority/importance values;
- filters;
- commands;
- persistence format;
- character-card instructions.

### 13.3 Step 3 — Implementation Order

Implement in this order:

1. guards;
2. configuration;
3. data tables;
4. parsing helpers;
5. state extraction;
6. activation logic;
7. output assembly;
8. context injection;
9. debug output;
10. documentation.

### 13.4 Step 4 — Testing

Test with:

- empty context;
- undefined properties;
- last message only;
- recent message window;
- multiple simultaneous triggers;
- conflicting filters;
- token budget limits;
- state missing;
- invalid state;
- debug mode enabled;
- debug mode disabled.

### 13.5 Step 5 — Review

Review against:

- `README.md`;
- `template/janitorai_scripts.md`;
- the matching template README;
- all other official documentation the component integrates.

## 14. Acceptance Criteria

A JanitorAI Script component is not complete until all applicable criteria are met.

### 14.1 Mandatory Criteria

- The script has context guards.
- The script only modifies `personality`, `scenario`, and `example_dialogs` for LLM-visible effects.
- The script does not use restricted platform features.
- The script documents any required character-card instructions.
- The script includes debug support or a clear reason why debug support is not applicable.
- The script handles missing state safely.
- The script uses specific keywords and avoids accidental activation.
- The script respects token budget when it can be measured.
- The script uses append-only additions unless a template explicitly requires replacement.
- The script uses unique persistence markers when using zero-width state.
- The script validates state before applying it.
- The script has been checked against all relevant official README files.

### 14.2 Template-Specific Criteria

Each template must also satisfy the specific requirements listed in section 12.

## 15. Review Procedure

### 15.1 Self-Review

Confirm:

- file name and README name;
- all context properties are guarded;
- no restricted features are used;
- append-only behavior;
- state persistence mechanism is documented;
- keywords, filters, priority, and token behavior;
- debug mode behavior;
- character-card instructions.

### 15.2 Documentation Review

Confirm the README has:

- overview;
- quick start;
- how it works;
- configuration;
- data structures;
- character-card setup;
- troubleshooting;
- safe removal when components can be removed.

### 15.3 Integration Review

Confirm:

- compatibility with Context Control when token-aware;
- compatibility with zero-width scripts when persistent state is used;
- no marker collision with existing scripts;
- no dependency on execution order unless explicitly documented;
- no reliance on unsupported cross-script variable sharing.

### 15.4 Acceptance Review

Confirm the component satisfies:

- `README.md`;
- `template/janitorai_scripts.md`;
- the matching template README;
- all other official documentation it integrates.

## 16. Safe Removal Rules

When a template supports optional components, removal must be documented.

- Prefer feature toggles before deleting code.
- If code is deleted, document exactly what to remove.
- Never delete core context access, parsing, state extraction, helper functions, or injection logic unless the template explicitly says it is safe.
- Always keep unique persistence markers consistent.
- Always update the README after removing or disabling components.

## 17. Debugging Standards

- Use `DEBUG_MODE` for optional diagnostic output.
- Use bracketed debug prefixes such as `[DEBUG: ...]`.
- Use the JanitorAI debug panel and `console.log()` for troubleshooting.
- Debug output must not be required in normal production use.
- Debug output must not leak hidden state unless the user intentionally enables debugging.

## 18. Output Formatting

Injected content must be short, atomic, and consistent.

Use bracketed prefixes for scenario context:

- `[World Event]`
- `[World Reaction]`
- `[Critical Alert]`
- `[CANON]`
- `[Faction Event]`
- `[Location Core]`
- `[Location Interior]`
- `[Organization Core]`
- `[Organization Hierarchy]`
- `[Family Core]`
- `[Family Dynamics]`
- `[NPC Core]`

Use imperative language for AI instructions.

Avoid:

- redundant additions across executions;
- duplicate injections when state does not change;
- spoilers before gate conditions are met;
- large unbounded scenario additions.

## 19. Lorebook Voice Rules

Every lorebook voice must include:

- source attribution from `database/`;
- Canon Layer tag, e.g. `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`;
- stable title prefix:
  - `WRD:` for world core
  - `LOR:` for lore/events/artifacts
  - `LOC:` for locations
  - `ORG:` for organizations
  - `BST:` for bestiary
  - `FAM:` for families/dynasties
  - `NPC:` for NPCs

## 20. Token Economy Rules

- MacroCosmo and MicroCosmo domains are strictly keyword-triggered.
- Only one minimal always-on world atmosphere voice is allowed.
- Core world rules must be high-signal and low-word-count.
- NPC and faction data must degrade by relevance, not remain fully active.
- Prefer multiple targeted entries over one large omnibus entry.

## 21. Repository Hygiene

- Do not create files unless they are necessary for the requested goal.
- Prefer editing existing files over creating new files.
- Never create documentation files unless explicitly requested.
- Never commit changes unless explicitly asked.
- Never run destructive git commands unless explicitly asked.
- `database_old/` is a read-only historical archive, isolated via `.gitignore`, and must never be referenced by export scripts.

## 22. Compatibility Matrix

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
