# ADR-004: Visual Authority Layer — Appearance and Inheritance Architecture

**Status:** ACCEPTED  
**Date:** 2026-06-07  
**Title:** Visual Authority Layer Definition and Inheritance Ownership Model

## Context

ADR-000 established the runtime baseline. ADR-001 formalized dynastic origins. ADR-002 defined Family Authority as sole custodian of genealogy. ADR-003 defined Character Authority as sole custodian of identity.

Visual appearance represents a distinct authority domain that must be formally defined. Visual inheritance patterns (how children inherit appearance from parents) are NOT genealogy—they are a separate visual authority that must remain independent from Family Authority while still referencing genealogical relationships.

## Decision

We establish the Visual Authority Layer as the sole canonical source for all appearance, aesthetic, and visual inheritance data within SvartulfrVerse.

### Scope

- **Only Human** (no supernatural visual elements)
- **Contemporary** (2020s-2030s timeline)
- **Los Angeles Dynasty** (geographic and familial focus)

### Visual Authority Layer Definition

**Visual Authority Layer is the sole owner and canonical custodian of:**

1. **Appearance Baseline** — Physical characteristics (hair, eyes, build, skin)
2. **Aesthetic Profile** — Style, fashion, visual vibe
3. **Visual Inheritance Rules** — How appearance passes from parent to child
4. **Coloration Authority** — Eye color, hair color, skin tone inheritance
5. **Resemblance Rules** — Which parent a child resembles

**Visual Authority Layer constraints:**

- **Visual-Only Custodian** — Owns appearance, not genealogy or identity
- **Independent from Genealogy** — Visual inheritance ≠ genealogical inheritance
- **Reference-Based** — May reference Family Authority for parent-child relationships
- **Authority-Driven** — Decisions governed by explicit ADR, not by archive inference

---

## Visual Baseline Definitions

### Douglas Visual Baseline

**Canonical Douglas Appearance:**

| Attribute | Value |
|-----------|-------|
| Hair Color | Black (streaked with silver/grey with age) |
| Eye Color | Amber |
| Build | Massive, muscular, imposing |
| Skin | Weathered, mature |
| Aesthetic | Corporate monarch, power suits, luxury executive |

**Reference Character:** Erik Douglas

**Visual DNA Anchor:**
```
Erik Douglas:
  Always:
    - Black hair streaked with silver/grey, slicked back
    - Amber eyes, cold and unyielding
    - 205cm, massive muscular build, weathered skin
    - Corporate monarch aesthetic, bespoke power suits
  Never:
    - Long white hair
    - Ancient king aesthetic
    - Nordic patriarch styling or fur robes
    - T-shirts or casual wear
```

### Bloodmoon Visual Baseline

**Canonical Bloodmoon Appearance:**

| Attribute | Value |
|-----------|-------|
| Hair Color | Silver-white |
| Eye Color | Silver-white (or pale variants) |
| Build | Lean, strong, refined |
| Skin | Pale, ancient |
| Aesthetic | Ancestral nobility, old-world aristocratic |

**Reference Character:** Wulfnic Bloodmoon

**Visual DNA Anchor:**
```
Wulfnic Bloodmoon:
  Always:
    - Silver-white hair, long and braided with silver
    - Silver-white eyes, glowing faintly in low light
    - 195cm, lean but impossibly strong, ancient skin
    - Ancestral nobility aesthetic, heavy furs
  Never:
    - CEO aesthetic
    - Executive skyscrapers or corporate boardrooms
    - Modern streetwear or tactical gear
```

---

## Fusion Inheritance Model

### Definition

The Fusion Inheritance Model defines how children of the Douglas-Bloodmoon union inherit visual characteristics. This model is **visual authority only** and does not affect genealogical authority.

### Inheritance Rules

#### Primary Inheritance Pattern

Children of Erik Douglas + Nixara Bloodmoon inherit visual characteristics according to the following fusion rules:

```
Douglas-Bloodmoon Visual Fusion:
├── Hair Color: Douglas-dominant OR Bloodmoon-recessive
├── Eye Color: Douglas-dominant OR Bloodmoon-recessive
├── Build: Douglas-dominant (mass/muscularity)
├── Skin: Variable inheritance
└── Aesthetic: Character-specific (not inherited)
```

