---
alwaysApply: false
description: "SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, append-only rule, and Level 0 / Level 1 / Level 3 integration."
---

# 03. JanitorAI Runtime and Context API

This module defines runtime behavior, ES6-safe sandbox behavior, persistence mechanics, and `context` API usage.

## Runtime Model

JanitorAI Scripts are middleware embedded in character cards as special lorebook entries.

They:

- execute once per AI response generation;
- run after the user sends a message and before the bot reply is generated;
- are stateless between executions unless state is encoded into AI-visible output and parsed back;
- cannot rely on module imports, filesystem access, network access, browser APIs, timers, promises, or async execution;
- must persist state by encoding it into AI output and parsing it back on the next execution.

Persistent state may be:

- visible, e.g. `**FLAGS:** XX:XX:XX`;
- invisible, e.g. zero-width Unicode state;
- stat-based, if the character card outputs a stable status block;
- scenario-based, e.g. compact relationship notes appended to `context.character.scenario`.

Persistence depends on LLM obedience. Every state mechanism must include clear reproduction instructions for the AI.

## ES6-Safe Sandbox Contract

The JanitorAI Scripts Guide describes a sandbox that supports modern ES6 syntax inside script scope. SvartulfrVerse adopts ES6-safe syntax when it improves clarity and remains within the sandbox.

Allowed when sandbox-safe:

- `const` and `let`;
- arrow functions;
- template literals;
- lightweight array helpers such as `.includes()`, `.map()`, `.filter()`, and `.forEach()`;
- `Object.keys()`, `Object.values()`, and `Object.assign()`;
- destructuring and default parameters when they do not obscure runtime behavior;
- `String(value)`, `.toLowerCase()`, `.includes()`, `.trim()`, `.replace()`;
- `Math.random()`, `Math.floor()`, `Math.min()`, `Math.max()`;
- `new Date()`;
- `console.log()` for debug only.

Hard-blocked APIs and behaviors:

- `async/await`;
- `Promise`;
- `setTimeout`;
- `setInterval`;
- `fetch`;
- `XMLHttpRequest`;
- `require`;
- `import`;
- `window`;
- `document`;
- global side effects;
- redefining `context`;
- overwriting system objects;
- network, DOM, filesystem, or external runtime access.

Use modern syntax only when it keeps the script readable and bounded. Do not create heavy structures on every turn.

## Context API

Every script must use `context` as the sole interface to JanitorAI.

### Required Context Guards

Every script must guard against missing or undefined context before reading or writing:

```javascript
context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario = context.character.scenario || "";
context.character.example_dialogs = context.character.example_dialogs || "";
```

Use `const chat = context.chat || {};` or an equivalent guarded local variable before reading chat fields.

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

All other modified properties are ignored by the model and must not be used for persistence.

## Safe Keyword Matching

Use lowercase normalization and padded boundaries to reduce accidental activation:

```javascript
const last = String(
  (context.chat && context.chat.last_message) || "",
).toLowerCase();
const padded = ` ${last} `;

if (padded.indexOf(" hello ") !== -1) {
  context.character.scenario += " They greet you warmly.";
  context.character.personality += ", friendly and welcoming.";
}
```

For multiple words:

```javascript
const words = ["hi", "hey", "hello"];

for (const word of words) {
  if (padded.indexOf(` ${word} `) !== -1) {
    context.character.personality += ", warm and responsive.";
    break;
  }
}
```

Prefer readable logic over over-compression. Keep loops small and stop early with `break`.

## Append-Only Rule

By default, personality, scenario, and example dialogs are append-only.

- Use `+=` for normal additions.
- Do not assign directly unless a template explicitly requires controlled replacement.
- Personality additions must begin with `, `.
- Scenario additions must begin with a leading space.
- Example dialogs must use valid `<START>` formatting when adding dialog examples.
- Do not append duplicate state when the same condition is already present.
- Runtime additions should be short, atomic, and behavioral.

## Debugging

- `console.log()` is allowed in the sandbox debug panel.
- Debug output must not leak into the visible chat.
- Use `DEBUG_MODE` flags or explicit local debug branches when a template supports them.
- Remove noisy logs before export unless the component is explicitly a debug utility.
