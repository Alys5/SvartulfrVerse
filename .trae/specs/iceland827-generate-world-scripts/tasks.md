# Tasks

- [ ] Task 1: Analizzare il legacy Iceland827 e produrre inventario verificabile
  - [ ] SubTask 1.1: elencare tutti i file in `Iceland827/legacy`
  - [ ] SubTask 1.2: leggere file `.md`, `.js`, `.html` e identificare entità world, location, faction, family, character, relationship, scenario, visual, state
  - [ ] SubTask 1.3: rilevare riferimenti incrociati, duplicazioni, conflitti, e dati mancanti
  - [ ] SubTask 1.4: classificare dati come Active/Historical/Cultural/Deferred/Candidate secondo `.trae/rules/02_project_baseline.md`

- [ ] Task 2: Definire architettura runtime Iceland827
  - [ ] SubTask 2.1: scegliere stack template coerente con `.trae/rules/rules.md`
  - [ ] SubTask 2.2: definire nomi file, responsabilità, input/output, e dipendenze logiche
  - [ ] SubTask 2.3: definire formato di stato visibile/zero-width senza collisioni
  - [ ] SubTask 2.4: definire regole di validazione e coerenza per world, family, NPC, e user agency

- [ ] Task 3: Generare script runtime compatibili con JanitorAI
  - [ ] SubTask 3.1: creare `Iceland827/runtime/IC827_Context_Control.js` per budget minimo e marker sempre-on
  - [ ] SubTask 3.2: creare `Iceland827/runtime/WRD_Iceland827.js` per MacroCosmo world/location/organization
  - [ ] SubTask 3.3: creare `Iceland827/runtime/FAM_Eiriksbarn.js` per family authority, lineage, Twin-Bond, e Visual Authority
  - [ ] SubTask 3.4: creare `Iceland827/runtime/NPC_JarnGildiWarlords.js` per Magnus, Njal, Jorund, Alrik, Eirik, Leif e boundary Alyssa
  - [ ] SubTask 3.5: creare `Iceland827/runtime/IC827_Context_Coherence.js` per invariants e anti-omniscience
  - [ ] SubTask 3.6: creare `Iceland827/runtime/IC827_State_Persistence.js` per parsing, normalizzazione, visible/zero-width state
  - [ ] SubTask 3.7: creare `Iceland827/runtime/IC827_Validation.js` per validazione source, Canon Layer, keywords, e runtime constraints
  - [ ] SubTask 3.8: aggiungere documentazione inline minima e coerente in ogni script

- [ ] Task 4: Generare test unitari
  - [ ] SubTask 4.1: creare harness test compatibile con Node sotto `Iceland827/tests/`
  - [ ] SubTask 4.2: testare inventario legacy, parsing, mapping, injection append-only, e assenza di feature ristrette
  - [ ] SubTask 4.3: testare contesti mancanti, stato invalido, conflitti di filtri/attivazione, e boundary `{{user}}`/Alyssa

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
