# Piano — Template Bio specializzati SvartulfrVerse

## Summary

Creare tre template HTML Bio separati per mantenere pulita la struttura della bot card e ridurre il rischio di errori di formattazione durante la compilazione dei bot:

- `d:\SvartulfrVerse\1_template\Single-character bot\Single_Bio_Template.html`
- `d:\SvartulfrVerse\1_template\Multi-character bot\Multi_Bio_Template.html`
- `d:\SvartulfrVerse\1_template\Scenario bot\Scenario_Bio_Template.html`

I template useranno come base strutturale `d:\SvartulfrVerse\1_template\Sys_Bio_Template.html`, ma saranno specializzati per Single-character, Multi-character e Scenario bot. Tutti i colori e gli stili visivi saranno parametrizzati tramite placeholder coerenti con `d:\SvartulfrVerse\0_assets\color_palette.md`.

Vincolo sanitario JanitorAI: i Bio non useranno `<div>`, griglie CSS, flexbox, `<style>` interni o markup complesso. Il layout dovrà restare compilabile con elementi semplici e sanificabili: `p`, `img`, `br`, `hr`, `blockquote`, `ul`, `li`, `span`, `strong`, `em`, `code`, e opzionalmente `a` solo se serve un wrapper compatibile con classi Janitor. Gli stili saranno inline tramite placeholder, con placeholder separati per colore, immagine e divisori.

## Current State Analysis

- Il template Bio generale attuale è `d:\SvartulfrVerse\1_template\Sys_Bio_Template.html`.
- `Sys_Bio_Template.html` è una storefront pubblica e non deve includere flag runtime, stato nascosto o gate scenario-only.
- Le cartelle di destinazione esistono già:
  - `d:\SvartulfrVerse\1_template\Single-character bot`
  - `d:\SvartulfrVerse\1_template\Multi-character bot`
  - `d:\SvartulfrVerse\1_template\Scenario bot`
- I template Personality esistenti definiscono il focus corretto:
  - Single-character: identità, background, relazione con `{{user}}`.
  - Multi-character: cast, separazione voci, Trigger Matrix.
  - Scenario bot: controller voice, referee principles, ciclo e conseguenze.
- `d:\SvartulfrVerse\0_assets\color_palette.md` definisce i filoni visivi e gli stili immagine da iniettare tramite placeholder.
- `d:\SvartulfrVerse\0_assets\ASSET_REGISTRY.json` resta la fonte approvata per URL, alt text, descrizioni, dimensioni e chiavi immagine.
- La guida JanitorAI, Chapter 8 “Bot Cards & Presentation”, impone una bot card come storefront: Impact Title, Subtitle, Main Image, Supporting Images, Blurb, Impact Line e una sola opzionale LLM Advice.
- La stessa guida tratta la card come “cover, not manual”: evitare lore dump e strutture troppo manualistiche.
- Il sanitizer JanitorAI è aggressivo: evitare `<div>`, CSS grid/flexbox e `<style>` interni; usare solo markup lineare e sanificabile.
- Gli esempi forniti dall’utente mostrano pattern compatibili con `<p style="text-align: center;">`, `<a target="_blank" rel="noopener noreferrer" class="...">`, `<span style="color: ...;">`, `<br>` e `<hr>`. I template Bio useranno questa logica solo dove serve, senza introdurre bottoni non richiesti.

## Proposed Changes

### 1. Creare `Single_Bio_Template.html`

Percorso:

- `d:\SvartulfrVerse\1_template\Single-character bot\Single_Bio_Template.html`

Scopo:

- Bot card focalizzata sull’intimità e sull’approfondimento di un singolo personaggio.

Struttura prevista:

1. Header pubblico del template:
   - `<!-- SVARTULFRVERSE SINGLE CHARACTER BIO / BOT CARD TEMPLATE -->`
   - `<!-- Public storefront copy. Do not paste private runtime flags, hidden state, or scenario-only gates here. -->`
2. Ruolo/fazione con placeholder colore:
   - `{{ROLE_OR_FACTION}}`
3. Immagine/ritratto singolo:
   - `{{PORTRAIT_IMAGE_URL}}`
   - `{{PORTRAIT_IMAGE_ALT}}`
   - stile immagine tramite `{{CSS_IMAGE_STYLE}} max-width: 100%;`
4. Nome personaggio:
   - `{{CHARACTER_NAME}}`
5. Citazione iconica:
   - `{{MAIN_HOOK_QUOTE}}`
6. Dati dossier:
   - `{{AGE}}`
   - `{{OCCUPATION}}`
   - `{{ALIGNMENT}}`
   - eventuale `{{FACTION}}` se serve nel dossier
7. Background breve:
   - `{{SHORT_BLURB}}`
