import { createApp } from 'vue'
import './assets/css/app.css'

import App from './App.vue'
import router from './router'

import Toast from 'vue-toastification'
import { vMaska } from 'maska/vue'
import FloatingVue from 'floating-vue'
import moment from 'moment-timezone'

import { BreadCrumbItem } from './classes/system'
import { LocalizationManager } from './managers/LocalizationManager'

declare module 'vue-router' {
  interface RouteMeta {
    activeMenu?: string
    breadCrumb?: Array<BreadCrumbItem>
  }
}

moment.tz.setDefault('Europe/Istanbul')

const app = createApp(App).use(router)

app.use(LocalizationManager.i18n)
app.use(Toast)
app.directive('maska', vMaska)
app.use(FloatingVue)
app.mount('#app')
