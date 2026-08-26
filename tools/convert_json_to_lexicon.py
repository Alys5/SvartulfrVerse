import os
import json
import glob

def clean_title(title):
    # Remove weird brackets and long prefixes
    title = title.replace('[Topic: ', '').replace(']', '')
    if len(title) > 50:
        return title[:50] + "..."
    return title

def convert_json_to_lexicon(json_path, out_file, default_type="concept"):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    if isinstance(data, list):
        entries = data
    else:
        entries = data.get('entries', [])
        
    if not entries:
        print(f"No entries found in {json_path}")
        return 0
        
    lexicons = []
    
    # Handle both dict-style and list-style entries
    if isinstance(entries, dict):
        entry_list = list(entries.values())
    else:
        entry_list = entries
        
    for entry in entry_list:
        keys = entry.get('key', [])
        content = entry.get('content', '').strip()
        comment = entry.get('comment', '').strip()
        
        if not content or not keys:
            continue
            
        # Determine title
        title = comment if comment else (keys[0] if keys else f"Entry {uid}")
        title = clean_title(title)
        
        # Keys string
        keys_str = ", ".join([k.lower() for k in keys])
        
        lexicon = (
            f"## {title}\n\n"
            f"**Type:** {default_type}\n\n"
            f"**Keys:** {keys_str}\n\n"
            f"**Key Logic:** AND_ANY\n\n"
            f"**Priority:** 0\n\n"
            f"**Position:** before_char\n\n"
            f"**Enabled:** Yes\n\n"
            f"**Content:**\n\n```\n{content}\n```\n\n"
        )
        lexicons.append(lexicon)
        
    if lexicons:
        with open(out_file, 'a', encoding='utf-8') as f:
            f.write("\n".join(lexicons))
            
    return len(lexicons)

def main():
    lexicon_dir = r"d:\SvartulfrVerse\Wyvern\lexicon"
    concept_out = os.path.join(lexicon_dir, "Concept.md")
    
    # 1. Legacy JSONs
    legacy_dir = r"d:\SvartulfrVerse\Drafts\Legacy_Lorebooks"
    legacy_files = [
        "Blackwood_City.json",
        "Geografia_e_Viaggi.json",
        "Los_Angeles_Underworld.json",
        "Solarton_SUCC.json"
    ]
    
    total_converted = 0
    for file in legacy_files:
        path = os.path.join(legacy_dir, file)
        if os.path.exists(path):
            count = convert_json_to_lexicon(path, concept_out)
            print(f"Converted {count} entries from {file}")
            total_converted += count
            
    # 2. Newly generated JSONs in Wyvern/lorebooks
    new_dir = r"d:\SvartulfrVerse\Wyvern\lorebooks"
    new_files = [
        "Blackwood_Factions.json",
        "Species_Compendium.json",
        "World_Mechanics.json",
        "LSE_Biology_Intimacy.json",
        "Douglas_DCC.json"
    ]
    
    for file in new_files:
        path = os.path.join(new_dir, file)
        if os.path.exists(path):
            count = convert_json_to_lexicon(path, concept_out)
            print(f"Converted {count} entries from {file}")
            total_converted += count

    print(f"Total entries converted to Concept.md: {total_converted}")

if __name__ == "__main__":
    main()
