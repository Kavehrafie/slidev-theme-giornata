# MapFigure

A themed reference map for art-history slides — empire borders, site locations, regions. Renders as crisp, themed SVG so it looks identical on screen and in PDF/PNG exports (no raster canvas, so it never blurs under Slidev's slide scaling). Pan (drag), zoom (wheel), and reset (double-click) are built in.

Colors come from the `--giornata-*` scheme vars exactly like StickyNote/Admonition, so [dark mode](/dark-mode) and [color modes](/colors#color-modes) work for free. A public-domain [Natural Earth](https://www.naturalearthdata.com) land basemap is bundled, so `<MapFigure>` shows real geography with zero setup.

## Props

- `features` (optional) — a GeoJSON `FeatureCollection`. Per-feature properties:
  - `label` — name; rendered below the marker (points) or at the centroid (regions).
  - `date` — free-form string such as `"117 CE"`; rendered under the label.
  - Polygons/multipolygons draw as filled regions, lines as strokes, points as markers.
- `bounds` (optional) — `[[swLng, swLat], [neLng, neLat]]`. Defaults to the bounds of `features`.
- `color` (optional) — any [color scheme](/colors). Default `white`.
- `colorMode` (optional) — one of `mono`, `complement`, `analogous`, `triadic`.
- `height` (optional) — CSS height. Default `100%`.
- `basemap` (optional) — replace the bundled land basemap with your own `FeatureCollection`, or `:basemap="null"` to disable.
- `interactive` (optional) — enable pan/zoom/reset. Default `true`.
- `labelScale` (optional) — multiplier for label font sizes. Default `1`.

Labels and markers are sized in constant screen pixels (not viewBox units), so they stay readable no matter how tall the map box is, and the label/date spacing scales with the font.
- `labelStroke` (optional) — label halo width as a fraction of font size. `0` disables. Default `0.18`.
- `pointScale` (optional) — multiplier for point-marker size. Default `1`.
- `regionOpacity` (optional) — fill opacity of polygon regions, 0–1. Default `0.35`.

## Examples

```vue
<MapFigure
  :features="empire"
  :bounds="[[-10, 29], [45, 56]]"
  color="white"
  :height="420"
  :region-opacity="0.4"
/>
```

```vue
<MapFigure
  :features="italy"
  :bounds="[[6.5, 36.5], [18.5, 46.8]]"
  color="white"
  :height="420"
  label-scale="1.15"
  label-stroke="0.22"
/>
```

Pass the GeoJSON from a `<script setup>` block in the slide — see `example.md` for a working slide.
