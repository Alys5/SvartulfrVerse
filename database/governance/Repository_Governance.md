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

## Authority Sources

| Priority | Source | Role |
|----------|--------|------|
| 1 | NotebookLM | Primary research |
| 2 | Svartulfr_LA archive | Secondary reference |
| 3 | Progetti archive | Tertiary reference |
| 4 | Historical reports | Supporting evidence |

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

## Authority

Established by: Architecture Review & Canon Reconstruction Workspace  
Type: Repository Operating Rule  
Date: 2026-06-07  
Supersedes: All ad-hoc import practices  
Depends on: ADR-000, ADR-001, ADR-002, ADR-003, ADR-004, ADR-005
