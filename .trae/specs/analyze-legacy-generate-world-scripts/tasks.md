# Tasks

- [x] Task 1: Analizzare il legacy e produrre inventario verificabile
  - [x] SubTask 1.1: elencare tutti i file in `LosAngeles2024/legacy`
  - [x] SubTask 1.2: leggere file `.md`, `.js`, `.html`, `.json` testuali e identificare entità world/family/character
  - [x] SubTask 1.3: rilevare riferimenti incrociati, duplicazioni, conflitti, e dati mancanti
  - [x] SubTask 1.4: classificare dati come Active/Historical/Cultural/Deferred/Candidate secondo ADR-006

- [x] Task 2: Definire architettura degli script da generare
  - [x] SubTask 2.1: scegliere stack template coerente con `.trae/rules/rules.md`
  - [x] SubTask 2.2: definire nomi file, responsabilità, input/output, e dipendenze logiche
  - [x] SubTask 2.3: definire formato di stato e marcatori di persistenza senza collisioni
  - [x] SubTask 2.4: definire regole di validazione e coerenza

- [x] Task 3: Generare script runtime compatibili con JanitorAI
  - [x] SubTask 3.1: creare script di contesto e budget integration
  - [x] SubTask 3.2: creare script world/MacroCosmo per LosAngeles2024
  - [x] SubTask 3.3: creare script family/dynasty/MicroCosmo
  - [x] SubTask 3.4: creare script character/NPC con categorie adattive
  - [x] SubTask 3.5: creare script di validazione, aggiornamento, e persistenza stato
  - [x] SubTask 3.6: aggiungere documentazione inline minima e coerente

- [x] Task 4: Generare test unitari
  - [x] SubTask 4.1: creare harness test compatibile con Node per dati e helpers
  - [x] SubTask 4.2: testare parsing, mapping, validazione, injection append-only, e assenza di feature ristrette
  - [x] SubTask 4.3: testare contesti mancanti, stato invalido, e conflitti di filtri/attivazione

- [x] Task 5: Verifica finale
  - [x] SubTask 5.1: eseguire test unitari
  - [x] SubTask 5.2: eseguire controlli statici su runtime ES5 e riferimenti vietati
  - [x] SubTask 5.3: verificare che gli script non tocchino `database_old/`
  - [x] SubTask 5.4: verificare che ogni script modifichi solo campi `context.character` consentiti

# Task Dependencies

- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 4
