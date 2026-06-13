/*
London1666 state-persistence helper script.
Purpose: parse visible markers, normalize known keys, and append reproducible visible plus zero-width blocks when markers or update words appear.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LON_STATE_CONFIG = {
    debug: false,
    marker: '[LON_STATE:visible]',
    closeMarker: '[/LON_STATE]',
    zeroMarker: '[LON_STATE:zero]',
    closeZeroMarker: '[/LON_STATE:zero]',
    validationMarker: '[LON_STATE:VALIDATION]',
    budget: 1200
};

var LON_STATE_KEYS = ['sceneFocus', 'period', 'activeParticipants', 'flags', 'lastCanonSource', 'regencyStatus'];

var LON_ZW_MAP = {
    '0': '\u200B',
    '1': '\u200C',
    '2': '\u200D',
    '3': '\uFEFF',
    '4': '\u2060',
    '5': '\u2061',
    '6': '\u2062',
    '7': '\u2063',
    '8': '\u200E',
    '9': '\u200F'
};

function lonStateHasContext() {
    return typeof context !== 'undefined' && context != null;
}

function lonStateGuardContext() {
    if (!lonStateHasContext()) {
        return false;
    }
    context.character = context.character && typeof context.character === 'object' ? context.character : {};
    context.character.personality = typeof context.character.personality === 'string' ? context.character.personality : '';
    context.character.scenario = typeof context.character.scenario === 'string' ? context.character.scenario : '';
    context.character.example_dialogs = typeof context.character.example_dialogs === 'string' ? context.character.example_dialogs : '';
    return true;
}

function lonStateChatText() {
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

function lonStateText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + (context.character.example_dialogs || '') + ' ' + lonStateChatText();
}

function lonStateContainsAny(source, keywords) {
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

function lonStateAppendIfNeeded(field, text) {
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

function lonStateExtractVisible() {
    var text;
    var start;
    var end;
    text = lonStateText();
    start = text.indexOf(LON_STATE_CONFIG.marker);
    if (start === -1) {
        return '';
    }
    start += LON_STATE_CONFIG.marker.length;
    end = text.indexOf(LON_STATE_CONFIG.closeMarker, start);
    if (end === -1) {
        return text.substring(start);
    }
    return text.substring(start, end);
}

function lonStateTrimValue(value) {
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

function lonStateParseKeyValue(raw) {
    var parts;
    var normalized;
    var i;
    var pair;
    var split;
    var key;
    normalized = {};
    parts = raw.split(';');
    for (i = 0; i < parts.length; i = i + 1) {
        pair = parts[i];
        split = pair.indexOf('=');
        if (split !== -1) {
            key = lonStateTrimValue(pair.substring(0, split));
            if (key.length > 0) {
                normalized[key] = lonStateTrimValue(pair.substring(split + 1));
            }
        }
    }
    return normalized;
}

function lonStateNormalize(parsed) {
    var normalized;
    var i;
    var key;
    var value;
    normalized = {};
    for (i = 0; i < LON_STATE_KEYS.length; i = i + 1) {
        key = LON_STATE_KEYS[i];
        value = parsed[key];
        if (typeof value === 'string' && value.length > 0 && value.length < 180) {
            normalized[key] = value;
        }
    }
    return normalized;
}

function lonStateSourceValid(source) {
    return typeof source === 'string' && source.indexOf('database/') === 0 && source.indexOf('database' + '_old') === -1;
}

function lonStateIsValid(normalized) {
    var i;
    var key;
    var source;
    for (i = 0; i < LON_STATE_KEYS.length; i = i + 1) {
        key = LON_STATE_KEYS[i];
        if (normalized.hasOwnProperty(key)) {
            if (key === 'lastCanonSource') {
                source = normalized[key];
                if (!lonStateSourceValid(source)) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}

function lonStateSerialize(normalized) {
    var text;
    var i;
    var key;
    text = '';
    for (i = 0; i < LON_STATE_KEYS.length; i = i + 1) {
        key = LON_STATE_KEYS[i];
        if (normalized.hasOwnProperty(key)) {
            text += key + '=' + normalized[key] + ';';
        }
    }
    return text;
}

function lonStatePad2(value) {
    value = String(value);
    if (value.length === 1) {
        return '0' + value;
    }
    return value;
}

function lonStateToHex(text) {
    var hex;
    var i;
    var code;
    hex = '';
    for (i = 0; i < text.length; i = i + 1) {
        code = text.charCodeAt(i).toString(16);
        hex += lonStatePad2(lonStatePad2(code));
    }
    return hex;
}

function lonStateFromHex(hex) {
    var text;
    var i;
    var pair;
    text = '';
    for (i = 0; i + 1 < hex.length; i = i + 2) {
        pair = hex.substring(i, i + 2);
        text += String.fromCharCode(parseInt(pair, 16));
    }
    return text;
}

function lonStateEncodeDigits(text) {
    var encoded;
    var i;
    var ch;
    encoded = '';
    for (i = 0; i < text.length; i = i + 1) {
        ch = text.charAt(i);
        if (LON_ZW_MAP.hasOwnProperty(ch)) {
            encoded += LON_ZW_MAP[ch];
        }
    }
    return encoded;
}

function lonStateDecodeDigits(text) {
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
        } else if (ch === '\u200D') {
            decoded += '2';
        } else if (ch === '\uFEFF') {
            decoded += '3';
        } else if (ch === '\u2060') {
            decoded += '4';
        } else if (ch === '\u2061') {
            decoded += '5';
        } else if (ch === '\u2062') {
            decoded += '6';
        } else if (ch === '\u2063') {
            decoded += '7';
        } else if (ch === '\u200E') {
            decoded += '8';
        } else if (ch === '\u200F') {
            decoded += '9';
        }
    }
    return decoded;
}

function lonStateEncodeZeroWidth(text) {
    return lonStateEncodeDigits(lonStateToHex(text));
}

function lonStateDecodeZeroWidth(text) {
    return lonStateFromHex(lonStateDecodeDigits(text));
}

function lonStateRun() {
    var sourceText;
    var raw;
    var parsed;
    var normalized;
    var serialized;
    var visibleBlock;
    var zeroBlock;
    var debugText;
    if (!lonStateGuardContext()) {
        return;
    }
    sourceText = lonStateText();
    if (!lonStateContainsAny(sourceText, ['state', 'flag', 'persist', 'update', LON_STATE_CONFIG.marker, LON_STATE_CONFIG.zeroMarker])) {
        return;
    }
    raw = lonStateExtractVisible();
    parsed = lonStateParseKeyValue(raw);
    normalized = lonStateNormalize(parsed);
    if (!lonStateIsValid(normalized)) {
        lonStateAppendIfNeeded('scenario', ' ' + LON_STATE_CONFIG.validationMarker + ' No valid LON_STATE keys found. Expected sceneFocus, period, activeParticipants, flags, lastCanonSource, or regencyStatus with a database/ lastCanonSource. Source path: database/runtime/LON_State_Persistence.md | Canon Layer: [ACTIVE].');
        return;
    }
    serialized = lonStateSerialize(normalized);
    visibleBlock = ' ' + LON_STATE_CONFIG.marker + serialized + LON_STATE_CONFIG.closeMarker + ' Source path: database/runtime/LON_State_Persistence.md | Canon Layer: [ACTIVE].';
    zeroBlock = ' ' + LON_STATE_CONFIG.zeroMarker + lonStateEncodeZeroWidth(serialized) + LON_STATE_CONFIG.closeZeroMarker + ' Source path: database/runtime/LON_State_Persistence.md | Canon Layer: [ACTIVE].';
    lonStateAppendIfNeeded('personality', ', [LON_STATE:instruction] Preserve LON_STATE visible and zero-width blocks when they appear in AI output. Reproduce them exactly unless the scene changes them with a sourced update. Source path: database/runtime/LON_State_Persistence.md | Canon Layer: [ACTIVE].');
    lonStateAppendIfNeeded('scenario', visibleBlock);
    lonStateAppendIfNeeded('scenario', zeroBlock);
    if (LON_STATE_CONFIG.debug) {
        debugText = ' [LON_STATE_DEBUG] Decoded zero-width sample: ' + lonStateDecodeZeroWidth(lonStateEncodeZeroWidth(serialized)) + '. Source path: database/runtime/LON_State_Persistence.md | Canon Layer: [ACTIVE].';
        lonStateAppendIfNeeded('scenario', debugText);
    }
}

lonStateRun();