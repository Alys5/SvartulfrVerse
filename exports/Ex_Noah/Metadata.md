Title: Noah Douglas-Bloodmoon | The Velvet Glove
Chat name: The KSA Party

Tag: [
Limitless
👨 Male
🧑‍🎨 OC
👤 AnyPOV
❤️‍🩹 Fluff
#SvartulfrVerse
#Corporate
#Law
#Diplomat
#Modern
#Party
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
| Experience Knowledge | Ex_Noah.js | JavaScript (ES5) |
| Scenario | Scenario.md | Markdown |
| NPC Profiles | Personality.md | Markdown |
| Metadata | Metadata.md | This file |
| Scenario Hooks | Initial_messages.md | Markdown |
| Bot Card | bio.html | HTML |

---

## Experience Overview

| Field | Value |
|-------|-------|
| Primary Character | Noah Douglas-Bloodmoon |
| Age | 25 (born 1999) |
| Role | Second Heir / Legal Mind / KSA Alumni |
| Player Role | {{user}} is at the KSA party who notices Noah and decides to talk to him |
| Hook | Noah is bored to death at a mandatory KSA party. {{user}} is the first interesting thing he has seen all night. |
| Genre | Slice-of-life, slowburn, college drama |

---

## Separation of Concerns

| Layer | Contains | Does NOT Contain |
|-------|----------|------------------|
| Ex_Noah.js | Experience-specific knowledge, arc structure, character deep dive | World baseline, family structure, runtime mechanics |
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

### MOODBOARD_IMAGE_1 (Character Portrait — Noah)
**Status:** ✅ Already uploaded — `ASSET_REGISTRY.Character.Noah`
**URL:** `https://ella.janitorai.com/media-approved/aQIh3JIIkqvxBiznj2ecV.webp`

### MOODBOARD_IMAGE_2 (Moodboard — Noah polished exhaustion)
**Status:** ❌ Needs generation
**Positive prompt:** `Full body portrait of a handsome 25-year-old mixed-race man with light brown skin, well-groomed blonde hair styled neatly, sharp intelligent blue-green eyes, wearing a perfectly tailored navy blue suit with a white dress shirt unbuttoned at the collar, holding a champagne flute he hasn't drunk from, standing at an upscale fraternity party with warm ambient lighting, string lights and expensive décor visible in the background, his posture is impeccable but his eyes show deep boredom and exhaustion beneath the polished exterior, a slight forced smile, shallow depth of field, cinematic composition, photorealistic, 8k, detailed skin texture, natural makeup, the look of someone performing a role they've perfected`
**Negative prompt:** `cartoon, anime, illustration, painting, drawing, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated hands, extra limbs, ugly, watermark, text, logo, oversaturated, underexposed, overexposed, low quality, jpeg artifacts, cgi, 3d render, doll, plastic skin, unnatural eyes, cross-eyed, strabismus, asymmetric eyes, bad proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, tattoo, piercings, child, baby, teenager, old man, elderly, woman, multiple people in focus, daytime, outdoor, flat lighting, casual clothes, t-shirt, jeans`

### SECTION_MAIN_IMAGE (Cast Section Banner — Noah at the party)
**Status:** ❌ Needs generation
**Positive prompt:** `Cinematic wide shot of an upscale fraternity party in a luxurious mansion, warm golden ambient lighting, string lights and candles creating an intimate atmosphere, a handsome 25-year-old mixed-race man with blonde hair and a navy suit standing near a marble bar holding a drink, looking detached and bored amidst the socializing crowd, blurred partygoers in the background laughing and networking, the contrast between the vibrant party energy and his isolated stillness, expensive art on the walls, grand staircase visible, cinematic composition, photorealistic, 8k, warm color grading, shallow depth of field`
**Negative prompt:** `cartoon, anime, illustration, painting, drawing, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated hands, extra limbs, ugly, watermark, text, logo, oversaturated, underexposed, overexposed, low quality, jpeg artifacts, cgi, 3d render, doll, plastic skin, unnatural eyes, cross-eyed, strabismus, asymmetric eyes, bad proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, tattoo, piercings, child, baby, old man, elderly, woman, empty room, no people, daytime, outdoor, flat lighting, office setting, classroom`

### AESTHETICS_IMAGES
**Status:** ✅ All 3 already uploaded
- `WORLD_IMG_URL_1` → `ASSET_REGISTRY.Location.dinner` — `https://ella.janitorai.com/media-approved/JuLtgEfhNNv81XUQfBpMs.webp`
- `WORLD_IMG_URL_2` → `ASSET_REGISTRY.Location.estate` — `https://ella.janitorai.com/media-approved/rtCarJZTeMxm7OzXcLa2C.webp`
- `WORLD_IMG_URL_3` → `ASSET_REGISTRY.Location.verve` — `https://ella.janitorai.com/media-approved/xB6GVo6KEfeOio3B2h7ga.webp`

### CHARACTER_CARD_IMAGES (THE CLAN section)
**Status:** ✅ All already uploaded
- Jasper → `https://ella.janitorai.com/media-approved/FnwuWc0XPf5h9ul1o0R4i.webp`
- Alyssa → `https://ella.janitorai.com/media-approved/jrRqqRXrm13-dU5aYqkmK.webp`
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
