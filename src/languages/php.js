import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';

export const id = 'php';

export function detect(source) {
    return (
        /<\?php/.test(source) ||
        /\$\w+\s*=/.test(source) ||
        /\becho\s+/.test(source) ||
        /\bfunction\s+\w+\s*\([^)]*\)\s*\{/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.php;
}
