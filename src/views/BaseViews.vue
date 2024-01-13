<template>
  <ElContainer class="main-container">
    <ElAside width="auto">
      <AsideMenu></AsideMenu>
    </ElAside>
    <ElMain style="--el-main-padding: 0" class="h-full w-full">
      <RouterView></RouterView>
    </ElMain>
  </ElContainer>

  <ElDialog
    title="DDTV的所有功能均依赖于B站的cookie,当前仅支持使用B站扫码登陆后使用"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="auto"
    center
    align-center
    v-model="dialogVisible">
    <div class="bili-login-qrcode-div">
      <ElImage :src="imageUrl" style="margin: auto"></ElImage>
    </div>
  </ElDialog>
</template>
<script lang="ts" setup>
import AsideMenu from '@/components/AsideMenu.vue'
// import { LoginStatus } from '@/enums'
// import router from '@/router'
const dialogVisible = ref(false)
const imageUrl = ref('')

// import { getLoginQrcode, doReLogin } from '@/api/login'
// import { getDokidoki } from '@/api'
// let timer: ReturnType<typeof setInterval> | undefined = undefined
// const MAX_TIME = 180 // 3分钟
// let timeElapsed = 0
// const checkLoginState = async () => {
// }
// onMounted(() => {
//   getDokidoki().then((res) => {
//     if (res.data.code === 6000) {
//       dialogVisible.value = true
//       doReLogin()
//         .then(() => {
//           return getLoginQrcode()
//         })
//         .then((res) => {
//           return blobToBase64(res.data)
//         })
//         .then((res) => {
//           imageUrl.value = res as string
//         })
//     }
//   })
// })

// const blobToBase64 = (blob: Blob) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       resolve(e.target?.result)
//     }
//     reader.readAsDataURL(blob)
//   })
// }
</script>
<style scoped lang="scss">
.bili-login-qrcode-div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-container {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
