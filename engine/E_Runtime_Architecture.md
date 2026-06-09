# E-17.0: Runtime Architecture

**Status:** DRAFT
**Date:** 2026-06-09
**Authority:** Engine Authority (R-007)
**Depends on:** ARCHITECTURE_BASELINE_v1, ADR-000, ADR-007

---

## Purpose

Define the runtime architecture for the SvartúlfrVerse engine — the system that transforms canonical data (`database/`) into runtime behavior (bot responses, lorebook entries, context windows).

This document answers: **What kind of engine are we building?**

---

## Engine Type

### Classification: Hybrid Multi-Character World Engine

```
┌─────────────────────────────────────────────────────────────────┐
│                 SVARTÚLFRVERSE ENGINE TYPE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Single Character    ─── NO  (not the only mode)               │
│  Multi Character     ─── YES (primary mode)                    │
│  Scene Engine        ─── YES (experience-driven)               │
│  World Engine        ─── YES (location-aware)                  │
│  Hybrid              ─── YES (all of the above)                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The engine must support:

1. **Single-character bots** — One character, one player, focused narrative (e.g., Jasper DJ Frequency arc)
2. **Multi-character scenes** — Multiple characters in shared context (e.g., family dinner at Douglas Estate)
3. **World-aware responses** — Character behavior changes based on location (Estate vs. UCLA vs. The Verve)
4. **Experience-scoped context** — Different rules apply in different narrative contexts (DJ Frequency vs. Family Drama)

---

## Single Source of Truth — Runtime

### Repository SSoT

```
database/  ← Canonical SSoT (authoritative)
```

### Runtime SSoT Hierarchy

In case of conflict between runtime sources:

```
1. database/          ← ALWAYS WINS (canonical authority)
2. engine/config/     ← Runtime overrides (non-canonical)
3. platform defaults  ← JanitorAI/SillyTavern defaults (lowest priority)
```

**Rule:** Runtime configuration can supplement but NEVER override canonical data. If `database/characters/C_Erik.md` says Erik's eyes are amber, no runtime config can change them to blue.

### Source Priority by Data Type

| Data Type | Primary Source | Fallback | Conflict Resolution |
|-----------|---------------|----------|-------------------|
| Character Identity | `database/characters/C_*.md` | Engine config | Database wins |
| Family Genealogy | `database/families/F_*.md` | None | Database wins |
| Visual Appearance | `database/visuals/V_*.md` | Character record | Visual Authority wins |
| World Setting | `database/worlds/W_*.md` | Location records | World Authority wins |
| Location Data | `database/locations/L_*.md` | World record | Location wins |
| Institution Data | `database/institutions/I_*.md` | World record | Institution wins |
| Experience Context | `database/experiences/Ex_*.md` | Character record | Experience wins |
| Historical Reference | `database/historical/HC_*.md` | None | Database wins |

---

## Retrieval Architecture

### Design Decision: Character-First Retrieval

```
User Input
    │
    ▼
