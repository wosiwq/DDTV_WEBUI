<template>
  <meta name="referrer" content="no-referrer" />
  <div
    v-loading="isLoading"
    class="relative h-full divide-y-1 divide-light-100 dark:divide-dark-100">
    <div
      class="absolute bottom-20 right-30 z-2 rd-999px bg-white bg-clip-padding"
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
        <div class="flex justify-between">
          <ElPagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            class="pl-4 pt-2"
            layout="prev, pager, next, jumper ,total"
            :total="total"
            :page-size="12"
            :background="true"></ElPagination>
          <div class="pr-4 pt-2">
            <ElInput
              style="width: 20rem"
              v-model="searchWord"
              placeholder="UID/昵称/房间号/直播标题">
              <template #append>
                <el-button :icon="Search" />
              </template>
            </ElInput>
          </div>
        </div>
        <VirtualizedCard :room-info-list="pagedData"></VirtualizedCard>
        <ElPagination
          hide-on-single-page
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          class="pb-2 pl-4"
          layout="prev, pager, next, jumper, total"
          :total="total"
          :page-size="12"
          :background="true"></ElPagination>
      </ElScrollbar>
    </div>
  </div>
  <ElDialog v-model="showAddRoom"></ElDialog>
</template>
<script lang="ts" setup>
import { FilterState } from '@/enums'
import Plus from '@/assets/icons/svg/plus-circle-fill.svg'
import VirtualizedCard from '@/components/VirtualizedCard.vue'
import { getDetailedRoomInfoList } from '@/api/get_room'
import type { CompleteInfo } from '@/types/response'
import OverviewHeader from '@/components/OverviewHeader.vue'
import { Search } from '@element-plus/icons-vue'

const rawRoomInfoList = ref<CompleteInfo[]>([])
const roomInfoList = ref<CompleteInfo[]>([])

const isLoading = ref(true)
const currentFilterState = ref(0)
const showAddRoom = ref(false)
const currentPage = ref(1)
const searchWord = ref('')

const total = computed(() => {
  return listFilterBySearchWord(roomInfoList.value).length
})

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * 12
  const end = start + 12
  return listFilterBySearchWord(roomInfoList.value).slice(start, end)
})

const listFilterBySearchWord = (list: CompleteInfo[]) => {
  return list.filter((item) => {
    return (
      item.roomInfo.title.includes(searchWord.value) ||
      item.userInfo.name.includes(searchWord.value) ||
      item.userInfo.uid.toString().includes(searchWord.value) ||
      item.roomInfo.roomId.toString().includes(searchWord.value)
    )
  })
}

function handleCurrentChange(val: number) {
  currentPage.value = val
}

const getData = () => {
  isLoading.value = true
  getDetailedRoomInfoList({ quantity: 0, page: 1 }).then((res) => {
    rawRoomInfoList.value = res.data.data.completeInfoList
    roomInfoList.value = rawRoomInfoList.value
    isLoading.value = false
  })
}
const setDate = () => {
  isLoading.value = true
  getDetailedRoomInfoList({ quantity: 0, page: 1 }).then((res) => {
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
