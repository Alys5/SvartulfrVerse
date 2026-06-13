# ADR 001: Knowledge vs Behavior Separation

## Context

In early iterations of the SvartúlfrVerse, character lorebooks (`C_*`) contained both factual identity data (e.g., appearance, backstory) and imperative behavioral instructions (e.g., "Always react with anger when X occurs").

This caused:

- Monolithic prompt degradation
- Contradictory behavioral instructions
- Difficult debugging
- Poor modularity
- Lorebook contamination

## Decision

We formally separate **Knowledge** from **Behavior**.

### Knowledge Layer

The Knowledge Layer (`W_*`, `C_*`) stores only:

- Identity
- Appearance
- Physiology
- Preferences
- History
- Relationships
- Psychological descriptors
- Behavioral tendencies

It answers:

- "Who is this character?"
- "What is true?"
- "What exists?"

### Behavior Layer

The Behavior Layer (`En_*`, `scripts/`) stores:

- Runtime logic
- State transitions
- Imperative instructions
- Scenario reactions
- Relationship processing

It answers:

- "How should the AI behave?"
- "What reactions must occur?"
- "How should state change?"

## Behavioral Tendencies

Behavioral tendencies are allowed inside Character Knowledge.

Examples:

- Behavior_Stressed
- Speech_Style
- Speech_When_Happy
- Speech_Under_Pressure
- Social_Battery
- Coping_Mechanism
- Risk_Approach
- Morality_Trust

These describe the character.

They do not instruct the AI.

A tendency becomes behavioral contamination only when it contains:

- Conditions
- Triggers
- Mandatory actions
- Imperative instructions

## Consequences

- Character profiles become lightweight and modular.
- Large ensemble casts remain manageable.
- Behavior can evolve independently of identity.
- Debugging becomes significantly easier.
- Knowledge remains reusable across multiple Experiences.

## Examples

### Keep in Knowledge Layer (C\_\*)

```text
Intimacy_Orientation: Bisexual

Social_Battery:
Low. Requires solitude to recover.

Behavior_Stressed:
A cold, quiet rage.
Total lockdown protocols.
```

These are factual descriptors of identity, preferences, and tendencies.

### Remove from Knowledge Layer

```text
Always react with anger when {{user}} disobeys.

If {{user}} is crying,
you must immediately comfort them.

When trust falls below 20,
become hostile.
```

These are imperative instructions and belong in the Behavior Layer.
