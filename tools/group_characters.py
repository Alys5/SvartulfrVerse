import os
import shutil

DRAFTS_DIR = r"d:\SvartulfrVerse\Drafts"
CHARS_DIR = os.path.join(DRAFTS_DIR, "Characters")
os.makedirs(CHARS_DIR, exist_ok=True)

# List of known characters with multiple files
CHARACTERS = [
    "Jasper", "Erik", "Malachia", "Noah", "Logan", "Edric", "Alyssa", 
    "Wulfnic", "Nixara", "Zefir", "Ut", "Kaladin", "Marcus", "Angelo", "Scarlett", "Sierra"
]

# Folders to search for character files
SEARCH_FOLDERS = [
    "Core_Docs",
    "Character_Cards_V1/Main_Cast",
    "Character_Cards_V1/NPCs",
    "Narrative_Tiers",
    "Templates_and_Scripts",
    "." # Root Drafts
]

for char in CHARACTERS:
    char_folder = os.path.join(CHARS_DIR, char)
    
    # We will search through all search folders and move files/directories
    # that contain the character's name.
    
    files_to_move = []
    
    for folder in SEARCH_FOLDERS:
        folder_path = os.path.join(DRAFTS_DIR, folder)
        if not os.path.exists(folder_path):
            continue
            
        for item in os.listdir(folder_path):
            if item == "Characters":
                continue
                
            item_path = os.path.join(folder_path, item)
            
            # Check if character name is in the filename
            # Use whole word matching or careful substring to avoid 'User' matching 'User'
            # For simplicity, we check if char name is in the item name
            
            # Special case for DJFrequency_Bot -> Jasper
            if char == "Jasper" and item == "DJFrequency_Bot":
                files_to_move.append((item_path, item))
                continue
            
            # Skip if it's the target folder itself or a README
            if item == char or item.startswith("README"):
                continue
                
            # If the character's name is in the filename (case insensitive)
            if char.lower() in item.lower():
                # Avoid overlapping names like "Card_Jasper" matching "per" (if we used simple in)
                # But here we are using the full name
                files_to_move.append((item_path, item))

    if files_to_move:
        os.makedirs(char_folder, exist_ok=True)
        for src_path, item_name in files_to_move:
            dest_path = os.path.join(char_folder, item_name)
            # if moving a directory, use shutil.move, same for file
            try:
                shutil.move(src_path, dest_path)
                print(f"Moved {src_path} -> {dest_path}")
            except Exception as e:
                print(f"Error moving {src_path}: {e}")

print("Character grouping complete.")
