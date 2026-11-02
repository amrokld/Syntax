import Prism from 'prismjs';
import 'prismjs/components/prism-markup.js';

export const id = 'html';

export function detect(source) {
    return (
        /<!DOCTYPE\s+html/i.test(source) ||
        /<html[\s>]/i.test(source) ||
        /<(div|section|article|header|footer|main|body|head)[\s>]/i.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.markup;
}
