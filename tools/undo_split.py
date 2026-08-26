import os
import shutil

valid_npcs = {
    'Angelo', 'Archer_Wolfwood', 'Fade_Greymoor', 'Finnegan_Novak', 
    'Javier_Sinclair', 'Kaladin', 'Marcus', 'Revazhael', 
    'Roland_(Ghoul)', 'Scarlett', 'Sierra', 'Vincent_Campbell'
}

npc_dir = r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs"
for f in os.listdir(npc_dir):
    full_path = os.path.join(npc_dir, f)
    if os.path.isdir(full_path):
        if f not in valid_npcs:
            shutil.rmtree(full_path)
            print(f"Deleted invalid dir: {f}")

print("Cleanup done.")
