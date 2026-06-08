# ADR-001: Dynastic Origins — Los Angeles Dynasty Baseline

**Status:** ACCEPTED  
**Date:** 2026-06-07  
**Title:** Canonical Origins and Genealogical Structure of the Los Angeles Dynasty

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/ADR-001_Dynastic_Origins.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Context

The repository bootstrap (ADR-000) established the need for canonical stabilization and explicitly identified legacy relationship degradation as a critical failure mode. A significant genealogical conflict exists in the historical archive regarding the lineages of Erik Douglas and Wulfnic Bloodmoon.

Before any Family Authority Layer logic is implemented, the foundational dynastic origins, early migrations, and family structures must be formally established and canonicalized. This ADR resolves the genealogical foundation for all future Los Angeles Dynasty character and family development.

## Decision

We establish the following as absolute canonical authority for the Los Angeles Dynasty baseline:

### Scope

- **Only Human** (no supernatural elements)
- **Contemporary** (2020s-2030s timeline)
- **Los Angeles Dynasty** (geographic and familial focus)

### Dynasty Origins and Early Migration

#### Bloodmoon Dynasty

- **Origin:** Iceland
- **Early Migration:** Migration from Iceland to North America occurred after 1930
- **Generation Structure:**
  - First generation in Iceland (parents of Wulfnic, born in Iceland)
  - Second generation: **Wulfnic Bloodmoon** — first American-born Bloodmoon generation
  - Third generation: **Nixara Bloodmoon** — daughter of Wulfnic Bloodmoon

#### Douglas Dynasty

- **Origin:** England
- **Migration:** Migrated to America during 1700s
- **Generation Structure:**
  - Multiple established generations in America by contemporary era
  - **Erik Douglas** — canonically established member of Douglas Dynasty (separate from Bloodmoon line)

### Genealogical Structure

#### Bloodmoon Dynasty (Pre-Union)

```
Iceland Bloodmoons (pre-1930)
    ↓
Wulfnic Bloodmoon (first American-born)
    ↓
Nixara Bloodmoon (daughter of Wulfnic)
```

#### Douglas Dynasty (Pre-Union)

```
England Douglas line (1700s+)
    ↓
    ↓ (multiple generations)
    ↓
Erik Douglas (contemporary era)
```

#### The Dynastic Union

- **Principals:** Erik Douglas + Nixara Bloodmoon
- **Result:** Douglas-Bloodmoon Line (first generation heirs)
- **Surname Authority:** All four children of Erik Douglas + Nixara Bloodmoon union carry the hyphenated **Douglas-Bloodmoon** surname as an exceptional dynastic designation
- **Mandate:** The hyphenated surname is non-negotiable for the four first-generation heirs (Malachia, Noah, Jasper, Alyssa). The surname is NOT automatically hereditary; second-generation inheritance rules are unresolved and pending ADR-003

#### Douglas-Bloodmoon Core Line (First Generation)

All of the following are children of Erik Douglas + Nixara Bloodmoon:

- Malachia Douglas-Bloodmoon
- Noah Douglas-Bloodmoon
- Jasper Douglas-Bloodmoon
- Alyssa Douglas-Bloodmoon

### Legacy Migration Drift Rejection

**EXPLICITLY REJECTED:** The historical archive contains the following genealogical claim:

```
Wulfnic Bloodmoon → Erik Douglas (father-son relationship)
```

**Status:** ANNULLED FROM CANON

**Classification:** Legacy migration drift—an error introduced during archive consolidation that fundamentally corrupts the dynastic structure.

**Canonical Reality:**
- Erik Douglas bears **NO blood relation** to Wulfnic Bloodmoon
- Wulfnic and Erik are from completely separate dynasties
- The relationship is contemporaneous (union-era), not paternal

**Rationale for Rejection:** Permitting this false relationship would imply an incestuous or conceptually flawed dynastic merge when Erik forms a union with Nixara (Wulfnic's daughter). The entire purpose of a "dynastic union" is to merge two distinct family lines. The false father-son relationship destroys this architectural integrity.

### Genealogy Authority

**This document serves as the absolute canonical genealogy authority for the Los Angeles Dynasty.**

Authority hierarchy:

1. **This ADR-001 decision** (canonical baseline)
2. Character Authority Layer decisions (references family data)
3. Historical archive documentation (read-only reference)
4. NotebookLM research data (supporting evidence only)

All contradictions between this ADR and historical sources must be immediately escalated and resolved through the Canon Recovery Workflow.

## Rationale

### Why Distinct Origins Matter

1. **Conceptual Integrity:** A dynastic union must merge two distinct entities. False paternal relationships undermine this fundamental concept.
2. **Genealogical Authenticity:** Bloodmoon (Iceland → America) and Douglas (England → America) follow different migration patterns and timelines.
3. **Authority Boundaries:** When Family Authority Layer is implemented, it requires clean root nodes for each dynasty.
4. **Future Expansion:** When additional dynasties or worlds are reintroduced, the clean Douglas + Bloodmoon baseline provides stable foundation.

### Why the False Relationship Must Be Rejected

The archived claim that "Wulfnic is Erik's father" is inconsistent with:
- The concept of a "dynastic union"
- The contemporary era timeline (Wulfnic and Erik as generational peers)
- Nixara's position as bridge between dynasties
- Contemporary academic timeline validation

## Consequences

### For Family Authority Layer Implementation

1. **Root Node Definition:** Bloodmoon and Douglas must be treated as entirely separate root nodes
2. **No Paternal Bridge:** No genealogical path may connect Wulfnic → Erik under any circumstance
3. **Lineage Validation:** All first-generation heirs trace exclusively to the Erik + Nixara union

### For Canon Recovery Workflow

- Any historical archive data referencing Wulfnic → Erik (father-son) must be immediately classified as legacy drift
- Such data must not be imported without explicit override decision

### For Character Authority Implementation

- Character files for Douglas-Bloodmoon core line members must reference only Erik + Nixara as parents
- Character files must enforce the Douglas-Bloodmoon hyphenated surname mandate

## Authority

- **Established by:** Family Authority & Canon Reconstruction Workspace
- **Approved by:** Runtime Validation
- **Supersedes:** All legacy archive genealogical claims regarding Bloodmoon + Douglas dynasties
- **Depends on:** ADR-000

**This ADR represents the canonical ground truth for Los Angeles Dynasty genealogy.**
