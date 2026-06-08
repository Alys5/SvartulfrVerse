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

ADR Decisions > Authority Records > Active Canon > Research Evidence > Runtime Findings

Research Evidence includes: NotebookLM, Svartulfr_LA, Progetti — all evidence sources only, no authority ranking among them.

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
| **MISSING EVIDENCE** | **Required evidence not found in any authorized source — STOP evaluation, request Manual NotebookLM Audit** |

---

## Missing Evidence Rule (MANDATORY)

> **Missing Evidence = STOP CONDITION, NOT Warning Condition**

During audit, if any required attribute cannot be located in:
1. SvartulfrVerse repository
2. Svartulfr_LA archive
3. Progetti archive
4. Approved ADR records
5. Recovery Reports

the auditor MUST:
- Mark the attribute as **MISSING EVIDENCE**
- **Stop evaluation** of that attribute
- **Prohibit inference** to fill the gap
- **Prohibit reconstruction** from partial or tangential data
- **Prohibit placeholder generation** as substitute
- Request **Manual NotebookLM Audit** with specific query

### Manual NotebookLM Audit Format

```
Record Name: [Character/Entity]
Missing Data: [Specific attribute]
Why Required: [Why this data is needed]
Locations Checked: [All sources searched]
NotebookLM Query: [Specific recovery query]
```

**No character may be promoted from MISSING EVIDENCE to any canon classification without completing Manual NotebookLM Audit.**

---

## Authority

Established by: Architecture Review & Canon Reconstruction Workspace  
Date: 2026-06-07  
Updated: 2026-06-08 (Missing Evidence Rule added)  
Depends on: ADR-000, ADR-001, ADR-002, ADR-003, ADR-004, ADR-005
