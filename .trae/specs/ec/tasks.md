# Tasks

- [x] Task 1: Analizzare il legacy e produrre inventario verificabile
  - [x] SubTask 1.1: elencare tutti i file in `ModernFantasy2024/legacy`
  - [x] SubTask 1.2: leggere file `.md`, `.js`, `.html`, `.json` e `.txt` testuali
  - [x] SubTask 1.3: identificare world, locations, factions, family, characters, NPC, state, visual, scenario, info board e asset references
  - [x] SubTask 1.4: classificare dati come `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]` o `[CANDIDATE]`
  - [x] SubTask 1.5: rilevare conflitti e assunzioni non sicure, soprattutto su `{{user}}`, Alyssa, rank, sesso e Moonstone

- [x] Task 2: Definire architettura runtime
  - [x] SubTask 2.1: scegliere stack template coerente con `.trae/rules/rules.md`
  - [x] SubTask 2.2: definire nomi file, responsabilità, input/output e dipendenze logiche
  - [x] SubTask 2.3: definire formato di stato `[MF_STATE:visible]...[/MF_STATE]` e marcatori zero-width unici
  - [x] SubTask 2.4: definire regole di validazione, coerenza e attivazione keyword

- [ ] Task 3: Generare script runtime compatibili con JanitorAI
  - [ ] SubTask 3.1: creare `MF_Context_Control.js` e `MF_Context_Awareness.js`
  - [ ] SubTask 3.2: creare `WRD_ModernFantasy2024.js` per MacroCosmo world/location/faction
  - [ ] SubTask 3.3: creare `FAM_DouglasBloodmoon.js` per MicroCosmo family/genealogy
  - [ ] SubTask 3.4: creare `NPC_DouglasBloodmoon.js` per personaggi principali e NPC
  - [ ] SubTask 3.5: creare `MF_Context_Coherence.js` per prevenzione assunzioni e coerenza contesto
  - [ ] SubTask 3.6: creare `MF_State_Persistence.js` per parsing, aggiornamento e riproduzione stato
  - [ ] SubTask 3.7: creare `MF_Validation.js` per diagnostica sicura e validazione runtime
  - [ ] SubTask 3.8: aggiungere documentazione inline minima e coerente

- [ ] Task 4: Generare test unitari
  - [ ] SubTask 4.1: creare harness Node sotto `ModernFantasy2024/tests`
  - [ ] SubTask 4.2: testare parsing, mapping, validazione, injection append-only e assenza di feature ristrette
  - [ ] SubTask 4.3: testare contesti mancanti, stato invalido, filtri keyword e mancata attivazione in contesto non pertinente

- [ ] Task 5: Verifica finale
  - [ ] SubTask 5.1: eseguire test unitari
  - [ ] SubTask 5.2: eseguire controlli statici su runtime ES5 e riferimenti vietati
  - [ ] SubTask 5.3: verificare che gli script non tocchino `database_old/`
  - [ ] SubTask 5.4: verificare che gli script modifichino solo campi `context.character` consentiti

# Task Dependencies

- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 4
