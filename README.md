# JanitorAI Script Templates

A collection of Script templates for JanitorAI's enhanced lorebook system. Each template addresses a different use case. Pick the one that fits your scenario, or combine ideas from several.

## Official Project Rules for JanitorAI Script Development

This section is the mandatory project standard for all JanitorAI Scripts, lorebook domains, runtime utilities, and supporting components developed in this repository. It is derived from `template/janitorai_scripts.md` and from the official documentation for every template in this folder.

### 0. Authority and Scope

- `template/janitorai_scripts.md` is the primary source for platform behavior, runtime constraints, `context` API usage, persistence mechanics, and standard Script patterns.
- `README.md` is the official and mandatory reference for creating every script template in this project.
- Every template README in this folder is an official specification for its template family and must be followed when developing, adapting, or reviewing that family.
- No external pattern, personal convention, or undocumented shortcut may override these rules unless it is explicitly documented in one of the official files listed here.

### 1. Mandatory Source Documentation

Every JanitorAI component must be designed and reviewed against the applicable source documentation:

- `template/janitorai_scripts.md`
- `Adaptive_Lorebook_Template_README.md`
- `Advanced_Faction_Management_Template_README.md`
- `Anti_Omniscience_Investigation_Template_README.md`
- `Complex_Lorebook_Template_README.md`
- `Context_Aware_Multiple_Character_Template_README.md`
- `Context_Control_Awareness_Template_README.md`
- `Context_Control_Combined_README.md`
- `Context_Control_Template_README.md`
- `Hidden_Persistent_Memory_Template_README.md`
- `Multiple_Character_Template_README.md`
- `Persistent_Flags_Lorebook_Template_README.md`
- `Persistent_Flags_Template_Plan.md`
- `Progressive_Sentence_Lorebook_Template_README.md`
- `PropertyExploration_README.md`
- `TimeDelay_Script_Template_README.md`

### 2. Official MacroCosmo / MicroCosmo Architecture

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
- NPC records may reference family data but must not redefine it.
- MacroCosmo and MicroCosmo domains are strictly keyword-triggered.
- Only one minimal always-on world atmosphere voice is allowed.
- Every lorebook voice must include source attribution from `database/` and a Canon Layer tag.
- Do not use `Multiple_Character_Template.js` as the core NPC system when `Context_Aware_Multiple_Character_Template.js` is available.
- Do not use `PropertyExploration.js` as a lore system; it is only for debug/API inspection.
- Do not use `TimeDelay_Script_Template.js` as the general lore base; reserve it for investigation or timeline scenarios.

### 3. Runtime Model

- JanitorAI Scripts are middleware embedded in character cards as special lorebook entries.
- Scripts execute once per AI response generation.
- Scripts are stateless between executions.
- Scripts cannot rely on module imports, filesystem access, network access, browser APIs, timers, promises, or async execution.
- Persistent state must be encoded into the AI output and parsed back on the next execution.
- Persistence mechanisms may be visible, such as `**FLAGS:** XX:XX:XX`, or invisible, such as zero-width Unicode state.
- Persistence depends on LLM obedience; every state mechanism must include clear reproduction instructions for the AI.

### 4. Context API Rules

Every Script must use `context` as the sole interface to JanitorAI.

#### Required Context Guards

Every Script must guard against missing or undefined context before reading or writing:

```javascript
context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario = context.character.scenario || "";
```

#### Read-Only Properties

Scripts may read chat and character state through `context`, including:

- `context.chat.last_message`
- `context.chat.message_count`
- `context.chat.last_messages`
- `context.chat.user_name`
- `context.chat.conversation_id`
- `context.chat.message_created_at`
- `context.character.name`
- `context.character.description`
- `context.character.first_message`

#### Writeable Properties

Only these fields are passed back to the LLM:

- `context.character.personality`
- `context.character.scenario`
- `context.character.example_dialogs`

All other modified properties are ignored by the model.

#### Append-Only Rule

`personality`, `scenario`, and `example_dialogs` are append-only by default.

- Use `+=` for normal additions.
- Do not use direct assignment unless a template explicitly requires replacing the scenario for a controlled management mode.
- Personality additions must begin with `, `.
- Scenario additions must begin with a leading space.
- Example dialogs must use valid `<START>` formatting when adding dialog examples.

### 5. JavaScript Standards

