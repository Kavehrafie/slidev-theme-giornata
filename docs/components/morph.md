# Morph

Pairs two images on different slides so the browser morphs one into the other during slide navigation — the same [artwork morph](/navigation#artwork-morph-view-transitions) the `timeline` layout uses, but available on any slide and for any image.

The component renders a themed `<figure>` whose `<img>` carries an explicit `data-morph-id` plus the matching `view-transition-name`, so it pairs with the thumbnail of the timeline event that shares the same `id` (or with another `<Morph>` using the same `id`).

It exists because some markdown pipelines (e.g. comark) drop `{data-morph-id="..."}` attributes from markdown images — a component takes the props reliably.

## Requires deck-level opt-in

Morphing only happens when the deck sets `transition: view-transition` in its headmatter. Without it, the component renders a normal figure and the pairing silently no-ops.

```yaml
---
transition: view-transition
---
```

## Props

- `id` (required) — the morph pairing key. Must match the `timeline.id` of the event you want to pair with (or the `id` on another `<Morph>`). Must be unique within a slide.
- `src` (required) — image URL.
- `alt` (optional) — alt text; also rendered as the figure caption (`figcaption`) below the image.

## Examples

Pair an artwork slide with its timeline thumbnail:

```vue
---
layout: default
timeline:
  year: 1854
  label: The Meeting
  id: bonjour-courbet
---

<Morph
  id="bonjour-courbet"
  src="https://.../the-meeting.jpg"
  alt="Courbet, The Meeting, 1854"
/>
```

Clicking the event's thumbnail on the [timeline](/navigation#timeline-layout) slide now grows it into this image; navigating back shrinks it into the thumbnail again.

You can also morph between two plain slides — put a `<Morph>` with the same `id` on each; the images morph into one another across the slide change.
