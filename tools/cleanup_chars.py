import os
import shutil

CHARS_DIR = r"d:\SvartulfrVerse\Drafts\Characters"
NPCS_DIR = r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs"

if os.path.exists(CHARS_DIR):
    for folder in os.listdir(CHARS_DIR):
        folder_path = os.path.join(CHARS_DIR, folder)
        if not os.path.isdir(folder_path):
            continue
            
        # Clean up Sierra_Cruz since we already have Sierra
        if folder == "Sierra_Cruz":
            note_path = os.path.join(folder_path, "note.md")
            dest_note = os.path.join(NPCS_DIR, "Sierra", "note.md")
            if os.path.exists(note_path):
                # append to Sierra's note if exists
                if os.path.exists(dest_note):
                    with open(note_path, "r", encoding="utf-8") as nf1, open(dest_note, "a", encoding="utf-8") as nf2:
                        nf2.write("\n" + nf1.read())
                else:
                    shutil.move(note_path, dest_note)
            shutil.rmtree(folder_path)
            print(f"Cleaned up Sierra_Cruz")
            continue
            
        # For others, like Fade_Greymoor, Finnegan_Novak, etc.
        # Check if there is a Rev.json for Revazhael
        json_names_to_check = [f"{folder}.json", f"{folder.split('_')[0]}.json"]
        if folder == "Revazhael" or folder == "Revazhael_(Rev)":
            json_names_to_check.append("Rev.json")
        if folder == "Roland_(Ghoul)":
            json_names_to_check.append("Roland_Vickers.json")
            
        # Move the folder to NPCs
        dest_folder = os.path.join(NPCS_DIR, folder)
        if not os.path.exists(dest_folder):
            shutil.move(folder_path, dest_folder)
            print(f"Moved {folder} to NPCs")
        else:
            # If it already exists, just move the note.md
            src_note = os.path.join(folder_path, "note.md")
            dest_note = os.path.join(dest_folder, "note.md")
            if os.path.exists(src_note):
                if os.path.exists(dest_note):
                    with open(src_note, "r", encoding="utf-8") as nf1, open(dest_note, "a", encoding="utf-8") as nf2:
                        nf2.write("\n" + nf1.read())
                else:
                    shutil.move(src_note, dest_note)
            shutil.rmtree(folder_path)
            print(f"Merged {folder} into existing NPCs folder")
            
        # Now find the json in NPCs and put it inside the folder
        for json_name in json_names_to_check:
            json_path = os.path.join(NPCS_DIR, json_name)
            if os.path.exists(json_path) and os.path.isfile(json_path):
                shutil.move(json_path, os.path.join(dest_folder, json_name))
                print(f"Moved {json_name} into {dest_folder}")
                break

    # If Characters is empty, remove it
    if not os.listdir(CHARS_DIR):
        os.rmdir(CHARS_DIR)
        print("Removed empty Characters directory")
