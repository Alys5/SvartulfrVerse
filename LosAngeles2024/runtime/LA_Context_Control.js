/*
Los Angeles 2024 context-control script.
Purpose: provide one minimal always-on budget voice and prevent duplicate context-control injections.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LA_CONTEXT_CONFIG = {
    debug: false,
    marker: '[LA_CONTEXT_BUDGET]',
    source: 'database/runtime/LA_Context_Control.md',
    canonLayer: '[ACTIVE]'
};

function laContextHasContext() {
    return typeof context !== 'undefined';
}

function laContextGuardContext() {
    if (!laContextHasContext()) {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function laContextText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '');
}

function laContextAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function laContextRun() {
    var personalityText;
    var scenarioText;
    var debugText;
    if (!laContextGuardContext()) {
        return;
    }
    if (laContextText().indexOf(LA_CONTEXT_CONFIG.marker) !== -1) {
        return;
    }
    personalityText = ', [LA_CONTEXT_BUDGET] Keep Los Angeles 2024 voices keyword-triggered, append-only, sourced from database/, and Canon Layer tagged. Reserve active context for current scene participants and current conflict. Source path: database/runtime/LA_Context_Control.md | Canon Layer: [ACTIVE].';
    scenarioText = ' [LA_CONTEXT_BUDGET] Context-control instruction for Los Angeles 2024: do not add duplicate always-on world voices; do not leak hidden state; do not redefine genealogy; do not use forbidden runtime features. Source path: database/runtime/LA_Context_Control.md | Canon Layer: [ACTIVE].';
    laContextAppendIfNeeded('personality', personalityText);
    laContextAppendIfNeeded('scenario', scenarioText);
    if (LA_CONTEXT_CONFIG.debug) {
        debugText = ' [LA_CONTEXT_DEBUG] Context-control marker active. Source path: database/runtime/LA_Context_Control.md | Canon Layer: [ACTIVE].';
        laContextAppendIfNeeded('scenario', debugText);
    }
}

laContextRun();
