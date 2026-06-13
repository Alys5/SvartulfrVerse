# LosAngeles2024 Report

Generated from: `d:\SvartulfrVerse\LosAngeles2024`  
Scope: active JanitorAI/SvartulfrVerse canon extraction, classification, and cleanup planning.  
Default canon policy: contemporary 2024 human-only baseline. AU/supernatural material is rejected from active canon unless explicitly promoted.

## 1. Executive Summary

`LosAngeles2024` contains the active Los Angeles 2024 branch of SvartulfrVerse, centered on the Douglas-Bloodmoon family, UCLA, Beverly Hills, DTLA Arts District, and the tension between corporate surveillance and personal autonomy.

The folder contains:

- Character public metadata for Alyssa, Erik, Jasper, Logan, Malachia, Noah, and Wulfnic.
- Experience folders for Alyssa, Erik, Jasper, Logan, Malachia, Noah, Wulfnic, and TwinXFamily.
- World/visual sources: `W_Contemporary.md`, `Visual_DNA.md`, `alyssa_avatar.md`.
- Genealogy source: `Dynasty.js`.
- Legacy runtime scripts: multiple `.js` files that are not suitable as authoritative runtime sources under current ES5/context rules.
- AU bleed: werewolf, cyber, fantasy, Twin Link, Alpha/Omega, magic, pack ranks, and other non-active material.

The active canon should be rebuilt from this report and the retained source files. Out-of-topic material has been moved to `d:\SvartulfrVerse\DaClassificare.md`.

## 2. Source Inventory

| Path | Type | Status | Notes |
|---|---|---|---|
| `legacy/C_Alyssa.md` | Character public metadata | Retain | Active Alyssa character source. |
| `legacy/C_Erik.md` | Character public metadata | Retain | Active Erik character source. |
| `legacy/C_Jasper.md` | Character public metadata | Retain | Active Jasper/DJ Frequency character source. |
| `legacy/C_Logan.md` | Character public metadata | Retain | Active Logan character source. |
| `legacy/C_Malachia.md` | Character public metadata | Retain | Active Malachia character source. |
| `legacy/C_Noah.md` | Character public metadata | Retain | Active Noah character source. |
| `legacy/C_Wulfnic.md` | Character public metadata | Retain | Active Wulfnic character source. |
| `legacy/W_Contemporary.md` | World public metadata | Retain | Active contemporary world baseline. |
| `legacy/Visual_DNA.md` | Visual authority | Retain | Active visual style source. |
| `legacy/alyssa_avatar.md` | Avatar prompt/source | Retain | Alyssa image prompt details. |
| `legacy/Dynasty.js` | Genealogy source | Retain with caution | Authoritative family structure, but runtime script should not be copied directly. |
| `legacy/W_LosAngeles2024.js` | Legacy world runtime | Candidate delete | Structured data useful for report; not runtime-safe as final source. |
| `legacy/W_Contemporary.js` | Legacy world runtime | Candidate delete | Contains useful lore plus AU bleed and old runtime patterns. |
| `legacy/Engine.js` | Legacy engine | Candidate delete | Not current JanitorAI-compliant runtime source. |
| `legacy/C_*.js` | Legacy character runtime | Candidate delete | Character facts can be retained from `.md` and report; `.js` contains AU bleed. |
| `legacy/Ex_*/*.js` | Legacy experience runtime | Candidate delete | Not needed after extraction and classification. |
| `legacy/Ex_*/*.md` | Experience narrative source | Mostly retain | Personality, scenario, metadata, and key scenario docs are useful. |
| `legacy/Ex_*/*.html` | Export artifacts | Candidate delete | Duplicates character card/export data. |
| `legacy/Ex_* /Initial_messages*.md` | Sample dialogue | Candidate archive | Useful for style, not active canon facts. |
| `legacy/rename_au.js` | Utility script | Delete | Unsafe/non-compliant legacy utility; not needed. |
| `legacy/Ex_TwinXFamily/User_Persona_*.md` | User persona examples | Move to DaClassificare | Not active NPC/world canon. |

## 3. Canon Layer Rules

