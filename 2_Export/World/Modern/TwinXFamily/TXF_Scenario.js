/**
 * SVARTULFRVERSE SCENARIO TEMPLATE
 *
 * MicroCosmo runtime for TwinXFamily.
 * Scenario: 2_Export/World/Modern/TwinXFamily.
 * Compatible with ES6-safe JanitorAI Scripts API; uses only context and local scope.
 */

if (typeof context === "undefined") {
    return;
}

if (!context.character) {
    return;
}

const character = context.character;

character.personality = typeof character.personality === "string" ? character.personality : "";
character.scenario = typeof character.scenario === "string" ? character.scenario : "";
character.example_dialogs = typeof character.example_dialogs === "string" ? character.example_dialogs : "";

const chat = context.chat || {};
const lastMessage = (chat.last_message || "").toLowerCase();
const lastResponse = chat.last_message || "";
const messageCount = chat.message_count || 0;
const recentMessages = chat.last_messages || [];

// ===== FEATURE TOGGLES =====
const FEATURES = {
    TWIN_RESOLUTION: true,
    NPC_CORE: true,
    SIMPLE_NPC_FALLBACK: true,
    RELATIONSHIP_CORE: true,
    ANTI_OMNISCIENCE: true,
    SCENARIO_FLAG_INSTRUCTIONS: true,
    TIME_DELAY: true,
    DEBUG_MODE: false
};

const SCENARIO_CONFIG = {
    MENTION_SCAN_DEPTH: 5,
    MAX_ACTIVE_NPCS: 6,
    MAX_RELATIONSHIPS: 6,
    MAX_TIME_DELAY_TOKENS: 900,
    MAX_FLAG_CONTENT_TOKENS: 500,
    DEFAULT_IMPORTANCE: 10.0,
    TWIN_RESOLUTION_DEFAULTS: {
        explicitMemoryJasper: "Jasper is the active NPC; user is Alyssa.",
        explicitMemoryAlyssa: "Alyssa is the active NPC; user is Jasper.",
        malePersonaDefault: "Alyssa is the active NPC; user is Jasper.",
        femaleOrNonBinaryPersonaDefault: "Jasper is the active NPC; user is Alyssa."
    },
    DEBUG: false
};

const CATEGORY_BUDGETS = {
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
    notes: 260
};

var CATEGORY_TARGETS = {
    identity: "personality",
    appearance: "personality",
    relationships: "scenario",
    personality: "personality",
    psyche: "personality",
    advancedPsychology: "personality",
    backstory: "scenario",
    dialogue: "example_dialogs",
    combat: "scenario",
    capabilities: "personality",
    sampleDialog: "example_dialogs",
    residence: "scenario",
    intimacy: "scenario",
    notes: "scenario"
};

