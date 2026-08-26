import os
import shutil

DRAFTS_DIR = r"d:\SvartulfrVerse\Drafts"

FOLDERS = [
    "Core_Docs",
    "Legacy_Lorebooks",
    "Character_Cards_V1/Main_Cast",
    "Character_Cards_V1/NPCs",
    "Narrative_Tiers",
    "Templates_and_Scripts"
]

MAIN_CAST_NAMES = [
    "Erik", "Malachia", "Noah", "Jasper", "Logan", "Edric", "Alyssa", "Wulfnic", "Nixara", "Zefir", "Ut"
]

for folder in FOLDERS:
    os.makedirs(os.path.join(DRAFTS_DIR, folder), exist_ok=True)

for filename in os.listdir(DRAFTS_DIR):
    filepath = os.path.join(DRAFTS_DIR, filename)
    if os.path.isdir(filepath):
        continue

    dest_folder = None
    
    # Core_Docs
    if filename in ["World_Seed.md", "Master_Design.md", "Svartúlfr.md", "Lexicon.md", "Alyssa.md", "Jasper.md", "Logan.md", "Svartúlfr_Urban_User.md", "User.md", "profile.md", "Svartúlfr_Urban_JanitorAI.md"] or filename.startswith("Card_") or filename.startswith("SvartulfrVerse_Visual_"):
        dest_folder = "Core_Docs"
    
    # Narrative_Tiers
    elif filename.startswith("Tier"):
        dest_folder = "Narrative_Tiers"
    
    # Templates_and_Scripts
    elif "template" in filename.lower() or "guide_" in filename or "creation" in filename.lower() or filename.endswith(".js") or filename.endswith(".html") or "_Audit" in filename or filename.startswith("Revise_") or filename.startswith("Revision_") or filename.startswith("Prompt_"):
        dest_folder = "Templates_and_Scripts"
    
    # Legacy_Lorebooks
    elif "Lorebook" in filename or filename.startswith("LSE_") or filename.startswith("Razze_") or filename.startswith("Dinastie_") or filename in ["Blackwood_City.json", "Los_Angeles_Underworld.json", "Solarton_SUCC.json", "Geografia_e_Viaggi.json", "succ.json", "underworld.json", "gerarchia_location.txt"] or (filename.startswith("SvartulfrVerse_") and ("_World.json" in filename or "_Characters.json" in filename)):
        dest_folder = "Legacy_Lorebooks"
    
    # Character_Cards_V1
    elif filename.endswith(".json") or filename.startswith("Instructions_"):
        is_main = False
        for name in MAIN_CAST_NAMES:
            if name.lower() in filename.lower():
                is_main = True
                break
        if is_main:
            dest_folder = "Character_Cards_V1/Main_Cast"
        else:
            dest_folder = "Character_Cards_V1/NPCs"
            
    if dest_folder:
        shutil.move(filepath, os.path.join(DRAFTS_DIR, dest_folder, filename))
        print(f"Moved {filename} -> {dest_folder}")

print("Organization complete.")
