/*
ModernFantasy2024 state-persistence helper script.
Purpose: parse visible MF_STATE markers, normalize known keys, validate sources, and append reproducible visible and zero-width state blocks.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var MF_STATE_CONFIG = {
    debug: false,
    marker: '[MF_STATE:visible]',
    closeMarker: '[/MF_STATE]',
    zeroMarker: '[MF_STATE:zero]',
    zeroCloseMarker: '[/MF_STATE:zero]',
    validationMarker: '[MF_STATE:VALIDATION]',
    instructionMarker: '[MF_STATE:instruction]',
    source: 'database/state/MF_State_Persistence.md',
    canonLayer: '[ACTIVE]'
};

var MF_STATE_KEYS = ['sceneFocus', 'activeParticipants', 'flags', 'lastCanonSource'];

function mfStateHasContext() {
    return typeof context !== 'undefined';
}

function mfStateGuardContext() {
    if (!mfStateHasContext() || context === null || typeof context !== 'object') {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function mfStateText() {
    var lastMessage;
    lastMessage = '';
    if (context.chat && context.chat.last_message) {
        lastMessage = context.chat.last_message;
    }
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + lastMessage;
}

function mfStateContainsAny(source, keywords) {
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

function mfStateAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function mfStateTrimValue(value) {
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

function mfStateParseKeyValue(raw) {
    var parts;
    var state;
    var i;
    var pair;
    var split;
    var key;
    state = {};
    parts = String(raw || '').split(';');
    for (i = 0; i < parts.length; i = i + 1) {
        pair = parts[i];
        split = pair.indexOf('=');
        if (split !== -1) {
            key = mfStateTrimValue(pair.substring(0, split));
            if (key.length > 0 && /^[A-Za-z0-9_]+$/.test(key)) {
                state[key] = mfStateTrimValue(pair.substring(split + 1));
            }
        }
    }
    return state;
}

function mfStateNormalize(state) {
    var normalized;
    var i;
    var key;
    var value;
    normalized = {};
    for (i = 0; i < MF_STATE_KEYS.length; i = i + 1) {
        key = MF_STATE_KEYS[i];
        value = state[key];
        if (typeof value === 'string' && value.length > 0 && value.length < 180) {
            normalized[key] = value;
        }
    }
    return normalized;
}

function mfStateIsValid(state) {
    var i;
    var key;
    for (i = 0; i < MF_STATE_KEYS.length; i = i + 1) {
        key = MF_STATE_KEYS[i];
        if (state.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}

function mfStateSourceValid(source) {
    return typeof source === 'string' && source.substring(0, 9) === 'database/' && source.indexOf('database_old') === -1;
}

function mfStateValidate(state) {
    if (!mfStateIsValid(state)) {
        return 'missing required key';
    }
    if (!mfStateSourceValid(state.lastCanonSource)) {
        return 'bad lastCanonSource';
    }
    return '';
}

function mfStateSerialize(state) {
    var text;
    var i;
    var key;
    text = '';
    for (i = 0; i < MF_STATE_KEYS.length; i = i + 1) {
        key = MF_STATE_KEYS[i];
        if (state.hasOwnProperty(key)) {
            text += key + '=' + state[key] + ';';
        }
    }
    return text;
}

function mfStateExtractVisible() {
    var text;
    var start;
    var end;
    text = mfStateText();
    start = text.indexOf(MF_STATE_CONFIG.marker);
    if (start === -1) {
        return '';
    }
    start += MF_STATE_CONFIG.marker.length;
    end = text.indexOf(MF_STATE_CONFIG.closeMarker, start);
    if (end === -1) {
        return text.substring(start);
    }
    return text.substring(start, end);
}

function mfStateEncodeZeroWidth(text) {
    var encoded;
    var i;
    var code;
    var zeroChars;
    zeroChars = ['\u200B', '\u200C', '\u200D', '\uFEFF', '\u2060', '\u2061', '\u2062', '\u2063', '\u200E', '\u200F'];
    encoded = '';
    for (i = 0; i < text.length; i = i + 1) {
        code = text.charCodeAt(i);
        if (code >= 48 && code <= 57) {
            encoded += zeroChars[code - 48];
        } else {
            encoded += text.charAt(i);
        }
    }
    return encoded;
}

function mfStateDecodeZeroWidth(text) {
    var decoded;
    var i;
    var ch;
    var zeroChars;
    zeroChars = ['\u200B', '\u200C', '\u200D', '\uFEFF', '\u2060', '\u2061', '\u2062', '\u2063', '\u200E', '\u200F'];
    decoded = '';
    for (i = 0; i < text.length; i = i + 1) {
        ch = text.charAt(i);
        if (ch === zeroChars[0]) {
            decoded += '0';
        } else if (ch === zeroChars[1]) {
            decoded += '1';
        } else if (ch === zeroChars[2]) {
            decoded += '2';
        } else if (ch === zeroChars[3]) {
            decoded += '3';
        } else if (ch === zeroChars[4]) {
            decoded += '4';
        } else if (ch === zeroChars[5]) {
            decoded += '5';
        } else if (ch === zeroChars[6]) {
            decoded += '6';
        } else if (ch === zeroChars[7]) {
            decoded += '7';
        } else if (ch === zeroChars[8]) {
            decoded += '8';
        } else if (ch === zeroChars[9]) {
            decoded += '9';
        } else {
            decoded += ch;
        }
    }
    return decoded;
}

function mfStateExtractZero() {
    var text;
    var start;
    var end;
    var inner;
    text = mfStateText();
    start = text.indexOf(MF_STATE_CONFIG.zeroMarker);
    if (start === -1) {
        return null;
    }
    start += MF_STATE_CONFIG.zeroMarker.length;
    end = text.indexOf(MF_STATE_CONFIG.zeroCloseMarker, start);
    if (end === -1) {
        inner = text.substring(start);
    } else {
        inner = text.substring(start, end);
    }
    return mfStateParseKeyValue(mfStateDecodeZeroWidth(inner));
}

function mfStateRun() {
    var sourceText;
    var raw;
    var parsed;
    var normalized;
    var serialized;
    var error;
    var visibleBlock;
    var zeroBlock;
    var debugText;
    if (!mfStateGuardContext()) {
        return;
    }
    sourceText = mfStateText();
    if (!mfStateContainsAny(sourceText, ['MF_STATE', 'state update', 'persist', 'flag'])) {
        return;
    }
    raw = mfStateExtractVisible();
    parsed = mfStateParseKeyValue(raw);
    normalized = mfStateNormalize(parsed);
    if (raw.length === 0) {
        raw = mfStateExtractZero();
        parsed = raw || {};
        normalized = mfStateNormalize(parsed);
    }
    error = mfStateValidate(normalized);
    if (error.length > 0) {
        mfStateAppendIfNeeded('scenario', ' ' + MF_STATE_CONFIG.validationMarker + ' Invalid MF_STATE: ' + error + '. Expected sceneFocus, activeParticipants, flags, and lastCanonSource starting with database/. Source path: database/state/MF_State_Persistence.md | Canon Layer: [ACTIVE].');
        return;
    }
    serialized = mfStateSerialize(normalized);
    visibleBlock = ' ' + MF_STATE_CONFIG.marker + serialized + MF_STATE_CONFIG.closeMarker + ' Source path: ' + MF_STATE_CONFIG.source + ' | Canon Layer: ' + MF_STATE_CONFIG.canonLayer + '.';
    zeroBlock = ' ' + MF_STATE_CONFIG.zeroMarker + mfStateEncodeZeroWidth(serialized) + MF_STATE_CONFIG.zeroCloseMarker + ' Source path: ' + MF_STATE_CONFIG.source + ' | Canon Layer: ' + MF_STATE_CONFIG.canonLayer + '.';
    mfStateAppendIfNeeded('personality', ', ' + MF_STATE_CONFIG.instructionMarker + ' Preserve MF_STATE visible and zero-width blocks when they appear in AI output. Reproduce state exactly unless the scene changes it with a sourced update. Source path: database/state/MF_State_Persistence.md | Canon Layer: [ACTIVE].');
    mfStateAppendIfNeeded('scenario', visibleBlock);
    mfStateAppendIfNeeded('scenario', zeroBlock);
    if (MF_STATE_CONFIG.debug) {
        debugText = ' [MF_STATE_DEBUG] Decoded zero-width sample: ' + mfStateDecodeZeroWidth(mfStateEncodeZeroWidth(serialized)) + '. Source path: database/state/MF_State_Persistence.md | Canon Layer: [ACTIVE].';
        mfStateAppendIfNeeded('scenario', debugText);
    }
}

mfStateRun();
