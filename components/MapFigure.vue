<script setup lang="ts">
// MapFigure — a themed reference map for art-history slides (empire borders,
// site locations, regions). Renders as crisp, themed SVG so it looks identical
// on screen and in PDF/PNG exports — no raster canvas, so it never blurs under
// Slidev's slide-scaling. Pan (drag) and zoom (wheel) are implemented directly
// on the SVG, so it's interactive *and* sharp.
//
// Pass a GeoJSON FeatureCollection of features. Per-feature properties:
//   • `label` — name, rendered as a label (points below the marker, regions at
//     their centroid).
//   • `date` — free-form string such as "117 CE"; rendered under the label and
//     conveys chronology.
// Polygons/multipolygons draw as filled regions; lines as strokes; points as
// markers. Real coastlines come from a bundled Natural Earth land basemap.
// Colours come from the giornata `--giornata-*` scheme vars exactly like
// StickyNote/Admonition, so dark mode and colour modes work for free.

import { computed, ref, watch } from 'vue'
import type { FeatureCollection, Geometry, Position } from 'geojson'
import { compute_color_scheme } from '../layoutHelper'
import {
  boundsIntersect,
  computeBounds,
  expandBounds,
  geometryToPath,
  makeProjector,
  mercator,
  representativePoint,
  type BBox,
} from './mapFigure/geo'
// Public-domain Natural Earth 50m land (https://www.naturalearthdata.com).
// Bundled so <MapFigure> shows real geography with no setup; opt out with
// `:basemap="null"` or pass your own FeatureCollection.
import basemapLand from './mapFigure/basemap-land.json'

const props = withDefaults(
  defineProps<{
    color?: string
    colorMode?: string
    features?: FeatureCollection
    bounds?: BBox
    height?: string | number
    /** Neutral land basemap. Default = bundled Natural Earth land; `null` disables. */
    basemap?: FeatureCollection | null
    /** Enable pan (drag) / zoom (wheel) / reset (double-click). Default on. */
    interactive?: boolean
    /** Multiplier for label font sizes (1 = default). */
    labelScale?: number
    /** Label halo (text stroke) width as a fraction of font size. 0 = no halo. */
    labelStroke?: number
    /** Multiplier for point-marker size (1 = default). */
    pointScale?: number
    /** Fill opacity of polygon regions, 0–1. */
    regionOpacity?: number
  }>(),
  {
    color: 'white',
    features: undefined,
    bounds: undefined,
    height: '100%',
    basemap: undefined,
    interactive: true,
    labelScale: 1,
    labelStroke: 0.18,
    pointScale: 1,
    regionOpacity: 0.35,
  },
)

const colorscheme = computed(() => compute_color_scheme(props.color, props.colorMode))

const cssHeight = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height,
)

// ---- framing --------------------------------------------------------------
const bbox = computed<BBox | null>(
  () => props.bounds ?? (props.features ? computeBounds(props.features) : null),
)

// A fixed-tall internal coordinate system; width follows the bbox's Mercator
// aspect so `preserveAspectRatio` keeps framing honest without measuring px.
const VB_H = 1000
const SVG_PAD_FRAC = 0.08

const svgView = computed(() => {
  const b = bbox.value
  if (!b) return null
  const [swM, neM] = [mercator(b[0]), mercator(b[1])]
  const aspect = (neM[0] - swM[0]) / Math.max(1e-9, neM[1] - swM[1])
  const w = Math.max(1, VB_H * (Number.isFinite(aspect) ? aspect : 1))
  const pad = Math.min(w, VB_H) * SVG_PAD_FRAC
  return { w, h: VB_H, project: makeProjector(b, w, VB_H, pad) }
})

// ---- pan / zoom -----------------------------------------------------------
const svgRef = ref<SVGSVGElement | null>(null)
const scale = ref(1)
const tx = ref(0)
const ty = ref(0)
const dragging = ref(false)

const contentTransform = computed(() => `translate(${tx.value} ${ty.value}) scale(${scale.value})`)

// Counter-scale for markers and labels so they keep a constant on-screen size
// while the geography scales underneath them on zoom.
const invScale = computed(() => 1 / scale.value)

// Style knobs driven by props. The label halo (stroke) is relative to each
// label's font size so it stays proportional when labelScale changes.
const labelStyles = computed(() => {
  const p = 22 * props.labelScale
  const r = 26 * props.labelScale
  const d = 19 * props.labelScale
  const halo = (fs: number) => `${fs * props.labelStroke}px`
  return {
    point: { fontSize: `${p}px`, strokeWidth: halo(p) },
    region: { fontSize: `${r}px`, strokeWidth: halo(r) },
    date: { fontSize: `${d}px`, strokeWidth: halo(d) },
  }
})
const pointR = computed(() => 13 * props.pointScale)
const pointStrokeW = computed(() => 3 * props.pointScale)
const regionOpacityStyle = computed(() => ({ fillOpacity: props.regionOpacity }))

