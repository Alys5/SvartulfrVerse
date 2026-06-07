# ADR-002: Family Authority Architecture

## Status
Accepted

## Scope
- Only Human
- Contemporary
- Los Angeles Dynasty

## Context
Following the formalization of Dynastic Origins (ADR-001) and the establishment of the Runtime Baseline (ADR-000), a structural layer must be defined to govern family trees. Historically, relationships were defined ad-hoc within character definitions or inferred randomly by runtime layers. This led to fatal canonical collisions, orphaned characters, and contradictory relationships across the Los Angeles Dynasty.

## Decision

### 1. Family Authority Layer
We establish the **Family Authority Layer** as the absolute and sole owner of:
- Genealogy
- Kinship
- Lineage
- Dynastic Ownership
- Surname Authority

Character files may reference family relationships, but they may NOT define them. World files may reference dynasties, but they may NOT define genealogy.

### 2. Canonical Ownership
The architecture enforces the following strict separation of concerns:
- **Character Layer** = Identity
- **World Layer** = Context
- **Family Authority Layer** = Genealogy

### 3. Relationship Authority
We define strict canonical relationship classes.

**Explicit Authority Records:**
These relationships carry canonical authority and must be explicitly stored:
- Parent
- Child
- Marriage
- Former Marriage
- Adoption
- Half-Sibling

**Derived Relationships:**
These relationships must NEVER be stored as independent canon. They are computationally derived from Explicit Authority Records:
- Sibling
- Grandparent
- Grandchild
- Uncle
- Aunt
- Nephew
- Niece
- Cousin
- In-Law

### 4. Inference Policy
We explicitly prohibit the runtime inference of family relationships. The runtime may consume authority records to calculate derived relationships, but it may never invent or infer genealogy that is not grounded in explicit authority records.

### 5. Dynasty Authority
We recognize three canonical dynastic structures:
- **Bloodmoon Dynasty:** Unilateral descent from the Bloodmoon line.
- **Douglas Dynasty:** Unilateral descent from the Douglas line.
- **Douglas-Bloodmoon Dynasty:** The synthesized line resulting uniquely from the Erik-Nixara union.

**Rules:**
- Dynasty ownership belongs to the Family Authority.
- Dynasty membership requires validation through Explicit Authority Records.
- Dynastic unions act as foundational graph nodes forming new canonical branches.

### 6. Surname Authority
Surnames carry dynastic weight and must be strictly governed:
- **Douglas**
- **Bloodmoon**
- **Douglas-Bloodmoon**

**The Douglas-Bloodmoon Surname:**
This is an exceptional dynastic surname. It is NOT a generic family surname. It originates exclusively from the union of **Erik Douglas + Nixara Bloodmoon**.

*Open Architecture Question:* Future surname inheritance rules for subsequent generations (e.g., descendants of Malachia, Noah, Jasper, Alyssa) remain unresolved. Do NOT define inheritance at this time.

### 7. Historical Runtime Failures
Historical archive analysis reveals critical runtime failures linked to missing this layer:
- **Valerius**
- **Cassia**
- **Hati**
- **Sköll**

**Root Causes:**
- Missing Data
- Authority Conflict
- Inference Failure

**Lessons Learned:** Loose relational binding resulting from implicit definitions allows characters to float or collide. Explicit binding via a dedicated authority layer is mandatory.

## Consequences

### Benefits
- Eliminates contradictory relationship charts.
- Centralizes kinship calculations.
- Prepares the groundwork for the future `family_engine.js` knowledge integration.

### Risks
- Stricter creation requirements for new characters (cannot exist without explicit Family Authority mapping).

### Future Work
- Define backend data structures for Explicit Authority Records.
- Resolve the Douglas-Bloodmoon surname inheritance logic for subsequent generations.
- Prepare canonical character imports mapping to this authority model.

### Open Questions
- How will surname inheritance for the Douglas-Bloodmoon line be handled for the grandchildren of Erik and Nixara?
