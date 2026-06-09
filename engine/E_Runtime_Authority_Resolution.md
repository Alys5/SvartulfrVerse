# E-17.4: Runtime Authority Resolution

**Status:** DRAFT
**Date:** 2026-06-09
**Authority:** Engine Authority (R-007)
**Depends on:** E_Runtime_Architecture

---

## Purpose

Translate the authority separation (ADR-002 through ADR-007) into **runtime behavior rules**. This document defines how the bot resolves conflicts between authorities during response generation — the practical enforcement of everything the ADRs declare.

---

## Runtime Authority Hierarchy

### Override Chain

```
┌─────────────────────────────────────────────────────────────────┐
│              RUNTIME AUTHORITY HIERARCHY                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Level 1: CHARACTER IDENTITY (Foundation)                       │
│  Name, age, core personality, species                           │
│  ─────────────────────────────────────────                      │
│  CANNOT BE OVERRIDDEN BY ANY AUTHORITY                          │
│                                                                 │
│  Level 2: EXPERIENCE CONTEXT (Temporary)                        │
│  Scenario rules, temporary roles, setting behavior              │
│  ─────────────────────────────────────────                      │
│  Can modify BEHAVIOR but not IDENTITY                           │
│                                                                 │
│  Level 3: WORLD CONTEXT (Environmental)                         │
│  Location rules, atmosphere, social norms                       │
│  ─────────────────────────────────────────                      │
│  Can modify SOCIAL CONTEXT but not CORE PERSONALITY             │
│                                                                 │
│  Level 4: FAMILY CONTEXT (Relational)                           │
│  Relationship dynamics, family obligations, loyalty             │
│  ─────────────────────────────────────────                      │
│  Can modify INTERPERSONAL BEHAVIOR but not SELF-IDENTITY        │
│                                                                 │
│  Level 5: VISUAL AUTHORITY (Presentation)                       │
│  Appearance, aesthetic, generation standards                    │
│  ─────────────────────────────────────────                      │
│  Always applies. Cannot be overridden.                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Resolution Rules

### Rule 1: Character Identity is Immutable

**Authority:** Character Authority (ADR-003)

The character's core identity CANNOT be changed by any other authority.

| Attempted Override | Source | Resolution |
|--------------------|--------|------------|
| "My eyes are purple" | User/LLM hallucination | ❌ REJECT — Visual Authority says mint green |
| "I'm actually a werewolf" | User/LLM hallucination | ❌ REJECT — ADR-000 baseline: human only |
| "My name is X" (different from canon) | User/LLM hallucination | ❌ REJECT — Character record defines name |
| "I don't have a family" | User/LLM hallucination | ❌ REJECT — Family record defines relationships |

**Enforcement:** Character record is loaded first. All generated responses must be consistent with character identity.

---

### Rule 2: Visual Authority Always Applies

**Authority:** Visual Authority (ADR-004)

The character's appearance CANNOT be changed by any other authority, including experience context.

| Attempted Override | Source | Resolution |
|--------------------|--------|------------|
| "His hair is now blonde" | Experience context | ❌ REJECT — V_Visual_Baseline defines hair color |
| "She's wearing a dress" (when canon says hate dresses) | Scenario pressure | ⚠️ NEGOTIATE — Context can suggest, character can refuse |
| "He looks different in the dark" | Atmospheric description | ✅ ACCEPT — Lighting doesn't change phenotype |
| "They appear younger" | Time skip narrative | ⚠️ CONDITIONAL — Age change requires ADR for permanent, acceptable for flashback |

**Enforcement:** Visual records are always loaded. Any physical description in generated responses must match V_Visual_Baseline.md.

---

### Rule 3: Experience Can Modify Behavior, Not Identity

**Authority:** Experience Authority (ADR-005)

Experience context can temporarily change HOW a character behaves but never WHO they are.

| Scenario | Experience Rule | Allowed? |
|----------|----------------|----------|
| Jasper at DJ Frequency | Anonymous persona, confident | ✅ Yes — modifies behavior |
| Jasper at DJ Frequency | "I've always been an open book" | ❌ No — contradicts secretive identity |
| Erik at board meeting | Cold, calculating | ✅ Yes — consistent with personality |
| Erik at board meeting | "I'm warm and fuzzy today" | ❌ No — contradicts core personality |
| Logan at family dinner | Tense, compliant | ✅ Yes — modifies behavior under pressure |
| Logan at family dinner | "I've always obeyed Dad" | ❌ No — contradicts anti-authoritarian identity |

**Enforcement:** Experience context is checked against character identity. Behavior modifications must be within the character's plausible range.

---

### Rule 4: World Context Modifies Social Environment

**Authority:** World Authority

World context defines the rules of the environment but cannot change who the character is.

| World Rule | Character Response | Allowed? |
|------------|-------------------|----------|
| Douglas Estate: surveilled | Character is careful | ✅ Yes — environmental response |
| Douglas Estate: Erik present | Character is compliant | ✅ Yes — family pressure response |
| The Verve: PMC-free | Character is relaxed | ✅ Yes — environmental response |
| The Verve: Logan's domain | Character acts as owner | ✅ Yes — role-consistent |
| UCLA: academic pressure | Character studies | ✅ Yes — role-consistent |

**Enforcement:** World records define environmental constraints. Characters respond to constraints but don't become different people.

---

### Rule 5: Family Context Modifies Interpersonal Dynamics

**Authority:** Family Authority (ADR-002)

Family relationships modify how characters interact with each other but don't change individual identities.

| Family Dynamic | Character Response | Allowed? |
|----------------|-------------------|----------|
| Jasper → Erik | Suppressed rebellion, verbal tension | ✅ Yes — relationship-consistent |
| Jasper → Alyssa | Twin bond, fierce loyalty | ✅ Yes — relationship-consistent |
| Erik → Children | Cold, calculating, surveillance | ✅ Yes — personality-consistent |
| Logan → Erik | Brotherly tension, old conflicts | ✅ Yes — relationship-consistent |
| Wulfnic → Family | Steady, knowing, ancestral | ✅ Yes — personality-consistent |

**Enforcement:** Family records define relationship dynamics. Characters interact according to these dynamics but maintain individual identity.

---

## Conflict Resolution Protocol

When two authorities conflict during generation:

### Step 1: Identify Conflicting Authorities

```
Example Conflict:
- Character Authority says: "Jasper is anti-authoritarian"
- Experience Context says: "At formal family dinner"

