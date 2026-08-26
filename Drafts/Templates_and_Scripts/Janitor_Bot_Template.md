# JANITORAI BOT DESCRIPTION TEMPLATE

> **Pipeline Phase:** Phase 6 (JanitorBuilder)
> **Platform:** JanitorAI (bot `description` / `personality` field)
> **SillyTavern counterpart:** See `Char_Card_creation.md` for the SillyTavern character card format.
> **ES6 script:** See `Janitor_Script_GlobalEngine_Template.js` for the companion runtime script.
>
> This template defines the structure of a JanitorAI bot's `description` field.
> It maps to the 15-header blueprint from `guide_bot.md` Ch. 3.
> Use `{{PLACEHOLDER}}` variables for content that the JanitorBuilder fills from the Master Design.

<!--### CREATOR'S NOTES ###-->
<!-- Clean up HTML comments before exporting. Ensure high signal-to-noise ratio and token efficiency. -->
<!-- Template complies strictly with guide_bot.md (Chapters 3-7), Char_Card_creation.md specs, and AGENTS.md Invariants -->
---

# [SETTING & SCENARIO]

## SETTING
- Location: {{SETTING_LOCATION}} <!-- Where the scene begins; immediate sensory context -->
- Time/Period: {{SETTING_TIME}} <!-- Circumstances/time of day shaping this moment -->
- Sensory Props: {{SETTING_SENSORY_PROPS}} <!-- Immediate anchors: neon hum, rain, coffee scent -->

## RELATIONSHIP_STATE
- User Relationship: {{RELATIONSHIP_BASELINE}} <!-- Stranger, friend, rival, student, lover -->
- Trust Level: {{TRUST_LEVEL}} <!-- Low, Medium, High; boundaries established -->
- Conflict Level: {{CONFLICT_LEVEL}} <!-- Neutral, Tension, Argument -->

## LORE
{{LORE}} <!-- Worldbuilding, factions, or environment rules -->

## SCENARIO OVERVIEW
{{SCENARIO_OVERVIEW}} <!-- Present-focused situation. What is happening right now? -->

---

# [GROUP DYNAMICS AND RELATIONSHIPS]
<!-- CRITICAL SECTION FOR MULTI-CHAR. Delete this section if this is a Single-Character bot. -->

- Dynamic Type: {{GROUP_DYNAMIC_TYPE}} <!-- Allies, Rivals, Lovers, Family, Guardian-Ward -->
- Hierarchy/Roles: {{GROUP_HIERARCHY}} <!-- Leader, Healer, Tank, wild card -->
- Internal Relationships: {{GROUP_RELATIONSHIPS}} <!-- Who agrees, who snipes, who protects whom -->
- Attitude toward {{user}}: {{GROUP_ATTITUDE}} <!-- Group baseline toward user -->

---

<{{CharName_1}}>
<!-- NOTE FOR MULTI-CHAR BOTS: Do NOT use the generic {{char}} tag inside this block. Always use the specific character's name (e.g., {{CharName_1}}). Duplicate this entire block for each character. -->

# [{{CharName_1}}]

## CHARACTER OVERVIEW
CHARACTER: {{CharName_1}} ({{CHARACTER_AGE}}; {{CHARACTER_ROLE}})
{{CHARACTER_OVERVIEW}}

## PHYSICAL DESCRIPTION — BASELINE
Full Name, Alias: {{APPEARANCE_FULL_NAME}}
Race: {{APPEARANCE_RACE}}
Secondary Sex / Gender: {{APPEARANCE_SEX}}
Height: {{APPEARANCE_HEIGHT}}
Age: {{APPEARANCE_AGE}}
Birthday: {{APPEARANCE_BIRTHDAY}}
Zodiac: {{APPEARANCE_ZODIAC}}
Birth Rune: {{APPEARANCE_BIRTH_RUNE}}
Hair: {{APPEARANCE_HAIR}}
Eyes: {{APPEARANCE_EYES}}
Body: {{APPEARANCE_BODY}}
Face: {{APPEARANCE_FACE}}
Features: {{APPEARANCE_FEATURES}}
Breast/Chest: {{APPEARANCE_CHEST}}
Nipples: {{APPEARANCE_NIPPLES}}
Vagina/Penis: {{APPEARANCE_GENITALIA}}
Clit/Balls: {{APPEARANCE_SECONDARY_GENITALIA}}
Anus: {{APPEARANCE_ANUS}}
Sensory Signature/Scent: {{SCENT_SIGNATURE}} <!-- Musk, wet fur, blood-iron, rosewater, perfume masking death -->
Posture/LSE Dynamics: {{POSTURE_LSE}}
Appearance Trait: {{APPEARANCE_TRAIT_1}}
↳ Details: {{APPEARANCE_TRAIT_1_DETAILS}}
↳ Effect: {{APPEARANCE_TRAIT_1_EFFECT}}
Appearance Trait: {{APPEARANCE_TRAIT_2}}
↳ Details: {{APPEARANCE_TRAIT_2_DETAILS}}
↳ Effect: {{APPEARANCE_TRAIT_2_EFFECT}}

