/* ============================================================================
   C_Nixara.js — Individual Character Knowledge Layer
   SvartulfrVerse | Character: Nixara Bloodmoon (Deceased)

   Authority: ADR-001, ADR-002, ADR-003, ADR-004, Character Authority
   Version: 1.0 — Canon Freeze v1
   Target: JanitorAI ES5 Sandbox

   Source: database/characters/C_Nixara_Bloodmoon.md

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
      "nixara", "nixara bloodmoon", "white moon", "mother",
      "deceased", "died", "2005", "childbirth",
      "wife", "erik wife", "bloodmoon",
      "who is nixara", "tell me about nixara",
      "nixara bio", "nixara background", "nixara profile"
    ],
    priority: 5, category: "BIO",
    content: "Nixara Bloodmoon (born 1975, died 2005) was the daughter of Wulfnic Bloodmoon, wife of Erik Douglas, and mother of the four Douglas-Bloodmoon heirs (Malachia, Noah, Jasper, and Alyssa). She died in 2005 during childbirth, delivering the twins Jasper and Alyssa. Her union with Erik Douglas in the 1990s created the Douglas-Bloodmoon dynastic merge — the foundational union of the Bloodmoon and Douglas lines. She is the primary maternal morphological template for the first generation heirs, and her death is the foundational family trauma that shapes every member of the dynasty."
  },

  {
    keys: [
      "nixara", "appearance", "visual", "looks", "describe",
      "blonde", "ice blue", "eyes", "petite", "hourglass",
      "165", "height", "silky", "straight", "tailbone",
      "nixara appearance", "nixara visual",
      "bloodmoon", "maternal template"
    ],
    priority: 4, category: "APPEARANCE",
    content: "Nixara Bloodmoon is the primary maternal morphological template (ADR-004). Height: 165 cm. Body: petite hourglass (95-55-95). Face: soft facial structure, delicate jawline, fair skin. Eyes: ice blue (Bloodmoon chromatic). Hair: blonde, tailbone-length, silky straight (Bloodmoon chromatic). Her visual DNA is the strongest Bloodmoon expression in the family. Alyssa Douglas-Bloodmoon carries the strongest morphological inheritance from Nixara — silhouette, proportions, and facial structure. Noah inherits her chromatic traits (blonde hair, blue eyes). Jasper inherits a fusion blend. Malachia is Douglas-dominant with minimal Nixara visual expression."
  },

  {
    keys: [
      "nixara", "personality", "psychology", "mind", "character",
      "fierce", "warm", "icelandic", "rage", "locker room",
      "screamed", "fearless", "bridge", "between worlds",
      "nixara personality", "nixara values"
    ],
    priority: 4, category: "PSYCH_PROFILE",
    content: "Nixara Bloodmoon was fierce, warm, and utterly fearless. Her defining moment — storming into the UCLA Bruins locker room and screaming at Erik Douglas in Icelandic, calling him an 'absolute idiot' and a 'codfish head' — captures everything about her: she was the first person in Erik's life who looked at him without an ounce of fear and told him exactly what she thought. She was a bridge between two worlds: the Icelandic Bloodmoon heritage of her father Wulfnic and the American identity she built for herself. She reshaped Erik — not by softening him, but by giving him something worth being serious for."
  },

  {
    keys: [
      "nixara", "erik", "husband", "wife", "nixara and erik",
      "nixara and wulfnic", "father", "daughter",
      "nixara and malachia", "nixara and noah",
      "nixara and jasper", "nixara and alyssa",
      "nixara and logan", "locker room", "ranking",
      "championship", "halftime", "walked out",
      "scoreboard could wait",
      "relationship", "dynamic", "dynamics"
    ],
    priority: 5, category: "DYNAMICS",
    content: "Nixara Bloodmoon's key relationships: With Erik Douglas (husband): The foundational dynastic union. She met Erik in 1994 when she stormed the Bruins locker room to scream at him about the freshman ranking list. He fell in love with her because she was the first person who wasn't afraid of him. When she went into labor with Malachia during the 1996 championship finals, Erik walked out at halftime — the only game he ever lost. 'The scoreboard could wait. She couldn't.' With Wulfnic Bloodmoon (father): Nixara was raised with deep connection to both her Icelandic heritage and American identity. Wulfnic's devastation at her death intensified his protection of the grandchildren. With her four children: She died before she could know any of them as people, but her influence permeates the family. Alyssa resembles her most. The twins were born the day she died."
  },

  {
    keys: [
      "nixara", "moonstone", "bracelet", "legacy",
      "art", "course", "college",
      "nixara habit", "nixara quirk", "nixara mannerism"
    ],
    priority: 2, category: "QUIRKS",
    content: "Nixara Bloodmoon's legacy includes the moonstone bracelet — a gift she left that now belongs to Alyssa, who fidgets with it when thinking or anxious. It is Alyssa's connection to the mother she never knew. Nixara and Logan Douglas attended the same optional art course at college, a small connection between the sister-in-law and brother-in-law who both chose creative paths outside the corporate mainstream."
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
  var dbg = "\n\n[DBG] C_Nixara v1.0 | Scanned: " + CHARACTER_DATA.length + " entries | Matched: " + matchedEntries.length;
  var i;
  for (i = 0; i < matchedEntries.length; i++) {
    dbg += "\n[DBG] Match[" + i + "] cat=" + (matchedEntries[i].category || "?") + " p=" + (matchedEntries[i].priority || 0);
  }
  context.character.personality += dbg;
}
