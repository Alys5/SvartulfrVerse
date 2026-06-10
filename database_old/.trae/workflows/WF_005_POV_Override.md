---
description: Safely assigns a canonical character to the Player POV Slot while preventing duplicate NPC appearances. Validates casting integrity and runtime exclusion behavior.
auto_execution_mode: 3
---

# WF_005 — POV Override

## Purpose

Temporarily assign a canonical character to the Player POV Slot.

---

## Inputs

- Experience
- Canonical Character

---

## Process

### 1. Designation

Assign:

mv_pov_override

---

### 2. Engine Enforcement

En_Core enforces exclusion.

Characters remain passive.

---

### 3. Runtime Validation

Verify:

Character no longer appears as NPC.

---

## Validation

Required:

- Canon character remains canonical.
- Character disappears from active cast.
- No duplication occurs.

---

## Outputs

Updated Experience

Validation Report
