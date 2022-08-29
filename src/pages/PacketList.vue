<template>
  <belt />
  <div class="tw-flex tw-flex-col tw-px-6 tw-items-center">
    <div class="tw-flex tw-flex-col-reverse tw-py-10 tw-justify-start md:tw-flex-row tw-items-center
      md:tw-justify-between box_shadow tw-max-w-[480px] md:tw-w-full md:tw-h-[360px] tw-my-12 md:tw-max-w-[1200px]" v-for="(packet , i) in packets" :key="i">
      <div class="tw-text-center tw-space-y-4 md:tw-text-left text_dark_blue tw-pl-[8%]">
        <div class="tw-text-4xl">{{ packet.Title }}</div>
        <div class="tw-text-2xl text_dark_pink">{{ packet.Price }} $</div>
        <div class="tw-text-base tw-px-16 md:tw-pr-[17%] md:tw-px-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In turpis odio pretium feugiat adipiscing imperdiet ipsum urna.</div>
        <div class="tw-mt-[2%]">
          <span class="tw-mr-12">Duration: <span class="tw-font-bold">{{ packet.Duration }} month</span ></span >
          <span>Per Month Payment: <span class="tw-font-bold">{{ parseInt(packet.Price / packet.Duration ) }} $</span ></span>
        </div>
        <button class="flex items-center tw-mx-auto md:tw-mx-0 tw-py-2 tw-px-9 text_md bg__dark_pink tw-text-white justify-center ">
          <span>Buy Now</span>
        </button>
      </div>
      <div class="md:tw-w-1/2">
        <img class="tw-px-4 tw-mx-auto md:tw-px-0" src="~assets/packetList.png">
      </div>

    </div>
  </div>
  <footer-page />
</template>

<script>
import belt from "components/belt";
import footerPage from "components/footerPage";
export default {
  name: "PacketList",
  components: {belt , footerPage},
  data() {
    return {
      packets: []
    }
  },
  methods: {
    loadData(){
      let _this = this
      // get list
      this.$api.post('packet/search.php', {
        Title: '',
        OrderBy: 'id',
        OrderDir: 'asc',
        Page: '1',
        RowsPerPage: '10'
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
