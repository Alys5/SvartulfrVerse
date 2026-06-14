# SvartulfrVerse JanitorAI Master Templates

Questo repository contiene l'architettura JanitorAI per SvartulfrVerse, organizzata attorno allo schema Level 0 / Level 1 / Level 3 e alle guide operative di riferimento.

## Fonti ufficiali

| Fonte | Scopo |
|---|---|
| [JanitorAI Scripts Guide](https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/GuideBookSite/book/print.html) | Runtime script, sandbox ES6-safe, `context`, matching, memory, lorebook, probability, gating, reaction engines, debugging. |
| [Chatbot Creation Guide](https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/ChatbotBookSite/book/print.html) | Token economy, U-shaped memory, Personality, Scenario, Example Dialogue, Initial Message, Bot Cards, multi-character, Scenario Bots, testing. |
| [`.trae/rules/rules.md`](.trae/rules/rules.md) | Indice centrale delle regole del workspace. |
| [`.trae/rules/07_templates_architecture.md`](.trae/rules/07_templates_architecture.md) | Architettura ufficiale dei master-template. |
| [`.trae/rules/08_template_requirements.md`](.trae/rules/08_template_requirements.md) | Requisiti specifici per Engine, World Lorebook JSON, Personality, Scenario, Initial Message, Example Dialogue e Bio. |
| [`1_template/`](1_template/) | Master-template canonici da usare come runtime e authoring base. |
| [`0_assets/ASSET_REGISTRY.json`](0_assets/ASSET_REGISTRY.json) | Fonte ufficiale per metadata immagini approvate. |

## Stack canonico

| Livello | Dominio | Template operativo | Scopo |
|---|---|---|---|
| `level 0` | Engine runtime comune | [`2_Export/SvartulfrVerse_Engine.js`](2_Export/SvartulfrVerse_Engine.js) | Stato persistente, flag hex, memoria zero-width, Progressive Sentence, debug, token budget, runtime ES6-safe. Comune a tutti i bot. |
| `level 1` | World integrato MacroCosmo + MicroCosmo | [`1_template/SvartulfrVerse_World_Template.json`](1_template/SvartulfrVerse_World_Template.json) | Lorebook specifico per genere/mondo del bot: fantasy, modern, viking, sci-fi, urban, pirate ecc. Contiene world facts, timeline, locations, organizations, bestiary, families, NPCs, secrets, canon unlocks e relationships. |
| `level 3` | Card unica del bot | Personality + Scenario + Initial Message + Example Dialogue + Bot Card | Identità, regista scena/controller, primo beat, prova comportamentale e storefront. Il template concreto dipende dal tipo di bot. |

### Domini World `level 1`

