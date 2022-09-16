<template>
  <div class="row wrap-layout">
    <div class="col-12">
      <q-table
        :title="$t('user.Users')"
        :rows="data"
        :columns="columns"
        row-key="ID"
        v-model:pagination="pagination"
        :loading="loading"
        :filter="filter"
        @request="loadData"
        binary-state-sort
        style="width: 100%" flat separator="none" table-header-class="table-header" title-class="title-class"
      >
        <template v-slot:top-right>
          <div class="row" data-html2canvas-ignore>
              <q-select
                outlined
                dense
                v-model="searchParams.Status"
                :options="searchOptions.Status"
                :label="$t('user.Status')" class="Search" style="min-width:150px"
                @popup-hide="onSelect()"
              />
              <q-select
                outlined
                dense
                v-model="searchParams.Type"
                :options="searchOptions.Type"
                :label="$t('user.Type')" class="Search" style="min-width:150px"
                @popup-hide="onSelect()"
              />
              <q-input outlined dense debounce="300" v-model="filter" placeholder="Search" class="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn class="float-right on-right new-button" label="" @click="newRow()">
                  <q-icon name="add_circle_outline" /> {{$t('user.New')}}
              </q-btn>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Username" :props="props">{{ props.row.Username }}</q-td>
            <q-td key="Email" :props="props">{{ props.row.Email }}</q-td>
            <q-td key="Type" :props="props">{{ displayType(props.row.Type) }}</q-td>
            <q-td key="Status" :props="props">{{ displayStatus(props.row.Status) }}</q-td>
            <q-td key="Action" :props="props" v-if="false" >
              <q-btn flat class="bg-brown-1" @click="props.row.deletePopup = true">
                <q-icon name="delete" />
              </q-btn>
            </q-td>
            <q-td key="Action" :props="props" v-if="false" >
              <q-btn flat class="bg-brown-1" @click="editRow(props.row)">
                <q-icon name="edit" />
              </q-btn>
            </q-td>
            <q-td key="Action" :props="props" >
              <q-btn flat icon="more_horiz">
                <q-menu auto-close>
                  <q-list dense separator style="min-width: 170px">
                    <q-item clickable  @click="editRow(props.row)">
                      <q-item-section avatar>
                        <q-icon class="icon" name="edit" />
                      </q-item-section>
                      <q-item-section>{{$t('user.Edit')}}</q-item-section>
                    </q-item>
                    <q-item clickable @click="props.row.deletePopup = true">
                      <q-item-section avatar>
                        <q-icon class="icon" name="delete" />
                      </q-item-section>
                      <q-item-section>{{$t('user.Delete')}}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <q-dialog v-model="props.row.editPopup" persistent>
                <q-card class="detail-dialog">
                  <q-card-section class="detail-title">
                    User
                  </q-card-section>
                  <q-card-section>
                      <div>
                          <q-input
                              outlined
                              v-model="edit.Username"
                              readonly
                              :label="$t('user.Username')"
                              :error="v$.edit.Username.$error">
                          </q-input>
                      </div>
                      <div>
                          <q-input
                              outlined
                              autofocus
                              v-model="edit.Email"
                              :label="$t('user.Email')"
                              :error="v$.edit.Email.$error">
                          </q-input>
                      </div>
                      <div>
                          <q-select
                              outlined
                              v-model="edit.Status"
                              :options="StatusOptions"
                              :label="$t('user.Status')">
                          </q-select>
                      </div>
                  </q-card-section>
                  <q-card-section  align="center">
                      <q-btn flat class="save-btn q-mr-md" :label="$t('save')" @click="updateRow(props.row);" />
                      <q-btn flat class="cancel-btn cancel-btn-alt" :label="$t('cancel')" @click="props.row.editPopup = false" />
                  </q-card-section>
                </q-card>
              </q-dialog>
              <q-dialog v-model="props.row.deletePopup" persistent>
                <q-card class="delete-dialog">
                  <q-card-section class="delete-title">
                    {{$t('deleteWarning')}}
                  </q-card-section>
                  <q-card-section  align="center">
                      <q-btn flat class="delete-btn q-mr-md" :label="$t('deleteYes')" @click="deleteRow(props.row.ID); props.row.deletePopup = false" />
                      <q-btn flat class="cancel-btn" :label="$t('deleteNo')" @click="props.row.deletePopup = false" />
                  </q-card-section>
                </q-card>
              </q-dialog>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-dialog v-model="newPopup" persistent>
        <q-card class="detail-dialog">
          <q-card-section class="detail-title">
            {{$t('user.NewUser')}}
          </q-card-section>
          <q-card-section>
              <div>
                  <q-input
                      outlined
                      autofocus
                      v-model="edit.Username"
                      :label="$t('user.Username')"
                      :error="v$.edit.Username.$error">
                  </q-input>
              </div>
              <div>
                  <q-input
                      outlined
                      v-model="edit.Password"
                      :label="$t('user.Password')"
                      :error="v$.edit.Password.$error">
                  </q-input>
              </div>
              <div>
                  <q-input
                      outlined
                      v-model="edit.Email"
                      :error="v$.edit.Email.$error"
                      :label="$t('user.Email')">
                  </q-input>
              </div>
              <div class="q-mb-md">
                  <q-select outlined
                      v-model="edit.Status"
                      :options="StatusOptions"
                      :label="$t('user.Status')">
                  </q-select>
              </div>
              <div>
                  <q-select outlined
                      v-model="edit.Type"
                      :options="TypeOptions"
                      :label="$t('user.Type')">
                  </q-select>
              </div>
          </q-card-section>
          <q-card-section align='center'>
              <q-btn flat class="save-btn q-mr-md" :label="$t('save')" @click="addRow();" />
              <q-btn flat class="cancel-btn cancel-btn-alt" :label="$t('cancel')" @click="newPopup = false" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: 'Users',
  meta: {
    title: 'Login – FightSearch 0.1'
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      filter: '',
      searchParams: {
        Status: {'label': 'All', 'value': '0'},
        Type: {'label': 'All', 'value': '0'}
      },
      searchOptions: {
        Status: [{'label': 'All', 'value': '0'}, {'label': 'New', 'value': '1'}, {'label': 'Enabled', 'value': '2'}, {'label': 'Disabled', 'value': '3'}, {'label': 'Deleted', 'value': '4'}],
        Type: [{'label': 'All', 'value': '0'}, {'label': 'Admin', 'value': '1'}, {'label': 'Enduser', 'value': '2'}]
      },
      StatusOptions: [{'label': 'New', 'value': '1'}, {'label': 'Enabled', 'value': '2'}, {'label': 'Disabled', 'value': '3'}, {'label': 'Deleted', 'value': '4'}],
      TypeOptions: [{'label': 'Admin', 'value': '1'}],
      loading: false,
      pagination: {
        sortBy: 'Username',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 100
      },
      columns: [
        { name: 'Username', required: true, label: 'Username', align: 'left', sortable: true },
        { name: 'Email', label: 'Email', field: 'Email', align: 'left' },
        { name: 'Type', label: 'Type', field: 'Type', align: 'left', sortable: true },
        { name: 'Status', label: 'Status', field: 'Status', align: 'left', sortable: true },
        { name: 'Action', label: this.$t('action'), field: '' }
      ],
      data: [],
      edit: {
          Username: '',
          Email: '',
          Status: null,
          Type: null,
          Password: '',
      },
      newPopup: false
    }
  },
  validations() {
      return {
        edit: {
            Username: { required },
            Password: { required },
            Email: { required, email }
        }
      }
  },
  mounted () {
      this.loadData({
        pagination: this.pagination,
        filter: undefined
      })
  },
  methods: {
    onSelect () {
      this.loadData({pagination: this.pagination, filter: this.filter})
    },
    loadData (props) {
        const { page, rowsPerPage, sortBy, descending } = props.pagination
        const filter = props.filter
        const Status = !this.searchParams.Status || this.searchParams.Status.value == 0 ? null : this.searchParams.Status.value;
        const Type = !this.searchParams.Type || this.searchParams.Type.value == 0 ? null : this.searchParams.Type.value;
        let _this = this
        // get list
        this.$api.post('user/search.php', {
            Username: this.filter,
            Status: Status,
            Type: Type,
            OrderBy: sortBy,
            OrderDir: descending ? 'desc' : 'asc',
            Page: page,
            RowsPerPage: rowsPerPage
        }).then(function (response) {
            _this.$helper.updateLoadData(props, response, _this)
        }).catch(function (error) {
            _this.$helper.logError(error)
            _this.$q.notify({
                type: 'negative',
                timeout: 3000,
                message: 'Error loading list',
                position: 'bottom-right'
            })
        })
    },
    newRow () {
        this.edit.Username = ''
        this.edit.Email = ''
        this.edit.Password = ''
        this.edit.Status = {'label': 'Enabled', 'value': '2'}
        this.edit.Type = {'label': 'Admin', 'value': '1'}
        this.newPopup = true
    },
    editRow (row) {
        this.edit.Username = row.Username
        this.edit.Email = row.Email
        this.edit.Status = {'label': 'New', 'value': row.Status}
        if (row.Status == 2)
            this.edit.Status = {'label': 'Enabled', 'value': row.Status}
        if (row.Status == 3)
          this.edit.Status = {'label': 'Disabled', 'value': row.Status}
        if (row.Status == 4)
          this.edit.Status = {'label': 'Deleted', 'value': row.Status}
        row.editPopup = true
    },
    deleteRow (id) {
        let _this = this
        this.$api.post('user/delete.php', {
            ID: id
        }).then(function (response) {
            _this.loadData({pagination: _this.pagination, filter: _this.filter})
        }).catch(function (error) {
            _this.$helper.logError(error)
            _this.$q.notify({
                type: 'negative',
                timeout: 3000,
                message: 'Delete not possible',
                position: 'bottom-right'
            })
        })
    },
    async updateRow (row) {
        let _this = this
        const isFormCorrect = await this.v$.$validate()
        if (isFormCorrect) {
            this.$api.post('user/update.php', {
                ID: row.ID,
                Username: this.edit.Username,
                Email: this.edit.Email,
                Status: this.edit.Status.value,
            }).then(function (response) {
                _this.loadData({pagination: _this.pagination, filter: _this.filter})
                _this.newPopup = false
            }).catch(function (error) {
                _this.$helper.logError(error)
                _this.$q.notify({
                    type: 'negative',
                    timeout: 3000,
                    message: 'Update not possible',
                    position: 'bottom-right'
                })
            })
        }
    },
    async addRow () {
        let _this = this
        const isFormCorrect = await this.v$.$validate()
        if (isFormCorrect) {
            this.$api.post('user/create.php', {
                Username: this.edit.Username,
                Email: this.edit.Email,
                Password: this.edit.Password,
                Status: this.edit.Status.value,
                Type: this.edit.Type.value,
            }).then(function (response) {
                _this.loadData({pagination: _this.pagination, filter: _this.filter})
                _this.newPopup = false
            }).catch(function (error) {
                _this.$helper.logError(error)
                _this.$q.notify({
                    type: 'negative',
                    timeout: 3000,
                    message: 'Update not possible',
                    position: 'bottom-right'
                })
            })
        }
    },
    displayStatus (Status) {
      if (!Status) {
        return 'X'
      }
      if (Status == '1')
        return 'New'
      if (Status == '2')
        return 'Enabled'
      if (Status == '3')
        return 'Disabled'
      if (Status == '4')
        return 'Deleted'
      return Status
    },
    displayType (type) {
      if (!type) {
        return ''
      }
      if (type == 1)
        return 'Admin'
      if (type == 2)
        return 'Enduser'
      return type
    }
  }
}
</script>
