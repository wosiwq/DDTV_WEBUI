<template>
  <div class="w-full flex items-center justify-between bg-light-200 p-2 dark:bg-dark-400">
    <ElButtonGroup>
      <ElButton type="info" @click="filter(SearchType.All)">全部</ElButton>
      <ElButton type="info" @click="filter(SearchType.NotLive)">未开播</ElButton>
      <ElButton type="info" @click="filter(SearchType.Live)">直播中</ElButton>
      <ElButton type="info" @click="filter(SearchType.LiveAndRecording)">录制中</ElButton>
      <ElButton type="info" @click="filter(SearchType.LiveButNotRecording)">未录制</ElButton>
    </ElButtonGroup>
    <ElButtonGroup>
      <ElButton type="success" @click="changeAllRec(true)">开启所有录制</ElButton>
      <ElButton type="danger" @click="changeAllRec(false)">关闭所有录制</ElButton>
    </ElButtonGroup>
  </div>
</template>
<script lang="ts" setup>
import { setRoomsRecordState } from '@/api/set_room'
import type { CompleteInfo } from '@/types/response'
import { SearchType } from '@/enums'
const props = defineProps({
  items: {
    type: Object as PropType<CompleteInfo[]>,
    default: () => ({})
  },
  updateFn: {
    type: Function as PropType<() => void>,
    default: () => {}
  },
  filter: {
    type: Function as PropType<(state: SearchType) => void>,
    default: () => {}
  }
})
const changeAllRec = (state: boolean) => {
  const confirmInfo = state ? '开启' : '关闭'
  ElMessageBox.confirm('此操作将' + confirmInfo + '所有录制，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 根据items创造一个uid list
      const uidList = props.items.map((item) => item.userInfo.uid)
      setRoomsRecordState({ uid: uidList, state: state }).then(() => {
        props.updateFn()
        ElMessage.success(confirmInfo + '成功')
      })
    })
    .catch(() => {
      ElMessage.info('已取消' + confirmInfo)
    })
}
</script>
<style scoped lang="scss"></style>
