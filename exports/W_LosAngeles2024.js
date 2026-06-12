/* ==========================================================================
   Advanced Lorebook Runtime - World Layer
   SvartulfrVerse | W_ Lorebook Runtime | ES6-safe JanitorAI sandbox
   Target: JanitorAI Advanced Script
   ========================================================================== */

context.character = context.character || {};

if (typeof context.character.personality !== 'string') { context.character.personality = ''; }
if (typeof context.character.scenario !== 'string') { context.character.scenario = ''; }

var LOREBOOK_CONFIG = {
  type: 'world',
  prefix: 'W_',
  stateKey: 'world_lorebook_applied',
  maxEntries: 4,
  "alwaysOn": false,
  "seed": 42
};

var dynamicLore = [
  {
    "id": "W_active_canon_boundary",
    "priority": 5,
    "keywords": [
      "world",
      "setting",
      "active canon",
      "canon",
      "contemporary",
      "los angeles"
    ],
    "personality": "World Authority boundary: keep active scene details inside the sourced W_ world layer and do not invent unverified world facts.",
    "scenario": "Record W_ active canon boundary."
  },
  {
    "id": "W_location_boundary",
    "priority": 4,
    "keywords": [
      "location",
      "where is",
      "place",
      "estate",
      "ucla",
      "verve",
      "douglas customs",
      "santa monica"
    ],
    "personality": "Location boundary: named places must come from sourced W_ location records and remain contemporary human settings.",
    "scenario": "Record location query as W_ context."
  },
  {
    "id": "W_visual_context",
    "priority": 3,
    "keywords": [
      "visual",
      "appearance",
      "style",
      "lighting",
      "mood",
      "color palette"
    ],
    "personality": "Visual boundary: keep visual framing aligned with W_ world DNA and character identity anchors.",
    "scenario": "Record visual context as world framing only."
  },
  {
    "id": "W_institution_boundary",
    "priority": 3,
    "keywords": [
      "institution",
      "organization",
      "dcc",
      "ucla",
      "ksa",
      "usac",
      "angel and co"
    ],
    "personality": "Institution boundary: organizations are sourced W_ and institution-layer facts, not runtime inventions.",
    "scenario": "Record institution query as sourced context."
  },
  {
    "id": "W_Contemporary",
    "priority": 5,
    "keywords": [
      "w_contemporary",
      "contemporary world",
      "los angeles",
      "active canon",
      "human only"
    ],
    "personality": "Source: database/worlds/W_Contemporary.md. W_Contemporary defines the 2020s Los Angeles active canon baseline: contemporary human-only world, corporate dynasty, high society, urban luxury, amber and obsidian cinematic visual DNA, Beverly Hills luxury versus underground shadows. Core locations include Douglas Estate, The Verve, UCLA, Santa Monica, and Seven Hills. Core institutions include DCC, DCC Security Black Wolf Division, and Angel & Co. World rules are human only, no supernatural, contemporary technology, corporate hierarchy, and family power politics.",
    "scenario": "Source path: database/worlds/W_Contemporary.md. Record type: sourced lorebook entry.",
    "source": "database/worlds/W_Contemporary.md"
  },
  {
    "id": "L_LosAngeles",
    "priority": 4,
    "keywords": [
      "los angeles",
      "beverly hills",
      "century city",
      "santa monica",
      "hollywood",
      "dtla",
      "westwood"
    ],
    "personality": "Source: database/locations/L_LosAngeles.md. Los Angeles is the narrative region centered on UCLA Westwood, Beverly Hills, Century City, Santa Monica, Hollywood, and DTLA. It contrasts campus freedom with family control, uses car-dependent sprawl and entertainment culture, and supports student, corporate, celebrity, and coastal storylines.",
    "scenario": "Source path: database/locations/L_LosAngeles.md. Record type: sourced lorebook entry.",
    "source": "database/locations/L_LosAngeles.md"
  },
  {
    "id": "L_DouglasEstate",
    "priority": 5,
    "keywords": [
      "douglas estate",
      "estate",
      "north beverly hills",
      "throne room",
      "alyssa solarium",
      "malachia east wing"
    ],
    "personality": "Source: database/locations/L_DouglasEstate.md. The Douglas Estate is the North Beverly Hills gated compound and primary Douglas family residence. It contains the main mansion, formal dining hall, family library, private gardens, guest wing, gatehouse, underground garage, event spaces, Erik Throne Room, Malachia East Wing, Wulfnic quarters, Jasper studio, Alyssa solarium, and Noah kitchen access. DCC Security Black Wolf Division monitors perimeter and biometric access. Tone is old-money prestige, family warmth, and fortress-like security.",
    "scenario": "Source path: database/locations/L_DouglasEstate.md. Record type: sourced lorebook entry.",
    "source": "database/locations/L_DouglasEstate.md"
  },
  {
    "id": "L_DouglasCustoms",
    "priority": 4,
    "keywords": [
      "douglas customs",
      "workshop",
      "arts district",
      "logan workshop",
      "garage"
    ],
    "personality": "Source: database/locations/L_DouglasCustoms.md. Douglas Customs is Logan Douglas workshop in the Arts District of DTLA, near The Verve. The converted industrial property has restoration bays, fabrication area, motorcycle workstations, tool room, office mezzanine, and vehicle storage. It specializes in restoration, customization, fabrication, and performance. Tone is industrial, practical, personal, and working-class contrast to the family corporate identity.",
    "scenario": "Source path: database/locations/L_DouglasCustoms.md. Record type: sourced lorebook entry.",
    "source": "database/locations/L_DouglasCustoms.md"
  },
  {
    "id": "L_SevenHills",
    "priority": 4,
    "keywords": [
      "seven hills",
      "heritage site",
      "training camp",
      "douglas ancestral",
      "georgian villa"
    ],
    "personality": "Source: database/locations/L_SevenHills.md. Seven Hills Estate is the ancestral Douglas DCC heritage site in California, founded around 1740 as a Georgian villa and woodland reserve. It began as a colonial trading post and regional headquarters, then became a private country house and training camp. Key areas include the Great Hall, Governor Study, family quarters, wine cellar, library, woodland reserve, outdoor boxing ring, strength facilities, and recovery areas. Malachia uses it for training and the family uses it for retreats and gatherings.",
    "scenario": "Source path: database/locations/L_SevenHills.md. Record type: sourced lorebook entry.",
    "source": "database/locations/L_SevenHills.md"
  },
  {
    "id": "L_UCLACampus",
    "priority": 4,
    "keywords": [
      "ucla",
      "ucla campus",
      "westwood",
      "royce hall",
      "powell library",
      "bruin walk"
    ],
    "personality": "Source: database/locations/L_UCLACampus.md. UCLA Campus in Westwood is the primary academic, social, and political hub for younger generation storylines. Key areas include Royce Hall, Powell Library, Bruin Walk, Bruin Plaza, Ackerman Union, Kerckhoff Hall, Janss Steps, Pauley Pavilion, and Sunset Recreation Center. It hosts Greek Life, over 1000 student organizations, USAC, Big Ten athletics, and the tension between campus autonomy and family surveillance.",
    "scenario": "Source path: database/locations/L_UCLACampus.md. Record type: sourced lorebook entry.",
    "source": "database/locations/L_UCLACampus.md"
  },
  {
    "id": "L_VerveLounge",
    "priority": 4,
    "keywords": [
      "verve",
      "verve lounge",
      "arts district",
      "logan territory",
      "rooftop"
    ],
    "personality": "Source: database/locations/L_VerveLounge.md. The Verve Lounge is Logan Douglas converted warehouse venue in Arts District DTLA with member or invitation access. It has exposed brick, steel beams, concrete floors, high ceilings, main bar, lounge seating, small stage, VIP section, art installations, motorcycle display, and rooftop. Clientele is creative-professional. Logan penthouse sits above. It is a PMC-free safe haven.",
    "scenario": "Source path: database/locations/L_VerveLounge.md. Record type: sourced lorebook entry.",
    "source": "database/locations/L_VerveLounge.md"
  },
  {
    "id": "L_RoseBowl",
    "priority": 3,
    "keywords": [
      "rose bowl",
      "ucla football",
      "pasadena",
      "game day",
      "bruins football"
    ],
    "personality": "Source: database/locations/L_RoseBowl.md. The Rose Bowl in Pasadena is the home venue of UCLA Bruins football, with capacity around 88000 and about 25 miles from Westwood. It anchors UCLA game-day culture, KSA alumni gatherings, family visibility, and Malachia Sport Sciences research context. Malachia actual combat venues include Pauley Pavilion, Kia Forum, Crypto.com Arena, BMO Stadium, and local boxing gyms.",
    "scenario": "Source path: database/locations/L_RoseBowl.md. Record type: sourced lorebook entry.",
    "source": "database/locations/L_RoseBowl.md"
  },
  {
    "id": "L_SantaMonicaWaterfront",
    "priority": 3,
    "keywords": [
      "santa monica",
      "waterfront",
      "beach",
      "pier",
      "main street",
      "strand"
    ],
    "personality": "Source: database/locations/L_SantaMonicaWaterfront.md. Santa Monica Waterfront is neutral coastal recreation 15 to 20 minutes from UCLA. It includes beach, pier, Third Street Promenade, Santa Monica Place, Main Street, and the Strand bike path. It is open to all and not controlled by the Douglas family, campus politics, or Logan territory. It supports dates, friend gatherings, summer events, casual scenes, and decompression.",
    "scenario": "Source path: database/locations/L_SantaMonicaWaterfront.md. Record type: sourced lorebook entry.",
    "source": "database/locations/L_SantaMonicaWaterfront.md"
  },
  {
    "id": "I_DCC_Security_BlackWolf",
    "priority": 5,
    "keywords": [
      "dcc security",
      "black wolf",
      "kaladin",
      "marcus thornfield",
      "executive protection"
    ],
    "personality": "Source: database/institutions/I_DCC_Security_BlackWolf.md. DCC Security Black Wolf Division is a Private Military Contractor division under the DCC corporate structure. Its mission is protection of the Douglas family and DCC assets. Kaladin Nargathon directs the division, Marcus Thornfield leads executive protection, and Alyssa is Marcus primary protection assignment. The division reports to Erik Douglas and includes Director, Head of Executive Protection, Operations Officers, Field Teams, and Intelligence Unit. Black Wolf is a narrative name, not supernatural.",
    "scenario": "Source path: database/institutions/I_DCC_Security_BlackWolf.md. Record type: sourced lorebook entry.",
    "source": "database/institutions/I_DCC_Security_BlackWolf.md"
  },
  {
    "id": "I_UCLA",
    "priority": 4,
    "keywords": [
      "ucla",
      "university of california los angeles",
      "bruins",
      "big ten",
      "rose bowl"
    ],
    "personality": "Source: database/institutions/I_UCLA.md. UCLA was founded in 1919, sits in Westwood, uses blue and gold, competes in the Big Ten, and plays home football at the Rose Bowl. It is a major research university with strength in life sciences, medicine, engineering, film, law, business, computer science, and mathematics. Campus culture includes Bruin identity, traditions, USC rivalry, game days, student social life, Greek Life, and over 1000 student organizations.",
    "scenario": "Source path: database/institutions/I_UCLA.md. Record type: sourced lorebook entry.",
    "source": "database/institutions/I_UCLA.md"
  },
  {
    "id": "I_UCLA_GreekLife",
    "priority": 3,
    "keywords": [
      "greek life",
      "fraternity",
      "sorority",
      "ifc",
      "npc",
      "nphc",
      "mgc"
    ],
    "personality": "Source: database/institutions/I_UCLA_GreekLife.md. UCLA Greek Life has about 60 organizations and 4100 participants, about 13 percent undergraduate participation. It is governed by IFC, NPC, NPHC, and MGC. It provides housing, events, alumni networks, status hierarchies, recruitment pressure, and family tradition dynamics. It is an influential minority subculture, not a universal experience.",
    "scenario": "Source path: database/institutions/I_UCLA_GreekLife.md. Record type: sourced lorebook entry.",
    "source": "database/institutions/I_UCLA_GreekLife.md"
  },
  {
    "id": "I_KappaSigmaAlpha",
    "priority": 4,
    "keywords": [
      "ksa",
      "kappa sigma alpha",
      "legacy eligible",
      "erik nixara",
      "jasper refuses"
    ],
    "personality": "Source: database/institutions/I_KappaSigmaAlpha.md. KSA is the Douglas-Bloodmoon family key UCLA fraternity tradition. Erik met Nixara at a KSA event. Erik, Logan, Malachia, and Noah are alumni. Jasper is legacy eligible but explicitly refuses membership. KSA supports networking, social status, alumni relationships, family expectation, and recurring conflict around Jasper refusal.",
    "scenario": "Source path: database/institutions/I_KappaSigmaAlpha.md. Record type: sourced lorebook entry.",
    "source": "database/institutions/I_KappaSigmaAlpha.md"
  },
  {
    "id": "I_UCLA_USAC",
    "priority": 3,
    "keywords": [
      "usac",
      "student government",
      "student council",
      "election",
      "budget"
    ],
    "personality": "Source: database/institutions/I_UCLA_USAC.md. USAC is UCLA undergraduate student government with executive officers, legislative council, judicial board, and committees. It controls major funding for student institutions, campaigns, elections, budget fights, policy debates, and coalition politics. Elections happen annually in spring and organized blocs can shape outcomes.",
    "scenario": "Source path: database/institutions/I_UCLA_USAC.md. Record type: sourced lorebook entry.",
    "source": "database/institutions/I_UCLA_USAC.md"
  },
  {
    "id": "I_UCLA_StudentOrganizations",
    "priority": 3,
    "keywords": [
      "student organizations",
      "student institutions",
      "clubs",
      "pre-law",
      "engineering",
      "film",
      "gaming"
    ],
    "personality": "Source: database/institutions/I_UCLA_StudentOrganizations.md. UCLA has over 1000 registered student organizations across academic, pre-law, engineering, film and media, gaming, cultural, faith, volunteer, political, and sports club categories. Organizations recruit, hold elections, receive USAC funding, host events, build networks, and shape student identity.",
    "scenario": "Source path: database/institutions/I_UCLA_StudentOrganizations.md. Record type: sourced lorebook entry.",
    "source": "database/institutions/I_UCLA_StudentOrganizations.md"
  },
  {
    "id": "I_AngelAndCo",
    "priority": 3,
    "keywords": [
      "angel and co",
      "fashion photography",
      "model scouting",
      "talent management"
    ],
    "personality": "Source: database/institutions/I_AngelAndCo.md. Angel & Co is a boutique fashion photography studio founded and operated by Angel Moreno. It handles fashion, editorial, advertising, model scouting, and talent management. It is independent from Angel personal presence and gives Alyssa a professional modeling opportunity outside Douglas family structure.",
    "scenario": "Source path: database/institutions/I_AngelAndCo.md. Record type: sourced lorebook entry.",
    "source": "database/institutions/I_AngelAndCo.md"
  }
]
];

