# Iceland827 Legacy Analysis and World Script Generation Spec

## Why

La cartella `Iceland827/legacy` contiene materiale storico per il mondo Svartúlfr/Járn-Gildi: metadata pubblico, bio, scenario, persona `Alyssa`, profili dei sei warlord, messaggi iniziali, Visual DNA e script legacy. Serve generare un sistema JanitorAI modulare che trasformi questi dati in runtime compatibili, verificabili e governati da MacroCosmo/MicroCosmo, senza copiare acriticamente script legacy incompatibili.

## What Changes

- Viene eseguita un'analisi completa dei dati testuali e script in `Iceland827/legacy`.
- Vengono generati script runtime ES5 sotto `Iceland827/runtime` per contesto, MacroCosmo, MicroCosmo family/NPC, coerenza, stato e validazione.
- Viene introdotta persistenza runtime tramite marker visibili/zero-width estratti dal testo AI, perché gli script JanitorAI sono stateless tra le esecuzioni.
- Vengono generati test unitari Node per validare inventario legacy, mapping, injection append-only, gestione contesto mancante, assenza di feature ristrette e coerenza canonica.
- Viene aggiunta documentazione inline minima negli script, senza creare documentazione esterna non richiesta.

## Impact

- Affected specs:
  - MacroCosmo / MicroCosmo architecture.
  - Context Control + Context Control Awareness.
  - Complex Lorebook + Adaptive Lorebook.
  - Context Aware Multiple Character.
  - Advanced Faction Management.
  - State persistence and validation rules.
- Affected code:
  - `Iceland827/legacy/**`
  - `Iceland827/runtime/**`
  - `Iceland827/tests/**`
  - `template/**`
  - `.trae/rules/**`

## ADDED Requirements

### Requirement: Iceland827 Legacy Analysis
Il sistema SHALL analizzare tutti i file in `Iceland827/legacy` per estrarre e classificare:

- world facts: era, atmosfera, regole fisiche/magiche, Visual DNA;
- locations: Iron Keep, Dovre Pass, Silfr-Mynt Tavern, Álfar-viðr;
- organizations/factions: Svartúlfr Clan, Járn-Gildi Iron Guild, Hold-Kaupmenn, Vax slave traders;
- family/dynasty data: Eiriksbarn lineage, Eirik/Nixara, Twin-Bond condition, Family Authority ownership;
- character identity: Magnus, Njal, Jorund, Alrik, Eirik, Leif, Alyssa/NPC boundary;
- relationships: guardian, twin, patriarch, jarl, corsair, user autonomy;
- scenario and initial messages: day/time/weather, tension, status block examples;
- existing script behavior: L2 dynamic lore and legacy engine compatibility gaps;
- canon-sensitive information: no White Moon, no Alpha/Omega dynamics, no werewolf rank, Twin-Bond only if Jorund's twin, {{user}} traits not assumed.

#### Scenario: Complete legacy inventory
- **WHEN** l'analisi legge `Iceland827/legacy`
- **THEN** produce mapping verificabile di file sorgente, entità estratte, riferimenti incrociati, conflitti, duplicazioni e dati mancanti.

### Requirement: Generated Runtime Scripts
Il sistema SHALL generare script JanitorAI sotto `Iceland827/runtime` per:

- caricamento di dati embedded;
- validazione di contesto, stato, sorgenti e Canon Layer;
- aggiornamento controllato tramite state markers;
- persistenza visibile/zero-width dello stato;
- controllo coerenza contesto/personaggi;
- gestione MacroCosmo world/location/organization;
- gestione MicroCosmo family/NPC;
- gestione relazioni, presenza scenica e attivazione dei sei warlord.

#### Scenario: JanitorAI compatibility
- **WHEN** uno script runtime viene eseguito nel sandbox JanitorAI
- **THEN** usa solo `context` come interfaccia e modifica solo `context.character.personality`, `context.character.scenario`, e `context.character.example_dialogs`.

### Requirement: MacroCosmo / MicroCosmo Architecture
Il sistema SHALL usare il modello MacroCosmo/MicroCosmo come architettura principale:

- `WRD:` per regole mondo e atmosfera minima;
- `LOC:` per Iron Keep, Dovre Pass, Silfr-Mynt, Álfar-viðr;
- `ORG:` per Járn-Gildi, Svartúlfr Clan, Hold-Kaupmenn, Vax;
- `FAM:` per Eiriksbarn lineage, Twin-Bond condition, Family Authority;
- `NPC:` per Magnus, Njal, Jorund, Alrik, Eirik, Leif e boundary NPC Alyssa.

