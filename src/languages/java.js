import Prism from 'prismjs';
import 'prismjs/components/prism-clike.js';
import 'prismjs/components/prism-java.js';

export const id = 'java';

export function detect(source) {
    return (
        /\bpublic\s+static\s+void\s+main\s*\(/.test(source) ||
        /\bSystem\.out\.print(?:ln)?\s*\(/.test(source) ||
        /\bimport\s+java\./.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.java;
}