# Scenario Baseline — Authority Record

**Authority:** Experience Authority Layer (ADR-005)  
**Status:** CANONICAL  
**Scope:** Los Angeles Dynasty

---

## Purpose

This document defines the framework for scenario creation within the Los Angeles experience. Scenarios are **scenario-specific**, not canonical.

---

## Scenario Definition

A scenario is a narrative framing that:

1. **Consumes** authority layers (Character, Family, Visual)
2. **Defines** situational context (location, time, circumstances)
3. **Assigns** character roles within the scenario
4. **Extends** relationships (cannot remove canonical bonds)
5. **Overrides** occupation (scenario-scoped, baseline preserved)

---

## Scenario Structure

```
Scenario:
├── Context
│   ├── Location
│   ├── Time
│   └── Circumstances
├── Roles
│   └── [Character → Function]
├── Relationship Extensions
│   └── [New scenario-specific bonds]
└── Occupation Overrides
    └── [Scenario-specific profession]
```

---

## Scenario Constraints

### EXPLICIT PROHIBITIONS

**Scenarios MAY NOT:**

1. **Redefine Identity** — Names, pronouns, core self belong to Character Authority
2. **Redefine Genealogy** — Parent-child relationships belong to Family Authority
3. **Redefine Appearance** — Visual characteristics belong to Visual Authority
4. **Remove Relationships** — Can extend, cannot remove canonical bonds
5. **Create Canon** — Scenario data is scenario-specific, not canonical

### PERMITTED OPERATIONS

**Scenarios MAY:**

1. **Set Context** — Define location, time, circumstances
2. **Assign Roles** — Define character functions within scenario
3. **Extend Relationships** — Add scenario-specific bonds
4. **Override Occupation** — Assign scenario-specific profession (baseline preserved)

---

## Scenario Validation

Before any scenario can be activated:

| Check | Rule | Result |
|-------|------|--------|
| Identity Preservation | Scenario must preserve character identity | PASS/FAIL |
| Genealogy Preservation | Scenario must preserve family relationships | PASS/FAIL |
| Appearance Preservation | Scenario must preserve visual characteristics | PASS/FAIL |
| Extension Only | Relationships can only extend, not remove | PASS/FAIL |
| Override Scope | Occupation override is scenario-scoped only | PASS/FAIL |

---

## Scenario Registry

### Current Status: NO SCENARIOS

No scenarios are defined in the current phase.

**Future scenarios will include:**
- Family gatherings
- Corporate events
- Personal conflicts
- Relationship dynamics

**All scenarios require:**
- Character validation complete
- Visual inheritance tested
- Runtime authority tested

---

## Cross-References

- [Ex_LosAngeles.md](./Ex_LosAngeles.md) — Experience baseline
- [Runtime_Rules.md](./Runtime_Rules.md) — Runtime behavior
- [../../core/ADR-005_Experience_Authority.md](../../core/ADR-005_Experience_Authority.md) — Experience ADR

---

## Authority

Established by: ADR-005  
Record custodian: Experience Authority Layer  
Last validated: 2026-06-07  
**Status:** Framework only — no scenarios yet
