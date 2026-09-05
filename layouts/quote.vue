<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { compute_color_scheme } from '../layoutHelper'
import Quote from '../components/Quote.vue'

// Full-slide wrapper around the Quote component. Old frontmatter props
// (color/author/quotesize/authorsize) keep working; the `quote`/`author`
// named slots (previously silently dropped) are now honored.
const props = withDefaults(
  defineProps<{
    color?: string
    colorMode?: string
    author?: string | null
    work?: string | null
    year?: string | number | null
    reveal?: string
    quotesize?: string
    authorsize?: string
  }>(),
  {
    color: 'light',
    author: null,
    work: null,
    year: null,
    reveal: 'highlight',
    quotesize: 'text-4xl',
    authorsize: '',
  },
)

const slots = useSlots()

const colorscheme = computed(() => compute_color_scheme(props.color, props.colorMode))

// `:: quote::` named slot wins over the default slot; `:: author::` (when
// present) overrides the composed author/work/year attribution. Slot presence
// is static per slide, so plain consts suffice.
const use_quote_slot = !!slots.quote
const has_author_slot = !!slots.author
</script>

<template>
  <div class="slidev-layout quote" :class="colorscheme">
    <Quote
      :color="color"
      :color-mode="colorMode"
      :author="author"
      :work="work"
      :year="year"
      :reveal="reveal"
      :quote-size="quotesize"
      :author-size="authorsize"
    >
      <template #default>
        <slot v-if="use_quote_slot" name="quote" />
        <slot v-else />
      </template>
      <template v-if="has_author_slot" #author>
        <slot name="author" />
      </template>
    </Quote>
  </div>
</template>

<style>
.slidev-layout.quote {
  place-content: center;
  padding: 2rem 4.5rem;
}
</style>
