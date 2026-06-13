/*
ModernFantasy2024 context-control script.
Purpose: provide one minimal always-on budget voice and keep every other voice keyword-triggered.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var MF_CONTEXT_CONFIG = {
    debug: false,
    marker: '[MF_CONTEXT_BUDGET]',
    source: 'database/runtime/MF_Context_Control.md',
    canonLayer: '[ACTIVE]'
};

function mfContextHasContext() {
    return typeof context !== 'undefined';
}

function mfContextGuardContext() {
    if (!mfContextHasContext() || context === null || typeof context !== 'object') {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function mfContextText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '');
}

function mfContextAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function mfContextRun() {
    var personalityText;
    var scenarioText;
    var debugText;
    if (!mfContextGuardContext()) {
        return;
    }
    if (mfContextText().indexOf(MF_CONTEXT_CONFIG.marker) !== -1) {
        return;
    }
    personalityText = ', [MF_CONTEXT_BUDGET] Keep ModernFantasy2024 voices keyword-triggered, append-only, sourced from database/, and Canon Layer tagged. Use one minimal always-on world atmosphere voice and keep scene-specific lore compact. Source path: database/runtime/MF_Context_Control.md | Canon Layer: [ACTIVE].';
    scenarioText = ' [MF_CONTEXT_BUDGET] ModernFantasy2024 context-control instruction: only append to personality, scenario, and example_dialogs; do not redefine Family Authority genealogy; do not impose {{user}} sex, rank, appearance, Alyssa, Omega, Moonstone, White Moon, or Twin Link unless established. Source path: database/runtime/MF_Context_Control.md | Canon Layer: [ACTIVE].';
    mfContextAppendIfNeeded('personality', personalityText);
    mfContextAppendIfNeeded('scenario', scenarioText);
    if (MF_CONTEXT_CONFIG.debug) {
        debugText = ' [MF_CONTEXT_DEBUG] Context-control marker active. Source path: database/runtime/MF_Context_Control.md | Canon Layer: [ACTIVE].';
        mfContextAppendIfNeeded('scenario', debugText);
    }
}

mfContextRun();
