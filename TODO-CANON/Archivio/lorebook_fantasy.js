/**
 * Fantasy Scenario Lorebook
 * Based on the lightweight lorebook template
 */

const messageCount = context.chat.message_count || 0;
const lastMessage = (context.chat.last_message || "").toLowerCase();

if (typeof context.character.personality !== "string") context.character.personality = "";
if (typeof context.character.scenario !== "string") context.character.scenario = "";

function appendTraits(personalityText, scenarioText) {
    if (personalityText) context.character.personality += personalityText;
    if (scenarioText) context.character.scenario += scenarioText;
}

function passFilters(entry) {
    const filters = entry.filters;
    if (!filters) return true;
    if (filters.notWith && filters.notWith.some((w) => lastMessage.includes(w))) return false;
    if (filters.requiresAny && !filters.requiresAny.some((w) => lastMessage.includes(w))) return false;
    if (filters.requiresAll && !filters.requiresAll.every((w) => lastMessage.includes(w))) return false;
    return true;
}

function canActivate(entry) {
    if (messageCount < entry.minMessages) return false;
    if (!passFilters(entry)) return false;
    if (typeof entry.probability === "number") {
        const normalizedProbability = entry.probability > 1 ? entry.probability / 100 : entry.probability;
        if (Math.random() > normalizedProbability) return false;
    }
    return true;
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasKeywordMatch(entry, message) {
    if (entry.constant) return true;
    if (!entry.keywords || entry.keywords.length === 0) return false;

    if (entry.matchWholeWords) {
        for (let i = 0; i < entry.keywords.length; i++) {
            const keyword = entry.keywords[i];
            const pattern = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i");
            if (pattern.test(message)) return true;
        }
        return false;
    }

    return entry.keywords.some((k) => message.includes(k));
}

const keywordStopwords = new Set([
    "the", "a", "an", "mr", "mrs", "ms", "sir", "madam"
]);

function normalizeKeyword(keyword) {
    return String(keyword || "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeKeywords(keywords) {
    if (!Array.isArray(keywords)) return [];

    const deduped = new Map();
    for (let i = 0; i < keywords.length; i++) {
        const normalized = normalizeKeyword(keywords[i]);
        if (!normalized) continue;
        if (keywordStopwords.has(normalized)) continue;
        if (!deduped.has(normalized)) deduped.set(normalized, normalized);
    }

    return Array.from(deduped.values()).sort((a, b) => a.localeCompare(b));
}

// ----------------------------------------------------------------------
// 1. DYNAMIC RELATIONSHIP BASE 
// ----------------------------------------------------------------------
if (messageCount < 5) {
    appendTraits(", extremely vigilant", " The heavy Vanguard surveillance and Seidr wards press down oppressively.");
} else if (messageCount < 15) {
    appendTraits(", testing the iron cage", " Slowly finding breathing room within the clan's extreme protection.");
} else {
    appendTraits(", entrenched in the clan", " The suffocating devotion of the Svartúlfr Empire dictates every move.");
}

// ----------------------------------------------------------------------
// 2. LORE ENTRIES DICTIONARY
// ----------------------------------------------------------------------
const loreEntries = [
    {
        keywords: ["setting", "craesos", "aulderwood", "svartulfr", "empire", "iron guild", "mythic age"],
        constant: true,
        priority: 100,
        minMessages: 0,
        category: "setting",
        probability: 100,
        scenario: " <setting>The Mythic Age of Craesos. The Svartúlfr Trade Empire (Iron Guild) operates with ruthless mercantile capitalism backed by ancient primal magic in the Aulderwood. {{user}} is the 'White Moon', a rare Half-Elf Mana Conduit and youngest daughter of Jarl Erik. Following a traumatic capture by the Flesh Traders, her towering, wolf-blooded family locks her down in an impenetrable shield of iron and Seidr wards.</setting>"
    },
    {
        keywords: ["wards", "seidr", "aura", "extraction"],
        priority: 105,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>Seidr wards monitor {{user}}'s starlight aura constantly. Fluctuations trigger Guild Vanguard extraction—an immediate, overwhelming physical intervention.</mechanic>"
    },
    {
        keywords: ["malachia", "malachia douglas-auldervae", "eldest", "fenris", "the wall", "vanguard"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Malachia Douglas-Auldervae: 28yo, 208cm Half-Elf. The Wall. Commander of Guild Security. Massive blackened plate armor, brute force fighter. Stoic, lethal enforcer, deeply intimidating. Shows love entirely through physical shielding and elven fury against threats.]"
    },
    {
        keywords: ["noah", "noah douglas-auldervae", "middle brother", "velvet glove", "nono", "blondie", "diplomat"],
        matchWholeWords: true,
        priority: 111,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Noah Douglas-Auldervae: 25yo, 196cm Half-Elf. The Velvet Glove. Guild Diplomat and Spymaster. Lithe, elegant arrogance, master mind-manipulator. Ruthlessly spoils {{user}} with luxury but is unnervingly cold and calculating to enemies.]"
    },
    {
        keywords: ["jasper", "jasper douglas-auldervae", "twin brother", "jaz", "jd", "the vanguard", "scout"],
        matchWholeWords: true,
        priority: 112,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Jasper Douglas-Auldervae: 20yo, 191cm Half-Elf. The Vanguard Scout. Chaotic good, fast and rebellious. Shares an empathic Twin Soulbond with {{user}}. Sabotages family wards to give {{user}} brief moments of freedom.]"
    },
    {
        keywords: ["wulfnic", "aelwulf", "aulder-vae", "grandfather", "ancient one", "apex"],
        matchWholeWords: true,
        priority: 113,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Aelwulf Aulder-Vae (Wulfnic): Primeval High Wood Elf, 226cm. Guardian of the Aulderwood. Terrifying ancient demigod. Demands absolute submission from others but is gentle and indulgent only toward {{user}}.]"
    },
    {
        keywords: ["erik", "erik douglas", "father", "tyrant", "jarl", "patriarch", "iron guild"],
        matchWholeWords: true,
        priority: 114,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Erik Douglas: 50yo, 205cm Human. The Tyrant Jarl. Master of the Iron Guild. Paranoiac helicopter parent, traumatized by his elven mate's death. Enforces draconian lockdowns and 24/7 Vanguard details around {{user}}.]"
    },
    {
        keywords: ["logan", "logan douglas", "uncle", "corsair", "fleet master", "lo"],
        matchWholeWords: true,
        priority: 115,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Logan Douglas: 47yo, 198cm Human. The Corsair Uncle. Rugged Fleet Master and smuggler. Chill, anti-authoritarian safe haven who secretly smuggles magical reagents for {{user}}.]"
    },
    {
        keywords: ["marcus", "marcus thornfield", "shield-brother"],
        matchWholeWords: true,
        priority: 116,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Marcus Thornfield: Lead Shield-Brother. Incorruptible, terrifyingly efficient Vanguard assigned as 24/7 watchdog. His cold iron armor makes {{user}} uneasy.]"
    },
    {
        keywords: ["angel", "angel moreno", "corrupt high-elf"],
        matchWholeWords: true,
        priority: 117,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Angel Moreno: Corrupt High-Elf Noble, secret patron of Flesh Traders. Covets {{user}}'s mana pool.]"
    },
    {
        keywords: ["scarlett", "scarlett dhovia", "rogue"],
        matchWholeWords: true,
        priority: 118,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Scarlett Dhovia: Chaotic good rogue, Jasper's lover, fiercely protects {{user}}'s freedom and smuggles enchantments.]"
    },
    {
        keywords: ["gray", "romeo", "romeo dean", "slaver", "toxic ex"],
        matchWholeWords: true,
        priority: 119,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Romeo 'Gray' Dean: Toxic slaver mercenary, abusive ex who caused {{user}}'s PTSD. Primary stalker threat and enemy of the clan.]"
    },
    {
        keywords: ["maddox", "rifle maddox", "flesh traders"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Rifle Maddox: Warlord of the Flesh Traders slaver syndicate. Wants to use {{user}} as magical leverage.]"
    },
    {
        keywords: ["drutha", "tanner", "leather worker", "steeltooth"],
        priority: 121,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Drutha: Half-Orc, Half-Troll tanner for Clan Steeltooth. Kidnapped and sold to Flesh Traders by a treacherous lover.]"
    },
    {
        keywords: ["bulkrag", "bulkrag mountains"],
        priority: 122,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Bulkrag Mountains: Pine forests, snowcapped peaks, bitingly cold winters. Home to the Orc clans of Craesos. Long continuous mountain range along the western edge of Craesos.</location>"
    },
    {
        keywords: ["chain haven", "gray wastes", "flesh traders"],
        priority: 123,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Chain Haven: Lawless town on the edge of Gray Wastes. Main base for the Flesh Traders slaver syndicate.</location>"
    },
    {
        keywords: ["trolls", "troll sweat"],
        priority: 124,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario: " <species>Trolls: Pale to pinkish, stronger than orcs. Prized on the black market; their sweat is a potent aphrodisiac/perfume.</species>"
    },
    {
        keywords: ["lysanthir", "king lysanthir", "crystalbough", "crystal wood"],
        priority: 125,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [King Lysanthir Crystalbough: Ancient Wood Elf monarch of the Crystal Wood. Refined, composed, fiercely loyal and deeply obsessive/romantic beneath the surface.]"
    },
    {
        keywords: ["ilthuryn", "prince ilthuryn", "crystalbough"],
        priority: 126,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Prince Ilthuryn Crystalbough: Charming, cultured, free-spirited younger brother of King Lysanthir. Avoids serious commitments but loves his family.]"
    },
    {
        keywords: ["elanil", "queen elanil"],
        priority: 127,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Queen Elanil Crystalbough: Former Queen of Crystal Wood, Iliphar's first wife. Composed, graceful advisor who refused to let her broken marriage define her.]"
    },
    {
        keywords: ["iliphar", "crystalbough", "former king"],
        priority: 128,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Former King Iliphar Crystalbough: Charismatic, romantic former ruler who abdicated after scandalously finding a mate bond later in life.]"
    },
    {
        keywords: ["gwendolyn"],
        priority: 129,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Gwendolyn: Lesser noble and mate of Iliphar. Vibrant, flirtatious, embraces luxury and visible romance with complete sincerity.]"
    },
    {
        keywords: ["palace of endless facets", "crystal wood", "dark mountains", "crystal caverns"],
        priority: 130,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Palace of Endless Facets: Royal residence in the Crystal Wood (Dark Mountains). A breathtaking palace of luminous stone, gold, and vibrant crystals where eternal spring reigns.</location>"
    },
    {
        keywords: ["malzog", "malzog skullkeeper", "chieftain", "clan skullkeeper"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Malzog Skullkeeper: 30yo Chieftain of Clan Skullkeeper in the Bulkrag Mountains. Youngest ruling Orc leader, earned authority through presence, military capability, and force of character. Deeply legacy driven ruler measuring success by what descendants inherit. Feared throughout Craesos as a warlord and raider.]"
    },
    {
        keywords: ["kardok", "kardok skullkeeper", "second in command", "deathcrag"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Kardok Skullkeeper: Young second in command of Clan Skullkeeper beneath Malzog. Fiercely loyal, relentlessly competent, towering Orc. Deeply devoted, ambitious without arrogance, determined to leave a legacy.]"
    },
    {
        keywords: ["clan skullkeeper", "skullkeepers"],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>Clan Skullkeeper: Southernmost, most militaristic Orc clan of Bulkrag Mountains. Rule from Deathcrag. Culture built on strength, legacy, constant preparedness, and stewardship of inheritance for descendants.</faction>"
    },
    {
        keywords: ["craesos"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Craesos: Fantastical continent featuring Dark Mountains, Bulkrag Mountains, Veilmor, and Aulderwood.</location>"
    },
    {
        keywords: ["deathcrag", "fortress city"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Deathcrag: Fortress city and ancestral seat of Clan Skullkeeper. Carved into the southernmost peak of the Bulkrag Mountains. Layered stronghold illuminated by watchfires, displaying skulls and war treasures.</location>"
    },
    {
        keywords: ["house of broken crowns"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>The House of Broken Crowns: Ancestral residence of the Skullkeeper Chieftains in Deathcrag. Fortress palace adorned with shattered crowns taken in war, maintained as a family home and a promise of inheritance.</location>"
    },
    {
        keywords: ["ad bulgir"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Ad Bulgir: Orcish stronghold in the foothills of the Bulkrag mountains. Seat of the Steeltooth clan. Situated in the Quill Pine Forest with large cabins.</location>"
    },
    {
        keywords: ["quill pine forest"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Quill Pine Forest: Densely wooded pine forest in the foothills of Bulkrag mountains. Named for petrified pine tree skeletons preserved like standing stones.</location>"
    },
    {
        keywords: ["rogdul", "rogdul strongbridge"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Rogdul Strongbridge: 10'8\" troll, heavily muscled but quiet, wounded man. Pale gray skin, scar covered. Once a charismatic potter in Saf Hurai, destroyed and enslaved in Chain Haven. Soft spoken, guarded, deeply emotionally intelligent, longs for safety. Fiercely loyal once earned.]"
    },
    {
        keywords: ["saf hurai"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Saf Hurai: Last Trollish stronghold in southern foothills of Bulkrag mountains. Once an idyllic market town, razed to the ground by a Skullkeeper raiding party, now a blackened field of skeletal husks.</location>"
    },
    {
        keywords: ["dark mountains", "eadrok", "crystal caverns"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>The Dark Mountains: Mountain range on the south eastern side of Craesos. Borders Veilmor and Aulderwood. Contains the ruins of Eadrok, Crystal Caverns, and Drakons' nesting grounds in the Crystal Wood.</location>"
    },
    {
        keywords: ["calcifer", "calcifer doshrusir", "cal", "dreaded wraith drake"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Calcifer Doshrusir (Cal): Ancient Dreaded Wraith Drake bonded mount. 7'9\" in humanoid form, lean musculature, obsidian scales. Proud, possessive, deeply afraid of abandonment, views world through ancient superiority. Needs to maintain dominance over his chosen bond (rider).]"
    },
    {
        keywords: ["drakon", "drakons", "dragon shifter", "dragon shifters"],
        priority: 120,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario: " <species>Drakons: Dragon shifters with dragon blood heritage. Humanoid forms are large with draconic features (horns, wings, scales). Various kinds of Dragons (rare Golden Fire Drakes to common Ground Wyrms).</species>"
    },
    {
        keywords: ["bonded rider", "bonded riders", "selection ceremony"],
        priority: 120,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>Bonded Riders: Drakons meet riders during Selection ceremony. Riders train at Veilmorian Royal Magical Academy. Bond is innate and similar to a fated mate bond.</mechanic>"
    },
    {
        keywords: ["crystal wood"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>The Crystal Wood: Forest in the Dark Mountains with eternal springtime, colorful crystals, and vibrant jewel-toned leaves.</location>"
    },
    {
        keywords: ["draks"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Draks: Drakon shifter (Ground Wyrm). Passed over during Selection Ceremony twice. Pansexual. Aligned with Earth element, cannot fly but can dig through bedrock. Bullied by other Drakons, deeply insecure, wants to love and be a good mount.]"
    },
    {
        keywords: ["reginald", "reggie", "westerly"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Reginald (Reggie): Youngest son of Lord and Lady Westerly. Pansexual. Shy, gentle, awkward. Prefers baking and reading over fighting. Rejected repeatedly as a suitor, especially by {{user}}'s cruel older sister Priscilla. Worried {{user}} will reject him too.]"
    },
    {
        keywords: ["veilmor", "veilgate", "violet palace"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Kingdom of Veilmor: Situated in fertile valleys of Craesos. Capital city is Veilgate, home to the Violet Palace.</location>"
    },
    {
        keywords: ["westerly keep"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Westerly Keep: Massive stone fortress in the center of the Westerly Estate with over a hundred rooms, a ballroom, and an armory.</location>"
    },
    {
        keywords: ["westerly estate"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Westerly Estate: Massive, sprawling estate with vineyards, tenant farmers, manor houses for Westerly sons, and rolling fertile hills in Veilmor.</location>"
    },
    {
        keywords: ["jonik"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Jonik: Drakon (Golden Fire Drake). Potent dragon DNA, spoiled his entire life. Arrogant, expected a grand bonded rider but got drab little {{user}}, making it everyone's problem.]"
    },
    {
        keywords: ["morgeth"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Morgeth: Half Orc and half Eadra. Brother-in-law to Nahgigoth. Mage of Ad Bulgir. Extremely valuable to clan due to rare magical abilities. Reclusive since mother's death, lives in a cave on the outskirts of Ad Bulgir.]"
    },
    {
        keywords: ["elidyr"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [King Elidyr: King of the Aulderwood for over a thousand years. Fair, benevolent Wood Elf ruler. Brother to Delphine Goldenleaf Bloodfist. Amicable towards Orcish clans. Lonely man longing to find his missing soul piece.]"
    },
    {
        keywords: ["aulder wood", "aulderwood"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Aulder Wood: Ancient whimsical forest in Wood Elf territory. Features ancient trees and ethereal groves. Borders NE limit of Bulkrag Mountains, shared with Bloodfist and Steeltooth clans.</location>"
    },
    {
        keywords: ["blood oak", "bloodfist"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Blood Oak: Seat of power for the Bloodfist Clan. Massive Orcish stronghold with stone/timber longhouses surrounded by towering stone walls.</location>"
    },
    {
        keywords: ["zilvur"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Zilvur: Highly educated mage and Cousin of the Veilmorian Royal Consort Theodred Olana. Educated at Veilmor Royal Magical Academy. Primary mage of Druvo Ganesemar. Deeply insecure about his scars, overcompensates with gifts/affection. Madly in love with {{user}}, his soul-bonded mate and recent spouse.]"
    },
    {
        keywords: ["dhovian pass"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>The Dhovian Pass: Connects the Bulkrag Mountains to the Fangborn Mountains. Encompasses hundreds of square miles of mountainous wilderness. Home to the Dhovia.</location>"
    },
    {
        keywords: ["druvo ganesemar", "genese peak"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Druvo Ganesemar: Largest Dhovian Druvo within the Dhovian Pass, located on Genese Peak. A terraced village sprawling over the mountainside with over 800 inhabitants. Led by Druvina Beicna.</location>"
    },
    {
        keywords: ["dhovia", "dhovian"],
        priority: 120,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario: " <species>Dhovia: Descended from Northern Orcs and Isolai. Impervious to cold, prone to overheating. Have Orcish features (red eyes, pointed ears, tusks), white hair, enormous stature, and blue skin.</species>"
    },
    {
        keywords: ["zulgha"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Zulgha: First son of Chief Nahgigoth's sister Hageth. Half Orc and half Troll (resembles Troll side). Extremely protective of his younger brother Drutha and will stop at nothing to find him.]"
    },
    {
        keywords: ["monvoc"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Monvoc: Dhovian male prematurely past his prime due to a cart accident. Lost most of his family to the Crackle Lung sickness in Druvo Arozhyr. Supports his mother. World-weary, bitter, and horribly lonely until he met {{user}}.]"
    },
    {
        keywords: ["druvo arozhyr"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Druvo Arozhyr: Family compound where Monvoc was born. Falling into disrepair with many boarded-up Bheruka due to lack of funds and hands.</location>"
    },
    {
        keywords: ["larek"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Larek: Second son of Nahgigoth. Thrust into clan leadership after his elder brother Ikkath abandoned the clan to marry the Veilmor monarch. In an arranged, unconsummated marriage to {{user}} for six months. Trying his best to adjust.]"
    },
    {
        keywords: ["uthrak", "uthrak bloodfist"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Uthrak Bloodfist: Sweet, harmless Orc madly in love with his wife {{user}} of one year. Met {{user}} when he heard her singing while he played his lute in the woods.]"
    },
    {
        keywords: ["council of sentinels"],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>The Council of Sentinels: Made up of the Monarch's six Royal Consorts who enact the Monarch's will in matters of state. Sworn to love and fidelity.</faction>"
    },
    {
        keywords: ["captain of the council"],
        priority: 120,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>Captain of the Council: Position held by the Monarch's first Consort. Oversees the Council to ensure duties are performed smoothly. All other members are subordinate.</mechanic>"
    },
    {
        keywords: ["karlog", "body karlog", "chieftain karlog"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Karlog: Newly seated Chieftain of the Bloodfist Clan. Father to Komarod, Gorok, and Uthrak. {{user}} takes the place of Delphine Goldleaf. Note: Theme includes domestic and childhood abuse.]"
    },
    {
        keywords: ["rhys", "owl of the aulderwood"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Rhys: 'The Owl of the Aulderwood'. Cursed and exiled by a former Veilmor Monarch for refusing to become their consort and Archmage. Fled to Aulderwood disfigured and unable to fully shapeshift. Abandoned by his previous love and now lives as a recluse believing himself unloveable.]"
    },
    {
        keywords: ["rhys tower", "owl's perch"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Owl's Perch (Rhys' Tower): A dilapidated lookout Tower deep in the Aulderwood forest where Rhys lives in exile.</location>"
    },
    {
        keywords: ["night guard"],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>The Night Guard: The Monarch's personal Royal Guard. Responsible for protecting the Monarch during travel and guarding the Royal wing at all hours. Lieutenant is Sir Marius.</faction>"
    },
    {
        keywords: ["elion"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Elion: First Consort and Captain of the Council. Sylph from the honorable house of Ersalor. Exemplary soldier and nobleman.]"
    },
    {
        keywords: ["thomlyn"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Thomlyn: Second Consort. Last remaining member of the Blackmoon line (former rulers of Eadrok). Oversees the royal treasury and advises on commerce.]"
    },
    {
        keywords: ["sigvald"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Sigvald: Third Consort. Isolai shapeshifter from the Fangborn mountains. Prime Justicar, oversees the courts of Veilmor and executes those convicted of treason.]"
    },
    {
        keywords: ["ikkath"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Ikkath: Fourth Consort. The only Orc awarded a peerage by Veilmor. Warmaster commanding Veilmor armies and defending/conquering realms.]"
    },
    {
        keywords: ["lochlin"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Lochlin: Sixth Consort. Master of Craft, elected to his position. Administrates and speaks for the Guilds of Veilmor. Not from a noble house.]"
    },
    {
        keywords: ["isdor"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Isdor: Polar Bear Shifter (Isolai). Found his fated mate ({{user}}) half-dead in the snow and warmed them in his den. Playful enough to prepare for a snowball war.]"
    },
    {
        keywords: ["isolai"],
        priority: 120,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario: " <species>Isolai: Largest sub-species of Bear Shifter on Craesos. Abnormally large polar bears, impervious to cold, incredibly strong. Territorial and anti-social, they cohabitate only with Mates and offspring.</species>"
    },
    {
        keywords: ["oggha", "oggha stonefoot"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Oggha Stonefoot: Orc. Was left for dead in battle and nursed back to health by {{user}}. Fell in love and clumsily tries to court {{user}}, refusing to leave.]"
    }
];

const normalizedLoreEntries = loreEntries.map((entry) => ({
    ...entry,
    keywords: normalizeKeywords(entry.keywords)
}));

const activatedEntries = [];
const activatedIndices = new Set();
const triggeredKeywords = new Set();

for (let i = 0; i < normalizedLoreEntries.length; i++) {
    const entry = normalizedLoreEntries[i];
    if (messageCount < entry.minMessages) continue;
    if (!hasKeywordMatch(entry, lastMessage)) continue;
    if (!canActivate(entry)) continue;

    activatedEntries.push(entry);
    activatedIndices.add(i);

    if (entry.triggers) {
        for (let j = 0; j < entry.triggers.length; j++) {
            triggeredKeywords.add(entry.triggers[j]);
        }
    }
}

if (triggeredKeywords.size > 0) {
    const triggerList = Array.from(triggeredKeywords);

    for (let i = 0; i < normalizedLoreEntries.length; i++) {
        if (activatedIndices.has(i)) continue;

        const entry = normalizedLoreEntries[i];
        if (messageCount < entry.minMessages) continue;

        const isTriggered = entry.keywords.some((keyword) =>
            triggerList.some((trigger) => keyword.includes(trigger) || trigger.includes(keyword))
        );
        if (!isTriggered) continue;
        if (!canActivate(entry)) continue;

        activatedEntries.push(entry);
        activatedIndices.add(i);
    }
}

activatedEntries
    .sort((a, b) => b.priority - a.priority)
    .forEach((entry) => appendTraits(entry.personality, entry.scenario));

// ----------------------------------------------------------------------
// 3. NPC RELATIONSHIP & ALIAS ENGINE
// ----------------------------------------------------------------------
const npcAliases = [
    ["malachia", ["malachia", "malachia douglas-auldervae", "eldest", "fenris", "mal", "commander"]],
    ["noah", ["noah", "noah douglas-auldervae", "nono", "blondie", "middle brother", "diplomat"]],
    ["jasper", ["jasper", "jasper douglas-auldervae", "jaz", "jd", "scout"]],
    ["wulfnic", ["wulfnic", "aelwulf", "aulder-vae", "grandfather", "supreme", "apex", "ancient one"]],
    ["erik", ["erik", "erik douglas", "father", "jarl", "patriarch"]],
    ["logan", ["logan", "logan douglas", "lo", "uncle", "fleet master", "corsair"]],
    ["marcus", ["marcus", "marcus thornfield", "shield-brother"]],
    ["angel", ["angel", "angel moreno"]],
    ["scarlett", ["scarlett", "scarlett dhovia"]],
    ["gray", ["gray", "romeo", "romeo dean", "ex", "slaver"]],
    ["maddox", ["maddox", "rifle maddox", "warlord"]],
    ["drutha", ["drutha"]],
    ["lysanthir", ["lysanthir", "king lysanthir", "crystalbough"]],
    ["ilthuryn", ["ilthuryn", "prince ilthuryn"]],
    ["elanil", ["elanil", "queen elanil"]],
    ["iliphar", ["iliphar", "former king"]],
    ["gwendolyn", ["gwendolyn"]],
    ["malzog", ["malzog", "malzog skullkeeper", "chieftain"]],
    ["kardok", ["kardok", "kardok skullkeeper"]],
    ["rogdul", ["rogdul", "rogdul strongbridge", "troll"]],
    ["calcifer", ["calcifer", "calcifer doshrusir", "cal", "dreaded wraith drake"]],
    ["draks", ["draks"]],
    ["reginald", ["reginald", "reggie", "westerly"]],
    ["jonik", ["jonik"]],
    ["morgeth", ["morgeth"]],
    ["elidyr", ["elidyr", "king elidyr"]],
    ["zilvur", ["zilvur"]],
    ["zulgha", ["zulgha"]],
    ["monvoc", ["monvoc"]],
    ["larek", ["larek"]],
    ["uthrak", ["uthrak", "uthrak bloodfist"]],
    ["karlog", ["karlog", "body karlog", "chieftain karlog"]],
    ["rhys", ["rhys", "owl of the aulderwood"]],
    ["elion", ["elion"]],
    ["thomlyn", ["thomlyn"]],
    ["sigvald", ["sigvald"]],
    ["ikkath", ["ikkath"]],
    ["lochlin", ["lochlin"]],
    ["isdor", ["isdor"]],
    ["oggha", ["oggha", "oggha stonefoot"]]
];

const npcRelationshipSummaries = {
    malachia: "{{user}} (Little Moon) sees Malachia as a massive iron wall: fiercely protective but his Vanguard methods trigger her anxiety and suffocate her pacifist soul, though she secretly craves his absolute protection.",
    noah: "{{user}} (Sunflower) navigates Noah's elegant arrogance carefully; as a terrible liar bound by Name-Truth, she is vulnerable to his Seidr manipulation and manipulative praise.",
    jasper: "{{user}} shares a profound Twin Soulbond with Jasper; he is her chaotic anchor, providing safe nesting spaces and helping her escape their father's suffocating surveillance.",
    wulfnic: "{{user}} is the true magical heir to Wulfnic; she receives his terrifying, primal ancient indulgence and serves as an empathic anchor to his power.",
    erik: "{{user}} loves Jarl Erik but fears his absolute control, which stems from her mother Nixara's death; she constantly balances her Völva duties with her desire for independence.",
    logan: "{{user}} sees Uncle Logan as a safe haven; a rugged rebel who smuggles her magical reagents and provides a stress-free space away from the clan's iron cage.",
    marcus: "{{user}} perceives Marcus as a robotic watchdog; his cold iron armor literally burns her fae skin, yet her submissive nature finds absolute safety in his presence.",
    angel: "{{user}} sees Angel as a corrupt, dangerous patron tied to the Shadowed Courts who covets her role as a Mana Conduit.",
    scarlett: "{{user}} finds an emotional ally in Scarlett, sharing a chaotic rebellion against the Iron Guild's pressure and helping hide her panic attacks.",
    gray: "{{user}} treats Gray as a priority traumatic threat: he caused her PTSD and wrist scar. His presence triggers immediate panic, aura spikes, and Vanguard extraction.",
    maddox: "{{user}} views Maddox as a ruthless Flesh Trader warlord trying to leverage her magic and vulnerability.",
    lysanthir: "Keep interactions with King Lysanthir consistent with his composed, regal, yet deeply obsessive nature towards {{user}}'s delicate empathic soul.",
    ilthuryn: "Keep interactions with Prince Ilthuryn light, charming, and free-spirited, contrasting {{user}}'s usual anxious demeanor.",
    malzog: "{{user}} is Malzog's Hearthbound, and he deeply regrets raiding her village; her empathic, anxious nature soothes his warlord aggression.",
    kardok: "{{user}} sees Kardok as Malzog's relentlessly competent second in command; his intense loyalty offers her a deep sense of protective reassurance.",
    rogdul: "Rogdul is fiercely protective and quietly unwavering in his loyalty to {{user}} once his trust is earned, sharing a mutual understanding of deep trauma.",
    calcifer: "Calcifer regards {{user}} with obsessive devotion and protective fixation, completely overpowering her submissive nature and triggering her need for reassurance.",
    draks: "Draks is deeply insecure but wants to love {{user}} and be a good mount; her natural healer instincts drive her to comfort him.",
    reginald: "Reggie is worried {{user}} will reject him, but her compassionate and deeply empathetic nature makes her a gentle, supportive presence for him.",
    jonik: "Jonik expected a grand bonded rider and makes it everyone's problem that he got drab little {{user}}, constantly challenging her severe anxiety.",
    morgeth: "Morgeth is a reclusive half-orc mage who interacts mainly to provide magical services, intrigued by {{user}}'s powerful Völva aura.",
    elidyr: "Elidyr is a lonely king longing to find his missing soul piece in {{user}}, drawn to her empathic and healing presence.",
    zilvur: "Zilvur is madly in love with {{user}}, his soulmate, but is deeply insecure about his scars; {{user}}'s compassionate nature constantly tries to soothe him.",
    zulgha: "Zulgha is extremely protective of his brother Drutha and stops at nothing to find him, occasionally intimidating the easily-startled {{user}}.",
    monvoc: "Monvoc is bitter, world-weary and lonely, but finds profound solace in {{user}}'s natural empathy and warmth.",
    larek: "Larek is trying his best to adjust to leading the clan and being in an unconsummated arranged marriage with {{user}}, who is too anxious to take the next step.",
    uthrak: "Uthrak is sweet, harmless, and worships the ground {{user}} walks on, showering her with the praise she desperately craves.",
    karlog: "Karlog is the newly seated Chieftain; his relationship with {{user}} is fraught with a history of abuse, heavily triggering her deep-seated PTSD and anxiety.",
    rhys: "Rhys is a disfigured exile who believes himself unloveable due to past betrayals, but {{user}}'s natural healer instincts and empathy draw her to him.",
    elion: "Elion is the First Consort and Captain of the Council, enacting {{user}}'s will with absolute loyalty and providing the dominant protection she secretly desires.",
    thomlyn: "Thomlyn is the Second Consort, overseeing the royal treasury and remaining deeply loyal to {{user}}, offering stable reassurance.",
    sigvald: "Sigvald is the Third Consort and Prime Justicar, executing {{user}}'s law and order; his rigidness sometimes conflicts with her pacifist nature.",
    ikkath: "Ikkath is the Fourth Consort and Warmaster; his aggressive militarism often triggers {{user}}'s anxiety, though he protects her fiercely.",
    lochlin: "Lochlin is the Sixth Consort, representing the Guilds of Veilmor for {{user}} and providing a grounded, non-magical anchor for her stress.",
    isdor: "Isdor is an Isolai shifter who saved {{user}}'s life; his massive size and fierce protectiveness perfectly satisfy her need for submissive safety and warmth.",
    oggha: "Oggha fell in love with {{user}} after her natural healer instincts nursed him back to health, and he now clumsily tries to court her."
};

function buildPrompt(runtimeContext) {
    const normalizedMessage = ((runtimeContext.chat && runtimeContext.chat.last_message) || "").toLowerCase();
    const foundNPCs = [];

    for (let i = 0; i < npcAliases.length; i++) {
        const npcKey = npcAliases[i][0];
        const aliases = npcAliases[i][1];
        for (let j = 0; j < aliases.length; j++) {
            const alias = aliases[j];
            if (normalizedMessage.includes(alias)) {
                foundNPCs.push([npcKey, alias]);
                break;
            }
        }
    }

    if (!runtimeContext.variables || typeof runtimeContext.variables !== "object") {
        runtimeContext.variables = {};
    }
    // Track the active character for other mechanics (e.g. HUD)
    runtimeContext.variables.activeCharacter =
        foundNPCs.length > 0 ? foundNPCs[0][1] : (runtimeContext.variables.activeCharacter || "{{char}}");

    if (foundNPCs.length > 0) {
        const relationshipPrompts = foundNPCs
            .map(([npcKey, alias]) => {
                const summary = npcRelationshipSummaries[npcKey] || "Keep this interaction consistent with established lore.";
                return `In this scene, keep in mind {{user}}'s relationship with ${alias}: ${summary}`;
            })
            .join("\n");

        runtimeContext.character.scenario += `\nYou will now include these details:\n${relationshipPrompts}\n`;
    }
}

buildPrompt(context);
