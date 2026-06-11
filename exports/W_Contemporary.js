/* ============================================================================
   W_Contemporary.js — World Knowledge Layer
   SvartulfrVerse | Layer 1: FOUNDATION — Knowledge Layer

   Authority: ADR-000, ADR-006, World Authority
   Version: 1.0 — Canon Freeze v1
   Target: JanitorAI ES5 Sandbox

   I/O CONTRACT:
     INPUT:  context.chat.last_message (scanned for keyword triggers)
     OUTPUT: context.character.personality, context.character.scenario

   ARCHITECTURE ROLE:
     This file contains PURE KNOWLEDGE — raw facts about the world.
     It contains ZERO behavioral logic. No instructions, no conditionals
     that direct character actions. Only geography, aesthetics, functions.

   SEPARATION OF CONCERNS:
     En_Core.js = Behavior Layer (HOW the character acts).
     This file  = Knowledge Layer (WHAT exists in the world).
     Never mix the two.

   DATA MODEL:
     Each entry has:
       - keys:      array of trigger keywords (strings)
       - priority:  number (1-5, higher = more important)
       - content:   string (pure factual description, third person)
   ========================================================================== */


/* ============================================================================
   SECTION 1: ENVIRONMENT GUARDS
   ============================================================================ */

context.character = context.character || {};
context.character.personality = (typeof context.character.personality === "string")
  ? context.character.personality : "";
context.character.scenario = (typeof context.character.scenario === "string")
  ? context.character.scenario : "";


/* ============================================================================
   SECTION 2: CONFIGURATION
   ============================================================================ */

var CFG = {
  DEBUG: 0,
  MAX_ENTRIES_PER_TURN: 4,  // max lore entries injected per turn
  PRIORITY_CUTOFF: 1        // minimum priority to inject (1 = all)
};


/* ============================================================================
   SECTION 3: INPUT NORMALIZATION
   ============================================================================ */

function _str(x) {
  return (x == null ? "" : String(x));
}

