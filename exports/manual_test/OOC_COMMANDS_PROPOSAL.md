# OOC Commands Proposal, SvartulfrVerse Advanced Mechanics
## Status: PROPOSED (not yet implemented)
## Date: 2026-06-10

## Currently Implemented
- `<Language: [lingua]>`, Switch output language (M1)

## Proposed Commands, Module Toggle (on/off)
| Command | Module | Effect |
|---------|--------|--------|
| `<ToggleModule: M1>` | M1 Language Runtime | Enable/disable |
| `<ToggleModule: M2>` | M2 Speech Profiles | Enable/disable |
| `<ToggleModule: M3>` | M3 Relationship Engine | Enable/disable |
| `<ToggleModule: M4>` | M4 Memory & Continuity | Enable/disable |
| `<ToggleModule: M5>` | M5 Character Runtime | Enable/disable |
| `<ToggleModule: M6>` | M6 Scenario State Machine | Enable/disable |
| `<ToggleModule: M7>` | M7 Interaction System | Enable/disable |
| `<ToggleModule: M8>` | M8 Experimental | Enable/disable |

## Proposed Commands, Speech Profile (M2)
| Command | Effect |
|---------|--------|
| `<SpeechProfile: [npc]>` | Force specific NPC speech profile |
| `<ResetSpeech>` | Return to auto-detection |

## Proposed Commands, Relationship Engine (M3)
| Command | Effect |
|---------|--------|
| `<SetMood: [npc] [mood]>` | Force NPC mood |
| `<ResetMood: [npc]>` | Return to auto-calculation |
| `<ShowRelationships>` | Display current relationship state |

## Proposed Commands, Memory System (M4)
| Command | Effect |
|---------|--------|
| `<ClearMemory: topics>` | Clear tracked topics |
| `<ClearMemory: interactions>` | Clear interaction log |
| `<ClearMemory: all>` | Full memory reset |
| `<ShowMemory: topics>` | Show active topics |

## Proposed Commands, Scenario State Machine (M6)
| Command | Effect |
|---------|--------|
| `<SetLocation: [location]>` | Force scenario location |
| `<ResetLocation>` | Return to auto-detection |
| `<ShowState>` | Show current scenario state |

## Proposed Commands, Debug
| Command | Effect |
|---------|--------|
| `<Debug: on>` | Enable debug output |
| `<Debug: off>` | Disable debug output |
| `<Status>` | Show status of all modules |
