'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.resolve(__dirname, '..');
var RUNTIME_DIR = path.join(ROOT, 'runtime');
var LEGACY_DIR = path.join(ROOT, 'legacy');
var RUNTIME_FILES = [
    'LA_Context_Control.js',
    'WRD_LosAngeles2024.js',
    'FAM_DouglasBloodmoon.js',
    'NPC_DouglasBloodmoon.js',
    'LA_Context_Coherence.js',
    'LA_State_Persistence.js',
    'LA_Validation.js'
];
var SPECIFIED_LEGACY_FILES = [
    'W_Contemporary.js',
    'W_LosAngeles2024.js',
    'Dynasty.js',
    'C_Alyssa.js',
    'C_Jasper.js',
    'C_Malachia.js',
    'C_Noah.js',
    'C_Erik.js',
    'C_Logan.js',
    'C_Wulfnic.js',
    'Ex_TwinXFamily',
    'Ex_Jasper',
    'Visual_DNA.md'
];
var EXPECTED_MAPPING = [
    ['wrd_losangeles_core', 'database/worlds/W_Contemporary.md'],
    ['loc_douglas_estate_core', 'database/locations/L_DouglasEstate.md'],
    ['org_dcc_security', 'database/organizations/O_DCC_Security.md'],
    ['fam_douglasbloodmoon_core', 'database/families/F_DouglasBloodmoon.md'],
    ['fam_visual_reconciliation', 'database/visuals/V_Visual_Reconciliation.md'],
    ['npc_alyssa_douglasbloodmoon', 'database/characters/C_Alyssa_Douglas_Bloodmoon.md'],
    ['npc_jasper_douglasbloodmoon', 'database/characters/C_Jasper_Douglas_Bloodmoon.md'],
    ['npc_malachia_douglasbloodmoon', 'database/characters/C_Malachia_Douglas_Bloodmoon.md'],
    ['npc_noah_douglasbloodmoon', 'database/characters/C_Noah_Douglas_Bloodmoon.md'],
    ['npc_erik_douglas', 'database/characters/C_Erik_Douglas.md'],
    ['npc_logan_douglas', 'database/characters/C_Logan_Douglas.md'],
    ['npc_wulfnic_bloodmoon', 'database/characters/C_Wulfnic_Bloodmoon.md']
];

function listFilesRecursive(dir) {
    var results = [];
    var names;
    var i;
    var full;
    var stat;
    names = fs.readdirSync(dir);
    for (i = 0; i < names.length; i = i + 1) {
        full = path.join(dir, names[i]);
        stat = fs.statSync(full);
        if (stat.isDirectory()) {
            results = results.concat(listFilesRecursive(full));
        } else {
            results[results.length] = full;
        }
    }
    return results;
}

function readRuntimeFile(name) {
    return fs.readFileSync(path.join(RUNTIME_DIR, name), 'utf8');
}

function runScript(name, character) {
    var sandbox;
    character = character || { personality: 'BASE_PERSONALITY', scenario: 'BASE_SCENARIO', example_dialogs: '' };
    sandbox = {
        context: {
            character: character,
            chat: {
                last_message: character.lastMessage || ''
            }
        }
    };
    vm.runInNewContext(readRuntimeFile(name), sandbox, { filename: name });
    return sandbox.context.character;
}

function assertAppendOnly(character, originalPersonality, originalScenario) {
    assert.strictEqual(character.personality.indexOf(originalPersonality), 0);
    assert.strictEqual(character.scenario.indexOf(originalScenario), 0);
}

