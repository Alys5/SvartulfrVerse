/* ============================================================================
   Dynasty.js - Family Lorebook Runtime
   SvartulfrVerse | Dynasty Layer | ES6-safe JanitorAI sandbox
   Target: JanitorAI Advanced Script

   Responsibilities:
   - Owns family canon: Douglas-Bloodmoon dynasty, surnames, parent-child records
   - Owns historical canon: lineage origins, commercial history
   - Owns visual authority: phenotypes, packages, inheritance rules
   - Owns character identity anchors: core identity, physical body, personality
   - Provides sourced lorebook entries with priority-based activation
   - All entries reference source files in database/ folder structure

   Canonical Schema: Lorebook_Dynasty
   Categories: FAMILY_AUTHORITY, HISTORICAL_CANON, VISUAL_AUTHORITY, CHARACTER_IDENTITY
   ========================================================================== */

context.character = context.character || {};

if (typeof context.character.personality !== 'string') { context.character.personality = ''; }
if (typeof context.character.scenario !== 'string') { context.character.scenario = ''; }

var DYNASTY_CONFIG = {
  type: 'dynasty',
  prefix: 'F_',
  stateKey: 'dynasty_lorebook_applied',
  maxEntries: 6,
  "alwaysOn": false,
  "seed": 42
};

/* ======================================================================
   LOREBOOK_DYNASTY — Canonical Douglas-Bloodmoon Family Layer
   ======================================================================
   Categories:
   - FAMILY_AUTHORITY: Surname rules, parent-child records, marriage bonds
   - HISTORICAL_CANON: Lineage origins, commercial history
   - VISUAL_AUTHORITY: Phenotypes, packages, inheritance rules
   - CHARACTER_IDENTITY: Core identity, physical body, personality anchors
   ====================================================================== */

