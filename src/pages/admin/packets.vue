<template>
  <div class="row">
    <q-table
      :title="$t('packet.Packets')"
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
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search" class="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn class="float-right on-right new-button" @click="newRow()">
              <q-icon name="add_circle_outline" /> {{ $t('packet.New') }}
          </q-btn>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Title" :props="props">{{ props.row.Title }}</q-td>
          <q-td key="Price" :props="props">{{ props.row.Price }}</q-td>
          <q-td key="Duration" :props="props">{{ props.row.Duration }}</q-td>
          <q-td key="Cashback" :props="props">{{ props.row.Cashback }}</q-td>
          <q-td key="Status" :props="props">{{ displayStatus(props.row.Status) }}</q-td>
          <q-td key="Action" :props="props" >
            <q-btn flat icon="more_horiz">
              <q-menu auto-close>
                <q-list dense separator style="min-width: 170px">
                  <q-item clickable  @click="editRow(props.row)">
                    <q-item-section avatar>
                      <q-icon class="icon" name="edit" />
                    </q-item-section>
                    <q-item-section>{{ $t('packet.Edit') }}</q-item-section>
                  </q-item>
                  <q-item clickable @click="props.row.deletePopup = true">
                    <q-item-section avatar>
                      <q-icon class="icon" name="delete" />
                    </q-item-section>
                    <q-item-section>{{ $t('packet.Delete') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-dialog v-model="props.row.editPopup" persistent>
              <q-card class="detail-dialog">
                <q-card-section class="detail-title">
                  {{ $t('packet.Packet') }}
                </q-card-section>
                <q-card-section>
                  <div>
                      <q-input outlined autofocus v-model="edit.Title" :label="$t('packet.Title')" :error="v$.edit.Title.$error"></q-input>
                  </div>
                  <div>
                      <q-input outlined autofocus v-model="edit.Price" :label="$t('packet.Price')" :error="v$.edit.Price.$error"></q-input>
                  </div>
                  <div>
                      <q-input outlined autofocus v-model="edit.Duration" :label="$t('packet.Duration')" :error="v$.edit.Duration.$error"></q-input>
                  </div>
                  <div>
                      <q-input outlined autofocus v-model="edit.Cashback" :label="$t('packet.Cashback')" :error="v$.edit.Cashback.$error"></q-input>
                  </div>
                  <div>
                      <q-select outlined v-model="edit.Status" :options="statusOptions" :label="$t('packet.Status')" emit-value map-options></q-select>
                  </div>
                  <div>
                      <q-input outlined autofocus type="textarea" v-model="edit.Comments" :label="$t('packet.Comments')"> </q-input>
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
          New Packet
        </q-card-section>
        <q-card-section>
          <div>
            <q-input outlined autofocus v-model="edit.Title" :label="$t('packet.Title')" :error="v$.edit.Title.$error"></q-input>
          </div>
          <div>
             <q-input outlined v-model="edit.Price" type="number" :label="$t('packet.Price')" :error="v$.edit.Price.$error"></q-input>
          </div>
          <div>
            <q-input outlined v-model="edit.Duration" :label="$t('packet.Duration')" :error="v$.edit.Duration.$error"></q-input>
          </div>
          <div>
            <q-input outlined v-model="edit.Cashback" :label="$t('packet.Cashback')" :error="v$.edit.Cashback.$error"></q-input>
          </div>
          <div>
            <q-select outlined v-model="edit.Status" :options="statusOptions" :label="$t('packet.Status')" emit-value map-options></q-select>
          </div>
          <div>
            <q-input outlined type="textarea" v-model="edit.Comments" label="Comments"> </q-input>
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
  name: 'Packets',
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
        { name: 'Title', label: this.$t('packet.Title'), field: 'Title', align: 'left' },
        { name: 'Price', label: this.$t('packet.Price'), field: 'Price', align: 'left' },
        { name: 'Duration', label: this.$t('packet.Duration'), field: 'Duration', align: 'left' },
        { name: 'Cashback', label: this.$t('packet.Cashback'), field: 'Cashback', align: 'left' },
        { name: 'Status', label: this.$t('packet.Status'), field: 'Status', align: 'left' },
        { name: 'Action', label: this.$t('action'), field: '' }
      ],
      statusOptions: [{'label': this.$t('packet.StatusEnabled'), 'value': '1'}, {'label': this.$t('packet.StatusDisabled'), 'value': '2'}],
      data: [],
      edit: {
          ID: '',
          Title: '',
          Price: '',
          Duration: '',
          Cashback: '',
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
            Price: { required },
            Duration: { required },
            Cashback: { required }
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
        this.$api.post('packet/search.php', {
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
                message: this.$t('loadListFailed'),
                position: 'bottom-right'
            })
        })
    },
    newRow () {
        this.edit.Title = ''
        this.edit.Price = ''
        this.edit.Duration = ''
        this.edit.Cashback = ''
        this.edit.Comments = ''
        this.edit.Status = '1'
        this.newPopup = true
    },
    editRow (row) {
        this.edit.ID = row.ID
        this.edit.Title = row.Title
        this.edit.Price = row.Price
        this.edit.Duration = row.Duration
        this.edit.Cashback = row.Cashback
        this.edit.Status = row.Status
        this.edit.Comments = row.Comments
        row.editPopup = true
    },
    deleteRow (id) {
        let _this = this
        this.$api.post('packet/delete.php', {
            ID: id
        }).then(function (response) {
            _this.loadData({pagination: _this.pagination, filter: _this.filter})
        }).catch(function (error) {
            _this.$helper.logError(error)
            _this.$q.notify({
                type: 'negative',
                timeout: 3000,
                message: _this.$t('deleteFailed'),
                position: 'bottom-right'
            })
        })
    },
    async updateRow (row) {
        let _this = this
        const isFormCorrect = await this.v$.$validate()
        if (isFormCorrect) {
            this.$api.post('packet/update.php', this.edit).then(function (response) {
                _this.loadData({pagination: _this.pagination, filter: _this.filter})
            }).catch(function (error) {
                _this.$helper.logError(error)
                _this.$q.notify({
                    type: 'negative',
                    timeout: 3000,
                    message: _this.$t('updateFailed'),
                    position: 'bottom-right'
                })
            })
        }
    },
    async addRow () {
        let _this = this
        const isFormCorrect = await this.v$.$validate()
        if (isFormCorrect) {
            this.$api.post('packet/create.php', this.edit).then(function (response) {
              console.log(response)
              _this.loadData({pagination: _this.pagination, filter: _this.filter})
              _this.newPopup = false
            }).catch(function (error) {
              _this.$helper.logError(error)
              _this.$q.notify({
                  type: 'negative',
                  timeout: 3000,
                  message: _this.$t('insertFailed'),
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
        return this.$t('packet.StatusEnabled')
      if (status == '2')
        return this.$t('packet.StatusDisabled')
      return status
    }
  }
}
</script>