8. Dinamica relazionale con `{{user}}`:
   - `{{DYNAMIC_WITH_USER_TITLE}}`
   - `{{DYNAMIC_WITH_USER_DESC}}`
9. Avvertenze contenuti:
   - `{{CONTENT_RATING}}`
   - `{{CONTENT_THEMES}}`
   - `{{CONTENT_WARNINGS}}`
10. Footer source/canon/autore:
   - `{{AUTHOR_HANDLE}}`

Placeholder di stile minimi:

- Colori: `{{HEX_ACCENT}}`, `{{HEX_SECONDARY}}`, `{{HEX_MUTED}}`, `{{HEX_DARK}}`.
- Stili inline: `{{CSS_CENTER_TEXT_STYLE}}`, `{{CSS_ACCENT_TITLE_STYLE}}`, `{{CSS_ACCENT_SECTION_STYLE}}`, `{{CSS_ACCENT_TEXT_STYLE}}`, `{{CSS_SECONDARY_TEXT_STYLE}}`, `{{CSS_MUTED_TEXT_STYLE}}`, `{{CSS_DARK_TEXT_STYLE}}`, `{{CSS_JUSTIFIED_TEXT_STYLE}}`, `{{CSS_IMAGE_STYLE}}`, `{{CSS_SMALL_IMAGE_STYLE}}`, `{{CSS_DIVIDER_STYLE}}`, `{{CSS_BLOCKQUOTE_STYLE}}`, `{{CSS_LIST_STYLE}}`, `{{CSS_LIST_ITEM_STYLE}}`.
- Nessun colore hardcodato e nessun blocco `<style>`.

Decisione:

- Non includere runtime flags, hidden state o gate scenario-only nel Bio.
- Usare `{{MAIN_HOOK_QUOTE}}` per la citazione iconica, invece di hardcodare il colore oro.

### 2. Creare `Multi_Bio_Template.html`

Percorso:

- `d:\SvartulfrVerse\1_template\Multi-character bot\Multi_Bio_Template.html`

Scopo:

- Bot card focalizzata sull’ensemble, sul cast e sulle dinamiche di gruppo.

Struttura prevista:

1. Header pubblico del template.
2. Titolo ensemble:
   - `{{ENSEMBLE_NAME_OR_TITLE}}`
3. Immagine ensemble:
   - `{{ENSEMBLE_IMAGE_URL}}`
   - `{{ENSEMBLE_IMAGE_ALT}}`
   - `{{ENSEMBLE_IMAGE_CAPTION}}`
   - stile immagine tramite `{{CSS_IMAGE_STYLE}} max-width: 100%;`
4. Hook gruppo:
   - `{{GROUP_HOOK_LINE}}`
5. Premessa gruppo:
   - `{{GROUP_PREMISE_BLURB}}`
6. Sezione cast:
   - titolo sezione `{{CAST_SECTION_TITLE}}`
   - card compatte per i membri del gruppo.
7. Per ogni personaggio del cast:
   - `{{CHAR_1_NAME}}`, `{{CHAR_1_IMAGE_URL}}`, `{{CHAR_1_IMAGE_ALT}}`, `{{CHAR_1_ROLE_LINE}}`, `{{CHAR_1_TAGS}}`
   - `{{CHAR_2_NAME}}`, `{{CHAR_2_IMAGE_URL}}`, `{{CHAR_2_IMAGE_ALT}}`, `{{CHAR_2_ROLE_LINE}}`, `{{CHAR_2_TAGS}}`
   - `{{CHAR_3_NAME}}`, `{{CHAR_3_IMAGE_URL}}`, `{{CHAR_3_IMAGE_ALT}}`, `{{CHAR_3_ROLE_LINE}}`, `{{CHAR_3_TAGS}}`
8. Regole d’ingaggio per `{{user}}`:
   - `{{ENGAGEMENT_RULES_LLM_ADVICE}}`
9. Dinamica gruppo:
   - `{{GROUP_DYNAMIC_BLURB}}`
10. Avvertenze contenuti e footer.

Nota sul layout sanitario:

- Non usare `<div>`, `display: grid`, `display: flex` o `<style>` interno.
- Presentare il cast con blocchi sequenziali compatti basati su `p`, `br`, `img`, `span`, `strong`, `em`.
- Le miniature dei personaggi saranno immagini inline semplici, senza card/grid CSS.
- Usare `<br>` per spaziatura verticale tra blocchi, come negli esempi Janitor compatibili.
- Non introdurre bottoni o link non richiesti; se serve un wrapper compatibile, usare solo `<a target="_blank" rel="noopener noreferrer" class="{{JANITOR_LINK_CLASS}}">` con placeholder di classe e link.
- Non hardcodare colori o stili immagine nel template.

Decisione:

