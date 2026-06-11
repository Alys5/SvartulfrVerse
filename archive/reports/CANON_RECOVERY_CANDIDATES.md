# CANON RECOVERY CANDIDATES REPORT

**Date:** 2026-06-11  
**Auditor:** OWL (Senior Repository Migration Engineer)  
**Scope:** Deep comparison between `database_old/` and `database/`  
**Authority:** R-006-GOV-001 (Canon Recovery Workflow), R-006-GOV-013 (Rejected Canon Enforcement)  

---

## METHODOLOGY

Every file in `database_old/` was compared against current canonical records in `database/`. The following domains were checked:

- Characters (identity, biography, relationships, appearance)
- Worlds (locations, institutions, culture)
- Institutions (organizations, hierarchies)
- Families (genealogy, dynasties)
- Experiences (scenarios, deployments)
- Canon Candidates (evidence, validation status)

**CRITICAL RULE:** No information is automatically merged. All candidates are reported for review only.

---

## CANDIDATE 001: Chloe Douglas-Bloodmoon (New Character)

**Source:** `database_old/personas/stranger_female.md`  
**Target Record:** None — character does not exist in current canonical records  
**Missing Information:** Complete character dossier for Chloe Douglas-Bloodmoon — a 19-year-old female, pre-law student at UCLA, described as a "sharp-witted, rebellious daughter of the Douglas clan." Ice blue eyes, platinum blonde sleek bob, hacker, calculated risk-taker, Chaotic Good alignment.  
**Suggested Action:** REQUIRES full character creation audit per R-006-GOV-009. Must validate: (1) genealogy — which parent(s) is she from? (2) family placement — where does she fit in the sibling order? (3) visual identity — ice blue eyes suggest Bloodmoon lineage. Cannot be imported without Authority Decision.  
**Risk Level:** HIGH — Introduces a new sibling not present in current family structure. Would affect F_Douglas_Bloodmoon.md, F_Parent_Child.md, and potentially F_Marriages.md.  

---

## CANDIDATE 002: Liam Douglas-Bloodmoon (New Character)

**Source:** `database_old/personas/stranger_male.md`  
**Target Record:** None — character does not exist in current canonical records  
**Missing Information:** Complete character dossier for Liam Douglas-Bloodmoon — a 19-year-old male, Business major at UCLA, Vanguard PMC trainee. Werewolf (Beta rank), amber eyes, black short hair, wolf ears + tail. Lawful Neutral alignment.  
**Suggested Action:** REQUIRES full character creation audit per R-006-GOV-009. Must validate: (1) genealogy — which parent(s)? (2) family placement — sibling order? (3) werewolf nature — this introduces supernatural species into the family, which has Canon Freeze implications per R-000-RUN-003. Cannot be imported without Authority Decision.  
**Risk Level:** CRITICAL — Introduces both a new character AND a supernatural species element. The werewolf trait directly conflicts with Canon Freeze v1 which prohibits supernatural system introduction.  

---

## CANDIDATE 003: Wulfnic Bloodmoon-Douglas Surname Variant

**Source:** `database_old/characters/C_Wulfnic.md`  
**Target Record:** `database/characters/C_Wulfnic_Bloodmoon.md`  
**Missing Information:** The database_old version uses "Wulfnic Bloodmoon-Douglas" (reversed hyphenated order) in the Visual Identity Summary. Current canonical record uses "Wulfnic Bloodmoon."  
**Suggested Action:** REJECT. Per R-001-DYN-006, the correct surname form for first-generation heirs is "Douglas-Bloodmoon." Wulfnic is Nixara's father and carries "Bloodmoon" only. The database_old version contains surname drift.  
**Risk Level:** LOW — Already addressed by existing governance rules.  

---

## CANDIDATE 004: Nixara KSA Origin (Canon Candidate)

**Source:** `database_old/docs/canon/CC_001_Nixara_KSA_Origin.md`  
**Target Record:** `database/canon_candidates/` (currently empty of this content)  
**Missing Information:** Validated canon candidate establishing that Erik met Nixara at a KSA event ~30 years ago. Nixara won Miss Twin Peaks contest. Erik intervened during a fraternity incident. Contains established facts and integration candidates.  
**Suggested Action:** TRANSFER to `database/canon_candidates/` for future Canon Recovery Workflow processing. NOTE: This is the candidate form (CC_001), not the rejected canon form (CANON_001). The candidate form was validated; the full canon was rejected.  
**Risk Level:** MEDIUM — Related to rejected canon material but the candidate form represents validated evidence. Must be processed through full 5-step Canon Recovery Workflow before any integration.  

---

## CANDIDATE 005: Miss Twin Peaks Event Details

