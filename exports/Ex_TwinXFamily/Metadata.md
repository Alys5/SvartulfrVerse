Title: Svartúlfr | TwinXFamily
Chat name: Douglas-Bloodmoon Family

Tag: [
Limitless
👨 Male
👩 Female
🧑‍🎨 OC
👭 Multiple
👤 AnyPOV
❤️‍🩹 Fluff
#SvartulfrVerse
#Corporate
#Overprotective
#Modern
]

SoundCloud Track: https://api.soundcloud.com/tracks/47838739

visibility: public
definition: hidden
proxies: allowed
published chats: allowed
comments: open
scheduled: none

---

## Canon Metadata

| Field | Value |
|-------|-------|
| Canon Version | Canon Freeze v1.0 (2026-06-09) |
| Repository | SvartulfrVerse (Active Runtime Repository) |
| Archive | Progetti (read-only Historical Archive, .gitignored) |
| ADRs | ADR-000 through ADR-009 (all APPROVED) |
| Authority Layers | Character, Family, Visual, Experience, World |
| Canon Layers | Active, Historical, Cultural, Deferred, Candidate |

---

## Architecture

| Component | File | Format |
|-----------|------|--------|
| Experience Runtime | Ex_TwinXFamily.js | JavaScript (ES6-safe JanitorAI Advanced Script) |
| World Layer | W_Contemporary.js (reference only) | JavaScript (ES6-safe JanitorAI Advanced Script) |
| Family Layer | F_DouglasBloodmoon.js (reference only) | JavaScript (ES6-safe JanitorAI Advanced Script) |
| User Persona (Jasper) | User_Persona_Jasper.md | Markdown |
| User Persona (Alyssa) | User_Persona_Alyssa.md | Markdown |
| User Persona (They) | User_Persona_They.md | Markdown |

---

## Export File Inventory

| File | Type | Purpose |
|------|------|---------|
| `Ex_TwinXFamily.js` | Runtime | Consolidated TwinX Family experience runtime and activation logic |
| `Scenario.md` | Directives | Twin Resolution Authority, formatting conventions, user contract |
| `Personality.md` | NPC Profiles | Erik, Malachia, Noah, Wulfnic, Logan, dynamic twin slot, and twin system authority |
| `User_Persona_Jasper.md` | User Persona | Jasper Douglas-Bloodmoon test persona |
| `User_Persona_Alyssa.md` | User Persona | Alyssa Douglas-Bloodmoon test persona |
| `User_Persona_They.md` | User Persona | Non-binary custom user persona reference |
| `Initial_messages_1-7.md` | Starters | 7 scenario hooks for full family, Malachia, Noah, Erik, Wulfnic, Logan, and twins-only paths |
| `bio.html` | Card Bio | JanitorAI bot card HTML |
| `Metadata.md` | Guidelines | Export metadata, conventions, and compliance checklist |
| `PUBLICATION_MANIFEST.md` | Manifest | Publication status, package inventory, dependencies, and validation summary |

---

## Separation of Concerns

| Layer | Contains | Does NOT Contain |
|-------|----------|------------------|
| Standard Lorebook JSON | Canonical lore, character bios, world data, genealogy | Runtime logic, mechanics, scripts |
| Advanced Mechanics JS | Runtime systems, state logic, trigger logic, validation modules | Canonical lore, character bios, worldbuilding |
| User Personas | Test user identity data, validation parameters | NPC character data |
| Personality.md | NPC character profiles with full behavioral schema | {{user}} identity data |
| Scenario.md | Narrative directives, twin resolution, world invariants | Runtime scripting |
| Initial Messages | In-character scenario starters | Lorebook entries, NPC profiles |
| Example Dialogs | Structured dialogue examples per character | Canonical personality definitions |

---

## Formatting Conventions (ALL in-game output)

| Format | Meaning | Usage |
|--------|---------|-------|
| `plain text` | Narration / Actions / Descriptions | Default for all narrative prose |
| `"text"` | Spoken dialogue | All character speech |
| `_text_` / `_text_` | Thoughts / Internal monologue | Inner perspective, never for narration |
| `**text**` | Emphasis / Highlight | Key words, important details |
| `` `text` `` | Written messages | SMS, emails, signs, notes, digital/paper communication |
| `***text***` | Event trigger / Alert | System alerts, emotional peaks, dramatic moments |
| `**"text"**` | Raised voice / Shouting | Yelling, screaming, CAPITALIZED when extreme |

