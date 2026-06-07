# Migration Execution Plan

**Date:** 2026-06-08
**Authority:** Migration Architect
**Phase:** 4 — Migration Baseline
**Status:** PENDING APPROVAL

---

## Purpose

Define ordered migration sequence from frozen sources to canonical database.

**Success Condition:**

```text
1. Complete inventory ✓
2. Complete classification ✓
3. Complete migration baseline ✓
4. Complete question review ✓
5. Approved migration execution plan ← THIS DOCUMENT
```

**Only after approval may migration begin.**

---

## Pre-Migration Checklist

| Check | Status |
|-------|--------|
| ADR-000 verified | ✓ |
| Repository inventory complete | ✓ |
| File classification complete | ✓ |
| Migration baseline mapped | ✓ |
| Questions resolved | ✓ |
| Legacy purge executed | PENDING |

---

## Migration Phases

### Phase 1: Legacy Purge

**Priority:** CRITICAL
**Dependency:** None
**Duration:** Immediate

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| 1.1 | Delete engines/En_Core.js | PENDING |
| 1.2 | Delete engines/experience_engine.js | PENDING |
| 1.3 | Delete engines/family_engine.js | PENDING |
| 1.4 | Delete engines/relationship_engine.js | PENDING |
| 1.5 | Delete engines/state_engine.js | PENDING |
| 1.6 | Delete engines/ directory | PENDING |
| 1.7 | Generate Legacy_Purge_Completion_Report.md | PENDING |

**Success Criteria:**

```text
- engines/ directory removed
- No broken references
- Repository clean
```

---

### Phase 2: Family Authority Migration

**Priority:** HIGH
**Dependency:** Phase 1
**Duration:** 4 migrations

**Migration Order:**

| Order | Source | Destination | Status |
|-------|--------|-------------|--------|
| 2.1 | authority/family/Family_Graph.md | database/families/F_Douglas_Bloodmoon.md | PENDING |
| 2.2 | authority/family/Marriages.md | database/families/F_Marriages.md | PENDING |
| 2.3 | authority/family/Parent_Child.md | database/families/F_Parent_Child.md | PENDING |
| 2.4 | authority/family/Surname_Authority.md | database/families/F_Surname_Authority.md | PENDING |

**Validation Checkpoint:**

```text
After Phase 2:
- All family records in database/families/
- Cross-references valid
- No orphan records
```

---

### Phase 3: Visual Authority Migration

**Priority:** HIGH
**Dependency:** Phase 2
**Duration:** 6 migrations

**Migration Order:**

| Order | Source | Destination | Status |
|-------|--------|-------------|--------|
| 3.1 | authority/visual/Visual_Baseline.md | database/worlds/W_Visual_Baseline.md | PENDING |
| 3.2 | authority/visual/Inheritance_Rules.md | database/worlds/W_Visual_Inheritance.md | PENDING |
| 3.3 | old_template_and_source/Visual_DNA.md | database/worlds/W_Visual_DNA.md | PENDING |
| 3.4 | old_template_and_source/worlds/Visual_DNA_source.md | database/worlds/W_Visual_Authority.md | PENDING |
| 3.5 | old_template_and_source/color_palette.md | database/worlds/W_Color_Palette.md | PENDING |
| 3.6 | old_template_and_source/style_guide.md | database/worlds/W_Style_Guide.md | PENDING |

**Validation Checkpoint:**

```text
After Phase 3:
- All visual records in database/worlds/
- Fusion model documented
- Character identity anchors preserved
```

---

### Phase 4: Institution Authority Migration

**Priority:** HIGH
**Dependency:** Phase 3
**Duration:** 1 migration

**Migration Order:**

| Order | Source | Destination | Status |
|-------|--------|-------------|--------|
| 4.1 | authority/institutions/DCC_Security_BlackWolf.md | database/institutions/I_DCC_Security_BlackWolf.md | PENDING |

**Validation Checkpoint:**

```text
After Phase 4:
- Institution record in database/institutions/
- NPC documented
- Naming origin explained
```

