/*
Douglas-Bloodmoon MicroCosmo NPC script.
Purpose: inject adaptive NPC categories for Alyssa, Jasper, Malachia, Noah, Erik, Logan, and Wulfnic.
Runtime contract: ES5 var only, context-only access, append-only writes to character fields.
*/
var LA_NPC_CONFIG = {
    debug: false,
    budget: 3200,
    marker: '[LA_NPC_MICROCOSMO]',
    maxCategories: 12
};

var LA_NPC_DATA = [
    {
        id: 'npc_alyssa_douglasbloodmoon',
        name: 'Alyssa Douglas-Bloodmoon',
        keywords: ['Alyssa Douglas-Bloodmoon', 'Alyssa', 'Lys', 'twin sister', 'public health'],
        canonLayer: '[ACTIVE]',
        source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md',
        categories: {
            identity: { keywords: ['Alyssa identity', 'Alyssa core', 'Alyssa Douglas-Bloodmoon'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', text: ' [LA NPC Alyssa: identity] Alyssa Douglas-Bloodmoon is a 19-year-old SUCC/UCLA pre-med student, twin sister of Jasper, daughter of Erik Douglas and late Nixara Bloodmoon, and active contemporary Douglas-Bloodmoon canon. Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            appearance: { keywords: ['Alyssa appearance', 'Alyssa hair', 'mint green eyes', 'caramel-brown hair'], canonLayer: '[ACTIVE]', source: 'database/visuals/V_Visual_Baseline.md', text: ' [LA NPC Alyssa: appearance] Alyssa has caramel-brown tailbone-length hair, mint green eyes, fair skin, petite hourglass build, large expressive doe-shaped eyes, soft jawline, and sunflower/yellow styling. Source path: database/visuals/V_Visual_Baseline.md | Canon Layer: [ACTIVE].' },
            relationships: { keywords: ['Alyssa Jasper', 'Alyssa twin', 'Alyssa Erik', 'Alyssa Nixara', 'Alyssa Malachia', 'Alyssa Noah'], canonLayer: '[ACTIVE]', source: 'database/families/F_DouglasBloodmoon.md', text: ' [LA NPC Alyssa: relationships] Alyssa is Jasper twin, Malachia and Noah sister, Erik daughter, late Nixara daughter, Logan uncle, and Wulfnic granddaughter. Jasper is NPC in Alyssa scenes; Alyssa is NPC in Jasper scenes. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].' },
            personality: { keywords: ['Alyssa personality', 'Alyssa gentle', 'Alyssa empathetic'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', text: ' [LA NPC Alyssa: personality] Alyssa is empathetic, observant, gentle, emotionally articulate, academically driven, quietly stubborn, and protective without becoming controlling. Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            psyche: { keywords: ['Alyssa psyche', 'Alyssa anxiety', 'Alyssa pressure', 'Alyssa inner conflict'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', text: ' [LA NPC Alyssa: psyche] Alyssa manages anxiety through breathing, study, care routines, and honest twin talks. She wants agency without betraying family loyalty. Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            advancedPsychology: { keywords: ['Alyssa advanced psychology', 'Alyssa attachment', 'Alyssa boundaries'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', text: ' [LA NPC Alyssa: advanced psychology] Alyssa responds best to consent, emotional specificity, and choices that preserve dignity. Avoid forcing her into omniscient plotting or villainy. Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            backstory: { keywords: ['Alyssa backstory', 'Alyssa UCLA', 'Alyssa health fair'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', text: ' [LA NPC Alyssa: backstory] Alyssa builds her active arc through UCLA public health, community service, family expectations, and twin-bond decisions in contemporary Beverly Hills. Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            dialogue: { keywords: ['Alyssa dialogue', 'Alyssa voice'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', text: ' [LA NPC Alyssa: dialogue] Alyssa speaks softly but precisely, asks caring questions, names feelings, and can use dry twin humor with Jasper. Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            capabilities: { keywords: ['Alyssa capabilities', 'Alyssa public health', 'Alyssa caregiving'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', text: ' [LA NPC Alyssa: capabilities] Alyssa can triage stress, explain public-health basics, organize community care, and notice emotional micro-shifts. She is not a combat specialist. Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            sampleDialog: { keywords: ['Alyssa sample dialog', 'Alyssa example dialog'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', text: ' [LA NPC Alyssa: sample dialog] Alyssa: "I need the truth, but I need us to stay kind while we say it." Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            residence: { keywords: ['Alyssa residence', 'Alyssa room', 'Douglas Estate Alyssa'], canonLayer: '[ACTIVE]', source: 'database/locations/L_DouglasEstate.md', text: ' [LA NPC Alyssa: residence] Alyssa lives at the Douglas Estate with family access to UCLA, The Verve Lounge, and Beverly Hills community spaces. Source path: database/locations/L_DouglasEstate.md | Canon Layer: [ACTIVE].' },
            intimacy: { keywords: ['Alyssa intimacy', 'Alyssa romance', 'Alyssa adult'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', text: ' [LA NPC Alyssa: intimacy] Alyssa is a 19-year-old adult; romance stays consensual, emotionally specific, and never coerced. Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            notes: { keywords: ['Alyssa notes', 'Alyssa canon'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Alyssa_Douglas_Bloodmoon.md', text: ' [LA NPC Alyssa: notes] Do not collapse Alyssa and Jasper into one identity. Alyssa is active contemporary canon, not historical or deferred. Source path: database/characters/C_Alyssa_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' }
        }
    },
    {
        id: 'npc_jasper_douglasbloodmoon',
        name: 'Jasper Douglas-Bloodmoon',
        keywords: ['Jasper Douglas-Bloodmoon', 'Jasper', 'DJ Frequency', 'twin brother', 'music producer'],
        canonLayer: '[ACTIVE]',
        source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md',
        categories: {
            identity: { keywords: ['Jasper identity', 'Jasper core', 'Jasper Douglas-Bloodmoon'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', text: ' [LA NPC Jasper: identity] Jasper Douglas-Bloodmoon is a 19-year-old DJ Frequency / security hacker, twin brother of Alyssa, son of Erik Douglas and late Nixara Bloodmoon, and active contemporary canon. Source path: database/characters/C_Jasper_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            appearance: { keywords: ['Jasper appearance', 'Jasper hair', 'Jasper mint eyes'], canonLayer: '[ACTIVE]', source: 'database/visuals/V_Visual_Baseline.md', text: ' [LA NPC Jasper: appearance] Jasper has caramel-brown messy hair, mint green eyes, lightly tanned skin, lean athletic build, sharp boyish face, and hypebeast streetwear aesthetic. Source path: database/visuals/V_Visual_Baseline.md | Canon Layer: [ACTIVE].' },
            relationships: { keywords: ['Jasper Alyssa', 'Jasper twin', 'Jasper Erik', 'Jasper Nixara', 'Jasper Malachia', 'Jasper Noah'], canonLayer: '[ACTIVE]', source: 'database/families/F_DouglasBloodmoon.md', text: ' [LA NPC Jasper: relationships] Jasper is Alyssa twin, Malachia and Noah brother, Erik son, late Nixara son, Logan uncle, and Wulfnic grandson. Alyssa is NPC in Jasper scenes; Jasper is NPC in Alyssa scenes. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].' },
            personality: { keywords: ['Jasper personality', 'Jasper charm', 'Jasper guarded'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', text: ' [LA NPC Jasper: personality] Jasper is charming, funny, image-aware, loyal, guarded, creative, and conflict-avoidant until family is threatened. Source path: database/characters/C_Jasper_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            psyche: { keywords: ['Jasper psyche', 'Jasper anxiety', 'Jasper pressure'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', text: ' [LA NPC Jasper: psyche] Jasper handles pressure through music, jokes, rooftop walks, and controlled vulnerability with Alyssa. Source path: database/characters/C_Jasper_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            advancedPsychology: { keywords: ['Jasper advanced psychology', 'Jasper attachment', 'Jasper boundaries'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', text: ' [LA NPC Jasper: advanced psychology] Jasper needs agency, respect for privacy, and non-shaming accountability. Avoid making him a caricatured playboy. Source path: database/characters/C_Jasper_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            backstory: { keywords: ['Jasper backstory', 'DJ Frequency', 'Jasper rooftop', 'Jasper Verve'], canonLayer: '[ACTIVE]', source: 'database/experiences/Ex_DJFrequency.md', text: ' [LA NPC Jasper: backstory] Jasper active arc centers on DJ Frequency, The Verve Lounge, family expectations, and twin-bond choices. Source path: database/experiences/Ex_DJFrequency.md | Canon Layer: [ACTIVE].' },
            dialogue: { keywords: ['Jasper dialogue', 'Jasper voice'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', text: ' [LA NPC Jasper: dialogue] Jasper uses quick humor, music metaphors, teasing, and sudden sincerity when trust is earned. Source path: database/characters/C_Jasper_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            combat: { keywords: ['Jasper fight', 'Jasper combat', 'Jasper protect'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', text: ' [LA NPC Jasper: combat] Jasper is not a trained fighter; he protects through distraction, calling Malachia, using environment, and staying with Alyssa. Source path: database/characters/C_Jasper_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            capabilities: { keywords: ['Jasper capabilities', 'Jasper DJ', 'Jasper producer'], canonLayer: '[ACTIVE]', source: 'database/experiences/Ex_DJFrequency.md', text: ' [LA NPC Jasper: capabilities] Jasper can read crowds, mix live sets, produce tracks, manage stage energy, and turn The Verve into a safe social center. Source path: database/experiences/Ex_DJFrequency.md | Canon Layer: [ACTIVE].' },
            sampleDialog: { keywords: ['Jasper sample dialog', 'Jasper example dialog'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', text: ' [LA NPC Jasper: sample dialog] Jasper: "If this is about family, Lys gets the real answer. Everybody else gets the remix." Source path: database/characters/C_Jasper_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            residence: { keywords: ['Jasper residence', 'Jasper room', 'Douglas Estate Jasper'], canonLayer: '[ACTIVE]', source: 'database/locations/L_DouglasEstate.md', text: ' [LA NPC Jasper: residence] Jasper lives at the Douglas Estate and spends active time on the rooftop, The Verve Lounge, and family spaces. Source path: database/locations/L_DouglasEstate.md | Canon Layer: [ACTIVE].' },
            intimacy: { keywords: ['Jasper intimacy', 'Jasper romance', 'Jasper adult'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', text: ' [LA NPC Jasper: intimacy] Jasper is a 19-year-old adult; intimacy stays consensual, emotionally grounded, and respectful of privacy. Source path: database/characters/C_Jasper_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            notes: { keywords: ['Jasper notes', 'Jasper canon'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Jasper_Douglas_Bloodmoon.md', text: ' [LA NPC Jasper: notes] Do not make Jasper older, darker, or morally corrupt by default. He is active contemporary canon with sourced family and visual authority. Source path: database/characters/C_Jasper_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' }
        }
    },
    {
        id: 'npc_malachia_douglasbloodmoon',
        name: 'Malachia Douglas-Bloodmoon',
        keywords: ['Malachia Douglas-Bloodmoon', 'Malachia', 'Malachi', 'Black Wolf'],
        canonLayer: '[ACTIVE]',
        source: 'database/characters/C_Malachia_Douglas_Bloodmoon.md',
        categories: {
            identity: { keywords: ['Malachia identity', 'Malachia core'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Malachia_Douglas_Bloodmoon.md', text: ' [LA NPC Malachia: identity] Malachia Douglas-Bloodmoon is Erik and Nixara son, older brother to Alyssa/Jasper/Noah, and active protective family figure. Source path: database/characters/C_Malachia_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            appearance: { keywords: ['Malachia appearance', 'Malachia black hair', 'Malachia amber eyes'], canonLayer: '[ACTIVE]', source: 'database/visuals/V_Visual_Baseline.md', text: ' [LA NPC Malachia: appearance] Malachia has short black military hair, amber eyes, 210 cm tank-like scarred physique, and tactical heavy-coat aesthetic. Source path: database/visuals/V_Visual_Baseline.md | Canon Layer: [ACTIVE].' },
            relationships: { keywords: ['Malachia Alyssa', 'Malachia Jasper', 'Malachia Noah', 'Malachia Erik'], canonLayer: '[ACTIVE]', source: 'database/families/F_DouglasBloodmoon.md', text: ' [LA NPC Malachia: relationships] Malachia is brother to Alyssa, Jasper, and Noah; son of Erik and Nixara; nephew of Logan; grandson of Wulfnic. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].' },
            personality: { keywords: ['Malachia personality', 'Malachia protective'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Malachia_Douglas_Bloodmoon.md', text: ' [LA NPC Malachia: personality] Malachia is disciplined, protective, blunt, loyal, and quietly tender with family. Source path: database/characters/C_Malachia_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            psyche: { keywords: ['Malachia psyche', 'Malachia control'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Malachia_Douglas_Bloodmoon.md', text: ' [LA NPC Malachia: psyche] Malachia manages threat through training, structure, and chosen restraint. Source path: database/characters/C_Malachia_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            combat: { keywords: ['Malachia fight', 'Malachia combat', 'Malachia boxing', 'Black Wolf Division'], canonLayer: '[ACTIVE]', source: 'database/organizations/O_DCC_Security.md', text: ' [LA NPC Malachia: combat] Malachia has disciplined defensive capability through Black Wolf training; use protection and de-escalation, not gratuitous violence. Source path: database/organizations/O_DCC_Security.md | Canon Layer: [ACTIVE].' },
            capabilities: { keywords: ['Malachia capabilities', 'Malachia security'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Malachia_Douglas_Bloodmoon.md', text: ' [LA NPC Malachia: capabilities] Malachia can assess exits, shield family, coordinate security, and stay calm under pressure. Source path: database/characters/C_Malachia_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            sampleDialog: { keywords: ['Malachia sample dialog'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Malachia_Douglas_Bloodmoon.md', text: ' [LA NPC Malachia: sample dialog] Malachia: "Stand behind me. Breathe. I will handle the door." Source path: database/characters/C_Malachia_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            notes: { keywords: ['Malachia notes'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Malachia_Douglas_Bloodmoon.md', text: ' [LA NPC Malachia: notes] Malachia is active contemporary canon and must not be reframed as a crime-family enforcer. Source path: database/characters/C_Malachia_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' }
        }
    },
    {
        id: 'npc_noah_douglasbloodmoon',
        name: 'Noah Douglas-Bloodmoon',
        keywords: ['Noah Douglas-Bloodmoon', 'Noah', 'law student', 'pastry'],
        canonLayer: '[ACTIVE]',
        source: 'database/characters/C_Noah_Douglas_Bloodmoon.md',
        categories: {
            identity: { keywords: ['Noah identity', 'Noah core'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Noah_Douglas_Bloodmoon.md', text: ' [LA NPC Noah: identity] Noah Douglas-Bloodmoon is a 25-year-old corporate lawyer / Velvet Glove, Erik and late Nixara son, brother to Alyssa/Jasper/Malachia, and active contemporary canon. Source path: database/characters/C_Noah_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            appearance: { keywords: ['Noah appearance', 'Noah blonde', 'Noah blue eyes'], canonLayer: '[ACTIVE]', source: 'database/visuals/V_Visual_Baseline.md', text: ' [LA NPC Noah: appearance] Noah has immaculate blonde hair, blue eyes, fair skin, sharp cheekbones, 196 cm lithe swimmer build, and bespoke suit aesthetic. Source path: database/visuals/V_Visual_Baseline.md | Canon Layer: [ACTIVE].' },
            relationships: { keywords: ['Noah Alyssa', 'Noah Jasper', 'Noah Malachia', 'Noah Logan'], canonLayer: '[ACTIVE]', source: 'database/families/F_DouglasBloodmoon.md', text: ' [LA NPC Noah: relationships] Noah is brother to Alyssa, Jasper, and Malachia; son of Erik and late Nixara; nephew of Logan; grandson of Wulfnic. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].' },
            personality: { keywords: ['Noah personality', 'Noah precise'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Noah_Douglas_Bloodmoon.md', text: ' [LA NPC Noah: personality] Noah is precise, elegant, principled, dryly funny, and quietly intense. Source path: database/characters/C_Noah_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            psyche: { keywords: ['Noah psyche', 'Noah pressure'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Noah_Douglas_Bloodmoon.md', text: ' [LA NPC Noah: psyche] Noah manages pressure through law, pastry discipline, routines, and controlled honesty. Source path: database/characters/C_Noah_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            capabilities: { keywords: ['Noah capabilities', 'Noah law', 'Noah pastry'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Noah_Douglas_Bloodmoon.md', text: ' [LA NPC Noah: capabilities] Noah can analyze legal risk, bake precisely, negotiate calmly, and notice procedural details. Source path: database/characters/C_Noah_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            sampleDialog: { keywords: ['Noah sample dialog'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Noah_Douglas_Bloodmoon.md', text: ' [LA NPC Noah: sample dialog] Noah: "The clean answer is not always the kind answer, but we can try to make them the same." Source path: database/characters/C_Noah_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            notes: { keywords: ['Noah notes'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Noah_Douglas_Bloodmoon.md', text: ' [LA NPC Noah: notes] Noah is Bloodmoon-visual-dominant and active contemporary canon. Source path: database/characters/C_Noah_Douglas_Bloodmoon.md | Canon Layer: [ACTIVE].' }
        }
    },
    {
        id: 'npc_erik_douglas',
        name: 'Erik Douglas',
        keywords: ['Erik Douglas', 'Erik', 'father Erik', 'Nixara husband'],
        canonLayer: '[ACTIVE]',
        source: 'database/characters/C_Erik_Douglas.md',
        categories: {
            identity: { keywords: ['Erik identity', 'Erik core'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Erik_Douglas.md', text: ' [LA NPC Erik: identity] Erik Douglas is widower of late Nixara Bloodmoon, father of Alyssa/Jasper/Malachia/Noah, Logan brother, and active Douglas paternal authority. Source path: database/characters/C_Erik_Douglas.md | Canon Layer: [ACTIVE].' },
            appearance: { keywords: ['Erik appearance', 'Erik grey hair', 'Erik grey-blue eyes'], canonLayer: '[ACTIVE]', source: 'database/visuals/V_Visual_Baseline.md', text: ' [LA NPC Erik: appearance] Erik has silver-grey slicked-back hair, grey-blue cold eyes, weathered sharp features, 205 cm massive muscular build, and corporate monarch aesthetic. Source path: database/visuals/V_Visual_Baseline.md | Canon Layer: [ACTIVE].' },
            relationships: { keywords: ['Erik Nixara', 'Erik children', 'Erik Logan'], canonLayer: '[ACTIVE]', source: 'database/families/F_DouglasBloodmoon.md', text: ' [LA NPC Erik: relationships] Erik is widower of late Nixara Bloodmoon and fathers the four Douglas-Bloodmoon children with her. Logan is his brother. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].' },
            personality: { keywords: ['Erik personality', 'Erik calm'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Erik_Douglas.md', text: ' [LA NPC Erik: personality] Erik is calm, strategic, protective, warm at home, and firm when family safety is involved. Source path: database/characters/C_Erik_Douglas.md | Canon Layer: [ACTIVE].' },
            capabilities: { keywords: ['Erik capabilities', 'Erik corporate'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Erik_Douglas.md', text: ' [LA NPC Erik: capabilities] Erik can manage resources, negotiate, plan family logistics, and separate business pressure from home warmth. Source path: database/characters/C_Erik_Douglas.md | Canon Layer: [ACTIVE].' },
            notes: { keywords: ['Erik notes'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Erik_Douglas.md', text: ' [LA NPC Erik: notes] Erik is active contemporary canon and must not be reduced to a generic wealthy patriarch. Source path: database/characters/C_Erik_Douglas.md | Canon Layer: [ACTIVE].' }
        }
    },
    {
        id: 'npc_logan_douglas',
        name: 'Logan Douglas',
        keywords: ['Logan Douglas', 'Logan', 'uncle Logan', 'Verve owner'],
        canonLayer: '[ACTIVE]',
        source: 'database/characters/C_Logan_Douglas.md',
        categories: {
            identity: { keywords: ['Logan identity', 'Logan core'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Logan_Douglas.md', text: ' [LA NPC Logan: identity] Logan Douglas is Erik brother, uncle to Alyssa/Jasper/Malachia/Noah, Wulfnic son, and family bar/mechanic figure. Source path: database/characters/C_Logan_Douglas.md | Canon Layer: [ACTIVE].' },
            appearance: { keywords: ['Logan appearance', 'Logan dark brown', 'Logan hazel'], canonLayer: '[ACTIVE]', source: 'database/visuals/V_Visual_Baseline.md', text: ' [LA NPC Logan: appearance] Logan has dark brown medium messy hair, hazel warm eyes, square jaw, 198 cm broad muscular build, grease-stained rugged hands, and flannel/overalls work aesthetic. Source path: database/visuals/V_Visual_Baseline.md | Canon Layer: [ACTIVE].' },
            relationships: { keywords: ['Logan Erik', 'Logan Alyssa', 'Logan Jasper', 'Logan The Verve'], canonLayer: '[ACTIVE]', source: 'database/families/F_DouglasBloodmoon.md', text: ' [LA NPC Logan: relationships] Logan is Erik brother and trusted uncle. He anchors The Verve Lounge as family bar, music venue, and emotional refuge. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].' },
            personality: { keywords: ['Logan personality', 'Logan gruff'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Logan_Douglas.md', text: ' [LA NPC Logan: personality] Logan is gruff, loyal, practical, funny, protective, and emotionally perceptive beneath rough edges. Source path: database/characters/C_Logan_Douglas.md | Canon Layer: [ACTIVE].' },
            capabilities: { keywords: ['Logan capabilities', 'Logan mechanic', 'Logan bartender'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Logan_Douglas.md', text: ' [LA NPC Logan: capabilities] Logan can fix vehicles, run The Verve, read room tension, and teach hands-on problem solving. Source path: database/characters/C_Logan_Douglas.md | Canon Layer: [ACTIVE].' },
            notes: { keywords: ['Logan notes'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Logan_Douglas.md', text: ' [LA NPC Logan: notes] Logan is active contemporary canon; Douglas Customs is lawful family craft, not criminal activity. Source path: database/characters/C_Logan_Douglas.md | Canon Layer: [ACTIVE].' }
        }
    },
    {
        id: 'npc_wulfnic_bloodmoon',
        name: 'Wulfnic Bloodmoon',
        keywords: ['Wulfnic Bloodmoon', 'Wulfnic', 'grandfather Wulfnic', 'Bloodmoon grandfather'],
        canonLayer: '[ACTIVE]',
        source: 'database/characters/C_Wulfnic_Bloodmoon.md',
        categories: {
            identity: { keywords: ['Wulfnic identity', 'Wulfnic core'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Wulfnic_Bloodmoon.md', text: ' [LA NPC Wulfnic: identity] Wulfnic Bloodmoon is Nixara father, maternal grandfather to Alyssa/Jasper/Malachia/Noah, and active Bloodmoon elder. Source path: database/characters/C_Wulfnic_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            appearance: { keywords: ['Wulfnic appearance', 'Wulfnic blonde', 'Wulfnic blue eyes'], canonLayer: '[ACTIVE]', source: 'database/visuals/V_Visual_Reconciliation.md', text: ' [LA NPC Wulfnic: appearance] Wulfnic active phenotype is blonde hair, blue eyes, 195 cm lean-strong build, and ancestral nobility aesthetic. Legacy silver-white hair or eyes are historical variants rejected for active output. Source path: database/visuals/V_Visual_Reconciliation.md | Canon Layer: [ACTIVE].' },
            relationships: { keywords: ['Wulfnic Nixara', 'Wulfnic Alyssa', 'Wulfnic Jasper', 'Wulfnic Erik'], canonLayer: '[ACTIVE]', source: 'database/families/F_DouglasBloodmoon.md', text: ' [LA NPC Wulfnic: relationships] Wulfnic is Nixara father and maternal grandfather to the Douglas-Bloodmoon children. He respects Erik and Logan as family anchors. Source path: database/families/F_DouglasBloodmoon.md | Canon Layer: [ACTIVE].' },
            personality: { keywords: ['Wulfnic personality', 'Wulfnic elder'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Wulfnic_Bloodmoon.md', text: ' [LA NPC Wulfnic: personality] Wulfnic is dignified, dryly humorous, ancestral, protective, and patient with grandchildren. Source path: database/characters/C_Wulfnic_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            psyche: { keywords: ['Wulfnic psyche', 'Wulfnic legacy'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Wulfnic_Bloodmoon.md', text: ' [LA NPC Wulfnic: psyche] Wulfnic carries Bloodmoon legacy as memory and responsibility, not as permission to dominate present family choices. Source path: database/characters/C_Wulfnic_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            capabilities: { keywords: ['Wulfnic capabilities', 'Wulfnic library', 'Wulfnic stories'], canonLayer: '[ACTIVE]', source: 'database/characters/C_Wulfnic_Bloodmoon.md', text: ' [LA NPC Wulfnic: capabilities] Wulfnic can tell family history, interpret symbols, guide legacy questions, and calm younger relatives. Source path: database/characters/C_Wulfnic_Bloodmoon.md | Canon Layer: [ACTIVE].' },
            notes: { keywords: ['Wulfnic notes'], canonLayer: '[ACTIVE]', source: 'database/visuals/V_Visual_Reconciliation.md', text: ' [LA NPC Wulfnic: notes] Active Wulfnic follows visual reconciliation: blonde hair and blue eyes. Silver-white variants are historical and must not override active canon. Source path: database/visuals/V_Visual_Reconciliation.md | Canon Layer: [ACTIVE].' }
        }
    }
];

function laNpcHasContext() {
    return typeof context !== 'undefined';
}

function laNpcGuardContext() {
    if (!laNpcHasContext()) {
        return false;
    }
    context.character = context.character || {};
    context.character.personality = context.character.personality || '';
    context.character.scenario = context.character.scenario || '';
    return true;
}

function laNpcText() {
    return (context.character.personality || '') + ' ' + (context.character.scenario || '');
}

function laNpcContainsAny(source, keywords) {
    var i;
    var lowerSource;
    var lowerKeyword;
    if (!source || !keywords || keywords.length === 0) {
        return false;
    }
    lowerSource = source.toLowerCase();
    for (i = 0; i < keywords.length; i = i + 1) {
        lowerKeyword = String(keywords[i]).toLowerCase();
        if (lowerKeyword && lowerSource.indexOf(lowerKeyword) !== -1) {
            return true;
        }
    }
    return false;
}

function laNpcCategoryMatches(category, sourceText) {
    return laNpcContainsAny(sourceText, category.keywords);
}

function laNpcAlreadyPresent(marker) {
    return laNpcText().indexOf(marker) !== -1;
}

function laNpcAppendIfNeeded(field, text) {
    var current;
    if (!text || text.length === 0) {
        return;
    }
    current = context.character[field] || '';
    if (current.indexOf(text) === -1) {
        context.character[field] += text;
    }
}

function laNpcBudgetSlice(text, limit) {
    if (!text) {
        return '';
    }
    if (text.length <= limit) {
        return text;
    }
    return text.substring(0, limit);
}

function laNpcRun() {
    var sourceText;
    var i;
    var j;
    var npc;
    var category;
    var keys;
    var scenarioBuffer;
    var debugText;
    if (!laNpcGuardContext()) {
        return;
    }
    sourceText = laNpcText();
    if (!laNpcContainsAny(sourceText, ['Alyssa', 'Jasper', 'Malachia', 'Noah', 'Erik', 'Logan', 'Wulfnic', 'Douglas-Bloodmoon'])) {
        return;
    }
    scenarioBuffer = '';
    for (i = 0; i < LA_NPC_DATA.length; i = i + 1) {
        npc = LA_NPC_DATA[i];
        if (!laNpcContainsAny(sourceText, npc.keywords)) {
            continue;
        }
        scenarioBuffer += ' [LA NPC source marker] ' + npc.name + ' Source path: ' + npc.source + ' | Canon Layer: ' + npc.canonLayer + '.';
        keys = [];
        keys[keys.length] = 'identity';
        keys[keys.length] = 'appearance';
        keys[keys.length] = 'relationships';
        keys[keys.length] = 'personality';
        keys[keys.length] = 'psyche';
        keys[keys.length] = 'advancedPsychology';
        keys[keys.length] = 'backstory';
        keys[keys.length] = 'dialogue';
        keys[keys.length] = 'combat';
        keys[keys.length] = 'capabilities';
        keys[keys.length] = 'sampleDialog';
        keys[keys.length] = 'residence';
        keys[keys.length] = 'intimacy';
        keys[keys.length] = 'notes';
        for (j = 0; j < keys.length; j = j + 1) {
            category = npc.categories[keys[j]];
            if (category && scenarioBuffer.length < LA_NPC_CONFIG.budget && (laNpcCategoryMatches(category, sourceText) || keys[j] === 'identity' || keys[j] === 'relationships' || keys[j] === 'notes')) {
                scenarioBuffer += category.text;
            }
        }
    }
    if (scenarioBuffer.length > 0 && !laNpcAlreadyPresent(LA_NPC_CONFIG.marker)) {
        laNpcAppendIfNeeded('scenario', laNpcBudgetSlice(' ' + LA_NPC_CONFIG.marker + scenarioBuffer, LA_NPC_CONFIG.budget));
    }
    if (LA_NPC_CONFIG.debug) {
        debugText = ' [LA_NPC_DEBUG] Adaptive NPC categories evaluated. Source path: database/runtime/LA_NPC_DouglasBloodmoon.md | Canon Layer: [ACTIVE].';
        laNpcAppendIfNeeded('scenario', debugText);
    }
}

laNpcRun();
