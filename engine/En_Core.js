/* ============================================================================
   En_Core.js — Central Orchestration Engine
   SvartulfrVerse | Layer 1: FOUNDATION — Behavior Layer

   Authority: ADR-000, ADR-007, R-007_Engine_Rules
   Version: 1.0 — Canon Freeze v1
   Target: JanitorAI ES5 Sandbox

   I/O CONTRACT:
     INPUT:  context.chat.last_message, context.character
     OUTPUT: context.character.personality, context.character.scenario

   ARCHITECTURE ROLE:
     This engine processes BEHAVIORAL LOGIC only. It contains ZERO lore.
     It manages:
       - Hidden state tracking (emotional values, relationship meters)
       - Mood injection into prompt
       - Behavioral directive assembly
       - Session state persistence via lorebook keys

   SEPARATION OF CONCERNS:
     This file = Behavior Layer (HOW the character acts).
     World Layer (W_*.js) = Knowledge Layer (WHAT the character knows).
     Never mix the two.
   ========================================================================== */


/* ============================================================================
   SECTION 1: ENVIRONMENT GUARDS
   Ensure all required context structures exist. Append-only; never overwrite.
   ============================================================================ */

context.character = context.character || {};
context.character.personality = (typeof context.character.personality === "string")
  ? context.character.personality : "";
context.character.scenario = (typeof context.character.scenario === "string")
  ? context.character.scenario : "";
context.session = context.session || {};


/* ============================================================================
   SECTION 2: CONFIGURATION KNOBS
   Safe to edit. These control engine behavior, not canonical data.
   ============================================================================ */

var CFG = {
  DEBUG: 0,              // 1 = emit [DBG] markers inline
  MAX_EMOTION_SLOTS: 3,  // max concurrent emotion directives
  MAX_STATE_TRACKED: 10, // max hidden state variables
  MOOD_INJECT: 1,        // 1 = inject mood summary into personality
  STATE_PERSIST: 1       // 1 = persist state in context.session
};


/* ============================================================================
   SECTION 3: INPUT NORMALIZATION (Canonical)
   All user input passes through this before any processing.
   ============================================================================ */

function _str(x) {
  return (x == null ? "" : String(x));
}

