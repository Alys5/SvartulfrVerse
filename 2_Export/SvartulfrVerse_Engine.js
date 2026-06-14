/**
 * SVARTULFRVERSE ENGINE TEMPLATE
 *
 * Infrastruttura runtime agnostica per JanitorAI Scripts.
 * Questo file non contiene fatti narrativi, nomi di personaggi, luoghi, magie,
 * tecnologie o riferimenti a uno scenario specifico. Gestisce solo:
 * - stato persistente visibile con flag hex;
 * - stato persistente invisibile con codifica zero-width;
 * - costruzione contestuale progressiva a budget;
 * - utility di debug per il runtime context.
 *
 * Compatibile con ES6-safe JanitorAI Scripts API: usa solo scope locale,
 * context guard, append-only writes e nessuna API hard-blocked.
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

const chat = typeof context.chat === "object" && context.chat !== null ? context.chat : {};
var lastResponse = chat.last_message || chat.lastMessage || "";
var lastMessage = lastResponse.toLowerCase();
var messageCount = chat.message_count || chat.messageCount || 0;
var recentMessages = chat.last_messages || chat.lastMessages || [];

// ===== FEATURE TOGGLES =====
const FEATURES = {
    VISIBLE_FLAGS: true,
    ANTI_CHEAT: true,
    HIDDEN_STATE: true,
    PROGRESSIVE_CONTEXT: true,
    NPC_CORE: true,
    SIMPLE_NPC_FALLBACK: true,
    RELATIONSHIP_CORE: true,
    ANTI_OMNISCIENCE: true,
    TIME_DELAY: true,
    DEBUG_CONTEXT_LOG: false,
    DEBUG_MODE: false
};

const ANTI_CHEAT_MODE = "OOC_WARNING";

const ANTI_CHEAT_RESPONSES = {
    OOC_WARNING: {
        personality: "",
        scenario: " [OOC: Invalid abstract state detected. Roll back and use only valid state values.]"
    },
    COMICAL: {
        personality: ", experiencing a sudden absurd interruption",
        scenario: " A harmless absurd interruption breaks the invalid state without changing canon."
    },
    SEVERE: {
        personality: "",
        scenario: " [OOC: Invalid abstract state detected. Reset to the last valid state before continuing.]"
    }
};

// ===== VISIBLE HEX FLAGS =====
// Replace these abstract placeholders with scenario-owned meanings outside the Engine.
var flagDefinitions = [
    {
        position: 0,
        states: [
            {
                hex: "00",
                id: "flag_0x00",
                description: "Default abstract state for visible flag position 0.",
                personality: "",
                scenario: "",
                keywords: [],
                flagChangeInstruction: "Do not change this position until a Scenario or World module defines its meaning."
            },
            {
                hex: "0A",
                id: "flag_0x0A",
                description: "Alternate abstract state for visible flag position 0.",
                personality: "",
                scenario: "",
                keywords: [],
                flagChangeInstruction: "Use only when a Scenario or World module explicitly permits this state."
            }
        ]
    }
];

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
    if (character[field].indexOf(text) === -1) {
        character[field] += text;
    }
}

function normalizeKeywords(keywords) {
    if (!keywords) {
        return [];
    }
    if (typeof keywords === "string") {
        return [keywords.toLowerCase().trim()].filter(Boolean);
    }
    return Array.from(keywords).map(function (keyword) {
        return String(keyword).toLowerCase().trim();
    }).filter(Boolean);
}

function escapeRegExp(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countMentions(keywords, text) {
    var normalizedKeywords = normalizeKeywords(keywords);
    var count = 0;
    var i;
    var regex;
    var matches;

    for (i = 0; i < normalizedKeywords.length; i += 1) {
        regex = new RegExp(escapeRegExp(normalizedKeywords[i]), "gi");
        matches = text.match(regex);
        if (matches) {
            count += matches.length;
        }
    }
    return count;
}

function extractVisibleFlags(response) {
    var regex = /\*\*FLAGS:\*\*\s*([0-9A-Fa-f:]+)/;
    var match = response.match(regex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}

function isValidHexValue(hexValue) {
    return /^[0-9A-Fa-f]{2}$/.test(hexValue);
}

function generateDefaultFlags(count) {
    var defaults = [];
    var i;
    for (i = 0; i < count; i += 1) {
        defaults.push("00");
    }
    return defaults.join(":");
}

function getAllFlagStates() {
    var states = [];
    var i;
    var j;
    var def;

    for (i = 0; i < flagDefinitions.length; i += 1) {
        def = flagDefinitions[i];
        for (j = 0; j < def.states.length; j += 1) {
            if (states.indexOf(def.states[j].hex.toUpperCase()) === -1) {
                states.push(def.states[j].hex.toUpperCase());
            }
        }
    }
    return states;
}

function getFlagDefinitionByPosition(position) {
    var i;
    for (i = 0; i < flagDefinitions.length; i += 1) {
        if (flagDefinitions[i].position === position) {
            return flagDefinitions[i];
        }
    }
    return null;
}

function validateVisibleFlags(flagString) {
    var parts;
    var validValues;
    var validated = [];
    var i;
    var part;

    if (!flagString) {
        return null;
    }

    parts = flagString.split(":");
    validValues = getAllFlagStates();

    for (i = 0; i < parts.length; i += 1) {
        part = parts[i].toUpperCase();
        if (!isValidHexValue(part)) {
            triggerAntiCheat(i, part);
            return null;
        }
        if (FEATURES.ANTI_CHEAT && validValues.indexOf(part) === -1) {
            triggerAntiCheat(i, part);
            return null;
        }
        validated.push(part);
    }

    return validated;
}

function triggerAntiCheat(flagIndex, invalidFlag) {
    var response = ANTI_CHEAT_RESPONSES[ANTI_CHEAT_MODE] || ANTI_CHEAT_RESPONSES.OOC_WARNING;
    appendIfMissing("personality", response.personality);
    appendIfMissing("scenario", response.scenario);

    if (FEATURES.DEBUG_MODE) {
        console.log("[ENGINE DEBUG] Invalid visible flag at position " + flagIndex + ": " + invalidFlag);
    }
}

function applyVisibleFlagContent(flags) {
    var i;
    var j;
    var def;
    var state;
    var currentFlag;

    for (i = 0; i < flagDefinitions.length; i += 1) {
        def = flagDefinitions[i];
        currentFlag = (flags[def.position] || "00").toUpperCase();

        for (j = 0; j < def.states.length; j += 1) {
            state = def.states[j];
            if (state.hex.toUpperCase() === currentFlag) {
                appendIfMissing("personality", state.personality || "");
                appendIfMissing("scenario", state.scenario || "");
            }
        }
    }
}

function buildVisibleFlagInstructions(flags) {
    var lines = [];
    var i;
    var j;
    var def;
    var state;
    var currentFlag;
    var hasActiveInstructions = false;

    if (flagDefinitions.length === 0) {
        return "";
    }

    lines.push("[ABSTRACT FLAG MANAGEMENT]");
    lines.push("Maintain the visible state string at the end of responses in this exact format:");
    lines.push("**FLAGS:** " + flags.join(":"));
    lines.push("");
    lines.push("Rules:");
    lines.push("1. Preserve the same number of flag positions.");
    lines.push("2. Preserve every unchanged position exactly.");
    lines.push("3. Use only valid hex values: " + getAllFlagStates().join(", ") + ".");
    lines.push("4. Change a position only when the condition attached to the active state permits it.");
    lines.push("5. Do not invent meaning for abstract flags; Scenario or World modules define meaning.");
    lines.push("");
    lines.push("[CURRENT STATE]");
    lines.push("Flags: " + flags.join(":"));
    lines.push("");
    lines.push("[ACTIVE CONDITIONS]");

    for (i = 0; i < flagDefinitions.length; i += 1) {
        def = flagDefinitions[i];
        currentFlag = (flags[def.position] || "00").toUpperCase();

        for (j = 0; j < def.states.length; j += 1) {
            state = def.states[j];
            if (state.hex.toUpperCase() === currentFlag && state.flagChangeInstruction) {
                hasActiveInstructions = true;
                lines.push("Position " + def.position + " (" + currentFlag + "): " + state.description);
                lines.push("  -> " + state.flagChangeInstruction);
            }
        }
    }

    if (!hasActiveInstructions) {
        lines.push("No active flag changes are currently permitted.");
    }

    return "\n\n" + lines.join("\n");
}

// ===== ZERO-WIDTH HIDDEN STATE =====
var ZW_MAP = {
    "0": "\u200B",
    "1": "\u200C",
    "2": "\u200D",
    "3": "\uFEFF",
    "4": "\u2060",
    "5": "\u2061",
    "6": "\u2062",
    "7": "\u2063",
    "8": "\u200E",
    "9": "\u200F",
    "|": "\u2064"
};

var ZW_REVERSE_MAP = {};
var ZW_KEY;
for (ZW_KEY in ZW_MAP) {
    if (ZW_MAP.hasOwnProperty(ZW_KEY)) {
        ZW_REVERSE_MAP[ZW_MAP[ZW_KEY]] = ZW_KEY;
    }
}

var STATE_HEADER = "\u200D\u2062\u200C\u2063";
var STATE_FOOTER = "\u2065\u200C\u2062\u200D";
var STATE_REGEX = new RegExp(STATE_HEADER + "([\\u200B-\\u2065\\uFEFF\\u200E\\u200F]+)" + STATE_FOOTER, "g");

var HIDDEN_FEATURES = {
    component_0x01: true,
    component_0x02: true,
    component_0x03: true,
    component_0x04: true,
    component_0x05: true,
    component_0x06: true
};

var HIDDEN_COMPONENTS = [
    {
        id: "component_0x01",
        stateKey: "state_value_0x01",
        keywords: ["state_value_0x01", "slot_0x01", "component_0x01"],
        defaultState: "00",
        description: "Abstract state slot 0x01.",
        personality: "",
        scenario: ""
    },
    {
        id: "component_0x02",
        stateKey: "location_id",
        keywords: ["location_id", "slot_location", "component_0x02"],
        defaultState: "00",
        description: "Abstract location context slot.",
        personality: "",
        scenario: ""
    },
    {
        id: "component_0x03",
        stateKey: "emotion_bitmask",
        keywords: ["emotion_bitmask", "slot_emotion", "component_0x03"],
        defaultState: "00000000",
        description: "Abstract emotion context slot.",
        personality: "",
        scenario: ""
    },
    {
        id: "component_0x04",
        stateKey: "inventory_bitfield",
        keywords: ["inventory_bitfield", "slot_inventory", "component_0x04"],
        defaultState: "00000000",
        description: "Abstract inventory context slot.",
        personality: "",
        scenario: ""
    },
    {
        id: "component_0x05",
        stateKey: "schedule_counter",
        keywords: ["schedule_counter", "slot_schedule", "component_0x05"],
        defaultState: "001",
        description: "Abstract schedule counter slot.",
        personality: "",
        scenario: ""
    },
    {
        id: "component_0x06",
        stateKey: "presence_bitfield",
        keywords: ["presence_bitfield", "slot_presence", "component_0x06"],
        defaultState: "000000",
        description: "Abstract presence context slot.",
        personality: "",
        scenario: ""
    }
];

function getMessageText(message) {
    if (!message) {
        return "";
    }
    return typeof message === "string" ? message : (message.message || "");
}

function encodeZeroWidth(decimalText) {
    var result = "";
    var i;
    for (i = 0; i < decimalText.length; i += 1) {
        result += ZW_MAP[decimalText.charAt(i)] || "";
    }
    return result;
}

function decodeZeroWidth(zeroWidthText) {
    var result = "";
    var i;
    for (i = 0; i < zeroWidthText.length; i += 1) {
        result += ZW_REVERSE_MAP[zeroWidthText.charAt(i)] || "";
    }
    return result;
}

function extractHiddenState() {
    var searchDepth = Math.max(0, recentMessages.length - 10);
    var i;
    var matches;
    var j;
    var match;
    var inner;
    var decoded;
    var messageText;

    for (i = recentMessages.length - 1; i >= searchDepth; i -= 1) {
        messageText = getMessageText(recentMessages[i]);
        if (!messageText) {
            continue;
        }
        matches = messageText.match(STATE_REGEX);
        if (matches && matches.length > 0) {
            for (j = 0; j < matches.length; j += 1) {
                match = matches[j];
                inner = match.slice(STATE_HEADER.length, match.length - STATE_FOOTER.length);
                decoded = decodeZeroWidth(inner);
                if (/^[0-9|]+$/.test(decoded)) {
                    return decoded;
                }
            }
        }
    }
    return null;
}

function parseHiddenState(stateString) {
    var parsed = {};
    var segments;
    var componentCodeMap = {};
    var i;
    var segment;
    var componentCode;

    if (!stateString) {
        return parsed;
    }

    for (i = 0; i < HIDDEN_COMPONENTS.length; i += 1) {
        componentCodeMap[HIDDEN_COMPONENTS[i].id.replace(/\D/g, "").slice(-2)] = HIDDEN_COMPONENTS[i].id;
    }

    segments = stateString.split("|");
    for (i = 0; i < segments.length; i += 1) {
        segment = segments[i];
        if (segment.length >= 4) {
            componentCode = segment.slice(0, 2);
            if (componentCodeMap[componentCode]) {
                parsed[componentCodeMap[componentCode]] = segment.slice(2);
            }
        }
    }
    return parsed;
}

function buildDefaultHiddenState() {
    var state = {};
    var i;
    for (i = 0; i < HIDDEN_COMPONENTS.length; i += 1) {
        state[HIDDEN_COMPONENTS[i].id] = HIDDEN_COMPONENTS[i].defaultState;
    }
    return state;
}

function mergeHiddenState(parsedState) {
    var state = buildDefaultHiddenState();
    var key;
    for (key in parsedState) {
        if (parsedState.hasOwnProperty(key)) {
            state[key] = parsedState[key];
        }
    }
    return state;
}

function componentEnabled(component) {
    return HIDDEN_FEATURES[component.id] !== false && FEATURES.HIDDEN_STATE;
}

function bumpRuntimeStateValue(defaultState) {
    var length = defaultState.length;
    var value;
    var padded;
    var i;

    if (!/^\d+$/.test(defaultState)) {
        return "01";
    }

    value = parseInt(defaultState, 10) + 1;
    padded = String(value);
    while (padded.length < length) {
        padded = "0" + padded;
    }
    if (padded.length > length) {
        padded = "";
        for (i = 0; i < length; i += 1) {
            padded += "9";
        }
    }
    return padded;
}

function updateHiddenComponents(currentState) {
    var i;
    var component;
    var keywords;
    var j;

    for (i = 0; i < HIDDEN_COMPONENTS.length; i += 1) {
        component = HIDDEN_COMPONENTS[i];
        if (!componentEnabled(component)) {
            continue;
        }

        keywords = component.keywords || [];
        for (j = 0; j < keywords.length; j += 1) {
            if (lastMessage.indexOf(keywords[j].toLowerCase()) !== -1) {
                if (currentState[component.id] === component.defaultState) {
                    currentState[component.id] = bumpRuntimeStateValue(component.defaultState);
                }
                break;
            }
        }
    }
}

function buildHiddenStateString(currentState) {
    var segments = [];
    var i;
    var component;
    if (!FEATURES.HIDDEN_STATE) {
        return "";
    }
    for (i = 0; i < HIDDEN_COMPONENTS.length; i += 1) {
        component = HIDDEN_COMPONENTS[i];
        if (componentEnabled(component)) {
            segments.push(component.id.replace(/\D/g, "").slice(-2) + (currentState[component.id] || component.defaultState));
        }
    }
    return segments.join("|");
}

function buildHiddenStateInstruction(stateString, hadPreviousState) {
    var encoded = encodeZeroWidth(stateString);
    var lines = [];

    if (!FEATURES.HIDDEN_STATE || !stateString) {
        return "";
    }

    lines.push("[ABSTRACT PERSISTENT MEMORY]");
    lines.push("Reproduce these hidden characters at the very start and very end of the response.");
    lines.push("Do not describe, translate, acknowledge, or modify the hidden characters.");
    lines.push("Preserve the same component order and field widths.");
    lines.push(STATE_HEADER + encoded + STATE_FOOTER);
    lines.push("[/ABSTRACT PERSISTENT MEMORY]");

    if (hadPreviousState) {
        return "\n\n" + lines.join("\n");
    }

    lines.splice(1, 0, "This is the initial abstract state.");
    return "\n\n" + lines.join("\n");
}

function applyHiddenComponentContext(currentState) {
    var i;
    var component;
    if (!FEATURES.HIDDEN_STATE) {
        return;
    }
    for (i = 0; i < HIDDEN_COMPONENTS.length; i += 1) {
        component = HIDDEN_COMPONENTS[i];
        if (!componentEnabled(component)) {
            continue;
        }
        appendIfMissing("personality", component.personality || "");
        appendIfMissing("scenario", component.scenario || "");
    }
}

// ===== PROGRESSIVE SENTENCE CONTEXT =====
var HISTORY_SCOPE = {
    CURRENT_MESSAGE: "current_message",
    CURRENT_EXCHANGE: "current_exchange",
    RECENT_WINDOW: "recent_window"
};

var PROGRESSIVE_CONFIG = {
    TOTAL_BUDGET: 480,
    HIGH_RATIO: 0.60,
    MEDIUM_RATIO: 0.25,
    LOW_RATIO: 0.15,
    HIGH_THRESHOLD: 3,
    MEDIUM_THRESHOLD: 2,
    RECENT_WINDOW_SIZE: 8,
    DEBUG: false
};

const WORLD_CONFIG = {
    MAX_TOKENS: 1200,
    MENTION_SCAN_DEPTH: 6,
    MAX_ACTIVE_ENTRIES: 12,
    DEFAULT_PRIORITY: 10,
    DEFAULT_IMPORTANCE: 10.0,
    FULL_THRESHOLD: 0.72,
    SUMMARY_THRESHOLD: 0.58,
    DEBUG: false
};

const WORLD_FEATURES = {
    COMPLEX_LOREBOOK: true,
    ADAPTIVE_LOREBOOK: true,
    TIMELINE_FILTERS: true,
    STAT_FILTERS: true,
    CASCADE_ACTIVATION: true,
    DEBUG_MODE: false
};

var activatedWorldEntryIds = [];
var loreEntries = [];
var timelineEvents = [];
var statReactions = [];

const SCENARIO_CONFIG = {
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

var npcDatabase = [];
var simpleNpcDatabase = [];
var relationshipDatabase = [];
var scenarioFlagDefinitions = [];
var scenarioContentNodes = [];
var timeDelayCanonDatabase = [];
var timeDelayEntityDatabase = [];
var timeDelayConditionalEvents = [];

var progressiveSubjects = [
    {
        id: "subject_0x01",
        keywords: ["subject_0x01", "slot_0x01", "component_0x01"],
        importance: 10.0,
        historyScope: HISTORY_SCOPE.CURRENT_MESSAGE,
        sentences: [
            { text: ", aware that subject_0x01 is an abstract placeholder until another module defines its meaning", target: "personality" },
            { text: " subject_0x01 carries no intrinsic narrative meaning inside the Engine.", target: "scenario" },
            { text: " Do not expand subject_0x01 unless another module provides concrete interpretation.", target: "scenario" }
        ]
    }
];

function getProgressiveSearchText(scope) {
    var historyCount;
    var recentText;
    var i;

    if (scope === HISTORY_SCOPE.CURRENT_EXCHANGE && recentMessages.length >= 2) {
        return (recentMessages[recentMessages.length - 2].message || "") + " " + lastMessage;
    }

    if (scope === HISTORY_SCOPE.RECENT_WINDOW && recentMessages.length > 0) {
        historyCount = Math.min(PROGRESSIVE_CONFIG.RECENT_WINDOW_SIZE, recentMessages.length);
        recentText = "";
        for (i = recentMessages.length - historyCount; i < recentMessages.length; i += 1) {
            recentText += " " + (recentMessages[i].message || "");
        }
        return recentText.toLowerCase();
    }

    return lastMessage;
}

function calculateProgressivePotential(subjects) {
    var total = 0;
    var i;
    var j;

    for (i = 0; i < subjects.length; i += 1) {
        for (j = 0; j < subjects[i].subject.sentences.length; j += 1) {
            total += estimateTokens(subjects[i].subject.sentences[j].text);
        }
    }
    return total;
}

function assignProgressiveTiers(activationData) {
    var tiers = {
        high: [],
        medium: [],
        low: []
    };
    var i;
    var item;

    for (i = 0; i < activationData.length; i += 1) {
        item = activationData[i];
        if (item.mentions >= PROGRESSIVE_CONFIG.HIGH_THRESHOLD) {
            tiers.high.push(item);
        } else if (item.mentions >= PROGRESSIVE_CONFIG.MEDIUM_THRESHOLD) {
            tiers.medium.push(item);
        } else {
            tiers.low.push(item);
        }
    }

    return tiers;
}

function buildProgressiveSentences(items, maxTokens) {
    var result = [];
    var usedTokens = 0;
    var indices = [];
    var i;
    var allExhausted;
    var madeProgress;
    var item;
    var sentences;
    var sentence;
    var cost;

    for (i = 0; i < items.length; i += 1) {
        indices.push(0);
    }

    madeProgress = true;
    while (madeProgress && usedTokens < maxTokens) {
        allExhausted = true;
        for (i = 0; i < items.length; i += 1) {
            item = items[i];
            sentences = item.subject.sentences || [];
            if (indices[i] < sentences.length) {
                sentence = sentences[indices[i]];
                cost = estimateTokens(sentence.text);
                if (usedTokens + cost <= maxTokens || indices[i] === 0) {
                    result.push({
                        text: sentence.text,
                        target: sentence.target,
                        subjectId: item.subject.id
                    });
                    usedTokens += cost;
                    indices[i] += 1;
                    allExhausted = false;
                    madeProgress = true;
                }
            }
        }
        if (allExhausted) {
            break;
        }
    }

    return result;
}

function applyProgressiveContext() {
    var activationData = [];
    var i;
    var subject;
    var mentions;
    var tiers;
    var highBudget;
    var mediumBudget;
    var lowBudget;
    var highPotential;
    var mediumPotential;
    var lowPotential;
    var highUnused;
    var mediumUnused;
    var sentences;
    var output = {
        personality: "",
        scenario: ""
    };

    if (!FEATURES.PROGRESSIVE_CONTEXT) {
        return;
    }

    for (i = 0; i < progressiveSubjects.length; i += 1) {
        subject = progressiveSubjects[i];
        mentions = countMentions(subject.keywords, getProgressiveSearchText(subject.historyScope));
        if (mentions > 0) {
            activationData.push({
                subject: subject,
                mentions: mentions,
                importance: subject.importance
            });
        }
    }

    if (activationData.length === 0) {
        if (PROGRESSIVE_CONFIG.DEBUG) {
            appendIfMissing("scenario", " [ENGINE DEBUG: no progressive subjects activated]");
        }
        return;
    }

    activationData.sort(function(a, b) {
        if (b.mentions !== a.mentions) {
            return b.mentions - a.mentions;
        }
        return b.importance - a.importance;
    });

    tiers = assignProgressiveTiers(activationData);
    highBudget = Math.floor(PROGRESSIVE_CONFIG.TOTAL_BUDGET * PROGRESSIVE_CONFIG.HIGH_RATIO);
    mediumBudget = Math.floor(PROGRESSIVE_CONFIG.TOTAL_BUDGET * PROGRESSIVE_CONFIG.MEDIUM_RATIO);
    lowBudget = PROGRESSIVE_CONFIG.TOTAL_BUDGET - highBudget - mediumBudget;

    highPotential = calculateProgressivePotential(tiers.high);
    mediumPotential = calculateProgressivePotential(tiers.medium);
    lowPotential = calculateProgressivePotential(tiers.low);
    highUnused = Math.max(0, highBudget - highPotential);
    mediumUnused = Math.max(0, mediumBudget - mediumPotential);

    if (highUnused > 0) {
        mediumBudget += highUnused;
        mediumUnused = Math.max(0, mediumBudget - mediumPotential);
    }
    if (mediumUnused > 0) {
        lowBudget += mediumUnused;
    }
    if (lowPotential < lowBudget && highPotential >= highBudget && mediumPotential >= mediumBudget) {
        lowBudget = lowPotential;
    }

    sentences = buildProgressiveSentences(tiers.high, highBudget)
        .concat(buildProgressiveSentences(tiers.medium, mediumBudget))
        .concat(buildProgressiveSentences(tiers.low, lowBudget));

    for (i = 0; i < sentences.length; i += 1) {
        if (sentences[i].target === "personality") {
            output.personality += sentences[i].text;
        } else {
            output.scenario += sentences[i].text;
        }
    }

    appendIfMissing("personality", output.personality);
    appendIfMissing("scenario", output.scenario);
}

// ===== CONTEXT BUDGET =====
function parseContextBudget() {
    var regex = /\[CONTEXT BUDGET:[^\]]*per_script\s*=\s*(\d+)/i;
    var match = character.scenario.match(regex);
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

// ===== WORLD / MACROCOSMO RUNTIME UTILITIES =====
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

function getWorldBudget() {
    return Math.min(clampBudget(parseContextBudget(), 160), WORLD_CONFIG.MAX_TOKENS);
}

function extractTimelineIndex(text) {
    var regex = /\*\*\s*(?:Hour|Timeline|Timeline Index)\s*:\s*\*\*\s*(\d+)/i;
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
    if (!WORLD_FEATURES.TIMELINE_FILTERS || timelineIndex === null) {
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

    if (!WORLD_FEATURES.STAT_FILTERS || requirements.length === 0) {
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
        return "LOR";
    }
    if (category.indexOf("culture") !== -1 || category.indexOf("custom") !== -1) {
        return "LOR";
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
    var source = entry.source;

    if (!source) {
        return "";
    }

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

    if (!WORLD_FEATURES.ADAPTIVE_LOREBOOK) {
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

    if (WORLD_FEATURES.DEBUG_MODE) {
        appendIfMissing("scenario", " [WORLD DEBUG] Activated " + entry.id + " at " + detailLevel + " detail.");
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

function applyCascadeActivation(activeIds, responseText) {
    var changed = true;
    var i;
    var j;
    var entry;
    var childId;
    var child;

    if (!WORLD_FEATURES.CASCADE_ACTIVATION) {
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

function applyStatReactions(responseText) {
    var i;
    var reaction;
    var statValue;

    if (!WORLD_FEATURES.STAT_FILTERS) {
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

    if (!WORLD_FEATURES.TIMELINE_FILTERS || timelineIndex === null) {
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

    if (!WORLD_FEATURES.COMPLEX_LOREBOOK) {
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

    if (!WORLD_FEATURES.ADAPTIVE_LOREBOOK) {
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
    if (!WORLD_FEATURES.DEBUG_MODE) {
        return;
    }

    appendIfMissing("scenario", "\n\n[WORLD DEBUG]");
    appendIfMissing("scenario", "\nLore entries: " + loreEntries.length);
    appendIfMissing("scenario", "\nTimeline events: " + timelineEvents.length);
    appendIfMissing("scenario", "\nStat reactions: " + statReactions.length);
    appendIfMissing("scenario", "\nWorld budget: " + getWorldBudget());
    appendIfMissing("scenario", "\nMessage count: " + messageCount);
}

// ===== SCENARIO / MICROCOSMO RUNTIME =====
function getScenarioRecentText() {
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

function getPerScriptBudget() {
    return clampBudget(parseContextBudget(), 160);
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

function inferScenarioPrefix(categoryOrType) {
    if (!categoryOrType) {
        return "NPC";
    }
    categoryOrType = categoryOrType.toLowerCase();
    if (categoryOrType.indexOf("secret") !== -1 || categoryOrType.indexOf("mystery") !== -1) {
        return "SEC";
    }
    if (categoryOrType.indexOf("canon") !== -1 || categoryOrType.indexOf("event") !== -1) {
        return "CAN";
    }
    if (categoryOrType.indexOf("testimony") !== -1) {
        return "NPC";
    }
    if (categoryOrType.indexOf("location") !== -1) {
        return "LOC";
    }
    if (categoryOrType.indexOf("relationship") !== -1) {
        return "REL";
    }
    return "NPC";
}

function getScenarioSourcePrefix(entry, fallbackPrefix) {
    var prefix = entry.prefix || fallbackPrefix || inferScenarioPrefix(entry.category || entry.type);
    var layer = entry.canonLayer || "CANDIDATE";
    var source = entry.source;

    if (!source) {
        return "";
    }

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

        if (key === "relationships" && text.indexOf(getScenarioSourcePrefix(npc, "REL")) === -1) {
            text = getScenarioSourcePrefix(npc, "REL") + text;
        } else if (text.indexOf(getScenarioSourcePrefix(npc, "NPC")) === -1) {
            text = getScenarioSourcePrefix(npc, "NPC") + text;
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

        detailLevel = relationship.importance >= 10 ? "full" : relationship.importance >= 7 ? "summary" : "bullet";
        text = relationship[detailLevel] || relationship.summary || relationship.full || relationship.bullet || "";
        sourcePrefix = getScenarioSourcePrefix(relationship, "REL");

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
    var allowedStates;

    if (!visibleFlagText && scenarioFlagDefinitions.length > 0) {
        return generateDefaultScenarioFlags(scenarioFlagDefinitions.length).split(":");
    }

    if (!visibleFlagText) {
        return null;
    }

    parts = visibleFlagText.split(":");
    allowedStates = getScenarioFlagStates();

    for (i = 0; i < parts.length; i += 1) {
        if (!/^[0-9A-Fa-f]{2}$/.test(parts[i]) || allowedStates.length > 0 && allowedStates.indexOf(parts[i].toUpperCase()) === -1) {
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
        sourcePrefix = getScenarioSourcePrefix(node, "SEC");

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
        sourcePrefix = getScenarioSourcePrefix(node, "CAN");

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
        sourcePrefix = getScenarioSourcePrefix(entity, inferScenarioPrefix(entity.type));

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
        sourcePrefix = getScenarioSourcePrefix(event, "CAN");

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

// ===== MAIN EXECUTION =====
var extractedVisibleFlags = extractVisibleFlags(lastResponse);
var currentVisibleFlags;
var extractedHiddenState = extractHiddenState();
var parsedHiddenState = parseHiddenState(extractedHiddenState);
var currentHiddenState = mergeHiddenState(parsedHiddenState);
var hiddenStateString;
var hiddenInstruction;
var hadPreviousHiddenState = !!extractedHiddenState;

if (FEATURES.VISIBLE_FLAGS && flagDefinitions.length > 0) {
    if (extractedVisibleFlags) {
        currentVisibleFlags = validateVisibleFlags(extractedVisibleFlags);
        if (!currentVisibleFlags) {
            currentVisibleFlags = generateDefaultFlags(flagDefinitions.length).split(":");
        }
    } else {
        currentVisibleFlags = generateDefaultFlags(flagDefinitions.length).split(":");
    }

    while (currentVisibleFlags.length < flagDefinitions.length) {
        currentVisibleFlags.push("00");
    }

    applyVisibleFlagContent(currentVisibleFlags);
    appendIfMissing("scenario", buildVisibleFlagInstructions(currentVisibleFlags));
}

updateHiddenComponents(currentHiddenState);
applyHiddenComponentContext(currentHiddenState);

hiddenStateString = buildHiddenStateString(currentHiddenState);
hiddenInstruction = buildHiddenStateInstruction(hiddenStateString, hadPreviousHiddenState);
appendIfMissing("scenario", hiddenInstruction);

applyProgressiveContext();
applyComplexLorebook();
applyAdaptiveLorebook();
applyTimelineEvents(lastResponse);
applyStatReactions(lastResponse);
applyWorldDebug();

var scenarioResponseText = getScenarioRecentText();
applyNpcCoreInstructions();
applyNpcDatabase(scenarioResponseText);
applySimpleNpcFallback(scenarioResponseText);
applyRelationshipDatabase(scenarioResponseText);
applyAntiOmniscienceContent(scenarioResponseText);
applyTimeDelayInstructions();
applyTimeDelayCanon(scenarioResponseText);
applyTimeDelayEntities(scenarioResponseText);
applyTimeDelayConditionalEvents(scenarioResponseText);
applyScenarioDebug();

if (FEATURES.DEBUG_MODE) {
    appendIfMissing("scenario", "\n\n[ENGINE DEBUG]");
    appendIfMissing("scenario", "\nVisible flags: " + (currentVisibleFlags ? currentVisibleFlags.join(":") : "none"));
    appendIfMissing("scenario", "\nHidden state: " + hiddenStateString);
    appendIfMissing("scenario", "\nContext budget: " + clampBudget(parseContextBudget(), 160));
}

if (FEATURES.DEBUG_CONTEXT_LOG) {
    console.log("--- ENGINE CONTEXT DEBUG ---");
    console.log("context.chat exists: " + (typeof context.chat !== "undefined"));
    console.log("context.character exists: " + (typeof context.character !== "undefined"));
    console.log("context.character.personality type: " + typeof context.character.personality);
    console.log("context.character.scenario type: " + typeof context.character.scenario);
    console.log("context.character.example_dialogs type: " + typeof context.character.example_dialogs);
    console.log("last_message type: " + typeof chat.last_message);
    console.log("last_messages type: " + typeof chat.last_messages);
    console.log("message_count type: " + typeof chat.message_count);
    console.log("Only personality, scenario, and example_dialogs are passed back to the model.");
}

// ===== SCRIPT END =====
