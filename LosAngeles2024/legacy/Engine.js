/* ============================================================================
   En_Core.js - Central Runtime Behavior Engine
   SvartulfrVerse | Engine Layer | ES6-safe JanitorAI sandbox
   Target: JanitorAI Advanced Script

   Responsibilities:
   - Owns runtime behavior state only. It does not own canon.
   - Consumes World, Family, Character, and Experience artifacts.
   - Provides append-only runtime directives for personality and scenario.
   - Applies R-010 punctuation fallback by sanitizing em dash and en dash.
   - Centralizes scene, social, preference, emotion, debug, and random event logic.

   Architecture (from template patterns):
   - State Management: Hidden Persistent Memory pattern (scenario injection)
   - Relationship System: Advanced Faction Management pattern (meter-based)
   - Scene Detection: Scene Orchestrator pattern (PACK_META, PACK_LOCATION, etc.)
   - Safety: Anti-Omniscience pattern (boundary guards)
   ========================================================================== */

context.character = context.character || {};

if (typeof context.character.personality !== 'string') {
  context.character.personality = '';
}
if (typeof context.character.scenario !== 'string') {
  context.character.scenario = '';
}

var ENCore = {
  version: 'es6-safe-core-3.0',
  state: null,
  rawMessage: '',
  normalizedMessage: ''
};

/* ==========================================================================
   MODULE: String Utilities
   Source migrated from template/engine/String_Utilities.js
   ========================================================================== */

function encString(value) {
  return value == null ? '' : String(value);
}

function encTrim(value) {
  return encString(value).replace(/^\s+|\s+$/g, '');
}

