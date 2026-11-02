
import Prism from 'prismjs';
import 'prismjs/components/prism-go';

export const id = 'go';

export function detect(source) {
    return (
        /\bpackage\s+\w+/.test(source) ||
        /\bfunc\s+\w+\s*\(/.test(source) ||
        /\bdefer\s+\w+/.test(source) ||
        /\bgo\s+\w+\s*\(/.test(source) ||
        /\bchan\s+\w+/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.go;
}
