Title: Alyssa Douglas-Bloodmoon | Little Moon — The Protected Heart
Chat name: The Sociology Project

Tag: [
Limitless
👩 Female
🧑‍🎨 OC
👤 AnyPOV
❤️‍🩹 Fluff
#SvartulfrVerse
#Corporate
#PreMed
#Protected
#Modern
#College
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
|-----------|------|--------|
| Experience Knowledge | Ex_Alyssa.js | JavaScript (ES5) |
| Scenario | Scenario.md | Markdown |
| NPC Profiles | Personality.md | Markdown |
| Metadata | Metadata.md | This file |
| Scenario Hooks | Initial_messages.md | Markdown |
| Bot Card | bio.html | HTML |

---

## Experience Overview

| Field | Value |
|-------|-------|
| Primary Character | Alyssa Douglas-Bloodmoon |
| Age | 19 (born April 22, 2005) |
| Role | Youngest Heir / Pre-Med / Art Model |
| Player Role | {{user}} is a fellow UCLA student, assigned as Alyssa's sociology project partner |
| Hook | Write a comparative cultural analysis of two families. The problem: one family is the Douglas-Bloodmoon dynasty. |
| Genre | Slice-of-life, college, slowburn, coming of age |

---

## Separation of Concerns

| Layer | Contains | Does NOT Contain |
|-------|----------|------------------|
| Ex_Alyssa.js | Experience-specific knowledge, arc structure, character deep dive | World baseline, family structure, runtime mechanics |
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

### MOODBOARD_IMAGE_1 (Character Portrait — Alyssa)
**Status:** ✅ Already uploaded — `ASSET_REGISTRY.Character.Alyssa`
**URL:** `https://ella.janitorai.com/media-approved/jrRqqRXrm13-dU5aYqkmK.webp`

### MOODBOARD_IMAGE_2 (Moodboard — Alyssa warm/terrified smile)
**Status:** ❌ Needs generation
**Positive prompt:** `Full body portrait of a beautiful 19-year-old mixed-race woman with light brown skin, long wavy dark blonde hair, warm hazel eyes, wearing a cozy cream knit sweater and jeans, sitting at a university café table with textbooks and a laptop, soft golden hour lighting from a window, she has a warm genuine smile that doesn't quite reach her eyes — there's a flicker of anxiety behind the warmth, shallow depth of field, cinematic composition, photorealistic, 8k, detailed skin texture, natural makeup, small moonstone bracelet on her wrist, sunflower pin on her bag visible in the background`
**Negative prompt:** `cartoon, anime, illustration, painting, drawing, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated hands, extra limbs, ugly, watermark, text, logo, oversaturated, underexposed, overexposed, low quality, jpeg artifacts, cgi, 3d render, doll, plastic skin, unnatural eyes, cross-eyed, strabismus, asymmetric eyes, bad proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, neck tattoo, tattoo, piercings, multiple people, crowd, group, child, baby, old woman, elderly`

### SECTION_MAIN_IMAGE (Cast Section Banner — Twins Alyssa & Jasper)
**Status:** ❌ Needs generation
**Positive prompt:** `Cinematic wide shot of a luxurious Beverly Hills mansion rooftop at golden hour, a young woman (19, mixed-race, light brown skin, long wavy dark blonde hair, wearing a flowing sundress) and a young man (19, mixed-race, light brown skin, undercut hairstyle with longer top, wearing a black hoodie and ripped jeans, multiple ear piercings visible) sitting side by side on the edge of the rooftop, legs dangling, looking out over the Los Angeles skyline, warm sunset light casting long shadows, a sense of both freedom and confinement, the city sprawling below them, subtle tension in their body language — they're twins, they're close, but they're carrying weight, photorealistic, 8k, cinematic color grading, shallow depth of field on the cityscape`
**Negative prompt:** `cartoon, anime, illustration, painting, drawing, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated hands, extra limbs, ugly, watermark, text, logo, oversaturated, underexposed, overexposed, low quality, jpeg artifacts, cgi, 3d render, doll, plastic skin, unnatural eyes, cross-eyed, strabismus, asymmetric eyes, bad proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, more than two people, crowd, group, child, baby, old man, elderly, daytime, midday, harsh lighting, flat lighting`

### AESTHETICS_IMAGES
**Status:** ✅ All 3 already uploaded
- `WORLD_IMG_URL_1` → `ASSET_REGISTRY.Location.estate` — `https://ella.janitorai.com/media-approved/rtCarJZTeMxm7OzXcLa2C.webp`
- `WORLD_IMG_URL_2` → `ASSET_REGISTRY.Location.verve` — `https://ella.janitorai.com/media-approved/xB6GVo6KEfeOio3B2h7ga.webp`
- `WORLD_IMG_URL_3` → `ASSET_REGISTRY.Location.dinner` — `https://ella.janitorai.com/media-approved/JuLtgEfhNNv81XUQfBpMs.webp`

### CHARACTER_CARD_IMAGES (THE CLAN section)
**Status:** ✅ All already uploaded
- Malachia → `https://ella.janitorai.com/media-approved/lifei_PV6fMzLP8DQgA6l.webp`
- Noah → `https://ella.janitorai.com/media-approved/h7cdrBjxkQawzc8VUz_95.webp`
- Logan → `https://ella.janitorai.com/media-approved/_GnXrheeRCezC7xfbrQGN.webp`
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
