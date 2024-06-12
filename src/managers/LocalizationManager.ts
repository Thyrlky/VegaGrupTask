import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { ref } from 'vue'
import { StorageManager } from './StorageManager'
import { EventName, LocalObjectName, SystemLocale } from '@/enums/system'
import { EventManager } from './EventManager'

class LocalizationManager {
  private static instance: LocalizationManager

  locale = ref<SystemLocale>(StorageManager.getLocalObj(LocalObjectName.locale) ? (StorageManager.getLocalObj(LocalObjectName.locale) as SystemLocale) : SystemLocale.tr)
  i18n = createI18n({
    legacy: false,
    locale: this.locale.value,
    fallbackLocale: SystemLocale.tr,
    fallbackFormat: true,
    messages
  })

  changeLang(lang: SystemLocale, changeTitle: boolean = true) {
    this.locale.value = lang
    this.i18n.global.locale.value = lang
    StorageManager.storeLocalObj(LocalObjectName.locale, lang)
    if (changeTitle) {
      this.changeTitle()
    }
  }

  changeTitle() {
    EventManager.emitter.emit(EventName.changeTitle)
  }

  static getInstance(): LocalizationManager {
    if (!this.instance) {
      this.instance = new LocalizationManager()
    }
    return this.instance
  }
}

const instance = LocalizationManager.getInstance()
export { instance as LocalizationManager }
