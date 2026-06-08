# Angel Moreno — Canon Candidate Recovery

**Date:** 2026-06-08  
**Type:** Recovery and Audit Operation — NOT Canonization  
**Authority:** Migration Architect  

---

## Decision Classification

> **This is a recovery and audit operation.**
> This is NOT a canonization.
> This is NOT a character migration.
> This is NOT a character creation task.

---

## Source Priority Compliance

| Priority | Source | Searched | Evidence Found |
|----------|--------|----------|----------------|
| 1 | old_template_and_source/ | ✓ | ✓ Yes — 3 hits |
| 2 | authority/ | ✓ | ✗ No direct reference |
| 3 | database/ | ✓ | ✓ Yes — 3 hits (via W_Contemporary.md) |
| 4 | core/ + reports/ | ✓ | ✗ No direct reference |
| 5 | D:\Progetti\database | ✓ (fallback) | ✓ Yes — 36 hits (Historical Archive) |

**Primary evidence sourced from Priority 1 (old_template_and_source/).**
Progetti data classified as **Historical Evidence** per Migration Source Priority rules.

---

## 1. Recovery Summary

Angel Moreno is a wealthy patron who funds Alyssa Douglas-Bloodmoon's modeling portfolio. He exists in the SvartúlfrVerse as a supporting NPC within the fashion industry domain, connected to the brand **Angel&Co**. The contemporary baseline evidence (Priority 1) provides a clean, single-character profile. The Progetti archive contains extensive cross-world legacy variants that are explicitly NOT authoritative for the contemporary baseline.

---

## 2. Evidence Inventory

### 2.1 Primary Evidence (Priority 1 — old_template_and_source/)

#### Source: old_template_and_source/worlds/W_Contemporary_source.md

| Field | Value | Line |
|-------|-------|------|
| Name | Angel Moreno | #105 |
| Role | Wealthy patron | #105 |
| Function | Funding Alyssa's modeling portfolio | #105 |
| Organization | Angel&Co (Fashion) | #69 |

#### Source: old_template_and_source/characters/Alyssa_source.md

| Field | Value | Line |
|-------|-------|------|
| Connection | Patron | #133 |
| Name | Angel Moreno | #133 |
| Role | Modeling patron | #133 |
| Source Attribution | C_Alyssa.js (legacy) | #133 |
| Brand | Angel&Co modeling | #188 |
| Deferred Status | "Deferred — Verify if canonical brand" | #188 |

#### Source: database/worlds/W_Contemporary.md (migrated record)

| Field | Value |
|-------|-------|
| Name | Angel Moreno |
| Role | Wealthy patron |
| Function | Funding Alyssa's portfolio |
| Organization | Angel&Co (Fashion) |

### 2.2 Historical Evidence (Priority 2 — Progetti Archive)

> **Classification: Historical Evidence — NOT Contemporary Canon**

The Progetti archive contains extensive cross-world variants of Angel Moreno. These are legacy artifacts from scrapped world settings and do NOT apply to the contemporary baseline.

| World Setting | Classification | Key Details |
|--------------|---------------|-------------|
| Contemporary (.js) | Closest to baseline | "Wealthy patron funding Alyssa's secret modeling portfolio; politically cautious fascination with her fragility" |
| Urban Fantasy | Scrapped | Vampire Lord of Solarton, age 40/832 |
| High Fantasy | Scrapped | Vampire Lord of Solarton |
| Cyber | Scrapped | Vampire Lord, holographic haute couture |
| Regency | Scrapped | Human Reclusive Billionaire |

**Critical Distinction:** The Progetti contemporary JS file describes Angel Moreno as human and non-supernatural — this aligns with ADR-000 contemporary baseline. All vampire/immortal variants are from scrapped world settings.

### 2.3 Cross-World Progetti Details (Historical Context Only)

The following details appear ONLY in Progetti cross-world legacy files and are explicitly NOT contemporary canon:

| Attribute | Progetti Value | Contemporary Canon |
|-----------|---------------|-------------------|
| Full Name | Visconti Angelo "Angel" Moreno | Angel Moreno |
| Title | Visconti | Not confirmed contemporary |
| Species | Vampire Lord (fantasy worlds) | Human (ADR-000) |
| Age | 40/832 (fantasy), 40 (regency) | Not specified |
| Hair | Silver-white | Not specified |
| Aesthetic | Ethereal beauty, bespoke suits | Not specified |
| Personality | Impeccable sophistication, dangerous, aesthetic obsession with fragility | Not specified |
| Speech | Formal elegance, indirect propositions | Not specified |
| Flaws | Possessive aesthetics, avoids Erik's wrath | Not specified |

