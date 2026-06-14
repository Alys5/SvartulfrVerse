/**
 * SvartulfrVerse World Runtime — Fantasy / Amarantia555 MacroCosmo
 * Source: 1_template/SvartulfrVerse_World_Template.js
 * Domain: MacroCosmo
 * Runtime contract: JanitorAI sandbox-safe ES6, context-only data definition.
 */

if (typeof context === "undefined") {
  return;
}

if (!context.character) {
  return;
}

context.character.personality = typeof context.character.personality === "string" ? context.character.personality : "";
context.character.scenario = typeof context.character.scenario === "string" ? context.character.scenario : "";
context.character.example_dialogs = typeof context.character.example_dialogs === "string" ? context.character.example_dialogs : "";

const sourceBase = "2_Export/World/Fantasy/Amarantia555/";

const loreEntries = [
  {
    id: "wrd_amarantia_core",
    category: "world",
    prefix: "WRD",
    keywords: ["amarantia", "capitale amarantia", "imperial capital", "capitale imperiale", "era della foglia", "edf", "high fantasy", "fantasy branch"],
    priority: 11,
    importance: 10,
    source: `${sourceBase}amarantia_core.md`,
    canonLayer: "ACTIVE",
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
    priority: 10,
    importance: 10,
    source: `${sourceBase}guardiani_amarantia.md`,
    canonLayer: "ACTIVE",
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
    priority: 10,
    importance: 9,
    source: `${sourceBase}amarantia_magic_law.md`,
    canonLayer: "ACTIVE",
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
    priority: 9,
    importance: 9,
    source: `${sourceBase}amarantia_capital.md`,
    canonLayer: "ACTIVE",
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
    priority: 8,
    importance: 8,
    source: `${sourceBase}borgo_acquechete.md`,
    canonLayer: "ACTIVE",
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
    priority: 8,
    importance: 8,
    source: `${sourceBase}porto_amarantia.md`,
    canonLayer: "ACTIVE",
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
    priority: 8,
    importance: 8,
    source: `${sourceBase}emporio_errante.md`,
    canonLayer: "ACTIVE",
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
    priority: 7,
    importance: 7,
    source: `${sourceBase}grand_imperial_road.md`,
    canonLayer: "ACTIVE",
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
    priority: 8,
    importance: 8,
    source: `${sourceBase}felivoni.md`,
    canonLayer: "ACTIVE",
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
    priority: 9,
    importance: 9,
    source: `${sourceBase}crogiolo.md`,
    canonLayer: "ACTIVE",
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
    priority: 8,
    importance: 8,
    source: `${sourceBase}draconic_soulfire.md`,
    canonLayer: "ACTIVE",
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
    priority: 7,
    importance: 7,
    source: `${sourceBase}legacy_flames_of_soul.md`,
    canonLayer: "HISTORICAL",
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
    priority: 6,
    importance: 6,
    source: `${sourceBase}amarantia_polytheism.md`,
    canonLayer: "CULTURAL",
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
    priority: 4,
    importance: 4,
    source: `${sourceBase}legacy_wars.md`,
    canonLayer: "HISTORICAL",
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
    priority: 3,
    importance: 3,
    source: `${sourceBase}candidate_seven_worlds.md`,
    canonLayer: "CANDIDATE",
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
    priority: 5,
    importance: 5,
    source: `${sourceBase}amarantia_route_boundary.md`,
    canonLayer: "CULTURAL",
    full: `[CULTURAL] CAN Source: ${sourceBase}amarantia_route_boundary.md. Amarantia Route in the Viking/Iceland827 branch is a route name, not automatic import of Svartúlfr, Járn-Gildi, Alyssa, Seiðr, or Norse patronage into Amarantia555. Amarantia555 remains the high-fantasy imperial capital unless a user explicitly triggers a crossover.`,
    summary: `[CULTURAL] CAN Amarantia Route is a Viking route name; it does not automatically import Norse lore into Amarantia555.`,
    bullet: [
      "Keep Amarantia555 high-fantasy by default.",
      "Import Iceland827 material only through explicit crossover triggers.",
      "Use this boundary to prevent accidental world bleed."
    ]
  },
  {
    id: "loc_lake_mathisar",
    category: "world",
    prefix: "LOC",
    keywords: ["lake mathisar", "lago mathisar", "mathisar", "eastern amarantia", "mountain lake", "tourist landmark", "furia", "twinxfamily"],
    priority: 9,
    importance: 8,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] LOC Source: ${sourceBase}active.md. Lake Mathisar is a mirror-like mountain lake in eastern Amarantia, south of Furia and near the TwinXFamily border. It is a tourist landmark known for reflections, legends, and quiet pauses outside the capital.`,
    summary: `[ACTIVE] LOC Lake Mathisar is a quiet eastern landmark near Furia and the TwinXFamily border.`,
    bullet: [
      "Use Lake Mathisar for reflection, travel, and local legend.",
      "Keep it as a landmark, not a forced scene destination.",
      "It connects Amarantia to broader route geography."
    ]
  },
  {
    id: "loc_imperial_capital_hill",
    category: "world",
    prefix: "LOC",
    keywords: ["imperial capital hill", "fortress", "seat of power", "hill", "capital hill", "amarantia fortress"],
    priority: 9,
    importance: 8,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] LOC Source: ${sourceBase}active.md. Imperial Capital Hill is the fortified seat of Amarantian power, with the Fortress at its summit. It is the political and ceremonial heart of the capital, distinct from the Borgo, Porto, and Emporio.`,
    summary: `[ACTIVE] LOC Imperial Capital Hill and its Fortress are the seat of Amarantian power.`,
    bullet: [
      "Use the hill for imperial authority and ceremony.",
      "It sits above the city as a political landmark.",
      "Do not confuse it with the commercial Porto or the popular Borgo."
    ]
  },
  {
    id: "org_amarantian_regiments_fleets",
    category: "world",
    prefix: "ORG",
    keywords: ["regiments", "fleets", "imperial regiments", "amarantian military", "military", "navy", "fleet"],
    priority: 8,
    importance: 7,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] ORG Source: ${sourceBase}active.md. Amarantia's military includes regiments and fleets that support the Empire's reach. They are part of the imperial structure, but they are not the central focus of every scene.`,
    summary: `[ACTIVE] ORG Amarantian regiments and fleets support the Empire's military reach.`,
    bullet: [
      "Use regiments and fleets as background institutional texture.",
      "They can explain patrols, escorts, or imperial reach.",
      "Do not make every scene military by default."
    ]
  },
  {
    id: "loc_amarantia_routes_landmarks",
    category: "world",
    prefix: "LOC",
    keywords: ["routes", "landmarks", "amarantia landmarks", "tourist routes", "imperial roads", "pilgrim routes", "trade routes", "lake mathisar", "grand imperial road"],
    priority: 7,
    importance: 7,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] LOC Source: ${sourceBase}active.md. Amarantia's routes and landmarks include the Grand Imperial Road, Lake Mathisar, capital approaches, and lesser paths linking Borgo, Porto, Emporio, and the Imperial Hill. They give travel a lived-in geography without dictating plot beats.`,
    summary: `[ACTIVE] LOC Amarantia's routes and landmarks connect its major districts and tourist sites.`,
    bullet: [
      "Use routes to make the city feel connected to the wider world.",
      "Lake Mathisar is a major waypoint and tourist landmark.",
      "Keep travel details atmospheric rather than prescriptive."
    ]
  },
  {
    id: "wrD_high_fantasy_tone",
    category: "world",
    prefix: "WRD",
    keywords: ["high fantasy tone", "amarantia tone", "fairy-tale", "courtly", "gothic", "romantic", "visual fantasy", "dreamlike"],
    priority: 8,
    importance: 8,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] WRD Source: ${sourceBase}active.md. Amarantia 555 keeps a high-fantasy, courtly, gothic-romantic tone: ornate fabrics, luminous magic, aristocratic etiquette, fairy-tale softness, and emotional intensity. It is vivid and elegant rather than gritty or purely political.`,
    summary: `[ACTIVE] WRD Amarantia 555's tone is high-fantasy, courtly, gothic-romantic, and visually ornate.`,
    bullet: [
      "Prefer elegance, light, fabric, and courtly texture.",
      "Keep emotional intensity without turning every scene into politics.",
      "Use the tone to distinguish Amarantia from CyberDCC2375 or Iceland827."
    ]
  },
  {
    id: "wrD_guardian_disciplines",
    category: "world",
    prefix: "WRD",
    keywords: ["guardian disciplines", "guardiani disciplines", "disciplines", "guardian magic", "magic discipline"],
    priority: 8,
    importance: 7,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] WRD Source: ${sourceBase}active.md. Guardian disciplines are specialized magical practices within the Guardiani tradition. They are not separate factions by default; they are schools, techniques, or vows that shape how a Guardian channels power.`,
    summary: `[ACTIVE] WRD Guardian disciplines are specialized magical practices within the Guardiani tradition.`,
    bullet: [
      "Use disciplines as training or specialization.",
      "They do not automatically create new organizations.",
      "Let them clarify role and method."
    ]
  },
  {
    id: "wrD_guardian_color_coding",
    category: "world",
    prefix: "WRD",
    keywords: ["guardian color coding", "guardian colors", "color coding", "guardian uniforms", "guardiani colors"],
    priority: 7,
    importance: 7,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] WRD Source: ${sourceBase}active.md. Guardian color coding is visual and ceremonial rather than a strict caste system. Colors may mark training, vows, house affiliation, or public role, but they do not override the person's identity.`,
    summary: `[ACTIVE] WRD Guardian color coding is ceremonial and informative, not a rigid caste.`,
    bullet: [
      "Use color as visual shorthand, not destiny.",
      "It can indicate role, training, or affiliation.",
      "Avoid treating color as a rigid social hierarchy."
    ]
  },
  {
    id: "loc_era_della_foglia",
    category: "world",
    prefix: "LOC",
    keywords: ["era della foglia", "leaf era", "foglia", "amarantia district", "leaf district", "botanical era"],
    priority: 6,
    importance: 6,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] LOC Source: ${sourceBase}active.md. Era della Foglia is an Amarantian district or locale associated with foliage, renewal, and softer courtly life. It is a local detail that can color travel or memory without becoming the main plot.`,
    summary: `[ACTIVE] LOC Era della Foglia is a leaf-themed Amarantian locale tied to renewal and courtly softness.`,
    bullet: [
      "Use it as atmosphere, not as a forced destination.",
      "It can suggest renewal, courtly softness, or seasonal memory.",
      "Keep it minor unless explicitly activated."
    ]
  },
  {
    id: "NPC_Kirel",
    category: "world",
    prefix: "NPC",
    keywords: ["kirel", "kirel amarantia", "kirel leaving", "kirel npc", "amarantia npc"],
    priority: 7,
    importance: 7,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] NPC Source: ${sourceBase}active.md. Kirel is an Amarantian NPC whose departure is a known local fact. Mention him only as background context when relevant; do not let his absence replace active scene direction.`,
    summary: `[ACTIVE] NPC Kirel is an Amarantian NPC associated with a known departure.`,
    bullet: [
      "Use Kirel as background texture when relevant.",
      "Do not let his absence dominate the scene.",
      "Keep him distinct from active scene direction."
    ]
  },
  {
    id: "NPC_Nia",
    category: "world",
    prefix: "NPC",
    keywords: ["nia", "nia amarantia", "amarantia npc", "nia npc"],
    priority: 7,
    importance: 7,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] NPC Source: ${sourceBase}active.md. Nia is an Amarantian NPC and local presence. She should remain a named background or supporting figure unless a separate scenario explicitly activates her.`,
    summary: `[ACTIVE] NPC Nia is a named Amarantian NPC and supporting local presence.`,
    bullet: [
      "Use Nia as local texture.",
      "Do not force her into active scene control.",
      "Keep her grounded in Acquechete unless otherwise specified."
    ]
  },
  {
    id: "NPC_Zefiro",
    category: "world",
    prefix: "NPC",
    keywords: ["zefiro", "zephyr", "amarantia npc", "zefiro npc"],
    priority: 7,
    importance: 7,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] NPC Source: ${sourceBase}active.md. Zefiro is an Amarantian NPC name associated with air, movement, and light courtly presence. Treat him as a local named presence unless explicitly activated elsewhere.`,
    summary: `[ACTIVE] NPC Zefiro is a light, air-associated Amarantian NPC.`,
    bullet: [
      "Use Zefiro as atmospheric presence.",
      "Do not turn him into a default scene controller.",
      "Keep him distinct from the felivone of the same name if needed."
    ]
  },
  {
    id: "NPC_Antaneone",
    category: "world",
    prefix: "NPC",
    keywords: ["antaneone", "amarantia npc", "antaneone npc"],
    priority: 6,
    importance: 6,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] NPC Source: ${sourceBase}active.md. Antaneone is an Amarantian NPC or named local figure. Keep him as background texture unless another canon source activates a specific role.`,
    summary: `[ACTIVE] NPC Antaneone is a named Amarantian local figure.`,
    bullet: [
      "Use Antaneone as texture when relevant.",
      "Do not force him into the scene by default.",
      "Keep him distinct from the merchant role unless explicitly needed."
    ]
  },
  {
    id: "NPC_Giordano",
    category: "world",
    prefix: "NPC",
    keywords: ["giordano", "amarantia npc", "giordano npc", "local figure"],
    priority: 6,
    importance: 6,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] NPC Source: ${sourceBase}active.md. Giordano is an Amarantian NPC or local named figure. He is lore texture, not an automatic scene controller.`,
    summary: `[ACTIVE] NPC Giordano is a named Amarantian local figure.`,
    bullet: [
      "Use Giordano as texture when relevant.",
      "Do not assign him a default role.",
      "Keep him background unless activated elsewhere."
    ]
  },
  {
    id: "NPC_Skaren",
    category: "world",
    prefix: "NPC",
    keywords: ["skaren", "amarantia npc", "skaren npc", "local figure"],
    priority: 6,
    importance: 6,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] NPC Source: ${sourceBase}active.md. Skaren is an Amarantian NPC or local named figure. Keep him as background texture unless a scenario explicitly assigns him a role.`,
    summary: `[ACTIVE] NPC Skaren is a named Amarantian local figure.`,
    bullet: [
      "Use Skaren as texture when relevant.",
      "Do not force him into the scene by default.",
      "Keep him distinct from any active role unless specified."
    ]
  },
  {
    id: "NPC_Uomo_Serpente",
    category: "world",
    prefix: "NPC",
    keywords: ["uomo-serpente", "serpent man", "snake man", "amarantia npc", "serpent npc"],
    priority: 5,
    importance: 5,
    source: `${sourceBase}active.md`,
    canonLayer: "ACTIVE",
    full: `[ACTIVE] NPC Source: ${sourceBase}active.md. The Uomo-Serpente is an Amarantian NPC or creature-type reference. Treat it as a minor mythic presence or local figure, not as a default antagonist.`,
    summary: `[ACTIVE] NPC The Uomo-Serpente is a minor mythic Amarantian presence.`,
    bullet: [
      "Use it as a strange local figure or mythic reference.",
      "Do not make it a default antagonist.",
      "Keep it minor unless explicitly activated."
    ]
  },
  {
    id: "def_svartrulfr_jarn_gildi",
    category: "world",
    prefix: "SEC",
    keywords: ["svartúlfr clan", "järn-gildi", "warlord merchant", "deferred", "candidate", "amarantia boundary"],
    priority: 2,
    importance: 4,
    source: `${sourceBase}deferred.md`,
    canonLayer: "DEFERRED",
    full: `[DEFERRED] SEC Source: ${sourceBase}deferred.md. The Svartúlfr Clan and Järn-Gildi Warlord Merchant are deferred/candidate material, not active Amarantia 555 canon. Use only as a boundary or seed when explicitly activated by another system.`,
    summary: `[DEFERRED] SEC Svartúlfr Clan and Järn-Gildi are deferred material, not active Amarantia canon.`,
    bullet: [
      "Do not import them into Amarantia by default.",
      "Use only as boundary or seed material.",
      "Keep them separate from active canon."
    ]
  },
  {
    id: "def_twin_bond",
    category: "world",
    prefix: "REL",
    keywords: ["twin-bond", "twin bond", "twin", "deferred", "candidate", "relationship"],
    priority: 2,
    importance: 4,
    source: `${sourceBase}deferred.md`,
    canonLayer: "DEFERRED",
    full: `[DEFERRED] REL Source: ${sourceBase}deferred.md. Twin-Bond is candidate/deferred relationship material. It is not active Amarantia canon unless explicitly activated by a compatible scenario or authority.`,
    summary: `[DEFERRED] REL Twin-Bond is deferred relationship material, not default Amarantia canon.`,
    bullet: [
      "Do not make it default canon.",
      "Use only when explicitly activated.",
      "Keep it separate from active scene direction."
    ]
  },
  {
    id: "def_secret_seidr_studies",
    category: "world",
    prefix: "SEC",
    keywords: ["secret seiðr studies", "seidr", "secret studies", "deferred", "candidate"],
    priority: 2,
    importance: 4,
    source: `${sourceBase}deferred.md`,
    canonLayer: "DEFERRED",
    full: `[DEFERRED] SEC Source: ${sourceBase}deferred.md. Secret Seiðr Studies are deferred/candidate material. They may inform optional esoteric texture but do not define Amarantia's active magic system.`,
    summary: `[DEFERRED] SEC Secret Seiðr Studies are optional deferred material, not active Amarantian magic.`,
    bullet: [
      "Do not override the active magic system.",
      "Use only as optional esoteric texture.",
      "Keep them separate from active canon."
    ]
  },
  {
    id: "def_archon_angel_patronage",
    category: "world",
    prefix: "SEC",
    keywords: ["archon angel patronage", "archon angel", "patronage", "deferred", "candidate"],
    priority: 2,
    importance: 4,
    source: `${sourceBase}deferred.md`,
    canonLayer: "DEFERRED",
    full: `[DEFERRED] SEC Source: ${sourceBase}deferred.md. Archon Angel Patronage is deferred/candidate material. Do not use it as active Amarantia theology unless explicitly enabled by a compatible canon authority.`,
    summary: `[DEFERRED] SEC Archon Angel Patronage is deferred material, not active Amarantia theology.`,
    bullet: [
      "Do not make it active theology by default.",
      "Use only when explicitly enabled.",
      "Keep it separate from Amarantia's active system."
    ]
  },
  {
    id: "def_alyssa_eiriksbarn",
    category: "world",
    prefix: "NPC",
    keywords: ["alyssa eiriksbarn", "dev persona", "test persona", "deferred", "candidate", "eiriksbarn"],
    priority: 1,
    importance: 3,
    source: `${sourceBase}deferred.md`,
    canonLayer: "DEFERRED",
    full: `[DEFERRED] NPC Source: ${sourceBase}deferred.md. Alyssa Eiriksbarn is a dev/test or candidate persona reference, not active Amarantia canon. Do not import her as an NPC unless a scenario explicitly activates that identity.`,
    summary: `[DEFERRED] NPC Alyssa Eiriksbarn is deferred dev/test persona material, not active Amarantia canon.`,
    bullet: [
      "Do not import her as default NPC.",
      "Keep her as dev/test material only.",
      "Use only when explicitly activated."
    ]
  },
  {
    id: "def_archon_angel_angel_moreno",
    category: "world",
    prefix: "NPC",
    keywords: ["archon angel", "angel moreno", "deferred", "candidate", "npc"],
    priority: 1,
    importance: 3,
    source: `${sourceBase}deferred.md`,
    canonLayer: "DEFERRED",
    full: `[DEFERRED] NPC Source: ${sourceBase}deferred.md. Archon Angel / Angel Moreno is deferred candidate material, not active Amarantia canon. Keep separate from the Angel Moreno of CyberDCC2375 unless explicitly bridged by a higher authority.`,
    summary: `[DEFERRED] NPC Archon Angel / Angel Moreno is deferred candidate material.`,
    bullet: [
      "Do not merge with CyberDCC2375 Angel Moreno by default.",
      "Keep separate from active Amarantia canon.",
      "Use only with explicit bridge authority."
    ]
  },
  {
    id: "def_sol",
    category: "world",
    prefix: "SEC",
    keywords: ["sól", "sol", "deferred", "candidate", "sun"],
    priority: 1,
    importance: 3,
    source: `${sourceBase}deferred.md`,
    canonLayer: "DEFERRED",
    full: `[DEFERRED] SEC Source: ${sourceBase}deferred.md. Sól is deferred/candidate material and is not active Amarantia theology or cosmology by default.`,
    summary: `[DEFERRED] SEC Sól is deferred material, not active Amarantian cosmology.`,
    bullet: [
      "Do not import as active theology.",
      "Keep separate from Amarantia canon.",
      "Use only when explicitly activated."
    ]
  },
  {
    id: "def_scrivenstone",
    category: "world",
    prefix: "LOC",
    keywords: ["scrivenstone", "deferred", "candidate", "stone", "location"],
    priority: 1,
    importance: 3,
    source: `${sourceBase}deferred.md`,
    canonLayer: "DEFERRED",
    full: `[DEFERRED] LOC Source: ${sourceBase}deferred.md. Scrivenstone is deferred/candidate material. It is not an active Amarantian landmark unless explicitly activated by another system.`,
    summary: `[DEFERRED] LOC Scrivenstone is deferred candidate material, not active Amarantia.`,
    bullet: [
      "Do not make it an active landmark by default.",
      "Use only when explicitly activated.",
      "Keep separate from Amarantia canon."
    ]
  },
  {
    id: "def_rune_tether",
    category: "world",
    prefix: "SEC",
    keywords: ["rune-tether", "rune tether", "deferred", "candidate", "rune"],
    priority: 1,
    importance: 3,
    source: `${sourceBase}deferred.md`,
    canonLayer: "DEFERRED",
    full: `[DEFERRED] SEC Source: ${sourceBase}deferred.md. Rune-Tether is deferred/candidate material. It is not part of Amarantia's active magic system unless explicitly enabled by a compatible authority.`,
    summary: `[DEFERRED] SEC Rune-Tether is deferred material, not active Amarantian magic.`,
    bullet: [
      "Do not override Amarantian magic.",
      "Use only when explicitly enabled.",
      "Keep separate from active canon."
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

function appendFieldIfMissing(field, text) {
  if (!text || !context.character || typeof context.character[field] !== "string") {
    return;
  }
  if (context.character[field].indexOf(text) === -1) {
    context.character[field] += text;
  }
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countMentions(keywords, text) {
  var count = 0;
  keywords.forEach(function(keyword) {
    var pattern = new RegExp("\\b" + escapeRegExp(keyword) + "\\b", "i");
    if (pattern.test(text)) {
      count += 1;
    }
  });
  return count;
}

function getRecentText() {
  var parts = [];
  if (context.chat && context.chat.last_message) {
    parts.push(context.chat.last_message);
  }
  if (context.chat && context.chat.last_messages && context.chat.last_messages.length) {
    parts = parts.concat(context.chat.last_messages.slice(-6).map(function(message) {
      return message.message || message.text || message;
    }));
  }
  return parts.join(" ").toLowerCase();
}

function isAllowedLayer(layer) {
  return layer === "ACTIVE" || layer === "HISTORICAL" || layer === "CULTURAL";
}

function applyWorldLore() {
  if (!context || !context.character) {
    return;
  }

  var recent = getRecentText();
  var selected = loreEntries.filter(function(entry) {
    return isAllowedLayer(entry.canonLayer) && countMentions(entry.keywords, recent) > 0;
  }).sort(function(a, b) {
    return (b.priority || 0) - (a.priority || 0);
  }).slice(0, 12);

  if (!selected.length) {
    return;
  }

  var loreBlock = selected.map(function(entry) {
    var detail = Array.isArray(entry.bullet) ? entry.bullet.join(" ") : String(entry.bullet || "");
    return entry.prefix + " " + entry.id + " " + entry.summary + " " + detail;
  }).join("\n");

  appendFieldIfMissing("personality", "\nAmarantia555 active lore: " + loreBlock);
  appendFieldIfMissing("scenario", "\nAmarantia555 world texture: " + selected.map(function(entry) {
    return entry.summary;
  }).join(" | "));
}

applyWorldLore();
