/*
London1666 MacroCosmo world script.
Purpose: inject only sourced, Canon Layer tagged WRD/LOC/visual lore when specific London1666 or legacy Regency keywords appear.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LON_WORLD_CONFIG = {
    debug: false,
    budget: 1800,
    marker: '[LON_MACRO_WRD]'
};

var LON_WORLD_ENTRIES = [
    {
        id: 'wrd_london1666_core',
        domain: 'WRD',
        keywords: ['London1666', 'London 1666', 'Great Fire', 'Restoration London', 'seventeenth-century London'],
        priority: 10,
        minMessages: 0,
        maxMessages: 4,
        category: 'wrd_core',
        canonLayer: '[CANDIDATE]',
        source: 'database/worlds/W_London1666.md',
        personality: ', [LON MacroCosmo WRD: London1666 core] Treat London1666 as a candidate world shell until an explicit database/ active source reconciles it. Do not import Regency mechanics into it by default. Source path: database/worlds/W_London1666.md | Canon Layer: [CANDIDATE].',
        scenario: ' [LON MacroCosmo WRD: London1666 core] London1666 active canon is unresolved from legacy data. Use only sourced seventeenth-century London cues, Great Fire cues, or explicit database/ active reconciliation; otherwise keep the world shell candidate and non-fused. Source path: database/worlds/W_London1666.md | Canon Layer: [CANDIDATE].'
    },
    {
        id: 'loc_regency_drawing_rooms',
        domain: 'LOC',
        keywords: ['Regency', 'aristocratic elegance', 'drawing room', 'drawing rooms', 'social hierarchy', 'propriety'],
        priority: 7,
        minMessages: 0,
        maxMessages: 3,
        category: 'legacy_locations',
        canonLayer: '[HISTORICAL]',
        source: 'database/legacy/london1666/regency_metadata.md',
        personality: ', [LON MacroCosmo LOC: Regency drawing rooms] Regency drawing-room politics are legacy historical/candidate material, not active London1666 canon unless explicitly reconciled by database/ source. Source path: database/legacy/london1666/regency_metadata.md | Canon Layer: [HISTORICAL].',
        scenario: ' [LON MacroCosmo LOC: Regency drawing rooms] Legacy Regency metadata describes aristocratic drawing rooms, social hierarchy, propriety, reputation, and early nineteenth-century etiquette. Keep it separated from active London1666 unless an active database/ source explicitly bridges the periods. Source path: database/legacy/london1666/regency_metadata.md | Canon Layer: [HISTORICAL].'
    },
    {
        id: 'vis_regency_visual_dna',
        domain: 'LOC',
        keywords: ['Regency Visual DNA', 'gas lamp', 'gas lamps', 'carriage', 'carriages', 'Georgian townhouses', 'cobblestone streets'],
        priority: 7,
        minMessages: 0,
        maxMessages: 3,
        category: 'legacy_visual',
        canonLayer: '[HISTORICAL]',
        source: 'database/legacy/london1666/regency_visual_dna.md',
        personality: ', [LON MacroCosmo VIS: Regency Visual DNA] Regency visual cues such as gas lamps, carriages, Georgian townhouses, ballrooms, and cobblestone streets remain historical/candidate visual references. Source path: database/legacy/london1666/regency_visual_dna.md | Canon Layer: [HISTORICAL].',
        scenario: ' [LON MacroCosmo VIS: Regency Visual DNA] Legacy Visual DNA favors warm cinematic lighting, amber and obsidian palette, painterly realism, drawing rooms with crystal chandeliers, silk wallpaper, mahogany furniture, footmen in livery, carriages, and grand estates. Use as historical visual reference only unless active London1666 source says otherwise. Source path: database/legacy/london1666/regency_visual_dna.md | Canon Layer: [HISTORICAL].'
    },
    {
        id: 'loc_regency_estates_ballrooms',
        domain: 'LOC',
        keywords: ['grand estates', 'ballrooms', 'country properties', 'manicured gardens', 'upstairs downstairs', 'footmen in livery'],
        priority: 6,
        minMessages: 0,
        maxMessages: 3,
        category: 'legacy_locations',
        canonLayer: '[HISTORICAL]',
        source: 'database/legacy/london1666/regency_locations.md',
        personality: ', [LON MacroCosmo LOC: Regency estates] Legacy Regency estates and ballrooms are candidate/historical location texture, not active London1666 geography. Source path: database/legacy/london1666/regency_locations.md | Canon Layer: [HISTORICAL].',
        scenario: ' [LON MacroCosmo LOC: Regency estates] Legacy locations include grand estates, ballrooms, country properties, manicured gardens, upstairs/downstairs service contrast, and footmen in livery. Preserve them as Regency references rather than seventeenth-century London facts. Source path: database/legacy/london1666/regency_locations.md | Canon Layer: [HISTORICAL].'
    },
    {
        id: 'temporal_regency_conflict',
        domain: 'WRD',
        keywords: ['London1666 Regency', 'Regency London1666', '1666 Regency', 'London 1666 Regency', 'Regency early 19th century London1666'],
        priority: 11,
        minMessages: 0,
        maxMessages: 5,
        category: 'temporal_coherence',
        canonLayer: '[CANDIDATE]',
        source: 'database/runtime/LON_Context_Coherence.md',
        personality: ', [LON MacroCosmo WRD: temporal conflict] Do not merge early nineteenth-century Regency society with active London1666 canon without explicit database/ reconciliation. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [CANDIDATE].',
        scenario: ' [LON MacroCosmo WRD: temporal conflict] London1666 and Regency are canon-sensitive when mentioned together. Treat Regency metadata, Visual DNA, and legacy NPCs as [HISTORICAL] or [CANDIDATE] until an explicit active database/ source bridges them to 1666. Source path: database/runtime/LON_Context_Coherence.md | Canon Layer: [CANDIDATE].'
    }
];

function lonWorldHasContext() {
    return typeof context !== 'undefined' && context != null;
}

function lonWorldGuardContext() {
    if (!lonWorldHasContext()) {
        return false;
    }
    context.character = context.character && typeof context.character === 'object' ? context.character : {};
    context.character.personality = typeof context.character.personality === 'string' ? context.character.personality : '';
    context.character.scenario = typeof context.character.scenario === 'string' ? context.character.scenario : '';
    context.character.example_dialogs = typeof context.character.example_dialogs === 'string' ? context.character.example_dialogs : '';
    return true;
}

function lonWorldChatText() {
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

function lonWorldText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + (context.character.example_dialogs || '') + ' ' + lonWorldChatText();
}

function lonWorldContainsAny(source, keywords) {
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

function lonWorldEntryMatches(entry, sourceText) {
    return lonWorldContainsAny(sourceText, entry.keywords);
}

function lonWorldBudgetSlice(text, limit) {
    if (!text) {
        return '';
    }
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit);
}

function lonWorldAlreadyPresent(marker) {
    return lonWorldText().indexOf(marker) !== -1;
}

function lonWorldAppendIfNeeded(field, text) {
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

function lonWorldRun() {
    var sourceText;
    var selected;
    var i;
    var entry;
    var personalityBuffer;
    var scenarioBuffer;
    var debugText;
    if (!lonWorldGuardContext()) {
        return;
    }
    sourceText = lonWorldText();
    if (!lonWorldContainsAny(sourceText, ['London1666', 'London 1666', 'Great Fire', 'Restoration London', 'Regency', 'Regency Visual DNA', 'drawing room', 'carriage', 'Georgian townhouses', 'grand estates', 'ballrooms', 'cobblestone streets'])) {
        return;
    }
    selected = [];
    for (i = 0; i < LON_WORLD_ENTRIES.length; i = i + 1) {
        entry = LON_WORLD_ENTRIES[i];
        if (lonWorldEntryMatches(entry, sourceText) && selected.length < 4) {
            selected[selected.length] = entry;
        }
    }
    if (selected.length === 0) {
        return;
    }
    personalityBuffer = '';
    scenarioBuffer = '';
    for (i = 0; i < selected.length; i = i + 1) {
        entry = selected[i];
        personalityBuffer += entry.personality;
        scenarioBuffer += entry.scenario;
    }
    if (!lonWorldAlreadyPresent(LON_WORLD_CONFIG.marker)) {
        lonWorldAppendIfNeeded('personality', lonWorldBudgetSlice(personalityBuffer, LON_WORLD_CONFIG.budget));
        lonWorldAppendIfNeeded('scenario', lonWorldBudgetSlice(' ' + LON_WORLD_CONFIG.marker + scenarioBuffer, LON_WORLD_CONFIG.budget));
    }
    if (LON_WORLD_CONFIG.debug) {
        debugText = ' [LON_MACRO_DEBUG] WRD entries active: ' + selected.length + '. Source attribution and Canon Layer tags retained. Source path: database/runtime/LON_MacroCosmo_World.md | Canon Layer: [ACTIVE].';
        lonWorldAppendIfNeeded('scenario', debugText);
    }
}

lonWorldRun();