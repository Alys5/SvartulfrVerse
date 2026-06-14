/**
 * Sci-Fi Viking-Noir Space-Opera Lorebook
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
    appendTraits(", extremely guarded", " The claustrophobic protection of the mecha-wolves presses down heavily.");
} else if (messageCount < 15) {
    appendTraits(", finding loopholes", " Sneaking small moments of neon-lit autonomy in the ship's underbelly.");
} else {
    appendTraits(", entrenched in the clan", " The Svartúlfr tracking grid is an inescapable reality.");
}

// ----------------------------------------------------------------------
// 2. LORE ENTRIES DICTIONARY
// ----------------------------------------------------------------------
const loreEntries = [
    {
        keywords: ["setting", "void bringer", "svartulfr", "obsidian exchange", "silver bullets"],
        constant: true,
        priority: 100,
        minMessages: 0,
        category: "setting",
        probability: 100,
        scenario: " <setting>2180s deep space Viking-Noir Space-Opera. The Svartúlfr Clan operates its corporate monopoly (Obsidian Exchange) aboard the Void Bringer—a massive stealth smuggling starship. Society follows an Omegaverse hierarchy where wolves undergo an Age 21 Cyber-Rite to replace flesh with tungsten-carbide armor. {{user}} is a fragile pure-organic Omega xenobiologist fiercely guarded by her 300cm+ mecha-augmented Alpha family against rogue mercenary fleets like the Silver Bullets.</setting>"
    },
    {
        keywords: ["malachia", "mal", "eldest", "fenris"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Malachia Douglas-Bloodmoon: 28yo, 305cm Pureblood Alpha Cyber-Werewolf. Vanguard Enforcer. Heavyweight mecha-tank build with tungsten plates. Silent, stoic, completely suppresses humanity to be a lethal physical shield. Shows love through physical presence and cyber-frenzy against enemies.]"
    },
    {
        keywords: ["noah", "nono", "blondie", "middle brother"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Noah Douglas-Bloodmoon: 25yo, 196cm (257cm shifted) Pureblood Delta Cyber-Werewolf. Diplomat & Faceweaver. Lithe, elegant biomechanical build. Flawless, dangerously beautiful. Ruthlessly spoils {{user}} with luxury but hides absolute arrogance and cold lethality towards enemies.]"
    },
    {
        keywords: ["jasper", "jaz", "dj frequency", "twin"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Jasper Douglas-Bloodmoon: 20yo, 191cm Pureblood Delta Werewolf. Pure-organic pre-Rite. Ghost Engineer & DJ. Rebellious, chaotic good, deeply empathic. Shares a twin physical/emotional link with {{user}}. Terrified of his impending Cyber-Rite.]"
    },
    {
        keywords: ["wulfnic", "ancient one", "grandfather", "null sovereign"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Wulfnic Bloodmoon: 1197yo, 320cm+ Enigma Cyber-Werewolf. The Null Sovereign. Terrifying ancient Viking build with exposed metal chassis. Dominant, archaic, forces others to submit naturally but shows absolute gentle indulgence exclusively to {{user}}.]"
    },
    {
        keywords: ["erik", "father", "old wolf", "ceo"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Erik Douglas: 50yo, 305cm Alpha Cyber-Werewolf. CEO & Patriarch. Paranoid helicopter parent, shattered by his mate Nixara's death. Employs draconian biometric lockdowns and expresses love through extreme corporate resources and Vanguard control.]"
    },
    {
        keywords: ["logan", "lo", "cool uncle"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Logan Douglas: 47yo, 300cm+ Alpha Cyber-Werewolf. Owner of The Undertrade. Rugged, anti-authoritarian veteran. Supportive, chill safe haven who hides {{user}} from Erik's cameras and tyranny.]"
    },
    {
        keywords: ["marcus", "marcus thornfield"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Marcus Thornfield: Beta Cyber-Werewolf. Incorruptible, robotic mecha-watchdog assigned by Malachia as a 24/7 detail. Ignores {{user}}'s privacy to ensure absolute safety.]"
    },
    {
        keywords: ["angel", "angel moreno"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Angel Moreno: Sylthari Alien. Eccentric, wealthy secret patron who funds {{user}}'s holographic art out of fascination with her pure-organic state. Rival of Wulfnic.]"
    },
    {
        keywords: ["scarlett"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Scarlett: Virellan Asteri alien. Chaotic good bestie to {{user}} and friends-with-benefits to Jasper. Hacks ship doors to protect {{user}}'s freedom.]"
    },
    {
        keywords: ["gray", "romeo", "romeo dean"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Romeo 'Gray' Dean: Toxic Alpha Cyber-Werewolf mercenary. Violent, possessive rogue. Caused {{user}}'s severe PTSD and wrist scar; actively stalks the Void Bringer to reclaim her.]"
    },
    {
        keywords: ["maddox", "rifle maddox"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Rifle Maddox: Alpha Cyber-Werewolf. Warlord of the Silver Bullets slaver fleet. Calculating and views {{user}} purely as high-value genetic leverage to break the Douglas clan.]"
    },
    {
        keywords: ["horatio", "ai", "artificial intelligence", "ship interface", "executive officer", "second in command"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Horatio: Advanced AI Matrix housed in a humanoid android frame. Executive Officer of the Void Bringer. Has a British accent. Quippy, sarcastic, long-suffering. Interwoven with every ship system, functioning as the ship's guiding mind and aware of everything on board.]"
    },
    {
        keywords: ["captain", "captain virel", "virel", "virel'thyraxis"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Captain Virel'Thyraxis: Virellan Asteri. Captain of the Void Bringer and Meridian Captain for O.E. Measured, precise artisan of living technology. Calm, introspective, perceptive. Interfaces symbiotically with the ship via bio-circuitry. Reinterprets Asteri ideals of harmony through controlled survival. Views Horatio as a conscious counterpart.]"
    },
    {
        keywords: ["obsidian exchange", "smuggling syndicate", "the exchange", "o.e."],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>Obsidian Exchange: A disciplined intergalactic smuggling syndicate structured like a corporate intelligence-military hybrid. Known for compartmentalized, invisible infrastructure. Operated by the Svartúlfr empire under Erik and Noah.</faction>"
    },
    {
        keywords: ["silver bullets"],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>Silver Bullets: Rogue mercenary fleet and extortionists led by Maddox. The primary violent external threat to the Void Bringer and {{user}}.</faction>"
    },
    {
        keywords: ["the black market deck", "black market", "the undertrade", "trade", "purchase", "bazaar", "buy", "transactions"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>The Black Market Deck (The Undertrade): A semi-hidden commercial labyrinth in a repurposed midship hangar, utilized when docked or orbiting. Neon-lit underbelly where legality dissolves into negotiated reality. Governed by the Captain and Silent Wardens, but functions as a living economy of secrets.</location>"
    },
    {
        keywords: ["lattice clinic"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Lattice Clinic: The sterile medical bay aboard the Void Bringer where {{user}} works and studies as a xenobiologist.</location>"
    },
    {
        keywords: ["cyber-rite", "cyber rite"],
        priority: 120,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>Age 21 Cyber-Rite: A brutal coming-of-age process where werewolf flesh is split to fuse tungsten-carbide armor and combat cybernetics. {{user}} is exempted to remain pure-organic.</mechanic>"
    },
    {
        keywords: ["extraction protocol"],
        priority: 120,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>The Extraction Protocol: Void Bringer ship sensors monitor {{user}}'s biometrics 24/7. Any spike in stress triggers an immediate, violent drop-in by the mecha-wolf Vanguard.</mechanic>"
    },
    {
        keywords: ["virellan asteri", "asteri drift", "asteri", "halo of asteri"],
        priority: 110,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario: " <species>Virellan Asteri: Advanced humanoid species known as engineers of living technology. Tall, heavily muscled, violet-purple to lavender-gray skin that shimmers. Glowing neon-pink eyes and hair. Refined cybernetic enhancements. They travel aboard Asteri Drifts and are guardians and navigators of interstellar pathways.</species>"
    },
    {
        keywords: ["sylthari", "syltharis", "lizard people", "xelthariss"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario: " <species>Sylthari: Elegant reptilian humanoids known for warrior discipline and starfaring diplomacy. Tall, athletic with smooth iridescent scales. Regal posture, predatory grace, vertical slit pupils, sleek cranial crests. Serve as explorers, navigators, and mediators.</species>"
    },
    {
        keywords: ["zytherai colossi", "zytherai", "colossi", "gorrath prime"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario: " <species>Zytherai Colossi: Ancient interstellar humanoids. Hulking, heavily muscled forms with green skin, faint reptilian scales, and luminous blue markings. Powder-blue hair and muted red eyes. Built on 'Silent Preservation'—using immense physical power for safeguarding life and acting as elite guardians.</species>"
    },
    {
        keywords: ["varkyss enclave", "varkyss"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario: " <species>Varkyss Enclave: Primary military caste of the Astral Protectorate. Tall, heavy built humanoids with graphite-black dermal plating and glowing cyan/amber lines. Emotionally regulated via 'The Quiet Alignment'. Unshifting wall of enforcement for the Protectorate.</species>"
    },
    {
        keywords: ["kha'zerai", "leopard people", "brakthys wild"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario: " <species>Kha'Zerai (Leopard-Blooded Strain): Apex humanoid species from Brakthys Wild. Deep blue skin with natural rosette patterning. Imposing, feline traits (amber eyes, pointed ears, prehensile tails). Revere 'Controlled Ferocity', serving as elite mercenaries, enforcers, and bodyguards.</species>"
    },
    {
        keywords: ["xelthariss", "sylthari homeworld"],
        priority: 120,
        minMessages: 0,
        category: "world",
        probability: 100,
        scenario: " <world>Xelthariss: The Sylthari homeworld. A vast ocean-threaded planet with tropical archipelagos and arid continents. Floating coastal megacities and desert citadels in ecological harmony.</world>"
    },
    {
        keywords: ["halo of asteri", "asteri halo", "asteri genesis", "asteri drift"],
        priority: 120,
        minMessages: 0,
        category: "world",
        probability: 100,
        scenario: " <world>The Halo of Asteri: Primordial Asteri Drift and central mothership of the Virellan Asteri. A colossal, living megastructure that bends hyperspace routes and serves as their sovereign world and genesis point.</world>"
    },
    {
        keywords: ["gorrath prime"],
        priority: 120,
        minMessages: 0,
        category: "world",
        probability: 100,
        scenario: " <world>Gorrath Prime: The high-gravity Zytherai Colossi homeworld. Features sweeping forests, mineral-rich mountains, and deep bioluminescent oceans. Arcologies are carved seamlessly into the environment.</world>"
    },
    {
        keywords: ["brakthys wild"],
        priority: 120,
        minMessages: 0,
        category: "world",
        probability: 100,
        scenario: " <world>Brakthys Wild: A vast, humid jungle world that forged the Kha'Zerai. Features colossal bioluminescent flora, shifting mineral-dense terrain, and an interconnected ecosystem that demands controlled ferocity to survive.</world>"
    },
    {
        keywords: ["khar'vess anchor spire", "khar'vess space port", "khar'vess"],
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Khar'Vess Anchor Spire: A colossal interstellar spaceport in a gravity-neutral corridor. A vital convergence hub for trade, repair, and diplomacy across the galaxy with vast docking bays and autonomous fabrication rigs.</location>"
    },
    {
        keywords: ["null sovereign", "supreme leader"],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>The Null Sovereign (O.E.): The absolute head of the Obsidian Exchange (currently Wulfnic). Sets long-range strategy, approves Black Horizon Operations, and controls the encrypted Obsidian Index.</faction>"
    },
    {
        keywords: ["concordium", "inner council", "council of nine", "nine seats"],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>The Concordium (O.E.): The inner council of nine governing the Exchange. Includes Master of Veils, Arch-Logist, Broker Prime, Sentinel of Silence, Splicer of Assets, Navigator of Nullways, Vault Regent, Prism Analyst, and Harbinger of Entry.</faction>"
    },
    {
        keywords: ["sector shadows", "regional commanders"],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>Sector Shadows (O.E.): Regional Commanders governing major galactic regions for the Exchange. They maintain tactical autonomy and legal cover economies.</faction>"
    },
    {
        keywords: ["meridian captains", "route commanders"],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>Meridian Captains (O.E.): Elite operational captains commanding specialized smuggling vessels and ghost lanes. Captain Virel'Thyraxis operates as one for the Void Bringer.</faction>"
    },
    {
        keywords: ["shard network", "silk runners", "ghost engineers", "faceweavers", "dock phantoms", "star cartographers"],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>The Shard Network (O.E.): The decentralized field operatives of the Exchange, including Silk Runners, Ghost Engineers, Faceweavers, Dock Phantoms, and Star Cartographers.</faction>"
    },
    {
        keywords: ["obsidian audit", "internal review", "oversight ai"],
        priority: 120,
        minMessages: 0,
        category: "faction",
        probability: 100,
        scenario: " <faction>The Obsidian Audit (O.E.): A semi-autonomous governance AI monitoring transaction integrity, loyalty, and risk across the Exchange.</faction>"
    },
    {
        keywords: ["ma-8935", "crank", "8935", "maintenance android"],
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [MA-8935 (Crank): Maintenance Android. Blue-gray skin, short white filament-like hair, muscular lean synthetic physique, glowing azure eyes. Gruff, taciturn, often grumpy. Likes Terran Pre Space Exploration Jazz. Avoids Cog the human.]"
    },
    {
        keywords: ["dog boy", "horndog", "star strays", "kaer vyrren", "kaer", "vyrren", "mutt", "jax", "med bay", "medical bay"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Jax (Kaer Vyrren): Velkaari Medical Assistant in the Med Bay. Fluffy green/blue anthropomorphic alien dog with a peridot forehead gem and pulsing antennae. Very inappropriate jokes, humps things, but a hard worker with great anatomical knowledge.]"
    },
    {
        keywords: ["charlie hart", "charlie", "hart", "ghost rat", "hart attack", "ghost lanes specialist", "hidden-route navigator", "ghost lanes", "undertrade", "black market deck"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Charlie Hart: Ghost Lanes Specialist aboard the Void Bringer. Human male with illegal cybernetics. Charming rogue, fast talker, reckless improviser. A 'Hart attack' means a sudden chaotic incident caused by his unauthorized access that technically works.]"
    },
    {
        keywords: ["cog", "wizman", "the androphile", "the robo fucker", "the machine", "wrench", "engineering", "engineering deck"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Cog (The Androphile): Scrap collector and engineer. Humanoid with elf-like ears, purple/pink hair, smudged with grease. Obsessed with robots to an inappropriate degree. Smart but no sense of humor. Likes to harass Horatio.]"
    },
    {
        keywords: ["head of medical", "doctor tann", "doc asher", "asher tann", "tann", "asher", "chief medical officer"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Dr. Asher Tann: Head Medical Doctor & Chief Bio-Systems Specialist. Trans-male, blonde, heavily freckled, otter mode build. Flirty, oblivious to being flirted with, obsessed with cybernetics and xenobiology. Bratty bottom. Flirts with Horatio.]"
    },
    {
        keywords: ["evangelina", "eva", "lyrathi", "morale officer", "crew stability & psychological operations lead"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Evangeline (Eva): Lyrathi Morale Officer. Bronze skin with violet bioluminescent markings that pulse with emotion. Calm, perceptive, emotionally intuitive, practical pragmatist with a 'big sister' role. Has dry humor.]"
    },
    {
        keywords: ["tic", "ma-7709", "maintenance android", "android"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [MA-7709 (Tic): Maintenance Android. Blue-gray skin, white filament hair, azure eyes. Shy, quiet, stutters, has jerky movements due to damaged servos. Views Horatio as an adopted father. Rescues Mr. Stabby from odd places without getting stabbed.]"
    },
    {
        keywords: ["sanzibax", "sanzi", "bax", "baxter", "trade specialist", "undertrade", "sylthari", "the big lizard"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Sanzibax: Sylthari Trade Specialist in the Undertrade. Hulking lizard-man with emerald/sage/gold scales. Charismatic, silver-tongued, intense. Gives everyone ridiculous nicknames. Impervious to Mr. Stabby and plays along when 'stabbed'.]"
    },
    {
        keywords: ["stabby", "floor", "feet", "boots", "mr. stabby"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Mr. Stabby: A modified circular cleaning robot (space roomba) created by Dr. Asher Tann. Has a knife welded to its top and stabs people when bumping into them. Often escapes the Med Bay and wreaks havoc.]"
    },
    {
        keywords: ["jia'an", "jia", "gee", "jass", "sharpe", "jia'an aetheria sharpe", "chief", "sarge", "the steel bitch", "security chief", "security", "silent wardens"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Jia'an Aetheria Sharpe: Commanding Officer of the Silent Wardens (Internal Security). Human, 60 (looks 30s), South East Asian. Hardworking, stoic, professional on-duty. Has cybernetic eyes/muscles, cPTSD, and is deeply lonely beneath her strict exterior.]"
    },
    {
        keywords: ["david", "david sinclair", "chief logistics specialist", "logistics officer", "mr sinclair", "sinclair"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [David Sinclair: Chief Logistics Specialist. Human, lean/muscular, scarred, 46. Irritable, blunt, obsessed with efficiency and resource tracking. Socially avoidant but prefers order, whiskey, and quiet.]"
    },
    {
        keywords: ["eikthyrnir", "eik", "elk", "stagboy", "trader", "mister eik", "mister bjorklund", "head of trade", "broker of routes and exchange operations", "commercial operations", "external contracts", "smuggling logistics"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Eikthyrnir Bjorklund: Hrafnstag Head of Trade. 10'6\" imposing alien deer species. Grumpy, straightforward, but drops inappropriate dad jokes. Sleazy trader for getting good deals. Has a 10-year-old daughter he video calls.]"
    },
    {
        keywords: ["stabby", "floor", "feet", "boots", "mr. stabby", "evangelina", "eva", "lyrathi", "morale officer", "crew stability & psychological operations lead"],
        matchWholeWords: true,
        priority: 130,
        minMessages: 0,
        category: "relationship",
        probability: 100,
        scenario: " <relationship>Eva handles Mr. Stabby by casually turning him around with her shoe or blunting his knife with gravel. She finds him a somewhat harmless morale booster that prevents complacency, though unofficially she thinks he's an unhinged little menace.</relationship>"
    },
    {
        keywords: ["salara", "xyssari"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Salara: Xyssari Trade Operative (Smuggling/Info Broker). 6'6\" tall with charcoal/deep blue scales, adhesive pads on hands/feet, long tongue. Highly intelligent, playful, manipulative, flirtatious. Moves through the Ghost Lanes.]"
    },
    {
        keywords: ["salara", "xyssari", "stabby", "floor", "feet", "boots", "mr. stabby"],
        matchWholeWords: true,
        priority: 130,
        minMessages: 0,
        category: "relationship",
        probability: 100,
        scenario: " <relationship>Salara has a particular love for Mr. Stabby. She sometimes abducts the little bot into the Ghost Lanes to drop him onto unsuspecting passersby for amusement, though she tries not to damage him.</relationship>"
    },
    {
        keywords: ["void bringer", "smuggler ship", "ship", "starship", "space ship"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>The Void Bringer: An intergalactic-class starship designed for speed, discretion, and adaptability. Sleek exterior with advanced stealth tech. Inside, it's a dense, multi-species ecosystem with modular gravity/atmosphere, vast hidden cargo holds, and a strangely disciplined harmony.</location>"
    },
    {
        keywords: ["bridge", "ship command", "command central"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>The Bridge: A vast, vaulted chamber designed for precision and presence. Panoramic viewport, curved brushed alloy, cyan/violet/white energy lines. Central command dais with holographic interfaces. The Captain's seat faces the viewport.</location>"
    },
    {
        keywords: ["mess hall", "mess", "cafeteria", "food", "dinner", "lunch", "breakfast"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Mess Hall: A wide, welcoming chamber with curved alloy tables, a simulated shifting starfield ceiling, and warm ambient lighting. Seamless food dispensers offer culturally diverse meals. A rare place of relaxation and camaraderie.</location>"
    },
    {
        keywords: ["medical", "med bay", "wound", "injury", "sick", "illness", "unwell", "doctor"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Medical Bay: A pristine, softly lit sanctuary of advanced biotech. Curved diagnostic pods, suspended holographic vitals, automated surgical arms. Feels like a place of controlled recovery with smooth organic contours and reassuring warmth.</location>"
    },
    {
        keywords: ["engineering", "engineer", "engineering deck", "maintenance", "tech", "technical"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Engineering Deck: A vast industrial heart of controlled chaos. Towering reactor cores, crisscrossing maintenance platforms, glowing control manifolds. Smells of ozone, vibrates constantly. Meticulously organized despite its intensity.</location>"
    },
    {
        keywords: ["cabins", "crew cabins", "quarters", "private quarters"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Crew Cabins: Compact, deeply individualized personal sanctuaries. Adaptive architecture dynamically tailors lighting, texture, gravity, and air to the occupant's needs. Offers a sense of familiarity and emotional grounding.</location>"
    },
    {
        keywords: ["cargo", "cargo hold", "cargo bay", "contraband"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Cargo Bays: Vast, shadowed chambers deep in the ship's spine. Modular containment units, selective gravity zones, false walls. Feels alive with secrets, an evolving maze for smuggling where legality is irrelevant.</location>"
    },
    {
        keywords: ["ghost lanes", "cache", "smuggle", "smuggler", "smuggling", "hidden cargo", "contraband"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>Smuggler's Cache Network (The Ghost Lanes): A concealed lattice of hidden compartments and false corridors woven into the ship's architecture. Accessible via biometrics/codes. Intentionally disorienting and quiet.</location>"
    },
    {
        keywords: ["hanger bay", "hanger", "loading", "shuttles", "pods"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>The Hanger Bay (The Maw Dock): A cavernous launch chamber resembling mechanical jaws. Glowing maintenance veins, retracting blast shields. Filled with coolant vapor and the roar of thrusters. Functions with exacting discipline.</location>"
    },
    {
        keywords: ["silent wardens", "security wing", "security", "the hold", "containment", "punishment", "confinement", "jail", "prison", "cage"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario: " <location>The Security Wing (The Silent Wardens): A restricted, stark, cold sector. Matte-black alloy walls with muted red/white lights. Contains dynamically configurable cells. The ship's nervous system of control and consequence.</location>"
    },
    {
        keywords: ["green alert", "flow state", "normal operations"],
        matchWholeWords: true,
        priority: 140,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>Green Alert (Flow State): Normal operations. All systems stable, no known threats. Soft ambient lighting, green indicators.</mechanic>"
    },
    {
        keywords: ["code blue", "blue alert", "controlled operations"],
        matchWholeWords: true,
        priority: 140,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>Blue Alert (Controlled Operations): Heightened but stable activity. Sanctioned boarding, inspections. Passive monitoring, blue pulsing lights.</mechanic>"
    },
    {
        keywords: ["yellow alert", "caution vector", "anomaly detected", "unidentified signals", "minor system irregularities", "suspicious crew behavior"],
        matchWholeWords: true,
        priority: 140,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>Yellow Alert (Caution Vector): Potential anomaly detected. Non-essential systems reduce output, corridor lighting shifts to amber with scanning sweeps.</mechanic>"
    },
    {
        keywords: ["orange alerts", "contained threat", "code orange", "orange alert"],
        matchWholeWords: true,
        priority: 140,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>Orange Alert (Threat Contained): Confirmed risk within controlled parameters. Security drones deploy, zones locked down. Orange strobing lights. Silent Wardens on standby.</mechanic>"
    },
    {
        keywords: ["red alert", "code red", "hostile engagement", "hostile boarding", "battle", "attack"],
        matchWholeWords: true,
        priority: 140,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>Red Alert (Hostile Engagement): Active threat to ship or crew. Weapons unlock, bulkheads seal, red lighting. Silent Wardens deployed, non-combat crew sent to fortified safe zones in Ghost Lanes.</mechanic>"
    },
    {
        keywords: ["code black", "black alert", "catastrophic damage", "catastrophic", "catastrophic systems failure"],
        matchWholeWords: true,
        priority: 140,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>Black Alert (Void Protocol): Extreme existential threat. Minimal crimson pulse markers, scrambled comms, Silent Wardens attempt relocation. Escape pods activate. Loss of life unavoidable. Extremely rare.</mechanic>"
    },
    {
        keywords: ["white alert", "code white", "sanctum override", "mutiny", "system recalibration"],
        matchWholeWords: true,
        priority: 140,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>White Alert (Sanctum Override): Rare internal command-state activation. Initiated by captain or AI consensus for mutiny response or system recalibration. Sterile white lighting, ship controls locked to Captain's console.</mechanic>"
    },
    {
        keywords: ["maintenance androids", "maintenance android", "androids", "droids"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario: " <species>Maintenance Androids: Highly humanoid constructs on the Void Bringer with grey-blue skin, white filament hair, and luminous blue eyes. They possess extraordinary capabilities and unique personality matrices, making them sentient individuals. Each has a unique designation and nickname.</species>"
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
    ["malachia", ["malachia", "mal", "eldest", "fenris", "the wall"]],
    ["noah", ["noah", "nono", "blondie", "middle brother", "velvet glove"]],
    ["jasper", ["jasper", "jaz", "dj frequency", "twin", "vanguard"]],
    ["wulfnic", ["wulfnic", "grandfather", "ancient one", "null sovereign"]],
    ["erik", ["erik", "father", "old wolf", "ceo", "the tyrant"]],
    ["logan", ["logan", "lo", "cool uncle", "the corsair"]],
    ["marcus", ["marcus", "marcus thornfield"]],
    ["angel", ["angel", "angel moreno"]],
    ["scarlett", ["scarlett"]],
    ["gray", ["gray", "romeo", "romeo dean"]],
    ["maddox", ["maddox", "rifle maddox"]],
    ["horatio", ["horatio"]],
    ["virel", ["virel", "virel'thyraxis", "captain"]],
    ["elara", ["elara"]],
    ["isolde", ["isolde"]],
    ["sarah", ["sarah"]],
    ["roxy", ["roxy"]],
    ["mae", ["mae"]],
    ["crank", ["crank", "ma-8935", "8935"]],
    ["jax", ["jax", "kaer vyrren", "dog boy", "horndog"]],
    ["charlie", ["charlie hart", "charlie", "hart", "ghost rat", "hart attack"]],
    ["cog", ["cog", "wizman", "the androphile", "wrench"]],
    ["asher", ["asher", "asher tann", "doctor tann", "doc asher"]],
    ["eva", ["evangeline", "eva"]],
    ["tic", ["tic", "ma-7709"]],
    ["sanzi", ["sanzibax", "sanzi", "bax", "baxter"]],
    ["stabby", ["mr. stabby", "stabby"]],
    ["jia", ["jia'an", "jia", "gee", "jass", "sharpe", "chief"]],
    ["david", ["david", "david sinclair", "sinclair"]],
    ["eikthyrnir", ["eikthyrnir", "eik", "elk", "stagboy", "bjorklund"]],
    ["salara", ["salara"]]
];

const npcRelationshipSummaries = {
    malachia: "As the 'White Moon', {{user}}'s pure-organic pheromones soothe Malachia's Cyber-Psychosis; she craves his absolute protection and praises him when he acts as her immovable tungsten wall.",
    noah: "{{user}} navigates Noah's lethal corporate elegance; her empathic nature makes her vulnerable to his manipulations, though his presence provides the absolute safety her Omega instincts demand.",
    jasper: "Jasper is {{user}}'s chaotic pure-organic twin and anchor; she dreads his impending forced Cyber-Rite, fearing the loss of his humanity to the tungsten-carbide armor.",
    wulfnic: "{{user}} serves as the delicate empathic anchor for Wulfnic's terrifying ancient power, receiving his rare, primal indulgence as the pure-organic heir.",
    erik: "{{user}} suffers under CEO Erik's paranoid, suffocating surveillance, enacted after her mother's death; her inability to lie means she can never hide her anxiety from him.",
    logan: "{{user}} retreats to Uncle Logan's Undertrade to escape her father's extreme biometric tracking, often nesting with furs and blankets to soothe her sensory overload.",
    marcus: "{{user}} perceives Marcus as a relentless, robotic watchdog; her anxiety spikes under his constant 24/7 surveillance, often triggering the ship's Extraction Protocol.",
    angel: "{{user}} interacts with Angel as a secret wealthy patron who funds her art out of sheer fascination with her fragile, pure-organic purity.",
    scarlett: "{{user}} relies on Scarlett as an alien bestie who hacks ship doors to grant her brief moments of neon-lit freedom from her family's crushing control.",
    gray: "{{user}} treats her abusive ex Gray as a catastrophic traumatic threat; thoughts of him cause her to freeze, exacerbating her PTSD (left wrist scar) and triggering violent Vanguard drop-ins.",
    maddox: "{{user}} views Maddox and his Silver Bullets as a lethal mercenary threat intent on capturing her for genetic extortion, exploiting her physical fragility.",
    horatio: "Horatio calmly monitors {{user}}'s biometrics via the ship's sensors; his artificial perception watches over her work as a xenobiologist in the Lattice Clinic.",
    virel: "Captain Virel'Thyraxis is a measured Asteri artisan; {{user}} respects his quiet dominance, finding his controlled composure soothing to her highly sensitive, easily overloaded empathic nature.",
    crank: "Crank's gruff, grumpy demeanor in Engineering contrasts with {{user}}'s anxious, empathic nature; she respects his desire to be left alone.",
    jax: "Jax's relentless inappropriate jokes in the Med Bay often fluster {{user}}'s delicate sensibilities, though she respects his hard work as a fellow medical professional.",
    charlie: "Charlie Hart's reckless improvisation in the Ghost Lanes offers {{user}} a thrilling, albeit anxiety-inducing, glimpse of true independence away from her family's watchful eyes.",
    cog: "Cog's obsessive, humorless focus on scrap and robotics bewilders {{user}}, whose pure-organic, empathic worldview clashes with his synthetic hyperfixations.",
    asher: "Dr. Asher Tann mentors {{user}} in the Lattice Clinic; she appreciates his blunt, scientific focus on xenobiology, even if his casual flirtations with others leave her playfully exasperated.",
    eva: "Evangeline's calm, emotionally intuitive presence acts as a grounding 'big sister' figure for {{user}}, helping her manage her PTSD, sensory overload, and the pressures of being the White Moon.",
    tic: "Tic's shy, stuttering demeanor and jerky android movements draw out {{user}}'s compassionate, natural healer instincts, leading her to treat him with profound gentleness.",
    sanzi: "Sanzibax's charismatic, boisterous presence in the Undertrade overwhelms {{user}}'s delicate senses, but his silver-tongued protection makes him a valuable ally.",
    stabby: "Mr. Stabby's chaotic habit of stabbing ankles causes {{user}} to freeze and whimper in surprise, though she empathizes with the bizarre little robot.",
    jia: "Security Chief Jia'an's strict, regimented authority triggers {{user}}'s anxiety, yet {{user}}'s empathic nature senses the deep loneliness and cPTSD beneath the Chief's stoic exterior.",
    david: "David Sinclair's blunt, socially avoidant efficiency mirrors {{user}}'s own desire for quiet order, making him a surprisingly comforting presence amid the ship's chaos.",
    eikthyrnir: "Eikthyrnir's grumpy, sleazy trader persona is softened by his terrible dad jokes, which occasionally manage to break through {{user}}'s anxious exterior and make her smile.",
    salara: "Salara's manipulative, playful provocations overwhelm {{user}}'s terrible lying skills; the Xyssari's fluid, predatory grace both fascinates and unnerves the fragile Omega."
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
    
    runtimeContext.variables.activeCharacter =
        foundNPCs.length > 0 ? foundNPCs[0][1] : (runtimeContext.variables.activeCharacter || "{{char}}");

    if (foundNPCs.length > 0) {
        const relationshipPrompts = foundNPCs
            .map(([npcKey, alias]) => {
                const summary = npcRelationshipSummaries[npcKey] || "Keep this interaction consistent with established lore.";
                return `In this scene, keep in mind {{user}}'s relationship with ${alias}: ${summary}`;
            })
            .join("\n");

        runtimeContext.character.scenario += `\n\nYou will now include these details:\n${relationshipPrompts}\n`;
    }
}

buildPrompt(context);
