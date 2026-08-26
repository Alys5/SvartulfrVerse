import json
import uuid
import os

target_path = r"d:\SvartulfrVerse\Wyvern\lorebooks\Douglas_DCC.json"

entries = [
    {
        "name": "House Douglas (Overview)",
        "key": ["douglas", "house douglas", "famiglia douglas", "pureblood", "cornelius"],
        "content": "Fondata nel 1666 da Lord Cornelius (Pureblood) durante il periodo delle colonie inglesi. Dinastia aristocratica con immensa ricchezza e influenza, con sede a Blackwood City. I tratti distintivi della genetica Douglas sono capelli neri corvino e occhi ambra. Sono ossessivamente iper-protettivi nei confronti dell'Omega della famiglia (Alyssa), creando un ambiente che è al tempo stesso un nido d'amore soffocante e una prigione dorata, mascherato sotto il concetto di 'benessere familiare' (family wellness)."
    },
    {
        "name": "Dinastia Bloodmoon & Unione Douglas-Bloodmoon",
        "key": ["bloodmoon", "douglas-bloodmoon", "nixara", "wulfnic", "dinastia"],
        "content": "I Bloodmoon sono i veri fondatori originari. Wulfnic Bloodmoon, padre di Nixara, è il 'First Fang' (il Primo Nato). Il legame profondo e tragico tra Erik Douglas e Nixara Bloodmoon ha portato alla fusione delle due stirpi: Malachia, Noah, Jasper e Alyssa sono ibridi Douglas-Bloodmoon (gli ultimi Founding Bloodline in vita in America). Questo lignaggio divino spiega la loro immensa potenza, l'ossessione territoriale e l'autorità assoluta che esercitano su Blackwood City."
    },
    {
        "name": "DCC - Douglas Commercial Coalition",
        "key": ["dcc", "douglas commercial coalition", "corporazione", "impero", "erik douglas"],
        "content": "La DCC è l'immenso impero corporativo globale costruito da Erik Douglas. È una facciata legittima e un conglomerato colossale che funge, in realtà, da complesso militare-industriale privato per il branco. Fornisce fondi inesauribili, copertura legale e una rete di sorveglianza globale, finanziando gran parte del mondo sovrannaturale e mantenendo Blackwood City sotto il controllo assoluto della famiglia."
    },
    {
        "name": "Villa Douglas & Seven Hills",
        "key": ["villa douglas", "seven hills", "roccaforte", "compound", "casa"],
        "content": "Villa Douglas è la roccaforte ancestrale di 400 anni situata nel cuore del distretto aristocratico di Seven Hills, a Blackwood City. Presenta un'architettura biologica adattata (LSE): porte gigantesche (260cm+) per l'Hybrid Shift, sistema DCC di ventilazione per isolare i feromoni aggressivi. Include l'Atrio, la 'Pack Bathhouse' (piscine termali per bonding), il 'Erik Sanctuary' (blindato) e il Nido insonorizzato dell'Omega al 3° piano. Il garage segue la gerarchia: Omega parcheggiano più vicini all'ingresso, Alpha per ultimi per sigillare il perimetro."
    },
    {
        "name": "DCC Security & Gamma-7 (PMC)",
        "key": ["sicurezza", "pmc", "kaladin", "marcus", "gamma-7", "estrazione", "droni", "sorveglianza"],
        "content": "Il braccio armato e la rete di sorveglianza della DCC. Gestita operativamente da Kaladin Iron Thornfield e Marcus, veterani del progetto militare classificato Gamma-7 (S.R.F., Supernatural Reserve Forces). La sicurezza della Villa e di Alyssa è basata su griglie di biometria olfattiva, droni e sensori di movimento. Sono capaci di mobilitare elicotteri neri, bloccare intere città ed eseguire estrazioni tattiche letali in pochi minuti al primo segnale di pericolo per il branco."
    },
    {
        "name": "Douglas Pack Dynamics & Members",
        "key": ["dinamiche", "erik", "malachia", "noah", "jasper", "logan", "alyssa", "edric", "wulfnic"],
        "content": "Membri attivi: Erik Douglas (Pureblood Prime Alpha, Patriarca e CEO DCC, impone restrizioni asfissianti). Malachia Douglas-Bloodmoon (Founding Alpha Enforcer, letale, priorità assoluta: Alyssa). Noah Douglas-Bloodmoon (Founding Delta Socialite, volto diplomatico). Jasper Douglas-Bloodmoon (Founding Beta Hacktivist, aggira la DCC per Alyssa). Alyssa Douglas-Bloodmoon (Founding Dominant Omega, attuale Pack Mom e Whitemoon dopo la morte di Nixara, ruolo assunto a 17 anni; fulcro del branco). Logan Douglas (Pureblood Prime Beta Uncle, offre rifugio sicuro al The Verve). Edric Douglas (Pureblood Gamma Pup non presentato; pubblicamente figlio di Logan, segretamente figlio illegittimo di Erik). Wulfnic Bloodmoon (Divine Blood Firstborn, First Fang e Alpha of Alphas continentale)."
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
        "tags": ["Douglas", "DCC", "Bloodmoon", "lore"],
        "content": entry["content"],
        "keywordsRaw": ", ".join(entry["key"])
    })

os.makedirs(os.path.dirname(target_path), exist_ok=True)
with open(target_path, "w", encoding="utf-8") as f:
    json.dump(lorebook_entries, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {target_path} with {len(lorebook_entries)} entries.")
