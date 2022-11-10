<template>
  <div class="row">
    <q-table
      :title="this.$t('gutschein.Gutscheine')"
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
          <q-btn class="float-right on-right new-button" @click="importPopup = true">
              <i class="fa fa-file-excel"></i> {{ $t('gutschein.Import') }}
          </q-btn>
          <q-btn class="float-right on-right new-button" @click="newRow()">
              <q-icon name="add_circle_outline" /> {{ $t('gutschein.New') }}
          </q-btn>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Code" :props="props">{{ props.row.Code }}</q-td>
          <q-td key="Packet" :props="props">{{ props.row.PacketName }}</q-td>
          <q-td key="Status" :props="props">{{ displayStatus(props.row.Status) }}</q-td>
          <q-td key="User" :props="props">{{ props.row.Username }}</q-td>
          <q-td key="Action" :props="props" >
            <q-btn flat icon="more_horiz">
              <q-menu auto-close>
                <q-list dense separator style="min-width: 170px">
                  <q-item clickable  @click="editRow(props.row)">
                    <q-item-section avatar>
                      <q-icon class="icon" name="edit" />
                    </q-item-section>
                    <q-item-section>{{ $t('gutschein.Edit') }}</q-item-section>
                  </q-item>
                  <q-item clickable @click="props.row.deletePopup = true">
                    <q-item-section avatar>
                      <q-icon class="icon" name="delete" />
                    </q-item-section>
                    <q-item-section>{{ $t('gutschein.Delete') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-dialog v-model="props.row.editPopup" persistent>
              <q-card class="detail-dialog">
                <q-card-section class="detail-title">
                  {{ $t('gutschein.Gutschein') }}
                </q-card-section>
                <q-card-section>
                  <div>
                      <q-input outlined autofocus v-model="edit.Code" :label="$t('gutschein.Code')" :error="v$.edit.Code.$error"></q-input>
                  </div>
                  <div>
                    <q-select
                        outlined input-class="inputs" label-color='grey-5' dense
                        v-model="edit.PacketID" :options="packets" emit-value map-options
                        :label="$t('gutschein.Packet')">
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
          {{ $t('gutschein.NewGutschein') }}
        </q-card-section>
        <q-card-section>
          <div>
            <q-input outlined autofocus v-model="edit.Code" :label="$t('gutschein.Code')" :error="v$.edit.Code.$error"></q-input>
          </div>
          <div>
             <q-select
                outlined input-class="inputs" label-color='grey-5'
                dense
                v-model="edit.PacketID"
                :options="packets"
                emit-value
                map-options
                :label="$t('gutschein.Packet')">
            </q-select>
          </div>
        </q-card-section>
        <q-card-section  align="center">
            <q-btn flat class="save-btn q-mr-md" :label="$t('save')" @click="addRow();" />
            <q-btn flat class="cancel-btn cancel-btn-alt" :label="$t('cancel')" @click="newPopup = false" />
        </q-card-section>
        </q-card>
    </q-dialog>
    <q-dialog v-model="importPopup" persistent>
      <q-card class="delete-dialog">
        <q-card-section class="delete-title">
          {{ $t('gutschein.ImportFromExcel') }} 
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-xs-12 col-sm-8">
              <q-uploader
                :url="setUploadUrl" :headers="headers" :multiple="false" :no-thumbnails="true"
                name="real" label="Upload File" accept=".xlsx, xlsx/*" flat bordered
                color="white" text-color="grey-9"
                @uploaded="uploaded"
              >
              </q-uploader>
            </div>
          </div>
        </q-card-section>
        <q-card-section  align="center">
          <q-btn flat class="cancel-btn" label="Cancel" @click="importPopup = false" />
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
      importPopup: false,
      headers: [],
      pagination: {
        sortBy: 'Title',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 100
      },
      columns: [
        { name: 'Code', label: this.$t('gutschein.Code'), field: 'Code', align: 'left' },
        { name: 'Packet', label: this.$t('gutschein.Packet'), field: 'PacketName', align: 'left' },
        { name: 'Status', label: this.$t('gutschein.Status'), field: 'Status', align: 'left' },
        { name: 'User', label: this.$t('gutschein.User'), field: 'Username', align: 'left' },
        { name: 'Action', label: this.$t('action'), field: '' }
      ],
      statusOptions: [{'label': 'Enabled', 'value': '1'}, {'label': 'Disabled', 'value': '2'}],
      data: [],
      packets: [],
      edit: {
          ID: '',
          Code: '',
          PacketID: '',
          Status: 1
      },
      newPopup: false
    }
  },
  validations() {
      return {
        edit: {
            Code: { required }
        }
      }
  },
  mounted () {
    this.headers = [{
      name: 'Token', value: this.$q.cookies.get('mcisitetoken')
    }]
    this.loadPackets()
    this.loadData({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    setUploadUrl (files) {
      let url = process.env.API_URL + 'gutschein/import.php'
      console.log(url)
      return url
    },
    uploaded (info) {
      console.log(info)
      let res = JSON.parse(info.xhr.responseText)
      this.$q.notify({
          type: 'positive',
          timeout: 10000,
          message: `Inserted: ${res.Inserted}, Invalid Packet: ${res.InvalidPacket}, Duplicate Code: ${res.DuplicateCode}`,
          position: 'bottom-right'
      })
      console.log(res)
      this.importPopup = false
      this.loadData({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    loadPackets () {
        let _this = this
        // get list
        this.$api.post('packet/search.php', {
            OrderBy: 'Title',
            OrderDir: 'asc',
            Page: 1,
            RowsPerPage: 1000
        }).then(function (response) {
          let returnedData = response.data.Data
          console.log(returnedData)

          // set delete confirm to false
          for (let c = 0; c < returnedData.length; ++c) {
            _this.packets.push({
              label: returnedData[c].Title,
              value: returnedData[c].ID
            })
          }
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
    loadData (props) {
        const { page, rowsPerPage, sortBy, descending } = props.pagination
        const filter = props.filter
        let _this = this
        // get list
        this.$api.post('gutschein/search.php', {
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
                message: _this.$t('loadListFailed'),
                position: 'bottom-right'
            })
        })
    },
    newRow () {
        this.edit.Code = ''
        this.edit.PacketID = ''
        this.edit.Status = '1'
        this.newPopup = true
    },
    editRow (row) {
        this.edit.ID = row.ID
        this.edit.Code = row.Code
        this.edit.PacketID = row.PacketID
        this.edit.Status = row.Status
        row.editPopup = true
    },
    deleteRow (id) {
        let _this = this
        this.$api.post('gutschein/delete.php', {
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
            this.$api.post('gutschein/update.php', this.edit).then(function (response) {
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
            this.$api.post('gutschein/create.php', this.edit).then(function (response) {
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
        return this.$t('gutschein.StatusFree')
      if (status == '2')
        return this.$t('gutschein.StatusUsed')
      return status
    }
  }
}
</script>
