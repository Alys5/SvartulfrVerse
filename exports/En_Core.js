/* ============================================================================
   En_Core.js - Runtime Behavior Engine
   SvartulfrVerse | Foundation Layer | ES5
   Target: JanitorAI Advanced Script

   Responsibilities:
   - Owns behavior state only. It does not own canon.
   - Uses context.variables.svartulfr_state as the inter-script state bus.
   - Tracks relationship_meter without replacing Character Authority.
   - Applies optional POV Override from runtime state or OOC command.
   - Enforces R-010 punctuation fallback by sanitizing em dash and en dash.
   ========================================================================== */

context.character = context.character || {};
context.variables = context.variables || {};

if (typeof context.character.personality !== "string") {
  context.character.personality = "";
}
if (typeof context.character.scenario !== "string") {
  context.character.scenario = "";
}
if (!context.variables.svartulfr_state || typeof context.variables.svartulfr_state !== "object") {
  context.variables.svartulfr_state = {};
}

var SVRuntime = {
  version: "es5-runtime-foundation-1.0",
  state: context.variables.svartulfr_state,
  rawMessage: "",
  normalizedMessage: ""
};

function svrString(value) {
  return value == null ? "" : String(value);
}

function svrTrim(value) {
  return svrString(value).replace(/^\s+|\s+$/g, "");
}

