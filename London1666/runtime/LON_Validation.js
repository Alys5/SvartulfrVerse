/*
London1666 validation helper script.
Purpose: validate IDs, keywords, database/ sources, Canon Layer tags, and absence of forbidden historical archive references.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LON_VALIDATION_CONFIG = {
    debug: false,
    marker: '[LON_VALIDATION]'
};

var LON_VALID_LAYERS = ['[ACTIVE]', '[HISTORICAL]', '[CULTURAL]', '[DEFERRED]', '[CANDIDATE]'];

var LON_VALIDATION_TABLE = [
    { id: 'context_control', source: 'database/runtime/LON_Context_Control.md', canonLayer: '[ACTIVE]', keywords: ['LON_CONTEXT_BUDGET', 'London1666'] },
    { id: 'wrd_london1666_core', source: 'database/worlds/W_London1666.md', canonLayer: '[CANDIDATE]', keywords: ['London1666', 'London 1666', 'Great Fire'] },
    { id: 'loc_regency_drawing_rooms', source: 'database/legacy/london1666/regency_metadata.md', canonLayer: '[HISTORICAL]', keywords: ['Regency', 'drawing room', 'social hierarchy'] },
    { id: 'vis_regency_visual_dna', source: 'database/legacy/london1666/regency_visual_dna.md', canonLayer: '[HISTORICAL]', keywords: ['Regency Visual DNA', 'gas lamp', 'carriage'] },
    { id: 'loc_regency_estates_ballrooms', source: 'database/legacy/london1666/regency_locations.md', canonLayer: '[HISTORICAL]', keywords: ['grand estates', 'ballrooms', 'country properties'] },
    { id: 'temporal_regency_conflict', source: 'database/runtime/LON_Context_Coherence.md', canonLayer: '[CANDIDATE]', keywords: ['London1666 Regency', 'Regency London1666', '1666 Regency'] },
    { id: 'npc_marcus_regency_candidate', source: 'database/legacy/london1666/regency_npc_marcus.md', canonLayer: '[CANDIDATE]', keywords: ['Marcus', 'vanguard lieutenant'] },
    { id: 'npc_angelo_moreno_regency_candidate', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', canonLayer: '[CANDIDATE]', keywords: ['Visconte Angelo Moreno', 'Angel Moreno', 'Angel&Co'] },
    { id: 'coherence_anti_omniscience', source: 'database/runtime/LON_Context_Coherence.md', canonLayer: '[ACTIVE]', keywords: ['anti-omniscience', 'secret', 'mystery'] },
    { id: 'coherence_temporal_regency_conflict', source: 'database/runtime/LON_Context_Coherence.md', canonLayer: '[CANDIDATE]', keywords: ['London1666 Regency', 'Regency London1666', '1666 Regency'] },
    { id: 'coherence_legacy_npc_caution', source: 'database/legacy/london1666/regency_npc_index.md', canonLayer: '[CANDIDATE]', keywords: ['Marcus', 'Visconte Angelo Moreno', 'Angel Moreno'] },
    { id: 'coherence_source_attribution', source: 'database/runtime/LON_Context_Coherence.md', canonLayer: '[ACTIVE]', keywords: ['source path', 'Canon Layer', 'database/'] },
    { id: 'coherence_scene_presence', source: 'database/runtime/LON_Context_Coherence.md', canonLayer: '[ACTIVE]', keywords: ['scene presence', 'present in scene', 'active participants'] },
    { id: 'state_persistence', source: 'database/runtime/LON_State_Persistence.md', canonLayer: '[ACTIVE]', keywords: ['LON_STATE:visible', 'LON_STATE:zero', 'persist'] }
];

var LON_LEGACY_INVENTORY = [
    {
        id: 'legacy_w_regency_md',
        file: 'London1666/legacy/W_Regency.md',
        type: 'world_metadata',
        title: 'World | Regency',
        theme: 'Aristocratic Elegance; Drawing Rooms; Social Hierarchy; Period Drama',
        description: 'Legacy Regency world partition about aristocratic elegance, rigid social hierarchy, propriety, and reputation in the early nineteenth century.',
        messageDepth: 'Ambient social tension; propriety, social standing, reputation, polite society rules.',
        canonLayer: '[HISTORICAL]',
        source: 'database/legacy/london1666/regency_metadata.md',
        extracted: ['aristocratic elegance', 'drawing rooms', 'social hierarchy', 'propriety', 'reputation', 'drawing room politics', 'carriage travel', 'footmen service']
    },
    {
        id: 'legacy_visual_dna_md',
        file: 'London1666/legacy/Visual_DNA.md',
        type: 'visual_dna',
        title: 'Regency Visual DNA',
        theme: 'Environmental modifiers and location texture',
        description: 'Legacy Visual DNA for Georgian townhouses, grand estates, drawing rooms, ballrooms, cobblestone streets, gas lamps, horse-drawn carriages, servants, and footmen.',
        messageDepth: 'Warm cinematic lighting, Rembrandt lighting, deep shadows, amber and obsidian palette, painterly realism.',
        canonLayer: '[HISTORICAL]',
        source: 'database/legacy/london1666/regency_visual_dna.md',
        extracted: ['Georgian townhouses', 'grand estates', 'drawing rooms', 'ballrooms', 'cobblestone streets', 'gas lamps', 'horse-drawn carriages', 'footmen in livery']
    },
    {
        id: 'legacy_w_regency_js',
        file: 'London1666/legacy/W_Regency.js',
        type: 'legacy_runtime_behavior',
        title: 'Legacy W_Regency.js behavior',
        theme: 'Keyword activation, priority buckets, NPC injection, direct scenario writes',
        description: 'Legacy script behavior is historical only: it guarded context, built a chat window, selected lore by keywords and priority, then appended personality and scenario content.',
        messageDepth: 'Activation window, priority buckets 1-5, APPLY_LIMIT, WINDOW_DEPTH, direct personality/scenario append behavior.',
        canonLayer: '[HISTORICAL]',
        source: 'database/legacy/london1666/regency_runtime_behavior.md',
        extracted: ['keyword matching', 'priority buckets', 'activation window', 'Marcus NPC', 'Visconte Angelo Moreno NPC', 'direct personality/scenario append behavior']
    }
];

var LON_LEGACY_NPC_TABLE = [
    {
        id: 'legacy_npc_marcus',
        name: 'Marcus',
        legacyName: 'Marcus',
        source: 'database/legacy/london1666/regency_npc_marcus.md',
        canonLayer: '[CANDIDATE]',
        categories: ['identity', 'appearance', 'relationships', 'personality', 'psyche', 'advancedPsychology', 'backstory', 'dialogue', 'combat', 'capabilities', 'sampleDialog', 'residence', 'intimacy', 'notes'],
        summary: 'Legacy Regency candidate bodyguard/vanguard lieutenant; not active London1666 canon without explicit database/ reconciliation.'
    },
    {
        id: 'legacy_npc_angelo_moreno',
        name: 'Visconte Angelo Moreno',
        legacyName: "Visconte Angelo 'Angel' Moreno",
        source: 'database/legacy/london1666/regency_npc_angelo_moreno.md',
        canonLayer: '[CANDIDATE]',
        categories: ['identity', 'appearance', 'relationships', 'personality', 'psyche', 'advancedPsychology', 'backstory', 'dialogue', 'combat', 'capabilities', 'sampleDialog', 'residence', 'intimacy', 'notes'],
        summary: 'Legacy Regency candidate mentor/patron; not active London1666 canon without explicit database/ reconciliation.'
    }
];

function lonValidationHasContext() {
    return typeof context !== 'undefined' && context != null;
}

function lonValidationGuardContext() {
    if (!lonValidationHasContext()) {
        return false;
    }
    context.character = context.character && typeof context.character === 'object' ? context.character : {};
    context.character.personality = typeof context.character.personality === 'string' ? context.character.personality : '';
    context.character.scenario = typeof context.character.scenario === 'string' ? context.character.scenario : '';
    context.character.example_dialogs = typeof context.character.example_dialogs === 'string' ? context.character.example_dialogs : '';
    return true;
}

function lonValidationChatText() {
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

function lonValidationText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + (context.character.example_dialogs || '') + ' ' + lonValidationChatText();
}

function lonValidationContainsAny(source, keywords) {
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

function lonValidationAppendIfNeeded(field, text) {
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

function lonValidationLayerValid(layer) {
    var i;
    for (i = 0; i < LON_VALID_LAYERS.length; i = i + 1) {
        if (LON_VALID_LAYERS[i] === layer) {
            return true;
        }
    }
    return false;
}

function lonValidationSourceValid(source) {
    return typeof source === 'string' && source.indexOf('database/') === 0 && source.indexOf('database' + '_old') === -1;
}

function lonValidationEntryValid(entry) {
    var errors;
    if (!entry || typeof entry.id !== 'string' || entry.id.length === 0) {
        return ['missing id'];
    }
    errors = [];
    if (!lonValidationSourceValid(entry.source)) {
        errors[errors.length] = entry.id + ' has invalid source';
    }
    if (!lonValidationLayerValid(entry.canonLayer)) {
        errors[errors.length] = entry.id + ' has invalid Canon Layer';
    }
    if (!entry.keywords || !Array.isArray(entry.keywords) || entry.keywords.length === 0) {
        errors[errors.length] = entry.id + ' has missing keywords';
    }
    return errors;
}

function lonValidationRun() {
    var sourceText;
    var i;
    var errors;
    var entryErrors;
    var summary;
    if (!lonValidationGuardContext()) {
        return;
    }
    sourceText = lonValidationText();
    if (!lonValidationContainsAny(sourceText, ['validate', 'validation', 'canon check', 'source check', 'LON_VALIDATION'])) {
        return;
    }
    errors = [];
    for (i = 0; i < LON_VALIDATION_TABLE.length; i = i + 1) {
        entryErrors = lonValidationEntryValid(LON_VALIDATION_TABLE[i]);
        if (entryErrors.length > 0) {
            errors = errors.concat(entryErrors);
        }
    }
    if (errors.length === 0) {
        summary = ' [LON_VALIDATION:OK] Checked ' + LON_VALIDATION_TABLE.length + ' London1666 runtime lore entries. All have database/ source attribution, Canon Layer tags, keywords, and no forbidden archive references. Source path: database/runtime/LON_Validation.md | Canon Layer: [ACTIVE].';
    } else {
        summary = ' [LON_VALIDATION:ERROR] ' + errors.length + ' validation errors: ' + errors.join('; ') + '. Source path: database/runtime/LON_Validation.md | Canon Layer: [ACTIVE].';
    }
    lonValidationAppendIfNeeded('scenario', ' ' + LON_VALIDATION_CONFIG.marker + summary);
    if (LON_VALIDATION_CONFIG.debug) {
        lonValidationAppendIfNeeded('scenario', ' [LON_VALIDATION_DEBUG] Validation table active. Source path: database/runtime/LON_Validation.md | Canon Layer: [ACTIVE].');
    }
}

lonValidationRun();