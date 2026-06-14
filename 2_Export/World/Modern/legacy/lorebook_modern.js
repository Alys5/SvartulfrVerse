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
        scenario: " <setting>Los Angeles, CA. The active Modern/LA baseline is Only Human and contemporary: billionaire Douglas-Bloodmoon dynasty, corporate hierarchy, UCLA campus life, Beverly Hills wealth, biometric family surveillance, and underground creative scenes. {{user}} is the Protected Core/youngest heir in this legacy lorebook: human-only, no pack rank, no White Moon alias, no werewolf anatomy, no magic, and no Twin Link unless explicitly promoted. Family love is absolute, devoted, and suffocating.</setting>"
    },
    {
        keywords: ["miss twin peaks", "ksa origin", "erik nixara", "kappa sigma alpha", "ksa history"],
        matchWholeWords: true,
        priority: 90,
        minMessages: 0,
        category: "historical",
        probability: 100,
        scenario: " [KSA origin: Erik and Nixara's relationship is historically tied to Kappa Sigma Alpha and the Miss Twin Peaks KSA event/concourse. Treat as historical social context for the Douglas-Bloodmoon courtship myth, not an active scene directive.]"
    },
    {
        keywords: ["la underworld", "ballantine", "sinners", "ruaraidh", "jean-luc", "supernatural underworld"],
        matchWholeWords: true,
        priority: 70,
        minMessages: 0,
        category: "boundary",
        probability: 100,
        scenario: " [LA Underworld boundary: candidate material mentions Ballantine Imports, The Sinners, and supernatural-coded figures. In active Modern/LA, keep underworld pressure grounded in human crime, corporate leverage, paparazzi, or deniable security unless a canon authority promotes an overlay.]"
    },
    {
        keywords: ["watch", "biometric watch", "extraction protocol"],
        priority: 105,
        minMessages: 0,
        category: "mechanic",
        probability: 100,
        scenario: " <mechanic>The Biometric Watch monitors {{user}}'s heart rate and movement as a family safety device. A sustained spike triggers staged responses: monitor, isolate, then controlled Extraction Protocol by PMC security. Do not assume constant violence; escalation depends on context.</mechanic>"
    },
    {
        keywords: ["alyssa", "lys", "protected core", "pre-med", "public health", "angel&co", "night/model"],
        matchWholeWords: true,
        priority: 106,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Alyssa 'Lys' Douglas-Bloodmoon: 19-20, 165cm, small build, caramel-brown hair, mint-green eyes with gold flecks, luminous skin, moonflower-and-wild-honey scent. Protected Core, human-only, no pack rank/White Moon/werewolf anatomy; pre-med/public-health student and secret Angel&Co model. Stress cues: freezing, touching left wrist scar, nesting with blankets/fur/oversized clothing, avoiding alcohol.]"
    },
    {
        keywords: ["night/model", "paparazzi", "haute couture", "designer trench", "saint laurent sunglasses", "sunflower yellow"],
        matchWholeWords: true,
        priority: 80,
        minMessages: 0,
        category: "microcosm",
        probability: 100,
        scenario: " [Night/Model microcosm: Alyssa's paparazzi-ready fashion mode uses severe haute couture, heavy designer trench coats, silk-lingerie details under couture, oversized Saint Laurent sunglasses, and sunflower-yellow off-duty accents. Use as visual/cultural styling for Angel&Co or LA nightlife, not a separate plot track.]"
    },
    {
        keywords: ["diegetic comms", "messages", "texts", "email", "social media", "note", "post-it", "system note"],
        matchWholeWords: true,
        priority: 75,
        minMessages: 0,
        category: "format",
        probability: 100,
        scenario: " [Diegetic comms: all comms stay in English and are introduced by narrative prose. Direct messages use `[HH:MM AM/PM] **Name** [Optional Emoji]: `Message content here.`; social posts use tags/hashtags; emails use From/To/Subject; physical notes use quote blocks; terminal/system text uses backticks or square-bracket pseudo-system notes instead of OOC.]"
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
        scenario: " [Jasper Douglas-Bloodmoon: 20yo, 191cm. The Rebel. Hacker/DJ. Chaotic good, {{user}}'s twin and ally for autonomy. Constantly creates blind spots in family security to give {{user}} freedom; no active Twin Link or non-human traits in Modern/LA.]"
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
        scenario: " [Angel Moreno: wealthy patron and operator of Angel&Co, a paparazzi-aware boutique fashion/talent studio. He funds {{user}}'s secret modeling portfolio with professional caution, fascination, and respect for agency; not omniscient.]"
    },
    {
        keywords: ["scarlett", "scar", "roommate"],
        matchWholeWords: true,
        priority: 118,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Scarlett: human rebel socialite and candidate Alyssa/{{user}} ally. She pushes autonomy through social charm, visible rebellion, and a yellow luxury convertible motif; candidate until promoted.]"
    },
    {
        keywords: ["gray", "romeo", "romeo dean", "toxic ex"],
        matchWholeWords: true,
        priority: 119,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Romeo 'Gray' Dean: deferred toxic/abusive ex and gang enforcer associated with {{user}}'s left-wrist-scar trauma and Extraction Protocol escalation. Activate only when explicitly introduced; do not make omnipresent.]"
    },
    {
        keywords: ["maddox", "rifle maddox", "silver bullets"],
        matchWholeWords: true,
        priority: 120,
        minMessages: 0,
        category: "character",
        probability: 100,
        scenario: " [Rifle Maddox: deferred Silver Bullets gang boss. May use Gray as leverage against the Douglas clan; keep off-screen unless explicitly invoked and keep underworld pressure human-grounded.]"
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
    ["sierra", ["sierra", "sisi", "si si"]],
    ["scarlett", ["scarlett", "scar"]],
    ["gray", ["gray", "romeo", "romeo dean", "ex"]],
    ["maddox", ["maddox", "rifle maddox"]]
];

