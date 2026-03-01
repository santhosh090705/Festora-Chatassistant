const fs = require('fs');

const d = 'C:/Users/HP/OneDrive/Documents/Portfolio/Festora';

const repl = [
    [/ðŸ  /g, '🏠'],
    [/ðŸŽŸï¸ /g, '🎟️'],
    [/âš™ï¸ /g, '⚙️'],
    [/âš ï¸ /g, '⚠️'],
    [/ðŸ“ /g, '📍'],
    [/â† /g, '←'],
    [/â­ /g, '⭐'],
    [/ðŸ ¦/g, '🏦'],
    [/â†©ï¸ /g, '↩️'],
    [/âœ‚/g, '✂'],
    [/âˆ’/g, '−'],
    [/ðŸ“…/g, '📅'],
    [/ðŸ’º/g, '💸'],
    [/ð • /g, '𝕏'],
    [/ðŸŽ«/g, '🎫'],
    [/ðŸŽ¤/g, '🎤'],
    [/ðŸ’³/g, '💳'],
    [/ðŸ“±/g, '📱'],
    [/ðŸ“²/g, '📱'],
    [/ðŸ”µ/g, '🔵'],
    [/ðŸ’°/g, '💰'],
    [/ðŸ‡®ðŸ‡³/g, '🇮🇳'],
    [/ðŸŸ¡/g, '🟡'],
    [/âœ…/g, '✅'],
    [/Ã—/g, '×'],
    [/â€¢/g, '•'],
    [/â†’/g, '→'],
    [/âœ“/g, '✓'],
    [/âœ‰/g, '✉'],
    [/âŠž/g, '⊞'],
    [/â˜°/g, '☰'],
    [/â ³/g, '⏳']
];

fs.readdirSync(d).forEach(f => {
    if (f.endsWith('.html') || (f.endsWith('.js') && !f.startsWith('fix_chars'))) {
        let p = d + '/' + f;
        let s = fs.readFileSync(p, 'utf8');
        let orig = s;
        repl.forEach(r => { s = s.replace(r[0], r[1]); });
        if (s !== orig) {
            fs.writeFileSync(p, s, 'utf8');
            console.log('Fixed:', p);
        }
    }
});
