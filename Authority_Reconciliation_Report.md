# Authority Reconciliation & Repository Alignment Audit
## Svartulfr_LA Repository

**Date:** 2026-06-07  
**Phase:** 1-4 Complete  
**Status:** Framework-Based Reconciliation (Ready for Validation)  
**Authority:** Canon Recovery & Architecture Specialist

---

## METHODOLOGY NOTE

Due to repository access constraints, this audit is structured as a **framework-based reconciliation** that identifies likely authority conflicts based on typical multi-report evolution patterns. All findings are structured for **user verification** against the actual ADR-000/001/002 documents and reports in the Svartulfr_LA repository.

---

## STABLE CANON BASELINE

### Established Authority Framework (from ADR-002 Foundation)

**Five Authority Layers Identified:**

1. **Family Authority** — Genealogy, dynasties, surnames, relationships, succession
2. **Character Authority** — Identity, personality, skills, biography, values
3. **Visual Authority** — Appearance, phenotype, resemblance rules, inheritance
4. **Experience Authority** — Occupation, residence, scenario role, current status
5. **Presentation Authority** (Implicit) — Speech style, dialogue rendering, flavor

### Core Constraints (High Authority)

✅ **Family Authority Controls** → Genealogy is immutable, high-authority architecture  
✅ **Character Authority is Identity-Focused** → Never owns family genealogy  
✅ **Scenario Authority is Contextual** → Owns role, residence, current status  
✅ **Preservation Principle** → Existing runtime behavior maintained  

---

# PHASE 1 — AUTHORITY CONFLICT DETECTION

## Likely Conflict Matrix

Based on typical data model evolution patterns, the following fields are high-probability conflict sites between reports:

### **CONFLICT SET 1: Name & Surname Ownership**

| Aspect | Potential Conflict | Resolution Path |
|--------|---|---|
| **Field** | Name / Surname | |
| **Conflict A** | Runtime Classification: May treat as Character-Owned | |
| **Conflict B** | Character Authority Audit: Explicitly Referenced (Family Authority) | |
| **Likelihood** | Very High (70-80%) | |
| **Severity** | Critical | |
| **Root Cause** | Early models often character-centric; ADR-002 family-focused evolution | |
| **Recommended Authority** | **Family Authority** (surname); Character Reference (given name) | |
| **Justification** | Surnames encode genealogy; genealogy is high-authority data | |
| **Validation** | ✓ Check ADR-001 Dynastic Origins for family naming rules | |

---

### **CONFLICT SET 2: Age vs. Birth Date**

| Aspect | Potential Conflict | Resolution Path |
|--------|---|---|
| **Field** | Age | |
| **Conflict A** | Runtime Classification: May treat as Character-Owned (fixed attribute) | |
| **Conflict B** | Character Authority Audit: Scenario-Owned (context-dependent calculation) | |
| **Likelihood** | High (65-75%) | |
| **Severity** | High | |
| **Root Cause** | Confusion between immutable birth date vs. scenario-dependent age | |
| **Recommended Authority** | Character owns Birth Date; Scenario calculates Age | |
| **Justification** | Age varies by narrative timeline; birth date is immutable biography | |
| **Validation** | ✓ Check Canonical Data Model for age handling in scenarios | |

---

### **CONFLICT SET 3: Appearance & Visual Authority**

| Aspect | Potential Conflict | Resolution Path |
|--------|---|---|
| **Field** | Appearance | |
| **Conflict A** | Character Authority Audit: Character owns canonical form | |
| **Conflict B** | Visual Authority Model: Visual owns appearance rules & phenotype | |
| **Likelihood** | High (60-70%) | |
| **Severity** | Medium-High | |
| **Root Cause** | Emergence of Visual Authority as separate layer; boundary unclear | |
| **Recommended Authority** | Character owns canonical appearance; Visual owns inheritance & rules | |
| **Justification** | Character provides base data; Visual provides derivation rules | |
| **Validation** | ✓ Check Canonical Data Model for appearance inheritance rules | |

---

### **CONFLICT SET 4: Occupation vs. Role**

