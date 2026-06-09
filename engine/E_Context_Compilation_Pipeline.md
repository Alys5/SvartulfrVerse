# E-17.2: Context Compilation Pipeline

**Status:** DRAFT
**Date:** 2026-06-09
**Authority:** Engine Authority (R-007)
**Depends on:** E_Runtime_Architecture, E_Retrieval_Architecture

---

## Purpose

Define how retrieved data is compiled into the context window that the bot actually sees. This is the **token budget manager** — it decides what gets included, what gets compressed, and what gets dropped.

---

## Context Classification

All retrieved data is classified into three tiers:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTEXT TIERS                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HARD CONTEXT (never dropped)                                   │
│  ├── Character Identity (name, age, core personality)           │
│  ├── Character Visual (hair, eyes, build)                       │
│  └── Current Location (where the scene takes place)             │
│                                                                 │
│  SOFT CONTEXT (compressed if needed)                            │
│  ├── Family Relationships (who is present, how they relate)     │
│  ├── Location Details (atmosphere, rules, NPCs)                 │
│  ├── Institution Context (relevant institutional rules)         │
│  └── Experience Rules (scenario-specific behavior)              │
│                                                                 │
│  OPTIONAL CONTEXT (dropped first under budget pressure)         │
│  ├── Historical References (backstory, lineage)                  │
│  ├── Organization Details (fraternity, company structure)       │
│  ├── Extended Family (distant relatives not in scene)           │
│  └── World Lore (cultural context, atmosphere)                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Token Budget Model

### JanitorAI Budget

```
Total Context Window:     ~8192 tokens (model dependent)
├── System Prompt:         2048 tokens (reserved)
├── Character Card:        1024 tokens (reserved)
├── Lorebook Entries:       512 tokens (reserved)
├── Conversation History:  3000 tokens (variable)
├── Response Buffer:        512 tokens (reserved)
└── Available for Context: ~1100 tokens (dynamic)
```

### Budget Allocation by Tier

```
Available Context Budget: ~1100 tokens
├── Hard Context:          ~400 tokens  (36%) — ALWAYS included
├── Soft Context:          ~450 tokens  (41%) — Compressed if needed
└── Optional Context:      ~250 tokens  (23%) — Dropped first
```

### Compression Rules

When budget is exceeded:

| Priority | Action | Target |
|----------|--------|--------|
| 1 | Drop Optional Context entirely | Historical, extended family, world lore |
| 2 | Compress Soft Context to summaries | Location details → 1-line summary |
| 3 | Truncate Conversation History | Keep last N exchanges |
| 4 | Reduce Lorebook entries | Keep only active-scene entries |
| 5 | **NEVER compress Hard Context** | Character identity always complete |

---

## Compilation Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                 CONTEXT COMPILATION PIPELINE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Loaded Data Set (from Retrieval Architecture)                  │
│      │                                                          │
│      ▼                                                          │
│  ┌──────────────────┐                                          │
│  │ Classify          │ ← Hard / Soft / Optional                 │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────┐                                          │
│  │ Prioritize        │ ← Sort by tier, then by relevance        │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────┐                                          │
│  │ Token Count       │ ← Estimate tokens per section            │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────┐                                          │
│  │ Budget Check      │ ← Within budget?                        │
│  └────────┬─────────┘                                          │
│           │                                                     │
│     ┌─────┴─────┐                                              │
│     │           │                                              │
│   YES         NO                                               │
│     │           │                                              │
│     │           ▼                                              │
│     │     ┌──────────────────┐                                │
│     │     │ Compress/Drop     │ ← Apply compression rules      │
│     │     └────────┬─────────┘                                │
│     │              │                                           │
│     └──────┬───────┘                                           │
│            │                                                    │
│            ▼                                                    │
│  ┌──────────────────┐                                          │
│  │ Assemble Prompt   │ ← Merge into final context              │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  Output: Compiled Context Window                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section Templates

### Hard Context: Character Identity

```
[CHARACTER]
Name: {{char}}
Age: {{age}}
Role: {{role}}
Core Personality: {{personality_summary}} (3-5 traits max)
Current Emotional State: {{emotional_state}}
```

**Token target:** ~150 tokens

### Hard Context: Character Visual

```
[APPEARANCE]
Hair: {{hair}}
Eyes: {{eyes}}
Build: {{build}}
Height: {{height}}
Aesthetic: {{aesthetic}}
```

**Token target:** ~50 tokens

### Hard Context: Current Location

```
[LOCATION]
Where: {{location_name}}
Atmosphere: {{atmosphere}}
Present: {{characters_present}}
```

**Token target:** ~50 tokens

### Soft Context: Family Relationships

```
[RELATIONSHIPS]
{{character_1}} → {{character_2}}: {{relationship_type}}
{{character_1}} → {{character_3}}: {{relationship_type}}
```

**Token target:** ~100 tokens (compressed from full family graph)

### Soft Context: Location Details

```
[LOCATION DETAILS]
{{location_name}}: {{one_line_description}}
Rules: {{location_rules}}
```

**Token target:** ~75 tokens

### Soft Context: Experience Rules

```
[SCENARIO]
Experience: {{experience_name}}
Active Rules: {{experience_rules}}
Character Override: {{behavior_modifier}}
```

**Token target:** ~100 tokens

### Optional Context: Historical

```
[BACKSTORY]
{{character}}: {{one_line_origin}}
```

**Token target:** ~50 tokens (only if budget allows)

### Optional Context: Organization

```
[ORGANIZATION]
{{org_name}}: {{one_line_description}}
{{character}}'s role: {{role}}
```

**Token target:** ~50 tokens (only if budget allows)

