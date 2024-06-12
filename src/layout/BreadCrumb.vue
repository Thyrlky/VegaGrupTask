<template>
  <nav aria-label="breadcrumb" class="-intro-x mr-auto hidden sm:flex">
    <ol class="flex items-center gap-x-1.5">
      <li v-if="breadCrumbItems.length">
        <router-link :to="{ name: RouteName.dashboard }">
          <svg class="fill-current w-4 h-4" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
          </svg>
        </router-link>
      </li>
      <li v-else-if="route.name">
        {{ $t(`RouteName.${route.name as string}`) }}
      </li>
      <li v-for="(item, index) in breadCrumbItems" :key="'bread_crumb_item_' + index" aria-current="page" class="flex items-center gap-x-1.5">
        <div v-if="index < breadCrumbItems.length">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-3 h-3 fill-current">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>

        <div class="flex items-center">
          <svg class="fill-current w-4 h-4 mr-1" viewBox="0 0 16 16" v-html="item.icon" v-if="item.icon"></svg>
          <span v-if="item.active" class="text-primary font-semibold">{{ item.routeName ? $t(`RouteName.${item.routeName}`) : item.title ?? '' }}</span>
          <router-link v-else-if="item.route" :to="item.route">
            {{ item.title ? item.title : $t(`RouteName.${item.routeName}`) }}
          </router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { BreadCrumbItem } from '@/classes/system'
import { EventName, RouteName } from '@/enums/system'
import { EventManager } from '@/managers/EventManager'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadCrumbItems = ref<Array<BreadCrumbItem>>([])

const setBreadCrumb = (items?: Array<BreadCrumbItem>) => {
  if (items) {
    breadCrumbItems.value = [...items]
  } else {
    breadCrumbItems.value = []
  }
}

const changeBreadCrumb = () => {
  setBreadCrumb(route.meta.breadCrumb)
}

if (route.meta.breadCrumb) {
  setBreadCrumb(route.meta.breadCrumb)
}

watch(
  () => route.meta.breadCrumb,
  (newVal) => {
    setBreadCrumb(newVal)
  },
  { deep: true }
)

onMounted(() => {
  EventManager.emitter.on(EventName.changeBreadCrumb, changeBreadCrumb)
})

onBeforeUnmount(() => {
  EventManager.emitter.off(EventName.changeBreadCrumb, changeBreadCrumb)
})
</script>
