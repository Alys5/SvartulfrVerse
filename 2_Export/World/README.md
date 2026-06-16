# SvartulfrVerse - Mondi principali

Questa cartella raccoglie i mondi principali del SvartulfrVerse. Ogni mondo è pensato come macro-contesto autonomo, con tono, regole interne, fonti canoniche e ambiti narrativi separati.

## Struttura

- Modern
- Fantasy — `SvartulfrVerse_Fantasy.json` carries the Amarantia555 MacroCosmo lore. Legacy Fantasy/Craesos MicroCosmo data lives under `Fantasy/Craesos/`. Legacy HighFantasy MicroCosmo data lives under `Fantasy/HighFantasy/`. Amarantia555-specific scenario files live under `Fantasy/SvartulfrVerse_Amarantia/`.
- SciFi
- Wasteland
- Viking
- Pirate
- Regency
- Urban

Ogni mondo principale ha un lorebook JSON importabile:

- Modern/SvartulfrVerse_Modern.json
- Fantasy/SvartulfrVerse_Fantasy.json
- Fantasy/Craesos/SvartulfrVerse_Craesos.json
- Fantasy/HighFantasy/SvartulfrVerse_HighFantasy.json
- SciFi/SvartulfrVerse_SciFi.json
- SciFi/Void Bringer/SvartulfrVerse_VoidBringer.json
- Wasteland/SvartulfrVerse_Wasteland.json
- Viking/SvartulfrVerse_Viking.json
- Viking/SvartulfrVerse_WarlordsMerchant/SvartulfrVerse_WarlordsMerchant.json
- Viking/SvartulfrVerse_Iceland/SvartulfrVerse_Iceland827.json
- Viking/SvartulfrVerse_LonghouseCharacters/SvartulfrVerse_LonghouseCharacters.json
- Pirate/SvartulfrVerse_Pirate.json
- Regency/SvartulfrVerse_Regency.json
- Urban/SvartulfrVerse_Urban.json

I casi Modern/SvartulfrVerse_Alyssa, Modern/SvartulfrVerse_DJFrequency, Modern/SvartulfrVerse_TwinXFamily, SciFi/CyberDCC2375, Fantasy/SvartulfrVerse_Amarantia, Fantasy/Craesos, Fantasy/HighFantasy, Viking/SvartulfrVerse_WarlordsMerchant, Viking/SvartulfrVerse_Iceland e Viking/SvartulfrVerse_LonghouseCharacters sono MicroCosmi scenario-specifici o visual-specifici sotto i rispettivi mondi, non World MacroCosmo generici. WarlordsMerchant è l'integrazione raw-neutralizzata per Svartúlfr Clan | Warlord Merchant; Iceland827 resta un MicroCosmo legacy da selezionare solo se esplicitamente richiesto; LonghouseCharacters è un MicroCosmo candidate visual per il prompt grezzo dei personaggi vichinghi in casa lunga.

## Scopo dei mondi

### Modern — Los Angeles 2024

Mondo contemporaneo senza magia e senza sovrannaturale. Serve per storie realistiche, drammi urbani, relazioni moderne, carriera, vita quotidiana e contesti sociali credibili ambientati a Los Angeles.

### Fantasy — Amarantia 555

Mondo fantastico high magic centrato su Amarantia, capitale imperiale dell'Era della Foglia 127 EDF. Serve per magia regolata, Guardiani, esame del potenziale, Porto di Amarantia, Borgo di Acquechete, Emporio Errante, Grand Imperial Road, Lake Mathisar, profezia draconica, Crogiolo, felivoni e continuità legacy di Le Fiamme dell'Anima. Il MicroCosmo scenario attivo vive in Fantasy/SvartulfrVerse_Amarantia. Il MicroCosmo HighFantasy contiene legacy Jarn-Gildi/Álfar-viðr, bestiario e NPC cross-domain: usarlo solo se High Fantasy è il contesto attivo. Non importare Iceland827, TwinXFamily, CyberDCC2375, Seiðr, Járn-Gildi o modern realism salvo crossover esplicito.

