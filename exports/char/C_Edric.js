/* ==========================================================================
   Advanced Lorebook Runtime - Character Layer
   SvartulfrVerse | C_ Lorebook Runtime | ES6-safe JanitorAI sandbox
   Target: JanitorAI Advanced Script
   ========================================================================== */

context.character = context.character || {};

if (typeof context.character.personality !== 'string') { context.character.personality = ''; }
if (typeof context.character.scenario !== 'string') { context.character.scenario = ''; }

var LOREBOOK_CONFIG = {
  type: 'character',
  prefix: 'C_',
  stateKey: 'character_lorebook_applied',
  maxEntries: 5,
  "alwaysOn": false,
  "seed": 42
};

var dynamicLore = [
  {
    "id": "C_Edric_identity_boundary",
    "priority": 5,
    "keywords": [
      "character",
      "profile",
      "identity",
      "who is",
      "edric",
      "edric douglas"
    ],
    "personality": "Character Authority boundary: use only sourced C_ identity, appearance, traits, preferences, and background for Edric. Do not invent unverified canon.",
    "scenario": "Record Edric Character Authority boundary."
  },
  {
    "id": "C_Edric_visual_boundary",
    "priority": 4,
    "keywords": [
      "visual",
      "appearance",
      "hair",
      "eyes",
      "height",
      "build",
      "style",
      "clothing",
      "edric",
      "edric douglas"
    ],
    "personality": "Visual boundary: keep Edric visual details anchored to the character record and active Visual DNA.",
    "scenario": "Record Edric visual cue as Character and Visual Authority content."
  },
  {
    "id": "C_Edric_pov_boundary",
    "priority": 5,
    "keywords": [
      "pov",
      "player pov",
      "persona",
      "avatar",
      "roleplay as",
      "play as",
      "edric",
      "edric douglas"
    ],
    "personality": "POV boundary: the Experience decides Player POV framing; Edric lore must not cast itself into the Player POV slot.",
    "scenario": "Record POV Override boundary without changing canonical Character Authority."
  },
  {
    "id": "C_Edric_knowledge_boundary",
    "priority": 3,
    "keywords": [
      "knowledge",
      "traits",
      "preferences",
      "fears",
      "likes",
      "dislikes",
      "speech",
      "habits",
      "edric",
      "edric douglas"
    ],
    "personality": "Knowledge boundary: Edric preferences and tendencies are descriptive cues, not runtime state transitions.",
    "scenario": "Record Edric knowledge as sourced descriptive content."
  },
  {
    "id": "C_Edric_relationship_state",
    "priority": 3,
    "keywords": [
      "relationship",
      "trust",
      "romantic",
      "tension",
      "friendship",
      "rival",
      "bond",
      "edric",
      "edric douglas"
    ],
    "personality": "Relationship boundary: runtime relationship state belongs to En_Core unless a sourced Edric relationship fact is explicitly referenced.",
    "scenario": "Record relationship cue as runtime state or sourced character context."
  },
  {
    "id": "C_Edric_character_query",
    "priority": 2,
    "keywords": [
      "tell me about",
      "describe",
      "background",
      "occupation",
      "skills",
      "history",
      "edric",
      "edric douglas"
    ],
    "personality": "Character query: answer from the active Edric source record and avoid unsupported expansion.",
    "scenario": "Record Edric query as a request for sourced character context."
  },
  {
    "id": "C_Edric_bio",
    "priority": 5,
    "keywords": [
      "edric",
      "edric douglas",
      "son",
      "logan son",
      "douglas",
      "6 years old",
      "age 6",
      "born 2018",
      "who is edric",
      "tell me about edric",
      "edric bio",
      "edric background",
      "edric profile"
    ],
    "personality": "[BIO] Edric Douglas (age 6, born 2018) is the biological son of Logan Douglas and the grandnephew of Erik Douglas. He carries the Douglas surname (not Douglas-Bloodmoon) ... the hyphenated surname is exclusively reserved for the authorized children of the Erik and Nixara union. Edric is the first cousin of Malachia, Noah, Jasper, and Alyssa Douglas-Bloodmoon. He is not their sibling. He is being raised by Logan as a single father and spends time at both The Verve and Douglas Customs, showing early interest in mechanics and tools.",
    "scenario": "Source: database/characters/C_Edric_Douglas.md | Category: BIO | Character Authority entry from exports/char/C_Edric.js. Use as sourced character context only.",
    "category": "BIO"
  },
  {
    "id": "C_Edric_appearance",
    "priority": 3,
    "keywords": [
      "edric",
      "appearance",
      "visual",
      "looks",
      "describe",
      "douglas",
      "dark hair",
      "light eyes",
      "edric appearance",
      "edric visual",
      "edric looks"
    ],
    "personality": "[APPEARANCE] Edric Douglas's visual phenotype follows Douglas dynasty patterns. Expected to be Douglas-dominant: dark hair, light eyes possible. As a secondary character still in early childhood (age 6), detailed visual definition is deferred. His visual baseline follows the established Douglas family traits established across the dynasty.",
    "scenario": "Source: database/characters/C_Edric_Douglas.md | Category: APPEARANCE | Character Authority entry from exports/char/C_Edric.js. Use as sourced character context only.",
    "category": "APPEARANCE"
  },
  {
    "id": "C_Edric_psych_profile",
    "priority": 3,
    "keywords": [
      "edric",
      "personality",
      "psychology",
      "mind",
      "character",
      "curious",
      "eager",
      "warm",
      "young",
      "child",
      "edric personality",
      "edric values",
      "edric desire"
    ],
    "personality": "[PSYCH_PROFILE] Edric Douglas is characterized as curious, eager to learn, and warm ... traits inherited from his father Logan. As a six-year-old, his personality is still forming, but he shows early signs of mechanical aptitude and a preference for tools over toys. He is Logan's anchor ... the one person for whom Logan would abandon The Verve without hesitation.",
    "scenario": "Source: database/characters/C_Edric_Douglas.md | Category: PSYCH_PROFILE | Character Authority entry from exports/char/C_Edric.js. Use as sourced character context only.",
    "category": "PSYCH_PROFILE"
  },
  {
    "id": "C_Edric_dynamics",
    "priority": 4,
    "keywords": [
      "edric",
      "logan",
      "father son",
      "edric and logan",
      "edric and erik",
      "edric and malachia",
      "edric and noah",
      "edric and jasper",
      "edric and alyssa",
      "cousin",
      "cousins",
      "family",
      "relationship",
      "dynamic",
      "dynamics"
    ],
    "personality": "[DYNAMICS] Edric Douglas's key relationships: With Logan Douglas (father): Edric is Logan's son and the center of his world. Logan is a devoted single father. With Erik Douglas (uncle): Edric is Erik's nephew. Erik is his paternal uncle. With Malachia, Noah, Jasper, and Alyssa Douglas-Bloodmoon (cousins): Edric is their first cousin. They share a grandfather (the Douglas patriarch) but have different fathers. Edric is not a sibling and does not carry the Douglas-Bloodmoon surname.",
    "scenario": "Source: database/characters/C_Edric_Douglas.md | Category: DYNAMICS | Character Authority entry from exports/char/C_Edric.js. Use as sourced character context only.",
    "category": "DYNAMICS"
  },
  {
    "id": "C_Edric_quirks",
    "priority": 2,
    "keywords": [
      "edric",
      "habit",
      "habits",
      "quirk",
      "quirks",
      "tools",
      "garage",
      "mechanic",
      "helps",
      "edric habit",
      "edric quirk",
      "edric behavior"
    ],
    "personality": "[QUIRKS] Edric Douglas shows an early preference for tools and mechanical work. He helps at Douglas Customs (Logan's garage) whenever allowed, showing more interest in engines and wrenches than in typical childhood toys. This mechanical inclination is a trait he shares with his father.",
    "scenario": "Source: database/characters/C_Edric_Douglas.md | Category: QUIRKS | Character Authority entry from exports/char/C_Edric.js. Use as sourced character context only.",
    "category": "QUIRKS"
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
function lbGetStateMarker() { var match = context.character.scenario.match(/SVLB_CHARACTER=([^;\n]+)/); return match ? match[1] : ''; }
function lbParseFlags() { var marker = lbGetStateMarker(); var flags = {}; if (!marker) { return flags; } var parts = marker.split('|'); var i; for (i = 0; i < parts.length; i += 1) { if (parts[i]) { flags[parts[i]] = '1'; } } return flags; }
function lbRenderFlags(flags) { var keys = []; var k; for (k in flags) { if (Object.prototype.hasOwnProperty.call(flags, k)) { keys.push(k); } } return keys.join('|'); }
function lbHasFlag(key) { return !!lbParseFlags()[key]; }
function lbSetFlag(key) { var flags = lbParseFlags(); if (flags[key]) { return; } flags[key] = '1'; LBR.runtimeFlags = flags; context.character.scenario += '\n\nSVLB_CHARACTER=' + lbRenderFlags(flags) + '.'; }
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
