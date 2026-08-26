import os
import re

def process_lexicon_md():
    with open(r"d:\SvartulfrVerse\Drafts\Core_Docs\Lexicon.md", 'r', encoding='utf-8') as f:
        content = f.read()
        
    blocks = re.split(r'\n## ', '\n' + content)
    lexicons_by_type = {}
    
    for block in blocks:
        if not block.strip() or block.strip() == "# Lexicon":
            continue
            
        block_text = f"## {block.strip()}\n\n"
        
        # Find type
        match = re.search(r'\*\*Type:\*\*\s*(\w+)', block_text)
        if match:
            lex_type = match.group(1).lower()
        else:
            lex_type = "concept"
            
        # Map type to file
        file_map = {
            "location": "Location.md",
            "event": "Event.md",
            "concept": "Concept.md",
            "npc": "NPC.md"
        }
        out_file = file_map.get(lex_type, "Concept.md")
        
        if out_file not in lexicons_by_type:
            lexicons_by_type[out_file] = []
            
        lexicons_by_type[out_file].append(block_text)
        
    out_dir = r"d:\SvartulfrVerse\Wyvern\lexicon"
    for filename, entries in lexicons_by_type.items():
        out_path = os.path.join(out_dir, filename)
        with open(out_path, 'a', encoding='utf-8') as f:
            f.write("".join(entries))
            
        print(f"Appended {len(entries)} entries to {filename}")

if __name__ == "__main__":
    process_lexicon_md()
