# Architecture

## Core Principles

### Runtime First
Runtime behavior overrides documentation. Architecture must serve runtime requirements, not the reverse. Repository construction follows the hierarchy:

```
Runtime
>
Architecture
>
Workflow
>
Documentation
```

### Preserve Behavior Before Refactoring
The purpose of architectural decisions is canonical stabilization, not modernization, optimization, or feature expansion. Existing validated behavior is preserved before any refactoring occurs.

### Knowledge vs Behavior Separation
The repository maintains clear separation between:
- **Knowledge Layer:** Static canonical facts (family relationships, dynasty lineages, character identities)
- **Behavior Layer:** Runtime logic (state changes, relationship calculations, experience processing)

This separation prevents canonical drift and enables independent validation.

### Character Canonicality
Each character has a single canonical form. Multiple versions across worlds, experiences, or contexts are prohibited unless explicitly validated as canonically distinct.

### Incremental Reintroduction
Content is reintroduced from the historical archive only after completing the canon recovery workflow:
1. NotebookLM Discovery
2. Archive Verification
3. Character Audit
4. Architecture Review
5. Canon Decision
6. Repository Import

### Canonical Stabilization
The primary architectural goal is canonical stability. Preventing recurrence of migration drift (occupation drift, naming drift, relationship degradation, canonical compression) takes precedence over all other concerns.

## Current Scope

### Supported

- **Only Human:** No supernatural elements, no fantasy races, no cyber-enhancements
- **Contemporary:** Modern real-world setting only
- **Los Angeles Dynasty:** Bloodmoon Dynasty, Douglas Dynasty, Douglas-Bloodmoon line

### Not Supported

The following content types remain in the historical archive until validated for reintroduction:

- Urban Fantasy
- Cyber
- Wasteland
- Fantasy
- Norse Mythic
- Regency
- Overlay Systems
- Pack Systems
- Supernatural Systems

## Validation Paradigm: LA_OnlyHuman_Academic_Timeline

### Principle

Character age, education, and occupation must form a plausible real-world timeline.

### Timeline Examples

- **Age 19** → Freshman / Sophomore
- **Age 22-23** → Bachelor Graduate
- **Age 25** → 3L Law Student / Graduate Student / Early Career Professional
- **Age 28** → PhD Candidate / Resident / Early Management
- **Age 31+** → Marriage / Children

### Purpose

This validation paradigm prevents migration drift toward unrealistic prodigy careers and preserves contemporary realism for the Only Human, Contemporary scope.

### Application

Any character introduced to the repository must demonstrate an academically and professionally plausible timeline. Exceptional achievements require explicit canonical justification and validation.

## Engine Layer Structure

### Core Engine (En_Core.js)
Central coordination and orchestration layer.

### Relationship Engine
Handles dynamic relationship calculations and state changes.

### State Engine
Manages character state transitions and persistence.

### Family Engine
**IMPORTANT:** This is a Knowledge Layer only, not a behavior engine.

Reserved for:
- Single source of truth for kinship relationships
- Single source of truth for dynasty relationships
- Parent-child authority
- Sibling authority
- Marriage authority
- Douglas-Bloodmoon lineage authority

No family graph or runtime logic is implemented in this layer.

## Knowledge Layer Authority

### Family Authority Before Expansion
No character relationships or family structures are introduced without family engine validation. The family engine serves as the authoritative source for all kinship and dynasty relationships.

### Canon Hierarchy

```
Runtime Validation
>
Approved Repository Canon
>
Architecture Decisions
>
Historical Archive
>
NotebookLM Research Evidence
```

When conflicts exist, runtime behavior takes precedence over repository canon, which takes precedence over historical evidence.

## Architectural Constraints

1. No direct imports from historical archive without audit
2. No character creation without family engine validation
3. No world creation without scope validation
4. No behavior implementation without architectural review
5. No canonical changes without documentation in ADR format
