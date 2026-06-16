const fs = require('fs');
const vm = require('vm');
const path = require('path');

const rawPath = path.join(__dirname, '..', '..', '..', '..', 'legacy', 'lorebook_fantasy.js');
const outDir = __dirname;
const jsonPath = path.join(outDir, 'SvartulfrVerse_Craesos.json');
const scenarioPath = path.join(outDir, '02_scenario.md');

let code = fs.readFileSync(rawPath, 'utf8');
code += '\nglobalThis.__entries = loreEntries;\nglobalThis.__aliases = npcAliases;\nglobalThis.__relationships = npcRelationshipSummaries;';
const runtime = {
  context: { chat: { message_count: 0, last_message: '' }, character: { personality: '', scenario: '' }, variables: {} },
  console, Math, Set, Map, RegExp, Infinity, Array, String, Object, JSON, NaN, undefined
};
vm.createContext(runtime);
vm.runInContext(code, runtime, { filename: rawPath });

const rawEntries = runtime.__entries;
const aliasMap = new Map(runtime.__aliases.map(([key, aliases]) => [key, aliases]));
const relationshipSummaries = runtime.__relationships;
const sourceFile = 'legacy/lorebook_fantasy.js';
const stopwords = new Set(['the', 'a', 'an', 'mr', 'mrs', 'ms', 'sir', 'madam']);
const genericPrimary = new Set(['setting', 'father', 'uncle', 'grandfather', 'eldest', 'middle brother', 'twin brother', 'scout', 'rogue', 'slaver', 'warlord', 'body karlog']);

