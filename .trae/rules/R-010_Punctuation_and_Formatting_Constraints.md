---
alwaysApply: false
description: Apply when generating bot output, formatting dialogue, processing character speech, or handling any text that will be displayed to users. Governs punctuation constraints for the SvartulfrVerse Behavior Layer.
---
# R-010: Punctuation and Formatting Constraints

**Authority:** ADR-003_Character_Authority.md, ADR-006_Canon_Layer_Architecture.md, R-008_Bot_Rules.md  
**Type:** Operational Rule — Bot Behavior Layer  
**Date:** 2026-06-11  
**Status:** ACTIVE (Canon Freeze v1 — Bot Phase)

---

## Purpose

This rule governs punctuation usage in all bot-generated output for the SvartulfrVerse. It establishes the Em Dash (—, U+2014) as a **Forbidden Token** and defines mandatory alternatives to ensure consistent formatting across all platforms and characters.

---

## R-010-PNC-001: Em Dash Prohibition

### Authority
ADR-003, R-008-BOT-001, R-008-BOT-003

### Rule
The Em Dash character (—, Unicode U+2014) is **strictly forbidden** in all bot output. The En Dash (–, Unicode U+2013) is also forbidden as a precautionary measure.

### Rationale
LLM models exhibit a strong tendency to overuse em dashes for interruptions, parenthetical asides, and dramatic pauses. This pattern degrades the SvartulfrVerse formatting standard, which favors cleaner punctuation (ellipses, commas, periods) for narrative consistency. The em dash is not part of the established voice style for any character in the repository.

### Allowed
- Ellipsis (`...`) for trailing thoughts, hesitation, or dramatic pauses
- Comma (`,`) for parenthetical asides or mild interruptions
- Period (`.`) to split into separate sentences
- Semicolon (`;`) for connecting closely related independent clauses
- Colon (`:`) for introducing explanations or lists
- Parentheses (`( )`) for optional asides (use sparingly)

### Prohibited
- Em Dash (`—`, U+2014) — **FORBIDDEN TOKEN**
- En Dash (`–`, U+2013) — **FORBIDDEN TOKEN**
- Any variant of dash used as an interruption marker
- Workarounds that simulate em dashes (e.g., double hyphen `--`)

---

## R-010-PNC-002: Mandatory Alternatives

### Authority
ADR-003, R-008-BOT-002

### Rule
When the model would naturally produce an em dash, it must use one of the approved alternatives from R-010-PNC-001. The System Prompt must explicitly instruct the model with transformation examples.

### Rationale
Simply forbidding a token without providing alternatives leads to degraded output quality (awkward phrasing, repetitive structures). Positive alternatives maintain narrative quality while enforcing the constraint.

### Required System Prompt Block
Every bot configuration must include the following directive (or equivalent):

```
The character '—' (Em Dash, Unicode U+2014) is strictly forbidden.
Never use em dashes. Use ellipsis (...) for pauses or trailing thoughts,
commas for asides, periods to split sentences, or semicolons to connect clauses.
```

### Transformation Reference

| Forbidden Pattern | Required Alternative |
|-------------------|---------------------|
| `thought — interrupted` | `thought... interrupted` |
| `She was — wrong` | `She was... wrong` or `She was, frankly, wrong` |
| `truth — the real truth` | `truth... the real truth` |
| `A — B — C` | `A, B, C` or `A: B, C` |
| `pause — then action` | `pause... then action` |

---

## R-010-PNC-003: Technical Fallback Enforcement

### Authority
R-007_Engine_Rules, R-008-BOT-003

### Rule
A regex-based output sanitization must be applied as a safety net after all LLM-generated text, regardless of platform or API. This fallback catches any em dash that bypasses the System Prompt directive and logit bias.

### Rationale
Prompt-level enforcement is ~90% effective. Logit bias (where available) reaches ~99%. The regex fallback provides 100% guarantee that no em dash reaches the user.

### Required Implementation

**Regex Pattern:**
```
/[\u2014\u2013]/g
```

**Replacement:** `...`

**Implementation (JanitorAI Engine - ES6-safe sandbox):**
```javascript
function sanitizeEmDash(text) {
    if (typeof text !== 'string') { return text; }
    var sanitized = text.replace(/[\u2014\u2013]/g, '...');
    sanitized = sanitized.replace(/\.\.\.\.\.\./g, '...');
    sanitized = sanitized.replace(/  +/g, ' ');
    return sanitized;
}
```

**Implementation (API — OpenAI compatible):**
```json
{
    "logit_bias": {
        "98928": -100
    }
}
```
Token ID `98928` = Em Dash in cl100k_base tokenizer. Verify per-model.

### Enforcement Layers

| Layer | Method | Reliability | Required |
|-------|--------|-------------|----------|
| System Prompt | Prompt engineering | ~90% | YES |
| Logit Bias | API token suppression | ~99% | YES (if API supports it) |
| Regex Fallback | Post-processing | 100% | YES (always) |

**Policy:** All three layers must be active. The regex fallback is mandatory regardless of the other two.

---

## R-010-PNC-004: Platform-Specific Application

### Authority
R-008-BOT-001, BOT_EXPORT_SPECIFICATION.md

### Rule
The punctuation constraint must be applied at every point in the output pipeline where text is generated or displayed.

### Application Map

| Platform | Where to Apply | Method |
|----------|---------------|--------|
| JanitorAI | `system_prompt` field + `post_history_instructions` | Directive + `sanitizeEmDash()` in En_Core.js |
| SillyTavern | `system_prompt` field + `post_history_instructions` | Directive + extension script |
| Generic JSON | `system_prompt` field | Directive + middleware |
| Custom API | `messages[0].content` (system) + output pipeline | Directive + logit_bias + regex |
| Direct Chat | Output rendering layer | Regex fallback (always) |

---

## R-010-PNC-005: Character Voice Preservation

### Authority
ADR-003, R-003_Character_Rules

### Rule
The em dash prohibition applies universally to all characters. No character record may claim em dashes as part of their voice profile. Character-specific speech patterns must use the approved alternatives.

### Rationale
Voice differentiation must be achieved through vocabulary, sentence structure, rhythm, and word choice — not through forbidden punctuation. This ensures all characters maintain the SvartulfrVerse formatting standard while remaining distinct.

### Allowed Voice Differentiation
- Sentence length variation
- Vocabulary choice (formal vs. casual)
- Contractions vs. full forms
- Ellipsis frequency (hesitant vs. decisive characters)
- Exclamation patterns
- Question patterns

### Prohibited Voice Differentiation
- Using em dashes as a character-specific trait
- Claiming "this character uses dashes" in any record

---

## Summary

| Rule ID | Description |
|---------|-------------|
| R-010-PNC-001 | Em Dash (—) and En Dash (–) are strictly forbidden in all bot output |
| R-010-PNC-002 | System Prompt must include explicit directive with transformation examples |
| R-010-PNC-003 | Regex fallback `/[\u2014\u2013]/g → '...'` is mandatory on all output |
| R-010-PNC-004 | Constraint applied per-platform at system_prompt + output pipeline |
| R-010-PNC-005 | No character may claim em dashes as voice differentiation |

---

## Authority

**Established by:** Architecture Review — Bot Behavior Layer Update  
**Approved by:** Canon Freeze v1 Governance  
**Depends on:** ADR-003, ADR-006, R-008_Bot_Rules, R-007_Engine_Rules  
**Version:** 1.0 — Frozen under Canon Freeze v1
