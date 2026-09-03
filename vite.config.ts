import { defineConfig } from 'vite'
import type MarkdownIt from 'markdown-it'
import { sub } from '@mdit/plugin-sub'
import Mark from 'markdown-it-mark'
import MarkdownItAttrs from 'markdown-it-attrs'
import ImageCaptionPlugin from 'markdown-it-implicit-figures'
import inlineImageAttrsPlugin from './setup/inline-image-attrs.ts'
import { version } from './package.json' with { type: 'json' }

console.log(`Loading Giornata ${version} theme vite.config.ts...`)
export default defineConfig({
  slidev: {
    markdown: {
      markdownSetup(md) {
        // Slidev renders through `markdown-exit`, a markdown-it-compatible fork
        // whose type is nominally incompatible with upstream `MarkdownIt`. The
        // plugins below are typed against upstream markdown-it, so cast once at
        // this boundary (runtime behavior is identical — it is a drop-in fork).
        const parser = md as unknown as MarkdownIt
        // Must run before implicit-figures so the {…} curly text is consumed
        // before the figure-wrapper checks for image-only paragraphs.
        parser.use(inlineImageAttrsPlugin, {
          leftDelimiter: '{',
          rightDelimiter: '}',
        })
        parser.use(MarkdownItAttrs, {
          leftDelimiter: '{',
          rightDelimiter: '}',
          allowedAttributes: [],
        })
        // markdown-it-attrs parks disallowed `{...}` groups — including
        // code-fence line ranges like `{1|2|3|4}` and options like
        // `{maxHeight:'100px'}` — as junk attrs on fence tokens, which breaks
        // Slidev's fence-info parsing (click ranges, {monaco}, ```quote, ...).
        // Snapshot each fence's info before attrs runs and restore it verbatim
        // after (reconstruction from the parked attrs loses quotes/colons).
        parser.core.ruler.before('curly_attributes', 'giornata_save_fence_info', (state) => {
          for (const token of state.tokens) {
            if (token.type === 'fence') token.meta = { ...token.meta, giornataInfo: token.info }
          }
        })
        parser.core.ruler.after('curly_attributes', 'giornata_restore_fence_info', (state) => {
          for (const token of state.tokens) {
            if (token.type === 'fence' && token.meta?.giornataInfo != null) {
              token.info = token.meta.giornataInfo
              // nothing was legitimately applied (allowedAttributes is []),
              // so any parked attrs are junk
              token.attrs = null
              token.meta = { ...token.meta, giornataInfo: undefined }
            }
          }
        })
        parser.use(sub)
        parser.use(Mark)
        parser.use(ImageCaptionPlugin, {
          figcaption: true,
          lazyLoading: true,
        })
      },
    },
  },
})
