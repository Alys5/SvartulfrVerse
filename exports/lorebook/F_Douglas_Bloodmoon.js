/* ============================================================================
   F_DOUGLAS_BLOODMOON — Family Layer Lorebook (Advanced Script)
   Platform: JanitorAI — Advanced Script (Keyword-Triggered ONLY, Mode A)
   Canon: SvartulfrVerse Canon Freeze v1.0
   Author: SvartulfrVerse Workspace Architecture

   Purpose:
     Inject canonical genealogical data into context via strictly
     keyword-triggered lorebook entries. Zero always-on entries.
     Token economy: entries fire ONLY when family names or dynastic
     terms appear in the chat window.

   Sources (database/):
     - database/families/F_Douglas_Bloodmoon.md
     - database/families/F_Parent_Child.md
     - database/families/F_Marriages.md
     - database/families/F_Surname_Authority.md

   I/O Contract:
     INPUT:  context.chat.last_message / lastMessage / last_messages
             context.chat.message_count
     OUTPUT: context.character.personality += "..."
             context.character.scenario    += "..."

   Runtime Rules:
     - ES5 ONLY. var, function(), for loops. No let/const/arrow/template literals.
     - context.variables used ONLY for inter-module state (svartulfr_state).
     - Every context.variable access is guarded with || defaults.
     - Append-only output (=+), never overwrite.
     - ZERO always-on entries. All entries are keyword-triggered.
   ========================================================================== */


/* ============================================================================
   [SECTION] GLOBAL KNOBS
   ========================================================================== */
var DEBUG       = 0;
var APPLY_LIMIT = 5;


/* ============================================================================
   [SECTION] OUTPUT GUARDS
   ========================================================================== */
context.character = context.character || {};
context.character.personality = (typeof context.character.personality === "string")
  ? context.character.personality : "";
context.character.scenario = (typeof context.character.scenario === "string")
  ? context.character.scenario : "";

context.variables = context.variables || {};
context.variables.svartulfr_state = context.variables.svartulfr_state || {};


/* ============================================================================
   [SECTION] INPUT NORMALIZATION
   ========================================================================== */
var WINDOW_DEPTH = (function (n) {
  n = parseInt(n, 10);
  if (isNaN(n)) n = 5;
  if (n < 1) n = 1;
  if (n > 20) n = 20;
  return n;
})(typeof WINDOW_DEPTH === "number" ? WINDOW_DEPTH : 5);

function _str(x) { return (x == null ? "" : String(x)); }

