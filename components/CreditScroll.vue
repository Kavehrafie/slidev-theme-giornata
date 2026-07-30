<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { onSlideEnter } from '@slidev/client/logic/slides.ts'
import { useSlideContext } from '@slidev/client/context'

const { $renderContext } = useSlideContext()
const props = defineProps({
  speed: {
    type: Number,
    default: 0.5,
  },
  loop: {
    type: Boolean,
    default: false,
  },
})

const containerRef = ref<HTMLElement | null>(null)
const scrollPosition = ref(0)

let animationFrameId: number | null = null

const scroll = () => {
  scrollPosition.value -= props.speed
  if (Math.abs(scrollPosition.value) >= 550) {
    if (props.loop) {
      resetScroll()
      animationFrameId = requestAnimationFrame(scroll)
    } else {
      stopScrolling()
      return
    }
  } else {
    animationFrameId = requestAnimationFrame(scroll)
  }
}

const startScrolling = () => {
  animationFrameId = requestAnimationFrame(scroll)
}

const stopScrolling = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const resetScroll = () => {
  scrollPosition.value = 480
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

// Must be called in setup scope
onSlideEnter(() => {
  if (['slide', 'presenter'].includes($renderContext.value)) {
    stopScrolling()
    resetScroll()
    startScrolling()
  }
})

onUnmounted(() => {
  stopScrolling()
})
</script>

<template>
  <div class="scroll-container" ref="containerRef">
    <div class="scroll-content" :style="{ transform: `translateY(${scrollPosition}px)` }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.scroll-content {
  position: absolute;
  width: 100%;
}
</style>
