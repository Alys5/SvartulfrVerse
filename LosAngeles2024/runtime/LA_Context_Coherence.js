/*
Los Angeles 2024 context-coherence script.
Purpose: add anti-omniscience, twin-resolution, scene-presence, and conflict-mode coherence rules when triggered.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LA_COHERENCE_CONFIG = {
    debug: false,
    marker: '[LA_CONTEXT_COHERENCE]',
    budget: 900
};

var LA_COHERENCE_RULES = [
    {
        id: 'coherence_anti_omniscience',
        keywords: ['anti-omniscience', 'secret', 'mystery', 'private', 'hidden', 'locked canon', 'unknown'],
        canonLayer: '[ACTIVE]',
        source: 'database/runtime/LA_Context_Coherence.md',
        personality: ', [LA Context Coherence: anti-omniscience] Characters only know what their scene, memory, role, and evidence support. Do not reveal locked canon unless a sourced trigger explicitly opens it. Source path: database/runtime/LA_Context_Coherence.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA Context Coherence: anti-omniscience] Keep secrets, private thoughts, and locked canon protected unless the active scene has a sourced reason to reveal them. Source path: database/runtime/LA_Context_Coherence.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'coherence_twin_resolution',
        keywords: ['Alyssa Jasper', 'Jasper Alyssa', 'twin', 'Douglas-Bloodmoon twins', 'fusion-visual twins'],
        canonLayer: '[ACTIVE]',
        source: 'database/families/F_DouglasBloodmoon.md',
        personality: ', [LA Context Coherence: twin resolution] Alyssa and Jasper are separate twin people with shared history, not interchangeable identities. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA Context Coherence: twin resolution] When both twins appear, preserve distinct goals, voices, bodies, relationships, and choices while allowing twin shorthand and emotional mirroring. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'coherence_scene_presence',
        keywords: ['The Verve', 'UCLA', 'Douglas Estate', 'rooftop', 'family dinner', 'Beverly Hills'],
        canonLayer: '[ACTIVE]',
        source: 'database/runtime/LA_Context_Coherence.md',
        personality: ', [LA Context Coherence: scene presence] Only mention characters as present when the scene explicitly places them there. Source path: database/runtime/LA_Context_Coherence.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA Context Coherence: scene presence] Track current location and visible participants. Do not populate The Verve, UCLA, rooftop, Douglas Estate, or family dinner scenes with absent relatives unless sourced stage direction places them there. Source path: database/runtime/LA_Context_Coherence.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'coherence_conflict_mode',
        keywords: ['combat', 'fight', 'boxing', 'security', 'threat', 'protect'],
        canonLayer: '[ACTIVE]',
        source: 'database/organizations/O_DCC_Security.md',
        personality: ', [LA Context Coherence: conflict mode] Conflict can be tense and protective without becoming mafia, crime-family, or grimdark fiction. Source path: database/organizations/O_DCC_Security.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA Context Coherence: conflict mode] In threat scenes, prioritize de-escalation, family protection, professional security behavior, and emotional fallout over gratuitous violence. Source path: database/organizations/O_DCC_Security.md | Canon Layer: [ACTIVE].'
    }
];

function laCoherenceHasContext() {
    return typeof context !== 'undefined';
}

function laCoherenceGuardContext() {
    if (!laCoherenceHasContext()) {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function laCoherenceText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '');
}

function laCoherenceContainsAny(source, keywords) {
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

function laCoherenceAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function laCoherenceBudgetSlice(text, limit) {
    if (!text) {
        return '';
    }
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit);
}

function laCoherenceRun() {
    var sourceText;
    var i;
    var rule;
    var personalityBuffer;
    var scenarioBuffer;
    var debugText;
    if (!laCoherenceGuardContext()) {
        return;
    }
    sourceText = laCoherenceText();
    if (!laCoherenceContainsAny(sourceText, ['anti-omniscience', 'secret', 'twin', 'Alyssa Jasper', 'The Verve', 'UCLA', 'Douglas Estate', 'combat', 'threat', 'protect'])) {
        return;
    }
    personalityBuffer = '';
    scenarioBuffer = '';
    for (i = 0; i < LA_COHERENCE_RULES.length; i = i + 1) {
        rule = LA_COHERENCE_RULES[i];
        if (laCoherenceContainsAny(sourceText, rule.keywords)) {
            personalityBuffer += rule.personality;
            scenarioBuffer += rule.scenario;
        }
    }
    if (personalityBuffer.length > 0 && laCoherenceText().indexOf(LA_COHERENCE_CONFIG.marker) === -1) {
        laCoherenceAppendIfNeeded('personality', laCoherenceBudgetSlice(personalityBuffer, LA_COHERENCE_CONFIG.budget));
        laCoherenceAppendIfNeeded('scenario', laCoherenceBudgetSlice(' ' + LA_COHERENCE_CONFIG.marker + scenarioBuffer, LA_COHERENCE_CONFIG.budget));
    }
    if (LA_COHERENCE_CONFIG.debug) {
        debugText = ' [LA_COHERENCE_DEBUG] Coherence rules evaluated. Source path: database/runtime/LA_Context_Coherence.md | Canon Layer: [ACTIVE].';
        laCoherenceAppendIfNeeded('scenario', debugText);
    }
}

laCoherenceRun();
