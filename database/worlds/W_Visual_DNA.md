# Visual DNA — Database Record

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | d:\Progetti\database\assets\Visual_DNA.md |
| Authority | Visual Authority |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Purpose

This document serves as the master reference for the SvartúlfrVerse visual identity.

---

## Inheritance Model

All image generation must compile the following tiers in order:

1. Global Visual DNA
2. World Visual DNA
3. Overlay Visual DNA (if applicable)
4. Character Identity Anchors

---

## Global Aesthetic Profile

| Element | Value |
|---------|-------|
| Lighting | Warm cinematic lighting, Rembrandt lighting, deep shadows |
| Palette | Amber, gold, deep obsidian, rich mahogany, slate grey |
| Style | Painterly realism, luxury visual storytelling, semi-realistic character rendering |
| Vibe | Decadent, imposing, ancient power meeting modern luxury |

---

## Character Identity Anchors

### Alyssa Douglas

**Always:**
- Caramel-brown, tailbone-length straight silky hair
- Mint green, large doe eyes
- 165cm, petite hourglass figure
- Dark angel/decadent muse aesthetic (corsets, ripped jeans, oversized flannel)

**Never:**
- Blonde or brightly colored hair
- Corporate suits or stiff formalwear
- Generic high-school/anime uniform aesthetic

---

### Erik Douglas

**Always:**
- Black hair streaked with silver/grey, slicked back
- Amber eyes, cold and unyielding
- 205cm, massive muscular build, weathered skin
- Corporate monarch aesthetic, bespoke power suits, luxury executive environments

**Never:**
- Long white hair
- Ancient king aesthetic
- Nordic patriarch styling or fur robes
- T-shirts or casual wear

---

### Jasper Douglas

**Always:**
- Caramel-brown, perpetually messy hair
- Mint green, large expressive eyes
- 191cm, lean athletic build
- Hypebeast streetwear, tech-wear, oversized graphic hoodies, headphones

**Never:**
- Slicked-back corporate hair
- Business suits (unless explicitly forced by narrative)
- Ancient/fantasy robes

---

### Logan Douglas

**Always:**
- Dark brown, messy medium-length hair
- Hazel, warm eyes
- 198cm, broad muscular build, grease-stained
- Greasy overalls, flannels, worn denim, work boots

**Never:**
- Clean-cut corporate styling
- High-fashion streetwear
- Aristocratic elegance

---

### Malachia Douglas

**Always:**
- Black, short military cut hair
- Amber, steady eyes
- 210cm, tank-like scarred physique
- Tactical gear, heavy coats, military-grade armor, utilitarian black

**Never:**
- Bright colors or patterns
- Elegant tailoring or silk
- Delicate or slender framing

---

### Noah Douglas

**Always:**
- Blonde, immaculately styled hair
- Blue, piercing eyes
- 196cm, lithe elegant swimmer's physique
- Bespoke 3-piece suits, silk ties, cashmere overcoats, flawless polish

**Never:**
- Messy, unkempt hair
- Casual streetwear or tactical gear
- Dirt, grease, or rugged aesthetics

---

### Wulfnic Bloodmoon

**⚠️ HISTORICAL VARIANT — See Reconciliation Note**

**Always (Historical):**
- Silver-white hair, long and braided with silver
- Silver-white eyes, glowing faintly in low light
- 195cm, lean but impossibly strong, ancient skin
- Ancestral nobility, ancient patriarch aesthetic, old-world aristocratic environments, heavy furs

**Never:**
- CEO aesthetic
- Executive skyscrapers or corporate boardrooms
- Modern streetwear or tactical gear

**Canonical Resolution:**
> Per Visual Authority (ADR-004), the canonical Bloodmoon phenotype is **Blonde hair, Blue eyes**.
> See [Visual_Canon_Reconciliation.md](./Visual_Canon_Reconciliation.md) for full documentation.
> This entry preserved as historical variant for reference only.

---

## Visual Pipeline

```text
Reference Library
↓
Moodboards
↓
Visual DNA
↓
Prompt Generation
↓
ComfyUI
↓
Asset Library
```

---

## Validation Rules

Reject:
- Generic Anime
- Generic Photorealism
- Identity Drift
- Palette Drift
- Inconsistent Character Design

---

## Character Priority Rule

Character Identity Anchors always override:
- World DNA
- Overlay DNA
- Prompt Stylization

Identity must remain stable.

---

## ComfyUI Standard

All generation pipelines should:

1. Start from Visual DNA
2. Use World DNA
3. Apply Character Anchors
4. Maintain palette consistency
5. Maintain lighting consistency

Visual consistency is considered part of canon.

---

## Authority

Established by: Visual Authority Layer
Record custodian: Visual Authority Layer
Last validated: 2026-06-07
Migrated: 2026-06-08
