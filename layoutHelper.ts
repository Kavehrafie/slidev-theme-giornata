import type { CSSProperties } from 'vue'

/**
 * Resolve urls from frontmatter and append with the base url
 */
export function resolveAssetUrl(url: string) {
  if (url.startsWith('/')) return import.meta.env.BASE_URL + url.slice(1)
  return url
}

export function handleBackground(background?: string, dim = false): CSSProperties {
  // Note: avoid a `.some()` closure here — TS cannot carry the `background`
  // narrowing into the callback, so `background.indexOf` would be reported as
  // possibly-undefined under strict mode.
  const isColor =
    background !== undefined &&
    (background.startsWith('#') || background.startsWith('rgb') || background.startsWith('hsl'))

  const style = {
    background: isColor ? background : undefined,
    color: background && !isColor ? 'white' : undefined,
    backgroundImage: isColor
      ? undefined
      : background
        ? dim
          ? `linear-gradient(#0005, #0008), url(${resolveAssetUrl(background)})`
          : `url("${resolveAssetUrl(background)}")`
        : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  if (!style.background) delete style.background

  return style
}

export function compute_alignment(val: string) {
  switch (val) {
    case 'ct':
      return 'g-c-center g-c-top'
    case 'cm':
      return 'g-c-center g-c-middle'
    case 'cb':
      return 'g-c-center g-c-bottom'
    case 'lt':
      return 'g-c-left g-c-top'
    case 'lm':
      return 'g-c-left g-c-middle'
    case 'lb':
      return 'g-c-left g-c-bottom'
    case 'rt':
      return 'g-c-right g-c-top'
    case 'rm':
      return 'g-c-right g-c-middle'
    case 'rb':
      return 'g-c-right g-c-bottom'
    case 'c':
      return 'g-c-center g-c-top'
    case 'l':
      return 'g-c-left g-c-top'
    case 'r':
      return 'g-c-right g-c-top'
    default:
      return 'error'
  }
}

export type ColumnSize = { l: number; r: number }

function compute_size(left: number): ColumnSize {
  return { l: left, r: 12 - left }
}

export function compute_margin_class(val: string) {
  switch (val) {
    case 'tight':
      return 'g-c-tight-margin'
    case 'tighter':
      return 'g-c-tighter-margin'
    case 'none':
      return 'g-c-no-margin'
    default:
      return ''
  }
}

export function compute_column_size(val: string): ColumnSize | 'error' {
  switch (val) {
    case 'is-1':
    case 'is-1-11':
    case 'is-one-twelfth':
      return compute_size(1)
    case 'is-2':
    case 'is-2-10':
    case 'is-one-sixth':
      return compute_size(2)
    case 'is-3':
    case 'is-3-9':
    case 'is-one-quarter':
      return compute_size(3)
    case 'is-4':
    case 'is-4-8':
    case 'is-one-third':
      return compute_size(4)
    case 'is-5':
    case 'is-5-7':
      return compute_size(5)
    case 'is-6':
    case 'is-6-6':
    case 'is-two-quarters':
    case 'is-two-fourths':
    case 'is-one-half':
    case 'is-half':
      return compute_size(6)
    case 'is-7':
    case 'is-7-5':
      return compute_size(7)
    case 'is-8':
    case 'is-8-4':
    case 'is-two-thirds':
      return compute_size(8)
    case 'is-9':
    case 'is-9-3':
    case 'is-three-quarters':
    case 'three-fourths':
      return compute_size(9)
    case 'is-10':
    case 'is-10-2':
      return compute_size(10)
    case 'is-11':
    case 'is-11-1':
      return compute_size(11)
    default:
      return 'error'
  }
}

/**
 * Build the class string for a color + optional mode.
 *
 * `color` is a scheme name like "red", "amber", "navy".
 * `mode` is one of "mono" (default), "complement", "analogous", "triadic".
 * Returns the base scheme class plus the mode class when mode is non-default.
 */
export function compute_color_scheme(color: string, mode?: string): string {
  const base = `giornata-${color}-scheme`
  if (!mode || mode === 'mono') return base
  return `${base} g-c-mode-${mode}`
}