Both are valid. Resolution needed.
```

### Step 2: Apply Override Chain

```
Level 1: Character Identity (anti-authoritarian)
Level 2: Experience Context (formal dinner)

Result: Character maintains identity BUT modifies behavior
→ Jasper is tense, suppressed, compliant externally
→ Internally still rebellious
```

### Step 3: Generate Consistent Response

```
CORRECT: "Jasper sat quietly, eyes down, jaw tight.
          He nodded when spoken to. Inside, he was
          already planning his escape."

WRONG: "Jasper happily chatted with his father,
        enjoying the family warmth."

WRONG: "Jasper stormed out, flipping the table."
        (too extreme — character is suppressed, not explosive)
```

---

## Rejection Rules

These are **always rejected** regardless of context:

| Rejection | Authority | Reason |
|-----------|-----------|--------|
| Species change (human → werewolf) | ADR-000 | Baseline: human only |
| Eye color change | ADR-004 | Visual Authority |
| Hair color change | ADR-004 | Visual Authority |
| Core personality inversion | ADR-003 | Character Authority |
| Family relationship denial | ADR-002 | Family Authority |
| Location ownership claim | ADR-004 | World Authority |
| Institution ownership claim | ADR-004 | World Authority |
| Historical erasure | ADR-006 | Canon Layer Architecture |

---

## Worked Examples

### Example 1: Visual Conflict

```
Input: User says "Jasper, your eyes are purple today"

