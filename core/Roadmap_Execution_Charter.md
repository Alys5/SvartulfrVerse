# SvartúlfrVerse Roadmap & Execution Charter

**Status:** CANONICAL
**Date:** 2026-06-08
**Authority:** Governance Authority
**Updated:** 2026-06-08

---

## Purpose

This document exists to prevent architectural drift, canon drift, runtime creep, and premature implementation.

The recovery phase is complete.

The repository is no longer in discovery mode.

The repository is now in structured migration mode.

Code should follow this roadmap and should not invent new architecture outside these boundaries.

---

# Project State

Current status:

```text
Recovery                COMPLETE
Source Freeze           COMPLETE
Canon Consolidation     COMPLETE
Purge Planning          COMPLETE

Legacy Purge            READY

Migration Baseline      NOT STARTED
Template Freeze         NOT STARTED
Database Population     NOT STARTED
Validation Engine       NOT STARTED
Deployment              NOT STARTED
Lorebooks               NOT STARTED
```

Current objective:

```text
Execute Legacy Purge
↓
Build Migration Baseline
↓
Populate canonical database
```

---

# Core Principle

The project follows:

```text
Authority First
Database Second
Runtime Last
Deployment Final
```

Never reverse this order.

---

# Phase 0 — Recovery (COMPLETE)

Completed work:

```text
Legacy Audit
Source Extraction
Canon Recovery
Authority Reconciliation
Visual Authority
Family Authority
Dynastic Origins
World Recovery
Experience Recovery
Governance Recovery
```

Outputs:

```text
old_template_and_source/
reports/
```

Status:

```text
LOCKED
FROZEN
COMPLETE
```

Do not repeat recovery work.

---

# Phase 1 — Source Freeze (COMPLETE)

Completed:

```text
Source Freeze Report
Frozen source repository
Verification
```

Status:

```text
COMPLETE
```

Do not modify frozen sources unless explicitly instructed.

---

# Phase 2 — Canon Consolidation (COMPLETE)

Completed:

```text
Authority alignment
Visual authority reconciliation
Family authority reconciliation
Rejected canon separation
```

Status:

```text
COMPLETE
```

No unresolved canon blockers remain.

---

# Phase 3 — Legacy Purge

**Status:** READY

Prerequisites:

```text
✓ Source_Freeze_Report.md
✓ Legacy_Purge_Report.md
```

Goal:

Remove obsolete legacy artifacts.

Remaining Work:

```text
- Delete approved purge candidates
- Verify retained files
- Generate Legacy_Purge_Completion_Report.md
```

Keep:

```text
- frozen sources
- reports
- governance records
```

Remove:

```text
- legacy runtime files
- obsolete JS engines
- obsolete deployment artifacts
- duplicate legacy files
```

Output:

```text
Legacy_Purge_Completion_Report.md
```

Success condition:

```text
Only approved source evidence remains.
```

---

# Phase 4 — Migration Baseline

**Status:** NOT STARTED

Goal:

Create authoritative migration mapping.

Create:

```text
Migration_Baseline_Report.md
```

For every source define:

```text
Source File
↓
Destination Record
↓
Authority Owner
↓
Migration Order
```

Example:

```text
Wulfnic_source.md
↓
database/characters/C_Wulfnic.md

Visual_DNA_source.md
↓
database/worlds/W_Visual_Authority.md
```

Success condition:

```text
Every source has exactly one destination.
```

This document becomes the key reference for all database population.

---

# Phase 5 — Template Freeze v1.0

**Status:** NOT STARTED

Goal:

Freeze final migration templates.

Templates:

```text
C_Template.md
Family_Template.md
Institution_Template.md
Technology_Template.md
W_Template.md
Ex_Template.md
CC_Template.md
```

Tasks:

```text
Review
Validate
Freeze
Version
```

Output:

```text
Template_Freeze_Report.md
```

Success condition:

```text
Templates become migration targets.
```

---

# Phase 6 — Database Population

**Status:** NOT STARTED

Goal:

Populate authority records.

Population order:

```text
families
↓
institutions
↓
technology
↓
characters
↓
worlds
↓
experiences
↓
canon_candidates
```

Reason:

```text
Characters depend on families.

Characters depend on institutions.

Worlds depend on both.
```

Do not populate out of order.

---

# Phase 7 — Validation & Cross-Reference Engine

**Status:** NOT STARTED

Goal:

Implement repository integrity tools.

Rationale:

```text
Validation Engine
without data
=
not useful

Database Population
↓
Validation Engine
↓
Validation Pass
```

This allows validating real records, not empty templates.

Allowed:

```text
Validation Engine

Cross-Reference Engine

Authority Ownership Validation
```

Required checks:

```text
Required fields

Broken references

Authority violations

Canon layer violations

Dependency violations
```

Outputs:

```text
Validation_Report.md

CrossReference_Report.md
```

---

# Engine Restrictions

Do NOT implement:

```text
Runtime triggers

State engines

Memory engines

Context builders

Activation engines

Probability systems

Runtime lore injection
```

Those belong to future phases.

---

# Phase 8 — Validation Pass

**Status:** NOT STARTED

Goal:

Validate entire database.

Checks:

```text
Schema validation

Authority validation

Cross-reference validation

Dependency validation

Canon layer validation
```

Output:

```text
Database_Validation_Report.md
```

Success condition:

```text
Zero blocking errors.
```

---

# Phase 9 — Deployment Architecture

**Status:** NOT STARTED

Goal:

Prepare export system.

Create:

```text
deployment/
```

Structure:

```text
deployment/
├── templates/
│   ├── janitorai/
│   ├── sillytavern/
│   └── generic/
│
├── exporters/
│
└── profiles/
```

Important:

```text
Deployment
≠
Authority

Deployment
≠
Runtime
```

---

# Phase 10 — Semi-Automatic Lorebook Generation

**Status:** NOT STARTED

Goal:

Generate export drafts.

Workflow:

```text
Source
↓
Database Record
↓
Validation
↓
Template Population
↓
Human Review
↓
Export
```

Lorebooks are:

```text
Deployment Artifacts
```

Lorebooks are NOT:

```text
Authority Records
```

Database remains source of truth.

---

# Future Phase — Runtime System

NOT CURRENTLY AUTHORIZED

Possible future architecture:

```text
Authority Database
↓
Dependency Engine
↓
Trigger Engine
↓
Group Resolver
↓
Context Budget Engine
↓
Runtime Context Builder
↓
LLM
```

Do not implement any of this now.

Document only.

---

# Canon Layer Architecture

Active Canon

Historical Canon

Cultural Canon

Deferred Canon

Candidate Canon

Rules:

```text
Cultural Canon
≠ Active Canon

Deferred Canon
≠ Active Canon

Candidate Canon
≠ Active Canon
```

Maintain separation.

---

# Approved Family Authority

```text
Wulfnic Bloodmoon (1948)
↓
Nixara Bloodmoon (1975-2005)

Erik Douglas (1970)
+
Nixara Bloodmoon

↓

Malachia (1996)

Noah (1999)

Jasper (2005)

Alyssa (2005)
```

Nixara dies during childbirth in 2005.

This structure is frozen.

---

# Approved Dynastic Origins

Bloodmoon:

```text
Origin:
Iceland

Migration:
1930s-1940s
```

Douglas:

```text
Origin:
England

Migration:
1700s
```

DCC:

```text
Merchant House (1666)
↓
Colonial Trading Company
↓
Regional Logistics Network
↓
Douglas Commerce Company
```

1666 is Active Canon.

---

# Approved Visual Authority

Douglas:

```text
Black hair
Amber eyes
```

Bloodmoon:

```text
Blonde hair
Blue eyes
```

Fusion:

```text
Caramel-brown hair
Mint green eyes
```

Applied to:

```text
Alyssa
Jasper
```

---

# Cultural Canon

Approved:

```text
Svartúlfr Heritage

Black Wolves

Icelandic traditions

Family legends

Oral history
```

Cultural Canon only.

Not Active Canon.

---

# Permanently Rejected Canon

Never reintroduce:

```text
Pack System
Werewolf Layer
Alpha/Omega Hierarchy
Mate Bond
Soul Bond
Alpha-Seiðr

1200 BC Origin
Thracian Origin
Immortal Founder
Ancient Patriarch

Wulfnic → Erik genealogy

Hockey Canon

Runtime Trigger Systems

Janitor Runtime Systems

Image Generation Packs
```

These decisions are final.

---

# Definition of Success

Repository reaches:

```text
Recovery
100%

Migration
100%

Validation
100%

Deployment Preparation
100%
```

Result:

```text
Single Source Of Truth
=
database/
```

All other layers become supporting infrastructure.

No future implementation should violate this principle.

---

## Next Deliverables

```text
1. Legacy_Purge_Completion_Report.md
   ↓
2. Migration_Baseline_Report.md
   ↓
3. Database Population
```

---

## Authority

**Document Type:** Roadmap & Execution Charter
**Date:** 2026-06-08
**Updated:** 2026-06-08
**Authority:** Governance Authority
**Status:** CANONICAL