### SciFi — CyberDCC 2375

Futuro distopico cyberpunk del 2375 con lupi mannari cybernetici, BlackMoon Pack Law, Solarton Square, sorveglianza biometrica, neon noir romance, corporate houses, VUA, Sentinels e Douglas-Bloodmoon. Serve per pack politics, identità corporea, controllo corporativo, tecnologia implantare, silver vulnerability, status sociale, famiglie dinastiche, crimine, nightlife e tensioni interspecie.

Il MicroCosmo scenario attivo `SciFi/Void Bringer/SvartulfrVerse_VoidBringer.json` contiene il setting 2180s per mecha-wolves, clan Douglas-Bloodmoon, Void Bringer, alien species, ship systems, smuggling syndicate e corporate-shadow politics.

### Wasteland — Post-Collapse Survival

Mondo post-apocalittico survival con civiltà collassata, risorse scarse, scavenging e sopravvivenza tra rovine del vecchio mondo. Serve per scenari esterni, flashback o regioni devastate dove contano pericolo ambientale, polvere, relitti e tensione da scarsità.

### Viking — Mythic Norse / WarlordsMerchant

Ambientazione mythic Viking dark fantasy nell'Islanda/Norvegia vichinga circa 800-900 d.C., centrata su Svartúlfr Clan, Járn-Gildi, Seiðr wards, Name-Truth binding, Hálf-Álfar lineage, Eiriksbarn heir, Iron Keep, Dovre Pass, Silfr-Mynt, Hold-Kaupmenn slavers e Vax slave traders. Serve per saghe familiari, faide, oaths runici, sorveglianza magica, politica del ferro, slaver routes, rituali sacrali, dark fantasy norrena e conflitto tra protezione, controllo e agency dell'erede; non importare la capitale high-fantasy Amarantia555 salvo crossover esplicito. Il MicroCosmo scenario attivo `Viking/SvartulfrVerse_WarlordsMerchant/SvartulfrVerse_WarlordsMerchant.json` contiene l'integrazione raw-neutralizzata per `Svartúlfr Clan | Warlord Merchant`; `Viking/SvartulfrVerse_Iceland/SvartulfrVerse_Iceland827.json` resta legacy e non va considerato canonico per WarlordsMerchant salvo selezione esplicita; `Viking/SvartulfrVerse_LonghouseCharacters/SvartulfrVerse_LonghouseCharacters.json` contiene un MicroCosmo candidate visual per cinque figure vichinghe in una casa lunga, con boundary contro rank werewolf, White Moon, Omega dynamics, Twin-Bond e anatomia dell'utente non stabilita.

### Pirate — London 1666

Ambientazione storico-mercantile e pirata tra Londra e le rotte coloniali, centrata su Merchant House Douglas, Lord Cornelius Vance Douglas, charters, porti, dogane, magazzini, privateers e rivalità commerciali. Serve per commercio marittimo, politica portuale, spionaggio, lettere di marca, accuse di pirateria, conflitti coloniali e l'ambiguità tra legittimità imperiale e ombra privataering.

### Regency — Early 19th Century Aristocratic Society

Ambientazione storico-sociale aristocratica del primo Ottocento, centrata su aristocratic elegance, drawing rooms, social hierarchy, carriage travel, footmen service e period drama. Serve per politica dei salotti, reputazione fragile, propriety come arma sociale, visite formali, estates, ballrooms e tensione pubblica controllata.

### Urban — Solarton 2024

Mondo Supernatural/Grimm style con Monster University, demi-human, licantropi e vampiri. Serve per storie urbane soprannaturali ambientate in una bucolica cittadina della California, con focus sulla Supernatural University of Central California, integrazione tra specie, segreti magici e tensioni sociali nascoste.

