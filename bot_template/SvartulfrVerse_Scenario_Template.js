/**
 * SVARTULFRVERSE SCENARIO TEMPLATE
 *
 * MicroCosmo master-template per scena corrente, NPC multipli, gatekeeping
 * anti-omniscienza e pacing temporale investigativo.
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
    NPC_CORE: true,
    SIMPLE_NPC_FALLBACK: true,
    RELATIONSHIP_CORE: true,
    ANTI_OMNISCIENCE: true,
    SCENARIO_FLAG_INSTRUCTIONS: true,
    TIME_DELAY: true,
    DEBUG_MODE: false
};

var SCENARIO_CONFIG = {
    MENTION_SCAN_DEPTH: 5,
    MAX_ACTIVE_NPCS: 8,
    MAX_RELATIONSHIPS: 8,
    MAX_TIME_DELAY_TOKENS: 1200,
    MAX_FLAG_CONTENT_TOKENS: 1200,
    DEFAULT_IMPORTANCE: 10.0,
    DEBUG: false
};

var CATEGORY_BUDGETS = {
    identity: 220,
    appearance: 220,
    relationships: 260,
    personality: 260,
    psyche: 260,
    advancedPsychology: 320,
    backstory: 260,
    dialogue: 220,
    combat: 260,
    capabilities: 260,
    sampleDialog: 260,
    residence: 220,
    intimacy: 260,
    notes: 260
};

var CATEGORY_TARGETS = {
    identity: "personality",
    appearance: "personality",
    relationships: "scenario",
    personality: "personality",
    psyche: "personality",
    advancedPsychology: "personality",
    backstory: "scenario",
    dialogue: "example_dialogs",
    combat: "scenario",
    capabilities: "personality",
    sampleDialog: "example_dialogs",
    residence: "scenario",
    intimacy: "scenario",
    notes: "scenario"
};

// ===== NPC DATABASE =====
// Usare npcDatabase per il sistema avanzato Context Aware Multiple Character.
var npcDatabase = [];

/*
var npcDatabase = [
    {
        id: "npc_example_0x01",
        displayName: "Example NPC",
        names: ["Example NPC", "Example"],
        importance: 10.0,
        source: "database/scenario/npc_example_0x01.md",
        canonLayer: "ACTIVE",
        categories: {
            identity: {
                full: ", aware of Example NPC as an active NPC placeholder",
                limited: ", aware of Example NPC",
                summary: " NPC: Example NPC."
            },
            appearance: {
                full: " Example NPC appearance details belong here.",
                limited: " Example NPC appearance summary belongs here.",
                summary: " Example NPC appearance: replace with concrete details."
            },
            relationships: {
                full: " Example NPC relationship context belongs here.",
                limited: " Example NPC relationship summary belongs here.",
                summary: " Example NPC relationships: replace with concrete details."
            },
            personality: {
                full: ", aware of Example NPC personality facts",
                limited: ", aware of Example NPC personality summary",
                summary: " Example NPC personality: replace with concrete facts."
            },
            psyche: {
                full: " Example NPC psyche details belong here.",
                limited: " Example NPC psyche summary belongs here.",
                summary: " Example NPC psyche: replace with concrete facts."
            },
            advancedPsychology: {
                full: " Example NPC advanced psychology belongs here.",
                limited: " Example NPC advanced psychology summary belongs here.",
                summary: " Example NPC advanced psychology: replace with concrete facts."
            },
            backstory: {
                full: " Example NPC backstory belongs here.",
                limited: " Example NPC backstory summary belongs here.",
                summary: " Example NPC backstory: replace with concrete facts."
            },
            dialogue: {
                full: " Example NPC dialogue rules belong here.",
                limited: " Example NPC dialogue summary belongs here.",
                summary: " Example NPC dialogue: replace with concrete rules."
            },
            combat: {
                full: " Example NPC combat behavior belongs here.",
                limited: " Example NPC combat summary belongs here.",
                summary: " Example NPC combat: replace with concrete rules."
            },
            capabilities: {
                full: ", aware of Example NPC capabilities",
                limited: ", aware of Example NPC capability summary",
                summary: " Example NPC capabilities: replace with concrete facts."
            },
            sampleDialog: {
                full: "Example NPC: Replace with sample dialogue.\n",
                limited: "Example NPC: Replace with compact sample dialogue.\n",
                summary: "Example NPC: Replace with one-line sample dialogue.\n"
            },
            residence: {
                full: " Example NPC residence belongs here.",
                limited: " Example NPC residence summary belongs here.",
                summary: " Example NPC residence: replace with concrete facts."
            },
            intimacy: {
                full: " Example NPC intimacy boundaries belong here.",
                limited: " Example NPC intimacy summary belongs here.",
                summary: " Example NPC intimacy: replace with concrete boundaries."
            },
            notes: {
                full: " Example NPC notes belong here.",
                limited: " Example NPC notes summary belongs here.",
                summary: " Example NPC notes: replace with concrete notes."
            }
        }
    }
];
*/

