import os
import json
import re

def parse_note_md(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    entries = []
    
    # Split by \n## to get each block
    blocks = re.split(r'\n## ', '\n' + content)
    
    for block in blocks:
        block = block.strip()
        if not block:
            continue
            
        # Extract title (first line)
        lines = block.split('\n')
        title = lines[0].strip()
        
        # Check if it has **Type:**
        if '**Keys:**' not in block or '**Content:**' not in block:
            continue
            
        try:
            # Extract Keys
            keys_match = re.search(r'\*\*Keys:\*\*(.*?)\n', block)
            if not keys_match:
                continue
            keys_str = keys_match.group(1).strip()
            keys = [k.strip() for k in keys_str.split(',') if k.strip()]
            
            # Extract Content
            content_match = re.search(r'\*\*Content:\*\*\s*```(.*?)```', block, re.DOTALL)
            if not content_match:
                content_match = re.search(r'\*\*Content:\*\*\s*(.*)', block, re.DOTALL)
                if not content_match:
                    continue
            
            entry_content = content_match.group(1).strip()
            
            entry = {
                "name": title,
                "key": keys,
                "content": entry_content,
                "type": "concept",
                "priority": 100,
                "insertion_order": len(entries),
                "enabled": True,
                "key_logic": "AND_ANY"
            }
            entries.append(entry)
        except Exception as e:
            print(f"Error parsing block in {filepath}: {e}")
            
    return entries

def process_character_folders(base_path, target_dir):
    os.makedirs(target_dir, exist_ok=True)
    
    for char_folder in os.listdir(base_path):
        char_path = os.path.join(base_path, char_folder)
        if not os.path.isdir(char_path):
            continue
            
        note_path = os.path.join(char_path, 'note.md')
        if not os.path.exists(note_path):
            continue
            
        entries = parse_note_md(note_path)
        
        if entries:
            print(f"Parsing {char_folder}...")
            lorebook = {
                "spec": "lorebook_v2",
                "spec_version": "2.0",
                "name": f"{char_folder}_Lore",
                "description": f"Personal Lorebook for {char_folder}",
                "entries": entries
            }
            
            out_file = os.path.join(target_dir, f"{char_folder}_Lore.json")
            with open(out_file, 'w', encoding='utf-8') as f:
                json.dump(lorebook, f, indent=4, ensure_ascii=False)
            print(f"  -> Created {out_file} with {len(entries)} entries.")

def main():
    target_dir = r"d:\SvartulfrVerse\Wyvern\lorebooks\Characters"
    
    print("Processing Main_Cast...")
    process_character_folders(r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\Main_Cast", target_dir)

if __name__ == "__main__":
    main()
