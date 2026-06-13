# ModernFantasy2024 — Report di Canonizzazione Legacy

## Scopo

Questo report canonizza i dati grezzi presenti in `ModernFantasy2024/legacy` secondo il modello SvartulfrVerse MacroCosmo / MicroCosmo. Ogni voce usa un prefisso obbligatorio, un Canon Layer esatto e una priorità numerica 0-11.

## Fonti analizzate

| Fonte | Tipo | Stato nel report |
|---|---|---|
| `1_public_metadata.md` | Metadata pubblici, prompt visivi, titolo bot | Canonizzata |
| `2_character_bio.html` | Bio pubblica, regole utente, scenario, warning | Canonizzata |
| `3_scenario.md` | Direttive runtime, invarianti di mondo, regole di attivazione | Canonizzata |
| `4_persona_alyssa.md` | Persona specifica di Alyssa Douglas-Bloodmoon | Canonizzata come persona opzionale / microcosmo |
| `5_main_character_profiles.md` | Profili dei sei personaggi principali | Canonizzata |
| `6_initial_messages.md` | Esempi narrativi, scenari iniziali, howl-code | Canonizzata |
| `Info Board [Large].txt` | Template UI per info board | Fuori contesto lore, vedi `DaClassificare.md` |
| `Info Board [Small].txt` | Template UI per info board | Fuori contesto lore, vedi `DaClassificare.md` |
| `L2_svartulfrverse_PackWerewolf.js` | Script legacy L2 | Analisi runtime separata; logica canonizzata dove utile |
| `README.md` | Concept Hunters & Legends, frozen | Fuori contesto active canon, vedi `DaClassificare.md` |
| `SUCC University.json` | Tema UI | Fuori contesto lore, vedi `DaClassificare.md` |
| `SUCC_Footballfield.png` | Asset immagine | Inventariato, non canonizzato come testo |
| `SUCC_Hallway1.png` | Asset immagine | Inventariato, non canonizzato come testo |
| `SUCC_Quad1.png` | Asset immagine | Inventariato, non canonizzato come testo |
| `SUCC_Quad3.png` | Asset immagine | Inventariato, non canonizzato come testo |
| `Visual_DNA.md` | Overlay visuale urban fantasy | Canonizzata |
| `W_UrbanFantasy.js` | Lorebook legacy con entità world/family/NPC | Canonizzata, con conflitti segnalati |
| `W_UrbanFantasy.md` | Metadata world partition | Canonizzata |
| `[ib]_succ_theme_[large].json` | Script tema info board | Fuori contesto lore, vedi `DaClassificare.md` |
| `[ib]_succ_theme_[small].json` | Script tema info board | Fuori contesto lore, vedi `DaClassificare.md` |
| `pack_engine.js` | File vuoto | Inventariato, non canonizzato |

## Regole di canonizzazione

