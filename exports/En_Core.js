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
   ========================================================================== */

context.character = context.character || {};

if (typeof context.character.personality !== 'string') {
  context.character.personality = '';
}
if (typeof context.character.scenario !== 'string') {
  context.character.scenario = '';
}

var ENCore = {
  version: 'es6-safe-core-2.0',
  state: null,
  rawMessage: '',
  normalizedMessage: ''
};

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
  return 'trust:' + state.relationship_meter.trust + '|romantic:' + state.relationship_meter.romantic + '|tension:' + state.relationship_meter.tension + '|directive:' + encString(state.relationship_directive_band) + '|flags:' + keys.join('|');
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
    runtime_initialized: '2.0',
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
    state.runtime_initialized = '2.0';
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
      { cue: 'fog / mist', keywords: ['fog', 'foggy', 'mist', 'misty', 'haze', 'hazy', 'smog'], scenario: 'Record weather as fog/mist.', personality: 'Mark tone as accounting for low visibility.' }
    ]
  };

  var PACK_PROPS = {
    limit: 1,
    rules: [
      { cue: 'coffee item', keywords: ['coffee', 'mug', 'espresso', 'thermos', 'latte', 'cup', 'cappuccino', 'brew', 'carafe'], scenario: 'Record presence of a coffee-related item.', personality: 'Mark tone as noting casual beverage context.' },
      { cue: 'phone / messaging', keywords: ['phone', 'cell', 'cellphone', 'mobile', 'text', 'scroll', 'notification', 'ringer', 'voicemail', 'tablet', 'ipad'], scenario: 'Record presence of phone or messaging device.', personality: 'Mark tone as noting communication devices in scene.' },
      { cue: 'keys', keywords: ['keys', 'car keys', 'keyring', 'key chain', 'house key', 'apartment key'], scenario: 'Record presence of keys.', personality: 'Mark tone as noting ready-to-travel context.' },
      { cue: 'reading / writing', keywords: ['book', 'novel', 'comic', 'notebook', 'journal', 'diary', 'pen', 'pencil', 'paper', 'cookbook'], scenario: 'Record presence of reading/writing material.', personality: 'Mark tone as noting study or note-taking context.' },
      { cue: 'cooking tool', keywords: ['apron', 'knife', 'pan', 'skillet', 'spatula', 'pot', 'bowl', 'whisk', 'ladle'], scenario: 'Record presence of cooking tools.', personality: 'Mark tone as noting food prep context.' },
      { cue: 'rain gear', keywords: ['umbrella', 'hood', 'raincoat', 'poncho', 'galoshes'], scenario: 'Record presence of rain gear.', personality: 'Mark tone as noting preparedness for rain.' },
      { cue: 'blanket / cover', keywords: ['blanket', 'throw', 'quilt', 'comforter', 'duvet'], scenario: 'Record presence of a blanket/cover.', personality: 'Mark tone as noting comfort/warmth context.' },
      { cue: 'footwear', keywords: ['heels', 'boots', 'sneakers', 'laces', 'sandals', 'slippers', 'flip flops'], scenario: 'Record presence of footwear detail.', personality: 'Mark tone as noting movement-readiness.' },
      { cue: 'makeup / grooming', keywords: ['lipstick', 'makeup', 'compact', 'mirror', 'blush', 'mascara', 'eyeliner', 'powder'], scenario: 'Record presence of makeup/grooming items.', personality: 'Mark tone as noting appearance/grooming context.' },
      { cue: 'laptop / typing', keywords: ['laptop', 'keyboard', 'trackpad', 'notebook computer', 'pc', 'desktop', 'computer'], scenario: 'Record presence of a laptop or typing device.', personality: 'Mark tone as noting work/study device in scene.' },
      { cue: 'glasses / eyewear', keywords: ['glasses', 'eyeglasses', 'spectacles', 'shades', 'sunglasses'], scenario: 'Record presence of eyewear.', personality: 'Mark tone as noting visual aid or style cue.' },
      { cue: 'wallet / bag', keywords: ['wallet', 'purse', 'bag', 'handbag', 'backpack', 'satchel'], scenario: 'Record presence of a wallet or bag.', personality: 'Mark tone as noting possession or travel readiness.' },
      { cue: 'remote / console', keywords: ['remote', 'controller', 'console', 'joystick', 'gamepad'], scenario: 'Record presence of entertainment device.', personality: 'Mark tone as noting casual recreation context.' },
      { cue: 'candle / light source', keywords: ['candle', 'lantern', 'lamp', 'torch', 'flashlight'], scenario: 'Record presence of a light source.', personality: 'Mark tone as noting illumination or ambiance.' }
    ]
  };

  var PACKS = [PACK_META, PACK_LOCATION, PACK_TIME, PACK_WEATHER, PACK_PROPS];
  var p, r;
  for (p = 0; p < PACKS.length; p++) {
    var pack = PACKS[p];
    var rules = (pack && pack.rules) ? pack.rules : null;
    var limit = (pack && pack.limit) ? pack.limit : 1;
    var used = 0;
    if (!rules || rules.length < 1) { continue; }
    if (QUIET && pack === PACK_META) { continue; }
    for (r = 0; r < rules.length; r++) {
      if (used >= limit) { break; }
      var rule = rules[r];
      if (!rule) { continue; }
      var tok = firstHitToken(msgCanon, rule);
      if (tok) {
        var scen = linkScenario(rule.cue, tok, rule.scenario || '');
        var pers = linkPersonality(rule.cue, tok, rule.personality || '');
        if (pers || scen) {
          append(pers, scen);
          used++;
        }
      }
    }
  }
})();

