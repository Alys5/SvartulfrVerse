# Analisi Legacy CyberDCC2375 e Generazione Script Mondo/Personaggi

## Why

La cartella `CyberDCC2375/legacy` contiene metadata, bio, scenario, profili, messaggi iniziali, visual DNA e script legacy per il mondo CyberDCC2375. Prima di generare script JanitorAI è necessario analizzare tutti i dati disponibili, normalizzarli secondo le regole SvartulfrVerse e produrre un sistema modulare che gestisca mondo, personaggi, contesto, validazione, aggiornamento e persistenza.

## What Changes

- Viene eseguita un'analisi completa dei file testuali in `CyberDCC2375/legacy`.
- Vengono identificati dati world, location, faction, family, character, relationship, visual, scenario, dialogue e state.
- Vengono generati script JanitorAI sotto `CyberDCC2375` per contesto, MacroCosmo, MicroCosmo, personaggi, validazione, aggiornamento e persistenza.
- Vengono generati test unitari per verificare parsing, validazione, mapping, injection append-only, compatibilità ES5 e coerenza dei dati.
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
  - `CyberDCC2375/legacy/**`
  - `CyberDCC2375/**`
  - `template/**`
  - `.trae/rules/**`
  - eventuali test sotto `CyberDCC2375/tests/**` o `tests/**`, se coerente con la struttura esistente.

## ADDED Requirements

### Requirement: Legacy Data Analysis
Il sistema SHALL analizzare tutti i file testuali e script presenti in `CyberDCC2375/legacy` per estrarre:

- metadata pubblico;
- bio e descrizione personaggio;
- scenario e messaggi iniziali;
- persona e profili personaggi;
- world facts;
- location;
- organizations/factions;
- family/dynasty data;
- character identity;
- visual data;
- relationships;
- combat/capabilities;
- psyche/personality;
- dialogue style;
- existing script behavior;
- asset references;
- canon-sensitive information.

#### Scenario: Complete legacy inventory
- **WHEN** l'analisi legge `CyberDCC2375/legacy`
- **THEN** produce una mappatura verificabile dei file sorgente, delle entità estratte, dei riferimenti incrociati e dei potenziali conflitti.

### Requirement: Generated Runtime Scripts
Il sistema SHALL generare script JanitorAI sotto `CyberDCC2375` per:

- caricamento dei dati legacy normalizzati;
- validazione dei dati;
- aggiornamento delle informazioni attive;
- persistenza dello stato;
- controllo della coerenza del contesto;
- gestione del mondo;
- gestione delle famiglie/dinastie;
- gestione dei personaggi/NPC;
- gestione delle relazioni e della presenza scenica.

#### Scenario: JanitorAI compatibility
- **WHEN** uno script runtime viene eseguito nel sandbox JanitorAI
- **THEN** usa solo `context` come interfaccia e modifica solo `context.character.personality`, `context.character.scenario`, e `context.character.example_dialogs`.

### Requirement: ES5 Runtime Compatibility
Ogni script runtime SHALL essere ES5-compatible e conservativo:

- usare `var`;
- evitare `let`, `const`, arrow functions, template literals, classi, `async`, `await`;
- non usare `import`, `export`, `require`, `Promise`, `fetch`, `XMLHttpRequest`, `setTimeout`, `setInterval`, `document`, `window`, `localStorage`, `sessionStorage`, `IndexedDB`, `fs`, `readFile`, `eval`, o `new Function`.

#### Scenario: Static compatibility check
- **WHEN** gli script vengono verificati
- **THEN** non contengono feature ristrette, salvo presenza esplicitamente autorizzata dai template ufficiali.

### Requirement: Unit Tests
Il sistema SHALL includere test unitari per verificare:

- parsing dei dati legacy;
- mapping verso categorie NPC;
- mapping MacroCosmo;
- validazione dello schema;
- persistenza visible/zero-width, se applicabile;
- injection append-only;
- gestione di contesto mancante o invalido;
- assenza di riferimenti a `database_old/`;
- assenza di feature JS ristrette.

#### Scenario: Test failure
- **WHEN** un test rileva un conflitto di canone, una violazione di schema, o un runtime incompatibile
- **THEN** il test fallisce e indica file, riga, e motivo del fallimento.

## MODIFIED Requirements

### Requirement: Existing Legacy Data
I dati in `CyberDCC2375/legacy` SHALL essere trattati come fonte storica e non come output finale direttamente copiabile. Ogni dato generato deve essere normalizzato secondo le regole SvartulfrVerse, MacroCosmo/MicroCosmo, ADR-006, e attribuzione da `database/`.

#### Scenario: Legacy character migration
- **WHEN** un personaggio legacy viene migrato
- **THEN** viene mappato nelle categorie `identity`, `appearance`, `relationships`, `personality`, `psyche`, `advancedPsychology`, `backstory`, `dialogue`, `combat`, `capabilities`, `sampleDialog`, `residence`, `intimacy`, e `notes` quando rilevante.

### Requirement: Existing Script Behavior
Gli script legacy possono essere consultati per comprendere comportamento e stile, ma non devono essere copiati acriticamente se violano le regole runtime attuali.

#### Scenario: Legacy script conflict
- **WHEN** uno script legacy usa feature non compatibili
- **THEN** il nuovo script generato implementa la stessa intenzione funzionale usando ES5 e API consentite.

## REMOVED Requirements

### Requirement: Direct Legacy Reuse
**Reason**: `CyberDCC2375/legacy` è una fonte storica e non garantisce compatibilità con le regole runtime attuali.
**Migration**: estrarre dati e intenzioni, validarli, normalizzarli, e generare nuovi script sotto `CyberDCC2375`.

### Requirement: Monolithic Runtime Script
**Reason**: uno script monolitico rischia di superare budget, creare collisioni di stato, e rendere difficile la validazione.
**Migration**: usare moduli separati per world, family, character, context, state, validation, e test.