---

### Phase 5: Character Authority Migration

**Priority:** HIGH
**Dependency:** Phase 2, Phase 4
**Duration:** 12 migrations

**Migration Order:**

| Order | Source | Destination | Dependencies | Status |
|-------|--------|-------------|--------------|--------|
| 5.1 | old_template_and_source/characters/Wulfnic_source.md | database/characters/C_Wulfnic/C_Wulfnic.md | F_Douglas_Bloodmoon | PENDING |
| 5.2 | authority/characters/Wulfnic/Biography.md | database/characters/C_Wulfnic/Biography.md | C_Wulfnic | PENDING |
| 5.3 | authority/characters/Wulfnic/Identity.md | database/characters/C_Wulfnic/Identity.md | C_Wulfnic | PENDING |
| 5.4 | authority/characters/Wulfnic/Personality.md | database/characters/C_Wulfnic/Personality.md | C_Wulfnic | PENDING |
| 5.5 | authority/characters/Wulfnic/Speech.md | database/characters/C_Wulfnic/Speech.md | C_Wulfnic | PENDING |
| 5.6 | authority/characters/Wulfnic/Import_Status.md | database/characters/C_Wulfnic/Import_Status.md | C_Wulfnic | PENDING |
| 5.7 | old_template_and_source/characters/Erik_source.md | database/characters/C_Erik.md | F_Douglas_Bloodmoon | PENDING |
| 5.8 | old_template_and_source/characters/Malachia_source.md | database/characters/C_Malachia.md | C_Erik, F_Douglas_Bloodmoon | PENDING |
| 5.9 | old_template_and_source/characters/Noah_source.md | database/characters/C_Noah.md | C_Erik, F_Douglas_Bloodmoon | PENDING |
| 5.10 | old_template_and_source/characters/Jasper_source.md | database/characters/C_Jasper.md | C_Erik, F_Douglas_Bloodmoon | PENDING |
| 5.11 | old_template_and_source/characters/Alyssa_source.md | database/characters/C_Alyssa.md | C_Erik, F_Douglas_Bloodmoon | PENDING |
| 5.12 | old_template_and_source/characters/Logan_source.md | database/characters/C_Logan.md | None | PENDING |

**Directory Structure for Wulfnic:**

```text
database/characters/C_Wulfnic/
├── C_Wulfnic.md
├── Biography.md
├── Identity.md
├── Personality.md
├── Speech.md
└── Import_Status.md
```

**Validation Checkpoint:**

```text
After Phase 5:
- All character records in database/characters/
- Wulfnic records in subdirectory (5 files)
- Family references valid
- Visual traits match Visual Authority
```

---

### Phase 6: World Authority Migration

**Priority:** MEDIUM
**Dependency:** Phase 4
**Duration:** 1 migration

**Migration Order:**

| Order | Source | Destination | Status |
|-------|--------|-------------|--------|
| 6.1 | old_template_and_source/worlds/W_Contemporary_source.md | database/worlds/W_Contemporary.md | PENDING |

**Validation Checkpoint:**

```text
After Phase 6:
- World record in database/worlds/
- Institution references valid
```

---

### Phase 7: Experience Authority Migration

**Priority:** MEDIUM
**Dependency:** Phase 5, Phase 6
**Duration:** 1 migration

**Migration Order:**

| Order | Source | Destination | Dependencies | Status |
|-------|--------|-------------|--------------|--------|
| 7.1 | old_template_and_source/experiences/DJFrequency_source.md | database/experiences/Ex_DJFrequency.md | C_Jasper, W_Contemporary | PENDING |

**Validation Checkpoint:**

```text
After Phase 7:
- Experience record in database/experiences/
- Character references valid
- World references valid
```

---

### Phase 8: Governance Authority Migration

**Priority:** MEDIUM
**Dependency:** None (parallel with Phase 2)
**Duration:** 13 migrations

**Migration Order:**