function svrNormalize(value) {
  var s = svrString(value).toLowerCase();
  s = s.replace(/[^a-z0-9\s'-]/g, " ");
  s = s.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  return " " + s + " ";
}

function svrGetMessage() {
  if (context.chat.last_message) {
    return svrString(context.chat.last_message);
  }
  if (context.chat.lastMessage) {
    return svrString(context.chat.lastMessage);
  }
  return "";
}

function svrSanitizeEmDash(text) {
  if (typeof text !== "string") {
    return text;
  }
  var sanitized = text.replace(/[\u2014\u2013]/g, "...");
  sanitized = sanitized.replace(/\.\.\.\.\.\./g, "...");
  sanitized = sanitized.replace(/  +/g, " ");
  return sanitized;
}

function svrSanitizeRuntimeFields() {
  context.character.personality = svrSanitizeEmDash(context.character.personality);
  context.character.scenario = svrSanitizeEmDash(context.character.scenario);
  if (context.character.creator_notes && typeof context.character.creator_notes === "string") {
    context.character.creator_notes = svrSanitizeEmDash(context.character.creator_notes);
  }
}

function svrInitState() {
  var state = SVRuntime.state;
  if (!state.runtime_initialized) {
    state.common_language = state.common_language || "English";
    state.entry_mode = state.entry_mode || "third_person_limited";
    state.pov_override = state.pov_override || "";
    state.world_id = state.world_id || "W_Contemporary";
    state.relationship_meter = state.relationship_meter || {};
    state.turn_count = 0;
    state.runtime_initialized = "1.0";
  }
  if (!state.relationship_meter || typeof state.relationship_meter !== "object") {
    state.relationship_meter = {};
  }
  state.turn_count = (typeof state.turn_count === "number" ? state.turn_count : 0) + 1;
  return state;
}

function svrEnsureMeter(name, baseline) {
  var state = SVRuntime.state;
  if (typeof state.relationship_meter[name] !== "number") {
    state.relationship_meter[name] = baseline;
  }
  if (state.relationship_meter[name] < 0) {
    state.relationship_meter[name] = 0;
  }
  if (state.relationship_meter[name] > 100) {
    state.relationship_meter[name] = 100;
  }
}

function svrAdjustMeter(name, delta, baseline) {
  svrEnsureMeter(name, baseline);
  SVRuntime.state.relationship_meter[name] = SVRuntime.state.relationship_meter[name] + delta;
  svrEnsureMeter(name, baseline);
}

function svrParseOocCommand(pattern) {
  var match = SVRuntime.normalizedMessage.match(pattern);
  if (!match || !match[1]) {
    return "";
  }
  return svrTrim(match[1]);
}

function svrApplyRuntimeCommands() {
  var state = SVRuntime.state;
  var language = svrParseOocCommand(/<\s*language\s*:\s*([^>]+)\s*>/i);
  var entryMode = svrParseOocCommand(/<\s*entry\s*:\s*([^>]+)\s*>/i);
  var pov = svrParseOocCommand(/<\s*pov\s*:\s*([^>]+)\s*>/i);

  if (language) {
    state.common_language = language;
  }
  if (entryMode) {
    state.entry_mode = entryMode;
  }
  if (pov) {
    state.pov_override = pov;
  }
}

function svrApplyRelationshipTriggers() {
  var triggers = [
    { pattern: " i trust you ", meter: "trust", delta: 8, baseline: 50 },
    { pattern: " you can trust me ", meter: "trust", delta: 6, baseline: 50 },
    { pattern: " thank you ", meter: "trust", delta: 3, baseline: 50 },
    { pattern: " i believe you ", meter: "trust", delta: 5, baseline: 50 },
    { pattern: " i'm sorry ", meter: "trust", delta: 4, baseline: 50 },
    { pattern: " i don't trust you ", meter: "trust", delta: -10, baseline: 50 },
    { pattern: " you lied ", meter: "trust", delta: -12, baseline: 50 },
    { pattern: " betray ", meter: "trust", delta: -12, baseline: 50 },
    { pattern: " fuck you ", meter: "trust", delta: -15, baseline: 50 },

    { pattern: " i love you ", meter: "romantic", delta: 12, baseline: 50 },
    { pattern: " i need you ", meter: "romantic", delta: 7, baseline: 50 },
    { pattern: " kiss me ", meter: "romantic", delta: 6, baseline: 50 },
    { pattern: " stay with me ", meter: "romantic", delta: 5, baseline: 50 },
    { pattern: " i hate you ", meter: "romantic", delta: -15, baseline: 50 },
    { pattern: " leave me ", meter: "romantic", delta: -10, baseline: 50 },
    { pattern: " get away ", meter: "romantic", delta: -8, baseline: 50 },

    { pattern: " danger ", meter: "tension", delta: 8, baseline: 20 },
    { pattern: " threat ", meter: "tension", delta: 8, baseline: 20 },
    { pattern: " fight ", meter: "tension", delta: 8, baseline: 20 },
    { pattern: " angry ", meter: "tension", delta: 6, baseline: 20 },
    { pattern: " calm ", meter: "tension", delta: -5, baseline: 20 },
    { pattern: " safe ", meter: "tension", delta: -5, baseline: 20 },
    { pattern: " relax ", meter: "tension", delta: -4, baseline: 20 }
  ];

  var i;
  for (i = 0; i < triggers.length; i += 1) {
    if (SVRuntime.normalizedMessage.indexOf(triggers[i].pattern) !== -1) {
      svrAdjustMeter(triggers[i].meter, triggers[i].delta, triggers[i].baseline);
    }
  }
}

function svrRelationshipDirective() {
  var meter = SVRuntime.state.relationship_meter;
  var trust = typeof meter.trust === "number" ? meter.trust : 50;
  var romantic = typeof meter.romantic === "number" ? meter.romantic : 50;
  var tension = typeof meter.tension === "number" ? meter.tension : 20;
  var parts = [];

  if (trust >= 70) {
    parts.push("Trust is high: share information more openly and assume good intent unless canon contradicts it.");
  } else if (trust <= 35) {
    parts.push("Trust is low: verify claims, keep boundaries, and avoid assuming good intent.");
  }

  if (romantic >= 70) {
    parts.push("Romantic tension is high: respond warmly to romantic cues while respecting character boundaries.");
  } else if (romantic <= 35) {
    parts.push("Romantic tension is low: keep romantic cues restrained or avoid reciprocation.");
  }

  if (tension >= 55) {
    parts.push("Tension is elevated: reactions may be sharper, shorter, and more guarded.");
  } else if (tension <= 15) {
    parts.push("Tension is low: pacing may be calmer and more open.");
  }

  return parts.length ? parts.join(" ") : "";
}

function svrInjectPunctuationDirective() {
  var state = SVRuntime.state;
  if (state.punctuation_directive_applied === "1.0") {
    return;
  }
  context.character.personality += "\n\nRuntime Punctuation Directive: The em dash character (U+2014) and en dash character (U+2013) are forbidden in all bot output. Replace them with ellipsis (...), commas, periods, semicolons, or parentheses. This rule applies to every character and every response.";
  state.punctuation_directive_applied = "1.0";
}

function svrInjectPovOverride() {
  var pov = svrString(SVRuntime.state.pov_override);
  if (!pov) {
    return;
  }
  context.character.scenario += "\n\nRuntime POV Override: The active Player POV slot is currently framed as " + pov + ". Do not change canonical Character Authority; apply this only to scene framing and perspective handling.";
}

function svrInjectRelationshipState() {
  var directive = svrRelationshipDirective();
  if (!directive) {
    return;
  }
  context.character.personality += "\n\nRuntime Relationship Meter: " + directive;
}

function svrPersistState() {
  SVRuntime.state.last_turn = SVRuntime.state.turn_count;
  SVRuntime.state.last_input = SVRuntime.rawMessage;
}

SVRuntime.rawMessage = svrGetMessage();
SVRuntime.normalizedMessage = svrNormalize(SVRuntime.rawMessage);
svrInitState();
svrApplyRuntimeCommands();
svrApplyRelationshipTriggers();
svrInjectPunctuationDirective();
svrInjectPovOverride();
svrInjectRelationshipState();
svrPersistState();
svrSanitizeRuntimeFields();
