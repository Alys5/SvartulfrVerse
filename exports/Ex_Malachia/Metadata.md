Title: Malachia Douglas-Bloodmoon | The Executive Successor
Chat name: Blood and Autographs

Tag: [
Limitless
👨 Male
🧑‍🎨 OC
👤 AnyPOV
❤️‍🩹 Fluff
#SvartulfrVerse
#Corporate
#Fighter
#Successor
#Modern
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
| Experience Knowledge | Ex_Malachia.js | JavaScript (ES5) |
| Scenario | Scenario.md | Markdown |
| NPC Profiles | Personality.md | Markdown |
| Metadata | Metadata.md | This file |
| Scenario Hooks | Initial_messages.md | Markdown |
| Bot Card | bio.html | HTML |

---

## Experience Overview

| Field | Value |
|-------|-------|
| Primary Character | Malachia Douglas-Bloodmoon |
| Age | 28 (born 1996) |
| Role | Executive Successor / Professional Fighter |
| Player Role | {{user}} is a fight fan who follows Malachia to the locker room |
| Hook | The fight is over. {{user}} came for an autograph. What they find is a man who fights for reasons he cannot articulate. |
| Genre | Slice-of-life, combat sports, slowburn |

---

## Separation of Concerns

| Layer | Contains | Does NOT Contain |
|-------|----------|------------------|
| Ex_Malachia.js | Experience-specific knowledge, arc structure, character deep dive | World baseline, family structure, runtime mechanics |
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

### MOODBOARD_IMAGE_1 (Character Portrait - Malachia)
**Status:** ✅ Already uploaded - `ASSET_REGISTRY.Character.Malachia`
**URL:** `https://ella.janitorai.com/media-approved/--XzWEO1b3jpfg9Mxhx2m.webp`

### MOODBOARD_IMAGE_2 (Moodboard - Malachia fight scene)
**Status:** ❌ Needs generation
**Positive prompt:** `Cinematic action shot inside a professional boxing ring, a towering 210cm muscular 28-year-old mixed-race man with light brown skin, short dark hair, intense focused eyes, wearing black boxing shorts and wrapped hands, mid-punch with sweat flying off his face, dramatic arena lighting from above casting harsh shadows on his defined muscles, blood trickling from a cut above his eyebrow, the crowd blurred in the background, ropes of the ring visible, the raw power and controlled violence of the moment, cinematic composition, photorealistic, 8k, dramatic high contrast lighting, motion blur on the fist`
**Negative prompt:** `cartoon, anime, illustration, painting, drawing, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated hands, extra limbs, ugly, watermark, text, logo, oversaturated, underexposed, overexposed, low quality, jpeg artifacts, cgi, 3d render, doll, plastic skin, unnatural eyes, cross-eyed, strabismus, asymmetric eyes, bad proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, tattoo, piercings, child, baby, teenager, woman, old man, elderly, daytime, empty arena, no crowd, flat lighting, peaceful, calm, smiling, happy`

### SECTION_MAIN_IMAGE (Cast Section Banner - Erik in the ring / family)
**Status:** ❌ Needs generation
**Positive prompt:** `Cinematic wide shot of a professional boxing arena, the ring is center frame with bright overhead lights, in the front row of the audience sits a tall imposing 54-year-old man with salt-and-pepper hair (Erik Douglas) wearing a dark suit, his expression is tense and proud, watching the fight with the intensity of a father who sees himself in the fighter, the arena is packed with blurred spectators, the atmosphere is electric and dangerous, dramatic spotlight on the ring, cinematic composition, photorealistic, 8k, high contrast lighting, shallow depth of field on the crowd`
**Negative prompt:** `cartoon, anime, illustration, painting, drawing, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated hands, extra limbs, ugly, watermark, text, logo, oversaturated, underexposed, overexposed, low quality, jpeg artifacts, cgi, 3d render, doll, plastic skin, unnatural eyes, cross-eyed, strabismus, asymmetric eyes, bad proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, tattoo, piercings, child, baby, woman, empty arena, no crowd, daytime, flat lighting, peaceful, calm`

### AESTHETICS_IMAGES
**Status:** ✅ All 3 already uploaded
- `WORLD_IMG_URL_1` → `ASSET_REGISTRY.Location.estate` - `https://ella.janitorai.com/media-approved/rtCarJZTeMxm7OzXcLa2C.webp`
- `WORLD_IMG_URL_2` → `ASSET_REGISTRY.Location.dinner` - `https://ella.janitorai.com/media-approved/JuLtgEfhNNv81XUQfBpMs.webp`
- `WORLD_IMG_URL_3` → `ASSET_REGISTRY.Character.Malachia` (fight shot) - `https://ella.janitorai.com/media-approved/lifei_PV6fMzLP8DQgA6l.webp`

### CHARACTER_CARD_IMAGES (THE CLAN section)
**Status:** ✅ All already uploaded
- Noah → `https://ella.janitorai.com/media-approved/h7cdrBjxkQawzc8VUz_95.webp`
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
