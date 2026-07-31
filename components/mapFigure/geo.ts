// geo.ts — pure, dependency-free GeoJSON helpers for MapFigure.
//
// The SVG export path needs to draw the same features MapLibre shows, framed
// the same way. MapLibre renders in Web Mercator (EPSG:3857), so the projector
// here uses the spherical Mercator forward transform too — geometry is
// identical between the two renderers, only the framing (fit/contain) differs
// in rounding. Everything is SSR-safe: no `window`, no `document`, no async.

import type { FeatureCollection, Geometry, Position } from 'geojson'

/** Bounding box as [[west, south], [east, north]]. */
export type BBox = [[number, number], [number, number]]

/** Web Mercator limit — beyond this `tan(π/4 + lat/2)` blows up to Infinity. */
const MAX_LAT = 85.05112878
const DEG = Math.PI / 180

/**
 * Spherical Mercator forward projection. The Earth-radius scale factor is
 * dropped because it is uniform on both axes — it cancels when we normalize to
 * a viewport, so the result is conformally correct without it.
 */
export function mercator([lon, lat]: Position): [number, number] {
  const clampedLat = Math.max(-MAX_LAT, Math.min(MAX_LAT, lat))
  return [lon * DEG, Math.log(Math.tan(Math.PI / 4 + (clampedLat * DEG) / 2))]
}

/** A function that maps a [lon, lat] position into an SVG [x, y] pixel pair. */
export type Projector = (p: Position) => [number, number]

/**
 * Scan every coordinate of every feature and return its bounding box.
 * Handles all GeoJSON geometry types including GeometryCollection. Tiny
 * extents (a single point, or a line of constant latitude) are padded by ±1°
 * so the projector has a non-zero span to frame.
 */
export function computeBounds(fc: FeatureCollection): BBox | null {
  let minLon = Infinity
  let minLat = Infinity
  let maxLon = -Infinity
  let maxLat = -Infinity
  let saw = false

  const visit = (p: Position) => {
    saw = true
    if (p[0] < minLon) minLon = p[0]
    if (p[0] > maxLon) maxLon = p[0]
    if (p[1] < minLat) minLat = p[1]
    if (p[1] > maxLat) maxLat = p[1]
  }

  const walk = (g: Geometry | undefined) => {
    if (!g) return
    switch (g.type) {
      case 'Point':
        visit(g.coordinates)
        break
      case 'MultiPoint':
      case 'LineString':
        g.coordinates.forEach(visit)
        break
      case 'MultiLineString':
      case 'Polygon':
        g.coordinates.forEach((ring) => ring.forEach(visit))
        break
      case 'MultiPolygon':
        g.coordinates.forEach((poly) => poly.forEach((ring) => ring.forEach(visit)))
        break
      case 'GeometryCollection':
        g.geometries.forEach(walk)
        break
    }
  }

  fc.features.forEach((f) => walk(f.geometry))
  if (!saw) return null

  if (maxLon - minLon < 1e-6) {
    const c = (minLon + maxLon) / 2
    minLon = c - 1
    maxLon = c + 1
  }
  if (maxLat - minLat < 1e-6) {
    const c = (minLat + maxLat) / 2
    minLat = c - 1
    maxLat = c + 1
  }
  return [[minLon, minLat], [maxLon, maxLat]]
}

/** Do two lon/lat bounding boxes overlap? Both assumed [[W,S],[E,N]]. */
export function boundsIntersect(a: BBox, b: BBox): boolean {
  return a[0][0] <= b[1][0] && a[1][0] >= b[0][0] && a[0][1] <= b[1][1] && a[1][1] >= b[0][1]
}

/** Expand a bbox outward by `frac` of its width/height on each side. */
export function expandBounds(b: BBox, frac: number): BBox {
  const [[w, s], [e, n]] = b
  const dw = (e - w) * frac
  const dh = (n - s) * frac
  return [
    [w - dw, s - dh],
    [e + dw, n + dh],
  ]
}

/**
 * Build a projector that fits `bbox` (contain semantics — the whole box is
 * visible, centered, with `padding` of frame on every side) into a `width` ×
 * `height` viewport. y is flipped so north points up, matching MapLibre. The
 * bbox corners are normalized with min/max so a swapped [[E,N],[W,S]] argument
 * still frames correctly.
 */
export function makeProjector(bbox: BBox, width: number, height: number, padding: number): Projector {
  const [sw, ne] = bbox
  const [ax0, ay0] = mercator(sw)
  const [ax1, ay1] = mercator(ne)
  const minX = Math.min(ax0, ax1)
  const maxX = Math.max(ax0, ax1)
  const minY = Math.min(ay0, ay1)
  const maxY = Math.max(ay0, ay1)
  const mw = Math.max(1e-9, maxX - minX)
  const mh = Math.max(1e-9, maxY - minY)
  const scale = Math.min((width - 2 * padding) / mw, (height - 2 * padding) / mh)
  const offX = padding + (width - 2 * padding - mw * scale) / 2
  const offY = padding + (height - 2 * padding - mh * scale) / 2
  return ([lon, lat]) => {
    const [mx, my] = mercator([lon, lat])
    return [offX + (mx - minX) * scale, height - (offY + (my - minY) * scale)]
  }
}

/**
 * A rough representative point (arithmetic mean of every coordinate) for
 * anchoring a region's label. Not area-weighted and ignores the antimeridian,
 * but good enough for placing a label inside a roughly-convex region.
 */
export function representativePoint(geom: Geometry): Position | null {
  let sx = 0
  let sy = 0
  let n = 0
  const acc = (p: Position) => {
    sx += p[0]
    sy += p[1]
    n++
  }
  switch (geom.type) {
    case 'Point':
      return geom.coordinates
    case 'MultiPoint':
    case 'LineString':
      geom.coordinates.forEach(acc)
      break
    case 'MultiLineString':
    case 'Polygon':
      geom.coordinates.forEach((ring) => ring.forEach(acc))
      break
    case 'MultiPolygon':
      geom.coordinates.forEach((poly) => poly.forEach((ring) => ring.forEach(acc)))
      break
    case 'GeometryCollection':
      return geom.geometries[0] ? representativePoint(geom.geometries[0]) : null
  }
  return n ? [sx / n, sy / n] : null
}

/** Build an SVG path `d` for a line or polygon geometry. Returns null for points. */
export function geometryToPath(
  geom: Geometry,
  project: Projector,
): string | null {
  switch (geom.type) {
    case 'LineString':
      return lineToPath(geom.coordinates, project)
    case 'MultiLineString':
      return geom.coordinates
        .map((c) => lineToPath(c, project))
        .filter(Boolean)
        .join(' ')
    case 'Polygon':
      return polygonToPath(geom.coordinates, project)
    case 'MultiPolygon':
      return geom.coordinates.map((p) => polygonToPath(p, project)).join(' ')
    default:
      // Point / MultiPoint are rendered as <circle>, not paths.
      return null
  }
}

function lineToPath(coords: Position[], project: Projector): string {
  if (!coords.length) return ''
  const pts = coords.map(project)
  return `M ${pts.map((p) => `${p[0]} ${p[1]}`).join(' L ')}`
}

function polygonToPath(rings: Position[][], project: Projector): string {
  return rings.map((r) => `${lineToPath(r, project)} Z`).join(' ')
}
