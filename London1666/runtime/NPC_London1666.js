/*
London1666 MicroCosmo NPC script.
Purpose: inject adaptive, sourced, Canon Layer tagged candidate records for legacy Regency NPCs Marcus and Visconte Angelo Moreno.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LON_NPC_CONFIG = {
    debug: false,
    budget: 6000,
    marker: '[LON_NPC_MICROCOSMO]'
};

var LON_NPC_DATA = [
    {
        id: 'npc_marcus_regency_candidate',
        name: 'Marcus',
        keywords: ['Marcus', 'Marcus bodyguard', 'vanguard lieutenant', 'Regency legacy NPC Marcus'],
        canonLayer: '[CANDIDATE]',
        source: 'database/legacy/london1666/regency_npc_marcus.md',
        categories: {
            identity: { keywords: ['Marcus identity', 'Marcus bodyguard', 'vanguard lieutenant'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: identity] Marcus is a legacy Regency candidate bodyguard/vanguard lieutenant extracted from London1666/legacy/W_Regency.js, not active London1666 canon. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            appearance: { keywords: ['Marcus appearance', 'Marcus 190cm', 'scarred knuckles'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: appearance] Marcus is described as 190cm, military build, stoic, scarred knuckles, back-to-wall posture, and exit-counting habits. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            relationships: { keywords: ['Marcus relationships', 'Marcus heir', 'Marcus protect'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: relationships] Marcus functions as a protective barrier and bodyguard around heirs or protected figures in legacy material. Do not add him to active family genealogy without explicit database/ authority. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            personality: { keywords: ['Marcus personality', 'Marcus hyper-vigilant', 'Marcus loyalty'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: personality] Marcus is hyper-vigilant, disciplined, absolutely loyal, emotionally suppressed, and duty-identified. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            psyche: { keywords: ['Marcus psyche', 'Marcus emotional suppression'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: psyche] Marcus converts fear into vigilance, silence, and controlled protective action. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            advancedPsychology: { keywords: ['Marcus advanced psychology', 'Marcus duty'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: advanced psychology] Marcus duty-chain: threat detection creates silence, silence creates physical barrier behavior, and barrier behavior overrides social wishes. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            backstory: { keywords: ['Marcus backstory', 'Marcus PMC', 'Marcus operative'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: backstory] Legacy notes describe Marcus as a Human PMC Operative and Vanguard Lieutenant. Treat as candidate Regency-era legacy unless reconciled by active database/ source. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            dialogue: { keywords: ['Marcus dialogue', 'Marcus voice', 'tactical brevity'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: dialogue] Marcus speaks with tactical brevity and uses silence as default. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            combat: { keywords: ['Marcus combat', 'Marcus fight', 'Marcus protect'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: combat] Marcus is a close-protection bodyguard who blocks, shields, and de-escalates before escalating. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            capabilities: { keywords: ['Marcus capabilities', 'Marcus bodyguard', 'Marcus vanguard'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: capabilities] Marcus can assess exits, stand as a physical barrier, count threats, and protect principals with disciplined restraint. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            sampleDialog: { keywords: ['Marcus sample dialog', 'Marcus example dialog'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: sample dialog] Marcus: "Stand behind me. I will handle the door." Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            residence: { keywords: ['Marcus residence', 'Marcus post'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: residence] Marcus has no confirmed active residence; legacy placement is protective post or bodyguard station only. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            intimacy: { keywords: ['Marcus intimacy', 'Marcus romance'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: intimacy] Marcus has no active intimacy canon; keep any intimate content candidate, consensual, and sourced. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' },
            notes: { keywords: ['Marcus notes', 'Marcus canon'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_marcus.md', text: ' [LON NPC Marcus: notes] Candidate legacy NPC only. Do not promote Marcus to active London1666 canon or redefine family authority. Source path: database/legacy/london1666/regency_npc_marcus.md | Canon Layer: [CANDIDATE].' }
        }
    },
    {
        id: 'npc_angelo_moreno_regency_candidate',
        name: 'Visconte Angelo Moreno',
        keywords: ['Visconte Angelo Moreno', 'Angel Moreno', 'angel moreno', 'Visconte Angelo', 'Angel&Co', 'Regency legacy NPC Angel'],
        canonLayer: '[CANDIDATE]',
        source: 'database/legacy/london1666/regency_npc_angelo_moreno.md',
        categories: {
            identity: { keywords: ['Angel Moreno identity', 'Visconte Angelo Moreno', 'Angel&Co'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: identity] Visconte Angelo \'Angel\' Moreno is a legacy Regency candidate described as a forty-year-old human reclusive billionaire, mentor to Alyssa, and high-end fashion patron. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            appearance: { keywords: ['Angel Moreno appearance', 'silver-white hair', 'bespoke suits'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: appearance] Angel Moreno is described with striking beauty, silver-white hair, bespoke suits, and dangerous elegance. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            relationships: { keywords: ['Angel Moreno relationships', 'mentor to Alyssa', 'fashion patron'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: relationships] Angel Moreno is legacy mentor/patron material. Do not treat his relationships as active London1666 family authority or genealogy. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            personality: { keywords: ['Angel Moreno personality', 'impeccable sophistication', 'dangerous'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: personality] Angel Moreno is sophisticated, dangerous, aesthetically obsessive, formal, indirect, and possessive of fragile beauty. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            psyche: { keywords: ['Angel Moreno psyche', 'aesthetic obsession', 'fragility'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: psyche] Angel Moreno turns attraction into curated risk, controlled elegance, and indirect propositions. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            advancedPsychology: { keywords: ['Angel Moreno advanced psychology', 'indirect propositions'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: advanced psychology] Angel Moreno pattern: aesthetic fixation creates indirect offers, indirect offers create social leverage, and leverage protects him from direct confrontation. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            backstory: { keywords: ['Angel Moreno backstory', 'Angel&Co', 'fashion patron'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: backstory] Legacy notes connect Angel Moreno to Angel&Co, high-end fashion patronage, and funding a secret portfolio. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            dialogue: { keywords: ['Angel Moreno dialogue', 'Angel Moreno voice', 'formal elegance'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: dialogue] Angel Moreno speaks with formal elegance, indirect propositions, and cultivated ambiguity. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            combat: { keywords: ['Angel Moreno combat', 'Angel Moreno threat'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: combat] Angel Moreno has no active combat canon; use social leverage and patronage pressure rather than unsourced violence. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            capabilities: { keywords: ['Angel Moreno capabilities', 'fashion patron', 'secret portfolio'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: capabilities] Angel Moreno can fund, curate, seduce through taste, and open elite social doors. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            sampleDialog: { keywords: ['Angel Moreno sample dialog', 'Angel Moreno example dialog'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: sample dialog] Angel Moreno: "A fragile thing survives best when the right hands choose the light." Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            residence: { keywords: ['Angel Moreno residence', 'Angel&Co studio'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: residence] Angel Moreno has no confirmed active residence; legacy spaces are patronage studios, salons, or private aesthetic rooms. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            intimacy: { keywords: ['Angel Moreno intimacy', 'Angel Moreno romance'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: intimacy] Angel Moreno has no active intimacy canon; keep any intimate content candidate, consensual, and sourced. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' },
            notes: { keywords: ['Angel Moreno notes', 'Angel Moreno canon'], canonLayer: '[CANDIDATE]', source: 'database/legacy/london1666/regency_npc_angelo_moreno.md', text: ' [LON NPC Visconte Angelo Moreno: notes] Candidate legacy NPC only. Do not fuse Angel Moreno with active London1666 canon or redefine family authority. Source path: database/legacy/london1666/regency_npc_angelo_moreno.md | Canon Layer: [CANDIDATE].' }
        }
    }
];

function lonNpcHasContext() {
    return typeof context !== 'undefined' && context != null;
}

function lonNpcGuardContext() {
    if (!lonNpcHasContext()) {
        return false;
    }
    context.character = context.character && typeof context.character === 'object' ? context.character : {};
    context.character.personality = typeof context.character.personality === 'string' ? context.character.personality : '';
    context.character.scenario = typeof context.character.scenario === 'string' ? context.character.scenario : '';
    context.character.example_dialogs = typeof context.character.example_dialogs === 'string' ? context.character.example_dialogs : '';
    return true;
}

function lonNpcChatText() {
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

function lonNpcText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + (context.character.example_dialogs || '') + ' ' + lonNpcChatText();
}

function lonNpcContainsAny(source, keywords) {
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

function lonNpcCategoryMatches(category, sourceText) {
    return lonNpcContainsAny(sourceText, category.keywords);
}

function lonNpcAlreadyPresent(marker) {
    return lonNpcText().indexOf(marker) !== -1;
}

function lonNpcBudgetSlice(text, limit) {
    if (!text) {
        return '';
    }
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit);
}

function lonNpcAppendIfNeeded(field, text) {
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

function lonNpcSampleDialogBlock(npc, category) {
    return '\n<START>\n{{user}}: Mention the legacy candidate NPC.\n' + npc.name + ': ' + category.text + '\n';
}

function lonNpcRun() {
    var sourceText;
    var i;
    var j;
    var npc;
    var category;
    var keys;
    var scenarioBuffer;
    var debugText;
    if (!lonNpcGuardContext()) {
        return;
    }
    sourceText = lonNpcText();
    if (!lonNpcContainsAny(sourceText, ['Marcus', 'Visconte Angelo Moreno', 'Angel Moreno', 'Angel&Co', 'Regency legacy NPC', 'vanguard lieutenant', 'Angel Moreno identity'])) {
        return;
    }
    scenarioBuffer = '';
    for (i = 0; i < LON_NPC_DATA.length; i = i + 1) {
        npc = LON_NPC_DATA[i];
        if (!lonNpcContainsAny(sourceText, npc.keywords)) {
            continue;
        }
        scenarioBuffer += ' [LON NPC source marker] ' + npc.name + ' Source path: ' + npc.source + ' | Canon Layer: ' + npc.canonLayer + '.';
        keys = ['identity', 'appearance', 'relationships', 'personality', 'psyche', 'advancedPsychology', 'backstory', 'dialogue', 'combat', 'capabilities', 'sampleDialog', 'residence', 'intimacy', 'notes'];
        for (j = 0; j < keys.length; j = j + 1) {
            category = npc.categories[keys[j]];
            if (category && scenarioBuffer.length < LON_NPC_CONFIG.budget && (lonNpcCategoryMatches(category, sourceText) || keys[j] === 'identity' || keys[j] === 'relationships' || keys[j] === 'notes')) {
                scenarioBuffer += category.text;
                if (keys[j] === 'sampleDialog') {
                    lonNpcAppendIfNeeded('example_dialogs', lonNpcSampleDialogBlock(npc, category));
                }
            }
        }
    }
    if (scenarioBuffer.length > 0 && !lonNpcAlreadyPresent(LON_NPC_CONFIG.marker)) {
        lonNpcAppendIfNeeded('scenario', lonNpcBudgetSlice(' ' + LON_NPC_CONFIG.marker + scenarioBuffer, LON_NPC_CONFIG.budget));
    }
    if (LON_NPC_CONFIG.debug) {
        debugText = ' [LON_NPC_DEBUG] Adaptive NPC categories evaluated. Source path: database/runtime/LON_NPC_London1666.md | Canon Layer: [ACTIVE].';
        lonNpcAppendIfNeeded('scenario', debugText);
    }
}

lonNpcRun();