**Source:** `database_old/docs/canon/CANON_002_KSA_TwinPeaks_Event.md`  
**Target Record:** None — this is rejected canon  
**Missing Information:** Detailed event report on the Miss Twin Peaks KSA contest. Contains established facts: 30-year tradition, goliardic contest, fraternity judges, Nixara won without wanting to participate, three fraternity members attempted to take her upstairs, Erik intervened.  
**Suggested Action:** REJECT per R-006-GOV-013. This is explicitly rejected canon (Miss Twin Peaks origin story). Archive in `deferred/rejected_canon/` for traceability only.  
**Risk Level:** N/A — Rejected material. Must not be reintroduced.  

---

## CANDIDATE 006: Valeria Wet Nurse Theory

**Source:** `database_old/docs/canon/CANON_003_Valeria_WetNurse_Theory.md`  
**Target Record:** None — this is rejected canon  
**Missing Information:** Complete character concept for Valeria — a wet nurse who raised Jasper, Alyssa, and Myrick after Nixara's death. Contains detailed emotional dynamics, characterization rules, and the "shared litter" concept.  
**Suggested Action:** REJECT per R-006-GOV-013. This is explicitly rejected canon (Valeria/WetNurse/Concubine concept). Archive in `deferred/rejected_canon/` for traceability only.  
**Risk Level:** N/A — Rejected material. Must not be reintroduced.  

---

## CANDIDATE 007: Myrick Douglas-Bloodmoon (Referenced Character)

**Source:** `database_old/docs/canon/CANON_003_Valeria_WetNurse_Theory.md` (referenced)  
**Target Record:** None — character does not exist in current canonical records  
**Missing Information:** Myrick is mentioned as Alyssa's twin (alongside Jasper) in the Valeria theory document. Current canonical records list only Alyssa and Jasper as twins.  
**Suggested Action:** DO NOT IMPORT. This information comes from rejected canon (CANON_003). However, flag for Authority awareness: if Myrick is to be introduced in the future, it must go through a separate character creation process, not through recovery of rejected material.  
**Risk Level:** HIGH — Would change the family structure (triplets instead of twins). Requires Authority Decision.  

---

## CANDIDATE 008: Character Visual Identity Details

**Source:** `database_old/characters/C_*.md` (all 7 character files)  
**Target Record:** `database/characters/C_*.md` (current canonical records)  
**Missing Information:** The database_old character files contain detailed "Image Generation Pack" sections with specific Stable Diffusion parameters (Steps: 25, CFG: 6, Sampler: DPM++ 2M Karras), negative prompts, and compressed visual identity summaries. These are more detailed than what's in current canonical records.  
**Suggested Action:** DO NOT MERGE character files (they are deprecated). However, the visual identity details should be compared against `database/visuals/V_Visual_Baseline.md` and `V_Visual_Inheritance.md` to check for any missing visual anchor details. Transfer only the visual identity data that supplements current records.  
**Risk Level:** LOW — Visual data is supplementary. Current visual authority records are more comprehensive.  

---

## CANDIDATE 009: Logan Douglas Visual Details

**Source:** `database_old/characters/C_Logan.md`  
**Target Record:** `database/characters/C_Logan_Douglas.md`  
**Missing Information:** Database_old describes Logan with "hazel eyes" and "dark brown medium-length hair." Current canonical record should be checked for consistency. The database_old version also specifies "198cm, broad muscular build, ruggedly handsome, grease-stained."  
**Suggested Action:** COMPARE against current C_Logan_Douglas.md. If current record lacks these details, consider supplementing through proper Canon Recovery Workflow.  
**Risk Level:** LOW — Supplementary detail only.  

---

## CANDIDATE 010: Wulfnic Visual Identity — Norse Robes

**Source:** `database_old/characters/C_Wulfnic.md`  
**Target Record:** `database/characters/C_Wulfnic_Bloodmoon.md`  
**Missing Information:** Database_old describes Wulfnic with "heavy furs and ancient norse robes" and "silver-white eyes, glowing faintly in low light." Current canonical record uses "Wulfnic Bloodmoon" (no Douglas hyphenation).  
**Suggested Action:** COMPARE against current C_Wulfnic_Bloodmoon.md. The "glowing eyes" detail may be supernatural and subject to Canon Freeze. The "norse robes" detail is consistent with Bloodmoon Icelandic heritage.  
**Risk Level:** MEDIUM — "Glowing faintly" could be interpreted as supernatural. Needs Authority review.  

---

## CANDIDATE 011: Alyssa Avatar — Biometric Watch Detail

**Source:** `database_old/personas/alyssa_avatar.md`  
**Target Record:** `database/characters/C_Alyssa_Douglas_Bloodmoon.md`  
**Missing Information:** The avatar template contains extensive PList dossier with specific details: "PMC Watch" as surveillance gear, "Meta_Notes: Emphasize size difference and pampering dynamics. Do not let Alyssa initiate violence. Emphasize her biometric watch alerting the family if her heart rate spikes." These behavioral directives are not in the current canonical character record.  
**Suggested Action:** The biometric watch is a scenario-scoped element (Experience Layer), not a character baseline. The behavioral directives ("Do not let Alyssa initiate violence") are Experience-layer instructions that should NOT be in character files per R-003-CHR-008. No merge needed.  
**Risk Level:** LOW — Properly belongs to Experience Layer, not Character Layer.  

