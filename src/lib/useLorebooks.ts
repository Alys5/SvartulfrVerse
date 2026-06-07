import { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, getDocs, doc, setDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export type FileContent = {
  id: string;
  title: string;
  type: 'md' | 'js';
  content: string;
};

const DEFAULT_FILES: Record<string, Omit<FileContent, 'id'>> = {
  'README.md': {
    title: 'README.md',
    type: 'md',
    content: '# Svartulfr_LA — Family Authority & Canon Reconstruction\n\n## Scope\nThis workspace is dedicated exclusively to the reconstruction of the canonical foundations of the new Svartulfr_LA repository.\n\n## Mission\nReconstruct the Los Angeles Dynasty baseline from verified historical evidence. No lore generation, no roleplay, no experiences.\n\n## Authority Hierarchy\nRuntime Validation > Approved Repository Canon > Architecture Decisions > Historical Archive > NotebookLM Research Evidence'
  },
  'ADR-000_Baseline': {
    title: 'ADR-000_Runtime_Baseline.md',
    type: 'md',
    content: '# ADR-000: Runtime Baseline\n\n## Status\nAccepted\n\n## Context\nThe existing Progetti repository has accumulated canonical drift through multiple migration cycles. Observed failures include... \n\n## Decision\nLegacy Repository: Progetti -> Historical Archive\nNew Repository: SvartúlfrVerse -> Active Runtime Canon Repository\n\nLegacy relationships such as Wulfnic -> Erik (father-son) are officially rejected as migration drift.'
  },
  'ADR-001_Dynastic_Origins': {
    title: 'ADR-001_Dynastic_Origins.md',
    type: 'md',
    content: `# ADR-001: Dynastic Origins - Los Angeles Dynasty Baseline\n\n## Status\n\nAccepted\n\n## Context\n\nThe repository initialization established the need for canonical stabilization and explicitly identified legacy relationship degradation as a failure to prevent. A critical genealogical conflict exists in the historical archive regarding the lineages of Erik Douglas and Wulfnic Bloodmoon. To establish a true foundation for the Los Angeles Dynasty, the origins, early migrations, and fundamental family structures must be formalized before any Family Authority Layer logic is implemented.\n\n## Decision\n\nWe establish the following canonical origins and genealogical structure as the absolute authority for the Family Authority Layer.\n\n### Scope\n- Only Human\n- Contemporary\n- Los Angeles Dynasty\n\n### 1. Dynasty Origins and Migration\n- **Bloodmoon Dynasty:** Originates in Iceland. The dynasty underwent an early 20th-century migration from Iceland to America.\n- **Douglas Dynasty:** Originates in England, followed by a subsequent migration to America.\n\n### 2. Generational Structure\n- **Wulfnic Bloodmoon:** Recognized as the first American-born generation of the Bloodmoon Dynasty.\n- **Nixara Bloodmoon:** Canonically established as the daughter of Wulfnic Bloodmoon.\n- **Erik Douglas:** Canonically established as a member of the separate Douglas Dynasty.\n\n### 3. Dynastic Union and Surname Authority\n- **The Union:** The core dynastic union is formed between Erik Douglas and Nixara Bloodmoon.\n- **Douglas-Bloodmoon Line:** This union singularly creates the Douglas-Bloodmoon line.\n- **Surname Authority Rules:** All heirs resulting from the union of Erik and Nixara inherently belong to the Douglas-Bloodmoon line, and the hyphenated surname is the authoritative, mandated convention for these heirs.\n\n### 4. Legacy Migration Drift Rejection\n- We explicitly **reject** the historically migrated genealogy that defines the relationship: \`Wulfnic → Erik (father-son)\`.\n- This father-son relationship is formally identified as legacy migration drift and annulled from canon. Erik Douglas bears no blood relation to Wulfnic Bloodmoon.\n\n### 5. Genealogy Authority\n- This document serves as the absolute canonical genealogy authority. It supersedes all historical archive entries and NotebookLM research data regarding these foundational relationships.\n\n## Rationale\n\nTo maintain the conceptual integrity of a "Dynastic Union," the uniting families must be completely distinct entities with separate origins and histories. Permitting the legacy migration drift that positions Erik as Wulfnic's son would imply an incestuous or conceptually flawed dynastic merge when Erik forms a union with Nixara (Wulfnic's daughter). Clarifying the Icelandic (Bloodmoon) and English (Douglas) geographical origins further isolates the families prior to their American convergence.\n\n## Consequences\n\n- The \`family_engine.js\` knowledge layer must treat the Bloodmoon and Douglas lineages as entirely separate root nodes prior to the Nixara-Erik union.\n- Any references to Erik as Wulfnic's son discovered during the Canon Recovery Workflow must be immediately classified as legacy drift and discarded.\n- All future lineage validations for the first-generation heirs (Malachia, Noah, Jasper, Alyssa) must trace exclusively back to the Nixara-Erik union.\n\n## Future Implementation Notes\n\n- Future implementation within \`family_engine.js\` will require defining distinct origin nodes for the Bloodmoon and Douglas families.\n- The \`Douglas-Bloodmoon\` union will need to be structured as a joint node derived from Erik and Nixara. No graph data structures or engine logic are to be created at this time.`
  },
  'ADR-002_Family_Authority': {
    title: 'ADR-002_Family_Authority.md',
    type: 'md',
    content: `# ADR-002: Family Authority Architecture\n\n## Status\nAccepted\n\n## Scope\n- Only Human\n- Contemporary\n- Los Angeles Dynasty\n\n## Context\nFollowing the formalization of Dynastic Origins (ADR-001) and the establishment of the Runtime Baseline (ADR-000), a structural layer must be defined to govern family trees. Historically, relationships were defined ad-hoc within character definitions or inferred randomly by runtime layers. This led to fatal canonical collisions, orphaned characters, and contradictory relationships across the Los Angeles Dynasty.\n\n## Decision\n\n### 1. Family Authority Layer\nWe establish the **Family Authority Layer** as the absolute and sole owner of:\n- Genealogy\n- Kinship\n- Lineage\n- Dynastic Ownership\n- Surname Authority\n\nCharacter files may reference family relationships, but they may NOT define them. World files may reference dynasties, but they may NOT define genealogy.\n\n### 2. Canonical Ownership\nThe architecture enforces the following strict separation of concerns:\n- **Character Layer** = Identity\n- **World Layer** = Context\n- **Family Authority Layer** = Genealogy\n\n### 3. Relationship Authority\nWe define strict canonical relationship classes.\n\n**Explicit Authority Records:**\nThese relationships carry canonical authority and must be explicitly stored:\n- Parent\n- Child\n- Marriage\n- Former Marriage\n- Adoption\n- Half-Sibling\n\n**Derived Relationships:**\nThese relationships must NEVER be stored as independent canon. They are computationally derived from Explicit Authority Records:\n- Sibling\n- Grandparent\n- Grandchild\n- Uncle\n- Aunt\n- Nephew\n- Niece\n- Cousin\n- In-Law\n\n### 4. Inference Policy\nWe explicitly prohibit the runtime inference of family relationships. The runtime may consume authority records to calculate derived relationships, but it may never invent or infer genealogy that is not grounded in explicit authority records.\n\n### 5. Dynasty Authority\nWe recognize three canonical dynastic structures:\n- **Bloodmoon Dynasty:** Unilateral descent from the Bloodmoon line.\n- **Douglas Dynasty:** Unilateral descent from the Douglas line.\n- **Douglas-Bloodmoon Dynasty:** The synthesized line resulting uniquely from the Erik-Nixara union.\n\n**Rules:**\n- Dynasty ownership belongs to the Family Authority.\n- Dynasty membership requires validation through Explicit Authority Records.\n- Dynastic unions act as foundational graph nodes forming new canonical branches.\n\n### 6. Surname Authority\nSurnames carry dynastic weight and must be strictly governed:\n- **Douglas**\n- **Bloodmoon**\n- **Douglas-Bloodmoon**\n\n**The Douglas-Bloodmoon Surname:**\nThis is an exceptional dynastic surname. It is NOT a generic family surname. It originates exclusively from the union of **Erik Douglas + Nixara Bloodmoon**.\n\n*Open Architecture Question:* Future surname inheritance rules for subsequent generations (e.g., descendants of Malachia, Noah, Jasper, Alyssa) remain unresolved. Do NOT define inheritance at this time.\n\n### 7. Historical Runtime Failures\nHistorical archive analysis reveals critical runtime failures linked to missing this layer:\n- **Valerius**\n- **Cassia**\n- **Hati**\n- **Sköll**\n\n**Root Causes:**\n- Missing Data\n- Authority Conflict\n- Inference Failure\n\n**Lessons Learned:** Loose relational binding resulting from implicit definitions allows characters to float or collide. Explicit binding via a dedicated authority layer is mandatory.\n\n## Consequences\n\n### Benefits\n- Eliminates contradictory relationship charts.\n- Centralizes kinship calculations.\n- Prepares the groundwork for the future \`family_engine.js\` knowledge integration.\n\n### Risks\n- Stricter creation requirements for new characters (cannot exist without explicit Family Authority mapping).\n\n### Future Work\n- Define backend data structures for Explicit Authority Records.\n- Resolve the Douglas-Bloodmoon surname inheritance logic for subsequent generations.\n- Prepare canonical character imports mapping to this authority model.\n\n### Open Questions\n- How will surname inheritance for the Douglas-Bloodmoon line be handled for the grandchildren of Erik and Nixara?`
  },
  'ADR_002_Report': {
    title: 'ADR_002_Report.md',
    type: 'md',
    content: `# ADR-002 Report: Family Authority Architecture\n\n## Decisions Recorded\n- Centralized absolute ownership of genealogy, kinship, lineage, dynastic ownership, and surname authority into the Family Authority Layer.\n- Explicitly defined canonical separation of concerns: Character Layer (Identity), World Layer (Context), Family Authority Layer (Genealogy).\n- Segregated relationships into Explicit Authority Records (Parent, Child, Marriage, Former Marriage, Adoption, Half-Sibling) and Derived Relationships (Sibling, Grandparent, Grandchild, Uncle, Aunt, Nephew, Niece, Cousin, In-Law).\n- Prohibited storage of Derived Relationships as independent records.\n- Enforced a strict zero-inference policy for relationships at runtime.\n- Formalized Dynasty Authority rules for Bloodmoon, Douglas, and Douglas-Bloodmoon.\n- Defined Douglas-Bloodmoon as an exceptional dynastic surname restricted initially to the Erik + Nixara union.\n\n## Authority Rules Established\n- **Ownership Isolation:** Character files and World files CANNOT define family relationships.\n- **Data Normalization:** Derived kinship titles (e.g., Sibling, Uncle) must be computed programmatically at runtime, never hardcoded in state.\n- **Surname Exclusivity:** The Douglas-Bloodmoon surname is designated a non-generic, special dynastic exception.\n\n## Unresolved Questions\n- What are the specific familial inheritance rules governing the Douglas-Bloodmoon dynastic surname for the descendants of the first-generation heirs?\n\n## Future ADR Dependencies\n- **Surname Inheritance Rules:** A dedicated ADR must be established to dictate how the Douglas-Bloodmoon surname applies to future offspring.\n- **Data Schema Specification:** Requires a subsequent ADR defining the precise JSON or Graph structures for Explicit Authority Records mapping.`
  },
  'Architecture.md': {
     title: 'Architecture.md',
     type: 'md',
     content: '# Architecture\n\n## Core Principles\n- Runtime First\n- Preserve Behavior Before Refactoring\n- Knowledge vs Behavior Separation\n- Character Canonicality\n- Incremental Reintroduction\n- Canonical Stabilization'
  },
  'Scope.md': {
     title: 'Repository_Scope.md',
     type: 'md',
     content: '# Repository Scope\n\n## Supported Content\n- Only Human\n- Contemporary\n- Los Angeles Dynasty\n\n## Not Supported (Archived)\n- Urban Fantasy\n- Cyber\n- Wasteland\n- Fantasy\n- Norse Mythic\n- Regency'
  },
  'En_Core.js': {
     title: 'En_Core.js',
     type: 'js',
     content: '/**\n * En_Core.js\n *\n * Placeholder for Central Coordination and Orchestration Layer\n *\n * PURPOSE:\n * This engine serves as the central coordination layer for the SvartúlfrVerse runtime system.\n * It orchestrates interactions between other engines and manages overall system state.\n */\n\n// Placeholder - No implementation'
  },
  'state_engine.js': {
     title: 'state_engine.js',
     type: 'js',
     content: '/**\n * state_engine.js\n *\n * Placeholder for State Management Engine\n *\n * RESPONSIBILITIES (Future Implementation):\n * - Character state management\n * - State transition validation\n * - State persistence and retrieval\n */\n\n// Placeholder - No implementation'
  },
  'family_engine.js': {
     title: 'family_engine.js',
     type: 'js',
     content: '/**\n * family_engine.js\n *\n * Family Authority Knowledge Layer (NOT a Behavior Engine)\n *\n * CRITICAL DISTINCTION:\n * This engine provides authoritative STATIC family definitions.\n * Dynamic relationship calculations belong in relationship_engine.js.\n */\n\n// Placeholder - No implementation'
  }
};

export function useLorebooks() {
  const [files, setFiles] = useState<Record<string, Omit<FileContent, 'id'>>>(DEFAULT_FILES);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filesRef = collection(db, 'files');
    const unsubscribe = onSnapshot(filesRef, (snapshot) => {
      if (!snapshot.empty) {
        const loadedFiles: Record<string, Omit<FileContent, 'id'>> = {};
        snapshot.docs.forEach(docSnap => {
          const data = docSnap.data();
          loadedFiles[docSnap.id] = {
            title: data.title,
            type: data.type as 'md' | 'js',
            content: data.content
          };
        });
        setFiles(loadedFiles);
      } else {
        // Fallback to default files if DB is empty
      }
      setLoading(false);
    }, (err) => {
      console.error("Error fetching files", err);
      // fallback to default
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const publishToFirebase = async () => {
    if (!user) {
      await login();
      return;
    }
    
    // Once logged in, save default items to firebase config
    for (const [key, val] of Object.entries(DEFAULT_FILES)) {
      try {
        const fileRef = doc(db, 'files', key);
        await setDoc(fileRef, {
          ...val,
          updatedAt: new Date().toISOString()
        });
      } catch (err) {
        console.error("Failed to seed " + key, err);
      }
    }
  };

  return { files, loading, user, login, publishToFirebase };
}
