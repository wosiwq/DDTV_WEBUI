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
      <QrcodeVue :value="imageUrl" :size="400" :margin="2" style="margin: auto"></QrcodeVue>
    </div>
  </ElDialog>
</template>
<script lang="ts" setup>
import AsideMenu from '@/components/AsideMenu.vue'
import QrcodeVue from 'qrcode.vue'
import { getLoginStatus } from '@/api/login'
import { Code } from '@/enums'
// import { LoginStatus } from '@/enums'
// import router from '@/router'
const router = useRouter()
const dialogVisible = ref(false)
const imageUrl = ref('')

import { doReLogin, getLoginUrl } from '@/api/login'
import { getDokidoki } from '@/api'
let timer: ReturnType<typeof setInterval> | undefined = undefined
const MAX_TIME = 180 // 3分钟
let timeElapsed = 0
const checkLoginState = async () => {
  const res = await getLoginStatus()
  if (res.data.data) {
    clearInterval(timer)
    timer = undefined
    ElMessage.success('登录成功!')
    dialogVisible.value = false
    router.go(0)
    return
  }
  timeElapsed++
  if (timeElapsed >= MAX_TIME) {
    getLoginUrl()
      .then((res) => {
        return res.data.data
      })
      .then((res) => {
        imageUrl.value = res
      })
    timeElapsed = 0
  }
}
onMounted(() => {
  getDokidoki().then((res) => {
    if (res.data.code === Code.LoginInfoFailure) {
      doReLogin()
        .then(() => {
          return getLoginUrl()
        })
        .then((res) => {
          return res.data.data
        })
        .then((res) => {
          imageUrl.value = res
          timer = setInterval(checkLoginState, 1000)
          dialogVisible.value = true
        })
    }
  })
})
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
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
