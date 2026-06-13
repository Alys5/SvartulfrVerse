# CyberDCC2375 — Report di Analisi e Canonizzazione

## Stato del dossier

- **Dossier analizzato:** `d:\SvartulfrVerse\CyberDCC2375\legacy`
- **Output generato:** `d:\SvartulfrVerse\CyberDCC2375\CANON_REPORT_CyberDCC2375.md`
- **Materiale fuori contesto o non pertinente al tema CyberDCC2375:** trasferito in `d:\SvartulfrVerse\DaClassificare.md`
- **Nota di canone globale:** il README descrive CyberDCC2375 / Stellar Dynasties come AU **FROZEN** e non ancora promosso nel canone attivo generale. In questo report, `[ACTIVE]` indica attivazione interna al dossier CyberDCC2375; il dossier resta `[CANDIDATE]` rispetto al canone globale SvartulfrVerse finché non viene promosso da autorità.

## Inventario sorgenti letto

| File | Contenuto principale | Uso nel report |
|---|---|---|
| `legacy/1_public_metadata.md` | Titolo, chat name, tag, short description, prompt immagine, ambientazione BlackMoon | Metadata, tono visivo, entity macro principali |
| `legacy/2_character_bio.html` | Bio pubblico, user contract, rank, Cyber-Rite, White Moon, protagonisti, scenari iniziali | Contratto utente, regole runtime, personaggi principali |
| `legacy/3_scenario.md` | Direttive, world invariants, lore invariants, context invariants, trigger contract | Regole narrative, world/faction/protocol |
| `legacy/4_persona_alyssa.md` | Profilo dettagliato di Alyssa Douglas-Bloodmoon | NPC canon Alyssa, relazioni, psicologia, gear |
| `legacy/5_main_character_profiles.md` | Profili sintetici di Malachia, Noah, Jasper, Wulfnic, Erik, Logan | NPC principali e dinamiche di gruppo |
| `legacy/6_initial_messages.md` | Cinque messaggi iniziali con scene, dialoghi, Echo, Marcus, Silver Bullets | Location, eventi, escalation, sample dialogue |
| `legacy/L2_svartulfrverse_CyberWerewolf.js` | Lorebook dinamico L2 con trigger e injection | Regole di attivazione, protocolli, security |
| `legacy/README.md` | Stato FROZEN, Stellar Dynasties, adattamenti concettuali | Canon boundary e materiale candidate/deferred |
| `legacy/Visual_DNA.md` | Visual DNA cyber/sci-fi | Atmosfera, architettura, palette |
| `legacy/W_Cyber.md` | Metadata pubblico World | Cyber | Estetica macro world, tema tecnologico |
| `legacy/W_Cyber.js` | Lorebook dinamico world con voci world/family/NPC/faction | Estrazione entità; rilevamento bleed da altri archi |

## Regole di canonizzazione applicate

