---
alwaysApply: false
description: Apply when evaluating architecture decisions, repository structure, migrations, imports, audits, runtime behavior, or determining canonical authority.
---
# R-000: Runtime Rules

**Authority:** ADR-000_Runtime_Baseline.md  
**Type:** Operational Rule  
**Date:** 2026-06-07  
**Updated:** 2026-06-08 (Canon Freeze v1)

---

## R-000-RUN-001: Runtime First Principle

### Authority
ADR-000, Official JanitorAI Scripts Guide

### Rule
Observable runtime behavior is the ground truth for all canonical decisions. For JanitorAI script generation, the official JanitorAI Scripts Guide is the controlling technical source of truth.

### Rationale
Architecture documentation that contradicts actual runtime behavior is incorrect. Runtime behavior must be preserved before any optimization or refactoring.

### Allowed
- Documenting actual runtime behavior
- Updating architecture to match runtime
- Preserving observable behavior during refactoring

### Prohibited
- Assuming documentation is correct when runtime differs
- Changing runtime to match aspirational architecture
- Ignoring runtime evidence in favor of design documents

---

## R-000-RUN-002: Evidence Before Assumption

### Authority
ADR-000, Rebuild_Principles

### Rule
All canonical decisions must be based on collected evidence, not assumptions.

### Rationale
Historical archives contain drift and errors. No information enters the repository without documented evidence from recognized sources.

### Allowed
- Collecting evidence from all research archives (NotebookLM, Svartulfr_LA, Progetti)
- Compiling historical reports and audits

### Prohibited
- Assuming information without evidence
- Creating canon based on memory or inference
- Importing data without source documentation

---

## R-000-RUN-003: Canon Freeze Compliance

### Authority
ADR-000, Rebuild_Principles, CANON_FREEZE_REPORT.md

### Rule
Canon Freeze v1 is ACTIVE. No new canon creation, lore expansion, or recovery of rejected material without explicit Authority Decision.

### Rationale
Migration is complete. The repository is locked. Canon Freeze v1 ensures stability and prevents drift.

### Allowed
- Canon Recovery Workflow for new candidates (with full audit)
- Deferred Canon activation (with full 4-step process)
- Bug fixes to existing records
- Documentation maintenance

### Prohibited
- New canon creation without Authority Decision
- Lore expansion without Authority Decision
- Recovery workflow for rejected canon (Valeria, Twin Peaks, KSA origin)
- Direct archive imports
- Supernatural system introduction

---

## R-000-RUN-004: Single Source of Truth

### Authority
ADR-000, Architecture.md

### Rule
Each data domain has exactly one canonical owner.

### Rationale
Distributed ownership creates conflicts and drift. One authority layer owns each domain.

### Allowed
- Querying authority layers for data
- Referencing canonical data from consumers
- Single ownership per domain

### Prohibited
- Duplicating data across multiple layers
- Creating parallel documentation
- Owning data outside designated authority

---

## R-000-RUN-005: No Migration Without Audit

### Authority
Rebuild_Principles

### Rule
No code or data may be imported from historical archives without passing through the audit workflow.

### Rationale
Historical archives contain documented degradation patterns. Direct import propagates errors.

### Allowed
- Auditing historical data
- Classifying evidence
- Approved imports after review

### Prohibited
- Copying code from Progetti archive
- Importing character data without audit
- Assuming family relationships from archive

---

## R-000-RUN-006: Correctness Before Optimization

### Authority
Rebuild_Principles

### Rule
Correctness precedes performance. Stability precedes expansion.

### Rationale
Optimization of incorrect behavior is waste. Canonical correctness is non-negotiable.

### Allowed
- Verifying correctness first
- Optimizing after validation
- Expanding after stabilization

### Prohibited
- Optimizing before correctness verified
- Expanding before base stable
- Preferring elegance over correctness

---

## R-000-RUN-007: Archive First

### Authority
Rebuild_Principles

### Rule
Before any canonical decision, query historical sources for context.

### Rationale
No import without historical context. All decisions must reference source material.

### Allowed
- Querying all research archives (NotebookLM, Svartulfr_LA, Progetti) without priority ordering
- Verifying evidence across sources
- Documenting source references

### Prohibited
- Making decisions without historical context
- Ignoring historical variations
- Creating canon without audit trail

---

## R-000-RUN-008: JanitorAI Script Source of Truth

### Authority
Official JanitorAI Scripts Guide: https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/GuideBookSite/book/index.html

### Rule
For JanitorAI script generation, the official JanitorAI Scripts Guide is the controlling technical authority. Any local script-generation rule that conflicts with the guide must be updated to match the guide.

### Rationale
The JanitorAI Scripts Guide defines the sandbox contract, writable fields, safe and unsafe JavaScript features, runtime limits, and script patterns. Local architecture may add stricter SvartúlfrVerse constraints, but it may not loosen official JanitorAI safety limits.

### Allowed
- Treating the official guide as the baseline for script syntax, sandbox safety, and functional limits.
- Adding stricter SvartúlfrVerse constraints when they do not contradict the guide.
- Validating final behavior in a live JanitorAI session when a guide statement conflicts with observed runtime behavior.

### Prohibited
- Keeping local script-generation rules that require ES5-only syntax when the official guide states that ES6-safe syntax is supported.
- Allowing async, external, DOM, global, or module-based script behavior.
- Treating untested assumptions as JanitorAI-compatible runtime behavior.

---

## R-000-RUN-009: Script Sandbox Safety Boundary

### Authority
Official JanitorAI Scripts Guide, R-007-ENG-002A

### Rule
JanitorAI scripts must remain inside the sandbox boundary: use only the provided `context` object, modify only `context.character.personality` and `context.character.scenario`, and avoid all blocked runtime tools.

### Rationale
Scripts run before every bot reply and must finish quickly without touching external systems or global runtime state.

### Allowed
- Safe ES6 sandbox syntax: `const`, `let`, arrow functions, template literals, `.includes()`, `.map()`, `.filter()`, `.forEach()`, `Object.keys()`, `Object.values()`, `Object.assign()`, basic regex, `new Date()`, and `console.log()`.
- Lightweight iteration and simple local state inside a single script execution.
- Append-only updates to personality and scenario.

### Prohibited
- `async`, `await`, `Promise`, `setTimeout`, `setInterval`.
- `fetch`, `XMLHttpRequest`, `require`, `import`.
- `document`, `window`, global variable creation, redefining `context`, or overwriting system objects.
- Treating `context.variables` as an official JanitorAI persistence contract; portable scripts must persist idempotency through personality/scenario markers or avoid persistence.
- Assuming shared state, guaranteed execution order, or persistence across scripts.

---

## Summary

| Rule ID | Description |
|---------|-------------|
| R-000-RUN-001 | Runtime First Principle |
| R-000-RUN-002 | Evidence Before Assumption |
| R-000-RUN-003 | Canon Before Implementation |
| R-000-RUN-004 | Single Source of Truth |
| R-000-RUN-005 | No Migration Without Audit |
| R-000-RUN-006 | Correctness Before Optimization |
| R-000-RUN-007 | Archive First |
| R-000-RUN-008 | JanitorAI Script Source of Truth |
| R-000-RUN-009 | Script Sandbox Safety Boundary |
