# JanitorAI Script Templates

A collection of Script templates for JanitorAI's enhanced lorebook system. Each template addresses a different use case. Pick the one that fits your scenario, or combine ideas from several.

## Official Project Rules for JanitorAI Script Development

This section is the mandatory project standard for all JanitorAI Scripts, lorebooks, engines, and supporting components developed in this repository. It is derived from `janitorai_scripts.md` and from the official documentation for every template in this folder.

### 0. Authority and Scope

- `janitorai_scripts.md` is the primary source for platform behavior, runtime constraints, `context` API usage, persistence mechanics, and standard Script patterns.
- `README.md` is the official and mandatory reference for creating every script template in this project.
- Every template README in this folder is an official specification for its template family and must be followed when developing, adapting, or reviewing that family.
- No external pattern, personal convention, or undocumented shortcut may override these rules unless it is explicitly documented in one of the official files listed here.

### 1. Mandatory Source Documentation

Every JanitorAI component must be designed and reviewed against the applicable source documentation:

- `janitorai_scripts.md`
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

### 2. Runtime Model

- JanitorAI Scripts are middleware embedded in character cards as special lorebook entries.
- Scripts execute once per AI response generation.
- Scripts are stateless between executions.
- Scripts cannot rely on module imports, filesystem access, network access, browser APIs, timers, promises, or async execution.
- Persistent state must be encoded into the AI output and parsed back on the next execution.
- Persistence mechanisms may be visible, such as `**FLAGS:** XX:XX:XX`, or invisible, such as zero-width Unicode state.
- Persistence depends on LLM obedience; every state mechanism must include clear reproduction instructions for the AI.

### 3. Context API Rules

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

### 4. JavaScript Standards

- Scripts run in JanitorAI's sandboxed JavaScript environment.
- ES6+ is supported.
- If a Script uses heavy iteration, complex logic, or large data tables, it must begin with:

```javascript
"use worker";
```

#### Allowed Features

The following are allowed and documented by `janitorai_scripts.md`:

- `const`, `let`, `var`
- Template literals
- Destructuring
- `for...of`
- String methods: `toLowerCase`, `toUpperCase`, `trim`, `indexOf`, `includes`, `startsWith`, `endsWith`, `match`, `replace`, `replaceAll`, `search`, `split`, `slice`, `substring`, `substr`, `padStart`, `padEnd`, `repeat`
- Array methods: `forEach`, `map`, `filter`, `reduce`, `reduceRight`, `some`, `every`, `find`, `findIndex`, `includes`, `indexOf`, `lastIndexOf`, `push`, `pop`, `shift`, `unshift`, `splice`, `slice`, `concat`, `join`, `sort`, `reverse`, `flat`, `flatMap`
- Object methods: `Object.keys`, `Object.values`, `Object.entries`, `Object.fromEntries`, `Object.assign`, `Object.create`, `Object.hasOwnProperty`
- Arrow functions, default parameters, rest parameters
- `Math`, `parseInt`, `parseFloat`, `Number`, `isNaN`, `isFinite`
- Full regular expression support
- `JSON.stringify`, `JSON.parse`, `typeof`, `instanceof`
- `try/catch/finally`
- Unicode and zero-width characters
- `console.log()` for debugging

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

Classes are not prohibited but are discouraged. Prefer object literals, constructor functions, and plain helper functions.

### 5. File and Naming Conventions

#### Script Files

Script files must use PascalCase with a descriptive template or domain name and the suffix `_Template.js` when the file is a reusable template:

```text
Complex_Lorebook_Template.js
Adaptive_Lorebook_Template.js
Advanced_Faction_Management_Template.js
Context_Control_Template.js
```

Scenario-specific generated scripts may use a domain prefix:

```text
Lorebook_LosAngeles2024.js
W_LosAngeles2024.js
En_Core_LosAngeles2024.js
```

#### Documentation Files

Every script template must have a matching README when it is intended as reusable documentation:

```text
<Template_Name>_README.md
```

#### Internal Names

- Configuration constants: `UPPER_SNAKE_CASE`
- Feature toggles: `UPPER_SNAKE_CASE`
- Category IDs: `UPPER_SNAKE_CASE` or fixed string IDs
- Helper functions: `camelCase`
- Data table names: `UPPER_SNAKE_CASE`
- Lore entry IDs: `snake_case`
- Category labels: `snake_case`
- Character names in injected personality text must include the character's name to avoid LLM confusion.

### 6. Template Structure Standard

Reusable templates must be organized into clear sections:

