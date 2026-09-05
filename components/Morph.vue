<script setup lang="ts">
// Artwork morph target — pair two slides with the same id:
//   <Morph id="bonjour-courbet" src="https://..." alt="Courbet, The Meeting, 1854" />
// Sets the same view-transition-name on both images, so navigating between
// the slides morphs one into the other (requires deck-level
// `transition: view-transition`). Exists because comark drops
// `{data-morph-id}` on markdown images. The alt text renders as a figcaption
// (styled by the theme's figure rules, which also contain the image height).
defineProps<{ id: string; src: string; alt?: string }>()
</script>

<template>
  <figure>
    <img
      :src="src"
      :alt="alt ?? ''"
      :data-morph-id="id"
      :style="{ viewTransitionName: `artwork-${id}` }"
    >
    <figcaption v-if="alt">{{ alt }}</figcaption>
  </figure>
</template>
