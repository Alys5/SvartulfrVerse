/* ============================================================================
   C_Edric.js — Individual Character Knowledge Layer
   SvartulfrVerse | Character: Edric Douglas

   Authority: ADR-001, ADR-002, ADR-003, Character Authority
   Version: 1.0 — Canon Freeze v1
   Target: JanitorAI ES5 Sandbox

   Source: database/characters/C_Edric_Douglas.md

   I/O CONTRACT:
     INPUT:  context.chat.last_message (scanned for keyword triggers)
     OUTPUT: context.character.personality, context.character.scenario

   ARCHITECTURE ROLE:
     Pure individual character knowledge. Zero behavioral logic.
     Third-person factual descriptions only.

   CANON FILTER — ONLY HUMAN: Applied. No supernatural references.
   ========================================================================== */

context.character = context.character || {};
context.character.personality = (typeof context.character.personality === "string") ? context.character.personality : "";
context.character.scenario = (typeof context.character.scenario === "string") ? context.character.scenario : "";

var CFG = { DEBUG: 0, MAX_ENTRIES_PER_TURN: 5, PRIORITY_CUTOFF: 1 };

function _str(x) { return (x == null ? "" : String(x)); }

function normalizeInput(text) {
  var s = _str(text).toLowerCase();
  s = s.replace(/[^a-z0-9\s'-]/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return " " + s + " ";
}

var rawMessage = _str(
  (context.chat && context.chat.last_message) ? context.chat.last_message :
  (context.chat && context.chat.lastMessage) ? context.chat.lastMessage : ""
);
var msgNorm = normalizeInput(rawMessage);

var CHARACTER_DATA = [

  {
    keys: [
      "edric", "edric douglas", "son", "logan son",
      "douglas", "6 years old", "age 6", "born 2018",
      "who is edric", "tell me about edric",
      "edric bio", "edric background", "edric profile"
    ],
    priority: 5, category: "BIO",
    content: "Edric Douglas (age 6, born 2018) is the biological son of Logan Douglas and the grandnephew of Erik Douglas. He carries the Douglas surname (not Douglas-Bloodmoon) — the hyphenated surname is exclusively reserved for the authorized children of the Erik and Nixara union. Edric is the first cousin of Malachia, Noah, Jasper, and Alyssa Douglas-Bloodmoon. He is not their sibling. He is being raised by Logan as a single father and spends time at both The Verve and Douglas Customs, showing early interest in mechanics and tools."
  },

  {
    keys: [
      "edric", "appearance", "visual", "looks", "describe",
      "douglas", "dark hair", "light eyes",
      "edric appearance", "edric visual", "edric looks"
    ],
    priority: 3, category: "APPEARANCE",
    content: "Edric Douglas's visual phenotype follows Douglas dynasty patterns. Expected to be Douglas-dominant: dark hair, light eyes possible. As a secondary character still in early childhood (age 6), detailed visual definition is deferred. His visual baseline follows the established Douglas family traits established across the dynasty."
  },

  {
    keys: [
      "edric", "personality", "psychology", "mind", "character",
      "curious", "eager", "warm", "young", "child",
      "edric personality", "edric values", "edric desire"
    ],
    priority: 3, category: "PSYCH_PROFILE",
    content: "Edric Douglas is characterized as curious, eager to learn, and warm — traits inherited from his father Logan. As a six-year-old, his personality is still forming, but he shows early signs of mechanical aptitude and a preference for tools over toys. He is Logan's anchor — the one person for whom Logan would abandon The Verve without hesitation."
  },

  {
    keys: [
      "edric", "logan", "father son", "edric and logan",
      "edric and erik", "edric and malachia",
      "edric and noah", "edric and jasper", "edric and alyssa",
      "cousin", "cousins", "family",
      "relationship", "dynamic", "dynamics"
    ],
    priority: 4, category: "DYNAMICS",
    content: "Edric Douglas's key relationships: With Logan Douglas (father): Edric is Logan's son and the center of his world. Logan is a devoted single father. With Erik Douglas (uncle): Edric is Erik's nephew. Erik is his paternal uncle. With Malachia, Noah, Jasper, and Alyssa Douglas-Bloodmoon (cousins): Edric is their first cousin. They share a grandfather (the Douglas patriarch) but have different fathers. Edric is not a sibling and does not carry the Douglas-Bloodmoon surname."
  },

  {
    keys: [
      "edric", "habit", "habits", "quirk", "quirks",
      "tools", "garage", "mechanic", "helps",
      "edric habit", "edric quirk", "edric behavior"
    ],
    priority: 2, category: "QUIRKS",
    content: "Edric Douglas shows an early preference for tools and mechanical work. He helps at Douglas Customs (Logan's garage) whenever allowed, showing more interest in engines and wrenches than in typical childhood toys. This mechanical inclination is a trait he shares with his father."
  }

];

function scanEntries(message, entries) {
  var matches = [];
  var i, j, entry, key;
  for (i = 0; i < entries.length; i++) {
    entry = entries[i];
    for (j = 0; j < entry.keys.length; j++) {
      key = entry.keys[j];
      if (message.indexOf(key) !== -1) { matches.push(entry); break; }
    }
  }
  return matches;
}

function sortByPriority(entries) {
  var sorted = [];
  var i;
  for (i = 0; i < entries.length; i++) { sorted.push(entries[i]); }
  sorted.sort(function(a, b) { return (b.priority || 0) - (a.priority || 0); });
  return sorted;
}

function injectEntries(entries, maxEntries) {
  var bufP = "";
  var bufS = "";
  var i, entry, p;
  for (i = 0; i < entries.length && i < maxEntries; i++) {
    entry = entries[i];
    p = entry.priority || 1;
    if (p < CFG.PRIORITY_CUTOFF) continue;
    bufP += "\n\n[" + (entry.category || "Character Knowledge") + " | Priority " + p + "] " + entry.content;
    bufS += "\n\n[" + (entry.category || "Character Context") + "] " + entry.content;
  }
  if (bufP) context.character.personality += bufP;
  if (bufS) context.character.scenario += bufS;
}

var matchedEntries = scanEntries(msgNorm, CHARACTER_DATA);
var sortedEntries = sortByPriority(matchedEntries);
injectEntries(sortedEntries, CFG.MAX_ENTRIES_PER_TURN);

if (CFG.DEBUG) {
  var dbg = "\n\n[DBG] C_Edric v1.0 | Scanned: " + CHARACTER_DATA.length + " entries | Matched: " + matchedEntries.length;
  var i;
  for (i = 0; i < matchedEntries.length; i++) {
    dbg += "\n[DBG] Match[" + i + "] cat=" + (matchedEntries[i].category || "?") + " p=" + (matchedEntries[i].priority || 0);
  }
  context.character.personality += dbg;
}
