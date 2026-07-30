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
