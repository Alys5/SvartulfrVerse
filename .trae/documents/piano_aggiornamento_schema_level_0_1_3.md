# Piano: aggiornamento architettura a schema Level 0 / Level 1 / Level 3

## Summary

Aggiornare il repository in modo che la nuova architettura SvartulfrVerse sia documentata come schema operativo principale:

- `level 0`: `1_template/SvartulfrVerse_Engine_Template.js`, comune a tutti i bot.
- `level 1`: `1_template/SvartulfrVerse_World_Template.lorebook.json`, World integrato per il genere/mondo del bot.
- `level 3`: card unica del bot, composta da Personality, Scenario, Initial Message, Example Dialogue e Bot Card, selezionando il template corretto in base al tipo di bot.

Il `level 1` non è solo MacroCosmo: contiene sia MacroCosmo sia MicroCosmo, quindi include world facts, lore, locations, organizations, bestiary, families, NPCs, secrets, canon unlocks e relationships.

Il piano preserva la compatibilità con la documentazione esistente: gli scaffold JS in `2_Export/World/` restano riferibili come scaffold storici o materiali di migrazione, ma il README e le regole devono indicare il nuovo schema come architettura attiva.

## Current State Analysis

File già esplorati:

- `README.md`
  - Oggi descrive i tre master-template canonici:
    - Engine JS come livello 1 + 4;
    - World JS come livello 2;
    - Scenario JS come livello 3.
  - Include una sezione `World Export Scaffolds` che elenca gli scaffold JS in `2_Export/World/`.
  - Include checklist rapida che usa la vecchia numerazione.

- `1_template/SvartulfrVerse_Engine_Template.js`
  - Esiste ed è il runtime engine lore-agnostic.
  - Deve diventare `level 0`, comune a tutti i bot.

- `1_template/SvartulfrVerse_World_Template.js`
  - Esiste come master-template runtime per World/MacroCosmo.
  - Il nuovo schema richiede però `1_template/SvartulfrVerse_World_Template.lorebook.json`, che non esiste ancora.
  - Il piano non crea il file JSON; documenta il nuovo file come destinazione dello schema.

- `1_template/SvartulfrVerse_Scenario_Template.js`
  - Esiste come master-template runtime per Scenario/MicroCosmo.
  - Nel nuovo schema non è più elencato come livello autonomo: la logica runtime può restare come riferimento tecnico, ma la card unica del bot è descritta tramite i template Markdown/HTML.

- Template card unici già letti:
  - `1_template/Personality_Template.md`
  - `1_template/Scenario_Bot_Personality_Template.md`
  - `1_template/Multi_Character_Personality_Template.md`
  - `1_template/Scenario_Bot_Scenario_Template.md`
  - `1_template/Multi_Character_Scenario_Template.md`
  - `1_template/Scenario_Template.md`
  - `1_template/Initial_Message_Template.md`
  - `1_template/Example_Dialogue_Template.md`
  - `1_template/Sys_Bio_Template.html`

- `.trae/rules/07_templates_architecture.md`
  - Deve essere aggiornato perché oggi definisce il vecchio stack canonico a tre livelli.

- `.trae/rules/08_template_requirements.md`
  - Deve essere aggiornato per allineare i requisiti dei template al nuovo schema.

- `.trae/rules/12_compatibility_matrix.md`
  - Deve essere aggiornato perché contiene riferimenti diretti alla vecchia numerazione dei livelli.

## Proposed Changes

### 1. Aggiornare `README.md`

Modificare `README.md` per introdurre il nuovo schema operativo principale.

Cambiamenti previsti:

- Riscrivere la sezione `Stack canonico` sostituendo la vecchia tabella con:

  - `level 0` → `1_template/SvartulfrVerse_Engine_Template.js`
    - comune a tutti i bot;
    - runtime engine lore-agnostic;
    - gestisce stato persistente, flag, memoria zero-width, progressive context, debug e budget token.

  - `level 1` → `1_template/SvartulfrVerse_World_Template.lorebook.json`
    - World integrato, non solo MacroCosmo;
    - contiene sia MacroCosmo sia MicroCosmo;
    - specifico per genere/mondo: fantasy, modern, viking, sci-fi, urban, pirate ecc.;
    - contiene lore, timeline, reazioni stat, attivazioni contestuali, NPC, relazioni, secrets e canon unlocks.
    - domini previsti:

