# ADR-002 Report

**Date:** 2026-06-07  
**ADR Reference:** ADR-002_Family_Authority.md  
**Status:** COMPLETE

---

## Executive Summary

ADR-002 establishes the Family Authority Layer as the canonical, sole custodian of all genealogical, kinship, dynastic, and surname data within Svartulfr_LA. The ADR formalizes the distinction between explicit authority records (parent, child, marriage, adoption, half-sibling) and derived relationships (sibling, grandparent, uncle, cousin, etc.), and explicitly prohibits runtime inference of genealogy.

---

## Decisions Recorded

### Decision 1: Family Authority Layer Ownership

**Scope:** Complete authority over genealogy, kinship, lineage, dynastic ownership, surnames

**Implementation:**
- Family Authority Layer = sole canonical source for genealogy
- Character Layer = references genealogy (read-only)
- World/Experience Layer = references dynasty (read-only)
- No distributed genealogy permitted

**Authority Level:** HIGHEST (supersedes all other data sources)

### Decision 2: Canonical Relationship Classes

**Explicit Authority Records** (stored, immutable, canonical):
1. Parent (unidirectional, immutable)
2. Child (unidirectional, immutable)
3. Marriage (legal union, immutable)
4. Former Marriage (historical record, immutable)
5. Adoption (legal relationship, immutable)
6. Half-Sibling (shared-parent marker, immutable)

**Derived Relationships** (computed, never stored as canon):
- Sibling, Grandparent, Grandchild, Uncle, Aunt, Nephew, Niece, Cousin, In-Law

**Constraint:** Derived relationships must be computed from authority records; never stored as independent facts.

### Decision 3: Inference Prohibition

**Policy:** Runtime may NOT infer genealogy from non-genealogical data.

**Permitted:**
- Query Family Authority records
- Compute derived relationships
- Validate claimed relationships
- Return read-only genealogy

**Prohibited:**
- Infer relationships from behavior, occupation, residence
- Derive genealogy from context patterns
- Create new genealogical facts
- Modify Family Authority without explicit decision
- Store derived relationships as independent canon

### Decision 4: Canonical Ownership Model

**Character Layer owns:**
- Identity (personality, sex, biography, education)
- References genealogy (read-only to Family Authority)
- Prohibited: Genealogy definition, surname authority

**World/Experience Layer owns:**
- Context (occupation, residence, scenario role)
- References dynasty (read-only to Family Authority)
- Prohibited: Genealogy definition, family structure

**Family Authority Layer owns:**
- Genealogy, kinship, lineage, dynastic membership, surnames
- Provides read-only queries
- Prohibited: Character identity, experience context, behavioral computation

### Decision 5: Dynasty Authority Framework

**Bloodmoon Dynasty**
- Origin: Iceland
- American founder: Wulfnic Bloodmoon (first American-born)
- Los Angeles Dynasty representative: Nixara Bloodmoon
- Status: Background authority for Douglas-Bloodmoon union

**Douglas Dynasty**
- Origin: England (1700s)
- Los Angeles Dynasty representative: Erik Douglas
- Status: Background authority for Douglas-Bloodmoon union

**Douglas-Bloodmoon Dynasty**
- Origin: Union of Erik Douglas + Nixara Bloodmoon
- Status: Sovereign dynasty in own right
- Current membership: Erik, Nixara, Malachia, Noah, Jasper, Alyssa

### Decision 6: Surname Authority

**Douglas (Generic Family Surname)**
- Passed through Douglas Dynasty descent
- No mandate for modification
- Variants permitted (Douglass, etc.)
- Inheritance rules unresolved (future ADR-003)

**Bloodmoon (Generic Family Surname)**
- Passed through Bloodmoon Dynasty descent
- No mandate for modification
- Variants permitted
- Inheritance rules unresolved (future ADR-003)

**Douglas-Bloodmoon (Dynastic Surname)**
- Hyphenation MANDATORY (no variations)
- Exclusive to Erik + Nixara union heirs
- Current mandate: All four first-gen heirs must carry Douglas-Bloodmoon
- NOT a generic family surname; a dynastic designation
- Inheritance rules UNRESOLVED (future ADR-003)

### Decision 7: Historical Failure Analysis

**Four identified runtime failures with root causes:**

