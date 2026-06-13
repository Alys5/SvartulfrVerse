---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 03. JanitorAI Runtime and Context API

This module defines runtime behavior, persistence mechanics, and `context` API usage.

## Runtime Model

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

## Context API

Every script must use `context` as the sole interface to JanitorAI.

### Required Context Guards

Every script must guard against missing or undefined context before reading or writing:

```javascript
context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario = context.character.scenario || "";
```

### Read-Only Properties

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

### Writable Properties

Only these fields are passed back to the model:

- `context.character.personality`
- `context.character.scenario`
- `context.character.example_dialogs`

All other modified properties are ignored by the model.

## Append-Only Rule

By default, personality, scenario, and example dialogs are append-only.

- Use `+=` for normal additions.
- Do not assign directly unless a template explicitly requires controlled replacement.
- Personality additions must begin with `, `.
- Scenario additions must begin with a leading space.
- Example dialogs must use valid `<START>` formatting when adding dialog examples.