**These Progetti attributes are classified as Historical Evidence from scrapped world settings and must NOT be used for contemporary characterization.**

---

## 3. Connection Map

### 3.1 Evidence-Backed Connections

| Character/Entity | Relationship | Source | Evidence Level |
|-----------------|-------------|--------|----------------|
| **Alyssa Douglas-Bloodmoon** | Modeling patron — funds her portfolio | W_Contemporary_source.md, Alyssa_source.md | **Strong** — multiple independent sources |
| **Angel&Co** | Founder/owner (implied by name) | W_Contemporary_source.md | **Medium** — single source, name implies ownership |
| **DCC** | None directly | — | **No evidence** — no direct connection documented |
| **Erik Douglas** | None directly | — | **No evidence** — Progetti mentions "avoids Erik's wrath" but this is Historical Evidence |
| **Logan Douglas** | None | — | **No evidence** |
| **Wulfnic Bloodmoon** | None | — | **No evidence** |
| **Jasper Douglas-Bloodmoon** | None | — | **No evidence** — Progetti Bruin Bracket event is Historical Evidence |
| **Noah Douglas-Bloodmoon** | None | — | **No evidence** |
| **Malachia Douglas-Bloodmoon** | None | — | **No evidence** |

### 3.2 Connection Confidence Assessment

| Connection | Confidence | Basis |
|------------|-----------|-------|
| Angel Moreno → Alyssa (patron) | **HIGH** | Multiple independent contemporary sources agree |
| Angel Moreno → Angel&Co (owner) | **MEDIUM** | Name implies; no explicit statement |
| Angel Moreno → Erik (avoids wrath) | **NONE** | Progetti-only; scrapped world settings |
| Angel Moreno → DCC | **NONE** | No documented connection |
| Angel Moreno → family members | **NONE** | No documented connections |

---

## 4. Conflict Analysis

### 4.1 Contemporary Baseline (Priority 1) vs Progetti Archive (Priority 2)

| Element | Contemporary Baseline | Progetti Archive | Classification |
|---------|---------------------|------------------|----------------|
| Species | Human (implied by ADR-000) | Vampire (fantasy worlds), Human (contemporary JS + Regency) | **Conflict** — Contemporary JS aligns with ADR-000 |
| Role | Wealthy patron, fashion | Modeling patron | **Aligned** |
| Supernatural | None | Vampire Lord in 3 worlds | **Conflict** — Rejected per ADR-000 |
| Age | Not specified | 40 (human variants), 40/832 (vampire) | **Unspecified** — Contemporary baseline doesn't define |
| Appearance | Not specified | Silver-white hair, bespoke suits | **Unspecified** — Contemporary baseline doesn't define |

### 4.2 Conflict Resolution

Per Migration Source Priority:

> **ADR-000 (Human only, non-supernatural) > old_template_and_source > Progetti Archive**

All supernatural attributes from Progetti are **REJECTED** for contemporary baseline. The contemporary JS description in Progetti ("wealthy patron...politically cautious fascination with her fragility") is consistent with the Priority 1 evidence and can be considered Historical Evidence that **aligns** with the baseline — but it is NOT promoted without Architecture Review.

### 4.3 Open Conflicts

| Conflict | Status |
|----------|--------|
| Angel&Co canonical brand status | **OPEN** — Alyssa_source.md lists as "Deferred — Verify if canonical brand" |
| Angel Moreno age | **UNSPECIFIED** — No contemporary source provides age |
| Angel Moreno appearance | **UNSPECIFIED** — No contemporary source provides physical description |
| Erik Douglas relationship | **UNSPECIFIED** — No contemporary evidence; Progetti-only reference rejected |

---

## 5. Architectural Classification

### 5.1 Authority Ownership

