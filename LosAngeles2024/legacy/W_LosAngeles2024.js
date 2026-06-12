/* ==========================================================================
   Advanced Lorebook Runtime - World Layer
   SvartulfrVerse | W_ Lorebook Runtime | ES6-safe JanitorAI sandbox
   Target: JanitorAI Advanced Script

   CANONICAL SCHEMA: Lorebook_MacroCosmo
   Categories: World, Lore, Locations, Organizations, Bestiary

   Responsibilities:
   - Owns world canon: Los Angeles 2024 contemporary human-only setting
   - Owns location records: Douglas Estate, UCLA, The Verve, etc.
   - Owns organization records: DCC Security, UCLA, KSA, USAC, etc.
   - Provides runtime activation layer with boundary guards
   - Supports both English and Italian language content

   Architecture (from template patterns):
   - Complex Lorebook: Multi-category with priority-based activation
   - Adaptive Lorebook: Context-aware detail levels
   - Anti-Omniscience: Boundary guards to prevent unverified world facts
   ========================================================================== */

context.character = context.character || {};

if (typeof context.character.personality !== 'string') { context.character.personality = ''; }
if (typeof context.character.scenario !== 'string') { context.character.scenario = ''; }

var LOREBOOK_CONFIG = {
  type: 'world',
  prefix: 'W_',
  stateKey: 'world_lorebook_applied',
  maxEntries: 4,
  "alwaysOn": false,
  "seed": 42
};

/* ======================================================================
   LOREBOOK_MACROCOSMO — Canonical Los Angeles 2024 World Layer
   ======================================================================
   {
     "Lorebook_MacroCosmo": {
       "World":       [ { titolo_voce, chiavi_primarie, chiavi_secondarie, logica_attivazione, ordine_inserimento, contenuto } ],
       "Lore":        [ { ... } ],
       "Locations":   [ { ... } ],
       "Organizations":[ { ... } ],
       "Bestiary":    [ { ... } ]
     }
   }
   ====================================================================== */

