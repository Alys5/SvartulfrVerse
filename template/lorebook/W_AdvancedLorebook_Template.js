/* ============================================================================
   Advanced Lorebook Runtime - World Layer
   SvartulfrVerse | W_ Lorebook Template | ES5
   Target: JanitorAI Advanced Script

   Purpose:
   - World layer runtime template for W_ lorebook entries.
   - Keeps world facts, locations, culture, and visual context separate from character casting.
   - Uses priority, blocks, requires, shifts, probability, and limits.
   - Compatible with En_Core runtime state.
   ========================================================================== */

context.character = context.character || {};
context.variables = context.variables || {};

if (typeof context.character.personality !== 'string') { context.character.personality = ''; }
if (typeof context.character.scenario !== 'string') { context.character.scenario = ''; }
if (!context.variables.svartulfr_state || typeof context.variables.svartulfr_state !== 'object') {
  context.variables.svartulfr_state = {};
}

var LOREBOOK_CONFIG = {
  type: 'world',
  prefix: 'W_',
  stateKey: 'world_lorebook_applied',
  maxEntries: 4,
  alwaysOn: false,
  seed: 42
};

var dynamicLore = [
  {
    id: 'W_active_canon_boundary',
    priority: 5,
    keywords: ['world', 'setting', 'canon', 'active canon', 'los angeles', 'contemporary'],
    personality: 'World Authority: keep active scene details inside the sourced W_ world layer and do not invent unverified world facts.',
    scenario: 'Record World Authority boundary: Active Canon, contemporary human baseline unless an Experience explicitly opts into a deferred layer.'
  },
  {
    id: 'W_location_home',
    priority: 4,
    keywords: ['home', 'house', 'apartment', 'douglas estate', 'north beverly hills'],
    triggers: ['W_scene_home'],
    personality: 'World framing: home spaces should remain grounded in contemporary domestic details and sourced location cues.',
    scenario: 'Record location as a contemporary home space tied to the active W_ setting.'
  },
  {
    id: 'W_location_city',
    priority: 4,
    keywords: ['los angeles', 'beverly hills', 'hollywood', 'venice beach', 'santa monica', 'downtown'],
    triggers: ['W_scene_city'],
    personality: 'World framing: treat named locations as contemporary SvartulfrVerse places, not fantasy realms.',
    scenario: 'Record named SvartulfrVerse location as Active Canon geography.'
  },
  {
    id: 'W_visual_context',
    priority: 3,
    keywords: ['visual', 'appearance', 'style', 'color palette', 'lighting', 'mood'],
    personality: 'Visual context: keep generated visuals aligned with the active W_ world DNA and sourced character anchors.',
    scenario: 'Record visual context as world framing only, not as new canon.'
  },
  {
    id: 'W_weather_state',
    priority: 2,
    keywords: ['rain', 'storm', 'heat', 'cold', 'fog', 'sunset', 'night'],
    personality: 'World state: weather and time cues should follow the active scene context.',
    scenario: 'Record environmental state for the current W_ scene.'
  }
];

var LBR = {
  state: context.variables.svartulfr_state
};

