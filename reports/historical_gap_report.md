# PHASE A — Historical Gap Report

**Date:** 2026-06-08  
**Scope:** D:\Progetti\database → D:\SvartulfrVerse  
**Classification:** HISTORICAL BASELINE AUDIT

---

## 1. Directory Structure Comparison

### Progetti Archive Structure
```
Progetti/database/
├── .agents/rules/jai.md                    (Agent rules)
├── .agents/workflows/                      (WF_001-WF_008 + index)
├── assets/                                 (images, Visual_DNA.md, color_palette.md, style_guide.md)
├── bots/ensemble/                          (Ex_LosAngeles.js/.md)
├── bots/legacy/                            (CyberWerewolf, WarlordsMerchant, Werewolf)
├── bots/solo/                              (Ex_DJFrequency.js/.md)
├── characters/                             (C_*.js + C_*.md × 8 + rename_au.js)
├── core/                                   (En_Core.js + En_Core.md)
├── docs/ADR/                               (ADR_001-ADR_009)
├── docs/canon/                             (CANON_001-003, CC_001, index.md)
├── docs/                                   (Architecture.md, prompt.md, PDFs)
├── personas/                               (alyssa_avatar, stranger_female/male)
├── scripts/                                (7 engine JS files)
├── templates/                              (6 template files)
└── worlds/                                 (6 world directories, each with .js + .md + Visual_DNA.md)
```

### Current Repository Structure
```
SvartulfrVerse/
├── .trae/rules/                            (R-000 through R-006)
├── core/                                   (7 ADRs, Architecture.md, 7 governance docs)
├── database/
│   ├── canon_candidates/                   (CC_Template.md, README.md)
│   ├── characters/                         (13 records + C_Template.md + README.md)
│   ├── experiences/                        (1 record + Ex_Template.md + README.md)
│   ├── families/                           (4 records + Family_Template.md + README.md)
│   ├── historical/                         (3 records)
│   ├── institutions/                       (1 record + Institution_Template.md + README.md)
│   └── worlds/                             (7 records + W_Template.md + README.md + reconciliation)
├── docs/                                   (3 PDFs)
└── README.md
```

---

## 2. Category-by-Category Gap Analysis

### 2.1 Characters

| Progetti Character | Migrated? | Current Location | Notes |
|---|---|---|---|
| C_Wulfnic.md/.js | ✅ YES | database/characters/C_Wulfnic.md | Fully migrated, legacy JS purged |
| C_Erik.md/.js | ✅ YES | database/characters/C_Erik.md | Fully migrated |
| C_Alyssa.md/.js | ✅ YES | database/characters/C_Alyssa.md | Fully migrated |
| C_Malachia.md/.js | ✅ YES | database/characters/C_Malachia.md | Fully migrated |
| C_Noah.md/.js | ✅ YES | database/characters/C_Noah.md | Fully migrated |
| C_Jasper.md/.js | ✅ YES | database/characters/C_Jasper.md | Fully migrated |
| C_Logan.md/.js | ✅ YES | database/characters/C_Logan.md | Fully migrated |
| C_Kaladin_Nargathon | ✅ YES | database/characters/C_Kaladin_Nargathon.md | Created during migration (no legacy source) |
| C_Marcus_Thornfield | ✅ YES | database/characters/C_Marcus_Thornfield.md | Created during migration (no legacy source) |
| C_Angel_Moreno | ✅ YES | database/characters/C_Angel_Moreno.md | Canonized from candidate |
| C_Nixara | ✅ YES | database/characters/C_Nixara.md | Created during Missing Character Closure |
| C_Edric_Douglas | ✅ YES | database/characters/C_Edric_Douglas.md | Created during Missing Character Closure |
| rename_au.js | ✅ N/A | Not migrated | Utility script, not canon content |

**Gap:** 0 characters missing. All Progetti character content accounted for.

### 2.2 Organizations / Institutions

| Progetti Institution | Migrated? | Current Location | Notes |
|---|---|---|---|
| DCC Security — BlackWolf | ✅ YES | database/institutions/I_DCC_Security_BlackWolf.md | Fully migrated |
| Angel&Co | ✅ YES | Referenced in C_Angel_Moreno.md + W_Contemporary.md | No dedicated institution record needed (boutique scale) |

**Gap:** 0 institutions missing.

### 2.3 Locations / Worlds

