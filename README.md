# Syntax

An interactive experience that turns personal messages into code. Watch
them unfold character by character, explore different programming
languages, and discover the meaning hidden behind the syntax.

## Run locally

``` bash
npm install
npm run dev
```

Open the local URL Vite prints in your terminal.

## Controls

-   **Pause / resume:** Pause or continue the typing animation.
-   **Replay:** Restart the animation from the beginning.
-   **Playback speed:** Adjust how quickly the code appears.
-   **Detected Language:** Displays the programming language detected from the current code.
-   **Imported code:** Import your own code or text and enter the original message it represents.
-   **Show message:** Reveal the original message behind the code.
-   **Edit code and message:** Open the editor to customize the code and
    its original message.

The controls appear subtly when you move the pointer over the page.

## Supported languages

Syntax supports automatic language detection and syntax highlighting for JavaScript, Python, JSON, TypeScript, C++, Java, Rust, and SQL through Prism.

## Safety

The code is displayed, never executed.
