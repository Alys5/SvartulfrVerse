# Visual Inheritance Rules — Authority Record

**Authority:** Visual Authority Layer (ADR-004)  
**Status:** CANONICAL  
**Scope:** Los Angeles Dynasty

---

## Purpose

This document defines how visual characteristics pass from parents to children in the Los Angeles Dynasty. These rules are **visual authority only** and do not affect genealogical authority.

---

## Fusion Inheritance Model

### Definition

The Fusion Inheritance Model defines how children of the Douglas-Bloodmoon union inherit visual characteristics from both dynasties.

### Core Principle

**Visual inheritance ≠ Genealogical inheritance**

- Genealogy defines WHO is parent to WHOM
- Visual inheritance defines WHAT characteristics pass from parent to child
- These are separate authority domains

---

## Dominance Hierarchy

### Hair Color

| Parent | Gene | Expression |
|--------|------|------------|
| Douglas | Black (dominant) | 75% probability |
| Bloodmoon | Silver-white (recessive) | 25% probability |

**Result:** Most children express black hair; some express blonde/silver.

### Eye Color

| Parent | Gene | Expression |
|--------|------|------------|
| Douglas | Amber (dominant) | 60% probability |
| Bloodmoon | Silver/pale (recessive) | 40% probability |

**Result:** Amber eyes more common; pale/blue variants occur.

### Build

| Parent | Gene | Expression |
|--------|------|------------|
| Douglas | Massive (dominant) | Primary |
| Bloodmoon | Lean (recessive) | Modifier |

**Result:** Douglas mass dominates; Bloodmoon refinement may modify.

### Height

| Parent | Gene | Expression |
|--------|------|------------|
| Douglas | Tall | Baseline |
| Bloodmoon | Tall | Baseline |

**Result:** Both dynasties are tall; children are tall.

### Aesthetic

| Parent | Gene | Expression |
|--------|------|------------|
| Douglas | Corporate | N/A |
| Bloodmoon | Ancestral | N/A |

**Result:** Aesthetic is **character-specific**, not inherited.

---

## Character-Specific Inheritance

### Alyssa Douglas-Bloodmoon

**Resemblance Rule:** Alyssa resembles Nixara Bloodmoon (maternal)

| Attribute | Inherited From | Expression |
|-----------|----------------|------------|
| Hair | Bloodmoon (warmth) | Caramel-brown |
| Eyes | Bloodmoon (pale) | Mint green |
| Build | Bloodmoon (refinement) | Petite hourglass |
| Aesthetic | Character-specific | Dark angel/decadent muse |

**Classification:** Bloodmoon-visual-dominant

---

### Noah Douglas-Bloodmoon

**Resemblance Rule:** Noah expresses Bloodmoon coloration (recessive)

| Attribute | Inherited From | Expression |
|-----------|----------------|------------|
| Hair | Bloodmoon (recessive) | Blonde |
| Eyes | Bloodmoon (recessive) | Blue |
| Build | Bloodmoon (refinement) | Lithe elegant |
| Aesthetic | Character-specific | Bespoke elegance |

**Classification:** Bloodmoon-coloration-dominant, Douglas-build-recessive

---

### Malachia Douglas-Bloodmoon

**Resemblance Rule:** Malachia expresses Douglas coloration (dominant)

| Attribute | Inherited From | Expression |
|-----------|----------------|------------|
| Hair | Douglas (dominant) | Black |
| Eyes | Douglas (dominant) | Amber |
| Build | Douglas (dominant) | Tank-like |
| Aesthetic | Character-specific | Tactical utilitarian |

**Classification:** Douglas-visual-dominant

---

### Jasper Douglas-Bloodmoon

**Resemblance Rule:** [Pending character audit]

| Attribute | Inherited From | Expression |
|-----------|----------------|------------|
| Hair | [Pending] | Caramel-brown |
| Eyes | [Pending] | Mint green |
| Build | [Pending] | Lean athletic |
| Aesthetic | Character-specific | Hypebeast streetwear |

**Classification:** [Pending audit]

---

## Inheritance Authority Records

### Canonical Inheritance Patterns

| Pattern | Definition | Example |
|---------|------------|---------|
| Douglas-dominant | Black hair, amber eyes, massive build | Malachia |
| Bloodmoon-recessive | Blonde/silver hair, pale/blue eyes, lean build | Noah |
| Bloodmoon-maternal | Daughter resembles mother | Alyssa |

### Exception Handling

- **Alyssa:** Bloodmoon-visual-dominant despite Douglas genealogy
- **Noah:** Bloodmoon-coloration despite Douglas genealogy
- These are **visual exceptions** that do not affect genealogy

---

## Query Interface

### Valid Queries

```
getInheritance(child) → InheritanceRecord
getResemblance(child) → Parent
getVisualDominance(child) → Dynasty
validateInheritance(child, attributes) → Boolean
```

### Invalid Operations

```
setInheritance(child, parent)  // PROHIBITED — requires ADR
modifyInheritanceRule()         // PROHIBITED — requires ADR
```

---

## Cross-References

- [Visual_Baseline.md](./Visual_Baseline.md) — Visual baselines
- [../dynasties/Douglas.md](../dynasties/Douglas.md) — Douglas Dynasty
- [../dynasties/Bloodmoon.md](../dynasties/Bloodmoon.md) — Bloodmoon Dynasty

---

## Authority

Established by: ADR-004  
Record custodian: Visual Authority Layer  
Last validated: 2026-06-07
