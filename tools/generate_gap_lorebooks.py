import json
import os

def create_lorebook(filename, name, description, entries_data):
    filepath = os.path.join(r"d:\SvartulfrVerse\Wyvern\lorebooks", filename)
    entries = []
    
    for i, data in enumerate(entries_data):
        entry = {
            "name": data["name"],
            "key": data["key"],
            "content": data["content"],
            "type": "concept",
            "priority": 100,
            "insertion_order": i,
            "enabled": True,
            "key_logic": "AND_ANY"
        }
        entries.append(entry)

    lorebook = {
        "spec": "lorebook_v2",
        "spec_version": "2.0",
        "name": name,
        "description": description,
        "entries": entries
    }

    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(lorebook, f, indent=4, ensure_ascii=False)
    print(f"Created {filepath}")

def generate_species_compendium():
    entries = [
        {
            "name": "Werewolves",
            "key": ["werewolf", "lycanthrope", "lse", "shift", "alpha", "omega", "pack"],
            "content": "Shapeshifters with three forms (Partial, Hybrid, Full shift). Governed by LSE biology (hierarchy, Heat/Rut cycles, Alpha Command). Disguise: mimicry legally required outside Free Cities. Capabilities: scent communication, pack bonds, regeneration, supernatural strength."
        },
        {
            "name": "Vampires",
            "key": ["vampire", "court of the night", "glamour", "blood", "eidolon"],
            "content": "Immortal aristocracy. Use glamour for disguise, blood-bonding, hypnotic compulsion. Sunlight lethal. Capabilities: superhuman speed, blood feeding refined to an art form, centuries of political cunning."
        },
        {
            "name": "Succubus / Incubus",
            "key": ["succubus", "incubus", "feeding", "emotional energy"],
            "content": "Symbiotic predators feeding on dreams, emotional energy, desire. Appear as stunning humans; eyes glow pink when feeding or aroused. They feed on orgasmic/emotional energy, leaving partners euphoric, never draining life force."
        },
        {
            "name": "Lamia / Naga",
            "key": ["lamia", "naga", "snake tail", "necromancy"],
            "content": "Snake-tailed demi-humans, cold-blooded, drawn to body heat, necromancy affinity. Disguise: rainbow iridescent hair/eyes from waist up, massive rainbow snake tail from waist down. Capabilities: constriction, cold-blooded resilience."
        },
        {
            "name": "Fae & Folklore",
            "key": ["fae", "hulder", "nøkken", "draugr", "folklore", "nordic", "dwarf", "knocker", "domovoi"],
            "content": "High supernatural nobility (Seelie/Unseelie) and Little People (Fairies, Gnomes). Includes Hulder/Skogsrå (forest wardens), Nøkken (water demons), Draugr (corporeal undead). Also includes Domovoi (house spirits) and Knockers/Dwarves (guards of technological graveyards)."
        },
        {
            "name": "Symbiotes (Daimon)",
            "key": ["symbiote", "daimon", "spirit"],
            "content": "Spirits that physically manifest on the human host's body (e.g., a mask on the back of the head). They offer psychic communication and vast ancient knowledge, acting analytical and manipulative but protective of the host."
        },
        {
            "name": "Meliae (Ash-Tree Nymphs)",
            "key": ["nymph", "meliae", "ash tree"],
            "content": "Stunningly beautiful, naked, physically powerful earth spirits bound to ash trees. They require human blood and flesh to regain power and carry memories of ancient divine wars. Arrogant, feral, and vulnerable to fire."
        },
        {
            "name": "La Bianca Signora (Lua Mater)",
            "key": ["lua mater", "bianca signora", "winter goddess", "incubo invernale"],
            "content": "A cosmic winter-goddess entity. Formless shifting mass covered in white furs. Causes absolute localized winter and mind-breaking terror. Preys on children and the lonely. Hates social order and demands offerings to be placated."
        },
        {
            "name": "Demons & Anomalies",
            "key": ["demon", "dragon", "angel", "anomaly", "cosmic"],
            "content": "Chaos entities, Orcs/Trolls, Giants, Kobolds, and Grand Anomalies (Dragons, Angels, Gods). True forms often cause visual trauma. They are capable of reality-warping at the extreme edge."
        },
        {
            "name": "Humans (Magic-Capable)",
            "key": ["human", "witch", "necromancer", "mutant", "sorcerer", "alseid"],
            "content": "Mundane humans, plus Witches, Necromancers, and lab-escapee Mutants. They adapt to the 'Fracture' by mixing medicine, business, and street magic. Includes Alseids (cultists offering human sacrifices for magic)."
        }
    ]
    create_lorebook("Species_Compendium.json", "Species_Compendium", "Lexicon of the supernatural and mundane species in SvartulfrVerse", entries)

def generate_world_mechanics():
    entries = [
        {
            "name": "Neutral Territories",
            "key": ["neutral territory", "neutral territories", "safe zone", "verve", "sidewinders", "succ campus"],
            "content": "Legally and socially enforced safe zones where supernatural faction conflict is strictly suspended. If physical force or combat drones are deployed here, it mechanically triggers joint retaliation from other factions."
        },
        {
            "name": "Bounded Conflict System",
            "key": ["bounded conflict", "cold war", "diplomatic audit", "tactical cleansing"],
            "content": "The Cold War between wolves and vampires is fought via bureaucracy and humiliation, not murder. Vampires trigger 'Tactical Cleansing' (humiliating removal). Wolves violating neutral zones trigger a 'Diplomatic Audit' (bureaucratic pressure, frozen funds)."
        },
        {
            "name": "The Free Cities Exception",
            "key": ["free cities exception", "great hiding", "mimicry", "california"],
            "content": "While the species-wide 'Great Hiding' requires supernaturals to use human mimicry, California is a rights-guaranteed state. In Blackwood and Solarton, supernaturals can legally drop mimicry and display ears/tails openly."
        },
        {
            "name": "Cost of Breaking Bonds",
            "key": ["exile", "breaking bonds", "mating mark", "pack bonds"],
            "content": "Pack bonds cannot be broken casually. Exile (forcibly breaking all pack bonds) causes severe physical and psychological trauma. Breaking a romantic mating mark causes extreme illness or death."
        },
        {
            "name": "Cost of Surveillance Evasion",
            "key": ["evasion", "surveillance evasion", "dead zone", "acoustic vacuum"],
            "content": "Hacking surveillance provides temporary blind spots but leaves digital trails. The ancient Yew tree in the Dead Zone creates a permanent acoustic vacuum that bricks all modern tech, granting absolute evasion but costing corporate power."
        }
    ]
    create_lorebook("World_Mechanics.json", "World_Mechanics", "Lexicon of the political, social, and prevention mechanics of the SvartulfrVerse", entries)

if __name__ == "__main__":
    generate_species_compendium()
    generate_world_mechanics()