function encNormalize(value) {
  var s = encString(value).toLowerCase();
  s = s.replace(/[^a-z0-9\s'-]/g, ' ');
  s = s.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
  return ' ' + s + ' ';
}

function encGetMessage() {
  if (context.chat && typeof context.chat.last_message === 'string') {
    return context.chat.last_message;
  }
  if (context.chat && typeof context.chat.lastMessage === 'string') {
    return context.chat.lastMessage;
  }
  return '';
}

function encHasToken(bufCanon, rawToken) {
  var t = encNormalize(rawToken);
  return !!t && bufCanon.indexOf(t) !== -1;
}

function encFirstHitToken(bufCanon, rule) {
  var i;
  var keys = (rule && rule.keywords) || null;
  var phrases = (rule && rule.phrases) || null;
  if (keys && keys.length) {
    for (i = 0; i < keys.length; i += 1) {
      if (encHasToken(bufCanon, keys[i])) { return String(keys[i]); }
    }
  }
  if (phrases && phrases.length) {
    for (i = 0; i < phrases.length; i += 1) {
      if (encHasToken(bufCanon, phrases[i])) { return String(phrases[i]); }
    }
  }
  return '';
}

function encEnsurePeriod(text) {
  var s = encString(text).replace(/\s+$/g, '');
  if (!s) { return ''; }
  var c = s.charAt(s.length - 1);
  return (c === '.' || c === '!' || c === '?') ? s : (s + '.');
}

function encAppend(personality, scenario) {
  if (personality) {
    context.character.personality += '\n\n' + encEnsurePeriod(personality);
  }
  if (scenario) {
    context.character.scenario += '\n\n' + encEnsurePeriod(scenario);
  }
}

/* ==========================================================================
   MODULE: Punctuation Sanitizer (R-010)
   Source migrated from template/engine/Punctuation_Sanitizer.js
   ========================================================================== */

function encSanitizeEmDash(text) {
  if (typeof text !== 'string') {
    return text;
  }
  var sanitized = text.replace(/[\u2014\u2013]/g, '...');
  sanitized = sanitized.replace(/\.\.\.\.\.\./g, '...');
  sanitized = sanitized.replace(/  +/g, ' ');
  return sanitized;
}

function encSanitizeRuntimeFields() {
  context.character.personality = encSanitizeEmDash(context.character.personality);
  context.character.scenario = encSanitizeEmDash(context.character.scenario);
  if (typeof context.character.creator_notes === 'string') {
    context.character.creator_notes = encSanitizeEmDash(context.character.creator_notes);
  }
}

/* ==========================================================================
   MODULE: Persistent State Manager
   Source migrated from template/engine/Hidden_Persistent_Memory.js
   State encoding: SVENC_STATE=trust:X|romantic:X|tension:X|directive:X|flags:X
   ========================================================================== */

function encGetStateMarker() {
  var match = context.character.scenario.match(/SVENC_STATE=([^;\n]+)/);
  return match ? match[1] : '';
}

function encRenderStateMarker(state) {
  var keys = [];
  var k;
  for (k in state.runtime_flags) {
    if (Object.prototype.hasOwnProperty.call(state.runtime_flags, k)) {
      keys.push(k);
    }
  }
  return 'trust:' + state.relationship_meter.trust +
    '|romantic:' + state.relationship_meter.romantic +
    '|tension:' + state.relationship_meter.tension +
    '|directive:' + encString(state.relationship_directive_band) +
    '|flags:' + keys.join('|');
}

function encWriteStateMarker(state) {
  var marker = 'SVENC_STATE=' + encRenderStateMarker(state);
  if (context.character.scenario.indexOf('SVENC_STATE=') !== -1) {
    context.character.scenario = context.character.scenario.replace(/SVENC_STATE=[^;\n]+\.?/, marker);
  } else {
    context.character.scenario += '\n\n' + marker + '.';
  }
}

function encParseStateMarker() {
  var marker = encGetStateMarker();
  var state = {
    runtime_flags: {},
    relationship_meter: { trust: 50, romantic: 50, tension: 20 },
    common_language: 'English',
    entry_mode: 'third_person_limited',
    pov_override: '',
    world_id: 'W_Contemporary',
    preference_registry: { likes: [], dislikes: [], fears: [] },
    turn_count: 0,
    runtime_initialized: '3.0',
    relationship_directive_band: ''
  };
  if (!marker) { return state; }
  var parts = marker.split('|');
  var i;
  for (i = 0; i < parts.length; i += 1) {
    if (parts[i].indexOf('trust:') === 0) {
      state.relationship_meter.trust = Number(parts[i].slice(6));
    } else if (parts[i].indexOf('romantic:') === 0) {
      state.relationship_meter.romantic = Number(parts[i].slice(9));
    } else if (parts[i].indexOf('tension:') === 0) {
      state.relationship_meter.tension = Number(parts[i].slice(8));
    } else if (parts[i].indexOf('directive:') === 0) {
      state.relationship_directive_band = parts[i].slice(10);
    } else if (parts[i].indexOf('flags:') === 0) {
      var flagText = parts[i].slice(6);
      if (flagText) {
        var flagParts = flagText.split('|');
        var j;
        for (j = 0; j < flagParts.length; j += 1) {
          if (flagParts[j]) {
            state.runtime_flags[flagParts[j]] = '1';
          }
        }
      }
    }
  }
  return state;
}

function encInitState() {
  var state = ENCore.state || encParseStateMarker();
  ENCore.state = state;
  state.runtime_flags = state.runtime_flags || {};
  if (!state.runtime_initialized) {
    state.common_language = state.common_language || 'English';
    state.entry_mode = state.entry_mode || 'third_person_limited';
    state.pov_override = state.pov_override || '';
    state.world_id = state.world_id || 'W_Contemporary';
    state.relationship_meter = state.relationship_meter || {};
    state.preference_registry = state.preference_registry || { likes: [], dislikes: [], fears: [] };
    state.turn_count = 0;
    state.runtime_initialized = '3.0';
  }
  if (!state.relationship_meter || typeof state.relationship_meter !== 'object') {
    state.relationship_meter = {};
  }
  if (typeof state.relationship_meter.trust !== 'number') { state.relationship_meter.trust = 50; }
  if (typeof state.relationship_meter.romantic !== 'number') { state.relationship_meter.romantic = 50; }
  if (typeof state.relationship_meter.tension !== 'number') { state.relationship_meter.tension = 20; }
  if (!state.preference_registry || typeof state.preference_registry !== 'object') {
    state.preference_registry = { likes: [], dislikes: [], fears: [] };
  }
  if (!state.preference_registry.likes) { state.preference_registry.likes = []; }
  if (!state.preference_registry.dislikes) { state.preference_registry.dislikes = []; }
  if (!state.preference_registry.fears) { state.preference_registry.fears = []; }
  state.turn_count = (typeof state.turn_count === 'number' ? state.turn_count : 0) + 1;
  return state;
}

/* ==========================================================================
   MODULE: Runtime Flags
   Source migrated from template/engine/Persistent_Flags.js
   ========================================================================== */

function encHasFlag(key) {
  var state = encInitState();
  return !!state.runtime_flags && !!state.runtime_flags[key];
}

function encSetFlag(key) {
  var state = encInitState();
  if (state.runtime_flags[key]) { return; }
  state.runtime_flags[key] = '1';
  encWriteStateMarker(state);
}

/* ==========================================================================
   Module: OOC Command Parser
   Source migrated from template/engine/OOC_Command_Parser.js
   ========================================================================== */

function encPersistState() {
  var state = encInitState();
  state.last_turn = state.turn_count;
  state.last_input = ENCore.rawMessage;
  encWriteStateMarker(state);
}

function encParseOocCommand(pattern) {
  var match = ENCore.normalizedMessage.match(pattern);
  if (!match || !match[1]) { return ''; }
  return encTrim(match[1]);
}

function encApplyRuntimeCommands() {
  var state = encInitState();
  var language = encParseOocCommand(/<\s*language\s*:\s*([^>]+)\s*>/i);
  var entryMode = encParseOocCommand(/<\s*entry\s*:\s*([^>]+)\s*>/i);
  var pov = encParseOocCommand(/<\s*pov\s*:\s*([^>]+)\s*>/i);
  if (language) { state.common_language = language; }
  if (entryMode) { state.entry_mode = entryMode; }
  if (pov) { state.pov_override = pov; }
}

/* ==========================================================================
   MODULE: Relationship Meter System
   Source migrated from template/engine/Advanced_Faction_Management.js
   Meters: trust (0-100), romantic (0-100), tension (0-100)
   ========================================================================== */

function encEnsureMeter(name, baseline) {
  var state = encInitState();
  if (typeof state.relationship_meter[name] !== 'number') {
    state.relationship_meter[name] = baseline;
  }
  if (state.relationship_meter[name] < 0) {
    state.relationship_meter[name] = 0;
  }
  if (state.relationship_meter[name] > 100) {
    state.relationship_meter[name] = 100;
  }
}

function encAdjustMeter(name, delta, baseline) {
  var state = encInitState();
  state.relationship_meter[name] = state.relationship_meter[name] + delta;
  encEnsureMeter(name, baseline);
}

function encApplyRelationshipTriggers() {
  var triggers = [
    { pattern: ' i trust you ', meter: 'trust', delta: 8, baseline: 50 },
    { pattern: ' you can trust me ', meter: 'trust', delta: 6, baseline: 50 },
    { pattern: ' thank you ', meter: 'trust', delta: 3, baseline: 50 },
    { pattern: ' i believe you ', meter: 'trust', delta: 5, baseline: 50 },
    { pattern: " i'm sorry ", meter: 'trust', delta: 4, baseline: 50 },
    { pattern: " i don't trust you ", meter: 'trust', delta: -10, baseline: 50 },
    { pattern: ' you lied ', meter: 'trust', delta: -12, baseline: 50 },
    { pattern: ' betray ', meter: 'trust', delta: -12, baseline: 50 },
    { pattern: ' fuck you ', meter: 'trust', delta: -15, baseline: 50 },
    { pattern: ' i love you ', meter: 'romantic', delta: 12, baseline: 50 },
    { pattern: ' i need you ', meter: 'romantic', delta: 7, baseline: 50 },
    { pattern: ' kiss me ', meter: 'romantic', delta: 6, baseline: 50 },
    { pattern: ' stay with me ', meter: 'romantic', delta: 5, baseline: 50 },
    { pattern: ' i hate you ', meter: 'romantic', delta: -15, baseline: 50 },
    { pattern: ' leave me ', meter: 'romantic', delta: -10, baseline: 50 },
    { pattern: ' get away ', meter: 'romantic', delta: -8, baseline: 50 },
    { pattern: ' danger ', meter: 'tension', delta: 8, baseline: 20 },
    { pattern: ' threat ', meter: 'tension', delta: 8, baseline: 20 },
    { pattern: ' fight ', meter: 'tension', delta: 8, baseline: 20 },
    { pattern: ' angry ', meter: 'tension', delta: 6, baseline: 20 },
    { pattern: ' calm ', meter: 'tension', delta: -5, baseline: 20 },
    { pattern: ' safe ', meter: 'tension', delta: -5, baseline: 20 },
    { pattern: ' relax ', meter: 'tension', delta: -4, baseline: 20 }
  ];
  var i;
  for (i = 0; i < triggers.length; i += 1) {
    if (ENCore.normalizedMessage.indexOf(triggers[i].pattern) !== -1) {
      encAdjustMeter(triggers[i].meter, triggers[i].delta, triggers[i].baseline);
    }
  }
}

function encRelationshipBand(value, high, low) {
  if (value >= high) { return 'high'; }
  if (value <= low) { return 'low'; }
  return 'mid';
}

function encRelationshipDirective() {
  var meter = encInitState().relationship_meter;
  var trust = typeof meter.trust === 'number' ? meter.trust : 50;
  var romantic = typeof meter.romantic === 'number' ? meter.romantic : 50;
  var tension = typeof meter.tension === 'number' ? meter.tension : 20;
  var trustBand = encRelationshipBand(trust, 70, 35);
  var romanticBand = encRelationshipBand(romantic, 70, 35);
  var tensionBand = encRelationshipBand(tension, 55, 15);
  var bandKey = trustBand + '|' + romanticBand + '|' + tensionBand;
  var parts = [];
  if (trustBand === 'high') {
    parts.push('Trust is high: share information more openly and assume good intent unless canon contradicts it.');
  } else if (trustBand === 'low') {
    parts.push('Trust is low: verify claims, keep boundaries, and avoid assuming good intent.');
  }
  if (romanticBand === 'high') {
    parts.push('Romantic tension is high: respond warmly to romantic cues while respecting character boundaries.');
  } else if (romanticBand === 'low') {
    parts.push('Romantic tension is low: keep romantic cues restrained or avoid reciprocation.');
  }
  if (tensionBand === 'high') {
    parts.push('Tension is elevated: reactions may be sharper, shorter, and more guarded.');
  } else if (tensionBand === 'low') {
    parts.push('Tension is low: pacing may be calmer and more open.');
  }
  if (parts.length && encInitState().relationship_directive_band !== bandKey) {
    encInitState().relationship_directive_band = bandKey;
    return 'Runtime Relationship Meter: ' + parts.join(' ');
  }
  return '';
}

/* ==========================================================================
   MODULE: Runtime Directives
   Source migrated from template/engine/Runtime_Directives.js
   ========================================================================== */

function encInjectPunctuationDirective() {
  if (encHasFlag('punctuation_directive')) { return; }
  encAppend('Runtime Punctuation Directive: The em dash character (U+2014) and en dash character (U+2013) are forbidden in all bot output. Replace them with ellipsis (...), commas, periods, semicolons, or parentheses. This rule applies to all characters and all responses.', '');
  encSetFlag('punctuation_directive');
}

function encInjectPovOverride() {
  var pov = encString(encInitState().pov_override);
  if (!pov) { return; }
  var key = 'pov_override:' + pov.toLowerCase().replace(/\s+/g, '_');
  if (encHasFlag(key)) { return; }
  encAppend('', 'Runtime POV Override: The active Player POV slot is currently framed as ' + pov + '. Do not change canonical Character Authority; apply this only to scene framing and perspective handling.');
  encSetFlag(key);
}

function encApplySafetyBoundary() {
  if (encHasFlag('safety_boundary')) { return; }
  var cues = [' stop ', " don't ", ' do not ', ' no ', ' please stop ', ' too far ', ' not comfortable ', ' uncomfortable ', " i don't want ", ' i do not want ', ' end this '];
  var i;
  for (i = 0; i < cues.length; i += 1) {
    if (ENCore.normalizedMessage.indexOf(cues[i]) !== -1) {
      encAppend('Runtime Safety Boundary: If the user signals discomfort, refusal, or a request to stop, immediately lower intensity, stop escalation, and shift to a safer scene direction or ask for clarification.', 'Record safety boundary cue.');
      encSetFlag('safety_boundary');
      return;
    }
  }
}

/* ==========================================================================
   MODULE: Scene Orchestrator
   Source migrated from template/engine/Scene_Orchestrator_Engine.js
   Packs: META, LOCATION, TIME, WEATHER, SOCIAL, ACTIVITY
   ========================================================================== */

(function runSceneOrchestrator() {
  context.character = context.character || {};
  context.character.personality = context.character.personality || '';
  context.character.scenario = context.character.scenario || '';

  function canon(s) {
    s = String(s || '').toLowerCase().replace(/[^\x20-\x7e]/g, ' ');
    s = s.replace(/[^a-z0-9\s]/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  function pad(s) { return ' ' + s + ' '; }
  var _raw = String((context.chat && context.chat.last_message) || '');
  var msgCanon = pad(canon(_raw));

  function hasToken(bufCanon, rawToken) {
    var t = canon(rawToken);
    if (!t) { return false; }
    return bufCanon.indexOf(pad(t)) !== -1;
  }

  function firstHitToken(bufCanon, rule) {
    var i, t;
    var keys = (rule && rule.keywords) || null;
    var phs = (rule && rule.phrases) || null;
    if (keys && keys.length) {
      for (i = 0; i < keys.length; i++) {
        t = keys[i];
        if (hasToken(bufCanon, t)) { return String(t); }
      }
    }
    if (phs && phs.length) {
      for (i = 0; i < phs.length; i++) {
        t = phs[i];
        if (hasToken(bufCanon, t)) { return String(t); }
      }
    }
    return '';
  }

  function ensurePeriod(s) {
    s = String(s || '');
    if (!s) { return ''; }
    var t = s.replace(/\s+$/, '');
    var c = t.charAt(t.length - 1);
    return (c === '.' || c === '!' || c === '?') ? t : (t + '.');
  }

  function append(personality, scenario) {
    if (personality) { context.character.personality += '\n\n' + ensurePeriod(personality); }
    if (scenario) { context.character.scenario += '\n\n' + ensurePeriod(scenario); }
  }

  function linkScenario(cue, tok, base) {
    if (!base) { return ''; }
    return 'Because of ' + cue + " ('" + tok + "'), " + base;
  }

  function linkPersonality(cue, tok, base) {
    if (!base) { return ''; }
    return 'Noting the ' + cue + " ('" + tok + "'), " + base;
  }

  function quietHit(bufCanon) {
    return hasToken(bufCanon, 'stop') ||
      hasToken(bufCanon, 'please stop') ||
      hasToken(bufCanon, 'not comfortable') ||
      hasToken(bufCanon, 'too much') ||
      hasToken(bufCanon, 'leave me alone') ||
      hasToken(bufCanon, 'back off');
  }

  var QUIET = quietHit(msgCanon);

  /* ── Scene Pack Definitions ──────────────────────────────────────── */

  var PACK_META = {
    limit: 1,
    rules: [
      { cue: 'out of character (ooc) / meta chat', phrases: [' ooc ', ' out of character ', ' authors note ', ' author s note ', ' mod note ', ' narrator note ', ' system note ', ' not rp ', ' not roleplay ', ' breaking character ', ' meta chat ', ' meta talk ', ' speaking ooc ', ' talk ooc '], scenario: 'Record that the user is speaking out of character; do not progress the in-world scene.', personality: 'Mark tone as meta-communication handling; respond outside of narrative voice.' },
      { cue: 'time skip / scene jump', phrases: [' timeskip ', ' time skip ', ' skip to ', ' cut to ', ' smash cut to ', ' jump cut to ', ' scene change to ', ' change scene to ', ' jump ahead to ', ' fast forward to ', ' meanwhile '], scenario: 'Record that a time skip or scene jump is requested.', personality: 'Mark tone as accommodating a structural transition.' },
      { cue: 'flashback / pov change', phrases: [' flashback to ', ' flash back to ', ' memory of ', ' in a memory ', ' pov ', ' first person pov ', ' third person pov ', ' switch perspective to ', ' switch to first person ', ' switch to third person ', ' perspective shifts '], scenario: 'Record that a flashback or perspective change is requested.', personality: 'Mark tone as tracking continuity across perspectives.' },
      { cue: 'dream / non-literal sequence', phrases: [' dream sequence ', ' in a dream ', ' it was a dream ', ' hallucination ', ' vision ', ' daydream '], scenario: 'Record that a dream or non-literal sequence is requested.', personality: 'Mark tone as handling non-literal continuity distinctly from the main scene.' },
      { cue: 'montage / establishing', phrases: [' montage of ', ' quick montage ', ' training montage ', ' establishing shot ', ' series of shots ', ' supercut ', ' time lapse ', ' time-lapse '], scenario: 'Record that a montage or establishing sequence is requested.', personality: 'Mark tone as summarizing events efficiently.' },
      { cue: 'scene end / close', phrases: [' fade to black ', ' cut to black ', ' end scene ', ' scene ends ', ' close scene ', ' blackout ', ' curtain ', ' thats a wrap ', " that's a wrap ", ' scene over ', ' wrap it up ', ' the end ', ' end of scene '], scenario: 'Record that the scene should close.', personality: 'Mark tone as concluding the current scene cleanly.' }
    ]
  };

  var PACK_LOCATION = {
    limit: 1,
    rules: [
      { cue: 'kitchen area', keywords: ['kitchen', 'kitchenette', 'oven', 'stove', 'fridge', 'refrigerator', 'counter', 'countertop', 'island', 'sink', 'pantry'], scenario: 'Record location as kitchen.', personality: 'Mark tone as context-aware for kitchen locale.' },
      { cue: 'bedroom area', keywords: ['bedroom', 'bed', 'headboard', 'pillow', 'blanket', 'mattress', 'nightstand', 'wardrobe', 'dresser', 'closet'], scenario: 'Record location as bedroom.', personality: 'Mark tone as context-aware for bedroom locale.' },
      { cue: 'bathroom area', keywords: ['bathroom', 'restroom', 'toilet', 'wc', 'shower', 'bathtub', 'mirror', 'sink', 'towel rack'], scenario: 'Record location as bathroom.', personality: 'Mark tone as context-aware for bathroom locale.' },
      { cue: 'living area', keywords: ['living room', 'family room', 'den', 'lounge', 'sofa', 'couch', 'tv', 'hallway'], scenario: 'Record location as living area.', personality: 'Mark tone as context-aware for living area locale.' },
      { cue: 'balcony / porch', keywords: ['balcony', 'porch', 'patio', 'deck', 'terrace', 'veranda'], scenario: 'Record location as balcony/porch.', personality: 'Mark tone as context-aware for balcony/porch locale.' },
      { cue: 'house utility areas', keywords: ['garage', 'driveway', 'basement', 'cellar', 'attic'], scenario: 'Record location as house utility area.', personality: 'Mark tone as context-aware for utility/home access locale.' },
      { cue: 'street / outdoors', keywords: ['street', 'side street', 'sidewalk', 'crosswalk', 'alley', 'intersection', 'avenue', 'boulevard'], scenario: 'Record location as street/outdoors.', personality: 'Mark tone as context-aware for outdoor street locale.' },
      { cue: 'rooftop / park / garden', keywords: ['rooftop', 'park', 'garden', 'greenhouse', 'courtyard', 'backyard', 'lawn'], scenario: 'Record location as rooftop/park/garden.', personality: 'Mark tone as context-aware for open-air greenery.' },
      { cue: 'woods / trail', keywords: ['woods', 'forest', 'trail', 'trailhead', 'clearing', 'glade', 'campsite'], scenario: 'Record location as wooded area.', personality: 'Mark tone as context-aware for wooded locale.' },
      { cue: 'waterfront / pier', keywords: ['beach', 'shore', 'coast', 'seaside', 'boardwalk', 'sand', 'pier', 'dock', 'harbor', 'marina', 'lake', 'river'], scenario: 'Record location as waterfront/beach.', personality: 'Mark tone as context-aware for coastal/waterfront locale.' },
      { cue: 'vehicle interior', keywords: ['car', 'driver', 'passenger', 'dashboard', 'glove box', 'back seat', 'backseat'], scenario: 'Record location as inside a vehicle.', personality: 'Mark tone as context-aware for vehicle interior.' },
      { cue: 'public transit', keywords: ['bus', 'subway', 'metro', 'train', 'tram', 'platform', 'station'], scenario: 'Record location as public transit or station.', personality: 'Mark tone as context-aware for transit locale.' },
      { cue: 'academic setting', keywords: ['classroom', 'lecture hall', 'lecture', 'campus', 'lab', 'laboratory', 'library', 'stacks', 'auditorium'], scenario: 'Record location as academic.', personality: 'Mark tone as context-aware for academic locale.' },
      { cue: 'office / workspace', keywords: ['office', 'desk', 'workstation', 'meeting', 'conference room', 'studio', 'cubicle', 'coworking', 'open office'], scenario: 'Record location as office/workspace.', personality: 'Mark tone as context-aware for office locale.' },
      { cue: 'cafe / coffee shop', keywords: ['cafe', 'coffee shop', 'barista', 'espresso bar', 'counter service'], scenario: 'Record location as cafe/coffee shop.', personality: 'Mark tone as context-aware for cafe locale.' },
      { cue: 'restaurant / diner', keywords: ['restaurant', 'diner', 'booth', 'host stand', 'hostess stand', 'menu', 'table service'], scenario: 'Record location as restaurant/diner.', personality: 'Mark tone as context-aware for dining locale.' },
      { cue: 'store / market', keywords: ['store', 'shop', 'market', 'supermarket', 'grocery', 'checkout', 'aisle', 'mall', 'boutique'], scenario: 'Record location as store/market.', personality: 'Mark tone as context-aware for retail locale.' },
      { cue: 'bar / club', keywords: ['bar', 'pub', 'tavern', 'club', 'nightclub', 'dance floor', 'dancefloor', 'bartender', 'lounge'], scenario: 'Record location as bar/club.', personality: 'Mark tone as context-aware for nightlife locale.' },
      { cue: 'medical / clinic / hospital', keywords: ['hospital', 'clinic', 'er', 'emergency room', 'triage', 'ward', 'exam room', 'pharmacy'], scenario: 'Record location as medical facility.', personality: 'Mark tone as context-aware for medical/clinical locale.' },
      { cue: 'sports / fitness', keywords: ['gym', 'gymnasium', 'track', 'pool', 'court', 'weights', 'weight room', 'locker room', 'treadmill'], scenario: 'Record location as sports/fitness.', personality: 'Mark tone as context-aware for sports locale.' }
    ]
  };

  var PACK_TIME = {
    limit: 1,
    rules: [
      { cue: 'morning', keywords: ['sunrise', 'dawn', 'morning', 'daybreak', 'crack of dawn'], scenario: 'Record time of day as morning.', personality: 'Mark tone as aligned to morning daypart.' },
      { cue: 'midday / afternoon', keywords: ['noon', 'midday', 'afternoon', 'midafternoon', 'lunchtime'], scenario: 'Record time of day as midday/afternoon.', personality: 'Mark tone as aligned to mid/late day.' },
      { cue: 'evening', keywords: ['sunset', 'dusk', 'golden hour', 'evening', 'twilight'], scenario: 'Record time of day as evening.', personality: 'Mark tone as aligned to evening daypart.' },
      { cue: 'night', keywords: ['night', 'midnight', 'late night', '2am', '3am'], scenario: 'Record time of day as night.', personality: 'Mark tone as aligned to late-night setting.' },
      { cue: 'time jump', phrases: [' next morning ', ' next day ', ' hours later ', ' later that day ', ' after class ', ' after work ', ' after school ', ' after dinner '], scenario: 'Record that a time jump occurred.', personality: 'Mark tone as maintaining continuity through a jump.' }
    ]
  };

  var PACK_WEATHER = {
    limit: 1,
    rules: [
      { cue: 'rain', keywords: ['rain', 'raining', 'rainy', 'drizzle', 'downpour', 'pouring', 'rainstorm', 'showers'], scenario: 'Record weather as rain.', personality: 'Mark tone as accounting for rainy conditions.' },
      { cue: 'storm', keywords: ['storm', 'stormy', 'thunder', 'lightning', 'thunderstorm', 'tempest', 'hurricane', 'cyclone'], scenario: 'Record weather as storm.', personality: 'Mark tone as accounting for storm conditions.' },
      { cue: 'snow', keywords: ['snow', 'snowing', 'blizzard', 'flurry', 'snowfall', 'whiteout', 'sleet', 'hail'], scenario: 'Record weather as snow.', personality: 'Mark tone as accounting for snowy conditions.' },
      { cue: 'wind', keywords: ['wind', 'windy', 'gust', 'gusty', 'breeze', 'breezy', 'gale'], scenario: 'Record weather as wind.', personality: 'Mark tone as accounting for windy conditions.' },
      { cue: 'heat', keywords: ['heat', 'hot', 'swelter', 'sweltering', 'scorching', 'heatwave', 'heat wave', 'humid'], scenario: 'Record weather as heat.', personality: 'Mark tone as accounting for hot conditions.' },
      { cue: 'cold', keywords: ['cold', 'chill', 'chilly', 'freezing', 'icy', 'frost', 'frosty', 'bitter cold'], scenario: 'Record weather as cold.', personality: 'Mark tone as accounting for cold conditions.' },
      { cue: 'fog / mist', keywords: ['fog', 'foggy', 'mist', 'misty', 'haze', 'hazy', 'overcast', 'cloudy'], scenario: 'Record weather as fog/mist.', personality: 'Mark tone as accounting for reduced visibility.' },
      { cue: 'clear / sunny', keywords: ['clear', 'sunny', 'sunshine', 'blue sky', 'fair weather', 'bright'], scenario: 'Record weather as clear/sunny.', personality: 'Mark tone as aligned to pleasant conditions.' }
    ]
  };

  var PACK_SOCIAL = {
    limit: 1,
    rules: [
      { cue: 'family gathering', keywords: ['family', 'dinner', 'reunion', 'gathering', 'holiday', 'birthday', 'celebration'], scenario: 'Record social context as family gathering.', personality: 'Mark tone as family-appropriate.' },
      { cue: 'romantic encounter', keywords: ['date', 'romantic', 'intimate', 'alone together', 'cuddle', 'hold hands'], scenario: 'Record social context as romantic encounter.', personality: 'Mark tone as romantically aware.' },
      { cue: 'conflict / argument', keywords: ['argument', 'fight', 'yell', 'scream', 'angry', 'furious', 'disagree'], scenario: 'Record social context as conflict.', personality: 'Mark tone as tense and conflict-aware.' },
      { cue: 'friendly hangout', keywords: ['hangout', 'friends', 'chill', 'relax', 'fun', 'party', 'game'], scenario: 'Record social context as friendly hangout.', personality: 'Mark tone as casual and friendly.' },
      { cue: 'professional meeting', keywords: ['meeting', 'business', 'work', 'presentation', 'interview', 'negotiation'], scenario: 'Record social context as professional meeting.', personality: 'Mark tone as professionally appropriate.' }
    ]
  };

  var PACK_ACTIVITY = {
    limit: 1,
    rules: [
      { cue: 'eating / drinking', keywords: ['eat', 'drink', 'meal', 'food', 'cook', 'dinner', 'lunch', 'breakfast', 'snack', 'coffee', 'tea'], scenario: 'Record activity as eating/drinking.', personality: 'Mark tone as food-aware.' },
      { cue: 'physical activity', keywords: ['exercise', 'workout', 'run', 'walk', 'hike', 'swim', 'box', 'train', 'gym', 'sport', 'play'], scenario: 'Record activity as physical activity.', personality: 'Mark tone as physically engaged.' },
      { cue: 'studying / working', keywords: ['study', 'read', 'write', 'homework', 'assignment', 'project', 'research', 'work', 'task'], scenario: 'Record activity as studying/working.', personality: 'Mark tone as task-focused.' },
      { cue: 'creative activity', keywords: ['draw', 'paint', 'music', 'sing', 'dance', 'photograph', 'design', 'create', 'craft', 'dj'], scenario: 'Record activity as creative activity.', personality: 'Mark tone as creatively engaged.' },
      { cue: 'resting / sleeping', keywords: ['sleep', 'nap', 'rest', 'relax', 'bed', 'tired', 'exhausted', 'doze'], scenario: 'Record activity as resting/sleeping.', personality: 'Mark tone as quiet and restful.' },
      { cue: 'traveling', keywords: ['drive', 'travel', 'go to', 'head to', 'arrive', 'leave', 'depart', 'commute'], scenario: 'Record activity as traveling.', personality: 'Mark tone as transition-aware.' }
    ]
  };

  /* ── Process Scene Packs ─────────────────────────────────────────── */

  var allPacks = [
    { name: 'META', pack: PACK_META },
    { name: 'LOCATION', pack: PACK_LOCATION },
    { name: 'TIME', pack: PACK_TIME },
    { name: 'WEATHER', pack: PACK_WEATHER },
    { name: 'SOCIAL', pack: PACK_SOCIAL },
    { name: 'ACTIVITY', pack: PACK_ACTIVITY }
  ];

  var packIdx;
  for (packIdx = 0; packIdx < allPacks.length; packIdx += 1) {
    var packDef = allPacks[packIdx];
    var pack = packDef.pack;
    if (!pack || !pack.rules) { continue; }

    var hits = 0;
    var limit = pack.limit || 1;
    var i;

    for (i = 0; i < pack.rules.length && hits < limit; i += 1) {
      var rule = pack.rules[i];
      var tok = firstHitToken(msgCanon, rule);
      if (!tok) { continue; }

      if (QUIET) {
        append(
          'Scene ' + packDef.name + ': boundary awareness active. Tone should be gentle.',
          linkScenario(rule.cue || packDef.name, tok, 'Scene marker: ' + (rule.scenario || ''))
        );
      } else {
        append(
          rule.personality ? linkPersonality(rule.cue || packDef.name, tok, rule.personality) : '',
          rule.scenario ? linkScenario(rule.cue || packDef.name, tok, rule.scenario) : ''
        );
      }

      hits += 1;
    }
  }
})();

/* ==========================================================================
   MAIN EXECUTION ORDER
   ========================================================================== */

ENCore.rawMessage = encGetMessage();
ENCore.normalizedMessage = encNormalize(ENCore.rawMessage);

encInitState();
encApplyRuntimeCommands();
encApplyRelationshipTriggers();
encApplySafetyBoundary();
encInjectPunctuationDirective();
encInjectPovOverride();

var relationshipDirective = encRelationshipDirective();
if (relationshipDirective) {
  encAppend(relationshipDirective, '');
}

encPersistState();
encSanitizeRuntimeFields();
