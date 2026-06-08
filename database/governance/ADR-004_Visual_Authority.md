# ADR-004: Visual Authority Layer — Appearance and Inheritance Architecture

**Status:** ACCEPTED  
**Date:** 2026-06-07  
**Title:** Visual Authority Layer Definition and Inheritance Ownership Model

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/ADR-004_Visual_Authority.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Context

ADR-000 through ADR-003 established the core authority layers. Visual appearance represents a distinct authority domain that must remain independent from Family Authority while still referencing genealogical relationships for inheritance context.

## Decision

We establish the Visual Authority Layer as the sole canonical source for all appearance, aesthetic, and visual inheritance data within SvartulfrVerse.

### Visual Baseline Definitions

#### Douglas Visual Baseline (Reference: Erik Douglas)

| Attribute | Value |
|-----------|-------|
| Hair Color | Black (streaked with silver/grey) |
| Eye Color | Amber |
| Build | Massive, muscular, imposing |
| Height | 205cm |
| Aesthetic | Corporate monarch, power suits |

#### Bloodmoon Visual Baseline (Reference: Wulfnic Bloodmoon)

| Attribute | Value |
|-----------|-------|
| Hair Color | Blonde |
| Eye Color | Blue |
| Build | Lean, strong, refined |
| Height | 195cm |
| Aesthetic | Ancestral nobility, old-world aristocratic |

### Visual Fusion Model

**Core Principle:** Visual inheritance ≠ Genealogical inheritance

#### Character-Specific Inheritance

| Character | Classification | Hair | Eyes | Build |
|-----------|---------------|------|------|-------|
| Malachia | Douglas-visual-dominant | Black | Amber | Tank-like |
| Noah | Bloodmoon-visual-dominant | Blonde | Blue | Lithe elegant |
| Alyssa | Fusion-visual (maternal) | Caramel-brown | Mint green | Petite hourglass |
| Jasper | Fusion-visual (twin) | Caramel-brown | Mint green | Lean athletic |

#### Nixara Bloodmoon Visual Template

| Attribute | Value |
|-----------|-------|
| Height | 165 cm |
| Body | Petite hourglass |
| Face | Soft facial structure, delicate jawline |
| Eyes | Ice Blue |
| Hair | Blonde, tailbone-length |

#### Canonical Fusion Rule

```
Alyssa = Morphological Inheritance (Nixara silhouette)
Noah = Chromatic Inheritance (Bloodmoon coloration)
```

### Visual Authority Independence

**Visual Authority IS INDEPENDENT from Genealogy Authority.** Visual Authority references (read-only) parent-child relationships from Family Authority for inheritance context. Visual Authority may NOT define genealogical relationships, dynasty membership, or surname authority.

### Canonical Inheritance Patterns

| Pattern | Definition | Example |
|---------|-----------|---------|
| Douglas-visual-dominant | Strongest Douglas coloration | Malachia |
| Bloodmoon-visual-dominant | Strongest Bloodmoon coloration | Noah |
| Fusion-visual | Blended characteristics | Alyssa, Jasper |
| Maternal-resemblance | Daughter resembles mother most | Alyssa (Nixara) |

### Inference Policy

**EXPLICITLY PROHIBITED:** Runtime inference of new visual facts.

## Authority

- **Established by:** Visual Authority & Architecture Review
- **Approved by:** Runtime Validation
- **Depends on:** ADR-000, ADR-001, ADR-002, ADR-003
