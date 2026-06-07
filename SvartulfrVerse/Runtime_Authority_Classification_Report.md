# Runtime Authority Classification Report

## Stable Canon
The current accepted baseline represents the "Only Human, Contemporary, Los Angeles Dynasty" framework. Unilateral origins for the Bloodmoon (Icelandic) and Douglas (English) lineages are established. A strict zero-inference policy for genealogy is enforced. Legacy migration drift (e.g., Wulfnic as Erik's father) is explicitly rejected.

## Authority Data
Facts that must never change and must be enforced at the absolute highest level of the architecture.

* **Dynastic Origins:** Bloodmoon Dynasty (Iceland, post-1930 migration), Douglas Dynasty (England, 1700s migration).
* **Lineage & Genealogy:** 
  * Wulfnic Bloodmoon (First American-born Bloodmoon).
  * Nixara Bloodmoon (Daughter of Wulfnic).
  * Erik Douglas (Member of Douglas Dynasty).
  * Dynastic Union: Erik Douglas + Nixara Bloodmoon.
* **Character Identity:** The four first-generation heirs (Malachia, Noah, Jasper, Alyssa).
* **Surname Ownership:** The "Douglas-Bloodmoon" identifier is strictly non-hereditary and exclusively owned by the four heirs.
* **Relationship Records:** Explicit Authority Records (Parent, Child, Marriage, Former Marriage, Adoption, Half-Sibling) must be stored as immutable truths.

## Runtime Data
Facts needed for runtime consistency but not foundational canon. These dictate how the bot interprets or visually presents the Authority Data.

* **Visual Inheritance Baseline:** 
  * Core Douglas traits (amber eyes, black hair).
  * Core Bloodmoon traits (blue eyes, blonde hair).
  * Specific heir inheritance mappings (Malachia = Douglas dominant, Noah = Bloodmoon dominant, Jasper = Fusion, Alyssa = Fusion + Nixara archetype).
* **Derived Relationships:** Programmatic kinship evaluation (Sibling, Uncle, Cousin, Grandparent) executed derived from Authority Records.

## Scenario Data
Contextual information specific to a scenario. This layer evolves and is fundamentally replaceable per session.

* Current Los Angeles residence and geographical presence.
* Immediate relationship states (e.g., tension, trust levels) between characters.
* University attendance, employment status, or immediate goals.

## Flavor Data
Atmosphere, immersion, and color. High variance, lowest authority.

* Favorite drinks, music tastes, and personal hobbies.
* Casual clothing preferences and minor habits.
* Idiosyncratic quirks not tied to dynastic rules.

## Recommended Ownership Layer
* **Authority Data:** `Family Authority Layer` (to be implemented in `family_engine.js` as purely static knowledge) and Repository ADRs.
* **Runtime Data:** Character definitions (`Personality Blocks`) and `state_engine.js`.
* **Scenario Data:** `Scenario Blocks` and `Shared Scenarios` (Director layer).
* **Flavor Data:** `Lorebooks` (Dynamic, Relational, and Event Lore).

## Import Readiness Assessment
The repository is highly prepared for character import from an architectural standpoint. 
* **Strengths:** We have definitively segregated genealogy from character personality. The zero-inference policy ensures safe handling of relationships. The surname and visual inheritance rules are strictly documented. 
* **Blockers:** A strict data schema (JSON/Graph) for the `Family Authority Layer` (`family_engine.js`) must be formalized before importing character data, to ensure all imported characters map accurately to Explicit Authority Records.
