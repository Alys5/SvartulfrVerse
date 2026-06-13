/*
ModernFantasy2024 context-coherence script.
Purpose: add anti-omniscience, user-agency, scene-presence, and conflict-mode coherence rules when triggered.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var MF_COHERENCE_CONFIG = {
    debug: false,
    marker: '[MF_CONTEXT_COHERENCE]',
    budget: 1000,
    source: 'database/runtime/MF_Context_Coherence.md',
    canonLayer: '[ACTIVE]'
};

var MF_COHERENCE_RULES = [
    {
        id: 'coherence_user_agency',
        keywords: ['{{user}}', 'user', 'sex', 'gender', 'pronouns', 'rank', 'alpha', 'beta', 'delta', 'omega', 'moonstone', 'white moon', 'alyssa', 'twin link', 'appearance', 'personality', 'wolf ears', 'tail'],
        canonLayer: '[ACTIVE]',
        source: 'database/characters/C_User_Agency.md',
        personality: ', [MF Context Coherence: user agency] Do not impose {{user}} sex, gender, pronouns, rank, appearance, personality, Alyssa identity, Omega status, Moonstone, White Moon, or Twin Link unless the USER persona or chat explicitly establishes them. Source path: database/characters/C_User_Agency.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF Context Coherence: user agency] ModernFantasy2024 preserves {{user}} agency. Alyssa, female, Omega, Moonstone, White Moon, and Twin Link remain conditional, not defaults. Source path: database/characters/C_User_Agency.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'coherence_anti_omniscience',
        keywords: ['anti-omniscience', 'secret', 'mystery', 'private', 'hidden', 'locked canon', 'unknown'],
        canonLayer: '[ACTIVE]',
        source: 'database/runtime/MF_Context_Coherence.md',
        personality: ', [MF Context Coherence: anti-omniscience] Characters only know what their scene, memory, role, and evidence support. Do not reveal locked canon unless a sourced trigger explicitly opens it. Source path: database/runtime/MF_Context_Coherence.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF Context Coherence: anti-omniscience] Keep secrets, private thoughts, and locked canon protected unless the active scene has a sourced reason to reveal them. Source path: database/runtime/MF_Context_Coherence.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'coherence_scene_presence',
        keywords: ['Solarton', 'SUCC', 'Douglas Estate', 'Blackwood', 'The Verve', 'Full Moon Market', 'estate lockdown'],
        canonLayer: '[ACTIVE]',
        source: 'database/runtime/MF_Context_Coherence.md',
        personality: ', [MF Context Coherence: scene presence] Only mention characters as present when the scene explicitly places them there. Source path: database/runtime/MF_Context_Coherence.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF Context Coherence: scene presence] Track current location and visible participants. Do not populate Solarton, SUCC, Douglas Estate, Blackwood, The Verve, or Full Moon Market scenes with absent relatives unless sourced stage direction places them there. Source path: database/runtime/MF_Context_Coherence.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'coherence_conflict_mode',
        keywords: ['combat', 'fight', 'security', 'threat', 'protect', 'perimeter', 'Vanguard', 'Silver Bullets'],
        canonLayer: '[ACTIVE]',
        source: 'database/factions/F_DouglasBloodmoonPack.md',
        personality: ', [MF Context Coherence: conflict mode] Conflict can be tense and protective without becoming uncontrolled villainy or gratuitous violence. Source path: database/factions/F_DouglasBloodmoonPack.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF Context Coherence: conflict mode] In threat scenes, prioritize de-escalation, family protection, professional security behavior, and emotional fallout over spectacle violence. Source path: database/factions/F_DouglasBloodmoonPack.md | Canon Layer: [ACTIVE].'
    }
];

function mfCoherenceHasContext() {
    return typeof context !== 'undefined';
}

function mfCoherenceGuardContext() {
    if (!mfCoherenceHasContext() || context === null || typeof context !== 'object') {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function mfCoherenceText() {
    var lastMessage;
    lastMessage = '';
    if (context.chat && context.chat.last_message) {
        lastMessage = context.chat.last_message;
    }
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + lastMessage;
}

function mfCoherenceContainsAny(source, keywords) {
    var i;
    var lowerSource;
    var lowerKeyword;
    if (!source || !keywords || keywords.length === 0) {
        return false;
    }
    lowerSource = source.toLowerCase();
    for (i = 0; i < keywords.length; i = i + 1) {
        lowerKeyword = String(keywords[i]).toLowerCase();
        if (lowerKeyword && lowerSource.indexOf(lowerKeyword) !== -1) {
            return true;
        }
    }
    return false;
}

function mfCoherenceAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function mfCoherenceBudgetSlice(text, limit) {
    if (!text) {
        return '';
    }
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit);
}

function mfCoherenceRun() {
    var sourceText;
    var i;
    var rule;
    var personalityBuffer;
    var scenarioBuffer;
    var debugText;
    if (!mfCoherenceGuardContext()) {
        return;
    }
    sourceText = mfCoherenceText();
    if (!mfCoherenceContainsAny(sourceText, ['anti-omniscience', 'secret', 'user', '{{user}}', 'rank', 'Omega', 'Moonstone', 'White Moon', 'Alyssa', 'Twin Link', 'Solarton', 'SUCC', 'Douglas Estate', 'Blackwood', 'The Verve', 'combat', 'threat', 'protect'])) {
        return;
    }
    personalityBuffer = '';
    scenarioBuffer = '';
    for (i = 0; i < MF_COHERENCE_RULES.length; i = i + 1) {
        rule = MF_COHERENCE_RULES[i];
        if (mfCoherenceContainsAny(sourceText, rule.keywords)) {
            personalityBuffer += rule.personality;
            scenarioBuffer += rule.scenario;
        }
    }
    if (personalityBuffer.length > 0 && mfCoherenceText().indexOf(MF_COHERENCE_CONFIG.marker) === -1) {
        mfCoherenceAppendIfNeeded('personality', mfCoherenceBudgetSlice(personalityBuffer, MF_COHERENCE_CONFIG.budget));
        mfCoherenceAppendIfNeeded('scenario', mfCoherenceBudgetSlice(' ' + MF_COHERENCE_CONFIG.marker + scenarioBuffer, MF_COHERENCE_CONFIG.budget));
    }
    if (MF_COHERENCE_CONFIG.debug) {
        debugText = ' [MF_COHERENCE_DEBUG] Coherence rules checked. Source path: database/runtime/MF_Context_Coherence.md | Canon Layer: [ACTIVE].';
        mfCoherenceAppendIfNeeded('scenario', debugText);
    }
}

mfCoherenceRun();