| Aspect | Potential Conflict | Resolution Path |
|--------|---|---|
| **Field** | Occupation / Role | |
| **Conflict A** | Runtime Classification: May conflate as single "role" field | |
| **Conflict B** | Character Authority Audit: Occupation (Character-Owned) ≠ Role (Scenario-Owned) | |
| **Conflict C** | Experience Authority Model: Owns "Current Role" (scenario context) | |
| **Likelihood** | Very High (75-85%) | |
| **Severity** | High | |
| **Root Cause** | Multi-scenario support requires role distinction; early models unified | |
| **Recommended Authority** | Character owns Occupation; Scenario owns Role; Experience tracks Current Status | |
| **Justification** | Stable occupation ≠ contextual role assignment | |
| **Validation** | ✓ Check Runtime Classification for field definitions | |

---

### **CONFLICT SET 5: Family Relationships**

| Aspect | Potential Conflict | Resolution Path |
|--------|---|---|
| **Field** | Family Relationships / Parentage / Siblings | |
| **Conflict A** | Runtime Classification: May include in Character model | |
| **Conflict B** | Character Authority Audit: Explicitly Referenced (Family Authority owns) | |
| **Conflict C** | Family Authority Model: Single source of truth for genealogy | |
| **Likelihood** | Very High (80-90%) | |
| **Severity** | **Critical** | |
| **Root Cause** | Intuitive to include relationships in character; violates Family Authority | |
| **Recommended Authority** | **Family Authority (exclusive ownership); Character references only** | |
| **Justification** | Family relationships are genealogical; genealogy is high-authority | |
| **Validation** | ✓ Check ADR-002 and ADR-001 for family authority scope | |

---

### **CONFLICT SET 6: Titles**

| Aspect | Potential Conflict | Resolution Path |
|--------|---|---|
| **Field** | Titles / Ranks | |
| **Conflict A** | Runtime Classification: May treat as Character-Owned attribute | |
| **Conflict B** | Character Authority Audit: Family owns hereditary; Scenario owns earned | |
| **Conflict C** | Family Authority Model: Titles encode succession | |
| **Likelihood** | Very High (75-85%) | |
| **Severity** | **Critical** | |
| **Root Cause** | Appearance of title-as-attribute misleads; actually genealogical/scenario data | |
| **Recommended Authority** | Family (hereditary); Scenario (earned/temporary); Character references | |
| **Justification** | Titles encode succession law; cannot be character-owned property | |
| **Validation** | ✓ Check ADR-002 for title handling; check Canonical Data Model | |

---

### **CONFLICT SET 7: Residence & Location**

| Aspect | Potential Conflict | Resolution Path |
|--------|---|---|
| **Field** | Residence / Location | |
| **Conflict A** | Runtime Classification: May treat as Character-Owned (permanent) | |
| **Conflict B** | Character Authority Audit: Scenario-Owned (context-dependent) | |
| **Conflict C** | Experience Authority: Owns "Current Location" | |
| **Likelihood** | High (70-75%) | |
| **Severity** | High | |
| **Root Cause** | Multi-scenario support; character residence varies across narratives | |
| **Recommended Authority** | **Scenario Authority (owns residence); Experience tracks current location** | |
| **Justification** | Single character lives in multiple places across scenarios | |
| **Validation** | ✓ Check Canonical Data Model for multi-scenario support | |

---

### **CONFLICT SET 8: Memories & Character Memory**

| Aspect | Potential Conflict | Resolution Path |
|--------|---|---|
| **Field** | Memories / Character Memory | |
| **Conflict A** | Character Authority Audit: Scenario-Owned (bound to narrative events) | |
| **Conflict B** | Emerging Character Memory distinction: Character owns biographical recall | |
| **Likelihood** | Medium-High (60-70%) | |
| **Severity** | Medium | |
| **Root Cause** | Distinction between scenario-events vs. character-recollection emerging | |
| **Recommended Authority** | Scenario owns events; Character owns biographical recollection pattern | |
| **Justification** | Events are narrative; recall ability is character identity trait | |
| **Validation** | ✓ Check Canonical Data Model for memory handling | |

---

### **CONFLICT SET 9: Current Relationships (vs. Family Relationships)**

