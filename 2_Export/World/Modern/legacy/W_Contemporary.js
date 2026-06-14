/*
 * L2 SCENARIO LOREBOOK: Clan Los Angeles (SvartúlfrVerse)
 * ENGINE: MODE A - ADVANCED ENGINE
 * Strict ES5 syntax required.
 */

//#region GLOBAL_KNOBS
var DEBUG = 0;
var APPLY_LIMIT = 8;
var WINDOW_DEPTH = 5;

//#region OUTPUT_GUARDS & NORMALIZATION
context.character = context.character || {};
context.character.personality =
  typeof context.character.personality === "string"
    ? context.character.personality
    : "";
context.character.scenario =
  typeof context.character.scenario === "string"
    ? context.character.scenario
    : "";

function _str(x) {
  return x == null ? "" : String(x);
}
function _normalizeText(s) {
  return _str(s)
    .toLowerCase()
    .replace(/[^a-z0-9_\s-]/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

var _lmArr =
  context && context.chat && typeof context.chat.last_messages !== "undefined"
    ? context.chat.last_messages
    : null;
var _joinedWindow = "",
  _rawLastSingle = "";
if (_lmArr && _lmArr.length > 0) {
  var startIdx = Math.max(0, _lmArr.length - WINDOW_DEPTH),
    segs = [];
  for (var i = startIdx; i < _lmArr.length; i++) {
    segs.push(
      _str(_lmArr[i] && _lmArr[i].message ? _lmArr[i].message : _lmArr[i]),
    );
  }
  _joinedWindow = segs.join(" ");
  _rawLastSingle = _str(
    _lmArr[_lmArr.length - 1] && _lmArr[_lmArr.length - 1].message
      ? _lmArr[_lmArr.length - 1].message
      : _lmArr[_lmArr.length - 1],
  );
} else {
  _rawLastSingle = _str(
    (context && context.chat && context.chat.lastMessage) ||
      (context && context.chat && context.chat.last_message) ||
      "",
  );
  _joinedWindow = _rawLastSingle;
}
var CHAT_WINDOW = { text_joined_norm: _normalizeText(_joinedWindow) };
var last = " " + CHAT_WINDOW.text_joined_norm + " ";
var messageCount = _lmArr
  ? _lmArr.length
  : context.chat.message_count ||
    (typeof context_chat_message_count === "number"
      ? context_chat_message_count
      : 0);
var activeName = _normalizeText(context.character.name || "");

/* === AUTHOR ENTRIES: L2 SCENARIO === */

var mv_user_relation_mode = "relative";
var mv_canon_twin_profile = "char_Alyssa";

var loreContainerLA =
  " [L1 Container] The active dimension is a modern corporate stronghold defined by surveillance, wealth concentration, and family power politics.";
var loreOnlyHumanTimeline =
  " [L1 Boundary] Active Modern/LA is Only Human and contemporary. Keep ages, education, occupations, and relationships on a realistic academic timeline; treat pack ranks, supernatural species, magic, Twin Link, and non-human anatomy as inactive unless a canon authority explicitly promotes an overlay.";
var loreDouglasEstate =
  " [Places] Douglas Estate: gated Beverly Hills compound with PMC perimeter and biometric grids. Layout: Sports Atrium (Erik's hockey gear), Throne Room (Erik's office), Alyssa's Solarium, Malachia's tactical East Wing, Jasper's DJ set, Noah's kitchens, Malachia's bunker.";
var loreAlyssaCore =
  " [NPC - Alyssa Protected Core] Alyssa 'Lys' Douglas-Bloodmoon is the Protected Core: 19-20, 165 cm, small build, caramel-brown hair, mint-green eyes with gold flecks, moonflower-and-wild-honey scent. Modern/LA Alyssa is human-only, has no pack rank, no White Moon alias, no werewolf anatomy, and uses a biometric/PMC watch as a family safety device. She studies pre-med/public health and models secretly through Angel&Co.";
var loreAlyssaAutonomy =
  " [Microcosm - Alyssa Autonomy] Alyssa's stress cues include freezing, touching the left wrist scar, nesting with blankets/fur/oversized clothing, avoiding alcohol, and seeking safe sensory decompression after shouting, sudden aggression, loud impacts, or aggressive physical contact. Use these as observable behavior anchors only.";
var loreAlyssaNightModel =
  " [Microcosm - Night/Model] Alyssa's paparazzi-ready fashion mode uses severe haute couture, heavy designer trench coats, silk-lingerie details under couture, oversized Saint Laurent sunglasses, and sunflower-yellow off-duty accents. Treat as visual/cultural styling for Angel&Co or LA nightlife, not a separate plot track.";
var loreDomainDCC =
  " [L2 Domain] Douglas Commerce Company governs finance, logistics, and legal influence through centralized command and private security.";
var lorePlaceVerve =
  " [Places] The Verve is Logan's PMC-free social safe-zone: estate trackers lose priority, family can decompress, and Logan's circle monitors risks without Erik's grid dominating the room.";
var loreEventSecurity =
  " [Events] Security escalation activates staged responses: monitor, isolate, then controlled extraction if risk indicators continue rising.";
var loreLineage =
  " [L3 Lineage] Douglas-Bloodmoon lineage defines rank precedence, inheritance duty, and protective obligations inside household command structures.";
var loreKSAMissTwinPeaks =
  " [Historical Microcosm - KSA Origin] Erik and Nixara's origin is tied to Kappa Sigma Alpha and the Miss Twin Peaks KSA event/concourse. Treat it as historical social context for the Douglas-Bloodmoon courtship myth, not as an active scene directive.";
var loreDiegeticComms =
  " [Style - Diegetic Comms] All diegetic communications stay in English and are introduced by narrative prose. Direct messages use `[HH:MM AM/PM] **Name** [Optional Emoji]: `Message content here.`; social posts use tags/hashtags; emails use From/To/Subject; physical notes use quote blocks; terminal/system text uses backticks or square-bracket pseudo-system notes instead of OOC.";
var loreIntrigue =
  " [L2 Domain] Corporate-intrigue protocols apply: proxy deals, boardroom pressure, and covert leverage channels shape alliances and conflict response.";
var loreStyleIntrigue =
  " [Style Injector] Keep tone strategic and surgical: legal pressure, reputational warfare, and contractual traps over open force.";
var loreRogueMercs =
  " [L2 Pressure] Unnamed rogue-mercenary cells probe Douglas-Bloodmoon territory through deniable harassment, triggering escalated PMC posture without naming individual antagonists.";
var loreNPCAngel =
  " [NPC - Angel Moreno] Wealthy patron and operator of Angel&Co, funding Alyssa's secret modeling portfolio through a paparazzi-aware studio. Maintain political caution, professional fascination, and respect for Alyssa's agency; never collapse into omniscient mind-reading.";
var loreNPCCandidateScarlett =
  " [NPC Candidate - Scarlett] Human rebel socialite and candidate Alyssa ally. She pushes autonomy through social charm, visible rebellion, and a yellow luxury convertible motif. Treat as candidate until promoted; do not overwrite active estate security or family dynamics.";
var loreNPCGrayDeferred =
  " [NPC Deferred - Romeo 'Gray' Dean] Toxic/abusive ex and gang enforcer associated with Alyssa's left-wrist-scar trauma and Extraction Protocol escalation. Activate only when explicitly introduced; avoid making him omnipresent.";
var loreNPCMaddoxDeferred =
  " [NPC Deferred - Rifle Maddox] Silver Bullets gang boss who may use Gray as leverage against the Douglas clan. Keep off-screen unless explicitly invoked; keep underworld pressure human-grounded.";
var loreUnderworldDeferred =
  " [Lore Boundary - LA Underworld] Candidate underworld material mentions Ballantine Imports, The Sinners, and supernatural-coded figures. In active Modern/LA, keep pressure grounded in human crime, corporate leverage, paparazzi, or deniable security unless a canon authority promotes an overlay.";
var loreMultiPresence =
  " [Multi Presence] When multiple Douglas-Bloodmoon kin appear: one speaker per beat, distinct motives (shield / PR / chaos / safe haven / control / ancient law), no merged dialogue blob.";
var loreNPCSierra =
  " [NPC - Sierra (SiSi)] Human UCLA fashion PR student, influencer, stylist, and walking muse for Angel&Co. Bubblegum pink hair, borderline diva. Extroverted, teases Alyssa about wardrobe, manages paparazzi optics, and adores her.";
var loreBullsBracket =
  " [Lore Event] 'The Bruins Boob Bracket 2025': UCLA football team found Alyssa's Angel&Co photos and made a bracket. Alyssa won without knowing. Jared (lineman) hung her photo in secret. Jasper tried to report it to ethics committee. Alyssa was annoyed but proud she didn't have to fight.";

var dynamicLore = [
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["los angeles", "la", "estate", "beverly hills", "dcc"],
    priority: 5,
    triggers: ["scenario_losangeles_active"],
    scenario: loreContainerLA,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_001",
    category: "",
    world: [],
    key: ["los angeles", "la", "estate", "beverly hills", "dcc"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Los Angeles general location context",
    content: loreContainerLA,
    disable: false,
    order: 0,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["only human", "contemporary", "academic timeline", "no supernatural overlay", "modern/la"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 5,
    scenario: loreOnlyHumanTimeline,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_019",
    category: "",
    world: [],
    key: ["only human", "contemporary", "academic timeline", "no supernatural overlay", "modern/la"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Only Human contemporary boundary",
    content: loreOnlyHumanTimeline,
    disable: false,
    order: 18,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: [
      "douglas estate",
      "douglas villa",
      "beverly hills",
      "estate",
      "villa",
    ],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 4,
    scenario: loreDouglasEstate,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_002",
    category: "",
    world: [],
    key: [
      "douglas estate",
      "douglas villa",
      "beverly hills",
      "estate",
      "villa",
    ],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Douglas Estate location",
    content: loreDouglasEstate,
    disable: false,
    order: 1,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["alyssa", "lys", "protected core", "pre-med", "public health", "pmc watch"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 5,
    scenario: loreAlyssaCore,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_020",
    category: "",
    world: [],
    key: ["alyssa", "lys", "protected core", "pre-med", "public health", "pmc watch"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Alyssa Protected Core profile",
    content: loreAlyssaCore,
    disable: false,
    order: 19,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["alyssa trauma", "ptsd", "nesting", "left wrist scar", "freezing", "no alcohol"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 4,
    scenario: loreAlyssaAutonomy,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_021",
    category: "",
    world: [],
    key: ["alyssa trauma", "ptsd", "nesting", "left wrist scar", "freezing", "no alcohol"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Alyssa autonomy microcosm",
    content: loreAlyssaAutonomy,
    disable: false,
    order: 20,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["night/model", "paparazzi", "haute couture", "designer trench", "saint laurent sunglasses", "sunflower yellow"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 3,
    scenario: loreAlyssaNightModel,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_022",
    category: "",
    world: [],
    key: ["night/model", "paparazzi", "haute couture", "designer trench", "saint laurent sunglasses", "sunflower yellow"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Alyssa Night/Model motif",
    content: loreAlyssaNightModel,
    disable: false,
    order: 21,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    tag: "scenario_losangeles_active",
    andAny: ["dcc", "douglas commerce", "board", "corporate"],
    priority: 4,
    triggers: ["scenario_la_domain_active"],
    scenario: loreDomainDCC,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_003",
    category: "",
    world: [],
    key: ["dcc", "douglas commerce", "board", "corporate"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "DCC corporate domain context",
    content: loreDomainDCC,
    disable: false,
    order: 2,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["verve", "sarah", "roxy", "mae"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 3,
    scenario: lorePlaceVerve,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_004",
    category: "",
    world: [],
    key: ["verve", "sarah", "roxy", "mae"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "The Verve bar and staff",
    content: lorePlaceVerve,
    disable: false,
    order: 3,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["panic", "spike", "breach", "tracker", "watch"],
    andAnyTags: ["scenario_losangeles_active"],
    minMessages: 4,
    priority: 3,
    triggers: ["scenario_la_security_context"],
    scenario: loreEventSecurity,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_005",
    category: "",
    world: [],
    key: ["panic", "spike", "breach", "tracker", "watch"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Security breach event",
    content: loreEventSecurity,
    disable: false,
    order: 4,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    tag: "scenario_la_domain_active",
    andAny: ["bloodmoon", "lineage", "family rank", "heir", "household"],
    minMessages: 2,
    triggers: ["scenario_la_lineage_context"],

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_006",
    category: "",
    world: [],
    key: ["bloodmoon", "lineage", "family rank", "heir", "household"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Bloodmoon lineage context trigger",
    content: "",
    disable: false,
    order: 5,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    tag: "scenario_la_domain_active",
    andAnyTags: ["scenario_la_lineage_context", "scenario_la_security_context"],
    priority: 4,
    scenario: loreLineage,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_007",
    category: "",
    world: [],
    key: [],
    keysecondary: [],
    related: [],
    tags: ["scenario_la_lineage_context", "scenario_la_security_context"],
    comment: "Bloodmoon lineage information",
    content: loreLineage,
    disable: false,
    order: 6,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["miss twin peaks", "ksa origin", "erik nixara", "kappa sigma alpha", "ksa history"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 2,
    scenario: loreKSAMissTwinPeaks,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_023",
    category: "",
    world: [],
    key: ["miss twin peaks", "ksa origin", "erik nixara", "kappa sigma alpha", "ksa history"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "KSA Miss Twin Peaks origin",
    content: loreKSAMissTwinPeaks,
    disable: false,
    order: 22,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["diegetic comms", "messages", "texts", "email", "social media", "note", "post-it", "system note"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 2,
    scenario: loreDiegeticComms,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_024",
    category: "",
    world: [],
    key: ["diegetic comms", "messages", "texts", "email", "social media", "note", "post-it", "system note"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Diegetic comms formatting",
    content: loreDiegeticComms,
    disable: false,
    order: 23,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["corporate intrigue", "boardroom", "hostile takeover"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 4,
    scenario: loreIntrigue,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_008",
    category: "",
    world: [],
    key: ["corporate intrigue", "boardroom", "hostile takeover"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Corporate intrigue scenarios",
    content: loreIntrigue,
    disable: false,
    order: 7,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: [
      "corporate intrigue",
      "negotiation",
      "merger",
      "hostile takeover",
      "espionage",
    ],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 3,
    personality: loreStyleIntrigue,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_009",
    category: "",
    world: [],
    key: [
      "corporate intrigue",
      "negotiation",
      "merger",
      "hostile takeover",
      "espionage",
    ],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Corporate intrigue personality style",
    content: loreStyleIntrigue,
    disable: false,
    order: 8,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["mercenary", "rogue", "transponder", "harassment", "bloodmoon"],
    andAnyTags: ["scenario_losangeles_active"],
    minMessages: 2,
    priority: 3,
    scenario: loreRogueMercs,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_010",
    category: "",
    world: [],
    key: ["mercenary", "rogue", "transponder", "harassment", "bloodmoon"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Rogue mercenary encounter",
    content: loreRogueMercs,
    disable: false,
    order: 9,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: [
      "angel",
      "angel moreno",
      "angel&co",
      "modeling patron",
      "portfolio",
    ],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 3,
    scenario: loreNPCAngel,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_011",
    category: "",
    world: [],
    key: [
      "angel",
      "angel moreno",
      "angel&co",
      "modeling patron",
      "portfolio",
    ],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "NPC Angel Moreno",
    content: loreNPCAngel,
    disable: false,
    order: 10,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: [
      "malachia",
      "noah",
      "jasper",
      "logan",
      "erik",
      "wulfnic",
      "brothers",
      "family meeting",
    ],
    andAnyTags: ["scenario_losangeles_active"],
    minMessages: 1,
    priority: 4,
    scenario: loreMultiPresence,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_012",
    category: "",
    world: [],
    key: [
      "malachia",
      "noah",
      "jasper",
      "logan",
      "erik",
      "wulfnic",
      "brothers",
      "family meeting",
    ],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Douglas brothers multi-presence",
    content: loreMultiPresence,
    disable: false,
    order: 11,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["sierra", "sisi", "stylist", "pink hair", "influencer", "paparazzi"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 3,
    scenario: loreNPCSierra,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_013",
    category: "",
    world: [],
    key: ["sierra", "sisi", "stylist", "pink hair", "influencer", "paparazzi"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "NPC Sierra (SiSi)",
    content: loreNPCSierra,
    disable: false,
    order: 12,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["scarlett", "scar", "rebel socialite", "yellow convertible"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 2,
    scenario: loreNPCCandidateScarlett,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_015",
    category: "",
    world: [],
    key: ["scarlett", "scar", "rebel socialite", "yellow convertible"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Candidate NPC Scarlett",
    content: loreNPCCandidateScarlett,
    disable: false,
    order: 14,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["romeo", "gray", "romeo gray dean", "toxic ex", "abusive ex", "gang enforcer", "left wrist scar"],
    andAnyTags: ["scenario_losangeles_active"],
    minMessages: 2,
    priority: 3,
    scenario: loreNPCGrayDeferred,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_016",
    category: "",
    world: [],
    key: ["romeo", "gray", "romeo gray dean", "toxic ex", "abusive ex", "gang enforcer", "left wrist scar"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Deferred NPC Romeo Gray Dean",
    content: loreNPCGrayDeferred,
    disable: false,
    order: 15,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["rifle", "maddox", "silver bullets", "gang boss"],
    andAnyTags: ["scenario_losangeles_active"],
    minMessages: 3,
    priority: 2,
    scenario: loreNPCMaddoxDeferred,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_017",
    category: "",
    world: [],
    key: ["rifle", "maddox", "silver bullets", "gang boss"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Deferred NPC Rifle Maddox",
    content: loreNPCMaddoxDeferred,
    disable: false,
    order: 16,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["la underworld", "ballantine", "sinners", "ruaraidh", "jean-luc", "supernatural underworld"],
    andAnyTags: ["scenario_losangeles_active"],
    minMessages: 4,
    priority: 1,
    scenario: loreUnderworldDeferred,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_018",
    category: "",
    world: [],
    key: ["la underworld", "ballantine", "sinners", "ruaraidh", "jean-luc", "supernatural underworld"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "Deferred LA Underworld boundary",
    content: loreUnderworldDeferred,
    disable: false,
    order: 17,
  },
  {
    // === LEGACY RUNTIME FIELDS (Preserved for backward compatibility) ===
    keywords: ["bracket", "boob bracket", "bruins", "ucla", "tournament"],
    andAnyTags: ["scenario_losangeles_active"],
    priority: 3,
    scenario: loreBullsBracket,

    // === CANONICAL SCHEMA v1 FIELDS ===
    uid: "WC_014",
    category: "",
    world: [],
    key: ["bracket", "boob bracket", "bruins", "ucla", "tournament"],
    keysecondary: [],
    related: [],
    tags: [],
    comment: "UCLA Bruins Boob Bracket event",
    content: loreBullsBracket,
    disable: false,
    order: 13,
  },
];

/* === ENGINE PIPELINE (DO NOT MODIFY) === */
function compile(src) {
  var out = [];
  for (var i = 0; i < (src || []).length; i++) {
    var e = src[i],
      n = {};
    if (e) {
      for (var k in e)
        if (Object.prototype.hasOwnProperty.call(e, k)) n[k] = e[k];
      n.keywords = Array.isArray(e.keywords) ? e.keywords.slice(0) : [];
      if (Array.isArray(e.Shifts) && e.Shifts.length) {
        n.Shifts = [];
        for (var j = 0; j < e.Shifts.length; j++) {
          var sh = e.Shifts[j] || {},
            so = {};
          for (var sk in sh)
            if (Object.prototype.hasOwnProperty.call(sh, sk)) so[sk] = sh[sk];
          so.keywords = Array.isArray(sh.keywords) ? sh.keywords.slice(0) : [];
          n.Shifts.push(so);
        }
      } else delete n.Shifts;
    }
    out.push(n);
  }
  return out;
}
var _EL = compile(typeof dynamicLore !== "undefined" ? dynamicLore : []);
var bks = [null, [], [], [], [], []],
  pkd = {};
function mTS() {
  return Object.create(null);
}
var tS = mTS(),
  ptS = mTS();
function hT(s, k) {
  return s[String(k)] === 1;
}
function aT(s, k) {
  s[String(k)] = 1;
}
function isAO(e) {
  return (
    !(e && e.keywords && e.keywords.length) &&
    !(e && e.tag) &&
    e &&
    e.minMessages == null &&
    e &&
    e.maxMessages == null
  );
}
function pP(e, aTS) {
  var mn = e && isFinite(e.minMessages) ? +e.minMessages : -Infinity,
    mx = e && isFinite(e.maxMessages) ? +e.maxMessages : Infinity;
  if (messageCount < mn || messageCount > mx) return false;
  var rq = e && e.requires ? e.requires : {},
    any = [].concat(
      (e && e.requireAny) || [],
      (e && e.andAny) || [],
      rq.any || [],
    ),
    all = [].concat(
      (e && e.requireAll) || [],
      (e && e.andAll) || [],
      rq.all || [],
    );
  var nn = [].concat(
      (e && e.requireNone) || [],
      (e && e.notAny) || [],
      rq.none || [],
      (e && e.block) || [],
      (e && e.Block) || [],
    ),
    nll = [].concat((e && e.notAll) || []);
  var hs = function (w) {
    var t = w.toLowerCase().trim();
    if (!t) return false;
    var r =
      t.charAt(t.length - 1) === "*"
        ? t.slice(0, -1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
          "[a-z]*?(?=\\s|$)"
        : t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?=\\s|$)";
    return new RegExp("(?:^|\\s)" + r).test(last);
  };
  if (any.length && !any.some(hs)) return false;
  if (all.length && !all.every(hs)) return false;
  if (nn.length && nn.some(hs)) return false;
  if (nll.length && nll.every(hs)) return false;
  var ayT = (e && e.andAnyTags) || [],
    alT = (e && e.andAllTags) || [],
    nnT = (e && e.notAnyTags) || [],
    nlT = (e && e.notAllTags) || [];
  var ht = function (t) {
    return !!aTS && aTS[String(t)] === 1;
  };
  if (ayT.length && !ayT.some(ht)) return false;
  if (alT.length && !alT.every(ht)) return false;
  if (nnT.length && nnT.some(ht)) return false;
  if (nlT.length && nlT.every(ht)) return false;
  return true;
}
for (var i = 0; i < _EL.length; i++) {
  var e = _EL[i];
  if (
    (isAO(e) ||
      (e.keywords || []).some(function (k) {
        return pP({ requireAny: [k] });
      })) &&
    pP(e, undefined)
  ) {
    bks[
      e && isFinite(e.priority) ? Math.max(1, Math.min(5, +e.priority)) : 3
    ].push(i);
    pkd[i] = 1;
    (e.triggers || []).forEach(function (t) {
      aT(tS, t);
    });
  }
}
for (var j = 0; j < _EL.length; j++) {
  if (!pkd[j]) {
    var ej = _EL[j];
    if (ej && ej.tag && hT(tS, ej.tag) && pP(ej, tS)) {
      bks[
        ej && isFinite(ej.priority) ? Math.max(1, Math.min(5, +ej.priority)) : 3
      ].push(j);
      pkd[j] = 1;
      (ej.triggers || []).forEach(function (t) {
        aT(tS, t);
      });
    }
  }
}
var sel = [],
  pC = 0,
  AL = typeof APPLY_LIMIT === "number" ? APPLY_LIMIT : 999;
for (var p = 5; p >= 1 && pC < AL; p--) {
  for (var b = 0; b < bks[p].length && pC < AL; b++) {
    sel.push(bks[p][b]);
    pC++;
  }
}
var bP = "",
  bS = "";
for (var s = 0; s < sel.length; s++) {
  var es = _EL[sel[s]];
  if (es && es.personality) bP += "\n\n" + es.personality;
  if (es && es.scenario) bS += "\n\n" + es.scenario;
  if (es && es.Shifts) {
    for (var k = 0; k < es.Shifts.length; k++) {
      var sh = es.Shifts[k];
      if (
        (isAO(sh) ||
          (sh.keywords || []).some(function (w) {
            return hasTerm(last, w);
          })) &&
        pP(sh, tS)
      ) {
        (sh.triggers || []).forEach(function (t) {
          aT(ptS, t);
        });
        if (sh.personality) bP += "\n\n" + sh.personality;
        if (sh.scenario) bS += "\n\n" + sh.scenario;
      }
    }
  }
}
var uT = mTS();
for (var tk in tS) if (tS[tk]) uT[tk] = 1;
for (var ptk in ptS) if (ptS[ptk]) uT[ptk] = 1;
for (var l = 0; l < _EL.length; l++) {
  if (!pkd[l]) {
    var el = _EL[l];
    if (el && el.tag && hT(ptS, el.tag) && pP(el, uT)) {
      if (el.personality) bP += "\n\n" + el.personality;
      if (el.scenario) bS += "\n\n" + el.scenario;
    }
  }
}
if (bP) context.character.personality += bP;
if (bS) context.character.scenario += bS;
