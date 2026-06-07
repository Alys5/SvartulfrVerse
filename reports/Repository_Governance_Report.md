# Repository Governance Report

**Date:** 2026-06-07  
**Document Reference:** core/Repository_Governance.md  
**Status:** COMPLETE

---

## Executive Summary

This report documents the Repository Governance document — the mandatory workflow for all future canon additions to SvartulfrVerse.

The governance document establishes:
- Authority source hierarchy
- Canon Recovery Workflow (5 steps)
- Import restrictions and prohibitions
- Enforcement principles

**Type:** Repository Operating Rule (NOT an ADR)

---

## Purpose

The Repository Governance document prevents:

| Risk | Description | Prevention |
|------|-------------|------------|
| Migration Drift | Information changing during import | Mandatory audit workflow |
| Archive Contamination | Historical errors propagating | Evidence ≠ Canon principle |
| Authority Duplication | Same data owned by multiple layers | Single source of truth |
| Direct Imports | Bypassing audit and review | Prohibited by governance |

---

## Rules Defined

### Core Principle

> Archive evidence does not become canon automatically.

All information must pass through the Canon Recovery Workflow before entering the repository.

---

### Authority Sources

| Priority | Source | Role |
|----------|--------|------|
| 1 | NotebookLM | Primary research source |
| 2 | Svartulfr_LA archive | Secondary reference |
| 3 | Progetti archive | Tertiary reference |
| 4 | Historical reports | Supporting evidence |

**Critical:** These are research sources, NOT canonical authority.

---

### Authority Hierarchy

```
ADRs (highest)
    ↓
Authority Records
    ↓
Imported Canon
    ↓
Experience Content
    ↓
Historical Archive (lowest)
```

---

## Canon Recovery Workflow

### Step 1: Research

| Aspect | Definition |
|--------|------------|
| Objective | Collect evidence from archive sources |
| Activities | Query NotebookLM, review archives, compile reports |
| Output | Research collection (raw evidence) |
| Status | EVIDENCE ONLY — Not eligible for import |

---

### Step 2: Recovery Audit

| Aspect | Definition |
|--------|------------|
| Objective | Produce recovery report classifying all evidence |
| Activities | Analyze evidence, identify conflicts, classify elements |
| Classifications | Stable Canon, Variant Canon, Conflicting Canon, Recommended Baseline |
| Output | Recovery Report with classification |
| Status | AUDITED — Ready for architecture review |

---

### Step 3: Architecture Review

| Aspect | Definition |
|--------|------------|
| Objective | Verify consistency with accepted ADRs |
| Checks | Ownership, Boundary, Consistency, Terminology |
| ADRs | ADR-000 through ADR-005 |
| Output | Architecture Review decision |
| Status | REVIEWED — Ready for authority decision |

---

### Step 4: Authority Decision

| Decision | Definition | Action |
|----------|------------|--------|
| ACCEPTED | Information approved for import | Proceed to Step 5 |
| REJECTED | Information contradicts canonical authority | Do not import |
| DEFERRED | Insufficient evidence or pending resolution | Hold until resolved |

| Aspect | Definition |
|--------|------------|
| Output | Authority Decision record |
| Status | DECIDED — Ready for import (if accepted) |

---

### Step 5: Import

| Aspect | Definition |
|--------|------------|
| Objective | Enter approved information into canonical records |
| Destinations | `authority/family/`, `authority/visual/`, future `characters/` |
| Rules | Only ACCEPTED information, correct layer, reference decision |
| Status | CANONICAL — Information is now part of repository |

---

## Import Restrictions

### Prohibited Actions

| Action | Reason |
|--------|--------|
| Direct archive imports | Bypasses audit and review |
| Copy-paste migration | Propagates drift and errors |
| World-layer canon creation | Worlds are consumers, not owners |
| Experience-layer canon creation | Experiences are consumers, not owners |
| Character-defined genealogy | Genealogy belongs to Family Authority |
| Character-defined appearance | Appearance belongs to Visual Authority |

### Required Sequence

```
Audit → Review → Import
```

No shortcuts. No exceptions.

---

## Special Rules

### Character Recovery Rule

No character may enter until:
- Recovery audit completed
- Architecture review completed
- Authority decision completed

### Family Authority Rule

Genealogy must enter `authority/family/` before appearing anywhere else.

Character files reference genealogy. They do not define genealogy.

### Visual Authority Rule

Appearance data must enter `authority/visual/` before appearing anywhere else.

Character files reference appearance. They do not own appearance authority.

### Future Expansion Rule

Worlds, scenarios, and experiences are consumers.

They are NOT authority sources.

---

## Enforcement Principles

| Principle | Definition |
|-----------|------------|
| No Bypass | Workflow is mandatory |
| Evidence ≠ Canon | Historical evidence requires processing |
| Authority Hierarchy | ADRs supersede historical evidence |
| Single Source of Truth | Each domain has one owner |
| Audit Trail Required | All imports must reference decisions |
| Rejection is Valid | REJECTED information must not enter |

---

## Governance Verification

Before any import, verify:

| Check | Question |
|-------|----------|
| Workflow | Has this passed through all 5 steps? |
| Authority | Is this entering the correct layer? |
| Ownership | Does this layer own this domain? |
| Consistency | Does this contradict any ADR? |
| Audit | Is there a recovery report? |
| Decision | Is there an authority decision? |

**If any check fails: STOP. Do not import.**

---

## Files Created

| File | Purpose | Status |
|------|---------|--------|
| [Repository_Governance.md](file:///d:/SvartulfrVerse/core/Repository_Governance.md) | Repository operating rules | CREATED |

---

## Relationship to ADRs

| Document | Type | Relationship |
|----------|------|--------------|
| ADR-000 through ADR-005 | Architectural Decision | Governance depends on ADRs |
| Repository_Governance.md | Operating Rule | Enforces ADR compliance |

**Key Distinction:**
- ADRs define WHAT the architecture is
- Governance defines HOW information enters

---

## Implementation Status

| Aspect | Status |
|--------|--------|
| Governance document | CREATED |
| Workflow defined | COMPLETE |
| Authority hierarchy | COMPLETE |
| Import restrictions | COMPLETE |
| Enforcement principles | COMPLETE |

---

## Next Steps

The governance document is now in effect. All future canon additions must follow the Canon Recovery Workflow.

**Ready for Recovery Phase.**

---

## Authority

Established by: Architecture Review & Canon Reconstruction Workspace  
Type: Repository Operating Rule  
Date: 2026-06-07  
Depends on: ADR-000, ADR-001, ADR-002, ADR-003, ADR-004, ADR-005
