<template>
  <div class="flex flex-col" :style="{ height: height - 54 + 'px' }" ref="VCard">
    <RecycleScroller
      :items="roomInfoList"
      :grid-items="getGridItems()"
      :item-size="344"
      :item-secondary-size="getCardWidth()"
      :buffer="400"
      class="h-full p-2"
      key-field="userInfo">
      <template #default="{ item }">
        <div class="absolute border b-light-200 rd transition-all dark:b-dark-200">
          <RoomCover :room-info="item.roomInfo"></RoomCover>
          <div class="divide-y-1 divide-light-200 dark:divide-dark-200">
            <RoomUser
              :is-download="item.taskStatus.isDownload"
              :user-info="item.userInfo"
              :room-info="item.roomInfo"></RoomUser>
            <RoomAction :user-info="item.userInfo"></RoomAction>
          </div>
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>
<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import type { CompleteInfoListItem } from '@/types/response'
import RoomUser from '@/components/Room/RoomUser.vue'
import RoomAction from '@/components/Room/RoomAction.vue'
import RoomCover from '@/components/Room/RoomCover.vue'
const { width, height } = useWindowSize()
defineProps({
  roomInfoList: {
    type: Object as PropType<CompleteInfoListItem[]>,
    default: () => ({})
  }
})
const getCardWidth = () => {
  if (width.value < 1040) {
    const cardWidth = (width.value - 64 - 16 - 20) / Math.floor((width.value - 100) / 400)
    return cardWidth
  }
  const cardWidth = (width.value - 200 - 16 - 20) / Math.floor((width.value - 200 - 18 - 20) / 400)
  return cardWidth
}

const getGridItems = () => {
  if (width.value < 1040) {
    return Math.floor((width.value - 100) / 400)
  }
  return Math.floor((width.value - 200) / 400)
}
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
