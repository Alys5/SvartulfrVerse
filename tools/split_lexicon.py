import os
import re
import shutil

LEXICON_PATH = r"d:\SvartulfrVerse\Drafts\Core_Docs\Lexicon.md"
CHARS_DIR = r"d:\SvartulfrVerse\Drafts\Characters"

with open(LEXICON_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Split the content by "## "
blocks = content.split("\n## ")

new_lexicon_blocks = [blocks[0]] # the first part before the first "## "

existing_char_folders = os.listdir(CHARS_DIR) if os.path.exists(CHARS_DIR) else []

for block in blocks[1:]:
    lines = block.split("\n")
    title = lines[0].strip()
    
    # Re-add the "## " that was removed by split
    full_block = "## " + block
    
    # Check if it's an NPC or Character
    is_char = False
    for line in lines:
        if line.startswith("**Type:**") and ("npc" in line.lower() or "char" in line.lower() or "character" in line.lower()):
            is_char = True
            break
            
    if is_char:
        # Determine folder name
        # Try to match first name to existing folders (e.g. "Jasper Douglas" -> "Jasper")
        first_name = title.split()[0]
        folder_name = title.replace(" ", "_")
        
        for existing in existing_char_folders:
            if existing.lower() == first_name.lower():
                folder_name = existing
                break
                
        char_folder = os.path.join(CHARS_DIR, folder_name)
        os.makedirs(char_folder, exist_ok=True)
        
        note_path = os.path.join(char_folder, "note.md")
        
        # Append to note.md in case it already exists or multiple blocks apply
        with open(note_path, "a", encoding="utf-8") as nf:
            nf.write(full_block + "\n\n")
            
        print(f"Extracted {title} to {char_folder}\\note.md")
    else:
        new_lexicon_blocks.append(full_block)

# Reassemble the Lexicon.md
new_lexicon_content = "\n".join(new_lexicon_blocks)

with open(LEXICON_PATH, "w", encoding="utf-8") as f:
    f.write(new_lexicon_content)

print("Lexicon splitting complete.")
