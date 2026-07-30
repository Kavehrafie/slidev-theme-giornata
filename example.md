---
colorSchema: auto
layout: cover
routerMode: hash
title: Base Template
theme: ./
transition: view-transition
giornata_string: 'Giornata Example Deck'
---

# Giornata

A [Slidev](https://sli.dev) theme designed by **Todd Gureckis**  
_New York University_ <a href="https://todd.gureckislab.org" class="g-c-iconlink"><mdi-open-in-new /></a>

---
layout: side-title
color: amber
align: rm-lm
---

:: title ::

# Slidev Giornata Theme

:: content ::

Giornata is theme for education and academic presentations. It is designed to be bright, flat, minimal, and easy to read. It is based on the default Slidev theme but with some additional features and color schemes that have reference in the [metropolis](https://github.com/matze/mtheme) Beamer theme among others.

It is a fork of the [Neversink](https://github.com/gureckis/slidev-theme-neversink) theme by Todd Gureckis (itself named for the [Neversink River](https://en.wikipedia.org/wiki/Neversink_River)). **Giornata** is named after the fresco-painting term for a day's work.

---
layout: default
---

# Why use it?

- Giornata has several configurable ==layouts== that build upon the Slidev defaults and which make it easier to quickly throw together common slide layouts without having to write a lot of custom CSS/HTML.

- It has a variety of ==color themes== to choose from that make your visual identity more coherent.

- It also has some whimsical elements like movie-style scrolling credits, animated speech bubbles, and admonitions that make your presentations more memorable.

- It strives to be well documented and easy to use!

You can find the source code on [GitHub](https://github.com/Kavehrafie/slidev-theme-giornata).

---
layout: default
---

# How to install

The theme depends on Slidev. So you need to have that [installed first](https://sli.dev/guide/install). Then you can install the theme with npm:

```bash
npm install slidev-theme-giornata
```

Then create a slidev markdown file (e.g., `slides.md`) and add the theme to the frontmatter of your first slide:

```md
---
theme: giornata
---
```

Then you are basically ready to go!

---
layout: default
---

# Color schemes

Let's start with colors.

The project uses tailwind-like color schemes arranged in ==monochromatic pairs==. These boxes show the options and names:

**B&W**:

<div class="leading-[1.5em]">
<span class="text-white bg-black p-1 pl-3 pr-3 m-1 rounded font-size-3">black</span>
<span class="text-black bg-white border-1 border-solid border-black p-1 pl-3 pr-3 m-1 rounded font-size-3">white</span>
<span class="text-gray-100 bg-gray-800 p-1 pl-3 pr-3 m-1 rounded font-size-3">dark</span>
<span class="text-gray-800 bg-gray-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">light</span>

</div>

**Light**:

<div class="leading-[1.5em]">
<span class="bg-slate-100 text-slate-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">slate-light</span>
<span class="bg-gray-100 text-gray-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">gray-light</span>
<span class="bg-zinc-100 text-zinc-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">zinc-light</span>
<span class="bg-neutral-100 text-neutral-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">neutral-light</span>
<span class="bg-stone-100 text-stone-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">stone-light</span>
<span class="bg-red-100 text-red-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">red-light</span>
<span class="bg-orange-100 text-orange-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">orange-light</span>
<span class="bg-amber-100 text-amber-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">amber-light</span>
<span class="bg-yellow-100 text-yellow-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">yellow-light</span><br />
<span class="bg-lime-100 text-lime-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">lime-light</span>
<span class="bg-green-100 text-green-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">green-light</span>
<span class="bg-emerald-100 text-emerald-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">emerald-light</span>
<span class="bg-teal-100 text-teal-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">teal-light</span>
<span class="bg-cyan-100 text-cyan-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">cyan-light</span>
<span class="bg-sky-100 text-sky-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">sky-light</span>
<span class="bg-blue-100 text-blue-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">blue-light</span>
<span class="bg-indigo-100 text-indigo-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">indigo-light</span>
<span class="bg-violet-100 text-violet-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">violet-light</span><br />
<span class="bg-purple-100 text-purple-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">purple-light</span>
<span class="bg-pink-100 text-pink-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">pink-light</span>
<span class="bg-rose-100 text-rose-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">rose-light</span>
<span class="bg-fuchsia-100 text-fuchsia-500 p-1 pl-3 pr-3 m-1 rounded font-size-3">fuchsia-light</span>
<span class="bg-gray-50 text-navy-900 p-1 pl-3 pr-3 m-1 rounded font-size-3">navy-light</span>
</div>

---
layout: default
---

# Color schemes — Regular

<div class="leading-[1.5em]">
<span class="bg-slate-500 text-slate-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">slate</span>
<span class="bg-gray-500 text-gray-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">gray</span>
<span class="bg-zinc-500 text-zinc-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">zinc</span>
<span class="bg-neutral-500 text-neutral-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">neutral</span>
<span class="bg-stone-500 text-stone-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">stone</span>
<span class="bg-red-500 text-red-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">red</span>
<span class="bg-orange-500 text-orange-100 p-1 pl-3 pr-3 m-1 rounded  font-size-3">orange</span>
<span class="bg-amber-500 text-amber-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">amber</span>
<span class="bg-yellow-500 text-yellow-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">yellow</span>
<span class="bg-lime-500 text-lime-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">lime</span>
<span class="bg-green-500 text-green-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">green</span>
<span class="bg-emerald-500 text-emerald-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">emerald</span>
<span class="bg-teal-500 text-teal-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">teal</span>
<span class="bg-cyan-500 text-cyan-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">cyan</span><br/>
<span class="text-gray-300 bg-navy-900 p-1 pl-3 pr-3 m-1 rounded font-size-3">navy</span>
<span class="bg-sky-500 text-sky-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">sky</span>
<span class="bg-blue-500 text-blue-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">blue</span>
<span class="bg-indigo-500 text-indigo-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">indigo</span>
<span class="bg-violet-500 text-violet-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">violet</span>
<span class="bg-purple-500 text-purple-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">purple</span>
<span class="bg-pink-500 text-pink-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">pink</span>
<span class="bg-rose-500 text-rose-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">rose</span>
<span class="bg-fuchsia-500 text-fuchsia-100 p-1 pl-3 pr-3 m-1 rounded font-size-3">fuchsia</span>
</div>

---
layout: default
---

# Color schemes

In many parts of the theme you can use the color schemes to help choose matching colors for your slides. For example, we can make a slide with a sticky note using the `rose-light` color scheme, the `sky` color scheme, or the `amber-light` color scheme:

<StickyNote color="rose-light" textAlign="left" width="180px" v-drag="[122,253,180,180,-14]">

Hello, I'm a **redish sticky note** using `rose-light`.
</StickyNote>

<StickyNote color="sky" textAlign="left" width="180px"  v-drag="[389,251,180,180,9]">

Hello, I'm a **blueish sticky note** using `sky`.
</StickyNote>

<StickyNote color="amber-light" textAlign="left" width="180px"  v-drag="[650,253,180,180,-9]">

Hello, I'm a **yellowish sticky note** using `amber-light`.
</StickyNote>

---
layout: side-title
color: emerald-light
align: rm-lm
titlewidth: is-3
---

<StickyNote color="emerald-light" textAlign="left" width="180px"  v-drag="[719,291,180,180,16]">

Don't worry if you don't understand all the details, yet we are still talking about **color schemes**.
</StickyNote>

:: title ::

# Color schemes

:: content ::

Or we can use the `emerald-light` scheme in a slide layout to set the overall color and style of a slide with a matching sticky note:

```md
---
layout: side-title
color: emerald-light
align: rm-lm
titlewidth: is-3
---
```

---
layout: default
---

# Color modes

Every color scheme now accepts an optional `color-mode` parameter that selects how the scheme's colors relate to each other. The same base color (`red` below) produces four different looks:

```md
---
layout: default
color: red
color-mode: complement # or: mono | analogous | triadic
---
```

| Mode             | Effect                                               |
| ---------------- | ---------------------------------------------------- |
| `mono` (default) | All colors share the scheme's hue; only L and C vary |
| `complement`     | text/border/accent rotate 180° (max contrast)        |
| `analogous`      | border/accent shift +30° (sibling feel)              |
| `triadic`        | border/accent shift +120° (three-color pop)          |

Works the same on components: `<Admonition color="amber" color-mode="triadic">`.

---
layout: default
color: red
color-mode: mono
---

# `mono`

The default. Everything shares the red hue; highlight stays the global brand accent.

<div class="mt-6 p-4 rounded border-2" style="border-color: var(--giornata-border-color); background: var(--giornata-bg-code-color)">
  <span class="font-bold" style="color: var(--giornata-highlight-color)">■ highlight</span>
  &nbsp;|&nbsp;
  <span style="color: var(--giornata-text-color)">text color</span>
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

# `complement`

text/border/accent rotate 180° — red bg, cyan-leaning text and accent.

<div class="mt-6 p-4 rounded border-2" style="border-color: var(--giornata-border-color); background: var(--giornata-bg-code-color)">
  <span class="font-bold" style="color: var(--giornata-highlight-color)">■ highlight</span>
  &nbsp;|&nbsp;
  <span style="color: var(--giornata-text-color)">text color</span>
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

# `analogous`

border/accent shift +30° — a slightly warmer sibling hue.

<div class="mt-6 p-4 rounded border-2" style="border-color: var(--giornata-border-color); background: var(--giornata-bg-code-color)">
  <span class="font-bold" style="color: var(--giornata-highlight-color)">■ highlight</span>
  &nbsp;|&nbsp;
  <span style="color: var(--giornata-text-color)">text color</span>
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

# `triadic`

border/accent shift +120° — a three-color pop against the red base.

<div class="mt-6 p-4 rounded border-2" style="border-color: var(--giornata-border-color); background: var(--giornata-bg-code-color)">
  <span class="font-bold" style="color: var(--giornata-highlight-color)">■ highlight</span>
  &nbsp;|&nbsp;
  <span style="color: var(--giornata-text-color)">text color</span>
  &nbsp;|&nbsp;
  <span style="border-bottom: 3px solid var(--giornata-border-color)">border</span>
  &nbsp;|&nbsp;
  <code>bg-code</code>
</div>

---
layout: top-title
color: amber
align: l
---

:: title ::

# Layouts

:: content ::

The theme includes many layouts. Layouts set the overall structure of the page. For example, this slide is using the `top-title` layout with the `amber` color scheme. You can see the frontmatter for this slide below:

```md
---
layout: top-title
color: amber
align: l
---
```

The previous slide used the `side-title` layout with the `emerald-light` color scheme. You can see the frontmatter for that slide below:

```md
---
layout: side-title
color: emerald-light
align: rm-lm
titlewidth: is-3
---
```

---
layout: top-title-two-cols
color: amber-light
align: l-lt-lt
---

:: title ::

# Two things about layouts

:: left ::

There are two important parts of slides to know about.

## Frontmatter

First is **frontmatter**, which are configuration options
that appear at the start of each slide (see [Slidev docs](https://sli.dev/guide/syntax#frontmatter-layouts)). These configure things like
alignment, color, and spacing:

```md
---
layout: top-title
color: sky
align: l
---
```

:: right ::

# Slots

The other aspect is **slots**. Slots are a basic part of [Vue.js](https://vuejs.org/guide/components/slots.html). In Slidev slots can be marked using `:: slotname ::` and then filled in with content. For example, the `:: left ::` and `:: right ::` slots on this slide are filled with content.

Slots effectively help you map parts of your slide to different parts of a layout. The most common case is to say which content appears in the left column and which appears in the right column. But different layouts can have different slots and different content.

---
layout: top-title
color: amber-light
align: lt
---

:: title ::

# Available Layouts

:: content ::

The available layouts in **Giornata** currently are:

<div class="g-c-tight">

<div class='flex flex-wrap'>

<div class='w-1/3'>

- `cover`
- `intro`
- `default`
- `section`
- `quote`
- `full`
- `credits`

</div>

<div class='w-1/3'>

- `two-cols-title`
- `top-title`
- `top-title-two-cols`
- `side-title`

</div>

<div class='w-1/3'>

- `image-right`
- `image-left`
- `image`
- `iframe-right`
- `iframe-left`
- `iframe`
- `none`
- `end`
- `fact`

</div>
</div>
</div>

We will step through these one by one showing several examples
and how to configure the frontmatter for each.

---
layout: cover
---

# This is the `cover` layout

**Todd Gureckis**  
_New York University_ <a href="https://todd.gureckislab.org" class="g-c-iconlink"><mdi-open-in-new /></a>

:: note ::

<div class="fw-200" >

\* Optional `:: note ::` slot for mentioning ==notes== at the bottom.

</div>

---
layout: cover
color: dark
---

# This is the `cover` layout

**Todd Gureckis**  
_New York University_ <a href="https://todd.gureckislab.org" class="g-c-iconlink"><mdi-open-in-new /></a>

:: note ::

<div class="fw-200" >

\* Here we set `color: dark` in the frontmatter.

</div>

---
layout: cover
color: amber
---

# This is the `cover` layout

**Todd Gureckis**  
_New York University_ <a href="https://todd.gureckislab.org" class="g-c-iconlink"><mdi-open-in-new /></a>

:: note ::

<div class="fw-200">

\* Here we set `color: amber` in the frontmatter.

</div>

---
layout: cover
color: amber-light
---

# This is the `cover` layout

**Todd Gureckis**  
_New York University_ <a href="https://todd.gureckislab.org" class="g-c-iconlink"><mdi-open-in-new /></a>

:: note ::

<div class="fw-200" >

\* Here we set `color: amber-light` in the frontmatter. Notice how the color scheme brings along many of the elements on the page.

</div>

---
layout: cover
color: pink
---

### This is the `cover` layout with a longer title for your talk you just use more `#`s

**Todd Gureckis**  
_New York University_ <a href="https://todd.gureckislab.org" class="g-c-iconlink"><mdi-open-in-new /></a>

:: note ::

<div class="fw-200" >

\* Here we set `color: pink` in the frontmatter. Different choices convey a different vibe for the intro of your talk. There's lots of choices available.

</div>

---
layout: intro
color: emerald-light
---

# This is the `intro` layout

**Todd Gureckis**  
_New York University_ <a href="https://todd.gureckislab.org" class="g-c-iconlink"><mdi-open-in-new /></a>

<br />

This is like the cover slide but with a little less decoration.
It also has a frontmatter option of `color: emerald-light`.

---
layout: default
---

# This is the `default` layout

This is kind of the basic slide. The main content is interpreted as markdown and rendered in the center of the slide.

Speaking of markdown, you can use markdown to make things **bold** or _italic_ or even `code` like `this`. In **Giornata** you can also ==highlight things using the double equals signs like this==
thanks to the `markdown-it-mark` plugin.

Of course you can make bullet lists:

- Hi
- There

Also there's a little helper class `g-c-tight` you can add to make the bullet spacing a bit tighter:

<div class="g-c-tight">

- Hi
- There
- I need space

</div>

---
layout: default
color: sky
---

# The `default` layout

The default layout also has an optional `color` option in the frontmatter.
For example this is

```md
---
layout: default
color: sky
---
```

---
layout: default
color: light
---

# The `default` layout

Things don't have to be so dramatic. For more conservative presentations you can use color schemes like `light`:

```md
---
layout: default
color: light
---
```

And of course you don't have to change the color scheme every slide!

---
layout: section
---

# The `section` layout

This is a section slide. It can be use to make a noticable point or break between sections.

---
layout: section
color: navy
---

# The `section` layout

<hr>
It has a `hr` which is color matched to the color scheme.  For example, this slide is using the `navy` color scheme and the line is white.

---
layout: section
color: indigo
---

# The `section` layout

<hr>

This is `color: indigo` and the line and font is a light indigo shade.

---
layout: section
color: navy
---

<div class="w-2/3 ml-30">

# The `section` layout

<hr>

<span class='text-amber-300'>
You can use HTML and inline CSS to modify the look and feel.
</span>

</div>

---
layout: quote
color: sky-light
quotesize: text-sm
authorsize: text-sm
author: 'Todd Gureckis'
---

"This is a quote slide. It has a frontmatter option of `quote` which is the text that appears in the quote box and `author` and options for the size of the text(`quotesize: text-2xl` and `authorsize: text-l`). I feel it is a little uninspired but might save you some time."

---
layout: full
title: Full Layout
---

<div class='border-1px v-full h-full p-5'>

This is `layout: full` which fills the whole screen for the most part.
The grey box is just showing you the full addressable space.
Full can be useful for arbitrary layouts such as on the next slide which uses
the `v-drag` directive to position elements.

</div>

---
layout: full
title: Full with Arbitrary Layout
---

<div class='v-full h-full'>

<SpeechBubble position="l" shape="round"  color='pink-light' v-drag="[555,342,274,58]">

Hello, I'm an **ice cream**!
</SpeechBubble>

<SpeechBubble position="bl" shape="round"  color='emerald-light' v-drag="[445,258,274,57]">

Hello, I'm **kawaii**.
</SpeechBubble>

<SpeechBubble position="r" shape="round" animation="float"  color='sky' v-drag="[143,391,274,84]">

I'm v-dragged out and ==floating==.
</SpeechBubble>

<IceCream :size="150" mood="lovestruck" color="#FDA7DC" v-drag="[439,341,85,150]" />

<div class="g-c-tight" v-drag="[143,33,277,214]">

<span class="bg-red-100 text-red-600 p-2 border-l-6 border-2 border-red-200 rounded-lg pl-4 pr-4">Here's a list of somethings</span>

- Novelty bonuses
- Cumulative prediction error
- Learning progress
- Surprise
- Suspense
- Information gain

</div>

<div class="g-c-tight" v-drag="[461,63,293,148,17]">

<span class="bg-emerald-100 text-emerald-500 p-2 border-l-6 border-2 border-emerald-200 rounded-lg pl-4 pr-4">Here's another list of things</span>

- Structured behaviors
- Compositional
- Communicable

</div>

</div>

---
layout: full
title: Full Layout - 2 Col Fig
---

This is an example of using unocss atomic classes to put two figures side by side.

<div class="grid w-full h-fit grid-cols-2 grid-rows-2 mt-10 mb-auto">
<div class="grid-item grid-col-span-1"><img src="/images/scatter1.svg" /></div>
<div class="grid-item grid-col-span-1"><img src="/images/scatter1.svg" /></div>
<div class="grid-item grid-col-span-2 text-center h-fit">

**Figure show this**: this is a two column figure

</div>
</div>

---
layout: full
title: Full Layout - 3 Col Fig
---

This is an example of using unocss atomic classes to put three figures side by side.

<div class="grid w-full h-fit grid-cols-3 grid-rows-2 mt-20 mb-auto">
<div class="grid-item grid-col-span-1"><img src="/images/scatter1.svg" /></div>
<div class="grid-item grid-col-span-1"><img src="/images/scatter1.svg" /></div>
<div class="grid-item grid-col-span-1"><img src="/images/scatter1.svg" /></div>
<div class="grid-item grid-col-span-3 text-center h-fit">

**Figure show this**: this is a three column figure

</div>

</div>

---
layout: credits
color: light
---

<div class="grid text-size-4 grid-cols-3 w-3/4 gap-y-10 auto-rows-min ml-auto mr-auto">
<div class="grid-item text-center mr-0- col-span-3">

This is the `layout: credits` slide. It's a movie-like scrolling credits!
</div>
<div class="grid-item text-center mr-0- col-span-3">
  <strong>Cast</strong><br> 
  <span class="font-size-3 mt-0">(In order of appearance)</span>
</div>
<div class="grid-item text-right mr-4 col-span-1"><strong>Study 1</strong></div>
<div class="grid-item col-span-2">Person 1 <i>as PhD student</i>&nbsp;<mdi-open-in-new class="font-size-3 mb-0.5" /><br/>Person 2 <i>as Co-PI</i>&nbsp;<mdi-open-in-new class="font-size-3 mb-0.5" /></div>
<div class="grid-item text-right mr-4 col-span-1"><strong>Study 2</strong></div>
<div class="grid-item col-span-2">Person 3 <i>as Postdoc</i>&nbsp;<mdi-open-in-new class="font-size-3 mb-0.5" /><br/>Person 4 <i>as Co-PI</i>&nbsp;<mdi-open-in-new class="font-size-3 mb-0.5" /></div>
<div class="grid-item text-right mr-4 col-span-1"><strong>Experiments</strong></div>
<div class="grid-item col-span-2">Smile 🫠</div>
<div class="grid-item text-right mr-4 col-span-1"><strong>Funding</strong></div>
<div class="grid-item col-span-2">National Science Foundation<br/>
National Institute of Health</div>
<div class="grid-item text-right mr-4 col-span-1"><strong>Slides</strong></div>
<div class="grid-item col-span-2">
Slidev<br/>
Unocss<br/>
Figma<br/>
Vuejs<br/>
Vite<br/>
</div>
<div class="grid-item col-span-3 text-center mt-180px mb-auto font-size-1.5rem"><strong>Questions?</strong></div>
</div>

---
layout: credits
color: navy
speed: 4.0
loop: true
---

<div class="grid text-size-4 grid-cols-3 w-3/4 gap-y-10 auto-rows-min ml-auto mr-auto">
<div class="grid-item text-center mr-0- col-span-3">

This one has `speed: 4.0` and `loop: true` in the front matter
</div>
<div class="grid-item text-center mr-0- col-span-3">
  <strong>Cast</strong><br> 
  <span class="font-size-3 mt-0">(In order of appearance)</span>
</div>
<div class="grid-item text-right mr-4 col-span-1"><strong>Study 1</strong></div>
<div class="grid-item col-span-2">Person 1 <i>as PhD student</i>&nbsp;<mdi-open-in-new class="font-size-3 mb-0.5" /><br/>Person 2 <i>as Co-PI</i>&nbsp;<mdi-open-in-new class="font-size-3 mb-0.5" /></div>
<div class="grid-item text-right mr-4 col-span-1"><strong>Study 2</strong></div>
<div class="grid-item col-span-2">Person 3 <i>as Postdoc</i>&nbsp;<mdi-open-in-new class="font-size-3 mb-0.5" /><br/>Person 4 <i>as Co-PI</i>&nbsp;<mdi-open-in-new class="font-size-3 mb-0.5" /></div>
<div class="grid-item text-right mr-4 col-span-1"><strong>Experiments</strong></div>
<div class="grid-item col-span-2">Smile 🫠</div>
<div class="grid-item text-right mr-4 col-span-1"><strong>Funding</strong></div>
<div class="grid-item col-span-2">National Science Foundation<br/>
National Institute of Health</div>
<div class="grid-item text-right mr-4 col-span-1"><strong>Slides</strong></div>
<div class="grid-item col-span-2">
Slidev<br/>
Unocss<br/>
Figma<br/>
Vuejs<br/>
Vite<br/>
</div>
<div class="grid-item col-span-3 text-center mt-180px mb-auto font-size-1.5rem"><strong>Questions?</strong></div>
</div>

---
layout: image-left
image: /images/photo.png
class: mycoolclass
---

<br />

# Image left

This is the `layout: image-left` layout.

---
layout: image-right
image: /images/photo2.png
slide_info: false
class: mycoolclass
---

# Image right

This is the `layout: image-right` layout.

---
layout: image
image: /images/photo.png
title: Image Layout
---

---
layout: iframe-left
title: iframe Left Layout
# the web page source
url: https://gureckislab.org

# a custom class name to the content
class: my-cool-content-on-the-right
---

<br />

# This is a website on the left

This is useful for showing a website but loads live on the web so requires and internet connection.

---
layout: iframe-right
title: iframe Right Layout
# the web page source
url: https://gureckislab.org

# a custom class name to the content
class: my-cool-content-on-the-right
slide_info: false
---

# This is a website on the right

This is useful for showing a website but loads live on the web so requires and internet connection.

---
layout: iframe
title: iframe Layout
# the web page source
url: https://gureckislab.org
slide_info: false
---

---
layout: two-cols-title
columns: is-6
align: l-lt-lt
title: Two Cols Title - Header (Info)
---

:: title ::

# `two-cols-title`

:: left ::

This is `layout: two-cols-title`.

- There are three slots: `:: title ::`, `:: left ::`, and `:: right ::` along with the default which is implicit before any named slots.

- It additionally provides three configuration options in the slide YAML front matter:
  `color`, `columns` and `align`.

:: right ::

- `color` is the color scheme.

- `columns` is the relative spacing given to the left versus right column. The overall space is divided into 12 columns. Instructions like `is-5` will give 5 units to the left and 7 to the right.

- The <code>align</code> parameter determines how the columns look. The notation is for example
  <code>align: l-cm-cm</code>. The first part is for the header, the second for the left column, the third part is for the right column. The first letter is (<code>c</code> for center, <code>l</code> for left, <code>r</code> for right), the second letter
  is vertical alignment (<code>t</code> for top, <code>m</code> for middle, <code>b</code> for bottom). Only c/l/r works for the header.

---
layout: two-cols-title
columns: is-2
align: l-lt-lt
title: Two Cols Title - Header (is-2)
---

:: title ::

<div class='w-full h-20 bg-indigo-100'>
</div>

:: left ::

<div class='w-full h-100 bg-gray-300'></div>

:: right ::

<div class='w-full h-100 bg-pink-300'></div>

---
layout: two-cols-title
columns: is-4
align: l-lt-lt
title: Two Cols Title - Header (is-4)
---

:: title ::

<div class='w-full h-20 bg-indigo-100'>
</div>

:: left ::

<div class='w-full h-100 bg-gray-300'></div>

:: right ::

<div class='w-full h-100 bg-pink-300'></div>

---
layout: two-cols-title
columns: is-6
align: l-lt-lt
title: Two Cols Title - Header (is-6)
---

:: title ::

<div class='w-full h-20 bg-indigo-100'>
</div>

:: left ::

<div class='w-full h-100 bg-gray-300'></div>

:: right ::

<div class='w-full h-100 bg-pink-300'></div>

---
layout: two-cols-title
columns: is-8
align: l-lt-lt
title: Two Cols Title - Header (is-8)
---

:: title ::

<div class='w-full h-20 bg-indigo-100'>
</div>

:: left ::

<div class='w-full h-100 bg-gray-300'></div>

:: right ::

<div class='w-full h-100 bg-pink-300'></div>

---
layout: two-cols-title
columns: is-10
align: l-lt-lt
title: Two Cols Title - Header (is-10)
---

:: title ::

<div class='w-full h-20 bg-indigo-100'>
</div>

:: left ::

<div class='w-full h-100 bg-gray-300'></div>

:: right ::

<div class='w-full h-100 bg-pink-300'></div>

---
layout: two-cols-title
columns: is-10
align: l-lt-lt
titlepos: b
title: Two Cols Title - Footer (is-10)
---

:: title ::

<div class='w-full h-20 bg-indigo-100'>
</div>

:: left ::

<div class='w-full h-100 bg-gray-300'></div>

:: right ::

<div class='w-full h-100 bg-pink-300'></div>

---
layout: two-cols-title
columns: is-4
align: l-lt-lt
titlepos: b
title: Two Cols Title - no title (is-4)
---

:: left ::

<div class='w-full h-120 bg-gray-300'></div>

:: right ::

<div class='w-full h-120 bg-pink-300'></div>

---
layout: side-title
side: l
color: violet
titlewidth: is-4
align: rm-lm
title: Side Title Layout (Another)
---

:: title ::

# `side-title`

# <mdi-arrow-right />

:: content ::

This is `layout: side-title` with `side: left` in the front matter.

```yaml
side: left
color: violet
titlewidth: is-4
align: rm-lm
```

---
layout: side-title
side: r
color: pink-light
titlewidth: is-6
align: lm-lb
title: Side Title Layout (Another)
---

:: title ::

# `side-title`

# <mdi-arrow-right />

:: content ::

This is `layout: side-title` with `side: right` in the front matter.

```yaml
side: right
color: pink-light
titlewidth: is-6
align: lm-lb
```

---
layout: top-title
color: violet
align: l
title: Top Title (Another)
---

:: title ::

# `top-title`: A variation with different parameters

:: content ::

Todd has used this navy color on many projects in the past. This is a top title layout.

I sort of like the `###` font style the best.

```yaml
layout: top-title
color: violet
titlewidth: is-2
align: lm
```

---
layout: top-title-two-cols
color: navy
columns: is-6
align: l-lt-lt
title: Top Title (Another)
---

:: title ::

### `top-title-two-cols`: A variation with two columns

:: left ::

- This is the left column
- This is a nice way to add color and distinction to a slide
- Options are `columns` which is the size of the left column, `color` (default `light`), and `align` which is the alignment of the title and columns (e.g., `l-lt-lt`)

:: right ::

- This is the right column
- This is a nice way to add color and distinction to a slide

---
layout: default
---

# Extras

In addition to these custom layouts, the **Giornata** theme includes a few custom components that can be used in your slides. These include sticky notes, speech bubbles, cute icons, QR codes, and more. The next few slides walks through them:

<div class="g-c-tight">

- admonitions
- sticky notes
- speech bubbles
- cute icons
- QR codes

</div>

---
layout: two-cols-title
columns: is-6
title: Admonitions
dragPos:
  admon: Left,Top,Width,Height,Rotate
  "'admon'": 55,300,287,106
---

<Admonition title="draggable admonition" color='teal-light' width="300px" v-drag="[93,303,300,145,-14]">
If you want to drag an admonition, you should set the width to a fixed value.
</Admonition>

:: title ::

# Admonitions

:: left ::

- Admonitions are boxes that you can use to call out things.

<Admonition title="Custom title" color='amber-light'>
This is my admon message
</Admonition>

:: right ::

<AdmonitionType type='note' >
This is note text
</AdmonitionType>

<!--
> [!note]
> This is note text
-->

<AdmonitionType type='important' >
This is important text
</AdmonitionType>

<AdmonitionType type='tip' >
This is a tip
</AdmonitionType>

<AdmonitionType type='warning' >
This is a tip
</AdmonitionType>

<AdmonitionType type='caution' custom="text-lg" customTitle="font-size-6">
This is warning text
</AdmonitionType>

---
layout: two-cols-title
columns: is-6
title: Bubbles
---

<SpeechBubble position="l" color='sky' shape="round"  v-drag="[83,364,274,109]">

Hello, I'm a **speech bubble**! I'm a longer speech bubble. I'm still going.
</SpeechBubble>

:: title ::

# Bubbles

:: left ::

- Bubbles are moveable elements that act as speech bubbles
- They can be configured for where you want the arrow to point
- The can be move around if you enable `v-drag` on the element

:: right ::

<SpeechBubble position="bl" color='amber-light' shape="round">

Hello, I'm a **speech bubble**! I'm a longer speech bubble. I'm still going.
Hello, I'm a **speech bubble**! I'm a longer speech bubble. I'm still going.
Hello, I'm a **speech bubble**! I'm a longer speech bubble. I'm still going.
</SpeechBubble>

---
layout: default
title: Sticky Notes
---

<StickyNote color="amber-light" textAlign="left" width="180px" title="Title" v-drag="[66,318,185,171]">

Hello, I'm a **sticky note**.
</StickyNote>

<StickyNote color="sky-light" textAlign="left" width="180px" title="This is my title" v-drag="[304,295,180,180,-15]">

Hello, I'm also a **sticky note** but am blue sky title.
</StickyNote>

<StickyNote color="pink-light" textAlign="left" width="180px"  v-drag="[549,292,185,171,8]">

Hello, I'm also a **sticky note** but I lack a title.
</StickyNote>

<StickyNote color="emerald-light" textAlign="left" width="180px" title="This is my
title" customTitle="font-size-6" custom="font-size-2"
v-drag="[749,292,185,171,-8]">

Hello, I'm also a **sticky note** but I'm customized with a title and a custom class.
</StickyNote>

# Sticky Notes

- Sticky notes are moveable elements you can use for notes.
- Syntax is

```js
<StickyNote color="amber-light" textAlign="left" width="180px" title="Title" v-drag>
  Hello, I'm a **sticky note**.
</StickyNote>
```

---
layout: default
title: Dev-Only Sticky Notes
---

# Dev-Only Sticky Notes

<StickyNote color="rose-light" textAlign="left" width="200px" title="Dev Note" devOnly v-drag="[650,150,200,200]">

This note only appears in **dev mode**! It won't show in exports or production builds.
</StickyNote>

Use the `devOnly` prop to create sticky notes that only appear during development. These are perfect for speaker notes, reminders, or TODOs that you don't want in your final presentation.

```vue
<StickyNote color="rose-light" title="Dev Note" devOnly>
  This note only appears in dev mode!
</StickyNote>
```

When `devOnly` is set to `true`:

- Visible when running `slidev dev`
- Hidden when running `slidev build` or `slidev export`

---
layout: default
title: Kawaii 1
---

# Kawaii

- Kawaii is a Japanese term that means cute

<IceCream :size="80" mood="sad" color="#FDA7DC" />
<IceCream :size="80" mood="shocked" color="#FDA7DC" />
<IceCream :size="80" mood="happy" color="#FDA7DC" />
<IceCream :size="80" mood="blissful" color="#FDA7DC" />
<IceCream :size="80" mood="lovestruck" color="#FDA7DC" />
<IceCream :size="80" mood="excited" color="#FDA7DC" />
<IceCream :size="80" mood="ko" color="#FDA7DC" /><br/>

<BackPack :size="80" mood="sad" color="#FFD882" />
<BackPack :size="80" mood="shocked" color="#FFD882" />
<BackPack :size="80" mood="happy" color="#FFD882"/>
<BackPack :size="80" mood="blissful" color="#FFD882" />
<BackPack :size="80" mood="lovestruck" color="#FFD882" />
<BackPack :size="80" mood="excited" color="#FFD882" />
<BackPack :size="80" mood="ko" color="#FFD882" /><br/>

<Cat :size="80" mood="sad" color="#FFD882" />
<Cat :size="80" mood="shocked" color="#FFD882" />
<Cat :size="80" mood="happy" color="#FFD882"/>
<Cat :size="80" mood="blissful" color="#FFD882" />
<Cat :size="80" mood="lovestruck" color="#FFD882" />
<Cat :size="80" mood="excited" color="#FFD882" />
<Cat :size="80" mood="ko" color="#FFD882" /><br/>

<Browser :size="50" mood="lovestruck" color="#61DDBC" />
<Mug :size="50" mood="lovestruck" color="#61DDBC" />
<Planet :size="50" mood="lovestruck" color="#61DDBC" />
<SpeechBubbleGuy :size="50" mood="lovestruck" color="#d3d3d3" />
<Ghost :size="50" mood="blissful" color="#E0E4E8" />
<CreditCard :size="50" mood="blissful" color="#E0E4E8" />

---
layout: default
title: QR Codes
---

# In-line QR Codes

- Send people to a url with a easy to configure QR code

```vue
<QRCode value="https://gureckislab.org" :size="200" render-as="svg" />
```

<br />
Result:

<QRCode value="https://gureckislab.org" :size="200" render-as='svg'/>

---
layout: default
title: Slide Margins - Normal
---

# Slide Margins: `normal` (default)

Sometimes you need more space on a slide. Use the `margin` frontmatter option to control slide padding.

- This slide uses the default `margin: normal`
- Notice the standard padding around the content
- Good for most slides with typical content

```yaml
---
layout: default
margin: normal # or just omit this line
---
```

---
layout: default
margin: tight
title: Slide Margins - Tight
---

# Slide Margins: `tight`

This slide uses `margin: tight` for reduced padding.

- More horizontal and vertical space for content
- Useful when you need to fit more on a slide
- Notice how the content extends closer to the edges

```yaml
---
layout: default
margin: tight
---
```

---
layout: default
margin: tighter
title: Slide Margins - Tighter
---

# Slide Margins: `tighter`

This slide uses `margin: tighter` for even smaller margins.

- Maximum content space while still having some padding
- Good for dense information or larger diagrams
- Compare to the previous slides to see the difference

```yaml
---
layout: default
margin: tighter
---
```

---
layout: default
margin: none
title: Slide Margins - None
---

# Slide Margins: `none`

This slide uses `margin: none` to remove all padding.

- Content goes edge-to-edge
- Useful for full-bleed images or custom layouts
- Be careful with readability near edges

```yaml
---
layout: default
margin: none
---
```

---
layout: default
title: Lines
---

# Lines

<Line :x1=0 :y1=0 :x2=200 :y2=200 :width=2 color='red' v-drag="[326,136,250,250]" />

---
layout: side-title
side: left
color: violet
titlewidth: is-4
align: rm-lt
title: Code Example
---

<SpeechBubble position="br" shape="round" borderWidth="0" animation="float" v-drag="[19,335,261,83]">

Slidev is great at code formatting!
</SpeechBubble>

:: title ::

# <mdi-code-braces /> Code

<IceCream :size="80" mood="excited" color="#FDA7DC" v-drag="[232,444,50,80]" />

:: content ::

Plain javascript:

```js
console.log('Hello, World!')
```

Highlight lines 2 and 3:

```ts {2,3}
function helloworld() {
  console.log('Hello, World!')
  console.log('Hello, World!')
  console.log('Hello, World!')
}
```

Crazy clicking through

```ts {2,3|5|all}
function helloworld() {
  console.log('Hello, World!')
  console.log('Hello, World!')
  console.log('Hello, World!')
  console.log('Hello, World!')
  console.log('Hello, World!')
  console.log('Hello, World!')
}
```

---
layout: side-title
side: left
color: violet
titlewidth: is-4
align: rm-lt
title: Code Example
---

:: title ::

# <mdi-code-braces /> Code

More cool code stuff

:: content ::

Scrollable with clicks 🤯

```ts {2|3|7|12}{maxHeight:'100px'}
function helloworld() {
  console.log('Hello, World 1!')
  console.log('Hello, World 2!')
  console.log('Hello, World 3!')
  console.log('Hello, World 4!')
  console.log('Hello, World 5!')
  console.log('Hello, World 6!')
  console.log('Hello, World 7!')
  console.log('Hello, World 8!')
  console.log('Hello, World 9!')
  console.log('Hello, World 10!')
  console.log('Hello, World 11!')
}
```

You can even edit the code in the browser

```ts {monaco}
console.log('HelloWorld')
```

You can even run the code in the browser

```ts {monaco-run} {showOutputAt:'+1'}
function distance(x: number, y: number) {
  return Math.sqrt(x ** 2 + y ** 2)
}
console.log(distance(3, 4))
```

---
layout: side-title
side: left
color: lime
titlewidth: is-4
align: rm-lt
title: LaTeX Example
---

:: title ::

# <mdi-math-integral-box /> LaTeX Equations

Yeah it does this fine

<Mug :size="80" mood="excited" color="#FDA7DC" v-drag="[342,288,77,80]" />

:: content ::

Inline equations: $\sqrt{3x-1}+(1+x)^2$

Block rendering:

$$
\begin{array}{c}

\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &
= \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\

\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\

\nabla \cdot \vec{\mathbf{B}} & = 0

\end{array}
$$

Line highlighting with clicks!

$$
{1|3|all}
\begin{array}{c}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &
= \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0
\end{array}
$$

---
layout: side-title
side: left
color: sky
titlewidth: is-4
align: rm-cm
title: Mermaid Example
---

:: title ::

# Mermaid Diagrams

Everyone is talking about this

:: content ::

```mermaid
sequenceDiagram
  Alice->John: Hello John, how are you?
  Note over Alice,John: A typical interaction
```

---
layout: side-title
side: left
color: sky
titlewidth: is-4
align: rm-cm
title: Mermaid Example
---

:: title ::

# Mermaid Diagrams

Everyone is talking about this

:: content ::

```mermaid {theme: 'neutral', scale: 0.8}
graph TD
B[Text] --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```

A mermaid diagram with two circles side by side horizontally with an arrow pointing from the left circle to the right circle

```mermaid {theme: 'neutral', scale: 0.8}
graph LR
A([Circle 1]) --> B((Circle 2))
```

---
layout: cover
color: navy
session:
  week: 5
  day: Wed
  date: 'Feb 4'
level: 1
hideInToc: false
---

## Cross-Currents in Islamic Art

#### WEEK 5 · Wed · Feb 4

From Fatimid Cairo to Mughal Agra: 600 years of art and authority.

---
layout: default
color: navy-light
---

# Today's lecture

- The Fatimid dynasty and the architecture of Cairo
- **Al-Hakim Mosque** (990–1013 CE) — monumental stonework and the unusual minarets
- Sultanate India and the **Qutb Minar** (begun c. 1192)
- The Mughal court — **Akbarnama** (c. 1586) and the **Taj Mahal** (1632–53)

Notice the session chip top-right (`WEEK 5 · WED · FEB 4`) — set once on the cover, inherited here. Artwork slides further down carry `timeline:` metadata that the `timeline` layout will pick up automatically.

---
layout: timeline
color: navy-light
title: Lecture timeline
---

---
layout: full
color: stone
timeline:
  year: 691
  label: 'Dome of the Rock'
  region: 'Jerusalem, Umayyad Caliphate'
  id: dome-of-the-rock
  image: https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Dome_of_the_Rock_west_exterior.jpg/1280px-Dome_of_the_Rock_west_exterior.jpg
  image_fit: cover
---

![Dome of the Rock, completed c. 691–92 CE, Jerusalem](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Dome_of_the_Rock_west_exterior.jpg/1280px-Dome_of_the_Rock_west_exterior.jpg)

---
layout: full
color: yellow
timeline:
  year: 785
  label: 'Great Mosque of Córdoba'
  region: 'Córdoba, Umayyad Emirate'
  id: cordoba-mosque
  image: https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mezquita_de_C%C3%B3rdoba_desde_el_aire_%28C%C3%B3rdoba%2C_Espa%C3%B1a%29.jpg/1280px-Mezquita_de_C%C3%B3rdoba_desde_el_aire_%28C%C3%B3rdoba%2C_Espa%C3%B1a%29.jpg
  image_fit: cover
---

![Great Mosque of Córdoba, begun 785 CE, Spain](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mezquita_de_C%C3%B3rdoba_desde_el_aire_%28C%C3%B3rdoba%2C_Espa%C3%B1a%29.jpg/1280px-Mezquita_de_C%C3%B3rdoba_desde_el_aire_%28C%C3%B3rdoba%2C_Espa%C3%B1a%29.jpg)

---
layout: full
color: black
timeline:
  year: 996
  label: 'Al-Hakim Mosque'
  region: 'Cairo, Fatimid Caliphate'
  id: al-hakim
  image: https://smarthistory.org/wp-content/uploads/2026/03/Al-Hakim-both-minarets.jpg
  image_fit: cover
---

![The minarets of al-Hakim](https://smarthistory.org/wp-content/uploads/2026/03/Al-Hakim-both-minarets.jpg)

---
layout: top-title
color: amber
align: rm
---

:: title ::

# Al-Hakim Mosque

:: content ::

#### Cairo, 990–1013 CE

The mosque's two monumental minarets flank the facade — an unusual placement. Their square bases project outward from the wall, and the upper sections are encased in massive stone cylinders that envelop the original structures.

The reason for the cylinders is contested: structural reinforcement after the 1303 earthquake, an aesthetic intervention by a later patron, or both.

---
layout: section
color: amber
---

# Sultanate India

New dynasties, new patrons — Indo-Islamic architecture takes shape.

---
layout: full
color: zinc
timeline:
  year: 1192
  label: 'Qutb Minar'
  region: 'Delhi, Sultanate'
  id: qutb-minar
  image: https://res.cloudinary.com/image-solar/image/upload/v1772011970/2026nwp-ar1205/32709403483_d9a6a5ab37_k_cgzsbe.jpg
  image_fit: contain
---

![Qutb Minar, begun c. 1192–3, Qutb archaeological complex, Delhi](https://res.cloudinary.com/image-solar/image/upload/v1772011970/2026nwp-ar1205/32709403483_d9a6a5ab37_k_cgzsbe.jpg)

---
layout: full
color: teal
timeline:
  year: 1370
  label: 'Court of the Lions'
  region: 'Granada, Nasrid Kingdom'
  id: alhambra-lions
  image: https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Alhambra_-_Patio_de_los_Leones.jpg/1280px-Alhambra_-_Patio_de_los_Leones.jpg
  image_fit: cover
---

![Court of the Lions, Alhambra, 14th century, Granada](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Alhambra_-_Patio_de_los_Leones.jpg/1280px-Alhambra_-_Patio_de_los_Leones.jpg)

---
layout: section
color: rose
---

# Mughal India

The Mughals fuse Persian, Timurid, and Indic traditions into a courtly imperial style.

---
layout: full
color: rose
timeline:
  year: 1586
  label: 'Akbarnama'
  region: 'Mughal Court'
  id: akbarnama
  image: http://smarthistory.org/wp-content/uploads/2017/03/akbarnama_both_800px.jpg
  image_fit: contain
---

![Basawan and Chetar, _Akbar_ from the Akbarnama, c. 1586–89, Mughal Empire](http://smarthistory.org/wp-content/uploads/2017/03/akbarnama_both_800px.jpg)

---
layout: full
color: slate
timeline:
  year: 1557
  label: 'Süleymaniye Mosque'
  region: 'Istanbul, Ottoman Empire'
  id: suleymaniye
  image: https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/S%C3%BCleymaniye_Mosque_1391.jpg/1280px-S%C3%BCleymaniye_Mosque_1391.jpg
  image_fit: cover
---

![Süleymaniye Mosque, 1550–57, Istanbul](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/S%C3%BCleymaniye_Mosque_1391.jpg/1280px-S%C3%BCleymaniye_Mosque_1391.jpg)

---
layout: full
color: indigo
timeline:
  year: 1632
  label: 'Taj Mahal'
  region: 'Agra, Mughal Empire'
  id: taj-mahal
  image: https://smarthistory.org/wp-content/uploads/2022/04/Taj_Mahal-10-scaled.jpg
  image_fit: cover
---

![Taj Mahal, Agra, India, 1632–53](https://smarthistory.org/wp-content/uploads/2022/04/Taj_Mahal-10-scaled.jpg)

---
layout: top-title
color: indigo
align: rm
---

:: title ::

# Taj Mahal

:: content ::

#### Agra, 1632–53, under Shah Jahan

Built by the Mughal emperor Shah Jahan as a mausoleum for his wife Mumtaz Mahal, the Taj Mahal fuses Timurid double-dome geometry, Persian charbagh garden layout, and Indo-Islamic pietra dura inlay into a single white-marble whole.

The chronologically latest event on the timeline — pressing the right-arrow here advances to the closing slide; pressing left goes back to the Taj Mahal image, and the morph runs in reverse.

---
layout: quote
color: navy
---

:: quote::

# "The image survives the dynasty."

:: author::

After the Mughals came the British; after the Fatimids came the Ayyubids. The images — stone minarets and white-marble tombs — outlasted both.

---
layout: cover
color: amber
session:
  week: 5
  day: Fri
  date: 'Feb 6'
level: 1
---

## Next session

#### WEEK 5 · Fri · Feb 6

Advancing to a new lecture cover with its own `session:` block — the chip updates automatically.

---
layout: default
color: navy-light
---

# View-Transition Morph → Comparison

When `transition: view-transition` is set (it is — headmatter line 6), any `<img>` with a matching `data-morph-id` on consecutive slides morphs between them via the browser's [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API). `global-top.vue` stamps the `view-transition-name` CSS property automatically.

<v-clicks>

- The **next slide** is a full bleed single image (`layout: full`).
- Click once to go there, then click again to land on the **comparison slide** that has the same image on the left and a different one on the right — the Taj Mahal image morphs from full bleed into the side-by-side layout.

</v-clicks>

---
layout: full
color: black
---

<figure>
  <img
    src="https://smarthistory.org/wp-content/uploads/2022/04/Taj_Mahal-10-scaled.jpg"
    alt="Taj Mahal"
    data-morph-id="taj"
    loading="lazy"
  />
  <figcaption>Taj Mahal, Agra, 1632–53</figcaption>
</figure>

---
layout: two-cols
color: indigo
---

# Morph → Side-by-Side

::left::

<figure>
  <img
    src="https://smarthistory.org/wp-content/uploads/2022/04/Taj_Mahal-10-scaled.jpg"
    alt="Taj Mahal"
    data-morph-id="taj"
    loading="lazy"
    style="max-height: 55vh; width: auto; object-fit: contain"
  />
  <figcaption>Taj Mahal</figcaption>
</figure>

::right::

<figure>
  <img
    src="https://res.cloudinary.com/image-solar/image/upload/v1772011970/2026nwp-ar1205/32709403483_d9a6a5ab37_k_cgzsbe.jpg"
    alt="Qutb Minar"
    loading="lazy"
    style="max-height: 55vh; width: auto; object-fit: contain"
  />
  <figcaption>Qutb Minar</figcaption>
</figure>

---
layout: full
color: black
---

![Taj Mahal, Agra, 1632–53](https://smarthistory.org/wp-content/uploads/2022/04/Taj_Mahal-10-scaled.jpg){data-morph-id="taj-md"}

---
layout: two-cols
color: indigo
---

::left::

![Taj Mahal](https://smarthistory.org/wp-content/uploads/2022/04/Taj_Mahal-10-scaled.jpg){data-morph-id="taj-md"}

::right::

![Qutb Minar](https://res.cloudinary.com/image-solar/image/upload/v1772011970/2026nwp-ar1205/32709403483_d9a6a5ab37_k_cgzsbe.jpg)
