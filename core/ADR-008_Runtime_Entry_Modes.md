# ADR-008: Runtime Entry Modes

**Status:** ACCEPTED
**Date:** 2026-06-09
**Authority:** Engine Architecture Review
**Depends on:** ADR-000, ADR-007

---

## Context

The initial engine design (E-17.0) assumed **Character-First Retrieval** as the universal entry mode. This works for single-character bots (Logan Bot, Alyssa Bot) but collapses when the user's entry point is not a character.

## Problem

Test against 5 real scenarios exposes the gap:

| Scenario | Entry Point | Root Entity | Character-First Works? |
|----------|-------------|-------------|------------------------|
| Logan Bot | User selects Logan | Character | ✅ Yes |
| Alyssa Bot | User selects Alyssa | Character | ✅ Yes |
| Verve Bot | User enters The Verve | Location | ❌ No root character |
| Family Bot | User enters Estate | Location + Multiple Characters | ❌ No single root |
| UCLA Bot | User enters UCLA | Institution | ❌ No root character |

Character-First assumes a single root character. In Location/Institution/Scenario entries, there is no single root — or the root is the location/institution itself.

## Decision

We define **4 Runtime Entry Modes**. Every user interaction starts in exactly one mode. The entry mode determines the root context for retrieval.

### Entry Modes

```
┌─────────────────────────────────────────────────────────────────┐
│                    RUNTIME ENTRY MODES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Mode 1: CHARACTER ENTRY                                        │
│  Root: Character                                                │
│  Trigger: User selects/mentions a specific character            │
│  Example: "I want to play as Logan" / "Logan enters..."        │
│  Retrieval: Character → Family → World → Visual → Context      │
│                                                                 │
│  Mode 2: LOCATION ENTRY                                         │
│  Root: Location                                                 │
│  Trigger: User enters/mentions a specific location              │
│  Example: "Let's go to The Verve" / "At the Estate..."         │
│  Retrieval: Location → Characters present → World → Context     │
│                                                                 │
│  Mode 3: INSTITUTION ENTRY                                      │
│  Root: Institution                                              │
│  Trigger: User enters/mentions a specific institution           │
│  Example: "UCLA campus" / "At Angel & Co studio"               │
│  Retrieval: Institution → Location → Characters → World         │
│                                                                 │
│  Mode 4: SCENARIO ENTRY                                         │
│  Root: Experience                                               │
│  Trigger: User triggers an experience context                   │
│  Example: "DJ Frequency set" / "Family dinner"                 │
│  Retrieval: Experience → Characters → Location → World          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Entry Mode Detection

```
User Input
    │
    ▼
┌──────────────────────────┐
│ Entry Mode Detection      │
│                          │
│ 1. Character mentioned?  │──Yes──► CHARACTER ENTRY
│    (proper name, pronoun) │
│                          │
│ 2. Location mentioned?   │──Yes──► LOCATION ENTRY
│    (proper name, type)   │
│                          │
│ 3. Institution mentioned?│──Yes──► INSTITUTION ENTRY
│    (proper name, type)   │
│                          │
│ 4. Experience triggered? │──Yes──► SCENARIO ENTRY
│    (trigger phrases)     │
│                          │
│ 5. None of the above    │──Yes──► CHARACTER ENTRY (default)
│                          │
└──────────────────────────┘
```

### Priority

When multiple modes could apply:

1. **CHARACTER** wins over LOCATION (if a specific character is mentioned)
2. **SCENARIO** wins over LOCATION (if experience trigger matches)
3. **LOCATION** wins over INSTITUTION (if both mentioned, location is more specific)
4. Default: CHARACTER ENTRY

### Retrieval Order by Mode

**Character Entry:**
```
Character → Family → World → Visual → Location → Institution → Experience
```

**Location Entry:**
```
Location → Characters present → World → Visual → Institution → Experience
```

**Institution Entry:**
```
Institution → Location → Characters → World → Visual → Experience
```

**Scenario Entry:**
```
Experience → Characters → Location → World → Visual
```

---

## Consequences

1. **E_Retrieval_Architecture.md** must be updated to include Entry Mode Detection as Phase 0
2. **E_Character_Loading_Policy.md** packages are used in Character Entry mode; Location/Institution modes need their own loading profiles
3. **Bot Framework (Phase 18)** must support 4 template types:
   - Single Character Template
   - Location Engine Template
   - Institution Engine Template
   - Scenario Engine Template
4. **Multi-character scenes** are handled by Location/Institution entry, not by forcing a single root character

## Migration

| Document | Change | Status |
|----------|--------|--------|
| E_Runtime_Architecture.md | Add Entry Mode Detection section | ✅ |
| E_Retrieval_Architecture.md | Add Phase 0: Entry Mode Detection | ✅ |
| E_Character_Loading_Policy.md | Add note: packages for Character Entry only | ✅ |

---

## Authority

**Established by:** Engine Architecture Review
**Date:** 2026-06-09
**Depends on:** ADR-000, ADR-007
**Supersedes:** Character-First-only assumption in E-17.0
