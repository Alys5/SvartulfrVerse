# Unresolved Conflicts Report

**Date:** 2026-06-08  
**Authority:** Architecture Review  
**Scope:** All conflicts identified during `old_template_and_source/` migration analysis  

---

## Summary

| Category | Count |
|----------|-------|
| Resolved at Audit | 14 |
| Resolved at Architecture Review | 6 |
| Remaining Unresolved | 3 |

---

## Resolved Conflicts

### 1. Wulfnic — Age / Immortality

| Field | Source Value | Canon Value | Resolution |
|-------|-------------|-------------|------------|
| Age | 1200+ (ancient) | 76 (born 1948) | ADR-000: Only Human. Source value REJECTED. |
| Nature | Immortal | Mortal human | ADR-000: No supernatural. Source value REJECTED. |
| Origin | Thrace, 1200 BC | Iceland, 1948 | ADR-001: Bloodmoon origin = Iceland. Source value REJECTED. |

**Resolution Authority:** ADR-000, ADR-001  
**Status:** RESOLVED — Source values are Cultural Canon only.

### 2. Erik — Career / Education

| Field | Source Value | Canon Value | Resolution |
|-------|-------------|-------------|------------|
| Sport | Hockey | UCLA Football | ADR-000: Contemporary baseline. Source value REJECTED. |
| Team | SUCC Bears | UCLA | ADR-000: Contemporary baseline. Source value REJECTED. |

**Resolution Authority:** ADR-000  
**Status:** RESOLVED

### 3. Alyssa — Supernatural Elements

| Field | Source Value | Canon Value | Resolution |
|-------|-------------|-------------|------------|
| Species | Half-Elf | Human | ADR-000: Only Human. REJECTED. |
| Abilities | Seiðr magic | None | ADR-000: No supernatural. REJECTED. |
| Twin Link | Psychic bond with Jasper | Close twin bond (normal) | ADR-000: No supernatural. REJECTED. |
| Pack Rank | Delta | N/A | ADR-000: No Pack system. REJECTED. |

**Resolution Authority:** ADR-000  
**Status:** RESOLVED

### 4. Jasper — Visual Drift

| Field | Source Value | Canon Value | Resolution |
|-------|-------------|-------------|------------|
| Eyes | Amber / Grey-blue | Mint green (Fusion) | ADR-004: Visual Fusion Model. Source value REJECTED. |
| Hair | Black | Caramel-brown (Fusion) | ADR-004: Visual Fusion Model. Source value REJECTED. |

**Resolution Authority:** ADR-004  
**Status:** RESOLVED

### 5. Noah — Career Drift

| Field | Source Value | Canon Value | Resolution |
|-------|-------------|-------------|------------|
| Current Role | Corporate Lawyer | 3L Law Student | ADR-000: Contemporary baseline. Source value REJECTED. |
| Side Role | PR Director | N/A | Not in canon. REJECTED. |
| Pack Rank | Delta | N/A | ADR-000: No Pack system. REJECTED. |

**Resolution Authority:** ADR-000  
**Status:** RESOLVED

### 6. DJFrequency — HTML / Runtime Systems

| Field | Source Value | Canon Value | Resolution |
|-------|-------------|-------------|------------|
| Format | HTML | Markdown | Repository standard. REJECTED. |
| Runtime Logic | Embedded | None | ADR-000: No runtime systems. REJECTED. |
| User Personas | Defined | None | ADR-000: No persona system. REJECTED. |
| NSFW Systems | Present | None | ADR-000: No NSFW systems. REJECTED. |

**Resolution Authority:** ADR-000  
**Status:** RESOLVED

### 7. W_Contemporary — Runtime / Security Systems

| Field | Source Value | Canon Value | Resolution |
|-------|-------------|-------------|------------|
| Runtime Systems | Present | None | ADR-000: No runtime systems. REJECTED. |
| Activation Systems | Present | None | ADR-000: No activation systems. REJECTED. |
| Security Runtime | Present | None | ADR-000: No runtime systems. REJECTED. |

**Resolution Authority:** ADR-000  
**Status:** RESOLVED

### 8. Engine Architecture — Layer Taxonomy