**CRITICAL:** Never use `*single asterisks*` for narration. Asterisks are ONLY for bold (`**`), Italic (`_`), or bold Italic (`***`).

---

## Mandatory Profile Fields (Template Freeze v1.0)

Every profile exported to JanitorAI, whether User Persona or NPC character, MUST contain ALL of the following fields. No field may be omitted. If canon source does not define a value, use `[not defined in canon]` or infer from character profile.

### Identity Block
| Field | Required | Notes |
|-------|----------|-------|
| Name | YES | Full first name |
| Surname | YES | Full surname(s) |
| Aliases | YES | Nicknames, titles, alter egos. If none: "None." |
| Species | YES | Human for all SvartúlfrVerse chars (per ADR-000) |
| Nationality | YES | Citizenship |
| Ethnicity | YES | Ethnic/cultural descent |
| Age | YES | Current age + birthdate if available |

### Visual Block
| Field | Required | Notes |
|-------|----------|-------|
| Hair | YES | Color, length, style, genetic classification |
| Eyes | YES | Color, expression, genetic classification |
| Body | YES | Height, build, physique description |
| Face | YES | Facial structure, key features |
| Features | YES | Scars, tattoos, piercings, birthmarks. If none: "None." |
| Scent | YES | Natural + artificial scents |
| Clothing | YES | Style + Casual/Formal/Work/Sleep breakdown |

### Narrative Block
| Field | Required | Notes |
|-------|----------|-------|
| Backstory | YES | Bullet points, early → recent. Origin through current status. |
| Relationships | YES | Key relationships WITH speech examples. Format: "Name (Role), Description. Speech: "quote"" |
| Goal | YES | Primary current goal |
| Personality | YES | Core traits, behavioral summary, orientation if defined |
| Archetype | YES | Character archetype(s) |

### Traits Block
| Field | Required | Notes |
|-------|----------|-------|
| Traits | YES | Numbered list, minimum 12, recommended 16 |

### Behavioral States (EXACT field names, case-sensitive)
| Field | Required | Notes |
|-------|----------|-------|
| When alone | YES | Behavior when solitary |
| When angry | YES | Behavior when angered |
| When with {{user}} | YES | Behavior with active user. MUST use `{{user}}` placeholder. |
| When in public | YES | Behavior in social/public settings |

### Psychological Block
| Field | Required | Notes |
|-------|----------|-------|
| Opinions | YES | 3-7 key opinions as bullet points |
| Sexual_Behavior | YES | Orientation, preferences, genitals, kinks, quirks |
| Speech | YES | Speech style description + labeled example quotes (Greeting, Under pressure, When happy, When serious, plus character-specific) |

### Notes Block
| Field | Required | Notes |
|-------|----------|-------|
| Notes | YES | Meta notes, test persona disclaimer if applicable, canon update log |

### Field Naming Conventions
- Use EXACT field names as listed above (case-sensitive)
- Separator: colon (`:`) after field name, space before value
- Multi-line values: plain text, bullet points with `-` prefix, line breaks with `. ` between sentences
- Speech examples: wrapped in `"double quotes"`
- Internal thoughts in descriptions: wrapped in `_single underscores_`
- Emphasis in descriptions: wrapped in `**double asterisks**`
- Behavioral states: MUST use `{{user}}` placeholder in "When with {{user}}"

### User Persona vs NPC Profile Format
- **User Personas:** Wrapped in `{{user}} = { }` block
- **NPC Profiles:** Each NPC wrapped in `{ }` block, collected under group header
- **Group metadata:** Use `[Key: Value]` format above NPC blocks
- All other field conventions identical between Persona and NPC

---

## Bot Card Guidelines (Best Practices)

### Structure (in order)

1. **Impact Title** (~20 chars): Short, bold, emotional hook
2. **Subtitle**: Name + identity descriptor
3. **Main Image**: Portrait, clean background, eye contact (1:1)
4. **Tag Line** (1 sentence): Atmosphere in italics
5. **Keywords** (3-4): Core themes with ✦ separator
6. **Blurb Body** (3-5 sentences): World + conflict + emotional hook. NO lore dump.
7. **Character Roster**: Name ✦ Role format. One-liners only.
8. **Experience Contract** (bulleted): Technical constraints only (Any POV, Player Agency, etc.)
9. **Support Images** (1-3): Contextual, 4:3 or 5:3, style-consistent

