import Prism from 'prismjs';
import 'prismjs/components/prism-json.js';

export const id = 'json';

export function detect(source) {
    const trimmed = source.trim();

    if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
        return false;
    }

    try {
        JSON.parse(trimmed);
        return true;
    } catch {
        return false;
    }
}

export function getGrammar() {
    return Prism.languages.json;
}