| Candidate Authority | Fit | Rationale |
|--------------------|-----|-----------|
| **Character Authority** | ⚠️ PARTIAL | Angel is a person with identity, but no character record exists. NO genealogy, NO biography, NO personality defined in contemporary sources. |
| **Institution Authority** | ⚠️ PARTIAL | Angel&Co could qualify as an institution, but lacks formal organizational structure. More of a brand/company reference. |
| **World Authority** | ✓ **PRIMARY** | Angel Moreno exists as a named NPC within the world. His function is world-building: he populates the fashion industry landscape of Los Angeles. He has no character arc, no biography, no personality — only a world role. |
| **Experience Authority** | ✗ NO | Angel does not serve a narrative function in any experience. |

### 5.2 Recommended Authority: **World Authority**

Angel Moreno is best classified as a **World Authority NPC** — a named entity that exists within the world definition to populate the setting. He is comparable to Sierra (SiSi), who also has no character record but exists as a named NPC in W_Contemporary.md.

### 5.3 Layer Placement

| Layer | Fit | Rationale |
|-------|-----|-----------|
| Active Canon | ⚠️ CONDITIONAL | The NAME and ROLE are confirmed by Priority 1 sources. Full Active Canon status requires resolving the Angel&Co brand status. |
| Historical Canon | ✗ NO | Not a historical fact about dynasties |
| Cultural Canon | ✗ NO | Not a family story or tradition |
| Deferred Canon | ✗ NO | Not a valid-but-inactive entity — Angel is currently present |
| **Candidate Canon** | ✓ **PRIMARY** | Meets Candidate criteria: proposed material not yet approved, partial evidence, open conflicts |

---

## 6. Canon Candidate Evaluation

### 6.1 Character Importance

| Level | Assessment |
|-------|-----------|
| **Critical** | NO — No story depends on Angel's existence |
| **High** | NO — Alyssa's modeling can exist without named patron |
| **Medium** | ⚠️ POSSIBLE — Angel provides narrative texture for Alyssa's fashion career |
| **Low** | ✓ **YES** — Angel is a background NPC with a single function |

### 6.2 Repository Role

| Option | Fit | Justification |
|--------|-----|---------------|
| **Full Character Record Candidate** | ✗ NO | Insufficient evidence. No biography, no personality, no relationships beyond Alyssa. |
| **Secondary Character Candidate** | ⚠️ POSSIBLE | If evidence emerges from Architecture Review, could warrant a character record. |
| **✓ Citation Only** | ✓ **YES** | Current evidence supports citation in W_Contemporary.md only. No character record justified. |

### 6.3 Repository Role Justification

Angel Moreno currently has exactly ONE confirmed function: **wealthy patron funding Alyssa's modeling portfolio**. This is a world-level detail, not a character-level detail. He is referenced institutionally (via Angel&Co) and functionally (as patron) but has no:

- Biography
- Personality traits
- Speech patterns
- Physical description (contemporary)
- Relationships (beyond financial patronage of Alyssa)
- Narrative arc or scene presence

Creating a character record (C_Angel.md) would require fabricating attributes not present in any contemporary source. This would violate the recovery rule: **"Do not infer. Do not expand. Do not invent."**

The appropriate repository treatment is **Citation Only** — maintaining the existing references in W_Contemporary.md without creating a separate character record.

---

## 7. Recommendations

### 7.1 Immediate Recommendation

**Remain Citation Only.**

Angel Moreno remains a named NPC in W_Contemporary.md with his current role: "Wealthy patron funding Alyssa's modeling portfolio." No character record is created.

### 7.2 Conditions for Promotion

Angel Moreno could be considered for a Secondary Character record if Architecture Review discovers:

1. Explicit contemporary appearance description
2. Personality traits from a canonical source
3. At least 2 documented relationships beyond Alyssa
4. Narrative role beyond financial patronage

### 7.3 Angel&Co Brand Status

The brand "Angel&Co" is listed as "Deferred — Verify if canonical brand" in Alyssa_source.md. This should be resolved separately — it is an Institution Authority question, not a Character Authority question.

---

## 8. Decision

| Field | Value |
|-------|-------|
| **Decision** | **Remain Citation Only** |
| **Evidence Sufficient for Character Record** | NO |
| **Evidence Sufficient for World Citation** | YES — Strong evidence (Priority 1) |
| **Open Conflicts** | 1 — Angel&Co brand status (Deferred) |
| **Authority** | World Authority |
| **Canon Classification** | Candidate Canon |

---

**Recovery Completed:** 2026-06-08  
**Authority:** Migration Architect  
**Rule Compliance:** No inference. No expansion. No invention. Explicit evidence only.
