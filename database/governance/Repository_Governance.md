# Repository Governance

**Status:** CANONICAL  
**Date:** 2026-06-07  
**Type:** Repository Operating Rule  
**Authority:** Architecture Review

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/Repository_Governance.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Purpose

This document defines the mandatory workflow for all future canon additions to SvartulfrVerse.

**Core Principle:** Archive evidence does not become canon automatically.

---

## Research Archives

| Source | Role |
|--------|------|
| NotebookLM | Primary Research Archive — evidence source only |
| Svartulfr_LA archive | Research Archive — evidence source only |
| Progetti archive | Research Archive — evidence source only |
| Historical reports | Supporting evidence |

Research archives are evidence sources only. They hold no canonical authority. ADRs are the highest authority.

---

## Repository Authority Hierarchy

```
ADRs (Highest authority)
  ↓
Authority Records
  ↓
Imported Canon
  ↓
Experience Content
  ↓
Historical Archive (Lowest authority)
```

**Authority Resolution:** ADR Decision > Authority Records > Imported Canon > Experience Content > Historical Archive

---

## Canon Recovery Workflow

### Step 1: Research
Collect evidence from archive sources. Output: Research collection (EVIDENCE ONLY).

### Step 2: Recovery Audit
Classify evidence as Stable Canon, Variant Canon, Conflicting Canon, or Recommended Baseline. Output: Recovery Report.

### Step 3: Architecture Review
Verify consistency with ADR-000 through ADR-005. Check ownership, boundaries, consistency, terminology. Output: Architecture Review decision.

### Step 4: Authority Decision
Determine final status: ACCEPTED, REJECTED, or DEFERRED. Output: Authority Decision record.

### Step 5: Import
Enter approved information into canonical records. Only ACCEPTED information may be imported.

---

## Import Restrictions

### PROHIBITED
- Direct archive imports
- Copy-paste migration
- World-layer canon creation
- Experience-layer canon creation
- Character-defined genealogy
- Character-defined appearance

### REQUIRED
- Audit first
- Review second
- Import third

---

## Missing Evidence Rule (MANDATORY)

> **Missing Evidence = STOP CONDITION, NOT Warning Condition**

If required evidence cannot be located in:
1. SvartulfrVerse repository
2. Svartulfr_LA archive
3. Progetti archive
4. Approved ADR records
5. Recovery Reports

the migration process MUST:
- Classify the item as **MISSING EVIDENCE**
- **Stop evaluation** for that item
- Request **Manual NotebookLM Audit**
- **Prohibit inference** of missing canon
- **Prohibit canon reconstruction** from partial data
- **Prohibit placeholder generation** as substitute for evidence

### Manual NotebookLM Audit Required

For every missing item, generate a dedicated section:

| Field | Description |
|-------|-------------|
| Record Name | Which character/world/institution is affected |
| Missing Data | What specific evidence is absent |
| Why It Is Required | Why this data is needed for migration |
| Repository Locations Checked | List of all sources searched |
| Recommended NotebookLM Query | Specific query to recover the evidence |

**No migration may proceed when required source evidence is missing.**

The correct action is: **Request Manual NotebookLM Audit** — NOT **Create New Canon**.

This rule supersedes all ad-hoc gap-filling practices and enforces ADR-000 (no migration drift) and Character Audit Protocol (evidence-first validation).

---

## Authority

Established by: Architecture Review & Canon Reconstruction Workspace  
Type: Repository Operating Rule  
Date: 2026-06-07  
Updated: 2026-06-08 (Missing Evidence Rule added)  
Supersedes: All ad-hoc import practices  
Depends on: ADR-000, ADR-001, ADR-002, ADR-003, ADR-004, ADR-005