1. Header and purpose
2. `"use worker"` directive when required
3. Feature toggles
4. Configuration constants
5. State schema or data tables
6. Context guards
7. Context access helpers
8. Parsing helpers
9. State extraction and validation
10. Activation or command logic
11. Output assembly
12. Injection into `context.character.personality`, `context.character.scenario`, and optionally `context.character.example_dialogs`
13. Debug output block
14. Safe removal notes when applicable

### 7. Lore Entry Structure

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

### 8. Priority Scale

Use the official priority scale:

- `11`: Critical world elements, main character, central location, final reveal
- `9-10`: Important factions, key NPCs, major systems
- `6-8`: Standard lore entries, supporting characters, major locations
- `0-5`: Flavor text, minor details, random encounters

### 9. Keyword Design

- Prefer specific phrases over common words.
- Include variations a user and the AI may both say.
- Avoid overly generic keywords that activate accidentally.
- Use boundary-safe matching for single words when needed.
- Use stem matching for related word forms when appropriate.
- Use filters to prevent unwanted combinations.
- Do not rely only on the last AI message when user intent is the trigger; use `context.chat.last_message` unless the template explicitly requires broader context.

### 10. Token Management

- Individual Script additions should normally stay below 600 characters.
- Use adaptive detail levels when a template can be activated in multiple context sizes.
- Use `estimateTokens(text) => Math.ceil(text.length / 4)` for approximate token budgeting.
- Sort or allocate by priority/importance so critical content remains available first.
- When Context Control is present, scripts should parse `[CONTEXT BUDGET: ...]` and adapt output to `per_script`.
- If Context Control is absent, scripts must fall back to a conservative default, normally `160` tokens per script for Tier 1 with 5 lorebooks.

### 11. State Persistence Standards

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

### 12. Template-Specific Requirements

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
- Conditional filtering
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

### 13. Character Card Integration Rules

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

### 14. Development Workflow

#### Step 1: Template Selection

Choose the template based on the use case:

- Worldbuilding-heavy dynamic lore: Complex Lorebook
- Token-constrained lore: Adaptive Lorebook
- Fine-grained sentence control: Progressive Sentence
- Investigation pacing: TimeDelay
- Discrete state: Persistent Flags
- Invisible state: Hidden Persistent Memory
- Mystery spoiler control: Anti-Omniscience Investigation
- Group roleplay: Multiple Character or Context Aware Multiple Character
- Faction governance: Advanced Faction Management
- Context budget management: Context Control + Context Control Awareness
- Debugging context API: PropertyExploration

#### Standard Lorebook MacroCosmo / MicroCosmo Schema

When a request asks to build, migrate, audit, or update a `Lorebook_MacroCosmo` / `Lorebook_MicroCosmo` system, use this stack as the default architecture unless the user explicitly asks for a narrower or different scope:

1. **Context Control**
   - [`Context_Control_Template.js`](template/Context_Control_Template.js)
   - [`Context_Control_Awareness_Template.js`](template/Context_Control_Awareness_Template.js)

2. **MacroCosmo**
   - [`Complex_Lorebook_Template.js`](template/Complex_Lorebook_Template.js) for priority, filters, cascading triggers, categories, and dynamic reactions.
   - [`Adaptive_Lorebook_Template.js`](template/Adaptive_Lorebook_Template.js) for token-aware full / summary / bullet detail degradation.

3. **MicroCosmo**
   - [`Context_Aware_Multiple_Character_Template.js`](template/Context_Aware_Multiple_Character_Template.js) for NPCs, including Core, Visual, Relationships, Combat, and Psyche categories.
   - [`Advanced_Faction_Management_Template.js`](template/Advanced_Faction_Management_Template.js) for living families/dynasties with diplomacy, resources, population, timeline events, and faction lore activation.

4. **Optional state / spoiler modules**
   - [`Anti_Omniscience_Investigation_Template.js`](template/Anti_Omniscience_Investigation_Template.js) for secrets, mysteries, locked canon, and spoiler prevention.
   - [`Persistent_Flags_Lorebook_Template.js`](template/Persistent_Flags_Lorebook_Template.js) for discrete visible/copyable narrative states.
   - [`Hidden_Persistent_Memory_Template.js`](template/Hidden_Persistent_Memory_Template.js) only when modularized, not as a monolithic default.

Default MacroCosmo mappings:

- `World` → `Complex_Lorebook_Template.js`
- `Lore` → `Complex_Lorebook_Template.js`
- `Locations` → `Complex_Lorebook_Template.js`
- `Organizations` → `Complex_Lorebook_Template.js`
- `Bestiary` → `Complex_Lorebook_Template.js`

