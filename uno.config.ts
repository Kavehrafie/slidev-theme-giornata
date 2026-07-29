// uno.config.ts
import { defineConfig, presetWind4, transformerDirectives } from 'unocss'
import { colors } from '@unocss/preset-wind4/colors'
import { version } from './package.json'

// Tailwind CSS color palette
const colornames = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'navy',
]

// Color values to include
const values = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const prefixes = ['fill-', 'fg-', 'bg-', 'text-', 'color-', 'border-']

// Per-color hue + chroma for the relational scheme system.
// Each value is the perceptual hue (OKLCH H) and a baseline chroma (OKLCH C).
// Mode offsets in styles/theme-tokens.css rotate the hue for text/border/accent.
const schemeHues: Record<string, { hue: number; chroma: number }> = {
  red: { hue: 25, chroma: 0.18 },
  orange: { hue: 45, chroma: 0.17 },
  amber: { hue: 65, chroma: 0.16 },
  yellow: { hue: 90, chroma: 0.16 },
  lime: { hue: 125, chroma: 0.16 },
  green: { hue: 145, chroma: 0.16 },
  emerald: { hue: 160, chroma: 0.15 },
  teal: { hue: 175, chroma: 0.12 },
  cyan: { hue: 195, chroma: 0.13 },
  sky: { hue: 215, chroma: 0.15 },
  blue: { hue: 245, chroma: 0.18 },
  indigo: { hue: 265, chroma: 0.18 },
  violet: { hue: 285, chroma: 0.18 },
  purple: { hue: 305, chroma: 0.17 },
  fuchsia: { hue: 325, chroma: 0.16 },
  pink: { hue: 355, chroma: 0.15 },
  rose: { hue: 15, chroma: 0.16 },
  slate: { hue: 250, chroma: 0.04 },
  gray: { hue: 0, chroma: 0.015 },
  zinc: { hue: 0, chroma: 0.015 },
  neutral: { hue: 0, chroma: 0.0 },
  stone: { hue: 60, chroma: 0.015 },
}

// Function to generate classes
const generateColors = (prefixes, colors, values) => {
  const classes = []
  colors.forEach((color) => {
    values.forEach((value) => {
      prefixes.forEach((prefix) => {
        classes.push(`${prefix}${color}-${value}`)
      })
    })
  })
  return classes
}

// Build the OKLCH color string for a given scheme + channel.
// `L` may be a number (literal lightness) or a string referencing a CSS var
// (e.g. 'var(--giornata-l-regular-bg)') so the same scheme can retune for
// dark mode via cascade. `hueMode` selects whether the hue gets the mode
// offset applied (text/border/accent) or stays on the scheme's primary hue.
const oklch = (
  L: number | string,
  C: number,
  hueMode: 'primary' | 'text' | 'border',
) => {
  const hueVar = '--giornata-scheme-hue'
  if (hueMode === 'primary') return `oklch(${L} ${C} var(${hueVar}))`
  const offsetVar =
    hueMode === 'text' ? '--giornata-mode-text-offset' : '--giornata-mode-border-offset'
  return `oklch(${L} ${C} calc(var(${hueVar}) + var(${offsetVar})))`
}

