# Svartúlfr Urban - Wyvern Migration Plan (Global)

Questo è il piano di implementazione globale per convertire il materiale grezzo di "Svartúlfr Urban" (attualmente in Drafts) nel formato strutturato richiesto da Wyvern.

## Obiettivo

Importare e mappare la complessa lore del mondo Svartúlfr, utilizzando i file standard e ottimizzati per la piattaforma Wyvern (World Info, Environments, Locations, Lexicons, Scenarios, Character Cards) secondo le linee guida ufficiali.

## Documentazione di Riferimento

- [Wiki di Wyvern Chat](https://wiki.wyvern.chat)
- [Guide_World.md](Guide_World.md) (Guida Ufficiale e Riferimento di Formattazione)

## Fasi dell'Implementazione (Allineate alla Build Order di Wyvern)

### [COMPLETATO] Step 1: World Info & Details

- Generazione del file `world_info.md` strutturato in base alla World Creator Guide di Wyvern.
- Inclusione dell'Overview del mondo, Writing Style & Tone (Hard World Laws), Formatting Rules (Macro AnyPOV) e configurazione dello Span Depth e NPC Dialogue Markers.

### [COMPLETATO] Step 2: Environments

- Estrazione dei 6 macro-ambienti (Blackwood Forest, Blackwood City, Hex Valley, Solarton, Los Angeles, Bakersfield).
- Formattazione con i campi strutturali di Wyvern: `Context Description` e `Final Instructions`.
- Gestione dei Sensory Signatures per stabilire l'atmosfera narrativa primaria.

### [COMPLETATO] Step 3: Locations

- Configurazione gerarchica delle location (distretti, edifici principali, nascondigli) nel file `locations.md`.
- Associazione ai rispettivi Parent Locations e Environments per l'ereditarietà delle `Final Instructions` e dei pool.

### [COMPLETATO] Step 4: Characters (Main Cast)

- Creazione dei Character Lexicon / Lorebook individuali (JSON) in `Wyvern/characters` **SOLO** per il Main Cast di Tier 1 (Erik, Malachia, Noah, Jasper, Logan, Edric, Wulfnic, Ut e Zefir).
- Formattazione delle descriptions utilizzando il formato PPP (Pronoun Pruned Prose) come richiesto dalle best practice di Wyvern.
- Separazione strutturale tra Long Summary (per il prompt principale) e Summary (condensato).

### [COMPLETATO] Step 5: Lexicon Entries

- Migrazione massiva (oltre 1.000 entry) dei vecchi file JSON e Markdown nei 13 file modulari Lexicon all'interno di `Wyvern/lexicon/`.
- Gestione di location minori/lore, NPC secondari, items e lore globale tramite entries Lexicon (Keyword + Logic) ottimizzate a risparmio di token.
- Audit e Gap Recovery completato per l'integrazione di tutte le informazioni isolate.

### [DA FARE] Step 6: Scenarios & Guided Intro

- Creazione del setup iniziale del mondo (Scenario e Guided Intro) per l'interfaccia di Wyvern.
- Definizione dell'hook narrativo per lo start del mondo (Data di inizio: **26 Agosto 2024**, primo giorno del semestre alla SUCC).
- Configurazione del starting location, character pool overrides e branching system per l'onboarding.

### [DA FARE] Step 7: Graphic Assets Prompts

- Creazione di `assets/prompts.md` per assicurare uniformità generativa (AI Image Generation) per i personaggi e i luoghi del mondo Svartúlfr.
