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
        <VirtualizedCard :room-info-list="roomInfoList"></VirtualizedCard>
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
import { SearchType } from '@/enums'
import Plus from '@/assets/icons/svg/plus-circle-fill.svg'
import VirtualizedCard from '@/components/VirtualizedCard.vue'
import { getDetailedRoomInfoList } from '@/api/get_room'
import type { CompleteInfo } from '@/types/response'
import OverviewHeader from '@/components/OverviewHeader.vue'
import { Search } from '@element-plus/icons-vue'

const roomInfoList = ref<CompleteInfo[]>([])

const isLoading = ref(true)
const currentFilterState = ref<SearchType>(0)
const showAddRoom = ref(false)
const currentPage = ref(1)
const searchWord = ref('')

const total = ref(0)

function handleCurrentChange(val: number) {
  currentPage.value = val
  getData(currentPage.value)
}

const getData = (page: number) => {
  isLoading.value = true
  getDetailedRoomInfoList({
    quantity: 12,
    page: page,
    type: currentFilterState.value
  }).then((res) => {
    roomInfoList.value = res.data.data.completeInfoList
    total.value = res.data.data.total
    isLoading.value = false
  })
}
const setDate = () => {
  isLoading.value = true
  currentPage.value = 1
  getDetailedRoomInfoList({ quantity: 12, page: 1 }).then((res) => {
    roomInfoList.value = res.data.data.completeInfoList
    isLoading.value = false
  })
}

const filter = (state: SearchType) => {
  currentFilterState.value = state
  currentPage.value = 1
  getData(1)
}
onMounted(() => {
  getData(1)
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
