import json
import uuid
import re
from pathlib import Path

target_files = [
    Path(r"d:\SvartulfrVerse\1_template\SvartulfrVerse_World_Template.json"),
    Path(r"d:\SvartulfrVerse\1_template\SvartulfrVerse_Workd_Template.json"),
    Path(r"d:\SvartulfrVerse\2_Export\World\Fantasy\SvartulfrVerse_Fantasy.json"),
    Path(r"d:\SvartulfrVerse\2_Export\World\Modern\SvartulfrVerse_Modern.json"),
    Path(r"d:\SvartulfrVerse\2_Export\World\Pirate\SvartulfrVerse_Pirate.json"),
    Path(r"d:\SvartulfrVerse\2_Export\World\Regency\SvartulfrVerse_Regency.json"),
    Path(r"d:\SvartulfrVerse\2_Export\World\SciFi\SvartulfrVerse_SciFi.json"),
    Path(r"d:\SvartulfrVerse\2_Export\World\Urban\SvartulfrVerse_Urban.json"),
    Path(r"d:\SvartulfrVerse\2_Export\World\Viking\SvartulfrVerse_Viking.json"),
    Path(r"d:\SvartulfrVerse\2_Export\World\Wasteland\SvartulfrVerse_Wasteland.json")
]

def clean_content(content):
    content = re.sub(r'\[?Source:.*?\]?', '', content)
    content = re.sub(r'Source:.*', '', content)
    content = re.sub(r'(?i)MacroCosmo', '', content)
    content = re.sub(r'(?i)MicroCosmo', '', content)
    content = re.sub(r'(?i)Engine Data', '', content)
    content = re.sub(r'(?i)Alternate Universe', '', content)
    content = re.sub(r'(?i)AU:', '', content)
    content = re.sub(r'\s+', ' ', content).strip()
    return content

def get_placement(category, prefix, tags):
    cat_lower = str(category).lower()
    prefix_lower = str(prefix).lower()
    
    if "character" in cat_lower or "personaggio" in cat_lower or prefix_lower in ["npc", "fam", "bst"] or "character" in tags:
        return "personality"
    if "location" in cat_lower or "event" in cat_lower or prefix_lower in ["loc", "sec"] or "location" in tags or "event" in tags:
        return "scenario"
    return "default"

def get_allowed_tags(tags):
    allowed = {"character", "location", "lore", "event", "faction", "relationship", "item", "backstory", "secret", "magic", "world", "culture", "history", "important", "technology"}
    if not isinstance(tags, list):
        tags = [tags]
    return [t for t in tags if str(t).lower() in allowed]

results = []

for filepath in target_files:
    if not filepath.exists():
        continue
        
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        continue
        
    if not isinstance(data, list):
        if isinstance(data, dict):
            if "entries" in data: data = data["entries"]
            elif "data" in data: data = data["data"]
            else: data = [data]
            
    optimized_entries = []
    
    for item in data:
        if not isinstance(item, dict):
            continue
            
        keys = item.get("key", [])
        if isinstance(keys, str): keys = [keys]
        
        keysec = item.get("keysecondary", [])
        if isinstance(keysec, str): keysec = [keysec]
            
        content = item.get("content", "")
        clean_c = clean_content(content)
        
        tags_raw = item.get("tags", [])
        tags = get_allowed_tags(tags_raw)
        
        category = item.get("category", "")
        prefix = item.get("prefix", "")
        placement = get_placement(category, prefix, tags)
        
        placement_position = "before" if placement == "personality" else "after"
        
        # Enforce exact target schema
        entry = {
            "activationMode": item.get("activationMode", "standard"),
            "activationScript": item.get("activationScript", ""),
            "id": str(uuid.uuid4()),
            "enabled": item.get("enabled", True),
            "extensions": {},
            "name": item.get("name", "SvartulfrVerse Entry"),
            "comment": item.get("comment", ""),
            "category": item.get("category", "other"),
            "tags": tags,
            "content": clean_c,
            "constant": item.get("constant", False),
            "key": keys,
            "keysRaw": ", ".join(keys),
            "keysecondary": keysec,
            "keysecondaryRaw": ", ".join(keysec),
            "selectiveLogic": item.get("selectiveLogic", 0),
            "case_sensitive": item.get("case_sensitive", False),
            "matchWholeWords": item.get("matchWholeWords", True),
            "minMessages": item.get("minMessages", 0),
            "placement": placement,
            "placementPosition": item.get("placementPosition", placement_position),
            "insertion_order": item.get("insertion_order", 100),
            "priority": item.get("priority", 10),
            "probability": item.get("probability", 100),
            "inclusionGroup": item.get("inclusionGroup", []),
            "inclusionGroupRaw": item.get("inclusionGroupRaw", ""),
            "groupWeight": item.get("groupWeight", 100),
            "prioritizeInclusion": item.get("prioritizeInclusion", False),
            "keyMatchPriority": item.get("keyMatchPriority", False)
        }
        optimized_entries.append(entry)

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(optimized_entries, f, indent=2, ensure_ascii=False)
        
    results.append({"file": filepath.name, "optimized_entries": len(optimized_entries)})

print(json.dumps(results, indent=2))
