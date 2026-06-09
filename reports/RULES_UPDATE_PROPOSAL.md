# RULES UPDATE PROPOSAL

**Date:** 2026-06-09
**Authority:** Audit Skill — Phase 15.4
**Context:** Migration is complete. Next phases: Engine Architecture → Bot Framework Design → Live Implementation
**Purpose:** Propose rule updates to govern the next development phase

---

## Executive Summary

| Current Rule Set | Status | Action |
|-----------------|--------|--------|
| R-000 through R-009 | ✅ VALID | Keep all existing rules |
| Engine Rules (R-007) | ⚠️ NEEDS EXPANSION | Add engine-first development governance |
| Bot Rules (R-008) | ⚠️ NEEDS EXPANSION | Add JanitorAI runtime-first philosophy |
| Lorebook Rules (R-009) | ⚠️ NEEDS EXPANSION | Add lorebook generation governance |
| Canon Protection | ⚠️ NEEDS STRENGTHENING | Add Canon Freeze enforcement rules |
| New Rules Needed | 📋 PROPOSED | R-010 (Engine Architecture), R-011 (Bot Framework), R-012 (Validation Pipeline) |

---

## 1. EXISTING RULES — VALIDATION

### 1.1 Rules to Keep As-Is

| Rule | Title | Status | Rationale |
|------|-------|--------|-----------|
| R-000 | Runtime Rules | ✅ KEEP | Still governs architecture decisions and runtime behavior |
| R-001 | Dynastic Rules | ✅ KEEP | Still governs dynasties, bloodlines, genealogy |
| R-002 | Family Rules | ✅ KEEP | Still governs family relationships and genealogy |
| R-003 | Character Rules | ✅ KEEP | Still governs character records and identity |
| R-004 | Visual Rules | ✅ KEEP | Still governs appearance and visual inheritance |
| R-005 | Experience Rules | ✅ KEEP | Still governs scenarios and experience-layer content |
| R-006 | Governance Rules | ✅ KEEP | Still governs repository governance and canon validation |

### 1.2 Rules Needing Expansion

| Rule | Title | Current Scope | Needed Expansion |
|------|-------|---------------|------------------|
| R-007 | Engine Rules | Engine systems, runtime logic | Add: engine-first development, canon protection during engine build, export compatibility |
| R-008 | Bot Rules | Character cards, bot configurations | Add: JanitorAI runtime-first philosophy, platform compatibility, lorebook integration |
| R-009 | Lorebook Rules | Lorebooks, world knowledge bases | Add: automated generation, canon-layer tagging, export format compliance |

---

## 2. PROPOSED RULE EXPANSIONS

### 2.1 R-007 Engine Rules — Proposed Additions

#### E-001: Engine-First Development Principle

```
RULE: Engine development MUST follow the sequence:
  1. Canon Analysis (read database/ records)
  2. Engine Specification (document behavior)
  3. Validation Pipeline (define checks)
  4. Implementation (build engine)
  5. Export (generate bot/lorebook output)

NEVER reverse this order. Engine behavior derives from canon, never the reverse.
```

#### E-002: Canon Protection During Engine Build

```
RULE: Engine development MUST NOT modify, infer, or create canon.
- Engine reads database/ as read-only input
- Engine outputs are deployment artifacts, not canon
- Any canon change requires Authority Decision (ADR)
- Engine bugs are fixed in engine code, never in canon records
```

#### E-003: Export Compatibility Requirement

```
RULE: All engine outputs MUST be compatible with:
  - JanitorAI (primary target)
  - SillyTavern (secondary target)
  - Generic JSON (fallback format)

Engine MUST support platform-specific features:
  - JanitorAI: character cards, lorebooks, regex scripts
  - SillyTavern: character cards, world info, group chats
```

#### E-004: Pronoun Macro Boundary

```
RULE: Pronoun-dependent resolution belongs in prompt construction,
NOT in JavaScript conditional logic.

Validated macros: {{sub}}, {{obj}}, {{poss}}, {{poss_p}}, {{ref}}
- Prompt Layer Access = Available
- JavaScript Runtime Access = Available (via chat object)

If runtime pronoun API is unavailable, engine MUST fall back to
prompt-layer expansion without breaking character behavior.
```

### 2.2 R-008 Bot Rules — Proposed Additions

#### B-001: JanitorAI Runtime-First Philosophy

```
RULE: Bot generation MUST prioritize JanitorAI runtime behavior.
- Character cards are runtime artifacts, not documentation
- Every field in a character card must serve runtime behavior
- Lorebook entries must be runtime-queryable
- Bot personality must be executable, not just descriptive
```

#### B-002: Platform Compatibility Matrix

