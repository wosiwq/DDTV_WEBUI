<template>
  <div class="relative h-[225px] w-400px rd">
    <div
      class="absolute left-0 top-0 z-1 h-[60px] w-full pl-2 pt-1"
      style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.32) 100%)">
      <span class="text-lg">{{ roomInfo.title }}</span>
    </div>
    <div
      class="absolute bottom-0 left-0 z-1 h-[30px] w-full flex items-end pb-[0.125rem] pl-2"
      style="
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.32) 100%);
      ">
      <span>{{ roomInfo.areaName }}</span>
    </div>
    <ElImage :src="getCoverImage()">
      <template #error><img src="/error.webp" /></template>
    </ElImage>
  </div>
</template>
<script lang="ts" setup>
import type { RoomInfo } from '@/types/response'
const props = defineProps({
  roomInfo: {
    type: Object as PropType<RoomInfo>,
    default: () => ({})
  }
})
const getCoverImage = () => {
  if (props.roomInfo.coverFromUser) {
    return props.roomInfo.coverFromUser + '@400w_225h_1c_1s.webp'
  } else if (props.roomInfo.keyFrame) {
    return props.roomInfo.keyFrame + '@400w_225h_1c_1s.webp'
  }
  return '/error.webp'
}
</script>
<style scoped lang="scss"></style>
