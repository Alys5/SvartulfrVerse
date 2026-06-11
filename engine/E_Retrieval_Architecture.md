# E-17.1: Retrieval Architecture

**Status:** DRAFT
**Date:** 2026-06-09
**Authority:** Engine Authority (R-007)
**Depends on:** E_Runtime_Architecture

---

## Purpose

Define the exact retrieval pipeline: how user input translates into data loading decisions. This is the **decision engine** that sits between user input and context compilation.

---

## Retrieval Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    RETRIEVAL PIPELINE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User Input                                                     │
│      │                                                          │
│      ▼                                                          │
│  ┌──────────────────┐                                          │
│  │ Entry Mode Detect │ ← ADR-008: Character/Location/Inst/Scene │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────┐                                          │
│  │ Intent Detection  │ ← What is the user doing?               │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────┐                                          │
│  │ Entity Detection  │ ← Who/where/what is referenced?         │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────┐                                          │
│  │ Context Matching  │ ← Which experience/location applies?    │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────┐                                          │
│  │ Load Decision     │ ← Always vs Conditional vs Skip         │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  ┌──────────────────┐                                          │
│  │ Data Retrieval    │ ← Fetch from database/                   │
│  └────────┬─────────┘                                          │
│           │                                                     │
│           ▼                                                     │
│  Output: Loaded Data Set                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 0: Entry Mode Detection (ADR-008)

Before intent analysis, the system determines the **entry mode** — the root context for all subsequent retrieval.

### Detection Rules

| Priority | Check | Entry Mode | Example |
|----------|-------|------------|---------|
| 1 | Character name/pronoun detected | CHARACTER | "Logan", "he", "Alyssa" |
| 2 | Experience trigger matched | SCENARIO | "underground set", "family dinner" |
| 3 | Location name/type detected | LOCATION | "The Verve", "campus", "bar" |
| 4 | Institution name/type detected | INSTITUTION | "UCLA", "studio", "DCC" |
| 5 | None detected | CHARACTER (default) | Generic input |

### Entry Mode Priority

When multiple modes could apply:
1. **CHARACTER** wins over LOCATION (if a specific character is mentioned)
2. **SCENARIO** wins over LOCATION (if experience trigger matches)
3. **LOCATION** wins over INSTITUTION (location is more specific)
4. Default: CHARACTER

### Retrieval Order by Entry Mode

| Mode | Retrieval Order |
|------|----------------|
| CHARACTER | Character → Family → World → Visual → Location → Institution → Experience |
| LOCATION | Location → Characters present → World → Visual → Institution → Experience |
| INSTITUTION | Institution → Location → Characters → World → Visual → Experience |
| SCENARIO | Experience → Characters → Location → World → Visual |

---

## Phase 1: Intent Detection

Classify the user's input into one of these intents:

| Intent | Signal | Action |
|--------|--------|--------|
| SCENE_START | "Let's go to...", "We're at...", "Meet me at..." | Set location context |
| CHARACTER_ACTION | "{{char}} does...", "I go to..." | Execute character action |
| DIALOGUE | Quoted speech | Process as dialogue |
| NARRATIVE | Past tense, storytelling | Process as narrative |
| SETTING_CHANGE | "Later that day...", "The next morning..." | Shift temporal context |
| META | "OOC:", "Let's switch to..." | Handle meta-instruction |
| EXPERIENCE_TRIGGER | Matches experience trigger conditions | Load experience context |

### Intent Priority

If multiple intents are detected:
1. META (always first)
2. EXPERIENCE_TRIGGER
3. SETTING_CHANGE
4. SCENE_START
5. CHARACTER_ACTION / DIALOGUE (processed together)

---

## Phase 2: Entity Detection

Scan input for references to canonical entities:

### Character Detection

| Pattern | Example | Entity |
|---------|---------|--------|
| Proper name | "Logan", "Jasper", "Erik" | Character record |
| Pronoun (resolved) | "he", "she", "they" | Contextual character |
| Title | "Director", "CEO", "twin" | Character record via role |
| Relationship | "brother", "son", "uncle" | Character record via family graph |

### Location Detection

| Pattern | Example | Entity |
|---------|---------|--------|
| Proper name | "The Verve", "UCLA", "Estate" | Location record |
| Location type | "bar", "campus", "room" | Location record via context |
| Relative | "home", "work", "school" | Location record via character binding |
| District | "Arts District", "Westwood", "Beverly Hills" | Location record via region |

### Institution Detection

| Pattern | Example | Entity |
|---------|---------|--------|
| Proper name | "Angel & Co", "KSA", "UCLA" | Institution record |
| Organization type | "studio", "fraternity", "university" | Institution record via context |

### Experience Detection

| Pattern | Example | Entity |
|---------|---------|--------|
| Proper name | "DJ Frequency" | Experience record |
| Activity type | "underground set", "family dinner" | Experience record via trigger |