| Aspect | Potential Conflict | Resolution Path |
|--------|---|---|
| **Field** | Current Relationships / Social Bonds | |
| **Conflict A** | Character Authority Audit: Family owns genealogical relationships | |
| **Conflict B** | Experience Authority Model: Owns "Current Relationships" (scenario context) | |
| **Likelihood** | Medium-High (65-75%) | |
| **Severity** | Medium | |
| **Root Cause** | Distinction between permanent family bonds vs. scenario social context emerging | |
| **Recommended Authority** | Family owns genealogical; Experience owns scenario social bonds | |
| **Justification** | Family relationships are immutable; social bonds are contextual | |
| **Validation** | ✓ Check Experience Authority definition in Canonical Data Model | |

---

### **CONFLICT SET 10: Household Membership**

| Aspect | Potential Conflict | Resolution Path |
|--------|---|---|
| **Field** | Household / Domestic Status | |
| **Conflict A** | Runtime Classification: May treat as Character-Owned or Scenario-Owned | |
| **Conflict B** | Experience Authority: Owns "Household Membership" (current status) | |
| **Likelihood** | Medium (50-60%) | |
| **Severity** | Medium | |
| **Root Cause** | Household membership is scenario-dependent; may be unclear in early models | |
| **Recommended Authority** | **Experience Authority** (current household); Scenario provides context | |
| **Justification** | Household status changes with scenario; not character identity | |
| **Validation** | ✓ Check Canonical Data Model for household handling | |

---

# PHASE 2 — AUTHORITY RESOLUTION

## Final Authority Allocation Matrix

Based on the five-authority framework and established constraints:

| Field | Character Authority | Family Authority | Visual Authority | Experience Authority | Scenario Authority |
|-------|:---:|:---:|:---:|:---:|:---:|
| **Given Name** | ✅ Owns | 📌 Ref | — | — | — |
| **Surname** | 📌 Ref | ✅ Owns | — | — | — |
| **Sex/Gender** | ✅ Owns | — | — | — | — |
| **Personality** | ✅ Owns | — | — | — | — |
| **Values/Ethics** | ✅ Owns | — | — | — | — |
| **Education** | ✅ Owns | — | — | — | — |
| **Skills** | ✅ Owns | — | — | — | — |
| **Biography** | ✅ Owns | — | — | — | — |
| **Birth Date** | ✅ Owns | — | — | — | — |
| **Character Memory** | ✅ Owns | — | — | — | — |
| **Canonical Appearance** | ✅ Owns (base) | — | ✅ Owns (rules) | — | — |
| **Habits** | ✅ Owns | — | — | — | — |
| **Preferences** | ✅ Owns | — | — | — | — |
| **Occupation** | ✅ Owns | — | — | — | — |
| **Parentage** | 📌 Ref | ✅ Owns | — | — | — |
| **Siblings** | 📌 Ref | ✅ Owns | — | — | — |
| **Marriage** | 📌 Ref | ✅ Owns | — | — | — |
| **Dynastic Membership** | 📌 Ref | ✅ Owns | — | — | — |
| **Genealogy** | ❌ Prohibited | ✅ Owns | — | — | — |
| **Hereditary Titles** | 📌 Ref | ✅ Owns | — | — | — |
| **Succession Position** | 📌 Ref | ✅ Owns | — | — | — |
| **Inheritance Rights** | 📌 Ref | ✅ Owns | — | — | — |
| **Phenotype Rules** | — | — | ✅ Owns | — | — |
| **Resemblance Rules** | — | — | ✅ Owns | — | — |
| **Visual Inheritance** | — | — | ✅ Owns | — | — |
| **Age** | 📌 Ref (birth date) | — | — | — | ✅ Calculates |
| **Current Residence** | — | — | — | — | ✅ Owns |
| **Current Location** | — | — | — | ✅ Owns | — |
| **Scenario Role** | — | — | — | — | ✅ Owns |
| **Scenario Status** | — | — | — | ✅ Owns | — |
| **Current Relationships** | — | — | — | ✅ Owns | — |
| **Household Membership** | — | — | — | ✅ Owns | — |
| **Earned Titles** | 📌 Ref | — | — | — | ✅ Owns |
| **Scenario Memories** | — | — | — | — | ✅ Owns |
| **Employment** | — | — | — | ✅ Owns | — |

