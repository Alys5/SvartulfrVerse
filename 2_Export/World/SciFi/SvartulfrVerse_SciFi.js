/**
 * SVARTULFRVERSE WORLD SCRIPT - SCIFI
 *
 * MacroCosmo placeholder per SciFi / DCC 2375.
 * Questo file è predisposto per l'inserimento dei dati lore, timeline e stat.
 * Compatibile con ES6-safe JanitorAI Scripts API; usa solo context e scope locale.
 */

if (typeof context === "undefined") {
    return;
}

if (!context.character) {
    return;
}

const character = context.character;

character.personality = typeof character.personality === "string" ? character.personality : "";
character.scenario = typeof character.scenario === "string" ? character.scenario : "";
character.example_dialogs = typeof character.example_dialogs === "string" ? character.example_dialogs : "";

const WORLD_METADATA = {
    worldId: "scifi_cyberdcc_2375",
    displayName: "SciFi",
    setting: "CyberDCC 2375",
    genre: "cyberpunk werewolf",
    rules: "CyberDCC2375, cybernetic werewolves, BlackMoon Pack Law, Solarton Square, corporate surveillance, neon noir romance, DCC Magnus, cybernetic implants, pack politics.",
    sourceBase: "2_Export/World/SciFi/",
    rootFolder: "2_Export/World/SciFi/"
};

const WORLD_CONFIG = {
    MAX_TOKENS: 2200,
    MENTION_SCAN_DEPTH: 8,
    MAX_ACTIVE_ENTRIES: 32,
    DEFAULT_PRIORITY: 10,
    DEFAULT_IMPORTANCE: 10.0,
    DEBUG: false
};

const WORLD_DATA = {
    locations: [],
    organizations: [],
    cultures: [],
    history: [],
    timeline: [],
    characters: [],
    secrets: [],
    custom: []
};

let loreEntries = [];
let timelineEvents = [];
let statReactions = [];
let activatedWorldEntryIds = [];

function appendIfMissing(field, text) {
    if (!text) {
        return;
    }
    if (character[field].indexOf(text) === -1) {
        character[field] += text;
    }
}

function normalizeKeywords(keywords) {
    if (!keywords) {
        return [];
    }
    if (typeof keywords === "string") {
        return [keywords];
    }
    return keywords;
}

function registerLoreEntry(entry) {
    if (!entry || !entry.id) {
        return false;
    }

    entry.canonLayer = entry.canonLayer || "CANDIDATE";
    entry.source = entry.source || WORLD_METADATA.sourceBase + entry.id + ".md";
    entry.keywords = normalizeKeywords(entry.keywords);
    entry.priority = typeof entry.priority === "number" ? entry.priority : WORLD_CONFIG.DEFAULT_PRIORITY;
    entry.importance = typeof entry.importance === "number" ? entry.importance : WORLD_CONFIG.DEFAULT_IMPORTANCE;

    if (loreEntries.length === 0 || entry.id !== loreEntries[loreEntries.length - 1].id) {
        loreEntries.push(entry);
        WORLD_DATA.custom.push({
            type: "lore",
            id: entry.id
        });
    }

    return true;
}

function registerTimelineEvent(event) {
    if (!event || !event.id) {
        return false;
    }

    event.canonLayer = event.canonLayer || "HISTORICAL";
    event.source = event.source || WORLD_METADATA.sourceBase + event.id + ".md";

    timelineEvents.push(event);
    WORLD_DATA.timeline.push(event.id);

    return true;
}

function registerStatReaction(reaction) {
    if (!reaction || !reaction.stat) {
        return false;
    }

    reaction.canonLayer = reaction.canonLayer || "ACTIVE";
    reaction.source = reaction.source || WORLD_METADATA.sourceBase + reaction.stat + ".md";

    statReactions.push(reaction);
    WORLD_DATA.custom.push({
        type: "stat_reaction",
        stat: reaction.stat
    });

    return true;
}