// ===== SIMPLE NPC DATABASE =====
// Usare questa tabella solo per drop-in/drop-out compatibili con Multiple Character.
var simpleNpcDatabase = [];

/*
var simpleNpcDatabase = [
    {
        id: "simple_npc_example",
        displayName: "Example NPC",
        names: ["Example NPC", "Example"],
        importance: 6.0,
        source: "database/scenario/simple_npc_example.md",
        canonLayer: "ACTIVE",
        personality: ", aware of Example NPC as a simple drop-in NPC",
        scenario: " [ACTIVE] NPC Source: database/scenario/simple_npc_example.md. Add compact facts here.",
        exampleDialogs: "Example NPC: Replace with a compact line.\n"
    }
];
*/

// ===== RELATIONSHIPS =====
var relationshipDatabase = [];

/*
var relationshipDatabase = [
    {
        id: "relationship_example_0x01",
        npcId: "npc_example_0x01",
        target: "user",
        importance: 10.0,
        keywords: ["relationship keyword"],
        source: "database/scenario/relationship_example_0x01.md",
        canonLayer: "ACTIVE",
        full: " Relationship facts belong here.",
        summary: " Relationship summary belongs here.",
        bullet: " Relationship bullet belongs here."
    }
];
*/

// ===== ANTI-OMNISCIENCE INVESTIGATION =====
var scenarioFlagDefinitions = [];
var scenarioContentNodes = [];

/*
var scenarioFlagDefinitions = [
    {
        position: 0,
        states: [
            { hex: "00", id: "scenario_state_0x00", description: "Locked state.", changeInstruction: "Unlock only through a Scenario condition." },
            { hex: "0A", id: "scenario_state_0x0A", description: "Unlocked state.", changeInstruction: "May reveal content gated by this flag." }
        ]
    }
];

var scenarioContentNodes = [
    {
        id: "content_example_0x01",
        requiredFlags: { 0: "0A" },
        forbiddenFlags: {},
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        keywords: ["content keyword"],
        importance: 10.0,
        source: "database/scenario/content_example_0x01.md",
        canonLayer: "ACTIVE",
        full: {
            personality: ", aware of the unlocked content example",
            scenario: " [ACTIVE] SEC Source: database/scenario/content_example_0x01.md. Add unlocked facts here."
        },
        summary: {
            personality: "",
            scenario: " [ACTIVE] SEC Source: database/scenario/content_example_0x01.md. Add compact unlocked facts here."
        },
        bullet: {
            personality: "",
            scenario: " [ACTIVE] SEC Source: database/scenario/content_example_0x01.md. Add bullet unlocked facts here."
        }
    }
];
*/

// ===== TIME DELAY INVESTIGATION =====
var timeDelayCanonDatabase = [];
var timeDelayEntityDatabase = [];
var timeDelayConditionalEvents = [];