var Lorebook_Dynasty = {
  /* ── FAMILY AUTHORITY ─────────────────────────────────────────────── */
  "Family_Authority": [
    {
      "id": "F_DouglasBloodmoon",
      "priority": 5,
      "keywords": [
        "douglas",
        "bloodmoon",
        "douglas-bloodmoon",
        "dynasty",
        "family",
        "erik",
        "nixara",
        "wulfnic",
        "malachia",
        "noah",
        "jasper",
        "alyssa",
        "logan"
      ],
      "world": [],
      "text": "[F_DouglasBloodmoon] Douglas-Bloodmoon is the first-generation hyphenated designation for Malachia, Noah, Jasper, and Alyssa. It is not automatically hereditary. Second-generation rules remain unresolved. Erik Douglas and Nixara Bloodmoon are the founding parents. Wulfnic Bloodmoon is Nixara's father. Logan Douglas is Erik's brother.",
      "category": "FAMILY_AUTHORITY",
      "entryBlock": "Douglas-Bloodmoon Family",
      "source": "database/families/F_DouglasBloodmoon.md",
      "tags": ["family", "active-canon"],
      "scenario": "Source path: database/families/F_DouglasBloodmoon.md. Record type: sourced family lorebook entry."
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
      "world": [],
      "text": "[F_Surname_Authority] Family Authority owns surname assignment, inheritance, modification, and validation. Douglas and Bloodmoon use default patrilineal surnames. Douglas-Bloodmoon is an exceptional hyphenated first-generation designation for Malachia, Noah, Jasper, and Alyssa. It is not automatically hereditary, and second-generation rules remain unresolved.",
      "category": "SURNAME_AUTHORITY",
      "entryBlock": "Surname Authority",
      "source": "database/families/F_Surname_Authority.md",
      "tags": ["family", "active-canon"],
      "scenario": "Source path: database/families/F_Surname_Authority.md. Record type: sourced family lorebook entry."
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
      "world": [],
      "text": "[F_Parent_Child] Parent-child records are immutable and must not be inferred. PC-001 is Wulfnic to Nixara. PC-002 to PC-005 are Erik to Malachia, Noah, Jasper, and Alyssa. PC-006 to PC-009 are Nixara to the same four heirs. Derived siblings and Wulfnic grandparent relationships come from these edges. Erik to Wulfnic parent-child claims are rejected.",
      "category": "PARENT_CHILD",
      "entryBlock": "Parent-Child Records",
      "source": "database/families/F_Parent_Child.md",
      "tags": ["family", "active-canon"],
      "scenario": "Source path: database/families/F_Parent_Child.md. Record type: sourced family lorebook entry."
    }
  ],

  /* ── HISTORICAL CANON ─────────────────────────────────────────────── */
  "Historical_Canon": [
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
      "world": [],
      "text": "[HC_Douglas_Commercial_Lineage] Merchant House Douglas was founded in England in 1666 by Lord Cornelius Vance Douglas, expanded into Douglas Colonial Trading Company in the 1700s, and anchored California presence through a colonial trade and governance tradition. Magnus Douglas belongs to a sci-fi timeline only and is not founder of the original enterprise.",
      "category": "HISTORICAL_CANON",
      "entryBlock": "Historical Canon",
      "source": "database/historical/HC_Douglas_Commercial_Lineage.md",
      "tags": ["historical-canon", "douglas"],
      "scenario": "Source path: database/historical/HC_Douglas_Commercial_Lineage.md. Record type: Historical Canon."
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
      "world": [],
      "text": "[HC_Edric_Aettfadir_Svartulfa] Edric Aettfadir Svartulfa is the earliest documented founder associated with the ancestral Svartulfr family tradition, dated 725 AD in Vendel Period Scandinavia. This is historical and cultural origin only, with no supernatural claims and no active-runtime relationships.",
      "category": "HISTORICAL_CANON",
      "entryBlock": "Historical Canon",
      "source": "database/historical/HC_Edric_Aettfadir_Svartulfa.md",
      "tags": ["historical-canon", "bloodmoon", "svartulfr"],
      "scenario": "Source path: database/historical/HC_Edric_Aettfadir_Svartulfa.md. Record type: Historical Canon."
    }
  ],

  /* ── VISUAL AUTHORITY ─────────────────────────────────────────────── */
  "Visual_Authority": [
    {
      "id": "V_Visual_Authority",
      "priority": 4,
      "keywords": [
        "visual authority",
        "v_visual_authority",
        "master index",
        "image generation",
        "character design",
        "visual asset",
        "california slice-of-life dynasty",
        "package completeness"
      ],
      "world": [],
      "text": "[V_Visual_Authority] Visual Authority is the master index for all visual directives. Active visual documents are V_Visual_DNA.md, V_Visual_Package_Standard.md, V_Visual_Packages_Per_Character.md, V_Visual_Baseline.md, V_Visual_Inheritance.md, and V_Visual_Reconciliation.md. Primary style is California Slice-of-Life Dynasty v1. Tier-1 characters require the full 7-image visual package. Source: database/visuals/V_Visual_Authority.md.",
      "category": "VISUAL_AUTHORITY",
      "entryBlock": "Visual Authority Master Index",
      "source": "database/visuals/V_Visual_Authority.md",
      "tags": ["visual-authority", "active-canon", "image-generation"],
      "scenario": "Source path: database/visuals/V_Visual_Authority.md. Record type: Visual Authority."
    },
    {
      "id": "V_Visual_Baseline",
      "priority": 4,
      "keywords": [
        "visual baseline",
        "phenotype",
        "erik douglas",
        "wulfnic bloodmoon",
        "nixara bloodmoon",
        "logan douglas",
        "malachia douglas-bloodmoon",
        "noah douglas-bloodmoon",
        "alyssa douglas-bloodmoon",
        "jasper douglas-bloodmoon",
        "hair",
        "eyes",
        "build"
      ],
      "world": [],
      "text": "[V_Visual_Baseline] Canonical visual baselines: Erik Douglas has black hair with silver streaks, amber eyes, 205cm massive muscular build, corporate monarch aesthetic. Wulfnic Bloodmoon has blonde hair braided with silver, blue eyes, 195cm lean strong build, ancestral nobility aesthetic. Nixara Bloodmoon has blonde hair, ice blue eyes, 170cm slender graceful build, ethereal lunar beauty. Logan Douglas has dark brown messy hair, hazel eyes, 198cm broad muscular build, greasy overalls and flannel aesthetic. Malachia Douglas-Bloodmoon has black short military hair, amber eyes, 210cm tank-like scarred physique, tactical heavy coat aesthetic. Noah Douglas-Bloodmoon has blonde immaculate hair, blue eyes, 196cm lithe swimmer build, bespoke suit aesthetic. Alyssa Douglas-Bloodmoon has caramel-brown tailbone-length hair, mint green eyes, 165cm petite hourglass build, dark angel or decadent muse aesthetic. Jasper Douglas-Bloodmoon has caramel-brown messy hair, mint green eyes, 191cm lean athletic build, hypebeast streetwear aesthetic. Source: database/visuals/V_Visual_Baseline.md.",
      "category": "VISUAL_BASELINE",
      "entryBlock": "Visual Phenotype Baselines",
      "source": "database/visuals/V_Visual_Baseline.md",
      "tags": ["visual-authority", "active-canon", "phenotype"],
      "scenario": "Source path: database/visuals/V_Visual_Baseline.md. Record type: Visual Authority."
    },
    {
      "id": "V_Visual_DNA",
      "priority": 4,
      "keywords": [
        "visual dna",
        "master style prefix",
        "golden hour",
        "color palette",
        "facial rendering",
        "body language",
        "negative prompt",
        "california sunlight",
        "beverly hills atmosphere"
      ],
      "world": [],
      "text": "[V_Visual_DNA] Global visual DNA requires semi-realistic niji style, painterly realism, premium visual novel artwork, anime-inspired realism, luxury visual storytelling, California Slice-of-Life Dynasty, golden hour sunlight, warm natural lighting, sun-kissed skin, expressive eyes, soft facial rendering, healthy vibrant appearance, Beverly Hills atmosphere, modern California luxury, family warmth, optimistic mood, emotional realism, highly detailed faces, and natural anatomy. The emotional tone should feel wealthy but approachable, successful but human, family-oriented, warm, optimistic, emotionally safe, and modern California lifestyle. Avoid mafia, crime family, gangster, yakuza, grimdark, horror, gothic, villain group, dirty skin, grime, mud, oil stains, desaturated colors, photorealistic uncanny faces, generic anime, evil smiles, aggressive expressions, overly dark shadows, and harsh contrast. Source: database/visuals/V_Visual_DNA.md.",
      "category": "VISUAL_DNA",
      "entryBlock": "Global Visual DNA",
      "source": "database/visuals/V_Visual_DNA.md",
      "tags": ["visual-authority", "active-canon", "image-generation"],
      "scenario": "Source path: database/visuals/V_Visual_DNA.md. Record type: Visual Authority."
    },
    {
      "id": "V_Visual_Inheritance",
      "priority": 4,
      "keywords": [
        "visual inheritance",
        "fusion model",
        "douglas-visual-dominant",
        "bloodmoon-visual-dominant",
        "maternal-resemblance",
        "alyssa",
        "jasper",
        "noah",
        "malachia",
        "nixara resemblance"
      ],
      "world": [],
      "text": "[V_Visual_Inheritance] Visual inheritance is visual authority only and does not alter genealogy. Douglas visual baseline is black hair, amber eyes, massive muscular build. Bloodmoon visual baseline is blonde hair, blue eyes, lean refined build. Malachia is Douglas-visual-dominant with black hair, amber eyes, tank-like scarred build. Noah is Bloodmoon-visual-dominant with blonde hair, blue eyes, lithe elegant build. Alyssa is fusion-visual with strongest Nixara facial and body resemblance, caramel-brown hair, mint green eyes, petite hourglass build. Jasper is fusion-visual twin inheritance with caramel-brown hair, mint green eyes, lean athletic build. Source: database/visuals/V_Visual_Inheritance.md.",
      "category": "VISUAL_INHERITANCE",
      "entryBlock": "Visual Fusion and Inheritance Rules",
      "source": "database/visuals/V_Visual_Inheritance.md",
      "tags": ["visual-authority", "active-canon", "inheritance"],
      "scenario": "Source path: database/visuals/V_Visual_Inheritance.md. Record type: Visual Authority."
    },
    {
      "id": "V_Visual_Package_Standard",
      "priority": 3,
      "keywords": [
        "visual package",
        "primary portrait",
        "lifestyle portrait",
        "signature activity",
        "emotional scene",
        "environment banner",
        "extended package",
        "image package",
        "7-image package"
      ],
      "world": [],
      "text": "[V_Visual_Package_Standard] Every bot must include a standardized visual package. Minimum package is 5 images: Primary Portrait 1:1, Lifestyle Portrait 4:3, Signature Activity Scene 5:3, Emotional Scene 4:3, and Environment Banner 3:1. Tier-1 characters use the extended 7-image package: Primary Portrait, Casual Lifestyle, Signature Activity, Emotional Scene, Relationship Scene, Full Body Character Sheet, and Environment Banner. The 5-image package must answer who the character is, what they are like, what they do, what they feel, and what world they live in. Source: database/visuals/V_Visual_Package_Standard.md.",
      "category": "VISUAL_PACKAGE",
      "entryBlock": "Bot Visual Package Standard",
      "source": "database/visuals/V_Visual_Package_Standard.md",
      "tags": ["visual-authority", "active-canon", "package-standard"],
      "scenario": "Source path: database/visuals/V_Visual_Package_Standard.md. Record type: Visual Authority."
    },
    {
      "id": "V_Visual_Packages_Per_Character",
      "priority": 3,
      "keywords": [
        "visual packages per character",
        "alyssa visual package",
        "jasper visual package",
        "malachia visual package",
        "noah visual package",
        "erik visual package",
        "logan visual package",
        "wulfnic visual package",
        "family portrait",
        "douglas estate panorama"
      ],
      "world": [],
      "text": "[V_Visual_Packages_Per_Character] Tier-1 visual packages define Alyssa at UCLA courtyard, community health fair, sunset bench, rooftop with twin, full body sheet, Douglas Estate garden banner. Jasper uses rooftop laptop, DJ set, rooftop night, twin rooftop scene, full body sheet, Douglas Estate rooftop banner. Malachia uses home gym, boxing ring, family dinner doorway, twin protective scene, full body sheet, home gym banner. Noah uses high-end kitchen pastry work, charity gala, law library at 2 AM, Logan at The Verve, full body sheet, law library banner. Erik uses UCLA bleachers, football sidelines, study with Nixara photograph, child relationship scene, full body sheet, Douglas Estate banner. Logan uses classic car at The Verve, bar service, after-closing emotional scene, teaching a nibling with a wrench, full body sheet, The Verve interior banner. Wulfnic uses grand library, pendant legacy scene, dawn library emotional scene, grandchild storytelling scene, full body sheet, grand library banner. Family portrait and Douglas Estate panorama are group and environment assets. Source: database/visuals/V_Visual_Packages_Per_Character.md.",
      "category": "VISUAL_PACKAGE",
      "entryBlock": "Character-Specific Visual Packages",
      "source": "database/visuals/V_Visual_Packages_Per_Character.md",
      "tags": ["visual-authority", "active-canon", "package-standard"],
      "scenario": "Source path: database/visuals/V_Visual_Packages_Per_Character.md. Record type: Visual Authority."
    },
    {
      "id": "V_Visual_Reconciliation",
      "priority": 3,
      "keywords": [
        "visual reconciliation",
        "wulfnic phenotype",
        "silver-white",
        "blonde blue",
        "canonical phenotype",
        "conflict resolved",
        "bloodmoon visual dna"
      ],
      "world": [],
      "text": "[V_Visual_Reconciliation] Visual reconciliation resolved the Wulfnic Bloodmoon phenotype conflict. Legacy silver-white hair or silver-white eyes are historical variants and are rejected for active visual output. The canonical phenotype is blonde hair and blue eyes from V_Visual_Baseline.md. This correction also preserves Noah Douglas-Bloodmoon as Bloodmoon-visual-dominant and keeps Alyssa and Jasper as fusion-visual characters. Source: database/visuals/V_Visual_Reconciliation.md.",
      "category": "VISUAL_RECONCILIATION",
      "entryBlock": "Visual Canon Reconciliation",
      "source": "database/visuals/V_Visual_Reconciliation.md",
      "tags": ["visual-authority", "active-canon", "reconciliation"],
      "scenario": "Source path: database/visuals/V_Visual_Reconciliation.md. Record type: Visual Authority."
    }
  ],

  /* ── CHARACTER IDENTITY ───────────────────────────────────────────── */
  "Character_Identity": [
    {
      "id": "C_Alyssa_01_core_identity",
      "priority": 5,
      "keywords": ["alyssa"],
      "world": [],
      "text": "[CORE IDENTITY] Name: Alyssa Douglas-Bloodmoon Source: database/characters/C_Alyssa_Douglas_Bloodmoon.md.",
      "category": "CHARACTER_IDENTITY",
      "entryBlock": "Core Identity & Meta Notes",
      "source": "database/characters/C_Alyssa_Douglas_Bloodmoon.md",
      "tags": ["character", "active-canon", "alyssa"],
      "scenario": "Source: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Character Authority profile embedded in F_DouglasBloodmoon.js. Use as sourced character context only."
    },
    {
      "id": "C_Alyssa_02_physical_body",
      "priority": 4,
      "keywords": ["alyssa"],
      "world": [],
      "text": "[APPEARANCE] Alyssa Douglas-Bloodmoon's visual phenotype is classified as fusion-visual with the strongest Nixara resemblance. Height: 165cm (5'5\"). Build: petite hourglass. Hair: caramel-brown (fusion chromatic). Eyes: mint green (fusion chromatic). Birthmark: faint crescent-shaped birthmark on left hip. Piercings: standard lobe piercings (both ears). Tattoo: small sunflower tattoo on right inner ankle. Her appearance carries the strongest visual connection to her mother Nixara ... the same delicate frame, the same warm thin expression ... but expressed through the fused chromatic palette of both Douglas and Bloodmoon lineages. Her style is warm, approachable, and distinctly Californian ... favoring soft colors, natural fabrics, and sunflower motifs in her accessories.",
      "category": "CHARACTER_APPEARANCE",
      "entryBlock": "Physical Body",
      "source": "database/characters/C_Alyssa_Douglas_Bloodmoon.md",
      "tags": ["character", "active-canon", "alyssa", "appearance"],
      "scenario": "Source: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Physical phenotype for Alyssa Douglas-Bloodmoon."
    },
    {
      "id": "C_Alyssa_03_personality",
      "priority": 4,
      "keywords": ["alyssa"],
      "world": [],
      "text": "[PERSONALITY] Alyssa Douglas-Bloodmoon is warm, empathetic, and community-oriented. She is studying public health at UCLA with a focus on community health education. She has a natural gift for making people feel seen and heard. She is the emotional heart of her friend group and often serves as the mediator in conflicts. Despite her privileged background, she is genuinely humble and connects with people from all walks of life. She has a quiet strength that emerges when others are in need. Her relationship with her twin Jasper is deeply bonded, and she often serves as his emotional anchor.",
      "category": "CHARACTER_PERSONALITY",
      "entryBlock": "Personality Core",
      "source": "database/characters/C_Alyssa_Douglas_Bloodmoon.md",
      "tags": ["character", "active-canon", "alyssa", "personality"],
      "scenario": "Source: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Personality profile for Alyssa Douglas-Bloodmoon."
    },
    {
      "id": "C_Jasper_01_core_identity",
      "priority": 5,
      "keywords": ["jasper"],
      "world": [],
      "text": "[CORE IDENTITY] Name: Jasper Douglas-Bloodmoon Source: database/characters/C_Jasper_Douglas_Bloodmoon.md.",
      "category": "CHARACTER_IDENTITY",
      "entryBlock": "Core Identity & Meta Notes",
      "source": "database/characters/C_Jasper_Douglas_Bloodmoon.md",
      "tags": ["character", "active-canon", "jasper"],
      "scenario": "Source: database/characters/C_Jasper_Douglas_Bloodmoon.md | Character Authority profile for Jasper Douglas-Bloodmoon."
    },
    {
      "id": "C_Malachia_01_core_identity",
      "priority": 5,
      "keywords": ["malachia"],
      "world": [],
      "text": "[CORE IDENTITY] Name: Malachia Douglas-Bloodmoon Source: database/characters/C_Malachia_Douglas_Bloodmoon.md.",
      "category": "CHARACTER_IDENTITY",
      "entryBlock": "Core Identity & Meta Notes",
      "source": "database/characters/C_Malachia_Douglas_Bloodmoon.md",
      "tags": ["character", "active-canon", "malachia"],
      "scenario": "Source: database/characters/C_Malachia_Douglas_Bloodmoon.md | Character Authority profile for Malachia Douglas-Bloodmoon."
    },
    {
      "id": "C_Noah_01_core_identity",
      "priority": 5,
      "keywords": ["noah"],
      "world": [],
      "text": "[CORE IDENTITY] Name: Noah Douglas-Bloodmoon Source: database/characters/C_Noah_Douglas_Bloodmoon.md.",
      "category": "CHARACTER_IDENTITY",
      "entryBlock": "Core Identity & Meta Notes",
      "source": "database/characters/C_Noah_Douglas_Bloodmoon.md",
      "tags": ["character", "active-canon", "noah"],
      "scenario": "Source: database/characters/C_Noah_Douglas_Bloodmoon.md | Character Authority profile for Noah Douglas-Bloodmoon."
    },
    {
      "id": "C_Erik_01_core_identity",
      "priority": 5,
      "keywords": ["erik"],
      "world": [],
      "text": "[CORE IDENTITY] Name: Erik Douglas Source: database/characters/C_Erik_Douglas.md.",
      "category": "CHARACTER_IDENTITY",
      "entryBlock": "Core Identity & Meta Notes",
      "source": "database/characters/C_Erik_Douglas.md",
      "tags": ["character", "active-canon", "erik"],
      "scenario": "Source: database/characters/C_Erik_Douglas.md | Character Authority profile for Erik Douglas."
    },
    {
      "id": "C_Logan_01_core_identity",
      "priority": 5,
      "keywords": ["logan"],
      "world": [],
      "text": "[CORE IDENTITY] Name: Logan Douglas Source: database/characters/C_Logan_Douglas.md.",
      "category": "CHARACTER_IDENTITY",
      "entryBlock": "Core Identity & Meta Notes",
      "source": "database/characters/C_Logan_Douglas.md",
      "tags": ["character", "active-canon", "logan"],
      "scenario": "Source: database/characters/C_Logan_Douglas.md | Character Authority profile for Logan Douglas."
    },
    {
      "id": "C_Nixara_01_core_identity",
      "priority": 5,
      "keywords": ["nixara"],
      "world": [],
      "text": "[CORE IDENTITY] Name: Nixara Bloodmoon Source: database/characters/C_Nixara_Bloodmoon.md.",
      "category": "CHARACTER_IDENTITY",
      "entryBlock": "Core Identity & Meta Notes",
      "source": "database/characters/C_Nixara_Bloodmoon.md",
      "tags": ["character", "active-canon", "nixara"],
      "scenario": "Source: database/characters/C_Nixara_Bloodmoon.md | Character Authority profile for Nixara Bloodmoon."
    },
    {
      "id": "C_Wulfnic_01_core_identity",
      "priority": 5,
      "keywords": ["wulfnic"],
      "world": [],
      "text": "[CORE IDENTITY] Name: Wulfnic Bloodmoon Source: database/characters/C_Wulfnic_Bloodmoon.md.",
      "category": "CHARACTER_IDENTITY",
      "entryBlock": "Core Identity & Meta Notes",
      "source": "database/characters/C_Wulfnic_Bloodmoon.md",
      "tags": ["character", "active-canon", "wulfnic"],
      "scenario": "Source: database/characters/C_Wulfnic_Bloodmoon.md | Character Authority profile for Wulfnic Bloodmoon."
    }
  ]
};

