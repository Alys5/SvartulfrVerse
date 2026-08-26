import os
import json
import re

base_dir = r"d:\SvartulfrVerse\Drafts\Legacy_Lorebooks"
files_to_process = [
    "Svartúlfr_Urban_Lorebook_Family.json",
    "Svartúlfr_Urban_Lorebook_NPC.json",
    "Svartúlfr_Urban_Lorebook_NSFW.json",
    "SvartulfrVerse_Colonial_Characters.json",
    "SvartulfrVerse_Fantasy_Characters.json",
    "SvartulfrVerse_Modern_Characters.json",
    "SvartulfrVerse_SciFi_Characters.json",
    "SvartulfrVerse_Urban_Characters.json",
    "SvartulfrVerse_Viking_Characters.json"
]

char_dirs = [
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Alyssa',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Edric',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Erik',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Jasper',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Logan',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Malachia',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Noah',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Ut',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Wulfnic',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast\Zefir',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Angelo',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Archer_Wolfwood',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Fade_Greymoor',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Finnegan_Novak',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Javier_Sinclair',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Kaladin',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Marcus',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Revazhael',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Roland_(Ghoul)',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Scarlett',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Sierra',
    r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Vincent_Campbell'
]

def normalize(n):
    return n.lower().replace("_", " ")

char_map = {}
for d in char_dirs:
    basename = os.path.basename(d)
    char_map[normalize(basename)] = d

def is_valid_npc_name(name):
    # filter out obvious non-characters
    invalid_words = ["user", "intimacy", "arc", "lse", "npc", "profile", "tier", "nsfw", "general", "scene", "rules"]
    lower_name = name.lower()
    for w in invalid_words:
        if w in lower_name:
            return False
            
    # Check length of words
    words = name.split()
    if len(words) > 3 or len(words) == 0:
        return False
        
    # Check if mostly Title Cased
    return True

def find_target_dir(comment):
    parts = comment.split(" - ")
    if len(parts) == 1:
        parts = comment.split(" | ")
    
    potential_name = parts[0].strip()
    potential_name_lower = potential_name.lower()
    
    # 1. exact match
    for k, v in char_map.items():
        if k == potential_name_lower:
            return v
            
    # 2. substring match
    for k in sorted(char_map.keys(), key=len, reverse=True):
        if potential_name_lower.startswith(k) or k.startswith(potential_name_lower):
            return char_map[k]
    
    # 3. Create new dir in NPCs ONLY if it looks like a valid NPC name
    if is_valid_npc_name(potential_name):
        safe_name = potential_name.replace(" ", "_")
        safe_name = "".join([c for c in safe_name if c.isalnum() or c == "_"])
        if not safe_name:
            return None
        new_dir = os.path.join(r'd:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs', safe_name)
        char_map[safe_name.lower().replace("_", " ")] = new_dir
        return new_dir
        
    return None

processed_count = 0
skipped_count = 0

for filename in files_to_process:
    filepath = os.path.join(base_dir, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    entries = data.get("entries", {})
    if isinstance(entries, list):
        items = entries
    else:
        items = entries.values()
        
    for item in items:
        comment = item.get("comment", "")
        if not comment:
            continue
            
        content = item.get("content", "")
        keys = item.get("key", [])
        
        target_dir = find_target_dir(comment)
        
        if target_dir:
            os.makedirs(target_dir, exist_ok=True)
            note_path = os.path.join(target_dir, "note.md")
            
            md_block = f"\n## {comment}\n\n"
            if keys:
                md_block += f"**Keys:** {', '.join(keys)}\n\n"
            md_block += f"**Content:**\n\n```\n{content}\n```\n\n"
            
            with open(note_path, 'a', encoding='utf-8') as nf:
                nf.write(md_block)
            processed_count += 1
        else:
            # log skipped
            skipped_count += 1
            with open(r"d:\SvartulfrVerse\Drafts\Legacy_Lorebooks\skipped_entries.log", 'a', encoding='utf-8') as sf:
                sf.write(f"SKIPPED: {comment}\n")

print(f"Done. Processed {processed_count}, Skipped {skipped_count}")
