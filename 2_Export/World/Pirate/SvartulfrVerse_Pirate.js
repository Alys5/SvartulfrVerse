/**
 * SVARTULFRVERSE WORLD SCRIPT - PIRATE
 *
 * MacroCosmo placeholder per Pirate / London 1666.
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
    worldId: "pirate_london_1666",
    displayName: "Pirate",
    setting: "London 1666",
    genre: "storico mercantile-pirata",
    rules: "Londra 1666, rotte coloniali, Merchant House Douglas, Lord Cornelius Vance Douglas, port politics, charters, privateers, rival merchant houses.",
    sourceBase: "2_Export/World/Pirate/",
    rootFolder: "2_Export/World/Pirate/"
};

const WORLD_CONFIG = {
    MAX_TOKENS: 1600,
    MENTION_SCAN_DEPTH: 8,
    MAX_ACTIVE_ENTRIES: 16,
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

    appendIfMissing("scenario", " [WORLD DEBUG] Pirate / London 1666 loaded. loreEntries: " + loreEntries.length + ", timelineEvents: " + timelineEvents.length + ", statReactions: " + statReactions.length + ".");
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
        source: WORLD_METADATA.sourceBase + "london1666/" + id + ".md",
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

const LONDON_1666_LORE = [
    makeEntry("london1666_continuity_boundary", "world", "WRD", ["London1666", "London 1666", "Pirate", "pirate mercantile", "Douglas 1666", "Cornelius", "Merchant House Douglas"], 11, 11.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Pirate/london1666/london1666_continuity_boundary.md. London1666 is a historical pirate-mercantile branch centered on Lord Cornelius Vance Douglas, Merchant House Douglas, charters, ports, privateers, and colonial trade. Do not load Modern Los Angeles 2024 DCC Security, Solarton Urban supernatural lore, or Regency early-19th-century facts unless explicitly crossing timelines.", "London1666: historical pirate-mercantile branch, separate from Modern/Urban/Regency."),
    makeEntry("regency_legacy_boundary", "world", "WRD", ["Regency", "Regency legacy", "early 19th century", "Regency visual DNA", "gas lamp", "ballroom", "drawing room politics"], 7, 7.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Pirate/london1666/regency_legacy_boundary.md. Regency legacy material is not active by default in London1666 because it belongs to an early-19th-century social world. Reuse it only as explicit crossover or candidate material, not as default 1666 canon.", "Regency legacy is candidate/crossover material, not default 1666 canon."),
    makeEntry("douglas_commercial_lineage_london1666", "lore", "LOR", ["Douglas commercial lineage", "Merchant House Douglas", "Lord Cornelius", "1666", "colonial trading", "Douglas history"], 9, 9.0, "HISTORICAL", "", " [HISTORICAL] LOR Source: 2_Export/World/Pirate/london1666/douglas_commercial_lineage_london1666.md. Merchant House Douglas was founded in England in 1666 by Lord Cornelius Vance Douglas and later expanded into the Douglas Colonial Trading Company in the 1700s. Magnus Douglas belongs to a sci-fi timeline only and is not the founder of the original enterprise.", "Douglas commercial lineage: founded 1666, expanded later through DCC."),
    makeEntry("lord_cornelius_vance_douglas", "npc", "NPC", ["Lord Cornelius Vance Douglas", "Cornelius Douglas", "Cornelius", "founder", "colonial governor", "merchant lord"], 10, 10.0, "HISTORICAL", "", " [HISTORICAL] NPC Source: 2_Export/World/Pirate/london1666/lord_cornelius_vance_douglas.md. Lord Cornelius Vance Douglas is the historical founder of Merchant House Douglas in 1666: colonial governor, merchant lord, and fleet-backed power broker. His public fortune comes from trade, charters, warehouses, and imperial contracts; rumors suggest privateering, piracy, or opportunistic maritime seizure contributed to his wealth.", "Cornelius: founder, governor, merchant lord, and piracy-shadowed power broker."),
    makeEntry("merchant_house_douglas", "organization", "ORG", ["Merchant House Douglas", "Douglas merchant house", "merchant house", "trade house", "Douglas family trade", "Cornelius Douglas"], 9, 9.0, "HISTORICAL", "", " [HISTORICAL] ORG Source: 2_Export/World/Pirate/london1666/merchant_house_douglas.md. Merchant House Douglas is the respectable public face of the Douglas commercial lineage: a merchant house founded in England in 1666 by Lord Cornelius Vance Douglas. It coordinates credit, cargo, contracts, political favors, and colonial logistics while maintaining a mask of aristocratic legality.", "Merchant House Douglas: respectable 1666 trade and logistics front."),
    makeEntry("douglas_colonial_trading_company", "organization", "ORG", ["Douglas Colonial Trading Company", "DCC", "colonial trading company", "Douglas trade company", "colonial commerce", "1700s"], 9, 9.0, "HISTORICAL", "", " [HISTORICAL] ORG Source: 2_Export/World/Pirate/london1666/douglas_colonial_trading_company.md. The Douglas Colonial Trading Company is the 1700s expansion of Merchant House Douglas into a colonial trading and governance machine. In a strict 1666 founding scene, treat it as later lineage rather than the founding entity.", "DCC: later 1700s expansion of Merchant House Douglas."),
    makeEntry("colonial_trade_governance_tradition", "world", "WRD", ["colonial trade", "governance tradition", "trade governance", "imperial contracts", "ports", "customs", "colonial administration", "charters"], 8, 8.0, "HISTORICAL", "", " [HISTORICAL] WRD Source: 2_Export/World/Pirate/london1666/colonial_trade_governance_tradition.md. The Douglas line builds power by fusing trade, governance, and logistics. Treat Douglas authority as a system of contracts, charters, customs access, warehouse control, and political favors rather than simple retail commerce.", "Douglas power fuses trade, governance, contracts, customs, and logistics."),
    makeEntry("piracy_shadow", "world", "WRD", ["piracy shadow", "Cornelius piracy", "privateering", "letters of marque", "piracy", "privateers", "maritime seizure", "seized cargo"], 8, 8.0, "HISTORICAL", "", " [HISTORICAL] WRD Source: 2_Export/World/Pirate/london1666/piracy_shadow.md. Part of Cornelius's fortune may derive from piracy, privateering, or opportunistic maritime seizure disguised as legitimate trade. Maintain this as historical rumor with material consequences: hidden ledgers, seized cargo, compromised officials, and enemies at sea.", "Piracy/privateering rumors shadow the Douglas fortune."),
    makeEntry("fortune_of_cornelius", "lore", "LOR", ["fortune of Cornelius", "Cornelius wealth", "Douglas wealth", "trade fortune", "pirate fortune", "hidden ledgers"], 8, 8.0, "HISTORICAL", "", " [HISTORICAL] LOR Source: 2_Export/World/Pirate/london1666/fortune_of_cornelius.md. Cornelius's public fortune is attributed to trade, charters, and colonial governance. His private fortune is suspected to include piracy, ransom, seized cargoes, and maritime deals too dirty for official ledgers. Use this contradiction as a source of family myth, leverage, and scandal.", "Cornelius's wealth has public legitimacy and private suspicion."),
    makeEntry("respectability_mask", "lore", "LOR", ["respectability mask", "Douglas respectability", "legal mask", "public legitimacy", "respectable trade", "aristocratic mask"], 7, 7.0, "HISTORICAL", "", " [HISTORICAL] LOR Source: 2_Export/World/Pirate/london1666/respectability_mask.md. The Douglas line maintains a public mask of legality, refinement, and service to empire above aggressive commercial practices. Treat respectability as armor: it protects the family from scandal but also hides debt, violence, and compromised deals.", "Respectability protects and conceals Douglas power."),
    makeEntry("sixteen_sixty_six_pirate_mercantile_atmosphere", "world", "WRD", ["1666", "pirate mercantile", "port", "fleet", "merchant fleet", "corsair", "privateer", "colonial sea routes", "letters of marque", "governors", "charters"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Pirate/london1666/sixteen_sixty_six_pirate_mercantile_atmosphere.md. The 1666 atmosphere should feel pirate-mercantile: governors, charters, letters of marque, privateers, merchant fleets, dark-wood cabins, sealed documents, port politics, contraband, and sea danger. Keep the setting historical rather than fantasy.", "1666: pirate-mercantile, political, maritime, and historical."),
    makeEntry("colonial_ports_and_warehouses", "location", "LOC", ["colonial ports", "warehouses", "docks", "customs house", "wharves", "bonded warehouse", "port politics", "counting rooms", "quays"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Pirate/london1666/colonial_ports_and_warehouses.md. Colonial ports and warehouses are the operational spine of the Douglas trade empire: docks, customs houses, bonded warehouses, counting rooms, loading yards, and guarded quays. Use them for cargo disputes, bribes, seizures, rumors of piracy, and rival merchant pressure.", "Ports and warehouses: operational spine of Douglas trade."),
    makeEntry("colonial_governors_and_crown_officials", "organization", "ORG", ["colonial governor", "crown officials", "imperial officials", "customs officers", "colonial administration", "governor", "crown"], 7, 7.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/Pirate/london1666/colonial_governors_and_crown_officials.md. Colonial governors and Crown officials form the bureaucratic layer that Cornelius and the DCC must flatter, bribe, evade, or dominate. Treat them as gatekeepers of charters, customs access, legal immunity, and political protection.", "Colonial governors and officials gatekeep charters and customs access."),
    makeEntry("rival_merchant_houses", "organization", "ORG", ["rival merchant houses", "competing companies", "trade rivals", "merchant cartel", "commercial rivals", "rival houses"], 7, 7.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/Pirate/london1666/rival_merchant_houses.md. Rival merchant houses compete with Douglas interests through price wars, port access, political favors, sabotage, and accusations of smuggling or piracy. Treat commercial rivalry as a social and economic battlefield.", "Rival merchant houses wage price, port, and reputation wars."),
    makeEntry("seven_hills_estate_london1666", "location", "LOC", ["Seven Hills", "Seven Hills Estate", "heritage site", "training camp", "Douglas ancestral", "Georgian villa", "Solarton Estate", "Pack House", "1740"], 8, 8.0, "HISTORICAL", "", " [HISTORICAL] LOC Source: 2_Export/World/Pirate/london1666/seven_hills_estate_london1666.md. Seven Hills Estate is a Douglas ancestral heritage site, Georgian villa, woodland reserve, and training camp. It was founded around 1740 as a colonial negotiation post and regional headquarters, then evolved into a country house and training ground for Douglas heirs and retainers.", "Seven Hills: later Douglas heritage site, founded around 1740."),
    makeEntry("seven_hills_interior_structures", "location", "LOC", ["Seven Hills interior", "great hall", "governor's study", "family quarters", "wine cellar", "library", "ring", "training structure"], 7, 7.0, "HISTORICAL", "", " [HISTORICAL] LOC Source: 2_Export/World/Pirate/london1666/seven_hills_interior_structures.md. Seven Hills contains a Great Hall, Governor's Study, family quarters, wine cellar, library, woodland reserve, and training ring. Use interiors for inheritance rituals, private negotiations, archive research, combat training, and family power displays.", "Seven Hills interiors: hall, study, library, cellar, and training ring."),
    makeEntry("sea_threats_london1666", "bestiary", "BST", ["sea threats", "pirates", "privateers", "storms", "mutiny", "corsairs", "hostile ships", "reefs"], 6, 6.0, "HISTORICAL", "", " [HISTORICAL] BST Source: 2_Export/World/Pirate/london1666/sea_threats_london1666.md. Sea threats include independent pirates, privateers, storms, mutiny, hostile ships, reefs, and opportunistic captains. Use them to pressure Douglas fleets and blur the line between legitimate trade, privateering, and piracy.", "Sea threats: pirates, privateers, storms, mutiny, reefs."),
    makeEntry("heirs_of_cornelius", "npc", "NPC", ["heirs of Cornelius", "Douglas heirs", "Cornelius descendants", "family heirs", "commercial heirs", "Douglas descendants"], 6, 6.0, "HISTORICAL", "", " [HISTORICAL] NPC Source: 2_Export/World/Pirate/london1666/heirs_of_cornelius.md. Cornelius's heirs inherit wealth, contracts, enemies, compromised ledgers, and the burden of maintaining the Douglas respectability mask. Treat them as descendants of both legitimate trade and darker maritime gains.", "Cornelius's heirs inherit wealth, enemies, ledgers, and the respectability burden.")
];

LONDON_1666_LORE.forEach(function (entry) {
    registerLoreEntry(entry);
});

applyWorldLore();

// SCRIPT END
