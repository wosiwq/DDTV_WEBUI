<template>
  <meta name="referrer" content="no-referrer" />
  <div v-loading="isLoading" class="h-full divide-y-1 divide-light-100 dark:divide-dark-100">
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
</template>
<script lang="ts" setup>
import VirtualizedCard from '@/components/VirtualizedCard.vue'
import { getDetailedRoomInfo } from '@/api/get_room'
import type { CompleteInfoListItem } from '@/types/response'
import OverviewHeader from '@/components/OverviewHeader.vue'
const rawRoomInfoList = ref<CompleteInfoListItem[]>([])
const roomInfoList = ref<CompleteInfoListItem[]>([])
const isLoading = ref(true)
const currentFilterState = ref(0)

const getData = () => {
  isLoading.value = true
  getDetailedRoomInfo({ quantity: 0, page: 1 }).then((res) => {
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

const filter = (state: number) => {
  currentFilterState.value = state
  switch (state) {
    case 0:
      roomInfoList.value = rawRoomInfoList.value
      break
    case 1:
      roomInfoList.value = rawRoomInfoList.value.filter((item) => !item.roomInfo.liveStatus)
      break
    case 2:
      roomInfoList.value = rawRoomInfoList.value.filter((item) => item.roomInfo.liveStatus)
      break
    case 3:
      roomInfoList.value = rawRoomInfoList.value.filter(
        (item) => item.taskStatus.isDownload && item.roomInfo.liveStatus
      )
      break
    case 4:
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
