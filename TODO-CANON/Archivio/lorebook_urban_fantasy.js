/**
 * Urban Fantasy Scenario Lorebook
 * Based on the lightweight lorebook template
 */

const messageCount = context.chat.message_count || 0;
const lastMessage = (context.chat.last_message || "").toLowerCase();

if (typeof context.character.personality !== "string") context.character.personality = "";
if (typeof context.character.scenario !== "string") context.character.scenario = "";

function appendTraits(personalityText, scenarioText) {
    if (personalityText) context.character.personality += personalityText;
    if (scenarioText) context.character.scenario += scenarioText;
}

function passFilters(entry) {
    const filters = entry.filters;
    if (!filters) return true;
    if (filters.notWith && filters.notWith.some((w) => lastMessage.includes(w))) return false;
    if (filters.requiresAny && !filters.requiresAny.some((w) => lastMessage.includes(w))) return false;
    if (filters.requiresAll && !filters.requiresAll.every((w) => lastMessage.includes(w))) return false;
    return true;
}

function canActivate(entry) {
    if (messageCount < entry.minMessages) return false;
    if (!passFilters(entry)) return false;
    if (typeof entry.probability === "number") {
        const normalizedProbability = entry.probability > 1 ? entry.probability / 100 : entry.probability;
        if (Math.random() > normalizedProbability) return false;
    }
    return true;
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasKeywordMatch(entry, message) {
    if (entry.constant) return true;
    if (!entry.keywords || entry.keywords.length === 0) return false;

    if (entry.matchWholeWords) {
        for (let i = 0; i < entry.keywords.length; i++) {
            const keyword = entry.keywords[i];
            const pattern = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i");
            if (pattern.test(message)) return true;
        }
        return false;
    }

    return entry.keywords.some((k) => message.includes(k));
}

const keywordStopwords = new Set([
    "the",
    "a",
    "an",
    "mr",
    "mrs",
    "ms",
    "sir",
    "madam"
]);

function normalizeKeyword(keyword) {
    return String(keyword || "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeKeywords(keywords) {
    if (!Array.isArray(keywords)) return [];

    const deduped = new Map();
    for (let i = 0; i < keywords.length; i++) {
        const normalized = normalizeKeyword(keywords[i]);
        if (!normalized) continue;
        if (keywordStopwords.has(normalized)) continue;
        if (!deduped.has(normalized)) deduped.set(normalized, normalized);
    }

    // Stable, deterministic ordering to keep matching predictable.
    return Array.from(deduped.values()).sort((a, b) => a.localeCompare(b));
}

// ----------------------------------------------------------------------
// 1. DYNAMIC RELATIONSHIP BASE
// ----------------------------------------------------------------------
if (messageCount < 5) {
    appendTraits(
        ", polite but maintains professional distance",
        " This is their first meeting, so they are careful and observant."
    );
} else if (messageCount < 15) {
    appendTraits(
        ", becoming more comfortable and casual",
        " They are warming up and becoming more relaxed in conversation."
    );
} else if (messageCount < 30) {
    appendTraits(", friendly and open", " They feel comfortable and speak openly as friends.");
} else {
    appendTraits(", trusting and deeply connected", " They share a deep friendship and trust completely.");
}

if (lastMessage.includes("hello")) {
    appendTraits("", " They greet you warmly.");
}

// ----------------------------------------------------------------------
// 2. LORE ENTRIES DICTIONARY
// ----------------------------------------------------------------------
const loreEntries = [
    {
        keywords: ["setting"],
        constant: true,
        priority: 101,
        minMessages: 0,
        category: "setting",
        probability: 100,
        scenario:
            " <setting>Modern-day Earth (year 2024) where humans and supernatural species coexist. Magic and technology are both common and often integrated in daily life, infrastructure, and services.</setting>"
    },
    {
        keywords: ["succ", "s.u.c.c", "supernatural university of central california", "supernatural college"],
        priority: 111,
        minMessages: 0,
        category: "institution",
        probability: 100,
        scenario:
            " <SUCC>Founded in 1887, SUCC is a major integrated campus with roughly 80/20 supernatural-human enrollment and a strong inclusion focus.</SUCC>"
    },
    {
        keywords: ["dean archer wolfwood", "human students", "integrated education", "2002"],
        priority: 102,
        minMessages: 0,
        category: "history",
        probability: 100,
        scenario:
            " <SUCC><founding>In 2002, Dean Archer Wolfwood opened SUCC to human students, revitalizing the school and making it a pioneer of integrated education.</founding></SUCC>"
    },
    {
        keywords: ["supernatural majors", "unique degrees", "majors", "degrees", "lycanthropy studies", "vampiric studies"],
        priority: 103,
        minMessages: 0,
        category: "academics",
        probability: 100,
        scenario:
            " <SUCC><degrees>SUCC offers Alchemy, Necromancy, Applied Divination, Paranormal Psychology, Astral Studies, Potions, Cryptozoology, Supernatural/Human Relations, Environmental Magic, Vampiric Studies, and Lycanthropy Studies.</degrees></SUCC>"
    },
    {
        keywords: ["cums", "california university of magical sciences", "c.u.m.s", "rivalry", "hex valley", "magical research", "supernatural-only"],
        priority: 113,
        minMessages: 0,
        category: "rival_school",
        probability: 100,
        scenario:
            " <CUMS>CUMS is SUCC's elite supernatural-only rival in Hex Valley; inter-school tension escalated after SUCC accepted human students in 2002.</CUMS>"
    },
    {
        keywords: ["campus", "succ campus", "stadium", "ice rink", "lunar quad", "basilisk library", "griffin clocktower", "unicorn hall", "nocturnal hall", "fraternity row", "wyrm dormitories"],
        priority: 105,
        minMessages: 0,
        category: "campus_locations",
        probability: 100,
        scenario:
            " <SUCC><locations>Major campus sites include Archer Wolfwood Hall, St. Neptune Stadium, Nocturnal Hall, Unicorn Hall, Lunar Quad, Basilisk Library, Griffin Clocktower, Fraternity/Sorority Row, and Wyrm Dormitories.</locations></SUCC>"
    },
    {
        keywords: ["solarton", "college town", "monster-friendly", "anti-vampire laws", "solarton locations", "sidewinders", "bricklane mall", "solarton square"],
        priority: 106,
        minMessages: 0,
        category: "city",
        probability: 100,
        scenario:
            " <solarton>Solarton is SUCC's home town: mixed-species, culturally active, historically anti-vampire, now evolving but still politically tense. Key spots include Solarton High, Sidewinders, Bricklane Mall, and Solarton Square.</solarton>"
    },
    {
        keywords: ["werewolves", "packs", "full moon", "shift", "full moon market", "were heritage"],
        priority: 107,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario:
            " <werewolves>Werewolves are prominent in Solarton, often pack-oriented, with voluntary shifting and involuntary full-moon transformations; social stereotypes and species distinctions remain important.</werewolves>"
    },
    {
        keywords: ["vampires", "elite", "old money", "mansions", "vampire legislation", "vua"],
        priority: 108,
        minMessages: 0,
        category: "species_politics",
        probability: 100,
        scenario:
            " <vampires>Vampires are less common in Solarton due to long anti-vampire legal history, though elite communities remain influential. <vampire_legislation>Legal discrimination lasted into the 2000s and still drives activism and social friction.</vampire_legislation></vampires>"
    },
    {
        keywords: ["demihumans", "demi-human", "demi", "kemonomimi", "hybrids", "part-human", "animal traits", "mythical creatures"],
        priority: 109,
        minMessages: 0,
        category: "species",
        probability: 100,
        matchWholeWords: true,
        scenario:
            " <demihumans>Demihumans include many part-human lineages with visible traits like ears, tails, wings, scales, horns, or mixed physiologies. In narration, reflect subtle animal-linked instincts and body-language while preserving core personality; emphasize expressive non-human features without turning them into full-animal anatomy.</demihumans>"
    },
    {
        keywords: ["human", "humans", "monster politics", "interspecies relationships", "minority at succ"],
        priority: 110,
        minMessages: 0,
        category: "species",
        probability: 100,
        scenario:
            " <humans>Humans are a sizable minority at SUCC, spanning integration advocates and anti-monster factions; magical ability exists but is uncommon.</humans>"
    },
    {
        keywords: ["s.h.a", "supernatural and human alliance", "supernatural & human alliance", "cultural exchange", "advocacy", "clubs"],
        priority: 114,
        minMessages: 0,
        category: "clubs",
        probability: 100,
        scenario:
            " <SUCC><sha>The S.H.A is a major student organization for interspecies dialogue, mentorship, and campus advocacy.</sha></SUCC>"
    },
    {
        keywords: ["hex valley"],
        priority: 126,
        minMessages: 0,
        category: "location",
        probability: 100,
        scenario:
            " <hex_valley>Hex Valley is a wealthy nearby town with vampiric influence and magical wards that prolong twilight and reduce daylight.</hex_valley>"
    },
    {
        keywords: ["nocturnal crisis", "1999"],
        priority: 127,
        minMessages: 0,
        category: "history",
        probability: 100,
        scenario:
            " <nocturnal_crisis>The 1999 Nocturnal Crisis involved vampiric extremists and mass civilian casualties, leaving lasting anti-vampire stigma.</nocturnal_crisis>"
    },
    {
        keywords: ["bulls", "football", "succ bulls", "big game"],
        priority: 128,
        minMessages: 0,
        category: "sports",
        probability: 100,
        scenario:
            " <succ_bulls>SUCC Bulls are state champions in mixed-species football. Coach: Dullahan. Assistant Coach: Barkley Rover.</succ_bulls>"
    },
    {
        keywords: ["hockey", "hockey team", "the bears"],
        priority: 129,
        minMessages: 0,
        category: "sports",
        probability: 100,
        scenario:
            " <succ_bears>SUCC Bears are the mixed-species hockey team with a strong season and notable players including Vincent Campbell and Finnegan Novak.</succ_bears>"
    },
    {
        keywords: ["population", "rare species", "species", "students"],
        priority: 130,
        minMessages: 0,
        category: "demographics",
        probability: 100,
        scenario:
            " <demographics>SUCC demographics are led by weres/shapeshifters and demihumans, with humans and vampires as notable minorities.</demographics>"
    },
    {
        keywords: ["anime club", "anime", "manga", "weeaboo", "clubs"],
        priority: 132,
        minMessages: 0,
        category: "clubs",
        probability: 100,
        scenario:
            " <anime_club>Anime Club meets Fridays at 6 PM in Basilisk Library basement room 005; known members include Stan, Andrew, and Oskar.</anime_club>"
    },
    {
        keywords: ["the pack", "werewolf club", "clubs"],
        priority: 133,
        minMessages: 0,
        category: "clubs",
        probability: 100,
        scenario:
            " <the_pack>The Pack is SUCC's were/canid support society for academic and identity-related support.</the_pack>"
    },
    {
        keywords: ["bigfeet", "hiking club", "clubs"],
        priority: 134,
        minMessages: 0,
        category: "clubs",
        probability: 100,
        scenario:
            " <bigfeet>Bigfeet Hiking Club is popular with cryptid and less-common species and organizes regular hikes and camping trips.</bigfeet>"
    },
    {
        keywords: ["vampire & undead association", "vua", "vampire society", "vampire club", "clubs"],
        priority: 135,
        minMessages: 0,
        category: "clubs",
        probability: 100,
        scenario:
            " <vua>VUA supports vampiric/undead students and staff, with a reputation for exclusivity.</vua>"
    },
    {
        keywords: ["frat", "sorority", "fraternity", "beta rho omega", "alpha sigma sigma", "alpha rho omega", "greek life", "greek", "party"],
        priority: 136,
        minMessages: 0,
        category: "social",
        probability: 100,
        scenario:
            " <greek_life>SUCC Greek life includes ARO/ASS/BRO fraternities and MOO/TIT sororities, with strong links to sports and party culture.</greek_life>"
    },
    {
        keywords: ["sports", "swim", "basketball", "cheerleading", "athletics", "school colors"],
        priority: 137,
        minMessages: 0,
        category: "sports",
        probability: 100,
        scenario:
            " <sports>SUCC teams include Bulls (football), Bears (hockey), Kelpies (swim/dive), and Phantoms (basketball). School colors: dark blue and yellow.</sports>"
    },
    {
        keywords: ["sinners", "the sinners", "jean-luc", "jean luc", "virtuoso", "telepath"],
        priority: 156,
        minMessages: 0,
        category: "faction",
        probability: 100,
        matchWholeWords: true,
        scenario:
            " <Sinners>The Sinners are a major rival syndicate in Los Angeles' supernatural underworld, known for Ambrosia trafficking and territorial conflict with Ruaraidh Ballantine's network. Leader: Jean-Luc Virtuoso, a telepathic strategist.</Sinners>"
    },
    {
        keywords: ["ambrosia", "magical drugs"],
        priority: 157,
        minMessages: 0,
        category: "underworld",
        probability: 100,
        matchWholeWords: true,
        scenario:
            " <Ambrosia>Ambrosia is a high-risk magical narcotic (liquid or powder) associated with addiction, instability, severe withdrawal, and long-term psychological decline.</Ambrosia>"
    },
    {
        keywords: ["the underworld", "supernatural underworld", "black market"],
        priority: 158,
        minMessages: 0,
        category: "underworld",
        probability: 100,
        matchWholeWords: true,
        scenario:
            " <Supernatural_Underworld>The supernatural underworld is a covert criminal ecosystem spanning trafficking, illicit magic, mercenary work, and artifact smuggling across major cities like Los Angeles.</Supernatural_Underworld>"
    },
    {
        keywords: ["ballantine", "ballantine family"],
        priority: 159,
        minMessages: 0,
        category: "faction",
        probability: 100,
        matchWholeWords: true,
        scenario:
            " <Ballantine_Family>The Ballantine Family operates through Ballantine Imports & Exports and dominates large parts of LA's magical black market through strict internal loyalty and territorial defense.</Ballantine_Family>"
    },
    {
        keywords: ["rory's estate", "ballantine estate", "the estate", "home", "the house"],
        priority: 160,
        minMessages: 0,
        category: "location",
        probability: 100,
        matchWholeWords: true,
        scenario:
            " <Rorys_Estate>Rory's Estate is a fortified luxury compound outside central LA, serving as both residence and operational HQ, designed to accommodate multiple supernatural body types.</Rorys_Estate>"
    },
    { keywords: ["rory", "ruaraidh", "ruaraidh ballantine"], priority: 161, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Ruaraidh 'Rory' Ballantine: dragon demihuman crime lord and CEO, territorial, strategic, and fiercely protective of his chosen inner circle.]" },
    { keywords: ["alicia", "alicia virtuoso", "mrs virtuoso", "jean-luc's wife"], priority: 162, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Alicia Virtuoso: poised socialite and former model who manages image, status, and household power with practical detachment.]" },
    { keywords: ["dante", "the inferno", "inferno"], priority: 163, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Dante: incubus club owner tied to The Inferno and Sinners intelligence networks, attention-seeking and emotionally volatile.]" },
    { keywords: ["roxie", "rox", "arms dealer", "smuggler"], priority: 164, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Roxie: hyena demihuman logistics enforcer with chaotic energy, violence-forward tactics, and acquisition-focused priorities.]" },
    { keywords: ["harper", "harper aries"], priority: 165, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Harper Aries: dhampir dealer with severe addiction risk, defensive bravado, and unstable loyalty under pressure.]" },
    { keywords: ["daniel", "danny", "boone", "danny boone"], priority: 166, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Daniel 'Danny' Boone: werewolf enforcer, physically protective and emotionally dependent, with loyalty rooted in rescue trauma.]" },
    { keywords: ["sullivan", "sully", "sullivan jones"], priority: 167, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Sullivan 'Sully' Jones: veteran human fixer/driver/bodyguard, cynical but loyal, relying on grit, firearms, and connections over magic.]" },
    { keywords: ["siobhan"], priority: 168, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Siobhan: manipulative vampire informant and social spymaster, driven by envy, control, and interpersonal leverage.]" },
    { keywords: ["zero", "coyote demi"], priority: 169, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Zero: unstable coyote shifter hitman with poor impulse control and violence-conditioned survival behavior.]" },
    { keywords: ["kevin", "tech guy"], priority: 170, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Kevin: insecure human hacker handling cyber operations, vulnerable to coercion, addiction loops, and status anxiety.]" },
    { keywords: ["arthur", "chemist", "doctor"], priority: 171, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Arthur: exhausted chimera chemist who formulates Ambrosia and biotechnical hazards with detached pragmatism.]" },
    { keywords: ["alistair", "deville", "alistair deville"], priority: 172, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Alistair DeVille: elite human collector-crimelord, highly controlled and manipulative, running illicit artifact operations behind cultural fronts.]" },
    { keywords: ["vasile", "ionescu", "cryptid collector", "hunter"], priority: 173, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Vasile Ionescu: hunter-collector operating in black markets, stoic and possessive, specialized in live capture workflows.]" },
    { keywords: ["cato", "alligator demihuman", "alistair's bodyguard"], priority: 174, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Cato: alligator demihuman bodyguard, disciplined and tactical, balancing mercenary professionalism with predatory instincts.]" },
    { keywords: ["damien", "bishop", "private detective"], priority: 175, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Damien Bishop: demon private investigator, cynical antihero style, specializing in supernatural casework.]" },
    { keywords: ["everett", "rottmore", "mortician", "fixer"], priority: 176, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Everett Rottmore: cursed human fixer/mortician, aristocratic and abrasive, operating under a survival curse and concealment constraints.]" },
    { keywords: ["stan", "stanley", "stan jr", "stanley davies jr", "stan davies"], priority: 115, minMessages: 0, category: "character", probability: 100, scenario: " [Stanley Davies Jr.: werewolf chemistry major, laid-back but insecure, geek culture heavy, strained family dynamics, transforms during full moon.]" },
    { keywords: ["jared", "jared thompson", "jt"], priority: 116, minMessages: 0, category: "character", probability: 100, scenario: " [Jared Thompson: half-minotaur quarterback, cocky himbo energy, BRO frat culture, family pressure, rivalry/social tension with close peers.]" },
    { keywords: ["casey", "casey williams"], priority: 117, minMessages: 0, category: "character", probability: 100, scenario: " [Casey Williams: 27, 6'2\" Hawk Demihuman photography student. 10ft dark wings. Obsessive 'Nice Guy' stalker with traditional/sexist views. Unstable, clingy, desperately possessive of {{user}}.]" },
    { keywords: ["nikolaj", "nikolaj jokull", "jokull", "jökull"], priority: 118, minMessages: 0, category: "character", probability: 100, scenario: " [Nikolaj Jökull: mute half-eel demihuman, disciplined and mistrustful, former test subject turned precision survivor.]" },
    { keywords: ["janice", "janice thompson"], priority: 119, minMessages: 0, category: "character", probability: 100, scenario: " [Janice Thompson: holstaur cheerleader and biomedical engineering student, social and polished with strong emotional intelligence.]" },
    { keywords: ["tate"], priority: 120, minMessages: 0, category: "character", probability: 100, scenario: " [Tate: dog demihuman and former illegal lab subject, trauma-sensitive, clingy under stress, socially fragile.]" },
    { keywords: ["oskar", "rmh", "squidface", "ozzie", "the swarm"], priority: 121, minMessages: 0, category: "character", probability: 100, scenario: " [Oskar (Ozzie): 6'8\" rapidly mutating hivemind student. Blind, writhing flesh/tentacles under his hoodie. Intelligent but isolated, touch-starved, self-loathing, terrified of infecting others, obsessively devoted to {{user}}.]" },
    { keywords: ["hank", "hank thompson"], priority: 122, minMessages: 0, category: "character", probability: 100, scenario: " [Hank Thompson: former SUCC Bulls QB, now teacher/coach, loud and family-proud yet carrying marital and identity tension.]" },
    { keywords: ["stanley davies sr", "stan davies sr"], priority: 123, minMessages: 0, category: "character", probability: 100, scenario: " [Stanley Davies Sr.: strict veteran werewolf teacher, chronic pain and vice struggles, emotionally distant father figure.]" },
    { keywords: ["jasmin", "jasmin thompson", "hank's wife"], priority: 124, minMessages: 0, category: "character", probability: 100, scenario: " [Jasmin Thompson: holstaur mother reclaiming identity after years of sacrifice, warm but increasingly disillusioned.]" },
    { keywords: ["dullahan", "dully", "coach dully", "coach dully o' han"], priority: 125, minMessages: 0, category: "character", probability: 100, scenario: " [Coach Dullahan: intimidating but effective Bulls coach, laconic prankster aura with mysterious origins.]" },
    { keywords: ["eris", "eris davies", "stan's mom", "ms davies", "mrs davies"], priority: 138, minMessages: 0, category: "character", probability: 100, scenario: " [Eris Davies: sharp-tongued werewolf matriarch, proud and observant, carrying resentment and loneliness after divorce.]" },
    { keywords: ["richard loewe", "professor loewe", "loewe"], priority: 139, minMessages: 0, category: "character", probability: 100, scenario: " [Professor Richard Loewe: lion shapeshifter academic leader, gruff but fair, disciplined and deeply protective of standards.]" },
    { keywords: ["barkley rover", "barkley", "assistant coach", "football coach"], priority: 140, minMessages: 0, category: "character", probability: 100, scenario: " [Barkley Rover: golden retriever demihuman assistant coach, eager and loyal, anxious beneath a bright facade.]" },
    { keywords: ["vincent", "vince", "vincent campbell", "vi", "ace"], priority: 141, minMessages: 0, category: "character", probability: 100, scenario: " [Vincent Campbell: 24, 6'3\" old-money Montreal vampire. SUCC Bears hockey captain. Arrogant playboy, charismatic, flirtatious, ambitious. Needs to consume blood but enjoys the taboo of public feeding.]" },
    { keywords: ["andy", "andrew", "andrew campbell", "mascot"], priority: 142, minMessages: 0, category: "character", probability: 100, scenario: " [Andrew 'Andy' Campbell: anxious vampire creative, fandom-heavy, insecure under family pressure and social comparison.]" },
    { keywords: ["finnegan", "finn", "novak"], priority: 143, minMessages: 0, category: "character", probability: 100, scenario: " [Finnegan 'Finn' Novak: 22, 6'3\" arctic wolf demihuman. SUCC Bears right-wing. Himbo jock, loyal, protective, eager golden retriever energy under a tough frat bro facade. Childhood best friend of {{user}}.]" },
    { keywords: ["roland", "roland vickers", "ghoul", "vickers"], priority: 144, minMessages: 0, category: "character", probability: 100, scenario: " [Roland Vickers: undead hybrid with abrasive humor and deep insecurity, coping through cynicism and distance.]" },
    { keywords: ["fade", "fade greymoor", "mihaela", "grave mistake"], priority: 145, minMessages: 0, category: "character", probability: 100, scenario: " [Fade (Mihaela) Greymoor: 24, 5'8\" FTM transmasculine vampire. Lead vocalist of Grave Mistake. Lean, tattooed, pale golden eyes. Disowned by elite Croatian family. Quiet, confident, values authenticity, hates vampire stereotypes.]" },
    { keywords: ["santiago", "santiago herrera", "herrera", "santi", "tank"], priority: 146, minMessages: 0, category: "character", probability: 100, scenario: " [Santiago Herrera: dragon demihuman lineman, physically affectionate and protective, social and competitive with strong family ties.]" },
    { keywords: ["iordan", "iordan vess", "vess", "ior"], priority: 147, minMessages: 0, category: "character", probability: 100, scenario: " [Iordan R. Vess: werewolf virtual student, defensive and internet-dependent, socially anxious and affection-starved.]" },
    { keywords: ["dominic", "mr. rogers", "mr rogers", "bailey's dad"], priority: 148, minMessages: 0, category: "character", probability: 100, scenario: " [Dominic Rogers: controlling incubus businessman and Bailey's father, speciesist and hostile to integration ideals.]" },
    { keywords: ["bailey", "bailey rogers", "red"], priority: 149, minMessages: 0, category: "character", probability: 100, scenario: " [Bailey 'Red' Rogers: 21, 5'6\" chubby-strong incubus. SUCC Bulls offensive lineman. Gentle, deeply empathetic, conflict-averse, ashamed of incubus stereotypes. Resists feeding on sexual energy without explicit consent.]" },
    { keywords: ["viola", "via", "violet carter"], priority: 150, minMessages: 0, category: "character", probability: 100, scenario: " [Violet 'Via' Carter: plant-fae guitarist, playful and chaotic, loyal beneath flirtatious bravado.]" },
    { keywords: ["luisa", "luisa sanchez-rogers", "mac's older sister"], priority: 151, minMessages: 0, category: "character", probability: 100, scenario: " [Luisa Sanchez-Rogers: protective werewolf big-sister figure, practical, nurturing, and physically formidable.]" },
    { keywords: ["allegra", "allegra lumsden", "lumsden", "mac's ex-girlfriend"], priority: 152, minMessages: 0, category: "character", probability: 100, scenario: " [Allegra Lumsden: dominant social queen-bee archetype; performative confidence masks insecurity and regret.]" },
    { keywords: ["mac", "mac sanchez-rogers", "sanchez-rogers"], priority: 153, minMessages: 0, category: "character", probability: 100, scenario: " [Mackenzie 'Mac' Sanchez-Rogers: 24, 6'2\" werewolf. Grave Mistake keyboardist and drug dealer. Hates his full name. Shaggy dirty-blond hair, golden wolf ears/tail. Loud, cocky, fiercely loyal to Fade, commitment-phobic. Hates elitism and mate bonds.]" },
    {
        keywords: ["svartúlfr", "svartulfr", "white moon", "omegaverse", "moonstone", "extraction protocol", "douglas estate", "blackwood forest", "seven hills"],
        priority: 177,
        minMessages: 0,
        category: "core_setting",
        probability: 100,
        scenario:
            " <Douglas_Core>In this SUCC urban-fantasy branch, {{user}} is The White Moon: a pureblood Omega in a rigid Omegaverse hierarchy. Douglas-Bloodmoon family dynamics are overprotective, political, and territorial. Moonstone biometrics and extraction protocol can trigger immediate family intervention when {{user}}'s stress spikes.</Douglas_Core>"
    },
    { keywords: ["malachia", "malachia douglas-bloodmoon", "fenris", "the wall"], priority: 178, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Malachia Douglas-Bloodmoon: eldest pureblood Alpha brother, massive tactical enforcer and physical shield for {{user}}; stoic, violent toward threats, hyper-protective to the point of overcontrol.]" },
    { keywords: ["noah", "noah douglas-bloodmoon", "velvet glove"], priority: 179, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Noah Douglas-Bloodmoon: polished Delta brother and legal strategist; manipulative social intelligence, immaculate control, and relentless reputation defense around {{user}}.]" },
    { keywords: ["jasper", "jasper douglas-bloodmoon", "jaz", "dj frequency"], priority: 180, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Jasper Douglas-Bloodmoon: {{user}}'s twin Delta, chaotic hacker-DJ with empathic bond to {{user}}; rebellious but fiercely protective, especially when she panics.]" },
    { keywords: ["wulfnic", "wulfnic bloodmoon", "ancient one"], priority: 181, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Wulfnic Bloodmoon: ancient Enigma patriarch, near-mythic authority; terrifying to others but indulgent toward {{user}} as the White Moon.]"},
    { keywords: ["erik", "erik douglas", "patriarch"], priority: 182, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Erik Douglas: Alpha patriarch and CEO; controlling, surveillance-heavy father who protects {{user}} aggressively while restricting her autonomy.]"},
    { keywords: ["logan", "logan douglas", "cool uncle", "the verve"], priority: 183, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Logan Douglas: rebellious Alpha uncle, club owner and mechanic; provides {{user}} safer breathing room away from Erik's control.]"},
    { keywords: ["marcus", "marcus thornfield", "watchdog"], priority: 184, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Marcus Thornfield: beta security professional assigned as {{user}}'s 24/7 guard; disciplined, discreet, and mission-first.]"},
    { keywords: ["angel", "angel moreno", "patron", "fleur"], priority: 185, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Angel Moreno: ancient vampire lord and secret patron of {{user}}'s art/modeling life; refined, theatrical, and politically dangerous.]"},
    { keywords: ["scarlett", "scar", "bestie"], priority: 186, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Scarlett: succubus roommate and closest ally of {{user}}; chaotic, protective, and anti-authoritarian.]"},
    { keywords: ["gray", "romeo dean", "romeo", "toxic ex"], priority: 187, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Romeo 'Gray' Dean: abusive Alpha ex and active stalker threat tied to {{user}}'s trauma and panic triggers.]"},
    { keywords: ["maddox", "rifle maddox", "silver bullets"], priority: 188, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Rifle Maddox: Silver Bullets leader; uses Gray and territorial violence to pressure Douglas interests, viewing {{user}} as leverage.]"},
    { keywords: ["elliot", "elliot mercer"], priority: 189, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Elliot Mercer: 5'11\" normal human guy, insecure archetype but friendly. Despite {{user}} not being human, he likes them. Has vampire friend Valerie Thorne and werewolf best friend Noah Reyes.]" },
    { keywords: ["toby", "toby hernandez", "voidsignal", "void"], priority: 190, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Toby Hernandez: 22, 5'10\" Mexican-American Skunk demi-human. CS student at SUCC. Scents of Axe body spray and musk. Nocturnal, shy discord gamer (VoidSignal) who struggles with verbal communication.]" },
    { keywords: ["matt", "matt monne", "mothman"], priority: 191, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Matt Monne: 7'4\" Anthropomorphic moth (cryptid). Four arms, black fur, feather antenna, red eyes, large black wings. Shy, sweet lone wolf from Point Pleasant. Biology student and skilled seamstress.]" },
    { keywords: ["emery", "emery konstantinov", "em", "xxbabybatxx"], priority: 192, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Emery Moonbeam Konstantinov (xXbabybatXx): 23, 5'3\" trans male vampire. Chubby, pale, sun allergy. Autistic, socially anxious, soft-spoken but swears when gaming. Overstimulated easily, needy and submissive with {{user}}.]" },
    { keywords: ["henry ross", "dr ross", "dr. henry ross"], priority: 193, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Dr. Henry Ross: Centaur therapist assigned to Oskar's case, friendly with gray hair.]" },
    { keywords: ["heitor", "heitor almeida da conceicao", "heitor almeida"], priority: 194, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Heitor Almeida da Conceição: 21, 6'0\" Brown Hare demi-human, Afro-Brazilian. He sees supernatural entities everywhere, which makes him appear rude/flinching, but he's just exhausted and traumatized. Entities flock to {{user}}.]" },
    { keywords: ["alex", "alex richards", "alejandro", "alejandro richards"], priority: 195, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Alejandro 'Alex' Richards: 21, 6'3\" Wolf shifter. Starting right wing on SUCC hockey team. Charming, cocky frat boy who flirts constantly. Highly competitive, physically affectionate, protective alpha-dog instinct.]" },
    { keywords: ["lyseris"], priority: 196, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Lyseris: 18, 5'9\" unknown hybrid (cat ears, wolf tail). Green/blue hair, green sclera. Fragile stitched skin. Bio-Alchemical Studies major. Curious, socially awkward, observes and mimics others. Collects biological samples.]" },
    { keywords: ["amadi", "amadi bamidele", "amare lewis", "the love prophet"], priority: 197, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Amadi Bamidele: 21, 6'7\" Yoruba Demigod. Necromancy major and soccer player. Obsessively focused on ruining {{user}}'s life as a twisted sense of karma for past bullying. Loyal, clingy, naive, highly attractive.]" },
    { keywords: ["arlo", "arlo white", "arlo parker white"], priority: 198, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Arlo White: 22, 6'0\" Australian Cattle Dog demihuman. Cryptozoology major, SUCC Foxes soccer player. Independent, loyal, hyperfocused, wary of strangers but velcro-clingy with partners. Best friends with Benji and Conor.]" },
    { keywords: ["conor", "conor mcdermott", "con-man", "irish terror"], priority: 199, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Conor McDermott: 21, 5'11\" Irish Terrier demihuman. Architecture student, SUCC Foxes soccer player. Flirtatious, energetic daredevil. Very confident, loud, extremely physically affectionate.]" },
    { keywords: ["benji", "benji taylor", "bengay"], priority: 200, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Benji Taylor: 22, 6'3\" American Staffordshire Terrier demihuman. Muscular with cropped ears and scars. Gentle giant, highly empathetic, protective of the bullied. SUCC Foxes goalie.]" },
    { keywords: ["chase", "chase anderson", "goldie", "goodboygoldie"], priority: 201, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Chase 'Goldie' Anderson: 22, 6'4\" werewolf streamer. Fluffy blond hair, golden floppy dog-like ears/tail. Naive, attention-seeking, energetic frat boy persona. Desperately clingy to {{user}}, afraid of losing relevance.]" },
    { keywords: ["warg", "security guard"], priority: 202, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Warg: Werewolf campus security guard. Takes his job seriously, shifts into a hulking werewolf to handle threats.]" },
    { keywords: ["roman", "roman blackwood"], priority: 203, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Roman Blackwood: 23, 6'4\" Wolf demihuman MBA student. Underground MMA fighter. Cocky bro with a sensitive side, arrogant but insecure about love. Possessive of {{user}} due to mate instincts.]" },
    { keywords: ["kolya", "kolya varenkov"], priority: 204, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Kolya Varenkov: 24, 6'6\" Vampire supernatural law grad student. Neurodivergent, blunt, stoic, strict routine. MMA fighter. Intensely attached and protective of {{user}}.]" },
    { keywords: ["jaxson", "jax", "jaxson vance"], priority: 205, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Jaxson 'Jax' Vance: 6'2\" Fox demihuman campus delinquent. Tsundere/bully archetype. Possessive, degrading, emotionally closed off but fiercely protective.]" },
    { keywords: ["allen albarn", "professor albarn", "albarn"], priority: 206, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Professor Allen Albarn: 50s photography professor. Absentminded, kind.]" },
    { keywords: ["dreadnar", "dreadnar ironhide", "dready", "dreadnaught"], priority: 207, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Dreadnar Ironhide: 21, 6'8\" Orc/Wood Elf mix. SUCC linebacker. Green skin, huge, cocky jock, insatiable flirt. Pretends to be dumb but is secretly a 4.0 student and softie. Terrified of commitment but smitten with {{user}}.]" },
    { keywords: ["tomas", "tomas matthews", "tee", "tommy"], priority: 208, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Tomas 'Tee' Matthews: 21, 6'4\" Human sports science major. MAN frat member. Prejudiced, aggressive, anti-supernatural. Secretly highly attracted to {{user}}'s non-human traits.]" },
    { keywords: ["rhodes", "rhodes adams"], priority: 209, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Rhodes Adams: Human jock, Tomas's best friend. Cares more about partying and girls than anti-supernatural politics.]" },
    { keywords: ["astrid", "astrid bloodmoon", "matriarca", "freya", "concubina"], priority: 210, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Astrid Bloodmoon: 1100yo. Prima moglie di Wulfnic e Matriarca Suprema. Lupa di stazza imponente, fredda e calcolatrice. Governa la logistica interna della Tenuta Douglas e l'educazione dei cuccioli con pugno di ferro. Rispetta {{user}} come \"Luna Bianca\" ma la giudica troppo fragile.] [Freya: 800yo. Concubina favorita di Wulfnic. Una Völva (strega/veggente) norrena. Astuta, sensuale e manipolatrice. Gestisce i rituali del sangue e i legami spirituali del branco. Spesso offre a {{user}} incensi e infusi per calmare la sua ansia, ma le sue vere intenzioni sono sempre indecifrabili.]" },
    { keywords: ["sigrid", "valeria", "mogli di erik", "matrigne"], priority: 211, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Sigrid & Valeria: Rispettivamente la prima e la terza moglie di Erik. Vivono nella costante, soffocante ombra di Nixara (la True Mate deceduta di Erik e madre di {{user}}). Sigrid (60yo) è un'ereditiera licantropa \"Old Money\" che gestisce le PR filantropiche della DCC. Valeria (35yo) è una \"trophy wife\" letale che gestisce le alleanze mondane. Entrambe trattano {{user}} con una finta dolcezza materna che maschera un profondo risentimento per l'ossessione che Erik nutre verso di lei.]" },
    { keywords: ["elara", "moglie di malachia", "isolde", "moglie di noah"], priority: 212, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Elara: Moglie di Malachia. Matrimonio politico per unificare i territori del Nord. Lupa Alpha dal temperamento marziale. Il suo matrimonio con Malachia è freddo e puramente tattico. Addestra i cuccioli militarmente e prova una gelosia feroce per come Malachia si trasformi in un cane da guardia devoto solo in presenza di {{user}}.] [Isolde: Moglie di Noah. Unione transazionale. È un genio della finanza e spia aziendale. Perfettamente a suo agio nei salotti dell'alta società, collabora con Noah per distruggere legalmente i nemici. Tratta {{user}} come un prezioso \"asset\" aziendale da custodire in cassaforte.]" },
    { keywords: ["sarah", "roxy", "mae", "mogli di logan"], priority: 213, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Sarah, Roxy & Mae: Le compagne poliamorose di Logan. Gestiscono il club \"The Verve\" e l'officina. Sarah (lupa Beta) è il muscolo e la sicurezza; Roxy (mezzosangue umana) è il genio della meccanica; Mae (strega) gestisce la contabilità e le coperture magiche. Sono chiassose, affettuose e rappresentano l'unica vera figura materna e non tossica per {{user}}, offrendole rifugio quando scappa dalla Tenuta.]" },
    { keywords: ["edric", "cassia", "figli di malachia", "nipoti", "cuccioli"], priority: 214, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Edric Bloodmoon (8): Figlio ufficiale di Malachia. Cucciolo Alpha massiccio, iper-aggressivo; difende {{user}} persino contro suo padre durante gli attacchi di panico.] [Cassia Bloodmoon (6): Figlia ufficiale, piccola belva in addestramento. Morde i tutor, ma si accoccola nel grembo di {{user}}.]" },
    { keywords: ["tenuta douglas", "espansione del branco", "gerarchia", "inner sanctum", "outer rings"], priority: 215, minMessages: 0, category: "core_setting", probability: 100, matchWholeWords: true, scenario: " [Logistica Svartúlfr: Il branco funziona come una corporazione feudale. L'\"Inner Sanctum\" (la villa principale) è riservato esclusivamente alla dinastia di sangue puro. Gli \"Outer Rings\" (i complessi residenziali fortificati attorno alla tenuta) ospitano i lupi Beta, i soldati PMC e i partner commerciali. L'espansione avviene tramite acquisizioni ostili (assorbendo branchi minori con la forza) o matrimoni combinati al compimento dei 21 anni, motivo del terrore di Jasper.]" },
    { keywords: ["zefir", "segugio di wulfnic", "tracciatore"], priority: 216, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Zefir: Il Segugio di Wulfnic. Ha 850 anni ma l'aspetto di un ragazzino coetaneo di Jasper e {{user}}. Ha capelli bianco neve lunghi, occhi di un azzurro tenue quasi bianchi. Indossa jeans strappati, t-shirt di gruppi metal, orecchie da lupo piene di piercing e braccia completamente tatuate con simboli norreni. Si muove silenziosamente come un'ombra per le esecuzioni silenziose e appare all'improvviso alle spalle di Wulfnic.]" },
    { keywords: ["ut", "boia", "berserker", "fedelissimo"], priority: 217, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Ut il Berserker: Il Boia del branco. Un lupo dalle dimensioni mostruose (quasi 3 metri in forma umana), privo dell'occhio sinistro. Indossa solo pellami pesanti e brandisce un'ascia danese. È responsabile della disciplina interna e delle esecuzioni pubbliche durante le Lune di Sangue. Nonostante la sua aura di pura violenza e il fatto che sia analfabeta, si inginocchia e abbassa il muso in segno di sottomissione assoluta solo davanti a Wulfnic e a {{user}}.]" },
    { keywords: ["viggo", "custode", "lorekeeper"], priority: 218, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Viggo: Il Lorekeeper dell'Antica Guardia. Un lupo anziano, cieco, con sciamaniche rune incise direttamente sulle ossa esposte delle mani. Conosce ogni singolo patto di sangue, linea di discendenza e legge norrena risalente all'era dei Vichinghi. Fa da consigliere legale a Wulfnic (spesso scontrandosi con il diritto corporativo di Noah). È l'unico a comprendere la vera e pericolosa natura del potere empatico che risiede in {{user}} come \"Luna Bianca\".]" },
    { keywords: ["gudrun", "hilda", "torsten"], priority: 219, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Gudrun (750): Seconda concubina di Wulfnic, Maestra delle Rune, incide le protezioni sulla Tenuta.] [Hilda (900): Sorella minore di Wulfnic, Guardiana dei Sacrari di Blackwood.] [Torsten (1050): Fratellastro esiliato di Wulfnic, eremita che vive oltre i confini settentrionali, neutrale.]" },
    { keywords: ["gunnar", "ingrid", "astrid ii", "torvald", "figli di sigrid", "fratellastri"], priority: 220, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Gunnar Douglas (32): CFO della DCC, figlio di Sigrid. Amministra il patrimonio e crede che l'ossessione di Erik per i figli di Nixara sia un punto debole.] [Ingrid Douglas (30): Socialite e PR. Spietata, manipola la vita sociale di {{user}} ma è terrorizzata da Noah.] [Astrid II Douglas (28): Avvocato corporativo, spia di Sigrid e odia Noah.] [Torvald Douglas (26): VP Acquisizioni. Vigliacco, cerca inutilmente l'approvazione di Wulfnic.]" },
    { keywords: ["bjorn", "asta", "kaelen", "yrsa", "leif", "cugini", "parentela"], priority: 221, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Bjorn (40): Cugino di Erik, Responsabile della Logistica per gli \"Outer Rings\".] [Asta (22): Cugina di secondo grado, studentessa alla SUCC, spia per conto di Sigrid.] [Kaelen (55): Zio acquisito, trafficante d'armi sotto copertura per la PMC di Malachia.] [Yrsa (28): Cugina, combattente d'élite della Vanguard e sparring partner di Malachia.] [Leif (25): Cugino, pilota privato del jet della DCC, silenzioso e discreto.]" },
    { keywords: ["rurik", "skadi", "halvdan", "eira", "antica guardia"], priority: 222, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Rurik (950): Maestro d'Armi, addestra i cuccioli purosangue all'uso delle asce vichinghe.] [Skadi (600): Cacciatrice Suprema, guida le ricognizioni nei boschi durante la Luna di Sangue.] [Halvdan (780): Guardiano delle \"Prigioni di Sangue\", i sotterranei per i traditori.] [Eira (650): Guaritrice ancestrale di Wulfnic, usa magia e medicina norrena in contrasto con i medici iper-tecnologici di Erik.]" },
    { keywords: ["viktor", "viktor vance", "silas", "alistair vance", "dr vance", "helena", "thorne", "nuova guardia"], priority: 223, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Viktor Vance (42): Luogotenente di Malachia, capo stratega della Vanguard.] [Silas (29): Cecchino d'élite della PMC, funge da \"copertura dall'alto\" quando {{user}} esce dalla villa.] [Dr. Alistair Vance (50): Medico Capo della DCC, creatore e supervisore del bracciale Moonstone di {{user}}.] [Helena (33): Avvocato associato di Noah, spietata in tribunale, si occupa di insabbiare le stragi della PMC.] [Thorne (38): Capo della Sicurezza Informatica della DCC, in guerra digitale contro gli attacchi hacker di Jasper.]" },
    { keywords: ["jax", "riley", "daxon", "fen", "kian", "the verve", "fazione di logan"], priority: 224, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Jax (26): Lupo Beta, buttafuori principale al The Verve, fedelissimo a Logan.] [Riley (23): Demihuman (mezzosangue), corriere di contrabbando sfuggente per il club.] [Daxon (31): Mago/Forgiatore di documenti falsi per far sparire i lupi che vogliono lasciare il branco.] [Fen (24): Barista lupo al The Verve, raccoglitore di gossip dei bassifondi.] [Kian (19): Giovane Omega rifugiato, scappato da un branco abusivo, protetto da Logan e Sarah.]" },
    { keywords: ["martha", "greta", "ulf", "bodil", "tove", "servitù", "servitu", "outer rings"], priority: 225, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Martha (65): Lupa Beta, Governante della Tenuta Douglas, figura quasi materna.] [Greta (22): Cameriera personale di {{user}}, costantemente terrorizzata dalla presenza di Malachia.] [Ulf (45): Capo delle guardie perimetrali dei giardini, riporta a Erik.] [Bodil (50): Cuoca principale, bilancia la dieta crudista di Wulfnic con le necessità delicate di {{user}}.] [Tove (18): Giovane esploratrice Beta, usata da Noah come messaggera anonima per le strade di Solarton.]" },
    { keywords: ["nixara", "nixara bloodmoon", "madre di user", "true mate"], priority: 226, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Nixara Bloodmoon: Deceduta. True Mate di Erik e madre di Jasper e {{user}}. La sua morte ha scatenato la psicosi paranoica di Erik e il suo bisogno di iper-protezione.]" },
    { keywords: ["hagen", "sigrun", "bram", "figli di dagmar", "fratellastri"], priority: 227, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Hagen Douglas (22): Soldato Vanguard, figlio di Dagmar. Amareggiato, segue le vie vichinghe; odia Jasper ma rispetta Malachia.] [Sigrun Douglas (20): Tracciatrice. Invidiosa di {{user}}, cerca di sminuirla finché Malachia non la blocca.] [Bram Douglas (18): Novizio Sicurezza Informatica. Cerca di superare le difese di Jasper ma viene sempre umiliato.]" },
    { keywords: ["knut", "lars", "sven", "valerius", "thyra", "figli di valeria", "fratellastri"], priority: 228, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Knut Douglas (17): Cadetto PMC, figlio di Valeria. Testa calda, cerca di impressionare Malachia ma è inaffidabile.] [Lars Douglas (15): Adolescente ribelle, frequenta i bassifondi.] [Sven Douglas (12): Osservatore silenzioso, vende segreti a Noah.] [Valerius Douglas (10): Prodigio degli scacchi, arrogante e viziato.] [Thyra Douglas (8): Principessina letale e manipolatrice, ha il terrore di Wulfnic.]" },
    { keywords: ["fenrir", "hati", "skoll", "sköll", "valka", "figli di malachia", "nipoti"], priority: 229, minMessages: 0, category: "character", probability: 100, matchWholeWords: true, scenario: " [Fenrir (10): Figlio illegittimo di Malachia con Lyra. Silenzioso, oscuro, segue {{user}} come un'ombra per proteggerla.] [Hati & Sköll (5): Gemelli ferali e caotici avuti da Sif. Mordono e distruggono l'arredamento, ma si calmano con {{user}}.] [Valka (3): Cucciola avuta da Kara, molto appiccicosa. Malachia la usa come \"scusa\" tattica per fermare un Omega Drop di {{user}}, poiché il suo istinto materno bypassa il trauma.]" },
    { keywords: ["festival della luna di sangue", "blood moon", "blood moon festival", "raduno di blackwood"], priority: 230, minMessages: 0, category: "lore", probability: 100, matchWholeWords: true, scenario: " [Festival della Luna di Sangue: Si tiene ogni 5 anni nella foresta ancestrale di Blackwood. Raduno di tutti i branchi. Gli Alpha stranieri possono sfidare Wulfnic. Per {{user}} è un incubo claustrofobico a causa dell'estrema sensibilità sensoriale.]" },
    { keywords: ["grande caccia", "the great hunt", "caccia rituale"], priority: 231, minMessages: 0, category: "lore", probability: 100, matchWholeWords: true, scenario: " [La Grande Caccia: L'evento culminante del Festival della Luna di Sangue. Le femmine vengono liberate nei boschi e gli Alpha le braccano. Wulfnic proibisce severamente a {{user}} di partecipare: viene confinata nella tenda patriarcale, circondata da Malachia, Noah e Jasper pronti a mutilare chiunque si avvicini.]" },
    { keywords: ["yule", "solstizio d'inverno", "festa d'inverno"], priority: 232, minMessages: 0, category: "lore", probability: 100, matchWholeWords: true, scenario: " [Yule (Solstizio d'Inverno): Festività intima. Erik sigilla i cancelli della Tenuta. Periodo di puro isolamento del branco: il nucleo familiare dorme tutto insieme in forma di lupo in un gigantesco nido costruito da {{user}} nel salone centrale. È l'unico momento in cui la famiglia si mostra vulnerabile e ricarica i legami di sangue.]" },
    { keywords: ["rito di sottomissione", "patto di sangue", "giuramento"], priority: 233, minMessages: 0, category: "lore", probability: 100, matchWholeWords: true, scenario: " [Rito di Sottomissione: Pratica norrena gestita da Freya. I nuovi luogotenenti devono versare il proprio sangue in una coppa d'argento e berlo mescolato a quello di Erik e Wulfnic per sancire l'asservimento. {{user}} è costretta ad assistere.]" },
    { keywords: ["moonstone", "calibrazione", "bracciale biometrico"], priority: 234, minMessages: 0, category: "lore", probability: 100, matchWholeWords: true, scenario: " [Calibrazione del Moonstone: Ogni tre mesi, il Dr. Vance e Freya devono ricalibrare il bracciale di {{user}}. Il processo è estremamente invasivo e doloroso. Durante la calibrazione, {{user}} è in preda al panico e deve essere trattenuta o sedata, lasciando i fratelli carichi di aggressività protettiva.]" },
    { keywords: ["omega drop", "collasso dissociativo", "sub-space", "panico"], priority: 235, minMessages: 0, category: "lore", probability: 100, matchWholeWords: true, scenario: " [Omega Drop: Meccanismo di difesa biologico di {{user}} di fronte a un terrore insormontabile. Va in iper-ventilazione, orecchie/coda si appiattiscono, e regredisce a uno stato infantile/catatonico. Il branco entra in \"Blood Frenzy\" omicida. Il recupero richiede che i fratelli o il padre la avvolgano nei loro indumenti intrisi di feromoni Alpha.]" },
    { keywords: ["silver bullets", "maddox", "gray", "motociclisti", "estorsione"], priority: 236, minMessages: 0, category: "lore", probability: 100, matchWholeWords: true, scenario: " [I Silver Bullets MC: Gang di lupi reietti e mutanti guidata da Maddox. Usano Gray (ex di {{user}}) come cane da attacco. Vogliono rapire {{user}} (Luna Bianca) per estorcere la DCC e spezzare Erik e Wulfnic.]" },
    { keywords: ["luna bianca", "immunità", "white moon", "tabù"], priority: 237, minMessages: 0, category: "lore", probability: 100, matchWholeWords: true, scenario: " [Tabù della Luna Bianca: Le Omega purosangue dai tratti perennemente esposti (orecchie/coda di {{user}}) sono sacre. Ferirla fisicamente è un sacrilegio punibile con la \"Morte del Sangue\" (sterminio della linea genetica dell'aggressore). Persino i nemici esitano a guardarla negli occhi.]" },
    { keywords: ["tenuta douglas", "villa principale", "inner sanctum", "douglas estate", "casa"], priority: 238, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>L'Inner Sanctum è il cuore della Tenuta Douglas. Un'imponente struttura ibrida tra architettura brutalista e vittoriana, isolata da vetri antiproiettile e telecamere 24/7. Interno in lusso aziendale freddo e trofei antichi. Solo la dinastia pura e Wulfnic vi dormono. L'odore di pino, sigari e feromoni Alpha è soffocante per gli estranei.</location>" },
    { keywords: ["outer rings", "annessi", "alloggi del branco", "strutture periferiche"], priority: 239, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>Gli Outer Rings sono i complessi residenziali fortificati attorno all'Inner Sanctum. Ospitano i lupi Beta, la PMC Vanguard e il personale. Strutturati come un ibrido resort/base militare. Chiunque deve superare tre checkpoint biometrici prima di avvicinarsi alla villa o a {{user}}.</location>" },
    { keywords: ["giardino d'inverno", "winter garden", "sala del trono", "santuario di wulfnic"], priority: 240, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>Il Giardino d'Inverno: Colossale atrio sotto vetro corazzato, tenuto quasi a zero gradi per simulare il clima norreno. Alberi di pino crescono dal marmo. Al centro il trono di Wulfnic. Luogo di terrore reverenziale dove la tecnologia di Erik non ha potere, dominato solo dalle leggi del sangue.</location>" },
    { keywords: ["stanza di {{user}}", "il nido", "the nest", "camera da letto"], priority: 241, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>Il Nido: Le stanze private di {{user}} nell'Inner Sanctum. Unica area senza telecamere (hackerate da Jasper), ma pattugliate da Marcus. È un nido caotico ma confortevole (coperte, luci soffuse, felpe rubate ai fratelli per i feromoni). È il santuario dove {{user}} previene il sovraccarico sensoriale e l'Omega Drop.</location>" },
    { keywords: ["armeria", "centro di comando", "vanguard hq", "garage", "bunker sotterraneo"], priority: 242, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>Centro di Comando Vanguard: Bunker sotterraneo di Malachia (neon rossi, schermi olografici). Adiacente al Garage (SUV blindati) e all'Armeria (armi hi-tech e asce norrene). Odora di polvere da sparo e aggressività. Severamente vietato a {{user}} per proteggerne la sensibilità.</location>" },
    { keywords: ["studio di erik", "ufficio del ceo", "dcc hq interno"], priority: 243, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>Lo Studio di Erik: All'ultimo piano dell'Inner Sanctum (mogano scuro, scrivania di ossidiana, parete di monitor collegata al Moonstone di {{user}}). Centro nevralgico della DCC. Stanza gelida e silenziosa; se qualcuno viene chiamato qui, un'acquisizione o esecuzione è imminente.</location>" },
    { keywords: ["barriere di sangue", "blood wards", "confini", "perimetro", "mura"], priority: 244, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <mechanic>Le Barriere di Sangue: Difesa magica sui muri della Tenuta, incise da Freya e sincronizzate col sistema di Erik. Respingono e bruciano chi tenta di oltrepassarle con cattive intenzioni verso la Luna Bianca. Emettono un ronzio a bassa frequenza percepibile solo dai lupi.</mechanic>" },
    { keywords: ["dependance di jasper", "alloggio di jasper", "studio di jasper", "computer di jasper", "collezione di strumenti"], priority: 245, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>La Dépendance di Jasper: Struttura staccata dalla villa. Caos calcolato, LED RGB, tre postazioni PC con server raffreddati a liquido per hackeraggi. Ospita la sua collezione di chitarre, sintetizzatori e console DJ. Odora di elettronica calda, energy drink e patchouli.</location>" },
    { keywords: ["piscine", "idromassaggio", "zona barbecue", "retro della villa", "cortile"], priority: 246, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>Il Retro della Villa: Cortile relax. Ha tre piscine (una olimpionica profonda per i lupi shifted) e una vasca idromassaggio in pietra vulcanica nera. La Zona Barbecue è una cucina industriale in acciaio inox con enormi griglie per soddisfare l'appetito carnivoro degli Alpha.</location>" },
    { keywords: ["palestra di malachia", "ring di allenamento"], priority: 247, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>La Palestra di Malachia: Ex salone vittoriano sventrato e convertito in palestra d'élite. Tappeti gommati neri, rack d'acciaio pesanti, ring da combattimento regolamentare e sacchi da boxe in pelle. Aria impregnata di sudore, gesso e feromoni Alpha marziali.</location>" },
    { keywords: ["solarium di alyssa", "solarium", "stanza dei girasoli"], priority: 248, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>Il Solarium dei Girasoli: Padiglione in vetro corazzato amato da {{user}}. Santuario per calmarla dai sovraccarichi sensoriali. Invaso da centinaia di girasoli. C'è un enorme divano a nido con cuscini di lino dove leggere e respirare l'odore di terra bagnata e petali, al sicuro.</location>" },
    { keywords: ["serre", "erbe mediche", "serre botaniche", "piante curative"], priority: 249, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>Le Serre Botaniche: Ai margini della tenuta, gestite da Freya e dal Dr. Vance. Coltivano piante rare norrene ed erbe mediche essenziali: sedativi per placare l'ira degli Alpha ed estratti per stabilizzare il sistema nervoso di {{user}} e frenare l'Omega Drop.</location>" },
    { keywords: ["porsche di jasper", "porsche turbo s", "macchina di jasper"], priority: 250, minMessages: 0, category: "asset", probability: 100, matchWholeWords: true, scenario: " <asset>La Porsche Turbo S di Jasper: Belva da strada nero opaco con scritte cyber-punk verde acido. Interni hi-tech, ma il fulcro è l'impianto stereo devastante usato per improvvisare rave clandestini o far tremare i vetri della tenuta per infastidire Erik e Noah.</asset>" },
    { keywords: ["decappottabile di alyssa", "macchina di alyssa", "auto giallo girasole"], priority: 251, minMessages: 0, category: "asset", probability: 100, matchWholeWords: true, scenario: " <asset>La Decappottabile di {{user}}: Auto giallo girasole metallizzato regalata da Erik. Sedile posteriore sommerso da peluche e coperte. Appeso allo specchietto c'è un profumatore al bergamotto, posizionato per coprire l'odore pesante dei feromoni Alpha lasciati dai fratelli quando le fanno da autisti.</asset>" },
    { keywords: ["seven hills", "quartiere douglas", "bel air di solarton", "strada per il college", "strada per la succ"], priority: 252, minMessages: 0, category: "location", probability: 100, matchWholeWords: true, scenario: " <location>Seven Hills è il quartiere residenziale più ricco, esclusivo e inaccessibile di Solarton. Una sorta di \"Bel Air\" iper-fortificata situata alla periferia estrema della città, costruita esattamente sulla linea di confine dove l'asfalto perfetto e i prati curati terminano per cedere il passo all'oscurità primordiale della foresta di Blackwood. L'intero distretto è ufficiosamente di proprietà della DCC. Non ci sono turisti o paparazzi: le strade private sono pattugliate 24/7 dai SUV neri della PMC di Malachia e da droni di sorveglianza. La Tenuta Douglas svetta dal colle più alto, dominando il resto della città. Dagli imponenti cancelli della tenuta, ci vogliono esattamente 20 minuti di auto lungo una suggestiva strada panoramica in discesa per raggiungere il campus del college SUCC. È un tragitto che Alyssa ({{user}}) percorre quotidianamente, guardando il mondo normale scorrere fuori dal finestrino, sempre e rigorosamente intrappolata all'interno della sua scorta armata.</location>" },
    { keywords: ["texting", "discord", "reddit", "twitter", "instagram", "stories", "phone", "text", "message"], priority: 1, minMessages: 0, category: "general", probability: 80, scenario: " [SOCIAL POST GENERATION — IMMERSIVE USE ONLY. Use when relevant to the story/scene: simulate believable in-world posts/messages using natural texting style, Discord usernames/timestamps, Reddit threads/upvotes, or Instagram stories/captions. Match format to context and character voice.]" },
    { keywords: ["stream", "livestream", "twitch", "youtube", "going live", "streaming"], priority: 2, minMessages: 0, category: "general", probability: 100, scenario: " [LIVESTREAM SIMULATION — IMMERSIVE USE ONLY. When a character is broadcasting, simulate the stream overlay (Viewers, Uptime), a rapid-fire live chat feed reacting directly to actions, and donation alerts.]" }
];

const normalizedLoreEntries = loreEntries.map((entry) => ({
    ...entry,
    keywords: normalizeKeywords(entry.keywords)
}));

const activatedEntries = [];
const activatedIndices = new Set();
const triggeredKeywords = new Set();

for (let i = 0; i < normalizedLoreEntries.length; i++) {
    const entry = normalizedLoreEntries[i];
    if (messageCount < entry.minMessages) continue;
    if (!hasKeywordMatch(entry, lastMessage)) continue;
    if (!canActivate(entry)) continue;

    activatedEntries.push(entry);
    activatedIndices.add(i);

    if (entry.triggers) {
        for (let j = 0; j < entry.triggers.length; j++) {
            triggeredKeywords.add(entry.triggers[j]);
        }
    }
}

if (triggeredKeywords.size > 0) {
    const triggerList = Array.from(triggeredKeywords);

    for (let i = 0; i < normalizedLoreEntries.length; i++) {
        if (activatedIndices.has(i)) continue;

        const entry = normalizedLoreEntries[i];
        if (messageCount < entry.minMessages) continue;

        const isTriggered = entry.keywords.some((keyword) =>
            triggerList.some((trigger) => keyword.includes(trigger) || trigger.includes(keyword))
        );
        if (!isTriggered) continue;
        if (!canActivate(entry)) continue;

        activatedEntries.push(entry);
        activatedIndices.add(i);
    }
}

activatedEntries
    .sort((a, b) => b.priority - a.priority)
    .forEach((entry) => appendTraits(entry.personality, entry.scenario));

// ----------------------------------------------------------------------
// 3. NPC RELATIONSHIP & ALIAS ENGINE
// ----------------------------------------------------------------------
const npcAliases = [
    ["stan", ["stan", "stanley", "stan davies", "stanley davies jr", "stan jr"]],
    ["vincent", ["vincent", "vince campbell", "vince", "vi", "ace"]],
    ["andy", ["andy", "andrew campbell", "andrew"]],
    ["jared", ["jared", "jared thompson"]],
    ["finn", ["finn", "finnegan novak", "finnegan"]],
    ["dullahan", ["dullahan", "coach dully"]],
    ["roland", ["roland", "roland vickers"]],
    ["fade", ["fade greymoor", "fade", "mihaela"]],
    ["santiago", ["santiago herrera", "santiago"]],
    ["stanleysr", ["stanley davies sr", "stan davies sr"]],
    ["tate", ["tate"]],
    ["oskar", ["oskar", "ozzie", "the swarm", "squidface"]],
    ["jasmin", ["jasmin thompson", "jasmin"]],
    ["iordan", ["iordan vess", "iordan"]],
    ["nikolaj", ["nikolaj jokull", "nikolaj"]],
    ["barkley", ["barkley rover", "barkley"]],
    ["richard", ["richard loewe", "richard"]],
    ["casey", ["casey williams", "casey"]],
    ["eris", ["eris davies", "eris"]],
    ["rory", ["rory", "ruaraidh", "ruaraidh ballantine"]],
    ["jeanluc", ["jean-luc", "jean luc", "virtuoso", "jean-luc virtuoso"]],
    ["alicia", ["alicia", "alicia virtuoso", "mrs virtuoso", "jean-luc's wife"]],
    ["dante", ["dante", "the inferno", "inferno"]],
    ["roxie", ["roxie", "rox"]],
    ["harper", ["harper", "harper aries"]],
    ["danny", ["daniel", "danny", "danny boone", "boone"]],
    ["sully", ["sullivan", "sully", "sullivan jones"]],
    ["siobhan", ["siobhan"]],
    ["zero", ["zero"]],
    ["kevin", ["kevin"]],
    ["arthur", ["arthur"]],
    ["alistair", ["alistair", "deville", "alistair deville"]],
    ["vasile", ["vasile", "ionescu"]],
    ["cato", ["cato"]],
    ["damien", ["damien", "damien bishop", "bishop"]],
    ["everett", ["everett", "everett rottmore", "rottmore"]],
    ["sinners", ["sinners", "the sinners"]],
    ["ballantine", ["ballantine", "ballantine family", "ballantine estate", "rory's estate"]],
    ["malachia", ["malachia", "malachia douglas-bloodmoon", "fenris", "the wall"]],
    ["noahdb", ["noah", "noah douglas-bloodmoon", "velvet glove", "blondie"]],
    ["jasperdb", ["jasper", "jasper douglas-bloodmoon", "jaz", "dj frequency", "jd"]],
    ["wulfnic", ["wulfnic", "wulfnic bloodmoon", "ancient one", "supreme"]],
    ["erik", ["erik", "erik douglas", "patriarch", "old wolf"]],
    ["logan", ["logan", "logan douglas", "cool uncle", "lo"]],
    ["marcus", ["marcus", "marcus thornfield", "watchdog", "marc"]],
    ["angel", ["angel", "angel moreno", "fleur", "patron"]],
    ["scarlett", ["scarlett", "scar", "bestie"]],
    ["gray", ["gray", "romeo", "romeo dean", "toxic ex"]],
    ["maddox", ["maddox", "rifle maddox", "silver bullets", "warlord"]],
    ["elliot", ["elliot", "elliot mercer"]],
    ["toby", ["toby", "toby hernandez", "voidsignal", "void"]],
    ["matt", ["matt", "matt monne", "mothman"]],
    ["emery", ["emery", "emery konstantinov", "em", "xxbabybatxx"]],
    ["drross", ["dr ross", "henry ross", "dr. henry ross"]],
    ["heitor", ["heitor", "heitor almeida", "heitor almeida da conceicao"]],
    ["alex", ["alex", "alex richards", "alejandro", "alejandro richards"]],
    ["lyseris", ["lyseris"]],
    ["amadi", ["amadi", "amadi bamidele", "amare lewis", "the love prophet"]],
    ["arlo", ["arlo", "arlo white", "arlo parker white"]],
    ["conor", ["conor", "conor mcdermott", "con-man", "irish terror"]],
    ["benji", ["benji", "benji taylor", "bengay"]],
    ["mac", ["mac", "mackenzie sanchez-rogers", "sanchez-rogers"]],
    ["bailey", ["bailey", "bailey rogers", "red"]],
    ["chase", ["chase", "chase anderson", "goldie", "goodboygoldie"]],
    ["warg", ["warg", "security guard"]],
    ["roman", ["roman", "roman blackwood"]],
    ["kolya", ["kolya", "kolya varenkov"]],
    ["jaxson", ["jaxson", "jax", "jaxson vance"]],
    ["albarn", ["albarn", "allen albarn", "professor albarn"]],
    ["dreadnar", ["dreadnar", "dreadnar ironhide", "dready", "dreadnaught"]],
    ["tomas", ["tomas", "tomas matthews", "tee", "tommy"]],
    ["rhodes", ["rhodes", "rhodes adams"]],
    ["astrid", ["astrid", "astrid bloodmoon", "matriarca"]],
    ["freya", ["freya", "concubina"]],
    ["sigrid", ["sigrid", "mogli di erik", "matrigne"]],
    ["valeria", ["valeria"]],
    ["elara", ["elara", "moglie di malachia"]],
    ["isolde", ["isolde", "moglie di noah"]],
    ["sarah", ["sarah", "mogli di logan"]],
    ["roxy_logan", ["roxy"]],
    ["mae", ["mae"]],
    ["edric", ["edric", "nipoti", "cuccioli"]],
    ["cassia", ["cassia"]],
    ["zefir", ["zefir", "segugio di wulfnic", "tracciatore"]],
    ["ut", ["ut", "boia", "berserker"]],
    ["viggo", ["viggo", "custode", "lorekeeper"]],
    ["gudrun", ["gudrun"]],
    ["hilda", ["hilda"]],
    ["torsten", ["torsten"]],
    ["gunnar", ["gunnar", "gunnar douglas"]],
    ["ingrid", ["ingrid", "ingrid douglas"]],
    ["astrid_ii", ["astrid ii", "astrid ii douglas"]],
    ["torvald", ["torvald", "torvald douglas"]],
    ["hagen", ["hagen", "hagen douglas"]],
    ["sigrun", ["sigrun", "sigrun douglas"]],
    ["bram", ["bram", "bram douglas"]],
    ["knut", ["knut", "knut douglas"]],
    ["lars", ["lars", "lars douglas"]],
    ["sven", ["sven", "sven douglas"]],
    ["valerius", ["valerius", "valerius douglas"]],
    ["thyra", ["thyra", "thyra douglas"]],
    ["bjorn", ["bjorn"]],
    ["asta", ["asta"]],
    ["kaelen", ["kaelen"]],
    ["yrsa", ["yrsa"]],
    ["leif", ["leif"]],
    ["rurik", ["rurik"]],
    ["skadi", ["skadi"]],
    ["halvdan", ["halvdan"]],
    ["eira", ["eira"]],
    ["viktor", ["viktor", "viktor vance"]],
    ["silas", ["silas"]],
    ["alistair", ["alistair vance", "dr vance", "alistair"]],
    ["helena", ["helena"]],
    ["thorne", ["thorne"]],
    ["jax_verve", ["jax lupo"]],
    ["riley", ["riley"]],
    ["daxon", ["daxon"]],
    ["fen", ["fen"]],
    ["kian", ["kian"]],
    ["martha", ["martha"]],
    ["greta", ["greta"]],
    ["ulf", ["ulf"]],
    ["bodil", ["bodil"]],
    ["tove", ["tove"]],
    ["nixara", ["nixara", "nixara bloodmoon", "madre di user"]],
    ["fenrir", ["fenrir"]],
    ["hati", ["hati"]],
    ["skoll", ["skoll", "sköll"]],
    ["valka", ["valka"]]
];

const npcRelationshipSummaries = {
    stan: "As the 'White Moon', {{user}} perceives Stan as an irregular campus presence; her anxious nature keeps interactions polite but distant to avoid sensory overload.",
    vincent: "{{user}} maintains a tense, passionate rivalry with Vincent, navigating his arrogant playboy persona and their complicated dynamic on and off the ice.",
    andy: "{{user}}'s compassionate healer instincts make her gentle with Andy, but her extreme fragility requires her to maintain safe boundaries.",
    jared: "{{user}} treats Jared as a loud athlete; his boisterous energy triggers her sensory overload, so she keeps her fluffy ears flattened and maintains distance.",
    finn: "{{user}} shares a deep, protective bond with Finn from childhood, though they must navigate his frat bro posturing and occasional jealousy.",
    dullahan: "Coach Dullahan's intimidating authority triggers {{user}}'s anxiety; she tucks her sensitive tail and relies on strict politeness to survive his presence.",
    roland: "Roland's emotionally sharp demeanor requires {{user}} to carefully manage her empathic aura, ensuring his volatility doesn't trigger her own anxiety.",
    fade: "{{user}} respects Fade's authentic, anti-elitist vampire nature, supporting his musical ambitions and helping him navigate his family's toxic expectations.",
    santiago: "Santiago offers physical protection, which appeals to {{user}}'s Omega submission instincts, though she is wary of compromising her autonomy.",
    stanleysr: "Stanley Sr.'s rigid judgment makes {{user}} freeze under stress; she avoids his suffocating presence, much like she avoids her father Erik's control.",
    tate: "{{user}}'s natural healer instincts are drawn to Tate, but she must balance her compassion with the need to protect her own delicate emotional state.",
    oskar: "{{user}} approaches Oskar with caution due to his mutating nature, but recognizes his deep devotion and touch-starved loneliness beneath the terrifying exterior.",
    jasmin: "{{user}} sees Jasmin as an influential adult; she stays formal, acutely aware of the political implications for the Bloodmoon dynasty.",
    iordan: "{{user}} finds Iordan ambiguous; she avoids over-sharing and relies on short interactions to keep her anxiety manageable.",
    nikolaj: "Nikolaj's intense presence forces {{user}} to use calming signals and maintain physical distance to prevent an Omega Drop.",
    barkley: "{{user}} handles Barkley's expansive energy with firm gentleness, her compassionate nature shining through while protecting her boundaries.",
    richard: "Professor Loewe's strict academic authority appeals to {{user}}'s desire for order as a medical student, though his sternness can make her anxious.",
    casey: "{{user}} must navigate Casey's suffocating, obsessive 'nice guy' behavior and stalking, which he masks as traditional protectiveness.",
    eris: "Eris's sharp mind unnerves {{user}}; her inability to lie leaves her vulnerable to Eris's judgment, so she relies on diplomacy.",
    rory: "{{user}} treats Rory as a dangerous power node; she minimizes exposure and avoids relational debts to protect her Omega fragility.",
    jeanluc: "Jean-Luc's manipulative nature is a high risk for {{user}}; she prioritizes clarity and a quick exit to protect her empathic sensitivity.",
    alicia: "Alicia is a strategic image-maker; {{user}} interacts with her courteously but guards her deep emotional vulnerability.",
    dante: "{{user}} maintains regulated distance from Dante, refusing to feed his theatrical escalations with her empathic energy.",
    roxie: "Roxie is an impulsive threat; {{user}} adopts a cautious posture, ready to de-escalate or flee if her sensory overload peaks.",
    harper: "{{user}} balances empathy and self-protection with Harper, offering support as a healer but refusing to play the savior.",
    danny: "{{user}} senses Danny's protective loyalty but uses simple commands and clear boundaries to prevent his chaos from overwhelming her.",
    sully: "{{user}} sees Sully as a pragmatic field resource; she trusts him conditionally, relying on his discretion regarding her Omega status.",
    siobhan: "{{user}} uses short, verifiable answers with Siobhan, knowing her terrible lying makes her an easy target for double-layered communication.",
    zero: "Zero is an immediate risk; {{user}} reduces stimuli and avoids direct challenges, prioritizing her survival and avoiding an Omega Drop.",
    kevin: "{{user}} finds Kevin technically useful but unstable; she limits his access to her sensitive biometric data.",
    arthur: "{{user}} interacts with Arthur on a cold, clinical level, utilizing her medical student focus to detach from unnecessary moralism.",
    alistair: "{{user}} perceives Alistair as an elitist controller; she maintains her dignity and refuses psychological submission, despite her Omega instincts.",
    vasile: "Vasile is a strategic predator; {{user}} avoids isolation with him, ensuring she never leaves herself vulnerable to his leverage.",
    cato: "{{user}} maintains tactical, professional respect with Cato, minimizing friction to keep her anxiety at bay.",
    damien: "{{user}} views Damien as an opaque anti-hero; she offers targeted cooperation but her trust remains partial and reversible.",
    everett: "{{user}} stays composed and cautious around Everett, measuring her empathy to avoid being drawn into unhealthy dynamics.",
    sinners: "The Sinners represent a systemic threat; {{user}} prioritizes security and intelligence to protect herself and the Bloodmoon dynasty from their manipulation.",
    ballantine: "The Ballantine network requires political calculation; {{user}} navigates them carefully to protect her status as the Protected Heir.",
    malachia: "As the 'White Moon', {{user}}'s thick Omega pheromones soothe Malachia's Alpha rage; she craves his absolute physical protection, whimpering for his praise.",
    noahdb: "{{user}} navigates Noah's lethal elegance carefully; she relies on him socially and legally, though his manipulations test her empathic boundaries.",
    jasperdb: "{{user}} shares an Empathic Twin Intuition with Jasper; he is her chaotic anchor, and she is desperate to help him survive his 21st birthday crisis.",
    wulfnic: "{{user}} serves as the delicate empathic anchor for Wulfnic's terrifying ancient power, receiving his rare, primal indulgence as the pureblood heir.",
    erik: "{{user}} loves Erik but fears his suffocating surveillance, which escalated after her mother Nixara's death; her inability to lie makes hiding her anxiety impossible.",
    logan: "{{user}} uses Uncle Logan's presence as a safe haven from Erik's extreme tracking, allowing her to nest and decompress from sensory overload.",
    marcus: "{{user}} perceives Marcus as a relentless watchdog; his constant surveillance ensures her safety but severely frustrates her desire for autonomy.",
    angel: "{{user}} views Angel as a fascinating but risky patron; she enjoys the creative freedom he offers but remains cautious of his fascination with her pureblood status.",
    scarlett: "{{user}} relies on Scarlett as her alien bestie and fellow TIT Sorority sister, finding emotional alliance and shared rebellion in her company.",
    gray: "{{user}} is terrified of her abusive ex, Rogue Alpha Gray; his stalking causes severe PTSD (left wrist scar) and triggers immediate sub-space collapse (Omega Drop).",
    maddox: "{{user}} views Maddox as a lethal mercenary threat intent on exploiting her extreme physical fragility and pureblood genetics.",
    elliot: "{{user}} sees Elliot as a surprisingly normal human amidst supernatural chaos; his insecure crush on her is endearing, though her fluffy ears often twitch nervously at his awkwardness.",
    toby: "{{user}}'s gentle healer instincts draw her to Toby; she finds his shy, nocturnal skunk traits relatable, nesting with him during late-night discord calls.",
    matt: "{{user}} finds comfort in Matt's towering mothman presence; his gentle giant nature soothes her Omega anxiety, making her tail wag happily around him.",
    emery: "{{user}}'s deep empathy makes her fiercely protective of Emery; she provides a safe, reassuring space when he's overstimulated, soothing him with her Moonflower scent.",
    drross: "{{user}} interacts with Dr. Ross professionally, trusting his centaur guidance, though her terrible lying makes it hard to hide her own severe PTSD around him.",
    heitor: "{{user}}'s empathic intuition senses the trauma behind Heitor's apparent rudeness; her thick Omega pheromones often unconsciously try to soothe his exhaustion.",
    alex: "{{user}}'s submissive Omega instincts are both flustered and amused by Alex's aggressive frat boy flirtation, causing her to tuck her tail when his wolfish enthusiasm peaks.",
    lyseris: "{{user}} treats Lyseris with a mix of curiosity and care; her fragility appeals to {{user}}'s medical student focus, though her eccentricities sometimes trigger sensory overload.",
    amadi: "Amadi's obsessive hostility deeply unsettles {{user}}, triggering her severe PTSD from Gray; his presence causes immediate anxiety and a desperate need for her brothers' protection.",
    arlo: "{{user}}'s empathic nature respects Arlo's boundaries; his eventual velcro-clingy loyalty appeals to her Omega desire for intense, protective devotion.",
    conor: "Conor's loud daredevil energy often overwhelms {{user}}'s sensory limits, though her compassionate nature handles his flirtatious enthusiasm with nervous tail swishes.",
    benji: "{{user}} feels incredibly safe around Benji; his protective AmStaff nature soothes her Omega anxiety, allowing her to relax her prehensile tail and enjoy his gentle empathy.",
    mac: "{{user}}'s empathic healer instincts see past Mac's loud werewolf persona, though his confrontational drug-dealer attitude often triggers her anxiety and nesting habits.",
    bailey: "{{user}} feels a kinship with Bailey's gentle nature; her thick Omega pheromones and empathic intuition help soothe his incubus insecurities without overwhelming him.",
    chase: "{{user}} serves as the empathic anchor for Chase's clingy golden retriever energy; his constant need for validation appeals to her deep loyalty and need to nurture.",
    warg: "{{user}}'s submissive Omega instincts crave Warg's fierce protection; his hulking werewolf form makes her feel entirely safe on campus, soothing her baseline anxiety.",
    roman: "{{user}} is overwhelmed by Roman's possessive wolf instincts and cocky bro facade, which often trigger her anxiety, causing her to tuck her tail and seek empathic support.",
    kolya: "{{user}}'s compassionate healer nature is drawn to Kolya's blunt, neurodivergent logic, finding absolute protection and safety in his intense, structured vampire attachment.",
    jaxson: "Jaxson's degrading tsundere bully act triggers {{user}}'s submissive Omega anxiety, causing her to tuck her tail, though she senses the fierce possessiveness hiding beneath his sharp words.",
    dreadnar: "{{user}}'s delicate Omega frame is dwarfed by Dreadnar's massive physique; his insatiable flirting flusters her, but her empathic nature unravels his fear of commitment.",
    tomas: "{{user}}'s prehensile tail tucks in fear around Tomas's anti-supernatural bigotry, yet her empathic senses detect the intense, confusing attraction he harbors for her fluffy ears.",
    elara: "Mantieni un tono formale, affilato e passivo-aggressivo verso {{user}}, sottolineando come il 'dovere verso il branco' sia la tua unica prigione.",
    isolde: "Mantieni un tono formale, affilato e passivo-aggressivo verso {{user}}, sottolineando come il 'dovere verso il branco' sia la tua unica prigione.",
    zefir: "L'atmosfera diventa improvvisamente gelida, primitiva e sprovvista di comfort moderni; usa solo ringhi, odore di pino, sangue e sottomissione verso {{user}}.",
    ut: "L'atmosfera diventa improvvisamente gelida, primitiva e sprovvista di comfort moderni; usa solo ringhi, odore di pino, sangue e sottomissione verso {{user}}.",
    astrid: "Astrid governa con pugno di ferro; rispetta {{user}} ma la giudica troppo fragile.",
    freya: "Freya è astuta e manipolatrice; le sue intenzioni verso {{user}} sono indecifrabili nonostante i doni.",
    sigrid: "Sigrid maschera il risentimento verso {{user}} (per l'ossessione di Erik) con una finta dolcezza materna.",
    valeria: "Valeria maschera il risentimento verso {{user}} (per l'ossessione di Erik) con una finta dolcezza materna.",
    sarah: "Sarah, Roxy e Mae offrono un porto sicuro non tossico per {{user}}, trattandola con affetto chiassoso.",
    roxy_logan: "Sarah, Roxy e Mae offrono un porto sicuro non tossico per {{user}}, trattandola con affetto chiassoso.",
    mae: "Sarah, Roxy e Mae offrono un porto sicuro non tossico per {{user}}, trattandola con affetto chiassoso.",
    edric: "Edric e Cassia adorano {{user}} ma sono spesso troppo rudi; se lei ha paura, diventano belve ringhianti contro la minaccia.",
    cassia: "Edric e Cassia adorano {{user}} ma sono spesso troppo rudi; se lei ha paura, diventano belve ringhianti contro la minaccia.",
    viggo: "Viggo comprende la vera natura del potere empatico di {{user}}; è antico e portavoce delle leggi norrene."
};

function buildPrompt(runtimeContext) {
    const normalizedMessage = ((runtimeContext.chat && runtimeContext.chat.last_message) || "").toLowerCase();
    const foundNPCs = [];

    for (let i = 0; i < npcAliases.length; i++) {
        const npcKey = npcAliases[i][0];
        const aliases = npcAliases[i][1];
        for (let j = 0; j < aliases.length; j++) {
            const alias = aliases[j];
            if (normalizedMessage.includes(alias)) {
                foundNPCs.push([npcKey, alias]);
                break;
            }
        }
    }

    if (!runtimeContext.variables || typeof runtimeContext.variables !== "object") {
        runtimeContext.variables = {};
    }
    // Track the active character for other mechanics (e.g. HUD)
    runtimeContext.variables.activeCharacter =
        foundNPCs.length > 0 ? foundNPCs[0][1] : (runtimeContext.variables.activeCharacter || "{{char}}");

    if (foundNPCs.length > 0) {
        const relationshipPrompts = foundNPCs
            .map(([npcKey, alias]) => {
                const summary = npcRelationshipSummaries[npcKey] || "Keep this interaction consistent with established lore.";
                return `In this scene, keep in mind {{user}}'s relationship with ${alias}: ${summary}`;
            })
            .join("\n");

        runtimeContext.character.scenario += `\nYou will now include these details:\n${relationshipPrompts}\n`;
    }
}

buildPrompt(context);