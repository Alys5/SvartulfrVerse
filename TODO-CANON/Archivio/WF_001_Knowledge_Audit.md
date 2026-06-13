---
description: Audits World and Character layers to ensure strict separation between Knowledge, Behavior, and Experience data. Detects behavioral contamination, state management, world leakage, and scenario-specific pollution.
auto_execution_mode: 3
---

# WF_001 — Knowledge Audit

## Purpose

Ensure complete separation between:

- Knowledge Layers
- Behavior Layers
- Experience Layers

---

## Inputs

Target:

- W\_\*.js
- W\_\*.md
- C\_\*.js

---

## Process

### 1. Runtime Logic Audit

Flag:

- IF/THEN instructions
- State transitions
- Decision trees
- Relationship calculations

---

### 2. State Contamination Audit

Flag:

- affection variables
- trust variables
- arousal variables
- progression systems

---

### 3. Behavior Audit

Allow:

- Traits
- Tendencies
- Preferences

Reject:

- Runtime reactions
- Conditional responses

---

### 4. Experience Contamination Audit

Verify:

W*\* contains no Ex*\* information.

C*\* contains no Ex*\* information.

Characters must not contain scenario-specific roles.

---

### 5. World Leakage Audit

Verify:

No AU-specific information appears outside its designated world partition.

---

## Validation

Character remains consistent.

Behavior remains controlled by runtime systems.

---

## Outputs

Audit Report

Required Corrections

Risk Assessment