function _normalizeText(s) {
  s = _str(s).toLowerCase();
  s = s.replace(/[^a-z0-9_\s-]/g, " ");
  s = s.replace(/[-_]+/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

var _lmArr = (context && context.chat && context.chat.last_messages && typeof context.chat.last_messages.length === "number")
  ? context.chat.last_messages : null;

var _joinedWindow = "";
var _rawLastSingle = "";

if (_lmArr && _lmArr.length > 0) {
  var startIdx = Math.max(0, _lmArr.length - WINDOW_DEPTH);
  var segs = [];
  for (var i = startIdx; i < _lmArr.length; i++) {
    var item = _lmArr[i];
    var msg = (item && typeof item.message === "string") ? item.message : _str(item);
    segs.push(_str(msg));
  }
  _joinedWindow = segs.join(" ");
  var lastItem = _lmArr[_lmArr.length - 1];
  _rawLastSingle = _str((lastItem && typeof lastItem.message === "string") ? lastItem.message : lastItem);
} else {
  var _lastMsgA = (context && context.chat && typeof context.chat.lastMessage === "string") ? context.chat.lastMessage : "";
  var _lastMsgB = (context && context.chat && typeof context.chat.last_message === "string") ? context.chat.last_message : "";
  _rawLastSingle = _str(_lastMsgA || _lastMsgB);
  _joinedWindow = _rawLastSingle;
}

var CHAT_WINDOW = {
  depth: WINDOW_DEPTH,
  count_available: (_lmArr && _lmArr.length) ? _lmArr.length : (_rawLastSingle ? 1 : 0),
  text_joined: _joinedWindow,
  text_last_only: _rawLastSingle,
  text_joined_norm: _normalizeText(_joinedWindow),
  text_last_only_norm: _normalizeText(_rawLastSingle)
};
var last = " " + CHAT_WINDOW.text_joined_norm + " ";

var messageCount = 0;
if (_lmArr && typeof _lmArr.length === "number") {
  messageCount = _lmArr.length;
} else if (context && context.chat && typeof context.chat.message_count === "number") {
  messageCount = context.chat.message_count;
}

var activeName = _normalizeText(
  (context && context.character && typeof context.character.name === "string")
    ? context.character.name
    : ""
);


/* ============================================================================
   [SECTION] UTILITIES
   ========================================================================== */
function dbg(msg) {
  try {
    if (typeof DEBUG !== "undefined" && DEBUG) {
      context.character.personality += "\n\n[DBG] " + String(msg);
    }
  } catch (e) {}
}

function arr(x) { return Array.isArray(x) ? x : (x == null ? [] : [x]); }

function clamp01(v) {
  v = +v; if (!isFinite(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

function parseProbability(v) {
  if (v == null) return 1;
  if (typeof v === "number") return clamp01(v);
  var s = String(v).trim().toLowerCase();
  var n = parseFloat(s.replace("%", ""));
  if (!isFinite(n)) return 1;
  return s.indexOf("%") !== -1 ? clamp01(n / 100) : clamp01(n);
}

function prio(e) {
  var p = (e && isFinite(e.priority)) ? +e.priority : 3;
  if (p < 1) p = 1;
  if (p > 5) p = 5;
  return p;
}

function getMin(e) { return (e && isFinite(e.minMessages)) ? +e.minMessages : -Infinity; }
function getMax(e) { return (e && isFinite(e.maxMessages)) ? +e.maxMessages :  Infinity; }
function getKW(e)  { return (e && Array.isArray(e.keywords)) ? e.keywords.slice(0) : []; }
function getTrg(e) { return (e && Array.isArray(e.triggers)) ? e.triggers.slice(0) : []; }
function getBlk(e) {
  if (!e) return [];
  if (Array.isArray(e.block)) return e.block.slice(0);
  if (Array.isArray(e.Block)) return e.Block.slice(0);
  return [];
}
function getNameBlock(e) { return (e && Array.isArray(e.nameBlock)) ? e.nameBlock.slice(0) : []; }
function normName(s) { return _normalizeText(s); }

function isNameBlocked(e) {
  if (!activeName) return false;
  var nb = getNameBlock(e);
  for (var i = 0; i < nb.length; i++) {
    var n = normName(nb[i]);
    if (!n) continue;
    if (n === activeName) return true;
    if (activeName.indexOf(n) !== -1) return true;
  }
  return false;
}

function reEsc(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function hasTerm(hay, term) {
  var t = (term == null ? "" : String(term)).toLowerCase().trim();
  if (!t) return false;
  if (t.charAt(t.length - 1) === "*") {
    var stem = reEsc(t.slice(0, -1));
    var re1 = new RegExp("(?:^|\\s)" + stem + "[a-z]*?(?=\\s|$)");
    return re1.test(hay);
  }
  var w = reEsc(t);
  var re2 = new RegExp("(?:^|\\s)" + w + "(?=\\s|$)");
  return re2.test(hay);
}

function collectWordGates(e) {
  var r = (e && e.requires) ? e.requires : {};
  var any  = [].concat(arr(e && e.requireAny),  arr(e && e.andAny),  arr(r.any));
  var all  = [].concat(arr(e && e.requireAll),  arr(e && e.andAll),  arr(r.all));
  var none = [].concat(arr(e && e.requireNone), arr(e && e.notAny),  arr(r.none), arr(getBlk(e)));
  var nall = [].concat(arr(e && e.notAll));
  return { any: any, all: all, none: none, nall: nall };
}

function wordGatesPass(e) {
  var g = collectWordGates(e);
  if (g.any.length  && !g.any.some(function (w) { return hasTerm(last, w); })) return false;
  if (g.all.length  && !g.all.every(function (w) { return hasTerm(last, w); })) return false;
  if (g.none.length &&  g.none.some(function (w) { return hasTerm(last, w); })) return false;
  if (g.nall.length &&   g.nall.every(function (w) { return hasTerm(last, w); })) return false;
  return true;
}

function tagsPass(e, activeTagsSet) {
  var anyT  = arr(e && e.andAnyTags);
  var allT  = arr(e && e.andAllTags);
  var noneT = arr(e && e.notAnyTags);
  var nallT = arr(e && e.notAllTags);
  var hasT  = function (t) { return !!activeTagsSet && activeTagsSet[String(t)] === 1; };
  if (anyT.length  && !anyT.some(hasT)) return false;
  if (allT.length  && !allT.every(hasT)) return false;
  if (noneT.length &&  noneT.some(hasT)) return false;
  if (nallT.length &&   nallT.every(hasT)) return false;
  return true;
}

function isAlwaysOn(e) {
  var hasKW  = !!(e && e.keywords && e.keywords.length);
  var hasTag = !!(e && e.tag);
  var hasMin = (e && e.minMessages != null);
  var hasMax = (e && e.maxMessages != null);
  return !hasKW && !hasTag && !hasMin && !hasMax;
}

function entryPasses(e, activeTagsSet) {
  if (!(messageCount >= getMin(e) && messageCount <= getMax(e))) return false;
  if (isNameBlocked(e)) return false;
  if (!wordGatesPass(e)) return false;
  if (!tagsPass(e, activeTagsSet || {})) return false;
  if (Math.random() > parseProbability(e && e.probability)) return false;
  return true;
}


/* ============================================================================
   [SECTION] AUTHOR ENTRIES
   F_Douglas_Bloodmoon Family Layer — SvartulfrVerse Canon Freeze v1.0
   ALL entries are keyword-triggered. ZERO always-on entries.
   ========================================================================== */
var dynamicLore = [

  /* ─────────────────────────────────────────────────────────────────────────
     F0 — DYNASTIC STRUCTURE (General)
     Source: F_Douglas_Bloodmoon.md
     Keywords: douglas, bloodmoon, dynasty, family, heir, patriarch,
     matriarch, bloodline, lineage, ancestry, genealogy, kinship
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["douglas", "bloodmoon", "dynasty", "patriarch", "matriarch", "bloodline", "lineage", "ancestry", "genealogy", "kinship", "heir", "family tree"],
    priority: 5,
    triggers: ["fl_dynastic_structure"],
    personality: " [Family: Douglas-Bloodmoon Dynasty] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md] Two root dynasties: Douglas (England origin, 1700s America, material/commercial power) and Bloodmoon (Iceland origin, post-1930 America, cultural/memory/tradition). Union: Erik Douglas + Nixara Bloodmoon (~1994-1996) created the Douglas-Bloodmoon line. First generation heirs (Malachia, Noah, Jasper, Alyssa) carry mandatory hyphenated surname 'Douglas-Bloodmoon'. Wulfnic Bloodmoon is the Bloodmoon patriarch (Nixara's father). Logan Douglas is Erik's younger brother (paternal uncle to all four heirs). Edric Douglas is Logan's son (cousin to the four heirs). Prohibited edges: Wulfnic is NOT Erik's father (legacy drift, REJECTED).",
    scenario: "Record dynastic context when family structure, bloodline, or inheritance is discussed. The Douglas-Bloodmoon union merges two distinct heritages: corporate power (Douglas) and cultural legacy (Bloodmoon)."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F1 — WULFNIC BLOODMOON (Patriarch)
     Source: F_Douglas_Bloodmoon.md, F_Parent_Child.md
     Keywords: wulfnic, bloodmoon patriarch, grandfather, nixara's father,
     icelandic, svartulfr, wolf
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["wulfnic", "bloodmoon patriarch", "grandfather", "nixara's father", "icelandic", "svartulfr", "wolf"],
    priority: 5,
    triggers: ["fl_wulfnic"],
    personality: " [Family Member: Wulfnic Bloodmoon] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md, F_Parent_Child.md] Role: Bloodmoon Dynasty Patriarch. Born 1948 (human, not immortal). Father of Nixara Bloodmoon (PC-001). Paternal grandfather of Malachia, Noah, Jasper, Alyssa (derived: PC-001 + PC-006/007/008/009). Heritage: Icelandic Svartulfr lineage. Custodian of Bloodmoon cultural memory and tradition. NOT related to Erik Douglas by blood (prohibited edge REJECTED). Residence: Private quarters in the Douglas Estate's east wing, reflecting Bloodmoon heritage (Icelandic texts, traditional furnishings).",
    scenario: "Record Wulfnic's presence when Bloodmoon heritage, Icelandic roots, or the family's cultural memory is referenced. He is the quiet patriarch — present but not controlling."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F2 — NIXARA BLOODMOON (Matriarch, Deceased)
     Source: F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Marriages.md
     Keywords: nixara, bloodmoon matriarch, mother, erik's wife, deceased,
     nix, nixara bloodmoon
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["nixara", "bloodmoon matriarch", "mother", "erik's wife", "deceased", "nix"],
    priority: 5,
    triggers: ["fl_nixara"],
    personality: " [Family Member: Nixara Bloodmoon] [Canon: Active — Deceased 2005] [Source: database/families/F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Marriages.md] Role: Bloodmoon Matriarch, Union Principal. Daughter of Wulfnic Bloodmoon (PC-001). Wife of Erik Douglas (MR-001, dynastic union ~1994-1996). Mother of Malachia, Noah, Jasper, Alyssa (PC-006/007/008/009). Status: Deceased (2005). Her death is a foundational family trauma — the event that shaped the younger generation's relationship with loss and family unity. The union of Douglas + Bloodmoon bloodlines flows through her.",
    scenario: "Record Nixara's legacy when family history, maternal lineage, or the 2005 loss is referenced. She is remembered, not present — her influence persists through her children and the hyphenated surname."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F3 — ERIK DOUGLAS (Patriarch)
     Source: F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Marriages.md
     Keywords: erik, erik douglas, father, dad, ceo, the monarch,
     throne room, patriarch
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["erik", "erik douglas", "father", "dad", "ceo", "the monarch", "throne room", "douglas patriarch"],
    priority: 5,
    triggers: ["fl_erik"],
    personality: " [Family Member: Erik Douglas] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Marriages.md] Role: Douglas Patriarch, DCC CEO, Union Principal. Husband of Nixara Bloodmoon (MR-001). Father of Malachia, Noah, Jasper, Alyssa (PC-002/003/004/005). Younger brother: Logan Douglas. NOT son of Wulfnic Bloodmoon (prohibited edge REJECTED). Domain: 'The Throne Room' — private office combining corporate command with family governance. Sunday lunches at the Formal Dining Hall function as informal family government meetings. Tone: Corporate-monarchical authority with underlying family devotion.",
    scenario: "Record Erik's presence when family governance, DCC business, paternal authority, or Sunday lunch dynamics are referenced. He sits at the head of the table — literally and figuratively."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F4 — LOGAN DOUGLAS (Uncle)
     Source: F_Douglas_Bloodmoon.md
     Keywords: logan, logan douglas, uncle, logan's shop, verve,
     douglas customs, motorcycle
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["logan", "logan douglas", "uncle", "logan's shop", "verve", "douglas customs", "motorcycle"],
    priority: 4,
    triggers: ["fl_logan"],
    personality: " [Family Member: Logan Douglas] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md] Role: Erik's younger brother, paternal uncle to Malachia, Noah, Jasper, Alyssa. Father of Edric Douglas. Professional identity: Automotive workshop owner (Douglas Customs, Arts District DTLA) + music venue owner (The Verve Lounge). NOT family management — crafts with his hands. The Verve is PMC-free territory (DCC Security does not operate inside). Tone: Independent, working-class, authentic. The family's pressure valve.",
    scenario: "Record Logan's presence when the Arts District, The Verve, Douglas Customs, or the 'uncle who chose craft over corporate' dynamic is referenced."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F5 — MALACHIA DOUGLAS-BLOODMOON (Eldest Heir)
     Source: F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Surname_Authority.md
     Keywords: malachia, malachia douglas-bloodmoon, eldest, firstborn,
     phd, sport sciences, boxing, executive successor
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["malachia", "malachia douglas-bloodmoon", "eldest", "firstborn", "phd", "sport sciences", "boxing", "executive successor"],
    priority: 5,
    triggers: ["fl_malachia"],
    personality: " [Family Member: Malachia Douglas-Bloodmoon] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Surname_Authority.md] Role: Eldest heir (firstborn). Surname: Douglas-Bloodmoon (mandatory hyphenated, first gen). Parents: Erik Douglas + Nixara Bloodmoon (PC-002, PC-006). Siblings: Noah, Jasper, Alyssa. Grandfather: Wulfnic Bloodmoon. Education: PhD Candidate, Sport Sciences (UCLA). Training: Seven Hills Estate (ancestral training camp). Executive Successor Candidate under Kaladin Nargathon's mentorship (DCC Security). Disciplined, organized, carries the weight of being firstborn. Residence: East wing of the Douglas Estate.",
    scenario: "Record Malachia's presence when eldest heir dynamics, academic excellence, combat training, or executive succession is referenced."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F6 — NOAH DOUGLAS-BLOODMOON (Second Heir)
     Source: F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Surname_Authority.md
     Keywords: noah, noah douglas-bloodmoon, second heir, law student,
     jd, ucla law, baking, kitchen
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["noah", "noah douglas-bloodmoon", "second heir", "law student", "jd", "ucla law", "baking", "kitchen"],
    priority: 5,
    triggers: ["fl_noah"],
    personality: " [Family Member: Noah Douglas-Bloodmoon] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Surname_Authority.md] Role: Second heir. Surname: Douglas-Bloodmoon (mandatory hyphenated, first gen). Parents: Erik Douglas + Nixara Bloodmoon (PC-003, PC-007). Siblings: Malachia, Jasper, Alyssa. Grandfather: Wulfnic Bloodmoon. Education: 3L JD Candidate, UCLA School of Law. Known for: Late-night baking tradition in the Douglas Estate kitchen. Tone: Thoughtful, legally-minded, quietly rebellious through culinary craft.",
    scenario: "Record Noah's presence when law school, baking, late-night kitchen scenes, or the 'quiet intellectual' family dynamic is referenced."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F7 — JASPER DOUGLAS-BLOODMOON (Third Heir, Twin)
     Source: F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Surname_Authority.md
     Keywords: jasper, jasper douglas-bloodmoon, twin, dj, music,
     engineering, ucla, dj frequency, studio
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["jasper", "jasper douglas-bloodmoon", "twin", "dj", "music", "engineering", "dj frequency", "studio"],
    priority: 5,
    triggers: ["fl_jasper"],
    personality: " [Family Member: Jasper Douglas-Bloodmoon] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Surname_Authority.md] Role: Third heir, twin of Alyssa. Surname: Douglas-Bloodmoon (mandatory hyphenated, first gen). Parents: Erik Douglas + Nixara Bloodmoon (PC-004, PC-008). Siblings: Malachia, Noah, Alyssa (twin). Grandfather: Wulfnic Bloodmoon. Education: First-Year, School of Engineering (UCLA). Alias: DJ Frequency. Known for: DJ equipment and audio gear in his studio within the Douglas Estate compound. Contrast: Family-tolerated creative rebellion within the corporate-monarchical structure.",
    scenario: "Record Jasper's presence when music, DJ culture, engineering, twin dynamics, or the 'creative heir' contrast is referenced."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F8 — ALYSSA DOUGLAS-BLOODMOON (Fourth Heir, Twin)
     Source: F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Surname_Authority.md
     Keywords: alyssa, alyssa douglas-bloodmoon, twin, pre-med, solarium,
     modeling, angel & co, protection detail
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["alyssa", "alyssa douglas-bloodmoon", "twin", "pre-med", "solarium", "modeling", "angel & co", "protection detail"],
    priority: 5,
    triggers: ["fl_alyssa"],
    personality: " [Family Member: Alyssa Douglas-Bloodmoon] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md, F_Parent_Child.md, F_Surname_Authority.md] Role: Fourth heir, twin of Jasper. Surname: Douglas-Bloodmoon (mandatory hyphenated, first gen). Parents: Erik Douglas + Nixara Bloodmoon (PC-005, PC-009). Siblings: Malachia, Noah, Jasper (twin). Grandfather: Wulfnic Bloodmoon. Education: First-Year Pre-Med track, David Geffen School of Medicine (UCLA). Security: Marcus Thornfield / 'Iron' (Head of Exec Protection, DCC Security Black Wolf Division) — primary assignment. Known for: Solarium (bright, plant-filled room, her favorite space). First independent professional opportunity: modeling patronage via Angel & Co.",
    scenario: "Record Alyssa's presence when medical studies, twin dynamics, modeling, security detail, or the 'heir seeking independence' narrative is referenced."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F9 — EDRIC DOUGLAS (Cousin)
     Source: F_Douglas_Bloodmoon.md
     Keywords: edric, edric douglas, cousin, logan's son
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["edric", "edric douglas", "cousin", "logan's son"],
    priority: 4,
    triggers: ["fl_edric"],
    personality: " [Family Member: Edric Douglas] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md] Role: Son of Logan Douglas, cousin to Malachia, Noah, Jasper, Alyssa. Surname: Douglas (patrilineal, non-hyphenated — Logan is Douglas dynasty, not Douglas-Bloodmoon union). Represents the 'pure' Douglas line continuation outside the main union. Tone: Independent branch of the family tree.",
    scenario: "Record Edric's presence when Logan's family, the Douglas-only branch, or cousin dynamics are referenced."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F10 — KALADIN NARGATHON (DCC Security Director)
     Source: F_Douglas_Bloodmoon.md (cross-ref), I_DCC_Security_BlackWolf.md
     Keywords: kaladin, kaladin nargathon, security director, special forces,
     mentor, executive successor
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["kaladin", "kaladin nargathon", "security director", "special forces", "mentor", "executive successor"],
    priority: 4,
    triggers: ["fl_kaladin"],
    personality: " [Family Associate: Kaladin Nargathon] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md, database/institutions/I_DCC_Security_BlackWolf.md] Role: Director of DCC Security — Black Wolf Division. Reports directly to Erik Douglas. Former Major, Special Forces. Mentor to Malachia Douglas-Bloodmoon (Executive Successor Candidate). NOT a blood family member — institutional authority figure. The 'Black Wolf' name was his operational codename; connection to Svartulfr heritage is a narrative easter egg, NOT supernatural.",
    scenario: "Record Kaladin's presence when security operations, executive succession training, or DCC Security command structure is referenced."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F11 — MARCUS THORNFIELD (Head of Exec Protection)
     Source: F_Douglas_Bloodmoon.md (cross-ref), I_DCC_Security_BlackWolf.md
     Keywords: marcus, marcus thornfield, iron, head of exec protection,
     alyssa's protection, gamma-7, black wolf
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["marcus", "marcus thornfield", "iron", "head of exec protection", "alyssa's protection", "gamma-7", "black wolf"],
    priority: 4,
    triggers: ["fl_marcus"],
    personality: " [Family Associate: Marcus Thornfield] [Canon: Active] [Source: database/families/F_Douglas_Bloodmoon.md, database/institutions/I_DCC_Security_BlackWolf.md] Role: Head of Executive Protection, DCC Security — Black Wolf Division. Callsign: 'Iron'. Reports to Kaladin Nargathon. Former Special Forces, Gamma-7 operator. Primary assignment: Alyssa Douglas-Bloodmoon. NOT a blood family member — institutional protection figure.",
    scenario: "Record Marcus's presence when Alyssa's security detail, executive protection, or DCC Security field operations are referenced."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F12 — SURNAME AUTHORITY & NAMING RULES
     Source: F_Surname_Authority.md
     Keywords: surname, hyphenated, douglas-bloodmoon, naming convention,
     last name, family name
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["surname", "hyphenated", "douglas-bloodmoon", "naming convention", "last name", "family name"],
    priority: 3,
    triggers: ["fl_surname_authority"],
    personality: " [Family Rule: Surname Authority] [Canon: Active] [Source: database/families/F_Surname_Authority.md] Three active surnames: Douglas (patrilineal, Douglas Dynasty), Bloodmoon (patrilineal, Bloodmoon Dynasty), Douglas-Bloodmoon (hyphenated, mandatory for first-gen heirs of Erik + Nixara union). Hyphenated surname is NON-NEGOTIABLE for Malachia, Noah, Jasper, Alyssa. Second-generation inheritance rules are UNRESOLVED (pending future ADR). Surname authority belongs EXCLUSIVELY to Family Authority Layer — Character Layer may not define or modify surname rules.",
    scenario: "Record surname rules when naming conventions, hyphenation, or inheritance of family names is discussed."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F13 — MARRIAGE & UNION RULES
     Source: F_Marriages.md
     Keywords: marriage, union, dynastic union, erik and nixara, wedding,
     spouse, married
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["marriage", "union", "dynastic union", "erik and nixara", "wedding", "spouse", "married"],
    priority: 3,
    triggers: ["fl_marriage_rules"],
    personality: " [Family Rule: Marriage & Union] [Canon: Active] [Source: database/families/F_Marriages.md] One canonical marriage: MR-001 — Erik Douglas + Nixara Bloodmoon (Dynastic Union, ~1994-1996). Status: Ended by death (Nixara, 2005). No former marriages documented. No other canonical marriages in the Los Angeles Dynasty baseline. In-law relationships are derived (not stored): Erik is Wulfnic's son-in-law. Prohibited: Wulfnic as Erik's father (would make the union incestuous — REJECTED).",
    scenario: "Record marriage/union context when the Erik + Nixara relationship, in-law dynamics, or dynastic union significance is referenced."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     F14 — SIBLING RELATIONSHIPS (Derived)
     Source: F_Parent_Child.md
     Keywords: sibling, brother, sister, twin, siblings, malachia and noah,
     jasper and alyssa
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["sibling", "brother", "sister", "twin", "siblings", "malachia and noah", "jasper and alyssa"],
    priority: 3,
    triggers: ["fl_sibling_relationships"],
    personality: " [Family Rule: Sibling Relationships] [Canon: Active — Derived] [Source: database/families/F_Parent_Child.md] Four heirs share both parents (Erik + Nixara) — all are full siblings. Six sibling pairs: Malachia-Noah, Malachia-Jasper, Malachia-Alyssa, Noah-Jasper, Noah-Alyssa, Jasper-Alyssa. Jasper and Alyssa are twins. All sibling relationships are DERIVED from parent-child records (PC-002 through PC-009) — never stored as independent canon. Grandparent relationships also derived: Wulfnic is grandfather to all four (via Nixara, PC-001).",
    scenario: "Record sibling dynamics when brother/sister relationships, twin bonds, or shared parentage is discussed."
  }

// END OF AUTHOR ENTRIES
];


/* ============================================================================
   [SECTION] COMPILATION
   ========================================================================== */
function compileAuthorLore(authorLore) {
  var src = Array.isArray(authorLore) ? authorLore : [];
  var out = new Array(src.length);
  for (var i = 0; i < src.length; i++) out[i] = normalizeEntry(src[i]);
  return out;
}

function normalizeEntry(e) {
  if (!e) return {};
  var out = {};
  for (var k in e) if (Object.prototype.hasOwnProperty.call(e, k)) out[k] = e[k];
  out.keywords = Array.isArray(e.keywords) ? e.keywords.slice(0) : [];
  if (Array.isArray(e.Shifts) && e.Shifts.length) {
    var shArr = new Array(e.Shifts.length);
    for (var i = 0; i < e.Shifts.length; i++) {
      var sh = e.Shifts[i] || {};
      var shOut = {};
      for (var sk in sh) if (Object.prototype.hasOwnProperty.call(sh, sk)) shOut[sk] = sh[sk];
      shOut.keywords = Array.isArray(sh.keywords) ? sh.keywords.slice(0) : [];
      shArr[i] = shOut;
    }
    out.Shifts = shArr;
  } else if (out.hasOwnProperty("Shifts")) {
    delete out.Shifts;
  }
  return out;
}

var _ENGINE_LORE = compileAuthorLore(typeof dynamicLore !== "undefined" ? dynamicLore : []);


/* ============================================================================
   [SECTION] SELECTION PIPELINE
   ========================================================================== */
var buckets = [null, [], [], [], [], []];
var picked = new Array(_ENGINE_LORE.length);
for (var __i = 0; __i < picked.length; __i++) picked[__i] = 0;

function makeTagSet() { return Object.create(null); }
var trigSet = makeTagSet();
var postShiftTrigSet = makeTagSet();

function addTag(set, key) { set[String(key)] = 1; }
function hasTag(set, key) { return set[String(key)] === 1; }

/* Pass 1: Direct keyword hit (NO always-on entries in this module) */
for (var i1 = 0; i1 < _ENGINE_LORE.length; i1++) {
  var e1 = _ENGINE_LORE[i1];
  var hit = getKW(e1).some(function (kw) { return hasTerm(last, kw); });
  if (!hit) continue;
  if (!entryPasses(e1, undefined)) { dbg("filtered entry[" + i1 + "]"); continue; }
  buckets[prio(e1)].push(i1);
  picked[i1] = 1;
  var trg1 = getTrg(e1);
  for (var t1 = 0; t1 < trg1.length; t1++) addTag(trigSet, trg1[t1]);
  dbg("hit entry[" + i1 + "] p=" + prio(e1));
}

/* Pass 2: Trigger-only entries */
for (var i2 = 0; i2 < _ENGINE_LORE.length; i2++) {
  if (picked[i2]) continue;
  var e2 = _ENGINE_LORE[i2];
  if (!(e2 && e2.tag && hasTag(trigSet, e2.tag))) continue;
  if (!entryPasses(e2, trigSet)) { dbg("filtered triggered entry[" + i2 + "]"); continue; }
  buckets[prio(e2)].push(i2);
  picked[i2] = 1;
  var trg2 = getTrg(e2);
  for (var t2 = 0; t2 < trg2.length; t2++) addTag(trigSet, trg2[t2]);
  dbg("triggered entry[" + i2 + "] p=" + prio(e2));
}

/* Pass 3: Priority-capped selection */
var selected = [];
var pickedCount = 0;
var __APPLY_LIMIT = (typeof APPLY_LIMIT === "number" && APPLY_LIMIT >= 1) ? APPLY_LIMIT : 99999;

for (var p = 5; p >= 1 && pickedCount < __APPLY_LIMIT; p--) {
  var bucket = buckets[p];
  for (var bi = 0; bi < bucket.length && pickedCount < __APPLY_LIMIT; bi++) {
    selected.push(bucket[bi]);
    pickedCount++;
  }
}
if (pickedCount === __APPLY_LIMIT) dbg("APPLY_LIMIT reached");


/* ============================================================================
   [SECTION] APPLY + SHIFTS + POST-SHIFT
   ========================================================================== */
var bufP = "";
var bufS = "";

for (var si = 0; si < selected.length; si++) {
  var idx = selected[si];
  var e3 = _ENGINE_LORE[idx];
  if (e3 && e3.personality) bufP += "\n\n" + e3.personality;
  if (e3 && e3.scenario)    bufS += "\n\n" + e3.scenario;
  if (!(e3 && Array.isArray(e3.Shifts) && e3.Shifts.length)) continue;

  for (var shI = 0; shI < e3.Shifts.length; shI++) {
    var sh = e3.Shifts[shI];
    var activated = getKW(sh).some(function (kw) { return hasTerm(last, kw); });
    if (!activated) continue;
    var trgSh = getTrg(sh);
    for (var tt = 0; tt < trgSh.length; tt++) addTag(postShiftTrigSet, trgSh[tt]);
    if (!entryPasses(sh, trigSet)) { dbg("shift filtered"); continue; }
    if (sh.personality) bufP += "\n\n" + sh.personality;
    if (sh.scenario)    bufS += "\n\n" + sh.scenario;
  }
}

/* Post-shift triggers */
var unionTags = (function () {
  var dst = makeTagSet(), k;
  for (k in trigSet) if (trigSet[k] === 1) dst[k] = 1;
  for (k in postShiftTrigSet) if (postShiftTrigSet[k] === 1) dst[k] = 1;
  return dst;
})();

for (var i3 = 0; i3 < _ENGINE_LORE.length; i3++) {
  if (picked[i3]) continue;
  var e4 = _ENGINE_LORE[i3];
  if (!(e4 && e4.tag && hasTag(postShiftTrigSet, e4.tag))) continue;
  if (!entryPasses(e4, unionTags)) { dbg("post-filter entry[" + i3 + "]"); continue; }
  if (e4.personality) bufP += "\n\n" + e4.personality;
  if (e4.scenario)    bufS += "\n\n" + e4.scenario;
  dbg("post-shift triggered entry[" + i3 + "] p=" + prio(e4));
}


/* ============================================================================
   [SECTION] FLUSH
   ========================================================================== */
if (bufP) context.character.personality += bufP;
if (bufS) context.character.scenario    += bufS;
