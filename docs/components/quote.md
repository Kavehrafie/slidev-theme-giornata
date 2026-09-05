# Quote / QuoteFence

Two ways to put quotations on a slide sharing one engine: the `<Quote>` component for any slide, and the ` ```quote ` code fence for the quotation-as-code-block look. Both support click-through emphasis, `==marked==` persistent emphasis, and a styled attribution line.

## `<Quote>` component

Renders a themed blockquote figure inline in any layout. The quote text (default slot) is markdown; `%%` marks chunk boundaries — one chunk per click. The whole quote is visible from the start and reads as one continuous line; each click brings the next chunk to full contrast while the rest of the quote dims, so the focused phrase separates from both the background and the surrounding text.

```vue
<Quote
  color="emerald"
  author="John Berger"
  work="Ways of Seeing"
  year="1972"
  quote-size="text-2xl"
>
  Seeing comes before words. %% The child looks %% and recognizes ==before it can speak==.
</Quote>
```

### Props

- `color` (optional) — any [color scheme](/colors). Default `light`.
- `colorMode` (optional) — one of `mono`, `complement`, `analogous`, `triadic`. See [Color modes](/colors#color-modes).
- `author` (optional) — author name, rendered italic in the attribution.
- `work` (optional) — title of the work, rendered italic after the author.
- `year` (optional) — year, rendered after the work.
- `reveal` (optional) — `none` renders a fully static quote with zero added clicks. Any other value (the default) uses the click-through focus model above.
- `quoteSize` (optional) — font size class for the quote. Default `text-xl`.
- `authorSize` (optional) — font size class for the attribution. By default the attribution scales to 75% of the quote size, keeping it visually subordinate across the quote's serif face and the sans attribution face.

### Slots

- default — the quote text. `%%` splits it into click chunks; `==text==` (markdown-it-mark) stays emphasized regardless of clicks.
- `author` — replaces the `author`/`work`/`year` props for a fully custom attribution. The attribution is always visible and never costs a click.

## ` ```quote ` fence

Setup/transformers intercepts ` ```quote ` fences, so quotes can also be authored as code blocks — standard code-block look, EB Garamond italic, plus the same accent wash driven by Slidev's native line-range syntax. Requires `setup/` from the theme (included automatically).

````md
```quote {1|2|3|4}
Even the most perfect reproduction of a work of art
is lacking in one element:
its ==presence in time and space==,
its unique existence at the place where it happens to be.
-- Walter Benjamin, _The Work of Art in the Age of Mechanical Reproduction_, 1935
```
````

- `{1|2|3|4}` — one click per line group; the wash moves group by group.
- A line starting with `--` or `—` is the attribution: the name (first comma segment) is auto-italicized, `_titles_` are italic, the rest stays regular. The attribution is always visible and never costs a click.
- `==text==` is persistent accent emphasis.
- A copy button appears on hover, like Slidev's code blocks.

::: warning
Line ranges use absolute click positions. On slides that also use plain `v-click`s before the fence, number the ranges accordingly.
:::

## See also

- [`layout: quote`](/layouts/quote) — full-slide quotation via frontmatter (no click machinery).
