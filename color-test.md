---
colorSchema: both
layout: cover
routerMode: hash
title: Color System Test
theme: ./
transition: view-transition
giornata_string: 'Color Test'
---

# Color System Test

One scheme per color — polarity adapts to Slidev dark/light mode

---

layout: section
color: navy
---

# Design: one scheme per color

No `-light` variants. The same scheme adapts:
light bg in Slidev light mode → dark bg in Slidev dark mode.

<hr>

---

layout: default
---

# All per-color schemes (current Slidev mode)

Each swatch shows the scheme's `bg`, `text`, `border`, and `highlight`.

<div class="grid grid-cols-4 gap-2 mt-4 text-sm">

<div class="giornata-red-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> red
</div>
<div class="giornata-orange-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> orange
</div>
<div class="giornata-amber-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> amber
</div>
<div class="giornata-yellow-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> yellow
</div>
<div class="giornata-lime-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> lime
</div>
<div class="giornata-green-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> green
</div>
<div class="giornata-emerald-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> emerald
</div>
<div class="giornata-teal-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> teal
</div>
<div class="giornata-cyan-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> cyan
</div>
<div class="giornata-sky-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> sky
</div>
<div class="giornata-blue-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> blue
</div>
<div class="giornata-indigo-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> indigo
</div>
<div class="giornata-violet-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> violet
</div>
<div class="giornata-purple-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> purple
</div>
<div class="giornata-fuchsia-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> fuchsia
</div>
<div class="giornata-pink-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> pink
</div>
<div class="giornata-rose-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> rose
</div>
<div class="giornata-slate-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> slate
</div>
<div class="giornata-gray-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> gray
</div>
<div class="giornata-zinc-scheme p-2 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> zinc
</div>

</div>

<div class="mt-4 text-sm opacity-70">
💡 Toggle Slidev dark mode — every swatch inverts its polarity.
</div>

---

layout: default
---

# Base (neutral) schemes

Unaffected by the L-target system — hand-tuned for both modes.

<div class="grid grid-cols-3 gap-2 mt-4 text-sm">

<div class="giornata-white-scheme p-3 rounded border" style="border-color: var(--giornata-border-color)">
  <span style="color: var(--giornata-highlight-color)">■</span> white
</div>
<div class="giornata-black-scheme p-3 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> black
</div>
<div class="giornata-dark-scheme p-3 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> dark
</div>
<div class="giornata-light-scheme p-3 rounded border" style="border-color: var(--giornata-border-color)">
  <span style="color: var(--giornata-highlight-color)">■</span> light
</div>
<div class="giornata-navy-scheme p-3 rounded">
  <span style="color: var(--giornata-highlight-color)">■</span> navy
</div>
<div class="giornata-navy-light-scheme p-3 rounded border" style="border-color: var(--giornata-border-color)">
  <span style="color: var(--giornata-highlight-color)">■</span> navy-light
</div>

</div>

---

layout: default
color: red
color-mode: mono
---

# `red` + `mono`

Default mode. All hues share the red hue. Highlight = brand accent.

<div class="mt-6 p-4 rounded border-2" style="border-color: var(--giornata-border-color); background: var(--giornata-bg-code-color)">
  <span class="font-bold" style="color: var(--giornata-highlight-color)">■ highlight</span>
  &nbsp;|&nbsp;
  <span style="color: var(--giornata-text-color)">text</span>
  &nbsp;|&nbsp;
  <span style="border-bottom: 3px solid var(--giornata-border-color)">border</span>
  &nbsp;|&nbsp;
  <code>bg-code</code>
</div>

---

layout: default
color: red
color-mode: complement
---

# `red` + `complement`

Text/border/accent rotate 180° from scheme hue.

<div class="mt-6 p-4 rounded border-2" style="border-color: var(--giornata-border-color); background: var(--giornata-bg-code-color)">
  <span class="font-bold" style="color: var(--giornata-highlight-color)">■ highlight</span>
  &nbsp;|&nbsp;
  <span style="color: var(--giornata-text-color)">text</span>
  &nbsp;|&nbsp;
  <span style="border-bottom: 3px solid var(--giornata-border-color)">border</span>
  &nbsp;|&nbsp;
  <code>bg-code</code>
</div>

---

layout: default
color: red
color-mode: analogous
---

# `red` + `analogous`

Border/accent shift +30° — warmer sibling.

<div class="mt-6 p-4 rounded border-2" style="border-color: var(--giornata-border-color); background: var(--giornata-bg-code-color)">
  <span class="font-bold" style="color: var(--giornata-highlight-color)">■ highlight</span>
  &nbsp;|&nbsp;
  <span style="color: var(--giornata-text-color)">text</span>
  &nbsp;|&nbsp;
  <span style="border-bottom: 3px solid var(--giornata-border-color)">border</span>
  &nbsp;|&nbsp;
  <code>bg-code</code>
