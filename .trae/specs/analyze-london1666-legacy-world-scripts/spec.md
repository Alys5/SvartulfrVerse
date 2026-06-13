# Analisi Legacy e Generazione Script Mondo London1666

## Why

La cartella `London1666/legacy` contiene dati legacy limitati ma importanti: metadata mondo Regency, Visual DNA ambientale e uno script scenario legacy con logica di attivazione e due NPC non riconciliati. Per generare un sistema JanitorAI coerente con `.trae/rules/rules.md`, questi dati devono essere analizzati, classificati per Canon Layer e trasformati in script runtime ES5, keyword-triggered, append-only e validati da test unitari.

## What Changes

- Viene eseguita un'analisi completa dei file in `London1666/legacy`: `W_Regency.md`, `Visual_DNA.md` e `W_Regency.js`.
- Vengono generati script runtime per `London1666` secondo il modello MacroCosmo / MicroCosmo, con stack minimo coerente: Context Control, Context Coherence, MacroCosmo world, MicroCosmo NPC, State Persistence, Validation.
- Vengono introdotti controlli espliciti per il conflitto temporale tra il nome cartella `London1666` e il contenuto legacy `Regency`; il contenuto Regency non deve essere trattato come active 1666 canon senza classificazione e test di coerenza.
- Vengono normalizzati i dati legacy in voci con attribuzione `database/` e Canon Layer tag `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, o `[CANDIDATE]`.
- Vengono implementati test unitari Node-style per inventario, compatibilità ES5/runtime, injection append-only, validazione, persistenza, attivazione keyword e gestione del contesto mancante.

**BREAKING**: `legacy/W_Regency.js` non deve essere riutilizzato direttamente come runtime attivo; può essere consultato solo come riferimento storico/comportamentale perché non include attribuzione `database/`, Canon Layer tag, validazione temporale e non segue integralmente le regole attuali di append-only e source hygiene.

## Impact

- Affected specs:
  - MacroCosmo / MicroCosmo architecture.
  - Context Control + Context Control Awareness.
  - Complex Lorebook + Adaptive Lorebook.
  - Context Aware Multiple Character.
  - State persistence and validation rules.
  - Legacy analysis and migration workflow.
- Affected code:
  - `London1666/legacy/**`
  - `London1666/runtime/**`
  - `London1666/tests/**`
  - `.trae/rules/**`
  - eventuali template ufficiali in `template/**`.

## ADDED Requirements
### Requirement: Legacy Data Analysis
Il sistema SHALL analizzare tutti i file testuali e script presenti in `London1666/legacy` per estrarre:

- metadata mondo, titolo, tema, description, message depth;
- visual DNA ambientale e parametri immagine;
- locations implicite: drawing rooms, carriages, estates, Georgian townhouses, grand estates, ballrooms, cobblestone streets;
- comportamento legacy dello script `W_Regency.js`;
- NPC legacy presenti nello script: Marcus e Visconte Angelo 'Angel' Moreno;
- riferimenti incrociati, conflitti, duplicazioni, dati mancanti e informazioni canon-sensitive.

#### Scenario: Complete legacy inventory
- **WHEN** l'analisi legge `London1666/legacy`
- **THEN** produce una mappatura verificabile dei file sorgente, delle entità estratte, dei riferimenti incrociati e dei potenziali conflitti.

### Requirement: Temporal and Canon Conflict Handling
Il sistema SHALL rilevare e proteggere il conflitto tra `London1666` e contenuto Regency/early 19th century.

#### Scenario: Regency content without resolution
- **WHEN** un runtime o test incontra `Regency`, `aristocratic`, `drawing room`, `carriage`, o `gas lamp` insieme a `London1666`
- **THEN** tratta il dato come `[HISTORICAL]` o `[CANDIDATE]` finché non esiste una fonte `database/` active che lo riconcilia esplicitamente con il 1666.

### Requirement: Generated Runtime Scripts
Il sistema SHALL generare script JanitorAI sotto `London1666/runtime` per:

- controllo contesto e budget minimo sempre-on;
- caricamento inline dei dati legacy normalizzati;
- validazione di source, Canon Layer, keywords e assenza di `database_old/`;
- aggiornamento append-only di `context.character.personality`, `context.character.scenario`, e `context.character.example_dialogs`;
- persistenza visible/zero-width dello stato di scena;
- controllo coerenza per contesto, personaggi, periodo storico e fonti;
- gestione world/MacroCosmo;
- gestione NPC/MicroCosmo con categorie adattive.

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

- inventario completo di `London1666/legacy`;
- parsing e classificazione di world, visual, scenario, e NPC legacy;
- mapping verso categorie NPC `identity`, `appearance`, `relationships`, `personality`, `psyche`, `advancedPsychology`, `backstory`, `dialogue`, `combat`, `capabilities`, `sampleDialog`, `residence`, `intimacy`, e `notes` quando rilevante;
- mapping MacroCosmo e MicroCosmo;
- validazione dello schema;
- persistenza visible/zero-width;
- injection append-only;
- gestione di contesto mancante o invalido;
- assenza di riferimenti a `database_old/`;
- assenza di feature JS ristrette;
- conflitto temporale London1666 vs Regency.

#### Scenario: Test failure
- **WHEN** un test rileva un conflitto di canone, una violazione di schema, o un runtime incompatibile
- **THEN** il test fallisce e indica file, riga, e motivo del fallimento.

## MODIFIED Requirements
### Requirement: Existing Legacy Data
I dati in `London1666/legacy` SHALL essere trattati come fonte storica/candidata e non come output finale direttamente copiabile. Ogni dato generato deve essere normalizzato secondo le regole SvartulfrVerse, MacroCosmo/MicroCosmo, e attribuzione da `database/`.

#### Scenario: Legacy world migration
- **WHEN** il metadata Regency viene migrato
- **THEN** viene incluso come world/visual lore con source attribution e Canon Layer appropriato, evitando di dichiararlo active London1666 canon senza fonte di riconciliazione.

### Requirement: Existing Script Behavior
Lo script legacy `W_Regency.js` può essere consultato per comprendere logica di activation window, priority, keyword matching, e NPC injection, ma non deve essere copiato acriticamente se viola le regole runtime attuali.

#### Scenario: Legacy script conflict
- **WHEN** lo script legacy usa assegnazioni dirette, NPC non attribuiti, o assenza di Canon Layer
- **THEN** il nuovo runtime implementa l'intenzione funzionale usando ES5, guardie `context`, append-only, source attribution e validazione.

## REMOVED Requirements
### Requirement: Direct Legacy Runtime Reuse
**Reason**: `London1666/legacy/W_Regency.js` non garantisce compatibilità con le regole runtime attuali e contiene dati non riconciliati con il periodo 1666.
**Migration**: estrarre comportamento, NPC e world/visual data; validarli; classificarli; generare nuovi script sotto `London1666/runtime`.

### Requirement: Monolithic Runtime Script
**Reason**: uno script monolitico rischia di superare budget, creare collisioni di stato, e rendere difficile la validazione.
**Migration**: usare moduli separati per context, world, NPC, state, validation, e coherence.
