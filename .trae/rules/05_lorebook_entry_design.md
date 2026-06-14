---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, integrated World lorebook prefixes, source/canonLayer attribution, priority scale, and keyword design.'
---
# 05. Lorebook Entry Design

This module defines standard lore entry structure, prefix canon, priority scale, and keyword design.

## Level 1 Integrated World Domains

The `level 1` World lorebook is integrated MacroCosmo + MicroCosmo. Use these domain prefixes:

| Domain | Prefix | Scope |
|---|---|---|
| World | `WRD:` | Core physical, cosmological, and rule-system facts |
| Lore | `LOR:` | Events, artifacts, ancient history, and present-day consequences |
| Locations | `LOC:` | Regions, cities, interiors, and points of interest |
| Organizations | `ORG:` | Factions, guilds, institutions, and hierarchy |
| Bestiary | `BST:` | Creatures, monsters, threats, habitats, and weaknesses |
| Families | `FAM:` | Dynasties, bloodlines, genealogy hooks, politics, reputation, and house secrets |
| NPCs | `NPC:` | Individual identity, visual presentation, relationships, combat, psyche, and active scene presence |
| Secrets | `SEC:` | Locked investigation content, hidden clues, and spoiler gates |
| Canon Unlocks | `CAN:` | Investigation canon unlocked by state, time, or message thresholds |
| Relationships | `REL:` | Active relationship dynamics, emotional states, and interaction contracts |

## Standard Lore Entry Structure

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

## Required Runtime Fields

Every concrete lorebook voice must include:

- `canonLayer` as `ACTIVE`, `HISTORICAL`, `CULTURAL`, `DEFERRED`, or `CANDIDATE`;
- stable prefix in the injected title:
  - `WRD:` for world core;
  - `LOR:` for lore/events/artifacts;
  - `LOC:` for locations;
  - `ORG:` for organizations;
  - `BST:` for bestiary;
  - `FAM:` for families/dynasties;
  - `NPC:` for NPCs;
  - `SEC:` for secrets and investigation content;
  - `CAN:` for unlocked investigation canon;
  - `REL:` for active relationship dynamics.

Do not emit lorebook voices with `source:unspecified`. If a source is missing, the entry must be treated as incomplete and excluded from export.

## Field Rules

- `keywords` must include common variations and phrases, not only single generic words.
- `priority` must use the official scale.
- `minMessages` and `maxMessages` control activation windows.
- `filters` must be used when activation depends on required or excluded terms.
- `probability` must be between `0` and `1`.
- `triggers` must be used for cascading activation when documented by the template.
- `full`, `summary`, and `bullet` payloads must degrade in detail without changing core facts.
- `personality` additions must be short and behavior-linked.
- `scenario` additions must be short, scene-relevant, and append-only.

## Priority Scale

Use the official priority scale:

- `11`: critical world elements, main character, central location, final reveal
- `9-10`: important factions, key NPCs, major systems
- `6-8`: standard lore entries, supporting characters, major locations
- `0-5`: flavor text, minor details, random encounters

Do not use `priority: 12` or higher.

## Keyword Design

- Prefer specific phrases over common words.
- Include variations a user and the AI may both say.
- Avoid overly generic keywords that activate accidentally.
- Use boundary-safe matching for single words when needed.
- Use stem matching for related word forms when appropriate.
- Use filters to prevent unwanted combinations.
- Do not rely only on the last AI message when user intent is the trigger; use `context.chat.last_message` unless the template explicitly requires broader context.
- Use `requiresAny` for OR activation and `requiresAll` for AND activation.
- Use `notWith` to prevent contradictory or spoiler-breaking combinations.

## Voice Format

Concrete lorebook voices must be emitted in this format:

```text
[ACTIVE] LOC Source: Compact facts here.
```

Use the correct Canon Layer and prefix:

```text
[HISTORICAL] LOR Source: Historical event facts here.
[CULTURAL] ORG Source: Cultural faction facts here.
[DEFERRED] SEC Source: Locked clue facts here.
[CANDIDATE] CAN Source: Candidate canon facts here.
```

## Lore Categories

### Definitional Lore

Stable facts about a character, place, faction, object, or rule-system.

Use when:

- the fact should remain consistent;
- the fact clarifies identity or world rules;
- the fact does not depend on a current scene.

### Relational Lore

Facts about relationships, social pressure, trust, rivalry, family bonds, or active dynamics.

Use when:

- the fact changes how actors respond to each other;
- the relationship is relevant to the current scene;
- the fact must degrade when the involved actors are not active.

### Event Lore

Facts about an event, reveal, timeline beat, consequence, or trigger condition.

Use when:

- the fact should activate around event keywords;
- the fact has time, gate, or canon implications;
- the fact should cascade into related entries.

## World Lorebook JSON Import/Export Contract

Use this contract when exporting or importing World lorebook data as ready-to-import JanitorAI lorebook JSON:

- Canonical JSON files:
  - `1_template/01_world_lorebook/SvartulfrVerse_World_Template.lorebook.json`
  - `2_Export/World/Fantasy/SvartulfrVerse_Fantasy_lorebook.json`
  - `2_Export/World/Modern/SvartulfrVerse_Modern_lorebook.json`
  - `2_Export/World/Pirate/SvartulfrVerse_Pirate_lorebook.json`
  - `2_Export/World/SciFi/SvartulfrVerse_SciFi_lorebook.json`
  - `2_Export/World/Urban/SvartulfrVerse_Urban.json`
  - `2_Export/World/Viking/SvartulfrVerse_Viking_lorebook.json`
- Output must be a raw JSON array of objects. Do not wrap the array in an `entries` parent object.
- Every exported object must include the JanitorAI-compatible fields: `id`, `name`, `content`, `key`, `keysRaw`, `keysecondary`, `keysecondaryRaw`, `inclusionGroup`, `inclusionGroupRaw`, `tags`, `category`, `enabled`, `constant`, `minMessages`, `priority`, `insertion_order`, `probability`, `placement`, `placementPosition`, `activationMode`, `activationScript`, `case_sensitive`, `matchWholeWords`, `keyMatchPriority`, `prioritizeInclusion`, `selectiveLogic`, `comment`, `extensions`, and `groupWeight`.
- Generate a unique UUID v4 for every `id`.
- `content` must be a single optimized line that starts with the canonical Canon Layer tag and includes `Source:` plus the source path.
- Normalize non-canonical export prefixes to canonical lorebook prefixes before writing: `AST`, `EXP`, `VIS`, `RTM`, `DIA`, and `CUL` become `LOR`.
- `keysRaw` must be exactly the `key` array joined by `, `.
- `insertion_order` must equal `priority * 100`.
- Use `activationMode: "standard"`, `activationScript: ""`, `selectiveLogic: 0`, `enabled: true`, `constant: false`, `probability: 100`, and `groupWeight: 100` unless the source entry explicitly requires otherwise.
- Prefix placement mapping:
  - `NPC` → `placement: "personality"`, `placementPosition: "before"`.
  - `LOC` → `placement: "scenario"`, `placementPosition: "after"`.
  - All other prefixes → `placement: "default"`, `placementPosition: "after"`.
- Category mapping:
  - Use `general` for foundational world rules, organizations, families, relationships, secrets, canon anchors, and main characters.
  - Use `other` for specific locations, secondary NPCs, localized events, localized lore, and localized studies.
- Tags must be 1-3 values from: `character`, `location`, `item`, `lore`, `event`, `faction`, `relationship`, `world`, `secret`, `backstory`, `magic`, `technology`, `culture`, `history`, `important`.
- Validate every generated JSON file with a JSON parser before import, and verify that the root of each file is a raw array.