Il World di `level 1` non è solo MacroCosmo: contiene sia MacroCosmo sia MicroCosmo. Ogni voce concreta deve includere `source` e Canon Layer: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`.

| Domain | Prefix | Scope |
|---|---|---|
| World | `WRD:` | Core physical, cosmological, and rule-system facts |
| Lore | `LOR:` | Events, artifacts, ancient history, and present-day consequences |
| Locations | `LOC:` | Regions, cities, interiors, and points of interest |
| Organizations | `ORG:` | Factions, guilds, institutions, and hierarchy |
| Bestiary | `BST:` | Creatures, monsters, threats, habitats, and weaknesses |
| Families | `FAM:` | Dynasties, bloodlines, genealogy hooks, politics, reputation, and house secrets |
| NPCs | `NPC:` | Individual identity, visual presentation, relationships, combat, psyche, and active scene presence |
| Secrets | `SEC:` | Locked investigation content, hidden clues, and spoiler gates |
| Canon Unlocks | `CAN:` | Investigation canon unlocked by state, time, or message thresholds |
| Relationships | `REL:` | Active relationship dynamics, emotional states, and interaction contracts |

### Selezione template `level 3`

| Tipo bot | Personality | Scenario | Initial Message | Example Dialogue | Bot Card |
|---|---|---|---|---|---|
| Single-character | [`01_personality.md`](1_template/single_character/01_personality.md) | [`02_scenario.md`](1_template/single_character/02_scenario.md) | [`03_initial_message.md`](1_template/single_character/03_initial_message.md) | [`04_example_dialogue.md`](1_template/single_character/04_example_dialogue.md) | [`05_bot_card.html`](1_template/single_character/05_bot_card.html) |
| Multi-character | [`01_personality.md`](1_template/multi_character/01_personality.md) | [`02_scenario.md`](1_template/multi_character/02_scenario.md) | [`03_initial_message.md`](1_template/multi_character/03_initial_message.md) | [`04_example_dialogue.md`](1_template/multi_character/04_example_dialogue.md) | [`05_bot_card.html`](1_template/multi_character/05_bot_card.html) |
| Scenario bot | [`01_personality.md`](1_template/scenario_bot/01_personality.md) | [`02_scenario.md`](1_template/scenario_bot/02_scenario.md) | [`03_initial_message.md`](1_template/scenario_bot/03_initial_message.md) | [`04_example_dialogue.md`](1_template/scenario_bot/04_example_dialogue.md) | [`05_bot_card.html`](1_template/scenario_bot/05_bot_card.html) |

I template runtime tecnici citati nella documentazione legacy restano riferimenti di migrazione; il livello operativo World attivo è il lorebook JSON integrato.

## Regole d'oro

- L'Engine è 100% agnostico: niente lore, magia, tecnologia, nomi di personaggi o riferimenti a mondi specifici.
- Il World integrato di `level 1` contiene sia MacroCosmo sia MicroCosmo: world facts, lore, locations, organizations, bestiary, families, NPCs, secrets, canon unlocks e relationships.
- Ogni voce lore deve includere `source` e un Canon Layer: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`.
- I domini World sono triggerati da keyword.
- Solo una voce always-on world atmosphere è consentita.
- I runtime script devono essere ES6-safe dentro il sandbox JanitorAI: `const`, `let`, arrow functions, template literals e helper leggeri sono ammessi quando migliorano chiarezza e restano sandbox-safe.
- Gli script non devono usare API hard-blocked: `async/await`, `Promise`, `fetch`, `import`, `require`, `window`, `document`, `setTimeout`, `setInterval` o side effect globali.
- Gli script scrivono solo su `personality`, `scenario` e `example_dialogs`.
- Personality, scenario ed example dialogs sono append-only per default.
- `TODO-CANON/` è un archivio storico read-only e non deve essere referenziato dagli export script.

## Bot Design Contract

Un bot SvartulfrVerse deve essere progettato come sistema coordinato, non come dump di lore.

| Strato | Template | Scopo | Regola |
|---|---|---|---|
| `level 0` Engine | [`SvartulfrVerse_Engine_Template.js`](2_Export/SvartulfrVerse_Engine.js) | Runtime comune | Stato persistente, budget, flag, progressive context, debug, nessun significato lore. |
| `level 1` World integrato | [`SvartulfrVerse_World_Template.lorebook.json`](1_template/SvartulfrVerse_World_Template.json) | MacroCosmo + MicroCosmo | World facts, timeline, locations, organizations, bestiary, families, NPCs, secrets, canon unlocks, relationships. |
| Personality | [`01_personality.md`](1_template/single_character/01_personality.md), [`01_personality.md`](1_template/multi_character/01_personality.md), [`01_personality.md`](1_template/scenario_bot/01_personality.md) | Ancora identitaria | Voce stabile, tratti, comportamento sociale, cue sensoriali, formato output. |
| Scenario | [`02_scenario.md`](1_template/single_character/02_scenario.md), [`02_scenario.md`](1_template/multi_character/02_scenario.md), [`02_scenario.md`](1_template/scenario_bot/02_scenario.md) | Regista scena/controller | Ambientazione, stato relazione, trigger, escalation, de-escalation, repair, pacing, choice engine. |
| Example Dialogue | [`04_example_dialogue.md`](1_template/single_character/04_example_dialogue.md) | Prova comportamentale | Scambi compatti che dimostrano tono, ritmo, turn-taking e reazioni. |
| Initial Message | [`03_initial_message.md`](1_template/single_character/03_initial_message.md) | Primo beat | Voice + scene anchor + invitation; non deve essere biografia o lore dump. |
| Bot Card | [`05_bot_card.html`](1_template/single_character/05_bot_card.html) | Storefront | Titolo impattante, subtitle, ritratto, immagini di supporto, blurb strutturato, impact line, chiusura. |

## Master-template Engine

[`2_Export/SvartulfrVerse_Engine.js`](2_Export/SvartulfrVerse_Engine.js) è il `level 0` comune a tutti i bot. Unifica:

- Persistent Flags;
- Hidden Persistent Memory;
- Progressive Sentence;
- PropertyExploration/debug utilities;
- parsing del `[CONTEXT BUDGET: ...]`;
- runtime ES6-safe dentro il sandbox.

