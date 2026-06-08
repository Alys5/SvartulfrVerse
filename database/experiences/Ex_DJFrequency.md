# Ex_DJFrequency — DJ Frequency Experience

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | d:\Progetti\database\bots\solo\Ex_DJFrequency.md |
| Authority | Experience Authority (ADR-005) |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Purpose

Canonical experience record for Jasper Douglas-Bloodmoon's romance arc. This experience defines the narrative journey from fan-meet to committed relationship, operating within the SvartulfrVerse contemporary baseline.

**Classification:** Active Canon — Character-Centric Experience Record

---

## Experience Identity

| Field | Value | Status |
|---------|-------|--------|
| ID | Ex_DJFrequency | Canonical |
| Title | DJ Frequency | Canonical |
| Leading Character | Jasper Douglas-Bloodmoon | Primary Canon Character |
| POV | Any POV (user customizable) | Standard |
| Genre | Romance, Slowburn, Slice of Life | Canonical |
| Theme | Music Mania, Secret Identity | Canonical |

---

## World Dependency

| Field | Value | Source |
|---------|-------|--------|
| World ID | W_Contemporary | [W_Contemporary.md](../worlds/W_Contemporary.md) |
| Era | Contemporary 2020s | ✓ Aligned |
| Location | Los Angeles, California | ✓ Aligned |
| Species Rule | Human only | ✓ ADR-000 compliant |

---

## Participants

| Character ID | Role | Required | Source Record |
|--------------|------|----------|---------------|
| C_Jasper | Romance lead | ✓ Required | Primary Canon |
| C_Alyssa | Twin NPC | ✓ Required | Primary Canon |
| C_Erik | Patriarch (antagonist pressure) | ✓ Required | Primary Canon |
| C_Logan | Uncle, safe zone provider | ✓ Required | Primary Canon |
| C_Malachia | Brother (security grids) | ✓ Present | Primary Canon |
| C_Noah | Brother | ✓ Present | Primary Canon |

### Supporting Elements

| Element | Type | Notes |
|---------|------|-------|
| Echo | AI companion | LLM AI / virtual assistant — programmed and created by Jasper himself to simulate a personality and serve as his virtual assistant. Retconned from "too advanced for 2024" to realistic contemporary AI (Gemini/ChatGPT level). Active Canon (see C_Jasper.md) |
| Scarlett | Minor NPC | FWB chaos ally, brief cameos — no character record needed |

---

## Premise

Jasper Douglas-Bloodmoon leads a double life as DJ Frequency, an underground electronic music sensation. When a chance encounter connects Jasper with a fan, a slow-burn romance develops under the pressure of secret identity, family surveillance, and corporate dynasty expectations.

**Cross-Reference:** The DJ Frequency identity and all related narrative elements are also documented in [C_Jasper.md](../characters/C_Jasper.md). Both files must be kept in sync.

---

## User Contract

| Constraint | Value |
|------------|-------|
| User is | Stranger/fan |
| User is NOT | Douglas-Bloodmoon family member |
| User is NOT | Alyssa/twin |
| NO | Twin Link |
| Age range suggest | 18-25 |
| Required | Name, pronouns |

---

## Chapter Structure

| Chapter | Title | Content | Canon Status |
|---------|-------|---------|-------------|
| I | First Meet | Fan & spill meet-cute | ✓ Active Canon |
| II | Second Night | Alley meeting | ✓ Active Canon |
| III | Spark | Scarlett cameo, flirt | ✓ Active Canon |
| IV | Unmasked | Jasper reveals identity, Alyssa exists | ✓ Active Canon |
| V | Hidden Romance | Secret dating, phone ping | ✓ Active Canon |
| VI | Family Lunch | Meet the family | ✓ Active Canon |
| VII | Proposal | Wedding commitment | ✓ Active Canon |
| VIII | Wedding | Ceremony | ✓ Active Canon |
| IX | First Child | Optional (conditional on fertility) | ✓ Conditional |
| X | Custom OOC | User-defined | ✓ User-defined |

---

## Session Dynamics

