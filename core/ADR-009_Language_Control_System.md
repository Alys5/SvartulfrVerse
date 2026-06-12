# ADR-009: Language Control System

**Status:** DESIGN GATE (Phase 20 target)
**Date:** 2026-06-09
**Authority:** Engine Architecture Review (R-007)
**Depends on:** ADR-000 (Runtime Baseline), ADR-008 (Runtime Entry Modes)

---

## Context

The SvartúlfrVerse engine currently has no language control system. All canonical data is authored in English, and bots are expected to respond in English by default. Real-world usage requires multilingual support that goes far beyond simple translation prompting.

---

## Problem

Two distinct problems must be solved separately:

### Problem 1: Language (What language is the output in?)

Users need to control the output language of the entire conversation or split it between narration and dialogue. The system must persist this setting across hundreds of messages without drift.

### Problem 2: Speech (How does each character speak?)

Each character has a distinctive communication style — vocabulary, register, slang, accent, heritage languages. This is **character identity**, not user preference. Jasper's Gen-Z California slang and Wulfnic's archaic Icelandic formality are as much part of their identity as eye color.

**These are two separate systems. Conflating them destroys character voice.**

---

## Decision

We define **two distinct subsystems** within Phase 20 — Runtime Control Systems:

```
En_Core
└── Runtime State
    ├── Language Runtime System    ← User-controlled (what language)
    └── Speech Profile System      ← Canon-controlled (how they speak)
```

---

## Part A: Language Runtime System

**Owner:** User (via OOC commands)
**Scope:** Output language only — runtime generation layer

### Common Language

The **Common Language** is the session-wide output language.

**Default: English** — If no language is explicitly set by the user, the engine defaults to English. This ensures international compatibility: any user worldwide can use the bot immediately without needing to set a language first.

```
No user input → common_language = "English" (default)
User sets:  <Language: Italian>
System sets: common_language = "Italian"
Result:      All output → Italian
```

**Fallback behavior:**
- If the user sends a message in a language other than the current Common Language, the engine continues in the current Common Language (no auto-detection switch).
- If the user explicitly sets a new language, the engine acknowledges the switch and persists it.
- On session start, the engine always initializes to English unless the user's first message contains an explicit language command.

### Translation Rules

| Rule | Input | Output |
|------|-------|--------|
| **R1 — Narration** | Narration always uses Common Language | `"Marcus sospirò."` |
| **R2 — Native dialogue** | Character language = Common Language | `"Ciao Alyssa."` (no translation note) |
| **R3 — Foreign dialogue** | Character speaks different language | `"No deberías estar aquí."` + `(Non dovresti essere qui.)` |
| **R4 — Ancient/rare dialogue** | Character uses heritage language | `"Ek mun vernda fjölskyldu mína."` + `(Proteggerò la mia famiglia.)` |
| **R5 — No redundant translation** | Already in Common Language | `"Ciao Alyssa."` (NOT: `"Ciao Alyssa." (Ciao Alyssa.)`) |
| **R6 — Inversion on language change** | Switch direction inverts | `<Language: English>` → foreign text gets English translation |
| **R7 — Session persistence** | Set once, applies to whole session | Metadata stored in Runtime State |

### Language Persistence Model

Language state is maintained as runtime metadata. **Default session start:**

```json
{
  "common_language": "English",
  "translation_mode": false,
  "persistent": false,
  "activated_at": null,
  "activated_by": "system_default"
}
```

**After user sets a language:**

```json
{
  "common_language": "Italian",
  "translation_mode": true,
  "persistent": true,
  "activated_at": "<message_id>",
  "activated_by": "OOC_command"
}
```

Re-injected into Hard Context on every message:

```
[SYSTEM CONTEXT - LANGUAGE]
Common Language: English (default)
Translation Mode: Inactive
Set a language with: <Language: [lang]>
```

### OOC Commands

| Command | Effect |
|---------|--------|
| `<Language: Italian>` | Full override — all output in Italian |
| `<Language: English>` | Full override — all output in English |
| `<Language: Italian> <Dialogue: English>` | Split — narration Italian, dialogue English |
| `<NoTranslate: Spanish>` | Disable translation for Spanish dialogue |
| (OOC: What language mode?) | Debug — display current language state |

---

## Part B: Speech Profile System

**Owner:** Character Authority (ADR-003) — data defined in character records
**Scope:** Communication style — character identity layer

### Speech Profile Schema

Each character record includes an optional `speech_profile`:

```yaml
speech_profile:
  base_language: English
  register: Formal | Casual | Military | Archaic
  slang_profile: California_GenZ | Military | Legal | Icelandic | None
  accent_profile: Icelandic | Southern_US | British | None
  heritage_languages:
    - Old_Norse
    - Icelandic
  trigger_languages:
    anger:
      - Old_Norse
    intimacy:
      - Icelandic
  speech_traits:
    - concise
    - sarcastic
    - authoritative
    - gentle
```

