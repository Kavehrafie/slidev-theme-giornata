<script setup lang="ts">
import { computed } from 'vue'
import { compute_color_scheme } from '../layoutHelper'
const props = withDefaults(
  defineProps<{
    color?: string
    colorMode?: string
    speed?: number
    loop?: boolean
  }>(),
  {
    color: 'light',
    speed: 0.5,
    loop: false,
  },
)

const colorscheme = computed(() => compute_color_scheme(props.color, props.colorMode))
</script>
<template>
  <div class="slidecolor slidev-layout full" :class="colorscheme">
    <div class="my-auto w-full h-full">
      <CreditScroll :speed="props.speed" :loop="props.loop">
        <slot name="default"></slot>
      </CreditScroll>
    </div>
  </div>
</template>

<style scoped>
.quote {
  background-color: var(--giornata-bg-color);
  color: var(--giornata-text-color);
  border-color: var(--giornata-border-color);
}
</style>
