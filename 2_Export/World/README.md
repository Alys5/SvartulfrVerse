# SvartulfrVerse - Mondi principali

Questa cartella raccoglie i mondi principali del SvartulfrVerse. Ogni mondo è pensato come macro-contesto autonomo, con tono, regole interne, fonti canoniche e ambiti narrativi separati.

## Struttura

- Modern
- Fantasy — SvartulfrVerse_Fantasy_lorebook.json carries the Fantasy MacroCosmo lore plus Amarantia555 high-fantasy lore activation. Amarantia555-specific scenario files live under `Fantasy/Amarantia555/`.
- SciFi
- Viking
- Pirate
- Urban

Ogni mondo principale ha un lorebook JSON importabile:

- Modern/SvartulfrVerse_Modern.json
- Fantasy/SvartulfrVerse_Fantasy.json
- SciFi/SvartulfrVerse_SciFi.json
- Viking/SvartulfrVerse_Viking.json
- Pirate/SvartulfrVerse_Pirate.json
- Urban/SvartulfrVerse_Urban.json

I casi Modern/TwinXFamily, SciFi/CyberDCC2375 e Fantasy/Amarantia555 sono MicroCosmi scenario specifici sotto i rispettivi mondi, non World MacroCosmo generici.

## Scopo dei mondi

### Modern — Los Angeles 2024

Mondo contemporaneo senza magia e senza sovrannaturale. Serve per storie realistiche, drammi urbani, relazioni moderne, carriera, vita quotidiana e contesti sociali credibili ambientati a Los Angeles.

### Fantasy — Amarantia 555

Mondo fantastico high magic centrato su Amarantia, capitale imperiale dell'Era della Foglia 127 EDF. Serve per magia regolata, Guardiani, esame del potenziale, Porto di Amarantia, Borgo di Acquechete, Emporio Errante, Grand Imperial Road, Lake Mathisar, profezia draconica, Crogiolo, felivoni e continuità legacy di Le Fiamme dell'Anima. Il MicroCosmo scenario attivo vive in Fantasy/Amarantia555. Non importare Iceland827, TwinXFamily, CyberDCC2375, Seiðr, Járn-Gildi o modern realism salvo crossover esplicito.

### SciFi — CyberDCC 2375

Futuro distopico cyberpunk del 2375 con lupi mannari cybernetici, BlackMoon Pack Law, Solarton Square, sorveglianza biometrica, neon noir romance, corporate houses, VUA, Sentinels e Douglas-Bloodmoon. Serve per pack politics, identità corporea, controllo corporativo, tecnologia implantare, silver vulnerability, status sociale, famiglie dinastiche, crimine, nightlife e tensioni interspecie.

### Viking — Iceland 827

Ambientazione mythic Viking dark fantasy nell'Islanda/Norvegia vichinga circa 800-900 d.C., centrata su Svartúlfr Clan, Járn-Gildi, Seiðr wards, Name-Truth binding, Hálf-Álfar lineage, Eiriksbarn heir, Iron Keep, Dovre Pass e Amarantia Route come nome di rotta settentrionale. Serve per saghe familiari, faide, oaths runici, sorveglianza magica, politica del ferro, slaver routes, rituali sacrali, dark fantasy norrena e conflitto tra protezione, controllo e agency dell'erede; non importare la capitale high-fantasy Amarantia555 salvo crossover esplicito.

### Pirate — London 1666

Ambientazione storico-mercantile e pirata tra Londra e le rotte coloniali, centrata su Merchant House Douglas, Lord Cornelius Vance Douglas, charters, porti, dogane, magazzini, privateers e rivalità commerciali. Serve per commercio marittimo, politica portuale, spionaggio, lettere di marca, accuse di pirateria, conflitti coloniali e l'ambiguità tra legittimità imperiale e ombra privataering.

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

- source in `content`;
- Canon Layer: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`;
- prefix canonico: `WRD`, `LOR`, `LOC`, `ORG`, `BST`, `FAM`, `NPC`, `SEC`, `CAN`, `REL`.

Non sono ammessi:

- `source:unspecified`;
- prefissi non canonici come `HST`, `CUL`, `WIT`;
- riferimenti a `TODO-CANON/`;
- ridefinizione di genealogia;
- NPC attivi o relationship state da Scenario;
- lore dump permanenti nei campi Personality o Scenario.

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
