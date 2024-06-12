<template>
  <Teleport v-if="loadingVisible" to="#app">
    <div class="relative">
      <div class="fixed top-0 left-0 w-screen h-screen bg-white/80 z-[100]">
        <div class="relative w-full h-full flex items-center justify-center">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-64 h-64 flex items-center justify-center bg-main rounded-full overflow-hidden">
            <div class="w-48 h-48 rounded-full bg-primary flex items-center justify-center animate-pulse">
              <!-- <img src="/image/icon/bilge_code_logo_white_circle.png" class="w-44 h-44 object-left object-contain" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { EventManager } from '@/managers/EventManager'
import { EventName } from '@/enums/system'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const loadingVisible = ref(false)
const showLoading = () => {
  loadingVisible.value = true
}
const hideLoading = () => {
  loadingVisible.value = false
}

onMounted(() => {
  EventManager.emitter.on(EventName.showLoading, showLoading)
  EventManager.emitter.on(EventName.hideLoading, hideLoading)
})

onBeforeUnmount(() => {
  EventManager.emitter.off(EventName.showLoading, showLoading)
  EventManager.emitter.off(EventName.hideLoading, hideLoading)
})
</script>
