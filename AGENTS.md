# AGENTS.md — slidev-theme-giornata

## Project

- [Slidev](https://sli.dev/) theme forked from `slidev-theme-neversink` (by gureckis), rebranded to **Giornata** and developed for the owner's art history courses (e.g. AR1205).
- Once renamed, decks consume it via `theme: giornata` per Slidev theme convention.
- Reference consumer: `~/Documents/work_station/2026-nwp-AR1205/packages/slides` (previous-year decks, used to validate theme changes; will be migrated to the new API — clean break, no compat aliases).

## Commands (bun only — use `bun install`, `bun run <script>` / `bun <script>`)

- `bun dev` — dev server for `example.md` (theme playground, uses `theme: ./`)
- `bun build` — build example deck into `docs/public/example` (the `--base` path is hardcoded in `package.json` and must match the docs site URL)
- `bun screenshot` — regenerate `docs/public/screenshots/` from `screenshot.md`; run after visual changes (requires `playwright-chromium`)
- `bun docs:dev` / `bun docs:build` / `bun docs:preview` — VitePress docs site in `docs/`
- `bun release` — bump version (bumpp); `bun ci:publish` — publish to npm

## Architecture

- `uno.config.ts` — heart of the theming system. `addScheme(longName, shortName, vars)` generates the color-scheme classes that set all `--giornata-…` CSS variables; every scheme is defined here. Uses UnoCSS `presetWind4` (Tailwind v4 engine, built-in `reset: true` preflight) + `transformerDirectives`, imported from the `unocss` package (v66).
- `layouts/*.vue` — Slidev layouts; each takes a `color` prop mapped to a `{name}-{color}-scheme` class.
- `styles/base.css` — default CSS variables (fonts, colors). `styles/giornata-c.css` — short-prefix `g-c-*` utility classes, imported by `styles/index.ts`.
- `layoutHelper.ts` — **public API**: helpers (`compute_alignment`, `compute_column_size`) imported by the layouts _and_ directly by external decks (`slidev-theme-giornata/layoutHelper`). Keep exports stable.
- `slide-bottom.vue` — bottom bar, reads deck frontmatter key `giornata_slug`.
- `components/` — auto-imported in decks (StickyNote, Admonition, Toc, …). `components/vue3-kawaii/` is vendored — don't reformat/rewrite.
- `setup/` — Slidev setup hooks (`main.ts`, `shiki.ts`). `example.md` / `screenshot.md` — demo decks.
- Docs details: see [docs/layouts.md](docs/layouts.md), [docs/components.md](docs/components.md), [docs/colors.md](docs/colors.md), [docs/styling.md](docs/styling.md).

## Brand naming (Neversink → Giornata — completed)

The rebrand is done; the public API surface is:

- Package `slidev-theme-giornata`; display name "Giornata"; `theme: giornata`
- Scheme classes `giornata-{color}-scheme`
- Short utility classes `g-c-*`
- CSS variables `--giornata-*`
- Frontmatter keys `giornata_slug`, `giornata_string`
- Utility CSS file: `styles/giornata-c.css`
- Repo/docs: https://github.com/Kavehrafie/slidev-theme-giornata, https://Kavehrafie.github.io/slidev-theme-giornata/
- Only intentional `neversink` mentions left: fork attribution in `example.md` line ~31 and `README.md`.

## Conventions

- Keep long/short class names in sync — always add schemes via `addScheme()` in `uno.config.ts`, never hand-write scheme CSS.
- Colors come from `@unocss/preset-wind4/colors` (**oklch** — Tailwind v4 palette). Do NOT revert to hex palette from `@unocss/preset-mini` unless deliberately trading modern color rendering for byte-parity with 2025 decks.
- Public API changes (layouts, components, schemes, frontmatter keys, `layoutHelper.ts` exports) ⇒ update VitePress docs in `docs/` and regenerate screenshots (`bun screenshot`).
- Markdown decks are formatted with Prettier + `prettier-plugin-slidev`.
- Course-deck conventions to stay compatible with (see previous-year package): entry decks `slides.<course>.md`, weekly pages `pages/<course>/w<week><weekday>.md`, hotlinked images (Cloudinary/Wikimedia) captioned via `markdown-it-implicit-figures`, deck-level overrides via `layouts/`, `components/`, `styles/`.

## Pitfalls

- Renaming CSS vars/classes/frontmatter keys breaks old decks until they are migrated (accepted — clean break).
- Don't bump `version` in `package.json` manually; use `bun release`.
- Don't add a `packageManager` field back to `package.json` or re-add the `pnpm` devDependency — the project uses **bun** (lockfile: `bun.lock`).
- wind4 theme-key names differ from wind3 (`fontFamily` → `font`, `borderRadius` → `radius`, …) — check the [wind4 theme table](https://unocss.dev/presets/wind4#theme) before adding `theme:` overrides in `uno.config.ts`.
- Brand customization pending (deferred 2026-07-27): accent color still `#FFA500` hardcoded in every scheme in `uno.config.ts`; fonts still Inter/Fira Code in `styles/base.css`.
