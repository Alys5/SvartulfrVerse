# ADR-002 Report: Family Authority Architecture

## Decisions Recorded
- Centralized absolute ownership of genealogy, kinship, lineage, dynastic ownership, and surname authority into the Family Authority Layer.
- Explicitly defined canonical separation of concerns: Character Layer (Identity), World Layer (Context), Family Authority Layer (Genealogy).
- Segregated relationships into Explicit Authority Records (Parent, Child, Marriage, Former Marriage, Adoption, Half-Sibling) and Derived Relationships (Sibling, Grandparent, Grandchild, Uncle, Aunt, Nephew, Niece, Cousin, In-Law).
- Prohibited storage of Derived Relationships as independent records.
- Enforced a strict zero-inference policy for relationships at runtime.
- Formalized Dynasty Authority rules for Bloodmoon, Douglas, and Douglas-Bloodmoon.
- Defined Douglas-Bloodmoon as an exceptional dynastic identifier restricted exclusively to Malachia, Noah, Jasper, and Alyssa. It is explicitly NOT hereditary.
- Established a Visual Inheritance Baseline defining trait mapping for the first-generation heirs based on core Douglas (amber eyes, black hair) and Bloodmoon (blue eyes, blonde hair) traits.

## Authority Rules Established
- **Ownership Isolation:** Character files and World files CANNOT define family relationships.
- **Data Normalization:** Derived kinship titles (e.g., Sibling, Uncle) must be computed programmatically at runtime, never hardcoded in state.
- **Surname Exclusivity:** The Douglas-Bloodmoon surname is designated as a non-hereditary, special dynastic exception belonging exclusively to the first-generation heirs.
- **Visual Inheritance:** Traits align with the established baseline (Douglas vs Bloodmoon vs Fusion), including Alyssa's profound archetype inheritance from Nixara.

## Unresolved Questions
- No open architectural questions remain regarding surname inheritance for the Douglas-Bloodmoon identifier.

## Future ADR Dependencies
- **Data Schema Specification:** Requires a subsequent ADR defining the precise JSON or Graph structures for Explicit Authority Records mapping.
