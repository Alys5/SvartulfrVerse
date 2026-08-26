import json
import uuid
import os

target_path = r"d:\SvartulfrVerse\Wyvern\lorebooks\LSE_Lexicon.json"

entries = [
    {
        "name": "LSE - Shift Classes",
        "key": ["shift", "trasformazione", "lupo", "hybrid", "partial shift", "full shift", "bipedal", "quadrupede", "mutaforma"],
        "content": "I lupi mannari possiedono 3 forme morfologiche (Shift Classes). 1) Partial Shift: manifestazione volontaria o emotiva di orecchie, coda, occhi e zanne sulla forma umana; usato per comunicazione e intimidazione. 2) Hybrid Shift: la 'Specie True Form', una forma lupina bipede (digitigrade) con pelliccia completa, forza massima e capacità di parola; usata per combattimenti e cerimonie. 3) Full Shift: forma di lupo quadrupede massiccio, specializzata per la caccia, la corsa e formazioni di branco veloci; comunicazione non verbale."
    },
    {
        "name": "LSE - Alpha & Enigma",
        "key": ["Alpha", "Enigma", "dominante", "nodo", "baculum", "rut", "command"],
        "content": "Alpha: lupi predisposti alla protezione, territorialità e aggressività difensiva. Producono feromoni oppressivi per comunicare intenti. Possono usare il 'Command' (comando vocale/feromonale che immobilizza o forza le caste inferiori). Non sono automaticamente leader, ma protettori. Anatomia maschile/Enigma include il 'nodo' (glandis che si gonfia per il Lock) e il 'baculum' (osso penieno, solo nelle stirpi nobili/divine).\nEnigma: casta sacra ed eccezionalmente rara (es. i 9 Firstborn originali). Trascendono i limiti biologici, possiedono un Command assoluto e non possono essere sottomessi."
    },
    {
        "name": "LSE - Beta & Delta",
        "key": ["Beta", "Delta", "engine", "social glue", "pack role"],
        "content": "Delta: il vero 'motore' (Engine) del branco. Esperti in tattica, pattugliamento e istruzione. Biologia simile agli Alpha ma privi della capacità di usare il Command. Ottimi vice-leader.\nBeta: il collante sociale (Social Glue) del branco. Lavoratori pacifici, artigiani e amministratori. I loro feromoni sono tenui. Bilanciano gli istinti protettivi (Alpha) e di cura (Omega), rendendoli ottimi adattatori sociali. Hanno spazi personali anziché nidi o tane e comunicano serenità canticchiando o sospirando."
    },
    {
        "name": "LSE - Omega & Gamma",
        "key": ["Omega", "Gamma", "sottomesso", "heat", "nido", "slick", "cucciolo", "pre-presentation", "submissive omega", "white moon"],
        "content": "Gamma: stato neutro di sviluppo prepuberale (prima dei 13 anni). Tutti i cuccioli sono Gamma prima della Presentazione.\nOmega: regolatori emotivi del branco. Altissima empatia, feromoni calmanti capaci di placare Alpha e Delta. Creano coesione in crisi, costruiscono Nidi (spazi sicuri impregnati del loro odore) e producono 'slick' (lubrificante naturale) durante l'eccitazione. Non sono deboli: un Anziano Omega è spesso il consigliere capo.\nSubgenders Omega: 1) Dominant Omega: raro, resiste al Command, si sottomette solo al compagno scelto. L'espressione più rara è il 'White Moon', capace di calmare interi branchi col solo odore. 2) Submissive Omega: heat prolungati, altamente accudenti e sensibili, vulnerabili ma fieramente protettivi verso i cuccioli."
    },
    {
        "name": "LSE - Cycles (Heat & Rut)",
        "key": ["heat", "calore", "rut", "ciclo", "sympathy cycle", "stress cycle"],
        "content": "Heat (Omega): Ciclo trimestrale di 3-10 giorni. Preceduto da pre-heat (odore intenso, nidificazione). Durante l'Heat attivo, l'Omega è incoerente e guidato dall'istinto riproduttivo: ogni decisione sessuale presa in Heat attivo NON è considerata consensuale. Post-heat richiede grandi quantità di cibo per recuperare energie.\nRut (Alpha): Ciclo mensile o innescato dai feromoni di un Omega. 3-10 giorni di maggiore aggressività, ma generalmente controllabile.\nSympathy e Stress Cycles: Calori o rut innescati dalla vicinanza con compagni di branco in ciclo o da stress/traumi estremi, meccanismo biologico per richiamare conforto."
    },
    {
        "name": "LSE - Scent & Glands",
        "key": ["feromoni", "odore", "scent", "ghiandole", "collo", "polsi", "cosce", "scenting"],
        "content": "Ghiandole Odoripare (Scent Glands): Trasmettono feromoni, stato d'animo e sesso secondario. Posizioni chiave:\n- Polsi e Guance: zone sociali per salutare amici, compagni di branco e appuntamenti casuali.\n- Nuca/Collo: mantiene l'odore più a lungo, usato per legami genitoriali o il morso di accoppiamento (Mating Bite).\n- Interno Cosce: zona esclusivamente intima. Lo scenting qui senza consenso è considerato aggressione, sui cuccioli è criminale. Annusare o leccare le ghiandole è essenziale per la comunicazione lupina."
    },
    {
        "name": "LSE - Bonding & Mating",
        "key": ["mate", "compagno", "bond", "marchio", "morso", "lock", "breeding", "mating bite"],
        "content": "Bond: legame mentale ed emotivo che trasmette emozioni tra due individui, creato tramite il morso (Claim). Tipi di Bond: Parentale (nuca del cucciolo, permanente), Romantico/Mating (collo/clavicola, svanisce in 3 anni se non rinforzato; romperlo è pericoloso e letale), Platonico (polsi), Sessuale (interno coscia, dura 3-7 giorni).\nLock (Nodo): avviene quando la biologia di un Omega o partner recettivo accetta il compagno (Alpha/Enigma). Il corpo del ricevente si stringe attorno al nodo (Knot) dell'Alpha, scatenando un orgasmo prolungato e garantendo altissime probabilità di concepimento (Breeding)."
    },
    {
        "name": "LSE - Bloodlines",
        "key": ["sangue puro", "pureblood", "founding bloodline", "divine blood", "firstborn", "common bloodline"],
        "content": "Blood Classification (Gerarchia Genetica inalterabile alla nascita):\n- Divine Blood: I 9 Firstborn originali, immortali e potentissimi.\n- Founding Bloodlines: Diretti discendenti dei Firstborn, fondatori delle Grandi Casate (es. Bloodmoon), vivono oltre 500 anni con rigenerazione estrema.\n- Pureblood Houses: L'aristocrazia (es. Douglas), vivono 200-400 anni, genetica e legami di branco molto stabili.\n- Common Bloodlines: La maggioranza della popolazione lupina, vivono 80-150 anni.\n- Modified Lineages: Lupi alterati da esperimenti o mutazioni (es. Gamma-7)."
    },
    {
        "name": "LSE - Architecture & Housing",
        "key": ["architettura", "villa", "casa", "compound", "longhouse", "mansion", "den chamber", "nest suite", "cucina", "bagni", "parcheggio"],
        "content": "L'architettura lupina adatta gli standard umani per i bisogni della specie. Le case/ville (Pack Compounds o Urban Mansions) presentano stanze e corridoi giganti per ospitare l'Hybrid Shift, e ventilazione rinforzata per isolare i feromoni. La 'Den Chamber' (Tana dell'Alpha) è isolata e fortificata. La 'Nest Suite' (Nido dell'Omega) è insonorizzata, termoregolata e oscurata. La cucina è gigantesca (tutti partecipano, è un momento sociale). I bagni sono immensi per favorire i bagni comunitari (bonding). Nel garage, gli Omega parcheggiano più vicini all'ingresso (massima sicurezza), poi i Beta e i Delta, e infine gli Alpha."
    },
    {
        "name": "LSE - Technology & Medicine",
        "key": ["tecnologia", "armi", "medicina", "soppressori", "blockers", "kibble", "clinica", "dcc", "industrie"],
        "content": "I lupi usano la tecnologia umana ma l'adattano (Dual-track). Armi: preferiscono armi naturali (artigli/zanne) e spade forgiate tradizionali (es. culto di Ut), ma usano tatticamente armi da fuoco e soppressori feromonali. Medicina: sviluppata per la loro biologia, include acceleratori di rigenerazione, terapie per curare i Bond recisi (traumatici) e soppressori ormonali (pillole, iniezioni, incenso per Heat/Rut). 'Omega Kibble' è un integratore medico potentissimo usato solo per le crisi estreme. L'industria lupina finanzia il mondo sovrannaturale tramite facciate corporative (come la DCC, l'impero finanziario dei Douglas)."
    },
    {
        "name": "LSE - Communication & Vocalizations",
        "key": ["vocalizzazioni", "suoni", "comunicazione", "keening", "purring", "trilling", "mewling", "rumbling", "growling", "chuffing", "crooning"],
        "content": "I lupi usano vocalizzazioni specifiche. Omega Sounds: Keening (lamento per richiesta di conforto), Purring (rilassamento, fusa), Trilling (saluto felice per farsi seguire), Mewling (dolore/pianto). Alpha/Enigma Sounds: Rumbling (vibrazione profonda per calmare), Growling (avvertimento o richiamo all'ordine), Crooning (suono dolce per calmare i cuccioli), Chuffing (sbuffo di saluto usato solo per compagni o partner strettissimi). La comunicazione non-verbale (postura, coda, orecchie) è altrettanto essenziale per decifrare lo stato emotivo."
    },
    {
        "name": "LSE - Pack Hierarchy & Governance",
        "key": ["gerarchia", "pack leader", "pack mom", "right hand", "left hand", "caretaker", "rogue", "esilio", "consiglio"],
        "content": "La gerarchia di branco si basa su competenza e fiducia, non sulla classe sessuale. Pack Leader: decide per tutti. Pack Mom: figura materna e guida del branco. Right Hand: consiglieri e mediatori. Left Hand: protezione fisica, applicatori della legge. Caretakers: curano il nido e i cuccioli. Esilio: Un lupo punito con l'Esilio vede i propri legami di branco recisi forzatamente (causando trauma enorme) e diventa un 'Rogue', privato di protezione. A livello politico, le grandi House (es. Douglas) hanno House Heads, Lords, Knights e rispondono al Continental Council per le dispute tra fazioni."
    },
    {
        "name": "LSE - The Faith of Fenris",
        "key": ["fenris", "religione", "fede", "great betrayal", "ragnarok", "moon", "luna", "moon speaker", "precepts"],
        "content": "Nella Faith of Fenris, Fenris NON è un mostro ma il 'First Wolf', dio della Famiglia, Sopravvivenza e Libertà. The Great Betrayal: Odino incatenò Fenris per paura della forza dei lupi, riscrivendo la storia a favore degli Aesir. Ragnarök: Non è l'apocalisse, ma la 'Liberazione' in cui Fenris spezzerà le catene. La Luna è il Simbolo del Patto, spettatrice silente dei riti. Il calendario sacro è lunare (es. Luna del Gelo a novembre, Luna del Sangue Caldo a luglio). I Moon Speakers (sacerdoti) e Keepers (custodi) tramandano i Nine Precepts of Fenris, regole basate sul proteggere il branco e vivere liberi."
    },
    {
        "name": "LSE - The Great Hunt",
        "key": ["grande caccia", "the great hunt", "caccia", "mate bond", "istinto", "caccia-confirmed"],
        "content": "La Grande Caccia (La Grande Caccia) è il rito supremo, celebrato a Dicembre ogni 5 anni. Vi partecipano tutti i branchi del continente. La politica e la gerarchia vengono totalmente sospese, lasciando spazio unicamente all'istinto biologico: le femmine o i riceventi si nascondono nella foresta, e i maschi li braccano guidati solo dall'olfatto e dal Mate Bond. Trovarsi e accoppiarsi qui genera un legame 'Caccia-confirmed', sacro e politicamente inviolabile. Erik Douglas e Nixara Bloodmoon si legarono in questo modo."
    },
    {
        "name": "LSE - History & Living Sagas",
        "key": ["storia", "firstborn", "living sagas", "wulfnic", "ut", "zefir", "nixara", "douglas", "pureblood", "founding bloodline", "alyssa", "jasper", "malachia", "noah"],
        "content": "Dei 9 Firstborn creati da Fenris, 3 sono vivi (The Living Sagas): Wulfnic Bloodmoon (The King, leader del Nord America), Ut (The Smith, fabbro stoico che ignora la modernità), Zefir (The Ghost, la memoria silenziosa). House Douglas fu fondata nel 1666 da Lord Cornelius (Pureblood). Nixara Bloodmoon, l'ultima White Moon confermata, unì il suo sangue Founding Bloodline con quello Pureblood di Erik Douglas. Dalla loro unione nacquero Alyssa, Jasper, Noah e Malachia: loro quattro sono gli ultimi discendenti Founding Bloodline attualmente in vita nel continente americano."
    }
]

lorebook_entries = []
for idx, entry in enumerate(entries):
    lorebook_entries.append({
        "id": str(uuid.uuid4()),
        "insertion_order": 50,
        "key": entry["key"],
        "keyMatchPriority": False,
        "keysecondary": [],
        "matchWholeWords": True,
        "minMessages": 0,
        "name": entry["name"],
        "placement": "default",
        "placementPosition": "after",
        "prioritizeInclusion": False,
        "priority": 50,
        "probability": 100,
        "selectiveLogic": 0,
        "tags": ["LSE", "lore"],
        "content": entry["content"],
        "keywordsRaw": ", ".join(entry["key"])
    })

os.makedirs(os.path.dirname(target_path), exist_ok=True)
with open(target_path, "w", encoding="utf-8") as f:
    json.dump(lorebook_entries, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {target_path} with {len(lorebook_entries)} entries.")
