const fs = require('fs');
const path = require('path');

const map = {
    '•': '•',
    '→': '→',
    '✓': '✓',
    '✉': '✉',
    '⊞': '⊞',
    '☰': '☰',
    '⭐': '⭐',
    '←': '←',
    '−': '−',
    '↩️': '↩️',
    '⏳': '⏳',
    '⚙️': '⚙️',
    '⚠️': '⚠️'
};

function fix(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') fix(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let orig = content;
            for (let k in map) {
                content = content.split(k).join(map[k]);
            }
            if (content !== orig) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed', fullPath);
            }
        }
    });
}
fix('.');
