# Spec ec — Analisi Legacy e Generazione Script ModernFantasy2024

## Why

La cartella `ModernFantasy2024/legacy` contiene metadata pubblici, bio, scenario, persona, profili personaggio, messaggi iniziali, world lore, Visual DNA, script legacy, temi Info Board e asset. Il sistema deve trasformare questi dati in script JanitorAI modulari, compatibili con SvartulfrVerse, invece di riutilizzarli acriticamente.

## What Changes

- Viene eseguita un'analisi completa di tutti i file testuali e configurabili in `ModernFantasy2024/legacy`.
- Vengono generati script runtime sotto `ModernFantasy2024/runtime` per world, family, NPC/personaggi, contesto, coerenza, stato, persistenza e validazione.
- Vengono generati test unitari sotto `ModernFantasy2024/tests` per validare inventario legacy, mapping, runtime, persistenza e compatibilità JanitorAI.
- Viene mantenuta la separazione MacroCosmo/MicroCosmo: world e scenario sono keyword-triggered; family e personaggi sono MicroCosmo.
- Viene trattata Alyssa come persona/caso d'uso o personaggio candidate/optional, senza imporla come `{{user}}` quando la bio richiede che sesso, rank, aspetto e personalità siano scelti dall'utente.

## Impact

- Affected specs:
  - MacroCosmo / MicroCosmo.
  - Context Control e Context Control Awareness.
  - Complex Lorebook e Adaptive Lorebook.
  - Context Aware Multiple Character.
  - Advanced Faction Management.
  - Persistent state, validation e Info Board state parsing.
- Affected code:
  - `ModernFantasy2024/legacy/**`
  - `ModernFantasy2024/runtime/**`
  - `ModernFantasy2024/tests/**`
  - `template/**`
  - `.trae/rules/**`

## ADDED Requirements

### Requirement: Legacy Inventory e Mapping

Il sistema SHALL inventariare tutti i file in `ModernFantasy2024/legacy`, includendo:

- `1_public_metadata.md`;
- `2_character_bio.html`;
- `3_scenario.md`;
- `4_persona_alyssa.md`;
- `5_main_character_profiles.md`;
- `6_initial_messages.md`;
- `Info Board [Large].txt`;
- `Info Board [Small].txt`;
- `L2_svartulfrverse_PackWerewolf.js`;
- `W_UrbanFantasy.js`;
- `W_UrbanFantasy.md`;
- `Visual_DNA.md`;
- `SUCC University.json`;
- `[ib]_succ_theme_[large].json`;
- `[ib]_succ_theme_[small].json`;
- asset immagine e file vuoti/placeholder.

#### Scenario: Complete inventory

- **WHEN** l'implementazione analizza `ModernFantasy2024/legacy`
- **THEN** produce mapping verificabile verso script runtime, source attribution `database/`, Canon Layer e categorie world/family/NPC/location/org/event/state.

### Requirement: Runtime Script Architecture

Il sistema SHALL generare almeno questi script:

- `MF_Context_Control.js` — controllo budget e istruzioni minimali di contesto.
- `MF_Context_Awareness.js` — lettura degradabile del budget disponibile.
- `WRD_ModernFantasy2024.js` — MacroCosmo world/urban fantasy/SUCC/Solarton.
- `FAM_DouglasBloodmoon.js` — MicroCosmo famiglia, genealogia, dinamiche e autorità familiare.
- `NPC_DouglasBloodmoon.js` — personaggi principali e NPC rilevanti con categorie adattive.
- `MF_Context_Coherence.js` — regole di coerenza e prevenzione assunzioni non stabilite.
- `MF_State_Persistence.js` — parsing e riproduzione di stato visibile/zero-width.
- `MF_Validation.js` — validazione runtime e diagnostica sicura.

#### Scenario: JanitorAI compatibility

- **WHEN** uno script runtime viene eseguito nel sandbox JanitorAI
- **THEN** usa `context` come unica interfaccia JanitorAI e modifica solo `context.character.personality`, `context.character.scenario` e `context.character.example_dialogs`.

### Requirement: ES5 Runtime Compatibility

Ogni script runtime SHALL essere ES5-compatible:

