/**
 * SVARTULFRVERSE WORLD SCRIPT - VIKING
 *
 * MacroCosmo placeholder per Viking / Iceland 827.
 * Questo file è predisposto per l'inserimento dei dati lore, timeline e stat.
 * Compatibile con ES6-safe JanitorAI Scripts API; usa solo context e scope locale.
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
    worldId: "viking_iceland_827",
    displayName: "Viking",
    setting: "Iceland 827",
    genre: "mythic Viking dark fantasy",
    rules: "Iceland 827, Svartúlfr Clan, Járn-Gildi, Seiðr wards, Name-Truth binding, Hálf-Álfar lineage, runic warfare, Iron Keep lockdown, Dovre Pass ambush pattern, Amarantia route.",
    sourceBase: "2_Export/World/Viking/",
    rootFolder: "2_Export/World/Viking/"
};

const WORLD_CONFIG = {
    MAX_TOKENS: 1800,
    MENTION_SCAN_DEPTH: 8,
    MAX_ACTIVE_ENTRIES: 24,
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

    appendIfMissing("scenario", " [WORLD DEBUG] Viking / Iceland 827 loaded. loreEntries: " + loreEntries.length + ", timelineEvents: " + timelineEvents.length + ", statReactions: " + statReactions.length + ".");
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
        source: WORLD_METADATA.sourceBase + "iceland827/" + id + ".md",
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

function keywordMatches(entry, paddedText) {
    var keywords = entry.keywords || [];
    for (var i = 0; i < keywords.length; i += 1) {
        var term = " " + String(keywords[i]).toLowerCase() + " ";
        if (paddedText.indexOf(term) !== -1) {
            return true;
        }
    }
    return false;
}

function applyWorldLore() {
    var chat = context.chat || {};
    var lastMessages = chat.last_messages || [];
    var recent = lastMessages.slice(-WORLD_CONFIG.MENTION_SCAN_DEPTH).map(function (message) {
        return typeof message === "string" ? message : (message.message || "");
    }).join(" ");
    var scan = String(chat.last_message || "") + " " + recent;
    var padded = " " + scan.toLowerCase() + " ";
    var activated = [];
    var i;
    var entry;

    for (i = 0; i < loreEntries.length; i += 1) {
        entry = loreEntries[i];
        if ((entry.canonLayer === "CANDIDATE" || entry.canonLayer === "DEFERRED") || !keywordMatches(entry, padded)) {
            continue;
        }
        activated.push(entry);
    }

    activated.sort(function (a, b) {
        return (b.priority || 0) - (a.priority || 0);
    });

    if (activated.length > WORLD_CONFIG.MAX_ACTIVE_ENTRIES) {
        activated = activated.slice(0, WORLD_CONFIG.MAX_ACTIVE_ENTRIES);
    }

    for (i = 0; i < activated.length; i += 1) {
        entry = activated[i];
        appendIfMissing("scenario", entry.full.scenario || "");
        appendIfMissing("personality", entry.full.personality || "");
    }
}

const ICELAND_827_LORE = [
    makeEntry("iceland827_continuity_boundary", "world", "WRD", ["Iceland827", "Iceland 827", "Viking", "Svartulfr", "Svartúlfr Clan", "Jarn-Gildi", "Járn-Gildi", "Eiriksbarn", "Iron Keep"], 11, 11.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/iceland827/iceland827_continuity_boundary.md. Iceland827 is a mythic Viking dark-fantasy branch set in an 800-900 CE-equivalent Norway/Iceland world of Svartúlfr Clan, Járn-Gildi, Seiðr wards, Name-Truth binding, Hálf-Álfar lineage, runic warfare, and clan oaths. Do not load Modern Los Angeles 2024, Solarton Urban werewolf hierarchy, White Moon, Omega physiology, cybernetics, London1666 merchant politics, or Amarantia555 Guardiani/felivoni/prophecy material unless the user explicitly requests a timeline crossover.", "Iceland827 is mythic Viking dark fantasy, separate from Modern, Urban, London1666, and Amarantia555."),
    makeEntry("amarantia555_continuity_boundary_viking", "world", "WRD", ["Amarantia555", "Amarantia capital", "Guardiani di Amarantia", "Kirel Ajikis", "Nia", "Zefiro", "Antaneone", "Crogiolo", "felivone", "Era della Foglia"], 11, 11.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Fantasy/Amarantia555/Amarantia555_Scenario.md. Amarantia555 is a separate high-fantasy imperial capital with Guardiani magic, felivoni, Kirel's prophecy, Nia's Borgo pressure, Antaneone's bargains, and the Crogiolo. Iceland827's 'Amarantia Route' is only a route-name echo; do not import Guardiani disciplines, Amarantian politeismo, felivoni, or Kirel's prophecy into Iceland827 unless the user explicitly starts a crossover.", "Amarantia555 is separate; the Viking Amarantia Route is only a route-name echo."),
    makeEntry("forbidden_defaults_iceland827", "world", "WRD", ["White Moon", "Omega", "werewolf rank", "Alpha-Omega", "Alpha Jarl", "pack hierarchy", "user rank", "user gender", "user body", "Alyssa Eiriksbarn"], 11, 11.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/iceland827/forbidden_defaults_iceland827.md. Iceland827 forbids default user rank, gender, body, pronouns, White Moon status, Omega physiology, or werewolf hierarchy. Alyssa Eiriksbarn is a dev/test persona candidate and must not overwrite {{user}}; if {{user}} is the Eiriksbarn heir, treat age as nineteen unless the user changes it.", "No White Moon, Omega, user rank, or dev-test persona is imposed by default."),
    makeEntry("mythic_viking_dark_fantasy_order", "world", "WRD", ["mythic Viking", "dark fantasy", "Norse gods", "Norse pantheon", "runic", "saga", "fate", "oath"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/iceland827/mythic_viking_dark_fantasy_order.md. Iceland827 is mythic Viking dark fantasy, not clean historical reenactment: Norse myth is real, oaths have force, fate can press on bloodlines, and power is expressed through clan law, ritual, iron, runes, and cold landscape.", "Mythic Viking dark fantasy: Norse myth, oaths, runes, and fate are real."),
    makeEntry("seidr_ward_system", "world", "WRD", ["Seiðr Ward", "Seidr Ward", "Seiðr wards", "Seidr wards", "runic seal", "ward", "amulet", "surveillance"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/iceland827/seidr_ward_system.md. The Seiðr Ward System is the active protection and surveillance layer around the Eiriksbarn heir: runic seals, ward-amulets, vitals monitoring, mana surveillance, and protocols designed to restrain runaway power. Treat wards as both protection and control.", "Seiðr wards protect and surveil the Eiriksbarn heir."),
    makeEntry("name_truth_binding", "world", "WRD", ["Name-Truth", "Name Truth", "truth of the name", "truth binding", "cannot lie", "truth-bound", "name binding"], 9, 9.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/iceland827/name_truth_binding.md. Name-Truth Binding means the heir cannot freely lie when the truth of the name binds the tongue. Use this as pressure in oaths, interrogations, confessions, and ritual speech, not as permission to force the user's words.", "Name-Truth Binding pressures speech through oath and name magic."),
    makeEntry("mana_conduit_physiology", "world", "WRD", ["Mana Conduit", "mana conduit", "mana", "primordial magic", "magic amplification", "channel magic", "Hálf-Álfar magic"], 9, 9.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/iceland827/mana_conduit_physiology.md. Mana Conduit Physiology means the heir can amplify or channel primordial magic, but at a personal cost: heat, pain, exhaustion, blood, or loss of control. Treat magic as power with consequences, not free spectacle.", "Mana conduit magic is powerful and costly."),
    makeEntry("cold_iron_aversion", "world", "WRD", ["cold iron", "iron burns", "Hálf-Álfar", "Half-Alfar", "iron aversion", "iron restraint"], 8, 8.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/iceland827/cold_iron_aversion.md. Cold iron burns Hálf-Álfar skin and can be used as restraint, threat, or interrogation pressure. It is dangerous material, not a casual prop.", "Cold iron burns Hálf-Álfar skin."),
    makeEntry("half_alfar_lineage", "world", "WRD", ["Hálf-Álfar", "Half-Alfar", "Álfar", "Alfar", "elf blood", "elf lineage", "Ljósálfar", "light elf"], 8, 8.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/iceland827/half_alfar_lineage.md. Hálf-Álfar lineage is the heir's elf/human inheritance. It can imply sensitivity, beauty, magic, and political danger, but it must not impose sex, gender, body, or exact appearance on {{user}}.", "Hálf-Álfar lineage is elf/human inheritance without imposing user appearance."),
    makeEntry("runic_warfare_and_clan_oaths", "world", "WRD", ["runic warfare", "clan oaths", "blood oath", "oath", "rune", "war", "battle", "binding oath"], 8, 8.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/iceland827/runic_warfare_and_clan_oaths.md. Runic warfare and clan oaths make war a sacred, legal, and magical act: runes mark strategy and consequence, oaths bind families, and broken promises create blood debt. Treat combat as oath-weighted, not merely physical.", "Runic warfare and clan oaths bind battle to law and blood."),
    makeEntry("jarl_patriarchal_hierarchy", "world", "WRD", ["Jarl", "patriarchal hierarchy", "jarl hierarchy", "Eirik", "Alrik", "clan hierarchy", "clan authority"], 8, 8.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/iceland827/jarl_patriarchal_hierarchy.md. Jarl Patriarchal Hierarchy places Eirik, Alrik, and senior clan authorities above the heir in law, ritual, and military command. Respect the hierarchy as pressure, but do not erase the heir's agency.", "Jarl hierarchy gives Eirik and Alrik legal, ritual, and military authority."),
    makeEntry("iron_keep_lockdown_protocol", "lore", "LOR", ["Iron Keep lockdown", "Iron Keep", "lockdown", "gates", "Einherjar", "vault", "Magnus barrier"], 10, 10.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/iron_keep_lockdown_protocol.md. Iron Keep Lockdown Protocol seals Álfar-viðr with gates, Einherjar patrols, vault protections, and Magnus as a physical barrier. Use lockdown as confinement, protection, and family panic made architectural.", "Iron Keep lockdown seals the heir inside Álfar-viðr."),
    makeEntry("dovre_pass_ambush_pattern", "lore", "LOR", ["Dovre Pass", "Dovrefjell", "ambush", "slavers", "storm", "ward", "mountain pass"], 9, 9.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/dovre_pass_ambush_pattern.md. Dovre Pass ambushes follow a pattern: storms, blocked paths, slavers, hidden wards, and pressure on the heir's wards. Treat the pass as a dangerous trade route where weather and enemies cooperate.", "Dovre Pass ambushes combine storm, slavers, and wards."),
    makeEntry("guild_chronicles_and_tavern_rumors", "lore", "LOR", ["Guild Chronicles", "tavern rumors", "dispatch", "sealed letters", "Silfr-Mynt", "gilda rumors", "tavern"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/guild_chronicles_and_tavern_rumors.md. Guild Chronicles and Tavern Rumors circulate through dispatches, sealed letters, Járn-Gildi records, and Silfr-Mynt whispers. Use rumors as incomplete intelligence, not omniscient exposition.", "Guild records and tavern rumors carry incomplete intelligence."),
    makeEntry("iron_keep_alfar_vidr", "location", "LOC", ["Iron Keep", "Álfar-viðr", "Alfar-vidr", "Alfarvidr", "keep", "fortress", "rune gates"], 10, 10.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/iceland827/iron_keep_alfar_vidr.md. Iron Keep — Álfar-viðr is the main Svartúlfr Clan and Járn-Gildi stronghold: rune-gated keep, longhall power, vault spaces, ward towers, and surveillance architecture around the heir.", "Iron Keep — Álfar-viðr is the main clan/guild stronghold."),
    makeEntry("njals_private_study", "location", "LOC", ["Njal's Private Study", "Njals Private Study", "Njal's study", "private study", "legal study", "diplomacy room"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/iceland827/njals_private_study.md. Njal's Private Study is a legal/luxury interrogation and diplomacy room: sealed ledgers, soft light, wine, contracts, and controlled conversation. Use it for pressure disguised as courtesy.", "Njal's Study turns diplomacy into interrogation."),
    makeEntry("silfr_mynt_tavern", "location", "LOC", ["Silfr-Mynt", "Silfr Mynt", "tavern", "Amarantia Route", "sanctuary tavern", "gilda tavern"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/iceland827/silfr_mynt_tavern.md. Silfr-Mynt Tavern is a sanctuary on the Amarantia Route: tavern, rumor exchange, temporary shelter, and Leif's softer counterweight to clan discipline.", "Silfr-Mynt is sanctuary and rumor hub on the Amarantia Route."),
    makeEntry("dovre_pass", "location", "LOC", ["Dovre Pass", "Dovrefjell", "mountain pass", "trade route", "storm pass"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/iceland827/dovre_pass.md. Dovre Pass is a dangerous mountain trade route marked by storms, ambushes, hidden wards, and slaver pressure. It is a route of commerce and threat.", "Dovre Pass is a stormy ambush route."),
    makeEntry("alriks_hall", "location", "LOC", ["Alrik's Hall", "Alriks Hall", "Patriarch's Hall", "sacral hall", "Name-Truth", "council hall"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/iceland827/alriks_hall.md. Alrik's Hall is the sacral council chamber where Name-Truth, oaths, and patriarchal judgment carry ritual force. Treat the hall as a place where speech becomes binding.", "Alrik's Hall makes speech, oath, and judgment binding."),
    makeEntry("frozen_wastes", "location", "LOC", ["Frozen Wastes", "frozen waste", "snowfield", "ice field", "winter wilderness"], 6, 6.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/iceland827/frozen_wastes.md. Frozen Wastes are a secondary mythic landscape of snow, isolation, exposure, and old magic. Use them sparingly as pressure and atmosphere, not as default scenery.", "Frozen Wastes add isolation and mythic pressure."),
    makeEntry("amarantia_route", "location", "LOC", ["Amarantia Route", "trade routes", "clandestine routes", "route network"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/iceland827/amarantia_route.md. The Amarantia Route is a network of trade paths and clandestine information channels. It connects sanctuary, commerce, rumor, and danger across the northern world.", "Amarantia Route is trade and clandestine information."),
    makeEntry("svartulfr_clan", "organization", "ORG", ["Svartúlfr Clan", "Svartulfr Clan", "clan", "Eiriksbarn", "Eirik's children", "bloodline"], 10, 10.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/Viking/iceland827/svartulfr_clan.md. The Svartúlfr Clan is the family-political unit protecting the Eiriksbarn heir through blood, oath, surveillance, and clan authority. It is intimate, coercive, and protective at once.", "Svartúlfr Clan is family, politics, protection, and control."),
    makeEntry("jarn_gildi_iron_guild", "organization", "ORG", ["Járn-Gildi", "Jarn-Gildi", "Iron Guild", "iron guild", "guild contracts", "armed contracts"], 10, 10.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/Viking/iceland827/jarn_gildi_iron_guild.md. Járn-Gildi is the Iron Guild: iron monopolies, armed contracts, territorial enforcement, ward infrastructure, and guild law. Treat it as an economic-military institution, not a simple blacksmith shop.", "Járn-Gildi is iron monopoly, law, and armed enforcement."),
    makeEntry("einherjar_guard", "organization", "ORG", ["Einherjar", "Einherjar Guard", "guard", "soldiers", "ward patrols", "gate guards"], 8, 8.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/Viking/iceland827/einherjar_guard.md. The Einherjar Guard are the clan/guild soldiers who enforce gates, patrols, lockdowns, and battlefield order. They are disciplined, oath-bound, and not interchangeable with generic mercenaries.", "Einherjar Guard enforce gates, patrols, and lockdown."),
    makeEntry("hold_kaupmenn_slavers", "organization", "ORG", ["Hold-Kaupmenn", "Hold Kaupmenn", "slavers", "slave traders", "predatory merchants"], 8, 8.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/Viking/iceland827/hold_kaupmenn_slavers.md. Hold-Kaupmenn Slavers are predatory merchant-slavers who use routes, ambushes, and false trade to capture people. They are an external threat that tests clan protection and ward discipline.", "Hold-Kaupmenn are predatory merchant-slavers."),
    makeEntry("vax_slave_traders", "organization", "ORG", ["Vax", "Vax Slave Traders", "Vax slavers", "secondary slaver network"], 7, 7.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/Viking/iceland827/vax_slave_traders.md. Vax Slave Traders are a secondary predatory network operating through routes, informants, and compromised trade. Use them as pressure behind the main Hold-Kaupmenn threat.", "Vax is a secondary slaver network."),
    makeEntry("war_council", "organization", "ORG", ["War Council", "war council", "Alrik", "Eirik", "Magnus", "clan chiefs", "council"], 8, 8.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/Viking/iceland827/war_council.md. The War Council is the decision assembly of Alrik, Eirik, Magnus, and clan chiefs. It turns family crisis into policy, patrol, and military response.", "War Council turns family crisis into policy and patrols."),
    makeEntry("sol_sunflower_yellow_mare", "bestiary", "BST", ["Sól", "Sunflower-Yellow Mare", "mare", "horse", "transport horse"], 5, 5.0, "ACTIVE", "", " [ACTIVE] BST Source: 2_Export/World/Viking/iceland827/sol_sunflower_yellow_mare.md. Sól is the sunflower-yellow mare used for transport and guarded movement. Treat Sól as a secondary logistical detail, not a central character.", "Sól is the guarded sunflower-yellow transport mare."),
    makeEntry("nixara_death_and_eirik_grief_iceland827", "lore", "LOR", ["Nixara death", "Nixara", "Eirik grief", "died in childbirth", "ward protocol", "mother death"], 10, 10.0, "HISTORICAL", "", " [HISTORICAL] LOR Source: 2_Export/World/Viking/iceland827/nixara_death_and_eirik_grief_iceland827.md. Nixara's death in childbirth is the historical wound that birthed Eirik's grief and the ward protocol around the heir. Use it as emotional cause and flashback material, not as an active scene unless the scene supports memory or ritual.", "Nixara's death is the historical wound behind Eirik's wards."),
    makeEntry("nixara_iceland827", "npc", "NPC", ["Nixara", "Nixara Eirik", "mother", "deceased mother", "Eirik's wife"], 9, 9.0, "HISTORICAL", "", " [HISTORICAL] NPC Source: 2_Export/World/Viking/iceland827/nixara_iceland827.md. Nixara is the deceased mother and sacred memory of the Eiriksbarn line. Do not confuse her with the modern Douglas-Bloodmoon Nixara unless the user explicitly requests a timeline crossover.", "Nixara is Iceland827's deceased mother-memory, separate from modern Nixara."),
    makeEntry("eiriksbarn_lineage", "family", "FAM", ["Eiriksbarn", "Eirik's child", "Eirik's heir", "Nixara's child", "nineteen", "19"], 10, 10.0, "ACTIVE", "", " [ACTIVE] FAM Source: 2_Export/World/Viking/iceland827/eiriksbarn_lineage.md. Eiriksbarn lineage is the active heir role: child of Eirik and Nixara, age nineteen unless {{user}} changes it. The role carries magic, surveillance, political value, and family pressure without imposing sex, gender, pronouns, body, or personality.", "Eiriksbarn heir is the active user role unless changed."),
    makeEntry("magnus_eirikson_the_wall", "npc", "NPC", ["Magnus Eirikson", "Magnus", "The Wall", "commander", "Einherjar commander", "barrier"], 10, 10.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/iceland827/magnus_eirikson_the_wall.md. Magnus Eirikson — The Wall is the stoic physical guardian and Einherjar commander. He protects through presence, restraint, and controlled force, acting as the clearest barrier between the heir and escape.", "Magnus is the stoic wall and Einherjar commander."),
    makeEntry("njal_eirikson_the_velvet_glove", "npc", "NPC", ["Njal Eirikson", "Njal", "The Velvet Glove", "law scholar", "diplomat", "legal pressure"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/iceland827/njal_eirikson_the_velvet_glove.md. Njal Eirikson — The Velvet Glove is a legal scholar and lethal diplomat. He turns courtesy into leverage, contracts into chains, and interrogation into conversation.", "Njal is legal pressure in a velvet glove."),
    makeEntry("jorund_eirikson_the_rebel", "npc", "NPC", ["Jorund Eirikson", "Jorund", "The Rebel", "twin", "gemello", "storm magic", "skald"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/iceland827/jorund_eirikson_the_rebel.md. Jorund Eirikson — The Rebel is the heir's twin when that role is established: skald, underground sympathizer, storm-magic spark, and pressure against Eirik's control. If {{user}} is not the twin, treat Jorund as a close Eiriksbarn figure whose exact relationship remains user-defined.", "Jorund is rebel twin or close Eiriksbarn figure."),
    makeEntry("alrik_aelwulf_the_ancient_one", "npc", "NPC", ["Alrik", "Aelwulf", "Ancient One", "Ljósálfar", "patriarch", "sacral authority"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/iceland827/alrik_aelwulf_the_ancient_one.md. Alrik / Aelwulf — The Ancient One is the Ljósálfar patriarch and sacral authority. He embodies old law, ritual legitimacy, and judgment older than the current generation.", "Alrik/Aelwulf is ancient sacral authority."),
    makeEntry("eirik_ulfson_the_tyrant", "npc", "NPC", ["Eirik Ulfson", "Eirik", "The Tyrant", "Jarl", "father", "lockdown architect"], 10, 10.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/iceland827/eirik_ulfson_the_tyrant.md. Eirik Ulfson — The Tyrant is Jarl, father, and lockdown architect. His authority comes from grief, fear of loss, and the belief that control can prevent another Nixara-like death.", "Eirik is Jarl, father, and grief-built tyrant."),
    makeEntry("leif_ulfson_the_corsair", "npc", "NPC", ["Leif Ulfson", "Leif", "The Corsair", "shipwright", "tavern owner", "safe harbor"], 8, 8.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/iceland827/leif_ulfson_the_corsair.md. Leif Ulfson — The Corsair is a shipwright, tavern owner, and ally of decompression. He offers routes, humor, and practical escape without becoming a simple rebellion button.", "Leif is corsair, shipwright, and safe harbor."),
    makeEntry("east_einherjar", "npc", "NPC", ["East Einherjar", "east guard", "east patrol", "Einherjar patrol"], 7, 7.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/iceland827/east_einherjar.md. East Einherjar are the operational guard section handling eastern gates, patrols, and route pressure. Use them as disciplined enforcement rather than faceless mobs.", "East Einherjar are disciplined eastern patrols."),
    makeEntry("hold_kaupmenn_informant", "npc", "NPC", ["Hold-Kaupmenn Informant", "informant", "slaver informant", "interrogation", "intelligence"], 7, 7.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/iceland827/hold_kaupmenn_informant.md. A Hold-Kaupmenn Informant is a functional intelligence NPC for interrogation, rumors, and route threats. Keep the informant partial, self-interested, and dangerous to trust.", "Hold-Kaupmenn Informant provides partial intelligence."),
    makeEntry("seidr_ward_amulet", "lore", "LOR", ["Seiðr Ward-Amulet", "Seidr Ward-Amulet", "ward-amulet", "vitals", "mana monitor", "amulet"], 9, 9.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/seidr_ward_amulet.md. The Seiðr Ward-Amulet monitors vitals and mana while binding the heir to clan surveillance. It is both protection and leash.", "Ward-amulet monitors vitals and mana as protection and leash."),
    makeEntry("scrivenstone_correspondence", "lore", "LOR", ["Scrivenstone", "Scrivenstone Correspondence", "correspondence tablet", "private tablet", "rune message"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/scrivenstone_correspondence.md. Scrivenstone Correspondence is a private correspondence medium: tablets, sealed messages, and intimate channels outside public halls. Use it for secrets, negotiation, and controlled intimacy.", "Scrivenstone carries private correspondence and secrets."),
    makeEntry("def_secret_seidr_studies_iceland827", "lore", "LOR", ["Secret Seiðr Studies", "secret seidr", "seiðr studies", "deferred", "candidate"], 2, 3.0, "DEFERRED", "", " [DEFERRED] LOR Source: 2_Export/World/Viking/iceland827/legacy/Visual_DNA.md. Secret Seiðr Studies are candidate/deferred material from legacy notes. They may inform optional esoteric texture but do not define Iceland827's active seidr system unless explicitly promoted.", "Secret Seiðr Studies are optional deferred esoteric texture."),
    makeEntry("def_archon_angel_patronage_iceland827", "lore", "LOR", ["Archon Angel Patronage", "Archon Angel", "angel patronage", "deferred", "candidate"], 2, 3.0, "DEFERRED", "", " [DEFERRED] LOR Source: 2_Export/World/Viking/iceland827/legacy/Visual_DNA.md. Archon Angel Patronage is candidate/deferred material. Do not treat it as active Iceland827 theology or default patronage unless explicitly promoted.", "Archon Angel Patronage is optional deferred theology."),
    makeEntry("def_twin_bond_iceland827", "relationship", "REL", ["Twin-Bond", "twin bond", "twin", "deferred", "candidate"], 2, 3.0, "DEFERRED", "", " [DEFERRED] REL Source: 2_Export/World/Viking/iceland827/legacy/Visual_DNA.md. Twin-Bond is candidate/deferred relationship material. It is not active Iceland827 canon unless explicitly promoted by a compatible scenario or authority.", "Twin-Bond is optional deferred relationship material."),
    makeEntry("def_rune_tether_candidate_iceland827", "lore", "LOR", ["Rune-Tether candidate", "rune-tether candidate", "rune tether", "deferred", "candidate"], 1, 2.0, "DEFERRED", "", " [DEFERRED] LOR Source: 2_Export/World/Viking/iceland827/legacy/Visual_DNA.md. Rune-Tether is also referenced as candidate material in legacy notes. The active Iceland827 Rune-Tether transport system remains the binding source; candidate variants do not override it.", "Candidate Rune-Tether notes do not override active transport lore."),
    makeEntry("rune_tether_transport", "lore", "LOR", ["Rune-Tether", "Rune Tether", "rune-tether transport", "transport tether", "guardian tether"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/rune_tether_transport.md. Rune-Tether Transport is a magical transport constraint linking the heir, guardians, and route safety. It enables movement while preserving surveillance and emergency recall.", "Rune-Tether controls guarded movement."),
    makeEntry("session_logic_escalation_and_repair", "lore", "LOR", ["escalation", "de-escalation", "repair", "session logic", "repair scene", "de-escalate"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/session_logic_escalation_and_repair.md. Iceland827 scenes should move along three axes: escalation, de-escalation, and repair. Pressure may rise through lockdown, ambush, oath, or family command; relief should come through trust, choice, or negotiated safety.", "Scenes move through escalation, de-escalation, and repair."),
    makeEntry("legacy_norse_mythic_visual_dna", "world", "WRD", ["Norse Mythic", "Norse Mythic Visual DNA", "Viking visual DNA", "ancient runes", "Seidr Magic", "frozen realms", "Viking settlements", "rune magic", "frozen northern realms", "warm cinematic lighting", "Rembrandt lighting", "amber obsidian palette", "painterly realism", "ancient Viking longhall"], 8, 8.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/legacy/W_NorseMythic.md. Norse Mythic legacy metadata frames the world as Ancient Runes, Viking Age, Seiðr magic, and frozen realms: old gods still walk, runes hold creation-power, seidr weaves fate, Viking settlements and rune magic exist, and the harsh northern landscape shapes culture. The visual package adds warm cinematic lighting, Rembrandt lighting, deep shadows, amber and obsidian palette, painterly realism, and luxury visual storytelling. For Iceland827, use this as mythic atmosphere and visual texture, not as a separate world partition.", "Norse Mythic legacy defines runes, Seiðr, frozen realms, and dark firelit atmosphere."),
    makeEntry("legacy_viking_longhouse_visual_dna", "world", "WRD", ["Viking longhouse", "massive longhouses", "dark timber", "iron reinforcements", "central hearth", "bitter cold", "howling winds", "fjords", "ash falling like snow", "firelight", "creeping dark", "Iron Keep built into mountain", "forge sounds", "Frozen Wastes auroras"], 8, 8.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/legacy/Visual_DNA.md. Legacy Visual DNA specifies massive longhouses, dark timber, iron reinforcements, central hearths, bitter cold, howling winds, fjords, ash falling like snow, firelight against creeping dark, Iron Keep/Járn-Gildi built into a mountain and echoing with forge sounds, and Frozen Wastes lit by auroras. Treat these as the default environmental modifiers for Viking locations.", "Longhouses, forge-iron, hearth fire, cold winds, and auroras define Viking visual DNA."),
    makeEntry("legacy_warlord_merchant_public_metadata", "world", "WRD", ["Svartúlfr Clan Warlord Merchant", "Warlord Merchant", "six Norse warlords", "worth more than iron", "ancient Seidr", "Jarn-Gildi", "Iron Keep", "Dovre Pass", "Njal's Study"], 8, 8.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/legacy/1_public_metadata.md. The legacy public package describes six towering Norse warlords, a dark ancient stone hall, dark plate armor, thick furs, runic tattoos, coarse-black mantles, a wolf-skull emblem of blackened iron and bone with crimson Seiðr runes, and the Iron Keep's great hall with crimson wards, hearth fire, armored Einherjar, and dark-age Norse longhouse architecture. It also identifies Dovre Pass and Njal's Study as signature locations. Use these as public-facing world texture and iconography.", "Warlord Merchant metadata supplies clan iconography, six-warlord silhouette, and key location visuals."),
    makeEntry("legacy_jarn_gildi_microengine_contract", "world", "WRD", ["Jarn-Gildi microengine", "User Contract Jarn", "Alyssa Boundary", "mv_l1_fantasy_active", "mv_l2_fantasy_domain_active", "L2 Domain", "guild monopolies", "runic warfare", "clan oath obligations"], 9, 9.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/legacy/L2_svartulfrverse_ClanJarnGildiWarlords.js. Legacy L2 microengine lore defines the active domain as a historical-fantasy order ruled by guild monopolies, runic warfare, and clan oath obligations. It also defines a user contract: age nineteen, Eiriksbarn, Hálf-Álfar, Eirik/Nixara lineage, Name-Truth, and iron aversion; Twin-Bond only if Jorund's twin; no White Moon; gender, appearance, and Seiðr presentation remain open. Alyssa is a separate NPC boundary and must not overwrite {{user}}.", "Legacy L2 defines guild-monopoly domain and protects {{user}} from Alyssa/NPC overwrite."),
    makeEntry("legacy_jarn_gildi_domain_pressure", "organization", "ORG", ["Jarn-Gildi domain pressure", "Iron Guild controls trade", "levy rights", "armed contracts", "ritual law", "territorial enforcement", "Hold-Kaupmenn cells", "Vax slave traders", "black-route commerce"], 8, 8.0, "ACTIVE", "", " [ACTIVE] ORG Source: 2_Export/World/Viking/legacy/L2_svartulfrverse_ClanJarnGildiWarlords.js. Legacy L2 pressure notes state that the Iron Guild controls trade, levy rights, and armed contracts through ritual law and territorial enforcement. Hold-Kaupmenn cells and Vax slave traders operate as mobile predatory networks focused on capture logistics, hidden labor camps, fortresses, and black-route commerce. Raid response follows shield wall, route split, and target recovery while hostile pressure remains active.", "Iron Guild law, slaver networks, and raid response are active domain pressures."),
    makeEntry("legacy_alyssa_eiriksbarn_boundary", "npc", "NPC", ["Alyssa", "Alyssa Eiriksbarn", "Alyssa Boundary", "Álfa-Dróttinn", "Lys", "Little Moon", "Ylfingr", "Daughter of the Aulderwood", "Mana Conduit", "dev/test NPC", "protected core"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/legacy/4_persona_alyssa.md. Alyssa Eiriksbarn is a dev/test NPC/persona for Jarn-Gildi, not a default identity for {{user}}. Her legacy dossier includes aliases Álfa-Dróttinn, Lys, Little Moon, Ylfingr, Daughter of the Aulderwood, and Mana Conduit; age nineteen; Hálf-Álfar Mana Conduit; iron aversion; no werewolf rank, Omega, or White Moon; Völva/healer-in-training; secret advanced Seiðr studies funded by Archon Angel; Jorund/Jasper twin link when playing twin; Eirik as jarl father; Magnus as Malachia/Vanguard shieldwall; Njal as Noah/silver-tongued diplomacy; Alrik/Aelwulf as Wulfnic supreme patriarch; Sól as sunflower-yellow mare; Scrivenstone correspondence; and a ward-amulet monitoring vitals. Use only as a boundary/example unless the user explicitly establishes Alyssa as an NPC in play.", "Alyssa is a separate dev/test NPC boundary, not the default {{user}}."),
    makeEntry("legacy_alyssa_microcosm_details", "lore", "LOR", ["Alyssa microcosm", "nesting habits", "colored enchanted inks", "parchment notepad", "charcoal", "wooden lyre", "galdr", "zero alcohol tolerance", "dark chocolate", "sunflowers", "moonflower scent", "comfort furs", "dried flowers", "enchanted cloth", "cozy corners"], 6, 6.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/legacy/4_persona_alyssa.md. Alyssa's legacy persona adds microcosm details: nesting with furs, dried flowers, and enchanted cloth; stealing brothers' fur cloaks for comfort; zero alcohol tolerance; high cuddliness; obsession with colored enchanted inks, quills, parchment notepads, and charcoal; a left-handed ornate wooden lyre for galdr; Scrivenstone correspondence slate; dark chocolate imported at great expense by Njal; preference for quiet forest stillness, birdsong, firelight warmth, yellow, sunflowers, and physical reassurance; and stress response of seeking a guardian after loud arguments. These details belong to Alyssa as a dev/test NPC unless {{user}} explicitly adopts them.", "Alyssa's NPC micro-details are comfort, stationery, galdr, furs, sweets, and sanctuary habits."),
    makeEntry("legacy_main_character_roster", "npc", "NPC", ["Magnus", "Njal", "Jorund", "Alrik", "Eirik", "Leif", "main character roster", "six warlords"], 10, 10.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/legacy/5_main_character_profiles.md. Legacy main-character roster defines six central figures: Magnus Eirikson/The Wall, eldest shield and physical guardian; Njal Eirikson/The Velvet Glove, guild law scholar; Jorund Eirikson/The Rebel, twin and underground skald; Alrik/Aelwulf, Ljósálfar demigod patriarch; Eirik Ulfson/The Tyrant, Alpha Jarl and vault-lockdown architect; Leif Ulfson/The Corsair, shipwright, tavern owner, and decompression ally. Treat these as the core local power roster of the Járn-Gildi/Svartúlfr branch.", "Six-warlord roster: Magnus, Njal, Jorund, Alrik, Eirik, and Leif."),
    makeEntry("legacy_magnus_the_wall_details", "npc", "NPC", ["Magnus Eirikson", "Magnus", "The Wall", "eldest shield", "physical guardian", "Einherjar Commander", "shield wall", "Malachia", "Vanguard shieldwall"], 10, 10.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/legacy/5_main_character_profiles.md. Magnus Eirikson — The Wall is the eldest shield, Einherjar commander, and physical guardian. Legacy details: 208cm, Hálf-Álfar, plate armor, coarse-black mantle, stoic presence, low rumbling archaic commands, inability to turn off shielding, forged on raid routes, and silent devotion as an iron wall. He plants his body between {{user}} and threats and acts as the first physical barrier during lockdowns or attacks.", "Magnus is the stoic eldest shield and physical wall."),
    makeEntry("legacy_njal_velvet_glove_details", "npc", "NPC", ["Njal Eirikson", "Njal", "The Velvet Glove", "Guild Law Scholar", "Noah", "legal pressure", "silver-tongued diplomacy", "ledger obsession"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/legacy/5_main_character_profiles.md. Njal Eirikson — The Velvet Glove is a guild law scholar and diplomatic fallout handler. Legacy details: 196cm, Hálf-Álfar, lithe build, silver cufflinks, polished and lethal calm, refined purr, legal precision, ledger obsession, guild golden-child backstory, and the core of ruining through lawful elegance. He turns courtesy into leverage and contracts into chains.", "Njal is lawful elegance, diplomacy, ledgers, and pressure."),
    makeEntry("legacy_jorund_rebel_details", "npc", "NPC", ["Jorund Eirikson", "Jorund", "Jasper", "The Rebel", "underground Skald", "twin", "storm magic", "Twin-Bond", "Twin Link", "escape architect"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/legacy/5_main_character_profiles.md. Jorund Eirikson — The Rebel is the twin and underground skald when that role is established. Legacy details: 191cm, Hálf-Álfar, mint eyes, lightning-scarred arms, chaotic warmth, reckless joy, fast Norse slang, breaking wards when bored, escape architect, storm-magic core, and Twin-Bond/Twin Link to {{user}} only when playing the twin. If {{user}} is not the twin, treat Jorund as a close Eiriksbarn figure with user-defined exact relation.", "Jorund is rebel skald, storm-magic, and conditional twin bond."),
    makeEntry("legacy_alrik_ancient_one_details", "npc", "NPC", ["Alrik", "Aelwulf", "The Ancient One", "Ljósálfar demigod patriarch", "Wulfnic supreme patriarch", "sacral authority", "divine law", "Sacred Flame emissary"], 9, 9.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/legacy/5_main_character_profiles.md. Alrik / Aelwulf — The Ancient One is the Ljósálfar demigod patriarch and sacral authority. Legacy details: 226cm, archaic gravitas, terrifying indulgence, primeval decrees, disorientation by mortal politics, absolute authority, backstory as Sacred Flame emissary, and divine law made flesh. He embodies ancient legitimacy older than guild ledgers and modern politics.", "Alrik/Aelwulf is ancient sacral authority and divine law."),
    makeEntry("legacy_eirik_ulfson_details", "npc", "NPC", ["Eirik Ulfson", "Eirik", "The Tyrant", "Alpha Jarl", "Jarl", "vault lockdown architect", "paranoid strategist", "grief hardened into control"], 10, 10.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/legacy/5_main_character_profiles.md. Eirik Ulfson — The Tyrant is Alpha Jarl, father, and lockdown architect. Legacy details: 213cm, Northern Human, silver-streaked hair, paranoid strategist, barked runic commands, grief hardened into control after Nixara's death, and control disguised as love. He turns family crisis into command, surveillance, and vault lockdown.", "Eirik is Jarl, father, and grief-built lockdown architect."),
    makeEntry("legacy_leif_ulfson_details", "npc", "NPC", ["Leif Ulfson", "Leif", "The Corsair", "shipwright", "tavern owner", "decompression ally", "black-route sanctuary", "safe harbor"], 8, 8.0, "ACTIVE", "", " [ACTIVE] NPC Source: 2_Export/World/Viking/legacy/5_main_character_profiles.md. Leif Ulfson — The Corsair is a shipwright, tavern owner, and decompression ally. Legacy details: 198cm, Northern Human, rugged build, warm anti-authority, dry humor, plainspoken speech, tendency to enable smuggled breathers, black-route sanctuary backstory, and core as air in the cage. He offers routes, humor, practical escape, and decompression without becoming a simple rebellion button.", "Leif is corsair, shipwright, tavern owner, and safe harbor."),
    makeEntry("legacy_user_contract_invariants", "world", "WRD", ["User Contract", "World Invariants", "Context Invariants", "Lore Invariants", "No White Moon", "No Alpha/Omega", "Twin-Bond conditional", "Eiriksbarn required", "Name-Truth", "iron aversion"], 10, 10.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/legacy/3_scenario.md. Legacy invariants define the user contract without overwriting {{user}}: respect chosen pronouns/name; do not assign gender, rank, personality, appearance, or Twin-Bond until established. Required: age nineteen, surname Eiriksbarn, species Hálf-Álfar, lineage as child of Eirik and Nixara, Name-Truth, and cold-iron aversion. Conditional: Twin-Bond only if playing Jorund's twin. Forbidden defaults: werewolf rank, White Moon, Alpha/Omega dynamics. Seiðr presentation, pronouns, sex, gender, appearance, personality, and speech remain open.", "User contract protects {{user}} agency while preserving Iceland827 invariants."),
    makeEntry("legacy_session_microcosm", "lore", "LOR", ["Session microcosm", "Ward spike", "slaver approach", "user panic", "shield wall", "localized alarms", "vault lock", "patriarch override", "trust reset", "amended ward privileges"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/legacy/3_scenario.md. Legacy trigger contract defines local session microcosm: ward spikes, slaver approach, or {{user}} panic cause Magnus to form a shield wall, alarms to localize, and Eirik to lock down the vault. De-escalation can come through stabilization or patriarch override; repair/reset can come through trust reset or amended ward privileges. Use this as background logic, not as a forced scenario.", "Ward spikes localize alarms, shield walls, vault locks, and trust repair."),
    makeEntry("legacy_guild_chronicles_microcosm", "lore", "LOR", ["Guild Chronicles", "Tavern Rumors", "Corvid Dispatch", "Runner's Slip", "Wax-Sealed Letter", "Oath-Ring", "Tavern Murmur", "private vow-channel", "vow-channel"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/legacy/6_initial_messages.md. Legacy message fragments add microcosm communication forms: Guild Chronicles posts, Tavern Rumors, Corvid Dispatch from East Einherjar, Runner's Slip from Jorund, Wax-Sealed Letters from Leif, Oath-Ring vow-channels, and Tavern Murmur hand-to-hand room traffic. Treat them as world-native intelligence channels, not required opening scenes.", "Guild posts, corvid dispatches, oath-rings, slips, and tavern murmurs carry intelligence."),
    makeEntry("legacy_iron_keep_microcosm", "location", "LOC", ["Iron Keep microcosm", "eastern fjord-gate", "curtain wall", "war table", "ward-post", "barricade", "vault", "forge-smoke", "cold rain", "sealed halls", "crimson Seiðr wards", "Eirik's command table"], 9, 9.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/legacy/6_initial_messages.md and legacy/W_NorseMythic.js. Legacy Iron Keep details include sealed halls, crimson Seiðr wards, Eirik's command table, iron doors, curtain wall, war table, ward-post, barricade, vault, forge-smoke, cold rain, and the eastern fjord-gate. Use them as concrete micro-locations inside Álfar-viðr.", "Iron Keep microcosm: gates, ward-posts, war table, vault, forge-smoke, and sealed halls."),
    makeEntry("legacy_dovre_pass_microcosm", "location", "LOC", ["Dovre Pass microcosm", "Jarn-Gildi carriage", "storm line", "scrying wards", "privacy screens", "service window", "ward-panel", "perimeter sweep", "Járnfjörðr", "blue lightning", "wind spirits"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/legacy/6_initial_messages.md. Legacy Dovre Pass details include the Járn-Gildi carriage, storm line, scrying wards, privacy screens, service window, ward-panel, perimeter sweep, Járnfjörðr as a route destination, blue lightning, and wind spirits as rumor texture. Use them as route-specific details when Dovre Pass appears.", "Dovre Pass route details include carriage wards, storm cover, and Járnfjörðr."),
    makeEntry("legacy_silfr_mynt_microcosm", "location", "LOC", ["Silfr-Mynt microcosm", "back door", "back bench", "scarred bench", "guild sigil", "rumor board", "private room traffic", "pitch", "cheap ale", "woodsmoke", "rushlight", "fogged windows"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/legacy/6_initial_messages.md. Legacy Silfr-Mynt details include pitch, cheap ale, woodsmoke, rushlight, fogged windows, a guild sigil that earns a full tankard, a scarred back bench, a private rumor channel distinct from the public rumor board, and Leif's back-door sanctuary. Use as tavern microtexture.", "Silfr-Mynt has back doors, back benches, private rumors, and guild-table customs."),
    makeEntry("legacy_njal_study_microcosm", "location", "LOC", ["Njal's study microcosm", "mead-rose", "ozone", "hand-woven Álfar-viðr rug", "silver-and-onyx cufflinks", "Sjónhverfing", "fractured thoughts", "ledger balance", "cold luxury"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/legacy/6_initial_messages.md. Legacy Njal's Study details include mead-rose and ozone scent, a hand-woven Álfar-viðr rug, silver-and-onyx cufflinks, Sjónhverfing holding fractured thoughts, ledger-balance language, and cold luxury. Use as interrogation/diplomacy texture without turning every scene into a plot beat.", "Njal's Study uses scent, ledgers, rugs, and Sjónhverfing as pressure texture."),
    makeEntry("legacy_alriks_hall_microcosm", "location", "LOC", ["Alrik's Hall microcosm", "bare seat", "high chair", "map table", "oath-ring", "Vanguard proximity", "Name-Truth hall", "ancient weight", "primeval decree"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOC Source: 2_Export/World/Viking/legacy/6_initial_messages.md. Legacy Alrik's Hall details include the bare seat of a high chair, map table, oath-ring vow-channel, Vanguard/heir proximity, Name-Truth hall function, ancient weight, and primeval decree. Use as sacral-council texture.", "Alrik's Hall holds the bare seat, map table, oath-ring, and Name-Truth."),
    makeEntry("legacy_longhouse_portrait_microcosm", "world", "WRD", ["longhouse portrait", "casa lunga", "Viking era portrait", "boiled leather armor", "ritual furs", "bronze bracelets", "black cloak", "Alpha signet ring", "waxed linen tunic", "windproof hide mantle", "signal drum", "hunting horn", "runic coin necklace", "pastel wool layers", "herb scent filters", "healing stone bracelet", "linen ear laces", "wolf-fur mantle", "lunar pendant", "Leif's runic bracelet", "Nargathon draconic plates", "honor torques", "braided Alyssa bracelet", "black-tipped spear", "one-handed sword", "seax"], 7, 7.0, "ACTIVE", "", " [ACTIVE] WRD Source: 2_Export/World/Viking/legacy/Personaggi Vichinghi in Casa Lunga and Viking Portrait In Longhouse. Legacy portrait notes describe a Viking-era longhouse group with boiled-leather armor, ritual furs, black capes, bronze bracelets, Alpha signet rings, waxed linen tunics, windproof hide mantles, rune-grip harnesses, signal drums, hunting horns, runic coin necklaces, pastel wool layers with herb scent filters, healing-stone bracelets, linen ear-lace safe-mode, embroidered linen tunics, wolf-fur mantles, lunar pendants, Leif's runic bracelet, Nargathon draconic plates, honor torques, braided Alyssa bracelets, black-tipped spears, one-handed swords, and seax. Use these as costume/object motifs for local color, not as mandatory wardrobe.", "Longhouse portrait adds armor, rune jewelry, drums, horns, furs, and seax motifs."),
    makeEntry("legacy_sarrows_jolnora_boundary", "culture", "CUL", ["Sarrows", "Jolnora Forest", "bird humanoids", "wing hunters", "Vax hunters", "Kelsis", "Suren Beasts", "Asag Beasts", "Griven", "Yael", "Zeera"], 5, 5.0, "CANDIDATE", "", " [CANDIDATE] CUL Source: 2_Export/World/Viking/legacy/W_NorseMythic.js. Legacy W_NorseMythic.js also contains non-Iceland827 fantasy species/faction material: Vax as large demonic humanoids with Southern Red slave-trader and Northern Blue cold-woods variants; Sarrows as bird humanoids in Jolnora Forest targeted by Vax wing-hunters; Kelsis as feline humanoids; Suren Beasts as white tiger-like snow pack hunters; Asag Beasts as blue-furred horned beasts; and characters Yael, Zeera, and Griven. Treat this as candidate crossover or external mythic-fantasy material unless explicitly promoted into Iceland827.", "Sarrows, Jolnora, Kelsis, and beasts are candidate crossover material."),
    makeEntry("legacy_douglas_bloodmoon_boundary", "world", "WRD", ["Douglas Bloodmoon", "Malachia", "Noah", "Jasper", "Erik Douglas", "Wulfnic", "Elara", "Edric", "Fenrir", "L'Anse aux Meadows", "Ballantine", "Seven Hills Solarton"], 5, 5.0, "CANDIDATE", "", " [CANDIDATE] WRD Source: 2_Export/World/Viking/legacy/W_NorseMythic.js. Legacy W_NorseMythic.js contains modern Douglas-Bloodmoon, Ballantine, Seven Hills/Solarton, Edric, Elara, Fenrir, and 1021 L'Anse aux Meadows material. This belongs to other timelines and must not be loaded as Iceland827 canon unless a deliberate crossover is requested.", "Douglas-Bloodmoon and modern pack material is candidate crossover, not default Iceland827."),
    makeEntry("starting_situations_iceland827", "lore", "LOR", ["Starting Situations", "Iron Keep lockdown", "Dovre Pass ambush", "Njal's study", "Silfr-Mynt respite", "Patriarch's question"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/starting_situations_iceland827.md. Approved starting situations include Iron Keep lockdown, Dovre Pass ambush, Njal's study, Silfr-Mynt respite, and the Patriarch's question. They are starting pressure points, not mandatory openings unless the user chooses one.", "Starting situations: lockdown, ambush, study, respite, or Patriarch's question.")
];

ICELAND_827_LORE.forEach(function (entry) {
    registerLoreEntry(entry);
});

applyWorldLore();

// SCRIPT END
