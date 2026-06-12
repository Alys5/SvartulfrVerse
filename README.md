# SvartúlfrVerse Repository

## Purpose

Active canonical repository for SvartúlfrVerse worldbuilding and character data.

## Status

**Phase:** 18 - Core Runtime Exports Published
**Scope:** Contemporary + Only Human + Los Angeles Dynasty
**Canon Freeze:** v1.0 - ACTIVE



## Published Runtime Exports

The following core runtime exports are officially published for JanitorAI production use:

| Export | Publication Role | Required Deployment Note |
|--------|------------------|--------------------------|
| `exports/En_Core.js` | Runtime behavior engine and state bus | Import as an Advanced Script engine. Subsequent modifications require a new publication procedure before production reuse. |
| `exports/W_Contemporary.js` | Contemporary Los Angeles World Authority lorebook | Import as a world lorebook. Subsequent modifications require a new publication procedure before production reuse. |
| `exports/F_DouglasBloodmoon.js` | Douglas-Bloodmoon Family Authority lorebook | Import as a family lorebook. Subsequent modifications require a new publication procedure before production reuse. |

Production rule: if any published export is changed after publication, the change must pass the full publication validation workflow again before it is considered active in production.

## Repository State

```text
Migration:          COMPLETE
Validation:         COMPLETE
Canon Freeze:       v1.0
Export Layer:       COMPLETE
Integrity Score:    94/100
```

## Structure

```text
SvartulfrVerse/
├── core/           - Governance (10 ADRs, specifications, certifications)
├── .trae/rules/    - Rules (11 rule files, R-000 to R-010)
├── .trae/skills/   - Skills (12 skill modules)
├── database/       - Single Source of Truth
│   ├── assets/          6 utility files + 8 legacy images + 1 avatar + visual DNA
│   ├── canon_candidates/ README
│   ├── characters/      14 records (all C_[Name]_[Surname] format)
│   ├── experiences/     1 deprecated record (Ex_DJFrequency)
│   ├── families/        4 records
│   ├── historical/      2 records
│   ├── institutions/    6 records + README
│   ├── locations/       8 records
│   └── worlds/          7 records
├── template/       - Centralized templates
│   ├── canon/           Canon candidate, family, institution, world templates
│   ├── character/       Character and persona templates
│   ├── engine/          Runtime helper templates and legacy engine templates
│   ├── experience/      Experience and initial-message templates
│   ├── system/          Bio, lorebook, and universal system templates
│   └── visual/          Visual prompt templates
├── exports/        - Runtime Export Layer
│   ├── En_Core.js             - Runtime behavior engine and state bus
│   ├── W_Contemporary.js      - World Authority baseline for contemporary LA
│   ├── F_DouglasBloodmoon.js  - Family Authority baseline for Douglas-Bloodmoon
│   ├── char/                  - Character lorebook exports (C_*.js)
│   └── Ex_*/                  - Experience folders (golden format, 7 files each)
│       ├── Ex_Malachia/       The Executive Successor - Ring + Autograph
│       ├── Ex_Noah/           The Velvet Glove - KSA Party
│       ├── Ex_Jasper/         DJ Frequency - Underground Rave (3 paths)
│       ├── Ex_Alyssa/         Little Moon - Sociology Project
│       ├── Ex_Erik/           The Tyrant - Football Game
│       ├── Ex_Logan/          The Cool Uncle - Bar + Beer
│       ├── Ex_Wulfnic/        The Ancient One - Journalist Interview
│       └── Ex_TwinXFamily/    TwinX Family publication package
├── knowledge/      - Guidance docs (4 subdirectories)
│   ├── Engine_Logic/        10 files
│   ├── External_References/ 2 PDFs
│   ├── Guidelines/          8 files
│   └── Lore_Worldbuilding/  6 files
├── engine/         - Engine documentation (9 files)
├── archive/        - Historical archive
│   ├── reports/       - Audit, recovery, transfer, and closure reports
│   └── research/      - Deprecated research residue, no active files
└── deferred/       - Deferred content (read-only, non-canon)
```

## Canon Summary

| Category | Count |
|----------|-------|
| Active Canon Characters | 12 (14 records inc. Nixara + Edric) |
| Active Canon NPCs | 2 (Echo, Scarlett) |
| Family Records | 4 |
| World/Visual Records | 9 |
| Institution Records | 7 |
| Location Records | 8 |
| Historical Records | 2 |
| Export JS Files | 23 (3 core + 12 char + 8 Ex) |
| Export Experience Folders | 8 (golden format, 7 files each) |
| ADRs | 10 (ADR-000 through ADR-009) |
| Rules | 11 (R-000 through R-010) |

## Canon Recovery Workflow

All content follows:

**Research** → **Evidence Collection** → **Audit** → **Architecture Review** → **Authority Decision** → **Integration**

## Canon Layer Architecture (ADR-006)

| Layer | Description |
|-------|-------------|
| Active Canon | Runtime-eligible, governance-enforced |
| Historical Canon | Documented facts, verifiable records |
| Cultural Canon | Family traditions, oral history, myths |
| Deferred Canon | Valid entities, not currently active |
| Candidate Canon | Proposed material, not yet approved |

## Rejected Canon (16 entities - cannot re-enter)

- Valeria / Concubine / WetNess concept
- Miss Twin Peaks origin story
- KSA origin story
- Pack System / Werewolf Layer / Alpha-Omega Hierarchy
- Immortal Founder / Ancient Patriarch / 1200 BC Origin
- Supernatural systems of any kind
- Ghosts / Seiðr Active Practice / Runic Magic
- Vanguard PMC (replaced by DCC Security - BlackWolf)
- Echo as AI drone sphere (downgraded to LLM AI software)
- Scarlett as full character (demoted to background NPC)
- Chloe Douglas-Bloodmoon, Liam Douglas-Bloodmoon (not canon)
- Wulfnic "Bloodmoon-Douglas" surname (canonical: "Bloodmoon" only)
- Edric as Malachia's son (canonical: Edric is Logan's son)
- Political Wives (Sigrid, Dagmar)
- Extended Lines (Gunnar, Ingrid, etc.)

## Recovered Archive (Phase 15.5)

Legacy content from `legacy_exports/` analyzed. Recovered:

- 8 bot/character/scenario templates → reference for Phase 18 Bot Framework
- Diegetic comms formatting framework → reference for Phase 18
- Bio HTML template → reference for Phase 19 bot creation
- Environmental Modifiers (Visual DNA) → `database/assets/visual_dna_contemporary.md`

Next: Lorebook Production (HC-001 Douglas-Bloodmoon Dynasty) → Validation Engine → Export Validator JanitorAI

---

**Repository Maintainer:** Canon Authority & Architecture
**Last Updated:** 2026-06-12
**Canon Freeze:** v1.0 - ACTIVE
