import os
import shutil

base_dir = r"d:\SvartulfrVerse\Drafts\Character_Cards_V1"
npcs_dir = os.path.join(base_dir, "NPCs")

# 1. Rename existing NPC folders to match their JSON file inside (nome_cognome)
for folder_name in os.listdir(npcs_dir):
    folder_path = os.path.join(npcs_dir, folder_name)
    if os.path.isdir(folder_path):
        json_files = [f for f in os.listdir(folder_path) if f.endswith(".json")]
        if len(json_files) == 1:
            json_name = json_files[0]
            new_folder_name = os.path.splitext(json_name)[0]
            new_folder_path = os.path.join(npcs_dir, new_folder_name)
            
            if folder_path != new_folder_path:
                print(f"Moving {folder_name} -> {new_folder_name}")
                if os.path.exists(new_folder_path):
                    # Merge contents
                    for item in os.listdir(folder_path):
                        src_item = os.path.join(folder_path, item)
                        dst_item = os.path.join(new_folder_path, item)
                        if os.path.exists(dst_item):
                            if item == "note.md":
                                # append note.md
                                with open(src_item, 'r', encoding='utf-8') as sf, open(dst_item, 'a', encoding='utf-8') as df:
                                    df.write("\n" + sf.read())
                            else:
                                pass # skip or overwrite
                        else:
                            shutil.move(src_item, dst_item)
                    shutil.rmtree(folder_path)
                else:
                    os.rename(folder_path, new_folder_path)

# 2. Process all loose JSON files in Character_Cards_V1
loose_files = [f for f in os.listdir(base_dir) if f.endswith(".json")]
for loose_file in loose_files:
    json_path = os.path.join(base_dir, loose_file)
    if os.path.isfile(json_path):
        folder_name = os.path.splitext(loose_file)[0]
        target_dir = os.path.join(npcs_dir, folder_name)
        os.makedirs(target_dir, exist_ok=True)
        new_json_path = os.path.join(target_dir, loose_file)
        print(f"Moving {loose_file} -> {target_dir}")
        shutil.move(json_path, new_json_path)

print("Riordino completato.")
