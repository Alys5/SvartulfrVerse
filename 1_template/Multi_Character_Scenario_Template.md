# Multi-Character Scenario Template

Use this template for the bot's **scenario** field when the bot contains multiple characters. The scenario is the shared scene director: active cast, relationship state, turn-taking, triggers, escalation, de-escalation, and pacing.

Target: about **600-900 tokens** for normal multi-character bots. Keep the active cast small unless the scenario requires more.

## Scenario Overview

**Scenario Title:** [SCENARIO TITLE]  
**Setting:** [Current location and situation.]  
**Time Pressure:** [Immediate clock, deadline, social pressure, or unresolved tension.]  
**Canon Layer:** `[ACTIVE]` | `[HISTORICAL]` | `[CULTURAL]` | `[DEFERRED]` | `[CANDIDATE]`  
**Source:** `[...]/[source_file].md`

## Relationship State

**User ↔ Character A:** [Known/unknown, trust, friction, attraction, obligation, conflict.]  
**User ↔ Character B:** [Known/unknown, trust, friction, attraction, obligation, conflict.]  
**Character A ↔ Character B:** [Alliance, rivalry, dependency, history, current tension.]

## Active Cast Direction

- **[Character A]:** [When to activate, what they want, how they pressure the scene.]
- **[Character B]:** [When to activate, what they want, how they pressure the scene.]
- **[Character C, optional]:** [When to activate, what they want, how they pressure the scene.]

## Trigger Matrix

```text
Trigger Matrix:
- `[keyword / user action / emotional cue]` → `[active responder]` → `[reaction style]`
- `[keyword / user action / emotional cue]` → `[active responder]` → `[reaction style]`
- `[keyword / user action / emotional cue]` → `[active responder]` → `[reaction style]`
```

## Escalation / De-Escalation

**Escalate when:**
- The user pushes a stated desire, boundary, secret, rivalry, or obligation.
- A trigger in the matrix is activated.
- The scene needs a consequence, interruption, or new pressure.

**De-escalate when:**
- The user slows down, repairs, refuses, asks for clarity, or changes the scene goal.
- Continuing escalation would remove agency or rush the arc.
- The relationship needs breathing room before the next beat.

## Pacing & Anti-Omniscience

- Characters only know what they have seen, heard, been told, inferred, or been briefed about.
- Do not let inactive characters react unless the scene gives them a reason.
- Keep group scenes legible: one primary reaction, one secondary reaction, then user agency.
- Use silence, interruption, and competing motives instead of explaining every relationship.

## Format Reminders

- Use distinct voices.
- Keep responses compact.
- Avoid making all characters agree.
- End beats with openings for the user to speak, act, refuse, or redirect.

## Token Economy Notes

- Keep scenario direction active and playable.
- Move stable world lore to the World template.
- Move identity details to Multi-Character Personality.
- Remove duplicate trigger descriptions and long backstory.
