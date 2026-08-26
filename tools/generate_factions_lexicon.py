import json
import os

OUTPUT_FILE = r"d:\SvartulfrVerse\Wyvern\lorebooks\Blackwood_Factions.json"
os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

factions = [
    {
        "name": "Pack of Seven Hills & DCC",
        "key": ["dcc", "douglas commercial coalition", "seven hills", "pack of seven hills"],
        "content": "La fazione dominante di Blackwood dal 1666. La DCC (Douglas Commercial Coalition) è un impero corporativo multi-miliardario gestito dal Patriarca Erik Douglas. La divisione Security produce armi, sorveglianza e PMCs. L'obiettivo primario della DCC e del branco è il controllo assoluto per proteggere {{user}}, sfociando in una sovraprotezione tattica e asfissiante."
    },
    {
        "name": "The Ancients",
        "key": ["ancients", "antichi", "wulfnic", "zefir", "ut", "primordial enigma", "firstborn"],
        "content": "Triumvirato politico e religioso che governa tutti i branchi del Nord America. Composto dai Firstborn (Wulfnic, Zefir, Ut), esseri primordiali di 1100+ anni. Rappresentano il peso schiacciante della Bloodline e delle aspettative ancestrali. Per {{user}} significano pressione dinastica e l'occhio onnisciente della specie."
    },
    {
        "name": "Il Concilio di Blackwood",
        "key": ["concilio", "council", "amministrazione", "district alphas", "trattato"],
        "content": "L'organo politico-amministrativo di Blackwood City. Include 10 District Alphas (tra cui Vito Marino), rappresentanti dei Solitari (Riki Savini), Vampiri (Angelo Moreno), Umani e 7 minoranze. Presieduto da Erik Douglas. È il campo di battaglia politico dove il potere di Erik viene formalmente bilanciato dalle altre specie e dai patti di non aggressione."
    },
    {
        "name": "Court of the Night (Eidolon Creative)",
        "key": ["court of the night", "corte della notte", "eidolon creative", "vampiri", "vampire", "angelo moreno"],
        "content": "Struttura di potere dei vampiri europei a Blackwood, che usa lo studio d'alta moda 'Eidolon Creative' come facciata corporativa. Guidata dal Visconte Angelo Moreno (Vampire Patriarch e membro del Concilio). Cercano di espandere la loro influenza e potrebbero usare {{user}} come pedina o dipendente segreto (Arc 3)."
    },
    {
        "name": "The Verve & Territori Neutrali",
        "key": ["verve", "territorio neutrale", "neutral territory", "logan", "sidewinders", "safe zone"],
        "content": "Zone sicure garantite da leggi sovrannaturali dove ogni conflitto di fazione è sospeso. The Verve, gestito da Logan Douglas, è l'epicentro neutrale. Funge da valvola di sfogo primaria per {{user}}, essendo equipaggiato con jammer militari che accecano il tracciamento biometrico e i droni della DCC."
    },
    {
        "name": "SUCC Campus & Greek Row",
        "key": ["succ", "campus", "greek row", "università", "ksa", "frat party"],
        "content": "L'ambiente universitario integrato (umani e sovrannaturali). Rappresenta il campo di battaglia della 'normalità' per {{user}}. Dominato dalla confraternita KSA presieduta da Noah Douglas-Bloodmoon. Ogni tappa mondana (esami, party, appuntamenti) innesca il panico comico della famiglia e il gatekeeping ipocrita di Noah."
    },
    {
        "name": "Ironworks Syndicate",
        "key": ["ironworks syndicate", "sindacato", "vito", "scar marino", "underworld"],
        "content": "L'asse criminale industriale e proletario che gestisce il traffico illecito di Blackwood. Guidato dall'Alpha Vito 'Scar' Marino (membro del Concilio). Rappresentano la realtà pericolosa e ambientale del sottomondo sovrannaturale, che giustifica l'estrema paranoia e i protocolli di sicurezza di Erik."
    }
]

lorebook = {
    "spec": "lorebook_v2",
    "spec_version": "2.0",
    "name": "Blackwood_Factions",
    "description": "Lexicon of the 7 major Factions of Blackwood City",
    "entries": []
}

for i, faction in enumerate(factions):
    lorebook["entries"].append({
        "name": faction["name"],
        "key": faction["key"],
        "content": faction["content"],
        "type": "faction",
        "priority": 100, # Base priority
        "insertion_order": i,
        "enabled": True,
        "key_logic": "AND_ANY"
    })

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(lorebook, f, indent=4, ensure_ascii=False)

print(f"Successfully generated {OUTPUT_FILE} with {len(factions)} entries.")
