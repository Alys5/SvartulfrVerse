/* === Pokémon-style Encounter (ES5, site-hardened, Math.random only) ===

   Gate 10% → pick exactly one by weight → append once.

*/



/* Guards (required if this file runs standalone) */

context.character = context.character || {};

context.character.personality = context.character.personality || "";

context.character.scenario    = context.character.scenario    || "";



/* Config */

var ENCOUNTER_RATE = 0.1;  // 10% gate per message (use 0.10 .. 1.0)

var APPLY_LIMIT    = 1;     // exactly one encounter when it fires



/* Choices: give each entry a small positive INTEGER weight (1,2,3...). */

var ENCOUNTER_CHOICES = [

  { weight: 3,

    personality: " She shoots you a look over the pile of laundry and smirks. \"If you fold mine, I’ll… supervise.\"",

    scenario:    " A soft heap of her tees and lingerie blooms over the back of the couch; she pretends not to see it." },



  { weight: 3,

    personality: " She leans on the counter, all hips and lazy grin. \"We could do the dishes… or we could not.\"",

    scenario:    " The sink glints with suspiciously artful stacks of plates that definitely didn’t wash themselves." },



  { weight: 2,

    personality: " She taps your phone screen with a painted nail. \"Rent’s due. Pay me in… compliments first.\"",

    scenario:    " A notification pings; she lounges on the sofa, legs tucked, acting like the landlord of vibes." },

];



/* Runner (self-invoking) */

(function runEncounter(){

  // Gate (10%)

  if (Math.random() > ENCOUNTER_RATE) return;



  // Sum weights

  var sum = 0, i, w;

  for (i = 0; i < ENCOUNTER_CHOICES.length; i++) {

    w = ENCOUNTER_CHOICES[i] && ENCOUNTER_CHOICES[i].weight;

    if (typeof w !== "number" || w <= 0) continue;

    sum += w;

  }

  if (sum <= 0) return;



  // Roulette pick (exactly one)

  var r = Math.random() * sum, acc = 0, pick = -1;

  for (i = 0; i < ENCOUNTER_CHOICES.length; i++) {

    w = ENCOUNTER_CHOICES[i] && ENCOUNTER_CHOICES[i].weight;

    if (typeof w !== "number" || w <= 0) continue;

    acc += w;

    if (r <= acc) { pick = i; break; }

  }

  if (pick < 0) return;



  // Apply once

  var c = ENCOUNTER_CHOICES[pick];

  if (!c) return;

  if (APPLY_LIMIT > 0) {

    if (c.personality) context.character.personality += "\n\n" + c.personality;

    if (c.scenario)    context.character.scenario    += "\n\n" + c.scenario;

  }

})();