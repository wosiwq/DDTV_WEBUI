<template>
  <meta name="referrer" content="no-referrer" />
  <ElScrollbar>
    <div v-if="RoomInfoList.length > 0" class="grid card-div h-full">
      <ElCard
        shadow="hover"
        class="cursor-pointer hover:scale-105 transition-all"
        v-for="(item, index) in RoomInfoList"
        :key="index"
        style="--el-card-padding: 0; width: 400px">
        <ElImage
          fit="cover"
          :src="item.roomInfo.CoverFromUser"
          loading="lazy"
          style="width: 400px; height: 225px"></ElImage>
        <div class="m-2">
          <div class="flex">
            <ElAvatar :size="52" :src="item.roomInfo.Face"></ElAvatar>
            <div class="flex flex-col ml-2 justify-between">
              <span>{{ item.userInfo.Name }}</span>
              <span>{{ '房间号：' + item.roomInfo.RoomId }}</span>
            </div>
          </div>
          <div></div>
        </div>
      </ElCard>
    </div>
  </ElScrollbar>
</template>
<script lang="ts" setup>
import { getDetailedRoomInfo } from '@/api'
import type { BasicInfoListItem } from '@/types/response'
const RoomInfoList = ref<BasicInfoListItem[]>([])
const data = { quantity: 0, page: 1 }
getDetailedRoomInfo(data).then((res) => {
  RoomInfoList.value = res.data.data.basicInfolist
  console.log(RoomInfoList.value)
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
