# Integrazione Memories Raw in World Export Spec

## Why
Il file `memories.json` è un archivio di memorie conversazionali e di progetto, non una fonte lore World primaria. Può contenere riferimenti al contesto SvartulfrVerse, personaggi e preferenze di sviluppo, ma la maggior parte dei dati riguarda preferenze utente, task recenti, architettura e memoria conversazionale. È necessario estrarre solo dati World-layer canonici e coerenti, evitando di importare preferenze, chat memory, prompt, macro, task tecnici o metadati personali in `2_Export/World`.

## What Changes
- Analisi strutturata di `memories.json` per identificare sezioni `conversations_memory`, `project_memories` e altri campi.
- Classificazione dei contenuti in: World lore utilizzabile, Character/Experience/Engine meta, preferenze utente, task recenti, architettura, prompt/macro e rumore.
- Integrazione condizionata in `2_Export/World` solo per dati World/MacroCosmo/MicroCosmo coerenti e non conflittuali.
- Nessuna modifica se i contenuti sono solo memoria utente/progetto, preferenze, task o architettura.
- Controllo finale di JSON, conflitto, hygiene e assenza modifiche non necessarie.

**BREAKING**: Nessuna modifica breaking prevista. Le memorie non devono essere trattate come fonte canonica primaria se confliggono con lorebook, ADR, workflow o template esistenti.

## Impact
- Affected specs: World lorebook structure, source authority, export hygiene, memory data handling.
- Affected code: probabilmente nessuno in `2_Export/World/**/*.json`, salvo scoperta di dati World non vuoti e coerenti durante l'analisi.

## ADDED Requirements
### Requirement: Analisi memorie
Il sistema SHALL leggere `memories.json`, verificare la struttura e il contenuto di ciascuna sezione prima di decidere se integrare dati.

#### Scenario: Memorie non lore
- **WHEN** i contenuti riguardano preferenze utente, task recenti, macro, initial messages, architettura o memoria conversazionale
- **THEN** il sistema non modifica `2_Export/World`

### Requirement: Filtro World-layer
Il sistema SHALL integrare solo dati relativi a mondi, luoghi, organizzazioni, timeline, cultura, creature, famiglie, relazioni canoniche, segreti o regole World coerenti con i domini esistenti.

#### Scenario: Dato World integrabile
- **WHEN** una memoria contiene un fatto World non vuoto, coerente e non conflittuale
- **THEN** viene mappato al lorebook del dominio corrispondente con prefix canonico, Canon Layer valido e source non unspecified

### Requirement: Esclusione contenuti non World
Il sistema SHALL escludere da `2_Export/World` preferenze utente, deliverable format, macro pronoun, task recenti, prompt engineering, engine/runtime metadata, character sheet, initial message, bot card e chat state.

#### Scenario: Contenuto vietato
- **WHEN** un contenuto contiene `{{sub}}`, `{{user}}`, preferenze di output, task tecnici o memoria personale
- **THEN** non viene integrato nei lorebook World

### Requirement: Igiene runtime e lorebook
Il sistema SHALL non introdurre riferimenti a percorsi locali, URL, TODO-CANON, debug metadata, scene attive, NPC attivi da Scenario o logica di opening message nei lorebook World.

#### Scenario: Validazione
- **WHEN** viene prodotta una modifica
- **THEN** i lorebook modificati restano JSON validi, con prefix canonico, Canon Layer valido, source non unspecified e assenza di metadata proibiti

## MODIFIED Requirements
### Requirement: Autorità delle fonti
Le memorie legacy hanno priorità inferiore rispetto a lorebook esistenti, ADR, workflow e template canonici. In caso di conflitto, prevale la fonte World già consolidata.

## REMOVED Requirements
### Requirement: Nessuna rimozione
Non sono previste rimozioni di funzionalità o dati esistenti.
