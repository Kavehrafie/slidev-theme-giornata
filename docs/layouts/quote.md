# `layout: quote`

<img src="/screenshots/26.png" alt="quote slide example" width="600" class="screenshot mb-10 mt-10"/>

## Description

The `layout: quote` is used when you want to provide a full slide quotation for dramatic effect in your presentation. The quote is displayed in a large font size and the author is displayed in a smaller font size. The quote and author are centered vertically on the slide.

## Frontmatter

- `layout: quote` (required).
- `color:` (optional) can be any of the [color scheme](/colors) options. If not provided, the default color is `light`.
- `quotesize:` (optional) the font size class of the quote. Default is `text-4xl`. Valid classes: `text-xs` … `text-xl`, `text-1xl` … `text-10xl`.
- `authorsize:` (optional) the font size class of the attribution. By default the attribution scales to 75% of the quote size, keeping it visually subordinate (the quote's serif face renders smaller than the sans attribution face at equal sizes).
- `author:` (optional) the author of the quote. If not provided, the author will not be displayed.

Example:

```yaml
---
layout: quote
color: sky
quotesize: text-4xl
author: 'John Berger'
---
```

## Slots

The default slot (or the slide body) is the quote text. `%%` marks click-focus chunk boundaries and `==text==` stays emphasized — see the [Quote component](/components/quote). A `:: quote::` named slot takes precedence over the default slot for the quote text, and `:: author::` replaces the composed attribution.

## Examples

### Basic example

```md
---
layout: quote
color: sky
quotesize: text-m
authorsize: text-s
author: 'Todd Gureckis'
---

"This is a quote slide. It has a frontmatter options for the size of the text (`quotesize: text2xl` and `authorsize: text-l`). I feel it is a little uninspired but might save you some time."
```

Renders as:

<img src="/screenshots/26.png" alt="quote slide example" width="600" class="screenshot"/>
