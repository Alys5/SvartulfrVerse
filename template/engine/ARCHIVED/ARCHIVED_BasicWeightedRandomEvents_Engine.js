/*
 * Arcanox's Explanation
 * This is a coded script that chooses *1* of a selection of defined events when triggered
 * Ideal for situations where you only want *1* event of a specific type to occur
 * Optional weight to increase or decrease the likelihood of a specific event to occurr
 * Includes debug triggers to test RNG event likelihood
 * "arc.testRandom" - Used for checking the likelihood of events based off the chosen RNG weight
 * "[EVENT_NAME] + arc.force_event" - For checking if the LLM actually responds to a specific event properly
 *
 * [!IMPORTANT!]: Please be advised, the LLM may still choose to ignore these events.
 */

/* 
 * Events Script
 * Choses an event randomly based on the eventChance or from a debug trigger word 
 * 5 Total Entries
 * Note: RNG has higher priority than trigger words, only 1 event can trigger at a time
 */ 

const lastMessage = context.chat.last_message.toLowerCase();
const eventPrompts = ["wildfire", "tornado", "sandstorm", "blizzard", "tsunami"]; // Event names for RNG selection
const eventWeights = [0.5, 2, 1, 1.5, 0.2]; // Assign a weight to each by index; higher being more likely

// Define the tokens added to the scenario for each specific event
const eventDescriptions = {
  wildfire:  ", a wildfire begins across the horizon",    // Weight = 0.5
  tornado:   ", a tornado begins across the horizon",     // Weight = 2
  sandstorm: ", a sandstorm begins across the horizon",   // Weight = 1
  blizzard:  ", a blizzard begins across the horizon",    // Weight = 1.5
  tsunami:   ", a tsunami can be seen in the distance"    // Weight = 0.2
}; 

let eventChance = 0.1; // % chance for an event to occur each user message | 0.01 = 1% | 0.1 = 10% | 0.25 = 25% | 0.5 = 50% | 0.99 = 99%

if ((lastMessage.includes('arc.testrandom'))) { // Forces a RANDOM event to occur
  eventChance = 0.9999999; // Sets RNG chance to 99.99% chance to force a random event | DO NOT SET TO 1, the script will break
}

// Helper: picks one item from items[] according to weights[]
function weightedRandomChoice(items, weights) {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let r = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    if (r < weights[i]) {
      return items[i];
    }
    r -= weights[i];
  }
}

let chosenEvent = "n/a"; // 
if (Math.random() < eventChance) {
  chosenEvent = weightedRandomChoice(eventPrompts, eventWeights);
}
const triggeredEvent = eventPrompts.find(e => 
  lastMessage.includes(e) && lastMessage.includes('arc.force_event')
); // Looks for the first event mentioned, then activates that event if the secondary debug trigger words are entered

const eventToFire = triggeredEvent || chosenEvent; // Prioritizes events from trigger words over RNG events
if (eventToFire) {
  context.character.scenario += `\n${eventDescriptions[eventToFire]}\n`;
  console.log(`-:{Probability Script}:-`);
  console.log(`Random Event Chosen: ${chosenEvent}`);
  console.log(`Event Added: ${eventToFire}`); 
  console.log(`Code Added: ${eventDescriptions[eventToFire]}`)
  console.log(`-|:|:|:|:|:|:|:|:|:|:|:|-`)
}
