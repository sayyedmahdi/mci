<template>
  <div class="tw-my-32">
    <div class="tw-flex tw-text-5xl sm:tw-ml-[100px] tw-ml-[20px] tw-mb-12">
      <span class="text_dark_blue ">Paket<span class="text_dark_pink tw-ml-3">liste</span></span>
    </div>

    <div class="tw-flex tw-flex-col tw-space-y-6 md:tw-space-y-0 md:space-x-8 xl:tw-space-x-16 md:tw-flex-row md:tw-px-20 tw-px-10 md:tw-px-16 xl:tw-px-60 tw-justify-between">
      <!-- Col 1 -->
      <div class="box_shadow text_dark_blue tw-text-center tw-p-6 md:tw-p-12" v-for="(packet , i) in packets" :key="i">

        <img class="tw-mx-auto" src="~assets/rectangle1395.png">

        <div class="tw-text-sm md:tw-text-3xl xl:tw-text-4xl">{{packet.Title}}</div>
        <div class="text_dark_pink tw-text-sm md:tw-text-3xl">{{ packet.Price }} $</div>
        <div class="tw-text-sm md:tw-text-lg">Duration: {{ packet.Duration }} month</div>
        <div class="tw-text-sm md:tw-text-lg">Per Month Payment: {{ parseInt(packet.Price /packet.Duration ) }} $</div>
        <button class="tw-flex tw-items-center tw-mx-auto tw-py-3 tw-px-2 md:tw-px-9 md:text_md tw-text-xs tw-mt-4 bg__dark_pink tw-text-white tw-justify-center ">
          <span>Buy Now</span>
        </button>
      </div>



    </div>

  </div>

</template>

<script>
export default {
  name: "paketList",
  data() {
    return {
      packets: [],
    }
  },
  methods: {
    loadData () {
      let _this = this
      // get list
      this.$api.post('packet/search.php', {
        Title: '',
        OrderBy: 'id',
        OrderDir: 'asc',
        Page: '1',
        RowsPerPage: '3'
      }).then((res) => {
        this.packets = res.data.Data
      }).catch(function (error) {
        _this.$helper.logError(error)
        _this.$q.notify({
          type: 'negative',
          timeout: 3000,
          message: 'Error loading list',
          position: 'bottom-right'
        })
      })
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
