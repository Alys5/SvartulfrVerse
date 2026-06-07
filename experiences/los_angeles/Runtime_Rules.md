# Runtime Rules — Authority Record

**Authority:** Experience Authority Layer (ADR-005)  
**Status:** CANONICAL  
**Scope:** Los Angeles Dynasty

---

## Purpose

This document defines the runtime behavior rules for the Los Angeles experience. These rules govern how the experience layer interacts with authority layers.

---

## Runtime Principles

### Consumer-Owner Model

**Experience Layer is CONSUMER:**
- Reads from authority layers
- Cannot modify authority layers
- Cannot create new canonical facts
- All scenario data is scoped, not canonical

**Authority Layers are OWNERS:**
- Provide read-only query interfaces
- Validate scenario definitions
- May reject contradictory scenarios
- Immutable once established

---

## Runtime Behavior

### Query Flow

```
Runtime Request
    │
    ▼
Experience Layer
    │
    ├──► Character Authority (read)
    │         │
    │         └──► Identity, Personality, Biography
    │
    ├──► Family Authority (read)
    │         │
    │         └──► Genealogy, Kinship, Dynasty
    │
    └──► Visual Authority (read)
              │
              └──► Appearance, Aesthetic, Inheritance
```

### Validation Flow

```
Scenario Definition
    │
    ▼
Validation Engine
    │
    ├──► Identity Check: PASS/FAIL
    ├──► Genealogy Check: PASS/FAIL
    ├──► Appearance Check: PASS/FAIL
    ├──► Extension Check: PASS/FAIL
    └──► Override Check: PASS/FAIL
    │
    ▼
All PASS → Scenario Active
Any FAIL → Scenario Rejected
```

---

## Runtime Constraints

### Inference Prohibition

**EXPLICITLY PROHIBITED:**
- Runtime inference of new canonical facts
- Promoting scenario data to canonical
- Deriving new genealogy from behavior
- Inferring identity from context

### Permitted Operations

**Runtime MAY:**
- Query authority layers for context
- Compute derived relationships (sibling, grandparent, etc.)
- Validate scenario definitions
- Log queries for audit trail

**Runtime MAY NOT:**
- Store derived relationships as canon
- Modify authority layers
- Create new canonical facts
- Override immutable elements

---

## Error Handling

### Conflict Resolution

| Conflict Type | Resolution |
|---------------|------------|
| Identity contradiction | REJECT scenario |
| Genealogy contradiction | REJECT scenario |
| Appearance contradiction | REJECT scenario |
| Relationship removal | REJECT (extension only) |
| Occupation override | ACCEPT (scenario-scoped) |

### Audit Trail

All runtime operations must be logged:
- Query type and target
- Timestamp
- Result (success/failure)
- Rejection reason (if applicable)

---

## Cross-References

- [Ex_LosAngeles.md](./Ex_LosAngeles.md) — Experience baseline
- [Scenario_Baseline.md](./Scenario_Baseline.md) — Scenario framework
- [../../core/ADR-005_Experience_Authority.md](../../core/ADR-005_Experience_Authority.md) — Experience ADR

---

## Authority

Established by: ADR-005  
Record custodian: Experience Authority Layer  
Last validated: 2026-06-07
