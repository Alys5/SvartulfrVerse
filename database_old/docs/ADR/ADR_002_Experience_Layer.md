# ADR 002: Experience Layer

## Context

Historically, the repository treated specific bot scenarios (e.g., "Los Angeles") as entire Worlds.

This blurred the distinction between:

- Reusable setting knowledge
- Specific playable experiences

The result was:

- Duplicated lorebooks
- Poor reusability
- Architectural confusion
- Difficult maintenance

## Decision

We formally introduce the **Experience Layer** (`Ex_*`).

An Experience is a specific narrative configuration defined by:

```text
Experience =
Engine
+ World Composition
+ NPC Cast
+ Player POV
```

The Experience Layer is the deployable product.

## Canon Ownership

Experiences never own canon.

### Worlds own reality.

Worlds define:

- Geography
- Institutions
- Culture
- History
- Social structures

### Characters own identity.

Characters define:

- Appearance
- Personality
- Preferences
- Tendencies
- Relationships

### Experiences own casting.

Experiences:

- Compose existing canon
- Select the active cast
- Define the scenario
- Configure the POV Slot
- Apply POV Overrides

Experiences never create new canon.

## Dependency Direction

The dependency direction is strictly one-way:

```text
En_*
   ↓
W_*
   ↓
C_*
   ↓
Ex_*
```

Experiences compose Worlds and Characters.

Worlds never depend on Experiences.

Characters never depend on Experiences.

This direction must remain invariant.

## Artifact Compilation

Experiences compile into a single deployment artifact:

```text
Ex_<Name>.md
```

This artifact contains:

- Metadata
- Character Profiles
- Scenario
- Initial Messages
- Example Dialogues

The compiled artifact replaces fragmented source files during deployment.

## Consequences

- Worlds become reusable.
- Characters become reusable.
- Experiences become lightweight.
- Repository complexity decreases.
- New scenarios can be created without duplicating lore.

## Examples

### World

```text
W_Contemporary.js
```

Defines:

- Douglas Commerce Company
- The Verve
- Los Angeles elite society
- Modern corporate intrigue

It knows nothing about Los Angeles as a bot.

### Experience

```text
Ex_LosAngeles.js
```

Defines:

- Active cast
- Scenario
- POV Override
- Narrative focus

### Deployment Artifact

```text
Ex_LosAngeles.md
```

Single copy-paste artifact used for JanitorAI deployment.