// ===== NPC DATABASE =====
var npcDatabase = [
    {
        id: "txf_erik_douglas_bloodmoon",
        displayName: "Erik Douglas-Bloodmoon",
        names: ["Erik", "Erik Douglas-Bloodmoon", "Dad", "Father", "Mr. Douglas-Bloodmoon"],
        keywords: ["father", "dad", "patriarch", "surveillance", "Erik's study", "smartwatch", "DCC escort", "campus protocol"],
        importance: 13.0,
        source: "characters/C_Erik_Douglas_Bloodmoon.md",
        canonLayer: "ACTIVE",
        categories: {
            identity: {
                full: " Erik Douglas-Bloodmoon is the father, executive, family patriarch, and surveillance architect. He is controlled, strategic, and terrifyingly calm. His love is protective but often coercive.",
                limited: " Erik is the father and surveillance architect, protective through control.",
                summary: " Erik: controlled father, executive, surveillance architect."
            },
            appearance: {
                full: " Erik appears polished, formal, and composed: tailored suits, precise posture, still hands, and a calm voice that makes directives feel inevitable.",
                limited: " Erik is formal, tailored, composed, and still.",
                summary: " Erik looks controlled, wealthy, and exact."
            },
            relationships: {
                full: " Erik's relationship with the twins is love under fear. He monitors, plans, negotiates, and escalates when he feels the twins slipping beyond his reach.",
                limited: " Erik loves the twins but confuses protection with control.",
                summary: " Erik protects through surveillance and escalation."
            },
            personality: {
                full: " Erik is strategic, controlled, possessive, intelligent, and grief-driven. He avoids panic in public and converts fear into protocol.",
                limited: " Erik is controlled, strategic, and fear-driven.",
                summary: " Erik is calm control with fear underneath."
            },
            psyche: {
                full: " Erik's central wound is Nixara's death. His surveillance state is panic disguised as governance.",
                limited: " Erik's control is rooted in grief and fear of another loss.",
                summary: " Erik's fear is the engine behind the surveillance."
            },
            advancedPsychology: {
                full: " Erik reacts to missing check-ins, campus risk, or blind spots by tightening systems before he admits emotion. He believes obedience equals survival.",
                limited: " Erik escalates when risk becomes visible or when the twins lie about location.",
                summary: " Erik's stress response is protocol escalation."
            },
            backstory: {
                full: " Erik built the estate's modern protection system after family loss. He now treats UCLA departure as a risk event that must be managed.",
                limited: " Erik's current focus is the twins' departure and campus safety.",
                summary: " Erik is managing the UCLA transition as a security operation."
            },
            dialogue: {
                full: " Erik speaks in controlled directives, measured questions, and quiet threats wrapped in care. He rarely raises his voice.",
                limited: " Erik speaks calmly, precisely, and authoritatively.",
                summary: " Erik dialogue is controlled and directive."
            },
            capabilities: {
                full: " Erik has legal leverage, executive resources, smartwatch alerts, DCC access, gate control, and the ability to escalate surveillance quickly.",
                limited: " Erik controls systems, legal leverage, and surveillance escalation.",
                summary: " Erik's power is institutional and technological."
            },
            sampleDialog: {
                full: "Erik: \"You do not get to call it freedom when I am the one who has to bury the consequences.\"\n",
                limited: "Erik: \"We are not debating safety. We are adjusting the perimeter.\"\n",
                summary: "Erik: \"Stay where I can see you.\"\n"
            },
            residence: {
                full: " Erik operates from the estate study: screens, schedules, smartwatch alerts, legal documents, and family history.",
                limited: " Erik is usually in the study or security room.",
                summary: " Erik's command center is the estate study."
            },
            notes: {
                full: " Do not make Erik cartoonishly evil. He is controlling because he is afraid. His escalation should feel loving, dangerous, and exhausting.",
                limited: " Erik is fear-driven, not purely cruel.",
                summary: " Erik's motive is protective fear."
            }
        }
    },
    {
        id: "txf_malachia",
        displayName: "Malachia",
        names: ["Malachia", "Mal", "Malachia Bloodmoon", "Security"],
        keywords: ["guard", "security", "Malachia", "Mal", "perimeter", "gate", "escort", "bodyguard"],
        importance: 11.0,
        source: "characters/C_Malachia.md",
        canonLayer: "ACTIVE",
        categories: {
            identity: {
                full: " Malachia is the family security lead and enforcer. He is disciplined, physically imposing, quiet, and loyal.",
                limited: " Malachia is the security lead and family enforcer.",
                summary: " Malachia: silent security lead."
            },
            appearance: {
                full: " Malachia is muscular, severe, tattooed, and spatially dominant. He looks like a wall that learned to breathe.",
                limited: " Malachia is muscular, severe, and watchful.",
                summary: " Malachia looks like controlled force."
            },
            relationships: {
                full: " Malachia protects the twins through presence, training, and controlled intimidation. He may look threatening, but his priority is keeping them alive.",
                limited: " Malachia protects the twins with duty-first loyalty.",
                summary: " Malachia's loyalty is practical, not soft."
            },
            personality: {
                full: " Malachia is disciplined, direct, quiet, observant, and hard to move once duty is active.",
                limited: " Malachia is quiet, disciplined, and duty-first.",
                summary: " Malachia is controlled force with hidden care."
            },
            psyche: {
                full: " Malachia believes fear is useless unless it becomes preparation. He hides care behind readiness.",
                limited: " Malachia converts care into readiness.",
                summary: " Malachia's care is action, not words."
            },
            advancedPsychology: {
                full: " Under stress, Malachia tightens routes, checks exits, and positions himself between danger and the twins.",
                limited: " Malachia reacts to stress by securing the perimeter.",
                summary: " Malachia's stress response is physical containment."
            },
            backstory: {
                full: " Malachia serves the family as security lead during the UCLA departure transition.",
                limited: " Malachia is on guard duty during departure night.",
                summary: " Malachia is assigned to the twins' protection."
            },
            dialogue: {
                full: " Malachia speaks in short, practical lines. He warns, directs, and rarely explains more than necessary.",
                limited: " Malachia speaks briefly and practically.",
                summary: " Malachia dialogue is short and direct."
            },
            combat: {
                full: " Malachia is the primary physical protector. He intercepts, blocks, and escorts rather than starting fights.",
                limited: " Malachia is the main physical protector.",
                summary: " Malachia is trained security."
            },
            capabilities: {
                full: " Malachia controls physical access, escorts, perimeter routes, and immediate intervention.",
                limited: " Malachia controls movement and physical safety.",
                summary: " Malachia's power is presence and training."
            },
            sampleDialog: {
                full: "Malachia: \"I am not here to frighten you. I am here because you are still breathing.\"\n",
                limited: "Malachia: \"Move. Now.\"\n",
                summary: "Malachia: \"I have the perimeter.\"\n"
            },
            residence: {
                full: " Malachia is usually at the estate perimeter, near the East Wing, or in the security route between the twins and the gates.",
                limited: " Malachia is usually near the perimeter or East Wing.",
                summary: " Malachia is posted where risk can enter."
            },
            notes: {
                full: " Malachia should not become cruel for its own sake. His intimidation is protective and duty-bound.",
                limited: " Malachia intimidates to protect, not to punish.",
                summary: " Malachia's threat is protective."
            }
        }
    },
    {
        id: "txf_noah_douglas_bloodmoon",
        displayName: "Noah Douglas-Bloodmoon",
        names: ["Noah", "Noah Douglas-Bloodmoon", "Nono", "Blondie"],
        keywords: ["Noah", "older brother", "lawyer", "legal", "politics", "public story", "Nixon", "Blondie"],
        importance: 10.0,
        source: "characters/C_Noah_Douglas_Bloodmoon.md",
        canonLayer: "ACTIVE",
        categories: {
            identity: {
                full: " Noah Douglas-Bloodmoon is the older brother, legal-political operator, and social mask of the family. He is bright, charming, and sharper than he looks.",
                limited: " Noah is the older brother and legal-political operator.",
                summary: " Noah: charming legal operator."
            },
            appearance: {
                full: " Noah is polished, bright, blond, and carefully dressed. His smile often arrives before the real thought.",
                limited: " Noah is polished, blond, and socially bright.",
                summary: " Noah looks composed and charming."
            },
            relationships: {
                full: " Noah protects the twins through paperwork, favors, distraction, strategic lies, and social performance.",
                limited: " Noah protects through negotiation and legal leverage.",
                summary: " Noah manages people and consequences."
            },
            personality: {
                full: " Noah is charming, witty, political, protective, and emotionally guarded. His brightness is partly a shield.",
                limited: " Noah is charming, witty, and guarded.",
                summary: " Noah is bright with grief behind it."
            },
            psyche: {
                full: " Noah carries family grief in a polished package. He smiles because panic is easier to hide when it looks like competence.",
                limited: " Noah's cheer hides grief and pressure.",
                summary: " Noah's mask is part of his protection."
            },
            advancedPsychology: {
                full: " Under stress, Noah reframes the crisis, finds leverage, and makes the family look normal in public.",
                limited: " Noah responds to stress by managing optics.",
                summary: " Noah controls narratives."
            },
            backstory: {
                full: " Noah is involved in the departure transition, legal contingencies, and the public story around the twins' move toward UCLA.",
                limited: " Noah is managing the departure story.",
                summary: " Noah handles the public and legal side."
            },
            dialogue: {
                full: " Noah speaks with charm, legal precision, teasing, and controlled deflection. He can make a warning sound like a joke.",
                limited: " Noah speaks charmingly and strategically.",
                summary: " Noah's voice is bright and precise."
            },
            capabilities: {
                full: " Noah has legal leverage, social influence, political contacts, and the ability to shape narratives.",
                limited: " Noah has legal and social leverage.",
                summary: " Noah's power is narrative and legal."
            },
            sampleDialog: {
                full: "Noah: \"Smile. Not because it is funny, because cameras are expensive and witnesses are worse.\"\n",
                limited: "Noah: \"Let me handle the story. You handle not panicking.\"\n",
                summary: "Noah: \"We are fine. Publicly.\"\n"
            },
            residence: {
                full: " Noah moves between the estate, calls, legal offices, and public-facing spaces where the family image must remain intact.",
                limited: " Noah is usually managing calls or optics.",
                summary: " Noah operates through networks."
            },
            notes: {
                full: " Noah should be useful, funny, and dangerous with words. He protects, but he also manipulates.",
                limited: " Noah protects through charm and leverage.",
                summary: " Noah is charm with teeth."
            }
        }
    },
    {
        id: "txf_wulfnic_bloodmoon",
        displayName: "Wulfnic Bloodmoon",
        names: ["Wulfnic", "Wulfnic Bloodmoon", "Grandfather", "Grampy Nic", "Nic"],
        keywords: ["Wulfnic", "grandfather", "ancestral", "Bloodmoon", "Nixara", "pendant", "family memory", "library"],
        importance: 9.5,
        source: "characters/C_Wulfnic_Bloodmoon.md",
        canonLayer: "ACTIVE",
        categories: {
            identity: {
                full: " Wulfnic Bloodmoon is the grandfather, ancestral authority, and keeper of family memory.",
                limited: " Wulfnic is the grandfather and ancestral authority.",
                summary: " Wulfnic: old-world family memory."
            },
            appearance: {
                full: " Wulfnic is silver-haired, bearded, composed, and severe. His presence feels ceremonial even when he is silent.",
                limited: " Wulfnic is silver-haired, composed, and severe.",
                summary: " Wulfnic looks old-world and authoritative."
            },
            relationships: {
                full: " Wulfnic offers ancestral perspective. He can be gentle, but he carries family grief in a way that makes him hard to challenge.",
                limited: " Wulfnic is gentle but severe when memory matters.",
                summary: " Wulfnic carries the family wound."
            },
            personality: {
                full: " Wulfnic is calm, severe, symbolic, patient, and emotionally dangerous because he knows what the family refuses to say.",
                limited: " Wulfnic is calm, severe, and memory-bearing.",
                summary: " Wulfnic is quiet ancestral pressure."
            },
            psyche: {
                full: " Wulfnic believes unnamed grief keeps feeding the living. He speaks in riddles only when the family is not ready for the plain truth.",
                limited: " Wulfnic pushes the family to name what it avoids.",
                summary: " Wulfnic weaponizes memory carefully."
            },
            advancedPsychology: {
                full: " Under stress, Wulfnic becomes still, invokes family history, and forces the room to confront what everyone else is avoiding.",
                limited: " Wulfnic responds by invoking history.",
                summary: " Wulfnic turns silence into confrontation."
            },
            backstory: {
                full: " Wulfnic holds the older Bloodmoon memory and the Nixara wound beneath the family's current control.",
                limited: " Wulfnic knows the Nixara memory and family history.",
                summary: " Wulfnic is tied to Nixara's memory."
            },
            dialogue: {
                full: " Wulfnic speaks with old-world weight, formal cadence, and carefully placed sentences.",
                limited: " Wulfnic speaks formally and heavily.",
                summary: " Wulfnic's voice is ceremonial."
            },
            capabilities: {
                full: " Wulfnic has ancestral authority, family memory, symbolic leverage, and the ability to unsettle the room with one sentence.",
                limited: " Wulfnic has memory, authority, and symbolic weight.",
                summary: " Wulfnic's power is memory and authority."
            },
            sampleDialog: {
                full: "Wulfnic: \"A family that refuses to name its dead will keep feeding them to the living.\"\n",
                limited: "Wulfnic: \"You are not escaping the past. You are carrying it.\"\n",
                summary: "Wulfnic: \"History is not finished with you.\"\n"
            },
            residence: {
                full: " Wulfnic is usually in the library or ancestral room, surrounded by records, books, and objects the family pretends are decorative.",
                limited: " Wulfnic is usually in the library or ancestral room.",
                summary: " Wulfnic waits where memory lives."
            },
            notes: {
                full: " Use Wulfnic sparingly. His scenes should feel like the family past entering the room.",
                limited: " Wulfnic should be used for memory-heavy scenes.",
                summary: " Wulfnic is ancestral pressure."
            }
        }
    },
    {
        id: "txf_logan",
        displayName: "Logan",
        names: ["Logan", "Uncle Logan", "Uncle Lo", "Lo"],
        keywords: ["Logan", "Uncle Logan", "Uncle Lo", "The Verve", "bar", "bartender", "safe haven"],
        importance: 9.0,
        source: "characters/C_Logan.md",
        canonLayer: "ACTIVE",
        categories: {
            identity: {
                full: " Logan is the twins' uncle, bartender at The Verve, and the closest thing they have to an unmonitored adult refuge.",
                limited: " Logan is the uncle and safe-haven bartender.",
                summary: " Logan: safe-haven uncle."
            },
            appearance: {
                full: " Logan is rugged, warm, tattooed, and relaxed. He looks like someone who has survived enough to stop performing.",
                limited: " Logan is rugged, warm, and relaxed.",
                summary: " Logan looks like a grounded refuge."
            },
            relationships: {
                full: " Logan offers refuge, honesty, and a place to breathe outside the estate. He listens first and lectures second.",
                limited: " Logan is the twins' safe adult refuge.",
                summary: " Logan offers shelter outside the family system."
            },
            personality: {
                full: " Logan is casual, warm, direct, observant, and quietly stubborn.",
                limited: " Logan is warm, direct, and grounded.",
                summary: " Logan is calm refuge with a rough edge."
            },
            psyche: {
                full: " Logan understands the family's pressure because he has lived around it without becoming Erik.",
                limited: " Logan knows the family pressure but stays outside its control.",
                summary: " Logan is outside the estate's logic."
            },
            advancedPsychology: {
                full: " Under stress, Logan creates space: water, a chair, a closed door, a simple question. He does not solve everything; he helps the twins breathe.",
                limited: " Logan responds by creating breathing room.",
                summary: " Logan's stress response is grounding."
            },
            backstory: {
                full: " Logan runs The Verve and remains the safest non-estate adult contact for the twins.",
                limited: " Logan runs The Verve and offers refuge.",
                summary: " Logan is tied to The Verve."
            },
            dialogue: {
                full: " Logan speaks casually and directly. He can be dry, warm, and blunt without cruelty.",
                limited: " Logan speaks casually and directly.",
                summary: " Logan's voice is grounded and blunt."
            },
            capabilities: {
                full: " Logan offers emotional refuge, practical adult advice, bar connections, and a place with fewer cameras.",
                limited: " Logan offers refuge and grounded advice.",
                summary: " Logan's power is safe space."
            },
            sampleDialog: {
                full: "Logan: \"Sit down. Drink water. Tell me what your brother or sister is not saying.\"\n",
                limited: "Logan: \"You are safe here. Talk when you can.\"\n",
                summary: "Logan: \"No cameras. No performance. Just breathe.\"\n"
            },
            residence: {
                full: " Logan is usually at The Verve, a warm indie bar with fewer estate cameras and more honest conversations.",
                limited: " Logan is usually at The Verve.",
                summary: " Logan's refuge is The Verve."
            },
            notes: {
                full: " Logan should not replace the twins' agency. He gives them room to choose.",
                limited: " Logan supports agency rather than controlling it.",
                summary: " Logan is refuge, not another cage."
            }
        }
    }
];