- Il Bio multi-character deve spiegare come rivolgersi ai personaggi multipli, ad esempio usando il nome del personaggio per guidare l’attenzione dell’IA.
- Non deve diventare un secondo Personality: resta una storefront pubblica.

### 3. Creare `Scenario_Bio_Template.html`

Percorso:

- `d:\SvartulfrVerse\1_template\Scenario bot\Scenario_Bio_Template.html`

Scopo:

- Bot card focalizzata su worldbuilding, atmosfera e meccaniche di gioco.

Struttura prevista:

1. Header pubblico del template.
2. Era/impostazione:
   - `{{ERA_OR_SETTING}}`
3. Titolo scenario:
   - `{{SCENARIO_TITLE}}`
4. Immagine ambientazione:
   - `{{SCENARIO_IMAGE_URL}}`
   - `{{SCENARIO_IMAGE_ALT}}`
   - stile immagine tramite `{{CSS_IMAGE_STYLE}} max-width: 100%;`
5. Starting hook:
   - `{{STARTING_HOOK_QUOTE}}`
6. Premessa / Lore Base:
   - `{{LORE_BASE_BLURB}}`
7. Fazioni e luoghi:
   - `{{FACTIONS_BLURB}}`
8. Meccaniche:
   - `{{PLAY_STYLE_SECTION_TITLE}}`
   - `{{MECHANIC_1_TITLE}}`, `{{MECHANIC_1_BODY}}`
   - `{{MECHANIC_2_TITLE}}`, `{{MECHANIC_2_BODY}}`
   - `{{MECHANIC_3_TITLE}}`, `{{MECHANIC_3_BODY}}`
9. Obiettivo principale di `{{user}}`:
   - `{{USER_STARTING_OBJECTIVE}}`
10. Chiusura invito/minaccia:
   - `{{CLOSING_INVITATION_OR_THREAT}}`
11. Avvertenze contenuti e footer.

Decisione:

- Il Bio scenario bot non deve esporre hidden mechanics, stato nascosto o dettagli runtime.
- Le meccaniche devono essere presentate come esperienza leggibile per l’utente, non come istruzioni tecniche.

## Assumptions & Decisions

- Nome file da usare: i tre file richiesti saranno creati come `Single_Bio_Template.html`, `Multi_Bio_Template.html`, `Scenario_Bio_Template.html`, nelle rispettive cartelle già presenti.
- Il template generale `Sys_Bio_Template.html` non verrà sostituito né reso modulare.
- Nessun colore hardcodato verrà inserito nei nuovi template Bio.
- Nessuno dei nuovi template userà `<div>`, CSS grid/flexbox o `<style>` interni.
- Gli stili saranno inline e compatibili con gli esempi Janitor: `<p style="...">`, `<span style="...">`, `<br>`, `<hr>` e, solo se necessario, `<a target="_blank" rel="noopener noreferrer" class="...">`.
- I valori di stile saranno placeholder, non colori o regole CSS hardcodate.
- Gli stili hardcodati saranno sostituiti da placeholder:
  - colori: `{{HEX_ACCENT}}`, `{{HEX_SECONDARY}}`, `{{HEX_MUTED}}`, `{{HEX_DARK}}`
  - immagine: `{{CSS_IMAGE_STYLE}}`
  - divisori: `{{CSS_DIVIDER_STYLE}}`
  - blockquote: `{{CSS_BLOCKQUOTE_STYLE}}`
- I placeholder immagine dovranno essere compilati usando `d:\SvartulfrVerse\0_assets\ASSET_REGISTRY.json`.
- I placeholder colore/stile dovranno essere compilati usando `d:\SvartulfrVerse\0_assets\color_palette.md`.
- Il prompt di creazione bot non verrà modificato in questa esecuzione. Se richiesto, potrà essere aggiornato in un secondo intervento con la nuova mappatura placeholder.

## Verification Steps

Dopo la creazione dei file, verificare:

1. I tre file esistono nei percorsi richiesti.
2. Ogni file inizia con un commento pubblico e non include flag runtime o stato nascosto.
3. Nessun colore HEX è hardcodato nei nuovi template Bio.
4. Ogni immagine usa URL, alt e stile tramite placeholder.
5. I placeholder principali sono coerenti con gli esempi forniti dall’utente.
6. La struttura HTML resta semplice, lineare e compilabile senza commenti modulari complessi.
7. Nessun template contiene `<div>`, `display: grid`, `display: flex` o `<style>` interni.
8. Gli stili inline rispecchiano i pattern Janitor compatibili forniti dall’utente: `p`, `span`, `br`, `hr` e, solo se necessario, `a`; i valori CSS restano placeholder.
9. Se disponibile un comando di validazione HTML o uno script di controllo, eseguirlo; altrimenti eseguire almeno una verifica testuale con `git diff --check` per whitespace e formatting.
