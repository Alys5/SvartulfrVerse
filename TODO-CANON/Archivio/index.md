---
description: Central workflow dispatcher for the SvartúlfrVerse architecture. Routes tasks to the appropriate workflow and defines the operational execution order across the repository.
auto_execution_mode: 3
---

# SvartúlfrVerse Workflow Registry

## Purpose

This registry acts as the central dispatcher for all operational workflows.

Workflows define procedures.

ADRs define decisions.

Runtime observations define truth.

---

# Workflow Execution Order

Typical execution flow:

```text
New World
↓
New Character
↓
Visual Consistency
↓
New Experience
↓
POV Override
↓
Knowledge Audit
↓
Validation Test
```

---

# Dispatcher Map

| Task               | Workflow |
| ------------------ | -------- |
| Knowledge Audit    | WF_001   |
| New Character      | WF_002   |
| New World          | WF_003   |
| New Experience     | WF_004   |
| POV Override       | WF_005   |
| Visual Consistency | WF_006   |
| Validation Testing | WF_007   |
| Component Refactor | WF_008   |

---

# Workflow Categories

## Governance

- WF_001
- WF_007
- WF_008

## Content Creation

- WF_002
- WF_003
- WF_004

## Runtime Configuration

- WF_005

## Visual Systems

- WF_006

---

# Governance Hierarchy

```text
Runtime
↓
ADR
↓
Workflow
↓
Documentation
↓
Templates
```

---

# Runtime Rule

If a Workflow conflicts with observed runtime behavior:

1. Preserve the runtime observation.
2. Update the ADR.
3. Update the Workflow.
4. Retest.

Runtime always wins.
