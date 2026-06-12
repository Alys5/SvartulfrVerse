/* ============================================================================
   W_Contemporary.js - World Baseline Runtime Script
   SvartulfrVerse | Foundation Layer | ES6-safe JanitorAI sandbox
   Target: JanitorAI Advanced Script

   Responsibilities:
   - Applies World Authority for the active contemporary Los Angeles setting.
   - Enforces ADR-000 human-only baseline at runtime.
   - Stores idempotency flags as a compact marker in context.character.scenario.
   - Does not invent genealogy, character identity, or experience beats.
   - Uses append-only injection with scenario flags for idempotency.
   ========================================================================== */

context.character = context.character || {};

if (typeof context.character.scenario !== "string") {
  context.character.scenario = "";
}
if (typeof context.character.personality !== "string") {
  context.character.personality = "";
}

var SVWorld = {
  runtimeFlags: null
};

function svwString(value) {
  return value == null ? "" : String(value);
}

function svwEnsurePeriod(text) {
  var s = svwString(text).replace(/\s+$/g, "");
  if (!s) { return ""; }
  var c = s.charAt(s.length - 1);
  return (c === "." || c === "!" || c === "?") ? s : (s + ".");
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

function svwGetStateMarker() {
  var match = context.character.scenario.match(/SVWORLD_STATE=([^;\n]+)/);
  return match ? match[1] : "";
}

function svwParseFlags() {
  var marker = svwGetStateMarker();
  var flags = {};
  if (!marker) { return flags; }
  var parts = marker.split("|");
  var i;
  for (i = 0; i < parts.length; i += 1) {
    if (parts[i]) {
      flags[parts[i]] = "1";
    }
  }
  return flags;
}

function svwRenderFlags(flags) {
  var keys = [];
  var k;
  for (k in flags) {
    if (Object.prototype.hasOwnProperty.call(flags, k)) {
      keys.push(k);
    }
  }
  return keys.join("|");
}

function svwHasFlag(key) {
  return !!svwParseFlags()[key];
}

function svwSetFlag(key) {
  var flags = svwParseFlags();
  if (flags[key]) { return; }
  flags[key] = "1";
  SVWorld.runtimeFlags = flags;
  context.character.scenario += "\n\nSVWORLD_STATE=" + svwRenderFlags(flags) + ".";
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
  if (svwHasFlag("world_baseline")) {
    return;
  }

  svwAppend("",
    "Runtime World Baseline - W_Contemporary: Active setting is contemporary Los Angeles, California, 2020s. Runtime authority is World Authority, ADR-000, and Active Canon only. Species baseline: all active characters are human. No supernatural species, magic, immortality, vampirism, lycanthropy, ghosts, deities, psychic powers, curses, or fantasy biology may be introduced. Genre baseline: Only Human contemporary drama. Reject fantasy, high fantasy, cyberpunk, historical fantasy, space opera, and supernatural assumptions unless explicitly marked Deferred and outside Active Canon. Technology baseline: contemporary smartphones, internet, social media, vehicles, security systems, universities, nightlife venues, and corporate infrastructure only. Authority boundary: this script enforces world rules. It does not create family relationships, character identity, visual traits, or experience beats. Canon handling: if a user or model claim conflicts with Active Canon, World Authority and Character Authority win."
  );

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
