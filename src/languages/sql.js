import Prism from 'prismjs';
import 'prismjs/components/prism-sql.js';

export const id = 'sql';

export function detect(source) {
    return (
        /\b(SELECT\s+.+\s+FROM|INSERT\s+INTO|UPDATE\s+\w+\s+SET|CREATE\s+TABLE|DELETE\s+FROM)\b/i.test(source)
    );
}

export function getGrammar() {
    return Prism.languages.sql;
}