1. **Valerius** — Authority conflict (character file vs. genealogy mismatch)
   - Lesson: Character files must reference, not define genealogy

2. **Cassia** — Authority conflict (multiple genealogical claims)
   - Lesson: Genealogy must be explicitly declared, not inferred

3. **Hati** — Inference failure (derived relationships stored as canon)
   - Lesson: Derived relationships must be computed, never stored

4. **Sköll** — Missing data (incomplete genealogy)
   - Lesson: Explicit records required; no assumptions permitted

---

## Authority Rules Established

### Rule 1: Family Authority = Single Source of Truth

- All genealogy flows from Family Authority
- No distributed genealogical claims
- No character file genealogy
- No world file genealogy
- All queries must go through Family Authority

### Rule 2: Explicit Authority Records are Immutable

- Parent, Child, Marriage, Former Marriage, Adoption, Half-Sibling
- Once established, do not change
- Changes require formal ADR override
- Immutability prevents genealogical drift

### Rule 3: Derived Relationships are Read-Only Computed

- Sibling, Grandparent, Uncle, Aunt, Cousin, etc.
- Must be computed from authority records
- Never stored as independent facts
- Prevents storage inconsistency

### Rule 4: Zero Runtime Genealogy Inference

- No inference from occupation, residence, behavior
- No derived relationships stored as facts
- No computed genealogy independent of Family Authority
- Prevents legacy drift recurrence

### Rule 5: Character Files Reference Genealogy

- Character may know their family relationships
- Character may not define them
- All genealogical queries must reference Family Authority
- Maintains authority boundaries

### Rule 6: World Files Reference Dynasties

- World may use dynasty membership for context
- World may not define genealogy
- Dynasty membership determined by Family Authority
- Maintains authority boundaries

### Rule 7: Douglas-Bloodmoon Hyphenation Mandatory

- No variants (Douglasbloodmoon, Douglas Bloodmoon, etc.)
- Exclusive to union of Erik + Nixara
- Non-negotiable for first generation
- Future inheritance rules pending ADR-003

### Rule 8: Genealogy Ownership vs. Behavior Ownership

- Family Authority owns genealogy (immutable)
- Character Authority owns identity (immutable)
- Experience Authority owns context (mutable by scenario)
- No overlap or conflict permitted

---

## Unresolved Questions

### Question 1: Extended Genealogy Depth

**Question:** What is the complete genealogy of Iceland Bloodmoons prior to Wulfnic?

**Current Status:** Not investigated; beyond current scope (Only Human, Contemporary).

**Impact:** Low (contemporary Los Angeles Dynasty does not require deep genealogy)

**Resolution Path:** ADR-004 (Extended Genealogy) will define scope and depth requirements.

### Question 2: Douglas Collateral Lines

**Question:** Does Erik Douglas have siblings? What genealogy applies to extended Douglas family?

**Current Status:** Not investigated; beyond current scope.

**Impact:** Medium (extended family relationships may be relevant to Los Angeles Dynasty)

**Resolution Path:** ADR-004 will address collateral lines and background genealogy.

### Question 3: Adoption Treatment

**Question:** Are adoptions treated identically to biological relationships for all purposes?

**Current Status:** ADR-002 treats adoption as equivalent to biological parent-child; no special restrictions.

**Impact:** Low (no adoptions documented for Los Angeles Dynasty yet)

**Resolution Path:** Clarified in ADR-002; further detail in ADR-003.

### Question 4: Marriage Timeline

**Question:** When did Erik and Nixara marry? Does marriage date affect inheritance rules?

**Current Status:** Not specified in ADR-001 or ADR-002.

**Impact:** Medium (marriage date may affect legitimacy or inheritance claims)

**Resolution Path:** ADR-003 (Inheritance) will define impact of marriage timing.

### Question 5: Genealogy vs. Character Authority Precedence

**Question:** If genealogical data conflicts with character documentation, which has authority?

**Current Status:** ADR-002 establishes Family Authority as higher; implicit rule.

**Impact:** High (critical for conflict resolution)

**Resolution Path:** Explicitly documented in ADR-002 Consequences section; no ambiguity.

### Question 6: Background Dynasty Status

**Question:** Do Bloodmoon and Douglas dynasties continue as background authorities after Douglas-Bloodmoon creation, or are they fully merged?

**Current Status:** ADR-002 treats them as background authorities; Douglas-Bloodmoon is sovereign.

