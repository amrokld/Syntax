import * as javascript from './javascript.js';
import * as python from './python.js';
import * as json from './json.js';

export const languages = {
    javascript,
    python,
    json,
};

export function detectLanguage(source) {
    // Check JSON first because valid JSON can contain
    // text that resembles other programming languages.
    if (json.detect(source)) return json.id;
    if (python.detect(source)) return python.id;
    if (javascript.detect(source)) return javascript.id;

    // Safe default when detection is uncertain.
    return javascript.id;
}

export function getLanguageModule(languageId) {
    return languages[languageId] || languages.javascript;
}