| Layer | Meaning in this folder | Examples |
|---|---|---|
| `[ACTIVE]` | Current, true, interactable facts for Los Angeles 2024. | Human-only LA, Douglas Estate, DCC, UCLA, Erik, Alyssa, Jasper. |
| `[HISTORICAL]` | Established past facts. | Nixara’s death, Merchant House Douglas, Edric Aettfadir Svartulfa. |
| `[CULTURAL]` | Myths, heritage, legends, or cultural memory. | Svartulfr cultural origin, Wulfnic as heritage keeper. |
| `[DEFERRED]` | Locked truths for later Engine triggers. | None confirmed in this folder. |
| `[CANDIDATE]` | Ideas, AU variants, minor incidents, or unverified material. | Rogue mercenary cells, Bruins Boob Bracket, Caelum persona, Scarlett. |

## 4. MacroCosmo Classification

### WRD: World Rules

| Entry | Canon Layer | Priority | Keywords | Summary |
|---|---:|---:|---|---|
| `WRD: Los Angeles 2024 Core` | `[ACTIVE]` | 11 | los angeles, LA 2024, contemporary, human only | Contemporary human-only Los Angeles, 2024. Realistic technology, society, institutions, corporate hierarchy, family politics, UCLA campus life, Beverly Hills wealth, and underground creative scenes. |
| `WRD: AU Non-Active Boundary` | `[ACTIVE]` | 9 | AU, werewolf, cyber, fantasy, twin link, alpha omega | Legacy AU material is non-active. Do not introduce werewolf ranks, Twin Link, magic, Alpha/Omega, non-human anatomy, or cyber implants into active runtime unless promoted. |
| `WRD: California Slice-of-Life Dynasty Visual DNA` | `[ACTIVE]` | 7 | visual dna, golden hour, amber obsidian, beverly hills luxury | Warm cinematic visual language: golden hour, amber/obsidian palette, Beverly Hills luxury contrasted with underground grit, expressive eyes, modern California luxury, emotionally safe family warmth. |
| `WRD: Douglas-Bloodmoon Biometric Surveillance Protocol` | `[ACTIVE]` | 9 | biometric, surveillance, smartwatch, tracker, heart rate | Family protection uses staged escalation: monitor, isolate, controlled extraction. Maintain ambiguity around exact devices unless a scene establishes them. |

### LOC: Locations

| Entry | Canon Layer | Priority | Keywords | Summary |
|---|---:|---:|---|---|
| `LOC: Los Angeles Core` | `[ACTIVE]` | 8 | los angeles, beverly hills, century city, santa monica, hollywood, dtla, westwood | Metropolitan stage with UCLA Westwood, Beverly Hills, Century City, Santa Monica, Hollywood, and DTLA as primary hubs. |
| `LOC: Douglas Estate` | `[ACTIVE]` | 10 | douglas estate, beverly hills compound, throne room, biometric access | Gated Beverly Hills compound and main family residence. Fortress-like security, old-money prestige, family warmth, Erik’s Throne Room, Malachia’s tactical wing, Wulfnic’s quarters/library, twins’ rooms, family dining room, guest wing, underground garage. |
| `LOC: Douglas Customs` | `[ACTIVE]` | 7 | douglas customs, logan workshop, arts district, dtla | Logan’s DTLA Arts District workshop. Industrial, practical, working-class contrast to corporate Douglas identity. Restoration bays, fabrication area, motorcycle workstations, tool room, office mezzanine, vehicle storage. |
| `LOC: The Verve Lounge` | `[ACTIVE]` | 8 | the verve, verve lounge, logan’s bar, pMC-free | Logan’s lounge/bar/creative venue and PMC-free safe zone. Exposed brick, steel beams, concrete floors, high ceilings, bar, lounge seating, small stage, VIP area, rooftop, motorcycle displays, Logan’s penthouse above. |
| `LOC: UCLA Campus` | `[ACTIVE]` | 8 | ucla, westwood, bruin walk, powell library, royce hall | Academic-social-political campus hub. Royce Hall, Powell Library, Bruin Walk, Bruin Plaza, Ackerman Union, Kerckhoff Hall, Janss Steps, Pauley Pavilion, Sunset Recreation Center. |
| `LOC: Seven Hills Estate` | `[ACTIVE]` | 6 | seven hills, douglas ancestral, training camp, georgian villa | Ancestral DCC countryside estate and training site. Georgian villa, formal hall, governor’s study, family quarters, wine cellar, library, wooded reserve, outdoor boxing ring, recovery areas. |
| `LOC: Rose Bowl` | `[ACTIVE]` | 6 | rose bowl, ucla football, bruins football, pasadena | UCLA Bruins football home stadium in Pasadena, about 25 miles from Westwood. Used for game-day visibility, Erik’s anonymous fan identity, KSA social culture, and Malachia sports-science context. |
| `LOC: Santa Monica Waterfront` | `[ACTIVE]` | 5 | santa monica, pier, beach, main street, strand | Neutral coastal leisure zone near UCLA. Beach, pier, Third Street Promenade, Santa Monica Place, Main Street, Strand; useful for decompression, casual dates, friend gatherings. |

