# OOC COMMANDS SPECIFICATION

**Status:** CANONICAL  
**Date:** 2026-06-11  
**Authority:** R-008_Bot_Rules, R-007_Engine_Rules, M9 OOC Command Handler  
**Version:** 1.0 — Canon Freeze v1  
**Applies to:** All bot exports using Advanced_Mechanics_Lorebook.js (M9 module)

---

## Purpose

This document defines the canonical OOC (Out-of-Character) command set for the SvartulfrVerse bot runtime. OOC commands allow the user to query or control runtime state without breaking character immersion.

**Design Principle:** OOC commands are **read-only queries** or **runtime state changes**. They never modify canonical data. All commands use the `<Command: Args>` syntax to distinguish them from in-character dialogue.

---

## Command Registry

### Approved Commands (ACTIVE)

| Command | Module | Type | Description | Output |
|---------|--------|------|-------------|--------|
| `<Language: [lang]>` | M1/M9 | State change | Switch output language | Runtime flag set |
| `<ShowRelationships>` | M3/M9 | Query | Display all NPC relationship states | Formatted readout |
| `<Debug: on\|off>` | M9 | State change | Toggle debug output (DEV ONLY) | Confirmation |
| `<Status>` | M9 | Query | Show all module states + runtime info | Formatted readout |

### Rejected Commands (NOT IMPLEMENTED)

| Command | Reason |
|---------|--------|
| `<ToggleModule: M1-M8>` | Module toggles are compile-time, not runtime |
| `<SpeechProfile: [npc]>` | Speech profiles are auto-detected, not user-controlled |
| `<SetMood: [npc] [mood]>` | Moods are auto-calculated from relationship engine |
| `<ResetMood: [npc]>` | Same as above |
| `<ClearMemory: *>` | Memory is session-scoped, no manual clear needed |
| `<ShowMemory: topics>` | Replaced by `<Status>` which includes topic count |
| `<SetLocation: [location]>` | Location is auto-detected from context |
| `<ResetLocation>` | Same as above |

---

## Command Syntax

### Format

```
<CommandName: Arguments>
```

- Angle brackets `< >` delimit the command
- Command name is case-insensitive
- Colon `:` separates command from arguments (when applicable)
- Leading/trailing whitespace is trimmed

### Detection Logic

```javascript
function _extractOOCCommand(rawText) {
  // Must start with < and end with >
  // Must match: language, showrelationships, debug, status
  // Returns: { command: "cmd", args: "arg_string" } or null
}
```

### Processing Pipeline

```
User sends message
    │
    ▼
_extractOOCCommand(lastMessage)
    │
    ├─► null (no command) → pass through to normal processing
    │
    └─► { command, args } → M9 handler
            │
            ├─► <Language: [lang]> → Update M1 state
            ├─► <ShowRelationships> → Read M3 state → append to personality
            ├─► <Debug: on|off> → Toggle DEBUG flag
            └─► <Status> → Read all states → append to personality
```

---

## Command Details

### `<Language: [lang]>`

**Purpose:** Switch the bot's output language.

**Arguments:** A language name (e.g., `English`, `Italian`, `Spanish`, `French`)

**Behavior:**
- Sets `state.language_runtime.common_language` to the specified language
- Sets `translation_mode = true` if language is not English
- Sets `persistent = true` to prevent auto-detection from overriding
- Tracked in OOC command log

**Example:**
```
User: <Language: Italian>
Bot:  [OOC] Language switched to Italian. (no other output change until next message)
```

**Implementation:** M9 calls into M1's state structure. The M1 language directive in the personality block will reflect the change on the next message cycle.

---

### `<ShowRelationships>`

**Purpose:** Display the current state of all tracked NPC relationships.

**Arguments:** None

**Behavior:**
- Reads `state.relationship_engine.npc_states`
- Formats each NPC's affinity, trust, emotional state, and relationship stage
- Appends formatted readout to `context.character.personality`
- Read-only — does not modify any state

