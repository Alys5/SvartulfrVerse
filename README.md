# SvartulfrVerse JanitorAI Master Templates

Questo repository contiene l'architettura JanitorAI per SvartulfrVerse, organizzata attorno ai tre master-template canonici e alle guide operative di riferimento.

## Fonti ufficiali

| Fonte | Scopo |
|---|---|
| [JanitorAI Scripts Guide](https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/GuideBookSite/book/print.html) | Runtime script, sandbox ES6-safe, `context`, matching, memory, lorebook, probability, gating, reaction engines, debugging. |
| [Chatbot Creation Guide](https://fcgod.github.io/JanitorAI-Scripts-Centralized-Repository/ChatbotBookSite/book/print.html) | Token economy, U-shaped memory, Personality, Scenario, Example Dialogue, Initial Message, Bot Cards, multi-character, Scenario Bots, testing. |
| [`.trae/rules/rules.md`](.trae/rules/rules.md) | Indice centrale delle regole del workspace. |
| [`.trae/rules/07_templates_architecture.md`](.trae/rules/07_templates_architecture.md) | Architettura ufficiale dei master-template. |
| [`.trae/rules/08_template_requirements.md`](.trae/rules/08_template_requirements.md) | Requisiti specifici per Engine, World, Scenario, Personality, Scenario e Bio. |
| [`1_template/`](1_template/) | Master-template canonici da usare come runtime e authoring base. |
| [`0_assets/ASSET_REGISTRY.json`](0_assets/ASSET_REGISTRY.json) | Fonte ufficiale per metadata immagini approvate. |

## Stack canonico

| Livello | Dominio | Master-template | Scopo |
|---|---|---|---|
| 1 + 4 | Engine | [`1_template/SvartulfrVerse_Engine_Template.js`](1_template/SvartulfrVerse_Engine_Template.js) | Stato persistente, flag hex, memoria zero-width, Progressive Sentence, debug, token budget, runtime ES6-safe. |
| 2 | World / MacroCosmo | [`1_template/SvartulfrVerse_World_Template.js`](1_template/SvartulfrVerse_World_Template.js) | Lore estesa, timeline, filtri ANY/ALL, cascade activation, degradazione full/summary/bullet. |
| 3 | Scenario / MicroCosmo | [`1_template/SvartulfrVerse_Scenario_Template.js`](1_template/SvartulfrVerse_Scenario_Template.js) | NPC attivi, relazioni, anti-omniscienza, TimeDelay, drop-in/drop-out. |

## Regole d'oro

- L'Engine è 100% agnostico: niente lore, magia, tecnologia, nomi di personaggi o riferimenti a mondi specifici.
- Il significato narrativo dei flag e dello stato appartiene a World e Scenario.
- Ogni voce lore deve includere `source`  e un Canon Layer: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`.
- I domini MacroCosmo e MicroCosmo sono triggerati da keyword.
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
| Personality | [`Personality_Template.md`](1_template/Personality_Template.md) | Ancora identitaria | Voce stabile, tratti, comportamento sociale, cue sensoriali, formato output. |
| Multi-character Personality | [`Multi_Character_Personality_Template.md`](1_template/Multi_Character_Personality_Template.md) | Identità separate per cast attivo | 300–500 token per personaggio, voci distinte, relationship hooks e Trigger Matrix. |
| Scenario | [`Scenario_Template.md`](1_template/Scenario_Template.md) | Regista della scena | Ambientazione, stato relazione, categorie interazione, trigger, escalation, de-escalation, repair, pacing. |
| Multi-character Scenario | [`Multi_Character_Scenario_Template.md`](1_template/Multi_Character_Scenario_Template.md) | Scena condivisa per cast attivo | Active cast, turn-taking, Trigger Matrix, escalation/de-escalation e anti-omniscienza. |
| Example Dialogue | [`Example_Dialogue_Template.md`](1_template/Example_Dialogue_Template.md) | Prova comportamentale | Scambi compatti che dimostrano tono, ritmo, turn-taking e reazioni. |
| Initial Message | [`Initial_Message_Template.md`](1_template/Initial_Message_Template.md) | Primo beat | Voice + scene anchor + invitation; non deve essere biografia o lore dump. |
| Advanced Prompt | [`Advanced_Prompt_Template.md`](1_template/Advanced_Prompt_Template.md) | Istruzioni globali brevi | 200–300 token di regole operative, no speaking for user, pacing e anti-drift. |
| Scenario Bot Personality | [`Scenario_Bot_Personality_Template.md`](1_template/Scenario_Bot_Personality_Template.md) | Voce controller/referee | Simulazione, conseguenze, stato visibile/nascosto e principio di agency. |
| Scenario Bot Scenario | [`Scenario_Bot_Scenario_Template.md`](1_template/Scenario_Bot_Scenario_Template.md) | Loop giocabile | Controller Block, Scenario Block, cycle, choice engine, consequence engine, Trigger Matrix. |
| Bot Card | [`Sys_Bio_Template.html`](1_template/Sys_Bio_Template.html) | Storefront | Titolo impattante, subtitle, ritratto, immagini di supporto, blurb strutturato, impact line, chiusura. |
| Runtime Script | Engine/World/Scenario JS | Layer dinamico | Codice ES6-safe con `context`, append-only, trigger keyword e nessun API hard-blocked. |

## Master-template Engine

[`1_template/SvartulfrVerse_Engine_Template.js`](1_template/SvartulfrVerse_Engine_Template.js) unifica:

- Persistent Flags;
- Hidden Persistent Memory;
- Progressive Sentence;
- PropertyExploration/debug utilities;
- parsing del `[CONTEXT BUDGET: ...]`;
- runtime ES6-safe dentro il sandbox.

L'Engine gestisce meccaniche matematiche e persistenti, non significato narrativo.

## Master-template World

[`1_template/SvartulfrVerse_World_Template.js`](1_template/SvartulfrVerse_World_Template.js) unifica:

- Complex Lorebook;
- Adaptive Lorebook;
- timeline events;
- stat reactions;
- cascade activation;
- ANY/ALL filters;
- full/summary/bullet degradation.

World è responsabile della lore su larga scala e del significato canonico. Non gestisce NPC attivi o direzione scena.

## Master-template Scenario

[`1_template/SvartulfrVerse_Scenario_Template.js`](1_template/SvartulfrVerse_Scenario_Template.js) unifica:

- Context Aware Multiple Character;
- Multiple Character fallback;
- Anti-Omniscience Investigation;
- TimeDelay Script;
- relationship database;
- drop-in/drop-out NPC;
- hidden clue gates;
- conditional events;
- Trigger Matrix, escalation, de-escalation e repair.

Scenario è responsabile della scena corrente, del pacing e delle informazioni sbloccate.

## World Export Scaffolds

I file World principali sotto [`2_Export/World/`](2_Export/World/) sono scaffold pronti per lore concreta:

- [`Modern/SvartulfrVerse_Modern.js`](2_Export/World/Modern/SvartulfrVerse_Modern.js)
- [`Fantasy/SvartulfrVerse_Fantasy.js`](2_Export/World/Fantasy/SvartulfrVerse_Fantasy.js)
- [`SciFi/SvartulfrVerse_SciFi.js`](2_Export/World/SciFi/SvartulfrVerse_SciFi.js)
- [`Viking/SvartulfrVerse_Viking.js`](2_Export/World/Viking/SvartulfrVerse_Viking.js)
- [`Pirate/SvartulfrVerse_Pirate.js`](2_Export/World/Pirate/SvartulfrVerse_Pirate.js)
- [`Urban/SvartulfrVerse_Urban.js`](2_Export/World/Urban/SvartulfrVerse_Urban.js)

Prima dell'uso runtime, ogni export World deve essere popolato con `loreEntries`, `timelineEvents` e `statReactions` coerenti. Ogni entry concreta deve includere source  e Canon Layer.

## Multi-Character e Scenario Bots

- I bot multi-character richiedono personality separate, Scenario condiviso come regista e Trigger Matrix.
- Ogni personaggio deve reagire in modo distinto agli stessi trigger.
- Gli Scenario Bots richiedono Controller Block, Scenario Block, cicli funzionali e test di pacing oltre 20 turni.
- Il formato dialogo deve separare chiaramente chi parla, con azioni, dialoghi e pensieri non fusi.

## Template legacy rimossi

I seguenti template modulari e documentazione legacy sono stati rimossi da `1_template/` perché il loro comportamento è stato unificato nei tre master-template:

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

I file canonici `1_template/SvartulfrVerse_Engine_Template.js`, `1_template/SvartulfrVerse_World_Template.js` e `1_template/SvartulfrVerse_Scenario_Template.js` rimangono il riferimento platform e runtime.

## Checklist rapida di integrazione

1. Usa Engine per stato e budget.
2. Usa World per lore e timeline.
3. Usa Scenario per NPC, relazioni, trigger, escalation, de-escalation, repair e spoiler gates.
4. Aggiungi dati concreti solo in World/Scenario, non nell'Engine.
5. Verifica `source` e Canon Layer su ogni voce lore.
6. Verifica ES6-safe e assenza di API hard-blocked nei runtime JS.
7. Controlla che non esistano riferimenti a template legacy rimossi.
8. Non usare `/TODO-CANON` negli export script.
9. Esegui `git diff --check` dopo modifiche documentali o JS.
