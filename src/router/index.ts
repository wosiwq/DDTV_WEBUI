import { getDokidoki } from '@/api'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/BaseViews.vue'),
      beforeEnter: (to, from, next) => {
        getDokidoki()
          .then(() => {
            next()
          })
          .catch(() => {
            next('/login')
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
        getDokidoki()
          .then(() => {
            next('/')
          })
          .catch(() => {
            next()
          })
      }
    }
  ]
})

export default router
