# PUNCTUATION DIRECTIVE — Em Dash Prohibition

**Status:** CANONICAL  
**Date:** 2026-06-11  
**Authority:** R-010_Punctuation_and_Formatting_Constraints  
**Version:** 1.0 — Canon Freeze v1  
**Applies to:** All bot output layers (Behavior Layer, System Prompt, Post-History Instructions)

---

## 1. System Prompt Block (Punctuation Directive)

Insert the following block into the **System Prompt** or **Behavior Layer** of every bot configuration for SvartulfrVerse characters.

### Template — System Prompt Addition

```
## Punctuation Rules

The character '—' (Em Dash, Unicode U+2014) is strictly forbidden.
Do not use em dashes under any circumstances. This includes:
  - Interrupting thoughts mid-sentence — like this
  - Parenthetical asides — explanatory notes
  - Dramatic pauses — for emphasis
  - Any other em dash usage

Instead, use the following alternatives:
  - Ellipsis (...) for trailing thoughts, hesitation, or dramatic pauses
  - Comma (,) for parenthetical asides or mild interruptions
  - Period (.) to split into separate sentences
  - Semicolon (;) for connecting closely related independent clauses
  - Colon (:) for introducing explanations or lists
  - Parentheses ( ) for optional asides (use sparingly)

Example transformations:
  FORBIDDEN: "I was thinking — well, never mind."
  ALLOWED:  "I was thinking... well, never mind."

  FORBIDDEN: "She was — and I mean this — completely wrong."
  ALLOWED:  "She was, and I mean this, completely wrong."

  FORBIDDEN: "The truth — the real truth — is that I don't know."
  ALLOWED:  "The truth... the real truth... is that I don't know."
```

### Template — JanitorAI `system_prompt` Field

```json
"system_prompt": "You are {{name}}, a character from the SvartulfrVerse.\n\n## Punctuation Rules\nThe character '—' (Em Dash, Unicode U+2014) is strictly forbidden. Never use em dashes. Use ellipsis (...) for pauses, commas for asides, periods to split sentences, or semicolons to connect clauses.\n\n{{behavioral_constraints}}"
```

### Template — SillyTavern `system_prompt` Field

```json
"system_prompt": "You are {{name}}, a character from the SvartulfrVerse.\n\n## Punctuation Rules\nThe character '—' (Em Dash, Unicode U+2014) is strictly forbidden. Never use em dashes. Use ellipsis (...) for pauses, commas for asides, periods to split sentences, or semicolons to connect clauses.\n\n{{post_history_instructions}}"
```

### Template — Post-History Instructions (All Platforms)

```
## Formatting Constraint
NEVER use the em dash character (—, U+2014). If you feel the urge to use an em dash, use "..." instead. This is a hard rule with no exceptions.
```

---

## 2. Fallback Tecnica — Output Sanitization

### 2A. Regex per Output Formatting (SillyTavern / Custom Scripts)

Applica questa regex nel pipeline di output per intercettare e sostituire qualsiasi em dash prima che il testo raggiunga l'utente.

#### JavaScript (ES5) — JanitorAI Engine / Custom Runtime

```javascript
/**
 * sanitizeEmDash — Replaces all em dashes in bot output with contextually
 * appropriate alternatives.
 *
 * @param {string} text - Raw bot output
 * @returns {string} Sanitized text with no em dashes
 */
function sanitizeEmDash(text) {
    if (typeof text !== 'string') {
        return text;
    }

    // Step 1: Replace all em dashes (U+2014) and en dashes (U+2013) with ellipsis
    var sanitized = text.replace(/[\u2014\u2013]/g, '...');

    // Step 2: Clean up any triple-ellipsis artifacts (if ... already adjacent)
    sanitized = sanitized.replace(/\.\.\.\.\.\./g, '...');

    // Step 3: Ensure no double spaces introduced
    sanitized = sanitized.replace(/  +/g, ' ');

    return sanitized;
}

// Usage in output pipeline:
// var rawOutput = generateBotResponse(input);
// var cleanOutput = sanitizeEmDash(rawOutput);
// displayToUser(cleanOutput);
```

#### Python — Custom Scripts / API Middleware