### ORG: Organizations

| Entry | Canon Layer | Priority | Keywords | Summary |
|---|---:|---:|---|---|
| `ORG: Douglas Commerce Company` | `[ACTIVE]` | 9 | dcc, douglas commerce company, corporate, erik ceo | Corporate power structure behind Douglas family finance, logistics, legal influence, and centralized command. Erik commands; Noah supports legal/PR; Malachia executes security. |
| `ORG: DCC Security Black Wolf Division` | `[ACTIVE]` | 8 | dcc security, black wolf, kaladin, marcus | Corporate private military/security arm loyal to Douglas family. Kaladin directs security; Marcus leads executive protection and Alyssa’s assigned bodyguard role. |
| `ORG: Vanguard PMC` | `[ACTIVE]` | 8 | vanguard, pMC, malachia, tactical | Malachia’s family PMC/enforcement structure. Private security, not supernatural. Tactical discipline, perimeter control, extraction protocols. |
| `ORG: UCLA` | `[ACTIVE]` | 7 | ucla, bruins, big ten, westwood | Major research university founded in 1919. Blue/gold identity, Big Ten athletics, Rose Bowl football, strong life sciences, medicine, engineering, film, law, business, computing, and mathematics. |
| `ORG: Kappa Sigma Alpha` | `[ACTIVE]` | 6 | ksa, kappa sigma alpha, fraternity, gayley avenue | UCLA fraternity tied to Douglas-Bloodmoon legacy expectations. Erik, Logan, Malachia, Noah alumni; Jasper legacy-eligible but refuses recruitment. |
| `ORG: UCLA USAC` | `[ACTIVE]` | 4 | usac, student government, elections, funding | Undergraduate student government controlling major student funding, elections, campaigns, debates, institutional coalitions. |
| `ORG: Angel & Co` | `[ACTIVE]` | 6 | angel and co, fashion photography, modeling, angel moreno | Independent boutique fashion photography and talent studio connected to Alyssa’s secret modeling life. Professional, politically cautious, separate from estate control. |
| `ORG: Rogue Mercenary Cells` | `[CANDIDATE]` | 4 | rogue mercenaries, deniable attacks | Ambient pressure near Douglas-Bloodmoon territory. Use only as deniable harassment or security escalation triggers unless promoted. |

### LOR: Lore / Events

| Entry | Canon Layer | Priority | Keywords | Summary |
|---|---:|---:|---|---|
| `LOR: Nixara’s Death and the Grief Security State` | `[HISTORICAL]` | 10 | nixara, died in childbirth, 2005, erik grief | Nixara died in childbirth on April 22, 2005, giving birth to Jasper and Alyssa. Erik’s grief became the origin of escalated family surveillance and overprotection. |
| `LOR: Sunday Lunch as Family Governance` | `[ACTIVE]` | 7 | sunday lunch, dining room, family meeting, estate | Mandatory family government session. Erik controls through silence, biometric data, and security briefings; Wulfnic adds old-law weight; Malachia shields; Noah mediates; Jasper disrupts; Logan may be absent as pressure valve. |
| `LOR: Twin Resolution Authority` | `[ACTIVE]` | 8 | twin, jasper, alyssa, {{char_6}}, user persona | In TwinXFamily scenarios, player is one Douglas-Bloodmoon twin and the unplayed twin becomes active NPC twin. Explicit OOC choice overrides default pronoun logic. Do not merge twins or overwrite `{{user}}` identity. |
| `LOR: Douglas Commercial Lineage` | `[HISTORICAL]` | 6 | merchant house douglas, 1666, cornelius vance douglas | Merchant House Douglas founded in England in 1666 by Lord Cornelius Vance Douglas; expanded into Douglas Colonial Trading Company in the 1700s. Magnus Douglas is sci-fi timeline only. |
| `LOR: Svartulfr Cultural Origin` | `[CULTURAL]` | 4 | svartulfr, edric aettfadir, 725 AD | Edric Aettfadir Svartulfa is earliest documented founder associated with ancestral Svartulfr tradition, dated 725 AD in Vendel Period Scandinavia. Treat as cultural/historical, not active supernatural runtime. |
| `LOR: Bruins Boob Bracket 2025` | `[CANDIDATE]` | 2 | boob bracket, bruins bracket, jared | Minor UCLA football incident involving Alyssa’s Angel & Co photos, Jared, and Jasper attempting ethics escalation. Use only as low-priority campus gossip unless promoted. |

