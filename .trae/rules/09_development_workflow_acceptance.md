---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, and Level 0 / Level 1 / Level 3 acceptance criteria.'
---
# 09. Development Workflow and Acceptance Criteria

This module defines the development workflow, testing matrix, and mandatory acceptance criteria.

## Development Workflow

1. Read the applicable guide source:
   - [JanitorAI Scripts Guide](https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/GuideBookSite/book/print.html);
   - [Chatbot Creation Guide](https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/ChatbotBookSite/book/print.html).
2. Identify whether the work is Engine, Integrated World, Personality, Scenario, Bot Card, or Scenario Bot.
3. Edit the smallest relevant file or template.
4. Verify ES6-safe sandbox behavior and hard-blocked API absence.
5. Verify source and Canon Layer metadata.
6. Verify token economy and prompt placement.
7. Run static checks and `git diff --check`.
8. Summarize changes and any intentional scaffolding.

## Mandatory Acceptance Criteria

A change is not complete until all applicable criteria pass.

### Runtime Criteria

- [ ] Uses `context` as the only JanitorAI interface.
- [ ] Guards `context.character`, `context.character.personality`, `context.character.scenario`, and `context.character.example_dialogs`.
- [ ] Writes only to `personality`, `scenario`, and `example_dialogs`.
- [ ] Uses append-only behavior by default.
- [ ] Avoids `async/await`, `Promise`, `fetch`, `import`, `require`, `window`, `document`, timers, and global side effects.
- [ ] Uses ES6-safe syntax only when sandbox-safe.
- [ ] Avoids heavy per-turn structures.
- [ ] Uses readable logic over over-compression.

### Lore Criteria

- [ ] Every concrete lore entry has a Canon Layer tag.
- [ ] Prefixes are canonical: `WRD`, `LOR`, `LOC`, `ORG`, `BST`, `FAM`, `NPC`, `SEC`, `CAN`, `REL`.
- [ ] No entry uses `source:unspecified`.
- [ ] No entry uses non-canonical prefixes such as `HST`, `CUL`, or `WIT`.
- [ ] No export script references `TODO-CANON/`.
- [ ] Integrated World data does not contain opening-message logic.
- [ ] Scenario/card owns active scene direction without redefining world canon or family genealogy.

### Character Card Criteria

- [ ] Personality includes `CHARACTER`, `APPEARANCE`, `PSYCHOLOGICAL_PROFILE`, `SOCIAL_BEHAVIOR`, `SENSORY`, and `FORMAT`.
- [ ] Scenario includes `SETTING`, `RELATIONSHIP_STATE`, `INTERACTION_CATEGORIES`, `DYNAMIC_BEHAVIORS`, `PACING & STYLE`, and `FORMAT REMINDERS`.
- [ ] Example Dialogue demonstrates behavior, not biography.
- [ ] Initial Message provides voice, scene anchor, and invitation.
- [ ] Bot Card includes impact title, subtitle, portrait, structured blurb, impact line, and closing hook where applicable.
- [ ] No local filesystem path leakage appears in bot-facing text except required runtime source attribution.
- [ ] No architecture jargon such as `MacroCosmo`, `MicroCosmo`, `Level 0`, `Level 1`, `Level 3`, or `Engine Data` appears in bot-facing text unless explicitly required.
- [ ] Scenario files do not contain opening-message logic.

### Token Criteria

- [ ] Personality is concise and behavior-focused.
- [ ] Scenario is concise and directive.
- [ ] Critical rules are not buried in the middle of a long prompt.
- [ ] Long lore dumps are removed or moved to dynamic lore.
- [ ] Target token ceilings are respected where applicable.

## Testing Matrix

### Single-Character Testing

- [ ] Tone test.
- [ ] Scenario trigger test.
- [ ] Emotion test.
- [ ] Token bloat test.
- [ ] Formatting test.
- [ ] 10–15 turn drift test.

### Multi-Character Testing

- [ ] Two-Voice Test.
- [ ] Trio-Voice Test where applicable.
- [ ] Trigger Matrix test.
- [ ] Turn-taking test.
- [ ] Escalation test.
- [ ] De-escalation test.
- [ ] Repair test.

### Scenario Bot Testing

- [ ] Controller Block test.
- [ ] Scenario Block test.
- [ ] Choice Engine test.
- [ ] Consequence Engine test.
- [ ] Cycle test.
- [ ] 20+ turn pacing test.
- [ ] Recovery/de-escalation test.

## Debugging Standards

- Change one thing at a time.
- Keep receipts for tone drift, trigger failure, or token bloat.
- Prefer small targeted fixes over broad rewrites.
- Remove noisy debug logs before export unless the component is explicitly a debug utility.
- Do not debug by adding lore dumps.
