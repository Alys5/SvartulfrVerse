# Integrazione Legacy Project Vuoto in World Export Spec

## Why
Il file legacy indicato `projects/019e8399-b36f-731e-b4eb-03a80d784377.json` contiene un progetto senza nome, descrizione o contenuto nei documenti allegati. È necessario verificare formalmente se esistono dati raw World integrabili e, in caso contrario, evitare modifiche inutili a `2_Export/World`.

## What Changes
- Analisi del JSON legacy per confermare se contiene documenti o contenuti non vuoti.
- Eventuale integrazione in `2_Export/World` solo se vengono trovati dati World/MacroCosmo/MicroCosmo utilizzabili.
- Nessuna modifica se il progetto è vuoto o contiene solo metadati privi di lore runtime.
- Controllo finale di assenza modifiche non necessarie e validazione dello stato di `2_Export/World`.

**BREAKING**: Nessuna modifica breaking prevista. Per questo file, il comportamento atteso è conservativo: se non ci sono contenuti raw, non devono essere creati lorebook, domini o documenti nuovi.

## Impact
- Affected specs: World lorebook structure, export hygiene, conservative integration.
- Affected code: probabilmente nessuno in `2_Export/World/**/*.json`, salvo scoperta di contenuti raw non vuoti durante l'analisi.

## ADDED Requirements
### Requirement: Analisi obbligatoria del legacy
Il sistema SHALL leggere il file legacy indicato e verificare nome, descrizione, documenti e contenuto di ciascun documento prima di decidere se integrare dati.

#### Scenario: Progetto vuoto
- **WHEN** il file legacy ha `name`, `description`, `prompt_template` e tutti i `docs[].content` vuoti
- **THEN** il sistema non modifica `2_Export/World` e registra il risultato come nessun dato integrabile

### Requirement: Integrazione condizionata
Il sistema SHALL integrare dati solo se il file contiene contenuti raw non vuoti coerenti con World, MacroCosmo o MicroCosmo.

#### Scenario: Dati integrabili
- **WHEN** un contenuto raw non vuoto appartiene chiaramente a un dominio World esistente
- **THEN** viene integrato nel lorebook JSON del dominio corrispondente senza duplicati o conflitti

### Requirement: Igiene runtime e lorebook
Il sistema SHALL non introdurre riferimenti a percorsi locali, URL, TODO-CANON, debug metadata, scene attive, NPC attivi da Scenario o logica di opening message nei lorebook World.

#### Scenario: Validazione
- **WHEN** viene prodotta una modifica
- **THEN** i lorebook modificati restano JSON validi, con prefix canonico, Canon Layer valido, source non unspecified e assenza di metadata proibiti

## MODIFIED Requirements
### Requirement: Conservatività per file vuoti
Se il progetto legacy non contiene contenuti raw, il task si considera completato senza modifiche a `2_Export/World`.

## REMOVED Requirements
### Requirement: Nessuna rimozione
Non sono previste rimozioni di funzionalità o dati esistenti.
