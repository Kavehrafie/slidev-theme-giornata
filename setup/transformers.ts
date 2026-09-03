/* ./setup/transformers.ts */
import { defineCodeblockTransformer, defineTransformersSetup } from '@slidev/types'

// ```quote fences → <QuoteFence> (see components/QuoteFence.vue). Intercepting
// here — instead of registering a shiki language — skips syntax highlighting
// entirely: no client-side re-highlight on click, and full control of the line
// markup for the click-through wash.
const quoteFence = defineCodeblockTransformer(({ info, code }) => {
  const [lang, ...rest] = info.trim().split(/\s+/)
  if (lang !== 'quote') return null

  // Slidev line-range syntax: {1|2-3|4} → one click per group
  let ranges: number[][] | null = null
  const rangeMatch = rest.join(' ').match(/\{([^}]*)\}/)
  if (rangeMatch) {
    ranges = rangeMatch[1].split('|').map((segment) => {
      const [a, b] = segment.trim().split('-').map(Number)
      return [a, b || a]
    })
  }

  // :code is a JSON string literal embedded in a single-quoted attribute —
  // escape & and ' as entities (HTML attributes have no backslash escapes,
  // so JSON's double quotes are safe only inside single quotes).
  const codeAttr = JSON.stringify(code)
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#39;')
  return `<QuoteFence :code='${codeAttr}' :ranges='${JSON.stringify(ranges)}' />`
})

export default defineTransformersSetup(() => ({
  codeblocks: [quoteFence],
}))
