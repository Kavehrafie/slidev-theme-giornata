<script setup lang="ts">
// Quote — literary/theory quotation with click-through focus.
//
// The quote text arrives as markdown (default slot). `%%` in the text marks
// chunk boundaries; each click moves the FOCUS to the next chunk: the focused
// chunk sits at full contrast while the rest of the quote dims, so the
// emphasized phrase separates from both the background and the surrounding
// text. `==text==` (markdown-it-mark) renders as persistent accent emphasis
// regardless of clicks. Chunks are plain inline spans flowing as one
// continuous line — v-click is applied as a directive on the span, so no
// block-level wrapper breaks the text into separate paragraphs. The
// attribution is always visible and never costs a click. Pass
// `reveal="none"` for a fully static quote with zero added clicks.
import { computed, useSlots } from 'vue'
import type { VNode } from 'vue'
import { useSlideContext } from '@slidev/client/context.ts'
import { compute_color_scheme } from '../layoutHelper'
import { chunk_has_visible_content, split_vnodes } from './quoteSplit'

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
    authorSize: '',
  },
)

// Render raw VNode arrays (the splitter's chunk output) inside the template.
// Local functional component — a file in components/ would be auto-registered
// as a global tag by Slidev.
const VNodes = (p: { vnodes: VNode[] }) => p.vnodes

const slots = useSlots()

const { $clicks } = useSlideContext()

const colorscheme = computed(() => compute_color_scheme(props.color, props.colorMode))

// `none` = static quote, no click machinery; any other value = focus model.
const is_static = computed(() => props.reveal.trim().toLowerCase() === 'none')

// Before the first click the whole quote shows at full opacity; once clicking
// begins, the non-focused chunks dim. Driven by the slide's click counter so
// the initial state stays clean without per-chunk class gymnastics.
const focusing = computed(() => !is_static.value && $clicks.value > 0)

// Markdown authors naturally write quotes as `> text`, which would nest a
// blockquote inside .quote-body's own blockquote — double glyphs and padding,
// since the global blockquote rules decorate every blockquote. Unwrap a single
// top-level blockquote; anything more complex stays as authored.
const unwrap_blockquote = (vnodes: VNode[]): VNode[] => {
  const [first] = vnodes
  if (vnodes.length === 1 && first?.type === 'blockquote' && Array.isArray(first.children))
    return first.children as VNode[]
  return vnodes
}

// Markdown slot content is static per page load, so split ONCE at setup —
// a reactive computed here re-invokes the slot function on every update,
// re-mounts the clicked elements and floods Slidev's click context with
// late-registration warnings.
const chunks = split_vnodes(unwrap_blockquote(slots.default?.() ?? [])).filter(
  chunk_has_visible_content,
)

const has_attribution = !!slots.author || props.author != null
</script>

<template>
  <figure class="giornata-quote" :class="[colorscheme, quoteSize, { focusing }]">
    <blockquote class="quote-body">
      <template v-for="(chunk, i) in chunks" :key="i">
        <span v-if="!is_static" v-click class="quote-chunk"><VNodes :vnodes="chunk" /></span>
        <span v-else class="quote-chunk"><VNodes :vnodes="chunk" /></span>
      </template>
    </blockquote>
    <footer v-if="has_attribution" class="quote-attrib">
      <span class="quote-attrib-inner" :class="authorSize">
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
/* Box look (italic serif, decorative glyphs) comes from the global blockquote
   rules in styles/base.css — this scope adds the chunk machinery only. */
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

/* Chunks are inline spans — the whole quote reads as one continuous line.
   v-click is a directive on the span, not a wrapper component, so nothing
   introduces block-level boxes between chunks. */
.quote-chunk {
  display: inline;
  transition: opacity 350ms ease;
}

/* click 0 — the whole quote at full opacity. Slidev's client CSS hides
   vclick-hidden elements with `opacity: 0 !important`; win the cascade back
   with equal importance from this higher-specificity selector. */
.giornata-quote:not(.focusing) .quote-chunk.slidev-vclick-hidden {
  opacity: 1 !important;
  pointer-events: auto !important;
  user-select: auto !important;
}

/* once clicking begins, non-focused chunks dim to a ghost */
.giornata-quote.focusing .quote-chunk.slidev-vclick-hidden {
  opacity: 0.35 !important;
  pointer-events: auto !important;
  user-select: auto !important;
}

.giornata-quote.focusing .quote-chunk.slidev-vclick-prior {
  opacity: 0.35;
}

/* the focused chunk — full contrast against the dimmed rest */
.giornata-quote .quote-chunk.slidev-vclick-current {
  opacity: 1;
}

.quote-attrib {
  position: relative;
  z-index: 1;
  margin-top: 1.2em;
  text-align: right;
  /* proportional to the quote — the main font's larger x-height would
     otherwise make an absolute small size read BIGGER than the quote face */
  font-size: 0.75em;
  font-family: var(--giornata-main-font);
  color: color-mix(in srgb, var(--giornata-text-color) 82%, transparent);
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
