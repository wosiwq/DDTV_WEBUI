<template>
  <meta name="referrer" content="no-referrer" />
  <div v-loading="RoomInfoList.length == 0" class="h-full">
    <ElScrollbar>
      <div class="card-div grid h-full">
        <div
          class="relative w-[400px] cursor-pointer overflow-hidden border b-light-200 rd transition-all hover:scale-105 dark:b-dark-200 hover:shadow"
          v-for="(item, index) in RoomInfoList"
          :key="index">
          <RoomCover :room-info="item.roomInfo"></RoomCover>
          <div class="divide-y-1 divide-light-200 dark:divide-dark-200">
            <RoomUser
              :is-download="item.taskStatus.isDownload"
              :user-info="item.userInfo"
              :room-info="item.roomInfo"></RoomUser>
            <RoomAction></RoomAction>
          </div>
        </div>
      </div>
    </ElScrollbar>
  </div>
</template>
<script lang="ts" setup>
import RoomUser from '@/components/Room/RoomUser.vue'
import RoomAction from '@/components/Room/RoomAction.vue'
import RoomCover from '@/components/Room/RoomCover.vue'
import { getDetailedRoomInfo } from '@/api/get_room'
import type { CompleteInfoListItem } from '@/types/response'
const RoomInfoList = ref<CompleteInfoListItem[]>([])
const data = { quantity: 0, page: 1 }

getDetailedRoomInfo(data).then((res) => {
  RoomInfoList.value = res.data.data.completeInfoList
})
</script>
<style scoped lang="scss">
.card-div {
  padding: 12px;
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-gap: 12px;
  gap: 12px;
  justify-content: center;
}
</style>
