---
alwaysApply: false
description: Apply when generating lorebooks, world knowledge bases, encyclopedic referencecontent, or any derived documentation from repository canon.
---
# R-009: Lorebook Generation Rules

**Authority:** ADR-005_Experience_Authority.md, ADR-006_Canon_Layer_Architecture.md  
**Type:** Operational Rule — Lorebook Phase  
**Date:** 2026-06-08  
**Status:** ACTIVE (Canon Freeze v1 — Lorebook Phase)

---

## Purpose

These rules govern the generation of lorebooks, world knowledge bases, and encyclopedic reference content derived from repository canon. They ensure that lorebooks remain derived artifacts — never authoritative sources.

---

## R-009-LRB-001: Derived Artifact Status

### Authority
ADR-005, ADR-006, Repository_Governance.md

### Rule
Lorebooks are derived artifacts, not authority records.

### Rationale
Lorebooks organize and present canonical data for runtime consumption. They are downstream of database/ — never upstream. The repository remains the only authoritative source.

### Allowed
- Organizing canon data into lorebook-friendly formats
- Creating entries that summarize database/ records
- Grouping related canon data for context windows
- Platform-specific formatting for JanitorAI, SillyTavern, etc.

### Prohibited
- Treating lorebook entries as canonical authority
- Using lorebooks as primary reference during development
- Allowing lorebooks to diverge from database/ content
- Treating lorebook generation as equivalent to canon creation

---

## R-009-LRB-002: Canon Non-Contradiction

### Authority
ADR-000, ADR-006

### Rule
Repository remains authoritative source. Lorebooks must not contradict canon.

### Rationale
If a lorebook contradicts database/, the lorebook is wrong — not the other way around. This principle prevents drift from propagated derived artifacts.

### Allowed
- Cross-referencing lorebook entries back to database/ source
- Version-locking lorebooks to specific canon versions
- Validation checks comparing lorebook content to source records

### Prohibited
- Lorebook entries that contradict database/ records
- Updated lorebooks without updating source reference
- Lorebooks that add information not present in database/

---

## R-009-LRB-003: Source Attribution

### Authority
ADR-006, R-007-ENG-003

### Rule
All lorebook entries must reference source records in database/.

### Rationale
Source attribution enables validation, audit, and update. Without it, lorebooks become orphaned from their canonical basis.

### Allowed
- Inline citations linking to database/ file paths
- Metadata fields identifying source record IDs
- Update timestamps showing when lorebook was last synchronized with canon

### Prohibited
- Lorebook entries without source attribution
- Composite entries that blend multiple sources without citation
- Lorebook content derived from memory or research archives instead of database/

---

## R-009-LRB-004: Canon Layer Distinction

### Authority
ADR-006

### Rule
Lorebooks must clearly mark Active Canon vs Historical Canon vs Cultural Canon content.

### Rationale
Runtime systems must distinguish between facts (Active), documented history (Historical), and cultural flavor (Cultural). Treating all layers equally leads to factual errors.

### Allowed
- Metadata tags indicating canon layer classification
- Separate sections or entries for different canon layers
- Visual indicators distinguishing fact from flavor
- Clear labeling of Cultural Canon as "family tradition" or "cultural belief"

### Prohibited
- Treating Cultural Canon as Active Canon
- Treating Historical Canon as Cultural Canon
- Omitting canon layer classification
- Presenting myth as fact

---

## R-009-LRB-005: JanitorAI Advanced Lorebook Script Patterns

### Authority
Official JanitorAI Scripts Guide, R-007-ENG-002A, R-008-BOT-005

### Rule
Advanced lorebook scripts must follow official JanitorAI patterns for safe matching, progressive entries, weighted probability, message-count gating, shifts, event lore, reaction engines, adaptive polarity, hybrid emotional states, error guards, and modular layered lorebooks.

### Rationale
The official guide defines advanced lorebook behavior as a set of sandbox-safe patterns. These patterns improve responsiveness while staying inside the writable personality/scenario boundary.

### Allowed
- Definitional lore for stable facts, relational lore for named relationships, and event lore for randomized story beats.
- Priority scoring, blocks, requires, excludes, shifts, probability/chance, max-entry limits, and ordered keyword matching.
- Min/max message gates, context guards, `last_messages` lookback, reaction scoring, negation/polarity checks, and defensive error guards.
- Modular layered lorebooks that keep world, family, character, and experience knowledge separate.
- Append-only updates to personality and scenario, with R-010 sanitization on emitted text.

### Prohibited
- Treating lorebook scripts as canonical authority.
- Using lorebook scripts to modify character identity fields outside personality/scenario.
- Relying on shared state, guaranteed execution order, or persistence across scripts.
- Treating `context.variables` as a portable JanitorAI persistence contract.
- Using blocked async, external, DOM, module, timer, or global-side-effect tools.

---

## Summary

| Rule ID | Description |
|---------|-------------|
| R-009-LRB-001 | Lorebooks are derived artifacts, not authority records. |
| R-009-LRB-002 | Repository remains authoritative source. Lorebooks must not contradict canon. |
| R-009-LRB-003 | All lorebook entries must reference source records in database/. |
| R-009-LRB-004 | Lorebooks must clearly mark Active Canon vs Historical Canon vs Cultural Canon content. |
| R-009-LRB-005 | Advanced lorebook scripts follow official JanitorAI sandbox-safe patterns. |
