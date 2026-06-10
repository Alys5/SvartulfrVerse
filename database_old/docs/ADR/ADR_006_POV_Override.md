# ADR 006: POV Override

## Context

Characters are canonical entities.

Experiences may require the user to temporarily assume the role of a canonical character.

Historically this created duplicate representations:

- Avatar Alyssa
- Character Alyssa

which violated canonical consistency.

## Decision

Experiences may assign a canonical Character to the POV Slot.

This is called POV Override.

The assignment is performed through:

mv_pov_override

## Rules

When a Character is assigned to the POV Slot:

1. The Character remains canonical.
2. The Character remains part of World canon.
3. The Character is removed from the active NPC Cast.
4. The User assumes that Character's role.

## Examples

Los Angeles

mv_pov_override = "C_Alyssa"

Garage Days

mv_pov_override = "C_Logan"

First Alpha

mv_pov_override = "C_Wulfnic"

## Consequences

Characters never have duplicate versions.

Experiences never create alternate copies.

Experiences only change casting.

Canonical reality remains unchanged.

## Casting Principle

Worlds define reality.

Characters define entities.

Experiences define casting.
