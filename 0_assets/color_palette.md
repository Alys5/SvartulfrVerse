# SvartúlfrVerse Template: Color Palettes & Styles

Valori HEX concreti e stili visivi per l'estetica e la formattazione delle bot card del #SvartulfrVerse. Per mantenere coerenza e un'alta leggibilità, la struttura utilizza una base di grigi comune, mentre il colore d'accento, gli sfondi e lo stile delle immagini (CSS) cambiano drasticamente in base al filone narrativo.

## Core Structural Colors (Base Grayscale)

_Questi colori definiscono la gerarchia visiva dei testi e rimangono la base di partenza per ogni template, venendo sostituiti solo quando il filone richiede un'atmosfera molto specifica._

- **Light Silver (`#CCCCCC`):** Utilizzato per i ruoli dei personaggi e il testo secondario, offrendo un contrasto morbido ma leggibile.
- **Medium Gray (`#A0A0A0`):** Utilizzato per i content warnings, i temi, i rating e le didascalie delle immagini.
- **Dark Gray (`#888888`):** Utilizzato per metadati in sordina, come i tag del personaggio e le info sulla fonte/autore nel footer.

---

## Thematic Accents & Styles (I 6 Filoni)

_Il colore d'accento viene utilizzato per: Titoli ad alto impatto, Sottotitoli, Nomi dei personaggi e Intestazioni principali. Lo stile CSS trasforma radicalmente il mood della Bio._

### 1. Modern (Golden Hour / Default)

_Estetica da fotografia analogica, luci calde e tramonti californiani._

- **Primary Accent:** Amber Gold (`#FBBF24`) o Classic Gold (`#D4AF37`).
- **Custom Secondary:** Base Grayscale standard.
- **Image Style (Polaroid):** Cornice bianca spessa, padding inferiore più ampio e leggera ombra esterna scura per simulare una foto stampata. _(CSS: `border: 8px solid white; border-bottom: 24px solid white; box-shadow: 2px 2px 8px rgba(0,0,0,0.5);`)_

### 2. Sci-Fi (Datapad / Imperial Terminal)

_Ispirato a database governativi ologrammati e interfacce di navi spaziali._

- **Primary Accent:** Electric Cyan (`#00FFFF`) o Astral Gold (`#C0A060`).
- **Custom Secondary:** Muted Steel (`#4A5568`) o Terminal Green (`#00FF41`) al posto del _Light Silver_.
- **Background Vibe:** Void Black (`#050505`) o Dark Gunmetal (`#141416`).
- **Image Style (Holo-Screen):** Niente curve dolci. Angoli rigidi e geometrici a 90°. Bordo sottile luminoso con un leggero bagliore esterno. _(CSS: `border: 1px solid var(--accent); box-shadow: 0 0 10px var(--accent-glow); border-radius: 0;`)_
- **Tipografia & Layout:** Usa font monospaziati (es. `Courier New`) per le avvertenze o i tag. Sostituisci i classici divisori `<hr>` con linee solide e spesse, ma più corte, per simulare un caricamento dati.

### 3. Age of Sail / Pirate (Black Sails)

_Estetica cruda, salmastra e realistica. Vele scolorite dal sole, legno di mogano intriso di sale, sangue sulla sabbia e atmosfere politiche cupe e spietate._

- **Primary Accent:** Tarnished Brass (`#B89947`) o Dried Blood (`#8A2522`). Colori che non brillano, ma che sanno di metallo vecchio e violenza realistica.
- **Custom Secondary:** Sun-bleached Canvas (`#D8D0C0`). Al posto del grigio standard, un colore che ricorda le vele di tela consumate o vecchie pergamene sbiadite dal sole dei Caraibi.
- **Background Vibe:** Ship's Hold (`#1A110A`) o Deep Trench Navy (`#0A1128`). Colori di fondo estremamente scuri e opprimenti.
- **Image Style (Gritty Portrait):** Cornici pesanti e scure in legno/metallo, con filtri desaturati o ad alto contrasto. Un'ombra interna profonda per dare la sensazione di guardare attraverso l'oblò di una nave o una mappa usurata. _(CSS: `border: 3px solid #1A110A; border-radius: 2px; box-shadow: inset 0 0 15px rgba(0,0,0,0.8), 3px 3px 6px rgba(0,0,0,0.6);`)_
- **Tipografia & Layout:** Testi densi e allineamenti rigorosi, simulando l'ordine burocratico e navale di Nassau mescolato al caos del mondo pirata.

