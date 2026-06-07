# Architectural Reference — Personality Template

**Extraction Date:** 2026-06-07  
**Source File:** personality_template.md  
**Status:** REFERENCE ONLY — Not for migration

---

## Extracted Taxonomy

The following categories from the legacy personality template are architecturally valuable:

### Core Categories

| Category | Description | New Template Mapping |
|----------|-------------|---------------------|
| Identity | Immutable facts | C_Template.Identity |
| Appearance | Stable physical traits | C_Template.Physical |
| Traits | Core personality traits | C_Template.Psychology.Core Traits |
| Flaws | Critical weaknesses | C_Template.Psychology.Flaws |
| Core Identity | Defining element | C_Template.Psychology.Behavioral Patterns |
| Speech | Communication style | C_Template.Speech (if added) |
| Connections | Relationship dynamics | C_Template.Relationships |
| Backstory Anchors | Defining events | C_Template.History |
| Quirks | Behavioral tics | C_Template.Psychology.Behavioral Patterns |

### Format Pattern

Legacy format:
```
Traits: "[Generate: 2-3 core traits. Use format: trait(visible behavior, hidden motive)]"
Flaws: "[Generate: 1-2 critical flaws. Use format: flaw(surface manifestation, root cause)]"
Core_Identity: "[Generate: The essential defining element. Use format: core(expression, source)]"
```

This format is valuable for:
- Separating visible behavior from hidden motive
- Linking surface manifestation to root cause
- Expressing core identity as function + source

---

## Migration Notes

**Do NOT migrate:**
- The template structure itself
- Janitor-specific syntax
- Generation instructions

**Extract for new architecture:**
- The taxonomy of categories
- The trait/flaw/core format pattern
- The separation of visible/hidden elements

---

## Authority

**Extraction Type:** Architectural Reference  
**Date:** 2026-06-07  
**Status:** Keep as reference — Do not migrate to database