const generate_color_schemes = () => {
  const schemes = []
  const classes = []

  const addScheme = (longName, shortName, styles) => {
    schemes.push([longName, styles])
    schemes.push([shortName, styles])
    classes.push(longName, shortName)
  }

  // Base schemes — no meaningful hue, kept as plain neutrals.
  addScheme('giornata-black-scheme', 'g-c-bk-scheme', {
    '--giornata-bg-color': colors['black'],
    '--giornata-bg-code-color': colors['gray'][600],
    '--giornata-fg-code-color': colors['white'],
    '--giornata-fg-color': colors['white'],
    '--giornata-text-color': colors['white'],
    '--giornata-border-color': colors['white'],
    '--giornata-highlight-color': 'var(--giornata-mode-accent-color)',
    '--giornata-admon-bg-color': colors['black'],
    '--giornata-admon-border-color': colors['white'],
    '--giornata-admon-text-color': colors['white'],
  })

  addScheme('giornata-white-scheme', 'g-c-wh-scheme', {
    '--giornata-bg-color': colors['white'],
    '--giornata-bg-code-color': colors['gray'][100],
    '--giornata-fg-code-color': colors['black'],
    '--giornata-fg-color': colors['black'],
    '--giornata-text-color': colors['black'],
    '--giornata-border-color': colors['gray'][950],
    '--giornata-highlight-color': 'var(--giornata-mode-accent-color)',
    '--giornata-admon-bg-color': colors['white'],
    '--giornata-admon-border-color': colors['gray'][950],
    '--giornata-admon-text-color': colors['black'],
  })

  addScheme('giornata-dark-scheme', 'g-c-dk-scheme', {
    '--giornata-bg-color': colors['gray'][800],
    '--giornata-bg-code-color': colors['gray'][600],
    '--giornata-fg-code-color': colors['white'],
    '--giornata-fg-color': colors['gray'][100],
    '--giornata-text-color': colors['gray'][100],
    '--giornata-border-color': colors['gray'][100],
    '--giornata-highlight-color': 'var(--giornata-mode-accent-color)',
    '--giornata-admon-bg-color': colors['gray'][800],
    '--giornata-admon-border-color': colors['gray'][100],
    '--giornata-admon-text-color': colors['gray'][100],
  })

  addScheme('giornata-light-scheme', 'g-c-lt-scheme', {
    '--giornata-bg-color': colors['gray'][100],
    '--giornata-bg-code-color': colors['gray'][200],
    '--giornata-fg-code-color': colors['gray'][800],
    '--giornata-fg-color': colors['gray'][800],
    '--giornata-text-color': colors['gray'][800],
    '--giornata-border-color': colors['gray'][800],
    '--giornata-highlight-color': 'var(--giornata-mode-accent-color)',
    '--giornata-admon-bg-color': colors['gray'][100],
    '--giornata-admon-border-color': colors['gray'][800],
    '--giornata-admon-text-color': colors['gray'][800],
  })

  // Navy — brand color, kept as a token reference (not hue-derived).
  addScheme('giornata-navy-scheme', 'g-c-nv-scheme', {
    '--giornata-bg-color': 'var(--giornata-navy)',
    '--giornata-bg-code-color': colors['gray'][200],
    '--giornata-fg-code-color': colors['gray'][800],
    '--giornata-fg-color': colors['gray'][300],
    '--giornata-text-color': colors['gray'][300],
    '--giornata-border-color': colors['gray'][300],
    '--giornata-highlight-color': 'var(--giornata-mode-accent-color)',
    '--giornata-admon-bg-color': 'var(--giornata-navy)',
    '--giornata-admon-border-color': colors['gray'][300],
    '--giornata-admon-text-color': colors['gray'][300],
  })

  addScheme('giornata-navy-light-scheme', 'g-c-nv-lt-scheme', {
    '--giornata-bg-color': colors['gray'][50],
    '--giornata-bg-code-color': colors['gray'][400],
    '--giornata-fg-code-color': colors['gray'][50],
    '--giornata-fg-color': 'var(--giornata-navy)',
    '--giornata-text-color': 'var(--giornata-navy)',
    '--giornata-border-color': 'var(--giornata-navy)',
    '--giornata-highlight-color': 'var(--giornata-mode-accent-color)',
    '--giornata-admon-bg-color': colors['gray'][50],
    '--giornata-admon-border-color': 'var(--giornata-navy)',
    '--giornata-admon-text-color': 'var(--giornata-navy)',
  })

  // Per-color relational schemes — all derived from hue + chroma.
  // L targets come from CSS vars (var(--giornata-l-{role})) so the same
  // rule works in light and dark: html.dark just overrides the L vars.
  for (const [colorName, { hue, chroma }] of Object.entries(schemeHues)) {
    const shortColor = colorName.slice(0, 2)
    const c = chroma // baseline chroma
    const cSoft = chroma * 0.7 // softer chroma for borders / large fills
    const cTint = chroma * 0.2 // very low chroma for tinted backgrounds

    // Regular scheme: dark-ish colored bg + near-white text.
    addScheme(`giornata-${colorName}-scheme`, `g-c-${shortColor}-scheme`, {
      '--giornata-scheme-hue': String(hue),
      '--giornata-bg-color': oklch('var(--giornata-l-regular-bg)', c, 'primary'),
      '--giornata-bg-code-color': oklch('var(--giornata-l-regular-bg-code)', c * 0.9, 'primary'),
      '--giornata-fg-code-color': oklch('var(--giornata-l-regular-text)', 0.01, 'primary'),
      '--giornata-fg-color': oklch('var(--giornata-l-regular-text)', 0.01, 'text'),
      '--giornata-text-color': oklch('var(--giornata-l-regular-text)', 0.01, 'text'),
      '--giornata-border-color': oklch('var(--giornata-l-regular-border)', cSoft, 'border'),
      '--giornata-highlight-color': 'var(--giornata-mode-accent-color)',
      '--giornata-admon-bg-color': oklch('var(--giornata-l-regular-bg)', c, 'primary'),
      '--giornata-admon-border-color': oklch('var(--giornata-l-regular-admon-border)', cSoft, 'border'),
      '--giornata-admon-text-color': oklch('var(--giornata-l-regular-text)', 0.01, 'text'),
    })

    // Light scheme: near-white tinted bg + dark colored text.
    addScheme(`giornata-${colorName}-light-scheme`, `g-c-${shortColor}-lt-scheme`, {
      '--giornata-scheme-hue': String(hue),
      '--giornata-bg-color': oklch('var(--giornata-l-light-bg)', cTint, 'primary'),
      '--giornata-bg-code-color': oklch('var(--giornata-l-light-bg-code)', cTint * 1.5, 'primary'),
      '--giornata-fg-code-color': oklch('var(--giornata-l-light-text)', c, 'primary'),
      '--giornata-fg-color': oklch('var(--giornata-l-light-text)', c, 'text'),
      '--giornata-text-color': oklch('var(--giornata-l-light-text)', c, 'text'),
      '--giornata-border-color': oklch('var(--giornata-l-light-border)', cSoft, 'border'),
      '--giornata-highlight-color': 'var(--giornata-mode-accent-color)',
      '--giornata-admon-bg-color': oklch('var(--giornata-l-light-bg)', cTint, 'primary'),
      '--giornata-admon-border-color': oklch('var(--giornata-l-light-admon-border)', cSoft, 'border'),
      '--giornata-admon-text-color': oklch('var(--giornata-l-light-text)', c, 'text'),
    })
  }

  return { classes: classes, schemes: schemes }
}

