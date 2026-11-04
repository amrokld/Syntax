# Syntax

**Turn personal messages into code.**

Syntax is an interactive experience that transforms personal messages into animated code, revealing it one character at a time.

Explore different programming languages, customize the code, and discover the message hidden behind the syntax.

![Syntax application screenshot](docs/screenshot.png)


## Features

- **Animated code reveal** — Watch code unfold character by character.
- **Playback controls** — Pause, resume, replay, and adjust animation speed.
- **Automatic language detection** — Identify the programming language from the current code.
- **19 supported languages** — Syntax highlighting across 19 programming and markup languages.
- **Import your own code** — Import existing code and provide its original message.
- **Prompt Studio** — Prepare prompts and customize code-generation instructions.
- **Message reveal** — Reveal the original message associated with the code.
- **Code editor** — Edit the code and its original message.




## Supported languages

Syntax supports 17 programming and markup languages:

`JavaScript` `Python` `JSON` `TypeScript` `C++`

`Java` `Rust` `SQL` `Go` `C`

`C#` `PHP` `Ruby` `Swift` `Kotlin`

`Bash` `HTML`

`Human` `Cat` `Dog`

Language syntax highlighting is powered by [Prism.js](https://prismjs.com/).


## Getting started

### Requirements

- Node.js 18 or later
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/amroklld/Syntax.git
cd Syntax
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

### Production build

Build the application:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Testing

Run the automated test suite:

```bash
npm test
```

The test suite covers:

- Language detection across all 17 supported languages.
- Prism grammar availability.
- Regression tests for previously identified language detection conflicts.

## Safety

Syntax displays code as text. Imported or generated code is **never executed**.

## Built with

- React
- Vite
- Prism.js
- JavaScript
- CSS
- Node.js test runner

---

**Syntax** — Messages expressed through code.