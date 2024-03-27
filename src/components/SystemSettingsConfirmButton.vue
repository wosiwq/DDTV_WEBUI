<template>
  <ElPopover :visible="popoverVisible" @before-enter="beforeEnterFunction">
    <template #reference>
      <ElButton type="primary" @click="popoverVisible = true">应用</ElButton>
    </template>
    <span>{{ popoverMsg }}</span>
    <div class="flex justify-between">
      <ElButton size="small" @click="popoverVisible = false">取消</ElButton>
      <ElButton size="small" type="primary" v-if="validateKey !== -1" @click="confirmCallback">
        确定
      </ElButton>
    </div>
  </ElPopover>
</template>
<script lang="ts" setup>
const popoverVisible = defineModel<boolean>({ required: true })
defineProps({
  popoverMsg: {
    type: String,
    default: ''
  },
  validateKey: {
    type: Object as PropType<number | string>,
    default: -1
  },

  beforeEnterFunction: {
    type: Function as PropType<() => void>,
    default: () => {}
  },
  confirmCallback: {
    type: Function as PropType<() => void>,
    default: () => {}
  }
})
</script>
<style scoped lang="scss"></style>
