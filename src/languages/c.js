import Prism from 'prismjs';
import 'prismjs/components/prism-c';

export const id = 'c';

export function detect(source) {
    return (
        /#include\s*[<"]/.test(source) ||
        /\bint\s+main\s*\(/.test(source) ||
        /\bprintf\s*\(/.test(source) ||
        /\bstruct\s+\w+\s*\{/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.c;
}
