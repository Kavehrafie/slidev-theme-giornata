// Theme vite plugins that need Slidev context. Slidev loads this file from
// every root (deck, addons, themes) and passes the resolved Slidev options —
// unlike vite.config.ts, which is merged but receives nothing deck-specific.
import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { parse } from 'yaml'

const VIRTUAL_ID = 'virtual:giornata-events'

// The slice of SlidevOptions this file needs (kept loose — the full type is
// internal to @slidev/cli).
interface SlidevOptions {
  userRoot: string
  data?: { headmatter?: Record<string, unknown> }
}

// Deck-local timeline context events, served to layouts/timeline.vue as a
// virtual module — the browser can't read deck files at runtime, so this
// bridges build-time fs to the layout.
//
// Which file, in priority order:
//   1. `timeline_yml:` in deck headmatter — explicit path relative to the
//      deck root; `false` disables context events entirely
//   2. timeline.yml / timeline.yaml at the deck root (default)
export default function giornataVitePlugins(options: SlidevOptions): Plugin[] {
  return [
    {
      name: 'giornata:timeline-events',
      resolveId(id) {
        if (id === VIRTUAL_ID) return '\0' + VIRTUAL_ID
      },
      load(id) {
        if (id !== '\0' + VIRTUAL_ID) return

        const fromHeadmatter = options.data?.headmatter?.timeline_yml
        if (fromHeadmatter === false) return 'export default []'

        let file: string | undefined
        if (typeof fromHeadmatter === 'string' && fromHeadmatter.trim()) {
          file = path.resolve(options.userRoot, fromHeadmatter.trim())
          if (!fs.existsSync(file)) {
            console.warn(`[giornata] timeline_yml: ${fromHeadmatter} not found — no context events loaded`)
            return 'export default []'
          }
        } else {
          file = ['timeline.yml', 'timeline.yaml']
            .map(f => path.resolve(options.userRoot, f))
            .find(f => fs.existsSync(f))
          if (!file) return 'export default []'
        }

        // watch the YAML so edits hot-update the timeline without a restart
        this.addWatchFile(file)
        // a grouped mapping ({revolution: [...]}) is not a supported shape —
        // the file is a flat list; anything else degrades to "no events"
        const entries = parse(fs.readFileSync(file, 'utf-8'))
        return `export default ${JSON.stringify(Array.isArray(entries) ? entries : [])}`
      },
    },
  ]
}
