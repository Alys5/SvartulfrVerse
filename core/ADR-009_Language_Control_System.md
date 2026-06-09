# ADR-009: Language Control System

**Status:** DESIGN GATE (Phase 20 target)
**Date:** 2026-06-09
**Authority:** Engine Architecture Review (R-007)
**Depends on:** ADR-000 (Runtime Baseline), ADR-008 (Runtime Entry Modes)

---

## Context

The SvartúlfrVerse engine currently has no language control system. All canonical data is authored in English, and bots are expected to respond in English by default. However, real-world usage on JanitorAI and SillyTavern requires multilingual support that goes far beyond simple translation prompting.

---

## Problem

Users interact with language in three distinct ways:

| User Need | Description | Complexity |
|-----------|-------------|------------|
| **Full Override** | Switch entire conversation to another language | Medium — uniform language switching |
| **Split Language** | Narrate in one language, dialogue in another | High — requires narrative/dialogue separation |
| **Language Recovery** | Correct the bot when it drags back to default | High — requires state preservation + regeneration |

The real challenge is **persistence**. A one-time instruction is insufficient — the language mode must be maintained across hundreds of messages without degradation.

---

## Decision

We define the **Language Control System** as a Phase 20 runtime feature, architecturally part of the Runtime Control Systems alongside OOC Command Engine, Scene Control Engine, Recovery Engine, and Runtime State Persistence.

### Architecture Position

```
En_Core
└── Language Engine
    ├── Language Detection
    ├── Language Override
    ├── Split Narrative Mode
    ├── Recovery Mode
    └── Language Persistence
```

### Entry Point

The Language Control System is triggered exclusively via OOC commands. It modifies runtime behavior, not canonical data.

---

## Language Modes

### Mode A — Full Language Override

```
Trigger:  (OOC: Respond only in Italian)
Effect:   Narration + Dialogue + Thoughts → Italian
Persist:  Active until changed or session ends
```

### Mode B — Split Language

```
Trigger:  (OOC: Narrate in English, dialogue in Italian)
Effect:   Narration → English, Dialogue → Italian, Thoughts → English
Persist:  Active until changed or session ends
```

### Mode C — Recovery Mode

```
Trigger:  (OOC: Translate last message and continue)
Effect:   Regenerate current state, preserve story continuity, switch language
Persist:  Honors current language mode setting
```

### Mode D — Status Query

```
Trigger:  (OOC: What language mode are you currently using?)
Effect:   Display current language configuration
Persist:  No change — informational only

Response format:
Language Mode: Full Override
Narration: Italian
Dialogue: Italian
Persistence: Active
```

---

## Language Persistence Model

Language state is maintained as runtime metadata:

```json
{
  "language_mode": "full_override",
  "narration_language": "it",
  "dialogue_language": "it",
  "persistent": true,
  "activated_at": "<message_id>",
  "activated_by": "OOC_command"
}
```

### Persistence Rules

| Rule | Behavior |
|------|----------|
| Default | English for all narration, dialogue, thoughts |
| On OOC override | Set language_mode, update metadata |
| On each message | Re-inject language reminder into context |
| On mode change | Update metadata, acknowledge change |
| On session reset | Revert to English (default) |

### Context Injection

To prevent language drift, the current language setting is re-injected into the context window on every message:

```
[SYSTEM CONTEXT - LANGUAGE]
Current Language Mode: Full Override
All narration, dialogue, and thoughts must be in: Italian
This setting is PERSISTENT and overrides default English.
```

This is injected as part of the Hard Context tier (E-17.2) to minimize drift risk.

---

## Scope Boundaries

### What the Language Control System DOES

| Capability | Scope |
|------------|-------|
| Switch output language | Runtime generation only |
| Split narration/dialogue by language | Runtime generation only |
| Persist language settings across messages | Runtime metadata |
| Report current language status | Runtime metadata |
| Recover from language drift | Regenerate + re-inject |

### What the Language Control System DOES NOT DO

| Exclusion | Reason |
|-----------|--------|
| Translate canonical data | Canonical data is English-only; translation is runtime overlay |
| Modify character identity | Character Authority (ADR-003) |
| Change character names | Character Authority (ADR-003) |
| Alter cultural context | World Authority / Historical Canon |
| Persist across sessions | Session-bound only; no database storage |

---

## Implementation Roadmap

| Phase | Component | Status |
|-------|-----------|--------|
| 20.0 | Language Engine — Detection & Override | ⏳ Planned |
| 20.1 | Split Narrative Mode | ⏳ Planned |
| 20.2 | Recovery Mode | ⏳ Planned |
| 20.3 | Language Persistence System | ⏳ Planned |
| 20.4 | Status Query Command | ⏳ Planned |
| 20.5 | OOC Command Integration | ⏳ Planned |

---

## Dependency Chain

```
Phase 17 (Engine Architecture) — COMPLETE
    ↓
Phase 18 (Bot Exporter) — Next
    ↓
Phase 19 (Lorebook Exporter)
    ↓
Phase 20 (Runtime Control Systems)
    └── Language Control System (this ADR)
```

---

## Authority

**Established by:** Engine Architecture Review
**Date:** 2026-06-09
**Status:** DESIGN GATE — Implementation deferred to Phase 20
**Depends on:** ADR-000, ADR-008
**Related:** R-007 (Engine Rules)
