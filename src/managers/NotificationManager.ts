import { POSITION, TYPE, useToast } from 'vue-toastification'

const toast = useToast()

class NotificationManager {
  private static instance: NotificationManager
  private constructor() {}
  public windowInteracted = false

  public static getInstance(): NotificationManager {
    if (!this.instance) {
      this.instance = new NotificationManager()
    }
    return this.instance
  }

  public successNotify(text: string, timeout: number = 1000) {
    this.showToast(TYPE.SUCCESS, text, timeout)
  }

  public warningNotify(text: string, timeout: number = 3000) {
    this.showToast(TYPE.WARNING, text, timeout)
  }

  public errorNotify(text: string, timeout: number = 3000) {
    this.showToast(TYPE.ERROR, text, timeout)
  }

  public infoNotify(text: string, timeout: number = 3000) {
    this.showToast(TYPE.INFO, text, timeout)
  }

  private showToast(type: TYPE, text: string, timeout: number = 3000) {
    toast(text, {
      type,
      position: POSITION.TOP_RIGHT,
      timeout,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: 'button',
      icon: true,
      rtl: false
    })
  }

  public clearToast() {
    toast.clear()
  }
}

const instance = NotificationManager.getInstance()
export { instance as NotificationManager }
