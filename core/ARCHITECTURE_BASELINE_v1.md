# Architecture Baseline v1.0

**Status:** BASELINE
**Date:** 2026-06-09
**Authority:** Architecture Review

---

## Purpose

This document establishes the authoritative architecture baseline for the SvartúlfrVerse repository. It serves as the **return point** before engine development (Phase 17+). Any future architectural decisions must reference this baseline.

---

## Repository Architecture

### Single Source of Truth

```
database/  ← Canonical data (SSoT)
    │
    ├── characters/       Character Authority (ADR-003)
    ├── families/         Family Authority (ADR-002)
    ├── visuals/          Visual Authority (ADR-004, ADR-007)
    ├── worlds/           World Authority
    ├── locations/        World Authority (Location)
    ├── institutions/     Institution Authority
    ├── organizations/    Institution Authority (Orgs)
    ├── experiences/      Experience Authority (ADR-005)
    ├── historical/       Historical Canon (Layer 2)
    ├── canon_candidates/ Candidate Canon (Layer 5)
    └── assets/           Visual/Asset storage
```

### Governance Layer

```
core/  ← Governance & Architecture
    │
    ├── ADR-000  Runtime Baseline
    ├── ADR-001  Dynastic Origins
    ├── ADR-002  Family Authority
    ├── ADR-003  Character Authority
    ├── ADR-004  Visual Authority Layer
    ├── ADR-005  Experience Authority
    ├── ADR-006  Canon Layer Architecture
    ├── ADR-007  Visual Authority Domain Separation
    ├── REPOSITORY_CERTIFICATION_v1
    ├── CANON_FREEZE_CERTIFICATION_v1
    └── ARCHITECTURE_BASELINE_v1  ← This document
```

### Specification Layer

```
core/  ← Specifications
    │
    ├── BOT_EXPORT_SPECIFICATION
    ├── LOREBOOK_SPECIFICATION
    ├── VALIDATION_PIPELINE_SPECIFICATION
    └── ENGINE_CONTRACT (Phase 17)
```

### Knowledge Layer

```
knowledge/  ← Reference documentation
    │
    ├── Guidelines/       Platform guides, checklists
    ├── Lore_Worldbuilding/  Export mappings, authority matrix
    └── EXTERNAL_RESOURCES_INDEX
```

---

## Authority Domain Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    SVARTÚLFRVERSE AUTHORITY MAP                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │ CHARACTER       │    │ FAMILY          │                    │
│  │ AUTHORITY       │    │ AUTHORITY       │                    │
│  │                 │    │                 │                    │
│  │ Identity        │◄───│ Genealogy       │                    │
│  │ Personality     │    │ Marriages       │                    │
│  │ Biography       │    │ Surnames        │                    │
│  │ Skills          │    │ Parent-Child    │                    │
│  │ Education       │    └─────────────────┘                    │
│  │ Occupation      │                                           │
│  └────────┬────────┘                                           │
│           │                                                     │
│           │ references                                          │
│           ▼                                                     │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │ VISUAL          │    │ WORLD           │                    │
│  │ AUTHORITY       │    │ AUTHORITY       │                    │
│  │                 │    │                 │                    │
│  │ Phenotypes      │    │ Settings        │                    │
│  │ Identity Anchors│    │ Geography       │                    │
│  │ Inheritance     │    │ Atmosphere      │                    │
│  │ Generation      │    │ Institutions    │                    │
│  └─────────────────┘    └─────────────────┘                    │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                    │
│  │ EXPERIENCE      │    │ HISTORICAL      │                    │
│  │ AUTHORITY       │    │ CANON           │                    │
│  │                 │    │                 │                    │
│  │ Scenarios       │    │ Dynastic Origins│                    │
│  │ Context         │    │ Lineages        │                    │
│  │ Roles           │    │ Founders        │                    │
│  │ Overrides       │    │ Commercial      │                    │
│  └─────────────────┘    └─────────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Canon Layer Architecture (ADR-006)

```
Layer 1: Active Canon        ← 38 records (runtime-eligible)
Layer 2: Historical Canon     ← 2 records (reference-only)
Layer 3: Cultural Canon       ← 0 records (narrative flavor)
Layer 4: Deferred Canon      ← 0 records (future expansion)
Layer 5: Candidate Canon      ← 0 records (pending review)
```

---

## Key Architectural Decisions

| ADR | Decision | Date |
|-----|----------|------|
| ADR-000 | Runtime Baseline — Human only, Contemporary LA | 2026-06-07 |
| ADR-001 | Dynastic Origins — Douglas (England) + Bloodmoon (Iceland) | 2026-06-07 |
| ADR-002 | Family Authority — Genealogy ownership | 2026-06-07 |
| ADR-003 | Character Authority — Identity ownership | 2026-06-07 |
| ADR-004 | Visual Authority — Appearance & Inheritance ownership | 2026-06-07 |
| ADR-005 | Experience Authority — Scenario & Context ownership | 2026-06-07 |
| ADR-006 | Canon Layer Architecture — 5-layer system | 2026-06-07 |
| ADR-007 | Visual Authority Domain — Separate `visuals/` directory | 2026-06-09 |

---

## Migration Status

| Phase | Status | Date |
|-------|--------|------|
| Legacy Recovery | ✅ COMPLETE | 2026-06-08 |
| Source Integration | ✅ COMPLETE | 2026-06-08 |
| Legacy Purge | ✅ COMPLETE | 2026-06-09 |
| Authority Separation | ✅ COMPLETE | 2026-06-09 |
| Repository Stabilization | ✅ COMPLETE | 2026-06-09 |
| Freeze Certification | ✅ COMPLETE | 2026-06-09 |

---

## Engine Readiness

| Criterion | Status |
|-----------|--------|
| Repository Stable | ✅ YES |
| Canon Frozen | ✅ YES |
| Authority Boundaries Validated | ✅ YES |
| Orphans Resolved | ✅ YES |
| Cross-References Intact | ✅ YES |
| Migration Closed | ✅ YES |
| **Engine Development Approved** | ✅ **YES** |

---

## Future Expansion Vectors

| Vector | Layer | Status |
|--------|-------|--------|
| Supernatural content | L3 Cultural / L4 Deferred | Not started |
| Sci-Fi timeline | L4 Deferred | Not started |
| Additional characters | L1 Active (via workflow) | Available |
| Additional locations | L1 Active (via workflow) | Available |
| Additional experiences | L1 Active (via workflow) | Available |
| Events system | L1 Active (new directory) | Not started |

---

## Baseline Integrity

This baseline is **immutable** without a new ADR. Any structural changes to the repository architecture require:

1. ADR proposal
2. Architecture Review
3. Authority Decision
4. Migration plan
5. Baseline update

---

**Established by:** Architecture Review
**Date:** 2026-06-09
**Version:** v1.0
**Next Review:** Phase 17.0 (Engine Architecture)