| Progetti World | Migrated? | Current Location | Notes |
|---|---|---|---|
| W_Contemporary.md/.js | ✅ YES | database/worlds/W_Contemporary.md | JS purged, MD migrated |
| W_UrbanFantasy.md/.js | ❌ NOT MIGRATED | — | Archived world — out of scope per ADR-000 |
| W_HighFantasy.md/.js | ❌ NOT MIGRATED | — | Archived world — out of scope |
| W_NorseMythic.md/.js | ❌ NOT MIGRATED | — | Archived world — out of scope |
| W_Regency.md/.js | ❌ NOT MIGRATED | — | Archived world — out of scope |
| W_Cyber.md/.js | ❌ NOT MIGRATED | — | Archived world — out of scope |
| W_Wasteland.md/.js | ❌ NOT MIGRATED | — | Archived world — out of scope |
| Visual_DNA.md (assets) | ✅ YES | database/worlds/W_Visual_DNA.md | Migrated |
| Visual_DNA.md (contemporary) | ✅ YES | database/worlds/W_Visual_Authority.md | Migrated |
| color_palette.md | ✅ YES | database/worlds/W_Color_Palette.md | Migrated |
| style_guide.md | ✅ YES | database/worlds/W_Style_Guide.md | Migrated |

**Gap:** 6 world files NOT migrated — **EXPECTED AND CORRECT**. These are archived worlds explicitly out of scope per ADR-000 (Contemporary + Only Human baseline). They remain in Progetti as Historical Archive.

### 2.4 Worldbuilding

| Progetti Worldbuilding | Migrated? | Notes |
|---|---|---|
| Douglas Estate | ✅ YES | W_Contemporary.md |
| The Verve | ✅ YES | W_Contemporary.md + C_Logan.md |
| UCLA | ✅ YES | W_Contemporary.md + character education records |
| DCC | ✅ YES | W_Contemporary.md + I_DCC_Security_BlackWolf.md |
| Angel&Co | ✅ YES | W_Contemporary.md + C_Angel_Moreno.md |
| KSA (Kappa Sigma Alpha) | ⚠️ PARTIAL | Referenced in character records (Malachia, Noah, Jasper KSA membership) but no dedicated worldbuilding entry for KSA as organization |
| Miss Twin Peaks Event | ❌ NOT MIGRATED | HISTORICAL SOURCE ONLY — documented in Progetti/docs/canon/CANON_002. Not migrated to current repo. Soft canon event. |
| Svartúlfr Heritage | ✅ YES | Cultural Canon per ADR-006. Referenced in C_Wulfnic.md |
| 1666 Merchant House | ✅ YES | database/historical/HC_Douglas_Commercial_Lineage.md |
| Edric Ættfaðir Svartúlfa | ✅ YES | database/historical/HC_Edric_Aettfadir_Svartulfa.md |

**Gap:** KSA organization details and Miss Twin Peaks event not formally migrated. These are soft canon / emergent canon items from Progetti's docs/canon/ directory. They are **HISTORICAL SOURCE ONLY** and would require full Canon Recovery Workflow before integration.

### 2.5 Systems

| Progetti System | Migrated? | Notes |
|---|---|---|
| En_Core.js | ❌ NOT MIGRATED | Runtime engine — deployment artifact, not repository canon |
| family_engine.js | ❌ NOT MIGRATED | Empty skeleton — no implementation per ADR-002 |
| relationship_engine.js | ❌ NOT MIGRATED | Runtime script — deployment artifact |
| state_engine.js | ❌ NOT MIGRATED | Runtime script — deployment artifact |
| trust_engine.js | ❌ NOT MIGRATED | Runtime script — deployment artifact |
| emotion_engine.js | ❌ NOT MIGRATED | Runtime script — deployment artifact |
| pack_engine.js | ❌ NOT MIGRATED | Runtime script — deployment artifact |
| scenario_engine.js | ❌ NOT MIGRATED | Runtime script — deployment artifact |

**Gap:** All JS engine files NOT migrated — **EXPECTED AND CORRECT**. These are deployment/runtime artifacts, not canonical worldbuilding content. Per ADR-000 and ADR-005, no runtime logic belongs in the repository during bootstrap phase.

### 2.6 Lore / Canon Notes

| Progetti Lore Document | Migrated? | Notes |
|---|---|---|
| CANON_001_Nixara_KSA_Origin.md | ❌ NOT MIGRATED | HISTORICAL SOURCE ONLY. Emergent canon — Erik met Nixara at KSA event. Not formally integrated. |
| CANON_002_KSA_TwinPeaks_Event.md | ❌ NOT MIGRATED | HISTORICAL SOURCE ONLY. Miss Twin Peaks event details. Not formally integrated. |
| CANON_003_Valeria_WetNurse_Theory.md | ❌ NOT MIGRATED | HISTORICAL SOURCE ONLY. Valeria concept — involves Myrick (non-canon name for Jasper). Conflicts with current canon. |
| CC_001_Nixara_KSA_Origin.md | ❌ NOT MIGRATED | HISTORICAL SOURCE ONLY. Same as CANON_001. |

