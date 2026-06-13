---
description: Creates new World Layer components, including lore, taxonomy placement, routing, and Visual DNA. Ensures world consistency, character integration, and architectural compliance.
auto_execution_mode: 3
---

# WF_003 — New World

## Purpose

Create a new World Layer.

---

## Inputs

- World Concept
- Genre
- Participating Characters

---

## Process

### 1. Taxonomy Placement

Determine:

- Macro Category
- Parent World
- Overlay Status

Examples:

Contemporary
└── UrbanFantasy

Fantasy
├── HighFantasy
└── NorseMythic

---

### 2. Visual DNA Creation

Create:

Visual_DNA.md

Define:

- Palette
- Lighting
- Architecture
- Mood
- Camera Language

---

### 3. World Lore Creation

Generate:

W\_<World>.js

W\_<World>.md

---

### 4. Character Propagation

Update affected C\_\* files.

---

### 5. Engine Registration

Register routing within En_Core.

---

## Validation

- No behavioral contamination
- No experience contamination
- Visual DNA complete

---

## Outputs

W\_<World>.js

W\_<World>.md

Visual_DNA.md