```
RULE: Bot exports MUST declare platform compatibility:
  - JanitorAI: Full compatibility (primary)
  - SillyTavern: Full compatibility (secondary)
  - Generic JSON: Partial compatibility (fallback)

Bot exports MUST handle platform-specific features:
  - JanitorAI-specific: regex scripts, lorebook settings, activation tokens
  - SillyTavern-specific: world info, group chat config, greeting messages
  - Generic: basic character card fields only
```

#### B-003: Canon Traceability

```
RULE: Every bot field MUST be traceable to a canonical source.
- Character personality → C_[Name].md → Personality section
- Visual description → W_Visual_Baseline.md + W_Visual_DNA.md
- Family relationships → F_Parent_Child.md + F_Marriages.md
- Lore entries → database/ source records
- World knowledge → W_Contemporary.md + institution/location records

Untraceable fields are forbidden. No "creative additions" in bot exports.
```

#### B-004: Token Optimization

```
RULE: Bot exports MUST be token-efficient.
- Character cards: Maximum 2000 tokens for personality/traits
- Lorebook entries: Maximum 500 tokens per entry
- Scenario framing: Maximum 1000 tokens per experience
- Use templates from knowledge/Guidelines/ for consistent formatting
- Compress redundant descriptions; keep unique narrative value
```

### 2.3 R-009 Lorebook Rules — Proposed Additions

#### L-001: Canon-Layer Tagging

```
RULE: Every lorebook entry MUST be tagged with its canon layer.
- [ACTIVE] — Runtime-eligible, governance-enforced
- [HISTORICAL] — Documented facts, reference only
- [CULTURAL] — Family traditions/myths, dialogue flavor only, NEVER factual
- [DEFERRED] — Valid but not currently active
- [CANDIDATE] — Proposed, not yet approved

Cultural canon entries MUST be clearly marked to prevent runtime systems
from treating them as factual.
```

#### L-002: Lorebook Generation Priority

```
RULE: Lorebook generation follows this priority order:
  1. Core entries (Dynasty, Patriarch, Los Angeles, Douglas Estate)
  2. Character entries (all Primary Canon characters)
  3. Institution/location entries (UCLA, DCC, KSA)
  4. Extended entries (secondary characters, specialized locations)
  5. Cultural entries (Svartúlfr heritage, family legends)

Generate in this order. Do not generate extended entries before core.
```

#### L-003: Lorebook Entry Structure

```
RULE: Every lorebook entry MUST include:
  - Entry title (entity name)
  - Canon layer tag ([ACTIVE], [HISTORICAL], [CULTURAL], etc.)
  - Key information (3-5 bullet points)
  - Trigger conditions (when should this entry activate?)
  - Character connections (which characters relate to this entry?)
  - Source attribution (which database/ record is the source?)

Entry format MUST comply with JanitorAI and SillyTavern lorebook specifications.
```

---

## 3. PROPOSED NEW RULES

### 3.1 R-010: Engine Architecture Rules

```
RULE SET: Engine Architecture Governance
PURPOSE: Govern the design and implementation of the SvartúlfrVerse engine

EA-001: Engine reads canon, never writes to it.
EA-002: Engine outputs are deployment artifacts (bots, lorebooks), not canon.
EA-003: Engine MUST support all 5 canon layers (Active, Historical, Cultural, Deferred, Candidate).
EA-004: Engine MUST respect authority boundaries (Family, Character, Visual, Experience).
EA-005: Engine MUST be token-budget aware (track and limit context window usage).
EA-006: Engine MUST support JanitorAI as primary runtime, SillyTavern as secondary.
EA-007: Engine implementation requires Architecture Review before coding begins.
EA-008: Engine MUST pass validation pipeline before any export.
```

### 3.2 R-011: Bot Framework Rules

```
RULE SET: Bot Framework Governance
PURPOSE: Govern the creation and export of bot character cards and configurations

BF-001: Bot creation starts from database/ canon, not from scratch.
BF-002: Bot personality MUST match C_[Name].md → Psychology/Personality section.
BF-003: Bot visual description MUST match W_Visual_Baseline.md + W_Visual_DNA.md.
BF-004: Bot scenario MUST reference Ex_[Name].md experience records.
BF-005: Bot MUST include lorebook references for all major entities.
BF-006: Bot export MUST be validated against BOT_EXPORT_SPECIFICATION.md.
BF-007: Bot MUST be tested for JanitorAI compatibility before release.
BF-008: Bot updates are allowed only when canon changes (via Authority Decision).
```

### 3.3 R-012: Validation Pipeline Rules