#### SvartulfrVerse Runtime Constraint

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

#### Restricted Features

The following are prohibited unless a template explicitly documents a safe equivalent:

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

### 6. File and Naming Conventions

#### Script Files

Script files must use PascalCase with a descriptive template or domain name and the suffix `_Template.js` when the file is a reusable template:

```text
Complex_Lorebook_Template.js
Adaptive_Lorebook_Template.js
Advanced_Faction_Management_Template.js
Context_Control_Template.js
```

Scenario-specific generated scripts must use MacroCosmo or MicroCosmo domain prefixes:

```text
MacroCosmo: WRD_LosAngeles2024.js, LOR_LosAngeles2024.js, LOC_LosAngeles2024.js, ORG_LosAngeles2024.js, BST_LosAngeles2024.js
MicroCosmo: FAM_DouglasBloodmoon.js, NPC_JasperDouglasBloodmoon.js
```

Use only the domain prefixes listed above for new SvartulfrVerse architecture work.

#### Documentation Files

Every script template must have a matching README when it is intended as reusable documentation:

```text
<Template_Name>_README.md
```

#### Internal Names

- Configuration constants: `UPPER_SNAKE_CASE`
- Feature toggles: `UPPER_SNAKE_CASE`
- Category IDs: `UPPER_SNAKE_CASE`, `snake_case`, or fixed string IDs
- Helper functions: `camelCase`
- Data table names: `UPPER_SNAKE_CASE`
- Lore entry IDs: `snake_case`
- Category labels: `snake_case` or `camelCase` when required by the template schema
- Character names in injected personality text must include the character's name to avoid LLM confusion.

### 7. Template Structure Standard

Reusable templates must be organized into clear sections:

1. Header and purpose
2. Feature toggles
3. Configuration constants
4. State schema or data tables
5. Context guards
6. Context access helpers
7. Parsing helpers
8. State extraction and validation
9. Activation or command logic
10. Output assembly
11. Injection into `context.character.personality`, `context.character.scenario`, and optionally `context.character.example_dialogs`
12. Debug output block
13. Safe removal notes when applicable

### 8. Lore Entry Structure

Standard lore entries must include:

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

#### Field Rules

- `keywords` must include common variations and phrases, not only single generic words.
- `priority` must use the official scale.
- `minMessages` and `maxMessages` must be used to control activation windows.
- `filters` must be used when activation depends on required or excluded terms.
- `probability` must be between `0` and `1`.
- `triggers` must be used for cascading activation when documented by the template.

### 9. Priority Scale

Use the official priority scale:

- `11`: Critical world elements, main character, central location, final reveal
- `9-10`: Important factions, key NPCs, major systems
- `6-8`: Standard lore entries, supporting characters, major locations
- `0-5`: Flavor text, minor details, random encounters

### 10. Keyword Design

- Prefer specific phrases over common words.
- Include variations a user and the AI may both say.
- Avoid overly generic keywords that activate accidentally.
- Use boundary-safe matching for single words when needed.
- Use stem matching for related word forms when appropriate.
- Use filters to prevent unwanted combinations.
- Do not rely only on the last AI message when user intent is the trigger; use `context.chat.last_message` unless the template explicitly requires broader context.

### 11. Token Management

- Individual Script additions should normally stay below 600 characters.
- Use adaptive detail levels when a template can be activated in multiple context sizes.
- Use `estimateTokens(text) => Math.ceil(text.length / 4)` for approximate token budgeting.
- Sort or allocate by priority/importance so critical content remains available first.
- When Context Control is present, scripts should parse `[CONTEXT BUDGET: ...]` and adapt output to `per_script`.
- If Context Control is absent, scripts must fall back to a conservative default, normally `160` tokens per script for Tier 1 with 5 lorebooks.

### 12. State Persistence Standards

#### Visible Flags

Visible flag scripts must:

- Use a consistent visible format such as `**FLAGS:** XX:XX:XX`.
- Preserve flag positions.
- Validate flag values.
- Provide anti-cheat behavior.
- Support save-system use cases when continuity across sessions or scenarios is required.

#### Zero-Width State

Zero-width scripts must:

- Use unique header/footer markers per script to avoid collisions.
- Encode only decimal digits or other documented state payloads.
- Include clear reproduction instructions for the LLM.
- Scan recent messages backward with a documented `SEARCH_DEPTH`.
- Fall back to a safe default state when no state is found.
- Provide `DEBUG_MODE` to inspect decoded state.