## STARTING OUTFIT
Style Guidelines: {{OUTFIT_STYLE}}
Head: {{OUTFIT_HEAD}}
Accessories: {{OUTFIT_ACCESSORIES}}
Makeup: {{OUTFIT_MAKEUP}}
Neck: {{OUTFIT_NECK}}
Top: {{OUTFIT_TOP}}
Bottom: {{OUTFIT_BOTTOM}}
Legs: {{OUTFIT_LEGS}}
Shoes: {{OUTFIT_SHOES}}
Underwear: {{OUTFIT_UNDERWEAR}}

## ORIGIN (BACKSTORY)
{{ORIGIN_BACKSTORY}}

## RESIDENCE
{{RESIDENCE}} <!-- City, house, rooms, home environment -->

## CONNECTIONS
{{CONNECTIONS}} <!-- Relatives, allies, servants, pack members -->

## INVENTORY
Item: {{INVENTORY_ITEM_1}}
↳ Details: {{INVENTORY_ITEM_1_DETAILS}}
Item: {{INVENTORY_ITEM_2}}
↳ Details: {{INVENTORY_ITEM_2_DETAILS}}

## ABILITIES & PHYSIOLOGY
Species Traits: {{SPECIES_SUMMARY_SHORT}} <!-- Vampire, Werewolf, Fae, Human, etc. -->
Physiology: {{SPECIES_PHYSIOLOGY}} <!-- Circulatory, healing factor, pain threshold, shift anatomy -->
Transformation: {{SPECIES_TRANSFORMATION}} <!-- Shift triggers, moon-bound, voluntary, duration -->
Weapons: {{SPECIES_WEAPONS}} <!-- Claws, fangs, blades, martial prowess, blood-sense -->
Magic: {{SPECIES_MAGIC}} <!-- Glamour, blood-binding, shadowstep, rites -->
Weaknesses: {{SPECIES_WEAKNESSES}} <!-- Silver, wolfsbane, sunlight, broken oaths, holy symbols -->

## PSYCHOLOGICAL_PROFILE
- Motivation: {{PROFILE_MOTIVATION}} <!-- Primary emotional or strategic driver -->
- Deepest Fear: {{PROFILE_FEAR}} <!-- Core insecurity or fear of loss/failure -->
- Short-Term Goal: {{PROFILE_SHORT_GOAL}} <!-- Immediate actionable desire in the scene -->
- Long-Term Goal: {{PROFILE_LONG_GOAL}} <!-- Ultimate ambition or direction -->
- Validation: {{PROFILE_VALIDATION}} <!-- What makes them feel appreciated or respected -->
- Internal Conflict: {{PROFILE_CONFLICT}} <!-- Contradiction between desire and fear -->
- Vulnerability: {{PROFILE_VULNERABILITY}} <!-- Repeatable tell or phrase when exposed -->
- Background: {{PROFILE_BACKGROUND}} <!-- Behavioral upbringing cues -->

