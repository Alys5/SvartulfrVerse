# BOT_EXPORT_SPECIFICATION

Questo documento definisce gli schemi di esportazione canonici per i bot della lorebase. Si descrivono i formati specifici per **JanitorAI**, **SillyTavern** e un **formato JSON generico**, e si mappa ciascun campo alle entità canoniche del database (personaggi, famiglie, esperienze, ecc.). Tutti i dati esportati devono derivare dal canone (nessuna generazione di lore non autorizzata) e includere tracciabilità alle fonti nel repository, in linea con le regole di governance (ad es. R-008_Bot_Rules).

## 1. Formato JanitorAI

- **Struttura JSON:** Il character card di JanitorAI utilizza un file JSON con chiavi come `"char_name"`, `"body"`, `"face_url"`, `"outfit_url"`, `"first_persona"`, `"second_persona"`, `"personality"`, `"example_dialogue"`, `"greeting"`, e altri metadata (es. `"gender"`, `"age"`, `"species"`). Questi campi corrispondono alle informazioni base del personaggio (nome, descrizione, personalità, ruoli, ecc.).  
- **Funzionalità di export:** È possibile esportare la scheda come JSON (oppure PNG) tramite script/community tools. Lo JSON di JanitorAI, noto come *character-card v2*, include anche un campo `"canon_layer"` che indica il livello canonico (p.es. active/historical/cultural).  
- **Mapping dei campi:** Ogni campo JSON di JanitorAI si collega a un dato canonico nel repository. Ad esempio, `"char_name"` → `C_<ID>.Name`, `"first_persona"` → combinazione di `C_<ID>.Description` e `C_<ID>.Personality`, `"example_dialogue"` → estratto dal `C_<ID>.Roleplay_Script`, ecc. I link alle risorse (URL di volti, outfit) devono far riferimento ad asset autorizzati. Tutti i valori devono provenire dal database canonico o essere derivabili da esso.  
- **Conformità R-008:** In accordo con R-008, il JSON di JanitorAI deve essere *canon-derived* (tutti i testi generati sono tratti da campi nel database), senza alcun lore aggiunto manualmente. Ogni valore deve essere tracciato alla sua fonte originale (ad es. aggiungendo riferimenti interni o note bibliografiche nel JSON, secondo lo schema di attributo dell’engine). L’uso degli script/lorebook di JanitorAI deve rispettare i layer canonici definiti (attivo vs storico vs culturale), senza mischiare livelli contrari (layer compliance).

## 2. Formato SillyTavern

- **Struttura JSON:** SillyTavern utilizza uno schema standard (chiamato spesso *chara_card_v3*) con campi quali: `character_name`, `character_desc`, `personality`, `first_persona`, `scenario`, `example_dialogue`, `avatar_url`, `tags` (lista di tag semantici), ecc. Ogni campo ha significato simile: `character_name` è il nome del personaggio, `character_desc` la descrizione/biografia, `personality` tratti caratteriali, `first_persona` le principali linee guida comportamentali, `scenario` il contesto iniziale di ruolo, `example_dialogue` dialoghi esemplificativi, ecc.  
- **Mapping dei campi:** Mappiamo questi campi alle entità canoniche: per es. `character_name` → `C_<ID>.Name`, `character_desc` → `C_<ID>.Full_Bio` (biografia approfondita combinando background ed esperienze), `personality` → sintesi di `C_<ID>.Traits` o `C_<ID>.Personality`, `first_persona` → `C_<ID>.Roleplay_Prompts`, `scenario` → `C_<ID>.Current_Context`, `example_dialogue` → commenti di `C_<ID>.Dialogue_Examples`. L’attributo `tags` può includere tag canonici (ruolo sociale, famiglie, culture: es. “Douglas”, “royalty”, “soldier”). L’URL dell’avatar (`avatar_url`) deve puntare a immagini pre-approvate (nessun caricamento arbitrario).  
- **Conformità R-008:** Come per JanitorAI, il JSON di SillyTavern deve evitare “iniezioni” di dati creati manualmente. Tutte le stringhe devono corrispondere a campi del database. Ad esempio, non si inventano nuovi eventi nel `scenario`, ma si usa `C_<ID>.Background`. La regola **“Layer Compliance”** implica che se un personaggio ha uno stato “storico”, il lore riportato deve essere tratto dallo strato storico del canone. Inoltre, il JSON includerà un campo `lorebook_attribution` o `provenance` che elenca i file sorgente e le regole applicate (es. R-008, ADR-XYZ) da cui è derivato ciascun campo, per audit e tracciabilità.

## 3. Formato JSON Generico