**Impact:** Medium (determines whether heirs may claim Bloodmoon or Douglas heritage)

**Resolution Path:** Clarified in ADR-002 Dynasty Authority section; further detail in ADR-003.

### Question 7: Other Dynastic Surnames

**Question:** Are there other exceptional dynastic surnames like Douglas-Bloodmoon? How are they distinguished from regular surnames?

**Current Status:** Not identified in current scope; Douglas-Bloodmoon is unique documented case.

**Impact:** Low (contemporary Los Angeles Dynasty has only one documented dynastic union)

**Resolution Path:** ADR-004 (Extended Genealogy) will address if additional unions occur.

### Question 8: Supernatural Genealogy

**Question:** If supernatural systems are reintroduced (currently archived), does Family Authority expand to handle paranormal genealogy?

**Current Status:** Out of scope for current phase (Only Human).

**Impact:** Critical IF supernatural systems are reintroduced.

**Resolution Path:** Requires separate ADR when supernatural systems re-enter scope; does not affect current Los Angeles Dynasty.

### Question 9: Douglas-Bloodmoon Inheritance to Second Generation

**Question:** Do children of Malachia/Noah/Jasper/Alyssa retain Douglas-Bloodmoon surname?

**Current Status:** EXPLICITLY UNRESOLVED in ADR-002.

**Impact:** Critical (affects long-term surname authority)

**Resolution Path:** Must be resolved in ADR-003 (Inheritance and Succession).

### Question 10: Maiden Names and Hyphenation

**Question:** Can Douglas-Bloodmoon heirs retain maiden names alongside Douglas-Bloodmoon upon marriage?

**Current Status:** EXPLICITLY UNRESOLVED; not addressed in ADR-002.

**Impact:** Medium (future marriage scenarios)

**Resolution Path:** ADR-003 (Inheritance and Succession) will define.

---

## Conflicts Resolved

### Conflict 1: Family Authority vs. Character Authority

**Claim A:** Characters should own genealogical data about themselves (character-centric design).

**Claim B:** Family Authority should own all genealogy (centralized design).

**Resolution:** **FAMILY AUTHORITY WINS**

**Rationale:** 
- Prevents genealogical fragmentation
- Ensures single source of truth
- Allows characters to reference but not define
- Prevents Valerius/Cassia failures from recurring

### Conflict 2: Character-Embedded vs. Family Authority Genealogy

**Archive Evidence:** Multiple versions exist where character files contained genealogical data.

**Problem:** Creates authority conflict and enables genealogical drift.

**Resolution:** **FAMILY AUTHORITY OWNS ALL GENEALOGY**

**Rule:** Character files may reference family relationships but never define them.

### Conflict 3: Inference vs. Explicit Authority

**Question:** Should system infer missing genealogy from behavior, context, or related data?

**Legacy Failure:** Hati failure demonstrates inference creates incorrect relationships.

**Resolution:** **ZERO INFERENCE; EXPLICIT AUTHORITY ONLY**

**Rule:** Relationships must be explicitly declared; no pattern-based inference permitted.

### Conflict 4: Derived Relationship Storage

**Question:** Should derived relationships (sibling, grandparent, etc.) be stored as independent facts?

**Legacy Failure:** Hati failure demonstrates stored derivations cause inconsistency.

**Resolution:** **NEVER STORE DERIVED RELATIONSHIPS; COMPUTE ONLY**

**Rule:** All derived relationships computed from authority records at query time.

### Conflict 5: Douglas-Bloodmoon Hyphenation Variants

**Archive Evidence:** Multiple variants exist (Douglas Bloodmoon, Douglasbloodmoon, etc.).

**Problem:** Variant surnames undermine dynastic designation.

**Resolution:** **HYPHENATION MANDATORY; NO VARIANTS**

**Rule:** Douglas-Bloodmoon must always be hyphenated; no exceptions for first generation.

### Conflict 6: Inheritance Rules Clarity

**Question:** What are the inheritance rules for Douglas-Bloodmoon surname to second generation?

**Current State:** Not defined in ADR-001 or ADR-002.

**Resolution:** **EXPLICITLY DEFERRED TO ADR-003**

**Note:** This is an unresolved architectural question, not a conflict; marked for future ADR.

---

## Implementation Validation Points

