# Knowledge Directory — File Map

**Last updated:** 2026-06-08
**Total files:** 21 markdown + 2 PDF

## Quick Start — What Should I Read?

| If you need... | Read this first |
|---------------|----------------|
| Complete bot creation workflow | `JANITORAI_AND_ROLEPLAY_BEST_PRACTICES.md` |
| Bot export field mappings | `BOT_EXPORT_KNOWLEDGE_GUIDE.md` + `EXPORT_MAPPING_MATRIX.md` |
| Lorebook design | `LOREBOOK_KNOWLEDGE_GUIDE.md` + `JANITORAI_AND_ROLEPLAY_BEST_PRACTICES.md §5` |
| Prompt engineering | `PROMPT_DESIGN_GUIDE.md` + `JANITORAI_AND_ROLEPLAY_BEST_PRACTICES.md §6` |
| Engine architecture | `ENGINE_KNOWLEDGE_GUIDE.md` + `ENGINE_INTERACTION_MAP.md` |
| Validation workflow | `VALIDATION_KNOWLEDGE_GUIDE.md` + `VALIDATION_CHECKLIST.md` |
| Implementation patterns | `IMPLEMENTATION_PATTERNS.md` |
| External resources | `EXTERNAL_RESOURCES_INDEX.md` |
| Project governance summary | `DECISION_REGISTRY.md` + `AUTHORITY_MATRIX.md` |
| Toolset (Rules/Skills/Commands) | `SVARTULFRVERSE_TOOLSET_REFERENCE.md` |
| Bot discovery & metadata | `BOT_SEARCH_KNOWLEDGE_GUIDE.md` |

## File Index

### Knowledge Guides (Companion Documents — Start Here)
| File | Companion To | Purpose |
|------|-------------|---------|
| `ENGINE_KNOWLEDGE_GUIDE.md` | `ENGINE_SPECIFICATION.md` | Engine architecture explained |
| `BOT_EXPORT_KNOWLEDGE_GUIDE.md` | `BOT_EXPORT_SPECIFICATION.md` | Export workflows explained |
| `BOT_SEARCH_KNOWLEDGE_GUIDE.md` | `BOT_SEARCH_SPECIFICATION.md` | Discovery & metadata explained |
| `LOREBOOK_KNOWLEDGE_GUIDE.md` | `LOREBOOK_SPECIFICATION.md` + `BOT_SEARCH_SPECIFICATION.md` | Lorebook design explained |
| `VALIDATION_KNOWLEDGE_GUIDE.md` | `VALIDATION_PIPELINE_SPECIFICATION.md` | Validation workflow explained |

### Source Specifications (Authoritative — Governance Layer)
| File | Authority | Purpose |
|------|-----------|---------|
| `ENGINE_SPECIFICATION.md` | R-007 | Formal engine contracts |
| `BOT_EXPORT_SPECIFICATION.md` | R-008 | Formal export schemas |
| `BOT_SEARCH_SPECIFICATION.md` | Project | Formal search/discovery spec |
| `LOREBOOK_SPECIFICATION.md` | R-009 | Formal lorebook structure |
| `VALIDATION_PIPELINE_SPECIFICATION.md` | R-006 | Formal validation pipeline |

> **Note:** Specifications live in both `core/` (governance) and `knowledge/` (reference). The `core/` versions are authoritative.

### Synthesis Documents (Cross-Cutting)
| File | Purpose |
|------|---------|
| `JANITORAI_AND_ROLEPLAY_BEST_PRACTICES.md` | Consolidated best practices from 20+ sources |
| `IMPLEMENTATION_PATTERNS.md` | Recurring patterns from all specifications |
| `EXTERNAL_RESOURCES_INDEX.md` | 60 curated external resources with authority classification |

### Reference Documents (Project-Wide)
| File | Purpose |
|------|---------|
| `AUTHORITY_MATRIX.md` | Single-source ownership boundary reference |
| `PROMPT_DESIGN_GUIDE.md` | Prompt writing guide with patterns |
| `DECISION_REGISTRY.md` | Condensed ADR-000 through ADR-006 |
| `VALIDATION_CHECKLIST.md` | 47-check human-readable validation guide |
| `ENGINE_IMPLEMENTATION_ROADMAP.md` | Phases 15-19 implementation sequencing |
| `ENGINE_INTERACTION_MAP.md` | Runtime architecture with data flow |
| `EXPORT_MAPPING_MATRIX.md` | Repository→Bot/Lorebook field mapping |
| `SVARTULFRVERSE_TOOLSET_REFERENCE.md` | Rules, Skills, Commands reference |

### External Resources (PDF)
| File | Source |
|------|--------|
| `Icehellionx Script Guide.pdf` | JanitorAI community — advanced scripting |
| `JanitorAI Chatbot Creation Guide.pdf` | JanitorAI community — bot creation |

## Naming Convention

| Pattern | Meaning |
|---------|---------|
| `*_SPECIFICATION.md` | Formal specification (authoritative) |
| `*_KNOWLEDGE_GUIDE.md` | Companion knowledge guide (explanatory) |
| `*_MATRIX.md` | Cross-reference matrix |
| `*_GUIDE.md` | Standalone guide |
| `*_REGISTRY.md` | Condensed reference |
| `*_CHECKLIST.md` | Operational checklist |
| `*_REFERENCE.md` | Comprehensive reference |
| `*_INDEX.md` | Curated index |
| `*_PATTERNS.md` | Pattern extraction |
| `*BEST_PRACTICES.md` | Consolidated best practices |

## Governance

All knowledge documents align with:
- **ADR-000 through ADR-006** (governance decisions)
- **R-000 through R-009** (rules)
- **Repository_Governance.md** and **Repository_Scope.md**

Changes to knowledge documents require Architecture Review if they affect governance interpretation.
