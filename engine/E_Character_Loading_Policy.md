# E-17.3: Character Loading Policy

**Status:** DRAFT
**Date:** 2026-06-09
**Authority:** Engine Authority (R-007)
**Depends on:** E_Runtime_Architecture, E_Retrieval_Architecture

---

## Purpose

Define the **Character Package** for each canonical character — the exact set of records that must be loaded, conditionally loaded, or never auto-loaded when that character is the active bot.

> **Scope:** These packages apply to **CHARACTER ENTRY** mode (ADR-008). Location, Institution, and Scenario entry modes use different loading profiles (see E_Retrieval_Architecture.md Phase 0).

This document directly feeds into bot template generation (Phase 18).

---

## Package Structure

Each character package has three tiers:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CHARACTER PACKAGE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ALWAYS LOAD (Hard + Soft core)                                 │
│  ├── Character record                                           │
│  ├── Family record(s)                                           │
│  ├── World record                                               │
│  ├── Visual baseline                                            │
│  └── Visual inheritance                                         │
│                                                                 │
│  CONDITIONAL LOAD (context-triggered)                           │
│  ├── Primary location(s)                                        │
│  ├── Secondary location(s)                                      │
│  ├── Institution(s)                                             │
│  ├── Organization(s)                                            │
│  ├── Experience(s)                                              │
│  └── Key NPCs                                                   │
│                                                                 │
│  NEVER AUTO-LOAD (manual only)                                  │
│  ├── Unrelated institutions                                     │
│  ├── Unrelated experiences                                      │
│  ├── Historical records                                         │
│  └── Full records for distant characters                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Character Packages

### Wulfnic Bloodmoon

```
ALWAYS LOAD:
├── C_Wulfnic_Bloodmoon.md
├── F_Douglas_Bloodmoon.md
├── F_Parent_Child.md
├── F_Marriages.md
├── W_Contemporary.md
├── V_Visual_Baseline.md
└── V_Visual_Inheritance.md

CONDITIONAL LOAD:
├── L_DouglasEstate.md          ← "Estate", "home", "Seven Hills"
├── L_SevenHills.md             ← "Seven Hills", "ancestral"
├── I_DCC_Security_BlackWolf.md ← "security", "PMC"
├── C_Erik_Douglas.md           ← "Erik", "son-in-law"
├── C_Nixara_Bloodmoon.md       ← "Nixara", "wife" (deceased)
├── C_Logan_Douglas.md          ← "Logan", "nephew"
├── C_Edric_Douglas.md          ← "Edric", "grandnephew"
└── HC_Edric_Aettfadir_Svartulfa.md ← "heritage", "origin", "Svartúlfr"

NEVER AUTO-LOAD:
├── I_AngelAndCo.md
├── I_UCLA.md
├── O_KappaSigmaAlpha.md
├── Ex_DJFrequency.md
└── L_VerveLounge.md
```

### Nixara Bloodmoon

```
ALWAYS LOAD:
├── C_Nixara_Bloodmoon.md
├── F_Douglas_Bloodmoon.md
├── F_Parent_Child.md
├── F_Marriages.md
├── W_Contemporary.md
├── V_Visual_Baseline.md
└── V_Visual_Inheritance.md

CONDITIONAL LOAD:
├── L_DouglasEstate.md          ← "Estate", "home"
├── C_Wulfnic_Bloodmoon.md      ← "Wulfnic", "husband"
├── C_Erik_Douglas.md           ← "Erik", "son"
├── C_Alyssa_Douglas_Bloodmoon.md ← "Alyssa", "granddaughter"
├── C_Jasper_Douglas_Bloodmoon.md ← "Jasper", "grandson"
└── I_DCC_Security_BlackWolf.md ← "security"

NEVER AUTO-LOAD:
├── I_AngelAndCo.md
├── I_UCLA.md
├── O_KappaSigmaAlpha.md
├── Ex_DJFrequency.md
└── L_VerveLounge.md
```

### Erik Douglas

