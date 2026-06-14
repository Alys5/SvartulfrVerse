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
    makeEntry("rune_tether_transport", "lore", "LOR", ["Rune-Tether", "Rune Tether", "rune-tether transport", "transport tether", "guardian tether"], 7, 7.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/rune_tether_transport.md. Rune-Tether Transport is a magical transport constraint linking the heir, guardians, and route safety. It enables movement while preserving surveillance and emergency recall.", "Rune-Tether controls guarded movement."),
    makeEntry("session_logic_escalation_and_repair", "lore", "LOR", ["escalation", "de-escalation", "repair", "session logic", "repair scene", "de-escalate"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/session_logic_escalation_and_repair.md. Iceland827 scenes should move along three axes: escalation, de-escalation, and repair. Pressure may rise through lockdown, ambush, oath, or family command; relief should come through trust, choice, or negotiated safety.", "Scenes move through escalation, de-escalation, and repair."),
    makeEntry("starting_situations_iceland827", "lore", "LOR", ["Starting Situations", "Iron Keep lockdown", "Dovre Pass ambush", "Njal's study", "Silfr-Mynt respite", "Patriarch's question"], 8, 8.0, "ACTIVE", "", " [ACTIVE] LOR Source: 2_Export/World/Viking/iceland827/starting_situations_iceland827.md. Approved starting situations include Iron Keep lockdown, Dovre Pass ambush, Njal's study, Silfr-Mynt respite, and the Patriarch's question. They are starting pressure points, not mandatory openings unless the user chooses one.", "Starting situations: lockdown, ambush, study, respite, or Patriarch's question.")
];

ICELAND_827_LORE.forEach(function (entry) {
    registerLoreEntry(entry);
});

applyWorldLore();

// SCRIPT END
