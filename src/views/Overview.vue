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
            @size-change="handlePageSizeChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[12, 24, 36, 48, 60, 72, 84, 96, 108, 120]"
            class="pl-4 pt-2"
            layout="sizes, prev, pager, next, jumper, total"
            :total="total"
            :background="true"></ElPagination>
          <div class="pr-4 pt-2">
            <ElInput
              style="width: 20rem"
              v-model="searchWord"
              @input="handleSearchWordChange"
              placeholder="昵称">
              <template #prepend>
                <el-button :icon="Search" />
              </template>
            </ElInput>
          </div>
        </div>
        <VirtualizedCard :room-info-list="roomInfoList"></VirtualizedCard>
        <ElPagination
          hide-on-single-page
          @current-change="handleCurrentChange"
          @size-change="handlePageSizeChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[12, 24, 36, 48, 60, 72, 84, 96, 108, 120]"
          class="pb-2 pl-4"
          layout="sizes, prev, pager, next, jumper, total"
          :total="total"
          :background="true"></ElPagination>
      </ElScrollbar>
    </div>
  </div>
  <ElDialog v-model="showAddRoom"></ElDialog>
</template>
<script lang="ts" setup>
import VirtualizedCard from '@/components/VirtualizedCard.vue'
import OverviewHeader from '@/components/OverviewHeader.vue'
import Plus from '@/assets/icons/svg/plus-circle-fill.svg'
import { Search } from '@element-plus/icons-vue'
import { useDebounceFn } from '@vueuse/core'

import type { CompleteInfo } from '@/types/response'
import { SearchType } from '@/enums'

import { getDetailedRoomInfoList } from '@/api/get_room'

const pageSize = ref(12)
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

function handlePageSizeChange(val: number) {
  pageSize.value = val
  getData(currentPage.value)
}

const handleSearchWordChange = useDebounceFn((val: string) => {
  isLoading.value = true
  currentPage.value = 1
  searchWord.value = val
  getDetailedRoomInfoList({ quantity: 12, page: 1, screen_name: searchWord.value }).then((res) => {
    roomInfoList.value = res.data.data.completeInfoList
    total.value = res.data.data.total
    isLoading.value = false
  })
}, 1000)

const getData = (page: number) => {
  getDetailedRoomInfoList({
    quantity: pageSize.value,
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
  pageSize.value = 12
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
