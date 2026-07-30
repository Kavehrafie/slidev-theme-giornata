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
  <div class="slidev-layout full w-full h-full slidecolor" :class="[colorscheme, marginClass]">
    <slot />
  </div>
</template>
