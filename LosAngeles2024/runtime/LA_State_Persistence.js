/*
Los Angeles 2024 state-persistence helper script.
Purpose: parse visible state markers, normalize known keys, and append a reproducible state block when state keywords appear.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LA_STATE_CONFIG = {
    debug: false,
    marker: '[LA_STATE:visible]',
    closeMarker: '[/LA_STATE]',
    zeroMarker: '[LA_STATE:zero]',
    budget: 900
};

var LA_STATE_KEYS = ['sceneFocus', 'activeParticipants', 'flags', 'lastCanonSource'];

function laStateHasContext() {
    return typeof context !== 'undefined';
}

function laStateGuardContext() {
    if (!laStateHasContext()) {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function laStateText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '');
}

function laStateContainsAny(source, keywords) {
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

function laStateAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function laStateExtractVisible() {
    var text;
    var start;
    var end;
    text = laStateText();
    start = text.indexOf(LA_STATE_CONFIG.marker);
    if (start === -1) {
        return '';
    }
    start += LA_STATE_CONFIG.marker.length;
    end = text.indexOf(LA_STATE_CONFIG.closeMarker, start);
    if (end === -1) {
        return text.substring(start);
    }
    return text.substring(start, end);
}

function laStateTrimValue(value) {
    value = String(value || '');
    while (value.length > 0 && (value.charAt(0) === ' ' || value.charAt(0) === '\n' || value.charAt(0) === '\t')) {
        value = value.substring(1);
    }
    while (value.length > 0) {
        if (value.charAt(value.length - 1) === ' ' || value.charAt(value.length - 1) === '\n' || value.charAt(value.length - 1) === '\t' || value.charAt(value.length - 1) === ';') {
            value = value.substring(0, value.length - 1);
        } else {
            break;
        }
    }
    return value;
}

function laStateParseKeyValue(raw) {
    var parts;
    var state;
    var i;
    var pair;
    var split;
    var key;
    state = {};
    parts = raw.split(';');
    for (i = 0; i < parts.length; i = i + 1) {
        pair = parts[i];
        split = pair.indexOf('=');
        if (split !== -1) {
            key = laStateTrimValue(pair.substring(0, split));
            if (key.length > 0) {
                state[key] = laStateTrimValue(pair.substring(split + 1));
            }
        }
    }
    return state;
}

function laStateNormalize(state) {
    var normalized;
    var i;
    var key;
    var value;
    normalized = {};
    for (i = 0; i < LA_STATE_KEYS.length; i = i + 1) {
        key = LA_STATE_KEYS[i];
        value = state[key];
        if (typeof value === 'string' && value.length > 0 && value.length < 180) {
            normalized[key] = value;
        }
    }
    return normalized;
}

function laStateIsValid(state) {
    var i;
    var key;
    for (i = 0; i < LA_STATE_KEYS.length; i = i + 1) {
        key = LA_STATE_KEYS[i];
        if (state.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}

function laStateSerialize(state) {
    var text;
    var i;
    var key;
    text = '';
    for (i = 0; i < LA_STATE_KEYS.length; i = i + 1) {
        key = LA_STATE_KEYS[i];
        if (state.hasOwnProperty(key)) {
            text += key + '=' + state[key] + ';';
        }
    }
    return text;
}

function laStateEncodeZeroWidth(text) {
    var encoded;
    var i;
    var code;
    encoded = '';
    for (i = 0; i < text.length; i = i + 1) {
        code = text.charCodeAt(i);
        if (code === 48) {
            encoded += '\u200B';
        } else if (code === 49) {
            encoded += '\u200C';
        } else {
            encoded += text.charAt(i);
        }
    }
    return encoded;
}

function laStateDecodeZeroWidth(text) {
    var decoded;
    var i;
    var ch;
    decoded = '';
    for (i = 0; i < text.length; i = i + 1) {
        ch = text.charAt(i);
        if (ch === '\u200B') {
            decoded += '0';
        } else if (ch === '\u200C') {
            decoded += '1';
        } else {
            decoded += ch;
        }
    }
    return decoded;
}

function laStateRun() {
    var sourceText;
    var raw;
    var parsed;
    var normalized;
    var serialized;
    var visibleBlock;
    var zeroBlock;
    var debugText;
    if (!laStateGuardContext()) {
        return;
    }
    sourceText = laStateText();
    if (!laStateContainsAny(sourceText, ['state', 'flag', 'persist', 'update', LA_STATE_CONFIG.marker, LA_STATE_CONFIG.zeroMarker])) {
        return;
    }
    raw = laStateExtractVisible();
    parsed = laStateParseKeyValue(raw);
    normalized = laStateNormalize(parsed);
    if (!laStateIsValid(normalized)) {
        laStateAppendIfNeeded('scenario', ' [LA_STATE:VALIDATION] No valid LA_STATE keys found. Expected sceneFocus, activeParticipants, flags, or lastCanonSource. Source path: database/runtime/LA_State_Persistence.md | Canon Layer: [ACTIVE].');
        return;
    }
    serialized = laStateSerialize(normalized);
    visibleBlock = ' ' + LA_STATE_CONFIG.marker + serialized + LA_STATE_CONFIG.closeMarker + ' Source path: database/runtime/LA_State_Persistence.md | Canon Layer: [ACTIVE].';
    zeroBlock = ' ' + LA_STATE_CONFIG.zeroMarker + laStateEncodeZeroWidth(serialized) + '[/LA_STATE:zero] Source path: database/runtime/LA_State_Persistence.md | Canon Layer: [ACTIVE].';
    laStateAppendIfNeeded('personality', ', [LA_STATE:instruction] Preserve LA_STATE visible and zero-width blocks when they appear in AI output. Reproduce state exactly unless the scene changes it with a sourced update. Source path: database/runtime/LA_State_Persistence.md | Canon Layer: [ACTIVE].');
    laStateAppendIfNeeded('scenario', visibleBlock);
    laStateAppendIfNeeded('scenario', zeroBlock);
    if (LA_STATE_CONFIG.debug) {
        debugText = ' [LA_STATE_DEBUG] Decoded zero-width sample: ' + laStateDecodeZeroWidth(laStateEncodeZeroWidth(serialized)) + '. Source path: database/runtime/LA_State_Persistence.md | Canon Layer: [ACTIVE].';
        laStateAppendIfNeeded('scenario', debugText);
    }
}

laStateRun();