┌─────────────────────┐
│ Character Selection  │ ← Who is the bot?
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Always-Load Set     │ ← Character + Family + World
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Context Detection   │ ← Where? What experience?
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Conditional Load    │ ← Location + Institution + Experience
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Context Compilation │ ← Merge all loaded data
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Response Generation │ ← Bot responds
└─────────────────────┘
```

**Rationale:** Character-first because the bot IS the character. The character's identity, relationships, and visual appearance are always relevant. Location and experience are contextual.

Alternative considered: Location-first (load location, then characters within it). Rejected because it assumes the character is defined by location, which breaks for mobile characters (Jasper's DJ sets happen at changing locations).

---

## Character Loading Policy

### Always-Load Set

When a character is selected, these records are **always** loaded:

| Record | Reason |
|--------|--------|
| `C_[Character].md` | Core identity — always needed |
| `F_Douglas_Bloodmoon.md` | Family context — always relevant for dynasty characters |
| `W_Contemporary.md` | World context — always relevant |
| `V_Visual_Baseline.md` | Visual reference — needed for consistent description |
| `V_Visual_Inheritance.md` | Inheritance model — needed for family visual context |

### Conditional-Load Set

Loaded based on **context detection** (location, experience, user input):

| Trigger | Load |
|---------|------|
| Scene at Douglas Estate | `L_DouglasEstate.md`, `I_DCC_Security_BlackWolf.md` |
| Scene at UCLA | `L_UCLACampus.md`, `I_UCLA.md` |
| Scene at The Verve | `L_VerveLounge.md` |
| DJ Frequency experience | `Ex_DJFrequency.md` |
| KSA-related content | `O_KappaSigmaAlpha.md`, `I_UCLA_GreekLife.md` |
| Modeling/fashion content | `I_AngelAndCo.md` |
| Security content | `C_Kaladin_Nargathon.md`, `C_Marcus_Thornfield.md` |
| Historical reference | `HC_Douglas_Commercial_Lineage.md`, `HC_Edric_Aettfadir_Svartulfa.md` |

### Character-Specific Loading Profiles

#### Logan Douglas

```
Always Load:
- C_Logan_Douglas.md
- F_Douglas_Bloodmoon.md
- W_Contemporary.md
- V_Visual_Baseline.md

Conditional (always available):
- L_VerveLounge.md (primary location)
- L_DouglasCustoms.md (secondary location)
- O_KappaSigmaAlpha.md (KSA Alumni)
- I_UCLA_GreekLife.md (Greek Life context)
- C_Edric_Douglas.md (son)
- C_Erik_Douglas.md (brother)
```

#### Alyssa Douglas-Bloodmoon

```
Always Load:
- C_Alyssa_Douglas_Bloodmoon.md
- F_Douglas_Bloodmoon.md
- W_Contemporary.md
- V_Visual_Baseline.md
- V_Visual_Inheritance.md (Nixara resemblance)

Conditional (always available):
- L_UCLACampus.md (UCLA student)
- I_UCLA.md (institutional context)
- I_AngelAndCo.md (modeling patronage)
- C_Jasper_Douglas_Bloodmoon.md (twin)
- C_Marcus_Thornfield.md (protection detail)
```

#### Jasper Douglas-Bloodmoon

```
Always Load:
- C_Jasper_Douglas_Bloodmoon.md
- F_Douglas_Bloodmoon.md
- W_Contemporary.md
- V_Visual_Baseline.md
- V_Visual_Inheritance.md (twin fusion)

Conditional (always available):
- L_UCLACampus.md (UCLA student)
- L_VerveLounge.md (frequent)
- Ex_DJFrequency.md (DJ Frequency arc)
- C_Alyssa_Douglas_Bloodmoon.md (twin)
- I_UCLA_GreekLife.md (Legacy Eligible — refuses)
```

---

## Runtime Authority Hierarchy

### Generation-Time Override Chain

During response generation, authority flows top-down:

```
┌─────────────────────────────────────────────────────────────────┐
│                 RUNTIME AUTHORITY HIERARCHY                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Level 1: Character Identity                                    │
│  (Who am I? Core personality, name, age)                       │
│      ↑                                                          │
│      │ overridden by                                            │
│      │                                                          │
│  Level 2: Experience Context                                    │
│  (What scenario? Temporary role, setting, rules)               │
│      ↑                                                          │
│      │ overridden by                                            │
│      │                                                          │
│  Level 3: World Context                                         │
│  (Where? Location rules, atmosphere, institutions)             │
│      ↑                                                          │
│      │ overridden by                                            │
│      │                                                          │
│  Level 4: Family Context                                        │
│  (Who is present? Relationship dynamics, family rules)         │
│      ↑                                                          │
│      │ overridden by                                            │
│      │                                                          │
│  Level 5: Visual Authority                                      │
│  (How do I look? Appearance, aesthetic, generation rules)      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Override Rules

