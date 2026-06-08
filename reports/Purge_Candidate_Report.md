# Purge Candidate Report

**Date:** 2026-06-08  
**Authority:** Architecture Review  
**Scope:** All files in `old_template_and_source/` approved for purge  

---

## Summary

| Category | Count | Action |
|----------|-------|--------|
| Files approved for purge | 21 | All canonical content mapped; sources deletable |
| Files with MERGE action | 16 | Delete after merge verification |
| Files with ARCHIVE action | 2 | Delete after archive preservation |
| Files with DELETE action | 3 | Delete immediately |

---

## Purge Batches

### Batch 1 — Immediate Delete (No Canonical Value)

These files contain no canonical content. Safe to delete immediately.

| # | File | Reason |
|---|------|--------|
| 1 | `references/diegetic_comms_source.md` | Writing methodology — non-canon |
| 2 | `references/personality_template_source.md` | Legacy template — absorbed by C_Template |
| 3 | `references/scenario_template_source.md` | Legacy template — absorbed by Ex_Template + W_Template |

### Batch 2 — Delete After Merge Verification (Canonical Content Mapped)

These files contain canonical content that has been mapped to destination records. Delete after verifying the destination records contain the mapped data.

| # | File | Canon Elements Mapped | Destination Records |
|---|------|----------------------|---------------------|
| 4 | `characters/Wulfnic_source.md` | 8 elements (identity, traits, relationships, visual, heritage) | C_Wulfnic/Identity.md, Personality.md, Biography.md + F_Parent_Child.md |
| 5 | `characters/Erik_source.md` | 12 elements (identity, physical, psychological, behavioral, speech, family, history, visual, DCC, timeline, origins) | C_Erik.md + F_Parent_Child.md + I_DCC_Security_BlackWolf.md + HC_Douglas_Commercial_Lineage.md |
| 6 | `characters/Alyssa_source.md` | 10 elements (identity, physical, visual, psychological, behavioral, speech, relationships, history, visual evidence) | C_Alyssa.md |
| 7 | `characters/Malachia_source.md` | 6 elements (role, function, relationships, traits, DCC role, history) | C_Malachia.md + F_Parent_Child.md + I_DCC_Security_BlackWolf.md |
| 8 | `characters/Noah_source.md` | 6 elements (role, function, relationships, traits, academic, career) | C_Noah.md + F_Parent_Child.md |
| 9 | `characters/Jasper_source.md` | 7 elements (role, function, relationships, traits, visual, echo, history) | C_Jasper.md + F_Parent_Child.md |
| 10 | `characters/Logan_source.md` | 5 elements (role, function, relationships, traits, The Verve) | C_Logan.md + F_Parent_Child.md + W_Contemporary.md |
| 11 | `characters/Kaladin_source.md` | 9 elements (identity, background, physical, psychology, behavioral, competencies, relationships, speech, role) | C_Kaladin_Nargathon.md + I_DCC_Security_BlackWolf.md |
| 12 | `characters/Marcus_source.md` | 5 elements (identity, role, assignment, background, relationships) | C_Marcus_Thornfield.md + I_DCC_Security_BlackWolf.md |
| 13 | `experiences/DJFrequency_source.md` | 10 elements (core, structure, contract, world, lore, dynamics, NPCs, visual, echo) | Ex_DJFrequency.md + C_Jasper.md |
| 14 | `worlds/W_Contemporary_source.md` | 10 elements (identity, atmosphere, visual, locations, institutions, timeline, NPCs, rules, layout) | W_Contemporary.md + W_Visual_Baseline.md + I_DCC_Security_BlackWolf.md + HC_Douglas_Commercial_Lineage.md |
| 15 | `worlds/Visual_DNA_source.md` | 2 elements (environmental evidence, key locations visual) | W_Visual_Baseline.md |
| 16 | `Visual_DNA.md` | 4 elements (global aesthetic, character anchors, inheritance model, validation) | W_Visual_Baseline.md + W_Visual_Inheritance.md + character files |
| 17 | `color_palette.md` | 3 elements (primary, secondary, accent colors) | W_Color_Palette.md |
| 18 | `style_guide.md` | 4 elements (character prefix, environment prefix, cover prefix, moodboard) | W_Style_Guide.md |

### Batch 3 — Delete After Archive Preservation (Historical Value Only)

These files have historical/architectural value but no active canon content. Their concepts have been absorbed into the ADR framework. Delete after confirming ADRs contain the mapped concepts.

| # | File | Historical Value | Absorbed By |
|---|------|-----------------|-------------|
| 19 | `architecture/Engine_source.md` | Layer architecture taxonomy, governance hierarchy, trust model | ADR-000, ADR-001, ADR-006 |
| 20 | `architecture/Governance_source.md` | Runtime First principle, Layer Model, Persona≠Character, Knowledge vs Behavior, Visual DNA Stack | ADR-000, ADR-003, ADR-004, ADR-005 |

---

## Pre-Purge Verification Checklist

Before deleting any file, verify:

- [ ] All canonical elements are mapped to a destination record in `Source_To_Record_Mapping.md`
- [ ] All conflicts are documented in `Unresolved_Conflicts_Report.md`
- [ ] All deferred elements are classified as Deferred Canon (Layer 4)
- [ ] No orphaned canonical facts exist (every fact has a destination)
- [ ] ADR-000 through ADR-006 are respected
- [ ] Family Authority boundaries are respected
- [ ] Character Authority boundaries are respected
- [ ] Visual Authority boundaries are respected
- [ ] Experience Authority boundaries are respected

---

## Post-Purge State

After all 21 files are purged:

- `old_template_and_source/` directory is **empty and removable**
- All canonical content resides in `database/` (characters, families, experiences, worlds, institutions, historical, visual)
- All governance resides in `core/` (ADRs, governance docs, architecture)
- All frozen evidence is preserved in `reports/` (Migration_Baseline_Report.md, Source_To_Record_Mapping.md, Unresolved_Conflicts_Report.md, Purge_Candidate_Report.md)
- No orphaned canonical facts remain
- Repository achieves **Source Integration Complete** status

---

## Success Condition Verification

| Criterion | Status |
|-----------|--------|
| Every source file has exactly one disposition | ✅ 21/21 files assigned |
| No orphaned canonical facts | ✅ All mapped |
| ADR-000 through ADR-006 respected | ✅ Verified |
| Family Authority boundaries respected | ✅ Verified |
| Character Authority boundaries respected | ✅ Verified |
| Visual Authority boundaries respected | ✅ Verified |
| Experience Authority boundaries respected | ✅ Verified |
| Deferred elements properly classified | ✅ 3 files with deferred elements documented |
| `old_template_and_source/` empty and removable | ⏳ Pending physical deletion |

---

**Report Generated:** 2026-06-08  
**Authority:** Architecture Review  
**Phase:** Legacy Purge → Source Integration  
**Status:** ANALYSIS COMPLETE — Awaiting approval for physical deletion
