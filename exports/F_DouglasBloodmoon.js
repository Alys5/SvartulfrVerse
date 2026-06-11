/* ============================================================================
   F_DouglasBloodmoon.js - Family Knowledge Layer
   SvartulfrVerse | Layer 2: DYNASTY - Shared Family Knowledge

   Authority: ADR-001, ADR-002, Family Authority
   Version: 1.0 - Canon Freeze v1
   Target: JanitorAI ES5 Sandbox

   I/O CONTRACT:
     INPUT:  context.chat.last_message or context.chat.lastMessage
     OUTPUT: context.character.personality, context.character.scenario

   ARCHITECTURE ROLE:
     This file contains PURE FAMILY KNOWLEDGE - raw genealogical facts,
     dynastic history, and family relationship data. It contains ZERO
     behavioral logic. No instructions, no conditionals that direct
     character actions. Only facts about the family as an entity.

   SEPARATION OF CONCERNS:
     En_Core.js        = Behavior Layer (HOW the character acts).
     W_Contemporary.js = World Knowledge Layer (WHAT exists in the world).
     This file         = Family Knowledge Layer (WHO the family is).
     Never mix the three.

   CANON FILTER - ONLY HUMAN:
     All content has been filtered through the Only Human baseline.
     No supernatural, paranormal, or sci-fi elements are present.
     Legacy references have been translated to their canonical human
     equivalents:
       - "Alpha/Omega/Beta" hierarchy -> Corporate/Family hierarchy
       - "Pack" -> Dynasty / Family unit
       - "Lupine/Werewolf" -> Human (no supernatural attributes)
       - "Howl/Bond" -> Family loyalty / Corporate allegiance
       - "Territory" -> Business territory / Geographic sphere of influence
       - "Feral" -> Uncontrolled / Rebellious
       - "Marking" -> Branding / Corporate identity

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
context.variables = context.variables || {};

context.character.personality = (typeof context.character.personality === "string")
  ? context.character.personality : "";
context.character.scenario = (typeof context.character.scenario === "string")
  ? context.character.scenario : "";

if (!context.variables.svartulfr_state || typeof context.variables.svartulfr_state !== "object") {
  context.variables.svartulfr_state = {};
}

var CFG = {
  DEBUG: 0,
  MAX_ENTRIES_PER_TURN: 3,
  PRIORITY_CUTOFF: 1,
  FAMILY_ID: "F_DouglasBloodmoon"
};


/* ============================================================================
   SECTION 2: STATE HELPERS
   ============================================================================ */

function _str(x) {
  return (x == null ? "" : String(x));
}

function _ensurePeriod(text) {
  var s = _str(text).replace(/\s+$/g, "");
  if (!s) { return ""; }
  var c = s.charAt(s.length - 1);
  return (c === "." || c === "!" || c === "?") ? s : (s + ".");
}

function _sanitizeOutput(text) {
  if (typeof text !== "string") {
    return text;
  }
  var s = text.replace(/[\u2014\u2013]/g, "...");
  s = s.replace(/\.\.\.\.\.\./g, "...");
  s = s.replace(/  +/g, " ");
  return s;
}

var runtimeState = context.variables.svartulfr_state;
runtimeState.runtime_flags = runtimeState.runtime_flags || {};
runtimeState.family_knowledge = runtimeState.family_knowledge || {};
runtimeState.family_knowledge[CFG.FAMILY_ID] = runtimeState.family_knowledge[CFG.FAMILY_ID] || {};

var familyState = runtimeState.family_knowledge[CFG.FAMILY_ID];

function _hasSeenEntry(entry) {
  var id = _entryId(entry);
  return !!familyState[id];
}

function _markSeen(entry) {
  var id = _entryId(entry);
  familyState[id] = "1";
}

function _entryId(entry) {
  return "entry_" + ((entry && entry.id) ? entry.id : "unknown");
}