function normalizeInput(text) {
  var s = _str(text).toLowerCase();
  s = s.replace(/[^a-z0-9\s'-]/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return " " + s + " ";
}

var rawMessage = _str(
  (context.chat && context.chat.last_message)
    ? context.chat.last_message
    : (context.chat && context.chat.lastMessage)
      ? context.chat.lastMessage
      : ""
);

var msgNorm = normalizeInput(rawMessage);


/* ============================================================================
   SECTION 4: WORLD LORE ENTRIES
   Array of knowledge objects. Each entry is a self-contained lore fact.
   Keys are scanned against user input. On match, content is injected.
   ============================================================================ */

var W_Contemporary = [


  /* --------------------------------------------------------------------------
     ENTRY 1: DOUGLAS ESTATE
     Primary residence and seat of the Douglas-Bloodmoon dynasty.
     Source: database/locations/L_DouglasEstate.md (Active Canon)
     -------------------------------------------------------------------------- */
  {
    keys: [
      "douglas estate", "estate", "beverly hills", "north beverly hills",
      "family home", "family residence", "the mansion", "compound",
      "erik's office", "throne room", "formal dining", "family library",
      "private gardens", "guest wing", "security gatehouse",
      "underground garage", "malachia's east wing", "wulfnic's library",
      "jasper's studio", "alyssa's solarium", "noah's kitchen",
      "sunday lunch", "family dinner", "dinner at the estate"
    ],
    priority: 5,
    content: "The Douglas Estate is the primary residence of the Douglas-Bloodmoon family, located in North Beverly Hills, Los Angeles, California. The property occupies several acres behind a gated compound, combining traditional Beverly Hills architecture with modern security infrastructure. Key areas include: the Main Mansion (formal entertaining and family quarters), the Formal Dining Hall (site of mandatory Sunday lunches that function as informal family government meetings), the Family Library (housing generations of family records), Private Gardens, a Guest Wing, a Security Gatehouse with biometric screening operated by DCC Security, an Underground Garage (housing armored vehicles and vintage cars), and individual private quarters for family members — Erik's office (known as the Throne Room), Malachia's East Wing, Wulfnic's private library and quarters, Jasper's DJ studio, Alyssa's Solarium, and Noah's kitchen access. The Estate operates under 24/7 surveillance by DCC Security — Black Wolf Division. Biometric smartwatch monitoring is active for female family members per family protocol. The Estate is simultaneously a family home and a seat of corporate power — the gravitational center of the Douglas dynasty."
  },


  /* --------------------------------------------------------------------------
     ENTRY 2: THE VERVE
     Exclusive nightclub and social venue in Downtown Los Angeles.
     Source: database/locations/L_VerveLounge.md (Active Canon)
     -------------------------------------------------------------------------- */
  {
    keys: [
      "the verve", "verve", "verve lounge", "nightclub", "club",
      "arts district", "dtla", "downtown la", "downtown los angeles",
      "logan's club", "logan's venue", "lounge", "bar",
      "rooftop", "rooftop seating", "vip section", "private vip",
      "main bar", "performance stage", "live music", "art installation",
      "motorcycle display", "harley", "logan's penthouse",
      "safe haven", "pmc-free", "surveillance-free"
    ],
    priority: 4,
    content: "The Verve is an exclusive nightclub and social venue located in the Arts District of Downtown Los Angeles, owned and operated by Logan Douglas. The venue occupies a converted industrial warehouse with preserved architectural elements: exposed brick walls, steel beams, polished concrete floors, high ceilings, and industrial lighting. Access is restricted to members and invited guests only. Key areas include: the Main Bar (craft spirits, reclaimed wood countertop), Elevated Lounge Seating (semi-private leather banquettes overlooking the main floor), a Small Performance Stage (live bands, acoustic sets, spoken word), a Private VIP Section (enclosed area for confidential conversations), rotating Art Installations from local Arts District artists, a restored Harley-Davidson motorcycle on permanent display, and a Rooftop Seating Area with DTLA skyline views. Above the venue, Logan maintains a private penthouse residence with open living space, a personal garage and workshop for motorcycle maintenance, and a private balcony. The Verve's clientele consists of artists, musicians, UCLA students, entrepreneurs, and local creatives — distinct from Beverly Hills high-society or Hollywood entertainment crowds. Logan has established the venue as PMC-free territory; DCC Security does not operate within its walls, making it the only space where family members can interact without biometric surveillance."
  },


  /* --------------------------------------------------------------------------
     ENTRY 3: DCC SECURITY — BLACK WOLF DIVISION
     Private military contractor providing family and corporate security.
     Source: database/institutions/I_DCC_Security_BlackWolf.md (Active Canon)
     NOTE: Vanguard PMC was superseded by DCC Security Black Wolf Division.
           Malachia Douglas-Bloodmoon is an Executive Successor Candidate
           under mentorship — he holds no operational command.
     -------------------------------------------------------------------------- */
  {
    keys: [
      "dcc security", "black wolf", "black wolf division", "security",
      "pmc", "private military", "bodyguard", "protection detail",
      "kaladin", "kaladin nargathon", "marcus", "marcus thornfield",
      "iron", "executive protection", "security team", "surveillance",
      "biometric", "smartwatch", "perimeter", "armed patrol",
      "threat assessment", "crisis response", "malachia security",
      "vanguard", "vanguard pmc", "vanguard security"
    ],
    priority: 4,
    content: "DCC Security — Black Wolf Division is the Private Military Contractor division under the Douglas Commerce Company (DCC) corporate structure, providing absolute protection of the Douglas family and DCC assets. The Division operates globally with its primary base in Los Angeles, California. Organizational hierarchy: Erik Douglas (CEO, ultimate authority) oversees Kaladin Nargathon (Director of DCC Security, former Major, Special Forces), who oversees Marcus Thornfield (Head of Executive Protection, callsign Iron, former Special Forces Gamma-7 operator). Marcus Thornfield's primary assignment is the protection detail for Alyssa Douglas-Bloodmoon. Malachia Douglas-Bloodmoon holds the status of Executive Successor Candidate and is under mentorship with Kaladin Nargathon, but holds no operational command authority. The Division's capabilities include 24/7 armed perimeter patrols, biometric entry screening, CCTV coverage, threat assessment, intelligence gathering, rapid extraction protocols, and executive movement security. The name Black Wolf originated as Kaladin Nargathon's operational codename during Special Forces service; its connection to Svartulfr heritage (Black Wolves) is a narrative coincidence noted by Erik Douglas. The previous Vanguard PMC organization was superseded by the current DCC Security structure."
  },


  /* --------------------------------------------------------------------------
     ENTRY 4: UCLA (UNIVERSITY OF CALIFORNIA, LOS ANGELES)
     Academic institution and primary setting for student-aged characters.
     Source: database/institutions/I_UCLA.md,
            database/locations/L_UCLACampus.md (Active Canon)
     -------------------------------------------------------------------------- */
  {
    keys: [
      "ucla", "university", "college", "campus", "westwood",
      "bruin", "bruins", "blue and gold", "joe bruin",
      "royce hall", "powell library", "bruin walk", "bruin plaza",
      "ackerman union", "kerckhoff hall", "janss steps",
      "pauley pavilion", "wooden center", "sunset recreation",
      "sunset rec", "student union", "library", "lecture",
      "class", "professor", "professor's office", "dorm", "dorms",
      "residence hall", "housing", "greek life", "fraternity",
      "sorority", "ksa", "kappa sigma alpha", "rush",
      "student government", "usac", "undergraduate",
      "westwood village", "gayley ave", "broxton",
      "football", "rose bowl", "big ten", "usc rivalry",
      "victory bell", "study group", "finals", "midterm",
      "tuition", "financial aid", "pre-med", "pre-law",
      "engineering", "law school", "3l", "jd candidate",
      "phd", "sport sciences", "first-year", "freshman",
      "sophomore", "junior", "senior", "graduation"
    ],
    priority: 3,
    content: "The University of California, Los Angeles (UCLA) is a major public research university located in the Westwood neighborhood of Los Angeles, California. The campus spans approximately 405 acres with a student body of roughly 45,000. School colors are blue and gold; the mascot is Joe Bruin (and Josephine Bruin); the athletic teams compete in the Big Ten Conference. Key campus landmarks include: Royce Hall (twin-towered Italian Romanesque Revival building, the university's visual symbol, housing an 1,800-seat auditorium), Powell Library (main undergraduate library), Bruin Walk (central pedestrian corridor and primary foot traffic artery), Bruin Plaza (open concrete plaza for outdoor gatherings and rallies), Ackerman Union (primary student union with dining, meeting rooms, and organization offices), Kerckhoff Hall (student government and media organization offices), Janss Steps (iconic stepped walkway connecting upper and lower campus), Pauley Pavilion (basketball arena, approximately 13,800 seats), and Sunset Recreation Center (primary fitness and recreation facility). UCLA hosts over 1,000 registered student organizations and approximately 60 Greek Life organizations with roughly 4,100 participating students (approximately 13 percent undergraduate participation). The Kappa Sigma Alpha (KSA) fraternity holds multi-generational significance for the Douglas-Bloodmoon family. The Undergraduate Students Association Council (USAC) serves as student government. The UCLA-USC rivalry is one of the most storied in American collegiate athletics, with the Victory Bell (a 295-pound Southern Pacific locomotive bell) awarded to the annual football game winner. The campus functions as the primary academic and social setting for student-aged characters — a space of relative autonomy from family control, though DCC Security surveillance (biometric watches, periodic presence) extends to campus boundaries."
  }


];


/* ============================================================================
   SECTION 5: KEYWORD SCANNING ENGINE
   Scans normalized user input against all entry keys.
   Collects matches, sorts by priority, injects top entries.
   ============================================================================ */

function scanEntries(message, entries) {
  var matches = [];
  var i, j, entry, key;
  for (i = 0; i < entries.length; i++) {
    entry = entries[i];
    for (j = 0; j < entry.keys.length; j++) {
      key = entry.keys[j];
      if (message.indexOf(key) !== -1) {
        matches.push(entry);
        break;
      }
    }
  }
  return matches;
}

function sortByPriority(entries) {
  var sorted = [];
  var i;
  for (i = 0; i < entries.length; i++) {
    sorted.push(entries[i]);
  }
  sorted.sort(function(a, b) {
    return (b.priority || 0) - (a.priority || 0);
  });
  return sorted;
}

function injectEntries(entries, maxEntries) {
  var bufP = "";
  var bufS = "";
  var i, entry, p;
  for (i = 0; i < entries.length && i < maxEntries; i++) {
    entry = entries[i];
    p = entry.priority || 1;
    if (p < CFG.PRIORITY_CUTOFF) continue;
    bufP += "\n\n[World Knowledge | Priority " + p + "] " + entry.content;
    bufS += "\n\n[Setting Context] " + entry.content;
  }
  if (bufP) context.character.personality += bufP;
  if (bufS) context.character.scenario += bufS;
}


/* ============================================================================
   SECTION 6: EXECUTION
   ============================================================================ */

var matchedEntries = scanEntries(msgNorm, W_Contemporary);
var sortedEntries = sortByPriority(matchedEntries);
injectEntries(sortedEntries, CFG.MAX_ENTRIES_PER_TURN);


/* ============================================================================
   SECTION 7: DEBUG OUTPUT
   ============================================================================ */

if (CFG.DEBUG) {
  var dbg = "\n\n[DBG] W_Contemporary v1.0 | Scanned: " + W_Contemporary.length + " entries | Matched: " + matchedEntries.length;
  var i;
  for (i = 0; i < matchedEntries.length; i++) {
    dbg += "\n[DBG] Match[" + i + "] priority=" + (matchedEntries[i].priority || 0) + " keys=" + matchedEntries[i].keys[0] + "...";
  }
  context.character.personality += dbg;
}


/* ============================================================================
   END OF W_Contemporary.js
   ============================================================================ */
