# Tasks

- [ ] Task 1: Analizzare il legacy London1666 e produrre inventario verificabile
  - [ ] SubTask 1.1: elencare tutti i file in `London1666/legacy`
  - [ ] SubTask 1.2: leggere `W_Regency.md`, `Visual_DNA.md`, e `W_Regency.js`
  - [ ] SubTask 1.3: estrarre world facts, visual DNA, locations implicite, comportamento script, e NPC legacy
  - [ ] SubTask 1.4: identificare conflitto temporale London1666 vs Regency, dati mancanti, e riferimenti non attribuiti
  - [ ] SubTask 1.5: classificare dati come `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, o `[CANDIDATE]` secondo la disponibilità di fonti `database/`

- [ ] Task 2: Definire architettura runtime per London1666
  - [ ] SubTask 2.1: scegliere stack template coerente con `.trae/rules/rules.md`
  - [ ] SubTask 2.2: definire nomi file, responsabilità, input/output, e dipendenze logiche
  - [ ] SubTask 2.3: definire formato di stato visible/zero-width senza collisioni
  - [ ] SubTask 2.4: definire regole di validazione, coerenza temporale, source attribution, e Canon Layer

- [ ] Task 3: Generare script runtime compatibili con JanitorAI
  - [ ] SubTask 3.1: creare `London1666/runtime/LON_Context_Control.js`
  - [ ] SubTask 3.2: creare `London1666/runtime/WRD_London1666.js` per MacroCosmo world/visual/locations
  - [ ] SubTask 3.3: creare `London1666/runtime/NPC_London1666.js` per NPC legacy normalizzati e categorie adattive
  - [ ] SubTask 3.4: creare `London1666/runtime/LON_Context_Coherence.js` per coerenza di contesto, periodo storico, personaggi, e fonti
  - [ ] SubTask 3.5: creare `London1666/runtime/LON_State_Persistence.js` per caricamento, aggiornamento e persistenza stato
  - [ ] SubTask 3.6: creare `London1666/runtime/LON_Validation.js` per validazione source/Canon Layer/keywords/runtime constraints
  - [ ] SubTask 3.7: aggiungere documentazione inline minima e coerente agli script

- [ ] Task 4: Generare test unitari
  - [ ] SubTask 4.1: creare harness test Node-style sotto `London1666/tests`
  - [ ] SubTask 4.2: testare inventario legacy e mapping verso runtime entries
  - [ ] SubTask 4.3: testare parsing, categorie NPC, validazione, injection append-only, persistenza, e attivazione keyword
  - [ ] SubTask 4.4: testare contesti mancanti, stato invalido, e conflitti London1666 vs Regency
  - [ ] SubTask 4.5: testare assenza di feature ristrette e assenza di `database_old/`

- [ ] Task 5: Verifica finale
  - [ ] SubTask 5.1: eseguire test unitari
  - [ ] SubTask 5.2: eseguire controlli statici su runtime ES5 e riferimenti vietati
  - [ ] SubTask 5.3: verificare che gli script non tocchino `database_old/`
  - [ ] SubTask 5.4: verificare che gli script modifichino solo campi `context.character` consentiti
  - [ ] SubTask 5.5: verificare che ogni lore voice includa attribuzione `database/` e Canon Layer tag

# Task Dependencies

- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 4
