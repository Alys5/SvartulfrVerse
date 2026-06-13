/*
London1666 context-control script.
Purpose: provide one minimal always-on budget voice and prevent duplicate context-control injections.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LON_CONTEXT_CONFIG = {
    debug: false,
    marker: '[LON_CONTEXT_BUDGET]',
    source: 'database/runtime/LON_Context_Control.md',
    canonLayer: '[ACTIVE]'
};

function lonContextHasContext() {
    return typeof context !== 'undefined' && context != null;
}

function lonContextGuardContext() {
    if (!lonContextHasContext()) {
        return false;
    }
    context.character = context.character && typeof context.character === 'object' ? context.character : {};
    context.character.personality = typeof context.character.personality === 'string' ? context.character.personality : '';
    context.character.scenario = typeof context.character.scenario === 'string' ? context.character.scenario : '';
    context.character.example_dialogs = typeof context.character.example_dialogs === 'string' ? context.character.example_dialogs : '';
    return true;
}

function lonContextText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '') + ' ' + (context.character.example_dialogs || '');
}

function lonContextAppendIfNeeded(field, text) {
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

function lonContextRun() {
    var personalityText;
    var scenarioText;
    var debugText;
    if (!lonContextGuardContext()) {
        return;
    }
    if (lonContextText().indexOf(LON_CONTEXT_CONFIG.marker) !== -1) {
        return;
    }
    personalityText = ', [LON_CONTEXT_BUDGET] Keep London1666 voices keyword-triggered, append-only, sourced from database/, and Canon Layer tagged. Reserve active context for explicit sourced London1666 material. Source path: database/runtime/LON_Context_Control.md | Canon Layer: [ACTIVE].';
    scenarioText = ' [LON_CONTEXT_BUDGET] Context-control instruction for London1666: one minimal always-on voice only; do not leak hidden markers; do not redefine family authority; do not use forbidden runtime features. Source path: database/runtime/LON_Context_Control.md | Canon Layer: [ACTIVE].';
    lonContextAppendIfNeeded('personality', personalityText);
    lonContextAppendIfNeeded('scenario', scenarioText);
    if (LON_CONTEXT_CONFIG.debug) {
        debugText = ' [LON_CONTEXT_DEBUG] Context-control marker active. Source path: database/runtime/LON_Context_Control.md | Canon Layer: [ACTIVE].';
        lonContextAppendIfNeeded('scenario', debugText);
    }
}

lonContextRun();