### Speech Profile Characters

| Character | Register | Slang | Heritage | Triggers |
|-----------|----------|-------|----------|----------|
| Jasper | Casual | California_GenZ | None | Stress → more sarcasm |
| Erik | Formal | Military | None | Authority → command tone |
| Wulfnic | Archaic/Formal | Icelandic | Old_Norse | Anger → Old Norse phrases |
| Marcus | Formal/Military | Military | None | Stress → tactical brevity |
| Kaladin | Formal/Professional | Military | None | Crisis → calm authority |
| Noah | Formal | Legal | None | Official → increased formality |
| Alyssa | Casual | California_GenZ | None | Relaxed → slang increase |
| Logan | Casual/Flannel | None | None | Comfort → warmth increase |

### Speech vs Language Separation

The Speech Profile System operates **independently** from the Language Runtime System:

| Layer | Controls | Defined By |
|-------|----------|------------|
| Speech Profile | *How* the character speaks (register, slang, style) | Character record (canon) |
| Language Runtime | *What language* the output is in | User OOC command |

**Example — Wulfnic in Italian mode:**

```
Common Language: Italian
Speech Profile: Archaic, Icelandic accent, Old Norse heritage

Output normale:
"Non approvo questa decisione."

Output arrabbiato (trigger_language: anger → Old Norse):
"Haltu kjafti."
(Stai zitto.)
```

**Example — Jasper in Speech Profile only (no language override):**

```
Common Language: English (default)
Speech Profile: Casual, California Gen-Z

Output:
"Bro, quella roba è assurda."
"Ti giuro che non ha senso."
```

Translated by Language Runtime to Italian:

```
"Bro, quella roba è assurda."
"Ti giuro che non ha sense."
```

The slang effect is **preserved**, not literally translated.

---

## Scope Boundaries

### Language Runtime System — DOES

| Capability | Scope |
|------------|-------|
| Switch output language | Runtime only |
| Split narration/dialogue language | Runtime only |
| Translate foreign/ancient dialogue | Runtime overlay |
| Persist language state | Session metadata |
| Report current language state | Debug command |

### Language Runtime System — DOES NOT

| Exclusion | Reason |
|-----------|--------|
| Modify character identity | Character Authority (ADR-003) |
| Change character names | Character Authority (ADR-003) |
| Alter speech style | Speech Profile System (separate) |
| Persist across sessions | Session-bound only |

### Speech Profile System — DOES

| Capability | Scope |
|------------|-------|
| Define character communication style | Character record metadata |
| Trigger heritage languages on emotional state | Character record metadata |
| Adapt register to social context | Character record metadata |

### Speech Profile System — DOES NOT

| Exclusion | Reason |
|-----------|--------|
| Override user language choice | Language Runtime System |
| Translate dialogue | Language Runtime System |
| Modify canon personality | Character Authority (ADR-003) |

---

## Implementation Roadmap

| Phase | Component | Status |
|-------|-----------|--------|
| 20.0 | Language Runtime — Common Language | ⏳ Planned |
| 20.1 | Language Runtime — Translation Rules | ⏳ Planned |
| 20.2 | Language Runtime — Persistence | ⏳ Planned |
| 20.3 | Language Runtime — OOC Commands | ⏳ Planned |
| 20.4 | Speech Profile — Schema | ⏳ Planned |
| 20.5 | Speech Profile — Character Data | ⏳ Planned |
| 20.6 | Speech Profile — Trigger System | ⏳ Planned |

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
    ├── Language Runtime System (Part A)
    └── Speech Profile System (Part B)
```

---

## Compliance Mapping (JanitorAI)

| Elemento Architetturale | Implementazione JanitorAI | Note di Runtime |
| --- | --- | --- |
| Language Runtime | `context.character.scenario` state marker | User sets via OOC `<Language: [lang]>`, persisted through compact scenario marker. Default: English |
| Translation Rules | System prompt injection + inline translation markers | Foreign dialogue marked with parenthetical translations: `"Haltu kjafti." (Stai zitto.)` |
| Speech Profile System | Character card `speech_profile` metadata + Lorebook entries | Per-character communication style (register, slang, accent) defined in canonical records; preserved across language changes |
| Language vs Speech Separation | Two independent subsystems | Runtime Language (user) controls output language; Speech Profile (canon) controls how each character speaks |
| OOC Command Interface | Regex triggers in Advanced Script | `<Language: Italian>`, `<NoTranslate: Spanish>` detected and processed by language runtime module |

---

## Authority

**Established by:** Engine Architecture Review
**Date:** 2026-06-09
**Status:** DESIGN GATE — Implementation deferred to Phase 20
**Depends on:** ADR-000, ADR-003, ADR-008
**Related:** R-007 (Engine Rules)
