<script setup lang="ts">
import { computed } from 'vue'
import { compute_alignment, compute_color_scheme, compute_column_size, compute_margin_class } from '../layoutHelper'

const props = withDefaults(
  defineProps<{
    columns?: string
    align?: string
    color?: string
    colorMode?: string
    margin?: string
  }>(),
  {
    columns: 'is-one-half',
    align: 'l-lt-lt',
    color: 'light',
    margin: 'normal',
  },
)

const colwidth = computed(() => compute_column_size(props.columns))
// `colwidth` can be the `'error'` sentinel (checked in the template's v-if).
// `colsL` / `colsR` are the always-number views the CSS v-bind() bindings
// consume — binding a bare computed (no member access on a ref) keeps the
// <style> block reactive and clear of ref-unwrapping type errors.
const colsL = computed(() => (colwidth.value === 'error' ? 0 : colwidth.value.l))
const colsR = computed(() => (colwidth.value === 'error' ? 0 : colwidth.value.r))

const alignment = computed(() => {
  const parts = props.align.split('-')
  return { t: compute_alignment(parts[0]), l: compute_alignment(parts[1]), r: compute_alignment(parts[2]) }
})

const colorscheme = computed(() => compute_color_scheme(props.color, props.colorMode))

const marginClass = computed(() => compute_margin_class(props.margin))
</script>
<template>
  <div
    v-if="colwidth == 'error' || alignment.t == 'error' || alignment.l == 'error' || alignment.r == 'error'"
    class="slidev-layout default error"
  >
    <span class="g-c-warning"><b>Error</b>: invalid layout params.</span>
    <hr />
    <p>
      There are three parameters: <code>columns</code>, <code>align</code>, and <code>color</code>. Currently:
      <code>columns: {{ props.columns }} </code>, <code>align: {{ props.align }} </code>, and
      <code>color: {{ props.color }} </code>.
    </p>
    <p>
      The "slots" of the page are default <code>:: title ::</code>, <code>:: left ::</code>, and
      <code>:: right ::</code>
    </p>
    <p>
      Options for <code>columns</code> are divided into 12 column units. So with <code>columns: is-1-11</code> the left
      column is 1/12 wide and the the right columns is 11/12 wide. The component admits a short had of only specifying
      the left column (<code>columns: is-1</code> does the same thing). In addition there are short hands like
      <code>columns: is-one-quarter</code> which resolves to <code>is-3-9</code>, etc...
    </p>
    <p>
      The <code>align</code> parameter determines how the columns look. The notation is for example
      <code>align: c-cm-cm</code>. The first part is for the title, the second for the left column, and the third part
      is for the right column. The first letter is (<code>c</code> for center, <code>l</code> for left,
      <code>r</code> for right). This applies to all three second. For the columns the second letter is vertical
      alignment (<code>t</code> for top, <code>m</code> for middle, <code>b</code> for bottom).
    </p>

    <p>The <code>color</code> parameter determines color of the title.</p>
  </div>
  <!-- h-full is load-bearing: this root sits directly in .slidev-page
       (absolute, inset 0). Without it the root is auto-height, the inner
       h-full column cannot resolve, and the whole layout stays
       content-sized — which is why tall images overflowed the slide. -->
  <div v-else class="h-full">
    <div class="flex flex-col h-full w-full">
      <div class="w-full h-fit min-h-13 pt-2 pb-2 slidecolor" :class="colorscheme">
        <div class="slidev-layout toptitle title p-0 ml-6 mr-6 mt-auto mb-auto" :class="alignment.t">
          <slot name="title" />
        </div>
      </div>
      <div class="slidev-layout toptitle content w-full flex-1 min-h-0" :class="marginClass">
        <div class="flex flex-row h-full w-full">
          <div class="col-left" :class="alignment.l">
            <slot name="left" />
          </div>
          <div class="col-right" :class="alignment.r">
            <slot name="right" />
          </div>
        </div>
      </div>
      <div v-if="$slots.default" class="slidev-layout default h-fit w-full" :class="marginClass">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.toptitle .content {
  padding-top: 1.3rem;
}

.slidev-layout.toptitle .content h1 + ul {
  margin-top: 0em;
}
.slidev-layout.toptitle .content h2 + ul {
  margin-top: 0em;
}

.slidev-layout.toptitlecontent h3 + ul {
  margin-top: 0em;
}

li li {
  margin-top: 0.5em; /* Adjust this value as needed */
}

.slidev-layout.toptitlecontent h1 {
  font-size: 1.4em;
  font-family: var(--giornata-title-font);
  font-weight: 500;
  margin-bottom: 0rem;
}

.slidev-layout.toptitle .content h2 {
  font-size: 1.4em;
  font-family: var(--giornata-title-font);
  font-weight: 500;
  margin-bottom: 0rem;
}

.slidev-layout.toptitle .content h3 {
  font-size: 1.1em;
  font-family: var(--giornata-title-font);
  font-weight: 500;
  margin-bottom: 0rem;
}

.slidev-layout .toptitle .title {
  padding: 0;
  margin: 0;
  margin-left: 20px;
  margin-right: 20px;
}

.slidev-layout.toptitle.title h1 {
  font-size: 1.8em;
  font-family: var(--giornata-title-font);
  font-weight: 500;
  letter-spacing: 0.07em;
}

.slidev-layout.toptitle.title h2 {
  font-size: 1.5em;
  font-family: var(--giornata-title-font);
  font-weight: 300;
  letter-spacing: 0.07em;
}

.slidev-layout.toptitle.title h3 {
  font-size: 1.1em;
  font-family: var(--giornata-title-font);
  font-weight: 300;
  letter-spacing: 0.07em;
}

.slidev-layout.toptitle.title h1 + p,
.slidev-layout.toptitle.title h2 + p,
.slidev-layout.toptitle.title h3 + p {
  margin-top: 0.85em;
  margin-bottom: 0.3em;
}
</style>

<style scoped>
/* Flex columns capped at the row height: without the cap the g-c-*
   auto-margin alignment sizes each column to its content, so a tall image
   overflows the slide (max-height on the image has nothing to resolve
   against). With min-height 0 + max-height 100% the column clamps to the
   definite row height when content exceeds it and the image shrinks. */
.slidev-layout.toptitle.content .col-left {
  flex: v-bind(colsL); /* Makes each column take up equal space */
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  max-height: 100%;
}

.slidev-layout.toptitle.content .col-right {
  flex: v-bind(colsR); /*Makes each column take up equal space */
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  max-height: 100%;
}
</style>
