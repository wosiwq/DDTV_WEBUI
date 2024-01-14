<template>
  <div v-if="roomInfo.liveStatus" class="h-full flex flex-col items-end justify-start">
    <div class="flex justify-between">
      <div class="b-1 b-green-800 rd b-solid bg-green-200 pl-1 pr-1">
        <span class="text-sm text-green-800 line-height-[1.5rem]">直播中</span>
      </div>
      <div v-if="isDownload" class="b-1 b-yellow-800 rd b-solid bg-yellow-200 pl-1 pr-1">
        <span class="text-sm text-yellow-800 line-height-[1.5rem]">录制中</span>
      </div>
      <div v-else class="b b-red-800 rd b-solid bg-red-200 pl-1 pr-1">
        <span class="text-sm text-red-800 line-height-[1.5rem]">未录制</span>
      </div>
    </div>
  </div>
  <div v-else class="h-full flex flex-col items-end justify-start">
    <div class="b-gray-600 rd bg-gray-200 pl-1 pr-1">
      <span class="text-sm text-gray-600 line-height-[1.5rem]">未开播</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { RoomInfo } from '@/types/response'
defineProps({
  roomInfo: {
    type: Object as PropType<RoomInfo>,
    default: () => ({})
  },
  isDownload: {
    type: Boolean,
    default: false
  }
})
</script>
<style scoped lang="scss"></style>
