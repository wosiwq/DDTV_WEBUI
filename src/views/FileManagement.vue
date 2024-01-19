<template>
  <div>file</div>
</template>
<script lang="ts" setup>
import { getFileTree } from '@/api/file'

onMounted(async () => {
  const res = await getFileTree()
  console.log(res.data.data)
})
</script>
<style scoped></style>
