<template>
  <div class="h-[20rem] md:h-[30rem]  relative" id="breadCrumbContainer">
    <!-- <div class="w-full h-full bg-main/40"></div> -->
    <img src="/image/BrandPhoto/DUCA_horizontal.webp" class="w-full h-full object-cover" />
    <div class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
      <div class="text-secondary">
        <p class="font-medium text-4xl mb-6 text-center">{{ $t(`RouteName.${route.name as string}`) }}</p>
        <div class="flex gap-3">
          <div class="flex gap-3">
            <router-link :to="{ name: RouteName.dashboard }" class="hover:text-main">{{ $t(`RouteName.home`) }}</router-link>
            /
          </div>
          <div v-for="(breadCrumb, breadCrumbIndex) in route.meta.breadCrumb" :key="`BreadCrumbItem_${breadCrumbIndex}`" class="flex gap-3">
            <router-link v-if="breadCrumb.route" :to="breadCrumb.route">{{ breadCrumb.routeName ? $t(`RouteName.${breadCrumb.routeName}`) : breadCrumb.title }}</router-link>
            <p v-else>{{ breadCrumb.routeName ? $t(`RouteName.${breadCrumb.routeName}`) : breadCrumb.title }}</p>
            <p v-if="breadCrumbIndex !== (route.meta.breadCrumb?.length ?? 1) - 1">/</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/enums/system'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
