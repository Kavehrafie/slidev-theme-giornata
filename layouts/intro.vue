<script setup lang="ts">
import { computed } from 'vue'
import { compute_color_scheme } from '../layoutHelper'

const props = withDefaults(defineProps<{ color?: string; colorMode?: string }>(), {
  color: 'white',
})

const colorscheme = computed(() => compute_color_scheme(props.color, props.colorMode))
</script>

<template>
  <div class="slidev-layout intro slidecolor" :class="colorscheme">
    <div class="my-auto intro-wrap">
      <slot />
    </div>
    <div class="absolute bottom-10">
      <slot name="note" />
    </div>
  </div>
</template>

<style scoped>
/* Cap the vertically-centered wrapper (same pattern as center.vue) so any
   image in an intro slide shrinks inside the slide instead of being clipped. */
.intro-wrap {
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: 100%;
}
</style>

<style>
/* intro slide type */

.slidev-layout.intro {
  font-family: var(--giornata-main-font);
  font-weight: 300;
}

.slidev-layout.intro strong {
  font-weight: 500;
}
.slidev-layout.intro h1 {
  font-family: var(--giornata-title-font);
  font-weight: 500;
  font-size: 3em;
  line-height: 5rem;
}

.slidev-layout.intro h2 {
  font-family: var(--giornata-title-font);
  font-weight: 500;
  font-size: 2.5em;
  line-height: 5rem;
}

.slidev-layout.intro h3 {
  font-family: var(--giornata-title-font);
  font-weight: 500;
  font-size: 1.9em;
  line-height: 5rem;
}

.slidev-layout.intro h1 + p {
  padding: 0;
  margin: 0;
  opacity: 1;
}

.slidev-layout.intro h2 + p {
  padding: 0;
  margin: 0;
  opacity: 1;
}

.slidev-layout.intro h3 + p {
  padding: 0;
  margin: 0;
  opacity: 1;
}
</style>
