import { defineConfig } from 'vite'
import { sub } from '@mdit/plugin-sub'
import Mark from 'markdown-it-mark'
import MarkdownItAttrs from 'markdown-it-attrs'
import ImageCaptionPlugin from 'markdown-it-implicit-figures'
import { version } from './package.json'

console.log(`Loading Giornata ${version} theme vite.config.ts...`)
export default defineConfig({
  slidev: {
    markdown: {
      markdownItSetup(md) {
        md.use(MarkdownItAttrs, {
          leftDelimiter: '{',
          rightDelimiter: '}',
          allowedAttributes: [],
        })
        md.use(sub)
        md.use(Mark)
        md.use(ImageCaptionPlugin, {
          figcaption: true,
          lazyLoading: true,
        })
      },
    },
  },
})