var LBR = {
  runtimeFlags: null
};

function lbString(value) { return value == null ? '' : String(value); }
function lbNormalize(value) { var s = lbString(value).toLowerCase().replace(/[^a-z0-9\s'-]/g, ' '); s = s.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); return ' ' + s + ' '; }
function lbSanitize(value) { if (typeof value !== 'string') { return value; } var out = value.replace(/[\u2014\u2013]/g, '...'); out = out.replace(/\.\.\.\.\.\./g, '...'); out = out.replace(/  +/g, ' '); return out; }
function lbEnsurePeriod(value) { var s = lbString(value).replace(/\s+$/g, ''); if (!s) { return ''; } var c = s.charAt(s.length - 1); return (c === '.' || c === '!' || c === '?') ? s : (s + '.'); }
function lbAppend(personality, scenario) { if (personality) { context.character.personality += '\n\n' + lbEnsurePeriod(personality); } if (scenario) { context.character.scenario += '\n\n' + lbEnsurePeriod(scenario); } }
function lbGetStateMarker() { var match = context.character.scenario.match(/SVLB_WORLD_STATE=([^;\n]+)/); return match ? match[1] : ''; }
function lbParseFlags() { var marker = lbGetStateMarker(); var flags = {}; if (!marker) { return flags; } var parts = marker.split('|'); var i; for (i = 0; i < parts.length; i += 1) { if (parts[i]) { flags[parts[i]] = '1'; } } return flags; }
function lbRenderFlags(flags) { var keys = []; var k; for (k in flags) { if (Object.prototype.hasOwnProperty.call(flags, k)) { keys.push(k); } } return keys.join('|'); }
function lbHasFlag(key) { return !!lbParseFlags()[key]; }
function lbSetFlag(key) { var flags = lbParseFlags(); if (flags[key]) { return; } flags[key] = '1'; LBR.runtimeFlags = flags; context.character.scenario += '\n\nSVLB_WORLD_STATE=' + lbRenderFlags(flags) + '.'; }
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
