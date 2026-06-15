# Integrazione Conversations Raw in World Export Spec

## Why
Il file `conversations.json` è un archivio di conversazioni legacy, non un progetto strutturato. Può contenere riferimenti sparsi a SvartulfrVerse, ma la maggior parte dei messaggi sono vuoti o riguardano template, formatting, guide e task tecnici. È necessario estrarre solo dati World-layer canonici e coerenti, evitando di importare chat state, istruzioni di prompt, URL, metadati conversazionali o contenuti non canonici in `2_Export/World`.

## What Changes
- Analisi strutturata di `conversations.json` per identificare messaggi non vuoti e potenziali dati World integrabili.
- Classificazione dei contenuti in: World lore utilizzabile, Character/Experience/Engine meta, istruzioni utente, URL/guide, chat vuota o rumore.
- Integrazione condizionata in `2_Export/World` solo per dati World/MacroCosmo/MicroCosmo coerenti e non conflittuali.
- Nessuna modifica se i contenuti non vuoti sono solo meta-task, template, formatting o conversazioni senza lore World.
- Controllo finale di JSON, conflitto, hygiene e assenza modifiche non necessarie.

**BREAKING**: Nessuna modifica breaking prevista. Le conversazioni non devono essere trattate come fonte canonica primaria se confliggono con lorebook, ADR o template esistenti.

## Impact
- Affected specs: World lorebook structure, source authority, export hygiene, conversation data handling.
- Affected code: probabilmente nessuno in `2_Export/World/**/*.json`, salvo scoperta di dati World non vuoti e coerenti durante l'analisi.

## ADDED Requirements
### Requirement: Analisi conversazioni
Il sistema SHALL leggere `conversations.json`, verificare il numero di conversazioni, messaggi non vuoti e contenuti testuali prima di decidere se integrare dati.

#### Scenario: Conversazioni vuote o non lore
- **WHEN** i messaggi non vuoti riguardano solo formatting, template, guide, task tecnici o metadati conversazionali
- **THEN** il sistema non modifica `2_Export/World`

### Requirement: Filtro World-layer
Il sistema SHALL integrare solo dati relativi a mondi, luoghi, organizzazioni, timeline, cultura, creature, famiglie, relazioni canoniche, segreti o regole World coerenti con i domini esistenti.

#### Scenario: Dato World integrabile
- **WHEN** un messaggio contiene un fatto World non vuoto, coerente e non conflittuale
- **THEN** viene mappato al lorebook del dominio corrispondente con prefix canonico, Canon Layer valido e source non unspecified

### Requirement: Esclusione contenuti non World
Il sistema SHALL escludere da `2_Export/World` istruzioni utente, URL, guide esterne, markdown/formatting, prompt engineering, task tecnici, engine runtime, character sheet, initial message, bot card e chat state.

#### Scenario: Contenuto vietato
- **WHEN** un contenuto contiene URL, `{{user}}`, guide JanitorAI, task di refactoring o template
- **THEN** non viene integrato nei lorebook World

### Requirement: Igiene runtime e lorebook
Il sistema SHALL non introdurre riferimenti a percorsi locali, URL, TODO-CANON, debug metadata, scene attive, NPC attivi da Scenario o logica di opening message nei lorebook World.

#### Scenario: Validazione
- **WHEN** viene prodotta una modifica
- **THEN** i lorebook modificati restano JSON validi, con prefix canonico, Canon Layer valido, source non unspecified e assenza di metadata proibiti

## MODIFIED Requirements
### Requirement: Autorità delle fonti
Le conversazioni legacy hanno priorità inferiore rispetto a lorebook esistenti, ADR, workflow e template canonici. In caso di conflitto, prevale la fonte World già consolidata.

## REMOVED Requirements
### Requirement: Nessuna rimozione
Non sono previste rimozioni di funzionalità o dati esistenti.
