<script setup lang="ts">
import { computed } from 'vue'
import { compute_color_scheme, compute_margin_class } from '../layoutHelper'

const props = withDefaults(
  defineProps<{ color?: string; colorMode?: string; margin?: string }>(),
  {
    color: 'white',
    margin: 'normal',
  },
)

const colorscheme = computed(() => compute_color_scheme(props.color, props.colorMode))

const marginClass = computed(() => compute_margin_class(props.margin))
</script>
<template>
  <div class="slidev-layout full w-full h-full slidecolor full-root" :class="[colorscheme, marginClass]">
    <slot />
  </div>
</template>

<style scoped>
/* Flex column so the 100%-height figure fits inside the padded root —
   in block flow the figure's height:100% plus the root's padding-top
   overflows the slide and the image loses its bottom edge. */
.full-root {
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
