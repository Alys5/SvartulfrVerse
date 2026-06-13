# Checklist

- [ ] L'analisi ha inventariato tutti i file testuali in `LosAngeles2024/legacy`
- [ ] L'analisi ha classificato world, family, character, relationship, scenario, visual, combat, psyche, e state data
- [ ] L'analisi ha identificato conflitti, duplicazioni, riferimenti mancanti, e dati canon-sensitive
- [ ] Gli script generati rispettano ES5 e usano solo `var`
- [ ] Gli script runtime non usano feature ristrette: `import`, `export`, `require`, `async`, `await`, `Promise`, `fetch`, `XMLHttpRequest`, `document`, `window`, `localStorage`, `sessionStorage`, `IndexedDB`, `fs`, `readFile`, `eval`, `new Function`
- [ ] Gli script runtime usano `context` come unica interfaccia JanitorAI
- [ ] Gli script modificano solo `context.character.personality`, `context.character.scenario`, e `context.character.example_dialogs`
- [ ] Gli script applicano append-only injection e prefix corretti per personality/scenario/example dialogs
- [ ] Gli script includono guardie per `context`, `context.character`, `context.character.personality`, e `context.character.scenario`
- [ ] Gli script includono validazione e gestione sicura di stato mancante o invalido
- [ ] Gli script includono meccanismi di persistenza coerenti e marcatori unici quando necessario
- [ ] Gli script non introducono riferimenti a `database_old/`
- [ ] Ogni lorebook voice include attribuzione `database/` e Canon Layer tag
- [ ] Le categorie NPC seguono il modello aggiornato: `identity`, `appearance`, `relationships`, `personality`, `psyche`, `advancedPsychology`, `backstory`, `dialogue`, `combat`, `capabilities`, `sampleDialog`, `residence`, `intimacy`, `notes`
- [ ] I test unitari coprono parsing, mapping, validazione, injection append-only, stato invalido, e compatibilità runtime
- [ ] I test unitari vengono eseguiti con esito positivo
- [ ] La documentazione inline è presente senza duplicare documentazione esterna non richiesta
- [ ] I file generati sono coerenti con `.trae/rules/rules.md`, `README.md`, e i template ufficiali