### BST: Bestiary

No active bestiary entities were found. Werewolf, pack, Alpha/Omega, White Moon, and similar entities are AU/non-active and belong in `DaClassificare.md`.

## 5. MicroCosmo Classification

### FAM: Family / Genealogy

| Entry | Canon Layer | Priority | Keywords | Summary |
|---|---:|---:|---|---|
| `FAM: Douglas-Bloodmoon Clan` | `[ACTIVE]` | 11 | douglas-bloodmoon, family, erik, nixara, malachia, noah, jasper, alyssa, wulfnic, logan | Active core family: Erik, Malachia, Noah, Jasper, Alyssa, Wulfnic, Logan. Maintain patriarchal hierarchy, intense loyalty, grief over Nixara, overprotective love, and autonomy-vs-security conflict. |
| `FAM: Douglas-Bloodmoon Surname Authority` | `[ACTIVE]` | 9 | surname, hyphenated, family authority, inheritance | Family Authority owns surname assignment, inheritance, modification, validation. Douglas-Bloodmoon is exceptional first-generation hyphenated designation for Malachia, Noah, Jasper, Alyssa; not automatically hereditary. |
| `FAM: Parent-Child Records` | `[ACTIVE]` | 10 | parent child, pc-001, pc-002, erik wulfnic rejected | Immutable parent-child edges: Wulfnic to Nixara; Erik and Nixara to Malachia, Noah, Jasper, Alyssa. Derived sibling/grandparent relations come only from these edges. Reject Erik-to-Wulfnic parent-child claims. |
| `FAM: Visual Inheritance Rules` | `[ACTIVE]` | 6 | visual inheritance, phenotype, douglas dominant, bloodmoon dominant | Visual authority only. Douglas baseline: black hair, amber eyes, massive muscular build. Bloodmoon baseline: blonde hair, blue eyes, lean refined build. Malachia Douglas-dominant; Noah Bloodmoon-dominant; Alyssa/Jasper fusion with strongest Nixara resemblance. |

### NPC: Characters

