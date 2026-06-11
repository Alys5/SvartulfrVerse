/* ============================================================================
   EXPORT_MAPPING.md — Database-to-Script Information Flow Map
   SvartulfrVerse | Canon Freeze v1

   Purpose: Clear mapping of which database records feed which export JS files.
   This is the authoritative reference for maintaining the export layer.

   Legend:
     [C]  = Character Authority record
     [F]  = Family Authority record
     [W]  = World Authority record
     [V]  = Visual Authority record
     [I]  = Institution Authority record
     [L]  = Location Authority record
     [O]  = Organization Authority record
     [H]  = Historical Canon record
     [E]  = Experience Authority record
   ============================================================================ */


/* ============================================================================
   LAYER 1: FOUNDATION — Behavior + World Knowledge
   ============================================================================ */

/*
   FILE: exports/En_Core.js
   TYPE: Behavior Layer (no database source — pure engine logic)
   SOURCE: engine/En_Core.js (generated from scratch)
   DATABASE SOURCES: NONE — this file contains zero lore

   Sections:
     1. Environment Guards          → boilerplate
     2. Configuration Knobs         → engine tuning
     3. Input Normalization         → canonical text processing
     4. Emotion State Tracker       → behavioral state machine
     5. Mood Injection              → personality output
     6. Relationship Meter Tracker  → session-scoped relationship tracking
     7. Session State Persistence   → cross-turn state
     8. Debug Output                → diagnostic

   No database records are referenced. This is pure behavioral logic.
*/


/*
   FILE: exports/W_Contemporary.js
   TYPE: Knowledge Layer — World
   SOURCE: engine/W_Contemporary.js

   DATABASE SOURCES:
     [W] database/worlds/W_Contemporary.md
         → Entry 1: Douglas Estate (priority 5)
     [L] database/locations/L_DouglasEstate.md
         → Entry 1: Douglas Estate details
     [L] database/locations/L_VerveLounge.md
         → Entry 2: The Verve (priority 4)
     [I] database/institutions/I_DCC_Security_BlackWolf.md
         → Entry 3: DCC Security — Black Wolf Division (priority 4)
     [I] database/institutions/I_UCLA.md
         → Entry 4: UCLA (priority 3)
     [L] database/locations/L_UCLACampus.md
         → Entry 4: UCLA campus details

   Entries:
     1. Douglas Estate        priority 5  [W][L]
     2. The Verve              priority 4  [L]
     3. DCC Security           priority 4  [I]
     4. UCLA                   priority 3  [I][L]
*/


/* ============================================================================
   LAYER 2: DYNASTY — Family Knowledge
   ============================================================================ */

/*
   FILE: exports/F_DouglasBloodmoon.js
   TYPE: Knowledge Layer — Family
   SOURCE: engine/F_DouglasBloodmoon.js

   DATABASE SOURCES:
     [F] database/families/F_Douglas_Bloodmoon.md
         → Entry 1: The Dynastic Union (priority 5)
         → Entry 3: The Core Line (priority 4)
     [F] database/families/F_Marriages.md
         → Entry 1: The Dynastic Union (priority 5)
     [F] database/families/F_Parent_Child.md
         → Entry 3: The Core Line (priority 4)
     [C] database/characters/C_Erik_Douglas.md
         → Entry 1: Erik's role in dynastic union
         → Entry 2: Security protocols
         → Entry 3: Father of siblings
     [C] database/characters/C_Nixara_Bloodmoon.md
         → Entry 1: Nixara's role in dynastic union
     [C] database/characters/C_Malachia_Douglas_Bloodmoon.md
         → Entry 3: Malachia bio summary
     [C] database/characters/C_Noah_Douglas_Bloodmoon.md
         → Entry 3: Noah bio summary
     [C] database/characters/C_Jasper_Douglas_Bloodmoon.md
         → Entry 3: Jasper bio summary
     [C] database/characters/C_Alyssa_Douglas_Bloodmoon.md
         → Entry 3: Alyssa bio summary
     [I] database/institutions/I_DCC_Security_BlackWolf.md
         → Entry 2: Security protocols
     [L] database/locations/L_DouglasEstate.md
         → Entry 2: Security infrastructure

   Entries:
     1. The Dynastic Union         priority 5  [F][C]
     2. Security & Moonstone        priority 5  [C][I][L]
     3. The Core Line (Siblings)    priority 4  [F][C]
*/


