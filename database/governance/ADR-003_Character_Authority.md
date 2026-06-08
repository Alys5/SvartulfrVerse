# ADR-003: Character Authority Layer — Identity Ownership Boundaries

**Status:** ACCEPTED  
**Date:** 2026-06-07  
**Title:** Character Layer Authority and Cross-Layer Ownership Prohibition

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/ADR-003_Character_Authority.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Context

ADR-000 established the runtime baseline. ADR-001 formalized dynastic origins. ADR-002 defined Family Authority as sole custodian of genealogy. Before any character data can be imported, the Character Authority Layer must be formally defined as the sole owner of identity data while respecting authority boundaries.

## Decision

We establish the Character Authority Layer as the sole canonical source for all identity, personality, and intrinsic character data within SvartulfrVerse.

### Scope

- **Only Human** (no supernatural identity elements)
- **Contemporary** (2020s-2030s timeline)
- **Los Angeles Dynasty** (geographic and familial focus)

### Character Authority Layer Definition

**Character Layer owns:** Identity, Personality, Biography, Physical Sex, Skills, Occupation (baseline), Core Relationships (baseline).

**Character Layer references (read-only):** Genealogy (Family Authority), Surname (Family Authority), Appearance (Visual Authority).

### Cross-Authority Ownership Prohibition

| Layer | MAY NOT Define |
|-------|----------------|
| Character | Genealogy, Surname Authority, Dynasty Membership, World Setting, Scenario Framing |
| Family | Personality, Occupation, Biography, Identity |
| World | Identity, Genealogy, Personality |
| Experience | Identity, Genealogy, Visual DNA |

### Authority Boundary Matrix

| Domain | Owner | Consumers | Override |
|--------|-------|-----------|----------|
| Identity | Character | All | NO |
| Personality | Character | All | NO |
| Biography | Character | All | NO (append-only) |
| Occupation | Character | Experience | YES (scenario) |
| Core Relations | Character | Experience | YES (extend) |
| Genealogy | Family | All | NO |
| Appearance | Visual | All | NO |
| Scenario | Experience | Runtime | N/A (owns) |

### Derived Identity Elements (Computed, Not Stored)

- **Full Legal Name:** Computed from Character name + Family surname
- **Age:** Computed from birth date + scenario date
- **Family Role:** Derived from Genealogy + Character identity

### Inference Policy

**EXPLICITLY PROHIBITED:** Runtime inference of new identity facts.

**Runtime MAY:** Query records, reference data, validate claims, return read-only data.

**Runtime MAY NOT:** Infer identity from non-identity data, derive personality from behavior, modify Character Authority without explicit decision.

## Authority

- **Established by:** Character Authority & Architecture Review
- **Approved by:** Runtime Validation
- **Depends on:** ADR-000, ADR-001, ADR-002
