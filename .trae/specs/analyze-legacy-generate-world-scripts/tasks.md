# Tasks

- [ ] Task 1: Analizzare il legacy e produrre inventario verificabile
  - [ ] SubTask 1.1: elencare tutti i file in `LosAngeles2024/legacy`
  - [ ] SubTask 1.2: leggere file `.md`, `.js`, `.html`, `.json` testuali e identificare entità world/family/character
  - [ ] SubTask 1.3: rilevare riferimenti incrociati, duplicazioni, conflitti, e dati mancanti
  - [ ] SubTask 1.4: classificare dati come Active/Historical/Cultural/Deferred/Candidate secondo ADR-006

- [ ] Task 2: Definire architettura degli script da generare
  - [ ] SubTask 2.1: scegliere stack template coerente con `.trae/rules/rules.md`
  - [ ] SubTask 2.2: definire nomi file, responsabilità, input/output, e dipendenze logiche
  - [ ] SubTask 2.3: definire formato di stato e marcatori di persistenza senza collisioni
  - [ ] SubTask 2.4: definire regole di validazione e coerenza

- [ ] Task 3: Generare script runtime compatibili con JanitorAI
  - [ ] SubTask 3.1: creare script di contesto e budget integration
  - [ ] SubTask 3.2: creare script world/MacroCosmo per LosAngeles2024
  - [ ] SubTask 3.3: creare script family/dynasty/MicroCosmo
  - [ ] SubTask 3.4: creare script character/NPC con categorie adattive
  - [ ] SubTask 3.5: creare script di validazione, aggiornamento, e persistenza stato
  - [ ] SubTask 3.6: aggiungere documentazione inline minima e coerente

- [ ] Task 4: Generare test unitari
  - [ ] SubTask 4.1: creare harness test compatibile con Node per dati e helpers
  - [ ] SubTask 4.2: testare parsing, mapping, validazione, injection append-only, e assenza di feature ristrette
  - [ ] SubTask 4.3: testare contesti mancanti, stato invalido, e conflitti di filtri/attivazione

- [ ] Task 5: Verifica finale
  - [ ] SubTask 5.1: eseguire test unitari
  - [ ] SubTask 5.2: eseguire controlli statici su runtime ES5 e riferimenti vietati
  - [ ] SubTask 5.3: verificare che gli script non tocchino `database_old/`
  - [ ] SubTask 5.4: verificare che ogni script modifichi solo campi `context.character` consentiti

# Task Dependencies

- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 4