/* ============================================================================
   LAYER 2: DYNASTY — Individual Character Knowledge
   ============================================================================ */

/*
   FILE: exports/char/C_Malachia.js
   TYPE: Individual Knowledge — Malachia Douglas-Bloodmoon
   SOURCE: engine/CHARACTER_Template.js (adapted)

   DATABASE SOURCES:
     [C] database/characters/C_Malachia_Douglas_Bloodmoon.md
         → BIO: Age, role, occupation, education, dynastic position
         → DYNAMICS: Relationships with Erik, Alyssa, Noah, Jasper, Kaladin
         → QUIRKS: Spatial positioning, scanning, economy of speech, training
     [V] database/visuals/V_Visual_Baseline.md
         → APPEARANCE: Height, build, hair, eyes
     [V] database/visuals/V_Visual_DNA.md
         → APPEARANCE: Douglas-dominant classification
     [L] database/locations/L_SevenHills.md
         → DYNAMICS/QUIRKS: Training base
     [L] database/locations/L_DouglasEstate.md
         → BIO: East Wing residence

   Entries:
     1. BIO              priority 5  [C][L]
     2. APPEARANCE       priority 4  [V]
     3. PSYCH_PROFILE    priority 4  [C]
     4. DYNAMICS         priority 5  [C][L]
     5. QUIRKS           priority 3  [C][L]
*/


/*
   FILE: exports/char/C_Noah.js
   TYPE: Individual Knowledge — Noah Douglas-Bloodmoon

   DATABASE SOURCES:
     [C] database/characters/C_Noah_Douglas_Bloodmoon.md
         → BIO, PSYCH_PROFILE, DYNAMICS, QUIRKS
     [V] database/visuals/V_Visual_Baseline.md
         → APPEARANCE: Bloodmoon-dominant phenotype
     [V] database/visuals/V_Visual_DNA.md
         → APPEARANCE: Blonde hair, blue eyes, lithe build
     [I] database/institutions/I_UCLA.md
         → BIO: 3L Juris Doctor Candidate

   Entries:
     1. BIO              priority 5  [C][I]
     2. APPEARANCE       priority 4  [V]
     3. PSYCH_PROFILE    priority 4  [C]
     4. DYNAMICS         priority 5  [C]
     5. QUIRKS           priority 3  [C]
*/


/*
   FILE: exports/char/C_Jasper.js
   TYPE: Individual Knowledge — Jasper Douglas-Bloodmoon

   DATABASE SOURCES:
     [C] database/characters/C_Jasper_Douglas_Bloodmoon.md
         → BIO, PSYCH_PROFILE, DYNAMICS, QUIRKS
     [V] database/visuals/V_Visual_Baseline.md
         → APPEARANCE: Fusion-visual phenotype
     [V] database/visuals/V_Visual_DNA.md
         → APPEARANCE: Caramel-brown hair, mint green eyes
     [E] database/experiences/Ex_DJFrequency.md
         → BIO/QUIRKS: DJ Frequency double life
     [I] database/institutions/I_UCLA.md
         → BIO: First-Year Engineering
     [I] database/institutions/I_UCLA_GreekLife.md
         → BIO: Legacy Eligible — Refuses Recruitment
     [L] database/locations/L_VerveLounge.md
         → DYNAMICS: Logan's venue

   Entries:
     1. BIO              priority 5  [C][E][I]
     2. APPEARANCE       priority 4  [V]
     3. PSYCH_PROFILE    priority 4  [C]
     4. DYNAMICS         priority 5  [C][L]
     5. QUIRKS           priority 3  [C][E]
*/