const generate_text_sizes = () => {
  const classes = Array.from({ length: 10 }, (_, i) => `text-${i + 1}xl`)
  classes.push('text-xs')
  classes.push('text-sm')
  classes.push('text-base')
  classes.push('text-lg')
  classes.push('text-xl')
  return classes
}
const generateColumns = (max) => {
  return Array.from({ length: max }, (_, i) => `col-span-${i + 1}`)
}

const generateRows = (max) => {
  return Array.from({ length: max }, (_, i) => `row-span-${i + 1}`)
}

const schemes = generate_color_schemes()

console.log(`Loading Giornata ${version} theme uno.config.ts...`)
export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind4({
      preflights: {
        // Tailwind v4 reset, generated internally by wind4
        reset: true,
      },
    }),
  ],
  rules: [...schemes.schemes],
  safelist: [
    ...generateColors(prefixes, colornames, values),
    ...generateColumns(13),
    ...generateRows(13),
    ...generate_text_sizes(),
    ...schemes.classes,
    // color_mode classes — must be in safelist because they're applied
    // at runtime based on frontmatter / props, not statically discoverable.
    ...['g-c-mode-mono', 'g-c-mode-complement', 'g-c-mode-analogous', 'g-c-mode-triadic'],
    ...['text-center', 'text-right', 'text-left', ':root'],
    ...[
      'grid',
      'w-full',
      'grid-cols-2',
      'grid-item',
      'grid-cols-1',
      'grid-col-span-1',
      'mt-10',
      'mb-10',
      'm-10',
      'w-150px',
      'h-150px',
      'z-0',
      'z-100' /* for the docs */,
      'grid-cols-[1fr_max-content]' /* a fix for a uno bug */,
    ],
  ],
  transformers: [transformerDirectives()],
})
