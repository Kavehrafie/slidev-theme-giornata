/**
 * Custom markdown-it plugin that handles `{...}` curly-brace attributes on
 * inline images: `![alt](url){data-foo="bar" .class #id}`.
 *
 * markdown-it-attrs v5 should handle this via its "inline nesting 0" pattern,
 * but it doesn't work reliably in Slidev's token pipeline. This plugin runs
 * BEFORE implicit-figures so the curly text is already consumed by the time the
 * figure-wrapper checks whether the paragraph is image-only.
 */
import type MarkdownIt from 'markdown-it'
import type StateCore from 'markdown-it/lib/rules_core/state_core.mjs'
import type Token from 'markdown-it/lib/token.mjs'

interface AttrsOptions {
  leftDelimiter: string
  rightDelimiter: string
}

export default function inlineImageAttrsPlugin(
  md: MarkdownIt,
  options: AttrsOptions = { leftDelimiter: '{', rightDelimiter: '}' },
) {
  const L = options.leftDelimiter
  const R = options.rightDelimiter

  function parseAttrs(str: string): [string, string][] {
    const attrs: [string, string][] = []
    let key = ''
    let value = ''
    let parsingKey = true
    let inQuotes = false

    for (let i = L.length; i < str.length; i++) {
      const ch = str[i]
      if (!inQuotes && str.slice(i, i + R.length) === R) {
        if (key) attrs.push([key, value])
        break
      }
      if (ch === '"' && !inQuotes) {
        inQuotes = true
        continue
      }
      if (ch === '"' && inQuotes) {
        inQuotes = false
        continue
      }
      if (ch === '=' && parsingKey) {
        parsingKey = false
        continue
      }
      if (ch === ' ' && !inQuotes) {
        if (key) attrs.push([key, value])
        key = ''
        value = ''
        parsingKey = true
        continue
      }
      if (parsingKey) key += ch
      else value += ch
    }
    return attrs
  }

  function curlyAttrs(state: StateCore) {
    const tokens = state.tokens
    let inlineCount = 0
    for (let i = 0; i < tokens.length; i++) {
      const token: Token = tokens[i]
      if (token.type !== 'inline' || !token.children) continue
      inlineCount++

      const children = token.children
      // Walk backwards so splice indices stay stable
      for (let j = children.length - 1; j > 0; j--) {
        const prev = children[j - 1]
        const curr = children[j]

        if (
          (prev.type === 'image' || prev.type === 'code_inline') &&
          curr.type === 'text' &&
          curr.content.startsWith(L)
        ) {
          const attrs = parseAttrs(curr.content)
          for (const [k, v] of attrs) {
            prev.attrSet(k, v)
          }
          // Remove the curly text
          const endIdx = curr.content.indexOf(R)
          if (endIdx !== -1) {
            const remainder = curr.content.slice(endIdx + R.length)
            if (remainder) {
              curr.content = remainder
            } else {
              children.splice(j, 1)
            }
          }
        }
      }
    }
  }

  md.core.ruler.before('linkify', 'inline_image_attrs', curlyAttrs)
}
