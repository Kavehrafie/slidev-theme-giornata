<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { useSlideContext } from '@slidev/client/context.ts'
import { compute_color_scheme } from '../layoutHelper'

interface TimelineEvent {
  year: number
  label: string
  region?: string
  image?: string
  image_fit?: string
  color?: string
  id?: string
}

// Shape of a `timeline:` frontmatter block. YAML values are loosely typed, so
// year/label are wider here than in TimelineEvent and coerced on read.
interface TimelineFrontmatter {
  year?: string | number
  label?: string
  region?: string
  image?: string
  image_fit?: string
  color?: string
  id?: string
}

interface FlatEvent extends TimelineEvent {
  slideNo: number
}

const VALID_FIT = ['cover', 'contain', 'fill', 'scale-down', 'none'] as const
type FitValue = (typeof VALID_FIT)[number]

const normalize_fit = (v: unknown): FitValue | undefined => {
  if (typeof v !== 'string') return undefined
  const lower = v.trim().toLowerCase() as FitValue
  return (VALID_FIT as readonly string[]).includes(lower) ? lower : undefined
}

const { $slidev, $clicks } = useSlideContext()

const props = withDefaults(
  defineProps<{
    color?: string
    colorMode?: string
    events?: TimelineEvent[] | null
  }>(),
  {
    color: 'white',
    events: null,
  },
)

const slides = computed(() => $slidev.nav.slides)

const aggregatedEvents = computed<FlatEvent[]>(() => {
  if (Array.isArray(props.events) && props.events.length) {
    return props.events.map((e, i) => ({
      year: Number(e.year),
      label: String(e.label ?? ''),
      region: e.region,
      image: e.image,
      image_fit: normalize_fit(e.image_fit),
      color: e.color,
      id: e.id ?? `ev-${i + 1}`,
      slideNo: i + 1,
    }))
  }
  const out: FlatEvent[] = []
  slides.value.forEach((slide, idx) => {
    const fm = slide?.meta?.slide?.frontmatter ?? {}
    const t = fm.timeline as TimelineFrontmatter | undefined
    if (!t || Array.isArray(t)) return
    if (t.year == null) return
    out.push({
      year: Number(t.year),
      label: String(t.label ?? ''),
      region: t.region,
      image: t.image,
      image_fit: normalize_fit(t.image_fit),
      color: t.color,
      id: t.id ?? `slide-${idx + 1}`,
      slideNo: idx + 1,
    })
  })
  return out.sort((a, b) => a.year - b.year)
})

const imgStyle = (ev: FlatEvent): CSSProperties => ({
  objectFit: (ev.image_fit || 'cover') as CSSProperties['objectFit'],
  objectPosition: 'center',
  viewTransitionName: `artwork-${ev.id}`,
})


// Scheme follows the latest revealed event, falling back to the slide-level color.
const colorscheme = computed(() => {
  // <v-clicks>: event 0 visible at click 0, event N visible at click N.
  // The newest revealed event is at index (currentClick).
  const idx = Math.min($clicks.value, Math.max(0, aggregatedEvents.value.length - 1))
  const ev = aggregatedEvents.value[idx]
  if (ev?.color) return compute_color_scheme(ev.color, props.colorMode)
  return compute_color_scheme(props.color, props.colorMode)
})

const eventRefs = ref<HTMLElement[]>([])
const containerRef = ref<HTMLElement | null>(null)

const formatYear = (y: number) => (y < 0 ? `${Math.abs(y)} BCE` : `${y}`)

const go = (slideNo?: number) => {
  if (slideNo && slideNo >= 1) $slidev.nav.go(slideNo)
}

watch($clicks, async (currentClick) => {
  await nextTick()

  const container = containerRef.value
  if (!container) return

  if (currentClick === 0) {
    container.scrollTo({ left: 0, behavior: 'smooth' })
    return
  }

  // <v-clicks>: click 0 → first child visible.  click N → children 0..N visible.
  // Always pin the last (rightmost) visible event at the end of the viewport.
  // Works for both forward (new event slides in at right) and backward (right
  // edge collapses to the previous event).
  const lastVisibleIdx = Math.min(currentClick, eventRefs.value.length - 1)
  const anchor = eventRefs.value[lastVisibleIdx]
  if (!anchor) return

  anchor.scrollIntoView({ behavior: 'smooth', inline: 'end', block: 'nearest' })
})
</script>

