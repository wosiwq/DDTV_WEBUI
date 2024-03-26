<template>
  <div v-loading="isLoading" class="h-full w-full flex">
    <!-- TODO 换个更好看的文件管理器 -->
    <ElTree
      class="h-full w-full"
      :data="fileTreeNode?.Children"
      :expand-on-click-node="false"
      :props="{ label: 'Name', children: 'Children' }">
      <template #default="{ node, data }">
        <span class="flex items-center justify-between" style="flex: 1">
          <span>{{ node.label }}</span>
          <div>
            <span
              v-if="data.Extension === '.mp4'"
              @click="watchVideo(data)"
              class="hover:text-blue">
              查看
            </span>
            <a
              download
              v-if="data.Type === FileTreeType.File"
              :href="data.RelativePath"
              class="hover:text-blue">
              下载
            </a>
          </div>
        </span>
      </template>
    </ElTree>
  </div>
</template>
<script lang="ts" setup>
import { getFileTree } from '@/api/file'
import type { FileTreeNode } from '@/types/response'
import FileTreeType from '@/enums/file_tree_type'
const fileTreeNode = ref<FileTreeNode>()
const router = useRouter()
const isLoading = ref(true)

const watchVideo = (node: FileTreeNode) => {
  router.push({
    name: 'video_player',
    query: {
      path: node.RelativePath
    }
  })
}
onMounted(() => {
  getFileTree().then((res) => {
    fileTreeNode.value = res.data.data
    isLoading.value = false
  })
})
</script>
<style scoped></style>