---

## Phase 3: Context Matching

Match detected entities to current context:

### Context State Machine

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONTEXT STATE MACHINE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ACTIVE CONTEXT                                                 │
│  ├── Current Character: C_Logan_Douglas                        │
│  ├── Current Location: L_VerveLounge                           │
│  ├── Current Experience: None                                  │
│  ├── Present Characters: [C_Logan_Douglas]                     │
│  └── Loaded Data: [Always-Load Set for Logan]                  │
│                                                                 │
│  ON ENTITY DETECTION:                                           │
│  ├── New character mentioned? → Add to Present Characters      │
│  │   └── Load character record if not already loaded           │
│  ├── New location mentioned? → Flag location change            │
│  │   └── Queue location load on scene transition               │
│  ├── Experience trigger? → Load experience context             │
│  └── Institution mentioned? → Load institution record          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Context Transition Rules

| Current State | Trigger | New State |
|---------------|---------|-----------|
| Any | "OOC: switch to [char]" | Reset all, load new character |
| Any | "Let's go to [location]" | Keep character, change location, reload conditional set |
| Any | Experience trigger match | Overlay experience context on current state |
| Multi-char | Character leaves scene | Remove from present characters, keep loaded |
| Multi-char | Character enters scene | Add to present characters, load if needed |

---

## Phase 4: Load Decision

For each detected entity, decide: **Always / Conditional / Skip**

### Always-Load Rules

These are ALWAYS loaded when their bound character is active:

| Load | Condition |
|------|-----------|
| Character record | Character is active |
| `F_Douglas_Bloodmoon.md` | Any Douglas/Bloodmoon/Douglas-Bloodmoon character |
| `W_Contemporary.md` | Any scene |
| `V_Visual_Baseline.md` | Any scene with visual description needs |
| `V_Visual_Inheritance.md` | Any scene with multiple family members |

### Conditional-Load Rules

Loaded when context triggers are detected:

| Load | Trigger | Example Input |
|------|---------|---------------|
| `L_VerveLounge.md` | "Verve", "Arts District bar", "Logan's place" | "Let's go to the Verve" |
| `L_DouglasEstate.md` | "Estate", "home", "Erik's house", "family dinner" | "We're having dinner at the Estate" |
| `L_UCLACampus.md` | "UCLA", "campus", "class", "Westwood" | "Alyssa goes to class" |
| `L_RoseBowl.md` | "Rose Bowl", "football game", "Bruins game" | "Erik attends the game" |
| `L_SevenHills.md` | "Seven Hills", "ancestral estate", "training base" | Reference to Seven Hills |
| `L_DouglasCustoms.md` | "customs", "garage", "motorcycle shop" | "Logan's workshop" |
| `L_SantaMonicaWaterfront.md` | "Santa Monica", "beach", "waterfront" | "They met at the waterfront" |
| `I_UCLA.md` | "UCLA" + institutional context | "UCLA announced..." |
| `I_UCLA_GreekLife.md` | "Greek Life", "fraternity", "sorority", "rush" | "KSA rush week" |
| `I_UCLA_StudentOrganizations.md` | "student org", "club", "USAC" | "She joined a club" |
| `I_UCLA_USAC.md` | "student government", "USAC", "election" | "USAC election" |
| `I_AngelAndCo.md` | "Angel & Co", "photoshoot", "studio", "fashion" | "Alyssa's photoshoot at Angel & Co" |
| `I_DCC_Security_BlackWolf.md` | "security", "PMC", "Black Wolf", "surveillance" | "Security tightened" |
| `I_KappaSigmaAlpha.md` | "KSA", "Kappa Sigma Alpha", fraternity name | "KSA alumni event" |
| `Ex_DJFrequency.md` | "DJ Frequency", "underground set", "rooftop rave" | "Jasper's secret set" |
| `HC_Douglas_Commercial_Lineage.md` | "Merchant House", "1666", "Douglas history" | Historical reference |
| `HC_Edric_Aettfadir_Svartulfa.md` | "Edric", "Svartúlfr origin", "725 AD" | Historical reference |

### Skip Rules

These are NEVER auto-loaded; only loaded on explicit narrative need:

| Skip | Reason |
|------|--------|
| Historical records unless explicitly referenced | Token cost, low frequency |
| Other characters' full records in single-character bots | Token cost; cross-reference only |
| Entire institution system | Load only the specific institution referenced |
| All locations in a region | Load only the specific location referenced |

---

## Phase 5: Data Retrieval

### Retrieval Order

```
1. Character record(s)           ← Always first
2. Family records                ← If character is dynasty member
3. World record                  ← Always
4. Visual records                ← Always
5. Location record               ← If location detected
6. Institution record(s)         ← If institution detected
7. Experience record             ← If experience triggered
8. Organization record           ← If organization detected
9. Character records (additional)← If other characters mentioned
10. Historical records           ← Only if explicitly referenced
```

