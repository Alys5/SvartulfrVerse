/**
 * SVARTULFRVERSE WORLD TEMPLATE
 *
 * MacroCosmo master-template per lore estesa, timeline globale e adattazione
 * dinamica del testo. Questo file non gestisce memoria persistente: delega lo
 * stato all'Engine e usa solo le informazioni fornite dal runtime context.
 *
 * Compatibile con ES5 JanitorAI Scripts API.
 */

if (typeof context === "undefined") {
    return;
}

context.character = context.character || {};
context.character.personality = context.character.personality || "";
context.character.scenario = context.character.scenario || "";
context.character.example_dialogs = context.character.example_dialogs || "";

var chat = context.chat || {};
var lastMessage = (chat.last_message || "").toLowerCase();
var lastResponse = chat.last_message || "";
var messageCount = chat.message_count || 0;
var recentMessages = chat.last_messages || [];

// ===== FEATURE TOGGLES =====
var FEATURES = {
    COMPLEX_LOREBOOK: true,
    ADAPTIVE_LOREBOOK: true,
    TIMELINE_FILTERS: true,
    STAT_FILTERS: true,
    CASCADE_ACTIVATION: true,
    DEBUG_MODE: false
};

var WORLD_CONFIG = {
    MAX_TOKENS: 1200,
    MENTION_SCAN_DEPTH: 6,
    MAX_ACTIVE_ENTRIES: 12,
    DEFAULT_PRIORITY: 10,
    DEFAULT_IMPORTANCE: 10.0,
    FULL_THRESHOLD: 0.72,
    SUMMARY_THRESHOLD: 0.58,
    DEBUG: false
};

var activatedWorldEntryIds = [];

// ===== LORE ENTRIES =====
// Ogni entry deve includere source e canonLayer.
// Sostituire gli esempi vuoti con lore concreta, mantenendo attribuzione e layer.
var loreEntries = [];

/*
var loreEntries = [
    {
        id: "example_location_0x01",
        category: "location",
        prefix: "LOC",
        keywords: ["example keyword", "alternate keyword"],
        priority: 12,
        minMessages: 0,
        maxMessages: Infinity,
        minTimeline: null,
        maxTimeline: null,
        statRequirements: [],
        filters: {
            type: "ANY",
            conditions: [
                { keyword: "example keyword" },
                { stat: "example_stat", min: 1 }
            ]
        },
        cascade: {
            enabled: true,
            children: ["example_child_id"]
        },
        importance: 10.0,
        source: "database/world/example_location_0x01.md",
        canonLayer: "ACTIVE",
        full: {
            personality: ", aware of the concrete example location",
            scenario: " [ACTIVE] LOC Source: database/world/example_location_0x01.md. Add concrete location facts here."
        },
        summary: {
            personality: "",
            scenario: " [ACTIVE] LOC Source: database/world/example_location_0x01.md. Compact location summary here."
        },
        bullet: {
            personality: "",
            scenario: " [ACTIVE] LOC Source: database/world/example_location_0x01.md. Bullets: concrete facts only."
        }
    }
];
*/

// ===== TIMELINE EVENTS =====
// Gli eventi timeline sono attivati da **Timeline:** o **Timeline Index:**.
var timelineEvents = [];

// ===== STAT REACTIONS =====
// Esempio: { stat: "example_stat", min: 2, personality: "", scenario: " [ACTIVE] ORG Source: database/world/org.md. ..." }
var statReactions = [];

function estimateTokens(text) {
    if (!text) {
        return 0;
    }
    return Math.ceil(text.length / 4);
}

