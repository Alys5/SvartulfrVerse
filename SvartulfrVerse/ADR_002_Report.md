# ADR-002 Report: Family Authority Architecture

## Decisions Recorded
- Centralized absolute ownership of genealogy, kinship, lineage, dynastic ownership, and surname authority into the Family Authority Layer.
- Explicitly defined canonical separation of concerns: Character Layer (Identity), World Layer (Context), Family Authority Layer (Genealogy).
- Segregated relationships into Explicit Authority Records (Parent, Child, Marriage, Former Marriage, Adoption, Half-Sibling) and Derived Relationships (Sibling, Grandparent, Grandchild, Uncle, Aunt, Nephew, Niece, Cousin, In-Law).
- Prohibited storage of Derived Relationships as independent records.
- Enforced a strict zero-inference policy for relationships at runtime.
- Formalized Dynasty Authority rules for Bloodmoon, Douglas, and Douglas-Bloodmoon.
- Defined Douglas-Bloodmoon as an exceptional dynastic surname restricted initially to the Erik + Nixara union.

## Authority Rules Established
- **Ownership Isolation:** Character files and World files CANNOT define family relationships.
- **Data Normalization:** Derived kinship titles (e.g., Sibling, Uncle) must be computed programmatically at runtime, never hardcoded in state.
- **Surname Exclusivity:** The Douglas-Bloodmoon surname is designated a non-generic, special dynastic exception.

## Unresolved Questions
- What are the specific familial inheritance rules governing the Douglas-Bloodmoon dynastic surname for the descendants of the first-generation heirs?

## Future ADR Dependencies
- **Surname Inheritance Rules:** A dedicated ADR must be established to dictate how the Douglas-Bloodmoon surname applies to future offspring.
- **Data Schema Specification:** Requires a subsequent ADR defining the precise JSON or Graph structures for Explicit Authority Records mapping.
