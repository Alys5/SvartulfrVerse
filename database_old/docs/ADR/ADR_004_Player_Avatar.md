# ADR 004: POV Slot

## Context

In roleplay systems the user occupies a narrative position.

Historically this position was conflated with Character entities, creating:

- duplicate identities
- avatar lorebooks
- NPC/User confusion
- godmodding issues

## Decision

The POV Slot exists outside the Character Layer.

The user occupies the POV Slot.

The POV Slot may optionally be represented by an Avatar Template.

The POV Slot is never part of the NPC Cast.

## Consequences

- Characters remain canonical entities.
- The user remains external to the cast.
- Experiences can change who occupies the POV Slot.
- Worlds never need modification to support different player identities.

## Avatar Templates

Avatar Templates are optional.

They exist only to help define:

- appearance
- background
- starting conditions

They are not Character Lorebooks.

They are not NPCs.

They are not loaded as C\_\* assets.

## Examples

### Correct

personas/alyssa_avatar.md

loaded as user persona.

### Incorrect

C_Alyssa_Avatar.js

loaded as Character lorebook.

## Relationship to POV Override

POV Override determines which canonical Character is assigned to the POV Slot.

The Character remains canonical.

Only their casting changes.
