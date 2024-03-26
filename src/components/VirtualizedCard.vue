<template>
  <div class="card-div">
    <div
      class="w-400px border b-light-200 rd transition-all dark:b-dark-200"
      v-for="(i, index) in roomInfoList"
      :key="'item' + index">
      <RoomCover :room-info="i.roomInfo"></RoomCover>
      <div class="divide-y-1 divide-light-200 dark:divide-dark-200">
        <RoomUser
          :is-download="i.taskStatus.isDownload"
          :user-info="i.userInfo"
          :room-info="i.roomInfo"></RoomUser>
        <RoomAction
          :user-info="i.userInfo"
          :task-status="i.taskStatus"
          :is-dark="isDark"></RoomAction>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { CompleteInfo } from '@/types/response'
import RoomUser from '@/components/Room/RoomUser.vue'
import RoomAction from '@/components/Room/RoomAction.vue'
import RoomCover from '@/components/Room/RoomCover.vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()

defineProps({
  roomInfoList: {
    type: Object as PropType<CompleteInfo[]>,
    default: () => ({})
  }
})
</script>
<style scoped lang="scss">
.card-div {
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  justify-content: center;
}
</style>
