<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { compute_color_scheme } from '../layoutHelper'
const props = defineProps({
  color: {
    type: String,
    default: 'amber',
  },
  colorMode: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
    default: 'Note',
  },
  icon: {
    type: String,
    default: 'mdi-information-variant-circle-outline',
  },
  width: {
    type: String,
    default: '100%',
  },
  custom: {
    // add a custom class if you want
    type: String,
    default: '',
  },
  customTitle: {
    // add a custom class if you want
    type: String,
    default: '',
  },
})

const colorscheme = computed(() => {
  return compute_color_scheme(props.color, props.colorMode)
})
</script>

<template>
  <div class="markdown-alert markdown-alert-custom" :class="colorscheme">
    <p class="markdown-alert-title-custom" :class="props.customTitle">
      <span :class="`[font-size-1.3rem, customTitle]`"><Icon :icon="props.icon" /></span>&nbsp;&nbsp;{{ props.title }}
    </p>
    <p :class="props.custom"><slot></slot></p>
  </div>
</template>

<style scoped>
.markdown-alert {
  padding: 8px 16px;
  margin: 10px;
  margin-left: 0;
  margin-top: 2px;
  margin-bottom: 5px;
  color: inherit;
  border-radius: 6px;
  font-size: 0.75em;
  width: v-bind(props.width);
  font-family: var(--giornata-main-font);
  font-size: 0.85rem;
}

.markdown-alert p {
  margin: 0;
  margin-bottom: 2px;
}
.markdown-alert > :first-child {
  margin-top: 0;
}
.markdown-alert > :last-child {
  margin-bottom: 0;
}
.markdown-alert.markdown-alert-custom {
  background-color: var(--giornata-admon-bg-color);
  color: var(--giornata-admon-text-color);
  border: 1px solid var(--giornata-admon-border-color);
  border-left: 6px solid var(--giornata-admon-border-color);
}
.markdown-alert .markdown-alert-title-custom {
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 700;
  color: var(--giornata-admon-text-color);
}
@media print {
  .markdown-alert .markdown-alert-title:before {
    display: none;
  }
}
</style>