function resetView() {
  scale.value = 1
  tx.value = 0
  ty.value = 0
}
// Re-frame when the data changes.
watch([() => props.features, () => props.bounds], resetView, { flush: 'post' })

/** Convert a client (screen) coordinate into the SVG's viewBox coordinate. */
function clientToViewBox(cx: number, cy: number): { x: number; y: number } {
  const svg = svgRef.value
  if (!svg) return { x: 0, y: 0 }
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const m = ctm.inverse()
  return { x: m.a * cx + m.c * cy + m.e, y: m.b * cx + m.d * cy + m.f }
}

function onWheel(e: WheelEvent) {
  if (!props.interactive) return
  e.preventDefault()
  const loc = clientToViewBox(e.clientX, e.clientY)
  const factor = Math.exp(-e.deltaY * 0.0015)
  const next = Math.min(12, Math.max(0.5, scale.value * factor))
  const k = next / scale.value
  // keep the point under the cursor fixed while zooming
  tx.value = loc.x - (loc.x - tx.value) * k
  ty.value = loc.y - (loc.y - ty.value) * k
  scale.value = next
}

let lastX = 0
let lastY = 0
function onPointerDown(e: PointerEvent) {
  if (!props.interactive || e.button !== 0) return
  dragging.value = true
  lastX = e.clientX
  lastY = e.clientY
  ;(e.currentTarget as SVGElement).setPointerCapture?.(e.pointerId)
}
function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  const a = clientToViewBox(lastX, lastY)
  const b = clientToViewBox(e.clientX, e.clientY)
  tx.value += b.x - a.x
  ty.value += b.y - a.y
  lastX = e.clientX
  lastY = e.clientY
}
function onPointerUp() {
  dragging.value = false
}

// ---- basemap --------------------------------------------------------------
const basemapFeatures = computed<FeatureCollection | null>(() => {
  if (props.basemap === null) return null
  if (props.basemap) return props.basemap
  return basemapLand as unknown as FeatureCollection
})

const basemapPaths = computed<string[]>(() => {
  const view = svgView.value
  const base = basemapFeatures.value
  const frame = bbox.value
  if (!view || !base || !frame) return []
  // Only draw land overlapping the framed area (plus a margin), so the SVG
  // stays lean instead of containing the entire world's coastline.
  const filter = expandBounds(frame, 0.2)
  const out: string[] = []
  for (const f of base.features) {
    if (!f.geometry) continue
    const fb = computeBounds({ type: 'FeatureCollection', features: [f] })
    if (!fb || !boundsIntersect(fb, filter)) continue
    const d = geometryToPath(f.geometry as Geometry, view.project)
    if (d) out.push(d)
  }
  return out
})

// ---- features -------------------------------------------------------------
interface SvgPoint {
  kind: 'point'
  x: number
  y: number
  label?: string
  date?: string
}
interface SvgPoints {
  kind: 'points'
  pts: [number, number][]
  label?: string
  date?: string
}
interface SvgPath {
  kind: 'path'
  d: string
  filled: boolean
  label?: string
  date?: string
  labelX?: number
  labelY?: number
}
type SvgFeature = SvgPoint | SvgPoints | SvgPath

const svgFeatures = computed<SvgFeature[]>(() => {
  const view = svgView.value
  const fc = props.features
  if (!view || !fc) return []
  const out: SvgFeature[] = []
  for (const f of fc.features) {
    const geom = f.geometry
    if (!geom) continue
    const label = labelOf(f.properties)
    const date = dateOf(f.properties)
    if (geom.type === 'Point') {
      const [x, y] = view.project(geom.coordinates as Position)
      out.push({ kind: 'point', x, y, label, date })
    } else if (geom.type === 'MultiPoint') {
      out.push({
        kind: 'points',
        pts: (geom.coordinates as Position[]).map((c) => view.project(c)),
        label,
        date,
      })
    } else {
      const d = geometryToPath(geom as Geometry, view.project)
      if (d) {
        const rp = representativePoint(geom as Geometry)
        const anchor = rp ? view.project(rp) : undefined
        out.push({
          kind: 'path',
          d,
          filled: geom.type.endsWith('Polygon'),
          label,
          date,
          labelX: anchor?.[0],
          labelY: anchor?.[1],
        })
      }
    }
  }
  return out
})

function labelOf(p: unknown): string | undefined {
  if (p && typeof p === 'object' && 'label' in p) {
    const v = (p as { label?: unknown }).label
    return typeof v === 'string' ? v : v == null ? undefined : String(v)
  }
  return undefined
}

