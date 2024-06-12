<template>
  <div class="card mb-4 p-4">
    <div class="view-wrapper list-page view-wrapper-contact-list">
      <dx-data-grid ref="dataGrid" :data-source="dataSource" :selected-row-keys="selectedUserList" :allow-column-reordering="true" :show-borders="true" height="100%" class="grid theme-dependent" @selection-changed="onSelectionChanged">
        <!-- Options -->
        <dx-paging :enabled="true" :page-size="10" />
        <dx-pager :visible="true" :allowed-page-sizes="pageSizes" display-mode="compact" :show-page-size-selector="true" :show-info="true" :show-navigation-buttons="true" />
        <dx-sorting mode="multiple" />
        <dx-header-filter :visible="true" />
        <dx-load-panel :show-pane="true" />
        <dx-selection select-all-mode="allPages" show-check-boxes-mode="always" mode="multiple" />
        <dx-search-panel :visible="true" placeholder="Arama..." />

        <!-- Toolbar -->
        <dx-grid-toolbar>
          <dx-grid-toolbar-item location="before">
            <div>
              <p class="text-lg text-primary !font-semibold">{{ $t(`RouteName.${route.name as string}`) }}</p>
            </div>
          </dx-grid-toolbar-item>

          <dx-grid-toolbar-item location="after" locate-in-menu="auto">
            <div>
              <dx-button text="Yeni Kullanıcı" icon="plus" type="success" styling-mode="contained" @click="newUser()" />
            </div>
          </dx-grid-toolbar-item>

          <dx-grid-toolbar-item :visible="!!selectedUserList.length" location="after" locate-in-menu="auto">
            <div>
              <div class="separator" />
            </div>
          </dx-grid-toolbar-item>

          <dx-grid-toolbar-item :visible="!!selectedUserList.length" location="after" locate-in-menu="auto">
            <div>
              <dx-button text="Seçili Kullanıcıları Sil" icon="trash" type="danger" styling-mode="contained" @click="deleteSelectedUserList()" />
            </div>
          </dx-grid-toolbar-item>

          <dx-grid-toolbar-item name="searchPanel" locate-in-menu="auto" />
        </dx-grid-toolbar>

        <!-- Columns -->
        <dx-column data-field="username" caption="K.Adı" :hiding-priority="6" :min-width="100">
          <dx-required-rule />
        </dx-column>

        <dx-column data-field="name" caption="Ad Soyad" cell-template="nameCellTemplate" :hiding-priority="5" :min-width="150">
          <dx-required-rule />
        </dx-column>

        <dx-column data-field="year" caption="Yaş" :hiding-priority="4" :min-width="50">
          <dx-required-rule />
        </dx-column>

        <dx-column data-field="email" caption="Mail" :hiding-priority="3">
          <dx-required-rule />
        </dx-column>

        <dx-column data-field="createdAt" caption="Oluşturulma Tarihi" cell-template="createdAtTemplate" :calculate-sort-value="sortByCreatedAt" sort-order="desc" :hiding-priority="2">
          <dx-required-rule />
        </dx-column>

        <dx-column data-field="updatedAt" caption="Son Güncelleme" cell-template="updatedAtTemplate" :calculate-sort-value="sortByUpdatedAt" :hiding-priority="1">
          <dx-required-rule />
        </dx-column>

        <dx-column caption="İşlemler" cell-template="transactionsTemplate" :hiding-priority="7" :width="100">
          <dx-required-rule />
        </dx-column>

        <!-- Templates  -->
        <template #nameCellTemplate="{ data }: { data: { data: User } }">
          <div class="name-template">
            <div>{{ data.data.name }} {{ data.data.surname }}</div>
          </div>
        </template>

        <template #createdAtTemplate="{ data }: { data: { data: User } }">
          <div>
            <div>{{ moment(data.data.createdAt).format('DD.MM.YYYY HH:mm') }}</div>
          </div>
        </template>

        <template #updatedAtTemplate="{ data }: { data: { data: User } }">
          <div>
            <div>{{ moment(data.data.updatedAt).format('DD.MM.YYYY HH:mm') }}</div>
          </div>
        </template>

        <template #transactionsTemplate="{ data }: { data: { data: User } }">
          <div class="flex gap-2 items-center justify-center">
            <dx-button icon="edit" type="default" styling-mode="contained" @click="updateUser(data.data)" />
            <dx-button icon="trash" type="danger" styling-mode="contained" @click="deleteUser(data.data.userID)" />
          </div>
        </template>
      </dx-data-grid>
    </div>

    <EditUserPopup v-model:visible="isEditUserPopupOpen" :isUpdate="isUpdate" :user="editedUser" @save="onUpsertUser" />
  </div>
