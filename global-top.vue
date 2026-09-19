<template>
  <SessionChrome />
  <Asterisk v-if="importantPos" :position="importantPos" />
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useSlideContext } from '@slidev/client/context.ts'
import SessionChrome from './components/SessionChrome.vue'
import Asterisk, { ASTERISK_POSITIONS, type AsteriskPosition } from './components/Asterisk.vue'

const { $slidev, $page } = useSlideContext()

const MORPH_ATTR = 'data-morph-id'

interface TimelineFrontmatter {
  id?: string
}

function syncMorphTarget() {
  const idx = ($page.value ?? 1) - 1
  const slide = $slidev.nav.slides[idx]
  const fm = slide?.meta?.slide?.frontmatter ?? {}
  const t = fm.timeline as TimelineFrontmatter | undefined
  const timelineId = t && !Array.isArray(t) && typeof t === 'object' ? t.id : null

  const pageEl =
    document.querySelector<HTMLElement>(`.slidev-page[data-slidev-no="${idx + 1}"]`) ||
    document.querySelector<HTMLElement>('.slidev-current-page') ||
    document

  // Resolve explicit data-morph-id — may be on <figure> (block image) or <img> (inline).
  // Always target the <img> so view-transition-name matches the timeline thumbnail <img>.
  const explicitEl = pageEl.querySelector<HTMLElement>(`[${MORPH_ATTR}]`)
  const morphId = explicitEl?.getAttribute(MORPH_ATTR) ?? timelineId
  if (!morphId) return

  const morphTarget: HTMLElement | null =
    explicitEl?.tagName === 'IMG'
      ? explicitEl
      : (explicitEl?.querySelector<HTMLElement>('img') ??
        pageEl.querySelector<HTMLElement>('figure img') ??
        pageEl.querySelector<HTMLElement>('.slidev-layout img'))

  if (morphTarget) morphTarget.style.viewTransitionName = `artwork-${morphId}`
}

onMounted(syncMorphTarget)
watch($page, syncMorphTarget, { flush: 'post' })

// `important` frontmatter stamps an asterisk marker on the slide at the given
// position, using the same lt/lm/lb/ct/cm/cb/rt/rm/rb vocabulary as `align`.
// Absent frontmatter means no marker. Lives here (not in each layout) so it
// works on every layout, including future ones, exactly like SessionChrome.
const isAsteriskPosition = (v: unknown): v is AsteriskPosition =>
  typeof v === 'string' && (ASTERISK_POSITIONS as readonly string[]).includes(v)

const importantPos = computed<AsteriskPosition | null>(() => {
  const idx = ($page.value ?? 1) - 1
  const slide = $slidev.nav.slides[idx]
  const v = slide?.meta?.slide?.frontmatter?.important
  return isAsteriskPosition(v) ? v : null
})
</script>
