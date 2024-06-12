import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/enums/system'

//Anasayfa Componenti
const Dashboard = () => import('@/views/Dashboard/Dashboard.vue')
//Kullanıcı İşlemleri Componentleri
const UserList = () => import('@/views/User/UserList.vue')

const routes: Array<RouteRecordRaw> = [
  //Sayfa yoksa Anasayfa'ya yönlendirsin
  {
    path: '/:pathMatch(.*)*',
    name: RouteName.pageNotFound,
    redirect: () => {
      return { name: RouteName.dashboard }
    }
  },
  {
    name: RouteName.dashboard,
    path: '/dashboard',
    component: Dashboard
  },
  //Kullanıcı İşlemleri
  {
    name: RouteName.userList,
    path: '/userList',
    component: UserList,
    meta: {
      activeMenu: RouteName.userList,
      breadCrumb: [
        {
          routeName: RouteName.userList,
          active: true
        }
      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

export default router
