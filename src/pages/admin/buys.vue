<template>
  <div class="row">
    <q-table
      title="Buy History"
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
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Username" :props="props">{{ props.row.Username }}</q-td>
          <q-td key="StoreName" :props="props">{{ props.row.StoreName }}</q-td>
          <q-td key="RequestedPrice" :props="props">{{ props.row.RequestedPrice }}</q-td>
          <q-td key="FinalPrice" :props="props">{{ props.row.FinalPrice }}</q-td>
          <q-td key="StartDate" :props="props">{{ props.row.StartDate }}</q-td>
          <q-td key="Status" :props="props">{{ displayStatus(props.row.Status) }}</q-td>
          <q-td key="Action" :props="props" >
            <q-btn flat icon="more_horiz">
              <q-menu auto-close>
                <q-list dense separator style="min-width: 170px">
                  <q-item clickable  @click="editRow(props.row)">
                    <q-item-section avatar>
                      <q-icon class="icon" name="edit" />
                    </q-item-section>
                    <q-item-section>{{$t('buy.Edit')}}</q-item-section>
                  </q-item>
                  <q-item clickable @click="props.row.deletePopup = true">
                    <q-item-section avatar>
                      <q-icon class="icon" name="delete" />
                    </q-item-section>
                    <q-item-section>{{$t('buy.Delete')}}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-dialog v-model="props.row.editPopup" persistent>
              <q-card class="detail-dialog">
                <q-card-section class="detail-title">
                  Packet
                </q-card-section>
                <q-card-section>
                  <div>
                      <q-input outlined autofocus v-model="edit.Title" label="Title" :error="v$.edit.Title.$error"></q-input>
                  </div>
                  <div>
                      <q-input outlined autofocus v-model="edit.Price" label="Price" :error="v$.edit.Price.$error"></q-input>
                  </div>
                  <div>
                      <q-input outlined autofocus v-model="edit.Duration" label="Duration" :error="v$.edit.Duration.$error"></q-input>
                  </div>
                  <div>
                      <q-input outlined autofocus v-model="edit.Cashback" label="Cashback" :error="v$.edit.Cashback.$error"></q-input>
                  </div>
                  <div>
                      <q-select outlined v-model="edit.Status" :options="statusOptions" label="Status" emit-value map-options></q-select>
                  </div>
                  <div>
                      <q-input outlined autofocus type="textarea" v-model="edit.Comments" label="Comments"> </q-input>
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
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'BuyHistory',
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
        { name: 'Username', label: this.$i18n.t('buy.Buyer'), field: 'Username', align: 'left' },
        { name: 'StoreName', label: this.$i18n.t('buy.Store'), field: 'StoreName', align: 'left' },
        { name: 'RequestedPrice', label: this.$i18n.t('buy.RequestedPrice'), field: 'RequestedPrice', align: 'left' },
        { name: 'FinalPrice', label: this.$i18n.t('buy.FinalPrice'), field: 'FinalPrice', align: 'left' },
        { name: 'StartDate', label: this.$i18n.t('buy.StartDate'), field: 'StartDate', align: 'left' },
        { name: 'Status', label: this.$i18n.t('buy.Status'), field: 'Status', align: 'left' },
        { name: 'Action', label: this.$i18n.t('action'), field: '' }
      ],
      statusOptions: [{'label': 'Active', 'value': '1'}, {'label': 'Finished', 'value': '2'}],
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
        this.$api.post('buy/search.php', {
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
        this.$api.post('buy/delete.php', {
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
            this.$api.post('packet/update.php', this.edit).then(function (response) {
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
    displayStatus (status) {
      if (!status) {
        return 'X'
      }
      if (status == '1')
        return 'Reserved'
      if (status == '2')
        return 'Committed'
      if (status == '3')
        return 'Canceled'
      return status
    }
  }
}
</script>
