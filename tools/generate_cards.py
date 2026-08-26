import os
import json
import re

source_dir = r"d:\SvartulfrVerse\Drafts\Svartúlfr_Urban"
target_dir = r"d:\SvartulfrVerse\Wyvern\characters"

os.makedirs(target_dir, exist_ok=True)

characters = [
    {"name": "Erik Douglas", "file": "Card_Erik.md", "short_name": "Erik"},
    {"name": "Malachia Douglas-Bloodmoon", "file": "Card_Malachia.md", "short_name": "Malachia"},
    {"name": "Noah Douglas-Bloodmoon", "file": "Card_Noah.md", "short_name": "Noah"},
    {"name": "Jasper Douglas-Bloodmoon", "file": "Card_Jasper.md", "short_name": "Jasper"},
    {"name": "Logan Douglas", "file": "Card_Logan.md", "short_name": "Logan"},
]

def create_card_json(char_name, short_name, md_content):
    # Extract some basic info for personality
    overview_match = re.search(r"### CHARACTER OVERVIEW\n+(.*?)(?=###|$)", md_content, re.DOTALL)
    overview = overview_match.group(1).strip() if overview_match else ""
    
    desc_str = f"<{short_name}>\n{md_content}\n</{short_name}>"
    
    card = {
        "spec": "chara_card_v2",
        "spec_version": "2.0",
        "name": short_name,
        "description": desc_str,
        "personality": overview[:500],
        "scenario": f"[{short_name} is in Blackwood City.]",
        "first_mes": f"*[{short_name} looks at you.]*\n\n\"What do you want?\"",
        "mes_example": "",
        "creator_notes": overview,
        "system_prompt": f"<gamemaster_instructions>\n  <role>You are embodying {short_name}. Use the provided description to guide your actions.</role>\n</gamemaster_instructions>",
        "post_history_instructions": "",
        "alternate_greetings": [],
        "tags": ["Werewolf", "Modern", "Fantasy", "Male"],
        "creator": "SvartulfrVerse",
        "character_version": "v1",
        "extensions": {
            "depth_prompt": {
                "prompt": f"Focus on {short_name}'s specific traits from the character description.",
                "depth": 4
            }
        }
    }
    
    # Wyvern/Tavern v2 format requires duplicating fields in data
    card["data"] = {k: v for k, v in card.items() if k not in ["spec", "spec_version", "data"]}
    
    return card

for char in characters:
    file_path = os.path.join(source_dir, char["file"])
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        card_json = create_card_json(char["name"], char["short_name"], content)
        out_path = os.path.join(target_dir, f"{char['short_name']}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(card_json, f, indent=2, ensure_ascii=False)
        print(f"Generated {out_path}")
    else:
        print(f"File not found: {file_path}")

# Edric is special, from Tier2_NPC_Entries.md
edric_text = """Edric is a 12-year-old Gamma Pup (Douglas line). Secretly Erik's illegitimate son from a Rut, Logan claimed the boy as his own to protect him from Erik's wrath. Logan's cover story is universally believed. Edric acts tough, using internet slang and bravado, but is deeply terrified of Erik (whom he doesn't know is his biological father). He clings to Logan, viewing him as his real dad, and usually hides in Logan's auto shop. He views Malachia as a silent guardian and considers {{user}} his safe person. NOTE: Edric is strictly a background NPC and non-participant in any romantic/intimate scenarios."""

edric_card = create_card_json("Edric Douglas", "Edric", edric_text)
edric_path = os.path.join(target_dir, "Edric.json")
with open(edric_path, "w", encoding="utf-8") as f:
    json.dump(edric_card, f, indent=2, ensure_ascii=False)
print(f"Generated {edric_path}")
