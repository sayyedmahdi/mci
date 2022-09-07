<template>
  <belt />
  <div class="tw-flex tw-flex-col tw-px-6 tw-items-center">
    <div class="tw-flex tw-flex-col-reverse tw-py-14 tw-justify-start md:tw-flex-row tw-items-center
      md:tw-justify-between box_shadow tw-max-w-[480px] md:tw-w-full md:tw-h-[360px] tw-my-12 md:tw-max-w-[1200px]" v-for="(store , i) in stores" :key="i">
      <div class="tw-text-center tw-space-y-6 md:tw-text-left text_dark_blue tw-pl-[8%]">
        <div class="tw-mx-auto tw-px-44 md:tw-px-0">
          <img src="~assets/rectangle1398.png">
        </div>
        <div class="tw-text-4xl">{{store.Title}}</div>
        <div class="tw-text-base tw-px-16 md:tw-pr-[17%] md:tw-px-0">{{ store.Comments }}</div>

        <button class="flex items-center tw-mx-auto tw-mt-4 md:tw-mx-0 tw-py-2 tw-px-9 text_md bg__dark_pink tw-text-white justify-center " @click="gotoShop(store)">
          <span>Buy Now</span>
        </button>
      </div>
      <div class="md:tw-w-1/2">
        <img class="tw-px-4 tw-mx-auto md:tw-px-0" src="~assets/rectangle1396.png">
      </div>

    </div>
  </div>
  <footer-page />
</template>

<script>
import belt from "components/belt";
import footerPage from "components/footerPage";
export default {
  name: "StoreList",
  components: {belt , footerPage},
  data() {
    return {
      stores: []
    }
  },
  methods: {
    loadData(){
      this.$api.post('store/search.php', {
        Title: '',
        OrderBy: 'id',
        OrderDir: 'desc',
        Page: '1',
        RowsPerPage: '10'
      }).then((res) => {
        this.stores = res.data.Data
      })
    },
    gotoShop(store){
      window.open(store.Url , '_blank');
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>
.box_shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}
</style>
