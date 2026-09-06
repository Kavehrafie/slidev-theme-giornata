<script setup lang="ts">
import { computed } from 'vue'
import { compute_alignment, compute_color_scheme, compute_column_size } from '../layoutHelper'

const props = withDefaults(
  defineProps<{ columns?: string; align?: string; color?: string; colorMode?: string }>(),
  {
    columns: 'is-one-half',
    align: 'lt-lt',
    color: 'white',
  },
)

const alignment = computed(() => {
  const parts = props.align.split('-')

  return { l: compute_alignment(parts[0]), r: compute_alignment(parts[1]) }
})

const colwidth = computed(() => compute_column_size(props.columns))
// `colwidth` can be the `'error'` sentinel (checked in the template's v-if).
// `colsL` / `colsR` are the always-number views the CSS v-bind() bindings
// consume — binding a bare computed (no member access on a ref) keeps the
// <style> block reactive and clear of ref-unwrapping type errors.
const colsL = computed(() => (colwidth.value === 'error' ? 0 : colwidth.value.l))
const colsR = computed(() => (colwidth.value === 'error' ? 0 : colwidth.value.r))

const colorscheme = computed(() => compute_color_scheme(props.color, props.colorMode))
</script>

<!-- default.vue -->
<template>
  <div
    v-if="colwidth == 'error' || alignment.l == 'error' || alignment.r == 'error'"
    class="slidev-layout default error"
  >
    <span class="g-c-warning"><b>Error</b>: invalid layout params.</span>
    <hr />
    <p>
      There are two parameters: <code>columns</code> and <code>align</code>. Currently:
      <code>columns: {{ props.columns }}</code> and <code>align: {{ props.align }}</code
      >.
    </p>
    <p>
      Options for <code>columns</code> are divided into 12 column units. So with <code>columns: is-1-11</code> the left
      column is 1/12 wide and the the right columns is 11/12 wide. The component admits a short had of only specifying
      the left column (<code>columns: is-1</code> does the same thing). In addition there are short hands like
      <code>columns: is-one-quarter</code> which resolves to <code>is-3-9</code>, etc...
    </p>
    <p>
      Here are a bunch of examples:
      <code>
        is-1, is-2, is-3, is-4, is-5, is-6, is-7, is-8, is-9, is-10, is-11, is-1-11, is-2-10, is-3-9, is-4-8, is-5-7,
        is-6-6, is-7-5, is-8-4, is-9-3, is-10-2, is-11-1, is-one-quarter, is-one-third, is-one-half, is-two-thirds,
        is-three-quarters
      </code>
    </p>
    <p>In addition you can specify "slots" of the page with <code>:: left ::</code>, and <code>:: right::</code>.</p>
    <p>
      The <code>align</code> parameter determines how the columns look. The notation is for example
      <code>align: cm-cm</code>. The first part is for the left column, and the second part is for the right column. The
      first letter is (<code>c</code> for center, <code>l</code> for left, <code>r</code> for right). The second letter
      is vertical alignment (<code>t</code> for top, <code>m</code> for middle, <code>b</code> for bottom).
    </p>
  </div>
  <div v-else class="slidev-layout default two-cols slidecolor" :class="colorscheme">
    <div v-if="$slots.left" class="left-col" :class="alignment.l">
      <slot name="left" />
    </div>

    <div v-if="$slots.right" class="right-col" :class="alignment.r">
      <slot name="right" />
    </div>

    <div v-if="$slots.default" class="end-footer">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped>
.two-cols {
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* 12 columns */
  /* minmax(0,…) — a bare `1fr` track has an auto minimum and grows to fit a
     tall image, pushing the grid past the slide bottom. Capping the min at 0
     keeps the row at slide height so images must shrink inside the columns. */
  grid-template-rows: minmax(0, 1fr); /* no footer and content */
}

.end-footer {
  grid-area: 4 / 1 / 5 / span 12; /* full width */
  margin-bottom: 1rem;
}

/* The columns are flex columns, but the g-c-top/middle/bottom alignment
   classes size them with auto margins — that makes their height content-based,
   so max-height on child images never resolves and images overflow. Capping
   with max-height + min-height 0 keeps the column at track height when content
   exceeds it (the cap then acts as a definite height and the image shrinks),
   while auto margins still align the column when content fits. */
.two-cols .left-col {
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  max-height: 100%;
}

.two-cols .right-col {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  max-height: 100%;
}

.two-cols .left-col {
  grid-area: 1 / 1 / 2 / span v-bind(colsL);
}

.two-cols .right-col {
  grid-area: 1 / calc(v-bind(colsL) + 1) / 2 / span v-bind(colsR);
}
</style>
