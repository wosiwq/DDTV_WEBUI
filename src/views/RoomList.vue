<template>
  <div class="h-full flex justify-between">
    <div class="h-full w-50% flex items-center justify-center">
      <ElCard
        class="h-90% w-90%"
        v-loading="isLoading"
        ref="table_div"
        style="--el-card-padding: 0">
        <ElTableV2 :columns="columns" :data="roomInfoList" :width="width" :height="height" fixed />
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
import type { Column, CheckboxValueType } from 'element-plus'
import { useElementSize } from '@vueuse/core'
import { getDetailedRoomInfoList } from '@/api/get_room'
import type { FunctionalComponent } from 'vue'
import { delRoom } from '@/api/set_room'

const roomInfoList = ref<CompleteInfoWithCheck[]>([])
const total = ref(0)
const isLoading = ref(true)
const table_div = ref<HTMLElement | null>(null)
const { width, height } = useElementSize(table_div)

type SelectionCellProps = {
  value: boolean
  intermediate?: boolean
  onChange: (value: CheckboxValueType) => void
}

const SelectionCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  intermediate = false,
  onChange
}) => {
  return <ElCheckbox onChange={onChange} modelValue={value} indeterminate={intermediate} />
}

const columns: Column<any>[] = [
  {
    key: 'userInfo.name',
    title: '昵称',
    dataKey: 'userInfo.name',
    width: 150,
    sortable: true
  },
  {
    key: 'uid',
    title: 'UID',
    dataKey: 'uid',
    width: 150,
    sortable: true
  },
  {
    key: 'roomId',
    title: '房间号',
    dataKey: 'roomId',
    width: 150,
    sortable: true
  },
  {
    key: 'userInfo.isAutoRec',
    title: '自动录制状态',
    dataKey: 'userInfo.isAutoRec',
    width: 150,
    sortable: true,
    align: 'center',
    cellRenderer: ({ cellData: isAutoRec }) => (
      <ElTag type={isAutoRec ? 'success' : 'danger'}>{isAutoRec ? '开启' : '关闭'}</ElTag>
    )
  },
  {
    key: 'taskStatus.isDownload',
    title: '录制状态',
    dataKey: 'taskStatus.isDownload',
    width: 150,
    sortable: true,
    align: 'center',
    cellRenderer: ({ cellData: isDownload }) => (
      <ElTag type={isDownload ? 'success' : 'info'}>{isDownload ? '录制中' : '未录制'}</ElTag>
    )
  }
]

columns.unshift({
  key: 'selection',
  width: 50,
  cellRenderer: ({ rowData }) => {
    const onChange = (value: CheckboxValueType) => (rowData.checked = value)
    return <SelectionCell value={rowData.checked} onChange={onChange} />
  },

  headerCellRenderer: () => {
    const _data = unref(roomInfoList)
    const onChange = (value: CheckboxValueType) =>
      (roomInfoList.value = _data.map((row) => {
        row.checked = value
        return row
      }))
    const allSelected = _data.every((row) => row.checked)
    const containsChecked = _data.some((row) => row.checked)

    return (
      <SelectionCell
        value={allSelected}
        intermediate={containsChecked && !allSelected}
        onChange={onChange}
      />
    )
  }
})

const getData = () => {
  getDetailedRoomInfoList({}).then((res) => {
    roomInfoList.value = res.data.data.completeInfoList
    total.value = res.data.data.total
    isLoading.value = false
  })
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
<style scoped></style>
