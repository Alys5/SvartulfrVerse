/*
ModernFantasy2024 validation script.
Purpose: validate sourced MF entries and append a concise runtime validation summary when validation keywords appear.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var MF_VALIDATION_CONFIG = {
    debug: false,
    marker: '[MF_VALIDATION]',
    source: 'database/runtime/MF_Validation.md',
    canonLayer: '[ACTIVE]'
};

var MF_VALID_LAYERS = ['[ACTIVE]', '[HISTORICAL]', '[CULTURAL]', '[DEFERRED]', '[CANDIDATE]'];

var MF_VALIDATION_TABLE = [
    { id: 'wrd_modernfantasy_core', source: 'database/worlds/W_UrbanFantasy.md', canonLayer: '[ACTIVE]', keywords: ['ModernFantasy2024', 'Solarton', 'SUCC'] },
    { id: 'loc_solarton_core', source: 'database/locations/L_Solarton.md', canonLayer: '[ACTIVE]', keywords: ['Solarton', 'Solarton Square'] },
    { id: 'loc_succ_campus', source: 'database/locations/L_SUCC.md', canonLayer: '[ACTIVE]', keywords: ['SUCC', 'campus truce'] },
    { id: 'loc_douglas_estate', source: 'database/locations/L_DouglasEstate.md', canonLayer: '[ACTIVE]', keywords: ['Douglas Estate', 'estate lockdown'] },
    { id: 'loc_the_verve', source: 'database/locations/L_TheVerve.md', canonLayer: '[ACTIVE]', keywords: ['The Verve', 'warehouse rave'] },
    { id: 'loc_blackwood_blood_moon', source: 'database/locations/L_Blackwood.md', canonLayer: '[CULTURAL]', keywords: ['Blackwood', 'Full Moon Market'] },
    { id: 'fac_douglasbloodmoon_pack', source: 'database/factions/F_DouglasBloodmoonPack.md', canonLayer: '[ACTIVE]', keywords: ['Douglas-Bloodmoon Pack', 'pack law'] },
    { id: 'fac_silver_bullets_pressure', source: 'database/factions/F_SilverBulletsMC.md', canonLayer: '[DEFERRED]', keywords: ['Silver Bullets', 'territorial pressure'] },
    { id: 'fam_douglasbloodmoon_core', source: 'database/families/F_DouglasBloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Douglas-Bloodmoon', 'genealogy'] },
    { id: 'fam_visual_reconciliation', source: 'database/visuals/V_Visual_Reconciliation.md', canonLayer: '[ACTIVE]', keywords: ['Wulfnic phenotype', 'visual reconciliation'] },
    { id: 'npc_malachia_douglasbloodmoon', source: 'database/characters/C_Malachia_Douglas_Bloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Malachia', 'Vanguard'] },
    { id: 'npc_noah_douglasbloodmoon', source: 'database/characters/C_Noah_Douglas_Bloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Noah', 'Velvet Glove'] },
    { id: 'npc_jasper_douglasbloodmoon', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Jasper', 'DJ Frequency'] },
    { id: 'npc_wulfnic_bloodmoon', source: 'database/characters/C_Wulfnic_Bloodmoon.md', canonLayer: '[ACTIVE]', keywords: ['Wulfnic', 'Jarl'] },
    { id: 'npc_erik_douglas', source: 'database/characters/C_Erik_Douglas.md', canonLayer: '[ACTIVE]', keywords: ['Erik Douglas', 'CEO'] },
    { id: 'npc_logan_douglas', source: 'database/characters/C_Logan_Douglas.md', canonLayer: '[ACTIVE]', keywords: ['Logan Douglas', 'The Verve'] },
    { id: 'npc_marcus_vanguard', source: 'database/characters/C_Marcus.md', canonLayer: '[ACTIVE]', keywords: ['Marcus', 'perimeter'] },
    { id: 'npc_alyssa_candidate_guard', source: 'database/persona/C_Alyssa_Candidate.md', canonLayer: '[CANDIDATE]', keywords: ['Alyssa Candidate', 'White Moon'] },
    { id: 'state_mf_visible_zero', source: 'database/state/MF_State_Persistence.md', canonLayer: '[ACTIVE]', keywords: ['MF_STATE:visible', 'MF_STATE:zero'] }
];

function mfValidationHasContext() {
    return typeof context !== 'undefined';
}

function mfValidationGuardContext() {
    if (!mfValidationHasContext() || context === null || typeof context !== 'object') {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    context.character.example_dialogs = context.character.example_dialogs || '';
    return true;
}

function mfValidationText() {
    var lastMessage;
    lastMessage = '';
    if (context.chat && context.chat.last_message) {
        lastMessage = context.chat.last_message;
    }
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + (context.character.example_dialogs || '') + ' ' + lastMessage;
}

function mfValidationContainsAny(source, keywords) {
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

function mfValidationAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function mfValidationLayerValid(layer) {
    var i;
    for (i = 0; i < MF_VALID_LAYERS.length; i = i + 1) {
        if (layer === MF_VALID_LAYERS[i]) {
            return true;
        }
    }
    return false;
}

function mfValidationSourceValid(source) {
    return typeof source === 'string' && source.substring(0, 9) === 'database/' && source.indexOf('database_old') === -1;
}

function mfValidationEntryValid(entry) {
    if (!entry || typeof entry.id !== 'string' || entry.id.length === 0) {
        return 'Missing entry id.';
    }
    if (!mfValidationSourceValid(entry.source)) {
        return 'Bad source for ' + entry.id + '.';
    }
    if (!mfValidationLayerValid(entry.canonLayer)) {
        return 'Bad Canon Layer for ' + entry.id + '.';
    }
    if (!entry.keywords || entry.keywords.length === 0) {
        return 'Missing keywords for ' + entry.id + '.';
    }
    return '';
}

function mfValidationHasVisibleState(source) {
    return /\[MF_STATE:visible\][\s\S]*?\[\/MF_STATE\]/i.test(String(source || ''));
}

function mfValidationVisibleStateValid(source) {
    var match;
    var pairs;
    var i;
    var seen;
    var pair;
    var split;
    var key;
    var value;
    match = String(source || '').match(/\[MF_STATE:visible\]([\s\S]*?)\[\/MF_STATE\]/i);
    if (!match) {
        return true;
    }
    pairs = match[1].split(';');
    seen = {};
    for (i = 0; i < pairs.length; i = i + 1) {
        pair = String(pairs[i] || '').replace(/^\s+|\s+$/g, '');
        split = pair.indexOf('=');
        if (split !== -1) {
            key = String(pair.substring(0, split)).replace(/^\s+|\s+$/g, '');
            value = String(pair.substring(split + 1)).replace(/^\s+|\s+$/g, '');
            if (/^[A-Za-z0-9_]+$/.test(key)) {
                seen[key] = value;
            }
        }
    }
    if (!seen.sceneFocus || !seen.activeParticipants || !seen.flags) {
        return false;
    }
    return mfValidationSourceValid(seen.lastCanonSource);
}

function mfValidationRun() {
    var sourceText;
    var errors;
    var i;
    var error;
    var summary;
    if (!mfValidationGuardContext()) {
        return;
    }
    sourceText = mfValidationText();
    if (!mfValidationContainsAny(sourceText, ['validate', 'validation', 'canon check', 'MF_VALIDATION'])) {
        return;
    }
    errors = [];
    if (typeof context.character.personality !== 'string') {
        errors[errors.length] = 'personality_not_string';
    }
    if (typeof context.character.scenario !== 'string') {
        errors[errors.length] = 'scenario_not_string';
    }
    if (typeof context.character.example_dialogs !== 'string') {
        errors[errors.length] = 'example_dialogs_not_string';
    }
    for (i = 0; i < MF_VALIDATION_TABLE.length; i = i + 1) {
        error = mfValidationEntryValid(MF_VALIDATION_TABLE[i]);
        if (error.length > 0) {
            errors[errors.length] = error;
        }
    }
    if (mfValidationHasVisibleState(context.character.scenario) && !mfValidationVisibleStateValid(context.character.scenario)) {
        errors[errors.length] = 'visible_state_bad';
    }
    if (errors.length === 0) {
        summary = ' ' + MF_VALIDATION_CONFIG.marker + ' ModernFantasy2024 validation passed: ' + MF_VALIDATION_TABLE.length + ' entries have database/ sources, Canon Layer tags, and keyword triggers. Source path: database/runtime/MF_Validation.md | Canon Layer: [ACTIVE].';
    } else {
        summary = ' ' + MF_VALIDATION_CONFIG.marker + ' ModernFantasy2024 validation failed: ' + errors.join(' ') + ' Source path: database/runtime/MF_Validation.md | Canon Layer: [ACTIVE].';
    }
    mfValidationAppendIfNeeded('scenario', summary);
    if (MF_VALIDATION_CONFIG.debug) {
        mfValidationAppendIfNeeded('scenario', ' [MF_VALIDATION_DEBUG] Validation table checked. Source path: database/runtime/MF_Validation.md | Canon Layer: [ACTIVE].');
    }
}

mfValidationRun();