function appendIfMissing(field, text) {
    if (!text) {
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
    var i;
    var regex;
    var matches;

    for (i = 0; i < keywords.length; i += 1) {
        regex = new RegExp(escapeRegExp(keywords[i]), "gi");
        matches = text.match(regex);
        if (matches) {
            count += matches.length;
        }
    }
    return count;
}

function getRecentText() {
    var depth = Math.max(0, recentMessages.length - WORLD_CONFIG.MENTION_SCAN_DEPTH);
    var text = "";
    var i;

    for (i = depth; i < recentMessages.length; i += 1) {
        if (recentMessages[i] && recentMessages[i].message) {
            text += " " + recentMessages[i].message;
        }
    }
    return text;
}

function parseContextBudget() {
    var regex = /\[CONTEXT BUDGET:[^\]]*per_script\s*=\s*(\d+)/i;
    var match = context.character.scenario.match(regex);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return 160;
}

function clampBudget(value, fallback) {
    if (!value || value < 1) {
        return fallback;
    }
    return value;
}

function getWorldBudget() {
    return Math.min(clampBudget(parseContextBudget(), 160), WORLD_CONFIG.MAX_TOKENS);
}

function extractTimelineIndex(text) {
    var regex = /\*\*\s*(?:Timeline|Timeline Index)\s*:\s*\*\*\s*(\d+)/i;
    var match = text.match(regex);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return null;
}

function extractStatValue(text, statName) {
    var regex = new RegExp(escapeRegExp(statName) + "\\s*:\\s*(\\d+)", "i");
    var match = text.match(regex);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return null;
}

function entryWithinMessageWindow(entry) {
    var minMessages = entry.minMessages;
    var maxMessages = entry.maxMessages;

    if (typeof minMessages === "number" && messageCount < minMessages) {
        return false;
    }

    if (typeof maxMessages === "number" && messageCount > maxMessages) {
        return false;
    }

    if (typeof maxMessages === "undefined") {
        return true;
    }

    return true;
}

function entryWithinTimeline(entry, timelineIndex) {
    if (!FEATURES.TIMELINE_FILTERS || timelineIndex === null) {
        return true;
    }

    if (typeof entry.minTimeline === "number" && timelineIndex < entry.minTimeline) {
        return false;
    }

    if (typeof entry.maxTimeline === "number" && timelineIndex > entry.maxTimeline) {
        return false;
    }

    return true;
}

function entryMatchesStatRequirements(entry, responseText) {
    var requirements = entry.statRequirements || [];
    var i;
    var statValue;

    if (!FEATURES.STAT_FILTERS || requirements.length === 0) {
        return true;
    }

    for (i = 0; i < requirements.length; i += 1) {
        statValue = extractStatValue(responseText, requirements[i].stat);
        if (statValue === null) {
            return false;
        }
        if (typeof requirements[i].min === "number" && statValue < requirements[i].min) {
            return false;
        }
        if (typeof requirements[i].max === "number" && statValue > requirements[i].max) {
            return false;
        }
    }

    return true;
}

function conditionMatches(condition, responseText) {
    if (condition.keyword) {
        return countMentions([condition.keyword], responseText) > 0;
    }

    if (condition.stat) {
        return entryMatchesStatRequirements({ statRequirements: [condition] }, responseText);
    }

    return false;
}

function entryMatchesFilters(entry, responseText) {
    var filters = entry.filters;
    var i;
    var matches;
    var condition;

    if (!filters || !filters.conditions || filters.conditions.length === 0) {
        return true;
    }

    matches = 0;
    for (i = 0; i < filters.conditions.length; i += 1) {
        condition = filters.conditions[i];
        if (conditionMatches(condition, responseText)) {
            matches += 1;
        }
    }

    if (filters.type === "ALL") {
        return matches === filters.conditions.length;
    }

    return matches > 0;
}

function inferPrefix(category) {
    if (!category) {
        return "LOR";
    }

    category = category.toLowerCase();
    if (category.indexOf("location") !== -1 || category.indexOf("luogo") !== -1) {
        return "LOC";
    }
    if (category.indexOf("organization") !== -1 || category.indexOf("faction") !== -1 || category.indexOf("fazione") !== -1) {
        return "ORG";
    }
    if (category.indexOf("history") !== -1 || category.indexOf("event") !== -1 || category.indexOf("timeline") !== -1) {
        return "HST";
    }
    if (category.indexOf("culture") !== -1 || category.indexOf("custom") !== -1) {
        return "CUL";
    }
    if (category.indexOf("npc") !== -1 || category.indexOf("character") !== -1 || category.indexOf("personaggio") !== -1) {
        return "NPC";
    }
    if (category.indexOf("family") !== -1 || category.indexOf("famiglia") !== -1) {
        return "FAM";
    }
    if (category.indexOf("creature") !== -1 || category.indexOf("bestiary") !== -1) {
        return "BST";
    }
    if (category.indexOf("secret") !== -1 || category.indexOf("mystery") !== -1) {
        return "SEC";
    }

    return "LOR";
}

function getSourcePrefix(entry) {
    var prefix = entry.prefix || inferPrefix(entry.category);
    var layer = entry.canonLayer || "CANDIDATE";
    var source = entry.source || "source:unspecified";
    return " [" + layer + "] " + prefix + " Source: " + source + ".";
}

function getEntryPayload(entry, level) {
    var payload = entry[level] || {};
    var personality = payload.personality || "";
    var scenario = payload.scenario || "";
    var sourcePrefix = getSourcePrefix(entry);

    if (scenario && scenario.indexOf(sourcePrefix) === -1) {
        scenario = sourcePrefix + scenario;
    }

    return {
        personality: personality,
        scenario: scenario
    };
}

function calculateDetailLevel(entry, mentionCount, importance) {
    var ratio = 0.0;

    if (!FEATURES.ADAPTIVE_LOREBOOK) {
        return "full";
    }

    if (mentionCount > 0 && importance > 0) {
        ratio = mentionCount / (mentionCount + importance);
    }

    if (ratio >= WORLD_CONFIG.FULL_THRESHOLD) {
        return "full";
    }
    if (ratio >= WORLD_CONFIG.SUMMARY_THRESHOLD) {
        return "summary";
    }
    return "bullet";
}

function entryDirectlyMatches(entry, responseText) {
    var keywords = entry.keywords || [];
    var timelineIndex = extractTimelineIndex(responseText);

    if (keywords.length === 0) {
        return true;
    }

    return countMentions(keywords, responseText) > 0 && entryWithinTimeline(entry, timelineIndex);
}

function activateEntry(entry, responseText, activeIds) {
    var keywords = entry.keywords || [];
    var timelineIndex = extractTimelineIndex(responseText);
    var detailLevel;
    var payload;

    if (!entryWithinMessageWindow(entry) || !entryWithinTimeline(entry, timelineIndex) || !entryMatchesStatRequirements(entry, responseText) || !entryMatchesFilters(entry, responseText)) {
        return;
    }

    if (keywords.length > 0 && countMentions(keywords, responseText) === 0) {
        return;
    }

    if (activeIds.indexOf(entry.id) !== -1) {
        return;
    }

    detailLevel = calculateDetailLevel(entry, countMentions(keywords, responseText), entry.importance || WORLD_CONFIG.DEFAULT_IMPORTANCE);
    payload = getEntryPayload(entry, detailLevel);
    appendIfMissing("personality", payload.personality);
    appendIfMissing("scenario", payload.scenario);
    activeIds.push(entry.id);
    if (activatedWorldEntryIds.indexOf(entry.id) === -1) {
        activatedWorldEntryIds.push(entry.id);
    }

    if (FEATURES.DEBUG_MODE) {
        appendIfMissing("scenario", " [WORLD DEBUG] Activated " + entry.id + " at " + detailLevel + " detail.");
    }
}

function applyCascadeActivation(activeIds, responseText) {
    var changed = true;
    var i;
    var j;
    var entry;
    var childId;
    var child;

    if (!FEATURES.CASCADE_ACTIVATION) {
        return;
    }

    while (changed) {
        changed = false;
        for (i = 0; i < loreEntries.length; i += 1) {
            entry = loreEntries[i];
            if (activeIds.indexOf(entry.id) === -1) {
                continue;
            }

            if (!entry.cascade || !entry.cascade.enabled || !entry.cascade.children) {
                continue;
            }

            for (j = 0; j < entry.cascade.children.length; j += 1) {
                childId = entry.cascade.children[j];
                child = getEntryById(childId);
                if (child && activeIds.indexOf(child.id) === -1) {
                    activateEntry(child, responseText, activeIds);
                    if (activatedWorldEntryIds.indexOf(child.id) === -1) {
                        activatedWorldEntryIds.push(child.id);
                    }
                    changed = true;
                }
            }
        }
    }
}

function getEntryById(id) {
    var i;
    for (i = 0; i < loreEntries.length; i += 1) {
        if (loreEntries[i].id === id) {
            return loreEntries[i];
        }
    }
    return null;
}

function sortActiveEntries(activationData) {
    activationData.sort(function(a, b) {
        if (b.priority !== a.priority) {
            return b.priority - a.priority;
        }
        if (b.importance !== a.importance) {
            return b.importance - a.importance;
        }
        return b.mentions - a.mentions;
    });
}

function applyStatReactions(responseText) {
    var i;
    var reaction;
    var statValue;

    if (!FEATURES.STAT_FILTERS) {
        return;
    }

    for (i = 0; i < statReactions.length; i += 1) {
        reaction = statReactions[i];
        statValue = extractStatValue(responseText, reaction.stat);

        if (statValue === null) {
            continue;
        }

        if (typeof reaction.min === "number" && statValue < reaction.min) {
            continue;
        }

        if (typeof reaction.max === "number" && statValue > reaction.max) {
            continue;
        }

        appendIfMissing("personality", reaction.personality || "");
        appendIfMissing("scenario", reaction.scenario || "");
    }
}

function applyTimelineEvents(responseText) {
    var timelineIndex = extractTimelineIndex(responseText);
    var i;
    var event;
    var detailLevel;
    var payload;

    if (!FEATURES.TIMELINE_FILTERS || timelineIndex === null) {
        return;
    }

    for (i = 0; i < timelineEvents.length; i += 1) {
        event = timelineEvents[i];

        if (typeof event.minTimeline === "number" && timelineIndex < event.minTimeline) {
            continue;
        }
        if (typeof event.maxTimeline === "number" && timelineIndex > event.maxTimeline) {
            continue;
        }
        if (typeof event.minMessages === "number" && messageCount < event.minMessages) {
            continue;
        }
        if (typeof event.maxMessages === "number" && messageCount > event.maxMessages) {
            continue;
        }

        detailLevel = calculateDetailLevel(event, 1, event.importance || WORLD_CONFIG.DEFAULT_IMPORTANCE);
        payload = getEntryPayload(event, detailLevel);
        appendIfMissing("personality", payload.personality);
        appendIfMissing("scenario", payload.scenario);
    }
}

function applyComplexLorebook() {
    var responseText = getRecentText();
    var activationData = [];
    var activeIds = [];
    var i;
    var entry;
    var mentions;
    var payload;
    var detailLevel;

    if (!FEATURES.COMPLEX_LOREBOOK) {
        return;
    }

    for (i = 0; i < loreEntries.length; i += 1) {
        entry = loreEntries[i];

        if (!entryDirectlyMatches(entry, responseText)) {
            continue;
        }

        mentions = countMentions(entry.keywords || [], responseText);
        activationData.push({
            id: entry.id,
            priority: entry.priority || WORLD_CONFIG.DEFAULT_PRIORITY,
            importance: entry.importance || WORLD_CONFIG.DEFAULT_IMPORTANCE,
            mentions: mentions,
            entry: entry
        });
    }

    sortActiveEntries(activationData);
    activationData = activationData.slice(0, WORLD_CONFIG.MAX_ACTIVE_ENTRIES);

    for (i = 0; i < activationData.length; i += 1) {
        entry = activationData[i].entry;
        detailLevel = calculateDetailLevel(entry, activationData[i].mentions, activationData[i].importance);
        payload = getEntryPayload(entry, detailLevel);
        appendIfMissing("personality", payload.personality);
        appendIfMissing("scenario", payload.scenario);
        activeIds.push(entry.id);
        if (activatedWorldEntryIds.indexOf(entry.id) === -1) {
            activatedWorldEntryIds.push(entry.id);
        }
    }

    applyCascadeActivation(activeIds, responseText);
}

function applyAdaptiveLorebook() {
    var responseText = getRecentText();
    var budget = getWorldBudget();
    var activationData = [];
    var i;
    var entry;
    var mentions;
    var detailLevel;
    var payload;
    var cost;
    var usedTokens = 0;

    if (!FEATURES.ADAPTIVE_LOREBOOK) {
        return;
    }

    for (i = 0; i < loreEntries.length; i += 1) {
        entry = loreEntries[i];
        if (activatedWorldEntryIds.indexOf(entry.id) !== -1) {
            continue;
        }
        mentions = countMentions(entry.keywords || [], responseText);

        if (mentions > 0) {
            activationData.push({
                entry: entry,
                mentions: mentions,
                importance: entry.importance || WORLD_CONFIG.DEFAULT_IMPORTANCE
            });
        }
    }

    activationData.sort(function(a, b) {
        if (b.mentions !== a.mentions) {
            return b.mentions - a.mentions;
        }
        return b.importance - a.importance;
    });

    for (i = 0; i < activationData.length; i += 1) {
        entry = activationData[i].entry;
        detailLevel = calculateDetailLevel(entry, activationData[i].mentions, activationData[i].importance);
        payload = getEntryPayload(entry, detailLevel);
        cost = estimateTokens(payload.personality) + estimateTokens(payload.scenario);

        if (usedTokens + cost > budget && detailLevel !== "bullet") {
            detailLevel = "bullet";
            payload = getEntryPayload(entry, detailLevel);
            cost = estimateTokens(payload.personality) + estimateTokens(payload.scenario);
        }

        if (usedTokens + cost > budget) {
            break;
        }

        appendIfMissing("personality", payload.personality);
        appendIfMissing("scenario", payload.scenario);
        usedTokens += cost;
    }
}

function applyWorldDebug() {
    if (!FEATURES.DEBUG_MODE) {
        return;
    }

    appendIfMissing("scenario", "\n\n[WORLD DEBUG]");
    appendIfMissing("scenario", "\nLore entries: " + loreEntries.length);
    appendIfMissing("scenario", "\nTimeline events: " + timelineEvents.length);
    appendIfMissing("scenario", "\nStat reactions: " + statReactions.length);
    appendIfMissing("scenario", "\nWorld budget: " + getWorldBudget());
    appendIfMissing("scenario", "\nMessage count: " + messageCount);
}

applyComplexLorebook();
applyAdaptiveLorebook();
applyTimelineEvents(lastResponse);
applyStatReactions(lastResponse);
applyWorldDebug();

// ===== SCRIPT END =====
