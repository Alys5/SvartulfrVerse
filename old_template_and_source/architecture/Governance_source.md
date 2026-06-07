# Source Freeze Record

Status: FROZEN  
Freeze Date: 2026-06-07  
Purpose: Evidence preservation for future database migration.  
Authority: Source Repository  
Modification Policy: Do not edit directly. Future corrections require audit review.

---

# Architecture Governance Source

## Source File

- prompt.md

## Audit Status

Status: Audited  
Date: 2026-06-07

---

## Accepted Concepts

### Runtime First Principle

The legacy project documented a governance hierarchy:

```
Observed Runtime Behavior
  ↓
ADR
  ↓
Workflow
  ↓
Documentation
```

**Reason:** Primitive form of ADR-000. This principle remains valid: runtime observation overrides architectural assumptions.

---

### Layer Model

The legacy architecture defined four independent layers:

```
En_  = Engine Layer
W_   = World Layer
C_   = Character Layer
Ex_  = Experience Layer
```

**Reason:** Fundamental historical evidence. This taxonomy informed ADR-000 through ADR-005.

---

### Persona ≠ Character

The legacy project established:

```
Personas are NOT Characters
Personas are NEVER loaded as C_ Lorebooks
A Persona may share the identity of a canonical character
  while remaining a separate runtime entity
```

**Reason:** Still correct. This distinction should survive in the new repository.

---

### Knowledge vs Behavior

The legacy project documented a critical separation:

**Knowledge Layers MAY contain:**
- Facts
- Traits
- Preferences
- Tendencies
- Identity markers

**Knowledge Layers MUST NOT contain:**
- Runtime logic
- State transitions
- Relationship calculations
- IF/THEN systems
- Decision engines

**Reason:** This distinction is still applied in the current architecture.

---

### Lorebook Design Rules

The legacy project established:

```
Prefer: Specific → Broad
Avoid: Trigger webs
Favor: Deep hierarchies
```

Example:
```
Golden Retriever → Dog → Pet → Animal
```

**Reason:** Valid as general knowledge organization principle.

---

### Visual DNA Stack

The legacy project documented visual inheritance:

```
Global Visual DNA
  ↓
World Visual DNA
  ↓
Overlay Visual DNA
  ↓
Character Identity Anchors
```

**Reason:** Useful historical evidence for Visual Authority design.

---

### Governance Distinction

The legacy project established:

```
ADR = WHY
Workflow = HOW
Runtime = WHAT WORKS
```

**Reason:** Preserve as governance philosophy.

---

## Deferred Concepts

### World Taxonomy

The legacy project defined:

```
contemporary
  └── urban_fantasy
cyber
fantasy
  ├── high_fantasy
  └── norse_mythic
regency
wasteland
```

**Status:** Deferred  
**Reason:** ADR-006 may redefine final classification.

---

### Migration Rules

The legacy project documented:

```
1. Preserve behavior
2. Validate behavior
3. Improve architecture
4. Validate architecture
5. Optimize
6. Validate optimization
```

**Status:** Deferred  
**Reason:** Good methodology but not canon. Preserve as historical reference.

---

## Rejected Concepts

### Janitor-Specific Production Logic

| System | Reason |
|--------|--------|
| Bot Generation | Not part of repository database |
| Lorebook Refactor | Deployment workflow |
| Global Consistency Update | Platform-specific |

---

### Planned Runtime Engines

| Engine | Reason |
|--------|--------|
| trust_engine | Never implemented |
| emotion_engine | Never implemented |
| family_engine | Never implemented |
| pack_engine | Never implemented |
| scenario_engine | Never implemented |

**Reason:** These represent unimplemented design intentions, not canon.

---

### Technical Constraints

| Constraint | Reason |
|------------|--------|
| ES5 ONLY | Historical technical limitation |
| ENGLISH ONLY | Deployment constraint |
| MCP Usage | Contextual to old workflow |

**Reason:** No value for new repository architecture.

---

## Historical Notes

This document extracts architectural concepts from the legacy project's governance constitution.

**Key observation:** Approximately 90% of the value in the original file is not the text itself, but the fact that it documents the evolution of concepts that now exist as:

- ADR system (ADR-000 through ADR-006)
- Authority Model (Character, Family, Visual, Experience)
- Template Architecture (C_Template, W_Template, Ex_Template)
- Runtime First Principle (ADR-000)
- Visual Authority (ADR-004)
- Knowledge/Behavior Separation (ADR-003, ADR-005)

The original file is valuable as **historical evidence**, not as an artifact that deserves to survive integrally in the repository.

---

## Migration Notes

**No content migrated to database.**

**Concepts already absorbed by:**

| Legacy Concept | Current Implementation |
|----------------|----------------------|
| Runtime First Principle | ADR-000 |
| Layer Model | ADR-001, ADR-002, ADR-003, ADR-004, ADR-005 |
| Persona ≠ Character | Implicit in architecture |
| Knowledge vs Behavior | ADR-003, ADR-005 |
| Visual DNA Stack | ADR-004 |
| Governance Distinction | Repository_Governance.md |

---

## Authority

**Extraction Type:** Architecture Governance Source  
**Date:** 2026-06-07  
**Status:** Audited — Historical evidence preserved, duplicates avoided