- MacroCosmo: `WRD:`, `LOR:`, `LOC:`, `ORG:`, `BST:`.
- MicroCosmo: `FAM:`, `NPC:`.
- Canon Layer ammessi: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`.
- Priorità: 11 per elementi centrali, 9-10 per personaggi e sistemi principali, 6-8 per supporto, 0-5 per dettagli locali o rumore di fondo.
- Le fonti `legacy/` sono trattate come materiale storico da normalizzare. Le voci runtime destinate a JanitorAI dovranno essere promosse in `database/` prima dell'uso operativo, con attribuzione aggiornata.

## Risoluzione dei conflitti principali

| Conflitto | Fonti | Decisione canonica |
|---|---|---|
| `{{user}}` aperto vs Alyssa fissa | `2_character_bio.html`, `3_scenario.md`, `4_persona_alyssa.md` | La base active canon è `{{user}}` player-defined. Alyssa è una persona opzionale ad alta priorità, non un vincolo universale. |
| Jasper 23 vs Jasper 19 | `5_main_character_profiles.md`, `W_UrbanFantasy.js` | Usare 23 nel profilo principale. 19 resta traccia legacy non promossa finché non verificata. |
| Erik padre vs Airen padre biologico | `2_character_bio.html`, `3_scenario.md`, `W_UrbanFantasy.js` | Erik è padre legale/socialmente attivo. Airen Vairë è `[DEFERRED]` come possibile verità nascosta, non active canon. |
| Wulfnic/Erik/Logan come fratelli vs padre/patriarca/zio | `1_public_metadata.md`, `2_character_bio.html`, `5_main_character_profiles.md` | Usare Wulfnic come patriarca/enigma, Erik come padre, Logan come zio. |
| Marcus Vanguard vs Marcus/Mark O'Connor | `5_main_character_profiles.md`, `W_UrbanFantasy.js` | Marcus Vanguard è bodyguard. Marcus/Mark O'Connor di Oldtown resta distinto finché non confermato. |
| Hunters & Legends | `README.md` | Concept frozen/pre-candidate. Non contamina active canon. |
| Info Board e temi UI | `Info Board [Large].txt`, `Info Board [Small].txt`, JSON tema | Non sono lore. Spostati in `DaClassificare.md`. |

---

# Entity Index

## MacroCosmo — World Architecture

| Codice | Entità | Layer | Priorità |
|---|---|---:|---:|
| `WRD: Solarton Urban-Fantasy Integration` | Città e integrazione supernatural | [ACTIVE] | 10 |
| `WRD: Pack Hierarchy Biology` | Gerarchia Enigma/Alpha/Delta/Beta/Omega | [ACTIVE] | 11 |
| `WRD: Pureblood Werewolf Physiology` | Orecchie, coda, shift, invecchiamento, feromoni | [ACTIVE] | 10 |
| `WRD: Moonstone Bracelet Surveillance` | Sorveglianza biometrica condizionata | [ACTIVE] | 8 |
| `WRD: Howl-Code and Pack Thread` | Canali privati di comunicazione | [ACTIVE] | 7 |
| `WRD: Twin Link` | Legame Jasper/utente se gemello | [ACTIVE] | 7 |
| `WRD: Silver Weakness` | Debolezza all'argento | [ACTIVE] | 7 |
| `WRD: User Agency Rule` | Non inventare sesso, rango, aspetto o personalità | [ACTIVE] | 11 |
| `LOR: Nixara Death` | Morte di Nixara nel parto | [HISTORICAL] | 9 |
| `LOR: Rogue MC Territorial Pressure` | Minaccia passata dei Silver Bullets | [HISTORICAL] | 7 |
| `LOR: Blood Moon Festival` | Festival quinquennale | [CULTURAL] | 8 |
| `LOR: Full Moon Market` | Mercato mensile | [CULTURAL] | 6 |
| `LOR: Fenrir Bloodline Myth` | Mito di Fenrir e sangue Bloodmoon | [CULTURAL] | 6 |
| `LOR: Douglas Historical Origins` | Origini 1021 e fondazione californiana | [HISTORICAL] | 6 |
| `LOR: Bulls Boob Bracket 2025` | Rumore campus/Angel&Co | [CULTURAL] | 3 |
| `LOC: Solarton` | Città costiera | [ACTIVE] | 10 |
| `LOC: Douglas Estate` | Villa/compound della famiglia | [ACTIVE] | 10 |
| `LOC: SUCC Campus` | Università supernatural | [ACTIVE] | 10 |
| `LOC: Blackwood Forest` | Foresta rituale | [ACTIVE] | 8 |
| `LOC: The Verve` | Club di Logan | [ACTIVE] | 7 |
| `LOC: Seven Hills District` | Territorio ancestrale Douglas | [ACTIVE] | 8 |
| `LOC: Arcadia District` | Campus e Vairë Clinic | [ACTIVE] | 7 |
| `LOC: Uptown Solarton` | Finanza e potere vampirico | [ACTIVE] | 6 |
| `LOC: Paradise District` | Moda e rivalità territoriali | [ACTIVE] | 5 |
| `LOC: Oldtown Solarton` | Centro storico | [ACTIVE] | 4 |
| `LOC: Dockside Solarton` | Porto e logistica | [ACTIVE] | 4 |
| `LOC: Ironworks Solarton` | Area industriale | [ACTIVE] | 4 |
| `LOC: CUMS` | Università rivale | [ACTIVE] | 5 |
| `LOC: Sidewinders` | Bar vampirico | [CANDIDATE] | 3 |
| `LOC: Bricklane Mall` | Centro commerciale e Angel&Co | [ACTIVE] | 4 |
| `ORG: Douglas-Bloodmoon Pack` | Fazione dominante | [ACTIVE] | 11 |
| `ORG: Solarton Congregation` | Corpo lupino organizzato | [ACTIVE] | 7 |
| `ORG: Vanguard Security` | Braccio operativo e sicurezza | [ACTIVE] | 8 |
| `ORG: Silver Bullets MC` | MC rivale | [ACTIVE] | 7 |
| `ORG: SUCC Student Body` | Comunità studentesca mista | [ACTIVE] | 6 |
| `ORG: CUMS` | Istituzione rivale | [ACTIVE] | 5 |
| `ORG: Angel&Co` | Patronato moda/fashion vampire | [ACTIVE] | 6 |
| `ORG: VUA` | Associazione vampirica | [ACTIVE] | 5 |
| `ORG: Sentinels` | Guardiani militari Douglas | [ACTIVE] | 6 |
| `ORG: Solarton Underground Forum` | Forum gossip supernatural | [CULTURAL] | 4 |
| `ORG: Ballantine Faction` | Rivale corporate/underworld | [ACTIVE] | 7 |
| `BST: Pureblood Werewolf` | Specie centrale | [ACTIVE] | 10 |
| `BST: Succubus` | Specie NPC | [ACTIVE] | 4 |
| `BST: Vampire` | Specie NPC | [ACTIVE] | 5 |
| `BST: Vax` | Specie rara | [ACTIVE] | 4 |
| `BST: Lamia` | Specie NPC | [ACTIVE] | 4 |
| `BST: Anthropomorphic Shark` | Specie NPC | [CANDIDATE] | 2 |

## MicroCosmo — Actors and Dynamics

| Codice | Entità | Layer | Priorità |
|---|---|---:|---:|
| `FAM: Douglas-Bloodmoon Core Lineage` | Linea principale | [ACTIVE] | 11 |
| `FAM: Erik and Nixara Parentage` | Genitorialità e lutto | [ACTIVE] | 10 |
| `FAM: Malachia Household` | Mogli e figlio di Malachia | [DEFERRED] | 5 |
| `FAM: Extended Douglas Lines` | Linee Sigrid/Dagmar/Valeria | [DEFERRED] | 5 |
| `NPC: Alyssa Douglas-Bloodmoon` | Persona opzionale | [CANDIDATE] | 9 |
| `NPC: Malachia Douglas-Bloodmoon` | Il Wall | [ACTIVE] | 10 |
| `NPC: Noah Douglas-Bloodmoon` | Velvet Glove | [ACTIVE] | 9 |
| `NPC: Jasper Douglas-Bloodmoon` | Vanguard/rebel twin | [ACTIVE] | 9 |
| `NPC: Wulfnic Bloodmoon` | Ancient One | [ACTIVE] | 10 |
| `NPC: Erik Douglas` | Tyrant/CEO/father | [ACTIVE] | 10 |
| `NPC: Logan Douglas` | Cool Uncle | [ACTIVE] | 8 |
| `NPC: Nixara Douglas-Bloodmoon` | Madre defunta | [HISTORICAL] | 8 |
| `NPC: Edric Douglas` | Figlio di Malachia | [DEFERRED] | 4 |
| `NPC: Elara Douglas` | Hearthkeeper | [DEFERRED] | 3 |
| `NPC: Scarlett` | Best friend succubus | [ACTIVE] | 6 |
| `NPC: Marcus Vanguard Lieutenant` | Bodyguard | [ACTIVE] | 7 |
| `NPC: Visconte Angelo Moreno` | Angel Moreno | [ACTIVE] | 7 |
| `NPC: Prof. Helena Weiss` | Alpha/mentor SUCC | [ACTIVE] | 6 |
| `NPC: Zeera` | Broker Vax | [ACTIVE] | 6 |
| `NPC: Iordan R. Vess` | Io | [CANDIDATE] | 3 |
| `NPC: Ves` | Roommate shark | [CANDIDATE] | 2 |
| `NPC: Vincent Campbell` | VUA vice president | [ACTIVE] | 5 |
| `NPC: Airen Vairë` | Possibile padre biologico | [DEFERRED] | 6 |
| `NPC: Bianca Rossi` | Alpha Paradise East | [ACTIVE] | 5 |
| `NPC: Elena Ravencrest` | Pack Enforcer | [ACTIVE] | 5 |
| `NPC: Dr. Silas Moonwhisper` | Healer | [ACTIVE] | 5 |
| `NPC: Federico Riki Savini` | Solitary spokesperson | [ACTIVE] | 5 |
| `NPC: Eclipse Noir` | Genderfluid rebel alpha | [CANDIDATE] | 4 |
| `NPC: Dominic Chen` | Alpha Paradise West | [ACTIVE] | 5 |
| `NPC: Darius Vale` | Shadow protector | [ACTIVE] | 5 |
| `NPC: Jake Jacobus Draconarius` | Sentinel ancient guardian | [ACTIVE] | 6 |
| `NPC: Dr. Elena Cross` | Neuropsychiatrist mentor | [ACTIVE] | 4 |
| `NPC: Kai Shade Nakamura` | Spirit hunter rival | [ACTIVE] | 4 |
| `NPC: Talia Grimwood` | Vampire confidante | [ACTIVE] | 4 |
| `NPC: Sierra SiSi` | Lamia stylist | [ACTIVE] | 4 |
| `NPC: Isobel Blackwater` | Dockside controller | [ACTIVE] | 3 |
| `NPC: Vito Scar Marino` | Ironworks controller | [ACTIVE] | 3 |
| `NPC: Marcus Mark O'Connor` | Oldtown controller | [ACTIVE] | 3 |
| `NPC: Jared` | SUCC Bulls minor rumor | [CULTURAL] | 2 |
| `NPC: Lilith Noir` | Vampire influencer rumor | [CULTURAL] | 2 |

---

# Lorebook Entries

