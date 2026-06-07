# ADR-001 Report: Dynastic Origins

## Decisions Recorded
- Formalized the Icelandic origin and migration to North America after 1930 for the Bloodmoon Dynasty.
- Formalized the English origin and migration to America during the 1700s for the Douglas Dynasty.
- Designated Wulfnic as the first American-born Bloodmoon generation, with his parents born in Iceland.
- Confirmed Nixara's lineage strictly as the daughter of Wulfnic.
- Confirmed Erik's lineage as a member of the English-origin Douglas Dynasty.
- Formalized the dynastic union of Erik and Nixara.
- Established strict surname authority rules for the "Douglas-Bloodmoon" line.
- Explicitly rejected the legacy migration drift characterizing the relationship `Wulfnic → Erik` as father-son.
- Defined this ADR as the absolute canonical genealogy authority for future Family Authority Layer implementations.

## Assumptions Made
- The post-1930 Bloodmoon migration establishes a timeframe that comfortably aligns Wulfnic's birth and Nixara's age with the "Contemporary" baseline requirement.
- The 1700s migration of the Douglas Dynasty ensures deep roots in America prior to the Bloodmoon migration, ensuring Erik and Nixara are contemporaries.

## Unresolved Questions
- Specific chronological dates (exact birth years, exact migration years) remain undefined and will require future timeline validation via the `LA_OnlyHuman_Academic_Timeline` paradigm.
- The identities of Wulfnic's Icelandic parents and Erik's specific Douglas predecessors.

## Conflicts Resolved
- Resolved a critical, repository-breaking legacy conflict where Erik was documented as Wulfnic's son, destroying the validity of the Erik/Nixara dynastic union. The `Wulfnic → Erik (father-son)` link was decisively annulled.