Default MicroCosmo mappings:

- `Families` → `Complex_Lorebook_Template.js` for static lineage lore, or `Advanced_Faction_Management_Template.js` for active political/economic/military houses.
- `NPCs` → `Context_Aware_Multiple_Character_Template.js`.

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

- `janitorai_scripts.md`
- The matching template README
- This README
- The full list of official documentation files when integrating shared systems

### 15. Acceptance Criteria

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

Each template must also satisfy the specific requirements listed in section 12.

### 16. Review Procedure

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
- Confirm the component satisfies `janitorai_scripts.md`.
- Confirm the component satisfies the matching template README.
- Confirm the component satisfies all other official documentation it integrates.
- Confirm all tests pass or are documented as unavailable.

### 17. Safe Removal Rules

When a template supports optional components, removal must be documented.

- Prefer feature toggles before deleting code.
- If code is deleted, document exactly what to remove.
- Never delete core context access, parsing, state extraction, helper functions, or injection logic unless the template explicitly says it is safe.
- Always keep unique persistence markers consistent.
- Always update the README after removing or disabling a component.

### 18. Debugging Standards

- Use `DEBUG_MODE` for optional diagnostic output.
- Use bracketed debug prefixes such as `[DEBUG: ...]`.
- Use the JanitorAI debug panel and `console.log()` for troubleshooting.
- Debug output must not be required in normal production use.
- Debug output must not leak hidden state unless the user intentionally enables debugging.

### 19. Output Formatting

Injected content must be short, atomic, and consistent.

- Use bracketed prefixes for scenario context: `[World Event]`, `[World Reaction]`, `[Critical Alert]`, `[CANON]`.
- Use imperative language for AI instructions.
- Keep appended strings short.
- Avoid redundant additions across executions.
- Prevent duplicate injections when state does not change.
- Do not introduce spoilers before their gate conditions are met.

### 20. Compatibility Matrix

| Template | Primary Use | Required Integration Notes |
|---|---|---|
| Lorebook MacroCosmo / MicroCosmo Schema | Complete world + character lore architecture | Use Context Control + Awareness, Complex Lorebook, Adaptive Lorebook, Context Aware Multiple Character, and Advanced Faction Management as the default stack |
| Complex Lorebook | Dynamic lore, cascading triggers, stats, timeline | Use priority, filters, triggers, debug |
| Adaptive Lorebook | Token-aware lore | Full/summary/bullet, importance, mention counting |
| Progressive Sentence | Sentence-level control | Tiers, history scope, round-robin |
| TimeDelay | Progressive disclosure | Message/hour/canon thresholds, `[CANON]` |
| Persistent Flags | Visible discrete state | Hex flags, anti-cheat, save support |
| Hidden Persistent Memory | Invisible modular state | Zero-width, components, token management |
| Anti-Omniscience Investigation | Spoiler prevention | Flag-gated clues, no meta-labels |
| Multiple Character | Drop-in/drop-out characters | Mention detection, named personality text |
| Context Aware Multiple Character | Multi-character + token control | Adaptive detail, category budgets |
| Advanced Faction Management | Faction governance | Two-mode, zero-width, commands, projects |
| Context Control | Budget master | `/maxtokens`, `/budget`, `[Lorebook Count: N]` |
| Context Control Awareness | Budget consumer | Parse `[CONTEXT BUDGET]`, detail degradation |
| PropertyExploration | Debug reference | Log context properties and types |

## Templates

### [Complex Lorebook](Complex_Lorebook_Template.js) | [README](Complex_Lorebook_Template_README.md) | [JanitorAI Link](https://janitorai.com/characters/addf68e5-4809-4c15-b81e-06e5cbc9ac93_character-complex-lorebook-template)

Full-featured dynamic lorebook with cascading activation, timeline events, stat-based reactions, priority ordering, and smart filtering. Best for worldbuilding-heavy scenarios with many lore entries that need to interact with each other.

### [Adaptive Lorebook](Adaptive_Lorebook_Template.js) | [README](Adaptive_Lorebook_Template_README.md)| [JanitorAI Link](https://janitorai.com/characters/1411c045-6bc2-434e-b8f6-42998e8c74fc_character-token-count-conscious-lorebook-template)

Token-aware lorebook that automatically scales detail between full, summary, and bullet versions based on mention frequency and token budget. Best for scenarios with lots of lore entries where context window space is the primary concern.

