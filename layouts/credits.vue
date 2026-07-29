<script setup>
import { computed } from 'vue'
import { compute_color_scheme } from '../layoutHelper'
const props = defineProps({
  color: {
    default: 'light',
  },
  colorMode: {
    default: undefined,
  },
  speed: {
    default: 0.5,
  },
  loop: {
    default: false,
  },
})

const colorscheme = computed(() => {
  return compute_color_scheme(props.color, props.colorMode)
})
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
