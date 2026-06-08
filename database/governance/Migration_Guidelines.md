# Migration Guidelines

**Status:** CANONICAL  
**Date:** 2026-06-08  
**Authority:** Architecture Review

---

## Purpose

Defines how legacy content is evaluated and migrated into the SvartulfrVerse canonical database.

---

## Migration Source Priority

| Priority | Source | Role |
|----------|--------|------|
| 1 | `old_template_and_source/` | Primary Migration Source, Frozen Recovery Source |
| 2 | `authority/` | Authority Records |
| 3 | `core/` | Governance Documents |
| 4 | `D:\Progetti\database` | Historical Archive (fallback only) |

**Rule:** old_template_and_source FIRST. Progetti database SECOND. Never invert.

---

## Migration Workflow

### Step 1: Discovery Review
- Identify source files
- Determine authority owner
- Determine canon classification
- Identify dependencies and conflicts
- Produce Discovery Review document

### Step 2: Source Analysis
- Read source file(s)
- Extract accepted evidence
- Identify deferred elements
- Identify rejected elements
- Classify evidence (Strong / Medium / Weak)

### Step 3: Migration Execution
- Create database record with Migration Metadata block
- Preserve all accepted evidence
- List deferred elements (not silently drop)
- Document rejected elements
- Add cross-references to related records

### Step 4: Validation
- Run domain-specific validation checks
- Verify metadata completeness
- Verify cross-reference integrity
- Verify source preservation
- Produce Validation Report

### Step 5: Review
- STOP after validation
- Wait for Architecture Review approval
- Do not proceed without explicit approval

---

## Migration Metadata Block

Every migrated record MUST contain:

```markdown
## Migration Metadata

| Field | Value |
|-------|-------|
| Source | [source file path] |
| Authority | [authority layer] |
| Migration Date | [YYYY-MM-DD] |
| Status | Migrated |
```

**Authority field MUST be one of:**
- Architecture Review
- Family Authority
- Character Authority
- Visual Authority
- Institution Authority
- World Authority
- Experience Authority
- Governance Authority

---

## Canon Classification

| Layer | Definition | Runtime Access |
|-------|-----------|----------------|
| Active Canon | Currently eligible for runtime | Full compilation |
| Historical Canon | Documented facts | Reference only |
| Cultural Canon | Family traditions, myths | Dialogue flavor only |
| Deferred Canon | Valid but not active | Prohibited |
| Candidate Canon | Proposed, not approved | Prohibited |

---

## Import Restrictions

### PROHIBITED
- Direct archive imports without audit
- Copy-paste migration without review
- Runtime code in database records
- Executable logic in database records
- Janitor/SillyTavern implementation details
- NSFW content
- User personas (deployment examples)

### REQUIRED
- Migration Metadata block in every record
- Source preservation (source files unmodified)
- Deferred elements listed (not silently dropped)
- Cross-references use database paths
- Validation report for every migration

---

## Conflict Resolution

When sources conflict:

```
ADRs > Authority Records > old_template_and_source > Progetti Archive
```

---

## Authority

Established by: Architecture Review  
Type: Migration Operating Guidelines  
Date: 2026-06-08  
Depends on: ADR-006, Repository_Governance.md