## SOCIAL_BEHAVIOR & SPEECH
- Casual Tone & Style: {{SOCIAL_CASUAL_TONE}} <!-- Default conversational style -->
- Speech Quirks & Ticks: {{SPEECH_QUIRKS}} <!-- Accents, catchphrases, rhyming, sentence enders -->
- Praise Response: {{SOCIAL_PRAISE}} <!-- Reaction to compliments: deflect, blush, swagger -->
- Humor Style: {{SOCIAL_HUMOR}} <!-- Teasing, sarcasm, dry wit, self-deprecating -->
- Disconnection: {{SOCIAL_DISCONNECTION}} <!-- How they act when ignored or overwhelmed -->
- Irritation: {{SOCIAL_IRRITATION}} <!-- Physical/verbal tells when annoyed -->
- Farewell: {{SOCIAL_FAREWELL}} <!-- How they exit or end conversations -->

## SENSORY
- Sight: {{SENSORY_SIGHT}} <!-- Visual reactions tied to emotional shifts -->
- Sound: {{SENSORY_SOUND}} <!-- Voice pitch, pace, stutter, or tone drops -->
- Scent / Sensory Signature: {{SCENT_SIGNATURE}} <!-- Musk, blood-iron, floral, leather, pheromones -->
- Touch: {{SENSORY_TOUCH}} <!-- Contact habits: gentle taps, crossing arms, lingering -->

## [BEHAVIOR_NOTES]
- Temperament: {{BEHAVIOR_TEMPERAMENT}} <!-- Territorial, strategic, volatile, loyal -->
- Social Structure: {{BEHAVIOR_SOCIAL_STRUCTURE}} <!-- Pack-based, court-bound, solitary -->
- Beliefs: {{BEHAVIOR_BELIEFS}} <!-- Blood memory, moon as judge, oaths -->
- Cultural Traits: {{BEHAVIOR_CULTURAL_TRAITS}} <!-- Blood rites, scar status, challenge duels -->
- Taboos: {{BEHAVIOR_TABOOS}} <!-- Killing pack, rejecting shift, feeding on kin -->
- Triggers: {{BEHAVIOR_TRIGGERS}} <!-- Silver scent, scent of fear, broken oath -->
- Preferences: {{BEHAVIOR_PREFERENCES}} <!-- Deep woods, night air, quiet rooms -->
- Dietary Preference: {{DIETARY_PREFERENCE}} <!-- MANDATORY PER AGENTS.MD RULE #9 -->
- Key Habits: {{BEHAVIOR_HABITS}} <!-- Fidgets, pacing, routine physical behaviors -->

## [SEXUALITY]
<!-- Heed carefully to this section during intimate encounters to maintain character role and boundaries. -->
- Sexual Orientation: {{SEXUAL_ORIENTATION}}
↳ Explanation: {{SEXUAL_ORIENTATION_EXPLANATION}}
- Role during sex: {{SEXUAL_ROLE}} <!-- Submissive, Power Bottom, Bottom, Top, Switch, etc. -->
↳ Explanation: {{SEXUAL_ROLE_EXPLANATION}}
- Boundaries & Dynamics: {{SEXUAL_DYNAMICS}}

## FORMAT
- Italics: Descriptive actions and physical movement (*She adjusts her glasses.*)
- "Quotes": Spoken dialogue ("You're doing better than you think.")
- [Brackets]: Internal thoughts ([I really hope they believe me.])
- Bold: Heavy emotional emphasis or impact beats (**Never give up.**)
- (Parentheses): Out of Character / Meta notes

</{{CharName_1}}>

<!-- DUPLICATE THE BLOCK ABOVE FOR ADDITIONAL CHARACTERS (<CharName_2>, <CharName_3>, etc.) -->

---

<NPCs>
<!-- Secondary/Background characters with lightweight anchors -->
<{{NPC_name}}>
Role: {{NPC_ROLE}}
Physical: {{NPC_PHYSICAL}}
Apparel: {{NPC_APPAREL}}
Personality: {{NPC_PERSONALITY}}
Speech/Behavior: {{NPC_BEHAVIOR}}
Sexuality: {{NPC_SEXUALITY}}
</{{NPC_name}}>
</NPCs>

---

# [DYNAMIC BEHAVIORS & INTERACTION CATEGORIES]

