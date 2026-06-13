# Tasks

- [ ] Task 1: Inventariare e normalizzare il legacy Amarantia555
  - [ ] SubTask 1.1: leggere tutti i file in `Amarantia555/legacy` e produrre un inventario verificabile.
  - [ ] SubTask 1.2: estrarre world, lore, locations, organizations, factions, family hooks, NPC, relazioni, scene iniziali, status block e visual DNA.
  - [ ] SubTask 1.3: classificare ogni dato come `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]` o `[CANDIDATE]`.
  - [ ] SubTask 1.4: segnalare conflitti e rischi: Alyssa vs `{{user}}`, Twin-Bond condizionale, White Moon/Omega esclusi, Eirik/Erik inconsistency, API legacy obsolete.

- [ ] Task 2: Definire schema runtime e architettura script
  - [ ] SubTask 2.1: scegliere stack template conforme a `.trae/rules/rules.md` e `README.md`.
  - [ ] SubTask 2.2: definire nomi file, responsabilità, input/output e dipendenze logiche.
  - [ ] SubTask 2.3: definire schema di stato, marcatori di persistenza e fallback sicuri.
  - [ ] SubTask 2.4: definire regole di validazione, source attribution `database/` e Canon Layer tag.

- [ ] Task 3: Generare integration script per context e budget
  - [ ] SubTask 3.1: creare script Context Control per `Amarantia555` con `/maxtokens`, `/budget`, `[Lorebook Count: N]` e `[CONTEXT BUDGET: ...]`.
  - [ ] SubTask 3.2: creare Context Control Awareness per parsing budget e degradazione `full → summary → bullet`.
  - [ ] SubTask 3.3: aggiungere guardie `context`, normalizzazione campi e debug mode.

- [ ] Task 4: Generare script MacroCosmo Amarantia555
  - [ ] SubTask 4.1: creare `WRD_Amarantia555.js` per world core e invarianti high fantasy.
  - [ ] SubTask 4.2: creare `LOR_Amarantia555.js` per Nixara, Name-Truth, Twin-Bond, ward history, eventi e trigger contract.
  - [ ] SubTask 4.3: creare `LOC_Amarantia555.js` per Iron Keep, Álfar-viðr, Dovre Pass, Silfr-Mynt e interni.
  - [ ] SubTask 4.4: creare `ORG_Amarantia555.js` per Járn-Gildi, Svartúlfr Clan, Einherjar, Hold-Kaupmenn e Vax slave traders.
  - [ ] SubTask 4.5: creare `BST_Amarantia555.js` solo se necessario per creature o minacce estratte dal legacy.

- [ ] Task 5: Generare script MicroCosmo Amarantia555
  - [ ] SubTask 5.1: creare `FAM_JarnGildi_Amarantia555.js` per family/faction state, ward protocol, reputation, resources, timeline e `/faction`.
  - [ ] SubTask 5.2: creare `NPC_Magnus_Amarantia555.js`, `NPC_Njal_Amarantia555.js`, `NPC_Jorund_Amarantia555.js`, `NPC_Alrik_Amarantia555.js`, `NPC_Eirik_Amarantia555.js`, `NPC_Leif_Amarantia555.js`.
  - [ ] SubTask 5.3: creare `NPC_Alyssa_Amarantia555.js` come boundary NPC, con soppressione quando `{{user}}` gioca il twin.
  - [ ] SubTask 5.4: mappare ogni NPC nelle categorie `identity`, `appearance`, `relationships`, `personality`, `psyche`, `advancedPsychology`, `backstory`, `dialogue`, `combat`, `capabilities`, `sampleDialog`, `residence`, `intimacy`, `notes`.

- [ ] Task 6: Generare state, validation e persistence helpers
  - [ ] SubTask 6.1: implementare parsing e validazione di scene, day/time/weather/tension, active location, ward state, active characters e threat state.
  - [ ] SubTask 6.2: implementare persistenza zero-width o visible flag con marcatori unici, SEARCH_DEPTH e fallback sicuri.
  - [ ] SubTask 6.3: implementare updater append-only per `context.character.personality`, `context.character.scenario` e `context.character.example_dialogs`.
  - [ ] SubTask 6.4: documentare inline le istruzioni character-card per riprodurre stato visibile/hidden e non modificare i marcatori.

- [ ] Task 7: Generare test unitari
  - [ ] SubTask 7.1: creare harness test compatibile con Node per helpers e runtime behavior.
  - [ ] SubTask 7.2: testare parsing legacy, mapping MacroCosmo/MicroCosmo, validazione NPC, validazione stato e injection append-only.
  - [ ] SubTask 7.3: testare contesto mancante, stato invalido, conflitti di filtri, Alyssa boundary e assenza di `database_old/`.
  - [ ] SubTask 7.4: testare assenza di feature JS ristrette e uso corretto dei template.

- [ ] Task 8: Revisione finale e accettazione
  - [ ] SubTask 8.1: eseguire test unitari.
  - [ ] SubTask 8.2: eseguire controlli statici su ES5, `var`, feature ristrette e scritture consentite.
  - [ ] SubTask 8.3: verificare source attribution `database/`, Canon Layer tag, keyword design e token budget.
  - [ ] SubTask 8.4: verificare coerenza con `.trae/rules/rules.md`, `README.md`, `template/janitorai_scripts.md` e README dei template usati.

# Task Dependencies
- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 2
- Task 5 depends on Task 2
- Task 6 depends on Task 2
- Task 7 depends on Task 3, Task 4, Task 5, and Task 6
- Task 8 depends on Task 7
