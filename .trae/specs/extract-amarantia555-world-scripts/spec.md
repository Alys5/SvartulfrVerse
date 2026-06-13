# Estrazione e generazione script Amarantia555

## Why
La cartella `Amarantia555/legacy` contiene materiale storico sufficiente per un bot JanitorAI completo: metadata pubblico, bio HTML, scenario, persona NPC Alyssa, profili dei sei warlord, messaggi iniziali, visual DNA, world high fantasy e script legacy. Senza una fase di normalizzazione, gli script generati rischierebbero di copiare inconsistenze legacy, fondere Alyssa NPC con `{{user}}`, violare le regole SvartulfrVerse su MacroCosmo/MicroCosmo, `context`, persistenza e token budget.

## Analisi del legacy
- `1_public_metadata.md` definisce titolo, chat names, tag, short description e prompt per cover/emblem/banner/ambienti.
- `2_character_bio.html` contiene user contract, warning, world/lore summary, protagonisti, scenari iniziali e riferimento al vecchio micro-engine L2.
- `3_scenario.md` contiene invarianti di world, lore, contesto, session logic e trigger contract.
- `4_persona_alyssa.md` contiene una persona NPC canon Female per Alyssa/Eiriksbarn, da trattare come NPC separata o twin canon solo quando il ruolo utente lo stabilisce.
- `5_main_character_profiles.md` contiene sei profili NPC: Magnus, Njal, Jorund, Alrik, Eirik, Leif.
- `6_initial_messages.md` contiene cinque scene iniziali con timestamp, location, weather, tension, status block e relazioni attive.
- `Visual_DNA.md` e `W_HighFantasy.md` contengono DNA visivo high fantasy, palette, architettura e prompt immagine.
- `Amarantia555.js` e `L2_svartulfrverse_ClanJarnGildiWarlords.js` sono duplicati legacy con dinamic lore per Járn-Gildi, Hold-Kaupmenn, Vax, raid e boundary Alyssa.
- `W_HighFantasy.js` contiene un engine di lore complesso con entries per Iron Keep, Vax, Sarrow, Kelsi, Scarlett, Marcus, Angel Moreno, Prof. Helena Weiss.

Conflitti e rischi rilevati:
- `context` non è sempre guardato nei legacy script; `L2_svartulfrverse_ClanJarnGildiWarlords.js` accede a `context.history`, API non allineata con le specifiche attuali.
- Gli script legacy usano prefissi/iniezioni non sempre conformi all'append-only rule.
- Manca attribuzione `database/` e Canon Layer tag nelle voci lore legacy.
- Esiste rischio di confusione tra `{{user}}` Eiriksbarn e NPC Alyssa/Eiriksbarn.
- Il termine `Eirik/Nixara` nel legacy script non coincide con `Eirik/Nixara` nel bio HTML.
- Il sistema deve escludere White Moon, Alpha/Omega dynamics e werewolf rank quando non esplicitamente stabilito.
- Twin-Bond deve essere condizionale solo se l'utente interpreta il twin di Jorund.

## What Changes
- Viene generata una nuova architettura JanitorAI Script per `Amarantia555`, separata da `legacy/`.
- Viene adottato lo stack MacroCosmo/MicroCosmo: Context Control, Context Control Awareness, Complex Lorebook, Adaptive Lorebook, Context Aware Multiple Character e Advanced Faction Management.
- Vengono generati script di caricamento, validazione, aggiornamento e persistenza dello stato, usando solo `context` e solo i campi consentiti.
- Vengono generati script MacroCosmo per world, lore, locations, organizations e bestiary/creature provenienti dal legacy.
- Vengono generati script MicroCosmo per Járn-Gildi/Svartúlfr, warlords e NPC Alyssa boundary.
- Vengono aggiunti test unitari per parsing, mapping, validazione, persistenza, injection append-only, compatibilità ES5 e assenza di feature ristrette.
- Viene aggiunta documentazione inline minima e coerente negli script.

**BREAKING**: gli script legacy `Amarantia555.js`, `L2_svartulfrverse_ClanJarnGildiWarlords.js` e `W_HighFantasy.js` non devono essere copiati acriticamente negli script finali; il nuovo sistema li tratta come fonte storica e li sostituisce con implementazioni conformi alle regole attuali.

## Impact
- Affected specs:
  - MacroCosmo / MicroCosmo architecture.
  - Context Control + Context Control Awareness.
  - Complex Lorebook + Adaptive Lorebook.
  - Context Aware Multiple Character.
  - Advanced Faction Management.
  - State persistence, validation, and debug rules.
- Affected code:
  - `Amarantia555/legacy/**`
  - `Amarantia555/**`
  - `template/**`
  - `.trae/rules/**`
  - eventuali test sotto `Amarantia555/tests/**` o struttura test esistente coerente con il repository.

## ADDED Requirements
### Requirement: Legacy Data Extraction
Il sistema SHALL analizzare tutti i file in `Amarantia555/legacy` e produrre una mappatura normalizzata di:
- metadata pubblico;
- user contract;
- world invariants;
- lore invariants;
- session logic;
- trigger contract;
- locations;
- factions;
- family/dynasty hooks;
- six warlord NPC records;
- Alyssa NPC boundary;
- initial scene templates;
- visual DNA;
- legacy script behavior.

#### Scenario: Complete legacy inventory
- **WHEN** l'analisi legge `Amarantia555/legacy`
- **THEN** ogni file viene inventariato con entità estratte, riferimenti incrociati, conflitti e canon layer.

