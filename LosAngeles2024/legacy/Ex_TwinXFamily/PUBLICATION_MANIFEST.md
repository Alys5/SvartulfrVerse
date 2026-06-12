# Publication Manifest - Ex_TwinXFamily

## Publication Status

- Status: READY FOR PUBLICATION
- Published On: 2026-06-12
- Canon Freeze: v1.0 ACTIVE
- Experience: TwinX Family
- Primary Package: `exports/Ex_TwinXFamily`
- Runtime Mode: JanitorAI Advanced Script plus export package assets

## Package Inventory

| File | Status | Purpose |
|------|--------|---------|
| `Ex_TwinXFamily.js` | Optimized | Consolidated runtime activation logic for the TwinX Family experience |
| `Metadata.md` | Updated | Export metadata, conventions, and compliance checklist |
| `Personality.md` | Verified | Active NPC and dynamic twin-slot profiles |
| `Scenario.md` | Verified | Twin resolution authority, timeline, setting, and runtime contract |
| `bio.html` | Verified | JanitorAI bot card HTML with normalized external links |
| `Initial_messages_1.md` | Verified | First Day at UCLA starter |
| `Initial_messages_2.md` | Verified | Sunday Lunch at the Estate starter |
| `Initial_messages_3.md` | Verified | Mall Escape with Logan and Edric starter |
| `Initial_messages_4.md` | Verified | Malachia's Underground Boxing Match starter |
| `Initial_messages_5.md` | Verified | Wulfnic's Greenhouse starter |
| `User_Persona_Alyssa.md` | Verified | Alyssa user persona dependency |
| `User_Persona_Jasper.md` | Verified | Jasper user persona dependency |
| `User_Persona_They.md` | Verified | Non-binary custom user persona reference |
| `PUBLICATION_MANIFEST.md` | Created | Publication record and deployment checklist |

## Required Character Context

Character profiles for the TwinX Family experience are embedded in the centralized dynamic family hub. Do not attach separate C_*.js exports.

| File | Role |
|------|------|
| `exports/F_DouglasBloodmoon.js` | Centralized family, historical, and keyword-gated character context for Erik, Malachia, Noah, Wulfnic, Logan, Jasper, and Alyssa |

## Support Reference Character Context

Support references are embedded in the centralized dynamic family hub. Do not attach separate C_*.js exports.

| File | Reference Role |
|------|----------------|
| `exports/F_DouglasBloodmoon.js` | Nixara, Marcus, Angel, and Edric support context through keyword-gated embedded character entries |

## Dependency Notes

- External JanitorAI character links were normalized to the JanitorAI characters directory to avoid invalid bracket placeholders during loading.
- JanitorAI media-approved image URLs remain external web dependencies.
- Character context paths are centralized in `exports/F_DouglasBloodmoon.js`; separate C_*.js exports are not active production artifacts.
- No unresolved local file paths remain in the package.

## Validation Summary

| Check | Result |
|-------|--------|
| Package file inventory | PASS |
| JavaScript syntax | PASS |
| R-010 punctuation scan | PASS |
| Debug block removal | PASS |
| Placeholder URL cleanup | PASS |
| Required character context | PASS |
| Support reference character context | PASS |

## Publication Rule

Any later change to this package or to the centralized family hub requires a new publication validation cycle before production reuse.
