<template>
  <div class="relative group/PD">
    <div class="flex items-center gap-x-1.5">
      <div>
        <p>Kullanıcı</p>
      </div>
      <div class="border-r h-7 theme-border"></div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-7 h-7 fill-current">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
        </svg>
      </div>
    </div>
    <div class="absolute right-0 w-[10rem] z-10 pt-1 hidden group-hover/PD:block group-hover/PD:animate-[fadeInUp_.3s_both_.3s]">
      <div class="w-full grid gap-3 bg-white dark:bg-theme-cardBg-dark p-4">
        <DarkMode withDescription small />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DarkMode from './DarkMode.vue'
</script>
