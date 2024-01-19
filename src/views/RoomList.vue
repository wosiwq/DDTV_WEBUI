<template>
  <div v-loading="isLoading" ref="table_div" class="h-full p-2">
    <ElTableV2 :columns="columns" :data="roomInfoList" :width="width" :height="height" fixed />
  </div>
</template>
<script lang="tsx" setup>
import type { CompleteInfoWithCheck } from '@/types/response'
import type { Column, CheckboxValueType } from 'element-plus'
import { TableV2FixedDir } from 'element-plus'
import { useElementSize } from '@vueuse/core'
import { getDetailedRoomInfoList } from '@/api/get_room'
import type { FunctionalComponent } from 'vue'

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
  },
  {
    key: 'operations',
    title: '操作',
    cellRenderer: () => (
      <>
        <ElButton size="small">编辑</ElButton>
        <ElButton size="small" type="danger">
          删除
        </ElButton>
      </>
    ),
    width: 150,
    align: 'center',
    fixed: TableV2FixedDir.RIGHT
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
onMounted(() => {
  getData()
})
</script>
<style scoped></style>
