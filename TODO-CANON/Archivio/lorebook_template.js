/**
 * Lightweight lorebook template
 * - Base behavior + advanced lore engine
 * - Duplicate this file and fill in your scenario data
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
// 1. DYNAMIC RELATIONSHIP BASE (Optional - uncomment to use)
// ----------------------------------------------------------------------
/*
if (messageCount < 5) {
    appendTraits(", polite but distant", " First meeting tension.");
} else if (messageCount < 15) {
    appendTraits(", warming up", " Becoming more relaxed.");
} else {
    appendTraits(", deeply connected", " Trusts completely.");
}
*/

// ----------------------------------------------------------------------
// 2. LORE ENTRIES DICTIONARY
// ----------------------------------------------------------------------
// Define your scenario data, locations, rules, and characters here.
const loreEntries = [
    {
        // Example: Constant Setting Rule (always active)
        keywords: ["setting"],
        constant: true,
        priority: 100,
        minMessages: 0,
        category: "setting",
        probability: 100,
        scenario: " <setting>Place your core scenario background here.</setting>"
    },
    {
        // Example: Triggered Character Entry
        keywords: ["john", "john doe", "mr doe"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [John Doe: 30yo human detective. Cynical, smokes a lot, highly perceptive.]"
    },
    {
        // Example: Triggered Location with filters and probabilities
        keywords: ["the bar", "tavern", "pub"],
        priority: 120,
        minMessages: 5, // Only activates after 5 messages
        category: "location",
        probability: 80, // 80% chance to activate when triggered
        filters: {
            notWith: ["closed", "burned down"] // Don't trigger if these words are present
        },
        scenario: " <location>The Rusty Anchor is a shady harbor tavern filled with mercenaries.</location>"
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
// Map spoken aliases to an NPC key
const npcAliases = [
    ["john", ["john", "john doe", "mr doe", "detective"]],
    ["jane", ["jane", "jane smith", "miss smith"]]
];

// Define how {{user}} perceives or interacts with each NPC key
const npcRelationshipSummaries = {
    john: "{{user}} acts cautiously around John, knowing he is a perceptive detective.",
    jane: "{{user}} considers Jane a reliable ally and speaks to her warmly."
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
