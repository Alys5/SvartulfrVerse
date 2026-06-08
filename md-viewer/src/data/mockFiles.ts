import { MdFile } from '../types';

export const mockFiles: MdFile[] = [
  {
    id: 'f1',
    name: 'README.md',
    path: '/README.md',
    category: 'Root',
    size: 4521,
    lastModified: '2026-06-08',
    excerpt: 'SvartúlfrVerse — Contemporary setting (2024), human baseline. Dual dynasty: Douglas vs Bloodmoon.',
    content: `# SvartúlfrVerse

## Overview

**SvartúlfrVerse** is a contemporary roleplay setting (2024 baseline) centered on the **Douglas-Bloodmoon** family dynasty in Los Angeles.

## Canon Architecture

The project uses a **5-layer Canon Architecture** (ADR-000 through ADR-006):

| Layer | Status | Description |
|-------|--------|-------------|
| Active | ✅ | Current timeline, factual content |
| Historical | ✅ | Past timeline, factual content |
| Cultural | ✅ | Mythological/traditional, non-factual |
| Deferred | ⏸️ | Not included in runtime exports |
| Candidate | 📝 | Pending approval |

## Dual Dynasty

- **Douglas** — Material, commerce, institutions
- **Bloodmoon** — Cultural, memory, tradition

## Active Canon Characters (12)

1. Wulfnic Bloodmoon — Patriarch
2. Nixara Bloodmoon — Matriarch
3. Erik Douglas — Adopted heir
4. Logan Douglas
5. Malachia Douglas-Bloodmoon
6. Noah Douglas-Bloodmoon
7. Jasper Douglas-Bloodmoon
8. Alyssa Douglas-Bloodmoon
9. Kaladin Nargathon
10. Marcus Thornfield
11. Angel Moreno
12. Edric Douglas

## Governance

All content follows strict Authority separation:
- **Character Authority** — Identity, personality, psychology
- **Family Authority** — Genealogy, marriages, dynasty
- **Visual Authority** — Appearance, visual inheritance
- **Experience Authority** — Scenarios, roles, context

> **Missing Evidence Rule:** If required evidence is not in the repository, STOP. Do not infer or generate gap-fillers.`
  },
  {
    id: 'f2',
    name: 'ADR-000_Runtime_Baseline.md',
    path: '/core/ADR-000_Runtime_Baseline.md',
    category: 'Governance',
    size: 3210,
    lastModified: '2026-06-08',
    excerpt: 'Defines the runtime baseline: contemporary setting, human baseline, no supernatural elements in Active canon.',
    content: `# ADR-000: Runtime Baseline

## Status: ACCEPTED

## Context

The SvartúlfrVerse project requires a clear definition of what constitutes the "baseline" reality for runtime content.

## Decision

The runtime baseline is defined as:

1. **Contemporary setting** — Year 2024, real-world Earth
2. **Human baseline** — All characters are human unless explicitly marked as Cultural Canon
3. **No supernatural elements** in Active-layer exports
4. **Lycanthropy, immortality, pack hierarchy** — Cultural Canon only

## Consequences

- All Active-layer content must be plausible in contemporary reality
- Supernatural elements require Cultural Canon tagging
- Character cards for Active export contain no supernatural references`
  },
  {
    id: 'f3',
    name: 'ADR-006_Canon_Layer_Architecture.md',
    path: '/core/ADR-006_Canon_Layer_Architecture.md',
    category: 'Governance',
    size: 5430,
    lastModified: '2026-06-08',
    excerpt: 'Defines the 5-layer canon architecture: Active, Historical, Cultural, Deferred, Candidate.',
    content: `# ADR-006: Canon Layer Architecture

## Status: ACCEPTED

## Context

The project needs a structured approach to managing different types of canonical information.

## Decision

Five canon layers are established:

### Layer 1: Active Canon
- Current timeline, factual content
- Included in all runtime exports
- Must be plausible in contemporary reality

### Layer 2: Historical Canon
- Past timeline, factual content
- Included with period context
- May reference events before character lifetimes

### Layer 3: Cultural Canon
- Mythological, traditional content
- Clearly marked as non-factual
- Includes: lycanthropy, ancient origins, pack hierarchy

### Layer 4: Deferred Canon
- Approved but not yet implemented
- NOT included in runtime exports
- Stored in repository for future use

### Layer 5: Candidate Canon
- Proposed but not yet approved
- NOT included in any exports
- Requires Architecture Review for promotion

## Consequences

- Every piece of data must have exactly one canon layer tag
- Layers must never be mixed in a single export
- Rejected canon (Valeria, WetNurse, KSA origin) is permanently excluded`
  },
  {
    id: 'f4',
    name: 'C_Wulfnic.md',
    path: '/database/characters/C_Wulfnic.md',
    category: 'Characters',
    size: 6780,
    lastModified: '2026-06-08',
    excerpt: 'Wulfnic Bloodmoon — Patriarch of the Douglas-Bloodmoon family. Born 1948. Human, not supernatural.',
    content: `# Wulfnic Bloodmoon

## Identity

| Field | Value |
|-------|-------|
| **Full Name** | Wulfnic Bloodmoon |
| **Born** | 1948 (age 76) |
| **Gender** | Male |
| **Nationality** | American |
| **Pronouns** | he/him |

## Classification

- **Canon Layer:** Active
- **Dynasty:** Douglas-Bloodmoon (unified)
- **Visual Classification:** Bloodmoon-dominant

## Personality

**Core Traits:**
- Stern but fair
- Deeply protective of family
- Traditional values, pragmatic execution
- Carries the weight of legacy

**Motivations:**
- Primary: Protect and preserve the family legacy
- Secondary: Find meaning beyond being the patriarch
- Hidden: Wants to be seen as himself, not just "the heir"

**Flaws:**
- Emotionally distant as a defense mechanism
- Struggles to delegate — control issues
- Past trauma makes him overprotective

## Relationships

- **Spouse:** Nixara Bloodmoon
- **Children:** Erik Douglas (adopted/step), Malachia, Noah, Jasper, Alyssa

## Background

Born in 1948, Wulfnic grew up during the post-war era. He inherited the Wulfnic name — a title passed down through generations, signifying the custodian of the Svartúlfr legacy.

> **Note:** Wulfnic is fully human. The "Wulfnic" is a title, not a supernatural designation.`
  },
  {
    id: 'f5',
    name: 'C_Alyssa.md',
    path: '/database/characters/C_Alyssa.md',
    category: 'Characters',
    size: 5230,
    lastModified: '2026-06-08',
    excerpt: 'Alyssa Douglas-Bloodmoon — Born 2005. Youngest daughter. Determined, loyal, stubborn.',
    content: `# Alyssa Douglas-Bloodmoon

## Identity

| Field | Value |
|-------|-------|
| **Full Name** | Alyssa Douglas-Bloodmoon |
| **Born** | 2005-03-14 (age 19) |
| **Gender** | Female |
| **Nationality** | American |
| **Pronouns** | she/her |

## Classification

- **Canon Layer:** Active
- **Dynasty:** Douglas-Bloodmoon
- **Visual Classification:** Douglas-dominant

## Personality

**Core Traits:**
- Determined — doesn't give up easily
- Loyal to family, sometimes to a fault
- Stubborn — once she decides something, she commits
- Warm beneath a competitive exterior

**Motivations:**
- Prove herself beyond her family name
- Make her father proud (though she'd never admit it)
- Build something that's truly hers

**Flaws:**
- Competitive to the point of self-sabotage
- Difficulty asking for help
- Holds grudges longer than she should

## Visual Description

- **Hair:** Dark brown (from Douglas lineage)
- **Eyes:** Heterochromatic — left ice-blue (Bloodmoon), right amber (Douglas)
- **Build:** Athletic
- **Height:** 5'7"

## Background

Born in Los Angeles, Alyssa grew up in the shadow of the Douglas-Bloodmoon legacy. As the youngest daughter, she had to fight for attention and recognition. She attended UCLA for Business Administration and now works as a junior executive at the Douglas Trading House.`
  },
  {
    id: 'f6',
    name: 'F_Douglas_Bloodmoon.md',
    path: '/database/families/F_Douglas_Bloodmoon.md',
    category: 'Families',
    size: 4120,
    lastModified: '2026-06-08',
    excerpt: 'The unified Douglas-Bloodmoon dynasty. Douglas: material/commerce. Bloodmoon: cultural/memory.',
    content: `# F_Douglas_Bloodmoon — Unified Dynasty

## Overview

The **Douglas-Bloodmoon** dynasty is the unified family formed by the merger of two lineages:

- **Douglas** — Material, commerce, institutions
- **Bloodmoon** — Cultural, memory, tradition

## Surname Authority

Children of the unified dynasty carry the hyphenated surname **Douglas-Bloodmoon**.

## Key Members

| Name | Role | Status |
|------|------|--------|
| Wulfnic Bloodmoon | Patriarch | Active |
| Nixara Bloodmoon | Matriarch | Active |
| Erik Douglas | Eldest son (adopted) | Active |
| Malachia | Son | Active |
| Noah | Son | Active |
| Jasper | Son | Active |
| Alyssa | Youngest daughter | Active |

## Douglas Trading House

Founded in 1666 (Candidate Baseline), the Douglas Trading House is the family's primary commercial institution. It operates in import/export, real estate, and investment management.`
  },
  {
    id: 'f7',
    name: 'ENGINE_SPECIFICATION.md',
    path: '/core/ENGINE_SPECIFICATION.md',
    category: 'Governance',
    size: 8900,
    lastModified: '2026-06-08',
    excerpt: 'Defines the engine architecture: En_Core, family_engine, relationship_engine, experience_engine, validation_engine.',
    content: `# ENGINE_SPECIFICATION

## Overview

Engines are the query and knowledge layer between the database and consumers (bot, lorebook, export, API).

## Architecture

\`\`\`
User Request → En_Core → Sector Engine → database/
                              ↓
                        validation_engine (gate)
                              ↓
                        Validated Output
\`\`\`

## The Five Engines

### En_Core
Central router + context manager. Receives all requests, routes to sector engines, aggregates results.

### family_engine
Genealogy queries. Returns structured family data. Computes derived relationships on the fly.

### experience_engine
Scenario context. Knows character roles, occupations, residences in specific contexts.

### relationship_engine
Cross-authority relationship computation. Validates claimed relationships against authority records.

### validation_engine
Compliance gatekeeper. All output must pass validation before release.

## Key Constraints

1. **Read-Only:** All engines read from database/. No engine writes to database/.
2. **No Inference:** Engines return \`not_found\` for missing data, never guess.
3. **Authority Respect:** Each engine only returns data from its owning authority.
4. **Validation Mandatory:** No output is released without passing validation_engine.`
  },
  {
    id: 'f8',
    name: 'JANITORAI_AND_ROLEPLAY_BEST_PRACTICES.md',
    path: '/knowledge/JANITORAI_AND_ROLEPLAY_BEST_PRACTICES.md',
    category: 'Knowledge',
    size: 12500,
    lastModified: '2026-06-08',
    excerpt: 'Consolidated best practices for bot quality, lorebook quality, prompt quality, and roleplay quality.',
    content: `# JanitorAI & Roleplay Best Practices

## Executive Summary

### What Separates Quality Tiers

**Poor Bots:** Generic personality, no flaws, no motivations, no behavioral specificity.

**Average Bots:** Some personality traits but flat. Functional but forgettable.

**Good Bots:** Specific personality with contradictions. Motivations drive behavior. Distinct voice.

**Excellent Bots:** Archetypal depth. Every trait connects to behavior. Character surprises but never contradicts.

## The 5 Consensus Principles

1. **Specificity beats generality**
2. **Behavioral anchors beat trait labels**
3. **Positive framing beats negative framing**
4. **Conciseness beats completeness**
5. **Consistency beats cleverness**

## Character Card Design

### Token Budget

| Section | Recommended Tokens |
|---------|-------------------|
| Description/Personality | 150-400 |
| Scenario | 50-150 |
| Example Dialogues | 100-300 |
| First Message | 100-250 |
| **Total permanent budget** | **500-1300** |

### Minimum Viable Character

- 3 specific behavioral patterns
- 1 clear motivation
- 1 clear flaw
- Distinct speech pattern
- 1 narrative hook`
  },
  {
    id: 'f9',
    name: 'EXTERNAL_RESOURCES_INDEX.md',
    path: '/knowledge/EXTERNAL_RESOURCES_INDEX.md',
    category: 'Knowledge',
    size: 6800,
    lastModified: '2026-06-08',
    excerpt: '60 curated external resources with authority classification for bot/lorebook/prompt development.',
    content: `# External Resources Index

## Resource Statistics

| Category | Total | Canonical | Community |
|----------|-------|-----------|-----------|
| AI Platforms | 6 | 3 | 3 |
| Character Creation | 12 | 2 | 10 |
| Prompt Engineering | 10 | 2 | 8 |
| Lorebook Design | 5 | 3 | 2 |
| JanitorAI Ecosystem | 8 | 3 | 5 |
| SillyTavern Ecosystem | 6 | 4 | 2 |
| Image Generation | 5 | 0 | 5 |
| LLM Research | 3 | 3 | 0 |
| Utility Tools | 5 | 1 | 4 |
| **TOTAL** | **60** | **21** | **37** |

## Authority Classification

- ✅ **Canonical Learning Resource** — Official documentation, formal specifications
- 🔵 **Community Resource** — Community guides, tutorials, discussions
- ⚠️ **Experimental** — Cutting-edge or unverified techniques`
  },
  {
    id: 'f10',
    name: 'Repository_Governance.md',
    path: '/core/Repository_Governance.md',
    category: 'Governance',
    size: 7200,
    lastModified: '2026-06-08',
    excerpt: 'Defines repository governance: authority boundaries, canon freeze, template compliance.',
    content: `# Repository Governance

## Authority Boundaries

The project maintains strict separation between four authority domains:

### Character Authority
- Identity, personality, psychology, biography
- Owned by: Character Authority
- Source: database/characters/

### Family Authority
- Genealogy, marriages, dynasty membership, surname rules
- Owned by: Family Authority
- Source: database/families/

### Visual Authority
- Appearance, visual inheritance, color/morphology rules
- Owned by: Visual Authority
- Source: database/worlds/

### Experience Authority
- Scenarios, roles, occupation overrides, residence context
- Owned by: Experience Authority
- Source: database/experiences/

## Canon Freeze v1.0

All records must follow standardized templates:
- C_Template for characters
- Family_Template for families
- W_Template for worlds
- Ex_Template for experiences

## Template Freeze Compliance

- No genealogy in character files
- No personality in family records
- No visual data in character files (reference only)
- All cross-references use canonical IDs`
  },
  {
    id: 'f11',
    name: 'IMPLEMENTATION_PATTERNS.md',
    path: '/knowledge/IMPLEMENTATION_PATTERNS.md',
    category: 'Knowledge',
    size: 5400,
    lastModified: '2026-06-08',
    excerpt: 'Recurring patterns: Validation Gate, Authority-Based Routing, Three-Layer Architecture, Source Attribution.',
    content: `# Implementation Patterns

## Pattern 1: The Validation Gate

Every data flow passes through validation:

\`\`\`
Data produced → Validation Gate → Validated Output (or Rejection)
\`\`\`

## Pattern 2: Authority-Based Routing

\`\`\`
Data request → Identify owning authority → Route to authority's source → Return data
\`\`\`

## Pattern 3: Three-Layer Architecture

- **Layer 1 (Permanent):** Always in context — essential, concise
- **Layer 2 (Triggered):** Context-activated — deep, specific
- **Layer 3 (Repository-only):** Never in context — meta, dev-only

## Pattern 4: Source Attribution Chain

\`\`\`
Output Element → Engine → Database file → Authority → Canon Version
\`\`\`

## Pattern 5: Separation of Read and Write

- Engines: Read from database/ (never write)
- Authorities: Write to database/ (through governance)
- Exporters: Write to output/ (never to database/)`
  },
  {
    id: 'f12',
    name: 'C_Nixara.md',
    path: '/database/characters/C_Nixara.md',
    category: 'Characters',
    size: 4890,
    lastModified: '2026-06-08',
    excerpt: 'Nixara Bloodmoon — Matriarch. Bloodmoon lineage. Keeper of cultural memory and tradition.',
    content: `# Nixara Bloodmoon

## Identity

| Field | Value |
|-------|-------|
| **Full Name** | Nixara Bloodmoon |
| **Born** | 1952 (age 72) |
| **Gender** | Female |
| **Nationality** | American |
| **Pronouns** | she/her |

## Classification

- **Canon Layer:** Active
- **Dynasty:** Bloodmoon (married into Douglas-Bloodmoon)
- **Visual Classification:** Bloodmoon-pure

## Personality

**Core Traits:**
- Warm but perceptive — sees through facades
- Keeper of family stories and traditions
- Mediator in family conflicts
- Quietly powerful — influence through wisdom, not authority

**Motivations:**
- Preserve the Bloodmoon cultural legacy
- Bridge the gap between Douglas pragmatism and Bloodmoon tradition
- Protect her children from the weight of legacy

**Flaws:**
- Sometimes enables conflict by mediating instead of confronting
- Holds onto past grievances longer than she admits
- Can be manipulative when she believes it's for the greater good

## Relationships

- **Spouse:** Wulfnic Bloodmoon
- **Children:** Malachia, Noah, Jasper, Alyssa
- **Step-child:** Erik Douglas

## Background

Nixara carries the Bloodmoon lineage — the cultural and memory branch of the family. Where the Douglas side built institutions, the Bloodmoon side preserved stories, traditions, and the deeper meaning behind the family name.`
  }
];

export const mockCategories = [
  { name: 'All', count: 12, icon: '📁' },
  { name: 'Root', count: 1, icon: '🏠' },
  { name: 'Governance', count: 4, icon: '⚖️' },
  { name: 'Characters', count: 3, icon: '👤' },
  { name: 'Families', count: 1, icon: '👨‍👩‍👧‍👦' },
  { name: 'Knowledge', count: 3, icon: '📚' }
];
