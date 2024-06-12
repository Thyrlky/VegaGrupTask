<template>
  <div class="relative flex">
    <div
      class="md:w-14 lg:w-64 h-[100dvh] hidden md:flex md:fixed flex-col overflow-x-hidden p-3 pb-0 bg-white dark:bg-theme-cardBg-dark transition-all duration-300"
      :class="{
        '!w-14': !isSideMenuLarger
      }"
    >
      <div class="grid gap-3" :class="{ 'gap-1': !isSideMenuLarger }">
        <div class="flex items-center gap-1.5" :class="{ 'flex-col-reverse': !isSideMenuLarger }">
          <router-link :to="{ name: RouteName.dashboard }" class="flex-auto">
            <img v-if="isSideMenuLarger && screen.x > 1024" src="/logo/logo.png" class="h-8 lg:h-12 w-8 lg:w-full object-left object-contain" />
            <img v-else src="/logo/logo-min.png" class="!w-8 !h-8 object-left object-contain" />
          </router-link>

          <div v-if="isSideMenuLarger" class="hidden lg:block h-6 border-r theme-border"></div>
          <button
            @click="ThemeManager.toggleSideMenuLarger()"
            class="hidden lg:block h-12"
            :class="{
              'h-8': !isSideMenuLarger
            }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-5 h-5 fill-current transition-all duration-300" :class="{ 'rotate-180': isSideMenuLarger }">
              <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
              <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
        <p v-if="isSideMenuLarger" class="hidden lg:block text-lg font-semibold animate-[fadeInRight.4s_both_.4s]">{{ projectName }} PANEL</p>
        <hr />
      </div>
      <div class="flex flex-col flex-auto py-3 gap-3 max-h-full overflow-x-hidden overflow-y-scroll scrollbar-none">
        <SideMenuLink v-for="(menuItem, menuItemIndex) in menuItems" :key="`parentMenuItem_${menuItemIndex}`" :menuItem="menuItem" :level="1" />
      </div>
      <div v-if="isSideMenuLarger" class="hidden lg:block">
        <p class="text-center text-sm">Versiyon 0.0.1</p>
      </div>
    </div>
    <div
      class="p-4 md:ml-14 lg:ml-64 w-full md:w-[calc(100dvw-3.5rem)] lg:w-[calc(100dvw-16rem)] overflow-x-hidden"
      :class="{
        'md:!ml-14 md:!w-[calc(100dvw-3.5rem)]': !isSideMenuLarger
      }"
    >
      <TopBar />
      <div class="relative">
        <slot></slot>
      </div>
    </div>
  </div>
  <Teleport v-if="isMobileMenuOpen" to="#app">
    <div @click="isMobileMenuOpen = false" class="fixed top-0 w-screen h-[calc(100dvh)] z-[99999] bg-theme-bg-dark/40 md:hidden">
      <button @click.stop="isMobileMenuOpen = false" class="absolute top-6 right-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-7 h-7 fill-white">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </button>
      <div @click.stop class="w-64 h-full z-30 flex flex-col overflow-x-hidden p-3 pb-0 bg-theme-cardBg-white dark:bg-theme-cardBg-dark">
        <div class="grid gap-3">
          <div class="flex items-center gap-1.5">
            <router-link :to="{ name: RouteName.dashboard }" class="flex-auto">
              <img src="/logo/logo.png" class="h-14 object-left object-contain" />
            </router-link>
          </div>
          <p class="text-lg font-bold animate-[fadeInRight.4s_both_.4s]">BAYKAN PORTAL</p>
          <hr />
        </div>
        <div class="flex flex-col flex-auto py-3 gap-3 max-h-full overflow-x-hidden overflow-y-scroll scrollbar-none">
          <SideMenuLink v-for="(menuItem, menuItemIndex) in menuItems" :key="`mobile_parentMenuItem_${menuItemIndex}`" :menuItem="menuItem" :level="1" />
        </div>
        <div>
          <p class="text-center text-sm">Versiyon 0.0.1</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { RouteName } from '@/enums/system'
import TopBar from './TopBar.vue'
import { ref, watch } from 'vue'
import MenuItems from './MenuItems'
import { MenuItem } from '@/interfaces/theme/MenuItem'
import { useRouter } from 'vue-router'
import SideMenuLink from './SideMenuLink.vue'
import { ThemeManager } from '@/managers/ThemeManager'

const projectName = import.meta.env.VITE_APP_PROJECT_NAME.toUpperCase()

const router = useRouter()

const menuItems = ref(MenuItems)

const isSideMenuLarger = ThemeManager.isSideMenuLarger
const isMobileMenuOpen = ThemeManager.isMobileMenuOpen
const screen = ThemeManager.screen

const resetMenu = (items: MenuItem[]) => {
  items.forEach((item) => {
    if (item.type === 'link') {
      item.active = false
    }

    if (item.type === 'linkWithChildren') {
      item.isOpen = false
      item.active = false
      resetMenu(item.children)
    }
  })
}

const setActiveMenu = (items: MenuItem[], routeName: RouteName = RouteName.dashboard) => {
  let activeItem = items.find((parent) => {
    if (parent.type === 'link') {
      if (routeName === parent.title) {
        parent.active = true
        return true
      }
    } else if (parent.type === 'linkWithChildren') {
      if (routeName === parent.title) {
        parent.active = true
        return true
      }

      if (setActiveMenu(parent.children, routeName)) {
        parent.isOpen = true
        parent.active = true
        return true
      }

      return false
    }
  })

  return activeItem
}

resetMenu(menuItems.value)

setActiveMenu(menuItems.value, router.currentRoute.value.meta.activeMenu as RouteName)

watch(
  () => router.currentRoute.value,
  (newVal, oldVal) => {
    if (!newVal.meta.activeMenu || newVal.meta.activeMenu !== oldVal.meta.activeMenu) {
      resetMenu(menuItems.value)
      setActiveMenu(menuItems.value, newVal.meta.activeMenu as RouteName)
    }
  },
  { deep: true }
)
</script>
