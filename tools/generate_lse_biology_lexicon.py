import json
import os

def generate_lse_biology():
    input_path = r"d:\SvartulfrVerse\Drafts\Legacy_Lorebooks\LSE_Lupine_Social_Ecology.json"
    output_path = r"d:\SvartulfrVerse\Wyvern\lorebooks\LSE_Biology_Intimacy.json"
    
    with open(input_path, 'r', encoding='utf-8') as f:
        legacy_data = json.load(f)
        
    entries = []
    
    for idx, entry_data in legacy_data['entries'].items():
        name = entry_data.get('comment', 'Unknown Entry').replace('LSE - ', '')
        
        keys = entry_data.get('key', [])
        keys.extend(entry_data.get('keysecondary', []))
        
        clean_keys = []
        for k in keys:
            if k and k.lower() not in [ck.lower() for ck in clean_keys]:
                clean_keys.append(k)
                
        content = entry_data.get('content', '')
        
        new_entry = {
            "name": name,
            "key": clean_keys,
            "content": content,
            "type": "concept",
            "priority": 100,
            "insertion_order": len(entries),
            "enabled": True,
            "key_logic": "AND_ANY"
        }
        entries.append(new_entry)
        
    wyvern_lorebook = {
        "spec": "lorebook_v2",
        "spec_version": "2.0",
        "name": "LSE_Biology_Intimacy",
        "description": "Lupine Social Ecology - Biology, Heat/Rut Cycles, Subgenders, and Pack Rules",
        "entries": entries
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(wyvern_lorebook, f, indent=4, ensure_ascii=False)
        
    print(f"Generated {output_path} with {len(entries)} entries.")

if __name__ == "__main__":
    generate_lse_biology()
