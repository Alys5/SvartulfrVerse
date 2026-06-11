/* ============================================================================
   Advanced Lorebook Runtime - Clean ES5 Base
   SvartulfrVerse | Lorebook Runtime Template | Engine Compatible
   Target: JanitorAI Advanced Script

   Purpose:
   - Provides a standalone advanced lorebook runtime for derived templates.
   - Supports priority, blocks, requires, shifts, probability, and limits.
   - Uses context.variables.svartulfr_state for safe runtime state.
   - Sanitizes em dash and en dash from all appended runtime text.
   ========================================================================== */

context.character = context.character || {};
context.variables = context.variables || {};

if (typeof context.character.personality !== 'string') { context.character.personality = ''; }
if (typeof context.character.scenario !== 'string') { context.character.scenario = ''; }
if (!context.variables.svartulfr_state || typeof context.variables.svartulfr_state !== 'object') {
  context.variables.svartulfr_state = {};
}

var LOREBOOK_CONFIG = {
  type: 'base',
  prefix: 'X_',
  stateKey: 'advanced_lorebook_base_applied',
  maxEntries: 4,
  alwaysOn: false,
  seed: 42
};

var dynamicLore = [];

var LBR = {
  state: context.variables.svartulfr_state
};

function lbString(value) {
  return value == null ? '' : String(value);
}

function lbTrim(value) {
  return lbString(value).replace(/^\s+|\s+$/g, '');
}

function lbNormalize(value) {
  var s = lbString(value).toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ');
  s = s.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
  return ' ' + s + ' ';
}

function lbSanitize(value) {
  if (typeof value !== 'string') { return value; }
  var out = value.replace(/[\u2014\u2013]/g, '...');
  out = out.replace(/\.\.\.\.\.\./g, '...');
  out = out.replace(/  +/g, ' ');
  return out;
}

function lbEnsurePeriod(value) {
  var s = lbString(value).replace(/\s+$/g, '');
  if (!s) { return ''; }
  var c = s.charAt(s.length - 1);
  return (c === '.' || c === '!' || c === '?') ? s : (s + '.');
}

function lbAppend(personality, scenario) {
  if (personality) { context.character.personality += '\n\n' + lbEnsurePeriod(personality); }
  if (scenario) { context.character.scenario += '\n\n' + lbEnsurePeriod(scenario); }
}

function lbHasFlag(key) {
  return !!LBR.state.runtime_flags && !!LBR.state.runtime_flags[key];
}

function lbSetFlag(key) {
  LBR.state.runtime_flags[key] = '1';
}

function lbLastMessage() {
  if (context.chat && typeof context.chat.last_message === 'string') { return context.chat.last_message; }
  if (context.chat && typeof context.chat.lastMessage === 'string') { return context.chat.lastMessage; }
  return '';
}

function lbHasPhrase(bufCanon, rawPhrase) {
  var phrase = lbNormalize(rawPhrase);
  return !!phrase && bufCanon.indexOf(phrase) !== -1;
}

function lbHasTag(bufCanon, rawTag) {
  var tag = lbNormalize(rawTag);
  return !!tag && bufCanon.indexOf(tag) !== -1;
}

function lbHasKeyword(entry, bufCanon) {
  var keywords = entry.keywords || [];
  var triggers = entry.triggers || [];
  var i;
  for (i = 0; i < keywords.length; i += 1) {
    if (lbHasPhrase(bufCanon, keywords[i])) { return true; }
  }
  for (i = 0; i < triggers.length; i += 1) {
    if (lbHasTag(bufCanon, triggers[i])) { return true; }
  }
  return false;
}

function lbHasBlock(entry, bufCanon) {
  var blocks = entry.blocks || [];
  var i;
  for (i = 0; i < blocks.length; i += 1) {
    if (lbHasTag(bufCanon, blocks[i])) { return true; }
  }
  return false;
}

function lbHasNameBlock(entry, bufCanon) {
  var blocks = entry.nameBlocks || [];
  var i;
  for (i = 0; i < blocks.length; i += 1) {
    if (lbHasTag(bufCanon, blocks[i])) { return true; }
  }
  return false;
}

