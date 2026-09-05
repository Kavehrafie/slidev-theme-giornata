# Navigation Chrome

For lecture and survey-course decks, Giornata splits navigation into two complementary lenses:

- **`<SessionChrome />`** — a one-line chip showing `[deckLabel ·] W2 · WED · JAN 14 · 12/45`, inherited from the current lecture's cover slide. Background and text colors track the slide's `color:` scheme (`bg-{color}-100 text-{color}-500` resolution), so the chip visibly matches the slide palette. Mounted automatically on every slide via `global-top.vue`.
- **`timeline` layout** — a full-slide horizontal "snake" path that aggregates every artwork slide carrying `timeline:` frontmatter into one chronological overview. Click to advance through events; the active event's color can retune the slide palette. Invoke explicitly with `layout: timeline` on any slide where you want the overview to appear.

The two are decoupled: session chrome is always present (per-slide placatable), the timeline layout only appears where you ask for it. The `timeline:` frontmatter on individual artwork slides is just metadata — it stays dormant until the timeline layout reads it.

## Session metadata

Set once on each lecture's cover slide. Subsequent slides inherit automatically.

```yaml
---
layout: cover
session:
  week: 2
  day: Wed
  date: 'Jan 14'
level: 1
---
# Sacred Realism and the Self
```

The session chrome walks **back** from the current slide to find the nearest preceding slide with a `session:` block. That slide's metadata drives the chrome on every slide that follows it, until the next lecture cover resets the context.

| Field   | Required    | Type    | Notes                                                                        |
| ------- | ----------- | ------- | ---------------------------------------------------------------------------- |
| `week`  | recommended | integer | Renders as `WEEK <n>` with a large numeric                                   |
| `day`   | optional    | string  | Free-form; rendered uppercase (`Mon`, `Wed`, `Fri`)                          |
| `date`  | optional    | string  | Free-form; rendered uppercase (`Jan 14`)                                     |
| `label` | optional    | string  | Free-form override; if set, replaces the composed `WEEK · DAY · DATE` string |

The page counter (`currentPage / total`) is always rendered at the bottom of the stack, with or without session metadata. The deck-wide label (legacy `giornata_slug`) renders as a small caps line above the session info when set.

### Session placement

| Key                 | Default | Values                          | Effect                                |
| ------------------- | ------- | ------------------------------- | ------------------------------------- |
| `session_placement` | `br`    | `tr`, `tl`, `br`, `bl`, `false` | Corner of session chip; `false` hides |

Per-slide frontmatter wins; deck-level headmatter falls back; the hardcoded default is the last resort.

```yaml
---
layout: full
session_placement: false # hide chrome on this full-bleed slide
---
```

## Timeline metadata

Per-slide, on any slide that discusses a dated work. Single object form only — comparison slides should not declare a timeline (one artwork per slide on the axis keeps the navigation model clean).

```yaml
---
layout: full
timeline:
  year: 996
  label: "Al-Hakim Mosque"
  region: "Cairo"
  id: al-hakim
  image: https://smarthistory.org/wp-content/uploads/2026/03/Al-Hakim-both-minarets.jpg
  image_fit: cover
---

![Al-Hakim minarets](https://smarthistory.org/wp-content/uploads/2026/03/Al-Hakim-both-minarets.jpg)
```

| Field       | Required | Type                                                     | Notes                                                                                                                                                                       |
| ----------- | -------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `year`      | yes      | integer                                                  | Negative for BCE (`year: -1200`); positions the event along the snake.                                                                                                      |
| `label`     | yes      | string                                                   | Shown under the event card.                                                                                                                                                 |
| `region`    | no       | string                                                   | Optional context, shown italicized under the label.                                                                                                                         |
| `image`     | no       | url                                                      | Thumbnail shown above the year/label.                                                                                                                                       |
| `image_fit` | no       | `cover` \| `contain` \| `fill` \| `scale-down` \| `none` | How the thumbnail crops its image. Defaults to `cover` with `object-position: center`. Use `contain` for full artworks that shouldn't crop.                                 |
| `color`     | no       | scheme name                                              | If set, the timeline slide retunes its palette when this event is the active click.                                                                                         |
| `id`        | no       | string                                                   | Stable ID; defaults to `slide-<n>`. **Set this explicitly** if you want the artwork to morph to/from its timeline thumbnail — the morph matches names derived from this id. |

