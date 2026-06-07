# Template & Engine Improvement Plan

**Date:** 2026-06-08
**Authority:** Governance Authority
**Status:** APPROVED

---

## Principi Architetturali

### Authority First

Il repository è authority-driven.

**Gerarchia:**

```
Family Authority
    ↓
Dynastic Origins
    ↓
Visual Authority
    ↓
Character Authority
    ↓
Institution Authority
    ↓
Technology Authority
    ↓
World Authority
    ↓
Experience Authority
    ↓
Governance Authority
```

Higher authority records always override lower-level records.

### Source Repository Is Frozen

```
old_template_and_source/
```

È un frozen evidence repository.

- Non è legacy garbage
- È l'archivio di recovery autorevole
- Usato per future migration verification
- Non modificare se non esplicitamente richiesto

### Database Is The Future Source Of Truth

**Target structure:**

```
database/
├── families/
├── institutions/
├── technology/
├── characters/
├── worlds/
├── experiences/
├── canon_candidates/
└── governance/
```

Dopo la migrazione, i record authority dentro `database/` diventano la fonte primaria.

---

## Decisioni Approvate

| Decisione | Scelta |
|-----------|--------|
| Export Template Location | `deployment/templates/` |
| Engine Scope | Implementare solo validation e cross-reference check |
| Lorebook Generation | Semi-automatico (template con placeholder) |

---

## Architettura Aggiornata

### Struttura Directory

```
SvartulfrVerse/
├── authority/              → Authority records (corrente fonte di verità)
├── database/               → Future source of truth (post-migration)
│   ├── families/
│   ├── institutions/
│   ├── technology/
│   ├── characters/
│   ├── worlds/
│   ├── experiences/
│   ├── canon_candidates/
│   └── governance/
├── deployment/             → NEW: Export layer
│   ├── templates/          → Export templates per piattaforme
│   │   ├── janitorai/
│   │   └── sillytavern/
│   └── exports/            → Export generati
├── old_template_and_source/ → FROZEN: Evidence repository
├── core/                   → ADR e governance
├── engines/                → Validation engines (da implementare)
└── reports/                → Report operativi
```

---

## Fase 1: Deployment Layer Setup

### 1.1 Creare Struttura Deployment

```
deployment/
├── templates/
│   ├── janitorai/
│   │   ├── Character_Export.md
│   │   ├── Lorebook_Export.md
│   │   └── Experience_Export.md
│   └── sillytavern/
│       ├── Character_Card.md
│       └── World_Info.md
└── exports/
    └── README.md
```

### 1.2 Export Template: JanitorAI Character

```markdown
# JanitorAI Character Export Template

## Character Data

| Field | Source | Value |
|-------|--------|-------|
| Name | {{character.identity.name}} | |
| Age | {{character.identity.age}} | |
| Pronouns | {{character.identity.pronouns}} | |

## Description

{{character.physical.description}}
{{character.psychology.core_traits}}

## Personality

{{character.psychology.behavioral_patterns}}

## Scenario

{{character.current_status.location}}
{{character.current_status.activity}}

## First Message

[Generated from Experience template]

## System Prompt

[Generated from Authority rules]
```

### 1.3 Export Template: Lorebook

```markdown
# Lorebook Entry Template

## Entry: {{entry_name}}

| Field | Value |
|-------|-------|
| Keys | {{keys}} |
| Content | {{content}} |
| Depth | 2 |
| Scan Order | {{priority}} |

### Content Template

{{character.biography}}
{{character.relationships}}
{{character.history}}
```

---

## Fase 2: Validation Engine

### 2.1 Validation Scope

Implementare solo:

1. **Cross-reference validation** - Verificare che i riferimenti tra authority siano consistenti
2. **Conflict detection** - Identificare conflitti tra authority
3. **Completeness check** - Verificare che i record siano completi

### 2.2 Validation Engine Structure

```
engines/
├── validation_engine.js
├── cross_reference_check.js
├── conflict_detector.js
└── completeness_checker.js
```

### 2.3 Validation API

```javascript
// validation_engine.js

/*
  VALIDATION ENGINE
  
  Responsibilities:
  - Cross-reference validation between authority records
  - Conflict detection across authority layers
  - Completeness verification for database migration
  
  NOT Responsibilities:
  - Runtime behavior
  - State management
  - Platform-specific logic
*/

const ValidationEngine = {
  validateCrossReferences: function(sourceId, targetId) {
    // Check if reference exists and is valid
  },
  
  detectConflicts: function(authorityLevel1, authorityLevel2) {
    // Detect conflicts between authority records
  },
  
  checkCompleteness: function(recordId) {
    // Verify record has all required fields
  }
};
```

---

## Fase 3: Semi-Automatic Lorebook Generation

### 3.1 Lorebook Template con Placeholder

```markdown
# Lorebook: {{character_name}}

## Metadata

| Field | Value |
|-------|-------|
| Character | {{character.identity.name}} |
| Source | {{source_file}} |
| Generated | {{timestamp}} |

## Core Identity

### Keys
- {{character.identity.name}}
- {{character.identity.aliases}}

### Content
{{character.biography.summary}}

## Family Relationships

### Keys
- {{family_member_names}}

### Content
{{character.family_relationships}}

## Physical Description

### Keys
- {{character.identity.name}} appearance
- {{character.identity.name}} looks

### Content
{{character.physical.description}}

## Psychology

### Keys
- {{character.identity.name}} personality
- {{character.identity.name}} behavior

### Content
{{character.psychology.core_traits}}

---

## Placeholder Legend

| Placeholder | Source |
|-------------|--------|
| {{character.identity.name}} | C_Template.Identity.Name |
| {{character.biography.summary}} | Authority/characters/{id}/Biography.md |
| {{character.family_relationships}} | Authority/family/Family_Graph.md |
| {{character.physical.description}} | C_Template.Physical |
| {{character.psychology.core_traits}} | C_Template.Psychology |
```

### 3.2 Generazione Semi-Automatica

1. **Script estrae dati** dal database/authority
2. **Popola i placeholder** nel template
3. **Output** in `deployment/exports/`
4. **Review manuale** per qualità

---

## Roadmap Aggiornata

### Pre-Migration

| Task | Priorità | Status |
|------|----------|--------|
| Creare struttura deployment/ | Alta | PENDING |
| Definire export template JanitorAI | Alta | PENDING |
| Definire lorebook template | Media | PENDING |

### Post-Migration

| Task | Priorità | Status |
|------|----------|--------|
| Implementare validation engine | Media | PENDING |
| Creare script di export | Media | PENDING |
| Generare lorebook per personaggi | Bassa | PENDING |

---

## Non Implementare

1. **Runtime behavior** - Non è canon
2. **State management** - È platform-specific
3. **Platform-specific code** - Mantenere agnostic
4. **Modifiche a old_template_and_source/** - È frozen

---

## Autorità

**Document Type:** Improvement Plan
**Date:** 2026-06-08
**Authority:** Governance Authority
**Status:** APPROVED
