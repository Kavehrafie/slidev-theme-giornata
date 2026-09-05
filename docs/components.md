# Components

Components are add-ons to the theme that can be used to add additional features to your slides. In some cases, they represent simple design elements like StickyNotes that can be added to slides. In other cases they add animations or interactivity to your slides.

The current components are:

- [Admonitions](/components/admonitions) - boxes that can be used to highlight text that includes styling like a title and icon.

- [SpeechBubble](/components/speechbubble) - a speech bubble with configurable position, shape, and color.

- [StickyNote](/components/stickynote) - a sticky note styled element that can be added to slides.

- [CreditScroll](/components/creditscroll) - a scrolling credits slide simliar to the end of a movive.

- [QRCode](/components/qrcode) - a QR code generator that can be used to add QR codes to slides.

- [Kawaii](/components/kawaii) - Modification of select [Vue Kawaii](https://github.com/youngtailors/vue-kawaii) figures that add cute characters to slides.

- [Email](/components/email) - formats email addresses

- [ArrowDraw](/components/arrowdraw) - draws a hand-drawn looking arrow

- [ArrowHeads](/components/arrowheads) - draws a bunch of arrows pointing at a central place. Useful for drawing attention to a particular part of a slide.

- [Thumb](/components/thumb) - draws a hand with thumb up or down. Useful for signaling agreement or disagreement.

- [Line](/components/line) - draws a straight line (no arrowheads)

- [VDragLine](/components/vdragline) - draws a straight line (no arrowheads), the v-drag version.

- [Box](/components/box) - draws a box or rectangle shape

- [Quote / QuoteFence](/components/quote) - literary/theory quotations with click-through accent reveals.

- [MapFigure](/components/mapfigure) - a themed, interactive reference map (GeoJSON features on a Natural Earth basemap).

- [Morph](/components/morph) - pairs two images across slides for a view-transition morph.

- [NWPLogo](/components/nwplogo) - the NWP wordmark as inline SVG.

Most component can just be included in-line in your markdown. However, in some cases it can make sense to position these components using the `v-drag` directive. For example, the `SpeechBubble` component can be positioned using the `v-drag` directive to place it in a specific location on the slide. This can be useful for creating custom layouts or animations. In that case, it makes sense to keep the component in the [default slot](/layouts#slots) of each layout.

## Color modes

Components that take a `color` prop (`Admonition`, `StickyNote`, `Box`, `SpeechBubble`, `Quote`, `MapFigure`) also accept an optional `color-mode` prop with one of four values: `mono` (default), `complement`, `analogous`, `triadic`. See [Color modes](/colors#color-modes) for what each mode does.

```vue
<Admonition color="amber" color-mode="triadic" title="Note">
  Triadic accent rotation.
</Admonition>
```
