# Integrazione Lore Raw Legacy in World Export Spec

## Why
Il progetto contiene un file legacy `projects/019e9ca4-6f2d-7641-8bb8-be8ecf8a5c5e.json` con informazioni raw potenzialmente rilevanti per il SvartulfrVerse. È necessario estrarre, strutturare e integrare i dati coerenti nella cartella `2_Export/World`, preservando l'architettura esistente e senza introdurre conflitti con i lorebook già presenti.

## What Changes
- Analisi strutturata del file legacy indicato per identificare dati World/MacroCosmo/MicroCosmo integrabili.
- Mappatura dei dati estratti verso i domini esistenti in `2_Export/World/{Modern,Fantasy,SciFi,Viking,Pirate,Urban}`.
- Aggiornamento o creazione di voci lorebook solo dove i dati sono coerenti con il dominio di destinazione.
- Validazione di completezza, coerenza, prefissi canonici, Canon Layer, keyword, source e assenza di conflitti.
- Controllo finale sui file modificati o creati e sugli standard di qualità del progetto.

**BREAKING**: Nessuna modifica breaking è prevista; le integrazioni devono essere additive o conservative. Eventuali aggiornamenti di voci esistenti dovranno preservare compatibilità e non sovrascrivere dati più autorevoli senza giustificazione tracciata nel contenuto.

## Impact
- Affected specs: World lorebook structure, Canon Layer/prefix rules, domain separation, export hygiene.
- Affected code: `2_Export/World/**/*.json`, eventualmente `2_Export/World/README.md` solo se necessario per correggere riferimenti strutturali esistenti.

## ADDED Requirements
### Requirement: Estrazione e integrazione lore raw
Il sistema SHALL leggere il file legacy indicato, estrarre informazioni strutturate relative a mondi, luoghi, organizzazioni, famiglie, personaggi, timeline, cultura, creature, eventi, segreti e relazioni canoniche, e integrarle nei lorebook JSON di destinazione secondo lo schema esistente.

#### Scenario: Integrazione in dominio coerente
- **WHEN** un dato estratto appartiene chiaramente a un dominio World esistente
- **THEN** viene integrato nel lorebook JSON del dominio corrispondente senza duplicare voci equivalenti già presenti

### Requirement: Conflitto e completezza
Il sistema SHALL verificare che ogni nuova voce abbia `id`, `name`, `content`, `key`, `keysRaw`, `tags`, `category`, `priority`, `insertion_order`, `placement`, `placementPosition`, `activationMode`, `source`, `canonLayer`, `prefix`, `summary` e `bullet` coerenti, oppure rispetti esattamente lo schema del lorebook di destinazione se diverso.

#### Scenario: Rilevamento conflitto
- **WHEN** un dato estratto contraddice una voce World esistente
- **THEN** non viene integrata come fatto attivo; viene scartata, rinviata a `[HISTORICAL]`/`[CANDIDATE]` o integrata solo se il file legacy è più autorevole per quel dato secondo le regole del progetto

### Requirement: Igiene runtime e lorebook
Il sistema SHALL non introdurre riferimenti a percorsi locali, URL, TODO-CANON, debug metadata, scene attive, NPC attivi da Scenario o logica di opening message nei lorebook World.

#### Scenario: Validazione lore entry
- **WHEN** una voce viene creata o modificata
- **THEN** il suo `content` include un Canon Layer valido e un prefix canonico, e non contiene percorsi locali o metadata di conversione

## MODIFIED Requirements
### Requirement: Organizzazione World esistente
I lorebook World rimangono organizzati per dominio: Modern, Fantasy, SciFi, Viking, Pirate, Urban. Le integrazioni devono seguire la struttura già presente e non devono creare nuovi domini se non strettamente necessario.

## REMOVED Requirements
### Requirement: Nessuna rimozione
Non sono previste rimozioni di funzionalità. Eventuali voci obsolete rilevate nel legacy non devono essere cancellate dai World export senza una conferma esplicita.