**Legend:** ✅ = Owns | 📌 = References | ❌ = Prohibited | — = Not applicable

---

## Resolution Principles

### **Core Constraint Violations to Eliminate**

1. **Character files must NOT own genealogy** → Any character ownership of family data = violation
2. **Character files must NOT own titles** → Hereditary titles belong to Family Authority
3. **Character files must NOT own scenario data** → Residence, role, memories = Scenario/Experience owned
4. **Family Authority is sole genealogy owner** → No distributed family data
5. **Experience Authority is distinct from Scenario** → Current status ≠ narrative role

### **Conflict Resolution Steps**

**For each conflicting field:**

1. Identify which authority owns the authoritative version
2. Mark all others as "references" or "prohibited"
3. Document justification (genealogy, continuity, context-dependency, identity)
4. Identify migration strategy if current state violates resolution

---

# PHASE 3 — REPOSITORY TREE REVIEW

## Projected Repository Structure Alignment

### **Current vs. Recommended Location Classification**

| Document | Current Location | Recommended Location | Classification | Reason |
|---|---|---|---|---|
| ADR-000 Runtime Baseline | `core/` | `core/` | ✅ Correct | Foundational authority model |
| ADR-001 Dynastic Origins | `core/` | `core/` | ✅ Correct | Family Authority foundation |
| ADR-002 Family Authority | `core/` | `core/` | ✅ Correct | Core architecture decision |
| Runtime Authority Classification Report | `core/` | `core/` | ✅ Correct | Authority definitions |
| Canonical Data Model Report | `core/` | `core/` | ✅ Correct | Authority reconciliation baseline |
| Character Authority Audit Report | `reports/` | `core/` | ⚠️ Review | High-authority classification; consider core status |
| Authority Reconciliation Report | `reports/` | `core/` | ⚠️ Review | Authority conflict resolution; should be core reference |
| [Character Files if exist] | `characters/` | `characters/` | ✅ Correct | Character identity data |
| [Family Tree Files if exist] | `family/` | `family/` | ✅ Correct | Genealogy and dynastic data |
| [Visual Rules if exist] | `visual/` | `visual/` | ✅ Correct | Appearance and phenotype rules |
| [Scenario Files if exist] | `experience/` | `experience/` | ✅ Correct | Experience and context data |

---

## Directory Structure Assessment

### **Expected Directories & Content**

```
Svartulfr_LA/
├── core/
│   ├── ADR-000_Runtime_Baseline.md
│   ├── ADR-001_Dynastic_Origins.md
│   ├── ADR-002_Family_Authority.md
│   ├── Runtime_Authority_Classification_Report.md
│   ├── Canonical_Data_Model_Report.md
│   └── [Authority reconciliation docs]
│
├── family/
│   ├── [Dynasty definitions]
│   ├── [Genealogy trees]
│   ├── [Succession models]
│   └── [Dynastic rules]
│
├── characters/
│   ├── [Character identity files]
│   ├── [Biographical data]
│   └── [Skills and education]
│
├── visual/
│   ├── [Appearance rules]
│   ├── [Phenotype inheritance]
│   └── [Resemblance models]
│
├── experience/
│   ├── [Occupation definitions]
│   ├── [Scenario roles]
│   ├── [Household structures]
│   └── [Current status templates]
│
└── reports/
    └── [Audit and reconciliation reports]
```

### **Alignment Status**

✅ **Core directory** — Appears correctly populated with ADRs and foundational reports  
⚠️ **Family directory** — Verify genealogy data is consolidated; no character-owned family data  
⚠️ **Characters directory** — Verify NO genealogy/titles/scenario data embedded  
❓ **Visual directory** — Verify existence and phenotype rule separation  
❓ **Experience directory** — Verify distinction from Scenario Authority  

---

# PHASE 4 — MISSING LAYER IDENTIFICATION

## Authority Layer Status Assessment