function lbString(value) { return value == null ? '' : String(value); }
function lbNormalize(value) { var s = lbString(value).toLowerCase().replace(/[^a-z0-9\s'-]/g, ' '); s = s.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); return ' ' + s + ' '; }
function lbSanitize(value) { if (typeof value !== 'string') { return value; } var out = value.replace(/[\u2014\u2013]/g, '...'); out = out.replace(/\.\.\.\.\.\./g, '...'); out = out.replace(/  +/g, ' '); return out; }
function lbEnsurePeriod(value) { var s = lbString(value).replace(/\s+$/g, ''); if (!s) { return ''; } var c = s.charAt(s.length - 1); return (c === '.' || c === '!' || c === '?') ? s : (s + '.'); }
function lbAppend(personality, scenario) { if (personality) { context.character.personality += '\n\n' + lbEnsurePeriod(personality); } if (scenario) { context.character.scenario += '\n\n' + lbEnsurePeriod(scenario); } }
function lbHasFlag(key) { return !!LBR.state.runtime_flags && !!LBR.state.runtime_flags[key]; }
function lbSetFlag(key) { LBR.state.runtime_flags[key] = '1'; }
function lbLastMessage() { if (context.chat && typeof context.chat.last_message === 'string') { return context.chat.last_message; } if (context.chat && typeof context.chat.lastMessage === 'string') { return context.chat.lastMessage; } return ''; }
function lbHasPhrase(bufCanon, rawPhrase) { var phrase = lbNormalize(rawPhrase); return !!phrase && bufCanon.indexOf(phrase) !== -1; }
function lbHasTag(bufCanon, rawTag) { var tag = lbNormalize(rawTag); return !!tag && bufCanon.indexOf(tag) !== -1; }
function lbHasKeyword(entry, bufCanon) { var keywords = entry.keywords || []; var triggers = entry.triggers || []; var i; for (i = 0; i < keywords.length; i += 1) { if (lbHasPhrase(bufCanon, keywords[i])) { return true; } } for (i = 0; i < triggers.length; i += 1) { if (lbHasTag(bufCanon, triggers[i])) { return true; } } return false; }
function lbHasNameBlock(entry, bufCanon) { var blocks = entry.nameBlocks || []; var i; for (i = 0; i < blocks.length; i += 1) { if (lbHasTag(bufCanon, blocks[i])) { return true; } } return false; }
function lbRequires(entry, bufCanon) { var req = entry.requires || []; var mode = entry.requiresMode || 'any'; var i; if (!req.length) { return true; } if (mode === 'all') { for (i = 0; i < req.length; i += 1) { if (!lbHasTag(bufCanon, req[i])) { return false; } } return true; } for (i = 0; i < req.length; i += 1) { if (lbHasTag(bufCanon, req[i])) { return true; } } return false; }
function lbExcludes(entry, bufCanon) { var excludes = entry.excludes || []; var i; for (i = 0; i < excludes.length; i += 1) { if (lbHasPhrase(bufCanon, excludes[i])) { return true; } } return false; }
function lbMatchedCount(entry, bufCanon) { var count = 0; var keywords = entry.keywords || []; var triggers = entry.triggers || []; var i; for (i = 0; i < keywords.length; i += 1) { if (lbHasPhrase(bufCanon, keywords[i])) { count += 1; } } for (i = 0; i < triggers.length; i += 1) { if (lbHasTag(bufCanon, triggers[i])) { count += 1; } } return count; }
function lbEligible(entry, bufCanon) { if (!entry) { return false; } if (lbHasNameBlock(entry, bufCanon)) { return false; } if (lbExcludes(entry, bufCanon)) { return false; } if (!lbRequires(entry, bufCanon)) { return false; } return lbHasKeyword(entry, bufCanon); }
function lbShiftCandidates(entry, bufCanon) { var shifts = entry.shifts || []; var out = []; var i; for (i = 0; i < shifts.length; i += 1) { if (shifts[i] && lbEligible(shifts[i], bufCanon)) { out.push(shifts[i]); } } return out; }
function lbEntryScore(entry, bufCanon) { return (entry.priority || 0) * 1000 + lbMatchedCount(entry, bufCanon); }
function lbSort(a, b, bufCanon) { return lbEntryScore(b, bufCanon) - lbEntryScore(a, bufCanon); }
function lbApplyEntry(entry) { var personality = lbSanitize(entry.personality || ''); var scenario = lbSanitize(entry.scenario || ''); if (personality || scenario) { lbAppend(personality, scenario); } }
function lbRun() { var maxEntries = LOREBOOK_CONFIG.maxEntries || 4; var applied = 0; var raw = lbLastMessage(); var bufCanon = lbNormalize(raw); var candidates = []; var i, entry, shifts, j; if (maxEntries <= 0) { return; } if (LOREBOOK_CONFIG.alwaysOn && lbHasFlag(LOREBOOK_CONFIG.stateKey)) { return; } for (i = 0; i < dynamicLore.length; i += 1) { entry = dynamicLore[i]; if (lbEligible(entry, bufCanon)) { candidates.push(entry); shifts = lbShiftCandidates(entry, bufCanon); for (j = 0; j < shifts.length; j += 1) { candidates.push(shifts[j]); } } } candidates.sort(function (a, b) { return lbSort(a, b, bufCanon); }); for (i = 0; i < candidates.length && applied < maxEntries; i += 1) { entry = candidates[i]; if (typeof entry.probability === 'number' && Math.random() > entry.probability) { continue; } if (typeof entry.chance === 'number' && Math.random() > entry.chance) { continue; } lbApplyEntry(entry); applied += 1; } if (LOREBOOK_CONFIG.alwaysOn) { lbSetFlag(LOREBOOK_CONFIG.stateKey); } }

lbRun();