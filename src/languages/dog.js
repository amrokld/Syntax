export const id = 'dog';

export function detect(source) {
    const text = source
        .replace(/```[\w-]*\n?/g, '')
        .replace(/```/g, '')
        .trim()
        .toLowerCase();

    if (!text) return false;

    const words = text.match(/\b[a-z]+\b/g) || [];
    if (words.length === 0) return false;

    const dogWords = words.filter(word =>
        /^(hao+|woof+|bark+|arf+|awoo+|grr+|ruff+)$/.test(word)
    );

    return dogWords.length / words.length >= 0.6;
}

export function getGrammar() {
    return {
        'dog-sound': {
            pattern: /\b(?:hao+|woof+|arf+|bark+)\b/gi,
            alias: 'keyword',
        },
    };
}