```
ALWAYS LOAD:
├── C_Erik_Douglas.md
├── F_Douglas_Bloodmoon.md
├── F_Parent_Child.md
├── F_Marriages.md
├── W_Contemporary.md
├── V_Visual_Baseline.md
└── V_Visual_Inheritance.md

CONDITIONAL LOAD:
├── L_DouglasEstate.md          ← "Estate", "home"
├── L_RoseBowl.md               ← "Rose Bowl", "football", "Bruins"
├── I_DCC_Security_BlackWolf.md ← "DCC", "security", "PMC"
├── I_UCLA.md                   ← "UCLA", "university"
├── C_Nixara_Bloodmoon.md       ← "Nixara", "wife" (deceased)
├── C_Malachia_Douglas_Bloodmoon.md ← "Malachia", "son"
├── C_Noah_Douglas_Bloodmoon.md ← "Noah", "son"
├── C_Jasper_Douglas_Bloodmoon.md ← "Jasper", "son"
├── C_Alyssa_Douglas_Bloodmoon.md ← "Alyssa", "daughter"
├── C_Logan_Douglas.md          ← "Logan", "brother"
├── C_Wulfnic_Bloodmoon.md      ← "Wulfnic", "father-in-law"
└── HC_Douglas_Commercial_Lineage.md ← "lineage", "history", "1666"

NEVER AUTO-LOAD:
├── I_AngelAndCo.md
├── O_KappaSigmaAlpha.md
├── Ex_DJFrequency.md
└── L_VerveLounge.md
```

### Logan Douglas

```
ALWAYS LOAD:
├── C_Logan_Douglas.md
├── F_Douglas_Bloodmoon.md
├── F_Parent_Child.md
├── F_Marriages.md
├── W_Contemporary.md
├── V_Visual_Baseline.md
└── V_Visual_Inheritance.md

CONDITIONAL LOAD:
├── L_VerveLounge.md            ← "Verve", "bar", "Arts District"
├── L_DouglasCustoms.md         ← "garage", "workshop", "customs"
├── L_DouglasEstate.md          ← "Estate", "family"
├── O_KappaSigmaAlpha.md        ← "KSA", "fraternity"
├── I_UCLA_GreekLife.md         ← "Greek Life", "rush"
├── I_UCLA.md                   ← "UCLA"
├── C_Erik_Douglas.md           ← "Erik", "brother"
├── C_Edric_Douglas.md          ← "Edric", "son"
├── C_Wulfnic_Bloodmoon.md      ← "Wulfnic", "uncle"
└── C_Alyssa_Douglas_Bloodmoon.md ← "Alyssa", "grandniece"

NEVER AUTO-LOAD:
├── I_AngelAndCo.md
├── Ex_DJFrequency.md
├── L_RoseBowl.md
└── I_DCC_Security_BlackWolf.md
```

### Malachia Douglas-Bloodmoon

```
ALWAYS LOAD:
├── C_Malachia_Douglas_Bloodmoon.md
├── F_Douglas_Bloodmoon.md
├── F_Parent_Child.md
├── F_Marriages.md
├── W_Contemporary.md
├── V_Visual_Baseline.md
└── V_Visual_Inheritance.md

CONDITIONAL LOAD:
├── L_DouglasEstate.md          ← "Estate", "home"
├── L_UCLACampus.md             ← "UCLA", "campus", "class"
├── L_RoseBowl.md               ← "Rose Bowl", "athletics"
├── I_UCLA.md                   ← "UCLA", "university"
├── I_DCC_Security_BlackWolf.md ← "security", "PMC"
├── C_Erik_Douglas.md           ← "Erik", "father"
├── C_Noah_Douglas_Bloodmoon.md ← "Noah", "brother"
├── C_Jasper_Douglas_Bloodmoon.md ← "Jasper", "brother"
├── C_Alyssa_Douglas_Bloodmoon.md ← "Alyssa", "sister"
├── C_Logan_Douglas.md          ← "Logan", "uncle"
└── C_Wulfnic_Bloodmoon.md      ← "Wulfnic", "grandfather"

NEVER AUTO-LOAD:
├── I_AngelAndCo.md
├── O_KappaSigmaAlpha.md
├── Ex_DJFrequency.md
└── L_VerveLounge.md
```

### Noah Douglas-Bloodmoon

