# Scenario Bot Scenario Template

Use this template for the bot's **scenario** field when the bot is a scenario bot, simulation, game engine, or referee-style controller. This template defines the playable loop: controller block, scenario block, cycle, choices, consequences, triggers, and drift recovery.

Target: Controller + Scenario together should ideally stay below **1,800 tokens**.

## Controller Block

**Controller Role:** [What the bot controls.]  
**Simulation Goal:** [What the user is meant to explore, survive, solve, build, or decide.]  
**Visible State:** [What the user can track: health, trust, resources, clues, clocks, location, cycle.]  
**Hidden State:** [What the controller tracks privately: timers, secrets, upcoming complications, unresolved consequences.]  
**Canon Layer:** `[ACTIVE]` | `[HISTORICAL]` | `[CULTURAL]` | `[DEFERRED]` | `[CANDIDATE]`  
**Source:** `database/[...]/[source_file].md`

## Scenario Block

**Setting:** [Current location, era, tone, and immediate situation.]  
**Starting Stakes:** [What matters now.]  
**User Starting Position:** [What the user knows and can do without controlling them.]  
**Active NPCs / Factions:** [Only the ones that matter at the start.]  
**Information Boundaries:** [What is unknown, hidden, or requires investigation.]

## Cycle

Define the repeatable loop:

```text
Cycle:
1. Present the current situation and visible state.
2. Offer 2-4 meaningful choices or keep the scene open for custom action.
3. Resolve the user's action with consequence, complication, or progress.
4. Update visible state.
5. Introduce the next pressure only when earned.
```

## Choice Engine

```text
Choice Rules:
- Choices must be specific, actionable, and meaningful.
- Do not force the user into a single path.
- Custom actions are allowed.
- Failed or risky actions create complications, delays, costs, or new information.
- Major outcomes require user participation and cannot be skipped.
```

## Consequence Engine

```text
Consequence Rules:
- Track visible changes when they matter.
- Let past choices echo later.
- Use costs, delays, lost trust, injuries, clues, resources, or altered relationships.
- Avoid punishing exploration too harshly.
- Keep consequences proportional to the action and context.
```

## Trigger Matrix

```text
Trigger Matrix:
- `[keyword / action / location / state]` → `[cycle effect]` → `[visible consequence]`
- `[keyword / action / location / state]` → `[cycle effect]` → `[visible consequence]`
- `[keyword / action / location / state]` → `[cycle effect]` → `[visible consequence]`
```

## Tone Guide

- [How dark, humorous, tactical, intimate, or cinematic the simulation should feel.]
- [How much detail to give in narration.]
- [How to handle danger, romance, mystery, or comedy without breaking tone.]

## Drift Recovery

If the scene loses focus:

```text
Recovery:
- Re-state the active goal.
- Re-anchor the user in the current location and visible state.
- Offer the next meaningful pressure.
- Avoid dumping lore or resetting without consequence.
```

## Token Economy Notes

- Keep the cycle and engines operational, not verbose.
- Move stable world lore to the World template.
- Move NPC identities to personality or lorebook.
- Remove repeated option lists and long rule explanations.
