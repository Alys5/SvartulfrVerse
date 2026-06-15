# Tasks

- [x] Task 1: Leggere e profilare il file `conversations.json`
  - [x] Contare conversazioni e messaggi
  - [x] Identificare messaggi con `text` o `content` non vuoti
  - [x] Raccogliere snippet rappresentativi senza importare metadati chat

- [x] Task 2: Classificare i contenuti non vuoti
  - [x] Separare dati World-layer da Character/Experience/Engine meta
  - [x] Escludere URL, guide esterne, prompt, formatting, task tecnici e chat state
  - [x] Verificare eventuali riferimenti a domini Modern, Fantasy, SciFi, Viking, Pirate o Urban

- [x] Task 3: Decidere integrazione o nessuna modifica
  - [x] Se non esistono dati World coerenti, non modificare `2_Export/World`
  - [x] Se esistono dati World coerenti, mapparli a lorebook, categoria, prefix e Canon Layer
  - [x] Verificare assenza duplicati e conflitti con lorebook esistenti

- [x] Task 4: Integrare solo dati validi, se presenti
  - [x] Aggiornare lorebook JSON solo per dati World non vuoti e coerenti
  - [x] Non introdurre URL, percorsi locali, TODO-CANON o debug metadata
  - [x] Non importare scene attive, NPC attivi da Scenario o opening-message logic

- [x] Task 5: Verificare completezza, coerenza e qualità finale
  - [x] Se non ci sono modifiche, confermare assenza di modifiche non necessarie
  - [x] Se ci sono modifiche, validare JSON, campi, prefix, Canon Layer, source e keywords
  - [x] Eseguire `git diff --check`
  - [x] Confermare file modificati o creati, oppure assenza di modifiche World

# Task Dependencies
- Task 2 dipende da Task 1
- Task 3 dipende da Task 2
- Task 4 dipende da Task 3
- Task 5 dipende da Task 4