#### Scenario: Keyword activation
- **WHEN** il contesto contiene `Iron Keep`, `Dovre Pass`, `Járn-Gildi`, `Magnus`, `Jorund`, `Twin-Bond`, o `Vax`
- **THEN** viene attivato solo lore pertinente, con source `database/...` e Canon Layer tag.

### Requirement: Character Boundary and User Agency
Il sistema SHALL preservare il boundary tra `{{user}}` e NPC Alyssa:

- non assegnare genere, aspetto, personalità, sesso, Twin-Bond o White Moon a `{{user}}` finché non sono stabiliti;
- trattare Alyssa come NPC/dev-test twin solo quando il contesto attiva explicitamente Alyssa;
- non collassare Alyssa e `{{user}}` quando `{{user}}` gioca il twin di Jorund.

#### Scenario: User persona open
- **WHEN** il contesto non definisce sesso, genere, aspetto, Twin-Bond o White Moon
- **THEN** gli script devono impedire inferenze attive e mantenere quei campi open/conditional.

### Requirement: State Persistence and Validation
Il sistema SHALL implementare persistenza tramite marker unici, ad esempio:

- visible: `[IC827_STATE:visible]sceneFocus=...;activeParticipants=...;flags=...;lastCanonSource=database/...;[/IC827_STATE]`
- zero-width: `[IC827_STATE:zero]...[/IC827_STATE:zero]`

Lo stato SHALL validare chiavi note, lunghezza, source `database/`, assenza di `database_old/`, e Canon Layer validi.

#### Scenario: State update
- **WHEN** il contesto contiene un blocco `[IC827_STATE:visible]` valido
- **THEN** lo script normalizza, serializza e ri-appende stato visibile/zero-width senza duplicare istruzioni.

### Requirement: Unit Tests
Il sistema SHALL includere test unitari per verificare:

- inventario completo di `Iceland827/legacy`;
- mapping verso MacroCosmo/MicroCosmo;
- parsing di persona/scenario/profile/initial messages;
- injection append-only;
- gestione di contesto mancante o invalido;
- validazione state markers;
- assenza di feature JS ristrette;
- assenza di riferimenti `database_old/`;
- presenza di source attribution e Canon Layer tag;
- coerenza di invarianti: età 19, Eiriksbarn, Hálf-Álfar, Name-Truth, iron aversion, no White Moon, Twin-Bond conditional.

#### Scenario: Test failure
- **WHEN** un test rileva violazione runtime, conflitto canonico, source mancante o layer invalido
- **THEN** il test fallisce con file, riga o motivo del fallimento.

## MODIFIED Requirements

### Requirement: Existing Legacy Data
I dati in `Iceland827/legacy` SHALL essere trattati come fonte storica e non come output finale direttamente copiabile. Ogni dato generato deve essere normalizzato secondo `.trae/rules/rules.md`, MacroCosmo/MicroCosmo, e attribuzione da `database/`.

#### Scenario: Legacy character migration
- **WHEN** un personaggio legacy viene migrato
- **THEN** viene mappato nelle categorie `identity`, `appearance`, `relationships`, `personality`, `psyche`, `advancedPsychology`, `backstory`, `dialogue`, `combat`, `capabilities`, `sampleDialog`, `residence`, `intimacy`, e `notes` quando rilevante.

### Requirement: Existing Script Behavior
Gli script legacy `W_HighFantasy.js`, `W_NorseMythic.js`, e `L2_svartulfrverse_ClanJarnGildiWarlords.js` possono essere consultati per intenzione e contenuto, ma non devono essere copiati se violano le regole runtime attuali.

#### Scenario: Legacy script conflict
- **WHEN** uno script legacy usa feature non compatibili o lore non pertinente
- **THEN** il nuovo script genera la stessa intenzione funzionale con ES5, `var`, keyword-triggering, source attribution, e Canon Layer tag.

## REMOVED Requirements

### Requirement: Direct Legacy Reuse
**Reason**: `Iceland827/legacy` è fonte storica e non garantisce compatibilità con le regole runtime attuali.
**Migration**: estrarre dati e intenzioni, validarli, normalizzarli, e generare nuovi script sotto `Iceland827/runtime`.

### Requirement: Monolithic Runtime Script
**Reason**: uno script monolitico rischia di superare budget, creare collisioni di stato, e rendere difficile la validazione.
**Migration**: usare moduli separati per context, world, family, NPC, coherence, state, validation, e test.
