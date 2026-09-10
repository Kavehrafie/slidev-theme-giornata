<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onActivated } from 'vue'
import type { CSSProperties } from 'vue'
import { useSlideContext } from '@slidev/client/context.ts'
import { compute_color_scheme } from '../layoutHelper'
import deckEvents from 'virtual:giornata-events'

interface TimelineEvent {
  year: number
  label: string
  image?: string
  image_fit?: string
  color?: string
  id?: string
}

// Shape of a `timeline:` frontmatter block and a timeline.yml entry. YAML
// values are loosely typed, so year/label are wider here than in TimelineEvent
// and coerced on read.
interface TimelineFrontmatter {
  year?: string | number
  label?: string
  image?: string
  image_fit?: string
  color?: string
  id?: string
  /** timeline.yml only — group names this context event belongs to. */
  group?: string | string[]
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
    /** Initial date (a year, negative for BCE). See initialRevealCount. */
    initial?: string | number
    /** Groups to pull from the deck's timeline.yml context events. */
    useGroups?: string | string[]
  }>(),
  {
    color: 'white',
    events: null,
  },
)

const slides = computed(() => $slidev.nav.slides)

// Context events from the deck's timeline.yml, indexed by group name — the
// course's full set of background events in one place, selected per timeline
// slide via `useGroups`. An entry may carry several group names; the same
// object is indexed under each, and the aggregator dedupes on selection.
const deckGroups = new Map<string, TimelineFrontmatter[]>()
for (const entry of deckEvents) {
  const groups = Array.isArray(entry.group) ? entry.group : entry.group ? [entry.group] : []
  for (const raw of groups) {
    const name = typeof raw === 'string' ? raw.trim().toLowerCase() : ''
    if (!name) continue
    deckGroups.set(name, [...(deckGroups.get(name) ?? []), entry])
  }
}

// A lowercased name set from a string or string[] prop (null = not set).
const normalize_names = (raw: string | string[] | null | undefined): Set<string> | null => {
  if (raw == null) return null
  const list = (Array.isArray(raw) ? raw : [raw])
    .map(r => (typeof r === 'string' ? r.trim().toLowerCase() : ''))
    .filter(Boolean)
  return list.length ? new Set(list) : null
}

// Flatten one loose timeline.yml entry into a context event — an event with no
// slide of its own (slideNo 0 → marker click is a no-op). Null if no year.
const contextEvent = (e: TimelineFrontmatter | undefined, id: string): FlatEvent | null => {
  if (e?.year == null) return null
  return {
    year: Number(e.year),
    label: String(e.label ?? ''),
    image: e.image,
    image_fit: normalize_fit(e.image_fit),
    color: e.color,
    id,
    slideNo: 0,
  }
}

// A timeline slide placed BEFORE artwork slides caps its rail at the date of
// the next artwork slide in deck order — a mid-lecture timeline never runs
// past where the lecture currently stands (the next artwork is "you are
// here", and its date is included). A timeline after the last artwork slide
// (the end-of-lecture recap) is uncapped. The `:events` override path below
// returns before the cap applies — its slide numbers are positional fakes.
//
// Capture the page number ONCE, non-reactively: making the rail react to
// currentPage would re-render it (and re-register every v-click) when
// navigating away. Layouts mount with their page already current.
const mySlideNo = $slidev.nav.currentPage

// `timeline:` year of the slide at deck index i, if it is an artwork slide.
const timeline_year = (i: number): number | undefined => {
  const t = slides.value[i]?.meta?.slide?.frontmatter?.timeline as TimelineFrontmatter | undefined
  return t && !Array.isArray(t) && t.year != null ? Number(t.year) : undefined
}

const nextArtworkYear = computed(() => {
  // slides are 0-indexed, slide numbers 1-indexed — index mySlideNo is the
  // slide right after this one
  for (let i = mySlideNo; i < slides.value.length; i++) {
    const year = timeline_year(i)
    if (year != null) return year
  }
  return undefined
})

// Where the PREVIOUS timeline slide (nearest `layout: timeline` before this
// one, deck order) stood: the date it was capped to, i.e. its next artwork.
// This timeline initializes its reveal there — the rail begins where the
// story got to (e.g. at the Tennis Court Oath), instead of restarting from
// zero. If the previous timeline was uncapped (an end-of-deck recap that
// already showed everything), or there is no previous timeline, fall back to
// the last artwork before this slide — everything the audience has covered.
const autoInitialYear = computed(() => {
  let prevTimeline = -1
  for (let i = mySlideNo - 2; i >= 0; i--) {
    if (slides.value[i]?.meta?.slide?.frontmatter?.layout === 'timeline') {
      prevTimeline = i
      break
    }
  }
  for (let i = prevTimeline + 1; prevTimeline >= 0 && i < slides.value.length; i++) {
    const year = timeline_year(i)
    if (year != null) return year
  }
  for (let i = mySlideNo - 2; i >= 0; i--) {
    const year = timeline_year(i)
    if (year != null) return year
  }
  return undefined
})