### [Progressive Sentence](Progressive_Sentence_Lorebook_Template.js) | [README](Progressive_Sentence_Lorebook_Template_README.md)| [JanitorAI Link](https://janitorai.com/characters/97aeaa58-0a42-49ce-94e9-fd1df396ff18_character-token-count-aware-variant-lorebook-template)

Sentence-level context builder with priority tiers, configurable history scope per subject, and round-robin allocation within tier budgets. Best when you need fine-grained control over exactly which sentences appear and in what order.

### [TimeDelay Script](TimeDelay_Script_Template.js) | [README](TimeDelay_Script_Template_README.md)| [JanitorAI Link](https://janitorai.com/characters/6387ad41-7000-4734-bc66-e57abdf41b27_character-time-delay-script-template-investigations-delayed-clues-etc)

Progressive disclosure through message count thresholds, hour-based timeline progression, canon count tracking, hidden clue embedding, and conditional story branching. Best for investigation scenarios with time-based pacing.

### [Persistent Memory Flags](Persistent_Flags_Lorebook_Template.js) | [README](Persistent_Flags_Lorebook_Template_README.md) | [JanitorAI Link](https://janitorai.com/characters/e10c6c40-e665-44fe-99c8-e0f1e98abefb_character-persistent-memory-script-template)

Hex-based flag string system for tracking discrete story states across sessions. Includes anti-cheat validation, save system support for cross-character continuity, and dynamic instruction generation. Best for scenarios that need state tracking without continuous numerical values.

### [Hidden Persistent Memory](Hidden_Persistent_Memory_Template.js) | [README](Hidden_Persistent_Memory_Template_README.md) | [JanitorAI Link](https://janitorai.com/characters/34ce8756-6ab5-4870-9f75-0ae91045041a_character-hidden-persistent-memory-lorebook-template)

Zero-width unicode character encoding for invisible state persistence between Script instances. Tracks weather, location (with scene shift detection), emotional state (16-bit bitmask), inventory (bitfield), schedule/day counter, and character presence. Each component is independently toggleable. Best for scenarios that need persistent state tracking without visible artifacts in the chat.

### [Anti-Omniscience Investigation](Anti_Omniscience_Investigation_Template.js) | [README](Anti_Omniscience_Investigation_Template_README.md)|[ JanitorAI Link](https://janitorai.com/characters/6b680acf-165e-4584-b9be-ce05badcc2ba_character-anti-omniscience-investigation-lorebook-template)

Flag-gated content system that prevents LLM omniscience by locking information behind hex flag requirements, injecting explicit anti-omniscience behavioral instructions, and eliminating meta-labels and foreshadowing. Best for mystery and investigation scenarios where spoilers ruin the experience.

### [Multiple Character](Multiple_Character_Template.js)| [README](Multiple_Character_Template_README.md) | [JanitorAI Link](https://janitorai.com/characters/596dc3a1-6b62-4774-98db-6d3e9c05d7e2_character-multiple-character-drop-in-drop-out-lorebook-template)

Drop-in/drop-out character management that dynamically includes or excludes character context based on who is mentioned in recent messages. Best for group scenarios with several characters who take turns being active.

### [Context Aware Multiple Character](Context_Aware_Multiple_Character_Template.js)| [README](Context_Aware_Multiple_Character_Template_README.md) | [JanitorAI Link](https://janitorai.com/characters/ccff2be4-8cad-4b03-a9de-8ea7d5d58f73_character-context-aware-multiple-character-lorebook-template)

Combines drop-in/drop-out character management with adaptive detail levels. Each character category (personality, appearance, dialog) scales between full, limited, and summary versions based on per-category token budgets. Includes support for progressive sentence categories with round-robin allocation. Best for scenarios with multiple characters where context window space needs careful management.

## [General Debug Reference](PropertyExploration.js) | [README](PropertyExploration_README.md) | [JanitorAI Link](https://janitorai.com/characters/7d0fda82-058a-4dfc-830c-9e8998d633a6_character-general-debug-lorebook-template)

Utility script that logs available properties on the `context` object. Useful for debugging and discovering what the Scripts API exposes.

## Copy Directly on JanitorAI

All templates are available on my JanitorAI profile, ready to copy into your own Scripts.


[@Tydorius](https://janitorai.com/profiles/0f618e4a-4d83-49da-969b-aba188761259_profile-of-tydorius)

## Support

If these templates are useful to you, consider buying me a coffee:
[https://ko-fi.com/tydorius](https://ko-fi.com/tydorius)