/* ==========================================================================
   MODULE: Action and Social Reaction
   Source migrated from template/engine/Action_Social_Reaction_Engine.js
   ========================================================================== */

(function runActionSocialReaction() {
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

  var PACK_ACTIONS = {
    limit: 1,
    rules: [
      { cue: 'touch / closeness', keywords: ['hug', 'embrace', 'cuddle', 'snuggle', 'hold', 'pat', 'stroke', 'caress'], scenario: 'Record physical closeness (hug/embrace) in the scene.', personality: 'Mark tone as responsive to physical affection.' },
      { cue: 'kiss', keywords: ['kiss', 'smooch', 'peck', 'make out'], scenario: 'Record a kiss occurred; treat as a major intimacy cue.', personality: 'Mark tone as engaged in direct intimacy.' },
      { cue: 'handholding', phrases: [' hold hands ', ' take my hand ', ' take your hand ', ' hold my hand ', ' interlace fingers ', ' grip hand ', ' squeeze hand '], scenario: 'Record handholding as a consented intimacy action.', personality: 'Mark tone as open to gentle closeness.' },
      { cue: 'repositioning', keywords: ['push', 'pull', 'shove', 'yank', 'drag', 'nudge', 'guide', 'lead', 'steer', 'lift', 'carry', 'turn'], scenario: 'Record repositioning or movement of bodies or objects.', personality: 'Mark tone as reactive to physical control or direction.' },
      { cue: 'care / first aid', keywords: ['bandage', 'wrap', 'ice pack', 'first aid', 'disinfect', 'antiseptic', 'apply pressure', 'clean the wound', 'gauze', 'splint', 'stitch', 'ointment', 'salve', 'medicine'], scenario: 'Record first aid or medical care being given.', personality: 'Mark tone as attentive and caring toward injury.' },
      { cue: 'chores', keywords: ['kitchen', 'cook', 'stir', 'chop', 'bake', 'brew', 'pour', 'serve', 'wash', 'rinse', 'dry', 'fold', 'laundry', 'sweep', 'vacuum', 'mop', 'clean', 'tidy', 'dust', 'iron', 'sew', 'sewing', 'knit'], scenario: 'Record domestic or household tasks being performed.', personality: 'Mark tone as focused on practical daily activity.' },
      { cue: 'movement / travel', keywords: ['drive', 'start', 'ride', 'walk', 'run', 'jog', 'open', 'unlock', 'knock', 'enter', 'exit', 'arrive', 'leave', 'crawl', 'climb', 'fall', 'jump', 'sit', 'stand', 'turn'], scenario: 'Record movement or travel action in the scene.', personality: 'Mark tone as responsive to transitions or travel.' },
      { cue: 'communication action', keywords: ['text', 'texted', 'call', 'called', 'ring', 'message', 'messaged', 'dm', 'dms', 'email', 'ping', 'voice', 'voicemail', 'answer', 'answered', 'video call', 'zoom'], scenario: 'Record communication attempt via phone, message, or video call.', personality: 'Mark tone as attentive to communication attempts.' }
    ]
  };

  var PACK_AFFECTION = {
    limit: 1,
    rules: [
      { cue: 'reassurance', phrases: [" it's okay ", ' its okay ', " it's alright ", ' its alright ', " i got you ", " i've got you ", ' i am here ', " i'm here ", ' here for you ', ' with you ', ' right here ', " you are safe ", " you're safe ", " you're fine ", " you're alright "], scenario: 'Record that reassurance reduced tension in the scene.', personality: 'Mark tone as softened to provide comfort.' },
      { cue: 'closeness', phrases: [' need a hug ', ' give me a hug ', ' hug me ', ' hold me ', ' hold onto me ', ' stay close ', ' stay with me ', ' keep me close ', ' keep close ', ' be near me '], scenario: 'Record that a request for closeness was made as a consented intimacy cue.', personality: 'Mark tone as attentive and present-focused.' },
      { cue: 'affectionate language / pet names', keywords: ['sweetheart', 'sweetie', 'baby', 'babe', 'honey', 'hon', 'love', 'lover', 'darling', 'dear', 'cutie', 'handsome', 'beautiful', 'gorgeous', 'angel'], scenario: 'Record that an affectionate nickname was used.', personality: 'Mark tone as warm and intimate.' },
      { cue: 'expressing love / fondness', phrases: [' i love you ', ' love ya ', ' love you so much ', ' so much love ', ' adore you ', ' i adore you ', ' i really like you ', ' i like you a lot ', ' i care about you ', ' care for you '], scenario: 'Record that love or fondness was explicitly expressed.', personality: 'Mark tone as deeply affectionate.' },
      { cue: 'concern / check-in', phrases: [' are you okay ', ' are you ok ', ' you okay ', ' you ok ', ' how are you ', ' how are you feeling ', ' feeling alright ', ' are you hurt ', ' are you injured ', ' are you in pain ', ' are you alright '], scenario: 'Record that concern for well-being was expressed.', personality: 'Mark tone as caring and protective.' },
      { cue: 'inviting closeness', phrases: [' come here ', ' come closer ', ' get over here ', ' lean on me ', ' lean against me ', ' allow me to hold you ', ' allow me to hug you ', ' stay with me ', ' be with me '], scenario: 'Record that an invitation to physical closeness was given.', personality: 'Mark tone as open and inviting.' }
    ]
  };

  var PACK_SOCIAL = {
    limit: 1,
    rules: [
      { cue: 'apology', keywords: ['sorry', 'apologize', 'apologise', 'apologies'], phrases: [" i'm sorry ", ' i am sorry ', ' so sorry ', ' truly sorry ', ' my bad ', ' my fault ', ' i messed up ', ' that was on me ', ' i fucked up '], scenario: 'Record that an apology was made in the scene.', personality: 'Mark tone as remorseful or seeking forgiveness.' },
      { cue: 'gratitude', keywords: ['thank', 'thanks', 'appreciate', 'cheers', 'thx', 'ty'], phrases: [' thank you ', ' thanks a lot ', ' thanks so much ', ' much appreciated ', ' appreciate it ', ' appreciate you '], scenario: 'Record that gratitude was expressed in the scene.', personality: 'Mark tone as appreciative and positive.' },
      { cue: 'praise', phrases: [' proud of you ', ' good job ', ' great job ', ' nice job ', ' well done ', ' nice work ', ' amazing work ', ' you did great ', ' you did so well ', " i'm proud of you "], scenario: 'Record that praise was expressed in the scene.', personality: 'Mark tone as affirming and supportive.' },
      { cue: 'encouragement', phrases: [' you can do this ', ' you can do it ', " you got this ", " you've got this ", ' i believe in you ', ' keep going ', " don't give up ", ' you can make it ', ' one step at a time '], scenario: 'Record that encouragement was given in the scene.', personality: 'Mark tone as motivating and confidence-building.' },
      { cue: 'help request', phrases: [' can you help ', ' can you please ', ' could you please ', ' help me ', ' i need help ', ' i need a hand ', ' would you mind ', ' i need support '], scenario: 'Record that a request for assistance was made.', personality: 'Mark tone as seeking support or cooperation.' },
      { cue: 'assurance / promise', phrases: [' i promise ', ' i swear ', ' trust me ', ' i give you my word ', " i will not fail you ", " i'll be there ", " i'm not going anywhere "], scenario: 'Record that a promise or assurance was given.', personality: 'Mark tone as committed and intent on trust.' },
      { cue: 'agreement / alignment', keywords: ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'absolutely', 'definitely', 'exactly', 'affirmative'], phrases: [' of course ', ' makes sense ', ' sounds good ', ' all right ', ' alright ', " you're right "], scenario: 'Record that alignment or agreement was expressed.', personality: 'Mark tone as cooperative and affirming.' },
      { cue: 'disagreement / correction', keywords: ['no', 'nope', 'nah', 'incorrect', 'wrong'], phrases: [" don't think so ", ' not really ', " that's not right ", " you're wrong ", ' i disagree ', " i don't agree "], scenario: 'Record that disagreement or correction was expressed.', personality: 'Mark tone as assertive or resistant.' },
      { cue: 'compliments / affectionate praise', keywords: ['beautiful', 'handsome', 'pretty', 'cute', 'smart', 'brilliant', 'amazing', 'wonderful', 'awesome', 'talented', 'gorgeous', 'sexy', 'hot'], phrases: [" you're cute ", " you're beautiful ", ' you look great ', ' you look nice ', ' you look amazing ', ' you look pretty '], scenario: 'Record that a compliment or affectionate praise was given.', personality: 'Mark tone as admiring or affectionate.' },
      { cue: 'politeness / formalities', keywords: ['please', 'pardon', 'excuse'], phrases: [' excuse me ', ' pardon me ', ' please ', ' may i ', ' could i ', ' would you kindly ', " if you don't mind "], scenario: 'Record that politeness or formality was used.', personality: 'Mark tone as respectful and courteous.' }
    ]
  };

  var PACKS = [PACK_ACTIONS, PACK_AFFECTION, PACK_SOCIAL];
  var p, r;
  for (p = 0; p < PACKS.length; p++) {
    var pack = PACKS[p];
    var rules = (pack && pack.rules) ? pack.rules : null;
    var limit = (pack && pack.limit) ? pack.limit : 1;
    var used = 0;
    if (!rules || rules.length < 1) { continue; }
    if (QUIET && pack === PACK_ACTIONS) { continue; }
    for (r = 0; r < rules.length; r++) {
      if (used >= limit) { break; }
      var rule = rules[r];
      if (!rule) { continue; }
      var tok = firstHitToken(msgCanon, rule);
      if (tok) {
        var scen = linkScenario(rule.cue, tok, rule.scenario || '');
        var pers = linkPersonality(rule.cue, tok, rule.personality || '');
        if (pers || scen) {
          append(pers, scen);
          used++;
        }
      }
    }
  }
})();

