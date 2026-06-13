# SvartúlfrVerse Architecture

## Purpose

The SvartúlfrVerse is a modular roleplay framework designed around composable layers.

The architecture prioritizes:

- Reusability
- Scalability
- Runtime validation
- Separation of concerns
- Long-term maintainability

---

# Core Principles

## Runtime First

Observed JanitorAI runtime behavior is the highest authority.

When runtime observations contradict architecture:

1. Preserve the observation.
2. Update the architecture.
3. Update ADRs.
4. Update workflows.
5. Retest.

Architecture adapts to reality.

Reality never adapts to architecture.

---

## Separation of Concerns

Each layer has a single responsibility.

Knowledge remains separate from behavior.

Worlds remain separate from Experiences.

Characters remain separate from Player Avatars.

---

# Semantic Layers

The SvartúlfrVerse uses four semantic layers.

## Engine Layer (En\_\*)

Stores:

- Runtime systems
- Behavioral frameworks
- Prompt imperatives
- State processing
- Routing logic

Examples:

```text
En_Core.js
relationship_engine.js
state_engine.js
```

---

## World Layer (W\_\*)

Stores factual world knowledge.

Examples:

- Geography
- Politics
- Institutions
- Culture
- Technology
- Magic Systems

Worlds never contain:

- Experience logic
- Scenario framing
- Runtime behavior

Examples:

```text
W_Contemporary.js
W_UrbanFantasy.js
W_Cyber.js
```

---

## Character Layer (C\_\*)

Stores factual character knowledge.

Examples:

- Appearance
- Psychology
- Preferences
- Relationships
- History
- Behavioral Tendencies

Characters never contain:

- State Machines
- Runtime Reactions
- Relationship Calculations

Examples:

```text
C_Alyssa.js
C_Erik.js
C_Jasper.js
```

---

## Experience Layer (Ex\_\*)

The deployable product.

Experience composes:

```text
Engine
+
World
+
Cast
+
POV Configuration
```

Examples:

```text
Ex_LosAngeles.js
Ex_DJFrequency.js
```

---

# World Taxonomy

Worlds are organized hierarchically.

## Structure

```text
Genre
 → World
 → Overlay
```

## Canonical Taxonomy

### Contemporary
- Contemporary (base World)
  └── Urban Fantasy (Overlay)

### Fantasy
- High Fantasy (World)
- Norse Mythic (World)

### Science Fiction
- Cyber (World)
- Wasteland (World)

### Historical
- Regency (World)

---

## Overlay Worlds

An Overlay modifies an existing World.

It never replaces it.

Example:

```text
Contemporary
 → Urban Fantasy
```

Urban Fantasy inherits Contemporary and adds:

- Demi-humans
- Kemonomimi
- Hidden supernatural society
- Pack structures

---

## Repository Structure

The canonical hierarchy:

```
worlds/
├── contemporary/
│   ├── W_Contemporary.js
│   ├── W_Contemporary.md
│   ├── Visual_DNA.md
│   └── urban_fantasy/
│       ├── W_UrbanFantasy.js
│       ├── W_UrbanFantasy.md
│       └── Visual_DNA.md
├── fantasy/
│   ├── high_fantasy/
│   │   ├── W_HighFantasy.js
│   │   ├── W_HighFantasy.md
│   │   └── Visual_DNA.md
│   └── norse_mythic/
│       ├── W_NorseMythic.js
│       ├── W_NorseMythic.md
│       └── Visual_DNA.md
├── science_fiction/
│   ├── cyber/
│   │   ├── W_Cyber.js
│   │   ├── W_Cyber.md
│   │   └── Visual_DNA.md
│   └── wasteland/
│       ├── W_Wasteland.js
│       ├── W_Wasteland.md
│       └── Visual_DNA.md
└── historical/
    └── regency/
        ├── W_Regency.js
        ├── W_Regency.md
        └── Visual_DNA.md
```

---

# Character Canonicality

Characters are singular entities.

There is only one canonical:

- Alyssa
- Erik
- Jasper
- Logan
- Malachia
- Noah
- Wulfnic

Experiences never create alternate versions.

Experiences only change casting.

---

# POV Architecture

The Player occupies a POV Slot.

The POV Slot exists outside the Character Layer.

The POV Slot may optionally use:

```text
Avatar Template
```

but Avatar Templates are not Characters.

---

## POV Override

Experiences may temporarily assign a canonical Character to the POV Slot.

Example:

```text
mv_pov_override = "C_Alyssa"
```

The Character remains canonical.

Only casting changes.

---

# Visual Architecture

Visual generation follows:

```text
Global DNA
↓
World DNA
↓
Overlay DNA
↓
Character Identity Anchors
```

Character Identity always has highest priority.

---

# Deployment Pipeline

## Authoring Assets

Internal generation assets.

Examples:

```text
metadata
scenario
dialogs
bio
```

---

## Deployment Artifacts

Final JanitorAI assets.

```text
Ex_<Name>.md
Ex_<Name>.js
```

These are the only files required for deployment.

---

# Workflow System

Operational procedures are managed through:

```text
WF_001 → WF_008
```

Workflows define execution.

ADRs define decisions.

Runtime defines truth.

---

# Governance Hierarchy

```text
Runtime
↓
ADR
↓
Workflow
↓
Documentation
↓
Templates
```