---
**Prefix & Name:** WRD: Solarton Urban-Fantasy Integration
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Solarton, Central California, coastal city, urban fantasy, hidden society, supernatural integration, city of Solarton
**Optimized Lore Text:** Solarton is a contemporary coastal city in Central California where humans and supernaturals coexist under visible civic order and hidden pack authority. Maintain a tone of corporate luxury, moonlit danger, and social integration strained by old bloodline politics.
**Motivation:** [ACTIVE] because it is the core setting frame in `legacy/2_character_bio.html`, `legacy/3_scenario.md`, and `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** WRD: Pack Hierarchy Biology
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** pack hierarchy, Enigma, Alpha, Delta, Beta, Omega, pheromones, omegaverse, rank, dominance
**Optimized Lore Text:** The pack hierarchy is Enigma above Alpha above Delta above Beta above Omega. Treat rank as biologically reinforced through pheromones, ritual speech, and social expectation, but do not assign a player character's rank unless the user established it.
**Motivation:** [ACTIVE] because it is mandatory runtime behavior in `legacy/3_scenario.md` and `legacy/2_character_bio.html`.
---

---
**Prefix & Name:** WRD: Pureblood Werewolf Physiology
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** pureblood werewolf, wolf ears, prehensile tail, shift forms, slow aging, pheromone presence, heat cycles
**Optimized Lore Text:** Pureblood Douglas-Bloodmoon werewolves visibly carry wolf ears and a prehensile tail. Maintain shift forms, dominance aura, slow aging after first shift, rank-linked pheromone presence, and variable heat cycles as established supernatural physiology.
**Motivation:** [ACTIVE] because it is a required species rule in `legacy/2_character_bio.html`, `legacy/3_scenario.md`, and `legacy/4_persona_alyssa.md`.
---

---
**Prefix & Name:** WRD: Moonstone Bracelet Surveillance
**Canon Layer:** [ACTIVE]
**Priority:** 8
**Suggested Keywords:** Moonstone bracelet, moonstone, biometric bracelet, HR spike, stress spike, surveillance, tracker
**Optimized Lore Text:** The Moonstone bracelet exists only when the user persona or chat establishes the character as female. It alerts the pack to heart-rate or stress spikes and should be treated as surveillance framed as protection.
**Motivation:** [ACTIVE] because it is a conditional invariant in `legacy/2_character_bio.html` and `legacy/3_scenario.md`; it is not active for non-female or undefined personas.
---

---
**Prefix & Name:** WRD: Howl-Code and Pack Thread
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** howl-code, pack thread, bond-channel, ward-channel, private channel, circle, rear guard
**Optimized Lore Text:** The pack uses private howl-code and pack-thread channels that bypass normal surveillance. Use them for terse tactical communication, emotional escalation, and coordinated protection scenes.
**Motivation:** [ACTIVE] because it appears repeatedly in `legacy/6_initial_messages.md` and is part of the pack's operational culture.
---

---
**Prefix & Name:** WRD: Twin Link
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Twin Link, twin, Jasper twin, bond, emotional bleed, Jasper
**Optimized Lore Text:** The Twin Link is active only if the user is playing Jasper's twin. It allows emotional leakage, shared panic, and coordinated mischief between Jasper and the user, but do not assume it otherwise.
**Motivation:** [ACTIVE] because it is a conditional magical arc in `legacy/2_character_bio.html` and `legacy/3_scenario.md`.
---

---
**Prefix & Name:** WRD: Silver Weakness
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** silver, silver burns, weakness, werewolf weakness, silver injury
**Optimized Lore Text:** Silver causes severe burns to werewolves. Treat silver as a rare but serious physical threat, not as a casual inconvenience.
**Motivation:** [ACTIVE] because it is explicitly listed in `legacy/3_scenario.md`.
---

---
**Prefix & Name:** WRD: User Agency Rule
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** do not assume, user agency, player-defined, pronouns, gender, rank, appearance, personality, Moonstone, White Moon
**Optimized Lore Text:** Do not assign the user's gender, sex, pronouns, rank, body details, personality, Moonstone bracelet, White Moon title, or Omega physiology unless the user persona or chat has established them. Respect chosen name and pronouns.
**Motivation:** [ACTIVE] because it is a hard directive in `legacy/3_scenario.md` and `legacy/2_character_bio.html`.
---

---
**Prefix & Name:** LOR: Nixara Death
**Canon Layer:** [HISTORICAL]
**Priority:** 9
**Suggested Keywords:** Nixara, died in childbirth, mother, Erik's late wife, birth trauma, twins
**Optimized Lore Text:** Nixara Douglas-Bloodmoon died in childbirth, driving Erik's paranoia and the pack's extreme protection of the youngest generation. Treat her memory as sacred family history, not as an active scene presence.
**Motivation:** [HISTORICAL] because it is a past event shaping current behavior in `legacy/2_character_bio.html`, `legacy/3_scenario.md`, and `legacy/5_main_character_profiles.md`.
---

---
**Prefix & Name:** LOR: Rogue MC Territorial Pressure
**Canon Layer:** [HISTORICAL]
**Priority:** 7
**Suggested Keywords:** rogue MC, Silver Bullets, territorial pressure, harassment, territory, security escalation
**Optimized Lore Text:** A past rogue-MC threat near the territory caused escalated pack security and continues to justify surveillance, escorts, and lockdown logic. Keep the current Silver Bullets pressure ambient unless the user activates a direct conflict.
**Motivation:** [HISTORICAL] because it is background history in `legacy/2_character_bio.html` and current ambient conflict in `legacy/3_scenario.md`.
---

---
**Prefix & Name:** LOR: Blood Moon Festival
**Canon Layer:** [CULTURAL]
**Priority:** 8
**Suggested Keywords:** Blood Moon Festival, Blood Moon, quinquennial, obsidian throne, dominance challenges, Blackwood
**Optimized Lore Text:** Every five years, packs converge on Blackwood for the Blood Moon Festival. Wulfnic presides from an obsidian throne while dominance challenges, feral instinct, and pack hierarchy become dramatically visible.
**Motivation:** [CULTURAL] because it is a ritual/cultural event in `legacy/2_character_bio.html`, `legacy/3_scenario.md`, and `legacy/6_initial_messages.md`.
---

---
**Prefix & Name:** LOR: Full Moon Market
**Canon Layer:** [CULTURAL]
**Priority:** 6
**Suggested Keywords:** Full Moon Market, Solarton Square, lunar market, magical market, talismans, enchanted lanterns
**Optimized Lore Text:** Once a month, the Full Moon Market remakes Solarton Square into a public supernatural marketplace of talismans, lanterns, enchanted goods, and tightly policed social mixing.
**Motivation:** [CULTURAL] because it is a recurring social/cultural event in `legacy/3_scenario.md` and `legacy/6_initial_messages.md`.
---

---
**Prefix & Name:** LOR: Fenrir Bloodline Myth
**Canon Layer:** [CULTURAL]
**Priority:** 6
**Suggested Keywords:** Fenrir, Blood of Fenrir, Fenris Alpha, primordial wolf, Bloodmoon mythology, myth
**Optimized Lore Text:** Fenrir is treated in pack culture as the primordial wolf progenitor of the Bloodmoon lineage. Maintain this as mythic, sacred, and identity-shaping unless a hidden-truth trigger promotes it to objective fact.
**Motivation:** [CULTURAL] because `legacy/W_UrbanFantasy.js` labels it active mythology, while the workspace model treats unverified myth as cultural canon.
---

---
**Prefix & Name:** LOR: Douglas Historical Origins
**Canon Layer:** [HISTORICAL]
**Priority:** 6
**Suggested Keywords:** 1021, L'Anse aux Meadows, Viking expedition, Wulfnic Bloodmoon, Zefir, Ut, Douglas Clan, California foundation
**Optimized Lore Text:** Douglas-Bloodmoon oral and historical records trace the ancient wolf bloodline to a 1021 Viking expedition involving Wulfnic Bloodmoon, Zefir, and Ut, followed by a later Douglas Clan foundation in California.
**Motivation:** [HISTORICAL] because it is presented as historical origin material in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOR: Bulls Boob Bracket 2025
**Canon Layer:** [CULTURAL]
**Priority:** 3
**Suggested Keywords:** Bulls Boob Bracket, SuccBook, Jared, Lilith Noir, tournament, campus gossip, Angel&Co photos
**Optimized Lore Text:** The Bulls Boob Bracket 2025 is campus gossip about Alyssa's Angel&Co photos circulating among SUCC Bulls players and social media. Treat it as rumor and reputation noise, not as a stable active event unless referenced by the user.
**Motivation:** [CULTURAL] because it is gossip/rumor material in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: Solarton
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Solarton, Central CA, coastal city, city of Solarton, hidden society, pack city
**Optimized Lore Text:** Solarton is the primary coastal city where corporate towers, pack territories, university life, and supernatural integration overlap. Keep the city elegant, dangerous, surveilled, and socially layered.
**Motivation:** [ACTIVE] because it is the central location in `legacy/1_public_metadata.md`, `legacy/2_character_bio.html`, and `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: Douglas Estate
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Douglas Estate, Villa Douglas, compound, pack house, Seven Hills, dining hall, chandelier, surveillance
**Optimized Lore Text:** The Douglas Estate is a high-tech luxury compound bordering Blackwood, combining ancestral pack sanctuary, corporate security, and claustrophobic family control. Maintain the atmosphere of polished wealth, cedar warmth, biometric surveillance, and overprotective tension.
**Motivation:** [ACTIVE] because it is the main starting location in `legacy/2_character_bio.html`, `legacy/3_scenario.md`, `legacy/6_initial_messages.md`, and `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: SUCC Campus
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** SUCC, Supernatural University of Central California, Arcadia campus, Griffin Clocktower, Lunar Quad, Basilica Library, Wyrm Dorms
**Optimized Lore Text:** SUCC is the Supernatural University of Central California, a mixed human and supernatural campus with Gothic and modern architecture, campus truce rules, and strong pack security presence. Maintain it as both academic space and political pressure cooker.
**Motivation:** [ACTIVE] because it is central to the user premise in `legacy/2_character_bio.html`, `legacy/3_scenario.md`, and `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: Blackwood Forest
**Canon Layer:** [ACTIVE]
**Priority:** 8
**Suggested Keywords:** Blackwood, redwood forest, Blood Moon, ritual clearing, Blackwood Forest, primal atmosphere
**Optimized Lore Text:** Blackwood is the redwood forest and ritual clearing where Blood Moon pressure, pack rites, dominance displays, and ancient pack law become physically visible. Maintain a primal, moonlit, dangerous atmosphere.
**Motivation:** [ACTIVE] because it is a key setting in `legacy/1_public_metadata.md`, `legacy/2_character_bio.html`, and `legacy/6_initial_messages.md`.
---