| Level | Can Override | Cannot Override |
|-------|-------------|-----------------|
| 1 Character | Nothing (foundational) | — |
| 2 Experience | Character behavior (temporary) | Character identity (permanent) |
| 3 World | Character location, social context | Character personality |
| 4 Family | Character relationship dynamics | Character identity |
| 5 Visual | Nothing (always applies) | — |

**Key Principle:** Experience can temporarily modify *how* a character behaves but never *who* they are. A character at a formal dinner speaks differently than at a rooftop rave, but their core identity remains constant.

### Example: Jasper at DJ Frequency

```
Level 1: Jasper Identity → Chaotic-good, empathic, anti-authoritarian
Level 2: DJ Frequency Experience → Anonymous, confident, booth persona
Level 3: World (rooftop) → Illegal, high-energy, strobe lights
Level 4: Family (none present) → No family pressure, free expression
Level 5: Visual → Caramel-brown messy hair, mint green eyes, hypebeast

Result: Jasper behaves as "DJ Frequency" — confident, anonymous, free
        BUT still Jasper — empathic, chaotic-good, verbally fast
```

### Example: Jasper at Family Dinner

```
Level 1: Jasper Identity → Chaotic-good, empathic, anti-authoritarian
Level 2: Experience (none) → Default behavior
Level 3: World (Douglas Estate) → Surveilled, formal, Erik's domain
Level 4: Family (Erik present) → Suppressed rebellion, verbal tension
Level 5: Visual → Caramel-brown messy hair, mint green eyes, hypebeast

Result: Jasper behaves as "heir" — restrained, tense, compliant
        BUT still Jasper — internal rebellion, eye contact avoidance
```

---

## Context Compilation Pipeline

### Phase 1: Input Analysis

```
User Input
    │
    ├─► Character mention detection
    ├─► Location mention detection
    ├─► Experience trigger detection
    └─► Relationship context detection
```

### Phase 2: Data Retrieval

```
Character Selection
    │
    ├─► Load Always-Load Set
    ├─► Detect context triggers
    └─► Load Conditional Set
```

### Phase 3: Context Assembly

```
Loaded Data
    │
    ├─► Merge character identity
    ├─► Apply world context
    ├─► Apply experience overrides
    ├─► Apply family dynamics
    └─► Apply visual standards
```

### Phase 4: Prompt Construction

```
Assembled Context
    │
    ├─► System prompt (character identity + world rules)
    ├─► Lorebook entries (family + relationships + locations)
    ├─► Scenario framing (experience context)
    └─► Visual anchors (appearance standards)
```

### Phase 5: Response Generation

```
Compiled Prompt
    │
    └─► Bot generates response
        │
        └─► Validated against authority hierarchy
```

---

## Platform Targets

| Platform | Format | Priority |
|----------|--------|----------|
| JanitorAI | Character Card (JSON/PNG) | Primary |
| SillyTavern | Character Card (JSON/PNG) + Lorebook | Secondary |
| Generic JSON | Structured JSON export | Future |

---

## Engine Phases

| Phase | Document | Status |
|-------|----------|--------|
| 17.0 | Runtime Architecture | ✅ This document |
| 17.1 | Retrieval Architecture | ⏳ Pending |
| 17.2 | Character Loading Policy | ⏳ Pending |
| 17.3 | Runtime Authority Hierarchy | ⏳ Pending (defined inline above) |
| 17.4 | Context Compilation Pipeline | ⏳ Pending (defined inline above) |
| 18 | Bot Framework | ⏳ Pending |
| 19 | Production Bots | ⏳ Pending |

---

## Authority

**Established by:** Engine Architecture Review
**Date:** 2026-06-09
**Version:** v1.0 (DRAFT)
**Depends on:** ARCHITECTURE_BASELINE_v1
