<template>
  <div>
    <div>{{ route.params.path }}</div>
    <NPlayer :options="{ src: 'https://v-cdn.zjol.com.cn/280443.mp4' }" :set="setPlayer"></NPlayer>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute()
const player = ref()
const setPlayer = (p: any) => {
  player.value = p
  console.log(route.params)
}
</script>
<style scoped lang="scss"></style>
