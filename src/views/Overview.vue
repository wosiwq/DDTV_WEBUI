<template>
  <meta name="referrer" content="no-referrer" />
  <div
    v-loading="isLoading"
    class="relative h-full divide-y-1 divide-light-100 dark:divide-dark-100">
    <div
      class="absolute bottom-20 right-30 z-1 rd-999px bg-white bg-clip-padding"
      @click="showAddRoom = true">
      <ElIcon :size="50" color="#60a5fa" style="vertical-align: -0.5rem"><Plus></Plus></ElIcon>
    </div>
    <OverviewHeader
      :items="roomInfoList"
      class="h-50px"
      :update-fn="setDate"
      :filter="filter"></OverviewHeader>
    <div class="h-[calc(100%-50px)]">
      <ElScrollbar>
        <VirtualizedCard
          :room-info-list="roomInfoList"
          :current-filter-state="currentFilterState"></VirtualizedCard>
      </ElScrollbar>
    </div>
  </div>
  <ElDialog v-model="showAddRoom"></ElDialog>
</template>
<script lang="ts" setup>
import { FilterState } from '@/enums'
import Plus from '@/assets/icons/svg/plus-circle-fill.svg'
import VirtualizedCard from '@/components/VirtualizedCard.vue'
import { getDetailedRoomInfo } from '@/api/get_room'
import type { CompleteInfo } from '@/types/response'
import OverviewHeader from '@/components/OverviewHeader.vue'
const rawRoomInfoList = ref<CompleteInfo[]>([])
const roomInfoList = ref<CompleteInfo[]>([])
const isLoading = ref(true)
const currentFilterState = ref(0)
const showAddRoom = ref(false)

const getData = () => {
  isLoading.value = true
  getDetailedRoomInfo({ quantity: 0, page: 1 }).then((res) => {
    console.log(res)

    rawRoomInfoList.value = res.data.data.completeInfoList
    roomInfoList.value = rawRoomInfoList.value
    isLoading.value = false
  })
}
const setDate = () => {
  isLoading.value = true
  getDetailedRoomInfo({ quantity: 0, page: 1 }).then((res) => {
    roomInfoList.value = res.data.data.completeInfoList
    isLoading.value = false
  })
}

const filter = (state: FilterState) => {
  currentFilterState.value = state
  switch (state) {
    case FilterState.All:
      roomInfoList.value = rawRoomInfoList.value
      break
    case FilterState.NotLive:
      roomInfoList.value = rawRoomInfoList.value.filter((item) => !item.roomInfo.liveStatus)
      break
    case FilterState.Live:
      roomInfoList.value = rawRoomInfoList.value.filter((item) => item.roomInfo.liveStatus)
      break
    case FilterState.LiveAndRecording:
      roomInfoList.value = rawRoomInfoList.value.filter(
        (item) => item.taskStatus.isDownload && item.roomInfo.liveStatus
      )
      break
    case FilterState.LiveButNotRecording:
      roomInfoList.value = rawRoomInfoList.value.filter(
        (item) => !item.taskStatus.isDownload && item.roomInfo.liveStatus
      )
      break
  }
}
onMounted(() => {
  getData()
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
@/enums/filter_state
