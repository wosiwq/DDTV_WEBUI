import '@/api/instance'
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import NPlayer from '@nplayer/vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(NPlayer)

app.mount('#app')
