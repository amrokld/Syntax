import Prism from 'prismjs';
import 'prismjs/components/prism-rust.js';

export const id = 'rust';

export function detect(source) {
    return (
        /\bfn\s+main\s*\(/.test(source) ||
        /\bfn\s+\w+\s*\([^)]*\)\s*->/.test(source) ||
        /\b(?:let\s+mut|impl|trait|println!|eprintln!)\b/.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.rust;
}