# Branding

## Slide numbers

Giornata provides a simple and color-responsive slide counter in the lower right corner of the slides.
It will show the current slide number and the total number of slides. In addition it can display a slug or
string of your choice.

To configure the slug simply add `giornata_slug` to your frontmatter of your entire slug deck. For example:

```yaml
---
colorSchema: light
layout: cover
title: Base Template
theme: giornata
giornata_slug: 'Giornata Example Deck'
---
```

If this appears in the frontmatter for the first slide the slug will be set for all slides.
You can override it on any specific slide by just adding `giornata_slug` to the frontmatter of that slide.

```yaml
---
layout: cover
color: light
giornata_slug: 'Giornata Example Deck!!!!'
---
```

You can hide the slide information on any given slides by setting `slide_info: false` in the front
matter of that specific slide

```yaml
---
layout: cover
color: light
slide_info: false
---
```

You can of course override the default slide counter by including a custom `slide-bottom.vue` or `global-bottom.vue` in your project folder (see [Slidev docs](https://sli.dev/custom/global-layers))

## Brand accent

The single biggest brand lever is the accent color, which drives highlights and (optionally) every relational color in the theme. Override `--giornata-hue` in your deck's styles — see [Customizing the accent](/colors#customizing-the-accent) in the Colors docs.

```css
/* in your deck's styles */
:root {
  --giornata-hue: 280; /* purple, for example */
}
```
