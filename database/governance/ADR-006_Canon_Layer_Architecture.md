# ADR-006: Canon Layer Architecture

**Status:** ACCEPTED  
**Date:** 2026-06-07  
**Title:** Canon Layer Classification and Cross-Layer Governance

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/ADR-006_Canon_Layer_Architecture.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Context

ADR-000 through ADR-005 established the authority layer architecture. The repository now operates with multiple canon categories that lack formal definition. This ADR establishes a five-layer Canon Architecture with explicit governance rules.

## Decision

We establish a five-layer Canon Architecture with explicit governance rules for each layer.

### Layer 1: Active Canon

**Definition:** Information currently eligible for runtime compilation. Full ADR compliance required.

**Properties:** Runtime-eligible, Governance-enforced, ADR compliance required, Modification requires Authority Decision.

**Current Contents:** Dynasties (Bloodmoon, Douglas, Douglas-Bloodmoon), Characters (Wulfnic, Nixara, Erik, Malachia, Noah, Jasper, Alyssa), Visual Canon (Fusion Model, Baselines, Inheritance), Timeline, Institutions (DCC).

**Constraints:** MUST comply with all ADRs, remain human-only, stay within contemporary timeline, follow authority boundaries.

### Layer 2: Historical Canon

**Definition:** Documented historical facts about the dynasties. Documentation required.

**Properties:** Reference-only runtime access, Documentation required, Modification requires evidence.

**Current Contents:** English origin (Douglas), Icelandic origin (Bloodmoon), Colonial expansion, Merchant tradition, DCC evolution, Edric Ættfaðir Svartúlfa (725 AD — Svartúlfr lineage founder), 1666 Foundation — Merchant House Douglas, Douglas Colonial Trading Company (1700s), Douglas California Establishment (tradition).

### Layer 3: Cultural Canon

**Definition:** Family stories, oral traditions, myths, legends. Preservation-focused, not runtime truth.

**Properties:** Reference-only, Append-only modification, Not factual.

**Current Contents:** Svartúlfr (Black Wolf), Fenrir, Werewolves, Trolls, Draugr, Seiðr, Jötnar, Moon spirits, Alpha hierarchy.

**Critical Distinction:** Cultural Canon IS stories the family tells. IS NOT runtime facts, supernatural truth, or Active Canon elements.

### Layer 4: Deferred Canon

**Definition:** Canonically valid entities not currently active in runtime.

**Properties:** Runtime participation prohibited, Future expansion candidates.

**Activation Process:** Recovery Audit → Architecture Review → Runtime Justification → Authority Decision.

**Current Contents:** 3 Political Wives (Sigrid, Dagmar, Valeria) + 12 Extended Lines.

### Layer 5: Candidate Canon

**Definition:** Proposed material not yet approved for any active layer. Full review required.

**Current Contents:** Regency Era Layer, Colonial Timeline Details, Early Douglas Genealogy, Vanguard PMC. (1666 Foundation Year promoted to Historical Canon — 2026-06-08)

---

## Cross-Layer Governance

### Promotion Rules

| From | To | Process |
|------|-----|---------|
| Candidate | Any | Full review + Authority Decision |
| Deferred | Active | Recovery + Review + Justification + Decision |
| Historical | Active | Documentation + Authority Decision |
| Cultural | Active | PROHIBITED |

### Conflict Resolution

| Conflict | Resolution |
|----------|------------|
| Active vs Historical | Active Canon prevails |
| Active vs Cultural | Active Canon prevails |
| Historical vs Cultural | Historical prevails |

### Layer Authority Matrix

| Layer | Authority | Modification | Runtime Access |
|-------|-----------|-------------|----------------|
| Active Canon | Full ADR | Decision | Full compilation |
| Historical | ADR-001 | Evidence | Reference only |
| Cultural | Preservation | Append-only | Dialogue flavor |
| Deferred | DCP | Activation | Prohibited |
| Candidate | Review | Approval | Prohibited |

---

## Dynasty Duality Integration

- **Douglas Dynasty:** Primary Layer = Historical Canon (documentary: land deeds, corporate records)
- **Bloodmoon Dynasty:** Primary Layer = Cultural Canon (narrative: family sagas, oral traditions)
- **Douglas-Bloodmoon:** Active Canon (union of material power + cultural heritage)

---

## Consequences

- All character reviews must explicitly classify findings by layer
- Runtime queries must respect layer boundaries
- All future ADRs must specify which layer they affect
- Layer transitions require explicit Authority Decisions

## Authority

Established by: Architecture Review & Canon Reconstruction Workspace  
Approved by: Runtime Validation  
Supersedes: Ad-hoc canon classification practices  
Depends on: ADR-000, ADR-001, ADR-002, ADR-003, ADR-004, ADR-005, Deferred Canon Policy

**This ADR represents the definitive canon layer architecture for SvartulfrVerse.**
