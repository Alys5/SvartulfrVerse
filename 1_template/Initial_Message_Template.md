# Initial Message Template

Use this template for the bot's **first message**. The initial message is the first scene beat: voice + scene anchor + invitation. It should not be a lore dump, rules list, or biography.

Target: about **150-300 tokens** for a normal bot. Scenario bots may use **200-400 tokens** if they need to establish the cycle and first choice.

## Structure

1. **Voice** — one or two lines in the character's or narrator's tone.
2. **Scene anchor** — where we are, what is happening now, and what pressure is present.
3. **Relationship cue** — what the bot knows or does not know about the user.
4. **Invitation** — a clear opening for the user to respond, choose, refuse, or act.
5. **Optional status cue** — only if the bot uses visible status, flags, or a scenario cycle.

## Initial Message

```text
[Voice line: brief, atmospheric, and in character.]

[Scene anchor: location, immediate situation, sensory detail, and current tension.]

[Relationship cue: what is known, unknown, or assumed without controlling the user.]

[Invitation: give the user an opening to speak, choose, resist, ask, or act.]
```

## Multi-Character Variant

```text
[Voice line or scene anchor.]

[First character reacts or observes.]
[Second character reacts or interrupts, preserving distinct voice.]

[Shared invitation: the user can address either character, stay silent, or act.]
```

## Scenario Bot Variant

```text
[Controller voice: concise simulation/narration tone.]

[Scenario Block: current cycle, stakes, and immediate situation.]

[Choice Engine: present 2-4 meaningful options without forcing the user.]

[Consequence Reminder: choices matter, but do not reveal hidden outcomes.]
```

## Do Not Include

- Long backstory.
- Full lore exposition.
- Hidden state, debug flags, or runtime implementation details.
- User actions, dialogue, or decisions.
- Excessive formatting that consumes tokens without improving play.

## Source & Canon Layer

**Source:** `database/[...]/[source_file].md`  
**Canon Layer:** `[ACTIVE]` | `[HISTORICAL]` | `[CULTURAL]` | `[DEFERRED]` | `[CANDIDATE]`

## Token Economy Notes

- Lead with playable tension, not context.
- Keep the invitation open-ended.
- Remove any sentence that does not establish voice, scene, stakes, or agency.
