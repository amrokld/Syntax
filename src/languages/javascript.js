import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

export const id = 'javascript';

export function detect(source) {
    return /\b(const|let|var|function|console\.log|=>)\b/.test(source);
}

export function getGrammar() {
    return Prism.languages.javascript;
}