</template>

<script setup lang="ts">
import { User } from '@/classes/user'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import EditUserPopup from './EditUserPopup.vue'

import { DxButton } from 'devextreme-vue/button'
import DxDataGrid, { DxColumn, DxHeaderFilter, DxLoadPanel, DxRequiredRule, DxSelection, DxSorting, DxToolbar as DxGridToolbar, DxItem as DxGridToolbarItem, DxSearchPanel, DxDataGridTypes, DxPager, DxPaging } from 'devextreme-vue/data-grid'
import { confirm } from 'devextreme/ui/dialog'
import notify from 'devextreme/ui/notify'
import DataSource from 'devextreme/data/data_source'
import moment from 'moment-timezone'
import ArrayStore from 'devextreme/data/array_store'
import { UserManager } from '@/managers/UserManager'

const dataGrid = ref<InstanceType<typeof DxDataGrid> | null>(null)

const route = useRoute()

const dataSource = new DataSource({
  store: new ArrayStore({
    data: [],
    key: 'userID'
  }),
  load: () => UserManager.getUserList() ?? []
})

const pageSizes = [5, 10, 'all']

const isEditUserPopupOpen = ref(false)
const isUpdate = ref(false)

const editedUser = ref<User>(new User())

const selectedUserList = ref<User[]>([])

const newUser = () => {
  isUpdate.value = false
  editedUser.value = new User()
  //Object.assign(editedUser, new User())
  isEditUserPopupOpen.value = true
}

const updateUser = (user: User) => {
  isUpdate.value = true
  editedUser.value = user
  //Object.assign(editedUser, user)
  isEditUserPopupOpen.value = true
}

const sortByCreatedAt = (user: User) => {
  return +moment(user.createdAt).format('x') //Timestamp
}

const sortByUpdatedAt = (user: User) => {
  return moment(user.updatedAt).toDate() //Date ikiside çalışıyor
}

const onSelectionChanged = (e: DxDataGridTypes.SelectionChangedEvent<User>) => {
  selectedUserList.value = e.selectedRowsData
}

const deleteUser = (userID?: string) => {
  let result = confirm(`<p>Seçili Kullanıcı Silinecek!<br/> Onaylıyor musunuz?</p>`, 'Kullanıcı Silme')
  result.then((dialogResult) => {
    if (dialogResult) {
      //dataSource.store().remove(userID)
      UserManager.deleteUserByID(userID)
      dataSource.reload()

      notify(
        {
          message: 'Kullanıcı Başarıyla Silindi!',
          position: { at: 'bottom center', my: 'bottom center' }
        },
        'success'
      )
    }
  })
}

const deleteSelectedUserList = () => {
  let result = confirm(`<p>Seçili Kullanıcılar (<b>${selectedUserList.value.length}</b>) Silinecek!<br/> Onaylıyor musunuz?</p>`, 'Toplu Kullanıcı Silme')
  result.then((dialogResult) => {
    if (dialogResult) {
      UserManager.deleteUsersByIDList(selectedUserList.value.map((x) => x.userID ?? ''))
      selectedUserList.value = []
      dataSource.reload()

      notify(
        {
          message: 'Kullanıcılar Başarıyla Silindi!',
          position: { at: 'bottom center', my: 'bottom center' }
        },
        'success'
      )
    }
  })
}

const onUpsertUser = async (user: User) => {
  if (isUpdate.value) {
    await UserManager.updateUser(user)
    //dataSource.store().update('userID', user)
  } else {
    await UserManager.addUser(user)
    //dataSource.store().insert(user)
  }
  dataSource.reload()
  isEditUserPopupOpen.value = false
  Object.assign(editedUser, new User())

  notify(
    {
      message: isUpdate.value ? 'Kullanıcı Güncellendi!' : 'Kullanıcı Başarıyla Eklendi!',
      position: { at: 'bottom center', my: 'bottom center' }
    },
    'success'
  )
}

onMounted(() => {
  UserManager.getUserListFromLocaleStorage().then(() => {
    dataSource.reload()
  })
})
</script>
