# Canonical Data Model Report

## Stable Canon
The SvartulfrVerse operates under the "Only Human, Contemporary, Los Angeles Dynasty" framework. The fundamental truth of this universe is based on strict separation of concerns: Character Identity, World Context, and Genealogy. A zero-inference policy for relationships is mandated, enforcing that all genealogical links must be explicitly defined rather than dynamically deduced.

## Entity Inventory & Classification

### Authority Entities
Facts that must never change and must be strictly enforced.

* **Dynasty:** Tracks unilateral origin (Bloodmoon = Iceland, Douglas = England).
* **Person:** Represents a character's fixed canonical identity and immutable traits.
* **Marriage:** Explicit authority record connecting two Person entities.
* **ParentChild:** Explicit authority record establishing lineage.
* **Surname:** Strictly governed (e.g., Douglas-Bloodmoon ownership rules).

### Runtime Entities
Facts needed for runtime consistency but not foundational canon.

* **Appearance:** Baseline visual traits (e.g., Douglas amber eyes, Bloodmoon blonde hair) driving visual representation.
* **Relationship:** Programmatically derived connections (Sibling, Cousin, Uncle) calculated from Authority Entities.
* **Role:** A character's functional position within the family or society.

### Scenario Entities
Contextual information specific to a given scene or immediate environment.

* **Scenario:** The live context setting (location, immediate relationship state).
* **Event:** Time-bound narrative occurrences affecting the state.
* **Location:** Current presence in the Los Angeles environment.
* **Household:** Temporary or semi-permanent living arrangements.
* **Organization:** Fluid affiliations (e.g., University, workplace).

### Flavor Entities
Atmosphere, immersion, and high-variance color.

* **Memory:** Experiential flavor adding depth to interactions, not strictly reliable.
* **Flavor:** Hobbies, clothing preferences, favorite drinks.

## Ownership Mapping

* **Family Authority Layer:** Dynasty, Person, Marriage, ParentChild, Surname.
* **Runtime State Management:** Relationship, Role, Appearance.
* **Scenario Control:** Scenario, Location, Household, Organization, Event.
* **Lorebook/Dynamic Expansion:** Memory, Flavor.

## Runtime Critical Entities
* **Person, Marriage, ParentChild:** The explicit graph nodes absolute to avoiding legacy migration drift and relationship inference failures.
* **Appearance:** Essential for maintaining the visual inheritance baseline during runtime outputs.

## Non-Critical Entities
* **Memory, Flavor:** Highly mutable and non-essential for maintaining architectural canon. Their loss or drift does not compromise the SvartulfrVerse integrity.

## Migration Risk Assessment
* **High Risk:** Importing `Relationship` data directly from historical archives. Due to the zero-inference policy, derived relationships cannot be imported; only `Marriage` and `ParentChild` records are safe.
* **Medium Risk:** `Appearance` data. Unverified historical appearances may conflict with the strict Visual Inheritance Baseline (e.g., ensuring Malachia has amber eyes/black hair).
* **Low Risk:** `Flavor` and `Location` data. These can be adjusted per scenario without damaging the foundational canon.

## Recommended Baseline
Prioritize the creation of robust data schemas purely for the Authority Entities (Dynasty, Person, ParentChild, Marriage, Surname). These schemas must reject any attempts to hardcode derived relationships and must flag any imported entity failing to map to a valid dynastic origin.