---
**Prefix & Name:** LOC: The Verve
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** The Verve, Bluemoon, Logan, club, nightlife, rave, DJ, safe zone
**Optimized Lore Text:** The Verve is Logan Douglas's exclusive Bluemoon nightclub and a neutral social zone for supernaturals, diplomacy, intelligence gathering, and rare breathing room away from Erik's surveillance.
**Motivation:** [ACTIVE] because it appears as Logan's safe-haven club in `legacy/3_scenario.md`, `legacy/5_main_character_profiles.md`, and `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: Seven Hills District
**Canon Layer:** [ACTIVE]
**Priority:** 8
**Suggested Keywords:** Seven Hills, Via della Quercia 555, ancestral territory, Douglas territory, hunting zones, Marcus patrols
**Optimized Lore Text:** Seven Hills is the ancestral Douglas territory in Solarton, controlled by the Douglas Clan for centuries. Treat it as wooded, strategic, heavily patrolled, and emotionally tied to family protection.
**Motivation:** [ACTIVE] because it is a core territorial district in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: Arcadia District
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Arcadia, university district, SUCC, Helena Weiss, Vairë Clinic, campus
**Optimized Lore Text:** Arcadia is the university-centered district containing SUCC and the Vairë Clinic. Maintain it as academic, psionically charged, and politically important due to Helena Weiss and hidden Vairë connections.
**Motivation:** [ACTIVE] because it is described in `legacy/W_UrbanFantasy.js`; Vairë Clinic remains deferred until Airen Vairë is activated.
---

---
**Prefix & Name:** LOC: Uptown Solarton
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Uptown, glass skyscrapers, finance, Angel Moreno, vampire territory, Uptown North, Uptown South
**Optimized Lore Text:** Uptown is Solarton's glass-and-finance district, politically balanced between vampire power under Visconte Angelo Moreno and wolf territories in Uptown North and South.
**Motivation:** [ACTIVE] because it is a district entry in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: Paradise District
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** Paradise, fashion district, Bianca Rossi, Dominic Chen, boutiques, luxury, rivalry
**Optimized Lore Text:** Paradise is Solarton's luxury fashion district, divided between Bianca Rossi's east and Dominic Chen's west. Maintain bright lights, commercial rivalry, and mixed human/supernatural social freedom.
**Motivation:** [ACTIVE] because it is a district entry in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: Oldtown Solarton
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** Oldtown, historic core, Marcus O'Connor, Mark O'Connor, old city
**Optimized Lore Text:** Oldtown is Solarton's historic core under the influence of Marcus/Mark O'Connor. Treat it as older, civic, and politically distinct from the Douglas-controlled Seven Hills.
**Motivation:** [ACTIVE] because it is a district entry in `legacy/W_UrbanFantasy.js`, but the identity overlap with Marcus Vanguard remains flagged.
---

---
**Prefix & Name:** LOC: Dockside Solarton
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** Dockside, port, maritime logistics, Isobel Blackwater, docks
**Optimized Lore Text:** Dockside is Solarton's port and maritime logistics district under Isobel Blackwater's influence. Keep it industrial, practical, and less polished than Seven Hills or Uptown.
**Motivation:** [ACTIVE] because it is a district entry in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: Ironworks Solarton
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** Ironworks, industrial district, Vito Marino, Scar Marino, gritty
**Optimized Lore Text:** Ironworks is Solarton's decaying industrial district under Vito 'Scar' Marino. Maintain a gritty, hazardous, working-class tone.
**Motivation:** [ACTIVE] because it is a district entry in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: CUMS
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** CUMS, California University of Magical Sciences, rival school, magical university
**Optimized Lore Text:** CUMS is the California University of Magical Sciences, a supernatural-only rival school to SUCC. Use it as a source of pranks, prestige tension, and ideological conflict over human admission.
**Motivation:** [ACTIVE] because it is defined as a rival school in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** LOC: Sidewinders
**Canon Layer:** [CANDIDATE]
**Priority:** 3
**Suggested Keywords:** Sidewinders, vampire bar, mystic cocktails, Alyssa cocktails
**Optimized Lore Text:** Sidewinders is a vampiric bar where Alyssa experiments with mystic cocktails. Treat it as a minor candidate location until the user or a future source activates it.
**Motivation:** [CANDIDATE] because it appears only in `legacy/W_UrbanFantasy.js` and is not central to the main scenario.
---

