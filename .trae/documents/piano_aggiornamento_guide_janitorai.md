# Piano di aggiornamento guide JanitorAI per SvartulfrVerse

## Summary

Aggiornare l’intero corpus operativo e documentale richiesto affinché SvartulfrVerse integri in modo coerente le indicazioni delle due guide esterne fornite:

- `https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/GuideBookSite/book/print.html`
- `https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/ChatbotBookSite/book/print.html`

L’obiettivo non è importare acriticamente le guide, ma adottarle come **source of truth** per l’aggiornamento richiesto, allineando il repository alle indicazioni operative e tecniche delle guide. In particolare, dove la GuideBookSite indica che il sandbox supporta ES6-safe, il nuovo standard diventa **ES6-safe dentro lo scope del sandbox JanitorAI**, mantenendo però i blocchi hard indicati dalle guide: niente async/external/global APIs, niente `fetch`, `import`, `require`, `window`, `document`, `Promise`, `setTimeout`, `setInterval` o side effect globali.

## Current State Analysis

### Fonti esterne analizzate

L’analisi preliminare ha confermato che le due guide trattano aree distinte ma complementari.

La **GuideBookSite** riguarda soprattutto scripting runtime:

- cosa sono gli script e quando vengono eseguiti;
- uso di `context.character` e `context.chat`;
- campi modificabili;
- matching sicuro delle parole;
- sandbox rules;
- progressione per message count;
- time-based changes;
- fake memory tramite scenario;
- simple lorebook;
- probability, randomization, gating;
- reaction engines;
- debugging e best practices.

La **ChatbotBookSite** riguarda soprattutto progettazione bot e card:

- token economy;
- permanent vs temporary tokens;
- U-shaped memory curve;
- struttura Personality Block;
- struttura Scenario Block;
- states, triggers e interaction categories;
- Example Dialogue;
- Initial Message;
- Bot Cards e Blurb;
- testing/debug;
- multi-character philosophy;
- multi-character Personality Blocks;
- Shared Scenario + Trigger Matrix;
- dialogue formatting;
- scenario bots, controller block, cycles ed engine.

### Stato locale rilevato

Nel repository sono già presenti:

- regole modulari in [`.trae/rules/`](d:\SvartulfrVerse\.trae\rules\);
- tre master-template JS in [`1_template/`](d:\SvartulfrVerse\1_template\);
- template Markdown/HTML per Personality, Scenario e Bio in [`1_template/`](d:\SvartulfrVerse\1_template\);
- README principale in [`README.md`](d:\SvartulfrVerse\README.md);
- prompt/archivist in [`Archivist.md`](d:\SvartulfrVerse\Archivist.md);
- README descrittivo dei mondi in [`2_Export\World\README.md`](d:\SvartulfrVerse\2_Export\World\README.md);
- export World scaffold in [`2_Export\World`](d:\SvartulfrVerse\2_Export\World\);
- caso MicroCosmo concreto in [`2_Export\World\Modern\TwinXFamily\TXF_Scenario.js`](d:\SvartulfrVerse\2_Export\World\Modern\TwinXFamily\TXF_Scenario.js).

### Discrepanze e lacune da correggere

Le guide esterne sono ora assunte come **source of truth** per questo aggiornamento. La discrepanza principale da risolvere è quindi il vecchio vincolo ES5 del repository: la GuideBookSite indica che il sandbox supporta ES6-safe, quindi il piano deve modernizzare i template JS verso ES6-safe quando migliora chiarezza e leggibilità, restando entro i limiti del sandbox.

Altre lacune locali da colmare:

- i template `Personality_Template.md`, `Scenario_Template.md` e `Sys_Bio_Template.html` sono troppo generici e non riflettono ancora la struttura consigliata dalle guide;
- `Archivist.md` contiene una directory structure parzialmente obsoleta e deve diventare un registro decisionale chiaro;
- `2_Export\World\README.md` è descrittivo ma non operativo;
- i World export principali sono scaffold vuoti e devono essere documentati come tali;
- i template World/Scenario inferiscono prefissi non canonici (`HST`, `CUL`, `WIT`) e permettono fallback `source:unspecified`;
- le regole attuali non includono ancora checklist complete per Personality, Scenario, Example Dialogue, Initial Message, multi-character, scenario bots e testing.

