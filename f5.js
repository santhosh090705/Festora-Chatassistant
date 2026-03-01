const fs = require('fs');
const path = require('path');

const d = 'C:/Users/HP/OneDrive/Documents/Portfolio/Festora';

const map = {
    'ðŸ  ': '🏠',
    'ðŸŽŸï¸ ': '🎟️',
    'âš™ï¸ ': '⚙️',
    'âš ï¸ ': '⚠️',
    'ðŸ“ ': '📍',
    'â† ': '←',
    'â­ ': '⭐',
    'ðŸ ¦': '🏦',
    'â†©ï¸ ': '↩️',
    'âœ‚': '✂',
    'âˆ’': '−',
    'ðŸ“…': '📅',
    'ðŸ’º': '💸',
    'ð • ': '𝕏',
    'ðŸŽ«': '🎫',
    'ðŸŽ¤': '🎤',
    'ðŸ’³': '💳',
    'ðŸ“±': '📱',
    'ðŸ“²': '📱',
    'ðŸ”µ': '🔵',
    'ðŸ’°': '💰',
    'ðŸ‡®ðŸ‡³': '🇮🇳',
    'ðŸŸ¡': '🟡',
    'âœ…': '✅',
    'Ã—': '×',
    'â€¢': '•',
    'â†’': '→',
    'âœ“': '✓',
    'âœ‰': '✉',
    'âŠž': '⊞',
    'â˜°': '☰',
    'â ³': '⏳',
    'ðŸ“´': '📲', // Added one more just in case
};

fs.readdirSync(d).forEach(f => {
    if (f.endsWith('.html') || (f.endsWith('.js') && !f.startsWith('fix_chars') && !f.startsWith('f5'))) {
        let p = path.join(d, f);
        let s = fs.readFileSync(p, 'utf8');
        let orig = s;
        for (let k in map) {
            s = s.split(k).join(map[k]);
        }
        if (s !== orig) {
            fs.writeFileSync(p, s, 'utf8');
            console.log('Fixed:', p);
        }
    }
});
