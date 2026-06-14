---
alwaysApply: false
description: 'SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, and MacroCosmo/MicroCosmo governance.'
---
# 06. Token State and Character Card Requirements

This module defines token budgeting, visible flags, zero-width state, stat parsing, and character-card requirements.

## Token Economy

JanitorAI models have a limited context window. Permanent prompt text competes with live conversation history.

Target ceilings:

| Component | Target |
|---|---:|
| Single-character Personality Block | ~600 tokens or less |
| Single-character Scenario Block | ~800 tokens or less |
| Advanced Prompt / runtime overlay | ~200–300 tokens |
| Total permanent prompt for a focused single-character bot | ideally under ~1,800 tokens |
| Multi-character individual personality section | ~300–500 tokens |
| Multi-character total personality | ideally under ~1,200–1,500 tokens |
| Shared Scenario + Trigger Matrix | ~500–800 tokens |
| Scenario Bot Controller + Scenario | ideally under ~1,800 tokens |

These are targets, not hard limits. Always test the final card in the intended model context window.

## U-Shaped Memory Placement

Models remember the beginning and end of prompts better than the middle.

- Personality belongs near the beginning to anchor identity.
- Scenario belongs near the end to control the immediate scene.
- Critical behavioral rules should not be buried in the middle.
- Long lore dumps should be avoided because they push functional rules out of memory.
- Scenario Bots should place controller rules and current-cycle logic where they are most likely to be followed.

## Character Card Required Sections

A complete character card must include:

- Personality Block;
- Scenario Block;
- Example Dialogue;
- Initial Message;
- Bot Card metadata where applicable;
- source and Canon Layer notes where lore is concrete;
- approved image metadata from `ASSET_REGISTRY.json`.

## Personality Block Requirements

Personality must define the actor, not the entire wiki.

Minimum sections:

- `CHARACTER`;
- `APPEARANCE` with behavior-linked visual cues;
- `PSYCHOLOGICAL_PROFILE`;
- `SOCIAL_BEHAVIOR`;
- `SENSORY`;
- `FORMAT`.

Personality must be concise, behavior-focused, and avoid lore dumps.

## Scenario Block Requirements

Scenario must direct the scene.

Minimum sections:

- `SETTING`;
- `RELATIONSHIP_STATE`;
- `INTERACTION_CATEGORIES`;
- `DYNAMIC_BEHAVIORS`;
- `PACING & STYLE`;
- `FORMAT REMINDERS`.

Scenario must not contain opening-message logic or first-message scripting. It may define the current scene, triggers, escalation, de-escalation, repair, and pacing.

## Example Dialogue Requirements

Example Dialogue must demonstrate behavior, not merely describe it.

Requirements:

- 3–6 compact exchanges;
- include neutral, playful, conflict, repair, and comfort beats where relevant;
- use the same formatting as the character;
- demonstrate trigger reactions;
- avoid generic filler;
- avoid long exposition.

## Initial Message Requirements

Initial Message must be:

- voice-first;
- anchored in the current scene;
- an invitation for the user to respond;
- 1–2 sentences for banter-heavy bots;
- 2–3 sentences for standard bots;
- 4–8 sentences only for intentionally maximalist bots.

Avoid:

- biography;
- lore dump;
- empty starts such as `"Hi."`;
- overlong monologues that leave no user agency.

## Bot Card Requirements

Bot Card must include:

- Impact Title, about 20 characters when possible;
- Subtitle with name + identity descriptor;
- Main Image as 1:1 portrait;
- 1–3 supporting images where appropriate;
- structured Blurb:
  - hook;
  - personality + conflict in motion;
  - impact line;
  - world/scenario teaser;
  - closing invitation or threat;
- optional Rules / LLM Advice limited to one simple instruction.

## Persistent State Requirements

Persistent state mechanisms must be:

- compact;
- parseable by the LLM;
- append-only by default;
- resilient to drift;
- visible or invisible only when the model can reproduce it reliably;
- documented in the relevant template.

Visible flags must be short and stable. Zero-width state must be used only when the model can reproduce it without breaking output.
