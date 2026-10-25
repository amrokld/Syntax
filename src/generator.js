
function analyzeMessage(message) {
    const text = message.toLowerCase();

    if (/\b(miss|lonely|alone|lost|empty|forgotten)\b/.test(text)) {
        return 'loneliness';
    }

    if (/\b(love|heart|care|together|beloved)\b/.test(text)) {
        return 'love';
    }

    if (/\b(hope|wish|kind|future|someday)\b/.test(text)) {
        return 'hope';
    }

    if (/\b(keep going|never give up|persist|succeed|achieve|dream)\b/.test(text)) {
        return 'perseverance';
    }

    if (/\b(change|changed|grow|growth|become|past self)\b/.test(text)) {
        return 'growth';
    }

    return 'reflection';
}

const PATTERNS = {
    javascript: {
        hope: (m) => `const wish = {
  for: "you",
  hope: ${m},
  expires: null,
};`,
        loneliness: (m) => `const absence = {
  feeling: ${m},
  missing: "someone I used to be",
  status: "still here",
};`,
        love: (m) => `const heart = {
  message: ${m},
  conditions: [],
  remains: true,
};`,
        perseverance: (m) => `while (!dream.reached) {
  learn();
  adapt();
  keepGoing(); // ${m}
}`,
        growth: (m) => `const me = {
  yesterday: "who I was",
  today: "who I'm becoming",
  reminder: ${m},
};`,
        reflection: (m) => `const thought = ${m};

// some things take time to understand.`,
    },

    python: {
        hope: (m) => `wish = {
    "for": "you",
    "hope": ${m},
    "expires": None,
}`,
        loneliness: (m) => `past_self = "someone I still remember"
feeling = ${m}

if past_self feels_far_away:
    sit_with_the_feeling()`,
        love: (m) => `heart = {
    "message": ${m},
    "conditions": [],
    "still_cares": True,
}`,
        perseverance: (m) => `while not dream.reached:
    learn()
    adapt()
    keep_going()  # ${m}`,
        growth: (m) => `me = {
    "past": "who I was",
    "present": "who I'm becoming",
    "reminder": ${m},
}`,
        reflection: (m) => `thought = ${m}

# some things take time to understand.`,
    },

    json: {
        hope: (m) => JSON.stringify({
            wish: m,
            for: 'you',
            expires: null,
        }, null, 2),
        loneliness: (m) => JSON.stringify({
            feeling: m,
            missing: 'someone I used to be',
            status: 'still here',
        }, null, 2),
        love: (m) => JSON.stringify({
            heart: m,
            conditions: [],
            remains: true,
        }, null, 2),
        perseverance: (m) => JSON.stringify({
            goal: m,
            attempts: 'unlimited',
            giving_up: false,
        }, null, 2),
        growth: (m) => JSON.stringify({
            past: 'who I was',
            present: m,
            future: 'still unwritten',
        }, null, 2),
        reflection: (m) => JSON.stringify({
            thought: m,
            understood: false,
            time_needed: 'unknown',
        }, null, 2),
    },

    typescript: {
        hope: (m) => `type Wish = {
  for: string;
  hope: string;
  expires: null;
};

const wish: Wish = {
  for: "you",
  hope: ${m},
  expires: null,
};`,
        loneliness: (m) => `type Feeling = {
  name: string;
  message: string;
};

const feeling: Feeling = {
  name: "loneliness",
  message: ${m},
};`,
        love: (m) => `type Heart = {
  message: string;
  conditions: never[];
};

const heart: Heart = {
  message: ${m},
  conditions: [],
};`,
        perseverance: (m) => `let dreamReached: boolean = false;

// ${m}
while (!dreamReached) {
  learn();
  adapt();
}`,
        growth: (m) => `type Me = {
  past: string;
  becoming: string;
};

const me: Me = {
  past: "who I was",
  becoming: ${m},
};`,
        reflection: (m) => `const thought: string = ${m};

// understanding: pending`,
    },

    cpp: {
        hope: (m) => `struct Wish {
    std::string recipient = "you";
    std::string hope = ${m};
    bool expires = false;
};`,
        loneliness: (m) => `std::string feeling = ${m};
bool found_myself = false;

// still searching...`,
        love: (m) => `struct Heart {
    std::string message = ${m};
    bool asks_for_nothing = true;
};`,
        perseverance: (m) => `while (!dream.reached()) {
    learn();
    adapt();
    keep_going(); // ${m}
}`,
        growth: (m) => `std::string past = "who I was";
std::string becoming = ${m};

// still a work in progress`,
        reflection: (m) => `std::string thought = ${m};
// meaning may take time`,
    },

    java: {
        hope: (m) => `Wish wish = new Wish(
    "you",
    ${m},
    null
);`,
        loneliness: (m) => `String feeling = ${m};
boolean foundMyself = false;

// search continues`,
        love: (m) => `Heart heart = new Heart(
    ${m},
    true // unconditional
);`,
        perseverance: (m) => `while (!dream.isReached()) {
    learn();
    adapt();
    keepGoing(); // ${m}
}`,
        growth: (m) => `String past = "who I was";
String becoming = ${m};

// still becoming`,
        reflection: (m) => `String thought = ${m};
// understanding: pending`,
    },

    rust: {
        hope: (m) => `let wish = Some(${m});
// some hopes have no expiration date`,
        loneliness: (m) => `let feeling = ${m};
let found_myself: Option<&str> = None;

// the search continues`,
        love: (m) => `let heart = Some(${m});
let conditions: Vec<&str> = vec![];`,
        perseverance: (m) => `while !dream.reached() {
    learn();
    adapt();
    keep_going(); // ${m}
}`,
        growth: (m) => `let past = "who I was";
let becoming = ${m};

// still a work in progress`,
        reflection: (m) => `let thought = ${m};
// meaning takes time`,
    },

    sql: {
        hope: (m) => `SELECT ${m} AS wish
FROM tomorrow
WHERE recipient = 'you';

-- no expiration date`,
        loneliness: (m) => `SELECT feeling
FROM inside_me
WHERE feeling = ${m}
   OR missing = 'who I was';

-- still searching`,
        love: (m) => `SELECT ${m} AS message
FROM heart
WHERE conditions IS NULL;

-- no conditions attached`,
        perseverance: (m) => `SELECT next_step
FROM my_journey
WHERE dream_reached = FALSE;

-- retry until it happens`,
        growth: (m) => `UPDATE myself
SET becoming = ${m}
WHERE life_continues = TRUE;

-- change is ongoing`,
        reflection: (m) => `SELECT ${m} AS thought
FROM the_unknown;

-- understanding: pending`,
    },
};

export function generateCode(message, language = 'javascript') {
    const cleanMessage = message.trim();
    const theme = analyzeMessage(cleanMessage);
    const languagePatterns =
        PATTERNS[language] ?? PATTERNS.javascript;
    const pattern =
        languagePatterns[theme] ?? languagePatterns.reflection;

    // JSON.stringify safely escapes quotes and special characters.
    return pattern(JSON.stringify(cleanMessage));
}
