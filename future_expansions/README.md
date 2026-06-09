# Future Expansions

**Status:** FROZEN

---

## Purpose

Archive future development concepts, alternate universes, historical specials, and experimental settings for possible implementation in future development cycles.

These concepts:

- Are **NOT** Active Canon
- Are **NOT** Historical Canon
- Are **NOT** Cultural Canon
- Are **NOT** runtime eligible
- Are **NOT** referenced by exporters
- Are **NOT** referenced by lorebooks
- Are **NOT** referenced by engine systems

---

## Activation Requirements

Any concept in this directory requires **ALL** of the following before it can be promoted to active development:

1. **Future ADR approval** — New Architectural Decision Record authorizing the expansion
2. **Canon review** — Full audit against existing canon for conflicts
3. **Repository audit** — Structural impact assessment
4. **Explicit promotion from frozen state** — Formal decision documented in DECISION_REGISTRY.md

Until all four conditions are met, these concepts remain **strictly frozen** and **non-runtime**.

---

## Canon Layer Classification

Per ADR-006, these concepts exist **outside** the 5-layer Canon Architecture:

| ADR-006 Layer | Applies? |
|---------------|----------|
| Active Canon (Layer 1) | ❌ No |
| Historical Canon (Layer 2) | ❌ No |
| Cultural Canon (Layer 3) | ❌ No |
| Deferred Canon (Layer 4) | ❌ No |
| Candidate Canon (Layer 5) | ❌ No |

These concepts are **pre-candidate** — they have not yet entered the Canon Layer Architecture. They are archived ideas, not proposed canon.

---

## Registry

| Concept | Directory | Status | Priority | Type |
|---------|-----------|--------|----------|------|
| Origins Douglas 1666 | `origins_douglas_1666/` | Frozen | High | Historical Special |
| Origins Bloodmoon 827 | `origins_bloodmoon_827/` | Frozen | High | Historical Special |
| What If Space Opera | `whatif_space_opera/` | Frozen | Medium | Alternate Universe |
| What If Supernatural | `whatif_supernatural/` | Frozen | Medium | Alternate Universe |

---

## Directory Structure

```text
future_expansions/
├── README.md                          — This file (master index)
├── origins_douglas_1666/
│   ├── README.md                      — Concept documentation
│   └── legacy_materials/              — Archived legacy files (empty until populated)
├── origins_bloodmoon_827/
│   ├── README.md                      — Concept documentation
│   └── legacy_materials/              — Archived legacy files (empty until populated)
├── whatif_space_opera/
│   ├── README.md                      — Concept documentation
│   └── legacy_materials/              — Archived legacy files (empty until populated)
└── whatif_supernatural/
    ├── README.md                      — Concept documentation
    └── legacy_materials/              — Archived legacy files (empty until populated)
```

---

## Rules

1. **No canon contamination** — These concepts must never be referenced by Active Canon records
2. **No runtime inclusion** — Exporters, lorebooks, and engines must ignore this directory
3. **No automatic promotion** — Frozen status is permanent until explicitly changed via ADR
4. **Legacy materials** — The `legacy_materials/` subdirectories are for archiving relevant legacy files from `old_template_and_source/` or `Progetti` that relate to each concept
5. **Documentation only** — This directory contains planning documents, not canonical records

---

**Created:** 2026-06-09
**Canon Freeze:** v1.1 — This directory is EXCLUDED from Canon Freeze (frozen separately)
**Maintainer:** Canon Authority & Architecture
