# Repository Configuration

**Date:** 2026-06-08
**Authority:** Migration Architect
**Status:** ACTIVE

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/Repository_Configuration.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Workspace Structure

```
Workspace
├── SvartulfrVerse      (ACTIVE CANON)
├── Svartulfr_LA        (PRIMARY RESEARCH — read-only)
└── Progetti            (SECONDARY ARCHIVE — read-only)
```

## Repository Roles

| Repository | Role | Status | Access |
|------------|------|--------|--------|
| SvartulfrVerse | Primary Repository | ACTIVE CANON | Read/Write |
| Svartulfr_LA | Primary Research | READ-ONLY | Read-only |
| Progetti | Secondary Archive | READ-ONLY | Read-only |

## Evidence Priority

SvartulfrVerse (canon) > Svartulfr_LA > Progetti

## Import Workflow

Research → Audit → Architecture Review → Authority Decision → Import
