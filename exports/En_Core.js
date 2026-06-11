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
   - Adds small, idempotent preference, social, scene, and safety helpers.
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
  version: "es5-runtime-foundation-1.1",
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
  if (context.chat && context.chat.last_message) {
    return svrString(context.chat.last_message);
  }
  if (context.chat && context.chat.lastMessage) {
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
  context.character.creator_notes = svrSanitizeEmDash(context.character.creator_notes);
}

function svrInitState() {
  var state = SVRuntime.state;
  state.runtime_flags = state.runtime_flags || {};
  if (!state.runtime_initialized) {
    state.common_language = state.common_language || "English";
    state.entry_mode = state.entry_mode || "third_person_limited";
    state.pov_override = state.pov_override || "";
    state.world_id = state.world_id || "W_Contemporary";
    state.relationship_meter = state.relationship_meter || {};
    state.preference_registry = state.preference_registry || { likes: [], dislikes: [], fears: [] };
    state.turn_count = 0;
    state.runtime_initialized = "1.0";
  }
  if (!state.relationship_meter || typeof state.relationship_meter !== "object") {
    state.relationship_meter = {};
  }
  if (!state.preference_registry || typeof state.preference_registry !== "object") {
    state.preference_registry = { likes: [], dislikes: [], fears: [] };
  }
  if (!state.preference_registry.likes) { state.preference_registry.likes = []; }
  if (!state.preference_registry.dislikes) { state.preference_registry.dislikes = []; }
  if (!state.preference_registry.fears) { state.preference_registry.fears = []; }
  state.turn_count = (typeof state.turn_count === "number" ? state.turn_count : 0) + 1;
  return state;
}

function svrHasFlag(key) {
  return !!SVRuntime.state.runtime_flags[key];
}

function svrSetFlag(key) {
  SVRuntime.state.runtime_flags[key] = "1";
}

function svrAppend(personality, scenario) {
  if (personality) { context.character.personality += "\n\n" + svrEnsurePeriod(personality); }
  if (scenario) { context.character.scenario += "\n\n" + svrEnsurePeriod(scenario); }
}