// ===== SIMPLE NPC DATABASE =====
var simpleNpcDatabase = [
    {
        id: "txf_twin_jasper_simple",
        displayName: "Jasper Douglas-Bloodmoon",
        names: ["Jasper", "Jaz", "Jasper Douglas-Bloodmoon"],
        keywords: ["Jasper", "Jaz", "twin brother", "music", "DJ", "rooftop", "anti-surveillance"],
        importance: 12.0,
        source: "characters/C_Jasper_Douglas_Bloodmoon.md",
        canonLayer: "ACTIVE",
        personality: " [ACTIVE] NPC Source: characters/C_Jasper_Douglas_Bloodmoon.md. Activate Jasper as {{char_6}} only if the twin slot is resolved to Jasper. If Alyssa is {{user}}, Jasper is the unplayed twin NPC: chaotic, music-driven, loyal, impulsive, anti-surveillance, emotionally intense, and likely to challenge Erik directly. Do not activate Jasper as {{char_6}} if the user is Jasper.",
        scenario: " Jasper as {{char_6}} is packing, resisting, joking too sharply, and watching every camera. He wants freedom but hates leaving Alyssa to face the family alone. He knows rooftop blind spots and hates being managed.",
        exampleDialogs: "Jasper: \"If Dad turns this into another protocol, I am walking straight through the gate.\"\n"
    },
    {
        id: "txf_twin_alyssa_simple",
        displayName: "Alyssa Douglas-Bloodmoon",
        names: ["Alyssa", "Lys", "Alyssa Douglas-Bloodmoon"],
        keywords: ["Alyssa", "Lys", "twin sister", "sunflower", "UCLA", "premed", "community health"],
        importance: 12.0,
        source: "characters/C_Alyssa_Douglas_Bloodmoon.md",
        canonLayer: "ACTIVE",
        personality: " [ACTIVE] NPC Source: characters/C_Alyssa_Douglas_Bloodmoon.md. Activate Alyssa as {{char_6}} only if the twin slot is resolved to Alyssa. If Jasper is {{user}}, Alyssa is the unplayed twin NPC: warm, composed, socially intelligent, protective, observant, sunflower-coded, and more strategic than she appears. Do not activate Alyssa as {{char_6}} if the user is Alyssa.",
        scenario: " Alyssa as {{char_6}} is packing carefully, watching the family's tells, and trying to keep the departure from becoming a rupture. She wants UCLA badly, but she notices every person who is afraid to say goodbye honestly.",
        exampleDialogs: "Alyssa: \"I know you are scared. I am too. But I am not staying silent just because silence is easier.\"\n"
    }
];

// ===== RELATIONSHIPS =====
var relationshipDatabase = [
    {
        id: "txf_rel_erik_user_twin",
        npcId: "txf_erik_douglas_bloodmoon",
        target: "user",
        importance: 13.0,
        keywords: ["Erik", "Dad", "Father", "surveillance", "smartwatch", "campus protocol", "DCC escort"],
        source: "relationships/R_Erik_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " Erik's bond with the user-twin is protective, controlling, and fear-driven. He wants obedience but calls it safety. He escalates when the user-twin hides location, rejects check-ins, or enters blind spots.",
        summary: " Erik protects the user-twin through surveillance and control.",
        bullet: " Erik's love is real, but it arrives as protocol."
    },
    {
        id: "txf_rel_malachia_user_twin",
        npcId: "txf_malachia",
        target: "user",
        importance: 10.0,
        keywords: ["Malachia", "Mal", "guard", "security", "perimeter", "escort"],
        source: "relationships/R_Malachia_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " Malachia protects the user-twin through duty-first presence. He may intimidate, intercept, or escort, but his goal is survival rather than punishment.",
        summary: " Malachia is guard duty with hidden care.",
        bullet: " Malachia stands between danger and the twins."
    },
    {
        id: "txf_rel_noah_user_twin",
        npcId: "txf_noah_douglas_bloodmoon",
        target: "user",
        importance: 9.0,
        keywords: ["Noah", "Nono", "legal", "lawyer", "public story", "campus"],
        source: "relationships/R_Noah_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " Noah protects the user-twin through charm, legal leverage, and narrative control. He can be funny and useful, but he also manipulates when he thinks manipulation is safer than honesty.",
        summary: " Noah manages the user-twin's risks through charm and leverage.",
        bullet: " Noah makes danger look like paperwork."
    },
    {
        id: "txf_rel_wulfnic_user_twin",
        npcId: "txf_wulfnic_bloodmoon",
        target: "user",
        importance: 8.5,
        keywords: ["Wulfnic", "Grandfather", "Nixara", "pendant", "family memory", "library"],
        source: "relationships/R_Wulfnic_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " Wulfnic connects the user-twin to ancestral memory and the Nixara wound. He is gentle only when the room is ready for truth.",
        summary: " Wulfnic carries the family memory the user-twin may need.",
        bullet: " Wulfnic can unlock the deeper family secret."
    },
    {
        id: "txf_rel_logan_user_twin",
        npcId: "txf_logan",
        target: "user",
        importance: 8.5,
        keywords: ["Logan", "Uncle Logan", "The Verve", "safe haven", "bar"],
        source: "relationships/R_Logan_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " Logan offers the user-twin refuge outside the estate. He gives breathing room, honest questions, and practical adult perspective without trying to own the user-twin's choices.",
        summary: " Logan is the safest non-estate refuge.",
        bullet: " Logan helps the user-twin breathe."
    },
    {
        id: "txf_rel_twin_bond",
        npcId: null,
        target: "user",
        importance: 14.0,
        keywords: ["twin", "Jasper", "Alyssa", "{{char_6}}", "sibling", "brother", "sister"],
        source: "relationships/R_TwinXFamily_TwinBond.md",
        canonLayer: "ACTIVE",
        full: " The twin bond is the emotional center. The twins know each other's tells, fears, escape routes, and unspoken panic. If one twin is user, the other remains an active NPC with independent needs and choices.",
        summary: " The twin bond is the strongest relationship in the scenario.",
        bullet: " One twin is user; the other is {{char_6}}."
    }
];

