/// <reference types="@slidev/types/client" />
/// <reference path="./node_modules/@slidev/client/shim-vue.d.ts" />

// Slidev injects these constants at build time via Vite `define`. They are not
// declared anywhere in a .d.ts, so declare them here to keep the standalone
// type-check of theme code (and the Slidev client source it imports) clean.
declare const __DEV__: boolean
declare const __SLIDEV_FEATURE_EDITOR__: boolean
declare const __SLIDEV_HAS_SERVER__: boolean
declare const __SLIDEV_HASH_ROUTE__: boolean
declare const __SLIDEV_FEATURE_DRAWINGS_PERSIST__: boolean

// `file-saver` is an optional transitive dependency of `@slidev/client` and
// ships no types. Declare a minimal module so the client source type-checks.
declare module 'file-saver'

// These markdown-it plugins ship no type declarations. Type them as upstream
// markdown-it plugins so they are compatible with the `md.use(...)` calls in
// vite.config.ts (where `md` is cast to upstream `MarkdownIt` — see note there).
declare module 'markdown-it-mark' {
  import type { PluginSimple } from 'markdown-it'
  const plugin: PluginSimple
  export default plugin
}

declare module 'markdown-it-implicit-figures' {
  import type { PluginWithOptions } from 'markdown-it'
  interface ImplicitFiguresOptions {
    figcaption?: boolean
    lazyLoading?: boolean
    dataType?: boolean
    figcaptionClass?: string
    figcaptionPosition?: string
    [key: string]: unknown
  }
  const plugin: PluginWithOptions<ImplicitFiguresOptions>
  export default plugin
}
