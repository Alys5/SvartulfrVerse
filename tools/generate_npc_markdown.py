import os
import re

def parse_note_md_blocks(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    blocks_to_keep = []
    # Split by \n## to get each block
    blocks = re.split(r'\n## ', '\n' + content)
    
    for block in blocks:
        block = block.strip()
        if not block:
            continue
            
        # Check if it has **Keys:** and **Content:**
        if '**Keys:**' not in block or '**Content:**' not in block:
            continue
            
        # Re-add the ## prefix that was stripped by split
        block_text = f"## {block}\n"
        
        # Ensure **Type:** exists. If not, add **Type:** NPC
        if '**Type:**' not in block_text:
            # Insert after the title line
            lines = block_text.split('\n')
            lines.insert(1, "\n**Type:** NPC\n")
            block_text = '\n'.join(lines)
            
        blocks_to_keep.append(block_text)
            
    return blocks_to_keep

def generate_npcs_md():
    base_path = r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs"
    output_path = r"d:\SvartulfrVerse\Wyvern\lexicon\NPC.md"
    
    all_blocks = []
    
    all_blocks.append("# NPC Lexicon\n")
    all_blocks.append("Questo file contiene tutti i Lexicon (Lorebook entries) relativi agli NPC del SvartúlfrVerse.\n\n")
    
    # Sort folders alphabetically
    folders = sorted([f for f in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, f))])
    
    for char_folder in folders:
        note_path = os.path.join(base_path, char_folder, 'note.md')
        if not os.path.exists(note_path):
            continue
            
        blocks = parse_note_md_blocks(note_path)
        if blocks:
            all_blocks.append(f"---\n\n# {char_folder.replace('_', ' ')}\n\n")
            all_blocks.extend(blocks)
            all_blocks.append("\n")
            
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(all_blocks))
        
    print(f"Generated {output_path} successfully.")

if __name__ == "__main__":
    generate_npcs_md()