### Validation Point 1: Family Authority as Single Source

When family_engine.js is implemented, verify:
- ✅ All genealogy queries route through Family Authority
- ✅ Character files contain NO genealogical data definitions
- ✅ World files contain NO genealogical data definitions
- ✅ No distributed genealogy exists in codebase

### Validation Point 2: Explicit Authority Records Storage

When genealogy data is populated, verify:
- ✅ Only Parent, Child, Marriage, Former Marriage, Adoption, Half-Sibling stored
- ✅ All authority records are immutable
- ✅ All records have explicit creation timestamp and approval reference
- ✅ No derived relationships stored as facts

### Validation Point 3: Derived Relationship Computation

When relationship queries are implemented, verify:
- ✅ Sibling computed from Parent records (not stored)
- ✅ Grandparent computed transitively (not stored)
- ✅ Uncle/Aunt computed from Parent + Sibling (not stored)
- ✅ All derivations computed at query time

### Validation Point 4: Inference Prohibition Enforcement

When runtime is active, verify:
- ✅ No relationship inference from behavior
- ✅ No genealogy derived from occupation, residence, or context
- ✅ No new genealogical facts created without explicit Family Authority decision
- ✅ All genealogical changes require formal ADR approval

### Validation Point 5: Authority Boundary Enforcement

