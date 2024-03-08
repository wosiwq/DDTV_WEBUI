<template>
  <div class="flex pb-2 pt-2 divide-x-1 divide-light-200 dark:divide-dark-200">
    <div class="action-item">
      <ElTooltip content="立即分割文件" placement="top">
        <ElIcon class="hover:cursor-pointer hover:text-blue"><Cut></Cut></ElIcon>
      </ElTooltip>
    </div>
    <div class="action-item">
      <ElPopconfirm
        :title="userInfo.appointmentRecord ? '真的要取消预约吗' : '真的要预约录制吗'"
        @confirm="handleAppointmentRecord">
        <template #reference>
          <ElButton
            size="small"
            :disabled="userInfo.isAutoRec"
            :type="
              userInfo.isAutoRec ? 'success' : userInfo.appointmentRecord ? 'success' : 'info'
            ">
            {{
              userInfo.isAutoRec
                ? '自动录制中'
                : userInfo.appointmentRecord
                  ? '已预约录制'
                  : '预约录制'
            }}
          </ElButton>
        </template>
      </ElPopconfirm>
    </div>
    <div class="action-item">
      <ElSwitch
        style="height: 24px"
        inline-prompt
        active-text="已开启录制"
        inactive-text="已关闭录制"
        v-model="localUserInfo.isAutoRec"
        :loading="loading"
        :before-change="beforeChange"></ElSwitch>
    </div>
    <div class="action-item">
      <ElIcon class="hover:cursor-pointer hover:text-blue"><Ellipsis></Ellipsis></ElIcon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { UserInfo } from '@/types/response'
import { setRoomsRecordState } from '@/api/set_room'
import { createTask, cancelTask } from '@/api/rec_task'
import useRoomInfoPageData from '@/hooks/useRoomInfoPageData'
import Ellipsis from '@/assets/icons/svg/ellipsis-v.svg'
import Cut from '@/assets/icons/svg/cut.svg'

const pageData = useRoomInfoPageData()
const props = defineProps({
  userInfo: {
    type: Object as PropType<UserInfo>,
    default: () => ({})
  }
})
const { userInfo } = toRefs(props)
const localUserInfo = ref({ ...userInfo.value })
watch(userInfo, (newValue) => {
  localUserInfo.value = { ...newValue }
})

const loading = ref(false)
const beforeChange = async () => {
  loading.value = true
  const data = {
    uid: [props.userInfo.uid],
    state: !props.userInfo.isAutoRec
  }
  try {
    await setRoomsRecordState(data)
    pageData.getData(pageData.currentPage.value)
    ElMessage.success('修改成功')
    return true
  } catch {
    ElMessage.error('修改失败')
    return false
  } finally {
    loading.value = false
  }
}
const handleAppointmentRecord = () => {
  if (userInfo.value.appointmentRecord) {
    const data = {
      uid: props.userInfo.uid,
      state: false
    }
    try {
      cancelTask(data).then(() => {
        pageData.getData(pageData.currentPage.value)
        ElMessage.success('修改成功')
      })
    } catch {
      ElMessage.error('修改失败')
    }
  } else {
    const data = {
      uid: props.userInfo.uid,
      state: true
    }
    try {
      createTask(data).then(() => {
        pageData.getData(pageData.currentPage.value)
        ElMessage.success('修改成功')
      })
    } catch {
      ElMessage.error('修改失败')
    }
  }
}
</script>
<style scoped lang="scss">
.action-item {
  @apply w-full flex items-center justify-center;
}
</style>
