# ADR 003: Runtime Authority

## Context

Documentation, templates, workflows, architectural diagrams, and generated code are theoretical representations of the system.

JanitorAI runtime behavior is the actual execution environment.

Historically, multiple architectural decisions were based on assumptions regarding:

- Script execution order
- Shared state persistence
- Context variable propagation
- Lorebook activation behavior
- Token budgeting

Several of these assumptions proved incorrect when validated in live JanitorAI sessions.

## Decision

Observed JanitorAI runtime behavior has ultimate authority.

Runtime observations supersede:

- Documentation
- ADRs
- Templates
- Generation Rules
- Agent Workflows
- Architectural Assumptions

No architectural proposal is considered accepted until validated through live testing.

## Consequences

- Every migration requires validation.
- Every optimization requires validation.
- Every new Engine requires validation.
- Every runtime dependency must be empirically verified.

Architectural decisions must adapt to reality.

Reality never adapts to architecture.

## Validation Rule

Any design lacking runtime validation is considered a hypothesis.

Only validated behavior becomes architecture.

## Examples

### Invalid

Assuming that:

- context.variables behaves as a real-time event bus
- scripts share mutable state
- lorebooks execute in predictable order

without testing.

### Valid

Creating a test scenario.

Observing actual runtime behavior.

Updating documentation to match the observed results.