### Retrieval Failure Handling

| Failure | Response |
|---------|----------|
| Character not found in database | Use input as-is (custom character) |
| Location not found | Use input as-is (generic location) |
| Institution not found | Use input as-is, flag for review |
| Experience not found | Ignore experience context |
| Cross-reference broken | Log warning, skip broken ref |

---

## Worked Examples

### Example 1: Scene Start

```
Input: "Logan is working at the Verve"

Intent: CHARACTER_ACTION + SCENE_START
Entities: [C_Logan_Douglas, L_VerveLounge]

Load Decision:
├── ALWAYS: C_Logan_Douglas, F_Douglas_Bloodmoon, W_Contemporary,
│           V_Visual_Baseline, V_Visual_Inheritance
├── CONDITIONAL (triggered): L_VerveLounge, I_KappaSigmaAlpha
└── SKIP: I_AngelAndCo, I_UCLA, L_UCLACampus, I_DCC_Security_BlackWolf

Output: Logan + Family + World + Visual + Verve + KSA context loaded
```

### Example 2: Multi-Character Scene

```
Input: "Alyssa photoshoot at Angel & Co"

Intent: CHARACTER_ACTION + LOCATION
Entities: [C_Alyssa_Douglas_Bloodmoon, I_AngelAndCo]

Load Decision:
├── ALWAYS: C_Alyssa, F_Douglas_Bloodmoon, W_Contemporary,
│           V_Visual_Baseline, V_Visual_Inheritance
├── CONDITIONAL (triggered): I_AngelAndCo, C_Angel_Moreno
└── SKIP: L_VerveLounge, I_UCLA, Ex_DJFrequency

Output: Alyssa + Family + World + Visual + Angel & Co + Angel Moreno loaded
```

### Example 3: Experience Trigger

```
Input: "Jasper is setting up for an underground set"

Intent: EXPERIENCE_TRIGGER
Entities: [C_Jasper_Douglas_Bloodmoon, Ex_DJFrequency]

Load Decision:
├── ALWAYS: C_Jasper, F_Douglas_Bloodmoon, W_Contemporary,
│           V_Visual_Baseline, V_Visual_Inheritance
├── CONDITIONAL (triggered): Ex_DJFrequency
└── SKIP: I_UCLA, L_UCLACampus (unless explicitly mentioned)

Output: Jasper + Family + World + Visual + DJ Frequency experience loaded
```

### Example 4: Meta Switch

```
Input: "OOC: switch to Erik at the Rose Bowl"

Intent: META + CHARACTER_SWITCH + LOCATION
Entities: [C_Erik_Douglas, L_RoseBowl]

Load Decision:
├── RESET all previous context
├── ALWAYS: C_Erik, F_Douglas_Bloodmoon, W_Contemporary,
│           V_Visual_Baseline
├── CONDITIONAL (triggered): L_RoseBowl, I_UCLA
└── SKIP: L_VerveLounge, Ex_DJFrequency, I_AngelAndCo

Output: Erik + Family + World + Visual + Rose Bowl + UCLA loaded
```

### Example 5: Family Scene

```
Input: "Sunday dinner at the Estate"

Intent: SCENE_START + SOCIAL
Entities: [L_DouglasEstate]

Context: Multiple family members implied

Load Decision:
├── ALWAYS: C_[active_char], F_Douglas_Bloodmoon, W_Contemporary,
│           V_Visual_Baseline, V_Visual_Inheritance
├── CONDITIONAL (triggered): L_DouglasEstate, I_DCC_Security_BlackWolf
├── IMPLIED: C_Erik_Douglas, C_Logan_Douglas, C_Wulfnic_Bloodmoon
│           (family members typically present at Sunday dinner)
└── SKIP: Ex_DJFrequency, I_AngelAndCo, L_VerveLounge

Output: Active char + Family + World + Visual + Estate + Security + family members loaded
```

---

## Performance Constraints

### Token Budget Allocation (JanitorAI)

| Context Window | Budget |
|----------------|--------|
| System prompt | 2048 tokens |
| Character card | 1024 tokens |
| Lorebook entries | 512 tokens |
| Conversation history | Remaining |
| Response | 512 tokens |

### Optimal Load Target

| Mode | Records Loaded | Est. Tokens |
|------|---------------|-------------|
| Single character, simple scene | 5-7 | ~1500 |
| Single character, complex scene | 8-10 | ~2500 |
| Multi-character scene | 10-14 | ~3500 |
| Experience arc | 8-12 | ~3000 |

---

## Authority

**Established by:** Engine Architecture Review
**Date:** 2026-06-09
**Version:** v1.0 (DRAFT)