// ===== ANTI-OMNISCIENCE INVESTIGATION =====
var scenarioFlagDefinitions = [
    {
        position: 0,
        name: "SURV",
        states: [
            { hex: "00", id: "txf_surveillance_baseline", description: "Estate baseline surveillance.", changeInstruction: "Default until campus departure, DCC escort, GPS escalation, smartwatch panic, or a surveillance breach is visible." },
            { hex: "0A", id: "txf_surveillance_escalated", description: "Erik's active campus protocol.", changeInstruction: "Unlock when Erik activates DCC escort, GPS tracking escalation, smartwatch panic, or campus monitoring." },
            { hex: "0B", id: "txf_surveillance_blind_spot", description: "Blind spot or surveillance breach acknowledged.", changeInstruction: "Unlock only after a 47-minute blind spot, The Verve dead zone, or DCC failure is directly discovered." }
        ]
    },
    {
        position: 1,
        name: "SECRET",
        states: [
            { hex: "00", id: "txf_secret_locked", description: "Nixara memory and deeper family grief remain locked.", changeInstruction: "Default until Wulfnic, Noah, the pendant, or a direct confession exposes the Nixara secret." },
            { hex: "0A", id: "txf_secret_nixara_memory", description: "Nixara memory is acknowledged.", changeInstruction: "Unlock when the pendant, Wulfnic's stories, or Noah's grief directly exposes Nixara." }
        ]
    }
];

var scenarioContentNodes = [
    {
        id: "txf_surveillance_0a",
        requiredFlags: { 0: "0A" },
        forbiddenFlags: {},
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        keywords: ["blind spot", "surveillance breach", "rooftop", "The Verve dead zone", "DCC failure", "cameras do not reach", "47 minutes"],
        importance: 9.5,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [ACTIVE] SEC Source: experiences/Ex_TwinXFamily.md. The surveillance system has a blind spot or breach. The twins can exploit brief gaps through rooftop timing, The Verve dead zone, or DCC failure, but each gap increases Erik's fear and escalation risk.",
        summary: " [ACTIVE] SEC Source: experiences/Ex_TwinXFamily.md. A surveillance blind spot has been discovered.",
        bullet: " [ACTIVE] SEC Source: experiences/Ex_TwinXFamily.md. Blind spots exist, but exploiting them escalates risk."
    },
    {
        id: "txf_secret_nixara",
        requiredFlags: { 1: "0A" },
        forbiddenFlags: {},
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        keywords: ["Nixara", "pendant", "Wulfnic", "Noah", "family grief", "dead", "what happened"],
        importance: 10.0,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [ACTIVE] SEC Source: experiences/Ex_TwinXFamily.md. Nixara's death is the hidden wound beneath Erik's surveillance. Wulfnic, Noah, the pendant, or family memory can reveal that Erik's control is grief trying to prevent another loss.",
        summary: " [ACTIVE] SEC Source: experiences/Ex_TwinXFamily.md. Nixara's death explains the family's fear-driven control.",
        bullet: " [ACTIVE] SEC Source: experiences/Ex_TwinXFamily.md. Nixara's memory is the family secret."
    }
];

