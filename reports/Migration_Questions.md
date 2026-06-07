# Migration Questions

**Date:** 2026-06-08
**Authority:** Migration Architect
**Phase:** 4 — Migration Baseline
**Status:** PENDING REVIEW

---

## Purpose

Questions requiring human decision before migration execution.

**Format:** One question at a time during interactive review.

---

## Questions

### Question 1/3

**Context:** Wulfnic authority records are split across 5 files (Biography, Identity, Personality, Speech, Import_Status).

**Options:**

| Option | Description |
|--------|-------------|
| A | Migrate as 5 separate files to database/characters/C_Wulfnic/ |
| B | Consolidate into single C_Wulfnic.md |
| C | Keep authority files in authority/, create consolidated record in database/ |

**Recommended:** Option A — Maintain current structure, migrate as-is.

---

### Question 2/3

**Context:** Visual DNA has two files with different scope (Visual_DNA.md has Character Identity Anchors, Visual_DNA_source.md has environmental evidence).

**Options:**

| Option | Description |
|--------|-------------|
| A | Migrate both as separate files |
| B | Merge into single W_Visual_DNA.md |

**Recommended:** Option A — Both contain unique data, migrate both.

---

### Question 3/3

**Context:** ADR-000_Runtime_Baseline.md exists in both core/ and database/governance/. The database copy was migrated early.

**Options:**

| Option | Description |
|--------|-------------|
| A | Skip migration, verify copy is current |
| B | Re-migrate to ensure consistency |

**Recommended:** Option A — Verify copy matches source, skip re-migration.

---

## Additional Questions (Non-Blocking)

### Question 4/3 (Conditional)

**Context:** Echo AI was approved during Canon Consolidation but has no frozen source file.

**Options:**

| Option | Description |
|--------|-------------|
| A | Create minimal source file documenting approval |
| B | Proceed without source, document in authority record |

**Recommended:** Option B — Document approval in authority record.

---

### Question 5/3 (Conditional)

**Context:** Legacy engines (5 JS files) are marked for purge.

**Options:**

| Option | Description |
|--------|-------------|
| A | Execute purge now, before migration |
| B | Execute purge after migration |

**Recommended:** Option A — Execute purge before migration to clean repository.

---

## Authority

**Document Type:** Migration Questions
**Date:** 2026-06-08
**Authority:** Migration Architect
**Status:** PENDING ANSWERS
