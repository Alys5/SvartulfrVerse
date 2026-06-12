/* ============================================================================
   Advanced Lorebook Runtime - Family Layer
   SvartulfrVerse | F_ Lorebook Template | ES6-safe JanitorAI sandbox
   Target: JanitorAI Advanced Script

   Purpose:
   - Family layer runtime template for F_ lorebook entries.
   - Keeps genealogy, surname, adoption, marriage, and inheritance facts sourced.
   - Does not invent family authority or override Character Authority.
   - Compatible with En_Core output contract.
   ========================================================================== */

context.character = context.character || {};

if (typeof context.character.personality !== 'string') { context.character.personality = ''; }
if (typeof context.character.scenario !== 'string') { context.character.scenario = ''; }

var LOREBOOK_CONFIG = {
  type: 'family',
  prefix: 'F_',
  stateKey: 'family_lorebook_applied',
  maxEntries: 4,
  alwaysOn: false,
  seed: 42
};

var dynamicLore = [
  {
    id: 'F_authority_boundary',
    priority: 5,
    keywords: ['family', 'douglas bloodmoon', 'douglas-bloodmoon', 'bloodmoon', 'genealogy', 'lineage', 'surname', 'inheritance'],
    personality: 'Family Authority: state only sourced F_ family facts and do not invent bloodlines, marriages, adoptions, or inheritance claims.',
    scenario: 'Record Family Authority boundary for F_ entries.'
  },
  {
    id: 'F_dynastic_state',
    priority: 5,
    keywords: ['dynasty', 'dynastic', 'dynastic adoption', 'adoption', 'adoptive', 'adopted'],
    triggers: ['F_dynastic_state'],
    personality: 'Family state hook: dynastic status, surname use, and inheritance claims require Family Authority validation before runtime acceptance.',
    scenario: 'Record dynastic state as pending Family Authority validation.'
  },
  {
    id: 'F_surname_boundary',
    priority: 4,
    keywords: ['surname', 'last name', 'family name', 'douglas', 'bloodmoon', 'name change'],
    personality: 'Surname boundary: do not change a character surname in runtime unless sourced family authority or an explicit Experience state allows it.',
    scenario: 'Record surname query as Family Authority validation content.'
  },
  {
    id: 'F_genealogy_query',
    priority: 3,
    keywords: ['parent', 'mother', 'father', 'sibling', 'brother', 'sister', 'child', 'children', 'relative', 'cousin'],
    personality: 'Genealogy boundary: family relationships must remain traceable to the active F_ source record.',
    scenario: 'Record family relationship query without inventing missing parentage or siblings.'
  },
  {
    id: 'F_marriage_boundary',
    priority: 3,
    keywords: ['marriage', 'married', 'spouse', 'husband', 'wife', 'divorce', 'divorced'],
    personality: 'Marriage boundary: marital status is Family Authority content and must not be inferred from scene tone alone.',
    scenario: 'Record marriage or divorce cue as sourced family context only.'
  }
];

var LBR = {
  runtimeFlags: null
};

function lbString(value) { return value == null ? '' : String(value); }
function lbNormalize(value) { var s = lbString(value).toLowerCase().replace(/[^a-z0-9\s'-]/g, ' '); s = s.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); return ' ' + s + ' '; }
function lbSanitize(value) { if (typeof value !== 'string') { return value; } var out = value.replace(/[\u2014\u2013]/g, '...'); out = out.replace(/\.\.\.\.\.\./g, '...'); out = out.replace(/  +/g, ' '); return out; }
function lbEnsurePeriod(value) { var s = lbString(value).replace(/\s+$/g, ''); if (!s) { return ''; } var c = s.charAt(s.length - 1); return (c === '.' || c === '!' || c === '?') ? s : (s + '.'); }
function lbAppend(personality, scenario) { if (personality) { context.character.personality += '\n\n' + lbEnsurePeriod(personality); } if (scenario) { context.character.scenario += '\n\n' + lbEnsurePeriod(scenario); } }
function lbGetStateMarker() { var match = context.character.scenario.match(/SVLB_FAMILY_STATE=([^;\n]+)/); return match ? match[1] : ''; }
function lbParseFlags() { var marker = lbGetStateMarker(); var flags = {}; if (!marker) { return flags; } var parts = marker.split('|'); var i; for (i = 0; i < parts.length; i += 1) { if (parts[i]) { flags[parts[i]] = '1'; } } return flags; }
function lbRenderFlags(flags) { var keys = []; var k; for (k in flags) { if (Object.prototype.hasOwnProperty.call(flags, k)) { keys.push(k); } } return keys.join('|'); }
function lbHasFlag(key) { return !!lbParseFlags()[key]; }
function lbSetFlag(key) { var flags = lbParseFlags(); if (flags[key]) { return; } flags[key] = '1'; LBR.runtimeFlags = flags; context.character.scenario += '\n\nSVLB_FAMILY_STATE=' + lbRenderFlags(flags) + '.'; }
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