<template>
  <div class="slidev-layout timeline slidecolor" :class="[colorscheme]">
    <div v-if="$slots.default" class="timeline-slot">
      <slot />
    </div>

    <div ref="containerRef" class="timeline-rail">
      <div class="timeline-line" />

      <div v-if="!aggregatedEvents.length" class="timeline-empty">
        No <code>timeline:</code> slides found. Add <code>timeline: {"{"} year, label {"}"}</code> to artwork slides, or
        pass <code>:events</code> explicitly.
      </div>

      <!-- <v-clicks> wrapper: first event always visible, each subsequent
           click reveals the next event.  N events → N clicks (no dead step). -->
      <v-clicks>
        <div
          v-for="(ev, index) in aggregatedEvents"
          :key="ev.id"
          :ref="
            (el) => {
              if (el) eventRefs[index] = el as HTMLElement
            }
          "
          class="timeline-event"
          :class="[index % 2 === 0 ? 'is-above' : 'is-below']"
          :style="{ gridColumnStart: index + 2 }"
        >
        <button
          type="button"
          class="timeline-marker"
          :title="`${formatYear(ev.year)} — ${ev.label}`"
          @click="go(ev.slideNo)"
        />

        <div class="timeline-card">
          <img
            v-if="ev.image"
            :src="ev.image"
            :alt="ev.label"
            class="timeline-img"
            :style="imgStyle(ev)"
            loading="lazy"
            draggable="false"
          />
          <div class="timeline-meta">
            <div class="timeline-year">{{ formatYear(ev.year) }}</div>
            <div class="timeline-label">{{ ev.label }}</div>
            <div v-if="ev.region" class="timeline-region">{{ ev.region }}</div>
          </div>
        </div>
      </div>
      </v-clicks>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  padding: 0;
  overflow: hidden;
}

.timeline-slot {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  z-index: 30;
  max-width: 45%;
  pointer-events: none;
}

.timeline-rail {
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  /* fixed-width columns: the rail overflows (and auto-scrolls) once there are
     more events than fit the slide, instead of stretching columns to fill */
  grid-template-columns: 3rem repeat(v-bind('aggregatedEvents.length'), 200px) 3rem;
  width: max-content;
  min-width: 100%;
  height: 100%;
  gap: 0 1.5rem;
  padding: 1.5rem 0;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
}

.timeline-rail::-webkit-scrollbar {
  height: 6px;
}
.timeline-rail::-webkit-scrollbar-track {
  background: transparent;
}
.timeline-rail::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--giornata-text-color) 25%, transparent);
  border-radius: 3px;
}

.timeline-line {
  grid-row: 2;
  grid-column: 1 / -1;
  height: 2px;
  background: color-mix(in srgb, var(--giornata-text-color) 35%, transparent);
  align-self: center;
  z-index: 0;
  pointer-events: none;
}

.timeline-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.85rem;
  color: var(--giornata-text-color);
  opacity: 0.7;
  text-align: center;
  max-width: 60%;
  line-height: 1.5;
}

.timeline-empty code {
  background: color-mix(in srgb, var(--giornata-text-color) 12%, transparent);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  font-size: 0.85em;
}

.timeline-event {
  position: relative;
  grid-row: 1 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0;
  overflow: hidden;
  scroll-snap-align: center;
}

.timeline-event.is-above {
  justify-content: flex-start;
  padding-top: 1.5rem;
}

.timeline-event.is-below {
  justify-content: flex-end;
  padding-bottom: 1.5rem;
}

/* Unrevealed events are fully hidden — no dimmed "blot" state.
   Keep pointer-events alive so markers remain clickable (author can still
   jump to any slide by clicking its marker even before the event is revealed). */
.timeline-event.slidev-vclick-hidden {
  pointer-events: auto !important;
}

.timeline-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: var(--giornata-bg-color);
  border: 3px solid var(--giornata-mode-accent-color, var(--giornata-accent));
  z-index: 2;
  cursor: pointer;
  padding: 0;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 220ms ease,
    border-color 220ms ease;
}

.timeline-marker:hover {
  transform: translate(-50%, -50%) scale(1.35);
}

.timeline-card {
  width: 100%;
  max-width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  pointer-events: none;
  min-height: 0;
  overflow: hidden;
}

.timeline-img {
  width: 100%;
  max-height: 130px;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--giornata-text-color) 20%, transparent);
  background: var(--giornata-bg-color);
  display: block;
  flex-shrink: 1;
  min-height: 0;
}

.timeline-meta {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.timeline-year {
  font-family: var(--giornata-mono-font, ui-monospace, monospace);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--giornata-mode-accent-color, var(--giornata-accent));
  letter-spacing: 0.02em;
}

.timeline-label {
  font-family: var(--giornata-main-font, system-ui, sans-serif);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--giornata-text-color);
  line-height: 1.25;
}

.timeline-region {
  font-family: var(--giornata-main-font, system-ui, sans-serif);
  font-size: 0.66rem;
  font-style: italic;
  color: var(--giornata-text-color);
  opacity: 0.7;
  line-height: 1.2;
}
</style>
