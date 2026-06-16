---
alwaysApply: false
description: "SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, and Level 0 / Level 1 / Level 3 naming conventions."
---

# 04. JavaScript Standards and Naming

This module defines the JavaScript runtime constraint and naming conventions for SvartulfrVerse JanitorAI scripts.

## SvartulfrVerse Runtime Constraint

For this workspace, JanitorAI runtime code must be ES6-safe inside the sandbox scope. Modern syntax is allowed when it improves readability and remains sandbox-safe.

Use when appropriate:

```javascript
const
let
=>
template literals
.includes()
.map()
.filter()
.forEach()
Object.keys()
Object.values()
Object.assign()
```

Avoid when it obscures behavior or creates heavy per-turn work:

- deeply nested destructuring;
- large spreads over big arrays;
- advanced regex flags;
- heavy object construction on every turn;
- unnecessary abstraction.

## Hard-Blocked Features

Do not use restricted features:

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
- `import`
- `require`
- global side effects
- redefining `context`
- overwriting system objects

## Safe Syntax Examples

Allowed ES6-safe script:

```javascript
const chat = context.chat || {};
const last = String(chat.last_message || "").toLowerCase();
const padded = ` ${last} `;
const greetings = ["hi", "hey", "hello"];

for (const word of greetings) {
  if (padded.indexOf(` ${word} `) !== -1) {
    context.character.scenario += " The greeting lands warmly.";
    context.character.personality += ", warm and responsive";
    break;
  }
}
```

Safe template literal and helper use:

```javascript
const additions = [", alert and attentive", ", aware of the current room"];

context.character.personality += additions.join("");
```

## Matching and Loop Guidelines

- Normalize user input with `String(...)`, `.toLowerCase()`, and `.trim()` before matching.
- Use padded `indexOf(" keyword ")` for whole-word matches.
- Use `.includes()` for phrases when substring matching is intended.
- Use regex only for documented boundary rules; avoid look-behind and advanced Unicode features.
- Keep loops small.
- Use `break` to stop after the first intended match.
- Avoid recursive or unbounded iteration.
- Avoid building large strings or arrays every turn unless the template explicitly budgets for it.

## Naming

- Script files: PascalCase with descriptive name and `_Template.js` suffix when reusable.
- Scenario-specific scripts must use the integrated World domain prefixes from `level 1`:
  - World / Lore / Locations / Organizations / Bestiary: `WRD_LosAngeles2024.js`, `LOR_LosAngeles2024.js`, `LOC_LosAngeles2024.js`, `ORG_LosAngeles2024.js`, `BST_LosAngeles2024.js`
  - Families / NPCs / Secrets / Canon / Relationships: `FAM_DouglasBloodmoon.js`, `NPC_JasperDouglasBloodmoon.js`, `SEC_HouseSecret.js`, `CAN_Investigation.js`, `REL_DouglasBloodmoon.js`
  - Runtime integration: `SvartulfrVerse_Engine_Template.js`, `SvartulfrVerse_World_Template.js`, `SvartulfrVerse_Scenario_Template.js`
- Configuration constants: `UPPER_SNAKE_CASE`
- Feature toggles: `UPPER_SNAKE_CASE`
- Category IDs: `UPPER_SNAKE_CASE`, `snake_case`, or fixed string IDs
- Helper functions: `camelCase`
- Data table names: `UPPER_SNAKE_CASE`
- Lore entry IDs: `snake_case`
- Category labels: `snake_case` or `camelCase` when required by the template schema
- Character names in injected personality text must include the character's name to avoid LLM confusion.
