const fs = require('fs');

function splitCharacters() {
    const data = JSON.parse(fs.readFileSync('SvartulfrVerse_Urban_Characters.json'));
    const entries = Object.values(data.entries);
    
    // Sort by priority (descending) to ensure we get the best entries first
    entries.sort((a, b) => b.priority - a.priority);

    const mainNames = ['Alyssa', 'Malachia', 'Noah', 'Jasper', 'Erik', 'Logan', 'Wulfnic', 'Kaladin', 'Marcus', 'Sierra', 'Angel', 'Scarlett', 'Vito'];
    
    const mainEntries = [];
    const npcEntries = [];
    
    for (const e of entries) {
        let isMain = false;
        if (e.comment && e.comment.startsWith('Character: ')) {
            const namePart = e.comment.replace('Character: ', '').split(' (')[0].trim();
            if (mainNames.some(m => namePart.includes(m))) {
                isMain = true;
            }
        }
        
        if (!isMain && e.tags) {
            if (e.tags.some(t => mainNames.map(m=>m.toLowerCase()).includes(t.toLowerCase()))) {
                isMain = true;
            }
        }
        
        if (isMain) {
            mainEntries.push(e);
        } else {
            npcEntries.push(e);
        }
    }
    
    function writeBook(suffix, list) {
        const out = { ...data };
        out.name = (data.name || 'SvartulfrVerse_Urban_Characters') + ` - ${suffix}`;
        out.entries = {};
        list.forEach((e, idx) => {
            out.entries[String(idx)] = e;
        });
        fs.writeFileSync(`SvartulfrVerse_Urban_Characters_${suffix.replace(/ /g, '_')}.json`, JSON.stringify(out, null, 2));
        console.log(`Wrote Characters ${suffix} with ${list.length} entries.`);
    }
    
    writeBook('Main', mainEntries);
    
    const chunkSize = 250;
    for (let i = 0; i < npcEntries.length; i += chunkSize) {
        const chunk = npcEntries.slice(i, i + chunkSize);
        writeBook(`NPCs Part ${Math.floor(i / chunkSize) + 1}`, chunk);
    }
}

function splitWorld() {
    const data = JSON.parse(fs.readFileSync('SvartulfrVerse_Urban_World.json'));
    const entries = Object.values(data.entries);
    
    // Sort by priority (descending)
    entries.sort((a, b) => b.priority - a.priority);
    
    const chunkSize = 250;
    for (let i = 0; i < entries.length; i += chunkSize) {
        const chunk = entries.slice(i, i + chunkSize);
        
        const out = { ...data };
        out.name = (data.name || 'SvartulfrVerse_Urban_World') + ` - Part ${Math.floor(i / chunkSize) + 1}`;
        out.entries = {};
        chunk.forEach((e, idx) => {
            out.entries[String(idx)] = e;
        });
        fs.writeFileSync(`SvartulfrVerse_Urban_World_Part_${Math.floor(i / chunkSize) + 1}.json`, JSON.stringify(out, null, 2));
        console.log(`Wrote World Part ${Math.floor(i / chunkSize) + 1} with ${chunk.length} entries.`);
    }
}

splitCharacters();
splitWorld();
