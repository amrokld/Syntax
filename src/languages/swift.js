import Prism from 'prismjs';
import 'prismjs/components/prism-swift';

export const id = 'swift';


export function detect(source) {
    return (
        /\bimport\s+(Swift|Foundation|UIKit|SwiftUI)\b/.test(source) ||
        /\bfunc\s+\w+\s*\(/.test(source) ||
        /\blet\s+\w+\s*(?::[^=\n]+)?=/.test(source) ||
        /\bvar\s+\w+\s*(?::[^=\n]+)?=/.test(source) ||
        /\bguard\s+let\b/.test(source) ||
        /\benum\s+\w+/.test(source) ||
        /\bcase\s+\.\w+/.test(source)
    );
}


export function getGrammar() {
    return Prism.languages.swift;
}
