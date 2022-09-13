<template>
  <div class="tw-flex tw-w-full tw-h-2">
    <div class="bg__dark_pink tw-flex-1"></div>
    <div class="bg__dark_blue tw-flex-1"></div>
    <div class="bg__dark_pink tw-flex-1"></div>
    <div class="bg__dark_blue tw-flex-1"></div>
  </div>
  <div class="tw-flex tw-flex-col-reverse md:tw-flex-row md:tw-space-x-10 md:tw-justify-between tw-p-6 lg:tw-px-40 tw-mt-24">

      <div class="box_shadow md:tw-w-[60%] md:tw-h-[280px] md:tw-flex-row tw-flex tw-flex-col-reverse tw-justify-center tw-items-center md:tw-items-start md:tw-justify-between">
        <div class="text_dark_pink md:tw-max-w-[60%] md:tw-space-y-10 tw-p-2 tw-flex tw-flex-col tw-justify-between tw-text-center md:tw-text-left tw-py-4">
          <div class="tw-text-sm xxs:tw-text-lg sm:tw-text-2xl">Your Balance: {{parseInt(info.SumCashbacks) - parseInt(info.SumBuy)}} $</div>
          <div class="tw-text-base xxs:tw-text-xl sm:tw-text-3xl text_dark_blue">Cashbacks: {{ info.SumCashbacks }} $</div>
          <div class="tw-text-base xxs:tw-text-xl sm:tw-text-3xl text_dark_pink xl:tw-flex "  ><div>Used: {{ SumBuys }} $</div></div>
        </div>
        <div style="position: absolute">

        </div>
        <div class="tw-relative">
          <img src="~assets/circle-full.png">
          <div class="balance__value_2 text_dark_blue">{{parseInt(info.SumCashbacks) - parseInt(info.SumBuy)}} $</div>
        </div>

      </div>
    <div class="box_shadow tw-flex tw-mb-16 md:tw-mb-0 tw-flex-col tw-space-y-5 tw-justify-center tw-items-center text_dark_blue md:tw-w-[350px]">
      <img src="~assets/user-avatar.png" class="tw-mt-[-80px]">
      <div class="text_dark_pink xs:tw-text-2xl">{{StateUser.Username}}</div>
      <div class="md:tw-text-lg tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-2 xs:tw-px-6">
          <div>Orders</div>
          <div>Active Packets</div>
          <div>All Packets</div>
      </div>
      <div class="xs:tw-text-lg tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-2 xs:tw-px-6 tw-font-bold">
        <div class="tw-pl-6">{{ info.NumBuys }}</div>
        <div>{{ info.NumActivePackets }}</div>
        <div class="tw-pr-6">{{ info.NumPackets }}</div>
      </div>
      <div class="tw-pb-2 tw-px-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
    </div>
  </div>
  <div class="lg:tw-px-40 md:tw-px-10 lg:tw-mt-16">
    <div class=" tw-flex tw-flex-col text_dark_blue ">
      <q-table
        title="Packets Buying History"
        :rows="packetsHistory"
        :columns="packetColumns"
        row-key="ID"
        color="red"
        title-class="title-class"
        :pagination="packetPagination"
        :rows-per-page-options="perPageOptions"
      >
        <template v-slot:top-right @click="getAllPaginate(packetsHistory.length , 'packet')">
          <div class="row box_shadow tw-px-2 tw-py-2 hover:tw-cursor-pointer" data-html2canvas-ignore @click="getAllPaginate(packetsHistory.length , 'packet')">
            All Records: {{packetsHistory.length}}
          </div>
        </template>
      </q-table>
    </div>
  </div>
  <div class="lg:tw-px-40 md:tw-px-10 lg:tw-mt-16">
      <div class=" tw-flex tw-flex-col text_dark_blue ">
        <q-table
          title="Order Buying History"
          :rows="buyHistory"
          :columns="orderColumns"
          row-key="ID"
          color="red"
          title-class="title-class"
          :pagination="orderPagination"
          :rows-per-page-options="perPageOptions"
        >
          <template v-slot:top-right>
            <div class="row box_shadow tw-px-2 tw-py-2 hover:tw-cursor-pointer" data-html2canvas-ignore  @click="getAllPaginate(buyHistory.length , 'order')">
              All Records: {{buyHistory.length}}
            </div>
          </template>
        </q-table>
      </div>
  </div>
  <div class="lg:tw-px-40 md:tw-px-10 lg:tw-mt-16 tw-mb-[15%]">
    <div class=" tw-py-6">
      <div class=" tw-flex tw-flex-col text_dark_blue ">
        <q-table
          title="Cash backs History"
          :rows="cashBacks"
          :columns="cashBackColumns"
          row-key="ID"
          color="red"
          title-class="title-class"
          table-header-class="table-header"
          :pagination="cashBackPagination"
          :rows-per-page-options="perPageOptions"
        >
          <template v-slot:top-right>
            <div class="row box_shadow tw-px-2 tw-py-2 hover:tw-cursor-pointer" data-html2canvas-ignore @click="getAllPaginate(cashBacks.length , 'cashBacks')">
              All Records: {{cashBacks.length}}
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "dashboard",
  data(){
    return {
      packetColumns: [
        { name: 'PacketName', align: 'center', label: 'Packet', field: 'PacketName', sortable: true },
        { name: 'StartDate', align: 'center', label: 'StartDate', field: 'StartDate', sortable: true },
        { name: 'Price', align: 'center', label: 'Price', field: 'Price', sortable: true },
        { name: 'BuyMethod', align: 'center', label: 'BuyMethod', field: 'BuyMethod', sortable: true },
        { name: 'BuyDate', align: 'center', label: 'BuyDate', field: 'BuyDate', sortable: true },
      ],
      orderColumns: [
        { name: 'Object Code', align: 'center', label: 'Object Code', field: 'Guid', sortable: true },
        { name: 'Object Code', align: 'center', label: 'Packet', field: 'Guid', sortable: true },
        { name: 'StoreName', align: 'center', label: 'Store', field: 'StoreName', sortable: true },
        { name: 'Price', align: 'center', label: 'Original Price', field: 'RequestedPrice', sortable: true },
        { name: 'BuyMethod', align: 'center', label: 'Paid Price', field: 'FinalPrice', sortable: true },
        { name: 'StartDate', align: 'center', label: 'Date', field: 'StartDate', sortable: true },
      ],
      cashBackColumns: [
        { name: 'PacketName', align: 'center', label: 'Packet Name', field: 'PacketName', sortable: true },
        { name: 'PacketCashback', align: 'center', label: 'Packet Cashback', field: 'PacketCashback', sortable: true },
        { name: 'PaybackDate', align: 'center', label: 'Payback Date', field: 'PaybackDate', sortable: true },
        // { name: 'Price', align: 'center', label: 'Original Price', field: 'RequestedPrice', sortable: true },
        // { name: 'BuyMethod', align: 'center', label: 'Paid Price', field: 'FinalPrice', sortable: true },
        // { name: 'StartDate', align: 'center', label: 'Date', field: 'StartDate', sortable: true },
      ],
      info: {},
      stripedIndex: 2,
      selectedPerPage: 5,
      perPageOptions: [
        5 , 10 , 20, 50, 100
      ],
      buyHistory: [],
      cashBacks: [],
      packetsHistory: [],
      packetPagination: {rowsPerPage:10},
      orderPagination: {rowsPerPage:10},
      cashBackPagination: {rowsPerPage:10},
    }
  },
  computed: {
    ...mapGetters(['StateUser'])
  },
  methods: {
    stripedRow(i){
      if (i < 4){
        return i === 1;
      }else {
        return (i - 2) % 3 === 0;
      }
    },
    userInfo(){
      this.$api.post('user/info.php' , )
        .then((res) => {
          this.info = res.data
        })
        .catch((err) => {

        })
    },
    getUserPackets(){
      this.$api.post('userpacket/search.php', {
        Title: this.filter,
        OrderBy: 'id',
        OrderDir: 'desc',
      })
        .then((res) => {
          this.packetsHistory = res.data.Data
        })
    },
    getUserBuys(){
      this.$api.post('buy/search.php', {
        Title: this.filter,
        OrderBy: 'id',
        OrderDir: 'desc' ,
      })
        .then((res) => {
          this.buyHistory = res.data.Data
        })
    },
    getCashBacks(){
      this.$api.post('cashback/search.php', {
        Title: this.filter,
        OrderBy: 'id',
        OrderDir: 'desc' ,
      })
        .then((res) => {
          this.cashBacks = res.data.Data;
        })
    },
    getAllPaginate(count , type){
      let finalCount = 10;
      if (count > 10 && count < 20){
        finalCount = 20;
      }
      if (count > 20 && count < 50){
        finalCount = 50;
      }
      if (count > 50 && count < 100){
        finalCount = 100;
      }
      switch (type){
        case 'order':
          this.orderPagination.rowsPerPage = finalCount;
          break;
        case 'packet':
          this.packetPagination.rowsPerPage = 0;
          break;
        case 'cashBack':
          this.cashBackPagination.rowsPerPage = finalCount;
          break;
      }
      console.log(this.packetPagination)
    }
  },
  mounted() {
    this.getUserPackets();
    this.getUserBuys();
    this.getCashBacks();
    this.userInfo();
  }
}
</script>

<style scoped>
.box_shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}
.balance__value {
  position: relative;
  left: 30%;
  /* bring your own prefixes */
  /*transform: translate(-50%, -50%);*/
}
.table_head_border {
  border-bottom: 1px solid #EEA2AD;
}

.font_medium {
  font-weight: normal !important;
}

.striped_table_row {
  background-color: #F1F1E6 !important;
}

.all_counter {
  height: 36px !important;
}

.table_row {
  border-bottom: 1px solid #FFD7EC;
}
.balance__value_2
{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
@media screen and (min-width: 1900px) {
  .balance__value{
    left: 16%;
  }
}

@media screen and (max-width: 1300px){
  .balance__value{
    left: 56%;
  }
}

@media screen and (min-width: 1200px){
  .balance__value{
    left: 40%;
  }
}

@media screen and (min-width: 900px){
  .balance__value{
    left: 41%;
  }
}

@media screen and (min-width: 800px){
  .balance__value{
    left: 50%;
  }
}

@media screen and (max-width: 800px){
  .balance__value{
    left: 43%;
  }
}

</style>
