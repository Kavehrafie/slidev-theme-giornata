<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useSlideContext } from '@slidev/client'
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

// Events use individual v-click directives: index 0 === "+0" (always active),
// index 1 === 1, index 2 === 2, …  So N events → N-1 click steps, no dead click.
const props = defineProps({
  color: { default: 'white' },
  colorMode: { default: undefined },
  events: { default: null as TimelineEvent[] | null },
})

const slides = computed(() => ($slidev.nav as any)?.slides || [])

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
    if (!slide) return
    const fm = slide?.meta?.slide?.frontmatter || slide?.frontmatter || {}
    const t = fm.timeline
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

const colorscheme = computed(() => {
  // click n retunes palette to event n (0-based, clamped to last event).
  // Event 0 is pre-revealed; events 1..N each need a click.
  const click = $clicks.value
  const idx = Math.min(click, Math.max(0, aggregatedEvents.value.length - 1))
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

// rAF-based smooth scroll with ease-out quartic — unlike element.scrollTo({behavior:'smooth'})
// this cannot be interrupted mid-flight by class/style churn from click reveals
const smoothScrollTo = (element: HTMLElement, targetScrollLeft: number, duration = 700) => {
  const startScrollLeft = element.scrollLeft
  const distance = targetScrollLeft - startScrollLeft
  if (!distance) return
  let startTime: number | null = null
  const easeOutQuartic = (t: number) => 1 - Math.pow(1 - t, 4)
  const step = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const progress = Math.min((currentTime - startTime) / duration, 1)
    element.scrollLeft = startScrollLeft + distance * easeOutQuartic(progress)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

watch($clicks, async (currentClick) => {
  await nextTick()
  const container = containerRef.value
  if (!container || !eventRefs.value.length) return
  if (currentClick === 0) {
    smoothScrollTo(container, 0, 500)
    return
  }
  // bring the newest revealed event into view, pinned left-of-center.
  // event 0 is pre-revealed, so click n reveals event n (0-based)
  const idx = Math.min(currentClick, eventRefs.value.length - 1)
  const target = eventRefs.value[idx]
  if (target) {
    const maxScroll = container.scrollWidth - container.clientWidth
    const offset = target.offsetLeft - container.clientWidth * 0.45 + target.offsetWidth / 2
    smoothScrollTo(container, Math.max(0, Math.min(offset, maxScroll)))
  }
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

      <!-- Each event registers its own v-click: index 0 at "+0" (always active,
           never hidden), indices 1..N at their absolute click position.  This
           produces exactly N-1 click steps for N events — no dead first click. -->
      <div
        v-for="(ev, index) in aggregatedEvents"
        :key="ev.id"
        :ref="
          (el) => {
            if (el) eventRefs[index] = el as HTMLElement
          }
        "
        v-click="index === 0 ? '+0' : index"
        class="timeline-event"
        :class="[index % 2 === 0 ? 'is-above' : 'is-below', index === 0 ? 'is-first' : '']"
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
            :style="{
              objectFit: ev.image_fit || 'cover',
              objectPosition: 'center',
              viewTransitionName: `artwork-${ev.id}`,
            }"
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
  transition: opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

/* Slidev hides unrevealed v-click targets with opacity: 0 !important.
   The documented design keeps unrevealed events dimmed (spine stays visible)
   and their markers clickable, so override both here (scoped, higher specificity).
   The opacity transition on .timeline-event makes the reveal a fade-in. */
.timeline-event.slidev-vclick-hidden {
  opacity: 0.22 !important;
  pointer-events: auto !important;
}

/* first event is always revealed */
.timeline-event.is-first.slidev-vclick-hidden {
  opacity: 1 !important;
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
}

.timeline-img {
  width: 100%;
  height: 130px;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, var(--giornata-text-color) 20%, transparent);
  background: var(--giornata-bg-color);
  display: block;
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