#### Dominance Hierarchy

| Attribute | Dominant | Recessive | Expression |
|-----------|----------|-----------|------------|
| Hair Color | Douglas (black) | Bloodmoon (silver-white) | 75% Douglas / 25% Bloodmoon |
| Eye Color | Douglas (amber) | Bloodmoon (silver/pale) | 60% Douglas / 40% Bloodmoon |
| Build | Douglas (massive) | Bloodmoon (lean) | Douglas-dominant |
| Height | Douglas (tall) | Bloodmoon (tall) | Both tall baseline |
| Aesthetic | N/A | N/A | Character-specific |

---

## Character-Specific Resemblance Rules

### Alyssa Douglas-Bloodmoon

**Resemblance Rule:** Alyssa resembles Nixara Bloodmoon (mother)

**Visual Authority:**
```
Alyssa Douglas-Bloodmoon:
  Resembles: Nixara Bloodmoon (maternal)
  Hair: Caramel-brown (Bloodmoon-derived warmth)
  Eyes: Mint green (Bloodmoon-derived pale variant)
  Build: Petite hourglass (Bloodmoon-derived refinement)
  Aesthetic: Dark angel/decadent muse (character-specific)
```

**Inheritance Classification:** Bloodmoon-visual-dominant

**Alyssa/Nixara Resemblance Rule:**
- Alyssa expresses maternal Bloodmoon visual characteristics
- Hair and eye color derive from Bloodmoon warmth palette
- Build reflects Bloodmoon refinement rather than Douglas mass
- This is a **visual inheritance exception** that does not affect genealogy

### Noah Douglas-Bloodmoon

**Resemblance Rule:** Noah exhibits Bloodmoon coloration (recessive expression)

**Visual Authority:**
```
Noah Douglas-Bloodmoon:
  Resembles: Bloodmoon coloration (recessive expression)
  Hair: Blonde (Bloodmoon-derived silver-white → blonde)
  Eyes: Blue (Bloodmoon-derived pale → blue)
  Build: Lithe elegant swimmer (Bloodmoon-derived refinement)
  Aesthetic: Bespoke elegance (character-specific)
```

**Inheritance Classification:** Bloodmoon-coloration-dominant, Douglas-build-recessive

**Noah/Bloodmoon Coloration Rule:**
- Noah expresses the recessive Bloodmoon coloration (blonde hair, blue eyes)
- This is a **visual inheritance exception** that does not affect genealogy
- Noah remains fully Douglas-Bloodmoon by genealogy; only visual expression differs

### Malachia Douglas-Bloodmoon

**Resemblance Rule:** Malachia exhibits Douglas coloration (dominant expression)

**Visual Authority:**
```
Malachia Douglas-Bloodmoon:
  Resembles: Douglas coloration (dominant expression)
  Hair: Black, short military cut (Douglas-dominant)
  Eyes: Amber, steady (Douglas-dominant)
  Build: Tank-like scarred physique (Douglas-dominant)
  Aesthetic: Tactical utilitarian (character-specific)
```

**Inheritance Classification:** Douglas-visual-dominant

**Malachia/Douglas Coloration Rule:**
- Malachia expresses the dominant Douglas coloration (black hair, amber eyes)
- This represents the standard Douglas-dominant inheritance pattern
- No visual exception required

---

## Visual Authority Independence

### EXPLICIT SEPARATION

**Visual Authority IS INDEPENDENT from Genealogy Authority:**

1. **Different Domains** — Genealogy owns relationships; Visual owns appearance
2. **Different Rules** — Genealogy follows descent; Visual follows inheritance patterns
3. **Different Mutability** — Genealogy is immutable; Visual may have exceptions
4. **Different Queries** — Genealogy queries "who is parent"; Visual queries "what did child inherit"

### Cross-Authority Reference Model

```
Visual Authority ──references──► Family Authority
     │                                  │
     │ (queries parent-child            │
     │  relationships for               │
     │  inheritance context)            │
     │                                  │
     ▼                                  ▼
[Visual Inheritance Rules]    [Genealogical Records]
     │                                  │
     │                                  │
     ▼                                  ▼
[Character Visual Definition] [Character Family Reference]
```