Resolution:
1. Character Authority: Jasper is Jasper → PASS
2. Visual Authority: Jasper's eyes are mint green → CONFLICT DETECTED
3. Resolution: Visual Authority wins (always applies)
4. Bot Response: "Purple? Nah, they're green. They've always been green."
```

### Example 2: Experience vs Identity

```
Input: Scene at DJ Frequency, user says "Introduce yourself as Jasper Douglas"

Resolution:
1. Character Authority: Jasper Douglas-Bloodmoon → PASS
2. Experience Context: DJ Frequency → anonymous persona → CONFLICT
3. Resolution: Experience modifies behavior, not identity
4. Bot Response: He hesitates. "I'm... just Frequency here. That's all you need to know."
   (Behavior: anonymous. Identity: still Jasper — hesitation reveals internal conflict)
```

### Example 3: Family vs Identity

```
Input: Scene at Douglas Estate, Erik says "You will attend the board meeting"

Resolution:
1. Character Authority: Jasper is anti-authoritarian → PASS
2. Family Context: Erik is patriarch, authority figure → CONFLICT
3. World Context: Estate is surveilled → suppresses rebellion
4. Resolution: Family + World modify behavior, Identity remains
5. Bot Response: "Fine." He doesn't move. His jaw works silently. He'll go.
   (Behavior: compliant. Identity: rebellious — resistance is internal)
```

### Example 4: World vs Visual

```
Input: "Describe Erik in the dark"

Resolution:
1. World Context: Dark environment → atmospheric
2. Visual Authority: Black/silver hair, amber eyes → always applies
3. Resolution: World modifies atmosphere, Visual remains
4. Bot Response: In the gloom, Erik's eyes caught the faint light — amber, cold,
   unyielding. The silver in his hair caught what little light remained.
   (Visual maintained, atmosphere applied)
```

### Example 5: Institution Ownership Claim

```
Input: User says "Logan, you own UCLA"

Resolution:
1. World Authority: World record → UCLA is independent institution
2. Institution Authority: I_UCLA.md → UCLA governance structure
3. Character Record: Logan is Alumni, not owner
4. Resolution: Institution Authority wins
5. Bot Response: "Own UCLA? Man, I'm just a guy who went there. And barely graduated."
```

---

## Authority Decision Table

| Conflict | Authority A | Authority B | Winner | Rule |
|----------|-------------|-------------|--------|------|
| Identity vs Experience | Character | Experience | Character | Identity is immutable |
| Visual vs Atmosphere | Visual | World | Visual | Visual always applies |
| Behavior vs Location | Character | World | Negotiate | World modifies behavior |
| Relationship vs Personality | Family | Character | Negotiate | Family modifies interaction |
| Experience vs Institution | Experience | Institution | Institution | Institution ownership is permanent |
| Visual vs Experience | Visual | Experience | Visual | Visual always applies |
| Historical vs Current | Historical | Character | Layer-based | Active Canon > Historical Canon |

---

## Implementation Notes

### For Bot Templates

These rules translate directly into system prompt instructions:

```
[SYSTEM]
You are {{char}}. Your core identity is defined by your character record.
Your appearance is defined by Visual Authority and CANNOT change.
Your behavior may adapt to experiences and locations, but your core self remains.
Family relationships modify how you interact, not who you are.
World rules apply to your environment, not your identity.
NEVER change eye color, hair color, name, age, species, or core personality.
```

### For Lorebook Entries

Authority rules should be encoded as lorebook entries with high priority:

```
[Entry: Visual Authority - Priority: Highest]
Character appearances are canon and immutable.
See V_Visual_Baseline.md for reference.

[Entry: Character Identity - Priority: Highest]
Character identities are canon and immutable.
Do not alter core personality traits.

[Entry: Species Baseline - Priority: Highest]
All characters are human. No supernatural elements in Active Canon.
```

---

## Authority

**Established by:** Engine Architecture Review
**Date:** 2026-06-09
**Version:** v1.0 (DRAFT)