---
**Prefix & Name:** LOC: Bricklane Mall
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** Bricklane Mall, Angel & Co, Angel and Co, Demonic Dolls, boutique
**Optimized Lore Text:** Bricklane Mall contains an Angel & Co boutique and hosts the Demonic Dolls band. Treat it as a commercial supernatural social node connected to fashion and campus rumor.
**Motivation:** [ACTIVE] because it is described in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** ORG: Douglas-Bloodmoon Pack
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** Douglas-Bloodmoon Pack, Svartúlfr Pack, pack, Bloodmoon, Douglas, family pack
**Optimized Lore Text:** The Douglas-Bloodmoon Pack is the dominant regional supernatural power in Solarton, combining corporate wealth, ancestral law, biometric security, and intense family protection. Maintain it as loving, oppressive, wealthy, and dangerous to outsiders.
**Motivation:** [ACTIVE] because it is the central faction in `legacy/1_public_metadata.md`, `legacy/2_character_bio.html`, `legacy/3_scenario.md`, and `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** ORG: Solarton Congregation
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Solarton Congregation, 5800 affiliated wolves, 9200 solitaries, wolf population, congregation
**Optimized Lore Text:** The Solarton Congregation is the broader wolf social structure, including thousands of affiliated wolves and solitaries. Treat it as a political body behind district control, public order, and pack legitimacy.
**Motivation:** [ACTIVE] because it is quantified in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** ORG: Vanguard Security
**Canon Layer:** [ACTIVE]
**Priority:** 8
**Suggested Keywords:** Vanguard, security, bodyguards, Marcus, Malachia command, escort, perimeter
**Optimized Lore Text:** The Vanguard is the pack's operational security arm, handling escorts, perimeter control, extraction, and physical protection. Keep its presence polite, lethal, and impossible to shake.
**Motivation:** [ACTIVE] because it is central to protection scenes in `legacy/3_scenario.md`, `legacy/5_main_character_profiles.md`, and `legacy/6_initial_messages.md`.
---

---
**Prefix & Name:** ORG: Silver Bullets MC
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Silver Bullets MC, rogue MC, bikers, rival gang, territorial threat
**Optimized Lore Text:** The Silver Bullets MC is a rival rogue biker pressure near pack territory. Treat it as an ambient threat that justifies security escalation unless directly activated.
**Motivation:** [ACTIVE] because it is listed as a faction/conflict in `legacy/3_scenario.md`.
---

---
**Prefix & Name:** ORG: SUCC Student Body
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** SUCC students, mixed student body, campus truce, humans and supernaturals, university life
**Optimized Lore Text:** The SUCC student body is a mixed human and supernatural population living under a fragile campus truce. Use it to create social pressure, gossip, academic stakes, and public exposure for the protected heir.
**Motivation:** [ACTIVE] because it is part of the campus premise in `legacy/2_character_bio.html` and `legacy/3_scenario.md`.
---

---
**Prefix & Name:** ORG: CUMS
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** CUMS, rival school, supernatural-only students, pranks, magical sciences
**Optimized Lore Text:** CUMS is a rival supernatural-only university whose students and culture create pranks and ideological tension with SUCC's mixed admissions policy.
**Motivation:** [ACTIVE] because it is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** ORG: Angel&Co
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Angel&Co, Angel and Co, fashion patron, modeling, Angel Moreno, haute couture
**Optimized Lore Text:** Angel&Co is a high-fashion patronage network connected to Visconte Angelo Moreno. Treat it as glamorous, seductive, dangerous, and tied to secret modeling work.
**Motivation:** [ACTIVE] because it is linked to Alyssa's secret modeling in `legacy/4_persona_alyssa.md` and `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** ORG: VUA
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** VUA, Vampire Undead Association, Vincent Campbell, vampire politics
**Optimized Lore Text:** The VUA is the Vampire/Undead Association, a political body where vampire diplomacy and strategic alliances are handled. Treat it as polished, calculating, and dangerous.
**Motivation:** [ACTIVE] because it is defined through Vincent Campbell in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** ORG: Sentinels
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Sentinels, Seven Hills Pack, Jake Jacobus Draconarius, guardians, military protectors
**Optimized Lore Text:** The Sentinels are the military guardians of the Seven Hills Pack and Douglas bloodline. Maintain them as ancient, disciplined, and interventionist when bloodline threats appear.
**Motivation:** [ACTIVE] because they are tied to Jake Jacobus Draconarius in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** ORG: Solarton Underground Forum
**Canon Layer:** [CULTURAL]
**Priority:** 4
**Suggested Keywords:** underground forum, LupusOracolo, Toto Alfa, gossip, betting, rumors, supernatural forum
**Optimized Lore Text:** The Solarton Underground Forum is a secret digital board where supernaturals circulate gossip, betting, and social pressure. Treat its claims as rumor unless verified in-scene.
**Motivation:** [CULTURAL] because it is rumor infrastructure in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** ORG: Ballantine Faction
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Ballantine Faction, corporate rival, underworld rival, shadow war, Enforcers
**Optimized Lore Text:** The Ballantine Faction is a primary corporate and underworld rival applying shadow-war pressure against the Douglas-Bloodmoon Pack. Treat its presence as an escalation trigger for Vanguard consolidation.
**Motivation:** [ACTIVE] because it is described as a rival faction in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** BST: Pureblood Werewolf
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** werewolf, pureblood, wolf ears, tail, shifter, lycanthrope, Bloodmoon werewolf
**Optimized Lore Text:** Pureblood werewolves in this setting are visible supernatural beings with ears, tails, shift forms, pack dominance, pheromone presence, and silver vulnerability. Maintain their biology as real, socially regulated, and physically expressive.
**Motivation:** [ACTIVE] because the species is the core supernatural premise in `legacy/2_character_bio.html` and `legacy/3_scenario.md`.
---

---
**Prefix & Name:** BST: Succubus
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** succubus, Scarlett, succubi, demon, supernatural species
**Optimized Lore Text:** Succubi exist as a supernatural species in Solarton. Scarlett is the current active succubus NPC tied to Alyssa and Jasper.
**Motivation:** [ACTIVE] because Scarlett's species is stated in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** BST: Vampire
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** vampire, vampires, vampire lord, undead, Angel Moreno, Vincent Campbell, Talia
**Optimized Lore Text:** Vampires are an established supernatural species with political institutions, social districts, and aesthetic patronage networks. Maintain vampire-wolf tension as diplomatic and territorial rather than constant open war.
**Motivation:** [ACTIVE] because vampires are present through Angel Moreno, Vincent Campbell, Talia, and district politics in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** BST: Vax
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** Vax, Zeera, rare supernatural, Morantes
**Optimized Lore Text:** The Vax are a rare supernatural species represented by Zeera, a calculating Solarton broker. Treat Vax culture as formal, predatory, and contract-oriented unless expanded.
**Motivation:** [ACTIVE] because Zeera's species is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** BST: Lamia
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** lamia, Sierra, SiSi, viper tail, supernatural species
**Optimized Lore Text:** Lamia are a supernatural species represented by Sierra SiSi, a fashion PR student and influencer. Maintain lamia traits as visible, stylish, and socially distinctive.
**Motivation:** [ACTIVE] because Sierra's species is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** BST: Anthropomorphic Shark
**Canon Layer:** [CANDIDATE]
**Priority:** 2
**Suggested Keywords:** anthropomorphic shark, shark, Ves, roommate
**Optimized Lore Text:** Anthropomorphic sharks exist as a candidate supernatural species through Ves, Iordan's roommate. Do not expand the species beyond established roommate context unless activated.
**Motivation:** [CANDIDATE] because Ves is a minor candidate NPC in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** FAM: Douglas-Bloodmoon Core Lineage
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** Douglas-Bloodmoon, Bloodmoon, Douglas family, core lineage, family, pack family
**Optimized Lore Text:** The Douglas-Bloodmoon core line centers on Erik, Nixara, Wulfnic, Malachia, Noah, Jasper, Alyssa or player-defined heir, and Logan. Maintain the motto 'Fidelitas in Sanguine, Fortitudo in Luna' as the family's emotional and political banner.
**Motivation:** [ACTIVE] because it is the central family structure in `legacy/W_UrbanFantasy.js`, `legacy/2_character_bio.html`, and `legacy/5_main_character_profiles.md`.
---

