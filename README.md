# Svartúlfr Urban - Wyvern Migration Plan (Global)

Questo è il piano di implementazione globale per convertire il materiale grezzo di "Svartúlfr Urban" (attualmente in Drafts) nel formato strutturato richiesto da Wyvern.

## Obiettivo

Importare e mappare la complessa lore del mondo Svartúlfr, utilizzando i file standard e ottimizzati per la piattaforma Wyvern (World Info, Environments, Locations, Lexicons, Scenarios, Character Cards).

## Documentazione di Riferimento

- https://wiki.wyvern.chat/Features/Lorebooks
- https://wiki.wyvern.chat/Features/Worlds
- https://wiki.wyvern.chat/en/Features/Character-Cards
- https://wiki.wyvern.chat/Features/Worlds/Scenario-Guided-Intro

## Fasi dell'Implementazione

### [COMPLETATO] Step 1: World Info & Details

- Generazione del file `world_info.md` con il core setting (Svartúlfr | Urban).
- Inclusione delle regole di comportamento dell'AI (Hard World Laws), AnyPOV Macros (con variabili native di Wyvern) e formattazione narrativa.

### [COMPLETATO] Step 2: Environments & Locations

- Suddivisione del mondo in Environments (Blackwood Forest, Blackwood City, Hex Valley, Solarton, Los Angeles, Bakersfield).
- Creazione del file `locations.md` con l'albero gerarchico dei distretti, edifici e nascondigli, in perfetto allineamento con `gerarchia_location.txt` e i file JSON storici (`SUCC-U-VERSE`, `Underworld`).

### [COMPLETATO] Step 3: Character Cards (JSON)

- Creazione dei file JSON v2 (in `Wyvern/characters`) per i personaggi di Tier 1 (Erik, Malachia, Noah, Jasper, Logan, Edric).
- Formattazione delle description e dei system prompt per includere il loro ruolo nel branco, il comportamento e la fisiologia.

### [IN CORSO] Step 4: Lexicon & Lorebooks (Revisione Guidata)

- Conversione mirata dei massicci JSON legacy in Lexicon ottimizzati a risparmio di token (Keywords + Logic).
- Creazione di script Python (nella cartella `tools/`) per l'automazione modulare della generazione JSON.
- Suddivisione in 5 Blocchi di Concetti:
  1. Lupine Social Ecology (LSE) - **[COMPLETATO]** Generato `LSE_Lexicon.json`
  2. Famiglia Douglas (DCC) - **[COMPLETATO]** Generato `Douglas_DCC.json` (con lignaggio Bloodmoon)
  3. Fazioni e Blackwood City - **[Attualmente in lavorazione in implementation_plan.md]**
  4. Dinamiche Intime (LSE Biology) - **[DA FARE]**
  5. World Building Generale - **[DA FARE]**

### [DA FARE] Step 5: Scenarios & Guided Intro

- Creazione del setup iniziale del mondo (Scenario e Guided Intro) per l'interfaccia di Wyvern.
- Definizione dell'hook narrativo.

### [DA FARE] Step 6: Graphic Assets Prompts

- Creazione di `assets/prompts.md` per assicurare uniformità generativa (AI Image Generation) per i personaggi e i luoghi del mondo Svartúlfr.
