<template>
  <div class="h-full w-full" ref="video_div">
    <VideoPlayer
      :src="path"
      controls
      playsinline
      :width="width"
      :height="height"
      :playback-rates="[0.5, 0.75, 1.0, 1.5, 2.0]"></VideoPlayer>
  </div>
</template>
<script lang="ts" setup>
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { useElementSize } from '@vueuse/core'

const video_div = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(video_div)
const route = useRoute()
const path = route.query.path as string
</script>
<style scoped lang="scss"></style>
