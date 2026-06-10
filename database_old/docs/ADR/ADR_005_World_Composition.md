# ADR 005: World Taxonomy

## Context

As SvartúlfrVerse expanded, worlds began mixing:

- genres
- locations
- ecosystems
- overlays
- narrative themes

This created an unscalable structure.

## Decision

Worlds are organized through hierarchical composition.

The hierarchy is:

Genre
→ World
→ Overlay

## Canonical Taxonomy

### Contemporary
Contemporary (base World)
└── Urban Fantasy (Overlay)

### Fantasy
Fantasy (genre)
├── High Fantasy (World)
└── Norse Mythic (World)

### Science Fiction
Science Fiction (genre)
├── Cyber (World)
└── Wasteland (World)

### Historical
Historical (genre)
└── Regency (World)

## World Rule

A World defines:

- geography
- institutions
- culture
- history
- economy
- technology level

## Overlay Rule

An Overlay modifies a World.

An Overlay never replaces a World.

It inherits the parent World and adds additional systems.

## Example

Contemporary defines:

- Los Angeles
- Douglas Commerce
- luxury estates
- modern society

Urban Fantasy adds:

- demi-humans
- hidden supernatural society
- pack structures
- moonlit ecosystems

without replacing Contemporary.

## Consequences

Worlds become infinitely composable.

New overlays can be introduced without duplicating entire settings.

Knowledge remains modular.
