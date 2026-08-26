import os
import re

def convert_environments(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    blocks = re.split(r'\n## \d+\. ', '\n' + content)
    lexicons = []
    
    for block in blocks:
        if not block.strip():
            continue
        
        lines = block.strip().split('\n')
        name_line = lines[0].strip()
        
        name = ""
        desc = ""
        sensory = ""
        instructions = ""
        
        for line in lines[1:]:
            if line.startswith("- **Name:**"):
                name = line.replace("- **Name:**", "").strip()
            elif line.startswith("- **Description:**"):
                desc = line.replace("- **Description:**", "").strip()
            elif line.startswith("- **Sensory Signature:**"):
                sensory = line.replace("- **Sensory Signature:**", "").strip()
            elif line.startswith("- **Final Instructions:**"):
                instructions = line.replace("- **Final Instructions:**", "").strip()
                
        if not name:
            name = name_line
            
        keys = [name.lower()]
        
        content_text = f"{desc}\nSensory Signature: {sensory}\nNotes: {instructions}"
        
        lexicon = f"## {name}\n\n**Type:** location\n\n**Keys:** {', '.join(keys)}\n\n**Key Logic:** AND_ANY\n\n**Priority:** 0\n\n**Position:** before_char\n\n**Enabled:** Yes\n\n**Content:**\n\n```\n{content_text.strip()}\n```\n\n"
        lexicons.append(lexicon)
        
    return lexicons

def convert_locations(loc_path):
    with open(loc_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Split by ### 
    blocks = re.split(r'\n### \d+\. ', '\n' + content)
    lexicons = []
    
    current_env = ""
    
    for block in blocks:
        if not block.strip():
            continue
            
        if block.startswith("## "):
            # This is an environment header, e.g. ## A. Blackwood Forest
            continue
            
        lines = block.strip().split('\n')
        name_line = lines[0].strip()
        
        name = ""
        desc = ""
        child_locs = []
        
        parsing_children = False
        
        for line in lines[1:]:
            if line.startswith("- **Name:**"):
                name = line.replace("- **Name:**", "").strip()
            elif line.startswith("- **Description:**"):
                desc = line.replace("- **Description:**", "").strip()
            elif line.startswith("- **Child Locations:**"):
                parsing_children = True
            elif parsing_children and line.strip().startswith("- **"):
                child_locs.append(line.strip().replace("- **", "").strip())
            elif parsing_children and line.strip().startswith("- "):
                child_locs.append(line.strip().replace("- ", "").strip())
            elif parsing_children and line.startswith("##"):
                break # new section
                
        if not name:
            name = name_line
            
        # Stop processing if this block is actually part of the original preamble or something
        if not name or name.startswith("A. ") or name.startswith("B. "):
            continue
            
        keys = [name.lower()]
        
        content_text = desc
        if child_locs:
            content_text += "\nContains: " + " ".join(child_locs)
            
        lexicon = f"## {name}\n\n**Type:** location\n\n**Keys:** {', '.join(keys)}\n\n**Key Logic:** AND_ANY\n\n**Priority:** 0\n\n**Position:** before_char\n\n**Enabled:** Yes\n\n**Content:**\n\n```\n{content_text.strip()}\n```\n\n"
        lexicons.append(lexicon)
        
        # Also create separate entries for the child locations if they have descriptions
        for child in child_locs:
            if ":" in child:
                parts = child.split(":", 1)
                c_name = parts[0].strip().replace("**", "")
                c_desc = parts[1].strip()
                c_keys = [c_name.lower(), name.lower()]
                
                c_lexicon = f"## {c_name}\n\n**Type:** location\n\n**Keys:** {', '.join(c_keys)}\n\n**Key Logic:** AND_ANY\n\n**Priority:** 0\n\n**Position:** before_char\n\n**Enabled:** Yes\n\n**Content:**\n\n```\n{c_desc.strip()} (Located in {name})\n```\n\n"
                lexicons.append(c_lexicon)
        
    return lexicons

def main():
    env_path = r"d:\SvartulfrVerse\Wyvern\environments.md"
    loc_path = r"d:\SvartulfrVerse\Wyvern\locations.md"
    out_path = r"d:\SvartulfrVerse\Wyvern\lexicon\Location.md"
    
    all_lexicons = []
    
    if os.path.exists(env_path):
        all_lexicons.extend(convert_environments(env_path))
        
    if os.path.exists(loc_path):
        all_lexicons.extend(convert_locations(loc_path))
        
    with open(out_path, 'a', encoding='utf-8') as f:
        f.write("\n".join(all_lexicons))
        
    print(f"Appended {len(all_lexicons)} location entries to {out_path}")

if __name__ == "__main__":
    main()
