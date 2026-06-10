/* ============================================================================
   ADVANCED MECHANICS LOREBOOK — Runtime Systems Validation Layer
   Platform: JanitorAI — Advanced Script (Always-On, Mode A)
   Canon: SvartulfrVerse Canon Freeze v1.0
   Date: 2026-06-10

   PURPOSE:
     This file contains EXCLUSIVELY runtime mechanics, state logic, trigger
     logic, and validation modules. It contains NO canonical lore, NO character
     biographies, NO worldbuilding data, and NO encyclopedia content.

     All canonical information resides in Standard_Lorebook.json (JanitorAI
     Lorebook format). This file is a JavaScript Advanced Script for runtime
     system validation only.

   ARCHITECTURE:
     This script is organized into independent, toggleable modules:
     Each module can be enabled/disabled via its ENABLED flag.

   MODULES:
     M1  — Language Runtime System (ADR-009 Part A)
     M2  — Speech Profile System (ADR-009 Part B)
     M3  — Relationship Engine
     M4  — Memory & Continuity System
     M5  — Character Runtime System
     M6  — Scenario State Machine
     M7  — Interaction System
     M8  — Experimental / Validation Module

   I/O Contract:
     INPUT:  context.chat.last_message / lastMessage / last_messages
             context.chat.message_count
             context.variables.svartulfr_state
     OUTPUT: context.variables.svartulfr_state (mutated)
             context.character.personality += "..." (runtime instructions only)

   Runtime Rules:
     - ES5 ONLY. var, function(), for loops. No let/const/arrow/template literals.
     - context.variables used ONLY for inter-module state (svartulfr_state).
     - Every context.variable access is guarded with || defaults.
     - Append-only output (=+), never overwrite.
     - NO canonical lore注入. Only runtime instructions and state management.
   ========================================================================== */


/* ============================================================================
   [SECTION] GLOBAL KNOBS & OUTPUT GUARDS
   ========================================================================== */
var DEBUG = 0;

context.character = context.character || {};
context.character.personality = (typeof context.character.personality === "string")
  ? context.character.personality : "";
context.character.scenario = (typeof context.character.scenario === "string")
  ? context.character.scenario : "";

context.variables = context.variables || {};
context.variables.svartulfr_state = context.variables.svartulfr_state || {};


/* ============================================================================
   [SECTION] INPUT NORMALIZATION (shared across all modules)
   ========================================================================== */
function _str(x) { return (x == null ? "" : String(x)); }

