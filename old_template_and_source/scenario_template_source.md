# Architectural Reference — Scenario Template

**Extraction Date:** 2026-06-07  
**Source File:** scenario_template.md  
**Status:** REFERENCE ONLY — Not for migration

---

## Extracted Concepts

### Layer Separation

The legacy scenario template demonstrates clear separation:

| Section | Layer | New Architecture Mapping |
|---------|-------|--------------------------|
| World Invariants | World Layer | W_Template |
| Lore Invariants | World Layer | W_Template.World Rules |
| Context Invariants | Experience Layer | Ex_Template |
| Session Dynamics | Experience Layer | Ex_Template |
| Trigger Contract | Runtime | REJECT — Janitor-specific |

### World Invariants Pattern

```
Era: [Exact time period]
Location: [Specific place name]
Setting: [Genre and world type]
Factions: [List with roles]
Conflicts: [Primary conflict summary]
Society: [Social structure and customs]
```

This pattern maps directly to W_Template.Scope and W_Template.Culture.

### Lore Invariants Pattern

```
Species: [Base species]
Abilities: [Powers and limitations]
Physiology: [Physical traits and needs]
Weaknesses: [Vulnerabilities]
Culture: [Traditions and hierarchy]
Rules: [Restrictions and requirements]
Stigma: [Social prejudices]
```

This pattern maps to W_Template.World Rules.

### Session Dynamics Pattern

```
Starting Situation: [Opening scene setup]
Current Tension: [low/medium/high + reason]
Escalation Axis: [What raises stakes]
De_escalation Axis: [What restores stability]
Repair Routes: [Recovery paths]
```

This pattern maps to Ex_Template.

---

## Rejected Elements

| Element | Reason |
|---------|--------|
| Trigger Contract | Janitor runtime behavior |
| User Contract | Janitor deployment-specific |
| Gemini Directive | Generation instructions |
| PList syntax | Janitor-specific format |

---

## Migration Notes

**Do NOT migrate:**
- The template structure itself
- Janitor-specific syntax
- Generation instructions
- Trigger contracts
- User contracts

**Extract for new architecture:**
- The layer separation concept
- The invariant taxonomy
- The session dynamics pattern

---

## Authority

**Extraction Type:** Architectural Reference  
**Date:** 2026-06-07  
**Status:** Keep as reference — Do not migrate to database
