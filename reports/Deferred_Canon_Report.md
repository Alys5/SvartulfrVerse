# Deferred Canon Report

**Date:** 2026-06-07  
**Policy Reference:** core/Deferred_Canon_Policy.md  
**Status:** COMPLETE

---

## Executive Summary

This report documents the Deferred Canon Policy — the formal distinction between Active Canon, Deferred Canon, and Archive Canon.

The policy establishes:
- Three-tier canon classification system
- Import process for deferred → active transition
- Governance rules for each canon category

**Key Principle:**

> Recovery Audit does not automatically imply Runtime Inclusion.

---

## Canon Categories

### Active Canon (8 characters)

| Character | Dynasty | Role |
|-----------|---------|------|
| Wulfnic Bloodmoon | Bloodmoon | Dynasty founder |
| Nixara Bloodmoon | Bloodmoon | Dynasty principal |
| Erik Douglas | Douglas | Dynasty principal |
| Logan Douglas | Douglas | Extended family |
| Malachia Douglas-Bloodmoon | Douglas-Bloodmoon | First gen heir |
| Noah Douglas-Bloodmoon | Douglas-Bloodmoon | First gen heir |
| Jasper Douglas-Bloodmoon | Douglas-Bloodmoon | First gen heir |
| Alyssa Douglas-Bloodmoon | Douglas-Bloodmoon | First gen heir |

**Properties:**
- Allowed in `authority/`
- Allowed in active runtime
- Subject to all governance rules

---

### Deferred Canon (15 characters)

#### Political Wives (3)

| Name | Status | Notes |
|------|--------|-------|
| Sigrid | Deferred | Political wife — requires runtime justification |
| Dagmar | Deferred | Political wife — requires runtime justification |
| Valeria | Deferred | Political wife — requires runtime justification |

#### Extended Lines (12)

| Name | Status | Notes |
|------|--------|-------|
| Gunnar | Deferred | Extended line — requires runtime justification |
| Ingrid | Deferred | Extended line — requires runtime justification |
| Astrid II | Deferred | Extended line — requires runtime justification |
| Torvald | Deferred | Extended line — requires runtime justification |
| Hagen | Deferred | Extended line — requires runtime justification |
| Sigrun | Deferred | Extended line — requires runtime justification |
| Bram | Deferred | Extended line — requires runtime justification |
| Knut | Deferred | Extended line — requires runtime justification |
| Lars | Deferred | Extended line — requires runtime justification |
| Sven | Deferred | Extended line — requires runtime justification |
| Valerius | Deferred | Extended line — requires runtime justification |
| Thyra | Deferred | Extended line — requires runtime justification |

**Properties:**
- Canonically valid
- Not in active runtime
- Future expansion candidates
- Require import process for activation

---

### Archive Canon

| Source | Role | Authority |
|--------|------|-----------|
| NotebookLM | Primary research | Evidence source |
| Svartulfr_LA archive | Secondary reference | Evidence source |
| Progetti archive | Tertiary reference | Evidence source |
| Historical reports | Supporting evidence | Evidence source |

**Properties:**
- Research source only
- No runtime authority
- No import authority
- Evidence for recovery audits

---

## Import Process

### Overview

```
Deferred Canon → Active Canon

Requires:
    Recovery Audit
    → Architecture Review
    → Runtime Justification
    → Authority Decision
```

---

### Step 1: Recovery Audit

| Aspect | Details |
|--------|---------|
| Objective | Verify canonical validity |
| Activities | Collect evidence, classify, document genealogy |
| Output | Recovery Audit Report |
| Status | AUDITED |

---

### Step 2: Architecture Review

| Aspect | Details |
|--------|---------|
| Objective | Verify consistency with ADRs |
| Checks | Scope, timeline, focus, boundaries |
| Output | Architecture Review Decision |
| Status | REVIEWED |

---

### Step 3: Runtime Justification

