# Tasks

- [x] Task 1: Analizzare la struttura del file legacy e identificare dati integrabili
  - [x] Leggere il file JSON legacy indicato dall'utente
  - [x] Individuare sezioni relative a World, MacroCosmo, MicroCosmo, luoghi, timeline, organizzazioni, famiglie, NPC, creature, segreti e relazioni
  - [x] Separare dati coerenti con `2_Export/World` da dati scenario/character/engine non integrabili

- [x] Task 2: Mappare i dati estratti sui domini World esistenti
  - [x] Confrontare ogni dato estratto con i lorebook presenti in Modern, Fantasy, SciFi, Viking, Pirate e Urban
  - [x] Assegnare ogni voce a un dominio, categoria, prefix canonico e Canon Layer coerenti
  - [x] Evitare duplicati e conflitti con voci già presenti

- [x] Task 3: Integrare i dati nei lorebook JSON di destinazione
  - [x] Creare o aggiornare voci lorebook solo dove coerenti con il dominio
  - [x] Preservare le normative di organizzazione file esistenti
  - [x] Non introdurre riferimenti locali, debug metadata o contenuti non canonici

- [x] Task 4: Verificare completezza e coerenza dell'integrazione
  - [x] Validare JSON e campi richiesti
  - [x] Verificare prefissi canonici, Canon Layer, keywords, source e assenza di conflitti
  - [x] Controllare che le integrazioni non violino le regole World del progetto

- [x] Task 5: Eseguire controllo finale qualità
  - [x] Rilevare file modificati o creati
  - [x] Eseguire controlli di formattazione/validazione disponibili
  - [x] Confermare che l'integrazione sia avvenuta correttamente

# Task Dependencies
- Task 2 dipende da Task 1
- Task 3 dipende da Task 2
- Task 4 dipende da Task 3
- Task 5 dipende da Task 4
