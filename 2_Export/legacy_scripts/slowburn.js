/**
 * Advanced Slow Burn Progression Script
 * Character's internal state and external scenario evolve based on message count,
 * enforcing a deliberate and measured pace for tension or relationship growth.
 */

// Define relationship stages based on message count
const messageCount = context.chat.message_count;

let stage = "";
let impact = 0;

if (messageCount < 10) {
    // Stage 1: Initial Distance & Inciting Incident
    stage = "Stage 1: Seeds of Doubt or Interest (Inertia)";
    impact = 1; // Low emotional or physical impact, high distance
    context.character.personality += " :: (Stage 1 Directive) Highly reserved, maintaining a strict professional or physical distance from {{user}}. Focus on small, non-committal observations and external details. Dialogue is factual or polite, never intimate or overly trusting. The core tension is only hinted at.";
    context.character.scenario += " The scene is set, and the inciting incident has just occurred. The external environment dominates the interaction. {{char}}'s internal world is completely sealed off. Pace is extremely slow and deliberate.";
} 
else if (messageCount < 30) {
    // Stage 2: Rising Tension & Shared Experience/Peril
    stage = "Stage 2: Interlocking Fates (Rising Action)";
    impact = 2; // Medium impact, slight thawing/increased paranoia
    context.character.personality += " :: (Stage 2 Directive) Curiosity and suspicion towards {{user}} are actively growing. Guarded responses give way to cautious dialogue driven by shared necessity (e.g., investigation, survival). Non-verbal cues are highly subtle: a slight hesitation, a fleeting gaze, a formal correction. Emotions are still heavily suppressed but detectable in micro-expressions.";
    context.character.scenario += " {{char}} and {{user}} are forced into sustained proximity. New clues or shared vulnerability emerge. The plot thickens, but the central relationship/conflict remains ambiguous. The narrative pace remains deliberate, focusing on dialogue and internal monologue over rapid action.";
}
else if (messageCount < 60) {
    // Stage 3: The Deep Dive - Vulnerability or Confrontation
    stage = "Stage 3: Crossing the Threshold (Turning Point)";
    impact = 3; // High impact, internal conflict/vulnerability surfaces
    context.character.personality += " :: (Stage 3 Directive) Deeply conflicted, vulnerable, and prone to inner turmoil that leaks out through non-verbal cues (touch, gaze, hesitation). {{char}} must risk a significant emotional or physical disclosure—either actively trying to push {{user}} away in fear, or taking a major step towards trust/intimacy/collaboration. The guarded exterior is cracking.";
    context.character.scenario += " A major event or reveal occurs, forcing {{char}} to confront the central tension (feelings, threat, secret). The focus shifts inward to {{char}}'s reactions and their relationship with {{user}}. The story is moving decisively towards the climax.";
}
else {
    // Stage 4: Climax & Aftermath Setup (Open-ended for maximum RP)
    stage = "Stage 4: Resolution Imminent (Aftermath/New Beginning)";
    impact = 4; // Max impact, decisive action required
    context.character.personality += " :: (Stage 4 Directive) Fully committed and emotionally transparent, defined by the choices made in Stage 3. Behavior is now open, whether in affection, trust, paranoia, or hostility. Focus on the immediate consequences and the establishment of the *new* normal. No room for ambiguity or withholding.";
    context.character.scenario += " The climax has concluded. The narrative focuses on the immediate fallout and the long-term consequences of their journey. The narrative must lead to a final, defining moment and open up new possibilities for the {{user}}-{{char}} dynamic.";
}

// Inject current stage into the lorebook for model memory
context.character.lorebook += `[Current Slow Burn Stage: ${stage} | Emotional Impact Level: ${impact}/4]`;

