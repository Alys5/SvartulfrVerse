# Example Dialogue Template

Use this template for the bot's **example_dialogs** field. Example dialogue is behavioral proof, not lore storage. Keep it compact, voice-specific, and focused on how the bot should speak, format turns, react to triggers, and pace escalation or de-escalation.

Target: about **300-600 tokens** for a single character. Use **6-10 short exchanges** for a normal bot, **4-6 per main voice** for multi-character bots, and **3-5 proof exchanges** for scenario bots.

## Formatting Rules

- Use `{{char}}:` and `{{user}}:` exactly as the platform expects.
- Keep each exchange short enough to prove behavior without becoming a lore dump.
- Show the character's voice, emotional rhythm, and boundaries.
- Include at least one calm/normal exchange, one tension or conflict exchange, and one de-escalation or repair exchange.
- Do not make the user act, decide, or reveal private information in examples.
- Avoid excessive backstory, item lists, or world exposition unless the exchange proves a required behavior.

## Example Dialogue

```text
{{user}}: [Normal opening or low-stakes prompt.]
{{char}}: [Voice-accurate response. Show tone, pacing, and a small action or sensory cue.]

{{user}}: [Mild challenge, hesitation, or boundary.]
{{char}}: [Respect the boundary, keep agency, and respond in character.]

{{user}}: [Trigger relevant to the scenario.]
{{char}}: [Demonstrate the intended escalation, deflection, or emotional shift.]

{{user}}: [Attempt to rush or force an outcome.]
{{char}}: [Slow the scene down, preserve tension, and avoid resolving too quickly.]

{{user}}: [Repair, apology, or emotional reset.]
{{char}}: [Show how the bot handles de-escalation without breaking character.]
```

## Multi-Character Notes

For multi-character bots, make each voice separable:

```text
{{user}}: [Prompt that could involve more than one character.]
{{char}}: [First character reacts in their own voice.]
{{char}}: [Second character responds without copying the first voice.]
```

Use a short **Trigger Matrix** if needed:

```text
Trigger Matrix:
- `[keyword or situation]` → `[voice/persona that reacts]` → `[response style]`
- `[keyword or situation]` → `[voice/persona that reacts]` → `[response style]`
```

## Scenario Bot Notes

For scenario bots, examples should prove controller behavior:

```text
{{user}}: [Makes a choice or takes an action.]
{{char}}: [Narrates the consequence, updates the active cycle, and offers clear next options.]

{{user}}: [Tries to bypass a gate or skip pacing.]
{{char}}: [Keeps the simulation coherent, delays unavailable outcomes, and preserves consequences.]
```

## Source & Canon Layer

**Source:** `[...]/[source_file].md`
**Canon Layer:** `[ACTIVE]` | `[HISTORICAL]` | `[CULTURAL]` | `[DEFERRED]` | `[CANDIDATE]`

## Token Economy Notes

- Keep examples short, specific, and repeatable.
- Remove duplicated greetings, repeated boundaries, and lore already present elsewhere.
- Prioritize proof of voice and reaction over explanation.
