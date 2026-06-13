# SvartulfrVerse JanitorAI Master Templates

Questo repository contiene l'architettura JanitorAI per SvartulfrVerse, organizzata in tre master-template canonici.

## Fonti ufficiali

| Fonte | Scopo |
|---|---|
| [`.trae/rules/rules.md`](.trae/rules/rules.md) | Indice centrale delle regole del workspace. |
| [`.trae/rules/07_templates_architecture.md`](.trae/rules/07_templates_architecture.md) | Architettura ufficiale dei master-template. |
| [`.trae/rules/08_template_requirements.md`](.trae/rules/08_template_requirements.md) | Requisiti specifici per Engine, World e Scenario. |
| [`bot_template/`](bot_template/) | Master-template canonici da usare come runtime base. |
| [`template/janitorai_scripts.md`](template/janitorai_scripts.md) | Riferimento platform JanitorAI Scripts conservato come fonte tecnica. |
| [`assets/ASSET_REGISTRY.json`](assets/ASSET_REGISTRY.json) | Fonte ufficiale per metadata immagini approvate. |

## Stack canonico

| Livello | Dominio | Master-template | Scopo |
|---|---|---|---|
| 1 + 4 | Engine | [`bot_template/SvartulfrVerse_Engine_Template.js`](bot_template/SvartulfrVerse_Engine_Template.js) | Stato persistente, flag hex, memoria zero-width, Progressive Sentence, debug, token budget. |
| 2 | World / MacroCosmo | [`bot_template/SvartulfrVerse_World_Template.js`](bot_template/SvartulfrVerse_World_Template.js) | Lore estesa, timeline, filtri ANY/ALL, cascade activation, degradazione full/summary/bullet. |
| 3 | Scenario / MicroCosmo | [`bot_template/SvartulfrVerse_Scenario_Template.js`](bot_template/SvartulfrVerse_Scenario_Template.js) | NPC attivi, relazioni, anti-omniscienza, TimeDelay, drop-in/drop-out. |

## Regole d'oro

- L'Engine è 100% agnostico: niente lore, magia, tecnologia, nomi di personaggi o riferimenti a mondi specifici.
- Il significato narrativo dei flag e dello stato appartiene a World e Scenario.
- Ogni voce lore deve includere `source` da `database/` e un Canon Layer: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`.
- I domini MacroCosmo e MicroCosmo sono triggerati da keyword.
- Solo una voce always-on world atmosphere è consentita.
- I file JS runtime devono essere ES5-compatibili e usare `var`, non `let`, `const`, arrow function, template literals, classi o async/await.
- Gli script scrivono solo su `personality`, `scenario` e `example_dialogs`.

## Master-template Engine

[`bot_template/SvartulfrVerse_Engine_Template.js`](bot_template/SvartulfrVerse_Engine_Template.js) unifica:

- Persistent Flags;
- Hidden Persistent Memory;
- Progressive Sentence;
- PropertyExploration/debug utilities;
- parsing del `[CONTEXT BUDGET: ...]`.

L'Engine gestisce meccaniche matematiche e persistenti, non significato narrativo.

## Master-template World

[`bot_template/SvartulfrVerse_World_Template.js`](bot_template/SvartulfrVerse_World_Template.js) unifica:

- Complex Lorebook;
- Adaptive Lorebook;
- timeline events;
- stat reactions;
- cascade activation;
- ANY/ALL filters;
- full/summary/bullet degradation.

World è responsabile della lore su larga scala e del significato canonico.

## Master-template Scenario

[`bot_template/SvartulfrVerse_Scenario_Template.js`](bot_template/SvartulfrVerse_Scenario_Template.js) unifica:

- Context Aware Multiple Character;
- Multiple Character fallback;
- Anti-Omniscience Investigation;
- TimeDelay Script;
- relationship database;
- drop-in/drop-out NPC;
- hidden clue gates;
- conditional events.

Scenario è responsabile della scena corrente, del pacing e delle informazioni sbloccate.

## Template legacy rimossi

I seguenti template modulari e documentazione legacy sono stati rimossi da `template/` perché il loro comportamento è stato unificato nei tre master-template:

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

`template/janitorai_scripts.md` rimane come riferimento platform.

## Checklist rapida di integrazione

1. Usa Engine per stato e budget.
2. Usa World per lore e timeline.
3. Usa Scenario per NPC, relazioni e spoiler gates.
4. Aggiungi dati concreti solo in World/Scenario, non nell'Engine.
5. Verifica `source` e Canon Layer su ogni voce lore.
6. Controlla che non esistano riferimenti a template legacy rimossi.
7. Esegui `git diff --check` dopo modifiche documentali o JS.
