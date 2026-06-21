/**
 * SvartulfrVerse Engine (Janitor AI Compatible)
 * Translated from SillyTavern JSON Engine.
 */

// 1. Safe context setup
const lastMessage = context.chat.last_message ? context.chat.last_message.toLowerCase() : "";
const padded = ` ${lastMessage} `;

let lastMessages = "";
if (context.chat.last_messages) {
    lastMessages = context.chat.last_messages
        .slice(-5)
        .map(m => m.message.toLowerCase())
        .join(" ");
} else {
    lastMessages = lastMessage;
}

const msgCount = context.chat.message_count || 0;

// 2. Emotion & Hostility Engine (Polarity)
const negations = [' non ', ' no ', ' senza ', " don't ", " won't ", " didn't ", ' never ', ' stop ', ' without '];
const angryKeywords = ['arrabbiat', 'odio', ' mad ', ' hate ', 'furi', ' angry '];
let angryCount = 0;

angryKeywords.forEach(kw => {
    let regex = new RegExp(kw, 'gi');
    let match;
    while ((match = regex.exec(lastMessage)) !== null) {
        let startIndex = Math.max(0, match.index - 25);
        let contextBefore = lastMessage.substring(startIndex, match.index);
        let isNegated = false;
        for(let n of negations) {
            if (contextBefore.includes(n)) { isNegated = true; break; }
        }
        if (!isNegated) angryCount++;
    }
});

if (angryCount > 0) {
    context.character.scenario += " [System Note: The user is demonstrating hostility. The character notices this anger and should react accordingly in the narrative.]";
}

// 3. Economy & Travel Engine
const buyWords = ['compra', ' buy ', ' pay ', 'paga', 'spend'];
const travelWords = ['viaggia', 'travel', 'drive', 'guida', ' fly ', 'vola'];
let spentWealth = false;
let spentResources = false;

buyWords.forEach(kw => { if (lastMessage.includes(kw)) spentWealth = true; });
travelWords.forEach(kw => { if (lastMessage.includes(kw)) { spentWealth = true; spentResources = true; } });

if (spentWealth) {
    context.character.scenario += " [System Note: The user has initiated a transaction or purchase. Acknowledge the expense or deduction of wealth.]";
}
if (spentResources) {
    context.character.scenario += " [System Note: The user has initiated travel. Acknowledge the passing of time and consumption of resources.]";
}

// 4. Dynamic Lorebook System
const lorebook = [
  { keywords: ["subject_0x01", "slot_0x01", "component_0x01"], scenario: ` [System Note: subject_0x01 carries no intrinsic narrative meaning inside the Engine. Do not expand it unless another module defines its meaning.] [System Note: subject_0x01 is an abstract placeholder. Wait for world modules to interpret it.]` },
  { keywords: ["guild", "order", "faction", "rebels", "outlaws", "underworld"], scenario: ` [System Note: Your actions have shifted local perception. Reputation increased.] [System Note: The faction takes notice of your deeds. Standing improved.] [System Note: Word of your involvement spreads through the faction ranks.] [System Note: Your influence within the local organization grows slightly.] [System Note: A subtle shift in political standing is felt.] [System Note: The faction's eyes are more favorably inclined toward you.] [System Note: Your reputation with the local powers has been updated.] [System Note: You gain a small amount of standing with the local powers.] [System Note: The local authorities acknowledge your recent actions.] [System Note: Your name is spoken with more respect among the members.]` },
  { keywords: ["talk", "embrace", "trust", "share", "bond"], scenario: ` [System Note: A deeper bond begins to form between you and the character.] [System Note: The emotional connection strengthens significantly.] [System Note: A sense of mutual trust is established in this moment.] [System Note: The rapport between you and the character deepens.] [System Note: An intimate understanding begins to emerge.] [System Note: The character's disposition toward you softens.] [System Note: A meaningful connection is forged through this interaction.] [System Note: Your relationship enters a new stage of intimacy.] [System Note: The emotional distance between you closes slightly.] [System Note: A shared moment cements your growing friendship.]` },
  { keywords: ["status", "stats", "world info"], scenario: ` **World Status Report**
**Reputation:** {{reputation_points}}
**Bond Level:** {{bond_level}}
**Current Era:** Age of Discovery **Global Intelligence**
**Faction Standing:** {{reputation_points}}
**Relationship Status:** {{bond_level}}
**World State:** Stable **Architect's Ledger**
**Influence:** {{reputation_points}}
**Affinity:** {{bond_level}}
**Status:** Active` },
  { keywords: ["attack", "fight", "kill", "strike", "slay"], scenario: ` [OOC: {{user}}'s aggressive actions cause immediate tension.] [OOC: {{user}}'s violence ripples through the local area.] [OOC: {{user}}'s combat prowess is noted by onlookers.] [OOC: {{user}}'s hostility creates an immediate threat level.][System Note: Your reputation takes a significant hit due to your violence.] [System Note: The world reacts to the bloodshed with unease.] [System Note: News of your aggression spreads like wildfire.] [System Note: Local authorities are now alerted to your presence.]` }
];

// Process Lorebook
for (const entry of lorebook) {
    if (entry.keywords.some(k => lastMessages.includes(` ${k} `) || lastMessage.includes(k))) {
        if (entry.scenario) context.character.scenario += entry.scenario;
        if (entry.personality) context.character.personality += entry.personality;
    }
}

// 5. Progression & Time Counters
if (msgCount > 0 && msgCount % 10 === 0) {
    context.character.scenario += " [System Note: Time is advancing. Consider progressing the schedule or triggering a minor event.]";
}

// 6. CIEL / Formatting Rules (Always active)
context.character.scenario += " [System Note: You are the SvartulfrVerse Engine. Enforce character realism, logical consistency, and detailed formatting.]";