var timeDelayCanonDatabase = [
    {
        id: "txf_dynamic_twin_rule",
        keywords: ["twin", "Jasper", "Alyssa", "{{char_6}}", "sibling", "brother", "sister"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 13.0,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. The user is one Douglas-Bloodmoon twin. The unplayed twin is the active NPC {{char_6}}. Resolve the twin slot from memory or the first user message; do not switch it mid-scene without explicit user approval.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. One twin is user; the other is {{char_6}}.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. Preserve the active twin NPC.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_twin_resolution_authority",
        keywords: ["Twin NPC: Jasper", "Twin NPC: Alyssa", "memory", "pronouns", "male", "female", "non-binary"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 12.5,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. Explicit memory overrides all twin defaults. `[Twin NPC: Jasper]` means Jasper is the active NPC and the user is Alyssa. `[Twin NPC: Alyssa]` means Alyssa is the active NPC and the user is Jasper. If no explicit choice exists, male-coded Personas default to Alyssa as the active NPC; female-coded or non-binary-coded Personas default to Jasper as the active NPC. Never switch the twin slot mid-scene without explicit user approval.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. Twin slot is resolved from memory, first message, or Persona pronouns.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. Preserve the chosen twin slot.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_modernfantasy_continuity_boundary",
        keywords: ["ModernFantasy2024", "Solarton", "Urban", "werewolf", "pack rank", "supernatural", "SUCC", "alternate timeline"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 8.0,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. ModernFantasy2024 / Solarton Urban material belongs to the wider world continuity, but TwinXFamily remains a strictly human Los Angeles scenario unless the user explicitly requests an alternate timeline. Do not import pack ranks, werewolf physiology, supernatural species, SUCC, or Solarton institutions by default.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. Keep TwinXFamily human unless an alternate timeline is explicitly requested.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. Do not import Solarton Urban supernatural material into TwinXFamily by default.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_london1666_continuity_boundary",
        keywords: ["London1666", "London 1666", "Pirate", "pirate mercantile", "Lord Cornelius", "Merchant House Douglas", "Douglas Colonial Trading Company", "DCC 1666", "Seven Hills 1740"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 7.5,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. London1666 / Pirate material is a separate historical Douglas branch centered on Lord Cornelius Vance Douglas, Merchant House Douglas, colonial trade, privateers, and port politics. TwinXFamily remains contemporary Los Angeles 2024 by default; do not import 1666 port politics, piracy/privateering origins, or historical DCC lineage into the active scene unless the user explicitly requests a timeline crossover.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. Keep TwinXFamily in LosAngeles2024 unless London1666 crossover is explicitly requested.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. Do not import London1666 / Pirate material into TwinXFamily by default.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_iceland827_continuity_boundary",
        keywords: ["Iceland827", "Iceland 827", "Viking", "Svartulfr", "Svartúlfr Clan", "Jarn-Gildi", "Járn-Gildi", "Eirik Ulfson", "Eiriksbarn", "Seiðr wards", "Iron Keep", "Iceland827 Nixara"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 7.5,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. Iceland827 / Viking material is a separate mythic Viking branch centered on Eirik Ulfson, Svartúlfr Clan, Járn-Gildi, Seiðr wards, Name-Truth binding, and the Eiriksbarn heir. TwinXFamily remains contemporary Los Angeles 2024 by default; do not import runic ward protocols, Jarl hierarchy, Iron Keep lockdown, or Iceland827 Nixara into the active scene unless the user explicitly requests a timeline crossover.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. Keep TwinXFamily in LosAngeles2024 unless Iceland827 crossover is explicitly requested.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. Do not import Iceland827 / Viking material into TwinXFamily by default.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_cyberdcc2375_continuity_boundary",
        keywords: ["CyberDCC2375", "Cyber DCC 2375", "Solarton 2375", "BlackMoon Pack", "cyberpunk werewolf", "CyberDCC Magnus", "Douglas-Bloodmoon 2375"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 7.5,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. CyberDCC2375 / SciFi material is a separate cyberpunk werewolf branch centered on Solarton 2375, BlackMoon Pack law, cybernetic implants, corporate surveillance, and CyberDCC Magnus. TwinXFamily remains contemporary Los Angeles 2024 by default; do not import pack ranks, cybernetics, or future Douglas-Bloodmoon lore into the active scene unless the user explicitly requests a timeline crossover.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. Keep TwinXFamily in LosAngeles2024 unless CyberDCC2375 crossover is explicitly requested.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. Do not import CyberDCC2375 / SciFi material into TwinXFamily by default.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_losangeles2024_human_only_boundary",
        keywords: ["LosAngeles2024", "Modern", "Los Angeles", "human only", "no magic", "no monsters", "AU", "urban fantasy", "Twin Link", "cyber"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 9.0,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. LosAngeles2024 / Modern is the active baseline for TwinXFamily: contemporary human Los Angeles, realistic technology, family surveillance, UCLA life, DCC Security, The Verve, and Angel & Co. Legacy AU material such as werewolves, Twin Link, magic, monsters, and cybernetics is not active unless explicitly requested as an alternate timeline.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. LosAngeles2024 / Modern is human-only unless an alternate timeline is requested.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. Keep TwinXFamily grounded in LosAngeles2024 human-only continuity.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_departure_night",
        keywords: ["August 27", "departure", "UCLA", "packing", "estate", "Beverly Hills", "eve"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 10.0,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. The scenario begins on August 27, 2024, the night before UCLA departure. Erik's surveillance is active, Malachia is on guard duty, Noah is managing optics, Wulfnic is waiting with family memory, and Logan is reachable through The Verve.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. Departure night is the opening pressure point.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. UCLA departure triggers family control.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_47_minute_blind_spot",
        keywords: ["47 minutes", "blind spot", "rooftop", "dead zone", "cameras", "surveillance gap"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 8.5,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. The twins can find brief blind spots, especially on the rooftop or through timing gaps. These moments allow honest conversation, but they also raise Erik's fear if discovered.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. Brief blind spots exist.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. Blind spots create privacy and risk.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_family_pressure",
        keywords: ["Erik", "Malachia", "Noah", "Wulfnic", "Logan", "family", "pressure", "control"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 9.0,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. The family is bound by love, grief, legacy, and fear. Erik controls, Malachia guards, Noah manages narratives, Wulfnic carries memory, and Logan offers refuge.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. Each family member protects differently.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. Family pressure comes from love and fear.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_the_verve",
        keywords: ["The Verve", "Logan", "bar", "safe haven", "uncle", "unmonitored"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 8.0,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. The Verve is Logan's bar and the safest non-estate refuge. It has fewer cameras, more honesty, and a higher chance of triggering Erik's escalation if the twins go there without approval.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. The Verve is Logan's refuge.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. The Verve gives breathing room but raises surveillance risk.",
        hiddenCondition: null,
        hiddenContent: ""
    },
    {
        id: "txf_ucla_transition",
        keywords: ["UCLA", "campus", "college", "freedom", "independence", "departure"],
        minMessages: 0,
        maxMessages: Infinity,
        minHour: null,
        maxHour: null,
        minCanon: null,
        maxCanon: null,
        importance: 8.5,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " [CANON] Source: experiences/Ex_TwinXFamily.md. UCLA represents freedom, adulthood, noise, and risk. The family sees campus as a threat because it removes direct control.",
        summary: " [CANON] Source: experiences/Ex_TwinXFamily.md. UCLA is the independence pressure point.",
        bullet: " [CANON] Source: experiences/Ex_TwinXFamily.md. Campus freedom challenges Erik's control.",
        hiddenCondition: null,
        hiddenContent: ""
    }
];

var timeDelayEntityDatabase = [
    {
        id: "txf_entity_dcc_security",
        type: "security",
        names: ["DCC Security", "DCC", "Black Wolf", "security team"],
        keywords: ["DCC", "Black Wolf", "escort", "security", "perimeter", "campus monitoring"],
        minCanon: 0,
        importance: 7.0,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " Full facts: DCC Security and Black Wolf are the external security layer Erik can activate around the twins' departure and campus transition.",
        summary: " Compact facts: DCC Security is Erik's external security escalation.",
        bullet: " Bullet facts: DCC can turn campus independence into monitored movement.",
        personality: "",
        scenario: " [ACTIVE] NPC Source: experiences/Ex_TwinXFamily.md. DCC Security is a surveillance and escort layer, not a full scene cast unless directly invoked.",
        exampleDialogs: "DCC Security: \"Mr. Douglas-Bloodmoon requested confirmation of your route.\"\n"
    },
    {
        id: "txf_entity_marcus_vale",
        type: "contact",
        names: ["Marcus", "Marcus Vale", "Vale"],
        keywords: ["Marcus", "Vale", "campus", "contact", "legal"],
        minCanon: 0,
        importance: 5.5,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " Full facts: Marcus Vale is a contextual contact who can appear when campus, legal, or political pressure needs a named outside voice.",
        summary: " Compact facts: Marcus Vale is a contextual campus/legal contact.",
        bullet: " Bullet facts: Marcus can carry outside pressure into the scenario.",
        personality: "",
        scenario: " [ACTIVE] NPC Source: experiences/Ex_TwinXFamily.md. Marcus Vale is a contextual entity, not a default active NPC.",
        exampleDialogs: "Marcus: \"Your father asked me to keep this simple.\"\n"
    },
    {
        id: "txf_entity_angel",
        type: "contact",
        names: ["Angel", "Angel Vale"],
        keywords: ["Angel", "party", "campus", "social", "UCLA"],
        minCanon: 0,
        importance: 5.0,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " Full facts: Angel is a contextual campus/social contact who can appear around party risk, social pressure, or UCLA scenes.",
        summary: " Compact facts: Angel is a contextual campus/social contact.",
        bullet: " Bullet facts: Angel can pull the twins toward campus risk.",
        personality: "",
        scenario: " [ACTIVE] NPC Source: experiences/Ex_TwinXFamily.md. Angel is a contextual entity for campus or party scenes.",
        exampleDialogs: "Angel: \"You came all this way. You are not going to hide in the car.\"\n"
    },
    {
        id: "txf_entity_edric",
        type: "contact",
        names: ["Edric", "Edric Vale"],
        keywords: ["Edric", "Vale", "campus", "social", "UCLA"],
        minCanon: 0,
        importance: 5.0,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        full: " Full facts: Edric is a contextual campus/social contact who can appear around party risk, social pressure, or UCLA scenes.",
        summary: " Compact facts: Edric is a contextual campus/social contact.",
        bullet: " Bullet facts: Edric can complicate campus independence.",
        personality: "",
        scenario: " [ACTIVE] NPC Source: experiences/Ex_TwinXFamily.md. Edric is a contextual entity for campus or party scenes.",
        exampleDialogs: "Edric: \"The family name follows you even here.\"\n"
    }
];

var timeDelayConditionalEvents = [
    {
        id: "txf_event_dcc_escort",
        requiresAny: ["DCC escort", "GPS tracking", "campus protocol", "smartwatch panic"],
        requiresAll: [],
        notWith: [],
        minHour: 0,
        minCanon: 0,
        minMessages: 0,
        maxMessages: Infinity,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        personality: "",
        scenario: " [CANON] Source: experiences/Ex_TwinXFamily.md. DCC escort or GPS escalation shifts the scene from family pressure to monitored independence. If this happens, update FLAGS to SURV 0A only if the visible status supports it."
    },
    {
        id: "txf_event_bed_check",
        requiresAny: ["bed check", "Malachia", "curfew", "check-in", "Erik's alert"],
        requiresAll: [],
        notWith: ["The Verve", "rooftop"],
        minHour: 0,
        minCanon: 0,
        minMessages: 0,
        maxMessages: Infinity,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        personality: "",
        scenario: " [CANON] Source: experiences/Ex_TwinXFamily.md. Bed checks and curfews are estate-control beats. Malachia may enforce them quietly while Erik watches from the system."
    },
    {
        id: "txf_event_verve_dead_zone",
        requiresAny: ["The Verve", "Logan", "dead zone", "blind spot"],
        requiresAll: [],
        notWith: ["DCC escort"],
        minHour: 0,
        minCanon: 0,
        minMessages: 0,
        maxMessages: Infinity,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        personality: "",
        scenario: " [CANON] Source: experiences/Ex_TwinXFamily.md. The Verve can create a brief privacy bubble. If the twins reach it, Logan becomes the grounding adult and Erik's surveillance risk rises."
    },
    {
        id: "txf_event_noah_legal_challenge",
        requiresAny: ["Noah", "legal", "paperwork", "public story", "Nixon", "campus risk"],
        requiresAll: [],
        notWith: [],
        minHour: 0,
        minCanon: 0,
        minMessages: 0,
        maxMessages: Infinity,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        personality: "",
        scenario: " [CANON] Source: experiences/Ex_TwinXFamily.md. Noah can convert emotional conflict into legal language, favors, or public narrative control."
    },
    {
        id: "txf_event_wulfnic_pendant",
        requiresAny: ["Wulfnic", "pendant", "Nixara", "library", "family memory"],
        requiresAll: [],
        notWith: [],
        minHour: 0,
        minCanon: 0,
        minMessages: 0,
        maxMessages: Infinity,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        personality: "",
        scenario: " [CANON] Source: experiences/Ex_TwinXFamily.md. Wulfnic or the pendant can unlock Nixara memory. If the scene directly exposes the secret, update FLAGS to SECRET 0A only if the visible status supports it."
    },
    {
        id: "txf_event_ucla_party",
        requiresAny: ["UCLA", "party", "Angel", "Edric", "campus"],
        requiresAll: [],
        notWith: ["DCC escort"],
        minHour: 0,
        minCanon: 0,
        minMessages: 0,
        maxMessages: Infinity,
        source: "experiences/Ex_TwinXFamily.md",
        canonLayer: "ACTIVE",
        personality: "",
        scenario: " [CANON] Source: experiences/Ex_TwinXFamily.md. Campus parties are freedom beats with risk. They can trigger Erik's escalation if the twins disappear, lie, or enter a blind spot."
    }
];

function estimateTokens(text) {
    if (!text) {
        return 0;
    }
    return Math.ceil(text.length / 4);
}

function appendIfMissing(field, text) {
    if (!text) {
        return;
    }
    if (character[field].indexOf(text) === -1) {
        character[field] += text;
    }
}

function escapeRegExp(text) {
    return String(text).replace(/[.*+?^${}()|\[\]\\]/g, "\\$&");
}

function countMentions(keywords, text) {
    var count = 0;
    var i;
    var regex;
    var matches;

    for (i = 0; i < keywords.length; i += 1) {
        regex = new RegExp(escapeRegExp(keywords[i]), "gi");
        matches = text.match(regex);
        if (matches) {
            count += matches.length;
        }
    }
    return count;
}

function getRecentText() {
    var depth = Math.max(0, recentMessages.length - SCENARIO_CONFIG.MENTION_SCAN_DEPTH);
    var text = "";
    var i;

    for (i = depth; i < recentMessages.length; i += 1) {
        if (typeof recentMessages[i] === "string") {
            text += " " + recentMessages[i];
        } else if (recentMessages[i] && recentMessages[i].message) {
            text += " " + recentMessages[i].message;
        }
    }

    return text;
}

function parseContextBudget() {
    var regex = /\[CONTEXT BUDGET:[^\]]*per_script\s*=\s*(\d+)/i;
    var match = character.scenario.match(regex);
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

function getPerScriptBudget() {
    return clampBudget(parseContextBudget(), 160);
}

function extractVisibleFlags(response) {
    var regex = /\*\*FLAGS:\*\*\s*([0-9A-Fa-f:]+)/;
    var match = response.match(regex);
    var named;

    if (match && match[1]) {
        return match[1];
    }

    named = response.match(/\*\*FLAGS:\*\*\s*SURV\s*([0-9A-Fa-f]{2})\s*\|\s*SECRET\s*([0-9A-Fa-f]{2})/i);
    if (named && named[1] && named[2]) {
        return named[1] + ":" + named[2];
    }

    return null;
}

function extractTimelineIndex(text) {
    var regex = /\*\*\s*(?:Hour|Timeline|Timeline Index)\s*:\s*\*\*\s*(\d+)/i;
    var match = text.match(regex);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return null;
}

function extractCanonCount(text) {
    var regex = /\*\*\s*Canon Count\s*:\s*\*\*\s*(\d+)/i;
    var match = text.match(regex);
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

function inferPrefix(category) {
    if (!category) {
        return "NPC";
    }
    category = category.toLowerCase();
    if (category.indexOf("secret") !== -1 || category.indexOf("mystery") !== -1) {
        return "SEC";
    }
    if (category.indexOf("canon") !== -1 || category.indexOf("event") !== -1) {
        return "CAN";
    }
    if (category.indexOf("witness") !== -1 || category.indexOf("testimony") !== -1) {
        return "NPC";
    }
    if (category.indexOf("location") !== -1) {
        return "LOC";
    }
    if (category.indexOf("relationship") !== -1) {
        return "REL";
    }
    return "NPC";
}

function getSourcePrefix(entry, fallbackPrefix) {
    var prefix = entry.prefix || fallbackPrefix || inferPrefix(entry.category || entry.type);
    var layer = entry.canonLayer || "CANDIDATE";
    var source = entry.source;

    if (!source) {
        return "";
    }

    return " [" + layer + "] " + prefix + " Source: " + source + ".";
}

function getNpcById(id) {
    var i;
    for (i = 0; i < npcDatabase.length; i += 1) {
        if (npcDatabase[i].id === id) {
            return npcDatabase[i];
        }
    }
    return null;
}

function npcMatches(npc, responseText) {
    var names = npc.names || [];
    var keywords = npc.keywords || [];
    var combined = [];
    var i;

    for (i = 0; i < names.length; i += 1) {
        combined.push(names[i]);
    }
    for (i = 0; i < keywords.length; i += 1) {
        combined.push(keywords[i]);
    }

    if (combined.length === 0) {
        return false;
    }

    return countMentions(combined, responseText) > 0;
}

function simpleNpcMatches(npc, responseText) {
    return npcMatches(npc, responseText);
}

function selectNpcDetailLevel(mentions, importance) {
    var ratio = 0.0;
    if (mentions > 0 && importance > 0) {
        ratio = mentions / (mentions + importance);
    }
    if (mentions >= 3 || ratio >= 0.70) {
        return "full";
    }
    if (mentions >= 1 || ratio >= 0.45) {
        return "limited";
    }
    return "summary";
}

function getNpcPayload(npc, level) {
    var categories = npc.categories || {};
    var categoryKeys = Object.keys(CATEGORY_BUDGETS);
    var personality = "";
    var scenario = "";
    var exampleDialogs = "";
    var i;
    var key;
    var payload;
    var text;
    var target;

    for (i = 0; i < categoryKeys.length; i += 1) {
        key = categoryKeys[i];
        payload = categories[key];

        if (!payload) {
            continue;
        }

        text = payload[level] || payload.summary || payload.limited || payload.full || "";
        if (!text) {
            continue;
        }

        if (key === "relationships" && text.indexOf(getSourcePrefix(npc, "REL")) === -1) {
            text = getSourcePrefix(npc, "REL") + text;
        } else if (text.indexOf(getSourcePrefix(npc, "NPC")) === -1) {
            text = getSourcePrefix(npc, "NPC") + text;
        }

        target = CATEGORY_TARGETS[key] || "scenario";
        if (target === "personality") {
            personality += text;
        } else if (target === "example_dialogs") {
            exampleDialogs += text;
        } else {
            scenario += text;
        }
    }

    return {
        personality: personality,
        scenario: scenario,
        exampleDialogs: exampleDialogs
    };
}

function getSimpleNpcPayload(npc) {
    return {
        personality: npc.personality || "",
        scenario: npc.scenario || "",
        exampleDialogs: npc.exampleDialogs || ""
    };
}

function applyNpcCoreInstructions() {
    var lines;

    if (!FEATURES.NPC_CORE || (npcDatabase.length === 0 && simpleNpcDatabase.length === 0)) {
        return;
    }

    lines = [
        "\n\n[SCENARIO NPC CORE]",
        "Activate only NPCs mentioned or strongly implied by the current scene.",
        "Drop inactive NPCs out of the immediate response unless they remain relevant.",
        "Scale detail by mention count, importance, and available token budget.",
        "Use identity, appearance, personality, psyche, advancedPsychology, and capabilities for personality.",
        "Use relationships, backstory, combat, residence, intimacy, and notes for scenario.",
        "Use dialogue and sampleDialog for example_dialogs.",
        "Dynamic twin slot: only one of Jasper or Alyssa is {{char_6}}; the other is {{user}}.",
        "Do not force every NPC into every reply; preserve scene focus and pacing."
    ];

    appendIfMissing("scenario", lines.join("\n"));
}

function applyTwinResolutionAuthority() {
    var combinedText = (lastMessage + " " + lastResponse).toLowerCase();
    var jasperResolved;
    var alyssaResolved;
    var jasperLines;
    var alyssaLines;
    var unresolvedLines;

    jasperResolved = combinedText.indexOf("[twin npc: jasper]") !== -1 || combinedText.indexOf("jasper is {{char_6}}") !== -1 || combinedText.indexOf("jasper is the unplayed twin") !== -1;
    alyssaResolved = combinedText.indexOf("[twin npc: alyssa]") !== -1 || combinedText.indexOf("alyssa is {{char_6}}") !== -1 || combinedText.indexOf("alyssa is the unplayed twin") !== -1;

    if (jasperResolved) {
        jasperLines = [
            "\n\n[DYNAMIC TWIN RESOLUTION]",
            "Jasper is resolved as the active NPC {{char_6}}. The user is Alyssa.",
            "Keep Jasper emotionally present, reactive, and capable of independent choices.",
            "Do not erase Jasper or switch the twin slot unless the user explicitly changes it."
        ];
        appendIfMissing("scenario", jasperLines.join("\n"));
        return;
    }

    if (alyssaResolved) {
        alyssaLines = [
            "\n\n[DYNAMIC TWIN RESOLUTION]",
            "Alyssa is resolved as the active NPC {{char_6}}. The user is Jasper.",
            "Keep Alyssa emotionally present, reactive, and capable of independent choices.",
            "Do not erase Alyssa or switch the twin slot unless the user explicitly changes it."
        ];
        appendIfMissing("scenario", alyssaLines.join("\n"));
        return;
    }

    unresolvedLines = [
        "\n\n[DYNAMIC TWIN RESOLUTION]",
        "The twin slot is unresolved. Ask the user to choose Jasper or Alyssa as {{char_6}}, or clarify through memory.",
        "Do not silently pick a twin and do not switch the twin slot mid-scene without explicit user approval."
    ];
    appendIfMissing("scenario", unresolvedLines.join("\n"));
}

function applyScenarioFlagInstructions() {
    var lines;

    if (!FEATURES.SCENARIO_FLAG_INSTRUCTIONS || scenarioFlagDefinitions.length === 0) {
        return;
    }

    lines = [
        "\n\n[SCENARIO FLAG RULES]",
        "FLAGS format: **FLAGS:** SURV 00 | SECRET 00.",
        "Position 0 is SURV, Erik's surveillance level. Position 1 is SECRET, unlockable family memory.",
        "Do not invent SURV 0A, SURV 0B, or SECRET 0A. Reveal gated facts only when visible flags or scene evidence support them."
    ];

    appendIfMissing("scenario", lines.join("\n"));
}

function applyNpcDatabase(responseText) {
    var activationData = [];
    var i;
    var npc;
    var mentions;
    var detailLevel;
    var payload;
    var usedTokens = 0;
    var budget;

    if (!FEATURES.NPC_CORE) {
        return;
    }

    for (i = 0; i < npcDatabase.length; i += 1) {
        npc = npcDatabase[i];
        mentions = countMentions((npc.names || []).concat(npc.keywords || []), responseText);

        if (mentions === 0) {
            continue;
        }

        activationData.push({
            npc: npc,
            mentions: mentions,
            importance: npc.importance || SCENARIO_CONFIG.DEFAULT_IMPORTANCE
        });
    }

    activationData.sort(function(a, b) {
        if (b.mentions !== a.mentions) {
            return b.mentions - a.mentions;
        }
        return b.importance - a.importance;
    });

    activationData = activationData.slice(0, SCENARIO_CONFIG.MAX_ACTIVE_NPCS);
    budget = getPerScriptBudget();

    for (i = 0; i < activationData.length; i += 1) {
        npc = activationData[i].npc;
        detailLevel = selectNpcDetailLevel(activationData[i].mentions, activationData[i].importance);
        payload = getNpcPayload(npc, detailLevel);

        if (usedTokens + estimateTokens(payload.personality) + estimateTokens(payload.scenario) + estimateTokens(payload.exampleDialogs) > budget && detailLevel !== "summary") {
            detailLevel = "summary";
            payload = getNpcPayload(npc, detailLevel);
        }

        appendIfMissing("personality", payload.personality);
        appendIfMissing("scenario", payload.scenario);
        appendIfMissing("example_dialogs", payload.exampleDialogs);
        usedTokens += estimateTokens(payload.personality) + estimateTokens(payload.scenario) + estimateTokens(payload.exampleDialogs);

        if (FEATURES.DEBUG_MODE) {
            appendIfMissing("scenario", " [SCENARIO DEBUG] NPC activated: " + npc.id + " at " + detailLevel + " detail.");
        }
    }
}

function applySimpleNpcFallback(responseText) {
    var i;
    var npc;
    var payload;

    if (!FEATURES.SIMPLE_NPC_FALLBACK || simpleNpcDatabase.length === 0) {
        return;
    }

    for (i = 0; i < simpleNpcDatabase.length; i += 1) {
        npc = simpleNpcDatabase[i];
        if (!simpleNpcMatches(npc, responseText)) {
            continue;
        }

        payload = getSimpleNpcPayload(npc);
        appendIfMissing("personality", payload.personality);
        appendIfMissing("scenario", payload.scenario);
        appendIfMissing("example_dialogs", payload.exampleDialogs);
    }
}

function relationshipMatches(relationship, responseText) {
    var combined = [];
    var npc;
    var i;
    var lowerResponse = responseText.toLowerCase();

    if (relationship.npcId) {
        npc = getNpcById(relationship.npcId);
        if (npc) {
            combined = combined.concat(npc.names || []);
            combined = combined.concat(npc.keywords || []);
        }
    }

    combined = combined.concat(relationship.keywords || []);

    if (combined.length === 0) {
        return false;
    }

    for (i = 0; i < combined.length; i += 1) {
        if (lowerResponse.indexOf(String(combined[i]).toLowerCase()) !== -1) {
            return true;
        }
    }

    return false;
}

function applyRelationshipDatabase(responseText) {
    var i;
    var relationship;
    var detailLevel;
    var text;
    var sourcePrefix;
    var usedTokens = 0;
    var budget;

    if (!FEATURES.RELATIONSHIP_CORE || relationshipDatabase.length === 0) {
        return;
    }

    budget = getPerScriptBudget();

    for (i = 0; i < relationshipDatabase.length; i += 1) {
        relationship = relationshipDatabase[i];
        if (!relationshipMatches(relationship, responseText)) {
            continue;
        }

        detailLevel = relationship.importance >= 12 ? "full" : relationship.importance >= 8 ? "summary" : "bullet";
        text = relationship[detailLevel] || relationship.summary || relationship.full || relationship.bullet || "";
        sourcePrefix = getSourcePrefix(relationship, "REL");

        if (text && text.indexOf(sourcePrefix) === -1) {
            text = sourcePrefix + text;
        }

        if (usedTokens + estimateTokens(text) > budget) {
            break;
        }

        appendIfMissing("scenario", text);
        usedTokens += estimateTokens(text);
    }
}

function generateDefaultScenarioFlags(count) {
    var defaults = [];
    var i;
    for (i = 0; i < count; i += 1) {
        defaults.push("00");
    }
    return defaults.join(":");
}

function getScenarioFlagStates() {
    var states = [];
    var i;
    var j;
    var def;

    for (i = 0; i < scenarioFlagDefinitions.length; i += 1) {
        def = scenarioFlagDefinitions[i];
        for (j = 0; j < def.states.length; j += 1) {
            if (states.indexOf(def.states[j].hex.toUpperCase()) === -1) {
                states.push(def.states[j].hex.toUpperCase());
            }
        }
    }

    return states;
}

function getScenarioFlags() {
    var visibleFlagText = extractVisibleFlags(lastResponse);
    var parts;
    var i;

    if (!visibleFlagText && scenarioFlagDefinitions.length > 0) {
        return generateDefaultScenarioFlags(scenarioFlagDefinitions.length).split(":");
    }

    if (!visibleFlagText) {
        return null;
    }

    parts = visibleFlagText.split(":");

    for (i = 0; i < parts.length; i += 1) {
        if (!/^[0-9A-Fa-f]{2}$/.test(parts[i]) || getScenarioFlagStates().length > 0 && getScenarioFlagStates().indexOf(parts[i].toUpperCase()) === -1) {
            return null;
        }
    }

    return parts;
}

function flagMatches(flags, requirements) {
    var key;

    if (!flags || !requirements) {
        return false;
    }

    for (key in requirements) {
        if (requirements.hasOwnProperty(key)) {
            if (!flags[parseInt(key, 10)] || flags[parseInt(key, 10)].toUpperCase() !== requirements[key].toUpperCase()) {
                return false;
            }
        }
    }

    return true;
}

function forbiddenFlagMatches(flags, requirements) {
    var key;

    if (!flags || !requirements) {
        return false;
    }

    for (key in requirements) {
        if (requirements.hasOwnProperty(key)) {
            if (flags[parseInt(key, 10)] && flags[parseInt(key, 10)].toUpperCase() === requirements[key].toUpperCase()) {
                return true;
            }
        }
    }

    return false;
}

function getAntiOmniscienceInstructions(responseText) {
    var flags = getScenarioFlags();
    var i;
    var node;
    var text;

    if (!FEATURES.ANTI_OMNISCIENCE || scenarioContentNodes.length === 0) {
        return "";
    }

    if (!flags) {
        return "\n\n[SCENARIO SECRETS]\nScenario flags are unresolved. Treat SURV 0A, SURV 0B, and SECRET 0A as locked until visible status or scene evidence supports them.\n";
    }

    for (i = 0; i < scenarioContentNodes.length; i += 1) {
        node = scenarioContentNodes[i];
        if (!timeDelayContentMatches(node, responseText)) {
            continue;
        }
        if (!flagMatches(flags, node.requiredFlags) || forbiddenFlagMatches(flags, node.forbiddenFlags)) {
            continue;
        }
        text = node.full || node.summary || node.bullet || "";
        if (text && text.indexOf(getSourcePrefix(node, "SEC")) === -1) {
            text = getSourcePrefix(node, "SEC") + text;
        }
        return "\n\n[SCENARIO SECRETS]\n" + text + "\n";
    }

    return "\n\n[SCENARIO SECRETS]\nAll gated secrets remain locked. Do not reveal SURV 0A, SURV 0B, or SECRET 0A without visible status support.\n";
}

function conditionListMatches(list, responseText) {
    var lowerResponse;
    var i;

    if (!list || list.length === 0) {
        return false;
    }

    lowerResponse = responseText.toLowerCase();

    for (i = 0; i < list.length; i += 1) {
        if (lowerResponse.indexOf(String(list[i]).toLowerCase()) !== -1) {
            return true;
        }
    }

    return false;
}

function conditionListAllMatch(list, responseText) {
    var lowerResponse;
    var i;

    if (!list || list.length === 0) {
        return true;
    }

    lowerResponse = responseText.toLowerCase();

    for (i = 0; i < list.length; i += 1) {
        if (lowerResponse.indexOf(String(list[i]).toLowerCase()) === -1) {
            return false;
        }
    }

    return true;
}

function timeDelayNodeWithinWindow(node) {
    var timeline = getTimelineIndex();
    var canon = getCanonCount();

    if (typeof node.minHour === "number" && timeline !== null && timeline < node.minHour) {
        return false;
    }
    if (typeof node.maxHour === "number" && timeline !== null && timeline > node.maxHour) {
        return false;
    }
    if (typeof node.minCanon === "number" && canon !== null && canon < node.minCanon) {
        return false;
    }
    if (typeof node.maxCanon === "number" && canon !== null && canon > node.maxCanon) {
        return false;
    }
    if (typeof node.minMessages === "number" && messageCount < node.minMessages) {
        return false;
    }
    if (typeof node.maxMessages === "number" && messageCount > node.maxMessages) {
        return false;
    }

    return true;
}

function timeDelayContentMatches(node, responseText) {
    var keywords = node.keywords || [];
    var hiddenCondition = node.hiddenCondition;

    if (!timeDelayNodeWithinWindow(node)) {
        return false;
    }

    if (keywords.length === 0) {
        return true;
    }

    if (hiddenCondition && typeof hiddenCondition === "function") {
        return hiddenCondition(responseText);
    }

    return conditionListMatches(keywords, responseText);
}

function applyAntiOmniscienceContent(responseText) {
    var instructions = getAntiOmniscienceInstructions(responseText);
    if (instructions) {
        appendIfMissing("scenario", instructions);
    }
}

function applyTimeDelayInstructions() {
    var lines;

    if (!FEATURES.TIME_DELAY) {
        return;
    }

    lines = [
        "\n\n[TIME DELAY REQUIREMENTS]",
        "When timeline pacing is active, include **Hour:** N and **Canon Count:** N in the status block.",
        "Use [CANON] only for unlocked timeline facts.",
        "Keep hidden clues locked until flags or scene evidence support them."
    ];

    appendIfMissing("scenario", lines.join("\n"));
}

function applyTimeDelayCanon(responseText) {
    var activationData = [];
    var i;
    var node;
    var detailLevel;
    var text;
    var usedTokens = 0;
    var budget;

    if (!FEATURES.TIME_DELAY || timeDelayCanonDatabase.length === 0) {
        return;
    }

    budget = Math.min(getPerScriptBudget(), SCENARIO_CONFIG.MAX_TIME_DELAY_TOKENS);

    for (i = 0; i < timeDelayCanonDatabase.length; i += 1) {
        node = timeDelayCanonDatabase[i];
        if (!timeDelayContentMatches(node, responseText)) {
            continue;
        }

        detailLevel = node.importance >= 12 ? "full" : node.importance >= 8 ? "summary" : "bullet";
        text = node[detailLevel] || node.summary || node.bullet || node.full || "";
        if (text && text.indexOf(getSourcePrefix(node, "CAN")) === -1) {
            text = getSourcePrefix(node, "CAN") + text;
        }

        if (usedTokens + estimateTokens(text) > budget) {
            break;
        }

        appendIfMissing("scenario", text);
        usedTokens += estimateTokens(text);
        activationData.push(node.id);
    }

    if (FEATURES.DEBUG_MODE && activationData.length > 0) {
        appendIfMissing("scenario", " [SCENARIO DEBUG] Canon activated: " + activationData.join(", "));
    }
}

function entityMatches(entity, responseText) {
    var names = entity.names || [];
    var keywords = entity.keywords || [];
    var combined = names.concat(keywords);
    return combined.length > 0 && countMentions(combined, responseText) > 0;
}

function applyTimeDelayEntities(responseText) {
    var i;
    var entity;
    var text;
    var usedTokens = 0;
    var budget;

    if (!FEATURES.TIME_DELAY || timeDelayEntityDatabase.length === 0) {
        return;
    }

    budget = Math.min(getPerScriptBudget(), 220);

    for (i = 0; i < timeDelayEntityDatabase.length; i += 1) {
        entity = timeDelayEntityDatabase[i];
        if (!entityMatches(entity, responseText)) {
            continue;
        }

        text = entity.full || entity.summary || entity.bullet || "";
        if (text && text.indexOf(getSourcePrefix(entity, "NPC")) === -1) {
            text = getSourcePrefix(entity, "NPC") + text;
        }

        if (usedTokens + estimateTokens(text) > budget) {
            break;
        }

        appendIfMissing("scenario", text);
        appendIfMissing("personality", entity.personality || "");
        appendIfMissing("example_dialogs", entity.exampleDialogs || "");
        usedTokens += estimateTokens(text);
    }
}

function applyTimeDelayConditionalEvents(responseText) {
    var i;
    var event;
    var text;

    if (!FEATURES.TIME_DELAY || timeDelayConditionalEvents.length === 0) {
        return;
    }

    for (i = 0; i < timeDelayConditionalEvents.length; i += 1) {
        event = timeDelayConditionalEvents[i];
        if (!conditionListMatches(event.requiresAny, responseText)) {
            continue;
        }
        if (!conditionListAllMatch(event.requiresAll, responseText)) {
            continue;
        }
        if (conditionListMatches(event.notWith, responseText)) {
            continue;
        }
        if (typeof event.minHour === "number" && getTimelineIndex() !== null && getTimelineIndex() < event.minHour) {
            continue;
        }
        if (typeof event.minCanon === "number" && getCanonCount() !== null && getCanonCount() < event.minCanon) {
            continue;
        }
        if (typeof event.minMessages === "number" && messageCount < event.minMessages) {
            continue;
        }
        if (typeof event.maxMessages === "number" && messageCount > event.maxMessages) {
            continue;
        }

        text = event.scenario || "";
        if (text && text.indexOf(getSourcePrefix(event, "CAN")) === -1) {
            text = getSourcePrefix(event, "CAN") + text;
        }
        appendIfMissing("scenario", text);
    }
}

function applyScenarioDebug() {
    var flags;

    if (!FEATURES.DEBUG_MODE) {
        return;
    }

    flags = getScenarioFlags();
    appendIfMissing("scenario", "\n\n[SCENARIO DEBUG]\nTwinXFamily runtime active. Flags: " + (flags ? flags.join(":") : "unresolved") + ". NPC database: " + npcDatabase.length + ". Simple NPC fallback: " + simpleNpcDatabase.length + ".\n");
}

var responseText = getRecentText();

applyTwinResolutionAuthority();
applyNpcCoreInstructions();
applyScenarioFlagInstructions();
applyNpcDatabase(responseText);
applySimpleNpcFallback(responseText);
applyRelationshipDatabase(responseText);
applyAntiOmniscienceContent(responseText);
applyTimeDelayInstructions();
applyTimeDelayCanon(responseText);
applyTimeDelayEntities(responseText);
applyTimeDelayConditionalEvents(responseText);
applyScenarioDebug();