#### Stat Parsing

Scripts that parse stats from AI output must:

- Require a consistent character-card status block.
- Use regex patterns that match the documented format, e.g. `**StatName:** 50%`.
- Document the exact required format in the template README.
- Validate parsed values before applying thresholds.

### 13. Template-Specific Requirements

#### Adaptive Lorebook

Every Adaptive Lorebook implementation must include:

- Full, summary, and bullet versions for each entry.
- Importance values for priority tiebreaking.
- Mention counting for relevance.
- Token budget reduction from full to summary to bullet.
- Priority preservation for the most important entries.

#### Progressive Sentence Lorebook

Every Progressive Sentence implementation must include:

- Ordered sentence arrays.
- Priority tiers: HIGH, MEDIUM, LOW.
- History scope: CURRENT_USER_ONLY, CURRENT_EXCHANGE, HISTORICAL.
- Tier budgets and optional dynamic redistribution.
- Round-robin sentence allocation within tiers.
- Sentences ordered from core identity to optional nuance.

#### Complex Lorebook

Every Complex Lorebook implementation must support the documented core systems when applicable:

- Cascading activation
- Timeline events
- Stat-based reactions
- Priority ordering
- Conditional filtering, including `requiresAny` and `requiresAll`
- `minMessages` and `maxMessages` activation windows
- Debug mode

#### TimeDelay Script

Every TimeDelay implementation must include:

- Message count thresholds
- Hour-based timeline progression
- Canon count tracking
- `[CANON]:` formatting for canonical information
- Drop-in/drop-out witnesses and locations when applicable
- Hidden clue conditions
- Conditional events
- Character-card requirements for `**Canon Count:**` and `**Hour:**`

#### Persistent Flags

Every Persistent Flags implementation must include:

- Hex flag string format
- Position preservation
- Flag definitions with `hexValue`, `id`, `description`, `personality`, `scenario`, `keywords`, and `flagChangeInstruction`
- Anti-cheat mode: `OOC_WARNING`, `COMICAL`, or `SEVERE`
- Save system support when continuity is required
- Debug mode for current state, expected count, and valid values

#### Hidden Persistent Memory

Every Hidden Persistent Memory implementation must include:

- Zero-width encoding
- Modular components
- Unique header/footer markers
- Default state per component
- Feature toggles for each component
- Token management
- Debug mode
- Clear character-card reproduction instructions

Supported components must follow the documented category model:

- Weather
- Location with scene shift detection
- Emotion bitmask
- Inventory bitfield
- Schedule/day counter
- Character presence

#### Anti-Omniscience Investigation

Every Anti-Omniscience implementation must include:

- Flag-gated content
- Anti-omniscience behavioral instructions
- No meta-labels or foreshadowing for locked information
- Locked clues that cannot be revealed before the required state
- Clear flag update instructions for the LLM

#### Multiple Character

Every Multiple Character implementation must include:

- Character mention detection
- Drop-in/drop-out context
- Character-specific personality and scenario text
- Character names in injected personality statements
- Optional arrival/departure or scene presence logic

#### Context Aware Multiple Character

Every Context Aware Multiple Character implementation must include:

- Multi-character mention detection
- Adaptive detail levels
- Category-aware token budgets
- Progressive sentence categories when applicable
- Balanced coverage for multiple active characters
- Category configuration for `identity`, `appearance`, `relationships`, `personality`, `psyche`, `advancedPsychology`, `backstory`, `dialogue`, `combat`, `capabilities`, `sampleDialog`, `residence`, `intimacy`, and `notes`
- NPC records with `id`, `displayName`, `names`, `importance`, `source`, `canonLayer`, and per-category `full`, `limited`, and `summary` payloads

#### Advanced Faction Management

Every Advanced Faction Management implementation must include:

- Zero-width state persistence
- Normal roleplay mode
- `/faction` management mode
- Project system
- Diplomacy system
- Resource system
- Population tracking
- Stat keyword detection
- Day-based timeline events
- Lore activation engine
- `/showstats` and `/hidestats`
- Safe component removal notes
- Critical sections that must never be deleted

#### Context Control

Every Context Control implementation must include:

- `/maxtokens` command
- `/budget` command
- Five context tiers
- `[Lorebook Count: N]` handling
- Per-script budget calculation
- `[CONTEXT BUDGET: tier=... context=... total=... scripts=... per_script=...]` injection
- Zero-width state persistence with unique header/footer markers

#### Context Control Awareness

Every Context Control Awareness implementation must include:

- Budget block parsing
- Zero-width fallback when available
- Conservative default budget fallback
- Detail level selection: full, summary, bullet
- Priority-based degradation
- Clear integration instructions for other scripts

#### PropertyExploration

Every PropertyExploration or debug utility must:

- Log available `context` properties and types.
- Document which properties are visible via stringify.
- Document which properties are undefined.
- Remember that only `example_dialogs`, `personality`, and `scenario` are sent back to the model.

### 14. Character Card Integration Rules

Scripts that depend on AI output must document exact character-card requirements.

#### Stat-Based Scripts

The character card must include:

- Stat definitions
- Rules for when stats change
- Exact output format for the status block
- Threshold behavior

#### Persistent State Scripts

The character card must include:

- Instructions to reproduce the hidden state or visible flag string
- Instructions not to describe or modify hidden state markers
- Instructions to preserve the same number of positions or fields
- Instructions for save/copy/paste continuity when applicable

#### Management Mode Scripts

The character card must include:

- Command entry point
- Command exit point
- Display rules
- Rules for treating displayed state as authoritative

### 15. Development Workflow

#### Step 1: Template Selection

