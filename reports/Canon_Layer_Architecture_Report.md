# Canon Layer Architecture Report

**Date:** 2026-06-07  
**Subject:** Three-Tier Canon Structure for SvartúlfrVerse  
**Authority:** Architecture Review & Canon Reconstruction Workspace  
**Status:** PROPOSED ARCHITECTURE

---

## Executive Summary

This document establishes a three-tier canon architecture that resolves the historical tension between contemporary runtime requirements and legacy mythological content.

**Core Principle:**
> Legacy content is not destroyed. It is reclassified as Cultural Canon.

**Structure:**

```
┌─────────────────────────────────────────────────────────────────┐
│  ACTIVE CANON                                                   │
│  2024 | Only Human | Los Angeles                                │
│  Runtime-eligible, governance-enforced                          │
└─────────────────────────────────────────────────────────────────┘
                              ↑
                              │ derives from
                              │
┌─────────────────────────────────────────────────────────────────┐
│  HISTORICAL CANON                                               │
│  1666+ | Douglas Historical Layer                               │
│  Documented facts, verifiable records                           │
└─────────────────────────────────────────────────────────────────┘
                              ↑
                              │ intersects with
                              │
┌─────────────────────────────────────────────────────────────────┐
│  CULTURAL CANON                                                 │
│  Bloodmoon Oral Tradition                                       │
│  817 AD Iceland | Myths | Legends | Sagas | Folklore           │
│  Family stories, not runtime facts                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. Active Canon

### Definition

**Active Canon** comprises all information eligible for runtime compilation in the current baseline.

### Properties

| Property | Status |
|----------|--------|
| Runtime-eligible | ✓ Yes |
| Governance-enforced | ✓ Yes |
| Supernatural elements | ✗ Prohibited |
| Timeline | Contemporary (2020s-2030s) |
| Geographic focus | Los Angeles |

### Current Active Canon

| Character | Dynasty | Status |
|-----------|---------|--------|
| Wulfnic Bloodmoon | Bloodmoon | Active |
| Erik Douglas | Douglas | Active |
| Malachia Douglas-Bloodmoon | Douglas-Bloodmoon | Active |
| Noah Douglas-Bloodmoon | Douglas-Bloodmoon | Active |
| Jasper Douglas-Bloodmoon | Douglas-Bloodmoon | Active |
| Alyssa Douglas-Bloodmoon | Douglas-Bloodmoon | Active |
| Nixara Bloodmoon | Bloodmoon | Deceased (historical) |

### Constraints

```
Active Canon MUST:
  - Remain human-only
  - Stay within contemporary timeline
  - Follow ADR governance rules
  - Respect authority layer boundaries

Active Canon MUST NOT:
  - Include supernatural elements as facts
  - Accept mythological content as runtime truth
  - Mix Cultural Canon with Active Canon
```

---

## 2. Historical Canon

### Definition

**Historical Canon** comprises documented historical facts about the dynasties.

### Properties

| Property | Status |
|----------|--------|
| Runtime-eligible | ✓ Referenced only |
| Documentation required | ✓ Yes |
| Verifiable | ✓ Preferred |
| Timeline | 1666-present |
| Geographic focus | England → California |

### Douglas Historical Layer

```
1666
  ↓
Douglas Trading House founded
  ↓
1700s
Colonial expansion
California land acquisition
Seven Hills Estate established
  ↓
1800s
Merchant dynasty consolidation
Regional logistics network
  ↓
1900s
Industrial adaptation
Corporate transformation
  ↓
2024
Douglas Commerce Company
"Founded 1666"
```

### Historical Canon Classification

| Element | Status | Evidence |
|---------|--------|----------|
| English origin | ACCEPTED | ADR-001 |
| 1666 foundation | PENDING | Requires audit |
| Colonial expansion | ACCEPTED | Recovery Audit |
| Seven Hills Estate | ACCEPTED | Architecture Baseline |
| Merchant tradition | ACCEPTED | Recovery Audit |
| DCC evolution | ACCEPTED | Recovery Audit |

### Historical Canon Constraints

```
Historical Canon MUST:
  - Be documented or documentable
  - Remain human-only
  - Stay within natural timeline
  - Connect to Active Canon through lineage

Historical Canon MUST NOT:
  - Include mythological elements as facts
  - Contradict Active Canon
  - Require supernatural explanation
```

---

## 3. Cultural Canon

### Definition

**Cultural Canon** comprises family stories, oral traditions, myths, and legends preserved within the Bloodmoon lineage.

### Properties

| Property | Status |
|----------|--------|
| Runtime-eligible | ✗ No (reference only) |
| Documentation | Oral tradition |
| Verifiable | ✗ Not required |
| Timeline | 817 AD-present |
| Geographic focus | Iceland → America |

### Bloodmoon Oral Tradition

```
817 AD
  ↓
Iceland
Svartúlfr clan
Viking Age settlements
  ↓
Oral tradition begins
Sagas
Myths
Legends
  ↓
Migration (1930s)
Stories carried to America
  ↓
Wulfnic as custodian
Stories told to Nixara
  ↓
Stories told to grandchildren
Alyssa asks questions
```

### Cultural Canon Content

| Element | Classification | Notes |
|---------|----------------|-------|
| Svartúlfr (Black Wolf) | CULTURAL | Ancestral clan identity |
| Fenrir | CULTURAL | Mythological reference |
| Werewolves | CULTURAL | Family legend |
| Trolls | CULTURAL | Folklore element |
| Draugr | CULTURAL | Undead myth |
| Seiðr | CULTURAL | Magic tradition |
| Jötnar | CULTURAL | Giant myths |
| Moon spirits | CULTURAL | Spiritual element |
| Alpha hierarchy | CULTURAL | Storytelling metaphor |

### Critical Distinction

```
Cultural Canon IS:
  - Stories the Bloodmoon family tells
  - Part of family identity and heritage
  - Preserved through oral tradition
  - Valid as cultural expression

