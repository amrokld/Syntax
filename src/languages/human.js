import Prism from 'prismjs';
import 'prismjs/components/prism-markdown.js';

export const id = 'human';

export function detect(source) {
    const text = source
        .replace(/^```(?:markdown|md)?\s*/i, '')
        .replace(/\s*```$/, '')
        .trim();

    if (!text) return false;

    // Reject text without recognizable words.
    const words = text.match(/\p{L}[\p{L}\p{N}'’_-]*/gu) || [];

    if (words.length === 0) return false;

    // Avoid accidentally identifying obvious programming syntax as Human.
    if (
        /(?:^|\n)\s*(?:const|let|var|function|class|import|export|return)\s+\w+/m.test(text) ||
        /=>|<\/?[a-z][^>]*>/i.test(text)
    ) {
        return false;
    }

    return true;
}

export function getGrammar() {
    return Prism.languages.markdown;
}