**Gap:** 4 lore documents NOT migrated. These are **HISTORICAL SOURCE ONLY**. They contain emergent/soft canon that has not been through the Canon Recovery Workflow. CANON_003 (Valeria WetNurse Theory) specifically conflicts with current canon (uses "Myrick" name, introduces Valeria as character) and would require full audit before any consideration.

### 2.7 Experiences

| Progetti Experience | Migrated? | Current Location | Notes |
|---|---|---|---|
| Ex_DJFrequency.md/.js | ✅ YES | database/experiences/Ex_DJFrequency.md | JS purged, MD migrated |
| Ex_LosAngeles.md/.js | ❌ NOT MIGRATED | — | HISTORICAL SOURCE ONLY — ensemble bot, deployment artifact |
| Legacy: CyberWerewolf | ❌ NOT MIGRATED | — | Archived world — out of scope |
| Legacy: WarlordsMerchant | ❌ NOT MIGRATED | — | Archived world — out of scope |
| Legacy: Werewolf | ❌ NOT MIGRATED | — | Archived world — out of scope |

**Gap:** Ex_LosAngeles NOT migrated — **EXPECTED**. This is an ensemble bot deployment artifact (JanitorAI character card + JS engine). It is not canonical worldbuilding. The canonical family data it references has been migrated to database/characters/ and database/families/.

### 2.8 Personas

| Progetti Persona | Migrated? | Notes |
|---|---|---|
| alyssa_avatar.md | ❌ NOT MIGRATED | Deployment artifact — JanitorAI persona template |
| stranger_female.md | ❌ NOT MIGRATED | Deployment artifact — JanitorAI persona template |
| stranger_male.md | ❌ NOT MIGRATED | Deployment artifact — JanitorAI persona template |

**Gap:** All personas NOT migrated — **EXPECTED**. These are deployment templates, not canonical content.

### 2.9 Templates

| Progetti Template | Migrated? | Notes |
|---|---|---|
| bio_template.html | ❌ NOT MIGRATED | Legacy HTML template — superseded by Markdown templates |
| cleanup_docs.js | ❌ NOT MIGRATED | Utility script — not canon |
| diegetic_comms_framework.md | ❌ NOT MIGRATED | Deployment framework — not repository canon |
| example_dialogs_template.md | ❌ NOT MIGRATED | Deployment template — not repository canon |
| initial_messages_template.md | ❌ NOT MIGRATED | Deployment template — not repository canon |
| persona_template.md | ❌ NOT MIGRATED | Deployment template — not repository canon |
| personality_template.md | ❌ NOT MIGRATED | Deployment template — not repository canon |
| scenario_template.md | ❌ NOT MIGRATED | Deployment template — not repository canon |
| universal_lorebook_template.md | ❌ NOT MIGRATED | Deployment template — not repository canon |

