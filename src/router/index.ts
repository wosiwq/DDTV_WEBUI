import { createRouter, createWebHistory } from 'vue-router'
import { Code } from '@/enums'
import { getBiliAccountLoginState } from '@/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/BaseViews.vue'),
      beforeEnter: (to, from, next) => {
        getBiliAccountLoginState().then((res) => {
          console.log(res.data)
          if (
            res.data.code === Code.LoginInfoFailure ||
            res.data.code === Code.LoginVerificationFailed
          ) {
            next('/login')
          } else {
            next()
          }
        })
      },
      children: [
        {
          path: '',
          name: 'overview',
          component: () => import('@/views/Overview.vue')
        },
        {
          path: 'room_configuration',
          name: 'room_configuration',
          component: () => import('@/views/RoomConf.vue')
        },
        {
          path: 'system_settings',
          name: 'system_settings',
          component: () => import('@/views/SystemSettings.vue')
        },
        {
          path: 'file_management',
          name: 'file_management',
          component: () => import('@/views/FileManagement.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      beforeEnter: (to, from, next) => {
        getBiliAccountLoginState().then((res) => {
          console.log(res.data)
          if (res.data.code === Code.Success) {
            next('/')
          } else {
            next()
          }
        })
      }
    }
  ]
})

export default router
