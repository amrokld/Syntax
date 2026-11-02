import Prism from 'prismjs';
import 'prismjs/components/prism-csharp';

export const id = 'csharp';

export function detect(source) {
    return (
        /\busing\s+System\b/.test(source) ||
        /\bnamespace\s+\w+/.test(source) ||
        /\bConsole\.Write(Line)?\s*\(/.test(source) ||
        /\bpublic\s+class\s+\w+/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.csharp;
}