## Proposed Changes

### 1. Aggiornare `.trae/rules`

Aggiornare i moduli operativi senza trasformare `rules.md` in un monolite.

#### `rules.md`

Aggiornare le **Mandatory Quick Rules** con:

- ES6-safe subset obbligatorio dentro lo scope del sandbox JanitorAI;
- guard minimi su `context.character`, `context.character.personality`, `context.character.scenario` e `context.character.example_dialogs`;
- append-only su `personality`, `scenario`, `example_dialogs`;
- vietati `async/await`, `Promise`, `fetch`, `import`, `require`, `window`, `document`, `setTimeout`, `setInterval` e side effect globali;
- token budget target da ChatbotBookSite;
- U-shaped memory placement;
- no lore dump;
- no `database_old/` negli export;
- una sola voce always-on world atmosphere;
- source + Canon Layer obbligatori su ogni lorebook voice.

Aggiornare la sezione **Canonical Master-Template Stack** includendo il nuovo contratto bot:

- Engine = runtime state e budget;
- World = MacroCosmo lore;
- Scenario = MicroCosmo actor/scenario direction;
- Personality/Scenario/Example Dialogue/Initial Message/Bot Card = contratti di authoring.

#### `02_project_baseline.md`

Aggiungere una sezione “Bot Design Contract” con:

- LLM come pattern engine, non database;
- reminder vs lore dump;
- permanent vs temporary tokens;
- U-shaped memory curve;
- MacroCosmo/MicroCosmo come sistema keyword-triggered;
- decisioni di compatibilità: adottare ES6-safe e non importare i blocchi hard async/external/global.

#### `03_runtime_context_api.md`

Rafforzare il modello runtime con:

- `context` come sola interfaccia JanitorAI;
- guard minimi;
- campi modificabili e non modificabili;
- append-only;
- uso di `context.chat.last_message`;
- uso cauto di `context.chat.last_messages`;
- `message_count` per progressione;
- fake memory tramite scenario notes, non overwrite;
- `console.log()` solo per debug.

#### `04_javascript_naming.md`

Allineare il vincolo JavaScript allo standard ES6-safe indicato dalla GuideBookSite:

- `const` e `let` ammessi nello scope del sandbox;
- arrow functions ammesse quando migliorano chiarezza;
- template literals ammessi;
- array helpers leggeri ammessi, ad esempio `.includes()`, `.map()`, `.filter()`, `.forEach()`;
- `Object.keys()`, `Object.values()`, `Object.assign()` ammessi;
- destructuring e default parameters ammessi se non appesantiscono il runtime;
- regex base ammesse; evitare look-behind e feature Unicode avanzate non supportate;
- matching sicuro con lowercase + padding;
- loop piccoli e `break`;
- niente strutture pesanti a ogni turno.

Blocchi hard da mantenere:

- `async/await`, `Promise`, `setTimeout`, `setInterval`;
- `fetch`, `XMLHttpRequest`, `require`, `import`;
- `window`, `document`;
- side effect globali, ridefinizione di `context` o overwrite di oggetti sistema.

#### `05_lorebook_entry_design.md`

Aggiornare:

- lista definitiva dei prefissi lorebook: `WRD`, `LOR`, `LOC`, `ORG`, `BST`, `FAM`, `NPC`, `SEC`, `CAN`, `REL`;
- rimozione o blocco di prefissi non canonici `HST`, `CUL`, `WIT`;
- source obbligatorio da `database/`;
- divieto di `source:unspecified`;
- priority massimo ufficiale `11`;
- keyword design con padding/boundary-safe matching;
- lorebook atomiche e funzionali;
- separazione definitional/relational/event lore.

