<template>
  <SideMenu>
    <div class="min-h-screen">
      <router-view></router-view>
    </div>
  </SideMenu>
  <LoadingOverlay />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SideMenu from './layout/SideMenu.vue'
import { ThemeManager } from './managers/ThemeManager'
import { useRoute } from 'vue-router'
import { EventManager } from './managers/EventManager'
import { EventName } from './enums/system'
import { onMounted, watch } from 'vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import trMessages from 'devextreme/localization/messages/tr.json'
import { locale, loadMessages } from 'devextreme/localization'

const route = useRoute()
const { t } = useI18n()

const changeTitle = () => {
  const projectName = import.meta.env.VITE_APP_PROJECT_NAME
  let pageName = route.name
  let temp = projectName
  if (pageName) {
    temp += ' | ' + t('RouteName.' + pageName.toString())
  }

  document.title = temp
}

const scrollEvent = () => {
  ThemeManager.setScrollValue(window.scrollX, window.scrollY)
}

const resizeEvent = () => {
  ThemeManager.setScreenValue(window.screen.width, window.screen.height)
}

window.addEventListener('scroll', scrollEvent)
window.addEventListener('resize', resizeEvent)

changeTitle()
scrollEvent()
resizeEvent()

if (import.meta.env.VITE_APP_DEBUG_SCREEN) {
  document.documentElement.classList.add('debug-screens')
}

onMounted(() => {
  EventManager.emitter.on(EventName.changeTitle, changeTitle)

  loadMessages(trMessages)
  locale(navigator.language)
})

watch(
  () => route.name,
  () => {
    changeTitle()
  }
)
</script>
