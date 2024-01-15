<template>
  <div :style="{ height: height - 54 + 'px' }" v-bind="containerProps">
    <div v-bind="wrapperProps">
      <div v-for="item in list" :key="item.index" class="flex">
        <div class="w-[calc(100%_-_20px)] flex items-center justify-center">
          <div
            class="ml-1 mt-1 w-400px border b-light-200 rd transition-all dark:b-dark-200"
            v-for="(i, index) in item.data"
            :key="'item' + index">
            <RoomCover :room-info="i.roomInfo"></RoomCover>
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
<style scoped lang="scss"></style>