When character and world layers interact with genealogy, verify:
- ✅ Character files reference (don't define) genealogy
- ✅ World files reference (don't define) genealogy
- ✅ No genealogical data in character schema
- ✅ No genealogical data in world schema

### Validation Point 6: Douglas-Bloodmoon Surname Enforcement

When character files are created, verify:
- ✅ Malachia carries Douglas-Bloodmoon surname
- ✅ Noah carries Douglas-Bloodmoon surname
- ✅ Jasper carries Douglas-Bloodmoon surname
- ✅ Alyssa carries Douglas-Bloodmoon surname
- ✅ No surname variants exist
- ✅ Hyphenation consistent

---

## Migration Risk Assessment

### Risk Zone 1: Archive Genealogy Import

**Risk:** Importing genealogy from Progetti archive without Family Authority validation.

**Severity:** CRITICAL

**Mitigation:**
- All archive genealogy must pass Canon Recovery Workflow
- Family Authority ADR must exist before any import
- Explicit audit required for every genealogical claim
- Valerius/Cassia/Hati/Sköll failures must be explicitly resolved

### Risk Zone 2: Character-Embedded Genealogy

**Risk:** Future character files accidentally contain genealogical definitions.

**Severity:** HIGH

**Mitigation:**
- Character schema must explicitly prohibit genealogy fields
- Data validation must reject genealogy in character files
- Code review must flag any genealogy references in character layer
- ADR-005 must formalize character-genealogy integration pattern

### Risk Zone 3: Derived Relationship Storage

**Risk:** Runtime accidentally stores derived relationships (sibling, grandparent, etc.) as facts.

**Severity:** HIGH

**Mitigation:**
- Family engine implementation must prohibit derived relationship storage
- Relationship queries must compute at runtime, never persist
- Database schema must prevent derived relationship tables
- Code review must catch any derived relationship caching

### Risk Zone 4: Unauthorized Genealogy Inference

**Risk:** Runtime attempts to infer missing genealogy from behavior or context.

**Severity:** HIGH

**Mitigation:**
- Explicit prohibition in code comments
- Zero inference logic permitted in any layer
- Family Authority queries must fail (return null) rather than infer
- Code review must flag any inference logic

### Risk Zone 5: Douglas-Bloodmoon Surname Variance

**Risk:** Future character creations use surname variants (Douglas Bloodmoon, Douglasbloodmoon).

**Severity:** MEDIUM

**Mitigation:**
- Schema validation enforces hyphenation
- Data type: fixed value "Douglas-Bloodmoon" (no variations)
- Migration scripts must normalize historical variants
- Character import process validates surname authority

### Risk Zone 6: Inheritance Rule Ambiguity

**Risk:** Second-generation Douglas-Bloodmoon heirs created before ADR-003 inheritance rules defined.

**Severity:** MEDIUM

**Mitigation:**
- ADR-002 explicitly marks inheritance as unresolved
- Character Validation Phase must not import second-generation characters
- ADR-003 (Inheritance) must be completed before any second-gen imports
- Implementation gate: No character import until ADR-003 approved

---

## Recommendations for Next Phase

### Recommendation 1: ADR-003 Creation

**Priority:** CRITICAL  
**Objective:** Define Douglas-Bloodmoon inheritance rules and general succession model  
**Scope:**
- Second-generation surname inheritance
- Collateral line rules
- Adoption impact on succession
- General inheritance model for Los Angeles Dynasty

### Recommendation 2: ADR-004 Creation

**Priority:** HIGH  
**Objective:** Define extended genealogy scope and background dynasty authority  
**Scope:**
- Extended Bloodmoon genealogy (Iceland and America)
- Extended Douglas genealogy (England and America)
- Collateral lines and siblings
- Background vs. foreground dynasty status

### Recommendation 3: ADR-005 Creation

**Priority:** HIGH  
**Objective:** Define character-genealogy integration pattern  
**Scope:**
- Character query interface for genealogy
- Character reference patterns
- Character schema constraints
- Genealogy validation in character layer

### Recommendation 4: Family Engine Schema Definition

**Priority:** CRITICAL (blocks implementation)  
**Objective:** Define family_engine.js data structures  
**Scope:**
- Authority record schema (Parent, Child, Marriage, etc.)
- Genealogy graph structure
- Query interface specification
- Immutability enforcement mechanisms

### Recommendation 5: Genealogy Validation Framework

**Priority:** HIGH  
**Objective:** Create audit and validation tools for genealogy data  
**Scope:**
- Data validation rules
- Conflict detection
- Authority record verification
- Archive discrepancy reporting

### Recommendation 6: Character Validation Phase Planning

**Priority:** HIGH  
**Objective:** Plan Phase 3 character import workflow  
**Scope:**
- Douglas-Bloodmoon core line (Malachia, Noah, Jasper, Alyssa)
- Character audit procedure
- Canon Recovery Workflow application
- Character file format and validation

---

## Prerequisite Status

### Completed Prerequisites

- ✅ ADR-000: Runtime Baseline (APPROVED)
- ✅ ADR-001: Dynastic Origins (APPROVED)
- ✅ ADR-002: Family Authority (THIS DOCUMENT)

### Required Before Implementation

- ⏳ ADR-003: Inheritance and Succession (BLOCKING)
- ⏳ ADR-004: Extended Genealogy (BLOCKING)
- ⏳ ADR-005: Character-Genealogy Integration (BLOCKING)
- ⏳ Family Engine Schema Definition (BLOCKING)
- ⏳ Genealogy Validation Framework (BLOCKING)

### Implementation Cannot Proceed Until

1. All three additional ADRs (ADR-003, 004, 005) are approved
2. Family Engine schema is formally defined
3. Data validation framework is documented
4. Implementation ADR is created

---

## Summary Status

| Component | Status | Notes |
|-----------|--------|-------|
| Family Authority Definition | ✅ COMPLETE | ADR-002 finalized |
| Relationship Classes | ✅ DEFINED | Explicit + derived documented |
| Dynasty Authority | ✅ DEFINED | Bloodmoon, Douglas, Douglas-Bloodmoon |
| Surname Authority | ✅ DEFINED | Douglas-Bloodmoon mandate established |
| Inheritance Rules | ⏳ UNRESOLVED | ADR-003 required |
| Character Integration | ⏳ PENDING | ADR-005 required |
| Extended Genealogy | ⏳ PENDING | ADR-004 required |
| Implementation Schema | ⏳ PENDING | Formal schema definition required |
| Family Engine Code | ⏳ NOT STARTED | Blocked on ADRs |
| Genealogy Data | ⏳ NOT STARTED | Blocked on Family Engine |
| Character Files | ⏳ NOT STARTED | Blocked on Character Authority ADR |

---

**ADR-002 and Report Complete**

**Status: READY FOR ADR-003 (INHERITANCE AND SUCCESSION)**

Repository is prepared with:
- ✅ Bootstrap phase (Phase 1)
- ✅ ADR-000: Runtime Baseline
- ✅ ADR-001: Dynastic Origins
- ✅ ADR-002: Family Authority

Ready to proceed with:
- ADR-003: Inheritance and Succession (blocking implementation)
- ADR-004: Extended Genealogy (reference architecture)
- ADR-005: Character-Genealogy Integration (blocking character imports)
