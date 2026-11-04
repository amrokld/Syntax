import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'devicon/devicon.min.css';
import { LANGUAGE_ICONS } from './languages/icons.js';

import {
  detectLanguage,
  getLanguageModule,
} from './languages/index.js';

import './style.css';
import { i } from 'framer-motion/client';

const SAMPLE_CODE = `const message = {
  to: "you",
  from: "someone who cares",
  meaning: "I hope life is kind to you.",
};

// even on the days it isn't.`;

const SAMPLE_MESSAGE =
  'I hope life is kind to you, even on the days it isn’t.';

const MAX_LINE_CHARS = 100;
const BASE_TYPING_DELAY = 27;
const SPEED_OPTIONS = [0.5, 1, 1.5, 2];
const PREFERENCES_KEY = 'code-message-preferences';
const WELCOME_KEY = 'syntax-welcome-seen';

const LANGUAGE_LABELS = {
  javascript: 'JavaScript',
  python: 'Python',
  json: 'JSON',
  typescript: 'TypeScript',
  cpp: 'C++',
  java: 'Java',
  rust: 'Rust',
  go: 'Go',
  c: 'C',
  csharp: 'C#',
  php: 'PHP',
  ruby: 'Ruby',
  swift: 'Swift',
  kotlin: 'Kotlin',
  bash: 'Bash',
  html: 'HTML',
  sql: 'SQL',
};

function LanguageIcon({ id }) {
  const iconClass = LANGUAGE_ICONS[id];

  if (id === 'sql') {
    return <img src={iconClass} className="language-icon" alt="" />;
  }

  if (!iconClass) {
    return <span className="language-icon-fallback">SQL</span>;
  }

  return (
    <i className={`${iconClass} language-icon`} aria-hidden="true" />
  );
}

function wrapSource(source, maxChars = MAX_LINE_CHARS) {
  return source
    .split('\n')
    .flatMap((line) => {
      if (line.length <= maxChars) return [line];

      const chunks = [];
      for (let i = 0; i < line.length; i += maxChars) {
        chunks.push(line.slice(i, i + maxChars));
      }
      return chunks;
    })
    .join('\n');
}