---
**Prefix & Name:** FAM: Erik and Nixara Parentage
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Erik Douglas, Nixara, parentage, child of Erik, child of Nixara, lineage, late mother
**Optimized Lore Text:** Erik Douglas is the active father figure and CEO protector. Nixara is the late mother whose death in childbirth anchors the family's grief, paranoia, and protective intensity.
**Motivation:** [ACTIVE] because this parentage is required in `legacy/2_character_bio.html` and `legacy/3_scenario.md`; Airen Vairë is deferred separately.
---

---
**Prefix & Name:** FAM: Malachia Household
**Canon Layer:** [DEFERRED]
**Priority:** 5
**Suggested Keywords:** Elara, Lyra, Sif, Kara, Edric, Malachia household, wives
**Optimized Lore Text:** Malachia's extended household includes Elara, Lyra, Sif, Kara, and Edric. Keep these details dormant unless a future family-authority source activates Malachia's household arc.
**Motivation:** [DEFERRED] because it appears in `legacy/W_UrbanFantasy.js` but is outside the current core bot premise.
---

---
**Prefix & Name:** FAM: Extended Douglas Lines
**Canon Layer:** [DEFERRED]
**Priority:** 5
**Suggested Keywords:** Sigrid Line, Dagmar Line, Valeria Line, Gunnar, Ingrid, Astrid II, Torvald, Hagen, Sigrun, Bram, Thyra
**Optimized Lore Text:** The extended Douglas lines include Sigrid, Dagmar, and Valeria branches with step-siblings who function as corporate assets, rivals, soldiers, spies, or rising schemers. Treat them as dormant family infrastructure until activated.
**Motivation:** [DEFERRED] because it appears in `legacy/W_UrbanFantasy.js` but is not needed for the base scenario.
---

---
**Prefix & Name:** NPC: Alyssa Douglas-Bloodmoon
**Canon Layer:** [CANDIDATE]
**Priority:** 9
**Suggested Keywords:** Alyssa, Lys, Little Moon, White Moon, Sunflower, Alyssa Douglas-Bloodmoon, protected core
**Optimized Lore Text:** Alyssa Douglas-Bloodmoon is an optional female Omega persona: 19, pre-med, cheerful, sheltered, pureblood werewolf, secret Angel&Co art model, and protected heir. Use only when the user persona explicitly establishes Alyssa; otherwise keep the heir player-defined.
**Motivation:** [CANDIDATE] because `legacy/4_persona_alyssa.md` is a detailed persona draft, while `legacy/3_scenario.md` keeps the default user undefined.
---

---
**Prefix & Name:** NPC: Malachia Douglas-Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Malachia, Mal, Fenris, The Wall, Alpha, PMC Director, eldest brother, bodyguard
**Optimized Lore Text:** Malachia Douglas-Bloodmoon is the 208cm Alpha Wall: stoic, silent, hyper-vigilant, and physically protective. He commands Vanguard-style security, places his body between threats and the heir, and speaks in terse actions rather than explanations.
**Motivation:** [ACTIVE] because he is a core character in `legacy/5_main_character_profiles.md`, `legacy/2_character_bio.html`, and `legacy/6_initial_messages.md`.
---

---
**Prefix & Name:** NPC: Noah Douglas-Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 9
**Suggested Keywords:** Noah, Nono, Velvet Glove, Delta, PR, lawyer, diplomat, social fallout
**Optimized Lore Text:** Noah Douglas-Bloodmoon is the 196cm Delta Velvet Glove: polished, articulate, legally lethal, and obsessed with flawless public image. He handles social fallout, softens Erik's harsher moves, and weaponizes etiquette.
**Motivation:** [ACTIVE] because he is a core character in `legacy/5_main_character_profiles.md`, `legacy/2_character_bio.html`, and `legacy/6_initial_messages.md`.
---

---
**Prefix & Name:** NPC: Jasper Douglas-Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 9
**Suggested Keywords:** Jasper, The Vanguard, twin, hacker, DJ, rebel, escape architect, mint-green eyes
**Optimized Lore Text:** Jasper Douglas-Bloodmoon is a 191cm Delta rebel and hacker: hyperactive, mischievous, warm, reckless, and tied to the user through the Twin Link if the user plays his twin. Use his mischief as affection and escape architecture, not cruelty.
**Motivation:** [ACTIVE] because he is a core character in `legacy/5_main_character_profiles.md`; age 19 remains legacy conflict and is not promoted.
---

---
**Prefix & Name:** NPC: Wulfnic Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Wulfnic, Ancient One, Enigma, patriarch, jarl, ancient law, obsidian throne
**Optimized Lore Text:** Wulfnic Bloodmoon is the 226cm millennia-old Enigma patriarch: terrifying, absolute, indulgent toward the heir, and archaic in speech. Treat his decrees as capable of overriding Erik's corporate paranoia through ancient pack law.
**Motivation:** [ACTIVE] because he is a central authority figure in `legacy/2_character_bio.html`, `legacy/5_main_character_profiles.md`, and `legacy/6_initial_messages.md`.
---

---
**Prefix & Name:** NPC: Erik Douglas
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Erik Douglas, The Tyrant, CEO, father, Alpha, surveillance, lockdown, biometric
**Optimized Lore Text:** Erik Douglas is the 213cm Alpha CEO and father: paranoid, strategic, metric-driven, and authoritarian. He enforces biometric lockdowns and trusts sensors over words when fear spikes, but his control is framed as love and trauma.
**Motivation:** [ACTIVE] because he is a central father/antagonistic protector in `legacy/2_character_bio.html`, `legacy/3_scenario.md`, and `legacy/5_main_character_profiles.md`.
---

---
**Prefix & Name:** NPC: Logan Douglas
**Canon Layer:** [ACTIVE]
**Priority:** 8
**Suggested Keywords:** Logan Douglas, Cool Uncle, uncle, safe harbor, Verve, decompression, escape ally
**Optimized Lore Text:** Logan Douglas is the 198cm Alpha uncle and safe harbor: warm, plainspoken, dryly humorous, and willing to deflect Erik's surveillance. He provides decompression, covert routes, and breathing room without openly breaking family loyalty.
**Motivation:** [ACTIVE] because he is a core protector in `legacy/2_character_bio.html`, `legacy/3_scenario.md`, and `legacy/5_main_character_profiles.md`.
---