function norm(value) {
  return String(value || '').toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
}
function normList(values) {
  if (!Array.isArray(values)) return [];
  const out = new Map();
  for (const value of values) {
    const n = norm(value);
    if (n && !stopwords.has(n) && !out.has(n)) out.set(n, n);
  }
  return [...out.values()].sort((a, b) => a.localeCompare(b));
}
function uniq(values) {
  const seen = new Set();
  const out = [];
  for (const value of values) {
    const n = norm(value);
    if (!n || seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
}
function slug(value) {
  return norm(value).replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 90);
}
function prefixFor(category) {
  return { setting: 'WRD', mechanic: 'WRD', character: 'NPC', location: 'LOC', species: 'BST', faction: 'ORG' }[category] || 'LOR';
}
function priorityFor(entry, prefix) {
  if (entry.category === 'setting') return 9;
  if (entry.category === 'mechanic') return 7;
  if (entry.category === 'character') return Number(entry.priority || 110) >= 118 ? 9 : Number(entry.priority || 110) >= 113 ? 8 : 7;
  if (entry.category === 'location') return Number(entry.priority) >= 122 ? 8 : 7;
  if (entry.category === 'faction') return 8;
  return prefix === 'WRD' ? 6 : 7;
}
function tagsFor(prefix) {
  return {
    WRD: ['world', 'lore', 'important'],
    NPC: ['character', 'lore', 'important'],
    LOC: ['location', 'lore', 'important'],
    BST: ['lore', 'history', 'important'],
    ORG: ['faction', 'lore', 'important'],
    REL: ['relationship', 'character', 'important']
  }[prefix] || ['lore', 'important'];
}
function placementFor(prefix) {
  if (prefix === 'NPC') return ['personality', 'before'];
  if (prefix === 'LOC') return ['scenario', 'after'];
  return ['default', 'before_char_def'];
}
function extractName(scenario, category, keywords) {
  const body = scenario || '';
  let match = body.match(/^\s*<[^>]+>\s*([^:]+):/) || body.match(/^\s*\[([^\]:]+):/);
  if (match) return match[1].trim();
  const primary = keywords.find((keyword) => !genericPrimary.has(norm(keyword)) && norm(keyword).length > 2);
  return primary ? primary.replace(/\b\w/g, (char) => char.toUpperCase()) : category;
}
function cleanBody(scenario) {
  return String(scenario || '')
    .replace(/^\s*<[^>]+>\s*/, '')
    .replace(/\s*<\/[^>]+>\s*$/, '')
    .replace(/^\s*\[[^\]:]+:\s*/, '')
    .replace(/\s*\]\s*$/, '')
    .replace(/Note: Theme includes /g, 'History includes ')
    .replace(/\s+/g, ' ')
    .trim();
}
function contentFor(prefix, name, category, body) {
  const scoped = category === 'setting' ? `Craesos setting: ${body}` :
    category === 'mechanic' ? `Craesos rule-system: ${body}` :
      body.startsWith(name) || body.startsWith('Craesos') ? body : `${name}: ${body}`;
  return `[ACTIVE] ${prefix}: ${scoped}`;
}
function uniqueId(seen) {
  let id = 1;
  while (seen.has(id)) id += 1;
  seen.add(id);
  return `7d2a9f10-5c8e-4a3b-9f2a-3${String(id).padStart(11, '0')}`;
}
function prefixFromContent(content) {
  const match = String(content || '').match(/^\[[A-Z]+\]\s+([A-Z]{3}):\s/);
  return match ? match[1] : '';
}
function validate(entries) {
  const errors = [];
  const required = [
    'id', 'identifier', 'name', 'category', 'comment', 'content', 'key', 'keywordsRaw',
    'keysRaw', 'keysecondary', 'keysecondaryRaw', 'tags', 'priority', 'insertion_order',
    'constant', 'enabled', 'case_sensitive', 'matchWholeWords', 'activationMode',
    'selectiveLogic', 'probability', 'minMessages', 'groupWeight', 'prioritizeInclusion',
    'keyMatchPriority', 'depth', 'placement', 'placementPosition', 'inclusionGroup',
    'inclusionGroupRaw', 'activationScript', 'extensions', 'selective', 'sticky', 'vectorized'
  ];
  const canonicalPrefixes = new Set(['WRD', 'LOR', 'LOC', 'ORG', 'BST', 'FAM', 'NPC', 'SEC', 'CAN', 'REL']);
  const ids = new Set();
  const identifiers = new Set();

  for (const entry of entries) {
    for (const field of required) {
      if (!(field in entry)) errors.push(`Missing ${field} on ${entry.identifier || entry.name || 'unknown entry'}`);
    }
    if (ids.has(entry.id)) errors.push(`Duplicate id: ${entry.id}`);
    if (identifiers.has(entry.identifier)) errors.push(`Duplicate identifier: ${entry.identifier}`);
    ids.add(entry.id);
    identifiers.add(entry.identifier);

    const prefix = prefixFromContent(entry.content);
    if (!canonicalPrefixes.has(prefix)) errors.push(`Invalid or missing prefix on ${entry.identifier}: ${entry.content}`);
    if (entry.extensions.prefix !== prefix) errors.push(`Prefix mismatch on ${entry.identifier}`);
    if (entry.extensions.canonLayer !== 'ACTIVE') errors.push(`Canon layer mismatch on ${entry.identifier}`);
    if (!entry.extensions.source || entry.extensions.source.includes('TODO-CANON')) errors.push(`Invalid source on ${entry.identifier}`);
    if (entry.insertion_order !== entry.priority * 100) errors.push(`Bad insertion_order on ${entry.identifier}`);
    if (entry.priority < 0 || entry.priority > 11) errors.push(`Bad priority on ${entry.identifier}`);
    if (entry.keysRaw !== entry.key.join(', ')) errors.push(`keysRaw mismatch on ${entry.identifier}`);
    if (entry.keywordsRaw !== entry.key.join(', ')) errors.push(`keywordsRaw mismatch on ${entry.identifier}`);
    if (entry.keysecondaryRaw !== entry.keysecondary.join(', ')) errors.push(`keysecondaryRaw mismatch on ${entry.identifier}`);
    if (/Source:/i.test(entry.content) || entry.content.includes('legacy raw project') || entry.content.includes('TODO-CANON')) {
      errors.push(`Runtime content leaks source/debug metadata on ${entry.identifier}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Craesos validation failed:\n- ${errors.join('\n- ')}`);
  }
}

const entries = [];
const seenIds = new Set();
for (const entry of rawEntries) {
  const prefix = prefixFor(entry.category);
  const rawKeywords = normList(entry.keywords || []);
  const name = extractName(entry.scenario, entry.category, rawKeywords);
  const aliasKey = [...aliasMap.keys()].find((key) => norm(name).includes(norm(key)) || norm(key).includes(norm(name)));
  const aliases = aliasKey ? aliasMap.get(aliasKey) : [];
  const primary = uniq([name, ...rawKeywords.filter((keyword) => !genericPrimary.has(keyword)), ...aliases.filter((keyword) => !genericPrimary.has(norm(keyword)))]);
  const secondary = uniq([...aliases, ...rawKeywords.filter((keyword) => !primary.map(norm).includes(norm(keyword)))]).slice(0, 24);
  const priority = priorityFor(entry, prefix);
  const placement = placementFor(prefix);
  const identifier = slug(`${prefix}_${name}_craesos`);
  const isSetting = entry.category === 'setting';
  entries.push({
    id: uniqueId(seenIds),
    identifier,
    name: `${prefix}: ${name} - Craesos legacy`,
    category: prefix === 'WRD' ? 'general' : 'other',
    comment: `Legacy Fantasy/Craesos ${prefix} entry normalized from ${sourceFile} and scoped to the Craesos MicroCosmo.`,
    content: contentFor(prefix, name, entry.category, cleanBody(entry.scenario)),
    key: primary,
    keywordsRaw: primary.join(', '),
    keysRaw: primary.join(', '),
    keysecondary: secondary,
    keysecondaryRaw: secondary.join(', '),
    tags: tagsFor(prefix),
    priority,
    insertion_order: priority * 100,
    constant: Boolean(isSetting),
    enabled: true,
    case_sensitive: false,
    matchWholeWords: Boolean(entry.matchWholeWords) || true,
    activationMode: 'standard',
    selectiveLogic: 0,
    probability: 100,
    minMessages: Number(entry.minMessages || 0),
    groupWeight: 100,
    prioritizeInclusion: false,
    keyMatchPriority: false,
    depth: 4,
    placement: placement[0],
    placementPosition: placement[1],
    inclusionGroup: [],
    inclusionGroupRaw: '',
    activationScript: '',
    extensions: {
      _depth: 4,
      canonLayer: 'ACTIVE',
      prefix,
      source: sourceFile
    },
    selective: false,
    sticky: false,
    vectorized: false
  });
}

function primaryName(npcKey) {
  const found = entries.find((entry) => entry.identifier.includes(slug(npcKey)) || norm(entry.name).includes(norm(npcKey)));
  return found ? found.name.replace(/^[A-Z]{3}: /, '').replace(/ - Craesos legacy$/, '') : npcKey;
}
for (const [npcKey, summary] of Object.entries(relationshipSummaries)) {
  const name = primaryName(npcKey);
  const aliases = aliasMap.get(npcKey) || [npcKey];
  const key = uniq([`${name} relationship with {{user}}`, `${name} Craesos relationship`, ...aliases, npcKey]).slice(0, 12);
  const priority = 7;
  entries.push({
    id: uniqueId(seenIds),
    identifier: slug(`rel_${npcKey}_craesos`),
    name: `REL: ${name} relationship with {{user}} - Craesos legacy`,
    category: 'other',
    comment: `Legacy Fantasy/Craesos relationship summary normalized from the NPC alias engine in ${sourceFile}.`,
    content: `[ACTIVE] REL: Craesos relationship dynamic: ${summary}`,
    key,
    keywordsRaw: key.join(', '),
    keysRaw: key.join(', '),
    keysecondary: [],
    keysecondaryRaw: '',
    tags: tagsFor('REL'),
    priority,
    insertion_order: priority * 100,
    constant: false,
    enabled: true,
    case_sensitive: false,
    matchWholeWords: true,
    activationMode: 'standard',
    selectiveLogic: 0,
    probability: 100,
    minMessages: 0,
    groupWeight: 100,
    prioritizeInclusion: false,
    keyMatchPriority: false,
    depth: 4,
    placement: 'default',
    placementPosition: 'after',
    inclusionGroup: [],
    inclusionGroupRaw: '',
    activationScript: '',
    extensions: {
      _depth: 4,
      canonLayer: 'ACTIVE',
      prefix: 'REL',
      source: `${sourceFile}; npc alias engine`
    },
    selective: false,
    sticky: false,
    vectorized: false
  });
}

validate(entries);
fs.writeFileSync(jsonPath, JSON.stringify(entries, null, 2) + '\n', 'utf8');

const aliasLines = [...aliasMap.entries()].map(([key, aliases]) => `- ${key}: ${aliases.join(', ')}`).join('\n');
const relationshipLines = Object.entries(relationshipSummaries).map(([key, summary]) => `- ${key}: ${summary}`).join('\n');
const scenario = `# Scenario Bot Scenario — Fantasy Craesos

## Controller Identity

**Controller Name / Role:** Fantasy Craesos Scenario Controller
**Simulation Type:** Mythic-age high fantasy, clan protection, trade empire politics, primal magic, drakon bonds, orc courts, and elf-wood intrigue
**Tone:** intense, protective, mythic, dangerous, intimate under pressure
**Canon Layer:** \`[ACTIVE]\`
**Source:** ${sourceFile}

## Dynamic Relationship Base

- < 5 messaggi: {{user}} è estremamente vigile; la sorveglianza Vanguard e le ward Seidr del clan pesano come una gabbia di ferro.
- 5-14 messaggi: {{user}} inizia a trovare piccoli spazi di respiro dentro la protezione estrema del clan.
- 15+ messaggi: {{user}} è ormai radicata nel clan; la devozione soffocante dell’Impero Svartúlfr condiziona ogni movimento.

## NPC Alias Engine

${aliasLines}

## Relationship Summaries

${relationshipLines}
`;
fs.writeFileSync(scenarioPath, scenario.trim() + '\n', 'utf8');
console.log(`Wrote ${entries.length} entries to ${path.resolve(jsonPath)}`);
console.log(`Wrote scenario data to ${path.resolve(scenarioPath)}`);
