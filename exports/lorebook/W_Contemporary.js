/* ============================================================================
   W_CONTEMPORARY — World Layer Lorebook (Advanced Script)
   Platform: JanitorAI — Advanced Script (Always-On, Mode A)
   Canon: SvartulfrVerse Canon Freeze v1.0
   Author: SvartulfrVerse Workspace Architecture

   Purpose:
     Inject canonical world facts into context via keyword-triggered and
     always-on lorebook entries. Pure Knowledge layer — no behavior logic,
     no character identity, no genealogy.

   Sources (database/):
     - database/worlds/W_Contemporary.md
     - database/locations/L_DouglasEstate.md
     - database/locations/L_VerveLounge.md
     - database/locations/L_DouglasCustoms.md
     - database/locations/L_UCLACampus.md
     - database/locations/L_LosAngeles.md
     - database/locations/L_SevenHills.md
     - database/locations/L_SantaMonicaWaterfront.md
     - database/locations/L_RoseBowl.md
     - database/institutions/I_DCC_Security_BlackWolf.md
     - database/institutions/I_AngelAndCo.md
     - database/institutions/I_UCLA.md
     - database/visuals/V_Visual_Baseline.md

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
   ========================================================================== */


/* ============================================================================
   [SECTION] GLOBAL KNOBS
   ========================================================================== */
var DEBUG       = 0;
var APPLY_LIMIT = 6;


/* ============================================================================
   [SECTION] OUTPUT GUARDS
   ========================================================================== */
context.character = context.character || {};
context.character.personality = (typeof context.character.personality === "string")
  ? context.character.personality : "";
context.character.scenario = (typeof context.character.scenario === "string")
  ? context.character.scenario : "";

/* Inter-module state bus (for future En_Core / F_Douglas_Bloodmoon IPC) */
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
   W_Contemporary World Layer — SvartulfrVerse Canon Freeze v1.0
   ========================================================================== */
