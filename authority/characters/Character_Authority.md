# Character Authority — Authority Record

**Authority:** Character Authority Layer (ADR-003)  
**Status:** CANONICAL  
**Scope:** Los Angeles Dynasty

---

## Purpose

This document serves as the index for all character authority records. Individual character files will be created during Phase 2 (Character Validation).

---

## Authority Definition

**Character Authority Layer owns:**

1. **Identity** — Name, pronouns, self-conception
2. **Personality** — Temperament, behavioral baseline
3. **Biography** — Personal history, memories
4. **Physical Sex** — Biological characteristics
5. **Skills** — Competencies, education
6. **Occupation** — Professional identity (baseline)
7. **Core Relationships** — Significant bonds (baseline)

**Character Authority Layer references:**

- Family Authority (genealogy, surname)
- Visual Authority (appearance)
- Experience Authority (scenario context)

---

## Character Registry

### Current Status: PENDING AUDIT

The following characters require validation before canonical import:

| Name | Dynasty | Role | Audit Status |
|------|---------|------|--------------|
| Wulfnic Bloodmoon | Bloodmoon | Founder | PENDING |
| Nixara Bloodmoon | Bloodmoon | Principal | PENDING |
| Erik Douglas | Douglas | Principal | PENDING |
| Malachia Douglas-Bloodmoon | Douglas-Bloodmoon | Heir | PENDING |
| Noah Douglas-Bloodmoon | Douglas-Bloodmoon | Heir | PENDING |
| Jasper Douglas-Bloodmoon | Douglas-Bloodmoon | Heir | PENDING |
| Alyssa Douglas-Bloodmoon | Douglas-Bloodmoon | Heir | PENDING |
| Logan Douglas | Douglas | Extended | PENDING |

---

## Character File Structure (Future)

When character files are created (Phase 2), they will follow this structure:

```
characters/
│
├── C_Wulfnic.md
├── C_Nixara.md
├── C_Erik.md
├── C_Logan.md
├── C_Malachia.md
├── C_Noah.md
├── C_Jasper.md
└── C_Alyssa.md
```

**Note:** Character files are NOT created in the current phase.

---

## Validation Requirements

Before any character can be imported:

1. **Identity Audit** — Verify name, pronouns, self-conception
2. **Personality Audit** — Verify temperament, behavioral baseline
3. **Biography Audit** — Verify personal history consistency
4. **Genealogy Alignment** — Verify family relationships match Family Authority
5. **Visual Alignment** — Verify appearance matches Visual Authority
6. **Surname Validation** — Verify surname matches Surname Authority

---

## Cross-References

- [Character_Roles.md](./Character_Roles.md) — Role assignments
- [../family/Family_Graph.md](../family/Family_Graph.md) — Family structure
- [../visual/Visual_Baseline.md](../visual/Visual_Baseline.md) — Visual baselines

---

## Authority

Established by: ADR-003  
Record custodian: Character Authority Layer  
Last validated: 2026-06-07  
**Status:** Framework only — no character files yet