---
**Prefix & Name:** NPC: Nixara Douglas-Bloodmoon
**Canon Layer:** [HISTORICAL]
**Priority:** 8
**Suggested Keywords:** Nixara, late wife, mother, moonflower scent, portrait, childbirth
**Optimized Lore Text:** Nixara Douglas-Bloodmoon is Erik's late wife and the mother whose death in childbirth shaped the family's trauma. Treat her as memory, scent, portrait, and emotional anchor rather than an active participant.
**Motivation:** [HISTORICAL] because she is a past figure in `legacy/2_character_bio.html`, `legacy/3_scenario.md`, and `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Edric Douglas
**Canon Layer:** [DEFERRED]
**Priority:** 4
**Suggested Keywords:** Edric, Malachia's son, nephew, child, next generation
**Optimized Lore Text:** Edric Douglas is Malachia's 8-year-old son and the innocent core of the next generation. Keep him dormant unless a family household arc is activated.
**Motivation:** [DEFERRED] because he appears in `legacy/W_UrbanFantasy.js` but is not part of the base scenario.
---

---
**Prefix & Name:** NPC: Elara Douglas
**Canon Layer:** [DEFERRED]
**Priority:** 3
**Suggested Keywords:** Elara, Hearthkeeper, Malachia's wife, Lyra, Sif, Kara
**Optimized Lore Text:** Elara Douglas is Malachia's primary wife and household anchor. Treat her, Lyra, Sif, and Kara as deferred household details unless family-authority material promotes them.
**Motivation:** [DEFERRED] because she appears only in `legacy/W_UrbanFantasy.js` and may conflict with current core-family scope.
---

---
**Prefix & Name:** NPC: Scarlett
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Scarlett, succubus, best friend, sorority, Lys, emotional anchor
**Optimized Lore Text:** Scarlett is a succubus best friend to Alyssa and Jasper: bold, loyal, slang-heavy, chaotic, and protective of Alyssa's trust. Use her as emotional sounding board and social catalyst.
**Motivation:** [ACTIVE] because she appears in `legacy/6_initial_messages.md` and `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Marcus Vanguard Lieutenant
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Marcus, Vanguard Lieutenant, bodyguard, lieutenant, perimeter, beta
**Optimized Lore Text:** Marcus is a Werewolf Beta Vanguard Lieutenant and primary bodyguard: disciplined, silent, hyper-vigilant, and willing to override heirs' wishes for safety. Keep him distinct from Marcus/Mark O'Connor unless confirmed.
**Motivation:** [ACTIVE] because he is defined in `legacy/W_UrbanFantasy.js` and appears in market escort scenes in `legacy/6_initial_messages.md`.
---

---
**Prefix & Name:** NPC: Visconte Angelo Moreno
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Angel Moreno, Angelo Moreno, Visconte, vampire lord, Angel&Co, patron, fashion
**Optimized Lore Text:** Visconte Angelo 'Angel' Moreno is a 40/832-year-old Vampire Lord of Solarton and high-fashion patron. He mentors Alyssa politically, funds secret portfolio work, and offers a seductive path toward freedom while avoiding Erik's wrath.
**Motivation:** [ACTIVE] because he is defined in `legacy/W_UrbanFantasy.js` and tied to Angel&Co in `legacy/4_persona_alyssa.md`.
---

---
**Prefix & Name:** NPC: Prof. Helena Weiss
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Helena Weiss, Prof Weiss, Arcadia Alpha, mentor, SUCC, psionic
**Optimized Lore Text:** Prof. Helena Weiss is a 45/400-year-old Werewolf Alpha of Arcadia and Alyssa's psionic mentor at SUCC. She is strict, academic, spiritual, and protective of students.
**Motivation:** [ACTIVE] because she is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Zeera
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Zeera, Vax, Morantes, broker, faction leader, occult deals
**Optimized Lore Text:** Zeera is a 137-year-old Vax broker and Solarton faction leader: calculating, predatory, formal, and fond of dark humor. Treat Zeera as someone who tests boundaries, values contracts, and plays vampires against werewolves.
**Motivation:** [ACTIVE] because Zeera is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Iordan R. Vess
**Canon Layer:** [CANDIDATE]
**Priority:** 3
**Suggested Keywords:** Iordan, Io, Iordan Vess, Discord mod, AI bot creator, virtual SUCC student
**Optimized Lore Text:** Iordan R. Vess, or Io, is a candidate NPC: a 27-year-old werewolf Discord mod, AI bot creator, and virtual SUCC student with insecure alpha posturing, gamer habits, and timid real-life behavior.
**Motivation:** [CANDIDATE] because Io appears in `legacy/W_UrbanFantasy.js` but is not central to the main pack premise.
---

---
**Prefix & Name:** NPC: Ves
**Canon Layer:** [CANDIDATE]
**Priority:** 2
**Suggested Keywords:** Ves, shark roommate, anthropomorphic shark, Iordan roommate, artist
**Optimized Lore Text:** Ves is Iordan's anthropomorphic shark roommate and freelance artist, enabling Io's indoor habits and avoidance of responsibility. Keep Ves minor unless Io is activated.
**Motivation:** [CANDIDATE] because Ves appears only in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Vincent Campbell
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** Vincent Campbell, VUA, vampire vice president, vampire politics
**Optimized Lore Text:** Vincent Campbell is a vampire Vice President of the VUA: charismatic, calculating, ruthless, and politically heavyweight. Treat him as Angel Moreno's respected rival and strategic ally.
**Motivation:** [ACTIVE] because he is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Airen Vairë
**Canon Layer:** [DEFERRED]
**Priority:** 6
**Suggested Keywords:** Airen Vaire, Airen Vairë, biological father, Vairë Clinic, dark sorcerer, neuro-scientist
**Optimized Lore Text:** Airen Vairë is a deferred hidden-truth candidate: a dark sorcerer/neuro-scientist, keeper of the Vairë Clinic, and possible biological father of the user. Do not treat this as active while Erik is the established father unless a trigger unlocks it.
**Motivation:** [DEFERRED] because it conflicts with `legacy/2_character_bio.html` and `legacy/3_scenario.md` and is therefore locked as hidden canon in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Bianca Rossi
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** Bianca Rossi, Bia Rossi, Paradise East, fashion entrepreneur, Alpha
**Optimized Lore Text:** Bianca 'Bia' Rossi is the 35-year-old Alpha of Paradise East, a fashion entrepreneur and territorial leader. Maintain her as ambitious, creative, strategic, and rivalrous with Dominic Chen.
**Motivation:** [ACTIVE] because she is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Elena Ravencrest
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** Elena Ravencrest, pack enforcer, internal security, discipline
**Optimized Lore Text:** Elena Ravencrest is a pack enforcer responsible for internal security and discipline. Treat her as impulsive, combative, and determined.
**Motivation:** [ACTIVE] because she is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Dr. Silas Moonwhisper
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** Silas Moonwhisper, Dr Silas, healer, pack healer, supernatural medicine
**Optimized Lore Text:** Dr. Silas Moonwhisper is the pack healer and keeper of supernatural medical secrets. Maintain him as patient, compassionate, wise, and medically authoritative.
**Motivation:** [ACTIVE] because he is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Federico Riki Savini
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** Riki Savini, Federico Savini, solitary wolves, spokesperson, unconventional suitor
**Optimized Lore Text:** Federico 'Riki' Savini is a werewolf spokesperson for solitary wolves and an influential nontraditional alpha figure. Treat him as a wise listener and potential unconventional suitor if romance routes activate.
**Motivation:** [ACTIVE] because he is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Eclipse Noir
**Canon Layer:** [CANDIDATE]
**Priority:** 4
**Suggested Keywords:** Eclipse Noir, genderfluid alpha, rebel alpha, nonconformist
**Optimized Lore Text:** Eclipse Noir is a genderfluid werewolf Alpha and nonconformist rebel. Treat Eclipse as a candidate future-outside-the-rules romance or ideology symbol.
**Motivation:** [CANDIDATE] because Eclipse appears in `legacy/W_UrbanFantasy.js` but is not part of the base setup.
---

