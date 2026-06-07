# ADR-000: Runtime Baseline

**Status:** DECISION  
**Date:** 2026-06-07  
**Title:** Canonical Repository Bootstrap & Archive Freeze

## Context

The Progetti repository (historical archive) contains significant canonical data accumulated over multiple versions, but exhibits documented degradation patterns:

- Noah occupation drift
- Douglas-Bloodmoon naming inconsistencies
- Family relationship degradation
- World canonical compression
- Character role homogenization

The current SvartulfrVerse repository requires stable, validated foundation before expansion.

## Decision

1. **Progetti becomes read-only Historical Archive**
   - No further development in legacy repository
   - Reference only for canon recovery
   - Source for historical verification

2. **SvartulfrVerse becomes Active Runtime Repository**
   - Single source of truth for current canon
   - Runtime behavior validates all data
   - Canonical stabilization before expansion
   - Limited bootstrap scope: Only Human + Contemporary + Los Angeles Dynasty

3. **Canon Recovery Workflow established**
   - NotebookLM queries historical data
   - Archive verification confirms variations
   - Character audits reconcile conflicts
   - Architecture review approves imports
   - Explicit decision gates all additions
   - No direct archive imports

## Rationale

- Runtime preservation prevents behavior loss
- Incremental validation prevents drift recurrence
- Single source of truth reduces contradictions
- Explicit workflow creates audit trail
- Contemporary + Only Human scope enables deep canonical stability before world expansion

## Constraints

- No legacy content imported until validated
- No runtime logic in bootstrap phase
- No character definitions until audited
- No world systems until architecture approved
- No supernatural systems until scope expansion approved

## Implications

- Phase 1: Repository skeleton & documentation (current)
- Phase 2: Character validation & import (Douglas-Bloodmoon core line)
- Phase 3: World/experience layer validation
- Phase 4: System layer expansion (if approved)

All phases require explicit canon decisions before implementation.

## Authority

Established by: Family Authority & Canon Reconstruction Workspace  
Approved by: Runtime Validation  
Supersedes: All legacy Progetti workflows