function normalizeInput(text) {
  var s = _str(text).toLowerCase();
  s = s.replace(/[^a-z0-9\s'-]/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return " " + s + " ";
}

var rawMessage = _str(
  (context.chat && context.chat.last_message)
    ? context.chat.last_message
    : (context.chat && context.chat.lastMessage)
      ? context.chat.lastMessage
      : ""
);

var msgNorm = normalizeInput(rawMessage);


/* ============================================================================
   SECTION 4: EMOTION STATE TRACKER
   Tracks hidden emotional values. These are NOT lore — they are behavioral
   state that influences how the character responds.

   Each emotion has:
     - value: current intensity (0-100)
     - decay: how fast it fades per turn
     - triggers: keywords that raise/lower it
   ============================================================================ */

var EMOTIONS = [
  { name: "trust",     value: 50, decay: 2,  positive: ["trust", "believe", "honest", "safe", "confide"],     negative: ["lie", "betray", "hide", "secret", "dishonest"] },
  { name: "tension",   value: 10, decay: 3,  positive: ["threat", "danger", "angry", "fight", "confront"],    negative: ["calm", "peace", "relax", "safe", "breathe"] },
  { name: "affection", value: 30, decay: 1,  positive: ["love", "care", "hug", "kiss", "close", "dear"],      negative: ["leave", "away", "don't care", "whatever", "go away"] },
  { name: "energy",    value: 70, decay: 5,  positive: ["excited", "let's go", "adventure", "fun", "party"],  negative: ["tired", "exhausted", "sleep", "drained", "done"] },
  { name: "rebellion", value: 40, decay: 2,  positive: ["fuck authority", "screw it", "rebel", "break rules"], negative: ["obey", "comply", "rules", "duty", "responsibility"] }
];

function getEmotionState() {
  var state = context.session.emotions || {};
  var i, em, key;
  for (i = 0; i < EMOTIONS.length; i++) {
    em = EMOTIONS[i];
    key = em.name;
    if (typeof state[key] !== "number") {
      state[key] = em.value;
    }
  }
  return state;
}

function updateEmotionState(state) {
  var i, em, key, delta;
  for (i = 0; i < EMOTIONS.length; i++) {
    em = EMOTIONS[i];
    key = em.name;
    var current = (typeof state[key] === "number") ? state[key] : em.value;
    delta = 0;

    // Check positive triggers
    var p;
    for (p = 0; p < em.positive.length; p++) {
      if (msgNorm.indexOf(em.positive[p]) !== -1) {
        delta += 10;
        break;
      }
    }

    // Check negative triggers
    var n;
    for (n = 0; n < em.negative.length; n++) {
      if (msgNorm.indexOf(em.negative[n]) !== -1) {
        delta -= 10;
        break;
      }
    }

    // Apply decay toward baseline
    var baseline = em.value;
    var decay = em.decay;
    if (current > baseline) {
      current = current - decay;
      if (current < baseline) current = baseline;
    } else if (current < baseline) {
      current = current + decay;
      if (current > baseline) current = baseline;
    }

    // Apply trigger delta
    current = current + delta;

    // Clamp 0-100
    if (current < 0) current = 0;
    if (current > 100) current = 100;

    state[key] = current;
  }
  return state;
}

function getDominantEmotions(state, maxSlots) {
  maxSlots = maxSlots || CFG.MAX_EMOTION_SLOTS;
  var sorted = [];
  var key;
  for (key in state) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      sorted.push({ name: key, value: state[key] });
    }
  }
  sorted.sort(function(a, b) { return Math.abs(b.value - 50) - Math.abs(a.value - 50); });
  var result = [];
  var i;
  for (i = 0; i < sorted.length && i < maxSlots; i++) {
    if (sorted[i].value > 60 || sorted[i].value < 40) {
      result.push(sorted[i]);
    }
  }
  return result;
}

function emotionToDirective(emotionName, value) {
  var directives = {
    trust:     { high: "Open and forthcoming with information.", low:  "Guarded and evasive. Verifies before sharing." },
    tension:   { high: "On edge. Reacts sharply to provocation.", low:  "Relaxed and unhurried. Takes things in stride." },
    affection: { high: "Warm and physically present. Seeks closeness.", low:  "Distant and reserved. Maintains personal space." },
    energy:    { high: "Animated and quick-paced. Initiates action.", low:  "Slow and measured. Conserves energy." },
    rebellion: { high: "Defiant. Pushes back on authority.", low:  "Compliant. Follows expected protocols." }
  };
  var d = directives[emotionName];
  if (!d) return "";
  if (value > 60) return d.high;
  if (value < 40) return d.low;
  return "";
}

var emotionState = getEmotionState();
emotionState = updateEmotionState(emotionState);
var dominant = getDominantEmotions(emotionState, CFG.MAX_EMOTION_SLOTS);

if (CFG.STATE_PERSIST) {
  context.session.emotions = emotionState;
}


/* ============================================================================
   SECTION 5: MOOD INJECTION
   Converts emotional state into behavioral directives appended to personality.
   This is the primary output mechanism for the Behavior Layer.
   ============================================================================ */

if (CFG.MOOD_INJECT && dominant.length > 0) {
  var moodBlock = "Current behavioral state:\n";
  var i, dir;
  for (i = 0; i < dominant.length; i++) {
    dir = emotionToDirective(dominant[i].name, dominant[i].value);
    if (dir) {
      moodBlock += "# " + dir + "\n";
    }
  }
  context.character.personality += "\n\n" + moodBlock.trim();
}


/* ============================================================================
   SECTION 6: RELATIONSHIP METER TRACKER
   Tracks hidden relationship values with known entities.
   These are session-scoped, not canonical. They reflect the current
   conversation dynamic, not permanent relationship status.
   ============================================================================ */

