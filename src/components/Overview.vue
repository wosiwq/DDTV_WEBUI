<template>
  <div style="height: 100%" v-loading="!store.is_ready()">
    <div v-if="store.is_ready()">
      <ElRow :gutter="20">
        <ElCol :sm="6">
          <ElCard shadow="hover">
            <template #header>平台</template>
            {{ store.system_resoures_data?.Platform }}
          </ElCard>
        </ElCol>
        <ElCol :sm="6">
          <ElCard shadow="hover">
            <template #header>CPU使用率</template>
            {{ store.system_resoures_data?.CPU_usage + '%' }}
          </ElCard>
        </ElCol>
        <ElCol :sm="6">
          <ElCard shadow="hover">
            <template #header>内存使用情况</template>
            {{
              convertBytesToMiBOrGiB(store.memory_info!.Available) +
              '/' +
              convertBytesToMiBOrGiB(store.memory_info!.Total)
            }}
          </ElCard>
        </ElCol>
        <ElCol :sm="6">
          <ElCard shadow="hover">
            <template #header>内存使用率</template>
            {{ ((store.memory_info!.Available / store.memory_info!.Total) * 100).toFixed(2) + '%' }}
          </ElCard>
        </ElCol>
      </ElRow>
      <ElCard style="margin-top: 10px" shadow="hover">
        <template #header>硬盘使用情况</template>
        <ElCard shadow="hover" v-for="(item, index) in store.hdd_infos" :key="index">
          <template #header>
            {{
              '文件系统：' +
              item.FileSystem +
              '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;挂载路径' +
              item.MountPath
            }}
          </template>
          <ElRow :gutter="20">
            <ElCol :sm="6">
              <ElCard shadow="hover">
                <template #header>硬盘大小</template>
                {{ item.Size }}
              </ElCard>
            </ElCol>

            <ElCol :sm="6">
              <ElCard shadow="hover">
                <template #header>硬盘空闲空间</template>
                {{ item.Avail }}
              </ElCard>
            </ElCol>
            <ElCol :sm="6">
              <ElCard shadow="hover">
                <template #header>硬盘使用空间</template>
                {{ item.Usage }}
              </ElCard>
            </ElCol>
            <ElCol :sm="6">
              <ElCard shadow="hover">
                <template #header>硬盘使用率</template>
                {{ item.Used }}
              </ElCard>
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSystemResourcesStore } from '@/stores/systemResources'

const store = useSystemResourcesStore()

const convertBytesToMiBOrGiB = (bytes: number) => {
  const mib = bytes / 1024 / 1024
  const gib = mib / 1024
  if (gib < 1) {
    return mib.toFixed(2) + 'MB'
  }
  return gib.toFixed(2) + 'GB'
}
</script>
<style scoped lang="scss"></style>