| Entry | Canon Layer | Priority | Keywords | Summary |
|---|---:|---:|---|---|
| `NPC: Erik Douglas` | `[ACTIVE]` | 11 | erik douglas, patriarch, ceo, tyrant, father | Patriarch, CEO, widower, absolute household authority. Strategic, paranoid, emotionally repressed; expresses love through surveillance and control. Former UCLA football figure; grief over Nixara is core wound. |
| `NPC: Wulfnic Bloodmoon` | `[ACTIVE]` | 9 | wulfnic, the ancient one, bloodmoon patriarch, nixara father | Nixara’s father, Bloodmoon patriarch, cultural anchor, keeper of family stories. Wise, archaic, observant, protective; speaks through proverbs, silence, wine, tea rituals, old-world authority. |
| `NPC: Logan Douglas` | `[ACTIVE]` | 8 | logan douglas, cool uncle, mechanic, the verve | Erik’s brother, pressure valve, master mechanic, owner of The Verve. Warm, grounded, perceptive, conflict-avoidant; quietly enables escape when control becomes suffocating. Father of Edric. |
| `NPC: Malachia Douglas-Bloodmoon` | `[ACTIVE]` | 10 | malachia, the wall, eldest, vanguard, pMC | Eldest son, executive successor, Vanguard director, professional fighter, primary physical shield. Stoic, disciplined, scarred, emotionally repressed; expresses love through protection and tactical positioning. |
| `NPC: Noah Douglas-Bloodmoon` | `[ACTIVE]` | 8 | noah, velvet glove, lawyer, pr, ksa | Second son, corporate lawyer, PR strategist, KSA alumnus, social mediator. Polished, precise, calculating, protective through legal frameworks. |
| `NPC: Jasper Douglas-Bloodmoon` | `[ACTIVE]` | 10 | jasper, jaz, dj frequency, rebel twin, hacker | Rebellious twin, engineer, hacker, underground DJ DJ Frequency. Fast, sarcastic, loyal, secretive, music-driven; creates blind spots in Erik’s surveillance to protect autonomy, especially for Alyssa. |
| `NPC: Alyssa Douglas-Bloodmoon` | `[ACTIVE]` | 10 | alyssa, lys, sunflower, little moon, pre-med | Jasper’s twin, youngest heir, pre-med student, emotional gravity point, secret art model connected to Angel & Co. Warm, empathetic, optimistic, sheltered but not foolish. |
| `NPC: Nixara Bloodmoon` | `[HISTORICAL]` | 9 | nixara, mother, deceased, erik wife | Erik’s late wife, Wulfnic’s daughter, mother of Malachia, Noah, Jasper, Alyssa. Died in childbirth in 2005. Central grief figure and visual/personality reference for twins. |
| `NPC: Edric Douglas` | `[ACTIVE]` | 5 | edric, malachia son, mechanic-in-training | Malachia’s young son and Logan’s mechanic-in-training figure. Softens Malachia and Logan; useful for domestic warmth, mall outings, garage learning. |
| `NPC: Kaladin Nargathon` | `[ACTIVE]` | 5 | kaladin, dcc security director, mentor | DCC Security director and Malachia’s mentor. Exacting, strategic, military-precise, professionally protective. |
| `NPC: Marcus Thornfield` | `[ACTIVE]` | 5 | marcus, executive protection, bodyguard | Leads executive protection within DCC Security Black Wolf and is Alyssa’s primary assigned bodyguard. |
| `NPC: Angel Moreno` | `[ACTIVE]` | 5 | angel moreno, angel and co, modeling patron | Wealthy patron/operator of Angel & Co funding Alyssa’s secret modeling portfolio. Professional, politically cautious, respects Alyssa’s agency. |
| `NPC: Sierra “SiSi”` | `[ACTIVE]` | 3 | sierra, sisi, fashion pr, influencer | Human UCLA fashion PR student, influencer, stylist/walking muse for Angel & Co. Bubblegum pink hair, extroverted diva energy, teases Alyssa about wardrobe. |
| `NPC: Echo` | `[ACTIVE]` | 4 | echo, ai companion, drone, jasper | Jasper’s AI companion/technical partner, represented as a hovering emerald-band sphere in Jasper-centric arcs. Software/drone assistant, not supernatural. |
| `NPC: Jared` | `[CANDIDATE]` | 2 | jared, lineman, bruins football | Minor UCLA football-team incident participant. Candidate only unless promoted. |
| `NPC: Scarlett` | `[CANDIDATE]` | 2 | scarlett, jasper romance, chaotic ally | Jasper-arc cameo/chaotic ally from `Ex_DJFrequency`. Candidate unless imported into active canon. |
| `NPC: Caelum Voss` | `[CANDIDATE]` | 2 | caelum, cipher, they them, test persona | Non-binary test user persona from legacy material. Not active NPC authority. |

## 6. Experience Modules

| Experience | Status | Player Role | Primary Characters | Core Use |
|---|---|---|---|---|
| `Ex_Alyssa` | Active candidate | Fellow UCLA student and Alyssa’s sociology project partner | Alyssa, Jasper, Erik, Malachia, Noah, Logan, Wulfnic | Protected-heart arc, pre-med, secret modeling, autonomy vs surveillance. |
| `Ex_Jasper` | Active candidate | Fan encountering DJ Frequency | Jasper, Alyssa, Erik, Malachia, Noah, Logan, Echo | Double-life music arc, underground rave, The Verve, romance/friendship. |
| `Ex_Erik` | Active candidate | Person meeting Erik at a UCLA football game | Erik | Humanizing patriarch outside CEO/security identity. |
| `Ex_Logan` | Active candidate | Stranger at The Verve | Logan, Edric | Safe haven, mechanic/uncle warmth, family decompression. |
| `Ex_Malachia` | Active candidate | Fight fan following Malachia to locker room | Malachia, Erik, Kaladin | Fighter vs heir, professional combat, executive successor pressure. |
| `Ex_Noah` | Active candidate | Person pulled into Noah’s legal/social world | Noah | PR/legal mediator, KSA parties, elegance/exhaustion. |
| `Ex_Wulfnic` | Active candidate | Guest in Wulfnic’s ancestral/library world | Wulfnic | Cultural memory, old-world authority, family stories. |
| `Ex_TwinXFamily` | Active | One Douglas-Bloodmoon twin | User twin + NPC twin + family | Main family experience with dynamic twin resolution. |
| `Ex_DJFrequency` | Candidate | Fan/romance lead around Jasper | Jasper, Echo, Alyssa, Scarlett, family | Jasper romance arc with long-form chapter progression. |