---

## Compiled Prompt Structure

### Final Assembly Order

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPILED PROMPT STRUCTURE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. SYSTEM INSTRUCTIONS (platform-level)                        │
│     └── "You are {{char}}. Respond in character."              │
│                                                                 │
│  2. HARD CONTEXT                                                │
│     ├── [CHARACTER] Identity                                    │
│     ├── [APPEARANCE] Visual                                     │
│     └── [LOCATION] Current setting                              │
│                                                                 │
│  3. SOFT CONTEXT                                                │
│     ├── [RELATIONSHIPS] Who is present                          │
│     ├── [LOCATION DETAILS] Atmosphere & rules                   │
│     ├── [SCENARIO] Experience rules (if active)                 │
│     └── [INSTITUTION] Institutional context (if relevant)       │
│                                                                 │
│  4. OPTIONAL CONTEXT                                            │
│     ├── [BACKSTORY] Historical reference                        │
│     └── [ORGANIZATION] Org context                              │
│                                                                 │
│  5. CONVERSATION HISTORY                                        │
│     └── Last N exchanges                                        │
│                                                                 │
│  6. RESPONSE PROMPT                                             │
│     └── "{{char}}:"                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Worked Examples

### Example 1: Logan at the Verve (Simple Scene)

```
Budget: ~1100 tokens available

Compiled Context:
├── [CHARACTER] Logan Douglas, 42, uncle, mechanic, warm/hazel     120t
├── [APPEARANCE] Dark brown messy hair, hazel eyes, 198cm, broad    40t
├── [LOCATION] The Verve, Arts District, dimly lit, PMC-free        40t
├── [RELATIONSHIPS] Logan → Erik: brother (tension)                 60t
├── [LOCATION DETAILS] Logan's safe haven, back booth, jukebox      50t
├── [BACKSTORY] KSA Alumni, Douglas heir who chose garage            40t
└── TOTAL: ~350 tokens (well within budget)

Remaining budget: ~750 tokens for conversation history
```

### Example 2: Alyssa at Angel & Co (Multi-Entity Scene)

```
Budget: ~1100 tokens available

Compiled Context:
├── [CHARACTER] Alyssa Douglas-Bloodmoon, 20, twin, student         130t
├── [APPEARANCE] Caramel-brown hair, mint green eyes, 165cm          40t
├── [LOCATION] Angel & Co studio, fashion photography                40t
├── [RELATIONSHIPS] Alyssa → Angel: patron, Alyssa → Jasper: twin   80t
├── [LOCATION DETAILS] Boutique studio, professional, creative       50t
├── [ORGANIZATION] Angel & Co: fashion studio, Angel Moreno founder  40t
├── [BACKSTORY] Douglas-Bloodmoon heir, UCLA student, model          40t
└── TOTAL: ~420 tokens (within budget)

Remaining budget: ~680 tokens for conversation history
```

### Example 3: Jasper DJ Frequency (Experience Arc)

```
Budget: ~1100 tokens available

Compiled Context:
├── [CHARACTER] Jasper Douglas-Bloodmoon, 21, twin, DJ/student       130t
├── [APPEARANCE] Caramel-brown messy hair, mint green eyes, 191cm     40t
├── [LOCATION] Illegal rooftop set, strobe lights, warehouse           40t
├── [SCENARIO] DJ Frequency: anonymous, confident, booth persona      80t
├── [RELATIONSHIPS] Jasper → Alyssa: twin (phone contact)             60t
├── [LOCATION DETAILS] Off-grid, no PMC, Erik can't track             50t
└── TOTAL: ~400 tokens (within budget)

Note: Experience context adds ~80 tokens but replaces default behavior
Remaining budget: ~700 tokens for conversation history
```

### Example 4: Family Dinner at Estate (Multi-Character, Budget Pressure)

```
Budget: ~1100 tokens available

Compiled Context:
├── [CHARACTER] {{active_char}} identity                            130t
├── [APPEARANCE] {{active_char}} visual                              40t
├── [LOCATION] Douglas Estate, dining room, surveilled               40t
├── [RELATIONSHIPS] Erik (patriarch), Logan (uncle), Wulfnic (GP)    100t
│   ├── {{active_char}} → Erik: father-son tension                   │
│   ├── {{active_char}} → Logan: uncle-nephew bond                  │
│   └── {{active_char}} → Wulfnic: grandfather respect              │
├── [LOCATION DETAILS] Heavily surveilled, PMC presence, formal      60t
├── [INSTITUTION] DCC Security: Black Wolf division active           50t
├── [BACKSTORY] Douglas dynasty, 1666 origin (compressed)            30t
└── TOTAL: ~450 tokens (within budget)

Note: With 4+ characters present, relationship section expands
but stays within Soft Context budget
Remaining budget: ~650 tokens for conversation history
```

---

## Platform-Specific Notes

### JanitorAI

| Field | Token Impact | Strategy |
|-------|-------------|----------|
| Character Description | High (counted in card) | Keep under 500 tokens |
| Personality | Medium | 3-5 traits, concise |
| Scenario | Medium | Current scene only |
| Example Messages | High | 2-3 examples, short |
| Lorebook | Separate budget | Use for extended context |

### SillyTavern

| Field | Token Impact | Strategy |
|-------|-------------|----------|
| Character Card | Separate budget | Full detail allowed |
| Lorebook | Separate budget | Use for all Soft/Optional context |
| Author's Note | Low | Use for current scene context |
| World Info | Separate budget | Use for location/institution data |

---

## Authority

**Established by:** Engine Architecture Review
**Date:** 2026-06-09
**Version:** v1.0 (DRAFT)
