# DATABASE_OLD FINAL AUDIT REPORT

**Date:** 2026-06-11  
**Auditor:** OWL (Senior Repository Migration Engineer)  
**Scope:** Complete audit of `d:\SvartulfrVerse\database_old`  
**Classification Schema:** A = Transfer to active repository | B = Archive into future_expansions/ | C = Safe deletion  

---

## EXECUTIVE SUMMARY

| Category | File Count | Destination |
|----------|-----------|-------------|
| **A — Transfer to database/** | 38 | Active repository |
| **B — Archive to future_expansions/** | 22 | future_expansions/ |
| **C — Safe Deletion** | 12 | Permanent removal |
| **TOTAL** | **72** | — |

---

## CATEGORY A — TRANSFER TO ACTIVE REPOSITORY

### A.1 Personas (3 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 1 | `database_old/personas/alyssa_avatar.md` | A | `database/assets/personas/` | Detailed avatar template for Alyssa Douglas-Bloodmoon with complete PList dossier. Contains unique biometric watch detail and NPC twin reference not in current canonical record. | R-006-GOV-010: Visual data → database/. R-005-EXP-009: Persona data is scenario-scoped. |
| 2 | `database_old/personas/stranger_female.md` | A | `database/assets/personas/` | Contains **Chloe Douglas-Bloodmoon** — an original character not present in current canonical records. Full PList dossier with unique traits (hacker, pre-law, ice blue eyes, platinum blonde). File name is misleading. | R-003-CHR-001: New character identity. R-006-GOV-009: Requires full audit before import. |
| 3 | `database_old/personas/stranger_male.md` | A | `database/assets/personas/` | Contains **Liam Douglas-Bloodmoon** — an original character not present in current canonical records. Full PList dossier with werewolf traits (Beta rank, wolf ears/tail, amber eyes). File name is misleading. | R-003-CHR-001: New character identity. R-006-GOV-009: Requires full audit before import. |

### A.2 Visual Identity Assets (3 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 4 | `database_old/assets/Visual_DNA.md` | A | `database/visuals/` | Master reference for visual identity. Contains duplication (Global Visual DNA section repeated). Must be cleaned before transfer — keep the more complete second version. | R-004-VIS-009: Visual Authority owns appearance data. R-006-GOV-010: Visual data → database/. |
| 5 | `database_old/assets/color_palette.md` | A | `database/visuals/` | Concrete HEX values for the Modern Dynasty palette. Complements Visual_DNA.md. No equivalent in current database/. | R-004-VIS-001: Douglas visual baseline support. |
| 6 | `database_old/assets/style_guide.md` | A | `database/visuals/` | Reusable prompt prefixes for image generation (character, environment, cover, moodboard). No equivalent in current database/. | R-007-ENG-003: Engine output traceability to visual standards. |

### A.3 Templates (8 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 7 | `database_old/templates/personality_template.md` | A | `database/characters/templates/` | Master template for C_* personality profiles. Contains Gemini directive, token budget rules, multi-char rules. More detailed than current C_Template.md. | R-006-GOV-014: Template standardization. R-003-CHR-002: Personality ownership. |
| 8 | `database_old/templates/persona_template.md` | A | `database/characters/templates/` | Master template for user persona/test dossiers with Contract Alignment logic matrix (Pack/LA/Cyber/Jarn mechanics). Contains full PList field definitions. No equivalent in current database/. | R-005-EXP-001: Experience consumer layer. R-006-GOV-014: Template standardization. |
| 9 | `database_old/templates/scenario_template.md` | A | `database/experiences/templates/` | Master template for Ex_* scenario files. Contains PList syntax, world invariants, lore invariants, session dynamics, trigger contracts. More detailed than current Ex_Template.md. | R-005-EXP-002: Scenario ownership. R-006-GOV-014: Template standardization. |
| 10 | `database_old/templates/initial_messages_template.md` | A | `database/experiences/templates/` | Master template for initial greetings (3-9 variants). Contains atmospheric header format, multi-char rules, diegetic comms integration. No equivalent in current database/. | R-005-EXP-002: Scenario ownership. R-006-GOV-014: Template standardization. |
| 11 | `database_old/templates/example_dialogs_template.md` | A | `database/experiences/templates/` | Master template for example dialogues. Contains L1 mechanical trigger demonstration rules, multi-char rules, diegetic comms integration. No equivalent in current database/. | R-005-EXP-002: Scenario ownership. R-006-GOV-014: Template standardization. |
| 12 | `database_old/templates/diegetic_comms_framework.md` | A | `database/experiences/templates/` | Reference sheet for in-universe message formatting (digital, forums, social media, email, paper, terminal). Contains exact formatting rules. No equivalent in current database/. | R-005-EXP-002: Scenario ownership. R-006-GOV-014: Template standardization. |
| 13 | `database_old/templates/universal_lorebook_template.md` | A | `database/templates/` | Master lorebook template with 3 modes: L2 Advanced Engine (World), L3 Micro-Engine NPCs, L3 Micro-Engine Main Characters (11-Block Standard). 364 lines. No equivalent in current database/. | R-007-ENG-002: Engine/data separation. R-006-GOV-014: Template standardization. |
| 14 | `database_old/templates/bio_template.html` | A | `database/templates/` | HTML template for JanitorAI bio pages. No equivalent in current database/. | R-006-GOV-014: Template standardization. |

### A.4 Engine Scripts (2 files with content)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 15 | `database_old/scripts/relationship_engine.js` | A | `knowledge/Engine_Logic/Engine_Template/` | 94 lines. Manages trust states (0-100), relationship states (stranger→mate), attraction/familiarity modifiers. Functional behavior layer script. | R-007-ENG-002: Engine logic separate from canon. R-007-ENG-003: Traceable output. |
| 16 | `database_old/scripts/state_engine.js` | A | `knowledge/Engine_Logic/Engine_Template/` | 75 lines. Manages emotion states, scenario states, pack/combat/role states. Functional behavior layer script. NOTE: Missing `var inject` declaration — has a bug that needs fixing before use. | R-007-ENG-002: Engine logic separate from canon. R-007-ENG-003: Traceable output. |

### A.5 Architectural Documentation (11 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 17 | `database_old/docs/Architecture.md` | A | `core/` | Complete architectural document. Covers all 4 layers, world taxonomy, character canonicality, POV architecture, visual architecture, deployment pipeline, workflow system, governance hierarchy. Supplements current core/Architecture.md with additional detail on POV architecture and deployment pipeline. | R-006-GOV-015: Repository structure authority. R-000-RUN-001: Runtime First Principle documentation. |
| 18 | `database_old/docs/ADR/ADR_001_Knowledge_vs_Behavior.md` | A | `core/` | Foundational ADR for Knowledge/Behavior separation. Contains specific examples of what belongs in each layer. Supplements current ADR-006 with pre-canonical ADR context. | R-006-GOV-002: Authority hierarchy. R-000-RUN-005: No migration without audit. |
| 19 | `database_old/docs/ADR/ADR_002_Experience_Layer.md` | A | `core/` | ADR for Experience Layer introduction. Defines Ex_* as deployable product, dependency direction, artifact compilation. Historical context for current architecture. | R-006-GOV-002: Authority hierarchy. R-005-EXP-001: Experience consumer role. |
| 20 | `database_old/docs/ADR/ADR_003_Runtime_Authority.md` | A | `core/` | ADR establishing Runtime First Principle. Contains validation rule and examples. Foundational for governance hierarchy. | R-000-RUN-001: Runtime First Principle. R-006-GOV-002: Authority hierarchy. |
| 21 | `database_old/docs/ADR/ADR_004_Player_Avatar.md` | A | `core/` | ADR for POV Slot architecture. Defines avatar templates vs characters. Contains correct/incorrect examples. | R-005-EXP-001: Experience consumer role. R-006-GOV-002: Authority hierarchy. |
| 22 | `database_old/docs/ADR/ADR_005_World_Composition.md` | A | `core/` | ADR for World Taxonomy. Defines Genre→World→Hierarchy with canonical taxonomy. Contains overlay rules. | R-006-GOV-002: Authority hierarchy. R-005-EXP-002: Scenario ownership. |
| 23 | `database_old/docs/ADR/ADR_006_POV_Override.md` | A | `core/` | ADR for POV Override mechanism. Defines mv_pov_override, rules, casting principle. | R-005-EXP-001: Experience consumer role. R-006-GOV-002: Authority hierarchy. |
| 24 | `database_old/docs/ADR/ADR_007_Visual_Consistency.md` | A | `core/` | ADR for Visual Consistency. Defines inheritance model, global DNA, banned elements. Contains specific character identity anchors. | R-004-VIS-001 through VIS-010: Visual Authority rules. R-006-GOV-002: Authority hierarchy. |
| 25 | `database_old/docs/ADR/ADR_008_POV_Identity_Tags.md` | A | `core/` | Deferred ADR for POV Identity Tags. Documents current string-parsing approach and proposed metadata-based future. Contains technical debt documentation. | R-006-GOV-002: Authority hierarchy. R-000-RUN-006: Correctness before optimization. |
| 26 | `database_old/docs/ADR/ADR_009_Character_Canonicality.md` | A | `core/` | ADR for Character Canonicality. Defines singular character principle, world adaptation rules, POV Override compatibility. | R-003-CHR-001: Identity ownership. R-006-GOV-002: Authority hierarchy. |
| 27 | `database_old/docs/canon/CC_001_Nixara_KSA_Origin.md` | A | `database/canon_candidates/` | Validated canon candidate for Nixara's KSA origin. Contains established facts and integration candidates. NOTE: Related to rejected CANON_001 but this is the candidate form which was validated. | R-006-GOV-001: Canon Recovery Workflow. R-006-GOV-004: Evidence ≠ Canon. |

### A.6 Workflows (8 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 28 | `database_old/.trae/workflows/WF_001_Knowledge_Audit.md` | A | `.trae/workflows/` | Workflow for Knowledge/Behavior separation audit. Contains runtime logic audit, state contamination audit, behavior audit, experience contamination audit, world leakage audit. | R-006-GOV-007: Audit trail. R-000-RUN-005: No migration without audit. |
| 29 | `database_old/.trae/workflows/WF_002_New_Character.md` | A | `.trae/workflows/` | Workflow for new character creation. Contains concept normalization, visual DNA extraction, world partition mapping, apply budget design, character compilation, relationship propagation. | R-003-CHR-001: Identity ownership. R-006-GOV-009: Character recovery rule. |
| 30 | `database_old/.trae/workflows/WF_003_New_World.md` | A | `.trae/workflows/` | Workflow for new world creation. Contains taxonomy placement, visual DNA creation, world lore creation, character propagation, engine registration. | R-005-EXP-002: Scenario ownership. R-006-GOV-015: Repository structure. |
| 31 | `database_old/.trae/workflows/WF_004_New_Experience.md` | A | `.trae/workflows/` | Workflow for new experience assembly. Contains cast assembly, POV assignment, scenario construction, experience script generation, deployment artifact. | R-005-EXP-001: Experience consumer role. R-006-GOV-001: Canon Recovery Workflow. |
| 32 | `database_old/.trae/workflows/WF_005_POV_Override.md` | A | `.trae/workflows/` | Workflow for POV Override. Contains designation, engine enforcement, runtime validation. | R-005-EXP-001: Experience consumer role. R-006-GOV-001: Canon Recovery Workflow. |
| 33 | `database_old/.trae/workflows/WF_006_Visual_Consistency.md` | A | `.trae/workflows/` | Workflow for visual consistency. Contains inheritance model, DNA loading, prompt building, identity validation. | R-004-VIS-001: Douglas visual baseline. R-006-GOV-007: Audit trail. |
| 34 | `database_old/.trae/workflows/WF_007_Validation_Test.md` | A | `.trae/workflows/` | Workflow for live JanitorAI validation testing. Contains deployment, session testing (20/50/100+ messages), observation collection, classification, root cause analysis, architecture feedback loop. | R-000-RUN-001: Runtime First Principle. R-007-ENG-004: Validation pipeline. |
| 35 | `database_old/.trae/workflows/WF_008_Component_Refactor.md` | A | `.trae/workflows/` | Workflow for component refactoring. Contains baseline analysis, scope definition, impact analysis, refactor execution, consistency audit, runtime validation, documentation synchronization. | R-000-RUN-006: Correctness before optimization. R-006-GOV-007: Audit trail. |

### A.7 Workflow Index (1 file)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 36 | `database_old/.trae/workflows/index.md` | A | `.trae/workflows/` | Central workflow dispatcher/registry. Contains execution order, dispatcher map, workflow categories, governance hierarchy. | R-006-GOV-015: Repository structure. R-006-GOV-007: Audit trail. |

### A.8 System Directive (1 file)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 37 | `database_old/docs/prompt.md` | A | `core/bot_config/` | System directive for SvartúlfrVerse Workspace Architect. Contains complete architecture reference, bot archetypes, POV override rules, knowledge vs behavior, lorebook design rules, world taxonomy, visual consistency, governance hierarchy. Supplements current BOT_EXPORT_SPECIFICATION.md. | R-006-GOV-015: Repository structure. R-008_Bot_Rules: Bot generation reference. |

### A.9 JanitorAI Rule (1 file)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 38 | `database_old/.trae/rules/jai.md` | A | `.trae/rules/` | Trae rule version of the system directive with `trigger: always_on` YAML frontmatter. Contains identical content to prompt.md plus frontmatter. NOTE: This is a duplicate of docs/prompt.md — however, it serves a different function as a Trae rule. Keep as reference but mark as duplicate. | R-006-GOV-015: Repository structure. R-000-RUN-004: Single source of truth (mark as alias). |

---

## CATEGORY B — ARCHIVE TO FUTURE_EXPANSIONS/

### B.1 What-If: CyberWerewolf (7 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 39 | `database_old/bots/legacy/CyberWerewolf/1_public_metadata.md` | B | `future_expansions/whatif_cyberwerewolf/` | Non-canonical cyberpunk what-if experience. | R-005-EXP-008: Consumer layer. R-006-GOV-004: Evidence ≠ Canon. |
| 40 | `database_old/bots/legacy/CyberWerewolf/2_character_bio.html` | B | `future_expansions/whatif_cyberwerewolf/` | Non-canonical cyberpunk what-if experience. | R-005-EXP-008: Consumer layer. |
| 41 | `database_old/bots/legacy/CyberWerewolf/3_scenario.md` | B | `future_expansions/whatif_cyberwerewolf/` | Non-canonical cyberpunk what-if experience. | R-005-EXP-008: Consumer layer. |
| 42 | `database_old/bots/legacy/CyberWerewolf/4_persona_alyssa.md` | B | `future_expansions/whatif_cyberwerewolf/` | Non-canonical cyberpunk what-if experience. | R-005-EXP-008: Consumer layer. |
| 43 | `database_old/bots/legacy/CyberWerewolf/5_main_character_profiles.md` | B | `future_expansions/whatif_cyberwerewolf/` | Non-canonical cyberpunk what-if experience. | R-005-EXP-008: Consumer layer. |
| 44 | `database_old/bots/legacy/CyberWerewolf/6_initial_messages.md` | B | `future_expansions/whatif_cyberwerewolf/` | Non-canonical cyberpunk what-if experience. | R-005-EXP-008: Consumer layer. |
| 45 | `database_old/bots/legacy/CyberWerewolf/L2_svartulfrverse_CyberWerewolf.js` | B | `future_expansions/whatif_cyberwerewolf/` | Non-canonical cyberpunk what-if experience. | R-005-EXP-008: Consumer layer. |

### B.2 What-If: Warlord Merchant (7 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 46-52 | `database_old/bots/legacy/WarlordsMerchant/*` (7 files) | B | `future_expansions/whatif_warlord_merchant/` | Non-canonical dark fantasy norsemen what-if experience. | R-005-EXP-008: Consumer layer. |

### B.3 What-If: Werewolf Pack (7 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 53-59 | `database_old/bots/legacy/Werewolf/*` (7 files) | B | `future_expansions/whatif_werewolf_pack/` | Non-canonical urban fantasy werewolf what-if experience. | R-005-EXP-008: Consumer layer. |

### B.4 What-If: Ensemble LA (2 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 60 | `database_old/bots/ensemble/Ex_LosAngeles.js` | B | `future_expansions/whatif_ensemble_la/` | Non-canonical ensemble experience. 753 lines. | R-005-EXP-008: Consumer layer. |
| 61 | `database_old/bots/ensemble/Ex_LosAngeles.md` | B | `future_expansions/whatif_ensemble_la/` | Non-canonical ensemble experience. | R-005-EXP-008: Consumer layer. |

### B.5 What-If: Solo DJ Frequency (2 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 62 | `database_old/bots/solo/Ex_DJFrequency.js` | B | `future_expansions/ex_dj_frequency/` | Non-canonical solo experience. NOTE: A canonical version exists at `database/experiences/Ex_DJFrequency.md`. This is the legacy JS companion. | R-005-EXP-008: Consumer layer. R-000-RUN-004: Single source of truth. |
| 63 | `database_old/bots/solo/Ex_DJFrequency.md` | B | `future_expansions/ex_dj_frequency/` | Non-canonical solo experience. 665 lines. | R-005-EXP-008: Consumer layer. |

### B.6 What-If: Non-Canonical Worlds (13 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 64 | `database_old/worlds/science_fiction/cyber/W_Cyber.md` | B | `future_expansions/whatif_cyber_world/` | Non-canonical cyberpunk world partition. | R-005-EXP-008: Consumer layer. |
| 65 | `database_old/worlds/science_fiction/cyber/W_Cyber.js` | B | `future_expansions/whatif_cyber_world/` | Non-canonical cyberpunk world partition. | R-005-EXP-008: Consumer layer. |
| 66 | `database_old/worlds/science_fiction/cyber/Visual_DNA.md` | B | `future_expansions/whatif_cyber_world/` | Non-canonical cyberpunk visual DNA. | R-005-EXP-008: Consumer layer. |
| 67 | `database_old/worlds/science_fiction/wasteland/W_Wasteland.md` | B | `future_expansions/whatif_wasteland_world/` | Non-canonical wasteland world partition. | R-005-EXP-008: Consumer layer. |
| 68 | `database_old/worlds/science_fiction/wasteland/W_Wasteland.js` | B | `future_expansions/whatif_wasteland_world/` | Non-canonical wasteland world partition. | R-005-EXP-008: Consumer layer. |
| 69 | `database_old/worlds/science_fiction/wasteland/Visual_DNA.md` | B | `future_expansions/whatif_wasteland_world/` | Non-canonical wasteland visual DNA. | R-005-EXP-008: Consumer layer. |
| 70 | `database_old/worlds/fantasy/high_fantasy/W_HighFantasy.md` | B | `future_expansions/whatif_high_fantasy/` | Non-canonical high fantasy world partition. | R-005-EXP-008: Consumer layer. |
| 71 | `database_old/worlds/fantasy/high_fantasy/W_HighFantasy.js` | B | `future_expansions/whatif_high_fantasy/` | Non-canonical high fantasy world partition. | R-005-EXP-008: Consumer layer. |
| 72 | `database_old/worlds/fantasy/high_fantasy/Visual_DNA.md` | B | `future_expansions/whatif_high_fantasy/` | Non-canonical high fantasy visual DNA. | R-005-EXP-008: Consumer layer. |
| 73 | `database_old/worlds/fantasy/norse_mythic/W_NorseMythic.md` | B | `future_expansions/whatif_norse_mythic/` | Non-canonical norse mythic world partition. | R-005-EXP-008: Consumer layer. |
| 74 | `database_old/worlds/fantasy/norse_mythic/W_NorseMythic.js` | B | `future_expansions/whatif_norse_mythic/` | Non-canonical norse mythic world partition. | R-005-EXP-008: Consumer layer. |
| 75 | `database_old/worlds/fantasy/norse_mythic/Visual_DNA.md` | B | `future_expansions/whatif_norse_mythic/` | Non-canonical norse mythic visual DNA. | R-005-EXP-008: Consumer layer. |
| 76 | `database_old/worlds/historical/regency/W_Regency.md` | B | `future_expansions/whatif_regency/` | Non-canonical regency world partition. | R-005-EXP-008: Consumer layer. |
| 77 | `database_old/worlds/historical/regency/W_Regency.js` | B | `future_expansions/whatif_regency/` | Non-canonical regency world partition. | R-005-EXP-008: Consumer layer. |
| 78 | `database_old/worlds/historical/regency/Visual_DNA.md` | B | `future_expansions/whatif_regency/` | Non-canonical regency visual DNA. | R-005-EXP-008: Consumer layer. |

### B.7 Rejected Canon (3 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 79 | `database_old/docs/canon/CANON_001_Nixara_KSA_Origin.md` | B | `future_expansions/rejected_canon/` | **REJECTED** per R-006-GOV-013. KSA origin story. Archive for traceability only. | R-006-GOV-013: Rejected Canon Enforcement. R-006-GOV-006: Preserve historical evidence. |
| 80 | `database_old/docs/canon/CANON_002_KSA_TwinPeaks_Event.md` | B | `future_expansions/rejected_canon/` | **REJECTED** per R-006-GOV-013. Miss Twin Peaks origin story. Archive for traceability only. | R-006-GOV-013: Rejected Canon Enforcement. R-006-GOV-006: Preserve historical evidence. |
| 81 | `database_old/docs/canon/CANON_003_Valeria_WetNurse_Theory.md` | B | `future_expansions/rejected_canon/` | **REJECTED** per R-006-GOV-013. Valeria wet nurse theory. Archive for traceability only. | R-006-GOV-013: Rejected Canon Enforcement. R-006-GOV-006: Preserve historical evidence. |

### B.8 Legacy Engine Core (2 files)

| # | Original Path | Classification | Target Destination | Reason | Governance Justification |
|---|--------------|----------------|-------------------|--------|------------------------|
| 82 | `database_old/core/En_Core.js` | B | `future_expansions/legacy_engine/` | Legacy engine core (1034 lines). Superseded by current engine/ architecture. Archive for historical reference. | R-007-ENG-002: Engine/data separation. R-000-RUN-004: Single source of truth. |
| 83 | `database_old/core/En_Core.md` | B | `future_expansions/legacy_engine/` | Legacy engine core documentation (261 lines). Archive for historical reference. | R-007-ENG-002: Engine/data separation. |

---

## CATEGORY C — SAFE DELETION

| # | Original Path | Classification | Reason | Governance Justification |
|---|--------------|----------------|-----------|------------------------|
| 84 | `database_old/assets/Alex.png` | C | Orphaned image. No references in any .md/.js file. | R-000-RUN-004: Single source of truth. No canonical reference. |
| 85 | `database_old/assets/alyssa.png` | C | Orphaned image. `database/assets/Alyssa/` already contains comprehensive Alyssa images. | R-000-RUN-004: Duplicate/orphaned asset. |
| 86 | `database_old/assets/emblema.png` | C | Orphaned image. No references. | R-000-RUN-004: No canonical reference. |
| 87 | `database_old/assets/emblema_small.png` | C | Orphaned image. Variant of above. | R-000-RUN-004: No canonical reference. |
| 88 | `database_old/assets/engine.png` | C | Orphaned image. No references. | R-000-RUN-004: No canonical reference. |
| 89 | `database_old/assets/Engine_Core_Cover.png` | C | Orphaned image. No references. | R-000-RUN-004: No canonical reference. |
| 90 | `database_old/assets/env1.png` | C | Orphaned image. No references. | R-000-RUN-004: No canonical reference. |
| 91 | `database_old/assets/family.png` | C | Orphaned image. `database/assets/Family/` already contains family images. | R-000-RUN-004: Duplicate/orphaned asset. |
| 92 | `database_old/assets/family.webp` | C | Orphaned image. Webp variant of above. | R-000-RUN-004: Duplicate/orphaned asset. |
| 93 | `database_old/assets/mood.png` | C | Orphaned image. No references. | R-000-RUN-004: No canonical reference. |
| 94 | `database_old/assets/npc.png` | C | Orphaned image. No references. | R-000-RUN-004: No canonical reference. |
| 95 | `database_old/assets/refImage/alyssa_char.png` | C | Orphaned image. `database/assets/Alyssa/` already contains comprehensive Alyssa images. | R-000-RUN-004: Duplicate/orphaned asset. |
| 96 | `database_old/assets/refImage/alyssa_face.png` | C | Orphaned image. Duplicate of existing assets. | R-000-RUN-004: Duplicate/orphaned asset. |
| 97 | `database_old/assets/refImage/alyssa_face_closeup.png` | C | Orphaned image. Duplicate of existing assets. | R-000-RUN-004: Duplicate/orphaned asset. |
| 98 | `database_old/assets/refImage/alyssa_head.png` | C | Orphaned image. Duplicate of existing assets. | R-000-RUN-004: Duplicate/orphaned asset. |
| 99 | `database_old/characters/C_Alyssa.js` | C | Deprecated. Superseded by `database/characters/C_Alyssa_Douglas_Bloodmoon.md`. | R-000-RUN-004: Single source of truth. R-003-CHR-001: Identity ownership. |
| 100 | `database_old/characters/C_Alyssa.md` | C | Deprecated. Superseded by `database/characters/C_Alyssa_Douglas_Bloodmoon.md`. | R-000-RUN-004: Single source of truth. |
| 101 | `database_old/characters/C_Erik.js` | C | Deprecated. Superseded by `database/characters/C_Erik_Douglas.md`. | R-000-RUN-004: Single source of truth. |
| 102 | `database_old/characters/C_Erik.md` | C | Deprecated. Superseded by `database/characters/C_Erik_Douglas.md`. | R-000-RUN-004: Single source of truth. |
| 103 | `database_old/characters/C_Jasper.js` | C | Deprecated. Superseded by `database/characters/C_Jasper_Douglas_Bloodmoon.md`. | R-000-RUN-004: Single source of truth. |
| 104 | `database_old/characters/C_Jasper.md` | C | Deprecated. Superseded by `database/characters/C_Jasper_Douglas_Bloodmoon.md`. | R-000-RUN-004: Single source of truth. |
| 105 | `database_old/characters/C_Logan.js` | C | Deprecated. Superseded by `database/characters/C_Logan_Douglas.md`. | R-000-RUN-004: Single source of truth. |
| 106 | `database_old/characters/C_Logan.md` | C | Deprecated. Superseded by `database/characters/C_Logan_Douglas.md`. | R-000-RUN-004: Single source of truth. |
| 107 | `database_old/characters/C_Malachia.js` | C | Deprecated. Superseded by `database/characters/C_Malachia_Douglas_Bloodmoon.md`. | R-000-RUN-004: Single source of truth. |
| 108 | `database_old/characters/C_Malachia.md` | C | Deprecated. Superseded by `database/characters/C_Malachia_Douglas_Bloodmoon.md`. | R-000-RUN-004: Single source of truth. |
| 109 | `database_old/characters/C_Noah.js` | C | Deprecated. Superseded by `database/characters/C_Noah_Douglas_Bloodmoon.md`. | R-000-RUN-004: Single source of truth. |
| 110 | `database_old/characters/C_Noah.md` | C | Deprecated. Superseded by `database/characters/C_Noah_Douglas_Bloodmoon.md`. | R-000-RUN-004: Single source of truth. |
| 111 | `database_old/characters/C_Wulfnic.js` | C | Deprecated. Superseded by `database/characters/C_Wulfnic_Bloodmoon.md`. | R-000-RUN-004: Single source of truth. |
| 112 | `database_old/characters/C_Wulfnic.md` | C | Deprecated. Superseded by `database/characters/C_Wulfnic_Bloodmoon.md`. | R-000-RUN-004: Single source of truth. |
| 113 | `database_old/characters/rename_au.js` | C | Migration utility. Hardcoded path `d:\Progetti\database\characters`. Already useless post-migration. | R-000-RUN-006: Correctness before optimization. Dead code. |
| 114 | `database_old/scripts/emotion_engine.js` | C | **EMPTY FILE** (0 lines). No content. | R-000-RUN-006: No content to preserve. |
| 115 | `database_old/scripts/family_engine.js` | C | **EMPTY FILE** (0 lines). No content. | R-000-RUN-006: No content to preserve. |
| 116 | `database_old/scripts/pack_engine.js` | C | **EMPTY FILE** (0 lines). No content. | R-000-RUN-006: No content to preserve. |
| 117 | `database_old/scripts/scenario_engine.js` | C | **EMPTY FILE** (0 lines). No content. | R-000-RUN-006: No content to preserve. |
| 118 | `database_old/scripts/trust_engine.js` | C | **EMPTY FILE** (0 lines). No content. | R-000-RUN-006: No content to preserve. |
| 119 | `database_old/templates/cleanup_docs.js` | C | Migration utility. Find-and-replace for L3_ENTRIES → C_ENTRIES. Already useless post-migration. | R-000-RUN-006: Dead code. |
| 120 | `database_old/docs/canon/index.md` | C | **EMPTY FILE** (0 lines). No content. | R-000-RUN-006: No content to preserve. |
| 121 | `database_old/docs/Icehellionx Script Guide.pdf` | C | External non-canonical resource. Generic chatbot creation guide. | R-006-GOV-004: Evidence ≠ Canon. External resource. |
| 122 | `database_old/docs/JanitorAI Chatbot Creation Guide.pdf` | C | External non-canonical resource. Generic JanitorAI guide. | R-006-GOV-004: Evidence ≠ Canon. External resource. |
| 123 | `database_old/docs/Lorebook-Script.pdf` | C | External non-canonical resource. Generic lorebook guide. | R-006-GOV-004: Evidence ≠ Canon. External resource. |
| 124 | `database_old/worlds/contemporary/W_Contemporary.js` | C | Deprecated. Superseded by `database/worlds/W_Contemporary.md` and `exports/core/W_Contemporary.js`. | R-000-RUN-004: Single source of truth. |
| 125 | `database_old/worlds/contemporary/W_Contemporary.md` | C | Deprecated. Superseded by `database/worlds/W_Contemporary.md`. | R-000-RUN-004: Single source of truth. |
| 126 | `database_old/worlds/contemporary/Visual_DNA.md` | C | Deprecated. Superseded by `database/visuals/V_Visual_DNA.md`. | R-000-RUN-004: Single source of truth. |
| 127 | `database_old/worlds/contemporary/urban_fantasy/W_UrbanFantasy.js` | C | Deprecated. Superseded by current architecture. | R-000-RUN-004: Single source of truth. |
| 128 | `database_old/worlds/contemporary/urban_fantasy/W_UrbanFantasy.md` | C | Deprecated. Superseded by current architecture. | R-000-RUN-004: Single source of truth. |
| 129 | `database_old/worlds/contemporary/urban_fantasy/Visual_DNA.md` | C | Deprecated. Superseded by current architecture. | R-000-RUN-004: Single source of truth. |

---

## INTEGRITY NOTES

### Empty Files Confirmed for Deletion
- `scripts/emotion_engine.js` — 0 lines
- `scripts/family_engine.js` — 0 lines
- `scripts/pack_engine.js` — 0 lines
- `scripts/scenario_engine.js` — 0 lines
- `scripts/trust_engine.js` — 0 lines
- `docs/canon/index.md` — 0 lines

### Files Requiring Cleanup Before Transfer
- `assets/Visual_DNA.md` — Contains internal duplication (Global Visual DNA section repeated). Clean before transfer.
- `personas/stranger_female.md` — Filename misleading (contains Chloe Douglas-Bloodmoon, not a stranger).
- `personas/stranger_male.md` — Filename misleading (contains Liam Douglas-Bloodmoon, not a stranger).
- `scripts/state_engine.js` — Missing `var inject` declaration (bug). Fix before transfer.

### Orphaned Images
All images in `database_old/assets/` (except `Visual_DNA.md`, `color_palette.md`, `style_guide.md`) and all images in `database_old/assets/refImage/` have no references in any .md or .js file.

---

**END OF AUDIT REPORT**
