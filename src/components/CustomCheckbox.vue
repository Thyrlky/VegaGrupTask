<template>
  <label class="w-full">
    <div class="flex gap-2 items-center">
      <span class="relative w-5 h-5">
        <input type="checkbox" @click="clickEvent" @change="toggleValue" :value="value" :checked="checked" class="absolute opacity-0 z-10 cursor-pointer w-full h-full" />
        <div class="relative w-full h-full rounded-sm bg-transparent transition-colors duration-300 border border-secondary" :class="{ '!bg-primary !border-primary': !!checked || checkValue }">
          <div v-if="!!checked || checkValue" class="inline-flex w-full h-full justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-secondary" viewBox="0 0 16 16">
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
          </div>
        </div>
      </span>
      <span v-if="showPlaceholder" class="text-sm leading-7 cursor-pointer">{{ placeholder }}</span>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isArray } from 'lodash'

interface Props {
  multiple?: boolean
  modelValue?: boolean | Array<number | string>
  value?: string | number
  checked?: boolean
  placeholder?: string
  showPlaceholder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Seçenek',
  showPlaceholder: true
})
const emit = defineEmits(['update:modelValue', 'change', 'click'])

const checkValue = computed(() => {
  if (props.multiple && isArray(props.modelValue)) {
    return props.modelValue.includes(props.value ?? '')
  }
  return !!props.modelValue
})

const toggleValue = () => {
  if (props.checked) {
    return
  }
  if (props.multiple && isArray(props.modelValue)) {
    if (checkValue.value) {
      emit(
        'update:modelValue',
        props.modelValue.filter((x) => x !== props.value)
      )
    } else {
      emit('update:modelValue', [...props.modelValue, props.value ?? ''])
    }
  } else {
    emit('update:modelValue', !props.modelValue)
  }
  emit('change')
}

const clickEvent = () => {
  emit('click')
}
</script>