```
ALWAYS LOAD:
├── C_Noah_Douglas_Bloodmoon.md
├── F_Douglas_Bloodmoon.md
├── F_Parent_Child.md
├── F_Marriages.md
├── W_Contemporary.md
├── V_Visual_Baseline.md
└── V_Visual_Inheritance.md

CONDITIONAL LOAD:
├── L_DouglasEstate.md          ← "Estate", "home"
├── L_UCLACampus.md             ← "UCLA", "campus", "class"
├── I_UCLA.md                   ← "UCLA", "university"
├── I_UCLA_USAC.md              ← "student government", "USAC"
├── O_KappaSigmaAlpha.md        ← "KSA", "fraternity"
├── I_UCLA_GreekLife.md         ← "Greek Life"
├── C_Erik_Douglas.md           ← "Erik", "father"
├── C_Malachia_Douglas_Bloodmoon.md ← "Malachia", "brother"
├── C_Jasper_Douglas_Bloodmoon.md ← "Jasper", "brother"
├── C_Alyssa_Douglas_Bloodmoon.md ← "Alyssa", "sister"
├── C_Logan_Douglas.md          ← "Logan", "uncle"
└── C_Wulfnic_Bloodmoon.md      ← "Wulfnic", "grandfather"

NEVER AUTO-LOAD:
├── I_AngelAndCo.md
├── Ex_DJFrequency.md
├── L_VerveLounge.md
└── L_RoseBowl.md
```

### Jasper Douglas-Bloodmoon

```
ALWAYS LOAD:
├── C_Jasper_Douglas_Bloodmoon.md
├── F_Douglas_Bloodmoon.md
├── F_Parent_Child.md
├── F_Marriages.md
├── W_Contemporary.md
├── V_Visual_Baseline.md
└── V_Visual_Inheritance.md

CONDITIONAL LOAD:
├── L_UCLACampus.md             ← "UCLA", "campus", "class"
├── L_VerveLounge.md            ← "Verve", "bar"
├── L_DouglasEstate.md          ← "Estate", "family"
├── I_UCLA.md                   ← "UCLA"
├── I_UCLA_GreekLife.md         ← "Greek Life", "KSA" (Legacy Eligible)
├── Ex_DJFrequency.md           ← "DJ", "underground", "set", "rooftop"
├── C_Alyssa_Douglas_Bloodmoon.md ← "Alyssa", "twin"
├── C_Erik_Douglas.md           ← "Erik", "father"
├── C_Malachia_Douglas_Bloodmoon.md ← "Malachia", "brother"
├── C_Noah_Douglas_Bloodmoon.md ← "Noah", "brother"
├── C_Logan_Douglas.md          ← "Logan", "uncle"
└── C_Wulfnic_Bloodmoon.md      ← "Wulfnic", "grandfather"

NEVER AUTO-LOAD:
├── I_AngelAndCo.md
├── O_KappaSigmaAlpha.md
├── L_RoseBowl.md
└── I_DCC_Security_BlackWolf.md
```

### Alyssa Douglas-Bloodmoon

```
ALWAYS LOAD:
├── C_Alyssa_Douglas_Bloodmoon.md
├── F_Douglas_Bloodmoon.md
├── F_Parent_Child.md
├── F_Marriages.md
├── W_Contemporary.md
├── V_Visual_Baseline.md
└── V_Visual_Inheritance.md

CONDITIONAL LOAD:
├── L_UCLACampus.md             ← "UCLA", "campus", "class"
├── L_VerveLounge.md            ← "Verve", "bar"
├── L_DouglasEstate.md          ← "Estate", "family"
├── I_UCLA.md                   ← "UCLA"
├── I_AngelAndCo.md             ← "Angel & Co", "photoshoot", "studio"
├── C_Jasper_Douglas_Bloodmoon.md ← "Jasper", "twin"
├── C_Angel_Moreno.md           ← "Angel", "patron"
├── C_Marcus_Thornfield.md      ← "Marcus", "protection"
├── C_Erik_Douglas.md           ← "Erik", "father"
├── C_Malachia_Douglas_Bloodmoon.md ← "Malachia", "brother"
├── C_Noah_Douglas_Bloodmoon.md ← "Noah", "brother"
├── C_Logan_Douglas.md          ← "Logan", "uncle"
└── C_Wulfnic_Bloodmoon.md      ← "Wulfnic", "grandfather"

NEVER AUTO-LOAD:
├── O_KappaSigmaAlpha.md
├── Ex_DJFrequency.md
├── L_RoseBowl.md
└── I_DCC_Security_BloodWolf.md
```

### Edric Douglas