function assertRuntimeConstraints(name, source) {
    var lines;
    var i;
    var line;
    assert(source.indexOf('/*') !== -1, name + ' should include inline comment header');
    assert(source.indexOf('*/') !== -1, name + ' should close inline comment header');
    assert(source.indexOf('database_old') === -1, name + ' must not reference database_old');
    assert(source.indexOf('context.variables') === -1, name + ' must not write or read context.variables');
    assert(source.indexOf('module') === -1, name + ' must not use module APIs');
    assert(source.indexOf('exports') === -1, name + ' must not use exports APIs');
    assert(!/\blet\b/.test(source), name + ' must not use let');
    assert(!/\bconst\b/.test(source), name + ' must not use const');
    assert(!/\bclass\b/.test(source), name + ' must not use class');
    assert(!/\basync\b/.test(source), name + ' must not use async');
    assert(!/\bawait\b/.test(source), name + ' must not use await');
    assert(!/\bPromise\b/.test(source), name + ' must not use Promise');
    assert(!/\bfetch\b/.test(source), name + ' must not use fetch');
    assert(!/\bXMLHttpRequest\b/.test(source), name + ' must not use XMLHttpRequest');
    assert(!/\bdocument\b/.test(source), name + ' must not use document');
    assert(!/\bwindow\b/.test(source), name + ' must not use window');
    assert(!/\bstorage\b/.test(source), name + ' must not use storage');
    assert(!/\bfs\b/.test(source), name + ' must not use fs');
    assert(source.indexOf('readFile') === -1, name + ' must not use readFile');
    assert(!/\beval\b/.test(source), name + ' must not use eval');
    assert(!/new\s+Function/.test(source), name + ' must not use new Function');
    assert(source.indexOf('=>') === -1, name + ' must not use arrow functions');
    assert(source.indexOf('`') === -1, name + ' must not use template literals');
    assert(!/\bimport\b/.test(source), name + ' must not use import');
    assert(!/\bexport\b/.test(source), name + ' must not use export');
    assert(!/\brequire\s*\(/.test(source), name + ' must not use require');
    assert(source.indexOf('context.character = context.character || {};') !== -1, name + ' must guard context.character');
    assert(source.indexOf('context.character.personality = context.character.personality || \'\';') !== -1, name + ' must guard personality');
    assert(source.indexOf('context.character.scenario = context.character.scenario || \'\';') !== -1, name + ' must guard scenario');
    assert(source.indexOf('database/') !== -1, name + ' must contain database/ source attribution');
    assert(source.indexOf('Canon Layer:') !== -1, name + ' must contain Canon Layer tags');
    assert(source.indexOf('+=') !== -1, name + ' must use append-only writes');

    lines = source.split(/\r?\n/);
    for (i = 0; i < lines.length; i = i + 1) {
        line = lines[i];
        if (/context\.character\.(personality|scenario|example_dialogs)\s*=/.test(line)) {
            assert(
                line.indexOf('context.character.personality = context.character.personality ||') !== -1 ||
                line.indexOf('context.character.scenario = context.character.scenario ||') !== -1 ||
                line.indexOf('context.character.example_dialogs = context.character.example_dialogs ||') !== -1,
                name + ' has non-guard assignment to line ' + (i + 1)
            );
        }
    }
}

function testLegacyInventory() {
    var allLegacyFiles;
    var i;
    var full;
    allLegacyFiles = listFilesRecursive(LEGACY_DIR);
    assert(allLegacyFiles.length > 50, 'legacy inventory should cover the gathered legacy corpus');
    for (i = 0; i < SPECIFIED_LEGACY_FILES.length; i = i + 1) {
        full = path.join(LEGACY_DIR, SPECIFIED_LEGACY_FILES[i]);
        assert(fs.existsSync(full), 'specified legacy analysis file missing: ' + SPECIFIED_LEGACY_FILES[i]);
    }
}

function testRuntimeFilesAndConstraints() {
    var i;
    var name;
    var source;
    for (i = 0; i < RUNTIME_FILES.length; i = i + 1) {
        name = RUNTIME_FILES[i];
        assert(fs.existsSync(path.join(RUNTIME_DIR, name)), 'runtime file missing: ' + name);
        source = readRuntimeFile(name);
        assertRuntimeConstraints(name, source);
    }
}

function testParsingAndMapping() {
    var combined;
    var i;
    combined = RUNTIME_FILES.map(readRuntimeFile).join('\n');
    for (i = 0; i < EXPECTED_MAPPING.length; i = i + 1) {
        assert(combined.indexOf(EXPECTED_MAPPING[i][0]) !== -1, 'missing mapped id: ' + EXPECTED_MAPPING[i][0]);
        assert(combined.indexOf(EXPECTED_MAPPING[i][1]) !== -1, 'missing mapped source: ' + EXPECTED_MAPPING[i][1]);
    }
    assert(combined.indexOf('NPC_DouglasBloodmoon') !== -1 || combined.indexOf('npc_alyssa_douglasbloodmoon') !== -1, 'NPC mapping missing');
    assert(combined.indexOf('FAM_DouglasBloodmoon') !== -1 || combined.indexOf('fam_douglasbloodmoon_core') !== -1, 'family mapping missing');
    assert(combined.indexOf('WRD_LosAngeles2024') !== -1 || combined.indexOf('wrd_losangeles_core') !== -1, 'world mapping missing');
}

function testRuntimeInjectionAppendOnly() {
    var originalPersonality = 'BASE_PERSONALITY';
    var originalScenario = 'BASE_SCENARIO';
    var character;

    character = runScript('LA_Context_Control.js', { personality: originalPersonality, scenario: originalScenario, example_dialogs: '' });
    assertAppendOnly(character, originalPersonality, originalScenario);
    assert(character.scenario.indexOf('[LA_CONTEXT_BUDGET]') !== -1);

    character = runScript('WRD_LosAngeles2024.js', { personality: originalPersonality, scenario: originalScenario + ' Los Angeles Beverly Hills Douglas Estate', example_dialogs: '' });
    assertAppendOnly(character, originalPersonality, originalScenario);
    assert(character.scenario.indexOf('[LA_MACRO_WRD]') !== -1);

    character = runScript('FAM_DouglasBloodmoon.js', { personality: originalPersonality, scenario: originalScenario + ' Douglas-Bloodmoon genealogy Visual Authority', example_dialogs: '' });
    assertAppendOnly(character, originalPersonality, originalScenario);
    assert(character.scenario.indexOf('[LA_FAMILY_FAM]') !== -1);

    character = runScript('NPC_DouglasBloodmoon.js', { personality: originalPersonality, scenario: originalScenario + ' Alyssa Jasper Malachia Noah Erik Logan Wulfnic SUCC pre-med', example_dialogs: '' });
    assertAppendOnly(character, originalPersonality, originalScenario);
    assert(character.scenario.indexOf('[LA_NPC_MICROCOSMO]') !== -1);
    assert(character.scenario.indexOf('Alyssa Douglas-Bloodmoon is a 19-year-old SUCC/UCLA pre-med student') !== -1);
    assert(character.scenario.indexOf('Jasper Douglas-Bloodmoon is a 19-year-old DJ Frequency / security hacker') !== -1);
    assert(character.scenario.indexOf('Malachia Douglas-Bloodmoon is a 28-year-old Vanguard protector') !== -1);
    assert(character.scenario.indexOf('Noah Douglas-Bloodmoon is a 25-year-old corporate lawyer') !== -1);
    assert(character.scenario.indexOf('Erik Douglas is a 52-year-old widower') !== -1);
    assert(character.scenario.indexOf('Logan Douglas is a 45-year-old Erik brother') !== -1);
    assert(character.scenario.indexOf('Wulfnic Bloodmoon is Nixara father, maternal grandfather') !== -1);
    assert(readRuntimeFile('NPC_DouglasBloodmoon.js').indexOf('Erik has silver-grey slicked-back hair, grey-blue cold eyes') !== -1);
    assert(readRuntimeFile('NPC_DouglasBloodmoon.js').indexOf('Logan has dark brown medium messy hair, hazel warm eyes') !== -1);
    assert(character.scenario.indexOf('fusion-visual') === -1);
    assert(character.scenario.indexOf('22-year-old') === -1);
    assert(character.scenario.indexOf('Do not collapse Alyssa and Jasper') !== -1);

    character = runScript('LA_Context_Coherence.js', { personality: originalPersonality, scenario: originalScenario + ' secret twin The Verve', example_dialogs: '' });
    assertAppendOnly(character, originalPersonality, originalScenario);
    assert(character.scenario.indexOf('[LA_CONTEXT_COHERENCE]') !== -1);

    character = runScript('LA_State_Persistence.js', { personality: originalPersonality, scenario: originalScenario + ' update state [LA_STATE:visible]sceneFocus=rooftop;activeParticipants=Alyssa,Jasper;flags=twinTalk;lastCanonSource=database/families/F_DouglasBloodmoon.md;[/LA_STATE]', example_dialogs: '', lastMessage: 'update state' });
    assertAppendOnly(character, originalPersonality, originalScenario);
    assert(character.personality.indexOf('[LA_STATE:instruction]') !== -1);
    assert(character.scenario.indexOf('sceneFocus=rooftop') !== -1);
    assert(character.scenario.indexOf('[LA_STATE:zero]') !== -1);
    assert(character.scenario.indexOf('[LA_STATE:VALIDATION]') === -1);

    character = runScript('LA_Validation.js', { personality: originalPersonality, scenario: originalScenario, example_dialogs: '', lastMessage: 'validate canon' });
    assertAppendOnly(character, originalPersonality, originalScenario);
    assert(character.scenario.indexOf('[LA_VALIDATION] LA 2024 validation passed') !== -1);
}

function testActivationFiltersAndMissingContext() {
    var i;
    var source;
    var sandbox;
    var character;

    character = runScript('WRD_LosAngeles2024.js', { personality: 'BASE_PERSONALITY', scenario: 'crime family mafia grimdark', example_dialogs: '' });
    assert(character.scenario.indexOf('[LA_MACRO_WRD]') === -1);

    character = runScript('LA_Context_Coherence.js', { personality: 'BASE_PERSONALITY', scenario: 'ordinary breakfast', example_dialogs: '' });
    assert(character.scenario.indexOf('[LA_CONTEXT_COHERENCE]') === -1);

    character = runScript('LA_State_Persistence.js', { personality: 'BASE_PERSONALITY', scenario: 'ordinary breakfast', example_dialogs: '' });
    assert(character.scenario.indexOf('[LA_STATE:visible]') === -1);

    for (i = 0; i < RUNTIME_FILES.length; i = i + 1) {
        source = readRuntimeFile(RUNTIME_FILES[i]);
        sandbox = {};
        vm.runInNewContext(source, sandbox, { filename: RUNTIME_FILES[i] });
    }
}

function testZeroWidthPersistenceHelpers() {
    var character;
    var originalScenario = 'BASE_SCENARIO with persist flag';
    character = runScript('LA_State_Persistence.js', { personality: 'BASE_PERSONALITY', scenario: originalScenario + ' [LA_STATE:visible]sceneFocus=library;activeParticipants=Wulfnic;flags=legacy;lastCanonSource=database/visuals/V_Visual_Reconciliation.md;[/LA_STATE]', example_dialogs: '', lastMessage: 'state update' });
    assert(character.scenario.indexOf('[LA_STATE:zero]') !== -1);
    assert(character.scenario.indexOf('Wulfnic active phenotype is blonde hair and blue eyes') !== -1 || character.scenario.indexOf('sceneFocus=library') !== -1);
}

function runAll() {
    testLegacyInventory();
    testRuntimeFilesAndConstraints();
    testParsingAndMapping();
    testRuntimeInjectionAppendOnly();
    testActivationFiltersAndMissingContext();
    testZeroWidthPersistenceHelpers();
    console.log('All LosAngeles2024 runtime tests passed.');
}

runAll();
