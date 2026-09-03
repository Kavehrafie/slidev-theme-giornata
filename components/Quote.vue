<script setup lang="ts">
// Quote — literary/theory quotation with click-through emphasis.
//
// The quote text arrives as markdown (default slot). `%%` in the text marks
// chunk boundaries; `reveal` picks the interaction:
//   highlight — the whole quote is visible from the start and each click moves
//               an accent "wash" to the next chunk (code-block-line-highlight
//               style, the default)
//   appear    — chunks fade in one per click
//   none      — static, zero added clicks
// `==text==` (markdown-it-mark) renders as persistent accent emphasis
// regardless of clicks. The attribution gets its own final click.
import { computed, useSlots } from 'vue'
import type { VNode } from 'vue'
import { compute_color_scheme } from '../layoutHelper'
import { chunk_has_visible_content, split_vnodes } from './quoteSplit'

const VALID_REVEAL = ['highlight', 'appear', 'none'] as const

const props = withDefaults(
  defineProps<{
    color?: string
    colorMode?: string
    author?: string | null
    work?: string | null
    year?: string | number | null
    reveal?: string
    quoteSize?: string
    authorSize?: string
  }>(),
  {
    color: 'light',
    author: null,
    work: null,
    year: null,
    reveal: 'highlight',
    quoteSize: 'text-xl',
    authorSize: 'text-base',
  },
)

// Render raw VNode arrays (the splitter's chunk output) inside the template.
// Local functional component — a file in components/ would be auto-registered
// as a global tag by Slidev.
const VNodes = (p: { vnodes: VNode[] }) => p.vnodes

const slots = useSlots()

const colorscheme = computed(() => compute_color_scheme(props.color, props.colorMode))

const reveal_ = computed(() => {
  const lower = props.reveal.trim().toLowerCase()
  if ((VALID_REVEAL as readonly string[]).includes(lower)) return lower
  console.warn(
    `[giornata] Quote: invalid reveal "${props.reveal}" (expected highlight|appear|none), falling back to "highlight"`,
  )
  return 'highlight'
})

// Markdown slot content is static per page load, so split ONCE at setup —
// a reactive computed here re-invokes the slot function on every update,
// re-mounts the <v-click> elements and floods Slidev's click context with
// late-registration warnings.
const chunks = split_vnodes(slots.default?.() ?? []).filter(chunk_has_visible_content)

const has_attribution = !!slots.author || props.author != null
</script>

<template>
  <figure class="giornata-quote" :class="[colorscheme, `reveal-${reveal_}`, quoteSize]">
    <blockquote class="quote-body">
      <template v-for="(chunk, i) in chunks" :key="i">
        <v-click v-if="reveal_ !== 'none'">
          <span class="quote-chunk"><VNodes :vnodes="chunk" /></span>
        </v-click>
        <span v-else class="quote-chunk"><VNodes :vnodes="chunk" /></span>
      </template>
    </blockquote>
    <footer v-if="has_attribution" class="quote-attrib">
      <v-click v-if="reveal_ !== 'none'">
        <span class="quote-attrib-inner" :class="authorSize">
          <slot name="author" />
          <template v-if="!slots.author">
            <span v-if="author != null && work">— <em>{{ author }}</em>, </span>
            <span v-else-if="author != null">— <em>{{ author }}</em></span>
            <em v-if="work">{{ work }}</em>
            <span v-if="(work || author != null) && year != null">, {{ year }}</span>
          </template>
        </span>
      </v-click>
      <span v-else class="quote-attrib-inner" :class="authorSize">
        <slot name="author" />
        <template v-if="!slots.author">
          <span v-if="author != null && work">— <em>{{ author }}</em>, </span>
          <span v-else-if="author != null">— <em>{{ author }}</em></span>
          <em v-if="work">{{ work }}</em>
          <span v-if="(work || author != null) && year != null">, {{ year }}</span>
        </template>
      </span>
    </footer>
  </figure>
</template>

<style scoped>
/* Box look (accent border, italic serif, decorative glyphs) comes from the
   global blockquote rules in styles/base.css — this scope adds the chunk
   machinery only. */
.giornata-quote {
  position: relative;
  display: block; /* opt out of the global figure flex-centering rule */
  max-width: 100%;
  font-family: var(--giornata-quote-font);
  color: var(--giornata-text-color);
}

.quote-body {
  position: relative;
  z-index: 1;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.35;
  text-align: left;
}

.quote-body :deep(p) {
  margin: 0 0 0.6em;
  line-height: 1.35;
}
.quote-body :deep(p:last-child) {
  margin-bottom: 0;
}

.quote-chunk {
  display: inline; /* inline flow — whitespace collapses across chunk boundaries */
  padding: 0.12em 0.22em; /* constant in both wash states — zero reflow on click */
  border-radius: 0.3em;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone; /* wash wraps per line, like a highlighter */
  background-color: transparent;
  transition: background-color 280ms ease;
}

/* highlight mode: the whole quote is visible from click 0. Slidev's client CSS
   hides vclick-hidden elements with `opacity: 0 !important`; win the cascade
   back with equal !important + higher specificity (the chunk classes are
   authored here, so they carry this component's scope attribute). */
.reveal-highlight .quote-chunk.slidev-vclick-hidden {
  opacity: 1 !important;
  user-select: auto !important;
}

/* the wash — paints exactly the latest-revealed chunk */
.reveal-highlight .quote-chunk.slidev-vclick-current {
  background-color: color-mix(
    in srgb,
    var(--giornata-highlight-color, var(--giornata-accent)) 24%,
    transparent
  );
}

/* appear mode: the client's default hiding (opacity 0) is correct; soften the fade */
.reveal-appear .quote-chunk {
  transition: opacity 350ms ease, background-color 280ms ease;
}

.quote-attrib {
  position: relative;
  z-index: 1;
  margin-top: 1.2em;
  text-align: right;
  font-family: var(--giornata-main-font);
  color: color-mix(in srgb, var(--giornata-text-color) 82%, transparent);
}
.quote-attrib-inner {
  transition: opacity 400ms ease;
}
.quote-attrib em {
  font-style: italic;
}

/* persistent emphasis: ==text== (markdown-it-mark) — accent italic, always on */
.quote-body :deep(mark) {
  padding: 0;
  border-radius: 0;
  background: transparent;
  color: color-mix(
    in srgb,
    var(--giornata-highlight-color, var(--giornata-accent)) 60%,
    var(--giornata-text-color)
  );
  font-weight: 600;
  font-style: italic;
}
</style>