| Field | Source Value | Canon Value | Resolution |
|-------|-------------|-------------|------------|
| En_ prefix | Environment layer | Absorbed into ADRs | Already canonized. ARCHIVE source. |
| W_ prefix | World layer | Absorbed into ADRs | Already canonized. ARCHIVE source. |
| C_ prefix | Character layer | Absorbed into ADRs | Already canonized. ARCHIVE source. |
| Ex_ prefix | Experience layer | Absorbed into ADRs | Already canonized. ARCHIVE source. |

**Resolution Authority:** ADR-000 through ADR-005  
**Status:** RESOLVED — Concepts already absorbed. Source archived.

### 9. Governance Source — Design Principles

| Field | Source Value | Canon Value | Resolution |
|-------|-------------|-------------|------------|
| Runtime First | Principle | Absorbed into ADR-000 | Already canonized. ARCHIVE source. |
| Layer Model | Architecture | Absorbed into ADRs | Already canonized. ARCHIVE source. |
| Persona ≠ Character | Principle | Implicit in current design | Already canonized. ARCHIVE source. |
| Knowledge vs Behavior | Principle | Absorbed into ADR-003/005 | Already canonized. ARCHIVE source. |
| Visual DNA Stack | Architecture | Absorbed into ADR-004 | Already canonized. ARCHIVE source. |

**Resolution Authority:** ADR-000 through ADR-005  
**Status:** RESOLVED — Concepts already absorbed. Source archived.

### 10-14. All Character Sources — Werewolf / Pack / Omegaverse

| Source | Conflict | Resolution |
|--------|----------|------------|
| Wulfnic | Werewolf, Pack Alpha | ADR-000: Only Human. REJECTED. |
| Erik | Werewolf, Pack worlds | ADR-000: Only Human. REJECTED. |
| Alyssa | Werewolf, Half-Elf, Pack Delta | ADR-000: Only Human. REJECTED. |
| Malachia | Omegaverse, Attraction to Alyssa, Werewolf | ADR-000: Only Human. REJECTED. |
| Logan | Werewolf, Pack worlds | ADR-000: Only Human. REJECTED. |
| Jasper | Twin Link, Werewolf | ADR-000: Only Human. REJECTED. |

**Resolution Authority:** ADR-000  
**Status:** RESOLVED

---

## Remaining Unresolved Conflicts

### U-1: Alyssa — Deferred Elements

| Element | Source Value | Issue | Recommended Action |
|---------|-------------|-------|-------------------|
| Angel&Co | Mentioned | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |
| The Verve | Mentioned | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |
| Scar | Physical detail | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |
| PMC Watch | Accessory | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |
| Vehicle | Personal vehicle | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |

**Status:** DEFERRED — Not unresolved, but not yet activated. These elements are classified as Deferred Canon and will be activated through the Experience Authority during Phase 7.

### U-2: DJFrequency — Deferred Elements

| Element | Source Value | Issue | Recommended Action |
|---------|-------------|-------|-------------------|
| BLACKROOM | Location | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |
| Security infrastructure | System | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |
| Music production | Activity | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |

**Status:** DEFERRED — Same as above.

### U-3: W_Contemporary — Deferred Elements

| Element | Source Value | Issue | Recommended Action |
|---------|-------------|-------|-------------------|
| Vanguard PMC | Organization | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |
| Security protocols | System | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |
| Biometric surveillance | System | Deferred Canon — not yet activated | DEFER to Phase 7 (Experience Authority) |

**Status:** DEFERRED — Same as above.

---

## Conflict Resolution Authority

All conflicts were resolved by the following authority chain:

1. **ADR-000** (Runtime Baseline) — Resolved all supernatural, non-human, and runtime system conflicts
2. **ADR-001** (Dynastic Origins) — Resolved origin conflicts (Iceland vs. Thrace)
3. **ADR-004** (Visual Authority) — Resolved visual drift conflicts
4. **ADR-006** (Canon Layer Architecture) — Resolved classification conflicts

No conflicts required escalation beyond ADR authority. All deferred elements are properly classified as Deferred Canon (Layer 4) and will be activated through their respective Authority Owners during Phase 7.
