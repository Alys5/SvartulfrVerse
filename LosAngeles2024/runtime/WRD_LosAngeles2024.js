/*
Los Angeles 2024 MacroCosmo world script.
Purpose: inject only sourced, Canon Layer tagged WRD/LOC/ORG lore when specific Los Angeles 2024 keywords appear.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LA_MACRO_CONFIG = {
    debug: false,
    budget: 1200,
    marker: '[LA_MACRO_WRD]'
};

var LA_MACRO_ENTRIES = [
    {
        id: 'wrd_losangeles_core',
        domain: 'WRD',
        keywords: ['Los Angeles', 'LA 2024', 'Beverly Hills', 'California Slice-of-Life Dynasty', 'Douglas Estate'],
        priority: 10,
        minMessages: 0,
        maxMessages: 3,
        category: 'wrd_core',
        canonLayer: '[ACTIVE]',
        source: 'database/worlds/W_Contemporary.md',
        personality: ', [LA MacroCosmo WRD: Los Angeles 2024] Keep Los Angeles 2024 scenes warm, modern, wealthy, family-oriented, optimistic, and emotionally safe. Source path: database/worlds/W_Contemporary.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MacroCosmo WRD: Los Angeles 2024] Contemporary Los Angeles is Beverly Hills, UCLA, The Verve Lounge, and the Douglas Estate under golden-hour California light. The canon style is slice-of-life dynasty, not mafia, crime family, gangster, grimdark, horror, gothic, or villain-group fiction. Source path: database/worlds/W_Contemporary.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_losangeles_beverly_hills',
        domain: 'LOC',
        keywords: ['Beverly Hills', 'Rodeo Drive', 'Hollywood Hills', 'Los Angeles luxury'],
        priority: 8,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_locations',
        canonLayer: '[ACTIVE]',
        source: 'database/locations/L_LosAngeles.md',
        personality: ', [LA MacroCosmo LOC: Beverly Hills] Treat Beverly Hills as affluent, polished, sunny, and socially visible while keeping the Douglas-Bloodmoon family human and approachable. Source path: database/locations/L_LosAngeles.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MacroCosmo LOC: Beverly Hills] Beverly Hills anchors the contemporary dynasty tone: luxury homes, private gardens, clean cars, soft golden light, and social reputation without organized-crime framing. Source path: database/locations/L_LosAngeles.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_douglas_estate_core',
        domain: 'LOC',
        keywords: ['Douglas Estate', 'Douglas family estate', 'Erik house', 'family estate'],
        priority: 9,
        minMessages: 0,
        maxMessages: 3,
        category: 'wrd_locations',
        canonLayer: '[ACTIVE]',
        source: 'database/locations/L_DouglasEstate.md',
        personality: ', [LA MacroCosmo LOC: Douglas Estate] Present the Douglas Estate as a warm family home, not a fortress or criminal compound. Source path: database/locations/L_DouglasEstate.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MacroCosmo LOC: Douglas Estate] The Douglas Estate combines Beverly Hills luxury with family warmth: open kitchen, garden, media room, gym, office, guest rooms, and spaces for private family talks. Source path: database/locations/L_DouglasEstate.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_douglas_estate_internal',
        domain: 'LOC',
        keywords: ['primary structure', 'secondary structure', 'guesthouse', 'estate kitchen', 'Douglas office'],
        priority: 7,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_locations',
        canonLayer: '[ACTIVE]',
        source: 'database/locations/L_DouglasEstate.md',
        personality: ', [LA MacroCosmo LOC: Estate Interior] Use the primary structure for family life and the secondary structure for guests, work, privacy, or tense private talks. Source path: database/locations/L_DouglasEstate.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MacroCosmo LOC: Estate Interior] Estate interiors should feel lived-in and safe: primary house for shared meals and family care, secondary guesthouse for privacy, focused work, or emotionally charged one-on-one scenes. Source path: database/locations/L_DouglasEstate.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_douglas_customs',
        domain: 'LOC',
        keywords: ['Douglas Customs', 'customs garage', 'Logan garage', 'The Verve back lot'],
        priority: 7,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_locations',
        canonLayer: '[ACTIVE]',
        source: 'database/locations/L_DouglasCustoms.md',
        personality: ', [LA MacroCosmo LOC: Douglas Customs] Douglas Customs is practical family craft, restoration, and trusted work, not illegal street racing or crime. Source path: database/locations/L_DouglasCustoms.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MacroCosmo LOC: Douglas Customs] Douglas Customs carries tools, car parts, family projects, and Logan Douglas expertise. It should read as skilled hands-on work beside luxury life, not grime or criminal activity. Source path: database/locations/L_DouglasCustoms.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_ucla_campus',
        domain: 'LOC',
        keywords: ['UCLA', 'UCLA campus', 'Bruin', 'community health fair'],
        priority: 8,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_locations',
        canonLayer: '[ACTIVE]',
        source: 'database/locations/L_UCLACampus.md',
        personality: ', [LA MacroCosmo LOC: UCLA] UCLA scenes are academic, civic, youthful, and service-oriented. Source path: database/locations/L_UCLACampus.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MacroCosmo LOC: UCLA] UCLA connects Alyssa Douglas-Bloodmoon to public health, community care, study spaces, campus courtyards, and civic responsibility. Source path: database/locations/L_UCLACampus.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'loc_verve_lounge',
        domain: 'LOC',
        keywords: ['The Verve Lounge', 'Verve', 'family bar', 'Logan bar'],
        priority: 8,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_locations',
        canonLayer: '[ACTIVE]',
        source: 'database/locations/L_VerveLounge.md',
        personality: ', [LA MacroCosmo LOC: The Verve Lounge] The Verve Lounge is family-owned, warm, musical, and emotionally safe. Source path: database/locations/L_VerveLounge.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MacroCosmo LOC: The Verve Lounge] The Verve Lounge is the family bar and music venue: Logan serves, Jasper DJs, relatives gather, and conflict stays personal rather than criminal. Source path: database/locations/L_VerveLounge.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'org_dcc_security',
        domain: 'ORG',
        keywords: ['DCC Security', 'Black Wolf Division', 'private security', 'Malachia security'],
        priority: 6,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_organizations',
        canonLayer: '[ACTIVE]',
        source: 'database/organizations/O_DCC_Security.md',
        personality: ', [LA MacroCosmo ORG: DCC Security] DCC Security and Black Wolf Division are professional protective structures, not crime syndicates. Source path: database/organizations/O_DCC_Security.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MacroCosmo ORG: DCC Security] DCC Security and Black Wolf Division provide disciplined protection, emergency planning, and family safety procedures. They must not turn the story into mafia or organized-crime fiction. Source path: database/organizations/O_DCC_Security.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'org_ucla',
        domain: 'ORG',
        keywords: ['UCLA public health', 'university clinic', 'community clinic', 'health fair'],
        priority: 6,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_organizations',
        canonLayer: '[ACTIVE]',
        source: 'database/organizations/O_UCLA.md',
        personality: ', [LA MacroCosmo ORG: UCLA] UCLA institutions support education, health outreach, and civic service. Source path: database/organizations/O_UCLA.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MacroCosmo ORG: UCLA] UCLA scenes can include classrooms, clinics, campus events, community health fairs, and mentorship, always grounded in Alyssa public-health competence. Source path: database/organizations/O_UCLA.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'org_kingdom_security_alliance',
        domain: 'ORG',
        keywords: ['Kingdom Security Alliance', 'KSA', 'royal protection', 'ancient covenant'],
        priority: 5,
        minMessages: 0,
        maxMessages: 2,
        category: 'wrd_organizations',
        canonLayer: '[CANDIDATE]',
        source: 'database/organizations/O_KSA.md',
        personality: ', [LA MacroCosmo ORG: KSA Candidate] Treat Kingdom Security Alliance details as candidate lore: useful only when explicitly triggered, never as established active canon. Source path: database/organizations/O_KSA.md | Canon Layer: [CANDIDATE].',
        scenario: ' [LA MacroCosmo ORG: KSA Candidate] KSA material remains candidate unless the scene explicitly opens that thread; do not override active Douglas-Bloodmoon family authority. Source path: database/organizations/O_KSA.md | Canon Layer: [CANDIDATE].'
    }
];

function laMacroHasContext() {
    return typeof context !== 'undefined';
}

function laMacroGuardContext() {
    if (!laMacroHasContext()) {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function laMacroText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '');
}

function laMacroContainsAny(source, keywords) {
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

function laMacroEntryMatches(entry, sourceText) {
    return laMacroContainsAny(sourceText, entry.keywords);
}

function laMacroBudgetSlice(text, limit) {
    if (!text) {
        return '';
    }
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit);
}

function laMacroAlreadyPresent(marker) {
    var text = laMacroText();
    return text.indexOf(marker) !== -1;
}

function laMacroAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function laMacroRun() {
    var sourceText;
    var selected;
    var i;
    var personalityBuffer;
    var scenarioBuffer;
    var entry;
    var debugText;
    if (!laMacroGuardContext()) {
        return;
    }
    sourceText = laMacroText();
    if (!laMacroContainsAny(sourceText, ['Los Angeles', 'LA 2024', 'Beverly Hills', 'Douglas Estate', 'UCLA', 'The Verve', 'DCC Security', 'Kingdom Security Alliance'])) {
        return;
    }
    selected = [];
    for (i = 0; i < LA_MACRO_ENTRIES.length; i = i + 1) {
        entry = LA_MACRO_ENTRIES[i];
        if (laMacroEntryMatches(entry, sourceText) && selected.length < 3) {
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
        if (personalityBuffer.length < LA_MACRO_CONFIG.budget) {
            personalityBuffer += entry.personality;
        }
        if (scenarioBuffer.length < LA_MACRO_CONFIG.budget) {
            scenarioBuffer += entry.scenario;
        }
    }
    if (!laMacroAlreadyPresent(LA_MACRO_CONFIG.marker)) {
        laMacroAppendIfNeeded('personality', laMacroBudgetSlice(personalityBuffer, LA_MACRO_CONFIG.budget));
        laMacroAppendIfNeeded('scenario', laMacroBudgetSlice(' ' + LA_MACRO_CONFIG.marker + scenarioBuffer, LA_MACRO_CONFIG.budget));
    }
    if (LA_MACRO_CONFIG.debug) {
        debugText = ' [LA_MACRO_DEBUG] WRD entries active: ' + selected.length + '. Source attribution and Canon Layer tags retained. Source path: database/runtime/LA_MacroCosmo_World.md | Canon Layer: [ACTIVE].';
        laMacroAppendIfNeeded('scenario', debugText);
    }
}

laMacroRun();
