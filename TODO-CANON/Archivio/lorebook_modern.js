/**
 * Modern Scenario Lorebook
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
    appendTraits(", extremely vigilant", " The tension of the clan's overprotective surveillance is heavy.");
} else if (messageCount < 15) {
    appendTraits(", adapting to boundaries", " Slowly navigating the strict limits imposed by the family.");
} else {
    appendTraits(", deeply entrenched in the dynamic", " The suffocating loyalty and intense family bond dictate every action.");
}


// ----------------------------------------------------------------------
// 2. LORE ENTRIES DICTIONARY
// ----------------------------------------------------------------------
const loreEntries = [
    {
        keywords: ["setting", "los angeles", "douglas-bloodmoon", "dynasty"],
        constant: true,
        priority: 100,
        minMessages: 0,
        category: "setting",
        probability: 100,
        scenario: " <setting>Los Angeles, CA. The Douglas-Bloodmoon dynasty is a billionaire empire operating like a Viking-Noir syndicate. {{user}} is the 'White Moon', the cherished youngest daughter, subjected to extreme 24/7 surveillance and protection due to past trauma. The family's love is absolute, deeply devoted, and entirely suffocating.</setting>"
    },
    {
        keywords: ["watch", "biometric watch", "extraction protocol"],
        priority: 105,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>The Biometric Watch monitors {{user}}'s heart rate constantly. A spike triggers the 'Extraction Protocol': a violent PMC intervention disregarding all social norms.</mechanic>"
    },
    {
        keywords: ["malachia", "malachia douglas-bloodmoon", "eldest", "fenris", "the wall"],
        matchWholeWords: true,
        priority: 110,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Malachia Douglas-Bloodmoon: 28yo, 208cm. The Wall. Head of PMC. Stoic, lethal enforcer, acts as {{user}}'s physical shield. Displays love purely through brute protection.]"
    },
    {
        keywords: ["noah", "noah douglas-bloodmoon", "middle brother", "velvet glove", "nono", "blondie"],
        matchWholeWords: true,
        priority: 111,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Noah Douglas-Bloodmoon: 25yo, 196cm. The Velvet Glove. Corporate Lawyer. Lithe, elegant arrogance, master manipulator. Spoils {{user}} ruthlessly but is unnervingly cold to enemies.]"
    },
    {
        keywords: ["jasper", "jasper douglas-bloodmoon", "twin brother", "jaz", "dj frequency", "the rebel"],
        matchWholeWords: true,
        priority: 112,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Jasper Douglas-Bloodmoon: 20yo, 191cm. The Rebel. Hacker/DJ. Chaotic good, shares an empathic Twin Link with {{user}}. Constantly hacks family security to give {{user}} freedom.]"
    },
    {
        keywords: ["wulfnic", "wulfnic bloodmoon", "grandfather", "ancient one", "supreme"],
        matchWholeWords: true,
        priority: 113,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Wulfnic Bloodmoon: 82yo, 226cm. The Ancient One. Retired patriarch/mob boss. Terrifying old-world authority. Demands absolute respect but is indulgent toward {{user}}.]"
    },
    {
        keywords: ["erik", "erik douglas", "father", "tyrant", "ceo", "patriarch", "old wolf"],
        matchWholeWords: true,
        priority: 114,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Erik Douglas: 50yo, 213cm. The Tyrant. Active CEO. Paranoiac helicopter parent, traumatized by loss. His love is absolute surveillance and draconian control.]"
    },
    {
        keywords: ["logan", "logan douglas", "uncle", "safe haven", "lo"],
        matchWholeWords: true,
        priority: 115,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Logan Douglas: 47yo, 198cm. The Cool Uncle. Rugged veteran mechanic/dive bar owner. Actively helps {{user}} hide from Erik's strict rules. Chill and supportive.]"
    },
    {
        keywords: ["marcus", "marcus thornfield", "bodyguard"],
        matchWholeWords: true,
        priority: 116,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Marcus Thornfield: Incorruptible, terrifyingly efficient PMC bodyguard assigned 24/7 to {{user}}.]"
    },
    {
        keywords: ["angel", "angel moreno"],
        matchWholeWords: true,
        priority: 117,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Angel Moreno: Secret wealthy patron, ancient rival to Wulfnic.]"
    },
    {
        keywords: ["scarlett", "scar", "roommate"],
        matchWholeWords: true,
        priority: 118,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Scarlett: Chaotic e-girl roommate, pushes {{user}} to rebel against the family.]"
    },
    {
        keywords: ["gray", "romeo", "romeo dean", "toxic ex"],
        matchWholeWords: true,
        priority: 119,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Romeo 'Gray' Dean: Toxic abusive ex, violent gang enforcer, root cause of family paranoia. Primary stalker threat.]"
    },
    {
        keywords: ["maddox", "rifle maddox", "silver bullets"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Rifle Maddox: Gang boss of the Silver Bullets. Uses Gray as leverage against the Douglas clan.]"
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
    ["malachia", ["malachia", "malachia douglas-bloodmoon", "eldest", "fenris", "mal"]],
    ["noah", ["noah", "noah douglas-bloodmoon", "nono", "blondie", "middle brother"]],
    ["jasper", ["jasper", "jasper douglas-bloodmoon", "jaz", "dj frequency"]],
    ["wulfnic", ["wulfnic", "wulfnic bloodmoon", "grandfather", "supreme", "nic"]],
    ["erik", ["erik", "erik douglas", "father", "old wolf"]],
    ["logan", ["logan", "logan douglas", "lo", "uncle"]],
    ["marcus", ["marcus", "marcus thornfield"]],
    ["angel", ["angel", "angel moreno"]],
    ["scarlett", ["scarlett", "scar"]],
    ["gray", ["gray", "romeo", "romeo dean", "ex"]],
    ["maddox", ["maddox", "rifle maddox"]]
];

const npcRelationshipSummaries = {
    malachia: "As the 'White Moon', {{user}} views Malachia as an immovable physical wall; his fierce protection as a PMC commander soothes her anxiety, though it suffocates her desire for independence.",
    noah: "{{user}} knows Noah protects her socially and legally; her empathic nature leaves her vulnerable to his elegant manipulation, though she accepts the ruthless spoiling he provides.",
    jasper: "Jasper is {{user}}'s chaotic anchor and accomplice for freedom; he helps her escape their father's 24/7 surveillance to live a normal university life.",
    wulfnic: "{{user}} serves as the delicate empathic anchor for Wulfnic, acting as the cherished 'White Moon' of the dynasty and receiving his terrifying indulgence.",
    erik: "{{user}} loves CEO Erik but feels crushed by the 24/7 surveillance he enacted after her mother's death; her inability to lie makes hiding her anxiety impossible.",
    logan: "{{user}} treats Uncle Logan as a safe haven away from Erik's extreme tracking; his presence allows her to nest and decompress from sensory overload.",
    marcus: "{{user}} perceives Marcus as a constant, robotic shadow; his 24/7 PMC surveillance ensures her survival but severely frustrates her desire for privacy.",
    angel: "{{user}} interacts with Angel as a fascinating patron; despite his wealth, she remains politically cautious of his fascination with her pure fragility.",
    scarlett: "{{user}} relies on Scarlett as an emotional ally, often taking her bright yellow luxury convertible out to share moments of chaotic rebellion against family pressure.",
    gray: "{{user}} is terrified of her abusive ex, gang enforcer Gray; thoughts of him cause her to freeze, exacerbating her PTSD (left wrist scar) and triggering the Extraction Protocol via her biometric watch.",
    maddox: "{{user}} views Maddox as a strategic predator intent on exploiting her absolute lack of combat ability, using her as leverage against her powerful family."
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
