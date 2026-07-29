<script setup lang="js">
import { computed } from 'vue'
import { compute_color_scheme, compute_margin_class } from '../layoutHelper'

const props = defineProps({
  color: {
    default: 'white',
  },
  colorMode: {
    default: undefined,
  },
  margin: {
    default: 'normal',
  },
})

const colorscheme = computed(() => {
  return compute_color_scheme(props.color, props.colorMode)
})

const marginClass = computed(() => {
  return compute_margin_class(props.margin)
})
</script>
<template>
  <div class="slidev-layout default slidecolor" :class="[colorscheme, marginClass]">
    <slot />
  </div>
</template>
