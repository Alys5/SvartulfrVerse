/**
 * SVARTULFRVERSE WORLD SCRIPT - URBAN
 *
 * MacroCosmo lorebook for Urban / Solarton 2024.
 * Integrates ModernFantasy2024 Active, Cultural, Historical, and approved Canon decisions.
 * Candidate and Deferred material is intentionally excluded from runtime activation.
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

const WORLD_METADATA = {
    worldId: "urban_solarton_2024",
    displayName: "Urban",
    setting: "Solarton 2024",
    genre: "supernatural urban fantasy / Grimm style",
    rules: "Monster University, demi-human, werewolves, vampires, succubi, Vax, Lamia, pack authority, and civic order in Solarton.",
    sourceBase: "3_World/Urban/",
    rootFolder: "3_World/Urban/"
};

const WORLD_CONFIG = {
    MAX_TOKENS: 1200,
    MENTION_SCAN_DEPTH: 8,
    MAX_ACTIVE_ENTRIES: 16,
    DEFAULT_PRIORITY: 10,
    DEFAULT_IMPORTANCE: 10.0,
    DEBUG: false
};

const WORLD_DATA = {
    locations: [],
    organizations: [],
    cultures: [],
    history: [],
    timeline: [],
    characters: [],
    secrets: [],
    custom: []
};

let loreEntries = [];
let timelineEvents = [];
let statReactions = [];
let activatedWorldEntryIds = [];

function appendIfMissing(field, text) {
    if (!text) {
        return;
    }
    if (character[field].indexOf(text) === -1) {
        character[field] += text;
    }
}

function normalizeKeywords(keywords) {
    if (!keywords) {
        return [];
    }
    if (typeof keywords === "string") {
        return [keywords];
    }
    return keywords;
}

function registerLoreEntry(entry) {
    if (!entry || !entry.id) {
        return false;
    }

    entry.canonLayer = entry.canonLayer || "CANDIDATE";
    entry.source = entry.source || WORLD_METADATA.sourceBase + entry.id + ".md";
    entry.keywords = normalizeKeywords(entry.keywords);
    entry.priority = typeof entry.priority === "number" ? entry.priority : WORLD_CONFIG.DEFAULT_PRIORITY;
    entry.importance = typeof entry.importance === "number" ? entry.importance : WORLD_CONFIG.DEFAULT_IMPORTANCE;

    if (loreEntries.length === 0 || entry.id !== loreEntries[loreEntries.length - 1].id) {
        loreEntries.push(entry);
        WORLD_DATA.custom.push({
            type: "lore",
            id: entry.id
        });
    }

    return true;
}

function registerTimelineEvent(event) {
    if (!event || !event.id) {
        return false;
    }

    event.canonLayer = event.canonLayer || "HISTORICAL";
    event.source = event.source || WORLD_METADATA.sourceBase + event.id + ".md";

    timelineEvents.push(event);
    WORLD_DATA.timeline.push(event.id);

    return true;
}

function registerStatReaction(reaction) {
    if (!reaction || !reaction.stat) {
        return false;
    }

    reaction.canonLayer = reaction.canonLayer || "ACTIVE";
    reaction.source = reaction.source || WORLD_METADATA.sourceBase + reaction.stat + ".md";

    statReactions.push(reaction);
    WORLD_DATA.custom.push({
        type: "stat_reaction",
        stat: reaction.stat
    });

    return true;
}

function applyWorldDebug() {
    if (!WORLD_CONFIG.DEBUG) {
        return;
    }

    appendIfMissing("scenario", " [WORLD DEBUG] Urban placeholder loaded. loreEntries: " + loreEntries.length + ", timelineEvents: " + timelineEvents.length + ", statReactions: " + statReactions.length + ".");
}

applyWorldDebug();

function makeEntry(id, category, prefix, keywords, priority, importance, canonLayer, personalityText, scenarioText, bulletText) {
    return {
        id: id,
        category: category,
        prefix: prefix,
        keywords: keywords,
        priority: priority,
        importance: importance,
        source: WORLD_METADATA.sourceBase + "modernfantasy2024/" + id + ".md",
        canonLayer: canonLayer,
        full: {
            personality: personalityText || "",
            scenario: scenarioText || "",
            bullet: bulletText || scenarioText || ""
        },
        summary: {
            personality: "",
            scenario: scenarioText || "",
            bullet: bulletText || scenarioText || ""
        }
    };
}

const URBAN_LORE = [
    makeEntry("solarton_urban_fantasy_integration", "world", "WRD", ["Solarton", "Central California", "urban fantasy", "hidden society", "supernatural integration"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: database/world/urban/modernfantasy2024/solarton_urban_fantasy_integration.md. Solarton is a contemporary coastal city in Central California where humans and supernaturals coexist under visible civic order and hidden pack authority. It is a separate Urban/MacroCosmo branch from LosAngeles2024 / Modern: do not import Los Angeles 2024 human-only family rules, UCLA, DCC, The Verve, or Angel & Co into Solarton unless explicitly crossing timelines.", "Solarton: separate urban-fantasy branch from LosAngeles2024 / Modern."),
    makeEntry("pack_hierarchy_biology", "world", "WRD", ["pack hierarchy", "Enigma", "Alpha", "Delta", "Beta", "Omega", "rank", "pheromones"], 11, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: database/world/urban/modernfantasy2024/pack_hierarchy_biology.md. Pack hierarchy is Enigma > Alpha > Delta > Beta > Omega. Do not assign rank to the user unless established.", "Pack hierarchy: Enigma > Alpha > Delta > Beta > Omega; user rank is not assigned by default."),
    makeEntry("pureblood_werewolf_physiology", "world", "WRD", ["pureblood werewolf", "wolf ears", "prehensile tail", "shift", "slow aging", "pheromones"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: database/world/urban/modernfantasy2024/pureblood_werewolf_physiology.md. Pureblood Douglas-Bloodmoon werewolves carry wolf ears, a prehensile tail, shift forms, slow aging after first shift, rank-linked pheromones, and silver vulnerability.", "Pureblood werewolves: ears, tail, shift, slow aging, pheromones, silver weakness."),
    makeEntry("moonstone_bracelet_surveillance", "world", "WRD", ["Moonstone bracelet", "moonstone", "biometric bracelet", "stress spike", "surveillance", "tracker"], 8, 8.0, "ACTIVE", "", " [ACTIVE] WRD Source: database/world/urban/modernfantasy2024/moonstone_bracelet_surveillance.md. The Moonstone bracelet exists only when the user persona establishes the character as female. It alerts the pack to heart-rate or stress spikes as surveillance framed as protection.", "Moonstone bracelet is conditional, female-persona only, and surveillance framed as protection."),
    makeEntry("howl_code_and_pack_thread", "world", "WRD", ["howl-code", "pack thread", "bond-channel", "ward-channel", "private channel", "circle"], 7, 7.0, "ACTIVE", "", " [ACTIVE] WRD Source: database/world/urban/modernfantasy2024/howl_code_and_pack_thread.md. The pack uses private howl-code and pack-thread channels for terse tactical communication, emotional escalation, and coordinated protection.", "Howl-code and pack thread are private pack channels for tactics and protection."),
    makeEntry("twin_link", "world", "WRD", ["Twin Link", "twin", "Jasper twin", "emotional bleed", "shared panic"], 7, 7.0, "ACTIVE", "", " [ACTIVE] WRD Source: database/world/urban/modernfantasy2024/twin_link.md. Twin Link is active only if the user is Jasper's twin. It allows emotional leakage, shared panic, and coordinated mischief; do not assume it otherwise.", "Twin Link is conditional on the user being Jasper's twin."),
    makeEntry("silver_weakness", "world", "WRD", ["silver", "silver burns", "werewolf weakness"], 7, 7.0, "ACTIVE", "", " [ACTIVE] WRD Source: database/world/urban/modernfantasy2024/silver_weakness.md. Silver causes severe burns to werewolves and is a serious physical threat.", "Silver causes severe burns to werewolves."),
    makeEntry("user_agency_rule", "world", "WRD", ["user agency", "do not speak for user", "pronouns", "rank", "gender", "body", "Omega", "White Moon"], 11, 11.0, "ACTIVE", "", " [ACTIVE] WRD Source: database/world/urban/modernfantasy2024/user_agency_rule.md. Do not invent the user's sex, gender, pronouns, rank, body, personality, Moonstone status, White Moon status, or Omega physiology.", "Never invent the user's identity, body, rank, pronouns, or physiology."),
    makeEntry("nixara_death", "lore", "LOR", ["Nixara", "death", "childbirth", "Erik trauma", "mother"], 9, 9.0, "HISTORICAL", "", " [HISTORICAL] LOR Source: database/world/urban/modernfantasy2024/nixara_death.md. Nixara died in childbirth; this is the foundational wound behind Erik's trauma and extreme protection.", "Nixara's death in childbirth is historical, not an active scene."),
    makeEntry("rogue_mc_territorial_pressure", "lore", "LOR", ["Rogue MC", "Silver Bullets", "territorial pressure", "lockdown"], 7, 7.0, "HISTORICAL", "", " [HISTORICAL] LOR Source: database/world/urban/modernfantasy2024/rogue_mc_territorial_pressure.md. Past Silver Bullets pressure justifies security habits and lockdown instincts but is not always an active threat.", "Past Silver Bullets pressure explains security culture."),
    makeEntry("blood_moon_festival", "lore", "LOR", ["Blood Moon Festival", "Blackwood", "dominance challenges", "pack law"], 8, 8.0, "CULTURAL", "", " [CULTURAL] LOR Source: database/world/urban/modernfantasy2024/blood_moon_festival.md. Blood Moon Festival is a quinquennial Blackwood ritual with dominance displays and pack law; activate only when culturally relevant.", "Blood Moon Festival is cultural tradition, not always active."),
    makeEntry("full_moon_market", "lore", "LOR", ["Full Moon Market", "Solarton Square", "talisman", "lanterns", "social mixing"], 6, 6.0, "CULTURAL", "", " [CULTURAL] LOR Source: database/world/urban/modernfantasy2024/full_moon_market.md. Full Moon Market is a monthly Solarton Square market with talismans, lanterns, and watched social mixing.", "Full Moon Market is a cultural market event."),
    makeEntry("fenrir_bloodline_myth", "lore", "LOR", ["Fenrir", "Bloodmoon myth", "primordial wolf", "bloodline"], 6, 6.0, "CULTURAL", "", " [CULTURAL] LOR Source: database/world/urban/modernfantasy2024/fenrir_bloodline_myth.md. Fenrir Bloodline Myth is a Bloodmoon origin myth, not an objective active fact unless verified in-scene.", "Fenrir myth is cultural rumor unless verified."),
    makeEntry("solarton", "location", "LOC", ["Solarton", "coastal city", "Central California"], 10, 10.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/solarton.md. Solarton is elegant, dangerous, watched, and socially stratified.", "Solarton: elegant, dangerous, watched, stratified."),
    makeEntry("douglas_estate", "location", "LOC", ["Douglas Estate", "compound", "biometric surveillance", "family compound"], 10, 10.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/douglas_estate.md. Douglas Estate is a luxury compound with biometric surveillance, family warmth, and claustrophobic control.", "Douglas Estate: luxury, warmth, surveillance, control."),
    makeEntry("succ_campus", "location", "LOC", ["SUCC Campus", "Supernatural University", "mixed campus", "pack security"], 10, 10.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/succ_campus.md. SUCC Campus is a mixed human/supernatural university with fragile truce, social pressure, and pack security.", "SUCC Campus: mixed human/supernatural university with fragile truce."),
    makeEntry("blackwood_forest", "location", "LOC", ["Blackwood Forest", "ritual forest", "Blood Moon", "pack law"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/blackwood_forest.md. Blackwood Forest is the ritual space for Blood Moon, dominance displays, and old pack law.", "Blackwood Forest: ritual space and old pack law."),
    makeEntry("the_verve", "location", "LOC", ["The Verve", "Logan", "safe haven", "decompression", "intelligence"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/the_verve.md. The Verve is Logan's club, a neutral decompression zone and intelligence node outside estate control.", "The Verve: Logan's neutral refuge and intelligence hub."),
    makeEntry("douglas_bloodmoon_pack", "organization", "ORG", ["Douglas-Bloodmoon Pack", "pack", "bloodline", "corporate", "ancestral law"], 11, 11.0, "ACTIVE", "", " [ACTIVE] ORG Source: database/world/urban/modernfantasy2024/douglas_bloodmoon_pack.md. Douglas-Bloodmoon Pack is the dominant faction: corporate wealth, ancestral law, biometric security, and extreme family protection.", "Douglas-Bloodmoon Pack: dominant faction with corporate wealth and ancestral law."),
    makeEntry("douglas_bloodmoon_core_lineage", "family", "FAM", ["Douglas-Bloodmoon lineage", "Erik", "Nixara", "Wulfnic", "Malachia", "Noah", "Jasper", "Alyssa", "Logan"], 11, 11.0, "ACTIVE", "", " [ACTIVE] FAM Source: database/world/urban/modernfantasy2024/douglas_bloodmoon_core_lineage.md. Core lineage centers Erik, Nixara, Wulfnic, Malachia, Noah, Jasper, Alyssa or player-defined heir, and Logan.", "Core lineage: Erik, Nixara, Wulfnic, Malachia, Noah, Jasper, Alyssa/player heir, Logan."),
    makeEntry("malachia_douglas_bloodmoon", "npc", "NPC", ["Malachia", "The Wall", "Alpha", "eldest brother", "guardian"], 10, 10.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/malachia_douglas_bloodmoon.md. Malachia Douglas-Bloodmoon is The Wall: Alpha, eldest brother, heavyweight protector, and physical perimeter.", "Malachia: The Wall, Alpha, eldest brother, physical guardian."),
    makeEntry("noah_douglas_bloodmoon", "npc", "NPC", ["Noah", "Velvet Glove", "Delta", "lawyer", "diplomat"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/noah_douglas_bloodmoon.md. Noah Douglas-Bloodmoon is Velvet Glove: Delta, lawyer, diplomat, and public-story architect.", "Noah: Velvet Glove, Delta, lawyer, diplomat."),
    makeEntry("jasper_douglas_bloodmoon", "npc", "NPC", ["Jasper", "hacker", "DJ", "rebel", "twin"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/jasper_douglas_bloodmoon.md. Jasper Douglas-Bloodmoon is a rebel hacker/DJ and twin only if the user establishes the twin contract.", "Jasper: rebel hacker/DJ, twin only by user-established contract."),
    makeEntry("wulfnic_bloodmoon", "npc", "NPC", ["Wulfnic", "Ancient One", "Enigma", "patriarch"], 10, 10.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/wulfnic_bloodmoon.md. Wulfnic Bloodmoon is the Enigma patriarch and Ancient One, keeper of memory and old law.", "Wulfnic: Enigma patriarch and Ancient One."),
    makeEntry("erik_douglas", "npc", "NPC", ["Erik", "CEO", "Alpha", "father", "surveillance"], 10, 10.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/erik_douglas.md. Erik Douglas is CEO Alpha, father, and source of biometric surveillance framed as protection.", "Erik: CEO Alpha, father, surveillance architect."),
    makeEntry("logan_douglas", "npc", "NPC", ["Logan", "uncle", "The Verve", "safe harbor"], 8, 8.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/logan_douglas.md. Logan Douglas is the safe-harbor uncle and owner of The Verve.", "Logan: safe-harbor uncle and owner of The Verve."),
    makeEntry("scarlett", "npc", "NPC", ["Scarlett", "succubus", "best friend", "emotional anchor"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/scarlett.md. Scarlett is a succubus best friend and emotional anchor.", "Scarlett: succubus best friend and emotional anchor."),
    makeEntry("visconte_angelo_moreno", "npc", "NPC", ["Angel Moreno", "Visconte Angelo Moreno", "vampire lord", "fashion patron"], 7, 7.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/visconte_angelo_moreno.md. Visconte Angelo Moreno, also known as Angel Moreno, is a vampire lord and fashion patron.", "Angel Moreno: vampire lord and fashion patron."),
    makeEntry("zeera", "npc", "NPC", ["Zeera", "Vax", "broker", "faction leader"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/zeera.md. Zeera is a rare Vax broker and faction leader.", "Zeera: Vax broker and faction leader."),
    makeEntry("pureblood_werewolf_species", "species", "BST", ["Pureblood Werewolf", "werewolf species", "Douglas-Bloodmoon"], 10, 10.0, "ACTIVE", "", " [ACTIVE] BST Source: database/world/urban/modernfantasy2024/pureblood_werewolf_species.md. Pureblood werewolf is the central species of the dossier.", "Pureblood werewolf is the central species."),
    makeEntry("succubus_species", "species", "BST", ["Succubus", "succubus species", "Scarlett"], 4, 4.0, "ACTIVE", "", " [ACTIVE] BST Source: database/world/urban/modernfantasy2024/succubus_species.md. Succubus is an active supernatural species represented by Scarlett.", "Succubus species represented by Scarlett."),
    makeEntry("vampire_species", "species", "BST", ["Vampire", "vampire species", "VUA", "districts"], 5, 5.0, "ACTIVE", "", " [ACTIVE] BST Source: database/world/urban/modernfantasy2024/vampire_species.md. Vampire is a political supernatural species with districts and social institutions.", "Vampire species has districts and social institutions."),
    makeEntry("vax_species", "species", "BST", ["Vax", "rare species", "Zeera"], 4, 4.0, "ACTIVE", "", " [ACTIVE] BST Source: database/world/urban/modernfantasy2024/vax_species.md. Vax is a rare species represented by Zeera.", "Vax is a rare species represented by Zeera."),
    makeEntry("lamia_species", "species", "BST", ["Lamia", "Sierra SiSi", "fashion PR"], 4, 4.0, "ACTIVE", "", " [ACTIVE] BST Source: database/world/urban/modernfantasy2024/lamia_species.md. Lamia is an active species represented by Sierra SiSi.", "Lamia species represented by Sierra SiSi."),
    makeEntry("seven_hills_district", "location", "LOC", ["Seven Hills District", "Douglas territory", "ancestral territory", "patrolled"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/seven_hills_district.md. Seven Hills District is ancestral Douglas territory: wooded, strategic, and patrolled.", "Seven Hills District: ancestral Douglas territory, wooded and patrolled."),
    makeEntry("arcadia_district", "location", "LOC", ["Arcadia District", "SUCC", "Vairë Clinic"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/arcadia_district.md. Arcadia District contains SUCC and Vairë Clinic; Vairë details remain deferred unless activated.", "Arcadia District: SUCC and Vairë Clinic, with deferred Vairë details."),
    makeEntry("uptown_solarton", "location", "LOC", ["Uptown Solarton", "finance", "vampire power"], 6, 6.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/uptown_solarton.md. Uptown Solarton is the financial and vampire power district.", "Uptown Solarton: finance and vampire power."),
    makeEntry("paradise_district", "location", "LOC", ["Paradise District", "fashion", "luxury", "Bianca Rossi", "Dominic Chen"], 5, 5.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/paradise_district.md. Paradise District is the fashion and luxury arena shaped by Bianca Rossi and Dominic Chen.", "Paradise District: fashion, luxury, Bianca Rossi, Dominic Chen."),
    makeEntry("oldtown_solarton", "location", "LOC", ["Oldtown Solarton", "Marcus", "Mark O'Connor", "controller"], 4, 4.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/oldtown_solarton.md. Oldtown Solarton is the historic center under Marcus/Mark O'Connor, distinct from Marcus Vanguard until confirmed.", "Oldtown Solarton: historic center under Marcus/Mark O'Connor."),
    makeEntry("dockside_solarton", "location", "LOC", ["Dockside Solarton", "port", "logistics", "Isobel Blackwater"], 4, 4.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/dockside_solarton.md. Dockside Solarton is the port and logistics zone under Isobel Blackwater.", "Dockside Solarton: port and logistics under Isobel Blackwater."),
    makeEntry("ironworks_solarton", "location", "LOC", ["Ironworks Solarton", "industrial", "Vito", "Scar Marino"], 4, 4.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/ironworks_solarton.md. Ironworks Solarton is the industrial area under Vito 'Scar' Marino.", "Ironworks Solarton: industrial zone under Vito 'Scar' Marino."),
    makeEntry("cums", "location", "ORG", ["CUMS", "rival university", "supernatural-only"], 5, 5.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/cums.md. CUMS is a supernatural-only rival university and pressure point against SUCC.", "CUMS: supernatural-only rival university."),
    makeEntry("bricklane_mall", "location", "LOC", ["Bricklane Mall", "Angel & Co", "Demonic Dolls"], 4, 4.0, "ACTIVE", "", " [ACTIVE] LOC Source: database/world/urban/modernfantasy2024/bricklane_mall.md. Bricklane Mall is a commercial node with Angel & Co and Demonic Dolls.", "Bricklane Mall: commercial node with Angel & Co and Demonic Dolls."),
    makeEntry("solarton_congregation", "organization", "ORG", ["Solarton Congregation", "lupine", "affiliates", "solitaries"], 7, 7.0, "ACTIVE", "", " [ACTIVE] ORG Source: database/world/urban/modernfantasy2024/solarton_congregation.md. Solarton Congregation is the broader lupine structure with affiliates and solitaries.", "Solarton Congregation: broader lupine structure."),
    makeEntry("vanguard_security", "organization", "ORG", ["Vanguard Security", "escort", "perimeter", "extraction", "protection"], 8, 8.0, "ACTIVE", "", " [ACTIVE] ORG Source: database/world/urban/modernfantasy2024/vanguard_security.md. Vanguard Security is the operational arm for escort, perimeter, extraction, and physical protection.", "Vanguard Security: escort, perimeter, extraction, protection."),
    makeEntry("silver_bullets_mc", "organization", "ORG", ["Silver Bullets", "rogue MC", "territorial threat"], 7, 7.0, "ACTIVE", "", " [ACTIVE] ORG Source: database/world/urban/modernfantasy2024/silver_bullets_mc.md. Silver Bullets MC is a rogue motorcycle club near pack territory and a historical pressure source.", "Silver Bullets MC: rogue MC and historical pressure source."),
    makeEntry("succ_student_body", "organization", "ORG", ["SUCC Student Body", "student body", "mixed campus"], 6, 6.0, "ACTIVE", "", " [ACTIVE] ORG Source: database/world/urban/modernfantasy2024/succ_student_body.md. SUCC Student Body is the mixed human/supernatural student population under fragile truce.", "SUCC Student Body: mixed campus under fragile truce."),
    makeEntry("angel_and_co", "organization", "ORG", ["Angel&Co", "Angel Moreno", "fashion patronage", "secret modeling"], 6, 6.0, "ACTIVE", "", " [ACTIVE] ORG Source: database/world/urban/modernfantasy2024/angel_and_co.md. Angel&Co is a fashion and patronage network linked to Angel Moreno and secret modeling.", "Angel&Co: fashion patronage and secret modeling."),
    makeEntry("vua", "organization", "ORG", ["VUA", "Vampire Undead Association", "Vincent Campbell"], 5, 5.0, "ACTIVE", "", " [ACTIVE] ORG Source: database/world/urban/modernfantasy2024/vua.md. VUA is the Vampire/Undead Association with formal political weight.", "VUA: Vampire/Undead Association."),
    makeEntry("sentinels", "organization", "ORG", ["Sentinels", "military guardians", "Seven Hills Pack"], 6, 6.0, "ACTIVE", "", " [ACTIVE] ORG Source: database/world/urban/modernfantasy2024/sentinels.md. Sentinels are military guardians of Seven Hills Pack and the Douglas bloodline.", "Sentinels: military guardians of Seven Hills Pack."),
    makeEntry("ballantine_faction", "organization", "ORG", ["Ballantine Faction", "corporate rival", "underworld", "shadow war"], 7, 7.0, "ACTIVE", "", " [ACTIVE] ORG Source: database/world/urban/modernfantasy2024/ballantine_faction.md. Ballantine Faction is a corporate/underworld rival applying shadow-war pressure.", "Ballantine Faction: corporate/underworld rival."),
    makeEntry("marcus_vanguard_lieutenant", "npc", "NPC", ["Marcus Vanguard", "lieutenant", "bodyguard"], 7, 7.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/marcus_vanguard_lieutenant.md. Marcus Vanguard Lieutenant is a bodyguard and must remain distinct from Marcus/Mark O'Connor.", "Marcus Vanguard Lieutenant is distinct from Marcus/Mark O'Connor."),
    makeEntry("prof_helena_weiss", "npc", "NPC", ["Helena Weiss", "professor", "Alpha", "psionic", "SUCC mentor"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/prof_helena_weiss.md. Prof. Helena Weiss is an Alpha psionic mentor at SUCC.", "Prof. Helena Weiss: Alpha psionic mentor."),
    makeEntry("vincent_campbell", "npc", "NPC", ["Vincent Campbell", "VUA", "vice president"], 5, 5.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/vincent_campbell.md. Vincent Campbell is vice president of VUA.", "Vincent Campbell: VUA vice president."),
    makeEntry("bianca_rossi", "npc", "NPC", ["Bianca Rossi", "Alpha Paradise East"], 5, 5.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/bianca_rossi.md. Bianca Rossi is Alpha Paradise East.", "Bianca Rossi: Alpha Paradise East."),
    makeEntry("elena_ravencrest", "npc", "NPC", ["Elena Ravencrest", "pack enforcer"], 5, 5.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/elena_ravencrest.md. Elena Ravencrest is a pack enforcer.", "Elena Ravencrest: pack enforcer."),
    makeEntry("dr_silas_moonwhisper", "npc", "NPC", ["Silas Moonwhisper", "pack healer"], 5, 5.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/dr_silas_moonwhisper.md. Dr. Silas Moonwhisper is the pack healer.", "Dr. Silas Moonwhisper: pack healer."),
    makeEntry("federico_riki_savini", "npc", "NPC", ["Federico Riki Savini", "solitary spokesperson"], 5, 5.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/federico_riki_savini.md. Federico Riki Savini is a solitari spokesperson.", "Federico Riki Savini: solitari spokesperson."),
    makeEntry("dominic_chen", "npc", "NPC", ["Dominic Chen", "Alpha Paradise West"], 5, 5.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/dominic_chen.md. Dominic Chen is Alpha Paradise West.", "Dominic Chen: Alpha Paradise West."),
    makeEntry("darius_vale", "npc", "NPC", ["Darius Vale", "shadow protector"], 5, 5.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/darius_vale.md. Darius Vale is a shadow protector.", "Darius Vale: shadow protector."),
    makeEntry("jake_jacobus_draconarius", "npc", "NPC", ["Jake Jacobus Draconarius", "Sentinel", "ancient guardian"], 6, 6.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/jake_jacobus_draconarius.md. Jake Jacobus Draconarius is an ancient Sentinel guardian.", "Jake Jacobus Draconarius: ancient Sentinel guardian."),
    makeEntry("dr_elena_cross", "npc", "NPC", ["Elena Cross", "neuropsychiatrist", "mentor"], 4, 4.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/dr_elena_cross.md. Dr. Elena Cross is a neuropsychiatrist mentor.", "Dr. Elena Cross: neuropsychiatrist mentor."),
    makeEntry("kai_shade_nakamura", "npc", "NPC", ["Kai Shade Nakamura", "spirit hunter", "rival"], 4, 4.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/kai_shade_nakamura.md. Kai Shade Nakamura is a spirit hunter rival.", "Kai Shade Nakamura: spirit hunter rival."),
    makeEntry("talia_grimwood", "npc", "NPC", ["Talia Grimwood", "vampire confidante"], 4, 4.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/talia_grimwood.md. Talia Grimwood is a vampire confidante.", "Talia Grimwood: vampire confidante."),
    makeEntry("sierra_sisi", "npc", "NPC", ["Sierra SiSi", "Lamia", "fashion PR", "Angel&Co stylist"], 4, 4.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/sierra_sisi.md. Sierra SiSi is a Lamia fashion PR and Angel&Co stylist.", "Sierra SiSi: Lamia fashion PR and Angel&Co stylist."),
    makeEntry("isobel_blackwater", "npc", "NPC", ["Isobel Blackwater", "Dockside", "controller"], 3, 3.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/isobel_blackwater.md. Isobel Blackwater controls Dockside.", "Isobel Blackwater: Dockside controller."),
    makeEntry("vito_scar_marino", "npc", "NPC", ["Vito Scar Marino", "Ironworks", "controller"], 3, 3.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/vito_scar_marino.md. Vito 'Scar' Marino controls Ironworks.", "Vito 'Scar' Marino: Ironworks controller."),
    makeEntry("marcus_mark_oconnor", "npc", "NPC", ["Marcus Mark O'Connor", "Oldtown", "controller"], 3, 3.0, "ACTIVE", "", " [ACTIVE] NPC Source: database/world/urban/modernfantasy2024/marcus_mark_oconnor.md. Marcus/Mark O'Connor controls Oldtown and is distinct from Marcus Vanguard until confirmed.", "Marcus/Mark O'Connor: Oldtown controller, distinct from Marcus Vanguard."),
    makeEntry("solarton_underground_forum", "organization", "ORG", ["Solarton Underground Forum", "gossip", "bets", "social pressure"], 4, 4.0, "CULTURAL", "", " [CULTURAL] ORG Source: database/world/urban/modernfantasy2024/solarton_underground_forum.md. Solarton Underground Forum is a secret digital forum for gossip, bets, and social pressure; treat as cultural infrastructure unless activated.", "Solarton Underground Forum: gossip and social pressure forum."),
    makeEntry("bulls_boob_bracket_2025", "lore", "LOR", ["Bulls Boob Bracket", "campus rumor", "Angel&Co", "SuccBook"], 3, 3.0, "CULTURAL", "", " [CULTURAL] LOR Source: database/world/urban/modernfantasy2024/bulls_boob_bracket_2025.md. Bulls Boob Bracket 2025 is campus/social rumor tied to Angel&Co and SuccBook, not a stable event.", "Bulls Boob Bracket 2025 is campus rumor, not stable fact."),
    makeEntry("jared", "npc", "NPC", ["Jared", "SUCC Bulls", "minor player", "rumor chain"], 2, 2.0, "CULTURAL", "", " [CULTURAL] NPC Source: database/world/urban/modernfantasy2024/jared.md. Jared is a minor SUCC Bulls player in the rumor chain.", "Jared: minor SUCC Bulls rumor-chain player."),
    makeEntry("lilith_noir", "npc", "NPC", ["Lilith Noir", "vampire influencer", "rumor chain"], 2, 2.0, "CULTURAL", "", " [CULTURAL] NPC Source: database/world/urban/modernfantasy2024/lilith_noir.md. Lilith Noir is a vampire influencer in the rumor chain.", "Lilith Noir: vampire influencer rumor-chain figure.")
];

URBAN_LORE.forEach(function (entry) {
    registerLoreEntry(entry);
});

// SCRIPT END
