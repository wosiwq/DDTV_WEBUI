<template>
  <meta name="referrer" content="no-referrer" />
  <ElRow class="h-full">
    <ElCol :lg="12">
      <div class="h-full flex items-center justify-center">
        <ElCard
          class="h-90% w-90%"
          v-loading="isLoading"
          ref="cardDiv"
          style="--el-card-padding: 0">
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
            :style="{
              height: tableDivSize.height.value - headerDivSize.height.value - 10 + 'px',
              willChange: 'scroll-position'
            }">
            <div class="min-w-[500px] flex items-center border-t-1 pl-2 pr-1 dark:border-[#414243]">
              <ElCheckbox
                v-model="item.checked"
                :key="item.uid"
                @change="(checked) => handleCheckboxChange(item, checked)"></ElCheckbox>
              <RoomUser
                class="w-full"
                :key="item.uid"
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
    </ElCol>
    <ElCol :lg="12">
      <div class="h-full flex items-center justify-center">
        <div class="h-90% w-full flex flex-col items-center justify-between">
          <div class="w-90%">
            <ElCard class="w-full" style="--el-card-padding: 0">
              <RecycleScroller
                v-if="checkedRoomInfoList.length > 0"
                :items="checkedRoomInfoList"
                :item-size="69"
                key-field="uid"
                v-slot="{ item }"
                :style="{
                  height:
                    (tableDivSize.height.value - headerDivSize.height.value - 10) / 1.1 + 'px',
                  willChange: 'scroll-position'
                }">
                <div
                  class="min-w-[500px] flex items-center border-t-1 pl-2 pr-1 dark:border-[#414243]">
                  <ElCheckbox
                    v-model="item.checked"
                    :key="item.uid"
                    @change="(checked) => handleCheckboxChange(item, checked)"></ElCheckbox>
                  <RoomUser
                    class="w-full"
                    :room-info="item.roomInfo"
                    :user-info="item.userInfo"
                    :is-download="item.taskStatus.isDownload">
                    <div class="flex items-center space-x-1">
                      <ElTag :type="item.userInfo.isAutoRec ? 'success' : 'danger'">自动录制</ElTag>
                      <ElTag :type="item.userInfo.isRecDanmu ? 'success' : 'danger'">
                        弹幕录制
                      </ElTag>
                      <ElTag :type="item.userInfo.isRemind ? 'success' : 'danger'">直播提醒</ElTag>
                    </div>
                  </RoomUser>
                </div>
              </RecycleScroller>
              <ElEmpty
                v-else
                :style="{
                  height: (tableDivSize.height.value - headerDivSize.height.value - 10) / 1.1 + 'px'
                }"></ElEmpty>
            </ElCard>
          </div>
          <div class="w-90%">
            <ElCard style="--el-card-padding: 0" class="p-1">
              <div class="flex justify-between">
                <div class="flex space-x-4">
                  <ElCheckboxGroup v-model="checkList">
                    <ElCheckbox label="自动录制" value="auto_rec"></ElCheckbox>
                    <ElCheckbox label="弹幕录制" value="rec_danmu"></ElCheckbox>
                    <ElCheckbox label="直播提醒" value="remind"></ElCheckbox>
                  </ElCheckboxGroup>
                  <ElPopconfirm
                    width="13rem"
                    @confirm="handelChangeSetting"
                    :title="getChangeSettingTitle()">
                    ">
                    <template #reference>
                      <ElButton :disabled="checkedRoomInfoList.length == 0" type="info">
                        批量修改房间设置
                      </ElButton>
                    </template>
                  </ElPopconfirm>
                </div>
                <ElPopconfirm
                  width="13rem"
                  @confirm="handelDelRoom"
                  :title="'确定删除这' + checkedRoomInfoList.length + '个直播间？'">
                  <template #reference>
                    <ElButton :disabled="checkedRoomInfoList.length == 0" type="danger">
                      删除所选直播间
                    </ElButton>
                  </template>
                </ElPopconfirm>
              </div>
            </ElCard>
          </div>
        </div>
      </div>
    </ElCol>
  </ElRow>
</template>
<script lang="tsx" setup>
import type { CompleteInfoWithCheck } from '@/types/response'
import type { CheckboxValueType } from 'element-plus'
import { useElementSize } from '@vueuse/core'
import { getDetailedRoomInfoList } from '@/api/get_room'
import { delRooms, setRoomsRecordState, setRoomsRemindState, setRoomsDMState } from '@/api/set_room'
import { SearchType } from '@/enums'
import { Search } from '@/assets/icons'
import RoomUser from '@/components/Room/RoomUser.vue'

const router = useRouter()
const checkList = ref<string[]>([])
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
const checkedRoomInfoList = computed(() => {
  return roomInfoList.value.filter((item) => item.checked)
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

const handelDelRoom = () => {
  if (checkedRoomInfoList.value.length === 0) return
  const uid: bigint[] = checkedRoomInfoList.value.map((item) => item.uid)
  delRooms({ uid })
    .then(() => {
      getData()
      ElMessage.success('删除成功')
    })
    .catch(() => {
      ElMessage.error('删除失败')
    })
}
const handelChangeSetting = () => {
  if (checkedRoomInfoList.value.length === 0) return
  const uid: bigint[] = checkedRoomInfoList.value.map((item) => item.uid)
  const isAutoRec = checkList.value.some((item) => item == 'auto_rec')
  const isRecDanmu = checkList.value.some((item) => item == 'rec_danmu')
  const isRemind = checkList.value.some((item) => item == 'remind')
  setRoomsRecordState({ uid, state: isAutoRec })
    .then(() => {
      return setRoomsDMState({ uid, state: isRecDanmu })
    })
    .then(() => {
      return setRoomsRemindState({ uid, state: isRemind })
    })
    .then(() => {
      router.go(0)
      ElMessage.success('修改成功')
    })
    .catch(() => {
      ElMessage.error('修改失败')
    })
}
const getChangeSettingTitle = () => {
  let msg = `确定要修改${checkedRoomInfoList.value.length}个直播间的`
  msg += `自动录制为${checkList.value.some((item) => item == 'auto_rec') ? '开启' : '关闭'}，`
  msg += `弹幕录制为${checkList.value.some((item) => item == 'rec_danmu') ? '开启' : '关闭'}，`
  msg += `直播提醒为${checkList.value.some((item) => item == 'remind') ? '开启' : '关闭'}吗？`
  return msg
}

onMounted(() => {
  getData()
})
</script>
<style scoped lang="scss">
.el-button + .el-button {
  margin-right: 0;
}
</style>
