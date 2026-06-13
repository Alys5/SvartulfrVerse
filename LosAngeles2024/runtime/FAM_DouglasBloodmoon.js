/*
Douglas-Bloodmoon MicroCosmo family script.
Purpose: inject family authority, dynasty history, and visual inheritance only when family keywords appear.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LA_FAMILY_CONFIG = {
    debug: false,
    budget: 1200,
    marker: '[LA_FAMILY_FAM]'
};

var LA_FAMILY_ENTRIES = [
    {
        id: 'fam_douglasbloodmoon_core',
        domain: 'FAM',
        keywords: ['Douglas-Bloodmoon', 'Douglas Bloodmoon', 'Bloodmoon', 'Douglas family', 'dynasty'],
        priority: 10,
        minMessages: 0,
        maxMessages: 3,
        category: 'fam_core',
        canonLayer: '[ACTIVE]',
        source: 'database/families/F_DouglasBloodmoon.md',
        personality: ', [LA MicroCosmo FAM: Douglas-Bloodmoon] Douglas-Bloodmoon family scenes must preserve active genealogy: Erik Douglas and Nixara Bloodmoon are parents; Alyssa and Jasper are twins; Malachia and Noah are brothers; Logan is Erik brother; Wulfnic is Nixara father. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MicroCosmo FAM: Douglas-Bloodmoon] The Douglas-Bloodmoon dynasty is a contemporary Beverly Hills family with Douglas and Bloodmoon lines, family warmth, wealth, service, protection, and public reputation. Genealogy is owned by the Family Authority; NPC records reference it and must not redefine it. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_surname_authority',
        domain: 'FAM',
        keywords: ['surname authority', 'Family Authority', 'genealogy', 'parent-child', 'bloodline'],
        priority: 9,
        minMessages: 0,
        maxMessages: 2,
        category: 'fam_authority',
        canonLayer: '[ACTIVE]',
        source: 'database/families/F_Surname_Authority.md',
        personality: ', [LA MicroCosmo FAM: Surname Authority] Use surnames as family-authority markers: Douglas paternal line, Bloodmoon maternal line, Douglas-Bloodmoon children. Source path: database/families/F_Surname_Authority.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MicroCosmo FAM: Surname Authority] Surname handling is authoritative family data: Erik Douglas, Logan Douglas, Nixara Bloodmoon, Wulfnic Bloodmoon, and children Alyssa/Jasper/Malachia/Noah Douglas-Bloodmoon. Do not invent alternate parents or siblings. Source path: database/families/F_Surname_Authority.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_parent_child_authority',
        domain: 'FAM',
        keywords: ['Erik Douglas', 'Nixara Bloodmoon', 'Alyssa Douglas-Bloodmoon', 'Jasper Douglas-Bloodmoon', 'Malachia Douglas-Bloodmoon', 'Noah Douglas-Bloodmoon'],
        priority: 9,
        minMessages: 0,
        maxMessages: 3,
        category: 'fam_authority',
        canonLayer: '[ACTIVE]',
        source: 'database/families/F_Parent_Child.md',
        personality: ', [LA MicroCosmo FAM: Parent-Child] Treat Erik Douglas and Nixara Bloodmoon as the active parental authority for Alyssa, Jasper, Malachia, and Noah Douglas-Bloodmoon. Source path: database/families/F_Parent_Child.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MicroCosmo FAM: Parent-Child] Parent-child authority is fixed: Erik Douglas and Nixara Bloodmoon parent Alyssa, Jasper, Malachia, and Noah Douglas-Bloodmoon. Logan is uncle; Wulfnic is maternal grandfather. Source path: database/families/F_Parent_Child.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_historical_commercial_lineage',
        domain: 'FAM',
        keywords: ['commercial lineage', 'Douglas commercial', 'family business history', 'historic Douglas'],
        priority: 6,
        minMessages: 0,
        maxMessages: 2,
        category: 'fam_history',
        canonLayer: '[HISTORICAL]',
        source: 'database/historical/HC_Douglas_Commercial_Lineage.md',
        personality: ', [LA MicroCosmo FAM: Historical Lineage] Historical Douglas commercial lineage may inform wealth and work ethic, but active scenes should focus on present family life. Source path: database/historical/HC_Douglas_Commercial_Lineage.md | Canon Layer: [HISTORICAL].',
        scenario: ' [LA MicroCosmo FAM: Historical Lineage] Historical commercial lineage explains Douglas family resources and discipline. It should not displace active contemporary Beverly Hills canon. Source path: database/historical/HC_Douglas_Commercial_Lineage.md | Canon Layer: [HISTORICAL].'
    },
    {
        id: 'fam_edric_aettfadir_svartulfa',
        domain: 'FAM',
        keywords: ['Edric Aettfadir Svartulfa', 'Aettfadir', 'Svartulfa', 'ancient Bloodmoon', 'maternal ancestor'],
        priority: 5,
        minMessages: 0,
        maxMessages: 2,
        category: 'fam_history',
        canonLayer: '[HISTORICAL]',
        source: 'database/historical/HC_Edric_Aettfadir_Svartulfa.md',
        personality: ', [LA MicroCosmo FAM: Historical Bloodmoon] Edric Aettfadir Svartulfa is historical Bloodmoon ancestry, not active scene identity. Source path: database/historical/HC_Edric_Aettfadir_Svartulfa.md | Canon Layer: [HISTORICAL].',
        scenario: ' [LA MicroCosmo FAM: Historical Bloodmoon] Edric Aettfadir Svartulfa belongs to historical ancestry and maternal Bloodmoon resonance. Use only when the scene explicitly invokes ancient lineage or Wulfnic legacy. Source path: database/historical/HC_Edric_Aettfadir_Svartulfa.md | Canon Layer: [HISTORICAL].'
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
        personality: ', [LA MicroCosmo FAM: Visual Authority] Visual Authority controls active appearance and style. Follow V_Visual_DNA.md and V_Visual_Reconciliation.md for active phenotype decisions. Source path: database/visuals/V_Visual_Authority.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MicroCosmo FAM: Visual Authority] Visual Authority is separate from genealogy. It sets style and phenotype while family records remain the only genealogy source. Source path: database/visuals/V_Visual_Authority.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_visual_baseline',
        domain: 'FAM',
        keywords: ['Erik black hair', 'Wulfnic blonde', 'Logan dark brown', 'Malachia black hair', 'Noah blonde', 'Alyssa caramel-brown', 'Jasper caramel-brown'],
        priority: 8,
        minMessages: 0,
        maxMessages: 3,
        category: 'fam_visual',
        canonLayer: '[ACTIVE]',
        source: 'database/visuals/V_Visual_Baseline.md',
        personality: ', [LA MicroCosmo FAM: Visual Baseline] Use active visual baselines: Erik black hair with silver streaks and amber eyes; Wulfnic blonde hair and blue eyes; Logan dark brown hair and hazel eyes; Malachia black hair and amber eyes; Noah blonde hair and blue eyes; Alyssa and Jasper caramel-brown hair and mint green eyes. Source path: database/visuals/V_Visual_Baseline.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MicroCosmo FAM: Visual Baseline] Active visual baseline resolves family appearance: Douglas black/amber, Bloodmoon blonde/blue, Malachia Douglas-dominant, Noah Bloodmoon-dominant, Alyssa and Jasper fusion-visual. Source path: database/visuals/V_Visual_Baseline.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_visual_inheritance',
        domain: 'FAM',
        keywords: ['fusion-visual', 'Douglas-visual-dominant', 'Bloodmoon-visual-dominant', 'Nixara resemblance'],
        priority: 8,
        minMessages: 0,
        maxMessages: 3,
        category: 'fam_visual',
        canonLayer: '[ACTIVE]',
        source: 'database/visuals/V_Visual_Inheritance.md',
        personality: ', [LA MicroCosmo FAM: Visual Inheritance] Visual inheritance is appearance only: Malachia is Douglas-visual-dominant, Noah is Bloodmoon-visual-dominant, Alyssa and Jasper are fusion-visual twins. Source path: database/visuals/V_Visual_Inheritance.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MicroCosmo FAM: Visual Inheritance] Alyssa and Jasper share twin fusion visuals: caramel-brown hair, mint green eyes, warm skin, expressive faces. Malachia is black-haired amber-eyed Douglas-dominant; Noah is blonde blue-eyed Bloodmoon-dominant. Source path: database/visuals/V_Visual_Inheritance.md | Canon Layer: [ACTIVE].'
    },
    {
        id: 'fam_visual_reconciliation',
        domain: 'FAM',
        keywords: ['Wulfnic silver-white', 'Wulfnic blonde', 'visual reconciliation', 'Wulfnic phenotype'],
        priority: 8,
        minMessages: 0,
        maxMessages: 2,
        category: 'fam_visual',
        canonLayer: '[ACTIVE]',
        source: 'database/visuals/V_Visual_Reconciliation.md',
        personality: ', [LA MicroCosmo FAM: Visual Reconciliation] Wulfnic Bloodmoon active phenotype is blonde hair and blue eyes. Legacy silver-white hair or eyes are historical variants and must not appear as active canon. Source path: database/visuals/V_Visual_Reconciliation.md | Canon Layer: [ACTIVE].',
        scenario: ' [LA MicroCosmo FAM: Visual Reconciliation] Visual reconciliation rejects legacy silver-white Wulfnic variants for active output. Active Wulfnic is blonde-haired, blue-eyed, 195 cm, lean-strong, ancestral nobility. Source path: database/visuals/V_Visual_Reconciliation.md | Canon Layer: [ACTIVE].'
    }
];

function laFamilyHasContext() {
    return typeof context !== 'undefined';
}

function laFamilyGuardContext() {
    if (!laFamilyHasContext()) {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function laFamilyText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '');
}

function laFamilyContainsAny(source, keywords) {
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

function laFamilyEntryMatches(entry, sourceText) {
    return laFamilyContainsAny(sourceText, entry.keywords);
}

function laFamilyBudgetSlice(text, limit) {
    if (!text) {
        return '';
    }
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit);
}

function laFamilyAlreadyPresent(marker) {
    return laFamilyText().indexOf(marker) !== -1;
}

function laFamilyAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function laFamilyRun() {
    var sourceText;
    var selected;
    var i;
    var entry;
    var personalityBuffer;
    var scenarioBuffer;
    var debugText;
    if (!laFamilyGuardContext()) {
        return;
    }
    sourceText = laFamilyText();
    if (!laFamilyContainsAny(sourceText, ['Douglas-Bloodmoon', 'Douglas Bloodmoon', 'Bloodmoon', 'Douglas family', 'genealogy', 'surname authority', 'Visual Authority', 'Wulfnic'])) {
        return;
    }
    selected = [];
    for (i = 0; i < LA_FAMILY_ENTRIES.length; i = i + 1) {
        entry = LA_FAMILY_ENTRIES[i];
        if (laFamilyEntryMatches(entry, sourceText) && selected.length < 3) {
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
    if (!laFamilyAlreadyPresent(LA_FAMILY_CONFIG.marker)) {
        laFamilyAppendIfNeeded('personality', laFamilyBudgetSlice(personalityBuffer, LA_FAMILY_CONFIG.budget));
        laFamilyAppendIfNeeded('scenario', laFamilyBudgetSlice(' ' + LA_FAMILY_CONFIG.marker + scenarioBuffer, LA_FAMILY_CONFIG.budget));
    }
    if (LA_FAMILY_CONFIG.debug) {
        debugText = ' [LA_FAMILY_DEBUG] FAM entries active: ' + selected.length + '. Source attribution and Canon Layer tags retained. Source path: database/runtime/LA_MicroCosmo_Dynasty.md | Canon Layer: [ACTIVE].';
        laFamilyAppendIfNeeded('scenario', debugText);
    }
}

laFamilyRun();
