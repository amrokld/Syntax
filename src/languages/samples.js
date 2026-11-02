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



    go: {
        code: `package main

import "fmt"

type Wish struct {
    recipient string
    hope      string
}

func main() {
    wish := Wish{
        recipient: "you",
        hope:      "a kinder life",
    }

    fmt.Printf("For %s: %s.\\n", wish.recipient, wish.hope)
    // even when the world forgets to be kind.
}`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    c: {
        code: `#include <stdio.h>

int main() {
    char *recipient = "you";
    int hope = 1;

    while (hope) {
        printf("May life be kind to %s.\\n", recipient);
        break;
    }

    // even on the difficult days.
    return 0;
}`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    csharp: {
        code: `using System;

public class AQuietWish
{
    static void Main()
    {
        string recipient = "you";
        string hope = "a kinder life";

        Console.WriteLine($"For {recipient}: {hope}.");
        // especially when the days are difficult.
    }
}`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    php: {
        code: `<?php

$recipient = "you";
$hope = "a kinder life";

function makeWish($person, $wish) {
    return "For $person: $wish.";
}

echo makeWish($recipient, $hope);

// even when the world forgets to be kind.
`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    ruby: {
        code: `class Wish
  def initialize(recipient)
    @recipient = recipient
  end

  def deliver
    puts "May life be kind to #{@recipient}."
    # even on the difficult days.
  end
end

Wish.new("you").deliver`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    swift: {
        code: `import Foundation

enum Wish {
    case kindness(for: String)
    case hope(neverExpires: Bool)
}

let recipient = "you"
let wishes: [Wish] = [
    .kindness(for: recipient),
    .hope(neverExpires: true)
]

print("May life be kind to you.")
// even on the days it isn't.
`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    kotlin: {
        code: `data class Wish(
    val recipient: String,
    val hope: String
)

fun main() {
    val wish = Wish(
        recipient = "you",
        hope = "a kinder life"
    )

    println("For \${wish.recipient}: \${wish.hope}.")
    // even when the days are difficult.
}`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    bash: {
        code: `#!/usr/bin/env bash

RECIPIENT="you"
HOPE="a kinder life"

echo "For $RECIPIENT: $HOPE."

if [ "$RECIPIENT" = "you" ]; then
    echo "Keep hoping."
fi

# even on the days it doesn't feel that way.`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },

    html: {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>A Quiet Wish</title>
</head>
<body>
    <main>
        <h1>For you</h1>
        <p>May life be kind.</p>
        <p>Even on difficult days.</p>
    </main>
</body>
</html>`,
        message:
            'I hope life is kind to you, even on the days it isn’t.',
    },
};