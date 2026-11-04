export const id = 'cat';

export function detect(source) {
    const text = source
        .replace(/```[\w-]*\n?/g, '')
        .replace(/```/g, '')
        .trim()
        .toLowerCase();

    if (!text) return false;

    const words = text.match(/\b[a-z]+\b/g) || [];
    if (words.length === 0) return false;

    const catWords = words.filter(word =>
        /^(meow+|mew+|nya+|purr+|mrrp+|mrow+|hiss+)$/.test(word)
    );

    return catWords.length / words.length >= 0.6;
}

export function getGrammar() {
    return {
        'cat-sound': {
            pattern: /\b(?:meow+|mew+|nya+|purr+)\b/gi,
            alias: 'keyword',
        },
    };
}