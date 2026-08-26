import os
import shutil
import re

base_dir = r"d:\SvartulfrVerse\Drafts\Character_Cards_V1"
npcs_dir = os.path.join(base_dir, "NPCs")
main_cast_dir = os.path.join(base_dir, "Main_Cast")

# Target mapping for merging
merge_map = {
    "Alyssa": os.path.join(main_cast_dir, "Alyssa"),
    "Erik": os.path.join(main_cast_dir, "Erik"),
    "Jasper": os.path.join(main_cast_dir, "Jasper"),
    "Logan": os.path.join(main_cast_dir, "Logan"),
    "Malachia": os.path.join(main_cast_dir, "Malachia"),
    "Noah": os.path.join(main_cast_dir, "Noah"),
    "Wulfnic": os.path.join(main_cast_dir, "Wulfnic"),
    "Kaladin": os.path.join(npcs_dir, "Kaladin_Iron_Thornfield"),
    "Sierra": os.path.join(npcs_dir, "Sierra_Cruz"),
    "Finns": os.path.join(npcs_dir, "Finnegan_Novak"),
    "Macs": os.path.join(npcs_dir, "Mackenzie_Mac_Sanchez_Rogers"),
    "Hanks": os.path.join(npcs_dir, "Hank_Thompson"),
    "Baileys": os.path.join(npcs_dir, "Bailey_Rogers"),
    "JeanLucs": os.path.join(npcs_dir, "Jean-Luc_Virtuoso"),
    "Abels": None, # Delete Abels entirely? The user marked them as wrong
}

# Folders to delete completely
to_delete = [
    "Core_Terminology", "CrossReference_Verification", "Dead_Zone", 
    "Douglas_Family_Roster", "Enigma_DouglasBloodmoon", "Heat_Cycle_Omega",
    "La_Grande_Caccia", "Character_Echo_Summary", "Character_Stone_Summary",
    "Abels_cold_mother", "Abels_ruthless_father", "Abels_selkie_friend",
    "Alligator_demihuman_bodyguard", "Alpha_Squad_leader", "Alpha_Squad_private", "Alpha_Squad_sergeant",
    "Ancient_Sentinel_guardian", "Anthropomorphic_moth_cryptid", "Assistant_coach",
    "Centaur_therapist", "Cursed_human_fixermortician", "DCC_Security_Director", "DCC_Security_lieutenant",
    "Demon_private_detective", "Fox_demihuman_delinquent", "Halfminotaur_quarterback",
    "Hawk_demihuman_stalker", "Indie_punk_band", "Irish_Terrier_demihuman", "Lion_shapeshifter_academic",
    "Naive_streamer", "Orcwood_elf_linebacker", "Pack_healer", "Photography_professor",
    "Plantfae_guitarist", "Prejudiced_werewolf_jock", "Rapidly_mutating_hivemind"
]

def merge_folder(src, dst):
    if not os.path.exists(dst):
        os.makedirs(dst, exist_ok=True)
    for item in os.listdir(src):
        src_item = os.path.join(src, item)
        dst_item = os.path.join(dst, item)
        if os.path.isfile(src_item):
            if item == "note.md":
                # append to target note.md
                with open(src_item, "r", encoding="utf-8") as sf:
                    content = sf.read()
                with open(dst_item, "a", encoding="utf-8") as df:
                    df.write("\n" + content + "\n")
            else:
                # move or overwrite
                shutil.move(src_item, dst_item)
    shutil.rmtree(src)

# Iterate through all NPCs folders
for f in os.listdir(npcs_dir):
    src_folder = os.path.join(npcs_dir, f)
    if not os.path.isdir(src_folder):
        continue
        
    # Check absolute delete list
    if f in to_delete:
        print(f"Deleting {f}")
        shutil.rmtree(src_folder)
        continue
        
    # Check merging logic
    merged = False
    
    # 1. Main cast and named targets
    for key, target in merge_map.items():
        if f.startswith(f"Character_{key}_") or f.startswith(f"Char_{key}_") or f.startswith(f"{key}_"):
            if target: # If we have a valid target
                print(f"Merging {f} -> {target}")
                merge_folder(src_folder, target)
            else:
                print(f"Deleting {f}")
                shutil.rmtree(src_folder)
            merged = True
            break
            
    if merged:
        continue

print("Cleanup script complete.")
