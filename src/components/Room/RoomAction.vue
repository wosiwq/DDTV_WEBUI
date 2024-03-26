<template>
  <div class="flex pb-2 pt-2 divide-x-1 divide-light-200 dark:divide-dark-200">
    <div class="action-item">
      <ElTooltip :append-to="popover_main" content="立即分割文件" placement="top">
        <ElIcon
          class=""
          :class="
            taskStatus.isDownload
              ? 'hover:cursor-pointer hover:text-blue'
              : 'hover:cursor-not-allowed icon-disable'
          "
          @click="doSplitRecording()">
          <Cut></Cut>
        </ElIcon>
      </ElTooltip>
    </div>
    <div class="action-item">
      <ElTooltip :append-to="popover_main" :content="getIconContent()" placement="top">
        <ElIcon
          class="hover:cursor-pointer hover:text-blue"
          :class="getIconClassName()"
          @click="handleAppointmentRecord">
          <component :is="getIconComponent()"></component>
        </ElIcon>
      </ElTooltip>
    </div>
    <div class="action-item">
      <ElTooltip :append-to="popover_main" content="自动录制" placement="top">
        <ElSwitch
          style="height: 24px"
          inline-prompt
          active-text="已开启录制"
          inactive-text="已关闭录制"
          v-model="localUserInfo.isAutoRec"
          :loading="loading"
          :before-change="beforeChange"></ElSwitch>
      </ElTooltip>
    </div>
    <!-- FIXME Popover造成性能问题 -->
    <div class="action-item">
      <ElPopover :append-to="popover_main" :effect="isDark ? 'dark' : 'light'" placement="top">
        <div class="flex flex-col items-center"><span>修改直播间设置</span></div>
        <div class="flex flex-col items-center">
          <ElSwitch
            inline-prompt
            v-model="forkUserInfo.isAutoRec"
            active-text="自动录制"
            inactive-text="自动录制"></ElSwitch>
          <ElSwitch
            inline-prompt
            v-model="forkUserInfo.isRecDanmu"
            active-text="弹幕录制"
            inactive-text="弹幕录制"></ElSwitch>
          <ElSwitch
            inline-prompt
            v-model="forkUserInfo.isRemind"
            active-text="直播提醒"
            inactive-text="直播提醒"></ElSwitch>
        </div>
        <ElButton @click="handelChangeRoomSetting" class="w-full" type="primary">确定</ElButton>
        <template #reference>
          <ElIcon class="hover:cursor-pointer hover:text-blue"><Settings></Settings></ElIcon>
        </template>
      </ElPopover>
    </div>
    <div ref="popover_main"></div>
  </div>
</template>
<script lang="ts" setup>
import type { UserInfo, TaskStatus } from '@/types/response'
import { setRoomsRecordState, modifyRoomSettings } from '@/api/set_room'
import { createTask, cancelTask, splitRecording } from '@/api/rec_task'
import useRoomInfoPageData from '@/hooks/useRoomInfoPageData'
import { Settings } from '@/assets/icons'
import Cut from '@/assets/icons/svg/cut.svg'

import Loading from '@/assets/icons/svg/loading.svg'
import Start from '@/assets/icons/svg/start.svg'
import Stop from '@/assets/icons/svg/stop.svg'

const pageData = useRoomInfoPageData()
const popover_main = ref<HTMLElement | undefined>(undefined)
const props = defineProps({
  userInfo: {
    type: Object as PropType<UserInfo>,
    default: () => ({})
  },
  taskStatus: {
    type: Object as PropType<TaskStatus>,
    default: () => ({})
  },
  isDark: {
    type: Boolean,
    default: false
  }
})
const { userInfo } = toRefs(props)
const canCancelTask = computed(() => {
  return userInfo.value.appointmentRecord || props.taskStatus.isDownload
})
const localUserInfo = ref({ ...userInfo.value })
const forkUserInfo = ref({ ...userInfo.value })
const loading = ref(false)
const iconConfig = [
  {
    condition: (userInfo: globalThis.Ref<UserInfo>) => userInfo.value.isAutoRec,
    getComponent: () => Loading,
    getContent: () => '自动录制中',
    getClassName: () => 'rotate-animation icon-disable'
  },
  {
    condition: () => canCancelTask.value,
    getComponent: () => Stop,
    getContent: () => '取消录制',
    getClassName: () => 'text-red'
  },
  {
    // 默认情况
    condition: () => true,
    getComponent: () => Start,
    getContent: () => '开启单次录制',
    getClassName: () => ''
  }
]

watch(userInfo, (newValue) => {
  localUserInfo.value = { ...newValue }
})

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
  if (userInfo.value.isAutoRec) return
  if (canCancelTask.value) {
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
const handelChangeRoomSetting = () => {
  const data = {
    uid: userInfo.value.uid,
    AutoRec: forkUserInfo.value.isAutoRec,
    Remind: forkUserInfo.value.isRemind,
    RecDanmu: forkUserInfo.value.isRecDanmu
  }
  modifyRoomSettings(data)
    .then(() => {
      ElMessage.success('修改成功')
    })
    .catch(() => {
      ElMessage.error('修改失败')
    })
}

const doSplitRecording = () => {
  if (!props.taskStatus.isDownload) return
  splitRecording({ uid: userInfo.value.uid }).then((res) => {
    if (res.data.code === 0) {
      ElMessage.success('分割完成')
    } else {
      ElMessage.warning(res.data.massage)
      console.log(res)
    }
  })
}
const getIconComponent = () => {
  const config = iconConfig.find((c) => c.condition(userInfo))
  return config ? config.getComponent() : null
}

const getIconContent = () => {
  const config = iconConfig.find((c) => c.condition(userInfo))
  return config ? config.getContent() : ''
}

const getIconClassName = () => {
  const config = iconConfig.find((c) => c.condition(userInfo))
  return config ? config.getClassName() : ''
}
</script>
<style scoped lang="scss">
.action-item {
  @apply w-full flex items-center justify-center;
}
.el-button + .el-button {
  margin-left: 0;
}
.text-red {
  --un-text-opacity: 1;
  color: rgb(248 113 113 / var(--un-text-opacity)) !important;
}
.rotate-animation {
  display: inline-block;
  animation: rotate-animation 2s linear infinite;

  @keyframes rotate-animation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
.icon-disable {
  opacity: 0.8;
  cursor: not-allowed;
  color: #ccc;

  &:hover {
    color: #ccc;
  }
}
</style>
