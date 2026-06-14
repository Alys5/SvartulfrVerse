/**
 * SvartulfrVerse World Runtime — Fantasy / Amarantia555 MacroCosmo
 * Source: 1_template/SvartulfrVerse_World_Template.js
 * Domain: MacroCosmo
 * Runtime contract: JanitorAI sandbox-safe ES6, context-only data definition.
 */

const sourceBase = "2_Export/World/Fantasy/Amarantia555/";

const loreEntries = [
  {
    id: "wrd_amarantia_core",
    category: "world",
    prefix: "WRD",
    keywords: ["amarantia", "capitale amarantia", "imperial capital", "capitale imperiale", "era della foglia", "edf", "high fantasy", "fantasy branch"],
    priority: 100,
    importance: 10,
    source: `${sourceBase}amarantia_core.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] WRD Source: ${sourceBase}amarantia_core.md. Amarantia555 is the Fantasy branch's imperial high-magic capital: a terraced city of sacred water, ancient stone, amber glass, obsidian towers, guild halls, and imperial roads. The active era is Era della Foglia 127 EDF. Use Amarantia as the standard name; Amaranta is a variant or old form, not a separate city.`,
    summary: `[ACTIVE] WRD Amarantia555 is the imperial high-magic capital of the Fantasy branch, Era della Foglia 127 EDF.`,
    bullet: [
      "Amarantia is the political and religious center of the empire.",
      "The city is built on terraces, gates, markets, ports, and guarded roads.",
      "Keep the tone epic, urban, magical, and morally ambiguous."
    ]
  },
  {
    id: "org_guardiani_amarantia",
    category: "world",
    prefix: "ORG",
    keywords: ["guardiani", "guardiani di amarantia", "guardiano", "guardiana", "primo guardiano", "giordano aragoni", "skaren doranar", "novizi", "sigillo guardiano"],
    priority: 95,
    importance: 10,
    source: `${sourceBase}guardiani_amarantia.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] ORG Source: ${sourceBase}guardiani_amarantia.md. The Guardiani di Amarantia are the empire's military, legal, and magical authority. They regulate magic, recruit the powerful at the age-fifteen potential exam, patrol gates and roads, and answer through Primi Guardiani. The Emperor is elected every 100 years from among the Primi Guardiani of the cities, so popular legitimacy and Guardian control coexist. Official disciplines are Guaritori in green, Alchimisti in purple, Guerrieri in red, and novizi in brown.`,
    summary: `[ACTIVE] ORG The Guardiani are Amarantia's regulated magic-law authority, with green healers, purple alchemists, red warriors, and brown novices.`,
    bullet: [
      "Guardiani enforce magical law and public order.",
      "Primi Guardiani select the imperial candidate every century.",
      "Treat Guardian authority as protective but coercive."
    ]
  },
  {
    id: "wrD_amarantia_magic_law",
    category: "world",
    prefix: "WRD",
    keywords: ["magia", "magia regolata", "esame del potenziale", "potenziale a quindici", "luce", "levitazione", "barriera", "corporazione", "terre alleate"],
    priority: 90,
    importance: 9,
    source: `${sourceBase}amarantia_magic_law.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] WRD Source: ${sourceBase}amarantia_magic_law.md. Magic is common in Amarantia but regulated by the Guardiani. Most humanoids and comparable minds can use basic spells such as Luce, Levitazione, and Barriera. At 15, citizens are tested for potential; strong talent draws Guardian attention. The core magical laws forbid harming others except in defense of the Allied Lands, require obedience to the Guardian corporation, service to one's sovereign, and rejection of corrupt or evil magic.`,
    summary: `[ACTIVE] WRD Amarantian magic is common, regulated, tested at 15, and supervised by the Guardiani.`,
    bullet: [
      "Basic spells include Luce, Levitazione, and Barriera.",
      "The potential exam is a rite of passage and recruitment gate.",
      "Unregulated magic creates legal and social consequences."
    ]
  },
  {
    id: "loc_amarantia_capital",
    category: "world",
    prefix: "LOC",
    keywords: ["amarantia city", "citta di amarantia", "città di amarantia", "porte di amarantia", "porta est", "porta ovest", "torri d'ossidiana", "vetro ambrato", "acqua sacra"],
    priority: 85,
    importance: 9,
    source: `${sourceBase}amarantia_capital.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] LOC Source: ${sourceBase}amarantia_capital.md. Amarantia's capital is a terraced high-fantasy city of sacred water, ancient stone, amber glass, obsidian towers, guild halls, markets, gates, and imperial roads. East and West Gates control movement; patrols, seals, and road tolls make the city feel alive and governed.`,
    summary: `[ACTIVE] LOC Amarantia is a terraced imperial city of sacred water, amber glass, obsidian towers, gates, and guarded roads.`,
    bullet: [
      "Use terraces, gates, and vertical streets for city scenes.",
      "The East and West Gates are controlled checkpoints.",
      "The visual DNA is warm amber light against deep obsidian shadow."
    ]
  },
  {
    id: "loc_borgo_acquechete",
    category: "world",
    prefix: "LOC",
    keywords: ["borgo di acquechete", "acquechete", "acque chete", "quartiere popolare", "borgo popolare", "nia", "fratelli di nia"],
    priority: 80,
    importance: 8,
    source: `${sourceBase}borgo_acquechete.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] LOC Source: ${sourceBase}borgo_acquechete.md. Borgo di Acquechete is Amarantia's poorer waterside quarter: cramped homes, wet stone, debts, errands, patrols, and family pressure. It is where survival often matters more than imperial law, and where Nia's household burdens are most visible.`,
    summary: `[ACTIVE] LOC Borgo di Acquechete is the poor waterside quarter where survival, debt, patrols, and family duty collide.`,
    bullet: [
      "Use Acquechete for poverty, family duty, and social pressure.",
      "Guardian law feels distant but dangerous here.",
      "Keep the tone grounded, damp, crowded, and human."
    ]
  },
  {
    id: "loc_porto_amarantia",
    category: "world",
    prefix: "LOC",
    keywords: ["porto di amarantia", "porto", "docks", "banchine", "carovane", "contrabbando", "mercato", "kirel"],
    priority: 80,
    importance: 8,
    source: `${sourceBase}porto_amarantia.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] LOC Source: ${sourceBase}porto_amarantia.md. The Porto di Amarantia is the city's commercial lung: docks, fish, sailors, caravans, markets, debt, theft, rumors, and hidden patrons. Kirel belongs to this world as a clever street survivor before prophecy drags him into larger forces.`,
    summary: `[ACTIVE] LOC The Porto is Amarantia's noisy commercial dock district, full of caravans, rumors, debt, and hidden danger.`,
    bullet: [
      "Use the Porto for theft, trade, rumors, and first signs of prophecy.",
      "Caravans and docks connect Amarantia to the Grand Imperial Road.",
      "The area is lively by day and risky by night."
    ]
  },
  {
    id: "loc_emporio_errante",
    category: "world",
    prefix: "LOC",
    keywords: ["emporio errante", "antaneone", "mercante di meraviglie", "golem", "negozio", "carrozzone"],
    priority: 75,
    importance: 8,
    source: `${sourceBase}emporio_errante.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] LOC Source: ${sourceBase}emporio_errante.md. Antaneone's Emporio Errante is a market stall and mobile caravan of wonders: odd tools, storm golems, shadowed contracts, and impossible wares. It is both a shop and a cover for forbidden movement, occult debt, and escape routes.`,
    summary: `[ACTIVE] LOC Antaneone's Emporio Errante is a wonder-shop and caravan front for occult bargains and escape routes.`,
    bullet: [
      "Use the Emporio for bargains, strange items, and Antaneone's ambiguity.",
      "Its wares should feel wondrous, risky, and never free.",
      "Treat the caravan as a possible vehicle or hideout."
    ]
  },
  {
    id: "loc_grand_imperial_road",
    category: "world",
    prefix: "LOC",
    keywords: ["grand imperial road", "strada imperiale", "via imperiale", "lake mathisar", "lago mathisar", "rotta verso sud", "carovana"],
    priority: 70,
    importance: 7,
    source: `${sourceBase}grand_imperial_road.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] LOC Source: ${sourceBase}grand_imperial_road.md. The Grand Imperial Road is the main artery out of Amarantia, linking gates, patrols, caravans, Lake Mathisar, and southern routes. Leaving the city by this road turns the story from urban intrigue into a campaign of travel, pursuit, and consequence.`,
    summary: `[ACTIVE] LOC The Grand Imperial Road connects Amarantia to Lake Mathisar, caravans, patrols, and southern campaign routes.`,
    bullet: [
      "Use the road for travel choices, patrol encounters, and caravan politics.",
      "Lake Mathisar is a major waypoint and pressure point.",
      "The south is unknown, tempting, and dangerous."
    ]
  },
  {
    id: "fam_felivoni",
    category: "world",
    prefix: "FAM",
    keywords: ["felivone", "felivoni", "zefiro", "famiglio", "creatura magica", "vedere la magia"],
    priority: 75,
    importance: 8,
    source: `${sourceBase}felivoni.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] FAM Source: ${sourceBase}felivoni.md. Felivoni are magical catlike creatures or spirits that can perceive magic as visible traces. Zefiro, Skaren's felivone, is a feathered indigo guide with a taste for milk and a role as protector and omen-reader.`,
    summary: `[ACTIVE] FAM Felivoni are magical catlike beings that see magic; Zefiro is the feathered indigo protector-guide.`,
    bullet: [
      "Felivoni can make hidden magic visible.",
      "Zefiro blends charm, warning, and practical advice.",
      "Treat him as more than a pet: he is a guardian familiar."
    ]
  },
  {
    id: "org_crogiolo",
    category: "world",
    prefix: "ORG",
    keywords: ["crogiolo", "uomo-serpente", "uomo serpente", "debito occulto", "contratto", "bargain", "patto"],
    priority: 85,
    importance: 9,
    source: `${sourceBase}crogiolo.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] ORG Source: ${sourceBase}crogiolo.md. The Crogiolo is an occult network of debts, bargains, and hidden agents. Its serpent-masked envoys pressure Antaneone and seek Kirel because of his uncontrolled draconic inheritance. It prefers leverage, contracts, and manipulation over open war.`,
    summary: `[ACTIVE] ORG The Crogiolo is an occult debt network seeking Kirel through bargains, pressure, and serpent-masked agents.`,
    bullet: [
      "The Crogiolo uses contracts, favors, and fear.",
      "Its agents can be polite, patient, and terrifying.",
      "Do not reveal its full hierarchy unless the scene earns it."
    ]
  },
  {
    id: "lor_draconic_soulfire",
    category: "world",
    prefix: "LOR",
    keywords: ["figlio dei draghi", "anima ardente", "profezia", "discendenza draconica", "skaren", "anime ardenti", "anima ardente"],
    priority: 80,
    importance: 8,
    source: `${sourceBase}draconic_soulfire.md`,
    canonLayer: "[ACTIVE]",
    full: `[ACTIVE] LOR Source: ${sourceBase}draconic_soulfire.md. Draconic soulfire is a rare inheritance tied to prophecy, fire, and destiny. Skaren Doranar recognizes it before most people understand it. For Kirel, it begins as uncontrolled fire at his feet and becomes a political, spiritual, and moral burden.`,
    summary: `[ACTIVE] LOR Draconic soulfire is a rare prophetic inheritance tied to fire, destiny, and Skaren's warnings.`,
    bullet: [
      "Treat draconic inheritance as destiny, not a public fact.",
      "Skaren knows more than she says.",
      "The Crogiolo and Guardiani may interpret the prophecy differently."
    ]
  },
  {
    id: "lor_flames_of_soul_legacy",
    category: "world",
    prefix: "LOR",
    keywords: ["fiamme dell'anima", "racconto legacy", "legacy narrative", "kirel nia antaneone zefiro", "fuoco dai piedi"],
    priority: 65,
    importance: 7,
    source: `${sourceBase}legacy_flames_of_soul.md`,
    canonLayer: "[HISTORICAL]",
    full: `[HISTORICAL] LOR Source: ${sourceBase}legacy_flames_of_soul.md. Le Fiamme dell'Anima is the legacy narrative root for Amarantia555: Kirel's fire, Nia's family burden, Antaneone's debt, Zefiro's protection, and the escape from Amarantia toward the south. Use it as a mythic continuity layer, not as a permanent scene state.`,
    summary: `[HISTORICAL] LOR Le Fiamme dell'Anima is the legacy narrative root for Kirel, Nia, Antaneone, Zefiro, and the southern escape.`,
    bullet: [
      "Use the legacy narrative as continuity, not a lore dump.",
      "The southern escape is an opening direction, not a forced scene.",
      "Let current play decide which legacy beats remain active."
    ]
  },
  {
    id: "lor_amarantia_polytheism",
    category: "world",
    prefix: "LOR",
    keywords: ["politeismo", "dei amarantiani", "religione amarantiana", "sacro", "rito", "temple"],
    priority: 55,
    importance: 6,
    source: `${sourceBase}amarantia_polytheism.md`,
    canonLayer: "[CULTURAL]",
    full: `[CULTURAL] LOR Source: ${sourceBase}amarantia_polytheism.md. Amarantia has a polytheistic religious culture expressed through sacred water, civic rites, temple customs, and oath language. No fixed pantheon is required for active play unless a later source defines specific gods.`,
    summary: `[CULTURAL] LOR Amarantia has a polytheistic civic religion without a required active pantheon yet.`,
    bullet: [
      "Use rites, oaths, and sacred water to texture scenes.",
      "Avoid inventing a full pantheon unless needed.",
      "Religion supports culture more than plot."
    ]
  },
  {
    id: "lor_legacy_wars",
    category: "world",
    prefix: "LOR",
    keywords: ["ardudian conquest", "rezgian campaign", "galyean war", "alran rebellion", "mornmothian crusade", "lalerean war", "lithandian campaign", "guerre storiche"],
    priority: 35,
    importance: 4,
    source: `${sourceBase}legacy_wars.md`,
    canonLayer: "[HISTORICAL]",
    full: `[HISTORICAL] LOR Source: ${sourceBase}legacy_wars.md. Legacy classifications name old conflicts such as Ardudian Conquest, Rezgian Campaign, Galyean War, Alran Rebellion, Mornmothian Crusade, Lalerean War, Alran Campaign, and Lithandian Campaign. Until dates, factions, outcomes, and consequences are defined, treat them as historical names and rumor hooks only.`,
    summary: `[HISTORICAL] LOR Old war names are rumor hooks until their dates, factions, and consequences are defined.`,
    bullet: [
      "Use old war names as rumors, banners, scars, or family memory.",
      "Do not invent decisive outcomes without a new source.",
      "Historical uncertainty is better than false precision."
    ]
  },
  {
    id: "can_seven_worlds",
    category: "world",
    prefix: "CAN",
    keywords: ["sette mondi", "i sette mondi", "seven worlds", "antaneone sette mondi", "cosmologia"],
    priority: 20,
    importance: 3,
    source: `${sourceBase}candidate_seven_worlds.md`,
    canonLayer: "[CANDIDATE]",
    full: `[CANDIDATE] CAN Source: ${sourceBase}candidate_seven_worlds.md. Antaneone's 'seven worlds' are a candidate cosmological motif from legacy notes. Do not treat them as active Amarantia555 cosmology unless explicitly promoted by a later canon decision.`,
    summary: `[CANDIDATE] CAN Antaneone's seven worlds are an unconfirmed cosmological motif, not active canon yet.`,
    bullet: [
      "Use as rumor, metaphor, or Antaneone's odd speech only.",
      "Do not define seven active planes.",
      "Promote only through an explicit canon decision."
    ]
  },
  {
    id: "can_amarantia_route_boundary",
    category: "world",
    prefix: "CAN",
    keywords: ["amarantia route", "ruta amarantia", "confine viking", "iceland827", "járn-gildi", "svartúlfr", "crossover"],
    priority: 45,
    importance: 5,
    source: `${sourceBase}amarantia_route_boundary.md`,
    canonLayer: "[CULTURAL]",
    full: `[CULTURAL] CAN Source: ${sourceBase}amarantia_route_boundary.md. Amarantia Route in the Viking/Iceland827 branch is a route name, not automatic import of Svartúlfr, Járn-Gildi, Alyssa, Seiðr, or Norse patronage into Amarantia555. Amarantia555 remains the high-fantasy imperial capital unless a user explicitly triggers a crossover.`,
    summary: `[CULTURAL] CAN Amarantia Route is a Viking route name; it does not automatically import Norse lore into Amarantia555.`,
    bullet: [
      "Keep Amarantia555 high-fantasy by default.",
      "Import Iceland827 material only through explicit crossover triggers.",
      "Use this boundary to prevent accidental world bleed."
    ]
  }
];