| Domain | Prefix | Scope |
|---|---|---|
| World | `WRD:` | Core physical, cosmological, and rule-system facts |
| Lore | `LOR:` | Events, artifacts, ancient history, and present-day consequences |
| Locations | `LOC:` | Regions, cities, interiors, and points of interest |
| Organizations | `ORG:` | Factions, guilds, institutions, and hierarchy |
| Bestiary | `BST:` | Creatures, monsters, threats, habitats, and weaknesses |
| Families | `FAM:` | Dynasties, bloodlines, genealogy hooks, politics, reputation, and house secrets |
| NPCs | `NPC:` | Individual identity, visual presentation, relationships, combat, psyche, and active scene presence |
| Secrets | `SEC:` | Locked investigation content, hidden clues, and spoiler gates |
| Canon Unlocks | `CAN:` | Investigation canon unlocked by state, time, or message thresholds |
| Relationships | `REL:` | Active relationship dynamics, emotional states, and interaction contracts |

  - `level 3` → card unica del bot
    - Personality;
    - Scenario;
    - Initial Message;
    - Example Dialogue;
    - Bot Card.

- Aggiungere una tabella di selezione template per `level 3`:

  - Single-character bot:
    - `Personality_Template.md`
    - `Scenario_Template.md`
    - `Initial_Message_Template.md`
    - `Example_Dialogue_Template.md`
    - `Sys_Bio_Template.html`

  - Multi-character bot:
    - `Multi_Character_Personality_Template.md`
    - `Multi_Character_Scenario_Template.md`
    - `Initial_Message_Template.md`
    - `Example_Dialogue_Template.md`
    - `Sys_Bio_Template.html`

  - Scenario bot:
    - `Scenario_Bot_Personality_Template.md`
    - `Scenario_Bot_Scenario_Template.md`
    - `Initial_Message_Template.md`
    - `Example_Dialogue_Template.md`
    - `Sys_Bio_Template.html`

- Aggiornare la sezione `Master-template Engine`, `Master-template World`, `Master-template Scenario` per renderla coerente con il nuovo schema:
  - Engine resta come `level 0`.
  - World Template JS resta come master-template tecnico/runtime, ma il livello operativo richiesto è il lorebook JSON.
  - Scenario Template JS resta come master-template tecnico/runtime, ma la card attiva vive nei template Markdown/HTML del `level 3`.

- Aggiornare `Bot Design Contract`:
  - Personality come identità del bot.
  - Scenario come regista della scena o controller.
  - Example Dialogue come prova comportamentale.
  - Initial Message come primo beat.
  - Bot Card come storefront.
  - Multi-character e Scenario bot come varianti del `level 3`.

- Aggiornare `Checklist rapida di integrazione`:
  - usare Engine come livello 0;
  - usare World Lorebook JSON come livello 1;
  - usare card unica come livello 3;
  - verificare source e Canon Layer su ogni voce lore;
  - verificare ES6-safe e assenza di API hard-blocked nell'Engine;
  - controllare assenza di riferimenti a template legacy rimossi;
  - non usare `/TODO-CANON`;
  - eseguire `git diff --check` dopo modifiche documentali o JS.

- Aggiornare la sezione `World Export Scaffolds`:
  - spiegare che gli scaffold JS in `2_Export/World/` sono materiali storici o di migrazione;
  - il nuovo riferimento operativo per il livello 1 è `1_template/SvartulfrVerse_World_Template.lorebook.json`.

### 2. Aggiornare `.trae/rules/07_templates_architecture.md`

Modificare il file per sostituire il vecchio `Canonical Master-Template Stack`.

Nuova struttura da documentare:

- `level 0` → `../../1_template/SvartulfrVerse_Engine_Template.js`
  - runtime comune a tutti i bot;
  - lore-agnostic;
  - nessuna lore, magia, tecnologia, nomi di personaggi o riferimenti a mondi specifici.

