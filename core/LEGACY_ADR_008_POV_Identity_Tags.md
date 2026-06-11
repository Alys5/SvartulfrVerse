# ADR 008: POV Identity Tags

Status: Deferred

Target Milestone:
Post Los Angeles Validation

## Context

The current POV Override implementation inside `En_Core.js` relies on string parsing to detect character identity blocks.

Example:

```text
[Name: Alyssa]
```

The firewall intercepts these strings and determines whether the corresponding character should be excluded from the NPC Cast.

While functional, this introduces a structural fragility.

The system assumes:

- The Name block exists.
- The Name block remains unchanged.
- The Name block appears early enough.
- The parsing logic continues to match future formatting.

Any change may cause the interceptor to fail.

## Current Implementation

Current logic relies on parsing generated text.

Example:

```text
[Name: Alyssa]
```

The Engine extracts identity information from the payload itself.

This creates an implicit dependency between:

- Character formatting
- Engine filtering

## Proposed Future Decision

Replace string parsing with explicit metadata.

Instead of:

```text
[Name: Alyssa]
```

Character entries will contain:

```javascript
entry.character = "C_Alyssa";
```

Example:

```javascript
{
    world: ["contemporary"],
    character: "C_Alyssa",
    content: "[Name: Alyssa] ..."
}
```

The Engine will evaluate:

```javascript
if (entry.character === context.variables.mv_pov_override) {
  return;
}
```

## Benefits

### Robustness

Removes dependence on formatting.

### Scalability

Allows additional metadata filtering.

Examples:

```javascript
entry.character;
entry.world;
entry.tags;
entry.priority;
entry.category;
```

### Maintainability

Changes to text formatting no longer affect runtime logic.

### Performance

Reduces parsing complexity.

## Consequences

### Positive

- More reliable filtering
- Cleaner architecture
- Better future scalability
- Explicit metadata contracts

### Negative

- Requires refactoring all C\_\* files
- Requires updating En_Core.js
- Requires migration testing

## Execution Priority

This refactor is intentionally deferred.

The current implementation remains sufficient for:

- Los Angeles testing
- Initial validation
- Architecture stabilization

Migration should only occur after:

- Los Angeles 50-message validation
- Runtime verification
- Architecture freeze

## Technical Debt

This ADR documents known technical debt.

The current system is acceptable.

The metadata-based approach is considered the future target architecture.