function typingDelay(source, index, speed) {
  const next = source[index];

  if (next === '\n') return 180 / speed;
  if (/[.!?;]/.test(next || '')) return 115 / speed;
  if (/[,:[({]/.test(next || '')) return 65 / speed;
  if (next === ' ') return 12 / speed;

  return BASE_TYPING_DELAY / speed;
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}





function buildPrompt(message, language, instructions) {
  return `You are a creative code artist. Transform the original message into an expressive, visually interesting code composition.

LANGUAGE:
${language}

ORIGINAL MESSAGE:
"""
${message}
"""

CREATIVE DIRECTION:
${instructions.trim() || 'Interpret the message creatively. Choose a distinctive concept and style.'}

REQUIREMENTS:
- Create a complete, self-contained code composition.
- HARD LIMIT: 20 physical code lines maximum.
- Aim for 12–18 lines, leaving room for a meaningful ending.
- Count blank lines and comments as lines.
- Markdown fences do not count toward the limit.
- Plan the entire composition before writing it.
- Verify the line count before responding. If it exceeds 20 lines, redesign it more concisely.
- Never exceed the limit or omit the ending to meet it.
- Make the code itself communicate the message's meaning and emotional subtext.
- Use creative names, structures, functions, conditions, and meaningful comments where appropriate.
- Every line must contribute to the composition.
- Avoid generic templates, filler, and pointless complexity.
- Preserve the original message's meaning and emotional nuance.
- Use syntax appropriate to the selected language.

OUTPUT FORMAT:
- Return exactly one Markdown code block.
- Use the correct language identifier after the opening triple backticks.
- Include no introduction, explanation, or conclusion outside the code block.
- Return the complete composition, including its intended final line.
- Do not return a fragment or exceed 20 physical code lines.

Example format:
\`\`\`${language.toLowerCase()}
your code here
\`\`\``;
}





function App() {
  const [source, setSource] = useState(SAMPLE_CODE);
  const [originalMessage, setOriginalMessage] = useState(SAMPLE_MESSAGE);

  const [visibleChars, setVisibleChars] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [typingStarted, setTypingStarted] = useState(false);

  const [showComposer, setShowComposer] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeReady, setWelcomeReady] = useState(false);

  const [speed, setSpeed] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [languageOverride, setLanguageOverride] = useState(null);
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [maxLineChars, setMaxLineChars] = useState(MAX_LINE_CHARS);

  const detectedLanguage = useMemo(() => detectLanguage(source), [source]);
  const language = detectedLanguage;
  const promptLanguage = languageOverride || detectedLanguage;
  const languageModule = useMemo(() => getLanguageModule(language), [language]);

  const [draftMessage, setDraftMessage] = useState(SAMPLE_MESSAGE);
  const [importedCode, setImportedCode] = useState(SAMPLE_CODE);
  const [promptInstructions, setPromptInstructions] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [editorMode, setEditorMode] = useState('prompt');
  const [copyStatus, setCopyStatus] = useState('idle');
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const wrappedSource = useMemo(
    () => wrapSource(source, maxLineChars),
    [source, maxLineChars]
  );

  const lines = wrappedSource.split('\n');
  const visibleSource = wrappedSource.slice(0, visibleChars);
  const complete = visibleChars >= wrappedSource.length;
  const visibleLines = visibleSource.split('\n');

  const livePrompt = useMemo(
    () =>
      buildPrompt(
        draftMessage,
        LANGUAGE_LABELS[promptLanguage] || promptLanguage,
        promptInstructions
      ),
    [draftMessage, promptLanguage, promptInstructions]
  );

  // Load saved playback preferences once.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PREFERENCES_KEY) || 'null');
      if (saved && SPEED_OPTIONS.includes(saved.speed)) setSpeed(saved.speed);
      if (
        saved &&
        (saved.languageOverride === null ||
          Object.hasOwn(LANGUAGE_LABELS, saved.languageOverride))
      ) {
        setLanguageOverride(saved.languageOverride);
      }
    } catch {
      // Preferences are optional; defaults remain usable.
    }
    setPreferencesReady(true);
  }, []);

  // Check whether this visitor has already seen the welcome guide.
  useEffect(() => {
    try {
      const hasSeenWelcome = localStorage.getItem(WELCOME_KEY) === 'true';
      setShowWelcome(!hasSeenWelcome);
    } catch {
      setShowWelcome(true);
    }

    setWelcomeReady(true);
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;
    try {
      localStorage.setItem(
        PREFERENCES_KEY,
        JSON.stringify({ speed, languageOverride })
      );
    } catch {
      // Storage can be unavailable in private or restricted contexts.
    }
  }, [speed, languageOverride, preferencesReady]);

  // Respect the system's reduced-motion preference.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  // Reflow the code into readable lines on narrow screens.
  useEffect(() => {
    const updateLineWidth = () => {
      const availableWidth = Math.max(180, window.innerWidth - 112);
      const estimatedCharacterWidth = window.innerWidth <= 600 ? 6.2 : 8.4;
      setMaxLineChars(
        Math.max(24, Math.min(MAX_LINE_CHARS, Math.floor(availableWidth / estimatedCharacterWidth)))
      );
    };
    updateLineWidth();
    window.addEventListener('resize', updateLineWidth);
    return () => window.removeEventListener('resize', updateLineWidth);
  }, []);

  // Briefly soften the code when the sample changes.
  useEffect(() => {
    setTransitioning(true);
    setVisibleChars(0);
    setTypingStarted(false);
    setPlaying(true);

    const timer = window.setTimeout(() => setTransitioning(false), 240);
    return () => window.clearTimeout(timer);
  }, [source, maxLineChars]);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleChars(wrappedSource.length);
      setTypingStarted(true);
      return undefined;
    }
    if (typingStarted || !playing) return undefined;

    const timer = window.setTimeout(() => setTypingStarted(true), 650);
    return () => window.clearTimeout(timer);
  }, [typingStarted, playing, reducedMotion, wrappedSource.length]);

  useEffect(() => {
    if (reducedMotion || !typingStarted || !playing || complete) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setVisibleChars((current) => Math.min(current + 1, wrappedSource.length));
    }, typingDelay(wrappedSource, visibleChars, speed));

    return () => window.clearTimeout(timer);
  }, [
    typingStarted,
    playing,
    complete,
    visibleChars,
    wrappedSource,
    speed,
    reducedMotion,
  ]);

  function replay() {
    if (reducedMotion) {
      setVisibleChars(wrappedSource.length);
      setTypingStarted(true);
      setPlaying(false);
      return;
    }
    setVisibleChars(0);
    setTypingStarted(false);
    setPlaying(true);
  }


  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    let newCode = form.elements.code.value.trim();

    const lines = newCode.split("\n");
    const firstLine = lines[0].trim();

    if (firstLine.startsWith("```") && lines[lines.length - 1].trim() === "```") {
      newCode = lines.slice(1, -1).join("\n").trim();
    }

    if (!newCode) return;

    setSource(newCode);
    setImportedCode(newCode);
    setOriginalMessage(draftMessage.trim());
    setShowMessage(false);
    setShowComposer(false);
    setShowSpeedOptions(false);
  }

  // Close the small menus when the user clicks anywhere outside them.
  function handleOutsidePointerDown(event) {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('.control-popover')) return;

    setShowSpeedOptions(false);

    if (!event.target.closest('.language-select')) {
      setShowLanguageOptions(false);
    }
  }

  // Shortcuts: Space = pause/play, R = replay, M = message, E = editor, Esc = close.
  useEffect(() => {
    function handleKeyDown(event) {
      const target = event.target;
      const isInteractiveTarget =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(target.tagName) ||
          target.getAttribute('role') === 'button');

      if (isInteractiveTarget || event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === 'Escape') {
        setShowMessage(false);
        setShowComposer(false);
        setShowSpeedOptions(false);
        return;
      }

      if (event.code === 'Space') {
        event.preventDefault();
        setPlaying((current) => !current);
      } else if (event.key.toLowerCase() === 'r') {
        replay();
      } else if (event.key.toLowerCase() === 'm') {
        setShowMessage((current) => !current);
      } else if (event.key.toLowerCase() === 'e') {
        setShowComposer((current) => !current);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reducedMotion, wrappedSource.length]);

  function handleGeneratePrompt(event) {
    event.preventDefault();

    const message = draftMessage.trim();
    if (!message) return;

    setOriginalMessage(message);
    setDraftMessage(message);
    setGeneratedPrompt('');
  }

  async function handleCopyPrompt() {
    try {
      await navigator.clipboard.writeText(generatedPrompt || livePrompt);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }

    window.setTimeout(() => {
      setCopyStatus('idle');
    }, 2000);
  }

  function dismissWelcome() {
    setShowWelcome(false);

    try {
      localStorage.setItem(WELCOME_KEY, 'true');
    } catch {
      // The welcome can still be dismissed if storage is unavalible.
    }
  }


  return (
    <main className="stage">
      <section
        className={`code-scene${transitioning ? ' is-transitioning' : ''}`}
        aria-label="Animated code message"
        style={{ '--code-width': `${maxLineChars}ch` }}
      >
        <div className="code-rows">
          {(() => {
            const grammar =
              languageModule.getGrammar() || Prism.languages.javascript;

            return lines.map((_, index) => {
              const lineText = visibleLines[index] ?? '';
              const highlightedLine = Prism.highlight(lineText, grammar, language);
              const isCursorLine =
                !complete && index === visibleLines.length - 1;

              return (
                <div className="code-row" key={`${index}-${maxLineChars}`}>
                  <span
                    className="line-number"
                    aria-hidden="true"
                    style={{ animationDelay: `${Math.min(index * 55, 440)}ms` }}
                  >
                    {index + 1}
                  </span>
                  <pre className="code-content">
                    <code
                      dangerouslySetInnerHTML={{ __html: highlightedLine || '&nbsp;' }}
                    />
                    {isCursorLine && !reducedMotion && (
                      <span className="cursor" aria-hidden="true" />
                    )}
                  </pre>
                </div>
              );
            })
          })()}
        </div>
      </section>

      {showMessage && (
        <div
          className="message-overlay"
          role="presentation"
          onClick={() => setShowMessage(false)}
        >
          <div
            className="original-message"
            role="dialog"
            aria-label="Original message"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            {originalMessage || 'No original message provided.'}
            <span className="message-hint">click anywhere outside to close · esc</span>
          </div>
        </div>
      )}

      <div
        className="quiet-controls"
        role="group"
        aria-label="Playback controls"
      >
        <span className="brand-word">Syntax</span>

        <button
          className="control-button"
          onClick={() => setShowWelcome(true)}
          data-tooltip="How to use syntax"
          aria-label="Preview welcome guide"
        >
          ?
        </button>

        <span className="brand-line" aria-hidden="true" />

        <button
          className="control-button"
          onClick={() => setPlaying((current) => !current)}
          data-tooltip={playing ? 'Pause · Space' : 'Play · Space'}
          aria-label={playing ? 'Pause animation' : 'Resume animation'}
        >
          {playing ? 'Ⅱ' : '▶'}
        </button>

        <button
          className="control-button"
          onClick={replay}
          data-tooltip="Replay · R"
          aria-label="Replay animation"
        >
          ↻
        </button>

        <div className="control-popover">
          {showSpeedOptions && (
            <div className="popover-options speed-options">
              {SPEED_OPTIONS.map((option) => (
                <button
                  key={option}
                  className={speed === option ? 'option-active' : ''}
                  onClick={() => {
                    setSpeed(option);
                    setShowSpeedOptions(false);
                  }}
                  aria-pressed={speed === option}
                >
                  {option.toFixed(1)}×
                </button>
              ))}
            </div>
          )}

          <button
            className="control-button"
            onClick={() => {
              setShowSpeedOptions((current) => !current);
            }}
            data-tooltip="Playback speed"
            aria-label="Playback speed"
            aria-expanded={showSpeedOptions}
          >
            {speed.toFixed(1)}×
          </button>
        </div>

        <div className="control-popover">
          <div
            className="control-button language-button"
            data-tooltip="Detected code language"
            aria-label={`Detected code language: ${LANGUAGE_LABELS[language] || language}`}
          >
            <LanguageIcon id={language} />
            {LANGUAGE_LABELS[language] || language}
          </div>
        </div>

        <button
          className="control-button"
          onClick={() => setShowMessage(true)}
          data-tooltip="Show original message · M"
          aria-label="Show original message"
        >
          <EyeIcon />
        </button>

        <button
          className="control-button"
          onClick={() => setShowComposer((current) => !current)}
          data-tooltip="Edit code & message · E"
          data-tooltip-align="right"
          aria-label="Edit code and message"
          aria-expanded={showComposer}
        >
          {'</>'}
        </button>
      </div>


      {showComposer && (
        <div
          className="composer-overlay"
          role="presentation"
          onClick={() => setShowComposer(false)}
        >
          <section
            className="prompt-studio"
            role="dialog"
            aria-label="Syntax Prompt Studio"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >

            <header className="prompt-studio-header">
              <div>
                <span className="prompt-eyebrow">SYNTAX / STUDIO</span>
                <h2>Shape your message.</h2>
              </div>

              <button
                type="button"
                className="prompt-close"
                onClick={() => setShowComposer(false)}
                aria-label="Close editor"
              >
                ×
              </button>
            </header>

            <nav className="studio-tabs" aria-label="Studio mode">
              <button
                type="button"
                className={editorMode === 'prompt' ? 'active' : ''}
                onClick={() => setEditorMode('prompt')}
              >
                <span>01</span> Generate Prompt
              </button>

              <button
                type="button"
                className={editorMode === 'import' ? 'active' : ''}
                onClick={() => setEditorMode('import')}
              >
                <span>02</span> Import Code
              </button>
            </nav>



            <div className="prompt-studio-panels">
              {editorMode === 'prompt' ? (
                <>
                  <form
                    className="prompt-controls"
                    onSubmit={handleGeneratePrompt}
                  >
                    <div className="prompt-section-heading">
                      <span>01</span>
                      <h3>Configure your message</h3>
                    </div>

                    <div className="editor-field">
                      <label htmlFor="message-input">Your message</label>
                      <textarea
                        id="message-input"
                        name="message"
                        value={draftMessage}
                        onChange={(event) => {
                          const message = event.target.value;
                          setDraftMessage(message);
                          setOriginalMessage(message);
                          setGeneratedPrompt('');
                        }}
                        placeholder="What do you want to express?"
                        required
                      />
                    </div>


                    <div className="editor-field">
                      <label>Language</label>

                      <div className="language-select">
                        <button
                          type="button"
                          className="language-select-trigger"
                          onClick={() => setShowLanguageOptions((current) => !current)}
                          aria-haspopup="listbox"
                          aria-expanded={showLanguageOptions}
                        >
                          <span className="language-select-value">
                            {languageOverride && <LanguageIcon id={languageOverride} />}
                            {LANGUAGE_LABELS[languageOverride] || 'Auto detect'}
                          </span>
                          <span className="language-select-arrow">▾</span>
                        </button>

                        {showLanguageOptions && (
                          <div className="language-options" role="listbox">
                            <button
                              type="button"
                              role="option"
                              aria-selected={languageOverride === null}
                              className={languageOverride === null ? 'selected' : ''}
                              onClick={() => {
                                setLanguageOverride(null);
                                setGeneratedPrompt('');
                                setShowLanguageOptions(false);
                              }}
                            >
                              Auto detect
                            </button>

                            {Object.entries(LANGUAGE_LABELS).map(([id, label]) => (
                              <button
                                type="button"
                                role="option"
                                aria-selected={languageOverride === id}
                                className={languageOverride === id ? 'selected' : ''}
                                key={id}
                                onClick={() => {
                                  setLanguageOverride(id);
                                  setGeneratedPrompt('');
                                  setShowLanguageOptions(false);
                                }}
                              >
                                <span className="language-option-content">
                                  <LanguageIcon id={id} />
                                  {label}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>


                    <div className="editor-field">
                      <label htmlFor="instructions-input">
                        Additional instructions
                      </label>
                      <textarea
                        id="instructions-input"
                        value={promptInstructions}
                        onChange={(event) => {
                          setPromptInstructions(event.target.value);
                          setGeneratedPrompt('');
                        }}
                        placeholder="Poetic, minimalist, recursive, dark..."
                      />
                    </div>

                    <div className="prompt-control-footer">
                      <span>Prompt preview updates live.</span>
                      <button type="submit">Refresh prompt ↗</button>
                    </div>
                  </form>

                  <div className="prompt-preview-panel">
                    <div className="prompt-section-heading">
                      <span>02</span>
                      <h3>Live prompt</h3>
                      <span className="live-indicator">LIVE</span>
                    </div>

                    <textarea
                      className="live-prompt-editor"
                      aria-label="Edit generated prompt"
                      value={generatedPrompt || livePrompt}
                      onChange={(event) => setGeneratedPrompt(event.target.value)}
                      spellCheck="false"
                    />

                    <div className="prompt-preview-footer">
                      <span>{(generatedPrompt || livePrompt).length} characters</span>
                      <button
                        type="button"
                        onClick={handleCopyPrompt}
                        aria-live="polite"
                      >
                        {copyStatus === 'copied'
                          ? 'Copied ✓'
                          : copyStatus === 'failed'
                            ? 'Copy failed'
                            : 'Copy prompt'}
                      </button>
                    </div>
                  </div>
                </>
              ) : (

                <form
                  className="prompt-import-form"
                  onSubmit={handleSubmit}
                >

                  <div className="prompt-import-layout">
                    <div className="prompt-controls">
                      <div className="prompt-section-heading">
                        <span>01</span>
                        <h3>Import generated code</h3>
                      </div>

                      <div className="editor-field">
                        <label htmlFor="imported-message">Original message</label>
                        <textarea
                          id="imported-message"
                          name="originalMessage"
                          value={draftMessage}
                          onChange={(event) => {
                            const message = event.target.value;
                            setDraftMessage(message);
                            setOriginalMessage(message);
                          }}
                          placeholder="Enter the message this code represents..."
                          required
                        />
                      </div>
                    </div>

                    <div className="prompt-preview-panel">
                      <div className="prompt-section-heading">
                        <span>02</span>
                        <h3>Generated code</h3>
                      </div>

                      <textarea
                        id="code-input"
                        name="code"
                        value={importedCode}
                        onChange={(event) => setImportedCode(event.target.value)}
                        spellCheck="false"
                        required
                      />
                    </div>
                  </div>

                  <div className="prompt-control-footer">
                    <span>{LANGUAGE_LABELS[promptLanguage] || promptLanguage}</span>
                    <button type="submit">Play message ↗</button>
                  </div>
                </form>
              )}
            </div>

          </section>
        </div>
      )}

      {welcomeReady && showWelcome && (
        <div className="welcome-overlay">
          <section
            className="welcome-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
          >
            <span className="welcome-eyebrow">WELCOME TO SYNTAX</span>

            <h2 id="welcome-title">
              Messages, expressed through code.
            </h2>

            <p className="welcome-description">
              Syntax transforms personal messages into expressive code
              compositions, revealing them one character at a time.
            </p>


            <div className="welcome-guide">
              <h3>How to use Syntax</h3>

              <div className="welcome-guide-item">
                <span>01</span>
                <p>
                  Open Prompt Studio using the <strong>&lt;/&gt;</strong> button.
                </p>
              </div>

              <div className="welcome-guide-item">
                <span>02</span>
                <p>
                  Enter your message and choose a programming language.
                </p>
              </div>

              <div className="welcome-guide-item">
                <span>03</span>
                <p>
                  Copy the generated prompt and send it to your preferred AI.
                </p>
              </div>

              <div className="welcome-guide-item">
                <span>04</span>
                <p>
                  Copy the code generated by the AI and open the Import Code tab.
                </p>
              </div>

              <div className="welcome-guide-item">
                <span>05</span>
                <p>
                  Paste the code, provide the original message, and press Play message.
                </p>
              </div>

              <div className="welcome-guide-item">
                <span>06</span>
                <p>
                  Enjoy the animation of your message.
                </p>
              </div>
            </div>


            <button
              className="welcome-start"
              onClick={dismissWelcome}
            >
              Explore Syntax ↗
            </button>

            <span className="welcome-note">
              You can explore at your own pace.
            </span>
          </section>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);