- usare `var`;
- evitare `let`, `const`, arrow functions, template literals, classi, `async`, `await`;
- non usare `import`, `export`, `require`, `Promise`, `fetch`, `XMLHttpRequest`, `setTimeout`, `setInterval`, `document`, `window`, `localStorage`, `sessionStorage`, `IndexedDB`, `fs`, `readFile`, `eval`, `new Function`.

#### Scenario: Static compatibility check

- **WHEN** gli script vengono verificati
- **THEN** i test rilevano eventuali feature ristrette e falliscono.

### Requirement: Persistence, Update e Validation

Il sistema SHALL implementare:

- parsing dello stato visibile, ad esempio `[MF_STATE:visible]...[/MF_STATE]`;
- parsing di marcatori zero-width unici;
- validazione di `sceneFocus`, `activeParticipants`, `flags`, `lastCanonSource`;
- aggiornamento append-only delle istruzioni per riprodurre stato;
- fallback sicuro quando lo stato manca o è invalido.

#### Scenario: State update

- **WHEN** lo scenario contiene `[MF_STATE:visible]sceneFocus=verve;activeParticipants=Jasper,Logan;flags=nightOut;lastCanonSource=database/locations/L_TheVerve.md;[/MF_STATE]`
- **THEN** lo script produce istruzioni coerenti per riprodurre lo stato senza sovrascrivere `personality` o `scenario`.

### Requirement: Unit Tests

Il sistema SHALL includere test unitari per:

- inventario legacy;
- mapping source-to-runtime;
- compatibilità ES5 e restrizioni piattaforma;
- guardie `context`;
- append-only injection;
- attivazione keyword MacroCosmo/MicroCosmo;
- mancata attivazione in contesto non pertinente;
- contesto mancante o invalido;
- parsing stato visibile e zero-width;
- validazione source attribution e Canon Layer.

#### Scenario: Test failure

- **WHEN** un test rileva una violazione di compatibilità, mapping o persistenza
- **THEN** il test fallisce indicando file, riga e motivo.

## MODIFIED Requirements

### Requirement: Existing Legacy Data

I dati in `ModernFantasy2024/legacy` SHALL essere trattati come fonte storica e non come output finale direttamente copiabile. Ogni dato generato deve essere normalizzato secondo `.trae/rules/rules.md`, `template/janitorai_scripts.md` e i template ufficiali.

#### Scenario: Legacy character migration

- **WHEN** un personaggio legacy viene migrato
- **THEN** viene mappato in categorie `identity`, `appearance`, `relationships`, `personality`, `psyche`, `advancedPsychology`, `backstory`, `dialogue`, `combat`, `capabilities`, `sampleDialog`, `residence`, `intimacy` e `notes` quando rilevante.

### Requirement: Existing Script Behavior

Gli script legacy possono essere consultati per stile e intenzione funzionale, ma non devono essere copiati acriticamente se violano le regole attuali.

#### Scenario: Legacy script conflict

- **WHEN** uno script legacy contiene riferimenti o comportamenti non compatibili
- **THEN** il nuovo script implementa la stessa intenzione usando ES5, `context` guardato e output append-only.

### Requirement: User Agency

La bio legacy impone di non assumere sesso, rank, aspetto, personalità, Moonstone, White Moon o Omega physiology finché non sono stabiliti.

#### Scenario: User-defined character

- **WHEN** la chat non dichiara sesso, rank o aspetto di `{{user}}`
- **THEN** gli script non impongono Alyssa, Omega, female, Moonstone o White Moon come default.

## REMOVED Requirements

### Requirement: Direct Legacy Reuse

**Reason**: `ModernFantasy2024/legacy` è una fonte storica e non garantisce compatibilità con le regole runtime attuali.
**Migration**: estrarre dati e intenzioni, validarli, normalizzarli e generare script sotto `ModernFantasy2024/runtime`.

### Requirement: Monolithic Runtime Script

**Reason**: uno script monolitico rischia di superare budget, creare collisioni di stato e rendere difficile la validazione.
**Migration**: usare moduli separati per context, world, family, NPC, coherence, state e validation.
