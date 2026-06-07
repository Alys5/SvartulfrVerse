---
alwaysApply: false
description: Apply when performing repository governance, recovery audits, architecture reviews, imports, authority decisions, canon validation, workflow enforcement, or repository expansion planning.
---
# R-006: Governance Rules

**Authority:** Repository_Governance.md, Rebuild_Principles.md, Architecture.md  
**Type:** Operational Rule  
**Date:** 2026-06-07

---

## R-006-GOV-001: Canon Recovery Workflow

### Authority
Repository_Governance.md

### Rule
All information must pass through the 5-step Canon Recovery Workflow before entering the repository.

### Rationale
Archive evidence does not become canon automatically. The workflow ensures audit, review, and approval before import.

### Allowed
- Step 1: Research (collect evidence)
- Step 2: Recovery Audit (classify evidence)
- Step 3: Architecture Review (verify consistency)
- Step 4: Authority Decision (accept/reject/defer)
- Step 5: Import (approved information only)

### Prohibited
- Skipping workflow steps
- Direct archive imports
- Import without audit trail
- Import without authority decision

---

## R-006-GOV-002: Authority Hierarchy

### Authority
Repository_Governance.md, Architecture.md

### Rule
Authority resolution follows strict hierarchy: ADRs > Authority Records > Imported Canon > Experience Content > Historical Archive.

### Rationale
When sources conflict, higher authority wins. ADRs are the highest canonical authority.

### Allowed
- ADR decisions superseding all other sources
- Authority records superseding imported canon
- Clear escalation path for conflicts

### Prohibited
- Historical archive superseding ADRs
- Experience content superseding authority records
- Lower authority overriding higher authority

---

## R-006-GOV-003: No Bypass

### Authority
Repository_Governance.md

### Rule
The Canon Recovery Workflow is mandatory. No exceptions.

### Rationale
Bypassing the workflow propagates drift and errors. All imports must follow the same process.

### Allowed
- Following all 5 workflow steps
- Documenting each step
- Escalating when uncertain

### Prohibited
- Shortcutting workflow steps
- Emergency imports without audit
- Exception-based imports

---

## R-006-GOV-004: Evidence ≠ Canon

### Authority
Repository_Governance.md, Rebuild_Principles.md

### Rule
Historical archive evidence is not canonical until processed through the workflow.

### Rationale
Archives contain documented degradation patterns. Evidence requires classification and approval.

### Allowed
- Collecting evidence from archives
- Classifying evidence (Stable/Variant/Conflicting)
- Submitting for review

### Prohibited
- Treating archive evidence as canonical
- Importing without classification
- Assuming evidence accuracy

---

## R-006-GOV-005: Single Source of Truth

### Authority
Rebuild_Principles.md, Architecture.md

### Rule
One canonical repository. One authority layer per data domain. One decision workflow.

### Rationale
Parallel documentation creates conflicts. Single source of truth prevents drift.

### Allowed
- Single repository for all canonical data
- Single authority per domain
- Single workflow for all additions

### Prohibited
- Parallel documentation
- Conflicting implementations
- Multiple authority sources per domain

---

## R-006-GOV-006: Preserve Historical Evidence

### Authority
Rebuild_Principles.md

### Rule
Progetti archive remains read-only. Historical documentation remains traceable.

### Rationale
Canon recovery must be auditable back to evidence. Archives are sources, not targets.

### Allowed
- Querying Progetti archive
- Documenting source references
- Maintaining audit trail

### Prohibited
- Modifying Progetti archive
- Losing source traceability
- Undocumented decisions

---

## R-006-GOV-007: Audit Trail Required

### Authority
Repository_Governance.md

### Rule
All imports must reference: Recovery Report, Architecture Review decision, Authority Decision record.

### Rationale
Audit trail enables verification and rollback. Undocumented imports cannot be verified.

### Allowed
- Referencing recovery report ID
- Referencing architecture review decision
- Referencing authority decision record

### Prohibited
- Import without recovery report
- Import without review decision
- Import without authority decision

---

## R-006-GOV-008: Rejection is Valid

### Authority
Repository_Governance.md

### Rule
REJECTED information must not enter the repository. DEFERRED information must wait for resolution.

### Rationale
Not all evidence is suitable for import. Rejection and deferral are valid outcomes.

### Allowed
- Documenting rejection reasons
- Holding deferred information pending resolution
- Escalating for additional review

### Prohibited
- Importing rejected information
- Bypassing deferral
- Ignoring rejection decisions

---

## R-006-GOV-009: Character Recovery Rule

### Authority
Repository_Governance.md

### Rule
No character may enter the repository until recovery audit, architecture review, and authority decision are complete.

### Rationale
Characters are complex aggregates of multiple authority domains. All domains must be validated before import.

### Allowed
- Completing all audit steps
- Validating genealogy, identity, appearance
- Importing only after full approval

### Prohibited
- Partial character imports
- Import without genealogy validation
- Import without appearance validation

---

## R-006-GOV-010: Import Destinations

### Authority
Repository_Governance.md

### Rule
Approved information must enter the correct authority layer.

### Rationale
Each data domain has a designated owner. Import to wrong layer creates ownership conflicts.

### Allowed
- Genealogy → `authority/family/`
- Visual data → `authority/visual/`
- Character records → future `characters/`
- Scenario records → future `recovery/` or `experiences/`

### Prohibited
- Genealogy in character files
- Appearance in character files
- Scenario data in character files
- Wrong-layer imports

---

## R-006-GOV-011: No Direct Archive Imports

### Authority
Repository_Governance.md, Rebuild_Principles.md

### Rule
Direct imports from historical archives are prohibited.

### Rationale
Archives contain documented drift. Direct import propagates errors without review.

### Allowed
- Auditing archive data
- Classifying evidence
- Submitting for review

### Prohibited
- Copy-paste from Progetti
- Direct character data import
- Assumed family relationships

---

## R-006-GOV-012: Family Authority Before Expansion

### Authority
Rebuild_Principles.md

### Rule
Genealogy, dynasties, and kinship must be bulletproof before any world system is introduced.

### Rationale
Family relationships are immutable ground truth. Everything else is built on this foundation.

### Allowed
- Validating family authority first
- Completing genealogy audit
- Stabilizing dynasty records

### Prohibited
- World system expansion before family stable
- Character imports before genealogy validated
- Feature addition before foundation complete

---

## Summary

| Rule ID | Description |
|---------|-------------|
| R-006-GOV-001 | Canon Recovery Workflow |
| R-006-GOV-002 | Authority Hierarchy |
| R-006-GOV-003 | No Bypass |
| R-006-GOV-004 | Evidence ≠ Canon |
| R-006-GOV-005 | Single Source of Truth |
| R-006-GOV-006 | Preserve Historical Evidence |
| R-006-GOV-007 | Audit Trail Required |
| R-006-GOV-008 | Rejection is Valid |
| R-006-GOV-009 | Character Recovery Rule |
| R-006-GOV-010 | Import Destinations |
| R-006-GOV-011 | No Direct Archive Imports |
| R-006-GOV-012 | Family Authority Before Expansion |
