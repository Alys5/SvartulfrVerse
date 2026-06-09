# SvartúlfrVerse Repository

## Purpose

Active canonical repository for SvartúlfrVerse worldbuilding and character data.

## Status

**Phase:** 16 — Repository Stabilization & Canon Lock
**Scope:** Contemporary + Only Human + Los Angeles Dynasty
**Canon Freeze:** v1.1 — ACTIVE

## Repository State

```text
Migration:          COMPLETE
Validation:         COMPLETE
Canon Freeze:       v1.1
Integrity Score:    100%
```

## Structure

```text
SvartulfrVerse/
├── core/           — Governance (7 ADRs, 8 policies, 5 specifications)
├── .trae/rules/    — Rules (10 rule files)
├── .trae/skills/   — Skills (11 skill modules)
├── database/       — Single Source of Truth
│   ├── assets/          6 utility files + 8 legacy images + 1 avatar + visual DNA
│   ├── canon_candidates/ Template + README
│   ├── characters/      12 records (all C_[Name]_[Surname] format)
│   ├── experiences/     README + template
│   ├── families/        4 records
│   ├── historical/      2 records
│   ├── institutions/    6 records
│   ├── locations/       8 records
│   ├── organizations/   1 record
│   └── worlds/          7 records
├── knowledge/      — Guidance docs (4 subdirectories)
│   ├── Engine_Logic/        3 files
│   ├── External_References/ 2 PDFs
│   ├── Guidelines/          8 files
│   └── Lore_Worldbuilding/  6 files
└── research/       — Research archive (1 file)
```

## Canon Summary

| Category | Count |
|----------|-------|
| Active Canon Characters | 12 |
| Active Canon NPCs | 2 (Echo, Scarlett) |
| Family Records | 4 |
| World/Visual Records | 7 |
| Institution Records | 6 |
| Location Records | 8 |
| Organization Records | 1 |
| Historical Records | 2 |
| ADRs | 7 (ADR-000 through ADR-007) |
| Legacy Templates | 8 (recovered, for Phase 18 Bot Framework) |

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

## Rejected Canon (16 entities — cannot re-enter)

- Valeria / Concubine / WetNess concept
- Miss Twin Peaks origin story
- KSA origin story
- Pack System / Werewolf Layer / Alpha-Omega Hierarchy
- Immortal Founder / Ancient Patriarch / 1200 BC Origin
- Supernatural systems of any kind
- Ghosts / Seiðr Active Practice / Runic Magic
- Vanguard PMC (replaced by DCC Security — BlackWolf)
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

Next: Phase 17 (Engine Architecture) → Phase 18 (Bot Framework) → Phase 19 (Production Bots)

---

**Repository Maintainer:** Canon Authority & Architecture
**Last Updated:** 2026-06-09
**Canon Freeze:** v1.1 — ACTIVE