</div>

---

layout: default
color: red
color-mode: triadic
---

# `red` + `triadic`

Border/accent shift +120° — three-color pop.

<div class="mt-6 p-4 rounded border-2" style="border-color: var(--giornata-border-color); background: var(--giornata-bg-code-color)">
  <span class="font-bold" style="color: var(--giornata-highlight-color)">■ highlight</span>
  &nbsp;|&nbsp;
  <span style="color: var(--giornata-text-color)">text</span>
  &nbsp;|&nbsp;
  <span style="border-bottom: 3px solid var(--giornata-border-color)">border</span>
  &nbsp;|&nbsp;
  <code>bg-code</code>
</div>

---

layout: default
---

# Base scheme `white` + hue modes

Base schemes have no scheme-hue — modes rotate from the brand hue (orange, 60.62°).

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">

<div class="g-c-mode-mono giornata-white-scheme p-3 rounded border" style="border-color: var(--giornata-border-color)">
  <strong>mono</strong><br/>
  <span style="color: var(--giornata-highlight-color)">■</span> accent = brand orange
</div>
<div class="g-c-mode-complement giornata-white-scheme p-3 rounded border" style="border-color: var(--giornata-border-color)">
  <strong>complement</strong><br/>
  <span style="color: var(--giornata-highlight-color)">■</span> accent = orange + 180° → blue
</div>
<div class="g-c-mode-analogous giornata-white-scheme p-3 rounded border" style="border-color: var(--giornata-border-color)">
  <strong>analogous</strong><br/>
  <span style="color: var(--giornata-highlight-color)">■</span> accent = orange + 30°
</div>
<div class="g-c-mode-triadic giornata-white-scheme p-3 rounded border" style="border-color: var(--giornata-border-color)">
  <strong>triadic</strong><br/>
  <span style="color: var(--giornata-highlight-color)">■</span> accent = orange + 120°
</div>

</div>

---

layout: default
color: green
---

# `green` scheme — short name `gn`

No collision with gray (`gy`). Both are now unique.

<div class="mt-4 p-4 rounded border-2" style="border-color: var(--giornata-border-color); background: var(--giornata-bg-code-color)">
  <span class="font-bold" style="color: var(--giornata-highlight-color)">■ highlight</span>
  &nbsp;|&nbsp;
  <span style="color: var(--giornata-text-color)">text</span>
  &nbsp;|&nbsp;
  <span style="border-bottom: 3px solid var(--giornata-border-color)">border</span>
</div>

---

layout: default
color: gray
---

# `gray` scheme — short name `gy`

No collision with green (`gn`). Both are now unique.

<div class="mt-4 p-4 rounded border-2" style="border-color: var(--giornata-border-color); background: var(--giornata-bg-code-color)">
  <span class="font-bold" style="color: var(--giornata-highlight-color)">■ highlight</span>
  &nbsp;|&nbsp;
  <span style="color: var(--giornata-text-color)">text</span>
  &nbsp;|&nbsp;
  <span style="border-bottom: 3px solid var(--giornata-border-color)">border</span>
</div>

---

layout: default
---

# Admonition + mode combos

<Admonition type="info" color="amber" color-mode="triadic">
  **amber + triadic** — info admonition
</Admonition>

<Admonition type="warning" color="red" color-mode="complement">
  **red + complement** — warning admonition
</Admonition>

<Admonition type="note" color="emerald" color-mode="analogous">
  **emerald + analogous** — note admonition
</Admonition>

---

layout: default
---

# StickyNote + mode combos

<StickyNote color="pink" textAlign="left" width="180px" v-drag="[122,253,180,180,-14]">
  **pink**<br/>mode: mono (default)
</StickyNote>

<StickyNote color="sky" color-mode="complement" textAlign="left" width="180px" v-drag="[389,251,180,180,9]">
  **sky**<br/>mode: complement
</StickyNote>

<StickyNote color="amber" color-mode="triadic" textAlign="left" width="180px" v-drag="[650,253,180,180,-9]">
  **amber**<br/>mode: triadic
</StickyNote>

---

layout: default
---

# Summary of changes

| Change                     | Before                                                      | After                                                    |
| -------------------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| Schemes per color          | 2 (`red`, `red-light`)                                      | 1 (`red`)                                                |
| Polarity                   | Fixed per variant                                           | Adapts to Slidev dark/light mode                         |
| L-target vars              | `--giornata-l-regular-*` + `--giornata-l-light-*` (10 vars) | `--giornata-l-*` (5 vars)                                |
| Short name collision       | `green`/`gray` both → `gr`                                  | `green`→`gn`, `gray`→`gy`                                |
| Mode accent L/C            | Hardcoded `0.75`/`0.18`                                     | Derives from `--giornata-accent-l`/`--giornata-accent-c` |
| Hue modes on neutral bases | Works (brand-hue rotation)                                  | Unchanged                                                |
