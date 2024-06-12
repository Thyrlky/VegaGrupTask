import { User } from '@/classes/user'
import { ref } from 'vue'
import { StorageManager } from './StorageManager'
import { LocalObjectName } from '@/enums/system'
import moment from 'moment-timezone'

class UserManager {
  private static instance: UserManager

  private userList = ref<User[]>()

  static getInstance(): UserManager {
    if (!this.instance) {
      this.instance = new UserManager()
    }
    return this.instance
  }

  getUserListFromLocaleStorage(): Promise<boolean> {
    return new Promise((resolve) => {
      //Veri çekilmemişse
      if (!this.userList.value) {
        let json = StorageManager.getLocalObj(LocalObjectName.userList)
        let temp: User[] | undefined = json && json !== '' ? (JSON.parse(json) as User[]) : undefined
        if (temp) {
          this.userList.value = temp
        } else {
          this.userList.value = []
        }
        resolve(true)
      } else {
        resolve(true)
      }
    })
  }

  saveUserListToLocaleStorage() {
    StorageManager.storeLocalObj(LocalObjectName.userList, JSON.stringify(this.userList.value))
  }

  getUserList(): User[] | undefined {
    return JSON.parse(JSON.stringify(this.userList.value))
  }

  getUserByID(userID: string): User | undefined {
    return this.userList.value?.find((x) => x.userID === userID)
  }

  //Kullanıcı Adı kullanılıyorsa true döner
  checkUsername(user: User, isUpdate: boolean): boolean {
    if (!user.username?.length) {
      return false
    }
    let temp = this.userList.value?.find((x) => x.username === user.username)
    if (isUpdate) {
      return !(temp === undefined || temp.userID === user.userID)
    }
    return temp !== undefined
  }

  //Email kullanılıyorsa true döner
  checkEmail(user: User, isUpdate: boolean): boolean {
    if (!user.email?.length) {
      return false
    }
    let temp = this.userList.value?.find((x) => x.email === user.email)
    if (isUpdate) {
      return !(temp === undefined || temp.userID === user.userID)
    }
    return temp !== undefined
  }

  deleteUserByID(userID: string = ''): Promise<boolean> {
    return new Promise((resolve) => {
      let index = this.userList.value?.findIndex((x) => x.userID === userID)
      if (this.userList.value && index && index > -1) {
        this.userList.value.splice(index, 1)
        this.saveUserListToLocaleStorage()
        resolve(true)
      }
      resolve(false)
    })
  }

  deleteUsersByIDList(userIDList: string[] = []): Promise<boolean> {
    return new Promise((resolve) => {
      this.userList.value = this.userList.value?.filter((x) => !userIDList.includes(x.userID ?? ''))
      this.saveUserListToLocaleStorage()
      resolve(true)
    })
  }

  deleteAllUsers() {
    return new Promise((resolve) => {
      this.userList.value = []
      this.saveUserListToLocaleStorage()
      resolve(true)
    })
  }

  updateUser(updateUser: User): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.userList.value?.length) {
        for (let user of this.userList.value) {
          if (user.userID === updateUser.userID) {
            Object.assign(user, updateUser)
            user.updatedAt = moment().toISOString()
            user.year = +(updateUser.maskedYear ?? '0')
            this.saveUserListToLocaleStorage()
            resolve(true)
          }
        }
      }
      resolve(false)
    })
  }

  addUser(user: User): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.userList.value?.length) {
        this.userList.value = []
      }
      user.createdAt = moment().toISOString()
      user.updatedAt = moment().toISOString()
      user.year = +(user.maskedYear ?? '0')

      this.userList.value.push({ ...user })
      this.saveUserListToLocaleStorage()
      resolve(true)
    })
  }
}

const instance = UserManager.getInstance()
export { instance as UserManager }