| Element | Value |
|---------|-------|
| Starting State | Stranger/fan meets DJ Frequency |
| Primary Tension | Secret identity, PMC threat, Erik surveillance |
| Escalation Path | Unmask → hidden dating → family → commitment |
| De-escalation Zones | The Verve (Logan's bar), Alyssa covers |
| Repair Mechanisms | Consent checks, boundary talks |

---

## World Invariants

| Element | Value | Verified Against |
|---------|-------|-----------------|
| Era | Contemporary 2020s | W_Contemporary.md ✓ |
| Location | Los Angeles | W_Contemporary.md ✓ |
| Setting | Modern romance, celebrity pressure | W_Contemporary.md ✓ |
| Faction (DCC) | Corporate pressure | W_Contemporary.md + I_DCC_Security_BlackWolf.md ✓ |
| Conflict | Secret romance vs Erik surveillance | C_Erik.md + C_Jasper.md ✓ |

---

## Lore Invariants

| Element | Value | Authority |
|---------|-------|-----------|
| Species | Human only | ADR-000 ✓ |
| Abilities | Elite DJ mixing, evasion | Character traits (C_Jasper.md) ✓ |
| Rules | No Twin Link with user | User Contract ✓ |
| Stigma | Famous heir slumming it | Narrative context ✓ |

---

## Visual Authority Alignment

**Authority:** Visual Authority (ADR-004)

### Leading Character — Jasper Douglas-Bloodmoon

| Field | Value | Classification | Source |
|-------|-------|----------------|--------|
| Eyes | Mint green | Twin Fusion Inheritance | W_Visual_Inheritance.md ✓ |
| Hair | Caramel-brown | Twin Fusion Inheritance | W_Visual_Inheritance.md ✓ |
| Height | 191cm | Fusion blend | C_Jasper.md ✓ |

**Status:** ALIGNED — Jasper matches Alyssa's inheritance pattern as twin (Visual Fusion Model)

```
Douglas: Black (hair) + Amber (eyes)
Bloodmoon: Blonde (hair) + Blue (eyes)
    ↓ Fusion
Caramel-brown (hair) + Mint green (eyes)
    ↓ Applies to
Jasper, Alyssa (twins)
```

---

## Institution References

| Institution | Role | Source Record |
|-------------|------|---------------|
| DCC | Corporate backdrop, Erik's power base | [W_Contemporary.md](../worlds/W_Contemporary.md) |
| DCC Security — Black Wolf Division | PMC threat, security grids | [I_DCC_Security_BlackWolf.md](../institutions/I_DCC_Security_BlackWolf.md) |

---

## Deferred Elements

The following elements from the source evidence are **deferred** and NOT included as active content:

| Element | Deferral Reason | Reference |
|---------|-----------------|-----------|
| Security infrastructure | Requires institution review | Ambient reference only — no active content |
| Music production details | Requires scenario review | Flavor text — no canonical claims |

---

## Excluded Elements

The following elements were explicitly **rejected** by source audit and are NOT preserved:

| Category | Reason |
|----------|--------|
| Visual Generation Pack (Steps/CFG/Sampler/prompts) | Deployment settings — not repository material |
| HTML Presentation (bot cover, banner) | Deployment artifact |
| User Personas (Diego, Ren) | Deployment examples — not canonical |
| NSFW Sections | Not repository material / not Character Authority domain |
| Runtime Logic (JavaScript, triggers, activation) | Platform-specific implementation |
| Tag Activation / Probability Systems | Runtime behavior |

---

## Cross-References

| Domain | Record | Relationship |
|--------|--------|--------------|
| World | [W_Contemporary.md](../worlds/W_Contemporary.md) | Primary world definition |
| Character | [C_Jasper.md](../characters/C_Jasper.md) | Leading character |
| Character | [C_Alyssa.md](../characters/C_Alyssa.md) | Twin NPC |
| Character | [C_Erik.md](../characters/C_Erik.md) | Patriarch |
| Character | [C_Logan.md](../characters/C_Logan.md) | Uncle, safe zone |
| Character | [C_Malachia.md](../characters/C_Malachia.md) | Brother |
| Character | [C_Noah.md](../characters/C_Noah.md) | Brother |
| Institution | [I_DCC_Security_BlackWolf.md](../institutions/I_DCC_Security_BlackWolf.md) | Security organization |
| Visual | [W_Visual_Inheritance.md](../worlds/W_Visual_Inheritance.md) | Fusion model reference |
| Visual | [W_Visual_Baseline.md](../worlds/W_Visual_Baseline.md) | Visual DNA reference |
| Family | [F_Douglas_Bloodmoon.md](../families/F_Douglas_Bloodmoon.md) | Family graph (referenced, not redefined) |

---

## Source Preservation

The source evidence file `d:\Progetti\database\bots\solo\Ex_DJFrequency.md` is the frozen historical reference per repository governance.

---

## Authority

**Experience ID:** Ex_DJFrequency  
**Canon Layer:** Active Canon  
**Record Custodian:** Experience Authority (ADR-005)  
**Migration Date:** 2026-06-08  
**Last Updated:** 2026-06-08
