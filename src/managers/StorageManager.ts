import AES from 'crypto-js/aes'
import utf8 from 'crypto-js/enc-utf8'

class StorageManager {
  private static instance: StorageManager

  private akey = 'TahaVegaGrupKEY'

  private constructor() {}

  public static getInstance(): StorageManager {
    if (!this.instance) {
      this.instance = new StorageManager()
    }
    return this.instance
  }

  public storeLocalObj(name: string, value: string) {
    const encrypted = AES.encrypt(value, this.akey).toString()
    localStorage.setItem(name, encrypted)
  }

  public getLocalObj(name: string) {
    const svd = localStorage.getItem(name)
    if (svd) {
      return AES.decrypt(svd, this.akey).toString(utf8)
    }

    return undefined
  }

  public removeLocalObj(name: string) {
    localStorage.removeItem(name)
  }
}

const instance = StorageManager.getInstance()

export { instance as StorageManager }