/*
   FILE: exports/char/C_Alyssa.js
   TYPE: Individual Knowledge — Alyssa Douglas-Bloodmoon

   DATABASE SOURCES:
     [C] database/characters/C_Alyssa_Douglas_Bloodmoon.md
         → BIO, PSYCH_PROFILE, DYNAMICS, QUIRKS
     [V] database/visuals/V_Visual_Baseline.md
         → APPEARANCE: Fusion-visual, Nixara resemblance
     [V] database/visuals/V_Visual_DNA.md
         → APPEARANCE: Caramel-brown hair, mint green eyes, petite hourglass
     [I] database/institutions/I_UCLA.md
         → BIO: First-Year Pre-Med, 3.8 GPA
     [C] database/characters/C_Angel_Moreno.md
         → DYNAMICS: Best friend
     [C] database/characters/C_Marcus_Thornfield.md
         → DYNAMICS: Primary protector

   Entries:
     1. BIO              priority 5  [C][I]
     2. APPEARANCE       priority 4  [V]
     3. PSYCH_PROFILE    priority 4  [C]
     4. DYNAMICS         priority 5  [C]
     5. QUIRKS           priority 3  [C]
*/


/*
   FILE: exports/char/C_Erik.js
   TYPE: Individual Knowledge — Erik Douglas

   DATABASE SOURCES:
     [C] database/characters/C_Erik_Douglas.md
         → BIO, PSYCH_PROFILE, DYNAMICS, QUIRKS
     [V] database/visuals/V_Visual_Baseline.md
         → APPEARANCE: Black hair with silver streaks, amber eyes, 205cm
     [V] database/visuals/V_Visual_DNA.md
         → APPEARANCE: Douglas phenotype
     [I] database/institutions/I_DCC_Security_BlackWolf.md
         → BIO: CEO of DCC
     [I] database/institutions/I_UCLA.md
         → BIO: Former UCLA Football QB & Captain, 5x champion
     [O] database/organizations/O_KappaSigmaAlpha.md
         → BIO: Ex KSA President
     [H] database/historical/HC_Douglas_Commercial_Lineage.md
         → BIO: Douglas Dynasty origins
     [L] database/locations/L_DouglasEstate.md
         → BIO: Primary residence
     [L] database/locations/L_RoseBowl.md
         → QUIRKS: Regular UCLA game attendee

   Entries:
     1. BIO              priority 5  [C][I][O][H][L]
     2. APPEARANCE       priority 4  [V]
     3. PSYCH_PROFILE    priority 4  [C]
     4. DYNAMICS         priority 5  [C]
     5. QUIRKS           priority 3  [C][L]
*/


/* ============================================================================
   LAYER 3: EXPERIENCES — Scenario Knowledge
   ============================================================================ */

/*
   FILE: exports/Ex_Jasper/Ex_Jasper.js
   TYPE: Experience Knowledge — DJ Frequency / Underground Rave Arc

   DATABASE SOURCES:
     [E] database/experiences/Ex_Jasper.md
         → All entries: narrative framework, settings, NPCs, arc structure
     [C] database/characters/C_Jasper_Douglas_Bloodmoon.md
         → Primary character reference
     [C] database/characters/C_Alyssa_Douglas_Bloodmoon.md
         → Twin sister NPC
     [C] database/characters/C_Erik_Douglas.md
         → Father / antagonist pressure
     [C] database/characters/C_Logan_Douglas.md
         → Uncle / safe haven provider
     [L] database/locations/L_VerveLounge.md
         → Safe haven venue
     [L] database/locations/L_DouglasEstate.md
         → Family residence

   Entries:
     1. Experience Overview    priority 5  [E][C]
     2. Key Settings           priority 4  [E][L]
     3. Character Deep Dive    priority 5  [C]
     4. Relationship Dynamics  priority 4  [C]
     5. Arc Structure          priority 3  [E]

   Note: World Rules removed — covered by W_Contemporary.js and F_DouglasBloodmoon.js
*/


