<template>
  <meta name="referrer" content="no-referrer" />
  <div v-loading="RoomInfoList.length == 0" class="h-full">
    <ElScrollbar>
      <div class="card-div grid h-full">
        <ElCard
          shadow="hover"
          class="relative cursor-pointer transition-all hover:scale-105"
          v-for="(item, index) in RoomInfoList"
          :key="index"
          style="--el-card-padding: 0; width: 400px">
          <div class="relative">
            <div
              class="absolute left-0 top-0 z-1 h-[60px] w-full pl-2 pt-1"
              style="
                background-image: linear-gradient(
                  0deg,
                  rgba(0, 0, 0, 0) 0,
                  rgba(0, 0, 0, 0.6) 100%
                );
              ">
              <span class="text-lg">{{ item.roomInfo.title }}</span>
            </div>
            <div
              class="absolute bottom-0 left-0 z-1 h-[40px] w-full flex items-end pb-2 pl-2"
              style="
                background-image: linear-gradient(
                  180deg,
                  rgba(0, 0, 0, 0) 0,
                  rgba(0, 0, 0, 0.5) 100%
                );
              ">
              <span>{{ item.roomInfo.areaName }}</span>
            </div>
            <ElImage
              fit="cover"
              :src="
                item.roomInfo.coverFromUser
                  ? item.roomInfo.coverFromUser + '@400w_225h_1c_1s.webp'
                  : item.roomInfo.keyFrame + '@400w_225h_1c_1s.webp'
              "
              loading="lazy"
              style="width: 400px; height: 225px"
              class="select-none"></ElImage>
          </div>
          <!-- 上半部分 -->
          <div class="divide-y-1">
            <div class="m-2 flex justify-between">
              <!-- icon+name -->
              <div class="flex">
                <ElAvatar
                  class="select-none"
                  :size="52"
                  :src="item.roomInfo.face + '@52w_52h_1c_1s.webp'"></ElAvatar>
                <div class="m-1 ml-2 flex flex-col justify-between">
                  <span class="text-sm">{{ item.userInfo.name }}</span>
                  <div>
                    <span class="text-sm">房间号：</span>
                    <span
                      class="text-sm hover:text-blue"
                      @click="openBiliLiveRoom(item.roomInfo.url)">
                      {{ item.roomInfo.roomId }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 开播状态 -->
              <div>
                <LiveStatus
                  :room-info="item.roomInfo"
                  :is-download="item.taskStatus.isDownload"></LiveStatus>
              </div>
            </div>

            <!-- 下半部分 -->
            <div class="flex b-0 b-gray-200 b-solid divide-x-1 dark:b-dark-200">
              <div class="w-full flex items-center justify-center">1</div>
              <div class="w-full flex items-center justify-center">2</div>
              <div class="w-full flex items-center justify-center">3</div>
              <div class="w-full flex items-center justify-center">4</div>
            </div>
          </div>
        </ElCard>
      </div>
    </ElScrollbar>
  </div>
</template>
<script lang="ts" setup>
import LiveStatus from '@/components/LiveStatus.vue'
import { getDetailedRoomInfo } from '@/api/get_room'
import type { CompleteInfoListItem } from '@/types/response'
const RoomInfoList = ref<CompleteInfoListItem[]>([])
const data = { quantity: 0, page: 1 }

getDetailedRoomInfo(data).then((res) => {
  RoomInfoList.value = res.data.data.completeInfoList
  console.log(RoomInfoList.value)
})

const openBiliLiveRoom = (url: string) => {
  window.open(url)
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
