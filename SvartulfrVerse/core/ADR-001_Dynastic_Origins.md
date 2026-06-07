# ADR-001: Dynastic Origins - Los Angeles Dynasty Baseline

## Status

Accepted

## Context

The repository initialization established the need for canonical stabilization and explicitly identified legacy relationship degradation as a failure to prevent. A critical genealogical conflict exists in the historical archive regarding the lineages of Erik Douglas and Wulfnic Bloodmoon. To establish a true foundation for the Los Angeles Dynasty, the origins, early migrations, and fundamental family structures must be formalized before any Family Authority Layer logic is implemented.

## Decision

We establish the following canonical origins and genealogical structure as the absolute authority for the Family Authority Layer.

### Scope
- Only Human
- Contemporary
- Los Angeles Dynasty

### 1. Dynasty Origins and Migration
- **Bloodmoon Dynasty:** Originates in Iceland. The dynasty underwent an early 20th-century migration from Iceland to America.
- **Douglas Dynasty:** Originates in England, followed by a subsequent migration to America.

### 2. Generational Structure
- **Wulfnic Bloodmoon:** Recognized as the first American-born generation of the Bloodmoon Dynasty.
- **Nixara Bloodmoon:** Canonically established as the daughter of Wulfnic Bloodmoon.
- **Erik Douglas:** Canonically established as a member of the separate Douglas Dynasty.

### 3. Dynastic Union and Surname Authority
- **The Union:** The core dynastic union is formed between Erik Douglas and Nixara Bloodmoon.
- **Douglas-Bloodmoon Line:** This union singularly creates the Douglas-Bloodmoon line.
- **Surname Authority Rules:** All heirs resulting from the union of Erik and Nixara inherently belong to the Douglas-Bloodmoon line, and the hyphenated surname is the authoritative, mandated convention for these heirs.

### 4. Legacy Migration Drift Rejection
- We explicitly **reject** the historically migrated genealogy that defines the relationship: `Wulfnic → Erik (father-son)`.
- This father-son relationship is formally identified as legacy migration drift and annulled from canon. Erik Douglas bears no blood relation to Wulfnic Bloodmoon.

### 5. Genealogy Authority
- This document serves as the absolute canonical genealogy authority. It supersedes all historical archive entries and NotebookLM research data regarding these foundational relationships.

## Rationale

To maintain the conceptual integrity of a "Dynastic Union," the uniting families must be completely distinct entities with separate origins and histories. Permitting the legacy migration drift that positions Erik as Wulfnic's son would imply an incestuous or conceptually flawed dynastic merge when Erik forms a union with Nixara (Wulfnic's daughter). Clarifying the Icelandic (Bloodmoon) and English (Douglas) geographical origins further isolates the families prior to their American convergence.

## Consequences

- The `family_engine.js` knowledge layer must treat the Bloodmoon and Douglas lineages as entirely separate root nodes prior to the Nixara-Erik union.
- Any references to Erik as Wulfnic's son discovered during the Canon Recovery Workflow must be immediately classified as legacy drift and discarded.
- All future lineage validations for the first-generation heirs (Malachia, Noah, Jasper, Alyssa) must trace exclusively back to the Nixara-Erik union.

## Future Implementation Notes

- Future implementation within `family_engine.js` will require defining distinct origin nodes for the Bloodmoon and Douglas families.
- The `Douglas-Bloodmoon` union will need to be structured as a joint node derived from Erik and Nixara. No graph data structures or engine logic are to be created at this time.
