<template>
  <div class="w-full flex items-center justify-between bg-light-200 p-2 dark:bg-dark-400">
    <ElButtonGroup v-if="width > 768">
      <ElButton
        v-for="item in optionList"
        :key="item.value"
        type="info"
        @click="searchType = item.value">
        {{ item.label }}
      </ElButton>
    </ElButtonGroup>
    <ElSelect v-model="searchType" v-else>
      <ElOption
        v-for="item in optionList"
        :key="item.value"
        :label="item.label"
        :value="item.value"></ElOption>
    </ElSelect>
    <div class="block">{{ '上次更新：' + refreshTime }}</div>
  </div>
</template>
<script lang="ts" setup>
import type { CompleteInfo } from '@/types/response'
import { SearchType } from '@/enums'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
const searchType = ref(SearchType.All)
watch(searchType, (val) => {
  console.log(val)

  props.filter(val)
})
const optionList = [
  {
    label: '全部',
    value: SearchType.All
  },
  {
    label: '未开播',
    value: SearchType.NotLive
  },
  {
    label: '直播中',
    value: SearchType.Live
  },
  {
    label: '录制中',
    value: SearchType.LiveAndRecording
  },
  {
    label: '未录制',
    value: SearchType.LiveButNotRecording
  }
]

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
  },
  refreshTime: {
    type: String,
    default: new Date().toLocaleTimeString()
  }
})
</script>
<style scoped lang="scss"></style>
