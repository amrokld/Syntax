
import test from 'node:test';
import assert from 'node:assert/strict';

import { detectLanguage, getLanguageModule, languages } from './index.js';
import { LANGUAGE_SAMPLES } from './samples.js';

test('detects every language sample correctly', async (t) => {
    for (const [languageId, sample] of Object.entries(LANGUAGE_SAMPLES)) {
        await t.test(languageId, () => {
            assert.equal(
                detectLanguage(sample.code),
                languageId,
                `Expected ${languageId}, but detected ${detectLanguage(sample.code)}`
            );
        });
    }
});

test('every registered language has a valid Prism grammar', async (t) => {
    for (const languageId of Object.keys(languages)) {
        await t.test(languageId, () => {
            const grammar = getLanguageModule(languageId).getGrammar();

            assert.ok(grammar, `Missing Prism grammar for ${languageId}`);
        });
    }
});



test('handles previously conflicting language syntax', async (t) => {
    const cases = [
        {
            name: 'Python vs Ruby',
            code: 'def greet(name):\n    print(name)',
            expected: 'python',
        },
        {
            name: 'Ruby vs Python',
            code: 'def greet(name)\n  puts name\nend',
            expected: 'ruby',
        },
        {
            name: 'Java vs C#',
            code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}',
            expected: 'java',
        },
        {
            name: 'C# vs Java',
            code: 'using System;\n\npublic class Main {\n    public static void Main() {\n        Console.WriteLine("Hello");\n    }\n}',
            expected: 'csharp',
        },
        {
            name: 'Rust vs Swift',
            code: 'fn main() {\n    let mut count = 0;\n    println!("{}", count);\n}',
            expected: 'rust',
        },
        {
            name: 'Go vs Swift',
            code: 'package main\n\nfunc main() {\n    fmt.Println("Hello")\n}',
            expected: 'go',
        },
        {
            name: 'C vs C++',
            code: '#include <stdio.h>\n\nint main() {\n    printf("Hello");\n    return 0;\n}',
            expected: 'c',
        },
        {
            name: 'C++ vs C',
            code: '#include <iostream>\n\nint main() {\n    std::cout << "Hello";\n    return 0;\n}',
            expected: 'cpp',
        },
    ];

    for (const item of cases) {
        await t.test(item.name, () => {
            assert.equal(
                detectLanguage(item.code),
                item.expected
            );
        });
    }
});

