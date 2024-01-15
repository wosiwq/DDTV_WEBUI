<template>
  <div class="flex" :style="{ height: height - 54 + 'px' }" v-bind="containerProps">
    <div v-bind="wrapperProps">
      <div v-for="item in list" :key="item.index" class="flex">
        <div class="card-div">
          <div
            class="ml-1 mt-1 w-400px border b-light-200 rd transition-all dark:b-dark-200"
            v-for="(i, index) in item.data"
            :key="'item' + index">
            <RoomCover :room-info="i.roomInfo"></RoomCover>
            <!-- <div class="h-225px w-400px bg-blue"></div> -->
            <div class="divide-y-1 divide-light-200 dark:divide-dark-200">
              <RoomUser
                :is-download="i.taskStatus.isDownload"
                :user-info="i.userInfo"
                :room-info="i.roomInfo"></RoomUser>
              <RoomAction :user-info="i.userInfo"></RoomAction>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <RecycleScroller -->
    <!-- :items="roomInfoList" -->
    <!-- :grid-items="getGridItems()" -->
    <!-- :item-size="340" -->
    <!-- :item-secondary-size="getCardWidth()" -->
    <!-- :buffer="400" -->
    <!-- class="h-full p-2" -->
    <!-- key-field="uid"> -->
    <!-- <template #default="{ item }"> -->
    <!-- <div class="absolute ml-1 mt-1 border b-light-200 rd transition-all dark:b-dark-200"> -->
    <!-- <RoomCover :room-info="item.roomInfo"></RoomCover> -->
    <!-- <div class="divide-y-1 divide-light-200 dark:divide-dark-200"> -->
    <!-- <RoomUser -->
    <!-- :is-download="item.taskStatus.isDownload" -->
    <!-- :user-info="item.userInfo" -->
    <!-- :room-info="item.roomInfo"></RoomUser> -->
    <!-- <RoomAction :user-info="item.userInfo"></RoomAction> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- </template> -->
    <!-- </RecycleScroller> -->
  </div>
</template>
<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import type { CompleteInfo } from '@/types/response'
import RoomUser from '@/components/Room/RoomUser.vue'
import RoomAction from '@/components/Room/RoomAction.vue'
import RoomCover from '@/components/Room/RoomCover.vue'
import { useVirtualList } from '@vueuse/core'

const { width, height } = useWindowSize()
const props = defineProps({
  roomInfoList: {
    type: Object as PropType<CompleteInfo[]>,
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

const getGridItems = computed(() => {
  if (width.value < 1040) {
    return Math.floor((width.value - 100) / 400)
  }
  return Math.floor((width.value - 271) / 400)
})

const getGridItemsList = computed(() => {
  const gridItems = getGridItems.value
  const gridItemsList = []
  const roomInfoList = props.roomInfoList
  for (let i = 0; i < roomInfoList.length; i += gridItems) {
    gridItemsList.push(roomInfoList.slice(i, i + gridItems))
  }
  return gridItemsList
})

const { list, containerProps, wrapperProps } = useVirtualList(getGridItemsList, {
  itemHeight: 340,
  overscan: 1
})
</script>
<style scoped lang="scss">
.card-div {
  display: grid;
  width: calc(100% - 20px);
  grid-template-columns: repeat(auto-fill, 400px);
  grid-gap: 12px;
  justify-content: center;
}
</style>
