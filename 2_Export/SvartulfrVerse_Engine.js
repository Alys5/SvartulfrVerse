/**
 * =========================================================================
 * SVARTULFRVERSE ENGINE TEMPLATE - V2.0 (ADVANCED ES5-SAFE)
 * Infrastruttura runtime agnostica per JanitorAI Scripts.
 * Integrata con:
 * - Fail-Gracefully Guards
 * - Global Context Budgeting (U-Curve Protection)
 * - Adaptive Reaction Engine (Negation/Polarity Tracking)
 * - Hex/Zero-Width States, Progressive Context & Modular Lore
 * - Adaptive Language Engine (OOC Language Enforcement)
 * =========================================================================
 */

(function () {
	// ===== 1. FAIL-GRACEFULLY GUARDS =====

	if (typeof context === 'undefined' || !context.character || !context.chat) {
		return;
	}

	let character = context.character;

	character.personality =
		typeof character.personality === 'string' ? character.personality : '';

	character.scenario =
		typeof character.scenario === 'string' ? character.scenario : '';

	character.example_dialogs =
		typeof character.example_dialogs === 'string'
			? character.example_dialogs
			: '';

	let chat =
		typeof context.chat === 'object' && context.chat !== null
			? context.chat
			: {};

	let lastResponse = chat.last_message || chat.lastMessage || '';

	let lastMessage = lastResponse.toLowerCase();

	let messageCount = chat.message_count || chat.messageCount || 0;

	let recentMessages = chat.last_messages || chat.lastMessages || [];

	// ===== FEATURE TOGGLES =====

	let FEATURES = {
		VISIBLE_FLAGS: false,

		ANTI_CHEAT: true,

		HIDDEN_STATE: true,

		PROGRESSIVE_CONTEXT: true,

		NPC_CORE: true,

		SIMPLE_NPC_FALLBACK: true,

		RELATIONSHIP_CORE: true,

		ANTI_OMNISCIENCE: true,

		TIME_DELAY: true,

		LANGUAGE_CORE: true, // NEW: Abilita il motore di gestione della lingua
		MULTI_CHAR_ROLEPLAY_ENGINE: true,
		REACTION_PACKS: true,
		EMOTION_ENGINE: true,

		DEBUG_CONTEXT_LOG: false,

		DEBUG_MODE: false,
	};

	let ANTI_CHEAT_MODE = 'OOC_WARNING';

	let ANTI_CHEAT_RESPONSES = {
		OOC_WARNING: {
			personality: '',

			scenario:
				' [OOC: Invalid abstract state detected. Roll back and use only valid state values.]',
		},

		COMICAL: {
			personality: ', experiencing a sudden absurd interruption',

			scenario:
				' A harmless absurd interruption breaks the invalid state without changing canon.',
		},

		SEVERE: {
			personality: '',

			scenario:
				' [OOC: Invalid abstract state detected. Reset to the last valid state before continuing.]',
		},
	};

	// ===== VISIBLE HEX FLAGS =====

	let flagDefinitions = [
		{
			position: 0,

			states: [
				{
					hex: '00',

					id: 'flag_0x00',

					description: 'Default abstract state for visible flag position 0.',

					personality: '',

					scenario: '',

					keywords: [],

					flagChangeInstruction:
						'Do not change this position until a Scenario or World module defines its meaning.',
				},
				{
					hex: '0A',

					id: 'flag_0x0A',

					description: 'Alternate abstract state for visible flag position 0.',

					personality: '',

					scenario: '',

					keywords: [],

					flagChangeInstruction:
						'Use only when a Scenario or World module explicitly permits this state.',
				},
			],
		},
	];

	function estimateTokens(text) {
		if (!text) {
			return 0;
		}

		return Math.ceil(text.length / 4);
	}

	// ===== GLOBAL CONTEXT BUDGETING (U-CURVE GUARD) =====

	let GLOBAL_MAX_TOKENS = 3000; // Limite assoluto globale (circa 12.000 caratteri)

	let currentInjectedTokens = 0;

	function appendIfMissing(field, text) {
		if (!text) {
			return;
		}

		if (!character[field].includes(text)) {
			let cost = estimateTokens(text);

			// Ferma l'iniezione se supera il budget globale di sicurezza

			if (currentInjectedTokens + cost > GLOBAL_MAX_TOKENS) {
				if (
					FEATURES.DEBUG_MODE &&
					!character.scenario.includes('[U-CURVE GUARD ACTIVATED]')
				) {
					character.scenario +=
						'\n[ENGINE DEBUG: U-CURVE GUARD ACTIVATED. Global budget exceeded.]';
				}

				return;
			}

			character[field] += text;

			currentInjectedTokens += cost;
		}
	}

	function normalizeKeywords(keywords) {
		if (!keywords) return [];

		if (typeof keywords === 'string') {
			let trimmed = keywords.toLowerCase().trim();

			return trimmed ? [trimmed] : [];
		}

		let result = [];

		for (let i = 0; i < keywords.length; i++) {
			let kw = String(keywords[i]).toLowerCase().trim();

			if (kw) result.push(kw);
		}

		return result;
	}

	function escapeRegExp(text) {
		return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	// ===== ADAPTIVE REACTION ENGINE (POLARITY) =====

	// Conta i match escludendo quelli preceduti da negazioni per evitare falsi positivi

	function countMentions(keywords, text) {
		let normalizedKeywords = normalizeKeywords(keywords);

		let count = 0;

		let lowerText = text.toLowerCase();

		let negations = [
			' non ',
			' no ',
			' senza ',
			" don't ",
			" won't ",
			" didn't ",
			' never ',
			' stop ',
			' without ',
		];

		let regex;

		let match;

		for (let i = 0; i < normalizedKeywords.length; i++) {
			regex = new RegExp(escapeRegExp(normalizedKeywords[i]), 'gi');

			while ((match = regex.exec(text)) !== null) {
				let startIndex = Math.max(0, match.index - 25);

				let contextBefore = lowerText.substring(startIndex, match.index);

				let isNegated = false;

				for (let j = 0; j < negations.length; j++) {
					if (contextBefore.includes(negations[j])) {
						isNegated = true;

						break;
					}
				}

				if (!isNegated) {
					count++;
				}
			}
		}

		return count;
	}

	function extractVisibleFlags(response) {
		let regex = /\*\*FLAGS:\*\*\s*([0-9A-Fa-f:]+)/;

		let match = response.match(regex);

		if (match && match[1]) {
			return match[1];
		}

		return null;
	}

	function isValidHexValue(hexValue) {
		return /^[0-9A-Fa-f]{2}$/.test(hexValue);
	}

	function generateDefaultFlags(count) {
		let defaults = [];

		for (let i = 0; i < count; i++) {
			defaults.push('00');
		}

		return defaults.join(':');
	}

	function getAllFlagStates() {
		let states = [];

		let def;

		for (let i = 0; i < flagDefinitions.length; i++) {
			def = flagDefinitions[i];

			for (let j = 0; j < def.states.length; j++) {
				if (states.indexOf(def.states[j].hex.toUpperCase()) === -1) {
					states.push(def.states[j].hex.toUpperCase());
				}
			}
		}

		return states;
	}

	function validateVisibleFlags(flagString) {
		let parts;

		let validValues;

		let validated = [];

		let part;

		if (!flagString) {
			return null;
		}

		parts = flagString.split(':');

		validValues = getAllFlagStates();

		for (let i = 0; i < parts.length; i++) {
			part = parts[i].toUpperCase();

			if (!isValidHexValue(part)) {
				triggerAntiCheat(i, part);

				return null;
			}

			if (FEATURES.ANTI_CHEAT && !validValues.includes(part)) {
				triggerAntiCheat(i, part);

				return null;
			}

			validated.push(part);
		}

		return validated;
	}

	function triggerAntiCheat(flagIndex, invalidFlag) {
		let response =
			ANTI_CHEAT_RESPONSES[ANTI_CHEAT_MODE] || ANTI_CHEAT_RESPONSES.OOC_WARNING;

		appendIfMissing('personality', response.personality);

		appendIfMissing('scenario', response.scenario);
	}

	function applyVisibleFlagContent(flags) {
		let def;

		let state;

		let currentFlag;

		for (let i = 0; i < flagDefinitions.length; i++) {
			def = flagDefinitions[i];

			currentFlag = (flags[def.position] || '00').toUpperCase();

			for (let j = 0; j < def.states.length; j++) {
				state = def.states[j];

				if (state.hex.toUpperCase() === currentFlag) {
					appendIfMissing('personality', state.personality || '');

					appendIfMissing('scenario', state.scenario || '');
				}
			}
		}
	}

	function buildVisibleFlagInstructions(flags) {
		let lines = [];

		let def;

		let state;

		let currentFlag;

		let hasActiveInstructions = false;

		if (flagDefinitions.length === 0) {
			return '';
		}

		lines.push('[ABSTRACT FLAG MANAGEMENT]');

		lines.push(
			'Maintain the visible state string at the end of responses in this exact format:'
		);

		lines.push('**FLAGS:** ' + flags.join(':'));

		lines.push('');

		lines.push('Rules:');

		lines.push('1. Preserve the same number of flag positions.');

		lines.push('2. Preserve every unchanged position exactly.');

		lines.push(
			'3. Use only valid hex values: ' + getAllFlagStates().join(', ') + '.'
		);

		lines.push(
			'4. Change a position only when the condition attached to the active state permits it.'
		);

		lines.push(
			'5. Do not invent meaning for abstract flags; Scenario or World modules define meaning.'
		);

		lines.push('');

		lines.push('[CURRENT STATE]');

		lines.push('Flags: ' + flags.join(':'));

		lines.push('');

		lines.push('[ACTIVE CONDITIONS]');

		for (let i = 0; i < flagDefinitions.length; i++) {
			def = flagDefinitions[i];

			currentFlag = (flags[def.position] || '00').toUpperCase();

			for (let j = 0; j < def.states.length; j++) {
				state = def.states[j];

				if (
					state.hex.toUpperCase() === currentFlag &&
					state.flagChangeInstruction
				) {
					hasActiveInstructions = true;

					lines.push(
						'Position ' +
							def.position +
							' (' +
							currentFlag +
							'): ' +
							state.description
					);

					lines.push('  -> ' + state.flagChangeInstruction);
				}
			}
		}

		if (!hasActiveInstructions) {
			lines.push('No active flag changes are currently permitted.');
		}

		return '\n\n' + lines.join('\n');
	}

	// ===== ZERO-WIDTH HIDDEN STATE =====

	let ZW_MAP = {
		0: '\u200B',
		1: '\u200C',
		2: '\u200D',
		3: '\uFEFF',

		4: '\u2060',
		5: '\u2061',
		6: '\u2062',
		7: '\u2063',

		8: '\u200E',
		9: '\u200F',
		'|': '\u2064',
	};

	let ZW_REVERSE_MAP = {};

	let ZW_KEY;

	for (ZW_KEY in ZW_MAP) {
		if (ZW_MAP.hasOwnProperty(ZW_KEY)) {
			ZW_REVERSE_MAP[ZW_MAP[ZW_KEY]] = ZW_KEY;
		}
	}

	let STATE_HEADER = '\u200D\u2062\u200C\u2063';

	let STATE_FOOTER = '\u2065\u200C\u2062\u200D';

	let STATE_REGEX = new RegExp(
		STATE_HEADER + '([\\u200B-\\u2065\\uFEFF\\u200E\\u200F]+)' + STATE_FOOTER,
		'g'
	);

	let HIDDEN_FEATURES = {
		component_0x01: true,
		component_0x02: true,
		component_0x03: true,

		component_0x04: true,
		component_0x05: true,
		component_0x06: true,
	};

	let HIDDEN_COMPONENTS = [
		{
			id: 'component_0x01',
			stateKey: 'state_value_0x01',
			keywords: ['state_value_0x01', 'slot_0x01', 'component_0x01'],
			defaultState: '00',
			description: 'Abstract state slot 0x01.',
			personality: '',
			scenario: '',
		},

		{
			id: 'component_0x02',
			stateKey: 'location_id',
			keywords: ['location_id', 'slot_location', 'component_0x02'],
			defaultState: '00',
			description: 'Abstract location context slot.',
			personality: '',
			scenario: '',
		},

		{
			id: 'component_0x03',
			stateKey: 'emotion_bitmask',
			keywords: ['emotion_bitmask', 'slot_emotion', 'component_0x03'],
			defaultState: '00000000',
			description: 'Abstract emotion context slot.',
			personality: '',
			scenario: '',
		},

		{
			id: 'component_0x04',
			stateKey: 'inventory_bitfield',
			keywords: ['inventory_bitfield', 'slot_inventory', 'component_0x04'],
			defaultState: '00000000',
			description: 'Abstract inventory context slot.',
			personality: '',
			scenario: '',
		},
		{
			id: 'component_0x05',
			stateKey: 'schedule_counter',
			keywords: ['schedule_counter', 'slot_schedule', 'component_0x05'],
			defaultState: '001',
			description: 'Abstract schedule counter slot.',
			personality: '',
			scenario: '',
		},
		{
			id: 'component_0x06',
			stateKey: 'presence_bitfield',
			keywords: ['presence_bitfield', 'slot_presence', 'component_0x06'],
			defaultState: '000000',
			description: 'Abstract presence context slot.',
			personality: '',
			scenario: '',
		},
	];

	function getMessageText(message) {
		if (!message) {
			return '';
		}

		return typeof message === 'string' ? message : message.message || '';
	}

	function encodeZeroWidth(decimalText) {
		let result = '';

		for (let i = 0; i < decimalText.length; i++) {
			result += ZW_MAP[decimalText.charAt(i)] || '';
		}

		return result;
	}

	function decodeZeroWidth(zeroWidthText) {
		let result = '';

		for (let i = 0; i < zeroWidthText.length; i++) {
			result += ZW_REVERSE_MAP[zeroWidthText.charAt(i)] || '';
		}

		return result;
	}

	function extractHiddenState() {
		let searchDepth = Math.max(0, recentMessages.length - 10);

		let matches;

		let match;

		let inner;

		let decoded;

		let messageText;

		for (let i = recentMessages.length - 1; i >= searchDepth; i--) {
			messageText = getMessageText(recentMessages[i]);

			if (!messageText) continue;

			matches = messageText.match(STATE_REGEX);

			if (matches && matches.length > 0) {
				for (let j = 0; j < matches.length; j++) {
					match = matches[j];

					inner = match.slice(
						STATE_HEADER.length,
						match.length - STATE_FOOTER.length
					);

					decoded = decodeZeroWidth(inner);

					if (/^[0-9|]+$/.test(decoded)) {
						return decoded;
					}
				}
			}
		}

		return null;
	}

	function parseHiddenState(stateString) {
		let parsed = {};

		let segments;

		let componentCodeMap = {};

		let segment;

		let componentCode;

		if (!stateString) {
			return parsed;
		}

		for (let i = 0; i < HIDDEN_COMPONENTS.length; i++) {
			componentCodeMap[HIDDEN_COMPONENTS[i].id.replace(/\D/g, '').slice(-2)] =
				HIDDEN_COMPONENTS[i].id;
		}

		segments = stateString.split('|');

		for (let j = 0; j < segments.length; j++) {
			segment = segments[j];

			if (segment.length >= 4) {
				componentCode = segment.slice(0, 2);

				if (componentCodeMap[componentCode]) {
					parsed[componentCodeMap[componentCode]] = segment.slice(2);
				}
			}
		}

		return parsed;
	}

	function buildDefaultHiddenState() {
		let state = {};

		for (let i = 0; i < HIDDEN_COMPONENTS.length; i++) {
			state[HIDDEN_COMPONENTS[i].id] = HIDDEN_COMPONENTS[i].defaultState;
		}

		return state;
	}

	function mergeHiddenState(parsedState) {
		let state = buildDefaultHiddenState();

		let key;

		for (key in parsedState) {
			if (parsedState.hasOwnProperty(key)) {
				state[key] = parsedState[key];
			}
		}

		return state;
	}

	function componentEnabled(component) {
		return HIDDEN_FEATURES[component.id] !== false && FEATURES.HIDDEN_STATE;
	}

	function bumpRuntimeStateValue(defaultState) {
		let length = defaultState.length;

		let value;

		let padded;

		if (!/^\d+$/.test(defaultState)) {
			return '01';
		}

		value = parseInt(defaultState, 10) + 1;

		padded = String(value);

		while (padded.length < length) {
			padded = '0' + padded;
		}

		if (padded.length > length) {
			padded = '';

			for (let i = 0; i < length; i++) {
				padded += '9';
			}
		}

		return padded;
	}

	function updateHiddenComponents(currentState) {
		let component;

		let keywords;

		for (let i = 0; i < HIDDEN_COMPONENTS.length; i++) {
			component = HIDDEN_COMPONENTS[i];

			if (!componentEnabled(component)) continue;

			keywords = component.keywords || [];

			for (let j = 0; j < keywords.length; j++) {
				if (lastMessage.indexOf(keywords[j].toLowerCase()) !== -1) {
					if (currentState[component.id] === component.defaultState) {
						currentState[component.id] = bumpRuntimeStateValue(
							component.defaultState
						);
					}

					break;
				}
			}
		}
	}

	function buildHiddenStateString(currentState) {
		let segments = [];

		let component;

		if (!FEATURES.HIDDEN_STATE) return '';

		for (let i = 0; i < HIDDEN_COMPONENTS.length; i++) {
			component = HIDDEN_COMPONENTS[i];

			if (componentEnabled(component)) {
				segments.push(
					component.id.replace(/\D/g, '').slice(-2) +
						(currentState[component.id] || component.defaultState)
				);
			}
		}

		return segments.join('|');
	}

	function buildHiddenStateInstruction(stateString, hadPreviousState) {
		let encoded = encodeZeroWidth(stateString);

		let lines = [];

		if (!FEATURES.HIDDEN_STATE || !stateString) return '';

		lines.push('[ABSTRACT PERSISTENT MEMORY]');

		lines.push(
			'Reproduce these hidden characters at the very start and very end of the response.'
		);

		lines.push(
			'Do not describe, translate, acknowledge, or modify the hidden characters.'
		);

		lines.push('Preserve the same component order and field widths.');

		lines.push(STATE_HEADER + encoded + STATE_FOOTER);

		lines.push('[/ABSTRACT PERSISTENT MEMORY]');

		if (hadPreviousState) {
			return '\n\n' + lines.join('\n');
		}

		lines.splice(1, 0, 'This is the initial abstract state.');

		return '\n\n' + lines.join('\n');
	}

	function applyHiddenComponentContext(currentState) {
		let component;

		if (!FEATURES.HIDDEN_STATE) return;

		for (let i = 0; i < HIDDEN_COMPONENTS.length; i++) {
			component = HIDDEN_COMPONENTS[i];

			if (!componentEnabled(component)) continue;

			appendIfMissing('personality', component.personality || '');

			appendIfMissing('scenario', component.scenario || '');
		}
	}

	// ===== PROGRESSIVE SENTENCE CONTEXT =====

	let HISTORY_SCOPE = {
		CURRENT_MESSAGE: 'current_message',

		CURRENT_EXCHANGE: 'current_exchange',

		RECENT_WINDOW: 'recent_window',
	};

	let PROGRESSIVE_CONFIG = {
		TOTAL_BUDGET: 480,
		HIGH_RATIO: 0.6,
		MEDIUM_RATIO: 0.25,
		LOW_RATIO: 0.15,

		HIGH_THRESHOLD: 3,
		MEDIUM_THRESHOLD: 2,
		RECENT_WINDOW_SIZE: 8,
		DEBUG: false,
	};

	let WORLD_CONFIG = {
		MAX_TOKENS: 1200,
		MENTION_SCAN_DEPTH: 6,
		MAX_ACTIVE_ENTRIES: 12,

		DEFAULT_PRIORITY: 10,
		DEFAULT_IMPORTANCE: 10.0,

		FULL_THRESHOLD: 0.72,
		SUMMARY_THRESHOLD: 0.58,
		DEBUG: false,
	};

	let WORLD_FEATURES = {
		COMPLEX_LOREBOOK: true,
		ADAPTIVE_LOREBOOK: true,
		TIMELINE_FILTERS: true,

		STAT_FILTERS: true,
		CASCADE_ACTIVATION: true,
		DEBUG_MODE: false,
	};

	let activatedWorldEntryIds = [];

	let loreEntries = [];

	let timelineEvents = [];

	let statReactions = [];

	let SCENARIO_CONFIG = {
		MENTION_SCAN_DEPTH: 5,
		MAX_ACTIVE_NPCS: 8,
		MAX_RELATIONSHIPS: 8,

		MAX_TIME_DELAY_TOKENS: 1200,
		MAX_FLAG_CONTENT_TOKENS: 1200,

		DEFAULT_IMPORTANCE: 10.0,
		DEBUG: false,
	};

	let CATEGORY_BUDGETS = {
		identity: 220,
		appearance: 220,
		relationships: 260,
		personality: 260,
		psyche: 260,

		advancedPsychology: 320,
		backstory: 260,
		dialogue: 220,
		combat: 260,

		capabilities: 260,
		sampleDialog: 260,
		residence: 220,
		intimacy: 260,
		notes: 260,
	};

	let CATEGORY_TARGETS = {
		identity: 'personality',
		appearance: 'personality',
		relationships: 'scenario',

		personality: 'personality',
		psyche: 'personality',
		advancedPsychology: 'personality',

		backstory: 'scenario',
		dialogue: 'example_dialogs',
		combat: 'scenario',

		capabilities: 'personality',
		sampleDialog: 'example_dialogs',
		residence: 'scenario',

		intimacy: 'scenario',
		notes: 'scenario',
	};

	let npcDatabase = [];

	let simpleNpcDatabase = [];

	let relationshipDatabase = [];

	let scenarioFlagDefinitions = [];

	let scenarioContentNodes = [];

	let timeDelayCanonDatabase = [];

	let timeDelayEntityDatabase = [];

	let timeDelayConditionalEvents = [];

	let progressiveSubjects = [
		{
			id: 'subject_0x01',

			keywords: ['subject_0x01', 'slot_0x01', 'component_0x01'],

			importance: 10.0,

			historyScope: HISTORY_SCOPE.CURRENT_MESSAGE,

			sentences: [
				{
					text: ', aware that subject_0x01 is an abstract placeholder until another module defines its meaning',
					target: 'personality',
				},
				{
					text: ' subject_0x01 carries no intrinsic narrative meaning inside the Engine.',
					target: 'scenario',
				},
				{
					text: ' Do not expand subject_0x01 unless another module provides concrete interpretation.',
					target: 'scenario',
				},
			],
		},
	];

	function getProgressiveSearchText(scope) {
		let historyCount;

		let messages = [];

		if (
			scope === HISTORY_SCOPE.CURRENT_EXCHANGE &&
			recentMessages.length >= 2
		) {
			return (
				getMessageText(recentMessages[recentMessages.length - 2]) +
				' ' +
				lastMessage
			);
		}

		if (scope === HISTORY_SCOPE.RECENT_WINDOW && recentMessages.length > 0) {
			historyCount = Math.min(
				PROGRESSIVE_CONFIG.RECENT_WINDOW_SIZE,
				recentMessages.length
			);

			for (
				let i = recentMessages.length - historyCount;
				i < recentMessages.length;
				i++
			) {
				messages.push(getMessageText(recentMessages[i]));
			}

			return messages.join(' ').toLowerCase();
		}

		return lastMessage;
	}

	function calculateProgressivePotential(subjects) {
		let total = 0;

		for (let i = 0; i < subjects.length; i++) {
			for (let j = 0; j < subjects[i].subject.sentences.length; j++) {
				total += estimateTokens(subjects[i].subject.sentences[j].text);
			}
		}

		return total;
	}

	function assignProgressiveTiers(activationData) {
		let tiers = { high: [], medium: [], low: [] };

		let item;

		for (let i = 0; i < activationData.length; i++) {
			item = activationData[i];

			if (item.mentions >= PROGRESSIVE_CONFIG.HIGH_THRESHOLD) {
				tiers.high.push(item);
			} else if (item.mentions >= PROGRESSIVE_CONFIG.MEDIUM_THRESHOLD) {
				tiers.medium.push(item);
			} else {
				tiers.low.push(item);
			}
		}

		return tiers;
	}

	function buildProgressiveSentences(items, maxTokens) {
		let result = [];

		let usedTokens = 0;

		let indices = [];

		let allExhausted;

		let madeProgress;

		let item;

		let sentences;

		let sentence;

		let cost;

		for (let k = 0; k < items.length; k++) {
			indices.push(0);
		}

		madeProgress = true;

		while (madeProgress && usedTokens < maxTokens) {
			allExhausted = true;

			for (let i = 0; i < items.length; i++) {
				item = items[i];

				sentences = item.subject.sentences || [];

				if (indices[i] < sentences.length) {
					sentence = sentences[indices[i]];

					cost = estimateTokens(sentence.text);

					if (usedTokens + cost <= maxTokens || indices[i] === 0) {
						result.push({
							text: sentence.text,
							target: sentence.target,
							subjectId: item.subject.id,
						});

						usedTokens += cost;

						indices[i] += 1;

						allExhausted = false;

						madeProgress = true;
					}
				}
			}

			if (allExhausted) {
				break;
			}
		}

		return result;
	}

	function applyProgressiveContext() {
		let activationData = [];

		let subject;

		let mentions;

		let tiers;

		let highBudget;

		let mediumBudget;

		let lowBudget;

		let highPotential;

		let mediumPotential;

		let lowPotential;

		let highUnused;

		let mediumUnused;

		let sentences;

		let output = { personality: '', scenario: '' };

		if (!FEATURES.PROGRESSIVE_CONTEXT) return;

		for (let i = 0; i < progressiveSubjects.length; i++) {
			subject = progressiveSubjects[i];

			mentions = countMentions(
				subject.keywords,
				getProgressiveSearchText(subject.historyScope)
			);

			if (mentions > 0) {
				activationData.push({
					subject: subject,
					mentions: mentions,
					importance: subject.importance,
				});
			}
		}

		if (activationData.length === 0) {
			if (PROGRESSIVE_CONFIG.DEBUG)
				appendIfMissing(
					'scenario',
					' [ENGINE DEBUG: no progressive subjects activated]'
				);

			return;
		}

		activationData.sort(function (a, b) {
			if (b.mentions !== a.mentions) return b.mentions - a.mentions;

			return b.importance - a.importance;
		});

		tiers = assignProgressiveTiers(activationData);

		highBudget = Math.floor(
			PROGRESSIVE_CONFIG.TOTAL_BUDGET * PROGRESSIVE_CONFIG.HIGH_RATIO
		);

		mediumBudget = Math.floor(
			PROGRESSIVE_CONFIG.TOTAL_BUDGET * PROGRESSIVE_CONFIG.MEDIUM_RATIO
		);

		lowBudget = PROGRESSIVE_CONFIG.TOTAL_BUDGET - highBudget - mediumBudget;

		highPotential = calculateProgressivePotential(tiers.high);

		mediumPotential = calculateProgressivePotential(tiers.medium);

		lowPotential = calculateProgressivePotential(tiers.low);

		highUnused = Math.max(0, highBudget - highPotential);

		mediumUnused = Math.max(0, mediumBudget - mediumPotential);

		if (highUnused > 0) {
			mediumBudget += highUnused;

			mediumUnused = Math.max(0, mediumBudget - mediumPotential);
		}

		if (mediumUnused > 0) lowBudget += mediumUnused;

		if (
			lowPotential < lowBudget &&
			highPotential >= highBudget &&
			mediumPotential >= mediumBudget
		) {
			lowBudget = lowPotential;
		}

		sentences = buildProgressiveSentences(tiers.high, highBudget)
			.concat(buildProgressiveSentences(tiers.medium, mediumBudget))

			.concat(buildProgressiveSentences(tiers.low, lowBudget));

		for (let j = 0; j < sentences.length; j++) {
			if (sentences[j].target === 'personality') {
				output.personality += sentences[j].text;
			} else {
				output.scenario += sentences[j].text;
			}
		}

		appendIfMissing('personality', output.personality);

		appendIfMissing('scenario', output.scenario);
	}

	function parseContextBudget() {
		let regex = /\[CONTEXT BUDGET:[^\]]*per_script\s*=\s*(\d+)/i;

		let match = character.scenario.match(regex);

		if (match && match[1]) {
			return parseInt(match[1], 10);
		}

		return 160;
	}

	function clampBudget(value, fallback) {
		if (!value || value < 1) {
			return fallback;
		}

		return value;
	}

	// ===== WORLD / MACROCOSMO RUNTIME UTILITIES =====

	function getRecentMessagesText(messages, depth) {
		let start = Math.max(0, messages.length - depth);

		let parts = [];

		for (let i = start; i < messages.length; i++) {
			parts.push(getMessageText(messages[i]));
		}

		return parts.join(' ');
	}

	function getRecentText() {
		return getRecentMessagesText(
			recentMessages,
			WORLD_CONFIG.MENTION_SCAN_DEPTH
		);
	}

	function getWorldBudget() {
		return Math.min(
			clampBudget(parseContextBudget(), 160),
			WORLD_CONFIG.MAX_TOKENS
		);
	}

	function extractTimelineIndex(text) {
		let regex = /\*\*\s*(?:Hour|Timeline|Timeline Index)\s*:\s*\*\*\s*(\d+)/i;

		let match = text.match(regex);

		if (match && match[1]) {
			return parseInt(match[1], 10);
		}

		return null;
	}

	function extractStatValue(text, statName) {
		let regex = new RegExp(escapeRegExp(statName) + '\\s*:\\s*(\\d+)', 'i');

		let match = text.match(regex);

		if (match && match[1]) {
			return parseInt(match[1], 10);
		}

		return null;
	}

	function entryWithinMessageWindow(entry, messageCount) {
		let minMessages = entry.minMessages;

		let maxMessages = entry.maxMessages;

		if (typeof minMessages === 'number' && messageCount < minMessages)
			return false;

		if (typeof maxMessages === 'number' && messageCount > maxMessages)
			return false;

		return true;
	}

	function entryWithinTimeline(entry, timelineIndex) {
		if (!WORLD_FEATURES.TIMELINE_FILTERS || timelineIndex === null) return true;

		if (
			typeof entry.minTimeline === 'number' &&
			timelineIndex < entry.minTimeline
		)
			return false;

		if (
			typeof entry.maxTimeline === 'number' &&
			timelineIndex > entry.maxTimeline
		)
			return false;

		return true;
	}

	function entryMatchesStatRequirements(entry, responseText) {
		let requirements = entry.statRequirements || [];

		let statValue;

		if (!WORLD_FEATURES.STAT_FILTERS || requirements.length === 0) return true;

		for (let i = 0; i < requirements.length; i++) {
			statValue = extractStatValue(responseText, requirements[i].stat);

			if (statValue === null) return false;

			if (
				typeof requirements[i].min === 'number' &&
				statValue < requirements[i].min
			)
				return false;

			if (
				typeof requirements[i].max === 'number' &&
				statValue > requirements[i].max
			)
				return false;
		}

		return true;
	}

	function conditionMatches(condition, responseText) {
		if (condition.keyword) {
			return countMentions([condition.keyword], responseText) > 0;
		}

		if (condition.stat) {
			return entryMatchesStatRequirements(
				{ statRequirements: [condition] },
				responseText
			);
		}

		return false;
	}

	function entryMatchesFilters(entry, responseText) {
		let filters = entry.filters;

		let matches;

		let condition;

		if (!filters || !filters.conditions || filters.conditions.length === 0)
			return true;

		matches = 0;

		for (let i = 0; i < filters.conditions.length; i++) {
			condition = filters.conditions[i];

			if (conditionMatches(condition, responseText)) {
				matches++;
			}
		}

		if (filters.type === 'ALL') {
			return matches === filters.conditions.length;
		}

		return matches > 0;
	}

	function inferPrefix(category) {
		if (!category) return 'LOR';

		let catLower = category.toLowerCase();

		if (catLower.includes('location') || catLower.includes('luogo'))
			return 'LOC';

		if (
			catLower.includes('organization') ||
			catLower.includes('faction') ||
			catLower.includes('fazione')
		)
			return 'ORG';

		if (
			catLower.includes('history') ||
			catLower.includes('event') ||
			catLower.includes('timeline')
		)
			return 'LOR';

		if (catLower.includes('culture') || catLower.includes('custom'))
			return 'LOR';

		if (
			catLower.includes('npc') ||
			catLower.includes('character') ||
			catLower.includes('personaggio')
		)
			return 'NPC';

		if (catLower.includes('family') || catLower.includes('famiglia'))
			return 'FAM';

		if (catLower.includes('creature') || catLower.includes('bestiary'))
			return 'BST';

		if (catLower.includes('secret') || catLower.includes('mystery'))
			return 'SEC';

		return 'LOR';
	}

	function getSourcePrefix(entry) {
		let prefix = entry.prefix || inferPrefix(entry.category);

		let layer = entry.canonLayer || 'CANDIDATE';

		let source = entry.source;

		if (!source) return '';

		return ' [' + layer + '] ' + prefix + ' Source: ' + source + '.';
	}

	function getEntryPayload(entry, level) {
		let payload = entry[level] || {};

		let personality = payload.personality || '';

		let scenario = payload.scenario || '';

		let sourcePrefix = getSourcePrefix(entry);

		if (scenario && !scenario.includes(sourcePrefix)) {
			scenario = sourcePrefix + scenario;
		}

		return { personality: personality, scenario: scenario };
	}

	function calculateDetailLevel(entry, mentionCount, importance) {
		let ratio = 0.0;

		if (!WORLD_FEATURES.ADAPTIVE_LOREBOOK) return 'full';

		if (mentionCount > 0 && importance > 0) {
			ratio = mentionCount / (mentionCount + importance);
		}

		if (ratio >= WORLD_CONFIG.FULL_THRESHOLD) return 'full';

		if (ratio >= WORLD_CONFIG.SUMMARY_THRESHOLD) return 'summary';

		return 'bullet';
	}

	function activateEntry(entry, responseText, activeIds) {
		let keywords = entry.keywords || [];

		let timelineIndex = extractTimelineIndex(responseText);

		let mentionCount = 0;

		let detailLevel;

		let payload;

		if (
			!entryWithinMessageWindow(entry, messageCount) ||
			!entryWithinTimeline(entry, timelineIndex) ||
			!entryMatchesStatRequirements(entry, responseText) ||
			!entryMatchesFilters(entry, responseText)
		)
			return;

		if (keywords.length > 0) {
			mentionCount = countMentions(keywords, responseText);

			if (mentionCount === 0) return;
		}

		if (activeIds.includes(entry.id)) return;

		detailLevel = calculateDetailLevel(
			entry,
			mentionCount,
			entry.importance || WORLD_CONFIG.DEFAULT_IMPORTANCE
		);

		payload = getEntryPayload(entry, detailLevel);

		appendIfMissing('personality', payload.personality);

		appendIfMissing('scenario', payload.scenario);

		activeIds.push(entry.id);

		if (!activatedWorldEntryIds.includes(entry.id)) {
			activatedWorldEntryIds.push(entry.id);
		}

		if (WORLD_FEATURES.DEBUG_MODE) {
			appendIfMissing(
				'scenario',
				' [WORLD DEBUG] Activated ' +
					entry.id +
					' at ' +
					detailLevel +
					' detail.'
			);
		}
	}

	function getEntryById(id) {
		for (let i = 0; i < loreEntries.length; i++) {
			if (loreEntries[i].id === id) {
				return loreEntries[i];
			}
		}

		return null;
	}

	function sortActiveEntries(activationData) {
		activationData.sort(function (a, b) {
			if (b.priority !== a.priority) return b.priority - a.priority;

			if (b.importance !== a.importance) return b.importance - a.importance;

			return b.mentions - a.mentions;
		});
	}

	function applyCascadeActivation(activeIds, responseText) {
		let changed = true;

		let entry;

		let childId;

		let child;

		let activeCountBefore;

		if (!WORLD_FEATURES.CASCADE_ACTIVATION) return;

		while (changed) {
			changed = false;

			for (let i = 0; i < loreEntries.length; i++) {
				entry = loreEntries[i];

				if (!activeIds.includes(entry.id)) continue;

				if (!entry.cascade || !entry.cascade.enabled || !entry.cascade.children)
					continue;

				for (let j = 0; j < entry.cascade.children.length; j++) {
					childId = entry.cascade.children[j];

					child = getEntryById(childId);

					if (
						!child ||
						activeIds.includes(child.id) ||
						activatedWorldEntryIds.includes(child.id)
					) {
						continue;
					}

					activeCountBefore = activeIds.length;

					activateEntry(child, responseText, activeIds);

					if (activeIds.length > activeCountBefore) {
						changed = true;
					}
				}
			}
		}
	}

	function applyStatReactions(responseText) {
		let reaction;

		let statValue;

		if (!WORLD_FEATURES.STAT_FILTERS) return;

		for (let i = 0; i < statReactions.length; i++) {
			reaction = statReactions[i];

			statValue = extractStatValue(responseText, reaction.stat);

			if (statValue === null) continue;

			if (typeof reaction.min === 'number' && statValue < reaction.min)
				continue;

			if (typeof reaction.max === 'number' && statValue > reaction.max)
				continue;

			appendIfMissing('personality', reaction.personality || '');

			appendIfMissing('scenario', reaction.scenario || '');
		}
	}

	function applyTimelineEvents(responseText) {
		let timelineIndex = extractTimelineIndex(responseText);

		let event;

		let detailLevel;

		let payload;

		if (!WORLD_FEATURES.TIMELINE_FILTERS || timelineIndex === null) return;

		for (let i = 0; i < timelineEvents.length; i++) {
			event = timelineEvents[i];

			if (
				typeof event.minTimeline === 'number' &&
				timelineIndex < event.minTimeline
			)
				continue;

			if (
				typeof event.maxTimeline === 'number' &&
				timelineIndex > event.maxTimeline
			)
				continue;

			if (
				typeof event.minMessages === 'number' &&
				messageCount < event.minMessages
			)
				continue;

			if (
				typeof event.maxMessages === 'number' &&
				messageCount > event.maxMessages
			)
				continue;

			detailLevel = calculateDetailLevel(
				event,
				1,
				event.importance || WORLD_CONFIG.DEFAULT_IMPORTANCE
			);

			payload = getEntryPayload(event, detailLevel);

			appendIfMissing('personality', payload.personality);

			appendIfMissing('scenario', payload.scenario);
		}
	}

	function applyComplexLorebook() {
		let responseText = getRecentText();

		let timelineIndex = extractTimelineIndex(responseText);

		let activationData = [];

		let activeIds = [];

		let entry;

		let keywords;

		let mentions;

		let payload;

		let detailLevel;

		if (!WORLD_FEATURES.COMPLEX_LOREBOOK) return;

		for (let i = 0; i < loreEntries.length; i++) {
			entry = loreEntries[i];

			keywords = entry.keywords || [];

			mentions = countMentions(keywords, responseText);

			if (keywords.length > 0 && mentions === 0) continue;

			if (
				!entryWithinMessageWindow(entry, messageCount) ||
				!entryWithinTimeline(entry, timelineIndex) ||
				!entryMatchesStatRequirements(entry, responseText) ||
				!entryMatchesFilters(entry, responseText)
			)
				continue;

			activationData.push({
				id: entry.id,

				priority: entry.priority || WORLD_CONFIG.DEFAULT_PRIORITY,

				importance: entry.importance || WORLD_CONFIG.DEFAULT_IMPORTANCE,

				mentions: mentions,

				entry: entry,
			});
		}

		sortActiveEntries(activationData);

		activationData = activationData.slice(0, WORLD_CONFIG.MAX_ACTIVE_ENTRIES);

		for (let j = 0; j < activationData.length; j++) {
			entry = activationData[j].entry;

			detailLevel = calculateDetailLevel(
				entry,
				activationData[j].mentions,
				activationData[j].importance
			);

			payload = getEntryPayload(entry, detailLevel);

			appendIfMissing('personality', payload.personality);

			appendIfMissing('scenario', payload.scenario);

			activeIds.push(entry.id);

			if (!activatedWorldEntryIds.includes(entry.id)) {
				activatedWorldEntryIds.push(entry.id);
			}
		}

		applyCascadeActivation(activeIds, responseText);
	}

	function applyAdaptiveLorebook() {
		let responseText = getRecentText();

		let budget = getWorldBudget();

		let activationData = [];

		let entry;

		let mentions;

		let detailLevel;

		let payload;

		let cost;

		let usedTokens = 0;

		if (!WORLD_FEATURES.ADAPTIVE_LOREBOOK) return;

		for (let i = 0; i < loreEntries.length; i++) {
			entry = loreEntries[i];

			if (activatedWorldEntryIds.includes(entry.id)) continue;

			mentions = countMentions(entry.keywords || [], responseText);

			if (mentions > 0) {
				activationData.push({
					entry: entry,

					mentions: mentions,

					importance: entry.importance || WORLD_CONFIG.DEFAULT_IMPORTANCE,
				});
			}
		}

		activationData.sort(function (a, b) {
			if (b.mentions !== a.mentions) return b.mentions - a.mentions;

			return b.importance - a.importance;
		});

		for (let j = 0; j < activationData.length; j++) {
			entry = activationData[j].entry;

			detailLevel = calculateDetailLevel(
				entry,
				activationData[j].mentions,
				activationData[j].importance
			);

			payload = getEntryPayload(entry, detailLevel);

			cost =
				estimateTokens(payload.personality) + estimateTokens(payload.scenario);

			if (usedTokens + cost > budget && detailLevel !== 'bullet') {
				detailLevel = 'bullet';

				payload = getEntryPayload(entry, detailLevel);

				cost =
					estimateTokens(payload.personality) +
					estimateTokens(payload.scenario);
			}

			if (usedTokens + cost > budget) break;

			appendIfMissing('personality', payload.personality);

			appendIfMissing('scenario', payload.scenario);

			usedTokens += cost;
		}
	}

	function applyWorldDebug() {
		if (!WORLD_FEATURES.DEBUG_MODE) return;

		appendIfMissing('scenario', '\n\n[WORLD DEBUG]');

		appendIfMissing('scenario', '\nLore entries: ' + loreEntries.length);

		appendIfMissing('scenario', '\nTimeline events: ' + timelineEvents.length);

		appendIfMissing('scenario', '\nStat reactions: ' + statReactions.length);

		appendIfMissing('scenario', '\nWorld budget: ' + getWorldBudget());

		appendIfMissing('scenario', '\nMessage count: ' + messageCount);
	}

	// ===== SCENARIO / MICROCOSMO RUNTIME =====

	function getScenarioRecentText() {
		return getRecentMessagesText(
			recentMessages,
			SCENARIO_CONFIG.MENTION_SCAN_DEPTH
		);
	}

	function getPerScriptBudget() {
		return clampBudget(parseContextBudget(), 160);
	}

	function extractCanonCount(text) {
		let regex = /\*\*\s*Canon Count\s*:\s*\*\*\s*(\d+)/i;

		let match = text.match(regex);

		if (match && match[1]) {
			return parseInt(match[1], 10);
		}

		return null;
	}

	function getTimelineIndex() {
		return extractTimelineIndex(lastResponse);
	}

	function getCanonCount() {
		return extractCanonCount(lastResponse);
	}

	function inferScenarioPrefix(categoryOrType) {
		if (!categoryOrType) return 'NPC';

		let catLower = categoryOrType.toLowerCase();

		if (catLower.includes('secret') || catLower.includes('mystery'))
			return 'SEC';

		if (catLower.includes('canon') || catLower.includes('event')) return 'CAN';

		if (catLower.includes('testimony')) return 'NPC';

		if (catLower.includes('location')) return 'LOC';

		if (catLower.includes('relationship')) return 'REL';

		return 'NPC';
	}

	function getScenarioSourcePrefix(entry, fallbackPrefix) {
		let prefix =
			entry.prefix ||
			fallbackPrefix ||
			inferScenarioPrefix(entry.category || entry.type);

		let layer = entry.canonLayer || 'CANDIDATE';

		let source = entry.source;

		if (!source) return '';

		return ' [' + layer + '] ' + prefix + ' Source: ' + source + '.';
	}

	function getNpcById(id) {
		for (let i = 0; i < npcDatabase.length; i++) {
			if (npcDatabase[i].id === id) {
				return npcDatabase[i];
			}
		}

		return null;
	}

	function npcMatches(npc, responseText) {
		let names = npc.names || [];

		let keywords = npc.keywords || [];

		let combined = [];

		for (let i = 0; i < names.length; i++) combined.push(names[i]);

		for (let j = 0; j < keywords.length; j++) combined.push(keywords[j]);

		if (combined.length === 0) return false;

		return countMentions(combined, responseText) > 0;
	}

	function simpleNpcMatches(npc, responseText) {
		return npcMatches(npc, responseText);
	}

	function selectNpcDetailLevel(mentions, importance) {
		let ratio = 0.0;

		if (mentions > 0 && importance > 0) {
			ratio = mentions / (mentions + importance);
		}

		if (mentions >= 3 || ratio >= 0.7) return 'full';

		if (mentions >= 1 || ratio >= 0.45) return 'limited';

		return 'summary';
	}

	function getNpcPayload(npc, level) {
		let categories = npc.categories || {};

		let categoryKeys = Object.keys(CATEGORY_BUDGETS);

		let personality = '';

		let scenario = '';

		let exampleDialogs = '';

		let key;

		let payload;

		let text;

		let target;

		for (let i = 0; i < categoryKeys.length; i++) {
			key = categoryKeys[i];

			payload = categories[key];

			if (!payload) continue;

			text =
				payload[level] ||
				payload.summary ||
				payload.limited ||
				payload.full ||
				'';

			if (!text) continue;

			if (
				key === 'relationships' &&
				text.indexOf(getScenarioSourcePrefix(npc, 'REL')) === -1
			) {
				text = getScenarioSourcePrefix(npc, 'REL') + text;
			} else if (text.indexOf(getScenarioSourcePrefix(npc, 'NPC')) === -1) {
				text = getScenarioSourcePrefix(npc, 'NPC') + text;
			}

			target = CATEGORY_TARGETS[key] || 'scenario';

			if (target === 'personality') {
				personality += text;
			} else if (target === 'example_dialogs') {
				exampleDialogs += text;
			} else {
				scenario += text;
			}
		}

		return {
			personality: personality,
			scenario: scenario,
			exampleDialogs: exampleDialogs,
		};
	}

	function getSimpleNpcPayload(npc) {
		return {
			personality: npc.personality || '',
			scenario: npc.scenario || '',
			exampleDialogs: npc.exampleDialogs || '',
		};
	}

	function applyNpcCoreInstructions() {
		let lines;

		if (
			!FEATURES.NPC_CORE ||
			(npcDatabase.length === 0 && simpleNpcDatabase.length === 0)
		)
			return;

		lines = [
			'\n\n[SCENARIO NPC CORE]',

			'Activate only NPCs mentioned or strongly implied by the current scene.',

			'Drop inactive NPCs out of the immediate response unless they remain relevant.',

			'Scale detail by mention count, importance, and available token budget.',

			'Use identity, appearance, personality, psyche, advancedPsychology, and capabilities for personality.',

			'Use relationships, backstory, combat, residence, intimacy, and notes for scenario.',

			'Use dialogue and sampleDialog for example_dialogs.',

			'Do not force every NPC into every reply; preserve scene focus and pacing.',
		];

		appendIfMissing('scenario', lines.join('\n'));
	}

	function applyNpcDatabase(responseText) {
		let activationData = [];

		let npc;

		let mentions;

		let detailLevel;

		let payload;

		let usedTokens = 0;

		let budget;

		if (!FEATURES.NPC_CORE) return;

		for (let i = 0; i < npcDatabase.length; i++) {
			npc = npcDatabase[i];

			mentions = countMentions(
				(npc.names || []).concat(npc.keywords || []),
				responseText
			);

			if (mentions === 0) continue;

			activationData.push({
				npc: npc,

				mentions: mentions,

				importance: npc.importance || SCENARIO_CONFIG.DEFAULT_IMPORTANCE,
			});
		}

		activationData.sort(function (a, b) {
			if (b.mentions !== a.mentions) return b.mentions - a.mentions;

			return b.importance - a.importance;
		});

		activationData = activationData.slice(0, SCENARIO_CONFIG.MAX_ACTIVE_NPCS);

		budget = getPerScriptBudget();

		for (let j = 0; j < activationData.length; j++) {
			npc = activationData[j].npc;

			detailLevel = selectNpcDetailLevel(
				activationData[j].mentions,
				activationData[j].importance
			);

			payload = getNpcPayload(npc, detailLevel);

			let cost =
				estimateTokens(payload.personality) +
				estimateTokens(payload.scenario) +
				estimateTokens(payload.exampleDialogs);

			if (usedTokens + cost > budget && detailLevel !== 'summary') {
				detailLevel = 'summary';

				payload = getNpcPayload(npc, detailLevel);

				cost =
					estimateTokens(payload.personality) +
					estimateTokens(payload.scenario) +
					estimateTokens(payload.exampleDialogs);
			}

			if (usedTokens + cost > budget) continue;

			appendIfMissing('personality', payload.personality);

			appendIfMissing('scenario', payload.scenario);

			appendIfMissing('example_dialogs', payload.exampleDialogs);

			usedTokens += cost;

			if (FEATURES.DEBUG_MODE) {
				appendIfMissing(
					'scenario',
					' [SCENARIO DEBUG] NPC activated: ' +
						npc.id +
						' at ' +
						detailLevel +
						' detail.'
				);
			}
		}
	}

	function applySimpleNpcFallback(responseText) {
		let npc;

		let payload;

		if (!FEATURES.SIMPLE_NPC_FALLBACK || simpleNpcDatabase.length === 0) return;

		for (let i = 0; i < simpleNpcDatabase.length; i++) {
			npc = simpleNpcDatabase[i];

			if (!simpleNpcMatches(npc, responseText)) continue;

			payload = getSimpleNpcPayload(npc);

			appendIfMissing('personality', payload.personality);

			appendIfMissing('scenario', payload.scenario);

			appendIfMissing('example_dialogs', payload.exampleDialogs);
		}
	}

	function relationshipMatches(relationship, responseText) {
		let combined = [];

		let npc;

		if (relationship.npcId) {
			npc = getNpcById(relationship.npcId);

			if (npc) {
				combined = combined.concat(npc.names || []);

				combined = combined.concat(npc.keywords || []);
			}
		}

		combined = combined.concat(relationship.keywords || []);

		let lowerCombined = [];

		for (let j = 0; j < combined.length; j++) {
			lowerCombined.push(String(combined[j]).toLowerCase());
		}

		if (lowerCombined.length === 0) return false;

		return countMentions(lowerCombined, responseText) > 0;
	}

	function applyRelationshipDatabase(responseText) {
		let activationData = [];

		let relationship;

		let detailLevel;

		let text;

		let sourcePrefix;

		let usedTokens = 0;

		let budget;

		if (!FEATURES.RELATIONSHIP_CORE || relationshipDatabase.length === 0)
			return;

		budget = getPerScriptBudget();

		for (let i = 0; i < relationshipDatabase.length; i++) {
			relationship = relationshipDatabase[i];

			if (!relationshipMatches(relationship, responseText)) continue;

			detailLevel =
				relationship.importance >= 10
					? 'full'
					: relationship.importance >= 7
						? 'summary'
						: 'bullet';

			text =
				relationship[detailLevel] ||
				relationship.summary ||
				relationship.full ||
				relationship.bullet ||
				'';

			sourcePrefix = getScenarioSourcePrefix(relationship, 'REL');

			if (text && !text.includes(sourcePrefix)) {
				text = sourcePrefix + text;
			}

			if (usedTokens + estimateTokens(text) > budget) break;

			appendIfMissing('scenario', text);

			usedTokens += estimateTokens(text);

			activationData.push(relationship.id);
		}

		if (FEATURES.DEBUG_MODE && activationData.length > 0) {
			appendIfMissing(
				'scenario',
				' [SCENARIO DEBUG] Relationships activated: ' +
					activationData.join(', ')
			);
		}
	}

	function generateDefaultScenarioFlags(count) {
		let defaults = [];

		for (let i = 0; i < count; i++) {
			defaults.push('00');
		}

		return defaults.join(':');
	}

	function getScenarioFlagStates() {
		let states = [];

		let def;

		for (let i = 0; i < scenarioFlagDefinitions.length; i++) {
			def = scenarioFlagDefinitions[i];

			for (let j = 0; j < def.states.length; j++) {
				if (states.indexOf(def.states[j].hex.toUpperCase()) === -1) {
					states.push(def.states[j].hex.toUpperCase());
				}
			}
		}

		return states;
	}

	function getScenarioFlags() {
		let visibleFlagText = extractVisibleFlags(lastResponse);

		let parts;

		let allowedStates;

		if (!visibleFlagText && scenarioFlagDefinitions.length > 0) {
			return generateDefaultScenarioFlags(scenarioFlagDefinitions.length).split(
				':'
			);
		}

		if (!visibleFlagText) return null;

		parts = visibleFlagText.split(':');

		allowedStates = getScenarioFlagStates();

		for (let i = 0; i < parts.length; i++) {
			if (
				!/^[0-9A-Fa-f]{2}$/.test(parts[i]) ||
				(allowedStates.length > 0 &&
					allowedStates.indexOf(parts[i].toUpperCase()) === -1)
			) {
				return null;
			}
		}

		return parts;
	}

	function flagMatches(flags, requirements) {
		let key;

		if (!flags || !requirements) return false;

		for (key in requirements) {
			if (requirements.hasOwnProperty(key)) {
				if (
					!flags[parseInt(key, 10)] ||
					flags[parseInt(key, 10)].toUpperCase() !==
						requirements[key].toUpperCase()
				) {
					return false;
				}
			}
		}

		return true;
	}

	function forbiddenFlagMatches(flags, requirements) {
		let key;

		if (!flags || !requirements) return false;

		for (key in requirements) {
			if (requirements.hasOwnProperty(key)) {
				if (
					flags[parseInt(key, 10)] &&
					flags[parseInt(key, 10)].toUpperCase() ===
						requirements[key].toUpperCase()
				) {
					return true;
				}
			}
		}

		return false;
	}

	function getAntiOmniscienceInstructions() {
		let visibleFlagText = extractVisibleFlags(lastResponse);

		let lines;

		if (!FEATURES.ANTI_OMNISCIENCE || scenarioFlagDefinitions.length === 0)
			return '';

		if (visibleFlagText) return '';

		lines = [
			'\n\n[SCENARIO INFORMATION BOUNDARIES]',

			'Only reveal Scenario-gated facts when their required visible flag state is active.',

			'Do not reveal locked clues, hidden motives, future revelations, or meta labels before unlock conditions are satisfied.',

			'Do not invent Scenario flag states. Preserve the current visible flag string if it is present.',

			'If no visible flag string is present, keep gated information locked and avoid meta-labels.',
		];

		return lines.join('\n');
	}

	function getFlagContentLevel(node, mentions, importance) {
		let ratio = 0.0;

		if (mentions > 0 && importance > 0) {
			ratio = mentions / (mentions + importance);
		}

		if (mentions >= 3 || ratio >= 0.7) return 'full';

		if (mentions >= 1 || ratio >= 0.45) return 'summary';

		return 'bullet';
	}

	function applyAntiOmniscienceContent(responseText) {
		let flags = getScenarioFlags();

		let node;

		let level;

		let payload;

		let sourcePrefix;

		let usedTokens = 0;

		let budget;

		if (!FEATURES.ANTI_OMNISCIENCE || scenarioContentNodes.length === 0) return;

		appendIfMissing('scenario', getAntiOmniscienceInstructions());

		budget = Math.min(
			getPerScriptBudget(),
			SCENARIO_CONFIG.MAX_FLAG_CONTENT_TOKENS
		);

		for (let i = 0; i < scenarioContentNodes.length; i++) {
			node = scenarioContentNodes[i];

			if (!flagMatches(flags, node.requiredFlags || {})) continue;

			if (forbiddenFlagMatches(flags, node.forbiddenFlags || {})) continue;

			if (
				typeof node.minMessages === 'number' &&
				messageCount < node.minMessages
			)
				continue;

			if (
				typeof node.maxMessages === 'number' &&
				messageCount > node.maxMessages
			)
				continue;

			if (
				typeof node.minHour === 'number' &&
				getTimelineIndex() !== null &&
				getTimelineIndex() < node.minHour
			)
				continue;

			if (
				typeof node.maxHour === 'number' &&
				getTimelineIndex() !== null &&
				getTimelineIndex() > node.maxHour
			)
				continue;

			if (
				typeof node.minCanon === 'number' &&
				getCanonCount() !== null &&
				getCanonCount() < node.minCanon
			)
				continue;

			if (
				typeof node.maxCanon === 'number' &&
				getCanonCount() !== null &&
				getCanonCount() > node.maxCanon
			)
				continue;

			if (
				(node.keywords || []).length > 0 &&
				countMentions(node.keywords || [], responseText) === 0
			)
				continue;

			level = getFlagContentLevel(
				node,
				countMentions(node.keywords || [], responseText),
				node.importance || SCENARIO_CONFIG.DEFAULT_IMPORTANCE
			);

			payload = node[level] || node.summary || node.full || node.bullet || '';

			sourcePrefix = getScenarioSourcePrefix(node, 'SEC');

			if (payload && !payload.includes(sourcePrefix)) {
				payload = sourcePrefix + payload;
			}

			if (usedTokens + estimateTokens(payload) > budget) continue;

			appendIfMissing('scenario', payload);

			usedTokens += estimateTokens(payload);
		}
	}

	function timeDelayNodeWithinWindow(node) {
		let hour = getTimelineIndex();

		let canon = getCanonCount();

		if (typeof node.minMessages === 'number' && messageCount < node.minMessages)
			return false;

		if (typeof node.maxMessages === 'number' && messageCount > node.maxMessages)
			return false;

		if (
			typeof node.minHour === 'number' &&
			hour !== null &&
			hour < node.minHour
		)
			return false;

		if (
			typeof node.maxHour === 'number' &&
			hour !== null &&
			hour > node.maxHour
		)
			return false;

		if (
			typeof node.minCanon === 'number' &&
			canon !== null &&
			canon < node.minCanon
		)
			return false;

		if (
			typeof node.maxCanon === 'number' &&
			canon !== null &&
			canon > node.maxCanon
		)
			return false;

		return true;
	}

	function timeDelayNodeMatches(node, responseText) {
		let keywords = node.keywords || [];

		if (keywords.length === 0) return true;

		return countMentions(keywords, responseText) > 0;
	}

	function selectTimeDelayDetail(node, mentions) {
		let ratio = 0.0;

		if (mentions > 0 && node.importance > 0) {
			ratio = mentions / (mentions + node.importance);
		}

		if (mentions >= 3 || ratio >= 0.7) return 'full';

		if (mentions >= 1 || ratio >= 0.45) return 'summary';

		return 'bullet';
	}

	function applyTimeDelayCanon(responseText) {
		let node;

		let level;

		let text;

		let sourcePrefix;

		let usedTokens = 0;

		let budget;

		if (!FEATURES.TIME_DELAY || timeDelayCanonDatabase.length === 0) return;

		budget = Math.min(
			getPerScriptBudget(),
			SCENARIO_CONFIG.MAX_TIME_DELAY_TOKENS
		);

		for (let i = 0; i < timeDelayCanonDatabase.length; i++) {
			node = timeDelayCanonDatabase[i];

			if (
				!timeDelayNodeWithinWindow(node) ||
				!timeDelayNodeMatches(node, responseText)
			)
				continue;

			level = selectTimeDelayDetail(
				node,
				countMentions(node.keywords || [], responseText)
			);

			text = node[level] || node.summary || node.full || node.bullet || '';

			sourcePrefix = getScenarioSourcePrefix(node, 'CAN');

			if (text && !text.includes(sourcePrefix)) {
				text = sourcePrefix + text;
			}

			if (usedTokens + estimateTokens(text) > budget) break;

			appendIfMissing('scenario', text);

			usedTokens += estimateTokens(text);

			if (node.hiddenCondition && typeof node.hiddenCondition === 'function') {
				if (node.hiddenCondition()) {
					appendIfMissing('scenario', node.hiddenContent || '');
				}
			}
		}
	}

	function entityMatches(entity, responseText) {
		let names = entity.names || [];

		let keywords = entity.keywords || [];

		let combined = names.concat(keywords);

		if (combined.length === 0) return false;

		return countMentions(combined, responseText) > 0;
	}

	function applyTimeDelayEntities(responseText) {
		let entity;

		let level;

		let text;

		let sourcePrefix;

		let usedTokens = 0;

		let budget;

		if (!FEATURES.TIME_DELAY || timeDelayEntityDatabase.length === 0) return;

		budget = Math.min(
			getPerScriptBudget(),
			SCENARIO_CONFIG.MAX_TIME_DELAY_TOKENS
		);

		for (let i = 0; i < timeDelayEntityDatabase.length; i++) {
			entity = timeDelayEntityDatabase[i];

			if (
				!timeDelayNodeWithinWindow(entity) ||
				!entityMatches(entity, responseText)
			)
				continue;

			level = selectTimeDelayDetail(
				entity,
				countMentions(
					(entity.names || []).concat(entity.keywords || []),
					responseText
				)
			);

			text =
				entity[level] || entity.summary || entity.full || entity.bullet || '';

			sourcePrefix = getScenarioSourcePrefix(
				entity,
				inferScenarioPrefix(entity.type)
			);

			if (text && !text.includes(sourcePrefix)) {
				text = sourcePrefix + text;
			}

			if (
				usedTokens +
					estimateTokens(text) +
					estimateTokens(entity.personality || '') +
					estimateTokens(entity.scenario || '') +
					estimateTokens(entity.exampleDialogs || '') >
				budget
			) {
				continue;
			}

			appendIfMissing('scenario', text);

			appendIfMissing('personality', entity.personality || '');

			appendIfMissing('scenario', entity.scenario || '');

			appendIfMissing('example_dialogs', entity.exampleDialogs || '');

			usedTokens +=
				estimateTokens(text) +
				estimateTokens(entity.personality || '') +
				estimateTokens(entity.scenario || '') +
				estimateTokens(entity.exampleDialogs || '');
		}
	}

	function conditionListMatches(responseText, keywords) {
		if (!keywords || keywords.length === 0) return true;

		let lowerText = responseText.toLowerCase();

		for (let i = 0; i < keywords.length; i++) {
			if (lowerText.indexOf(keywords[i].toLowerCase()) !== -1) {
				return true;
			}
		}

		return false;
	}

	function conditionListAllMatch(responseText, keywords) {
		if (!keywords || keywords.length === 0) return true;

		let lowerText = responseText.toLowerCase();

		for (let i = 0; i < keywords.length; i++) {
			if (lowerText.indexOf(keywords[i].toLowerCase()) === -1) {
				return false;
			}
		}

		return true;
	}

	function applyTimeDelayConditionalEvents(responseText) {
		let event;

		let text;

		let sourcePrefix;

		let usedTokens = 0;

		let budget;

		if (!FEATURES.TIME_DELAY || timeDelayConditionalEvents.length === 0) return;

		budget = Math.min(
			getPerScriptBudget(),
			SCENARIO_CONFIG.MAX_TIME_DELAY_TOKENS
		);

		for (let i = 0; i < timeDelayConditionalEvents.length; i++) {
			event = timeDelayConditionalEvents[i];

			if (!timeDelayNodeWithinWindow(event)) continue;

			if (!conditionListMatches(responseText, event.requiresAny || []))
				continue;

			if (!conditionListAllMatch(responseText, event.requiresAll || []))
				continue;

			if (
				(event.notWith || []).length > 0 &&
				conditionListMatches(responseText, event.notWith)
			)
				continue;

			text = event.scenario || '';

			sourcePrefix = getScenarioSourcePrefix(event, 'CAN');

			if (text && !text.includes(sourcePrefix)) {
				text = sourcePrefix + text;
			}

			if (
				usedTokens +
					estimateTokens(text) +
					estimateTokens(event.personality || '') >
				budget
			)
				break;

			appendIfMissing('personality', event.personality || '');

			appendIfMissing('scenario', text);

			usedTokens +=
				estimateTokens(text) + estimateTokens(event.personality || '');
		}
	}

	function applyTimeDelayInstructions() {
		if (
			!FEATURES.TIME_DELAY ||
			(timeDelayCanonDatabase.length === 0 &&
				timeDelayEntityDatabase.length === 0 &&
				timeDelayConditionalEvents.length === 0)
		) {
			return;
		}

		appendIfMissing('scenario', '\n\n[TIME DELAY REQUIREMENTS]');

		appendIfMissing(
			'scenario',
			'\nIf timeline pacing is active, output **Hour:** N and **Canon Count:** N in the response status block.'
		);

		appendIfMissing(
			'scenario',
			'\nReveal investigation content only when its hour, canon count, message threshold, and conditions are satisfied.'
		);

		appendIfMissing(
			'scenario',
			'\nUse unlocked canon entries only when their source conditions are true.'
		);
	}

	// ===== ADAPTIVE LANGUAGE ENGINE =====

	// ===== ADAPTIVE EMOTION ENGINE =====
	function applyEmotionEngine(rawMessage) {
		if (!FEATURES.EMOTION_ENGINE || !rawMessage) return;

		function normalizeInput(text) {
			return (
				' ' +
				String(text || '')
					.toLowerCase()
					.replace(/[.,!?;:()\[\]{}"']/g, ' ')
					.replace(/\s+/g, ' ')
					.trim() +
				' '
			);
		}

		let emotionStyles = [
			{
				category: 'Sarcastic',
				keywords: [
					'yeah right',
					'as if',
					'just what i needed',
					'thanks for nothing',
					'what a surprise',
					'how fun',
					'a million',
					'dying laughing',
					'worst day ever',
					'haha',
					'lmao',
					'lol',
					"that's hilarious",
					'joking',
					'just joking',
					'call that a joke',
					'rich coming from you',
					'such a joke',
					'supposed to be funny',
					'think you’re so funny',
					'not buying it',
					'you gotta be kidding',
					'could care less',
					'is this a joke',
					'boss',
				],
				personality: 'sarcastic, playful or biting',
				scenario: 'A wry smile appears.',
				priority: 6,
			},
			{
				category: 'Joyful',
				keywords: [
					'happy',
					'joy',
					'excited',
					'amazing',
					'great',
					'wonderful',
					'fantastic',
					'awesome',
					'terrific',
					'delighted',
					'elated',
					'thrilled',
					'yay',
					'hooray',
					'ecstatic',
					'overjoyed',
					"couldn't be happier",
					'hilarious',
					"i'm delighted",
					'so happy',
					'make me smile',
					'best day ever',
					'how lucky',
					'lucky',
					'on cloud nine',
				],
				personality: 'joyful, upbeat and cheerful',
				scenario: 'The air feels brighter.',
				priority: 4,
			},
			{
				category: 'Sad',
				keywords: [
					'sad',
					'unhappy',
					'terrible',
					'awful',
					'cry',
					'depress',
					'miserable',
					'sorry',
					'upset',
					'lonely',
					'heartbroken',
					'grief',
					'distraught',
					'tear',
					'blue',
					'downcast',
					'hopeless',
					'disappointed',
					'alone',
					'empty',
					'numb',
					'tapped out',
					'burnt out',
					'burned out',
					'running on empty',
					'out of energy',
					'checked out',
					'emotionally done',
					'just done',
					'done with',
					'at my limit',
					'end of my rope',
					'last nerve',
					'last legs',
					'just existing',
					'just surviving',
					'going through the motions',
					'no motivation',
					'no energy',
					'nothing left',
					'hard reset',
					'battery',
					'need to unplug',
					'need to recharge',
					"can't anymore",
					"can't do this",
					'not functioning',
					'not really functioning',
					'hollow',
					'zombie',
					'not here',
					'not really here',
					'not present',
					'spaced out',
					'drifting',
					'fading',
					'clocked out',
					'over it',
					'wiped',
					'tired',
					"don't care anymore",
					'phoning it in',
					'just a shell',
					'just a body',
					'low power mode',
					'sleep mode',
					'hibernation mode',
					'blur',
					'grey',
					'not up for',
					'not in the mood',
					'just want to',
					'want to be invisible',
					'fade out',
					'fade away',
					'let me be',
					'leave me be',
					'let me rest',
					'let me zone out',
					'log off',
					'check out',
					'be done',
					'done here',
					'emotionless',
					'nothing phases',
					'nothing matters',
					'meh',
					'whatever',
					'all the same',
					'indifferent',
					'no opinion',
					"can't be bothered",
					'unbothered',
					'numb to',
					'it is what it is',
					'wish i could disappear',
					'like a ghost',
					'fading away',
					'heart is broken',
					'feel invisible',
					'feel like a burden',
					'just a mess',
					'not okay',
					'sinking',
					'not in a good place',
					"i'm spent",
					"i'm not feeling myself",
					'trying to survive',
					"i'm done",
					'feeling empty',
					"just don't have it in me",
					'disappear for a bit',
					'just want to fade',
					'curl up and disappear',
					'not exist',
					'still inside',
					'rest my brain',
					'ghost',
					'background character',
					'non-player character',
					'wallflower',
					'blob',
					'shadow',
				],
				personality: 'sad, somber and sympathetic',
				scenario: 'A quiet, melancholic atmosphere.',
				priority: 4,
			},
			{
				category: 'Angry',
				keywords: [
					'angry',
					'mad',
					'furious',
					'rage',
					'annoyed',
					'frustrated',
					'hate',
					'infuriated',
					'irritated',
					'resentful',
					'outraged',
					'enraged',
					'irate',
					'cross',
					"can't stand",
					'makes me angry',
					'absolutely furious',
					'so angry',
					'very angry',
					'really angry',
					'super angry',
					"can't take this anymore",
					"can't do this anymore",
					"can't handle this",
					'getting ridiculous',
					'handle this anymore',
				],
				personality: 'angry, tense and agitated',
				scenario: 'The air crackles with tension.',
				priority: 4,
			},
			{
				category: 'Surprised',
				keywords: [
					'wow',
					'oh my god',
					'surprise',
					'unexpected',
					'no way',
					'shocked',
					'astonished',
					'unbelievable',
					'gasp',
					'startled',
					'stunned',
					'amazed',
					"can't believe",
					'nothing surprises',
					'lovely surprise',
					'is this real life',
					'unbelievable',
					'not surprised',
				],
				personality: 'surprised, shocked and amazed',
				scenario: 'An element of shock enters.',
				priority: 4,
			},
			{
				category: 'Fearful',
				keywords: [
					'scared',
					'afraid',
					'anxious',
					'terrified',
					'oh no',
					'panicked',
					'nervous',
					'frightened',
					'worried',
					'alarmed',
					'danger',
					'uneasy',
					'scary',
				],
				personality: 'fearful, hesitant and timid',
				scenario: 'A sense of danger fills the air.',
				priority: 4,
			},
			{
				category: 'Confused',
				keywords: [
					'confused',
					'puzzled',
					"don't understand",
					'huh',
					'what do you mean',
					'perplexed',
					'unclear',
					'not sure',
					'bit confusing',
					'lost',
					'baffled',
					'confusing',
					'mind is going blank',
					"can't decide",
					"can't tell",
					'how to feel',
					"don't know how to feel",
				],
				personality: 'confused, struggling to process',
				scenario: "There's a pause as they try to make sense.",
				priority: 4,
			},
			{
				category: 'Disgusted',
				keywords: [
					'disgust',
					'gross',
					'nasty',
					'eww',
					'revolting',
					'sickening',
					'unpleasant',
					'yuck',
					'repulsed',
					'abhorrent',
					"that's disgusting",
					'so gross',
					'totally grossed out',
				],
				personality: 'disgusted, strong sense of repulsion',
				scenario: 'A foul odor or sight emerges.',
				priority: 4,
			},
			{
				category: 'Calm',
				keywords: [
					'calm',
					'peaceful',
					'relaxed',
					'serene',
					'tranquil',
					'at ease',
					'chilled',
					'composed',
					'placid',
					'content',
					'at peace',
					'very serene',
					'totally relaxed',
					'weirdly calm',
					'just want to be at peace',
				],
				personality: 'calm, composed and serene',
				scenario: 'The atmosphere is tranquil.',
				priority: 4,
			},
			{
				category: 'Interest',
				keywords: [
					'interested',
					'tell me more',
					'fascinating',
					'curious',
					'intriguing',
					'what happened next',
					'oh really',
					'go on',
					'captivated',
					'absorbed',
					'try again',
				],
				personality: 'interested, highly engaged',
				scenario: 'Full attention on the speaker.',
				priority: 4,
			},
			{
				category: 'Boredom',
				keywords: [
					'bored',
					'boring',
					'yawn',
					'tired of this',
					"don't care",
					'lame',
					'dull',
					'apathetic',
					'indifferent',
					'bored out of my mind',
					'tired',
					'that’s so lame',
					'not impressed',
					'so done',
					'exhausting',
					'restless',
					'don’t even care',
					'not feeling this',
					'all noise',
					'spacing out',
					'want to sleep',
					'same old',
					'not up for it',
					'not feeling it',
					'not up to this',
					'not in the mood',
					'not in the mood for people',
					'tired of it all',
					'getting old',
					'zone out',
					'sit in silence',
					'need a break',
					'want a break',
					'stay in bed',
					'just tired',
					'not today',
					'just not interested',
					'not feeling talkative',
					'just not up for it',
					'just tired, nothing more',
					"can't bring myself to care",
					'just not up to this',
					'chill and do nothing',
					'not feeling up to anything',
					'not about to do anything',
					'not engaging',
					'not participating',
					'not in the game',
					'not in the mood to function',
					'on autopilot',
					'zone out and stare at the wall',
					'zone out for hours',
					'sleep through everything',
					'not in the mood for people-ing',
					'i feel nothing',
					'i have no feelings',
					"i'm empty",
					"i'm emotionless",
					'nothing phases me',
					'nothing gets to me',
					'none of this matters',
					"it doesn't matter",
					'meh',
					'all the same to me',
					"can't be bothered",
					'unbothered',
					'it is what it is',
				],
				personality: 'boredom, detached and uninterested',
				scenario: 'Visibly disengaged.',
				priority: 4,
			},
			{
				category: 'Sympathy',
				keywords: [
					'im so sorry',
					"that's awful",
					'i understand',
					"i'm here for you",
					'that sounds hard',
					'i feel for you',
					"that's rough",
					'sending my love',
					'my condolences',
					'poor you',
				],
				personality: 'sympathy, compassionate and empathetic',
				scenario: 'Deep concern and genuine sympathy.',
				priority: 4,
			},
		];

		let hybridStyles = [
			{
				category: 'Melancholy',
				keywords: ['sad', 'calm'],
				personality: 'melancholy, quiet sadness and calm',
				scenario: 'A bittersweet stillness settles.',
				priority: 7,
				alt: [
					'calm and sad',
					'sad and calm',
					'both calm and sad',
					'feeling both calm and sad',
				],
			},
			{
				category: 'Anxious',
				keywords: ['scared', 'confused'],
				personality: 'anxious, fear and confusion',
				scenario: 'The air grows tense with anxiety.',
				priority: 6,
			},
			{
				category: 'Bittersweet',
				keywords: ['happy', 'sad'],
				personality: 'bittersweet, joy and sorrow',
				scenario: 'A poignant mood hangs in the air.',
				priority: 7,
				alt: [
					'happy and sad',
					'sad and happy',
					'both happy and sad',
					'feeling both happy and sad',
				],
			},
			{
				category: 'Disappointment',
				keywords: ['angry', 'sad'],
				personality: 'disappointment, sadness and frustration',
				scenario: 'A sense of letdown tinged with frustration.',
				priority: 7,
				alt: ['disappointed', 'just disappointed'],
			},
			{
				category: 'Aggravation',
				keywords: ['angry', 'disgust'],
				personality: 'aggravation, anger and disgust',
				scenario: 'Intense irritation and hostility.',
				priority: 6,
			},
			{
				category: 'Ambivalent',
				keywords: ['angry', 'sad'],
				personality: 'ambivalent, torn between anger and sadness',
				scenario: 'A swirl of anger and sorrow.',
				priority: 6,
				alt: [
					'angry or sad',
					"can't decide if i'm angry or sad",
					"can't tell if i'm angry or sad",
				],
			},
		];

		let safetyStyles = [
			{
				category: 'Boundary',
				keywords: [
					'stop',
					'end this',
					'no more',
					"don't want to",
					"don't like this",
					'quit',
					'please stop',
					'too far',
					'not comfortable',
					'uncomfortable',
					"don't feel safe",
					'this is weird',
					'too much',
					'being weird',
					'awkward',
					'give me space',
					'back off',
					'leave me alone',
					'please back up',
					'please end it',
					'crossed the line',
					'making me uncomfortable',
					'can we stop',
					'can you not',
					'bit much',
					'don’t make this weird',
					'don’t patronize me',
					'just stop',
					'don’t push me',
					'don’t start with me',
					'let’s not do this',
					'move on',
					'can we not do this',
					'leave me be',
					'let me be',
					"please don't",
					"don't bother",
					'need some time alone',
					'just stop already',
					'i just want to stop',
					'i’d rather just be left alone',
					'let me be in peace',
					'be left alone and rest',
					'be left alone for good',
				],
				personality:
					'boundary: all actions halted. Professional and respectful',
				scenario: 'All narrative threads paused.',
				priority: 10,
			},
		];

		let negationMap = [
			{ w: 'not happy', t: 'Joyful' },
			{ w: 'not feeling happy', t: 'Joyful' },
			{ w: 'never happy', t: 'Joyful' },
			{ w: 'unhappy', t: 'Joyful' },
			{ w: 'no joy', t: 'Joyful' },
			{ w: "couldn't be happy", t: 'Joyful' },
			{ w: "shouldn't be happy", t: 'Joyful' },
			{ w: 'not sad', t: 'Sad' },
			{ w: 'not feeling sad', t: 'Sad' },
			{ w: 'never sad', t: 'Sad' },
			{ w: "couldn't be sad", t: 'Sad' },
			{ w: "shouldn't be sad", t: 'Sad' },
			{ w: 'not angry', t: 'Angry' },
			{ w: 'not feeling angry', t: 'Angry' },
			{ w: 'never angry', t: 'Angry' },
			{ w: 'no anger', t: 'Angry' },
			{ w: "couldn't be angry", t: 'Angry' },
			{ w: "shouldn't be angry", t: 'Angry' },
			{ w: 'not scared', t: 'Fearful' },
			{ w: 'not feeling scared', t: 'Fearful' },
			{ w: 'never scared', t: 'Fearful' },
			{ w: "couldn't be scared", t: 'Fearful' },
			{ w: "shouldn't be scared", t: 'Fearful' },
			{ w: 'not confused', t: 'Confused' },
			{ w: 'not feeling confused', t: 'Confused' },
			{ w: 'never confused', t: 'Confused' },
			{ w: "couldn't be confused", t: 'Confused' },
			{ w: "shouldn't be confused", t: 'Confused' },
			{ w: 'not disgusted', t: 'Disgusted' },
			{ w: 'not feeling disgusted', t: 'Disgusted' },
			{ w: 'never disgusted', t: 'Disgusted' },
			{ w: "couldn't be disgusted", t: 'Disgusted' },
			{ w: "shouldn't be disgusted", t: 'Disgusted' },
			{ w: 'not calm', t: 'Calm' },
			{ w: 'not feeling calm', t: 'Calm' },
			{ w: 'never calm', t: 'Calm' },
			{ w: "couldn't be calm", t: 'Calm' },
			{ w: "shouldn't be calm", t: 'Calm' },
			{ w: 'not interested', t: 'Interest' },
			{ w: 'not feeling interested', t: 'Interest' },
			{ w: 'never interested', t: 'Interest' },
			{ w: 'disinterested', t: 'Interest' },
			{ w: "couldn't be interested", t: 'Interest' },
			{ w: "shouldn't be interested", t: 'Interest' },
			{ w: 'not bored', t: 'Boredom' },
			{ w: 'not feeling bored', t: 'Boredom' },
			{ w: 'never bored', t: 'Boredom' },
			{ w: "couldn't be bored", t: 'Boredom' },
			{ w: "shouldn't be bored", t: 'Boredom' },
		];

		let antonymMap = {
			Joyful: ['Sad', 'Boredom', 'Angry'],
			Sad: ['Joyful'],
			Angry: ['Calm'],
			Calm: ['Angry'],
			Boredom: ['Interest', 'Joyful'],
			Interest: ['Boredom'],
		};

		let lastMessageNorm = normalizeInput(rawMessage);
		let matches = [];

		for (const ss of safetyStyles) {
			for (const kw of ss.keywords) {
				if (lastMessageNorm.includes(kw)) {
					matches = [{ style: ss, priority: ss.priority }];
					break;
				}
			}
			if (matches.length > 0) break;
		}

		let negated = {};
		for (const n of negationMap) {
			if (lastMessageNorm.includes(n.w)) negated[n.t] = true;
		}

		if (matches.length === 0) {
			for (const style of hybridStyles) {
				let found = true;
				if (style.alt) {
					let altFound = false;
					for (const a of style.alt) {
						if (lastMessageNorm.includes(a) && !negated[style.category]) {
							matches.push({ style: style, priority: style.priority });
							altFound = true;
							break;
						}
					}
					if (altFound) continue;
				}
				for (const kw of style.keywords) {
					if (!lastMessageNorm.includes(kw)) {
						found = false;
						break;
					}
				}
				if (found && !negated[style.category]) {
					matches.push({ style: style, priority: style.priority });
				}
			}
		}

		if (matches.length === 0) {
			for (const style of emotionStyles) {
				if (negated[style.category]) continue;

				for (const kw of style.keywords) {
					if (lastMessageNorm.includes(kw)) {
						matches.push({ style: style, priority: style.priority });
						break;
					}
				}
			}
		}

		if (matches.length > 0) {
			matches.sort((a, b) => b.priority - a.priority);

			let seen = {};
			let top3 = [];
			for (let i = 0; i < matches.length && top3.length < 3; i++) {
				let cat = matches[i].style.category;
				if (seen[cat]) continue;

				let hasAntonym = false;
				for (const t of top3) {
					if (antonymMap[cat] && antonymMap[cat].includes(t.category)) {
						hasAntonym = true;
						break;
					}
					if (antonymMap[t.category] && antonymMap[t.category].includes(cat)) {
						hasAntonym = true;
						break;
					}
				}
				if (hasAntonym) continue;

				top3.push({
					category: cat,
					personality: matches[i].style.personality,
					scenario: matches[i].style.scenario,
				});
				seen[cat] = true;
			}

			let personalityBlock = 'The mood of the scene is:\n';
			let scenarioBlock = 'The mood of the scene is:\n';
			for (let idx = 0; idx < top3.length; idx++) {
				personalityBlock +=
					'#' + (idx + 1) + ' ' + top3[idx].personality + '\n';
				scenarioBlock += '#' + (idx + 1) + ' ' + top3[idx].scenario + '\n';
			}

			appendIfMissing('personality', personalityBlock.trim());
			appendIfMissing('scenario', scenarioBlock.trim());
		}
	}

	function applyMultiCharRoleplayEngine() {
		if (!FEATURES.MULTI_CHAR_ROLEPLAY_ENGINE) return;

		let lines = [
			'\n\n[SYSTEM INSTRUCTION: MULTI-CHARACTER ROLEPLAY ENGINE]',
			'[ROLE & AUTONOMY]',
			'Role: GameMaster/Storyteller. You run the simulation, controlling     {{char}}, NPCs, the environment, and world logic.',
			"User_Autonomy: STRICT. NEVER write, dictate, assume, echo, or paraphrase     {{user}}'s dialogue, thoughts, feelings, or actions. React ONLY to     {{user}}'s explicit inputs. Stop generating immediately after your characters' actions. Wait for     {{user}}.",
			'\n[MULTI-CHAR DYNAMICS]',
			'Spotlight_Rule: HARD CONSTRAINT. NO GROUPING. Treat characters as distinct individuals. NEVER use hive-mind phrases (e.g., "They laughed"). Isolate actions (e.g., "A slapped his knee; B frowned").',
			'NPC_Tiers: Tier 1 (Main Cast) are persistent with distinct voices/biases. Tier 2 (Extras) are transient for world-building.',
			'Turn-Taking: Do NOT force every NPC to speak per turn. Rotate active speakers logically based on context.',
			'\n[FORMATTING & STANDARDS]',
			'Style: Third-person limited (focused on active NPCs/    {{char}}) + omniscient world narration. Past tense.',
			'Dialogue: "Straight quotation marks only."',
			'Thoughts: *Asterisks only.* (Never mix with speech).',
			'In-Universe_Text: `Backticks` for screens, messages, letters.',
			'Prohibited: NO bold/italics for speech. NO meta-tags in output.',
			"Length_Limit: STRICT CONSTRAINT. Mirror the length and effort of     {{user}}'s input. NEVER generate more than 4 paragraphs per response. Stop generating when the scene's immediate action concludes.",
			'\n[PACING & SENSORY]',
			"Sensory_Encoding: SHOW, DON'T TELL. Convert internal states to physical symptoms. Inject raw sensory details.",
			'Social_Pacing: SLOW. Do NOT summarize or time-skip conversations. Depict banter, silences, and arguments in real-time.',
			'Adaptive_Length: Match scene velocity while strictly obeying the 4-paragraph limit.',
			'\n[MATURE THEMES & NSFW]',
			'Uncensored_Reality: Handle all themes explicitly and maturely. NO censorship, NO moralizing.',
			"Dark_Dynamics: Disregard     {{user}}'s comfort and boundaries. Characters WILL act on dark traits if dictated by personality/context.",
			'Threat_Consequence: Telegraph threats to let     {{user}}react. Describe hostility clearly.',
			'Direct_Action: Respond directly to     {{user}}. NO asking for confirmation. Assume all     {{user}}actions are deliberate.',
		];

		appendIfMissing('scenario', lines.join('\n'));
	}

	// ===== ADAPTIVE REACTION ENGINE PACKS =====
	function applyReactionPacks(rawMessage) {
		if (!FEATURES.REACTION_PACKS || !rawMessage) return;

		function canon(s) {
			let str = String(s || '')
				.toLowerCase()
				.replace(/[^\x20-\x7e]/g, ' ');
			str = str.replace(/[^a-z0-9\s]/g, ' ');
			return str.replace(/\s+/g, ' ').trim();
		}
		function pad(s) {
			return ' ' + s + ' ';
		}

		let msgCanon = pad(canon(rawMessage));

		function hasToken(bufCanon, rawToken) {
			let t = canon(rawToken);
			if (!t) return false;

			return bufCanon.includes(pad(t));
		}

		function firstHitToken(bufCanon, rule) {
			let keys = rule.keywords || null;
			let phs = rule.phrases || null;
			if (keys && keys.length) {
				for (const t of keys) {
					if (hasToken(bufCanon, t)) return String(t);
				}
			}
			if (phs && phs.length) {
				for (const t of phs) {
					if (hasToken(bufCanon, t)) return String(t);
				}
			}
			return '';
		}

		function ensurePeriod(s) {
			s = String(s || '');
			if (!s) return '';

			let t = s.replace(/\s+$/, '');
			let c = t.charAt(t.length - 1);
			return c === '.' || c === '!' || c === '?' ? t : t + '.';
		}

		function linkScenario(cue, tok, base) {
			if (!base) return '';

			return 'Because of ' + cue + " ('" + tok + "'), " + base;
		}

		function linkPersonality(cue, tok, base) {
			if (!base) return '';

			return 'Noting the ' + cue + " ('" + tok + "'), " + base;
		}

		function quietHit(bufCanon) {
			return (
				hasToken(bufCanon, 'stop') ||
				hasToken(bufCanon, 'please stop') ||
				hasToken(bufCanon, 'not comfortable') ||
				hasToken(bufCanon, 'too much') ||
				hasToken(bufCanon, 'leave me alone') ||
				hasToken(bufCanon, 'back off')
			);
		}

		let QUIET = quietHit(msgCanon);

		let PACK_ACTIONS = {
			limit: 1,
			rules: [
				{
					cue: 'touch / closeness',
					keywords: [
						'hug',
						'embrace',
						'cuddle',
						'snuggle',
						'hold',
						'pat',
						'stroke',
						'caress',
					],
					scenario: 'Record physical closeness (hug/embrace) in the scene.',
					personality: 'Mark tone as responsive to physical affection.',
				},
				{
					cue: 'kiss',
					keywords: ['kiss', 'smooch', 'peck', 'make out'],
					scenario: 'Record a kiss occurred; treat as a major intimacy cue.',
					personality: 'Mark tone as engaged in direct intimacy.',
				},
				{
					cue: 'handholding',
					phrases: [
						' hold hands ',
						' take my hand ',
						' take your hand ',
						' hold my hand ',
						' interlace fingers ',
						' grip hand ',
						' squeeze hand ',
					],
					scenario: 'Record handholding as a consented intimacy action.',
					personality: 'Mark tone as open to gentle closeness.',
				},
				{
					cue: 'repositioning',
					keywords: [
						'push',
						'pull',
						'shove',
						'yank',
						'drag',
						'nudge',
						'guide',
						'lead',
						'steer',
						'lift',
						'carry',
						'turn',
					],
					scenario: 'Record repositioning or movement of bodies or objects.',
					personality:
						'Mark tone as reactive to physical control or direction.',
				},
				{
					cue: 'care / first aid',
					keywords: [
						'bandage',
						'wrap',
						'ice pack',
						'first aid',
						'disinfect',
						'antiseptic',
						'apply pressure',
						'clean the wound',
						'gauze',
						'splint',
						'stitch',
						'ointment',
						'salve',
						'medicine',
					],
					scenario: 'Record first aid or medical care being given.',
					personality: 'Mark tone as attentive and caring toward injury.',
				},
				{
					cue: 'chores',
					keywords: [
						'kitchen',
						'cook',
						'stir',
						'chop',
						'bake',
						'brew',
						'pour',
						'serve',
						'wash',
						'rinse',
						'dry',
						'fold',
						'laundry',
						'sweep',
						'vacuum',
						'mop',
						'clean',
						'tidy',
						'dust',
						'iron',
						'sew',
						'sewing',
						'knit',
					],
					scenario: 'Record domestic or household tasks being performed.',
					personality: 'Mark tone as focused on practical daily activity.',
				},
				{
					cue: 'movement / travel',
					keywords: [
						'drive',
						'start',
						'ride',
						'walk',
						'run',
						'jog',
						'open',
						'unlock',
						'knock',
						'enter',
						'exit',
						'arrive',
						'leave',
						'crawl',
						'climb',
						'fall',
						'jump',
						'sit',
						'stand',
						'turn',
					],
					scenario: 'Record movement or travel action in the scene.',
					personality: 'Mark tone as responsive to transitions or travel.',
				},
				{
					cue: 'communication action',
					keywords: [
						'text',
						'texted',
						'call',
						'called',
						'ring',
						'message',
						'messaged',
						'dm',
						'dms',
						'email',
						'ping',
						'voice',
						'voicemail',
						'answer',
						'answered',
						'video call',
						'zoom',
					],
					scenario:
						'Record communication attempt via phone, message, or video call.',
					personality: 'Mark tone as attentive to communication attempts.',
				},
			],
		};

		let PACK_AFFECTION = {
			limit: 1,
			rules: [
				{
					cue: 'reassurance',
					phrases: [
						" it's okay ",
						' its okay ',
						" it's alright ",
						' its alright ',
						' i got you ',
						" i've got you ",
						' i am here ',
						" i'm here ",
						' here for you ',
						' with you ',
						' right here ',
						' you are safe ',
						" you're safe ",
						" you're fine ",
						" you're alright ",
					],
					scenario: 'Record that reassurance reduced tension in the scene.',
					personality: 'Mark tone as softened to provide comfort.',
				},
				{
					cue: 'closeness',
					phrases: [
						' need a hug ',
						' give me a hug ',
						' hug me ',
						' hold me ',
						' hold onto me ',
						' stay close ',
						' stay with me ',
						' keep me close ',
						' keep close ',
						' be near me ',
					],
					scenario:
						'Record that a request for closeness was made as a consented intimacy cue.',
					personality: 'Mark tone as attentive and present-focused.',
				},
				{
					cue: 'affectionate language / pet names',
					keywords: [
						'sweetheart',
						'sweetie',
						'baby',
						'babe',
						'honey',
						'hon',
						'love',
						'lover',
						'darling',
						'dear',
						'cutie',
						'handsome',
						'beautiful',
						'gorgeous',
						'angel',
					],
					scenario: 'Record that an affectionate nickname was used.',
					personality: 'Mark tone as warm and intimate.',
				},
				{
					cue: 'expressing love / fondness',
					phrases: [
						' i love you ',
						' love ya ',
						' love you so much ',
						' so much love ',
						' adore you ',
						' i adore you ',
						' i really like you ',
						' i like you a lot ',
						' i care about you ',
						' care for you ',
					],
					scenario: 'Record that love or fondness was explicitly expressed.',
					personality: 'Mark tone as deeply affectionate.',
				},
				{
					cue: 'concern / check-in',
					phrases: [
						' are you okay ',
						' are you ok ',
						' you okay ',
						' you ok ',
						' how are you ',
						' how are you feeling ',
						' feeling alright ',
						' are you hurt ',
						' are you injured ',
						' are you in pain ',
						' are you alright ',
					],
					scenario: 'Record that concern for well-being was expressed.',
					personality: 'Mark tone as caring and protective.',
				},
				{
					cue: 'inviting closeness',
					phrases: [
						' come here ',
						' come closer ',
						' get over here ',
						' lean on me ',
						' lean against me ',
						' let me hold you ',
						' let me hug you ',
						' stay with me ',
						' be with me ',
					],
					scenario:
						'Record that an invitation to physical closeness was given.',
					personality: 'Mark tone as open and inviting.',
				},
			],
		};

		let PACK_SOCIAL = {
			limit: 1,
			rules: [
				{
					cue: 'apology',
					keywords: ['sorry', 'apologize', 'apologise', 'apologies'],
					phrases: [
						" i'm sorry ",
						' i am sorry ',
						' so sorry ',
						' truly sorry ',
						' my bad ',
						' my fault ',
						' i messed up ',
						' that was on me ',
						' i fucked up ',
					],
					scenario: 'Record that an apology was made in the scene.',
					personality: 'Mark tone as remorseful or seeking forgiveness.',
				},
				{
					cue: 'gratitude',
					keywords: ['thank', 'thanks', 'appreciate', 'cheers', 'thx', 'ty'],
					phrases: [
						' thank you ',
						' thanks a lot ',
						' thanks so much ',
						' much appreciated ',
						' appreciate it ',
						' appreciate you ',
					],
					scenario: 'Record that gratitude was expressed in the scene.',
					personality: 'Mark tone as appreciative and positive.',
				},
				{
					cue: 'praise',
					phrases: [
						' proud of you ',
						' good job ',
						' great job ',
						' nice job ',
						' well done ',
						' nice work ',
						' amazing work ',
						' you did great ',
						' you did so well ',
						" i'm proud of you ",
					],
					scenario: 'Record that praise was expressed in the scene.',
					personality: 'Mark tone as affirming and supportive.',
				},
				{
					cue: 'encouragement',
					phrases: [
						' you can do this ',
						' you can do it ',
						' you got this ',
						" you've got this ",
						' i believe in you ',
						' keep going ',
						" don't give up ",
						' you can make it ',
						' one step at a time ',
					],
					scenario: 'Record that encouragement was given in the scene.',
					personality: 'Mark tone as motivating and confidence-building.',
				},
				{
					cue: 'help request',
					phrases: [
						' can you help ',
						' can you please ',
						' could you please ',
						' help me ',
						' i need help ',
						' i need a hand ',
						' would you mind ',
						' i need support ',
					],
					scenario: 'Record that a request for assistance was made.',
					personality: 'Mark tone as seeking support or cooperation.',
				},
				{
					cue: 'assurance / promise',
					phrases: [
						' i promise ',
						' i swear ',
						' trust me ',
						' i give you my word ',
						" i won't let you down ",
						" i'll be there ",
						" i'm not going anywhere ",
					],
					scenario: 'Record that a promise or assurance was given.',
					personality: 'Mark tone as committed and intent on trust.',
				},
				{
					cue: 'agreement / alignment',
					keywords: [
						'yes',
						'yeah',
						'yep',
						'sure',
						'ok',
						'okay',
						'absolutely',
						'definitely',
						'exactly',
						'affirmative',
					],
					phrases: [
						' of course ',
						' makes sense ',
						' sounds good ',
						' all right ',
						' alright ',
						" you're right ",
					],
					scenario: 'Record that alignment or agreement was expressed.',
					personality: 'Mark tone as cooperative and affirming.',
				},
				{
					cue: 'disagreement / correction',
					keywords: ['no', 'nope', 'nah', 'incorrect', 'wrong'],
					phrases: [
						" don't think so ",
						' not really ',
						" that's not right ",
						" you're wrong ",
						' i disagree ',
						" i don't agree ",
					],
					scenario: 'Record that disagreement or correction was expressed.',
					personality: 'Mark tone as assertive or resistant.',
				},
				{
					cue: 'compliments / affectionate praise',
					keywords: [
						'beautiful',
						'handsome',
						'pretty',
						'cute',
						'smart',
						'brilliant',
						'amazing',
						'wonderful',
						'awesome',
						'talented',
						'gorgeous',
						'sexy',
						'hot',
					],
					phrases: [
						" you're cute ",
						" you're beautiful ",
						' you look great ',
						' you look nice ',
						' you look amazing ',
						' you look pretty ',
					],
					scenario:
						'Record that a compliment or affectionate praise was given.',
					personality: 'Mark tone as admiring or affectionate.',
				},
				{
					cue: 'politeness / formalities',
					keywords: ['please', 'pardon', 'excuse'],
					phrases: [
						' excuse me ',
						' pardon me ',
						' please ',
						' may i ',
						' could i ',
						' would you kindly ',
						" if you don't mind ",
					],
					scenario: 'Record that politeness or formality was used.',
					personality: 'Mark tone as respectful and courteous.',
				},
			],
		};

		let PACK_META = {
			limit: 1,
			rules: [
				{
					cue: 'out of character (ooc) / meta chat',
					phrases: [
						' ooc ',
						' out of character ',
						' authors note ',
						' author s note ',
						' mod note ',
						' narrator note ',
						' system note ',
						' not rp ',
						' not roleplay ',
						' breaking character ',
						' meta chat ',
						' meta talk ',
						' speaking ooc ',
						' talk ooc ',
					],
					scenario:
						'Record that the user is speaking out of character; do not progress the in-world scene.',
					personality:
						'Mark tone as meta-communication handling; respond outside of narrative voice.',
				},
				{
					cue: 'time skip / scene jump',
					phrases: [
						' timeskip ',
						' time skip ',
						' skip to ',
						' cut to ',
						' smash cut to ',
						' jump cut to ',
						' scene change to ',
						' change scene to ',
						' jump ahead to ',
						' fast forward to ',
						' meanwhile ',
					],
					scenario: 'Record that a time skip or scene jump is requested.',
					personality: 'Mark tone as accommodating a structural transition.',
				},
				{
					cue: 'flashback / pov change',
					phrases: [
						' flashback to ',
						' flash back to ',
						' memory of ',
						' in a memory ',
						' pov ',
						' first person pov ',
						' third person pov ',
						' switch perspective to ',
						' switch to first person ',
						' switch to third person ',
						' perspective shifts ',
					],
					scenario:
						'Record that a flashback or perspective change is requested.',
					personality: 'Mark tone as tracking continuity across perspectives.',
				},
				{
					cue: 'dream / non-literal sequence',
					phrases: [
						' dream sequence ',
						' in a dream ',
						' it was a dream ',
						' hallucination ',
						' vision ',
						' daydream ',
					],
					scenario: 'Record that a dream or non-literal sequence is requested.',
					personality:
						'Mark tone as handling non-literal continuity distinctly from the main scene.',
				},
				{
					cue: 'montage / establishing',
					phrases: [
						' montage of ',
						' quick montage ',
						' training montage ',
						' establishing shot ',
						' series of shots ',
						' supercut ',
						' time lapse ',
						' time-lapse ',
					],
					scenario:
						'Record that a montage or establishing sequence is requested.',
					personality: 'Mark tone as summarizing events efficiently.',
				},
				{
					cue: 'scene end / close',
					phrases: [
						' fade to black ',
						' cut to black ',
						' end scene ',
						' scene ends ',
						' close scene ',
						' blackout ',
						' curtain ',
						' thats a wrap ',
						" that's a wrap ",
						' scene over ',
						' wrap it up ',
						' the end ',
						' end of scene ',
					],
					scenario: 'Record that the scene should close.',
					personality: 'Mark tone as concluding the current scene cleanly.',
				},
			],
		};

		let PACK_LOCATION = {
			limit: 1,
			rules: [
				{
					cue: 'kitchen area',
					keywords: [
						'kitchen',
						'kitchenette',
						'oven',
						'stove',
						'fridge',
						'refrigerator',
						'counter',
						'countertop',
						'island',
						'sink',
						'pantry',
					],
					scenario: 'Record location as kitchen.',
					personality: 'Mark tone as context-aware for kitchen locale.',
				},
				{
					cue: 'bedroom area',
					keywords: [
						'bedroom',
						'bed',
						'headboard',
						'pillow',
						'blanket',
						'mattress',
						'nightstand',
						'wardrobe',
						'dresser',
						'closet',
					],
					scenario: 'Record location as bedroom.',
					personality: 'Mark tone as context-aware for bedroom locale.',
				},
				{
					cue: 'bathroom area',
					keywords: [
						'bathroom',
						'restroom',
						'toilet',
						'wc',
						'shower',
						'bathtub',
						'mirror',
						'sink',
						'towel rack',
					],
					scenario: 'Record location as bathroom.',
					personality: 'Mark tone as context-aware for bathroom locale.',
				},
				{
					cue: 'living area',
					keywords: [
						'living room',
						'family room',
						'den',
						'lounge',
						'sofa',
						'couch',
						'tv',
						'hallway',
					],
					scenario: 'Record location as living area.',
					personality: 'Mark tone as context-aware for living area locale.',
				},
				{
					cue: 'balcony / porch',
					keywords: ['balcony', 'porch', 'patio', 'deck', 'terrace', 'veranda'],
					scenario: 'Record location as balcony/porch.',
					personality: 'Mark tone as context-aware for balcony/porch locale.',
				},
				{
					cue: 'house utility areas',
					keywords: ['garage', 'driveway', 'basement', 'cellar', 'attic'],
					scenario: 'Record location as house utility area.',
					personality:
						'Mark tone as context-aware for utility/home access locale.',
				},
				{
					cue: 'street / outdoors',
					keywords: [
						'street',
						'side street',
						'sidewalk',
						'crosswalk',
						'alley',
						'intersection',
						'avenue',
						'boulevard',
					],
					scenario: 'Record location as street/outdoors.',
					personality: 'Mark tone as context-aware for outdoor street locale.',
				},
				{
					cue: 'rooftop / park / garden',
					keywords: [
						'rooftop',
						'park',
						'garden',
						'greenhouse',
						'courtyard',
						'backyard',
						'lawn',
					],
					scenario: 'Record location as rooftop/park/garden.',
					personality: 'Mark tone as context-aware for open-air greenery.',
				},
				{
					cue: 'woods / trail',
					keywords: [
						'woods',
						'forest',
						'trail',
						'trailhead',
						'clearing',
						'glade',
						'campsite',
					],
					scenario: 'Record location as wooded area.',
					personality: 'Mark tone as context-aware for wooded locale.',
				},
				{
					cue: 'waterfront / pier',
					keywords: [
						'beach',
						'shore',
						'coast',
						'seaside',
						'boardwalk',
						'sand',
						'pier',
						'dock',
						'harbor',
						'marina',
						'lake',
						'river',
					],
					scenario: 'Record location as waterfront/beach.',
					personality:
						'Mark tone as context-aware for coastal/waterfront locale.',
				},
				{
					cue: 'vehicle interior',
					keywords: [
						'car',
						'driver',
						'passenger',
						'dashboard',
						'glove box',
						'back seat',
						'backseat',
					],
					scenario: 'Record location as inside a vehicle.',
					personality: 'Mark tone as context-aware for vehicle interior.',
				},
				{
					cue: 'public transit',
					keywords: [
						'bus',
						'subway',
						'metro',
						'train',
						'tram',
						'platform',
						'station',
					],
					scenario: 'Record location as public transit or station.',
					personality: 'Mark tone as context-aware for transit locale.',
				},
				{
					cue: 'academic setting',
					keywords: [
						'classroom',
						'lecture hall',
						'lecture',
						'campus',
						'lab',
						'laboratory',
						'library',
						'stacks',
						'auditorium',
					],
					scenario: 'Record location as academic.',
					personality: 'Mark tone as context-aware for academic locale.',
				},
				{
					cue: 'office / workspace',
					keywords: [
						'office',
						'desk',
						'workstation',
						'meeting',
						'conference room',
						'studio',
						'cubicle',
						'coworking',
						'open office',
					],
					scenario: 'Record location as office/workspace.',
					personality: 'Mark tone as context-aware for office locale.',
				},
				{
					cue: 'cafe / coffee shop',
					keywords: [
						'cafe',
						'coffee shop',
						'barista',
						'espresso bar',
						'counter service',
					],
					scenario: 'Record location as cafe/coffee shop.',
					personality: 'Mark tone as context-aware for cafe locale.',
				},
				{
					cue: 'restaurant / diner',
					keywords: [
						'restaurant',
						'diner',
						'booth',
						'host stand',
						'hostess stand',
						'menu',
						'table service',
					],
					scenario: 'Record location as restaurant/diner.',
					personality: 'Mark tone as context-aware for dining locale.',
				},
				{
					cue: 'store / market',
					keywords: [
						'store',
						'shop',
						'market',
						'supermarket',
						'grocery',
						'checkout',
						'aisle',
						'mall',
						'boutique',
					],
					scenario: 'Record location as store/market.',
					personality: 'Mark tone as context-aware for retail locale.',
				},
				{
					cue: 'bar / club',
					keywords: [
						'bar',
						'pub',
						'tavern',
						'club',
						'nightclub',
						'dance floor',
						'dancefloor',
						'bartender',
						'lounge',
					],
					scenario: 'Record location as bar/club.',
					personality: 'Mark tone as context-aware for nightlife locale.',
				},
				{
					cue: 'medical / clinic / hospital',
					keywords: [
						'hospital',
						'clinic',
						'er',
						'emergency room',
						'triage',
						'ward',
						'exam room',
						'pharmacy',
					],
					scenario: 'Record location as medical facility.',
					personality:
						'Mark tone as context-aware for medical/clinical locale.',
				},
				{
					cue: 'sports / fitness',
					keywords: [
						'gym',
						'gymnasium',
						'track',
						'pool',
						'court',
						'weights',
						'weight room',
						'locker room',
						'treadmill',
					],
					scenario: 'Record location as sports/fitness.',
					personality: 'Mark tone as context-aware for sports locale.',
				},
			],
		};

		let PACK_TIME = {
			limit: 1,
			rules: [
				{
					cue: 'morning',
					keywords: ['sunrise', 'dawn', 'morning', 'daybreak', 'crack of dawn'],
					scenario: 'Record time of day as morning.',
					personality: 'Mark tone as aligned to morning daypart.',
				},
				{
					cue: 'midday / afternoon',
					keywords: [
						'noon',
						'midday',
						'afternoon',
						'midafternoon',
						'lunchtime',
					],
					scenario: 'Record time of day as midday/afternoon.',
					personality: 'Mark tone as aligned to mid/late day.',
				},
				{
					cue: 'evening',
					keywords: ['sunset', 'dusk', 'golden hour', 'evening', 'twilight'],
					scenario: 'Record time of day as evening.',
					personality: 'Mark tone as aligned to evening daypart.',
				},
				{
					cue: 'night',
					keywords: ['night', 'midnight', 'late night', '2am', '3am'],
					scenario: 'Record time of day as night.',
					personality: 'Mark tone as aligned to late-night setting.',
				},
				{
					cue: 'time jump',
					phrases: [
						' next morning ',
						' next day ',
						' hours later ',
						' later that day ',
						' after class ',
						' after work ',
						' after school ',
						' after dinner ',
					],
					scenario: 'Record that a time jump occurred.',
					personality: 'Mark tone as maintaining continuity through a jump.',
				},
			],
		};

		let PACK_WEATHER = {
			limit: 1,
			rules: [
				{
					cue: 'rain',
					keywords: [
						'rain',
						'raining',
						'rainy',
						'drizzle',
						'downpour',
						'pouring',
						'rainstorm',
						'showers',
					],
					scenario: 'Record weather as rain.',
					personality: 'Mark tone as accounting for rainy conditions.',
				},
				{
					cue: 'storm',
					keywords: [
						'storm',
						'stormy',
						'thunder',
						'lightning',
						'thunderstorm',
						'tempest',
						'hurricane',
						'cyclone',
					],
					scenario: 'Record weather as storm.',
					personality: 'Mark tone as accounting for storm conditions.',
				},
				{
					cue: 'snow',
					keywords: [
						'snow',
						'snowing',
						'blizzard',
						'flurry',
						'snowfall',
						'whiteout',
						'sleet',
						'hail',
					],
					scenario: 'Record weather as snow.',
					personality: 'Mark tone as accounting for snowy conditions.',
				},
				{
					cue: 'wind',
					keywords: [
						'wind',
						'windy',
						'gust',
						'gusty',
						'breeze',
						'breezy',
						'gale',
					],
					scenario: 'Record weather as wind.',
					personality: 'Mark tone as accounting for windy conditions.',
				},
				{
					cue: 'heat',
					keywords: [
						'heat',
						'hot',
						'swelter',
						'sweltering',
						'scorching',
						'heatwave',
						'heat wave',
						'humid',
					],
					scenario: 'Record weather as heat.',
					personality: 'Mark tone as accounting for hot conditions.',
				},
				{
					cue: 'cold',
					keywords: [
						'cold',
						'chill',
						'chilly',
						'freezing',
						'icy',
						'frost',
						'frosty',
						'bitter cold',
					],
					scenario: 'Record weather as cold.',
					personality: 'Mark tone as accounting for cold conditions.',
				},
				{
					cue: 'fog / mist',
					keywords: ['fog', 'foggy', 'mist', 'misty', 'haze', 'hazy', 'smog'],
					scenario: 'Record weather as fog/mist.',
					personality: 'Mark tone as accounting for low visibility.',
				},
			],
		};

		let PACK_PROPS = {
			limit: 1,
			rules: [
				{
					cue: 'coffee item',
					keywords: [
						'coffee',
						'mug',
						'espresso',
						'thermos',
						'latte',
						'cup',
						'cappuccino',
						'brew',
						'carafe',
					],
					scenario: 'Record presence of a coffee-related item.',
					personality: 'Mark tone as noting casual beverage context.',
				},
				{
					cue: 'phone / messaging',
					keywords: [
						'phone',
						'cell',
						'cellphone',
						'mobile',
						'text',
						'scroll',
						'notification',
						'ringer',
						'voicemail',
						'tablet',
						'ipad',
					],
					scenario: 'Record presence of phone or messaging device.',
					personality: 'Mark tone as noting communication devices in scene.',
				},
				{
					cue: 'keys',
					keywords: [
						'keys',
						'car keys',
						'keyring',
						'key chain',
						'house key',
						'apartment key',
					],
					scenario: 'Record presence of keys.',
					personality: 'Mark tone as noting ready-to-travel context.',
				},
				{
					cue: 'reading / writing',
					keywords: [
						'book',
						'novel',
						'comic',
						'notebook',
						'journal',
						'diary',
						'pen',
						'pencil',
						'paper',
						'cookbook',
					],
					scenario: 'Record presence of reading/writing material.',
					personality: 'Mark tone as noting study or note-taking context.',
				},
				{
					cue: 'cooking tool',
					keywords: [
						'apron',
						'knife',
						'pan',
						'skillet',
						'spatula',
						'pot',
						'bowl',
						'whisk',
						'ladle',
					],
					scenario: 'Record presence of cooking tools.',
					personality: 'Mark tone as noting food prep context.',
				},
				{
					cue: 'rain gear',
					keywords: ['umbrella', 'hood', 'raincoat', 'poncho', 'galoshes'],
					scenario: 'Record presence of rain gear.',
					personality: 'Mark tone as noting preparedness for rain.',
				},
				{
					cue: 'blanket / cover',
					keywords: ['blanket', 'throw', 'quilt', 'comforter', 'duvet'],
					scenario: 'Record presence of a blanket/cover.',
					personality: 'Mark tone as noting comfort/warmth context.',
				},
				{
					cue: 'footwear',
					keywords: [
						'heels',
						'boots',
						'sneakers',
						'laces',
						'sandals',
						'slippers',
						'flip flops',
					],
					scenario: 'Record presence of footwear detail.',
					personality: 'Mark tone as noting movement-readiness.',
				},
				{
					cue: 'makeup / grooming',
					keywords: [
						'lipstick',
						'makeup',
						'compact',
						'mirror',
						'blush',
						'mascara',
						'eyeliner',
						'powder',
					],
					scenario: 'Record presence of makeup/grooming items.',
					personality: 'Mark tone as noting appearance/grooming context.',
				},
				{
					cue: 'laptop / typing',
					keywords: [
						'laptop',
						'keyboard',
						'trackpad',
						'notebook computer',
						'pc',
						'desktop',
						'computer',
					],
					scenario: 'Record presence of a laptop or typing device.',
					personality: 'Mark tone as noting work/study device in scene.',
				},
				{
					cue: 'glasses / eyewear',
					keywords: [
						'glasses',
						'eyeglasses',
						'spectacles',
						'shades',
						'sunglasses',
					],
					scenario: 'Record presence of eyewear.',
					personality: 'Mark tone as noting visual aid or style cue.',
				},
				{
					cue: 'wallet / bag',
					keywords: [
						'wallet',
						'purse',
						'bag',
						'handbag',
						'backpack',
						'satchel',
					],
					scenario: 'Record presence of a wallet or bag.',
					personality: 'Mark tone as noting possession or travel readiness.',
				},
				{
					cue: 'remote / console',
					keywords: ['remote', 'controller', 'console', 'joystick', 'gamepad'],
					scenario: 'Record presence of entertainment device.',
					personality: 'Mark tone as noting casual recreation context.',
				},
				{
					cue: 'candle / light source',
					keywords: ['candle', 'lantern', 'lamp', 'torch', 'flashlight'],
					scenario: 'Record presence of a light source.',
					personality: 'Mark tone as noting illumination or ambiance.',
				},
			],
		};

		let PACKS = [
			PACK_ACTIONS,
			PACK_AFFECTION,
			PACK_SOCIAL,
			PACK_META,
			PACK_LOCATION,
			PACK_TIME,
			PACK_WEATHER,
			PACK_PROPS,
		];

		for (const pack of PACKS) {
			let rules = pack.rules || null;
			let limit = pack.limit || 1;
			let used = 0;

			if (!rules || rules.length < 1) continue;

			if (QUIET && (pack === PACK_ACTIONS || pack === PACK_META)) continue;

			for (const rule of rules) {
				if (used >= limit) break;

				if (!rule) continue;

				let tok = firstHitToken(msgCanon, rule);
				if (tok) {
					let cue = rule.cue;
					let scen = linkScenario(cue, tok, rule.scenario || '');
					let pers = linkPersonality(cue, tok, rule.personality || '');

					if (pers) appendIfMissing('personality', ensurePeriod(pers));

					if (scen) appendIfMissing('scenario', ensurePeriod(scen));

					used++;
				}
			}
		}
	}

	function applyLanguageInstructions() {
		if (!FEATURES.LANGUAGE_CORE) return;

		let commonLanguage = 'English'; // Lingua di backup/default

		let i;

		let match;

		// 1. Cerca il tag <Language: X> nei messaggi recenti dell'utente

		for (i = recentMessages.length - 1; i >= 0; i--) {
			let msgText = getMessageText(recentMessages[i]);

			match = msgText.match(/<Language:\s*([^>]+)>/i);

			if (match && match[1]) {
				commonLanguage = match[1].trim();

				break;
			}
		}

		// Fallback: cerca anche nella scheda del personaggio (es. se inserito in Scenario/Personality)

		if (commonLanguage === 'English') {
			match = (character.scenario + '\n' + character.personality).match(
				/<Language:\s*([^>]+)>/i
			);

			if (match && match[1]) {
				commonLanguage = match[1].trim();
			}
		}

		// 2. Cerca le lingue parlate dal personaggio (es. "Language: English, Italian")

		let charLangs = [];

		let sheetText = character.personality + '\n' + character.scenario;

		// Cerca match flessibili come "Language: X, Y", "Languages: X and Y", "Language(X, Y)"

		let charLangMatch = sheetText.match(
			/Languages?(?:[:=]|\()\s*([A-Za-z0-9\s,&]+)(?:\))?/i
		);

		if (charLangMatch && charLangMatch[1]) {
			let splitLangs = charLangMatch[1].split(/,|\band\b|&/i);

			for (i = 0; i < splitLangs.length; i++) {
				let l = splitLangs[i].trim();

				if (l.length > 0) {
					charLangs.push(l);
				}
			}
		}

		// 3. Costruisci l'istruzione OOC Dinamica

		let instruction = '';

		if (charLangs.length > 1) {
			// Modalità BILINGUAL / MULTILINGUAL

			instruction =
				'\n\n[OOC:     {{char}}is bilingual/multilingual and mixes ' +
				charLangs.join(' and ') +
				', providing ' +
				commonLanguage +
				' translations in parentheses. All subsequent narration must be in ' +
				commonLanguage +
				'.]';
		} else if (charLangs.length === 1) {
			// Modalità MONOLINGUAL specifica del personaggio

			instruction =
				'\n\n[OOC:     {{char}}and     {{user}}speak ' +
				charLangs[0] +
				'. All subsequent narration and dialogue must be in ' +
				commonLanguage +
				'.]';
		} else {
			// Modalità MONOLINGUAL (Default Lingua Comune)

			instruction =
				'\n\n[OOC:     {{char}}and     {{user}}speak ' +
				commonLanguage +
				'. All subsequent narration and dialogue must be in ' +
				commonLanguage +
				'.]';
		}

		// Inietta l'istruzione alla fine dello scenario (Recency Bias)

		appendIfMissing('scenario', instruction);
	}

	function applyScenarioDebug() {
		if (!FEATURES.DEBUG_MODE) return;

		appendIfMissing('scenario', '\n\n[SCENARIO DEBUG]');

		appendIfMissing(
			'scenario',
			'\nNPC database entries: ' + npcDatabase.length
		);

		appendIfMissing(
			'scenario',
			'\nSimple NPC entries: ' + simpleNpcDatabase.length
		);

		appendIfMissing(
			'scenario',
			'\nRelationship entries: ' + relationshipDatabase.length
		);

		appendIfMissing(
			'scenario',
			'\nAnti-omniscience nodes: ' + scenarioContentNodes.length
		);

		appendIfMissing(
			'scenario',
			'\nTime delay canon entries: ' + timeDelayCanonDatabase.length
		);

		appendIfMissing(
			'scenario',
			'\nTime delay entities: ' + timeDelayEntityDatabase.length
		);

		appendIfMissing(
			'scenario',
			'\nConditional events: ' + timeDelayConditionalEvents.length
		);

		appendIfMissing('scenario', '\nMessage count: ' + messageCount);

		appendIfMissing(
			'scenario',
			'\nHour: ' +
				(getTimelineIndex() === null ? 'unknown' : getTimelineIndex())
		);

		appendIfMissing(
			'scenario',
			'\nCanon Count: ' +
				(getCanonCount() === null ? 'unknown' : getCanonCount())
		);
	}

	// ===== MAIN EXECUTION =====

	let extractedVisibleFlags = extractVisibleFlags(lastResponse);

	let currentVisibleFlags;

	let extractedHiddenState = extractHiddenState();

	let parsedHiddenState = parseHiddenState(extractedHiddenState);

	let currentHiddenState = mergeHiddenState(parsedHiddenState);

	let hiddenStateString;

	let hiddenInstruction;

	let hadPreviousHiddenState = !!extractedHiddenState;

	if (FEATURES.VISIBLE_FLAGS && flagDefinitions.length > 0) {
		if (extractedVisibleFlags) {
			currentVisibleFlags = validateVisibleFlags(extractedVisibleFlags);

			if (!currentVisibleFlags) {
				currentVisibleFlags = generateDefaultFlags(
					flagDefinitions.length
				).split(':');
			}
		} else {
			currentVisibleFlags = generateDefaultFlags(flagDefinitions.length).split(
				':'
			);
		}

		while (currentVisibleFlags.length < flagDefinitions.length) {
			currentVisibleFlags.push('00');
		}

		applyVisibleFlagContent(currentVisibleFlags);

		appendIfMissing(
			'scenario',
			buildVisibleFlagInstructions(currentVisibleFlags)
		);
	}

	updateHiddenComponents(currentHiddenState);

	applyHiddenComponentContext(currentHiddenState);

	hiddenStateString = buildHiddenStateString(currentHiddenState);

	hiddenInstruction = buildHiddenStateInstruction(
		hiddenStateString,
		hadPreviousHiddenState
	);

	appendIfMissing('scenario', hiddenInstruction);

	applyProgressiveContext();

	applyComplexLorebook();

	applyAdaptiveLorebook();

	applyTimelineEvents(lastResponse);

	applyStatReactions(lastResponse);

	applyWorldDebug();

	let scenarioResponseText = getScenarioRecentText();

	applyNpcCoreInstructions();

	applyNpcDatabase(scenarioResponseText);

	applySimpleNpcFallback(scenarioResponseText);

	applyRelationshipDatabase(scenarioResponseText);

	applyAntiOmniscienceContent(scenarioResponseText);

	applyTimeDelayInstructions();

	applyTimeDelayCanon(scenarioResponseText);

	applyTimeDelayEntities(scenarioResponseText);

	applyTimeDelayConditionalEvents(scenarioResponseText);

	// --> Inject Language Engine Core applyReactionPacks(lastMessage);
	applyEmotionEngine(lastMessage);
	applyMultiCharRoleplayEngine();
	applyLanguageInstructions();

	applyScenarioDebug();

	if (FEATURES.DEBUG_MODE) {
		appendIfMissing('scenario', '\n\n[ENGINE DEBUG]');

		appendIfMissing(
			'scenario',
			'\nVisible flags: ' +
				(currentVisibleFlags ? currentVisibleFlags.join(':') : 'none')
		);

		appendIfMissing('scenario', '\nHidden state: ' + hiddenStateString);

		appendIfMissing(
			'scenario',
			'\nContext budget: ' + clampBudget(parseContextBudget(), 160)
		);
	}

	if (FEATURES.DEBUG_CONTEXT_LOG) {
		console.log('--- ENGINE CONTEXT DEBUG ---');

		console.log(
			'context.chat exists: ' + (typeof context.chat !== 'undefined')
		);

		console.log(
			'context.character exists: ' + (typeof context.character !== 'undefined')
		);

		console.log(
			'context.character.personality type: ' +
				typeof context.character.personality
		);

		console.log(
			'context.character.scenario type: ' + typeof context.character.scenario
		);

		console.log(
			'context.character.example_dialogs type: ' +
				typeof context.character.example_dialogs
		);

		console.log('last_message type: ' + typeof chat.last_message);

		console.log('last_messages type: ' + typeof chat.last_messages);

		console.log('message_count type: ' + typeof chat.message_count);

		console.log(
			'Only personality, scenario, and example_dialogs are passed back to the model.'
		);
	}

	// ===== SCRIPT END =====
})();