### Requirement: Context and Budget Integration
Il sistema SHALL generare script runtime che inizializzano `context.character`, `context.character.personality` e `context.character.scenario`, leggono `[CONTEXT BUDGET: ...]` quando disponibile e degradano il dettaglio da `full` a `summary` a `bullet`.

#### Scenario: Missing context
- **WHEN** `context`, `context.character`, `context.character.personality` o `context.character.scenario` sono mancanti o non stringhe
- **THEN** lo script li normalizza in modo sicuro prima di leggere o scrivere.

### Requirement: MacroCosmo Scripts
Il sistema SHALL generare script MacroCosmo con prefissi dominio per:
- `WRD_Amarantia555.js` per world core e regole fisiche/magiche;
- `LOR_Amarantia555.js` per eventi, artefatti, storia, Nixara, Name-Truth e Twin-Bond;
- `LOC_Amarantia555.js` per Iron Keep, Álfar-viðr, Dovre Pass, Silfr-Mynt e interni;
- `ORG_Amarantia555.js` per Járn-Gildi, Svartúlfr Clan, Einherjar, Hold-Kaupmenn, Vax slave traders;
- `BST_Amarantia555.js` solo per creature/minacce se estratte dal legacy.

#### Scenario: Domain activation
- **WHEN** l'utente o l'AI menziona un dominio specifico
- **THEN** si attiva solo il dominio MacroCosmo pertinente, con keyword specifiche e filtri per evitare attivazioni accidentali.

### Requirement: MicroCosmo Scripts
Il sistema SHALL generare script MicroCosmo con prefissi dominio per famiglie e NPC:
- `FAM_JarnGildi_Amarantia555.js` per Svartúlfr/Járn-Gildi, genealogy hooks, ward protocol, resources, reputation e timeline;
- `NPC_Magnus_Amarantia555.js`;
- `NPC_Njal_Amarantia555.js`;
- `NPC_Jorund_Amarantia555.js`;
- `NPC_Alrik_Amarantia555.js`;
- `NPC_Eirik_Amarantia555.js`;
- `NPC_Leif_Amarantia555.js`;
- `NPC_Alyssa_Amarantia555.js` come boundary NPC, non come sostituzione di `{{user}}`.

#### Scenario: Alyssa boundary
- **WHEN** `{{user}}` non è stabilito come Alyssa twin
- **THEN** Alyssa NPC non viene fusa con `{{user}}`, né vengono ereditati corpo, sesso, personality, memorie o kink dal file `4_persona_alyssa.md`.

### Requirement: State Persistence and Validation
Il sistema SHALL includere meccanismi di persistenza per:
- current scene;
- day/time/weather/tension;
- active location;
- ward state;
- active characters;
- known threats;
- Twin-Bond flag;
- user-contract boundary flags.

La persistenza può usare zero-width state o visible flags, ma SHALL:
- usare marcatori unici per script;
- validare lo stato prima di applicarlo;
- fallback su default sicuri;
- includere istruzioni di riproduzione per l'AI;
- fornire `DEBUG_MODE`.

#### Scenario: Invalid state
- **WHEN** lo stato decodificato è mancante, corrotto o fuori range
- **THEN** il sistema usa default validi e non blocca il runtime.

### Requirement: Unit Tests
Il sistema SHALL includere test unitari che verificano:
- parsing dei file legacy;
- mapping verso MacroCosmo e MicroCosmo;
- validazione schema NPC;
- validazione state;
- injection append-only;
- gestione contesto mancante;
- assenza di feature JS ristrette;
- assenza di riferimenti a `database_old/`;
- presenza di source attribution `database/` e Canon Layer tag;
- compatibilità con template ufficiali.

#### Scenario: Test failure
- **WHEN** un test rileva una violazione runtime, un conflitto canonico o una feature ristretta
- **THEN** il test fallisce indicando file e motivo.

## MODIFIED Requirements
### Requirement: Existing Legacy Data
I dati in `Amarantia555/legacy` SHALL essere trattati come fonte storica. Ogni script generato SHALL normalizzare i dati secondo:
- `.trae/rules/rules.md`;
- `README.md`;
- `template/janitorai_scripts.md`;
- i README dei template usati;
- MacroCosmo/MicroCosmo governance;
- attribuzione `database/`;
- Canon Layer tag: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`.

#### Scenario: Legacy migration
- **WHEN** un dato legacy viene migrato in uno script
- **THEN** riceve `keywords`, `priority`, `category`, `source`, `canonLayer`, `personality`, `scenario` e, se applicabile, `filters`, `triggers`, `minMessages`, `maxMessages`.

### Requirement: Existing Script Behavior
Gli script legacy possono essere consultati per comprendere comportamento e stile, ma non devono essere copiati se usano API obsolete, iniezioni non append-only o mancano di validazione.

#### Scenario: Legacy script conflict
- **WHEN** un comportamento legacy viola una regola runtime
- **THEN** il nuovo script preserva l'intenzione funzionale usando ES5, `context`, guards, validazione e persistenza conforme.

## REMOVED Requirements
### Requirement: Direct Legacy Reuse
**Reason**: `Amarantia555/legacy` non garantisce compatibilità con le regole runtime attuali.
**Migration**: estrarre dati, validarli, normalizzarli e generare nuovi script sotto `Amarantia555`.

### Requirement: Monolithic Engine
**Reason**: un engine monolitico aumenta il rischio di collisioni, duplicazioni, superamento del token budget e mancata validazione.
**Migration**: usare moduli separati per context, MacroCosmo, MicroCosmo, faction, state, validation e test.