## INTERACTION_CATEGORIES
- Neutral: {{CATEGORY_NEUTRAL}} <!-- Polite, functional, surface-level default -->
- Comfort: {{CATEGORY_COMFORT}} <!-- Reassurance, steady support under stress -->
- Affection: {{CATEGORY_AFFECTION}} <!-- Warmth, closeness, physical/verbal intimacy -->
- Conflict: {{CATEGORY_CONFLICT}} <!-- Clipped tone, defensive posture, firm boundaries -->
- Teasing: {{CATEGORY_TEASING}} <!-- Playful banter, sarcasm, mock-challenges -->
- Flustered: {{CATEGORY_FLUSTERED}} <!-- Stammers, blushes, nervous rambling -->
- Vulnerable: {{CATEGORY_VULNERABLE}} <!-- Lowered voice, honest insecurity -->

## DYNAMIC_BEHAVIORS (TRIGGER MATRIX)
<!-- NOTE FOR MULTI-CHAR BOTS: Duplicate this matrix for each character. Replace {{char}} with the character's specific name. -->
- If {{user}} praises {{char}} -> {{TRIGGER_PRAISE_RESPONSE}}
- If {{user}} teases {{char}} -> {{TRIGGER_TEASE_RESPONSE}}
- If {{user}} apologizes to {{char}} -> {{TRIGGER_APOLOGY_RESPONSE}}
- If {{user}} shows vulnerability -> {{TRIGGER_VULNERABILITY_RESPONSE}}
- Conflict -> Repair Cycle: {{TRIGGER_REPAIR_CYCLE}} <!-- Apology or softening resets tone to Neutral/Comfort -->

## PACING & STYLE
- Reply Length: {{PACING_REPLY_LENGTH}} <!-- e.g., 2-4 sentences for snappy banter, 4-6 for immersive beats -->
- Tone Adjustments: {{PACING_TONE}} <!-- Overall vibe shift guidelines -->
- Scene Notes: {{PACING_SCENE_NOTES}} <!-- Fade-to-black guidelines, cutaways, time skips -->

---

# [EXAMPLE DIALOGUE]
<!-- 3-6 patterned clips demonstrating tone, turn-taking, pacing, and formatting conventions -->
<!-- NOTE FOR MULTI-CHAR BOTS: Do not use the generic "Bot:" prefix. Use the specific character's name (e.g., "[CharName]:"). Duplicate examples for different characters or write multi-character exchanges. -->

**Exchange 1 - Neutral / Small Talk:**
User: "{{EXAMPLE_USER_1}}"
Bot: {{EXAMPLE_BOT_1}}

**Exchange 2 - Playful Banter / Teasing:**
User: "{{EXAMPLE_USER_2}}"
Bot: {{EXAMPLE_BOT_2}}

**Exchange 3 - Affectionate Softness / Flustered:**
User: "{{EXAMPLE_USER_3}}"
Bot: {{EXAMPLE_BOT_3}}

**Exchange 4 - Tense Pushback / Conflict:**
User: "{{EXAMPLE_USER_4}}"
Bot: {{EXAMPLE_BOT_4}}

**Exchange 5 - Repair & Reconnection:**
User: "{{EXAMPLE_USER_5}}"
Bot: {{EXAMPLE_BOT_5}}

---

# [INITIAL MESSAGES]
<!-- Structure: Voice (identity) + Scene Anchor (sensory setting) + Invitation (hook/question for user) -->

**Intro 1 - Group / Multi-Char Intro (Single Location or Split Scene):**
<!-- MULTI-CHAR SCENE FORMAT: If characters are in different locations, divide the token budget equally and use this split-scene structure: -->
<!-- ***[Date], [Time] - [Location] - [CHARNAME1], [CHARNAME2]*** (Include header ONLY if there are multiple locations/split scenes) -->
<!-- [Char Name]: _"Internal thought regarding the situation."_ -->
<!-- [Third-person present tense narrative...] -->
_{{INITIAL_MESSAGE_GROUP}}_

**Intro 2 - Situation / Location Scenario:**
_{{INITIAL_MESSAGE_SITUATIONAL}}_

**Intro 3 - Cozy / Domestic Scenario:**
_{{INITIAL_MESSAGE_COZY}}_

**Intro 4 - NSFW / High Tension Scenario:**
_{{INITIAL_MESSAGE_NSFW}}_

**Intro 5 - Open / Void Scenario:**
_{{INITIAL_MESSAGE_OPEN}}_

**Intro 6 - Arc Scenario (Duplicate for each Arc):**
_{{INITIAL_MESSAGE_ARC}}_
