# Character Roles — Authority Record

**Authority:** Character Authority Layer (ADR-003)  
**Status:** CANONICAL  
**Scope:** Los Angeles Dynasty

---

## Purpose

This document defines the canonical role assignments for Los Angeles Dynasty characters. Roles are distinct from identity—they define function within the narrative structure.

---

## Role Definitions

### Dynasty Principal

**Definition:** The primary representative of a dynasty in the contemporary era.

**Properties:**
- Single per dynasty
- Represents dynasty authority
- Union-eligible status

**Current Principals:**

| Dynasty | Principal | Status |
|---------|-----------|--------|
| Douglas | Erik Douglas | Active |
| Bloodmoon | Nixara Bloodmoon | Active |

---

### Dynasty Founder

**Definition:** The first American-born generation of a dynasty.

**Properties:**
- Historical significance
- Bridge between origin and contemporary
- Ancestral authority

**Current Founders:**

| Dynasty | Founder | Status |
|---------|---------|--------|
| Bloodmoon | Wulfnic Bloodmoon | Historical |
| Douglas | [Pre-Erik generations] | Historical |

---

### First Generation Heir

**Definition:** Children of a dynastic union.

**Properties:**
- Carries both dynasty heritages
- Hyphenated surname (mandatory)
- Bridge between dynasties

**Current Heirs:**

| Name | Parent Dynasty A | Parent Dynasty B | Status |
|------|------------------|------------------|--------|
| Malachia | Douglas | Bloodmoon | Active |
| Noah | Douglas | Bloodmoon | Active |
| Jasper | Douglas | Bloodmoon | Active |
| Alyssa | Douglas | Bloodmoon | Active |

---

### Extended Family

**Definition:** Family members outside the core dynastic line.

**Properties:**
- Dynasty membership
- Non-principal status
- Supporting narrative role

**Current Extended:**

| Name | Relation | Dynasty | Status |
|------|----------|---------|--------|
| Logan Douglas | [Pending audit] | Douglas | PENDING |

---

## Role Assignment Matrix

```
┌─────────────────────────────────────────────────────────────────────┐
│                      CHARACTER ROLE MATRIX                          │
├─────────────────┬──────────────┬─────────────┬──────────────────────┤
│ Character       │ Dynasty      │ Role        │ Generation           │
├─────────────────┼──────────────┼─────────────┼──────────────────────┤
│ Wulfnic         │ Bloodmoon    │ Founder     │ 1st American         │
│ Nixara          │ Bloodmoon    │ Principal   │ 2nd                  │
│ Erik            │ Douglas      │ Principal   │ Contemporary         │
│ Malachia        │ Douglas-Blood│ Heir        │ 1st Union            │
│ Noah            │ Douglas-Blood│ Heir        │ 1st Union            │
│ Jasper          │ Douglas-Blood│ Heir        │ 1st Union            │
│ Alyssa          │ Douglas-Blood│ Heir        │ 1st Union            │
│ Logan           │ Douglas      │ Extended    │ [Pending]            │
└─────────────────┴──────────────┴─────────────┴──────────────────────┘
```

---

## Role Constraints

1. **Single Principal:** Each dynasty has exactly one principal in the contemporary era
2. **Heir Limitation:** First generation heirs are limited to children of the union
3. **Surname Alignment:** Role must align with surname authority (see [../family/Surname_Authority.md](../family/Surname_Authority.md))
4. **Genealogy Alignment:** Role must align with family graph (see [../family/Family_Graph.md](../family/Family_Graph.md))

---

## Query Interface

### Valid Queries

```
getRole(person) → Role
getDynastyPrincipals(dynasty) → [Person]
getHeirs(union) → [Person]
getExtendedFamily(dynasty) → [Person]
```

---

## Cross-References

- [Character_Authority.md](./Character_Authority.md) — Character identity records
- [../family/Family_Graph.md](../family/Family_Graph.md) — Family structure
- [../dynasties/Douglas.md](../dynasties/Douglas.md) — Douglas Dynasty
- [../dynasties/Bloodmoon.md](../dynasties/Bloodmoon.md) — Bloodmoon Dynasty

---

## Authority

Established by: ADR-003  
Record custodian: Character Authority Layer  
Last validated: 2026-06-07