function _append(personality, scenario) {
  if (personality) {
    context.character.personality += "\n\n" + _ensurePeriod(personality);
  }
  if (scenario) {
    context.character.scenario += "\n\n" + _ensurePeriod(scenario);
  }
}


/* ============================================================================
   SECTION 3: INPUT NORMALIZATION
   ============================================================================ */

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
   SECTION 4: FAMILY LORE ENTRIES
   Array of knowledge objects. Each entry is a self-contained family fact.
   Keys are scanned against user input. On match, content is injected.
   ============================================================================ */

var F_DouglasBloodmoon = [


  /* --------------------------------------------------------------------------
     ENTRY 1: THE DYNASTIC UNION
     The foundational union between Erik Douglas and Nixara Bloodmoon
     that merged two dynasties and created the current empire.
     Source: database/families/F_Douglas_Bloodmoon.md
            database/families/F_Marriages.md
            database/characters/C_Erik_Douglas.md
            database/characters/C_Nixara_Bloodmoon.md
     Priority: HIGH (5)
     -------------------------------------------------------------------------- */
  {
    id: "dynastic_union",
    keys: [
      "dynasty", "douglas-bloodmoon", "douglas bloodmoon", "bloodmoon",
      "union", "dynastic union", "marriage", "erik and nixara",
      "founder", "founders", "founding", "origin", "origins",
      "family origin", "bloodline", "bloodlines", "lineage",
      "douglas dynasty", "bloodmoon dynasty", "two dynasties",
      "merge", "merged", "merger", "empire", "dynasty history",
      "family history", "where did the family come from",
      "how did the family start", "family roots", "roots",
      "wulfnic", "wulfnic bloodmoon", "iceland", "icelandic",
      "england", "english", "1700s", "immigration", "migration"
    ],
    priority: 5,
    content: "The Douglas-Bloodmoon dynasty was founded through the union of Erik Douglas and Nixara Bloodmoon. Erik Douglas is the patriarch of the Douglas Dynasty, an American corporate dynasty with origins in England dating to the 1700s migration. He serves as CEO of Douglas Commerce Company (DCC) and controls a vast corporate empire spanning finance, logistics, and legal influence. Nixara Bloodmoon (born 1975, died 2005) was the daughter of Wulfnic Bloodmoon, the first American representative of the Bloodmoon Dynasty with origins in Iceland. Nixara carried pure Bloodmoon visual DNA - blonde hair, ice-blue eyes, petite hourglass build - and served as the primary maternal morphological template for the first generation heirs. The union between Erik and Nixara merged two distinct bloodlines into the hyphenated Douglas-Bloodmoon line. The marriage took place around 1996 (the couple met in 1994). Nixara died in 2005 during childbirth, delivering the twins Jasper and Alyssa. The union produced four heirs: Malachia (born 1996), Noah (born 1999), and the twins Jasper and Alyssa (born 2005). All four carry the mandatory hyphenated surname Douglas-Bloodmoon as first-generation heirs. Erik Douglas has not remarried since Nixara's death."
  },


  /* --------------------------------------------------------------------------
     ENTRY 2: SECURITY & MOONSTONE PROTOCOLS
     Erik Douglas's extreme security measures for family protection,
     including 24/7 biometric monitoring via smartwatch (Moonstone)
     and restrictions on unescorted movement.
     Source: database/locations/L_DouglasEstate.md
            database/institutions/I_DCC_Security_BlackWolf.md
            database/characters/C_Alyssa_Douglas_Bloodmoon.md
     Priority: HIGH (5)
     -------------------------------------------------------------------------- */
  {
    id: "security_moonstone_protocols",
    keys: [
      "security", "moonstone", "biometric", "smartwatch", "monitoring",
      "surveillance", "tracking", "gps", "restrictions", "protocol",
      "protocols", "protection", "protected", "protect", "safety",
      "safe", "danger", "threat", "risk", "security detail",
      "bodyguard", "escort", "unescorted", "movement", "curfew",
      "locked down", "lockdown", "gate", "gated", "perimeter",
      "cctv", "camera", "cameras", "alarm", "alarms",
      "erik security", "family security", "dcc security",
      "black wolf", "black wolf division", "kaladin",
      "kaladin nargathon", "marcus", "marcus thornfield",
      "iron", "executive protection", "protection detail",
      "alyssa protection", "alyssa detail", "overprotective",
      "overprotection", "paranoia", "erik paranoia",
      "control", "controlled", "freedom", "restricted",
      "cannot leave", "not allowed", "forbidden", "permission",
      "ask permission", "father permission", "erik permission"
    ],
    priority: 5,
    content: "Erik Douglas maintains extreme security protocols for all family members, driven by the trauma of losing his wife Nixara in 2005. The security infrastructure is operated by DCC Security - Black Wolf Division, a Private Military Contractor under the DCC corporate structure. The Division is directed by Kaladin Nargathon (former Major, Special Forces) and includes Marcus Thornfield (callsign Iron, former Special Forces Gamma-7 operator) as Head of Executive Protection. The primary security measures include: 24/7 biometric monitoring via smartwatch (internally designated Moonstone) for female family members, with GPS tracking, vital sign monitoring, and emergency alert capability; mandatory executive protection detail for unescorted movement outside family-controlled properties; biometric screening at all entry points to the Douglas Estate (gatehouse, garage, private quarters); CCTV coverage across all family properties; rapid extraction protocols for crisis scenarios; and movement restrictions requiring advance authorization for travel outside approved zones. Alyssa Douglas-Bloodmoon is the most heavily protected family member, with Marcus Thornfield assigned as her primary protection officer. The younger family members - particularly Jasper - view these restrictions as excessive and a source of ongoing tension. Erik considers the security measures non-negotiable and views them as the minimum necessary response to the threats facing a family of their profile."
  },


  /* --------------------------------------------------------------------------
     ENTRY 3: THE CORE LINE (THE SIBLINGS)
     Summary of the four Douglas-Bloodmoon heirs and the family
     dynamics of hyper-protection surrounding the youngest sibling.
     Source: database/characters/C_Malachia_Douglas_Bloodmoon.md
            database/characters/C_Noah_Douglas_Bloodmoon.md
            database/characters/C_Jasper_Douglas_Bloodmoon.md
            database/characters/C_Alyssa_Douglas_Bloodmoon.md
            database/families/F_Parent_Child.md
     Priority: HIGH (4)
     -------------------------------------------------------------------------- */
  {
    id: "core_line_siblings",
    keys: [
      "siblings", "sibling", "brothers", "brother", "sisters", "sister",
      "family", "family members", "the children", "the kids",
      "heirs", "heir", "children", "kids", "offspring",
      "malachia", "noah", "jasper", "alyssa",
      "douglas-bloodmoon children", "first generation",
      "the four", "four siblings", "four heirs",
      "twin", "twins", "twin sister", "twin brother",
      "older brother", "older brothers", "younger sister",
      "little sister", "baby sister", "youngest",
      "protect alyssa", "alyssa protection", "overprotective brothers",
      "brothers protect", "shield", "shielding", "guarding",
      "executive successor", "successor", "heir apparent",
      "phd", "sport sciences", "boxing", "mma", "athlete",
      "law school", "law student", "3l", "jd", "diplomat",
      "diplomatic", "lawyer", "legal", "attorney",
      "dj", "dj frequency", "music", "underground", "rebel",
      "rebellious", "anti-establishment", "engineering",
      "pre-med", "medical", "neuropsychiatry", "biogenetics",
      "modeling", "model", "angel", "angel moreno",
      "ksa", "kappa sigma alpha", "fraternity", "legacy",
      "ucla", "bruins", "bruin",
      "erik children", "erik's kids", "erik's children",
      "nixara children", "nixara's kids",
      "family dynamic", "family dynamics", "family roles",
      "roles in family", "family structure"
    ],
    priority: 4,
    content: "The Douglas-Bloodmoon first generation consists of four siblings, all born to Erik Douglas and the late Nixara Bloodmoon. Malachia Douglas-Bloodmoon (age 28, born 1996) is the eldest and serves as Executive Successor Candidate. He is a 5th-Year PhD Candidate in Sport Sciences at UCLA, a former full athletic scholarship recipient, and a professional boxer and MMA fighter in the heavyweight division. He is an Alumni Member of the Kappa Sigma Alpha (KSA) fraternity. His visual phenotype is Douglas-dominant: black hair, amber eyes, tank-like build, 210 cm height. He is under mentorship with Kaladin Nargathon for corporate administration and security governance training. Noah Douglas-Bloodmoon (age 25, born 1999) is the second-born and functions as the family's diplomatic and legal mind. He is a 3L Juris Doctor Candidate at UCLA School of Law and an Alumni Member of KSA. His visual phenotype is Bloodmoon-dominant: blonde hair, blue eyes, lithe elegant build, 196 cm height. He is known within the family as the peacemaker and negotiator. Jasper Douglas-Bloodmoon (age 19, born April 22, 2005) is the third-born and the twin brother of Alyssa. He is a First-Year Engineering undergraduate at UCLA and carries Legacy Eligibility for KSA but explicitly refuses recruitment. His visual phenotype is a fusion blend: caramel-brown hair, mint green eyes, lean athletic build, 191 cm height. He leads a double life as DJ Frequency, an underground electronic music performer. He is characterized as rebellious, anti-establishment, tech-oriented, and protective of his twin sister. Alyssa Douglas-Bloodmoon (age 19, born April 22, 2005) is the youngest sibling and the twin sister of Jasper. She is a First-Year Pre-Med undergraduate at UCLA with a 3.8 GPA, aspiring toward neuropsychiatry or biogenetics. Her visual phenotype shows the strongest Nixara resemblance: caramel-brown hair, mint green eyes, petite hourglass build, 165 cm height. She is characterized as affectionate, trusting, gentle, and deeply family-oriented. The siblings form the core internal unit of the Douglas-Bloodmoon dynasty."
  }


];


