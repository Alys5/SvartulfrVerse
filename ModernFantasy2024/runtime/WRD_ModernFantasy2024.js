/*
ModernFantasy2024 MacroCosmo world script.
Purpose: inject sourced WRD, location, faction, and organization lore only when ModernFantasy2024 keywords appear.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var MF_MACRO_CONFIG = {
    debug: false,
    budget: 1400,
    marker: '[MF_MACRO_WRD]'
};

var MF_MACRO_ENTRIES = [
    {
        id: 'wrd_modernfantasy_core',
        domain: 'WRD',
        keywords: ['ModernFantasy2024', 'Modern Urban Fantasy', 'Solarton', 'SUCC', 'Douglas Estate', 'Blackwood', 'Full Moon Market'],
        priority: 10,
        minMessages: 0,
        maxMessages: 3,
        category: 'wrd_core',
        canonLayer: '[ACTIVE]',
        source: 'database/worlds/W_UrbanFantasy.md',
        personality: ', [MF MacroCosmo WRD: ModernFantasy2024] Keep ModernFantasy2024 grounded in contemporary California urban fantasy with hidden pack politics, campus life, luxury family protection, and moonlit tension. Source path: database/worlds/W_UrbanFantasy.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MacroCosmo WRD: ModernFantasy2024] Solarton, SUCC, Douglas Estate, Blackwood, and The Verve form the active macro setting. Preserve modern urban fantasy tone without turning the pack into a crime family or grimdark faction. Source path: database/worlds/W_UrbanFantasy.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_solarton_core',
        domain: 'LOC',
        keywords: ['Solarton', 'coastal California city', 'Solarton Square'],
        priority: 9,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_locations',
        canonLayer: '[ACTIVE]',
        source: 'database/locations/L_Solarton.md',
        personality: ', [MF MacroCosmo LOC: Solarton] Treat Solarton as a contemporary coastal California city where human institutions and supernatural society overlap. Source path: database/locations/L_Solarton.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MacroCosmo LOC: Solarton] Solarton carries corporate skylines, campus routes, hidden supernatural districts, and pack-visible public spaces such as Solarton Square. Source path: database/locations/L_Solarton.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_succ_campus',
        domain: 'LOC',
        keywords: ['SUCC', 'Supernatural University', 'campus truce', 'SUCC campus'],
        priority: 9,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_locations',
        canonLayer: '[ACTIVE]',
        source: 'database/locations/L_SUCC.md',
        personality: ', [MF MacroCosmo LOC: SUCC] SUCC scenes should feel academic, civic, mixed-species, and rule-bound. Source path: database/locations/L_SUCC.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MacroCosmo LOC: SUCC] SUCC is the campus truce space: classrooms, student factions, supernatural integration, and institutional rules that can restrain pack overprotection. Source path: database/locations/L_SUCC.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_douglas_estate',
        domain: 'LOC',
        keywords: ['Douglas Estate', 'Douglas family estate', 'Villa Douglas', 'estate lockdown'],
        priority: 9,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_locations',
        canonLayer: '[ACTIVE]',
        source: 'database/locations/L_DouglasEstate.md',
        personality: ', [MF MacroCosmo LOC: Douglas Estate] Present Douglas Estate as high-security family home, not a criminal compound. Source path: database/locations/L_DouglasEstate.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MacroCosmo LOC: Douglas Estate] Douglas Estate blends luxury residence, family dining rooms, private corridors, security systems, and emotional pressure around autonomy. Source path: database/locations/L_DouglasEstate.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_the_verve',
        domain: 'LOC',
        keywords: ['The Verve', 'Verve Lounge', 'underground rave', 'warehouse rave', 'Logan Verve'],
        priority: 8,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_locations',
        canonLayer: '[ACTIVE]',
        source: 'database/locations/L_TheVerve.md',
        personality: ', [MF MacroCosmo LOC: The Verve] The Verve is a music venue, safe-zone, and decompression space rather than a criminal den. Source path: database/locations/L_TheVerve.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MacroCosmo LOC: The Verve] The Verve can host music, covert exits, family talks, and supernatural nightlife while staying scene-specific and emotionally grounded. Source path: database/locations/L_TheVerve.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_blackwood_blood_moon',
        domain: 'LOC',
        keywords: ['Blackwood', 'Blood Moon', 'Full Moon Market', 'Svartulfr festival'],
        priority: 8,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_locations',
        canonLayer: '[CULTURAL]',
        source: 'database/locations/L_Blackwood.md',
        personality: ', [MF MacroCosmo LOC: Blackwood] Blackwood and Blood Moon events are cultural and ritual pressure points, not default assumptions for every scene. Source path: database/locations/L_Blackwood.md | Canon Layer: [CULTURAL].',
        scenario: ' [MF MacroCosmo LOC: Blackwood] Blackwood, Blood Moon rites, and Full Moon Market scenes heighten pack culture, public supernatural visibility, and ancestral pressure only when explicitly invoked. Source path: database/locations/L_Blackwood.md | Canon Layer: [CULTURAL].'
    },
    {
        id: 'fac_douglasbloodmoon_pack',
        domain: 'FAC',
        keywords: ['Douglas-Bloodmoon Pack', 'Svartulfr Pack', 'pack law', 'campus truce'],
        priority: 8,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_factions',
        canonLayer: '[ACTIVE]',
        source: 'database/factions/F_DouglasBloodmoonPack.md',
        personality: ', [MF MacroCosmo FAC: Douglas-Bloodmoon Pack] Treat the Douglas-Bloodmoon Pack as a formal protective social order with legal and emotional stakes. Source path: database/factions/F_DouglasBloodmoonPack.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MacroCosmo FAC: Douglas-Bloodmoon Pack] Pack law, campus truce, and family protection create tension around autonomy. Do not turn formal protection into uncontrolled villainy. Source path: database/factions/F_DouglasBloodmoonPack.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fac_silver_bullets_pressure',
        domain: 'FAC',
        keywords: ['Silver Bullets', 'Silver Bullets MC', 'rival rogue', 'territorial pressure'],
        priority: 6,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_factions',
        canonLayer: '[DEFERRED]',
        source: 'database/factions/F_SilverBulletsMC.md',
        personality: ', [MF MacroCosmo FAC: Silver Bullets] Treat Silver Bullets pressure as deferred rival context unless the scene explicitly opens it. Source path: database/factions/F_SilverBulletsMC.md | Canon Layer: [DEFERRED].',
        scenario: ' [MF MacroCosmo FAC: Silver Bullets] Silver Bullets MC can create perimeter pressure, but do not assume a full territory war unless sourced scene evidence appears. Source path: database/factions/F_SilverBulletsMC.md | Canon Layer: [DEFERRED].'
    }
];

function mfMacroHasContext() {
    return typeof context !== 'undefined';
}

function mfMacroGuardContext() {
    if (!mfMacroHasContext() || context === null || typeof context !== 'object') {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function mfMacroText() {
    var lastMessage;
    lastMessage = '';
    if (context.chat && context.chat.last_message) {
        lastMessage = context.chat.last_message;
    }
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + lastMessage;
}

function mfMacroContainsAny(source, keywords) {
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

function mfMacroEntryMatches(entry, sourceText) {
    return mfMacroContainsAny(sourceText, entry.keywords);
}

function mfMacroBudgetSlice(text, limit) {
    if (!text) {
        return '';
    }
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit);
}

function mfMacroAlreadyPresent(marker) {
    return mfMacroText().indexOf(marker) !== -1;
}

function mfMacroAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function mfMacroRun() {
    var sourceText;
    var selected;
    var i;
    var entry;
    var personalityBuffer;
    var scenarioBuffer;
    var debugText;
    if (!mfMacroGuardContext()) {
        return;
    }
    sourceText = mfMacroText();
    if (!mfMacroContainsAny(sourceText, ['ModernFantasy2024', 'Solarton', 'SUCC', 'Douglas Estate', 'Blackwood', 'Full Moon Market', 'The Verve', 'Douglas-Bloodmoon Pack', 'Silver Bullets'])) {
        return;
    }
    selected = [];
    for (i = 0; i < MF_MACRO_ENTRIES.length; i = i + 1) {
        entry = MF_MACRO_ENTRIES[i];
        if (mfMacroEntryMatches(entry, sourceText) && selected.length < entry.maxMessages) {
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
    if (!mfMacroAlreadyPresent(MF_MACRO_CONFIG.marker)) {
        mfMacroAppendIfNeeded('personality', mfMacroBudgetSlice(personalityBuffer, MF_MACRO_CONFIG.budget));
        mfMacroAppendIfNeeded('scenario', mfMacroBudgetSlice(' ' + MF_MACRO_CONFIG.marker + scenarioBuffer, MF_MACRO_CONFIG.budget));
    }
    if (MF_MACRO_CONFIG.debug) {
        debugText = ' [MF_MACRO_DEBUG] WRD entries active: ' + selected.length + '. Source attribution and Canon Layer tags retained. Source path: database/runtime/MF_MacroCosmo_World.md | Canon Layer: [ACTIVE].';
        mfMacroAppendIfNeeded('scenario', debugText);
    }
}

mfMacroRun();