| Aspect | Details |
|--------|---------|
| Objective | Demonstrate runtime necessity |
| Questions | Why now? What scenarios? Minimal viable? Maintenance burden? |
| Output | Runtime Justification Document |
| Status | JUSTIFIED |

---

### Step 4: Authority Decision

| Decision | Action |
|----------|--------|
| ACCEPTED | Proceed to import |
| REJECTED | Remain deferred |
| DEFERRED | Hold pending resolution |

| Aspect | Details |
|--------|---------|
| Output | Authority Decision Record |
| Status | DECIDED |

---

## Governance Rules

### Deferred Canon

| Activity | Status |
|----------|--------|
| Store recovery audits | ✓ Required |
| Document genealogy | ✓ Required |
| Update deferred registry | ✓ Required |
| Import to active | ✗ Prohibited without process |

### Active Canon

| Activity | Status |
|----------|--------|
| Reference deferred characters | ✗ Prohibited |
| Include deferred in family graph | ✗ Prohibited |
| Use deferred in scenarios | ✗ Prohibited |

### Archive Canon

| Activity | Status |
|----------|--------|
| Treat as canonical | ✗ Prohibited |
| Import without audit | ✗ Prohibited |
| Bypass governance | ✗ Prohibited |

---

## Political Wives Analysis

### Classification Rationale

| Character | Classification | Rationale |
|-----------|-----------------|-----------|
| Sigrid | Deferred | Political marriage — no active scenario requires presence |
| Dagmar | Deferred | Political marriage — no active scenario requires presence |
| Valeria | Deferred | Political marriage — no active scenario requires presence |

### Recovery Status

| Character | Recovery Audit | Architecture Review | Runtime Justification |
|-----------|----------------|---------------------|------------------------|
| Sigrid | PENDING | PENDING | PENDING |
| Dagmar | PENDING | PENDING | PENDING |
| Valeria | PENDING | PENDING | PENDING |

### Import Readiness

| Character | Ready for Import | Blocker |
|-----------|------------------|---------|
| Sigrid | NO | No runtime justification |
| Dagmar | NO | No runtime justification |
| Valeria | NO | No runtime justification |

---

## Extended Lines Analysis

### Classification Rationale

All extended line characters are classified as Deferred because:
1. They exist canonically (historically valid)
2. They are not required for current Los Angeles Dynasty focus
3. No active scenarios require their presence
4. Architectural simplicity favors minimal active roster

### Import Readiness

| Character | Ready for Import | Blocker |
|-----------|------------------|---------|
| All (12) | NO | No runtime justification, no active scenario requirement |

---

## Recommendations

### Immediate Actions

1. **Maintain Deferred Registry** — Keep accurate list of deferred characters
2. **Complete Recovery Audits** — When political wives are needed for scenarios
3. **Document Genealogy** — Ensure all deferred characters have genealogy records

### Future Actions

1. **Runtime Justification** — When scenarios require deferred characters
2. **Architecture Review** — Before any deferred → active transition
3. **Authority Decision** — Final approval before import

### Maintenance

1. **Policy Updates** — Only when ADRs change
2. **Registry Updates** — When new characters are recovered
3. **Import Process** — When deferred characters are needed

---

## Files Created

| File | Purpose | Status |
|------|---------|--------|
| [Deferred_Canon_Policy.md](file:///d:/SvartulfrVerse/core/Deferred_Canon_Policy.md) | Canon classification policy | CREATED |

---

## Verification

### No Violations

| Check | Status |
|-------|--------|
| No ADR creation | ✓ VERIFIED |
| No character imports | ✓ VERIFIED |
| No authority modifications | ✓ VERIFIED |
| Documentation only | ✓ VERIFIED |

---

## Authority

Established by: Architecture Review & Canon Reconstruction Workspace  
Type: Repository Operating Policy  
Date: 2026-06-07  
Scope: Formalize canon classification and import process
