# LEGACY ENGINE ANALYSIS REPORT

**Date:** 2026-06-11  
**Auditor:** OWL (Senior Repository Migration Engineer)  
**Scope:** Analysis of `relationship_engine.js` and `state_engine.js` against current architecture  
**Authority:** R-007_Engine_Rules, ADR-000_Runtime_Baseline.md  

---

## ENGINE 1: relationship_engine.js

**Location:** `database_old/scripts/relationship_engine.js`  
**Size:** 94 lines  
**Language:** JavaScript (ES5)  

### Purpose
Manages dynamic relationship states for JanitorAI characters. Injects relationship context directly into character personality via the Behavior Layer.

### Features
1. **Trust State System (0-100)** with 4 thresholds:
   - 0-20: Low Trust (formal, surface-level)
   - 20-50: Cautious (wary but giving benefit of doubt)
   - 50-80: Friendly (comfortable, open)
   - 80-100: Deep Trust (emotionally safe)

2. **Relationship State System** with 8 states:
   - stranger, acquaintance, friend, close friend, partner, mate, enemy, family

3. **Attraction Modifier**: Optional `svart_attraction` variable

4. **Family Dynamic Modifier**: Optional `svart_family_dynamic` variable

5. **Debug Output**: Includes `[DEBUG REL ENGINE]` trust value output

### Reusable Logic
- The trust threshold definitions (0-20-50-80-100) are well-structured and could inform future engine design
- The relationship state progression (stranger → acquaintance → friend → close friend → partner) is a sensible social graph model
- The injection pattern (appending to `context.character.personality`) is the correct JanitorAI behavior layer approach

### Superseded Logic
- The `mate` and `family` relationship states imply supernatural/pack bonding that may conflict with Canon Freeze
- The debug output (`[DEBUG REL ENGINE]`) should be removed for production use
- Variable naming convention `svart_*` is legacy and doesn't match current engine naming

### Bugs/Issues
- None identified. The code is functional ES5.

### Recommended Action: **ARCHIVE**
Transfer to `knowledge/Engine_Logic/Engine_Template/` as reference material. The trust/relationship state logic is well-designed but superseded by current engine architecture. Could be referenced for future engine development.

---

## ENGINE 2: state_engine.js

**Location:** `database_old/scripts/state_engine.js`  
**Size:** 75 lines  
**Language:** JavaScript (ES5)  

### Purpose
Manages dynamic emotional and situational states for JanitorAI characters. Injects state context into character scenario.

### Features
1. **Emotion State System** with 4 states:
   - fear (anxious, seeks safety)
   - anger (sharp, defensive, aggressive)
   - protectiveness (shields user from threats)
   - affection (warm, open)

2. **Scenario State System** with 4 states:
   - school (public, formal decorum)
   - workplace (public, formal decorum)
   - home (private, safe, guard lowered)
   - mission/combat (operational, tactical)

3. **Pack Status System** with 3 states:
   - alpha (assertive, protective)
   - omega (cautious, sensitive to group)
   - outsider (distrustful of pack)

4. **Current Role**: Optional `svart_current_role` variable

### Reusable Logic
- The emotion state system is well-designed with clear behavioral directives
- The scenario state system correctly separates public vs private behavior
- The injection into `context.character.scenario` (rather than personality) is architecturally correct for situational states

### Superseded Logic
- The pack status system (alpha/omega/outsider) implies supernatural werewolf pack structures that conflict with Canon Freeze
- Variable naming convention `svart_*` is legacy

### Bugs/Issues
- **CRITICAL BUG:** Missing `var inject` declaration. Line 14 uses `inject +=` without first declaring `var inject = ""`. This will cause a runtime error in strict mode or create a global variable leak. Must be fixed before any use.

### Recommended Action: **ARCHIVE (with bug fix)**
Transfer to `knowledge/Engine_Logic/Engine_Template/` as reference material after fixing the `var inject` declaration. The emotion/scenario state logic is well-designed but the pack status system is subject to Canon Freeze.

---

## ENGINE 3: En_Core.js (Legacy Core)

**Location:** `database_old/core/En_Core.js`  
**Size:** 1034 lines  
**Language:** JavaScript (ES5)  

### Purpose
The legacy runtime authority layer responsible for world routing, POV override, lorebook compilation, runtime state management, and output standardization.

