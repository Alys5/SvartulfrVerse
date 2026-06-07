# File Classification Report

**Date:** 2026-06-08
**Authority:** Migration Architect
**Phase:** 4 — Migration Baseline
**Status:** COMPLETE

---

## Purpose

Classify every file in SvartulfrVerse repository by domain and function.

**No modifications made.**
**Classification only.**

---

## Classification Schema

| Category | Description |
|----------|-------------|
| Authority | Canonical authority records |
| Character | Character data (source or record) |
| Visual | Visual canon and assets |
| Family | Genealogical data |
| Experience | Scenario/experience content |
| World | World-building data |
| Institution | Institutional records |
| Technology | Technology records |
| Governance | ADRs and governance documents |
| Archive | Frozen historical evidence |
| Report | Operational reports |
| Template | Migration templates |
| Asset | Visual resource files |
| Documentation | External documentation |
| Legacy | Obsolete/deprecated files |
| Unknown | Unclassified files |

---

## Classification Results

### Authority Files

| File | Location | Domain | Status |
|------|----------|--------|--------|
| Biography.md | authority/characters/Wulfnic/ | Character | ACTIVE |
| Identity.md | authority/characters/Wulfnic/ | Character | ACTIVE |
| Import_Status.md | authority/characters/Wulfnic/ | Character | ACTIVE |
| Personality.md | authority/characters/Wulfnic/ | Character | ACTIVE |
| Speech.md | authority/characters/Wulfnic/ | Character | ACTIVE |
| Family_Graph.md | authority/family/ | Family | ACTIVE |
| Marriages.md | authority/family/ | Family | ACTIVE |
| Parent_Child.md | authority/family/ | Family | ACTIVE |
| Surname_Authority.md | authority/family/ | Family | ACTIVE |
| DCC_Security_BlackWolf.md | authority/institutions/ | Institution | ACTIVE |
| Inheritance_Rules.md | authority/visual/ | Visual | ACTIVE |
| Visual_Baseline.md | authority/visual/ | Visual | ACTIVE |

---

### Governance Files

| File | Location | Domain | Status |
|------|----------|--------|--------|
| ADR-000_Runtime_Baseline.md | core/ | Governance | ACTIVE |
| ADR-001_Dynastic_Origins.md | core/ | Governance | ACTIVE |
| ADR-002_Family_Authority.md | core/ | Governance | ACTIVE |
| ADR-003_Character_Authority.md | core/ | Governance | ACTIVE |
| ADR-004_Visual_Authority.md | core/ | Governance | ACTIVE |
| ADR-005_Experience_Authority.md | core/ | Governance | ACTIVE |
| ADR-006_Canon_Layer_Architecture.md | core/ | Governance | ACTIVE |
| Architecture.md | core/ | Governance | ACTIVE |
| Character_Audit_Protocol.md | core/ | Governance | ACTIVE |
| Deferred_Canon_Policy.md | core/ | Governance | ACTIVE |
| Rebuild_Principles.md | core/ | Governance | ACTIVE |
| Repository_Governance.md | core/ | Governance | ACTIVE |
| Repository_Scope.md | core/ | Governance | ACTIVE |
| Roadmap_Execution_Charter.md | core/ | Governance | ACTIVE |

---

### Governance Rules

| File | Location | Domain | Status |
|------|----------|--------|--------|
| R-000_Runtime_Rules.md | .trae/rules/ | Governance | ACTIVE |
| R-001_Dynastic_Rules.md | .trae/rules/ | Governance | ACTIVE |
| R-002_Family_Rules.md | .trae/rules/ | Governance | ACTIVE |
| R-003_Character_Rules.md | .trae/rules/ | Governance | ACTIVE |
| R-004_Visual_Rules.md | .trae/rules/ | Governance | ACTIVE |
| R-005_Experience_Rules.md | .trae/rules/ | Governance | ACTIVE |
| R-006_Governance_Rules.md | .trae/rules/ | Governance | ACTIVE |

---

### Database Templates

| File | Location | Domain | Status |
|------|----------|--------|--------|
| C_Template.md | database/characters/templates/ | Character | TEMPLATE |
| Ex_Template.md | database/experiences/templates/ | Experience | TEMPLATE |
| Family_Template.md | database/families/templates/ | Family | TEMPLATE |
| Institution_Template.md | database/institutions/templates/ | Institution | TEMPLATE |
| W_Template.md | database/worlds/templates/ | World | TEMPLATE |
| CC_Template.md | database/canon_candidates/ | Candidate | TEMPLATE |

---

### Database Governance

| File | Location | Domain | Status |
|------|----------|--------|--------|
| ADR-000_Runtime_Baseline.md | database/governance/ | Governance | MIGRATED |
| Migration_Guidelines.md | database/governance/ | Governance | ACTIVE |

---

### Frozen Source Files — Characters

| File | Location | Domain | Status |
|------|----------|--------|--------|
| Alyssa_source.md | old_template_and_source/characters/ | Character | FROZEN |
| Erik_source.md | old_template_and_source/characters/ | Character | FROZEN |
| Jasper_source.md | old_template_and_source/characters/ | Character | FROZEN |
| Logan_source.md | old_template_and_source/characters/ | Character | FROZEN |
| Malachia_source.md | old_template_and_source/characters/ | Character | FROZEN |
| Noah_source.md | old_template_and_source/characters/ | Character | FROZEN |
| Wulfnic_source.md | old_template_and_source/characters/ | Character | FROZEN |

