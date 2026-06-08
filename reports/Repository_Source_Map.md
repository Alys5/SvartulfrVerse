# Repository Source Map

**Date:** 2026-06-08
**Authority:** Migration Architect
**Status:** ACTIVE

---

## Purpose

Map all source artifacts to their canonical destination.

**Rules:**
- Every source has ONE destination
- No orphan sources
- No duplicate destinations

---

## Source Repositories

### SvartulfrVerse (Primary)

| Path | Role |
|------|------|
| `d:\SvartulfrVerse` | Active canonical repository |

**Contains:**
- All authority records
- All governance documents
- All frozen source files
- All database records (post-migration)

---

### Svartulfr_LA (Research)

| Path | Role |
|------|------|
| `d:\Svartulfr_LA` | Primary research repository |

**Contains:**
- Historical character files
- Legacy world data
- Original templates

**Status:** READ-ONLY

---

### Progetti (Archive)

| Path | Role |
|------|------|
| `d:\Progetti` | Secondary archive |

**Contains:**
- Supplementary materials
- Deprecated versions
- Historical experiments

**Status:** READ-ONLY

---

## Source Mapping

### Family Authority Sources

| Source | Repository | Destination | Status |
|--------|------------|-------------|--------|
| Family_Graph.md | SvartulfrVerse/authority/family | database/families/F_Douglas_Bloodmoon.md | READY |
| Marriages.md | SvartulfrVerse/authority/family | database/families/F_Marriages.md | READY |
| Parent_Child.md | SvartulfrVerse/authority/family | database/families/F_Parent_Child.md | READY |
| Surname_Authority.md | SvartulfrVerse/authority/family | database/families/F_Surname_Authority.md | READY |

---

### Visual Authority Sources

| Source | Repository | Destination | Status |
|--------|------------|-------------|--------|
| Visual_Baseline.md | SvartulfrVerse/authority/visual | database/worlds/W_Visual_Baseline.md | READY |
| Inheritance_Rules.md | SvartulfrVerse/authority/visual | database/worlds/W_Visual_Inheritance.md | READY |
| Visual_DNA.md | SvartulfrVerse/old_template_and_source | database/worlds/W_Visual_DNA.md | READY |
| Visual_DNA_source.md | SvartulfrVerse/old_template_and_source/worlds | database/worlds/W_Visual_Authority.md | READY |
| color_palette.md | SvartulfrVerse/old_template_and_source | database/worlds/W_Color_Palette.md | READY |
| style_guide.md | SvartulfrVerse/old_template_and_source | database/worlds/W_Style_Guide.md | READY |

---

### Institution Authority Sources

| Source | Repository | Destination | Status |
|--------|------------|-------------|--------|
| DCC_Security_BlackWolf.md | SvartulfrVerse/authority/institutions | database/institutions/I_DCC_Security_BlackWolf.md | READY |

---

### Character Authority Sources

| Source | Repository | Destination | Status |
|--------|------------|-------------|--------|
| Wulfnic_source.md | SvartulfrVerse/old_template_and_source/characters | database/characters/C_Wulfnic/C_Wulfnic.md | READY |
| Wulfnic/Biography.md | SvartulfrVerse/authority/characters/Wulfnic | database/characters/C_Wulfnic/Biography.md | READY |
| Wulfnic/Identity.md | SvartulfrVerse/authority/characters/Wulfnic | database/characters/C_Wulfnic/Identity.md | READY |
| Wulfnic/Personality.md | SvartulfrVerse/authority/characters/Wulfnic | database/characters/C_Wulfnic/Personality.md | READY |
| Wulfnic/Speech.md | SvartulfrVerse/authority/characters/Wulfnic | database/characters/C_Wulfnic/Speech.md | READY |
| Wulfnic/Import_Status.md | SvartulfrVerse/authority/characters/Wulfnic | database/characters/C_Wulfnic/Import_Status.md | READY |
| Erik_source.md | SvartulfrVerse/old_template_and_source/characters | database/characters/C_Erik.md | READY |
| Malachia_source.md | SvartulfrVerse/old_template_and_source/characters | database/characters/C_Malachia.md | READY |
| Noah_source.md | SvartulfrVerse/old_template_and_source/characters | database/characters/C_Noah.md | READY |
| Jasper_source.md | SvartulfrVerse/old_template_and_source/characters | database/characters/C_Jasper.md | READY |
| Alyssa_source.md | SvartulfrVerse/old_template_and_source/characters | database/characters/C_Alyssa.md | READY |
| Logan_source.md | SvartulfrVerse/old_template_and_source/characters | database/characters/C_Logan.md | READY |
| Kaladin_source.md | SvartulfrVerse/old_template_and_source/characters | database/characters/C_Kaladin_Nargathon.md | READY |
| Marcus_source.md | SvartulfrVerse/old_template_and_source/characters | database/characters/C_Marcus_Thornfield.md | READY |

