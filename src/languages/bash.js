import Prism from 'prismjs';
import 'prismjs/components/prism-bash.js';

export const id = 'bash';

export function detect(source) {
    return (
        /^#!.*\b(bash|sh)\b/m.test(source) ||
        /\bfi\s*$/.test(source) ||
        /\bdone\s*$/.test(source) ||
        /\becho\s+\$/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.bash;
}