### Features
1. **World Routing**: Detects active world via keyword matching against dimension aliases
2. **POV Override Firewall**: Intercepts character identity blocks to prevent duplicate NPC manifestations
3. **Lorebook Compilation**: Full priority-based lorebook entry processing with triggers, shifts, and probabilities
4. **Runtime State**: Manages global session variables (world, scenario, environmental)
5. **Output Standardization**: Injects header/HUD/diegetic formatting
6. **User Settings Parser**: Extracts LANGUAGE, NSFW_GATE, DARK_THEMES, PROSE_STYLE
7. **Narrative Engines**: Weather, vitals, travel/fatigue, care escalation
8. **Diegetic UI**: World-appropriate interface formatting
9. **Social/Media Engine**: Gossip, broadcast, intoxication mechanics

### Reusable Logic
- The lorebook compilation engine (priority-based, trigger-based, with shifts) is sophisticated and well-designed
- The user settings parser is a clean implementation
- The diegetic UI system per world is well-structured
- The atmospheric backdrop system (weather pools) is creative and functional

### Superseded Logic
- World routing uses legacy identifiers (modern, pack, cyber, fantasy, underworld) instead of canonical taxonomy
- Contains hardcoded world references (Douglas Estate, Solarton, Bloodmoon, Ambrosia) that should be in World files
- POV Override relies on string parsing (fragile) rather than metadata
- Dual-field schema migration (legacy + canonical) adds complexity
- Contains NSFW behavioral guidelines embedded in the engine

### Technical Debt (Documented in Code)
- DEBT-001: Legacy runtime variable names (mv_active_l1, mv_prev_l1)
- DEBT-002: POV Override identity parsing limitation
- DEBT-003: World-specific lore in En_Core
- DEBT-004: World Registry / Runtime Taxonomy Divergence
- DEBT-005: Lorebook Runtime Schema Divergence

### Recommended Action: **ARCHIVE**
Transfer to `deferred/legacy_engine/` for historical reference. This is comprehensively superseded by the current `engine/` architecture. The documented technical debt provides valuable historical context for current engine design decisions.

---

## EMPTY ENGINES (Confirmed 0 lines)

| File | Status |
|------|--------|
| `scripts/emotion_engine.js` | EMPTY — planned but never implemented |
| `scripts/family_engine.js` | EMPTY — planned but never implemented |
| `scripts/pack_engine.js` | EMPTY — planned but never implemented |
| `scripts/scenario_engine.js` | EMPTY — planned but never implemented |
| `scripts/trust_engine.js` | EMPTY — planned but never implemented |

### Recommended Action: **DELETE**
These files were planned but never implemented. No content to preserve.

---

## COMPARISON: LEGACY vs CURRENT ARCHITECTURE

| Aspect | Legacy (database_old) | Current (database/) |
|--------|----------------------|---------------------|
| Engine Location | `database_old/core/En_Core.js` | `engine/` directory |
| World Routing | Keyword-based dimension aliases | Canonical taxonomy |
| Lorebook Schema | Dual-field (legacy + canonical) | Canonical Schema v1 |
| POV Override | String parsing | Metadata-based (planned) |
| Behavior Scripts | `database_old/scripts/*.js` | `knowledge/Engine_Logic/` |
| Output Format | Header + Prose + HUD | Standardized per BOT_EXPORT_SPECIFICATION |
| Diegetic UI | Hardcoded in En_Core | Template-based |

---

## CLASSIFICATION SUMMARY

| Engine | Classification | Action |
|--------|---------------|--------|
| relationship_engine.js | ARCHIVE | Transfer to knowledge/Engine_Logic/Engine_Template/ |
| state_engine.js | ARCHIVE | Fix bug, then transfer to knowledge/Engine_Logic/Engine_Template/ |
| En_Core.js | ARCHIVE | Transfer to deferred/legacy_engine/ |
| En_Core.md | ARCHIVE | Transfer to deferred/legacy_engine/ |
| emotion_engine.js | DELETE | Empty file |
| family_engine.js | DELETE | Empty file |
| pack_engine.js | DELETE | Empty file |
| scenario_engine.js | DELETE | Empty file |
| trust_engine.js | DELETE | Empty file |

---

**END OF REPORT**
