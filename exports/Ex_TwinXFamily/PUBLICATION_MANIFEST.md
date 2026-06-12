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
| `Initial_messages_1.md` | Verified | Full family starter |
| `Initial_messages_2.md` | Verified | Malachia starter |
| `Initial_messages_3.md` | Verified | Noah starter |
| `Initial_messages_4.md` | Verified | Erik starter |
| `Initial_messages_5.md` | Verified | Wulfnic starter |
| `Initial_messages_6.md` | Verified | Logan starter |
| `Initial_messages_7.md` | Verified | Twins-only starter |
| `User_Persona_Alyssa.md` | Verified | Alyssa user persona dependency |
| `User_Persona_Jasper.md` | Verified | Jasper user persona dependency |
| `User_Persona_They.md` | Verified | Non-binary custom user persona reference |
| `PUBLICATION_MANIFEST.md` | Created | Publication record and deployment checklist |

## Required Character Lorebook Attachments

Attach these character lorebooks to the bot when publishing the TwinX Family experience:

| File | Role |
|------|------|
| `exports/char/C_Erik.js` | Patriarch and primary authority |
| `exports/char/C_Malachia.js` | Eldest son and physical protector |
| `exports/char/C_Noah.js` | Legal and diplomatic protector |
| `exports/char/C_Wulfnic.js` | Bloodmoon patriarch and cultural anchor |
| `exports/char/C_Logan.js` | Uncle and safe-haven operator |
| `exports/char/C_Jasper.js` | Male twin, DJ, engineer, hacker |
| `exports/char/C_Alyssa.js` | Female twin, pre-med student, art model |

## Support Reference Character Lorebooks

These are not the active NPC cast, but they are referenced by the experience package and should remain available as support context:

| File | Reference Role |
|------|----------------|
| `exports/char/C_Nixara.js` | Historical mother of the twins and central family grief anchor |
| `exports/char/C_Marcus.js` | Alyssa security/bodyguard reference |
| `exports/char/C_Angel.js` | Alyssa mentor and art-world reference |

## Dependency Notes

- External JanitorAI character links were normalized to the JanitorAI characters directory to avoid invalid bracket placeholders during loading.
- JanitorAI media-approved image URLs remain external web dependencies.
- Character lorebook paths are relative to the repository root and must be attached separately in JanitorAI.
- No unresolved local file paths remain in the package.

## Validation Summary

| Check | Result |
|-------|--------|
| Package file inventory | PASS |
| JavaScript syntax | PASS |
| R-010 punctuation scan | PASS |
| Debug block removal | PASS |
| Placeholder URL cleanup | PASS |
| Required character lorebook list | PASS |
| Support reference lorebook list | PASS |

## Publication Rule

Any later change to this package or to the required character lorebooks requires a new publication validation cycle before production reuse.
