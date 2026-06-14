# SvartulfrVerse - Mondi principali

Questa cartella raccoglie i mondi principali del SvartulfrVerse. Ogni mondo è pensato come macro-contesto autonomo, con tono, regole interne, fonti canoniche e ambiti narrativi separati.

## Struttura

- [Modern](Modern/)
- [Fantasy](Fantasy/)
- [SciFi](SciFi/)
- [Viking](Viking/)
- [Pirate](Pirate/)
- [Urban](Urban/)

Ogni mondo principale ha un export MacroCosmo scaffold:

- [Modern/SvartulfrVerse_Modern.js](Modern/SvartulfrVerse_Modern.js)
- [Fantasy/SvartulfrVerse_Fantasy.js](Fantasy/SvartulfrVerse_Fantasy.js)
- [SciFi/SvartulfrVerse_SciFi.js](SciFi/SvartulfrVerse_SciFi.js)
- [Viking/SvartulfrVerse_Viking.js](Viking/SvartulfrVerse_Viking.js)
- [Pirate/SvartulfrVerse_Pirate.js](Pirate/SvartulfrVerse_Pirate.js)
- [Urban/SvartulfrVerse_Urban.js](Urban/SvartulfrVerse_Urban.js)

I casi [Modern/TwinXFamily](Modern/TwinXFamily/) e [SciFi/CyberDCC2375](SciFi/CyberDCC2375/) sono MicroCosmi specifici sotto i rispettivi mondi, non World MacroCosmo generici.

## Scopo dei mondi

### Modern — Los Angeles 2024

Mondo contemporaneo senza magia e senza sovrannaturale. Serve per storie realistiche, drammi urbani, relazioni moderne, carriera, vita quotidiana e contesti sociali credibili ambientati a Los Angeles.

### Fantasy — Amarantia 555

Mondo fantastico high magic in stile fantasy classico. Serve per avventure epiche, regni, ordini magici, creature leggendarie, profezie, guerre dinastiche e sistemi di magia strutturati.

### SciFi — CyberDCC 2375

Futuro distopico cyberpunk del 2375 con lupi mannari cybernetici, BlackMoon Pack Law, Solarton Square, sorveglianza biometrica, neon noir romance, corporate houses, VUA, Sentinels e Douglas-Bloodmoon. Serve per pack politics, identità corporea, controllo corporativo, tecnologia implantare, silver vulnerability, status sociale, famiglie dinastiche, crimine, nightlife e tensioni interspecie.

### Viking — Iceland 827

Ambientazione mythic Viking dark fantasy nell'Islanda/Norvegia vichinga circa 800-900 d.C., centrata su Svartúlfr Clan, Járn-Gildi, Seiðr wards, Name-Truth binding, Hálf-Álfar lineage, Eiriksbarn heir, Iron Keep, Dovre Pass e Amarantia Route. Serve per saghe familiari, faide, oaths runici, sorveglianza magica, politica del ferro, slaver routes, rituali sacrali, dark fantasy norrena e conflitto tra protezione, controllo e agency dell'erede.

### Pirate — London 1666

Ambientazione storico-mercantile e pirata tra Londra e le rotte coloniali, centrata su Merchant House Douglas, Lord Cornelius Vance Douglas, charters, porti, dogane, magazzini, privateers e rivalità commerciali. Serve per commercio marittimo, politica portuale, spionaggio, lettere di marca, accuse di pirateria, conflitti coloniali e l'ambiguità tra legittimità imperiale e ombra privataering.

### Urban — Solarton 2024

Mondo Supernatural/Grimm style con Monster University, demi-human, licantropi e vampiri. Serve per storie urbane soprannaturali ambientate in una bucolica cittadina della California, con focus sulla Supernatural University of Central California, integrazione tra specie, segreti magici e tensioni sociali nascoste.

## Regole di export World

Gli export World sono file MacroCosmo. Devono contenere lore su larga scala, timeline, luoghi, organizzazioni, creature, eventi e conseguenze canoniche. Non devono contenere direzione scena attiva, NPC attivi o logica di opening message.

Ogni lore entry concreta deve includere almeno:

- `id`
- `category`
- `prefix`
- `keywords`
- `priority`
- `importance`
- `source`
- `canonLayer`
- `full`
- `summary`
- `bullet`

Ogni voce lorebook deve includere:

- source da `...`;
- Canon Layer: `[ACTIVE]`, `[HISTORICAL]`, `[CULTURAL]`, `[DEFERRED]`, `[CANDIDATE]`;
- prefix canonico: `WRD`, `LOR`, `LOC`, `ORG`, `BST`, `CAN`.

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

- [SvartulfrVerse_World_Template.js](../../../1_template/SvartulfrVerse_World_Template.js)
- [SvartulfrVerse_Scenario_Template.js](../../../1_template/SvartulfrVerse_Scenario_Template.js)
- [Regole workspace](../../../.trae/rules/rules.md)
- [Architettura template](../../../.trae/rules/07_templates_architecture.md)
- [Requisiti template](../../../.trae/rules/08_template_requirements.md)
- [ASSET_REGISTRY.json](../../../0_assets/ASSET_REGISTRY.json)