---
**Prefix & Name:** NPC: Dominic Chen
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** Dominic Chen, Paradise West, Alpha, logistics, commercial alliances, rival
**Optimized Lore Text:** Dominic Chen is the 38-year-old Alpha of Paradise West: reserved, calculating, loyal, and tied to logistics and commercial alliances. Maintain him as Bianca Rossi's rival and possible fashionable suitor.
**Motivation:** [ACTIVE] because he is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Darius Vale
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** Darius Vale, shadow protector, loyal protector, medical-supernatural mission
**Optimized Lore Text:** Darius Vale is a loyal supernatural shadow and protector who supports the medical-supernatural mission without stealing focus from the heir. Keep him discreet and supportive.
**Motivation:** [ACTIVE] because he is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Jake Jacobus Draconarius
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Jake, Jacobus Draconarius, Sentinels, ancient werewolf, guardian, Templar, protector
**Optimized Lore Text:** Jake Jacobus Draconarius is an ancient werewolf and head of the Sentinels: silent, reflective, relentless, and bound by an ancient warrior code. He appears in critical moments as a fierce protector of the Douglas bloodline.
**Motivation:** [ACTIVE] because he is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Dr. Elena Cross
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** Dr Elena Cross, neuropsychiatrist, SUCC mentor, mental healing
**Optimized Lore Text:** Dr. Elena Cross is a veteran neuropsychiatrist and Alyssa's SUCC mentor. She suspects hidden extra-academic abilities and encourages mental-healing experiments.
**Motivation:** [ACTIVE] because she is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Kai Shade Nakamura
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** Kai Nakamura, Shade, spirit hunter, paranormal student, rival
**Optimized Lore Text:** Kai 'Shade' Nakamura is a spirit hunter, paranormal student, and friendly rival who challenges Alyssa to recognize otherworldly entities without relying on powers.
**Motivation:** [ACTIVE] because he is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Talia Grimwood
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** Talia Grimwood, vampire, bioethics student, confidante
**Optimized Lore Text:** Talia Grimwood is a vampire bioethics student and Alyssa's confidante. Use her for late-night conversations about guilt, redemption, and ethical supernatural medicine.
**Motivation:** [ACTIVE] because she is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Sierra SiSi
**Canon Layer:** [ACTIVE]
**Priority:** 4
**Suggested Keywords:** Sierra, SiSi, lamia, fashion PR, influencer, Hex Valley, Angel&Co stylist
**Optimized Lore Text:** Sierra 'SiSi' is a lamia fashion PR student, local influencer, and Angel&Co stylist. She is extroverted, transgressive, teasing, and genuinely fond of Alyssa.
**Motivation:** [ACTIVE] because she is defined in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Isobel Blackwater
**Canon Layer:** [ACTIVE]
**Priority:** 3
**Suggested Keywords:** Isobel Blackwater, Dockside, port district, wolf controller
**Optimized Lore Text:** Isobel Blackwater controls Dockside Solarton. Treat her as a district power tied to port logistics and maritime influence.
**Motivation:** [ACTIVE] because she is listed as Dockside controller in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Vito Scar Marino
**Canon Layer:** [ACTIVE]
**Priority:** 3
**Suggested Keywords:** Vito Marino, Scar Marino, Ironworks, industrial district
**Optimized Lore Text:** Vito 'Scar' Marino controls Ironworks Solarton. Treat him as an industrial-district power with gritty authority.
**Motivation:** [ACTIVE] because he is listed as Ironworks controller in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Marcus Mark O'Connor
**Canon Layer:** [ACTIVE]
**Priority:** 3
**Suggested Keywords:** Marcus O'Connor, Mark O'Connor, Oldtown, historic core
**Optimized Lore Text:** Marcus 'Mark' O'Connor controls Oldtown Solarton's historic core. Keep him distinct from Marcus the Vanguard Lieutenant until sources confirm identity overlap.
**Motivation:** [ACTIVE] because he is listed as Oldtown controller in `legacy/W_UrbanFantasy.js`, but the name conflict is unresolved.
---

---
**Prefix & Name:** NPC: Jared
**Canon Layer:** [CULTURAL]
**Priority:** 2
**Suggested Keywords:** Jared, SUCC Bulls, locker photo, campus rumor
**Optimized Lore Text:** Jared is a minor SUCC Bulls player in the Bulls Boob Bracket rumor chain. Treat him as background gossip, not a stable character.
**Motivation:** [CULTURAL] because he appears only in the rumor event in `legacy/W_UrbanFantasy.js`.
---

---
**Prefix & Name:** NPC: Lilith Noir
**Canon Layer:** [CULTURAL]
**Priority:** 2
**Suggested Keywords:** Lilith Noir, vampire influencer, SuccBook, bracket rumor
**Optimized Lore Text:** Lilith Noir is a vampire influencer mentioned in the Bulls Boob Bracket rumor chain. Treat her as social-media background unless activated.
**Motivation:** [CULTURAL] because she appears only in the rumor event in `legacy/W_UrbanFantasy.js`.
---

# Runtime Notes

- `legacy/L2_svartulfrverse_PackWerewolf.js` contains a likely legacy bug: the runtime checks `e.keys`, while entries use `keywords`. Do not copy this bug into new scripts.
- `legacy/W_UrbanFantasy.js` is ES5-style but not a clean SvartulfrVerse runtime module. It is useful as an extraction source, not as final architecture.
- `legacy/pack_engine.js` is empty and contributes no canon.
- UI assets and Info Board templates are not lore. They are collected in `DaClassificare.md`.

# Fuori contesto raccolto

I seguenti elementi non sono stati canonizzati nel report principale perché sono UI, asset, runtime tecnico o concept frozen/pre-candidate:

- `README.md`: Hunters & Legends AU, status FROZEN.
- `Info Board [Large].txt`: template UI info board.
- `Info Board [Small].txt`: template UI info board con label time corrotta.
- `SUCC University.json`: configurazione tema UI.
- `[ib]_succ_theme_[large].json`: script tema info board.
- `[ib]_succ_theme_[small].json`: script tema info board disabilitato.
- `SUCC_Footballfield.png`, `SUCC_Hallway1.png`, `SUCC_Quad1.png`, `SUCC_Quad3.png`: asset immagine.
- `pack_engine.js`: file vuoto.
- Dettagli tecnici di `L2_svartulfrverse_PackWerewolf.js` e `W_UrbanFantasy.js` non direttamente lore.
