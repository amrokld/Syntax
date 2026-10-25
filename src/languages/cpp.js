import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';

export const id = 'cpp';

export function detect(source) {
    return (
        /#include\s*[<"]/.test(source) ||
        /\bstd::\w+/.test(source) ||
        /\bint\s+main\s*\(/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.cpp;
}