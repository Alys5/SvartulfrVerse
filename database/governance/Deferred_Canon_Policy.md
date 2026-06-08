# Deferred Canon Policy

**Status:** CANONICAL  
**Date:** 2026-06-07  
**Type:** Repository Operating Policy  
**Authority:** Architecture Review

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/Deferred_Canon_Policy.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Definitions

### Active Canon
Information currently allowed inside runtime compilation. Resides in `database/` (Single Source of Truth). May appear in active character records, active scenarios. Subject to all governance rules.

**Current Baseline (8 characters):** Wulfnic, Nixara, Erik, Logan, Malachia, Noah, Jasper, Alyssa — all Active.

### Deferred Canon
Canonically existing entities not currently compiled into runtime. Recovery audits allowed. Runtime participation prohibited.

**Current Deferred (15 entities):**
- Political Wives: Sigrid, Dagmar, Valeria
- Extended Lines: Gunnar, Ingrid, Astrid II, Torvald, Hagen, Sigrun, Bram, Knut, Lars, Sven, Valerius, Thyra

### Archive Canon
Historical material retained solely for research. No runtime authority.

## Import Rule: Deferred → Active

```
Step 1: Recovery Audit
    ↓
Step 2: Architecture Review
    ↓
Step 3: Runtime Justification
    ↓
Step 4: Authority Decision
```

Each step is mandatory. No shortcuts.

## Authority

Established by: Architecture Review & Canon Reconstruction Workspace  
Type: Repository Operating Policy  
Date: 2026-06-07  
Depends on: ADR-000 through ADR-005, Repository_Governance.md
