# ADR-002: Family Authority Layer — Genealogical Authority Architecture

**Status:** ACCEPTED  
**Date:** 2026-06-07  
**Title:** Family Authority Layer Definition and Genealogical Ownership Model

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/ADR-002_Family_Authority.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Context

ADR-000 established the runtime-first baseline. ADR-001 formalized the dynastic origins and explicitly rejected legacy genealogical drift. Before any family data can be imported, the Family Authority Layer must be formally defined as the sole owner of all genealogical data while remaining strictly knowledge-only.

## Decision

We establish the Family Authority Layer as the sole canonical source for all genealogical, kinship, and dynastic data within SvartulfrVerse.

### Scope

- **Only Human** (no supernatural genealogy)
- **Contemporary** (2020s-2030s timeline)
- **Los Angeles Dynasty** (geographic and familial focus)

### Family Authority Layer Definition

**Family Authority Layer is the sole owner and canonical custodian of:**

1. Genealogy — All parent-child descent relationships
2. Kinship — All family relationship structures
3. Lineage — All dynastic lines and inheritance chains
4. Dynastic Ownership — Dynasty membership and succession
5. Surname Authority — Authorized family surnames and naming conventions

**Constraints:**
- **Knowledge-Only Custodian** — No behavioral computation, no state management
- **Immutable Records** — Once established, genealogical facts do not change
- **Single Source of Truth** — All genealogy flows from Family Authority
- **Authority-Driven** — Decisions governed by explicit ADR

### Canonical Ownership Model

| Layer | Owns | Prohibited |
|-------|------|------------|
| Character | Identity, personality, biography, skills, education | Genealogy definition, surname authority, dynasty ownership |
| World/Experience | Context, occupation, residence, scenario role | Genealogy definition, family structure, inheritance rules |
| Family Authority | Genealogy, kinship, lineage, dynastic membership, surnames | Character identity, experience context, behavioral computation |

### Canonical Relationship Authority

**Explicit Authority Records (stored):**
- Parent — Biological or adoptive parent relationship (immutable)
- Child — Biological or adoptive child relationship (immutable)
- Marriage — Legal union creating joint family unit
- Former Marriage — Ended through divorce, annulment, or death
- Adoption — Legal parent-child connection without biological descent
- Half-Sibling — Sibling sharing only one parent

**Derived Relationships (computed, never stored):**
- Sibling — Derived from shared parent(s)
- Grandparent/Grandchild — Transitive parent/child
- Uncle/Aunt — Sibling of parent
- Nephew/Niece — Child of sibling
- Cousin — Child of parent's sibling
- In-Law — Spouse of relative

### Dynasty Authority

#### Bloodmoon Dynasty
- Origin: Iceland → North America (post-1930)
- American Founder: Wulfnic Bloodmoon
- Current Primary Member: Nixara Bloodmoon

#### Douglas Dynasty
- Origin: England → America (1700s)
- Current Primary Member: Erik Douglas

#### Douglas-Bloodmoon Dynasty
- Origin: Union of Erik Douglas + Nixara Bloodmoon
- Membership: Exclusively children of Erik + Nixara union
- Current Members: Erik, Nixara, Malachia, Noah, Jasper, Alyssa

### Surname Authority

| Surname | Authority | Rules |
|---------|-----------|-------|
| Douglas | English Douglas Dynasty | Patrilineal descent |
| Bloodmoon | Icelandic Bloodmoon Dynasty | Standard descent |
| Douglas-Bloodmoon | Erik + Nixara union | **Hyphen mandatory** for first generation. NOT automatically hereditary. Only for authorized heirs (Malachia, Noah, Jasper, Alyssa). Second-generation rules UNRESOLVED. |

### Inference Policy

**EXPLICITLY PROHIBITED:** Runtime inference of new genealogical facts.

**Runtime MAY:** Query records, compute derived relationships, validate claims, return read-only data.

**Runtime MAY NOT:** Infer genealogy from non-genealogical data, assume family membership, modify Family Authority records without explicit decision, store derived relationships as independent facts.

## Explicitly Prohibited Actions

1. Modification of family_engine.js (implementation deferred)
2. Creation of genealogy data without ADR audit
3. Creation of family graph entries in code
4. Character file creation until Character Authority ADR approved
5. World file creation defining genealogy
6. Introduction of runtime logic for relationship inference

## Authority

- **Established by:** Family Authority & Canon Reconstruction Workspace
- **Approved by:** Runtime Validation
- **Supersedes:** All legacy genealogy practices in Progetti archive
- **Depends on:** ADR-000, ADR-001

**This ADR represents the canonical family authority governance model for SvartulfrVerse.**
