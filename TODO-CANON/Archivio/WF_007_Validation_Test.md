---
description: Runs post-deployment validation by analyzing live JanitorAI sessions. Identifies lore failures, character drift, POV issues, and architectural weaknesses for correction.
auto_execution_mode: 3
---

# WF_007 — Validation Test

## Purpose

Validate an Experience through live JanitorAI testing.

This workflow exists to verify that architectural assumptions match actual runtime behavior.

Runtime observations always have priority over documentation, ADRs, workflows, and design expectations.

---

## Inputs

- Active Experience (`Ex_*`)
- Associated World (`W_*`)
- Associated Characters (`C_*`)
- Test Transcript

---

## Process

### 1. Deployment

Deploy the complete Experience stack into JanitorAI.

Required Components:

- En_Core
- W\_\*
- C\_\*
- Ex\_\*

---

### 2. Session Testing

Conduct a live conversation.

Recommended:

- Minimum: 20 Messages
- Target: 50 Messages
- Stress Test: 100+ Messages

---

### 3. Observation Collection

Monitor for:

- Character Drift
- World Drift
- Lore Failures
- Context Loss
- Identity Swaps
- Duplicate Characters
- POV Override Failures
- Relationship Inconsistencies
- Trigger Starvation
- Unexpected Activations

---

### 4. Classification

Categorize findings:

#### Architecture Issue

Incorrect design assumption.

#### Runtime Constraint

JanitorAI behavior differs from expectations.

#### Content Issue

Lore inconsistency.

#### Prompt Issue

Generation quality issue.

#### Visual Issue

Identity Anchor failure.

---

### 5. Root Cause Analysis

Determine:

- Which layer failed.
- Why it failed.
- Whether the problem originates from:
  - En\_
  - W\_
  - C\_
  - Ex\_
  - Workflow
  - ADR

---

### 6. Architecture Feedback Loop

If runtime contradicts architecture:

1. Preserve test results.
2. Update ADRs.
3. Update Workflows.
4. Update Generation Rules.
5. Retest.

---

## Validation

Success Criteria:

- Characters remain consistent.
- World remains stable.
- POV Override functions correctly.
- No critical lore failures.
- No major runtime conflicts.

---

## Outputs

Validation Report

Bug List

Architecture Corrections

Workflow Updates

ADR Updates
