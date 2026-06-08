# Character Audit Protocol

**Status:** CANONICAL  
**Date:** 2026-06-07  
**Authority:** ADR-000 through ADR-005

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/Character_Audit_Protocol.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Purpose

No character may be imported without passing this audit protocol. Character recovery must occur before character import.

## Authority Sources (Precedence)

ADR Decision > NotebookLM Evidence > Archive Evidence > Runtime Findings

## Required Audit Categories

1. **Identity** — Name, Surname, Dynasty, Family Position
2. **Narrative Function** — Purpose, Role, Significance
3. **Behavioral Canon** — Personality, Behavioral Baseline, Speech Patterns
4. **Visual Canon** — Hair Color, Eye Color, Build, Height, Aesthetic
5. **Relationship Authority** — Parents, Siblings, Spouse, Extended
6. **Timeline Authority** — Age, Education, Career, Historical Events

## Classification System

| Classification | Definition | Action |
|---------------|------------|--------|
| Stable Canon | Consistent across all sources, matches ADR | Accept as baseline |
| Variant Canon | Acceptable variations, no architectural impact | Document, select primary |
| Conflicting Canon | Direct contradictions | Escalate for resolution |
| Recommended Baseline | Proposed canonical value after analysis | Subject to approval |

## Import Readiness

| Level | Definition |
|-------|------------|
| READY | All conflicts resolved, baseline established — Import permitted |
| PARTIAL | Core validated, some elements pending — Import with caveats |
| BLOCKED | Unresolved conflicts — Cannot import until resolved |

## Authority

Established by: Architecture Review & Canon Reconstruction Workspace  
Date: 2026-06-07  
Depends on: ADR-000, ADR-001, ADR-002, ADR-003, ADR-004, ADR-005
