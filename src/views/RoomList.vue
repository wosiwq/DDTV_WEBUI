<template>
  <meta name="referrer" content="no-referrer" />
  <div class="h-full flex justify-between">
    <div class="h-full w-50% flex items-center justify-center">
      <ElCard class="h-90% w-90%" v-loading="isLoading" ref="cardDiv" style="--el-card-padding: 0">
        <template #header>
          <div ref="headerDiv" class="flex justify-between p-1 pl-2">
            <ElCheckbox
              v-model="allSelected"
              :indeterminate="containsChecked && !allSelected"
              @change="onChange"></ElCheckbox>
            <ElInput
              v-model="searchWord"
              style="width: 240px"
              :prefix-icon="Search"
              placeholder="用户名/UID"></ElInput>
          </div>
        </template>
        <RecycleScroller
          :items="roomInfoList"
          :item-size="69"
          key-field="uid"
          v-slot="{ item }"
          :style="'height:' + (tableDivSize.height.value - headerDivSize.height.value - 10) + 'px'">
          <div class="flex items-center border-t-1 pl-2 pr-1 dark:border-[#414243]">
            <ElCheckbox
              v-model="item.checked"
              @change="(checked) => handleCheckboxChange(item, checked)"></ElCheckbox>
            <RoomUser
              class="w-full"
              :room-info="item.roomInfo"
              :user-info="item.userInfo"
              :is-download="item.taskStatus.isDownload">
              <div class="flex items-center space-x-1">
                <ElTag :type="item.userInfo.isAutoRec ? 'success' : 'danger'">自动录制</ElTag>
                <ElTag :type="item.userInfo.isRecDanmu ? 'success' : 'danger'">弹幕录制</ElTag>
                <ElTag :type="item.userInfo.isRemind ? 'success' : 'danger'">直播提醒</ElTag>
              </div>
            </RoomUser>
          </div>
        </RecycleScroller>
      </ElCard>
    </div>
    <div class="h-full w-50% flex items-center justify-center">
      <div class="h-90% w-full flex flex-col items-center justify-between">
        <div class="w-90%"><ElCard class="w-full">123</ElCard></div>
        <div class="w-90%">
          <ElCard></ElCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import type { CompleteInfoWithCheck } from '@/types/response'
import type { CheckboxValueType } from 'element-plus'
import { useElementSize } from '@vueuse/core'
import { getDetailedRoomInfoList } from '@/api/get_room'
import { delRoom } from '@/api/set_room'
import { SearchType } from '@/enums'
import { Search } from '@/assets/icons'
import RoomUser from '@/components/Room/RoomUser.vue'

const searchWord = ref()
const realRoomInfoList = ref<CompleteInfoWithCheck[]>([])
const roomInfoList = computed(() => {
  if (!searchWord.value || !realRoomInfoList.value) return realRoomInfoList.value
  return realRoomInfoList.value.filter((item) => {
    return (
      item.userInfo.name.toLowerCase().includes(searchWord.value.toLowerCase()) ||
      item.userInfo.uid.toString().includes(searchWord.value)
    )
  })
})
const allSelected = computed(() => {
  return roomInfoList.value.every((item) => item.checked)
})
const containsChecked = computed(() => {
  return roomInfoList.value.some((item) => item.checked)
})
const total = ref(0)
const isLoading = ref(true)
const cardDiv = ref<HTMLElement | null>(null)
const headerDiv = ref<HTMLElement | null>(null)
const tableDivSize = useElementSize(cardDiv)
const headerDivSize = useElementSize(headerDiv)

const getData = () => {
  getDetailedRoomInfoList({ type: SearchType.Original }).then((res) => {
    realRoomInfoList.value = res.data.data.completeInfoList
    total.value = res.data.data.total
    isLoading.value = false
  })
}
const onChange = (value: CheckboxValueType) => {
  const lookup = new Map(roomInfoList.value.map((item) => [item.userInfo.uid, item.checked]))
  realRoomInfoList.value.forEach((item) => {
    if (lookup.has(item.userInfo.uid)) {
      item.checked = value
    }
  })
}

const handleCheckboxChange = (item: CompleteInfoWithCheck, checked: CheckboxValueType) => {
  const targetItem = realRoomInfoList.value.find(
    (roomItem) => roomItem.userInfo.uid === item.userInfo.uid
  )
  if (targetItem) {
    targetItem.checked = checked
  }
}

const handelDelRoom = (uid: bigint) => {
  delRoom({ uid })
    .then(() => {
      getData()
      ElMessage.success('删除成功')
    })
    .catch(() => {
      ElMessage.error('删除失败')
    })
}

onMounted(() => {
  getData()
})
</script>
<style scoped lang="scss"></style>
