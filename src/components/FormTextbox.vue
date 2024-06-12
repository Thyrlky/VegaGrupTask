<template>
  <dx-text-box :label="label" v-model="value" :read-only="!isEditing" :mask="mask">
    <dx-validator :validation-rules="validators" :validation-group="validationGroup" />
    <dx-text-box-button v-if="icon" :options="{ icon: icon, elementAttr: { class: 'form-editor-icon' }, stylingMode: 'text' }" name="icon" location="before" />
  </dx-text-box>
</template>

<script setup lang="ts">
import { DxTextBox, DxButton as DxTextBoxButton } from 'devextreme-vue/text-box'
import { DxValidator, DxValidationRule } from 'devextreme-vue/validator'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: number | string | Date
    isEditing: boolean
    label?: string
    icon?: string
    mask?: string
    validationGroup?: string
    validators?: Array<typeof DxValidationRule>
  }>(),
  {
    validators: () => [{ type: 'required' }],
    modelValue: undefined,
    isEditing: false,
    label: '',
    icon: '',
    mask: '',
    validationGroup: ''
  }
)
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
</script>
