<template>
  <div class="h-full flex p-2">
    <div class="p-10">
      <ElTree
        class="w-5xl"
        :data="fileTreeNode?.Children"
        :expand-on-click-node="false"
        :props="{ label: 'Name', children: 'Children' }">
        <template #default="{ node, data }">
          <span class="flex items-center justify-between" style="flex: 1">
            <span>{{ node.label }}</span>
            <span
              v-if="data.Extension === '.mp4'"
              @click="watchVideo(data)"
              class="hover:text-blue">
              查看
            </span>
          </span>
        </template>
      </ElTree>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getFileTree } from '@/api/file'
import type { FileTreeNode } from '@/types/response'
const fileTreeNode = ref<FileTreeNode>()

const watchVideo = (node: FileTreeNode) => {
  console.log(node)
}
onMounted(() => {
  getFileTree().then((res) => {
    fileTreeNode.value = res.data.data
  })
})
</script>
<style scoped></style>
