<template>
  <!-- TODO 手机适配 白天模式 -->
  <ElConfigProvider :locale="locale">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = ref(zhCn)
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
html {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
