const fs = require('fs');
const path = require('path');

const dir = 'd:\\Progetti\\database\\characters';
const files = fs.readdirSync(dir).filter(f => f.startsWith('C_') && f.endsWith('.js'));

files.forEach(file => {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace "au:" with "world:"
    content = content.replace(/\bau\s*:/g, 'world:');
    
    // Replace "e.au" with "e.world"
    content = content.replace(/\be\.au\b/g, 'e.world');
    
    // Replace "var au =" with "var w ="
    content = content.replace(/var au =/g, 'var w =');
    
    // Replace "indexOf(au)" with "indexOf(w)"
    content = content.replace(/indexOf\(au\)/g, 'indexOf(w)');
    
    // Replace "L3 —" with "C —"
    content = content.replace(/L3 —/g, 'C —');
    
    // Replace "L3 MICRO-ENGINE" with "CHARACTER MICRO-ENGINE"
    content = content.replace(/L3 MICRO-ENGINE/g, 'CHARACTER MICRO-ENGINE');
    
    // Replace "L3_ENTRIES" with "C_ENTRIES"
    content = content.replace(/L3_ENTRIES/g, 'C_ENTRIES');
    
    // Also fix the meta notes inside the texts
    content = content.replace(/L3_svartulfrverse_char_/g, 'C_');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated ' + file);
});
