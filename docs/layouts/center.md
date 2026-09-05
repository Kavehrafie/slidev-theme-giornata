# `layout: center`

<img src="/screenshots/43.png" alt="Center slide example" width="600" class="screenshot mb-10 mt-10"/>

## Description

The `center` layout is a themed override of the [built-in Slidev `center` layout](https://sli.dev/builtin/layouts#center). The content is horizontally and vertically centered on the slide. Unlike the built-in version, it supports the Giornata [color schemes](/colors), [color modes](/colors#color-modes), and [margins](/layouts/default).

## Frontmatter

- `layout: center` (required).
- `color:` (optional) can be any of the [color scheme](/colors) options. If not provided, the default color is `white`.
- `color-mode:` (optional) one of `mono`, `complement`, `analogous`, or `triadic`. If not provided, the default is `mono`.
- `margin:` (optional) one of `normal`, `tight`, `tighter`, or `none`. If not provided, the default is `normal`.

Example:

```yaml
---
layout: center
color: red
color-mode: complement
---
```

## Slots

This layout has no named slots, using only the default slot.

## Examples

### Basic example

```md
---
layout: center
---

# This is the `center` layout

The content of the slide is centered both horizontally
and vertically.
```

Renders as:

<img src="/screenshots/43.png" alt="Center slide example" width="600" class="screenshot"/>
