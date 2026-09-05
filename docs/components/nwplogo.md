# NWPLogo

Renders the NWP wordmark as inline SVG — sharp at any size, on screen and in PDF/PNG exports. Text and mark use the NWP brand colors (`#002639` / `#185a7d`) and flip to light-on-dark automatically when the deck is in [dark mode](/dark-mode).

## Props

- `size` (optional) — one of `small` (120px), `medium` (180px, default), or `large` (240px). The SVG scales proportionally.

## Examples

```vue
<NWPLogo />
```

```vue
<NWPLogo size="large" />
```

The logo is a block-level element; position it freely with utility classes or the `v-drag` directive:

```vue
<div class="absolute bottom-10 right-10">
  <NWPLogo size="small" />
</div>
```
