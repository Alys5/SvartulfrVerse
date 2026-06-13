---
alwaysApply: false
description: 
---
# 01. Authority and Scope

This module defines the authority model for SvartulfrVerse JanitorAI rules.

## Applies To

Use these rules for:

- JanitorAI Script templates.
- Lorebook_MacroCosmo and Lorebook_MicroCosmo systems.
- Runtime utilities and debug helpers.
- Generated scenario-specific scripts.
- Supporting documentation and review workflows.

## Authoritative Sources

Every JanitorAI component must be designed and reviewed against the applicable source documentation:

- [`../../README.md`](../../README.md)
- [`../../template/janitorai_scripts.md`](../../template/janitorai_scripts.md)
- [`../../template/Adaptive_Lorebook_Template_README.md`](../../template/Adaptive_Lorebook_Template_README.md)
- [`../../template/Advanced_Faction_Management_Template_README.md`](../../template/Advanced_Faction_Management_Template_README.md)
- [`../../template/Anti_Omniscience_Investigation_Template_README.md`](../../template/Anti_Omniscience_Investigation_Template_README.md)
- [`../../template/Complex_Lorebook_Template_README.md`](../../template/Complex_Lorebook_Template_README.md)
- [`../../template/Context_Aware_Multiple_Character_Template_README.md`](../../template/Context_Aware_Multiple_Character_Template_README.md)
- [`../../template/Context_Control_Awareness_Template_README.md`](../../template/Context_Control_Awareness_Template_README.md)
- [`../../template/Context_Control_Template_README.md`](../../template/Context_Control_Template_README.md)
- [`../../template/Hidden_Persistent_Memory_Template_README.md`](../../template/Hidden_Persistent_Memory_Template_README.md)
- [`../../template/Multiple_Character_Template_README.md`](../../template/Multiple_Character_Template_README.md)
- [`../../template/Persistent_Flags_Lorebook_Template_README.md`](../../template/Persistent_Flags_Lorebook_Template_README.md)
- [`../../template/Progressive_Sentence_Lorebook_Template_README.md`](../../template/Progressive_Sentence_Lorebook_Template_README.md)
- [`../../template/TimeDelay_Script_Template_README.md`](../../template/TimeDelay_Script_Template_README.md)
- [`../../template/PropertyExploration_README.md`](../../template/PropertyExploration_README.md)

## Rule Precedence

When rules appear to conflict, resolve in this order:

1. Explicit user instruction for the current task.
2. [`../../README.md`](../../README.md).
3. [`../../template/janitorai_scripts.md`](../../template/janitorai_scripts.md).
4. The matching template README.
5. The numbered rule modules in `.trae/rules/`.
6. Project memory and prior architectural decisions.

No external shortcut, personal convention, undocumented pattern, or convenience abstraction may override these rules unless explicitly approved.

## Authority Separation

- World facts are owned by the World / MacroCosmo domain.
- Genealogy is owned by the Family Authority.
- NPC and Character records may reference family data but must not redefine it.
- Runtime integration scripts may coordinate context injection but must not redefine world facts, family genealogy, or character identity by themselves.
- Spoiler and state modules may gate or persist information but must not invent canon.

## Repository Hygiene Baseline

- Do not create files unless they are necessary for the requested goal.
- Prefer editing existing files over creating new files.
- Never create documentation files unless explicitly requested.
- Never commit changes unless explicitly asked.
- Never run destructive git commands unless explicitly asked.
- `database_old/` is a read-only historical archive, isolated via `.gitignore`, and must never be referenced by export scripts.
