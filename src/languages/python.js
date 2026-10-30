import Prism from 'prismjs';
import 'prismjs/components/prism-python';

export const id = 'python';

export function detect(source) {
    return (
        /^\s*(def\s+\w+\s*\(|class\s+\w+.*:)/m.test(source) ||
        /^\s*from\s+\w+(?:\.\w+)*\s+import\s+/m.test(source) ||
        /^\s*import\s+\w+(?:\.\w+)*(?:\s+as\s+\w+)?\s*$/m.test(source) ||
        /^\s*print\s*\(/m.test(source) ||
        /^\s*if\s+.+:\s*$/m.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.python;
}