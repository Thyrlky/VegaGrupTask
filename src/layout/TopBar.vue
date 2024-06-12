<template>
  <div v-if="screen.x <= 768" class="grid gap-4 mb-4">
    <div class="flex items-center justify-between">
      <button @click="isMobileMenuOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-6 h-6 fill-current">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
        </svg>
      </button>
      <ProfileDropDown />
    </div>
    <div class="w-full lg:w-max flex flex-auto">
      <BreadCrumb />
    </div>
  </div>

  <div v-else class="flex items-center mb-4">
    <BreadCrumb class="flex-auto" />
    <ProfileDropDown />
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
import ProfileDropDown from './ProfileDropDown.vue'
import { ThemeManager } from '@/managers/ThemeManager'

const screen = ThemeManager.screen
const isMobileMenuOpen = ThemeManager.isMobileMenuOpen
</script>