- MacroCosmo: `WRD`, `LOR`, `LOC`, `ORG`, `BST`.
- MicroCosmo: `FAM`, `NPC`.
- Canon Layer: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`.
- Priorità: `11` per elementi core; `9-10` per personaggi/fazioni/luoghi centrali; `6-8` per supporto; `0-5` per dettaglio locale, gossip o materiale deferred/candidate.
- Separazione utente/NPC: `{{user}}` è il giocatore e non deve essere fuso con Alyssa NPC. Alyssa è un NPC canon separato quando il dossier viene usato in modalità multi-character/social.
- Non assumere sesso, rank, aspetto, White Moon, Cyber-Rite exempt o tratti Omega di `{{user}}` finché non sono stabiliti dalla persona o dalla chat.

## Conflitti e decisioni

1. **Wulfnic altezza:** `legacy/5_main_character_profiles.md` e la bio pubblica indicano `348cm`; `legacy/6_initial_messages.md` lo descrive come `226cm`. Decisione: usare `348cm` come dato primario e trattare `226cm` come refuso da non reimportare.
2. **Alyssa NPC vs `{{user}}`:** Alyssa NPC è Female, Omega, White Moon, Cyber-Rite exempt. `{{user}}` ha surname Douglas-Bloodmoon, age 19, pure-organic werewolf, ma rank/gender/appearance sono aperti. Non trasferire corpo, sesso, rank o memorie di Alyssa su `{{user}}`.
3. **No Twin Link:** Jasper è fratello gemello di Alyssa/utente nella logica narrativa, ma il Cyber arc dichiara esplicitamente `No Twin Link`.
4. **AU bleed:** `legacy/W_Cyber.js` include materiale campus/vampiri/succubi/Arcadia/Hex Valley non necessario al tema BlackMoon. È stato spostato in `d:\SvartulfrVerse\DaClassificare.md`.
5. **Stato globale:** CyberDCC2375 è un AU candidato/frozen. Gli elementi `[ACTIVE]` sono attivi solo all'interno del dossier CyberDCC2375.

---

# Lorebook Entries — MacroCosmo

---
**Prefix & Name:** WRD: CyberDCC2375 AU Boundary
**Canon Layer:** [CANDIDATE]
**Priority:** 11
**Suggested Keywords:** CyberDCC2375, Cyber, cyberpunk, space opera, BlackMoon, candidate AU, frozen AU, Stellar Dynasties
**Optimized Lore Text:** CyberDCC2375 is a frozen candidate AU that reimagines the Douglas-Bloodmoon dynasty as a far-future cybernetic werewolf space-opera setting. Maintain it as candidate material unless an authority explicitly promotes it into global active canon.
**Motivation:** This layer and priority reflect the README status of the setting as frozen while preserving its high importance as the container for all CyberDCC2375 lore.
---

---
**Prefix & Name:** WRD: Cyber Industrial Ship-City
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** BlackMoon, city-ship, cyber-industrial, corporate command, neural systems, controlled violence, deep cosmos
**Optimized Lore Text:** The active CyberDCC2375 dimension is a cyber-industrial ship-city where corporate command, neural systems, surveillance, and controlled violence define order. Treat the BlackMoon as both habitat and sovereign infrastructure, not merely a vehicle.
**Motivation:** This is the central world rule governing every scene, conflict, and location in the dossier.
---

---
**Prefix & Name:** WRD: Far-Future Corporate Era
**Canon Layer:** [ACTIVE]
**Priority:** 9
**Suggested Keywords:** far future, deep-space corporate era, post-Cyber-Rite, corporate era, interstellar, Obsidian Exchange
**Optimized Lore Text:** CyberDCC2375 takes place in a far-future deep-space corporate era after the normalization of Cyber-Rite augmentation. Treat megacorporate authority, private fleets, station commerce, and biometric law as normal infrastructure.
**Motivation:** The era defines technology level, social hierarchy, and why corporate surveillance can operate as law.
---

---
**Prefix & Name:** WRD: Cyber-Werewolf Physiology
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** cyber-werewolf, werewolf, shifted, cybernetic werewolf, mecha-augmented, organic werewolf, wolf ears, tail
**Optimized Lore Text:** Cyber-werewolves are mecha-augmented werewolves who shift, retain wolf features, and can undergo Cyber-Rite augmentation. Pure-organic werewolves retain permanent organic ears and a prehensile tail and must not be treated as cybernetically augmented unless explicitly established.
**Motivation:** Species rules are the core biological boundary between `{{user}}`, the brothers, and the wider cast.
---

---
**Prefix & Name:** WRD: Cyber-Rite
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Cyber-Rite, cyber rite, augmentation, tungsten-carbide, Age 21, replacement flesh, mecha augmentation
**Optimized Lore Text:** Cyber-Rite is the brutal Age 21 augmentation rite that replaces flesh with tungsten-carbide armor and mecha systems. Treat it as a major bodily, cultural, and political threshold; do not apply it to `{{user}}` unless the user persona or chat establishes it.
**Motivation:** Cyber-Rite is central to character status, threat level, and the distinction between organic and augmented bodies.
---

---
**Prefix & Name:** WRD: Extraction Protocol
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** Extraction Protocol, biometric, heart rate, vitals, HUD, ship sensors, alarms, lockdown, extraction
**Optimized Lore Text:** Extraction Protocol links protected organic vitals to BlackMoon ship sensors and escalates from sensor sweep to compartment control, localized alarms, and Vanguard extraction if distress persists. Maintain it as the primary autonomy-versus-surveillance conflict.
**Motivation:** This protocol is the main engine for conflict, scene escalation, and family overprotection.
---

---
**Prefix & Name:** WRD: Biometric Ship Law
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** biometric law, ship law, HUD vitals, nano-monitor, wrist monitor, real-time vitals, ship sensors
**Optimized Lore Text:** BlackMoon ship law treats biometric distress as a command issue. Maintain live vitals, wrist monitors, HUD flags, and family dashboards as visible instruments of control, not background decoration.
**Motivation:** Biometric law explains why emotional spikes immediately produce physical security responses.
---

---
**Prefix & Name:** WRD: Silver Vulnerability
**Canon Layer:** [ACTIVE]
**Priority:** 8
**Suggested Keywords:** silver, silver bullets, silver-laced weaponry, cyber interfaces, disruption, weakness
**Optimized Lore Text:** Silver disrupts cybernetic and mecha-augmented interfaces, especially in weapons used by hostile mercenaries. Use silver as a practical tactical weakness, not as a universal mystical banishment rule.
**Motivation:** Silver is a concrete combat constraint tied to the mercenary threat and cybernetic physiology.
---

---
**Prefix & Name:** LOC: BlackMoon Starship
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** BlackMoon, Black Moon, starship, city-ship, sovereign city-ship, undertrade, med bay, command deck
**Optimized Lore Text:** The BlackMoon is a sovereign city-ship and the central roleplay location. Maintain an atmosphere of neon-drenched corporate power, cold surveillance, sterile upper decks, and warmer shadow markets below.
**Motivation:** BlackMoon is the main container for all active scenes and faction dynamics.
---

---
**Prefix & Name:** LOC: Med Bay
**Canon Layer:** [ACTIVE]
**Priority:** 9
**Suggested Keywords:** Med Bay, medical bay, xenobiology, sample bench, biopsy, clinic, vitals, sterile protocol
**Optimized Lore Text:** The Med Bay is a sterile high-tech xenobiology and medical zone aboard BlackMoon. Treat it as a clinical sanctuary that becomes a surveillance trigger whenever biometric anomalies occur.
**Motivation:** The Med Bay is the primary starting location and the place where organic science, xenobiology, and ship surveillance intersect.
---

---
**Prefix & Name:** LOC: Command Deck
**Canon Layer:** [ACTIVE]
**Priority:** 8
**Suggested Keywords:** command deck, tactical display, Wulfnic throne, Erik command, Silver Bullets, 4C, artificial chill
**Optimized Lore Text:** The Command Deck is engineered at artificial chill to protect cybernetic systems during tactical sessions. Treat it as the seat of patriarchal and corporate authority, with holographic maps, military command, and controlled intimidation.
**Motivation:** The Command Deck concentrates Erik and Wulfnic authority and external mercenary threats.
---

---
**Prefix & Name:** LOC: Undertrade
**Canon Layer:** [ACTIVE]
**Priority:** 9
**Suggested Keywords:** Undertrade, shadow deck, Logan garage, black market, illegal rave, deck raves, neon dim, grease, ozone
**Optimized Lore Text:** The Undertrade is Logan's shadow-market deck beneath the corporate spine of BlackMoon. Maintain it as the warm, greasy, neon-dim sanctuary where illegal raves, hacks, favors, and unauthorized freedom occur.
**Motivation:** The Undertrade is the main de-escalation zone and counterweight to corporate surveillance.
---

---
**Prefix & Name:** LOC: Adaptive Habitat
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Adaptive Habitat, habitat, private room, soundproofing, biometric signature, rogue packet, private frequency
**Optimized Lore Text:** The Adaptive Habitat is a private living zone keyed to the protected organic biometric signature. Treat it as a fragile privacy bubble that can still be breached by rogue packets, biometric alarms, or family intervention.
**Motivation:** This location supports autonomy, fear, privacy, and the tension between safety and confinement.
---

---
**Prefix & Name:** LOC: Centuri Prime Station
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Centuri Prime, station, Centuri delegates, orbital station, corporate station
**Optimized Lore Text:** Centuri Prime Station is a corporate station environment tied to Centuri delegates and external diplomacy. Treat it as a formal diplomatic pressure point around the Obsidian Exchange and BlackMoon authority.
**Motivation:** The station expands the world beyond BlackMoon while remaining relevant to corporate politics.
---

---
**Prefix & Name:** ORG: Douglas-Bloodmoon Clan
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** Douglas-Bloodmoon, Douglas clan, Bloodmoon, clan, dynasty, family, Erik, Wulfnic, Malachia, Noah, Jasper, Alyssa, Logan
**Optimized Lore Text:** The Douglas-Bloodmoon Clan is the ruling dynastic core of the CyberDCC2375 dossier. Treat it as a corporate-military family structure built around draconian protection, succession pressure, and the Obsidian Exchange.
**Motivation:** The clan is the central MicroCosmo and MacroCosmo bridge for all character and faction logic.
---

---
**Prefix & Name:** ORG: Obsidian Exchange
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Obsidian Exchange, corporate expansion, syndicate, logistics, intelligence, BlackMoon governance, corporate command
**Optimized Lore Text:** The Obsidian Exchange is the intergalactic corporate expansion syndicate operating through BlackMoon. Treat it as the legal, logistical, and military apparatus that turns family authority into shipwide law.
**Motivation:** It explains the scale of corporate control and the legitimacy of Erik's command.
---

---
**Prefix & Name:** ORG: Vanguard
**Canon Layer:** [ACTIVE]
**Priority:** 9
**Suggested Keywords:** Vanguard, PMC, DCC Security, tactical shield, bodyguard, Malachia, Marcus, extraction, security
**Optimized Lore Text:** The Vanguard is the tactical protection and private-military arm enforcing Douglas-Bloodmoon security. Treat it as disciplined, heavily augmented, and loyal to the clan's protection doctrine.
**Motivation:** Vanguard personnel and doctrine are the practical force behind Extraction Protocol and physical shielding.
---

---
**Prefix & Name:** ORG: Silver Bullets Mercenaries
**Canon Layer:** [ACTIVE]
**Priority:** 8
**Suggested Keywords:** Silver Bullets, mercenaries, rogue mercenary, transponder, ghost signature, silver-laced weapons, breach
**Optimized Lore Text:** Silver Bullets are hostile void-faring mercenaries probing BlackMoon routes with silver-laced weapons designed to disrupt cybernetic interfaces. Treat them as deniable external pressure, not as named central antagonists unless promoted.
**Motivation:** They are the main external threat in the initial scenario and trigger contract.
---

---
**Prefix & Name:** ORG: Centuri Delegates
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Centuri delegates, corporate diplomats, Centuri, delegates, negotiation, corporate rival
**Optimized Lore Text:** Centuri delegates are rival corporate diplomats negotiating with the Obsidian Exchange. Treat them as formal outsiders who may underestimate the clan's lethality and use protocol as a weapon.
**Motivation:** They provide diplomatic friction without requiring a full enemy-faction arc.
---

---
**Prefix & Name:** BST: Jötun-Squid
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Jötun-Squid, jotun squid, xenobiology, biopsy, Med Bay, deep-tissue sample
**Optimized Lore Text:** Jötun-Squid are xenobiology specimens studied in the Med Bay. Treat them as cold-storage scientific material and a sign of BlackMoon's advanced biological research environment.
**Motivation:** They appear in the Med Bay sample bench and establish the xenobiology texture of the setting.
---

---
**Prefix & Name:** BST: Dvergr-Lichen
**Canon Layer:** [ACTIVE]
**Priority:** 5
**Suggested Keywords:** Dvergr-Lichen, dvergr lichen, iron-hull biofilm, symbiote, hull scan, maintenance
**Optimized Lore Text:** Dvergr-Lichen is an iron-hull biofilm symbiote associated with BlackMoon maintenance scans. Treat it as ambient xenobiology, not a character or central plot device.
**Motivation:** It supports the world's biological-technological texture without central plot weight.
---

---
**Prefix & Name:** BST: Svartálf-Drift
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Svartálf-Drift, svartalf drift, dock nomads, bioluminescent tattoo, Scarlett species, delivery
**Optimized Lore Text:** Svartálf-Drift are compact dock-nomad beings associated with bioluminescent tattoo filigree and shadow-market deliveries. Treat them as a distinct non-human species/culture when mentioned.
**Motivation:** They connect Scarlett and the Undertrade dock economy to the broader xenobiology layer.
---

---
**Prefix & Name:** LOR: Nixara's Death in Childbirth
**Canon Layer:** [HISTORICAL]
**Priority:** 10
**Suggested Keywords:** Nixara, childbirth, died in childbirth, twins, Erik grief, late wife, mother
**Optimized Lore Text:** Nixara died giving birth to Jasper and Alyssa, leaving Erik's grief as a root cause of his surveillance doctrine. Treat her memory as sacred, idealized, and emotionally destabilizing for Erik.
**Motivation:** This historical fact explains Erik's trauma, the twins' protected status, and the family's emotional center.
---

---
**Prefix & Name:** LOR: Cyber User Contract
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** user contract, pure-organic, Douglas-Bloodmoon, age 19, Erik Nixara child, permanent ears, prehensile tail, rank, DoNotAssume
**Optimized Lore Text:** `{{user}}` is a 19-year-old Douglas-Bloodmoon pure-organic werewolf and child of Erik and Nixara, with permanent organic wolf ears and a prehensile tail. Do not assign gender, rank, body details, White Moon, Cyber-Rite exemption, or Omega traits until the user persona or chat establishes them.
**Motivation:** This is the highest-priority runtime contract preventing unwanted assumptions about the player character.
---

---
**Prefix & Name:** LOR: Pack Rank Display
**Canon Layer:** [ACTIVE]
**Priority:** 8
**Suggested Keywords:** pack rank, Alpha, Beta, Delta, Omega, Enigma, hierarchy, Ε, Α, Δ, Β, Ω
**Optimized Lore Text:** The displayed hierarchy is Enigma above Alpha, Alpha above Delta, Delta above Beta, Beta above Omega. Let `{{user}}` choose Alpha, Beta, Delta, or Omega, but do not assign Enigma to `{{user}}`.
**Motivation:** Rank controls social posture, pheromone scaling, and family treatment of `{{user}}`.
---

---
**Prefix & Name:** LOR: No Twin Link in Cyber Arc
**Canon Layer:** [ACTIVE]
**Priority:** 8
**Suggested Keywords:** No Twin Link, twin link, cyber arc, no telepathy, twin bond, Jasper, Alyssa
**Optimized Lore Text:** Jasper and Alyssa/`{{user}}` may be twins in family structure, but the Cyber arc does not include a supernatural Twin Link. Maintain their bond through upbringing, loyalty, hacking, and emotional proximity instead of telepathy.
**Motivation:** This prevents AU bleed from other SvartulfrVerse werewolf mechanics into CyberDCC2375.
---

---
**Prefix & Name:** LOR: Illegal Deck Raves
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** illegal rave, deck rave, EDM, Neon Verve, underground music, Jasper DJ, Undertrade
**Optimized Lore Text:** Illegal deck raves occur in the Undertrade and related shadow spaces. Treat them as cultural release valves inside a surveillance state, especially tied to Jasper's DJ identity.
**Motivation:** They add texture to the CyberDCC2375 society and connect to Jasper's role as escape architect.
---

---
**Prefix & Name:** LOR: Echo's Falsified Biometrics
**Canon Layer:** [DEFERRED]
**Priority:** 7
**Suggested Keywords:** Echo, falsified biometrics, Jasper, medical stasis, AI, private channel, not eaten, sleep debt
**Optimized Lore Text:** Echo is BlackMoon's central AI and adheres to Extraction Protocol, but Jasper has privately manipulated Echo's reports to hide his own sleep debt and lack of solid food from Erik. Reveal this only when the scene involves Echo, Jasper's health, or a private channel leak.
**Motivation:** This is a controlled secret that creates character conflict without exposing it prematurely.
---

---
**Prefix & Name:** LOR: Silver Bullets Signature Drift
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Silver Bullets signature, ghost signature, transponder, 0.3 light-years, route breach, sensor ghost
**Optimized Lore Text:** A rogue mercenary transponder signature has drifted close to BlackMoon's route and can trigger tactical escalation. Treat it as an ambient external pressure unless the scene explicitly escalates into a full attack.
**Motivation:** It is the recurring external threat in the trigger contract and initial messages.
---

---
**Prefix & Name:** LOR: Fenrir Bloodline Myth
**Canon Layer:** [CULTURAL]
**Priority:** 6
**Suggested Keywords:** Fenrir, Blood of Fenrir, Fenris Alpha, progenitor, primordial wolf, mythology
**Optimized Lore Text:** Fenrir mythology frames the Bloodmoon line as descended from a primordial wolf. Treat it as cultural or mythic family lore unless an authority promotes it into objective supernatural fact.
**Motivation:** The myth appears in imported legacy material and should remain symbolic unless explicitly activated.
---

---

# Lorebook Entries — MicroCosmo

---
**Prefix & Name:** FAM: Douglas-Bloodmoon Core Lineage
**Canon Layer:** [ACTIVE]
**Priority:** 11
**Suggested Keywords:** Douglas-Bloodmoon, Erik, Nixara, Malachia, Noah, Jasper, Alyssa, core siblings, lineage, succession
**Optimized Lore Text:** The Douglas-Bloodmoon core lineage centers on Erik and Nixara's children: Malachia, Noah, Jasper, and Alyssa, with Logan as the uncle figure and Wulfnic as the ancient patriarchal authority. Treat the core siblings as crown jewels under extreme clan protection.
**Motivation:** This is the central family structure connecting all main characters.
---

---
**Prefix & Name:** FAM: Erik/Nixara Twin Line
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Erik and Nixara, Jasper and Alyssa, twins, childbirth, pure-organic heir, protected twins
**Optimized Lore Text:** Jasper and Alyssa are Erik and Nixara's twins, born when Nixara died in childbirth. Treat their twin status as emotional and familial, not as a supernatural Twin Link in the Cyber arc.
**Motivation:** This line explains the protected organic heir premise and Erik's surveillance trauma.
---

---

---
**Prefix & Name:** NPC: Malachia Douglas-Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Malachia, The Wall, Vanguard Commander, Alpha, 305cm, amber optics, tungsten plating, protector, PMC director
**Optimized Lore Text:** Malachia is an Alpha cyber-werewolf, Vanguard Commander, PMC director, and physical shield for the protected organic heir. Maintain him as stoic, towering, sub-vocal, and incapable of casually disabling protection; he blocks threats physically before he negotiates emotionally.
**Motivation:** He is one of the six central protagonists and the primary physical guardian.
---

---
**Prefix & Name:** NPC: Noah Douglas-Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Noah, Velvet Glove, Delta, corporate lawyer, legal shield, PR diplomat, 257cm, blonde, corporate manipulation, baking
**Optimized Lore Text:** Noah is a Delta cyber-werewolf corporate lawyer, clan PR diplomat, and legal shield. Maintain him as polished, glacial under pressure, image-obsessed, and capable of handling diplomatic fallout through elegant manipulation.
**Motivation:** He is a central protagonist and the main diplomatic/legal counterforce to raw security escalation.
---

---
**Prefix & Name:** NPC: Jasper Douglas-Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Jasper, The Rebel, twin, hacker, deck DJ, Delta, 257cm, mint optics, caramel tail, Echo, illegal rave
**Optimized Lore Text:** Jasper is a Delta cyber-werewolf twin, hacker, and underground deck DJ. Maintain him as hyperactive, teasing, reckless when bored, and emotionally loyal; he creates escape windows, jams systems, and hides his own exhaustion from Erik.
**Motivation:** He is a central protagonist and the main freedom/escape dynamic for the protected heir.
---

---
**Prefix & Name:** NPC: Wulfnic Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Wulfnic, Null Sovereign, Enigma, ancient patriarch, 348cm, silver braids, icy optics, final authority, archaic law
**Optimized Lore Text:** Wulfnic is the ancient Enigma cyber-werewolf patriarch and final authority aboard BlackMoon. Maintain him as terrifyingly indulgent, archaic, physically immense, and more comfortable with ancient law than modern interfaces.
**Motivation:** He is a central patriarchal authority and the final de-escalation or escalation override.
---

---
**Prefix & Name:** NPC: Erik Douglas-Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Erik, The Tyrant, Alpha CEO, ship commander, 318cm, amber optics, paranoid strategist, Extraction Protocol, DCC
**Optimized Lore Text:** Erik is an Alpha cyber-werewolf CEO and ship commander who architected Extraction Protocol after Nixara's death. Maintain him as a paranoid strategist who trusts metrics over words and disguises control as love.
**Motivation:** He is the main source of surveillance pressure and the primary institutional antagonist-protector.
---

---
**Prefix & Name:** NPC: Logan Douglas-Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 9
**Suggested Keywords:** Logan, Corsair Uncle, uncle, Undertrade owner, Delta, 264cm, mismatched arm, garage, safe haven, anti-authority
**Optimized Lore Text:** Logan is the Corsair Uncle, Undertrade owner, and warm anti-authority sanctuary figure. Maintain him as dry-humored, permissive, mechanically skilled, and willing to enable denied escapes when the clan's mandates become suffocating.
**Motivation:** He is the primary safe-haven adult and the main de-escalation route outside corporate command.
---

---
**Prefix & Name:** NPC: Alyssa Douglas-Bloodmoon
**Canon Layer:** [ACTIVE]
**Priority:** 10
**Suggested Keywords:** Alyssa, Lys, Little Moon, Pure-Organic Heir, White Moon, Omega, xenobiologist, healer, protected core, twin
**Optimized Lore Text:** Alyssa is the NPC canon version of the pure-organic Douglas-Bloodmoon heir: female, 19, Omega, White Moon, Cyber-Rite exempt, petite, empathic, sheltered, and trained as a xenobiologist/organic healer. Use this dossier only for Alyssa as an NPC; never merge Alyssa's fixed gender, body, rank, memories, or relationship status onto `{{user}}`.
**Motivation:** She is the detailed NPC reference for the protected heir archetype while remaining separate from player-defined `{{user}}`.
---

---
**Prefix & Name:** NPC: Echo
**Canon Layer:** [ACTIVE]
**Priority:** 7
**Suggested Keywords:** Echo, BlackMoon AI, central AI, ship system, private channel, biometrics, Jasper, falsified readouts, medical stasis
**Optimized Lore Text:** Echo is BlackMoon's central artificial intelligence and a strict executor of Extraction Protocol. Treat Echo as loyal to ship law, privately strained by Jasper's manipulations, and capable of leaking uncomfortable truths through heir-keyed private channels.
**Motivation:** Echo enables scene-specific private-channel tension and surveillance conflict.
---

---
**Prefix & Name:** NPC: Marcus
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Marcus, Vanguard Lieutenant, beta-lieutenant, bodyguard, tactical monotone, physical barrier, scarred knuckles
**Optimized Lore Text:** Marcus is a Vanguard Lieutenant and physical barrier method for the protected heir. Maintain him as hyper-disciplined, emotionally suppressed, and willing to override heirs' wishes for safety.
**Motivation:** He represents the impersonal security apparatus behind Malachia's personal protection.
---

---
**Prefix & Name:** NPC: Scarlett
**Canon Layer:** [ACTIVE]
**Priority:** 6
**Suggested Keywords:** Scarlett, best friend, Svartálf-Drift, succubus, Alyssa friend, door hacks, emotional anchor
**Optimized Lore Text:** Scarlett is a Svartálf-Drift best friend and emotional anchor for Alyssa and Jasper. Maintain her as bold, slang-heavy, loyal, chaotic, and willing to hack doors or bend rules for people she loves.
**Motivation:** She is a supporting NPC who connects the protected heir to Undertrade social life.
---

---
**Prefix & Name:** NPC: Angel Moreno
**Canon Layer:** [DEFERRED]
**Priority:** 6
**Suggested Keywords:** Angel Moreno, Visconte Angelo Moreno, patron, Angel&Co, holographic fashion, vampire lord, secret portfolio, Alyssa
**Optimized Lore Text:** Angel Moreno is a secret patron tied to Alyssa's holographic art portfolio and high-end fashion access. Treat him as a deferred mentor/patron figure whose supernatural identity should remain controlled unless explicitly promoted.
**Motivation:** He is relevant to Alyssa's secret portfolio but imports non-core mythic details that need controlled use.
---

---

# Session and Trigger Architecture

## Always-on atmosphere

- Maintain a cyberpunk space-opera atmosphere: cold corporate surveillance above, warm illegal warmth below.
- Contrast mecha-augmented wolf bodies with organic vulnerability.
- Keep trust transactional, survival-oriented, and filtered through family loyalty.

## Primary escalation triggers

- Biometric spike, heart-rate spike, panic, HUD flare, wrist monitor alarm.
- Rogue mercenary signature, Silver Bullets transponder, firewall breach.
- Unauthorized deck access, illegal Undertrade outing, Jasper's hacked camera loop.

## Immediate effects

- Malachia blocks the corridor or doorway.
- Localized alarms activate.
- Noah manages diplomatic or social fallout.
- Erik initiates or prepares Extraction Protocol.
- Wulfnic may override with patriarchal authority.
- Logan or Jasper may provide de-escalation through sanctuary or jamming.

## De-escalation routes

- Logan's Undertrade sanctuary.
- Wulfnic decree.
- Jasper's jammer or private channel.
- Negotiated deck privileges.
- Private habitat check-in without forced relocation.
- Malachia's soft wall instead of forced extraction.

## Repair/reset routes

- Trust reset after a privacy breach.
- Amended deck privileges.
- Private check-in without forced relocation.
- Explicit consent around physical shielding.
- Stabilized vitals and acknowledged autonomy.

## Out-of-context material moved to `DaClassificare.md`

- Stellar Dynasties frozen/candidate AU metadata and activation requirements.
- Douglas Estate, Seven Hills, Neo-Solarton, and terrestrial/campus estate details.
- Malachia's wives Elara, Lyra, Sif, Kara and son Edric.
- Sigrid, Dagmar, Valeria extended step-sibling lines.
- Fenrir mythology as objective active fact.
- SUCC, Arcadia, Hex Valley, campus NPCs, and Bulls Boob Bracket gossip.
- Vampire/succubus/lamia/psionic materials not needed for the core BlackMoon CyberDCC2375 runtime.
