<template>
  <div class="flex justify-between p-2">
    <div class="flex">
      <ElAvatar
        class="cursor-pointer select-none"
        :size="52"
        :src="roomInfo.face ? roomInfo.face + '@52w_52h_1c_1s.webp' : undefined"
        @click="openBiliHomepage()">
        <img src="https://i0.hdslb.com/bfs/face/member/noface.jpg@52w_52h_1c_1s.webp" />
      </ElAvatar>
      <div class="flex flex-col items-start justify-between p-1 pl-2">
        <span class="w-auto cursor-pointer text-sm hover:text-blue" @click="openBiliHomepage()">
          {{ userInfo.name }}{{ '(' + userInfo.uid + ')' }}
        </span>
        <div>
          <span class="text-sm">房间号：</span>
          <span class="cursor-pointer text-sm hover:text-blue" @click="openBiliLiveRoom()">
            {{ roomInfo.roomId === 0 ? '无直播间' : roomInfo.roomId }}
          </span>
        </div>
      </div>
    </div>
    <slot>
      <RoomStatus :room-info="roomInfo" :is-download="isDownload"></RoomStatus>
    </slot>
  </div>
</template>
<script lang="ts" setup>
import RoomStatus from '@/components/Room/RoomStatus.vue'
import type { RoomInfo, UserInfo } from '@/types/response'
const props = defineProps({
  roomInfo: {
    type: Object as PropType<RoomInfo>,
    default: () => ({})
  },
  userInfo: {
    type: Object as PropType<UserInfo>,
    default: () => ({})
  },
  isDownload: {
    type: Boolean,
    default: false
  }
})
const openBiliLiveRoom = () => {
  window.open(props.roomInfo.url)
}
const openBiliHomepage = () => {
  window.open('https://space.bilibili.com/' + props.userInfo.uid)
}
</script>
<style scoped lang="scss"></style>
