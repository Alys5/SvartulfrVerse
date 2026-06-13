/**
 * SVARTULFRVERSE WORLD SCRIPT - SCIFI
 *
 * MacroCosmo placeholder per SciFi / DCC 2375.
 * Questo file è predisposto per l'inserimento dei dati lore, timeline e stat.
 * Compatibile con ES5 JanitorAI Scripts API.
 */

if (typeof context === "undefined") {
    return;
}

context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario = context.character.scenario || "";
context.character.example_dialogs = context.character.example_dialogs || "";

var WORLD_METADATA = {
    worldId: "scifi_dcc_2375",
    displayName: "SciFi",
    setting: "DCC 2375",
    genre: "futuro prossimo distopico high tech",
    rules: "no magia, demi-human e alieni",
    sourceBase: "database/world/scifi/",
    rootFolder: "3_World/SciFi/"
};

var WORLD_CONFIG = {
    MAX_TOKENS: 1200,
    MENTION_SCAN_DEPTH: 6,
    MAX_ACTIVE_ENTRIES: 12,
    DEFAULT_PRIORITY: 10,
    DEFAULT_IMPORTANCE: 10.0,
    DEBUG: false
};

var WORLD_DATA = {
    locations: [],
    organizations: [],
    cultures: [],
    history: [],
    timeline: [],
    characters: [],
    secrets: [],
    custom: []
};

var loreEntries = [];
var timelineEvents = [];
var statReactions = [];
var activatedWorldEntryIds = [];

function appendIfMissing(field, text) {
    if (!text) {
        return;
    }
    if (context.character[field].indexOf(text) === -1) {
        context.character[field] += text;
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

    appendIfMissing("scenario", " [WORLD DEBUG] SciFi placeholder loaded. loreEntries: " + loreEntries.length + ", timelineEvents: " + timelineEvents.length + ", statReactions: " + statReactions.length + ".");
}

applyWorldDebug();

// Inserire qui le lore entry concrete con source e canonLayer.
// var loreEntries = [
//     {
//         id: "scifi_location_0x01",
//         category: "location",
//         prefix: "LOC",
//         keywords: ["DCC", "distretto"],
//         priority: 12,
//         importance: 10.0,
//         source: "database/world/scifi/scifi_location_0x01.md",
//         canonLayer: "ACTIVE",
//         full: {
//             personality: "",
//             scenario: " [ACTIVE] LOC Source: database/world/scifi/scifi_location_0x01.md. Inserire fatti concreti qui."
//         }
//     }
// ];

// SCRIPT END
