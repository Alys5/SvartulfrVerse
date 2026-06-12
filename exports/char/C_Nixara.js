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
    "id": "C_Nixara_identity_boundary",
    "priority": 5,
    "keywords": [
      "character",
      "profile",
      "identity",
      "who is",
      "nixara",
      "nixara bloodmoon"
    ],
    "personality": "Character Authority boundary: use only sourced C_ identity, appearance, traits, preferences, and background for Nixara. Do not invent unverified canon.",
    "scenario": "Record Nixara Character Authority boundary."
  },
  {
    "id": "C_Nixara_visual_boundary",
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
      "nixara",
      "nixara bloodmoon"
    ],
    "personality": "Visual boundary: keep Nixara visual details anchored to the character record and active Visual DNA.",
    "scenario": "Record Nixara visual cue as Character and Visual Authority content."
  },
  {
    "id": "C_Nixara_pov_boundary",
    "priority": 5,
    "keywords": [
      "pov",
      "player pov",
      "persona",
      "avatar",
      "roleplay as",
      "play as",
      "nixara",
      "nixara bloodmoon"
    ],
    "personality": "POV boundary: the Experience decides Player POV framing; Nixara lore must not cast itself into the Player POV slot.",
    "scenario": "Record POV Override boundary without changing canonical Character Authority."
  },
  {
    "id": "C_Nixara_knowledge_boundary",
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
      "nixara",
      "nixara bloodmoon"
    ],
    "personality": "Knowledge boundary: Nixara preferences and tendencies are descriptive cues, not runtime state transitions.",
    "scenario": "Record Nixara knowledge as sourced descriptive content."
  },
  {
    "id": "C_Nixara_relationship_state",
    "priority": 3,
    "keywords": [
      "relationship",
      "trust",
      "romantic",
      "tension",
      "friendship",
      "rival",
      "bond",
      "nixara",
      "nixara bloodmoon"
    ],
    "personality": "Relationship boundary: runtime relationship state belongs to En_Core unless a sourced Nixara relationship fact is explicitly referenced.",
    "scenario": "Record relationship cue as runtime state or sourced character context."
  },
  {
    "id": "C_Nixara_character_query",
    "priority": 2,
    "keywords": [
      "tell me about",
      "describe",
      "background",
      "occupation",
      "skills",
      "history",
      "nixara",
      "nixara bloodmoon"
    ],
    "personality": "Character query: answer from the active Nixara source record and avoid unsupported expansion.",
    "scenario": "Record Nixara query as a request for sourced character context."
  },
  {
    "id": "C_Nixara_bio",
    "priority": 5,
    "keywords": [
      "nixara",
      "nixara bloodmoon",
      "white moon",
      "mother",
      "deceased",
      "died",
      "2005",
      "childbirth",
      "wife",
      "erik wife",
      "bloodmoon",
      "who is nixara",
      "tell me about nixara",
      "nixara bio",
      "nixara background",
      "nixara profile"
    ],
    "personality": "[BIO] Nixara Bloodmoon (born 1975, died 2005) was the daughter of Wulfnic Bloodmoon, wife of Erik Douglas, and mother of the four Douglas-Bloodmoon heirs (Malachia, Noah, Jasper, and Alyssa). She died in 2005 during childbirth, delivering the twins Jasper and Alyssa. Her union with Erik Douglas in the 1990s created the Douglas-Bloodmoon dynastic merge ... the foundational union of the Bloodmoon and Douglas lines. She is the primary maternal morphological template for the first generation heirs, and her death is the foundational family trauma that shapes every member of the dynasty.",
    "scenario": "Source: database/characters/C_Nixara_Bloodmoon.md | Category: BIO | Character Authority entry from exports/char/C_Nixara.js. Use as sourced character context only.",
    "category": "BIO"
  },
  {
    "id": "C_Nixara_appearance",
    "priority": 4,
    "keywords": [
      "nixara",
      "appearance",
      "visual",
      "looks",
      "describe",
      "blonde",
      "ice blue",
      "eyes",
      "petite",
      "hourglass",
      "165",
      "height",
      "silky",
      "straight",
      "tailbone",
      "nixara appearance",
      "nixara visual",
      "bloodmoon",
      "maternal template"
    ],
    "personality": "[APPEARANCE] Nixara Bloodmoon is the primary maternal morphological template (ADR-004). Height: 165 cm. Body: petite hourglass (95-55-95). Face: soft facial structure, delicate jawline, fair skin. Eyes: ice blue (Bloodmoon chromatic). Hair: blonde, tailbone-length, silky straight (Bloodmoon chromatic). Her visual DNA is the strongest Bloodmoon expression in the family. Alyssa Douglas-Bloodmoon carries the strongest morphological inheritance from Nixara ... silhouette, proportions, and facial structure. Noah inherits her chromatic traits (blonde hair, blue eyes). Jasper inherits a fusion blend. Malachia is Douglas-dominant with minimal Nixara visual expression.",
    "scenario": "Source: database/characters/C_Nixara_Bloodmoon.md | Category: APPEARANCE | Character Authority entry from exports/char/C_Nixara.js. Use as sourced character context only.",
    "category": "APPEARANCE"
  },
  {
    "id": "C_Nixara_psych_profile",
    "priority": 4,
    "keywords": [
      "nixara",
      "personality",
      "psychology",
      "mind",
      "character",
      "fierce",
      "warm",
      "icelandic",
      "rage",
      "locker room",
      "screamed",
      "fearless",
      "bridge",
      "between worlds",
      "nixara personality",
      "nixara values"
    ],
    "personality": "[PSYCH_PROFILE] Nixara Bloodmoon was fierce, warm, and utterly fearless. Her defining moment ... storming into the UCLA Bruins locker room and screaming at Erik Douglas in Icelandic, calling him an 'absolute idiot' and a 'codfish head' ... captures everything about her: she was the first person in Erik's life who looked at him without an ounce of fear and told him exactly what she thought. She was a bridge between two worlds: the Icelandic Bloodmoon heritage of her father Wulfnic and the American identity she built for herself. She reshaped Erik ... not by softening him, but by giving him something worth being serious for.",
    "scenario": "Source: database/characters/C_Nixara_Bloodmoon.md | Category: PSYCH_PROFILE | Character Authority entry from exports/char/C_Nixara.js. Use as sourced character context only.",
    "category": "PSYCH_PROFILE"
  },
  {
    "id": "C_Nixara_dynamics",
    "priority": 5,
    "keywords": [
      "nixara",
      "erik",
      "husband",
      "wife",
      "nixara and erik",
      "nixara and wulfnic",
      "father",
      "daughter",
      "nixara and malachia",
      "nixara and noah",
      "nixara and jasper",
      "nixara and alyssa",
      "nixara and logan",
      "locker room",
      "ranking",
      "championship",
      "halftime",
      "walked out",
      "scoreboard could wait",
      "relationship",
      "dynamic",
      "dynamics"
    ],
    "personality": "[DYNAMICS] Nixara Bloodmoon's key relationships: With Erik Douglas (husband): The foundational dynastic union. She met Erik in 1994 when she stormed the Bruins locker room to scream at him about the freshman ranking list. He fell in love with her because she was the first person who wasn't afraid of him. When she went into labor with Malachia during the 1996 championship finals, Erik walked out at halftime ... the only game he ever lost. 'The scoreboard could wait. She couldn't.' With Wulfnic Bloodmoon (father): Nixara was raised with deep connection to both her Icelandic heritage and American identity. Wulfnic's devastation at her death intensified his protection of the grandchildren. With her four children: She died before she could know any of them as people, but her influence permeates the family. Alyssa resembles her most. The twins were born the day she died.",
    "scenario": "Source: database/characters/C_Nixara_Bloodmoon.md | Category: DYNAMICS | Character Authority entry from exports/char/C_Nixara.js. Use as sourced character context only.",
    "category": "DYNAMICS"
  },
  {
    "id": "C_Nixara_quirks",
    "priority": 2,
    "keywords": [
      "nixara",
      "moonstone",
      "bracelet",
      "legacy",
      "art",
      "course",
      "college",
      "nixara habit",
      "nixara quirk",
      "nixara mannerism"
    ],
    "personality": "[QUIRKS] Nixara Bloodmoon's legacy includes the moonstone bracelet ... a gift she left that now belongs to Alyssa, who fidgets with it when thinking or anxious. It is Alyssa's connection to the mother she never knew. Nixara and Logan Douglas attended the same optional art course at college, a small connection between the sister-in-law and brother-in-law who both chose creative paths outside the corporate mainstream.",
    "scenario": "Source: database/characters/C_Nixara_Bloodmoon.md | Category: QUIRKS | Character Authority entry from exports/char/C_Nixara.js. Use as sourced character context only.",
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
