import '@/api/instance'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
