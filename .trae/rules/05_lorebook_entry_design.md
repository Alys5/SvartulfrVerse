# 05. Lorebook Entry Design

This module defines standard lore entry structure, priority scale, and keyword design.

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

## Field Rules

- `keywords` must include common variations and phrases, not only single generic words.
- `priority` must use the official scale.
- `minMessages` and `maxMessages` control activation windows.
- `filters` must be used when activation depends on required or excluded terms.
- `probability` must be between `0` and `1`.
- `triggers` must be used for cascading activation when documented by the template.

## Priority Scale

Use the official priority scale:

- `11`: critical world elements, main character, central location, final reveal
- `9-10`: important factions, key NPCs, major systems
- `6-8`: standard lore entries, supporting characters, major locations
- `0-5`: flavor text, minor details, random encounters

## Keyword Design

- Prefer specific phrases over common words.
- Include variations a user and the AI may both say.
- Avoid overly generic keywords that activate accidentally.
- Use boundary-safe matching for single words when needed.
- Use stem matching for related word forms when appropriate.
- Use filters to prevent unwanted combinations.
- Do not rely only on the last AI message when user intent is the trigger; use `context.chat.last_message` unless the template explicitly requires broader context.