function lbRequires(entry, bufCanon) {
  var req = entry.requires || [];
  var mode = entry.requiresMode || 'any';
  var i;
  if (!req.length) { return true; }
  if (mode === 'all') {
    for (i = 0; i < req.length; i += 1) {
      if (!lbHasTag(bufCanon, req[i])) { return false; }
    }
    return true;
  }
  for (i = 0; i < req.length; i += 1) {
    if (lbHasTag(bufCanon, req[i])) { return true; }
  }
  return false;
}

function lbExcludes(entry, bufCanon) {
  var blocks = entry.blocks || [];
  var nameBlocks = entry.nameBlocks || [];
  var excludes = entry.excludes || [];
  var i;
  for (i = 0; i < blocks.length; i += 1) {
    if (lbHasTag(bufCanon, blocks[i])) { return true; }
  }
  for (i = 0; i < nameBlocks.length; i += 1) {
    if (lbHasTag(bufCanon, nameBlocks[i])) { return true; }
  }
  for (i = 0; i < excludes.length; i += 1) {
    if (lbHasPhrase(bufCanon, excludes[i])) { return true; }
  }
  return false;
}

function lbMatchedCount(entry, bufCanon) {
  var count = 0;
  var keywords = entry.keywords || [];
  var triggers = entry.triggers || [];
  var i;
  for (i = 0; i < keywords.length; i += 1) {
    if (lbHasPhrase(bufCanon, keywords[i])) { count += 1; }
  }
  for (i = 0; i < triggers.length; i += 1) {
    if (lbHasTag(bufCanon, triggers[i])) { count += 1; }
  }
  return count;
}

function lbEligible(entry, bufCanon) {
  if (!entry) { return false; }
  if (lbHasNameBlock(entry, bufCanon)) { return false; }
  if (lbExcludes(entry, bufCanon)) { return false; }
  if (!lbRequires(entry, bufCanon)) { return false; }
  return lbHasKeyword(entry, bufCanon);
}

function lbShiftCandidates(entry, bufCanon) {
  var shifts = entry.shifts || [];
  var out = [];
  var i;
  for (i = 0; i < shifts.length; i += 1) {
    if (shifts[i] && lbEligible(shifts[i], bufCanon)) { out.push(shifts[i]); }
  }
  return out;
}

function lbEntryScore(entry, bufCanon) {
  return (entry.priority || 0) * 1000 + lbMatchedCount(entry, bufCanon);
}

function lbSort(a, b, bufCanon) {
  return lbEntryScore(b, bufCanon) - lbEntryScore(a, bufCanon);
}

function lbApplyEntry(entry) {
  var personality = lbSanitize(entry.personality || '');
  var scenario = lbSanitize(entry.scenario || '');
  if (personality || scenario) { lbAppend(personality, scenario); }
}

function lbRun() {
  var maxEntries = LOREBOOK_CONFIG.maxEntries || 4;
  var applied = 0;
  var raw = lbLastMessage();
  var bufCanon = lbNormalize(raw);
  var candidates = [];
  var i, entry, shifts, j;

  if (maxEntries <= 0) { return; }
  if (LOREBOOK_CONFIG.alwaysOn && lbHasFlag(LOREBOOK_CONFIG.stateKey)) { return; }

  for (i = 0; i < dynamicLore.length; i += 1) {
    entry = dynamicLore[i];
    if (lbEligible(entry, bufCanon)) {
      candidates.push(entry);
      shifts = lbShiftCandidates(entry, bufCanon);
      for (j = 0; j < shifts.length; j += 1) {
        candidates.push(shifts[j]);
      }
    }
  }

  candidates.sort(function (a, b) { return lbSort(a, b, bufCanon); });

  for (i = 0; i < candidates.length && applied < maxEntries; i += 1) {
    entry = candidates[i];
    if (typeof entry.probability === 'number' && Math.random() > entry.probability) { continue; }
    if (typeof entry.chance === 'number' && Math.random() > entry.chance) { continue; }
    lbApplyEntry(entry);
    applied += 1;
  }

  if (LOREBOOK_CONFIG.alwaysOn) { lbSetFlag(LOREBOOK_CONFIG.stateKey); }
}

lbRun();