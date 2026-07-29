# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A [Slidev](https://sli.dev/) theme forked from `slidev-theme-neversink` (by gureckis), rebranded to **Giornata** for art history courses (e.g. AR1205). Decks consume it via `theme: giornata`. `AGENTS.md` is the source of truth for project context — read it for details not covered here.

## Commands (bun only)

The project uses **bun** (lockfile: `bun.lock`). Do not introduce `packageManager` or `pnpm` deps.

- `bun install` — install deps
- `bun dev` — dev server on `example.md` (uses `theme: ./`)
- `bun build` — build example deck into `docs/public/example` (the `--base` path is hardcoded in `package.json` and must match the docs site URL)
- `bun screenshot` — regenerate `docs/public/screenshots/` from `screenshot.md`; run after any visual change (requires `playwright-chromium`)
- `bun docs:dev` / `bun docs:build` / `bun docs:preview` — VitePress docs site in `docs/`
- `bun release` — bump version via `bumpp` (do NOT edit `version` in `package.json` manually)
- `bun ci:publish` — publish to npm

## Architecture: where the theming actually lives

The theming system is **not** spread across many files — it is concentrated in `uno.config.ts`. Understanding this file is prerequisite to any color or layout work.

### `uno.config.ts` — the heart of the theme

- Uses UnoCSS `presetWind4` (Tailwind v4 engine, with built-in `reset: true` preflight) + `transformerDirectives`, imported from the `unocss` package (v66).
- Colors come from `@unocss/preset-wind4/colors` — these are **oklch** values (Tailwind v4 palette). Do not regress to the hex palette from `@unocss/preset-mini`.
- Per-color schemes are generated from a `schemeHues` table (hue + chroma per color name). Each scheme sets `--giornata-scheme-hue` and derives bg/text/border/etc via `oklch()` formulas. **Lightness targets are CSS vars** (`var(--giornata-l-regular-bg)`, `var(--giornata-l-light-text)`, …) defined in `styles/theme-tokens.css` — overriding them in `html.dark` is how dark mode works (no per-color dark overrides needed). The formulas also read `--giornata-mode-text-offset` / `--giornata-mode-border-offset` / `--giornata-mode-accent-color`. Mode classes (`g-c-mode-mono|complement|analogous|triadic`) in `styles/theme-tokens.css` set those offsets.
- `addScheme(longName, shortName, vars)` is the only sanctioned way to define a color scheme. Each call emits two classes (e.g. `giornata-red-scheme` and `g-c-re-scheme`) that set the `--giornata-*` CSS variables. Always add schemes via `addScheme()` — never hand-write scheme CSS.
- A `safelist` enumerates every prefix/shade combination (`fill-`, `fg-`, `bg-`, `text-`, `color-`, `border-` × Tailwind color × 50–900) plus column/row spans, text sizes, scheme classes, and the four `g-c-mode-*` classes — needed because UnoCSS only emits classes it can statically find, and Slidev decks author classes via frontmatter/props at runtime.
- **wind4 theme-key names differ from wind3** (`fontFamily` → `font`, `borderRadius` → `radius`, …). Check the [wind4 theme table](https://unocss.dev/presets/wind4#theme) before adding `theme:` overrides here.

### CSS variable contract

Every scheme sets these vars (see `docs/colors.md`):

```
--giornata-scheme-hue         (per-color schemes only — the hue the scheme is built from)
--giornata-bg-color
--giornata-bg-code-color
--giornata-fg-code-color
--giornata-fg-color
--giornata-text-color
--giornata-border-color
--giornata-highlight-color
--giornata-admon-bg-color
--giornata-admon-border-color
--giornata-admon-text-color
```

Plus the mode-driven offset vars (set by `g-c-mode-*` classes in `styles/theme-tokens.css`):

```
--giornata-mode-text-offset       (0 in mono, 180 in complement, 0 elsewhere)
--giornata-mode-border-offset     (0 in mono, 180/30/120 in complement/analogous/triadic)
--giornata-mode-accent-color      (the global accent in mono, hue-rotated in other modes)
```

Components and layouts consume the scheme vars; they never read scheme names directly. Adding a new consumer-visible knob means extending every `addScheme()` call.

### Layouts (`layouts/*.vue`)

Each layout accepts a `color` prop and maps it to a `{name}-{color}-scheme` class. Layouts must not hardcode colors — they pull from the CSS vars.

### Styles (`styles/`)

- `base.css` — default font stack + global `.slidev-layout` styling. Sets `@apply giornata-white-scheme` on `:root` as the deck-wide default.
- `giornata-c.css` — `g-c-*` convenience utilities (alignment, margins, fader, cite, etc.).
- `index.ts` — entry point; import order matters (theme-tokens → layouts → bubbles/stickynote → base → colors → giornata-c → dark-mode). `theme-tokens.css` must load first so its L-target vars exist before any scheme formula reads them.
- `theme-tokens.css` — brand palette (accent hue, relational palette, tint/shade scale, mode classes) **and** the L-target vars that per-color schemes read. `:root` holds light-mode defaults; `html.dark` overrides them in `dark-mode.css`.
- `colors.css` — tiny shim that pulls the `navy` palette forward as plain CSS classes (`bg-navy-900`, etc.). Navy is the one non-Tailwind color, defined inline in `uno.config.ts`.
- `dark-mode.css` — small file: (1) the `html.dark` L-target overrides that retune every per-color scheme at once, (2) explicit dark variants for the neutral base schemes (black/white/dark/light/navy) which don't use the L-var formulas because they have no hue. Per-color schemes (red, blue, …) do **not** appear here — their dark variants come from the same OKLCH formulas as light mode, just with different L targets.

### `layoutHelper.ts` — public API

Helpers (`compute_alignment`, `compute_column_size`, `compute_margin_class`, `handleBackground`, `resolveAssetUrl`, `compute_color_scheme`, `compute_color_mode`) are imported by the layouts **and** by external decks via `slidev-theme-giornata/layoutHelper`. Keep exports stable — breaking these breaks consumer decks.

`compute_color_scheme(color, colorMode?)` returns the scheme class string — used by every layout and the three color-aware components (`Admonition`, `StickyNote`, `Box`). `four-cell.vue` does NOT use it (special case: builds Tailwind utility classes from a 4-part color string).

### Components (`components/`)

Auto-imported in decks (StickyNote, Admonition, Toc, SpeechBubble, …). `components/vue3-kawaii/` is **vendored** — do not reformat or rewrite it.

### Global chrome (`global-top.vue`)

Mounted automatically on every slide by Slidev. Renders one persistent widget:

- **`SessionChrome`** — small corner chip reading `WEEK <n> · <DAY> · <DATE>`. Walks back from current slide to find nearest preceding `session:` frontmatter block; inherits forward until the next cover slide resets it.

Honors `session_placement` frontmatter (`tr`/`tl`/`br`/`bl`/`false`, default `br`). Per-slide wins; deck-level headmatter falls back; hardcoded default is the last resort. See `docs/navigation.md`.

The previous `TimelineSpine` persistent widget was removed — it competed with content. The chronological axis is now an explicit **`timeline` layout** (`layouts/timeline.vue`) that aggregates `timeline:` frontmatter across the deck into a snake-path overview. Invoke it on any slide where you want the overview to appear.

**Artwork morph** — when a deck sets `transition: view-transition` (Slidev's opt-in for the View Transitions API), `global-top.vue` reads each slide's `timeline.id` and stamps `view-transition-name: artwork-<id>` on the destination slide's first `figure img` (or first `.slidev-layout img`). The timeline layout sets the same name on its thumbnails. The browser matches them across the slide change, producing a morph. An explicit `data-morph-id="..."` attribute (via markdown-it-attrs) overrides the auto-derivation when the author wants to bind a morph to a non-default element. See `docs/navigation.md` → "Artwork morph".

To add more persistent chrome (e.g., brand watermark, progress indicator), extend `global-top.vue` — don't create additional global layer files without checking Slidev's auto-discovery rules.

### Frontmatter keys (public API)

- `giornata_slug`, `giornata_string` — read by `slide-bottom.vue`.
- `session` (object: `{week, day?, date?, label?}`) — set on a lecture cover; `SessionChrome` inherits it forward until the next cover.
- `timeline` (object: `{year, label, region?, image?, image_fit?, color?, id?}`) — labels a slide as belonging to the chronological axis. Dormant on the artwork slide itself; the `timeline` layout reads it across the deck to build the overview. `id` doubles as the morph-pairing key when the deck sets `transition: view-transition`. `image_fit` accepts `cover` (default, with `object-position: center`), `contain`, `fill`, `scale-down`, `none`.
- `session_placement` — corner placement of the session chip (`tr`/`tl`/`br`/`bl`/`false`); per-slide wins, deck-level falls back, hardcoded default last.

Renaming any of these breaks old decks (accepted — clean break, no compat aliases).

## Conventions

- Long/short class names must stay in sync — both are emitted by `addScheme()`; do not write one without the other.
- Public API changes (layouts, components, schemes, frontmatter keys, `layoutHelper.ts` exports) ⇒ update VitePress docs in `docs/` and regenerate screenshots (`bun screenshot`).
- Markdown decks are formatted with Prettier + `prettier-plugin-slidev` (config in `.prettierrc`).
- Reference consumer: `~/Documents/work_station/2026-nwp-AR1205/packages/slides` (previous-year decks, used to validate theme changes).

## Pitfalls

- Renaming CSS vars, scheme classes, or frontmatter keys breaks old decks until they migrate. This is accepted — no compat aliases.
- wind4 theme-key names differ from wind3 — see link above.
- `bun build`'s `--base` path is hardcoded; if the docs site URL changes, update `package.json`.
- Brand customization is partially done: the accent is now driven by `--giornata-hue` (OKLCH token in `styles/theme-tokens.css`) and consumed everywhere via `var(--giornata-accent)`. Per-color schemes are derived from a `schemeHues` table in `uno.config.ts` and retunable end-to-end via the `color_mode` frontmatter / component prop (mono / complement / analogous / triadic). Dark mode is fully wired: the same scheme formulas run in both modes, only the L-target CSS vars differ (`html.dark` overrides them in `dark-mode.css`), so `color_mode` works identically in light and dark. Still pending: picking a final accent hue (defaults to match legacy `#FFA500`), default font customization (Inter / Fira Code in `styles/base.css`), and `four-cell.vue` mode support.

## Git / release

- Main branch is `main`. PRs target `main`.
- `bun release` (bumpp) handles version bumps; `bun ci:publish` publishes to npm.
- Don't skip hooks or use `--no-verify`.
