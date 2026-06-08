# Repository Architecture

---

## Migration Metadata

| Field | Value |
|-------|-------|
| Source | core/Architecture.md |
| Authority | Architecture Review |
| Migration Date | 2026-06-08 |
| Status | Migrated |

---

## Core Principles

1. **Runtime First** — Preserve behavior before optimization
2. **Preserve Behavior Before Refactoring** — Character data must remain internally consistent
3. **Knowledge vs Behavior Separation** — Family Authority is knowledge-only
4. **Character Canonicality** — Characters own identity, reference genealogy, contain no scenario data
5. **Incremental Reintroduction** — Archived systems remain archived until validated
6. **Canonical Stabilization Before Expansion** — Depth precedes breadth

## Authority Layers

| Layer | Owns | References |
|-------|------|------------|
| Family Authority | Genealogy, dynasties, surnames, kinship | — |
| Character Authority | Identity, personality, biography, skills, education | Family (read-only) |
| Visual Authority | Appearance, phenotype, inheritance rules | Family (read-only) |
| Experience Authority | Scenario framing, context, roles, occupation override | Character, Family, Visual (read-only) |

## Data Model

### Character Authority owns: Given Name, Sex, Birth Date, Personality, Values, Education, Skills, Biography, Baseline Occupation

### Character Authority references: Surname (Family), Dynastic Membership (Family), Family Relationships (Family), Appearance (Visual)

### Experience Authority owns: Scenario Framing, Context State, Role Assignment, Occupation Override, Current Residence, Relationship Extensions

### Family Authority owns: Dynasties, Parent-Child, Marriages, Surnames, Genealogical Relationships, Hereditary Titles

### Visual Authority owns: Appearance Baseline, Aesthetic Profile, Visual Inheritance Rules, Coloration Authority, Resemblance Rules

## Repository Scope

**Supported:** Only Human, Contemporary (2020s-2030s), Los Angeles Dynasty

**Not Supported (Archived):** Urban Fantasy, Cyber, Wasteland, Fantasy, Norse Mythic, Regency, Overlay Systems, Pack Systems, Supernatural Systems

## Engine Layer Role

Engines are **knowledge and query layers**, not behavior generators. They query authority layers, verify consistency, return canonical data. They do NOT generate characters, create relationships, compute state, or simulate behavior.
