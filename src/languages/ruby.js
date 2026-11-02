import Prism from 'prismjs';
import 'prismjs/components/prism-ruby';

export const id = 'ruby';

export function detect(source) {
    return (
        /\bdef\s+\w+/.test(source) ||
        /\bputs\s+/.test(source) ||
        /\belsif\b/.test(source) ||
        /\bend\s*$/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.ruby;
}
