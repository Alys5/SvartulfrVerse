/* ==========================================================================
   Advanced Lorebook Runtime - Family Layer
   SvartulfrVerse | F_ Lorebook Runtime | ES6-safe JanitorAI sandbox
   Target: JanitorAI Advanced Script
   ========================================================================== */

context.character = context.character || {};

if (typeof context.character.personality !== 'string') { context.character.personality = ''; }
if (typeof context.character.scenario !== 'string') { context.character.scenario = ''; }

var LOREBOOK_CONFIG = {
  type: 'family',
  prefix: 'F_',
  stateKey: 'family_lorebook_applied',
  maxEntries: 4,
  "alwaysOn": false,
  "seed": 42
};

var dynamicLore = [
  {
    "id": "F_authority_boundary",
    "priority": 5,
    "keywords": [
      "family",
      "douglas bloodmoon",
      "douglas-bloodmoon",
      "bloodmoon",
      "genealogy",
      "lineage",
      "surname",
      "inheritance"
    ],
    "personality": "Family Authority boundary: state only sourced F_ family facts and do not invent bloodlines, marriages, adoptions, or inheritance claims.",
    "scenario": "Record Family Authority boundary for F_ entries."
  },
  {
    "id": "F_dynastic_state",
    "priority": 5,
    "keywords": [
      "dynasty",
      "dynastic",
      "dynastic adoption",
      "adoption",
      "adoptive",
      "adopted"
    ],
    "personality": "Dynastic state hook: surname use, adoption, and inheritance claims require Family Authority validation before runtime acceptance.",
    "scenario": "Record dynastic state as Family Authority validation content."
  },
  {
    "id": "F_surname_boundary",
    "priority": 4,
    "keywords": [
      "surname",
      "last name",
      "family name",
      "douglas",
      "bloodmoon",
      "name change"
    ],
    "personality": "Surname boundary: do not change a character surname in runtime unless sourced family authority or explicit Experience state allows it.",
    "scenario": "Record surname query as Family Authority validation content."
  },
  {
    "id": "F_genealogy_query",
    "priority": 3,
    "keywords": [
      "parent",
      "mother",
      "father",
      "sibling",
      "brother",
      "sister",
      "child",
      "children",
      "relative",
      "cousin"
    ],
    "personality": "Genealogy boundary: family relationships must remain traceable to the active F_ source record.",
    "scenario": "Record family relationship query without inventing missing parentage or siblings."
  },
  {
    "id": "F_marriage_boundary",
    "priority": 3,
    "keywords": [
      "marriage",
      "married",
      "spouse",
      "husband",
      "wife",
      "divorce",
      "divorced"
    ],
    "personality": "Marriage boundary: marital status is Family Authority content and must not be inferred from scene tone alone.",
    "scenario": "Record marriage or divorce cue as sourced family context only."
  },
  {
    "id": "F_Douglas_Bloodmoon",
    "priority": 5,
    "keywords": [
      "douglas-bloodmoon",
      "douglas bloodmoon",
      "dynastic union",
      "erik nixara",
      "bloodmoon dynasty",
      "douglas dynasty",
      "founders"
    ],
    "personality": "Source: database/families/F_Douglas_Bloodmoon.md. The family graph defines Bloodmoon and Douglas root dynasties, the Erik plus Nixara union, and first generation heirs Malachia, Noah, Jasper, and Alyssa. Wulfnic is Nixara father. Erik and Wulfnic are separate dynasties with no father-son relationship. The hyphenated surname is mandatory for first generation.",
    "scenario": "Source path: database/families/F_Douglas_Bloodmoon.md. Record type: sourced lorebook entry."
  },
  {
    "id": "F_Marriages",
    "priority": 4,
    "keywords": [
      "marriage",
      "married",
      "spouse",
      "husband",
      "wife",
      "mr-001",
      "union"
    ],
    "personality": "Source: database/families/F_Marriages.md. MR-001 records Erik Douglas and Nixara Bloodmoon as a dynastic union around 1996 after meeting in 1994. It created the Douglas-Bloodmoon line, established in-law relationships, produced four heirs, and ended by Nixara death in 2005. No former marriages are documented.",
    "scenario": "Source path: database/families/F_Marriages.md. Record type: sourced lorebook entry."
  },
  {
    "id": "F_Surname_Authority",
    "priority": 5,
    "keywords": [
      "surname",
      "last name",
      "family name",
      "hyphenated",
      "surname rule",
      "douglas-bloodmoon surname"
    ],
    "personality": "Source: database/families/F_Surname_Authority.md. Family Authority owns surname assignment, inheritance, modification, and validation. Douglas and Bloodmoon use default patrilineal surnames. Douglas-Bloodmoon is an exceptional hyphenated first-generation designation for Malachia, Noah, Jasper, and Alyssa. It is not automatically hereditary, and second-generation rules remain unresolved.",
    "scenario": "Source path: database/families/F_Surname_Authority.md. Record type: sourced lorebook entry."
  },
  {
    "id": "F_Parent_Child",
    "priority": 5,
    "keywords": [
      "parent",
      "child",
      "father",
      "mother",
      "siblings",
      "grandparent",
      "pc-001",
      "pc-002"
    ],
    "personality": "Source: database/families/F_Parent_Child.md. Parent-child records are immutable and must not be inferred. PC-001 is Wulfnic to Nixara. PC-002 to PC-005 are Erik to Malachia, Noah, Jasper, and Alyssa. PC-006 to PC-009 are Nixara to the same four heirs. Derived siblings and Wulfnic grandparent relationships come from these edges. Erik to Wulfnic parent-child claims are rejected.",
    "scenario": "Source path: database/families/F_Parent_Child.md. Record type: sourced lorebook entry."
  },
  {
    "id": "HC_Douglas_Commercial_Lineage",
    "priority": 4,
    "keywords": [
      "douglas commercial lineage",
      "merchant house",
      "lord cornelius",
      "1666",
      "colonial trading",
      "douglas history"
    ],
    "personality": "Source: database/historical/HC_Douglas_Commercial_Lineage.md. Historical Canon record for Douglas commercial lineage. Merchant House Douglas was founded in England in 1666 by Lord Cornelius Vance Douglas, expanded into Douglas Colonial Trading Company in the 1700s, and anchored California presence through a colonial trade and governance tradition. Magnus Douglas belongs to a sci-fi timeline only and is not founder of the original enterprise.",
    "scenario": "Source path: database/historical/HC_Douglas_Commercial_Lineage.md. Record type: sourced lorebook entry."
  },
  {
    "id": "HC_Edric_Aettfadir_Svartulfa",
    "priority": 4,
    "keywords": [
      "edric aettfadir",
      "edric svartulfa",
      "svartulfa",
      "725 ad",
      "vendel period"
    ],
    "personality": "Source: database/historical/HC_Edric_Aettfadir_Svartulfa.md. Historical Canon record for Edric Aettfadir Svartulfa, dated 725 AD in Vendel Period Scandinavia. The name means Father-Founder of the Svartulfr lineage. He is the earliest documented founder associated with the ancestral Svartulfr family tradition. The record is historical and cultural origin only, with no supernatural claims and no active-runtime relationships.",
    "scenario": "Source path: database/historical/HC_Edric_Aettfadir_Svartulfa.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Alyssa_summary",
    "priority": 2,
    "keywords": [
      "alyssa",
      "lys",
      "sunflower",
      "alyssa douglas-bloodmoon"
    ],
    "personality": "Source: database/characters/C_Alyssa_Douglas_Bloodmoon.md. Alyssa Douglas-Bloodmoon is a 19-year-old Douglas-Bloodmoon heir, twin of Jasper, First-Year Pre-Med at UCLA with 3.8 GPA, aspiring toward neuropsychiatry or biogenetics, art model, protected core, resident at Douglas Estate, protected by Marcus Thornfield. Visual: caramel-brown hair, mint green eyes, petite hourglass, 165 cm, Nixara-like fusion phenotype, sunflower motif.",
    "scenario": "Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Erik_summary",
    "priority": 2,
    "keywords": [
      "erik",
      "erik douglas",
      "douglas patriarch",
      "dcc ceo"
    ],
    "personality": "Source: database/characters/C_Erik_Douglas.md. Erik Douglas, age 54, is Douglas patriarch and DCC CEO, former UCLA quarterback and KSA president, widower of Nixara, father of Malachia, Noah, Jasper, and Alyssa, brother of Logan, and father-in-law to Wulfnic. Visual: 205 cm, black hair with silver streaks, amber eyes, massive muscular build. Personality centers on protective control after Nixara death.",
    "scenario": "Source path: database/characters/C_Erik_Douglas.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Jasper_summary",
    "priority": 2,
    "keywords": [
      "jasper",
      "jasper douglas-bloodmoon",
      "dj frequency",
      "alyssa twin"
    ],
    "personality": "Source: database/characters/C_Jasper_Douglas_Bloodmoon.md. Jasper Douglas-Bloodmoon, age 19, is twin brother of Alyssa, First-Year Engineering at UCLA, KSA legacy eligible but refuses recruitment, underground electronic musician DJ Frequency, tech-oriented and rebellious, protective of Alyssa. Visual: 191 cm, lean athletic, caramel-brown hair, mint green fusion eyes.",
    "scenario": "Source path: database/characters/C_Jasper_Douglas_Bloodmoon.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Noah_summary",
    "priority": 2,
    "keywords": [
      "noah",
      "noah douglas-bloodmoon",
      "blondie",
      "law student"
    ],
    "personality": "Source: database/characters/C_Noah_Douglas_Bloodmoon.md. Noah Douglas-Bloodmoon, age 25, is second-born heir, 3L JD Candidate at UCLA School of Law, KSA alumnus, family diplomat and legal mind. Visual: 196 cm, lithe elegant swimmer build, blonde hair, blue Bloodmoon-dominant eyes. Single, no children.",
    "scenario": "Source path: database/characters/C_Noah_Douglas_Bloodmoon.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Malachia_summary",
    "priority": 2,
    "keywords": [
      "malachia",
      "malachia douglas-bloodmoon",
      "executive successor",
      "boxing",
      "mma"
    ],
    "personality": "Source: database/characters/C_Malachia_Douglas_Bloodmoon.md. Malachia Douglas-Bloodmoon, age 28, is eldest heir and Executive Successor Candidate, 5th-Year PhD Candidate in Sport Sciences at UCLA, professional boxer and MMA heavyweight, KSA alumnus, mentored by Kaladin Nargathon. Visual: 210 cm, tank-like scarred Douglas-dominant build, black hair, amber eyes. Uses Seven Hills as training base.",
    "scenario": "Source path: database/characters/C_Malachia_Douglas_Bloodmoon.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Angel_summary",
    "priority": 2,
    "keywords": [
      "angel",
      "angel moreno",
      "fashion photographer",
      "angel and co"
    ],
    "personality": "Source: database/characters/C_Angel_Moreno.md. Angel Moreno, age 32, is a secondary canon character, fashion photographer, creative director, social media strategist, founder of Angel & Co, patron and mentor to Alyssa modeling career. Visual: platinum blonde with fuchsia highlights, grey-blue eyes, lean elegant androgynous high-fashion presentation. Socially intelligent, protective, artistically driven.",
    "scenario": "Source path: database/characters/C_Angel_Moreno.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Edric_summary",
    "priority": 2,
    "keywords": [
      "edric",
      "edric douglas",
      "logan son",
      "cousin"
    ],
    "personality": "Source: database/characters/C_Edric_Douglas.md. Edric Douglas, born 2018, age 6 as of 2024, is Logan son, Douglas dynasty by birth, cousin to Malachia, Noah, Jasper, and Alyssa, nephew of Erik, grandnephew of Nixara and Wulfnic. Visual authority expects Douglas-dominant inheritance from Logan. Active family record is limited to parent-child and cousin relationships.",
    "scenario": "Source path: database/characters/C_Edric_Douglas.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Kaladin_summary",
    "priority": 2,
    "keywords": [
      "kaladin",
      "kaladin nargathon",
      "dcc security",
      "black wolf director"
    ],
    "personality": "Source: database/characters/C_Kaladin_Nargathon.md. Kaladin Nargathon, age 33, is Director of DCC Security Black Wolf Division and former US Army Special Forces Major from Task Force Gamma-7. He reports to Erik Douglas, supervises Marcus Thornfield and Alyssa protection detail, and mentors Malachia in security governance. Visual: 193 cm, massive athletic build, black tactical ponytail, forest green eyes, right eyebrow scar, Gamma-7 tattoo.",
    "scenario": "Source path: database/characters/C_Kaladin_Nargathon.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Logan_summary",
    "priority": 2,
    "keywords": [
      "logan",
      "logan douglas",
      "verve",
      "douglas customs"
    ],
    "personality": "Source: database/characters/C_Logan_Douglas.md. Logan Douglas is Erik younger brother, uncle and safe haven for the heirs, father of Edric, KSA alumnus, mechanical engineer, owner of The Verve and Douglas Customs. Visual: 198 cm, broad muscular build, black hair, blue ocean eyes. Personality is laid-back, protective, grounded, mechanically skilled, and non-corporate.",
    "scenario": "Source path: database/characters/C_Logan_Douglas.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Marcus_summary",
    "priority": 2,
    "keywords": [
      "marcus",
      "marcus thornfield",
      "iron",
      "head of executive protection"
    ],
    "personality": "Source: database/characters/C_Marcus_Thornfield.md. Marcus Thornfield, callsign Iron, is Head of Executive Protection at DCC Security Black Wolf Division, former Special Forces Gamma-7 operator, reports to Kaladin Nargathon, and has primary protection responsibility for Alyssa Douglas-Bloodmoon. He protects Douglas Estate perimeter and executive movement security.",
    "scenario": "Source path: database/characters/C_Marcus_Thornfield.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Nixara_summary",
    "priority": 2,
    "keywords": [
      "nixara",
      "nixara bloodmoon",
      "erik wife",
      "mother"
    ],
    "personality": "Source: database/characters/C_Nixara_Bloodmoon.md. Nixara Bloodmoon, born 1975, died in 2005 during childbirth with Jasper and Alyssa, daughter of Wulfnic, wife of Erik, mother of Malachia, Noah, Jasper, and Alyssa, and co-founder of Douglas-Bloodmoon union. Visual: 165 cm, petite hourglass, ice blue eyes, blonde tailbone-length hair, primary maternal morphological template.",
    "scenario": "Source path: database/characters/C_Nixara_Bloodmoon.md. Record type: sourced lorebook entry."
  },
  {
    "id": "C_Wulfnic_summary",
    "priority": 2,
    "keywords": [
      "wulfnic",
      "wulfnic bloodmoon",
      "bloodmoon patriarch",
      "svartulfr"
    ],
    "personality": "Source: database/characters/C_Wulfnic_Bloodmoon.md. Wulfnic Bloodmoon, born 1948, is Bloodmoon Patriarch, first American-born Bloodmoon, custodian of Svartulfr heritage, father of Nixara, grandfather to Douglas-Bloodmoon heirs, and father-in-law to Erik. He is human cultural authority, not supernatural. Visual: 195 cm, lean strong refined build, silver-white hair, blue eyes, stoic and traditional.",
    "scenario": "Source path: database/characters/C_Wulfnic_Bloodmoon.md. Record type: sourced lorebook entry."
  },
    {
        id: 'F_families_domain_index',
        keywords: ['families domain', 'Family Authority', 'database/families/README.md', 'F_Douglas_Bloodmoon', 'F_Marriages', 'F_Parent_Child', 'F_Surname_Authority'],
        priority: 12,
        requires: [],
        excludes: [],
        tags: ['family', 'family-authority', 'domain-index'],
        persona: 'Family Authority index for genealogy and surname governance.',
        content: 'Source: database/families/README.md. # Families Domain ## Purpose Repository for canonical family/genealogy records. ## Authority Family Authority (ADR-002) ## Allowed Content - Approved family records - Family templates - Genealogy structures ## Forbidden Content - Unapproved families - Legacy imports without audit - Inferred relationships - Contradictory genealogies ## Relationships - Referenced by: characters/ - Referenced by: institutions/ ## Domain Status | Status | Value | |--------|-------| | Phase | Canon Freeze v1 | | Status | COMPLETE | | Date | 2026-06-08 | | Records | 4 | ## Records | Record | Description | Status | |--------|-------------|--------| | F_Douglas_Bloodmoon.md | Dynastic union structure | ✓ ACTIVE | | F_Marriages.md | Marriage records | ✓ ACTIVE | | F_Parent_Child.md | Parent-child relationships | ✓ ACTIVE | | F_Surname_Authority.md | Surname governance rules | ✓ ACTIVE | ## Canonical Family Graph ```text Wulfnic Bloodmoon (1948) ←→ Nixara Bloodmoon (1975-2005) ↓ Erik Douglas (1970) ←→ Nixara Bloodmoon ↓ ┌───────────────┼───────────────┐ ↓               ↓               ↓ Malachia (1996)   Noah (1999)   Jasper (2005) ↓ Alyssa (2005) ↓ Logan Douglas → Edric Douglas (2018) ``` ## Validation Status | Check | Result | |-------|--------| | Family Graph Consistency | ✓ PASS | | Surname Authority Consistency | ✓ PASS | | Parent-Child Consistency | ✓ PASS | | Marriage Consistency | ✓ PASS | | Unresolved References | ✓ NONE | | No Canon Conflicts | ✓ PASS | ## Canon Layer Compliance All 4 records are classified as **Active Canon (Layer 1)** per ADR-006. **Last Updated:** 2026-06-08 **Canon Freeze:** v1.0'
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
function lbGetStateMarker() { var match = context.character.scenario.match(/SVLB_FAMILY=([^;\n]+)/); return match ? match[1] : ''; }
function lbParseFlags() { var marker = lbGetStateMarker(); var flags = {}; if (!marker) { return flags; } var parts = marker.split('|'); var i; for (i = 0; i < parts.length; i += 1) { if (parts[i]) { flags[parts[i]] = '1'; } } return flags; }
function lbRenderFlags(flags) { var keys = []; var k; for (k in flags) { if (Object.prototype.hasOwnProperty.call(flags, k)) { keys.push(k); } } return keys.join('|'); }
function lbHasFlag(key) { return !!lbParseFlags()[key]; }
function lbSetFlag(key) { var flags = lbParseFlags(); if (flags[key]) { return; } flags[key] = '1'; LBR.runtimeFlags = flags; context.character.scenario += '\n\nSVLB_FAMILY=' + lbRenderFlags(flags) + '.'; }
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
