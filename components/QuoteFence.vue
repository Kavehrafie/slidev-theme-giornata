<script setup lang="ts">
// QuoteFence — the ```quote code-fence renderer. setup/transformers.ts
// intercepts ```quote fences in the markdown pipeline and emits <QuoteFence>,
// so quotes get the standard code-block look with EB Garamond plus the same
// click-through accent wash as the Quote component, driven by Slidev's
// line-range syntax (`{1|2|3}` — one click per group).
//
// Authoring:
//
//   ```quote {1|2|3}
//   The child looks and recognizes
//   ==before it can speak==.
//   -- John Berger, _Ways of Seeing_, 1972
//   ```
//
// A line starting with `--` or `—` is the attribution (name and _titles_
// italic, year/references regular); `==text==` is persistent accent emphasis.
// NOTE: line ranges use absolute click positions — on slides that also use
// plain v-clicks before the fence, number the ranges accordingly.
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    code: string
    ranges?: number[][] | null
  }>(),
  { ranges: null },
)

const { copied, copy } = useClipboard()

function copy_code() {
  copy(props.code)
}

interface Seg {
  text: string
  cls?: string
}

const ATTRIBUTION_RE = /^\s*(?:--|—)\s?/
const EMPHASIS_RE = /==([^=]+)==/g
const TITLE_RE = /_([^_]+)_/g

function split_emphasis(text: string): Seg[] {
  const out: Seg[] = []
  let last = 0
  for (const match of text.matchAll(EMPHASIS_RE)) {
    const index = match.index ?? 0
    if (index > last) out.push({ text: text.slice(last, index) })
    out.push({ text: match[1] ?? '', cls: 'qf-em' })
    last = index + match[0].length
  }
  if (last === 0) return [{ text }]
  if (last < text.length) out.push({ text: text.slice(last) })
  return out
}

function decorate_attribution(text: string): Seg[] {
  // name (first comma segment) italic, _titles_ italic, the rest regular
  const out: Seg[] = []
  const comma = text.indexOf(',')
  const name = comma === -1 ? text : text.slice(0, comma)
  const rest = comma === -1 ? '' : text.slice(comma)
  if (name.trim()) {
    // auto-italicize the name unless the author marked it with _..._
    out.push(
      ...(name.trimStart().startsWith('_')
        ? [{ text: name }]
        : [{ text: name, cls: 'qf-attr-name' }]),
    )
  }
  let last = 0
  for (const match of rest.matchAll(TITLE_RE)) {
    const index = match.index ?? 0
    if (index > last) out.push({ text: rest.slice(last, index) })
    out.push({ text: match[1] ?? '', cls: 'qf-attr-em' })
    last = index + match[0].length
  }
  if (last < rest.length) out.push({ text: rest.slice(last) })
  return out
}

interface FenceLine {
  segs: Seg[]
  attr: boolean
  click: number | null
}

const lines = computed<FenceLine[]>(() => {
  const raw = props.code.replace(/\n+$/, '').split('\n')
  return raw.map((text, idx) => {
    const lineNo = idx + 1
    let click: number | null = null
    if (props.ranges) {
      const group = props.ranges.findIndex(([a, b]) => lineNo >= a && lineNo <= b)
      if (group !== -1) click = group + 1
    }
    if (ATTRIBUTION_RE.test(text)) {
      return { segs: decorate_attribution(text.replace(ATTRIBUTION_RE, '')), attr: true, click }
    }
    return { segs: split_emphasis(text), attr: false, click }
  })
})
</script>

<template>
  <div class="giornata-quote-fence-wrap">
    <pre class="giornata-quote-fence"><code><template v-for="(line, i) in lines" :key="i"><v-click v-if="line.click != null" :at="line.click"
        ><span class="qf-line" :class="{ 'qf-attr': line.attr }"><template v-for="(seg, j) in line.segs" :key="j"><span v-if="seg.cls" :class="seg.cls">{{ seg.text }}</span><template v-else>{{ seg.text }}</template></template></span></v-click
      ><span v-else class="qf-line" :class="{ 'qf-attr': line.attr }"><template v-for="(seg, j) in line.segs" :key="j"><span v-if="seg.cls" :class="seg.cls">{{ seg.text }}</span><template v-else>{{ seg.text }}</template></template></span></template></code></pre>
    <button
      class="giornata-quote-fence-copy"
      :title="copied ? 'Copied' : 'Copy'"
      type="button"
      @click="copy_code()"
    >
      <Icon v-if="copied" icon="ph:check-circle" />
      <Icon v-else icon="ph:clipboard" />
    </button>
  </div>
</template>

<style scoped>
.giornata-quote-fence-wrap {
  position: relative;
  width: 100%;
}

/* Deliberately the standard code-block look (rounded box on the scheme's code
   background) — only the font changes to EB Garamond italic. */
.giornata-quote-fence {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.6rem 1rem;
  border-radius: var(--slidev-code-radius, 6px);
  background: var(--giornata-bg-code-color);
  color: var(--giornata-fg-code-color);
  font-family: var(--giornata-quote-font);
  font-size: 1.1em;
  font-style: italic;
  line-height: 1.6;
  white-space: pre-wrap; /* prose wraps instead of overflowing */
}

/* the <code> element defaults to monospace — inherit the quote font */
.giornata-quote-fence code {
  font-family: inherit;
  font-style: inherit;
  font-size: inherit;
  background: transparent;
}

.qf-line {
  display: block;
  border-radius: 0.3em;
  padding: 0.05em 0.3em;
  margin: 0 -0.3em; /* wash bleeds slightly past the text like a code-block line highlight */
  transition: background-color 280ms ease;
}

/* highlight model — the whole quote is visible from click 0. Slidev's client
   CSS hides vclick-hidden elements with `opacity: 0 !important`; win the
   cascade back with equal importance from this higher-specificity selector. */
.giornata-quote-fence .qf-line.slidev-vclick-hidden {
  opacity: 1 !important;
  user-select: auto !important;
}

.giornata-quote-fence .qf-line.slidev-vclick-current {
  background-color: color-mix(
    in srgb,
    var(--giornata-highlight-color, var(--giornata-accent)) 24%,
    transparent
  );
}

/* copy button — same placement/behavior as Slidev's code blocks */
.giornata-quote-fence-copy {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.4rem;
  border: none;
  background: none;
  color: var(--giornata-fg-code-color);
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  transition: opacity 200ms ease;
}

.giornata-quote-fence-wrap:hover .giornata-quote-fence-copy {
  opacity: 0.4;
}

.giornata-quote-fence-copy:hover {
  opacity: 1;
}

/* attribution — name and titles italic, rest regular */
.qf-attr {
  font-style: normal;
  font-size: 0.72em;
  color: color-mix(in srgb, currentColor 75%, transparent);
  text-align: right;
}

.qf-attr-name,
.qf-attr-em {
  font-style: italic;
}

/* persistent ==emphasis== */
.qf-em {
  font-style: italic;
  font-weight: 600;
  color: color-mix(
    in srgb,
    var(--giornata-highlight-color, var(--giornata-accent)) 70%,
    var(--giornata-fg-code-color)
  );
}
</style>
