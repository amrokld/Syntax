import Prism from 'prismjs';
import 'prismjs/components/prism-typescript.js';

export const id = 'typescript';

export function detect(source) {
    return (
        /\b(interface|enum|implements|readonly)\b/.test(source) ||
        /:\s*(string|number|boolean)\b/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.typescript;
}