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
  <div class="slidev-layout section slidecolor" :class="[colorscheme, marginClass]">
    <div class="my-auto">
      <slot />
    </div>
  </div>
</template>

<style>
.slidev-layout.section {
  display: grid;
  height: 100%;
  font-family: var(--giornata-main-font);
  font-weight: 300;
}

.slidev-layout.section hr {
  border: 0;
  border-top: 1px solid var(--giornata-border-color);
  margin: 0;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

/* section slide type */
.slidev-layout.section h1 {
  font-family: var(--giornata-title-font);
  font-weight: 500;
  font-size: 2.8em;
  padding-bottom: 0.3rem;
  line-height: normal;
}

.slidev-layout.section h2 {
  font-family: var(--giornata-title-font);
  font-weight: 500;
  font-size: 2.5em;
  line-height: normal;
}

.slidev-layout.section h3 {
  font-family: var(--giornata-title-font);
  font-weight: 500;
  font-size: 1.9em;
  line-height: normal;
}

.slidev-layout.section strong {
  font-weight: 500;
}

.slidev-layout.section h1 + p {
  padding: 0;
  margin: 0;
  opacity: 1;
}

.slidev-layout.section h2 + p {
  padding: 0;
  margin: 0;
  opacity: 1;
}

.slidev-layout.section h3 + p {
  padding: 0;
  margin: 0;
  opacity: 1;
}
</style>