| Order | Source | Destination | Status |
|-------|--------|-------------|--------|
| 8.1 | core/ADR-000_Runtime_Baseline.md | database/governance/G_ADR_000.md | VERIFIED |
| 8.2 | core/ADR-001_Dynastic_Origins.md | database/governance/G_ADR_001.md | PENDING |
| 8.3 | core/ADR-002_Family_Authority.md | database/governance/G_ADR_002.md | PENDING |
| 8.4 | core/ADR-003_Character_Authority.md | database/governance/G_ADR_003.md | PENDING |
| 8.5 | core/ADR-004_Visual_Authority.md | database/governance/G_ADR_004.md | PENDING |
| 8.6 | core/ADR-005_Experience_Authority.md | database/governance/G_ADR_005.md | PENDING |
| 8.7 | core/ADR-006_Canon_Layer_Architecture.md | database/governance/G_ADR_006.md | PENDING |
| 8.8 | old_template_and_source/architecture/Engine_source.md | database/governance/G_Engine_Architecture.md | PENDING |
| 8.9 | old_template_and_source/architecture/Governance_source.md | database/governance/G_Governance_Architecture.md | PENDING |
| 8.10 | old_template_and_source/Recovery_Baseline_Source.md | database/governance/G_Recovery_Baseline.md | PENDING |
| 8.11 | old_template_and_source/references/diegetic_comms_source.md | database/governance/G_Diegetic_Comms.md | PENDING |
| 8.12 | old_template_and_source/references/personality_template_source.md | database/governance/G_Personality_Template.md | PENDING |
| 8.13 | old_template_and_source/references/scenario_template_source.md | database/governance/G_Scenario_Template.md | PENDING |

**Validation Checkpoint:**

```text
After Phase 8:
- All governance records in database/governance/
- ADR sequence valid
- Cross-references valid
```

---

## Migration Summary

| Phase | Domain | Migrations | Dependencies |
|-------|--------|------------|--------------|
| 1 | Legacy Purge | 7 deletions | None |
| 2 | Family | 4 | Phase 1 |
| 3 | Visual | 6 | Phase 2 |
| 4 | Institution | 1 | Phase 3 |
| 5 | Character | 12 | Phase 2, 4 |
| 6 | World | 1 | Phase 4 |
| 7 | Experience | 1 | Phase 5, 6 |
| 8 | Governance | 13 | None (parallel) |

**Total Migrations:** 38 (37 pending + 1 verified)

---

## Validation Strategy

### Per-Phase Validation

After each phase:

```text
1. Verify all sources migrated
2. Verify no orphan records
3. Verify cross-references valid
4. Verify authority compliance
5. Generate Phase_X_Validation_Report.md
```

### Final Validation

After all phases:

```text
1. Full database scan
2. Cross-reference integrity check
3. Authority hierarchy validation
4. Canon layer compliance check
5. Generate Database_Validation_Report.md
```

---

## Rollback Strategy

If migration fails:

```text
1. Stop immediately
2. Document failure point
3. Preserve frozen sources (never delete)
4. Generate Migration_Failure_Report.md
5. Request human review
```

**Never delete frozen sources.**
**Never modify authority records without approval.**

---

## Estimated Effort

| Phase | Complexity | Risk |
|-------|------------|------|
| 1 | Low | Low |
| 2 | Medium | Low |
| 3 | Medium | Low |
| 4 | Low | Low |
| 5 | High | Medium |
| 6 | Low | Low |
| 7 | Low | Low |
| 8 | Medium | Low |

**Overall Risk:** LOW-MEDIUM

---

## Approval Required

This plan requires explicit approval before execution.

**Approving authority must confirm:**

```text
□ Legacy purge targets correct
□ Migration order valid
□ Dependencies correct
□ Validation strategy adequate
□ Rollback strategy adequate
```

---

## Authority

**Document Type:** Migration Execution Plan
**Date:** 2026-06-08
**Authority:** Migration Architect
**Status:** PENDING APPROVAL

---

## STOP

**Do not execute migration without approval.**

**Waiting for approval...**
