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
// import { useSystemResourcesStore } from '@/stores/systemResources'

// const store = useSystemResourcesStore()
const dialogVisible = ref(false)
const imageUrl = ref('')

// const update_store = async () => {
//   getSystemResources().then((response) => {
//     store.update_handler(response.data.data)
//   })
// }

// let timer: ReturnType<typeof setInterval> | undefined = undefined
// const MAX_TIME = 180 // 3分钟
// let timeElapsed = 0
// const checkLoginState = async () => {
//   const res = await getBiliAccountLoginState()
//   if (res.data.data.LoginState === LoginStatus.LoggedIn) {
//     clearInterval(timer)
//     timer = undefined
//     ElMessage.success('登录成功!')
//     dialogVisible.value = false
//     router.go(0)
//   } else {
//     timeElapsed++
//     if (timeElapsed >= MAX_TIME) {
//       getBiliLoginQr().then((res) => {
//         imageUrl.value = URL.createObjectURL(new Blob([res.data], { type: 'image/png' }))
//       })
//       timeElapsed = 0
//     }
//   }
// }
// onMounted(() => {
//   getBiliAccountLoginState().then((res) => {
//     if (res.data.data.LoginState !== LoginStatus.LoggedIn) {
//       biliLoginReset().then((res) => {
//         console.log(res.data)
//       })
//       getBiliLoginQr().then((res) => {
//         imageUrl.value = URL.createObjectURL(new Blob([res.data], { type: 'image/png' }))
//       })
//       timer = setInterval(checkLoginState, 1000)
//       dialogVisible.value = true
//     } else {
//       update_store()
//       timer = setInterval(update_store, 5000)
//     }
//   })
// })
// onUnmounted(() => {
//   if (timer) {
//     clearInterval(timer)
//   }
// })
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