#### `06_token_state_character_card.md`

Aggiungere i target token dalle guide:

- Personality singolo: circa `≤ 600` token;
- Scenario: circa `≤ 800` token;
- Advanced Prompt: circa `200–300` token;
- totale permanente ideale: circa `≤ 1.800` token;
- multi-character: circa `300–500` token per personalità individuale;
- scenario bots: controller + scenario idealmente sotto `1.800` token.

Aggiungere anche:

- token signal vs noise;
- checklist token bloat;
- regole per example dialogue compatto;
- Initial Message length guidance.

#### `07_templates_architecture.md`

Aggiornare il mapping architetturale:

- Engine non deve includere lore;
- World non deve gestire NPC attivi;
- Scenario non deve ridefinire World canon;
- Personality = identity anchor;
- Scenario = scene director;
- Example Dialogue = behavioral proof;
- Initial Message = first beat;
- Bot Card = storefront;
- multi-character = Personality separate + Scenario as Director + Trigger Matrix;
- scenario bots = Controller Block + Scenario Block + Cycle/Engine.

#### `08_template_requirements.md`

Aggiornare i requisiti dei template:

- `Personality_Template.md`: `CHARACTER`, `APPEARANCE`, `PSYCHOLOGICAL_PROFILE`, `SOCIAL_BEHAVIOR`, `SENSORY`, `FORMAT`, source/Canon Layer note;
- `Scenario_Template.md`: `SETTING`, `RELATIONSHIP_STATE`, `INTERACTION_CATEGORIES`, `DYNAMIC_BEHAVIORS`, `PACING & STYLE`, `FORMAT REMINDERS`;
- `Sys_Bio_Template.html`: blurb strutturato, card presentation, asset registry source, separazione tra bio pubblico e Scenario runtime;
- `SvartulfrVerse_World_Template.js`: normalizzazione prefissi, source validation, no `source:unspecified`;
- `SvartulfrVerse_Scenario_Template.js`: trigger matrix, relationship state, escalation/de-escalation, repair, turn-taking, source validation;
- `SvartulfrVerse_Engine_Template.js`: rafforzare commenti su ES6-safe, append-only, debug e blocchi hard del sandbox.

#### `09_development_workflow_acceptance.md`

Aggiungere checklist di accettazione:

- runtime guard;
- ES6-safe sandbox scan e no forbidden APIs;
- no overwrite;
- no `database_old/`;
- source + Canon Layer;
- token budget;
- no lore dump;
- multi-character Two-Voice/Trio-Voice test;
- scenario bot cycle test;
- testing after 10–15 turni e, per scenario bots, after 20+ turni.

#### `11_output_voice_token_economy_hygiene.md`

Aggiornare:

- output voice rules;
- prefixes canonici;
- source/canonLayer;
- no architecture jargon nei campi bot;
- no path leakage;
- no opening-message logic in Scenario file;
- token economy per Personality/Scenario/Example Dialogue/Initial Message;
- repository hygiene.

### 2. Aggiornare `README.md`

Trasformare il README principale in una mappa operativa compatta:

- aggiungere sezione “Bot Design Contract”;
- aggiungere sezione “Runtime Script Contract”;
- aggiungere sezione “World Export Scaffolds”;
- aggiungere sezione “Asset Registry”;
- aggiungere sezione “Source and Canon Layer”;
- aggiungere sezione “Multi-Character and Scenario Bots”;
- aggiungere sezione “Testing and Debugging”;
- chiarire la separazione tra:
  - `1_template/`;
  - `2_Export\World\...`;
  - `2_Export\World\Modern\TwinXFamily\...`;
  - `TODO-CANON/`;
  - `database_old/`;
- mantenere la checklist rapida, ampliandola con i criteri derivati dalle guide.

### 3. Aggiornare `Archivist.md`

Riscrivere `Archivist.md` come registro operativo e decisionale:

