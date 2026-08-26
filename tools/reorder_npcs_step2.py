import os
import shutil

base_dir = r"d:\SvartulfrVerse\Drafts\Character_Cards_V1"
npcs_dir = os.path.join(base_dir, "NPCs")

# Process all loose JSON files in NPCs directory
loose_files = [f for f in os.listdir(npcs_dir) if f.endswith(".json")]
for loose_file in loose_files:
    json_path = os.path.join(npcs_dir, loose_file)
    if os.path.isfile(json_path):
        folder_name = os.path.splitext(loose_file)[0]
        target_dir = os.path.join(npcs_dir, folder_name)
        os.makedirs(target_dir, exist_ok=True)
        new_json_path = os.path.join(target_dir, loose_file)
        
        # If the target file doesn't already exist in the subfolder, move it
        if not os.path.exists(new_json_path):
            print(f"Moving {loose_file} -> {target_dir}")
            shutil.move(json_path, new_json_path)

print("Riordino file JSON completato.")