function applyWorldDebug() {
    if (!WORLD_CONFIG.DEBUG) {
        return;
    }

    appendIfMissing("scenario", " [WORLD DEBUG] SciFi / CyberDCC2375 loaded. loreEntries: " + loreEntries.length + ", timelineEvents: " + timelineEvents.length + ", statReactions: " + statReactions.length + ".");
}

applyWorldDebug();

function makeEntry(id, category, prefix, keywords, priority, importance, canonLayer, personalityText, scenarioText, bulletText) {
    return {
        id: id,
        category: category,
        prefix: prefix,
        keywords: keywords,
        priority: priority,
        importance: importance,
        source: WORLD_METADATA.sourceBase + "cyberdcc2375/" + id + ".md",
        canonLayer: canonLayer,
        full: {
            personality: personalityText || "",
            scenario: scenarioText || "",
            bullet: bulletText || scenarioText || ""
        },
        summary: {
            personality: "",
            scenario: scenarioText || "",
            bullet: bulletText || scenarioText || ""
        }
    };
}

function keywordMatches(entry, paddedText) {
    var keywords = entry.keywords || [];
    for (var i = 0; i < keywords.length; i += 1) {
        var term = " " + String(keywords[i]).toLowerCase() + " ";
        if (paddedText.indexOf(term) !== -1) {
            return true;
        }
    }
    return false;
}

function applyWorldLore() {
    var chat = context.chat || {};
    var lastMessages = chat.last_messages || [];
    var recent = lastMessages.slice(-WORLD_CONFIG.MENTION_SCAN_DEPTH).map(function (message) {
        return typeof message === "string" ? message : (message.message || "");
    }).join(" ");
    var scan = String(chat.last_message || "") + " " + recent;
    var padded = " " + scan.toLowerCase() + " ";
    var activated = [];
    var i;
    var entry;

    for (i = 0; i < loreEntries.length; i += 1) {
        entry = loreEntries[i];
        if ((entry.canonLayer === "CANDIDATE" || entry.canonLayer === "DEFERRED") || !keywordMatches(entry, padded)) {
            continue;
        }
        activated.push(entry);
    }

    activated.sort(function (a, b) {
        return (b.priority || 0) - (a.priority || 0);
    });

    if (activated.length > WORLD_CONFIG.MAX_ACTIVE_ENTRIES) {
        activated = activated.slice(0, WORLD_CONFIG.MAX_ACTIVE_ENTRIES);
    }

    for (i = 0; i < activated.length; i += 1) {
        entry = activated[i];
        appendIfMissing("scenario", entry.full.scenario || "");
        appendIfMissing("personality", entry.full.personality || "");
    }
}

