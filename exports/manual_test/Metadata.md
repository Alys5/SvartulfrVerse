Title: SvartúlfrVerse | Los Angeles
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

## Architecture

| Component | File | Format |
|-----------|------|--------|
| Engine Runtime | Advanced_Mechanics_Lorebook.js | JavaScript (ES5) |
| Standard Lorebook | Standard_Lorebook.json | JSON (JanitorAI Lorebook) |
| World Layer | W_Contemporary.js (reference only) | JavaScript (ES5) |
| Family Layer | F_Douglas_Bloodmoon.js (reference only) | JavaScript (ES5) |
| User Persona (Jasper) | User_Persona_Jasper.md | Markdown |
| User Persona (Alyssa) | User_Persona_Alyssa.md | Markdown |

## Separation of Concerns

| Layer | Contains | Does NOT Contain |
|-------|----------|------------------|
| Standard Lorebook JSON | Canonical lore, character bios, world data, genealogy | Runtime logic, mechanics, scripts |
| Advanced Mechanics JS | Runtime systems, state logic, trigger logic, validation modules | Canonical lore, character bios, worldbuilding |
| User Personas | Test user identity data, validation parameters | NPC character data |

## Mandatory Profile Fields (Template Freeze v1.0)

Every profile exported to JanitorAI — whether User Persona or NPC character — MUST contain ALL of the following fields. No field may be omitted. If canon source does not define a value, use `[not defined in canon]` or infer from character profile.

### Identity Block
| Field | Required | Notes |
|-------|----------|-------|
| Name | YES | Full first name |
| Surname | YES | Full surname(s) |
| Aliases | YES | Nicknames, titles, alter egos. Empty list if none. |
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
| Features | YES | Scars, tattoos, piercings, birthmarks, distinctive marks. If none: 'None.' |
| Scent | YES | Natural + artificial scents |
| Clothing | YES | Style + Casual/Formal/Work/Sleep breakdown |

### Narrative Block
| Field | Required | Notes |
|-------|----------|-------|
| Backstory | YES | Bullet points, early to recent. Origin through current status. |
| Relationships | YES | All key relationships WITH speech examples. Format: 'Name (Role) — Description. Speech: "quote"' |
| Goal | YES | Primary current goal |
| Personality | YES | Core traits, behavioral summary, orientation if defined |
| Archetype | YES | Character archetype(s) |

### Traits Block
| Field | Required | Notes |
|-------|----------|-------|
| Traits | YES | Numbered list, minimum 12, recommended 16 |

### Behavioral States (EXACT field names)
| Field | Required | Notes |
|-------|----------|-------|
| When alone | YES | Behavior when solitary |
| When angry | YES | Behavior when angered |
| When with {{user}} | YES | Behavior with active user |
| When in public | YES | Behavior in social/public settings |

### Psychological Block
| Field | Required | Notes |
|-------|----------|-------|
| Opinions | YES | 3-7 key opinions as bullet points |
| Sexual_Behavior | YES | Orientation, preferences, genitals description, kinks, quirks |
| Speech | YES | Speech style description + labeled example quotes (Greeting, Under pressure, When happy, When serious, plus character-specific) |

### Notes Block
| Field | Required | Notes |
|-------|----------|-------|
| Notes | YES | Meta notes, test persona disclaimer if applicable, canon update log |

### Field Naming Conventions
- Use EXACT field names as listed above (case-sensitive)
- Separator: colon (`:`) after field name
- Multi-line values: plain text, bullet points with `-` prefix
- Speech examples: wrapped in `"double quotes"`
- Behavioral states: MUST use `{{user}}` placeholder in "When with {{user}}"

### Compliance

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