const aggregatedEvents = computed<FlatEvent[]>(() => {
  if (Array.isArray(props.events) && props.events.length) {
    return props.events.map((e, i) => ({
      year: Number(e.year),
      label: String(e.label ?? ''),
      image: e.image,
      image_fit: normalize_fit(e.image_fit),
      color: e.color,
      id: e.id ?? `ev-${i + 1}`,
      slideNo: i + 1,
    }))
  }

  const out: FlatEvent[] = []

  // Context events selected by group name. Selecting two groups that share an
  // entry (group: [revolution, empire]) must not duplicate it — select through
  // a Set of the entry objects themselves.
  const wanted = normalize_names(props.useGroups)
  if (wanted) {
    const selected = new Set<TimelineFrontmatter>()
    for (const [name, entries] of deckGroups) {
      if (!wanted.has(name)) continue
      entries.forEach(e => selected.add(e))
    }
    let gi = 0
    selected.forEach(e => {
      const ev = contextEvent(e, e.id ?? `grp-${++gi}`)
      if (ev) out.push(ev)
    })
  }

  // Artwork slides tagged with `timeline:` frontmatter — the events with a
  // slide of their own (marker click jumps there, image morphs on entry).
  slides.value.forEach((slide, idx) => {
    const fm = slide?.meta?.slide?.frontmatter ?? {}
    const t = fm.timeline as TimelineFrontmatter | undefined
    if (!t || Array.isArray(t)) return
    if (t.year == null) return
    out.push({
      year: Number(t.year),
      label: String(t.label ?? ''),
      image: t.image,
      image_fit: normalize_fit(t.image_fit),
      color: t.color,
      id: t.id ?? `slide-${idx + 1}`,
      slideNo: idx + 1,
    })
  })

  // Positional cap from nextArtworkYear — see its comment above.
  const cap = nextArtworkYear.value
  const scoped = cap == null ? out : out.filter(e => e.year <= cap)
  return scoped.sort((a, b) => a.year - b.year)
})

// Number of events already revealed when the slide is entered (click 0).
// - Explicit `initial` (a year): opens caught up through the first event
//   LATER than that year — that "next" event is the current one.
// - No `initial`: auto-initialize at autoInitialYear (the previous timeline's
//   position) — everything up to AND INCLUDING that year is revealed, since
//   that position is an already-covered artwork; clicking continues past it.
const initialRevealCount = computed(() => {
  const events = aggregatedEvents.value
  const explicit = props.initial
  if (explicit != null && explicit !== '') {
    const year = Number(explicit)
    if (!Number.isFinite(year)) return 0
    const next = events.findIndex(e => e.year > year)
    if (next === -1) return events.length
    return next + 1
  }
  const auto = autoInitialYear.value
  if (auto == null) return 0
  return events.filter(e => e.year <= auto).length
})

// Event i appears on click (i - initialRevealCount + 1). Pre-revealed events
// pass `false`, which the v-click directive treats as "not registered" — they
// are always visible and never hidden. N events → N - initialRevealCount
// clicks (no dead step).
const clickAt = (index: number) =>
  index < initialRevealCount.value ? false : index - initialRevealCount.value + 1

// Index of the newest revealed event at a given click position.
const lastVisibleIndex = (currentClick: number) =>
  Math.min(currentClick + initialRevealCount.value - 1, aggregatedEvents.value.length - 1)

// Highest event index revealed so far this mount — monotonic on purpose:
// navigating away resets $clicks to 0, but the leaving view-transition capture
// must still find the name on events revealed during the visit (and clicking
// backward shouldn't un-pair an already-shown artwork either).
const maxRevealedIndex = ref(-1)
watch(
  $clicks,
  (currentClick) => {
    maxRevealedIndex.value = Math.max(maxRevealedIndex.value, lastVisibleIndex(currentClick))
  },
  { immediate: true },
)

const imgStyle = (ev: FlatEvent, index: number): CSSProperties => ({
  objectFit: (ev.image_fit || 'cover') as CSSProperties['objectFit'],
  objectPosition: 'center',
  // Only artwork events (with a slide) morph. Context/group events have no
  // destination — and a shared group event rendered on two timeline slides
  // would stamp duplicate view-transition names, breaking transitions there.
  // Revealed-only also matters because the browser captures named elements at
  // their unclipped layout rect: an unrevealed (opacity-0) thumbnail sitting
  // beyond the rail's right edge would otherwise pull the artwork morph in
  // from off-screen. See maxRevealedIndex for why eligibility is monotonic.
  viewTransitionName:
    ev.slideNo && index <= maxRevealedIndex.value ? `artwork-${ev.id}` : undefined,
})


