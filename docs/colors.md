# Color Schemes

Each per-color scheme is powered by an OKLCH hue + chroma pair. In Slidev light mode
the scheme renders with a light tinted background and dark text; toggle dark mode and
the same scheme inverts to a dark saturated background with light text. No separate
`-light` variants needed — the polarity is driven by the Slidev dark/light toggle.

Schemes can be applied to slide [layouts](/layouts) via `color:` frontmatter and to
[components](/components) via the `color` prop.

## B&amp;W / Base Schemes

Hand-tuned neutral schemes (not hue-derived):

<div class="text-white bg-black pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">black</div>
<div class="text-black bg-white border-1 border-solid border-black pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">white</div>
<div class="text-gray-100 bg-gray-800 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">dark</div>
<div class="text-gray-800 bg-gray-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">light</div>
<div class="text-gray-300 bg-navy-900 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">navy</div>
<div class="bg-gray-50 text-navy-900 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">navy-light</div>

## Per-color Schemes

Each color has one scheme. The appearance adapts to the Slidev mode:

<div class="bg-red-500 text-red-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">red</div>
<div class="bg-orange-500 text-orange-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded  font-size-6 fw-700">orange</div>
<div class="bg-amber-500 text-amber-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">amber</div>
<div class="bg-yellow-500 text-yellow-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">yellow</div>
<div class="bg-lime-500 text-lime-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">lime</div>
<div class="bg-green-500 text-green-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">green</div>
<div class="bg-emerald-500 text-emerald-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">emerald</div>
<div class="bg-teal-500 text-teal-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">teal</div>
<div class="bg-cyan-500 text-cyan-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">cyan</div>
<div class="bg-sky-500 text-sky-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">sky</div>
<div class="bg-blue-500 text-blue-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">blue</div>
<div class="bg-indigo-500 text-indigo-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">indigo</div>
<div class="bg-violet-500 text-violet-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">violet</div>
<div class="bg-purple-500 text-purple-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">purple</div>
<div class="bg-pink-500 text-pink-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">pink</div>
<div class="bg-rose-500 text-rose-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">rose</div>
<div class="bg-fuchsia-500 text-fuchsia-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">fuchsia</div>
<div class="bg-slate-500 text-slate-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">slate</div>
<div class="bg-gray-500 text-gray-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">gray</div>
<div class="bg-zinc-500 text-zinc-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">zinc</div>
<div class="bg-neutral-500 text-neutral-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">neutral</div>
<div class="bg-stone-500 text-stone-100 pt-3 pb-3 pl-3 pr-3 m-1 rounded font-size-6 fw-700">stone</div>

## Applying Schemes

Each scheme sets the following CSS vars:

```css
--giornata-bg-color
--giornata-bg-code-color
--giornata-fg-code-color
--giornata-fg-color
--giornata-text-color
--giornata-border-color
--giornata-highlight-color
```

which contains values for these options which might go well together in a monochromatic scheme.

To apply the theme to a element you simply add the `giornata-{name}-scheme` class to the element and then add another class which binds the CSS vars as you like.

There is one built-in one called `.g-c-bind-scheme` which applies the color to the background, text, and border of the element. It's definition looks like this:

```css
.g-c-bind-scheme {
  background-color: var(--giornata-bg-color);
  color: var(--giornata-text-color);
  border-color: var(--giornata-border-color);
}
```

For example, to apply the `red` scheme from above to a `div` element you would add the following classes:

```html
<div class="giornata-red-scheme g-c-bind-scheme">This is a red div</div>
```

You can also define you own custom binding classes if you want to map the colors from the theme in a different way. For example, you could define a class like this:

```css
.my-bind-scheme {
  background-color: var(--giornata-text-color);
}
```

This provides you flexibility in how you decided to bind elements of the color scheme to your elements.

## Customizing the accent

Every scheme's `--giornata-highlight-color` (and the highlight color in dark mode) is driven by a single OKLCH token. Override one variable and the whole brand palette retunes:

```css
:root {
  --giornata-hue: 220; /* any hue 0–360 */
}
```

That's it — the accent becomes a coherent blue, and every relational color below also shifts. The accent is defined in `styles/theme-tokens.css` as:

