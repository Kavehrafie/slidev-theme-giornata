<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client/context.ts'

interface SessionMeta {
  week?: number
  day?: string
  date?: string
  label?: string
}

type SessionPlacement = 'tr' | 'tl' | 'br' | 'bl'

const { $slidev } = useSlideContext()

// Custom deck-level headmatter keys that Slidev's `configs` type doesn't know
// about. Narrow `$slidev.configs` to include them rather than erasing to `any`.
type GiornataDeckConfigs = typeof $slidev.configs & {
  giornata_slug?: string
  session_placement?: SessionPlacement | false
}

const slides = computed(() => $slidev.nav.slides)
const currentPage = computed(() => $slidev.nav.currentPage)
const total = computed(() => $slidev.nav.total)
const configs = computed(() => $slidev.configs as GiornataDeckConfigs)

const frontmatterAt = (slideNo: number) => {
  const slide = slides.value[slideNo - 1]
  return slide?.meta?.slide?.frontmatter ?? {}
}

const currentFm = computed(() => frontmatterAt(currentPage.value))

const session = computed<SessionMeta | null>(() => {
  for (let i = currentPage.value; i >= 1; i--) {
    const fm = frontmatterAt(i)
    if (fm.session) return fm.session as SessionMeta
  }
  return null
})

const deckLabel = computed(() => configs.value.giornata_slug || '')

const placement = computed<string | null>(() => {
  const v =
    (currentFm.value.session_placement as SessionPlacement | false | undefined) ??
    configs.value.session_placement ??
    'br'
  return v === false ? null : v
})

// Neversink-style color resolution: read the slide's `color` frontmatter
// and produce Tailwind utility classes (bg-{color}-{shade} + text-{color}-{shade})
// that give the chrome a strong, scheme-driven color identity. This matches
// the look of the old slide-bottom.vue pill so the chrome visibly tracks the
// slide color instead of staying neutral.
const FG_DEFAULT = 'text-neutral-800'
const BG_DEFAULT = 'bg-neutral-100'

const colorClasses = computed(() => {
  const color = currentFm.value.color
  if (!color) return { fg: FG_DEFAULT, bg: BG_DEFAULT }

  if (color === 'black') return { fg: 'text-gray-600', bg: 'bg-gray-100' }
  if (color === 'white') return { fg: FG_DEFAULT, bg: BG_DEFAULT }
  if (color === 'dark') return { fg: 'text-gray-100', bg: 'bg-gray-500' }
  if (color === 'navy') return { fg: 'text-gray-300', bg: 'bg-gray-600' }
  if (color === 'light') return { fg: 'text-neutral-600', bg: 'bg-neutral-300' }

  if (color.includes('-light')) {
    const parts = color.split('-')
    const base = parts[0]
    return { fg: `text-${base}-100`, bg: `bg-${base}-500` }
  }

  return { fg: `text-${color}-500`, bg: `bg-${color}-100` }
})

const sessionLine = computed(() => {
  if (!session.value) return ''
  if (session.value.label) return session.value.label
  const parts: string[] = []
  if (session.value.week != null) parts.push(`W${session.value.week}`)
  if (session.value.day) parts.push(session.value.day)
  if (session.value.date) parts.push(session.value.date)
  return parts.join(' · ')
})
</script>

<template>
  <div
    v-if="placement"
    class="session-chrome"
    :class="[`sc-${placement}`, colorClasses.fg, colorClasses.bg]"
    aria-label="Session and slide"
  >
    <span v-if="deckLabel" class="sc-deck">{{ deckLabel }} ·</span>
    <span v-if="sessionLine" class="sc-session">{{ sessionLine }}</span>
    <span class="sc-sep">·</span>
    <span class="sc-counter">
      <span class="sc-current">{{ currentPage }}</span><span class="sc-counter-sep">/</span><span class="sc-total">{{ total }}</span>
    </span>
  </div>
</template>

<style scoped>
/* One-line chip with strong scheme-driven color (neversink-style bg/text
   classes resolve to the slide's color palette). Compact, opaque, no shadow. */
.session-chrome {
  position: absolute;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.4em;
  padding: 0.28rem 0.6rem;
  font-family: var(--giornata-font-sans, system-ui, sans-serif);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1;
  border-radius: 9999px;
  white-space: nowrap;
  pointer-events: auto;
  user-select: none;
}

.sc-deck {
  font-weight: 500;
  opacity: 0.7;
}

.sc-session {
  font-weight: 700;
}

.sc-sep {
  opacity: 0.4;
  font-weight: 400;
}

.sc-counter {
  font-family: var(--giornata-font-mono, ui-monospace, monospace);
  font-weight: 500;
  letter-spacing: 0.04em;
  opacity: 0.85;
}

.sc-current { font-weight: 700; }
.sc-counter-sep { opacity: 0.5; margin: 0 0.1em; }
.sc-total { opacity: 0.7; }

.sc-tr { top: 0.9rem; right: 1.1rem; }
.sc-tl { top: 0.9rem; left: 1.1rem; }
.sc-br { bottom: 0.9rem; right: 1.1rem; }
.sc-bl { bottom: 0.9rem; left: 1.1rem; }
</style>
