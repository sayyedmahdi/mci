<template>
  <div class="row shadow-2 ">
    <q-table
      :title="$t('store.Stores')"
      :rows="data"
      :columns="columns"
      row-key="ID"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      @request="loadData"
      binary-state-sort
      title-class="title-class" table-header-class="table-header" table-class="table"
      style="width: 100%" flat separator="none"
    >
      <template v-slot:top-right>
        <div class="row" data-html2canvas-ignore>
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search" class="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn class="float-right on-right new-button" @click="newRow()">
              <q-icon name="add_circle_outline" /> {{$t('store.New')}}
          </q-btn>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Title" :props="props">{{ props.row.Title }}</q-td>
          <q-td key="Status" :props="props">{{ displayStatus(props.row.Status) }}</q-td>
          <q-td key="Url" :props="props">{{ props.row.Url }}</q-td>
          <q-td key="Action" :props="props" >
            <q-btn flat icon="more_horiz">
              <q-menu auto-close>
                <q-list dense separator style="min-width: 170px">
                  <q-item clickable  @click="editRow(props.row)">
                    <q-item-section avatar>
                      <q-icon class="icon" name="edit" />
                    </q-item-section>
                    <q-item-section>{{$t('store.Edit')}}</q-item-section>
                  </q-item>
                  <q-item clickable @click="props.row.deletePopup = true">
                    <q-item-section avatar>
                      <q-icon class="icon" name="delete" />
                    </q-item-section>
                    <q-item-section>{{$t('store.Delete')}}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-dialog v-model="props.row.editPopup" persistent>
              <q-card class="detail-dialog">
                <q-card-section class="detail-title">
                  {{$t('store.EditStore')}}
                </q-card-section>
                <q-card-section>
                  <div>
                      <q-input outlined v-model="edit.Title" :label="$t('store.Title')" :error="v$.edit.Title.$error"></q-input>
                  </div>
                  <div>
                      <q-input outlined v-model="edit.Url" :label="$t('store.Url')" :error="v$.edit.Url.$error"></q-input>
                  </div>
                  <div>
                      <q-input outlined v-model="edit.Token" :label="$t('store.Token')" :error="v$.edit.Token.$error"></q-input>
                  </div>
                  <div>
                      <q-select outlined v-model="edit.Status" :options="statusOptions" :label="$t('store.Status')" emit-value map-options></q-select>
                  </div>
                  <div class="q-mt-md">
                      <q-input outlined type="textarea" v-model="edit.Comments" :label="$t('store.Comments')"> </q-input>
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
          {{$t('store.NewStore')}}
        </q-card-section>
        <q-card-section>
          <div>
              <q-input outlined autofocus v-model="edit.Title" :label="$t('store.Title')" :error="v$.edit.Title.$error"></q-input>
          </div>
          <div>
              <q-input outlined v-model="edit.Url" :label="$t('store.Url')" :error="v$.edit.Url.$error"></q-input>
          </div>
          <div>
              <q-input outlined v-model="edit.Token" :label="$t('store.Token')" :error="v$.edit.Token.$error"></q-input>
          </div>
          <div>
              <q-select outlined v-model="edit.Status" :options="statusOptions" :label="$t('store.Status')" emit-value map-options></q-select>
          </div>
          <div class="q-mt-md">
              <q-input outlined type="textarea" v-model="edit.Comments" :label="$t('store.Comments')"> </q-input>
          </div>
        </q-card-section>
        <q-card-section  align="center">
            <q-btn flat class="save-btn q-mr-md" :label="$t('save')" @click="addRow();" />
            <q-btn flat class="cancel-btn cancel-btn-alt" :label="$t('cancel')" @click="newPopup = false" />
        </q-card-section>
        </q-card>
    </q-dialog>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'Stores',
  meta: {
    title: 'Login – MCI 0.1'
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'Title',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 100
      },
      columns: [
        { name: 'Title', label: this.$t('store.Title'), field: 'Title', align: 'left' },
        { name: 'Status', label: this.$t('store.Status'), field: 'Status', align: 'left' },
        { name: 'Url', label: this.$t('store.Url'), field: 'Url', align: 'left' },
        { name: 'Action', label: this.$t('action'), field: '' }
      ],
      statusOptions: [{'label': 'Enabled', 'value': '1'}, {'label': 'Disabled', 'value': '2'}],
      data: [],
      edit: {
          ID: '',
          Title: '',
          Url: '',
          Token: '',
          Status: 1,
          Comments: ''
      },
      newPopup: false
    }
  },
  validations() {
      return {
        edit: {
            Title: { required },
            Url: { required },
            Token: { required }
        }
      }
  },
  mounted () {
    this.$helper.initLang(this)
    this.loadData({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    loadData (props) {
        const { page, rowsPerPage, sortBy, descending } = props.pagination
        const filter = props.filter
        let _this = this
        // get list
        this.$api.post('store/search.php', {
            Title: this.filter,
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
        this.edit.Title = ''
        this.edit.Url = ''
        this.edit.Token = ''
        this.edit.Comments = ''
        this.edit.Status = '1'
        this.newPopup = true
    },
    editRow (row) {
        this.edit.ID = row.ID
        this.edit.Title = row.Title
        this.edit.Token = row.Token
        this.edit.Url = row.Url
        this.edit.Status = row.Status
        this.edit.Comments = row.Comments
        row.editPopup = true
    },
    deleteRow (id) {
        let _this = this
        this.$api.post('store/delete.php', {
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
            this.$api.post('store/update.php', this.edit).then(function (response) {
                _this.loadData({pagination: _this.pagination, filter: _this.filter})
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
            this.$api.post('store/create.php', this.edit).then(function (response) {
              console.log(response)
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
    displayStatus (status) {
      if (!status) {
        return 'X'
      }
      if (status == '1')
        return 'Enabled'
      if (status == '2')
        return 'Disabled'
      return status
    }
  }
}
</script>