```css
--giornata-accent: oklch(var(--giornata-accent-l) var(--giornata-accent-c) var(--giornata-hue));
```

so you can also dial lightness and chroma separately:

```css
:root {
  --giornata-hue: 220;
  --giornata-accent-l: 0.7; /* darker */
  --giornata-accent-c: 0.12; /* more muted */
}
```

### The relational palette

Five OKLCH hue rotations of the accent are precomputed via CSS relative color syntax and available as CSS vars on `:root`. Use them anywhere a single accent isn't enough — secondary buttons, chart series, callout boxes, hover states.

| Token                              | Hue offset | Use                                    |
| ---------------------------------- | ---------- | -------------------------------------- |
| `--giornata-accent-complement`     | +180°      | Maximum contrast against the accent    |
| `--giornata-accent-analogous-warm` | −30°       | Sidekick color that reads as a sibling |
| `--giornata-accent-analogous-cool` | +30°       | Other side of the wheel — sibling      |
| `--giornata-accent-triadic-1`      | +120°      | Triad leg 1                            |
| `--giornata-accent-triadic-2`      | +240°      | Triad leg 2                            |

```html
<button style="background: var(--giornata-accent); color: white;">Primary</button>
<button style="background: var(--giornata-accent-complement); color: white;">Secondary</button>
```

### Accent tints and shades

A ten-step scale (`--giornata-accent-50` through `--giornata-accent-900`) is also derived from the master hue, with chroma eased toward the extremes so the lightest tints stay readable and the darkest shades don't muddy. Use these for backgrounds, borders, and hover states:

```css
.callout {
  background: var(--giornata-accent-50);
  border: 1px solid var(--giornata-accent-200);
  color: var(--giornata-accent-900);
}
.callout:hover {
  background: var(--giornata-accent-100);
}
```

### How this interacts with schemes

Schemes (like `giornata-red-scheme`) set their own `--giornata-bg-color`, `--giornata-text-color`, etc. The accent layer is orthogonal — `--giornata-accent` is the same color across every scheme, which means highlights and accents stay on-brand regardless of which scheme a slide uses.

### Browser support

The relational palette uses CSS relative color syntax (`oklch(from var(--x) ...)`), which is [Baseline 2023](https://caniuse.com/css-relative-colors) and supported in Playwright Chromium ≥123 (what Slidev uses for PDF export). If you're targeting an older browser, the accent token itself still works — only the derived rotations fall back to nothing.

## Color modes

Every scheme can be retuned by an optional `color-mode` parameter. The scheme's base hue stays the same; what changes is how text, border, and accent hues relate to that base.

| Mode             | text hue offset | border/accent hue offset   | Use               |
| ---------------- | --------------- | -------------------------- | ----------------- |
| `mono` (default) | 0°              | 0° (accent = global brand) | Maximum cohesion  |
| `complement`     | 180°            | 180°                       | Maximum contrast  |
| `analogous`      | 0°              | +30°                       | Soft sibling feel |
| `triadic`        | 0°              | +120°                      | Three-color pop   |

In mono mode the highlight color is the global `--giornata-accent` (your brand color). In every other mode the highlight rotates with the scheme's hue, so the relational system is active end-to-end.

### On slides

Add `color-mode` to a slide's frontmatter:

```md
---
layout: top-title
color: red
color-mode: complement
---
```

### On components

Pass `color-mode` as a prop — same four values:

```vue
<Admonition color="amber" color-mode="triadic" title="Heads up">
  This admonition uses the triadic accent rotation.
</Admonition>

<StickyNote color="sky" color-mode="analogous">
  Subtle sibling-color sticky.
</StickyNote>
```

### Direct class usage

You can also apply a mode class directly to any element that already has a scheme class — useful inside HTML blocks where you can't set frontmatter:

```html
<div class="giornata-emerald-scheme g-c-mode-triadic g-c-bind-scheme">
  This div uses emerald's base hue with a triadic accent rotation.
</div>
```

The four mode classes are `g-c-mode-mono`, `g-c-mode-complement`, `g-c-mode-analogous`, `g-c-mode-triadic`.
