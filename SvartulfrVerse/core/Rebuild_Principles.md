# Rebuild Principles

## 1. Archive First

The historical archive (Progetti) is preserved as read-only reference. No content is deleted or modified. The archive serves as:

- Historical reference for implementation patterns
- Source for canon recovery through audit workflow
- Migration history documentation
- Implementation reference for architectural decisions

No direct imports from archive occur without completing the canon recovery workflow.

## 2. Runtime Validation Before Expansion

Canonical stability must be validated before content expansion. The rebuild prioritizes:

- Stable canonical implementation over content quantity
- Validated behavior over feature breadth
- Architectural soundness over scope expansion

No expansion occurs until current scope (Only Human, Contemporary, LA Dynasty) is validated and stable.

## 3. Single Source of Truth

Each element has a single canonical definition. The repository enforces:

- Single canonical form per character
- Single authoritative source for family relationships (family_engine)
- Single source for dynasty lineages
- No duplicate or conflicting definitions across files

Canonical conflicts are resolved through ADR process before implementation.

## 4. Preserve Historical Evidence

All canonical decisions must be auditable back to source. The rebuild requires:

- Source identification (NotebookLM, Archive, Runtime)
- Character audit documentation
- Architecture review records
- Canon decision documentation (ADR)
- Implementation traceability

Every imported element maintains audit trail: Source → Audit → Decision → Implementation

## 5. No Migration Without Audit

Content from the historical archive is never imported directly. Required workflow:

1. NotebookLM Discovery (Secondary Evidence)
2. Archive Verification (Historical Reference)
3. Character Audit (Comparison of Known Versions)
4. Architecture Review (Impact Assessment)
5. Canon Decision (Authoritative Selection)
6. Repository Import (Validated Implementation)

No exceptions. This workflow prevents recurrence of migration drift observed in historical repository.

## 6. Canon Before Optimization

The rebuild purpose is canonical stabilization, not modernization or optimization. Priorities:

- Canonical accuracy over code elegance
- Stable behavior over performance optimization
- Correct relationships over efficient calculations
- Validated timeline over simplified logic

Optimization occurs only after canonical stability is achieved.

## 7. Runtime Before Architecture

Runtime requirements drive architectural decisions. Hierarchy:

```
Runtime
>
Architecture
>
Workflow
>
Documentation
```

Architecture serves runtime behavior, not the reverse. Documentation describes validated implementation, it does not prescribe implementation before runtime validation.

## 8. Family Authority Before Expansion

No character relationships or family structures are introduced without family engine validation. The family engine provides:

- Single source of truth for kinship relationships
- Single source of truth for dynasty relationships
- Parent-child authority
- Sibling authority
- Marriage authority
- Douglas-Bloodmoon lineage authority

Family engine is knowledge layer only (no behavior logic). It serves as authoritative reference for all relationship definitions.

## Migration Failure Prevention

These principles are designed to prevent recurrence of historical failures:

- **Noah occupation drift** → LA_OnlyHuman_Academic_Timeline validation
- **Douglas-Bloodmoon naming drift** → Single Source of Truth
- **Family relationship degradation** → Family Authority Before Expansion
- **World canonical compression** → Scope validation and ADR process
- **Character role homogenization** → Character Canonicality principle

## Principle Enforcement

Each principle is enforced through:

- ADR documentation for architectural decisions
- Canon recovery workflow for content imports
- Family engine validation for relationships
- Scope validation for world/experience creation
- Audit trail requirements for all canonical changes