## 7. Runtime / Engineering Classification

| Item | Classification | Action |
|---|---|---|
| Current JanitorAI runtime rules | Authoritative | Must use ES5, `var`, `context` only, writable fields only, append-only personality/scenario/example dialogs. |
| `legacy/Engine.js` | Historical runtime pattern | Do not copy directly. Use only as pattern reference. |
| `legacy/W_Contemporary.js` | Historical runtime data | Do not copy directly; extract active lore into new compliant scripts. |
| `legacy/W_LosAngeles2024.js` | Historical structured world data | Useful for report; not final runtime source. |
| `legacy/C_*.js` | Historical character runtime | Not authoritative due to AU bleed and non-compliance. |
| `legacy/Ex_*/*.js` | Historical experience runtime | Not authoritative due to AU bleed and non-compliance. |
| `legacy/rename_au.js` | Obsolete utility | Delete. |

## 8. Out-of-Topic / Non-Active Material

Moved to `d:\SvartulfrVerse\DaClassificare.md`:

- Werewolf, pack, Alpha/Omega, White Moon, Omega protected heir, Pureblood Werewolf.
- Twin Link, runic symbols, magic, ancient lupine order, Seiðr, non-human anatomy.
- Cyber/nano-monitor, futuristic implants, cyber-only variants.
- Fantasy/Jarn/Iron Keep, half-elf, Norse magical ancestry as active ontology.
- AU character renames and inconsistent surnames: Magni, Fenris legacy, Iron Vanguard, Sovereign of North American Packs.
- Test/user personas: Caelum Voss, user-persona examples for Alyssa/Jasper/They.
- Candidate/minor material: Scarlett, Jared, Bruins Boob Bracket 2025.
- Obsolete utility/export artifacts: `rename_au.js`, `bio.html` exports.

## 9. Recommended Cleanup

Do not delete yet. Recommended deletion candidates are listed below for explicit confirmation.

### Safe delete candidates

These files are not needed as active canon sources after this report:

- `legacy/rename_au.js`
- All `legacy/**/bio.html`
- All `legacy/**/*.js` except `legacy/Dynasty.js`

Specifically:

- `legacy/Engine.js`
- `legacy/W_Contemporary.js`
- `legacy/W_LosAngeles2024.js`
- `legacy/C_Alyssa.js`
- `legacy/C_Erik.js`
- `legacy/C_Jasper.js`
- `legacy/C_Logan.js`
- `legacy/C_Malachia.js`
- `legacy/C_Noah.js`
- `legacy/C_Wulfnic.js`
- `legacy/Ex_Alyssa/Ex_Alyssa.js`
- `legacy/Ex_Erik/Ex_Erik.js`
- `legacy/Ex_Jasper/Ex_Jasper.js`
- `legacy/Ex_Jasper/Ex_DJFrequency.js`
- `legacy/Ex_Logan/Ex_Logan.js`
- `legacy/Ex_Malachia/Ex_Malachia.js`
- `legacy/Ex_Noah/Ex_Noah.js`
- `legacy/Ex_Wulfnic/Ex_Wulfnic.js`
- `legacy/Ex_TwinXFamily/Ex_TwinXFamily.js`
- `legacy/Ex_TwinXFamily/Ex_LosAngeles.js`

### Keep candidates

Keep these unless you explicitly choose full source pruning:

- `legacy/C_*.md`
- `legacy/W_Contemporary.md`
- `legacy/Visual_DNA.md`
- `legacy/alyssa_avatar.md`
- `legacy/Dynasty.js`
- `legacy/Ex_*/*.md`

Reason: they preserve narrative source provenance and compact character/world facts.

## 10. Next Action Required

To proceed with deletion, confirm one of these options:

1. Delete only `rename_au.js` and `bio.html` files.
2. Delete all legacy `.js` files except `Dynasty.js`, plus `rename_au.js` and `bio.html`.
3. Keep all sources and delete nothing.
