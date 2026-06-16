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

(function () {
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
let lastResponse = chat.last_message || chat.lastMessage || "";
let lastMessage = lastResponse.toLowerCase();
let messageCount = chat.message_count || chat.messageCount || 0;
let recentMessages = chat.last_messages || chat.lastMessages || [];

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
let flagDefinitions = [
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
    if (!character[field].includes(text)) {
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
    return Array.from(keywords).map(keyword => String(keyword).toLowerCase().trim()).filter(Boolean);
}

function escapeRegExp(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countMentions(keywords, text) {
    let normalizedKeywords = normalizeKeywords(keywords);
    let count = 0;
    let regex;
    let matches;

    for (let i = 0; i < normalizedKeywords.length; i++) {
        regex = new RegExp(escapeRegExp(normalizedKeywords[i]), "gi");
        matches = text.match(regex);
        if (matches) {
            count += matches.length;
        }
    }
    return count;
}

function extractVisibleFlags(response) {
    let regex = /\*\*FLAGS:\*\*\s*([0-9A-Fa-f:]+)/;
    let match = response.match(regex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}

function isValidHexValue(hexValue) {
    return /^[0-9A-Fa-f]{2}$/.test(hexValue);
}

function generateDefaultFlags(count) {
    let defaults = [];
    for (let i = 0; i < count; i++) {
        defaults.push("00");
    }
    return defaults.join(":");
}

function getAllFlagStates() {
    let states = [];
    let def;

    for (let i = 0; i < flagDefinitions.length; i++) {
        def = flagDefinitions[i];
        for (let j = 0; j < def.states.length; j++) {
            if (states.indexOf(def.states[j].hex.toUpperCase()) === -1) {
                states.push(def.states[j].hex.toUpperCase());
            }
        }
    }
    return states;
}

function validateVisibleFlags(flagString) {
    let parts;
    let validValues;
    let validated = [];
    let part;

    if (!flagString) {
        return null;
    }

    parts = flagString.split(":");
    validValues = getAllFlagStates();

    for (let i = 0; i < parts.length; i++) {
        part = parts[i].toUpperCase();
        if (!isValidHexValue(part)) {
            triggerAntiCheat(i, part);
            return null;
        }
        if (FEATURES.ANTI_CHEAT && !validValues.includes(part)) {
            triggerAntiCheat(i, part);
            return null;
        }
        validated.push(part);
    }

    return validated;
}

function triggerAntiCheat(flagIndex, invalidFlag) {
    let response = ANTI_CHEAT_RESPONSES[ANTI_CHEAT_MODE] || ANTI_CHEAT_RESPONSES.OOC_WARNING;
    appendIfMissing("personality", response.personality);
    appendIfMissing("scenario", response.scenario);

    if (FEATURES.DEBUG_MODE) {
        console.log("[ENGINE DEBUG] Invalid visible flag at position " + flagIndex + ": " + invalidFlag);
    }
}

function applyVisibleFlagContent(flags) {
    let def;
    let state;
    let currentFlag;

    for (let i = 0; i < flagDefinitions.length; i++) {
        def = flagDefinitions[i];
        currentFlag = (flags[def.position] || "00").toUpperCase();

        for (let j = 0; j < def.states.length; j++) {
            state = def.states[j];
            if (state.hex.toUpperCase() === currentFlag) {
                appendIfMissing("personality", state.personality || "");
                appendIfMissing("scenario", state.scenario || "");
            }
        }
    }
}

function buildVisibleFlagInstructions(flags) {
    let lines = [];
    let def;
    let state;
    let currentFlag;
    let hasActiveInstructions = false;

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

    for (let i = 0; i < flagDefinitions.length; i++) {
        def = flagDefinitions[i];
        currentFlag = (flags[def.position] || "00").toUpperCase();

        for (let j = 0; j < def.states.length; j++) {
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
let ZW_MAP = {
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

let ZW_REVERSE_MAP = {};
let ZW_KEY;
for (ZW_KEY in ZW_MAP) {
    if (ZW_MAP.hasOwnProperty(ZW_KEY)) {
        ZW_REVERSE_MAP[ZW_MAP[ZW_KEY]] = ZW_KEY;
    }
}

let STATE_HEADER = "\u200D\u2062\u200C\u2063";
let STATE_FOOTER = "\u2065\u200C\u2062\u200D";
let STATE_REGEX = new RegExp(STATE_HEADER + "([\\u200B-\\u2065\\uFEFF\\u200E\\u200F]+)" + STATE_FOOTER, "g");

let HIDDEN_FEATURES = {
    component_0x01: true,
    component_0x02: true,
    component_0x03: true,
    component_0x04: true,
    component_0x05: true,
    component_0x06: true
};

let HIDDEN_COMPONENTS = [
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
    let result = "";
    for (let i = 0; i < decimalText.length; i++) {
        result += ZW_MAP[decimalText.charAt(i)] || "";
    }
    return result;
}

function decodeZeroWidth(zeroWidthText) {
    let result = "";
    for (let i = 0; i < zeroWidthText.length; i++) {
        result += ZW_REVERSE_MAP[zeroWidthText.charAt(i)] || "";
    }
    return result;
}

function extractHiddenState() {
    let searchDepth = Math.max(0, recentMessages.length - 10);
    let matches;
    let match;
    let inner;
    let decoded;
    let messageText;

    for (i = recentMessages.length - 1; i >= searchDepth; i--) {
        messageText = getMessageText(recentMessages[i]);
        if (!messageText) {
            continue;
        }
        matches = messageText.match(STATE_REGEX);
        if (matches && matches.length > 0) {
            for (let j = 0; j < matches.length; j++) {
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
    let parsed = {};
    let segments;
    let componentCodeMap = {};
    let i;
    let segment;
    let componentCode;

    if (!stateString) {
        return parsed;
    }

    for (let i = 0; i < HIDDEN_COMPONENTS.length; i++) {
        componentCodeMap[HIDDEN_COMPONENTS[i].id.replace(/\D/g, "").slice(-2)] = HIDDEN_COMPONENTS[i].id;
    }

    segments = stateString.split("|");
    for (i = 0; i < segments.length; i++) {
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
    let state = {};
    for (let i = 0; i < HIDDEN_COMPONENTS.length; i++) {
        state[HIDDEN_COMPONENTS[i].id] = HIDDEN_COMPONENTS[i].defaultState;
    }
    return state;
}

function mergeHiddenState(parsedState) {
    let state = buildDefaultHiddenState();
    let key;
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
    let length = defaultState.length;
    let value;
    let padded;
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
        for (let i = 0; i < length; i++) {
            padded += "9";
        }
    }
    return padded;
}

function updateHiddenComponents(currentState) {
    let component;
    let keywords;
    for (let i = 0; i < HIDDEN_COMPONENTS.length; i++) {
        component = HIDDEN_COMPONENTS[i];
        if (!componentEnabled(component)) {
            continue;
        }

        keywords = component.keywords || [];
        for (let j = 0; j < keywords.length; j++) {
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
    let segments = [];
    let component;
    if (!FEATURES.HIDDEN_STATE) {
        return "";
    }
    for (let i = 0; i < HIDDEN_COMPONENTS.length; i++) {
        component = HIDDEN_COMPONENTS[i];
        if (componentEnabled(component)) {
            segments.push(component.id.replace(/\D/g, "").slice(-2) + (currentState[component.id] || component.defaultState));
        }
    }
    return segments.join("|");
}

function buildHiddenStateInstruction(stateString, hadPreviousState) {
    let encoded = encodeZeroWidth(stateString);
    let lines = [];

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
    let component;
    if (!FEATURES.HIDDEN_STATE) {
        return;
    }
    for (let i = 0; i < HIDDEN_COMPONENTS.length; i++) {
        component = HIDDEN_COMPONENTS[i];
        if (!componentEnabled(component)) {
            continue;
        }
        appendIfMissing("personality", component.personality || "");
        appendIfMissing("scenario", component.scenario || "");
    }
}

// ===== PROGRESSIVE SENTENCE CONTEXT =====
let HISTORY_SCOPE = {
    CURRENT_MESSAGE: "current_message",
    CURRENT_EXCHANGE: "current_exchange",
    RECENT_WINDOW: "recent_window"
};

let PROGRESSIVE_CONFIG = {
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

let activatedWorldEntryIds = [];
let loreEntries = [];
let timelineEvents = [];
let statReactions = [];

const SCENARIO_CONFIG = {
    MENTION_SCAN_DEPTH: 5,
    MAX_ACTIVE_NPCS: 8,
    MAX_RELATIONSHIPS: 8,
    MAX_TIME_DELAY_TOKENS: 1200,
    MAX_FLAG_CONTENT_TOKENS: 1200,
    DEFAULT_IMPORTANCE: 10.0,
    DEBUG: false
};

let CATEGORY_BUDGETS = {
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

let CATEGORY_TARGETS = {
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

let npcDatabase = [];
let simpleNpcDatabase = [];
let relationshipDatabase = [];
let scenarioFlagDefinitions = [];
let scenarioContentNodes = [];
let timeDelayCanonDatabase = [];
let timeDelayEntityDatabase = [];
let timeDelayConditionalEvents = [];

let progressiveSubjects = [
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
    let historyCount;
    let messages = [];
    if (scope === HISTORY_SCOPE.CURRENT_EXCHANGE && recentMessages.length >= 2) {
        return getMessageText(recentMessages[recentMessages.length - 2]) + " " + lastMessage;
    }

    if (scope === HISTORY_SCOPE.RECENT_WINDOW && recentMessages.length > 0) {
        historyCount = Math.min(PROGRESSIVE_CONFIG.RECENT_WINDOW_SIZE, recentMessages.length);
        for (i = recentMessages.length - historyCount; i < recentMessages.length; i++) {
            messages.push(getMessageText(recentMessages[i]));
        }
        return messages.join(" ").toLowerCase();
    }

    return lastMessage;
}

function calculateProgressivePotential(subjects) {
    let total = 0;
    let i;
    for (let i = 0; i < subjects.length; i++) {
        for (let j = 0; j < subjects[i].subject.sentences.length; j++) {
            total += estimateTokens(subjects[i].subject.sentences[j].text);
        }
    }
    return total;
}

function assignProgressiveTiers(activationData) {
    let tiers = {
        high: [],
        medium: [],
        low: []
    };
    let item;

    for (let i = 0; i < activationData.length; i++) {
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
    let result = [];
    let usedTokens = 0;
    let indices = [];
    let allExhausted;
    let madeProgress;
    let item;
    let sentences;
    let sentence;
    let cost;

    for (let i = 0; i < items.length; i++) {
        indices.push(0);
    }

    madeProgress = true;
    while (madeProgress && usedTokens < maxTokens) {
        allExhausted = true;
        for (i = 0; i < items.length; i++) {
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
    let activationData = [];
    let subject;
    let mentions;
    let tiers;
    let highBudget;
    let mediumBudget;
    let lowBudget;
    let highPotential;
    let mediumPotential;
    let lowPotential;
    let highUnused;
    let mediumUnused;
    let sentences;
    let output = {
        personality: "",
        scenario: ""
    };

    if (!FEATURES.PROGRESSIVE_CONTEXT) {
        return;
    }

    for (let i = 0; i < progressiveSubjects.length; i++) {
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

    activationData.sort((a, b) => {
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

    for (i = 0; i < sentences.length; i++) {
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
    let regex = /\[CONTEXT BUDGET:[^\]]*per_script\s*=\s*(\d+)/i;
    let match = character.scenario.match(regex);
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
function getRecentMessagesText(messages, depth) {
    let start = Math.max(0, messages.length - depth);
    let parts = [];
    for (i = start; i < messages.length; i++) {
        parts.push(getMessageText(messages[i]));
    }
    return parts.join(" ");
}

function getRecentText() {
    return getRecentMessagesText(recentMessages, WORLD_CONFIG.MENTION_SCAN_DEPTH);
}

function getWorldBudget() {
    return Math.min(clampBudget(parseContextBudget(), 160), WORLD_CONFIG.MAX_TOKENS);
}

function extractTimelineIndex(text) {
    let regex = /\*\*\s*(?:Hour|Timeline|Timeline Index)\s*:\s*\*\*\s*(\d+)/i;
    let match = text.match(regex);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return null;
}

function extractStatValue(text, statName) {
    let regex = new RegExp(escapeRegExp(statName) + "\\s*:\\s*(\\d+)", "i");
    let match = text.match(regex);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return null;
}

function entryWithinMessageWindow(entry, messageCount) {
    let minMessages = entry.minMessages;
    let maxMessages = entry.maxMessages;

    if (typeof minMessages === "number" && messageCount < minMessages) {
        return false;
    }

    if (typeof maxMessages === "number" && messageCount > maxMessages) {
        return false;
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
    let requirements = entry.statRequirements || [];
    let i;
    let statValue;

    if (!WORLD_FEATURES.STAT_FILTERS || requirements.length === 0) {
        return true;
    }

    for (let i = 0; i < requirements.length; i++) {
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
    let filters = entry.filters;
    let matches;
    let condition;

    if (!filters || !filters.conditions || filters.conditions.length === 0) {
        return true;
    }

    matches = 0;
    for (let i = 0; i < filters.conditions.length; i++) {
        condition = filters.conditions[i];
        if (conditionMatches(condition, responseText)) {
            matches++;
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
    if (category.includes("location") || category.includes("luogo")) {
        return "LOC";
    }
    if (category.includes("organization") || category.includes("faction") || category.includes("fazione")) {
        return "ORG";
    }
    if (category.includes("history") || category.includes("event") || category.includes("timeline")) {
        return "LOR";
    }
    if (category.includes("culture") || category.includes("custom")) {
        return "LOR";
    }
    if (category.includes("npc") || category.includes("character") || category.includes("personaggio")) {
        return "NPC";
    }
    if (category.includes("family") || category.includes("famiglia")) {
        return "FAM";
    }
    if (category.includes("creature") || category.includes("bestiary")) {
        return "BST";
    }
    if (category.includes("secret") || category.includes("mystery")) {
        return "SEC";
    }

    return "LOR";
}

function getSourcePrefix(entry) {
    let prefix = entry.prefix || inferPrefix(entry.category);
    let layer = entry.canonLayer || "CANDIDATE";
    let source = entry.source;

    if (!source) {
        return "";
    }

    return " [" + layer + "] " + prefix + " Source: " + source + ".";
}

function getEntryPayload(entry, level) {
    let payload = entry[level] || {};
    let personality = payload.personality || "";
    let scenario = payload.scenario || "";
    let sourcePrefix = getSourcePrefix(entry);

    if (scenario && !scenario.includes(sourcePrefix)) {
        scenario = sourcePrefix + scenario;
    }

    return {
        personality: personality,
        scenario: scenario
    };
}

function calculateDetailLevel(entry, mentionCount, importance) {
    let ratio = 0.0;

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

function activateEntry(entry, responseText, activeIds) {
    let keywords = entry.keywords || [];
    let timelineIndex = extractTimelineIndex(responseText);
    let mentionCount = 0;
    let detailLevel;
    let payload;

    if (!entryWithinMessageWindow(entry, messageCount) || !entryWithinTimeline(entry, timelineIndex) || !entryMatchesStatRequirements(entry, responseText) || !entryMatchesFilters(entry, responseText)) {
        return;
    }

    if (keywords.length > 0) {
        mentionCount = countMentions(keywords, responseText);
        if (mentionCount === 0) {
            return;
        }
    }

    if (activeIds.includes(entry.id)) {
        return;
    }

    detailLevel = calculateDetailLevel(entry, mentionCount, entry.importance || WORLD_CONFIG.DEFAULT_IMPORTANCE);
    payload = getEntryPayload(entry, detailLevel);
    appendIfMissing("personality", payload.personality);
    appendIfMissing("scenario", payload.scenario);
    activeIds.push(entry.id);
    if (!activatedWorldEntryIds.includes(entry.id)) {
        activatedWorldEntryIds.push(entry.id);
    }

    if (WORLD_FEATURES.DEBUG_MODE) {
        appendIfMissing("scenario", " [WORLD DEBUG] Activated " + entry.id + " at " + detailLevel + " detail.");
    }
}

function getEntryById(id) {
    for (let i = 0; i < loreEntries.length; i++) {
        if (loreEntries[i].id === id) {
            return loreEntries[i];
        }
    }
    return null;
}

function sortActiveEntries(activationData) {
    activationData.sort((a, b) => {
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
    let changed = true;
    let entry;
    let childId;
    let child;
    let activeCountBefore;

    if (!WORLD_FEATURES.CASCADE_ACTIVATION) {
        return;
    }

    while (changed) {
        changed = false;
        for (let i = 0; i < loreEntries.length; i++) {
            entry = loreEntries[i];
            if (!activeIds.includes(entry.id)) {
                continue;
            }

            if (!entry.cascade || !entry.cascade.enabled || !entry.cascade.children) {
                continue;
            }

            for (let j = 0; j < entry.cascade.children.length; j++) {
                childId = entry.cascade.children[j];
                child = getEntryById(childId);
                if (!child || activeIds.includes(child.id) || activatedWorldEntryIds.includes(child.id)) {
                    continue;
                }

                activeCountBefore = activeIds.length;
                activateEntry(child, responseText, activeIds);
                if (activeIds.length > activeCountBefore) {
                    changed = true;
                }
            }
        }
    }
}

function applyStatReactions(responseText) {
    let reaction;
    let statValue;

    if (!WORLD_FEATURES.STAT_FILTERS) {
        return;
    }

    for (let i = 0; i < statReactions.length; i++) {
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
    let timelineIndex = extractTimelineIndex(responseText);
    let event;
    let detailLevel;
    let payload;

    if (!WORLD_FEATURES.TIMELINE_FILTERS || timelineIndex === null) {
        return;
    }

    for (let i = 0; i < timelineEvents.length; i++) {
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
    let responseText = getRecentText();
    let timelineIndex = extractTimelineIndex(responseText);
    let activationData = [];
    let activeIds = [];
    let entry;
    let keywords;
    let mentions;
    let payload;
    let detailLevel;

    if (!WORLD_FEATURES.COMPLEX_LOREBOOK) {
        return;
    }

    for (let i = 0; i < loreEntries.length; i++) {
        entry = loreEntries[i];
        keywords = entry.keywords || [];
        mentions = countMentions(keywords, responseText);

        if (keywords.length > 0 && mentions === 0) {
            continue;
        }
        if (!entryWithinMessageWindow(entry, messageCount) || !entryWithinTimeline(entry, timelineIndex) || !entryMatchesStatRequirements(entry, responseText) || !entryMatchesFilters(entry, responseText)) {
            continue;
        }

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

    for (i = 0; i < activationData.length; i++) {
        entry = activationData[i].entry;
        detailLevel = calculateDetailLevel(entry, activationData[i].mentions, activationData[i].importance);
        payload = getEntryPayload(entry, detailLevel);
        appendIfMissing("personality", payload.personality);
        appendIfMissing("scenario", payload.scenario);
        activeIds.push(entry.id);
        if (!activatedWorldEntryIds.includes(entry.id)) {
            activatedWorldEntryIds.push(entry.id);
        }
    }

    applyCascadeActivation(activeIds, responseText);
}

function applyAdaptiveLorebook() {
    let responseText = getRecentText();
    let budget = getWorldBudget();
    let activationData = [];
    let entry;
    let mentions;
    let detailLevel;
    let payload;
    let cost;
    let usedTokens = 0;

    if (!WORLD_FEATURES.ADAPTIVE_LOREBOOK) {
        return;
    }

    for (let i = 0; i < loreEntries.length; i++) {
        entry = loreEntries[i];
        if (activatedWorldEntryIds.includes(entry.id)) {
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

    activationData.sort((a, b) => {
        if (b.mentions !== a.mentions) {
            return b.mentions - a.mentions;
        }
        return b.importance - a.importance;
    });

    for (i = 0; i < activationData.length; i++) {
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
    return getRecentMessagesText(recentMessages, SCENARIO_CONFIG.MENTION_SCAN_DEPTH);
}

function getPerScriptBudget() {
    return clampBudget(parseContextBudget(), 160);
}

function extractCanonCount(text) {
    let regex = /\*\*\s*Canon Count\s*:\s*\*\*\s*(\d+)/i;
    let match = text.match(regex);
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
    if (categoryOrType.includes("secret") || categoryOrType.includes("mystery")) {
        return "SEC";
    }
    if (categoryOrType.includes("canon") || categoryOrType.includes("event")) {
        return "CAN";
    }
    if (categoryOrType.includes("testimony")) {
        return "NPC";
    }
    if (categoryOrType.includes("location")) {
        return "LOC";
    }
    if (categoryOrType.includes("relationship")) {
        return "REL";
    }
    return "NPC";
}

function getScenarioSourcePrefix(entry, fallbackPrefix) {
    let prefix = entry.prefix || fallbackPrefix || inferScenarioPrefix(entry.category || entry.type);
    let layer = entry.canonLayer || "CANDIDATE";
    let source = entry.source;

    if (!source) {
        return "";
    }

    return " [" + layer + "] " + prefix + " Source: " + source + ".";
}

function getNpcById(id) {
    for (let i = 0; i < npcDatabase.length; i++) {
        if (npcDatabase[i].id === id) {
            return npcDatabase[i];
        }
    }
    return null;
}

function npcMatches(npc, responseText) {
    let names = npc.names || [];
    let keywords = npc.keywords || [];
    let combined = [];
    for (let i = 0; i < names.length; i++) {
        combined.push(names[i]);
    }
    for (i = 0; i < keywords.length; i++) {
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
    let ratio = 0.0;
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
    let categories = npc.categories || {};
    let categoryKeys = Object.keys(CATEGORY_BUDGETS);
    let personality = "";
    let scenario = "";
    let exampleDialogs = "";
    let key;
    let payload;
    let text;
    let target;

    for (let i = 0; i < categoryKeys.length; i++) {
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
    let lines;

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
    let activationData = [];
    let npc;
    let mentions;
    let detailLevel;
    let payload;
    let usedTokens = 0;
    let budget;

    if (!FEATURES.NPC_CORE) {
        return;
    }

    for (let i = 0; i < npcDatabase.length; i++) {
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

    activationData.sort((a, b) => {
        if (b.mentions !== a.mentions) {
            return b.mentions - a.mentions;
        }
        return b.importance - a.importance;
    });

    activationData = activationData.slice(0, SCENARIO_CONFIG.MAX_ACTIVE_NPCS);
    budget = getPerScriptBudget();

    for (i = 0; i < activationData.length; i++) {
        npc = activationData[i].npc;
        detailLevel = selectNpcDetailLevel(activationData[i].mentions, activationData[i].importance);
        payload = getNpcPayload(npc, detailLevel);
        let cost = estimateTokens(payload.personality) + estimateTokens(payload.scenario) + estimateTokens(payload.exampleDialogs);

        if (usedTokens + cost > budget && detailLevel !== "summary") {
            detailLevel = "summary";
            payload = getNpcPayload(npc, detailLevel);
            cost = estimateTokens(payload.personality) + estimateTokens(payload.scenario) + estimateTokens(payload.exampleDialogs);
        }

        if (usedTokens + cost > budget) {
            continue;
        }

        appendIfMissing("personality", payload.personality);
        appendIfMissing("scenario", payload.scenario);
        appendIfMissing("example_dialogs", payload.exampleDialogs);
        usedTokens += cost;

        if (FEATURES.DEBUG_MODE) {
            appendIfMissing("scenario", " [SCENARIO DEBUG] NPC activated: " + npc.id + " at " + detailLevel + " detail.");
        }
    }
}

function applySimpleNpcFallback(responseText) {
    let npc;
    let payload;

    if (!FEATURES.SIMPLE_NPC_FALLBACK || simpleNpcDatabase.length === 0) {
        return;
    }

    for (let i = 0; i < simpleNpcDatabase.length; i++) {
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
    let combined = [];
    let npc;
    if (relationship.npcId) {
        npc = getNpcById(relationship.npcId);
        if (npc) {
            combined = combined.concat(npc.names || []);
            combined = combined.concat(npc.keywords || []);
        }
    }

    combined = combined.concat(relationship.keywords || []);
    combined = combined.map(item => String(item).toLowerCase());

    if (combined.length === 0) {
        return false;
    }

    for (let i = 0; i < combined.length; i++) {
        if (responseText.includes(combined[i])) {
            return true;
        }
    }

    return false;
}

function applyRelationshipDatabase(responseText) {
    let activationData = [];
    let relationship;
    let detailLevel;
    let text;
    let sourcePrefix;
    let usedTokens = 0;
    let budget;

    if (!FEATURES.RELATIONSHIP_CORE || relationshipDatabase.length === 0) {
        return;
    }

    budget = getPerScriptBudget();

    for (let i = 0; i < relationshipDatabase.length; i++) {
        relationship = relationshipDatabase[i];
        if (!relationshipMatches(relationship, responseText)) {
            continue;
        }

        detailLevel = relationship.importance >= 10 ? "full" : relationship.importance >= 7 ? "summary" : "bullet";
        text = relationship[detailLevel] || relationship.summary || relationship.full || relationship.bullet || "";
        sourcePrefix = getScenarioSourcePrefix(relationship, "REL");

        if (text && !text.includes(sourcePrefix)) {
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
    let defaults = [];
    for (let i = 0; i < count; i++) {
        defaults.push("00");
    }
    return defaults.join(":");
}

function getScenarioFlagStates() {
    let states = [];
    let def;

    for (let i = 0; i < scenarioFlagDefinitions.length; i++) {
        def = scenarioFlagDefinitions[i];
        for (let j = 0; j < def.states.length; j++) {
            if (states.indexOf(def.states[j].hex.toUpperCase()) === -1) {
                states.push(def.states[j].hex.toUpperCase());
            }
        }
    }

    return states;
}

function getScenarioFlags() {
    let visibleFlagText = extractVisibleFlags(lastResponse);
    let parts;
    let allowedStates;

    if (!visibleFlagText && scenarioFlagDefinitions.length > 0) {
        return generateDefaultScenarioFlags(scenarioFlagDefinitions.length).split(":");
    }

    if (!visibleFlagText) {
        return null;
    }

    parts = visibleFlagText.split(":");
    allowedStates = getScenarioFlagStates();

    for (let i = 0; i < parts.length; i++) {
        if (!/^[0-9A-Fa-f]{2}$/.test(parts[i]) || allowedStates.length > 0 && allowedStates.indexOf(parts[i].toUpperCase()) === -1) {
            return null;
        }
    }

    return parts;
}

function flagMatches(flags, requirements) {
    let key;

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
    let key;

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
    let visibleFlagText = extractVisibleFlags(lastResponse);
    let lines;

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
    let ratio = 0.0;
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
    let flags = getScenarioFlags();
    let node;
    let level;
    let payload;
    let sourcePrefix;
    let usedTokens = 0;
    let budget;

    if (!FEATURES.ANTI_OMNISCIENCE || scenarioContentNodes.length === 0) {
        return;
    }

    appendIfMissing("scenario", getAntiOmniscienceInstructions());
    budget = Math.min(getPerScriptBudget(), SCENARIO_CONFIG.MAX_FLAG_CONTENT_TOKENS);

    for (let i = 0; i < scenarioContentNodes.length; i++) {
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

        if (payload && !payload.includes(sourcePrefix)) {
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
    let hour = getTimelineIndex();
    let canon = getCanonCount();

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
    let keywords = node.keywords || [];
    if (keywords.length === 0) {
        return true;
    }
    return countMentions(keywords, responseText) > 0;
}

function selectTimeDelayDetail(node, mentions) {
    let ratio = 0.0;
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
    let node;
    let level;
    let text;
    let sourcePrefix;
    let usedTokens = 0;
    let budget;

    if (!FEATURES.TIME_DELAY || timeDelayCanonDatabase.length === 0) {
        return;
    }

    budget = Math.min(getPerScriptBudget(), SCENARIO_CONFIG.MAX_TIME_DELAY_TOKENS);

    for (let i = 0; i < timeDelayCanonDatabase.length; i++) {
        node = timeDelayCanonDatabase[i];

        if (!timeDelayNodeWithinWindow(node) || !timeDelayNodeMatches(node, responseText)) {
            continue;
        }

        level = selectTimeDelayDetail(node, countMentions(node.keywords || [], responseText));
        text = node[level] || node.summary || node.full || node.bullet || "";
        sourcePrefix = getScenarioSourcePrefix(node, "CAN");

        if (text && !text.includes(sourcePrefix)) {
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
    let names = entity.names || [];
    let keywords = entity.keywords || [];
    let combined = names.concat(keywords);

    if (combined.length === 0) {
        return false;
    }

    return countMentions(combined, responseText) > 0;
}

function applyTimeDelayEntities(responseText) {
    let entity;
    let level;
    let text;
    let sourcePrefix;
    let usedTokens = 0;
    let budget;

    if (!FEATURES.TIME_DELAY || timeDelayEntityDatabase.length === 0) {
        return;
    }

    budget = Math.min(getPerScriptBudget(), SCENARIO_CONFIG.MAX_TIME_DELAY_TOKENS);

    for (let i = 0; i < timeDelayEntityDatabase.length; i++) {
        entity = timeDelayEntityDatabase[i];

        if (!timeDelayNodeWithinWindow(entity) || !entityMatches(entity, responseText)) {
            continue;
        }

        level = selectTimeDelayDetail(entity, countMentions((entity.names || []).concat(entity.keywords || []), responseText));
        text = entity[level] || entity.summary || entity.full || entity.bullet || "";
        sourcePrefix = getScenarioSourcePrefix(entity, inferScenarioPrefix(entity.type));

        if (text && !text.includes(sourcePrefix)) {
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
    if (!keywords || keywords.length === 0) {
        return true;
    }
    for (let i = 0; i < keywords.length; i++) {
        if (responseText.indexOf(keywords[i].toLowerCase()) !== -1) {
            return true;
        }
    }
    return false;
}

function conditionListAllMatch(responseText, keywords) {
    if (!keywords || keywords.length === 0) {
        return true;
    }
    for (let i = 0; i < keywords.length; i++) {
        if (responseText.indexOf(keywords[i].toLowerCase()) === -1) {
            return false;
        }
    }
    return true;
}

function applyTimeDelayConditionalEvents(responseText) {
    let event;
    let text;
    let sourcePrefix;
    let usedTokens = 0;
    let budget;

    if (!FEATURES.TIME_DELAY || timeDelayConditionalEvents.length === 0) {
        return;
    }

    budget = Math.min(getPerScriptBudget(), SCENARIO_CONFIG.MAX_TIME_DELAY_TOKENS);

    for (let i = 0; i < timeDelayConditionalEvents.length; i++) {
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

        if ((event.notWith || []).length > 0 && conditionListMatches(responseText, event.notWith)) {
            continue;
        }

        text = event.scenario || "";
        sourcePrefix = getScenarioSourcePrefix(event, "CAN");

        if (text && !text.includes(sourcePrefix)) {
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
    appendIfMissing("scenario", "\nUse unlocked canon entries only when their source conditions are true.");
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
let extractedVisibleFlags = extractVisibleFlags(lastResponse);
let currentVisibleFlags;
let extractedHiddenState = extractHiddenState();
let parsedHiddenState = parseHiddenState(extractedHiddenState);
let currentHiddenState = mergeHiddenState(parsedHiddenState);
let hiddenStateString;
let hiddenInstruction;
let hadPreviousHiddenState = !!extractedHiddenState;

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

let scenarioResponseText = getScenarioRecentText();
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
}());