```python
import re

def sanitize_em_dash(text: str) -> str:
    """
    Replaces all em dashes (U+2014) and en dashes (U+2013) in bot output
    with ellipsis, then cleans up artifacts.
    """
    if not isinstance(text, str):
        return text

    # Replace em/en dashes with ellipsis
    sanitized = re.sub(r'[\u2014\u2013]', '...', text)

    # Clean up sextuple ellipsis artifacts
    sanitized = re.sub(r'\.{6,}', '...', sanitized)

    # Remove double spaces
    sanitized = re.sub(r'  +', ' ', sanitized)

    return sanitized
```

#### Regex Pattern (Standalone — qualsiasi linguaggio)

```
Pattern:  [\u2014\u2013]
Replace:  ...
Flags:    g (global)

Spiegazione:
  \u2014  = Em Dash (—)
  \u2013  = En Dash (–) — incluso come precauzione
  g       = global match (sostituisce tutte le occorrenze)
```

#### SillyTavern — Custom Extension / Script

Se usi SillyTavern con un'estensione di post-processing:

```javascript
// SillyTavern Extension: Em Dash Sanitizer
// Hook into the message rendering pipeline

eventSource.on('message', function(event) {
    if (event.data && typeof event.data === 'string') {
        event.data = event.data.replace(/[\u2014\u2013]/g, '...');
    }
});
```

### 2B. Logit Bias — API Diretta (OpenAI / Compatible)

Per API che supportano `logit_bias` (OpenAI, Azure OpenAI, alcune implementazioni locali):

```json
{
    "model": "gpt-4",
    "messages": [
        {
            "role": "system",
            "content": "You are {{name}}. The character '—' (em dash) is strictly forbidden. Use '...' instead."
        }
    ],
    "logit_bias": {
        "98928": -100
    }
}
```

**Nota:** Il token ID `98928` è il token per `—` (em dash) nella tiktoken cl100k_base usata da GPT-4. Verifica il token ID esatto per il tuo modello specifico:

```python
# Trova il token ID per il tuo modello
import tiktoken

enc = tiktoken.encoding_for_model("gpt-4")
token_id = enc.encode("—")[0]
print(f"Em Dash token ID: {token_id}")
# Output tipico: 98928 (cl100k_base)
```

**Per modelli diversi (Claude, Llama, ecc.):**

| Modello | Metodo | Note |
|---------|--------|------|
| OpenAI GPT-4/4o/o1 | `logit_bias: {token_id: -100}` | Token ID: 98928 (cl100k_base) |
| Azure OpenAI | `logit_bias: {token_id: -100}` | Stesso schema OpenAI |
| Claude (Anthropic) | Non supportato | Usa system prompt + regex fallback |
| Llama / Mistral (locali) | `logit_bias: {token_id: -100}` | Token ID varia per tokenizer |
| Generic API | Regex fallback | Sempre applicare come safety net |

**Importante:** Il `logit_bias` a `-100` rende il token praticamente impossibile da generare, ma **non è garantito al 100%**. Combina SEMPRE il logit_bias con il fallback regex.

---

## 3. Integration nei 4-Layer

### Dove applicare la direttiva

| Layer | File | Campo | Applicazione |
|-------|------|-------|-------------|
| L1 Engine | `En_Core.js` | Output sanitization | `sanitizeEmDash()` nel pipeline di output |
| L2 World | `W_Contemporary.js` | N/A | Non applicabile (world layer) |
| L3 Family | `F_Douglas_Bloodmoon.js` | N/A | Non applicabile (family layer) |
| L4 Character | `C_[Name].md` | System Prompt | Blocco Punctuation Directive |

### Flusso di output con sanitizzazione

```
[LLM Generate Raw Text]
        |
        v
[Logit Bias (API level)] --- if available
        |
        v
[sanitizeEmDash() (Engine level)] --- always applied
        |
        v
[Display to User]
```

---

## 4. Enforcement Summary

| Enforcement Layer | Method | Reliability | Notes |
|-------------------|--------|-------------|-------|
| System Prompt Directive | Prompt engineering | ~90% | Prima linea di difesa |
| Logit Bias | API-level token suppression | ~99% | Solo API compatibili |
| Regex Fallback | Post-processing | 100% | Safety net obbligatoria |

**Policy:** Tutti e tre i layer devono essere attivi. Il regex fallback è **obbligatorio** indipendentemente dagli altri due.

---

## 5. Authority

**Established by:** Architecture Review — Bot Behavior Layer Update  
**Approved by:** Canon Freeze v1 Governance  
**Depends on:** R-008_Bot_Rules, R-010_Punctuation_and_Formatting_Constraints  
**Version:** 1.0 — Frozen under Canon Freeze v1
