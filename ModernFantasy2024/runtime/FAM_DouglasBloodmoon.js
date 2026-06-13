/*
Douglas-Bloodmoon MicroCosmo family script.
Purpose: inject family authority, genealogy, visual reconciliation, and historical context only when family keywords appear.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var MF_FAMILY_CONFIG = {
    debug: false,
    budget: 1400,
    marker: '[MF_FAMILY_FAM]'
};

var MF_FAMILY_ENTRIES = [
    {
        id: 'fam_douglasbloodmoon_core',
        domain: 'FAM',
        keywords: ['Douglas-Bloodmoon', 'Douglas Bloodmoon', 'Bloodmoon', 'Douglas family', 'genealogy', 'Family Authority', 'surname authority'],
        priority: 10,
        minMessages: 0,
        maxMessages: 3,
        category: 'fam_core',
        canonLayer: '[ACTIVE]',
        source: 'database/families/F_DouglasBloodmoon.md',
        personality: ', [MF MicroCosmo FAM: Douglas-Bloodmoon] Douglas-Bloodmoon family scenes must preserve Family Authority genealogy and avoid NPC redefinition of lineage. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MicroCosmo FAM: Douglas-Bloodmoon] The Douglas-Bloodmoon MicroCosmo is a contemporary urban-fantasy family authority node: Erik Douglas, Nixara Bloodmoon as historical anchor, Malachia, Noah, Jasper, Logan, and Wulfnic Bloodmoon carry active or historical family roles. NPC records may reference family data but must not redefine it. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_authority_boundaries',
        domain: 'FAM',
        keywords: ['pack law', 'family law', 'blood law', 'authority', 'alpha authority', 'enigma authority'],
        priority: 9,
        minMessages: 0,
        maxMessages: 2,
        category: 'fam_authority',
        canonLayer: '[ACTIVE]',
        source: 'database/families/F_DouglasBloodmoon_Authority.md',
        personality: ', [MF MicroCosmo FAM: Authority] Treat hierarchy and authority as formal, emotionally charged, and source-limited. Source path: database/families/F_DouglasBloodmoon_Authority.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MicroCosmo FAM: Authority] Pack law, family decrees, and elder authority can shape scenes, but do not invent new relatives, alternate parents, or unsourced ranks. Source path: database/families/F_DouglasBloodmoon_Authority.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_surname_authority',
        domain: 'FAM',
        keywords: ['surname authority', 'Douglas surname', 'Bloodmoon surname', 'parent-child', 'bloodline'],
        priority: 9,
        minMessages: 0,
        maxMessages: 2,
        category: 'fam_authority',
        canonLayer: '[ACTIVE]',
        source: 'database/families/F_Surname_Authority.md',
        personality: ', [MF MicroCosmo FAM: Surname] Use Douglas and Bloodmoon surnames as family-authority markers, not casual decoration. Source path: database/families/F_Surname_Authority.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MicroCosmo FAM: Surname] Erik Douglas and Logan Douglas mark the paternal Douglas line; Nixara Bloodmoon and Wulfnic Bloodmoon mark the maternal Bloodmoon line. Do not invent alternate parents. Source path: database/families/F_Surname_Authority.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_nixara_historical_anchor',
        domain: 'FAM',
        keywords: ['Nixara', 'Nixara Bloodmoon', 'mother Nixara', 'died in childbirth', 'Nixara grief'],
        priority: 8,
        minMessages: 0,
        maxMessages: 2,
        category: 'fam_history',
        canonLayer: '[HISTORICAL]',
        source: 'database/historical/HC_NixaraBloodmoon.md',
        personality: ', [MF MicroCosmo FAM: Nixara] Nixara is a historical family anchor whose death informs grief and protection. Source path: database/historical/HC_NixaraBloodmoon.md | Canon Layer: [HISTORICAL].',
        scenario: ' [MF MicroCosmo FAM: Nixara] Nixara Bloodmoon belongs to historical context and family grief. Use her to explain Erik, family protection, and legacy pressure, not to impose traits on {{user}}. Source path: database/historical/HC_NixaraBloodmoon.md | Canon Layer: [HISTORICAL].'
    },
    {
        id: 'fam_visual_authority',
        domain: 'FAM',
        keywords: ['Visual Authority', 'Visual DNA', 'visual baseline', 'visual inheritance', 'visual reconciliation'],
        priority: 9,
        minMessages: 0,
        maxMessages: 3,
        category: 'fam_visual',
        canonLayer: '[ACTIVE]',
        source: 'database/visuals/V_Visual_Authority.md',
        personality: ', [MF MicroCosmo FAM: Visual Authority] Visual Authority controls active appearance and style while genealogy remains separate. Source path: database/visuals/V_Visual_Authority.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MicroCosmo FAM: Visual Authority] Visual Authority uses Visual_DNA and reconciliation records for appearance decisions. It must not redefine family authority or NPC genealogy. Source path: database/visuals/V_Visual_Authority.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_visual_reconciliation',
        domain: 'FAM',
        keywords: ['Wulfnic phenotype', 'Wulfnic blonde', 'blonde hair blue eyes', 'visual reconciliation', 'legacy silver-white'],
        priority: 8,
        minMessages: 0,
        maxMessages: 2,
        category: 'fam_visual',
        canonLayer: '[ACTIVE]',
        source: 'database/visuals/V_Visual_Reconciliation.md',
        personality: ', [MF MicroCosmo FAM: Visual Reconciliation] Active Wulfnic follows visual reconciliation: blonde hair, blue eyes, tall lean-strong presence. Source path: database/visuals/V_Visual_Reconciliation.md | Canon Layer: [ACTIVE].',
        scenario: ' [MF MicroCosmo FAM: Visual Reconciliation] Legacy silver-white Wulfnic variants are historical or rejected variants; active scenes should use the reconciled blonde/blue phenotype unless the scene explicitly labels a historical memory. Source path: database/visuals/V_Visual_Reconciliation.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_alyssa_candidate_guard',
        domain: 'FAM',
        keywords: ['Alyssa', 'Little Moon', 'White Moon', 'Moonstone', 'Omega', 'female'],
        priority: 5,
        minMessages: 0,
        maxMessages: 1,
        category: 'fam_candidate_guard',
        canonLayer: '[CANDIDATE]',
        source: 'database/persona/C_Alyssa_Candidate.md',
        personality: ', [MF MicroCosmo FAM: Alyssa Candidate Guard] Alyssa, female, Omega, Moonstone, and White Moon details are candidate legacy persona material only when explicitly established. Source path: database/persona/C_Alyssa_Candidate.md | Canon Layer: [CANDIDATE].',
        scenario: ' [MF MicroCosmo FAM: Alyssa Candidate Guard] Do not make Alyssa the default {{user}}. Use Alyssa, Omega, Moonstone, White Moon, or female-coded legacy details only when the USER persona or chat explicitly establishes them. Source path: database/persona/C_Alyssa_Candidate.md | Canon Layer: [CANDIDATE].'
    }
];

function mfFamilyHasContext() {
    return typeof context !== 'undefined';
}

function mfFamilyGuardContext() {
    if (!mfFamilyHasContext() || context === null || typeof context !== 'object') {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function mfFamilyText() {
    var lastMessage;
    lastMessage = '';
    if (context.chat && context.chat.last_message) {
        lastMessage = context.chat.last_message;
    }
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + lastMessage;
}

function mfFamilyContainsAny(source, keywords) {
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

function mfFamilyEntryMatches(entry, sourceText) {
    return mfFamilyContainsAny(sourceText, entry.keywords);
}

function mfFamilyBudgetSlice(text, limit) {
    if (!text) {
        return '';
    }
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit);
}

function mfFamilyAlreadyPresent(marker) {
    return mfFamilyText().indexOf(marker) !== -1;
}

function mfFamilyAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function mfFamilyRun() {
    var sourceText;
    var selected;
    var i;
    var entry;
    var personalityBuffer;
    var scenarioBuffer;
    var debugText;
    if (!mfFamilyGuardContext()) {
        return;
    }
    sourceText = mfFamilyText();
    if (!mfFamilyContainsAny(sourceText, ['Douglas-Bloodmoon', 'Douglas Bloodmoon', 'Bloodmoon', 'Douglas family', 'genealogy', 'Family Authority', 'surname authority', 'Visual Authority', 'Wulfnic', 'Nixara', 'Alyssa', 'Moonstone', 'White Moon'])) {
        return;
    }
    selected = [];
    for (i = 0; i < MF_FAMILY_ENTRIES.length; i = i + 1) {
        entry = MF_FAMILY_ENTRIES[i];
        if (mfFamilyEntryMatches(entry, sourceText) && selected.length < entry.maxMessages) {
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
    if (!mfFamilyAlreadyPresent(MF_FAMILY_CONFIG.marker)) {
        mfFamilyAppendIfNeeded('personality', mfFamilyBudgetSlice(personalityBuffer, MF_FAMILY_CONFIG.budget));
        mfFamilyAppendIfNeeded('scenario', mfFamilyBudgetSlice(' ' + MF_FAMILY_CONFIG.marker + scenarioBuffer, MF_FAMILY_CONFIG.budget));
    }
    if (MF_FAMILY_CONFIG.debug) {
        debugText = ' [MF_FAMILY_DEBUG] FAM entries active: ' + selected.length + '. Source attribution and Canon Layer tags retained. Source path: database/runtime/MF_MicroCosmo_Family.md | Canon Layer: [ACTIVE].';
        mfFamilyAppendIfNeeded('scenario', debugText);
    }
}

mfFamilyRun();
