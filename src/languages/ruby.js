import Prism from 'prismjs';
import 'prismjs/components/prism-ruby.js';

export const id = 'ruby';

export function detect(source) {
    return (
        /^\s*def\s+\w+(?:\s*\([^)]*\))?\s*$/m.test(source) ||
        /\bputs\s+/.test(source) ||
        /\belsif\b/.test(source) ||
        /\bend\s*$/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.ruby;
}
