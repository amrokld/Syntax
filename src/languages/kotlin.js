import Prism from 'prismjs';
import 'prismjs/components/prism-kotlin.js';

export const id = 'kotlin';

export function detect(source) {
    return (
        /\bfun\s+\w+\s*\(/.test(source) ||
        /\bval\s+\w+\s*=/.test(source) ||
        /\bvar\s+\w+\s*=/.test(source) ||
        /\bdata\s+class\s+\w+/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.kotlin;
}
