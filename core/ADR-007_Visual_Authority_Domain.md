# ADR-007: Visual Authority Domain — Directory Separation

**Status:** ACCEPTED
**Date:** 2026-06-09
**Title:** Visual Authority Domain Separation from World Authority

## Context

ADR-004 established the Visual Authority Layer as an independent authority domain, separate from Family Authority, Character Authority, and World Authority. However, during the migration phase, visual authority records were placed in `database/worlds/` alongside worldbuilding records for convenience.

The `database/worlds/README.md` explicitly acknowledged this mixed state, listing both "World Records" and "Visual Records" under the same domain. This was always intended as a temporary measure.

## Decision

We formally separate the Visual Authority domain into its own directory structure, distinct from World Authority.

### New Directory Structure

```
database/
├── worlds/              ← World Authority ONLY
│   └── W_Contemporary.md
│
├── visuals/             ← Visual Authority ONLY
│   ├── V_Visual_Baseline.md
│   ├── V_Visual_DNA.md
│   ├── V_Visual_Inheritance.md
│   ├── V_Visual_Authority.md
│   └── V_Visual_Reconciliation.md
```

### Naming Convention

| Old Name | New Name | Rationale |
|----------|----------|-----------|
| `W_Visual_Baseline.md` | `V_Visual_Baseline.md` | `V_` prefix = Visual Authority |
| `W_Visual_DNA.md` | `V_Visual_DNA.md` | `V_` prefix = Visual Authority |
| `W_Visual_Inheritance.md` | `V_Visual_Inheritance.md` | `V_` prefix = Visual Authority |
| `W_Visual_Authority.md` | `V_Visual_Authority.md` | `V_` prefix = Visual Authority |
| `Visual_Canon_Reconciliation.md` | `V_Visual_Reconciliation.md` | `V_` prefix = Visual Authority |

### Authority Boundary

**World Authority owns:**
- Settings (geography, atmosphere, era)
- Location definitions
- Institutional presence in the world
- World rules and invariants

**Visual Authority owns:**
- Phenotype baselines (hair, eyes, build, skin)
- Identity anchors (character-specific visual definitions)
- Inheritance models (how appearance passes between generations)
- Visual generation standards (palettes, style guides, pipelines)
- Reconciliation reports (conflict resolution between visual sources)

### Independence Test

> If the record has complete meaning without any specific world setting, it belongs to Visual Authority, not World Authority.

All five migrated files pass this test: they define appearance, inheritance, and visual standards that are independent of the "Los Angeles Contemporary" setting.

## Consequences

1. **`database/worlds/`** contains only `W_Contemporary.md` — a pure worldbuilding record.
2. **`database/visuals/`** contains all visual authority records — a pure visual canon domain.
3. All cross-references in other domains (`characters/`, `experiences/`, `locations/`, `institutions/`) are updated to point to `visuals/` instead of `worlds/`.
4. ADR-004 is updated to reference ADR-007 as the directory authority.

## Migration

| Step | Action | Status |
|------|--------|--------|
| 1 | Create `database/visuals/` directory | ✅ |
| 2 | Move and rename 5 files from `worlds/` to `visuals/` | ✅ |
| 3 | Update all cross-references in repository | ✅ |
| 4 | Update `worlds/README.md` | ✅ |
| 5 | Create `visuals/README.md` | ✅ |
| 6 | Update ADR-004 to reference ADR-007 | ✅ |

## Compliance Mapping (JanitorAI)

| Elemento Architetturale | Implementazione JanitorAI | Note di Runtime |
| --- | --- | --- |
| Directory Separation | `database/visuals/` vs `database/worlds/` | Lorebook compiler reads from correct authority directory; cross-references validated during export |
| Naming Convention | `V_` prefix for visual records, `W_` prefix for world records | Automated validation ensures no visual files in world directory and vice versa |
| World Directory Purity | `database/worlds/` contains only `W_Contemporary.md` | No visual records mixed with world rules; simplifies lorebook compilation pipeline |
| Visual Authority Independence | Visual records are world-agnostic | Appearance definitions (palettes, style guides, baselines) portable across future world settings |

---

## Authority

**Established by:** Architecture Review & Authority Decision
**Date:** 2026-06-09
**Depends on:** ADR-004
**Supersedes:** Mixed `worlds/` + visual authority arrangement
