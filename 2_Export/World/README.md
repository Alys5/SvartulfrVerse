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

Il caso [Modern/TwinXFamily](Modern/TwinXFamily/) è un MicroCosmo specifico sotto Modern, non un World MacroCosmo generico.

## Scopo dei mondi

### Modern — Los Angeles 2024

Mondo contemporaneo senza magia e senza sovrannaturale. Serve per storie realistiche, drammi urbani, relazioni moderne, carriera, vita quotidiana e contesti sociali credibili ambientati a Los Angeles.

### Fantasy — Amarantia 555

Mondo fantastico high magic in stile fantasy classico. Serve per avventure epiche, regni, ordini magici, creature leggendarie, profezie, guerre dinastiche e sistemi di magia strutturati.

### SciFi — DCC 2375

Futuro prossimo altamente distopico, high tech, senza magia. Include demi-human e alieni. Serve per cyberpunk, controllo corporativo, colonie, intelligenze artificiali, disuguaglianze sociali, biotecnologie e tensioni interspecie.

### Viking — Iceland 827

Ambientazione storico-mitologica nell'Islanda vichinga, dove miti e dei norreni sono reali. Serve per saghe familiari, esplorazioni, faide, rituali, onore, destino e interventi diretti del pantheon norreno.

### Pirate — London 1666

Ambientazione storico-piratesca tra Londra e le coste delle colonie americane, lungo le rotte di una compagnia navale mercantile. Serve per intrighi di corte, commercio marittimo, pirateria, spionaggio, alleanze politiche e conflitti coloniali.

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