```
RULE SET: Validation Pipeline Governance
PURPOSE: Govern the validation checks applied to all outputs

VP-001: All canon records MUST pass 47-check validation pipeline.
VP-002: All bot exports MUST pass schema validation before release.
VP-003: All lorebook entries MUST pass canon-layer tagging validation.
VP-004: All engine outputs MUST pass authority boundary validation.
VP-005: Validation failures are BLOCKING — fix before proceeding.
VP-006: Validation pipeline MUST be updated when new rules are added.
VP-007: Validation results MUST be documented in reports/ (not in repository).
```

---

## 4. CANON FREEZE ENFORCEMENT

### 4.1 Canon Freeze v1.1 — Current Rules

| Rule | Status |
|------|--------|
| No new canon creation without Authority Decision | ✅ ENFORCE |
| No lore expansion without Authority Decision | ✅ ENFORCE |
| No recovery workflow for rejected canon | ✅ ENFORCE |
| No direct archive imports | ✅ ENFORCE |
| No supernatural system introduction | ✅ ENFORCE |
| Bug fixes to existing records are allowed | ✅ ENFORCE |
| Documentation maintenance is allowed | ✅ ENFORCE |
| Canon Recovery Workflow for new candidates is allowed (with full audit) | ✅ ENFORCE |

### 4.2 Proposed Additions for Engine Phase

| Rule | Rationale |
|------|-----------|
| Engine code MUST NOT contain hardcoded canon | Canon comes from database/ at runtime |
| Bot outputs MUST NOT create persistent canon | Bots are read-only consumers |
| Lorebook entries MUST NOT modify source records | Lorebooks are derived artifacts |
| JanitorAI runtime behavior MUST NOT feed back into canon | Runtime is not authority |

---

## 5. REPOSITORY MAINTENANCE RULES

### 5.1 File Creation Rules

| Rule | Scope |
|------|-------|
| No new files in database/ without Authority Decision | Canon protection |
| No new files in core/ without Architecture Review | Governance protection |
| New files in knowledge/ require documentation alignment | Knowledge layer |
| New files in reports/ are audit-only, not persistent | Audit trail |
| New files in deployment/ require Engine phase authorization | Deployment layer |

### 5.2 Deletion Rules

| Rule | Scope |
|------|-------|
| NEVER delete database/ files without Architecture Review | Canon protection |
| NEVER delete core/ files without Authority Decision | Governance protection |
| NEVER delete .trae/rules/ files | Rules are frozen |
| NEVER delete .trae/skills/ files | Skills are frozen |
| Staged deletion allowed for deprecated structures only | With audit trail |

---

## 6. JANITORAI RUNTIME-FIRST PHILOSOPHY

### 6.1 Core Principles

| Principle | Description |
|-----------|-------------|
| Runtime behavior is ground truth | What the bot DOES in JanitorAI matters more than what documentation SAYS |
| Character cards are executable code | Personality fields are instructions, not descriptions |
| Lorebooks are query engines | Entries activate based on triggers, not linear reading |
| Token budget is a hard constraint | Every token must earn its place |
| Platform features are capabilities | Use JanitorAI-specific features when they improve runtime |

### 6.2 JanitorAI-Specific Rules

| Rule | Description |
|------|-------------|
| Greeting message sets the scene | Opening message MUST establish character voice and scenario |
| Personality is behavior, not biography | Describe what the character DOES, not who they ARE |
| Scenario framing is context, not plot | Set the stage, don't write the story |
| Lorebook triggers are precision tools | Use specific keywords, not broad matches |
| Regex scripts are behavior modifiers | Use for formatting, not for canon changes |

---

## 7. IMPLEMENTATION RECOMMENDATION

### 7.1 Rule Update Process

```
1. Review this proposal (Phase 15.4)
2. Approve/reject/modify proposed rules (User decision)
3. Update .trae/rules/ files (Phase 15.5 or 17)
4. Update project_memory.md with new rules
5. Begin engine development under new governance (Phase 17)
```

### 7.2 Priority Order

| Priority | Action | Phase |
|----------|--------|-------|
| 1 | Expand R-007 (Engine Rules) with E-001 through E-004 | Phase 17 |
| 2 | Create R-010 (Engine Architecture Rules) | Phase 17 |
| 3 | Expand R-008 (Bot Rules) with B-001 through B-004 | Phase 18 |
| 4 | Create R-011 (Bot Framework Rules) | Phase 18 |
| 5 | Expand R-009 (Lorebook Rules) with L-001 through L-003 | Phase 18 |
| 6 | Create R-012 (Validation Pipeline Rules) | Phase 19 |

---

**Auditor:** OWL — Phase 15.4 Audit
**Date:** 2026-06-09