Cultural Canon IS NOT:
  - Runtime facts
  - Supernatural truth
  - Active Canon elements
  - Required belief
```

---

## 4. Layer Interaction Model

### Dynasty Duality Integration

| Dynasty | Primary Layer | Secondary Layer |
|---------|---------------|-----------------|
| Douglas | Historical Canon | Documents, Contracts |
| Bloodmoon | Cultural Canon | Memory, Stories |

```
Douglas (Documentary):
  - Land deeds
  - Corporate records
  - Legal contracts
  - Institutional history
  - Verifiable facts

Bloodmoon (Narrative):
  - Family sagas
  - Oral traditions
  - Ancestral myths
  - Cultural identity
  - Preserved stories
```

### Layer Separation Principle

```
Active Canon queries Historical Canon for:
  - Genealogy verification
  - Property records
  - Corporate history

Active Canon references Cultural Canon for:
  - Character background
  - Family traditions
  - Cultural expressions
  - Dialogue flavor

Active Canon MUST NOT:
  - Treat Cultural Canon as factual
  - Compile myths into runtime
  - Require supernatural explanation
```

---

## 5. Practical Application

### Example: Alyssa's Question

**Scenario:** Alyssa asks Wulfnic about the family legends.

**Question:**
> "Nonno, ma i lupi neri esistevano davvero?"

**Possible Response:**
> "No."
>
> *pausa*
>
> "Ma questa non è la domanda giusta."

**Interpretation:**
- Wulfnic confirms the literal answer (no, werewolves are not real)
- Wulfnic redirects to the cultural significance (the stories matter)
- This is exactly how a custodian of family memory would respond

### Example: Norse Elements

**Legacy Content:**
```
Werewolves
Fenrir
Alpha hierarchy
Pack dynamics
```

**Reclassification:**
```
Werewolves → Bloodmoon family legends
Fenrir → Ancestral myth
Alpha hierarchy → Storytelling metaphor
Pack dynamics → Cultural narrative structure
```

**Result:**
- Content preserved
- Not destroyed
- Reclassified as Cultural Canon
- Available for character background
- Not compiled into Active Canon

---

## 6. Repository Structure Implications

### Proposed Directory Structure

```
SvartulfrVerse/
├── core/                    # ADRs, governance
├── authority/               # Active Canon records
│   ├── characters/
│   ├── family/
│   └── visual/
├── historical/             # Historical Canon
│   ├── douglas/
│   └── records/
├── cultural/               # Cultural Canon
│   ├── bloodmoon/
│   ├── sagas/
│   └── folklore/
└── reports/                 # Architecture reports
```

### Content Migration

| Current Location | Content | Target Layer |
|------------------|---------|--------------|
| archive/werewolf | Werewolf content | cultural/bloodmoon/ |
| archive/norse | Norse mythology | cultural/sagas/ |
| archive/fantasy | Fantasy elements | cultural/folklore/ |
| authority/dynasties | Douglas records | historical/douglas/ |

---

## 7. Governance Implications

### Layer Governance Rules

| Layer | Governance | Modification |
|-------|------------|--------------|
| Active Canon | Strict ADR enforcement | Requires Authority Decision |
| Historical Canon | Documentation required | Requires evidence |
| Cultural Canon | Preservation focus | Append-only |

### Cross-Layer Queries

```
Runtime MAY:
  - Query Historical Canon for facts
  - Reference Cultural Canon for flavor
  - Use Cultural Canon in character dialogue

Runtime MAY NOT:
  - Compile Cultural Canon as facts
  - Treat myths as runtime truth
  - Require supernatural explanation
```

---

## 8. Benefits

### Architectural Benefits

1. **No Content Destruction** — Legacy material is preserved
2. **Clear Separation** — Active/Historical/Cultural boundaries
3. **Cross-Baseline Coherence** — 1666 reference works everywhere
4. **Character Depth** — Cultural Canon enriches dialogue
5. **Governance Clarity** — Each layer has distinct rules

### Narrative Benefits

1. **Wulfnic's Role Validated** — Custodian of family memory
2. **Alyssa's Questions** — Natural exploration of heritage
3. **Icelandic Flavor** — Cultural expressions preserved
4. **Family Dynamics** — Douglas/Bloodmoon duality reinforced

### Repository Benefits

1. **No Fragmentation** — Single coherent universe
2. **No AU Proliferation** — Historical layer, not alternate universe
3. **Legacy Integration** — Old content reclassified, not deleted
4. **Future Expansion** — Clear path for new historical content

---

## 9. Authority Decision

### Proposed Decision

| Element | Decision |
|---------|----------|
| Three-tier architecture | PROPOSED |
| Active Canon definition | PROPOSED |
| Historical Canon definition | PROPOSED |
| Cultural Canon definition | PROPOSED |
| Layer separation principle | PROPOSED |
| Content reclassification | PROPOSED |

### Next Steps

1. Review and approve this architecture
2. Create ADR-006: Canon Layer Architecture
3. Establish directory structure
4. Begin content migration
5. Update governance rules

---

## Authority

**Report Type:** Architecture Proposal  
**Authority:** Architecture Review & Canon Reconstruction Workspace  
**Date:** 2026-06-07  
**Status:** PROPOSED — Pending approval and ADR creation