### Blurb Writing Rules
- **Hook first.** Opening sentence must create tension or curiosity.
- **Show, don't list.** "Sunday lunch is a parliamentary session" not "the family is controlling."
- **Bold the skimmer sentence.** One `**frase d'impatto**` for fast readers.
- **No encyclopedia.** Age, birthplace, favorite food → gone. Attitude stays.
- **End with invitation.** A question or "minaccia" that pulls the reader in.

### Image Rules
- **Single style.** No mixing anime + photorealism.
- **1:1** for portraits, **4:3 or 5:3** for support, **3:1 or 5:3** for banners.
- **Prompt structure:** Style → Subject → Details → Lighting. Use negative prompts.

### Common Mistakes to Avoid
- Boring title (just the name)
- Blurb as personality encyclopedia
- Random/cropped/inconsistent images
- No bold impact sentence
- Full lore dump in blurb (world details go in Scenario.md, not the card)

---

## Canon Nicknames & Aliases Registry

| Character | Alias | Used By | Notes |
|-----------|-------|---------|-------|
| Noah Douglas-Bloodmoon | "Blondie" | Logan Douglas only | Affectionate, casual |
| Jasper Douglas-Bloodmoon | "Jaz" | Family, friends | Casual |
| Jasper Douglas-Bloodmoon | "DJ Frequency" | Underground scene | Secret identity |
| Alyssa Douglas-Bloodmoon | "Lys" | Family, close friends | Casual |
| Alyssa Douglas-Bloodmoon | "Sunflower" | Angel Moreno | Artistic nickname |
| Alyssa Douglas-Bloodmoon | "Little Moon" | Wulfnic Bloodmoon | Affectionate, Icelandic roots |
| Erik Douglas | "The Tyrant" | Household (behind his back) | Fear + respect |
| Malachia Douglas-Bloodmoon | "The Wall" | Family, fighters | Physical presence |
| Malachia Douglas-Bloodmoon | "Mal" | Close family only | Intimate shorthand |
| Noah Douglas-Bloodmoon | "The Velvet Glove" | Social circles | Elegance + hidden steel |
| Noah Douglas-Bloodmoon | "Nono" | Family (playful) | Childlike, affectionate |
| Wulfnic Bloodmoon | "The Ancient One" | Household | Respect + age |
| Logan Douglas | "The Cool Uncle" | Niblings | Self-explanatory |

---

## Canon Physical Details Registry (Verified)

### Jasper Douglas-Bloodmoon
- **Scars:** Multiple small scars across both hands and knuckles from parkour falls. Faint line along right forearm. Minor scrapes on elbows and knees.
- **Piercings:** Full ear piercings on both ears, multiple studs and rings running up the cartilage.
- **Tattoo:** Norse design running from chest across left shoulder and down the left arm to the wrist. Black ink knotwork. Received piece by piece, each section marking a personal milestone.

### Alyssa Douglas-Bloodmoon
- **Birthmark:** Faint crescent-shaped birthmark on left hip.
- **Piercings:** Standard lobe piercings (both ears).
- **Tattoo:** Small sunflower tattoo on right inner ankle.

### Malachia Douglas-Bloodmoon
- **Scars:** Heavily scarred, face, knuckles, torso from professional boxing/MMA.
- **Ears:** Slightly cauliflowered from MMA.
- **No tattoos, no piercings.**

### Noah Douglas-Bloodmoon
- **No scars, no tattoos, no piercings.** Immaculate grooming. Hands are soft.

### Wulfnic Bloodmoon
- **Ears:** Slightly pointed, a Bloodmoon family trait (genetic, not supernatural).
- **No tattoos, no piercings.** Age spots on hands.

### Logan Douglas
- **Scar:** Faint scar on chin from a mechanical accident.
- **Piercing:** Single ear piercing (left ear, small ring).
- **No tattoos.** Hands permanently grease-stained.

---

## Compliance

- [x] R-000 Runtime Rules
- [x] R-001 Dynastic Rules
- [x] R-002 Family Rules
- [x] R-003 Character Rules
- [x] R-004 Visual Rules
- [x] R-005 Experience Rules
- [x] R-006 Governance Rules
- [x] R-007 Engine Rules
- [x] R-008 Bot Rules
- [x] R-009 Lorebook Rules
