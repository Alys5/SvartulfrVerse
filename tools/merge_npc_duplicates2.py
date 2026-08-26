import os
import shutil

npcs_dir = r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs"

merges = {
    "Arthur": "Arthur_Sloth",
    "Danny_Boone": "Daniel_Danny_Boone",
    "Dante": "Dante_Lust",
    "JeanLuc_Virtuoso": "Jean-Luc_Virtuoso",
    "Luisa_SanchezRogers": "Luisa_Sanchez-Rogers",
    "Mackenzie_Mac_SanchezRogers": "Mackenzie_Mac_Sanchez_Rogers",
    "Nikolaj_Jöckull": "Nikolaj_Jokull",
    "Nikolaj_Jökull": "Nikolaj_Jokull",
    "Professor_Loewe": "Richard_Loewe",
    "Roxie": "Roxie_Greed",
    "Siobhan": "Siobhan_Envy",
    "Stan": "Stanley_Stan_Davies_Jr",
    "SUCC_Bulls_coach": "Coach_Dullahan",
    "Succubus_Character": "Scarlett_Rose",
    "Sully_Jones": "Sullivan_Sully_Jones",
    "Trans_male_vampire": "Fade_Greymoor",
    "Undead_drummer": "Roland_Vickers",
    "Vampire_hockey_captain": "Vincent_Campbell",
    "Violet_Via_Carter": "Viola_Carter",
    "Werewolf_campus_security": "Warg",
    "Werewolves": "Warg",
}

renames = {
    "Insecure_vampire_creative": "Andrew_Campbell",
    "Staffordshire_Terrier_demihuman": "Benji_Taylor",
    "Strict_premed_professor": "Aris_Thorne",
    "Unknown_hybrid_student": "Lyseris",
    "Vampire_bioethics_confidante": "Talia_Grimwood",
    "Vampire_law_student": "Kolya_Varenkov",
    "Viscount_Angelo_Moreno": "Angelo_Moreno",
}

def merge_folder(src, dst):
    if not os.path.exists(src):
        return
    if not os.path.exists(dst):
        os.makedirs(dst, exist_ok=True)
    for item in os.listdir(src):
        src_item = os.path.join(src, item)
        dst_item = os.path.join(dst, item)
        if os.path.isfile(src_item):
            if item == "note.md":
                with open(src_item, "r", encoding="utf-8") as sf:
                    content = sf.read()
                if os.path.exists(dst_item):
                    with open(dst_item, "a", encoding="utf-8") as df:
                        df.write("\n" + content + "\n")
                else:
                    shutil.move(src_item, dst_item)
            else:
                shutil.move(src_item, dst_item)
    shutil.rmtree(src)

for src_name, dst_name in merges.items():
    src_path = os.path.join(npcs_dir, src_name)
    dst_path = os.path.join(npcs_dir, dst_name)
    merge_folder(src_path, dst_path)
    print(f"Merged {src_name} into {dst_name}")

for old_name, new_name in renames.items():
    old_path = os.path.join(npcs_dir, old_name)
    new_path = os.path.join(npcs_dir, new_name)
    merge_folder(old_path, new_path)
    print(f"Renamed/Merged {old_name} to {new_name}")