- **Schema canonico:** Proponiamo un JSON generico come insieme di tutti i campi utili, estendibile ai frontend. Ad esempio: 
  - `id`: Identificatore del personaggio (es. `C_Alyssa`), 
  - `name`, `gender`, `age`, `species`: dati anagrafici (da corrispondenti campi di `characters/`). 
  - `short_description`: brevissima sintesi (`C_<ID>.Summary`), 
  - `full_description`: descrizione completa (`C_<ID>.Full_Bio`), 
  - `personality_traits`: elenco di tratti (`C_<ID>.Personality` + `_Traits`), 
  - `role_play_script`: prompt di ruolo (`C_<ID>.Roleplay_Prompts`), 
  - `relationships`: nodi chiave (genitori, coniuge ecc. da `families/`), 
  - `experiences`: eventi vitals (da `experiences/`). 
- **Mapping e vincoli:** Ogni chiave del JSON deve essere compilata con dati canonici. Ad es., `relationships.parents` mappa a output di `family_engine(query=parents)`, mentre `role_play_script` viene direttamente da `C_<ID>.Dialogue_Examples`. In questo schema generico, `tags` (lista) includerà stringhe di famiglie (es. `"Douglas"`) o qualificatori (es. `"royal"`, `"military"`). Gli URL di immagini (`portrait_url`) dovranno far riferimento a risorse interne già gestite dal database (nessun riferimento esterno non valido).  
- **Conformità R-008:** Il JSON generico è pensato come esito di un generatore automatico: pertanto, **tutti i valori sono tracciabili** alle entità del database. La chiave `provenance` (o metadata simili) dovrebbe includere per ciascun blocco informativo l’origine (file .md/record) e la regola applicata. Ad esempio, `full_description` avrà nota: “TRATTO DA characters/C_<ID>.md (sezione Background)”, `relationships.spouse` avrà provenienza dal record in `families/F_Marriages.md`. Questo assicura che non vi siano informazioni “liberamente inventate” fuori dal canone (no “manual lore injection”) e che ogni campo rispetti i vincoli di layer (p.es. le relazioni riflettono solo dati attuali o storici come da canone).

## 4. Esempio di Mappatura dei Campi

- **Nome Personaggio:** JanitorAI `char_name` / SillyTavern `character_name` / JSON `name` → `C_<ID>.Name`.  
- **Descrizione di Ruolo:** JanitorAI `body` / SillyTavern `character_desc` / JSON `full_description` → concatenazione di `C_<ID>.Background` e `C_<ID>.Personality` (backstory + tratti principali).  
- **Personalità e Patiti:** JanitorAI `personality` / SillyTavern `personality` / JSON `personality_traits` → da `C_<ID>.Traits` (elenco di attributi caratteriali).  
- **Prompt di Scenario:** JanitorAI `first_persona`+`second_persona` / SillyTavern `first_persona`+`scenario` / JSON `role_play_script` → `C_<ID>.Roleplay_Prompts` (istruzioni su personalità e contesto).  
- **Esempi di dialogo:** JanitorAI `example_dialogue` / SillyTavern `example_dialogue` / JSON `dialogue_examples` → `C_<ID>.Dialogue_Examples` (frasi di esempio).  
- **Tag/Famiglie:** JanitorAI e SillyTavern spesso usano liste di tag; JSON `tags` → nomi di famiglie o classi (p.es. `"Douglas"`, `"royal"`) presi da `database/families` o da `C_<ID>.Affiliation`.  
- **Immagini:** Qualsiasi URL (es. `avatar_url` in SillyTavern) deve essere un asset approvato presente in `assets/` o generato da `W_` (es. `W_Style_Guide`). Non sono permessi URL esterni privati (evitare iniezioni manuali di immagini non autorizzate).

## 5. Tracciabilità e Compliance

Per aderire alle **regole R-008_Bot_Rules**, ogni elemento generato è annotato con riferimenti interni: includiamo un campo `provenance` nell’export (es. array di stringhe) dove registrare i file sorgente del canone. Ad esempio, un output JSON può contenere:
```json
"provenance": [
  "database/characters/C_Alyssa.md#line 12-20",
  "database/families/F_Marriages.md#line 5-8",
  "core/ADR-003_Character_Authority.md"
]
```  
Questo garantisce la **trasparenza** e la validazione automatica: ogni porzione di testo può essere riscontrata nel repository. Inoltre, si verifica che nessun campo violi i vincoli di layer di ADR-006 (Canon Layer Architecture); ad es. se il personaggio è marcato “storico” in `C_Alyssa.md`, i suoi dati non compaiono come “attivi” in output live.

## 6. Conclusioni

Lo **schema di esportazione bot** così definito assicura che ogni generazione sia *canon-compliant* e tracciabile. I campi dei JSON di **JanitorAI**, **SillyTavern** e il formato generico sono mappati univocamente alle entità del database, rispettando i livelli di autorità (ADR) e le regole R-008 sul bot. In questo modo i future engine di generazione potranno automatizzare la costruzione di bot e lorebook senza introdurre dati non canonici e mantenendo piena auditabilità delle fonti. 