function _normalizeText(s) {
  s = _str(s).toLowerCase();
  s = s.replace(/[^a-z0-9_\s-]/g, " ");
  s = s.replace(/[-_]+/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

var WINDOW_DEPTH = 5;

var _lmArr = (context && context.chat && context.chat.last_messages && typeof context.chat.last_messages.length === "number")
  ? context.chat.last_messages : null;

var _joinedWindow = "";
var _rawLastSingle = "";

if (_lmArr && _lmArr.length > 0) {
  var startIdx = Math.max(0, _lmArr.length - WINDOW_DEPTH);
  var segs = [];
  for (var i = startIdx; i < _lmArr.length; i++) {
    var item = _lmArr[i];
    var msg = (item && typeof item.message === "string") ? item.message : _str(item);
    segs.push(_str(msg));
  }
  _joinedWindow = segs.join(" ");
  var lastItem = _lmArr[_lmArr.length - 1];
  _rawLastSingle = _str((lastItem && typeof lastItem.message === "string") ? lastItem.message : lastItem);
} else {
  var _lastMsgA = (context && context.chat && typeof context.chat.lastMessage === "string") ? context.chat.lastMessage : "";
  var _lastMsgB = (context && context.chat && typeof context.chat.last_message === "string") ? context.chat.last_message : "";
  _rawLastSingle = _str(_lastMsgA || _lastMsgB);
  _joinedWindow = _rawLastSingle;
}

var CHAT_WINDOW = {
  depth: WINDOW_DEPTH,
  count_available: (_lmArr && _lmArr.length) ? _lmArr.length : (_rawLastSingle ? 1 : 0),
  text_joined: _joinedWindow,
  text_last_only: _rawLastSingle,
  text_joined_norm: _normalizeText(_joinedWindow),
  text_last_only_norm: _normalizeText(_rawLastSingle)
};

var messageCount = 0;
if (_lmArr && typeof _lmArr.length === "number") {
  messageCount = _lmArr.length;
} else if (context && context.chat && typeof context.chat.message_count === "number") {
  messageCount = context.chat.message_count;
}


/* ============================================================================
   [SECTION] MODULE TOGGLE FLAGS
   Set to 0 to disable any module without removing its code.
   ========================================================================== */
var M1_ENABLED = 1;  /* Language Runtime System */
var M2_ENABLED = 1;  /* Speech Profile System */
var M3_ENABLED = 1;  /* Relationship Engine */
var M4_ENABLED = 1;  /* Memory & Continuity System */
var M5_ENABLED = 1;  /* Character Runtime System */
var M6_ENABLED = 0;  /* Scenario State Machine (experimental — default OFF) */
var M7_ENABLED = 1;  /* Interaction System */
var M8_ENABLED = 0;  /* Experimental / Validation Module (default OFF) */


/* ============================================================================
   [SECTION] UTILITY FUNCTIONS (shared)
   ========================================================================== */
function dbg(msg) {
  try {
    if (DEBUG) {
      context.character.personality += "\n\n[MECH_DBG] " + String(msg);
    }
  } catch (e) {}
}

function _arr(x) { return Array.isArray(x) ? x : (x == null ? [] : [x]); }

function _clamp(v, lo, hi) {
  v = +v; if (!isFinite(v)) return lo;
  return Math.max(lo, Math.min(hi, v));
}

function _reEsc(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function _hasTerm(hay, term) {
  var t = (term == null ? "" : String(term)).toLowerCase().trim();
  if (!t) return false;
  if (t.charAt(t.length - 1) === "*") {
    var stem = _reEsc(t.slice(0, -1));
    var re1 = new RegExp("(?:^|\\s)" + stem + "[a-z]*?(?=\\s|$)");
    return re1.test(hay);
  }
  var w = _reEsc(t);
  var re2 = new RegExp("(?:^|\\s)" + w + "(?=\\s|$)");
  return re2.test(hay);
}

var _last = " " + CHAT_WINDOW.text_joined_norm + " ";


/* ============================================================================
   [M1] LANGUAGE RUNTIME SYSTEM (ADR-009 Part A)
   Owner: User (via OOC commands)
   Status: DESIGN GATE — Phase 20 (implementation deferred)

   Subsystems:
     M1a — User Language Detection
     M1b — Runtime Language Switching
     M1c — Translation Overlay
     M1d — Parenthetical Translation System
     M1e — Dual-Language Output Validation
     M1f — Language Persistence Logic
   ========================================================================== */
(function () {
  if (!M1_ENABLED) { dbg("M1: Language Runtime DISABLED"); return; }

  var state = context.variables.svartulfr_state;
  var lang = state.language_runtime = state.language_runtime || {};

  /* M1f — Language Persistence: initialize defaults */
  lang.common_language = lang.common_language || "English";
  lang.translation_mode  = lang.translation_mode  || false;
  lang.persistent         = lang.persistent         || false;
  lang.activated_at       = lang.activated_at       || null;
  lang.activated_by       = lang.activated_by       || "system_default";

  /* M1a — User Language Detection: scan last message for language patterns */
  var detected_language = null;
  var lastOnly = CHAT_WINDOW.text_last_only_norm;

  /* Simple heuristic: check for common non-English words */
  /* This is a placeholder — production version would use more sophisticated detection */
  var italian_markers = ["ciao", "grazie", "perche", "come", "sono", "molte", "bella", "amico"];
  var spanish_markers = ["hola", "gracias", "porque", "como", "soy", "mucho", "bonita", "amigo"];
  var french_markers  = ["bonjour", "merci", "pourquoi", "comment", "suis", "beau", "amie"];

  for (var i = 0; i < italian_markers.length; i++) {
    if (_hasTerm(" " + lastOnly + " ", italian_markers[i])) { detected_language = "Italian"; break; }
  }
  if (!detected_language) {
    for (var j = 0; j < spanish_markers.length; j++) {
      if (_hasTerm(" " + lastOnly + " ", spanish_markers[j])) { detected_language = "Spanish"; break; }
    }
  }
  if (!detected_language) {
    for (var k = 0; k < french_markers.length; k++) {
      if (_hasTerm(" " + lastOnly + " ", french_markers[k])) { detected_language = "French"; break; }
    }
  }

  lang.detected_language = detected_language;
  lang.detection_confidence = detected_language ? "low" : "none";

  /* M1b — Runtime Language Switching: detect OOC language commands */
  var lastRaw = CHAT_WINDOW.text_last_only;
  var oocLangMatch = lastRaw.match(/<Language:\s*([^>]+)>/i);
  if (oocLangMatch) {
    var newLang = oocLangMatch[1].trim();
    lang.common_language = newLang;
    lang.translation_mode = (newLang.toLowerCase() !== "english");
    lang.persistent = true;
    lang.activated_at = messageCount;
    lang.activated_by = "OOC_command";
    dbg("M1b: Language switched to " + newLang + " via OOC");
  }

  /* M1c — Translation Overlay: set runtime flag for translation behavior */
  /* M1d — Parenthetical Translation: flag for foreign dialogue handling */
  lang.parenthetical_translation = lang.translation_mode;

  /* M1e — Dual-Language Output Validation: ensure output consistency */
  lang.output_language = lang.common_language;
  lang.output_validation = "pending";

  /* Inject runtime instruction (NOT canonical lore — this is a behavior directive) */
  var langDirective = " [LANG_RUNTIME] Output language: " + lang.common_language
    + " | Translation mode: " + (lang.translation_mode ? "ACTIVE" : "INACTIVE")
    | " | Detected input: " + (detected_language || "none")
    + " | <Language: [lang]> to switch";
  context.character.personality += langDirective;
  dbg("M1: Language Runtime active. Lang=" + lang.common_language);
})();


/* ============================================================================
   [M2] SPEECH PROFILE SYSTEM (ADR-009 Part B)
   Owner: Character Authority (data defined in character records)
   Status: DESIGN GATE — Phase 20 (implementation deferred)

   Speech profiles define HOW each character speaks (register, slang, accent).
   This is independent from the Language Runtime System which defines WHAT
   language the output is in.
   ========================================================================== */
(function () {
  if (!M2_ENABLED) { dbg("M2: Speech Profile DISABLED"); return; }

  var state = context.variables.svartulfr_state;
  var speech = state.speech_profiles = state.speech_profiles || {};

  /* Speech profile database — runtime metadata, NOT canon lore */
  /* These profiles define communication style, not identity facts */
  var profiles = {
    jasper:  { register: "casual",  slang: "california_genz",  accent: "californian",    triggers: { stress: "more_sarcasm" } },
    erik:    { register: "formal",  slang: "military",         accent: "corporate_us",    triggers: { authority: "command_tone" } },
    wulfnic: { register: "archaic", slang: "icelandic",        accent: "icelandic_trace", triggers: { anger: "old_norse_phrases" } },
    marcus:  { register: "military",slang: "military",          accent: "neutral_us",      triggers: { stress: "tactical_brevity" } },
    kaladin: { register: "formal",  slang: "military",          accent: "neutral_us",      triggers: { crisis: "calm_authority" } },
    noah:    { register: "formal",  slang: "legal",            accent: "transatlantic",   triggers: { official: "increased_formality" } },
    alyssa:  { register: "casual",  slang: "california_genz",  accent: "soft_californian",triggers: { relaxed: "slang_increase" } },
    logan:   { register: "casual",  slang: "none",              accent: "gruff_us",        triggers: { comfort: "warmth_increase" } },
    angel:   { register: "formal",  slang: "fashion_world",    accent: "polished",        triggers: { creative: "eccentric_increase" } },
    malachia:{ register: "terse",   slang: "military",          accent: "neutral_us",      triggers: { threat: "commandTone_drop" } }
  };

  speech.profiles = profiles;
  speech.active_profile = speech.active_profile || null;

  /* Detect which character is currently speaking based on chat context */
  /* This is a heuristic — production version would use more sophisticated detection */
  var activeChar = null;
  var normLast = CHAT_WINDOW.text_last_only_norm;

  /* Simple keyword-based speaker detection for dialogue attribution */
  if (_hasTerm(normLast, "jasper") || _hasTerm(normLast, "jaz")) activeChar = "jasper";
  else if (_hasTerm(normLast, "erik")) activeChar = "erik";
  else if (_hasTerm(normLast, "wulfnic")) activeChar = "wulfnic";
  else if (_hasTerm(normLast, "marcus") || _hasTerm(normLast, "iron")) activeChar = "marcus";
  else if (_hasTerm(normLast, "kaladin")) activeChar = "kaladin";
  else if (_hasTerm(normLast, "noah")) activeChar = "noah";
  else if (_hasTerm(normLast, "alyssa") || _hasTerm(normLast, "lys")) activeChar = "alyssa";
  else if (_hasTerm(normLast, "logan")) activeChar = "logan";
  else if (_hasTerm(normLast, "angel")) activeChar = "angel";
  else if (_hasTerm(normLast, "malachia") || _hasTerm(normLast, "mal")) activeChar = "malachia";

  if (activeChar && profiles[activeChar]) {
    speech.active_profile = activeChar;
    var profile = profiles[activeChar];
    var speechDirective = " [SPEECH_PROFILE] Active: " + activeChar
      + " | Register: " + profile.register
      + " | Slang: " + profile.slang
      + " | Accent: " + profile.accent;
    context.character.personality += speechDirective;
  }

  dbg("M2: Speech Profile active. Current=" + (speech.active_profile || "none"));
})();


/* ============================================================================
   [M3] RELATIONSHIP ENGINE
   Status: Design phase —Affinity Tracking, Trust Progression, Emotional State

   Subsystems:
     M3a — Relationship State Tracking
     M3b — Affinity Tracking
     M3c — Trust Progression
     M3d — Emotional State Tracking
     M3e — Relationship Stage Progression
     M3f — Dynamic Character Reactions
   ========================================================================== */
(function () {
  if (!M3_ENABLED) { dbg("M3: Relationship Engine DISABLED"); return; }

  var state = context.variables.svartulfr_state;
  var rel = state.relationship_engine = state.relationship_engine || {};

  /* M3a — Relationship State: track NPC-{{user}} relationship per NPC */
  rel.npc_states = rel.npc_states || {};
  var npcs = ["erik", "malachia", "noah", "jasper", "alyssa", "wulfnic", "logan", "marcus", "kaladin", "angel"];
  for (var ni = 0; ni < npcs.length; ni++) {
    var npc = npcs[ni];
    if (!rel.npc_states[npc]) {
      rel.npc_states[npc] = {
        affinity: 0,       /* -100 to 100 */
        trust: 0,          /* 0 to 100 */
        emotional_state: "neutral",
        stage: "acquaintance",
        last_interaction: 0,
        interaction_count: 0
      };
    }
  }

  /* M3b — Affinity Tracking: detect positive/negative sentiment in chat */
  var positiveMarkers = ["thank", "love", "like", "appreciate", "happy", "glad", "good", "great", "wonderful", "amazing", "care"];
  var negativeMarkers = ["hate", "angry", "upset", "dislike", "annoyed", "frustrated", "mad", "furious", "disgusted", "terrible"];

  var posCount = 0, negCount = 0;
  for (var pi = 0; pi < positiveMarkers.length; pi++) {
    if (_hasTerm(_last, positiveMarkers[pi])) posCount++;
  }
  for (var ni2 = 0; ni2 < negativeMarkers.length; ni2++) {
    if (_hasTerm(_last, negativeMarkers[ni2])) negCount++;
  }

  rel.last_sentiment = { positive: posCount, negative: negCount, net: posCount - negCount };

  /* M3c — Trust Progression: increment based on positive interactions */
  if (posCount > negCount) {
    rel.global_trust_delta = +1;
  } else if (negCount > posCount) {
    rel.global_trust_delta = -1;
  } else {
    rel.global_trust_delta = 0;
  }

  /* M3d — Emotional State Tracking: determine current emotional climate */
  var emotionalClimate = "neutral";
  if (posCount >= 2) emotionalClimate = "positive";
  if (negCount >= 2) emotionalClimate = "negative";
  if (posCount >= 3) emotionalClimate = "warm";
  if (negCount >= 3) emotionalClimate = "hostile";
  rel.emotional_climate = emotionalClimate;

  /* M3e — Relationship Stage: determine current stage based on cumulative affinity */
  /* Stages: stranger -> acquaintance -> friend -> close_friend -> trusted -> intimate */
  /* This is a simplified model — production would use per-NPC tracking */

  /* M3f — Dynamic Character Reactions: generate reaction directives */
  var reactionDirective = " [RELATIONSHIP] Climate: " + emotionalClimate
    + " | Sentiment delta: " + (rel.global_trust_delta > 0 ? "+" : "") + rel.global_trust_delta
    + " | NPCs tracked: " + npcs.length;
  context.character.personality += reactionDirective;

  dbg("M3: Relationship Engine active. Climate=" + emotionalClimate);
})();


/* ============================================================================
   [M4] MEMORY & CONTINUITY SYSTEM
   Status: Design phase

   Subsystems:
     M4a — Session Continuity Rules
     M4b — Soft Memory Logic
     M4c — Interaction History Tracking
     M4d — Context Reinforcement Rules
     M4e — Continuity Validation
   ========================================================================== */
(function () {
  if (!M4_ENABLED) { dbg("M4: Memory & Continuity DISABLED"); return; }

  var state = context.variables.svartulfr_state;
  var mem = state.memory_system = state.memory_system || {};

  /* M4a — Session Continuity: track session metadata */
  mem.session_message_count = messageCount;
  mem.session_start_estimate = mem.session_start_estimate || messageCount;
  mem.session_depth = messageCount - mem.session_start_estimate;

  /* M4b — Soft Memory: extract and store key facts from recent messages */
  /* This is a simplified extraction — production would use NLP */
  mem.recent_topics = mem.recent_topics || [];
  var topicKeywords = ["ucla", "estate", "verve", "security", "family", "party", "class", "exam", "dinner", "sunday", "music", "dj", "boxing", "law", "medicine", "engineering"];
  for (var ti = 0; ti < topicKeywords.length; ti++) {
    if (_hasTerm(_last, topicKeywords[ti])) {
      /* Add to recent topics if not already present */
      var alreadyTracked = false;
      for (var tj = 0; tj < mem.recent_topics.length; tj++) {
        if (mem.recent_topics[tj] === topicKeywords[ti]) { alreadyTracked = true; break; }
      }
      if (!alreadyTracked) {
        mem.recent_topics.push(topicKeywords[ti]);
        /* Keep only last 10 topics */
        if (mem.recent_topics.length > 10) mem.recent_topics.shift();
      }
    }
  }

  /* M4c — Interaction History: log interaction patterns */
  mem.interaction_log = mem.interaction_log || [];
  mem.interaction_log.push({
    message_index: messageCount,
    topics: mem.recent_topics.slice(0),
    sentiment: state.relationship_engine ? state.relationship_engine.last_sentiment : null
  });
  /* Keep only last 50 interactions */
  if (mem.interaction_log.length > 50) mem.interaction_log.shift();

  /* M4d — Context Reinforcement: remind about recently discussed topics */
  var reinforcementDirective = "";
  if (mem.recent_topics.length > 0) {
    reinforcementDirective = " [MEMORY] Recent topics: " + mem.recent_topics.join(", ")
      + " | Session depth: " + mem.session_depth;
  }

  /* M4e — Continuity Validation: check for contradictions with established facts */
  mem.continuity_checks_passed = true;
  mem.continuity_warnings = [];
  /* Placeholder — production would cross-reference against established session facts */

  if (reinforcementDirective) {
    context.character.personality += reinforcementDirective;
  }

  dbg("M4: Memory active. Topics=" + mem.recent_topics.length + " Depth=" + mem.session_depth);
})();


/* ============================================================================
   [M5] CHARACTER RUNTIME SYSTEM
   Status: Design phase

   Subsystems:
     M5a — Dynamic Personality Adjustments
     M5b — Mood State Layers
     M5c — Character Awareness Rules
     M5d — User Familiarity Progression
     M5e — Behavioral Escalation and De-escalation
   ========================================================================== */
(function () {
  if (!M5_ENABLED) { dbg("M5: Character Runtime DISABLED"); return; }

  var state = context.variables.svartulfr_state;
  var crt = state.character_runtime = state.character_runtime || {};

  /* M5a — Dynamic Personality: adjust NPC behavior based on relationship state */
  var relState = state.relationship_engine || {};
  var climate = relState.emotional_climate || "neutral";

  /* M5b — Mood State Layers: determine NPC mood based on context */
  crt.npc_moods = crt.npc_moods || {};
  var moodMap = {
    positive: { erik: "less_suffocating", malachia: "relaxed", noah: "warm", jasper: "energetic", alyssa: "cheerful", wulfnic: "indulgent", logan: "charming" },
    negative: { erik: "draconian", malachia: "hyper_vigilant", noah: "cold", jasper: "defiant", alyssa: "anxious", wulfnic: "stern", logan: "protective" },
    warm:     { erik: "almost_smiling", malachia: "gentle", noah: "affectionate", jasper: "playful", alyssa: "glowing", wulfnic: "storytelling", logan: "warm" },
    hostile:  { erik: "tyrannical", malachia: "dangerous", noah: "cutting", jasper: "reckless", alyssa: "withdrawn", wulfnic: "silent", logan: "defensive" }
  };

  var currentMoods = moodMap[climate] || {};
  crt.npc_moods = currentMoods;

  /* M5c — Character Awareness: NPCs react to {{user}}'s demonstrated knowledge */
  crt.awareness_level = crt.awareness_level || "basic";
  if (messageCount > 20) crt.awareness_level = "familiar";
  if (messageCount > 50) crt.awareness_level = "intimate";

  /* M5d — User Familiarity: track how well NPCs know {{user}} */
  crt.familiarity = crt.familiarity || 0;
  crt.familiarity = _clamp(crt.familiarity + (relState.global_trust_delta || 0), 0, 100);

  /* M5e — Behavioral Escalation/De-escalation */
  var escalationDirective = " [CHAR_RUNTIME] Climate: " + climate
    + " | Awareness: " + crt.awareness_level
    + " | Familiarity: " + crt.familiarity;
  context.character.personality += escalationDirective;

  dbg("M5: Character Runtime active. Awareness=" + crt.awareness_level);
})();


/* ============================================================================
   [M6] SCENARIO STATE MACHINE (EXPERIMENTAL — default OFF)
   Status: Experimental — enable via M6_ENABLED = 1

   Subsystems:
     M6a — State Machine Core
     M6b — Event Triggers
     M6c — Conditional Scenario Layers
     M6d — Context-Sensitive Reactions
     M6e — Runtime Scene Progression
   ========================================================================== */
(function () {
  if (!M6_ENABLED) { dbg("M6: Scenario State Machine DISABLED (experimental)"); return; }

  var state = context.variables.svartulfr_state;
  var sm = state.scenario_machine = state.scenario_machine || {};

  /* M6a — State Machine: track current scenario state */
  sm.current_state = sm.current_state || "idle";
  sm.previous_state = sm.previous_state || "idle";
  sm.state_history = sm.state_history || [];

  /* M6b — Event Triggers: detect scenario-changing events */
  var locationTriggers = {
    "douglas_estate": ["estate", "mansion", "beverly hills", "home", "throne room", "dining"],
    "ucla_campus": ["ucla", "campus", "westwood", "class", "library", "lecture"],
    "the_verve": ["verve", "bar", "nightclub", "logan's venue"],
    "santa_monica": ["beach", "pier", "santa monica", "ocean", "coast"],
    "seven_hills": ["seven hills", "ancestral", "training camp", "country house"]
  };

  var detectedLocation = null;
  var locKeys = Object.keys(locationTriggers);
  for (var li = 0; li < locKeys.length; li++) {
    var locName = locKeys[li];
    var triggers = locationTriggers[locName];
    for (var ti = 0; ti < triggers.length; ti++) {
      if (_hasTerm(_last, triggers[ti])) {
        detectedLocation = locName;
        break;
      }
    }
    if (detectedLocation) break;
  }

  /* M6c — Conditional Scenario Layers: adjust based on location and time */
  if (detectedLocation && detectedLocation !== sm.current_state) {
    sm.previous_state = sm.current_state;
    sm.current_state = detectedLocation;
    sm.state_history.push({ state: detectedLocation, message_index: messageCount });
    if (sm.state_history.length > 20) sm.state_history.shift();
  }

  /* M6d — Context-Sensitive Reactions: generate location-appropriate reactions */
  /* M6e — Runtime Scene Progression: advance narrative based on state */

  var scenarioDirective = " [SCENARIO] State: " + sm.current_state
    + " | Previous: " + sm.previous_state;
  context.character.personality += scenarioDirective;

  dbg("M6: Scenario Machine active. State=" + sm.current_state);
})();


/* ============================================================================
   [M7] INTERACTION SYSTEM
   Status: Design phase

   Subsystems:
     M7a — Greeting Logic
     M7b — User Recognition Logic
     M7c — Long-Term Interaction Tracking
     M7d — Response Adaptation Rules
     M7e — Engagement Progression
   ========================================================================== */
(function () {
  if (!M7_ENABLED) { dbg("M7: Interaction System DISABLED"); return; }

  var state = context.variables.svartulfr_state;
  var ix = state.interaction_system = state.interaction_system || {};

  /* M7a — Greeting Logic: detect first messages and greetings */
  ix.is_first_message = messageCount <= 1;
  ix.is_early_interaction = messageCount <= 5;

  var greetingMarkers = ["hello", "hi", "hey", "good morning", "good evening", "good afternoon", "greetings"];
  var isGreeting = false;
  for (var gi = 0; gi < greetingMarkers.length; gi++) {
    if (_hasTerm(_last, greetingMarkers[gi])) { isGreeting = true; break; }
  }
  ix.detected_greeting = isGreeting;

  /* M7b — User Recognition: detect if {{user}} references known information */
  var recognitionMarkers = ["remember", "last time", "yesterday", "earlier", "before", "we talked"];
  var showsRecognition = false;
  for (var ri = 0; ri < recognitionMarkers.length; ri++) {
    if (_hasTerm(_last, recognitionMarkers[ri])) { showsRecognition = true; break; }
  }
  ix.user_shows_recognition = showsRecognition;

  /* M7c — Long-Term Interaction Tracking */
  ix.total_messages = messageCount;
  ix.interaction_phase = "opening";
  if (messageCount > 5) ix.interaction_phase = "establishing";
  if (messageCount > 15) ix.interaction_phase = "developing";
  if (messageCount > 30) ix.interaction_phase = "deepening";
  if (messageCount > 50) ix.interaction_phase = "established";

  /* M7d — Response Adaptation: adjust response style based on interaction phase */
  /* M7e — Engagement Progression: track engagement level */
  ix.engagement_level = "medium";
  if (CHAT_WINDOW.text_last_only.length > 200) ix.engagement_level = "high";
  if (CHAT_WINDOW.text_last_only.length < 20) ix.engagement_level = "low";

  var interactionDirective = " [INTERACTION] Phase: " + ix.interaction_phase
    + " | Engagement: " + ix.engagement_level
    + " | Greeting: " + (isGreeting ? "YES" : "NO")
    + " | Recognition: " + (showsRecognition ? "YES" : "NO");
  context.character.personality += interactionDirective;

  dbg("M7: Interaction System active. Phase=" + ix.interaction_phase);
})();


/* ============================================================================
   [M8] EXPERIMENTAL / VALIDATION MODULE (default OFF)
   Status: Experimental — enable via M8_ENABLED = 1

   Purpose: Testbed for new mechanics before integration.
   This module should always be disabled in production exports.
   ========================================================================== */
(function () {
  if (!M8_ENABLED) { dbg("M8: Experimental Module DISABLED"); return; }

  var state = context.variables.svartulfr_state;
  var exp = state.experimental = state.experimental || {};

  /* Validation: ensure all modules initialized correctly */
  exp.m1_language = state.language_runtime ? "initialized" : "MISSING";
  exp.m2_speech = state.speech_profiles ? "initialized" : "MISSING";
  exp.m3_relationship = state.relationship_engine ? "initialized" : "MISSING";
  exp.m4_memory = state.memory_system ? "initialized" : "MISSING";
  exp.m5_character = state.character_runtime ? "initialized" : "MISSING";
  exp.m6_scenario = state.scenario_machine ? "initialized" : "MISSING";
  exp.m7_interaction = state.interaction_system ? "initialized" : "MISSING";

  var validationResults = [];
  var moduleKeys = Object.keys(exp);
  for (var vi = 0; vi < moduleKeys.length; vi++) {
    validationResults.push(moduleKeys[vi] + "=" + exp[moduleKeys[vi]]);
  }

  var expDirective = " [EXPERIMENTAL] Module status: " + validationResults.join(" | ");
  context.character.personality += expDirective;

  dbg("M8: Experimental validation active.");
})();


/* ============================================================================
   [SECTION] FINAL STATE FLUSH
   Persist all state back to context.variables.svartulfr_state
   ========================================================================== */
context.variables.svartulfr_state = state;

dbg("Advanced Mechanics Lorebook execution complete. Message #" + messageCount);
