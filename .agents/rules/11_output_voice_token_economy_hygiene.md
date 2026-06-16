---
alwaysApply: false
description: "SvartulfrVerse JanitorAI rule module. Follow .trae/rules/rules.md for precedence, ES6-safe sandbox runtime constraints, context API, and Level 0 / Level 1 / Level 3 output hygiene."
---

# 11. Output Voice, Token Economy, and Repository Hygiene

This module defines output voice, lorebook voice rules, token economy, and repository hygiene.

## Output Voice Rules

All SvartulfrVerse output must be clear, structured, and accessible.

- Use concise explanations.
- Use bullets and tables when they improve scanability.
- Do not add decorative filler.
- Do not use emojis unless explicitly requested.
- Do not leak local filesystem paths, repository paths, URLs, template names, conversion boundaries, or debug headers into bot-facing text or lorebook content.
- Do not use internal architecture jargon such as `MacroCosmo`, `MicroCosmo`, `Level 0`, `Level 1`, `Level 3`, or `Engine Data` in bot-facing text unless explicitly required.

## Lorebook Voice Rules

Every lorebook voice must include:

- Canon Layer tag;
- prefix;
- concise in-universe facts;
- behavior or scene relevance.

Required format:

```text
[ACTIVE] LOC Compact facts here.
```

Allowed Canon Layers:

- `ACTIVE`
- `HISTORICAL`
- `CULTURAL`
- `DEFERRED`
- `CANDIDATE`

Allowed prefixes:

- `WRD`
- `LOR`
- `LOC`
- `ORG`
- `BST`
- `FAM`
- `NPC`
- `SEC`
- `CAN`
- `REL`

Forbidden:

- `source:unspecified`;
- `Source:` path/URL metadata, local filesystem paths, repository paths, template names, conversion boundaries, or debug headers;
- non-canonical prefixes such as `HST`, `CUL`, `WIT`;
- local archive references from `TODO-CANON/`;
- bot-facing architecture jargon;
- opening-message logic in Scenario files.

## Token Economy Rules

- Personality should be identity-focused, not a biography dump.
- Scenario should be directive, not a wiki.
- Example Dialogue should be compact and behavior-proving.
- Initial Message should be voice + scene anchor + invitation.
- Bot Card should sell the click, not explain the entire lore.
- Critical rules should be placed where the model is most likely to remember them.
- Long lore dumps should be moved into dynamic lore or removed.
- Every added token should change behavior, clarify voice, control pacing, gate information, or prevent a known failure mode.

## Repository Hygiene

- Do not create files unless they are necessary.
- Prefer editing existing files over creating new files.
- Never create documentation files unless explicitly requested.
- Never commit changes unless explicitly asked.
- Never run destructive git commands unless explicitly asked.
- `TODO-CANON/` is read-only historical archive and must not be referenced by export scripts.
- `ASSET_REGISTRY.json` is the source of truth for approved image metadata.
- Re-check `git diff --check` after documentation or script edits.
