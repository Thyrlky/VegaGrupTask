import '@/assets/css/custom/_devexpress-light.css'
import '@/assets/css/custom/_devexpress-dark.css'

import { LocalObjectName } from '@/enums/system'
import { StorageManager } from './StorageManager'
import { ref } from 'vue'

class ThemeManager {
  private static instance: ThemeManager

  screen = ref({ x: 0, y: 0 })
  scroll = ref({ x: 0, y: 0 })

  darkMode = ref<boolean>(StorageManager.getLocalObj(LocalObjectName.darkMode) === 'true')

  isSideMenuLarger = ref<boolean>(StorageManager.getLocalObj(LocalObjectName.isSideMenuLarger) === 'true')
  isMobileMenuOpen = ref(false)

  static getInstance() {
    if (!this.instance) {
      this.instance = new ThemeManager()
    }
    return this.instance
  }

  constructor() {
    this.setDarkModeClass()
  }

  setScreenValue(screenX: number, screenY: number) {
    this.screen.value.x = screenX
    this.screen.value.y = screenY
  }

  setScrollValue(scrollX: number, scrollY: number) {
    this.scroll.value.x = scrollX
    this.scroll.value.y = scrollY
  }

  toggleDarkMode() {
    this.darkMode.value = !this.darkMode.value
    StorageManager.storeLocalObj(LocalObjectName.darkMode, this.darkMode.value.toString())
    this.setDarkModeClass()
  }

  setDarkModeClass() {
    if (this.darkMode.value) {
      document.body.classList.add('dark')
      Array.from(document.styleSheets)[1].disabled = true
      Array.from(document.styleSheets)[2].disabled = false
    } else {
      document.body.classList.remove('dark')
      Array.from(document.styleSheets)[1].disabled = false
      Array.from(document.styleSheets)[2].disabled = true
    }
  }

  toggleSideMenuLarger() {
    this.isSideMenuLarger.value = !this.isSideMenuLarger.value
    StorageManager.storeLocalObj(LocalObjectName.isSideMenuLarger, this.isSideMenuLarger.value.toString())
  }
}

const instance = ThemeManager.getInstance()
export { instance as ThemeManager }
