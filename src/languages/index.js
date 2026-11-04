import * as javascript from './javascript.js';
import * as python from './python.js';
import * as json from './json.js';
import * as typescript from './typescript.js';
import * as cpp from './cpp.js';
import * as java from './java.js';
import * as rust from './rust.js';
import * as sql from './sql.js';
import * as go from './go.js';
import * as c from './c.js';
import * as csharp from './csharp.js';
import * as php from './php.js';
import * as ruby from './ruby.js';
import * as swift from './swift.js';
import * as kotlin from './kotlin.js';
import * as bash from './bash.js';
import * as html from './markup.js';
import * as human from './human.js';
import * as cat from './cat.js';
import * as dog from './dog.js';
import * as idk from './idk.js';

export const languages = {
    javascript,
    python,
    json,
    typescript,
    cpp,
    java,
    rust,
    sql,
    go,
    c,
    csharp,
    php,
    ruby,
    swift,
    kotlin,
    bash,
    html,
    human,
    cat,
    dog,
    idk,
};


export function detectLanguage(source) {
    // Structured formats first.
    if (json.detect(source)) return json.id;
    if (html.detect(source)) return html.id;

    // Languages with more distinctive syntax.
    if (bash.detect(source)) return bash.id;
    if (php.detect(source)) return php.id;
    if (csharp.detect(source)) return csharp.id;
    if (kotlin.detect(source)) return kotlin.id;
    if (ruby.detect(source)) return ruby.id;
    if (sql.detect(source)) return sql.id;

    // C-family and systems languages.
    if (go.detect(source)) return go.id;
    if (rust.detect(source)) return rust.id;
    if (swift.detect(source)) return swift.id;
    if (c.detect(source)) return c.id;
    if (cpp.detect(source)) return cpp.id;
    if (java.detect(source)) return java.id;
    if (typescript.detect(source)) return typescript.id;
    if (python.detect(source)) return python.id;

    if (javascript.detect(source)) return javascript.id;

    if (cat.detect(source)) return cat.id;
    if (dog.detect(source)) return dog.id;
    if (human.detect(source)) return human.id;

    // Anything not recognized is unsupported for now.
    return 'idk';
}


export function getLanguageModule(languageId) {
    return languages[languageId] || languages.javascript;
}