/* ======================================================================
   DYNASTY RUNTIME — Activation Engine
   ====================================================================== */

(function runDynastyEngine() {
  function canon(s) {
    s = String(s || '').toLowerCase().replace(/[^\x20-\x7e]/g, ' ');
    s = s.replace(/[^a-z0-9\s]/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  function pad(s) { return ' ' + s + ' '; }
  var _raw = String((context.chat && context.chat.last_message) || '');
  var msgCanon = pad(canon(_raw));

  function hasToken(bufCanon, rawToken) {
    var t = canon(rawToken);
    if (!t) { return false; }
    return bufCanon.indexOf(pad(t)) !== -1;
  }

  function firstHitToken(bufCanon, rule) {
    var i, t;
    var keys = (rule && rule.keywords) || null;
    if (keys && keys.length) {
      for (i = 0; i < keys.length; i += 1) {
        t = keys[i];
        if (hasToken(bufCanon, t)) { return String(t); }
      }
    }
    return '';
  }

  function ensurePeriod(s) {
    s = String(s || '');
    if (!s) { return ''; }
    var t = s.replace(/\s+$/, '');
    var c = t.charAt(t.length - 1);
    return (c === '.' || c === '!' || c === '?') ? t : (t + '.');
  }

  function append(personality, scenario) {
    if (personality) { context.character.personality += '\n\n' + ensurePeriod(personality); }
    if (scenario) { context.character.scenario += '\n\n' + ensurePeriod(scenario); }
  }

  function linkScenario(cue, tok, base) {
    if (!base) { return ''; }
    return 'Because of ' + cue + " ('" + tok + "'), " + base;
  }

  function linkPersonality(cue, tok, base) {
    if (!base) { return ''; }
    return 'Noting the ' + cue + " ('" + tok + "'), " + base;
  }

  function quietHit(bufCanon) {
    return hasToken(bufCanon, 'stop') ||
      hasToken(bufCanon, 'please stop') ||
      hasToken(bufCanon, 'not comfortable') ||
      hasToken(bufCanon, 'too much') ||
      hasToken(bufCanon, 'leave me alone') ||
      hasToken(bufCanon, 'back off');
  }

  var QUIET = quietHit(msgCanon);

  /* ── Flatten all dynasty entries for processing ─────────────────── */
  var allEntries = [];
  var categories = ['Family_Authority', 'Historical_Canon', 'Visual_Authority', 'Character_Identity'];
  var catIdx;
  for (catIdx = 0; catIdx < categories.length; catIdx += 1) {
    var cat = categories[catIdx];
    var entries = Lorebook_Dynasty[cat] || [];
    var i;
    for (i = 0; i < entries.length; i += 1) {
      allEntries.push(entries[i]);
    }
  }

  /* ── Sort by priority (highest first) ───────────────────────────── */
  allEntries.sort(function(a, b) {
    return (b.priority || 0) - (a.priority || 0);
  });

  /* ── Process entries ────────────────────────────────────────────── */
  var activated = 0;
  var maxEntries = DYNASTY_CONFIG.maxEntries;
  var i;
  for (i = 0; i < allEntries.length && activated < maxEntries; i += 1) {
    var entry = allEntries[i];
    if (!entry) { continue; }

    var hitToken = firstHitToken(msgCanon, entry);
    if (!hitToken) { continue; }

    if (QUIET) {
      append(
        'Dynasty boundary: family and character context is active but tone should be gentle and non-intrusive.',
        linkScenario(entry.category || 'dynasty', hitToken, entry.scenario || entry.text || '')
      );
    } else {
      var personalityText = '';
      var scenarioText = '';

      if (entry.category === 'CHARACTER_IDENTITY' || entry.category === 'CHARACTER_APPEARANCE' || entry.category === 'CHARACTER_PERSONALITY') {
        personalityText = entry.text || '';
        scenarioText = entry.scenario || '';
      } else if (entry.category === 'VISUAL_AUTHORITY' || entry.category === 'VISUAL_BASELINE' || entry.category === 'VISUAL_DNA' || entry.category === 'VISUAL_INHERITANCE' || entry.category === 'VISUAL_PACKAGE' || entry.category === 'VISUAL_RECONCILIATION') {
        scenarioText = entry.text || '';
      } else {
        scenarioText = entry.text || '';
      }

      append(personalityText, scenarioText);
    }

    activated += 1;
  }

  /* ── Dynasty state marker ───────────────────────────────────────── */
  if (activated > 0 && context.character.scenario.indexOf('DYNASTY_ACTIVE=') === -1) {
    context.character.scenario += '\n\nDYNASTY_ACTIVE=' + activated + '.';
  }
})();