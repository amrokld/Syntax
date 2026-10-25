import Prism from 'prismjs';
import 'prismjs/components/prism-python';

export const id = 'python';

export function detect(source) {
    return /^\s*(def |class .+:|from .+ import |import )/m.test(source)
        || /^\s*print\s*\(/m.test(source)
        || /^\s*if .+:\s*$/m.test(source);
}

export function getGrammar() {
    return Prism.languages.python;
}