- `level 1` → `../../1_template/SvartulfrVerse_World_Template.lorebook.json`
  - World integrato per genere/mondo;
  - contiene sia MacroCosmo sia MicroCosmo;
  - lorebook JSON specifico;
  - contiene lore estesa, timeline, stat reactions, cascade activation, filtri, NPC, relazioni, secrets, canon unlocks e gates investigativi;
  - usa i domini e prefix richiesti: `WRD:`, `LOR:`, `LOC:`, `ORG:`, `BST:`, `FAM:`, `NPC:`, `SEC:`, `CAN:`, `REL:`.

- `level 3` → card unica del bot
  - Personality, Scenario, Initial Message, Example Dialogue e Bot Card;
  - il template concreto dipende dal tipo di bot:
    - single-character;
    - multi-character;
    - scenario bot.

Aggiornare anche:

- `Bot Design Contract`;
- eventuali riferimenti alla vecchia numerazione `Level 1 + Level 4`, `Level 2`, `Level 3`.

### 3. Aggiornare `.trae/rules/08_template_requirements.md`

Allineare i requisiti dei template al nuovo schema.

Cambiamenti previsti:

- `Engine Template Requirements`:
  - `level 0`;
  - comune a tutti i bot;
  - unico punto runtime JS lore-agnostic.

- `World / MacroCosmo + MicroCosmo Template Requirements`:
  - `level 1`;
  - riferimento operativo: `SvartulfrVerse_World_Template.lorebook.json`;
  - contiene sia MacroCosmo sia MicroCosmo;
  - ogni voce lore deve avere `source` e Canon Layer;
  - ogni dominio deve usare il prefix previsto;
  - MacroCosmo e MicroCosmo sono keyword-triggered;
  - una sola voce always-on world atmosphere consentita;
  - NPC, relazioni, secrets, canon unlocks e scene gates appartengono al World integrato del `level 1`.

- `Personality / Scenario / Example Dialogue / Initial Message / Bot Card`:
  - `level 3`;
  - unica card bot;
  - scegliere template in base al tipo di bot.

- Rimuovere o riformulare riferimenti al vecchio `Scenario JS` come livello autonomo, mantenendolo solo come riferimento tecnico se necessario.

### 4. Aggiornare `.trae/rules/12_compatibility_matrix.md`

Aggiornare la matrice perché oggi contiene riferimenti diretti alla vecchia numerazione.

Cambiamenti previsti:

- sostituire `Level 1 + Level 4` con `level 0`;
- sostituire `Level 2` con `level 1`;
- sostituire `Level 3` con `level 3`;
- aggiungere note di compatibilità:
  - `SvartulfrVerse_World_Template.js` resta master-template tecnico;
  - `SvartulfrVerse_Scenario_Template.js` resta master-template tecnico;
  - `SvartulfrVerse_World_Template.lorebook.json` è il nuovo livello operativo World;
  - gli scaffold JS in `2_Export/World/` restano riferibili come scaffolds storici o di migrazione.

### 5. Aggiornare `.trae/rules/rules.md` se necessario

Modificare solo le righe della central index se risultano non allineate:

- `Canonical Master-Template Stack`;
- `Bot Design Contract`;
- eventuali riferimenti ai livelli.

Non duplicare il contenuto dei moduli in `rules.md`.

## Assumptions & Decisions

- Non creare `SvartulfrVerse_World_Template.lorebook.json` in questa fase, perché la richiesta riguarda l'aggiornamento di README e regole con il nuovo schema.
- Non eliminare `SvartulfrVerse_World_Template.js` né `SvartulfrVerse_Scenario_Template.js`, perché sono file esistenti e possono restare come master-template tecnici/runtime.
- Non eliminare gli scaffold JS in `2_Export/World/`, perché sono documentati nel README; verranno ricontestualizzati come materiali storici o di migrazione.
- Il nuovo schema usa la numerazione richiesta dall'utente: `level 0`, `level 1`, `level 3`.
- Il `level 3` è interpretato come card unica del bot, non come un singolo file.

## Verification steps

Dopo le modifiche:

1. Leggere i file modificati per verificare coerenza terminologica e link.
2. Cercare riferimenti alla vecchia numerazione `Level 1 + Level 4`, `Level 2`, `Level 3` nei file aggiornati.
3. Cercare riferimenti a `SvartulfrVerse_World_Template.lorebook.json` per confermare che sia documentato come `level 1`.
4. Eseguire `git diff --check` nel workspace.