L'Engine gestisce meccaniche matematiche e persistenti, non significato narrativo.

## World Lorebook JSON `level 1`

[`1_template/SvartulfrVerse_World_Template.json`](1_template/SvartulfrVerse_World_Template.json) è il `level 1` operativo. È un World integrato MacroCosmo + MicroCosmo: contiene world facts, timeline, locations, organizations, bestiary, families, NPCs, secrets, canon unlocks e relationships.

I file World principali sotto [`2_Export/World/`](2_Export/World/) restano lorebook JSON pronti per l'import JanitorAI e materiali di migrazione verso il nuovo livello operativo.

- `Modern/SvartulfrVerse_Modern_lorebook.json`
- `Fantasy/SvartulfrVerse_Fantasy_lorebook.json`
- `SciFi/SvartulfrVerse_SciFi_lorebook.json`
- `Viking/SvartulfrVerse_Viking_lorebook.json`
- `Pirate/SvartulfrVerse_Pirate_lorebook.json`
- [`Urban/SvartulfrVerse_Urban.json`](2_Export/World/Urban/SvartulfrVerse_Urban.json)

Ogni lorebook World deve essere validato come JSON array e ogni entry deve includere source e Canon Layer.

## Multi-Character e Scenario Bots

- I bot multi-character richiedono personality separate, Scenario condiviso come regista e Trigger Matrix.
- Ogni personaggio deve reagire in modo distinto agli stessi trigger.
- Gli Scenario Bots richiedono Controller Block, Scenario Block, cicli funzionali e test di pacing oltre 20 turni.
- Il formato dialogo deve separare chiaramente chi parla, con azioni, dialoghi e pensieri non fusi.

## Template legacy rimossi

I seguenti template modulari e documentazione legacy sono stati rimossi da `1_template/` perché il loro comportamento è stato unificato nello schema Level 0 / Level 1 / Level 3:

- `template/README.md`
- `Context_Control_Template.js`
- `Context_Control_Awareness_Template.js`
- `Context_Control_Combined_README.md`
- `Complex_Lorebook_Template.js`
- `Complex_Lorebook_Template_README.md`
- `Adaptive_Lorebook_Template.js`
- `Adaptive_Lorebook_Template_README.md`
- `Context_Aware_Multiple_Character_Template.js`
- `Context_Aware_Multiple_Character_Template_README.md`
- `Advanced_Faction_Management_Template.js`
- `Advanced_Faction_Management_Template_README.md`
- `Persistent_Flags_Lorebook_Template.js`
- `Persistent_Flags_Lorebook_Template_README.md`
- `Persistent_Flags_Template_Plan.md`
- `Hidden_Persistent_Memory_Template.js`
- `Hidden_Persistent_Memory_Template_README.md`
- `Progressive_Sentence_Lorebook_Template.js`
- `Progressive_Sentence_Lorebook_Template_README.md`
- `PropertyExploration.js`
- `PropertyExploration_README.md`
- `Anti_Omniscience_Investigation_Template.js`
- `Anti_Omniscience_Investigation_Template_README.md`
- `TimeDelay_Script_Template.js`
- `TimeDelay_Script_Template_README.md`
- `Multiple_Character_Template.js`
- `Multiple_Character_Template_README.md`

I file canonici [`2_Export/SvartulfrVerse_Engine.js`](2_Export/SvartulfrVerse_Engine.js) e [`1_template/SvartulfrVerse_World_Template.json`](1_template/SvartulfrVerse_World_Template.json) rimangono riferimenti platform e runtime. Il nuovo schema operativo usa l'Engine come `level 0`, il World Lorebook JSON come `level 1`, e la card unica come `level 3`.

## Checklist rapida di integrazione

1. Usa `SvartulfrVerse_Engine_Template.js` come `level 0` per stato e budget.
2. Usa `SvartulfrVerse_World_Template.lorebook.json` come `level 1` per World integrato MacroCosmo + MicroCosmo.
3. Usa la card unica come `level 3`: Personality, Scenario, Initial Message, Example Dialogue e Bot Card.
4. Aggiungi dati concreti solo nel World Lorebook JSON e nella card bot, non nell'Engine.
5. Verifica `source` e Canon Layer su ogni voce lore.
6. Verifica ES6-safe e assenza di API hard-blocked nei runtime JS.
7. Controlla che non esistano riferimenti a template legacy rimossi.
8. Non usare `/TODO-CANON` negli export script.
9. Esegui `git diff --check` dopo modifiche documentali o JS.