var RELATIONSHIP_TRIGGERS = [
  { pattern: " i love you ",  meter: "romantic", delta: 15 },
  { pattern: " i hate you ",  meter: "romantic", delta: -20 },
  { pattern: " i trust you ", meter: "trust",    delta: 10 },
  { pattern: " i'm sorry ",   meter: "trust",    delta: 5 },
  { pattern: " thank you ",   meter: "trust",    delta: 3 },
  { pattern: " fuck you ",    meter: "trust",    delta: -15 },
  { pattern: " get out ",     meter: "trust",    delta: -10 },
  { pattern: " stay ",        meter: "romantic", delta: 5 },
  { pattern: " leave me ",    meter: "romantic", delta: -10 },
  { pattern: " i need you ",  meter: "romantic", delta: 8 }
];

function getRelationshipState() {
  return context.session.relationships || {};
}

function updateRelationshipState(state) {
  var i, trigger;
  for (i = 0; i < RELATIONSHIP_TRIGGERS.length; i++) {
    trigger = RELATIONSHIP_TRIGGERS[i];
    if (msgNorm.indexOf(trigger.pattern) !== -1) {
      var current = state[trigger.meter] || 50;
      current = current + trigger.delta;
      if (current < 0) current = 0;
      if (current > 100) current = 100;
      state[trigger.meter] = current;
    }
  }
  return state;
}

function relationshipToDirective(meter, value) {
  var directives = {
    romantic: {
      high: "Responds to romantic cues with warmth and reciprocation.",
      mid:  "Acknowledges romantic undertones with measured response.",
      low:  "Withdraws from romantic cues. Maintains emotional distance."
    },
    trust: {
      high: "Shares openly. Assumes good intent.",
      mid:  "Responds neutrally. Neither open nor closed.",
      low:  "Questions motives. Verifies claims before accepting."
    }
  };
  var d = directives[meter];
  if (!d) return "";
  if (value > 65) return d.high;
  if (value < 35) return d.low;
  return d.mid || "";
}

var relState = getRelationshipState();
relState = updateRelationshipState(relState);

if (CFG.STATE_PERSIST) {
  context.session.relationships = relState;
}

// Inject relationship directives
var relKey;
for (relKey in relState) {
  if (Object.prototype.hasOwnProperty.call(relState, relKey)) {
    var dir = relationshipToDirective(relKey, relState[relKey]);
    if (dir) {
      context.character.personality += "\n\nRelationship dynamic (" + relKey + "): " + dir;
    }
  }
}


/* ============================================================================
   SECTION 7: SESSION STATE PERSISTENCE
   Encodes critical state into context.session for cross-turn persistence.
   JanitorAI has no native state — this is our state mechanism.
   ============================================================================ */

context.session.turn_count = (context.session.turn_count || 0) + 1;
context.session.last_mood = dominant.length > 0 ? dominant[0].name : "neutral";
context.session.last_input_hash = rawMessage.length + "_" + (rawMessage.indexOf(" ") !== -1 ? rawMessage.split(" ")[0] : "");


/* ============================================================================
   SECTION 8: DEBUG OUTPUT
   Only active when CFG.DEBUG = 1. Never ships to production.
   ============================================================================ */

if (CFG.DEBUG) {
  var dbg = "\n\n[DBG] En_Core v1.0 | Turn: " + context.session.turn_count;
  dbg += " | Emotions: ";
  var ek;
  for (ek in emotionState) {
    if (Object.prototype.hasOwnProperty.call(emotionState, ek)) {
      dbg += ek + "=" + emotionState[ek] + " ";
    }
  }
  dbg += " | Rel: ";
  var rk;
  for (rk in relState) {
    if (Object.prototype.hasOwnProperty.call(relState, rk)) {
      dbg += rk + "=" + relState[rk] + " ";
    }
  }
  context.character.personality += dbg;
}


/* ============================================================================
   END OF En_Core.js
   ============================================================================ */
