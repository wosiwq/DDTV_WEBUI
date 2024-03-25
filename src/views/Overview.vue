<template>
  <meta name="referrer" content="no-referrer" />
  <div
    v-loading="pageData.isLoading.value"
    class="relative h-full divide-y-1 divide-light-100 dark:divide-dark-100">
    <div
      class="absolute bottom-20 right-30 z-2 rd-999px bg-white bg-clip-padding"
      @click="showAddRoom = true">
      <ElIcon :size="50" color="#60a5fa" style="vertical-align: -0.5rem"><Plus></Plus></ElIcon>
    </div>
    <OverviewHeader
      :refresh-time="pageData.lastRefreshTime.value"
      :items="pageData.completeInfoList.value"
      class="h-50px"
      :update-fn="setDate"
      :filter="filter"></OverviewHeader>
    <div class="h-[calc(100%-50px)]">
      <ElScrollbar>
        <div class="flex justify-between">
          <ElPagination
            @current-change="handleCurrentChange"
            @size-change="handlePageSizeChange"
            :current-page="pageData.currentPage.value"
            :page-size="pageData.pageSize.value"
            :page-sizes="[12, 24, 36, 48, 60, 72, 84, 96, 108, 120]"
            class="pl-4 pt-2"
            layout="sizes, prev, pager, next, jumper, total"
            :total="pageData.total.value"
            :background="true"></ElPagination>
          <div class="pr-4 pt-2">
            <ElInput
              style="width: 20rem"
              v-model="pageData.searchWord.value"
              @change="handleSearchWordChange"
              placeholder="昵称">
              <template #prepend>
                <el-button :icon="Search" />
              </template>
            </ElInput>
          </div>
        </div>
        <VirtualizedCard :room-info-list="pageData.completeInfoList.value"></VirtualizedCard>
        <ElPagination
          hide-on-single-page
          @current-change="handleCurrentChange"
          @size-change="handlePageSizeChange"
          :current-page="pageData.currentPage.value"
          :page-size="pageData.pageSize.value"
          :page-sizes="[12, 24, 36, 48, 60, 72, 84, 96, 108, 120]"
          class="pb-2 pl-4"
          layout="sizes, prev, pager, next, jumper, total"
          :total="pageData.total.value"
          :background="true"></ElPagination>
      </ElScrollbar>
    </div>
  </div>
  <ElDialog
    v-model="showAddRoom"
    title="添加直播间"
    center
    align-center
    style="min-width: 320px; width: 500px">
    <ElForm label-width="120px" :model="addRoomData">
      <ElFormItem label="UID">
        <ElInput
          :disabled="isNotBlank(addRoomData.room_id)"
          placeholder="支持批量添加，使用英文逗号分隔"
          v-model="addRoomData.uid"></ElInput>
      </ElFormItem>
      <ElFormItem label="房间号">
        <ElInput
          :disabled="isNotBlank(addRoomData.uid)"
          placeholder="UID和房间号二选一"
          v-model="addRoomData.room_id"></ElInput>
      </ElFormItem>
      <ElFormItem label="自动录制"><ElSwitch v-model="addRoomData.auto_rec"></ElSwitch></ElFormItem>
      <ElFormItem label="开播提醒"><ElSwitch v-model="addRoomData.remind"></ElSwitch></ElFormItem>
      <ElFormItem label="录制弹幕">
        <ElSwitch v-model="addRoomData.rec_danmu"></ElSwitch>
      </ElFormItem>
      <ElFormItem><ElButton type="primary" @click="confirmAddRoom">确认</ElButton></ElFormItem>
    </ElForm>
  </ElDialog>
</template>
<script lang="ts" setup>
import VirtualizedCard from '@/components/VirtualizedCard.vue'
import OverviewHeader from '@/components/OverviewHeader.vue'
import Plus from '@/assets/icons/svg/plus-circle-fill.svg'
import useRoomInfoPageData from '@/hooks/useRoomInfoPageData'
import type { Combine } from '@/types'
import { Search } from '@element-plus/icons-vue'
import { SearchType } from '@/enums'
import { addRoom, addRooms } from '@/api/set_room'

const pageData = useRoomInfoPageData()
const showAddRoom = ref(false)
const addRoomData = reactive<
  Combine<
    { uid: string; room_id: string },
    { auto_rec: boolean; remind: boolean; rec_danmu: boolean }
  >
>({
  uid: '',
  room_id: '',
  auto_rec: false,
  remind: false,
  rec_danmu: false
})

function handleCurrentChange(val: number) {
  pageData.currentPage.value = val
  pageData.getData(pageData.currentPage.value)
}

function handlePageSizeChange(val: number) {
  pageData.pageSize.value = val
  pageData.getData(pageData.currentPage.value)
}

const handleSearchWordChange = (val: string) => {
  pageData.isLoading.value = true
  pageData.currentPage.value = 1
  pageData.searchWord.value = val
  pageData.getData(pageData.currentPage.value)
}

const setDate = () => {
  pageData.isLoading.value = true
  pageData.currentPage.value = 1
  pageData.pageSize.value = 12
  pageData.getData(pageData.currentPage.value)
}

const filter = (state: SearchType) => {
  pageData.currentFilterState.value = state
  pageData.currentPage.value = 1
  pageData.getData(1)
}

const isNotBlank = (str: string | undefined): boolean => {
  return str !== '' && str !== undefined
}

const confirmAddRoom = () => {
  if (addRoomData.uid && isNotBlank(addRoomData.uid)) {
    let uidList
    try {
      uidList = addRoomData.uid.split(',').map((s) => BigInt(s))
      if (uidList.length < 0) {
        ElMessage.error('uid输入不合法 请检查')
        return
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        ElMessage.error('uid输入不合法 请检查')
        return
      }
      throw e
    }

    const data = {
      uid: uidList,
      auto_rec: addRoomData.auto_rec,
      remind: addRoomData.remind,
      rec_danmu: addRoomData.rec_danmu
    }
    addRooms(data)
      .then(() => {
        pageData.getData(pageData.currentPage.value)
        ElMessage.success('添加成功')
        showAddRoom.value = false
      })
      .catch(() => {
        ElMessage.error('添加失败')
      })
    return
  }

  const data = {
    room_id: Number(addRoomData.room_id),
    auto_rec: addRoomData.auto_rec,
    remind: addRoomData.remind,
    rec_danmu: addRoomData.rec_danmu
  }
  addRoom(data)
    .then(() => {
      pageData.getData(pageData.currentPage.value)
      ElMessage.success('添加成功')
      showAddRoom.value = false
    })
    .catch(() => {
      ElMessage.error('添加失败')
    })
}

onUnmounted(() => {
  if (pageData.timer !== undefined) {
    clearInterval(pageData.timer)
  }
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
