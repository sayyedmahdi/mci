<template>
  <div class="row shadow-2 ">
    <q-table
      :title="$t('contacts.Contacts')"
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
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Name" :props="props">{{ props.row.Name }}</q-td>
          <q-td key="Email" :props="props">{{ props.row.Email }}</q-td>
          <q-td key="Phone" :props="props">{{ props.row.Phone }}</q-td>
          <q-td key="Date" :props="props">{{ props.row.CreateDate }}</q-td>
          <q-td key="Action" :props="props" >
            <q-btn flat icon="more_horiz">
              <q-menu auto-close>
                <q-list dense separator style="min-width: 170px">
                  <q-item clickable  @click="editRow(props.row)">
                    <q-item-section avatar>
                      <q-icon class="icon" name="edit" />
                    </q-item-section>
                    <q-item-section>{{$t('contacts.Edit')}}</q-item-section>
                  </q-item>
                  <q-item clickable @click="props.row.deletePopup = true">
                    <q-item-section avatar>
                      <q-icon class="icon" name="delete" />
                    </q-item-section>
                    <q-item-section>{{$t('contacts.Delete')}}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-dialog v-model="props.row.editPopup" persistent>
              <q-card class="detail-dialog">
                <q-card-section class="detail-title">
                  {{$t('contacts.EditContact')}}
                </q-card-section>
                <q-card-section>
                  <div>
                      <q-input outlined v-model="edit.Name" :label="$t('contacts.Name')" readonly></q-input>
                  </div>
                  <div>
                      <q-input outlined v-model="edit.Phone" :label="$t('contacts.Phome')" readonly></q-input>
                  </div>
                  <div>
                      <q-input outlined v-model="edit.Email" :label="$t('contacts.Email')" readonly></q-input>
                  </div>
                  <div class="q-mt-md">
                      <q-input outlined type="textarea" v-model="edit.Message" :label="$t('contacts.Message')"> </q-input>
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
  name: 'Contacts',
  meta: {
    title: 'Login – MCI 0.1'
  },
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'CreateDate',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 100
      },
      columns: [
        { name: 'Name', label: this.$t('contacts.Name'), field: 'Name', align: 'left' },
        { name: 'Email', label: this.$t('contacts.Email'), field: 'Email', align: 'left' },
        { name: 'Phone', label: this.$t('contacts.Phone'), field: 'Phone', align: 'left' },
        { name: 'Date', label: this.$t('contacts.Date'), field: 'CreateDate', align: 'left' },
        { name: 'Action', label: this.$t('action'), field: '' }
      ],
      data: [],
      edit: {
          ID: '',
          Name: '',
          Phone: '',
          Email: '',
          Message: ''
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
        this.$api.post('contact/search.php', {
            Name: this.filter,
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
        this.edit.Name = row.Name
        this.edit.Email = row.Email
        this.edit.Phone = row.Phone
        this.edit.Message = row.Message
        row.editPopup = true
    },
    deleteRow (id) {
        let _this = this
        this.$api.post('contact/delete.php', {
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
        this.$api.post('contact/update.php', this.edit).then(function (response) {
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
  }
}
</script>