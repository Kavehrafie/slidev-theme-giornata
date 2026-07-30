<script setup lang="ts">
import { computed } from 'vue'
import { compute_alignment, compute_color_scheme, compute_margin_class } from '../layoutHelper'

const props = withDefaults(
  defineProps<{ color?: string; colorMode?: string; align?: string; margin?: string }>(),
  {
    color: 'light',
    align: 'l',
    margin: 'normal',
  },
)

const alignment = computed(() => compute_alignment(props.align))

const colorscheme = computed(() => compute_color_scheme(props.color, props.colorMode))

const marginClass = computed(() => compute_margin_class(props.margin))
</script>
<template>
  <div v-if="alignment == 'error'" class="slidev-layout default error">
    <span class="g-c-warning"><b>Error</b>: invalid layout params.</span>
    <hr />
    <p>
      There are two parameters: <code>color</code> <code>align</code>. Currently:
      <code>color: {{ props.color }}</code> and <code>align: {{ props.align }}</code
      >.
    </p>
    <p>
      The "slots" of the page are <code>:: title ::</code>, <code>:: content ::</code>, and the implicit default slot
    </p>

    <p>
      The <code>align</code> parameter determines how the title is aligned. The letter is (<code>c</code> for center,
      <code>l</code> for left, <code>r</code> for right).
    </p>

    <p>The <code>color</code> parameter determines color of the title.</p>
  </div>
  <div v-else>
    <div class="flex flex-col h-full w-full">
      <div class="w-full h-fit min-h-13 pt-2 pb-2 slidecolor" :class="colorscheme">
        <div class="slidev-layout toptitle title p-0 pt-0 ml-6 mr-6 mt-auto mb-auto" :class="alignment">
          <slot name="title" />
        </div>
      </div>
      <div class="slidev-layout toptitle content h-fit w-full" :class="marginClass">
        <slot name="content" />
      </div>
      <div v-if="$slots.default" class="slidev-layout default h-full w-full" :class="marginClass">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<style>
/* the style for this is coming from top-title-two-cols.vue*/
</style>
