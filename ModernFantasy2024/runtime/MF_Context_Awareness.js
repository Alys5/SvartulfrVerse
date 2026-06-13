/*
ModernFantasy2024 context-awareness script.
Purpose: read the available runtime budget and append a compact detail-level hint when budget keywords appear.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var MF_AWARENESS_CONFIG = {
    debug: false,
    marker: '[MF_BUDGET_AWARENESS]',
    defaultPerScript: 160,
    source: 'database/runtime/MF_Context_Awareness.md',
    canonLayer: '[ACTIVE]'
};

function mfAwarenessHasContext() {
    return typeof context !== 'undefined';
}

function mfAwarenessGuardContext() {
    if (!mfAwarenessHasContext() || context === null || typeof context !== 'object') {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function mfAwarenessText() {
    var lastMessage;
    lastMessage = '';
    if (context.chat && context.chat.last_message) {
        lastMessage = context.chat.last_message;
    }
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + lastMessage;
}

function mfAwarenessContainsAny(source, keywords) {
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

function mfAwarenessAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function mfAwarenessParseBudget(source) {
    var match;
    match = String(source || '').match(/\[MF_CONTEXT_BUDGET\]\s*tier=(\d+)\s+context=(\d+)\s+total=(\d+)\s+scripts=(\d+)\s+per_script=(\d+)/i);
    if (!match) {
        match = String(source || '').match(/\[CONTEXT\s+BUDGET:\s*tier=(\d+)\s+context=(\d+)\s+total=(\d+)\s+scripts=(\d+)\s+per_script=(\d+)\]/i);
    }
    if (!match) {
        return null;
    }
    return {
        tier: parseInt(match[1], 10),
        context: parseInt(match[2], 10),
        total: parseInt(match[3], 10),
        scripts: parseInt(match[4], 10),
        perScript: parseInt(match[5], 10)
    };
}

function mfAwarenessDetailLevel(tokens) {
    if (tokens >= 300) {
        return 'full';
    }
    if (tokens >= 120) {
        return 'summary';
    }
    return 'bullet';
}

function mfAwarenessRun() {
    var sourceText;
    var budget;
    var perScript;
    var detail;
    var awarenessText;
    var debugText;
    if (!mfAwarenessGuardContext()) {
        return;
    }
    sourceText = mfAwarenessText();
    if (!mfAwarenessContainsAny(sourceText, ['budget', 'tokens', 'per_script', 'MF_CONTEXT_BUDGET', '/budget'])) {
        return;
    }
    budget = mfAwarenessParseBudget(sourceText);
    perScript = budget && budget.perScript > 0 ? budget.perScript : MF_AWARENESS_CONFIG.defaultPerScript;
    detail = mfAwarenessDetailLevel(perScript);
    awarenessText = ' ' + MF_AWARENESS_CONFIG.marker + ' detail=' + detail + ' per_script=' + perScript + ' Source path: ' + MF_AWARENESS_CONFIG.source + ' | Canon Layer: ' + MF_AWARENESS_CONFIG.canonLayer + '.';
    mfAwarenessAppendIfNeeded('scenario', awarenessText);
    if (MF_AWARENESS_CONFIG.debug) {
        debugText = ' [MF_BUDGET_DEBUG] Context budget awareness checked. Source path: database/runtime/MF_Context_Awareness.md | Canon Layer: [ACTIVE].';
        mfAwarenessAppendIfNeeded('scenario', debugText);
    }
}

mfAwarenessRun();
