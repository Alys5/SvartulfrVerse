# Family Graph — Database Record

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | authority/family/Family_Graph.md |
| Authority | Family Authority |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Purpose

This document defines the canonical family graph structure for the Los Angeles Dynasty. All genealogical relationships flow from this graph.

---

## Graph Structure

### Root Nodes

```
┌─────────────────────────────────────────────────────────────────┐
│                      FAMILY GRAPH                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [ROOT A]                    [ROOT B]                           │
│  Bloodmoon Dynasty           Douglas Dynasty                    │
│  (Iceland origin)            (England origin)                   │
│       │                            │                            │
│       ▼                            ▼                            │
│  Wulfnic Bloodmoon          [Douglas Patriarch]                 │
│       │                            │                            │
│       │                    ┌───────┴───────┐                    │
│       │                    ▼               ▼                    │
│       │              Erik Douglas    Logan Douglas              │
│       │              (eldest)        (younger brother)          │
│       │                    │                                    │
│  Nixara Bloodmoon ─────────┤                                    │
│       │                    │                                    │
│       │      [UNION NODE]  │                                    │
│       └────────────────────┘                                    │
│                    │                                            │
│                    ▼                                            │
│         ┌─────────────────────┐                                 │
│         │ Douglas-Bloodmoon   │                                 │
│         │    First Gen        │                                 │
│         └─────────────────────┘                                 │
│                    │                                            │
│     ┌──────────────┼──────────────┬──────────────┐             │
│     ▼              ▼              ▼              ▼             │
│  Malachia       Noah         Jasper        Alyssa              │
│                                                                 │
│  [Logan = Paternal Uncle to all four heirs]                     │
│                                                                 │
│  Logan Douglas (1975)                                           │
│       │                                                         │
│       └── Edric Douglas (2018)                                  │
│             Surname: Douglas (paternal line)                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Node Definitions

### Root Node A: Bloodmoon Dynasty

| Property | Value |
|----------|-------|
| Type | Dynasty Root |
| Origin | Iceland |
| First American | Wulfnic Bloodmoon |
| Generation | Pre-union |

### Root Node B: Douglas Dynasty

| Property | Value |
|----------|-------|
| Type | Dynasty Root |
| Origin | England |
| Migration Era | 1700s |
| Representative | Erik Douglas |
| Generation | Pre-union |

### Union Node: Douglas-Bloodmoon

| Property | Value |
|----------|-------|
| Type | Dynastic Union |
| Principals | Erik Douglas + Nixara Bloodmoon |
| Result | Douglas-Bloodmoon Line |
| Surname | Hyphenated (mandatory for first gen) |

### Leaf Nodes: First Generation Heirs

| Name | Parents | Surname | Status |
|------|---------|---------|--------|
| Malachia | Erik + Nixara | Douglas-Bloodmoon | Canonical |
| Noah | Erik + Nixara | Douglas-Bloodmoon | Canonical |
| Jasper | Erik + Nixara | Douglas-Bloodmoon | Canonical |
| Alyssa | Erik + Nixara | Douglas-Bloodmoon | Canonical |

### Leaf Nodes: Second Generation

| Name | Parents | Surname | Status |
|------|---------|---------|--------|
| Edric | Logan Douglas | Douglas | Canonical |

---

## Edge Definitions

### Parent-Child Edges

| Parent | Child | Type | Authority |
|--------|-------|------|-----------|
| Wulfnic Bloodmoon | Nixara Bloodmoon | Biological | ADR-001 |
| Erik Douglas | Malachia | Biological | ADR-001 |
| Erik Douglas | Noah | Biological | ADR-001 |
| Erik Douglas | Jasper | Biological | ADR-001 |
| Erik Douglas | Alyssa | Biological | ADR-001 |
| Nixara Bloodmoon | Malachia | Biological | ADR-001 |
| Nixara Bloodmoon | Noah | Biological | ADR-001 |
| Nixara Bloodmoon | Jasper | Biological | ADR-001 |
| Nixara Bloodmoon | Alyssa | Biological | ADR-001 |

### Parent-Child Edges (Second Generation)

| Parent | Child | Type | Authority |
|--------|-------|------|-----------|
| Logan Douglas | Edric Douglas | Biological | ADR-001 |

### Marriage Edges

| Partner A | Partner B | Type | Authority |
|-----------|-----------|------|-----------|
| Erik Douglas | Nixara Bloodmoon | Dynastic Union | ADR-001 |

---

## Prohibited Edges

**EXPLICITLY REJECTED:**

| Edge | Reason | Status |
|------|--------|--------|
| Wulfnic → Erik (father) | Legacy drift | REJECTED |
| Erik → Wulfnic (son) | Legacy drift | REJECTED |

---

## Query Interface

### Valid Queries

- `getParents(child)` → Returns parent nodes
- `getChildren(parent)` → Returns child nodes
- `getSiblings(node)` → Returns sibling nodes (derived)
- `getDynasty(node)` → Returns dynasty membership
- `getUnion(node)` → Returns union context

### Invalid Queries

- `getGrandparents()` → Must be derived from parent edges
- `getAuntsUncles()` → Must be derived from parent + sibling edges
- `getCousins()` → Must be derived from multiple edges

---

## Authority

Established by: ADR-001, ADR-002
Record custodian: Family Authority Layer
Last validated: 2026-06-08
Migrated: 2026-06-08
Updated: 2026-06-08 (Logan Douglas added as Erik's brother per Canonization Decision)
