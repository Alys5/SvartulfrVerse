# World Authority — Directory Index

**Authority:** World Authority
**Directory:** `database/worlds/`
**ADR:** ADR-000 (Runtime Baseline), ADR-007 (Domain Separation)

---

## Purpose

This directory contains **World Authority** records only. These define the canonical setting, geography, atmosphere, and world rules for the SvartúlfrVerse.

> **Note:** Visual Authority records (phenotypes, inheritance models, identity anchors) have been migrated to `database/visuals/` per ADR-007.

---

## Records

| File | Description | Status |
|------|-------------|--------|
| `W_Contemporary.md` | Los Angeles Contemporary World — Primary world record | ✓ ACTIVE |

---

## Authority Boundary

**World Authority owns:**
- Settings (geography, atmosphere, era)
- Location definitions
- Institutional presence in the world
- World rules and invariants

**World Authority does NOT own:**
- Character appearance → `database/visuals/` (Visual Authority)
- Genealogy → `database/families/` (Family Authority)
- Character identity → `database/characters/` (Character Authority)

---

## Cross-References

| Domain | Directory | ADR |
|--------|-----------|-----|
| Visual Authority | `database/visuals/` | ADR-004, ADR-007 |
| Character Authority | `database/characters/` | ADR-003 |
| Family Authority | `database/families/` | ADR-002 |
| Experience Authority | `database/experiences/` | ADR-005 |
| Institution Authority | `database/institutions/` | — |
| Organization Authority | `database/organizations/` | — |
| Location Authority | `database/locations/` | — |
| Historical Canon | `database/historical/` | ADR-006 |
| Candidate Canon | `database/canon_candidates/` | ADR-006 |

---

## Source

Single Source of Truth: `database/` (all subdirectories)
Governance: `core/ADR-*.md`
