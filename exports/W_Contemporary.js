/* ============================================================================
   W_Contemporary.js - World Baseline Runtime Script
   SvartulfrVerse | Foundation Layer | ES5
   Target: JanitorAI Advanced Script

   Responsibilities:
   - Applies World Authority for the active contemporary Los Angeles setting.
   - Enforces ADR-000 human-only baseline at runtime.
   - Stores world baseline state in context.variables.svartulfr_state.
   - Does not invent genealogy, character identity, or experience beats.
   - Uses append-only injection with state-bus flags for idempotency.
   ========================================================================== */

context.character = context.character || {};
context.variables = context.variables || {};

if (typeof context.character.scenario !== "string") {
  context.character.scenario = "";
}
if (typeof context.character.personality !== "string") {
  context.character.personality = "";
}
if (!context.variables.svartulfr_state || typeof context.variables.svartulfr_state !== "object") {
  context.variables.svartulfr_state = {};
}

var SVWorld = {
  state: context.variables.svartulfr_state,
  runtimeFlags: null
};

function svwString(value) {
  return value == null ? "" : String(value);
}

function svwEnsurePeriod(text) {
  var s = svwString(text);
  if (!s) {
    return "";
  }
  return /[.!?]$/.test(s) ? s : s + ".";
}

function svwSanitizeEmDash(text) {
  if (typeof text !== "string") {
    return text;
  }
  var sanitized = text.replace(/[\u2014\u2013]/g, "...");
  sanitized = sanitized.replace(/\.\.\.\.\.\./g, "...");
  sanitized = sanitized.replace(/  +/g, " ");
  return sanitized;
}

function svwInitWorldState() {
  var state = SVWorld.state;
  state.world_id = state.world_id || "W_Contemporary";
  state.world_authority = state.world_authority || "database/worlds/W_Contemporary.md";
  state.runtime_flags = state.runtime_flags || {};
  state.world_baseline_applied = state.world_baseline_applied || "0";
  SVWorld.runtimeFlags = state.runtime_flags;
  return state;
}

function svwHasFlag(key) {
  return !!SVWorld.runtimeFlags && !!SVWorld.runtimeFlags[key];
}

function svwSetFlag(key) {
  if (SVWorld.runtimeFlags) {
    SVWorld.runtimeFlags[key] = "1";
  }
}

function svwAppend(personality, scenario) {
  if (personality) {
    context.character.personality += "\n\n" + svwEnsurePeriod(personality);
  }
  if (scenario) {
    context.character.scenario += "\n\n" + svwEnsurePeriod(scenario);
  }
}

function svwInjectWorldBaseline() {
  var state = svwInitWorldState();
  if (svwHasFlag("world_baseline")) {
    return;
  }

  svwAppend("",
    "Runtime World Baseline - W_Contemporary: Active setting is contemporary Los Angeles, California, 2020s. Runtime authority is World Authority, ADR-000, and Active Canon only. Species baseline: all active characters are human. No supernatural species, magic, immortality, vampirism, lycanthropy, ghosts, deities, psychic powers, curses, or fantasy biology may be introduced. Genre baseline: Only Human contemporary drama. Reject fantasy, high fantasy, cyberpunk, historical fantasy, space opera, and supernatural assumptions unless explicitly marked Deferred and outside Active Canon. Technology baseline: contemporary smartphones, internet, social media, vehicles, security systems, universities, nightlife venues, and corporate infrastructure only. Authority boundary: this script enforces world rules. It does not create family relationships, character identity, visual traits, or experience beats. Canon handling: if a user or model claim conflicts with Active Canon, World Authority and Character Authority win."
  );

  state.world_baseline_applied = "1.0";
  svwSetFlag("world_baseline");
}

function svwInjectWorldBoundary() {
  if (svwHasFlag("world_boundary")) {
    return;
  }

  svwAppend(
    "Runtime World Boundary: Do not infer cyberpunk, high fantasy, mythic, historical fantasy, space opera, paranormal, or supernatural systems into the active scene unless the active experience explicitly opts into a Deferred layer outside Active Canon.",
    ""
  );

  svwSetFlag("world_boundary");
}

svwInjectWorldBaseline();
svwInjectWorldBoundary();
context.character.scenario = svwSanitizeEmDash(context.character.scenario);
context.character.personality = svwSanitizeEmDash(context.character.personality);