function dateOf(p: unknown): string | undefined {
  if (p && typeof p === 'object' && 'date' in p) {
    const v = (p as { date?: unknown }).date
    return typeof v === 'string' ? v : v == null ? undefined : String(v)
  }
  return undefined
}
</script>

<template>
  <div class="map-figure" :class="colorscheme" :style="{ height: cssHeight }">
    <svg
      ref="svgRef"
      class="mf-svg"
      :class="{ 'mf-grabbable': interactive }"
      :viewBox="`0 0 ${svgView?.w ?? 1} ${svgView?.h ?? 1}`"
      preserveAspectRatio="xMidYMid meet"
      style="touch-action: none"
      @wheel="onWheel"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
      @dblclick="resetView"
    >
      <rect class="mf-bg" :x="0" :y="0" :width="svgView?.w ?? 1" :height="svgView?.h ?? 1" />
      <g :transform="contentTransform">
        <!-- basemap land (geography scales with zoom) -->
        <path
          v-for="(d, i) in basemapPaths"
          :key="`b${i}`"
          class="mf-land"
          vector-effect="non-scaling-stroke"
          :d="d"
        />
        <!-- region / line shapes (geography scales with zoom) -->
        <template v-for="(f, i) in svgFeatures" :key="`s${i}`">
          <path
            v-if="f.kind === 'path'"
            class="mf-region"
            :class="{ 'mf-line-shape': !f.filled }"
            vector-effect="non-scaling-stroke"
            :style="regionOpacityStyle"
            :d="f.d"
          />
          <g v-else-if="f.kind === 'point'" :transform="`translate(${f.x} ${f.y}) scale(${invScale})`">
            <circle class="mf-point" :r="pointR" :style="{ strokeWidth: pointStrokeW + 'px' }" />
          </g>
          <template v-else>
            <g
              v-for="(p, j) in f.pts"
              :key="`p${i}-${j}`"
              :transform="`translate(${p[0]} ${p[1]}) scale(${invScale})`"
            >
              <circle class="mf-point" :r="pointR" :style="{ strokeWidth: pointStrokeW + 'px' }" />
            </g>
          </template>
        </template>
        <!-- markers + labels: counter-scaled so they stay constant size on screen -->
        <template v-for="(f, i) in svgFeatures" :key="`t${i}`">
          <g
            v-if="f.kind === 'path' && f.label && f.labelX != null && f.labelY != null"
            :transform="`translate(${f.labelX} ${f.labelY}) scale(${invScale})`"
          >
            <text class="mf-label mf-label-region" :style="labelStyles.region" x="0" y="0">{{ f.label }}</text>
            <text v-if="f.date" class="mf-label mf-label-date" :style="labelStyles.date" x="0" y="24">{{ f.date }}</text>
          </g>
          <g v-else-if="f.kind === 'point'" :transform="`translate(${f.x} ${f.y}) scale(${invScale})`">
            <text v-if="f.label" class="mf-label" :style="labelStyles.point" x="0" y="36">{{ f.label }}</text>
            <text v-if="f.date" class="mf-label mf-label-date" :style="labelStyles.date" x="0" y="58">{{ f.date }}</text>
          </g>
        </template>
      </g>
    </svg>
    <slot />
  </div>
</template>

<style scoped>
.map-figure {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.mf-svg {
  display: block;
  width: 100%;
  height: 100%;
}

.mf-grabbable {
  cursor: grab;
}
.mf-grabbable:active {
  cursor: grabbing;
}

.mf-bg {
  fill: var(--giornata-bg-color);
}

.mf-land {
  fill: var(--giornata-bg-code-color);
  stroke: var(--giornata-border-color);
  stroke-width: 1;
}

.mf-region {
  fill: var(--giornata-highlight-color);
  fill-opacity: 0.35;
  stroke: var(--giornata-border-color);
  stroke-width: 2;
}

/* LineString / MultiLineString — outline only, no fill. */
.mf-line-shape {
  fill: none;
  stroke: var(--giornata-fg-color);
  stroke-width: 3;
}

.mf-point {
  fill: var(--giornata-mode-accent-color);
  stroke: var(--giornata-bg-color);
  stroke-width: 3;
}

.mf-label {
  fill: var(--giornata-text-color);
  font-size: 22px;
  text-anchor: middle;
  font-family: var(--giornata-main-font);
  paint-order: stroke;
  stroke: var(--giornata-bg-color);
  stroke-width: 4px;
  stroke-linejoin: round;
}

.mf-label-region {
  font-size: 26px;
  font-weight: 600;
}

.mf-label-date {
  font-size: 19px;
  fill: var(--giornata-fg-color);
  opacity: 0.85;
}
</style>
