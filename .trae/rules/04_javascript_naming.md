---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES5 runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 04. JavaScript Standards and Naming

This module defines the JavaScript runtime constraint and naming conventions for SvartulfrVerse JanitorAI scripts.

## SvartulfrVerse Runtime Constraint

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

## Restricted Features

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

## Naming

- Script files: PascalCase with descriptive name and `_Template.js` suffix when reusable.
- Scenario-specific scripts must use MacroCosmo or MicroCosmo domain prefixes:
  - MacroCosmo: `WRD_LosAngeles2024.js`, `LOR_LosAngeles2024.js`, `LOC_LosAngeles2024.js`, `ORG_LosAngeles2024.js`, `BST_LosAngeles2024.js`
  - MicroCosmo: `FAM_DouglasBloodmoon.js`, `NPC_JasperDouglasBloodmoon.js`
  - Runtime integration: `Context_Control_*.js`, `Context_Control_Awareness_*.js`, `Context_Aware_Multiple_Character_*.js`, `Advanced_Faction_Management_*.js`
- Configuration constants: `UPPER_SNAKE_CASE`
- Feature toggles: `UPPER_SNAKE_CASE`
- Category IDs: `UPPER_SNAKE_CASE`, `snake_case`, or fixed string IDs
- Helper functions: `camelCase`
- Data table names: `UPPER_SNAKE_CASE`
- Lore entry IDs: `snake_case`
- Category labels: `snake_case` or `camelCase` when required by the template schema
- Character names in injected personality text must include the character's name to avoid LLM confusion.
