import * as javascript from './javascript.js';
import * as python from './python.js';
import * as json from './json.js';
import * as typescript from './typescript.js';
import * as cpp from './cpp.js';
import * as java from './java.js';
import * as rust from './rust.js';
import * as sql from './sql.js';

export const languages = {
    javascript,
    python,
    json,
    typescript,
    cpp,
    java,
    rust,
    sql,
};

export function detectLanguage(source) {
    // Structured formats first.
    if (json.detect(source)) return json.id;

    // Languages with distinctive syntax.
    if (cpp.detect(source)) return cpp.id;
    if (java.detect(source)) return java.id;
    if (rust.detect(source)) return rust.id;
    if (typescript.detect(source)) return typescript.id;
    if (sql.detect(source)) return sql.id;
    if (python.detect(source)) return python.id;

    // JavaScript is the fallback.
    if (javascript.detect(source)) return javascript.id;

    return javascript.id;
}

export function getLanguageModule(languageId) {
    return languages[languageId] || languages.javascript;
}