**Output Format:**
```
[OOC_RELATIONSHIPS] erik: affinity=10 trust=45 mood=neutral stage=acquaintance | jasper: affinity=20 trust=60 mood=positive stage=friend | ...
```

**Example:**
```
User: <ShowRelationships>
Bot:  [OOC_RELATIONSHIPS] erik: affinity=0 trust=50 mood=neutral stage=acquaintance | malachia: affinity=5 trust=40 mood=neutral stage=acquaintance | noah: affinity=10 trust=55 mood=positive stage=friend | jasper: affinity=25 trust=70 mood=warm stage=close_friend | alyssa: affinity=30 trust=75 mood=warm stage=close_friend | wulfnic: affinity=15 trust=60 mood=positive stage=friend | logan: affinity=20 trust=65 mood=positive stage=friend | marcus: affinity=0 trust=30 mood=neutral stage=acquaintance | kaladin: affinity=-5 trust=25 mood=neutral stage=stranger | angel: affinity=10 trust=45 mood=neutral stage=acquaintance
```

---

### `<Debug: on|off>`

**Purpose:** Toggle debug output. **DEV ONLY** — must be disabled in production.

**Arguments:** `on` or `off`

**Behavior:**
- `on`: Sets `DEBUG = 1`, enables `[MECH_DBG]` output in personality
- `off`: Sets `DEBUG = 0`, disables debug output
- State persisted in `ooc_handler.debug_mode`

**Output:**
```
[OOC_DEBUG] Debug output ENABLED
```
or
```
[OOC_DEBUG] Debug output DISABLED
```

**Production Note:** Debug commands should be removed or disabled in production exports. The `DEBUG` flag defaults to `0` (off).

---

### `<Status>`

**Purpose:** Show the current status of all runtime modules and key state variables.

**Arguments:** None

**Behavior:**
- Reads all M1-M9 enabled flags
- Reads current language, emotional climate, topic count
- Appends formatted readout to `context.character.personality`
- Read-only — does not modify any state

**Output Format:**
```
[OOC_STATUS] M1=ON | M2=ON | M3=ON | M4=ON | M5=ON | M6=OFF | M7=ON | M8=OFF | M9=ON | Debug=OFF | Message#42 | Lang=English | Climate=neutral | Topics=3
```

---

## OOC Command Log

All executed commands are logged in `state.ooc_handler.command_log`:

```javascript
{
  command: "showrelationships",
  args: "",
  message_index: 42,
  timestamp: "2026-06-11T10:30:00.000Z"
}
```

- Maximum 20 entries (FIFO)
- Used for debugging and continuity tracking
- Not exposed to user unless debug is enabled

---

## Security Constraints

1. **No canonical data modification.** OOC commands only affect runtime state.
2. **No command injection.** Only the 4 approved commands are recognized.
3. **Silent rejection.** Unrecognized `<...>` patterns are ignored (no error output).
4. **Debug is off by default.** `DEBUG = 0` in all production exports.
5. **No state persistence across sessions.** OOC state resets with each new session.

---

## Integration Points

| Component | File | Role |
|-----------|------|------|
| M9 Module | `Advanced_Mechanics_Lorebook.js` | Command detection + execution |
| M1 State | `state.language_runtime` | Language switch target |
| M3 State | `state.relationship_engine` | Relationship readout source |
| M4 State | `state.memory_system` | Topic count for `<Status>` |
| M5 State | `state.character_runtime` | Awareness/familiarity for `<Status>` |
| M6 State | `state.scenario_machine` | Current scenario for `<Status>` |
| M7 State | `state.interaction_system` | Interaction phase for `<Status>` |

---

## Authority

**Established by:** Architecture Review — OOC Command Implementation  
**Approved by:** Canon Freeze v1 Governance  
**Depends on:** R-008_Bot_Rules, R-007_Engine_Rules, M9 OOC Command Handler  
**Version:** 1.0 — Frozen under Canon Freeze v1
