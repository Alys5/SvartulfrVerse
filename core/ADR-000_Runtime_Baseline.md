# ADR-000: Runtime Baseline - Repository Freeze and Rebuild

## Status

Accepted

## Context

The existing Progetti repository has accumulated canonical drift through multiple migration cycles. Observed failures include:

- Noah occupation drift (unrealistic career progression)
- Douglas-Bloodmoon naming drift
- Family relationship degradation
- World canonical compression
- Character role homogenization

These failures indicate that the repository has lost canonical stability through incremental changes without proper validation.

## Decision

### Legacy Repository: Progetti

**Role:** Historical Archive

**Status:** Frozen

**Purpose:**
- Historical Archive
- Research Archive
- Canon Recovery Source
- Migration Reference

**Constraints:**
- No content will be deleted
- No content will be modified
- Repository remains frozen as archival source
- Read-only access only

### New Repository: SvartúlfrVerse

**Role:** Active Runtime Canon Repository

**Status:** Bootstrap Phase

**Purpose:**
- Active Canon
- Runtime Authority
- Validated Source

**Construction Principles:**
- Starts from zero
- No legacy repository structure copied
- No legacy files migrated
- No worlds imported
- No characters imported
- No lorebooks imported
- No old engines imported
- All content intentionally reintroduced later with validation

### Runtime-First Approach

The rebuild follows the hierarchy:

```
Runtime
>
Architecture
>
Workflow
>
Documentation
```

**Principle:** Preserve behavior before optimization.

The purpose of the rebuild is canonical stabilization, not:
- Modernization
- Optimization
- Feature expansion
- Content expansion

## Future World Reintroduction Policy

Worlds, characters, and content types may be reintroduced to SvartúlfrVerse only after:

1. NotebookLM Discovery
2. Archive Verification
3. Character Audit
4. Architecture Review
5. Canon Decision
6. Repository Import

No direct imports from the historical archive are permitted without completing the full canon recovery workflow.

## Consequences

- The Progetti repository serves as read-only reference for historical research
- All new development occurs in SvartúlfrVerse
- Canon recovery workflow prevents recurrence of migration drift
- Repository scope is intentionally limited to validated content only
- Runtime validation takes precedence over architectural elegance

## Related Decisions

- Repository Scope (core/Repository_Scope.md)
- Rebuild Principles (core/Rebuild_Principles.md)
- Architecture (core/Architecture.md)
