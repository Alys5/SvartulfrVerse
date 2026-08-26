import os

base_path = r"d:\SvartulfrVerse\Drafts"

readmes = {
    "Core_Docs": "# Core Docs\nQuesti file sono la **fonte di verità primaria** per le regole del mondo (Hard World Laws), la struttura dei distretti, le definizioni delle macro-fazioni e il game design generale (Master Design). Includono `World_Seed.md` e `Svartúlfr.md`.",
    "Legacy_Lorebooks": "# Legacy Lorebooks\nQuesti file JSON massicci contengono decine di migliaia di righe di worldbuilding originale. **Da usare SOLO come riferimento/estrazione dati** per generare i nuovi Lexicon V2 ottimizzati. Non modificarli.",
    "Character_Cards_V1": "# Character Cards V1\nQui risiedono i JSON legacy (schede bot) di tutti i personaggi. All'interno delle chiavi `description`, `scenario` o `system_prompt` spesso si nasconde **lore essenziale e profonda** (es. parentela, ruoli specifici) che non si trova nei Lorebook generali. Divisi in `Main_Cast/` e `NPCs/`.",
    "Narrative_Tiers": "# Narrative Tiers\nAppunti e snippet Markdown usati per gestire la progressione narrativa, eventi stagionali (es. Halloween) e l'Intimacy Profile in base all'Arc corrente.",
    "Templates_and_Scripts": "# Templates and Scripts\nContiene guide, script JS per i motori (Janitor/Wyvern), template di creazione per Card e Lorebook, e gli audit dei prompt."
}

for folder, content in readmes.items():
    path = os.path.join(base_path, folder, "README.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
        
print("READMEs created.")