/*
var timeDelayCanonDatabase = [
    {
        id: "canon_example_0x01",
        keywords: ["canon keyword"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 10.0,
        source: "database/scenario/canon_example_0x01.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Full canon facts here.",
        summary: " [CANON] Compact canon facts here.",
        bullet: " [CANON] Bullet canon facts here.",
        hiddenCondition: null,
        hiddenContent: " [HIDDEN CLUE] Hidden content appears only after hiddenCondition is true."
    }
];

var timeDelayEntityDatabase = [
    {
        id: "entity_example_0x01",
        type: "witness",
        names: ["witness keyword"],
        minCanon: 0,
        importance: 6.0,
        source: "database/scenario/entity_example_0x01.md",
        canonLayer: "ACTIVE",
        full: " Full witness facts here.",
        summary: " Compact witness facts here.",
        bullet: " Bullet witness facts here.",
        personality: "",
        scenario: " [ACTIVE] NPC Source: database/scenario/entity_example_0x01.md. Add witness facts here.",
        exampleDialogs: "Witness: Replace with compact dialogue.\n"
    }
];

var timeDelayConditionalEvents = [
    {
        id: "event_example_0x01",
        requiresAny: ["witness keyword", "location keyword"],
        requiresAll: [],
        notWith: [],
        minHour: 1,
        minCanon: 1,
        minMessages: 0,
        maxMessages: Infinity,
        source: "database/scenario/event_example_0x01.md",
        canonLayer: "ACTIVE",
        personality: "",
        scenario: " [CANON] Conditional event facts here."
    }
];
*/

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
    var depth = Math.max(0, recentMessages.length - SCENARIO_CONFIG.MENTION_SCAN_DEPTH);
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

function getPerScriptBudget() {
    return clampBudget(parseContextBudget(), 160);
}

