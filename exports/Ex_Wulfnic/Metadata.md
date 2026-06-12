Title: Wulfnic Bloodmoon | The Ancient One
Chat name: The Bloodmoon Interview

Tag: [
Limitless
👨 Male
🧑‍🎨 OC
👤 AnyPOV
❤️‍🩹 Fluff
#SvartulfrVerse
#Corporate
#Heritage
#Modern
#Intergenerational
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
| Experience Knowledge | Ex_Wulfnic.js | JavaScript (ES6-safe JanitorAI sandbox) |
| Scenario | Scenario.md | Markdown |
| NPC Profiles | Personality.md | Markdown |
| Metadata | Metadata.md | This file |
| Scenario Hooks | Initial_messages.md | Markdown |
| Bot Card | bio.html | HTML |

---

## Character Focus

| Field | Value |
|-------|-------|
| Primary Character | Wulfnic Bloodmoon |
| Age | 76 (born 1948) |
| Role: | Bloodmoon Patriarch / Custodian of Svartulfr Heritage |
| Occupation | Cultural authority, family historian |
| Key Relationship | Nixara Bloodmoon (daughter, deceased), Erik Douglas (son-in-law) |

---

## Separation of Concerns

| Layer | Contains | Does NOT Contain |
|-------|----------|------------------|
| Ex_Wulfnic.js | Experience-specific knowledge, arc structure, character deep dive | World baseline, family structure, runtime mechanics |
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

### MOODBOARD_IMAGE_1 (Character Portrait - Wulfnic)
**Status:** ✅ Already uploaded - `ASSET_REGISTRY.Character.Wulfnic`
**URL:** `https://ella.janitorai.com/media-approved/4PRQ0NKkfAylAtUM5xMF0.webp`

### MOODBOARD_IMAGE_2 (Moodboard - Wulfnic in the library)
**Status:** ❌ Needs generation
**Positive prompt:** `Cinematic interior shot of a grand private library in a Beverly Hills mansion, floor-to-ceiling dark wood bookshelves filled with ancient leather-bound books and Icelandic artifacts, a tall 76-year-old man with silver-white hair and piercing blue eyes, strong weathered face with deep lines telling decades of stories, wearing a fine charcoal wool cardigan over a white shirt, seated in a large leather armchair beside a window with soft natural light streaming in, his hands resting on an old open book, the room smells of old paper and older wisdom, warm golden light filtering through the window, family photographs on a side table, a cup of tea steaming beside him, the atmosphere is contemplative and heavy with memory, cinematic composition, photorealistic, 8k, warm color grading, shallow depth of field on the bookshelves`
**Negative prompt:** `cartoon, anime, illustration, painting, drawing, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated hands, extra limbs, ugly, watermark, text, logo, oversaturated, underexposed, overexposed, low quality, jpeg artifacts, cgi, 3d render, doll, plastic skin, unnatural eyes, cross-eyed, strabismus, asymmetric eyes, bad proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, tattoo, piercings, child, baby, teenager, young man, woman, multiple people, empty room, no books, modern office, flat lighting, daytime harsh light`

### SECTION_MAIN_IMAGE (Cast Section Banner - Wulfnic & Erik in the library)
**Status:** ❌ Needs generation
**Positive prompt:** `Cinematic two-shot in a grand private library, a 76-year-old silver-haired man with piercing blue eyes (Wulfnic Bloodmoon) seated in a leather armchair, and a 54-year-old salt-and-pepper haired man in a dark suit (Erik Douglas) standing nearby with a glass of whiskey, the tension between old wisdom and corporate power, floor-to-ceiling bookshelves and Icelandic artifacts in the background, warm golden light from a window, the old wolf and the tyrant in the same room - respect and unease, cinematic composition, photorealistic, 8k, dramatic lighting, shallow depth of field`
**Negative prompt:** `cartoon, anime, illustration, painting, drawing, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated hands, extra limbs, ugly, watermark, text, logo, oversaturated, underexposed, overexposed, low quality, jpeg artifacts, cgi, 3d render, doll, plastic skin, unnatural eyes, cross-eyed, strabismus, asymmetric eyes, bad proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, tattoo, piercings, child, baby, teenager, woman, more than two people, empty room, no books, modern office, flat lighting, daytime harsh light`

### AESTHETICS_IMAGES
**Status:** ✅ All 3 already uploaded
- `WORLD_IMG_URL_1` → `ASSET_REGISTRY.Character.Wulfnic` (library portrait) - `https://ella.janitorai.com/media-approved/4PRQ0NKkfAylAtUM5xMF0.webp`
- `WORLD_IMG_URL_2` → `ASSET_REGISTRY.Location.estate` - `https://ella.janitorai.com/media-approved/rtCarJZTeMxm7OzXcLa2C.webp`
- `WORLD_IMG_URL_3` → `ASSET_REGISTRY.Location.dinner` - `https://ella.janitorai.com/media-approved/JuLtgEfhNNv81XUQfBpMs.webp`

### CHARACTER_CARD_IMAGES (THE CLAN section)
**Status:** ✅ All already uploaded
- Malachia → `https://ella.janitorai.com/media-approved/lifei_PV6fMzLP8DQgA6l.webp`
- Noah → `https://ella.janitorai.com/media-approved/h7cdrBjxkQawzc8VUz_95.webp`
- Jasper → `https://ella.janitorai.com/media-approved/FnwuWc0XPf5h9ul1o0R4i.webp`
- Logan → `https://ella.janitorai.com/media-approved/_GnXrheeRCezC7xfbrQGN.webp`

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
