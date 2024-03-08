<template>
  <ElMenu router class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="true">
    <ElMenuItem @click="openGithub">
      <el-icon>
        <ElImage fit="contain" src="/DDTV.png" alt="DDTV logo" />
      </el-icon>
      <template #title>
        <span :class="isCollapse ? '' : 'side-name'">DDTV-WEBUI</span>
      </template>
    </ElMenuItem>
    <ElMenuItem v-for="(item, index) in menuItemList" :key="index" :index="item.index">
      <el-icon><component :is="item.icon"></component></el-icon>
      <template #title>
        <span>{{ item.title }}</span>
      </template>
    </ElMenuItem>

    <ElMenuItem @click="isCollapse = !isCollapse">
      <transition name="fade">
        <ElIcon><component :is="collapseIcon[Number(isCollapse)]"></component></ElIcon>
      </transition>
      <template #title>
        <span>{{ isCollapse ? '展开侧边栏' : '折叠侧边栏' }}</span>
      </template>
    </ElMenuItem>
  </ElMenu>
</template>

<script lang="ts" setup>
import { Folder, Home, Indent, Outdent, Settings, AlignLeft, InfoCircle } from '@/assets/icons'
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
const { width } = useWindowSize()

const isCollapse = ref(false)

watch(width, (newWidth) => {
  isCollapse.value = newWidth < 1040
})
const collapseIcon = [Outdent, Indent]
const menuItemList = [
  { index: '/', title: '概览', icon: Home },
  { index: '/room_list', title: '直播列表', icon: AlignLeft },
  { index: '/system_settings', title: '系统设置', icon: Settings },
  { index: '/file_management', title: '文件管理', icon: Folder },
  { index: '/about', title: '关于', icon: InfoCircle }
]
const openGithub = () => {
  window.open('https://github.com/wosiwq/DDTV_WEBUI', '_blank')
}
</script>

<style scoped lang="scss">
.el-menu-vertical-demo {
  &:not(.el-menu--collapse) {
    width: 200px;
  }

  height: 100%;
}
.side-name {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
