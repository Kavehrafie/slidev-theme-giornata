<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  width: {
    type: String,
    default: '100%',
  },
})

const admontype = computed(() => {
  switch (props.type) {
    case 'important':
      return {
        icon: 'mdi-message-alert-outline',
        title: 'Important',
        color: 'purple',
      }
    case 'tip':
      return {
        icon: 'mdi-lightbulb-outline',
        title: 'Tip',
        color: 'emerald',
      }
    case 'warning':
      return {
        icon: 'mdi-alert-outline',
        title: 'Warning',
        color: 'amber',
      }
    case 'caution':
      return {
        icon: 'mdi-alert-octagon-outline',
        title: 'Caution',
        color: 'red',
      }
    case 'info':
    default:
      return {
        icon: 'mdi-information-variant-circle-outline',
        title: 'Note',
        color: 'sky',
      }
  }
})
</script>

<template>
  <Admonition :title="admontype.title" :color="admontype.color" :icon="admontype.icon" :width="width">
    <slot></slot>
  </Admonition>
</template>
