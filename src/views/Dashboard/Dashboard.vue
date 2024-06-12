<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
    <div class="card mb-4 p-4">
      <div class="view-wrapper list-page view-wrapper-contact-list">
        <dx-data-grid ref="dataGrid" :data-source="userList" key-expr="userID" :allow-column-reordering="true" :show-borders="true" class="grid theme-dependent">
          <!-- Options -->
          <dx-paging :enabled="true" :page-size="5" />
          <dx-pager :visible="true" display-mode="compact" :show-navigation-buttons="true" />
          <dx-sorting mode="multiple" />
          <dx-header-filter :visible="true" />
          <dx-load-panel :show-pane="true" />
          <dx-search-panel :visible="true" placeholder="Arama..." />

          <!-- Toolbar -->
          <dx-grid-toolbar>
            <dx-grid-toolbar-item location="before">
              <div>
                <p class="text-lg text-primary !font-semibold">Kullanıcılar</p>
              </div>
            </dx-grid-toolbar-item>

            <dx-grid-toolbar-item location="after" locate-in-menu="auto">
              <div>
                <dx-button text="Detaylı Listeye Git" type="default" styling-mode="contained" @click="routeToList()" />
              </div>
            </dx-grid-toolbar-item>

            <dx-grid-toolbar-item name="searchPanel" locate-in-menu="auto" />
          </dx-grid-toolbar>

          <!-- Columns -->

          <dx-column data-field="name" caption="Ad Soyad" cell-template="nameCellTemplate" :hiding-priority="5" :min-width="150">
            <dx-required-rule />
          </dx-column>

          <dx-column data-field="year" caption="Yaş" :hiding-priority="4" :width="65">
            <dx-required-rule />
          </dx-column>

          <dx-column data-field="email" caption="Mail" :hiding-priority="3">
            <dx-required-rule />
          </dx-column>

          <!-- Templates  -->
          <template #nameCellTemplate="{ data }: { data: { data: User } }">
            <div class="name-template">
              <div>{{ data.data.name }} {{ data.data.surname }}</div>
            </div>
          </template>
        </dx-data-grid>
      </div>
    </div>

    <div class="card mb-4 p-4">
      <div class="flex flex-col gap-1 h-full">
        <div>
          <p class="text-2xl text-center font-semibold text-primary">Toplam Kayıtlı Kullanıcı</p>
        </div>
        <div class="flex flex-auto w-full items-center justify-center">
          <p class="text-8xl text-center font-bold text-primary">{{ userList?.length }}</p>
        </div>
        <div class="flex items-center justify-end gap-2">
          <dx-button text="Mock Data (1)" type="success" icon="plus" styling-mode="contained" @click="addMockData(1)" />
          <dx-button text="Mock Data (10)" type="success" icon="plus" styling-mode="contained" @click="addMockData(10)" />
        </div>
        <div class="flex items-center justify-end gap-2">
          <dx-button text="Mock Data (50)" type="success" icon="plus" styling-mode="contained" @click="addMockData(50)" />
          <dx-button text="Tüm Kullanıcıları Sil" type="danger" icon="trash" styling-mode="contained" @click="deleteAllUsers()" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { User } from '@/classes/user'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { DxButton } from 'devextreme-vue/button'
import DxDataGrid, { DxColumn, DxHeaderFilter, DxLoadPanel, DxRequiredRule, DxSorting, DxToolbar as DxGridToolbar, DxItem as DxGridToolbarItem, DxSearchPanel, DxPager, DxPaging } from 'devextreme-vue/data-grid'
import { UserManager } from '@/managers/UserManager'
import { RouteName } from '@/enums/system'
import moment from 'moment-timezone'
import { confirm } from 'devextreme/ui/dialog'
import notify from 'devextreme/ui/notify'

const dataGrid = ref<InstanceType<typeof DxDataGrid> | null>(null)

const router = useRouter()

const userList = ref<User[]>()

const routeToList = () => {
  router.push({ name: RouteName.userList })
}

const addMockData = (count: number = 1) => {
  //Mock Data
  for (let i = 0; i < count; i++) {
    let user = new User()
    user.username = `TestTahaUser${((userList.value?.length ?? 0) + 1) * 2 + i}`
    user.name = `Taha${i}`
    user.surname = 'Yerlikaya'
    user.maskedYear = `${20 + i}`
    user.email = `test.taha${i}@tested.com`
    user.createdAt = moment().toISOString()
    user.updatedAt = moment().toISOString()
    UserManager.addUser(user)
  }
  userList.value = UserManager.getUserList()
}

const deleteAllUsers = () => {
  let result = confirm(`<p>Tüm Kullanıcılar Silinecek!<br/> Onaylıyor musunuz?</p>`, 'Tüm Kullanıcıları Silme')
  result.then(async (dialogResult) => {
    if (dialogResult) {
      await UserManager.deleteAllUsers()
      userList.value = []

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

onMounted(() => {
  UserManager.getUserListFromLocaleStorage().then(() => {
    userList.value = UserManager.getUserList()
  })
})
</script>
