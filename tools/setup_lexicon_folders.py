import os

def setup_lexicon_folders():
    base_dir = r"d:\SvartulfrVerse\Wyvern\lexicon"
    os.makedirs(base_dir, exist_ok=True)
    
    categories = [
        "NPC", "Mob", "Creature", "Move", "Item", "Furniture", 
        "Job", "Vehicle", "Location", "Event", "Concept", "Memory", "Other"
    ]
    
    for cat in categories:
        filepath = os.path.join(base_dir, f"{cat}.md")
        if not os.path.exists(filepath):
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(f"# {cat} Lexicon\n\n")
                f.write(f"Questo file contiene le entry del Lexicon per la categoria {cat}.\n")
                
    print(f"Created {len(categories)} lexicon files in {base_dir}")

if __name__ == "__main__":
    setup_lexicon_folders()
