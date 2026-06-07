# ADR-004 Report

**Date:** 2026-06-07  
**ADR Reference:** ADR-004_Visual_Authority.md  
**Status:** COMPLETE

---

## Executive Summary

ADR-004 establishes the Visual Authority Layer as the sole canonical source for all appearance, aesthetic, and visual inheritance data within SvartulfrVerse.

---

## Decisions Recorded

### Decision 1: Visual Layer Ownership

**Scope:** Complete authority over visual characteristics

| Domain | Ownership | Status |
|--------|-----------|--------|
| Appearance | Visual Layer | Canonical |
| Aesthetic | Visual Layer | Canonical |
| Inheritance Rules | Visual Layer | Canonical |
| Coloration | Visual Layer | Canonical |
| Resemblance | Visual Layer | Canonical |

### Decision 2: Visual Baselines Defined

| Baseline | Reference | Key Attributes |
|----------|-----------|----------------|
| Douglas | Erik Douglas | Black hair, amber eyes, massive build |
| Bloodmoon | Wulfnic Bloodmoon | Silver-white hair, silver-white eyes, lean build |

### Decision 3: Fusion Inheritance Model

**Rule:** Children of Douglas + Bloodmoon union inherit according to fusion rules:
- Hair: 75% Douglas (black) / 25% Bloodmoon (silver-white)
- Eyes: 60% Douglas (amber) / 40% Bloodmoon (silver/pale)
- Build: Douglas-dominant (mass)
- Aesthetic: Character-specific (not inherited)

### Decision 4: Character Resemblance Rules

| Character | Resemblance | Expression |
|-----------|-------------|------------|
| Alyssa | Nixara (maternal) | Bloodmoon-visual-dominant |
| Noah | Bloodmoon coloration | Recessive expression |
| Malachia | Douglas coloration | Dominant expression |

### Decision 5: Visual-Genealogy Independence

**Rule:** Visual Authority is independent from Genealogy Authority.
- Genealogy defines WHO is parent to WHOM
- Visual defines WHAT characteristics pass from parent to child
- These are separate authority domains

---

## Stable Canon Established

| Element | Status | Authority |
|---------|--------|-----------|
| Douglas Visual Baseline | STABLE | ADR-004 |
| Bloodmoon Visual Baseline | STABLE | ADR-004 |
| Fusion Inheritance Model | STABLE | ADR-004 |
| Alyssa/Nixara Resemblance Rule | STABLE | ADR-004 |
| Noah/Bloodmoon Coloration Rule | STABLE | ADR-004 |
| Malachia/Douglas Coloration Rule | STABLE | ADR-004 |
| Visual-Genealogy Independence | STABLE | ADR-004 |

---

## Conflicting Canon

| Conflict | Archive Claim | Canonical Reality | Status |
|----------|---------------|-------------------|--------|
| Noah Hair Color | Variable | Blonde | STABLE |
| Noah Eye Color | Variable | Blue | STABLE |
| Malachia Hair Color | Variable | Black | STABLE |
| Malachia Eye Color | Variable | Amber | STABLE |
| Alyssa Hair Color | Variable | Caramel-brown | STABLE |
| Alyssa Eye Color | Variable | Mint green | STABLE |

---

## Import Readiness

| Element | Status | Notes |
|---------|--------|-------|
| Visual Framework | READY | Authority defined |
| Visual Baselines | READY | Douglas/Bloodmoon established |
| Inheritance Rules | READY | Fusion model defined |
| Visual Validation | PENDING | Protocol not yet defined |

---

## Authority

Established by: Visual Authority & Architecture Review  
Approved by: Runtime Validation  
Date: 2026-06-07