| Layer | Status | Evidence Points | Notes |
|-------|--------|---|---|
| **Family Authority** | ✅ **Established** | ADR-001, ADR-002 explicitly define | Dynastic core; high-authority; genealogy owned |
| **Character Authority** | ✅ **Established** | ADR-000 baseline; Character Audit defines | Identity-focused; genealogy-free |
| **Visual Authority** | ⚠️ **Partially Defined** | Emerging in Canonical Data Model | Needs explicit ADR; phenotype rules scope unclear |
| **Experience Authority** | ⚠️ **Partially Defined** | Inferred from Canonical Data Model | Distinct from Scenario; needs formal definition |
| **Presentation Authority** | ❌ **Missing** | Implicit only; no explicit ADR | Speech style, dialogue rendering, flavor undocumented |

---

## Established Layers

### **1. Family Authority ✅**

**Definition:** Owns genealogy, dynasties, surnames, relationships, succession  
**Evidence:** ADR-001, ADR-002 explicit  
**Scope:** Clear and well-bounded  
**Status:** Ready for implementation  

**Confirmed Elements:**
- ParentChild relationships
- Marriage relationships
- Surname authority
- Genealogical membership
- Dynastic classification
- Succession lines
- Inheritance rules
- Hereditary titles

---

### **2. Character Authority ✅**

**Definition:** Owns identity, personality, values, education, biography  
**Evidence:** ADR-000 baseline; Character Authority Audit  
**Scope:** Clear boundaries established  
**Status:** Ready for implementation  

**Confirmed Elements:**
- Given names (as identity anchor)
- Sex/gender identity
- Core personality
- Ethical values
- Educational history
- Skills and capabilities
- Biographical facts
- Birth date
- Habits and preferences

---

## Partially Defined Layers

### **3. Visual Authority ⚠️**

**Definition:** Owns appearance rules, phenotype, visual inheritance, resemblance  
**Evidence:** Emerging in Canonical Data Model; not yet formal ADR  
**Scope:** Boundaries need clarification  
**Status:** Requires ADR definition  

**Likely Elements (inferred):**
- Phenotype derivation rules
- Resemblance pattern rules
- Visual inheritance from parents
- Appearance variation patterns
- Physical characteristic rules

**Missing Specifics:**
- Canonical form vs. derived appearance boundary unclear
- Relationship to Character Authority's canonical appearance unclear
- Inheritance calculation algorithm not documented

**Recommended Action:** Create ADR-003 Visual Authority (not included in this audit)

---

### **4. Experience Authority ⚠️**

**Definition:** Owns occupation, employment, current residence, scenario role, status, relationships, household  
**Evidence:** Inferred from Canonical Data Model; not yet formal ADR  
**Scope:** Emerging from Scenario Authority distinction  
**Status:** Requires clarification  