### 4. High Fantasy (Starlit Dynasty / Regal Tome)

_Ispirato ad antichi tomi, araldica, misticismo e costellazioni._

- **Primary Accent:** Royal Antique Gold (`#C19A5B`) o Starlight Silver (`#E8E9F3`).
- **Custom Secondary:** Twilight Blue (`#1C2541`) o Aged Parchment (`#D4C4A8`).
- **Background Vibe:** Midnight Void (`#0B0C10`) per magie stellari, o Deep Burgundy (`#2D131C`) per casate nobiliari oscure.
- **Image Style (Arch Window / Tarot Card):** Immagini incorniciate come vetrate o carte dei tarocchi. Un doppio bordo dorato che arrotonda pesantemente _solo_ gli angoli superiori. _(CSS: `border: 3px double #C19A5B; border-radius: 50% 50% 0 0;`)_
- **Tipografia & Layout:** Font con le grazie (Serif come `Times New Roman`, `Georgia`). Utilizza simboli testuali eleganti come le stelle (`✦` e `✷`) per separare visivamente i ruoli o i tag.

### 5. Viking / Norse (Dirty Mythic / American Gods)

_Un mix tra cruda brutalità storica (fango, acciaio freddo, pellicce) e un misticismo surreale, allucinogeno e moderno. Dei antichi che sanguinano in un mondo che va a fuoco._

- **Primary Accent:** Sacrificial Red (`#9B111E`) o Ethereal Odin-Blue (`#4D9DE0`). Colori che "spaccano" lo schermo come un neon in un bar malfamato o come sangue fresco sulla neve.
- **Custom Secondary:** Ash & Mud (`#696B70`). Un grigio cenere, sporco, che sostituisce l'eleganza del _Light Silver_.
- **Background Vibe:** Stormy Slate (`#1A1C20`) o uno sfondo quasi nero, freddo e inospitale.
- **Image Style (Dirty Mythic):** Tagli netti, nessuna morbidezza, ma con un tocco sovrannaturale. Bordo in "acciaio" scuro accompagnato da un'ombra solida, netta (drop shadow senza blur), usando il colore d'accento per creare un effetto "aura mistica/neon" attorno a un'immagine altrimenti cruda. _(CSS: `border: 2px solid #5A5E63; border-radius: 0px; box-shadow: -5px 5px 0px rgba(155, 17, 30, 0.9);` -- cambia l'RGBA nell'azzurro se preferisci la vibe da tempesta)._
- **Tipografia & Layout:** Blocchi di testo visivamente "pesanti". Usa le barre verticali spesse o simboli runici (se supportati) per separare i tag.

### 6. Urban Fantasy (Modern Fantasy / Minimal Dark)

_Layout minimalista, oscuro, simile a un database classificato o a una galleria fotografica moderna e pulita._

- **Primary Accent:** Desaturated Bone/Ivory (`#E2DED0`) o un Grigio Argento chiarissimo (`#E0E0E0`). L'accento qui non "grida", ma spicca con eleganza fredda dal buio.
- **Custom Secondary:** Muted Slate (`#757575`) o Charcoal (`#424242`). I ruoli e i metadati si fondono quasi con lo sfondo scuro (effetto dossier classificato).
- **Background Vibe:** Nero assoluto (`#000000`) o Asfalto Profondo (`#121212`).
- **Image Style (Modern Database):** Immagini pulitissime. Bordo neutro quasi invisibile e angoli dolcemente smussati. Ombra impercettibile o del tutto assente. Ottimo anche per immagini PNG senza sfondo (ritagliate). _(CSS: `border: 1px solid #333333; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.8);`)_
- **Tipografia & Layout:** Spaziature ariose, testo giustificato. Separatori minimi, come una linea solida grigio scuro molto sottile _(CSS: `<hr style="border-top: 1px solid #333333;" />`)_ invece del classico doppio divisore.
