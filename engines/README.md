# Engines Layer

## Status

**Skeleton Only**

All files are placeholder documentation.

No runtime logic implemented.

No family data populated.

No state computation.

No relationship processing.

No behavior generation.

## Purpose

Engines layer provides the knowledge and query interface for canonical data.

This layer is NOT a behavior engine.

This layer is NOT a simulator.

This layer is NOT a system generator.

This is the **query and consistency interface** for authority layers.

---

## What Engines Will Eventually Provide

- Single authoritative query interface
- Consistency verification
- Authority layer queries
- Canonical data retrieval
- Relationship lookups (read-only)
- Timeline validation
- Audit trail support

## What Engines Will Never Do

- Generate characters
- Create relationships
- Compute state changes
- Simulate behavior
- Import legacy data
- Mutate authority data
- Execute business logic

---

## Future Engine Responsibilities

**En_Core**
- Central query orchestration
- Request routing to appropriate authority engine
- Consistency verification
- Response validation

**family_engine**
- Genealogy data queries
- Kinship relationship lookups (read-only)
- Dynastic membership verification
- Surname authority queries
- Parent-child relationship queries
- Marriage relationship queries

**character_engine** (future)
- Character identity queries
- Biography retrieval
- Personality/values queries
- Education/skills verification
- Timeline validation against LA_OnlyHuman_Academic_Timeline

**state_engine**
- Current occupation queries
- Current residence queries
- Employment status queries
- Scenario role queries
- Consistency checks

**relationship_engine**
- Family relationship resolution
- Character relationship queries
- Authority layer coordination

---

## Implementation Prerequisite

No engine logic will be implemented until:

1. ADR authority framework is complete
2. Character and Family Authority boundaries are stable
3. Data schema is formally approved
4. Query interface is fully documented
5. Explicit implementation ADR is approved

Current status: **PREREQUISITE - NOT STARTED**