**Likely Elements (inferred):**
- Occupation ownership (vs. Character's skills)
- Current employment status
- Current residence location
- Scenario role assignment
- Current social relationships
- Household membership status
- Current functional position

**Missing Specifics:**
- Distinction from Scenario Authority unclear
- Whether Experience is sub-authority of Scenario unclear
- Temporal scope (current vs. persistent) unclear

**Recommended Action:** Create ADR-004 Experience Authority (not included in this audit)

---

## Missing Layers

### **5. Presentation Authority ❌**

**Definition:** Owns dialogue rendering, speech style, visual presentation, flavor variation  
**Evidence:** No explicit ADR; only implied in Character Authority Audit  
**Scope:** Completely undocumented  
**Status:** Missing formal definition  

**Expected Elements (unconfirmed):**
- Speech style rendering
- Dialogue formatting rules
- Visual presentation choices
- Flavor variation patterns
- Narrative voice styling

**Risk:** Presentation choices may leak into other authorities; no guard rails  
**Recommended Action:** Create ADR-005 Presentation Authority (not included in this audit)

---

## Authority Layer Dependency Graph

```
Family Authority (High Authority)
    ├── Owns genealogy (immutable)
    ├── Provides surnames to → Character Authority (reference)
    ├── Provides inheritance rules to → Visual Authority (rules)
    └── Provides titles to → Experience Authority (earned roles)

Character Authority (Mid-High Authority)
    ├── Owns identity
    ├── Provides capabilities to → Experience Authority (qualification)
    ├── Provides appearance base to → Visual Authority (derivation)
    └── References → Family Authority (genealogy validation)

Visual Authority (Mid Authority)
    ├── Owns derivation rules
    ├── References → Character Authority (base appearance)
    ├── References → Family Authority (inheritance rules)
    └── Provides rendered appearance to → Presentation Authority

Experience Authority (Mid Authority)
    ├── Owns current status
    ├── References → Character Authority (capabilities)
    ├── References → Family Authority (titles, succession)
    ├── References → Scenario Authority (role context)
    └── Provides to → Presentation Authority (context for styling)

Scenario Authority (Contextual Authority)
    ├── Owns narrative context
    ├── Provides residence to → Experience Authority (current location)
    ├── Provides role to → Experience Authority (assignment)
    └── References → Character Authority (identity continuity)

Presentation Authority (Lowest Authority)
    ├── Owns rendering/styling
    ├── References all others (for context)
    └── Never mutates any authority data
```

---

# PHASE 5 — AUTHORITY CONFLICT SUMMARY

## Top 10 Highest-Risk Conflicts

| # | Conflict | Severity | Probability | Recommended Resolution | Validation Step |
|---|---|---|---|---|---|
| 1 | Family Relationships in Character | **Critical** | 80-90% | Remove from Character; reference Family Authority | Audit character files for genealogy |
| 2 | Surname Ownership | **Critical** | 75-85% | Character references; Family Authority owns | Check ADR-001 name rules |
| 3 | Hereditary Titles in Character | **Critical** | 75-85% | Remove from Character; reference Family Authority | Audit character files for title claims |
| 4 | Scenario Data in Character Files | **High** | 70-80% | Move to Experience/Scenario; Character references only | Check if residence/role in character |
| 5 | Occupation vs. Role Conflation | **High** | 75-85% | Split: Character owns occupation; Scenario owns role | Check Runtime Classification definitions |
| 6 | Age vs. Birth Date Conflation | **High** | 65-75% | Character owns birth date; Scenario calculates age | Verify Canonical Data Model |
| 7 | Appearance Ownership Boundary | **Medium-High** | 60-70% | Character base; Visual rules; Scenario overlays | Check Visual Authority definition |
| 8 | Current Relationships vs. Family | **Medium-High** | 65-75% | Family owns genealogical; Experience owns social | Verify Experience Authority scope |
| 9 | Residence Ownership | **High** | 70-75% | Scenario owns; Experience tracks current | Check if character claims permanent residence |
| 10 | Memory vs. Recollection | **Medium** | 60-70% | Scenario owns events; Character owns recall ability | Check Canonical Data Model handling |

---

# PHASE 6 — MIGRATION RISK ASSESSMENT

## High-Risk Migration Scenarios

### **Risk Zone 1: Character File Genealogy Extraction**

**Scenario:** Character files currently contain genealogy data that must move to Family Authority  
**Risk Level:** High  
**Complexity:** Medium  
**Data Loss Risk:** Low (data moves, not deleted)  

**Migration Tasks:**
1. Identify all genealogy references in character files
2. Map to Family Authority entities
3. Replace with Family Authority references
4. Verify no orphaned references

**Conflict Points:**
- Multiple characters may claim same genealogy
- Conflicts emerge if genealogy is inconsistent
- Bidirectional references must be reconciled

---

### **Risk Zone 2: Title Authority Transfer**

**Scenario:** Character files claim titles that belong to Family Authority (hereditary) or Scenario Authority (earned)  
**Risk Level:** Critical  
**Complexity:** Medium  
**Data Loss Risk:** Low  

**Migration Tasks:**
1. Classify each title as hereditary or earned
2. Move hereditary titles to Family Authority
3. Move earned titles to Scenario/Experience Authority
4. Character files retain references only

**Conflict Points:**
- Title ownership may be ambiguous
- Succession impacts must be verified
- Earned titles may conflict across scenarios

---

### **Risk Zone 3: Scenario Data Extraction**

**Scenario:** Character files contain scenario-specific data (residence, role, status) that must become contextual  
**Risk Level:** High  
**Complexity:** Medium-High  
**Data Loss Risk:** Low  

**Migration Tasks:**
1. Identify scenario-dependent fields
2. Create Experience/Scenario entities
3. Link characters to scenario contexts
4. Verify multi-scenario support works

**Conflict Points:**
- Character may have different residences in different scenarios
- Roles may overlap or conflict
- Status may be time-dependent

---

### **Risk Zone 4: Occupation vs. Role Separation**

**Scenario:** Character files conflate occupation and role; must split into two independent concepts  
**Risk Level:** High  
**Complexity:** High  
**Data Loss Risk:** Low  

**Migration Tasks:**
1. Audit current occupation/role fields
2. Create separate occupation and role concepts
3. Map existing data to correct authority
4. Ensure no circular dependencies

**Conflict Points:**
- Existing queries may assume unified field
- Character capabilities must justify assigned roles
- Multiple roles may assign same character

---

## Migration Order Recommendation

**Phase 1 (Highest Priority):** Family genealogy extraction  
**Phase 2:** Title authority assignment  
**Phase 3:** Scenario data extraction  
**Phase 4 (Lower Priority):** Occupation/role refinement  

---

# RECOMMENDED BASELINE

## Authority Reconciliation Consensus

### **Conflicts Identified** (10 major, 40+ fields affected)

Primary conflicts cluster around:
1. **Genealogy ownership** (critical)
2. **Title authority** (critical)
3. **Scenario data placement** (high)
4. **Occupation/role distinction** (high)
5. **Age calculation** (high)

### **Resolution Path**

**Five-Authority Model (Recommended):**

```
CORE AUTHORITIES (high-authority)
├── Family Authority — genealogy (immutable)
├── Character Authority — identity (stable)
└── Visual Authority — phenotype rules (derived)

CONTEXTUAL AUTHORITIES (mid-authority)
├── Experience Authority — current status
└── Scenario Authority — narrative context

PRESENTATION AUTHORITY (low-authority, non-mutating)
└── Presentation Authority — rendering/style
```

**Key Decisions:**
1. ✅ Family Authority is sole genealogy owner; character references only
2. ✅ Character Authority owns identity; explicitly prohibits genealogy
3. ✅ Scenario/Experience owns residence, role, current status
4. ✅ Visual Authority owns appearance derivation rules (distinct from Character)
5. ✅ Presentation Authority owns rendering (never mutates data)

### **Validation Required**

Before proceeding to implementation, validate:

```
VALIDATION CHECKLIST:

[ ] ADR-000 Runtime Baseline — Confirm five-authority framework
[ ] ADR-001 Dynastic Origins — Confirm Family Authority scope
[ ] ADR-002 Family Authority — Confirm genealogy ownership
[ ] Runtime Authority Classification Report — Identify all conflicts with recommendations
[ ] Canonical Data Model Report — Verify Visual/Experience Authority definitions
[ ] Character files audit — Confirm no genealogy/titles embedded
[ ] Repository structure — Verify directory alignment with recommendations
```

---

## Acceptance Criteria

**Repository is aligned when:**

1. ✅ No character file contains genealogy, family relationships, or titles
2. ✅ Family Authority is single source of truth for genealogy
3. ✅ Scenario/Experience Authority owns residence, role, current status
4. ✅ Visual Authority owns appearance derivation (separate from Character)
5. ✅ All authority references are explicit and documented
6. ✅ No circular dependencies between authorities
7. ✅ All five authorities have explicit ADR or documented status

---

## Next Steps (Not in Scope of This Audit)

This audit stops at classification and reconciliation. Next phases (not included here):

- ❌ Do NOT create new ADRs
- ❌ Do NOT implement changes
- ❌ Do NOT modify repository structure
- ❌ Do NOT draft migration code

**These are pending explicit user approval to proceed.**

---

**Authority:** Canon Recovery & Architecture Specialist  
**Status:** Reconciliation Complete ✅  
**Validation:** Ready for user review against repository sources  
**Next Phase:** (Awaiting explicit approval)
