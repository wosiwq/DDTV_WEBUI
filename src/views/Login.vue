<template>
  <div style="width: 100%; height: 100%" class="login-div">
    <ElCard shadow="hover" style="border-radius: 3%">
      <h2 style="margin: 0">欢迎回来！</h2>
      <ElText>登陆以继续</ElText>
      <ElForm class="login-form">
        <ElFormItem class="login-form-item">
          <ElInput @blur="onInput" class="login-input" v-model="form.AccessKeyId" />
          <label>AccessKeyId</label>
        </ElFormItem>
        <ElFormItem class="login-form-item">
          <ElInput
            @blur="onInput"
            class="login-input"
            type="password"
            show-password
            v-model="form.AccessKeySecret" />
          <label>AccessKeySecret</label>
        </ElFormItem>
        <ElFormItem>
          <ElButton style="width: 100%" type="primary" @click="login">登录</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>
<script lang="ts" setup>
import { getDokidoki } from '@/api'
import router from '@/router'

const form = reactive({
  AccessKeyId: '',
  AccessKeySecret: ''
})

const login = () => {
  if (!form.AccessKeyId || !form.AccessKeySecret) {
    ElMessage.error('AccessKeyId或AccessKeySecret不能为空')
    return
  }
  localStorage.setItem('AccessKeyId', form.AccessKeyId)
  localStorage.setItem('AccessKeySecret', form.AccessKeySecret)
  getDokidoki()
    .then(() => {
      ElMessage.success('校验成功')
      router.push('/')
    })
    .catch(() => {
      ElMessage.error('校验失败，请确认参数填写的与DDTV_Config.ini内的一致')
      localStorage.removeItem('AccessKeyId')
      localStorage.removeItem('AccessKeySecret')
    })
}
const onInput = (event: FocusEvent) => {
  const elInput = event.target as HTMLInputElement
  const label = elInput.closest('.login-form-item')?.querySelector('label')
  if (elInput.value) {
    label!.style.transform = 'translateY(-25px)'
    label!.style.fontSize = '15px'
  } else {
    label!.style.transform = ''
    label!.style.fontSize = ''
  }
}

onBeforeMount(() => {
  getDokidoki()
    .then(() => {
      router.push('/')
    })
    .catch()
})
</script>
<style scoped lang="scss">
.login-div {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #484676, #00c6cd);
}

.login-form {
  margin-top: 20px;
  width: 250px;
}

.login-form-item {
  & + .login-form-item {
    margin-top: 25px;
  }
  label {
    position: absolute;
    bottom: 0px;
    left: 0px;
    color: #808080;
    pointer-events: none;
    transition: all 0.2s ease;
  }

  .login-input {
    &:focus-within ~ label {
      transform: translateY(-25px);
      font-size: 15px;
      color: #2c6fdb;
    }
    :deep(.el-input__wrapper) {
      &:focus-within {
        border-color: #2c6fdb;
      }
      transition: all 0.2s ease;
      box-shadow: none;
      border-radius: 0;
      border-bottom: 1px solid #c0c0c0;
    }
  }
}
</style>