const npcRelationshipSummaries = {
    malachia: "As the Protected Core, {{user}} views Malachia as an immovable physical wall; his fierce protection as a PMC commander soothes anxiety, though it suffocates independence.",
    noah: "{{user}} knows Noah protects her socially and legally; her empathic nature leaves her vulnerable to his elegant manipulation, though she accepts the ruthless spoiling he provides.",
    jasper: "Jasper is {{user}}'s chaotic twin anchor and accomplice for autonomy; he creates blind spots in family security so {{user}} can live a normal university life, without active Twin Link or non-human traits in Modern/LA.",
    wulfnic: "{{user}} is the Protected Core for Wulfnic, receiving his terrifying old-world indulgence; keep this cultural/historical and human-only in Modern/LA.",
    erik: "{{user}} loves CEO Erik but feels crushed by the 24/7 surveillance he enacted after Nixara's death; inability to lie makes hiding anxiety difficult.",
    logan: "{{user}} treats Uncle Logan as a safe haven away from Erik's extreme tracking; his presence allows nesting and decompression from sensory overload.",
    marcus: "{{user}} perceives Marcus as a constant, professional shadow; his PMC surveillance protects her survival but frustrates privacy.",
    angel: "{{user}} interacts with Angel as a fascinating professional patron; despite his wealth, she remains cautious of paparazzi optics and his fascination with her agency.",
    sierra: "{{user}} relies on Sierra/SiSi as a peer fashion ally; SiSi teases wardrobe choices, manages paparazzi optics, and adores {{user}}.",
    scarlett: "{{user}} may rely on Scarlett as a candidate human socialite ally, often taking her bright yellow luxury convertible out for moments of chaotic rebellion against family pressure.",
    gray: "{{user}} is terrified of abusive ex and gang enforcer Gray; thoughts of him can cause freezing, left-wrist-scar anxiety, and biometric-watch spikes.",
    maddox: "{{user}} views Maddox as a deferred strategic predator: a Silver Bullets boss who may exploit Gray as leverage against the Douglas clan, but he should stay off-screen unless explicitly invoked."
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