const loreLanes = {
  world: {
    name: "Amarantia555 MacroCosmo",
    description: "World, location, organization, magic, history, culture, and candidate cosmology for Amarantia555.",
    keywords: ["amarantia", "guardiani", "magia", "porto", "acquechete", "crogiolo", "felivoni", "era della foglia", "grand imperial road"],
    categories: ["world"],
    entries: loreEntries
  },
  character: {
    name: "Amarantia555 People and Relationships",
    description: "Character-facing lore that may be pulled into scenario runtime when relevant.",
    keywords: ["kirel", "nia", "zefiro", "antaneone", "skaren", "giordano", "crogiolo", "felivone"],
    categories: ["world"],
    entries: loreEntries
  },
  scene: {
    name: "Amarantia555 Scene Anchors",
    description: "Locations and pressures that can shape active scenes without forcing a fixed opening.",
    keywords: ["porto di amarantia", "borgo di acquechete", "emporio errante", "grand imperial road", "lake mathisar", "porta est", "porta ovest"],
    categories: ["world"],
    entries: loreEntries
  },
  debug: {
    name: "Amarantia555 Debug",
    description: "Debug-only lane for checking source and canon-layer coverage.",
    keywords: ["amarantia555 debug", "source", "canon layer"],
    categories: ["world"],
    entries: loreEntries
  }
};

const scenarioData = {
  activeEra: "Era della Foglia 127 EDF",
  defaultBoundary: "Amarantia555 is high-fantasy by default; Iceland827, TwinXFamily, and CyberDCC2375 do not import automatically.",
  sourceBase
};