---

### World Authority Sources

| Source | Repository | Destination | Status |
|--------|------------|-------------|--------|
| W_Contemporary_source.md | SvartulfrVerse/old_template_and_source/worlds | database/worlds/W_Contemporary.md | READY |

---

### Experience Authority Sources

| Source | Repository | Destination | Status |
|--------|------------|-------------|--------|
| DJFrequency_source.md | SvartulfrVerse/old_template_and_source/experiences | database/experiences/Ex_DJFrequency.md | READY |

---

### Governance Authority Sources

| Source | Repository | Destination | Status |
|--------|------------|-------------|--------|
| ADR-000_Runtime_Baseline.md | SvartulfrVerse/core | database/governance/G_ADR_000.md | VERIFIED |
| ADR-001_Dynastic_Origins.md | SvartulfrVerse/core | database/governance/G_ADR_001.md | READY |
| ADR-002_Family_Authority.md | SvartulfrVerse/core | database/governance/G_ADR_002.md | READY |
| ADR-003_Character_Authority.md | SvartulfrVerse/core | database/governance/G_ADR_003.md | READY |
| ADR-004_Visual_Authority.md | SvartulfrVerse/core | database/governance/G_ADR_004.md | READY |
| ADR-005_Experience_Authority.md | SvartulfrVerse/core | database/governance/G_ADR_005.md | READY |
| ADR-006_Canon_Layer_Architecture.md | SvartulfrVerse/core | database/governance/G_ADR_006.md | READY |
| Engine_source.md | SvartulfrVerse/old_template_and_source/architecture | database/governance/G_Engine_Architecture.md | READY |
| Governance_source.md | SvartulfrVerse/old_template_and_source/architecture | database/governance/G_Governance_Architecture.md | READY |
| Recovery_Baseline_Source.md | SvartulfrVerse/old_template_and_source | database/governance/G_Recovery_Baseline.md | READY |
| diegetic_comms_source.md | SvartulfrVerse/old_template_and_source/references | database/governance/G_Diegetic_Comms.md | READY |
| personality_template_source.md | SvartulfrVerse/old_template_and_source/references | database/governance/G_Personality_Template.md | READY |
| scenario_template_source.md | SvartulfrVerse/old_template_and_source/references | database/governance/G_Scenario_Template.md | READY |

---

## External Repository Mapping

### Svartulfr_LA Sources

| Source Type | Purpose | Workflow |
|-------------|---------|-----------|
| Character files | Evidence for missing data | Research → Audit → Import |
| World data | Historical verification | Research → Audit → Import |
| Templates | Legacy structure reference | Research only |

**Note:** No direct mapping. All imports require approval workflow.

---

### Progetti Sources

| Source Type | Purpose | Workflow |
|-------------|---------|-----------|
| Supplementary materials | Additional evidence | Research → Audit → Import |
| Deprecated versions | Conflict resolution | Research only |

**Note:** Lower priority than Svartulfr_LA.

---

## Missing Sources

| Destination | Issue | Resolution |
|-------------|-------|------------|
| database/technology/T_Echo.md | No frozen source | Document approval in authority record |

**Total Sources Mapped:** 39

---

## Authority

**Document Type:** Repository Source Map
**Date:** 2026-06-08
**Authority:** Migration Architect
**Status:** ACTIVE
