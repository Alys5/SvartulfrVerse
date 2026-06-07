# Repository Inventory

**Date:** 2026-06-08
**Authority:** Migration Architect
**Phase:** 4 — Migration Baseline
**Status:** COMPLETE

---

## Purpose

Complete inventory of SvartulfrVerse repository before migration.

**No modifications made.**
**Inventory only.**

---

## Full Repository Tree

```
SvartulfrVerse/
├── .trae/
│   └── rules/
│       ├── R-000_Runtime_Rules.md
│       ├── R-001_Dynastic_Rules.md
│       ├── R-002_Family_Rules.md
│       ├── R-003_Character_Rules.md
│       ├── R-004_Visual_Rules.md
│       ├── R-005_Experience_Rules.md
│       └── R-006_Governance_Rules.md
├── assets/
│   ├── refImage/
│   │   ├── alyssa_char.png
│   │   ├── alyssa_face.png
│   │   ├── alyssa_face_closeup.png
│   │   └── alyssa_head.png
│   ├── Alex.png
│   ├── Engine_Core_Cover.png
│   ├── alyssa.png
│   ├── emblema.png
│   ├── emblema_small.png
│   ├── engine.png
│   ├── env1.png
│   ├── family.png
│   ├── family_resize.png
│   ├── mood.png
│   └── npc.png
├── authority/
│   ├── characters/
│   │   └── Wulfnic/
│   │       ├── Biography.md
│   │       ├── Identity.md
│   │       ├── Import_Status.md
│   │       ├── Personality.md
│   │       └── Speech.md
│   ├── family/
│   │   ├── Family_Graph.md
│   │   ├── Marriages.md
│   │   ├── Parent_Child.md
│   │   └── Surname_Authority.md
│   ├── institutions/
│   │   └── DCC_Security_BlackWolf.md
│   └── visual/
│       ├── Inheritance_Rules.md
│       └── Visual_Baseline.md
├── core/
│   ├── ADR-000_Runtime_Baseline.md
│   ├── ADR-001_Dynastic_Origins.md
│   ├── ADR-002_Family_Authority.md
│   ├── ADR-003_Character_Authority.md
│   ├── ADR-004_Visual_Authority.md
│   ├── ADR-005_Experience_Authority.md
│   ├── ADR-006_Canon_Layer_Architecture.md
│   ├── Architecture.md
│   ├── Character_Audit_Protocol.md
│   ├── Deferred_Canon_Policy.md
│   ├── Rebuild_Principles.md
│   ├── Repository_Governance.md
│   ├── Repository_Scope.md
│   └── Roadmap_Execution_Charter.md
├── database/
│   ├── canon_candidates/
│   │   ├── CC_Template.md
│   │   └── README.md
│   ├── characters/
│   │   ├── templates/
│   │   │   └── C_Template.md
│   │   └── README.md
│   ├── experiences/
│   │   ├── templates/
│   │   │   └── Ex_Template.md
│   │   └── README.md
│   ├── families/
│   │   ├── templates/
│   │   │   └── Family_Template.md
│   │   └── README.md
│   ├── governance/
│   │   ├── ADR-000_Runtime_Baseline.md
│   │   ├── Migration_Guidelines.md
│   │   └── README.md
│   ├── institutions/
│   │   ├── templates/
│   │   │   └── Institution_Template.md
│   │   └── README.md
│   └── worlds/
│       ├── templates/
│       │   └── W_Template.md
│       └── README.md
├── docs/
│   └── janitor_guides/
│       ├── Icehellionx Script Guide.pdf
│       ├── JanitorAI Chatbot Creation Guide.pdf
│       └── Lorebook-Script.pdf
├── engines/
│   ├── En_Core.js
│   ├── experience_engine.js
│   ├── family_engine.js
│   ├── relationship_engine.js
│   └── state_engine.js
├── old_template_and_source/
│   ├── architecture/
│   │   ├── Engine_source.md
│   │   └── Governance_source.md
│   ├── characters/
│   │   ├── Alyssa_source.md
│   │   ├── Erik_source.md
│   │   ├── Jasper_source.md
│   │   ├── Logan_source.md
│   │   ├── Malachia_source.md
│   │   ├── Noah_source.md
│   │   └── Wulfnic_source.md
│   ├── experiences/
│   │   └── DJFrequency_source.md
│   ├── references/
│   │   ├── diegetic_comms_source.md
│   │   ├── personality_template_source.md
│   │   └── scenario_template_source.md
│   ├── worlds/
│   │   ├── Visual_DNA_source.md
│   │   └── W_Contemporary_source.md
│   ├── Recovery_Baseline_Source.md
│   ├── Visual_DNA.md
│   ├── color_palette.md
│   └── style_guide.md
├── reports/
│   ├── Legacy_Purge_Report.md
│   ├── Repository_Full_Audit_Report.md
│   └── Template_Engine_Improvement_Plan.md
├── .gitignore
└── README.md
```

---

## File Counts

### By Top-Level Directory

| Directory | Files | Subdirectories |
|-----------|-------|----------------|
| .trae/rules | 7 | 0 |
| assets | 12 | 1 |
| authority | 12 | 4 |
| core | 14 | 0 |
| database | 13 | 7 |
| docs | 3 | 1 |
| engines | 5 | 0 |
| old_template_and_source | 18 | 5 |
| reports | 3 | 0 |
| root | 2 | 0 |

**Total Files:** 89
**Total Directories:** 18

---

## Category Counts

| Category | Count |
|----------|-------|
| Governance Rules | 7 |
| Visual Assets | 12 |
| Authority Records | 12 |
| ADR Documents | 7 |
| Governance Documents | 7 |
| Database Templates | 6 |
| Database READMEs | 7 |
| External Documentation | 3 |
| Legacy Engines | 5 |
| Frozen Source Files | 18 |
| Reports | 3 |
| Root Files | 2 |

---

## Duplicate Candidates

| File | Location 1 | Location 2 | Analysis |
|------|------------|------------|----------|
| ADR-000_Runtime_Baseline.md | core/ | database/governance/ | MIGRATED COPY - Valid |
| Visual_DNA.md | old_template_and_source/ | old_template_and_source/worlds/Visual_DNA_source.md | DIFFERENT SCOPE - Both valid |

**Analysis:**

- `ADR-000` in database/governance is an intentional migrated copy per Roadmap
- `Visual_DNA.md` contains Character Identity Anchors not in `Visual_DNA_source.md`
- No true duplicates found

---

## Empty Files

| File | Location | Status |
|------|----------|--------|
| None identified | — | — |

**Note:** All README.md files contain placeholder text, not empty.

---

## Obsolete Placeholders

| File | Location | Status |
|------|----------|--------|
| En_Core.js | engines/ | SKELETON - No implementation |
| experience_engine.js | engines/ | SKELETON - No implementation |
| family_engine.js | engines/ | SKELETON - No implementation |
| relationship_engine.js | engines/ | SKELETON - No implementation |
| state_engine.js | engines/ | SKELETON - No implementation |

**Action:** All marked for purge per Legacy_Purge_Report.md

---

## Summary

```text
Total Files: 89
Total Directories: 18
Duplicates: 0 (2 intentional copies)
Empty Files: 0
Obsolete Placeholders: 5 (marked for purge)
```

---

## Authority

**Report Type:** Repository Inventory
**Date:** 2026-06-08
**Authority:** Migration Architect
**Status:** COMPLETE