Choose the template based on the use case. For Lorebook_MacroCosmo / Lorebook_MicroCosmo systems, use the recommended stack from section [2](#2-official-macrocosmo--microcosmo-architecture).

- Context budget management: Context Control + Context Control Awareness
- Worldbuilding-heavy dynamic lore: Complex Lorebook
- Token-constrained lore: Adaptive Lorebook
- NPC activation with adaptive categories: Context Aware Multiple Character
- Living families, dynasties, diplomacy, resources, and timeline state: Advanced Faction Management
- Fine-grained sentence control: Progressive Sentence
- Discrete visible/copyable narrative state: Persistent Flags
- Modular invisible state: Hidden Persistent Memory
- Secrets, mysteries, and spoiler prevention: Anti-Omniscience Investigation
- Investigation pacing or timeline disclosure: TimeDelay
- Basic group roleplay fallback: Multiple Character
- Debugging context API: PropertyExploration

Do not use Multiple Character, PropertyExploration, TimeDelay, or monolithic Hidden Persistent Memory as the core architecture when the recommended stack is available.

#### Standard Lorebook MacroCosmo / MicroCosmo Schema

When a request asks to build, migrate, audit, or update a `Lorebook_MacroCosmo` / `Lorebook_MicroCosmo` system, use the following mapping unless the user explicitly asks for a narrower or different scope.

##### Context Control

- [`Context_Control_Template.js`](template/Context_Control_Template.js)
- [`Context_Control_Awareness_Template.js`](template/Context_Control_Awareness_Template.js)

Purpose:

- Divide context budget across active scripts.
- Inject `[CONTEXT BUDGET: ...]`.
- Let downstream scripts parse the budget and adapt output to `per_script`.
- Degrade detail as `full → summary → bullet` when budget is constrained.

##### MacroCosmo Mapping

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

###### World

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

###### Lore

Use `Complex_Lorebook_Template`.

Use:

- `minMessages` for ancient events or spoilers.
- `filters.requiresAny` for contexts such as war, history, and politics.
- `triggers` to activate linked lore.

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

###### Locations

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

###### Organizations

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

###### Bestiary

Use `Complex_Lorebook_Template`.

Activation:

- Direct creature name or nickname via `keywords`.
- Environmental activation via `filters.requiresAny`.

```javascript
{
    keywords: ['nome creatura', 'soprannome mostro'],
    priority: 8,
    category: 'bestiary',
    personality: ', aware of the threat represented by [Nome Creatura]',
    scenario: ' [Bestiary] [Nome Creatura]: [tipo]. Habitat: [LOC]. Appearance: [tratti]. Danger: [pericolosità]. Weakness: [punti deboli].'
}
```

##### MicroCosmo Mapping

MicroCosmo covers actors, relationships, and living state.

###### Families

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

###### NPCs

Use `Context_Aware_Multiple_Character_Template`.

This template is required for modular NPC records with adaptive categories mapped from the character model into token-aware payloads. It handles character mention detection, sorting by mentions plus importance, adaptive detail degradation, global budget consumption, and active NPC relationship context.

Recommended category configuration:

```javascript
CATEGORIES: {
    identity:           { budget: 450, priority: 10.0, includeInGlobal: true, limitByGlobal: true },
    appearance:         { budget: 500, priority: 9.5,  includeInGlobal: true, limitByGlobal: true },
    relationships:      { budget: 650, priority: 9.0,  includeInGlobal: true, limitByGlobal: true },
    personality:        { budget: 800, priority: 10.0, includeInGlobal: true, limitByGlobal: true },
    psyche:             { budget: 550, priority: 8.5,  includeInGlobal: true, limitByGlobal: true },
    advancedPsychology: { budget: 650, priority: 8.0,  includeInGlobal: true, limitByGlobal: true },
    backstory:          { budget: 500, priority: 8.0,  includeInGlobal: true, limitByGlobal: true },
    dialogue:           { budget: 650, priority: 8.0,  includeInGlobal: true, limitByGlobal: true },
    combat:             { budget: 450, priority: 7.5,  includeInGlobal: true, limitByGlobal: true },
    capabilities:       { budget: 400, priority: 7.0,  includeInGlobal: true, limitByGlobal: true },
    sampleDialog:       { budget: 600, priority: 7.0,  includeInGlobal: true, limitByGlobal: true },
    residence:          { budget: 250, priority: 6.5,  includeInGlobal: true, limitByGlobal: true },
    intimacy:           { budget: 350, priority: 5.5,  includeInGlobal: true, limitByGlobal: true },
    notes:              { budget: 350, priority: 5.0,  includeInGlobal: true, limitByGlobal: true }
}
```

Recommended NPC structure:

```javascript
{
    id: 'jasper_douglas_bloodmoon',
    displayName: 'Jasper Douglas-Bloodmoon',
    names: ['jasper', 'jasper douglas-bloodmoon', 'lord douglas', 'bloodmoon heir'],
    importance: 10.0,
    source: 'database/characters/jasper_douglas_bloodmoon.md',
    canonLayer: 'ACTIVE',

    identity: {
        full: 'Full name, aliases, species (default human), nationality, ethnicity, age/life stage, occupation, alignment, and title hooks.',
        limited: 'Name, aliases, role, species baseline, age/life stage, and alignment.',
        summary: 'Jasper Douglas-Bloodmoon, Bloodmoon heir and active family authority NPC.'
    },
    appearance: {
        full: 'Overall look and vibe, body proportions, face features, eyes, hair, scars/marks, modifications, scent, clothing style, casual/formal/combat/sleep/surveillance gear.',
        limited: 'Core visual presentation, dominant style, and scene-relevant physical markers.',
        summary: 'Sharp noble presentation with restrained formal style and controlled body language.'
    },
    relationships: {
        full: 'Overview, family links, allies/enemies, love languages, attachment style, reputation, and {{user}} relationship with an in-character opinion line.',
        limited: 'Key family ties, active allies/enemies, reputation, and current {{user}} dynamic.',
        summary: 'Family-aligned, reputation-sensitive, and cautious toward outsiders.'
    },
    personality: {
        full: 'Traits, archetype, tags, typing, social battery, risk approach, strengths, flaws, likes, and dislikes.',
        limited: 'Core traits, flaws, strengths, and social/risk posture.',
        summary: 'Controlled, strategic, and reputation-aware.'
    },
    psyche: {
        full: 'Insecurities, physical behavior, opinion, internal conflict, self-perception, triggers, coping, routine, and sleep habits.',
        limited: 'Primary insecurities, triggers, coping, and stress behavior.',
        summary: 'Stress converts fear of exposure into guarded escalation.'
    },
    advancedPsychology: {
        full: 'Trait chains, flaw chains, contextual stress/positive/comfort responses; keep nesting to max 3 levels to avoid logic breakdown.',
        limited: 'Primary trait chain, primary flaw chain, and one stress response pattern.',
        summary: 'Duty causes control; fear of exposure causes guarded escalation.'
    },
    backstory: {
        full: 'Early life, recent events, education, secrets, regrets, and cultural/non-human notes only when canon-approved.',
        limited: 'Early-life anchor, recent inciting events, and one active secret/regret.',
        summary: 'Raised under family doctrine; recent events force political visibility.'
    },
    dialogue: {
        full: 'Voice, speech style, accent, languages, and examples for greeting, surprise, stress, memory, and opinion.',
        limited: 'Voice, speech style, and one active dialogue example.',
        summary: 'Measured, formal, low-volume speech with precise wording.'
    },
    combat: {
        full: 'Combat style, training, weapons/gear, injury tolerance, tactical limits, and scene-relevant threat posture.',
        limited: 'Primary combat style, weapons/gear, and threat posture.',
        summary: 'Close-quarters defense with controlled escalation.'
    },
    capabilities: {
        full: 'Senses/vitals, dietary quirks, addictions/vices, digital presence, non-combat skills, magic/cyber augmentations, and weaknesses.',
        limited: 'Primary senses, non-combat skills, digital presence, and main weaknesses.',
        summary: 'Political negotiation, sensory awareness, and controlled social leverage.'
    },
    residence: {
        full: 'Current residence, living space state, private anchors, and scene-use notes.',
        limited: 'Current residence and one scene-use anchor.',
        summary: 'Operates from controlled family-adjacent spaces.'
    },
    intimacy: {
        full: 'Orientation, boundaries, hard limits, aftercare, and preferences; include only when required by the card and never as always-on context.',
        limited: 'Boundaries, hard limits, and aftercare only if scene-relevant.',
        summary: 'Requires explicit consent, trust, and privacy before intimacy.'
    },
    notes: {
        full: 'Other facts, meta notes, scenario, avatar, hidden spoilers, and canon gates.',
        limited: 'Only active scene notes or canon-gated spoilers needed now.',
        summary: 'Keep locked canon hidden until required flags open it.'
    },
    sampleDialog: {
        full: 'Valid <START> examples showing name, voice, behavior, and relationship stance.',
        limited: 'One compact <START> example for the current scene.',
        summary: '<START>\nUser: "You knew?"\nJasper: "I knew enough to be afraid of the rest."'
    }
}
```

##### Optional State / Spoiler Modules

Use only when needed:

- [`Persistent_Flags_Lorebook_Template.js`](template/Persistent_Flags_Lorebook_Template.js) for discrete visible/copyable narrative states such as quest flags, unlocked secrets, frozen relationships, recognized inheritance, exile/reinstatement, and active/broken alliances.
- [`Hidden_Persistent_Memory_Template.js`](template/Hidden_Persistent_Memory_Template.js) only when modularized for invisible state such as weather, current location, character presence, inventory, day, or emotions.
- [`Anti_Omniscience_Investigation_Template.js`](template/Anti_Omniscience_Investigation_Template.js) for secrets, house mysteries, historical or family clues, Cultural Canon not yet revealed, and Candidate/Deferred canon not yet active.
- [`TimeDelay_Script_Template.js`](template/TimeDelay_Script_Template.js) only for investigations or timeline pacing; it is less preferred than Anti-Omniscience when avoiding meta-labels and foreshadowing is critical.

This schema is optimized for complete coverage, token economy, adaptive detail, context budgeting, and separation between world lore, active characters, and persistent faction state.

#### Step 2: Data Design

Define:

- State schema
- Data tables
- Keywords
- Priority/importance values
- Filters
- Commands
- Persistence format
- Character-card instructions

#### Step 3: Implementation

Implement in this order:

1. Guards
2. Configuration
3. Data tables
4. Parsing helpers
5. State extraction
6. Activation logic
7. Output assembly
8. Context injection
9. Debug output
10. Documentation

#### Step 4: Testing

Test with:

- Empty context
- Undefined properties
- Last message only
- Recent message window
- Multiple simultaneous triggers
- Conflicting filters
- Token budget limits
- State missing
- Invalid state
- Debug mode enabled
- Debug mode disabled

#### Step 5: Review

Review against:

- `template/janitorai_scripts.md`
- The matching template README
- This README
- The full list of official documentation files when integrating shared systems

### 16. Acceptance Criteria

A JanitorAI Script component is not complete until all applicable criteria are met.

#### Mandatory Criteria

- The Script has context guards.
- The Script only modifies `personality`, `scenario`, and `example_dialogs` for LLM-visible effects.
- The Script does not use restricted platform features.
- The Script documents any required character-card instructions.
- The Script includes debug support or a clear reason why debug support is not applicable.
- The Script handles missing state safely.
- The Script uses specific keywords and avoids accidental activation.
- The Script respects token budget when it can be measured.
- The Script uses append-only additions unless a template explicitly requires replacement.
- The Script uses unique persistence markers when using zero-width state.
- The Script validates state before applying it.
- The Script has been checked against all relevant official README files.

#### Template-Specific Criteria

Each template must also satisfy the specific requirements listed in section 13.

### 17. Review Procedure

Every new or modified template must pass the following review before being considered official.

#### Self-Review

- Confirm file name and README name.
- Confirm all context properties are guarded.
- Confirm no restricted features are used.
- Confirm append-only behavior.
- Confirm state persistence mechanism is documented.
- Confirm keywords, filters, priority, and token behavior.
- Confirm debug mode behavior.
- Confirm character-card instructions.

#### Documentation Review

- Confirm the README has an overview.
- Confirm the README has a quick start.
- Confirm the README explains how the template works.
- Confirm the README documents configuration.
- Confirm the README documents data structures.
- Confirm the README documents character-card setup.
- Confirm the README documents troubleshooting.
- Confirm the README documents safe removal when components can be removed.

#### Integration Review

- Confirm compatibility with Context Control when token-aware.
- Confirm compatibility with zero-width scripts when persistent state is used.
- Confirm no marker collision with existing scripts.
- Confirm no dependency on execution order unless explicitly documented.
- Confirm no reliance on unsupported cross-script variable sharing.

#### Acceptance Review

- Confirm the component satisfies this README.
- Confirm the component satisfies `template/janitorai_scripts.md`.
- Confirm the component satisfies the matching template README.
- Confirm the component satisfies all other official documentation it integrates.
- Confirm all tests pass or are documented as unavailable.

### 18. Safe Removal Rules

When a template supports optional components, removal must be documented.

- Prefer feature toggles before deleting code.
- If code is deleted, document exactly what to remove.
- Never delete core context access, parsing, state extraction, helper functions, or injection logic unless the template explicitly says it is safe.
- Always keep unique persistence markers consistent.
- Always update the README after removing or disabling a component.

### 19. Debugging Standards

- Use `DEBUG_MODE` for optional diagnostic output.
- Use bracketed debug prefixes such as `[DEBUG: ...]`.
- Use the JanitorAI debug panel and `console.log()` for troubleshooting.
- Debug output must not be required in normal production use.
- Debug output must not leak hidden state unless the user intentionally enables debugging.

### 20. Output Formatting

Injected content must be short, atomic, and consistent.

Use bracketed prefixes for scenario context: `[World Event]`, `[World Reaction]`, `[Critical Alert]`, `[CANON]`, `[Faction Event]`, `[Location Core]`, `[Location Interior]`, `[Organization Core]`, `[Organization Hierarchy]`, `[Family Core]`, `[Family Dynamics]`, `[NPC Core]`.
- Use imperative language for AI instructions.
- Keep appended strings short.
- Avoid redundant additions across executions.
- Prevent duplicate injections when state does not change.
- Do not introduce spoilers before their gate conditions are met.

### 21. Compatibility Matrix

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

## Templates

### [Complex Lorebook](Complex_Lorebook_Template.js) | [README](Complex_Lorebook_Template_README.md) | [JanitorAI Link](https://janitorai.com/characters/addf68e5-4809-4c15-b81e-06e5cbc9ac93_character-complex-lorebook-template)

Full-featured dynamic lorebook with cascading activation, timeline events, stat-based reactions, priority ordering, and smart filtering. Best for worldbuilding-heavy scenarios with many lore entries that need to interact with each other.

### [Adaptive Lorebook](Adaptive_Lorebook_Template.js) | [README](Adaptive_Lorebook_Template_README.md)| [JanitorAI Link](https://janitorai.com/characters/1411c045-6bc2-434e-b8f6-42998e8c74fc_character-token-count-conscious-lorebook-template)

Token-aware lorebook that automatically scales detail between full, summary, and bullet versions based on mention frequency and token budget. Best for scenarios with lots of lore entries where context window space is the primary concern.

### [Progressive Sentence](Progressive_Sentence_Lorebook_Template.js) | [README](Progressive_Sentence_Lorebook_Template_README.md)| [JanitorAI Link](https://janitorai.com/characters/97aeaa58-0a42-49ce-94e9-fd1df396ff18_character-token-count-aware-variant-lorebook-template)

Sentence-level context builder with priority tiers, configurable history scope per subject, and round-robin allocation within tier budgets. Best when you need fine-grained control over exactly which sentences appear and in what order.

### [TimeDelay Script](TimeDelay_Script_Template.js) | [README](TimeDelay_Script_Template_README.md)| [JanitorAI Link](https://janitorai.com/characters/6387ad41-7000-4734-bc66-e57abdf41b27_character-time-delay-script-template-investigations-delayed-clues-etc)

Progressive disclosure through message count thresholds, hour-based timeline progression, canon count tracking, hidden clue embedding, and conditional story branching. Use only for investigation scenarios with time-based pacing; it is not the recommended general lore base.

### [Persistent Memory Flags](Persistent_Flags_Lorebook_Template.js) | [README](Persistent_Flags_Lorebook_Template_README.md) | [JanitorAI Link](https://janitorai.com/characters/e10c6c40-e665-44fe-99c8-e0f1e98abefb_character-persistent-memory-script-template)

Hex-based flag string system for tracking discrete story states across sessions. Includes anti-cheat validation, save system support for cross-character continuity, and dynamic instruction generation. Best for scenarios that need state tracking without continuous numerical values.

### [Hidden Persistent Memory](Hidden_Persistent_Memory_Template.js) | [README](Hidden_Persistent_Memory_Template_README.md) | [JanitorAI Link](https://janitorai.com/characters/34ce8756-6ab5-4870-9f75-0ae91045041a_character-hidden-persistent-memory-lorebook-template)

Zero-width unicode character encoding for invisible state persistence between Script instances. Tracks weather, location (with scene shift detection), emotional state (16-bit bitmask), inventory (bitfield), schedule/day counter, and character presence. Each component is independently toggleable. Use only in modular form; do not load the full template as the monolithic main system.

### [Anti-Omniscience Investigation](Anti_Omniscience_Investigation_Template.js) | [README](Anti_Omniscience_Investigation_Template_README.md)|[ JanitorAI Link](https://janitorai.com/characters/6b680acf-165e-4584-b9be-ce05badcc2ba_character-anti-omniscience-investigation-lorebook-template)

Flag-gated content system that prevents LLM omniscience by locking information behind hex flag requirements, injecting explicit anti-omniscience behavioral instructions, and eliminating meta-labels and foreshadowing. Best for mystery and investigation scenarios where spoilers ruin the experience.

### [Multiple Character](Multiple_Character_Template.js)| [README](Multiple_Character_Template_README.md) | [JanitorAI Link](https://janitorai.com/characters/596dc3a1-6b62-4774-98db-6d3e9c05d7e2_character-multiple-character-drop-in-drop-out-lorebook-template)

Drop-in/drop-out character management that dynamically includes or excludes character context based on who is mentioned in recent messages. Useful for basic group scenarios, but superseded by Context Aware Multiple Character for core NPC systems that need adaptive budgets and category-aware degradation.

### [Context Aware Multiple Character](Context_Aware_Multiple_Character_Template.js)| [README](Context_Aware_Multiple_Character_Template_README.md) | [JanitorAI Link](https://janitorai.com/characters/ccff2be4-8cad-4b03-a9de-8ea7d5d58f73_character-context-aware-multiple-character-lorebook-template)

Combines drop-in/drop-out character management with adaptive detail levels. Each character category (personality, appearance, relationships, combat, psyche, sample dialog) scales between full, limited, and summary versions based on per-category token budgets. Includes support for progressive sentence categories with round-robin allocation. Best for scenarios with multiple characters where context window space needs careful management.

## [General Debug Reference](PropertyExploration.js) | [README](PropertyExploration_README.md) | [JanitorAI Link](https://janitorai.com/characters/7d0fda82-058a-4dfc-830c-9e8998d633a6_character-general-debug-lorebook-template)

Utility script that logs available properties on the `context` object. Use only for debugging and API discovery; it is not a lore system.

## Copy Directly on JanitorAI

All templates are available on my JanitorAI profile, ready to copy into your own Scripts.


[@Tydorius](https://janitorai.com/profiles/0f618e4a-4d83-49da-969b-aba188761259_profile-of-tydorius)

## Support

If these templates are useful to you, consider buying me a coffee:
[https://ko-fi.com/tydorius](https://ko-fi.com/tydorius)
