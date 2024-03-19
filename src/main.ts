import '@/api/instance'
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { RecycleScroller } from 'vue-virtual-scroller'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('RecycleScroller', RecycleScroller)

app.mount('#app')
