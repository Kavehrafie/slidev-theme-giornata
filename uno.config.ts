// uno.config.ts
import { defineConfig, presetWind3, transformerDirectives } from 'unocss'
import { colors } from '@unocss/preset-mini'
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

const generate_color_schemes = (colors) => {
  const schemes = []
  const classes = []

  const addScheme = (longName, shortName, styles) => {
    schemes.push([longName, styles])
    schemes.push([shortName, styles])
    classes.push(longName, shortName)
  }

  addScheme('giornata-black-scheme', 'g-c-bk-scheme', {
    '--giornata-bg-color': colors['black'],
    '--giornata-bg-code-color': colors['gray'][600],
    '--giornata-fg-code-color': colors['white'],
    '--giornata-fg-color': colors['white'],
    '--giornata-text-color': colors['white'],
    '--giornata-border-color': colors['white'],
    '--giornata-highlight-color': '#FFA500',
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
    '--giornata-highlight-color': '#FFA500',
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
    '--giornata-highlight-color': '#FFA500',
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
    '--giornata-highlight-color': '#FFA500',
    '--giornata-admon-bg-color': colors['gray'][100],
    '--giornata-admon-border-color': colors['gray'][800],
    '--giornata-admon-text-color': colors['gray'][800],
  })

  for (const color of colornames) {
    if (color == 'navy') {
      addScheme('giornata-navy-scheme', 'g-c-nv-scheme', {
        '--giornata-bg-color': '#2a373a',
        '--giornata-bg-code-color': colors['gray'][200],
        '--giornata-fg-code-color': colors['gray'][800],
        '--giornata-fg-color': colors['gray'][300],
        '--giornata-text-color': colors['gray'][300],
        '--giornata-border-color': colors['gray'][300],
        '--giornata-highlight-color': '#FFA500',
        '--giornata-admon-bg-color': '#2a373a',
        '--giornata-admon-border-color': colors['gray'][300],
        '--giornata-admon-text-color': colors['gray'][300],
      })

      addScheme('giornata-navy-light-scheme', 'g-c-nv-lt-scheme', {
        '--giornata-bg-color': colors['gray'][50],
        '--giornata-bg-code-color': colors['gray'][400],
        '--giornata-fg-code-color': colors['gray'][50],
        '--giornata-fg-color': '#2a373a',
        '--giornata-text-color': '#2a373a',
        '--giornata-border-color': '#2a373a',
        '--giornata-highlight-color': '#FFA500',
        '--giornata-admon-bg-color': colors['gray'][50],
        '--giornata-admon-border-color': '#2a373a',
        '--giornata-admon-text-color': '#2a373a',
      })
    } else {
      const shortColor = color.slice(0, 2)

      addScheme(`giornata-${color}-scheme`, `g-c-${shortColor}-scheme`, {
        '--giornata-bg-color': colors[color][500],
        '--giornata-bg-code-color': colors[color][600],
        '--giornata-fg-code-color': colors[color][100],
        '--giornata-fg-color': colors[color][100],
        '--giornata-text-color': colors[color][100],
        '--giornata-border-color': colors[color][100],
        '--giornata-highlight-color': colors[color][100],
        '--giornata-admon-bg-color': colors[color][500],
        '--giornata-admon-border-color': colors[color][300],
        '--giornata-admon-text-color': colors[color][100],
      })

      addScheme(`giornata-${color}-light-scheme`, `g-c-${shortColor}-lt-scheme`, {
        '--giornata-bg-color': colors[color][100],
        '--giornata-bg-code-color': colors[color][200],
        '--giornata-fg-code-color': colors[color][500],
        '--giornata-fg-color': colors[color][600],
        '--giornata-text-color': colors[color][500],
        '--giornata-border-color': colors[color][500],
        '--giornata-highlight-color': colors[color][500],
        '--giornata-admon-bg-color': colors[color][100],
        '--giornata-admon-border-color': colors[color][300],
        '--giornata-admon-text-color': colors[color][600],
      })
    }
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

const schemes = generate_color_schemes(colors)

console.log(`Loading Giornata ${version} theme uno.config.ts...`)
export default defineConfig({
  // ...UnoCSS options
  presets: [presetWind3()],
  rules: [...schemes.schemes],
  safelist: [
    ...generateColors(prefixes, colornames, values),
    ...generateColumns(13),
    ...generateRows(13),
    ...generate_text_sizes(),
    ...schemes.classes,
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