- correggere la directory structure reale;
- chiarire che `1_template/SvartulfrVerse_Scenario_Template.js` è master-template, mentre `2_Export\World\Modern\TwinXFamily\TXF_Scenario.js` è export scenario specifico;
- aggiungere le fonti esterne consultate;
- aggiungere le decisioni di compatibilità con SvartulfrVerse;
- includere una sezione “Hard Blocks and Compatibility Decisions” per async/external/global APIs e pratiche non compatibili;
- includere il processo in due fasi:
  1. proposta architetturale;
  2. generazione solo dopo approvazione esplicita;
- integrare le regole token economy, no path leakage, no architecture jargon e no initial-message logic nei campi Scenario.

### 4. Aggiornare `1_template`

#### `SvartulfrVerse_Engine_Template.js`

Modernizzare verso ES6-safe quando migliora chiarezza e rafforzare:

- compatibilità ES6-safe dentro il sandbox;
- guard minimi;
- append-only;
- no lore;
- no API esterne;
- no side effect globali;
- debug logging solo in debug mode.

#### `SvartulfrVerse_World_Template.js`

Correggere e documentare:

- `inferPrefix()` deve restituire solo prefissi canonici;
- history/event/timeline → `LOR` o `CAN` se sbloccato;
- culture/custom → `LOR` o `WRD`;
- witness → `NPC` o `CAN`;
- eliminare fallback `source:unspecified`;
- correggere esempi `priority: 12` in `priority: 11`;
- aggiungere commenti su MacroCosmo keyword-triggered e no NPC attivi in World.

#### `SvartulfrVerse_Scenario_Template.js`

Correggere e documentare:

- `inferPrefix()` deve restituire solo prefissi canonici;
- witness → `NPC` o `CAN`;
- eliminare fallback `source:unspecified`;
- chiarire `hiddenCondition` solo se inline ed ES6-safe;
- aggiungere commenti su Trigger Matrix, relationship state, escalation/de-escalation e repair;
- ridurre duplicazione di `getScenarioFlags()` dove utile senza cambiare comportamento.

#### `Personality_Template.md`

Ristrutturare secondo la formula consigliata:

- `CHARACTER`;
- `APPEARANCE`;
- `PSYCHOLOGICAL_PROFILE`;
- `SOCIAL_BEHAVIOR`;
- `SENSORY`;
- `FORMAT`;
- `SOURCE & CANON LAYER`;
- `TOKEN ECONOMY NOTES`.

Aggiungere istruzioni:

- bullet brevi;
- no lore dump;
- appearance legata al comportamento;
- source/Canon Layer dove richiesto;
- no path leakage nei campi LLM.

#### `Scenario_Template.md`

Ristrutturare secondo la formula consigliata:

- `SETTING`;
- `RELATIONSHIP_STATE`;
- `INTERACTION_CATEGORIES`;
- `DYNAMIC_BEHAVIORS`;
- `PACING & STYLE`;
- `FORMAT REMINDERS`;
- `SOURCE & CANON LAYER`;
- `TOKEN ECONOMY NOTES`.

Aggiungere istruzioni:

- Scenario è ambiente, contesto e regole immediate;
- non inserire opening scene o first message logic;
- usare trigger chiari;
- includere escalation, de-escalation e repair;
- evitare wiki e lore dump.

#### `Sys_Bio_Template.html`

Aggiornare:

- struttura bot card in sei parti;
- blurb strutturato come back-cover hook;
- asset registry source;
- distinzione tra Bio pubblico, Personality runtime e Scenario runtime;
- evitare che la sezione “SCENARIOS & STARTING POINTS” venga scambiata per Scenario runtime;
- aggiungere note su title, subtitle, portrait, supporting images, impact line e closing invitation.

#### Nuovi template da aggiungere solo se necessario

Se l’aggiornamento dei template esistenti non basta, aggiungere template separati in `1_template/`:

- `Multi_Character_Personality_Template.md`;
- `Shared_Scenario_Trigger_Matrix_Template.md`;
- `Example_Dialogue_Template.md`;
- `Initial_Message_Template.md`;
- `Scenario_Bot_Controller_Template.md`;
- `Scenario_Bot_Scenario_Template.md`.

Questi file nuovi devono essere creati solo se servono a evitare di sovraccaricare i template esistenti.

### 5. Aggiornare `2_Export\World\README.md`

Trasformarlo da elenco descrittivo a README operativo:

- aggiungere struttura effettiva dei mondi;
- specificare che gli export World principali sono scaffold;
- documentare che `loreEntries`, `timelineEvents` e `statReactions` devono essere popolati con lore concreta prima dell’uso runtime;
- aggiungere requisiti minimi per lore entry;
- aggiungere esempi di prefissi validi;
- aggiungere regole source/Canon Layer;
- aggiungere no `database_old/`;
- aggiungere no genealogy redefinition;
- aggiungere no NPC attivi in World;
- aggiungere link a World template, rules e asset registry;
- chiarire che `TwinXFamily` è MicroCosmo sotto Modern, non lore World generica.

### 6. Aggiornare World export scaffold

Aggiornare gli scaffold JS sotto:

- `2_Export\World\Modern\SvartulfrVerse_Modern.js`
- `2_Export\World\Fantasy\SvartulfrVerse_Fantasy.js`
- `2_Export\World\SciFi\SvartulfrVerse_SciFi.js`
- `2_Export\World\Viking\SvartulfrVerse_Viking.js`
- `2_Export\World\Pirate\SvartulfrVerse_Pirate.js`
- `2_Export\World\Urban\SvartulfrVerse_Urban.js`

Interventi minimi:

- correggere commenti `priority: 12` in `priority: 11`;
- chiarire che sono scaffold vuoti;
- aggiungere nota che `sourceBase` è accettabile solo se punta a `database/world/...`;
- evitare riferimenti operativi a `rootFolder: "3_World/..."` se non documentato come destinazione esterna.

## Assumptions & Decisions

- Le due guide fornite sono **source of truth** per questo aggiornamento.
- La GuideBookSite sovrascrive il precedente vincolo ES5: i template JS devono essere modernizzati verso ES6-safe quando utile, purché restino dentro il sandbox JanitorAI.
- I blocchi hard restano vietati: `async/await`, `Promise`, `fetch`, `import`, `require`, `window`, `document`, `setTimeout`, `setInterval` e side effect globali.
- `context` resta l’unica interfaccia JanitorAI ammessa.
- `example_dialogs` resta scrivibile perché già previsto dalle regole SvartulfrVerse.
- `database_old/` resta read-only historical archive e non deve essere referenziato dagli export script.
- `ASSET_REGISTRY.json` resta fonte unica per metadata immagini approvate.
- I World export principali rimangono scaffold finché non vengono popolati con lore concreta.
- `TwinXFamily` resta il caso MicroCosmo di riferimento per Scenario runtime.

## Verification steps

Dopo l’implementazione, eseguire:

1. Lettura/rilettura dei file modificati per verificare coerenza narrativa e tecnica.
2. Controllo manuale o tramite ricerca per:
   - compatibilità ES6-safe nei JS;
   - assenza di `async/await`, `Promise`, `fetch`, `import`, `require`, `window`, `document`, `setTimeout`, `setInterval`;
   - assenza di `source:unspecified`;
   - assenza di prefissi non canonici `HST`, `CUL`, `WIT`;
   - assenza di riferimenti a `database_old/` negli export;
   - presenza di source/Canon Layer dove richiesto;
   - assenza di path leakage nei template Markdown destinati al LLM;
   - assenza di opening-message logic nei file Scenario.
3. Eseguire `git diff --check`.
4. Se esistono script di validazione locali già presenti, eseguirli; altrimenti limitarsi ai controlli statici sopra e alla verifica dei template.
5. Restituire un riepilogo finale con file modificati, decisioni applicate e eventuali punti rimasti come scaffold intenzionale.