---

## CANDIDATE 012: Relationship Engine — Trust/Relationship States

**Source:** `database_old/scripts/relationship_engine.js`  
**Target Record:** Current engine architecture in `engine/`  
**Missing Information:** The relationship engine defines specific trust thresholds (0-20: Low, 20-50: Cautious, 50-80: Friendly, 80-100: Deep) and relationship states (stranger, acquaintance, friend, close friend, partner, mate, enemy, family). These behavioral systems are not documented in current engine specifications.  
**Suggested Action:** ARCHIVE the script. The behavioral logic is superseded by current engine architecture. However, the trust threshold definitions could serve as reference documentation for future engine development. Transfer to `knowledge/Engine_Logic/Engine_Template/` as reference only.  
**Risk Level:** LOW — Engine logic, not canon. No merge into canonical records.  

---

## CANDIDATE 013: State Engine — Emotion/Scenario States

**Source:** `database_old/scripts/state_engine.js`  
**Target Record:** Current engine architecture in `engine/`  
**Missing Information:** The state engine defines emotion states (fear, anger, protectiveness, affection), scenario states (school, workplace, home, mission/combat), and pack status (alpha, omega, outsider). These behavioral systems are not documented in current engine specifications.  
**Suggested Action:** ARCHIVE the script with bug fix (missing `var inject` declaration). Transfer to `knowledge/Engine_Logic/Engine_Template/` as reference only. NOTE: The "pack status" element (alpha/omega/outsider) relates to supernatural werewolf systems that are subject to Canon Freeze.  
**Risk Level:** LOW — Engine logic, not canon.  

---

## CANDIDATE 014: World-Specific Lore References in En_Core

**Source:** `database_old/core/En_Core.js`  
**Target Record:** Current engine architecture  
**Missing Information:** En_Core contains hardcoded world references: Douglas Estate, Solarton, Bloodmoon, Ambrosia, DCC, Vanguard PMC, SUCC (supernatural university). These are documented as "DEBT-003: World-Specific Lore in En_Core" in the code itself.  
**Suggested Action:** ARCHIVE. The current engine architecture has separated world lore from engine logic. These references should remain in the legacy archive.  
**Risk Level:** LOW — Already superseded by current architecture.  

---

## CANDIDATE 015: Diegetic UI Formatting Rules

**Source:** `database_old/core/En_Core.js` (DIEGETIC_UI_BY_L1 section)  
**Target Record:** Current engine/bot architecture  
**Missing Information:** Specific diegetic UI formatting rules per world: Cyber (RELAY/PRIVATE Node), Modern (ENCRYPTED THREAD/BLACKROOM), Pack (HOWL-CODE BURST), Fantasy (Corvid Dispatch/Runner's Slip). These formatting rules are not documented in current engine specifications.  
**Suggested Action:** The diegetic comms formatting rules are better documented in `database_old/templates/diegetic_comms_framework.md` (Category A transfer). The En_Core implementation is legacy. Archive En_Core, transfer the framework document.  
**Risk Level:** LOW — Duplicate coverage by Category A template.  

---

## SUMMARY

| Candidate | Type | Risk | Recommended Action |
|-----------|------|------|-------------------|
| 001: Chloe Douglas-Bloodmoon | New Character | HIGH | Full character audit required |
| 002: Liam Douglas-Bloodmoon | New Character + Supernatural | CRITICAL | Full character audit + Canon Freeze review |
| 003: Wulfnic Surname Variant | Surname Drift | LOW | REJECT — existing rules cover this |
| 004: Nixara KSA Origin | Canon Candidate | MEDIATE | Transfer to canon_candidates/ |
| 005: Miss Twin Peaks Event | Rejected Canon | N/A | REJECT — archive only |
| 006: Valeria Wet Nurse Theory | Rejected Canon | N/A | REJECT — archive only |
| 007: Myrick Douglas-Bloodmoon | Referenced (Rejected) | HIGH | DO NOT IMPORT |
| 008: Character Visual Details | Supplementary | LOW | Compare, supplement if needed |
| 009: Logan Visual Details | Supplementary | LOW | Compare, supplement if needed |
| 010: Wulfnic Glowing Eyes | Supernatural Element | MEDIUM | Authority review |
| 011: Alyssa Biometric Watch | Experience Layer | LOW | No merge needed |
| 012: Relationship Engine | Engine Logic | LOW | Archive as reference |
| 013: State Engine | Engine Logic | LOW | Archive as reference (fix bug) |
| 014: World Lore in En_Core | Engine Debt | LOW | Archive |
| 015: Diegetic UI Rules | Engine Logic | LOW | Archive (covered by template) |

---

**NO AUTOMATIC MERGES PERFORMED**  
**ALL CANDIDATES REQUIRE AUTHORITY DECISION**

---

**END OF REPORT**