## Regole di export World

I lorebook World sono JSON MacroCosmo importabili. Devono contenere lore su larga scala, timeline, luoghi, organizzazioni, creature, eventi e conseguenze canoniche. Non devono contenere direzione scena attiva, NPC attivi o logica di opening message.

Ogni voce lorebook JSON deve includere almeno:

- `id`
- `name`
- `content`
- `key`
- `keysRaw`
- `tags`
- `category`
- `priority`
- `insertion_order`
- `placement`
- `placementPosition`
- `activationMode`

Ogni voce lorebook deve includere:

- source in `extensions`/`comment`;
- Canon Layer: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`;
- prefix canonico: `WRD`, `LOR`, `LOC`, `ORG`, `BST`, `FAM`, `NPC`, `SEC`, `CAN`, `REL`.

Non sono ammessi:

- `source:unspecified`;
- prefissi non canonici come `HST`, `CUL`, `WIT`;
- riferimenti a `TODO-CANON/`;
- ridefinizione di genealogia;
- NPC attivi o relationship state da Scenario;
- lore dump permanenti nei campi Personality o Scenario.

### Raw legacy integration status

- `legacy/Candidate.md` e `legacy/Deferred.md`: integrati come entry candidate/deferred nei lorebook interessati, con `extensions.canonLayer` coerente e `extensions.source` tracciabile.
- `legacy/Cultural.md`: usato per allineare le entry culturali di Amarantia/HighFantasy; le voci culturali non devono diventare fatti operativi immediati se il file raw le classifica come cultura/geografia/estetica.
- `legacy/Historical.md`: integrato come lore storica Amarantia555 con `canonLayer: HISTORICAL`, `source: Historical.md`, `sourceCanonLayer`, `sourceTrace`, data di classificazione e regola di non riattivazione senza trigger narrativo.
- `legacy/L2_svartulfrverse_ClanJarnGildiWarlords.js`: integrato nel MicroCosmo WarlordsMerchant come L2 domain container e regole di confine per Járn-Gildi, User Contract, Alyssa Boundary, Hold-Kaupmenn/Vax e raid response.
- `legacy/W_HighFantasy.js`: integrato come MicroCosmo HighFantasy con le entry runtime per Iron Keep, Vax, Sarrow, Kelsis/Suren/Asag, Jolnora Forest, Scarlett, Marcus, Angel Moreno e Prof. Helena Weiss.
- `legacy/W_HighFantasy.md`: integrato come entry culturale/Visual DNA di High Fantasy; i parametri immagine e la palette sono rimasti come metadata visivo, non come lore operativa.
- `legacy/Viking Portrait In Longhouse.json`: integrato come MicroCosmo candidate visual `Viking/SvartulfrVerse_LonghouseCharacters/SvartulfrVerse_LonghouseCharacters.json`, con boundary contro rank werewolf, White Moon, Omega dynamics, Twin-Bond e anatomia dell'utente non stabilita.
- `legacy/SvartulfrVerse_Fantasy.json`: manifest legacy di tag/struttura per Fantasy; il lorebook corrente `Fantasy/SvartulfrVerse_Fantasy.json` lo supersede e non sono state importate entry stub prive di contenuto runtime.
- `legacy/SvartúlfrVerse.json`: bootstrap/governance prompt del progetto; contiene principi architetturali, non fatti World/MacroCosmo/MicroCosmo concreti, quindi non è stato importato come lorebook runtime.
- `legacy/index.md`: usato come metadata di governance, non come lore runtime; la gerarchia Runtime > ADR > Workflow > Documentation > Templates resta valida e non deve sovrascrivere le osservazioni runtime.
- `legacy/diegetic_comms_framework.md`: non è lore runtime. È un riferimento di stile per `initial_messages.md` ed `example_dialogs.md` quando compaiono messaggi, lettere, post, terminali o note diegetici: ogni blocco va introdotto da una frase narrativa, il formato dei messaggi digitali usa timestamp inline, e i testi diegetici nei blocchi comms sono in inglese.
- `legacy/scenario_template.md`: integrato come metadata di governance per il contratto Scenario, non come lorebook World runtime. Il file contiene istruzioni PList per generare `scenario.md`, non fatti canonici concreti: i placeholder `[Generate: ...]` e `[Define: ...]` non sono stati importati come voci lorebook.
- `legacy/SvartulfrVerse_Modern.json`, `legacy/W_Contemporary.js`, `legacy/W_Contemporary.md`, `legacy/TwinXFamily.md`, `legacy/TXF_Bio.html`, `legacy/TXF_Personality.md`, `legacy/TXF_Scenario.md`, `legacy/TXF_Scenario.js`: integrati come MicroCosmo Modern scenario-specifico in `Modern/SvartulfrVerse_TwinXFamily/`; le voci raw soprannaturali o pack-rank di `legacy/TheFiveCocketeers.json` sono state neutralizzate come conflitto legacy e non importate come fatti operativi Modern.

### Scenario & Lore Template extraction

`legacy/scenario_template.md` è una matrice di authoring per il campo Scenario di livello 3. L'estrazione normalizzata usata come controllo di integrazione è:

- `Narrative AI Directives`: rispetta nome/pronomi scelti da `{{user}}`; usa terza persona, show-not-tell e comportamento osservabile; muove la scena adattandosi alle scelte del giocatore; non assegna sesso, rank, personalità, aspetto, gear o dettagli corporei prima che il giocatore li stabilisca.
- `World Invariants`: richiede epoca, luogo, regione, genere/world type, fazioni, conflitti primari e struttura sociale mappati a `W_*`.
- `Lore Invariants`: richiede specie base, abilità con limiti, fisiologia e bisogni biologici, vulnerabilità, cultura, regole assolute, stigma; se la specie è werewolf, include permanent ears + tail come baseline.
- `Context Invariants`: richiede 1-3 eventi storici rilevanti e segreti nascosti o verità non note ai personaggi.
- `Session Dynamics`: richiede situazione iniziale flessibile, tensione corrente, assi di escalation/de-escalation e 2-3 percorsi di repair.
- `Trigger Contract`: richiede causa, effetto immediato dell'NPC, escalation path e repair condition; duplicare solo per NPC distinti con soglie diverse.
- `Scenario`: richiede un riassunto evergreen e portatile di 2-3 frasi, senza hard lock in tempo presente.
- `{{user}} Contract`: distingue Required, Conditional, Open, DoNotAssume, Player Persona decoupled from NPC Cast e NPC Twin Ref; il campo Janitor USER resta player-authored e i dossier esterni non sono canon.

Boundary applicata a `2_Export/World`: nessuna nuova entry lorebook è stata aggiunta per questo file perché non contiene dati World/MacroCosmo/MicroCosmo concreti. Usare questa estrazione solo per validare futuri Scenario e per evitare che direttive di authoring, template names o placeholder finiscano nei JSON World.

## Esempio minimo di lore entry valida

```javascript
{
    id: 'loc_los_angeles_core',
    category: 'location',
    prefix: 'LOC',
    keywords: ['Los Angeles', 'LA', 'city'],
    priority: 10,
    importance: 5,
    source: 'world/modern/los_angeles_core.md',
    canonLayer: 'ACTIVE',
    full: 'Los Angeles is the central modern setting: dense, aspirational, fragmented, and socially stratified.',
    summary: 'Los Angeles is the central modern setting.',
    bullet: 'Los Angeles: modern urban center, fragmented and aspirational.'
}
```

## Riferimenti

- SvartulfrVerse_World_Template.lorebook.json
- SvartulfrVerse_Engine_Template.js
- Regole workspace
- Architettura template
- Requisiti template
- ASSET_REGISTRY.json
