import { defineStore } from 'pinia'
import type { Memory, HDDInfo, SystemResourcesData, LiteSystemResourcesData } from '@/types'

export const useSystemResourcesStore = defineStore('systemResources', () => {
  const memory_info = ref<Memory>()
  const hdd_infos = ref<HDDInfo[]>()
  const system_resoures_data = ref<LiteSystemResourcesData>()
  const update_handler = (data: SystemResourcesData) => {
    memory_info.value = data.Memory
    hdd_infos.value = data.HDDInfo
    system_resoures_data.value = { Platform: data.Platform, CPU_usage: data.CPU_usage }
  }
  const is_ready = () => {
    return (
      memory_info.value !== undefined &&
      hdd_infos.value !== undefined &&
      system_resoures_data.value !== undefined
    )
  }
  return { memory_info, update_handler, hdd_infos, system_resoures_data, is_ready }
})