/* ============================================================================
   SECTION 5: KEYWORD SCANNING ENGINE
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
    if (_hasSeenEntry(entry)) {
      continue;
    }
    p = entry.priority || 1;
    if (p < CFG.PRIORITY_CUTOFF) continue;
    bufP += "\n\n[Family Knowledge | Priority " + p + "] " + entry.content;
    bufS += "\n\n[Family Context] " + entry.content;
    _markSeen(entry);
  }
  _append(bufP, bufS);
}


/* ============================================================================
   SECTION 6: EXECUTION
   ============================================================================ */

var matchedEntries = scanEntries(msgNorm, F_DouglasBloodmoon);
var sortedEntries = sortByPriority(matchedEntries);
injectEntries(sortedEntries, CFG.MAX_ENTRIES_PER_TURN);


/* ============================================================================
   SECTION 7: DEBUG OUTPUT
   ============================================================================ */

if (CFG.DEBUG) {
  var dbg = "\n\n[DBG] F_DouglasBloodmoon v1.0 | Scanned: " + F_DouglasBloodmoon.length + " entries | Matched: " + matchedEntries.length;
  var i;
  for (i = 0; i < matchedEntries.length; i++) {
    dbg += "\n[DBG] Match[" + i + "] priority=" + (matchedEntries[i].priority || 0) + " keys=" + matchedEntries[i].keys[0] + "...";
  }
  context.character.personality += dbg;
}


/* ============================================================================
   SECTION 8: SANITIZE OUTPUT
   ============================================================================ */

context.character.scenario = _sanitizeOutput(context.character.scenario);
context.character.personality = _sanitizeOutput(context.character.personality);


/* ============================================================================
   END OF F_DouglasBloodmoon.js
   ============================================================================ */
