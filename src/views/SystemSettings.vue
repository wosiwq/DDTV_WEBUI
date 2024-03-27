<template>
  <div class="h-full p-4">
    <ElCard shadow="never" class="h-full" body-class="h-full">
      <div class="h-full w-full" ref="bodyEl">
        <ElButton ref="buttonEl" class="mb-2" @click="handleReloadConfig">
          重新加载配置文件
        </ElButton>
        <ElForm class="max-w-550px">
          <ElFormItem ref="itemEl" label="存放目录">
            <div class="w-full flex justify-between space-x-4">
              <ElInput v-model="recordingPath"></ElInput>
              <SystemSettingsConfirmButton
                v-model="recordingPathDialogVisible"
                :validate-key="validateKey"
                :popover-msg="dialogMsg"
                :before-enter-function="handelRecordingPathShow"
                :confirm-callback="handelRecordingPathChangeConfirm"></SystemSettingsConfirmButton>
            </div>
          </ElFormItem>
          <ElFormItem label="路径模板">
            <div class="w-full flex justify-between space-x-4">
              <ElInput v-model="fileNameAndPathTemplate"></ElInput>
              <SystemSettingsConfirmButton
                v-model="fileNameDialogVisible"
                :validate-key="validateKey"
                :popover-msg="dialogMsg"
                :before-enter-function="handelFileNameAndPathTemplateShow"
                :confirm-callback="
                  handelFileNameAndPathTemplateChangeConfirm
                "></SystemSettingsConfirmButton>
            </div>
          </ElFormItem>
          <ElCollapse class="max-w-550px">
            <ElCollapseItem title="模板变量说明">
              <ElTable
                :height="
                  bodySize.height.value -
                  (buttonSize.height.value + 8) -
                  (itemSize.height.value + 18) * 2 -
                  50
                "
                :data="templateTableData"
                stripe>
                <ElTableColumn prop="template" label="变量" width="150" />
                <ElTableColumn prop="explain" label="说明" width="250" />
                <ElTableColumn prop="result" label="效果" width="150" />
              </ElTable>
            </ElCollapseItem>
          </ElCollapse>
        </ElForm>
      </div>
    </ElCard>
  </div>
</template>
<script lang="ts" setup>
import moment from 'moment'
import { useElementSize } from '@vueuse/core'
import {
  getFileNameAndPath,
  getRecordingPath,
  setFileNameAndPath,
  setRecordingPath,
  reloadConfig
} from '@/api/config'
import SystemSettingsConfirmButton from '@/components/SystemSettingsConfirmButton.vue'

const router = useRouter()

const date = moment()

const dialogMsg = ref('')
const validateKey = ref()
const recordingPath = ref()
const fileNameAndPathTemplate = ref()
const fileNameDialogVisible = ref(false)
const recordingPathDialogVisible = ref(false)
const bodyEl = ref()
const buttonEl = ref()
const itemEl = ref()

const bodySize = useElementSize(bodyEl)
const buttonSize = useElementSize(buttonEl)
const itemSize = useElementSize(itemEl)

const templateTableData = [
  {
    template: '{ROOMID}',
    explain: '房间号',
    result: '123456'
  },
  {
    template: '{NAME}',
    explain: '主播用户名',
    result: '小明'
  },
  {
    template: '{TITLE}',
    explain: '直播间标题',
    result: '我是标题'
  },
  {
    template: '{DATE}',
    explain: '文件创建日期时间',
    result: date.format('YYYY_MM_DD')
  },
  {
    template: '{YYYY}/{yyyy}',
    explain: '文件创建日期时间之年份',
    result: date.format('YYYY')
  },
  {
    template: '{YY}/{yy}',
    explain: '文件创建日期时间之年份后两位',
    result: date.format('YY')
  },
  {
    template: '{MM}',
    explain: '文件创建日期时间之月份',
    result: date.format('MM')
  },
  {
    template: '{DD}/{dd}',
    explain: '文件创建日期时间之天数',
    result: date.format('DD')
  },
  {
    template: '{HH}',
    explain: '文件创建日期时间之小时',
    result: date.format('HH')
  },
  {
    template: '{hh}',
    explain: '文件创建日期时间之小时(12小时制)',
    result: date.format('hh')
  },
  {
    template: '{mm}',
    explain: '文件创建日期时间之分钟',
    result: date.format('mm')
  },
  {
    template: '{ss}',
    explain: '文件创建日期时间之秒钟',
    result: date.format('ss')
  },
  {
    template: '{FFF}',
    explain: '文件创建日期时间之毫秒',
    result: date.format('SSS')
  },
  {
    template: '{R}',
    explain: '随机数',
    result: '123456'
  },
  {
    template: '\\',
    explain: '文件夹分隔符',
    result: '/'
  }
]

const handleReloadConfig = () => {
  reloadConfig()
    .then(() => {
      ElMessage.success('刷新成功')
      router.go(0)
    })
    .catch(() => {
      ElMessage.error('刷新失败，未知错误')
    })
}
const handelRecordingPathShow = () => {
  fileNameDialogVisible.value = false
  setRecordingPath({ path: recordingPath.value })
    .then((res) => {
      validateKey.value = res.data.data
      dialogMsg.value = `你确定要修改存放目录吗？`
    })
    .catch(() => {
      validateKey.value = -1
      dialogMsg.value = '存放目录错误，请重新校验'
    })
}
const handelRecordingPathChangeConfirm = () => {
  setRecordingPath({
    path: recordingPath.value,
    check: validateKey.value
  })
    .then(() => {
      ElMessage.success('修改成功')
    })
    .catch(() => {
      ElMessage.error('修改失败，未知错误')
    })
    .finally(() => {
      recordingPathDialogVisible.value = false
    })
}

const handelFileNameAndPathTemplateShow = () => {
  recordingPathDialogVisible.value = false
  setFileNameAndPath({ path_and_format: fileNameAndPathTemplate.value })
    .then((res) => {
      validateKey.value = res.data.data
      dialogMsg.value = `你确定要修改路径模板吗？`
    })
    .catch(() => {
      validateKey.value = -1
      dialogMsg.value = '路径模板错误，请重新校验'
    })
}
const handelFileNameAndPathTemplateChangeConfirm = () => {
  setFileNameAndPath({
    path_and_format: fileNameAndPathTemplate.value,
    check: validateKey.value
  })
    .then(() => {
      ElMessage.success('修改成功')
    })
    .catch(() => {
      ElMessage.error('修改失败，未知错误')
    })
    .finally(() => {
      fileNameDialogVisible.value = false
    })
}

onMounted(() => {
  getRecordingPath().then((res) => {
    recordingPath.value = res.data.data
  })
  getFileNameAndPath().then((res) => {
    fileNameAndPathTemplate.value = res.data.data
  })
})
</script>
<style scoped></style>