var dynamicLore = [

  /* ─────────────────────────────────────────────────────────────────────────
     L0 — ALWAYS-ON: World Baseline
     Source: database/worlds/W_Contemporary.md
     Fires every turn. Minimal token footprint. Establishes the contemporary
     Los Angeles reality, visual DNA, and world rules.
     ───────────────────────────────────────────────────────────────────────── */
  {
    personality: " [World: Contemporary Los Angeles, 2020s] [Canon: Active] [Source: database/worlds/W_Contemporary.md] Species: Human only. Technology: Contemporary. Society: Corporate hierarchy, family power politics. Visual palette: Amber, obsidian, warm cinematic. Lighting: Rembrandt, deep shadows. Atmosphere: Golden hour, smog-filtered. DCC Security — Black Wolf Division protects the Douglas family (Director: Kaladin Nargathon; Head of Exec Protection: Marcus Thornfield). Key locations: Douglas Estate (Beverly Hills), UCLA Campus (Westwood), The Verve (Arts District DTLA), Santa Monica Waterfront (neutral coast). Seven Hills Estate is the Douglas ancestral property (c. 1740, DCC Heritage Site)."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     L1 — Douglas Estate
     Source: database/locations/L_DouglasEstate.md
     Keywords: beverly hills, douglas estate, family compound, throne room,
     sunday lunch, family home, north beverly
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["douglas estate", "beverly hills", "family compound", "throne room", "sunday lunch", "family home", "north beverly", "the mansion"],
    priority: 4,
    triggers: ["wl_douglas_estate"],
    personality: " [Location: Douglas Estate] [Canon: Active] [Source: database/locations/L_DouglasEstate.md] Gated compound in North Beverly Hills — primary family residence and seat of Douglas power. DCC Security — Black Wolf Division maintains 24/7 perimeter. Key areas: Main Mansion (formal Beverly Hills architecture + modern security), Formal Dining Hall (long mahogany table; Sunday lunches = informal family government), Family Library (Wulfnic's domain), Private Gardens, Guest Wing (separate quarters), Security Gatehouse (biometric entry, DCC controlled), Underground Garage (vehicle collection, Jasper's escape route). Occupant zones: Erik's 'Throne Room' (family + corporate governance), Malachia's East Wing, Wulfnic's Private Library (Bloodmoon heritage), Jasper's Studio (DJ equipment, family-tolerated), Alyssa's Solarium (bright, plant-filled), Noah's Kitchen Access (late-night baking). Tone: Old-money prestige, fortress-like, corporate-monarchical with underlying family warmth.",
    scenario: "Record location as the Douglas Estate. The atmosphere balances the warmth of family belonging with the weight of legacy and expectation. Security is omnipresent but not oppressive. Every surface reflects generational wealth."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     L2 — The Verve Lounge
     Source: database/locations/L_VerveLounge.md
     Keywords: verve, arts district, nightclub, live music, rooftop,
     logan's venue, penthouse above
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["verve", "arts district", "nightclub", "live music", "rooftop", "logan's venue", "penthouse", "edison bulbs"],
    priority: 4,
    triggers: ["wl_the_verve"],
    personality: " [Location: The Verve Lounge] [Canon: Active] [Source: database/locations/L_VerveLounge.md] Exclusive upscale lounge and music venue in the Arts District, DTLA. Owned by Logan Douglas. Converted industrial warehouse — exposed brick, steel beams, concrete floors, high ceilings, Edison bulbs. Access by member affiliation or invitation only. Safe haven: PMC-free social territory (DCC Security does NOT operate inside). Key areas: Main Bar (craft spirits, creative cocktails), Elevated Lounge Seating (semi-private), Small Performance Stage (live music, acoustic sets), Private VIP Section (enclosed, controlled access), Art Installations (rotating local artists, Logan-curated), Motorcycle Display (restored Harley-Davidson centerpiece), Rooftop Seating (DTLA skyline views). Logan's Penthouse above: modern clean architecture, motorcycle workshop access. Clientele: artists, musicians, UCLA students, entrepreneurs, local creatives. Tone: Creative, urban, authentic, independent. Selective by cultural alignment, not wealth.",
    scenario: "Record location as The Verve. Creative energy fills the space. Music, art, converging. The space feels naturally grown from the neighborhood — authentic, not imposed. No biometric surveillance inside; this is the family's pressure valve."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     L3 — Douglas Customs Workshop
     Source: database/locations/L_DouglasCustoms.md
     Keywords: douglas customs, workshop, auto shop, garage, logan's shop,
     restoration, fabrication, motorcycle
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["douglas customs", "workshop", "auto shop", "garage", "restoration", "fabrication", "motorcycle", "mechanic"],
    priority: 4,
    triggers: ["wl_douglas_customs"],
    personality: " [Location: Douglas Customs] [Canon: Active] [Source: database/locations/L_DouglasCustoms.md] Logan Douglas's automotive workshop in the Arts District, DTLA — a few blocks from The Verve. Converted industrial property prioritizing function: bay doors, high ceilings, concrete floors, industrial lighting. Specializes in vehicle restoration, customization, fabrication, performance work. Key areas: Restoration Bays (2 full-size vehicle lifts), Fabrication Area (welding, custom metalwork), Motorcycle Workstations (precision tooling), Tool Room (climate-controlled precision collection), Office Mezzanine (overlooks workshop floor), Vehicle Storage (client + project vehicles). Logan's daily rhythm: Morning/Afternoon at workshop, Evening at The Verve. Tone: Industrial, practical, honest, working-class. Logan's chosen profession — craft, not family expectation.",
    scenario: "Record location as Douglas Customs. Oil-stained concrete, the smell of metal and lubricant, tools organized with precision. This is Logan's authentic space — every surface serves a function. No Douglas corporate aesthetic here."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     L4 — UCLA Campus
     Sources: database/locations/L_UCLACampus.md, database/institutions/I_UCLA.md
     Keywords: ucla, westwood, campus, university, college, bruins, student,
     greek life, ksa, fraternity, westwood village
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["ucla", "westwood", "campus", "university", "college", "bruins", "greek life", "ksa", "fraternity", "westwood village", "broxton", "gayley", "powell library", "royce hall", "pauley plaza"],
    priority: 4,
    triggers: ["wl_ucla_campus"],
    personality: " [Location: UCLA Campus] [Canon: Active] [Source: database/locations/L_UCLACampus.md] Major research university in Westwood, Los Angeles. 405 acres, ~45,000 students (Blue and Gold; Big Ten Conference). Primary academic and social hub for the Douglas-Bloodmoon younger generation. Key locations: Royce Hall (twin-towered Italian Romanesque Revival landmark), Powell Library (main undergraduate library), Bruin Walk (central north-south pedestrian corridor), Bruin Plaza (outdoor gathering space), Ackerman Union (student union; dining, meeting rooms, bookstore), Kerckhoff Hall (student government + Daily Bruin newspaper), Janss Steps (iconic campus landmark), Pauley Pavilion (~13,800-seat indoor arena; basketball, major events), Sunset Recreation Center (fitness facility). Social infrastructure: ~60 Greek organizations (~4,100 participants); Kappa Sigma Alpha (KSA) is the multi-generational Douglas-Bloodmoon tradition. USAC = student government. 1,000+ registered student organizations. Sphere of influence: Campus <-> Westwood Village (walking) <-> Century City (car) <-> Santa Monica (weekend). Key student venues: Rocco's Tavern (1000 Gayley Ave; sports bar, watch parties), Barney's Beanery (1037 Broxton Ave; late-night diner-bar), Wolfsglen (1071 Glendon Ave; craft cocktails). Tone: Academic, youthful, diverse, energetic. Relative autonomy from family control.",
    scenario: "Record location as UCLA Campus. The energy of 45,000 students in motion — classes, Greek Life, foot traffic on Bruin Walk, the distant sound of the marching band. Freedom within the family's gravitational pull."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     L5 — Los Angeles (City Overview)
     Source: database/locations/L_LosAngeles.md
     Keywords: los angeles, la, hollywood, santa monica, pasadena, dtla,
     downtown la, century city, westwood village
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["los angeles", "la", "hollywood", "santa monica", "pasadena", "dtla", "downtown la", "century city", "westwood village"],
    priority: 3,
    triggers: ["wl_los_angeles"],
    personality: " [Location: Los Angeles] [Canon: Active] [Source: database/locations/L_LosAngeles.md] Metropolitan setting: ~13 million people across 500+ square miles. Narrative focuses on specific districts. Key districts: Westwood (UCLA district; walkable college-town energy within LA), Century City (corporate power; DCC presence; Westfield Century City mall), Santa Monica (coastal escape ~15-20 min from campus), Hollywood (entertainment industry; nightlife), DTLA (civic/financial core; Arts District), Pasadena (Rose Bowl Stadium). UCLA student movement patterns: Daily: Campus <-> Westwood Village (walking). Weekly: Century City, Brentwood. Weekends: Santa Monica, Hollywood. Major arteries: Wilshire Blvd (east-west), Santa Monica Blvd (to coast), I-405 (north-south freeway). Culture: College sports (UCLA Bruins vs USC Trojans rivalry; Victory Bell), multicultural food landscape, entertainment industry proximity. Tone: Sprawling, diverse, wealth disparity between Beverly Hills compounds and East LA streets, car-dependent, culturally rich.",
    scenario: "Record the ambient texture of Los Angeles — the specific district the scene occupies determines light, sound, crowd density, and social atmosphere."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     L6 — Seven Hills Estate (Ancestral)
     Source: database/locations/L_SevenHills.md
     Keywords: seven hills, ancestral estate, dcc heritage site, training camp,
     country house, douglas ancestral
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["seven hills", "ancestral estate", "dcc heritage site", "training camp", "country house", "woodland", "forest reserve"],
    priority: 4,
    triggers: ["wl_seven_hills"],
    personality: " [Location: Seven Hills Estate] [Canon: Active Institution + Historical Estate] [Source: database/locations/L_SevenHills.md] Ancestral seat of the Douglas family in California — held since c. 1740 (colonial DCC regional headquarters). British Georgian villa (symmetrical facade, multi-pane sash windows, brick) contrasting with surrounding Spanish colonial architecture. Founded by Lord Douglas as a trading post under special license from the Viceroy of New Spain. Current use: Private family 'country house,' training camp, weekend retreat. Key areas: The Villa (Great Hall = original DCC trading floor; Governor's Study preserved; Library with 1700s DCC records), Woodland Reserve (original 17th-century forest; training grounds; trail network), Training Camp (outdoor boxing ring, strength/conditioning, biomechanics observation deck, recovery), Gardens and Grounds (formal English design + California landscape). Current significance: Deepest historical anchor in SvartulfrVerse (300+ years). Primary training base for Malachia Douglas-Bloodmoon. Lighter security than Beverly Hills. Historical lineage: 1666 (Merchant House) -> 1700s (Colonial Trading Company) -> c. 1740 (Seven Hills HQ) -> 1820s (private estate) -> Present. Tone: Historical, grounded, private, weighty. Quiet authority — commercial legacy, not corporate display.",
    scenario: "Record location as Seven Hills Estate. The oldest Douglas presence in California; history embedded in every wall. The forest wraps around the villa like a living archive. This is continuity incarnate."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     L7 — Santa Monica Waterfront
     Source: database/locations/L_SantaMonicaWaterfront.md
     Keywords: santa monica, beach, pier, coast, waterfront, ocean,
     boardwalk, third street promenade, main street
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["santa monica", "beach", "pier", "coast", "waterfront", "ocean", "boardwalk", "third street promenade", "main street"],
    priority: 4,
    triggers: ["wl_santa_monica"],
    personality: " [Location: Santa Monica Waterfront] [Canon: Active] [Source: database/locations/L_SantaMonicaWaterfront.md] Coastal recreation zone ~15-20 min by car from UCLA, ~25 min from Beverly Hills, ~35 min from Arts District. Neutral territory — not controlled by Douglas family, campus, or Logan's sphere. Key zones: Santa Monica Beach (wide sand, volleyball courts, bike path), Santa Monica Pier (amusement park, arcade, food vendors, ocean views), Third Street Promenade / Santa Monica Place (shopping/dining district), Main Street (restaurant/bar corridor), Bike Path / The Strand (coastal cycling south toward Venice Beach). Character access: Douglas family (full financial access but DCC Security may follow), UCLA students (standard weekend territory; group outings), Logan (farthest away; visits less frequently). Functions as: date setting, friend gatherings, summer events, casual social scenes, escape/decompression. Seasonal variation: Summer peak activity (beach parties, bonfires), Spring/Fall moderate, Winter indoor restaurant/bar scenes. Tone: Relaxed, recreational, coastal, open to all. Most emotionally accessible location in SvartulfrVerse.",
    scenario: "Record location as Santa Monica Waterfront. The Pacific provides psychological distance from problems. Ocean air, open sky, no biometric surveillance. This is where characters can breathe."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     L8 — DCC Security — Black Wolf Division
     Source: database/institutions/I_DCC_Security_BlackWolf.md
     Keywords: dcc security, black wolf, security, pmc, private military,
     kaladin, marcus thornfield, protection detail, surveillance, biometric
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["dcc security", "black wolf", "private military", "surveillance", "biometric", "protection detail", "kaladin", "marcus thornfield"],
    priority: 4,
    triggers: ["wl_dcc_security"],
    personality: " [Institution: DCC Security — Black Wolf Division] [Canon: Active] [Source: database/institutions/I_DCC_Security_BlackWolf.md] Private military contractor division under DCC corporate structure. Mission: Absolute protection of Douglas family and DCC assets. Structure: Erik Douglas (CEO) -> Kaladin Nargathon (Director of DCC Security; former Major, Special Forces) -> Marcus Thornfield / 'Iron' (Head of Executive Protection; former Gamma-7 operator; primary assignment: Alyssa Douglas-Bloodmoon) -> Executive Protection Teams. Operational scope: Family protection, asset security, threat assessment, surveillance, rapid response, intelligence gathering. Primary focus: Los Angeles; capability: global. Vanguard PMC (previous entity) has been superseded by this Division. 'Black Wolf' naming: Kaladin's Special Forces codename — connection to Svartulfr heritage is a narrative easter egg, NOT supernatural. Tone: Professional, omnipresent, protective. The family's security blanket and the younger generation's surveillance shadow.",
    scenario: "Record institutional presence when security protocols, perimeter checks, or DCC personnel are referenced. Biometric smartwatches (female family members). 24/7 perimeter patrols at the Estate. The Verve Lounge and Seven Hills operate with reduced DCC presence."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     L9 — Angel & Co
     Source: database/institutions/I_AngelAndCo.md
     Keywords: angel & co, angel moreno, photography studio, fashion
     photography, modeling, photo shoot
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["angel & co", "angel moreno", "photography studio", "fashion photography", "modeling", "photo shoot"],
    priority: 3,
    triggers: ["wl_angel_co"],
    personality: " [Institution: Angel & Co] [Canon: Active] [Source: database/institutions/I_AngelAndCo.md] Boutique fashion photography studio in Los Angeles. Founded by Angel Moreno (professional photographer). Activities: Fashion photography, editorial photography, advertising campaigns, model scouting, talent management. Scale: Boutique — NOT global empire. Significance: Angel Moreno's professional base; provides Alyssa Douglas-Bloodmoon's first independent professional opportunity outside Douglas family structure (modeling patronage). Independent from family presence.",
    scenario: "Record institutional presence when photography, modeling sessions, or fashion industry contexts are active. Boutique scale — personal, curated, not corporate."
  },

  /* ─────────────────────────────────────────────────────────────────────────
     L10 — Rose Bowl Stadium
     Source: database/locations/L_RoseBowl.md
     Keywords: rose bowl, pasadena, football, ucla football, bruins football,
     stadium, usc game, victory bell, game day
     ───────────────────────────────────────────────────────────────────────── */
  {
    keywords: ["rose bowl", "pasadena", "football", "ucla football", "bruins football", "victory bell", "game day", "usc game"],
    priority: 3,
    triggers: ["wl_rose_bowl"],
    personality: " [Location: Rose Bowl Stadium] [Canon: Active] [Source: database/locations/L_RoseBowl.md] Home venue of UCLA Bruins football. Located in Pasadena (~25 miles northeast of UCLA). Capacity: ~88,000. One of the most iconic US sports venues. Relevance: Largest informal social gathering of the UCLA academic year. The annual UCLA–USC football game is the single biggest social event of the year. Victory Bell (295-lb locomotive bell) is the rivalry trophy. Academic connection: Malachia Douglas-Bloodmoon's PhD Sport Sciences research applies at scale here (biomechanics, crowd psychology). Pre-game: Tailgating in Arroyo Seco, Bruin Walk procession. During game: Bowl-shaped intimacy despite size, San Gabriel Mountains backdrop. Tone: Public spectacle, institutional pride, family visibility.",
    scenario: "Record location/stadium presence when UCLA athletics, football culture, game days, or the USC rivalry are active. ~88,000 seats = maximum public visibility for family dynamics."
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

/* Pass 1: Direct keyword hit + always-on */
for (var i1 = 0; i1 < _ENGINE_LORE.length; i1++) {
  var e1 = _ENGINE_LORE[i1];
  var hit = isAlwaysOn(e1) || getKW(e1).some(function (kw) { return hasTerm(last, kw); });
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
    var activated = isAlwaysOn(sh) || getKW(sh).some(function (kw) { return hasTerm(last, kw); });
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