### What Visual Authority MAY Reference

- Parent-child relationships (from Family Authority)
- Dynasty membership (from Family Authority)
- Surname rules (from Family Authority)

### What Visual Authority MAY NOT Define

- Genealogical relationships
- Dynasty membership
- Surname authority
- Family structure

---

## Authority Boundary Matrix

```
┌─────────────────────────────────────────────────────────────────────┐
│                    VISUAL AUTHORITY BOUNDARY MATRIX                │
├─────────────────┬──────────────┬─────────────┬──────────────────────┤
│ Domain          │ Owner        │ Consumers   │ Override Allowed?  │
├─────────────────┼──────────────┼─────────────┼──────────────────────┤
│ Appearance      │ Visual       │ All         │ NO                   │
│ Aesthetic       │ Visual       │ All         │ NO                   │
│ Coloration      │ Visual       │ All         │ NO                   │
│ Build           │ Visual       │ All         │ NO                   │
│ Resemblance     │ Visual       │ All         │ NO                   │
│ Inheritance     │ Visual       │ All         │ NO                   │
├─────────────────┼──────────────┼─────────────┼──────────────────────┤
│ Genealogy       │ Family       │ Visual      │ NO (reference only)  │
│ Dynasty         │ Family       │ Visual      │ NO (reference only)  │
├─────────────────┼──────────────┼─────────────┼──────────────────────┤
│ Identity        │ Character    │ Visual      │ NO (reference only)  │
│ Personality     │ Character    │ Visual      │ NO (reference only)  │
└─────────────────┴──────────────┴─────────────┴──────────────────────┘
```

---

## Visual Inheritance Authority Records

### Canonical Inheritance Patterns

The following inheritance patterns are explicitly stored as canonical visual authority records.

#### Douglas-Dominant Inheritance

**Definition:** Child expresses Douglas visual baseline (black hair, amber eyes, massive build).

**Canonical Properties:**
- Dominant expression pattern
- 75% probability in fusion model
- Example: Malachia Douglas-Bloodmoon

#### Bloodmoon-Recessive Inheritance

**Definition:** Child expresses Bloodmoon visual baseline (silver-blonde hair, pale/blue eyes, lean build).

**Canonical Properties:**
- Recessive expression pattern
- 25% probability in fusion model
- Example: Noah Douglas-Bloodmoon

#### Bloodmoon-Maternal Resemblance

**Definition:** Daughter resembles mother's visual baseline more strongly.

**Canonical Properties:**
- Sex-linked expression tendency
- Applies to Alyssa Douglas-Bloodmoon
- Does not override genealogy

---

## Inference Policy

**EXPLICITLY PROHIBITED:** Runtime inference of new visual facts.

### What the Runtime MAY Do

- **Query** Visual Authority records
- **Reference** visual data for rendering context
- **Validate** claimed appearance against authority records
- **Return** read-only visual data to other layers
- **Log** visual queries for audit trail

### What the Runtime MAY NOT Do

- **Infer** appearance from non-visual data
- **Derive** new inheritance patterns from context
- **Create** new visual facts from behavior
- **Modify** Visual Authority without explicit decision
- **Override** canonical appearance definitions

---

## Consequences

### For Visual Implementation

1. **Separation from Genealogy:** Visual files must not define family relationships
2. **Reference-Only Genealogy:** Visual definitions reference Family Authority for parent context
3. **Inheritance Rules:** Visual Authority owns how appearance passes to children

### For Family Authority Layer

1. **No Visual Override:** Family Layer cannot redefine character appearance
2. **Query Interface:** Family Layer provides genealogy; Visual Layer consumes it

### For Character Authority Layer

1. **Visual Reference:** Character Layer references Visual Authority for appearance
2. **No Appearance Definition:** Character Layer owns identity; Visual Layer owns appearance

### For Canon Recovery Workflow

- Any historical archive data contradicting Visual Authority must be escalated
- Visual conflicts require explicit ADR decision
- No automatic resolution of visual contradictions

---

## Authority

Established by: Visual Authority & Architecture Review  
Approved by: Runtime Validation  
Supersedes: All legacy visual definition workflows  
Depends on: ADR-000, ADR-001, ADR-002, ADR-003
