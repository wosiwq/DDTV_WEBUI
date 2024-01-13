<template>
  <div class="flex pb-2 pt-2 divide-x-1 divide-light-200 dark:divide-dark-200">
    <div class="action-item">切割</div>
    <div class="action-item">开关task</div>
    <div class="action-item">
      <ElSwitch
        style="height: 24px"
        inline-prompt
        active-text="已开启录制"
        inactive-text="已关闭录制"
        v-model="isAutoRec"
        :loading="loading"
        :before-change="beforeChange"></ElSwitch>
    </div>
    <div class="action-item">设置</div>
  </div>
</template>
<script lang="ts" setup>
import type { UserInfo } from '@/types/response'
import { setRoomsRecordState } from '@/api/set_room'
const props = defineProps({
  userInfo: {
    type: Object as PropType<UserInfo>,
    default: () => ({})
  }
})
const isAutoRec = ref(props.userInfo.isAutoRec)
const loading = ref(false)
const beforeChange = async () => {
  loading.value = true
  const data = {
    uid: [props.userInfo.uid],
    state: !isAutoRec
  }

  try {
    await setRoomsRecordState(data)
    ElMessage.success('修改成功')
    return true
  } catch {
    ElMessage.error('修改失败')
    return false
  } finally {
    loading.value = false
  }
}
</script>
<style scoped lang="scss">
.action-item {
  @apply w-full flex items-center justify-center;
}
</style>
