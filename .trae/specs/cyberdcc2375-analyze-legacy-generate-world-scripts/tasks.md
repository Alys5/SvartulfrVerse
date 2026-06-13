# Tasks

- [ ] Task 1: Analizzare il legacy CyberDCC2375 e produrre inventario verificabile
  - [ ] SubTask 1.1: elencare tutti i file in `CyberDCC2375/legacy`
  - [ ] SubTask 1.2: leggere file `.md`, `.js`, `.html` testuali e identificare entità world/family/character
  - [ ] SubTask 1.3: rilevare riferimenti incrociati, duplicazioni, conflitti, e dati mancanti
  - [ ] SubTask 1.4: classificare dati come Active/Historical/Cultural/Deferred/Candidate secondo `.trae/rules/rules.md`

- [ ] Task 2: Definire architettura degli script CyberDCC2375
  - [ ] SubTask 2.1: scegliere stack template coerente con `.trae/rules/rules.md`
  - [ ] SubTask 2.2: definire nomi file, responsabilità, input/output, e dipendenze logiche
  - [ ] SubTask 2.3: definire formato di stato e marcatori di persistenza senza collisioni
  - [ ] SubTask 2.4: definire regole di validazione e coerenza

- [ ] Task 3: Generare dati normalizzati e helpers condivisi
  - [ ] SubTask 3.1: creare dataset normalizzato da legacy con attribuzione `database/` e Canon Layer
  - [ ] SubTask 3.2: creare helpers ES5 per parsing, validazione, mapping e injection append-only
  - [ ] SubTask 3.3: creare mapping MacroCosmo per world/location/faction/lore
  - [ ] SubTask 3.4: creare mapping MicroCosmo per family/dynasty e personaggi/NPC

- [ ] Task 4: Generare script runtime compatibili con JanitorAI
  - [ ] SubTask 4.1: creare script di contesto e budget integration
  - [ ] SubTask 4.2: creare script world/MacroCosmo per CyberDCC2375
  - [ ] SubTask 4.3: creare script family/dynasty/MicroCosmo
  - [ ] SubTask 4.4: creare script character/NPC con categorie adattive
  - [ ] SubTask 4.5: creare script di validazione, aggiornamento, e persistenza stato
  - [ ] SubTask 4.6: aggiungere documentazione inline minima e coerente

- [ ] Task 5: Generare test unitari
  - [ ] SubTask 5.1: creare harness test compatibile con Node per dati e helpers
  - [ ] SubTask 5.2: testare parsing, mapping, validazione, injection append-only, e assenza di feature ristrette
  - [ ] SubTask 5.3: testare contesti mancanti, stato invalido, e conflitti di filtri/attivazione

- [ ] Task 6: Verifica finale
  - [ ] SubTask 6.1: eseguire test unitari
  - [ ] SubTask 6.2: eseguire controlli statici su runtime ES5 e riferimenti vietati
  - [ ] SubTask 6.3: verificare che gli script non tocchino `database_old/`
  - [ ] SubTask 6.4: verificare che ogni script modifichi solo campi `context.character` consentiti

# Task Dependencies

- Task 2 depends on Task 1
- Task 3 depends on Task 2
- Task 4 depends on Task 3
- Task 5 depends on Task 4
- Task 6 depends on Task 5