**Gap:** All Progetti templates NOT migrated — **EXPECTED**. These are legacy deployment templates. Current repository uses frozen v1.0 Markdown templates in database/*/templates/.

### 2.10 ADRs (Progetti docs/ADR/)

| Progetti ADR | Status | Notes |
|---|---|---|
| ADR_001_Knowledge_vs_Behavior.md | ✅ SUPERSEDED | Replaced by ADR-000 through ADR-006 in core/ |
| ADR_002_Experience_Layer.md | ✅ SUPERSEDED | Replaced by current ADR series |
| ADR_003_Runtime_Authority.md | ✅ SUPERSEDED | Replaced by current ADR series |
| ADR_004_Player_Avatar.md | ✅ SUPERSESED | Replaced by current ADR series |
| ADR_005_World_Composition.md | ✅ SUPERSEDED | Replaced by current ADR series |
| ADR_006_POV_Override.md | ✅ SUPERSEDED | Replaced by current ADR series |
| ADR_007_Visual_Consistency.md | ✅ SUPERSEDED | Replaced by current ADR series |
| ADR_008_POV_Identity_Tags.md | ✅ SUPERSEDED | Replaced by current ADR series |
| ADR_009_Character_Canonicality.md | ✅ SUPERSEDED | Replaced by current ADR series |

**Gap:** All Progetti ADRs superseded — **EXPECTED AND CORRECT**. The current ADR-000 through ADR-006 in core/ represent the normalized, consolidated governance.

### 2.11 Agent Rules & Workflows

| Progetti Agent File | Migrated? | Notes |
|---|---|---|
| .agents/rules/jai.md | ⚠️ PARTIALLY | Agent system prompt — partially reflected in .trae/rules/R-000 through R-006 |
| .agents/workflows/WF_001-WF_008 | ❌ NOT MIGRATED | Progetti-era workflows — superseded by current governance docs |

**Gap:** Progetti workflows NOT migrated — **EXPECTED**. Current governance is defined by core/ documents (Repository_Governance.md, Character_Audit_Protocol.md, Deferred_Canon_Policy.md, etc.).

---

## 3. Summary of Gaps

### 3.1 Items NOT Migrated — CORRECT (Out of Scope)
- 6 archived world files (Urban Fantasy, High Fantasy, Norse Mythic, Regency, Cyber, Wasteland)
- All JS engine/deployment files (En_Core.js, family_engine.js, etc.)
- All deployment templates and personas
- Ex_LosAngeles ensemble bot
- Legacy bot deployments (CyberWerewolf, WarlordsMerchant, Werewolf)
- All Progetti ADRs (superseded)
- Progetti workflows (superseded)

### 3.2 Items NOT Migrated — REQUIRES ATTENTION (Soft Canon / Historical Source Only)

| Item | Location | Classification | Risk |
|---|---|---|---|
| KSA Organization Details | Progetti/docs/canon/CANON_001, CC_001 | HISTORICAL SOURCE ONLY | LOW — referenced in character records but no dedicated entry |
| Miss Twin Peaks Event | Progetti/docs/canon/CANON_002 | HISTORICAL SOURCE ONLY | LOW — soft canon event, not formally integrated |
| Valeria WetNurse Theory | Progetti/docs/canon/CANON_003 | HISTORICAL SOURCE ONLY — CONFLICTS | MEDIUM — introduces Valeria character + "Myrick" name that conflicts with current canon |
| Erik+Nixara KSA Meeting | Progetti/docs/canon/CANON_001 | HISTORICAL SOURCE ONLY | LOW — soft canon backstory, not formally integrated |

### 3.3 Items Fully Migrated — VERIFIED
- All 12 Active Canon characters (Wulfnic, Nixara, Erik, Logan, Malachia, Noah, Jasper, Alyssa, Kaladin, Marcus, Angel Moreno, Edric)
- All 4 family records (F_Douglas_Bloodmoon, F_Marriages, F_Parent_Child, F_Surname_Authority)
- 1 institution record (I_DCC_Security_BlackWolf)
- 7 world/visual records
- 1 experience record (Ex_DJFrequency)
- 3 historical records (Edric Ættfaðir, Douglas Commercial Lineage, Candidate Angel Moreno)
- All 7 ADRs (normalized)
- All governance documents
- All templates (frozen v1.0)

---

## 4. Historical Source Only — Detailed Notes

### 4.1 Valeria WetNurse Theory (CANON_003)
**Classification:** HISTORICAL SOURCE ONLY — DO NOT MIGRATE WITHOUT FULL AUDIT

This document introduces:
- "Valeria" as a character (currently DEFERRED CANON per ADR-006)
- "Myrick" as a name for Jasper (CONFLICTS with current canon — Jasper Douglas-Bloodmoon is canonical)
- A "shared litter" concept where Valeria nursed Jasper, Alyssa, and Myrick

**Conflict:** The document appears to be from a different timeline/version where Jasper had a different name and Valeria was integrated as a maternal figure. This directly conflicts with:
- ADR-001 (Jasper is the canonical name)
- ADR-002 (Nixara is the mother of all four Douglas-Bloodmoon heirs)
- Current family graph (no Valeria in Active or Historical Canon)

**Recommendation:** Preserve in Progetti archive only. Do not migrate without explicit Authority Decision.

### 4.2 Miss Twin Peaks Event (CANON_002)
**Classification:** HISTORICAL SOURCE ONLY — SOFT CANON

This document establishes:
- Miss Twin Peaks is a 30-year KSA tradition
- Erik met Nixara at this event
- Nixara won the contest, Erik saved her from fraternity members

**Status:** This is emergent/soft canon from a validation session. It has not been through the Canon Recovery Workflow. It is consistent with current canon but not formally integrated.

**Recommendation:** If desired, integrate through Canon Recovery Workflow → Authority Decision → W_Contemporary.md as a historical note.

### 4.3 KSA Organization (CANON_001 / CC_001)
**Classification:** HISTORICAL SOURCE ONLY — PARTIALLY INTEGRATED

KSA membership is referenced in character records (Malachia, Noah, Jasper) but no dedicated worldbuilding entry exists for the organization itself.

**Recommendation:** Low priority. If KSA details are needed, create through Canon Recovery Workflow.

---

## 5. Conclusion

**Migration Status: ESSENTIALLY COMPLETE**

All canonical content from Progetti has been properly migrated to the current repository. The items remaining in Progetti are:
1. **Correctly excluded** — archived worlds, deployment artifacts, legacy engines, superseded ADRs
2. **Historical source only** — soft canon documents that have not been through the Canon Recovery Workflow (4 items, all low risk)
3. **Conflicting content** — Valeria WetNurse Theory (1 item, requires explicit decision before any consideration)

**No blocking gaps identified.**

---

**Report Compiled:** 2026-06-08  
**Auditor:** TRAE-code-review skill  
**Confidence Level:** HIGH
