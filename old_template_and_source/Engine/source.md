# Engine Architecture Source

## Source Files

- En_Core.js
- relationship_engine.js
- state_engine.js

## Audit Status

Status: Audited  
Date: 2026-06-07

---

## Accepted Concepts

### Layer Architecture

The legacy engine demonstrates a four-layer architecture:

```
En_  = Engine Layer
W_   = World Layer
C_   = Character Layer
Ex_  = Experience Layer
```

**Reason:** Historical precursor of current repository architecture. This taxonomy informed the design of ADR-000 through ADR-005.

---

### Governance Hierarchy

The legacy engine documents a governance philosophy:

```
Runtime
  ↓
ADR
  ↓
Workflow
  ↓
Documentation
  ↓
Templates
```

**Reason:** Represents historical governance philosophy and remains useful as architectural evidence. Runtime observation overrides architectural assumptions.

---

### World Taxonomy

The legacy engine defines a world taxonomy:

| Genre | World | Notes |
|-------|-------|-------|
| Contemporary | Base | Modern LA baseline |
| Contemporary | Urban Fantasy | Overlay (pack/werewolf) |
| Fantasy | High Fantasy | Guild/arcane |
| Fantasy | Norse Mythic | Jarn/seidr |
| Science Fiction | Cyber | Network/augmented |
| Science Fiction | Wasteland | Post-collapse |
| Historical | Regency | Drawing room era |

**Reason:** Historical evidence of world categorization. Do not preserve routing logic, aliases, or runtime mappings. Only preserve taxonomy concepts.

---

### Technical Debt Methodology

The legacy engine demonstrates structured technical debt tracking:

```
DEBT-001: Legacy Runtime Variable Names
DEBT-002: POV Override Identity Parsing
DEBT-003: World-Specific Lore in En_Core
DEBT-004: World Registry / Runtime Taxonomy Divergence
DEBT-005: Lorebook Runtime Schema Divergence
```

**Reason:** Historical evidence of structured technical debt tracking. Do not preserve implementation details.

---

### Relationship Model

Extracted from relationship_engine.js:

**Trust Model:**

| Range | State | Behavior |
|-------|-------|----------|
| 0-19 | Low Trust | Formal, surface-level, no voluntary disclosure |
| 20-49 | Cautious | Wary but willing to give benefit of doubt |
| 50-79 | Friendly | Comfortable, relaxed, open |
| 80-100 | Deep Trust | Emotionally safe, vulnerable |

**Relationship States:**

| State | Description |
|-------|-------------|
| Stranger | Unknown, emotionally distant |
| Acquaintance | Face/name known, superficial |
| Friend | Bond exists, relaxed and open |
| Close Friend | Deep emotional intimacy, secrets shared |
| Partner | Romantic involvement, physical intimacy |
| Family | Blood/pack bond, duty to protect |
| Enemy | Deep hostility, aggressive instincts |

**Reason:** Useful conceptual framework for future Experience and Relationship design.

---

### Temporary State Concept

Extracted from state_engine.js:

**Core Principle:**
```
Character Identity ≠ Temporary State
```

**Temporary States:**

| State | Behavioral Impact |
|-------|-------------------|
| Fear | Anxious responses, seek safety |
| Anger | Sharp, defensive, potentially aggressive |
| Protectiveness | Shield from perceived threats |
| Affection | Warm, emotionally open |

**Scenario States:**

| State | Behavioral Constraint |
|-------|----------------------|
| School/Workplace | Public, formal, hide illicit activities |
| Home | Private, safe, guard lowered |
| Mission/Combat | Operational, tactical awareness, rapid response |

**Reason:** Preserve only as design concept. Do not preserve implementation.

---

## Deferred Concepts

The following concepts require separate governance review:

| Concept | Status | Reason |
|---------|--------|--------|
| POV Override | Deferred | Requires ADR review |
| Lorebook Compilation | Deferred | Requires ADR review |
| Output Standardization | Deferred | Requires ADR review |
| Runtime Taxonomy Migration | Deferred | Requires ADR review |

---

## Rejected Concepts

### Runtime Simulation Systems

| System | Reason |
|--------|--------|
| Heart Rate Engine | Janitor-specific runtime mechanics |
| Temperature Engine | Not part of repository canon |
| Comfort Meter | Presentation layer only |
| Arousal Meter | Deployment/runtime behavior |
| Energy Meter | Not repository architecture |
| Vitals Tracking | Platform-specific implementation |

---

### Runtime HUD Systems

| System | Reason |
|--------|--------|
| HUD Footer | Presentation layer only |
| Status Bars | Not repository architecture |
| Output Formatting Rules | Deployment-specific |
| Mood Display | Presentation layer |
| Vitals Display | Not repository canon |

---

### Runtime NSFW Systems

| System | Reason |
|--------|--------|
| Dynamic Lore Injection | Deployment/runtime behavior |
| NSFW Gate | Not repository architecture |
| Aftercare Engine | Platform-specific |
| Bondage Logic | Runtime behavior |
| Edging Logic | Not repository canon |
| Power Exchange Runtime | Deployment-specific |

---

### World Routing Runtime

| System | Reason |
|--------|--------|
| Dimension Detection | Legacy Janitor implementation |
| Alias Routing | Not approved baseline |
| World Switching Runtime | Platform-specific |
| Transition Parsing | Runtime behavior |

---

### Pack Runtime Systems

| System | Reason |
|--------|--------|
| Pack Status | Legacy Urban Fantasy mechanics |
| Alpha Rank | Not approved baseline architecture |
| Omega Rank | Supernatural hierarchy |
| Mate Bond Runtime | Not repository canon |
| Soul Bond Runtime | Legacy mechanics |

---

### Janitor-Specific Systems

| System | Reason |
|--------|--------|
| Dynamic Lore Compiler | Platform-specific implementation |
| Scenario Injection | Deployment behavior |
| Personality Injection | Not repository architecture |
| Runtime Trigger System | Janitor-specific |
| Keyword Activation System | Platform implementation |
| Probability Activation System | Runtime behavior |

---

## Migration Notes

**No runtime code preserved.**

**No executable logic preserved.**

**No Janitor implementation preserved.**

**Only architectural concepts retained.**

The following concepts are candidates for future repository design:

| Concept | Potential Target |
|---------|-----------------|
| Layer Architecture | Informs ADR structure |
| Governance Hierarchy | Informs workflow design |
| World Taxonomy | Informs W_Template |
| Trust Model | Informs relationship design |
| Temporary State | Informs experience layer |

---

## Authority

**Extraction Type:** Engine Architecture Source  
**Date:** 2026-06-07  
**Status:** Audited — Architectural concepts preserved, runtime rejected