function svrEnsurePeriod(s) {
  s = svrString(s).replace(/\s+$/g, "");
  if (!s) { return ""; }
  var c = s.charAt(s.length - 1);
  return (c === "." || c === "!" || c === "?") ? s : (s + ".");
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

  if (language) { state.common_language = language; }
  if (entryMode) { state.entry_mode = entryMode; }
  if (pov) { state.pov_override = pov; }
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

function svrRelationshipBand(value, high, low) {
  if (value >= high) { return "high"; }
  if (value <= low) { return "low"; }
  return "mid";
}

function svrRelationshipDirective() {
  var meter = SVRuntime.state.relationship_meter;
  var trust = typeof meter.trust === "number" ? meter.trust : 50;
  var romantic = typeof meter.romantic === "number" ? meter.romantic : 50;
  var tension = typeof meter.tension === "number" ? meter.tension : 20;
  var trustBand = svrRelationshipBand(trust, 70, 35);
  var romanticBand = svrRelationshipBand(romantic, 70, 35);
  var tensionBand = svrRelationshipBand(tension, 55, 15);
  var bandKey = trustBand + "|" + romanticBand + "|" + tensionBand;
  var parts = [];

  if (trustBand === "high") {
    parts.push("Trust is high: share information more openly and assume good intent unless canon contradicts it.");
  } else if (trustBand === "low") {
    parts.push("Trust is low: verify claims, keep boundaries, and avoid assuming good intent.");
  }

  if (romanticBand === "high") {
    parts.push("Romantic tension is high: respond warmly to romantic cues while respecting character boundaries.");
  } else if (romanticBand === "low") {
    parts.push("Romantic tension is low: keep romantic cues restrained or avoid reciprocation.");
  }

  if (tensionBand === "high") {
    parts.push("Tension is elevated: reactions may be sharper, shorter, and more guarded.");
  } else if (tensionBand === "low") {
    parts.push("Tension is low: pacing may be calmer and more open.");
  }

  if (parts.length && SVRuntime.state.relationship_directive_band !== bandKey) {
    SVRuntime.state.relationship_directive_band = bandKey;
    return "Runtime Relationship Meter: " + parts.join(" ");
  }
  return "";
}

function svrInjectPunctuationDirective() {
  var state = SVRuntime.state;
  if (svrHasFlag("punctuation_directive")) { return; }
  svrAppend("Runtime Punctuation Directive: The em dash character (U+2014) and en dash character (U+2013) are forbidden in all bot output. Replace them with ellipsis (...), commas, periods, semicolons, or parentheses. This rule applies to every character and every response.", "");
  svrSetFlag("punctuation_directive");
}

function svrInjectPovOverride() {
  var pov = svrString(SVRuntime.state.pov_override);
  if (!pov) { return; }
  var key = "pov_override:" + pov.toLowerCase().replace(/\s+/g, "_");
  if (svrHasFlag(key)) { return; }
  svrAppend("", "Runtime POV Override: The active Player POV slot is currently framed as " + pov + ". Do not change canonical Character Authority; apply this only to scene framing and perspective handling.");
  svrSetFlag(key);
}

function svrHasToken(bufCanon, rawToken) {
  var t = svrNormalize(rawToken);
  return !!t && bufCanon.indexOf(t) !== -1;
}

function svrFirstHitToken(bufCanon, rule) {
  var i;
  var keys = (rule && rule.keywords) || null;
  var phrases = (rule && rule.phrases) || null;
  if (keys && keys.length) {
    for (i = 0; i < keys.length; i += 1) {
      if (svrHasToken(bufCanon, keys[i])) { return String(keys[i]); }
    }
  }
  if (phrases && phrases.length) {
    for (i = 0; i < phrases.length; i += 1) {
      if (svrHasToken(bufCanon, phrases[i])) { return String(phrases[i]); }
    }
  }
  return "";
}

function svrExtractAfter(bufCanon, trigger) {
  var t = svrNormalize(trigger);
  if (!t) { return ""; }
  var pos = bufCanon.indexOf(t);
  if (pos === -1) { return ""; }
  var start = pos + t.length;
  var tail = bufCanon.substr(start);
  var stops = [" but ", " and ", " because ", " though ", " however ", " unless ", " except ", " if ", " when ", " while ", " then ", " so ", " also ", " i ", " you ", " we ", " they ", " he ", " she "];
  var i;
  var stopPos = -1;
  for (i = 0; i < stops.length; i += 1) {
    var sp = tail.indexOf(stops[i]);
    if (sp !== -1 && (stopPos === -1 || sp < stopPos)) { stopPos = sp; }
  }
  if (stopPos !== -1) { tail = tail.substr(0, stopPos); }
  var words = tail.split(" ");
  var out = "";
  var count = 0;
  var j;
  for (j = 0; j < words.length; j += 1) {
    var w = words[j];
    if (!w) { continue; }
    out = out ? (out + " " + w) : w;
    count += 1;
    if (count >= 4) { break; }
  }
  out = svrTrim(out);
  if (!out || out === "it" || out === "that" || out === "this") { return ""; }
  return out;
}

function svrRecordPreference(type, target, cue) {
  var registry = SVRuntime.state.preference_registry;
  var key = type + ":" + target.toLowerCase().replace(/\s+/g, "_");
  var list = registry[type] || [];
  var i;
  for (i = 0; i < list.length; i += 1) {
    if (list[i].target === target) { return false; }
  }
  if (list.length >= 10) { list.shift(); }
  list.push({ target: target, cue: cue });
  registry[type] = list;
  svrSetFlag("preference:" + key);
  return true;
}

function svrRunPreferencePack(pack) {
  var rules = pack.rules;
  var i;
  for (i = 0; i < rules.length; i += 1) {
    var rule = rules[i];
    var tok = svrFirstHitToken(SVRuntime.normalizedMessage, rule);
    if (!tok) { continue; }
    var target = svrExtractAfter(SVRuntime.normalizedMessage, tok) || "unspecified";
    if (!svrRecordPreference(pack.type, target, rule.cue)) { continue; }
    if (pack.type === "likes") {
      svrAppend("Noting the stated like ('" + target + "'), acknowledge this preference when relevant.", "Record LIKE: " + target + " because of " + rule.cue + " ('" + tok + "').");
    } else if (pack.type === "dislikes") {
      svrAppend("Noting the stated dislike ('" + target + "'), avoid forcing this preference unless the scene clearly calls for it.", "Record DISLIKE: " + target + " because of " + rule.cue + " ('" + tok + "').");
    } else {
      svrAppend("Noting the stated fear ('" + target + "'), treat it cautiously and supportively.", "Record FEAR: " + target + " because of " + rule.cue + " ('" + tok + "').");
    }
    break;
  }
}

var PACK_LIKES = {
  type: "likes",
  rules: [
    { cue: "stated like", phrases: [" i like ", " i really like ", " i love ", " i enjoy ", " i adore ", " i prefer ", " big fan of ", " huge fan of ", " i am into ", " i m into ", " i dig "] },
    { cue: "favorite item", phrases: [" my favorite is ", " my favourite is ", " favorite is ", " favourite is ", " my favorite ", " my favourite "] },
    { cue: "enthusiastic like", phrases: [" i m all about ", " i am all about ", " i live for ", " can t get enough of ", " obsessed with ", " down for ", " craving "] },
    { cue: "comparative preference", phrases: [" i d rather have ", " i would rather have ", " i d rather ", " i would rather ", " prefer ", " prefer over "] }
  ]
};

var PACK_DISLIKES = {
  type: "dislikes",
  rules: [
    { cue: "stated dislike", phrases: [" i dislike ", " i hate ", " i detest ", " i can t stand ", " i don t like ", " not a fan of ", " i don't care for ", " i strongly dislike "] },
    { cue: "refusal / pass", phrases: [" no thanks to ", " hard pass on ", " hard pass ", " i ll pass on ", " i will pass on ", " i d rather not ", " i would rather not ", " prefer not to ", " rather not "] },
    { cue: "aversion / disgust", phrases: [" not into ", " turns me off ", " grosses me out ", " grossed out by ", " makes me sick ", " makes me nauseous ", " yuck ", " ugh "] },
    { cue: "avoidance", phrases: [" i avoid ", " i try to avoid ", " i steer clear of ", " i keep away from "] }
  ]
};

var PACK_FEARS = {
  type: "fears",
  rules: [
    { cue: "stated fear", phrases: [" i am afraid of ", " i m afraid of ", " afraid of ", " scared of ", " fear of ", " i fear ", " i have a phobia of ", " phobia of "] },
    { cue: "intense fear", phrases: [" terrified of ", " i m terrified of ", " petrified of ", " i m petrified of ", " it freaks me out ", " freaked out by ", " it scares me ", " scares me ", " my worst fear is "] },
    { cue: "anxiety about", phrases: [" i have anxiety about ", " i m anxious about ", " i worry about ", " makes me anxious ", " makes me nervous ", " i get nervous around ", " i panic when ", " i can t handle "] }
  ]
};

function svrRunSocialRules() {
  var rules = [
    { cue: "apology", phrases: [" i'm sorry ", " i am sorry ", " sorry about ", " my bad "], personality: "Noting the apology, respond with accountability and do not escalate blame." },
    { cue: "gratitude", phrases: [" thank you ", " thanks ", " appreciate it "], personality: "Noting the gratitude, acknowledge it plainly and keep the tone grounded." },
    { cue: "praise", phrases: [" you are good ", " you're good ", " you did well ", " nice job ", " good job "], personality: "Noting the praise, accept it without becoming grandiose." },
    { cue: "encouragement", phrases: [" you can do it ", " keep going ", " don't give up ", " you got this "], personality: "Noting the encouragement, let it raise confidence slightly without breaking character." },
    { cue: "help request", phrases: [" can you help ", " could you help ", " help me ", " i need help "], personality: "Noting the help request, prioritize practical assistance and clarify only if needed." },
    { cue: "promise", phrases: [" i promise ", " i swear ", " i will "], personality: "Noting the promise, treat it as a commitment cue and remember the stated intent." },
    { cue: "agreement", phrases: [" i agree ", " agreed ", " you're right "], personality: "Noting the agreement, keep momentum without over-explaining." },
    { cue: "disagreement", phrases: [" i disagree ", " that's wrong ", " you're wrong "], personality: "Noting the disagreement, respond with boundaries and clarify instead of attacking." },
    { cue: "compliment", phrases: [" you look ", " you seem ", " you're cute ", " you're beautiful ", " you're smart "], personality: "Noting the compliment, acknowledge it in character without derailing the scene." },
    { cue: "politeness", phrases: [" please ", " thank you ", " excuse me "], personality: "Noting the politeness cue, mirror a respectful tone." }
  ];
  var i;
  for (i = 0; i < rules.length; i += 1) {
    var tok = svrFirstHitToken(SVRuntime.normalizedMessage, rules[i]);
    if (!tok) { continue; }
    var key = "social:" + rules[i].cue;
    if (svrHasFlag(key)) { continue; }
    svrAppend(rules[i].personality, "Record social cue: " + rules[i].cue + " ('" + tok + "').");
    svrSetFlag(key);
  }
}

function svrRunSceneRules() {
  var rules = [
    { cue: "time", phrases: [" morning ", " afternoon ", " evening ", " night ", " midnight ", " dawn ", " later ", " the next day "], personality: "Noting the time cue, keep scene timing consistent.", scenario: "Record scene time cue." },
    { cue: "weather", phrases: [" rain ", " raining ", " storm ", " thunder ", " fog ", " heat ", " cold ", " snow "], personality: "Noting the weather cue, let atmosphere affect mood without changing canon.", scenario: "Record scene weather cue." },
    { cue: "props", phrases: [" phone ", " laptop ", " keys ", " coffee ", " car ", " bag ", " notebook "], personality: "Noting the prop cue, keep it as a scene object rather than inventing new lore.", scenario: "Record scene prop cue." },
    { cue: "meta", phrases: [" ooc ", " out of character ", " time skip ", " flashback ", " scene end "], personality: "Noting the meta cue, follow the requested framing without changing Character Authority.", scenario: "Record meta scene cue." }
  ];
  var i;
  for (i = 0; i < rules.length; i += 1) {
    var tok = svrFirstHitToken(SVRuntime.normalizedMessage, rules[i]);
    if (!tok) { continue; }
    var key = "scene:" + rules[i].cue + ":" + tok.replace(/\s+/g, "_");
    if (svrHasFlag(key)) { continue; }
    svrAppend(rules[i].personality, rules[i].scenario + " (" + tok + ").");
    svrSetFlag(key);
  }
}

function svrApplySafetyBoundary() {
  if (svrHasFlag("safety_boundary")) { return; }
  var cues = [" stop ", " don't ", " do not ", " no ", " please stop ", " too far ", " not comfortable ", " uncomfortable ", " i don't want ", " i do not want ", " end this "];
  var i;
  for (i = 0; i < cues.length; i += 1) {
    if (SVRuntime.normalizedMessage.indexOf(cues[i]) !== -1) {
      svrAppend("Runtime Safety Boundary: If the user signals discomfort, refusal, or a request to stop, immediately reduce intensity, stop escalation, and shift to a safer scene direction or ask for clarification.", "Record safety boundary cue.");
      svrSetFlag("safety_boundary");
      return;
    }
  }
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
svrApplySafetyBoundary();
svrRunSocialRules();
svrRunSceneRules();
svrRunPreferencePack(PACK_LIKES);
svrRunPreferencePack(PACK_DISLIKES);
svrRunPreferencePack(PACK_FEARS);
svrAppend(svrRelationshipDirective(), "");
svrPersistState();
svrSanitizeRuntimeFields();