// Scheme follows the latest revealed event, falling back to the slide-level color.
const colorscheme = computed(() => {
  const idx = lastVisibleIndex($clicks.value)
  const ev = idx >= 0 ? aggregatedEvents.value[idx] : undefined
  if (ev?.color) return compute_color_scheme(ev.color, props.colorMode)
  return compute_color_scheme(props.color, props.colorMode)
})

const eventRefs = ref<HTMLElement[]>([])
const containerRef = ref<HTMLElement | null>(null)

const formatYear = (y: number) => (y < 0 ? `${Math.abs(y)} BCE` : `${y}`)

const go = (slideNo?: number) => {
  if (slideNo && slideNo >= 1) $slidev.nav.go(slideNo)
}

// Breathing room between a pinned event and the viewport's right edge: the
// trailing spacer column (3rem) plus its column gap (1.5rem). An event pinned
// mid-rail then sits as far from the right edge as the first event sits from
// the left, instead of flush against the slide edge.
const RAIL_RIGHT_PAD = 72 // px

// Scroll the rail so the anchor's right edge sits RAIL_RIGHT_PAD inside the
// viewport, clamped to the rail's scroll range. Manual math instead of
// scrollIntoView({inline:'end'}), which pins the anchor flush against the
// right edge with no offset.
const pin_anchor = (anchor: HTMLElement, behavior: ScrollBehavior) => {
  const container = containerRef.value
  if (!container) return
  const target = anchor.offsetLeft + anchor.offsetWidth - container.clientWidth + RAIL_RIGHT_PAD
  const max = container.scrollWidth - container.clientWidth
  container.scrollTo({ left: Math.max(0, Math.min(target, max)), behavior })
}

watch($clicks, async (currentClick) => {
  await nextTick()

  // Pin the last (rightmost) visible event near the end of the viewport.
  // Works for both forward (new event slides in at right) and backward (right
  // edge collapses to the previous event). Nothing revealed yet → nothing to
  // pin; entry positioning is pin_to_current's job. There is deliberately no
  // scroll reset on navigate-away — it churns invisibly and only races the
  // view-transition capture.
  const anchor = eventRefs.value[lastVisibleIndex(currentClick)]
  if (!anchor) return

  pin_anchor(anchor, 'smooth')
})

// Entering or re-entering the slide: jump the rail (instantly, no animation)
// to wherever the reveal currently stands so the slide opens showing where
// "now" is. Covers forward entry with a pre-revealed rail, and backward
// re-entry — Slidev restores the slide's final click state, but $clicks is
// unchanged since the visit so the watch above never fires, and the rail
// would otherwise sit at scroll 0 with revealed events piled off the right
// edge (the next back-press then "jumped" one event).
const pin_to_current = () => {
  const anchor = eventRefs.value[lastVisibleIndex($clicks.value)]
  if (anchor) pin_anchor(anchor, 'instant')
}

onMounted(async () => {
  await nextTick()
  pin_to_current()
})

// If the page instance is cached (keep-alive), onMounted doesn't re-run on
// re-entry — onActivated covers that path; harmless no-op without keep-alive.
onActivated(() => pin_to_current())
</script>

<template>
  <div class="slidev-layout timeline slidecolor" :class="[colorscheme]">
    <div v-if="$slots.default" class="timeline-slot">
      <slot />
    </div>

    <div ref="containerRef" class="timeline-rail">
      <div class="timeline-line" />

      <div v-if="!aggregatedEvents.length" class="timeline-empty">
        No events found. Tag artwork slides with <code>timeline: &#123; year, label &#125;</code>, list context events in
        <code>timeline.yml</code> and pull them in with <code>useGroups</code>, or pass <code>:events</code> explicitly.
      </div>

      <!-- Per-event v-click: event i appears on click (i - initialRevealCount + 1).
           Pre-revealed events pass `false` (never registered, always visible).
           N events → N - initialRevealCount clicks (no dead step). -->
      <div
        v-for="(ev, index) in aggregatedEvents"
        :key="ev.id"
        :ref="
          (el) => {
            if (el) eventRefs[index] = el as HTMLElement
          }
        "
        v-click="clickAt(index)"
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
            :style="imgStyle(ev, index)"
            loading="eager"
            decoding="async"
            draggable="false"
          />
          <div class="timeline-meta">
            <div class="timeline-year">{{ formatYear(ev.year) }}</div>
            <div class="timeline-label">{{ ev.label }}</div>
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
  /* width MUST stay slide-constrained: with max-content the rail grows to its
     full content width and never scrolls itself (the overflow:hidden .timeline
     parent becomes the de-facto scroller, which pin_anchor's scrollTo on the
     rail can't reach) */
  width: 100%;
  height: 100%;
  gap: 0 1.5rem;
  padding: 1.5rem 0;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
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
  /* Calmer reveal than the global 100ms v-click fade — the card fades in as
     the rail slides it into view. Images are eager-loaded (see the <img>), so
     opacity is the only thing animating here. */
  transition: opacity 300ms ease;
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
</style>
