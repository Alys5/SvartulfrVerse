# Visual Authority — Master Index

---

## Authority

| Field | Value |
|-------|-------|
| Authority Layer | Visual Authority (ADR-004) |
| Directory Authority | ADR-007 |
| Last Updated | 2026-06-10 |
| Status | ACTIVE |

---

## Purpose

This document serves as the master index for all visual directives in the SvartúlfrVerse repository. All image generation, character design, and visual asset creation must comply with the documents referenced below.

---

## Active Visual Documents

| File | Purpose | Last Updated |
|------|---------|--------------|
| `V_Visual_DNA.md` | Master visual style, regeneration anchors, color/lighting/facial/body DNA | 2026-06-10 |
| `V_Visual_Package_Standard.md` | Bot visual package specification (5-image minimum, 7-image extended) | 2026-06-10 |
| `template/V_VisualPrompt_Template.md` | Ready-to-use prompt templates for all 7 asset types × 7 characters | 2026-06-10 |
| `V_Visual_Packages_Per_Character.md` | Specific 7-image package definitions per Tier-1 character | 2026-06-10 |
| `V_Visual_Baseline.md` | Canonical visual phenotype records (character baseline appearances) | 2026-06-08 |
| `V_Visual_Inheritance.md` | Visual inheritance model (Douglas/Bloodmoon fusion rules) | 2026-06-08 |
| `V_Visual_Reconciliation.md` | Visual canon conflict resolution log | 2026-06-08 |

---

## Visual Style Authority

**Primary Style:** California Slice-of-Life Dynasty v1

All visual output must follow the Master Style Prefix defined in `V_Visual_DNA.md`. No image may deviate from the approved visual authority.

---

## Character Regeneration Anchors

All character regeneration anchors are defined in `V_Visual_DNA.md`. These anchors are **canonical** and must be included in every prompt for the respective character.

**Tier-1 Characters (7-image extended package):**
- Alyssa Douglas-Bloodmoon
- Jasper Douglas-Bloodmoon
- Malachia Douglas-Bloodmoon
- Noah Douglas-Bloodmoon
- Erik Douglas
- Logan Douglas
- Wulfnic Bloodmoon

---

## Image Asset Directory

| Directory | Contents |
|-----------|----------|
| `database/assets/` | Rendered PNG/WebP character images and promotional assets |
| `database/visuals/` | Visual directive documents (this index and all V_ files except prompt templates) |
| `template/V_VisualPrompt_Template.md` | Ready-to-use visual prompt templates |

---

## Compliance Rules

1. **Style Consistency:** All images must use the Master Style Prefix
2. **Character Recognition:** Characters must be identifiable across all images regardless of clothing/location/angle
3. **No Deviation:** No image may use styles outside the approved California Slice-of-Life Dynasty palette
4. **Negative Prompts:** Universal negative prompt must be appended to every generation
5. **Package Completeness:** Tier-1 characters require the full 7-image package
6. **Visual Storytelling:** Every image package must answer: Who? What like? What do? What feel? What world?

---

## Quick Reference — File Navigation

**Need the style/color/lighting DNA?** → `V_Visual_DNA.md`
**Need the package structure?** → `V_Visual_Package_Standard.md`
**Need a ready-made prompt?** → `template/V_VisualPrompt_Template.md`
**Need character-specific scenes?** → `V_Visual_Packages_Per_Character.md`
**Need canonical phenotypes?** → `V_Visual_Baseline.md`
**Need inheritance rules?** → `V_Visual_Inheritance.md`
**Need conflict resolution?** → `V_Visual_Reconciliation.md`
