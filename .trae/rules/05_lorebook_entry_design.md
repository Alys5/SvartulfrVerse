---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 05. Lorebook Entry Design

This module defines standard lore entry structure, prefix canon, priority scale, and keyword design.

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

- `source` from `database/...`;
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
[ACTIVE] LOC Source: database/world/example_location_core.md. Compact facts here.
```

Use the correct Canon Layer and prefix:

```text
[HISTORICAL] LOR Source: database/world/example_event_0x01.md. Historical event facts here.
[CULTURAL] ORG Source: database/world/example_faction_0x01.md. Cultural faction facts here.
[DEFERRED] SEC Source: database/scenario/example_secret_0x01.md. Locked clue facts here.
[CANDIDATE] CAN Source: database/scenario/example_unlock_0x01.md. Candidate canon facts here.
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