/* ============================================================================
   SUMMARY: FILE-TO-SOURCE MATRIX
   ============================================================================

   Export File                                | Layer        | Database Sources
   -------------------------------------------|--------------|------------------------------------------
   exports/core/En_Core.js                    | Foundation   | NONE (pure engine logic)
   exports/core/W_Contemporary.js             | Foundation   | W_Contemporary.md, L_*.md, I_UCLA.md, I_DCC.md
   exports/core/F_DouglasBloodmoon.js         | Dynasty      | F_*.md, C_Erik.md, C_Nixara.md, C_Siblings.md, I_DCC.md
   exports/template/CHARACTER_Template.js     | Dynasty      | Template for all C_*.js
   exports/char/C_Malachia.js                 | Dynasty      | C_Malachia.md, V_*.md, L_SevenHills.md
   exports/char/C_Noah.js                     | Dynasty      | C_Noah.md, V_*.md, I_UCLA.md
   exports/char/C_Jasper.js                   | Dynasty      | C_Jasper.md, V_*.md, I_UCLA.md
   exports/char/C_Alyssa.js                   | Dynasty      | C_Alyssa.md, V_*.md, I_UCLA.md, C_Angel.md, C_Marcus.md
   exports/char/C_Erik.js                     | Dynasty      | C_Erik.md, V_*.md, I_DCC.md, I_UCLA.md, O_KSA.md, HC_Douglas.md
   exports/char/C_Logan.js                    | Dynasty      | C_Logan.md, V_*.md
   exports/char/C_Wulfnic.js                  | Dynasty      | C_Wulfnic.md, V_*.md
   exports/char/C_Kaladin.js                  | Dynasty      | C_Kaladin.md, V_*.md
   exports/char/C_Marcus.js                   | Dynasty      | C_Marcus.md, V_*.md
   exports/char/C_Angel.js                    | Dynasty      | C_Angel.md, V_*.md
   exports/char/C_Edric.js                    | Dynasty      | C_Edric.md, V_*.md
   exports/char/C_Nixara.js                   | Dynasty      | C_Nixara.md, V_*.md
   exports/Ex_Malachia/Ex_Malachia.js         | Experience   | C_Malachia.md (golden format, 7 files)
   exports/Ex_Noah/Ex_Noah.js                 | Experience   | C_Noah.md (golden format, 7 files)
   exports/Ex_Jasper/Ex_Jasper.js             | Experience   | C_Jasper.md (golden format, 7 files)
   exports/Ex_Alyssa/Ex_Alyssa.js             | Experience   | C_Alyssa.md (golden format, 7 files)
   exports/Ex_Erik/Ex_Erik.js                 | Experience   | C_Erik.md (golden format, 7 files)
   exports/Ex_Logan/Ex_Logan.js               | Experience   | C_Logan.md (golden format, 7 files)
   exports/Ex_Wulfnic/Ex_Wulfnic.js           | Experience   | C_Wulfnic.md (golden format, 7 files)
   exports/Ex_TwinXFamily/Ex_TwinXFamily.js   | Experience   | Twin Resolution Authority, golden format reference


   ============================================================================
   MAINTENANCE RULES
   ============================================================================

   1. When a database record is updated, the corresponding export JS file
      MUST be regenerated to reflect the change.

   2. When a new character is added to database/characters/, a new C_*.js
      file MUST be created using CHARACTER_Template.js as the base.

   3. When a new experience is added to database/experiences/, a new Ex_*.js
      file MUST be created. Ex_*.js files must NOT contain WORLD_RULES entries
      — all world-level rules are provided by W_Contemporary.js and
      F_DouglasBloodmoon.js.

   4. The EXPORT_MAPPING.md file MUST be updated whenever:
      - A new export file is created
      - A database source is added/removed from an export
      - The priority or category structure changes

   5. All export files MUST be ES5-compliant:
      - var only (no let/const)
      - function() {} only (no arrow functions)
      - String concatenation only (no template literals)

   ============================================================================

   Last Updated: 2026-06-11
   Canon Freeze: v1.0
   ============================================================================ */
