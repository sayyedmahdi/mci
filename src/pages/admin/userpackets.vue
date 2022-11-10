<template>
  <div class="row">
    <q-table
      :title="$t('userpacket.Userpackets')"
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
          <q-td key="PacketName" :props="props">{{ props.row.PacketName }}</q-td>
          <q-td key="Username" :props="props">{{ props.row.Username }}</q-td>
          <q-td key="PatrnerNumber" :props="props">{{ props.row.PatrnerNumber }}</q-td>
          <q-td key="BuyDate" :props="props">{{ props.row.BuyDate }}</q-td>
          <q-td key="BuyMethod" :props="props">{{ displayBuyMethod(props.row.BuyMethod) }}</q-td>
          <q-td key="PacketPrice" :props="props">{{ props.row.PacketPrice }}</q-td>
          <q-td key="GutscheinCode" :props="props">{{ props.row.GutscheinName }}</q-td>
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
                    <q-item-section>{{ $t('userpacket.Edit') }}</q-item-section>
                  </q-item>
                  <q-item clickable @click="props.row.deletePopup = true">
                    <q-item-section avatar>
                      <q-icon class="icon" name="delete" />
                    </q-item-section>
                    <q-item-section>{{ $t('userpacket.Delete') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-dialog v-model="props.row.editPopup" persistent>
              <q-card class="detail-dialog">
                <q-card-section class="detail-title">
                  {{ $t('userpacket.Userpacket') }}
                </q-card-section>
                <q-card-section>
                  <div>
                      <q-input outlined v-model="props.row.PacketName" readonly :label="$t('userpacket.Packet')"></q-input>
                  </div>
                  <div>
                      <q-input outlined v-model="props.row.Username" :label="$t('userpacket.User')" readonly></q-input>
                  </div>
                  <div>
                      <q-input outlined v-model="props.row.BuyDate" :label="$t('userpacket.Date')" readonly></q-input>
                  </div>
                  <div>
                      <q-select autofocus outlined v-model="edit.Status" :options="statusOptions" :label="$t('userpacket.Status')" emit-value map-options></q-select>
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
export default {
  name: 'UserPackets',
  meta: {
    title: 'MCI 0.1 - User Packets'
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
        { name: 'PacketName', label: this.$t('userpacket.Packet'), field: 'PacketName', align: 'left' },
        { name: 'Username', label: this.$t('userpacket.Buyer'), field: 'Username', align: 'left' },
        { name: 'PatrnerNumber', label: this.$t('profile.PatrnerNumber'), field: 'PatrnerNumber', align: 'left' },
        { name: 'BuyDate', label: this.$t('userpacket.BuyDate'), field: 'BuyDate', align: 'left' },
        { name: 'BuyMethod', label: this.$t('userpacket.BuyMethod'), field: 'BuyMethod', align: 'left' },
        { name: 'PacketPrice', label: this.$t('userpacket.Price'), field: 'PacketPrice', align: 'left' },
        { name: 'GutscheinCode', label: this.$t('userpacket.Code'), field: 'GutscheinName', align: 'left' },
        { name: 'StartDate', label: this.$t('userpacket.StartDate'), field: 'StartDate', align: 'left' },
        { name: 'Status', label: this.$t('userpacket.Status'), field: 'Status', align: 'left' },
        { name: 'Action', label: this.$t('action'), field: '' }
      ],
      statusOptions: [{'label': this.$t('userpacket.StatusActive'), 'value': '1'}, {'label': this.$t('userpacket.StatusFinished'), 'value': '2'}],
      data: [],
      edit: {
          ID: '',
          Status: 1
      },
      newPopup: false
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
        this.$api.post('userpacket/search.php', {
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
    editRow (row) {
        this.edit.ID = row.ID
        this.edit.Status = row.Status
        row.editPopup = true
    },
    deleteRow (id) {
        let _this = this
        this.$api.post('userpacket/delete.php', {
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
        this.$api.post('userpacket/update.php', this.edit).then(function (response) {
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
    },
    displayStatus (status) {
      if (!status) {
        return 'X'
      }
      if (status == '1')
        return this.$t('userpacket.StatusActive')
      if (status == '2')
        return this.$t('userpacket.StatusFinished')
      return status
    },
    displayBuyMethod (method) {
      if (!method) {
        return 'X'
      }
      if (method == '1')
        return this.$t('userpacket.BuyMethodGutschein')
      if (method == '2')
        return this.$t('userpacket.BuyMethodPaypal')
      return method
    }
  }
}
</script>
