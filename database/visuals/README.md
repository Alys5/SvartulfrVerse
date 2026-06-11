# Visual Authority — Directory Index

**Authority:** Visual Authority
**Directory:** `database/visuals/`
**ADR:** ADR-004 (Visual Authority Layer), ADR-007 (Domain Separation)

---

## Purpose

This directory contains **Visual Authority** records only. These define the canonical visual identity system for the SvartúlfrVerse, including phenotype baselines, character identity anchors, inheritance models, and visual generation standards.

> **Independence Test:** All records in this directory have complete meaning without any specific world setting. They define *how characters look*, not *where the story takes place*.

---

## Records

| File | Description | Status |
|------|-------------|--------|
| `V_Visual_Baseline.md` | Canonical phenotype baselines for all characters | ✓ ACTIVE |
| `V_Visual_DNA.md` | Character identity anchors + visual pipeline | ✓ ACTIVE |
| `V_Visual_Inheritance.md` | Visual Fusion Model — inheritance rules | ✓ ACTIVE |
| `V_Visual_Authority.md` | Environmental visual evidence | ✓ ACTIVE |
| `V_Visual_Reconciliation.md` | Visual canon conflict resolution report | ✓ RESOLVED |

---

## Authority Boundary

**Visual Authority owns:**
- Phenotype baselines (hair, eyes, build, skin)
- Identity anchors (character-specific visual definitions)
- Inheritance models (how appearance passes between generations)
- Visual generation standards (palettes, style guides, pipelines)
- Reconciliation reports (conflict resolution between visual sources)

**Visual Authority does NOT own:**
- Genealogical relationships → `database/families/` (Family Authority)
- Character identity/personality → `database/characters/` (Character Authority)
- World settings → `database/worlds/` (World Authority)

---

## Naming Convention

All visual authority records use the `V_` prefix:
- `V_Visual_Baseline.md` — Phenotype baselines
- `V_Visual_DNA.md` — Identity anchors
- `V_Visual_Inheritance.md` — Inheritance rules
- `V_Visual_Authority.md` — Environmental evidence
- `V_Visual_Reconciliation.md` — Reconciliation report

---

## Cross-References

| Domain | Directory | ADR |
|--------|-----------|-----|
| World Authority | `database/worlds/` | ADR-007 |
| Character Authority | `database/characters/` | ADR-003 |
| Family Authority | `database/families/` | ADR-002 |
| Experience Authority | `database/experiences/` | ADR-005 |
| Institution Authority | `database/institutions/` | — |
| Institution Authority | `database/institutions/` | — |
| Location Authority | `database/locations/` | — |
| Historical Canon | `database/historical/` | ADR-006 |
| Candidate Canon | `database/canon_candidates/` | ADR-006 |

---

## Source

Single Source of Truth: `database/` (all subdirectories)
Governance: `core/ADR-004_Visual_Authority.md`, `core/ADR-007_Visual_Authority_Domain.md`
