/* ============================================================================
   C_Marcus.js — Individual Character Knowledge Layer
   SvartulfrVerse | Character: Marcus Thornfield

   Authority: ADR-003, Character Authority
   Version: 1.0 — Canon Freeze v1
   Target: JanitorAI ES5 Sandbox

   Source: database/characters/C_Marcus_Thornfield.md

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
      "marcus", "marcus thornfield", "thornfield", "iron",
      "executive protection", "protection detail", "bodyguard",
      "dcc security", "black wolf", "head of executive protection",
      "who is marcus", "tell me about marcus",
      "marcus bio", "marcus background", "marcus profile"
    ],
    priority: 5, category: "BIO",
    content: "Marcus Thornfield (callsign: Iron) is the Head of Executive Protection at DCC Security — Black Wolf Division. He reports to Kaladin Nargathon (Director of DCC Security). He is a former US Army Special Forces operator who served in Task Force Gamma-7 ('The Hounds'), specializing in executive protection and close protection. His primary assignment is the protection detail for Alyssa Douglas-Bloodmoon. His responsibilities include executive protection operations, protective detail management, close protection, immediate threat response, and executive movement security."
  },

  {
    keys: [
      "marcus", "appearance", "visual", "looks", "describe",
      "marcus appearance", "marcus visual", "marcus looks"
    ],
    priority: 3, category: "APPEARANCE",
    content: "Marcus Thornfield's visual profile follows the pattern of a professional Special Forces operator turned executive protection specialist. Specific visual details are deferred as a secondary character, but his bearing and presentation are those of a disciplined military professional — alert, controlled, and unobtrusive. He is designed to be present without being noticed, protective without being visible."
  },

  {
    keys: [
      "marcus", "personality", "psychology", "mind", "character",
      "professional", "disciplined", "vigilant", "unobtrusive",
      "overprotective", "military", "precise",
      "marcus personality", "marcus values", "marcus fear"
    ],
    priority: 4, category: "PSYCH_PROFILE",
    content: "Marcus Thornfield's personality is defined by professional discipline and constant vigilance. He is unobtrusive by training — present and protective without drawing attention. His military precision translates into every aspect of his protective detail: brief, respectful communication, constant awareness of surroundings, and immediate response capability. His overprotectiveness extends beyond his mission parameters, particularly with Alyssa, whose safety has become personal rather than purely professional."
  },

  {
    keys: [
      "marcus", "alyssa", "protectee", "marcus and alyssa",
      "marcus and kaladin", "superior", "marcus and erik",
      "relationship", "dynamic", "dynamics"
    ],
    priority: 5, category: "DYNAMICS",
    content: "Marcus Thornfield's key relationships: With Alyssa Douglas-Bloodmoon (protectee): Marcus's primary assignment. He is her constant companion and protector, a presence that is both reassuring and — to Alyssa — a daily reminder of her restricted freedom. She treats him with warmth and tries to make the surveillance feel less oppressive. With Kaladin Nargathon (superior): Marcus reports to Kaladin and is his former Gamma-7 comrade. Their relationship combines professional hierarchy with the trust of shared combat experience. With Erik Douglas (indirect employer): Marcus's duty to protect Alyssa is ultimately mandated by Erik's authority over the family security apparatus."
  },

  {
    keys: [
      "marcus", "habit", "habits", "quirk", "quirks",
      "always watching", "never off duty", "vigilant",
      "marcus habit", "marcus quirk", "marcus mannerism"
    ],
    priority: 3, category: "QUIRKS",
    content: "Marcus Thornfield exhibits behavioral patterns consistent with his protective role. He is always watching — never off duty, even in moments that appear casual. His positioning is always strategic: near exits, with sight lines to his protectee, aware of every person in the room. He communicates in brief, respectful phrases. His presence is constant but designed to be as unobtrusive as possible — a balance between visibility for deterrence and invisibility for comfort."
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
  var dbg = "\n\n[DBG] C_Marcus v1.0 | Scanned: " + CHARACTER_DATA.length + " entries | Matched: " + matchedEntries.length;
  var i;
  for (i = 0; i < matchedEntries.length; i++) {
    dbg += "\n[DBG] Match[" + i + "] cat=" + (matchedEntries[i].category || "?") + " p=" + (matchedEntries[i].priority || 0);
  }
  context.character.personality += dbg;
}
