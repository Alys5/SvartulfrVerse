# Tasks

- [x] Task 1: Leggere e verificare il file legacy indicato
  - [x] Confermare se `name`, `description`, `prompt_template` e `docs[].content` sono vuoti
  - [x] Identificare eventuali contenuti raw non vuoti nei documenti

- [x] Task 2: Decidere se esistono dati World integrabili
  - [x] Separare metadati vuoti o puramente strutturali da lore World utilizzabile
  - [x] Verificare se esistono dati coerenti con Modern, Fantasy, SciFi, Viking, Pirate o Urban
  - [x] Documentare nel task la decisione di integrare o non integrare

- [x] Task 3: Integrare solo dati validi, se presenti
  - [x] Aggiornare lorebook JSON solo se esistono contenuti non vuoti e coerenti
  - [x] Evitare duplicati, conflitti e modifiche non necessarie
  - [x] Non creare nuovi domini o documenti se il progetto è vuoto

- [x] Task 4: Verificare completezza e coerenza
  - [x] Se non ci sono modifiche, confermare che `2_Export/World` sia rimasto invariato
  - [x] Se ci sono modifiche, validare JSON, campi, prefix, Canon Layer, source e keywords
  - [x] Controllare assenza di percorsi locali, URL, TODO-CANON e debug metadata

- [x] Task 5: Eseguire controllo finale qualità
  - [x] Rilevare file modificati o creati
  - [x] Eseguire `git diff --check`
  - [x] Confermare che il risultato rispetti gli standard del progetto

# Task Dependencies
- Task 2 dipende da Task 1
- Task 3 dipende da Task 2
- Task 4 dipende da Task 3
- Task 5 dipende da Task 4
