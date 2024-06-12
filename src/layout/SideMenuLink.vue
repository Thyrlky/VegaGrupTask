<template>
  <div class="animate-[fadeInLeft.3s_both_.3s]">
    <hr v-if="menuItem.type === 'devider'" />
    <div
      v-else-if="menuItem.type === 'link'"
      class="p-1.5 rounded-lg"
      :class="{
        'hover:!bg-slate-200 dark:hover:!bg-slate-600': level === 1,
        'bg-slate-200 dark:bg-slate-600  text-primary dark:text-white font-bold': menuItem.active && level === 1,
        'border-[0.125rem] border-slate-700 dark:border-slate-300 font-bold': menuItem.active && level > 1
      }"
    >
      <router-link
        @click.native="isMobileMenuOpen = false"
        :to="menuItem.route"
        class="flex items-center gap-x-1"
        v-tooltip.left="{
          content: $t(`RouteName.${menuItem.title}`),
          disabled: !(!isSideMenuLarger || (screen.x >= 768 && screen.x <= 1024))
        }"
      >
        <svg v-if="menuItem.icon" v-html="menuItem.icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-5 h-5 fill-current"></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-5 h-5 fill-current">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
          <path
            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"
          />
        </svg>
        <span v-if="isSideMenuLarger || isMobileMenuOpen" class="md:hidden lg:block">{{ $t(`RouteName.${menuItem.title}`) }}</span>
      </router-link>
    </div>
    <div v-else class="grid gap-2">
      <button
        @click="toggleMenu(menuItem)"
        class="p-1.5 rounded-lg flex items-center justify-between"
        :class="{
          'hover:!bg-slate-200 dark:hover:!bg-slate-600': level === 1,
          'bg-slate-200 dark:bg-slate-600 text-primary dark:text-white font-bold': menuItem.active && level === 1,
          'border-[0.125rem] border-slate-600 dark:border-slate-300 font-bold': menuItem.active && level > 1
        }"
        v-tooltip.left="{
          content: $t(`RouteName.${menuItem.title}`),
          disabled: !(!isSideMenuLarger || (screen.x >= 768 && screen.x <= 1024))
        }"
      >
        <div class="flex items-center gap-x-1">
          <svg v-if="menuItem.icon" v-html="menuItem.icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-5 h-5 fill-current"></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-5 h-5 fill-current">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
            <path
              d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"
            />
          </svg>
          <span v-if="isSideMenuLarger || isMobileMenuOpen" class="md:hidden lg:block">{{ $t(`RouteName.${menuItem.title}`) }}</span>
        </div>
        <svg v-if="isSideMenuLarger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-3 h-3 fill-current hidden lg:block" :class="{ 'rotate-90': menuItem.isOpen }">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
        </svg>
      </button>
      <div
        v-if="menuItem.isOpen"
        class="grid gap-2 rounded-lg animate-[fadeInLeft.3s_both_.3s]"
        :class="{
          'bg-slate-100 dark:bg-slate-900': (menuItem.active || menuItem.isOpen) && level === 1,
          'bg-slate-200 dark:bg-slate-700': (menuItem.active || menuItem.isOpen) && level === 2,
          'bg-slate-300 dark:bg-slate-600': (menuItem.active || menuItem.isOpen) && level === 3,
          'bg-slate-400 dark:bg-slate-500': (menuItem.active || menuItem.isOpen) && level === 4,
          'bg-slate-500 dark:bg-slate-400': (menuItem.active || menuItem.isOpen) && level === 5
        }"
      >
        <SideMenuLink v-for="(children, childrenIndex) in menuItem.children" :key="`${menuItem.title}_sideMenuChildren_${childrenIndex}`" :menuItem="children" :level="level + 1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuItem } from '@/interfaces/theme/MenuItem'
import { ThemeManager } from '@/managers/ThemeManager'

interface Props {
  menuItem: MenuItem
  level: number
}

const props = defineProps<Props>()

const isSideMenuLarger = ThemeManager.isSideMenuLarger
const isMobileMenuOpen = ThemeManager.isMobileMenuOpen
const screen = ThemeManager.screen

const toggleMenu = (menuItem: MenuItem, level: number = props.level) => {
  if (menuItem.type === 'linkWithChildren') {
    if (menuItem.isOpen) {
      menuItem.children.forEach((child) => {
        toggleMenu(child, level + 1)
      })
      menuItem.isOpen = false
    } else if (level === props.level) {
      menuItem.isOpen = true
    }
  }
}
</script>
