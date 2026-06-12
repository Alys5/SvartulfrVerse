# JanitorAI Script Alignment Report

**Source of truth:** https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/GuideBookSite/book/index.html

**Date:** 2026-06-12

**Scope:** Script generation rules, runtime contracts, export metadata, active JanitorAI script templates, and representative validation.

## 1. Official guide requirements captured

The official JanitorAI Scripts Guide was analyzed as the controlling source for script-generation work.

Key requirements now encoded locally:

- Scripts run before every bot reply.
- Scripts can write only to `context.character.personality` and `context.character.scenario`.
- `context.character.name`, `context.character.chat_name`, and `context.character.example_dialogs` are read-only character fields.
- `context.chat.last_message`, `context.chat.message_count`, and `context.chat.last_messages` are the primary chat inputs.
- The current guide treats the JanitorAI sandbox as ES6-safe inside script scope.
- Safe syntax includes `const`, `let`, arrow functions, template literals, `.includes()`, `.map()`, `.filter()`, `.forEach()`, `Object.keys()`, `Object.values()`, `Object.assign()`, basic regex, `new Date()`, and `console.log()`.
- Unsafe or blocked features include `async`, `await`, `Promise`, `setTimeout`, `setInterval`, `fetch`, `XMLHttpRequest`, `require`, `import`, `document`, `window`, and global side effects.
- Advanced lorebook patterns include progressive entries, weighted probability, min and max message gates, shifts, ordered keywords, event lore, reaction engines, adaptive polarity, hybrid emotional states, error guards, and modular layered lorebooks.
- Scripts must remain lightweight because they run before every bot reply.

## 2. Internal guide discrepancy handled

The guide contains two compatibility signals:

- Chapters 3, 9, and 18 describe a modern ES6-safe sandbox.
- Appendix B still contains a legacy ES5-style checklist.

For active script generation, the modern ES6-safe guidance is now treated as the controlling technical baseline because it is explicit, current, and repeated in the main chapters. The SvartulfrVerse local R-010 punctuation constraint remains stricter than the official guide and continues to forbid em dash and en dash in generated prompt-facing text.

## 3. Local discrepancies corrected

Corrected deviations:

- Replaced `ES5 ONLY` script-generation requirements with `ES6-safe JanitorAI sandbox syntax is allowed inside script scope`.
- Added official JanitorAI Scripts Guide as the controlling technical authority for script generation.
- Added explicit blocked-tool lists for async, external, DOM, module, timer, Promise, and global side effects.
- Added the official writable-field boundary: only `context.character.personality` and `context.character.scenario`.
- Removed portable reliance on `context.variables` from active runtime scripts and templates.
- Replaced active runtime idempotency state with compact scenario markers in `context.character.scenario`.
- Added official advanced lorebook patterns to R-009.
- Updated export metadata and active script headers from ES5 labels to ES6-safe JanitorAI sandbox labels.
- Updated runtime contract documents and ADR references that previously described an inter-script state bus.

## 4. Files updated

Rules:

- `.trae/rules/R-000_Runtime_Rules.md`
- `.trae/rules/R-007_Engine_Rules.md`
- `.trae/rules/R-008_Bot_Rules.md`
- `.trae/rules/R-009_Lorebook_Rules.md`
- `.trae/rules/R-010_Punctuation_and_Formatting_Constraints.md`

Runtime and architecture documents:

- `core/ADR-000_Runtime_Baseline.md`
- `core/ADR-005_Experience_Authority.md`
- `core/ADR-009_Language_Control_System.md`
- `database/EXPORT_MAPPING.md`

Active scripts and templates:

- `exports/En_Core.js`
- `exports/W_Contemporary.js`
- `exports/F_DouglasBloodmoon.js`
- `template/engine/AdvancedLorebook_Engine.js`
- `template/lorebook/W_AdvancedLorebook_Template.js`
- `template/lorebook/F_AdvancedLorebook_Template.js`
- `template/lorebook/C_AdvancedLorebook_Template.js`
- `template/character/C_Character_Template.md`
- Active export headers under `exports/Ex_*`
- Active export metadata files under `exports/Ex_*/Metadata.md`

## 5. Validation performed

Validation commands completed successfully:

- Active JavaScript syntax validation: `node --check` over active exports, lorebook templates, core lorebook engine, and character template.
- Active script static scan: 28 active JavaScript files checked for `context.variables` and blocked runtime tokens.
- Sandbox smoke test 1: `exports/Ex_Wulfnic/Ex_Wulfnic.js`, `exports/Ex_Jasper/Ex_Jasper.js`, `exports/Ex_Logan/Ex_Logan.js`.
- Sandbox smoke test 2: `exports/W_Contemporary.js`, `exports/F_DouglasBloodmoon.js`, `template/lorebook/W_AdvancedLorebook_Template.js`.
- Engine smoke test: `exports/En_Core.js`.

Observed validation results:

- `PASS exports/Ex_Wulfnic/Ex_Wulfnic.js`
- `PASS exports/Ex_Jasper/Ex_Jasper.js`
- `PASS exports/Ex_Logan/Ex_Logan.js`
- `PASS exports/W_Contemporary.js`
- `PASS exports/F_DouglasBloodmoon.js`
- `PASS template/lorebook/W_AdvancedLorebook_Template.js`
- `PASS exports/En_Core.js`
- `PASS active script scan | files=28`

## 6. Remaining live-runtime requirement

Development validation confirms sandbox syntax, static safety, and smoke-test behavior in a local Node VM. A live JanitorAI session is still required for final observed-runtime certification because the SvartulfrVerse runtime principle requires observed JanitorAI behavior to validate final runtime compatibility.
