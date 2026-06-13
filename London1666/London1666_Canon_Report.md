# London1666 Canon Report

**Workspace path:** `d:\SvartulfrVerse\London1666`  
**Generated from source inventory:** `legacy\Visual_DNA.md`, `legacy\W_Regency.md`, `legacy\W_Regency.js`  
**Report status:** Source information extracted and canonicalized; legacy source files have been deleted after this report was written.

---

## 1. Source Inventory

### 1.1 `legacy\Visual_DNA.md`

**Purpose:** Regency visual and environmental reference.  
**Source:** [`legacy\Visual_DNA.md`](file:///d:/SvartulfrVerse/London1666/legacy/Visual_DNA.md)

**Extracted information:**

- **Architecture:** Georgian townhouses, grand estates, drawing rooms with high ceilings, elegant ballrooms, cobblestone streets.
- **Atmosphere:** Rigid social propriety, gas lamp lighting, horse-drawn carriages, constant presence of servants and footmen.
- **Drawing Rooms:** Opulent spaces for social calls, silk wallpaper, crystal chandeliers, carefully orchestrated conversations.
- **Carriages:** Elegant transportation, footmen in livery, clatter of hooves on cobblestones.
- **Estates:** Vast country properties, manicured gardens, contrast between upstairs luxury and downstairs service.

---

### 1.2 `legacy\W_Regency.md`

**Purpose:** Public metadata for a Regency world partition.  
**Source:** [`legacy\W_Regency.md`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.md)

**Extracted information:**

- **Title:** World | Regency
- **Theme:** Aristocratic Elegance, Drawing Rooms, Social Hierarchy, Period Drama
- **Description:** Early-19th-century aristocratic world built around elegance, rigid social hierarchies, propriety, reputation, drawing room politics, carriage travel, footmen service, and complex social rules.
- **Message Depth:** Ambient social tension; propriety feels paramount; social standing dictates every interaction; reputation is fragile; polite society rules function as both weapon and shield.
- **Image generation constraints:** Warm cinematic lighting, Rembrandt lighting, deep shadows, amber and obsidian palette, painterly realism, luxury visual storytelling.
- **Visual identity summary:** Opulent Regency drawing room, crystal chandeliers, silk wallpaper, mahogany furniture, gas lamps, footmen in livery, carriage visible through tall windows, cinematic lighting, amber and mahogany tones, rich fabric textures.

---

### 1.3 `legacy\W_Regency.js`

**Purpose:** Legacy L2 scenario lorebook runtime script for JanitorAI.  
**Source:** [`legacy\W_Regency.js`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.js)

**Extracted runtime configuration:**

- **Engine:** Mode A - Advanced Engine
- **Syntax constraint:** Strict ES5 required.
- **Global knobs:** `DEBUG = 0`, `APPLY_LIMIT = 8`, `WINDOW_DEPTH = 5`
- **Runtime context guards:** `context.character`, `context.character.personality`, `context.character.scenario`
- **Writable surfaces:** `context.character.personality` and `context.character.scenario`
- **Lore entries present:**
  - `WRG_001` — NPC Marcus
  - `WRG_002` — NPC Visconte Angelo Moreno

**Runtime lore entries:**

- **Marcus:** Human PMC operative, Vanguard Lieutenant, primary bodyguard. Hyper-vigilant, disciplined, absolutely loyal, tactically brief in speech, emotionally suppressed, over-identified with duty. Appears 190 cm, military build, stoic, scarred knuckles. Stands with back to wall and counts exits. Uses a physical barrier method and may override heirs' wishes for safety.
- **Visconte Angelo Moreno:** 40-year-old human reclusive billionaire, mentor to Alyssa, high-end fashion patron connected to Angel&Co. Sophisticated, dangerous, aesthetically obsessed with fragility. Speaks with formal elegance and indirect propositions. Possessive aesthetics, avoids Erik's wrath. Funds Alyssa's secret portfolio and offers a seductive lure of freedom. Appearance: striking beauty, silver-white hair, bespoke suits.

**Note:** The JavaScript engine pipeline itself is not canonical lore. Only the embedded lore-bearing entries were extracted into this report.

---

## 2. Canonical Assessment

The current folder contains **legacy Regency material**, not a developed London1666 historical scenario. The usable canon consists of:

1. Regency visual DNA and social atmosphere.
2. Aristocratic drawing-room politics.
3. Carriage, estate, servant, and footmen social markers.
4. Two legacy NPC/runtime entries that are stylistically inconsistent with the new historical Douglas scenario.
5. User-provided historical canon for the Douglas commercial lineage, Cornelius, DCC, and Seven Hills, which should be imported or formalized separately.

---

## 3. Canonized Lorebook Entries from Existing Folder

---
**Prefix & Name:** WRD: Regency World Order  
**Canon Layer:** [ACTIVE]  
**Priority:** 10  
**Suggested Keywords:** Regency, early 19th century, aristocracy, period drama, social order  
**Optimized Lore Text:** The Regency world is an aristocratic early-19th-century setting where social rank, reputation, and propriety govern daily life. Fortune favors the well-born, and polite society operates as a visible battlefield of manners, status, and restraint. Source: [`legacy\W_Regency.md`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.md).  
**Motivation:** Core world premise and dominant interactable social logic, so it needs high-priority active context.

---
**Prefix & Name:** WRD: Social Propriety as Law  
**Canon Layer:** [ACTIVE]  
**Priority:** 11  
**Suggested Keywords:** propriety, etiquette, manners, social rules, polite society, reputation  
**Optimized Lore Text:** Propriety is treated as the sharpest social law: every gesture, phrase, invitation, and silence can protect or ruin reputation. Characters should behave as if reputation is fragile, public, and weaponized. Source: [`legacy\W_Regency.md`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.md).  
**Motivation:** This is the central behavioral rule of the setting and should strongly shape roleplay.

---
**Prefix & Name:** WRD: Aristocratic Elegance  
**Canon Layer:** [ACTIVE]  
**Priority:** 9  
**Suggested Keywords:** aristocratic elegance, nobility, refinement, luxury, upper class, high society  
**Optimized Lore Text:** Aristocratic elegance defines the dominant public aesthetic: refined speech, controlled emotion, luxury interiors, formal dress, and status-conscious presentation. Maintain a tone of polished surface tension rather than casual modern informality. Source: [`legacy\W_Regency.md`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.md).  
**Motivation:** Major tone-setting world rule for scenes involving upper-class society.

---
**Prefix & Name:** WRD: Regency Visual DNA  
**Canon Layer:** [CANDIDATE]  
**Priority:** 6  
**Suggested Keywords:** visual dna, rembrandt lighting, amber, obsidian, painterly realism, cinematic lighting, luxury visual storytelling  
**Optimized Lore Text:** The visual identity favors warm cinematic lighting, Rembrandt-style shadows, amber and obsidian palettes, painterly realism, and luxury visual storytelling. Avoid generic anime, pastel palettes, flat photorealism, and low-quality image traits. Source: [`legacy\Visual_DNA.md`](file:///d:/SvartulfrVerse/London1666/legacy/Visual_DNA.md).  
**Motivation:** This is a visual-generation rule rather than a narrative fact, so it is lower-priority candidate material.

---
**Prefix & Name:** LOC: Drawing Rooms  
**Canon Layer:** [ACTIVE]  
**Priority:** 9  
**Suggested Keywords:** drawing room, drawing rooms, social calls, salon, reception room, chandelier  
**Optimized Lore Text:** Drawing rooms are opulent social arenas with high ceilings, silk wallpaper, crystal chandeliers, mahogany furniture, and carefully orchestrated conversation. Use them for social calls, gossip, courtship, negotiation, and reputation management. Source: [`legacy\Visual_DNA.md`](file:///d:/SvartulfrVerse/London1666/legacy/Visual_DNA.md), [`legacy\W_Regency.md`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.md).  
**Motivation:** Key interaction location and central stage for Regency social politics.

---
**Prefix & Name:** LOC: Ballrooms  
**Canon Layer:** [ACTIVE]  
**Priority:** 8  
**Suggested Keywords:** ballroom, ballrooms, dance, formal dance, gala, assembly room  
**Optimized Lore Text:** Ballrooms are elegant public performance spaces where dance, music, visibility, and social judgment converge. Treat them as high-risk reputation arenas where appearance and partner choice carry social meaning. Source: [`legacy\Visual_DNA.md`](file:///d:/SvartulfrVerse/London1666/legacy/Visual_DNA.md).  
**Motivation:** Important period-drama location, though less directly detailed than drawing rooms.

---
**Prefix & Name:** LOC: Georgian Townhouses  
**Canon Layer:** [ACTIVE]  
**Priority:** 7  
**Suggested Keywords:** georgian townhouse, townhouse, townhouses, urban mansion, fashionable residence  
**Optimized Lore Text:** Georgian townhouses define the fashionable urban residential architecture: symmetrical façades, refined interiors, and status-signaling domestic spaces. Use them for private family scenes, social calls, and controlled domestic politics. Source: [`legacy\Visual_DNA.md`](file:///d:/SvartulfrVerse/London1666/legacy/Visual_DNA.md).  
**Motivation:** Distinct architectural location type supporting the Regency setting.

---
**Prefix & Name:** LOC: Country Estates  
**Canon Layer:** [ACTIVE]  
**Priority:** 8  
**Suggested Keywords:** country estate, estate, estates, manor, country house, manor house, garden  
**Optimized Lore Text:** Country estates are vast aristocratic properties with manicured gardens, formal grounds, and a visible divide between upstairs luxury and downstairs service. Use them for inheritance, family pressure, seasonal retreats, and class contrast. Source: [`legacy\Visual_DNA.md`](file:///d:/SvartulfrVerse/London1666/legacy/Visual_DNA.md).  
**Motivation:** Major location type for aristocratic family and class dynamics.

---
**Prefix & Name:** LOC: Carriages and Cobblestone Streets  
**Canon Layer:** [ACTIVE]  
**Priority:** 7  
**Suggested Keywords:** carriage, carriages, horse-drawn carriage, cobblestones, cobblestone streets, travel  
**Optimized Lore Text:** Carriage travel is elegant and status-marked, with footmen in livery and the clatter of hooves on cobblestone streets. Use carriages for arrivals, departures, private conversations, social display, and controlled public visibility. Source: [`legacy\Visual_DNA.md`](file:///d:/SvartulfrVerse/London1666/legacy/Visual_DNA.md), [`legacy\W_Regency.md`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.md).  
**Motivation:** Distinct transport/location system that affects movement, status, and scene pacing.

---
**Prefix & Name:** WRD: Gas Lamp Atmosphere  
**Canon Layer:** [ACTIVE]  
**Priority:** 6  
**Suggested Keywords:** gas lamp, gaslight, lamplight, amber light, evening streets, candlelight  
**Optimized Lore Text:** Gas lamp lighting creates warm golden pools of visibility, deep shadow, and intimate social atmosphere. Maintain a mood of elegance, secrecy, and controlled exposure in evening scenes. Source: [`legacy\Visual_DNA.md`](file:///d:/SvartulfrVerse/London1666/legacy/Visual_DNA.md).  
**Motivation:** Atmospheric world modifier, useful but less central than social hierarchy.

---
**Prefix & Name:** ORG: Servants and Footmen  
**Canon Layer:** [ACTIVE]  
**Priority:** 7  
**Suggested Keywords:** servants, footmen, footman, livery, domestic service, household staff  
**Optimized Lore Text:** Servants and footmen are a constant presence in elite spaces, standing at attention, opening doors, attending carriages, and reinforcing class boundaries. Treat them as visible markers of wealth and social order, not as modern background extras. Source: [`legacy\Visual_DNA.md`](file:///d:/SvartulfrVerse/London1666/legacy/Visual_DNA.md).  
**Motivation:** Social institution implied throughout the setting and important for class dynamics.

---
**Prefix & Name:** LOR: Drawing Room Politics  
**Canon Layer:** [ACTIVE]  
**Priority:** 10  
**Suggested Keywords:** drawing room politics, social calls, gossip, reputation, courtship, invitation, scandal  
**Optimized Lore Text:** Drawing room politics governs elite interaction through invitations, seating, introductions, gossip, courtship signals, and public approval. Characters should understand conversation as strategy: charm, silence, and implication can advance or destroy status. Source: [`legacy\W_Regency.md`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.md).  
**Motivation:** Core social mechanism and highly interactable lore.

---
**Prefix & Name:** LOR: Reputation Economy  
**Canon Layer:** [ACTIVE]  
**Priority:** 10  
**Suggested Keywords:** reputation, scandal, social ruin, good name, family name, propriety  
**Optimized Lore Text:** Reputation functions like currency: it can be spent, defended, stolen, or ruined. Maintain the assumption that social standing dictates access, trust, marriage prospects, and public safety. Source: [`legacy\W_Regency.md`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.md).  
**Motivation:** Essential consequence system for the setting.

---
**Prefix & Name:** ORG: High Society  
**Canon Layer:** [ACTIVE]  
**Priority:** 9  
**Suggested Keywords:** high society, society, elite, aristocrats, fashionable society, ton  
**Optimized Lore Text:** High society is the visible power structure of the Regency world: families, hosts, patrons, heirs, and eligible guests circulate through invitations, salons, balls, and public appearances. Treat exclusion as a serious social punishment. Source: [`legacy\W_Regency.md`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.md).  
**Motivation:** Broad faction/social class governing access and status.

---
**Prefix & Name:** NPC: Marcus  
**Canon Layer:** [CANDIDATE]  
**Priority:** 6  
**Suggested Keywords:** Marcus, bodyguard, Vanguard lieutenant, PMC operative, lieutenant, protection  
**Optimized Lore Text:** Marcus is a human PMC operative serving as a Vanguard Lieutenant and primary bodyguard. He is hyper-vigilant, disciplined, silently loyal, emotionally suppressed, 190 cm tall, military-built, stoic, scarred across the knuckles, and tends to stand with his back to a wall while counting exits. He protects by becoming a physical barrier and may override heirs' wishes when he judges safety is at risk. Source: [`legacy\W_Regency.js`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.js).  
**Motivation:** Candidate NPC because he appears only in legacy runtime data and conflicts stylistically with the Regency material.

---
**Prefix & Name:** ORG: Vanguard  
**Canon Layer:** [CANDIDATE]  
**Priority:** 5  
**Suggested Keywords:** Vanguard, PMC, private military, security firm, operatives  
**Optimized Lore Text:** Vanguard is implied to be a private military or security organization employing operatives such as Marcus as lieutenants and bodyguards. Its structure, politics, and relationship to aristocratic society remain undefined. Source: [`legacy\W_Regency.js`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.js).  
**Motivation:** Organization is only indirectly defined through Marcus's role, so it remains low-priority candidate lore.

---
**Prefix & Name:** NPC: Visconte Angelo Moreno  
**Canon Layer:** [CANDIDATE]  
**Priority:** 7  
**Suggested Keywords:** Visconte Angelo Moreno, Angelo Moreno, Angel Moreno, Angel, billionaire, patron, Angel&Co  
**Optimized Lore Text:** Visconte Angelo "Angel" Moreno is a 40-year-old human reclusive billionaire, mentor to Alyssa, and high-end fashion patron connected to Angel&Co. He combines impeccable sophistication with dangerous restraint, speaks with formal elegance and indirect propositions, and is aesthetically obsessed with fragility. He funds Alyssa's secret portfolio, offers a seductive lure of freedom, avoids Erik's wrath, and presents as strikingly beautiful with silver-white hair and bespoke suits. Source: [`legacy\W_Regency.js`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.js).  
**Motivation:** Strong NPC profile, but marked candidate because the source is legacy runtime data and several related entities are unresolved.

---
**Prefix & Name:** ORG: Angel&Co  
**Canon Layer:** [CANDIDATE]  
**Priority:** 5  
**Suggested Keywords:** Angel&Co, Angel and Co, fashion patron, high-end fashion, luxury fashion house  
**Optimized Lore Text:** Angel&Co is implied to be a high-end fashion or patronage entity associated with Visconte Angelo Moreno. Its business model, public reputation, staff, and narrative function are not yet defined. Source: [`legacy\W_Regency.js`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.js).  
**Motivation:** Distinct organization reference, but under-specified and tied to candidate NPC lore.

---
**Prefix & Name:** NPC: Alyssa  
**Canon Layer:** [CANDIDATE]  
**Priority:** 4  
**Suggested Keywords:** Alyssa, secret portfolio, mentor, Angel Moreno  
**Optimized Lore Text:** Alyssa is referenced as someone mentored by Visconte Angelo Moreno and supported through a secret portfolio funded by him. Her identity, role, family, and current situation are not defined in the available notes. Source: [`legacy\W_Regency.js`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.js).  
**Motivation:** Candidate only because the source mentions her but does not provide enough identity data for a full NPC entry.

---
**Prefix & Name:** NPC: Erik  
**Canon Layer:** [CANDIDATE]  
**Priority:** 3  
**Suggested Keywords:** Erik, Erik's wrath, wrath, threat  
**Optimized Lore Text:** Erik is referenced only as someone whose wrath Angelo Moreno avoids. No identity, faction, relationship, or motive is provided. Source: [`legacy\W_Regency.js`](file:///d:/SvartulfrVerse/London1666/legacy/W_Regency.js).  
**Motivation:** Mentioned entity, but too under-specified for high-priority canonization.

---

## 4. Historical Scenario Seed: Douglas / DCC / Cornelius

**Status:** Proposed next import direction, based on user instruction rather than current folder sources.  
**Target use:** Transform this folder from misplaced Regency legacy into a historical scenario about the founding of the Douglas commercial line, the DCC, and Lord Cornelius Vance Douglas.

---
**Prefix & Name:** LOR: Douglas Commercial Lineage  
**Canon Layer:** [HISTORICAL]  
**Priority:** 9  
**Suggested Keywords:** Douglas commercial lineage, merchant house, Lord Cornelius, 1666, colonial trading, Douglas history  
**Optimized Lore Text:** Merchant House Douglas was founded in England in 1666 by Lord Cornelius Vance Douglas. It later expanded into the Douglas Colonial Trading Company in the 1700s and anchored the Douglas California presence through a tradition of colonial trade, governance, and inherited commercial authority. Magnus Douglas belongs to a sci-fi timeline only and is not the founder of the original enterprise. Source: user-provided historical canon.  
**Motivation:** Core historical spine for the new Douglas scenario.

---
**Prefix & Name:** NPC: Lord Cornelius Vance Douglas  
**Canon Layer:** [HISTORICAL]  
**Priority:** 10  
**Suggested Keywords:** Lord Cornelius Vance Douglas, Cornelius Douglas, Cornelius, founder, colonial governor, merchant lord  
**Optimized Lore Text:** Lord Cornelius Vance Douglas is the historical founder of Merchant House Douglas in 1666. Treat him as a colonial governor, merchant lord, and fleet-backed power broker whose public fortune comes from trade, charters, warehouses, and imperial contracts, while rumors suggest privateering, piracy, or opportunistic maritime seizure contributed to his wealth. Source: user-provided historical canon.  
**Motivation:** Central character and anchor of the requested historical scenario.

---
**Prefix & Name:** ORG: Merchant House Douglas  
**Canon Layer:** [HISTORICAL]  
**Priority:** 9  
**Suggested Keywords:** Merchant House Douglas, Douglas merchant house, merchant house, trade house, Douglas family trade  
**Optimized Lore Text:** Merchant House Douglas is the respectable public face of the Douglas commercial lineage: a merchant house founded in England in 1666 by Lord Cornelius Vance Douglas. It coordinates credit, cargo, contracts, political favors, and colonial logistics while maintaining a mask of aristocratic legality. Source: user-provided historical canon.  
**Motivation:** Foundational organization behind the later DCC.

---
**Prefix & Name:** ORG: Douglas Colonial Trading Company  
**Canon Layer:** [HISTORICAL]  
**Priority:** 9  
**Suggested Keywords:** Douglas Colonial Trading Company, DCC, colonial trading company, Douglas trade company, colonial commerce  
**Optimized Lore Text:** The Douglas Colonial Trading Company is the 1700s expansion of Merchant House Douglas into a colonial trading and governance machine. It operates through ports, warehouses, fleets, contracts, local officials, and armed security, blending commerce with political influence. Source: user-provided historical canon.  
**Motivation:** Main institutional evolution of the Douglas commercial line.

---
**Prefix & Name:** WRD: Colonial Trade and Governance Tradition  
**Canon Layer:** [HISTORICAL]  
**Priority:** 8  
**Suggested Keywords:** colonial trade, governance tradition, trade governance, imperial contracts, ports, customs, colonial administration  
**Optimized Lore Text:** The Douglas line builds power by fusing trade, governance, and logistics. Treat Douglas authority as a system of contracts, charters, customs access, warehouse control, and political favors rather than simple retail commerce. Source: user-provided historical canon.  
**Motivation:** Defines how the DCC functions as both business and power structure.

---
**Prefix & Name:** WRD: Piracy Shadow  
**Canon Layer:** [HISTORICAL]  
**Priority:** 8  
**Suggested Keywords:** piracy shadow, Cornelius piracy, privateering, letters of marque, piracy, privateers, maritime seizure  
**Optimized Lore Text:** Part of Cornelius's fortune may derive from piracy, privateering, or opportunistic maritime seizure disguised as legitimate trade. Maintain this as historical rumor with material consequences: hidden ledgers, seized cargo, compromised officials, and enemies at sea. Source: user-provided historical canon.  
**Motivation:** Adds the requested pirate edge while keeping the scenario grounded in historical ambiguity.

---
**Prefix & Name:** WRD: 1666 Pirate-Mercantile Atmosphere  
**Canon Layer:** [ACTIVE]  
**Priority:** 8  
**Suggested Keywords:** 1666, pirate mercantile, port, fleet, merchant fleet, corsair, privateer, colonial sea routes  
**Optimized Lore Text:** The 1666 atmosphere should feel pirate-mercantile: governors, charters, letters of marque, privateers, merchant fleets, dark-wood cabins, sealed documents, port politics, contraband, and sea danger. Keep the setting historical rather than fantasy. Source: user-provided historical direction.  
**Motivation:** Sets the scene tone for the new historical scenario.

---
**Prefix & Name:** LOR: Fortune of Cornelius  
**Canon Layer:** [HISTORICAL]  
**Priority:** 8  
**Suggested Keywords:** fortune of Cornelius, Cornelius wealth, Douglas wealth, trade fortune, pirate fortune, hidden ledgers  
**Optimized Lore Text:** Cornelius's public fortune is attributed to trade, charters, and colonial governance. His private fortune is suspected to include piracy, ransom, seized cargoes, and maritime deals too dirty for official ledgers. Use this contradiction as a source of family myth, leverage, and scandal. Source: user-provided historical direction.  
**Motivation:** Connects Cornelius, piracy, and the moral ambiguity of Douglas wealth.

---
**Prefix & Name:** LOR: Respectability Mask  
**Canon Layer:** [HISTORICAL]  
**Priority:** 7  
**Suggested Keywords:** respectability mask, Douglas respectability, legal mask, public legitimacy, respectable trade, aristocratic mask  
**Optimized Lore Text:** The Douglas line maintains a public mask of legality, refinement, and service to empire above aggressive commercial practices. Treat respectability as armor: it protects the family from scandal but also hides debt, violence, and compromised deals. Source: user-provided historical direction.  
**Motivation:** Preserves the aristocratic legitimacy of the Douglas line while allowing darker historical material.

---
**Prefix & Name:** LOC: Seven Hills Estate  
**Canon Layer:** [HISTORICAL]  
**Priority:** 8  
**Suggested Keywords:** Seven Hills, Seven Hills Estate, heritage site, training camp, Douglas ancestral, Georgian villa, Solarton Estate, Pack House  
**Optimized Lore Text:** Seven Hills Estate is a Douglas ancestral heritage site, Georgian villa, woodland reserve, and training camp. It was founded around 1740 as a colonial negotiation post and regional headquarters, then evolved into a country house and training ground for Douglas heirs and retainers. Source: user-provided Seven Hills notes.  
**Motivation:** Key Douglas location connecting later family heritage to the historical commercial line.

---
**Prefix & Name:** LOC: Seven Hills Interior Structures  
**Canon Layer:** [HISTORICAL]  
**Priority:** 7  
**Suggested Keywords:** Seven Hills interior, great hall, governor's study, family quarters, wine cellar, library, ring, training structure  
**Optimized Lore Text:** Seven Hills contains a Great Hall, Governor's Study, family quarters, wine cellar, library, woodland reserve, and training ring. Use interiors for inheritance rituals, private negotiations, archive research, combat training, and family power displays. Source: user-provided Seven Hills notes.  
**Motivation:** Defines the functional rooms of the ancestral estate.

---
**Prefix & Name:** LOC: Colonial Ports and Warehouses  
**Canon Layer:** [HISTORICAL]  
**Priority:** 7  
**Suggested Keywords:** colonial ports, warehouses, docks, customs house, wharves, bonded warehouse, port politics  
**Optimized Lore Text:** Colonial ports and warehouses are the operational spine of the Douglas trade empire: docks, customs houses, bonded warehouses, counting rooms, loading yards, and guarded quays. Use them for cargo disputes, bribes, seizures, rumors of piracy, and rival merchant pressure. Source: user-provided historical direction.  
**Motivation:** Provides the main scenic infrastructure for DCC operations.

---
**Prefix & Name:** ORG: Colonial Governors and Crown Officials  
**Canon Layer:** [HISTORICAL]  
**Priority:** 7  
**Suggested Keywords:** colonial governor, crown officials, imperial officials, customs officers, colonial administration  
**Optimized Lore Text:** Colonial governors and Crown officials form the bureaucratic layer that Cornelius and the DCC must flatter, bribe, evade, or dominate. Treat them as gatekeepers of charters, customs access, legal immunity, and political protection. Source: user-provided historical direction.  
**Motivation:** Important supporting faction for colonial trade and piracy ambiguity.

---
**Prefix & Name:** ORG: Rival Merchant Houses  
**Canon Layer:** [HISTORICAL]  
**Priority:** 6  
**Suggested Keywords:** rival merchant houses, competing companies, trade rivals, merchant cartel, commercial rivals  
**Optimized Lore Text:** Rival merchant houses compete with Douglas interests through price wars, port access, political favors, sabotage, and accusations of smuggling or piracy. Treat commercial rivalry as a social and economic battlefield. Source: user-provided historical direction.  
**Motivation:** Provides antagonistic pressure for Cornelius and the DCC.

---
**Prefix & Name:** BST: Sea Threats  
**Canon Layer:** [HISTORICAL]  
**Priority:** 6  
**Suggested Keywords:** sea threats, pirates, privateers, storms, mutiny, corsairs, hostile ships  
**Optimized Lore Text:** Sea threats include independent pirates, privateers, storms, mutiny, hostile ships, reefs, and opportunistic captains. Use them to pressure Douglas fleets and blur the line between legitimate trade, privateering, and piracy. Source: user-provided historical direction.  
**Motivation:** Adds maritime danger and pirate atmosphere without requiring supernatural content.

---
**Prefix & Name:** NPC: Heirs of Cornelius  
**Canon Layer:** [HISTORICAL]  
**Priority:** 6  
**Suggested Keywords:** heirs of Cornelius, Douglas heirs, Cornelius descendants, family heirs, commercial heirs  
**Optimized Lore Text:** Cornelius's heirs inherit wealth, contracts, enemies, compromised ledgers, and the burden of maintaining the Douglas respectability mask. Treat them as descendants of both legitimate trade and darker maritime gains. Source: user-provided historical direction.  
**Motivation:** Connects the historical scenario to the later Douglas dynastic line.

---

## 5. Deletion Plan

After this report was written, the following legacy source files were deleted because their lore-bearing content had been extracted into this report:

1. `legacy\Visual_DNA.md`
2. `legacy\W_Regency.md`
3. `legacy\W_Regency.js`

The `legacy` folder may remain empty unless a later cleanup removes the directory itself.
