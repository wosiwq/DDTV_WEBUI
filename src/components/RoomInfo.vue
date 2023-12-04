<template>
  <div>
    <meta name="referrer" content="no-referrer" />
    <ElRow :gutter="20">
      <ElCol v-for="(item, index) in resp" :key="index" :md="6">
        <ElCard shadow="hover">
          <template #header>{{ item.title }}</template>
          <ElImage :src="item.cover_from_user"></ElImage>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>
<script lang="ts" setup>
import { getRoomAllInfo } from '@/api'
import type { Response } from '@/types'

const resp = ref()
getRoomAllInfo().then((res: Response<any>) => {
  console.log(res.data.data)
  resp.value = res.data.data
})
</script>
<style scoped></style>