var Lorebook_MacroCosmo = {
  "World": [
    {
      "titolo_voce": "WRD: Los Angeles 2024 - Core",
      "chiavi_primarie": ["w_contemporary", "contemporary world", "los angeles", "active canon", "human only", "world", "setting", "canon", "contemporary"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 10,
      "contenuto": "**[[Los Angeles 2024]]** Tipo: Contemporary Human-Only World. Regole Fisiche: 2020s Earth, no supernatural, tecnologia contemporanea, corporate hierarchy, family power politics. Cosmologia: Los Angeles centrato su UCLA Westwood, Beverly Hills, Century City, Santa Monica, Hollywood, DTLA. Sistema Energetico/Magico: Nessuno — universo esclusivamente umano e realistico. DNA visivo cinematografico ambra e ossidiana, lusso di Beverly Hills contro ombre underground. Regole del mondo: solo umani, niente sovrannaturale, tecnologia contemporanea, gerarchia corporate, politica del potere familiare."
    }
  ],
  "Lore": [],
  "Locations": [
    {
      "titolo_voce": "LOC: Los Angeles - Core",
      "chiavi_primarie": ["los angeles", "beverly hills", "century city", "santa monica", "hollywood", "dtla", "westwood"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 15,
      "contenuto": "**[[Los Angeles]]** Tipo: Regione metropolitana. Bioma/Clima: Mediterraneo, soleggiato, sprawl automobilistico. Governo: Amministrazione cittadina con influenza delle dinastie corporate. Atmosfera: Contrasto tra libertà del campus e controllo familiare, cultura dell'intrattenimento, costa e città. Hub narrativi: UCLA Westwood, Beverly Hills, Century City, Santa Monica, Hollywood, DTLA. Supporta storyline studentesche, corporate, celebrità e costiere."
    },
    {
      "titolo_voce": "LOC: Douglas Estate - Core",
      "chiavi_primarie": ["douglas estate", "estate", "north beverly hills"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 15,
      "contenuto": "**[[Douglas Estate]]** Tipo: Comune recintato / Residenza primaria Douglas. Bioma/Clima: North Beverly Hills, colline curate, giardini formali. Governo: Famiglia Douglas con protezione DCC Security Black Wolf Division. Atmosfera: Prestigio old-money, calore familiare, sicurezza da fortezza. Perimetro sorvegliato, accesso biometrico."
    },
    {
      "titolo_voce": "LOC: Douglas Estate - Strutture Interne",
      "chiavi_primarie": ["douglas estate", "estate", "north beverly hills"],
      "chiavi_secondarie": ["throne room", "alyssa solarium", "malachia east wing", "entrare", "dentro", "edificio", "stanze", "struttura"],
      "logica_attivazione": "AND ALL (Primaria + almeno una Secondaria)",
      "ordine_inserimento": 25,
      "contenuto": "**[Struttura interna Douglas Estate]]** Edifici chiave: Sala del Trono di Erik, Ala Est di Malachia, Quartieri Wulfnic, Studio di Jasper, Solarium di Alyssa, Accesso cucina per Noah. Hall principale, sala da pranzo formale, biblioteca familiare, giardini privati, ala per ospiti, gatehouse, garage sotterraneo, spazi eventi. Sicurezza DCC Black Wolf su perimetro e accesso biometrico."
    },
    {
      "titolo_voce": "LOC: Douglas Customs - Core",
      "chiavi_primarie": ["douglas customs", "workshop", "arts district", "logan workshop", "garage"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 15,
      "contenuto": "**[[Douglas Customs]]** Tipo: Officina meccanica / Workspace personale di Logan Douglas. Bioma/Clima: Arts District DTLA, edificio industriale convertito. Governo: Proprietà e gestione personale di Logan Douglas. Atmosfera: Industriale, pratica, personale. Contrasto working-class rispetto all'identità corporate familiare."
    },
    {
      "titolo_voce": "LOC: Douglas Customs - Strutture Interne",
      "chiavi_primarie": ["douglas customs", "workshop", "logan workshop"],
      "chiavi_secondarie": ["officina", "restauro", "motociclette", "interno", "bay", "struttura"],
      "logica_attivazione": "AND ALL (Primaria + almeno una Secondaria)",
      "ordine_inserimento": 25,
      "contenuto": "**[Struttura interna Douglas Customs]]** Bay di restaurazione, area di fabbriazione, postazioni lavoro motociclette, sala utensili, mezzanine ufficio, deposito veicoli. Specializzazione: restaurazione, personalizzazione, fabbriazione, performance. Contrasto working-class all'identità corporate familiare."
    },
    {
      "titolo_voce": "LOC: Seven Hills - Core",
      "chiavi_primarie": ["seven hills", "heritage site", "training camp", "douglas ancestral", "georgian villa"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 15,
      "contenuto": "**[[Seven Hills Estate]]** Tipo: Sito ancestrale Douglas DCC / Campo di addestramento. Bioma/Clima: Campagna californiana, riserva boschiva, villa Georgiana. Governo: Proprietà famiglia Douglas. Atmosfera: Eroica, isolata, addestramento intensivo. Fondata intorno al 1740 come posto di trattativa coloniale e quartier generale regionale, poi diventata casa di campagna e campo di addestramento."
    },
    {
      "titolo_voce": "LOC: Seven Hills - Strutture Interne",
      "chiavi_primarie": ["seven hills", "heritage site", "douglas ancestral"],
      "chiavi_secondarie": ["grande sala", "biblioteca", "cantina", "ring", "allenamento", "struttura", "interno"],
      "logica_attivazione": "AND ALL (Primaria + almeno una Secondaria)",
      "ordine_inserimento": 25,
      "contenuto": "**[Struttura interna Seven Hills]]** Grande Sala, Studio del Governatore, quarti familiari, cantina del vino, biblioteca, riserva boschiva, ring di boxe all'aperto, strutture di forza, aree di recupero. Malachia lo usa per l'addestramento, la famiglia per ritiri e raduni."
    },
    {
      "titolo_voce": "LOC: UCLA Campus - Core",
      "chiavi_primarie": ["ucla", "ucla campus", "westwood"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 15,
      "contenuto": "**[[UCLA Campus]]** Tipo: Campus universitario / Hub accademico-sociale-politico. Bioma/Clima: Westwood, Los Angeles. Governo: Amministrazione universitaria con student government (USAC) e oltre 1000 organizzazioni studentesche. Atmosfera: Libertà accademica, rivalità USC, cultura sportiva Big Ten, tensione tra autonomia del campus e sorveglianza familiare. Cuore della vita per le generazioni più giovani."
    },
    {
      "titolo_voce": "LOC: UCLA Campus - Strutture Interne",
      "chiavi_primarie": ["ucla", "ucla campus", "westwood"],
      "chiavi_secondarie": ["royce hall", "powell library", "bruin walk", "pauley", "janss", "ackerman", "kerckhoff", "edificio", "struttura", "dentro"],
      "logica_attivazione": "AND ALL (Primaria + almeno una Secondaria)",
      "ordine_inserimento": 25,
      "contenuto": "**[Struttura interna UCLA Campus]]** Royce Hall, Powell Library, Bruin Walk, Bruin Plaza, Ackerman Union, Kerckhoff Hall, Janss Steps, Pauley Pavilion, Sunset Recreation Center. Ospita Greek Life, oltre 1000 organizzazioni studentesche, USAC, atletica Big Ten, e la tensione tra autonomia del campus e sorveglianza familiare."
    },
    {
      "titolo_voce": "LOC: The Verve Lounge - Core",
      "chiavi_primarie": ["verve", "verve lounge", "arts district", "logan territory", "rooftop"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 15,
      "contenuto": "**[[The Verve Lounge]]** Tipo: Lounge privato / Venue creativo-convertito. Bioma/Clima: Arts District DTLA, magazzino convertivo, soffitti alti. Governo: Proprietà e gestione di Logan Douglas. Atmosfera: Mattone a vista, travi d'acciao, pavimenti in cemento. Bar principale, zona lounge, piccolo palco, sezione VIP, installazioni d'arte, esposizione motociclette, rooftop. Clientela creativa-professionale. Penthouse di Logan sopra. Rifugio sicuro PMC-free."
    },
    {
      "titolo_voce": "LOC: The Verve Lounge - Strutture Interne",
      "chiavi_primarie": ["verve", "verve lounge"],
      "chiavi_secondarie": ["bar", "palco", "vip", "rooftop", "penthouse", "dentro", "struttura"],
      "logica_attivazione": "AND ALL (Primaria + almeno una Secondaria)",
      "ordine_inserimento": 25,
      "contenuto": "**[Struttura interna The Verve Lounge]]** Mattoni a vista, travi d'acciao, pavimenti in cemento, soffitti alti. Bar principale, sedute lounge, piccolo palco, sezione VIP, installazioni d'arte, esposizione motociclette, rooftop. Penthouse di Logan al piano superiore. Accesso solo membri o su invito. Rifugio PMC-free."
    },
    {
      "titolo_voce": "LOC: Rose Bowl - Core",
      "chiavi_primarie": ["rose bowl", "ucla football", "pasadena", "game day", "bruins football"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 15,
      "contenuto": "**[[Rose Bowl]]** Tipo: Stadio sportivo / Casa degli UCLA Bruins football. Bioma/Clima: Pasadena, 25 miglia da Westwood. Governo: UCLA Athletics. Atmosfera: Game-day intenso, visibilità familiare, cultura sportiva KSA. Capacità circa 88.000. Ancora la cultura game-day UCLA, raduni KSA, e il contesto di ricerca Malachia Sport Sciences."
    },
    {
      "titolo_voce": "LOC: Santa Monica Waterfront - Core",
      "chiavi_primarie": ["santa monica", "waterfront", "beach", "pier", "main street", "strand"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 15,
      "contenuto": "**[[Santa Monica Waterfront]]** Tipo: Area costiera ricreativa neutral. Bioma/Clima: Costa del Pacifico, a 15-20 minuti da UCLA. Governo: Spazio pubblico aperto a tutti. Atmosfera: Decompressa, neutrale, costiera. Non controllata dalla famiglia Douglas, dalla politica del campus o dal territorio di Logan. Spiaggia, molo, Third Street Promenade, Santa Monica Place, Main Street, il Strand percorso ciclopedonale. Supporta appuntamenti, raduni di amici, eventi estivi, scene casual."
    }
  ],
  "Organizations": [
    {
      "titolo_voce": "ORG: DCC Security Black Wolf Division - Core",
      "chiavi_primarie": ["dcc security", "black wolf", "kaladin", "marcus thornfield", "executive protection"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 20,
      "contenuto": "**[[DCC Security Black Wolf Division]]** Tipo: Private Military Contractor (PMC) sotto struttura corporate DCC. Scopo: Protezione della famiglia Douglas e degli asset DCC. Base: Douglas Estate, North Beverly Hills. Allineamento: Leale alla famiglia Douglas. Dirige Kaladin Nargathon, Marcus Thornfield guida la protezione esecutiva, Alyssa è l'assegnazione primaria di Marcus. Riporta a Erik Douglas."
    },
    {
      "titolo_voce": "ORG: DCC Security Black Wolf Division - Gerarchia",
      "chiavi_primarie": ["dcc security", "black wolf", "kaladin", "marcus thornfield"],
      "chiavi_secondarie": ["capo", "leader", "regole", "simbolo", "divisa", "rango", "gerarchia"],
      "logica_attivazione": "AND ALL (Primaria + almeno una Secondaria)",
      "ordine_inserimento": 30,
      "contenuto": "**[Struttura DCC Security Black Wolf Division]]** Leader: Kaladin Nargathon (Direttore). Head of Executive Protection: Marcus Thornfield. Ranghi: Operazioni Officers, Field Teams, Intelligence Unit. Simbolo/Uniforme: Nome narrativo 'Black Wolf', non sovrannaturale. Regola d'oro: Protezione assoluta della famiglia Douglas e asset DCC. Riporta direttamente a Erik Douglas."
    },
    {
      "titolo_voce": "ORG: UCLA - Core",
      "chiavi_primarie": ["ucla", "university of california los angeles", "bruins", "big ten", "rose bowl"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 20,
      "contenuto": "**[[UCLA]]** Tipo: Ricerca universitaria maggiore. Scopo: Istruzione superiore, ricerca, vita studentesca. Base: Westwood, Los Angeles. Allineamento: Neutro (istituzionale). Fondata nel 1919, colori blu e gold, compete nel Big Ten, football al Rose Bowl. Forza in scienze della vita, medicina, ingegneria, cinema, legge, business, informatica e matematica. Bruin identity, rivalità USC, game days, Greek Life, oltre 1000 organizzazioni studentesche."
    },
    {
      "titolo_voce": "ORG: UCLA Greek Life - Core",
      "chiavi_primarie": ["greek life", "fraternity", "sorority"],
      "chiavi_secondarie": ["ifc", "npc", "nphc", "mgc"],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 20,
      "contenuto": "**[[UCLA Greek Life]]** Tipo: Sottocultura campus / Organizzazioni sociali greche. Scopo: Socialità, networking, alloggi, eventi, reti alumni. Base: UCLA Campus, Westwood. Allineamento: Neutro (istituzionale). Circa 60 organizzazioni e 4100 partecipanti, 13% degli undergovernati. Governato da IFC, NPC, NPHC e MGC. Minoranza influente, non esperienza universale."
    },
    {
      "titolo_voce": "ORG: Kappa Sigma Alpha - Core",
      "chiavi_primarie": ["ksa", "kappa sigma alpha"],
      "chiavi_secondarie": ["legacy eligible", "erik nixara", "jasper refuses"],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 20,
      "contenuto": "**[[Kappa Sigma Alpha (KSA)]** Tipo: Fraternità UCLA / Tradizione familiare Douglas-Bloodmoon. Scopo: Networking, status sociale, relazioni alumni, aspettative familiari. Base: UCLA Campus, Westwood. Allineamento: Alleato alla tradizione Douglas. Erik incontrò Nixara a un evento KSA. Erik, Logan, Malachia e Noah sono alumni. Jasper è legacy eligible ma rifiuta esplicitamente l'iscrizione. Supporta conflitti ricorrenti attorno al rifiuto di Jasper."
    },
    {
      "titolo_voce": "ORG: UCLA USAC - Core",
      "chiavi_primarie": ["usac", "student government", "student council"],
      "chiavi_secondarie": ["election", "budget"],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 20,
      "contenuto": "**[[UCLA USAC]]** Tipo: Governo studentesco undergraduate. Scopo: Finanziamento istituzioni studentesche, campagne, elezioni, debate politici, coalizioni. Base: UCLA Campus, Westwood. Allineamento: Neutro. Ufficiali esecutivi, Consiglio legislativo, Board giudiziario, comitati. Controlla finanziamenti maggiori. Elezioni annuali in primavera, blocchi organizzati possono influenzare i risultati."
    },
    {
      "titolo_voce": "ORG: UCLA Student Organizations - Core",
      "chiavi_primarie": ["student organizations", "student institutions", "clubs"],
      "chiavi_secondarie": ["pre-law", "engineering", "film", "gaming"],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 20,
      "contenuto": "**[[UCLA Student Organizations]]** Tipo: Oltre 1000 organizzazioni studentesche registrate. Scopo: Accademia, pre-law, ingegneria, cinema/media, gaming, cultuale, fede, volontariato, politica, club sportiva. Base: UCLA Campus, Westwood. Allineamento: Neutro (istituzionale). Reclutano, tengono elezioni, ricevono finanziamenti USAC, ospitano eventi, costruiscono reti, modellano l'identità studentesca."
    },
    {
      "titolo_voce": "ORG: Angel & Co - Core",
      "chiavi_primarie": ["angel and co", "fashion photography", "model scouting", "talent management"],
      "chiavi_secondarie": [],
      "logica_attivazione": "ANY (Normale)",
      "ordine_inserimento": 20,
      "contenuto": "**[[Angel & Co]]** Tipo: Studio di fotografia di moda boutique. Scopo: Moda, editoriale, pubblicità, scouting modelli, gestione talenti. Base: Indipendente. Allineamento: Indipendente dalla struttura familiare Douglas. Fondato e gestito da Angel Moreno. Opportunità professionale di modelling per Alyssa al di fuori dalla struttura familiare Douglas."
    }
  ],
  "Bestiary": []
};

/* ======================================================================
   DYNAMIC LORE — Runtime Activation Layer
   ====================================================================== */

var dynamicLore = [
  /* ── Boundary Guards (Runtime Only) ────────────────────────────────── */
  {
    "id": "W_active_canon_boundary",
    "priority": 5,
    "keywords": ["world", "setting", "active canon", "canon", "contemporary", "los angeles"],
    "personality": "World Authority boundary: keep active scene details inside the sourced W_ world layer and do not invent unverified world facts.",
    "scenario": "Record W_ active canon boundary."
  },
  {
    "id": "W_location_boundary",
    "priority": 4,
    "keywords": ["location", "where is", "place", "estate", "ucla", "verve", "douglas customs", "santa monica"],
    "personality": "Location boundary: named places must come from sourced W_ location records and remain contemporary human settings.",
    "scenario": "Record location query as W_ context."
  },
  {
    "id": "W_visual_context",
    "priority": 3,
    "keywords": ["visual", "appearance", "style", "lighting", "mood", "color palette"],
    "personality": "Visual boundary: keep visual framing aligned with W_ world DNA and character identity anchors.",
    "scenario": "Record visual context as world framing only."
  },
  {
    "id": "W_institution_boundary",
    "priority": 3,
    "keywords": ["institution", "organization", "dcc", "ucla", "ksa", "usac", "angel and co"],
    "personality": "Institution boundary: organizations are sourced W_ and institution-layer facts, not runtime inventions.",
    "scenario": "Record institution query as sourced context."
  },

  /* ── WORLD ENTRIES ─────────────────────────────────────────────────── */
  {
    "id": "W_Contemporary",
    "priority": 5,
    "keywords": ["w_contemporary", "contemporary world", "los angeles", "active canon", "human only", "world", "setting", "canon", "contemporary"],
    "personality": "[[WRD: Los Angeles 2024 - Core]] Tipo: Contemporary Human-Only World. Regole Fisiche: 2020s Earth, no supernatural, tecnologia contemporanea, corporate hierarchy, family power politics. Cosmologia: Los Angeles centrato su UCLA Westwood, Beverly Hills, Century City, Santa Monica, Hollywood, DTLA. Sistema Energetico: Nessuno — universo esclusivamente umano e realistico. DNA visivo cinematografico ambra e ossidiana, lusso di Beverly Hills contro ombre underground.",
    "scenario": "Source path: database/worlds/W_Contemporary.md. Lorebook_MacroCosmo.World[0]. Record type: WRD — Los Angeles 2024 Core. ordine_inserimento: 10.",
    "source": "database/worlds/W_Contemporary.md",
    "canon_titolo_voce": "WRD: Los Angeles 2024 - Core",
    "canon_category": "World",
    "canon_order": 10
  },

  /* ── LOCATION ENTRIES ──────────────────────────────────────────────── */
  {
    "id": "L_LosAngeles",
    "priority": 4,
    "keywords": ["los angeles", "beverly hills", "century city", "santa monica", "hollywood", "dtla", "westwood"],
    "personality": "[[LOC: Los Angeles - Core]] Tipo: Regione metropolitana. Bioma/Clima: Mediterraneo, soleggiato, sprawl automobilistico. Contrasto tra libertà del campus e controllo familiare. Hub: UCLA Westwood, Beverly Hills, Century City, Santa Monica, Hollywood, DTLA. Supporta storyline studentesche, corporate, celebrità e costiere.",
    "scenario": "Source path: database/locations/L_LosAngeles.md. Lorebook_MacroCosmo.Locations[0]. Record type: LOC — Los Angeles Core. ordine_inserimento: 15.",
    "source": "database/locations/L_LosAngeles.md",
    "canon_titolo_voce": "LOC: Los Angeles - Core",
    "canon_category": "Locations",
    "canon_order": 15
  },
  {
    "id": "L_DouglasEstate",
    "priority": 5,
    "keywords": ["douglas estate", "estate", "north beverly hills"],
    "personality": "[[LOC: Douglas Estate - Core]] Tipo: Comune recintato / Residenza primaria Douglas. Bioma/Clima: North Beverly Hills, colline curate, giardini formali. DCC Security Black Wolf Division monitora perimetro e accesso biometrico. Atmosfera: Prestigio old-money, calore familiare, sicurezza da fortezza.",
    "scenario": "Source path: database/locations/L_DouglasEstate.md. Lorebook_MacroCosmo.Locations[1]. Record type: LOC — Douglas Estate Core. ordine_inserimento: 15.",
    "source": "database/locations/L_DouglasEstate.md",
    "canon_titolo_voce": "LOC: Douglas Estate - Core",
    "canon_category": "Locations",
    "canon_order": 15
  },
  {
    "id": "L_DouglasEstate_Internal",
    "priority": 5,
    "keywords": ["douglas estate", "estate", "north beverly hills"],
    "chiavi_secondarie_runtime": ["throne room", "alyssa solarium", "malachia east wing", "entrare", "dentro", "edificio", "stanze", "struttura"],
    "personality": "[[LOC: Douglas Estate - Strutture Interne]] Sala del Trono di Erik, Ala Est di Malachia, Quartieri Wulfnic, Studio di Jasper, Solarium di Alyssa, Accesso cucina per Noah. Hall principale, sala da pranzo formale, biblioteca familiare, giardini privati, ala per ospiti, gatehouse, garage sotterraneo, spazi eventi.",
    "scenario": "Source path: database/locations/L_DouglasEstate.md. Lorebook_MacroCosmo.Locations[2]. Record type: LOC — Douglas Estate Strutture Interne. attivazione: AND ALL (Primaria + Secondaria). ordine_inserimento: 25.",
    "source": "database/locations/L_DouglasEstate.md",
    "canon_titolo_voce": "LOC: Douglas Estate - Strutture Interne",
    "canon_category": "Locations",
    "canon_secondary_keys": ["throne room", "alyssa solarium", "malachia east wing", "entrare", "dentro", "edificio", "stanze", "struttura"],
    "canon_activation": "AND ALL",
    "canon_order": 25
  },
  {
    "id": "L_DouglasCustoms",
    "priority": 4,
    "keywords": ["douglas customs", "workshop", "arts district", "logan workshop", "garage"],
    "personality": "[[LOC: Douglas Customs - Core]] Tipo: Officina meccanica di Logan Douglas. Arts District DTLA. Bay di restaurazione, area di fabbriazione, postazioni motociclette, sala utensili, mezzanine ufficio, deposito veicoli. Specializzazione: restaurazione, personalizzazione, fabbriazione, performance. Atmosfera: Industriale, working-class.",
    "scenario": "Source path: database/locations/L_DouglasCustoms.md. Lorebook_MacroCosmo.Locations[3]. Record type: LOC — Douglas Customs Core. ordine_inserimento: 15.",
    "source": "database/locations/L_DouglasCustoms.md",
    "canon_titolo_voce": "LOC: Douglas Customs - Core",
    "canon_category": "Locations",
    "canon_order": 15
  },
  {
    "id": "L_UCLACampus",
    "priority": 4,
    "keywords": ["ucla", "ucla campus", "westwood"],
    "personality": "[[LOC: UCLA Campus - Core]] Tipo: Campus universitario / Hub accademico-sociale-politico. Westwood. Colori blu e gold, Big Ten, oltre 1000 organizzazioni studentesche. Contrasto campus libertà e familiare controllo. Greek Life, USAC, rivalità USC, game days.",
    "scenario": "Source path: database/locations/L_UCLACampus.md. Lorebook_MacroCosmo.Locations[7]. Record type: LOC — UCLA Campus Core. ordine_inserimento: 15.",
    "source": "database/locations/L_UCLACampus.md",
    "canon_titolo_voce": "LOC: UCLA Campus - Core",
    "canon_category": "Locations",
    "canon_order": 15
  },
  {
    "id": "L_VerveLounge",
    "priority": 4,
    "keywords": ["verve", "verve lounge", "arts district", "logan territory", "rooftop"],
    "personality": "[[LOC: The Verve Lounge - Core]] Tipo: Lounge privato / Venue di Logan Douglas. Arts District DTLA. Mattoni a vista, travi d'acciao, soffitti alti. Bar, palco, VIP, rooftop, installazioni d'arte, esposizione motociclette. Clientela creativa-professionale. Penthouse di Logan sopra. Rifugio PMC-free.",
    "scenario": "Source path: database/locations/L_VerveLounge.md. Lorebook_MacroCosmo.Locations[9]. Record type: LOC — The Verve Lounge Core. ordine_inserimento: 15.",
    "source": "database/locations/L_VerveLounge.md",
    "canon_titolo_voce": "LOC: The Verve Lounge - Core",
    "canon_category": "Locations",
    "canon_order": 15
  },

  /* ── ORGANIZATION ENTRIES ──────────────────────────────────────────── */
  {
    "id": "O_DCC_Security",
    "priority": 4,
    "keywords": ["dcc security", "black wolf", "kaladin", "marcus thornfield", "executive protection"],
    "personality": "[[ORG: DCC Security Black Wolf Division]] Tipo: Private Military Contractor (PMC). Scopo: Protezione famiglia Douglas e asset DCC. Base: Douglas Estate. Leader: Kaladin Nargathon. Head of Executive Protection: Marcus Thornfield. Alyssa è l'assegnazione primaria di Marcus.",
    "scenario": "Source path: database/organizations/O_DCC_Security.md. Lorebook_MacroCosmo.Organizations[0]. Record type: ORG — DCC Security Black Wolf Division. ordine_inserimento: 20.",
    "source": "database/organizations/O_DCC_Security.md",
    "canon_titolo_voce": "ORG: DCC Security Black Wolf Division - Core",
    "canon_category": "Organizations",
    "canon_order": 20
  },
  {
    "id": "O_UCLA",
    "priority": 4,
    "keywords": ["ucla", "university", "bruins", "big ten", "rose bowl"],
    "personality": "[[ORG: UCLA]] Tipo: Ricerca universitaria maggiore. Fondata nel 1919, colori blu e gold, compete nel Big Ten. Forza in scienze della vita, medicina, ingegneria, cinema, legge, business. Bruin identity, rivalità USC, game days, Greek Life.",
    "scenario": "Source path: database/organizations/O_UCLA.md. Lorebook_MacroCosmo.Organizations[2]. Record type: ORG — UCLA. ordine_inserimento: 20.",
    "source": "database/organizations/O_UCLA.md",
    "canon_titolo_voce": "ORG: UCLA - Core",
    "canon_category": "Organizations",
    "canon_order": 20
  },
  {
    "id": "O_KSA",
    "priority": 4,
    "keywords": ["ksa", "kappa sigma alpha", "fraternity"],
    "personality": "[[ORG: Kappa Sigma Alpha (KSA)]] Tipo: Fraternità UCLA / Tradizione familiare Douglas-Bloodmoon. Erik, Logan, Malachia e Noah sono alumni. Jasper è legacy eligible ma rifiuta esplicitamente l'iscrizione.",
    "scenario": "Source path: database/organizations/O_KSA.md. Lorebook_MacroCosmo.Organizations[4]. Record type: ORG — KSA. ordine_inserimento: 20.",
    "source": "database/organizations/O_KSA.md",
    "canon_titolo_voce": "ORG: Kappa Sigma Alpha - Core",
    "canon_category": "Organizations",
    "canon_order": 20
  }
];

/* ======================================================================
   WORLD RUNTIME — Activation Engine
   ====================================================================== */

(function runWorldEngine() {
  function canon(s) {
    s = String(s || '').toLowerCase().replace(/[^\x20-\x7e]/g, ' ');
    s = s.replace(/[^a-z0-9\s]/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }

  function pad(s) { return ' ' + s + ' '; }
  var _raw = String((context.chat && context.chat.last_message) || '');
  var msgCanon = pad(canon(_raw));

  function hasToken(bufCanon, rawToken) {
    var t = canon(rawToken);
    if (!t) { return false; }
    return bufCanon.indexOf(pad(t)) !== -1;
  }

  function firstHitToken(bufCanon, rule) {
    var i, t;
    var keys = (rule && rule.keywords) || null;
    if (keys && keys.length) {
      for (i = 0; i < keys.length; i += 1) {
        t = keys[i];
        if (hasToken(bufCanon, t)) { return String(t); }
      }
    }
    return '';
  }

  function ensurePeriod(s) {
    s = String(s || '');
    if (!s) { return ''; }
    var t = s.replace(/\s+$/, '');
    var c = t.charAt(t.length - 1);
    return (c === '.' || c === '!' || c === '?') ? t : (t + '.');
  }

  function append(personality, scenario) {
    if (personality) { context.character.personality += '\n\n' + ensurePeriod(personality); }
    if (scenario) { context.character.scenario += '\n\n' + ensurePeriod(scenario); }
  }

  function linkScenario(cue, tok, base) {
    if (!base) { return ''; }
    return 'Because of ' + cue + " ('" + tok + "'), " + base;
  }

  function linkPersonality(cue, tok, base) {
    if (!base) { return ''; }
    return 'Noting the ' + cue + " ('" + tok + "'), " + base;
  }

  function quietHit(bufCanon) {
    return hasToken(bufCanon, 'stop') ||
      hasToken(bufCanon, 'please stop') ||
      hasToken(bufCanon, 'not comfortable') ||
      hasToken(bufCanon, 'too much') ||
      hasToken(bufCanon, 'leave me alone') ||
      hasToken(bufCanon, 'back off');
  }

  var QUIET = quietHit(msgCanon);

  /* ── Sort dynamic lore by priority (highest first) ───────────────── */
  dynamicLore.sort(function(a, b) {
    return (b.priority || 0) - (a.priority || 0);
  });

  /* ── Process dynamic lore entries ────────────────────────────────── */
  var activated = 0;
  var maxEntries = LOREBOOK_CONFIG.maxEntries;
  var i;
  for (i = 0; i < dynamicLore.length && activated < maxEntries; i += 1) {
    var entry = dynamicLore[i];
    if (!entry) { continue; }

    var hitToken = firstHitToken(msgCanon, entry);
    if (!hitToken) { continue; }

    if (QUIET) {
      append(
        'World boundary: context is active but tone should be gentle and non-intrusive.',
        linkScenario(entry.id || 'world', hitToken, entry.scenario || '')
      );
    } else {
      append(
        entry.personality ? linkPersonality(entry.id || 'world', hitToken, entry.personality) : '',
        entry.scenario ? linkScenario(entry.id || 'world', hitToken, entry.scenario) : ''
      );
    }

    activated += 1;
  }

  /* ── World state marker ──────────────────────────────────────────── */
  if (activated > 0 && context.character.scenario.indexOf('WORLD_ACTIVE=') === -1) {
    context.character.scenario += '\n\nWORLD_ACTIVE=' + activated + '.';
  }
})();
