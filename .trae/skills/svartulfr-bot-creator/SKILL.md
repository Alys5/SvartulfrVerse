---
name: "svartulfr-bot-creator"
description: "Generates SvartulfrVerse JanitorAI bot packages from botCreator.md. Invoke when the user asks to create or customize a bot."
---

# SvartulfrVerse Bot Creator

Use this skill when the user asks to generate, customize, or review a complete JanitorAI bot package for a SvartulfrVerse character, faction, or concept.

## Primary source

Always read and execute [`botCreator.md`](../../botCreator.md) as the operational prompt. Do not bypass its source-of-truth list, execution flow, ES5 constraints, append-only rules, or final acceptance checklist.

## Invocation trigger

Invoke this skill when the user provides a target such as:

- a character concept;
- a faction concept;
- a JanitorAI bot idea;
- a request to generate personality, scenario, initial messages, HTML bio, or JavaScript Lorebooks;
- a request to create Engine, World, and Scenario templates for a bot.

## Required workflow

1. Read `botCreator.md`.
2. Confirm the target concept. If missing or ambiguous, ask clarifying questions before generating.
3. Validate canon status:
   - `ACTIVE`
   - `HISTORICAL`
   - `CULTURAL`
   - `DEFERRED`
   - `CANDIDATE`
4. Validate assets against `0_assets/ASSET_REGISTRY.json`.
5. Generate the full package in the order required by `botCreator.md`.
6. Run the final acceptance checklist before responding.

## Canonical paths

Use these paths only:

- `README.md`
- `.trae/rules/rules.md`
- `.trae/rules/08_template_requirements.md`
- `.trae/rules/09_development_workflow_acceptance.md`
- `1_template/Personality_Template.md`
- `1_template/Scenario_Template.md`
- `1_template/Sys_Bio_Template.html`
- `1_template/SvartulfrVerse_Engine_Template.js`
- `1_template/SvartulfrVerse_World_Template.js`
- `1_template/SvartulfrVerse_Scenario_Template.js`
- `0_assets/ASSET_REGISTRY.json`

Never use `bot_template/`, `template/janitorai_scripts.md`, `database_old/`, or removed legacy templates as runtime references.

## Hard constraints

- JavaScript must be ES5-compatible and use `var`.
- Do not use `let`, `const`, arrow functions, template literals, classes, `async`, `await`, `Promise`, `fetch`, `require`, `import`, or `export`.
- Scripts may only write to:
  - `context.character.personality`
  - `context.character.scenario`
  - `context.character.example_dialogs`
- Engine content must stay lore-agnostic.
- World owns MacroCosmo lore, timeline, filters, cascade, and canon meaning.
- Scenario owns MicroCosmo NPCs, relationships, anti-omniscience gates, and TimeDelay.
- Every World or Scenario lore entry must include `source` and `canonLayer`.
- Never invent image URLs or asset keys.
- Never leave placeholders except allowed JanitorAI runtime macros such as `{{user}}`, `{{sub}}`, `{{obj}}`, `{{poss}}`, `{{poss_p}}`, and `{{ref}}`.

## Output contract

Return the package using the structure in `botCreator.md`:

1. Metadata & Assets
2. Personality Template
3. Scenario Template
4. Initial Messages
5. Engine JavaScript Lorebook
6. World JavaScript Lorebook
7. Scenario JavaScript Lorebook
8. Public System Bio HTML
9. Final Acceptance Checklist

Use accurate fenced code block labels: `markdown`, `html`, and `javascript`.

## Final acceptance checklist

Before answering, explicitly confirm:

- no invented image URLs;
- no broken canonical path references;
- no `bot_template/`, `template/janitorai_scripts.md`, or `database_old/` references;
- ES5-only JavaScript;
- append-only context writes only;
- Engine remains lore-agnostic;
- every World/Scenario lore entry has `source` and `canonLayer`;
- no placeholders remain except allowed JanitorAI runtime macros.
