import { boot } from "quasar/wrappers";

const helper = {
    logError: function (error) {
      if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error)
    },
    updatePagaination: function (props, dest) {
        const { page, rowsPerPage, sortBy, descending } = props.pagination

        dest.page = page
        dest.rowsPerPage = rowsPerPage
        dest.sortBy = sortBy
        dest.descending = descending
    },
    updateLoadData: function (props, response, dest) {
        const { page, rowsPerPage, sortBy, descending } = props.pagination

        // set delete confirm to false
        for (let c = 0; c < response.data.Data.length; ++c) {
            response.data.Data[c].deletePopup = false
            response.data.Data[c].editPopup = false
        }
        dest.pagination.rowsNumber = response.data.Num
        dest.data = response.data.Data

        dest.pagination.page = page
        dest.pagination.rowsPerPage = rowsPerPage
        dest.pagination.sortBy = sortBy
        dest.pagination.descending = descending
        dest.$q.notify({
            type: 'positive',
            timeout: 2000,
            message: 'List reloaded',
            position: 'bottom-right'
        })
    },
    displayJournalEntryMode (val) {
      if (parseInt(val) == 1)
        return 'Packet'
      if (parseInt(val) == 2)
        return 'Cashback'
      if (parseInt(val) == 3)
        return 'Reserve Buy'
      if (parseInt(val) == 4)
        return 'Commit Buy'
      if (parseInt(val) == 5)
        return 'Cancel Buy'
      return 'unknown'
    },
    initLang (dest) {
      if (!dest.$t) {
        return
      }
      dest.$q.lang.table.allRows = dest.$t('allRows')
      dest.$q.lang.table.recordsPerPage = dest.$t('recordsPerPage')
      return
      dest.$q.lang.table.pagination = function (start, end, total) {
        return start + '-' + end + ' ' + dest.$i18n.t('of') + ' ' + total
      }
    }
};

export default boot(({ app }) => {
  app.config.globalProperties.$helper = helper;
  // ^ ^ ^ this will allow you to use this.$helper (for Vue Options API form)
  //       so you won't necessarily have to import helper in each vue file
});
export { helper };

