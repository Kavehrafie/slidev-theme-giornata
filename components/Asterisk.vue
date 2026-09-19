<script lang="ts">
// Position codes mirror the theme's `align` vocabulary: horizontal
// l/c/r x vertical t/m/b -> lt, lm, lb, ct, cm, cb, rt, rm, rb.
export type AsteriskPosition = 'lt' | 'lm' | 'lb' | 'ct' | 'cm' | 'cb' | 'rt' | 'rm' | 'rb'

export const ASTERISK_POSITIONS: readonly AsteriskPosition[] = [
  'lt',
  'lm',
  'lb',
  'ct',
  'cm',
  'cb',
  'rt',
  'rm',
  'rb',
]
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large'
    position?: AsteriskPosition
    opacity?: number | string
    color?: string
  }>(),
  {
    size: 'medium',
    position: 'rt',
    opacity: 1,
    color: 'var(--giornata-accent)',
  },
)

const opacityValue = computed(() => {
  const num = typeof props.opacity === 'string' ? parseFloat(props.opacity) : props.opacity
  return isNaN(num) ? 1 : num
})
</script>

<template>
  <div
    class="asterisk"
    :class="[`pos-${props.position}`, `size-${props.size}`]"
    :style="{ opacity: opacityValue, color: props.color }"
    aria-hidden="true"
  >
    <Icon icon="mdi-asterisk" class="text-current" />
  </div>
</template>

<style scoped>
.asterisk {
  position: absolute;
  z-index: 20;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

/* font sizes mirror Tailwind text-2xl / text-4xl / text-6xl */
.size-small {
  font-size: 1.5rem;
}

.size-medium {
  font-size: 2.25rem;
}

.size-large {
  font-size: 3.75rem;
}

/* Nine-position grid, inset 2rem (Tailwind top-8/left-8). The `translate`
   property recenters the middle/center slots on their anchor point. */
.pos-lt {
  top: 2rem;
  left: 2rem;
}

.pos-lm {
  top: 50%;
  left: 2rem;
  translate: 0 -50%;
}

.pos-lb {
  bottom: 2rem;
  left: 2rem;
}

.pos-ct {
  top: 2rem;
  left: 50%;
  translate: -50% 0;
}

.pos-cm {
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}

.pos-cb {
  bottom: 2rem;
  left: 50%;
  translate: 0 50%;
}

.pos-rt {
  top: 2rem;
  right: 2rem;
}

.pos-rm {
  top: 50%;
  right: 2rem;
  translate: 0 -50%;
}

.pos-rb {
  bottom: 2rem;
  right: 2rem;
}
</style>
