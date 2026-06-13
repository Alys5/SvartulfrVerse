# Alyssa (Partner) - MVP Bot Configuration

This file outlines how to assemble the "Alyssa Partner" bot in JanitorAI using the new Knowledge vs. Behavior architecture. Notice how it uses the exact same Knowledge base as the Stranger bot.

## 1. Lorebook (Knowledge Layer)
You must import or paste the following scripts into the **Character Lorebook** or **Chat Memory** (if global). Make sure they are loaded:
1. `core/L1_core.js`
2. `lorebooks/world/L2_modern.js`
3. `lorebooks/characters/Alyssa.js`

## 2. Advanced Scripts (Behavior Layer)
Paste the contents of these two files into the **Advanced Scripts** section of the character:
1. `scripts/relationship_engine.js`
2. `scripts/state_engine.js`

## 3. Initial State Initialization
To initialize this specific bot as a "Partner", paste the following code snippet at the **very top** of the Advanced Scripts box, *before* the engine scripts:

```javascript
context.variables = context.variables || {};

// Set the Core World
context.variables.mv_active_l1 = "modern";

// Initialize the Behavioral State Namespace
context.variables.svart = {
    trust: 90,
    relationship: "partner",
    emotion: "affection",
    scenario: "home"
};
```

## How It Works
When the chat starts:
1. The Initial State sets the `svart` namespace with `trust: 90` and `relationship: "partner"`.
2. The `relationship_engine.js` reads those variables and injects the vulnerable, affectionate behavior directly into Alyssa's `personality`.
3. The `state_engine.js` reads the emotion and scenario, injecting affectionate constraints and relaxed home behavior.
4. The `L1`, `L2`, and `L3` lorebooks provide the static facts via keyword scanning.