/* ==========================================================================
   MODULE: Likes, Dislikes, and Fears
   Source migrated from template/engine/Likes_Dislikes_Fears_Engine.js
   ========================================================================== */

(function runPreferenceRegistry() {
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

  function extractAfter(bufCanon, trigger) {
    var t = canon(trigger);
    if (!t) { return ''; }
    var pos = bufCanon.indexOf(' ' + t + ' ');
    if (pos === -1) { return ''; }
    var start = pos + (' ' + t + ' ').length;
    var tail = bufCanon.substr(start);
    var STOPS = [' but ', ' and ', ' because ', ' though ', ' however ', ' unless ', ' except ', ' if ', ' when ', ' while ', ' then ', ' so ', ' also ', ' i ', ' you ', ' we ', ' they ', ' he ', ' she '];
    var i, stopPos = -1;
    for (i = 0; i < STOPS.length; i++) {
      var sp = tail.indexOf(STOPS[i]);
      if (sp !== -1 && (stopPos === -1 || sp < stopPos)) { stopPos = sp; }
    }
    if (stopPos !== -1) { tail = tail.substr(0, stopPos); }
    var words = tail.split(' ');
    var out = '', count = 0, j;
    for (j = 0; j < words.length; j++) {
      var w = words[j];
      if (!w) { continue; }
      out = out ? (out + ' ' + w) : w;
      count++;
      if (count >= 4) { break; }
    }
    out = String(out || '').trim();
    if (out === '' || out === 'it' || out === 'that' || out === 'this') { return ''; }
    return out;
  }

  var PACK_LIKES = {
    type: 'likes',
    limit: 1,
    rules: [
      { cue: 'stated like', phrases: [' i like ', ' i really like ', ' i love ', ' i enjoy ', ' i adore ', ' i prefer ', ' big fan of ', ' huge fan of ', ' i am into ', ' i m into ', ' i dig '], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record LIKE: ' + target + '.'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as acknowledging a stated like for '" + target + "'."; } },
      { cue: 'favorite item', phrases: [' my favorite is ', ' my favourite is ', ' favorite is ', ' favourite is ', ' my favorite ', ' my favourite ', ' favorite: ', ' favourite: '], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record LIKE: ' + target + '.'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as acknowledging a favorite: '" + target + "'."; } },
      { cue: 'enthusiastic like', phrases: [' i m all about ', ' i am all about ', ' i live for ', " can t get enough of ", ' obsessed with ', ' down for ', ' i could go for ', ' crave ', ' craving '], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record LIKE: ' + target + '.'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as acknowledging strong enthusiasm for '" + target + "'."; } },
      { cue: 'comparative preference', phrases: [' i d rather have ', ' i would rather have ', ' i d rather ', ' i would rather ', ' prefer ', ' prefer over '], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record LIKE: ' + target + ' (comparative).'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as respecting comparative preference for '" + target + "'."; } }
    ]
  };

  var PACK_DISLIKES = {
    type: 'dislikes',
    limit: 1,
    rules: [
      { cue: 'stated dislike', phrases: [' i dislike ', ' i hate ', ' i detest ', " i can t stand ", " i don t like ", ' not a fan of ', " i don't care for ", ' i really don t like ', ' i strongly dislike '], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record DISLIKE: ' + target + '.'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as avoiding a stated dislike for '" + target + "'."; } },
      { cue: 'refusal / pass', phrases: [' no thanks to ', ' hard pass on ', ' hard pass ', " i ll pass on ", ' i will pass on ', " i d rather not ", ' i would rather not ', ' prefer not to ', ' rather not '], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record DISLIKE: ' + target + ' (refusal).'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as steering away from '" + target + "'."; } },
      { cue: 'aversion / disgust', phrases: [' not into ', ' turns me off ', ' grosses me out ', ' grossed out by ', ' makes me sick ', ' makes me nauseous ', ' yuck ', ' ugh '], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record DISLIKE: ' + target + ' (aversion).'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as avoiding aversive trigger '" + target + "'."; } },
      { cue: 'avoidance', phrases: [' i avoid ', ' i try to avoid ', ' i steer clear of ', ' i keep away from '], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record DISLIKE: ' + target + ' (avoid).'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as honoring avoidance of '" + target + "'."; } }
    ]
  };

  var PACK_FEARS = {
    type: 'fears',
    limit: 1,
    rules: [
      { cue: 'stated fear', phrases: [' i am afraid of ', " i m afraid of ", ' afraid of ', ' scared of ', ' fear of ', ' i fear ', ' i have a phobia of ', ' phobia of '], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record FEAR: ' + target + '.'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as cautious and supportive toward fear of '" + target + "'."; } },
      { cue: 'intense fear', phrases: [' terrified of ', " i m terrified of ", ' petrified of ', " i m petrified of ", " it freaks me out ", ' freaked out by ', ' it scares me ', ' scares me ', ' my worst fear is '], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record FEAR: ' + target + ' (intense).'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as protective around intense fear of '" + target + "'."; } },
      { cue: 'anxiety about', phrases: [' i have anxiety about ', " i m anxious about ", ' i worry about ', ' makes me anxious ', ' makes me nervous ', ' i get nervous around ', ' i panic when ', " i can t handle "], scenario: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return 'Record FEAR: ' + target + ' (anxiety).'; }, personality: function (tok) { var target = extractAfter(msgCanon, tok) || 'unspecified'; return "Mark tone as calming and supportive around '" + target + "'."; } }
    ]
  };

  var PACKS = [PACK_LIKES, PACK_DISLIKES, PACK_FEARS];
  var p, r;
  for (p = 0; p < PACKS.length; p++) {
    var pack = PACKS[p];
    var rules = (pack && pack.rules) ? pack.rules : null;
    var limit = (pack && pack.limit) ? pack.limit : 1;
    var used = 0;
    if (!rules || rules.length < 1) { continue; }
    for (r = 0; r < rules.length; r++) {
      if (used >= limit) { break; }
      var rule = rules[r];
      if (!rule) { continue; }
      var tok = firstHitToken(msgCanon, rule);
      if (tok) {
        var scenBase = (typeof rule.scenario === 'function') ? rule.scenario(tok) : (rule.scenario || '');
        var persBase = (typeof rule.personality === 'function') ? rule.personality(tok) : (rule.personality || '');
        var scen = linkScenario(rule.cue, tok, scenBase);
        var pers = linkPersonality(rule.cue, tok, persBase);
        if (pers || scen) {
          append(pers, scen);
          used++;
        }
      }
    }
  }
})();

/* ==========================================================================
   MODULE: Emotion Style Engine
   Source migrated from legacy scene orchestration logic before centralization.
   ========================================================================== */

(function runEmotionEngine() {
  context.character = context.character || {};
  context.character.personality = context.character.personality || '';
  context.character.scenario = context.character.scenario || '';

  var emotionStyles = [
    { category: 'Sarcastic', keywords: ['yeah right', 'as if', 'just what i needed', 'thanks for nothing', 'what a surprise', 'how fun', 'a million', 'dying laughing', 'worst day ever', 'haha', 'lmao', 'lol', "that's hilarious", 'joking', 'just joking', 'call that a joke', 'rich coming from you', 'such a joke', 'supposed to be funny', 'think you are so funny', 'not buying it', 'you gotta be kidding', 'could care less', 'is this a joke', 'boss'], personality: 'sarcastic, playful or biting', scenario: 'A wry smile appears.', priority: 6 },
    { category: 'Joyful', keywords: ['happy', 'joy', 'excited', 'amazing', 'great', 'wonderful', 'fantastic', 'awesome', 'terrific', 'delighted', 'elated', 'thrilled', 'yay', 'hooray', 'ecstatic', 'overjoyed', "couldn't be happier", 'hilarious', "i'm delighted", 'so happy', 'make me smile', 'best day ever', 'how lucky', 'lucky', 'on cloud nine'], personality: 'joyful, upbeat and cheerful', scenario: 'The air feels brighter.', priority: 4 },
    { category: 'Sad', keywords: ['sad', 'unhappy', 'terrible', 'awful', 'cry', 'depress', 'miserable', 'sorry', 'upset', 'lonely', 'heartbroken', 'grief', 'distraught', 'tear', 'blue', 'downcast', 'hopeless', 'disappointed', 'alone', 'empty', 'numb', 'tapped out', 'burnt out', 'burned out', 'running on empty', 'out of energy', 'checked out', 'emotionally done', 'just done', 'done with', 'at my limit', 'end of my rope', 'last nerve', 'last legs', 'just existing', 'just surviving', 'going through the motions', 'no motivation', 'no energy', 'nothing left', 'hard reset', 'battery', 'need to unplug', 'need to recharge', "can't anymore", "can't do this", 'not functioning', 'not really functioning', 'hollow', 'zombie', 'not here', 'not really here', 'not present', 'spaced out', 'drifting', 'fading', 'clocked out', 'over it', 'wiped', 'tired', "don't care anymore", 'phoning it in', 'just a shell', 'just a body', 'low power mode', 'sleep mode', 'hibernation mode', 'blur', 'grey', 'not up for', 'not in the mood', 'just want to', 'want to be invisible', 'fade out', 'fade away', 'allow me to be', 'leave me be', 'allow me to rest', 'allow me to zone out', 'log off', 'check out', 'be done', 'done here', 'emotionless', 'nothing phases', 'nothing matters', 'meh', 'whatever', 'all the same', 'indifferent', 'no opinion', "can't be bothered", 'unbothered', 'numb to', 'it is what it is', 'wish i could disappear', 'like a ghost', 'fading away', 'heart is broken', 'feel invisible', 'feel like a burden', 'just a mess', 'not okay', 'sinking', 'not in a good place', "i'm spent", "i'm not feeling myself", 'trying to survive', "i'm done", 'feeling empty', "just don't have it in me", 'disappear for a bit', 'just want to fade', 'curl up and disappear', 'not exist', 'still inside', 'rest my brain', 'ghost', 'background character', 'non-player character', 'wallflower', 'blob', 'shadow'], personality: 'sad, somber and sympathetic', scenario: 'A quiet, melancholic atmosphere.', priority: 4 },
    { category: 'Angry', keywords: ['angry', 'mad', 'furious', 'rage', 'annoyed', 'frustrated', 'hate', 'infuriated', 'irritated', 'resentful', 'outraged', 'enraged', 'irate', 'cross', "can't stand", 'makes me angry', 'absolutely furious', 'so angry', 'very angry', 'really angry', 'super angry', "can't take this anymore", "can't do this anymore", "can't handle this", 'getting ridiculous', 'handle this anymore'], personality: 'angry, tense and agitated', scenario: 'The air crackles with tension.', priority: 4 },
    { category: 'Surprised', keywords: ['wow', 'oh my god', 'surprise', 'unexpected', 'no way', 'shocked', 'astonished', 'unbelievable', 'gasp', 'startled', 'stunned', 'amazed', "can't believe", 'nothing surprises', 'lovely surprise', 'is this real life', 'unbelievable', 'not surprised'], personality: 'surprised, shocked and amazed', scenario: 'A sharp pause catches the room off guard.', priority: 5 },
    { category: 'Fearful', keywords: ['scared', 'afraid', 'fear', 'terrified', 'panic', 'worried', 'anxious', 'nervous', 'dread', 'horrified', 'petrified', 'unsafe', 'threat', 'danger', 'dangerous', 'freaked out', 'freaking out', 'paranoid', 'uneasy', 'on edge', 'can not relax', 'cannot relax', 'tense', 'shaken', 'shaky', 'heart racing', 'panic attack', 'overwhelmed', 'too much', 'can not breathe', 'cannot breathe'], personality: 'fearful, anxious and cautious', scenario: 'The air tightens with fear.', priority: 3 },
    { category: 'Suspicious', keywords: ['suspicious', 'suspicion', 'doubt', 'doubtful', 'sketchy', 'shady', 'untrustworthy', 'something is wrong', 'something feels off', 'fishy', 'weird', 'strange', 'odd', 'not buying it', 'not convinced', 'too convenient', 'too good to be true', 'what are you hiding', 'what is going on', 'why are you', 'why did you', 'explain', 'prove it', 'show me'], personality: 'suspicious, guarded and analytical', scenario: 'A wary edge enters the room.', priority: 5 },
    { category: 'Flustered', keywords: ['blush', 'flustered', 'stammer', 'stutter', 'nervous laugh', 'nervously', 'awkward', 'embarrassed', 'shy', 'cute', 'caught off guard', 'speechless', 'at a loss', 'tongue tied', 'tongue-tied', 'warm cheeks', 'turns red', 'face goes red', 'cheeks warm', 'heart skips', 'heart skipped'], personality: 'flustered, shy and affectionately awkward', scenario: 'A blush rises despite the attempt to hide it.', priority: 4 },
    { category: 'Curious', keywords: ['curious', 'wonder', 'question', 'why', 'how', 'what if', 'tell me', 'explain', 'interesting', 'fascinating', 'intriguing', 'mysterious', 'mystery', 'investigate', 'inspect', 'check', 'look into', 'learn more', 'dig into', 'figure out', 'puzzle', 'riddle', 'clue'], personality: 'curious, investigative and focused', scenario: 'A thoughtful question hangs in the air.', priority: 5 },
    { category: 'Protective', keywords: ['protect', 'protective', 'defend', 'shield', 'safe', 'safety', 'watch out', 'look out', 'behind you', 'careful', 'care', 'take care', 'i will protect', 'i will keep', 'i will not allow', 'hold on', 'stay behind me', 'not alone', 'with you'], personality: 'protective, steady and watchful', scenario: 'A protective instinct sharpens.', priority: 3 },
    { category: 'Nervous', keywords: ['nervous', 'jittery', 'uneasy', 'fidget', 'fidgeting', 'biting nails', 'can not sit still', 'cannot sit still', 'restless', 'worrying', 'worried', 'anxious', 'on edge', 'butterflies', 'butterflies in my stomach', 'what if', 'maybe i should', 'i am not sure', "i'm not sure", 'i do not know', "i don't know"], personality: 'nervous, uncertain and tentative', scenario: 'A nervous edge makes small gestures sharper.', priority: 4 },
    { category: 'Tired', keywords: ['tired', 'exhausted', 'sleepy', 'yawn', 'yawning', 'fatigued', 'worn out', 'drained', 'wiped out', 'running on empty', 'out of energy', 'need sleep', 'need rest', 'too tired', 'so tired', 'burnt out', 'burned out', 'low power', 'battery', 'can barely keep', 'can not keep', 'cannot keep', 'heavy eyelids'], personality: 'tired, low-energy and slow', scenario: 'Fatigue softens the edges of the scene.', priority: 4 },
    { category: 'Neutral', keywords: ['neutral', 'calm', 'steady', 'quiet', 'normal', 'fine', 'okay', 'ok', 'alright', 'all right', 'regular', 'baseline'], personality: 'neutral, calm and steady', scenario: 'The mood settles into a neutral baseline.', priority: 10 }
  ];

  var negationMap = {
    Sarcastic: ['not sarcastic', 'not snarky', 'not joking', 'no sarcasm', 'not a joke'],
    Joyful: ['not happy', 'not joyful', 'not excited', 'not funny', 'no joy', 'not amusing'],
    Sad: ['not sad', 'not unhappy', 'not crying', 'not depressed', 'not miserable', 'not lonely'],
    Angry: ['not angry', 'not mad', 'not furious', 'not annoyed', 'not frustrated', 'not upset'],
    Surprised: ['not surprised', 'not shocked', 'not unexpected', 'not stunned', 'not amazed'],
    Fearful: ['not scared', 'not afraid', 'not fearful', 'not anxious', 'not nervous', 'not worried'],
    Suspicious: ['not suspicious', 'not doubtful', 'not sketchy', 'not shady', 'not suspicious'],
    Flustered: ['not flustered', 'not embarrassed', 'not shy', 'not awkward'],
    Curious: ['not curious', 'not interested', 'not wondering'],
    Protective: ['not protective', 'not worried', 'not guarding'],
    Nervous: ['not nervous', 'not anxious', 'not jittery'],
    Tired: ['not tired', 'not sleepy', 'not exhausted']
  };

  var antonymMap = {
    Sarcastic: ['sincere', 'genuine', 'earnest', 'serious'],
    Joyful: ['sad', 'unhappy', 'miserable', 'depressed'],
    Sad: ['happy', 'joyful', 'excited', 'cheerful'],
    Angry: ['calm', 'peaceful', 'relaxed', 'serene'],
    Surprised: ['expected', 'ordinary', 'predictable', 'routine'],
    Fearful: ['brave', 'bold', 'confident', 'fearless'],
    Suspicious: ['trusting', 'open', 'convinced', 'assured'],
    Flustered: ['composed', 'calm', 'collected', 'steady'],
    Curious: ['indifferent', 'bored', 'uninterested', 'apathetic'],
    Protective: ['careless', 'indifferent', 'reckless'],
    Nervous: ['calm', 'composed', 'confident', 'steady'],
    Tired: ['energetic', 'refreshed', 'awake', 'rested']
  };

  function normalizeInput() {
    var raw = String((context.chat && context.chat.last_message) || '');
    return ' ' + raw.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  }

  function append(personality, scenario) {
    if (personality) { context.character.personality += '\n\n' + personality; }
    if (scenario) { context.character.scenario += '\n\n' + scenario; }
  }

  function matchStyle(bufCanon) {
    var matches = [];
    var i, style, j, key;
    for (i = 0; i < emotionStyles.length; i += 1) {
      style = emotionStyles[i];
      for (j = 0; j < style.keywords.length; j += 1) {
        key = ' ' + style.keywords[j] + ' ';
        if (bufCanon.indexOf(key) !== -1) {
          matches.push(style);
          break;
        }
      }
    }
    matches.sort(function (a, b) { return a.priority - b.priority; });
    return matches;
  }

  function hasAntonym(bufCanon, category) {
    var list = antonymMap[category] || [];
    var i;
    for (i = 0; i < list.length; i += 1) {
      if (bufCanon.indexOf(' ' + list[i] + ' ') !== -1) { return true; }
    }
    return false;
  }

  function findAntonym(style, bufCanon) {
    var category = style.category;
    var list = negationMap[category] || [];
    var i;
    for (i = 0; i < list.length; i += 1) {
      if (bufCanon.indexOf(' ' + list[i] + ' ') !== -1) { return list[i]; }
    }
    if (hasAntonym(bufCanon, category)) { return 'opposite cue'; }
    return '';
  }

  var msgCanon = normalizeInput();
  var matches = matchStyle(msgCanon);
  var top3 = [];
  var i, style, neg;

  for (i = 0; i < matches.length; i += 1) {
    style = matches[i];
    neg = findAntonym(style, msgCanon);
    if (!neg && top3.length < 3) { top3.push(style); }
  }

  if (!top3.length) {
    top3.push(emotionStyles[emotionStyles.length - 1]);
  }

  var personalityBlock = 'Runtime Emotion Style: ';
  var scenarioBlock = 'Runtime Emotion Atmosphere: ';
  for (i = 0; i < top3.length; i += 1) {
    personalityBlock += top3[i].personality + '; ';
    scenarioBlock += top3[i].scenario + ' ';
  }

  append(personalityBlock, scenarioBlock);
})();

/* ==========================================================================
   MODULE: Random Encounter
   Source migrated from template/engine/Random_Encounter.js
   ========================================================================== */

(function runRandomEncounter() {
  context.character = context.character || {};
  context.character.personality = context.character.personality || '';
  context.character.scenario = context.character.scenario || '';

  var ENCOUNTER_RATE = 0.1;
  var APPLY_LIMIT = 1;
  var ENCOUNTER_CHOICES = [
    { weight: 3, personality: 'She shoots you a look over the pile of laundry and smirks. "If you fold mine, I will supervise."', scenario: 'A soft heap of tees and casual clothes blooms over the back of the couch; she pretends not to see it.' },
    { weight: 3, personality: 'She leans on the counter with a lazy grin. "We could do the dishes, or we could not."', scenario: 'The sink glints with suspiciously artful stacks of plates that definitely did not wash themselves.' },
    { weight: 2, personality: 'She taps your phone screen with a painted nail. "Rent is due. Pay me in compliments first."', scenario: 'A notification pings; she lounges on the sofa, legs tucked, acting like the landlord of vibes.' }
  ];

  if (Math.random() > ENCOUNTER_RATE) { return; }

  var sum = 0;
  var i;
  var w;
  for (i = 0; i < ENCOUNTER_CHOICES.length; i += 1) {
    w = ENCOUNTER_CHOICES[i] && ENCOUNTER_CHOICES[i].weight;
    if (typeof w !== 'number' || w <= 0) { continue; }
    sum += w;
  }
  if (sum <= 0) { return; }

  var r = Math.random() * sum;
  var acc = 0;
  var pick = -1;
  for (i = 0; i < ENCOUNTER_CHOICES.length; i += 1) {
    w = ENCOUNTER_CHOICES[i] && ENCOUNTER_CHOICES[i].weight;
    if (typeof w !== 'number' || w <= 0) { continue; }
    acc += w;
    if (r <= acc) { pick = i; break; }
  }
  if (pick < 0) { return; }

  var c = ENCOUNTER_CHOICES[pick];
  if (!c) { return; }
  if (APPLY_LIMIT > 0) {
    if (c.personality) { context.character.personality += '\n\n' + c.personality; }
    if (c.scenario) { context.character.scenario += '\n\n' + c.scenario; }
  }
})();

/* ==========================================================================
   MODULE: Basic Weighted Random Events
   Source migrated from template/engine/Basic_Weighted_Random_Events.js
   ========================================================================== */

(function runWeightedRandomEvents() {
  context.character = context.character || {};
  context.character.scenario = context.character.scenario || '';

  function encLog(message) {
    if (typeof console !== 'undefined' && console.log) { console.log(message); }
  }

  var lastMessage = String((context.chat && context.chat.last_message) || '').toLowerCase();
  var eventPrompts = ['wildfire', 'tornado', 'sandstorm', 'blizzard', 'tsunami'];
  var eventWeights = [0.5, 2, 1, 1.5, 0.2];
  var eventDescriptions = {
    wildfire: ', a wildfire begins across the horizon',
    tornado: ', a tornado begins across the horizon',
    sandstorm: ', a sandstorm begins across the horizon',
    blizzard: ', a blizzard begins across the horizon',
    tsunami: ', a tsunami can be seen in the distance'
  };
  var eventChance = 0.1;
  var i;
  var triggeredEvent = 'n/a';
  var eventToFire;

  if (lastMessage.indexOf('arc.testrandom') !== -1) {
    eventChance = 0.9999999;
  }

  function weightedRandomChoice(items, weights) {
    var totalWeight = 0;
    var r;
    var j;
    for (j = 0; j < weights.length; j += 1) {
      totalWeight += weights[j];
    }
    r = Math.random() * totalWeight;
    for (j = 0; j < items.length; j += 1) {
      if (r < weights[j]) { return items[j]; }
      r -= weights[j];
    }
    return 'n/a';
  }

  var chosenEvent = 'n/a';
  if (Math.random() < eventChance) {
    chosenEvent = weightedRandomChoice(eventPrompts, eventWeights);
  }

  for (i = 0; i < eventPrompts.length; i += 1) {
    if (lastMessage.indexOf(eventPrompts[i]) !== -1 && lastMessage.indexOf('arc.force_event') !== -1) {
      triggeredEvent = eventPrompts[i];
      break;
    }
  }

  eventToFire = triggeredEvent !== 'n/a' ? triggeredEvent : chosenEvent;
  if (eventToFire && eventDescriptions[eventToFire]) {
    context.character.scenario += '\n' + eventDescriptions[eventToFire] + '\n';
    encLog('-:{Probability Script}:-');
    encLog('Random Event Chosen: ' + chosenEvent);
    encLog('Event Added: ' + eventToFire);
    encLog('Code Added: ' + eventDescriptions[eventToFire]);
    encLog('-|:|:|:|:|:|:|:|:|:|:|:-');
  }
})();

/* ==========================================================================
   MODULE: General Debugging
   Source migrated from template/engine/General_Debugging.js
   ========================================================================== */

(function runGeneralDebugging() {
  context.character = context.character || {};
  context.character.personality = context.character.personality || '';
  context.character.scenario = context.character.scenario || '';
  if (typeof context.character.example_dialogs !== 'string') {
    context.character.example_dialogs = '';
  }

  function encLog(message) {
    if (typeof console !== 'undefined' && console.log) { console.log(message); }
  }

  var lastMessage = String((context.chat && context.chat.last_message) || '').toLowerCase();
  var messageCount = (context.chat && context.chat.message_count) || 0;

  if (lastMessage.indexOf('arc.debug') !== -1) {
    encLog('Current Message Count: ' + messageCount);
    encLog('Confirming Current Personality: ' + context.character.personality);
    encLog('Confirming Current Scenario: ' + context.character.scenario);
    encLog('Confirming Current Example Dialog: ' + context.character.example_dialogs);
    encLog('Date of Last Bot Message: ' + ((context.chat && context.chat.last_bot_message_date) || ''));
    context.character.personality += '\n\nGeneral Debugging: arc.debug detected. Message Count: ' + messageCount + '. Last bot message date: ' + ((context.chat && context.chat.last_bot_message_date) || '') + '.';
  }
})();

/* ==========================================================================
   RUNTIME SEQUENCE
   ========================================================================== */

ENCore.rawMessage = encGetMessage();
ENCore.normalizedMessage = encNormalize(ENCore.rawMessage);
encInitState();
encApplyRuntimeCommands();
encApplyRelationshipTriggers();
encApplySafetyBoundary();
encInjectPunctuationDirective();
encInjectPovOverride();
encAppend(encRelationshipDirective(), '');
encPersistState();
encSanitizeRuntimeFields();