const CYBER_DCC_2375_LORE = [
    makeEntry("cyberdcc2375_continuity_boundary", "world", "WRD", ["CyberDCC2375", "Cyber DCC 2375", "Solarton 2375", "DCC 2375", "cyberpunk werewolf", "BlackMoon Pack"], 11, 11.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/SciFi/cyberdcc2375/cyberdcc2375_continuity_boundary.md. CyberDCC2375 is the cyberpunk werewolf branch centered on Solarton 2375, BlackMoon Pack law, cybernetic werewolf physiology, corporate surveillance, neon noir romance, and DCC Magnus Douglas. Do not load Modern Los Angeles 2024, London1666, or Iceland827 facts unless the user explicitly requests a timeline crossover.", "CyberDCC2375 is cyberpunk werewolf, separate from Modern, London1666, and Iceland827."),
    makeEntry("candidate_boundary_cyberdcc2375", "world", "WRD", ["AU Boundary", "Alyssa Douglas-Bloodmoon persona", "Iordan R. Vess", "Ves", "Eclipse Noir", "candidate"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/SciFi/cyberdcc2375/candidate_boundary_cyberdcc2375.md. CyberDCC2375 candidate material remains non-active by default. Do not load AU Boundary, optional Alyssa persona, Iordan/Ves dev-test material, or Eclipse Noir unless the user explicitly promotes or requests that branch.", "Candidate CyberDCC2375 material is not active by default."),
    makeEntry("deferred_boundary_cyberdcc2375", "world", "WRD", ["Malachia Household", "Extended Douglas Lines", "Edric Douglas", "Elara Douglas", "Airen Vairë", "Echo Falsified Biometrics", "Angel Moreno patron"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/SciFi/cyberdcc2375/deferred_boundary_cyberdcc2375.md. CyberDCC2375 deferred material is locked unless triggered by an explicit arc: Malachia Household, Extended Douglas Lines, Edric, Elara, Airen, Echo falsified biometrics, or Angel Moreno patronage. Do not load hidden family or biometric-identity secrets by default.", "Deferred CyberDCC2375 family and biometric secrets stay locked."),
    makeEntry("cyberpunk_werewolf_integration", "world", "WRD", ["cyberpunk werewolf", "cyberpunk", "werewolf", "pack", "body", "technology", "surveillance", "identity"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/SciFi/cyberdcc2375/cyberpunk_werewolf_integration.md. CyberDCC2375 integrates cyberpunk dystopia with werewolf pack society: body, implants, scent, rank, surveillance, corporate power, and identity are intertwined. Treat technology as an extension of pack law, not a replacement for it.", "Cyberpunk and werewolf systems are fused through body, pack, and surveillance."),
    makeEntry("blackmoon_pack_law", "world", "WRD", ["BlackMoon Pack Law", "pack law", "Alpha", "Delta", "Beta", "Omega", "clan code", "rank"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/SciFi/cyberdcc2375/blackmoon_pack_law.md. BlackMoon Pack Law governs rank, obligation, challenge, scent, obedience, and clan code. Use Alpha/Delta/Beta/Omega as active social law in CyberDCC2375, not as Modern human hierarchy.", "BlackMoon Pack Law governs rank, obedience, and clan code."),
    makeEntry("cybernetic_werewolf_physiology", "world", "WRD", ["cybernetic werewolf", "implants", "neural sensors", "shift", "pheromones", "silver vulnerability", "hybrid body"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/SciFi/cyberdcc2375/cybernetic_werewolf_physiology.md. Cybernetic Werewolf Physiology combines werewolf biology with implants, neural sensors, shift control, pheromonal signaling, silver vulnerability, and hybrid body management. Do not assign implants, rank, body, sex, or physiology to {{user}} unless established by the user.", "Cybernetic werewolves fuse biology, implants, pheromones, and silver vulnerability."),
    makeEntry("user_agency_rule_cyberdcc2375", "world", "WRD", ["user agency", "do not assign", "user rank", "user body", "user physiology", "user biography", "player persona"], 11, 11.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/SciFi/cyberdcc2375/user_agency_rule_cyberdcc2375.md. Do not invent {{user}} sex, body, rank, physiology, biography, implants, species, or pack status. Treat all user identity details as player-owned unless explicitly established.", "Never assign {{user}} body, rank, species, implants, or biography."),
    makeEntry("corporate_control_and_surveillance", "world", "WRD", ["corporate control", "surveillance", "biometric", "identity market", "body market", "DCC", "corporate houses"], 9, 9.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/SciFi/cyberdcc2375/corporate_control_and_surveillance.md. Corporate control treats body, identity, and freedom as markets. Use biometric surveillance, contracts, debt, access control, and data leverage as pressure systems.", "Corporate control monetizes bodies, identities, and freedom."),
    makeEntry("neon_noir_romance", "world", "WRD", ["neon noir", "romance", "vulnerability", "personal choice", "romantic tension"], 8, 8.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/SciFi/cyberdcc2375/neon_noir_romance.md. Neon Noir Romance frames desire, vulnerability, and personal choice through rain, neon, surveillance, and social risk. Keep romance atmospheric and choice-driven, not automatic.", "Neon noir romance is atmospheric, vulnerable, and choice-driven."),
    makeEntry("silver_weakness", "world", "WRD", ["silver", "silver weakness", "silver weapon", "silver vulnerability"], 8, 8.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/SciFi/cyberdcc2375/silver_weakness.md. Silver damages werewolves and can be used in weapons, restraints, bullets, or surgical tools. Treat silver as a serious biological vulnerability.", "Silver damages werewolves."),
    makeEntry("blackmoon_district", "location", "LOC", ["BlackMoon District", "BlackMoon", "pack district", "territory"], 9, 9.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/SciFi/cyberdcc2375/blackmoon_district.md. BlackMoon District is the territory and social center of the BlackMoon Pack, blending pack law, nightlife, surveillance, and territorial pride.", "BlackMoon District is the pack territory and social center."),
    makeEntry("neon_undercity", "location", "LOC", ["Neon Undercity", "undercity", "clubs", "tunnels", "black markets"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/SciFi/cyberdcc2375/neon_undercity.md. Neon Undercity is a subterranean network of clubs, tunnels, markets, contacts, and off-grid transactions beneath Solarton’s official city.", "Neon Undercity is the off-grid club and market layer."),
    makeEntry("oldtown", "location", "LOC", ["Oldtown", "Old Town", "historic district"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/SciFi/cyberdcc2375/oldtown.md. Oldtown is the historical and political district, layered with old institutions, old rivalries, and formal power.", "Oldtown carries historical and political weight."),
    makeEntry("uptown", "location", "LOC", ["Uptown", "corporate uptown", "high society"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/SciFi/cyberdcc2375/uptown.md. Uptown is the corporate and high-society district, where wealth, polish, and institutional power shape public behavior.", "Uptown is corporate polish and high society."),
    makeEntry("dockside", "location", "LOC", ["Dockside", "docks", "port", "logistics"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/SciFi/cyberdcc2375/dockside.md. Dockside is the port, logistics, and trafficking zone, useful for smuggling, arrivals, departures, and border pressure.", "Dockside is port logistics and trafficking."),
    makeEntry("ironworks", "location", "LOC", ["Ironworks", "industrial district", "manufacturing"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/SciFi/cyberdcc2375/ironworks.md. Ironworks is the industrial and manufacturing district, marked by factories, workshops, labor politics, and heavy infrastructure.", "Ironworks is industry, labor, and manufacturing."),
    makeEntry("blackmoon_pack", "organization", "ORG", ["BlackMoon Pack", "Black Moon Pack", "pack"], 10, 10.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/SciFi/cyberdcc2375/blackmoon_pack.md. BlackMoon Pack is the dominant pack faction in CyberDCC2375. It enforces rank, scent, territory, and pack law through social pressure and organized power.", "BlackMoon Pack is the dominant pack faction."),
    makeEntry("cyber_syndicates", "organization", "ORG", ["Cyber Syndicates", "syndicates", "cyber crime", "undercity syndicate"], 8, 8.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/SciFi/cyberdcc2375/cyber_syndicates.md. Cyber Syndicates are power blocs operating through black-market tech, favors, debt, and undercity leverage.", "Cyber Syndicates control black-market tech and debt."),
    makeEntry("corporate_houses", "organization", "ORG", ["Corporate Houses", "corporations", "corporate power", "DCC", "house politics"], 8, 8.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/SciFi/cyberdcc2375/corporate_houses.md. Corporate Houses are economic dynasties and institutional powers that shape access, contracts, surveillance, and public legitimacy.", "Corporate Houses shape access, contracts, and legitimacy."),
    makeEntry("angel_and_co_cyberdcc", "organization", "ORG", ["Angel&Co", "Angel & Co", "fashion network", "fashion patron", "Angel Moreno"], 7, 7.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/SciFi/cyberdcc2375/angel_and_co_cyberdcc.md. Angel&Co is a fashion and operational network tied to Angel Moreno, blending style, patronage, information, and social leverage.", "Angel&Co blends fashion, patronage, and information."),
    makeEntry("vua", "organization", "ORG", ["VUA", "Vampire Undead Association", "vampire association"], 7, 7.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/SciFi/cyberdcc2375/vua.md. VUA is the Vampire/Undead Association, a political body for vampire and undead interests within Solarton’s power structure.", "VUA represents vampire and undead political interests."),
    makeEntry("sentinels", "organization", "ORG", ["Sentinels", "security guardians", "guardians", "ancient guardians"], 7, 7.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/SciFi/cyberdcc2375/sentinels.md. Sentinels are security forces and guardians who operate around ancient threats, protected sites, and high-risk interventions.", "Sentinels guard high-risk sites and ancient threats."),
    makeEntry("cybernetic_werewolf_species", "bestiary", "BST", ["cybernetic werewolf", "werewolf species", "werewolf"], 10, 10.0, "ACTIVE", "", " [ACTIVE] BST Source: 2_Export/World/SciFi/cyberdcc2375/cybernetic_werewolf_species.md. Cybernetic Werewolves are the central species of CyberDCC2375, blending werewolf biology with implants, sensors, shift management, and pack politics.", "Cybernetic werewolves are the central species."),
    makeEntry("vampire_species", "bestiary", "BST", ["vampire", "vampires", "undead"], 6, 6.0, "ACTIVE", "", " [ACTIVE] BST Source: 2_Export/World/SciFi/cyberdcc2375/vampire_species.md. Vampires are a political species in CyberDCC2375, organized through VUA and elite social power.", "Vampires are political undead actors."),
    makeEntry("succubus_species", "bestiary", "BST", ["succubus", "succubi", "social species"], 5, 5.0, "ACTIVE", "", " [ACTIVE] BST Source: 2_Export/World/SciFi/cyberdcc2375/succubus_species.md. Succubi function as a social and support species within CyberDCC2375’s nightlife and intimacy economies.", "Succubi support nightlife and intimacy economies."),
    makeEntry("vax_species", "bestiary", "BST", ["Vax", "Vax species", "rare species"], 5, 5.0, "ACTIVE", "", " [ACTIVE] BST Source: 2_Export/World/SciFi/cyberdcc2375/vax_species.md. Vax is a rare species category in CyberDCC2375, often handled through brokers and specialist networks.", "Vax is a rare species category."),
    makeEntry("lamia_species", "bestiary", "BST", ["Lamia", "lamia", "rare species"], 5, 5.0, "ACTIVE", "", " [ACTIVE] BST Source: 2_Export/World/SciFi/cyberdcc2375/lamia_species.md. Lamia is a rare species category with social visibility, fashion relevance, and underworld connections.", "Lamia is a rare species with fashion and underworld relevance."),
    makeEntry("anthropomorphic_shark_species", "bestiary", "BST", ["anthropomorphic shark", "shark species", "rare species"], 5, 5.0, "ACTIVE", "", " [ACTIVE] BST Source: 2_Export/World/SciFi/cyberdcc2375/anthropomorphic_shark_species.md. Anthropomorphic sharks are a rare species category in CyberDCC2375’s broader nonhuman society.", "Anthropomorphic sharks are a rare nonhuman species."),
    makeEntry("douglas_bloodmoon_core_lineage_cyberdcc", "family", "FAM", ["Douglas-Bloodmoon Core Lineage", "Erik Douglas", "Nixara", "Wulfnic", "Malachia", "Noah", "Jasper", "Alyssa", "Logan"], 11, 11.0, "ACTIVE", "", " [ACTIVE] FAM Source: 2_Export/World/SciFi/cyberdcc2375/douglas_bloodmoon_core_lineage_cyberdcc.md. The CyberDCC2375 Douglas-Bloodmoon core lineage includes Erik, Nixara, Wulfnic, Malachia, Noah, Jasper, Alyssa or a player-defined heir, and Logan. Treat this as the cyberpunk werewolf family line, separate from Modern 2024 and Iceland827.", "Douglas-Bloodmoon core lineage is active in CyberDCC2375."),
    makeEntry("erik_douglas_cyberdcc", "npc", "NPC", ["Erik Douglas", "CEO Alpha", "father", "Alpha CEO"], 11, 11.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/erik_douglas_cyberdcc.md. Erik Douglas is the CEO Alpha and father figure in CyberDCC2375. He combines corporate command, Alpha authority, and paternal control.", "Erik is CEO Alpha and father."),
    makeEntry("nixara_douglas_bloodmoon_cyberdcc", "npc", "NPC", ["Nixara Douglas-Bloodmoon", "Nixara", "mother", "deceased mother"], 10, 10.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/nixara_douglas_bloodmoon_cyberdcc.md. Nixara Douglas-Bloodmoon is the deceased mother and family memory in CyberDCC2375. Do not confuse her with Modern 2024 or Iceland827 Nixara unless explicitly crossing timelines.", "Nixara is CyberDCC2375’s deceased mother-memory."),
    makeEntry("wulfnic_bloodmoon_cyberdcc", "npc", "NPC", ["Wulfnic Bloodmoon", "Wulfnic", "Patriarch Enigma", "Enigma"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/wulfnic_bloodmoon_cyberdcc.md. Wulfnic Bloodmoon is the Patriarch Enigma: ancient, opaque, and politically significant within the cyberpunk werewolf lineage.", "Wulfnic is the Patriarch Enigma."),
    makeEntry("malachia_douglas_bloodmoon_cyberdcc", "npc", "NPC", ["Malachia Douglas-Bloodmoon", "Malachia", "The Wall", "Alpha eldest brother"], 10, 10.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/malachia_douglas_bloodmoon_cyberdcc.md. Malachia Douglas-Bloodmoon is The Wall, Alpha, and eldest brother. He is protective, physical, disciplined, and central to family enforcement.", "Malachia is The Wall and eldest Alpha brother."),
    makeEntry("noah_douglas_bloodmoon_cyberdcc", "npc", "NPC", ["Noah Douglas-Bloodmoon", "Noah", "Velvet Glove", "Delta"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/noah_douglas_bloodmoon_cyberdcc.md. Noah Douglas-Bloodmoon is the Velvet Glove and Delta: legal, diplomatic, polished, and socially lethal.", "Noah is Velvet Glove and Delta."),
    makeEntry("jasper_douglas_bloodmoon_cyberdcc", "npc", "NPC", ["Jasper Douglas-Bloodmoon", "Jasper", "Rebel hacker", "DJ"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/jasper_douglas_bloodmoon_cyberdcc.md. Jasper Douglas-Bloodmoon is the rebel hacker and DJ, using music, code, and chaos to resist family control.", "Jasper is rebel hacker and DJ."),
    makeEntry("logan_douglas_cyberdcc", "npc", "NPC", ["Logan Douglas", "Logan", "Uncle safe harbor"], 8, 8.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/logan_douglas_cyberdcc.md. Logan Douglas is the safe-harbor uncle, offering practical refuge and emotional decompression outside strict family command.", "Logan is safe-harbor uncle."),
    makeEntry("scarlett_cyberdcc", "npc", "NPC", ["Scarlett", "Succubus best friend", "best friend"], 7, 7.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/scarlett_cyberdcc.md. Scarlett is a succubus best friend and social support figure, useful for intimacy, gossip, and emotional grounding.", "Scarlett is succubus best friend and support."),
    makeEntry("marcus_vanguard_lieutenant", "npc", "NPC", ["Marcus Vanguard Lieutenant", "Marcus", "Vanguard", "bodyguard"], 7, 7.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/marcus_vanguard_lieutenant.md. Marcus Vanguard Lieutenant is a Vanguard bodyguard, representing organized protection and enforcement.", "Marcus is Vanguard bodyguard."),
    makeEntry("angelo_moreno_cyberdcc", "npc", "NPC", ["Visconte Angelo Moreno", "Angel Moreno", "Angel", "vampire lord", "fashion patron"], 8, 8.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/angelo_moreno_cyberdcc.md. Visconte Angelo Moreno / Angel Moreno is a vampire lord and fashion patron, operating through style, status, and patronage.", "Angel Moreno is vampire lord and fashion patron."),
    makeEntry("prof_helena_weiss", "npc", "NPC", ["Prof. Helena Weiss", "Helena Weiss", "Alpha psionica", "mentor"], 7, 7.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/prof_helena_weiss.md. Prof. Helena Weiss is an Alpha psionic mentor, useful for training, psychic pressure, and disciplined guidance.", "Helena Weiss is Alpha psionic mentor."),
    makeEntry("zeera", "npc", "NPC", ["Zeera", "Vax broker", "broker"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/zeera.md. Zeera is a Vax broker, connecting rare species markets, favors, and underground exchange.", "Zeera is Vax broker."),
    makeEntry("vincent_campbell", "npc", "NPC", ["Vincent Campbell", "Vice president VUA", "VUA"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/vincent_campbell.md. Vincent Campbell is a vice president of VUA, representing vampire institutional politics.", "Vincent Campbell represents VUA politics."),
    makeEntry("bianca_rossi", "npc", "NPC", ["Bianca Rossi", "Alpha Paradise East"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/bianca_rossi.md. Bianca Rossi is Alpha of Paradise East, a regional pack power holder.", "Bianca Rossi is Alpha Paradise East."),
    makeEntry("elena_ravencrest", "npc", "NPC", ["Elena Ravencrest", "Pack enforcer"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/elena_ravencrest.md. Elena Ravencrest is a pack enforcer, embodying discipline, coercion, and pack consequences.", "Elena Ravencrest enforces pack consequences."),
    makeEntry("dr_silas_moonwhisper", "npc", "NPC", ["Dr. Silas Moonwhisper", "Pack healer"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/dr_silas_moonwhisper.md. Dr. Silas Moonwhisper is a pack healer, bridging medicine, biology, and pack welfare.", "Silas Moonwhisper is pack healer."),
    makeEntry("federico_riki_savini", "npc", "NPC", ["Federico Riki Savini", "Spokesperson solitari"], 5, 5.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/federico_riki_savini.md. Federico Riki Savini is a spokesperson for solitari, representing independent werewolf interests.", "Federico represents solitari interests."),
    makeEntry("dominic_chen", "npc", "NPC", ["Dominic Chen", "Alpha Paradise West"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/dominic_chen.md. Dominic Chen is Alpha of Paradise West, a regional pack power holder.", "Dominic Chen is Alpha Paradise West."),
    makeEntry("darius_vale", "npc", "NPC", ["Darius Vale", "Shadow protector"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/darius_vale.md. Darius Vale is a shadow protector, operating through secrecy and protective intervention.", "Darius Vale is a shadow protector."),
    makeEntry("jake_jacobus_draconarius", "npc", "NPC", ["Jake Jacobus Draconarius", "Sentinel ancient guardian"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/jake_jacobus_draconarius.md. Jake Jacobus Draconarius is a Sentinel ancient guardian, linking security and ancient-threat response.", "Jake is Sentinel ancient guardian."),
    makeEntry("dr_elena_cross", "npc", "NPC", ["Dr. Elena Cross", "Neuropsychiatrist mentor"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/dr_elena_cross.md. Dr. Elena Cross is a neuropsychiatrist mentor, useful for trauma, cognition, and clinical guidance.", "Elena Cross is neuropsychiatrist mentor."),
    makeEntry("kai_shade_nakamura", "npc", "NPC", ["Kai Shade Nakamura", "Spirit hunter rival"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/kai_shade_nakamura.md. Kai Shade Nakamura is a spirit hunter rival, adding supernatural investigation and competitive pressure.", "Kai is spirit hunter rival."),
    makeEntry("talia_grimwood", "npc", "NPC", ["Talia Grimwood", "Vampire confidante"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/talia_grimwood.md. Talia Grimwood is a vampire confidante, useful for secrets, trust, and elite undead social access.", "Talia is vampire confidante."),
    makeEntry("sierra_sisi_cyberdcc", "npc", "NPC", ["Sierra SiSi", "SiSi", "Lamia fashion PR"], 5, 5.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/sierra_sisi_cyberdcc.md. Sierra SiSi is a Lamia fashion PR figure, linking style, publicity, and social performance.", "Sierra SiSi is Lamia fashion PR."),
    makeEntry("isobel_blackwater", "npc", "NPC", ["Isobel Blackwater", "Controller Dockside"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/isobel_blackwater.md. Isobel Blackwater controls Dockside, tying port logistics to power and trafficking networks.", "Isobel controls Dockside."),
    makeEntry("vito_scar_marino", "npc", "NPC", ["Vito Scar Marino", "Controller Ironworks"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/vito_scar_marino.md. Vito Scar Marino controls Ironworks, tying industry to labor, manufacturing, and territorial influence.", "Vito controls Ironworks."),
    makeEntry("marcus_mark_oconnor", "npc", "NPC", ["Marcus Mark O'Connor", "Controller Oldtown"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/SciFi/cyberdcc2375/marcus_mark_oconnor.md. Marcus Mark O'Connor controls Oldtown, tying historical politics to street authority.", "Marcus O'Connor controls Oldtown."),
    makeEntry("nixara_death_cyberdcc", "lore", "LOR", ["Nixara Death", "Nixara died", "childbirth", "trauma"], 10, 10.0, "HISTORICAL", "", " [HISTORICAL] LOR Source: 2_Export/World/SciFi/cyberdcc2375/nixara_death_cyberdcc.md. Nixara’s death in childbirth is the founding trauma of the CyberDCC2375 family line. Use it as historical cause and emotional wound, not as a default active scene.", "Nixara’s death is the founding trauma."),
    makeEntry("douglas_historical_origins_cyberdcc", "lore", "LOR", ["Douglas Historical Origins", "1021", "Viking expedition", "Wulfnic Bloodmoon", "Zefir", "Ut", "California foundation"], 9, 9.0, "HISTORICAL", "", " [HISTORICAL] LOR Source: 2_Export/World/SciFi/cyberdcc2375/douglas_historical_origins_cyberdcc.md. Douglas historical origins trace through 1021, a Viking expedition, Wulfnic Bloodmoon, Zefir, Ut, and the California foundation. Use this as deep lineage, not as active scene unless the user requests ancestry or flashback.", "Douglas origins run from 1021 to the California foundation."),
    makeEntry("blood_moon_festival", "lore", "LOR", ["Blood Moon Festival", "Blackwood festival", "quinquennial festival"], 5, 5.0, "CULTURAL", "", " [CULTURAL] LOR Source: 2_Export/World/SciFi/cyberdcc2375/blood_moon_festival.md. The Blood Moon Festival is a quinquennial Blackwood cultural event. Treat it as cultural ritual unless explicitly activated by scene or user request.", "Blood Moon Festival is a quinquennial Blackwood ritual."),
    makeEntry("full_moon_market", "lore", "LOR", ["Full Moon Market", "Solarton Square", "monthly market"], 5, 5.0, "CULTURAL", "", " [CULTURAL] LOR Source: 2_Export/World/SciFi/cyberdcc2375/full_moon_market.md. The Full Moon Market is a monthly Solarton Square cultural market. Use it for atmosphere, trade, gossip, and ritual economy when relevant.", "Full Moon Market is a monthly Solarton Square market."),
    makeEntry("fenrir_bloodline_myth", "lore", "LOR", ["Fenrir Bloodline Myth", "Fenrir", "primordial wolf"], 5, 5.0, "CULTURAL", "", " [CULTURAL] LOR Source: 2_Export/World/SciFi/cyberdcc2375/fenrir_bloodline_myth.md. The Fenrir Bloodline Myth is a primordial wolf myth tied to werewolf identity. Treat it as mythic culture unless the scene explicitly elevates it.", "Fenrir myth frames werewolf bloodline identity."),
    makeEntry("solarton_underground_forum", "organization", "ORG", ["Solarton Underground Forum", "Underground Forum", "forum", "gossip", "betting"], 5, 5.0, "CULTURAL", "", " [CULTURAL] ORG Source: 2_Export/World/SciFi/cyberdcc2375/solarton_underground_forum.md. The Solarton Underground Forum is a secret digital forum for gossip, betting, and social rumor. Use it as cultural infrastructure, not as default omniscient narration.", "Underground Forum carries gossip and betting culture.")
];

CYBER_DCC_2375_LORE.forEach(function (entry) {
    registerLoreEntry(entry);
});

applyWorldLore();

// SCRIPT END