---

### Frozen Source Files — Worlds

| File | Location | Domain | Status |
|------|----------|--------|--------|
| Visual_DNA_source.md | old_template_and_source/worlds/ | Visual | FROZEN |
| W_Contemporary_source.md | old_template_and_source/worlds/ | World | FROZEN |

---

### Frozen Source Files — Experiences

| File | Location | Domain | Status |
|------|----------|--------|--------|
| DJFrequency_source.md | old_template_and_source/experiences/ | Experience | FROZEN |

---

### Frozen Source Files — Architecture

| File | Location | Domain | Status |
|------|----------|--------|--------|
| Engine_source.md | old_template_and_source/architecture/ | Governance | FROZEN |
| Governance_source.md | old_template_and_source/architecture/ | Governance | FROZEN |

---

### Frozen Source Files — References

| File | Location | Domain | Status |
|------|----------|--------|--------|
| diegetic_comms_source.md | old_template_and_source/references/ | Governance | FROZEN |
| personality_template_source.md | old_template_and_source/references/ | Governance | FROZEN |
| scenario_template_source.md | old_template_and_source/references/ | Governance | FROZEN |

---

### Frozen Source Files — Root

| File | Location | Domain | Status |
|------|----------|--------|--------|
| Recovery_Baseline_Source.md | old_template_and_source/ | Governance | FROZEN |
| Visual_DNA.md | old_template_and_source/ | Visual | FROZEN |
| color_palette.md | old_template_and_source/ | Visual | FROZEN |
| style_guide.md | old_template_and_source/ | Visual | FROZEN |

---

### Report Files

| File | Location | Domain | Status |
|------|----------|--------|--------|
| Legacy_Purge_Report.md | reports/ | Report | ACTIVE |
| Repository_Full_Audit_Report.md | reports/ | Report | ACTIVE |
| Template_Engine_Improvement_Plan.md | reports/ | Report | ACTIVE |
| Repository_Inventory.md | reports/ | Report | ACTIVE |
| File_Classification_Report.md | reports/ | Report | ACTIVE |

---

### Asset Files

| File | Location | Domain | Status |
|------|----------|--------|--------|
| Alex.png | assets/ | Asset | ACTIVE |
| Engine_Core_Cover.png | assets/ | Asset | ACTIVE |
| alyssa.png | assets/ | Asset | ACTIVE |
| emblema.png | assets/ | Asset | ACTIVE |
| emblema_small.png | assets/ | Asset | ACTIVE |
| engine.png | assets/ | Asset | ACTIVE |
| env1.png | assets/ | Asset | ACTIVE |
| family.png | assets/ | Asset | ACTIVE |
| family_resize.png | assets/ | Asset | ACTIVE |
| mood.png | assets/ | Asset | ACTIVE |
| npc.png | assets/ | Asset | ACTIVE |
| alyssa_char.png | assets/refImage/ | Asset | ACTIVE |
| alyssa_face.png | assets/refImage/ | Asset | ACTIVE |
| alyssa_face_closeup.png | assets/refImage/ | Asset | ACTIVE |
| alyssa_head.png | assets/refImage/ | Asset | ACTIVE |

---

### Documentation Files

| File | Location | Domain | Status |
|------|----------|--------|--------|
| Icehellionx Script Guide.pdf | docs/janitor_guides/ | Documentation | ACTIVE |
| JanitorAI Chatbot Creation Guide.pdf | docs/janitor_guides/ | Documentation | ACTIVE |
| Lorebook-Script.pdf | docs/janitor_guides/ | Documentation | ACTIVE |

---

### Legacy Files

| File | Location | Domain | Status |
|------|----------|--------|--------|
| En_Core.js | engines/ | Legacy | PURGE CANDIDATE |
| experience_engine.js | engines/ | Legacy | PURGE CANDIDATE |
| family_engine.js | engines/ | Legacy | PURGE CANDIDATE |
| relationship_engine.js | engines/ | Legacy | PURGE CANDIDATE |
| state_engine.js | engines/ | Legacy | PURGE CANDIDATE |

---

### Root Files

| File | Location | Domain | Status |
|------|----------|--------|--------|
| .gitignore | root | Governance | ACTIVE |
| README.md | root | Governance | ACTIVE |

---

## Classification Summary

| Category | Count |
|----------|-------|
| Authority | 12 |
| Governance | 21 |
| Governance Rules | 7 |
| Database Templates | 6 |
| Database Governance | 2 |
| Frozen Source — Characters | 7 |
| Frozen Source — Worlds | 2 |
| Frozen Source — Experiences | 1 |
| Frozen Source — Architecture | 2 |
| Frozen Source — References | 3 |
| Frozen Source — Root | 4 |
| Reports | 5 |
| Assets | 15 |
| Documentation | 3 |
| Legacy | 5 |
| Root | 2 |

**Total Classified:** 89 files

---

## Domain Distribution

| Domain | Count |
|--------|-------|
| Governance | 35 |
| Character | 8 |
| Visual | 5 |
| Family | 4 |
| Experience | 2 |
| World | 2 |
| Institution | 2 |
| Asset | 15 |
| Report | 5 |
| Legacy | 5 |
| Documentation | 3 |
| Template | 6 |

---

## Authority

**Report Type:** File Classification Report
**Date:** 2026-06-08
**Authority:** Migration Architect
**Status:** COMPLETE
