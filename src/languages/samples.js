export const LANGUAGE_SAMPLES = {
    javascript: {
        code: `const life = {
  wish: "be kind to you",
  evenWhen: "the days get heavy",
};

if (life.isUnkind) {
  remember("you still deserve gentleness");
}

// some things are worth hoping for.`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    python: {
        code: `def wish_for_you():
    while life.continues:
        try:
            return "a little more kindness"
        except HardDay:
            remember("you deserve it anyway")

# even on the days it doesn't feel that way.`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    json: {
        code: `{
  "wish": {
    "recipient": "you",
    "priority": "always",
    "hope": "that life is kind"
  },
  "conditions": {
    "good_days": "be grateful",
    "hard_days": "be gentle with yourself"
  },
  "expires": null
}`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    typescript: {
        code: `type Wish = {
  for: "you";
  hope: string;
  expires: null;
};

const wish: Wish = {
  for: "you",
  hope: "may life be gentle",
  expires: null,
};

// no exceptions for the difficult days.`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    cpp: {
        code: `#include <string>

struct Wish {
    std::string recipient = "you";
    std::string hope = "a kinder life";
    bool unconditional = true;
};

int main() {
    Wish wish;
    // still wishing, even on the hard days
}`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    java: {
        code: `public class AQuietWish {
    static final String FOR = "you";
    static final String HOPE = "a kinder life";

    public static void main(String[] args) {
        while (life.goesOn()) {
            wish.for(FOR).with(HOPE);
        }
    }
    // especially when life doesn't.
}`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    rust: {
        code: `struct Wish {
    for_you: bool,
    hope: Option<&'static str>,
}

fn main() {
    let wish = Wish {
        for_you: true,
        hope: Some("a kinder life"),
    };

    // some hopes don't need an end.
}`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    sql: {
        code: `SELECT kindness
FROM life
WHERE recipient = 'you'
   OR day = 'difficult'
ORDER BY hope DESC
LIMIT ALL;

-- some wishes have no expiration date.`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },
};