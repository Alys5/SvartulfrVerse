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
    VISIBLE_FLAGS: true,
    ANTI_CHEAT: true,
    HIDDEN_STATE: true,
    PROGRESSIVE_CONTEXT: true,
    DEBUG_CONTEXT_LOG: false,
    DEBUG_MODE: false
};

var ANTI_CHEAT_MODE = "OOC_WARNING";

var ANTI_CHEAT_RESPONSES = {
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
    "9": "\u200F"
};

var ZW_REVERSE_MAP = {};
var ZW_KEY;
for (ZW_KEY in ZW_MAP) {
    if (ZW_MAP.hasOwnProperty(ZW_KEY)) {
        ZW_REVERSE_MAP[ZW_MAP[ZW_KEY]] = ZW_KEY;
    }
}

var STATE_HEADER = "\u200D\u2062\u200C\u2063";
var STATE_FOOTER = "\u2063\u200C\u2062\u200D";
var STATE_REGEX = new RegExp(STATE_HEADER + "([\\u200B-\\u2063\\u200E\\u200F]+)" + STATE_FOOTER, "g");

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
        description: "Abstract location identifier slot.",
        personality: "",
        scenario: ""
    },
    {
        id: "component_0x03",
        stateKey: "emotion_bitmask",
        keywords: ["emotion_bitmask", "slot_emotion", "component_0x03"],
        defaultState: "00000000",
        description: "Abstract emotion bitmask slot.",
        personality: "",
        scenario: ""
    },
    {
        id: "component_0x04",
        stateKey: "inventory_bitfield",
        keywords: ["inventory_bitfield", "slot_inventory", "component_0x04"],
        defaultState: "00000000",
        description: "Abstract inventory bitfield slot.",
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
        description: "Abstract presence bitfield slot.",
        personality: "",
        scenario: ""
    }
];

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

    for (i = recentMessages.length - 1; i >= searchDepth; i -= 1) {
        if (!recentMessages[i] || !recentMessages[i].message) {
            continue;
        }
        matches = recentMessages[i].message.match(STATE_REGEX);
        if (matches && matches.length > 0) {
            for (j = 0; j < matches.length; j += 1) {
                match = matches[j];
                inner = match.slice(STATE_HEADER.length, match.length - STATE_FOOTER.length);
                decoded = decodeZeroWidth(inner);
                if (/^\d+$/.test(decoded)) {
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
    var i;
    var segment;

    if (!stateString) {
        return parsed;
    }

    segments = stateString.split("|");
    for (i = 0; i < segments.length; i += 1) {
        segment = segments[i];
        if (segment.length >= 4) {
            parsed[segment.slice(0, 2)] = segment.slice(2);
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
                    currentState[component.id] = "01";
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
