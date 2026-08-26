import os
import shutil

LEXICON_PATH = r"d:\SvartulfrVerse\Drafts\Core_Docs\Lexicon.md"

ranges_targets = [
    (24, 44, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Malachia"]),
    (69, 89, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Erik"]),
    (91, 111, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Wulfnic"]),
    (113, 133, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Vincent_Campbell"]),
    (134, 155, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Alyssa"]),
    (178, 199, [r"d:\SvartulfrVerse\Wyvern\locations.md"]),
    (200, 221, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Erik"]),
    (223, 243, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Finnegan_Novak"]),
    (244, 265, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Archer_Wolfwood"]),
    (267, 287, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Javier_Sinclair"]),
    (288, 309, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Javier_Sinclair"]),
    (311, 353, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Javier_Sinclair"]),
    (355, 375, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Vincent_Campbell"]),
    (376, 397, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Erik"]),
    (398, 419, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Alyssa"]),
    (464, 485, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Alyssa", r"d:\SvartulfrVerse\Wyvern\locations.md"]),
    (487, 507, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Malachia"]),
    (509, 529, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Erik"]),
    (530, 551, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Vincent_Campbell"]),
    (553, 573, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Wulfnic"]),
    (574, 617, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Jasper"]),
    (619, 683, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Alyssa"]),
    (685, 705, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Sierra"]),
    (707, 727, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Malachia"]),
    (729, 750, [r"d:\SvartulfrVerse\Wyvern\locations.md"]),
    (839, 859, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Logan"]),
    (860, 881, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Erik"]),
    (882, 903, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Logan"]),
    (905, 925, [r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Scarlett"])
]

# Read Lexicon
with open(LEXICON_PATH, "r", encoding="utf-8") as f:
    lines = f.readlines()

lines_to_delete = set()

# Process each range
for start_line, end_line, targets in ranges_targets:
    # lines array is 0-indexed, user provided 1-indexed
    start_idx = start_line - 1
    end_idx = end_line
    
    snippet = "".join(lines[start_idx:end_idx])
    
    # Mark lines for deletion
    for i in range(start_idx, end_idx):
        lines_to_delete.add(i)
        
    for target in targets:
        # Check if it's a folder target or file target
        if target.endswith(".md") and "locations" in target:
            # It's locations.md
            with open(target, "a", encoding="utf-8") as tf:
                tf.write("\n" + snippet.strip() + "\n\n")
            print(f"Appended lines {start_line}-{end_line} to {target}")
        else:
            # It's a character folder
            folder_path = target
            os.makedirs(folder_path, exist_ok=True)
            note_path = os.path.join(folder_path, "note.md")
            
            with open(note_path, "a", encoding="utf-8") as tf:
                tf.write("\n" + snippet.strip() + "\n\n")
            print(f"Appended lines {start_line}-{end_line} to {note_path}")
            
            # If the user specified a folder but there's a loose JSON next to it, move it inside
            parent_dir = os.path.dirname(folder_path)
            char_name = os.path.basename(folder_path)
            json_file = os.path.join(parent_dir, f"{char_name}.json")
            if os.path.exists(json_file):
                shutil.move(json_file, os.path.join(folder_path, f"{char_name}.json"))
                print(f"Moved {char_name}.json into its folder")

# Write new Lexicon
new_lines = [line for i, line in enumerate(lines) if i not in lines_to_delete]
with open(LEXICON_PATH, "w", encoding="utf-8") as f:
    f.writelines(new_lines)
    
print("Cleanup complete!")