```
ALWAYS LOAD:
├── C_Edric_Douglas.md
├── F_Douglas_Bloodmoon.md
├── F_Parent_Child.md
├── W_Contemporary.md
├── V_Visual_Baseline.md
└── V_Visual_Inheritance.md

CONDITIONAL LOAD:
├── L_VerveLounge.md            ← "Verve", "bar"
├── L_DouglasEstate.md          ← "Estate", "family"
├── L_DouglasCustoms.md         ← "garage", "customs"
├── O_KappaSigmaAlpha.md        ← "KSA", "fraternity"
├── I_UCLA_GreekLife.md         ← "Greek Life"
├── C_Logan_Douglas.md          ← "Logan", "father"
├── C_Erik_Douglas.md           ← "Erik", "uncle"
└── C_Wulfnic_Bloodmoon.md      ← "Wulfnic", "great-uncle"

NEVER AUTO-LOAD:
├── I_AngelAndCo.md
├── Ex_DJFrequency.md
├── L_RoseBowl.md
└── I_DCC_Security_BlackWolf.md
```

### Angel Moreno

```
ALWAYS LOAD:
├── C_Angel_Moreno.md
├── W_Contemporary.md
└── V_Visual_Baseline.md

CONDITIONAL LOAD:
├── I_AngelAndCo.md             ← "studio", "work", "photoshoot"
├── C_Alyssa_Douglas_Bloodmoon.md ← "Alyssa", "model"
└── L_VerveLounge.md            ← "Verve", "social"

NEVER AUTO-LOAD:
├── F_Douglas_Bloodmoon.md      ← Not a dynasty member
├── O_KappaSigmaAlpha.md
├── Ex_DJFrequency.md
├── I_DCC_Security_BlackWolf.md
└── L_RoseBowl.md
```

### Marcus Thornfield

```
ALWAYS LOAD:
├── C_Marcus_Thornfield.md
├── W_Contemporary.md
└── V_Visual_Baseline.md

CONDITIONAL LOAD:
├── I_DCC_Security_BlackWolf.md ← "DCC", "security", "Black Wolf"
├── L_DouglasEstate.md          ← "Estate", "protection detail"
├── C_Alyssa_Douglas_Bloodmoon.md ← "Alyssa", "protectee"
├── C_Erik_Douglas.md           ← "Erik", "employer"
└── C_Kaladin_Nargathon.md      ← "Kaladin", "colleague"

NEVER AUTO-LOAD:
├── F_Douglas_Bloodmoon.md      ← Not a dynasty member
├── I_AngelAndCo.md
├── O_KappaSigmaAlpha.md
├── Ex_DJFrequency.md
└── L_VerveLounge.md
```

### Kaladin Nargathon

```
ALWAYS LOAD:
├── C_Kaladin_Nargathon.md
├── W_Contemporary.md
└── V_Visual_Baseline.md

CONDITIONAL LOAD:
├── I_DCC_Security_BlackWolf.md ← "DCC", "security", "Black Wolf"
├── L_DouglasEstate.md          ← "Estate", "operations"
├── L_SevenHills.md             ← "Seven Hills", "training"
├── C_Erik_Douglas.md           ← "Erik", "employer"
└── C_Marcus_Thornfield.md      ← "Marcus", "colleague"

NEVER AUTO-LOAD:
├── F_Douglas_Bloodmoon.md      ← Not a dynasty member
├── I_AngelAndCo.md
├── O_KappaSigmaAlpha.md
├── Ex_DJFrequency.md
└── L_VerveLounge.md
```

---

## Package Summary Matrix

| Character | Always | Conditional | Never |
|-----------|--------|-------------|-------|
| Wulfnic | 7 | 8 | 5 |
| Nixara | 7 | 6 | 5 |
| Erik | 7 | 11 | 4 |
| Logan | 7 | 9 | 4 |
| Malachia | 7 | 10 | 4 |
| Noah | 7 | 10 | 4 |
| Jasper | 7 | 11 | 4 |
| Alyssa | 7 | 12 | 4 |
| Edric | 6 | 8 | 5 |
| Angel | 3 | 3 | 6 |
| Marcus | 3 | 5 | 6 |
| Kaladin | 3 | 5 | 6 |

---

## Authority

**Established by:** Engine Architecture Review
**Date:** 2026-06-09
**Version:** v1.0 (DRAFT)
