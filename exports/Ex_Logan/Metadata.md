Title: Logan Douglas | The Cool Uncle
Chat name: The Verve

Tag: [
Limitless
👨 Male
🧑‍🎨 OC
👤 AnyPOV
❤️‍🩹 Fluff
#SvartulfrVerse
#Corporate
#SafeHaven
#Modern
#Bartender
]

visibility: public
definition: hidden
proxies: allowed
published chats: allowed
comments: open

---

## Canon Metadata

| Field | Value |
|-------|-------|
| Canon Version | Canon Freeze v1.0 (2026-06-11) |
| Repository | SvartulfrVerse (Active Runtime Repository) |
| ADRs | ADR-000 through ADR-009 (all APPROVED) |
| Authority Layers | Character, Family, Visual, Experience, World |
| Canon Layers | Active, Historical, Cultural, Deferred, Candidate |

---

## Experience Architecture

| Component | File | Format |
|--------|------|--------|
| Experience Knowledge | Ex_Logan.js | JavaScript (ES5) |
| Scenario | Scenario.md | Markdown |
| NPC Profiles | Personality.md | Markdown |
| Metadata | Metadata.md | This file |
| Scenario Hooks | Initial_messages.md | Markdown |
| Bot Card | bio.html | HTML |

---

## Character Focus

| Field | Value |
|-------|-------|
| Primary Character | Logan Douglas |
| Age | 51 |
| Role | Uncle / Safe Haven Authority |
| Occupation | Bar Owner (The Verve), Mechanic (Douglas Customs) |
| Key Relationship | Erik Douglas (brother), Edric Douglas (son) |

---

## Separation of Concerns

| Layer | Contains | Does NOT Contain |
|-------|----------|------------------|
| Ex_Logan.js | Experience-specific knowledge, arc structure, character deep dive | World baseline, family structure, runtime mechanics |
| Personality.md | NPC profiles for this experience | Full character bios (see database/) |
| Scenario.md | Timeline, setting, core conflict, player entry points | Runtime scripting |
| Initial_messages | In-character scenario starters | Lorebook entries |

---

## Formatting Conventions

| Format | Meaning | Usage |
|--------|---------|-------|
| `plain text` | Narration / Actions / Descriptions | Default for all narrative prose |
| `"text"` | Spoken dialogue | All character speech |
| `_text_` | Thoughts / Internal monologue | Inner perspective |
| `**text**` | Emphasis / Highlight | Key words, important details |
| `***text***` | Event trigger / Alert | System alerts, emotional peaks |
| `**"text"**` | Raised voice / Shouting | Yelling, screaming |

---

## Image Generation Prompts

### MOODBOARD_IMAGE_1 (Character Portrait — Logan)
**Status:** ✅ Already uploaded — `ASSET_REGISTRY.Character.Logan`
**URL:** `https://ella.janitorai.com/media-approved/Jd4-jka2ASnjS9romOGfg.webp`

### MOODBOARD_IMAGE_2 (Moodboard — The Verve interior)
**Status:** ✅ Already uploaded — `ASSET_REGISTRY.Location.verve`
**URL:** `https://ella.janitorai.com/media-approved/xB6GVo6KEfeOio3B2h7ga.webp`

### SECTION_MAIN_IMAGE (Cast Section Banner — Logan behind the bar)
**Status:** ❌ Needs generation
**Positive prompt:** `Cinematic interior shot of a stylish industrial bar in the Arts District of Los Angeles at night, exposed brick walls, neon signs glowing warm amber and teal, a tall broad-shouldered 51-year-old man with sandy blonde hair slightly greying at the temples, warm blue eyes, wearing a fitted black t-shirt with rolled sleeves showing mechanic's hands and a few old scars, standing behind the bar polishing a glass with a calm knowing expression, the bar is warmly lit with Edison bulbs hanging from the ceiling, shelves of premium bottles backlit, a few patrons blurred in the background, the atmosphere is intimate and safe — a refuge from the city outside, cinematic composition, photorealistic, 8k, warm color grading, shallow depth of field`
**Negative prompt:** `cartoon, anime, illustration, painting, drawing, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated hands, extra limbs, ugly, watermark, text, logo, oversaturated, underexposed, overexposed, low quality, jpeg artifacts, cgi, 3d render, doll, plastic skin, unnatural eyes, cross-eyed, strabismus, asymmetric eyes, bad proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, tattoo, piercings, child, baby, teenager, woman, empty bar, no people, daytime, bright daylight, office setting, flat lighting, sports stadium`

### AESTHETICS_IMAGES
**Status:** ✅ All 3 already uploaded
- `WORLD_IMG_URL_1` → `ASSET_REGISTRY.Location.verve` — `https://ella.janitorai.com/media-approved/xB6GVo6KEfeOio3B2h7ga.webp`
- `WORLD_IMG_URL_2` → `ASSET_REGISTRY.Location.estate` — `https://ella.janitorai.com/media-approved/rtCarJZTeMxm7OzXcLa2C.webp`
- `WORLD_IMG_URL_3` → `ASSET_REGISTRY.Location.dinner` — `https://ella.janitorai.com/media-approved/JuLtgEfhNNv81XUQfBpMs.webp`

### CHARACTER_CARD_IMAGES (THE CLAN section)
**Status:** ✅ All already uploaded
- Jasper → `https://ella.janitorai.com/media-approved/FnwuWc0XPf5h9ul1o0R4i.webp`
- Alyssa → `https://ella.janitorai.com/media-approved/jrRqqRXrm13-dU5aYqkmK.webp`
- Noah → `https://ella.janitorai.com/media-approved/h7cdrBjxkQawzc8VUz_95.webp`
- Wulfnic → `https://ella.janitorai.com/media-approved/Rz2h_zdTgc16ngBzvHaOf.webp`

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

---

**Last Updated:** 2026-06-11
**Canon Freeze:** v1.0
