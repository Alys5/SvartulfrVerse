# ADR-005: Experience Authority Layer — Scenario Framing Architecture

**Status:** ACCEPTED  
**Date:** 2026-06-07  
**Title:** Experience Authority Layer Definition and Scenario Ownership Model

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/ADR-005_Experience_Authority.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Context

ADR-000 through ADR-004 established the core authority layers. Experience Layer represents the scenario framing system — the context in which characters exist and interact. This layer must prevent scenario definitions from corrupting canonical authority layers.

## Decision

We establish the Experience Authority Layer as the sole canonical source for all scenario, context, and situational framing data within SvartulfrVerse.

### Experience Authority Layer Definition

**Experience Layer owns (scenario-scoped):** Scenario Framing, Context State, Role Assignment, Relationship Extension, Occupation Override.

**Experience Layer references (read-only):** Identity (Character), Genealogy (Family), Appearance (Visual).

### Consumer-Owner Model

Experience Layer is a **consumer** of authority layers, not an owner. It may reference canonical data but may not modify it.

| Permission | Identity | Genealogy | Appearance | Occupation | Relations |
|------------|----------|-----------|------------|------------|-----------|
| Read | ✓ | ✓ | ✓ | ✓ | ✓ |
| Override | ✗ | ✗ | ✗ | ✓ (scenario) | ✓ (extend only) |

### Explicit Prohibitions

Experience Layer MAY NOT:
1. Redefine Character Identity
2. Redefine Genealogy
3. Redefine Dynasty Membership
4. Redefine Appearance
5. Create New Canon

### Conflict Resolution

| Conflict Type | Resolution |
|---------------|------------|
| Identity contradiction | REJECT |
| Genealogy contradiction | REJECT |
| Appearance contradiction | REJECT |
| Relationship removal | REJECT (extension only) |
| Occupation override | ACCEPT (scenario-scoped) |
| Relationship extension | ACCEPT (scenario-scoped) |

### Inference Policy

**EXPLICITLY PROHIBITED:** Runtime inference of new canonical facts from scenario context. Scenario-specific data must not be promoted to canonical authority.

## Authority

- **Established by:** Experience Authority & Architecture Review
- **Approved by:** Runtime Validation
- **Depends on:** ADR-000, ADR-001, ADR-002, ADR-003, ADR-004
