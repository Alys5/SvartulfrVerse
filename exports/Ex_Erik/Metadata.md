Title: Erik Douglas | The Tyrant — The Patriarch's Burden
Chat name: The Stranger in the Stands

Tag: [
Limitless
👨 Male
🧑‍🎨 OC
👤 AnyPOV
❤️‍🩹 Fluff
#SvartulfrVerse
#Corporate
#Patriarch
#Football
#Modern
#Drama
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
| Experience Knowledge | Ex_Erik.js | JavaScript (ES5) |
| Scenario | Scenario.md | Markdown |
| NPC Profiles | Personality.md | Markdown |
| Metadata | Metadata.md | This file |
| Scenario Hooks | Initial_messages.md | Markdown |
| Bot Card | bio.html | HTML |

---

## Experience Overview

| Field | Value |
|-------|-------|
| Primary Character | Erik Douglas |
| Age | 54 (born 1970) |
| Role | Patriarch / CEO of DCC / Former UCLA QB |
| Player Role | {{user}} is a UCLA football fan who sits next to Erik at a Bruins game — with no idea who he is |
| Hook | A man in a faded jersey. A stranger who talks to him like a human. The most valuable thing anyone has given him in years. |
| Genre | Slice-of-life, sports, slowburn, redemption |

---

## Separation of Concerns

| Layer | Contains | Does NOT Contain |
|-------|----------|------------------|
| Ex_Erik.js | Experience-specific knowledge, arc structure, character deep dive | World baseline, family structure, runtime mechanics |
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

### MOODBOARD_IMAGE_1 (Character Portrait — Erik)
**Status:** ✅ Already uploaded — `ASSET_REGISTRY.Character.Erik`
**URL:** `https://ella.janitorai.com/media-approved/qziRZ5Fs2BugaH80j-RSY.webp`

### MOODBOARD_IMAGE_2 (Moodboard — UCLA Stadium Seat)
**Status:** ✅ Already uploaded — `ASSET_REGISTRY.Location.ucla`
**URL:** `https://ella.janitorai.com/media-approved/UvG5alMlEmZyAA7oSrx-D.webp`

### SECTION_MAIN_IMAGE (Cast Section Banner — Erik in the Stands)
**Status:** ❌ Needs generation
**Positive prompt:** `Cinematic wide shot of a packed UCLA Bruins football stadium at night, stadium lights illuminating the field below, the stands are full of cheering fans, in the middle of the crowd sits a tall broad-shouldered 54-year-old man with salt-and-pepper hair, strong jaw, wearing a faded vintage 1994 UCLA Bruins jersey (number 12), sitting alone in his seat looking out at the field with a complex expression — nostalgia, grief, pride, and loneliness all at once, the stadium lights casting dramatic shadows across his face, other fans blurred in the background, cinematic composition, photorealistic, 8k, detailed skin texture showing age and character, natural stadium lighting, shallow depth of field`
**Negative prompt:** `cartoon, anime, illustration, painting, drawing, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated hands, extra limbs, ugly, watermark, text, logo, oversaturated, underexposed, overexposed, low quality, jpeg artifacts, cgi, 3d render, doll, plastic skin, unnatural eyes, cross-eyed, strabismus, asymmetric eyes, bad proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, tattoo, piercings, child, baby, teenager, young man, woman, multiple people in focus, daytime, empty stadium, flat lighting`

### AESTHETICS_IMAGES
**Status:** ✅ All 3 already uploaded
- `WORLD_IMG_URL_1` → `ASSET_REGISTRY.Location.dinner` — `https://ella.janitorai.com/media-approved/JuLtgEfhNNv81XUQfBpMs.webp`
- `WORLD_IMG_URL_2` → `ASSET_REGISTRY.Location.ucla` — `https://ella.janitorai.com/media-approved/UvG5alMlEmZyAA7oSrx-D.webp`
- `WORLD_IMG_URL_3` → `ASSET_REGISTRY.Location.estate` — `https://ella.janitorai.com/media-approved/rtCarJZTeMxm7OzXcLa2C.webp`

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
