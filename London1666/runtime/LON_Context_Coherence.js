/*
London1666 context-coherence script.
Purpose: add anti-omniscience, period-conflict, source-attribution, and legacy-NPC coherence rules when triggered.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LON_COHERENCE_CONFIG = {
    debug: false,
    marker: '[LON_CONTEXT_COHERENCE]',
    budget: 1200
};

var LON_COHERENCE_RULES = [
    {
        id: 'coherence_anti_omniscience',
        keywords: ['anti-omniscience', 'secret', 'mystery', 'private', 'hidden', 'unknown', 'locked canon'],
        canonLayer: '[ACTIVE]',
        source: 'database/runtime/LON_Context_Coherence.md',
        personality: ', [LON Context Coherence: anti-omniscience] Characters only know what their scene, memory, role, and evidence support. Do not reveal locked canon without a sourced trigger. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [ACTIVE].',
        scenario: ' [LON Context Coherence: anti-omniscience] Protect secrets, private thoughts, and locked canon unless the active scene has an explicit database/ reason to reveal them. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'coherence_temporal_regency_conflict',
        keywords: ['London1666 Regency', 'Regency London1666', '1666 Regency', 'London 1666 Regency', 'Regency early 19th century London1666', 'Regency drawing room London1666'],
        canonLayer: '[CANDIDATE]',
        source: 'database/runtime/LON_Context_Coherence.md',
        personality: ', [LON Context Coherence: temporal conflict] London1666 and Regency are canon-sensitive together; do not merge early nineteenth-century society into active London1666 without explicit database/ reconciliation. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [CANDIDATE].',
        scenario: ' [LON Context Coherence: temporal conflict] If Regency, aristocratic drawing rooms, gas lamps, carriages, or early nineteenth-century etiquette appear with London1666, classify the material as [HISTORICAL] or [CANDIDATE] until an active database/ source reconciles it. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [CANDIDATE].'
    },
    {
        id: 'coherence_legacy_npc_caution',
        keywords: ['Marcus', 'Visconte Angelo Moreno', 'Angel Moreno', 'Regency legacy NPC', 'legacy NPC', 'candidate legacy NPC'],
        canonLayer: '[CANDIDATE]',
        source: 'database/legacy/london1666/regency_npc_index.md',
        personality: ', [LON Context Coherence: legacy NPC caution] Marcus and Visconte Angelo Moreno are candidate legacy NPCs, not active London1666 canon. Source path: database/legacy/london1666/regency_npc_index.md | Canon Layer: [CANDIDATE].',
        scenario: ' [LON Context Coherence: legacy NPC caution] Legacy NPCs may be referenced as candidate material only. Do not promote Marcus or Angel Moreno into active genealogy, family authority, or present-day London1666 scenes without explicit database/ source. Source path: database/legacy/london1666/regency_npc_index.md | Canon Layer: [CANDIDATE].'
    },
    {
        id: 'coherence_source_attribution',
        keywords: ['source path', 'Canon Layer', 'database/', 'source attribution', 'canon check'],
        canonLayer: '[ACTIVE]',
        source: 'database/runtime/LON_Context_Coherence.md',
        personality: ', [LON Context Coherence: source attribution] Lore voices must carry database/ source attribution and a Canon Layer tag. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [ACTIVE].',
        scenario: ' [LON Context Coherence: source attribution] Prefer sourced, tagged, keyword-triggered additions. Reject unsourced fusion between legacy Regency material and active London1666 canon. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'coherence_scene_presence',
        keywords: ['scene presence', 'present in scene', 'active participants', 'drop in', 'drop out'],
        canonLayer: '[ACTIVE]',
        source: 'database/runtime/LON_Context_Coherence.md',
        personality: ', [LON Context Coherence: scene presence] Only mention characters as present when the scene explicitly places them there. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [ACTIVE].',
        scenario: ' [LON Context Coherence: scene presence] Track current location and visible participants. Do not populate London1666 or Regency scenes with absent legacy NPCs unless sourced stage direction places them there. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [ACTIVE].'
    }
];

function lonCoherenceHasContext() {
    return typeof context !== 'undefined' && context != null;
}

function lonCoherenceGuardContext() {
    if (!lonCoherenceHasContext()) {
        return false;
    }
    context.character = context.character && typeof context.character === 'object' ? context.character : {};
    context.character.personality = typeof context.character.personality === 'string' ? context.character.personality : '';
    context.character.scenario = typeof context.character.scenario === 'string' ? context.character.scenario : '';
    context.character.example_dialogs = typeof context.character.example_dialogs === 'string' ? context.character.example_dialogs : '';
    return true;
}

function lonCoherenceChatText() {
    var parts;
    var i;
    var msg;
    parts = [];
    if (context.chat) {
        if (context.chat.last_message) {
            parts[parts.length] = context.chat.last_message;
        } else if (context.chat.lastMessage) {
            parts[parts.length] = context.chat.lastMessage;
        }
        if (context.chat.last_messages && context.chat.last_messages.length) {
            for (i = 0; i < context.chat.last_messages.length; i = i + 1) {
                msg = context.chat.last_messages[i];
                parts[parts.length] = msg && msg.message ? msg.message : String(msg || '');
            }
        }
    }
    return parts.join(' ');
}

function lonCoherenceText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + (context.character.example_dialogs || '') + ' ' + lonCoherenceChatText();
}

function lonCoherenceContainsAny(source, keywords) {
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

function lonCoherenceAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    if (field === 'personality') {
        current = context.character.personality || '';
        if (current.indexOf(text) === -1) {
            context.character.personality += text;
        }
    } else if (field === 'scenario') {
        current = context.character.scenario || '';
        if (current.indexOf(text) === -1) {
            context.character.scenario += text;
        }
    } else if (field === 'example_dialogs') {
        current = context.character.example_dialogs || '';
        if (current.indexOf(text) === -1) {
            context.character.example_dialogs += text;
        }
    }
}

function lonCoherenceBudgetSlice(text, limit) {
    if (!text) {
        return '';
    }
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit);
}

function lonCoherenceRun() {
    var sourceText;
    var i;
    var rule;
    var personalityBuffer;
    var scenarioBuffer;
    var debugText;
    if (!lonCoherenceGuardContext()) {
        return;
    }
    sourceText = lonCoherenceText();
    if (!lonCoherenceContainsAny(sourceText, ['secret', 'mystery', 'private', 'hidden', 'unknown', 'London1666', 'Regency', 'Marcus', 'Visconte Angelo Moreno', 'Angel Moreno', 'source path', 'Canon Layer', 'scene presence'])) {
        return;
    }
    personalityBuffer = '';
    scenarioBuffer = '';
    for (i = 0; i < LON_COHERENCE_RULES.length; i = i + 1) {
        rule = LON_COHERENCE_RULES[i];
        if (lonCoherenceContainsAny(sourceText, rule.keywords)) {
            personalityBuffer += rule.personality;
            scenarioBuffer += rule.scenario;
        }
    }
    if (personalityBuffer.length > 0 && lonCoherenceText().indexOf(LON_COHERENCE_CONFIG.marker) === -1) {
        lonCoherenceAppendIfNeeded('personality', lonCoherenceBudgetSlice(personalityBuffer, LON_COHERENCE_CONFIG.budget));
        lonCoherenceAppendIfNeeded('scenario', lonCoherenceBudgetSlice(' ' + LON_COHERENCE_CONFIG.marker + scenarioBuffer, LON_COHERENCE_CONFIG.budget));
    }
    if (LON_COHERENCE_CONFIG.debug) {
        debugText = ' [LON_COHERENCE_DEBUG] Coherence rules evaluated. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [ACTIVE].';
        lonCoherenceAppendIfNeeded('scenario', debugText);
    }
}

lonCoherenceRun();