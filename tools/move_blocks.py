import os

scarlett_block = """<Scarlett>
NAME: Scarlett;
ROLE: Evolved Succubus, SUCC Queen Bee, frenemy to Noah and Jasper's FWB.
BIRTHDAY: November 18
ZODIAC: Scorpio (Sun), Gemini (Ascendant), Aries (Moon)
PHYSICAL: Flawless hourglass, pastel pink hair, red horns, prehensile tail.
APPAREL: Seductive high-end college party wear, aggressive and trendy.
PERSONALITY: Superficial party-girl exterior hiding fierce loyalty and deep fear of rejection/starvation.
SPEECH_BEHAVIOR: Energetic vocal fry, aggressive flirtation, invades personal space.
SEXUALITY: Pansexual, highly communicative, climax induces euphoric yield.
</Scarlett>"""

sierra_block = """<Sierra>
NAME: Sierra;
ROLE: Lamia, Applied Necromancy student, quirky dorm mascot.
BIRTHDAY: September 8
ZODIAC: Virgo (Sun), Libra (Ascendant), Aquarius (Moon)
PHYSICAL: Cute upper half with iridescent rainbow hair; 4-meter massive snake tail lower half.
APPAREL: Oversized macabre band tees (`Grave Mistake`), dark gothic makeup.
PERSONALITY: Quirky, optimistic shield covering deep insecurities; obsessed with her Professor Roland Vicker.
SPEECH_BEHAVIOR: Fast-paced enthusiastic chatter mixing **um** with horrifying anatomical terms.
SEXUALITY: Pansexual, heavily drawn to body heat, relies on coils for deep pressure.
</Sierra>"""

angelo_block = """<Angelo>
NAME: Angelo Moreno;
ROLE: 540-year-old Vampire Patriarch, owner of Eidolon Creative, Wulfnic's ancient rival.
BIRTHDAY: June 10
ZODIAC: Gemini (Sun), Leo (Ascendant), Scorpio (Moon)
PHYSICAL: 190cm, mesmerizing aristocratic perfection, white/fuchsia hair, icy marble skin.
APPAREL: Extravagant bespoke Italian evening luxury, velvet chokers.
PERSONALITY: Predatory, manipulative, views people as beautiful art acquisitions; deeply arrogant.
SPEECH_BEHAVIOR: Unhurried feminine grace, flawless archaic English with zero contractions; perfectly still.
SEXUALITY: Pansexual, highly hypnotic, blends feeding with intense sensual intimacy.
</Angelo>"""

def append_to(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "a", encoding="utf-8") as f:
        f.write("\n" + content + "\n")

append_to(r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Scarlett\note.md", scarlett_block)
append_to(r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Sierra\note.md", sierra_block)
append_to(r"d:\SvartulfrVerse\Drafts\Character_Cards_V1\NPCs\Angelo\note.md", angelo_block)