The frontmatter is dormant on the artwork slide itself — it just labels the slide as belonging to the chronological axis. The visual timeline only appears when you add a slide with `layout: timeline`.

## Timeline layout

Add a slide with `layout: timeline` anywhere you want to show the chronological overview. The layout walks every slide in the deck, collects `timeline:` blocks, sorts by `year`, and renders them as a horizontal snake — events alternate above and below a center line.

```yaml
---
layout: timeline
color: navy-light
title: Lecture timeline
---
#### Cross-Currents in Islamic Art — 800 years at a glance

Click to advance through the timeline.
```

Behavior:

- **Click-driven reveal** — the first event is always visible; each click fades/slides in the next event in chronological order. Unrevealed events stay dimmed so the spine structure remains visible.
- **Auto-scroll** — when a new event is revealed, the rail smooth-scrolls (eased, with scroll-snap) to bring it into the left ~45% of the viewport. The rail only overflows once there are more events than fit the slide, so short timelines simply stay put.
- **Click a marker** — jumps to that event's source slide.
- **Optional per-event color** — if a `timeline:` block sets `color: sky`, the timeline slide's palette retunes when that event is the active click.
- **Explicit events override** — pass `:events="[{year, label, ...}, ...]"` as a prop on the layout slide to bypass the auto-aggregation (useful for one-off timelines not tied to artwork slides).

The layout's default slot (any markdown content above the rail) renders as an absolutely-positioned header in the top-left of the slide.

## Artwork morph (view transitions)

Slides whose `timeline:` block sets an `id` participate in a cross-slide morph: clicking that event's thumbnail on the timeline slide smoothly resizes/repositions the thumbnail into the artwork image on the destination slide (and back). Built on the browser's [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

**Enable once at deck level** by setting `transition: view-transition` in your headmatter — Slidev only invokes `document.startViewTransition()` when this is set (per-slide or deck-wide). Without it, navigation falls back to a plain slide swap and the morph pairs silently no-op.

```yaml
---
transition: view-transition
theme: ./
---
```

How the morph picks its pair:

- The timeline thumbnail gets `view-transition-name: artwork-<id>` from the `timeline.id` field (or `slide-<n>` if you don't set one).
- The destination slide's first `figure img` (or first `img` inside `.slidev-layout`) gets the same name, applied by `global-top.vue` after each navigation.

If you want a different image on the destination slide to be the morph target (or none of the above selectors fit your layout), tag the element explicitly with a `data-morph-id` attribute:

```markdown
![Al-Hakim](https://.../Al-Hakim.jpg){data-morph-id="al-hakim"}
```

This requires `markdown-it-attrs` in your Slidev project config. The theme's own `example.md` includes it — see `vite.config.ts` for the setup. If you don't add `markdown-it-attrs`, use raw HTML instead:

```html
<img src="https://.../Al-Hakim.jpg" alt="Al-Hakim" data-morph-id="al-hakim" />
```

When `data-morph-id` is present on any element on the destination slide, the auto-derivation is skipped and only the explicit matches are used. This lets you bind a morph to a `<div>` with a background image, an inline `<img>` in a custom component, or any other element.

If your markdown pipeline strips `{...}` image attributes (comark does), use the [`<Morph>` component](/components/morph) instead — it takes the id as a prop and renders the same morph-paired figure.

## Compatibility with TOC

Slidev's built-in `<Toc />` and `level:` hierarchy continue to work unchanged. The three navigational lenses are orthogonal:

- **TOC** — conceptual hierarchy (lecture title → sub-topics), driven by `level:`.
- **Session chrome** — "what week/day is this?", driven by the nearest preceding `session:` block.
- **Timeline layout** — "when in history is this?", driven by per-slide `timeline:` blocks, summoned on slides where you want the overview.

## What v1 does NOT do

- **No persistent spine on every slide.** The v0 `TimelineSpine` component (a horizontal axis pinned to every slide) was removed — it competed with content for attention. The timeline is now an explicit overview slide instead.
- **No morph customization.** The morph duration and easing use the browser defaults. If you want to tune them, target the `::view-transition-group(artwork-*)` pseudos in your own CSS (per the View Transitions API spec).
