<template>
  <dx-popup ref="popup" :title="isUpdate ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'" :visible="visibleState" :full-screen="screen.x < 576" :width="width" :wrapper-attr="wrapperAttrState" :height="height" @hidden="onHidden()" @option-changed="() => popup?.instance?.repaint()">
    <dx-popup-item toolbar="bottom" location="center">
      <div :class="{ 'flex-buttons': width <= 360 }" class="w-full flex gap-2 !justify-end">
        <dx-button text="Vazgeç" styling-mode="outlined" type="normal" @click="cancel()" />
        <dx-button text="Kaydet" :disabled="isSaveDisabled" styling-mode="contained" type="default" @click="save()" />
      </div>
    </dx-popup-item>
    <dx-validation-group ref="userEditValidationGroup">
      <FormContainer v-if="visibleState" class="plain-styled-form" :screen-by-width="getSizeQualifier">
        <!-- #region Kullanıcı Adı -->
        <dx-form-item item-type="group">
          <dx-col-count-by-screen :xs="1" :sm="1" :md="1" :lg="1" />
          <dx-form-item>
            <form-textbox
              label="Kullanıcı Adı"
              v-model="editedUser.username"
              :is-editing="true"
              :validators="[
                { type: 'stringLength', min: 5, max: 20, revaluate: true, message: 'Kullanıcı Adı 5 ila 20 karakterden oluşmalıdır' },
                { type: 'required', message: 'Kullanıcı Adı alanı zorunludur' },
                { type: 'pattern', pattern: /([a-zA-Z0-9]{3,}$)/, message: 'Geçersiz karakter!' },
                { type: 'custom', validationCallback: checkUserName, message: 'Kullanıcı Adı kullanılıyor.' }
              ]"
            />
          </dx-form-item>
        </dx-form-item>
        <!-- #endregion -->

        <!-- #region Ad & Soyad -->
        <dx-form-item item-type="group">
          <dx-col-count-by-screen :xs="1" :sm="2" :md="2" :lg="2" />
          <dx-form-item>
            <form-textbox
              label="Adı"
              v-model="editedUser.name"
              :is-editing="true"
              :validators="[
                { type: 'stringLength', min: 3, message: 'Ad alanı en az 3 karakterden oluşmalıdır' },
                { type: 'required', message: 'Ad alanı zorunludur' },
                { type: 'pattern', revaluate: true, pattern: /([a-zA-Z.öÖçÇıİşŞüÜğĞ\s]{3,}$)/, message: 'Geçersiz karakter!' }
              ]"
            />
          </dx-form-item>
          <dx-form-item css-class="accent">
            <form-textbox
              label="Soyadı"
              v-model="editedUser.surname"
              :is-editing="true"
              :validators="[
                { type: 'stringLength', min: 3, message: 'Soyad alanı en az 3 karakterden oluşmalıdır' },
                { type: 'required', message: 'Soyadı alanı zorunludur' },
                { type: 'pattern', revaluate: true, pattern: /([a-zA-Z.öÖçÇıİşŞüÜğĞ\s]{3,}$)/, message: 'Geçersiz karakter!' }
              ]"
            />
          </dx-form-item>
        </dx-form-item>
        <!-- #endregion -->

        <!-- #region Yaş & Email -->
        <dx-form-item item-type="group" css-class="contact-fields-group">
          <dx-col-count-by-screen :xs="1" :sm="2" :md="2" :lg="2" />
          <dx-form-item css-class="accent">
            <form-textbox
              label="Yaş"
              v-model="editedUser.maskedYear"
              :is-editing="true"
              :validators="[
                { type: 'range', min: 12, max: 125, revaluate: true, message: 'Yaş 12 ila 125 arasında bir değer almalıdır' },
                { type: 'required', message: 'Yaş alanı zorunludur' },
                { type: 'numeric', message: 'Yaş alanına yalnızca rakam girişi yapınız' },
                { type: 'pattern', pattern: /\d{1,3}$/, message: 'Geçersiz karakter!' }
              ]"
              :mask="'0##'"
            />
          </dx-form-item>
          <dx-form-item>
            <form-textbox
              v-model="editedUser.email"
              :is-editing="true"
              icon="email"
              label="Email"
              :validators="[
                { type: 'email', revaluate: true, message: 'Lütfen geçerli bir email adresi girin' },
                { type: 'required', message: 'Email alanı zorunludur' },
                { type: 'custom', validationCallback: checkEmail, message: 'Email adresi kullanılıyor.' }
              ]"
            />
          </dx-form-item>
        </dx-form-item>
        <!-- #endregion -->
      </FormContainer>
    </dx-validation-group>
  </dx-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { DxPopup, DxToolbarItem as DxPopupItem } from 'devextreme-vue/popup'
import { DxForm as FormContainer, DxItem as DxFormItem, DxColCountByScreen } from 'devextreme-vue/form'
import { DxButton } from 'devextreme-vue/button'
import { ThemeManager } from '@/managers/ThemeManager'
import FormTextbox from '@/components/FormTextbox.vue'
import { User } from '@/classes/user'
import { UserManager } from '@/managers/UserManager'
import { ValidationCallbackData } from 'devextreme/common'
import { DxValidationGroup } from 'devextreme-vue/validation-group'

interface Props {
  isSaveDisabled?: boolean
  visible: boolean
  isUpdate: boolean
  width?: number
  height?: string | number
  user: User
}

const props = withDefaults(defineProps<Props>(), {
  isSaveDisabled: false,
  width: 480,
  height: 350,
  visible: false,
  isUpdate: false
})

const screen = ThemeManager.screen

const emit = defineEmits(['save', 'update:visible'])

const visibleState = ref(props.visible)

function getWrapperAttr(attrs: Record<string, unknown> = {}) {
  const wrapperAttr = { class: '', ...attrs }
  wrapperAttr.class += ' form-popup'
  return wrapperAttr
}

const wrapperAttrState = ref(getWrapperAttr())

const popup = ref<InstanceType<typeof DxPopup>>()

const userEditValidationGroup = ref<DxValidationGroup>()

const editedUser = ref<User>({ ...new User() })

const getSizeQualifier = () => {
  let width = screen.value.x
  if (width <= 420) return 'xs'
  if (width <= 992) return 'sm'
  if (width < 1200) return 'md'
  return 'lg'
}

watch(
  () => props.visible,
  (newValue) => {
    visibleState.value = newValue
    if (newValue) {
      /*editedUser.value.userID = props.user.userID

      editedUser.value.username = props.user.username

      editedUser.value.name = props.user.name
      editedUser.value.surname = props.user.surname

      editedUser.value.year = props.user.year
      editedUser.value.email = props.user.email

      editedUser.value.createdAt = props.user.createdAt
      editedUser.value.updatedAt = props.user.updatedAt*/

      Object.assign(editedUser.value, props.user)
      editedUser.value.maskedYear = props.user.year?.toString()
    }
  }
)

const cancel = () => {
  visibleState.value = false
}

const save = () => {
  if (userEditValidationGroup.value?.instance?.validate().isValid) {
    close()
    emit('save', editedUser.value)
  }
}

const onHidden = () => {
  userEditValidationGroup.value?.instance?.reset()
  emit('update:visible', false)
}

const checkUserName = (_validation: ValidationCallbackData) => {
  return !UserManager.checkUsername(editedUser.value, props.isUpdate)
}

const checkEmail = (_validation: ValidationCallbackData) => {
  return !UserManager.checkEmail(editedUser.value, props.isUpdate)
}

const isValid = () => {
  return userEditValidationGroup.value?.instance?.validate().isValid
}

defineExpose({
  isValid
})
</script>
