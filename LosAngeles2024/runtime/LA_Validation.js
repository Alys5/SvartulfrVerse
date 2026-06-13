/*
Los Angeles 2024 validation script.
Purpose: validate sourced LA 2024 entries and append a concise validation summary when validation keywords appear.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LA_VALIDATION_CONFIG = {
    debug: false,
    marker: '[LA_VALIDATION]',
    source: 'database/runtime/LA_Validation.md',
    canonLayer: '[ACTIVE]'
};

var LA_VALID_LAYERS = ['[ACTIVE]', '[HISTORICAL]', '[CULTURAL]', '[DEFERRED]', '[CANDIDATE]'];

var LA_VALIDATION_TABLE = [
    { id: 'wrd_losangeles_core', source: 'database/worlds/W_Contemporary.md', canonLayer: '[ACTIVE]', keywords: ['Los Angeles', 'LA 2024', 'Beverly Hills'] },
    { id: 'loc_douglas_estate_core', source: 'database/locations/L_DouglasEstate.md', canonLayer: '[ACTIVE]', keywords: ['Douglas Estate', 'family estate'] },
    { id: 'org_dcc_security', source: 'database/organizations/O_DCC_Security.md', canonLayer: '[ACTIVE]', keywords: ['DCC Security', 'Black Wolf Division'] },
    { id: 'fam_douglasbloodmoon_core', source: 'database/families/F_DouglasBloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Douglas-Bloodmoon', 'genealogy'] },
    { id: 'fam_visual_reconciliation', source: 'database/visuals/V_Visual_Reconciliation.md', canonLayer: '[ACTIVE]', keywords: ['Wulfnic blonde', 'visual reconciliation'] },
    { id: 'npc_alyssa_douglasbloodmoon', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Alyssa', 'public health'] },
    { id: 'npc_jasper_douglasbloodmoon', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Jasper', 'DJ Frequency'] },
    { id: 'npc_malachia_douglasbloodmoon', source: 'database/characters/C_Malachia_Douglas_Bloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Malachia', 'Black Wolf'] },
    { id: 'npc_noah_douglasbloodmoon', source: 'database/characters/C_Noah_Douglas_Bloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Noah', 'law student'] },
    { id: 'npc_erik_douglas', source: 'database/characters/C_Erik_Douglas.md', canonLayer: '[ACTIVE]', keywords: ['Erik Douglas', 'Nixara'] },
    { id: 'npc_logan_douglas', source: 'database/characters/C_Logan_Douglas.md', canonLayer: '[ACTIVE]', keywords: ['Logan Douglas', 'The Verve'] },
    { id: 'npc_wulfnic_bloodmoon', source: 'database/characters/C_Wulfnic_Bloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Wulfnic Bloodmoon', 'Bloodmoon grandfather'] }
];

function laValidationHasContext() {
    return typeof context !== 'undefined';
}

function laValidationGuardContext() {
    if (!laValidationHasContext()) {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function laValidationText() {
    var lastMessage;
    lastMessage = '';
    if (context.chat && context.chat.last_message) {
        lastMessage = context.chat.last_message;
    }
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + lastMessage;
}

function laValidationContainsAny(source, keywords) {
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

function laValidationAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function laValidationLayerValid(layer) {
    var i;
    for (i = 0; i < LA_VALID_LAYERS.length; i = i + 1) {
        if (layer === LA_VALID_LAYERS[i]) {
            return true;
        }
    }
    return false;
}

function laValidationSourceValid(source) {
    return typeof source === 'string' && source.substring(0, 9) === 'database/' && source.indexOf('database' + '_old') === -1;
}

function laValidationEntryValid(entry) {
    if (!entry || typeof entry.id !== 'string' || entry.id.length === 0) {
        return 'Missing entry id.';
    }
    if (!laValidationSourceValid(entry.source)) {
        return 'Bad source for ' + entry.id + '.';
    }
    if (!laValidationLayerValid(entry.canonLayer)) {
        return 'Bad Canon Layer for ' + entry.id + '.';
    }
    if (!entry.keywords || entry.keywords.length === 0) {
        return 'Missing keywords for ' + entry.id + '.';
    }
    return '';
}

function laValidationRun() {
    var sourceText;
    var errors;
    var i;
    var error;
    var summary;
    if (!laValidationGuardContext()) {
        return;
    }
    sourceText = laValidationText();
    if (!laValidationContainsAny(sourceText, ['validate', 'validation', 'canon check', 'LA_VALIDATION'])) {
        return;
    }
    errors = [];
    for (i = 0; i < LA_VALIDATION_TABLE.length; i = i + 1) {
        error = laValidationEntryValid(LA_VALIDATION_TABLE[i]);
        if (error.length > 0) {
            errors[errors.length] = error;
        }
    }
    if (errors.length === 0) {
        summary = ' ' + LA_VALIDATION_CONFIG.marker + ' LA 2024 validation passed: ' + LA_VALIDATION_TABLE.length + ' entries have database/ sources, Canon Layer tags, and keyword triggers. Source path: database/runtime/LA_Validation.md | Canon Layer: [ACTIVE].';
    } else {
        summary = ' ' + LA_VALIDATION_CONFIG.marker + ' LA 2024 validation failed: ' + errors.join(' ') + ' Source path: database/runtime/LA_Validation.md | Canon Layer: [ACTIVE].';
    }
    laValidationAppendIfNeeded('scenario', summary);
    if (LA_VALIDATION_CONFIG.debug) {
        laValidationAppendIfNeeded('scenario', ' [LA_VALIDATION_DEBUG] Validation table checked. Source path: database/runtime/LA_Validation.md | Canon Layer: [ACTIVE].');
    }
}

laValidationRun();