function extractVisibleFlags(response) {
    var regex = /\*\*FLAGS:\*\*\s*([0-9A-Fa-f:]+)/;
    var match = response.match(regex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}

function extractTimelineIndex(text) {
    var regex = /\*\*\s*(?:Hour|Timeline|Timeline Index)\s*:\s*\*\*\s*(\d+)/i;
    var match = text.match(regex);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return null;
}

function extractCanonCount(text) {
    var regex = /\*\*\s*Canon Count\s*:\s*\*\*\s*(\d+)/i;
    var match = text.match(regex);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return null;
}

function getTimelineIndex() {
    return extractTimelineIndex(lastResponse);
}

function getCanonCount() {
    return extractCanonCount(lastResponse);
}

function inferPrefix(category) {
    if (!category) {
        return "NPC";
    }
    category = category.toLowerCase();
    if (category.indexOf("secret") !== -1 || category.indexOf("mystery") !== -1) {
        return "SEC";
    }
    if (category.indexOf("canon") !== -1 || category.indexOf("event") !== -1) {
        return "CAN";
    }
    if (category.indexOf("witness") !== -1) {
        return "WIT";
    }
    if (category.indexOf("location") !== -1) {
        return "LOC";
    }
    if (category.indexOf("relationship") !== -1) {
        return "REL";
    }
    return "NPC";
}

function getSourcePrefix(entry, fallbackPrefix) {
    var prefix = entry.prefix || fallbackPrefix || inferPrefix(entry.category || entry.type);
    var layer = entry.canonLayer || "CANDIDATE";
    var source = entry.source || "source:unspecified";
    return " [" + layer + "] " + prefix + " Source: " + source + ".";
}

function getNpcById(id) {
    var i;
    for (i = 0; i < npcDatabase.length; i += 1) {
        if (npcDatabase[i].id === id) {
            return npcDatabase[i];
        }
    }
    return null;
}

function npcMatches(npc, responseText) {
    var names = npc.names || [];
    var keywords = npc.keywords || [];
    var combined = [];
    var i;

    for (i = 0; i < names.length; i += 1) {
        combined.push(names[i]);
    }
    for (i = 0; i < keywords.length; i += 1) {
        combined.push(keywords[i]);
    }

    if (combined.length === 0) {
        return false;
    }

    return countMentions(combined, responseText) > 0;
}

function simpleNpcMatches(npc, responseText) {
    return npcMatches(npc, responseText);
}

function selectNpcDetailLevel(mentions, importance) {
    var ratio = 0.0;
    if (mentions > 0 && importance > 0) {
        ratio = mentions / (mentions + importance);
    }
    if (mentions >= 3 || ratio >= 0.70) {
        return "full";
    }
    if (mentions >= 1 || ratio >= 0.45) {
        return "limited";
    }
    return "summary";
}

function getNpcPayload(npc, level) {
    var categories = npc.categories || {};
    var categoryKeys = Object.keys(CATEGORY_BUDGETS);
    var personality = "";
    var scenario = "";
    var exampleDialogs = "";
    var i;
    var key;
    var payload;
    var text;
    var target;

    for (i = 0; i < categoryKeys.length; i += 1) {
        key = categoryKeys[i];
        payload = categories[key];

        if (!payload) {
            continue;
        }

        text = payload[level] || payload.summary || payload.limited || payload.full || "";
        if (!text) {
            continue;
        }

        if (key === "relationships" && text.indexOf(getSourcePrefix(npc, "REL")) === -1) {
            text = getSourcePrefix(npc, "REL") + text;
        } else if (text.indexOf(getSourcePrefix(npc, "NPC")) === -1) {
            text = getSourcePrefix(npc, "NPC") + text;
        }

        target = CATEGORY_TARGETS[key] || "scenario";
        if (target === "personality") {
            personality += text;
        } else if (target === "example_dialogs") {
            exampleDialogs += text;
        } else {
            scenario += text;
        }
    }

    return {
        personality: personality,
        scenario: scenario,
        exampleDialogs: exampleDialogs
    };
}

function getSimpleNpcPayload(npc) {
    return {
        personality: npc.personality || "",
        scenario: npc.scenario || "",
        exampleDialogs: npc.exampleDialogs || ""
    };
}

function applyNpcCoreInstructions() {
    var lines;

    if (!FEATURES.NPC_CORE || (npcDatabase.length === 0 && simpleNpcDatabase.length === 0)) {
        return;
    }

    lines = [
        "\n\n[SCENARIO NPC CORE]",
        "Activate only NPCs mentioned or strongly implied by the current scene.",
        "Drop inactive NPCs out of the immediate response unless they remain relevant.",
        "Scale detail by mention count, importance, and available token budget.",
        "Use identity, appearance, personality, psyche, advancedPsychology, and capabilities for personality.",
        "Use relationships, backstory, combat, residence, intimacy, and notes for scenario.",
        "Use dialogue and sampleDialog for example_dialogs.",
        "Do not force every NPC into every reply; preserve scene focus and pacing."
    ];

    appendIfMissing("scenario", lines.join("\n"));
}

function applyNpcDatabase(responseText) {
    var activationData = [];
    var i;
    var npc;
    var mentions;
    var detailLevel;
    var payload;
    var usedTokens = 0;
    var budget;

    if (!FEATURES.NPC_CORE) {
        return;
    }

    for (i = 0; i < npcDatabase.length; i += 1) {
        npc = npcDatabase[i];
        mentions = countMentions((npc.names || []).concat(npc.keywords || []), responseText);

        if (mentions === 0) {
            continue;
        }

        activationData.push({
            npc: npc,
            mentions: mentions,
            importance: npc.importance || SCENARIO_CONFIG.DEFAULT_IMPORTANCE
        });
    }

    activationData.sort(function(a, b) {
        if (b.mentions !== a.mentions) {
            return b.mentions - a.mentions;
        }
        return b.importance - a.importance;
    });

    activationData = activationData.slice(0, SCENARIO_CONFIG.MAX_ACTIVE_NPCS);
    budget = getPerScriptBudget();

    for (i = 0; i < activationData.length; i += 1) {
        npc = activationData[i].npc;
        detailLevel = selectNpcDetailLevel(activationData[i].mentions, activationData[i].importance);
        payload = getNpcPayload(npc, detailLevel);

        if (usedTokens + estimateTokens(payload.personality) + estimateTokens(payload.scenario) + estimateTokens(payload.exampleDialogs) > budget && detailLevel !== "summary") {
            detailLevel = "summary";
            payload = getNpcPayload(npc, detailLevel);
        }

        appendIfMissing("personality", payload.personality);
        appendIfMissing("scenario", payload.scenario);
        appendIfMissing("example_dialogs", payload.exampleDialogs);
        usedTokens += estimateTokens(payload.personality) + estimateTokens(payload.scenario) + estimateTokens(payload.exampleDialogs);

        if (FEATURES.DEBUG_MODE) {
            appendIfMissing("scenario", " [SCENARIO DEBUG] NPC activated: " + npc.id + " at " + detailLevel + " detail.");
        }
    }
}

function applySimpleNpcFallback(responseText) {
    var i;
    var npc;
    var payload;

    if (!FEATURES.SIMPLE_NPC_FALLBACK || simpleNpcDatabase.length === 0) {
        return;
    }

    for (i = 0; i < simpleNpcDatabase.length; i += 1) {
        npc = simpleNpcDatabase[i];
        if (!simpleNpcMatches(npc, responseText)) {
            continue;
        }

        payload = getSimpleNpcPayload(npc);
        appendIfMissing("personality", payload.personality);
        appendIfMissing("scenario", payload.scenario);
        appendIfMissing("example_dialogs", payload.exampleDialogs);
    }
}

function relationshipMatches(relationship, responseText) {
    var combined = [];
    var npc;
    var i;

    if (relationship.npcId) {
        npc = getNpcById(relationship.npcId);
        if (npc) {
            combined = combined.concat(npc.names || []);
            combined = combined.concat(npc.keywords || []);
        }
    }

    combined = combined.concat(relationship.keywords || []);

    if (combined.length === 0) {
        return false;
    }

    for (i = 0; i < combined.length; i += 1) {
        if (responseText.indexOf(combined[i].toLowerCase()) !== -1) {
            return true;
        }
    }

    return false;
}

function applyRelationshipDatabase(responseText) {
    var activationData = [];
    var i;
    var relationship;
    var detailLevel;
    var text;
    var sourcePrefix;
    var usedTokens = 0;
    var budget;

    if (!FEATURES.RELATIONSHIP_CORE || relationshipDatabase.length === 0) {
        return;
    }

    budget = getPerScriptBudget();

    for (i = 0; i < relationshipDatabase.length; i += 1) {
        relationship = relationshipDatabase[i];
        if (!relationshipMatches(relationship, responseText)) {
            continue;
        }

        detailLevel = relationship.importance >= 12 ? "full" : relationship.importance >= 8 ? "summary" : "bullet";
        text = relationship[detailLevel] || relationship.summary || relationship.full || relationship.bullet || "";
        sourcePrefix = getSourcePrefix(relationship, "REL");

        if (text && text.indexOf(sourcePrefix) === -1) {
            text = sourcePrefix + text;
        }

        if (usedTokens + estimateTokens(text) > budget) {
            break;
        }

        appendIfMissing("scenario", text);
        usedTokens += estimateTokens(text);
        activationData.push(relationship.id);
    }

    if (FEATURES.DEBUG_MODE && activationData.length > 0) {
        appendIfMissing("scenario", " [SCENARIO DEBUG] Relationships activated: " + activationData.join(", "));
    }
}

// ===== ANTI-OMNISCIENCE =====
function generateDefaultScenarioFlags(count) {
    var defaults = [];
    var i;
    for (i = 0; i < count; i += 1) {
        defaults.push("00");
    }
    return defaults.join(":");
}

function getScenarioFlagStates() {
    var states = [];
    var i;
    var j;
    var def;

    for (i = 0; i < scenarioFlagDefinitions.length; i += 1) {
        def = scenarioFlagDefinitions[i];
        for (j = 0; j < def.states.length; j += 1) {
            if (states.indexOf(def.states[j].hex.toUpperCase()) === -1) {
                states.push(def.states[j].hex.toUpperCase());
            }
        }
    }

    return states;
}

function getScenarioFlags() {
    var visibleFlagText = extractVisibleFlags(lastResponse);
    var parts;
    var i;

    if (!visibleFlagText && scenarioFlagDefinitions.length > 0) {
        return generateDefaultScenarioFlags(scenarioFlagDefinitions.length).split(":");
    }

    if (!visibleFlagText) {
        return null;
    }

    parts = visibleFlagText.split(":");

    for (i = 0; i < parts.length; i += 1) {
        if (!/^[0-9A-Fa-f]{2}$/.test(parts[i]) || getScenarioFlagStates().length > 0 && getScenarioFlagStates().indexOf(parts[i].toUpperCase()) === -1) {
            return null;
        }
    }

    return parts;
}

function flagMatches(flags, requirements) {
    var key;

    if (!flags || !requirements) {
        return false;
    }

    for (key in requirements) {
        if (requirements.hasOwnProperty(key)) {
            if (!flags[parseInt(key, 10)] || flags[parseInt(key, 10)].toUpperCase() !== requirements[key].toUpperCase()) {
                return false;
            }
        }
    }

    return true;
}

function forbiddenFlagMatches(flags, requirements) {
    var key;

    if (!flags || !requirements) {
        return false;
    }

    for (key in requirements) {
        if (requirements.hasOwnProperty(key)) {
            if (flags[parseInt(key, 10)] && flags[parseInt(key, 10)].toUpperCase() === requirements[key].toUpperCase()) {
                return true;
            }
        }
    }

    return false;
}

function getAntiOmniscienceInstructions() {
    var visibleFlagText = extractVisibleFlags(lastResponse);
    var lines;

    if (!FEATURES.ANTI_OMNISCIENCE || scenarioFlagDefinitions.length === 0) {
        return "";
    }

    if (visibleFlagText) {
        return "";
    }

    lines = [
        "\n\n[SCENARIO INFORMATION BOUNDARIES]",
        "Only reveal Scenario-gated facts when their required visible flag state is active.",
        "Do not reveal locked clues, hidden motives, future revelations, or meta labels before unlock conditions are satisfied.",
        "Do not invent Scenario flag states. Preserve the current visible flag string if it is present.",
        "If no visible flag string is present, keep gated information locked and avoid meta-labels."
    ];

    return lines.join("\n");
}

function getFlagContentLevel(node, mentions, importance) {
    var ratio = 0.0;
    if (mentions > 0 && importance > 0) {
        ratio = mentions / (mentions + importance);
    }
    if (mentions >= 3 || ratio >= 0.70) {
        return "full";
    }
    if (mentions >= 1 || ratio >= 0.45) {
        return "summary";
    }
    return "bullet";
}

function applyAntiOmniscienceContent(responseText) {
    var flags = getScenarioFlags();
    var i;
    var node;
    var level;
    var payload;
    var sourcePrefix;
    var usedTokens = 0;
    var budget;

    if (!FEATURES.ANTI_OMNISCIENCE || scenarioContentNodes.length === 0) {
        return;
    }

    appendIfMissing("scenario", getAntiOmniscienceInstructions());
    budget = Math.min(getPerScriptBudget(), SCENARIO_CONFIG.MAX_FLAG_CONTENT_TOKENS);

    for (i = 0; i < scenarioContentNodes.length; i += 1) {
        node = scenarioContentNodes[i];

        if (!flagMatches(flags, node.requiredFlags || {})) {
            continue;
        }

        if (forbiddenFlagMatches(flags, node.forbiddenFlags || {})) {
            continue;
        }

        if (typeof node.minMessages === "number" && messageCount < node.minMessages) {
            continue;
        }

        if (typeof node.maxMessages === "number" && messageCount > node.maxMessages) {
            continue;
        }

        if (typeof node.minHour === "number" && getTimelineIndex() !== null && getTimelineIndex() < node.minHour) {
            continue;
        }

        if (typeof node.maxHour === "number" && getTimelineIndex() !== null && getTimelineIndex() > node.maxHour) {
            continue;
        }

        if (typeof node.minCanon === "number" && getCanonCount() !== null && getCanonCount() < node.minCanon) {
            continue;
        }

        if (typeof node.maxCanon === "number" && getCanonCount() !== null && getCanonCount() > node.maxCanon) {
            continue;
        }

        if ((node.keywords || []).length > 0 && countMentions(node.keywords || [], responseText) === 0) {
            continue;
        }

        level = getFlagContentLevel(node, countMentions(node.keywords || [], responseText), node.importance || SCENARIO_CONFIG.DEFAULT_IMPORTANCE);
        payload = node[level] || node.summary || node.full || node.bullet || "";
        sourcePrefix = getSourcePrefix(node, "SEC");

        if (payload && payload.indexOf(sourcePrefix) === -1) {
            payload = sourcePrefix + payload;
        }

        if (usedTokens + estimateTokens(payload) > budget) {
            continue;
        }

        appendIfMissing("scenario", payload);
        usedTokens += estimateTokens(payload);
    }
}

// ===== TIME DELAY =====
function timeDelayNodeWithinWindow(node) {
    var hour = getTimelineIndex();
    var canon = getCanonCount();

    if (typeof node.minMessages === "number" && messageCount < node.minMessages) {
        return false;
    }

    if (typeof node.maxMessages === "number" && messageCount > node.maxMessages) {
        return false;
    }

    if (typeof node.minHour === "number" && hour !== null && hour < node.minHour) {
        return false;
    }

    if (typeof node.maxHour === "number" && hour !== null && hour > node.maxHour) {
        return false;
    }

    if (typeof node.minCanon === "number" && canon !== null && canon < node.minCanon) {
        return false;
    }

    if (typeof node.maxCanon === "number" && canon !== null && canon > node.maxCanon) {
        return false;
    }

    return true;
}

function timeDelayNodeMatches(node, responseText) {
    var keywords = node.keywords || [];
    if (keywords.length === 0) {
        return true;
    }
    return countMentions(keywords, responseText) > 0;
}

function selectTimeDelayDetail(node, mentions) {
    var ratio = 0.0;
    if (mentions > 0 && node.importance > 0) {
        ratio = mentions / (mentions + node.importance);
    }
    if (mentions >= 3 || ratio >= 0.70) {
        return "full";
    }
    if (mentions >= 1 || ratio >= 0.45) {
        return "summary";
    }
    return "bullet";
}

function applyTimeDelayCanon(responseText) {
    var i;
    var node;
    var level;
    var text;
    var sourcePrefix;
    var usedTokens = 0;
    var budget;

    if (!FEATURES.TIME_DELAY || timeDelayCanonDatabase.length === 0) {
        return;
    }

    budget = Math.min(getPerScriptBudget(), SCENARIO_CONFIG.MAX_TIME_DELAY_TOKENS);

    for (i = 0; i < timeDelayCanonDatabase.length; i += 1) {
        node = timeDelayCanonDatabase[i];

        if (!timeDelayNodeWithinWindow(node) || !timeDelayNodeMatches(node, responseText)) {
            continue;
        }

        level = selectTimeDelayDetail(node, countMentions(node.keywords || [], responseText));
        text = node[level] || node.summary || node.full || node.bullet || "";
        sourcePrefix = getSourcePrefix(node, "CAN");

        if (text && text.indexOf(sourcePrefix) === -1) {
            text = sourcePrefix + text;
        }

        if (usedTokens + estimateTokens(text) > budget) {
            break;
        }

        appendIfMissing("scenario", text);
        usedTokens += estimateTokens(text);

        if (node.hiddenCondition && typeof node.hiddenCondition === "function") {
            if (node.hiddenCondition()) {
                appendIfMissing("scenario", node.hiddenContent || "");
            }
        }
    }
}

function entityMatches(entity, responseText) {
    var names = entity.names || [];
    var keywords = entity.keywords || [];
    var combined = names.concat(keywords);

    if (combined.length === 0) {
        return false;
    }

    return countMentions(combined, responseText) > 0;
}

function applyTimeDelayEntities(responseText) {
    var i;
    var entity;
    var level;
    var text;
    var sourcePrefix;
    var usedTokens = 0;
    var budget;

    if (!FEATURES.TIME_DELAY || timeDelayEntityDatabase.length === 0) {
        return;
    }

    budget = Math.min(getPerScriptBudget(), SCENARIO_CONFIG.MAX_TIME_DELAY_TOKENS);

    for (i = 0; i < timeDelayEntityDatabase.length; i += 1) {
        entity = timeDelayEntityDatabase[i];

        if (!timeDelayNodeWithinWindow(entity) || !entityMatches(entity, responseText)) {
            continue;
        }

        level = selectTimeDelayDetail(entity, countMentions((entity.names || []).concat(entity.keywords || []), responseText));
        text = entity[level] || entity.summary || entity.full || entity.bullet || "";
        sourcePrefix = getSourcePrefix(entity, inferPrefix(entity.type));

        if (text && text.indexOf(sourcePrefix) === -1) {
            text = sourcePrefix + text;
        }

        if (usedTokens + estimateTokens(text) + estimateTokens(entity.personality || "") + estimateTokens(entity.scenario || "") + estimateTokens(entity.exampleDialogs || "") > budget) {
            continue;
        }

        appendIfMissing("scenario", text);
        appendIfMissing("personality", entity.personality || "");
        appendIfMissing("scenario", entity.scenario || "");
        appendIfMissing("example_dialogs", entity.exampleDialogs || "");
        usedTokens += estimateTokens(text) + estimateTokens(entity.personality || "") + estimateTokens(entity.scenario || "") + estimateTokens(entity.exampleDialogs || "");
    }
}

function conditionListMatches(responseText, keywords) {
    var i;
    if (!keywords || keywords.length === 0) {
        return true;
    }
    for (i = 0; i < keywords.length; i += 1) {
        if (responseText.indexOf(keywords[i].toLowerCase()) !== -1) {
            return true;
        }
    }
    return false;
}

function conditionListAllMatch(responseText, keywords) {
    var i;
    if (!keywords || keywords.length === 0) {
        return true;
    }
    for (i = 0; i < keywords.length; i += 1) {
        if (responseText.indexOf(keywords[i].toLowerCase()) === -1) {
            return false;
        }
    }
    return true;
}

function applyTimeDelayConditionalEvents(responseText) {
    var i;
    var event;
    var text;
    var sourcePrefix;
    var usedTokens = 0;
    var budget;

    if (!FEATURES.TIME_DELAY || timeDelayConditionalEvents.length === 0) {
        return;
    }

    budget = Math.min(getPerScriptBudget(), SCENARIO_CONFIG.MAX_TIME_DELAY_TOKENS);

    for (i = 0; i < timeDelayConditionalEvents.length; i += 1) {
        event = timeDelayConditionalEvents[i];

        if (!timeDelayNodeWithinWindow(event)) {
            continue;
        }

        if (!conditionListMatches(responseText, event.requiresAny || [])) {
            continue;
        }

        if (!conditionListAllMatch(responseText, event.requiresAll || [])) {
            continue;
        }

        if (conditionListMatches(responseText, event.notWith || [])) {
            continue;
        }

        text = event.scenario || "";
        sourcePrefix = getSourcePrefix(event, "CAN");

        if (text && text.indexOf(sourcePrefix) === -1) {
            text = sourcePrefix + text;
        }

        if (usedTokens + estimateTokens(text) + estimateTokens(event.personality || "") > budget) {
            break;
        }

        appendIfMissing("personality", event.personality || "");
        appendIfMissing("scenario", text);
        usedTokens += estimateTokens(text) + estimateTokens(event.personality || "");
    }
}

function applyTimeDelayInstructions() {
    if (!FEATURES.TIME_DELAY || (timeDelayCanonDatabase.length === 0 && timeDelayEntityDatabase.length === 0 && timeDelayConditionalEvents.length === 0)) {
        return;
    }

    appendIfMissing("scenario", "\n\n[TIME DELAY REQUIREMENTS]");
    appendIfMissing("scenario", "\nIf timeline pacing is active, output **Hour:** N and **Canon Count:** N in the response status block.");
    appendIfMissing("scenario", "\nReveal investigation content only when its hour, canon count, message threshold, and conditions are satisfied.");
    appendIfMissing("scenario", "\nUse [CANON] only for unlocked canon facts. Do not reveal hidden clues before their conditions are true.");
}

function applyScenarioDebug() {
    if (!FEATURES.DEBUG_MODE) {
        return;
    }

    appendIfMissing("scenario", "\n\n[SCENARIO DEBUG]");
    appendIfMissing("scenario", "\nNPC database entries: " + npcDatabase.length);
    appendIfMissing("scenario", "\nSimple NPC entries: " + simpleNpcDatabase.length);
    appendIfMissing("scenario", "\nRelationship entries: " + relationshipDatabase.length);
    appendIfMissing("scenario", "\nAnti-omniscience nodes: " + scenarioContentNodes.length);
    appendIfMissing("scenario", "\nTime delay canon entries: " + timeDelayCanonDatabase.length);
    appendIfMissing("scenario", "\nTime delay entities: " + timeDelayEntityDatabase.length);
    appendIfMissing("scenario", "\nConditional events: " + timeDelayConditionalEvents.length);
    appendIfMissing("scenario", "\nMessage count: " + messageCount);
    appendIfMissing("scenario", "\nHour: " + (getTimelineIndex() === null ? "unknown" : getTimelineIndex()));
    appendIfMissing("scenario", "\nCanon Count: " + (getCanonCount() === null ? "unknown" : getCanonCount()));
}

var responseText = getRecentText();

applyNpcCoreInstructions();
applyNpcDatabase(responseText);
applySimpleNpcFallback(responseText);
applyRelationshipDatabase(responseText);
applyAntiOmniscienceContent(responseText);
applyTimeDelayInstructions();
applyTimeDelayCanon(responseText);
applyTimeDelayEntities(responseText);
applyTimeDelayConditionalEvents(responseText);
applyScenarioDebug();

// ===== SCRIPT END =====
